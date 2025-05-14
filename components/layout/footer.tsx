import Link from "next/link"
import { Terminal, Github, Twitter, DiscIcon as Discord } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export function Footer() {
  return (
    <footer className="py-8 border-t border-purple-500/30 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo size="sm" />
            <p className="text-sm text-gray-400 mt-2">The future of game modding</p>

            <div className="mt-4 flex items-center gap-3">
              <Terminal className="text-purple-400" />
              <span className="text-lg font-mono">1-800-WBINJECT</span>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4 text-lg">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4 text-lg">Games</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/games/minecraft" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Minecraft
                </Link>
              </li>
              <li>
                <Link href="/games/roblox" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Roblox
                </Link>
              </li>
              <li>
                <Link href="/games/fortnite" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Fortnite
                </Link>
              </li>
              <li>
                <Link href="/games/gtav" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  GTA V
                </Link>
              </li>
              <li>
                <Link href="/games/valorant" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Valorant
                </Link>
              </li>
              <li>
                <Link href="/games/cs2" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  CS2
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4 text-lg">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Discord className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </a>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-900 border border-purple-500/30 rounded-l-md px-3 py-2 text-sm flex-grow focus:outline-none focus:border-purple-500"
                />
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-r-md text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} WebInject 2.0. All rights reserved.</p>
          <p className="mt-1">For educational purposes only. Use at your own risk.</p>
        </div>
      </div>
    </footer>
  )
}
