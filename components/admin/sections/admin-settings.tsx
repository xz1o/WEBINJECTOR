"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AdminSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "WebInject 2.0",
    siteDescription: "The ultimate platform for game modding and injection tools",
    maintenanceMode: false,
    registrationEnabled: true,
    maxUploadSize: "50",
    defaultTheme: "dark",
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@webinject.com",
    smtpPassword: "••••••••••••",
    senderEmail: "no-reply@webinject.com",
    senderName: "WebInject Team",
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordPolicy: "medium",
    sessionTimeout: "60",
    ipBlocking: true,
    maxLoginAttempts: "5",
  })

  const handleGeneralChange = (key: string, value: string | boolean) => {
    setGeneralSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleEmailChange = (key: string, value: string) => {
    setEmailSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSecurityChange = (key: string, value: string | boolean) => {
    setSecuritySettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-gray-800 border border-gray-700">
          <TabsTrigger value="general" className="data-[state=active]:bg-purple-900/30 data-[state=active]:text-white">
            General
          </TabsTrigger>
          <TabsTrigger value="email" className="data-[state=active]:bg-purple-900/30 data-[state=active]:text-white">
            Email
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-purple-900/30 data-[state=active]:text-white">
            Security
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-purple-900/30 data-[state=active]:text-white">
            API
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="bg-gray-900/60 border-purple-500/20 shadow-lg">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your website's general configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => handleGeneralChange("siteName", e.target.value)}
                    className="bg-gray-800 border-gray-700 focus:border-purple-500 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultTheme">Default Theme</Label>
                  <Select
                    value={generalSettings.defaultTheme}
                    onValueChange={(value) => handleGeneralChange("defaultTheme", value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 focus:border-purple-500 text-white">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={(e) => handleGeneralChange("siteDescription", e.target.value)}
                    className="bg-gray-800 border-gray-700 focus:border-purple-500 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxUploadSize">Max Upload Size (MB)</Label>
                  <Input
                    id="maxUploadSize"
                    type="number"
                    value={generalSettings.maxUploadSize}
                    onChange={(e) => handleGeneralChange("maxUploadSize", e.target.value)}
                    className="bg-gray-800 border-gray-700 focus:border-purple-500 text-white"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <Switch
                      id="maintenanceMode"
                      checked={generalSettings.maintenanceMode}
                      onCheckedChange={(checked) => handleGeneralChange("maintenanceMode", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="registrationEnabled">User Registration</Label>
                    <Switch
                      id="registrationEnabled"
                      checked={generalSettings.registrationEnabled}
                      onCheckedChange={(checked) => handleGeneralChange("registrationEnabled", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-800 px-6 py-4">
              <Button className="bg-purple-600 hover:bg-purple-700 ml-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card className="bg-gray-900/60 border-purple-500/20 shadow-lg">
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure email server settings for notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={(e) => handleEmailChange("smtpServer", e.target.value)}
                    className="bg-gray-800 border-gray-700 focus:border-purple-500 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={(e) => handleEmailChange("smtpPort", e.target.value)}
                    className="bg-gray-800 border-gray-700 focus:border-purple-500 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={(e) => handleEmailChange("smtpUsername", e.target.value)}
                    className="bg-gray-800 border-gray-700 focus:border-purple-500 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => handleEmailChange("smtpPassword", e.target.value)}
                    className="bg-gray-800 border-gray-700 focus:border-purple-500 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senderEmail">Sender Email</Label>
                  <Input
                    id="senderEmail"
                    value={emailSettings.senderEmail}
                    onChange={(e) => handleEmailChange("senderEmail", e.target.value)}
                    className="bg-gray-800 border-gray-700 focus:border-purple-500 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senderName">Sender Name</Label>
                  <Input
                    id="senderName"
                    value={emailSettings.senderName}
                    onChange={(e) => handleEmailChange("senderName", e.target.value)}
                    className="bg-gray-800 border-gray-700 focus:border-purple-500 text-white"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-800 px-6 py-4">
              <Button variant="outline" className="border-gray-700 text-gray-300 mr-2">
                Test Connection
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 ml-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-gray-900/60 border-purple-500/20 shadow-lg">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security options for your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                    <Switch
                      id="twoFactorAuth"
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="ipBlocking">IP Blocking</Label>
                    <Switch
                      id="ipBlocking"
                      checked={securitySettings.ipBlocking}
                      onCheckedChange={(checked) => handleSecurityChange("ipBlocking", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordPolicy">Password Policy</Label>
                  <Select
                    value={securitySettings.passwordPolicy}
                    onValueChange={(value) => handleSecurityChange("passwordPolicy", value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 focus:border-purple-500 text-white">
                      <SelectValue placeholder="Select policy" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="low">Low (min 6 chars)</SelectItem>
                      <SelectItem value="medium">Medium (min 8 chars, mixed case)</SelectItem>
                      <SelectItem value="high">High (min 10 chars, mixed case, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => handleSecurityChange("sessionTimeout", e.target.value)}
                    className="bg-gray-800 border-gray-700 focus:border-purple-500 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => handleSecurityChange("maxLoginAttempts", e.target.value)}
                    className="bg-gray-800 border-gray-700 focus:border-purple-500 text-white"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-800 px-6 py-4">
              <Button className="bg-purple-600 hover:bg-purple-700 ml-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="bg-gray-900/60 border-purple-500/20 shadow-lg">
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Manage API keys and access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center text-gray-400">
                <p>API settings will be available in a future update.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
