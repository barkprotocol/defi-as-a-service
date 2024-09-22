"use client";

import React, { useState, useCallback, memo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Zap, Shield, Coins, Code, Layers, Cpu, Gift, Users, CreditCard, Repeat, LockIcon, Image as ImageIcon } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Footer } from '@/components/ui/layout/footer';

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
  { icon: ImageIcon, name: 'Compressed NFTs', description: 'Create and manage compressed NFTs on Solana, enabling scalable and cost-effective NFT projects.' },
];

const faqItems = [
  { question: "What is BARK Blink?", answer: "BARK Blink is a platform that allows developers to create fast and efficient Solana actions and applications." },
  { question: "How do I get started with BARK Blink?", answer: "You can get started by exploring our documentation and signing up for our services." },
  { question: "Is there any cost to use BARK Blink?", answer: "BARK Blink offers a range of free and premium features. Please refer to our pricing page for more details." },
  { question: "What kind of support does BARK Blink offer?", answer: "We offer comprehensive documentation, community forums, and dedicated support for our premium users." },
  { question: "Can I integrate BARK Blink with existing Solana projects?", answer: "Yes, BARK Blink is designed to seamlessly integrate with existing Solana projects, enhancing their functionality and performance." },
];

const FeatureCard = memo(({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
          <feature.icon className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{feature.title}</h3>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{feature.description}</p>
      </CardContent>
    </Card>
  </motion.div>
));

FeatureCard.displayName = 'FeatureCard';

const BlinkActionCard = memo(({ action, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
  >
    <action.icon className="h-6 w-6 text-primary" aria-hidden="true" />
    <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">{action.name}</h3>
    <p className="mt-1 text-base text-gray-500 dark:text-gray-400">{action.description}</p>
  </motion.div>
));

BlinkActionCard.displayName = 'BlinkActionCard';

export default function BARKBlinkLanding() {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      <main id="main-content">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gray-50 dark:bg-gray-900 pt-20 pb-32 text-center"
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              Revolutionize Solana Interactions
              <span className="block text-primary">with BARK Blink</span>
            </h1>
            <p className="mt-4 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:text-xl">
              With BARK Blink, users can effortlessly create lightning-fast actions on the Solana blockchain. Streamline your blockchain experience with our innovative Blink As A Service platform, designed for speed and efficiency.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90">
                <Link href="/pages/how-it-works">Read More</Link>
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                <Link href="/pages/dashboard">Explore Blinkboard</Link>
              </Button>
            </div>
            <div className="mt-12 flex flex-col items-center">
              <Image 
                src="https://ucarecdn.com/74392932-2ff5-4237-a1fa-e0fd15725ecc/bark.svg" 
                alt="BARK Logo" 
                width={24}
                height={24}
                className="h-6 w-auto"
              />
              <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">Powered by Solana</p>
            </div>
          </div>
        </motion.section>

        <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Powerful Features</h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {featureList.map((feature, index) => (
                <FeatureCard feature={feature} key={index} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">What You Can Do with Blink</h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {blinkActions.map((action, index) => (
                <BlinkActionCard action={action} key={index} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="mb-4 text-gray-900">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="mt-12 max-w-3xl mx-auto">
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Subscribe to Our Newsletter</h2>
            <p className="mt-4 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:text-xl text-center">
              Stay updated with the latest news, features, and updates from BARK Blink.
            </p>
            <form onSubmit={handleSubscribe} className="mt-8 flex flex-col items-center">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full max-w-xs mb-4"
                required
              />
              <Button type="submit" className="w-full max-w-xs" disabled={loading}>
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
