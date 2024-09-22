'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Sun, Moon, Wallet, Menu, X } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { motion, AnimatePresence } from 'framer-motion'

const blinkTexts = ['BLINK', 'NFT', 'DONATIONS']

export function Navbar() {
  const [blinkText, setBlinkText] = useState('BLINK')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { connected } = useWallet()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setBlinkText(prevText => {
        const currentIndex = blinkTexts.indexOf(prevText)
        return blinkTexts[(currentIndex + 1) % blinkTexts.length]
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  if (!mounted) {
    return null
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center group">
              <Image width={40} height={40} src="https://ucarecdn.com/74392932-2ff5-4237-a1fa-e0fd15725ecc/bark.svg" alt="BARK Blink Logo" className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />
              <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white">
                BARK <motion.span 
                  key={blinkText}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary"
                >
                  {blinkText}
                </motion.span>
              </span>
            </Link>
          </motion.div>
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
            <WalletMultiButton className="!bg-gray-900 !text-white hover:!bg-gray-800 !rounded-md !px-4 !py-2 !text-sm !font-medium !transition-all !duration-300 !flex !items-center !justify-center !h-10 !shadow-md hover:!shadow-lg">
              <Wallet className="mr-2 h-4 w-4" />
              <span>{connected ? 'Connected' : 'Select Wallet'}</span>
            </WalletMultiButton>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={toggleTheme} 
                variant="outline" 
                size="icon" 
                className="w-10 h-10 rounded-full !p-2 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </motion.div>
          </div>
          <div className="md:hidden flex items-center">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button onClick={toggleMenu} variant="ghost" size="icon" className="w-10 h-10 !p-2" aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLinks mobile />
            </div>
            <div className="px-4 py-3 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
              <WalletMultiButton className="!bg-gray-900 !text-white hover:!bg-gray-800 !rounded-md !px-4 !py-2 !text-sm !font-medium !transition-all !duration-300 !flex !items-center !justify-center !h-10 !shadow-md hover:!shadow-lg">
                <Wallet className="mr-2 h-4 w-4" />
                <span>{connected ? 'Connected' : 'Select Wallet'}</span>
              </WalletMultiButton>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={toggleTheme} 
                  variant="outline" 
                  size="icon" 
                  className="w-10 h-10 rounded-full !p-2 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const linkClass = mobile
    ? "block text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
    : "text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"

  const links = [
    { href: "/", label: "Home" },
    { href: "/pages/actions", label: "Actions" },
    { href: "/pages/services", label: "Services" },
    { href: "/#", label: "FAQ" },
    { href: "https://gitbook.com/", label: "Docs" },
  ]

  return (
    <>
      {links.map((link) => (
        <motion.div key={link.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href={link.href} className={linkClass}>
            {link.label}
          </Link>
        </motion.div>
      ))}
    </>
  )
}