import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Star, 
  Download, 
  CheckCircle2, 
  Filter, 
  Search, 
  Sparkles, 
  ShoppingCart, 
  Tag,
  ShieldCheck
} from 'lucide-react';
import { SHOP_DATA, ShopProduct } from '../data/siteData';

interface ShopPageProps {
  setActiveTab: (tab: string) => void;
  openFreeBookModal: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ setActiveTab, openFreeBookModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartCount, setCartCount] = useState<number>(0);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const categories = ['All', 'Word Wheel', 'Flip-Book', 'Multi-Level Bundle', 'Mega Series'];

  const filteredProducts = SHOP_DATA.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddToCart = (product: ShopProduct) => {
    setCartCount(cartCount + 1);
    setAddedItem(product.title);
    setTimeout(() => setAddedItem(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-amber-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            <ShoppingBag className="w-3.5 h-3.5" /> A-La-Carte Digital Downloads
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Phonics Garden Printable Store
          </h1>
          <p className="text-teal-100 text-base sm:text-lg leading-relaxed">
            Prefer buying individual units instead of a membership? Grab our bestselling Word Wheels, Bossy-R multi-level bundles, and decodable book collections starting at just $2.99!
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={openFreeBookModal}
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-sm shadow-md hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Download Free Sample First</span>
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className="px-5 py-3 rounded-xl bg-teal-950/40 hover:bg-teal-950/60 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
            >
              Want Everything? View Memberships &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Cart Notification Toast */}
      {addedItem && (
        <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2 text-sm font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span>Added "{addedItem}" to your digital cart!</span>
          </div>
          <button 
            onClick={() => alert("Proceeding to secure SSL instant digital checkout...")}
            className="px-4 py-1.5 bg-white text-emerald-800 rounded-xl text-xs font-black shadow-xs cursor-pointer"
          >
            Checkout ({cartCount})
          </button>
        </div>
      )}

      {/* FILTER & SEARCH */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products & bundles..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {prod.category}
                  </span>
                  {prod.badge && (
                    <span className="text-[11px] font-black bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full shadow-xs">
                      {prod.badge}
                    </span>
                  )}
                </div>

                {/* Mock product cover illustration */}
                <div className="h-44 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden group-hover:scale-102 transition-transform">
                  <span className="text-4xl mb-2">📦</span>
                  <span className="text-xs font-bold text-slate-700">{prod.pages}+ High-Res Pages</span>
                  <span className="text-[10px] text-slate-500">PDF Instant Digital Download</span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 mt-4 leading-snug group-hover:text-emerald-700 transition-colors">
                  {prod.title}
                </h3>

                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">{prod.rating}</span>
                  <span className="text-xs text-slate-400">({prod.reviewsCount})</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 line-through mr-1.5 font-medium">
                    ${prod.regularPrice.toFixed(2)}
                  </span>
                  <span className="text-2xl font-black text-emerald-700">
                    ${prod.salePrice.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(prod)}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Trust Guarantee Footer card */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span><strong>Instant Digital Delivery:</strong> All files delivered immediately to your email inbox after checkout with lifetime re-download access.</span>
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <span>🔒 256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

    </div>
  );
};
