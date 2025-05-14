"use client"

import { HeroSection } from "@/components/sections/hero-section"
import { FeaturedGamesSection } from "@/components/sections/featured-games-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { StorySection } from "@/components/sections/story-section"
import { StatusBar } from "@/components/ui/status-bar"
import { DownloadCTA } from "@/components/sections/download-cta"

export default function Home() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <HeroSection />
      <FeaturedGamesSection />
      <FeaturesSection />
      <StorySection />
      <DownloadCTA />
    </div>
  )
}
