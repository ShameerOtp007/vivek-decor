import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import birthdayImg from '../assets/images/birthday.png';
import anniversaryImg from '../assets/images/anniversary.png';
import balloonImg from '../assets/images/balloon-arch.png';

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/masterpieces`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(item => ({
          ...item,
          image: item.image_url.startsWith('http') ? item.image_url : `${API_URL}${item.image_url}`
        }));
        setProjects(formatted);
      })
      .catch(err => console.error('Failed to fetch masterpieces:', err));
  }, []);

  return (
    <section id="portfolio" className="bg-bg-dark py-12 md:py-20 overflow-hidden">
      <div className="container">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl text-gray-900 mb-4">Our Masterpieces</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-500">Swipe to explore our gallery. Click to view full screen.</p>
        </div>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="w-full py-10"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id} className="w-[280px] md:w-[400px] h-[400px] md:h-[500px]">
              <div 
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
                onClick={() => setSelectedImage(project)}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-primary text-sm uppercase tracking-wider mb-2 font-bold">
                    {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl text-white font-heading">
                    {project.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-5xl max-h-[90vh] w-full rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white bg-black/50 hover:bg-primary rounded-full p-2 transition-colors z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain max-h-[85vh]"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white">
                  <h3 className="text-2xl font-heading">{selectedImage.title}</h3>
                  <p className="text-primary">{selectedImage.category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
