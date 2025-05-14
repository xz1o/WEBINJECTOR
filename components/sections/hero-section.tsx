"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/ui/search-bar"
import { useRouter } from "next/navigation"
import { useSearch } from "@/components/search/search-provider"
import { Logo } from "@/components/ui/logo"

export function HeroSection() {
  const router = useRouter()
  const { query } = useSearch()

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      router.push(`/marketplace?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <section
      className="pt-28 pb-20 md:pt-40 md:pb-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #000000, #0f0f1a)",
      }}
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.2),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(192,132,252,0.2),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="flex flex-col items-center mb-6">
            <Logo size="lg" showText={false} linkToHome={false} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 glitch-text" data-text="Game Modding Reimagined">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
              Game Modding Reimagined
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            The first web injector for real powerful games - explore and inject mods for your favorite titles with
            WebInject 2.0
          </p>

          <div className="max-w-xl mx-auto">
            <SearchBar placeholder="Search games, mods, or creators..." onSearch={handleSearch} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-glow-purple"
            >
              Get Started
            </Button>
            <Link href="/marketplace">
              <Button
                variant="outline"
                size="lg"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-950/20 hover:text-cyan-300"
              >
                Browse Mods
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-px h-px">
          <div className="absolute w-[1px] h-[150px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-pulse-slow"></div>
        </div>
        <div className="absolute top-1/3 right-1/3 w-px h-px">
          <div className="absolute w-[1px] h-[200px] bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-pulse-slow delay-300"></div>
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-px h-px">
          <div className="absolute w-[1px] h-[120px] bg-gradient-to-b from-transparent via-pink-500 to-transparent animate-pulse-slow delay-700"></div>
        </div>
      </div>
    </section>
  )
}
