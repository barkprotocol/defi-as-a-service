'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Heart, RefreshCw, DollarSign } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, createTransferInstruction } from '@solana/spl-token'

// Mock token addresses (replace with actual addresses in production)
const BARK_TOKEN_ADDRESS = new PublicKey('BARKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
const USDC_TOKEN_ADDRESS = new PublicKey('USDCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

const CurrencyIcon = ({ currency }: { currency: string }) => {
  switch (currency) {
    case 'SOL':
      return (
        <svg width="20" height="20" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="64" fill="black"/>
          <path d="M44.5164 86.8422C45.0132 86.3454 45.6941 86.0623 46.4055 86.0623H106.078C107.363 86.0623 108.006 87.6116 107.072 88.5459L93.4833 102.134C92.9865 102.631 92.3056 102.914 91.5942 102.914H31.9216C30.6368 102.914 29.9941 101.365 30.9278 100.431L44.5164 86.8422Z" fill="url(#paint0_linear)"/>
          <path d="M44.5164 25.8658C45.0386 25.369 45.7195 25.0859 46.4055 25.0859H106.078C107.363 25.0859 108.006 26.6352 107.072 27.5695L93.4833 41.1581C92.9865 41.6549 92.3056 41.938 91.5942 41.938H31.9216C30.6368 41.938 29.9941 40.3887 30.9278 39.4544L44.5164 25.8658Z" fill="url(#paint1_linear)"/>
          <path d="M93.4833 56.2207C92.9865 55.7239 92.3056 55.4408 91.5942 55.4408H31.9216C30.6368 55.4408 29.9941 56.9901 30.9278 57.9244L44.5164 71.513C45.0132 72.0098 45.6941 72.2929 46.4055 72.2929H106.078C107.363 72.2929 108.006 70.7436 107.072 69.8093L93.4833 56.2207Z" fill="url(#paint2_linear)"/>
          <defs>
            <linearGradient id="paint0_linear" x1="69.0001" y1="86.0623" x2="69.0001" y2="102.914" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00FFA3"/>
              <stop offset="1" stopColor="#DC1FFF"/>
            </linearGradient>
            <linearGradient id="paint1_linear" x1="69" y1="25.0859" x2="69" y2="41.938" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00FFA3"/>
              <stop offset="1" stopColor="#DC1FFF"/>
            </linearGradient>
            <linearGradient id="paint2_linear" x1="69.0001" y1="55.4408" x2="69.0001" y2="72.2929" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00FFA3"/>
              <stop offset="1" stopColor="#DC1FFF"/>
            </linearGradient>
          </defs>
        </svg>
      )
    case 'BARK':
      return (
        <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="50" fill="#F2994A"/>
          <path d="M30 70V30H50C55.5228 30 60 34.4772 60 40C60 45.5228 55.5228 50 50 50H40V70H30Z" fill="white"/>
          <path d="M50 50H40V60H50C55.5228 60 60 55.5228 60 50C60 44.4772 55.5228 40 50 40V50Z" fill="white"/>
        </svg>
      )
    case 'USDC':
      return (
        <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="50" fill="#2775CA"/>
          <path d="M50 75C63.8071 75 75 63.8071 75 50C75 36.1929 63.8071 25 50 25C36.1929 25 25 36.1929 25 50C25 63.8071 36.1929 75 50 75Z" fill="white"/>
          <path d="M54.5 45.5C54.5 42.7386 52.2614 40.5 49.5 40.5C46.7386 40.5 44.5 42.7386 44.5 45.5V54.5C44.5 57.2614 46.7386 59.5 49.5 59.5C52.2614 59.5 54.5 57.2614 54.5 54.5V45.5Z" fill="#2775CA"/>
          <path d="M60 50C60 44.4772 55.5228 40 50 40C44.4772 40 40 44.4772 40 50C40 55.5228 44.4772 60 50 60C55.5228 60 60 55.5228 60 50Z" stroke="#2775CA" strokeWidth="2"/>
        </svg>
      )
    default:
      return null
  }
}

const predefinedAmounts = [5, 10, 25, 50, 100]

export default function DonationsPage() {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('SOL')
  const [isLoading, setIsLoading] = useState(false)
  const [prices, setPrices] = useState<Record<string, number>>({})
  const [isCustomAmount, setIsCustomAmount] = useState(false)
  const [usdEquivalent, setUsdEquivalent] = useState('0.00')
  const { toast } = useToast()
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, 60000) // Refresh prices every minute
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    calculateUsdEquivalent()
  }, [amount, currency, prices])

  const fetchPrices = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana,usd-coin&vs_currencies=usd')
      const data = await response.json()
      setPrices({
        SOL: data.solana.usd,
        USDC: data['usd-coin'].usd,
        BARK: 0.1 // Mocked price for BARK token
      })
    } catch (error) {
      console.error('Error fetching prices:', error)
      toast({
        title: "Failed to fetch prices",
        description: "Please try again later or proceed with caution.",
        variant: "destructive",
      })
    }
  }

  const calculateUsdEquivalent = () => {
    const numericAmount = parseFloat(amount) || 0
    const price = prices[currency] || 0
    setUsdEquivalent((numericAmount * price).toFixed(2))
  }

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your Solana wallet to make a donation.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const parsedAmount = parseFloat(amount)
      let transaction = new Transaction()

      if (currency === 'SOL') {
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey('DonationAddressxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'), // Replace with actual donation address
            lamports: parsedAmount * LAMPORTS_PER_SOL,
          })
        )
      } else {
        const tokenMintAddress = currency === 'BARK' ? BARK_TOKEN_ADDRESS : USDC_TOKEN_ADDRESS
        const tokenAccountInfo = await connection.getTokenAccountsByOwner(publicKey, { mint: tokenMintAddress })
        const sourceTokenAccount = tokenAccountInfo.value[0].pubkey

        transaction.add(
          createTransferInstruction(
            sourceTokenAccount,
            new PublicKey('DonationTokenAccountxxxxxxxxxxxxxxxxxxxxxxxx'), // Replace with actual donation token account
            publicKey,
            parsedAmount * (10 ** (currency === 'USDC' ? 6 : 9)), // USDC has 6 decimals, BARK has 9
            [],
            TOKEN_PROGRAM_ID
          )
        )
      }

      const signature = await sendTransaction(transaction, connection)
      await connection.confirmTransaction(signature, 'confirmed')

      toast({
        title: "Thank you for your donation!",
        description: `You have donated ${amount} ${currency} (≈$${usdEquivalent} USD).`,
      })
      setAmount('')
      setIsCustomAmount(false)
    } catch (error) {
      console.error("Error processing donation:", error)
      toast({
        title: "Donation failed",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString())
    setIsCustomAmount(false)
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
    setIsCustomAmount(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto bg-gradient-to-br from-[#D0BFB4] to-[#E8DFD8] dark:from-gray-800 dark:to-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800 dark:text-white">Make a Donation</CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-300">Your support helps us make a difference</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDonation} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Select Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-600 border-[#D0BFB4] dark:border-gray-500">
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  {['SOL', 'BARK', 'USDC'].map((curr) => (
                    <SelectItem key={curr} value={curr}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <CurrencyIcon currency={curr} />
                          <span className="ml-2 font-medium">{curr}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ${prices[curr]?.toFixed(2) || '-.--'}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-gray-700 dark:text-gray-200">Select Amount</Label>
              <div className="grid grid-cols-3 gap-2">
                {predefinedAmounts.map((presetAmount) => (
                  <Button
                    key={presetAmount}
                    type="button"
                    variant={amount === presetAmount.toString() && !isCustomAmount ? "default" : "outline"}
                    onClick={() => handleAmountSelect(presetAmount)}
                    className="w-full bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AFA3] dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                  >
                    {presetAmount} {currency}
                  </Button>
                ))}
                <Button
                  type="button"
                  variant={isCustomAmount ? "default" : "outline"}
                  onClick={() => setIsCustomAmount(true)}
                  className="w-full bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AFA3] dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                >
                  Custom
                </Button>
              </div>
            </div>
            {isCustomAmount && (
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-lg font-semibold text-gray-700 dark:text-gray-200">Custom Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter custom amount"
                  value={amount}
                  onChange={handleCustomAmountChange}
                  required
                  min="0.000001"
                  step="0.000001"
                  className="bg-white dark:bg-gray-600 border-[#D0BFB4] dark:border-gray-500"
                />
              </div>
            )}
            <div className="flex justify-between items-center bg-white dark:bg-gray-600 p-3 rounded-md border border-[#D0BFB4] dark:border-gray-500">
              <span className="text-lg font-semibold flex items-center text-gray-800 dark:text-white">
                <DollarSign className="h-5 w-5 mr-1 text-[#D0BFB4] dark:text-gray-400" />
                {usdEquivalent} USD
              </span>
              <Button type="button" variant="outline" size="sm" onClick={fetchPrices} className="bg-transparent border-[#D0BFB4] text-gray-700 hover:bg-[#D0BFB4] hover:text-gray-800 dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-500 dark:hover:text-white">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Rates
              </Button>
            </div>
            <div className="flex justify-center">
              <WalletMultiButton className="!bg-[#D0BFB4] !text-gray-800 hover:!bg-[#C1AFA3] dark:!bg-gray-600 dark:!text-white dark:hover:!bg-gray-500" />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#D0BFB4] hover:bg-[#C1AFA3] text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#D0BFB4] focus:ring-opacity-50 shadow-lg dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
              disabled={isLoading || !publicKey || !amount}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-5 w-5" />
                  Donate Now
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-600 dark:text-gray-300">
          Your donation is securely processed on the Solana blockchain and greatly appreciated.
        </CardFooter>
      </Card>
    </div>
  )
}