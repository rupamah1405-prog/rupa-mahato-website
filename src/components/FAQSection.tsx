import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: "What services do you offer?",
    answer: "I offer digital marketing, social media management, content writing, SEO, video editing and creative content strategy."
  },
  {
    id: 2,
    question: "What kind of content do you create?",
    answer: "I create reels, static posts, carousels, social media copy, campaign content and short-form video content."
  },
  {
    id: 3,
    question: "Do you provide video editing separately?",
    answer: "Yes. Video editing can be taken as a separate service, including reels, short-form videos, transitions, pacing, hooks and visual storytelling."
  },
  {
    id: 4,
    question: "Can you manage social media accounts?",
    answer: "Yes. I can assist with content planning, posting, captions, creative direction and overall social media management."
  },
  {
    id: 5,
    question: "Do you work with brands and businesses?",
    answer: "Yes. I work on content and digital marketing projects for brands, businesses and social media pages."
  },
  {
    id: 6,
    question: "How do you start a new project?",
    answer: "I first understand the brand, its goals and target audience, then plan the content and execution according to the project's requirements."
  },
  {
    id: 7,
    question: "How can I work with you?",
    answer: "You can get in touch through the Contact section and share your project requirements. I will get back to you to discuss the details."
  }
];

export const FAQSection = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleFAQ = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section 
      id="qa" 
      className="py-24 px-4 sm:px-6 md:px-8 lg:px-10 bg-transparent scroll-mt-20 relative border-t border-white/5"
      aria-labelledby="qa-heading"
    >
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#EF3B33]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto w-full z-10 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <HelpCircle size={14} className="text-[#FDA1A2]" />
            <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.25em] font-bold text-[#FDA1A2]">
              Q&amp;A
            </span>
          </motion.div>
          
          <motion.h2 
            id="qa-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-normal tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/70 font-sans text-sm sm:text-base mt-3 max-w-xl mx-auto font-light"
          >
            A few things you might want to know before we work together.
          </motion.p>
          
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#EF3B33]/50 to-transparent w-40 mx-auto mt-6" />
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4 text-left">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#1D1842]/90 border-[#EF3B33]/40 shadow-[0_10px_30px_-10px_rgba(239,59,51,0.25)]'
                    : 'bg-[#0F0B26]/60 hover:bg-[#1D1842]/50 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  className="w-full py-5 px-6 sm:px-7 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none transition-colors duration-200"
                >
                  <span className={`text-base sm:text-lg font-medium font-sans pr-2 transition-colors duration-200 ${
                    isOpen ? 'text-[#FDA1A2]' : 'text-white'
                  }`}>
                    {item.question}
                  </span>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isOpen 
                      ? 'bg-[#EF3B33] text-white rotate-180 shadow-[0_0_15px_rgba(239,59,51,0.5)]' 
                      : 'bg-white/5 border border-white/10 text-white/70 hover:text-white'
                  }`}>
                    {isOpen ? <Minus size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-6 pt-1 text-white/80 font-sans text-sm sm:text-base leading-relaxed font-light border-t border-white/5">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <p className="text-white/60 text-xs sm:text-sm font-sans mb-4">
            Have a question that isn't answered here?
          </p>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) {
                const navOffset = 80;
                const targetY = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
                window.scrollTo({ top: targetY, behavior: 'smooth' });
              } else {
                navigate('/contact');
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-[#EF3B33] border border-white/15 hover:border-[#EF3B33] text-white text-xs uppercase font-black tracking-widest rounded-full transition-all duration-300 cursor-pointer shadow-md"
          >
            <MessageSquare size={14} />
            <span>Ask a Question</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
