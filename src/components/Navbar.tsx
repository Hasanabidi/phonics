import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Volume2, 
  Star, 
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openFreeBookModal: () => void;
}

interface DropdownItem {
  id: string;
  label: string;
  desc: string;
  emoji: string;
  badge?: string;
  badgeColor?: string;
  iconBg: string;
  isAction?: boolean;
}

interface DropdownGroup {
  id: string;
  label: string;
  emoji: string;
  activeMatch: string[];
  activeStyle: string;
  badge?: string;
  align?: 'left' | 'right';
  items: DropdownItem[];
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  openFreeBookModal 
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dropdownGroups: DropdownGroup[] = [
    {
      id: 'books',
      label: 'Story Books',
      emoji: '📚',
      activeMatch: ['decodables', 'leveled'],
      activeStyle: 'bg-rose-100 text-rose-900 border-2 border-rose-300 shadow-xs',
      badge: '40+',
      align: 'left',
      items: [
        {
          id: 'decodables',
          label: 'Decodable Story Books',
          desc: '40 phonics readers with sound-out words',
          emoji: '📖',
          badge: '40 Books',
          badgeColor: 'bg-rose-100 text-rose-700',
          iconBg: 'bg-rose-50 text-rose-600',
        },
        {
          id: 'leveled',
          label: 'Coloring & Leveled Books',
          desc: 'Read, color & trace early readers',
          emoji: '🎨',
          badge: 'Pre-K to 2nd',
          badgeColor: 'bg-sky-100 text-sky-700',
          iconBg: 'bg-sky-50 text-sky-600',
        },
        {
          id: 'free-book',
          label: 'Free Sample Book Gift',
          desc: 'Download "Rick\'s Red Rag" printable story',
          emoji: '🎁',
          badge: 'FREE',
          badgeColor: 'bg-amber-100 text-amber-800',
          iconBg: 'bg-amber-50 text-amber-600',
          isAction: true,
        },
      ],
    },
    {
      id: 'media',
      label: 'Watch & Sing',
      emoji: '🎬',
      activeMatch: ['videos', 'music'],
      activeStyle: 'bg-orange-100 text-orange-900 border-2 border-orange-300 shadow-xs',
      align: 'left',
      items: [
        {
          id: 'videos',
          label: 'Sing & Watch Videos',
          desc: 'Catchy animated letter songs & episodes',
          emoji: '📺',
          badge: 'Cartoons',
          badgeColor: 'bg-orange-100 text-orange-700',
          iconBg: 'bg-orange-50 text-orange-600',
        },
        {
          id: 'music',
          label: 'Music & Audio Tracks',
          desc: 'Joyful phonics beats & sing-along MP3s',
          emoji: '🎵',
          badge: 'MP3s',
          badgeColor: 'bg-teal-100 text-teal-700',
          iconBg: 'bg-teal-50 text-teal-600',
        },
      ],
    },
    {
      id: 'activities',
      label: 'Activities',
      emoji: '🖍️',
      activeMatch: ['worksheets', 'crafts'],
      activeStyle: 'bg-emerald-100 text-emerald-900 border-2 border-emerald-300 shadow-xs',
      badge: '25k+',
      align: 'left',
      items: [
        {
          id: 'worksheets',
          label: 'Worksheets & Printables',
          desc: '25,000+ printable CVC, blends & mazes',
          emoji: '📝',
          badge: '25k+ Pages',
          badgeColor: 'bg-emerald-100 text-emerald-700',
          iconBg: 'bg-emerald-50 text-emerald-600',
        },
        {
          id: 'crafts',
          label: 'Story Crafts & Fun',
          desc: 'Cut, fold & color story puppets & props',
          emoji: '✂️',
          badge: 'Hands-on',
          badgeColor: 'bg-pink-100 text-pink-700',
          iconBg: 'bg-pink-50 text-pink-600',
        },
      ],
    },
    {
      id: 'more',
      label: 'More',
      emoji: '🌟',
      activeMatch: ['shop', 'about', 'contact'],
      activeStyle: 'bg-sky-100 text-sky-900 border-2 border-sky-300 shadow-xs',
      align: 'right',
      items: [
        {
          id: 'shop',
          label: 'Print Shop',
          desc: 'Physical decodable books & learning packs',
          emoji: '🛍️',
          iconBg: 'bg-emerald-50 text-emerald-700',
        },
        {
          id: 'about',
          label: 'About Phonics Garden',
          desc: 'Our science of reading method & mission',
          emoji: '🌱',
          iconBg: 'bg-amber-50 text-amber-700',
        },
        {
          id: 'contact',
          label: 'Help & Contact',
          desc: 'Classroom purchase orders & parent help',
          emoji: '💌',
          iconBg: 'bg-sky-50 text-sky-700',
        },
      ],
    },
  ];

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (groupId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setOpenDropdown(groupId);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  const toggleDropdown = (groupId: string) => {
    setOpenDropdown((prev) => (prev === groupId ? null : groupId));
  };

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const playCheer = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cheer = new SpeechSynthesisUtterance("Welcome to the Phonics Garden! Let's read, sing and sound out!");
      cheer.pitch = 1.35;
      cheer.rate = 1.0;
      window.speechSynthesis.speak(cheer);
    }
  };

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-amber-200/80 shadow-xs">
      {/* Playful Sunny Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-100 via-rose-50 to-emerald-100 border-b border-amber-200/70 text-amber-950 text-xs sm:text-sm py-2 px-3 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 bg-white/90 text-rose-600 px-2.5 py-0.5 rounded-full text-[11px] font-black border border-rose-200 shadow-xs">
            <span>🎁</span>
            <span>FREE GIFT</span>
          </span>
          <span className="font-bold text-amber-950">
            Download & read <span className="font-black text-rose-700">"Rick's Red Rag"</span> for free!
          </span>
          <button 
            onClick={openFreeBookModal}
            className="bg-amber-300 hover:bg-amber-400 text-amber-950 font-black px-3.5 py-0.5 rounded-full shadow-xs text-xs cursor-pointer transition-transform hover:scale-105 active:scale-95 border border-amber-400/60"
          >
            Claim Free Book 📖
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand: Playful Garden & Character */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-300 via-teal-300 to-amber-200 flex items-center justify-center text-2xl shadow-sm border-2 border-emerald-200 group-hover:rotate-6 group-hover:scale-105 transition-all">
              🌱
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-emerald-800 font-heading">
                  Phonics Garden
                </span>
                <span className="bg-amber-200 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-300 shadow-xs animate-wiggle">
                  KIDS! 🎈
                </span>
              </div>
              <p className="text-[11px] text-emerald-700/80 font-bold hidden sm:block">
                Read, Play & Sound Out! ✨
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs with Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Direct Home Tab */}
            <button
              onClick={() => handleNavClick('home')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs xl:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-amber-300 text-amber-950 border-2 border-amber-400 shadow-xs'
                  : 'text-slate-700 hover:bg-amber-100/70 hover:text-amber-950'
              }`}
            >
              <span>🏡</span>
              <span>Home</span>
            </button>

            {/* Dropdown Groups */}
            {dropdownGroups.map((group) => {
              const isGroupActive = group.activeMatch.includes(activeTab);
              const isOpen = openDropdown === group.id;

              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(group.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => toggleDropdown(group.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs xl:text-sm font-black transition-all cursor-pointer ${
                      isGroupActive
                        ? group.activeStyle
                        : 'text-slate-700 hover:bg-amber-100/70 hover:text-amber-950'
                    }`}
                    aria-expanded={isOpen}
                  >
                    <span>{group.emoji}</span>
                    <span>{group.label}</span>
                    {group.badge && !isGroupActive && (
                      <span className="text-[10px] bg-amber-200/90 text-amber-900 px-1.5 py-0.2 rounded-full font-black">
                        {group.badge}
                      </span>
                    )}
                    <ChevronDown 
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-900' : ''
                      }`} 
                    />
                  </button>

                  {/* Dropdown Popover */}
                  {isOpen && (
                    <div 
                      className={`absolute top-full mt-2 w-76 sm:w-80 bg-white rounded-3xl shadow-xl shadow-amber-900/10 border-2 border-amber-200/90 p-2.5 z-50 animate-pop ${
                        group.align === 'right' ? 'right-0' : 'left-0'
                      }`}
                    >
                      {/* Little decorative bubble stem pointer */}
                      <div 
                        className={`absolute -top-2 w-3.5 h-3.5 bg-white border-t-2 border-l-2 border-amber-200/90 rotate-45 ${
                          group.align === 'right' ? 'right-6' : 'left-6'
                        }`} 
                      />

                      <div className="flex flex-col gap-1.5 relative z-10">
                        {group.items.map((item) => {
                          const isItemActive = activeTab === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                if (item.isAction) {
                                  openFreeBookModal();
                                } else {
                                  handleNavClick(item.id);
                                }
                                setOpenDropdown(null);
                              }}
                              className={`w-full flex items-center gap-3 p-2.5 rounded-2xl transition-all cursor-pointer text-left ${
                                isItemActive 
                                  ? 'bg-amber-100/90 text-amber-950 border border-amber-300/80 shadow-xs' 
                                  : 'hover:bg-amber-50/80 text-slate-700'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-xs border border-white/60 ${item.iconBg}`}>
                                {item.emoji}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 justify-between">
                                  <span className="text-xs font-black text-slate-800 truncate">
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${item.badgeColor || 'bg-amber-100 text-amber-800'}`}>
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] font-semibold text-slate-500 truncate mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Direct Sound Game Button */}
            <button
              onClick={() => handleNavClick('soundboard')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs xl:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'soundboard'
                  ? 'bg-purple-400 text-purple-950 border-2 border-purple-500 shadow-sm'
                  : 'bg-purple-100/80 hover:bg-purple-200 text-purple-900 border border-purple-200 hover:scale-105'
              }`}
            >
              <span className="text-base">🎮</span>
              <span>Sound Game</span>
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Cheer Sound Button */}
            <button
              onClick={playCheer}
              className="w-10 h-10 rounded-2xl bg-teal-100 hover:bg-teal-200 text-teal-800 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 border border-teal-200 shadow-xs"
              title="Hear Welcome Cheer 🎈"
              aria-label="Play welcome cheer"
            >
              <Volume2 className="w-5 h-5 text-teal-700" />
            </button>

            {/* Join Pass Club Button */}
            <button
              onClick={() => handleNavClick('pricing')}
              className={`px-4 py-2.5 font-black text-xs xl:text-sm rounded-2xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95 ${
                activeTab === 'pricing'
                  ? 'bg-amber-400 text-amber-950 border-2 border-amber-500 shadow-md ring-2 ring-amber-300'
                  : 'bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-amber-950 border-2 border-amber-300'
              }`}
            >
              <Star className="w-4 h-4 fill-amber-500 text-amber-600" />
              <span>Join Pass ($59.95)</span>
            </button>
          </div>

          {/* Mobile Quick Action & Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => handleNavClick('soundboard')}
              className="text-xs font-black px-2.5 py-1.5 bg-purple-400 text-purple-950 rounded-xl shadow-xs border border-purple-300 flex items-center gap-1 cursor-pointer"
            >
              <span>🎮</span>
              <span>Play</span>
            </button>
            <button
              onClick={playCheer}
              className="p-1.5 sm:p-2 rounded-xl bg-teal-100 text-teal-800 border border-teal-200 cursor-pointer"
              title="Cheer"
              aria-label="Play cheer"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-2xl bg-amber-100 text-amber-950 hover:bg-amber-200 border border-amber-300 cursor-pointer transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-900" /> : <Menu className="w-6 h-6 text-amber-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Clean Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-amber-50/98 backdrop-blur-md border-b-4 border-amber-200 px-4 pt-4 pb-8 max-h-[85vh] overflow-y-auto shadow-xl animate-pop">
          {/* Top Quick Shortcuts */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <button
              onClick={() => handleNavClick('home')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl font-black text-xs cursor-pointer border-2 transition-all ${
                activeTab === 'home'
                  ? 'bg-amber-300 text-amber-950 border-amber-400 shadow-xs'
                  : 'bg-white text-slate-800 border-amber-200 hover:bg-amber-100/70'
              }`}
            >
              <span className="text-lg">🏡</span>
              <span>Garden Home</span>
            </button>
            <button
              onClick={() => handleNavClick('soundboard')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl font-black text-xs cursor-pointer border-2 transition-all ${
                activeTab === 'soundboard'
                  ? 'bg-purple-400 text-purple-950 border-purple-500 shadow-xs'
                  : 'bg-purple-100 text-purple-900 border-purple-200 hover:bg-purple-200'
              }`}
            >
              <span className="text-lg">🎮</span>
              <span>Sound Game</span>
            </button>
          </div>

          {/* Grouped Category Cards */}
          <div className="space-y-3 mb-5">
            {dropdownGroups.map((group) => (
              <div 
                key={group.id} 
                className="bg-white rounded-2xl border-2 border-amber-200/80 p-2.5 shadow-xs"
              >
                <div className="flex items-center gap-2 px-2 py-1 mb-1">
                  <span className="text-base">{group.emoji}</span>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                    {group.label}
                  </span>
                  {group.badge && (
                    <span className="text-[10px] bg-amber-200/90 text-amber-900 px-1.5 py-0.2 rounded-full font-black">
                      {group.badge}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isItemActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.isAction) {
                            openFreeBookModal();
                            setMobileMenuOpen(false);
                          } else {
                            handleNavClick(item.id);
                          }
                        }}
                        className={`w-full flex items-center gap-3 p-2 rounded-xl text-left cursor-pointer transition-all ${
                          isItemActive
                            ? 'bg-amber-100 text-amber-950 border border-amber-300 font-black'
                            : 'hover:bg-amber-50/80 text-slate-700'
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0 border border-amber-100 ${item.iconBg}`}>
                          {item.emoji}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800 truncate">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full shrink-0 ${item.badgeColor || 'bg-amber-100 text-amber-800'}`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 font-semibold truncate">
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2 border-t border-amber-200">
            <button
              onClick={() => handleNavClick('pricing')}
              className="w-full py-3 px-4 font-black text-amber-950 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 rounded-2xl shadow-sm border-2 border-amber-300 text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <Star className="w-4 h-4 fill-amber-500 text-amber-600" />
              <span>Join All-Access Club ($59.95)</span>
            </button>
            <button
              onClick={() => {
                openFreeBookModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 font-black text-rose-800 bg-rose-100 hover:bg-rose-200 rounded-2xl border border-rose-200 text-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <span>📖</span>
              <span>Claim Free Sample Story Book</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
