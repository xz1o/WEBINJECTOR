"use client"
import { GameHeader } from "@/components/games/game-header"
import { StatusBar } from "@/components/ui/status-bar"
export default function TF2ModPage() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <GameHeader
        name="Team Fortress 2"
        description="Dominate with our Team Fortress 2 mods."
        image="/images/tf2-hero.jpg"
        color="red"
      />
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="p-8 bg-black/40 rounded-lg border border-red-500/30">
          <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
          <p className="text-gray-400">
            Our Team Fortress 2 mods are currently in development. Check back soon for updates!
          </p>
        </div>
      </div>
    </div>
  )
}
