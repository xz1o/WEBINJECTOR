"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FakeInjectHandler } from "@/components/ui/fake-inject-handler"
import { ModDetailsModal } from "@/components/ui/mod-details-modal"

export function FortniteMods() {
  const [showInjectPopup, setShowInjectPopup] = useState(false)
  const [selectedMod, setSelectedMod] = useState<any>(null)

  const mods = [
    {
      name: "Aimbot",
      version: "Coming Soon",
      description: "Precision aiming assistance",
      features: [
        "Auto-aim at enemies",
        "Adjustable aim smoothness",
        "Target priority settings",
        "Visibility checks",
        "Compatible with all weapons",
      ],
      creator: "AimAssist",
      price: "$14.99",
      downloads: 0,
      rating: 0,
      status: "development",
      progress: 85,
    },
    {
      name: "ESP",
      version: "v1.2",
      description: "See players, items and chests through walls",
      features: [
        "Player ESP with distance",
        "Item ESP with rarity colors",
        "Chest and supply drop ESP",
        "Vehicle ESP",
        "Customizable colors and range",
      ],
      creator: "WallVision",
      price: "$9.99",
      downloads: 42156,
      rating: 4.7,
      status: "available",
      progress: 100,
    },
    {
      name: "Skin Swapper",
      version: "v3.0",
      description: "Use any skin in the game",
      features: [
        "Access to all skins",
        "Emote unlocker",
        "Pickaxe swapper",
        "Glider customization",
        "Only visible to you",
      ],
      creator: "SkinChanger",
      price: "$7.99",
      downloads: 68745,
      rating: 4.9,
      status: "available",
      progress: 100,
    },
    {
      name: "Rapid Fire",
      version: "Coming Soon",
      description: "Increase weapon fire rate",
      features: [
        "Increased fire rate for all weapons",
        "Adjustable multiplier",
        "Reduced recoil compensation",
        "Works with all firearms",
        "Toggle with hotkey",
      ],
      creator: "FireRate",
      price: "$12.99",
      downloads: 0,
      rating: 0,
      status: "development",
      progress: 65,
    },
    {
      name: "No Recoil",
      version: "v1.5",
      description: "Eliminate weapon recoil",
      features: [
        "Complete recoil elimination",
        "Works with all weapons",
        "Adjustable strength",
        "Compatible with other mods",
        "Undetectable in gameplay",
      ],
      creator: "SteadyAim",
      price: "$8.99",
      downloads: 35689,
      rating: 4.6,
      status: "available",
      progress: 100,
    },
    {
      name: "Auto Build",
      version: "Coming Soon",
      description: "Automated building structures",
      features: [
        "One-click fortress building",
        "Custom build templates",
        "Instant edit mode",
        "Material optimization",
        "Build battle assistance",
      ],
      creator: "BuildMaster",
      price: "$19.99",
      downloads: 0,
      rating: 0,
      status: "development",
      progress: 40,
    },
  ]

  const handleInject = (mod: any) => {
    if (mod.status === "available") {
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
            className="p-6 bg-black/40 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{mod.name}</h3>
              <Badge
                variant="outline"
                className={`text-xs ${mod.status === "development" ? "text-yellow-400 border-yellow-400/50" : ""}`}
              >
                {mod.version}
              </Badge>
            </div>
            <p className="text-gray-400 mb-4">{mod.description}</p>

            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <div>By {mod.creator}</div>
              <div>{mod.price === "Free" ? "Free" : mod.price}</div>
            </div>

            {mod.status === "development" && (
              <div className="mb-6">
                <div className="flex justify-between text-xs mb-1">
                  <span>Development Progress</span>
                  <span>{mod.progress}%</span>
                </div>
                <Progress value={mod.progress} className="h-2" />
              </div>
            )}

            <div className="flex gap-2">
              <Button
                className={`flex-1 ${mod.status === "available" ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-700 cursor-not-allowed"}`}
                onClick={() => handleInject(mod)}
                disabled={mod.status !== "available"}
              >
                {mod.status === "available" ? "Inject Now" : "Coming Soon"}
              </Button>
              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-950/20"
                onClick={() => handleViewDetails(mod)}
              >
                Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {showInjectPopup && <FakeInjectHandler gameName="Fortnite" onClose={() => setShowInjectPopup(false)} />}

      {selectedMod && (
        <ModDetailsModal
          mod={selectedMod}
          accentColor="purple"
          onClose={() => setSelectedMod(null)}
          onInject={() => {
            if (selectedMod.status === "available") {
              setSelectedMod(null)
              setShowInjectPopup(true)
            }
          }}
        />
      )}
    </div>
  )
}
