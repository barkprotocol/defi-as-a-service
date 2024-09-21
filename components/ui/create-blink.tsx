"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, useToast } from "@/components/ui/use-toast"
import { Loader2, Upload, ArrowLeft, Link as LinkIcon, Wallet, Info, AlertCircle, Image as ImageIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

require('@solana/wallet-adapter-react-ui/styles.css')

interface FormData {
  title: string
  description: string
  category: string
  price: string
  image: File | null
  linkUrl: string
  logoUrl: string
}

const CREATION_FEE_PERCENTAGE = 2.8
const FEE_RECIPIENT_WALLET = new PublicKey("gEb7nD9yLkau1P4uyMdke9byJNrat61suH4vYiPUuiR")

export function CreateBlink() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    price: '',
    image: null,
    linkUrl: '',
    logoUrl: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [creationFee, setCreationFee] = useState(0)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isLogoValid, setIsLogoValid] = useState(true)

  const router = useRouter()
  const { connection } = useConnection()
  const { publicKey, sendTransaction, wallet } = useWallet()
  const { toast } = useToast()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const price = parseFloat(formData.price)
    if (!isNaN(price)) {
      const fee = price * (CREATION_FEE_PERCENTAGE / 100)
      setCreationFee(fee)
    } else {
      setCreationFee(0)
    }
  }, [formData.price])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    field: keyof FormData
  ) => {
    const value = typeof e === 'string' ? e : e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))

    if (field === 'logoUrl') {
      validateLogoUrl(value)
    }
  }

  const validateLogoUrl = (url: string) => {
    if (url.trim() === '') {
      setIsLogoValid(true)
      return
    }

    const img = new Image()
    img.onload = () => setIsLogoValid(true)
    img.onerror = () => setIsLogoValid(false)
    img.src = url
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }))
      setErrors((prev) => ({ ...prev, image: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}
    let isValid = true

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
      isValid = false
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
      isValid = false
    }
    if (!formData.category) {
      newErrors.category = "Category is required"
      isValid = false
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required"
      isValid = false
    }
    if (!formData.image) {
      newErrors.image = "Image is required"
      isValid = false
    }
    if (formData.linkUrl && !isValidUrl(formData.linkUrl)) {
      newErrors.linkUrl = "Invalid URL format"
      isValid = false
    }
    if (formData.logoUrl && !isLogoValid) {
      newErrors.logoUrl = "Invalid logo URL"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSolanaTransaction = async () => {
    if (!publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your Solana wallet to create a Blink.",
        variant: "destructive",
      })
      return false
    }

    try {
      const price = parseFloat(formData.price)
      const feeAmount = Math.floor(price * LAMPORTS_PER_SOL * (CREATION_FEE_PERCENTAGE / 100))

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: FEE_RECIPIENT_WALLET,
          lamports: feeAmount,
        })
      )

      const signature = await sendTransaction(transaction, connection)
      await connection.confirmTransaction(signature, 'processed')

      toast({
        title: "Transaction Successful",
        description: "Your Solana transaction was successful.",
      })

      return true
    } catch (error) {
      console.error("Error in Solana transaction:", error)
      toast({
        title: "Transaction Failed",
        description: "There was an error processing your Solana transaction.",
        variant: "destructive",
      })
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    const transactionSuccess = await handleSolanaTransaction()
    if (!transactionSuccess) {
      setIsSubmitting(false)
      return
    }

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast({
        title: "Blink Created",
        description: "Your new Blink has been successfully created and listed.",
      })

      setFormData({ title: '', description: '', category: '', price: '', image: null, linkUrl: '', logoUrl: '' })
      router.push('/dashboard')
    } catch (error) {
      console.error("Error creating Blink:", error)
      toast({
        title: "Error",
        description: "There was an error creating your Blink. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChangeWallet = () => {
    if (wallet) {
      wallet.adapter.disconnect()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <Card className="w-full shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <CardTitle className="text-3xl font-bold">Create Your Blink</CardTitle>
            <CardDescription className="text-gray-300">Bring your digital asset to life</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Alert className="mb-6">
              <Info className="h-4 w-4" />
              <AlertTitle>Creation Fee</AlertTitle>
              <AlertDescription>
                Creating a Blink incurs a {CREATION_FEE_PERCENTAGE}% fee. This fee helps maintain the platform and support creators.
              </AlertDescription>
            </Alert>
            <div className="mb-6 space-y-4">
              <Label htmlFor="wallet-connect" className="block text-sm font-medium text-gray-700">
                Wallet Connection
              </Label>
              <div className="flex items-center space-x-4">
                <WalletMultiButton className="!bg-gray-800 hover:!bg-gray-700 text-white" />
                {wallet && (
                  <Button 
                    onClick={handleChangeWallet} 
                    variant="outline"
                    className="flex items-center"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Change Wallet
                  </Button>
                )}
              </div>
              {publicKey && (
                <p className="text-sm text-gray-600">
                  Connected: {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
                </p>
              )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange(e, 'title')}
                  placeholder="Enter a catchy title for your Blink"
                  required
                  className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange(e, 'description')}
                  placeholder="Describe your Blink in detail"
                  required
                  className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange(value, 'category')}>
                  <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="digital">Digital Product</SelectItem>
                    <SelectItem value="physical">Physical Product</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (SOL)</Label>
                <div className="relative">
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange(e, 'price')}
                    placeholder="Enter price in SOL"
                    min="0"
                    step="0.01"
                    required
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 pr-20"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">
                            +{creationFee.toFixed(2)} SOL fee
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This is the {CREATION_FEE_PERCENTAGE}% creation fee</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkUrl">Link URL (Optional)</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <LinkIcon className="h-5 w-5" />
                  </span>
                  <Input
                    id="linkUrl"
                    type="url"
                    value={formData.linkUrl}
                    onChange={(e) => handleChange(e, 'linkUrl')}
                    placeholder="https://example.com"
                    className="rounded-none rounded-r-md border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>
                {errors.linkUrl && <p className="text-red-500 text-sm mt-1">{errors.linkUrl}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <ImageIcon className="h-5 w-5" />
                  </span>
                  <Input
                    id="logoUrl"
                    type="url"
                    value={formData.logoUrl}
                    onChange={(e) => handleChange(e, 'logoUrl')}
                    placeholder="https://example.com/logo.png"
                    className="rounded-none rounded-r-md border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>
                {!isLogoValid && <p className="text-red-500 text-sm mt-1">Invalid logo URL</p>}
                {errors.logoUrl && <p className="text-red-500 text-sm mt-1">{errors.logoUrl}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Cover Image</Label>
                <Card className="p-4 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                  <AnimatePresence>
                    {formData.image ? (
                      <motion.img
                        key="image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        src={URL.createObjectURL(formData.image)}
                        alt="Blink cover"
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md mb-4"
                      >
                        <Upload className="w-12 h-12 text-gray-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Input
                    id="image"
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Label htmlFor="image" className="cursor-pointer">
                    <Button variant="outline" className="w-full">
                      {formData.image ? 'Change Image' : 'Upload Image'}
                    </Button>
                  </Label>
                </Card>
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
              </div>
            </form>
          </CardContent>
          <CardFooter className="bg-gray-50 flex justify-end">
            <Button 
              type="submit" 
              onClick={handleSubmit}
              disabled={isSubmitting || !publicKey}
              className="bg-gray-900 hover:bg-gray-950 text-white flex items-center"
            >
              {formData.logoUrl && isLogoValid && (
                <img 
                  src={formData.logoUrl} 
                  alt="Logo" 
                  className="w-6 h-6 mr-2 rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    setIsLogoValid(false)
                  }}
                />
              )}
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Blink'
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}