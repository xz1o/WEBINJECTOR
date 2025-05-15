"use client"
import { GameHeader } from "@/components/games/game-header"
import { StatusBar } from "@/components/ui/status-bar"
export default function TitanfallModPage() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <GameHeader
        name="Titanfall 2"
        description="Elevate your pilot and titan skills with our Titanfall 2 mods."
        image="/images/titanfall-hero.jpg"
        color="blue"
      />
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="p-8 bg-black/40 rounded-lg border border-blue-500/30">
          <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
          <p className="text-gray-400">
            Our Titanfall 2 mods are currently in development. Check back soon for updates!
          </p>
        </div>
      </div>
    </div>
  )
}
