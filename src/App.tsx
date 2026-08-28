import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'motion/react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import { KoiPond } from './components/KoiPond';
import { ContactForm } from './components/ContactForm';
import { RMLogo } from './components/RMLogo';
import { BlogManager } from './components/BlogManager';
import { 
  FeaturedServices, 
  FeaturedWork, 
  WhyWorkWithMe, 
  ToolsIUse, 
  LatestInsights, 
  FinalCTA 
} from './components/HomeSections';
import { socialsConfig } from './config/socials';
import { 
  Instagram, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  Palette, 
  Camera, 
  MessageSquare, 
  TrendingUp,
  Layout,
  ExternalLink,
  ChevronDown,
  X,
  Menu,
  Play,
  Award,
  Globe,
  Clock,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Settings,
  AlertCircle,
  ArrowLeft,
  Check
} from 'lucide-react';

// --- Global Data Constants ---
const CAPABILITY_TAGS = [
  "Social Media Strategy",
  "Content Strategy",
  "SEO Optimization",
  "Google Ads Management",
  "Meta Ads Campaigns",
  "Instagram Growth Marketing",
  "Performance Marketing",
  "Analytics & Reporting",
  "Conversion Optimization",
  "Audience Targeting"
];

const EXPERIENCE_SUMMARY = [
  { role: "Social Media Strategist", project: "Yours Digitally campaigns" },
  { role: "Content & Bio Specialist", project: "Local Brand Growth" }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Work', path: '/work' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 pt-4 md:pt-6 px-4 md:px-8 w-full pointer-events-none"
      >
        <div 
          className={`max-w-[1720px] mx-auto w-full rounded-full border transition-all duration-500 flex items-center justify-between px-6 md:px-8 pointer-events-auto h-[70px] md:h-[80px] shadow-lg ${
            isScrolled || isMenuOpen 
              ? 'bg-[#1D1842]/90 backdrop-blur-md shadow-2xl border-white/20' 
              : 'bg-[#1D1842]/40 backdrop-blur-sm border-white/10'
          }`}
        >
          {/* Brand/Logo on the left */}
          <div 
            onClick={() => {
              navigate('/');
            }}
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <RMLogo />
            <span className="text-xs font-sans font-black uppercase tracking-[0.380em] text-white transition-all duration-500 ease-in-out group-hover:text-[#EF3B33]">
              Rupa Mahato
            </span>
          </div>
          
          {/* Center Navigation Capsule */}
          <div className="hidden lg:flex items-center bg-black/20 backdrop-blur-sm border border-white/5 rounded-[12px] p-1 gap-2.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <div
                  key={link.name}
                  onClick={() => {
                    navigate(link.path);
                  }}
                  className={`text-[9px] uppercase font-bold tracking-[0.2em] w-28 h-10 flex items-center justify-center rounded-[8px] transition-all duration-300 ease-in-out select-none cursor-pointer ${
                    isActive 
                      ? 'bg-[#ff6b35] text-white shadow-[0_0_20px_rgba(255,107,53,0.5)] border border-[#ff6b35] hover:scale-105 hover:shadow-[0_0_25px_rgba(255,107,53,0.6)]' 
                      : 'bg-[#0F0B26]/60 backdrop-blur-md border border-[#ff6b35]/25 text-white/70 hover:bg-gradient-to-r hover:from-[#ff6b35] hover:to-[#EF3B33] hover:text-white hover:scale-105 hover:shadow-[0_0_15px_rgba(255,107,53,0.35)] hover:border-[#ff6b35]'
                  }`}
                >
                  <span>{link.name}</span>
                </div>
              );
            })}
          </div>

          {/* Right CTA Button (Desktop) */}
          <div className="hidden lg:block flex-shrink-0">
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(239, 59, 51, 0.45)"
              }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 bg-[#EF3B33] text-white uppercase text-[9px] font-black tracking-widest rounded-full hover:bg-[#D9352F] transition-all duration-300 text-center cursor-pointer font-sans border-none shadow-[0_5px_15px_rgba(239,59,51,0.2)]"
            >
              Get In Touch
            </motion.button>
          </div>

          {/* Mobile Hamburg Toggle Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2.5 z-[60] bg-black/20 hover:bg-black/40 border border-white/5 hover:border-white/10 rounded-full transition-all focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[55] bg-[#1D1842] flex flex-col items-center justify-between p-8 pt-28 lg:hidden"
          >
            {/* Background blur/particles decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#EF3B33]/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FDA1A2]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="flex flex-col gap-6 text-center w-full z-10 my-auto">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setTimeout(() => {
                        navigate(link.path);
                      }, 250);
                    }}
                    className={`text-2xl font-serif italic transition-all duration-300 relative inline-block mx-auto cursor-pointer ${
                      isActive ? 'text-[#EF3B33] font-bold' : 'text-white hover:text-[#EF3B33]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-2 right-2 h-0.5 bg-[#EF3B33] rounded-full" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Contact Button & Socials at Bottom */}
            <div className="w-full max-w-xs flex flex-col items-center gap-8 z-10 mb-8">
              <motion.button
                onClick={() => {
                  setIsMenuOpen(false);
                  setTimeout(() => {
                    navigate('/contact');
                  }, 250);
                }}
                className="w-full py-4 bg-[#EF3B33] text-white uppercase text-[10px] font-black tracking-widest rounded-full hover:bg-[#D9352F] transition-all duration-300 text-center border-none cursor-pointer"
              >
                Get In Touch
              </motion.button>
              
              <div className="flex gap-6">
                {[
                  { icon: Instagram, href: socialsConfig.instagram.url, label: "Instagram Profile" },
                  { icon: Linkedin, href: socialsConfig.linkedin.url, label: "LinkedIn Profile" },
                  { icon: Mail, href: socialsConfig.email.url, label: "Email Address" }
                ].map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    aria-label={link.label}
                    className="text-white/60 hover:text-[#EF3B33] transition-colors"
                  >
                    <link.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full bg-transparent" id="hero">
      {/* Dynamic Grid Background Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(253,161,162,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(253,161,162,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />
      
      {/* Cinematic soft glow leak */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[60%] h-[60%] bg-rose-pink/[0.035] rounded-full blur-[140px] pointer-events-none" />
      
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden px-4">
        <h2 className="text-[13vw] md:text-[8vw] font-serif font-light tracking-[0.2em] uppercase text-center leading-[1.05] select-none bg-gradient-to-b from-neutral-300/14 via-neutral-300/10 to-transparent bg-clip-text text-transparent max-w-full">
          Content <br className="sm:hidden" /> Strategist
        </h2>
      </div>

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 lg:pt-44 z-10 w-full animate-fade-in">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Main Typography Statement Column */}
          <div className="lg:col-span-7 space-y-10 text-left">
            {/* Top Badge / Announcement Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 pb-2"
            >
              <div className="w-8 h-[1px] bg-rose-pink/30" />
              <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.35em] font-black text-rose-pink">
                SOCIAL MEDIA MANAGER & CONTENT STRATEGIST
              </span>
            </motion.div>
 
            {/* Typography Stack with Beautiful Spacing */}
            <div className="cursor-default space-y-6">
              {/* Rupa Mahato Name - Scaled down visual scale (20-30% smaller, elegant serif accent) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="pb-1"
              >
                <span className="font-serif italic text-4xl sm:text-5xl lg:text-[4.2vw] text-white/50 block leading-none font-medium">
                  Rupa Mahato
                </span>
              </motion.div>
              
              {/* Main Professional Title - Primary eye-catching layout focus */}
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl sm:text-5xl lg:text-[3.2vw] tracking-tight font-sans uppercase font-black text-white block leading-[1.12]"
              >
                Social Media Manager & <br className="hidden sm:inline" />Content Strategist <span className="text-[#EF3B33]">in Jamshedpur</span>
              </motion.h1>
            </div>
 
            {/* Subheading / Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/80 font-sans text-sm sm:text-base leading-relaxed max-w-xl text-left font-light pt-2"
            >
              Helping brands grow through content strategy, Instagram marketing, SEO, Meta Ads, analytics, and performance-driven social media management.
            </motion.p>
 
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-5 pb-4"
            >
              <motion.button
                onClick={() => navigate('/work')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-[#EF3B33] text-white uppercase text-[9px] font-black tracking-widest rounded-full hover:bg-[#D9352F] hover:shadow-[0_20px_40px_-5px_rgba(239,59,51,0.35)] transition-all duration-300 text-center cursor-pointer font-sans border-none"
              >
                View My Work
              </motion.button>
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-white/5 backdrop-blur-sm border border-white/10 text-white uppercase text-[9px] font-black tracking-widest rounded-full hover:bg-white/10 hover:border-[#EF3B33] hover:shadow-[0_20px_40px_-10px_rgba(239,59,51,0.1)] transition-all duration-300 text-center cursor-pointer font-sans"
              >
                Hire Me
              </motion.button>
            </motion.div>
          </div>
 
          {/* Right Column: Dynamic Info-Rich Orange Cards Grid */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Philosophy Card - Repositioned from About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ backgroundColor: "#B55239", borderColor: "rgba(253, 161, 162, 0.15)" }}
              className="p-5 sm:p-6 md:p-7 border rounded-3xl shadow-[0_20px_45px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden group text-left"
            >
              <span className="text-[9px] uppercase tracking-widest font-black text-[#FDA1A2] block mb-3 font-sans">
                PHILOSOPHY
              </span>
              <h3 className="font-serif text-xl md:text-2xl text-white mb-3 italic font-medium leading-normal">
                "Content is the bridge; conversion is the destination."
              </h3>
              <p className="text-xs font-sans text-white/80 leading-relaxed font-light">
                Every copy written, reels outlined, and campaign launched is precisely sequenced to attract high-intent leads and build lasting brand equity.
              </p>
              
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            </motion.div>
 
            {/* Side-by-Side Dynamic Subgrid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* 100% Organic Strategy Card - Repositioned from About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{ backgroundColor: "#B55239", borderColor: "rgba(253, 161, 162, 0.15)" }}
                className="p-5 sm:p-6 md:p-6 py-6 border rounded-3xl text-left relative overflow-hidden shadow-[0_20px_45px_-12px_rgba(0,0,0,0.5)] flex flex-col justify-center min-h-0 group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="text-4xl font-serif text-[#FDA1A2] font-black mb-1.5">100%</div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-white/90 font-sans leading-tight">Organic Content Strategy</p>
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
              </motion.div>

              {/* Selected Work Summary Focus Cards Stack - Repositioned from About */}
              <div className="space-y-4 flex flex-col justify-between">
                {EXPERIENCE_SUMMARY.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1, duration: 1 }}
                    whileHover={{ 
                      y: -2,
                      backgroundColor: "#c25e45",
                      boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.4)"
                    }}
                    style={{ backgroundColor: "#B55239", borderColor: "rgba(253, 161, 162, 0.15)" }}
                    className="p-4 rounded-2xl border text-white flex items-center gap-3 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] transition-all duration-300 text-left flex-1 cursor-default"
                  >
                    <div className="w-2 h-2 rounded-full bg-white shrink-0" />
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-white leading-none font-sans">{exp.role}</h4>
                      <p className="text-[10px] text-white/85 mt-2 font-sans font-light leading-snug">{exp.project}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Capability Tags Row at the bottom of Home Section - Repositioned from About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1.2 }}
          className="mt-16 pt-10 border-t border-white/5 text-left"
        >
          <span className="block text-[9px] uppercase tracking-[0.3em] font-black text-rose-pink mb-4 font-sans">
            CORE CAPABILITIES & EXPERTISE
          </span>
          <div className="flex flex-wrap gap-2.5">
            {CAPABILITY_TAGS.map((tag, idx) => (
              <motion.span 
                key={idx} 
                whileHover={{ scale: 1.05, borderColor: "rgba(239, 59, 51, 0.4)", backgroundColor: "rgba(181, 82, 57, 0.15)" }}
                className="px-4 py-2 bg-rose-pink/5 border border-rose-pink/20 text-[10px] uppercase tracking-wider font-bold text-rose-pink rounded-xl transition-all duration-300 select-none font-sans cursor-default hover:text-white"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
      
      {/* Decorative concentric orbits in background */}
      <div className="absolute w-[800px] h-[800px] border border-rose-pink/[0.015] rounded-full pointer-events-none -right-16 -bottom-16" />
      <div className="absolute w-[1100px] h-[1100px] border border-rose-pink/[0.012] rounded-full border-dashed pointer-events-none -right-32 -bottom-32 animate-spin-slow" />
    </section>
  );
};

const SectionHeader = ({ title, subtitle, align = 'center' }: { title: string; subtitle: string; align?: 'left' | 'center' }) => (
  <div className={`mb-12 md:mb-14 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <motion.span 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="text-[10px] uppercase tracking-[0.5em] font-bold text-rose-pink block mb-4"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-6xl font-serif text-white font-medium"
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 100 }}
      className={`h-px bg-white mt-6 opacity-20 ${align === 'center' ? 'mx-auto' : ''}`} 
    />
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-transparent overflow-hidden scroll-mt-20 relative border-t border-white/5">
      <div className="max-w-[1720px] mx-auto w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Side: Profile Image - Clean & Completely Static with Refined Frames */}
          <div className="lg:col-span-5 flex justify-center relative min-h-0 py-8 lg:py-0 items-center">
            
            {/* Ambient visual decorations */}
            <div className="absolute w-[280px] h-[280px] border border-white/[0.03] rounded-full pointer-events-none" />
            <div className="absolute w-[320px] h-[320px] border border-white/[0.02] border-dashed rounded-full pointer-events-none animate-spin-slow" />
            
            {/* Static Premium Container */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative flex items-center justify-center p-8 w-full h-full"
            >
              <div className="relative">
                {/* Subtle static bottom-left backdrop glow to enrich composition, no move/hover */}
                <div className="absolute -inset-4 rounded-[2.8rem] bg-rose-pink/5 blur-2xl pointer-events-none" />

                {/* Portrait Container - exactly original image dimension and path */}
                <div className="relative w-[240px] sm:w-[280px] lg:w-[350px] xl:w-[380px] aspect-[4/5] rounded-[2.5rem] border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src="https://i.ibb.co/v4r0Tk0y/Chat-GPT-Image-Jun-22-2026-03-48-53-PM.png"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none pointer-events-none object-[center_35%]"
                      alt="Rupa Mahato - Social Media Manager & Content Strategist"
                      loading="lazy"
                    />
                  </div>

                  {/* Refined clean dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1D1842]/20 via-transparent to-white/[0.04] pointer-events-none" />
                </div>

                {/* Stationary decorative premium branding tag */}
                <div className="absolute -bottom-2 -left-2 bg-[#171335]/95 border border-white/10 px-4 py-2 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.6)] pointer-events-none">
                  <span className="text-[7px] font-sans font-black tracking-[0.3em] text-rose-pink">STRATEGY • PERFORMANCE</span>
                </div>

                {/* Classic visual camera crosshair accents */}
                <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t border-l border-white/20 rounded-tl" />
                <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b border-r border-white/20 rounded-br" />
              </div>
            </motion.div>

          </div>

          {/* Right Column: About content, biography, introduction, with elegant frames */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.8, y: 0 }}
                viewport={{ once: true }}
                className="text-[10px] uppercase tracking-[0.45em] font-black text-rose-pink block mb-3"
              >
                ABOUT PREVIEW
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight font-medium">
                Who Is Rupa Mahato?
              </h2>
              <div className="h-px bg-white/10 w-16 mt-6" />
            </div>

            {/* Main Bio Context */}
            <div className="font-sans text-white/95 text-base sm:text-lg leading-relaxed text-left space-y-6">
              <p className="font-light">
                I’m <strong className="font-bold text-rose-pink">Rupa Mahato</strong>, a <strong className="font-semibold text-rose-pink">Social Media Manager</strong> and <strong className="font-semibold text-rose-pink">Content Strategist</strong> based in <strong className="font-semibold text-rose-pink">Jamshedpur</strong>. I help businesses grow through SEO, Google Ads, Meta Ads, Instagram Marketing, content strategy, performance marketing, and data-driven digital campaigns. My focus is on building strong brand visibility, increasing engagement, generating quality leads, and driving measurable business growth.
              </p>
              <p className="font-light text-sm text-white/80 leading-relaxed">
                As a dedicated <strong className="font-medium text-white">Google Ads Expert</strong>, <strong className="font-medium text-white">SEO Specialist</strong>, and <strong className="font-medium text-white">Digital Marketing</strong> consultant, I deliver comprehensive <strong className="font-medium text-white">Google Ads Management</strong> and analytics-driven social media management. By combining organic storytelling with systematic performance marketing, I streamline your brand's narrative in Jamshedpur to convert passive impressions into loyal community brand equity and direct business conversions.
              </p>
            </div>

            {/* Minimal High-Contrast Core Capabilities Grid - Replaces old Orange Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div className="border-l-2 border-rose-pink/30 pl-4 space-y-1">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#FDA1A2] font-sans">Organic Strategy</h4>
                <p className="text-xs text-white/70 leading-relaxed font-light">Custom feed planning, aesthetic asset alignment, and daily story outlines.</p>
              </div>
              <div className="border-l-2 border-rose-pink/30 pl-4 space-y-1">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#FDA1A2] font-sans">Performance SEO</h4>
                <p className="text-xs text-white/70 leading-relaxed font-light">Targeted metadata keyword strategies to capture local Jamshedpur search dominance.</p>
              </div>
              <div className="border-l-2 border-rose-pink/30 pl-4 space-y-1">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#FDA1A2] font-sans">Google & Meta Ads</h4>
                <p className="text-xs text-white/70 leading-relaxed font-light">High-performing search campaigns and paid funnels optimized for lead generation and conversion tracking.</p>
              </div>
              <div className="border-l-2 border-rose-pink/30 pl-4 space-y-1">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#FDA1A2] font-sans">Data & Reporting</h4>
                <p className="text-xs text-white/70 leading-relaxed font-light">In-depth performance reporting and channel analytics tracking to scale high-performing campaigns.</p>
              </div>
            </div>

            {/* Added: Quick Social Links Accent */}
            <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-t border-white/10">
              <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
                <span className="text-[10px] tracking-wider text-white/50 font-bold uppercase font-sans">Connect with me:</span>
                <div className="flex gap-4">
                  {[
                    { icon: Instagram, url: socialsConfig.instagram.url, label: "Instagram" },
                    { icon: Linkedin, url: socialsConfig.linkedin.url, label: "LinkedIn" },
                    { icon: Mail, url: socialsConfig.email.url, label: "Email" }
                  ].map((sco, idx) => (
                    <motion.a
                      key={idx}
                      href={sco.url}
                      target={sco.url.startsWith('mailto') ? '_self' : '_blank'}
                      rel={sco.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      whileHover={{ scale: 1.15, y: -2, color: "#EF3B33" }}
                      title={sco.label}
                      aria-label={sco.label}
                      className="text-white/60 hover:text-white transition-all duration-300"
                    >
                      <sco.icon size={18} strokeWidth={2} />
                    </motion.a>
                  ))}
                </div>
              </div>
              <p className="text-[10px] font-sans text-rose-pink uppercase tracking-widest font-bold">
                *Active in Jharkhand & Global
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

const Results = () => {
  const stats = [
    { value: "50+", label: "Creatives Designed" },
    { value: "20+", label: "Reels Planned" },
    { value: "10+", label: "Campaign Concepts" },
    { value: "100%", label: "Creative Focus" },
  ];

  return (
    <section className="py-14 px-4 sm:px-6 md:px-8 lg:px-10 bg-transparent overflow-hidden relative border-t border-white/5">
      <div className="max-w-[1720px] mx-auto w-full relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.45em] font-black text-rose-pink block mb-4"
          >
            PERFORMANCE & METRICS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-white font-medium leading-tight"
          >
            Key Campaign Results
          </motion.h2>
          <div className="h-px bg-white/10 w-24 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ backgroundColor: "#B55239", borderColor: "rgba(253, 161, 162, 0.15)" }}
              className="relative p-6 md:p-8 py-10 md:py-12 text-center border rounded-[2.5rem] hover:bg-[#c25e45] hover:border-white/30 transition-all duration-500 group overflow-hidden cursor-default shadow-[0_15px_35px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
            >
              {/* Corner accent glow */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-rose-pink/[0.04] rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <span className="block text-4xl md:text-5xl font-serif text-white font-black mb-3 select-none">
                {stat.value}
              </span>
              
              <div className="h-px bg-white/10 w-8 mx-auto mb-3 group-hover:w-16 transition-all duration-500" />
              
              <span className="block text-[10px] md:text-xs uppercase tracking-[0.25em] font-black text-rose-pink select-none leading-relaxed">
                {stat.label}
              </span>

              {/* Scanning visual overlay */}
              <motion.div 
                className="absolute inset-x-0 top-0 h-[1.5px] bg-white/20 z-10 opacity-0 group-hover:opacity-100"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SelectedWork = () => {
  const navigate = useNavigate();
  const projects = [
    {
      title: "SEO Growth Strategy",
      badge: "Organic Traffic",
      desc: "Comprehensive keyword research, content mapping, and organic visibility optimization designed to improve search rankings.",
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      link: "#contact",
      tags: ["Keyword Mapping", "Technical SEO", "On-Page Audits", "Authority Building"]
    },
    {
      title: "Instagram Growth Framework",
      badge: "Social Systems",
      desc: "Audience growth, profile optimization, engagement systems, and content strategy for long-term brand visibility.",
      coverImage: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800",
      link: "#contact",
      tags: ["Reels Distribution", "Bio Strategy", "Engagement Funnels", "Profile Overhaul"]
    },
    {
      title: "Meta Ads Campaign",
      badge: "Paid Acquisition",
      desc: "Strategic advertising campaigns focused on audience targeting, creative testing, and conversion optimization.",
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      link: "#contact",
      tags: ["Creative Testing", "Custom Audiences", "Funnel Setups", "ROI Engineering"]
    },
    {
      title: "Google Ads Performance Marketing",
      badge: "GOOGLE ADS",
      desc: "Strategic Google Ads campaigns focused on lead generation, conversion optimization, keyword targeting, audience segmentation, and measurable business growth.",
      coverImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800",
      link: "#contact",
      tags: ["KEYWORD TARGETING", "SEARCH ADS", "CONVERSION TRACKING"]
    }
  ];

  return (
    <section id="selected-work" className="py-24 px-4 sm:px-6 md:px-8 lg:px-10 bg-transparent scroll-mt-20 relative border-t border-white/5">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff6b35]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1720px] mx-auto w-full z-10 relative">
        <div className="text-center mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.45em] font-black text-[#ff6b35] block mb-3"
          >
            FEATURED CASE STUDIES
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-serif text-white font-medium tracking-tight"
          >
            Marketing Growth Projects
          </motion.h2>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#ff6b35]/50 to-transparent w-40 mx-auto mt-6" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {projects.map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px -15px rgba(255, 107, 53, 0.35)",
                borderColor: "#ff6b35"
              }}
              className="group relative flex flex-col justify-between h-full bg-[#0F0B26]/40 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:bg-[#0F0B26]/60 p-6 sm:p-8"
            >
              <div>
                {/* Thumbnail Container with Gradient Overlay */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 mb-6 bg-black/20">
                  <motion.img 
                    src={project.coverImage} 
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Premium Soft Orange/Red Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0B26]/90 via-[#ff6b35]/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  {/* Elegant Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#1D1842]/80 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-[#FDA1A2]">{project.badge}</span>
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="text-2xl font-serif text-white mb-3 font-medium tracking-tight">
                  {project.title}
                </h3>
                
                <p className="text-sm text-white/70 leading-relaxed font-light mb-6 min-h-[60px]">
                  {project.desc}
                </p>

                {/* Tags/Capabilities Grid */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, ti) => (
                    <span 
                      key={ti} 
                      className="text-[9px] uppercase tracking-wider font-semibold text-white/40 bg-white/[0.02] border border-white/5 rounded-md px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Case Study Button */}
              <motion.button 
                onClick={() => {
                  navigate('/contact');
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#ff6b35]/10 text-white hover:bg-[#ff6b35] border border-[#ff6b35]/30 hover:border-[#ff6b35] px-5 py-3.5 text-[9px] uppercase font-black tracking-[0.25em] flex items-center justify-center gap-2 rounded-xl transition-all duration-300 font-sans cursor-pointer mt-auto"
              >
                VIEW CASE STUDY <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "< $1,000",
    details: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    {
      title: "Social Media Management",
      desc: "Build a consistent and engaging presence across social platforms with content that connects and converts.",
      bullets: [
        "Content Planning",
        "Post Scheduling",
        "Community Management",
        "Monthly Reporting"
      ]
    },
    {
      title: "Content Strategy",
      desc: "A data-driven content approach focused on audience growth, engagement, and brand authority.",
      bullets: [
        "Content Calendar",
        "Audience Research",
        "Competitor Analysis",
        "Growth Strategy"
      ]
    },
    {
      title: "Google Ads Management",
      desc: "Performance-focused advertising campaigns designed to generate quality leads and maximize ROI.",
      bullets: [
        "Campaign Setup",
        "Keyword Research",
        "Ad Optimization",
        "Performance Tracking"
      ]
    },
    {
      title: "SEO Content Writing",
      desc: "Search-optimized content that improves rankings, visibility, and organic traffic.",
      bullets: [
        "Blog Writing",
        "SEO Optimization",
        "Keyword Research",
        "Content Planning"
      ]
    }
  ];

  const handleOpenModal = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setFormData({
      name: "",
      email: "",
      company: "",
      budget: "< $1,000",
      details: ""
    });
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionDate = new Date().toLocaleString();
    const payload = {
      access_key: (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE",
      subject: `New Lead: ${selectedService} Inquiry`,
      from_name: "Portfolio Services",
      name: formData.name,
      email: formData.email,
      company: formData.company || "N/A",
      service_selected: selectedService,
      budget_range: formData.budget,
      project_details: formData.details || "No details provided",
      submission_time: submissionDate
    };

    // Lead tracking: local persistence
    try {
      const existingLeads = JSON.parse(localStorage.getItem("tracked_portfolio_leads") || "[]");
      existingLeads.push({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        service: selectedService,
        budget: formData.budget,
        details: formData.details,
        date: submissionDate
      });
      localStorage.setItem("tracked_portfolio_leads", JSON.stringify(existingLeads));
    } catch (err) {
      console.error("Local storage tracking failed:", err);
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      console.log("Web3Forms response:", result);
    } catch (err) {
      console.warn("API submission failed but success state is simulated locally:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <section id="services" className="py-24 px-4 sm:px-6 md:px-8 lg:px-10 bg-transparent relative border-t border-white/5 z-10 text-white overflow-hidden">
      {/* Dynamic Grid Background Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(253,161,162,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(253,161,162,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      {/* Cinematic soft glow leaks */}
      <div className="absolute top-1/4 left-1/4 w-[35%] h-[35%] bg-rose-pink/[0.025] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35%] h-[35%] bg-[#EF3B33]/[0.02] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.45em] font-black text-rose-pink block mb-3"
          >
            SERVICES & SOLUTIONS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-serif text-white font-medium tracking-tight"
          >
            How I Can Help Your Brand Grow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-sm sm:text-base font-sans text-white/80 max-w-2xl mx-auto mt-4 font-light leading-relaxed"
          >
            Strategic marketing solutions designed to increase visibility, engagement, and business growth.
          </motion.p>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-orange-brand/50 to-transparent w-40 mx-auto mt-6" />
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px -15px rgba(239, 59, 51, 0.25)",
                borderColor: "rgba(239, 59, 51, 0.4)"
              }}
              className="group relative flex flex-col justify-between bg-blackcurrant/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 sm:p-8 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.15)] h-full"
            >
              <div>
                {/* Visual Accent Top Line on Hover */}
                <div className="absolute inset-x-0 top-0 h-1 bg-[#EF3B33] rounded-t-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Title */}
                <h3 className="text-xl font-serif font-medium text-white mb-4 tracking-tight group-hover:text-rose-pink transition-colors duration-300">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-xs sm:text-sm text-white/70 font-sans font-light leading-relaxed mb-6">
                  {service.desc}
                </p>
                
                <div className="h-px bg-white/10 w-full mb-6" />

                {/* Bullets Checklist */}
                <ul className="space-y-3.5">
                  {service.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/80 font-light">
                      <span className="text-[#EF3B33] font-semibold shrink-0 text-base leading-none">✓</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#EF3B33" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOpenModal(service.title)}
                className="w-full mt-8 py-3.5 bg-[#EF3B33]/10 text-white hover:bg-[#EF3B33] border border-[#EF3B33]/20 hover:border-[#EF3B33] text-[10px] uppercase font-black tracking-[0.25em] rounded-xl transition-all duration-300 cursor-pointer text-center font-sans hover:shadow-[0_10px_20px_rgba(239,59,51,0.2)]"
              >
                Hire Me
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Premium Popup Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-[#0F0B26]/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-[#1D1842] text-white rounded-[2rem] shadow-2xl max-w-lg w-full overflow-hidden border border-white/10 z-10 p-6 sm:p-8"
            >
              {/* Close Button */}
              <button 
                onClick={handleCloseModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer border-none"
              >
                <X size={16} />
              </button>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl font-serif font-medium text-white tracking-tight">
                      Let's Discuss Your Project
                    </h3>
                    <p className="text-xs text-white/70 font-sans font-light mt-1.5 leading-relaxed">
                      Fill out the form below and I'll get back to you within 24 hours.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-white/60 block mb-1.5">
                        Full Name <span className="text-[#EF3B33]">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#EF3B33] focus:ring-1 focus:ring-[#EF3B33] transition-all"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-white/60 block mb-1.5">
                        Email Address <span className="text-[#EF3B33]">*</span>
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Your email address"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#EF3B33] focus:ring-1 focus:ring-[#EF3B33] transition-all"
                      />
                    </div>

                    {/* Company / Brand Name */}
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-white/60 block mb-1.5">
                        Company / Brand Name
                      </label>
                      <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company or brand name"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#EF3B33] focus:ring-1 focus:ring-[#EF3B33] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Service Dropdown */}
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-white/60 block mb-1.5">
                          Service Selected
                        </label>
                        <select 
                          name="service"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full px-4 py-3 bg-[#110D2C] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#EF3B33] focus:ring-1 focus:ring-[#EF3B33] transition-all cursor-pointer"
                        >
                          {services.map((s, idx) => (
                            <option key={idx} value={s.title} className="bg-[#1D1842]">{s.title}</option>
                          ))}
                        </select>
                      </div>

                      {/* Budget Dropdown */}
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-white/60 block mb-1.5">
                          Budget Range
                        </label>
                        <select 
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[#110D2C] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#EF3B33] focus:ring-1 focus:ring-[#EF3B33] transition-all cursor-pointer"
                        >
                          <option value="< $1,000" className="bg-[#1D1842]">&lt; $1,000</option>
                          <option value="$1,000 - $3,000" className="bg-[#1D1842]">$1,000 - $3,000</option>
                          <option value="$3,000 - $5,000" className="bg-[#1D1842]">$3,000 - $5,000</option>
                          <option value="$5,000+" className="bg-[#1D1842]">$5,000+</option>
                        </select>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-white/60 block mb-1.5">
                        Project Details
                      </label>
                      <textarea 
                        name="details"
                        rows={3}
                        value={formData.details}
                        onChange={handleChange}
                        placeholder="Tell me about your business targets, metrics, or timeline..."
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#EF3B33] focus:ring-1 focus:ring-[#EF3B33] transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 bg-[#EF3B33] text-white text-[10px] uppercase font-black tracking-[0.25em] rounded-xl hover:bg-[#d82a22] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer border-none disabled:opacity-50 mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <span>Send Inquiry</span>
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-5"
                >
                  <div className="w-16 h-16 bg-[#EF3B33]/10 text-[#EF3B33] rounded-full flex items-center justify-center mx-auto">
                    <span className="text-3xl leading-none">✓</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-white font-medium tracking-tight">
                      Inquiry Dispatched!
                    </h3>
                    <p className="text-sm font-sans text-white/70 leading-relaxed max-w-sm mx-auto">
                      Thank you for reaching out. I've received your message and will contact you soon.
                    </p>
                  </div>

                  <motion.button
                    onClick={handleCloseModal}
                    whileHover={{ scale: 1.02 }}
                    className="px-8 py-3 bg-[#EF3B33] text-white text-[9px] uppercase font-black tracking-widest rounded-xl hover:bg-[#d82a22] transition-all cursor-pointer border-none"
                  >
                    Close Window
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const MediumIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

const InsightsSection = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  // Visibility State management
  const [hiddenArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("medium_hidden_articles");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const fallbackArticles = [
    {
      id: "fallback-1",
      title: "Best SMM in Jamshedpur Shares 5 Instagram Growth Strategies That Actually Work",
      category: "Social Media Marketing • Instagram Growth",
      excerpt: "Learn five practical Instagram growth strategies that help businesses increase reach, engagement, and build a stronger presence on Instagram. Discover actionable tips on content planning, audience engagement, profile optimization, and sustainable Instagram growth.",
      image: "https://cdn-images-1.medium.com/max/1024/1*Scsf5eojga7FmZinEexH3Q.png",
      readTime: "4 min read",
      date: "June 24, 2026",
      datePublished: "2026-06-24",
      link: "https://medium.com/@rupsah800/best-smm-in-jamshedpur-shares-5-instagram-growth-strategies-that-actually-work-14a4358980c9",
      alt: "Best SMM in Jamshedpur sharing 5 Instagram growth strategies for businesses and creators",
      platform: "Medium"
    },
    {
      id: "fallback-2",
      title: "How I Ranked a Medium Article on Google",
      category: "SEO • Google Ranking",
      excerpt: "Learn the exact step-by-step strategies I used to rank a Medium article on the first page of Google in just three weeks. Discover actionable insights on keyword research, on-page SEO optimization, and leveraging Medium's domain authority.",
      image: "https://cdn-images-1.medium.com/max/1024/1*xygvqAUKQ9Ql7T6sJitI4A.png",
      readTime: "3 min read",
      date: "June 16, 2026",
      datePublished: "2026-06-16",
      link: "https://medium.com/@rupsah800/how-i-ranked-a-medium-article-on-google-bf82fb33fdbd",
      alt: "How I Ranked a Medium Article on Google First Page using Medium SEO Strategies",
      platform: "Medium"
    },
    {
      id: "fallback-3",
      title: "The SEO Playbook Just Got Rewritten",
      category: "SEO • Google Core Update",
      excerpt: "Google's May 2026 core update and major AI search redesign have fundamentally changed the organic landscape. Discover what actually changed, standard quality criteria shifts, and how to adapt your content strategy to rank in an AI-first search environment.",
      image: "https://cdn-images-1.medium.com/max/1024/1*ISQKGK1NULnl9Kc-qiodYg.jpeg",
      readTime: "5 min read",
      date: "June 07, 2026",
      datePublished: "2026-06-07",
      link: "https://medium.com/@rupsah800/the-seo-playbook-just-got-rewritten-64024cabc7ae",
      alt: "SEO playbook rewritten after Google May 2026 Core Update and AI search overhaul",
      platform: "Medium"
    }
  ];

  useEffect(() => {
    let active = true;
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/medium");
        if (!response.ok) {
          throw new Error(`Error fetching articles: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.success && data.articles && data.articles.length > 0) {
          if (active) {
            // Remove duplicates 100% reliably
            const uniqueArticles: any[] = [];
            const seenIds = new Set<string>();
            data.articles.forEach((art: any) => {
              const artId = String(art.id);
              if (!seenIds.has(artId)) {
                seenIds.add(artId);
                uniqueArticles.push(art);
              }
            });
            setArticles(uniqueArticles);
            setIsError(false);
          }
        } else {
          throw new Error("Invalid response format or empty feed");
        }
      } catch (err) {
        console.error("Medium RSS fetch failed:", err);
        if (active) {
          setIsError(true);
          setArticles(fallbackArticles);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    fetchArticles();
    return () => {
      active = false;
    };
  }, []);

  // Filter out hidden articles for regular visitors
  const displayedArticles = articles.filter(article => !hiddenArticleIds.includes(String(article.id)));

  return (
    <section id="insights" className="py-24 px-4 sm:px-6 md:px-8 lg:px-10 bg-transparent scroll-mt-20 relative border-t border-white/5" aria-labelledby="insights-heading">
      {/* Article Schema Markup for SEO (only for visible articles) */}
      {articles.filter(article => !hiddenArticleIds.includes(String(article.id))).map((article) => (
        <script 
          key={`schema-${article.id}`} 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": article.title,
              "description": article.excerpt,
              "image": article.image || undefined,
              "author": {
                "@type": "Person",
                "name": "Rupa Mahato"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Rupa Mahato Portfolio"
              },
              "datePublished": article.datePublished,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": article.link
              }
            })
          }}
        />
      ))}

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#EF3B33]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1720px] mx-auto w-full relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.45em] font-black text-[#EF3B33] block mb-3"
          >
            BLOG
          </motion.span>
          <motion.h2 
            id="insights-heading"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-serif text-white font-medium tracking-tight"
          >
            Insights & Articles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm font-sans font-light tracking-wide text-white/70 max-w-3xl mx-auto mt-4 leading-relaxed"
          >
            Sharing practical insights on social media marketing, content strategy, Instagram growth, and digital branding. Read my latest articles on content strategy, SEO, social media growth, digital marketing, and brand building.
          </motion.p>
          
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#EF3B33]/50 to-transparent w-40 mx-auto mt-6" />
        </div>

        {/* Fallback Notice */}
        {isError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto mb-12 text-center px-6 py-3 bg-white/[0.02] border border-[#EF3B33]/20 text-white/60 rounded-2xl text-[10px] font-mono tracking-wider uppercase"
          >
            ● Live feed sync delayed. Showing cached publications.
          </motion.div>
        )}

        {isLoading ? (
          /* Elegant Loading Skeleton Skeletons */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1720px] mx-auto">
            {[1, 2, 3].map((n) => (
              <div 
                key={n}
                className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 sm:p-8 flex flex-col h-[500px] animate-pulse"
              >
                <div className="w-full aspect-[16/10] bg-white/5 rounded-2xl mb-6" />
                <div className="h-2 bg-white/10 rounded w-1/3 mb-4" />
                <div className="h-6 bg-white/10 rounded w-5/6 mb-4" />
                <div className="space-y-2 mb-6">
                  <div className="h-3 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/5 rounded w-5/6" />
                  <div className="h-3 bg-white/5 rounded w-2/3" />
                </div>
                <div className="h-12 bg-white/5 rounded-xl mt-auto w-full" />
              </div>
            ))}
          </div>
        ) : displayedArticles.length === 0 ? (
          <div className="text-center py-24 max-w-xl mx-auto">
            <EyeOff size={48} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/60 text-sm font-sans font-light leading-relaxed">
              No Medium articles are set to be visible at this time. Check back soon for new publications!
            </p>
          </div>
        ) : (
          /* Responsive Grid Layout */
          <div className={`grid grid-cols-1 ${displayedArticles.length > 2 ? 'md:grid-cols-2 lg:grid-cols-3' : displayedArticles.length === 2 ? 'md:grid-cols-2 max-w-5xl mx-auto' : 'max-w-3xl mx-auto'} gap-8`}>
            {displayedArticles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(239, 59, 51, 0.12)",
                  borderColor: "rgba(239, 59, 51, 0.2)"
                }}
                onClick={() => window.open(article.link, '_blank', 'noopener,noreferrer')}
                className="group relative flex flex-col justify-between h-full bg-white/[0.01] hover:bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 p-6 sm:p-8 cursor-pointer"
              >
                <div>
                  {/* Featured Image Container */}
                  {article.image ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 mb-6 bg-black/20">
                      <img 
                        src={article.image} 
                        alt={article.alt}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0B26]/90 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Category Overlay with subtle Medium branding */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1D1842]/80 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                          <MediumIcon className="w-3 h-3 text-[#FDA1A2]" />
                          <span className="text-[9px] uppercase tracking-wider font-bold text-[#FDA1A2]">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Reading time overlay inside */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-[8px] uppercase font-black tracking-widest text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-md border border-white/5">
                        <Clock size={10} className="text-[#FDA1A2]" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-white/5">
                      <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#EF3B33]/10 backdrop-blur-md rounded-full border border-[#EF3B33]/20">
                        <MediumIcon className="w-3.5 h-3.5 text-[#FDA1A2]" />
                        <span className="text-[9px] uppercase tracking-wider font-bold text-[#FDA1A2]">
                          {article.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] uppercase font-black tracking-widest text-white/50">
                        <Clock size={12} className="text-[#FDA1A2]" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  )}

                  {/* Text content area */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-white/40 block">
                        {article.date}
                      </span>
                      <span className="text-white/20 text-xs">•</span>
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-[#FDA1A2] bg-[#EF3B33]/10 border border-[#EF3B33]/20 rounded px-1.5 py-0.5">
                        {article.platform}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-white mb-4 font-medium leading-snug group-hover:text-[#FDA1A2] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm font-sans text-white/70 leading-relaxed font-light">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Read on Medium Button */}
                <div className="pt-5 border-t border-white/5 mt-auto">
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#EF3B33]/10 text-white hover:bg-[#EF3B33] border border-[#EF3B33]/20 hover:border-[#EF3B33] px-5 py-3.5 text-[9px] uppercase font-black tracking-[0.25em] flex items-center justify-center gap-2 rounded-xl transition-all duration-300 font-sans cursor-pointer"
                  >
                    Read on Medium <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

    </section>
  );
};

const Experience = () => {
  const industries = [
    "Real Estate Brands",
    "Jewellery Brands",
    "Automotive & Car Dealerships",
    "Educational Institutions",
    "Restaurants & Food Businesses",
    "Local Service Businesses",
    "Fashion & Lifestyle Brands"
  ];

  const coreExpertise = [
    "Social Media Management",
    "Content Strategy",
    "Instagram SEO",
    "Content Planning",
    "Audience Growth",
    "Community Management",
    "Meta Ads",
    "Analytics & Reporting"
  ];

  const currentResponsibilities = [
    "Managing multiple client social media accounts.",
    "Creating monthly content calendars.",
    "Developing content strategies for brand growth.",
    "Instagram SEO optimization.",
    "Audience engagement and community management.",
    "Meta Ads campaign support.",
    "Analytics tracking and performance reporting.",
    "Brand positioning and content planning.",
    "Reels strategy and content execution."
  ];

  const previousContributions02 = [
    "Managed social media publishing workflows.",
    "Coordinated content calendars and creatives.",
    "Assisted in campaign execution.",
    "Supported audience engagement strategies.",
    "Helped optimize digital content performance."
  ];

  const previousContributions01 = [
    "Assisted in social media content planning.",
    "Supported campaign execution and scheduling.",
    "Conducted audience and competitor research.",
    "Coordinated content publishing activities.",
    "Contributed to engagement and growth initiatives."
  ];

  return (
    <section id="experience" className="py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-transparent relative overflow-hidden scroll-mt-20 border-t border-white/5">
      <div className="max-w-[1720px] mx-auto w-full z-10 relative">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.45em] font-black text-rose-pink block mb-3"
          >
            EXPERIENCE TIMELINE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-serif text-white font-medium"
          >
            Professional Journey
          </motion.h2>
          <div className="h-px bg-white/10 w-24 mx-auto mt-6" />
        </div>

        {/* Experience Stack / Timeline Grid */}
        <div className="space-y-12">
          
          {/* CARD 03 - CURRENT ROLE (Visually Prominent Master Card) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              backgroundColor: "#221C4E", 
              borderColor: "rgba(253, 161, 162, 0.4)",
              boxShadow: "0 25px 60px -15px rgba(253, 161, 162, 0.1), 0 0 40px rgba(253, 161, 162, 0.03)"
            }}
            className="relative group p-6 sm:p-8 md:p-10 border-2 rounded-[2.5rem] overflow-hidden backdrop-blur-md"
          >
            {/* Crown Jewel Active Impact Badge */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 flex items-center gap-2 px-3 py-1 bg-rose-pink/20 border border-rose-pink/30 rounded-full select-none">
              <span className="w-2 h-2 rounded-full bg-rose-pink animate-pulse" />
              <span className="text-[9px] font-sans font-black uppercase tracking-widest text-rose-pink">CURRENT ROLE</span>
            </div>

            {/* Header portion */}
            <div className="text-left max-w-4xl">
              <span className="font-serif italic text-3xl sm:text-4xl text-[#FDA1A2] block mb-3 font-medium">
                2026 — Present
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif text-white leading-tight font-medium mb-2">
                Social Media Manager & <br className="hidden sm:inline" />Content Strategist
              </h3>
              <h4 className="text-xs font-sans font-black text-rose-pink uppercase tracking-[0.4em] mb-4">
                CHEERS DIGITAL
              </h4>
              <p className="text-base sm:text-lg italic text-white/90 leading-relaxed font-serif font-light mb-6 border-l-2 border-[#FDA1A2]/30 pl-6">
                "Driving measurable brand growth through strategic content planning, Instagram SEO, audience engagement, Meta Ads support, and performance-driven social media campaigns across diverse industries."
              </p>
            </div>

            {/* Split Grid for Responsibilities, Industries, and Expertise */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-8 border-t border-white/10 text-left font-sans">
              
              {/* Left Grid Area (lg:col-span-7): Key Responsibilities */}
              <div className="lg:col-span-7 space-y-4">
                <h5 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-[#FDA1A2] pb-2 border-b border-white/5">
                  Key Responsibilities
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {currentResponsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-white/80 font-sans font-light leading-snug">
                      <span className="text-rose-pink mt-1 shrink-0 font-bold">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Grid Area (lg:col-span-5): Industries Worked With & Core Expertise */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Industries Worked With */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-[#FDA1A2] pb-2 border-b border-white/5">
                    Industries Worked With
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {industries.map((ind, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-wider font-bold text-white/80 rounded-lg hover:border-rose-pink/30 hover:text-white transition-colors duration-300 select-none font-sans"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Core Expertise */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-[#FDA1A2] pb-2 border-b border-white/5">
                    Core Expertise
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {coreExpertise.map((exp, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 bg-rose-pink/10 border border-rose-pink/20 text-[9px] uppercase tracking-wider font-bold text-rose-pink rounded-lg select-none font-sans"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </motion.div>

          {/* Cards 01 & 02 Arrange side by side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CARD 02 - DIGITAL MARKETING EXECUTIVE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ backgroundColor: "#B55239", borderColor: "rgba(253, 161, 162, 0.15)" }}
              className="p-6 sm:p-7 md:p-8 border rounded-[2rem] text-left relative overflow-hidden group shadow-[0_15px_35px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="font-serif italic text-2xl text-[#FDA1A2] block mb-1 font-medium">
                    2026
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-medium leading-snug">
                    Digital Marketing Executive
                  </h3>
                  <h4 className="text-[10px] font-sans font-black text-white/50 uppercase tracking-[0.3em] mt-1">
                    YOURS DIGITALLY
                  </h4>
                </div>
              </div>

              <div className="h-px bg-white/10 w-full mb-5" />

              <p className="text-sm italic text-white/90 font-serif font-light leading-relaxed mb-5 border-l border-white/20 pl-4">
                "Contributed to performance-focused digital marketing initiatives through content scheduling, creative coordination, social media management, and campaign support across multiple business categories."
              </p>

              <div className="space-y-3">
                <h5 className="text-[9px] font-sans font-black uppercase tracking-widest text-[#FDA1A2]">
                  Key Contributions
                </h5>
                <ul className="space-y-2">
                  {previousContributions02.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-white/80 font-sans font-light leading-snug">
                      <span className="text-white/40 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            </motion.div>

            {/* CARD 01 - DIGITAL MARKETING INTERN */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ backgroundColor: "#B55239", borderColor: "rgba(253, 161, 162, 0.15)" }}
              className="p-6 sm:p-7 md:p-8 border rounded-[2rem] text-left relative overflow-hidden group shadow-[0_15px_35px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="font-serif italic text-2xl text-[#FDA1A2] block mb-1 font-medium">
                    2026
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-medium leading-snug">
                    Digital Marketing Intern
                  </h3>
                  <h4 className="text-[10px] font-sans font-black text-white/50 uppercase tracking-[0.3em] mt-1">
                    THESIS EDVENTURE
                  </h4>
                </div>
              </div>

              <div className="h-px bg-white/10 w-full mb-5" />

              <p className="text-sm italic text-white/90 font-serif font-light leading-relaxed mb-5 border-l border-white/20 pl-4">
                "Built a strong foundation in digital marketing through hands-on exposure to content planning, social media support, campaign execution, audience research, and brand communication."
              </p>

              <div className="space-y-3">
                <h5 className="text-[9px] font-sans font-black uppercase tracking-widest text-[#FDA1A2]">
                  Key Contributions
                </h5>
                <ul className="space-y-2">
                  {previousContributions01.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-white/80 font-sans font-light leading-snug">
                      <span className="text-white/40 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            </motion.div>

          </div>

        </div>

      </div>

      {/* Background visual graphics */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-rose-pink/[0.015] rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};





// --- SEO & Router Page Components ---

const useSEO = (title: string, description: string) => {
  const location = useLocation();
  useEffect(() => {
    document.title = title;
    
    // Update meta tags dynamically
    const updateMeta = (selector: string, attr: string, value: string, fallbackType?: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (fallbackType === 'property') {
          el.setAttribute('property', attr);
        } else {
          el.setAttribute('name', attr);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    updateMeta('meta[name="description"]', 'description', description);
    updateMeta('meta[property="og:title"]', 'og:title', title, 'property');
    updateMeta('meta[property="og:description"]', 'og:description', description, 'property');
    updateMeta('meta[property="og:url"]', 'og:url', "https://rupamahato-portfolio.netlify.app" + location.pathname, 'property');
    updateMeta('meta[property="og:site_name"]', 'og:site_name', "Rupa Mahato", 'property');
    updateMeta('meta[property="og:image"]', 'og:image', "https://rupamahato-portfolio.netlify.app/android-chrome-512x512.png", 'property');
    
    updateMeta('meta[name="twitter:card"]', 'twitter:card', "summary_large_image");
    updateMeta('meta[name="twitter:title"]', 'twitter:title', title);
    updateMeta('meta[name="twitter:description"]', 'twitter:description', description);
    updateMeta('meta[name="twitter:image"]', 'twitter:image', "https://rupamahato-portfolio.netlify.app/android-chrome-512x512.png");
    
    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', "https://rupamahato-portfolio.netlify.app" + location.pathname);
  }, [title, description, location.pathname]);
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const HomePage = () => {
  useSEO(
    "Rupa Mahato | Social Media Manager & Content Strategist Jamshedpur",
    "Rupa Mahato is a professional Social Media Manager and Content Strategist in Jamshedpur, helping brands scale their organic visibility, Instagram growth, and digital footprint."
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <FeaturedServices />
      <FeaturedWork />
      <WhyWorkWithMe />
      <ToolsIUse />
      <LatestInsights />
      <FinalCTA />
    </motion.div>
  );
};

const AboutPage = () => {
  useSEO(
    "About Rupa Mahato | Portfolio & Professional Services",
    "Discover Rupa Mahato's background as a digital marketer and content creator. Explore specialized services including Instagram audits, content calendars, and social strategy."
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <About />
      <ServicesSection />
    </motion.div>
  );
};

const ExperiencePage = () => {
  useSEO(
    "Professional Experience | Rupa Mahato Portfolio",
    "Review Rupa Mahato's track record of driving brand growth and successful marketing campaigns in Jharkhand and globally, including role at Yours Digitally."
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <Experience />
    </motion.div>
  );
};

const WorkPage = () => {
  useSEO(
    "Selected Work & Case Studies | Rupa Mahato Portfolio",
    "Explore Rupa Mahato's creative portfolio, featuring high-performing social media campaigns, content design projects, and organic growth case studies."
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <SelectedWork />
    </motion.div>
  );
};

const BlogPage = () => {
  useSEO(
    "Insights & Industry Blog | Rupa Mahato Portfolio",
    "Read the latest guides, tips, and professional growth advice on Instagram SEO, social media algorithms, and digital marketing strategies from Jamshedpur."
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <InsightsSection />
    </motion.div>
  );
};

const BlogManagerPage = () => {
  useSEO(
    "Blog Feed Manager | Rupa Mahato Admin",
    "Customize and manage which publications are displayed on your portfolio website."
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <BlogManager />
    </motion.div>
  );
};

const ContactPage = () => {
  useSEO(
    "Get In Touch | Hire Rupa Mahato",
    "Ready to accelerate your brand's growth? Contact Rupa Mahato for professional social media management, campaign planning, and brand consultations."
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <ContactForm />
    </motion.div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-transparent text-white selection:bg-[#EF3B33] selection:text-white font-sans min-h-screen relative overflow-hidden">
      {/* Premium custom cursor experience for pointer devices */}
      <CustomCursor />

      {/* Ambient interactive Koi Pond backdrop */}
      <KoiPond />

      {/* Visual Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#EF3B33] z-[60] origin-left shadow-[0_0_10px_rgba(239,59,51,0.5)]"
        style={{ scaleX }}
      />
      
      <ScrollToTop />
      <Navbar />
      
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/admin" element={<BlogManagerPage />} />
          <Route path="/blog-manager" element={<BlogManagerPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

