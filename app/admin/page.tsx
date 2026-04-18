"use client";

import { useState, useEffect, useRef } from 'react';
import {
  Loader2, PackagePlus, ImagePlus, AlertCircle, Trash2,
  Settings, ShoppingBag, Briefcase, FileText, ChevronRight,
  ExternalLink, Edit3, X, Save, UploadCloud, LogOut, Search, Filter, Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  category?: string;
}

interface Portfolio {
  id: number;
  title: string;
  imageUrl: string;
  completionDate?: string;
}

interface Order {
  id: number;
  description: string;
  imageUrl: string;
  whatsappLink: string;
  createdAt: string;
}

type Tab = 'product' | 'portfolio' | 'orders';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('product');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [editingItem, setEditingItem] = useState<{ type: 'product' | 'portfolio', data: any } | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://my-app.amroaltayeb14.workers.dev';
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const getAuthHeader = (): Record<string, string> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const fetchData = async () => {
    try {
      if (activeTab === 'product') {
        const res = await fetch(`${apiUrl}/api/products`);
        const data = await res.json();
        if (data.data) setProducts(data.data);
      } else if (activeTab === 'portfolio') {
        const res = await fetch(`${apiUrl}/api/portfolio`);
        const data = await res.json();
        if (data.data) setPortfolio(data.data);
      } else if (activeTab === 'orders') {
        const res = await fetch(`${apiUrl}/api/upload-gift`, {
          headers: getAuthHeader()
        });
        const data = await res.json();
        if (data.data) setOrders(data.data);
      }
    } catch (e) {
      console.error('Fetch error:', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    if (editingItem) {
      setPreviewUrl(optimizeImage(editingItem.data.imageUrl));
      setSelectedFile(null);
    } else {
      setPreviewUrl(null);
      setSelectedFile(null);
    }
  }, [editingItem, activeTab]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت' });
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setMessage(null);
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const folder = activeTab === 'product' ? 'products' : 'portfolio';
    const sigRes = await fetch(`${apiUrl}/api/upload-gift/signature?folder=${folder}`);
    if (!sigRes.ok) throw new Error('فشل جلب تصريح الرفع من الخادم');
    const { signature, timestamp, cloudName, apiKey } = await sigRes.json();

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("api_key", apiKey);
    cloudinaryFormData.append("timestamp", timestamp);
    cloudinaryFormData.append("signature", signature);
    cloudinaryFormData.append("folder", folder);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const cloudRes = await fetch(uploadUrl, {
      method: "POST",
      body: cloudinaryFormData,
    });
    const cloudData = await cloudRes.json();

    if (!cloudRes.ok) throw new Error(cloudData.error?.message || "فشل رفع الصورة لـ Cloudinary");
    return cloudData.secure_url;
  };

  const handleProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile && !editingItem) {
      setMessage({ type: 'error', text: 'يرجى اختيار صورة للمنتج' });
      return;
    }

    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);

    try {
      let finalImageUrl = editingItem?.data.imageUrl;
      if (selectedFile) {
        finalImageUrl = await uploadToCloudinary(selectedFile);
      }

      const data = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: Number(formData.get('price')),
        category: formData.get('category'),
        imageUrl: finalImageUrl,
      };

      const url = editingItem ? `${apiUrl}/api/products/${editingItem.data.id}` : `${apiUrl}/api/products`;
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(`فشل ${editingItem ? 'تحديث' : 'إضافة'} المنتج`);
      setMessage({ type: 'success', text: `تم ${editingItem ? 'تعديل' : 'إضافة'} المنتج بنجاح!` });

      if (!editingItem) {
        e.currentTarget.reset();
        setPreviewUrl(null);
        setSelectedFile(null);
      }
      setEditingItem(null);
      fetchData();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'حدث خطأ أثناء المعالجة' });
    } finally {
      setLoading(false);
    }
  };

  const handlePortfolioSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile && !editingItem) {
      setMessage({ type: 'error', text: 'يرجى اختيار صورة للعمل' });
      return;
    }

    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);

    try {
      let finalImageUrl = editingItem?.data.imageUrl;
      if (selectedFile) {
        finalImageUrl = await uploadToCloudinary(selectedFile);
      }

      const data = {
        title: formData.get('title'),
        imageUrl: finalImageUrl,
        completionDate: formData.get('completionDate'),
      };

      const url = editingItem ? `${apiUrl}/api/portfolio/${editingItem.data.id}` : `${apiUrl}/api/portfolio`;
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(`فشل ${editingItem ? 'تحديث' : 'إضافة'} العمل الفني`);
      setMessage({ type: 'success', text: `تم ${editingItem ? 'تعديل' : 'إضافة'} العمل بنجاح!` });

      if (!editingItem) {
        e.currentTarget.reset();
        setPreviewUrl(null);
        setSelectedFile(null);
      }
      setEditingItem(null);
      fetchData();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'حدث خطأ أثناء المعالجة' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, type: 'product' | 'portfolio') => {
    if (!confirm(`هل أنت متأكد من حذف هذا الـ ${type === 'product' ? 'منتج' : 'عمل'}؟`)) return;
    try {
      const res = await fetch(`${apiUrl}/api/${type === 'product' ? 'products' : 'portfolio'}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });
      if (!res.ok) throw new Error('فشل الحذف');
      setMessage({ type: 'success', text: 'تم الحذف بنجاح!' });
      fetchData();
    } catch (e: any) {
      setMessage({ type: 'error', text: e.message || 'حدث خطأ أثناء الحذف' });
    }
  };

  const optimizeImage = (url: string) => {
    if (url && url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    return url;
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900" dir="rtl">
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* Sidebar */}
        <aside className="lg:w-72 bg-white lg:min-h-screen border-l border-stone-200 p-8 flex flex-col sticky top-0 z-40">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-900/20">
              <Settings className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display tracking-tight">الإدارة</h1>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">لوحة تحكم الوئام</p>
            </div>
          </div>

          <nav className="space-y-2 flex-1">
            <button
              onClick={() => setActiveTab('product')}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'product' ? 'bg-purple-100/50 text-purple-700 shadow-sm' : 'text-stone-500 hover:bg-stone-100'}`}
            >
              <ShoppingBag className="w-5 h-5" />
              المنتجات
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'portfolio' ? 'bg-purple-100/50 text-purple-700 shadow-sm' : 'text-stone-500 hover:bg-stone-100'}`}
            >
              <Briefcase className="w-5 h-5" />
              أعمالنا
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'orders' ? 'bg-purple-100/50 text-purple-700 shadow-sm' : 'text-stone-500 hover:bg-stone-100'}`}
            >
              <FileText className="w-5 h-5" />
              طلبات الهدايا
            </button>
          </nav>

          <div className="mt-8 pt-8 border-t border-stone-100">
            <button 
              onClick={() => {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
                router.push('/login');
              }}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              تسجيل الخروج
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-12 pb-24 lg:pb-12 bg-stone-100/30">
          <div className="max-w-6xl mx-auto">

            {/* Context Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-bold font-display text-stone-900 mb-2">
                  {activeTab === 'product' ? 'إدارة المنتجات' : activeTab === 'portfolio' ? 'إدارة المعرض' : 'طلبات الهدايا'}
                </h2>
                <p className="text-stone-500">تحكم بجميع محتويات متجر الوئام بضغطة واحدة</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="glass-card flex items-center gap-3 px-4 py-2 border-stone-200">
                  <Search className="w-4 h-4 text-stone-400" />
                  <input className="bg-transparent border-none outline-none text-sm text-stone-700 placeholder:text-stone-400 w-full" placeholder="ابحث هنا..." />
                </div>
              </div>
            </div>

            {message && (
              <div className={`mb-8 p-5 rounded-3xl flex items-center gap-4 border-2 animate-scale-in ${message.type === 'error' ? 'bg-red-50 text-red-800 border-red-100' : 'bg-green-50 text-green-800 border-green-100'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                  {message.type === 'error' ? <AlertCircle className="w-6 h-6" /> : <Save className="w-6 h-6" />}
                </div>
                <p className="font-bold flex-1">{message.text}</p>
                <button onClick={() => setMessage(null)} className="p-2 hover:bg-black/5 rounded-full"><X className="w-4 h-4" /></button>
              </div>
            )}

            {activeTab !== 'orders' ? (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

                {/* Form Section */}
                <div className="xl:col-span-4">
                  <div className="glass-card rounded-4xl p-8 bg-white border-white shadow-2xl shadow-stone-200/50 sticky top-12">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                          {activeTab === 'product' ? <PackagePlus className="w-5 h-5" /> : <ImagePlus className="w-5 h-5" />}
                        </div>
                        <h3 className="text-lg font-bold font-display">{editingItem ? 'تعديل البيانات' : 'إضافة جديد'}</h3>
                      </div>
                      {editingItem && (
                        <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-stone-100 rounded-full text-stone-400 transition-colors">
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <form onSubmit={activeTab === 'product' ? handleProductSubmit : handlePortfolioSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <div className="relative group border-2 border-dashed border-stone-200 rounded-3xl p-4 text-center hover:border-purple-500 hover:bg-purple-50/50 transition-all duration-300 cursor-pointer bg-stone-50/50 min-h-[160px] flex flex-col items-center justify-center overflow-hidden">
                          <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={handleImageChange} />
                          {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="max-h-32 object-contain rounded-xl shadow-md border-2 border-white" />
                          ) : (
                            <>
                              <UploadCloud className="w-8 h-8 text-stone-300 mb-2 group-hover:scale-110 transition-transform" />
                              <p className="text-xs text-stone-600 font-bold">ارفع صورة</p>
                            </>
                          )}
                        </div>
                      </div>

                      {activeTab === 'product' ? (
                        <>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-stone-400 pr-2">اسم المنتج</label>
                            <input defaultValue={editingItem?.data.name} name="name" required className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-stone-100 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all text-sm font-bold" placeholder="مثلاً: صندوق خشبي فاخر" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-stone-400 pr-2">السعر (ج.م)</label>
                              <input defaultValue={editingItem?.data.price} type="number" name="price" required className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-stone-100 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all text-sm font-bold" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-stone-400 pr-2">الفئة</label>
                              <input defaultValue={editingItem?.data.category} name="category" className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-stone-100 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all text-sm font-bold" placeholder="خشب..." />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-stone-400 pr-2">الوصف</label>
                            <textarea defaultValue={editingItem?.data.description} name="description" rows={3} className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-stone-100 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all resize-none text-sm leading-relaxed" placeholder="..." />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-stone-400 pr-2">عنوان العمل</label>
                            <input defaultValue={editingItem?.data.title} name="title" required className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-stone-100 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all text-sm font-bold" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-stone-400 pr-2">تاريخ الإنجاز (اختياري)</label>
                            <input defaultValue={editingItem?.data.completionDate} type="date" name="completionDate" className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-stone-100 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all text-sm font-bold" />
                          </div>
                        </>
                      )}

                      <button disabled={loading} type="submit" className="w-full py-5 bg-stone-900 text-white font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-70 active:scale-[0.98] shadow-lg shadow-stone-900/10">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingItem ? <Save className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />)}
                        {editingItem ? 'حفظ التعديلات' : (activeTab === 'product' ? 'إضافة منتج' : 'إضافة عمل')}
                      </button>
                    </form>
                  </div>
                </div>

                {/* List Section */}
                <div className="xl:col-span-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeTab === 'product' ? (
                      products.length === 0 ? <EmptyState /> : products.map(p => (
                        <div key={p.id} className="glass-card rounded-4xl p-5 flex items-center gap-5 hover:shadow-xl transition-all duration-300 group">
                          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-stone-100 shrink-0">
                            <Image src={optimizeImage(p.imageUrl)} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-stone-400 font-bold mb-1 uppercase tracking-wider">{p.category || 'متنوع'}</p>
                            <h4 className="font-bold text-stone-900 mb-2 truncate font-display">{p.name}</h4>
                            <p className="text-purple-700 font-bold">{p.price} ج.م</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button onClick={() => setEditingItem({ type: 'product', data: p })} className="p-2.5 bg-stone-50 text-stone-400 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all"><Edit3 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(p.id, 'product')} className="p-2.5 bg-stone-50 text-stone-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      ))
                    ) : (
                      portfolio.length === 0 ? <EmptyState /> : portfolio.map(p => (
                        <div key={p.id} className="glass-card rounded-4xl p-5 flex items-center gap-5 hover:shadow-xl transition-all duration-300 group">
                          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-stone-100 shrink-0">
                            <Image src={optimizeImage(p.imageUrl)} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-stone-900 mb-2 truncate font-display">{p.title}</h4>
                            <p className="text-xs text-stone-400">{p.completionDate || 'مكتمل'}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button onClick={() => setEditingItem({ type: 'portfolio', data: p })} className="p-2.5 bg-stone-50 text-stone-400 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all"><Edit3 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(p.id, 'portfolio')} className="p-2.5 bg-stone-50 text-stone-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            ) : (
              /* Orders Section */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {orders.length === 0 ? <div className="col-span-full"><EmptyState message="لا توجد طلبات واردة حالياً" /></div> : orders.map(order => (
                  <div key={order.id} className="glass-card rounded-4xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
                    <div className="aspect-4/3 bg-stone-200 overflow-hidden relative">
                      <Image src={optimizeImage(order.imageUrl)} alt="Order" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
                        <span className="text-xs text-stone-400 font-bold font-mono">{new Date(order.createdAt).toLocaleString('ar-SA')}</span>
                      </div>
                      <p className="text-stone-700 text-sm leading-relaxed mb-6 line-clamp-3 font-medium h-15">{order.description}</p>
                      <div className="flex gap-3">
                        <a href={order.whatsappLink} target="_blank" className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl text-xs font-bold transition-all shadow-lg shadow-green-900/10 flex items-center justify-center gap-2">
                          رد عبر واتساب
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function EmptyState({ message = "لا توجد بيانات حالياً" }) {
  return (
    <div className="col-span-full bg-white/40 border border-stone-200 border-dashed rounded-4xl p-20 text-center flex flex-col items-center justify-center">
      <Sparkles className="w-12 h-12 text-stone-200 mb-6" />
      <p className="text-stone-500 font-bold">{message}</p>
    </div>
  );
}

function PlusCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
