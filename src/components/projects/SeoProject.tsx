import React from 'react';
import { motion } from 'motion/react';
import { Search, FileText, Compass, TrendingUp, CheckCircle, ArrowRight, BarChart3, Globe } from 'lucide-react';
import { BackToProjects } from './BackToProjects';
import { EditableMetric } from './EditableMetric';
import { EditableImage } from './EditableImage';
import { useNavigate } from 'react-router-dom';

export const SeoProject = () => {
  const navigate = useNavigate();

  const strategies = [
    {
      title: "Targeted Keyword Mapping",
      desc: "In-depth intent mapping combining commercial keywords with high-volume informational queries to capture search demand at every stage of the customer funnel.",
      icon: Search,
    },
    {
      title: "On-Page & Technical Audits",
      desc: "Resolving crawl anomalies, improving Core Web Vitals, restructuring metadata hierarchies, and implementing rich schema markups for fast Google indexing.",
      icon: FileText,
    },
    {
      title: "Content Architecture",
      desc: "Structuring pillar content clusters, evergreen guides, and topic hubs that establish topical authority and earn organic backlinks.",
      icon: Compass,
    },
    {
      title: "Performance & Ranking Tracking",
      desc: "Continuous monitoring of keyword rankings, click-through rates, organic impressions, and search console health.",
      icon: TrendingUp,
    }
  ];

  const results = [
    { label: "Organic Search Growth", value: "+185%", subtext: "Year-over-year increase in search sessions" },
    { label: "First Page Keywords", value: "320+", subtext: "Ranked in top 3 positions for target keywords" },
    { label: "Organic Lead Conversions", value: "4.2x", subtext: "Increase in qualified inquiries from SEO" },
    { label: "Domain Authority", value: "38 DA", subtext: "Up from 14 DA within 8 months" }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 md:px-8 lg:px-10 max-w-[1280px] mx-auto text-left">
      <BackToProjects />

      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-4 mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
          <Globe size={14} className="text-[#FDA1A2]" />
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-[#FDA1A2] font-sans">
            SEO Case Study
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif text-white font-normal tracking-tight">
          SEO & Organic Growth Strategy
        </h1>
        <p className="text-white/70 font-sans text-base sm:text-lg max-w-3xl leading-relaxed font-light">
          A comprehensive framework combining technical search audits, semantic keyword mapping, and authority-building content to dominate organic search rankings.
        </p>
      </motion.div>

      {/* Main Cover Image */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mb-16"
      >
        <EditableImage 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
          alt="SEO Analytics Dashboard" 
          className="h-[320px] sm:h-[420px] w-full"
          caption="Organic search growth visualization and keyword position metrics."
        />
      </motion.div>

      {/* Key Metrics */}
      <div className="mb-16">
        <h2 className="text-xl sm:text-2xl font-serif text-white mb-6 font-normal">Impact & Measured Results</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((metric, idx) => (
            <EditableMetric 
              key={idx} 
              label={metric.label} 
              value={metric.value} 
              subtext={metric.subtext} 
              icon={<BarChart3 size={18} />} 
            />
          ))}
        </div>
      </div>

      {/* Strategic Approach */}
      <div className="mb-16">
        <h2 className="text-xl sm:text-2xl font-serif text-white mb-6 font-normal">Strategic Execution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strategies.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-[#0F0B26]/60 border border-white/10 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1D1842] border border-white/10 flex items-center justify-center flex-shrink-0 text-[#FDA1A2]">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/70 font-sans leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#1D1842]/90 border border-white/15 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal">Want similar organic growth for your brand?</h2>
          <p className="text-sm text-white/75 font-sans font-light">
            Let's analyze your current search visibility and build a custom organic SEO roadmap for sustainable traffic growth.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="mt-4 px-8 py-4 bg-[#EF3B33] text-white uppercase text-xs font-black tracking-widest rounded-full hover:bg-[#D9352F] transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Start an SEO Audit</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
