import Image from "next/image"

export function TeamSection() {
  const team = [
    {
      name: "Alex Cipher",
      role: "Founder & Lead Developer",
      image: "/images/team-1.jpg",
      bio: "Former game security expert who saw the potential in game modifications.",
    },
    {
      name: "Mia Vortex",
      role: "Security Specialist",
      image: "/images/team-2.jpg",
      bio: "Ensures all WebInject tools remain undetected by anti-cheat systems.",
    },
    {
      name: "Kai Nexus",
      role: "Community Manager",
      image: "/images/team-3.jpg",
      bio: "Manages our growing community and curates the marketplace.",
    },
    {
      name: "Nova Pulse",
      role: "UI/UX Designer",
      image: "/images/team-4.jpg",
      bio: "Creates the sleek, cyberpunk interface that defines WebInject 2.0.",
    },
  ]

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">
            Meet Our Team
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-black/40 border border-purple-500/30 rounded-lg overflow-hidden hover:border-purple-500/60 transition-all duration-300 hover:shadow-glow-purple"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-purple-400 text-sm mb-3">{member.role}</p>
                <p className="text-gray-400">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
