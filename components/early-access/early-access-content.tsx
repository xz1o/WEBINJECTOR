"use client"

import { useState } from "react"
import Image from "next/image"
import { CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function EarlyAccessContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const features = [
    "Exclusive access to beta features",
    "Priority customer support",
    "Early access to new game mods",
    "Discounted pricing (regular price will be $19.99)",
    "No restrictions on mod usage",
    "Vote on upcoming features",
  ]

  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 mb-4">
            Early Access
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Be among the first to experience WebInject 2.0 and get exclusive benefits before the official launch.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Why Get Early Access?</h2>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-lg overflow-hidden h-64 md:h-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-cyan-900/40 z-10 rounded-lg" />
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Early Access Preview"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <Card className="bg-black/50 border border-purple-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.15)] overflow-hidden">
          <CardHeader className="border-b border-purple-500/20 pb-8">
            <CardTitle className="text-2xl md:text-3xl text-white">Early Access Package</CardTitle>
            <CardDescription className="text-gray-300">
              Get exclusive access to WebInject 2.0 before the official launch
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="flex items-baseline mb-8">
              <span className="text-5xl font-bold text-white">$10.99</span>
              <span className="text-gray-400 ml-2">
                <s>$19.99</s>
              </span>
              <span className="ml-2 px-2 py-1 bg-cyan-900/50 text-cyan-400 text-xs rounded-md">45% OFF</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-200">Immediate access to all features</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-200">Free updates during early access period</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-200">Priority support via Discord</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-3" />
                <span className="text-gray-200">Limited time offer - Price will increase at launch</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-purple-500/20 pt-6">
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white py-6 text-lg"
            >
              Buy Early Access Now
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>
            By purchasing early access, you agree to our Terms of Service and acknowledge that you are accessing a
            pre-release version of the software that may contain bugs or incomplete features.
          </p>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-black/90 border border-purple-500/30 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Payment Method Not Available</DialogTitle>
            <DialogDescription className="text-gray-300 pt-2">
              Our payment method is not set up yet, come back when updated.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => setIsDialogOpen(false)}
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
