import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Star, 
  HelpCircle, 
  Zap, 
  Users,
  Lock,
  ArrowRight
} from 'lucide-react';
import { PRICING_PLANS } from '../data/siteData';

interface PricingPageProps {
  openFreeBookModal: () => void;
  setActiveTab: (tab: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ openFreeBookModal, setActiveTab }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-all-inclusive');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = (planName: string, price: number) => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      alert(`Welcome to Phonics Garden! You have selected the ${planName} ($${price}/yr). Your classroom account is ready to begin streaming and printing.`);
      setCheckoutSuccess(false);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 text-left">
      
      {/* Pricing Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          Simple, Transparent Subscriptions
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Unlock the Complete Phonics Garden
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          No hidden fees or recurring video rental charges. All memberships include unlimited digital access and classroom printing rights for an entire school year.
        </p>
      </div>

      {/* PRICING CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const isFeatured = plan.popular;
          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all relative ${
                isFeatured
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white shadow-2xl ring-4 ring-emerald-500 scale-105 z-10'
                  : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-lg text-slate-900'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className={`font-extrabold text-xl ${isFeatured ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mt-1 min-h-[32px] ${isFeatured ? 'text-slate-300' : 'text-slate-500'}`}>
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mt-5 pb-5 border-b border-slate-200/20">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight">
                    ${plan.price.toFixed(2)}
                  </span>
                  <span className={`text-xs ml-1 font-medium ${isFeatured ? 'text-emerald-300' : 'text-slate-400'}`}>
                    /{plan.billingPeriod}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mt-6 text-xs">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isFeatured ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      <span className={isFeatured ? 'text-slate-200' : 'text-slate-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <button
                  onClick={() => handleCheckout(plan.name, plan.price)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isFeatured
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-105'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* A-LA-CARTE CALLOUT */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-200/60 px-2.5 py-0.5 rounded-full">
            Flexible Option
          </span>
          <h3 className="text-2xl font-black text-amber-950">
            Don't need an annual membership?
          </h3>
          <p className="text-sm text-amber-900 max-w-xl">
            You can purchase individual word wheel packets, flip-books, and 500-page mega bundles a-la-carte from our Shop starting from only $2.99!
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('shop')}
            className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            Visit A-La-Carte Shop &rarr;
          </button>
          <button
            onClick={openFreeBookModal}
            className="px-5 py-3.5 bg-white border border-amber-300 text-amber-950 font-bold rounded-xl text-xs hover:bg-amber-100/50 transition-colors cursor-pointer"
          >
            Free Book Sample
          </button>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <div className="max-w-4xl mx-auto space-y-6 pt-6">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-black text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need to know about subscriptions, classroom licenses, and downloads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
            <h4 className="font-extrabold text-sm text-slate-900">Can I print worksheets for all my students?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes! All active memberships include full classroom duplication rights. You can print as many copies as needed for your roster or homeschool group.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
            <h4 className="font-extrabold text-sm text-slate-900">Are there video streaming rental fees?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No! Unlike external video rental models, your Phonics Garden membership includes 100% unlimited, unmetered streaming across all devices.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
            <h4 className="font-extrabold text-sm text-slate-900">What age group is this designed for?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our systematic continuum starts with Pre-K letter sound recognition (Book 1) and progresses through Kindergarten CVC words, up to Grade 2 diphthongs and multi-syllable patterns.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
            <h4 className="font-extrabold text-sm text-slate-900">Can I cancel anytime?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes. You have complete control over your subscription with zero lock-in contracts or hassle.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
