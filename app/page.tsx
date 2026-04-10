import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center min-h-[80vh] overflow-hidden bg-amber-50/50">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=2000&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-24">
          <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-6 animate-fade-in-up">
            متجرك الأول للهدايا المخصصة
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 tracking-tight">
            اصنع ذكرى لا تُنسى
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            في متجر الوئام، نحول مشاعرك إلى هدايا ملموسة تُصنع بحب وعناية لتناسب جميع مناسباتك السعيدة.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 space-x-reverse">
            <Link 
              href="/store" 
              className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-black transition-colors shadow-lg hover:shadow-xl"
            >
              تسوق الآن
            </Link>
            <Link 
              href="/custom-gift" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-full font-medium border-2 border-gray-100 hover:border-amber-200 hover:bg-amber-50 transition-all shadow-sm"
            >
              تصميم هدية خاصة
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats / Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-100">
            <div className="p-6">
              <h3 className="text-2xl font-serif text-gray-900 mb-2">جودة عالية</h3>
              <p className="text-gray-500">نستخدم أفضل المواد في صناعة وتغليف هداياكم</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-serif text-gray-900 mb-2">تخصيص كامل</h3>
              <p className="text-gray-500">خيار التعديل والإضافة ليناسب ذوقك الخاص</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-serif text-gray-900 mb-2">شحن سريع</h3>
              <p className="text-gray-500">توصيل آمن وسريع لجميع مناطق المملكة</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
