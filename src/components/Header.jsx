import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Packages', href: '#packages' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="text-3xl md:text-4xl font-bold text-gradient font-heading">
          Vivek Decor
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-gray-800 hover:text-primary transition-colors text-sm uppercase tracking-wider font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="tel:+919207574633" 
            className="flex items-center gap-2 text-gray-800 hover:text-primary transition-colors font-medium"
          >
            <Phone size={20} />
            <span className="text-sm">Call Us</span>
          </a>
          <a 
            href="https://wa.me/919207574633" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2 !py-2 !px-4 !text-sm"
          >
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl p-6 md:hidden border-b border-gray-100 shadow-xl"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-800 hover:text-primary text-lg font-medium"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-gray-200 my-2" />
              <a 
                href="tel:+919207574633" 
                className="flex items-center gap-2 text-gray-800 font-medium"
              >
                <Phone size={20} />
                <span>Call Us</span>
              </a>
              <a 
                href="https://wa.me/919207574633" 
                className="btn-primary flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                <span>WhatsApp</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
