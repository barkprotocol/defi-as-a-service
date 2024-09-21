import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img className="h-8 w-auto" src="https://ucarecdn.com/74392932-2ff5-4237-a1fa-e0fd15725ecc/bark.svg?height=32&width=32" alt="BARK Blink Logo" />
            <span className="ml-2 text-xl font-bold text-gray-800">BARK Blink</span>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">Documentation</Button>
            <Button className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
