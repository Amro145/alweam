"use client";

import { useState } from 'react';
import { UploadCloud, Loader2, Send, AlertCircle, Sparkles, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function CustomGiftPage() {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return setError("يرجى إرفاق صورة توضيحية لطلبك.");

    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://my-app.amroaltayeb14.workers.dev';
      
      // Step 1: Request Signature
      const sigRes = await fetch(`${apiUrl}/api/upload-gift/signature`);
      if (!sigRes.ok) throw new Error('فشل جلب تصريح الرفع من الخادم.');
      const { signature, timestamp, cloudName, apiKey } = await sigRes.json();

      // Step 2: Upload direct to Cloudinary
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", selectedFile);
      cloudinaryFormData.append("api_key", apiKey);
      cloudinaryFormData.append("timestamp", timestamp);
      cloudinaryFormData.append("signature", signature);
      cloudinaryFormData.append("folder", "custom-gifts");

      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const cloudRes = await fetch(uploadUrl, {
        method: "POST",
        body: cloudinaryFormData,
      });
      const cloudData = await cloudRes.json();
      
      if (!cloudRes.ok) {
        throw new Error(cloudData.error?.message || "فشل رفع الصورة لـ Cloudinary.");
      }

      // Step 3: Tell our Backend to save the Order mapping
      const saveRes = await fetch(`${apiUrl}/api/upload-gift/gift-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          imageUrl: cloudData.secure_url
        })
      });

      const { data, success: saveSuccess, error: dbError } = await saveRes.json();
      if (!saveSuccess) {
        throw new Error(dbError || "فشل حفظ الطلب في قاعدة البيانات.");
      }

      setSuccess(true);
      // Success Redirect to WhatsApp after short delay
      setTimeout(() => {
        if (data?.whatsappLink) {
          window.location.href = data.whatsappLink;
        }
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="glass-card rounded-[2.5rem] p-12 max-w-lg animate-scale-in">
           <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-200">
             <CheckCircle2 className="w-12 h-12 text-green-600 animate-bounce" />
           </div>
           <h1 className="text-3xl font-bold text-stone-900 mb-4 font-display">تم استلام طلبك!</h1>
           <p className="text-stone-500 mb-8 leading-relaxed">شكراً لثقتكم بالوئام. جاري تحويلك الآن لمحادثة واتساب لمتابعة تفاصيل التصميم والوقت المتوقع للإنجاز.</p>
           <Loader2 className="w-8 h-8 text-purple-500 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-stone-100/50 via-stone-50 to-stone-100/30 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Info Side */}
          <div className="space-y-12 animate-fade-in">
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 text-purple-700 text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                هدايا مخصصة
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-6 font-display leading-[1.1]">
                حوّل <span className="bg-linear-to-br from-purple-600 to-purple-700 bg-clip-text text-transparent">خيالك</span> إلى حقيقة ملموسة
              </h1>
              <p className="text-lg text-stone-500 leading-relaxed max-w-lg">
                هل لديك فكرة هدية فريدة؟ دعنا نساعدك في تصميمها وتحويلها إلى واقع بلمساتنا الفنية الخاصة. ارفع صورة للإلهام واشرح لنا ذوقك.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="glass-card rounded-3xl p-6 bg-white/40 border-white/50">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 text-purple-600">
                     <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-stone-800 mb-2">جودة التصنيع</h3>
                  <p className="text-sm text-stone-500">نستخدم أجود أنواع الأخشاب والمعادن لضمان استدامة هديتك</p>
               </div>
               <div className="glass-card rounded-3xl p-6 bg-white/40 border-white/50">
                  <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center mb-4 text-stone-600">
                     <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-stone-800 mb-2">دقة المواعيد</h3>
                  <p className="text-sm text-stone-500">نلتزم بالوقت المتفق عليه بكل احترافية لنكون جزءاً من مناسبتك</p>
               </div>
            </div>

            <div className="bg-stone-900 rounded-4xl p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors"></div>
               <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                 <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                 ماذا سيحدث بعد إرسال الطلب؟
               </h3>
               <ul className="space-y-4 text-white/70">
                 <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-white/10 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-purple-500">1</span>
                    يتم تحويلك لمحادثة مباشرة عبر واتساب مع فريق الوئام
                 </li>
                 <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-white/10 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-purple-500">2</span>
                    نناقش معك تفاصيل التصميم، الحجم، والمواد المستخدمة
                 </li>
                 <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-white/10 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-purple-500">3</span>
                    نرسل لك عرض السعر والمدة الزمنية المتوقعة للإنجاز
                 </li>
               </ul>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:sticky lg:top-28 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <div className="glass-card rounded-[2.5rem] p-10 md:p-12 bg-white/60 border-white relative shadow-2xl shadow-stone-200/50">
              
              {error && (
                <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-2xl flex items-start gap-3 border border-red-100 animate-shake">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm font-bold">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-stone-800 pr-2">صورة الإلهام أو المسودة</label>
                  <div className="relative group border-2 border-dashed border-stone-200 rounded-3xl p-10 text-center hover:border-purple-500 hover:bg-purple-50/50 transition-all duration-300 cursor-pointer bg-stone-50/50 min-h-[250px] flex flex-col items-center justify-center">
                    <input 
                      type="file" 
                      name="image" 
                      accept="image/*" 
                      required={!selectedFile}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={handleImageChange}
                    />
                    {previewUrl ? (
                      <div className="relative w-full h-full flex flex-col items-center gap-4">
                        <img src={previewUrl} alt="Preview" className="max-h-48 object-contain rounded-2xl shadow-lg border border-white" />
                        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-stone-600 shadow-sm">تغيير الصورة</div>
                      </div>
                    ) : (
                      <>
                        <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-stone-200 flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                          <UploadCloud className="w-10 h-10" />
                        </div>
                        <p className="text-lg text-stone-800 font-bold mb-1 font-display">اضغط لرفع الصورة</p>
                        <p className="text-xs text-stone-400">PNG, JPG بحد أقصى (5 ميجابايت)</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <label htmlFor="description" className="block text-sm font-bold text-stone-800 pr-2">أخبرنا عما يدور في ذهنك</label>
                  <textarea 
                    id="description"
                    name="description" 
                    rows={5} 
                    required
                    className="w-full px-6 py-5 rounded-3xl border border-stone-100 shadow-sm bg-stone-50 focus:bg-white focus:ring-8 focus:ring-purple-500/5 focus:border-purple-500 outline-none transition-all resize-none text-stone-800 placeholder:text-stone-300 text-right leading-relaxed"
                    placeholder="اشرح لنا تفاصيل الهدية التي ترغب بها، المواد، الألوان، أو أي ملاحظات أخرى..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="group relative w-full bg-stone-900 hover:bg-black text-white font-bold py-6 px-10 rounded-3xl transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-stone-900/10 active:scale-[0.98] text-lg overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {loading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        جاري معالجة طلبك...
                      </>
                    ) : (
                      <>
                        إرسال لـ واتساب
                        <ArrowRight className="w-6 h-6 -rotate-180 transition-transform group-hover:-translate-x-2" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-purple-700 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
