"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Loader2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://my-app.amroaltayeb14.workers.dev';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        router.push('/admin');
      } else {
        setError(data.message || 'خطأ في تسجيل الدخول');
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6" dir="rtl">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-purple-500 to-purple-700 rounded-3xl shadow-2xl shadow-purple-900/20 mb-6 group transition-transform hover:scale-105 duration-500">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black font-display text-stone-900 mb-2 tracking-tight">لوحة التحكم</h1>
          <p className="text-stone-500 font-medium">سجل دخولك لإدارة متجر الوئام</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-stone-200/50 border border-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-purple-400 via-purple-600 to-purple-400"></div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-stone-400 pr-2 uppercase tracking-widest">اسم المستخدم</label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-stone-300 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full pr-12 pl-5 py-5 bg-stone-50 border-none rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:bg-white transition-all text-stone-900 font-bold placeholder:text-stone-300 outline-none"
                  placeholder="أدخل اسم المستخدم"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-stone-400 pr-2 uppercase tracking-widest">كلمة المرور</label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-stone-300 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pr-12 pl-5 py-5 bg-stone-50 border-none rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:bg-white transition-all text-stone-900 font-bold placeholder:text-stone-300 outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-5 bg-stone-900 text-white font-black rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-70 active:scale-[0.98] shadow-xl shadow-stone-900/10"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>تسجيل الدخول</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-stone-50 text-center">
            <Link href="/" className="text-sm font-bold text-stone-400 hover:text-purple-600 transition-colors">
              العودة للمتجر
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-10 text-center flex items-center justify-center gap-2 text-stone-300">
          <Sparkles className="w-4 h-4" />
          <p className="text-xs font-bold uppercase tracking-widest">Al-Wiam Security Systems</p>
        </div>
      </div>
    </div>
  );
}
