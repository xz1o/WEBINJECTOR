import { BarChart, LineChart, PieChart, Activity, Users, Download, Server } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900/60 border-purple-500/20 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">12,845</div>
              <Users className="h-6 w-6 text-cyan-400" />
            </div>
            <div className="text-xs text-green-400 mt-2 flex items-center">
              <Activity className="h-3 w-3 mr-1" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 border-purple-500/20 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">1,342</div>
              <Activity className="h-6 w-6 text-purple-400" />
            </div>
            <div className="text-xs text-green-400 mt-2 flex items-center">
              <Activity className="h-3 w-3 mr-1" />
              <span>+5% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 border-purple-500/20 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">45,672</div>
              <Download className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-xs text-green-400 mt-2 flex items-center">
              <Activity className="h-3 w-3 mr-1" />
              <span>+18% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 border-purple-500/20 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Server Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">Healthy</div>
              <Server className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-xs text-gray-400 mt-2">
              <span>99.9% uptime this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/60 border-purple-500/20 shadow-lg">
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>User signups and active sessions over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center text-gray-500 border border-dashed border-gray-700 rounded-lg">
              <LineChart className="h-10 w-10 mr-2" />
              <span>Activity Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 border-purple-500/20 shadow-lg">
          <CardHeader>
            <CardTitle>Download Statistics</CardTitle>
            <CardDescription>Most popular mods and downloads</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center text-gray-500 border border-dashed border-gray-700 rounded-lg">
              <BarChart className="h-10 w-10 mr-2" />
              <span>Download Stats Placeholder</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900/60 border-purple-500/20 shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user actions and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start space-x-4 border-b border-gray-800 pb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">User_{i}23 downloaded Minecraft Mod</p>
                    <p className="text-xs text-gray-400">{i * 10} minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 border-purple-500/20 shadow-lg">
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Users by game preference</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center text-gray-500 border border-dashed border-gray-700 rounded-lg">
              <PieChart className="h-10 w-10 mr-2" />
              <span>Distribution Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
