'use client';

import { cn } from '@/lib/utils';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface GridServiciosProps {
  title?: string;
  services: Service[];
  columns?: 3 | 4;
  className?: string;
}

export default function GridServicios({
  title,
  services,
  columns = 3,
  className = '',
}: GridServiciosProps) {
  const colsMap = {
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-4',
  };

  return (
    <section className={cn('w-full px-4 py-16 md:py-24 bg-gray-50', className)}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {title}
          </h2>
        )}

        <div className={cn('grid gap-8', colsMap[columns])}>
          {services.map((service, idx) => (
            <div key={idx} className="text-center p-6 bg-white rounded-lg">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
