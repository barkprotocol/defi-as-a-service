import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full bg-white dark:bg-gray-800 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          BARK
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Home
          </Link>
          <Link href="/pages/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            About
          </Link>
          <Link href="/pages/services" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Services
          </Link>
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            FAQ
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
