import { StatusBar } from "@/components/ui/status-bar"
import { FortniteMods } from "@/components/games/fortnite-mods"
import { GameHeader } from "@/components/games/game-header"

export default function FortnitePage() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <GameHeader
        title="Fortnite"
        description="Gain the competitive edge in Fortnite with these advanced mods"
        accentColor="purple"
        bgImage="/images/fortnite-bg.jpg"
      />
      <FortniteMods />
    </div>
  )
}
