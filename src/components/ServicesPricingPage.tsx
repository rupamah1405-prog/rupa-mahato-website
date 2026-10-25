import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  Share2, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Edit3, 
  RotateCcw, 
  Plus, 
  Trash2, 
  AlertCircle,
  Info,
  CreditCard,
  Video,
  MessageSquare,
  FileText,
  MapPin,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';

export interface PricingTier {
  id: string;
  tierLabel: string;
  planName: string;
  shortDesc: string;
  price: string;
  frequency: string;
  isPopular?: boolean;
  includedServices: string[];
}

export interface ServiceCategory {
  id: 'smm' | 'meta-ads';
  name: string;
  badge: string;
  description: string;
  adSpendNote?: string;
  tiers: PricingTier[];
}

export const JHARKHAND_STARTER_PACKAGES: ServiceCategory[] = [
  {
    id: 'smm',
    name: 'Social Media Management',
    badge: 'ORGANIC BRAND PRESENCE & ENGAGEMENT',
    description: 'Consistent, aesthetic, and algorithm-friendly social media management designed to build community, establish brand authority, and grow your local presence in Jharkhand.',
    tiers: [
      {
        id: 'smm-basic',
        tierLabel: 'Starter • 1 Platform',
        planName: 'Basic',
        shortDesc: 'Essential monthly presence for small businesses starting out on Instagram or Facebook.',
        price: '₹1,799',
        frequency: '/month',
        isPopular: false,
        includedServices: [
          '1 platform: Instagram or Facebook',
          '6 posts per month',
          'Captions and hashtags',
          'Monthly content calendar',
          'Post scheduling',
          '1 monthly performance summary'
        ]
      },
      {
        id: 'smm-growth',
        tierLabel: 'Most Popular • 1 Platform',
        planName: 'Growth',
        shortDesc: 'Engaging presence combining regular posts and video reels on Instagram or Facebook.',
        price: '₹3,799',
        frequency: '/month',
        isPopular: true,
        includedServices: [
          '1 platform: Instagram or Facebook',
          '10 posts and 3 reels per month',
          'Captions and hashtags',
          'Monthly content calendar',
          'Post scheduling',
          '1 monthly performance report',
          'Client provides the raw videos for reels'
        ]
      },
      {
        id: 'smm-premium',
        tierLabel: 'Dual-Platform • Comprehensive',
        planName: 'Premium',
        shortDesc: 'Multi-platform management across Instagram & Facebook with frequent posts and reels.',
        price: '₹5,799',
        frequency: '/month',
        isPopular: false,
        includedServices: [
          'Instagram and Facebook',
          '12 posts and 6 reels per month',
          'Captions and hashtags',
          'Content planning and post scheduling',
          'Basic comment replies',
          '1 monthly performance report',
          'Client provides the raw videos for reels'
        ]
      }
    ]
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads Management',
    badge: 'PAID PERFORMANCE & LEAD GENERATION',
    description: 'Targeted advertising funnels across Instagram and Facebook engineered to generate customer inquiries, orders, and qualified leads without wasting ad budget.',
    adSpendNote: 'Meta advertising spend is not included in these prices. The client pays Meta separately through their own ad account.',
    tiers: [
      {
        id: 'meta-basic',
        tierLabel: 'Starter Campaign',
        planName: 'Basic',
        shortDesc: 'Focused management of 1 campaign to jumpstart customer inquiries with weekly checks.',
        price: '₹1,299',
        frequency: '/month',
        isPopular: false,
        includedServices: [
          'Management of 1 campaign',
          'Setup of 1 audience',
          'Weekly checks',
          '1 monthly performance summary'
        ]
      },
      {
        id: 'meta-growth',
        tierLabel: 'Recommended for Growth',
        planName: 'Growth',
        shortDesc: 'Single-campaign optimization with audience testing, ad copy variations, and weekly optimization.',
        price: '₹2,799',
        frequency: '/month',
        isPopular: true,
        includedServices: [
          'Management of up to 1 campaign',
          'Audience testing',
          'Ad copy variations',
          'Weekly optimization',
          '1 monthly performance report'
        ]
      },
      {
        id: 'meta-premium',
        tierLabel: 'Multi-Campaign Scale',
        planName: 'Premium',
        shortDesc: 'Multi-campaign scaling for up to 2 campaigns with continuous audience and creative testing.',
        price: '₹4,299',
        frequency: '/month',
        isPopular: false,
        includedServices: [
          'Management of up to 2 campaigns',
          'Audience and creative testing',
          'Weekly optimization',
          '1 monthly performance report'
        ]
      }
    ]
  }
];

const STORAGE_KEY = 'rupa_portfolio_pricing_jharkhand_v5';

// Helper to render category icon safely without saving React components into JSON
const renderCategoryIcon = (categoryId: string) => {
  if (categoryId === 'smm') {
    return <Share2 size={18} className="text-[#FDA1A2]" />;
  }
  if (categoryId === 'meta-ads') {
    return <Target size={18} className="text-[#FDA1A2]" />;
  }
  return <Sparkles size={18} className="text-[#FDA1A2]" />;
};

export const ServicesPricingPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<'all' | 'smm' | 'meta-ads'>('all');
  
  // Safe initialization that avoids corrupt JSON or unhandled exceptions
  const [categories, setCategories] = useState<ServiceCategory[]>(() => {
    try {
      // Clear legacy keys if present
      localStorage.removeItem('rupa_portfolio_pricing_jharkhand_v4');
      localStorage.removeItem('rupa_portfolio_pricing_jharkhand_v3');
      localStorage.removeItem('rupa_portfolio_pricing_jharkhand_v2');
      localStorage.removeItem('rupa_portfolio_pricing_jharkhand_v1');
      
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          Array.isArray(parsed) && 
          parsed.length === 2 && 
          parsed.every(c => c && Array.isArray(c.tiers) && c.tiers.length >= 3)
        ) {
          return parsed;
        }
      }
    } catch {
      // Fallback on parse failure
    }
    return JHARKHAND_STARTER_PACKAGES;
  });

  // Inline editing state
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editingPriceValue, setEditingPriceValue] = useState<string>('');

  // Service item editing state
  const [editingService, setEditingService] = useState<{
    tierId: string;
    index: number;
    value: string;
  } | null>(null);

  // Sync to local storage safely
  const saveCategories = (newCategories: ServiceCategory[]) => {
    setCategories(newCategories);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCategories));
    } catch (err) {
      console.error('Failed to save pricing configuration', err);
    }
  };

  const handleResetToDefaults = () => {
    saveCategories(JHARKHAND_STARTER_PACKAGES);
    setEditingPriceId(null);
    setEditingService(null);
  };

  const handleStartEditPrice = (tier: PricingTier) => {
    setEditingPriceId(tier.id);
    setEditingPriceValue(tier.price);
  };

  const handleSavePrice = (categoryId: string, tierId: string) => {
    const trimmed = editingPriceValue.trim() || '₹0';
    const updated = categories.map((cat) => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        tiers: cat.tiers.map((t) => (t.id === tierId ? { ...t, price: trimmed } : t))
      };
    });
    saveCategories(updated);
    setEditingPriceId(null);
  };

  const handleStartEditService = (tierId: string, index: number, currentValue: string) => {
    setEditingService({ tierId, index, value: currentValue });
  };

  const handleSaveService = (categoryId: string, tierId: string) => {
    if (!editingService) return;
    const trimmed = editingService.value.trim() || 'Deliverable item';
    const updated = categories.map((cat) => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        tiers: cat.tiers.map((t) => {
          if (t.id !== tierId) return t;
          const nextServices = [...t.includedServices];
          nextServices[editingService.index] = trimmed;
          return { ...t, includedServices: nextServices };
        })
      };
    });
    saveCategories(updated);
    setEditingService(null);
  };

  const handleAddServiceItem = (categoryId: string, tierId: string) => {
    const updated = categories.map((cat) => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        tiers: cat.tiers.map((t) => {
          if (t.id !== tierId) return t;
          return {
            ...t,
            includedServices: [...t.includedServices, 'New deliverable item']
          };
        })
      };
    });
    saveCategories(updated);
  };

  const handleRemoveServiceItem = (categoryId: string, tierId: string, index: number) => {
    const updated = categories.map((cat) => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        tiers: cat.tiers.map((t) => {
          if (t.id !== tierId) return t;
          if (t.includedServices.length <= 1) return t;
          const nextServices = t.includedServices.filter((_, i) => i !== index);
          return { ...t, includedServices: nextServices };
        })
      };
    });
    saveCategories(updated);
    if (editingService && editingService.tierId === tierId && editingService.index === index) {
      setEditingService(null);
    }
  };

  // Safe fallback to guarantee at least default categories are displayed
  const safeCategories = (categories && categories.length > 0) ? categories : JHARKHAND_STARTER_PACKAGES;

  const filteredCategories = activeCategory === 'all' 
    ? safeCategories 
    : safeCategories.filter((cat) => cat.id === activeCategory);

  return (
    <div className="pt-28 md:pt-36 pb-28 px-4 sm:px-6 md:px-8 lg:px-12 relative min-h-screen text-white w-full">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(253,161,162,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(253,161,162,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />
      
      {/* Ambient glowing highlights */}
      <div className="absolute top-20 left-1/4 w-[40%] h-[40%] bg-[#EF3B33]/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[35%] h-[35%] bg-[#FDA1A2]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1720px] mx-auto w-full relative z-10">
        
        {/* Page Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EF3B33]/15 border border-[#EF3B33]/30 mb-5 shadow-sm"
          >
            <MapPin size={13} className="text-[#FDA1A2]" />
            <span className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-[#FDA1A2]">
              Starter Packages for Small Businesses in Jharkhand
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-white font-medium tracking-tight mb-6"
          >
            Services &amp; Pricing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-white/80 font-sans text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Affordable, transparent monthly packages tailored for small businesses in Jharkhand.
            All prices are shown in INR per month with clearly defined deliverables.
          </motion.p>

          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#EF3B33]/50 to-transparent w-44 mx-auto mt-8" />
        </div>

        {/* Category Switcher & Helper Controls */}
        <div className="flex flex-col items-center gap-4 mb-14 md:mb-16">
          {/* Category Tabs */}
          <div className="inline-flex p-1.5 bg-[#0F0B26]/85 backdrop-blur-md border border-white/10 rounded-2xl max-w-full overflow-x-auto shadow-2xl">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-[#EF3B33] to-[#B55239] text-white shadow-[0_0_20px_rgba(239,59,51,0.4)]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles size={14} className={activeCategory === 'all' ? 'text-white' : 'text-[#FDA1A2]'} />
              <span>All Packages</span>
            </button>

            <button
              onClick={() => setActiveCategory('smm')}
              className={`flex items-center gap-2.5 px-5 sm:px-7 py-3 rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeCategory === 'smm'
                  ? 'bg-gradient-to-r from-[#EF3B33] to-[#B55239] text-white shadow-[0_0_20px_rgba(239,59,51,0.4)]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Share2 size={16} className={activeCategory === 'smm' ? 'text-white' : 'text-[#FDA1A2]'} />
              <span>Social Media Management</span>
            </button>

            <button
              onClick={() => setActiveCategory('meta-ads')}
              className={`flex items-center gap-2.5 px-5 sm:px-7 py-3 rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeCategory === 'meta-ads'
                  ? 'bg-gradient-to-r from-[#EF3B33] to-[#B55239] text-white shadow-[0_0_20px_rgba(239,59,51,0.4)]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Target size={16} className={activeCategory === 'meta-ads' ? 'text-white' : 'text-[#FDA1A2]'} />
              <span>Meta Ads Management</span>
            </button>
          </div>

          {/* Quick Edit Notice & Reset Helper */}
          <div className="flex items-center gap-4 text-xs text-white/60 font-light mt-1 flex-wrap justify-center">
            <span className="flex items-center gap-1.5">
              <Edit3 size={13} className="text-[#FDA1A2]" />
              <span>Click on any price or deliverable to adjust in real-time</span>
            </span>
            <span className="text-white/20">•</span>
            <button
              onClick={handleResetToDefaults}
              className="text-white/50 hover:text-[#FDA1A2] underline flex items-center gap-1 transition-colors cursor-pointer text-xs"
              title="Reset all prices and services to default Jharkhand packages"
            >
              <RotateCcw size={11} />
              <span>Reset to default packages</span>
            </button>
          </div>
        </div>

        {/* Categories & Cards */}
        <div className="space-y-20">
          {filteredCategories.map((category) => {
            return (
              <section key={category.id} className="relative">
                {/* Category Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/10">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#EF3B33]/20 border border-[#EF3B33]/30 flex items-center justify-center">
                        {renderCategoryIcon(category.id)}
                      </div>
                      <span className="text-[10px] uppercase font-black tracking-[0.35em] text-[#FDA1A2]">
                        {category.badge}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-medium">
                      {category.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
                      {category.description}
                    </p>

                    {/* Notice for Meta Ads specifically */}
                    {category.adSpendNote && (
                      <div className="pt-2 flex items-start gap-2.5 text-xs text-[#FDA1A2] bg-[#EF3B33]/15 border border-[#EF3B33]/30 rounded-xl px-4 py-2.5 mt-2 shadow-sm">
                        <Info size={15} className="shrink-0 mt-0.5 text-[#FDA1A2]" />
                        <span><strong>Important Note:</strong> {category.adSpendNote}</span>
                      </div>
                    )}
                  </div>
                  <div className="hidden md:block">
                    <span className="text-[11px] font-sans text-white/50 uppercase tracking-widest font-medium">
                      3 Transparent Monthly Tiers
                    </span>
                  </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                  {category.tiers.map((tier, idx) => {
                    const isEditingThisPrice = editingPriceId === tier.id;
                    const isPopular = tier.isPopular;

                    return (
                      <motion.div
                        key={tier.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.08 }}
                        className={`relative rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 group ${
                          isPopular
                            ? 'bg-[#1D1842] border-2 border-[#EF3B33] shadow-[0_20px_50px_rgba(239,59,51,0.25)] md:-translate-y-2'
                            : 'bg-[#161233]/90 backdrop-blur-md border border-white/10 hover:border-[#EF3B33]/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1'
                        }`}
                      >
                        {/* Featured / Popular Badge */}
                        {isPopular && (
                          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                            <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#EF3B33] to-[#B55239] text-white text-[9px] font-black uppercase tracking-[0.25em] shadow-[0_4px_12px_rgba(239,59,51,0.4)] flex items-center gap-1.5 whitespace-nowrap">
                              <Sparkles size={11} />
                              Most Popular
                            </span>
                          </div>
                        )}

                        {/* Top Content: Tier Label, Name, Description */}
                        <div>
                          {/* Tier Label */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-[#FDA1A2]">
                              {tier.tierLabel}
                            </span>
                          </div>

                          {/* Plan Name */}
                          <h3 className="text-xl sm:text-2xl font-serif text-white font-medium mb-3">
                            {tier.planName}
                          </h3>

                          {/* Short Description */}
                          <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-6 min-h-[42px]">
                            {tier.shortDesc}
                          </p>

                          {/* Divider */}
                          <div className="h-px bg-white/10 w-full mb-6" />

                          {/* Price Block */}
                          <div className="mb-8">
                            <div className="flex items-baseline gap-2 mb-1.5 flex-wrap">
                              {isEditingThisPrice ? (
                                <div className="flex items-center gap-2 w-full">
                                  <input
                                    type="text"
                                    value={editingPriceValue}
                                    onChange={(e) => setEditingPriceValue(e.target.value)}
                                    placeholder="e.g. ₹2,500"
                                    autoFocus
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') handleSavePrice(category.id, tier.id);
                                      if (e.key === 'Escape') setEditingPriceId(null);
                                    }}
                                    className="bg-black/60 border border-[#EF3B33] rounded-lg px-3 py-1.5 text-xl font-serif text-white focus:outline-none focus:ring-1 focus:ring-[#EF3B33] w-full"
                                  />
                                  <button
                                    onClick={() => handleSavePrice(category.id, tier.id)}
                                    className="p-2 rounded-lg bg-[#EF3B33] text-white hover:bg-[#D9352F] transition-colors cursor-pointer"
                                    title="Save Price"
                                  >
                                    <Check size={16} />
                                  </button>
                                </div>
                              ) : (
                                <div 
                                  onClick={() => handleStartEditPrice(tier)}
                                  className="group/price flex items-baseline gap-2 cursor-pointer select-none"
                                  title="Click to edit price"
                                >
                                  <span className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
                                    {tier.price}
                                  </span>
                                  <span className="text-xs text-white/60 font-light">
                                    {tier.frequency}
                                  </span>
                                  <Edit3 
                                    size={13} 
                                    className="text-white/30 group-hover/price:text-[#FDA1A2] opacity-0 group-hover/price:opacity-100 transition-all ml-1" 
                                  />
                                </div>
                              )}
                            </div>
                            <span className="text-[10px] text-white/50 block font-light">
                              {category.id === 'meta-ads' 
                                ? 'Management fee only • Ad spend paid directly to Meta' 
                                : 'Transparent monthly package • Fixed deliverables'}
                            </span>
                          </div>

                          {/* Included Services List */}
                          <div className="space-y-3 mb-8">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[9px] font-sans font-black uppercase tracking-[0.25em] text-[#FDA1A2]">
                                What&apos;s Included
                              </span>
                              <button
                                onClick={() => handleAddServiceItem(category.id, tier.id)}
                                className="text-[10px] text-white/40 hover:text-[#FDA1A2] flex items-center gap-1 transition-colors cursor-pointer"
                                title="Add another deliverable"
                              >
                                <Plus size={11} />
                                <span>Add item</span>
                              </button>
                            </div>

                            <ul className="space-y-2.5">
                              {tier.includedServices.map((serviceItem, sIdx) => {
                                const isEditingThisService = 
                                  editingService?.tierId === tier.id && editingService?.index === sIdx;

                                return (
                                  <li 
                                    key={sIdx} 
                                    className="group/item flex items-start gap-2.5 text-xs sm:text-sm text-white/85 font-light leading-snug"
                                  >
                                    <div className="w-5 h-5 rounded-full bg-[#EF3B33]/15 border border-[#EF3B33]/30 text-[#FDA1A2] flex items-center justify-center shrink-0 mt-0.5">
                                      <Check size={11} strokeWidth={2.5} />
                                    </div>

                                    {isEditingThisService ? (
                                      <div className="flex items-center gap-1.5 flex-1">
                                        <input
                                          type="text"
                                          value={editingService.value}
                                          onChange={(e) => setEditingService({ ...editingService, value: e.target.value })}
                                          placeholder="Deliverable description"
                                          autoFocus
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSaveService(category.id, tier.id);
                                            if (e.key === 'Escape') setEditingService(null);
                                          }}
                                          className="bg-black/60 border border-[#EF3B33] rounded px-2 py-0.5 text-xs text-white focus:outline-none w-full"
                                        />
                                        <button
                                          onClick={() => handleSaveService(category.id, tier.id)}
                                          className="text-[#FDA1A2] hover:text-white p-1"
                                        >
                                          <Check size={13} />
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-between gap-2 flex-1">
                                        <span
                                          onClick={() => handleStartEditService(tier.id, sIdx, serviceItem)}
                                          className="cursor-pointer hover:text-white transition-colors flex-1"
                                          title="Click to edit deliverable"
                                        >
                                          {serviceItem}
                                        </span>
                                        <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                          <button
                                            onClick={() => handleStartEditService(tier.id, sIdx, serviceItem)}
                                            className="text-white/40 hover:text-[#FDA1A2] p-0.5 cursor-pointer"
                                            title="Edit deliverable"
                                          >
                                            <Edit3 size={11} />
                                          </button>
                                          {tier.includedServices.length > 1 && (
                                            <button
                                              onClick={() => handleRemoveServiceItem(category.id, tier.id, sIdx)}
                                              className="text-white/30 hover:text-[#EF3B33] p-0.5 cursor-pointer"
                                              title="Remove deliverable"
                                            >
                                              <Trash2 size={11} />
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>

                        {/* Card Bottom: Inquire / Contact Button */}
                        <div className="pt-4 border-t border-white/5">
                          <button
                            onClick={() => {
                              navigate('/contact', {
                                state: {
                                  service: category.name,
                                  plan: tier.planName,
                                  tier: `${tier.tierLabel} (${tier.price}${tier.frequency})`
                                }
                              });
                            }}
                            className={`w-full py-3.5 px-6 rounded-full uppercase text-[10px] font-black tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-sans ${
                              isPopular
                                ? 'bg-[#EF3B33] text-white hover:bg-[#D9352F] shadow-[0_4px_20px_rgba(239,59,51,0.35)] hover:scale-[1.02]'
                                : 'bg-white/5 hover:bg-[#EF3B33] border border-white/10 hover:border-[#EF3B33] text-white/90 hover:text-white hover:scale-[1.02]'
                            }`}
                          >
                            <span>Inquire for {tier.planName}</span>
                            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Dedicated "What Is NOT Included" Clarity Banner */}
        <div className="mt-24 max-w-5xl mx-auto rounded-[2rem] bg-[#161233]/95 border border-white/10 p-8 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#EF3B33]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EF3B33]/20 border border-[#EF3B33]/30 flex items-center justify-center text-[#FDA1A2]">
                <ShieldAlert size={20} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-[0.35em] text-[#FDA1A2] block">
                  Transparency First
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                  What&apos;s Not Included &amp; Ad Spend Guidelines
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              To keep our starter packages as affordable as possible for small businesses in Jharkhand, our monthly management fees cover campaign strategy, creative copywriting, scheduling, and performance monitoring. Please note the following service boundaries:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0F0B26]/70 border border-white/5 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#EF3B33]/15 text-[#FDA1A2] flex items-center justify-center shrink-0 mt-0.5">
                  <CreditCard size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Meta Advertising Spend</h4>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Meta advertising spend is <strong>not included</strong> in these prices. The client pays Meta separately through their own ad account.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0F0B26]/70 border border-white/5 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#EF3B33]/15 text-[#FDA1A2] flex items-center justify-center shrink-0 mt-0.5">
                  <Video size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Shoots, Media &amp; Influencer Fees</h4>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    On-site photo or video shoots, influencer fees, and paid stock are not included. The client provides raw photos and videos for reels.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0F0B26]/70 border border-white/5 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#EF3B33]/15 text-[#FDA1A2] flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Daily DM Handling</h4>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Daily DM handling is not included. Basic comment replies on posts are included in the Social Media Management Premium package.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0F0B26]/70 border border-white/5 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#EF3B33]/15 text-[#FDA1A2] flex items-center justify-center shrink-0 mt-0.5">
                  <FileText size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Work Beyond Deliverables</h4>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Work beyond the listed deliverables is not included. Custom branding, web design, or additional campaigns can be quoted separately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Scope / Consultation Callout Banner */}
        <div className="mt-16 max-w-5xl mx-auto rounded-[2rem] bg-gradient-to-r from-[#1D1842] via-[#281E2C] to-[#1D1842] border border-white/10 p-8 sm:p-12 relative overflow-hidden text-center md:text-left shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#EF3B33]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] uppercase font-black tracking-[0.35em] text-[#FDA1A2] block">
                Tailored Solutions
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium">
                Need a custom combined package for your brand?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                If your business needs both Meta Ads and complete Social Media Management bundled together, let&apos;s create a custom plan tailored to your exact monthly budget and growth targets.
              </p>
            </div>

            <button
              onClick={() => navigate('/contact', { state: { service: 'Custom Bundle Package', plan: 'Tailored Plan' } })}
              className="px-8 py-4 bg-[#EF3B33] hover:bg-[#D9352F] text-white uppercase text-[10px] font-black tracking-widest rounded-full transition-all duration-300 shadow-[0_5px_20px_rgba(239,59,51,0.3)] hover:scale-105 shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>Discuss Custom Package</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Reassurance Features strip */}
        <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-[#0F0B26]/50 border border-white/5 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#EF3B33]/15 text-[#FDA1A2] flex items-center justify-center mb-3">
              <CheckCircle2 size={18} />
            </div>
            <h4 className="text-base font-serif text-white font-medium">Clear Deliverables</h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Every deliverable is mapped out beforehand with monthly content calendars and scheduled reports.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F0B26]/50 border border-white/5 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#EF3B33]/15 text-[#FDA1A2] flex items-center justify-center mb-3">
              <CreditCard size={18} />
            </div>
            <h4 className="text-base font-serif text-white font-medium">Affordable INR Retainers</h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Transparent, fair monthly pricing with no lock-in contracts or surprise costs for Jharkhand businesses.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F0B26]/50 border border-white/5 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#EF3B33]/15 text-[#FDA1A2] flex items-center justify-center mb-3">
              <MapPin size={18} />
            </div>
            <h4 className="text-base font-serif text-white font-medium">Local Understanding</h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Direct market knowledge of Jharkhand audiences, buyer behavior, and regional marketing nuances.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
