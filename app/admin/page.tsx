"use client";

import { useState, useEffect } from 'react';
import { Loader2, PackagePlus, ImagePlus, AlertCircle, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface Portfolio {
  id: number;
  title: string;
  imageUrl: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'product' | 'portfolio'>('product');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

  const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'super_secret_admin_token_change_me';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://my-app.amroaltayeb14.workers.dev';

  const fetchData = async () => {
    try {
      if (activeTab === 'product') {
        const res = await fetch(`${apiUrl}/api/products`);
        const data = await res.json();
        if (data.data) setProducts(data.data);
      } else {
        const res = await fetch(`${apiUrl}/api/portfolio`);
        const data = await res.json();
        if (data.data) setPortfolio(data.data);
      }
    } catch (e) {
      console.error('Fetch error:', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      category: formData.get('category'),
      imageUrl: formData.get('imageUrl'),
    };

    try {
      const res = await fetch(`${apiUrl}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminSecret}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to add product');
      setMessage({ type: 'success', text: 'Product added successfully!' });
      e.currentTarget.reset();
      fetchData();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error adding product.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePortfolioSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      imageUrl: formData.get('imageUrl'),
      completionDate: formData.get('completionDate'),
    };

    try {
      const res = await fetch(`${apiUrl}/api/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminSecret}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to add portfolio work');
      setMessage({ type: 'success', text: 'Portfolio work added successfully!' });
      e.currentTarget.reset();
      fetchData();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error adding portfolio.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, type: 'product' | 'portfolio') => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      const res = await fetch(`${apiUrl}/api/${type === 'product' ? 'products' : 'portfolio'}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminSecret}`
        }
      });
      if (!res.ok) throw new Error('Delete failed');
      setMessage({ type: 'success', text: 'Deleted successfully!' });
      fetchData();
    } catch (e: any) {
      setMessage({ type: 'error', text: e.message || 'Error deleting item.' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif text-neutral-900 mb-8">Admin Dashboard</h1>

        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-neutral-100 mb-8 max-w-sm">
          <button 
            onClick={() => { setActiveTab('product'); setMessage(null); }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'product' ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'}`}
          >
            Products
          </button>
          <button 
            onClick={() => { setActiveTab('portfolio'); setMessage(null); }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'portfolio' ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'}`}
          >
            Portfolio
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 border ${message.type === 'error' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Column */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-8 shadow-sm h-fit">
            {activeTab === 'product' ? (
              <form onSubmit={handleProductSubmit} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <PackagePlus className="w-6 h-6 text-neutral-700" />
                  <h2 className="text-xl font-semibold text-neutral-900">New Product</h2>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Name</label>
                  <input name="name" required className="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900" placeholder="Product name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Price (SAR)</label>
                  <input type="number" name="price" required min="1" step="0.01" className="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Category</label>
                  <input name="category" className="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900" placeholder="e.g. Wedding, Birthday" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Image URL</label>
                  <input type="url" name="imageUrl" required className="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900" placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Description</label>
                  <textarea name="description" rows={3} className="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900" placeholder="Product details..."></textarea>
                </div>
                <button disabled={loading} type="submit" className="w-full py-3 bg-neutral-900 text-white font-medium rounded-xl hover:bg-black transition-colors flex items-center justify-center disabled:opacity-70">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Product'}
                </button>
              </form>
            ) : (
              <form onSubmit={handlePortfolioSubmit} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <ImagePlus className="w-6 h-6 text-neutral-700" />
                  <h2 className="text-xl font-semibold text-neutral-900">New Portfolio Work</h2>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Title</label>
                  <input name="title" required className="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900" placeholder="Work title" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Image URL</label>
                  <input type="url" name="imageUrl" required className="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900" placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Completion Date</label>
                  <input type="date" name="completionDate" className="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900" />
                </div>
                <button disabled={loading} type="submit" className="w-full py-3 bg-neutral-900 text-white font-medium rounded-xl hover:bg-black transition-colors flex items-center justify-center disabled:opacity-70">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Portfolio Work'}
                </button>
              </form>
            )}
          </div>

          {/* List Column */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm overflow-y-auto max-h-[800px]">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Manage {activeTab === 'product' ? 'Products' : 'Portfolio'}</h2>
            <div className="space-y-4">
              {activeTab === 'product' ? (
                products.length === 0 ? <p className="text-neutral-500">No products found.</p> : 
                products.map(p => (
                  <div key={p.id} className="flex items-center gap-4 p-4 border border-neutral-100 rounded-xl">
                    <Image 
                      src={p.imageUrl.includes('cloudinary') ? p.imageUrl.replace('/upload/', '/upload/f_auto,q_auto/') : p.imageUrl} 
                      alt={p.name} 
                      width={64} 
                      height={64} 
                      className="w-16 h-16 object-cover rounded-lg bg-neutral-100" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-neutral-900 truncate">{p.name}</p>
                      <p className="text-sm text-neutral-500">{p.price} SAR</p>
                    </div>
                    <button onClick={() => handleDelete(p.id, 'product')} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              ) : (
                portfolio.length === 0 ? <p className="text-neutral-500">No portfolio items found.</p> : 
                portfolio.map(p => (
                  <div key={p.id} className="flex items-center gap-4 p-4 border border-neutral-100 rounded-xl">
                    <Image 
                      src={p.imageUrl.includes('cloudinary') ? p.imageUrl.replace('/upload/', '/upload/f_auto,q_auto/') : p.imageUrl} 
                      alt={p.title} 
                      width={64} 
                      height={64} 
                      className="w-16 h-16 object-cover rounded-lg bg-neutral-100" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-neutral-900 truncate">{p.title}</p>
                    </div>
                    <button onClick={() => handleDelete(p.id, 'portfolio')} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
