"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function DownloadCTA() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.2),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(192,132,252,0.2),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">
              Ready to Transform Your Gaming Experience?
            </span>
          </h2>

          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Download the WebInject 2.0 desktop application for a seamless modding experience across all your favorite
            games.
          </p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-glow-purple"
            onClick={() => alert("Desktop App download initiated!")}
          >
            <Download className="mr-2 h-5 w-5" />
            Download Desktop App
          </Button>

          <div className="mt-8 text-sm text-gray-400">Available for Windows, macOS, and Linux</div>
        </div>
      </div>
    </section>
  )
}
