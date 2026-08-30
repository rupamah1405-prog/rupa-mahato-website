import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Film, Type, Sparkles, Palette, Volume2, ArrowRight, Play, ExternalLink, Video } from 'lucide-react';
import { BackToProjects } from './BackToProjects';
import { EditableMetric } from './EditableMetric';
import { EditableImage } from './EditableImage';
import { useNavigate } from 'react-router-dom';

export const VideoEditingProject = () => {
  const navigate = useNavigate();

  const skills = [
    { name: "Video Editing", icon: Scissors, desc: "Seamless cuts, dynamic pacing, and narrative flow engineered to hold viewer attention." },
    { name: "Transitions", icon: Film, desc: "Smooth whip pans, zoom transitions, and creative match cuts that elevate visual quality." },
    { name: "Text Animation", icon: Type, desc: "Engaging kinetic typography, pop-in captions, and animated emphasis callouts." },
    { name: "Motion Graphics", icon: Sparkles, desc: "Step-by-step visual graphics, animated screen captures, and callout icons." },
    { name: "Color Correction", icon: Palette, desc: "Warm, vibrant color grading matching brand aesthetics and mood." },
    { name: "Sound Sync", icon: Volume2, desc: "Rhythmic audio beat-matching, ambient sound effects, and crystal clear voiceover leveling." }
  ];

  const metrics = [
    { label: "Average Retention", value: "82%", subtext: "Viewers watching past the 15-second hook" },
    { label: "Reel Views", value: "250K+", subtext: "Combined organic video views generated" },
    { label: "Save-to-View Ratio", value: "6.4%", subtext: "Signaling high practical reference value" },
    { label: "Turnaround Time", value: "24-48h", subtext: "Rapid delivery for social-first content cycles" }
  ];

  const reelUrl = "https://www.instagram.com/reel/DcYlsvUEs3N/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==";

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
          <Video size={14} className="text-[#FDA1A2]" />
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-[#FDA1A2] font-sans">
            Creative &amp; Video Production
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif text-white font-normal tracking-tight">
          Video Editing &amp; Multimedia Content
        </h1>
        <p className="text-white/70 font-sans text-base sm:text-lg max-w-3xl leading-relaxed font-light">
          Short-form video editing, rhythmic pacing, kinetic typography, and motion storytelling designed to maximize watch time and viewer conversion on Instagram and YouTube Shorts.
        </p>
      </motion.div>

      {/* Featured Reel Showcase Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mb-16 rounded-3xl bg-[#1D1842]/80 border border-white/15 p-6 sm:p-8 lg:p-10 relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-widest font-black text-[#FDA1A2] block font-sans">
              FEATURED INSTAGRAM REEL
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal">
              High-Retention Short-Form Reel Edit
            </h2>
            <p className="text-sm sm:text-base text-white/75 font-sans leading-relaxed font-light">
              This short-form edit demonstrates fast-paced visual storytelling, rhythmic audio beat-matching, dynamic text overlays, and an immediate 3-second hook designed to captivate scrolling audiences.
            </p>
            <div className="pt-2">
              <a
                href={reelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#EF3B33] hover:bg-[#D9352F] text-white text-xs uppercase font-black tracking-widest rounded-full transition-all duration-300 shadow-lg cursor-pointer"
              >
                <Play size={14} className="fill-white" />
                <span>Watch Reel on Instagram</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-6 relative">
            <div className="relative group overflow-hidden rounded-2xl border border-white/10 aspect-video sm:aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1200"
                alt="Video Editing Studio Setup"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <a 
                href={reelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-300 cursor-pointer"
                aria-label="Play Reel on Instagram"
              >
                <div className="w-16 h-16 rounded-full bg-[#EF3B33] text-white flex items-center justify-center shadow-[0_0_30px_rgba(239,59,51,0.7)] group-hover:scale-110 transition-transform">
                  <Play size={24} className="fill-white ml-1" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="mb-16">
        <h2 className="text-xl sm:text-2xl font-serif text-white mb-6 font-normal">Video Performance Highlights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => (
            <EditableMetric 
              key={idx} 
              label={metric.label} 
              value={metric.value} 
              subtext={metric.subtext} 
              icon={<Film size={18} />} 
            />
          ))}
        </div>
      </div>

      {/* Editing Capabilities */}
      <div className="mb-16">
        <h2 className="text-xl sm:text-2xl font-serif text-white mb-6 font-normal">Editing Capabilities &amp; Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-[#0F0B26]/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1D1842] border border-white/10 flex items-center justify-center mb-4 text-[#FDA1A2]">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-serif text-white mb-2">{skill.name}</h3>
                  <p className="text-sm text-white/70 font-sans leading-relaxed font-light">{skill.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#1D1842]/90 border border-white/15 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal">Need high-impact video edits for your brand?</h2>
          <p className="text-sm text-white/75 font-sans font-light">
            Whether for Instagram Reels, YouTube Shorts, or commercial brand showcases, let's create captivating video content.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="mt-4 px-8 py-4 bg-[#EF3B33] text-white uppercase text-xs font-black tracking-widest rounded-full hover:bg-[#D9352F] transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Discuss Video Project</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
