import React from 'react';
import { TrendingUp, Building, Users, DollarSign, ChevronRight } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const stats = [
    {
      title: '$12,000',
      subtitle: 'Total revenue',
      description: 'Total revenue made in saint Davies (2.4%)',
      icon: DollarSign,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: '$123',
      subtitle: 'Total rent arrears',
      description: 'Total revenue made in saint Davies',
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: '12',
      subtitle: 'Total Apartment',
      description: 'Total revenue made in saint Davies',
      icon: Building,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: '6',
      subtitle: 'Total rented apartment',
      description: 'Total revenue made in saint Davies',
      icon: Users,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  const apartments = [
    {
      id: 1,
      name: 'Flat 1',
      tenant: 'Virtue',
      expiringDate: '12th Mar 2025',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Flat 2',
      tenant: 'Virtue',
      expiringDate: '12th Mar 2025',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Flat 3',
      tenant: 'Virtue',
      expiringDate: '12th Mar 2025',
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Flat 3',
      tenant: 'Virtue',
      expiringDate: '12th Mar 2025',
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900">{stat.title}</h3>
              <p className="text-sm font-medium text-gray-600">{stat.subtitle}</p>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        {/* Apartment List */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Apartment list</h3>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
              See all
            </button>
          </div>
          
          <div className="space-y-4">
            {apartments.map((apartment) => (
              <div key={apartment.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <img
                  src={apartment.image}
                  alt={apartment.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900">{apartment.name}</h4>
                  <p className="text-xs text-gray-600">
                    Current tenant: <span className="font-medium">{apartment.tenant}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Expiring date: {apartment.expiringDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overview Chart */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
            Overview of expenses and income
          </h3>
          
          {/* Chart Container */}
          <div className="relative h-64 sm:h-80">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Y-axis labels */}
              <g className="text-xs fill-gray-500">
                <text x="10" y="15">90k</text>
                <text x="10" y="35">70k</text>
                <text x="10" y="55">60k</text>
                <text x="10" y="75">50k</text>
                <text x="10" y="95">40k</text>
                <text x="10" y="115">30k</text>
                <text x="10" y="135">20k</text>
                <text x="10" y="155">10k</text>
                <text x="10" y="175">0k</text>
              </g>
              
              {/* Income line (blue) */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                points="40,120 80,100 120,80 160,60 200,40 240,70 280,50 320,30 360,20"
              />
              
              {/* Expenses line (cyan) */}
              <polyline
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3"
                points="40,140 80,130 120,110 160,90 200,70 240,100 280,80 320,60 360,40"
              />
              
              {/* X-axis labels */}
              <g className="text-xs fill-gray-500">
                <text x="35" y="195">1</text>
                <text x="75" y="195">2</text>
                <text x="115" y="195">3</text>
                <text x="155" y="195">4</text>
                <text x="195" y="195">5</text>
                <text x="235" y="195">6</text>
                <text x="275" y="195">7</text>
                <text x="315" y="195">8</text>
                <text x="355" y="195">9</text>
              </g>
            </svg>
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Income</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Expenses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;