import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Printer, 
  School, 
  CreditCard, 
  Lock,
  ArrowRight
} from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle?: string;
  resourceType?: string;
  onSuccess?: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  resourceTitle = "Full Decodable Library",
  resourceType = "Book",
  onSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'teacher' | 'schoolPo'>('teacher');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasActivated, setHasActivated] = useState(false);

  // School PO Form State
  const [schoolName, setSchoolName] = useState('');
  const [district, setDistrict] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [poNumber, setPoNumber] = useState('PO-2026-');
  const [poQuoteGenerated, setPoQuoteGenerated] = useState(false);

  if (!isOpen) return null;

  const handleSimulatedCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasActivated(true);
      if (onSuccess) onSuccess();
      setTimeout(() => {
        setHasActivated(false);
        onClose();
      }, 1500);
    }, 700);
  };

  const handlePrintPoQuote = () => {
    setPoQuoteGenerated(true);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-4 border-emerald-400 overflow-hidden relative animate-scale-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 p-6 text-white relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Classroom & District Licensing</span>
          </div>
          <h3 className="text-2xl font-black font-heading">
            Unlock {resourceTitle}
          </h3>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            This {resourceType.toLowerCase()} is part of our accredited Science of Reading collection. Choose your license below:
          </p>

          {/* Licensing Mode Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('teacher')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'teacher'
                  ? 'bg-white text-emerald-900 shadow-md'
                  : 'bg-emerald-700/60 hover:bg-emerald-700 text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Teacher Classroom Pass ($49/yr)</span>
            </button>
            <button
              onClick={() => setActiveTab('schoolPo')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'schoolPo'
                  ? 'bg-white text-emerald-900 shadow-md'
                  : 'bg-emerald-700/60 hover:bg-emerald-700 text-white'
              }`}
            >
              <School className="w-3.5 h-3.5" />
              <span>School District Purchase Order (PO)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: TEACHER CLASSROOM PASS */}
        {activeTab === 'teacher' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200">
              <div>
                <span className="text-xs font-extrabold uppercase text-emerald-700 tracking-wider">Single Teacher License</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-black text-slate-900">$49</span>
                  <span className="text-xs text-slate-500 font-bold">/ full school year</span>
                </div>
              </div>
              <div className="text-xs text-emerald-800 font-semibold space-y-1">
                <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Unlimited classroom prints (35 students)</div>
                <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> All 40 Foldable Decodable Mini-Books</div>
                <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Smartboard distraction-free presentation</div>
              </div>
            </div>

            {hasActivated ? (
              <div className="bg-emerald-600 text-white p-4 rounded-2xl text-center space-y-2 animate-bounce-slow">
                <Check className="w-8 h-8 mx-auto" />
                <h4 className="font-black text-base">Classroom Pass Activated!</h4>
                <p className="text-xs text-emerald-100">Enjoy unlimited downloads and printing rights.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={handleSimulatedCheckout}
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-sm rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all border border-emerald-500 disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isProcessing ? 'Activating Classroom Pass...' : 'Activate Single Teacher Pass ($49)'}</span>
                </button>
                <p className="text-[11px] text-center text-slate-400">
                  🔒 30-Day Money-Back Guarantee • Instant Receipt for Teacher Expense Reimbursement
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SCHOOL DISTRICT PURCHASE ORDER (PO) GENERATOR */}
        {activeTab === 'schoolPo' && (
          <div className="p-6 sm:p-8 space-y-5">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-black text-slate-900 block">District Requisition & W-9 Support</span>
              We accept official School District Purchase Orders, credit card requisitions, and ACH transfers. Generate your formal quote below to submit to your school bookkeeper.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">School / Institution Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lincoln Elementary School"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">School District / Board</label>
                <input
                  type="text"
                  placeholder="e.g. District 99"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Accounts Payable / Teacher Email</label>
                <input
                  type="email"
                  placeholder="billing@school.edu"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Purchase Order # (Optional)</label>
                <input
                  type="text"
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <div>
                <span className="text-xs text-slate-500 font-semibold block">Building-Wide License</span>
                <span className="text-xl font-black text-slate-900">$199.00 / yr</span>
              </div>
              <button
                onClick={handlePrintPoQuote}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer shadow-md transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Requisition Quote</span>
              </button>
            </div>

            {poQuoteGenerated && (
              <p className="text-[11px] text-emerald-600 font-bold text-center">
                ✓ Formal Quote Generated! Email PO to po@phonicsgarden.com for same-day building activation.
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
