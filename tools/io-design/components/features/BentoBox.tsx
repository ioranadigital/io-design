'use client';

import { cn } from '@/lib/utils';

interface BentoItem {
  title: string;
  description?: string;
  image?: string;
  size: 'small' | 'medium' | 'large' | 'hero';
}

interface BentoBoxProps {
  items: BentoItem[];
  className?: string;
}

const sizeMap = {
  small: 'col-span-1 row-span-1',
  medium: 'col-span-1 md:col-span-2 row-span-1',
  large: 'col-span-1 md:col-span-2 md:row-span-2',
  hero: 'col-span-1 md:col-span-3 row-span-1',
};

export default function BentoBox({
  items,
  className = '',
}: BentoBoxProps) {
  return (
    <section className={cn('w-full px-4 py-16 md:py-24 bg-white', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-max">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                'rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-gray-100 p-6 flex flex-col justify-end min-h-[250px]',
                sizeMap[item.size]
              )}
              style={{
                backgroundImage: item.image ? `url('${item.image}')` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white text-xl font-bold">{item.title}</h3>
                {item.description && (
                  <p className="text-white/80 text-sm mt-2">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
