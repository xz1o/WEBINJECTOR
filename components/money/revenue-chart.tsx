"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function RevenueChart() {
  const [activeTab, setActiveTab] = useState("daily")

  // Generate random chart data
  const generateChartData = (points: number, min: number, max: number) => {
    return Array.from({ length: points }, () => Math.floor(Math.random() * (max - min + 1)) + min)
  }

  const dailyData = generateChartData(7, 2000, 5000)
  const weeklyData = generateChartData(4, 15000, 25000)
  const monthlyData = generateChartData(6, 50000, 120000)

  // Calculate max value for chart scaling
  const getMaxValue = (data: number[]) => {
    return Math.max(...data) * 1.2 // Add 20% padding
  }

  const maxValue = {
    daily: getMaxValue(dailyData),
    weekly: getMaxValue(weeklyData),
    monthly: getMaxValue(monthlyData),
  }

  // Generate chart labels
  const getDailyLabels = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const today = new Date().getDay()
    return Array.from({ length: 7 }, (_, i) => {
      const index = (today - 6 + i + 7) % 7
      return days[index]
    })
  }

  const getWeeklyLabels = () => {
    const today = new Date()
    return Array.from({ length: 4 }, (_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() - (i + 1) * 7)
      return `Week ${4 - i}`
    }).reverse()
  }

  const getMonthlyLabels = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const today = new Date()
    const currentMonth = today.getMonth()

    return Array.from({ length: 6 }, (_, i) => {
      const monthIndex = (currentMonth - 5 + i + 12) % 12
      return months[monthIndex]
    })
  }

  const labels = {
    daily: getDailyLabels(),
    weekly: getWeeklyLabels(),
    monthly: getMonthlyLabels(),
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="p-6 bg-black/40 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300">
      <h3 className="text-xl font-bold mb-4">Revenue Over Time</h3>

      <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="h-64">
          <ChartDisplay data={dailyData} labels={labels.daily} maxValue={maxValue.daily} formatValue={formatCurrency} />
        </TabsContent>

        <TabsContent value="weekly" className="h-64">
          <ChartDisplay
            data={weeklyData}
            labels={labels.weekly}
            maxValue={maxValue.weekly}
            formatValue={formatCurrency}
          />
        </TabsContent>

        <TabsContent value="monthly" className="h-64">
          <ChartDisplay
            data={monthlyData}
            labels={labels.monthly}
            maxValue={maxValue.monthly}
            formatValue={formatCurrency}
          />
        </TabsContent>
      </Tabs>
    </Card>
  )
}

interface ChartDisplayProps {
  data: number[]
  labels: string[]
  maxValue: number
  formatValue: (value: number) => string
}

function ChartDisplay({ data, labels, maxValue, formatValue }: ChartDisplayProps) {
  return (
    <div className="relative h-full">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-xs text-gray-400">
        <div>{formatValue(maxValue)}</div>
        <div>{formatValue(maxValue * 0.75)}</div>
        <div>{formatValue(maxValue * 0.5)}</div>
        <div>{formatValue(maxValue * 0.25)}</div>
        <div>{formatValue(0)}</div>
      </div>

      {/* Chart grid */}
      <div className="absolute left-16 right-0 top-0 bottom-0 border-l border-gray-800">
        <div className="h-1/4 border-b border-gray-800"></div>
        <div className="h-1/4 border-b border-gray-800"></div>
        <div className="h-1/4 border-b border-gray-800"></div>
        <div className="h-1/4 border-b border-gray-800"></div>
      </div>

      {/* Chart bars */}
      <div className="absolute left-16 right-0 top-0 bottom-6 flex items-end justify-around">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-8 bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-sm"
              style={{ height: `${(value / maxValue) * 100}%` }}
            ></div>
          </div>
        ))}
      </div>

      {/* X-axis labels */}
      <div className="absolute left-16 right-0 bottom-0 flex justify-around text-xs text-gray-400">
        {labels.map((label, index) => (
          <div key={index}>{label}</div>
        ))}
      </div>
    </div>
  )
}
