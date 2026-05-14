'use client';

import { cn } from '@/lib/utils';

interface HeroVideoProps {
  videoUrl: string;
  headline: string;
  subheadline?: string;
  ctaLabel: string;
  ctaHref?: string;
  overlayOpacity?: 0.3 | 0.5 | 0.7;
  className?: string;
}

export default function HeroVideo({
  videoUrl,
  headline,
  subheadline,
  ctaLabel,
  ctaHref = '#contact',
  overlayOpacity = 0.5,
  className = '',
}: HeroVideoProps) {
  const opacityMap = {
    0.3: 'bg-black/30',
    0.5: 'bg-black/50',
    0.7: 'bg-black/70',
  };

  return (
    <section
      className={cn(
        'relative w-full h-screen min-h-[500px] overflow-hidden flex items-center justify-center',
        className
      )}
    >
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      <div className={cn('absolute inset-0', opacityMap[overlayOpacity])} />

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          {headline}
        </h1>

        {subheadline && (
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {subheadline}
          </p>
        )}

        <button className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors">
          <a href={ctaHref}>{ctaLabel}</a>
        </button>
      </div>
    </section>
  );
}
