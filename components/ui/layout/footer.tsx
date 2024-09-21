import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} BARK Protocol. All rights reserved.</p>
        <div className="mt-4">
          <a href="/pages/terms" className="text-gray-400 hover:text-gray-300 mx-2">Terms of Use</a>
          <a href="/pages/privacy" className="text-gray-400 hover:text-gray-300 mx-2">Privacy Policy</a>
          <a href="/pages/contact" className="text-gray-400 hover:text-gray-300 mx-2">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
