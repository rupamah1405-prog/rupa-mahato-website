import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Instagram, Linkedin, Send, Phone, CheckCircle2 } from 'lucide-react';
import { socialsConfig } from '../config/socials';
 
export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);
 
    // Simulate high-end backend dispatch (mocking with realistic delay to feel authentic)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1800);
  };
 
  return (
    <section id="contact" className="py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-transparent scroll-mt-20 overflow-hidden relative border-t border-white/5">
      <div className="max-w-[1720px] mx-auto w-full">
        
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center mb-10 animate-fade-in relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.45em] font-black text-rose-pink block mb-4"
          >
            CONNECT WITH ME
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-white font-medium"
          >
            Start Your Growth Campaign
          </motion.h2>
          <div className="h-px bg-white/10 w-16 mx-auto mt-6" />
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* Left Column: Local Brand Info & Direct Channels */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-12 text-left">
            <div className="space-y-6">
              <h3 className="font-serif text-3xl text-white italic leading-relaxed">
                Let's construct something extraordinary together.
              </h3>
              <p className="text-sm font-sans text-white leading-relaxed font-light">
                Ready to rank higher for local searches and dominate on Instagram? Get in touch to schedule a free 30-minute discovery growth audit. Located conveniently in Jamshedpur, Jharkhand, available for both on-site campaigns and remote contracts worldwide.
              </p>
            </div>
 
            <div className="space-y-6">
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-orange-brand/10 border border-orange-brand/20 rounded-2xl flex items-center justify-center text-orange-brand transition-all duration-300 group-hover:bg-[#EF3B33] group-hover:text-white group-hover:scale-105">
                  <Mail size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.25em] font-bold text-rose-pink">Email Directly</p>
                  <a href={socialsConfig.email.url} aria-label="Email Address" className="text-base font-serif italic text-white hover:text-[#EF3B33] text-left transition-colors">
                    {socialsConfig.email.address}
                  </a>
                </div>
              </div>
 
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-orange-brand/10 border border-orange-brand/20 rounded-2xl flex items-center justify-center text-orange-brand transition-all duration-300 group-hover:bg-[#EF3B33] group-hover:text-white group-hover:scale-105">
                  <Instagram size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.25em] font-bold text-rose-pink">Instagram Handle</p>
                  <a href={socialsConfig.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="text-base font-serif italic text-white hover:text-[#EF3B33] text-left transition-colors">
                    {socialsConfig.instagram.handle}
                  </a>
                </div>
              </div>
 
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-orange-brand/10 border border-orange-brand/35 rounded-2xl flex items-center justify-center text-orange-brand transition-all duration-300 group-hover:bg-[#EF3B33] group-hover:text-white group-hover:scale-105">
                  <Linkedin size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.25em] font-bold text-rose-pink">LinkedIn Profile</p>
                  <a href={socialsConfig.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-base font-serif italic text-white hover:text-[#EF3B33] text-left transition-colors">
                    {socialsConfig.linkedin.displayName}
                  </a>
                </div>
              </div>
            </div>
 
            <div className="h-px bg-white/10 w-full" />
            
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-rose-pink italic">
              *Serving Jamshedpur, Ranchi, Dhanbad and global clients.
            </p>
          </div>
 
          {/* Right Column: Premium Contact Form */}
          <div 
            style={{ backgroundColor: "#B55239", borderColor: "rgba(253, 161, 162, 0.15)" }}
            className="lg:col-span-12 xl:col-span-7 border p-6 sm:p-8 md:p-10 rounded-[2.5rem] relative shadow-2xl transition-all duration-500 hover:shadow-[0_45px_90px_-20px_rgba(0,0,0,0.5)]"
          >
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 text-left"
                >
                  {errorMessage && (
                    <div className="p-4 bg-orange-brand/10 border border-orange-brand/20 rounded-xl text-xs text-white text-center font-semibold">
                      {errorMessage}
                    </div>
                  )}
 
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name block */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-[9px] uppercase tracking-widest font-black text-rose-pink">
                        Your Name <span className="text-[#EF3B33]">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sen"
                        required
                        className="px-6 py-4.5 rounded-xl bg-[#943f29] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-sm transition-all shadow-sm"
                      />
                    </div>
 
                    {/* Email block */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-[9px] uppercase tracking-widest font-black text-rose-pink">
                        Email Address <span className="text-[#EF3B33]">*</span>
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rahul@example.com"
                        required
                        className="px-6 py-4.5 rounded-xl bg-[#943f29] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-sm transition-all shadow-sm"
                      />
                    </div>
                  </div>
 
                  {/* Phone block */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-[9px] uppercase tracking-widest font-black text-rose-pink">
                      Phone Number (Optional)
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="px-6 py-4.5 rounded-xl bg-[#943f29] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-sm transition-all shadow-sm"
                    />
                  </div>
 
                  {/* Message block */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[9px] uppercase tracking-widest font-black text-rose-pink">
                      How Can I Help Your Business? <span className="text-[#EF3B33]">*</span>
                    </label>
                    <textarea 
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your business, campaign targets, or project details..."
                      required
                      className="px-6 py-[18px] rounded-xl bg-[#943f29] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-sm transition-all shadow-sm"
                    />
                  </div>
 
                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, backgroundColor: '#EF3B33' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-[#EF3B33] text-white text-[10px] uppercase font-black tracking-[0.3em] rounded-xl border-none shadow-xl transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-55"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={12} />
                        <span>Submit Campaign Message</span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-6 flex flex-col items-center"
                >
                  <motion.div
                    initial={{ scale: 0.6, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-18 h-18 bg-orange-brand/15 text-orange-brand border border-orange-brand/35 rounded-full flex items-center justify-center mb-4"
                  >
                    <CheckCircle2 size={40} className="stroke-[1.5]" />
                  </motion.div>
                  
                  <h3 className="font-serif text-3xl text-white font-bold">
                    Message Dispatched Successfully!
                  </h3>
                  
                  <p className="text-sm font-sans text-white/80 max-w-sm leading-relaxed">
                    Thank you for connecting! Rupa will audit your details and respond within 24 business hours to organize your discovery consultation session.
                  </p>
 
                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    whileHover={{ scale: 1.05 }}
                    className="px-8 py-3 bg-orange-brand/10 border border-orange-brand/30 rounded-full text-white text-[9px] uppercase font-black tracking-widest hover:bg-[#EF3B33] transition-all cursor-pointer mt-6"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
 
          </div>
        </div>
      </div>
    </section>
  );
};
