'use client';

import { useState } from 'react';
import type { LandingConfig, ProjectConfig, ConversionBlock } from '@/types';

export function useLandingBuilder() {
  const [config, setConfig] = useState<Partial<LandingConfig>>({
    projectConfig: {
      brandName: '',
      primaryColor: '#2563eb',
      secondaryColor: '#f59e0b',
      fontFamily: 'Inter',
      blueprint: 'servicios-locales',
    },
    conversionBlock: {
      headline: '',
      ctaLabel: 'Contactar',
      mediaType: 'image',
    },
    semanticStructure: {
      metaDescription: '',
      keywords: [],
      schema: 'LocalBusiness',
    },
  });

  const updateProjectConfig = (updates: Partial<ProjectConfig>) => {
    setConfig((prev) => ({
      ...prev,
      projectConfig: { ...prev.projectConfig, ...updates },
    }));
  };

  const updateConversionBlock = (updates: Partial<ConversionBlock>) => {
    setConfig((prev) => ({
      ...prev,
      conversionBlock: { ...prev.conversionBlock, ...updates },
    }));
  };

  const resetConfig = () => {
    setConfig({
      projectConfig: {
        brandName: '',
        primaryColor: '#2563eb',
        secondaryColor: '#f59e0b',
        fontFamily: 'Inter',
        blueprint: 'servicios-locales',
      },
      conversionBlock: {
        headline: '',
        ctaLabel: 'Contactar',
        mediaType: 'image',
      },
      semanticStructure: {
        metaDescription: '',
        keywords: [],
        schema: 'LocalBusiness',
      },
    });
  };

  return {
    config: config as LandingConfig,
    setConfig,
    updateProjectConfig,
    updateConversionBlock,
    resetConfig,
  };
}
