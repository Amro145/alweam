"use client";

import { useState } from 'react';
import { UploadCloud, Loader2, Send, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function CustomGiftPage() {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL || 'https://my-app.amroaltayeb14.workers.dev'}/api/upload-gift`;
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 400) {
          throw new Error(data.error || 'Please fill out all required fields properly.');
        } else if (res.status === 500) {
          throw new Error('Our servers encountered an issue. Please try again later.');
        }
        throw new Error(data.error || 'Request failed.');
      }

      // Success
      if (data.data?.whatsappLink) {
        window.location.href = data.data.whatsappLink;
      } else {
         setError("Order submitted but could not connect to WhatsApp");
      }

    } catch (err: any) {
      setError(err.message || 'Error uploading. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-neutral-100">
        <div className="p-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif text-neutral-900 mb-3 tracking-tight">Custom Gift</h1>
            <p className="text-neutral-500 text-sm md:text-base">Upload your inspiration and tell us how you want your perfect gift customized.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 border border-red-100">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-neutral-800">Inspiration Image</label>
              <div className="relative group border-2 border-dashed border-neutral-200 rounded-2xl p-8 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer bg-neutral-50 flex flex-col items-center justify-center min-h-[220px]">
                <input 
                  type="file" 
                  name="image" 
                  accept="image/*" 
                  required 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={handleImageChange}
                />
                {previewUrl ? (
                  <div className="relative w-full h-full flex justify-center">
                    <img src={previewUrl} alt="Preview" className="max-h-48 object-contain rounded-lg shadow-sm" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center z-20 pointer-events-none">
                      <p className="text-white text-sm font-medium">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-blue-500 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <p className="text-base text-neutral-700 font-medium mb-1">Click or drag image to upload</p>
                    <p className="text-xs text-neutral-400">Supported formats: PNG, JPG (Max 5MB)</p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="description" className="block text-sm font-semibold text-neutral-800">Gift Description</label>
              <textarea 
                id="description"
                name="description" 
                rows={5} 
                required
                className="w-full px-5 py-4 rounded-2xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none text-neutral-800 placeholder:text-neutral-400"
                placeholder="Describe your desired customization, details, materials, or any specific requests..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-neutral-900 hover:bg-black text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-neutral-900/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Processing your request...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-3" />
                  Order via WhatsApp
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
