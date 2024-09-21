'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faDiscord, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { GlobeAltIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/outline';
import axios from 'axios';
import {
  ArrowRight,
  Zap,
  Shield,
  Coins,
  Code,
  Layers,
  Cpu,
  Gift,
  Users,
  CreditCard,
  Repeat,
  Plus,
} from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // Ensure Accordion components are imported

export default function BARKBlinkLanding() {
  const [blinkText, setBlinkText] = useState('BLINK');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkText(prev => prev === 'BLINK' ? '' : 'BLINK');
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

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
        setSuccess('Thank you for subscribing!');
        setEmail('');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Subscription failed. Please check your email and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img className="h-8 w-auto" src="https://ucarecdn.com/74392932-2ff5-4237-a1fa-e0fd15725ecc/bark.svg?height=32&width=32" alt="BARK Blink Logo" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                BARK <span className="blink text-primary">{blinkText}</span>
              </span>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">Documentation</Button>
              <Button className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
<section className="relative bg-gray-50 pt-20 pb-32 px-4 sm:px-6 lg:px-8 text-center">
  <div className="absolute inset-0">
    <img
      src="https://ucarecdn.com/750e9f1b-edfc-4ac8-a5b4-3286c7de98d6/barkmascottrasparentbg.png"
      alt="Background"
      className="w-fit h-fit object-cover opacity-10" // Adjust opacity for a subtle background effect
    />
  </div>
  
  <div className="relative max-w-7xl mx-auto">
    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
      <span className="block">Revolutionize Solana Interactions</span>
      <span className="block text-primary">with BARK Blink</span>
    </h1>
    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
      BARK Blink empowers developers to create lightning-fast Solana actions and blink applications. Streamline your blockchain development with our powerful Blink As A Service platform.
    </p>

    <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
      <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">Start Building</Button>
      <Button variant="outline" className="mt-3 w-full sm:w-auto sm:ml-3 sm:mt-0">Explore Blinkboard</Button>
    </div>
  </div>
</section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Supercharge Your Solana Development</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            BARK Blink provides developers with powerful tools to create efficient, secure, and scalable Solana-based actions and blink applications.
          </p>
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Lightning-Fast Transactions", description: "Execute Solana transactions with unprecedented speed and efficiency." },
              { icon: Shield, title: "Enhanced Security", description: "Implement robust security measures to protect user assets and sensitive data." },
              { icon: Coins, title: "Token Management", description: "Easily create, transfer, and manage Solana tokens within your applications." },
              { icon: Code, title: "Intuitive Blink SDK", description: "Develop Solana applications quickly with our user-friendly Blink SDK." },
              { icon: Layers, title: "Seamless Integration", description: "Effortlessly integrate Solana functionality into existing applications." },
              { icon: Cpu, title: "Scalable Infrastructure", description: "Built to handle high-volume transactions for growing dApps and user bases." },
            ].map((feature, index) => (
              <Card key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-primary mx-auto" />
                  <h3 className="mt-5 text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blink Actions and Use Cases Section */}
<section className="py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="lg:text-center">
      <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Blink Actions Ecosystem</h2>
      <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Powering Next-Gen Solana Applications
      </p>
      <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
        Explore the diverse range of Solana actions and use cases enabled by BARK Blink. Our platform empowers developers to create innovative blockchain solutions with ease.
      </p>
    </div>

    <div className="mt-10">
      <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        {[
          { icon: Gift, name: 'Instant Donations', description: 'Enable seamless, low-fee donations on Solana. Perfect for non-profits, content creators, and fundraising campaigns.' },
          { icon: Users, name: 'Decentralized Crowdfunding', description: 'Launch and manage crowdfunding campaigns with automatic fund distribution and transparent tracking on the Solana blockchain.' },
          { icon: CreditCard, name: 'Micro-Payments', description: 'Implement fast, cost-effective micro-payment systems for content monetization, pay-per-use services, and more.' },
          { icon: Repeat, name: 'Token Swaps', description: 'Create decentralized token swap functionality with optimal routing and minimal slippage on Solana.' },
        ].map(({ icon: Icon, name, description }, index) => (
          <div key={index} className="relative flex flex-col bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex-shrink-0">
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div className="mt-3">
              <p className="text-lg font-medium text-gray-900">{name}</p>
              <p className="mt-1 text-base text-gray-500">{description}</p>
            </div>
          </div>
        ))}
      </dl>
    </div>
  </div>
</section>

{/* Blinkboard Section */}
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Explore the Blinkboard</h2>
    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
      The Blinkboard showcases a variety of Solana applications powered by BARK Blink. Discover innovative use cases and solutions.
    </p>
    <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[
        { title: "Real-Time Data", description: "Access live data feeds and updates from the Solana blockchain." },
        { title: "User-Friendly Interface", description: "Navigate through applications effortlessly with our intuitive UI." },
        { title: "Community Contributions", description: "Explore applications created by our vibrant developer community." },
      ].map((blinkboardItem, index) => (
        <Card key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <h3 className="mt-5 text-lg font-medium text-gray-900">{blinkboardItem.title}</h3>
            <p className="mt-2 text-base text-gray-500">{blinkboardItem.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

{/* FAQ Section */}
<section className="py-20">
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl mb-8">
      Frequently Asked Questions
    </h2>
    <Accordion type="single" collapsible className="w-full">
      {[
        { question: "What is BARK Blink?", answer: "BARK Blink is a platform that allows developers to create fast and efficient Solana actions and applications." },
        { question: "How do I get started with BARK Blink?", answer: "You can get started by exploring our documentation and signing up for our services." },
        { question: "Is there any cost to use BARK Blink?", answer: "BARK Blink offers a range of free and premium features. Please refer to our pricing page for more details." },
        { question: "Can I integrate BARK Blink with existing applications?", answer: "Yes, BARK Blink is designed to integrate seamlessly with your existing applications." },
      ].map(({ question, answer }, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger className="text-left">
            <span className="flex items-center">
              <Plus className="h-5 w-5 mr-2 flex-shrink-0 accordion-icon" />
              {question}
            </span>
          </AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
</section>

{/* Footer */}
<footer className="bg-white py-6">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div className="flex justify-center space-x-4">
    </div>
    <div className="mt-4 flex justify-center space-x-4">
      <a href="https://twitter.com/bark_protocol" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} className="text-gray-600 hover:text-gray-900 cursor-pointer" />
      </a>
      <a href="https://discord.gg/your_invite" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faDiscord} className="text-gray-600 hover:text-gray-900 cursor-pointer" />
      </a>
      <a href="https://github.com/barkprotocol/blink-as-a-service" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} className="text-gray-600 hover:text-gray-900 cursor-pointer" />
      </a>
      <a href="https://medium.com/@barkprotocol" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faMedium} className="text-gray-600 hover:text-gray-900 cursor-pointer" />
      </a>
    </div>
    <p className="text-gray-600 mt-4">© 2024 BARK Protocol. All rights reserved.</p>
  </div>
</footer>
   </div>
  );
}