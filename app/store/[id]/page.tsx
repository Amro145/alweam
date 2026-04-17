"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, ArrowRight, MessageCircle, Shield, Truck, CreditCard, Sparkles } from 'lucide-react';
import { use } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId?: number;
  category?: string;
}

const trustBadges = [
  { icon: Truck, title: "توصيل آمن", subtitle: "لكافة المناطق" },
  { icon: CreditCard, title: "دفع ميسر", subtitle: "عند الاستلام" },
  { icon: Shield, title: "جودة مضمونة", subtitle: "100% أصلي" },
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://my-app.amroaltayeb14.workers.dev';
        const res = await fetch(`${apiUrl}/api/products/${resolvedParams.id}`);
        const data = await res.json();
        if (data.data) {
          setProduct(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [resolvedParams.id]);

  const optimizeImage = (url: string) => {
    if (url && url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    return url;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-stone-100/50 to-stone-50">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-purple-200/30 rounded-full blur-xl mx-auto w-24 h-24 animate-pulse"></div>
            <div className="relative">
              <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto" />
            </div>
          </div>
          <p className="text-stone-500">جاري تحميل المنتج...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-linear-to-b from-stone-100/50 to-stone-50">
        <div className="glass-card rounded-3xl p-12 text-center max-w-md animate-scale-in">
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-stone-300" />
          </div>
          <h2 className="text-2xl font-semibold text-stone-800 mb-3 font-display">المنتج غير موجود</h2>
          <p className="text-stone-500 mb-8">عذراً، لم نتمكن من العثور على هذا المنتج.</p>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-br from-purple-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
          >
            العودة للمتجر
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const whatsappMessage = `مرحباً، أود الاستفسار عن المنتج: ${product.name}\nالسعر: ${product.price} ج.م\nالرابط: ${typeof window !== 'undefined' ? window.location.href : ''}`;
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966500000000'}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-linear-to-b from-stone-100/50 via-stone-50 to-stone-100/30">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-300/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6 animate-fade-in">
            <Link href="/" className="hover:text-purple-600 transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/store" className="hover:text-purple-600 transition-colors">المنتجات</Link>
            <span>/</span>
            <span className="text-stone-800 truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="animate-fade-in-up">
            <div className="sticky top-28">
              <div className="relative aspect-square rounded-3xl overflow-hidden glass-card shadow-xl shadow-stone-200/50">
                <div className={`absolute inset-0 bg-linear-to-br from-purple-100/50 to-stone-100/50 flex items-center justify-center transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="w-full h-full skeleton"></div>
                </div>
                <Image
                  src={optimizeImage(product.imageUrl)}
                  alt={product.name}
                  fill
                  priority
                  className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-stone-200/50 rounded-4xl pointer-events-none"></div>
              </div>

              {product.category && (
                <div className="mt-6 flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="w-1 h-6 bg-linear-to-b from-purple-500 to-purple-600 rounded-full"></div>
                  <span className="px-4 py-2 rounded-full glass text-sm font-medium text-stone-600">
                    {product.category}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100/80 text-green-700 text-xs font-medium mb-4">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  متوفر في المخزون
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight font-display">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <p className="text-4xl font-bold bg-linear-to-br from-purple-600 to-purple-700 bg-clip-text text-transparent">
                    {product.price} ج.م
                  </p>
                  <span className="text-lg text-stone-400 line-through">{(product.price * 1.2).toFixed(0)} ج.م</span>
                </div>
              </div>

              <div className="h-px bg-linear-to-r from-stone-200 via-purple-200/50 to-stone-200"></div>

              <div className="prose prose-stone prose-lg">
                <p className="text-stone-600 leading-relaxed text-lg">
                  {product.description || 'لا يوجد وصف متاح لهذا المنتج حالياً. تواصل معنا للحصول على مزيد من التفاصيل.'}
                </p>
              </div>

              <div className="glass-card rounded-3xl p-6 space-y-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full flex items-center justify-center gap-3 bg-linear-to-br from-green-500 via-green-600 to-green-700 text-white font-semibold py-5 rounded-2xl transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-lg">اطلب الآن عبر واتساب</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </a>

                <Link
                  href="/custom-gift"
                  className="group w-full flex items-center justify-center gap-3 bg-white hover:bg-purple-50 text-stone-700 hover:text-purple-700 font-semibold py-5 rounded-2xl transition-all duration-300 text-lg border-2 border-stone-200 hover:border-purple-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="w-5 h-5" />
                  طلب هدية بمواصفات خاصة
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </Link>
              </div>

              <div className="glass rounded-3xl p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-sm font-semibold text-stone-700 mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-500" />
                  لماذا تختار الوئام؟
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {trustBadges.map((badge, index) => (
                    <div key={index} className="text-center p-4 rounded-2xl bg-stone-50/80 hover:bg-purple-50/50 transition-colors duration-300">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <badge.icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium text-stone-800 mb-1">{badge.title}</p>
                      <p className="text-xs text-stone-400">{badge.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-3xl p-6 border border-purple-100/50 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 mb-1">توصيل سريع</h4>
                    <p className="text-sm text-stone-500">يتم التوصيل خلال 2-5 أيام عمل لجميع مناطق المملكة</p>
                  </div>
                </div>
              </div>

              <Link
                href="/store"
                className="group inline-flex items-center gap-2 text-stone-500 hover:text-purple-600 transition-colors font-medium"
              >
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                العودة للمتجر
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
