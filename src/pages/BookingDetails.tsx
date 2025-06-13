import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Plane, User, CreditCard, Check, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface PassengerInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passport: string;
  nationality: string;
  type: 'adult' | 'child' | 'infant';
}

export default function BookingDetails() {
  const { flightId } = useParams();
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [passengers, setPassengers] = useState<PassengerInfo[]>([]);
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    emergencyContact: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  // Extract search parameters
  const searchDetails = {
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    departure: searchParams.get('departure') || '',
    return: searchParams.get('return') || '',
    adults: parseInt(searchParams.get('adults') || '1'),
    children: parseInt(searchParams.get('children') || '0'),
    infants: parseInt(searchParams.get('infants') || '0'),
    class: searchParams.get('class') || 'economy',
    type: searchParams.get('type') || 'roundtrip'
  };

  // Mock flight data
  const flight = {
    id: flightId,
    airline: 'Jazeera Airways',
    flightNumber: 'J9 125',
    from: searchDetails.from.split(' ')[0],
    to: searchDetails.to.split(' ')[0],
    departureTime: '08:30',
    arrivalTime: '12:45',
    duration: '4h 15m',
    price: 299,
    class: searchDetails.class,
    aircraft: 'Airbus A320'
  };

  useEffect(() => {
    // Initialize passenger array based on search parameters
    const initialPassengers: PassengerInfo[] = [];
    
    // Add adults
    for (let i = 0; i < searchDetails.adults; i++) {
      initialPassengers.push({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        passport: '',
        nationality: '',
        type: 'adult'
      });
    }
    
    // Add children
    for (let i = 0; i < searchDetails.children; i++) {
      initialPassengers.push({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        passport: '',
        nationality: '',
        type: 'child'
      });
    }
    
    // Add infants
    for (let i = 0; i < searchDetails.infants; i++) {
      initialPassengers.push({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        passport: '',
        nationality: '',
        type: 'infant'
      });
    }
    
    setPassengers(initialPassengers);
  }, [searchDetails]);

  const updatePassenger = (index: number, field: keyof PassengerInfo, value: string) => {
    setPassengers(prev => prev.map((passenger, i) => 
      i === index ? { ...passenger, [field]: value } : passenger
    ));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return passengers.every(p => 
          p.firstName && p.lastName && p.dateOfBirth && p.passport && p.nationality
        );
      case 2:
        return contactInfo.email && contactInfo.phone;
      case 3:
        return paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv && paymentInfo.cardholderName;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to success page or dashboard
    navigate('/dashboard?booking=success');
  };

  const totalPrice = flight.price * (searchDetails.adults + searchDetails.children) + 
                    (flight.price * 0.1 * searchDetails.infants); // Infants at 10% price

  const steps = [
    { number: 1, title: 'Passenger Details', icon: User },
    { number: 2, title: 'Contact Information', icon: User },
    { number: 3, title: 'Payment', icon: CreditCard },
    { number: 4, title: 'Confirmation', icon: Check }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-primary-600 border-primary-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span className={`ml-2 rtl:mr-2 rtl:ml-0 text-sm font-medium ${
                  currentStep >= step.number ? 'text-primary-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-px mx-4 ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {/* Step 1: Passenger Details */}
              {currentStep === 1 && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Passenger Details</h2>
                  
                  <div className="space-y-6">
                    {passengers.map((passenger, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          {passenger.type === 'adult' ? 'Adult' : 
                           passenger.type === 'child' ? 'Child' : 'Infant'} {index + 1}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              First Name *
                            </label>
                            <input
                              type="text"
                              value={passenger.firstName}
                              onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              value={passenger.lastName}
                              onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Date of Birth *
                            </label>
                            <input
                              type="date"
                              value={passenger.dateOfBirth}
                              onChange={(e) => updatePassenger(index, 'dateOfBirth', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Passport Number *
                            </label>
                            <input
                              type="text"
                              value={passenger.passport}
                              onChange={(e) => updatePassenger(index, 'passport', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              required
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nationality *
                            </label>
                            <select
                              value={passenger.nationality}
                              onChange={(e) => updatePassenger(index, 'nationality', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select nationality</option>
                              <option value="Kuwait">Kuwait</option>
                              <option value="UAE">United Arab Emirates</option>
                              <option value="Saudi Arabia">Saudi Arabia</option>
                              <option value="Egypt">Egypt</option>
                              <option value="Lebanon">Lebanon</option>
                              <option value="Jordan">Jordan</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Emergency Contact
                      </label>
                      <input
                        type="tel"
                        value={contactInfo.emergencyContact}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, emergencyContact: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                          placeholder="MM/YY"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                          placeholder="123"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.cardholderName}
                        onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardholderName: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                
                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={!validateStep(currentStep)}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      validateStep(currentStep)
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } ${currentStep === 1 ? 'ml-auto rtl:mr-auto rtl:ml-0' : ''}`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleBooking}
                    disabled={!validateStep(currentStep) || loading}
                    className={`px-8 py-2 rounded-lg transition-colors ${
                      validateStep(currentStep) && !loading
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {loading ? 'Processing...' : 'Confirm Booking'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              
              {/* Flight Details */}
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-sky-500 rounded-lg flex items-center justify-center">
                    <Plane className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{flight.airline}</div>
                    <div className="text-sm text-gray-600">{flight.flightNumber}</div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Route:</span>
                    <span className="font-medium">{flight.from} → {flight.to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{new Date(searchDetails.departure).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{flight.departureTime} - {flight.arrivalTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{flight.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class:</span>
                    <span className="font-medium capitalize">{searchDetails.class}</span>
                  </div>
                </div>
              </div>

              {/* Passenger Count */}
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Passengers</h4>
                <div className="space-y-1 text-sm">
                  {searchDetails.adults > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{searchDetails.adults} Adult(s)</span>
                      <span className="font-medium">${flight.price * searchDetails.adults}</span>
                    </div>
                  )}
                  {searchDetails.children > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{searchDetails.children} Child(ren)</span>
                      <span className="font-medium">${flight.price * searchDetails.children}</span>
                    </div>
                  )}
                  {searchDetails.infants > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{searchDetails.infants} Infant(s)</span>
                      <span className="font-medium">${Math.round(flight.price * 0.1 * searchDetails.infants)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Includes all taxes and fees</p>
              </div>

              {/* Security Notice */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-2 rtl:space-x-reverse">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-blue-800">
                    Your payment is secure and encrypted. We never store your card details.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}