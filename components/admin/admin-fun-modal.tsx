"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { AdminPanel } from "@/components/admin/admin-panel"

interface AdminFunModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminFunModal({ isOpen, onClose }: AdminFunModalProps) {
  const [mounted, setMounted] = useState(false)
  const [password, setPassword] = useState("")
  const [isShaking, setIsShaking] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // The password is the same as the one used in the marketplace mod section
  const ADMIN_PASSWORD = "!@MODUITY"

  // Handle mounting animation
  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      // Focus the password input after a short delay
      setTimeout(() => {
        if (passwordInputRef.current) {
          passwordInputRef.current.focus()
        }
      }, 100)
    } else {
      const timer = setTimeout(() => {
        setMounted(false)
        setShowAdminPanel(false)
      }, 300) // Match the duration of the fade-out animation
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === ADMIN_PASSWORD) {
      // Close the modal and show admin panel
      setPassword("")
      setShowAdminPanel(true)

      toast({
        title: "Access Granted",
        description: "Admin panel activated successfully.",
      })
    } else {
      // Shake animation for incorrect password
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)

      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCloseAdminPanel = () => {
    setShowAdminPanel(false)
    onClose()
  }

  if (!mounted) return null

  if (showAdminPanel) {
    return <AdminPanel isOpen={showAdminPanel} onClose={handleCloseAdminPanel} />
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-black border border-purple-500/50 rounded-lg shadow-[0_0_25px_rgba(168,85,247,0.4)] max-w-md w-full transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 px-6 py-4 flex items-center justify-between border-b border-purple-500/30">
          <div className="flex items-center">
            <Lock className="h-5 w-5 text-cyan-400 mr-2" />
            <h2 className="text-xl font-bold text-white">Admin Access</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-300 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2">Enter Admin Password</h3>
            <p className="text-sm text-gray-400">This area is restricted to authorized administrators only.</p>
          </div>

          <div className="mb-6">
            <Input
              ref={passwordInputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`bg-black/40 border-purple-500/30 focus:border-purple-500 ${isShaking ? "animate-shake" : ""}`}
              placeholder="Enter password"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mr-2 border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Access
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
