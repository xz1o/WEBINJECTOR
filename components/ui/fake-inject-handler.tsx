"use client"

import { useState, useEffect } from "react"
import { X, Terminal } from "lucide-react"

interface FakeInjectHandlerProps {
  gameName: string
  onClose: () => void
}

export function FakeInjectHandler({ gameName, onClose }: FakeInjectHandlerProps) {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress === 0) {
      const timeout = setTimeout(() => {
        onClose()
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [progress, onClose])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none px-4">
      <div
        className="notification-container max-w-md w-full bg-black/90 border border-[#ff00ff]/50 rounded-lg shadow-[0_0_15px_rgba(255,0,255,0.5)] backdrop-blur-sm overflow-hidden pointer-events-auto"
        style={{
          animation: "glitch-appear 0.3s forwards, glitch-disappear 0.3s forwards 4.7s",
        }}
      >
        <div className="relative">
          {/* Terminal header */}
          <div className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 px-4 py-2 flex items-center justify-between border-b border-[#ff00ff]/30">
            <div className="flex items-center">
              <Terminal className="w-4 h-4 text-[#00ffff] mr-2" />
              <span className="text-[#00ffff] font-mono text-sm">WEBINJECT_2.0.EXE</span>
            </div>
            <button
              onClick={onClose}
              className="text-pink-500 hover:text-pink-300 transition-colors"
              aria-label="Close notification"
            >
              <X size={18} />
            </button>
          </div>

          {/* Message content */}
          <div className="p-4 relative overflow-hidden">
            {/* Glitch lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#ff00ff]/30 animate-pulse"></div>
              <div className="absolute top-1/3 left-0 w-full h-[1px] bg-[#00ffff]/20 animate-pulse delay-300"></div>
              <div className="absolute top-2/3 left-0 w-full h-[1px] bg-[#ff00ff]/30 animate-pulse delay-700"></div>
            </div>

            <div className="flex items-start gap-3">
              <div className="min-w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-mono text-[#ff00ff] mb-1 text-sm">WebInject 2.0 says:</div>
                <div className="text-white font-medium terminal-text relative">
                  <span className="relative z-10">
                    Open <span className="text-[#00ffff] font-semibold">{gameName}</span> to inject this tweak.
                  </span>
                </div>
                <div className="mt-3 text-xs text-gray-400 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#00ffff] animate-pulse mr-2"></div>
                  Waiting for {gameName} process...
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-black w-full">
            <div
              className="h-full bg-gradient-to-r from-[#ff00ff] to-[#00ffff]"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
