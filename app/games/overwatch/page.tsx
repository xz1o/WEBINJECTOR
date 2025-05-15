"use client"

import { GameHeader } from "@/components/games/game-header"
import { StatusBar } from "@/components/ui/status-bar"
import { ModCard } from "@/components/games/mod-card"
import { useState } from "react"

export default function OverwatchModPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const gameInfo = {
    name: "Overwatch 2",
    description: "Enhance your Overwatch 2 gameplay with our powerful mods and tools.",
    image: "/images/overwatch-hero.jpg",
    color: "blue",
    categories: ["all", "aimbot", "esp", "abilities", "ultimate"],
  }

  const mods = [
    {
      id: "overwatch1",
      name: "Hero Aimbot",
      description: "Character-specific aimbot tailored for each hero's weapons",
      category: "aimbot",
      version: "v2.5",
      price: 24.99,
      priceType: "paid",
    },
    {
      id: "overwatch2",
      name: "Ultimate Tracker",
      description: "Track enemy ultimates and receive notifications when they're ready",
      category: "ultimate",
      version: "v1.8",
      price: 0,
      priceType: "free",
    },
    {
      id: "overwatch3",
      name: "Ability Enhancer",
      description: "Get the most out of each hero's abilities with timing assistance",
      category: "abilities",
      version: "v2.2",
      price: 14.99,
      priceType: "paid",
    },
    {
      id: "overwatch4",
      name: "Complete ESP Package",
      description: "Full ESP suite with health bars, ultimate status, and more",
      category: "esp",
      version: "v3.1",
      price: 19.99,
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
                activeCategory === category ? "bg-blue-600 text-white" : "bg-black/40 hover:bg-blue-900"
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
                game: "overwatch",
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
