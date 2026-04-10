"use client";

import { useState } from 'react';
import { Loader2, PackagePlus, ImagePlus, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'product' | 'portfolio'>('product');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'super_secret_admin_token_change_me';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://my-app.amroaltayeb14.workers.dev';

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
      const res = await fetch(`${apiUrl}/api/admin/products`, {
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
      const res = await fetch(`${apiUrl}/api/admin/portfolio`, {
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
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error adding portfolio.' });
    } finally {
      setLoading(false);
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
            Add Product
          </button>
          <button 
            onClick={() => { setActiveTab('portfolio'); setMessage(null); }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'portfolio' ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'}`}
          >
            Add Portfolio
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 border ${message.type === 'error' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        <div className="bg-white border border-neutral-100 rounded-2xl p-8 shadow-sm">
          {activeTab === 'product' ? (
            <form onSubmit={handleProductSubmit} className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <PackagePlus className="w-6 h-6 text-neutral-700" />
                <h2 className="text-xl font-semibold text-neutral-900">New Product</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Name</label>
                  <input name="name" required className="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900" placeholder="Product name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Price (SAR)</label>
                  <input type="number" name="price" required min="1" step="0.01" className="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900" placeholder="0.00" />
                </div>
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
              <button disabled={loading} type="submit" className="w-full md:w-auto px-8 py-3 bg-neutral-900 text-white font-medium rounded-xl hover:bg-black transition-colors flex items-center justify-center disabled:opacity-70">
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
              <button disabled={loading} type="submit" className="w-full md:w-auto px-8 py-3 bg-neutral-900 text-white font-medium rounded-xl hover:bg-black transition-colors flex items-center justify-center disabled:opacity-70">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Portfolio Work'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
