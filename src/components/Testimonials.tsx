import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "Our engagement and reach grew by over 300% on Instagram within two months of working with Rupa! Her local Instagram SEO techniques and aesthetic content planning are truly exceptional.",
      author: "Priya Sharma",
      role: "Founder, The Blush Palette",
      location: "Jamshedpur, Jharkhand"
    },
    {
      quote: "Rupa's deep understanding of content strategies completely transformed our brand image. She is highly professional, data-driven, and knows exactly how to hook the local Jamshedpur community.",
      author: "Vivek Anand",
      role: "Marketing Director, Jamshedpur Foodies",
      location: "Jamshedpur"
    },
    {
      quote: "She is absolutely the best Instagram Growth Specialist in Jharkhand. Rupa helped our artistic brand double its active local community while structuring a gorgeous, high-end profile feed.",
      author: "Anjali Das",
      role: "Owner, Kriti Crafts & Handlooms",
      location: "Jharkhand, India"
    }
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    })
  };

  return (
    <section id="testimonials" className="pt-24 pb-28 px-8 md:px-16 bg-transparent scroll-mt-20 overflow-hidden relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.45em] font-black text-rose-pink block mb-4"
          >
            CLIENT ENDORSEMENTS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-white"
          >
            What Clients Say
          </motion.h2>
          <div className="h-px bg-white/10 w-16 mx-auto mt-6" />
        </div>
 
        {/* Slider Box */}
        <div 
          style={{ backgroundColor: "#B55239", borderColor: "rgba(253, 161, 162, 0.15)" }}
          className="relative min-h-0 py-16 sm:py-20 md:py-24 flex items-center justify-center p-8 sm:p-12 md:p-16 border rounded-[3rem] transition-all duration-500 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
        >
          
          <div className="absolute top-10 left-10 text-rose-pink/10">
            <Quote size={80} strokeWidth={1} className="fill-rose-pink/5" />
          </div>
 
          <div className="relative w-full z-10 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-center text-center px-4"
              >
                <p className="font-serif italic text-2xl md:text-3xl text-white leading-relaxed mb-8 max-w-4xl font-light font-serif">
                  "{testimonials[index].quote}"
                </p>
                <div className="h-px bg-white/10 w-24 mb-6" />
                <h4 className="text-sm font-sans font-black uppercase tracking-widest text-white">
                  {testimonials[index].author}
                </h4>
                <p className="text-[10px] uppercase tracking-wider font-bold text-rose-pink mt-1">
                  {testimonials[index].role} <span className="opacity-40">•</span> <span className="text-white/60">{testimonials[index].location}</span>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
 
          {/* Navigation Controls */}
          <div className="absolute bottom-8 left-8 flex gap-3 z-25">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 59, 51, 1)' }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full border border-orange-brand/30 flex items-center justify-center text-white hover:text-white transition-colors cursor-pointer bg-white/5 backdrop-blur-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 59, 51, 1)' }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full border border-orange-brand/30 flex items-center justify-center text-white hover:text-white transition-colors cursor-pointer bg-white/5 backdrop-blur-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
 
          <div className="absolute bottom-[44px] right-12 hidden sm:flex gap-1.5 pointer-events-none">
            {testimonials.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-orange-brand' : 'w-2 bg-white/10'}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
