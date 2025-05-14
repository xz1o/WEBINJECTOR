"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { DollarSign, TrendingUp, Clock } from "lucide-react"

// Sample cheat names for random events
const CHEAT_NAMES = [
  "Aimbot Pro",
  "WallHack Ultra",
  "Speed Demon",
  "God Mode X",
  "Infinite Ammo Plus",
  "Radar Hack Elite",
  "Auto Headshot",
  "Skin Unlocker Premium",
  "No Recoil Master",
  "Teleport Wizard",
  "Fly Hack Deluxe",
  "ESP Vision Pro",
  "Trigger Bot Elite",
  "Bunny Hop Master",
  "Anti-Ban Shield",
]

// Sample user names for purchase notifications
const USER_NAMES = [
  "ShadowSniper",
  "NinjaGamer",
  "ProPlayer123",
  "GhostHunter",
  "EliteGamer",
  "MasterChief",
  "DarkKnight",
  "LegendaryPlayer",
  "StealthAssassin",
  "VictoryRoyale",
  "EpicGamer",
  "UltimatePro",
  "SkillMaster",
  "GameWizard",
  "ChampionX",
]

// Sample mod names for purchase notifications
const MOD_NAMES = [
  "Aimbot Basic",
  "WallHack Lite",
  "Speed Boost",
  "Invincibility Shield",
  "Ammo Booster",
  "Radar Enhancement",
  "Headshot Helper",
  "Skin Changer",
  "Recoil Reducer",
  "Quick Teleport",
  "Hover Mode",
  "Player ESP",
  "Auto Trigger",
  "Jump Enhancer",
  "Ban Protector",
]

export function MoneyCounter() {
  const [money, setMoney] = useState(0)
  const [nextUpdateTime, setNextUpdateTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const randomEventIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  // Initialize or load saved money value
  useEffect(() => {
    const loadSavedMoney = () => {
      const savedMoney = localStorage.getItem("webinject_money")
      const savedTimestamp = localStorage.getItem("webinject_timestamp")

      let initialMoney = 2000000 // Default starting value

      if (savedMoney && savedTimestamp) {
        const lastUpdateTime = Number.parseInt(savedTimestamp)
        const currentTime = Date.now()
        const elapsedMinutes = (currentTime - lastUpdateTime) / (1000 * 60)

        // Calculate how much money should have been added while away
        // $14.18 every 5 minutes
        const additionalMoney = Math.floor(elapsedMinutes / 5) * 14.18

        initialMoney = Number.parseFloat(savedMoney) + additionalMoney
      }

      setMoney(initialMoney)
      localStorage.setItem("webinject_money", initialMoney.toString())
      localStorage.setItem("webinject_timestamp", Date.now().toString())
    }

    loadSavedMoney()
  }, [])

  // Set up regular money updates
  useEffect(() => {
    const updateMoney = () => {
      setMoney((prevMoney) => {
        const newMoney = prevMoney + 14.18
        localStorage.setItem("webinject_money", newMoney.toString())
        localStorage.setItem("webinject_timestamp", Date.now().toString())
        return newMoney
      })
    }

    const updateProgress = () => {
      const currentTime = Date.now()
      const timeElapsed =
        currentTime - Number.parseInt(localStorage.getItem("webinject_timestamp") || currentTime.toString())
      const fiveMinutesInMs = 5 * 60 * 1000
      const newProgress = Math.min(100, (timeElapsed / fiveMinutesInMs) * 100)

      setProgress(newProgress)

      if (newProgress >= 100) {
        updateMoney()
        setProgress(0)
      }

      // Calculate time until next update
      const timeRemaining = fiveMinutesInMs - (timeElapsed % fiveMinutesInMs)
      setNextUpdateTime(Math.ceil(timeRemaining / 1000))
    }

    // Update progress every second
    intervalRef.current = setInterval(updateProgress, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Set up random purchase notifications
  useEffect(() => {
    const showRandomPurchase = () => {
      const userName = USER_NAMES[Math.floor(Math.random() * USER_NAMES.length)]
      const modName = MOD_NAMES[Math.floor(Math.random() * MOD_NAMES.length)]
      const price = Math.floor(Math.random() * 50) + 5 // Random price between $5 and $55

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

      // Add the purchase amount to the counter
      setMoney((prevMoney) => {
        const newMoney = prevMoney + price
        localStorage.setItem("webinject_money", newMoney.toString())
        return newMoney
      })
    }

    // Show random purchases every 30-90 seconds
    const purchaseInterval = setInterval(
      () => {
        showRandomPurchase()
      },
      Math.random() * 60000 + 30000,
    )

    return () => clearInterval(purchaseInterval)
  }, [toast])

  // Set up random big events
  useEffect(() => {
    const triggerRandomEvent = () => {
      const isMajorEvent = Math.random() < 0.3 // 30% chance for $1M, 70% chance for $100K
      const amount = isMajorEvent ? 1000000 : 100000
      const removedCheat = CHEAT_NAMES[Math.floor(Math.random() * CHEAT_NAMES.length)]
      const newCheat = CHEAT_NAMES[Math.floor(Math.random() * CHEAT_NAMES.length)]

      toast({
        title: isMajorEvent ? "MAJOR REVENUE EVENT!" : "Revenue Boost!",
        description: (
          <div className="flex flex-col">
            <span className="font-medium text-red-400">"{removedCheat}" has been removed!</span>
            <span className="font-medium text-green-400">Developing new cheat: "{newCheat}"</span>
            <span className="mt-1 font-bold text-yellow-400">+${amount.toLocaleString()} added to revenue</span>
          </div>
        ),
        duration: 8000,
      })

      // Add the event amount to the counter
      setMoney((prevMoney) => {
        const newMoney = prevMoney + amount
        localStorage.setItem("webinject_money", newMoney.toString())
        return newMoney
      })
    }

    // Trigger random events every 3-10 minutes
    randomEventIntervalRef.current = setInterval(
      () => {
        triggerRandomEvent()
      },
      Math.random() * 7 * 60000 + 3 * 60000,
    )

    return () => {
      if (randomEventIntervalRef.current) clearInterval(randomEventIntervalRef.current)
    }
  }, [toast])

  // Format money with commas and 2 decimal places
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <Card className="p-8 bg-black/40 border-green-500/30 hover:border-green-500/60 transition-all duration-300">
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-2">
          <DollarSign className="h-8 w-8 text-green-400 mr-2" />
          <h2 className="text-2xl font-bold">Total Revenue</h2>
        </div>

        <div className="text-5xl md:text-7xl font-bold text-green-400 my-6 font-mono">{formatMoney(money)}</div>

        <div className="w-full max-w-md mb-4">
          <div className="flex justify-between text-sm mb-1">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span>Next update: +$14.18</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-blue-400 mr-1" />
              <span>
                {Math.floor(nextUpdateTime / 60)}:{(nextUpdateTime % 60).toString().padStart(2, "0")}
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="text-sm text-gray-400 text-center">
          <p>Revenue is updated every 5 minutes</p>
          <p className="mt-1">Random purchases and events may occur at any time</p>
        </div>
      </div>
    </Card>
  )
}
