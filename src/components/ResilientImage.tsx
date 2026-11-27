import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackSubtitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EFECE6] via-[#E5E1D8] to-[#D8D3C7] text-stone-700 p-8 text-center ${className}`}
      >
        <div className="w-12 h-12 rounded-full border border-stone-400/50 flex items-center justify-center mb-3 bg-white/60">
          <ImageOff className="w-5 h-5 text-stone-600" aria-hidden="true" />
        </div>
        <p className="text-base font-semibold text-stone-900">{fallbackTitle}</p>
        {fallbackSubtitle && (
          <p className="text-sm text-stone-600 mt-1 max-w-xs">{fallbackSubtitle}</p>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
