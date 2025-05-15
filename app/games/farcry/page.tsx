"use client"
import { GameHeader } from "@/components/games/game-header"
import { StatusBar } from "@/components/ui/status-bar"
export default function FarCryModPage() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <GameHeader
        name="Far Cry 3"
        description="Master the island with our Far Cry 3 mods."
        image="/images/farcry-hero.jpg"
        color="blue"
      />
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="p-8 bg-black/40 rounded-lg border border-blue-500/30">
          <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
          <p className="text-gray-400">Our Far Cry 3 mods are currently in development. Check back soon for updates!</p>
        </div>
      </div>
    </div>
  )
}
