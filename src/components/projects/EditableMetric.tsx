import React from 'react';

interface EditableMetricProps {
  label: string;
  value: string;
  subtext?: string;
  icon?: React.ReactNode;
}

export const EditableMetric: React.FC<EditableMetricProps> = ({ label, value, subtext, icon }) => {
  return (
    <div className="p-6 rounded-2xl bg-[#1D1842]/60 border border-white/10 backdrop-blur-md">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider font-bold text-[#FDA1A2] font-sans">{label}</span>
        {icon && <div className="text-[#FDA1A2]">{icon}</div>}
      </div>
      <div className="text-3xl sm:text-4xl font-serif text-white font-bold mb-1">{value}</div>
      {subtext && <p className="text-xs text-white/60 font-sans font-light">{subtext}</p>}
    </div>
  );
};
