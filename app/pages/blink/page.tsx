import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'
import { CreateBlink } from '@/components/ui/create-blink'

export default function CreateBlinkPage() {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = clusterApiUrl(network)

  const walletAdapters = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ]

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={walletAdapters} autoConnect>
        <WalletModalProvider>
          <CreateBlink />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}