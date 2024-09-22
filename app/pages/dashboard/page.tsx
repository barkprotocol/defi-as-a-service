'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Blinkboard } from '@/components/blinkboard'
import { 
  PlusCircle, 
  Zap, 
  TrendingUp, 
  Users, 
  DollarSign,
  ArrowRight
} from 'lucide-react'

const RecentActivity = () => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        <li className="flex items-center justify-between">
          <span>Created new blink</span>
          <span className="text-sm text-gray-500">2 minutes ago</span>
        </li>
        <li className="flex items-center justify-between">
          <span>Received 0.5 SOL donation</span>
          <span className="text-sm text-gray-500">1 hour ago</span>
        </li>
        <li className="flex items-center justify-between">
          <span>Swapped 10 USDC for BARK</span>
          <span className="text-sm text-gray-500">3 hours ago</span>
        </li>
      </ul>
    </CardContent>
  </Card>
)

const QuickActions = () => (
  <Card>
    <CardHeader>
      <CardTitle>Quick Actions</CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-2 gap-4">
      <Button className="flex items-center justify-center">
        <PlusCircle className="mr-2 h-4 w-4" />
        Create Blink
      </Button>
      <Button variant="outline" className="flex items-center justify-center">
        <Zap className="mr-2 h-4 w-4" />
        Quick Swap
      </Button>
      <Button variant="outline" className="flex items-center justify-center">
        <TrendingUp className="mr-2 h-4 w-4" />
        View Stats
      </Button>
      <Button variant="outline" className="flex items-center justify-center">
        <Users className="mr-2 h-4 w-4" />
        Invite Friends
      </Button>
    </CardContent>
  </Card>
)

const SolanaActionsSummary = () => (
  <Card>
    <CardHeader>
      <CardTitle>Solana Actions Summary</CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Total Blinks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">24</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Total Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">5.2 SOL</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">NFTs Minted</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">3</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Swap Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">100 USDC</p>
        </CardContent>
      </Card>
    </CardContent>
  </Card>
)

export default function BlinkboardPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Blinkboard />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Blinkboard</h1>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RecentActivity />
              <QuickActions />
            </div>
            <div className="mt-8">
              <SolanaActionsSummary />
            </div>
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Your Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Balance</p>
                      <p className="text-2xl font-bold">12.5 SOL</p>
                    </div>
                    <Button className="flex items-center">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Other Tokens</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <span>BARK</span>
                        <span>1000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>USDC</span>
                        <span>250</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}