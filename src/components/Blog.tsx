import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowRight, Clock, X, Terminal, CheckCircle2 } from 'lucide-react';
 
export const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState<typeof blogs[0] | null>(null);

  const blogs = [
    {
      id: "instagram-seo-guide",
      tag: "SEO Guide",
      title: "Instagram SEO Guide: How to Rank Your Profile in Jamshedpur Search Results",
      desc: "Learn the exact optimization checklist to make your Jamshedpur local brand easily searchable. This guide covers caption keyword optimization, alt text strategies, and user bio indexing secrets.",
      readTime: "6 min read",
      date: "June 20, 2026",
      paragraphs: [
        "In the digital heart of Jharkhand, Instagram is no longer just a visual diary; it is a powerful local search engine. When a prospective client searches 'Social Media Manager in Jamshedpur' or 'Aesthetic branding Jharkhand', your feed needs to step into the top spotlight directly.",
        "Key indexing signals such as geo-tags, precise metadata in alt text, and bio keyword distribution are critical. To unlock this authority, include highly transactional phrases organically inside your post captions instead of oversaturated hashtag clouds.",
        "Additionally, ensure your biological title includes your primary industry function and base location. A well-formatted metadata hierarchy signals relevancy clearly to search algorithms, accelerating organic customer impressions seamlessly."
      ]
    },
    {
      id: "instagram-growth-tips",
      tag: "Instagram Growth",
      title: "10 Proven Instagram Growth Tips for Local Businesses in Jharkhand",
      desc: "Struggling to get organic engagement? We walk you through how to construct hooks, plan viral reels organically, analyze follower feedback loops, and design high-retention carousels.",
      readTime: "8 min read",
      date: "June 18, 2026",
      paragraphs: [
        "Consistency is the currency of the Instagram algorithm. For local brands seeking real attention, relying on erratic, disconnected photo postings will only result in stagnant numbers.",
        "To break the mold, utilize the 'Hook-Story-Offer' paradigm inside your short-form reels. Crafting a visual and text-based trigger within the first 1.5 seconds determines whether viewers scroll past or stay to discover your profile's core value.",
        "By structuring content around a defined content calendar and planning templates, you relieve the stress of batch generation and establish a predictable brand cadence that builds deep, localized community advocacy."
      ]
    },
    {
      id: "content-strategy-guide",
      tag: "Content Strategy",
      title: "The Ultimate Content Strategy Guide: Building a Reliable Lead Funnel",
      desc: "Social media shouldn't just look pretty—it should sell. Dive deep into how to align your monthly content planning grids to establish trust, educate customers, and scale direct conversion rates.",
      readTime: "7 min read",
      date: "June 15, 2026",
      paragraphs: [
        "Aesthetic appeal is pleasant, but conversion-focused mechanics are what keep businesses thriving. A premium look is useless if it does not guide the target audience toward making a formal inquiry.",
        "Build a three-tiered content system that caters to different psychological stages of a prospective buyer's journey: (1) Awareness reels for reaching new eyes, (2) consideration carousels that answer burning niche FAQs, and (3) high-intent conversion posts with a crisp call-to-action.",
        "This strategic alignment shifts your digital accounts from basic galleries to dynamic corporate funnels which organically qualify leads and capture premium local clients with minimal friction."
      ]
    },
    {
      id: "smm-tips",
      tag: "Marketing Tips",
      title: "Social Media Marketing Tips: Why Organic Management Trumps Quick Ads",
      desc: "Many Jamshedpur businesses rush to expend ad budgets without laying an organic foundation. Learn the strategic synergy between community management, brand voice, and Meta Ad campaigns.",
      readTime: "5 min read",
      date: "June 12, 2026",
      paragraphs: [
        "Throwing substantial capital into paid advertisements before optimizing your profile is a recipe for high drop-off rates and lost budget.",
        "Organic management sets the standard of trust. When a paid ad sparks attention, users click through to review your feed. If they encounter silent message tabs, irregular histories, or zero editorial voice, they will immediately bounce.",
        "Establish a secure, beautifully categorized feed first. Cultivating active feedback loops and premium layouts organically creates a warm landing hub that doubles the return of every paid marketing dollar spent."
      ]
    },
    {
      id: "brand-growth-strategies",
      tag: "Brand Growth",
      title: "Brand Growth Strategies: Elevating Local Small Business to High Premium Heights",
      desc: "How to inject a luxury aesthetic and clear, high-end messaging into everyday services to command higher prices. Case study of branding lessons and emotional audience triggers.",
      readTime: "9 min read",
      date: "June 08, 2026",
      paragraphs: [
        "Transforming a local service into a high-tier premium brand is purely a matter of intentional visual hierarchy and precise emotional positioning.",
        "Stop competing on cheap pricing and start distinguishing on pristine presentation. High-contrast typography pairings and spacious negative design spaces deliver an immediate sense of elite authority.",
        "Aligning your content narrative to highlight premium, performance-based outcomes rather than basic features triggers deep brand appreciation and positions you to confidently attract the region's top corporate leads."
      ]
    },
    {
      id: "marketing-trends-2026",
      tag: "Marketing Trends",
      title: "Social Media Marketing Trends 2026: Hooking Gen-Z and Millennial Audiences",
      desc: "A forward-looking analysis of modern aesthetic styling, short-form raw content dynamics, micro-influencer targeting, and how AI-search indexing shapes localized search visibility.",
      readTime: "6 min read",
      date: "June 03, 2026",
      paragraphs: [
        "The digital landscapes of 2026 are dominated by raw authenticity blended with high-contrast, polished editorial typography.",
        "Modern audiences possess keen filters that easily identify over-produced, salesy content templates. They crave vulnerable, behind-the-scenes narratives paired with sleek, cinematic branding cues.",
        "Adapting your Instagram profile to feed semantic AI search engines while capturing real human interest is the ultimate modern marketing formula. Those who establish these systems early will dominate localized impressions cleanly."
      ]
    }
  ];
 
  return (
    <section id="blog" className="pt-24 pb-28 px-8 md:px-16 bg-transparent scroll-mt-20 relative">
      {/* Background glow overlay */}
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-rose-pink/[0.012] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.45em] font-black text-rose-pink block mb-4"
          >
            EDITORIAL KNOWLEDGE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-[4vw] font-serif text-white leading-tight font-medium"
          >
            Insights & Strategy Blog
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            className="text-white font-sans text-sm md:text-base mt-4 max-w-3xl mx-auto font-light"
          >
            Explore professional advice on social media optimization, brand design, local search rankings, and content growth templates to unlock digital authority.
          </motion.p>
          <div className="h-px bg-white/10 w-32 mx-auto mt-8" />
        </div>
 
        {/* Editorial Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.8 }}
              whileHover={{ y: -6 }}
              style={{ backgroundColor: "#B55239", borderColor: "rgba(253, 161, 162, 0.15)" }}
              className="group flex flex-col justify-between p-10 border rounded-[2.5rem] hover:bg-[#c25e45] hover:border-white/30 transition-all duration-500 relative overflow-hidden shadow-[0_15px_35px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_35px_80px_-15px_rgba(0,0,0,0.5)]"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between mb-8">
                  <span className="px-3.5 py-1.5 bg-orange-brand/10 text-[9px] uppercase font-black tracking-widest text-[#EF3B33] rounded-full border border-orange-brand/20">
                    {blog.tag}
                  </span>
                  <div className="flex items-center gap-2 text-white/50 text-[9px] font-mono">
                    <Clock size={10} className="text-rose-pink" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
 
                <p className="text-[10px] font-mono text-rose-pink/60 uppercase tracking-widest mb-3">
                  {blog.date}
                </p>
 
                <h3 className="font-serif text-2xl text-white mb-5 leading-snug group-hover:text-rose-pink transition-colors animate-fade-in">
                  {blog.title}
                </h3>
 
                <p className="text-sm font-sans text-white/80 leading-relaxed font-light mb-8 line-clamp-3">
                  {blog.desc}
                </p>
              </div>
 
              <div>
                <div className="h-px bg-white/10 w-full mb-6" />
                <button 
                  onClick={() => setSelectedBlog(blog)}
                  className="group/btn text-[10px] uppercase tracking-widest font-black text-rose-pink hover:text-orange-brand transition-all flex items-center gap-2.5 cursor-pointer bg-transparent border-none text-left p-0"
                >
                  Read Full Article 
                  <ArrowRight size={13} className="text-orange-brand group-hover/btn:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
 
              {/* Decorative light subtle ambient gradient blur on hover */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-orange-brand/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Premium Modal Reader Panel overlay */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Modal backdrop glass */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)}
              className="absolute inset-0 bg-[#1D1842]/90 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal Content container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              style={{ backgroundColor: "#B55239", borderColor: "rgba(253, 161, 162, 0.2)" }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto border rounded-[3rem] p-8 sm:p-12 md:p-14 shadow-[0_50px_100px_-25px_rgba(0,0,0,0.4)] z-10 scrollbar-thin scrollbar-thumb-white/10"
            >
              {/* Top meta tags */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <span className="px-4 py-1.5 bg-orange-brand/10 text-[9px] uppercase font-black tracking-widest text-[#EF3B33] rounded-full border border-orange-brand/25">
                  {selectedBlog.tag}
                </span>
                <div className="flex items-center gap-6 text-[10px] uppercase tracking-wider font-mono text-white/50">
                  <span className="flex items-center gap-2">
                    <Clock size={12} className="text-rose-pink" /> 
                    {selectedBlog.readTime}
                  </span>
                  <span>{selectedBlog.date}</span>
                </div>
              </div>

              {/* Headline */}
              <h3 className="font-serif text-3xl sm:text-4xl text-white mb-8 leading-tight font-medium">
                {selectedBlog.title}
              </h3>

              <div className="h-px bg-white/10 w-full mb-10" />

              {/* Styled Paragraphs */}
              <div className="space-y-6 font-sans text-white/90 text-sm sm:text-base leading-relaxed text-justify font-light">
                {selectedBlog.paragraphs?.map((p, idx) => (
                  <p key={idx} className="first-of-type:text-lg first-of-type:text-rose-pink/90 first-of-type:font-normal">
                    {p}
                  </p>
                ))}
              </div>

              {/* SEO validation notification footer */}
              <div className="mt-12 p-5 rounded-2xl bg-[#943f29] border border-white/10 flex items-start gap-4">
                <CheckCircle2 size={20} className="text-[#EF3B33] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white leading-none font-sans">Local SEO Schema Complete</h4>
                  <p className="text-[11px] text-white/60 mt-1.5 leading-relaxed font-sans font-light">
                    This article is indexable for search terms in Jharkhand. Ready for custom publishing, newsletter lists, and social bio-link integrations.
                  </p>
                </div>
              </div>

              {/* Close Button top-right */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-orange-brand/20 border border-white/10 hover:border-orange-brand text-white rounded-full transition-all duration-300 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
