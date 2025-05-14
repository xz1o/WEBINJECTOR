"use client"

import { useEffect } from "react"
import { DollarSign } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// This component is used to initialize the notification system globally
export function NotificationSystem() {
  const { toast } = useToast()

  // Set up global event listeners for notifications
  useEffect(() => {
    // Listen for purchase events
    const handlePurchaseEvent = (event: CustomEvent) => {
      const { userName, modName, price } = event.detail

      toast({
        title: "New Purchase!",
        description: (
          <div className="flex flex-col">
            <span className="font-medium">
              {userName} purchased {modName}
            </span>
            <span className="text-green-400">${price.toFixed(2)} added to revenue</span>
          </div>
        ),
        duration: 5000,
      })
    }

    // Listen for revenue events
    const handleRevenueEvent = (event: CustomEvent) => {
      const { amount, removedCheat, newCheat, isMajor } = event.detail

      toast({
        title: isMajor ? "MAJOR REVENUE EVENT!" : "Revenue Boost!",
        description: (
          <div className="flex flex-col">
            <span className="font-medium text-red-400">"{removedCheat}" has been removed!</span>
            <span className="font-medium text-green-400">Developing new cheat: "{newCheat}"</span>
            <span className="mt-1 font-bold text-yellow-400">+${amount.toLocaleString()} added to revenue</span>
          </div>
        ),
        duration: 8000,
      })
    }

    // Listen for update events
    const handleUpdateEvent = (event: CustomEvent) => {
      const { amount } = event.detail

      toast({
        title: "Revenue Updated",
        description: (
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-green-400 mr-1" />
            <span>+${amount.toFixed(2)} added to revenue</span>
          </div>
        ),
        duration: 3000,
      })
    }

    // Add event listeners
    window.addEventListener("webinject:purchase", handlePurchaseEvent as EventListener)
    window.addEventListener("webinject:revenue-event", handleRevenueEvent as EventListener)
    window.addEventListener("webinject:update", handleUpdateEvent as EventListener)

    // Clean up event listeners
    return () => {
      window.removeEventListener("webinject:purchase", handlePurchaseEvent as EventListener)
      window.removeEventListener("webinject:revenue-event", handleRevenueEvent as EventListener)
      window.removeEventListener("webinject:update", handleUpdateEvent as EventListener)
    }
  }, [toast])

  // This component doesn't render anything visible
  return null
}
