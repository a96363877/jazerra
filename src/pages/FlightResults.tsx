import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Plane, Clock, ArrowRight, Filter, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  class: string;
  stops: number;
  aircraft: string;
}

export default function FlightResults() {
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'price' | 'time' | 'duration'>('price');
  const [filterStops, setFilterStops] = useState<'all' | 'direct' | 'stops'>('all');

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

  useEffect(() => {
    // Simulate API call to fetch flights
    const fetchFlights = async () => {
      setLoading(true);
      
      // Mock flight data
      const mockFlights: Flight[] = [
        {
          id: '1',
          airline: 'Jazeera Airways',
          flightNumber: 'J9 125',
          from: searchDetails.from.split(' ')[0],
          to: searchDetails.to.split(' ')[0],
          departureTime: '08:30',
          arrivalTime: '12:45',
          duration: '4h 15m',
          price: 299,
          class: searchDetails.class,
          stops: 0,
          aircraft: 'Airbus A320'
        },
        {
          id: '2',
          airline: 'Jazeera Airways',
          flightNumber: 'J9 331',
          from: searchDetails.from.split(' ')[0],
          to: searchDetails.to.split(' ')[0],
          departureTime: '14:20',
          arrivalTime: '18:35',
          duration: '4h 15m',
          price: 349,
          class: searchDetails.class,
          stops: 0,
          aircraft: 'Airbus A320'
        },
        {
          id: '3',
          airline: 'Jazeera Airways',
          flightNumber: 'J9 445',
          from: searchDetails.from.split(' ')[0],
          to: searchDetails.to.split(' ')[0],
          departureTime: '19:45',
          arrivalTime: '00:00+1',
          duration: '4h 15m',
          price: 279,
          class: searchDetails.class,
          stops: 0,
          aircraft: 'Airbus A321'
        },
        {
          id: '4',
          airline: 'Partner Airlines',
          flightNumber: 'PA 892',
          from: searchDetails.from.split(' ')[0],
          to: searchDetails.to.split(' ')[0],
          departureTime: '11:15',
          arrivalTime: '17:30',
          duration: '6h 15m',
          price: 249,
          class: searchDetails.class,
          stops: 1,
          aircraft: 'Boeing 737'
        }
      ];

      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFlights(mockFlights);
      setLoading(false);
    };

    fetchFlights();
  }, [searchParams]);

  const handleBookFlight = (flightId: string) => {
    navigate(`/booking/${flightId}?${searchParams.toString()}`);
  };

  const sortFlights = (flights: Flight[]) => {
    return [...flights].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'time':
          return a.departureTime.localeCompare(b.departureTime);
        case 'duration':
          return a.duration.localeCompare(b.duration);
        default:
          return 0;
      }
    });
  };

  const filterFlights = (flights: Flight[]) => {
    return flights.filter(flight => {
      switch (filterStops) {
        case 'direct':
          return flight.stops === 0;
        case 'stops':
          return flight.stops > 0;
        default:
          return true;
      }
    });
  };

  const processedFlights = sortFlights(filterFlights(flights));
  const totalPassengers = searchDetails.adults + searchDetails.children + searchDetails.infants;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4 md:mb-0">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="font-semibold text-gray-900">{searchDetails.from.split(' ')[0]}</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <span className="font-semibold text-gray-900">{searchDetails.to.split(' ')[0]}</span>
              </div>
              <div className="text-gray-600">
                {new Date(searchDetails.departure).toLocaleDateString()}
              </div>
              <div className="text-gray-600">
                {totalPassengers} {totalPassengers === 1 ? 'passenger' : 'passengers'}
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Modify Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                Filters
              </h3>
              
              {/* Sort Options */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Sort by</h4>
                <div className="space-y-2">
                  {[
                    { value: 'price', label: 'Price (Low to High)' },
                    { value: 'time', label: 'Departure Time' },
                    { value: 'duration', label: 'Flight Duration' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={sortBy === option.value}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stops Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Stops</h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All flights' },
                    { value: 'direct', label: 'Direct only' },
                    { value: 'stops', label: '1+ stops' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="stops"
                        value={option.value}
                        checked={filterStops === option.value}
                        onChange={(e) => setFilterStops(e.target.value as any)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Flight Results */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {processedFlights.map(flight => (
                <div key={flight.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      {/* Flight Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-sky-500 rounded-lg flex items-center justify-center">
                            <Plane className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{flight.airline}</div>
                            <div className="text-sm text-gray-600">{flight.flightNumber} • {flight.aircraft}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          {/* Departure */}
                          <div>
                            <div className="text-2xl font-bold text-gray-900">{flight.departureTime}</div>
                            <div className="text-sm text-gray-600">{flight.from}</div>
                            <div className="text-xs text-gray-500">{searchDetails.departure}</div>
                          </div>

                          {/* Duration */}
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                              <Clock className="w-4 h-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">{flight.duration}</span>
                            </div>
                            <div className="relative">
                              <div className="h-px bg-gray-300"></div>
                              {flight.stops === 0 ? (
                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                                  Direct
                                </div>
                              ) : (
                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">
                                  {flight.stops} stop{flight.stops > 1 ? 's' : ''}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Arrival */}
                          <div className="text-right rtl:text-left">
                            <div className="text-2xl font-bold text-gray-900">{flight.arrivalTime}</div>
                            <div className="text-sm text-gray-600">{flight.to}</div>
                            <div className="text-xs text-gray-500">
                              {flight.arrivalTime.includes('+1') ? 'Next day' : searchDetails.departure}
                            </div>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                          <span className="text-sm text-gray-600 ml-2 rtl:mr-2 rtl:ml-0">4.8 (1,245 reviews)</span>
                        </div>
                      </div>

                      {/* Price and Book Button */}
                      <div className="md:text-right rtl:md:text-left mt-4 md:mt-0 md:ml-6 rtl:md:mr-6 rtl:md:ml-0">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          ${flight.price}
                        </div>
                        <div className="text-sm text-gray-600 mb-4">per person</div>
                        <button
                          onClick={() => handleBookFlight(flight.id)}
                          className="w-full md:w-auto bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                        >
                          {t('common.book')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {processedFlights.length === 0 && (
                <div className="text-center py-12">
                  <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No flights found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}