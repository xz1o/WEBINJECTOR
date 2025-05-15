"use client"

import { useState } from "react"
import { Search, Download, RefreshCw, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock log data
const mockLogs = [
  {
    id: 1,
    timestamp: "2023-05-14 10:32:56",
    level: "INFO",
    source: "Auth",
    message: "User login successful: alex@example.com",
    ip: "192.168.1.1",
  },
  {
    id: 2,
    timestamp: "2023-05-14 10:30:22",
    level: "WARNING",
    source: "Security",
    message: "Failed login attempt: unknown@example.com",
    ip: "203.0.113.1",
  },
  {
    id: 3,
    timestamp: "2023-05-14 10:28:15",
    level: "ERROR",
    source: "Database",
    message: "Connection timeout after 30s",
    ip: "192.168.1.5",
  },
  {
    id: 4,
    timestamp: "2023-05-14 10:25:44",
    level: "INFO",
    source: "System",
    message: "Scheduled maintenance started",
    ip: "192.168.1.10",
  },
  {
    id: 5,
    timestamp: "2023-05-14 10:20:18",
    level: "INFO",
    source: "Auth",
    message: "User logout: sam@example.com",
    ip: "192.168.1.2",
  },
  {
    id: 6,
    timestamp: "2023-05-14 10:15:33",
    level: "ERROR",
    source: "API",
    message: "Rate limit exceeded for client ID: 12345",
    ip: "198.51.100.1",
  },
  {
    id: 7,
    timestamp: "2023-05-14 10:10:05",
    level: "WARNING",
    source: "Security",
    message: "Suspicious activity detected from IP: 203.0.113.5",
    ip: "203.0.113.5",
  },
  {
    id: 8,
    timestamp: "2023-05-14 10:05:22",
    level: "INFO",
    source: "System",
    message: "Application started successfully",
    ip: "192.168.1.10",
  },
  {
    id: 9,
    timestamp: "2023-05-14 10:00:11",
    level: "ERROR",
    source: "Storage",
    message: "Failed to upload file: insufficient permissions",
    ip: "192.168.1.3",
  },
  {
    id: 10,
    timestamp: "2023-05-14 09:55:47",
    level: "INFO",
    source: "Auth",
    message: "New user registered: jamie@example.com",
    ip: "192.168.1.4",
  },
  {
    id: 11,
    timestamp: "2023-05-14 09:50:30",
    level: "WARNING",
    source: "Security",
    message: "Multiple failed login attempts for user: taylor@example.com",
    ip: "192.168.1.6",
  },
  {
    id: 12,
    timestamp: "2023-05-14 09:45:12",
    level: "INFO",
    source: "System",
    message: "Cache cleared successfully",
    ip: "192.168.1.10",
  },
]

export function AdminSystemLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [logLevel, setLogLevel] = useState("all")
  const [logSource, setLogSource] = useState("all")

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) || log.ip.includes(searchTerm)
    const matchesLevel = logLevel === "all" || log.level.toLowerCase() === logLevel.toLowerCase()
    const matchesSource = logSource === "all" || log.source.toLowerCase() === logSource.toLowerCase()

    return matchesSearch && matchesLevel && matchesSource
  })

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "INFO":
        return <Info className="h-4 w-4 text-blue-400" />
      case "WARNING":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case "ERROR":
        return <XCircle className="h-4 w-4 text-red-400" />
      case "SUCCESS":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      default:
        return <Info className="h-4 w-4 text-gray-400" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "INFO":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "WARNING":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "ERROR":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "SUCCESS":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const sources = [...new Set(mockLogs.map((log) => log.source))]

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/60 border-purple-500/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>View and filter system logs and events</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="border-gray-700 text-gray-300" onClick={() => {}}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-auto md:flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search logs..."
                className="pl-8 bg-gray-800 border-gray-700 focus:border-purple-500 text-white w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2 w-full md:w-auto">
              <Select value={logLevel} onValueChange={setLogLevel}>
                <SelectTrigger className="bg-gray-800 border-gray-700 focus:border-purple-500 text-white w-full md:w-[150px]">
                  <SelectValue placeholder="Log Level" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800">
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>

              <Select value={logSource} onValueChange={setLogSource}>
                <SelectTrigger className="bg-gray-800 border-gray-700 focus:border-purple-500 text-white w-full md:w-[150px]">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800">
                  <SelectItem value="all">All Sources</SelectItem>
                  {sources.map((source) => (
                    <SelectItem key={source} value={source.toLowerCase()}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-lg bg-gray-800/50 border border-gray-800 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">{getLevelIcon(log.level)}</div>
                    <div>
                      <div className="font-medium text-white">{log.message}</div>
                      <div className="text-sm text-gray-400 mt-1">
                        Source: {log.source} | IP: {log.ip}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className={getLevelColor(log.level)}>
                      {log.level}
                    </Badge>
                    <div className="text-sm text-gray-400 whitespace-nowrap">{log.timestamp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLogs.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              <p>No logs found matching your filters.</p>
            </div>
          )}

          <div className="mt-4 text-center text-sm text-gray-400">
            Showing <span className="font-medium text-white">{filteredLogs.length}</span> of{" "}
            <span className="font-medium text-white">{mockLogs.length}</span> logs
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
