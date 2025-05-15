"use client"

import { GameHeader } from "@/components/games/game-header"
import { StatusBar } from "@/components/ui/status-bar"
import { ModCard } from "@/components/games/mod-card"
import { useState } from "react"

export default function BattlefieldModPage() {
  // Similar structure to previous examples
  const [activeCategory, setActiveCategory] = useState("all")
  const gameInfo = {
    name: "Battlefield 2042",
    description: "Dominate the battlefield with our premium Battlefield 2042 mods.",
    image: "/images/battlefield-hero.jpg",
    color: "blue",
    categories: ["all", "aimbot", "esp", "vehicles", "weapons"],
  }

  const mods = [
    {
      id: "bf1",
      name: "Battlefield Aimbot",
      description: "Advanced aimbot for all weapons",
      category: "aimbot",
      version: "v2.0",
      price: 19.99,
      priceType: "paid",
    },
    // More mods would be added here
  ]

  const filteredMods = activeCategory === "all" ? mods : mods.filter((mod) => mod.category === activeCategory)

  return (
    <div className="min-h-screen">
      <StatusBar />
      <GameHeader
        name={gameInfo.name}
        description={gameInfo.description}
        image={gameInfo.image}
        color={gameInfo.color}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Category selectors */}
        <div className="flex flex-wrap gap-2 mb-8">
          {gameInfo.categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md transition-all ${
                activeCategory === category ? "bg-blue-600 text-white" : "bg-black/40 hover:bg-blue-900"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Mods grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMods.map((mod) => (
            <ModCard
              key={mod.id}
              mod={{
                ...mod,
                game: "battlefield",
                gameDisplayName: gameInfo.name,
                creator: "WebInject Team",
                features: ["Feature 1", "Feature 2", "Feature 3"],
                downloads: Math.floor(Math.random() * 10000),
                rating: (3 + Math.random() * 2).toFixed(1),
                uploadDate: new Date().toISOString(),
                accentColor: gameInfo.color,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
