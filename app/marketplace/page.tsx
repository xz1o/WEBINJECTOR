"use client"

import { useState, useEffect } from "react"
import { StatusBar } from "@/components/ui/status-bar"
import { SearchBar } from "@/components/ui/search-bar"
import { ModMarketplace } from "@/components/marketplace/mod-marketplace"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { UserUploadPortal } from "@/components/marketplace/user-upload-portal"
import { useSearch } from "@/components/search/search-provider"
import { useSearchParams } from "next/navigation"

export default function MarketplacePage() {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [filters, setFilters] = useState({
    game: "all",
    category: "all",
    price: "all",
    sort: "newest",
  })
  const { query, setQuery } = useSearch()
  const searchParams = useSearchParams()

  // Initialize search query from URL parameters
  useEffect(() => {
    const searchQuery = searchParams.get("search")
    if (searchQuery) {
      setQuery(searchQuery)
    }
  }, [searchParams, setQuery])

  return (
    <div className="min-h-screen">
      <StatusBar />
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-0">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">
              Mod Marketplace
            </span>
          </h1>

          <Button
            onClick={() => setShowUploadModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload Your Mod
          </Button>
        </div>

        <div className="mb-8">
          <SearchBar
            placeholder="Search for mods, tweaks, or games..."
            value={query}
            onSearch={(searchQuery) => setQuery(searchQuery)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <MarketplaceFilters filters={filters} onChange={setFilters} />
          </div>

          <div className="lg:col-span-3">
            <ModMarketplace filters={filters} searchQuery={query} />
          </div>
        </div>
      </div>

      {showUploadModal && <UserUploadPortal onClose={() => setShowUploadModal(false)} />}
    </div>
  )
}
