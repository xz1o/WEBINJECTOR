"use client"

import { GameHeader } from "@/components/games/game-header"
import { StatusBar } from "@/components/ui/status-bar"
import { ModCard } from "@/components/games/mod-card"
import { useState } from "react"

export default function ApexModPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const gameInfo = {
    name: "Apex Legends",
    description: "Dominate the battlefield with our premium Apex Legends mods and tools.",
    image: "/images/apex-hero.jpg",
    color: "red",
    categories: ["all", "aimbot", "esp", "movement", "recoil"],
  }

  const mods = [
    {
      id: "apex1",
      name: "Apex Precision Aim",
      description: "Advanced aimbot with multiple targeting options",
      category: "aimbot",
      version: "v3.2",
      price: 19.99,
      priceType: "paid",
    },
    {
      id: "apex2",
      name: "Legend ESP Suite",
      description: "Complete ESP package including health bars and equipment info",
      category: "esp",
      version: "v2.7",
      price: 14.99,
      priceType: "paid",
    },
    {
      id: "apex3",
      name: "No Recoil System",
      description: "Eliminate weapon recoil for laser-accurate shots",
      category: "recoil",
      version: "v1.8",
      price: 9.99,
      priceType: "paid",
    },
    {
      id: "apex4",
      name: "Movement Enhancer",
      description: "Improved movement mechanics including better sliding and jumping",
      category: "movement",
      version: "v2.1",
      price: 0,
      priceType: "free",
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
                activeCategory === category ? "bg-red-600 text-white" : "bg-black/40 hover:bg-red-900"
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
                game: "apex",
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
