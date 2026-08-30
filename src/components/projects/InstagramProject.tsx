import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Video, Layers, Hash, UserCheck, ArrowRight, Instagram, BarChart3 } from 'lucide-react';
import { BackToProjects } from './BackToProjects';
import { EditableMetric } from './EditableMetric';
import { EditableImage } from './EditableImage';
import { useNavigate } from 'react-router-dom';

export const InstagramProject = () => {
  const navigate = useNavigate();

  const strategies = [
    {
      title: "Short-Form Reel Scripting & Pacing",
      desc: "Engineering high-retention 3-second visual and audio hooks, fast-paced editorial cuts, and relatable problem-solution scripts that maximize average watch time.",
      icon: Video,
    },
    {
      title: "Educational Carousel Funnels",
      desc: "Designing multi-slide visual guides with clear visual hierarchy, actionable takeaways, and dedicated save/share CTA prompts.",
      icon: Layers,
    },
    {
      title: "Profile & Bio Conversion Architecture",
      desc: "Optimizing profile handles, searchable keywords in bio, structured highlight stories, and clear lead magnet call-to-actions.",
      icon: UserCheck,
    },
    {
      title: "Hashtag & Keyword SEO Indexing",
      desc: "Deploying targeted niche keyword phrases across captions and audio metadata to capture Instagram Explore and in-app search discovery.",
      icon: Hash,
    },
    {
      title: "Active Community Engagement",
      desc: "Building authentic dialogue through story question stickers, interactive polls, proactive DM outreach, and thoughtful comment interactions.",
      icon: Sparkles,
    }
  ];

  const results = [
    { label: "Audience Growth", value: "+12.4K", subtext: "100% organic followers gained within 6 months" },
    { label: "Average Engagement Rate", value: "8.6%", subtext: "4x industry average for the niche" },
    { label: "Content Reach", value: "1.2M+", subtext: "Total non-follower impressions generated" },
    { label: "Direct Inquiries", value: "140+", subtext: "Qualified inbound DM client inquiries" }
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
          <Instagram size={14} className="text-[#FDA1A2]" />
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-[#FDA1A2] font-sans">
            Instagram Growth Case Study
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif text-white font-normal tracking-tight">
          Instagram Growth &amp; Content Architecture
        </h1>
        <p className="text-white/70 font-sans text-base sm:text-lg max-w-3xl leading-relaxed font-light">
          A systematic playbook transforming passive Instagram accounts into vibrant, revenue-generating community hubs through reels, carousels, and bio optimization.
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
          src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=1200" 
          alt="Instagram Marketing and Content Planning" 
          className="h-[320px] sm:h-[420px] w-full"
          caption="Organic reach and audience retention optimization on Instagram."
        />
      </motion.div>

      {/* Metrics */}
      <div className="mb-16">
        <h2 className="text-xl sm:text-2xl font-serif text-white mb-6 font-normal">Measurable Growth</h2>
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
        <h2 className="text-xl sm:text-2xl font-serif text-white mb-6 font-normal">Core Growth Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-[#0F0B26]/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1D1842] border border-white/10 flex items-center justify-center mb-4 text-[#FDA1A2]">
                    <Icon size={22} />
                  </div>
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
          <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal">Ready to scale your Instagram presence?</h2>
          <p className="text-sm text-white/75 font-sans font-light">
            Book a profile audit to uncover content gaps, optimize your hook architecture, and unlock organic audience growth.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="mt-4 px-8 py-4 bg-[#EF3B33] text-white uppercase text-xs font-black tracking-widest rounded-full hover:bg-[#D9352F] transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Request Profile Audit</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
