"use client"

import { useState } from "react"
import {
  X,
  LayoutDashboard,
  Users,
  Globe,
  Settings,
  FileText,
  Info,
  ChevronRight,
  ChevronLeft,
  Search,
  Bell,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AdminDashboard } from "@/components/admin/sections/admin-dashboard"
import { AdminUserManagement } from "@/components/admin/sections/admin-user-management"
import { AdminOnlineUsers } from "@/components/admin/sections/admin-online-users"
import { AdminSettings } from "@/components/admin/sections/admin-settings"
import { AdminSystemLogs } from "@/components/admin/sections/admin-system-logs"
import { AdminCredits } from "@/components/admin/sections/admin-credits"

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

type Section = "dashboard" | "users" | "online" | "settings" | "logs" | "credits"

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [activeSection, setActiveSection] = useState<Section>("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle mounting animation
  useState(() => {
    if (isOpen) {
      setMounted(true)
    } else {
      setTimeout(() => {
        setMounted(false)
      }, 300)
    }
  })

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "users", label: "User Management", icon: <Users size={20} /> },
    { id: "online", label: "Online Users", icon: <Globe size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
    { id: "logs", label: "System Logs", icon: <FileText size={20} /> },
    { id: "credits", label: "Credits", icon: <Info size={20} /> },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard />
      case "users":
        return <AdminUserManagement />
      case "online":
        return <AdminOnlineUsers />
      case "settings":
        return <AdminSettings />
      case "logs":
        return <AdminSystemLogs />
      case "credits":
        return <AdminCredits />
      default:
        return <AdminDashboard />
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div
        className={`bg-black border border-purple-500/30 rounded-lg shadow-2xl w-full h-full md:w-[95%] md:h-[90%] max-w-7xl transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex h-full">
          {/* Sidebar */}
          <div
            className={`bg-gray-900/80 border-r border-purple-500/20 transition-all duration-300 ${
              sidebarCollapsed ? "w-16" : "w-64"
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
              {!sidebarCollapsed && (
                <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                  Admin Panel
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="text-gray-400 hover:text-white"
              >
                {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </Button>
            </div>
            <ScrollArea className="h-[calc(100%-64px)]">
              <div className="py-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as Section)}
                    className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                      activeSection === item.id
                        ? "bg-purple-900/30 text-white border-l-2 border-purple-500"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <header className="bg-gray-900/60 border-b border-purple-500/20 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-white">
                  {navItems.find((item) => item.id === activeSection)?.label}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-64 pl-8 bg-gray-800 border-gray-700 focus:border-purple-500 text-white"
                  />
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Bell size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <User size={20} />
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </Button>
              </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-gray-900 to-black">{renderContent()}</main>
          </div>
        </div>
      </div>
    </div>
  )
}
