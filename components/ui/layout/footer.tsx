"use client";

import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faDiscord, faGithub, faMedium, faTelegram } from '@fortawesome/free-brands-svg-icons'

const socialLinks = [
  { href: "https://twitter.com/bark_protocol", icon: faTwitter, label: "Twitter" },
  { href: "https://t.me/barkprotocol", icon: faTelegram, label: "Telegram" },
  { href: "https://discord.com/", icon: faDiscord, label: "Discord" },
  { href: "https://medium.com/@barkprotocol", icon: faMedium, label: "Medium" },
  { href: "https://github.com/barkprotocol/blink-as-a-service", icon: faGithub, label: "GitHub" },
]

const footerLinks = [
  { href: "/pages/privacy-policy", label: "Privacy Policy" },
  { href: "/pages/terms-of-use", label: "Terms of Use" },
]

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h2>
        <div className="flex justify-center space-x-6 mb-6">
          {socialLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200" 
              aria-label={link.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={link.icon} className="h-5 w-5" />
            </a>
          ))}
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} BARK Protocol. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          {footerLinks.map((link) => (
            <Link 
              key={link.label}
              href={link.href} 
              className="text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}