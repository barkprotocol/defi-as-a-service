'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Button } from "@/components/ui/button"
import { Loader2, Wallet, ChevronDown } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useConnection } from '@solana/wallet-adapter-react'

export function WalletButton() {
  const { wallet, connect, disconnect, connecting, connected, publicKey } = useWallet()
  const { setVisible } = useWalletModal()
  const { connection } = useConnection()
  const [balance, setBalance] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (publicKey) {
      fetchBalance()
    } else {
      setBalance(null)
    }
  }, [publicKey, connection])

  const fetchBalance = async () => {
    if (publicKey) {
      try {
        const balance = await connection.getBalance(publicKey)
        setBalance(balance / 1e9) // Convert lamports to SOL
      } catch (error) {
        console.error('Failed to fetch balance:', error)
        setBalance(null)
      }
    }
  }

  const handleConnect = async () => {
    try {
      if (wallet) {
        await connect()
      } else {
        setVisible(true)
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
      toast({
        title: "Disconnection Failed",
        description: "Failed to disconnect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  if (!isClient) {
    return null // Prevent SSR issues
  }

  if (connecting) {
    return (
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Connecting...
      </Button>
    )
  }

  if (connected && publicKey) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <Wallet className="mr-2 h-4 w-4" />
            <span className="mx-2">{truncateAddress(publicKey.toBase58())}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={fetchBalance}>
            Balance: {balance !== null ? `${balance.toFixed(4)} SOL` : 'Fetch Balance'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.open(`https://explorer.solana.com/address/${publicKey.toBase58()}`, '_blank')}>
            View on Explorer
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDisconnect}>Disconnect</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button variant="outline" onClick={handleConnect}>
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  )
}