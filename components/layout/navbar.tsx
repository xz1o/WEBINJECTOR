"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Download, ChevronDown, DollarSign, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SVGIconLibrary } from "@/components/ui/svg-icon-library"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DesktopAppModal } from "@/components/desktop-app/desktop-app-modal"
import { AdminFunModal } from "@/components/admin/admin-fun-modal"

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [desktopAppModalOpen, setDesktopAppModalOpen] = useState(false)
  const [adminFunModalOpen, setAdminFunModalOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Money Made", href: "/money-made", icon: <DollarSign className="h-4 w-4 text-green-400" /> },
    { name: "ADMIN FUN", icon: <Shield className="h-4 w-4 text-red-400" />, action: () => setAdminFunModalOpen(true) },
  ]

  const gameLinks = [
    { name: "Minecraft", href: "/games/minecraft", icon: "minecraft" },
    { name: "Roblox", href: "/games/roblox", icon: "roblox" },
    { name: "Fortnite", href: "/games/fortnite", icon: "fortnite" },
    { name: "GTA V", href: "/games/gtav", icon: "gtav" },
    { name: "Valorant", href: "/games/valorant", icon: "valorant" },
    { name: "CS2", href: "/games/cs2", icon: "cs2" },
  ]

  const handleDesktopAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setDesktopAppModalOpen(true)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md border-b border-purple-500/30" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="flex items-center">
                  <div className="relative h-10 w-10 mr-2">
                    <Image
                      src="/images/webinject-logo.png"
                      alt="WebInject 2.0 Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                    WebInject<span className="text-pink-500">2.0</span>
                  </div>
                </div>
              </Link>

              <nav className="hidden md:flex items-center ml-10 space-x-6">
                {navLinks.map((link) =>
                  link.href ? (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-sm transition-colors hover:text-cyan-400 flex items-center gap-1 ${
                        pathname === link.href ? "text-cyan-400" : "text-white"
                      }`}
                    >
                      {link.icon && link.icon}
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      key={link.name}
                      onClick={link.action}
                      className="text-sm transition-colors hover:text-cyan-400 flex items-center gap-1 text-white"
                    >
                      {link.icon && link.icon}
                      {link.name}
                    </button>
                  ),
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center text-sm hover:text-cyan-400 transition-colors">
                      Games <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black/90 border border-purple-500/30 backdrop-blur-md">
                    {gameLinks.map((game) => (
                      <DropdownMenuItem key={game.name} asChild>
                        <Link
                          href={game.href}
                          className="flex items-center gap-2 cursor-pointer hover:bg-purple-900/20"
                        >
                          <SVGIconLibrary name={game.icon} className="h-4 w-4" />
                          {game.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="hidden md:flex items-center gap-2 bg-transparent border-cyan-500 text-cyan-400 hover:bg-cyan-950/20 hover:text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                onClick={handleDesktopAppClick}
              >
                <Download size={16} />
                <span>Desktop App</span>
              </Button>

              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white hover:bg-purple-900/20"
                >
                  {mobileMenuOpen ? <X /> : <Menu />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-black/95 border-b border-purple-500/30 py-4 px-4 absolute left-0 right-0 mt-3">
              <div className="flex flex-col space-y-3">
                <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                  <div className="flex items-center">
                    <div className="relative h-10 w-10 mr-2">
                      <Image
                        src="/images/webinject-logo.png"
                        alt="WebInject 2.0 Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                      WebInject<span className="text-pink-500">2.0</span>
                    </div>
                  </div>
                </Link>

                {navLinks.map((link) =>
                  link.href ? (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`py-2 px-4 hover:bg-purple-900/20 rounded-md flex items-center gap-2 ${
                        pathname === link.href ? "text-cyan-400" : "text-white"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.icon && link.icon}
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      key={link.name}
                      onClick={() => {
                        link.action?.()
                        setMobileMenuOpen(false)
                      }}
                      className="py-2 px-4 hover:bg-purple-900/20 rounded-md flex items-center gap-2 text-white text-left"
                    >
                      {link.icon && link.icon}
                      {link.name}
                    </button>
                  ),
                )}

                <div className="py-2 px-4 font-medium">Games</div>
                <div className="pl-4 flex flex-col space-y-2">
                  {gameLinks.map((game) => (
                    <Link
                      key={game.name}
                      href={game.href}
                      className="py-2 px-4 hover:bg-purple-900/20 rounded-md flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <SVGIconLibrary name={game.icon} className="h-4 w-4" />
                      {game.name}
                    </Link>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="mt-2 items-center gap-2 bg-transparent border-cyan-500 text-cyan-400 hover:bg-cyan-950/20 hover:text-cyan-300"
                  onClick={handleDesktopAppClick}
                >
                  <Download size={16} />
                  <span>Desktop App</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Desktop App Modal */}
      <DesktopAppModal isOpen={desktopAppModalOpen} onClose={() => setDesktopAppModalOpen(false)} />

      {/* Admin Fun Modal */}
      <AdminFunModal isOpen={adminFunModalOpen} onClose={() => setAdminFunModalOpen(false)} />
    </>
  )
}
