"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, PackageX, ArrowRight } from 'lucide-react';
import { use } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

const categoryDescriptions: Record<string, { title: string; subtitle: string }> = {
  jewelry: {
    title: "المجوهرات",
    subtitle: "قطع فنية من المجوهرات الفاخرة",
  },
  perfumes: {
    title: "العطور",
    subtitle: "روائح فريدة تدوم طويلاً",
  },
  collectibles: {
    title: "المقتنيات",
    subtitle: "قطع نادرة وثمينة",
  },
  accessories: {
    title: "الإكسسوارات",
    subtitle: "لمسات أنيقة تميزك",
  },
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://my-app.amroaltayeb14.workers.dev';
        const res = await fetch(`${apiUrl}/api/categories`);
        const data = await res.json();
        if (data.data) {
          const found = data.data.find((c: Category) => c.slug === resolvedParams.slug);
          setCategory(found || null);
        }
      } catch (error) {
        console.error("Failed to fetch category:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [resolvedParams.slug]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://my-app.amroaltayeb14.workers.dev';
        const res = await fetch(`${apiUrl}/api/products`);
        const data = await res.json();
        if (data.data) {
          const filtered = data.data.filter((p: Product) => {
            const categoryName = p.category?.toLowerCase() || '';
            const slug = resolvedParams.slug.toLowerCase();
            return categoryName.includes(slug) || categoryName.includes(resolvedParams.slug);
          });
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [resolvedParams.slug]);

  const optimizeImage = (url: string) => {
    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    return url;
  };

  const categoryInfo = categoryDescriptions[resolvedParams.slug] || {
    title: category?.name || resolvedParams.slug,
    subtitle: "استكشف مجموعتنا المميزة",
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-stone-100/50 to-stone-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-300/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-8 animate-fade-in">
            <Link href="/" className="hover:text-purple-600 transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/store" className="hover:text-purple-600 transition-colors">المنتجات</Link>
            <span>/</span>
            <span className="text-stone-800">{categoryInfo.title}</span>
          </nav>

          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/80 text-purple-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              فئة مميزة
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-4 font-display tracking-tight">
              {categoryInfo.title}
            </h1>
            <p className="text-lg md:text-xl text-stone-500 max-w-2xl leading-relaxed">
              {categoryInfo.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loadingProducts ? (
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
        ) : products.length === 0 ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center animate-scale-in">
            <div className="glass-card rounded-3xl p-12 text-center max-w-md">
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <PackageX className="w-10 h-10 text-stone-300" />
              </div>
              <h2 className="text-2xl font-semibold text-stone-800 mb-3 font-display">
                لا توجد منتجات
              </h2>
              <p className="text-stone-500 mb-8">
                نعمل حالياً على إضافة منتجات جديدة لهذه الفئة. تابعنا قريباً!
              </p>
              <Link
                href="/store"
                className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-br from-purple-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
              >
                تصفح جميع المنتجات
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8 animate-fade-in">
              <p className="text-stone-500">
                <span className="font-semibold text-stone-800">{products.length}</span> منتج متوفر
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/store/${product.id}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
                >
                  <div className="glass-card-hover rounded-3xl overflow-hidden bg-white/60 h-full flex flex-col">
                    <div className="relative aspect-4/5 overflow-hidden">
                      <Image
                        src={optimizeImage(product.imageUrl)}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        placeholder="empty"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
                          <ArrowRight className="w-5 h-5 text-purple-600" />
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-stone-800 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
                        {product.name}
                      </h3>
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <p className="text-xl font-bold bg-linear-to-br from-purple-600 to-purple-700 bg-clip-text text-transparent">
                          {product.price} ج.م
                        </p>
                        <span className="text-xs text-stone-400">عرض التفاصيل</span>
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
