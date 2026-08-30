import React from 'react';
import { motion } from 'motion/react';
import { Target, TrendingUp, Layers, Award, ArrowRight, BarChart3, DollarSign, Filter } from 'lucide-react';
import { BackToProjects } from './BackToProjects';
import { EditableMetric } from './EditableMetric';
import { EditableImage } from './EditableImage';
import { useNavigate } from 'react-router-dom';

export const MetaAdsProject = () => {
  const navigate = useNavigate();

  const strategies = [
    {
      title: "Audience Segmentation & Lookalikes",
      desc: "Granular audience tiers categorizing cold interest segments, high-intent website visitors, and 1%-2% lookalike profiles from past customer lists.",
      icon: Filter,
    },
    {
      title: "Creative & Copy A/B Testing",
      desc: "Systematic matrix testing across dynamic creative formats—testing 4 visual variations against 3 distinct psychological copy angles.",
      icon: Layers,
    },
    {
      title: "Full-Funnel Retargeting",
      desc: "Multi-touch retargeting sequences addressing customer hesitations, social proof testimonials, and limited-time offer incentives.",
      icon: Target,
    },
    {
      title: "CPA & ROAS Optimization",
      desc: "Real-time budget reallocation toward top-performing ad sets, preventing ad fatigue and reducing cost-per-lead.",
      icon: TrendingUp,
    }
  ];

  const results = [
    { label: "High-Intent Leads", value: "480+", subtext: "Generated within a 60-day campaign sprint" },
    { label: "Cost Per Lead (CPL)", value: "₹64", subtext: "Reduced from ₹190 benchmark" },
    { label: "Return on Ad Spend", value: "4.8x ROAS", subtext: "Direct measurable revenue generated" },
    { label: "Landing Page Conversion", value: "14.2%", subtext: "Optimized mobile lead capture rate" }
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
          <Target size={14} className="text-[#FDA1A2]" />
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-[#FDA1A2] font-sans">
            Paid Acquisition Case Study
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif text-white font-normal tracking-tight">
          Meta Ads Lead Generation Campaign
        </h1>
        <p className="text-white/70 font-sans text-base sm:text-lg max-w-3xl leading-relaxed font-light">
          A data-driven paid advertising campaign on Instagram &amp; Facebook focused on audience segmentation, creative matrix testing, and conversion rate optimization.
        </p>
      </motion.div>

      {/* Cover Image */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mb-16"
      >
        <EditableImage 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
          alt="Meta Ads Performance Analytics" 
          className="h-[320px] sm:h-[420px] w-full"
          caption="Paid campaign funnel performance and conversion tracking metrics."
        />
      </motion.div>

      {/* Metrics */}
      <div className="mb-16">
        <h2 className="text-xl sm:text-2xl font-serif text-white mb-6 font-normal">Campaign Performance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((metric, idx) => (
            <EditableMetric 
              key={idx} 
              label={metric.label} 
              value={metric.value} 
              subtext={metric.subtext} 
              icon={<DollarSign size={18} />} 
            />
          ))}
        </div>
      </div>

      {/* Strategic Approach */}
      <div className="mb-16">
        <h2 className="text-xl sm:text-2xl font-serif text-white mb-6 font-normal">Campaign Architecture</h2>
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
          <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal">Ready to scale high-converting paid ads?</h2>
          <p className="text-sm text-white/75 font-sans font-light">
            Let's structure a paid acquisition funnel engineered to lower your cost-per-lead and scale profitable returns.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="mt-4 px-8 py-4 bg-[#EF3B33] text-white uppercase text-xs font-black tracking-widest rounded-full hover:bg-[#D9352F] transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Launch Paid Campaign</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
