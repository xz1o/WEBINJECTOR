interface GameHeaderProps {
  title: string
  description: string
  accentColor: string
  bgImage?: string
}

export function GameHeader({ title, description, accentColor, bgImage }: GameHeaderProps) {
  const getAccentColorClass = (color: string) => {
    switch (color) {
      case "green":
        return "from-green-400 to-green-600"
      case "blue":
        return "from-blue-400 to-blue-600"
      case "purple":
        return "from-purple-400 to-purple-600"
      case "red":
        return "from-red-400 to-red-600"
      case "pink":
        return "from-pink-400 to-pink-600"
      case "orange":
        return "from-orange-400 to-orange-600"
      default:
        return "from-cyan-400 to-blue-600"
    }
  }

  return (
    <section
      className="pt-28 pb-16 relative overflow-hidden"
      style={{
        background: bgImage
          ? `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url(${bgImage})`
          : "linear-gradient(to bottom, #000000, #0f0f1a)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${getAccentColorClass(accentColor)}`}>
              {title}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300">{description}</p>
        </div>
      </div>
    </section>
  )
}
