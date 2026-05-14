'use client';

import { cn } from '@/lib/utils';

interface Review {
  name: string;
  text: string;
  stars: 1 | 2 | 3 | 4 | 5;
  image?: string;
}

interface CaseStudy {
  title: string;
  description?: string;
  metric?: string;
  image?: string;
}

interface AuthorityBlockProps {
  clientLogos?: string[];
  reviews?: Review[];
  caseStudies?: CaseStudy[];
  layout?: 'stacked' | 'grid' | 'carousel';
  className?: string;
}

export default function AuthorityBlock({
  clientLogos,
  reviews,
  caseStudies,
  layout = 'grid',
  className = '',
}: AuthorityBlockProps) {
  return (
    <section className={cn('w-full px-4 py-16 md:py-24 bg-gray-50', className)}>
      <div className="max-w-7xl mx-auto">
        {clientLogos && clientLogos.length > 0 && (
          <div className="mb-12">
            <p className="text-center text-sm text-gray-500 mb-6 uppercase tracking-wide">
              Clientes que confían en nosotros
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {clientLogos.map((logo, idx) => (
                <img
                  key={idx}
                  src={logo}
                  alt="Client logo"
                  className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        )}

        {reviews && reviews.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-8">Testimonios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center gap-4 mb-4">
                    {review.image && (
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-yellow-500">
                        {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {caseStudies && caseStudies.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-center mb-8">Casos de Éxito</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudies.map((study, idx) => (
                <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md">
                  {study.image && (
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h4 className="font-semibold text-lg mb-2">{study.title}</h4>
                    {study.description && (
                      <p className="text-gray-600 text-sm mb-3">{study.description}</p>
                    )}
                    {study.metric && (
                      <p className="text-green-600 font-semibold text-sm">
                        {study.metric}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
