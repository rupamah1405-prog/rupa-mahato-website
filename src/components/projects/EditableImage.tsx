import React from 'react';

interface EditableImageProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ src, alt, className = "", caption }) => {
  return (
    <figure className="relative group overflow-hidden rounded-2xl border border-white/10">
      <img
        src={src}
        alt={alt}
        className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${className}`}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      {caption && (
        <figcaption className="p-3 bg-[#0F0B26]/80 backdrop-blur-sm text-xs text-white/70 font-sans text-center border-t border-white/5">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
