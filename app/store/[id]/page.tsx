"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, ArrowLeft, MessageCircle } from 'lucide-react';
import { use } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId?: number;
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-serif text-neutral-900 mb-4">المنتج غير موجود</h2>
        <Link href="/store" className="text-amber-600 hover:underline">العودة للمتجر</Link>
      </div>
    );
  }

  const whatsappMessage = `مرحباً، أود الاستفسار عن المنتج: ${product.name}\nالسعر: ${product.price} ر.س\nالرابط: ${window.location.href} :الصوره ${product.imageUrl}`;
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966500000000'}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/store" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-amber-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 ml-2" />
          العودة للمتجر
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image Section */}
          <div className="rounded-3xl overflow-hidden bg-neutral-50 aspect-square relative shadow-xs border border-neutral-100">
            <Image 
              src={optimizeImage(product.imageUrl)} 
              alt={product.name} 
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Details Section */}
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-3xl font-bold text-amber-600">{product.price} ر.س</p>
                <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full font-medium">متوفر</span>
              </div>
            </div>
            
            <div className="prose prose-neutral prose-lg mb-10 text-neutral-600 leading-relaxed">
              <p className="whitespace-pre-line">{product.description || 'لا يوجد وصف متاح لهذا المنتج حالياً.'}</p>
            </div>
            
            <div className="mt-auto space-y-4">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-neutral-900 hover:bg-black text-white font-semibold py-5 rounded-2xl transition-all shadow-lg shadow-neutral-900/10 active:scale-[0.98] text-lg"
              >
                <MessageCircle className="w-6 h-6" />
                اطلب الآن عبر واتساب
              </a>
              
              <Link 
                href="/custom-gift" 
                className="w-full flex items-center justify-center bg-white hover:bg-amber-50 text-amber-700 font-semibold py-5 rounded-2xl transition-all text-lg border-2 border-amber-100 hover:border-amber-200"
              >
                طلب هدية بمواصفات خاصة
              </Link>
            </div>

            <div className="mt-12 p-6 bg-neutral-50 rounded-2xl border border-neutral-100 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-neutral-400 mb-1">توصيل آمن</p>
                <p className="text-sm font-medium text-neutral-700">لكافة المناطق</p>
              </div>
              <div className="border-x border-neutral-200">
                <p className="text-xs text-neutral-400 mb-1">دفع ميسر</p>
                <p className="text-sm font-medium text-neutral-700">عند الاستلام</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 mb-1">جودة مضمونة</p>
                <p className="text-sm font-medium text-neutral-700">100% أصلي</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
