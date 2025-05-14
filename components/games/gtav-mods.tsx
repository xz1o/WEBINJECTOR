"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FakeInjectHandler } from "@/components/ui/fake-inject-handler"
import { ModDetailsModal } from "@/components/ui/mod-details-modal"

export function GTAVMods() {
  const [showInjectPopup, setShowInjectPopup] = useState(false)
  const [selectedMod, setSelectedMod] = useState<any>(null)

  const mods = [
    {
      name: "Money Hack",
      version: "v2.1",
      description: "Generate unlimited in-game currency",
      features: [
        "Safe money generation",
        "Anti-ban protection",
        "Customizable amounts",
        "Works online and offline",
        "Regular updates for security",
      ],
      creator: "CashFlow",
      price: "$19.99",
      downloads: 98452,
      rating: 4.8,
    },
    {
      name: "Vehicle Spawner",
      version: "v3.4",
      description: "Spawn any vehicle instantly",
      features: [
        "Access to all vehicles",
        "Custom vehicle modifications",
        "Save favorite vehicles",
        "Spawn at location",
        "Vehicle weapons add-on",
      ],
      creator: "CarSpawn",
      price: "$9.99",
      downloads: 75321,
      rating: 4.7,
    },
    {
      name: "Teleport",
      version: "v1.8",
      description: "Teleport anywhere on the map",
      features: [
        "Instant teleportation",
        "Save locations",
        "Map marker teleport",
        "Mission location teleport",
        "Safe house quick travel",
      ],
      creator: "JumpPoint",
      price: "Free",
      downloads: 112156,
      rating: 4.5,
    },
    {
      name: "God Mode",
      version: "v2.0",
      description: "Become invincible to all damage",
      features: [
        "Complete invincibility",
        "No wanted level",
        "Unlimited ammo",
        "No reload",
        "Vehicle invincibility option",
      ],
      creator: "Immortal",
      price: "$14.99",
      downloads: 88745,
      rating: 4.9,
    },
    {
      name: "Weapon Kit",
      version: "v4.2",
      description: "Access all weapons with unlimited ammo",
      features: [
        "All weapons unlocked",
        "Unlimited ammunition",
        "Weapon customization",
        "Special weapons access",
        "One-shot kill option",
      ],
      creator: "ArsenalPlus",
      price: "$7.99",
      downloads: 65689,
      rating: 4.6,
    },
    {
      name: "Stealth Mode",
      version: "v1.3",
      description: "Become invisible to NPCs and police",
      features: [
        "Complete invisibility",
        "No wanted level",
        "Silent movement",
        "Pass through security",
        "Compatible with other mods",
      ],
      creator: "GhostMode",
      price: "$11.99",
      downloads: 41452,
      rating: 4.7,
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
            className="p-6 bg-black/40 border-red-500/30 hover:border-red-500/60 transition-all duration-300"
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
              <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={() => handleInject(mod)}>
                Inject Now
              </Button>
              <Button
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-950/20"
                onClick={() => handleViewDetails(mod)}
              >
                Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {showInjectPopup && <FakeInjectHandler gameName="GTA V" onClose={() => setShowInjectPopup(false)} />}

      {selectedMod && (
        <ModDetailsModal
          mod={selectedMod}
          accentColor="red"
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
