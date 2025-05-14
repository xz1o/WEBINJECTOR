"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  targetDate: Date
  onComplete?: () => void
  className?: string
}

export function CountdownTimer({ targetDate, onComplete, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference <= 0) {
        setIsComplete(true)
        if (onComplete) onComplete()
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onComplete])

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
        <div className="flex flex-col">
          <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-2 py-1 md:px-4 md:py-3 w-16 md:w-20">
            <span className="text-xl md:text-2xl font-mono text-cyan-400">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs mt-1 text-gray-400">DAYS</span>
        </div>

        <div className="flex flex-col">
          <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-2 py-1 md:px-4 md:py-3 w-16 md:w-20">
            <span className="text-xl md:text-2xl font-mono text-cyan-400">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs mt-1 text-gray-400">HOURS</span>
        </div>

        <div className="flex flex-col">
          <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-2 py-1 md:px-4 md:py-3 w-16 md:w-20">
            <span className="text-xl md:text-2xl font-mono text-cyan-400">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs mt-1 text-gray-400">MINUTES</span>
        </div>

        <div className="flex flex-col">
          <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-2 py-1 md:px-4 md:py-3 w-16 md:w-20">
            <span className="text-xl md:text-2xl font-mono text-cyan-400">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs mt-1 text-gray-400">SECONDS</span>
        </div>
      </div>

      {isComplete && <div className="mt-4 text-green-500 font-semibold animate-pulse">Update available now!</div>}
    </div>
  )
}
