"use client"

import { useState } from "react"
import Link from "next/link"
import { GameCard } from "@/components/ui/game-card"

export function FeaturedGamesSection() {
  const [activeGame, setActiveGame] = useState("minecraft")

  const games = [
    {
      id: "minecraft",
      name: "Minecraft",
      description: "Enhance your Minecraft experience with powerful client mods",
      image: "/images/minecraft-card.jpg",
      color: "green",
      href: "/games/minecraft",
    },
    {
      id: "roblox",
      name: "Roblox",
      description: "Unlock new possibilities in Roblox with these powerful tweaks",
      image: "/images/roblox-card.jpg",
      color: "blue",
      href: "/games/roblox",
    },
    {
      id: "fortnite",
      name: "Fortnite",
      description: "Gain the competitive edge in Fortnite with these advanced mods",
      image: "/images/fortnite-card.jpg",
      color: "purple",
      href: "/games/fortnite",
    },
    {
      id: "gtav",
      name: "GTA V",
      description: "Transform your GTA V experience with these powerful mods",
      image: "/images/gtav-card.jpg",
      color: "red",
      href: "/games/gtav",
    },
    {
      id: "valorant",
      name: "Valorant",
      description: "Enhance your Valorant gameplay with these advanced tools",
      image: "/images/valorant-card.jpg",
      color: "pink",
      href: "/games/valorant",
    },
    {
      id: "cs2",
      name: "CS2",
      description: "Dominate in Counter-Strike 2 with these powerful tools",
      image: "/images/cs2-card.jpg",
      color: "orange",
      href: "/games/cs2",
    },
  ]

  return (
    <section className="py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Featured Games
          </span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isActive={activeGame === game.id}
              onClick={() => setActiveGame(game.id)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href={games.find((g) => g.id === activeGame)?.href || "#"}>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md shadow-glow-purple transition-all duration-300">
              Explore {games.find((g) => g.id === activeGame)?.name} Mods
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
