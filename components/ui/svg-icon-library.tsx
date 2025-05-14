interface SVGIconLibraryProps {
  name: string
  className?: string
}

export function SVGIconLibrary({ name, className = "h-6 w-6" }: SVGIconLibraryProps) {
  switch (name.toLowerCase()) {
    case "minecraft":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2H20V20H4V2Z" fill="#8B5D3B" />
          <path d="M20 2H12V10H20V2Z" fill="#537D37" />
          <path d="M12 10H4V20H12V10Z" fill="#6B8C42" />
          <path d="M20 10H12V20H20V10Z" fill="#5E7A36" />
        </svg>
      )
    case "roblox":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 5H19V19H5V5Z" fill="#E31B23" />
          <path d="M8 8H16V16H8V8Z" fill="white" />
        </svg>
      )
    case "fortnite":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L22 12L12 22L2 12L12 2Z" fill="#9D4DFF" />
          <path d="M12 6L18 12L12 18L6 12L12 6Z" fill="black" />
        </svg>
      )
    case "gtav":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H20V20H4V4Z" fill="#00285E" />
          <path d="M6 6H18V10H6V6Z" fill="white" />
          <path d="M6 12H12V18H6V12Z" fill="white" />
        </svg>
      )
    case "valorant":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L21 12L12 21L3 12L12 3Z" fill="#FF4655" />
          <path d="M8 8H16V16H8V8Z" fill="black" />
        </svg>
      )
    case "cs2":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
            fill="#F7B807"
          />
          <path d="M12 6L16 12L12 18L8 12L12 6Z" fill="black" />
        </svg>
      )
    default:
      return <div className={`${className} bg-gray-500 rounded-full`} />
  }
}
