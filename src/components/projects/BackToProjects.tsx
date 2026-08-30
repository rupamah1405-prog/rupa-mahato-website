import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const BackToProjects = () => {
  return (
    <div className="mb-8">
      <Link
        to="/work"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs uppercase font-bold tracking-widest transition-all duration-200"
      >
        <ArrowLeft size={14} className="text-[#FDA1A2]" />
        <span>Back to Projects</span>
      </Link>
    </div>
  );
};
