"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, PackageX, Sparkles, ArrowRight, Filter } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://my-app.amroaltayeb14.workers.dev';
        const res = await fetch(`${apiUrl}/api/products`);
        const data = await res.json();
        if (data.data) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const optimizeImage = (url: string) => {
    if (url && url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100/50 to-stone-50">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-amber-300/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-fade-in">
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-700 text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                متجر الوئام
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 font-display">
                تشكيلتنا <span className="bg-gradient-to-br from-amber-600 to-amber-700 bg-clip-text text-transparent">المختارة</span>
              </h1>
              <p className="text-lg text-stone-500 max-w-xl">اكتشف هدايانا الفاخرة المصنوعة يدوياً بكل إتقان لتناسب أرقى الأذواق</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-stone-200 rounded-xl text-stone-600 text-sm font-medium hover:bg-stone-50 transition-all shadow-sm">
                <Filter className="w-4 h-4" />
                تصفية
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="glass-card rounded-3xl overflow-hidden p-3 animate-pulse">
                  <div className="aspect-[4/5] bg-stone-100 rounded-2xl mb-4"></div>
                  <div className="px-4 pb-4 space-y-3">
                    <div className="h-4 bg-stone-100 rounded w-3/4"></div>
                    <div className="h-4 bg-stone-100 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="min-h-[50vh] glass-card rounded-3xl flex flex-col items-center justify-center text-center p-12">
              <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-6 text-stone-300">
                <PackageX className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 mb-2 font-display">لا توجد منتجات حالياً</h2>
              <p className="text-stone-500 max-w-md">نحن بصدد إطلاق تشكيلتنا الجديدة. يرجى العودة قريباً لمشاهدة أحدث ابتكاراتنا.</p>
              <Link href="/" className="mt-8 text-amber-600 font-bold hover:underline">العودة للرئيسية</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <Link 
                  key={product.id} 
                  href={`/store/${product.id}`} 
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                >
                  <div className="glass-card-hover rounded-3xl overflow-hidden bg-white/40 group-hover:bg-white/80 p-3 flex flex-col h-full border border-white/50 shadow-lg shadow-stone-200/50">
                    <div className="aspect-[4/5] relative overflow-hidden rounded-2xl bg-stone-100">
                      <Image 
                        src={optimizeImage(product.imageUrl)} 
                        alt={product.name} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                         <div className="bg-white/80 backdrop-blur-md p-2 rounded-xl shadow-lg">
                           <ArrowRight className="w-5 h-5 text-amber-600 -rotate-180" />
                         </div>
                      </div>
                    </div>
                    <div className="p-5 text-right flex flex-col flex-1">
                      {product.category && (
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2">
                          {product.category}
                        </span>
                      )}
                      <h3 className="text-lg font-bold text-stone-900 mb-3 group-hover:text-amber-700 transition-colors line-clamp-1 font-display">
                        {product.name}
                      </h3>
                      <div className="mt-auto flex items-center justify-between">
                         <p className="text-xl font-bold bg-gradient-to-br from-amber-600 to-amber-700 bg-clip-text text-transparent">
                           {product.price} ر.س
                         </p>
                         <span className="text-xs text-stone-400 font-light">متاح</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
