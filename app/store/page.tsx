import Link from 'next/link';

export default function StorePage() {
  const products = [
    { id: 1, title: 'طقم هدايا الزفاف', price: '450 ر.س', img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80' },
    { id: 2, title: 'باقة التخرج الفاخرة', price: '320 ر.س', img: 'https://images.unsplash.com/photo-1572983577717-d1cb7fdde2fc?w=800&q=80' },
    { id: 3, title: 'صندوق الهدايا الكلاسيكي', price: '250 ر.س', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&q=80' },
    { id: 4, title: 'هدية ذكرى الزواج', price: '550 ر.س', img: 'https://images.unsplash.com/photo-1557022026-613bfa70da9d?w=800&q=80' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-serif text-gray-900 mb-4">المنتجات</h1>
            <p className="text-gray-500 text-lg">تصفح تشكيلتنا المميزة من الهدايا الجاهزة</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link key={product.id} href={`/store/${product.id}`} className="group block">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="aspect-4/5 relative overflow-hidden bg-gray-100">
                  <img 
                    src={product.img} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 truncate">{product.title}</h3>
                  <p className="text-amber-600 font-semibold">{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
