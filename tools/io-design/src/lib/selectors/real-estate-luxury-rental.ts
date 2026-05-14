// Auto-generated blueprint selector code
// Paste this into src/lib/selectBlueprint.ts or your routing logic

export function selectBlueprintForRealEstateLuxuryRental(client: ClientData): string {
  // Checks for real-estate-luxury-rental
  if (
    client.industry?.toLowerCase().includes('real estate') || client.industry?.toLowerCase().includes('hospitality') || client.industry?.toLowerCase().includes('property management') || client.industry?.toLowerCase().includes('vacation rentals')
  ) {
    return '78ff9db4-64dd-4cfb-926d-6657dae5992f'; // Real Estate - Luxury Rental Properties
  }

  return null; // Fall through to next blueprint
}

// Add to blueprintSelector.ts:
import { selectBlueprintForRealEstateLuxuryRental } from './selectors/real-estate-luxury-rental';

// In main selector function:
const blueprintId =
  selectBlueprintForRealEstateLuxuryRental(clientData) ||
  // ... rest of selectors
