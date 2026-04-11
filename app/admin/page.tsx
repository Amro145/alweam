"use client";

import { useState, useEffect } from 'react';
import { 
  Loader2, PackagePlus, ImagePlus, AlertCircle, Trash2, 
  Settings, ShoppingBag, Briefcase, FileText, ChevronRight, 
  ExternalLink, Edit3, X, Save
} from 'lucide-react';
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

  const [editingItem, setEditingItem] = useState<{ type: 'product' | 'portfolio', data: any } | null>(null);

  const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'super_secret_admin_token_change_me';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://my-app.amroaltayeb14.workers.dev';

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
          headers: { 'Authorization': `Bearer ${adminSecret}` }
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
      const url = editingItem ? `${apiUrl}/api/products/${editingItem.data.id}` : `${apiUrl}/api/products`;
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminSecret}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(`Failed to ${editingItem ? 'update' : 'add'} product`);
      setMessage({ type: 'success', text: `Product ${editingItem ? 'updated' : 'added'} successfully!` });
      if (!editingItem) e.currentTarget.reset();
      setEditingItem(null);
      fetchData();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error processing request.' });
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
      const url = editingItem ? `${apiUrl}/api/portfolio/${editingItem.data.id}` : `${apiUrl}/api/portfolio`;
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminSecret}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(`Failed to ${editingItem ? 'update' : 'save'} portfolio work`);
      setMessage({ type: 'success', text: `Portfolio work ${editingItem ? 'updated' : 'added'} successfully!` });
      if (!editingItem) e.currentTarget.reset();
      setEditingItem(null);
      fetchData();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error processing request.' });
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

  const optimizeImage = (url: string) => {
    if (url && url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-neutral-900">
      <div className="flex">
        {/* Simple Sidebar */}
        <aside className="w-64 min-h-screen bg-white border-r border-neutral-100 p-6 sticky top-0 hidden md:block">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white">
              <Settings className="w-6 h-6" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight">لوحة التحكم</span>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('product')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'product' ? 'bg-amber-50 text-amber-700 shadow-sm shadow-amber-900/5' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'}`}
            >
              <ShoppingBag className="w-5 h-5" />
              المنتجات
            </button>
            <button 
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'portfolio' ? 'bg-amber-50 text-amber-700 shadow-sm shadow-amber-900/5' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'}`}
            >
              <Briefcase className="w-5 h-5" />
              أعمالنا
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'orders' ? 'bg-amber-50 text-amber-700 shadow-sm shadow-amber-900/5' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'}`}
            >
              <FileText className="w-5 h-5" />
              طلبات الهدايا
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-6 md:p-12">
          {/* Header Mobile */}
          <div className="md:hidden flex items-center justify-between mb-8">
            <h1 className="text-2xl font-serif font-bold">لوحة التحكم</h1>
            <div className="flex gap-2">
               <button onClick={() => setActiveTab('product')} className={`p-2 rounded-lg ${activeTab === 'product' ? 'bg-amber-100 text-amber-700' : 'bg-neutral-100 text-neutral-500'}`}><ShoppingBag className="w-5 h-5" /></button>
               <button onClick={() => setActiveTab('portfolio')} className={`p-2 rounded-lg ${activeTab === 'portfolio' ? 'bg-amber-100 text-amber-700' : 'bg-neutral-100 text-neutral-500'}`}><Briefcase className="w-5 h-5" /></button>
               <button onClick={() => setActiveTab('orders')} className={`p-2 rounded-lg ${activeTab === 'orders' ? 'bg-amber-100 text-amber-700' : 'bg-neutral-100 text-neutral-500'}`}><FileText className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            {message && (
              <div className={`mb-8 p-5 rounded-2xl flex items-start gap-3 border animate-in fade-in slide-in-from-top-4 duration-300 ${message.type === 'error' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold">{message.text}</p>
              </div>
            )}

            {activeTab !== 'orders' && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-2">
                  <div className="bg-white border border-neutral-100 rounded-3xl p-8 shadow-sm shadow-neutral-900/5 h-fit sticky top-12">
                     <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                           {activeTab === 'product' ? <PackagePlus className="w-6 h-6 text-amber-600" /> : <ImagePlus className="w-6 h-6 text-amber-600" />}
                           <h2 className="text-xl font-bold font-serif">{editingItem ? 'تعديل البيانات' : (activeTab === 'product' ? 'إضافة منتج جديد' : 'إضافة عمل جديد')}</h2>
                        </div>
                        {editingItem && (
                          <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-neutral-50 rounded-full text-neutral-400">
                             <X className="w-5 h-5" />
                          </button>
                        )}
                     </div>

                    {activeTab === 'product' ? (
                      <form onSubmit={handleProductSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">اسم المنتج</label>
                          <input defaultValue={editingItem?.data.name} name="name" required className="w-full px-5 py-3.5 rounded-2xl bg-neutral-50 border-0 outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all" placeholder="مثلاً: صندوق خشبي محفور" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-sm font-semibold text-neutral-700">السعر (ر.س)</label>
                              <input defaultValue={editingItem?.data.price} type="number" name="price" required min="1" step="0.01" className="w-full px-5 py-3.5 rounded-2xl bg-neutral-50 border-0 outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all" placeholder="0.00" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-sm font-semibold text-neutral-700">الفئة</label>
                              <input defaultValue={editingItem?.data.category} name="category" className="w-full px-5 py-3.5 rounded-2xl bg-neutral-50 border-0 outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all" placeholder="خشب، اكسسوار..." />
                           </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">رابط الصورة (Cloudinary)</label>
                          <input defaultValue={editingItem?.data.imageUrl} type="url" name="imageUrl" required className="w-full px-5 py-3.5 rounded-2xl bg-neutral-50 border-0 outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all font-mono text-xs" placeholder="https://res.cloudinary.com/..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">وصف المنتج</label>
                          <textarea defaultValue={editingItem?.data.description} name="description" rows={4} className="w-full px-5 py-3.5 rounded-2xl bg-neutral-50 border-0 outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all resize-none" placeholder="تحدث عن تفاصيل المنتج..."></textarea>
                        </div>
                        <button disabled={loading} type="submit" className="w-full py-4 bg-neutral-900 text-white font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-lg shadow-neutral-900/10 active:scale-[0.98]">
                          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingItem ? <Save className="w-5 h-5" /> : <PackagePlus className="w-5 h-5" />)}
                          {editingItem ? 'حفظ التغييرات' : 'إضافة الآن'}
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handlePortfolioSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">عنوان العمل</label>
                          <input defaultValue={editingItem?.data.title} name="title" required className="w-full px-5 py-3.5 rounded-2xl bg-neutral-50 border-0 outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all" placeholder="مثلاً: مشروع تغليف هدايا مؤتمر" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">رابط الصورة</label>
                          <input defaultValue={editingItem?.data.imageUrl} type="url" name="imageUrl" required className="w-full px-5 py-3.5 rounded-2xl bg-neutral-50 border-0 outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all font-mono text-xs" placeholder="https://..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">تاريخ الإنجاز (اختياري)</label>
                          <input defaultValue={editingItem?.data.completionDate} type="date" name="completionDate" className="w-full px-5 py-3.5 rounded-2xl bg-neutral-50 border-0 outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all" />
                        </div>
                        <button disabled={loading} type="submit" className="w-full py-4 bg-neutral-900 text-white font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-lg shadow-neutral-900/10 active:scale-[0.98]">
                          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingItem ? <Save className="w-5 h-5" /> : <ImagePlus className="w-5 h-5" />)}
                          {editingItem ? 'حفظ التعديلات' : 'إضافة للمعرض'}
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-3 space-y-6">
                  <div className="bg-white border border-neutral-100 rounded-3xl p-8 shadow-sm shadow-neutral-900/5">
                    <h2 className="text-xl font-bold font-serif mb-6">قائمة {activeTab === 'product' ? 'المنتجات الحالية' : 'معرض الأعمال'}</h2>
                    <div className="space-y-4">
                      {activeTab === 'product' ? (
                        products.length === 0 ? <div className="text-center py-10 text-neutral-400">لا يوجد منتجات حالياً</div> : 
                        products.map(p => (
                          <div key={p.id} className="group flex items-center gap-4 p-4 border border-neutral-100 rounded-2xl hover:border-amber-200 hover:bg-amber-50/10 transition-all">
                            <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-neutral-100">
                               <Image 
                                 src={optimizeImage(p.imageUrl)} 
                                 alt={p.name} 
                                 fill
                                 className="object-cover" 
                               />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-neutral-900 truncate">{p.name}</p>
                              <p className="text-xs font-semibold text-amber-600">{p.price} ر.س</p>
                            </div>
                            <div className="flex items-center gap-1">
                               <button onClick={() => setEditingItem({ type: 'product', data: p })} className="p-2 text-neutral-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                                 <Edit3 className="w-5 h-5" />
                               </button>
                               <button onClick={() => handleDelete(p.id, 'product')} className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                 <Trash2 className="w-5 h-5" />
                               </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        portfolio.length === 0 ? <div className="text-center py-10 text-neutral-400">المعرض فارغ حالياً</div> : 
                        portfolio.map(p => (
                          <div key={p.id} className="group flex items-center gap-4 p-4 border border-neutral-100 rounded-2xl hover:border-amber-200 hover:bg-amber-50/10 transition-all">
                            <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-neutral-100">
                               <Image 
                                 src={optimizeImage(p.imageUrl)} 
                                 alt={p.title} 
                                 fill
                                 className="object-cover" 
                               />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-neutral-900 truncate">{p.title}</p>
                              <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{p.completionDate || 'غير محدد'}</p>
                            </div>
                            <div className="flex items-center gap-1">
                               <button onClick={() => setEditingItem({ type: 'portfolio', data: p })} className="p-2 text-neutral-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                                 <Edit3 className="w-5 h-5" />
                               </button>
                               <button onClick={() => handleDelete(p.id, 'portfolio')} className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                 <Trash2 className="w-5 h-5" />
                               </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="bg-white border border-neutral-100 rounded-3xl p-8 shadow-sm shadow-neutral-900/5">
                   <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold font-serif">طلبات الهدايا المخصصة</h2>
                      <span className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-xs font-bold">{orders.length} طلب</span>
                   </div>
                   
                   {orders.length === 0 ? (
                      <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                         <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                         <p className="text-neutral-500">لا يوجد طلبات واردة حتى الآن</p>
                      </div>
                   ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {orders.map(order => (
                          <div key={order.id} className="bg-neutral-50 border border-neutral-100 rounded-3xl overflow-hidden hover:border-amber-200 transition-all flex flex-col">
                             <div className="relative aspect-video bg-neutral-200">
                                <Image 
                                  src={optimizeImage(order.imageUrl)} 
                                  alt="Order inspiration" 
                                  fill
                                  className="object-cover"
                                />
                             </div>
                             <div className="p-6">
                                <div className="text-[10px] text-neutral-400 mb-2 font-mono">{new Date(order.createdAt).toLocaleString('ar-SA')}</div>
                                <p className="text-neutral-700 text-sm leading-relaxed mb-6 line-clamp-3">{order.description}</p>
                                <a 
                                  href={order.whatsappLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="w-full inline-flex items-center justify-center gap-2 bg-white text-neutral-900 border border-neutral-200 hover:border-amber-600 hover:text-amber-600 py-3 rounded-xl text-sm font-bold transition-all"
                                >
                                  تواصل عبر واتساب
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                             </div>
                          </div>
                        ))}
                      </div>
                   )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
