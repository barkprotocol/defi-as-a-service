'use client'

import React, { useState, useEffect, useCallback, memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Sun, Moon, Wallet, Menu, X } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { motion, AnimatePresence } from 'framer-motion'

const blinkTexts = ['BLINK', 'NFT', 'DONATIONS']

const Logo = memo(() => (
  <Link href="/" className="flex items-center group">
    <Image width={34} height={34} src="https://ucarecdn.com/74392932-2ff5-4237-a1fa-e0fd15725ecc/bark.svg" alt="BARK Blink Logo" className="w-9 h-9 transition-transform duration-300 group-hover:scale-110" />
    <span className="ml-3 text-lg font-bold text-gray-800 dark:text-white flex items-center">
      <span className="text-lg">BARK</span>
      <span className="mx-0.4">&nbsp;</span>
    </span>
  </Link>
))
Logo.displayName = 'Logo'

const BlinkText = memo(({ text }: { text: string }) => (
  <motion.span 
    key={text}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 2, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="text-primary text-lg"
  >
    {text}
  </motion.span>
))
BlinkText.displayName = 'BlinkText'

const ThemeToggle = memo(({ theme, toggleTheme }: { theme: string | undefined, toggleTheme: () => void }) => (
  <motion.div 
    className="bg-gray-100 dark:bg-gray-700 rounded-md p-1 flex items-center"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Button 
      onClick={toggleTheme} 
      variant="ghost" 
      size="icon" 
      className={`w-7 h-7 rounded-sm flex items-center justify-center transition-colors duration-200 ${
        theme === 'dark' ? 'bg-transparent text-gray-400' : 'bg-white text-yellow-500 shadow-sm'
      }`}
      aria-label="Switch to dark mode"
    >
      <Moon className="h-4 w-4" />
    </Button>
    <Button 
      onClick={toggleTheme} 
      variant="ghost" 
      size="icon" 
      className={`w-7 h-7 rounded-sm flex items-center justify-center transition-colors duration-200 ${
        theme === 'dark' ? 'bg-gray-600 text-yellow-300 shadow-sm' : 'bg-transparent text-gray-500'
      }`}
      aria-label="Switch to light mode"
    >
      <Sun className="h-4 w-4" />
    </Button>
  </motion.div>
))
ThemeToggle.displayName = 'ThemeToggle'

const NavLinks = memo(({ mobile = false }: { mobile?: boolean }) => {
  const linkClass = mobile
    ? "block text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
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
})
NavLinks.displayName = 'NavLinks'

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

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Logo />
            <BlinkText text={blinkText} />
          </motion.div>
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
            <WalletMultiButton className="!bg-black !text-white hover:!bg-gray-800 !rounded-md !px-4 !py-1.5 !text-xs !font-medium !transition-all !duration-300 !flex !items-center !justify-center !h-8 !shadow-md hover:!shadow-lg">
              <Wallet className="mr-1.5 h-3.5 w-3.5" />
              <span>{connected ? 'Connected' : 'Select Wallet'}</span>
            </WalletMultiButton>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
          <div className="md:hidden flex items-center">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button onClick={toggleMenu} variant="ghost" size="icon" className="w-8 h-8 !p-1.5" aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
              <WalletMultiButton className="!bg-black !text-white hover:!bg-gray-800 !rounded-md !px-3 !py-1.5 !text-xs !font-medium !transition-all !duration-300 !flex !items-center !justify-center !h-8 !shadow-md hover:!shadow-lg">
                <Wallet className="mr-1.5 h-3.5 w-3.5" />
                <span>{connected ? 'Connected' : 'Select Wallet'}</span>
              </WalletMultiButton>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}