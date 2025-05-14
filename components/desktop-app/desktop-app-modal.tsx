"use client"

import { useState, useEffect } from "react"
import { X, Download, Info, Clock, Cpu, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface DesktopAppModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DesktopAppModal({ isOpen, onClose }: DesktopAppModalProps) {
  const [mounted, setMounted] = useState(false)

  // Handle mounting animation
  useEffect(() => {
    if (isOpen) {
      setMounted(true)
    } else {
      const timer = setTimeout(() => {
        setMounted(false)
      }, 300) // Match the duration of the fade-out animation
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-black border border-purple-500/50 rounded-lg shadow-[0_0_25px_rgba(168,85,247,0.4)] max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 px-6 py-4 flex items-center justify-between border-b border-purple-500/30">
          <div className="flex items-center">
            <Download className="h-5 w-5 text-cyan-400 mr-2" />
            <h2 className="text-xl font-bold text-white">DESKINJECT2.1 - Desktop Application</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-300 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Development notice */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6 flex items-start">
            <Info className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-400">Desktop Application Under Development</h3>
              <p className="text-gray-300 mt-1">
                Our desktop application is currently in active development. The DESKINJECT2.1 will provide enhanced
                features, better performance, and deeper integration with your games. Stay tuned for the official
                release!
              </p>
            </div>
          </div>

          {/* Desktop app preview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Preview of DESKINJECT2.1</h3>
            <div className="relative border-2 border-cyan-500/30 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              {/* App window header */}
              <div className="bg-gradient-to-r from-gray-900 to-black px-4 py-2 flex items-center border-b border-cyan-500/30">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm font-mono text-cyan-400">DESKINJECT2.1</div>
              </div>

              {/* App content */}
              <div className="bg-black p-4">
                {/* App navbar */}
                <div className="bg-gray-900/80 border border-purple-500/30 rounded-t-md px-4 py-2 flex items-center justify-between">
                  <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                    DeskInject<span className="text-pink-500">2.1</span>
                  </div>
                  <div className="flex space-x-4 text-xs">
                    <span className="text-cyan-400">Home</span>
                    <span className="text-gray-400">Games</span>
                    <span className="text-gray-400">Mods</span>
                    <span className="text-gray-400">Settings</span>
                  </div>
                </div>

                {/* App main content */}
                <div className="bg-gray-900/50 border-x border-b border-purple-500/30 rounded-b-md p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-black/60 border border-purple-500/30 rounded-md p-3">
                      <h4 className="text-sm font-medium text-purple-400 mb-2">Active Games</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-xs">Minecraft</span>
                          </div>
                          <Badge className="text-[10px] h-4 bg-green-600">Injected</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
                            <span className="text-xs">Valorant</span>
                          </div>
                          <Badge className="text-[10px] h-4 bg-gray-600">Not Running</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/60 border border-purple-500/30 rounded-md p-3">
                      <h4 className="text-sm font-medium text-purple-400 mb-2">Active Mods</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">NovaClient</span>
                          <Badge className="text-[10px] h-4 bg-blue-600">Running</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">X-Ray Vision</span>
                          <Badge className="text-[10px] h-4 bg-blue-600">Running</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/60 border border-purple-500/30 rounded-md p-3 mb-4">
                    <h4 className="text-sm font-medium text-purple-400 mb-2">Quick Inject</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {["Minecraft", "Roblox", "Fortnite"].map((game) => (
                        <div
                          key={game}
                          className="bg-gray-800/50 border border-gray-700 rounded p-2 text-center text-xs cursor-not-allowed opacity-70"
                        >
                          {game}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-black/60 border border-purple-500/30 rounded-md p-3">
                    <h4 className="text-sm font-medium text-purple-400 mb-2">System Status</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Cpu className="h-3 w-3 mr-1 text-gray-400" />
                          <span>CPU Usage</span>
                        </div>
                        <span>32%</span>
                      </div>
                      <Progress value={32} className="h-1" />

                      <div className="flex justify-between mt-2">
                        <div className="flex items-center">
                          <Wifi className="h-3 w-3 mr-1 text-gray-400" />
                          <span>Network</span>
                        </div>
                        <span>28ms</span>
                      </div>
                      <Progress value={75} className="h-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* App status bar */}
              <div className="bg-gray-900 border-t border-cyan-500/30 px-4 py-1 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                  <span>SYSTEM ONLINE</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>DESKINJECT 2.1 v0.8.3 (BETA)</span>
                </div>
              </div>

              {/* Non-interactive overlay */}
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center">
                <div className="bg-black/70 border border-cyan-500 rounded-lg px-6 py-3 shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                  <span className="text-cyan-400 font-medium">Preview Only - Not Interactive</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features list */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Upcoming Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-purple-900/50 border border-purple-500/50 flex items-center justify-center text-purple-400 mr-3 mt-0.5 flex-shrink-0">
                  1
                </div>
                <div>
                  <span className="font-medium text-purple-400">Advanced Injection Engine</span>
                  <p className="text-gray-400 text-sm">
                    Our proprietary injection technology works with all major anti-cheat systems while remaining
                    undetected.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-purple-900/50 border border-purple-500/50 flex items-center justify-center text-purple-400 mr-3 mt-0.5 flex-shrink-0">
                  2
                </div>
                <div>
                  <span className="font-medium text-purple-400">Game Auto-Detection</span>
                  <p className="text-gray-400 text-sm">
                    DESKINJECT2.1 automatically detects installed games and suggests compatible mods.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-purple-900/50 border border-purple-500/50 flex items-center justify-center text-purple-400 mr-3 mt-0.5 flex-shrink-0">
                  3
                </div>
                <div>
                  <span className="font-medium text-purple-400">Mod Manager</span>
                  <p className="text-gray-400 text-sm">
                    Easily manage, update, and configure all your mods from a single dashboard.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-purple-900/50 border border-purple-500/50 flex items-center justify-center text-purple-400 mr-3 mt-0.5 flex-shrink-0">
                  4
                </div>
                <div>
                  <span className="font-medium text-purple-400">Performance Optimization</span>
                  <p className="text-gray-400 text-sm">
                    Our desktop app is optimized for performance, ensuring minimal impact on your gaming experience.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Release info */}
          <div className="bg-gray-900/30 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Release Information</h3>
              <Badge variant="outline" className="text-yellow-400 border-yellow-400/30">
                Coming Soon
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Estimated Release:</span>
                <p>Q3 2025</p>
              </div>
              <div>
                <span className="text-gray-400">Supported OS:</span>
                <p>Windows 10/11, macOS, Linux</p>
              </div>
              <div>
                <span className="text-gray-400">Current Status:</span>
                <p>Closed Beta Testing</p>
              </div>
              <div>
                <span className="text-gray-400">Early Access:</span>
                <p>Sign up for beta access below</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-purple-500/30 p-4 flex justify-between items-center">
          <p className="text-sm text-gray-400">
            Join our <span className="text-cyan-400">Discord</span> for early access and development updates
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Download className="mr-2 h-4 w-4" />
            Join Beta Waitlist
          </Button>
        </div>
      </div>
    </div>
  )
}
