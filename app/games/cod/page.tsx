"use client"

import { GameHeader } from "@/components/games/game-header"
import { StatusBar } from "@/components/ui/status-bar"
import { ModCard } from "@/components/games/mod-card"
import { useState } from "react"

export default function CODModPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const gameInfo = {
    name: "Call of Duty: Modern Warfare II",
    description: "Enhance your Modern Warfare II experience with our cutting-edge mods and tools.",
    image: "/images/cod-hero.jpg",
    color: "gray",
    categories: ["all", "aimbot", "esp", "movement", "unlock"],
  }

  const mods = [
    {
      id: "cod1",
      name: "Advanced Warfare Aimbot",
      description: "Precision aimbot with customizable FOV and bone targeting",
      category: "aimbot",
      version: "v2.1",
      price: 19.99,
      priceType: "paid",
    },
    {
      id: "cod2",
      name: "Ultimate ESP Package",
      description: "See enemies through walls with customizable options and distance indicators",
      category: "esp",
      version: "v3.0",
      price: 0,
      priceType: "free",
    },
    {
      id: "cod3",
      name: "Movement Enhancer",
      description: "Improve your movement mechanics for better gameplay",
      category: "movement",
      version: "v1.5",
      price: 9.99,
      priceType: "paid",
    },
    {
      id: "cod4",
      name: "All Weapons Unlocker",
      description: "Unlock all weapons and attachments instantly",
      category: "unlock",
      version: "v2.2",
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
                activeCategory === category ? "bg-gray-600 text-white" : "bg-black/40 hover:bg-gray-900"
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
                game: "cod",
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
