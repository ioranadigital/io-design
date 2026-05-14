'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CheckoutForm from '@/components/CheckoutForm';
import ReservationSummary from '@/components/ReservationSummary';

export default function CheckoutPage() {
  const [step, setStep] = useState<'booking' | 'payment' | 'confirmation'>('booking');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    paymentMethod: 'card',
  });

  const [bookingData, setBookingData] = useState({
    apartmentId: 1,
    startDate: '2026-06-07',
    endDate: '2026-06-09',
    guests: 4,
  });

  const handleBookingChange = (data: typeof bookingData) => {
    setBookingData(data);
  };

  const handleFormChange = (data: typeof formData) => {
    setFormData(data);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí iría la integración con el procesador de pagos real
    console.log('Booking Data:', bookingData);
    console.log('Form Data:', formData);

    // Simular procesamiento de pago
    setStep('confirmation');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container-fluid py-12">
          {/* Progress indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
              <div className={`flex items-center ${step === 'booking' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step !== 'booking' ? 'bg-blue-600 text-white' : 'bg-blue-100'
                }`}>
                  1
                </div>
                <span className="ml-2 text-sm font-semibold">Reserva</span>
              </div>

              <div className={`flex-1 h-1 ${step !== 'booking' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>

              <div className={`flex items-center ${step === 'payment' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step === 'confirmation' ? 'bg-blue-600 text-white' : step === 'payment' ? 'bg-blue-100' : 'bg-gray-200'
                }`}>
                  2
                </div>
                <span className="ml-2 text-sm font-semibold">Pago</span>
              </div>

              <div className={`flex-1 h-1 ${step === 'confirmation' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>

              <div className={`flex items-center ${step === 'confirmation' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step === 'confirmation' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  3
                </div>
                <span className="ml-2 text-sm font-semibold">Confirmación</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Main content */}
            <div className="lg:col-span-2">
              {step === 'confirmation' ? (
                <div className="bg-white rounded-2xl p-8 border border-green-200">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLineCap="round" strokeLineJoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-semibold text-gray-900 mb-2">¡Reserva Confirmada!</h2>
                    <p className="text-gray-600 font-light">Tu reserva ha sido procesada exitosamente</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Detalles de Confirmación</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600">
                        <span className="font-semibold text-gray-900">Número de reserva:</span> RSG-2026-001234
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold text-gray-900">Correo de confirmación:</span> {formData.email}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold text-gray-900">Check-in:</span> {bookingData.startDate} (16:00)
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold text-gray-900">Check-out:</span> {bookingData.endDate} (11:00)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all">
                      Descargar Confirmación
                    </button>
                    <a href="/" className="block text-center px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 transition-all">
                      Volver a Inicio
                    </a>
                  </div>
                </div>
              ) : (
                <CheckoutForm
                  step={step}
                  formData={formData}
                  bookingData={bookingData}
                  onFormChange={handleFormChange}
                  onBookingChange={handleBookingChange}
                  onSubmit={handlePayment}
                  onStepChange={setStep}
                />
              )}
            </div>

            {/* Summary sidebar */}
            <ReservationSummary bookingData={bookingData} />
          </div>
        </div>
      </main>
    </>
  );
}
