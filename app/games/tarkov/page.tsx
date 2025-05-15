"use client"

import { GameHeader } from "@/components/games/game-header"
import { StatusBar } from "@/components/ui/status-bar"
import { ModCard } from "@/components/games/mod-card"
import { useState } from "react"

export default function TarkovModPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const gameInfo = {
    name: "Escape from Tarkov",
    description: "Survive and dominate with our powerful Escape from Tarkov tools.",
    image: "/images/tarkov-hero.jpg",
    color: "stone",
    categories: ["all", "aimbot", "esp", "loot", "radar"],
  }

  const mods = [
    {
      id: "tarkov1",
      name: "Tarkov Radar",
      description: "Real-time radar showing all players and loot on the map",
      category: "radar",
      version: "v2.5",
      price: 24.99,
      priceType: "paid",
    },
    {
      id: "tarkov2",
      name: "Loot ESP",
      description: "See valuable loot through walls and containers",
      category: "loot",
      version: "v1.8",
      price: 14.99,
      priceType: "paid",
    },
  ]

  // Filter mods by active category
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
        {/* Category Selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {gameInfo.categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md transition-all ${
                activeCategory === category ? "bg-stone-600 text-white" : "bg-black/40 hover:bg-stone-900"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Mods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMods.map((mod) => (
            <ModCard
              key={mod.id}
              mod={{
                ...mod,
                game: "tarkov",
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
