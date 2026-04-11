"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, PackageX, ArrowRight, Sparkles } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

const categories = [
  { name: "الكل", slug: "all", icon: "✦" },
  { name: "المجوهرات", slug: "jewelry", icon: "◇" },
  { name: "العطور", slug: "perfumes", icon: "✦" },
  { name: "المقتنيات", slug: "collectibles", icon: "❖" },
  { name: "الإكسسوارات", slug: "accessories", icon: "✧" },
];

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://my-app.amroaltayeb14.workers.dev';
        const res = await fetch(`${apiUrl}/api/products`);
        const data = await res.json();
        if (data.data) {
          setProducts(data.data);
          setFilteredProducts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) => {
        const categoryName = p.category?.toLowerCase() || '';
        return categoryName.includes(activeCategory.toLowerCase());
      });
      setFilteredProducts(filtered);
    }
  }, [activeCategory, products]);

  const optimizeImage = (url: string) => {
    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100/50 via-stone-50 to-stone-100/30">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-amber-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 text-amber-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>تشكيلة حصرية</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-stone-900 mb-6 font-display tracking-tight">
              <span className="bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                منتجاتنا
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl mt-2 text-stone-800">الفاخرة</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed">
              اكتشف تشكيلتنا المميزة من الهدايا الفاخرة المصممة خصيصاً لتناسب ذوقك الرفيع
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {categories.map((cat, index) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`
                  relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300
                  ${activeCategory === cat.slug 
                    ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30 scale-105' 
                    : 'glass-card text-stone-600 hover:text-amber-700 hover:scale-105'
                  }
                `}
                style={{ animationDelay: `${0.3 + index * 0.05}s`, animationFillMode: 'both' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{cat.icon}</span>
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card rounded-3xl overflow-hidden">
                <div className="aspect-4/5 skeleton"></div>
                <div className="p-6 space-y-3">
                  <div className="h-5 skeleton rounded-lg w-3/4"></div>
                  <div className="h-4 skeleton rounded-lg w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center animate-scale-in">
            <div className="glass-card rounded-3xl p-16 text-center max-w-md">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-amber-100 rounded-full blur-xl mx-auto w-24 h-24"></div>
                <div className="relative w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto">
                  <PackageX className="w-12 h-12 text-stone-300" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-stone-800 mb-3 font-display">
                لا توجد منتجات
              </h2>
              <p className="text-stone-500 mb-8">
                لم نجد منتجات في هذه الفئة حالياً. جرب اختيار فئة أخرى!
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
              >
                عرض جميع المنتجات
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"></div>
                <p className="text-stone-600">
                  <span className="font-bold text-stone-900">{filteredProducts.length}</span> منتج متوفر
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-stone-400">
                <span>مرر للتعرف على المزيد</span>
                <ArrowRight className="w-4 h-4 animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <Link 
                  key={product.id} 
                  href={`/store/${product.id}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
                >
                  <div className="glass-card-hover rounded-3xl overflow-hidden bg-white/50 h-full flex flex-col relative">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-stone-600 shadow-sm">
                        {product.category}
                      </span>
                    </div>
                    
                    <div className="relative aspect-4/5 overflow-hidden">
                      <Image 
                        src={optimizeImage(product.imageUrl)} 
                        alt={product.name} 
                        fill
                        priority={index < 4}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <span className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg font-medium text-amber-700">
                          عرض التفاصيل
                          <ArrowRight className="w-4 h-4 mr-2" />
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-stone-800 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors leading-snug">
                        {product.name}
                      </h3>
                      <div className="mt-auto pt-4 border-t border-stone-100/80 flex items-center justify-between">
                        <div>
                          <p className="text-xl font-bold bg-gradient-to-br from-amber-600 to-amber-700 bg-clip-text text-transparent">
                            {product.price} ر.س
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          <span className="text-xs">اطلب الآن</span>
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
