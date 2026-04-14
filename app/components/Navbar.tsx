"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Briefcase, Sparkles, MessageCircle, ChevronDown } from 'lucide-react';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-purple-400 to-purple-600 rounded-xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <span className="relative text-2xl font-bold bg-linear-to-br from-purple-600 via-purple-500 to-purple-700 bg-clip-text text-transparent font-display tracking-wide">
                الوئام
              </span>
            </div>
            <span className="hidden sm:block text-xs text-stone-400 font-light tracking-wider">AL-WIAM</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link 
              href="/store" 
              className="px-4 py-2 text-stone-600 hover:text-purple-700 transition-all duration-300 font-medium rounded-xl hover:bg-purple-50/50"
            >
              المنتجات
            </Link>
            
            <Link 
              href="/portfolio" 
              className="px-4 py-2 text-stone-600 hover:text-purple-700 transition-all duration-300 font-medium rounded-xl hover:bg-purple-50/50"
            >
              أعمالنا
            </Link>
            <Link 
              href="/custom-gift" 
              className="px-4 py-2 text-stone-600 hover:text-purple-700 transition-all duration-300 font-medium rounded-xl hover:bg-purple-50/50"
            >
              هدية مخصصة
            </Link>
          </nav>

          {/* Call to Action & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link 
              href="/custom-gift" 
              className="hidden sm:inline-flex relative group overflow-hidden bg-linear-to-br from-purple-500 via-purple-600 to-purple-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                اطلب الآن
                <ArrowRight className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-stone-100/80 text-stone-600 hover:bg-purple-50 hover:text-purple-700 transition-all"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-500 ease-in-out border-t border-white/20 overflow-hidden ${isOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 bg-white/80 backdrop-blur-xl space-y-4">
          <Link 
            href="/store" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-stone-50 text-stone-700 font-bold hover:bg-purple-50 hover:text-purple-700 transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            المنتجات
          </Link>


          <Link 
            href="/portfolio" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-stone-50 text-stone-700 font-bold hover:bg-purple-50 hover:text-purple-700 transition-all"
          >
            <Briefcase className="w-5 h-5" />
            أعمالنا
          </Link>

          <Link 
            href="/custom-gift" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-stone-50 text-stone-700 font-bold hover:bg-purple-50 hover:text-purple-700 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            هدية مخصصة
          </Link>

          <div className="pt-4 border-t border-stone-100 flex flex-col gap-4">
              <Link 
                href="/custom-gift" 
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-linear-to-br from-purple-500 to-purple-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-purple-900/10"
              >
                اطلب الآن
                <ArrowRight className="w-5 h-5 -rotate-180" />
              </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
