import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Mail, 
  Instagram, 
  Linkedin, 
  ArrowUp, 
  Sparkles,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { socialsConfig } from '../config/socials';

// --- Medium Icon Helper ---
const MediumIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

export const Footer = () => {
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Experience', path: '/experience' },
    { label: 'Work', path: '/work' },
    { label: 'Blog', path: '/blog' },
    { label: 'Q&A', path: '/qa' },
    { label: 'Contact', path: '/contact' },
  ];

  const caseStudies = [
    { label: 'Instagram Growth Framework', path: '/work/instagram-growth-framework' },
    { label: 'SEO Growth Strategy', path: '/work/seo-growth-strategy' },
    { label: 'Meta Ads Campaign', path: '/work/meta-ads-campaign' },
    { label: 'Video Editing & Content', path: '/work/video-editing-content' },
  ];

  return (
    <footer id="footer" className="bg-[#0b081c]/90 border-t border-white/10 text-white font-sans relative z-10 pt-16 pb-12 px-4 sm:px-6 md:px-8 lg:px-12 backdrop-blur-md">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[#EF3B33]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1720px] mx-auto w-full relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10 text-left">
          
          {/* Col 1: Bio & Location (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-5">
            <Link to="/" className="inline-block group">
              <span className="font-serif text-2xl sm:text-3xl text-white font-medium group-hover:text-[#FDA1A2] transition-colors">
                Rupa Mahato
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed font-light max-w-md">
              Social Media Manager and Content Strategist based in Jamshedpur, helping brands scale their organic reach, Instagram presence, and conversion performance.
            </p>
            <div className="flex items-center gap-2 text-white/50 text-xs font-light">
              <MapPin size={14} className="text-[#EF3B33] shrink-0" />
              <span>Jamshedpur, Jharkhand • Available Worldwide</span>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={socialsConfig.email.url}
                aria-label="Email Rupa Mahato"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#EF3B33] border border-white/10 hover:border-[#EF3B33] text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <Mail size={16} />
              </a>
              <a
                href={socialsConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#EF3B33] border border-white/10 hover:border-[#EF3B33] text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <Instagram size={16} />
              </a>
              <a
                href={socialsConfig.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#EF3B33] border border-white/10 hover:border-[#EF3B33] text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={socialsConfig.medium.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Medium Profile"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#EF3B33] border border-white/10 hover:border-[#EF3B33] text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <MediumIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] uppercase font-black tracking-[0.3em] text-[#FDA1A2]">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className={`text-xs transition-colors duration-200 block py-0.5 ${
                      location.pathname === item.path 
                        ? 'text-[#FDA1A2] font-semibold' 
                        : 'text-white/70 hover:text-white font-light'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Case Studies (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] uppercase font-black tracking-[0.3em] text-[#FDA1A2]">
              Featured Work
            </h4>
            <ul className="space-y-2.5">
              {caseStudies.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className={`text-xs transition-colors duration-200 block py-0.5 ${
                      location.pathname === item.path 
                        ? 'text-[#FDA1A2] font-semibold' 
                        : 'text-white/70 hover:text-white font-light'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Contact (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] uppercase font-black tracking-[0.3em] text-[#FDA1A2]">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-white/40 block">Email</span>
                <a 
                  href={socialsConfig.email.url}
                  className="text-xs text-white/80 hover:text-[#FDA1A2] transition-colors break-all"
                >
                  {socialsConfig.email.address}
                </a>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-white/40 block">Instagram</span>
                <a 
                  href={socialsConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/80 hover:text-[#FDA1A2] transition-colors"
                >
                  {socialsConfig.instagram.handle}
                </a>
              </div>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EF3B33] hover:text-[#FDA1A2] transition-colors pt-1"
              >
                <span>Hire Rupa</span>
                <ExternalLink size={11} />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-light">
          <p>© 2026 Rupa Mahato. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-white/40 hover:text-white/70 transition-colors text-[11px]">
              Blog Admin
            </Link>
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-[11px] transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
