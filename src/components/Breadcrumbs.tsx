import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTES_CONFIG, RouteMeta } from '../utils/seo';

interface BreadcrumbsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ activeTab, setActiveTab }) => {
  if (activeTab === 'home') return null;

  const currentMeta: RouteMeta = ROUTES_CONFIG[activeTab] || ROUTES_CONFIG.home;

  return (
    <nav 
      aria-label="Breadcrumb"
      className="bg-amber-100/50 border-b border-amber-200/70 py-2.5 px-4 sm:px-6 lg:px-8 text-xs font-bold text-slate-600 select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
        <ol 
          itemScope 
          itemType="https://schema.org/BreadcrumbList"
          className="flex items-center gap-2 flex-wrap"
        >
          <li 
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
            className="flex items-center gap-1.5"
          >
            <button
              onClick={() => setActiveTab('home')}
              className="text-emerald-800 hover:text-emerald-950 hover:underline flex items-center gap-1 cursor-pointer font-black"
              itemProp="item"
            >
              <span>🏡</span>
              <span itemProp="name">Garden Fun</span>
            </button>
            <meta itemProp="position" content="1" />
          </li>

          <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />

          <li 
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
            className="flex items-center gap-1.5 text-amber-950 font-black"
          >
            <span aria-current="page" itemProp="name" className="flex items-center gap-1">
              <span>{currentMeta.emoji}</span>
              <span>{currentMeta.breadcrumb}</span>
            </span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </div>
    </nav>
  );
};
