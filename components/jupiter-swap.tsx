'use client'

import { useState, useEffect } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowDownUp, Loader2 } from 'lucide-react'

interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
}

export function JupiterSwap() {
  const { connection } = useConnection()
  const wallet = useWallet()
  const { toast } = useToast()

  const [tokens, setTokens] = useState<Token[]>([])
  const [inputToken, setInputToken] = useState<Token | null>(null)
  const [outputToken, setOutputToken] = useState<Token | null>(null)
  const [inputAmount, setInputAmount] = useState('')
  const [outputAmount, setOutputAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchTokens()
  }, [])

  const fetchTokens = async () => {
    try {
      const response = await fetch('https://token.jup.ag/all')
      const data = await response.json()
      setTokens(data)
    } catch (error) {
      console.error('Failed to fetch tokens:', error)
      toast({
        title: "Error",
        description: "Failed to fetch tokens. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSwap = async () => {
    if (!wallet.publicKey || !inputToken || !outputToken || !inputAmount) {
      toast({
        title: "Error",
        description: "Please fill in all fields and connect your wallet.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // 1. Get route
      const route = await getRoute()

      // 2. Get serialized transactions
      const { swapTransaction } = await getTransactions(route)

      // 3. Execute the transaction
      const txid = await executeTransaction(swapTransaction)

      toast({
        title: "Swap Successful",
        description: `Transaction ID: ${txid}`,
      })
    } catch (error) {
      console.error('Swap failed:', error)
      toast({
        title: "Swap Failed",
        description: error.message || "An error occurred during the swap.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getRoute = async () => {
    const response = await fetch(`https://quote-api.jup.ag/v4/quote?inputMint=${inputToken.address}&outputMint=${outputToken.address}&amount=${inputAmount}&slippageBps=50`)
    const data = await response.json()
    return data
  }

  const getTransactions = async (route) => {
    const response = await fetch('https://quote-api.jup.ag/v4/swap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: route,
        userPublicKey: wallet.publicKey.toString(),
        wrapUnwrapSOL: true
      })
    })
    const data = await response.json()
    return data
  }

  const executeTransaction = async (swapTransaction: string) => {
    const transaction = swapTransaction
    const signedTransaction = await wallet.signTransaction(transaction)
    const txid = await connection.sendRawTransaction(signedTransaction.serialize())
    await connection.confirmTransaction(txid)
    return txid
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="input-token">From</Label>
        <Select onValueChange={(value) => setInputToken(tokens.find(t => t.address === value))}>
          <SelectTrigger id="input-token">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            {tokens.map((token) => (
              <SelectItem key={token.address} value={token.address}>
                {token.symbol}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="input-amount">Amount</Label>
        <Input
          id="input-amount"
          type="number"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>
      <div className="flex justify-center">
        <Button variant="outline" size="icon" onClick={() => {
          const temp = inputToken;
          setInputToken(outputToken);
          setOutputToken(temp);
        }}>
          <ArrowDownUp className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="output-token">To</Label>
        <Select onValueChange={(value) => setOutputToken(tokens.find(t => t.address === value))}>
          <SelectTrigger id="output-token">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            {tokens.map((token) => (
              <SelectItem key={token.address} value={token.address}>
                {token.symbol}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="output-amount">Estimated Output</Label>
        <Input
          id="output-amount"
          type="text"
          value={outputAmount}
          readOnly
          placeholder="Estimated amount you'll receive"
        />
      </div>
      <Button onClick={handleSwap} disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Swapping...
          </>
        ) : (
          'Swap'
        )}
      </Button>
    </div>
  )
}