import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "متجر الوئام - Al-Wiam Gift Store",
  description: "اطلب هداياك المخصصة بكل حب - Order your custom gifts with love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-amber-600 font-serif">
                  الوئام
                </Link>
              </div>
              <nav className="hidden md:flex space-x-8 space-x-reverse">
                <Link href="/store" className="text-gray-600 hover:text-amber-600 transition-colors font-medium">المنتجات</Link>
                <Link href="/portfolio" className="text-gray-600 hover:text-amber-600 transition-colors font-medium">أعمالنا</Link>
                <Link href="/custom-gift" className="text-gray-600 hover:text-amber-600 transition-colors font-medium">هدية مخصصة</Link>
              </nav>
              <div className="flex items-center gap-4">
                <Link href="/custom-gift" className="bg-amber-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-amber-700 transition-colors shadow-sm">
                  اطلب الآن
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
