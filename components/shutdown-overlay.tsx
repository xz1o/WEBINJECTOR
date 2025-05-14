"use client"

import { useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import Image from "next/image"
import { CountdownTimer } from "./ui/countdown-timer"
import { MaintenanceProgressBar } from "./ui/maintenance-progress-bar"
import { MAINTENANCE_TIME, calculateMaintenanceEndDate } from "@/lib/maintenance-config"

interface ShutdownOverlayProps {
  isShutdown: boolean
  // Optional props for customizing maintenance time
  maintenanceStartDate?: Date
  maintenanceDuration?: number
}

export function ShutdownOverlay({
  isShutdown,
  maintenanceStartDate = new Date(),
  maintenanceDuration = MAINTENANCE_TIME.DAYS(2),
}: ShutdownOverlayProps) {
  // Calculate the end date based on start date and duration
  const maintenanceEndDate = calculateMaintenanceEndDate(maintenanceStartDate, maintenanceDuration)

  // Format the end date for display
  const formattedEndDate = maintenanceEndDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Prevent scrolling when overlay is active
  useEffect(() => {
    if (isShutdown) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isShutdown])

  if (!isShutdown) return null

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-px h-px">
          <div className="absolute w-[1px] h-[150px] bg-gradient-to-b from-transparent via-red-500 to-transparent animate-pulse-slow"></div>
        </div>
        <div className="absolute top-1/3 right-1/3 w-px h-px">
          <div className="absolute w-[1px] h-[200px] bg-gradient-to-b from-transparent via-yellow-500 to-transparent animate-pulse-slow delay-300"></div>
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-px h-px">
          <div className="absolute w-[1px] h-[120px] bg-gradient-to-b from-transparent via-red-500 to-transparent animate-pulse-slow delay-700"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <AlertTriangle className="h-24 w-24 text-yellow-500" />
            <div className="absolute inset-0 h-24 w-24 text-yellow-500 animate-ping opacity-20"></div>
          </div>
        </div>

        {/* WebInject Logo - Repositioned */}
        <div className="flex justify-center mb-10">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src="/images/webinject-logo.png"
              alt="WebInject Logo"
              fill
              style={{ objectFit: "contain" }}
              className="opacity-80 animate-pulse-slow"
              priority
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 glitch-text" data-text="SYSTEM OFFLINE">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500">
            SYSTEM OFFLINE
          </span>
        </h1>

        <div className="bg-black/60 border border-red-500/50 rounded-lg p-6 mb-8 max-w-xl mx-auto shadow-[0_0_25px_rgba(239,68,68,0.3)]">
          <p className="text-xl mb-4 text-white">
            WebInject 2.0 is temporarily shutdown for critical system updates and maintenance.
          </p>
          <p className="text-lg mb-6 text-gray-300">
            We are implementing major improvements to enhance your modding experience.
          </p>

          {/* Maintenance Progress Bar */}
          <div className="mb-8">
            <MaintenanceProgressBar startDate={maintenanceStartDate} endDate={maintenanceEndDate} />
          </div>

          {/* Countdown Timer */}
          <p className="text-lg font-semibold text-gray-300 mb-4">SYSTEM REBOOT IN:</p>
          <div className="mb-6">
            <CountdownTimer targetDate={maintenanceEndDate} />
          </div>

          <div className="inline-block bg-red-900/30 border border-red-500/30 rounded-lg px-6 py-3">
            <p className="text-lg font-mono text-red-400">
              <span className="font-bold">SYSTEM REBOOT:</span> {formattedEndDate}
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          <p>For urgent inquiries, please contact our support team at support@webinject.com</p>
          <p className="mt-2">Thank you for your patience and understanding.</p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center px-4 py-2 border border-yellow-500/50 rounded-md bg-yellow-900/20 text-yellow-400 text-sm">
            <span className="mr-2 h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>
            Maintenance in progress...
          </div>
        </div>
      </div>

      {/* Animated code-like background */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full font-mono text-xs text-green-500 whitespace-pre overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="opacity-30">
              {`// SYSTEM MAINTENANCE\n`}
              {`function rebuildSystem() {\n`}
              {`  const components = ["core", "injection", "security", "interface"];\n`}
              {`  const status = "offline";\n`}
              {`  const rebootDate = "${formattedEndDate}";\n`}
              {`  \n`}
              {`  // Performing critical updates\n`}
              {`  for (const component of components) {\n`}
              {`    updateComponent(component);\n`}
              {`    optimizePerformance(component);\n`}
              {`  }\n`}
              {`  \n`}
              {`  // Schedule system reboot\n`}
              {`  if (Date.now() >= new Date(rebootDate).getTime()) {\n`}
              {`    return setStatus("online");\n`}
              {`  }\n`}
              {`  \n`}
              {`  return status;\n`}
              {`}\n\n`}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
