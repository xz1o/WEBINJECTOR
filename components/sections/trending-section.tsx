"use client"

import Link from "next/link"
import { getTrendingGames, getRecentGames } from "@/lib/games"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, TrendingUp, Clock } from "lucide-react"

export function TrendingSection() {
  const trendingGames = getTrendingGames(6)
  const recentGames = getRecentGames(6)

  const renderGamesList = (games: typeof trendingGames, showTrending: boolean) => (
    <div className="space-y-3">
      {games.map((game, idx) => (
        <Link key={game.id} href={game.href}>
          <div className="group cursor-pointer p-4 bg-slate-900/40 border border-slate-700 rounded-lg hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all duration-200">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3 flex-grow">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{game.name}</h3>
                  <p className="text-xs text-slate-400">{game.category}</p>
                </div>
              </div>
              {game.rating && (
                <div className="text-sm font-semibold text-cyan-400">★ {game.rating}</div>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>{game.downloadsCount?.toLocaleString() || "0"} downloads</span>
              <span className="text-slate-700">•</span>
              <span>{game.modsCount || 0} mods</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )

  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trending Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Trending Now</h2>
                <p className="text-sm text-slate-400">Most popular right now</p>
              </div>
            </div>

            {renderGamesList(trendingGames, true)}

            <Link href="/marketplace?filter=trending" className="mt-6 block">
              <Button
                variant="outline"
                className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/20 hover:border-cyan-500"
              >
                View All Trending
              </Button>
            </Link>
          </div>

          {/* Recent Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Recently Added</h2>
                <p className="text-sm text-slate-400">Latest additions</p>
              </div>
            </div>

            {renderGamesList(recentGames, false)}

            <Link href="/marketplace?filter=recent" className="mt-6 block">
              <Button
                variant="outline"
                className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-950/20 hover:border-purple-500"
              >
                View All Recent
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-12 grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-slate-900/50 to-slate-800/30 border border-slate-700 rounded-lg">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-cyan-400">24</div>
            <p className="text-xs md:text-sm text-slate-400">Total Games</p>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-purple-400">1000+</div>
            <p className="text-xs md:text-sm text-slate-400">Total Mods</p>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-pink-400">500K+</div>
            <p className="text-xs md:text-sm text-slate-400">Total Downloads</p>
          </div>
        </div>
      </div>
    </section>
  )
}
