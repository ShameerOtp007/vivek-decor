import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import heroBg from '../assets/images/hero-bg.png';

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden py-0">
      {/* Background */}
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-white">
        <img 
          src={heroBg} 
          alt="Decoration Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-bg-dark/30"></div>
        
        {/* Animated Floating Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-primary text-lg md:text-xl uppercase tracking-[0.3em] mb-4 font-bold">
            Premium Event Styling
          </h2>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-heading text-gray-900 mb-6 leading-tight drop-shadow-sm">
            Make Your Events <br />
            <span className="text-gradient">Unforgettable</span>
          </h1>
          <p className="text-gray-600 text-base md:text-xl max-w-2xl mx-auto mb-8 font-light px-4">
            Specializing in bespoke balloon arches, birthday setups, and anniversary decorations that leave a lasting impression.
          </p>

          {/* Quick Access Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 w-full max-w-md mx-auto md:max-w-none">
             <a href="tel:+919207574633" className="flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-primary px-8 py-3 rounded-full backdrop-blur-sm transition-all border border-primary/20 hover:scale-105 shadow-lg w-full md:w-48">
                <Phone size={20} className="text-primary" />
                <span className="font-semibold">Call Now</span>
             </a>
             <a href="https://wa.me/919207574633" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-600 px-8 py-3 rounded-full backdrop-blur-sm transition-all border border-green-200 hover:scale-105 shadow-lg w-full md:w-48">
                <MessageCircle size={20} />
                <span className="font-semibold">WhatsApp</span>
             </a>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a href="#packages" className="btn-primary min-w-[200px]">
              View Packages
            </a>
            <a href="#portfolio" className="btn-secondary min-w-[200px]">
              Our Work
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
