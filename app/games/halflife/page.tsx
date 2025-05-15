"use client"
import { GameHeader } from "@/components/games/game-header"
import { StatusBar } from "@/components/ui/status-bar"
export default function HalfLifeModPage() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <GameHeader
        name="Half-Life 2"
        description="Enhance your Half-Life 2 experience with our mods."
        image="/images/halflife-hero.jpg"
        color="orange"
      />
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="p-8 bg-black/40 rounded-lg border border-orange-500/30">
          <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
          <p className="text-gray-400">
            Our Half-Life 2 mods are currently in development. Check back soon for updates!
          </p>
        </div>
      </div>
    </div>
  )
}
