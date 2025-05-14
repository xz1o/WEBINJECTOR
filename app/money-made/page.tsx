"use client"
import { StatusBar } from "@/components/ui/status-bar"
import { MoneyCounter } from "@/components/money/money-counter"
import { RevenueChart } from "@/components/money/revenue-chart"
import { TransactionHistory } from "@/components/money/transaction-history"

export default function MoneyMadePage() {
  return (
    <div className="min-h-screen">
      <StatusBar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-600">
            Money Made
          </span>
        </h1>

        <div className="max-w-5xl mx-auto">
          <MoneyCounter />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <RevenueChart />
            <TransactionHistory />
          </div>
        </div>
      </div>
    </div>
  )
}
