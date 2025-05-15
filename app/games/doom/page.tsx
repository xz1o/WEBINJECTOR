"use client"
import { GameHeader } from "@/components/games/game-header"
import { StatusBar } from "@/components/ui/status-bar"
export default function DoomModPage() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <GameHeader
        name="DOOM Eternal"
        description="Rip and tear with our DOOM Eternal mods."
        image="/images/doom-hero.jpg"
        color="red"
      />
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="p-8 bg-black/40 rounded-lg border border-red-500/30">
          <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
          <p className="text-gray-400">
            Our DOOM Eternal mods are currently in development. Check back soon for updates!
          </p>
        </div>
      </div>
    </div>
  )
}
