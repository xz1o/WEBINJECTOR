import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NavBar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { NotificationSystem } from "@/components/ui/notification-system"
import { SearchProvider } from "@/components/search/search-provider"
import { Suspense } from "react"
// Import the ShutdownOverlay component at the top of the file
import { ShutdownOverlay } from "@/components/shutdown-overlay"
// Add the import for DimaClientHandler at the top with the other imports
import { DimaClientHandler } from "@/components/dima-client-handler"
// Import maintenance configuration
import { MAINTENANCE_TIME } from "@/lib/maintenance-config"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WebInject 2.0 | Game Modding Platform",
  description: "The ultimate platform for game modding and injection tools",
    generator: 'v0.dev'
}

// Add this line right after the imports
// Set this to true to show the shutdown screen, false to hide it
const SHOW_SHUTDOWN_SCREEN = false

// Maintenance configuration
const MAINTENANCE_START_DATE = new Date() // Current date/time
const MAINTENANCE_DURATION = MAINTENANCE_TIME.DAYS(2) // 2 days maintenance

// Update the RootLayout function to include the ShutdownOverlay
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SearchProvider>
            <Suspense>
              <NavBar />
              <main className="flex-grow">{children}</main>
            </Suspense>
            <Footer />
            <Toaster />
            <NotificationSystem />
            {/* Add the ShutdownOverlay component here with maintenance config */}
            <ShutdownOverlay
              isShutdown={SHOW_SHUTDOWN_SCREEN}
              maintenanceStartDate={MAINTENANCE_START_DATE}
              maintenanceDuration={MAINTENANCE_DURATION}
            />
          </SearchProvider>
          <DimaClientHandler />
        </ThemeProvider>
      </body>
    </html>
  )
}
