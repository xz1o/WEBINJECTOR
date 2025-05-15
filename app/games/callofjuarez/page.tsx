"use client"
import { GameHeader } from "@/components/games/game-header"
import { StatusBar } from "@/components/ui/status-bar"
export default function CallOfJuarezModPage() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <GameHeader
        name="Call of Juarez: Gunslinger"
        description="Become the ultimate gunslinger with our Call of Juarez mods."
        image="/images/callofjuarez-hero.jpg"
        color="amber"
      />
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="p-8 bg-black/40 rounded-lg border border-amber-500/30">
          <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
          <p className="text-gray-400">
            Our Call of Juarez: Gunslinger mods are currently in development. Check back soon for updates!
          </p>
        </div>
      </div>
    </div>
  )
}
