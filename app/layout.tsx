import type { Metadata } from "next"
import localFont from "next/font/local"
import { Providers } from "./providers"
import '@solana/wallet-adapter-react-ui/styles.css'
import "./globals.css"

// Load custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

// Define metadata for the application
export const metadata: Metadata = {
  title: "BARK - Blink",
  description: "Blink As A Service dApp",
  keywords: ["BARK", "Blink", "dApp", "Solana", "NFT"],
  author: "Your Name",
}

// Root layout component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Include favicon and other head elements if needed */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-dark-gray`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow">{children}</main>
            {/* Optional Footer */}
            <footer className="py-4 text-center">
              &copy; {new Date().getFullYear()} BARK Protocol. All rights reserved.
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
