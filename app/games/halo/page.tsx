"use client"
import { GameHeader } from "@/components/games/game-header"
import { StatusBar } from "@/components/ui/status-bar"
export default function HaloModPage() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <GameHeader
        name="Halo Infinite"
        description="Dominate the battlefield with our Halo Infinite mods."
        image="/images/halo-hero.jpg"
        color="green"
      />
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="p-8 bg-black/40 rounded-lg border border-green-500/30">
          <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
          <p className="text-gray-400">
            Our Halo Infinite mods are currently in development. Check back soon for updates!
          </p>
        </div>
      </div>
    </div>
  )
}
