import React, { useState } from 'react';
import { 
  Mail, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  FileText, 
  ShieldCheck,
  BookOpen
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Teacher',
    schoolName: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', role: 'Teacher', schoolName: '', message: '' });
      alert("Thank you! Your message has been sent to info@phonicsgarden.com. A reading curriculum coordinator will get back to you within 24 hours.");
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      
      {/* Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Direct Educator Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          How Can We Help Your Classroom?
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Have questions regarding school POs, multi-seat district licenses, or decodable reader curriculum pacing? We're here to help!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Card */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-8 space-y-6 shadow-xl">
          <div>
            <h3 className="text-xl font-bold">Phonics Garden Support</h3>
            <p className="text-xs text-slate-300 mt-1">Dedicated curriculum team ready to assist.</p>
          </div>

          <div className="space-y-4 text-xs text-slate-200">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-white">Email Us Directly</span>
                <a href="mailto:info@phonicsgarden.com" className="text-emerald-300 hover:underline">
                  info@phonicsgarden.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-white">School District Purchase Orders</span>
                <span>We gladly accept official School POs and bulk purchase requisitions.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-white">Response Guarantee</span>
                <span>All inquiries answered within 1 business day.</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
            © 2012–2026 Phonics Garden. All rights reserved.
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Maria Sanchez"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="maria@school.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Teacher">Classroom Teacher</option>
                  <option value="Homeschool">Homeschool Parent</option>
                  <option value="Specialist">Reading Specialist / SLP</option>
                  <option value="Administrator">School Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">School / Organization</label>
                <input
                  type="text"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  placeholder="e.g. Maple Elementary"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Message or Inquiry</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Ask us anything about decodable levels, worksheet subscriptions, or school orders..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={formSent}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>{formSent ? 'Sending Inquiry...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
