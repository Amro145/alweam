"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Loader2, ImageOff } from 'lucide-react';

interface PortfolioWork {
  id: number;
  title: string;
  imageUrl: string;
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
    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif text-neutral-900 mb-4">Our Portfolio</h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">Explore some of our previous customized works crafted with love and precision.</p>
        </div>
        
        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-neutral-400 animate-spin" />
          </div>
        ) : works.length === 0 ? (
           <div className="min-h-[40vh] bg-neutral-50 rounded-3xl border border-neutral-100 flex flex-col items-center justify-center text-center p-8">
             <ImageOff className="w-16 h-16 text-neutral-300 mb-4" />
             <h2 className="text-xl font-medium text-neutral-900 mb-2">Portfolio is empty</h2>
             <p className="text-neutral-500 max-w-md">We haven't uploaded our previous works yet. Check back soon for inspiration!</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {works.map((work) => (
              <div key={work.id} className="group overflow-hidden rounded-2xl relative cursor-pointer aspect-square bg-neutral-100">
                <Image 
                  src={optimizeImage(work.imageUrl)} 
                  alt={work.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-2xl font-serif text-white mb-2">{work.title}</h3>
                  <p className="text-white/80 text-sm">View details</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
