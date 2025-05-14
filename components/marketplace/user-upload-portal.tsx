"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

interface UserUploadPortalProps {
  onClose: () => void
}

export function UserUploadPortal({ onClose }: UserUploadPortalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    game: "",
    category: "",
    version: "",
    priceType: "free",
    price: "",
    features: ["", "", "", "", ""],
    file: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData((prev) => ({ ...prev, features: newFeatures }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }))
    }
  }

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.description || !formData.game || !formData.category || !formData.version) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive",
        })
        return
      }
    }
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate price if paid
    if (formData.priceType === "paid" && (!formData.price || Number.parseFloat(formData.price) <= 0)) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price greater than 0.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Validate file
    if (!formData.file) {
      toast({
        title: "Missing File",
        description: "Please upload your mod file before submitting.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      onClose()

      toast({
        title: "Mod Uploaded Successfully",
        description: "Your mod has been submitted for review and will be available soon.",
      })
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative bg-black border border-purple-500/50 rounded-lg shadow-[0_0_25px_rgba(168,85,247,0.4)] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-900/80 to-pink-900/80 px-6 py-4 flex items-center justify-between border-b border-purple-500/30">
          <h2 className="text-xl font-bold text-white">Upload Your Mod</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-300 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 1 ? "bg-purple-600" : "bg-gray-700"
                } text-white text-sm font-medium`}
              >
                1
              </div>
              <div className={`h-1 flex-grow mx-2 ${step >= 2 ? "bg-purple-600" : "bg-gray-700"}`}></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 2 ? "bg-purple-600" : "bg-gray-700"
                } text-white text-sm font-medium`}
              >
                2
              </div>
              <div className={`h-1 flex-grow mx-2 ${step >= 3 ? "bg-purple-600" : "bg-gray-700"}`}></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 3 ? "bg-purple-600" : "bg-gray-700"
                } text-white text-sm font-medium`}
              >
                3
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>Basic Info</span>
              <span>Features & Pricing</span>
              <span>Upload & Submit</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Mod Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-black/40 border-purple-500/30 focus:border-purple-500"
                    placeholder="Enter a name for your mod"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="bg-black/40 border-purple-500/30 focus:border-purple-500"
                    placeholder="Describe what your mod does"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="game">Game</Label>
                    <Select value={formData.game} onValueChange={(value) => handleSelectChange("game", value)}>
                      <SelectTrigger className="bg-black/40 border-purple-500/30">
                        <SelectValue placeholder="Select a game" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border border-purple-500/30 backdrop-blur-md">
                        <SelectItem value="minecraft">Minecraft</SelectItem>
                        <SelectItem value="roblox">Roblox</SelectItem>
                        <SelectItem value="fortnite">Fortnite</SelectItem>
                        <SelectItem value="gtav">GTA V</SelectItem>
                        <SelectItem value="valorant">Valorant</SelectItem>
                        <SelectItem value="cs2">CS2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger className="bg-black/40 border-purple-500/30">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border border-purple-500/30 backdrop-blur-md">
                        <SelectItem value="combat">Combat</SelectItem>
                        <SelectItem value="movement">Movement</SelectItem>
                        <SelectItem value="visual">Visual</SelectItem>
                        <SelectItem value="utility">Utility</SelectItem>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="cosmetic">Cosmetic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    name="version"
                    value={formData.version}
                    onChange={handleChange}
                    className="bg-black/40 border-purple-500/30 focus:border-purple-500"
                    placeholder="e.g., v1.0"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label>Key Features (up to 5)</Label>
                  <div className="space-y-2 mt-2">
                    {formData.features.map((feature, index) => (
                      <Input
                        key={index}
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="bg-black/40 border-purple-500/30 focus:border-purple-500"
                        placeholder={`Feature ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Label>Pricing</Label>
                  <RadioGroup
                    value={formData.priceType}
                    onValueChange={(value) => handleSelectChange("priceType", value)}
                    className="flex flex-col space-y-2 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="free" id="price-free" />
                      <Label htmlFor="price-free" className="cursor-pointer">
                        Free
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paid" id="price-paid" />
                      <Label htmlFor="price-paid" className="cursor-pointer">
                        Paid
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.priceType === "paid" && (
                  <div>
                    <Label htmlFor="price">Price ($USD)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0.99"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      className="bg-black/40 border-purple-500/30 focus:border-purple-500"
                      placeholder="e.g., 9.99"
                    />
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-purple-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Your Mod File</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Supported formats: .zip, .rar, .exe, .dll (Max size: 100MB)
                    </p>

                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".zip,.rar,.exe,.dll"
                    />
                    <Label
                      htmlFor="file-upload"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md cursor-pointer"
                    >
                      Select File
                    </Label>

                    {formData.file && (
                      <div className="mt-4 text-sm">
                        <span className="text-green-400">File selected: </span>
                        {formData.file.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-500">Important Notice</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      By uploading your mod, you confirm that it doesn't contain malware and complies with our terms of
                      service. All mods are reviewed before being published to the marketplace.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
              ) : (
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              )}

              {step < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-purple-600 to-pink-600">
                  {isSubmitting ? "Uploading..." : "Submit Mod"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
