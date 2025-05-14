"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { FakeInjectHandler } from "@/components/ui/fake-inject-handler"
import { ModDetailsModal } from "@/components/ui/mod-details-modal"

export function RobloxMods() {
  const [showInjectPopup, setShowInjectPopup] = useState(false)
  const [selectedMod, setSelectedMod] = useState<any>(null)

  const mods = [
    {
      name: "Fly Hack",
      version: "v2.4",
      description: "Freely fly around any Roblox game",
      features: [
        "Toggle flight with a hotkey",
        "Adjustable flight speed",
        "Noclip through objects while flying",
        "Anti-detection measures",
        "Works in most popular games",
      ],
      creator: "SkyHacker",
      price: "Free",
      downloads: 78452,
      rating: 4.7,
    },
    {
      name: "No Clip",
      version: "v1.8",
      description: "Walk through walls and objects",
      features: [
        "Toggle noclip with a hotkey",
        "Works with all solid objects",
        "Anti-detection system",
        "Compatible with other mods",
        "Minimal performance impact",
      ],
      creator: "PhaseTeam",
      price: "Free",
      downloads: 65321,
      rating: 4.5,
    },
    {
      name: "Speed Boost",
      version: "v3.2",
      description: "Move faster than other players",
      features: [
        "Adjustable speed multiplier",
        "Quick toggle hotkey",
        "Works in most games",
        "Anti-detection measures",
        "Compatible with movement mods",
      ],
      creator: "VelocityMods",
      price: "$4.99",
      downloads: 42156,
      rating: 4.8,
    },
    {
      name: "Wallhack",
      version: "v2.0",
      description: "See players through walls",
      features: [
        "See players through any obstacle",
        "Customizable ESP colors",
        "Distance indicators",
        "Player health display",
        "Toggle with hotkey",
      ],
      creator: "VisionPlus",
      price: "$7.99",
      downloads: 38745,
      rating: 4.6,
    },
    {
      name: "Auto Farm",
      version: "v1.5",
      description: "Automate resource collection",
      features: [
        "Game-specific farming routines",
        "Resource detection",
        "Anti-AFK measures",
        "Customizable farming paths",
        "Statistics tracking",
      ],
      creator: "FarmBot",
      price: "$9.99",
      downloads: 25689,
      rating: 4.9,
    },
    {
      name: "Aimbot",
      version: "v2.7",
      description: "Auto-aim at nearby players",
      features: [
        "Automatic target acquisition",
        "Adjustable aim smoothness",
        "Target priority settings",
        "Toggle with hotkey",
        "Compatible with most weapons",
      ],
      creator: "AimTeam",
      price: "$12.99",
      downloads: 31452,
      rating: 4.7,
    },
  ]

  const handleToggle = () => {
    setShowInjectPopup(true)
  }

  const handleViewDetails = (mod: any) => {
    setSelectedMod(mod)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mods.map((mod) => (
          <Card
            key={mod.name}
            className="p-6 bg-black/40 border-blue-500/30 hover:border-blue-500/60 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{mod.name}</h3>
              <Badge variant="outline" className="text-xs">
                {mod.version}
              </Badge>
            </div>
            <p className="text-gray-400 mb-4">{mod.description}</p>

            <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
              <div>By {mod.creator}</div>
              <div>{mod.price === "Free" ? "Free" : mod.price}</div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium">Status</span>
              <Switch onCheckedChange={handleToggle} />
            </div>

            <Button
              variant="outline"
              className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-950/20"
              onClick={() => handleViewDetails(mod)}
            >
              View Details
            </Button>
          </Card>
        ))}
      </div>

      {showInjectPopup && <FakeInjectHandler gameName="Roblox" onClose={() => setShowInjectPopup(false)} />}

      {selectedMod && (
        <ModDetailsModal
          mod={selectedMod}
          accentColor="blue"
          onClose={() => setSelectedMod(null)}
          onInject={() => {
            setSelectedMod(null)
            setShowInjectPopup(true)
          }}
        />
      )}
    </div>
  )
}
