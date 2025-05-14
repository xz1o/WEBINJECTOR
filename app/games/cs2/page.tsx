import { StatusBar } from "@/components/ui/status-bar"
import { CS2Mods } from "@/components/games/cs2-mods"
import { GameHeader } from "@/components/games/game-header"

export default function CS2Page() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <GameHeader
        title="CS2"
        description="Dominate in Counter-Strike 2 with these powerful tools"
        accentColor="orange"
        bgImage="/images/cs2-bg.jpg"
      />
      <CS2Mods />
    </div>
  )
}
