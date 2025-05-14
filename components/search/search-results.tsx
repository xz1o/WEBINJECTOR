"use client"

import { useRef, useEffect } from "react"
import { useSearch, type SearchResult } from "@/components/search/search-provider"
import { SVGIconLibrary } from "@/components/ui/svg-icon-library"
import { Loader2, Search, Tag, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function SearchResults() {
  const { results, isLoading, isOpen, selectedIndex, setSelectedIndex, navigateToResult, query } = useSearch()
  const resultRefs = useRef<(HTMLDivElement | null)[]>([])

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultRefs.current[selectedIndex]) {
      resultRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }, [selectedIndex])

  if (!isOpen) return null

  // Group results by type
  const modResults = results.filter((result) => result.type === "mod")
  const gameResults = results.filter((result) => result.type === "game")
  const categoryResults = results.filter((result) => result.type === "category")
  const creatorResults = results.filter((result) => result.type === "creator")

  // Get the index of a result in the flattened results array
  const getGlobalIndex = (result: SearchResult) => {
    return results.findIndex((r) => r.id === result.id)
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 border border-purple-500/30 rounded-md shadow-lg backdrop-blur-md z-50 max-h-[70vh] overflow-y-auto">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-5 w-5 animate-spin text-purple-400 mr-2" />
          <span>Searching...</span>
        </div>
      ) : results.length === 0 ? (
        <div className="p-4 text-center text-gray-400">
          {query ? "No results found. Try a different search term." : "Start typing to search..."}
        </div>
      ) : (
        <div className="py-2">
          {/* Mods section */}
          {modResults.length > 0 && (
            <div className="mb-2">
              <div className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase">Mods</div>
              {modResults.map((result) => (
                <div
                  key={result.id}
                  ref={(el) => (resultRefs.current[getGlobalIndex(result)] = el)}
                  className={cn(
                    "px-4 py-2 cursor-pointer hover:bg-purple-900/20",
                    selectedIndex === getGlobalIndex(result) && "bg-purple-900/30",
                  )}
                  onClick={() => navigateToResult(result)}
                  onMouseEnter={() => setSelectedIndex(getGlobalIndex(result))}
                >
                  <div className="flex items-start">
                    {result.game && (
                      <div className="mr-3 mt-1">
                        <SVGIconLibrary name={result.game} className="h-5 w-5" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium truncate">{result.title}</div>
                        <div className="text-sm text-gray-400 ml-2">
                          {typeof result.price === "number"
                            ? result.price === 0
                              ? "Free"
                              : `$${result.price.toFixed(2)}`
                            : result.price}
                        </div>
                      </div>
                      <div className="text-sm text-gray-400 truncate">{result.description}</div>
                      <div className="flex items-center mt-1 text-xs">
                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded text-xs mr-2",
                            result.accentColor === "green" && "bg-green-900/50 text-green-400",
                            result.accentColor === "blue" && "bg-blue-900/50 text-blue-400",
                            result.accentColor === "purple" && "bg-purple-900/50 text-purple-400",
                            result.accentColor === "red" && "bg-red-900/50 text-red-400",
                            result.accentColor === "pink" && "bg-pink-900/50 text-pink-400",
                            result.accentColor === "orange" && "bg-orange-900/50 text-orange-400",
                          )}
                        >
                          {result.gameDisplayName}
                        </span>
                        {result.rating && <span className="text-yellow-400">★ {result.rating.toFixed(1)}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Games section */}
          {gameResults.length > 0 && (
            <div className="mb-2">
              <div className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase">Games</div>
              {gameResults.map((result) => (
                <div
                  key={result.id}
                  ref={(el) => (resultRefs.current[getGlobalIndex(result)] = el)}
                  className={cn(
                    "px-4 py-2 cursor-pointer hover:bg-purple-900/20",
                    selectedIndex === getGlobalIndex(result) && "bg-purple-900/30",
                  )}
                  onClick={() => navigateToResult(result)}
                  onMouseEnter={() => setSelectedIndex(getGlobalIndex(result))}
                >
                  <div className="flex items-center">
                    <SVGIconLibrary name={result.title.toLowerCase()} className="h-5 w-5 mr-3" />
                    <div>
                      <div className="font-medium">{result.title}</div>
                      <div className="text-sm text-gray-400">{result.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Categories section */}
          {categoryResults.length > 0 && (
            <div className="mb-2">
              <div className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase">Categories</div>
              {categoryResults.map((result) => (
                <div
                  key={result.id}
                  ref={(el) => (resultRefs.current[getGlobalIndex(result)] = el)}
                  className={cn(
                    "px-4 py-2 cursor-pointer hover:bg-purple-900/20",
                    selectedIndex === getGlobalIndex(result) && "bg-purple-900/30",
                  )}
                  onClick={() => navigateToResult(result)}
                  onMouseEnter={() => setSelectedIndex(getGlobalIndex(result))}
                >
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 text-purple-400 mr-3" />
                    <div>
                      <div className="font-medium">{result.title}</div>
                      <div className="text-sm text-gray-400">{result.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Creators section */}
          {creatorResults.length > 0 && (
            <div>
              <div className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase">Creators</div>
              {creatorResults.map((result) => (
                <div
                  key={result.id}
                  ref={(el) => (resultRefs.current[getGlobalIndex(result)] = el)}
                  className={cn(
                    "px-4 py-2 cursor-pointer hover:bg-purple-900/20",
                    selectedIndex === getGlobalIndex(result) && "bg-purple-900/30",
                  )}
                  onClick={() => navigateToResult(result)}
                  onMouseEnter={() => setSelectedIndex(getGlobalIndex(result))}
                >
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-cyan-400 mr-3" />
                    <div>
                      <div className="font-medium">{result.title}</div>
                      <div className="text-sm text-gray-400">{result.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Search in marketplace link */}
          <div className="px-4 py-2 mt-2 border-t border-gray-800">
            <button
              className="w-full text-center text-sm text-cyan-400 hover:text-cyan-300 flex items-center justify-center"
              onClick={() =>
                navigateToResult({
                  id: "search-all",
                  type: "category",
                  title: "",
                  url: `/marketplace?search=${encodeURIComponent(query)}`,
                })
              }
            >
              <Search className="h-4 w-4 mr-2" />
              View all results for "{query}" in Marketplace
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
