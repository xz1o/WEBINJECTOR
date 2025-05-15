"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { FakeInjectHandler } from "@/components/ui/fake-inject-handler"
import { ModDetailsModal } from "@/components/ui/mod-details-modal"

interface ModCardProps {
  mod: {
    id: string
    name: string
    description: string
    game: string
    gameDisplayName: string
    category: string
    version: string
    creator: string
    price: number
    priceType: string
    downloads: number
    rating: number | string
    uploadDate: string
    features: string[]
    accentColor: string
  }
}

export function ModCard({ mod }: ModCardProps) {
  const [showInjectPopup, setShowInjectPopup] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const getBorderClass = (color: string) => {
    switch (color) {
      case "green":
        return "border-green-500/30 hover:border-green-500/60"
      case "blue":
        return "border-blue-500/30 hover:border-blue-500/60"
      case "purple":
        return "border-purple-500/30 hover:border-purple-500/60"
      case "red":
        return "border-red-500/30 hover:border-red-500/60"
      case "pink":
        return "border-pink-500/30 hover:border-pink-500/60"
      case "orange":
        return "border-orange-500/30 hover:border-orange-500/60"
      case "yellow":
        return "border-yellow-500/30 hover:border-yellow-500/60"
      case "amber":
        return "border-amber-500/30 hover:border-amber-500/60"
      case "gray":
        return "border-gray-500/30 hover:border-gray-500/60"
      case "stone":
        return "border-stone-500/30 hover:border-stone-500/60"
      default:
        return "border-cyan-500/30 hover:border-cyan-500/60"
    }
  }

  const getButtonClass = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-600 hover:bg-green-700"
      case "blue":
        return "bg-blue-600 hover:bg-blue-700"
      case "purple":
        return "bg-purple-600 hover:bg-purple-700"
      case "red":
        return "bg-red-600 hover:bg-red-700"
      case "pink":
        return "bg-pink-600 hover:bg-pink-700"
      case "orange":
        return "bg-orange-600 hover:bg-orange-700"
      case "yellow":
        return "bg-yellow-600 hover:bg-yellow-700"
      case "amber":
        return "bg-amber-600 hover:bg-amber-700"
      case "gray":
        return "bg-gray-600 hover:bg-gray-700"
      case "stone":
        return "bg-stone-600 hover:bg-stone-700"
      default:
        return "bg-cyan-600 hover:bg-cyan-700"
    }
  }

  const getOutlineButtonClass = (color: string) => {
    switch (color) {
      case "green":
        return "border-green-500/50 text-green-400 hover:bg-green-950/20"
      case "blue":
        return "border-blue-500/50 text-blue-400 hover:bg-blue-950/20"
      case "purple":
        return "border-purple-500/50 text-purple-400 hover:bg-purple-950/20"
      case "red":
        return "border-red-500/50 text-red-400 hover:bg-red-950/20"
      case "pink":
        return "border-pink-500/50 text-pink-400 hover:bg-pink-950/20"
      case "orange":
        return "border-orange-500/50 text-orange-400 hover:bg-orange-950/20"
      case "yellow":
        return "border-yellow-500/50 text-yellow-400 hover:bg-yellow-950/20"
      case "amber":
        return "border-amber-500/50 text-amber-400 hover:bg-amber-950/20"
      case "gray":
        return "border-gray-500/50 text-gray-400 hover:bg-gray-950/20"
      case "stone":
        return "border-stone-500/50 text-stone-400 hover:bg-stone-950/20"
      default:
        return "border-cyan-500/50 text-cyan-400 hover:bg-cyan-950/20"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <>
      <Card className={`p-6 bg-black/40 ${getBorderClass(mod.accentColor)} transition-all duration-300`}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{mod.name}</h3>
          <Badge variant="outline" className="text-xs">
            {mod.version}
          </Badge>
        </div>

        <p className="text-gray-400 mb-4">{mod.description}</p>

        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <div>By {mod.creator}</div>
          <div>{mod.priceType === "free" ? "Free" : `$${mod.price.toFixed(2)}`}</div>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-500 mb-6">
          <div>{Number(mod.downloads).toLocaleString()} downloads</div>
          <div>⭐ {mod.rating}</div>
          <div>{formatDate(mod.uploadDate)}</div>
        </div>

        <div className="flex gap-2">
          <Button className={`flex-1 ${getButtonClass(mod.accentColor)}`} onClick={() => setShowInjectPopup(true)}>
            Inject Now
          </Button>
          <Button
            variant="outline"
            className={getOutlineButtonClass(mod.accentColor)}
            onClick={() => setShowDetails(true)}
          >
            Details
          </Button>
        </div>
      </Card>

      {showInjectPopup && (
        <FakeInjectHandler gameName={mod.gameDisplayName} onClose={() => setShowInjectPopup(false)} />
      )}

      {showDetails && (
        <ModDetailsModal
          mod={mod}
          accentColor={mod.accentColor}
          onClose={() => setShowDetails(false)}
          onInject={() => {
            setShowDetails(false)
            setShowInjectPopup(true)
          }}
        />
      )}
    </>
  )
}
