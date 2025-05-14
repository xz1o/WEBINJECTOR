import { StatusBar } from "@/components/ui/status-bar"
import { ValorantMods } from "@/components/games/valorant-mods"
import { GameHeader } from "@/components/games/game-header"

export default function ValorantPage() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <GameHeader
        title="Valorant"
        description="Enhance your Valorant gameplay with these advanced tools"
        accentColor="pink"
        bgImage="/images/valorant-bg.jpg"
      />
      <ValorantMods />
    </div>
  )
}
