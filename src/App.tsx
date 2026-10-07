import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { DecodablesPage } from './components/DecodablesPage';
import { VideosPage } from './components/VideosPage';
import { WorksheetsPage } from './components/WorksheetsPage';
import { LeveledReadersPage } from './components/LeveledReadersPage';
import { CraftsPage } from './components/CraftsPage';
import { MusicPage } from './components/MusicPage';
import { SoundboardPage } from './components/SoundboardPage';
import { ShopPage } from './components/ShopPage';
import { PricingPage } from './components/PricingPage';
import { ContactPage } from './components/ContactPage';
import { AboutPhonicsPage } from './components/AboutPhonicsPage';
import { FreeBookModal } from './components/FreeBookModal';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedBookId, setSelectedBookId] = useState<number>(1);
  const [isFreeBookModalOpen, setIsFreeBookModalOpen] = useState<boolean>(false);

  const openFreeBookModal = () => setIsFreeBookModalOpen(true);
  const closeFreeBookModal = () => setIsFreeBookModalOpen(false);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            setActiveTab={setActiveTab}
            openFreeBookModal={openFreeBookModal}
            setSelectedBook={(id) => setSelectedBookId(id)}
          />
        );
      case 'decodables':
        return (
          <DecodablesPage
            selectedBookId={selectedBookId}
            setSelectedBookId={setSelectedBookId}
            openFreeBookModal={openFreeBookModal}
            setActiveTab={setActiveTab}
          />
        );
      case 'videos':
        return <VideosPage setActiveTab={setActiveTab} />;
      case 'worksheets':
        return (
          <WorksheetsPage
            setActiveTab={setActiveTab}
            openFreeBookModal={openFreeBookModal}
          />
        );
      case 'leveled':
        return (
          <LeveledReadersPage
            setActiveTab={setActiveTab}
            openFreeBookModal={openFreeBookModal}
          />
        );
      case 'crafts':
        return <CraftsPage setActiveTab={setActiveTab} />;
      case 'music':
        return <MusicPage setActiveTab={setActiveTab} />;
      case 'soundboard':
        return <SoundboardPage />;
      case 'shop':
        return (
          <ShopPage
            setActiveTab={setActiveTab}
            openFreeBookModal={openFreeBookModal}
          />
        );
      case 'pricing':
        return (
          <PricingPage
            openFreeBookModal={openFreeBookModal}
            setActiveTab={setActiveTab}
          />
        );
      case 'contact':
        return <ContactPage />;
      case 'about':
        return (
          <AboutPhonicsPage
            setActiveTab={setActiveTab}
            openFreeBookModal={openFreeBookModal}
          />
        );
      case 'terms':
        return (
          <div className="max-w-4xl mx-auto px-4 py-16 text-left space-y-6">
            <h1 className="text-3xl font-black text-slate-900">Terms & Conditions</h1>
            <p className="text-xs text-slate-500">Last updated: 2026</p>
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed bg-white p-8 rounded-3xl border border-slate-200">
              <p>Welcome to Phonics Garden. By accessing or using our websites, materials, worksheets, videos, and subscription services, you agree to these terms.</p>
              <h3 className="font-bold text-sm text-slate-900 pt-2">1. Classroom & Personal License</h3>
              <p>Active members receive a non-exclusive license to download, print, stream, and display our materials for their individual classroom students or household members. Commercial redistribution, re-selling, or unauthorized re-hosting of PDF and video assets is strictly prohibited.</p>
              <h3 className="font-bold text-sm text-slate-900 pt-2">2. Streaming Access</h3>
              <p>Phonics Garden videos and music files are provided for streaming through registered member accounts with zero per-video rental fees during the active membership term.</p>
              <h3 className="font-bold text-sm text-slate-900 pt-2">3. Contact</h3>
              <p>Questions regarding licensing or purchase orders can be directed to <a href="mailto:info@phonicsgarden.com" className="text-emerald-700 underline font-bold">info@phonicsgarden.com</a>.</p>
            </div>
          </div>
        );
      default:
        return (
          <HomePage
            setActiveTab={setActiveTab}
            openFreeBookModal={openFreeBookModal}
            setSelectedBook={(id) => setSelectedBookId(id)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Universal Top Nav */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openFreeBookModal={openFreeBookModal}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Universal Modern Footer */}
      <Footer
        setActiveTab={setActiveTab}
        openFreeBookModal={openFreeBookModal}
      />

      {/* Free Sample Book Modal Overlay */}
      <FreeBookModal
        isOpen={isFreeBookModalOpen}
        onClose={closeFreeBookModal}
      />
    </div>
  );
}

export default App;
