'use client';

import { apartments } from '@/data/apartments';

interface ReservationSummaryProps {
  bookingData: {
    apartmentId: number;
    startDate: string;
    endDate: string;
    guests: number;
  };
}

export default function ReservationSummary({ bookingData }: ReservationSummaryProps) {
  const apartment = apartments.find(apt => apt.id === bookingData.apartmentId);

  if (!apartment) return null;

  // Calculate nights
  const start = new Date(bookingData.startDate);
  const end = new Date(bookingData.endDate);
  const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  // Calculate prices
  const nightlyPrice = apartment.price;
  const subtotal = nightlyPrice * nights;
  const serviceFee = Math.round(subtotal * 0.15); // 15% service fee
  const taxes = Math.round((subtotal + serviceFee) * 0.10); // 10% taxes
  const total = subtotal + serviceFee + taxes;

  return (
    <div className="sticky top-32">
      <div className="bg-white rounded-2xl p-8 border border-gray-200 space-y-6">
        {/* Property Info */}
        <div>
          <img
            src={apartment.image}
            alt={apartment.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900">{apartment.name}</h3>
          <p className="text-sm text-gray-600 mt-1 font-light">{apartment.location}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-amber-400 text-sm">★ {apartment.rating}</span>
            <span className="text-gray-600 text-sm">({apartment.reviews} reseñas)</span>
          </div>
        </div>

        {/* Booking Details */}
        <div className="border-t border-gray-200 pt-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Entrada</span>
              <span className="font-semibold text-gray-900">{bookingData.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Salida</span>
              <span className="font-semibold text-gray-900">{bookingData.endDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Noches</span>
              <span className="font-semibold text-gray-900">{nights}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Huéspedes</span>
              <span className="font-semibold text-gray-900">{bookingData.guests}</span>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-gray-900 mb-4">Desglose de Precio</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">€{nightlyPrice} × {nights} {nights === 1 ? 'noche' : 'noches'}</span>
              <span className="text-gray-900 font-medium">€{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tarifa de servicio</span>
              <span className="text-gray-900 font-medium">€{serviceFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Impuestos</span>
              <span className="text-gray-900 font-medium">€{taxes}</span>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-600">€{total}</span>
          </div>
          <p className="text-xs text-gray-600 mt-2 font-light">Precio final en EUR</p>
        </div>

        {/* Cancellation Policy */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-green-900 mb-2">Cancelación Flexible</h4>
          <div className="text-xs text-green-800 font-light space-y-1">
            <p>✓ 100% reembolso hasta 14 días antes</p>
            <p>✓ 50% reembolso hasta 7 días antes</p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold text-blue-900">Pago Seguro</span>
          </div>
          <p className="text-xs text-blue-700 font-light">Tus datos están protegidos con encriptación SSL</p>
        </div>
      </div>
    </div>
  );
}
