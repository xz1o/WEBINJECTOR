"use client"

import { useState } from "react"
import { Search, RefreshCw, MessageSquare, UserMinus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock online users data
const mockOnlineUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: null,
    status: "Active",
    duration: "2h 15m",
    location: "United States",
    activity: "Browsing Minecraft mods",
  },
  {
    id: 2,
    name: "Sam Wilson",
    email: "sam@example.com",
    avatar: null,
    status: "Idle",
    duration: "45m",
    location: "Canada",
    activity: "Viewing Fortnite page",
  },
  {
    id: 3,
    name: "Jamie Smith",
    email: "jamie@example.com",
    avatar: null,
    status: "Active",
    duration: "1h 30m",
    location: "United Kingdom",
    activity: "Downloading mods",
  },
  {
    id: 4,
    name: "Taylor Brown",
    email: "taylor@example.com",
    avatar: null,
    status: "Active",
    duration: "20m",
    location: "Australia",
    activity: "Chatting in support",
  },
  {
    id: 5,
    name: "Jordan Lee",
    email: "jordan@example.com",
    avatar: null,
    status: "Active",
    duration: "3h 5m",
    location: "Germany",
    activity: "Browsing marketplace",
  },
  {
    id: 6,
    name: "Casey Miller",
    email: "casey@example.com",
    avatar: null,
    status: "Idle",
    duration: "10m",
    location: "France",
    activity: "Viewing CS2 mods",
  },
  {
    id: 7,
    name: "Riley Davis",
    email: "riley@example.com",
    avatar: null,
    status: "Active",
    duration: "55m",
    location: "Japan",
    activity: "Updating profile",
  },
  {
    id: 8,
    name: "Quinn Thomas",
    email: "quinn@example.com",
    avatar: null,
    status: "Active",
    duration: "1h 10m",
    location: "Brazil",
    activity: "Browsing Roblox mods",
  },
]

export function AdminOnlineUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const filteredUsers = mockOnlineUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.activity.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRefresh = () => {
    setLastUpdated(new Date())
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Idle":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/60 border-purple-500/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Online Users</CardTitle>
              <CardDescription>Currently active users on the platform</CardDescription>
            </div>
            <Button variant="outline" className="border-gray-700 text-gray-300" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-400 mb-4">Last updated: {lastUpdated.toLocaleTimeString()}</div>

          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search users or activities..."
              className="pl-8 bg-gray-800 border-gray-700 focus:border-purple-500 text-white w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-800 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border border-gray-700">
                      <AvatarImage src={user.avatar || ""} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-cyan-500 text-white">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-900 ${getStatusColor(user.status)}`}
                    ></span>
                  </div>
                  <div>
                    <div className="font-medium text-white">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                  </div>
                </div>

                <div className="hidden md:flex items-center space-x-4 text-sm text-gray-400">
                  <div>
                    <div className="font-medium text-gray-300">Duration</div>
                    <div>{user.duration}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-300">Location</div>
                    <div>{user.location}</div>
                  </div>
                  <div className="max-w-[200px]">
                    <div className="font-medium text-gray-300">Activity</div>
                    <div className="truncate">{user.activity}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                    <UserMinus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center text-sm text-gray-400">
            Showing <span className="font-medium text-white">{filteredUsers.length}</span> of{" "}
            <span className="font-medium text-white">{mockOnlineUsers.length}</span> online users
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
