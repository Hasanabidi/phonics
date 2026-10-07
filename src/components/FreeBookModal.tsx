import React, { useState } from 'react';
import { X, Download, CheckCircle2, BookOpen, Sparkles, Star } from 'lucide-react';

interface FreeBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreeBookModal: React.FC<FreeBookModalProps> = ({ isOpen, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloaded(true);
    setTimeout(() => {
      // Simulate trigger download
      const link = document.createElement('a');
      link.href = 'https://ed167b42-24b9-4565-8c1d-85fe904e123d.filesusr.com/ugd/2bc6b7_70ca5cceb59c42079b10c812c2c60c17.pdf';
      link.target = '_blank';
      link.download = "Ricks_Red_Rag_Book_1_Phonics_Garden.pdf";
      link.click();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in text-left">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider bg-rose-100 text-rose-700 px-3 py-1 rounded-full">
              Free Gift for You
            </span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Get "Rick's Red Rag" (Book 1) Decodable Reader
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Your child will love reading this playful story! Includes full 16-page color reader, 5 reading comprehension questions, and companion printable worksheets.
            </p>
          </div>

          {/* Book Card Preview */}
          <div className="bg-gradient-to-br from-rose-500 to-amber-500 p-4 rounded-2xl text-white flex items-center gap-4 shadow-md">
            <div className="text-4xl bg-white/20 p-2.5 rounded-xl">🐕</div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded">
                Book 1 of 40
              </span>
              <h4 className="font-black text-lg">Rick's Red Rag</h4>
              <p className="text-xs text-rose-100">Target: Short /a/ & /i/ sounds (CVC)</p>
            </div>
          </div>

          {downloaded ? (
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center font-bold">
                ✓
              </div>
              <h4 className="font-bold text-sm text-emerald-950">Your PDF Download Has Begun!</h4>
              <p className="text-xs text-emerald-800">
                Check your download tray. A copy has also been sent to <strong>{email}</strong>.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Close & Start Reading
              </button>
            </div>
          ) : (
            <form onSubmit={handleDownload} className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Where should we send your printable PDF?
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter parent or teacher email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold rounded-xl text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Instant Free PDF Now</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Free • No credit card required • Instant access</span>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
