import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Plane, Calendar, MapPin, Clock, User, Settings, CreditCard, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface Booking {
  id: string;
  flightNumber: string;
  airline: string;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  price: number;
  passengers: number;
  bookingRef: string;
}

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile' | 'payments'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Check if there's a booking success parameter
    if (searchParams.get('booking') === 'success') {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }

    // Mock booking data
    setBookings([
      {
        id: '1',
        flightNumber: 'J9 125',
        airline: 'Jazeera Airways',
        from: 'Kuwait City',
        to: 'Dubai',
        departureDate: '2024-12-15',
        departureTime: '08:30',
        arrivalTime: '12:45',
        status: 'confirmed',
        price: 299,
        passengers: 2,
        bookingRef: 'JA2024001'
      },
      {
        id: '2',
        flightNumber: 'J9 331',
        airline: 'Jazeera Airways',
        from: 'Dubai',
        to: 'London',
        departureDate: '2024-11-20',
        departureTime: '14:20',
        arrivalTime: '18:35',
        status: 'completed',
        price: 649,
        passengers: 1,
        bookingRef: 'JA2024002'
      }
    ]);
  }, [isAuthenticated, navigate, searchParams]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return language === 'ar' ? 'مؤكد' : 'Confirmed';
      case 'cancelled':
        return language === 'ar' ? 'ملغي' : 'Cancelled';
      case 'completed':
        return language === 'ar' ? 'مكتمل' : 'Completed';
      default:
        return status;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center animate-fade-in">
            <CheckCircle className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0" />
            <span>
              {language === 'ar' 
                ? 'تم تأكيد حجزك بنجاح! ستتلقى تأكيد الحجز عبر البريد الإلكتروني.'
                : 'Your booking has been confirmed successfully! You will receive a confirmation email shortly.'
              }
            </span>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'ar' ? `مرحباً، ${user?.name}` : `Welcome, ${user?.name}`}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'إدارة حجوزاتك ومعلوماتك الشخصية'
              : 'Manage your bookings and personal information'
            }
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 rtl:space-x-reverse">
            {[
              { id: 'bookings', label: language === 'ar' ? 'الحجوزات' : 'My Bookings', icon: Plane },
              { id: 'profile', label: language === 'ar' ? 'الملف الشخصي' : 'Profile', icon: User },
              { id: 'payments', label: language === 'ar' ? 'طرق الدفع' : 'Payment Methods', icon: CreditCard }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md">
          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'ar' ? 'حجوزاتي' : 'My Bookings'}
              </h2>
              
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {language === 'ar' ? 'لا توجد حجوزات' : 'No bookings yet'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {language === 'ar' 
                      ? 'ابدأ رحلتك القادمة معنا'
                      : 'Start your next journey with us'
                    }
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {language === 'ar' ? 'احجز رحلة' : 'Book a Flight'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-sky-500 rounded-lg flex items-center justify-center">
                              <Plane className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{booking.airline}</div>
                              <div className="text-sm text-gray-600">{booking.flightNumber}</div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                              {getStatusText(booking.status)}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {booking.from} → {booking.to}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {new Date(booking.departureDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {booking.departureTime} - {booking.arrivalTime}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>
                              {language === 'ar' ? 'رقم الحجز:' : 'Booking Ref:'} {booking.bookingRef}
                            </span>
                            <span>
                              {booking.passengers} {booking.passengers === 1 ? 'passenger' : 'passengers'}
                            </span>
                          </div>
                        </div>

                        <div className="lg:text-right rtl:lg:text-left mt-4 lg:mt-0 lg:ml-6 rtl:lg:mr-6 rtl:lg:ml-0">
                          <div className="text-2xl font-bold text-gray-900 mb-2">
                            ${booking.price}
                          </div>
                          <div className="space-y-2">
                            <button className="w-full lg:w-auto bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                              {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                            </button>
                            {booking.status === 'confirmed' && (
                              <button className="w-full lg:w-auto border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                {language === 'ar' ? 'تعديل الحجز' : 'Modify Booking'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'ar' ? 'الملف الشخصي' : 'Profile Information'}
              </h2>
              
              <div className="max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      value={user?.phone || ''}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'تاريخ الميلاد' : 'Date of Birth'}
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
                    {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === 'payments' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'ar' ? 'طرق الدفع' : 'Payment Methods'}
              </h2>
              
              <div className="max-w-2xl">
                <div className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">•••• •••• •••• 1234</div>
                        <div className="text-sm text-gray-600">Expires 12/26</div>
                      </div>
                    </div>
                    <button className="text-red-600 hover:text-red-700 text-sm">
                      {language === 'ar' ? 'حذف' : 'Remove'}
                    </button>
                  </div>
                </div>
                
                <button className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full text-center hover:border-primary-400 hover:bg-primary-50 transition-colors">
                  <CreditCard className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-gray-600">
                    {language === 'ar' ? 'إضافة طريقة دفع جديدة' : 'Add new payment method'}
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}