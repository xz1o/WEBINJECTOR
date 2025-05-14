"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FakeInjectHandler } from "@/components/ui/fake-inject-handler"
import { ModDetailsModal } from "@/components/ui/mod-details-modal"

export function ValorantMods() {
  const [showInjectPopup, setShowInjectPopup] = useState(false)
  const [selectedMod, setSelectedMod] = useState<any>(null)

  const mods = [
    {
      name: "Wallhack",
      version: "v1.2",
      description: "See enemies through walls",
      features: [
        "Player outline through walls",
        "Distance indicators",
        "Health bar display",
        "Agent identification",
        "Customizable colors",
      ],
      creator: "WallVision",
      price: "$19.99",
      downloads: 42156,
      rating: 4.7,
    },
    {
      name: "Trigger Bot",
      version: "Coming Soon",
      description: "Auto-fire when crosshair is on enemy",
      features: [
        "Automatic firing",
        "Adjustable delay",
        "Target priority",
        "Weapon-specific settings",
        "Toggle with hotkey",
      ],
      creator: "TriggerTeam",
      price: "$24.99",
      downloads: 0,
      rating: 0,
    },
    {
      name: "Radar Hack",
      version: "v2.0",
      description: "Always see enemies on minimap",
      features: [
        "Real-time enemy positions",
        "Sound detection indicators",
        "Ability usage alerts",
        "Spike location tracking",
        "Enemy economy tracking",
      ],
      creator: "RadarPlus",
      price: "$14.99",
      downloads: 38745,
      rating: 4.6,
    },
    {
      name: "No Recoil",
      version: "v1.5",
      description: "Eliminate weapon recoil",
      features: [
        "Complete recoil elimination",
        "Weapon-specific profiles",
        "Adjustable strength",
        "Compatible with other mods",
        "Works with all weapons",
      ],
      creator: "SteadyAim",
      price: "$9.99",
      downloads: 65689,
      rating: 4.8,
    },
    {
      name: "Skin Unlocker",
      version: "v3.1",
      description: "Use any skin in the game",
      features: [
        "Access to all weapon skins",
        "Player card unlocker",
        "Gun buddy customization",
        "Spray unlocker",
        "Only visible to you",
      ],
      creator: "SkinVault",
      price: "$12.99",
      downloads: 78452,
      rating: 4.9,
    },
    {
      name: "Silent Aim",
      version: "v2.2",
      description: "Subtle aim assistance without obvious snapping",
      features: [
        "Subtle aim correction",
        "Customizable FOV",
        "Target priority settings",
        "Visibility checks",
        "Anti-detection measures",
      ],
      creator: "PrecisionAim",
      price: "$29.99",
      downloads: 31452,
      rating: 4.7,
    },
  ]

  const handleInject = (mod: any) => {
    if (!mod.version.includes("Coming Soon")) {
      setShowInjectPopup(true)
    }
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
            className="p-6 bg-black/40 border-pink-500/30 hover:border-pink-500/60 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{mod.name}</h3>
              <Badge
                variant="outline"
                className={`text-xs ${mod.version.includes("Coming Soon") ? "text-yellow-400 border-yellow-400/50" : ""}`}
              >
                {mod.version}
              </Badge>
            </div>
            <p className="text-gray-400 mb-4">{mod.description}</p>

            <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
              <div>By {mod.creator}</div>
              <div>{mod.price === "Free" ? "Free" : mod.price}</div>
            </div>

            <div className="flex gap-2">
              <Button
                className={`flex-1 ${!mod.version.includes("Coming Soon") ? "bg-pink-600 hover:bg-pink-700" : "bg-gray-700 cursor-not-allowed"}`}
                onClick={() => handleInject(mod)}
                disabled={mod.version.includes("Coming Soon")}
              >
                {!mod.version.includes("Coming Soon") ? "Inject Now" : "Coming Soon"}
              </Button>
              <Button
                variant="outline"
                className="border-pink-500/50 text-pink-400 hover:bg-pink-950/20"
                onClick={() => handleViewDetails(mod)}
              >
                Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {showInjectPopup && <FakeInjectHandler gameName="Valorant" onClose={() => setShowInjectPopup(false)} />}

      {selectedMod && (
        <ModDetailsModal
          mod={selectedMod}
          accentColor="pink"
          onClose={() => setSelectedMod(null)}
          onInject={() => {
            if (!selectedMod.version.includes("Coming Soon")) {
              setSelectedMod(null)
              setShowInjectPopup(true)
            }
          }}
        />
      )}
    </div>
  )
}
