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
    {
      id: "cod",
      name: "Modern Warfare II",
      description: "Master your CoD gameplay with our specialized modifications",
      image: "/images/cod-card.jpg",
      color: "gray",
      href: "/games/cod",
    },
    {
      id: "apex",
      name: "Apex Legends",
      description: "Dominate the arena with cutting-edge Apex Legends mods",
      image: "/images/apex-card.jpg",
      color: "red",
      href: "/games/apex",
    },
    {
      id: "overwatch",
      name: "Overwatch 2",
      description: "Take your Overwatch skills to the next level with custom tools",
      image: "/images/overwatch-card.jpg",
      color: "blue",
      href: "/games/overwatch",
    },
    {
      id: "rainbow",
      name: "Rainbow Six Siege",
      description: "Tactical advantage with premium Rainbow Six Siege mods",
      image: "/images/rainbow-card.jpg",
      color: "amber",
      href: "/games/rainbow",
    },
    {
      id: "battlefield",
      name: "Battlefield 2042",
      description: "Conquer the battlefield with these game-changing mods",
      image: "/images/battlefield-card.jpg",
      color: "blue",
      href: "/games/battlefield",
    },
    {
      id: "tarkov",
      name: "Escape from Tarkov",
      description: "Survive and thrive with these essential Tarkov tools",
      image: "/images/tarkov-card.jpg",
      color: "stone",
      href: "/games/tarkov",
    },
    {
      id: "pubg",
      name: "PUBG: Battlegrounds",
      description: "Get the winning edge in PUBG with these premium mods",
      image: "/images/pubg-card.jpg",
      color: "yellow",
      href: "/games/pubg",
    },
    {
      id: "halo",
      name: "Halo Infinite",
      description: "Elevate your Spartan with these advanced Halo mods",
      image: "/images/halo-card.jpg",
      color: "green",
      href: "/games/halo",
    },
    {
      id: "halflife",
      name: "Half-Life 2",
      description: "Revolutionize the classic with these Half-Life 2 mods",
      image: "/images/halflife-card.jpg",
      color: "orange",
      href: "/games/halflife",
    },
    {
      id: "doom",
      name: "DOOM Eternal",
      description: "Rip and tear even better with our DOOM Eternal enhancements",
      image: "/images/doom-card.jpg",
      color: "red",
      href: "/games/doom",
    },
    {
      id: "tf2",
      name: "Team Fortress 2",
      description: "Dominate any class with these TF2 mods and tools",
      image: "/images/tf2-card.jpg",
      color: "red",
      href: "/games/tf2",
    },
    {
      id: "quake",
      name: "Quake Champions",
      description: "Enhance your fragging ability with Quake Champions mods",
      image: "/images/quake-card.jpg",
      color: "purple",
      href: "/games/quake",
    },
    {
      id: "l4d2",
      name: "Left 4 Dead 2",
      description: "Survive the zombie apocalypse with these essential L4D2 tools",
      image: "/images/l4d2-card.jpg",
      color: "red",
      href: "/games/l4d2",
    },
    {
      id: "farcry",
      name: "Far Cry 3",
      description: "Master the island with these Far Cry 3 enhancement mods",
      image: "/images/farcry-card.jpg",
      color: "blue",
      href: "/games/farcry",
    },
    {
      id: "borderlands",
      name: "Borderlands 2",
      description: "Loot and shoot even better with these Borderlands 2 mods",
      image: "/images/borderlands-card.jpg",
      color: "yellow",
      href: "/games/borderlands",
    },
    {
      id: "metro",
      name: "Metro Exodus",
      description: "Survive the wasteland with these Metro Exodus enhancements",
      image: "/images/metro-card.jpg",
      color: "stone",
      href: "/games/metro",
    },
    {
      id: "callofjuarez",
      name: "Call of Juarez",
      description: "Become a legendary gunslinger with these western-themed mods",
      image: "/images/callofjuarez-card.jpg",
      color: "amber",
      href: "/games/callofjuarez",
    },
    {
      id: "titanfall",
      name: "Titanfall 2",
      description: "Elevate your pilot and titan skills with our premium mods",
      image: "/images/titanfall-card.jpg",
      color: "blue",
      href: "/games/titanfall",
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
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
