"use client"

import { SVGIconLibrary } from "@/components/ui/svg-icon-library"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface GameCardProps {
  game: {
    id: string
    name: string
    description: string
    image: string
    color: string
    href: string
  }
  isActive: boolean
  onClick: () => void
}

export function GameCard({ game, isActive, onClick }: GameCardProps) {
  const getBorderClass = (color: string) => {
    switch (color) {
      case "green":
        return "border-green-500/30 hover:border-green-500/60"
      case "blue":
        return "border-blue-500/30 hover:border-blue-500/60"
      case "purple":
        return "border-purple-500/30 hover:border-purple-500/60"
      case "red":
        return "border-red-500/30 hover:border-red-500/60"
      case "pink":
        return "border-pink-500/30 hover:border-pink-500/60"
      case "orange":
        return "border-orange-500/30 hover:border-orange-500/60"
      default:
        return "border-cyan-500/30 hover:border-cyan-500/60"
    }
  }

  const getActiveClass = (color: string) => {
    switch (color) {
      case "green":
        return "border-green-500 bg-green-950/20"
      case "blue":
        return "border-blue-500 bg-blue-950/20"
      case "purple":
        return "border-purple-500 bg-purple-950/20"
      case "red":
        return "border-red-500 bg-red-950/20"
      case "pink":
        return "border-pink-500 bg-pink-950/20"
      case "orange":
        return "border-orange-500 bg-orange-950/20"
      default:
        return "border-cyan-500 bg-cyan-950/20"
    }
  }

  return (
    <Link href={game.href}>
      <button
        className={cn(
          "h-auto py-4 w-full flex flex-col items-center gap-2 bg-black/40 border rounded-md hover:bg-purple-900/20 transition-all duration-300",
          getBorderClass(game.color),
          isActive && getActiveClass(game.color),
        )}
        onClick={onClick}
      >
        <SVGIconLibrary name={game.id} className="h-8 w-8" />
        <span>{game.name}</span>
      </button>
    </Link>
  )
}
