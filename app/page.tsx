"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FaPlus, FaUserFriends, FaKey, FaList, FaTrash, FaSync, FaTimes, FaCopy, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa"
import Image from "next/image"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'license' | 'invite'>('license')
  const [licenseCreateOpen, setLicenseCreateOpen] = useState(false)
  const [licenseListOpen, setLicenseListOpen] = useState(false)
  const [inviteCreateOpen, setInviteCreateOpen] = useState(false)
  const [inviteListOpen, setInviteListOpen] = useState(false)
  const [showLicenseKey, setShowLicenseKey] = useState(false)
  const [generatedKey, setGeneratedKey] = useState("")
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedDuration, setSelectedDuration] = useState("")
  const [licenseKeys, setLicenseKeys] = useState<any[]>([])
  const [invites, setInvites] = useState<any[]>([])
  const [alert, setAlert] = useState<{show:boolean,type:'success'|'error'|'info',title:string,message:string}>({show:false,type:'success',title:'',message:''})

  const showAlert = (type:'success'|'error'|'info', title:string, message:string) => {
    setAlert({show:true,type,title,message})
    setTimeout(()=>setAlert(prev=>({...prev,show:false})),5000)
  }

  const fetchLicenses = async () => {
    const { data, error } = await supabaseUsers.from('licenses').select('*')
    if(data) setLicenseKeys(data)
  }

  const fetchInvites = async () => {
    const { data } = await supabaseKeys.from('invites').select('*')
    if(data) setInvites(data)
  }

  useEffect(()=>{
    fetchLicenses()
    fetchInvites()
  },[])

  const generateRandom = (length:number) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for(let i=0;i<length;i++) result += chars.charAt(Math.floor(Math.random()*chars.length))
    return result
  }

  const handleCreateLicense = async () => {
    if(!selectedProduct || !selectedDuration) return
    const key = generateRandom(9)
    const { error } = await supabaseUsers.from('licenses').insert([{key, product:selectedProduct, duration:selectedDuration, status:'active', created:new Date().toISOString(), hwid:null}])
    if(error) showAlert('error','Error',error.message)
    else {
      setGeneratedKey(key)
      setShowLicenseKey(true)
      fetchLicenses()
      showAlert('success','License Created','License key has been successfully generated')
    }
    setLicenseCreateOpen(false)
  }

  const handleCreateInvite = async () => {
    const code = generateRandom(11)
    const { error } = await supabaseKeys.from('invites').insert([{code, product:selectedProduct, uses:0, maxUses:10, expires:null, status:'active'}])
    if(error) showAlert('error','Error',error.message)
    else {
      fetchInvites()
      showAlert('success','Invite Created','New invite link has been generated successfully')
    }
    setInviteCreateOpen(false)
  }

  const copyToClipboard = (text:string) => {
    navigator.clipboard.writeText(text)
    showAlert('info','Copied','Text copied to clipboard')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {alert.show && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <Alert className={`
            border shadow-lg animate-in slide-in-from-bottom-5 duration-300
            ${alert.type==='success'?'bg-green-500/10 border-green-500/30 text-green-400':
              alert.type==='error'?'bg-red-500/10 border-red-500/30 text-red-400':'bg-blue-500/10 border-blue-500/30 text-blue-400'}
          `}>
            <div className="flex items-start space-x-3">
              {alert.type==='success' && <FaCheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"/>}
              {alert.type==='error' && <FaExclamationTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5"/>}
              {alert.type==='info' && <FaInfoCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5"/>}
              <div className="flex-1">
                <AlertDescription className="font-medium">{alert.title}</AlertDescription>
                <p className="text-sm opacity-90 mt-1">{alert.message}</p>
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-transparent" onClick={()=>setAlert(prev=>({...prev,show:false}))}>
                <FaTimes className="h-3 w-3"/>
              </Button>
            </div>
          </Alert>
        </div>
      )}

      <div className="w-20 bg-[#1a1a24] border-r border-[#2a2a34] flex flex-col items-center py-8 space-y-6">
        <div className="p-4">
          <div className="h-12 w-12 relative">
            <Image src="/logo.png" alt="Logo" fill className="object-contain"/>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center space-y-4">
          <button onClick={()=>setActiveTab('license')} className={`p-3 rounded-xl ${activeTab==='license'?'bg-[#f97316] text-white':'text-gray-500 hover:text-white'}`}>
            <FaKey className="h-5 w-5"/>
          </button>
          <button onClick={()=>setActiveTab('invite')} className={`p-3 rounded-xl ${activeTab==='invite'?'bg-[#f97316] text-white':'text-gray-500 hover:text-white'}`}>
            <FaUserFriends className="h-5 w-5"/>
          </button>
        </div>
      </div>

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{activeTab==='license'?'License Management':'Invite System'}</h1>
            <p className="text-gray-400">{activeTab==='license'?'Manage and generate license keys':'Create and manage invite links'}</p>
          </div>

          {activeTab==='license'?(
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-[#1a1a24] border-[#2a2a34]">
                  <CardHeader className="pb-4">
                    <div className="h-12 w-12 rounded-lg bg-[#f97316]/10 flex items-center justify-center mb-3"><FaPlus className="h-6 w-6 text-[#f97316]"/></div>
                    <CardTitle className="text-white text-xl">Create Key</CardTitle>
                    <CardDescription className="text-gray-400">Generate new license keys</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={()=>setLicenseCreateOpen(true)} className="w-full bg-[#f97316] hover:bg-[#ea580c] h-11 rounded-lg"><FaPlus className="mr-2 h-4 w-4"/>Create Key</Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-[#1a1a24] border-[#2a2a34]">
                <CardHeader><CardTitle className="text-white text-xl">Recent Keys</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {licenseKeys.slice(0,5).map(k=>(
                      <div key={k.id} className="flex items-center justify-between p-4 bg-[#101016] rounded-lg border border-[#2a2a34]">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-lg bg-[#f97316]/10 flex items-center justify-center"><FaKey className="h-5 w-5 text-[#f97316]"/></div>
                          <div>
                            <div className="flex items-center space-x-3"><code className="font-mono text-sm text-white bg-black px-2 py-1 rounded">{k.key}</code>
                              <Badge className={k.status==='active'?'bg-green-500/20 text-green-400 border-green-500/30':'bg-red-500/20 text-red-400 border-red-500/30'}>{k.status}</Badge>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{k.product} • {k.duration}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white" onClick={()=>copyToClipboard(k.key)}><FaCopy className="h-4 w-4"/></Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ):(
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-[#1a1a24] border-[#2a2a34]">
                  <CardHeader className="pb-4">
                    <div className="h-12 w-12 rounded-lg bg-[#f97316]/10 flex items-center justify-center mb-3"><FaPlus className="h-6 w-6 text-[#f97316]"/></div>
                    <CardTitle className="text-white text-xl">Create Invite</CardTitle>
                    <CardDescription className="text-gray-400">Generate new invite link</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={()=>setInviteCreateOpen(true)} className="w-full bg-[#f97316] hover:bg-[#ea580c] h-11 rounded-lg"><FaPlus className="mr-2 h-4 w-4"/>Create Invite</Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-[#1a1a24] border-[#2a2a34]">
                <CardHeader><CardTitle className="text-white text-xl">Active Invites</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {invites.filter(i=>i.status==='active').map(inv=>(
                      <div key={inv.id} className="flex items-center justify-between p-4 bg-[#101016] rounded-lg border border-[#2a2a34]">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-lg bg-[#f97316]/10 flex items-center justify-center"><FaUserFriends className="h-5 w-5 text-[#f97316]"/></div>
                          <div>
                            <div className="flex items-center space-x-3"><code className="font-mono text-sm text-white bg-black px-2 py-1 rounded">{inv.code}</code>
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{inv.uses}/10 uses</Badge>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white" onClick={()=>copyToClipboard(inv.code)}><FaCopy className="h-4 w-4"/></Button>
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
            <div className="h-14 w-14 rounded-xl bg-[#f97316]/10 flex items-center justify-center mb-4"><FaKey className="h-7 w-7 text-[#f97316]"/></div>
            <DialogTitle className="text-2xl">Create License Key</DialogTitle>
            <DialogDescription className="text-gray-400">Generate a new license key for selected product</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <Label className="text-white">Product</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="bg-[#101016] border-[#2a2a34] h-12 rounded-lg"><SelectValue placeholder="Select product"/></SelectTrigger>
              <SelectContent className="bg-[#101016] border-[#2a2a34] text-white">
                <SelectItem value="fortnite">Fortnite</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectContent>
            </Select>
            <Label className="text-white">Duration</Label>
            <Select value={selectedDuration} onValueChange={setSelectedDuration}>
              <SelectTrigger className="bg-[#101016] border-[#2a2a34] h-12 rounded-lg"><SelectValue placeholder="Select duration"/></SelectTrigger>
              <SelectContent className="bg-[#101016] border-[#2a2a34] text-white">
                <SelectItem value="week">Weekly</SelectItem>
                <SelectItem value="month">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="gap-3">
            <Button variant="outline" className="h-11 rounded-lg border-gray-800 bg-black text-gray-300 hover:bg-black/80 hover:text-white flex-1" onClick={()=>setLicenseCreateOpen(false)}>Cancel</Button>
            <Button className="h-11 rounded-lg bg-white text-black hover:bg-gray-200 flex-1" onClick={handleCreateLicense} disabled={!selectedProduct||!selectedDuration}>Create Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showLicenseKey} onOpenChange={setShowLicenseKey}>
        <DialogContent className="bg-[#1a1a24] border-[#2a2a34] text-white sm:max-w-md">
          <DialogHeader>
            <div className="h-14 w-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-4"><FaKey className="h-7 w-7 text-green-500"/></div>
            <DialogTitle className="text-2xl">Key Generated</DialogTitle>
            <DialogDescription className="text-gray-400">Copy your license key below</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-[#101016] border border-[#2a2a34] rounded-lg p-4 flex items-center justify-between">
              <code className="font-mono text-lg text-white break-all">{generatedKey}</code>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white" onClick={()=>copyToClipboard(generatedKey)}><FaCopy className="h-4 w-4"/></Button>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full h-11 rounded-lg bg-[#f97316] hover:bg-[#ea580c]" onClick={()=>setShowLicenseKey(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={inviteCreateOpen} onOpenChange={setInviteCreateOpen}>
        <DialogContent className="bg-[#1a1a24] border-[#2a2a34] text-white sm:max-w-md">
          <DialogHeader>
            <div className="h-14 w-14 rounded-xl bg-[#f97316]/10 flex items-center justify-center mb-4"><FaUserFriends className="h-7 w-7 text-[#f97316]"/></div>
            <DialogTitle className="text-2xl">Create Invite</DialogTitle>
            <DialogDescription className="text-gray-400">Generate a new invite link</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <Label className="text-white">Product</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="bg-[#101016] border-[#2a2a34] h-12 rounded-lg"><SelectValue placeholder="Select product"/></SelectTrigger>
              <SelectContent className="bg-[#101016] border-[#2a2a34] text-white">
                <SelectItem value="fortnite">Fortnite</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="gap-3">
            <Button variant="outline" className="h-11 rounded-lg border-gray-800 bg-black text-gray-300 hover:bg-black/80 hover:text-white flex-1" onClick={()=>setInviteCreateOpen(false)}>Cancel</Button>
            <Button className="h-11 rounded-lg bg-white text-black hover:bg-gray-200 flex-1" onClick={handleCreateInvite} disabled={!selectedProduct}>Create Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
