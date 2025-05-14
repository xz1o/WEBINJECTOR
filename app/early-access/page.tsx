import type { Metadata } from "next"
import { EarlyAccessContent } from "@/components/early-access/early-access-content"

export const metadata: Metadata = {
  title: "Early Access | WebInject 2.0",
  description:
    "Get early access to WebInject 2.0 and be among the first to experience our revolutionary game modding platform.",
}

export default function EarlyAccessPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <EarlyAccessContent />
    </main>
  )
}
