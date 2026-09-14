"use client"

import { useState } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GAMES, type Game } from "@/lib/games"
import { ArrowRight } from "lucide-react"

export function DiscoveryTabs() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const categories = [
    { id: "competitive", label: "Competitive", icon: "01" },
    { id: "casual", label: "Casual", icon: "02" },
    { id: "adventure", label: "Adventure", icon: "03" },
    { id: "rpg", label: "RPG", icon: "04" },
    { id: "strategy", label: "Strategy", icon: "05" },
  ]

  const toggleFavorite = (gameId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(gameId)) {
        next.delete(gameId)
      } else {
        next.add(gameId)
      }
      return next
    })
  }

  const getCategoryGames = (category: string) => {
    return GAMES.filter((g) => g.category === category)
  }

  const renderGameGrid = (games: Game[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {games.map((game) => (
        <div
          key={game.id}
          className="group relative bg-gradient-to-br from-slate-900 to-black border border-slate-700 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative p-4 flex flex-col h-full">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{game.name}</h3>
              <button
                onClick={() => toggleFavorite(game.id)}
                className={`text-xl transition-transform duration-200 ${
                  favorites.has(game.id) ? "scale-110" : "hover:scale-110"
                }`}
              >
                {favorites.has(game.id) ? "❤️" : "🤍"}
              </button>
            </div>

            <p className="text-sm text-slate-400 mb-3 flex-grow">{game.description}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {game.tags?.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
              <span>{game.modsCount || 0} mods</span>
              <span>★ {game.rating || "N/A"}</span>
            </div>

            <Link href={game.href} className="w-full">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/20 hover:border-cyan-500 group-hover:border-cyan-500 transition-all"
              >
                Explore
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section className="py-16 bg-gradient-to-b from-black to-slate-950">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Discover by Category
            </span>
          </h2>
          <p className="text-slate-400">Browse games by your preferred playstyle</p>
        </div>

        <Tabs defaultValue="competitive" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-slate-900/50 border border-slate-700 p-1">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white text-slate-400 hover:text-white transition-colors"
              >
                <span className="mr-2">{cat.icon}</span>
                <span className="hidden sm:inline">{cat.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-8">
              {renderGameGrid(getCategoryGames(cat.id))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
