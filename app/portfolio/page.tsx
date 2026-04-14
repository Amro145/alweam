"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Loader2, ImageOff, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

interface PortfolioWork {
  id: number;
  title: string;
  imageUrl: string;
  completionDate?: string;
}

export default function PortfolioPage() {
  const [works, setWorks] = useState<PortfolioWork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://my-app.amroaltayeb14.workers.dev';
        const res = await fetch(`${apiUrl}/api/portfolio`);
        const data = await res.json();
        if (data.data) {
          setWorks(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const optimizeImage = (url: string) => {
    if (url && url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-stone-100/50 to-stone-50">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-300/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 text-purple-700 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              أعمالنا الفنية
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-6 font-display">
              لمسات <span className="bg-linear-to-br from-purple-600 to-purple-700 bg-clip-text text-transparent">إبداعية</span> سابقة
            </h1>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto">
              شاهد مجموعة من أعمالنا المخصصة التي صُممت خصيصاً لعملائنا بكل شغف ودقة
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass-card rounded-4xl overflow-hidden p-4 animate-pulse">
                  <div className="aspect-square bg-stone-100 rounded-3xl"></div>
                </div>
              ))}
            </div>
          ) : works.length === 0 ? (
            <div className="glass-card rounded-4xl p-20 text-center max-w-2xl mx-auto border border-white/50 shadow-xl shadow-stone-200/50">
              <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-300">
                <ImageOff className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 mb-3 font-display">المعرض فارغ حالياً</h2>
              <p className="text-stone-500">نحن نعمل على توثيق أعمالنا الجديدة. ترقبوا التحديثات قريباً!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {works.map((work, index) => (
                <div 
                  key={work.id} 
                  className="group relative glass-card-hover rounded-4xl overflow-hidden p-4 bg-white/40 border border-white/50 shadow-xl shadow-stone-200/50 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'both' }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-3xl bg-stone-100">
                    <Image 
                      src={optimizeImage(work.imageUrl)} 
                      alt={work.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                    
                    {/* Overlay info */}
                    <div className="absolute inset-x-4 bottom-4 glass-card p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                      <div className="flex items-end justify-between gap-4">
                        <div className="text-right">
                          <h3 className="text-2xl font-bold text-stone-900 mb-1 font-display tracking-tight leading-tight">{work.title}</h3>
                          {work.completionDate && (
                            <p className="text-xs text-purple-600 font-bold uppercase tracking-widest">
                               {new Date(work.completionDate).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long' })}
                            </p>
                          )}
                        </div>
                        <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-purple-900/20">
                           <ArrowRight className="w-6 h-6 -rotate-180" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-24 text-center">
            <div className="glass-card inline-flex items-center p-2 rounded-2xl bg-white/30 border border-white/50">
               <div className="bg-purple-100 text-purple-700 px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                 تبحث عن شيء خاص؟
                 <Sparkles className="w-4 h-4" />
               </div>
               <a 
                 href="/custom-gift" 
                 className="px-8 py-3 text-stone-700 hover:text-purple-700 font-bold transition-colors flex items-center gap-2"
               >
                 اطلب تصميمك الخاص
                 <ArrowRight className="w-4 h-4 -rotate-180" />
               </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
