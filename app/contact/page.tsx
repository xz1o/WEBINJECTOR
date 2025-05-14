import { ContactForm } from "@/components/sections/contact-form"
import { StatusBar } from "@/components/ui/status-bar"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">Get In Touch</span>
        </h1>

        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-lg text-center mb-8">
            Have questions about WebInject 2.0? Our support team is available 24/7 to assist you with any inquiries or
            issues you may have.
          </p>

          <ContactForm />

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Support Hotline</h2>
            <p className="text-xl font-mono text-purple-400">1-800-WBINJECT</p>
            <p className="mt-2 text-gray-400">Available Monday to Friday, 9AM - 5PM EST</p>
          </div>
        </div>
      </div>
    </div>
  )
}
