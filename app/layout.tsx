import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "الوئام - متجر الهدايا الفاخرة",
  description: "اطلب هداياك المخصصة بكل حب - Order your custom gifts with love",
  icons: {
    icon: "/favicon.ico",
  },
};

const categories = [
  { name: "المجوهرات", slug: "jewelry", icon: "◇" },
  { name: "العطور", slug: "perfumes", icon: "✦" },
  { name: "المقتنيات", slug: "collectibles", icon: "❖" },
  { name: "الإكسسوارات", slug: "accessories", icon: "✧" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-stone-50 text-stone-900">
        <header className="glass sticky top-0 z-50 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="group flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  <span className="relative text-2xl font-bold bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent font-display tracking-wide">
                    الوئام
                  </span>
                </div>
                <span className="hidden sm:block text-xs text-stone-400 font-light tracking-wider">AL-WIAM</span>
              </Link>

              <nav className="hidden lg:flex items-center gap-1">
                <Link 
                  href="/store" 
                  className="px-4 py-2 text-stone-600 hover:text-amber-700 transition-all duration-300 font-medium rounded-xl hover:bg-amber-50/50"
                >
                  المنتجات
                </Link>
                <div className="relative group px-2">
                  <button className="px-4 py-2 text-stone-600 hover:text-amber-700 transition-all duration-300 font-medium rounded-xl hover:bg-amber-50/50 flex items-center gap-2">
                    التصنيفات
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="glass-card rounded-2xl p-2 min-w-[200px] shadow-xl border border-white/50">
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/category/${cat.slug}`}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-50/80 transition-all duration-200 group/item"
                        >
                          <span className="text-amber-500 group-hover/item:scale-110 transition-transform">{cat.icon}</span>
                          <span className="text-stone-700 group-hover/item:text-amber-700 transition-colors font-medium">{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <Link 
                  href="/portfolio" 
                  className="px-4 py-2 text-stone-600 hover:text-amber-700 transition-all duration-300 font-medium rounded-xl hover:bg-amber-50/50"
                >
                  أعمالنا
                </Link>
                <Link 
                  href="/custom-gift" 
                  className="px-4 py-2 text-stone-600 hover:text-amber-700 transition-all duration-300 font-medium rounded-xl hover:bg-amber-50/50"
                >
                  هدية مخصصة
                </Link>
              </nav>

              <div className="flex items-center gap-4">
                <Link 
                  href="/custom-gift" 
                  className="relative group overflow-hidden bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    اطلب الآن
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        
        <footer className="glass border-t border-white/20 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold bg-gradient-to-br from-amber-600 to-amber-800 bg-clip-text text-transparent font-display mb-4">
                  الوئام
                </h3>
                <p className="text-stone-500 leading-relaxed max-w-md">
                  متجرك الأول للهدايا المخصصة والفاخرة. نحول مشاعرك إلى هدايا ملموسة تُصنع بحب وعناية لتناسب جميع مناسباتك السعيدة.
                </p>
              </div>
              <div>
                <h4 className="text-stone-800 font-semibold mb-4">روابط سريعة</h4>
                <ul className="space-y-2 text-stone-500">
                  <li><Link href="/store" className="hover:text-amber-600 transition-colors">المنتجات</Link></li>
                  <li><Link href="/portfolio" className="hover:text-amber-600 transition-colors">أعمالنا</Link></li>
                  <li><Link href="/custom-gift" className="hover:text-amber-600 transition-colors">هدية مخصصة</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-stone-800 font-semibold mb-4">تواصل معنا</h4>
                <a 
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966500000000'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-stone-500 hover:text-green-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  واتساب
                </a>
              </div>
            </div>
            <div className="border-t border-stone-200/50 mt-8 pt-8 text-center text-stone-400 text-sm">
              <p>© {new Date().getFullYear()} الوئام. جميع الحقوق محفوظة</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
