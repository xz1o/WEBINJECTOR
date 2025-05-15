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
    case "cod":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 6v12l10 4 10-4V6L12 2zm0 2.6l6.47 2.59L12 9.78 5.53 7.19 12 4.6zM4 8.4l7 2.8v7.4l-7-2.8V8.4zm16 7.4l-7 2.8v-7.4l7-2.8v7.4z" />
        </svg>
      )
    case "apex":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 12l10 10 10-10L12 2zm0 4.83L17.17 12 12 17.17 6.83 12 12 6.83z" />
        </svg>
      )
    case "overwatch":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7v-2z" />
        </svg>
      )
    case "rainbow":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7v-2z" />
        </svg>
      )
    case "battlefield":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.73l7.46 3.73L12 12.19l-7.46-3.73L12 4.73zM4 8.8l7 3.5v6.9l-7-3.5V8.8zm16 0v6.9l-7 3.5v-6.9l7-3.5z" />
        </svg>
      )
    case "tarkov":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.73l7.46 3.73L12 12.19l-7.46-3.73L12 4.73zM4 8.8l7 3.5v6.9l-7-3.5V8.8zm16 0v6.9l-7 3.5v-6.9l7-3.5z" />
        </svg>
      )
    case "pubg":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.73l7.46 3.73L12 12.19l-7.46-3.73L12 4.73zM4 8.8l7 3.5v6.9l-7-3.5V8.8zm16 0v6.9l-7 3.5v-6.9l7-3.5z" />
        </svg>
      )
    case "halo":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      )
    case "halflife":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      )
    case "doom":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.73l7.46 3.73L12 12.19l-7.46-3.73L12 4.73zM4 8.8l7 3.5v6.9l-7-3.5V8.8zm16 0v6.9l-7 3.5v-6.9l7-3.5z" />
        </svg>
      )
    case "tf2":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      )
    case "quake":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.73l7.46 3.73L12 12.19l-7.46-3.73L12 4.73zM4 8.8l7 3.5v6.9l-7-3.5V8.8zm16 0v6.9l-7 3.5v-6.9l7-3.5z" />
        </svg>
      )
    case "l4d2":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      )
    case "farcry":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.73l7.46 3.73L12 12.19l-7.46-3.73L12 4.73zM4 8.8l7 3.5v6.9l-7-3.5V8.8zm16 0v6.9l-7 3.5v-6.9l7-3.5z" />
        </svg>
      )
    case "borderlands":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      )
    case "metro":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.73l7.46 3.73L12 12.19l-7.46-3.73L12 4.73zM4 8.8l7 3.5v6.9l-7-3.5V8.8zm16 0v6.9l-7 3.5v-6.9l7-3.5z" />
        </svg>
      )
    case "callofjuarez":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      )
    case "titanfall":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.73l7.46 3.73L12 12.19l-7.46-3.73L12 4.73zM4 8.8l7 3.5v6.9l-7-3.5V8.8zm16 0v6.9l-7 3.5v-6.9l7-3.5z" />
        </svg>
      )
    default:
      return <div className={`${className} bg-gray-500 rounded-full`} />
  }
}
