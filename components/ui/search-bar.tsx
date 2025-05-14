"use client"

import type React from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/components/search/search-provider"
import { SearchResults } from "@/components/search/search-results"
import { useRef, useEffect } from "react"

interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  className?: string
  onSearch?: (query: string) => void
}

export function SearchBar({ className, onSearch, ...props }: SearchBarProps) {
  const { query, setQuery, isOpen, setIsOpen, handleKeyDown, clearSearch } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Handle clicks outside the search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setIsOpen])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query)
    }
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            ref={inputRef}
            type="text"
            className={`bg-black/40 border-purple-500/50 focus:border-cyan-400 pl-10 h-12 text-white pr-10 ${className}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            {...props}
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          {query && (
            <button
              type="button"
              onClick={() => {
                clearSearch()
                inputRef.current?.focus()
              }}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>

      <SearchResults />
    </div>
  )
}
