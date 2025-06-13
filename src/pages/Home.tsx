import React from 'react';
import { Plane, Star, Shield, Clock, Heart } from 'lucide-react';
import FlightSearchForm from '../components/FlightSearchForm';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { language, t } = useLanguage();

  const features = [
    {
      icon: Star,
      title: language === 'ar' ? 'خدمة متميزة' : 'Premium Service',
      description: language === 'ar' 
        ? 'خدمة عملاء على مدار الساعة وطاقم مدرب على أعلى مستوى'
        : '24/7 customer service with highly trained professional crew'
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'سلامة مضمونة' : 'Safety Guaranteed',
      description: language === 'ar'
        ? 'أعلى معايير السلامة العالمية مع أحدث التقنيات'
        : 'Highest international safety standards with latest technology'
    },
    {
      icon: Clock,
      title: language === 'ar' ? 'دقة في المواعيد' : 'On-Time Performance',
      description: language === 'ar'
        ? '95% من رحلاتنا تصل في الموعد المحدد'
        : '95% of our flights arrive on scheduled time'
    },
    {
      icon: Heart,
      title: language === 'ar' ? 'راحة استثنائية' : 'Exceptional Comfort',
      description: language === 'ar'
        ? 'مقاعد مريحة ووجبات شهية وترفيه متنوع'
        : 'Comfortable seating, delicious meals, and diverse entertainment'
    }
  ];

  const destinations = [
    {
      city: language === 'ar' ? 'دبي' : 'Dubai',
      country: language === 'ar' ? 'الإمارات' : 'UAE',
      image: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '$299'
    },
    {
      city: language === 'ar' ? 'لندن' : 'London',
      country: language === 'ar' ? 'المملكة المتحدة' : 'UK',
      image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '$649'
    },
    {
      city: language === 'ar' ? 'القاهرة' : 'Cairo',
      country: language === 'ar' ? 'مصر' : 'Egypt',
      image: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '$199'
    },
    {
      city: language === 'ar' ? 'اسطنبول' : 'Istanbul',
      country: language === 'ar' ? 'تركيا' : 'Turkey',
      image: 'https://images.pexels.com/photos/1549280/pexels-photo-1549280.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '$399'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-sky-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="Aircraft" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto animate-fade-in">
              {t('home.subtitle')}
            </p>
          </div>
          
          <div className="animate-slide-up">
            <FlightSearchForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'لماذا تختار طيران الجزيرة؟' : 'Why Choose Jazeera Airways?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'نقدم لك تجربة سفر استثنائية مع أفضل الخدمات والمرافق'
                : 'We provide exceptional travel experience with the best services and facilities'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'الوجهات الشائعة' : 'Popular Destinations'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'ar'
                ? 'اكتشف أجمل الوجهات السياحية حول العالم'
                : 'Discover the most beautiful tourist destinations around the world'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative h-48">
                  <img 
                    src={destination.image} 
                    alt={destination.city}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {language === 'ar' ? 'من' : 'From'} {destination.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{destination.city}</h3>
                  <p className="text-gray-600 mb-4">{destination.country}</p>
                  <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                    {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-sky-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === 'ar' ? 'ابدأ رحلتك القادمة اليوم' : 'Start Your Next Journey Today'}
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            {language === 'ar'
              ? 'انضم إلى ملايين المسافرين الذين يثقون بطيران الجزيرة'
              : 'Join millions of travelers who trust Jazeera Airways'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              {language === 'ar' ? 'تصفح العروض' : 'Browse Deals'}
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary-600 transition-colors font-semibold">
              {language === 'ar' ? 'برنامج الولاء' : 'Loyalty Program'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}