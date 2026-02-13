import React from 'react';
import { PRICING_PLANS } from '../constants';
import { Check, Zap } from 'lucide-react';

interface PricingProps {
  onSignup: (planId: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ onSignup }) => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Choose Your Power Level</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Whether you are just exploring or building the future, we have a plan for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {PRICING_PLANS.map((plan) => (
            <div 
              key={plan.id}
              className={`relative rounded-3xl p-8 border transition-all duration-300 ${
                plan.highlight 
                  ? 'bg-slate-900/80 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)] transform md:-translate-y-4 z-10' 
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
                  <Zap size={12} fill="currentColor" /> Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-slate-500 font-medium">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <div className={`mt-0.5 rounded-full p-0.5 ${plan.highlight ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-400'}`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => onSignup(plan.id)}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  plan.highlight 
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg hover:shadow-purple-500/25' 
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;