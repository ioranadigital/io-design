'use client';

interface CheckoutFormProps {
  step: 'booking' | 'payment' | 'confirmation';
  formData: any;
  bookingData: any;
  onFormChange: (data: any) => void;
  onBookingChange: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onStepChange: (step: 'booking' | 'payment' | 'confirmation') => void;
}

export default function CheckoutForm({
  step,
  formData,
  bookingData,
  onFormChange,
  onBookingChange,
  onSubmit,
  onStepChange,
}: CheckoutFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFormChange({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (step === 'booking') {
      onStepChange('payment');
    } else if (step === 'payment') {
      onStepChange('confirmation');
    }
  };

  const handleBack = () => {
    if (step === 'payment') {
      onStepChange('booking');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Booking Details Step */}
      {step === 'booking' && (
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Detalles de la Reserva</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Fecha de Entrada</label>
              <input
                type="date"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                value={bookingData.startDate}
                onChange={(e) => onBookingChange({ ...bookingData, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Fecha de Salida</label>
              <input
                type="date"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                value={bookingData.endDate}
                onChange={(e) => onBookingChange({ ...bookingData, endDate: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Número de Huéspedes</label>
            <select
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              value={bookingData.guests}
              onChange={(e) => onBookingChange({ ...bookingData, guests: parseInt(e.target.value) })}
            >
              <option value="1">1 Huésped</option>
              <option value="2">2 Huéspedes</option>
              <option value="3">3 Huéspedes</option>
              <option value="4">4 Huéspedes</option>
              <option value="5">5 Huéspedes</option>
              <option value="6">6+ Huéspedes</option>
            </select>
          </div>

          <div className="flex gap-4">
            <a href="/" className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 transition-all text-center">
              Cancelar
            </a>
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Continuar → Pago
            </button>
          </div>
        </div>
      )}

      {/* Payment Details Step */}
      {step === 'payment' && (
        <>
          {/* Guest Info */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Información del Huésped</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Nombre</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Apellido</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dirección de Facturación</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">País</label>
                <input
                  type="text"
                  name="country"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Dirección</label>
              <input
                type="text"
                name="address"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Código Postal</label>
              <input
                type="text"
                name="zipCode"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                value={formData.zipCode}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Método de Pago</h2>

            <div className="mb-6">
              <label className="flex items-center p-4 border-2 border-blue-600 rounded-lg cursor-pointer bg-blue-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="ml-3 font-semibold text-gray-900">Tarjeta de Crédito/Débito</span>
              </label>
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Titular de la Tarjeta</label>
                  <input
                    type="text"
                    name="cardName"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    value={formData.cardName}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Número de Tarjeta</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    required
                    maxLength={19}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Vencimiento (MM/YY)</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="12/26"
                      required
                      maxLength={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">CVC</label>
                    <input
                      type="text"
                      name="cardCVC"
                      placeholder="123"
                      required
                      maxLength={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      value={formData.cardCVC}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Cancellation Policy */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Política de Cancelación</h3>
              <p className="text-xs text-gray-600 font-light">
                Reembolso 100% hasta 14 días antes de la llegada. Reembolso 50% hasta 7 días antes.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 transition-all"
            >
              ← Atrás
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Procesar Pago
            </button>
          </div>
        </>
      )}
    </form>
  );
}
