export function StorySection() {
  return (
    <section
      className="py-20 relative"
      style={{
        background: "linear-gradient(to bottom, #0a0a1a, #000000)",
      }}
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(34,211,238,0.2),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              The WebInject Origin Story
            </span>
          </h2>

          <div className="prose prose-invert max-w-none">
            <p className="text-lg mb-6">
              WebInject 2.0 started as an underground group of passionate developers who shared a common interest:
              pushing the boundaries of what's possible in gaming. What began as a small Discord server quickly grew
              into a thriving community of like-minded individuals.
            </p>

            <p className="text-lg mb-6">
              As our reputation grew, so did the attention we received. Game companies began to take notice of our
              innovative tools and the impact they were having on their ecosystems. Some tried to shut us down through
              legal means, while others offered substantial sums to acquire our technology.
            </p>

            <p className="text-lg mb-6">
              Several companies offered millions to take our cheats down. But with each takedown, our team grew more
              resourceful. New tweaks emerged—more sophisticated, more powerful—making the company even more money and
              cementing our reputation as the leading edge of game modification technology.
            </p>

            <p className="text-lg">
              Today, WebInject 2.0 stands as a testament to innovation and perseverance. We've evolved from a small
              cheat dev group into a full underground tweak marketplace, continuing to develop cutting-edge tools that
              enhance gaming experiences while maintaining a delicate balance with game developers and their
              communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
