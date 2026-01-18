"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  FaPlus, 
  FaUserFriends,
  FaKey,
  FaList,
  FaTrash,
  FaSync,
  FaTimes,
  FaCopy,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle
} from "react-icons/fa"
import Image from "next/image"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'license' | 'invite'>('license')
  const [licenseCreateOpen, setLicenseCreateOpen] = useState(false)
  const [licenseResetOpen, setLicenseResetOpen] = useState(false)
  const [licenseListOpen, setLicenseListOpen] = useState(false)
  const [licenseDeleteOpen, setLicenseDeleteOpen] = useState(false)
  const [inviteCreateOpen, setInviteCreateOpen] = useState(false)
  const [inviteListOpen, setInviteListOpen] = useState(false)
  const [inviteDeleteOpen, setInviteDeleteOpen] = useState(false)
  const [showLicenseKey, setShowLicenseKey] = useState(false)
  const [generatedKey, setGeneratedKey] = useState("")
  
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedDuration, setSelectedDuration] = useState("")
  const [licenseKey, setLicenseKey] = useState("")
  const [inviteCode, setInviteCode] = useState("")
  
  // Состояния для алертов
  const [alert, setAlert] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  }>({
    show: false,
    type: 'success',
    title: '',
    message: ''
  })

  const licenseKeys = [
    { id: 1, key: "LIC-FN-7B2A9C4D", product: "Fortnite", duration: "Weekly", status: "active", created: "2024-01-15", hwid: "A1B2C3D4" },
    { id: 2, key: "LIC-RS-E8F5G6H7", product: "Rust", duration: "Monthly", status: "expired", created: "2024-01-10", hwid: "X9Y8Z7W6" },
    { id: 3, key: "LIC-FN-9J3K8L2M", product: "Fortnite", duration: "Monthly", status: "active", created: "2024-01-12", hwid: "P5Q6R7S8" },
  ]

  const invites = [
    { id: 1, code: "INV-FN-1234", product: "Fortnite", uses: 3, maxUses: 10, expires: "2024-01-31", status: "active" },
    { id: 2, code: "INV-RS-5678", product: "Rust", uses: 1, maxUses: 5, expires: "2024-02-15", status: "active" },
    { id: 3, code: "INV-FN-9012", product: "Fortnite", uses: 10, maxUses: 10, expires: "2024-01-20", status: "expired" },
  ]

  // Функция для показа алерта
  const showAlert = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    setAlert({
      show: true,
      type,
      title,
      message
    })
    
    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }))
    }, 5000)
  }

  const handleCreateLicense = () => {
    const randomKey = `LIC-${selectedProduct.toUpperCase().substring(0,2)}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    setGeneratedKey(randomKey)
    setLicenseCreateOpen(false)
    setShowLicenseKey(true)
    
    // Показываем алерт об успешном создании
    showAlert('success', 'License Created', 'License key has been successfully generated')
  }

  const handleResetHWID = () => {
    setLicenseResetOpen(false)
    showAlert('success', 'HWID Reset', `HWID has been reset for license key: ${licenseKey}`)
    setLicenseKey("")
  }

  const handleDeleteLicense = () => {
    setLicenseDeleteOpen(false)
    showAlert('error', 'License Deleted', `License key "${licenseKey}" has been permanently deleted`)
    setLicenseKey("")
  }

  const handleCreateInvite = () => {
    setInviteCreateOpen(false)
    showAlert('success', 'Invite Created', 'New invite link has been generated successfully')
  }

  const handleDeleteInvite = () => {
    setInviteDeleteOpen(false)
    showAlert('error', 'Invite Deleted', `Invite code "${inviteCode}" has been removed from the system`)
    setInviteCode("")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    showAlert('info', 'Copied to Clipboard', 'Text has been copied to clipboard')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Алерт внизу по центру */}
      {alert.show && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <Alert className={`
            border shadow-lg animate-in slide-in-from-bottom-5 duration-300
            ${alert.type === 'success' 
              ? 'bg-green-500/10 border-green-500/30 text-green-400' 
              : alert.type === 'error'
              ? 'bg-red-500/10 border-red-500/30 text-red-400'
              : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
            }
          `}>
            <div className="flex items-start space-x-3">
              {alert.type === 'success' && <FaCheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />}
              {alert.type === 'error' && <FaExclamationTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />}
              {alert.type === 'info' && <FaInfoCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />}
              <div className="flex-1">
                <AlertDescription className="font-medium">{alert.title}</AlertDescription>
                <p className="text-sm opacity-90 mt-1">{alert.message}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-transparent"
                onClick={() => setAlert(prev => ({ ...prev, show: false }))}
              >
                <FaTimes className="h-3 w-3" />
              </Button>
            </div>
          </Alert>
        </div>
      )}

      <div className="w-20 bg-[#1a1a24] border-r border-[#2a2a34] flex flex-col items-center py-8 space-y-6">
        <div className="p-4">
          <div className="h-12 w-12 relative">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        <div className="flex-1 flex flex-col items-center space-y-4">
          <button
            onClick={() => setActiveTab('license')}
            className={`p-3 rounded-xl ${activeTab === 'license' ? 'bg-[#f97316] text-white' : 'text-gray-500 hover:text-white'}`}
          >
            <FaKey className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => setActiveTab('invite')}
            className={`p-3 rounded-xl ${activeTab === 'invite' ? 'bg-[#f97316] text-white' : 'text-gray-500 hover:text-white'}`}
          >
            <FaUserFriends className="h-5 w-5" />
          </button>
        </div>
      </div>

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {activeTab === 'license' ? 'License Management' : 'Invite System'}
            </h1>
            <p className="text-gray-400">
              {activeTab === 'license' ? 'Manage and generate license keys' : 'Create and manage invite links'}
            </p>
          </div>

          {activeTab === 'license' ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-[#1a1a24] border-[#2a2a34]">
                  <CardHeader className="pb-4">
                    <div className="h-12 w-12 rounded-lg bg-[#f97316]/10 flex items-center justify-center mb-3">
                      <FaPlus className="h-6 w-6 text-[#f97316]" />
                    </div>
                    <CardTitle className="text-white text-xl">Create Key</CardTitle>
                    <CardDescription className="text-gray-400">
                      Generate new license keys
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setLicenseCreateOpen(true)}
                      className="w-full bg-[#f97316] hover:bg-[#ea580c] h-11 rounded-lg"
                    >
                      <FaPlus className="mr-2 h-4 w-4" />
                      Create Key
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#1a1a24] border-[#2a2a34]">
                  <CardHeader className="pb-4">
                    <div className="h-12 w-12 rounded-lg bg-[#f97316]/10 flex items-center justify-center mb-3">
                      <FaSync className="h-6 w-6 text-[#f97316]" />
                    </div>
                    <CardTitle className="text-white text-xl">Reset HWID</CardTitle>
                    <CardDescription className="text-gray-400">
                      Reset hardware binding
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setLicenseResetOpen(true)}
                      className="w-full bg-[#f97316] hover:bg-[#ea580c] h-11 rounded-lg"
                    >
                      <FaSync className="mr-2 h-4 w-4" />
                      Reset HWID
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#1a1a24] border-[#2a2a34]">
                  <CardHeader className="pb-4">
                    <div className="h-12 w-12 rounded-lg bg-[#f97316]/10 flex items-center justify-center mb-3">
                      <FaList className="h-6 w-6 text-[#f97316]" />
                    </div>
                    <CardTitle className="text-white text-xl">View Keys</CardTitle>
                    <CardDescription className="text-gray-400">
                      List all license keys
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setLicenseListOpen(true)}
                      className="w-full bg-[#f97316] hover:bg-[#ea580c] h-11 rounded-lg"
                    >
                      <FaList className="mr-2 h-4 w-4" />
                      View All
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#1a1a24] border-[#2a2a34]">
                  <CardHeader className="pb-4">
                    <div className="h-12 w-12 rounded-lg bg-[#f97316]/10 flex items-center justify-center mb-3">
                      <FaTrash className="h-6 w-6 text-[#f97316]" />
                    </div>
                    <CardTitle className="text-white text-xl">Delete Key</CardTitle>
                    <CardDescription className="text-gray-400">
                      Remove license key
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setLicenseDeleteOpen(true)}
                      className="w-full bg-[#f97316] hover:bg-[#ea580c] h-11 rounded-lg"
                    >
                      <FaTrash className="mr-2 h-4 w-4" />
                      Delete Key
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-[#1a1a24] border-[#2a2a34]">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Recent Keys</CardTitle>
                  <CardDescription className="text-gray-400">
                    Recently generated license keys
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {licenseKeys.slice(0, 3).map((key) => (
                      <div key={key.id} className="flex items-center justify-between p-4 bg-[#101016] rounded-lg border border-[#2a2a34]">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-lg bg-[#f97316]/10 flex items-center justify-center">
                            <FaKey className="h-5 w-5 text-[#f97316]" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-3">
                              <code className="font-mono text-sm text-white bg-black px-2 py-1 rounded">
                                {key.key}
                              </code>
                              <Badge className={key.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}>
                                {key.status}
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">
                              {key.product} • {key.duration} • HWID: {key.hwid}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-gray-400 hover:text-white"
                          onClick={() => copyToClipboard(key.key)}
                        >
                          <FaCopy className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-[#1a1a24] border-[#2a2a34]">
                  <CardHeader className="pb-4">
                    <div className="h-12 w-12 rounded-lg bg-[#f97316]/10 flex items-center justify-center mb-3">
                      <FaPlus className="h-6 w-6 text-[#f97316]" />
                    </div>
                    <CardTitle className="text-white text-xl">Create Invite</CardTitle>
                    <CardDescription className="text-gray-400">
                      Generate new invite link
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setInviteCreateOpen(true)}
                      className="w-full bg-[#f97316] hover:bg-[#ea580c] h-11 rounded-lg"
                    >
                      <FaPlus className="mr-2 h-4 w-4" />
                      Create Invite
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#1a1a24] border-[#2a2a34]">
                  <CardHeader className="pb-4">
                    <div className="h-12 w-12 rounded-lg bg-[#f97316]/10 flex items-center justify-center mb-3">
                      <FaList className="h-6 w-6 text-[#f97316]" />
                    </div>
                    <CardTitle className="text-white text-xl">View Invites</CardTitle>
                    <CardDescription className="text-gray-400">
                      List all invite links
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setInviteListOpen(true)}
                      className="w-full bg-[#f97316] hover:bg-[#ea580c] h-11 rounded-lg"
                    >
                      <FaList className="mr-2 h-4 w-4" />
                      View All
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#1a1a24] border-[#2a2a34]">
                  <CardHeader className="pb-4">
                    <div className="h-12 w-12 rounded-lg bg-[#f97316]/10 flex items-center justify-center mb-3">
                      <FaTrash className="h-6 w-6 text-[#f97316]" />
                    </div>
                    <CardTitle className="text-white text-xl">Delete Invite</CardTitle>
                    <CardDescription className="text-gray-400">
                      Remove invite link
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setInviteDeleteOpen(true)}
                      className="w-full bg-[#f97316] hover:bg-[#ea580c] h-11 rounded-lg"
                    >
                      <FaTrash className="mr-2 h-4 w-4" />
                      Delete Invite
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-[#1a1a24] border-[#2a2a34]">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Active Invites</CardTitle>
                  <CardDescription className="text-gray-400">
                    Currently active invite links
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {invites.filter(i => i.status === 'active').map((invite) => (
                      <div key={invite.id} className="flex items-center justify-between p-4 bg-[#101016] rounded-lg border border-[#2a2a34]">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-lg bg-[#f97316]/10 flex items-center justify-center">
                            <FaUserFriends className="h-5 w-5 text-[#f97316]" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-3">
                              <code className="font-mono text-sm text-white bg-black px-2 py-1 rounded">
                                {invite.code}
                              </code>
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                {invite.uses}/{invite.maxUses} uses
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">
                              {invite.product} • Expires: {invite.expires}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-gray-400 hover:text-white"
                          onClick={() => copyToClipboard(invite.code)}
                        >
                          <FaCopy className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Dialog open={licenseCreateOpen} onOpenChange={setLicenseCreateOpen}>
        <DialogContent className="bg-[#1a1a24] border-[#2a2a34] text-white sm:max-w-md">
          <DialogHeader>
            <div className="h-14 w-14 rounded-xl bg-[#f97316]/10 flex items-center justify-center mb-4">
              <FaKey className="h-7 w-7 text-[#f97316]" />
            </div>
            <DialogTitle className="text-2xl">Create License Key</DialogTitle>
            <DialogDescription className="text-gray-400">
              Generate a new license key for selected product
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label className="text-white">Product</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="bg-[#101016] border-[#2a2a34] h-12 rounded-lg">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent className="bg-[#101016] border-[#2a2a34] text-white">
                  <SelectItem value="fortnite">Fortnite</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-white">Duration</Label>
              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger className="bg-[#101016] border-[#2a2a34] h-12 rounded-lg">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="bg-[#101016] border-[#2a2a34] text-white">
                  <SelectItem value="week">Weekly</SelectItem>
                  <SelectItem value="month">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLicenseCreateOpen(false)}
              className="h-11 rounded-lg border-gray-800 bg-black text-gray-300 hover:bg-black/80 hover:text-white flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-11 rounded-lg bg-white text-black hover:bg-gray-200 flex-1"
              onClick={handleCreateLicense}
              disabled={!selectedProduct || !selectedDuration}
            >
              Create Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showLicenseKey} onOpenChange={setShowLicenseKey}>
        <DialogContent className="bg-[#1a1a24] border-[#2a2a34] text-white sm:max-w-md">
          <DialogHeader>
            <div className="h-14 w-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
              <FaKey className="h-7 w-7 text-green-500" />
            </div>
            <DialogTitle className="text-2xl">Key Generated</DialogTitle>
            <DialogDescription className="text-gray-400">
              Copy your license key below
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-[#101016] border border-[#2a2a34] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-gray-400">License Key</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                    onClick={() => setShowLicenseKey(!showLicenseKey)}
                  >
                    {showLicenseKey ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(generatedKey)}
                  >
                    <FaCopy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <code className="font-mono text-lg text-white break-all">
                {generatedKey}
              </code>
            </div>
            <p className="text-gray-400 text-sm mt-4 text-center">
              This key will not be shown again. Save it somewhere safe.
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              className="w-full h-11 rounded-lg bg-[#f97316] hover:bg-[#ea580c]"
              onClick={() => setShowLicenseKey(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={licenseResetOpen} onOpenChange={setLicenseResetOpen}>
        <DialogContent className="bg-[#1a1a24] border-[#2a2a34] text-white sm:max-w-md">
          <DialogHeader>
            <div className="h-14 w-14 rounded-xl bg-[#f97316]/10 flex items-center justify-center mb-4">
              <FaSync className="h-7 w-7 text-[#f97316]" />
            </div>
            <DialogTitle className="text-2xl">Reset HWID</DialogTitle>
            <DialogDescription className="text-gray-400">
              Reset hardware ID for a license key
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label className="text-white">License Key</Label>
              <Input
                placeholder="Enter license key"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                className="bg-[#101016] border-[#2a2a34] h-12 rounded-lg"
              />
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLicenseResetOpen(false)}
              className="h-11 rounded-lg border-gray-800 bg-black text-gray-300 hover:bg-black/80 hover:text-white flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-11 rounded-lg bg-white text-black hover:bg-gray-200 flex-1"
              onClick={handleResetHWID}
              disabled={!licenseKey}
            >
              Reset HWID
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={licenseDeleteOpen} onOpenChange={setLicenseDeleteOpen}>
        <DialogContent className="bg-[#1a1a24] border-[#2a2a34] text-white sm:max-w-md">
          <DialogHeader>
            <div className="h-14 w-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
              <FaTrash className="h-7 w-7 text-red-500" />
            </div>
            <DialogTitle className="text-2xl">Delete License Key</DialogTitle>
            <DialogDescription className="text-gray-400">
              This action cannot be undone
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label className="text-white">License Key</Label>
              <Input
                placeholder="Enter license key to delete"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                className="bg-[#101016] border-[#2a2a34] h-12 rounded-lg"
              />
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-400 text-sm">
                ⚠️ This will permanently delete the license key and revoke all access.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLicenseDeleteOpen(false)}
              className="h-11 rounded-lg border-gray-800 bg-black text-gray-300 hover:bg-black/80 hover:text-white flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-11 rounded-lg bg-red-600 text-white hover:bg-red-700 flex-1"
              onClick={handleDeleteLicense}
              disabled={!licenseKey}
            >
              Delete Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={licenseListOpen} onOpenChange={setLicenseListOpen}>
        <DialogContent className="bg-[#1a1a24] border-[#2a2a34] text-white sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">License Keys</DialogTitle>
            <DialogDescription className="text-gray-400">
              All generated license keys in the system
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow className="border-[#2a2a34]">
                  <TableHead className="text-gray-400">Key</TableHead>
                  <TableHead className="text-gray-400">Product</TableHead>
                  <TableHead className="text-gray-400">Duration</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Created</TableHead>
                  <TableHead className="text-gray-400">HWID</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {licenseKeys.map((key) => (
                  <TableRow key={key.id} className="border-[#2a2a34]">
                    <TableCell className="font-mono text-sm">
                      <code className="bg-black px-2 py-1 rounded">{key.key}</code>
                    </TableCell>
                    <TableCell>{key.product}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-[#2a2a34]">
                        {key.duration}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={key.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}>
                        {key.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-400">{key.created}</TableCell>
                    <TableCell className="font-mono text-sm text-gray-400">{key.hwid}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                          onClick={() => copyToClipboard(key.key)}
                        >
                          <FaCopy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setLicenseListOpen(false)}
              className="h-11 rounded-lg border-gray-800 bg-black text-gray-300 hover:bg-black/80 hover:text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={inviteListOpen} onOpenChange={setInviteListOpen}>
        <DialogContent className="bg-[#1a1a24] border-[#2a2a34] text-white sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Invite Links</DialogTitle>
            <DialogDescription className="text-gray-400">
              All generated invite links in the system
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow className="border-[#2a2a34]">
                  <TableHead className="text-gray-400">Code</TableHead>
                  <TableHead className="text-gray-400">Product</TableHead>
                  <TableHead className="text-gray-400">Uses</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Expires</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invites.map((invite) => (
                  <TableRow key={invite.id} className="border-[#2a2a34]">
                    <TableCell className="font-mono text-sm">
                      <code className="bg-black px-2 py-1 rounded">{invite.code}</code>
                    </TableCell>
                    <TableCell>{invite.product}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-24 bg-[#101016] rounded-full h-2 mr-3">
                          <div 
                            className="bg-[#f97316] h-2 rounded-full" 
                            style={{ width: `${(invite.uses / invite.maxUses) * 100}%` }}
                          />
                        </div>
                        <span>{invite.uses}/{invite.maxUses}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={invite.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}>
                        {invite.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-400">{invite.expires}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                          onClick={() => copyToClipboard(invite.code)}
                        >
                          <FaCopy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setInviteListOpen(false)}
              className="h-11 rounded-lg border-gray-800 bg-black text-gray-300 hover:bg-black/80 hover:text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={inviteCreateOpen} onOpenChange={setInviteCreateOpen}>
        <DialogContent className="bg-[#1a1a24] border-[#2a2a34] text-white sm:max-w-md">
          <DialogHeader>
            <div className="h-14 w-14 rounded-xl bg-[#f97316]/10 flex items-center justify-center mb-4">
              <FaUserFriends className="h-7 w-7 text-[#f97316]" />
            </div>
            <DialogTitle className="text-2xl">Create Invite</DialogTitle>
            <DialogDescription className="text-gray-400">
              Generate a new invite link
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label className="text-white">Product</Label>
              <Select>
                <SelectTrigger className="bg-[#101016] border-[#2a2a34] h-12 rounded-lg">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent className="bg-[#101016] border-[#2a2a34] text-white">
                  <SelectItem value="fortnite">Fortnite</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-white">Max Uses</Label>
              <Select>
                <SelectTrigger className="bg-[#101016] border-[#2a2a34] h-12 rounded-lg">
                  <SelectValue placeholder="Select max uses" />
                </SelectTrigger>
                <SelectContent className="bg-[#101016] border-[#2a2a34] text-white">
                  <SelectItem value="5">5 uses</SelectItem>
                  <SelectItem value="10">10 uses</SelectItem>
                  <SelectItem value="25">25 uses</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setInviteCreateOpen(false)}
              className="h-11 rounded-lg border-gray-800 bg-black text-gray-300 hover:bg-black/80 hover:text-white flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-11 rounded-lg bg-white text-black hover:bg-gray-200 flex-1"
              onClick={handleCreateInvite}
            >
              Create Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={inviteDeleteOpen} onOpenChange={setInviteDeleteOpen}>
        <DialogContent className="bg-[#1a1a24] border-[#2a2a34] text-white sm:max-w-md">
          <DialogHeader>
            <div className="h-14 w-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
              <FaTrash className="h-7 w-7 text-red-500" />
            </div>
            <DialogTitle className="text-2xl">Delete Invite</DialogTitle>
            <DialogDescription className="text-gray-400">
              Remove an invite link from the system
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label className="text-white">Invite Code</Label>
              <Input
                placeholder="Enter invite code"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="bg-[#101016] border-[#2a2a34] h-12 rounded-lg"
              />
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setInviteDeleteOpen(false)}
              className="h-11 rounded-lg border-gray-800 bg-black text-gray-300 hover:bg-black/80 hover:text-white flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-11 rounded-lg bg-red-600 text-white hover:bg-red-700 flex-1"
              onClick={handleDeleteInvite}
              disabled={!inviteCode}
            >
              Delete Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}