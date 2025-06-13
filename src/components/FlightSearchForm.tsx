import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowUpDown, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function FlightSearchForm() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    },
    class: 'economy'
  });

  const destinations = [
    'Kuwait City (KWI)',
    'Dubai (DXB)',
    'London (LHR)',
    'Cairo (CAI)',
    'Mumbai (BOM)',
    'Istanbul (IST)',
    'Beirut (BEY)',
    'Amman (AMM)',
    'Doha (DOH)',
    'Riyadh (RUH)'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!searchData.from || !searchData.to || !searchData.departureDate) {
      alert('Please fill in all required fields');
      return;
    }

    // Navigate to flight results with search parameters
    const params = new URLSearchParams({
      from: searchData.from,
      to: searchData.to,
      departure: searchData.departureDate,
      ...(tripType === 'roundtrip' && searchData.returnDate && { return: searchData.returnDate }),
      adults: searchData.passengers.adults.toString(),
      children: searchData.passengers.children.toString(),
      infants: searchData.passengers.infants.toString(),
      class: searchData.class,
      type: tripType
    });

    navigate(`/flights?${params.toString()}`);
  };

  const swapDestinations = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 max-w-6xl mx-auto">
      <form onSubmit={handleSearch} className="space-y-6">
        {/* Trip Type Toggle */}
        <div className="flex space-x-4 rtl:space-x-reverse">
          <button
            type="button"
            onClick={() => setTripType('roundtrip')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              tripType === 'roundtrip'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('search.roundtrip')}
          </button>
          <button
            type="button"
            onClick={() => setTripType('oneway')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              tripType === 'oneway'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('search.oneway')}
          </button>
        </div>

        {/* Destination and Date Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* From */}
          <div className="lg:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('search.from')}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 rtl:right-3 rtl:left-auto top-3 w-5 h-5 text-gray-400" />
              <select
                value={searchData.from}
                onChange={(e) => setSearchData(prev => ({ ...prev, from: e.target.value }))}
                className="w-full pl-10 rtl:pr-10 rtl:pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                required
              >
                <option value="">Select departure city</option>
                {destinations.map(dest => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="lg:col-span-1 flex items-end justify-center pb-3">
            <button
              type="button"
              onClick={swapDestinations}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowUpDown className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* To */}
          <div className="lg:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('search.to')}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 rtl:right-3 rtl:left-auto top-3 w-5 h-5 text-gray-400" />
              <select
                value={searchData.to}
                onChange={(e) => setSearchData(prev => ({ ...prev, to: e.target.value }))}
                className="w-full pl-10 rtl:pr-10 rtl:pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                required
              >
                <option value="">Select destination city</option>
                {destinations.map(dest => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Departure Date */}
          <div className="lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('search.departure')}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 rtl:right-3 rtl:left-auto top-3 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={searchData.departureDate}
                onChange={(e) => setSearchData(prev => ({ ...prev, departureDate: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 rtl:pr-10 rtl:pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Return Date (if round trip) */}
        {tripType === 'roundtrip' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('search.return')}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 rtl:right-3 rtl:left-auto top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={searchData.returnDate}
                  onChange={(e) => setSearchData(prev => ({ ...prev, returnDate: e.target.value }))}
                  min={searchData.departureDate || new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 rtl:pr-10 rtl:pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Passengers and Class */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Passengers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('search.passengers')}
            </label>
            <div className="border border-gray-300 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">{t('common.adult')} (12+)</span>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <button
                    type="button"
                    onClick={() => setSearchData(prev => ({
                      ...prev,
                      passengers: { ...prev.passengers, adults: Math.max(1, prev.passengers.adults - 1) }
                    }))}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{searchData.passengers.adults}</span>
                  <button
                    type="button"
                    onClick={() => setSearchData(prev => ({
                      ...prev,
                      passengers: { ...prev.passengers, adults: Math.min(9, prev.passengers.adults + 1) }
                    }))}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">{t('common.child')} (2-11)</span>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <button
                    type="button"
                    onClick={() => setSearchData(prev => ({
                      ...prev,
                      passengers: { ...prev.passengers, children: Math.max(0, prev.passengers.children - 1) }
                    }))}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{searchData.passengers.children}</span>
                  <button
                    type="button"
                    onClick={() => setSearchData(prev => ({
                      ...prev,
                      passengers: { ...prev.passengers, children: Math.min(8, prev.passengers.children + 1) }
                    }))}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">{t('common.infant')} (0-2)</span>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <button
                    type="button"
                    onClick={() => setSearchData(prev => ({
                      ...prev,
                      passengers: { ...prev.passengers, infants: Math.max(0, prev.passengers.infants - 1) }
                    }))}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{searchData.passengers.infants}</span>
                  <button
                    type="button"
                    onClick={() => setSearchData(prev => ({
                      ...prev,
                      passengers: { ...prev.passengers, infants: Math.min(searchData.passengers.adults, prev.passengers.infants + 1) }
                    }))}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Class */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('search.class')}
            </label>
            <div className="relative">
              <Users className="absolute left-3 rtl:right-3 rtl:left-auto top-3 w-5 h-5 text-gray-400" />
              <select
                value={searchData.class}
                onChange={(e) => setSearchData(prev => ({ ...prev, class: e.target.value }))}
                className="w-full pl-10 rtl:pr-10 rtl:pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="economy">{t('class.economy')}</option>
                <option value="business">{t('class.business')}</option>
                <option value="first">{t('class.first')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-primary-600 to-sky-500 text-white px-12 py-4 rounded-lg hover:from-primary-700 hover:to-sky-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center space-x-2 rtl:space-x-reverse"
          >
            <span>{t('search.button')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}