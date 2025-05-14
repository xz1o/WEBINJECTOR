"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

// Define the types of content we can search for
export type SearchResultType = "mod" | "game" | "category" | "creator"

// Define the structure of a search result
export interface SearchResult {
  id: string
  type: SearchResultType
  title: string
  description?: string
  image?: string
  url: string
  game?: string
  gameDisplayName?: string
  accentColor?: string
  price?: string | number
  rating?: number
}

// Define the search context interface
interface SearchContextType {
  query: string
  setQuery: (query: string) => void
  results: SearchResult[]
  isLoading: boolean
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  handleKeyDown: (e: React.KeyboardEvent) => void
  navigateToResult: (result: SearchResult) => void
  clearSearch: () => void
}

// Create the context with default values
const SearchContext = createContext<SearchContextType>({
  query: "",
  setQuery: () => {},
  results: [],
  isLoading: false,
  isOpen: false,
  setIsOpen: () => {},
  selectedIndex: -1,
  setSelectedIndex: () => {},
  handleKeyDown: () => {},
  navigateToResult: () => {},
  clearSearch: () => {},
})

// Sample data for search results
const sampleMods = [
  {
    id: "1",
    type: "mod" as SearchResultType,
    title: "Ultimate Aimbot",
    description: "Advanced aimbot with customizable settings",
    url: "/marketplace",
    game: "valorant",
    gameDisplayName: "Valorant",
    accentColor: "pink",
    price: 19.99,
    rating: 4.8,
  },
  {
    id: "2",
    type: "mod" as SearchResultType,
    title: "NovaClient",
    description: "Complete gameplay overhaul with combat assistance",
    url: "/marketplace",
    game: "minecraft",
    gameDisplayName: "Minecraft",
    accentColor: "green",
    price: 0,
    rating: 4.7,
  },
  {
    id: "3",
    type: "mod" as SearchResultType,
    title: "Money Hack",
    description: "Generate unlimited in-game currency safely",
    url: "/marketplace",
    game: "gtav",
    gameDisplayName: "GTA V",
    accentColor: "red",
    price: 24.99,
    rating: 4.9,
  },
  {
    id: "4",
    type: "mod" as SearchResultType,
    title: "Wallhack Pro",
    description: "Advanced ESP with customizable features",
    url: "/marketplace",
    game: "cs2",
    gameDisplayName: "CS2",
    accentColor: "orange",
    price: 14.99,
    rating: 4.6,
  },
  {
    id: "5",
    type: "mod" as SearchResultType,
    title: "Fly Hack",
    description: "Freely fly around any Roblox game",
    url: "/marketplace",
    game: "roblox",
    gameDisplayName: "Roblox",
    accentColor: "blue",
    price: 0,
    rating: 4.5,
  },
  {
    id: "6",
    type: "mod" as SearchResultType,
    title: "Build Master",
    description: "Automated building structures with one click",
    url: "/marketplace",
    game: "fortnite",
    gameDisplayName: "Fortnite",
    accentColor: "purple",
    price: 9.99,
    rating: 4.7,
  },
]

const sampleGames = [
  {
    id: "game-1",
    type: "game" as SearchResultType,
    title: "Minecraft",
    description: "Enhance your Minecraft experience with powerful client mods",
    url: "/games/minecraft",
    accentColor: "green",
  },
  {
    id: "game-2",
    type: "game" as SearchResultType,
    title: "Roblox",
    description: "Unlock new possibilities in Roblox with these powerful tweaks",
    url: "/games/roblox",
    accentColor: "blue",
  },
  {
    id: "game-3",
    type: "game" as SearchResultType,
    title: "Fortnite",
    description: "Gain the competitive edge in Fortnite with these advanced mods",
    url: "/games/fortnite",
    accentColor: "purple",
  },
  {
    id: "game-4",
    type: "game" as SearchResultType,
    title: "GTA V",
    description: "Transform your GTA V experience with these powerful mods",
    url: "/games/gtav",
    accentColor: "red",
  },
  {
    id: "game-5",
    type: "game" as SearchResultType,
    title: "Valorant",
    description: "Enhance your Valorant gameplay with these advanced tools",
    url: "/games/valorant",
    accentColor: "pink",
  },
  {
    id: "game-6",
    type: "game" as SearchResultType,
    title: "CS2",
    description: "Dominate in Counter-Strike 2 with these powerful tools",
    url: "/games/cs2",
    accentColor: "orange",
  },
]

const sampleCategories = [
  {
    id: "cat-1",
    type: "category" as SearchResultType,
    title: "Combat",
    description: "Mods that enhance combat capabilities",
    url: "/marketplace?category=combat",
  },
  {
    id: "cat-2",
    type: "category" as SearchResultType,
    title: "Movement",
    description: "Mods that improve movement and navigation",
    url: "/marketplace?category=movement",
  },
  {
    id: "cat-3",
    type: "category" as SearchResultType,
    title: "Visual",
    description: "Mods that enhance visual aspects of games",
    url: "/marketplace?category=visual",
  },
  {
    id: "cat-4",
    type: "category" as SearchResultType,
    title: "Utility",
    description: "Utility mods for various purposes",
    url: "/marketplace?category=utility",
  },
]

const sampleCreators = [
  {
    id: "creator-1",
    type: "creator" as SearchResultType,
    title: "HeadshotPro",
    description: "Creator of premium aiming mods",
    url: "/marketplace?creator=HeadshotPro",
  },
  {
    id: "creator-2",
    type: "creator" as SearchResultType,
    title: "WallVision",
    description: "Specialist in ESP and wallhack mods",
    url: "/marketplace?creator=WallVision",
  },
  {
    id: "creator-3",
    type: "creator" as SearchResultType,
    title: "NovaTeam",
    description: "Team creating comprehensive client mods",
    url: "/marketplace?creator=NovaTeam",
  },
]

// Combine all sample data
const allSampleData = [...sampleMods, ...sampleGames, ...sampleCategories, ...sampleCreators]

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()

  // Debounced search function
  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([])
        return
      }

      setIsLoading(true)

      // Simulate API call with setTimeout
      setTimeout(() => {
        const searchResults = allSampleData.filter((item) => {
          const matchTitle = item.title.toLowerCase().includes(searchQuery.toLowerCase())
          const matchDescription = item.description?.toLowerCase().includes(searchQuery.toLowerCase())
          const matchGame = item.gameDisplayName?.toLowerCase().includes(searchQuery.toLowerCase())
          return matchTitle || matchDescription || matchGame
        })

        // Sort results by relevance (title matches first)
        searchResults.sort((a, b) => {
          const aTitle = a.title.toLowerCase().includes(searchQuery.toLowerCase())
          const bTitle = b.title.toLowerCase().includes(searchQuery.toLowerCase())
          if (aTitle && !bTitle) return -1
          if (!aTitle && bTitle) return 1
          return 0
        })

        setResults(searchResults)
        setIsLoading(false)
      }, 300) // 300ms delay to simulate API call
    },
    [setResults, setIsLoading],
  )

  // Update search results when query changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        debouncedSearch(query)
        setIsOpen(true)
      } else {
        setResults([])
        setIsOpen(false)
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [query, debouncedSearch])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    // Arrow down
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prevIndex) => (prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex))
    }
    // Arrow up
    else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
    }
    // Enter
    else if (e.key === "Enter") {
      e.preventDefault()
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        navigateToResult(results[selectedIndex])
      }
    }
    // Escape
    else if (e.key === "Escape") {
      e.preventDefault()
      setIsOpen(false)
    }
  }

  // Navigate to a search result
  const navigateToResult = (result: SearchResult) => {
    router.push(result.url)
    clearSearch()
  }

  // Clear search
  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    setSelectedIndex(-1)
  }

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        results,
        isLoading,
        isOpen,
        setIsOpen,
        selectedIndex,
        setSelectedIndex,
        handleKeyDown,
        navigateToResult,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

// Custom hook to use the search context
export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
