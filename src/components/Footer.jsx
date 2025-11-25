import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-3xl font-bold text-gray-900 font-heading">
          Vivek Decor
        </div>
        
        <div className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Vivek Decor. All rights reserved.
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all">
            <Instagram size={20} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all">
            <Facebook size={20} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all">
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
