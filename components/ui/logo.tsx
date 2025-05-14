import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg" | "xl"
  linkToHome?: boolean
  isWrappedInLink?: boolean // New prop to prevent nested links
}

export function Logo({
  className = "",
  showText = true,
  size = "md",
  linkToHome = true,
  isWrappedInLink = false, // Default to false
}: LogoProps) {
  const sizes = {
    sm: { logo: 30, height: 30 },
    md: { logo: 40, height: 40 },
    lg: { logo: 60, height: 60 },
    xl: { logo: 80, height: 80 },
  }

  const { logo, height } = sizes[size]

  const logoElement = (
    <div className={`flex items-center ${className}`}>
      <div className="relative" style={{ height: `${height}px`, width: `${logo}px` }}>
        <Image src="/images/webinject-logo.png" alt="WebInject 2.0 Logo" fill className="object-contain" priority />
      </div>
      {showText && (
        <div className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
          WebInject<span className="text-pink-500">2.0</span>
        </div>
      )}
    </div>
  )

  // Only wrap in Link if linkToHome is true AND it's not already wrapped in a Link
  if (linkToHome && !isWrappedInLink) {
    return <Link href="/">{logoElement}</Link>
  }

  return logoElement
}
