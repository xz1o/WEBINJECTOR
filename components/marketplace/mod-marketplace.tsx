"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SVGIconLibrary } from "@/components/ui/svg-icon-library"
import { FakeInjectHandler } from "@/components/ui/fake-inject-handler"
import { ModDetailsModal } from "@/components/ui/mod-details-modal"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Check, X, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ModMarketplaceProps {
  filters: {
    game: string
    category: string
    price: string
    sort: string
  }
  searchQuery: string
}

export function ModMarketplace({ filters, searchQuery }: ModMarketplaceProps) {
  const [showInjectPopup, setShowInjectPopup] = useState(false)
  const [selectedMod, setSelectedMod] = useState<any>(null)
  const [gameForInjection, setGameForInjection] = useState("")
  const [filteredMods, setFilteredMods] = useState<any[]>([])
  const { toast } = useToast()

  // Moderation panel states
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState("")
  const [isModeratorMode, setIsModeratorMode] = useState(false)
  const [pendingMods, setPendingMods] = useState<any[]>([])
  const [selectedPendingMod, setSelectedPendingMod] = useState<any>(null)
  const [showDeclineDialog, setShowDeclineDialog] = useState(false)
  const [showAcceptDialog, setShowAcceptDialog] = useState(false)
  const [declineFeedback, setDeclineFeedback] = useState("")
  const passwordInputRef = useRef<HTMLInputElement>(null)

  // Key sequence detection for opening password modal
  const [keySequence, setKeySequence] = useState<string[]>([])

  // Sample marketplace mods data
  const mods = [
    {
      id: "1",
      name: "Ultimate Aimbot",
      game: "valorant",
      gameDisplayName: "Valorant",
      category: "combat",
      description: "Advanced aimbot with customizable settings and anti-detection",
      version: "v3.2",
      creator: "AimMaster",
      creatorId: "user123",
      price: 19.99,
      priceType: "paid",
      downloads: 12845,
      rating: 4.8,
      uploadDate: "2023-12-15",
      features: [
        "Customizable FOV",
        "Target bone selection",
        "Visibility checks",
        "Smooth aim",
        "Recoil control system",
      ],
      accentColor: "pink",
      status: "approved",
    },
    {
      id: "2",
      name: "NovaClient",
      game: "minecraft",
      gameDisplayName: "Minecraft",
      category: "client",
      description: "Complete gameplay overhaul with combat assistance",
      version: "v2.1",
      creator: "NovaTeam",
      creatorId: "user456",
      price: 0,
      priceType: "free",
      downloads: 45892,
      rating: 4.7,
      uploadDate: "2024-01-20",
      features: [
        "Advanced combat assistance",
        "Auto-aim and hit detection",
        "ESP for players and mobs",
        "Custom UI with dark theme",
        "Performance optimizations",
      ],
      accentColor: "green",
      status: "approved",
    },
    {
      id: "3",
      name: "Money Hack",
      game: "gtav",
      gameDisplayName: "GTA V",
      category: "economy",
      description: "Generate unlimited in-game currency safely",
      version: "v4.0",
      creator: "CashFlow",
      creatorId: "user789",
      price: 24.99,
      priceType: "paid",
      downloads: 9876,
      rating: 4.9,
      uploadDate: "2024-02-05",
      features: [
        "Safe money generation",
        "Anti-ban protection",
        "Customizable amounts",
        "Works online and offline",
        "Regular updates for security",
      ],
      accentColor: "red",
      status: "approved",
    },
    {
      id: "4",
      name: "Wallhack Pro",
      game: "cs2",
      gameDisplayName: "CS2",
      category: "visual",
      description: "Advanced ESP with customizable features",
      version: "v2.8",
      creator: "WallVision",
      creatorId: "user321",
      price: 14.99,
      priceType: "paid",
      downloads: 15632,
      rating: 4.6,
      uploadDate: "2024-01-10",
      features: ["Player box ESP", "Skeleton ESP", "Health & armor display", "Weapon information", "Sound ESP"],
      accentColor: "orange",
      status: "approved",
    },
    {
      id: "5",
      name: "Fly Hack",
      game: "roblox",
      gameDisplayName: "Roblox",
      category: "movement",
      description: "Freely fly around any Roblox game",
      version: "v1.5",
      creator: "SkyHacker",
      creatorId: "user654",
      price: 0,
      priceType: "free",
      downloads: 28745,
      rating: 4.5,
      uploadDate: "2024-02-18",
      features: [
        "Toggle flight with a hotkey",
        "Adjustable flight speed",
        "Noclip through objects while flying",
        "Anti-detection measures",
        "Works in most popular games",
      ],
      accentColor: "blue",
      status: "approved",
    },
    {
      id: "6",
      name: "Build Master",
      game: "fortnite",
      gameDisplayName: "Fortnite",
      category: "utility",
      description: "Automated building structures with one click",
      version: "v2.2",
      creator: "BuildPro",
      creatorId: "user987",
      price: 9.99,
      priceType: "paid",
      downloads: 7865,
      rating: 4.7,
      uploadDate: "2024-01-30",
      features: [
        "One-click fortress building",
        "Custom build templates",
        "Instant edit mode",
        "Material optimization",
        "Build battle assistance",
      ],
      accentColor: "purple",
      status: "approved",
    },
    {
      id: "7",
      name: "Skin Unlocker",
      game: "valorant",
      gameDisplayName: "Valorant",
      category: "cosmetic",
      description: "Unlock all skins in the game",
      version: "v3.1",
      creator: "SkinVault",
      creatorId: "user753",
      price: 12.99,
      priceType: "paid",
      downloads: 19874,
      rating: 4.8,
      uploadDate: "2024-02-12",
      features: [
        "Access to all weapon skins",
        "Player card unlocker",
        "Gun buddy customization",
        "Spray unlocker",
        "Only visible to you",
      ],
      accentColor: "pink",
      status: "approved",
    },
    {
      id: "8",
      name: "Auto Farm",
      game: "minecraft",
      gameDisplayName: "Minecraft",
      category: "utility",
      description: "Automated resource collection and farming",
      version: "v1.8",
      creator: "FarmBot",
      creatorId: "user159",
      price: 4.99,
      priceType: "paid",
      downloads: 32541,
      rating: 4.6,
      uploadDate: "2024-01-05",
      features: [
        "Crop harvesting and replanting",
        "Animal breeding and slaughtering",
        "Resource collection",
        "Customizable farm layouts",
        "Compatible with most servers",
      ],
      accentColor: "green",
      status: "approved",
    },
    {
      id: "9",
      name: "Speed Boost",
      game: "roblox",
      gameDisplayName: "Roblox",
      category: "movement",
      description: "Move faster than other players",
      version: "v2.0",
      creator: "VelocityMods",
      creatorId: "user357",
      price: 0,
      priceType: "free",
      downloads: 41256,
      rating: 4.4,
      uploadDate: "2024-02-01",
      features: [
        "Adjustable speed multiplier",
        "Quick toggle hotkey",
        "Works in most games",
        "Anti-detection measures",
        "Compatible with movement mods",
      ],
      accentColor: "blue",
      status: "approved",
    },
    {
      id: "10",
      name: "Teleport Pro",
      game: "gtav",
      gameDisplayName: "GTA V",
      category: "movement",
      description: "Teleport anywhere on the map instantly",
      version: "v2.5",
      creator: "JumpPoint",
      creatorId: "user852",
      price: 7.99,
      priceType: "paid",
      downloads: 14785,
      rating: 4.7,
      uploadDate: "2024-01-25",
      features: [
        "Instant teleportation",
        "Save locations",
        "Map marker teleport",
        "Mission location teleport",
        "Safe house quick travel",
      ],
      accentColor: "red",
      status: "approved",
    },
    {
      id: "11",
      name: "Bhop Master",
      game: "cs2",
      gameDisplayName: "CS2",
      category: "movement",
      description: "Perfect bunny hopping for maximum speed",
      version: "v1.7",
      creator: "HopMaster",
      creatorId: "user426",
      price: 0,
      priceType: "free",
      downloads: 28963,
      rating: 4.5,
      uploadDate: "2024-02-10",
      features: [
        "Perfect jump timing",
        "Strafe optimization",
        "Speed control",
        "Toggle with hotkey",
        "Anti-detection measures",
      ],
      accentColor: "orange",
      status: "approved",
    },
    {
      id: "12",
      name: "Shield Generator",
      game: "fortnite",
      gameDisplayName: "Fortnite",
      category: "utility",
      description: "Automatically regenerate shields during gameplay",
      version: "v1.3",
      creator: "ShieldTech",
      creatorId: "user741",
      price: 5.99,
      priceType: "paid",
      downloads: 8521,
      rating: 4.3,
      uploadDate: "2024-01-15",
      features: [
        "Automatic shield regeneration",
        "Customizable regeneration rate",
        "Works with all shield types",
        "Low detection risk",
        "Compatible with other mods",
      ],
      accentColor: "purple",
      status: "approved",
    },
  ]

  // Sample pending mods data
  const initialPendingMods = [
    {
      id: "pending-1",
      name: "SuperSpeed Hack",
      game: "fortnite",
      gameDisplayName: "Fortnite",
      category: "movement",
      description: "Move at incredible speeds to outmaneuver opponents",
      version: "v1.0",
      creator: "SpeedDemon",
      creatorId: "user555",
      price: 14.99,
      priceType: "paid",
      uploadDate: "2024-04-28",
      features: [
        "Adjustable speed multiplier",
        "Toggle with hotkey",
        "Anti-detection measures",
        "Compatible with other mods",
        "Works in all game modes",
      ],
      accentColor: "purple",
      status: "pending",
    },
    {
      id: "pending-2",
      name: "X-Ray Vision",
      game: "minecraft",
      gameDisplayName: "Minecraft",
      category: "visual",
      description: "See through blocks to find ores and hidden structures",
      version: "v2.1",
      creator: "MineHacker",
      creatorId: "user222",
      price: 0,
      priceType: "free",
      uploadDate: "2024-04-27",
      features: [
        "Toggle with hotkey",
        "Customizable block filters",
        "Distance settings",
        "Resource highlighting",
        "Cave finder mode",
      ],
      accentColor: "green",
      status: "pending",
    },
    {
      id: "pending-3",
      name: "Auto Headshot",
      game: "cs2",
      gameDisplayName: "CS2",
      category: "combat",
      description: "Automatically aim for headshots with any weapon",
      version: "v1.2",
      creator: "HeadshotPro",
      creatorId: "user333",
      price: 24.99,
      priceType: "paid",
      uploadDate: "2024-04-26",
      features: [
        "Works with all weapons",
        "Adjustable aim smoothness",
        "Target priority settings",
        "Visibility checks",
        "Anti-detection system",
      ],
      accentColor: "orange",
      status: "pending",
    },
    {
      id: "pending-4",
      name: "Infinite Money",
      game: "gtav",
      gameDisplayName: "GTA V",
      category: "economy",
      description: "Generate unlimited cash in GTA Online",
      version: "v3.0",
      creator: "MoneyMaker",
      creatorId: "user444",
      price: 29.99,
      priceType: "paid",
      uploadDate: "2024-04-25",
      features: [
        "Stealth money drops",
        "Anti-ban protection",
        "Customizable amounts",
        "Works in all sessions",
        "Regular security updates",
      ],
      accentColor: "red",
      status: "pending",
    },
  ]

  // Initialize pending mods
  useEffect(() => {
    setPendingMods(initialPendingMods)
  }, [])

  // Filter and sort mods
  useEffect(() => {
    let result = [...mods]

    // Filter by game
    if (filters.game !== "all") {
      result = result.filter((mod) => mod.game === filters.game)
    }

    // Filter by category
    if (filters.category !== "all") {
      result = result.filter((mod) => mod.category === filters.category)
    }

    // Filter by price
    if (filters.price !== "all") {
      result = result.filter((mod) => mod.priceType === filters.price)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (mod) =>
          mod.name.toLowerCase().includes(query) ||
          mod.description.toLowerCase().includes(query) ||
          mod.gameDisplayName.toLowerCase().includes(query) ||
          mod.creator.toLowerCase().includes(query),
      )
    }

    // Sort
    switch (filters.sort) {
      case "newest":
        result.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
        break
      case "oldest":
        result.sort((a, b) => new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime())
        break
      case "popular":
        result.sort((a, b) => b.downloads - a.downloads)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }

    setFilteredMods(result)
  }, [filters, searchQuery])

  // Key sequence detection for opening password modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add the key to the sequence
      setKeySequence((prev) => {
        const newSequence = [...prev, e.key]

        // Keep only the last 10 keys
        if (newSequence.length > 10) {
          return newSequence.slice(newSequence.length - 10)
        }
        return newSequence
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Check for the special key sequence "mod"
  useEffect(() => {
    const lastThreeKeys = keySequence.slice(-3).join("")
    if (lastThreeKeys === "mod") {
      setShowPasswordModal(true)
      setKeySequence([])

      // Focus on the password input after a short delay
      setTimeout(() => {
        if (passwordInputRef.current) {
          passwordInputRef.current.focus()
        }
      }, 100)
    }
  }, [keySequence])

  const handleInject = (mod: any) => {
    setGameForInjection(mod.gameDisplayName)
    setShowInjectPopup(true)
  }

  const handleViewDetails = (mod: any) => {
    setSelectedMod(mod)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === "!@MODUITY") {
      setIsModeratorMode(true)
      setShowPasswordModal(false)
      toast({
        title: "Moderator Mode Activated",
        description: "You now have access to the moderation panel.",
      })
    } else {
      toast({
        title: "Invalid Password",
        description: "The password you entered is incorrect.",
        variant: "destructive",
      })
    }

    setPassword("")
  }

  const handleExitModeratorMode = () => {
    setIsModeratorMode(false)
    toast({
      title: "Moderator Mode Deactivated",
      description: "You have exited the moderation panel.",
    })
  }

  const handleAcceptMod = (mod: any) => {
    setSelectedPendingMod(mod)
    setShowAcceptDialog(true)
  }

  const handleDeclineMod = (mod: any) => {
    setSelectedPendingMod(mod)
    setShowDeclineDialog(true)
  }

  const confirmAcceptMod = () => {
    if (!selectedPendingMod) return

    // Remove from pending mods
    setPendingMods((prev) => prev.filter((mod) => mod.id !== selectedPendingMod.id))

    // Add to approved mods with downloads and rating
    const approvedMod = {
      ...selectedPendingMod,
      status: "approved",
      downloads: 0,
      rating: 0,
    }

    // In a real app, you would update the database here
    // For now, we'll just show a toast notification
    toast({
      title: "Mod Approved",
      description: `"${selectedPendingMod.name}" has been published to the marketplace.`,
    })

    setShowAcceptDialog(false)
    setSelectedPendingMod(null)
  }

  const confirmDeclineMod = () => {
    if (!selectedPendingMod) return

    // Remove from pending mods
    setPendingMods((prev) => prev.filter((mod) => mod.id !== selectedPendingMod.id))

    // In a real app, you would update the database and send feedback to the user
    toast({
      title: "Mod Declined",
      description: `"${selectedPendingMod.name}" has been removed from the queue.`,
    })

    setShowDeclineDialog(false)
    setDeclineFeedback("")
    setSelectedPendingMod(null)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

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

  const getButtonClass = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-600 hover:bg-green-700"
      case "blue":
        return "bg-blue-600 hover:bg-blue-700"
      case "purple":
        return "bg-purple-600 hover:bg-purple-700"
      case "red":
        return "bg-red-600 hover:bg-red-700"
      case "pink":
        return "bg-pink-600 hover:bg-pink-700"
      case "orange":
        return "bg-orange-600 hover:bg-orange-700"
      default:
        return "bg-cyan-600 hover:bg-cyan-700"
    }
  }

  const getOutlineButtonClass = (color: string) => {
    switch (color) {
      case "green":
        return "border-green-500/50 text-green-400 hover:bg-green-950/20"
      case "blue":
        return "border-blue-500/50 text-blue-400 hover:bg-blue-950/20"
      case "purple":
        return "border-purple-500/50 text-purple-400 hover:bg-purple-950/20"
      case "red":
        return "border-red-500/50 text-red-400 hover:bg-red-950/20"
      case "pink":
        return "border-pink-500/50 text-pink-400 hover:bg-pink-950/20"
      case "orange":
        return "border-orange-500/50 text-orange-400 hover:bg-orange-950/20"
      default:
        return "border-cyan-500/50 text-cyan-400 hover:bg-cyan-950/20"
    }
  }

  return (
    <div>
      {/* Password Modal */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="bg-black border border-purple-500/50 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Moderator Access</DialogTitle>
            <DialogDescription>Enter the moderator password to access the moderation panel.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit}>
            <div className="grid gap-4 py-4">
              <div className="relative">
                <input
                  ref={passwordInputRef}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-purple-500/30 bg-black/40 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter password"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Accept Confirmation Dialog */}
      <AlertDialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <AlertDialogContent className="bg-black border border-green-500/50">
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Mod</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve "{selectedPendingMod?.name}"? This will publish the mod to the
              marketplace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-500/50 text-gray-400 hover:bg-gray-950/20">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-green-600 hover:bg-green-700" onClick={confirmAcceptMod}>
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Decline Confirmation Dialog */}
      <AlertDialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
        <AlertDialogContent className="bg-black border border-red-500/50">
          <AlertDialogHeader>
            <AlertDialogTitle>Decline Mod</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to decline "{selectedPendingMod?.name}"? This will remove the mod from the queue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <label htmlFor="feedback" className="text-sm font-medium block mb-2">
              Feedback for uploader (optional):
            </label>
            <Textarea
              id="feedback"
              value={declineFeedback}
              onChange={(e) => setDeclineFeedback(e.target.value)}
              placeholder="Explain why this mod was declined..."
              className="bg-black/40 border-red-500/30 focus:border-red-500"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-500/50 text-gray-400 hover:bg-gray-950/20">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={confirmDeclineMod}>
              Decline
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Moderator Mode UI */}
      {isModeratorMode ? (
        <div className="mb-8">
          <div className="bg-purple-900/20 border border-purple-500/50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-purple-400 mr-2" />
                <h2 className="text-xl font-bold text-purple-400">Moderation Panel</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExitModeratorMode}
                className="border-purple-500/50 text-purple-400 hover:bg-purple-950/20"
              >
                Exit Moderator Mode
              </Button>
            </div>

            <div className="text-sm text-gray-400 mb-4">
              {pendingMods.length === 0 ? (
                <p>No mods pending approval.</p>
              ) : (
                <p>
                  {pendingMods.length} mod{pendingMods.length !== 1 ? "s" : ""} pending approval.
                </p>
              )}
            </div>

            {pendingMods.length > 0 && (
              <div className="space-y-4">
                {pendingMods.map((mod) => (
                  <div key={mod.id} className="bg-black/40 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">{mod.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <SVGIconLibrary name={mod.game} className="h-4 w-4" />
                          <span className="text-sm text-gray-400">{mod.gameDisplayName}</span>
                          <Badge variant="outline" className="text-xs">
                            {mod.version}
                          </Badge>
                        </div>
                      </div>
                      <Badge className="bg-yellow-600 hover:bg-yellow-700">Pending</Badge>
                    </div>

                    <p className="text-gray-400 mb-3">{mod.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">Uploader:</span> {mod.creator}
                      </div>
                      <div>
                        <span className="text-gray-500">Price:</span>{" "}
                        {mod.priceType === "free" ? "Free" : `$${mod.price.toFixed(2)}`}
                      </div>
                      <div>
                        <span className="text-gray-500">Category:</span> {mod.category}
                      </div>
                      <div>
                        <span className="text-gray-500">Submitted:</span> {formatDate(mod.uploadDate)}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleAcceptMod(mod)}
                      >
                        <Check className="h-4 w-4 mr-1" /> Accept
                      </Button>
                      <Button
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => handleDeclineMod(mod)}
                      >
                        <X className="h-4 w-4 mr-1" /> Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Published Mods</h2>
            <div className="flex items-center text-sm text-gray-400">
              <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
              <span>You are viewing the marketplace as a moderator</span>
            </div>
          </div>
        </div>
      ) : null}

      {/* Regular Marketplace UI */}
      {filteredMods.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No mods found</h3>
          <p className="text-gray-400">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMods.map((mod) => (
            <Card
              key={mod.id}
              className={`p-6 bg-black/40 ${getBorderClass(mod.accentColor)} transition-all duration-300`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{mod.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {mod.version}
                </Badge>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <SVGIconLibrary name={mod.game} className="h-4 w-4" />
                <span className="text-sm text-gray-400">{mod.gameDisplayName}</span>
              </div>

              <p className="text-gray-400 mb-4">{mod.description}</p>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <div>By {mod.creator}</div>
                <div>{mod.priceType === "free" ? "Free" : `$${mod.price.toFixed(2)}`}</div>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500 mb-6">
                <div>{mod.downloads.toLocaleString()} downloads</div>
                <div>⭐ {mod.rating.toFixed(1)}</div>
                <div>{formatDate(mod.uploadDate)}</div>
              </div>

              <div className="flex gap-2">
                <Button className={`flex-1 ${getButtonClass(mod.accentColor)}`} onClick={() => handleInject(mod)}>
                  Inject Now
                </Button>
                <Button
                  variant="outline"
                  className={getOutlineButtonClass(mod.accentColor)}
                  onClick={() => handleViewDetails(mod)}
                >
                  Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showInjectPopup && <FakeInjectHandler gameName={gameForInjection} onClose={() => setShowInjectPopup(false)} />}

      {selectedMod && (
        <ModDetailsModal
          mod={selectedMod}
          accentColor={selectedMod.accentColor}
          onClose={() => setSelectedMod(null)}
          onInject={() => {
            setSelectedMod(null)
            setGameForInjection(selectedMod.gameDisplayName)
            setShowInjectPopup(true)
          }}
        />
      )}
    </div>
  )
}
