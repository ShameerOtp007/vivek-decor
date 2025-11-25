import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import { MessageCircle, Check, Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import birthdayImg from '../assets/images/birthday.png';
import anniversaryImg from '../assets/images/anniversary.png';
import balloonImg from '../assets/images/balloon-arch.png';

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/packages`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price,
          image: `${API_URL}${item.image_url}`,
          features: item.features ? item.features.split(',').map(f => f.trim()) : [],
          featured: false
        }));
        setPackages(formatted);
      })
      .catch(err => console.error('Failed to fetch packages:', err));
  }, []);

  const handleWhatsApp = (pkgName) => {
    const message = `Hi, I am interested in the ${pkgName} package. Please provide more details.`;
    window.open(`https://wa.me/919207574633?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="packages" className="relative py-12 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-pink-100/50 to-bg-dark pointer-events-none"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl text-gray-900 mb-4">Curated Packages</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Choose from our most popular decoration packages or contact us for a custom quote.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              onClick={() => setSelectedPackage(pkg)}
              className={`glass-panel p-2 md:p-6 relative group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full cursor-pointer ${pkg.featured ? 'border-primary/50 shadow-[0_0_30px_rgba(255,64,129,0.2)]' : 'border-white/50'}`}
            >
              {pkg.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] md:text-xs font-bold px-2 md:px-4 py-0.5 md:py-1 rounded-full uppercase tracking-wider shadow-lg whitespace-nowrap z-10">
                  Most Popular
                </div>
              )}
              
              <div className="h-28 md:h-48 rounded-lg md:rounded-xl overflow-hidden mb-2 md:mb-6 shrink-0">
                <img 
                  src={pkg.image} 
                  alt={pkg.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h3 className="text-base md:text-2xl text-gray-900 font-heading mb-0.5 md:mb-2 leading-tight">{pkg.name}</h3>
              <div className="text-lg md:text-3xl text-primary font-bold mb-2 md:mb-6">{pkg.price}</div>

              <ul className="space-y-1 md:space-y-3 mb-3 md:mb-8 flex-grow">
                {pkg.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 md:gap-2 text-gray-600 text-[10px] md:text-sm">
                    <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <Check size={8} className="md:w-3 md:h-3" />
                    </div>
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
                {pkg.features.length > 3 && (
                  <li className="text-[10px] md:text-sm text-primary font-medium pl-5 md:pl-7">
                    + {pkg.features.length - 3} more features
                  </li>
                )}
              </ul>

              <button 
                className="w-full btn-primary flex items-center justify-center gap-1.5 md:gap-2 text-xs md:text-base py-1.5 md:py-3 mt-auto"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Package Detail Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPackage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPackage(null)}
                className="absolute top-4 right-4 bg-white/50 hover:bg-white text-gray-800 rounded-full p-2 transition-colors z-10 backdrop-blur-md"
              >
                <X size={20} />
              </button>

              <div className="h-64 relative">
                <img 
                  src={selectedPackage.image} 
                  alt={selectedPackage.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-3xl text-white font-heading mb-1">{selectedPackage.name}</h3>
                    <p className="text-2xl text-primary font-bold">{selectedPackage.price}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Package Includes:</h4>
                <ul className="space-y-3 mb-8">
                  {selectedPackage.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                        <Check size={12} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="tel:+919207574633"
                    className="flex-1 btn-secondary flex items-center justify-center gap-2 py-3"
                  >
                    <Phone size={18} />
                    Call Now
                  </a>
                  <button 
                    onClick={() => handleWhatsApp(selectedPackage.name)}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 py-3"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Packages;
