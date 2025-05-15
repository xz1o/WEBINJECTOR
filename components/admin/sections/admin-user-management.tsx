"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, Edit, Trash, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2023-05-14 10:32:56",
  },
  {
    id: 2,
    name: "Sam Wilson",
    email: "sam@example.com",
    role: "Moderator",
    status: "Active",
    lastLogin: "2023-05-14 09:15:22",
  },
  {
    id: 3,
    name: "Jamie Smith",
    email: "jamie@example.com",
    role: "User",
    status: "Inactive",
    lastLogin: "2023-05-10 14:45:30",
  },
  {
    id: 4,
    name: "Taylor Brown",
    email: "taylor@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2023-05-13 18:22:10",
  },
  {
    id: 5,
    name: "Jordan Lee",
    email: "jordan@example.com",
    role: "User",
    status: "Banned",
    lastLogin: "2023-05-01 11:05:44",
  },
  {
    id: 6,
    name: "Casey Miller",
    email: "casey@example.com",
    role: "Moderator",
    status: "Active",
    lastLogin: "2023-05-14 08:30:15",
  },
  {
    id: 7,
    name: "Riley Davis",
    email: "riley@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2023-05-13 20:15:33",
  },
  {
    id: 8,
    name: "Quinn Thomas",
    email: "quinn@example.com",
    role: "User",
    status: "Pending",
    lastLogin: "2023-05-12 15:40:22",
  },
]

export function AdminUserManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Inactive":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "Banned":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "Pending":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "Moderator":
        return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
      case "User":
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/60 border-purple-500/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage user accounts</CardDescription>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 bg-gray-800 border-gray-700 focus:border-purple-500 text-white w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="border-gray-700 text-gray-300">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="rounded-md border border-gray-800">
            <Table>
              <TableHeader className="bg-gray-900">
                <TableRow className="border-gray-800 hover:bg-transparent">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Email</TableHead>
                  <TableHead className="text-gray-400">Role</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Last Login</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-gray-800 hover:bg-gray-900/50">
                    <TableCell className="font-medium text-white">{user.name}</TableCell>
                    <TableCell className="text-gray-300">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-400">{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                          <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-gray-800">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-400">
              Showing <span className="font-medium text-white">{filteredUsers.length}</span> of{" "}
              <span className="font-medium text-white">{mockUsers.length}</span> users
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
