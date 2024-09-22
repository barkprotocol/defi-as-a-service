"use client";

import React, { useState, useCallback, memo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Zap, Shield, Coins, Code, Layers, Cpu, Repeat, Users, CreditCard, BarChart, LockIcon, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from '@/components/ui/layout/footer';

const featureList = [
  { icon: Zap, title: "Lightning-Fast Transactions", description: "Execute Solana transactions with unprecedented speed and efficiency." },
  { icon: Shield, title: "Enhanced Security", description: "Implement robust security measures to protect user assets and sensitive data." },
  { icon: Coins, title: "Token Management", description: "Easily create, transfer, and manage Solana tokens within your applications." },
  { icon: Code, title: "Intuitive Blink SDK", description: "Develop Solana applications quickly with our user-friendly Blink SDK." },
  { icon: Layers, title: "Seamless Integration", description: "Effortlessly integrate Solana functionality into existing applications." },
  { icon: Cpu, title: "Scalable Infrastructure", description: "Built to handle high-volume transactions for growing dApps and user bases." },
];

const solanaActions = [
  { icon: Repeat, name: 'Instant Swaps', description: 'Enable lightning-fast token swaps with optimal routing and minimal slippage on Solana.' },
  { icon: Users, name: 'Decentralized Finance', description: 'Build and deploy advanced DeFi protocols leveraging Solana\'s high-speed, low-cost infrastructure.' },
  { icon: CreditCard, name: 'Blink Payments', description: 'Implement fast, cost-effective payment systems using Solana\'s Blink technology.' },
  { icon: BarChart, name: 'Yield Farming', description: 'Create efficient yield farming strategies with real-time rebalancing on Solana.' },
  { icon: LockIcon, name: 'Staking Solutions', description: 'Develop flexible staking mechanisms with automated reward distribution on Solana.' },
  { icon: Sparkles, name: 'Custom Blinks', description: 'Design and deploy custom Solana Actions (Blinks) tailored to your specific use case.' },
];

const faqItems = [
  { question: "What are Solana Actions?", answer: "Solana Actions, also known as Blinks, are pre-built, optimized smart contract interactions that allow developers to quickly implement complex functionalities on the Solana blockchain." },
  { question: "How do Blinks enhance DeFi development?", answer: "Blinks provide ready-to-use DeFi components that can be easily integrated into your applications, significantly reducing development time and ensuring best practices in security and efficiency." },
  { question: "Can I create custom Solana Actions?", answer: "Yes, our platform allows you to create, test, and deploy custom Solana Actions tailored to your specific use case, all while leveraging the speed and cost-effectiveness of the Solana blockchain." },
  { question: "How does BARK Protocol's swap functionality work?", answer: "Our swap functionality utilizes Solana's high-speed infrastructure to provide near-instantaneous token exchanges with optimal routing and minimal slippage, enhancing the user experience in DeFi applications." },
  { question: "What kind of support does BARK Protocol offer for Solana developers?", answer: "We provide extensive support through detailed documentation, active developer forums, and direct assistance for integrating Solana Actions and optimizing DeFi protocols on the Solana blockchain." },
  { question: "How can I get started with BARK Protocol's Solana tools?", answer: "Getting started is simple! Explore our comprehensive documentation, sign up for our services, and start building with our Solana Actions and Blink SDK to accelerate your DeFi development on Solana." },
];

const FeatureCard = memo(({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
          <feature.icon className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{feature.title}</h3>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400 text-center">{feature.description}</p>
      </CardContent>
    </Card>
  </motion.div>
));

FeatureCard.displayName = 'FeatureCard';

const SolanaActionCard = memo(({ action, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <div className="flex items-center mb-4">
      <action.icon className="h-6 w-6 text-primary mr-2" aria-hidden="true" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{action.name}</h3>
    </div>
    <p className="text-base text-gray-500 dark:text-gray-400">{action.description}</p>
  </motion.div>
));

SolanaActionCard.displayName = 'SolanaActionCard';

export default function BARKProtocolLanding() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      toast.error('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_MAILCHIMP_URL}`, {
        email_address: email,
        status: 'subscribed',
      }, {
        headers: {
          'Authorization': `apikey ${process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY}`,
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
  }, [email]);

  return (
    <div className="min-h-screen bg-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      <main id="main-content">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative pt-20 pb-32 text-center"
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-block bg-primary text-primary-foreground text-sm font-semibold rounded-full px-4 py-1.5 shadow-lg">
                Revolutionizing Solana DeFi Development
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
            >
              Supercharge Your Solana DeFi Apps
              <span className="block text-primary mt-2">With BARK Protocol</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300"
            >
              Accelerate your DeFi journey with our cutting-edge Solana Actions. Build, deploy, and scale decentralized finance applications on Solana with unprecedented ease and efficiency.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Button className="w-full sm:w-auto text-lg px-8 py-5 rounded-md shadow-lg transition-transform hover:scale-105">
                <Link href="/pages/dashboard" className="flex items-center">
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-5 rounded-md shadow-lg transition-transform hover:scale-105">
                <Link href="https://docs.barkprotocol.com" className="flex items-center">
                  Documentation
                  <BookOpen className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-16 flex flex-col items-center"
            >
              <Image 
                src="https://ucarecdn.com/f242e5dc-8813-47b4-af80-6e6dd43945a9/barkicon.png"
                alt="BARK Protocol Logo"
                width={80}
                height={70}
                className="h-16 w-16 mb-4"
              />
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Powered by Solana</span>
            </motion.div>
          </div>
        </motion.section>

        <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featureList.map((feature, index) => (
                <FeatureCard feature={feature} key={index} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Solana Actions & Blinks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {solanaActions.map((action, index) => (
                <SolanaActionCard action={action} key={index} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">FAQ</h2>
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">Subscribe to Our DeFi Newsletter</h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 text-center mb-8">
              Stay updated with the latest Solana Actions, DeFi trends, and updates from BARK Protocol.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col items-center">
              <div className="flex w-full max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow rounded-r-none"
                  required
                />
                <Button type="submit" className="rounded-l-none" disabled={loading}>
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}