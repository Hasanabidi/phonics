import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';
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
import { PATH_TO_TAB, TAB_TO_PATH, updateSEO } from './utils/seo';

const getInitialTab = (): string => {
  if (typeof window === 'undefined') return 'home';

  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  if (PATH_TO_TAB[pathname]) {
    return PATH_TO_TAB[pathname];
  }

  // Hash fallback for static hosting
  if (window.location.hash) {
    const hashPath = window.location.hash.replace(/^#\/?/, '/').toLowerCase();
    if (PATH_TO_TAB[hashPath]) {
      return PATH_TO_TAB[hashPath];
    }
  }

  return 'home';
};

export function App() {
  const [activeTab, setActiveTabState] = useState<string>(getInitialTab);
  const [selectedBookId, setSelectedBookId] = useState<number>(1);
  const [isFreeBookModalOpen, setIsFreeBookModalOpen] = useState<boolean>(false);

  const openFreeBookModal = () => setIsFreeBookModalOpen(true);
  const closeFreeBookModal = () => setIsFreeBookModalOpen(false);

  // Synchronize navigation with History API and SEO metadata
  const handleNavigate = (tab: string, pushHistory = true) => {
    setActiveTabState(tab);
    updateSEO(tab);

    if (pushHistory && typeof window !== 'undefined') {
      const targetPath = TAB_TO_PATH[tab] || '/';
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab }, '', targetPath);
      }
    }
  };

  // Browser Back/Forward navigation listener & initial SEO mount
  useEffect(() => {
    const onPopState = () => {
      const tab = getInitialTab();
      setActiveTabState(tab);
      updateSEO(tab);
    };

    window.addEventListener('popstate', onPopState);

    // Initial SEO update
    updateSEO(activeTab);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            setActiveTab={handleNavigate}
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
            setActiveTab={handleNavigate}
          />
        );
      case 'videos':
        return <VideosPage setActiveTab={handleNavigate} />;
      case 'worksheets':
        return (
          <WorksheetsPage
            setActiveTab={handleNavigate}
            openFreeBookModal={openFreeBookModal}
          />
        );
      case 'leveled':
        return (
          <LeveledReadersPage
            setActiveTab={handleNavigate}
            openFreeBookModal={openFreeBookModal}
          />
        );
      case 'crafts':
        return <CraftsPage setActiveTab={handleNavigate} />;
      case 'music':
        return <MusicPage setActiveTab={handleNavigate} />;
      case 'soundboard':
        return <SoundboardPage />;
      case 'shop':
        return (
          <ShopPage
            setActiveTab={handleNavigate}
            openFreeBookModal={openFreeBookModal}
          />
        );
      case 'pricing':
        return (
          <PricingPage
            openFreeBookModal={openFreeBookModal}
            setActiveTab={handleNavigate}
          />
        );
      case 'contact':
        return <ContactPage />;
      case 'about':
        return (
          <AboutPhonicsPage
            setActiveTab={handleNavigate}
            openFreeBookModal={openFreeBookModal}
          />
        );
      case 'terms':
        return (
          <div className="max-w-4xl mx-auto px-4 py-16 text-left space-y-6">
            <h1 className="text-3xl font-black text-slate-900 font-heading">Terms & Conditions</h1>
            <p className="text-xs text-slate-500 font-semibold">Last updated: 2026</p>
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed bg-white p-8 rounded-3xl border-2 border-amber-200 shadow-sm">
              <p>Welcome to Phonics Garden. By accessing or using our websites, materials, worksheets, videos, and subscription services, you agree to these terms.</p>
              <h3 className="font-black text-sm text-slate-900 pt-2 font-heading">1. Classroom & Personal License</h3>
              <p>Active members receive a non-exclusive license to download, print, stream, and display our materials for their individual classroom students or household members. Commercial redistribution, re-selling, or unauthorized re-hosting of PDF and video assets is strictly prohibited.</p>
              <h3 className="font-black text-sm text-slate-900 pt-2 font-heading">2. Streaming Access</h3>
              <p>Phonics Garden videos and music files are provided for streaming through registered member accounts with zero per-video rental fees during the active membership term.</p>
              <h3 className="font-black text-sm text-slate-900 pt-2 font-heading">3. Contact</h3>
              <p>Questions regarding licensing or purchase orders can be directed to <a href="mailto:info@phonicsgarden.com" className="text-emerald-700 underline font-bold">info@phonicsgarden.com</a>.</p>
            </div>
          </div>
        );
      default:
        return (
          <HomePage
            setActiveTab={handleNavigate}
            openFreeBookModal={openFreeBookModal}
            setSelectedBook={(id) => setSelectedBookId(id)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-900 selection:bg-amber-300 selection:text-amber-950">
      {/* Universal Top Nav */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        openFreeBookModal={openFreeBookModal}
      />

      {/* Semantic Breadcrumbs Bar */}
      <Breadcrumbs
        activeTab={activeTab}
        setActiveTab={handleNavigate}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Universal Joyful Pastel Footer */}
      <Footer
        setActiveTab={handleNavigate}
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
