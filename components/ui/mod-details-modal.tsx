"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SVGIconLibrary } from "@/components/ui/svg-icon-library"

interface ModDetailsModalProps {
  mod: any
  accentColor: string
  onClose: () => void
  onInject: () => void
}

export function ModDetailsModal({ mod, accentColor, onClose, onInject }: ModDetailsModalProps) {
  const getAccentColorClass = (color: string) => {
    switch (color) {
      case "green":
        return "from-green-400 to-green-600"
      case "blue":
        return "from-blue-400 to-blue-600"
      case "purple":
        return "from-purple-400 to-purple-600"
      case "red":
        return "from-red-400 to-red-600"
      case "pink":
        return "from-pink-400 to-pink-600"
      case "orange":
        return "from-orange-400 to-orange-600"
      default:
        return "from-cyan-400 to-blue-600"
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
      default:
        return "bg-cyan-600 hover:bg-cyan-700"
    }
  }

  const getBorderClass = (color: string) => {
    switch (color) {
      case "green":
        return "border-green-500/30"
      case "blue":
        return "border-blue-500/30"
      case "purple":
        return "border-purple-500/30"
      case "red":
        return "border-red-500/30"
      case "pink":
        return "border-pink-500/30"
      case "orange":
        return "border-orange-500/30"
      default:
        return "border-cyan-500/30"
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative bg-black border border-purple-500/50 rounded-lg shadow-[0_0_25px_rgba(168,85,247,0.4)] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div
          className={`sticky top-0 z-10 bg-gradient-to-r ${getAccentColorClass(accentColor)} px-6 py-4 flex items-center justify-between border-b ${getBorderClass(accentColor)}`}
        >
          <h2 className="text-xl font-bold text-white">{mod.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            {mod.game && (
              <>
                <SVGIconLibrary name={mod.game} className="h-5 w-5" />
                <span className="text-gray-300">{mod.gameDisplayName || mod.game}</span>
              </>
            )}
            <Badge variant="outline" className="ml-auto">
              {mod.version}
            </Badge>
          </div>

          <p className="text-gray-300 mb-6">{mod.description}</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <ul className="space-y-2">
              {mod.features?.map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-1">Creator</h4>
              <p className="text-white">{mod.creator}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-1">Price</h4>
              <p className="text-white">{mod.priceType === "free" ? "Free" : mod.price ? `$${mod.price}` : "Free"}</p>
            </div>
            {mod.downloads !== undefined && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Downloads</h4>
                <p className="text-white">{mod.downloads.toLocaleString()}</p>
              </div>
            )}
            {mod.rating !== undefined && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Rating</h4>
                <p className="text-white">⭐ {mod.rating.toFixed(1)}/5.0</p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button className={`flex-1 ${getButtonClass(accentColor)}`} onClick={onInject}>
              {mod.version?.includes("Coming Soon") ? "Coming Soon" : "Inject Now"}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
