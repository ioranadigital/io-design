import { HeroV1, GridServicios, AuthorityBlock, FAQAccordion } from '@/components';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroV1
        headline="Landing Factory - Fábrica de Landings"
        subheadline="Crea landings profesionales en minutos con io-design"
        ctaLabel="Comenzar"
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
        variant="imageRight"
      />

      <GridServicios
        title="Cómo Funciona"
        services={[
          {
            icon: '🎨',
            title: 'Elige Blueprint',
            description: 'Selecciona servicios-locales, clinicas-salud o saas-tecnologico'
          },
          {
            icon: '⚙️',
            title: 'Configura Datos',
            description: 'Marca, colores, textos, geolocalización'
          },
          {
            icon: '🚀',
            title: 'Genera Landing',
            description: 'Deploy automático a Vercel con n8n'
          }
        ]}
      />

      <AuthorityBlock
        clientLogos={[
          'https://via.placeholder.com/150x50?text=Client1',
          'https://via.placeholder.com/150x50?text=Client2',
          'https://via.placeholder.com/150x50?text=Client3'
        ]}
        reviews={[
          {
            name: 'Juan Pérez',
            text: 'Increíble herramienta para crear landings rápido',
            stars: 5,
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan'
          },
          {
            name: 'María García',
            text: 'Ahorré 10 horas en diseño. Muy profesional.',
            stars: 5,
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
          }
        ]}
      />

      <FAQAccordion
        title="Preguntas Frecuentes"
        items={[
          {
            question: '¿Qué es io-design?',
            answer: 'io-design es una fábrica de landings con componentes reutilizables y blueprints para 3 verticales de negocio.'
          },
          {
            question: '¿Qué blueprints disponibles?',
            answer: 'Servicios locales, clínicas salud, y SaaS tecnológico. Cada uno optimizado para su vertical.'
          },
          {
            question: '¿Cómo deplegar a Vercel?',
            answer: 'Integración automática con n8n. Un click y tu landing está en producción.'
          }
        ]}
      />
    </main>
  );
}
