"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FakeInjectHandler } from "@/components/ui/fake-inject-handler"
import { ModDetailsModal } from "@/components/ui/mod-details-modal"

export function CS2Mods() {
  const [showInjectPopup, setShowInjectPopup] = useState(false)
  const [selectedMod, setSelectedMod] = useState<any>(null)

  const mods = [
    {
      name: "Aimbot",
      version: "v2.4",
      description: "Precision aiming assistance",
      features: [
        "Customizable FOV",
        "Target bone selection",
        "Visibility checks",
        "Smooth aim",
        "Recoil control system",
      ],
      creator: "HeadshotPro",
      price: "$24.99",
      downloads: 68452,
      rating: 4.8,
    },
    {
      name: "ESP",
      version: "v3.0",
      description: "See players through walls",
      features: ["Player box ESP", "Skeleton ESP", "Health & armor display", "Weapon information", "Sound ESP"],
      creator: "WallVision",
      price: "$19.99",
      downloads: 85321,
      rating: 4.7,
    },
    {
      name: "Bhop",
      version: "v1.8",
      description: "Auto bunny hop for faster movement",
      features: [
        "Perfect jump timing",
        "Strafe optimization",
        "Speed control",
        "Toggle with hotkey",
        "Anti-detection measures",
      ],
      creator: "HopMaster",
      price: "$9.99",
      downloads: 92156,
      rating: 4.6,
    },
    {
      name: "Skin Changer",
      version: "v4.2",
      description: "Use any skin in the game",
      features: [
        "All weapon skins unlocked",
        "Knife models and skins",
        "Glove customization",
        "Sticker application",
        "Float value adjustment",
      ],
      creator: "SkinVault",
      price: "$14.99",
      downloads: 108745,
      rating: 4.9,
    },
    {
      name: "No Recoil",
      version: "v2.0",
      description: "Eliminate weapon recoil",
      features: [
        "Complete recoil elimination",
        "Weapon-specific profiles",
        "Adjustable strength",
        "Compatible with other mods",
        "Works with all weapons",
      ],
      creator: "SteadyAim",
      price: "$8.99",
      downloads: 65689,
      rating: 4.8,
    },
    {
      name: "Trigger Bot",
      version: "v1.5",
      description: "Auto-fire when crosshair is on enemy",
      features: [
        "Automatic firing",
        "Adjustable delay",
        "Target priority",
        "Weapon-specific settings",
        "Toggle with hotkey",
      ],
      creator: "TriggerTeam",
      price: "$12.99",
      downloads: 74521,
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
            className="p-6 bg-black/40 border-orange-500/30 hover:border-orange-500/60 transition-all duration-300"
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
              <div>{mod.price}</div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 bg-orange-600 hover:bg-orange-700" onClick={() => handleInject(mod)}>
                Inject Now
              </Button>
              <Button
                variant="outline"
                className="border-orange-500/50 text-orange-400 hover:bg-orange-950/20"
                onClick={() => handleViewDetails(mod)}
              >
                Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {showInjectPopup && <FakeInjectHandler gameName="CS2" onClose={() => setShowInjectPopup(false)} />}

      {selectedMod && (
        <ModDetailsModal
          mod={selectedMod}
          accentColor="orange"
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
