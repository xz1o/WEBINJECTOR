"use client"

import { useEffect, useState } from "react"

interface MaintenanceProgressBarProps {
  startDate: Date
  endDate: Date
}

export function MaintenanceProgressBar({ startDate, endDate }: MaintenanceProgressBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date().getTime()
      const start = startDate.getTime()
      const end = endDate.getTime()

      // If maintenance is complete
      if (now >= end) {
        return 100
      }

      // If maintenance hasn't started yet
      if (now <= start) {
        return 0
      }

      // Calculate progress percentage
      const elapsed = now - start
      const total = end - start
      const percentage = (elapsed / total) * 100

      return Math.min(Math.max(percentage, 0), 100)
    }

    setProgress(calculateProgress())

    const timer = setInterval(() => {
      setProgress(calculateProgress())
    }, 1000)

    return () => clearInterval(timer)
  }, [startDate, endDate])

  // Generate random task names for visual effect
  const maintenanceTasks = [
    "Optimizing injection modules",
    "Updating security protocols",
    "Rebuilding mod database",
    "Enhancing user interface",
    "Upgrading server infrastructure",
  ]

  const currentTask = maintenanceTasks[Math.floor((progress / 100) * maintenanceTasks.length)]

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>Maintenance Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>

      <div className="w-full bg-gray-900/60 rounded-full h-4 overflow-hidden border border-gray-800">
        <div
          className="bg-gradient-to-r from-yellow-600 to-red-600 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="mt-2 text-xs text-yellow-400 font-mono">
        <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
        {currentTask}...
      </div>
    </div>
  )
}
