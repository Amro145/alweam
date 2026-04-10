import Link from 'next/link';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="rounded-3xl overflow-hidden bg-gray-100 aspect-square sticky top-32">
            <img 
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=80" 
              alt="Gift" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="pt-8 md:pt-16">
            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500 mb-6 font-medium">
              <Link href="/store" className="hover:text-amber-600">المنتجات</Link>
              <span>/</span>
              <span>طقم هدايا الزفاف</span>
            </div>
            
            <h1 className="text-4xl font-serif text-gray-900 mb-4">طقم هدايا الزفاف #{resolvedParams.id}</h1>
            <p className="text-2xl text-amber-600 font-semibold mb-8">450 ر.س</p>
            
            <div className="prose prose-lg text-gray-600 mb-10">
              <p>طقم هدايا فاخر مصمم خصيصاً لمناسبات الزفاف السعيدة. يحتوي على مجموعة من القطع المختارة بعناية فائقة لتناسب ذوق العرسان.</p>
              <ul>
                <li>تغليف فاخر مع شريطة أنيقة</li>
                <li>إمكانية كتابة رسالة مخصصة</li>
                <li>توصيل سريع وآمن</li>
              </ul>
            </div>
            
            <button className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 rounded-full transition-colors mb-6 text-lg">
              إضافة للسلة
            </button>
            <Link 
              href="/custom-gift" 
              className="w-full flex items-center justify-center bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold py-4 rounded-full transition-colors text-lg border border-amber-200"
            >
              تخصيص هذه الهدية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
