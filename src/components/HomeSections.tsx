import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Compass, 
  PenTool, 
  Target, 
  Search, 
  Award, 
  ArrowRight,
  Calendar,
  BookOpen,
  BarChart3,
  Zap,
  Clock,
  ExternalLink,
  EyeOff,
  Video,
  Play
} from 'lucide-react';
export { FAQSection } from './FAQSection';

// --- Medium Icon Helper ---
const MediumIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

// ==========================================
// 1. FEATURED SERVICES
// ==========================================
export const FeaturedServices = () => {
  const services = [
    {
      id: "smm",
      icon: Users,
      title: "Social Media Management",
      desc: "Full-scale handling of your profiles, ensuring visual consistency, optimal publishing, and active community growth.",
    },
    {
      id: "content-strategy",
      icon: Compass,
      title: "Content Strategy",
      desc: "Funnel-based planning mapped precisely to your business objectives to capture high-retention audience attention.",
    },
    {
      id: "content-writing",
      icon: PenTool,
      title: "Content Writing",
      desc: "High-converting captions, persuasive blog articles, and engaging video scripts tailored to tell your story.",
    },
    {
      id: "meta-ads",
      icon: Target,
      title: "Meta Ads",
      desc: "Laser-targeted campaigns on Instagram & Facebook designed to maximize lead acquisition and amplify ROI.",
    },
    {
      id: "personal-branding",
      icon: Award,
      title: "Personal Branding",
      desc: "Positioning founders and executives as industry authorities with high-impact organic thought leadership content.",
    }
  ];

  return (
    <section id="services" className="py-24 px-4 sm:px-6 md:px-8 lg:px-10 bg-transparent scroll-mt-20 relative border-t border-white/5">
      {/* Dynamic Grid Background Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(253,161,162,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(253,161,162,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      {/* Cinematic soft glow leaks */}
      <div className="absolute top-1/4 left-1/4 w-[35%] h-[35%] bg-[#FDA1A2]/[0.025] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35%] h-[35%] bg-[#EF3B33]/[0.02] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1720px] mx-auto w-full z-10 relative">
        <div className="text-center mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.45em] font-black text-rose-pink block mb-3"
          >
            OUR CORE EXPERTISE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-medium tracking-tight"
          >
            Featured Services
          </motion.h2>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-orange-brand/50 to-transparent w-40 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                y: -10, 
                borderColor: "rgba(239, 59, 51, 0.4)",
                boxShadow: "0 20px 40px -15px rgba(239, 59, 51, 0.25)"
              }}
              className="group p-8 sm:p-10 bg-blackcurrant/40 backdrop-blur-md border border-white/10 rounded-[2rem] transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-[0_15px_35px_-10px_rgba(0,0,0,0.4)]"
            >
              <div>
                <div className="w-14 h-14 bg-orange-brand/10 border border-orange-brand/20 rounded-2xl flex items-center justify-center text-orange-brand mb-8 group-hover:bg-orange-brand group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-md">
                  <service.icon size={24} strokeWidth={1.5} />
                </div>
                
                <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-rose-pink transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-sm font-sans text-white/70 leading-relaxed font-light mb-8">
                  {service.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5">
                <Link to="/about">
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-orange-brand/10 text-white hover:bg-orange-brand border border-orange-brand/20 hover:border-orange-brand px-5 py-3.5 text-[9px] uppercase font-black tracking-[0.25em] flex items-center justify-center gap-2 rounded-xl transition-all duration-300 font-sans cursor-pointer"
                  >
                    Learn More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 2. FEATURED WORK
// ==========================================
export const FeaturedWork = () => {
  const navigate = useNavigate();
  const projects = [
    {
      title: "Instagram Growth Framework",
      badge: "Social Systems",
      desc: "Audience growth, profile optimization, engagement systems, and content strategy for long-term brand visibility.",
      coverImage: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800",
      link: "/work/instagram-growth-framework"
    },
    {
      title: "SEO Growth Strategy",
      badge: "Organic Traffic",
      desc: "Comprehensive keyword research, content mapping, and organic visibility optimization designed to improve search rankings.",
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      link: "/work/seo-growth-strategy"
    },
    {
      title: "Meta Ads Campaign",
      badge: "Paid Acquisition",
      desc: "Strategic advertising campaigns focused on audience targeting, creative testing, and conversion optimization.",
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      link: "/work/meta-ads-campaign"
    },
    {
      title: "Video Editing & Content",
      badge: "Video Production",
      desc: "Short-form video editing, rhythmic pacing, kinetic typography, and motion storytelling for high viewer retention.",
      coverImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800",
      link: "/work/video-editing-content"
    }
  ];

  return (
    <section id="work" className="py-24 px-4 sm:px-6 md:px-8 lg:px-10 bg-transparent scroll-mt-20 relative border-t border-white/5">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FDA1A2]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1720px] mx-auto w-full z-10 relative">
        <div className="text-center mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.45em] font-black text-[#EF3B33] block mb-3"
          >
            PORTFOLIO HIGHLIGHTS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-medium tracking-tight"
          >
            Featured Work
          </motion.h2>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#EF3B33]/50 to-transparent w-40 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px -15px rgba(239, 59, 51, 0.2)",
                borderColor: "rgba(239, 59, 51, 0.3)"
              }}
              className="group relative flex flex-col justify-between h-full bg-[#0F0B26]/30 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 p-6 sm:p-8 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.4)]"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 mb-6 bg-black/20">
                  <img 
                    src={project.coverImage} 
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0B26]/90 via-[#EF3B33]/5 to-transparent opacity-80" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#1D1842]/80 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-[#FDA1A2]">{project.badge}</span>
                  </div>
                </div>

                <h3 className="text-xl font-serif text-white mb-3 font-medium tracking-tight">
                  {project.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
                  {project.desc}
                </p>
              </div>

              <motion.button 
                onClick={() => navigate(project.link)}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#EF3B33]/10 text-white hover:bg-[#EF3B33] border border-[#EF3B33]/20 hover:border-[#EF3B33] px-5 py-3.5 text-[9px] uppercase font-black tracking-[0.25em] flex items-center justify-center gap-2 rounded-xl transition-all duration-300 font-sans cursor-pointer mt-auto"
              >
                VIEW CASE STUDY <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* View All Work Link */}
        <div className="text-center mt-12">
          <Link 
            to="/work" 
            className="inline-flex items-center gap-2.5 px-6 py-3 border border-white/10 hover:border-[#EF3B33]/40 rounded-full bg-white/[0.01] hover:bg-[#EF3B33]/5 text-xs uppercase font-black tracking-widest text-white/80 hover:text-white transition-all duration-300 cursor-pointer shadow-lg"
          >
            <span>View All Work</span>
            <ArrowRight size={14} className="text-[#EF3B33]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 3. WHY WORK WITH ME
// ==========================================
export const WhyWorkWithMe = () => {
  const strengths = [
    {
      icon: Calendar,
      title: "Strategic Content Planning",
      desc: "No guess-work or random updates. Every single post, image, and caption is mapped inside an aesthetic, conversion-oriented content funnel."
    },
    {
      icon: BookOpen,
      title: "Creative Brand Storytelling",
      desc: "Combining high-retention cinematic visuals with copy that sounds authentic to build long-term brand equity and customer relationships."
    },
    {
      icon: BarChart3,
      title: "Performance-Driven Marketing",
      desc: "Deep focus on lead generation, conversion optimization, and measurable client results over empty vanity metrics."
    },
    {
      icon: Zap,
      title: "Consistent Social Media Growth",
      desc: "Proven execution methodologies designed to grow active, highly interactive organic communities around your brand footprint."
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 md:px-8 lg:px-10 bg-transparent scroll-mt-20 relative border-t border-white/5">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#EF3B33]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1720px] mx-auto w-full z-10 relative">
        <div className="text-center mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.45em] font-black text-[#EF3B33] block mb-3"
          >
            THE STRATEGIC ADVANTAGE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-medium tracking-tight"
          >
            Why Work With Me
          </motion.h2>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#EF3B33]/50 to-transparent w-40 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {strengths.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, borderColor: "rgba(239, 59, 51, 0.2)" }}
              className="group p-8 sm:p-10 bg-[#0F0B26]/30 backdrop-blur-md border border-white/10 rounded-[2.5rem] transition-all duration-300 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)] flex gap-6 items-start"
            >
              <div className="w-12 h-12 bg-[#EF3B33]/10 border border-[#EF3B33]/20 rounded-xl flex items-center justify-center text-[#EF3B33] shrink-0 group-hover:bg-[#EF3B33] group-hover:text-white transition-all duration-300">
                <item.icon size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-white mb-2.5 font-medium group-hover:text-[#FDA1A2] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm font-sans text-white/70 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


// ==========================================
// 4. LATEST INSIGHTS
// ==========================================
export const LatestInsights = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Hidden articles logic
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
      link: "https://medium.com/@rupsah800/the-seo-playbook-just-got-rewritten-64024cabc7ae",
      alt: "SEO playbook rewritten after Google May 2026 Core Update and AI search overhaul",
      platform: "Medium"
    }
  ];

  useEffect(() => {
    let active = true;
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/medium");
        if (!response.ok) {
          throw new Error("Failed to fetch RSS data");
        }
        const data = await response.json();
        if (data.success && data.articles && data.articles.length > 0) {
          if (active) {
            // Filter out duplicates
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
          throw new Error("Empty feed or invalid format");
        }
      } catch (err) {
        console.error("LatestInsights fetch failed:", err);
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

  // Filter out hidden articles for regular visitors, show top 3
  const displayedArticles = articles
    .filter(article => !hiddenArticleIds.includes(String(article.id)))
    .slice(0, 3);

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 md:px-8 lg:px-10 bg-transparent scroll-mt-20 relative border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#EF3B33]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1720px] mx-auto w-full z-10 relative">
        <div className="text-center mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.45em] font-black text-[#EF3B33] block mb-3"
          >
            LATEST PUBLICATIONS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-medium tracking-tight"
          >
            Latest Insights
          </motion.h2>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#EF3B33]/50 to-transparent w-40 mx-auto mt-6" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 h-[450px] animate-pulse flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] bg-white/5 rounded-2xl mb-6" />
                  <div className="h-4 bg-white/10 rounded w-1/4 mb-3" />
                  <div className="h-6 bg-white/10 rounded w-3/4 mb-4" />
                  <div className="h-3 bg-white/5 rounded w-full mb-2" />
                  <div className="h-3 bg-white/5 rounded w-2/3" />
                </div>
                <div className="h-12 bg-white/5 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : displayedArticles.length === 0 ? (
          <div className="text-center py-16 max-w-xl mx-auto bg-white/[0.01] border border-white/5 rounded-2xl p-8">
            <EyeOff size={40} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/60 text-sm font-sans font-light">
              No Medium articles are set to be visible at this time. Check back soon for new publications!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  {/* Image */}
                  {article.image && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 mb-6 bg-black/20">
                      <img 
                        src={article.image} 
                        alt={article.alt || article.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0B26]/90 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Badge overlay */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1D1842]/80 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                          <MediumIcon className="w-3 h-3 text-[#FDA1A2]" />
                          <span className="text-[9px] uppercase tracking-wider font-bold text-[#FDA1A2]">
                            {article.category.split('•')[0].trim()}
                          </span>
                        </div>
                      </div>
                      
                      {/* Reading time overlay inside */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-[8px] uppercase font-black tracking-widest text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-md border border-white/5">
                        <Clock size={10} className="text-[#FDA1A2]" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  )}

                  {/* Text Details */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-white/40 block">
                        {article.date}
                      </span>
                      <span className="text-white/20 text-xs">•</span>
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-[#FDA1A2] bg-[#EF3B33]/10 border border-[#EF3B33]/20 rounded px-1.5 py-0.5">
                        Medium
                      </span>
                    </div>
                    <h3 className="font-serif text-xl text-white mb-4 font-medium leading-snug group-hover:text-[#FDA1A2] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm font-sans text-white/70 leading-relaxed font-light line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

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

        {/* View All Articles Link */}
        <div className="text-center mt-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2.5 px-6 py-3 border border-white/10 hover:border-[#EF3B33]/40 rounded-full bg-white/[0.01] hover:bg-[#EF3B33]/5 text-xs uppercase font-black tracking-widest text-white/80 hover:text-white transition-all duration-300 cursor-pointer shadow-lg"
          >
            <span>View All Articles</span>
            <ArrowRight size={14} className="text-[#EF3B33]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 6. FINAL CALL TO ACTION
// ==========================================
export const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 md:px-8 lg:px-10 bg-transparent relative border-t border-white/5 overflow-hidden">
      {/* Immersive glow background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#EF3B33]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-12 left-12 w-48 h-48 bg-[#FDA1A2]/3 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[0.45em] font-black text-[#EF3B33] block mb-4"
        >
          START A PROJECT
        </motion.span>

        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif text-white font-medium tracking-tight leading-tight mb-6"
        >
          Let's Build Your Brand Together
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-sm sm:text-base md:text-lg font-sans font-light text-white/70 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Whether you're launching a new brand or scaling an existing one, let's create content that drives real business growth.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary Action */}
          <button 
            onClick={() => navigate('/contact')}
            className="w-full sm:w-auto px-8 py-4 bg-[#EF3B33] hover:bg-[#D9352F] text-white uppercase text-[10px] font-black tracking-[0.25em] rounded-xl hover:shadow-[0_15px_30px_-5px_rgba(239,59,51,0.3)] transition-all duration-300 border-none cursor-pointer"
          >
            Get In Touch
          </button>

          {/* Secondary Action */}
          <button 
            onClick={() => navigate('/work')}
            className="w-full sm:w-auto px-8 py-4 bg-white/[0.02] hover:bg-white/[0.05] text-white border border-white/10 hover:border-white/30 uppercase text-[10px] font-black tracking-[0.25em] rounded-xl transition-all duration-300 cursor-pointer"
          >
            View My Work
          </button>
        </motion.div>
      </div>
    </section>
  );
};
