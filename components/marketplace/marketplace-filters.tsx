"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface MarketplaceFiltersProps {
  filters: {
    game: string
    category: string
    price: string
    sort: string
  }
  onChange: (filters: any) => void
}

export function MarketplaceFilters({ filters, onChange }: MarketplaceFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div className="space-y-6 bg-black/40 border border-purple-500/30 rounded-lg p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Game</Label>
            <Select value={filters.game} onValueChange={(value) => handleFilterChange("game", value)}>
              <SelectTrigger className="bg-black/60 border-purple-500/30">
                <SelectValue placeholder="All Games" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border border-purple-500/30 backdrop-blur-md max-h-[300px] overflow-y-auto custom-scrollbar">
                <SelectItem value="all">All Games</SelectItem>
                <SelectItem value="minecraft">Minecraft</SelectItem>
                <SelectItem value="roblox">Roblox</SelectItem>
                <SelectItem value="fortnite">Fortnite</SelectItem>
                <SelectItem value="gtav">GTA V</SelectItem>
                <SelectItem value="valorant">Valorant</SelectItem>
                <SelectItem value="cs2">CS2</SelectItem>
                <SelectItem value="cod">Call of Duty: Modern Warfare II</SelectItem>
                <SelectItem value="apex">Apex Legends</SelectItem>
                <SelectItem value="overwatch">Overwatch 2</SelectItem>
                <SelectItem value="rainbow">Rainbow Six Siege</SelectItem>
                <SelectItem value="battlefield">Battlefield 2042</SelectItem>
                <SelectItem value="tarkov">Escape from Tarkov</SelectItem>
                <SelectItem value="pubg">PUBG: Battlegrounds</SelectItem>
                <SelectItem value="halo">Halo Infinite</SelectItem>
                <SelectItem value="halflife">Half-Life 2</SelectItem>
                <SelectItem value="doom">DOOM Eternal</SelectItem>
                <SelectItem value="tf2">Team Fortress 2</SelectItem>
                <SelectItem value="quake">Quake Champions</SelectItem>
                <SelectItem value="l4d2">Left 4 Dead 2</SelectItem>
                <SelectItem value="farcry">Far Cry 3</SelectItem>
                <SelectItem value="borderlands">Borderlands 2</SelectItem>
                <SelectItem value="metro">Metro Exodus</SelectItem>
                <SelectItem value="callofjuarez">Call of Juarez: Gunslinger</SelectItem>
                <SelectItem value="titanfall">Titanfall 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Category</Label>
            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger className="bg-black/60 border-purple-500/30">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border border-purple-500/30 backdrop-blur-md">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="combat">Combat</SelectItem>
                <SelectItem value="movement">Movement</SelectItem>
                <SelectItem value="visual">Visual</SelectItem>
                <SelectItem value="utility">Utility</SelectItem>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="cosmetic">Cosmetic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Price</Label>
            <RadioGroup
              value={filters.price}
              onValueChange={(value) => handleFilterChange("price", value)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="price-all" />
                <Label htmlFor="price-all" className="cursor-pointer">
                  All
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="free" id="price-free" />
                <Label htmlFor="price-free" className="cursor-pointer">
                  Free
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paid" id="price-paid" />
                <Label htmlFor="price-paid" className="cursor-pointer">
                  Paid
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator className="bg-purple-500/20" />

          <div className="space-y-3">
            <Label>Sort By</Label>
            <Select value={filters.sort} onValueChange={(value) => handleFilterChange("sort", value)}>
              <SelectTrigger className="bg-black/60 border-purple-500/30">
                <SelectValue placeholder="Newest" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border border-purple-500/30 backdrop-blur-md">
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
