import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  CreditCard, 
  School, 
  ArrowRight,
  Printer
} from 'lucide-react';
import { PRICING_PLANS } from '../data/siteData';
import { PaywallModal } from './PaywallModal';

interface PricingPageProps {
  openFreeBookModal: () => void;
  setActiveTab: (tab: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ openFreeBookModal, setActiveTab }) => {
  const [paywallModalOpen, setPaywallModalOpen] = useState(false);
  const [selectedPlanTitle, setSelectedPlanTitle] = useState('Teacher Classroom Pass');

  const handlePlanClick = (planName: string) => {
    setSelectedPlanTitle(planName);
    setPaywallModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 text-left">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
          Transparent Educational Pricing
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight font-heading">
          Classroom Print Rights & Digital Access
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          Whether you teach in a single kindergarten room or run an entire elementary district, our licenses are simple, tax-exempt friendly, and PO-ready.
        </p>
      </div>

      {/* 3-TIER PRICING GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const isFeatured = plan.popular;
          return (
            <div
              key={plan.id}
              className={`rounded-4xl p-7 flex flex-col justify-between transition-all relative ${
                isFeatured
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white shadow-2xl ring-4 ring-emerald-500 scale-105 z-10'
                  : 'bg-white border-2 border-slate-200 shadow-sm hover:shadow-md text-slate-900'
              }`}
            >
              {plan.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap ${
                  isFeatured ? 'bg-emerald-400 text-emerald-950' : 'bg-slate-900 text-white'
                }`}>
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className={`font-black text-xl font-heading ${isFeatured ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mt-1.5 min-h-[32px] ${isFeatured ? 'text-slate-300' : 'text-slate-500'}`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-5 pb-5 border-b border-slate-200/20">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight">
                    ${plan.price.toFixed(2)}
                  </span>
                  <span className={`text-xs ml-1 font-bold ${isFeatured ? 'text-emerald-300' : 'text-slate-400'}`}>
                    /{plan.billingPeriod}
                  </span>
                </div>

                {/* Features */}
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
                  onClick={() => handlePlanClick(plan.name)}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isFeatured
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-105'
                      : plan.isSchoolPO
                      ? 'bg-slate-900 hover:bg-slate-800 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  }`}
                >
                  {plan.isSchoolPO ? <Printer className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                  <span>{plan.cta}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* SCHOOL DISTRICT PO BANNER */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border-2 border-indigo-900">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 px-3 py-1 rounded-full text-xs font-bold text-indigo-300">
            <School className="w-4 h-4" />
            <span>District Accounts Payable & W-9 Support</span>
          </div>
          <h3 className="text-2xl font-black font-heading">
            Need an Official Quote for your Principal or Bookkeeper?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            We generate instant PDF quotes with vendor Tax ID, W-9 verification, and standard 30-day net terms for school boards and districts.
          </p>
        </div>
        <button
          onClick={() => handlePlanClick("School & District PO Pass")}
          className="px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black rounded-2xl text-xs sm:text-sm transition-all shadow-md cursor-pointer whitespace-nowrap shrink-0"
        >
          Generate Official Quote →
        </button>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto space-y-6 pt-4">
        <div className="text-center space-y-1 mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Classroom Licensing FAQ
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Everything teachers and administrators ask about printing rights and audio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-1.5 shadow-xs">
            <h4 className="font-black text-sm text-slate-900">Can I print books for all my students?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes! The Teacher Classroom Pass grants full duplication rights to print both foldable 8-page mini books and worksheets for up to 35 students in your classroom.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-1.5 shadow-xs">
            <h4 className="font-black text-sm text-slate-900">How does the school PO process work?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Simply generate an instant requisition quote, forward it to your school's accounts payable department, and email the signed PO to po@phonicsgarden.com for same-day building activation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-1.5 shadow-xs">
            <h4 className="font-black text-sm text-slate-900">Is this aligned with the Science of Reading?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes. Every reader and worksheet follows our 6-phase systematic synthetic phonics (SSP) scope & sequence with pure phoneme audio and taught heart words.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-1.5 shadow-xs">
            <h4 className="font-black text-sm text-slate-900">What devices are supported for smartboards?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our interactive lab runs directly in any modern browser on SMART Boards, Promethean panels, ViewSonic touchscreens, Chromebooks, and iPads with zero installation.
            </p>
          </div>
        </div>
      </div>

      {/* Paywall & School PO Modal */}
      <PaywallModal
        isOpen={paywallModalOpen}
        onClose={() => setPaywallModalOpen(false)}
        resourceTitle={selectedPlanTitle}
        resourceType="License"
      />

    </div>
  );
};
