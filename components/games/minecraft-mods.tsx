"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FakeInjectHandler } from "@/components/ui/fake-inject-handler"
import { ModDetailsModal } from "@/components/ui/mod-details-modal"

export function MinecraftMods() {
  const [showInjectPopup, setShowInjectPopup] = useState(false)
  const [selectedMod, setSelectedMod] = useState<any>(null)

  const mods = [
    {
      name: "NovaClient",
      version: "1.19.2",
      description: "Complete gameplay overhaul with combat assistance",
      features: [
        "Advanced combat assistance",
        "Auto-aim and hit detection",
        "ESP for players and mobs",
        "Custom UI with dark theme",
        "Performance optimizations",
      ],
      creator: "NovaTeam",
      price: "Free",
      downloads: 45892,
      rating: 4.8,
    },
    {
      name: "WurstClient",
      version: "1.18.2",
      description: "Classic client with extensive hack options",
      features: [
        "Over 100 different hacks",
        "Customizable keybinds",
        "Built-in VPN",
        "Anti-detection system",
        "Regular updates",
      ],
      creator: "WurstDev",
      price: "Free",
      downloads: 128745,
      rating: 4.5,
    },
    {
      name: "Aristois",
      version: "1.20.1",
      description: "Modern client with clean UI and powerful features",
      features: [
        "Clean, modern interface",
        "Combat enhancements",
        "Movement hacks",
        "Visual improvements",
        "Server-specific optimizations",
      ],
      creator: "AristoisTeam",
      price: "$9.99",
      downloads: 32156,
      rating: 4.9,
    },
    {
      name: "Impact",
      version: "1.16.5",
      description: "Feature-rich client with customizable modules",
      features: [
        "Highly customizable modules",
        "Advanced movement options",
        "X-ray and cave finder",
        "Auto-farm capabilities",
        "Multiplayer enhancements",
      ],
      creator: "ImpactTeam",
      price: "Free",
      downloads: 89421,
      rating: 4.3,
    },
    {
      name: "Future",
      version: "1.19.4",
      description: "Premium client with advanced protection bypasses",
      features: [
        "Advanced anti-cheat bypasses",
        "Premium support",
        "Regular updates",
        "Custom modules",
        "Priority feature requests",
      ],
      creator: "FutureTeam",
      price: "$19.99",
      downloads: 15782,
      rating: 4.7,
    },
    {
      name: "Meteor Client",
      version: "1.20.2",
      description: "Open-source client focused on performance",
      features: [
        "Open-source development",
        "Community-driven features",
        "Performance optimizations",
        "Minimal visual impact",
        "Compatibility with other mods",
      ],
      creator: "MeteorDev",
      price: "Free",
      downloads: 67234,
      rating: 4.6,
    },
  ]

  const handleInject = (mod: any) => {
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
            className="p-6 bg-black/40 border-green-500/30 hover:border-green-500/60 transition-all duration-300"
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

            <div className="flex gap-2">
              <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleInject(mod)}>
                Inject Now
              </Button>
              <Button
                variant="outline"
                className="border-green-500/50 text-green-400 hover:bg-green-950/20"
                onClick={() => handleViewDetails(mod)}
              >
                Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {showInjectPopup && <FakeInjectHandler gameName="Minecraft" onClose={() => setShowInjectPopup(false)} />}

      {selectedMod && (
        <ModDetailsModal
          mod={selectedMod}
          accentColor="green"
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
