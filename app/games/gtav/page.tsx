import { StatusBar } from "@/components/ui/status-bar"
import { GTAVMods } from "@/components/games/gtav-mods"
import { GameHeader } from "@/components/games/game-header"

export default function GTAVPage() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <GameHeader
        title="GTA V"
        description="Transform your GTA V experience with these powerful mods"
        accentColor="red"
        bgImage="/images/gtav-bg.jpg"
      />
      <GTAVMods />
    </div>
  )
}
