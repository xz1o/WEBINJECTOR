import { StatusBar } from "@/components/ui/status-bar"
import { RobloxMods } from "@/components/games/roblox-mods"
import { GameHeader } from "@/components/games/game-header"

export default function RobloxPage() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <GameHeader
        title="Roblox"
        description="Unlock new possibilities in Roblox with these powerful tweaks"
        accentColor="blue"
        bgImage="/images/roblox-bg.jpg"
      />
      <RobloxMods />
    </div>
  )
}
