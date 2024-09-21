'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faDiscord, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { Zap, Shield, Coins, Code, Layers, Cpu, Gift, Users, CreditCard, Repeat, LockIcon, Image, Wallet } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const featureList = [
  { icon: Zap, title: "Lightning-Fast Transactions", description: "Execute Solana transactions with unprecedented speed and efficiency." },
  { icon: Shield, title: "Enhanced Security", description: "Implement robust security measures to protect user assets and sensitive data." },
  { icon: Coins, title: "Token Management", description: "Easily create, transfer, and manage Solana tokens within your applications." },
  { icon: Code, title: "Intuitive Blink SDK", description: "Develop Solana applications quickly with our user-friendly Blink SDK." },
  { icon: Layers, title: "Seamless Integration", description: "Effortlessly integrate Solana functionality into existing applications." },
  { icon: Cpu, title: "Scalable Infrastructure", description: "Built to handle high-volume transactions for growing dApps and user bases." },
];

const blinkActions = [
  { icon: Gift, name: 'Instant Donations', description: 'Enable seamless, low-fee donations on Solana. Perfect for non-profits and fundraising campaigns.' },
  { icon: Users, name: 'Decentralized Crowdfunding', description: 'Launch and manage crowdfunding campaigns with transparent tracking on the Solana blockchain.' },
  { icon: CreditCard, name: 'Micro-Payments', description: 'Implement fast, cost-effective micro-payment systems for content monetization and more.' },
  { icon: Repeat, name: 'Token Swaps', description: 'Create decentralized token swap functionality with optimal routing and minimal slippage on Solana.' },
  { icon: LockIcon, name: 'Staking', description: 'Build efficient staking protocols leveraging Solana\'s high-speed, low-cost infrastructure.' },
  { icon: Image, name: 'Compressed NFTs', description: 'Create and manage compressed NFTs on Solana, enabling scalable and cost-effective NFT projects.' },
];

const faqItems = [
  { question: "What is BARK Blink?", answer: "BARK Blink is a platform that allows developers to create fast and efficient Solana actions and applications." },
  { question: "How do I get started with BARK Blink?", answer: "You can get started by exploring our documentation and signing up for our services." },
  { question: "Is there any cost to use BARK Blink?", answer: "BARK Blink offers a range of free and premium features. Please refer to our pricing page for more details." },
  { question: "What kind of support does BARK Blink offer?", answer: "We offer comprehensive documentation, community forums, and dedicated support for our premium users." },
  { question: "Can I integrate BARK Blink with existing Solana projects?", answer: "Yes, BARK Blink is designed to seamlessly integrate with existing Solana projects, enhancing their functionality and performance." },
];

const wallets = [
  { name: 'Phantom', icon: '/placeholder.svg?height=32&width=32' },
  { name: 'Solflare', icon: '/placeholder.svg?height=32&width=32' },
  { name: 'Ledger', icon: '/placeholder.svg?height=32&width=32' },
  { name: 'Torus', icon: '/placeholder.svg?height=32&width=32' },
];

export default function BARKBlinkLanding() {
  const [blinkText, setBlinkText] = useState('BLINK');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkText(prev => (prev === 'BLINK' ? '' : 'BLINK'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      toast.error('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`https://<dc>.api.mailchimp.com/3.0/lists/<list_id>/members`, {
        email_address: email,
        status: 'subscribed',
      }, {
        headers: {
          'Authorization': `apikey <your_api_key>`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Thank you for subscribing!');
        setEmail('');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Subscription failed. Please check your email and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    if (!isSignedUp) {
      setIsSignedUp(true);
      toast.success('Successfully signed up!');
    } else {
      toast.info('You are already signed up.');
    }
  };

  const handleWalletConnect = (walletName: string) => {
    toast.success(`Connecting to ${walletName}...`);
    setIsWalletOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <div className="flex items-center">
            <img className="h-8" src="https://ucarecdn.com/74392932-2ff5-4237-a1fa-e0fd15725ecc/bark.svg?height=32&width=32" alt="BARK Blink Logo" />
            <span className="ml-2 text-xl font-bold text-gray-800">BARK <span className="blink text-primary">{blinkText}</span></span>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">Documentation</Button>
            <Dialog open={isWalletOpen} onOpenChange={setIsWalletOpen}>
              <DialogTrigger asChild>
                <Button className="ml-4 bg-gray-900 text-white hover:bg-gray-800">
                  <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Connect your wallet</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {wallets.map((wallet, index) => (
                    <Button
                      key={index}
                      className="w-full justify-start text-left font-normal"
                      variant="outline"
                      onClick={() => handleWalletConnect(wallet.name)}
                    >
                      <img src={wallet.icon} alt={`${wallet.name} icon`} className="mr-2 h-5 w-5" />
                      {wallet.name}
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gray-50 pt-20 pb-32 text-center">
        <div className="relative max-w-7xl mx-auto">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Revolutionize Solana Interactions
            <span className="block text-primary">with BARK Blink</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:text-xl">
            BARK Blink empowers developers to create lightning-fast Solana actions. Streamline your blockchain development with our Blink As A Service platform.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSignUp}
            >
              {isSignedUp ? 'Welcome!' : 'Sign Up Now'}
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">Explore Blinkboard</Button>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <img 
              src="https://ucarecdn.com/74392932-2ff5-4237-a1fa-e0fd15725ecc/bark.svg" 
              alt="BARK Logo" 
              color="white"
              className="h-6 w-auto"
            />
            <p className="mt-2 text-sm text-gray-400">Powered by Solana</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Supercharge Your Solana Development</h2>
          <p className="mt-4 text-xl text-gray-500">BARK Blink provides developers with powerful tools to create efficient, secure, and scalable Solana-based applications.</p>
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featureList.map((feature, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blink Actions Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Blink Actions Ecosystem</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Powering Next-Gen Solana Applications</p>
            <p className="mt-4 text-xl text-gray-500">Explore the range of Solana actions enabled by BARK Blink.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {blinkActions.map((action, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <action.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-medium text-gray-900">{action.name}</h3>
                <p className="mt-1 text-base text-gray-500">{action.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="mt-12">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Stay Updated</h2>
          <p className="mt-4 text-xl text-gray-500">Subscribe to our newsletter for the latest updates and features.</p>
          <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row justify-center">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-64 mb-4 sm:mb-0 sm:mr-4"
            />
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-900 mb-4">Follow Us</p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://twitter.com/bark_protocol" className="text-gray-400 hover:text-gray-500">
              <FontAwesomeIcon icon={faTwitter} className="h-5 w-5" />
            </a>
            <a href="https://discord.com/" className="text-gray-400 hover:text-gray-500">
              <FontAwesomeIcon icon={faDiscord} className="h-5 w-5" />
            </a>
            <a href="https://github.com/barkprotocol/blink-as-a-service" className="text-gray-400 hover:text-gray-500">
              <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
            </a>
            <a href="https://medium.com/@barkprotocol" className="text-gray-400 hover:text-gray-500">
              <FontAwesomeIcon icon={faMedium} className="h-5 w-5" />
            </a>
          </div>
          <p className="text-gray-500">&copy; {new Date().getFullYear()} BARK Protocol. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="/pages/privacy-policy" className="text-sm text-gray-400 hover:text-gray-500">Terms of Use</a>
            <a href="/pages/terms-of-use" className="text-sm text-gray-400 hover:text-gray-500">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}