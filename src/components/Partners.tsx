import { useState, useEffect } from 'react';
import { partnersService } from '@/services/firestore';
import type { Partner } from '@/data/partners';

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    partnersService.getAll()
      .then(data => {
        setPartners(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load partners:', err);
        setLoading(false);
      });
  }, []);

  if (loading || partners.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-cormorant text-4xl font-bold text-center mb-12">
          Наши партнёры
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners.map(partner => (
            <a
              key={partner.id}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-20 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
