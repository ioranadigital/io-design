// Auto-generated Blueprint Selector
// This file automatically imports and uses all available blueprint selectors

import { selectBlueprintForRealEstateLuxuryRental } from './selectors/real-estate-luxury-rental';

export interface ClientData {
  industry?: string;
  sector?: string;
  company?: string;
  targetMarket?: string;
}

/**
 * Select the appropriate blueprint based on client data
 * Returns blueprint ID or null if no match found
 */
export function selectBlueprint(clientData: ClientData): string | null {
  if (!clientData) return null;

  // Real Estate - Luxury Rental blueprint
  const realEstateBlueprint = selectBlueprintForRealEstateLuxuryRental(clientData);
  if (realEstateBlueprint) return realEstateBlueprint;

  // Add more selector calls here as new blueprints are added
  // const servicesBlueprint = selectBlueprintForServicios(clientData);
  // if (servicesBlueprint) return servicesBlueprint;

  // Default fallback
  return null;
}

/**
 * Get available blueprints
 */
export function getAvailableBlueprints() {
  return [
    {
      id: '78ff9db4-64dd-4cfb-926d-6657dae5992f',
      type: 'real-estate-luxury-rental',
      name: 'Real Estate - Luxury Rental Properties',
      industries: ['Real Estate', 'Hospitality', 'Property Management', 'Vacation Rentals'],
    },
  ];
}
