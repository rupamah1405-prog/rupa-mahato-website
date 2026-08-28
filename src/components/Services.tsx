import React from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, 
  Instagram, 
  Compass, 
  Search, 
  Calendar, 
  TrendingUp, 
  BarChart3, 
  Target, 
  Users 
} from 'lucide-react';

export const Services = () => {
  const services = [
    {
      id: "smm",
      icon: MessageSquare,
      title: "Social Media Management",
      desc: "Comprehensive oversight of your digital footprint, ensuring consistent branding, active publishing schedules, and premium organic content distribution.",
      bulletPoints: ["Content scheduling", "Cross-platform synergy", "Brand voice alignment"]
    },
    {
      id: "ig-marketing",
      icon: Instagram,
      title: "Instagram Marketing",
      desc: "Tailored strategies designed specifically for Instagram growth. I help businesses turn profile visitors into active, high-converting buyers.",
      bulletPoints: ["Profile optimization", "Reel campaign design", "Viral potential blueprints"]
    },
    {
      id: "content-strategy",
      icon: Compass,
      title: "Content Strategy",
      desc: "High-end content plans aligned with your key business goals, mapping out the precise media elements required to capture modern attention.",
      bulletPoints: ["Editorial calendars", "Visual identity guides", "Funnel-based storyboarding"]
    },
    {
      id: "ig-seo",
      icon: Search,
      title: "Instagram SEO",
      desc: "Optimizing your captions, bio, tags, and profile metadata to rank high on natural keyword searches within Jamshedpur and beyond.",
      bulletPoints: ["Keyword research", "Alt text configuration", "Search index optimization"]
    },
    {
      id: "content-planning",
      icon: Calendar,
      title: "Content Planning",
      desc: "Building seamless monthly and quarterly content architectures that take the guesswork out of social publishing.",
      bulletPoints: ["Pre-planned asset sheets", "Hook & script templates", "Batch-creation frameworks"]
    },
    {
      id: "brand-growth",
      icon: TrendingUp,
      title: "Brand Growth",
      desc: "Nurturing long-term brand equity of local businesses in Jamshedpur using performance-oriented organic scalability methods.",
      bulletPoints: ["Audience market sizing", "Strategic partnerships", "Competitor gap analysis"]
    },
    {
      id: "analytics-reporting",
      icon: BarChart3,
      title: "Analytics & Reporting",
      desc: "Data-driven post-campaign reports detailing key growth metrics, reach figures, conversion percentages, and future iterations.",
      bulletPoints: ["Monthly metrics decks", "ROI checkups", "Conversion optimization"]
    },
    {
      id: "meta-ads",
      icon: Target,
      title: "Meta Ads",
      desc: "Targeted advertising funnels across Instagram and Facebook to fast-track leads, boost local visibility, and amplify campaign ROI.",
      bulletPoints: ["Ad creative design", "Precise local targeting", "Retargeting sequences"]
    },
    {
      id: "community-management",
      icon: Users,
      title: "Community Management",
      desc: "Active community engagement to cultivate brand advocacy, responding to feedback, and building a loyal local following in Jharkhand.",
      bulletPoints: ["Active inbox triage", "Comment thread stewardship", "Engagement amplification"]
    }
  ];

  return (
    <section id="services" className="pt-24 pb-28 px-8 md:px-16 bg-transparent scroll-mt-20 relative border-t border-white/5">
      {/* Dynamic Grid Background Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(253,161,162,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(253,161,162,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      {/* Cinematic soft glow leaks */}
      <div className="absolute top-1/4 left-1/4 w-[35%] h-[35%] bg-rose-pink/[0.025] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35%] h-[35%] bg-[#EF3B33]/[0.02] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* local SEO Optimized Section Header */}
        <div className="max-w-5xl mx-auto text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.45em] font-black text-rose-pink block mb-4"
          >
            EXPERTISE & SOLUTIONS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-[4vw] font-serif text-white leading-tight font-medium"
          >
            Social Media Marketing Services in Jamshedpur
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            className="text-white/80 font-sans text-sm md:text-base mt-4 max-w-3xl mx-auto font-light"
          >
            Premium, metrics-driven organic and paid strategies perfectly customized to scale your Brand presence, audience relationship, and local business leads.
          </motion.p>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-orange-brand/50 to-transparent w-40 mx-auto mt-8" />
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                y: -10, 
                borderColor: "rgba(239, 59, 51, 0.4)",
                boxShadow: "0 20px 40px -15px rgba(239, 59, 51, 0.25)"
              }}
              className="relative group p-10 bg-blackcurrant/40 backdrop-blur-md border border-white/10 rounded-[2rem] transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-[0_15px_35px_-10px_rgba(0,0,0,0.4)]"
            >
              <div>
                {/* Icon wrapper with glow effect */}
                <div className="w-14 h-14 bg-orange-brand/10 border border-orange-brand/20 rounded-2xl flex items-center justify-center text-orange-brand mb-8 group-hover:bg-orange-brand group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-md">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                
                <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-rose-pink transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-sm font-sans text-white/70 leading-relaxed font-light mb-8">
                  {item.desc}
                </p>
              </div>

              <div>
                <div className="h-px bg-white/10 w-full mb-6" />
                <ul className="space-y-2.5">
                  {item.bulletPoints.map((pt, pi) => (
                    <li key={pi} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-pink/40 group-hover:bg-orange-brand transition-colors" />
                      <span className="text-[10px] uppercase tracking-wider font-bold text-white/80 group-hover:text-white transition-colors">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decorative subtle scanning line effect */}
              <motion.div 
                className="absolute inset-x-0 bottom-0 h-[2px] bg-orange-brand/10 z-10 opacity-0 group-hover:opacity-100"
                animate={{ translateY: ['0px', '-360px', '0px'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
