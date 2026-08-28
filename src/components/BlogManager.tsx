import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Clock, 
  ArrowLeft, 
  Settings, 
  AlertCircle, 
  Check, 
  X,
  ExternalLink
} from 'lucide-react';

const MediumIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

export const BlogManager = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'visible' | 'hidden'>('all');
  const [showNotification, setShowNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Load hidden article IDs from localStorage
  const [hiddenArticleIds, setHiddenArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("medium_hidden_articles");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Save visibility preferences on change
  useEffect(() => {
    localStorage.setItem("medium_hidden_articles", JSON.stringify(hiddenArticleIds));
  }, [hiddenArticleIds]);

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
        setIsLoading(true);
        const response = await fetch("/api/medium");
        if (!response.ok) {
          throw new Error(`Error fetching articles: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.success && data.articles && data.articles.length > 0) {
          if (active) {
            // Remove duplicates reliably
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
        console.error("Medium RSS fetch failed on manager page:", err);
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

  // Set transient notification
  const triggerNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setShowNotification({ message, type });
    setTimeout(() => {
      setShowNotification(null);
    }, 3000);
  };

  const toggleArticleVisibility = (id: string) => {
    const strId = String(id);
    const isCurrentlyHidden = hiddenArticleIds.includes(strId);
    
    if (isCurrentlyHidden) {
      setHiddenArticleIds(prev => prev.filter(item => item !== strId));
      triggerNotification("Article is now visible on the website.");
    } else {
      setHiddenArticleIds(prev => [...prev, strId]);
      triggerNotification("Article has been hidden from the website.");
    }
  };

  const showAllArticles = () => {
    setHiddenArticleIds([]);
    triggerNotification("All articles are now visible on the website.");
  };

  const hideAllArticles = () => {
    const allIds = articles.map(a => String(a.id));
    setHiddenArticleIds(allIds);
    triggerNotification("All articles have been hidden from the website.");
  };

  // Filter articles based on search and visibility
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isHidden = hiddenArticleIds.includes(String(article.id));
    if (filterType === 'visible') return matchesSearch && !isHidden;
    if (filterType === 'hidden') return matchesSearch && isHidden;
    return matchesSearch;
  });

  const visibleCount = articles.filter(a => !hiddenArticleIds.includes(String(a.id))).length;
  const hiddenCount = articles.length - visibleCount;

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 md:px-8 lg:px-10 min-h-screen relative z-10 max-w-[1720px] mx-auto w-full">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EF3B33]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Header and Back navigation */}
      <div className="max-w-6xl mx-auto mb-10">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-white/50 hover:text-white transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog Page</span>
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 bg-[#EF3B33]/10 border border-[#EF3B33]/20 rounded-xl text-[#EF3B33]">
                <Settings size={20} className="animate-spin-slow" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.45em] font-black text-[#EF3B33]">
                CONTROL CENTER
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif text-white font-medium tracking-tight">
              Blog Feed Manager
            </h1>
            <p className="text-xs sm:text-sm font-sans font-light tracking-wide text-white/60 max-w-2xl mt-3 leading-relaxed">
              Decide which articles from your Medium RSS feed appear on your website. Hidden articles remain accessible inside this manager panel and are not deleted from Medium.
            </p>
          </div>
          
          <div className="text-[10px] text-white/40 font-mono flex flex-col sm:items-end gap-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
            <div>MEDIUM PROFILE: <a href="https://medium.com/@rupsah800" target="_blank" rel="noopener noreferrer" className="text-[#FDA1A2] hover:underline inline-flex items-center gap-1">@rupsah800 <ExternalLink size={10} /></a></div>
            <div>FEED SOURCE: <a href="https://medium.com/feed/@rupsah800" target="_blank" rel="noopener noreferrer" className="text-[#FDA1A2] hover:underline inline-flex items-center gap-1">RSS FEED <ExternalLink size={10} /></a></div>
          </div>
        </div>
      </div>

      {/* Top Banner Notice */}
      <div className="max-w-6xl mx-auto mb-10 bg-white/[0.01] border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <AlertCircle size={20} className="text-[#FDA1A2] shrink-0 mt-0.5 sm:mt-0" />
        <p className="text-xs text-white/70 font-sans font-light leading-relaxed">
          <strong>Security Note:</strong> This manager is completely hidden from normal website navigation and is designed only for your personal admin use. Your settings are instantly applied and persist through local browser storage.
        </p>
      </div>

      {/* Stats Cards Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#EF3B33]/5 rounded-bl-full pointer-events-none" />
          <div className="text-xs font-mono text-white/40 uppercase tracking-wider">Total Articles</div>
          <div className="text-4xl font-serif font-semibold text-white mt-2">
            {isLoading ? "..." : articles.length}
          </div>
          <div className="text-[10px] text-white/50 mt-2 font-mono">Synchronized with Medium RSS</div>
        </div>
        
        <div className="bg-green-500/[0.02] border border-green-500/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-bl-full pointer-events-none" />
          <div className="text-xs font-mono text-green-400/60 uppercase tracking-wider">Visible on Website</div>
          <div className="text-4xl font-serif font-semibold text-green-400 mt-2">
            {isLoading ? "..." : visibleCount}
          </div>
          <div className="text-[10px] text-green-400/50 mt-2 font-mono">Displayed to website visitors</div>
        </div>

        <div className="bg-red-500/[0.02] border border-red-500/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none" />
          <div className="text-xs font-mono text-red-400/60 uppercase tracking-wider">Hidden from Website</div>
          <div className="text-4xl font-serif font-semibold text-red-400 mt-2">
            {isLoading ? "..." : hiddenCount}
          </div>
          <div className="text-[10px] text-red-400/50 mt-2 font-mono">Retained in manager dashboard</div>
        </div>
      </div>

      {/* Control Actions & Filtering bar */}
      <div className="max-w-6xl mx-auto bg-white/[0.01] border border-white/5 backdrop-blur-md rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-6 justify-between items-center relative z-20">
        <div className="w-full md:max-w-md">
          <input 
            type="text"
            placeholder="Search articles by title, excerpt or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 focus:border-[#EF3B33] rounded-xl text-white text-xs placeholder:text-white/30 focus:outline-none transition-colors font-sans"
          />
        </div>
        
        <div className="flex flex-wrap gap-4 w-full md:w-auto justify-between md:justify-end items-center">
          {/* Visibility filters */}
          <div className="flex bg-white/[0.02] border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg text-[10px] uppercase font-black tracking-widest transition-all cursor-pointer ${
                filterType === 'all' 
                  ? 'bg-white/10 text-white shadow-md' 
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('visible')}
              className={`px-4 py-2 rounded-lg text-[10px] uppercase font-black tracking-widest transition-all cursor-pointer ${
                filterType === 'visible' 
                  ? 'bg-green-500/20 text-green-400 shadow-md' 
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              Visible
            </button>
            <button
              onClick={() => setFilterType('hidden')}
              className={`px-4 py-2 rounded-lg text-[10px] uppercase font-black tracking-widest transition-all cursor-pointer ${
                filterType === 'hidden' 
                  ? 'bg-red-500/20 text-red-400 shadow-md' 
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              Hidden
            </button>
          </div>

          {/* Bulk actions */}
          <div className="flex gap-2">
            <button
              onClick={showAllArticles}
              disabled={isLoading || articles.length === 0}
              className="px-4 py-3 bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 disabled:opacity-30 disabled:pointer-events-none rounded-xl text-[9px] uppercase font-black tracking-widest transition-all cursor-pointer"
            >
              Show All
            </button>
            <button
              onClick={hideAllArticles}
              disabled={isLoading || articles.length === 0}
              className="px-4 py-3 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 disabled:opacity-30 disabled:pointer-events-none rounded-xl text-[9px] uppercase font-black tracking-widest transition-all cursor-pointer"
            >
              Hide All
            </button>
          </div>
        </div>
      </div>

      {/* Main Panel loading/error state */}
      <div className="max-w-6xl mx-auto">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 animate-pulse">
                <div className="w-full md:w-44 aspect-[16/10] bg-white/5 rounded-xl shrink-0" />
                <div className="flex-1 space-y-3 py-1">
                  <div className="h-4 bg-white/10 rounded w-1/4" />
                  <div className="h-6 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/5 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : isError && articles.length === 3 ? (
          <div className="mb-6 bg-white/[0.01] border border-[#EF3B33]/20 rounded-2xl p-5 text-center">
            <p className="text-xs font-mono text-white/50 uppercase">
              ⚠️ Live Feed Unreachable. Displaying local cache for custom setup.
            </p>
          </div>
        ) : null}

        {/* Empty Search / Filter results */}
        {!isLoading && filteredArticles.length === 0 && (
          <div className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-2xl p-8">
            <EyeOff size={40} className="text-white/20 mx-auto mb-4" />
            <h3 className="text-base text-white/80 font-serif font-medium mb-1">No Articles Found</h3>
            <p className="text-xs text-white/50 max-w-md mx-auto leading-relaxed">
              No articles match your current search query or visibility filter. Try adjusting your filter parameters.
            </p>
          </div>
        )}

        {/* Articles Management Table/List */}
        {!isLoading && filteredArticles.length > 0 && (
          <div className="space-y-6">
            {filteredArticles.map((article, index) => {
              const isHidden = hiddenArticleIds.includes(String(article.id));
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className={`bg-white/[0.01] border hover:bg-white/[0.02] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center transition-all duration-300 relative overflow-hidden ${
                    isHidden 
                      ? 'border-dashed border-red-500/20 opacity-60 saturate-50 hover:opacity-90' 
                      : 'border-white/10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]'
                  }`}
                >
                  {/* Article Thumbnail */}
                  {article.image ? (
                    <div className="relative w-full md:w-52 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black/20 shrink-0">
                      <img 
                        src={article.image} 
                        alt={article.alt || article.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  ) : (
                    <div className="w-full md:w-52 aspect-[16/10] bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center justify-center p-4 shrink-0">
                      <MediumIcon className="w-8 h-8 text-white/20 mb-2" />
                      <span className="text-[8px] uppercase tracking-wider text-white/40 font-mono">No Thumbnail</span>
                    </div>
                  )}

                  {/* Text Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                      <span className="text-[10px] text-white/40 font-mono uppercase">{article.date}</span>
                      <span className="text-white/20 text-xs">•</span>
                      <span className="text-[8px] uppercase tracking-wider font-extrabold text-[#FDA1A2] bg-[#EF3B33]/10 border border-[#EF3B33]/20 rounded px-2 py-0.5">
                        {article.category.split('•')[0].trim()}
                      </span>
                      <span className="text-white/20 text-xs">•</span>
                      <div className="flex items-center gap-1 text-[8px] text-white/50 font-mono uppercase">
                        <Clock size={10} className="text-[#FDA1A2]" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h2 className="font-serif text-lg sm:text-xl text-white font-medium mb-3 leading-snug">
                      {article.title}
                    </h2>
                    
                    <p className="text-xs font-sans text-white/60 leading-relaxed font-light line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Actions column */}
                  <div className="w-full md:w-auto shrink-0 flex flex-row md:flex-col gap-3 items-center md:items-end justify-between md:justify-center border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${isHidden ? 'bg-red-500 shadow-[0_0_10px_rgba(239,59,51,0.5)]' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'}`} />
                      <span className={`text-[10px] uppercase font-mono tracking-widest ${isHidden ? 'text-red-400' : 'text-green-400'}`}>
                        {isHidden ? 'Hidden' : 'Visible'}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleArticleVisibility(article.id)}
                        className={`px-4 py-2.5 rounded-xl text-[9px] uppercase font-black tracking-widest transition-all duration-300 cursor-pointer flex items-center gap-2 border ${
                          isHidden 
                            ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20' 
                            : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                        }`}
                      >
                        {isHidden ? (
                          <>
                            <Eye size={12} />
                            <span>Unhide</span>
                          </>
                        ) : (
                          <>
                            <EyeOff size={12} />
                            <span>Hide Post</span>
                          </>
                        )}
                      </button>

                      <a 
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2.5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 rounded-xl text-white/70 hover:text-white transition-colors cursor-pointer flex items-center"
                        title="View original post on Medium"
                      >
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Persistent Toast Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          className="fixed bottom-10 left-1/2 z-50 px-6 py-4 bg-[#0F0B26] border border-white/15 text-white rounded-2xl shadow-2xl flex items-center gap-3 font-sans text-xs tracking-wide"
        >
          <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30">
            <Check size={12} />
          </div>
          <span>{showNotification.message}</span>
        </motion.div>
      )}
    </div>
  );
};
