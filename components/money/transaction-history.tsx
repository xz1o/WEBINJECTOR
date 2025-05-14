"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample transaction types
type TransactionType = "purchase" | "event" | "update"

interface Transaction {
  id: string
  type: TransactionType
  amount: number
  description: string
  timestamp: Date
}

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Generate sample transactions
  useEffect(() => {
    const generateTransactions = () => {
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
      ]

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
      ]

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
      ]

      const now = new Date()
      const sampleTransactions: Transaction[] = []

      // Generate 20 random transactions over the past 24 hours
      for (let i = 0; i < 20; i++) {
        const type: TransactionType = Math.random() < 0.7 ? "purchase" : Math.random() < 0.5 ? "event" : "update"

        const timestamp = new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000)

        let amount: number
        let description: string

        switch (type) {
          case "purchase":
            const userName = USER_NAMES[Math.floor(Math.random() * USER_NAMES.length)]
            const modName = MOD_NAMES[Math.floor(Math.random() * MOD_NAMES.length)]
            amount = Math.floor(Math.random() * 50) + 5 // $5 to $55
            description = `${userName} purchased ${modName}`
            break

          case "event":
            const isMajor = Math.random() < 0.3
            amount = isMajor ? 1000000 : 100000
            const removedCheat = CHEAT_NAMES[Math.floor(Math.random() * CHEAT_NAMES.length)]
            description = `"${removedCheat}" removed - developing new cheat`
            break

          case "update":
            amount = 14.18
            description = "Regular revenue update"
            break
        }

        sampleTransactions.push({
          id: `tx-${i}`,
          type,
          amount,
          description,
          timestamp,
        })
      }

      // Sort by timestamp (newest first)
      sampleTransactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

      setTransactions(sampleTransactions)
    }

    generateTransactions()
  }, [])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="p-6 bg-black/40 border-green-500/30 hover:border-green-500/60 transition-all duration-300">
      <h3 className="text-xl font-bold mb-4">Transaction History</h3>

      <ScrollArea className="h-[350px] pr-4">
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-3 bg-black/60 border border-gray-800 rounded-md flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <Badge
                    className={
                      transaction.type === "purchase"
                        ? "bg-blue-600"
                        : transaction.type === "event"
                          ? "bg-purple-600"
                          : "bg-green-600"
                    }
                  >
                    {transaction.type === "purchase" ? "Purchase" : transaction.type === "event" ? "Event" : "Update"}
                  </Badge>
                  <span className="text-xs text-gray-400 ml-2">{formatTime(transaction.timestamp)}</span>
                </div>
                <p className="text-sm mt-1">{transaction.description}</p>
              </div>
              <div className="text-right">
                <span className="text-green-400 font-mono font-medium">+{formatCurrency(transaction.amount)}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
