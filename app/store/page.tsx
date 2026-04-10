"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, PackageX } from 'lucide-react';

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
    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-serif text-neutral-900 mb-4">المنتجات</h1>
            <p className="text-neutral-500 text-lg">تصفح تشكيلتنا المميزة من الهدايا الجاهزة</p>
          </div>
        </div>

        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-neutral-400 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="min-h-[40vh] bg-white rounded-2xl border border-neutral-100 flex flex-col items-center justify-center text-center p-8">
            <PackageX className="w-16 h-16 text-neutral-300 mb-4" />
            <h2 className="text-xl font-medium text-neutral-900 mb-2">No products found</h2>
            <p className="text-neutral-500 max-w-md">We are currently updating our inventory. Please check back later for new exclusive gifts.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link key={product.id} href={`/store/${product.id}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100">
                  <div className="aspect-4/5 relative overflow-hidden bg-neutral-100">
                    <Image 
                      src={optimizeImage(product.imageUrl)} 
                      alt={product.name} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-neutral-900 mb-2 truncate">{product.name}</h3>
                    <p className="text-amber-600 font-semibold">{product.price} ر.س</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
