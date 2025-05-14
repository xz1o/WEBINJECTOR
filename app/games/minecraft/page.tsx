import { StatusBar } from "@/components/ui/status-bar"
import { MinecraftMods } from "@/components/games/minecraft-mods"
import { GameHeader } from "@/components/games/game-header"

export default function MinecraftPage() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <GameHeader
        title="Minecraft"
        description="Enhance your Minecraft experience with powerful client mods"
        accentColor="green"
        bgImage="/images/minecraft-bg.jpg"
      />
      <MinecraftMods />
    </div>
  )
}
