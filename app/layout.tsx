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
  title: {
    default: "الوئام - متجر الهدايا الفاخرة بالزقازيق والقاهرة",
    template: "%s | الوئام"
  },
  description: "متجر الوئام للهدايا المخصصة والفاخرة في الزقازيق والقاهرة. تفصيل صناديق خشبية، هدايا مناسبات، وتوصيل سريع. نحول مشاعرك إلى هدايا ملموسة تُصنع بحب.",
  keywords: ["متجر هدايا الزقازيق", "هدايا هاند ميد القاهرة", "صناديق هدايا خشبية مصر", "افضل محل هدايا في الزقازيق", "توصيل هدايا القاهرة", "هدايا مخصصة بالاسم", "هدايا تخرج الزقازيق", "بوكسات هدايا القاهرة"],
  authors: [{ name: "الوئام" }],
  creator: "الوئام",
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://alweam.amroaltayeb14.workers.dev",
    title: "الوئام - متجر الهدايا الفاخرة والبوكسات المخصصة",
    description: "نحول مشاعرك إلى هدايا ملموسة تُصنع بحب وعناية لتناسب جميع مناسباتك السعيدة في الزقازيق والقاهرة.",
    siteName: "الوئام",
  },
  twitter: {
    card: "summary_large_image",
    title: "الوئام - متجر الهدايا الفاخرة",
    description: "أجمل الهدايا المخصصة والبوكسات الخشبية في الزقازيق والقاهرة.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-stone-50 text-stone-900">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        
        <footer className="glass border-t border-white/20 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold bg-linear-to-br from-purple-600 to-purple-800 bg-clip-text text-transparent font-display mb-4">
                  الوئام
                </h3>
                <p className="text-stone-500 leading-relaxed max-w-md">
                  متجرك الأول للهدايا المخصصة والفاخرة في <strong>الزقازيق والقاهرة</strong>. نحول مشاعرك إلى هدايا ملموسة تُصنع بحب وعناية لتناسب جميع مناسباتك السعيدة.
                </p>
              </div>
              <div>
                <h4 className="text-stone-800 font-semibold mb-4">روابط سريعة</h4>
                <ul className="space-y-2 text-stone-500">
                  <li><Link href="/store" className="hover:text-purple-600 transition-colors">المنتجات</Link></li>
                  <li><Link href="/portfolio" className="hover:text-purple-600 transition-colors">أعمالنا</Link></li>
                  <li><Link href="/custom-gift" className="hover:text-purple-600 transition-colors">هدية مخصصة</Link></li>
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
            {/* TODO : developer whatsapp +249965158196  */}
            <div className="border-t border-stone-200/50 mt-8 pt-8 text-center text-stone-400 text-sm">
              <p>Developed by <a href="https://github.com/Amro145" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">Amro Al-Tayeb</a></p>
              <a href="https://wa.me/+249965158196" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">+249965158196</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
