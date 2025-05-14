import { StorySection } from "@/components/sections/story-section"
import { TeamSection } from "@/components/sections/team-section"
import { StatusBar } from "@/components/ui/status-bar"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative w-20 h-20 mb-4">
            <Image src="/images/webinject-logo.png" alt="WebInject 2.0 Logo" fill className="object-contain" priority />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              About WebInject 2.0
            </span>
          </h1>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-lg mb-6">
            WebInject 2.0 is the ultimate platform for game modding and injection tools. We provide a wide range of mods
            and tweaks for popular games, allowing players to enhance their gaming experience in ways never thought
            possible.
          </p>

          <p className="text-lg mb-6">
            Our team of expert developers works tirelessly to create and maintain the most advanced, undetectable mods
            in the industry. With WebInject 2.0, you can access a vast library of tools that will give you the edge in
            your favorite games.
          </p>

          <p className="text-lg">
            Whether you're looking to enhance your gameplay, unlock new features, or simply have more fun, WebInject 2.0
            has you covered. Join our community today and discover the future of game modding.
          </p>
        </div>
      </div>

      <StorySection />
      <TeamSection />
    </div>
  )
}
