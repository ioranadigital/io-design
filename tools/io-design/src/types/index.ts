export interface ProjectConfig {
  brandName: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  faviconUrl?: string;
  gaId?: string;
  blueprint: 'servicios-locales' | 'clinicas-salud' | 'saas-tecnologico';
}

export interface GeoTarget {
  cityName: string;
  neighborhoods?: string[];
  mapEmbedUrl?: string;
  napData?: {
    name: string;
    address: string;
    phone: string;
  };
}

export interface ConversionBlock {
  headline: string;
  subheadline?: string;
  ctaLabel: string;
  trustSignal?: string;
  mediaType: 'image' | 'video' | 'none';
  mediaUrl?: string;
}

export interface AuthorityBlock {
  clientLogos?: string[];
  reviews?: {
    name: string;
    text: string;
    stars: 1 | 2 | 3 | 4 | 5;
    image?: string;
  }[];
  caseStudies?: {
    title: string;
    description?: string;
    metric?: string;
    image?: string;
  }[];
}

export interface SemanticStructure {
  h2Services?: string[];
  faqItems?: {
    question: string;
    answer: string;
  }[];
  metaDescription: string;
  keywords: string[];
  schema: 'LocalBusiness' | 'MedicalBusiness' | 'SoftwareApplication';
}

export interface LandingConfig {
  projectConfig: ProjectConfig;
  geoTarget?: GeoTarget;
  conversionBlock: ConversionBlock;
  authorityBlock?: AuthorityBlock;
  semanticStructure: SemanticStructure;
}
