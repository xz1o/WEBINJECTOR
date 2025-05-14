import type React from "react"
import { Shield, Zap, Cpu, Rocket, Users, Lock } from "lucide-react"
import { Card } from "@/components/ui/card"

export function FeaturesSection() {
  const features = [
    {
      icon: <Shield className="text-green-400" />,
      title: "Undetectable",
      description: "Our advanced injection methods keep you safe from anti-cheat systems",
    },
    {
      icon: <Zap className="text-yellow-400" />,
      title: "Lightning Fast",
      description: "Instant injection with minimal performance impact on your games",
    },
    {
      icon: <Cpu className="text-blue-400" />,
      title: "Smart Updates",
      description: "Automatic updates to keep mods working with the latest game versions",
    },
    {
      icon: <Rocket className="text-pink-400" />,
      title: "Easy to Use",
      description: "Simple interface designed for both beginners and advanced users",
    },
    {
      icon: <Users className="text-purple-400" />,
      title: "Community Marketplace",
      description: "Browse and share mods created by our talented community",
    },
    {
      icon: <Lock className="text-cyan-400" />,
      title: "Secure Platform",
      description: "All mods are verified and scanned for malware before being published",
    },
  ]

  return (
    <section
      className="py-20 relative"
      style={{
        background: "linear-gradient(to bottom, #000000, #0a0a1a)",
      }}
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(192,132,252,0.2),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Advanced Features
            </span>
          </h2>
          <p className="text-lg text-gray-300">
            WebInject 2.0 comes packed with powerful features to enhance your gaming experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="p-6 bg-black/40 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 hover:shadow-glow-purple">
      <div className="mb-4 text-2xl">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </Card>
  )
}
