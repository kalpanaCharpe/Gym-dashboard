import React from 'react';
import { Check, Crown, Zap, Star } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const MembershipPlans = () => {
  const { data, loading } = useData();

  const icons = {
    Basic: Zap,
    Standard: Star,
    Premium: Crown,
    Elite: Crown
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Membership Plans</h1>
        <p className="page-subtitle">Choose the perfect plan for your fitness journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.membershipPlans.map((plan) => {
          const Icon = icons[plan.name] || Star;
          return (
            <div
              key={plan.id}
              className="card p-6 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col"
              style={{ borderTop: `4px solid ${plan.color}` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <Icon className="w-full h-full" style={{ color: plan.color }} />
              </div>

              <div className="relative z-10 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${plan.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: plan.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-dark-500">{plan.duration}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500 dark:text-dark-500">/month</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-dark-600 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-5 h-5 flex-shrink-0 text-green-500 mt-0.5" />
                      <span className="text-gray-700 dark:text-dark-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg mt-auto"
                  style={{
                    backgroundColor: plan.color,
                    color: 'white'
                  }}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MembershipPlans;
