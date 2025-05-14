"use client"

import { useState, useEffect } from "react"
import { Cpu, Wifi, Activity, Clock } from "lucide-react"

export function StatusBar() {
  const [time, setTime] = useState(new Date())
  const [cpuUsage, setCpuUsage] = useState(Math.floor(Math.random() * 30) + 10)
  const [networkLatency, setNetworkLatency] = useState(Math.floor(Math.random() * 50) + 20)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    const usageTimer = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 10)
      setNetworkLatency(Math.floor(Math.random() * 50) + 20)
    }, 5000)

    return () => {
      clearInterval(timer)
      clearInterval(usageTimer)
    }
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-t border-purple-500/30 py-1 px-4 text-xs text-gray-400 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
          <span>SYSTEM ONLINE</span>
        </div>

        <div className="flex items-center">
          <Cpu className="w-3 h-3 mr-1" />
          <span>CPU: {cpuUsage}%</span>
        </div>

        <div className="flex items-center">
          <Wifi className="w-3 h-3 mr-1" />
          <span>PING: {networkLatency}ms</span>
        </div>
      </div>

      <div className="flex items-center">
        <Activity className="w-3 h-3 mr-1" />
        <span className="mr-4">WEBINJECT 2.0 v2.4.7</span>

        <Clock className="w-3 h-3 mr-1" />
        <span>{time.toLocaleTimeString()}</span>
      </div>
    </div>
  )
}
