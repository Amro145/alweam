import Link from 'next/link';
import Image from 'next/image';

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "حسنات جارية ولمسة مليانة حب 🌿",
    description: "مصحف • سبحة • شوكولاتة.. هديتك ممكن تكون سبب في حسنات جارية. 'وتعاونوا على البر والتقوى'. خلّي بصمتك جميلة وكن دايمًا صاحب أثر. 🎁💫",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1h13l3-1m-19 0v10a2 2 0 002 2h15a2 2 0 002-2V6m-19 0h19M12 11h.01M12 15h.01" />
      </svg>
    ),
    title: "عبّر بطريقتك.. وخلي هديتك مختلفة 📸✍️",
    description: "مجات حسب الطلب: تصميم صورة، كتابة، أو أي فكرة في بالك. فكل مجٍّ هنا.. بيتُ شعرٍ صغير يُشرب بالحب. اطلب مجك الآن، واجعل لكل رشفة معنى. ☕💜",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "خلي هديتك أحلى.. وألذ 🍫✨",
    description: "بوكيهات شوكولاتة وورد بتنسيق أنيق يلفت الأنظار ويترك أثراً لا يُنسى. اجعل هديتك تقول: أهتمّ بك.. وأقدّر التفاصيل. 🌹🤤",
  },
];



export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Announcement Bar */}
      <div className="bg-linear-to-r from-purple-600 to-purple-800 text-white py-2 text-center text-sm font-bold shadow-md animate-fade-in z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
          <span className="animate-pulse">🏃🏽</span>
          توصيل مجاني لكل طلبيات اليوم
        </div>
      </div>
      <section className="relative flex-1 flex items-center justify-center min-h-[85vh] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=2000&q=80" 
            alt="Hero Background" 
            fill
            className="object-cover opacity-[0.07]"
            priority
          />
        </div>
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-24">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-100/80 text-purple-700 text-sm font-semibold mb-8 shadow-lg shadow-purple-200/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              متجرك الأول للهدايا المخصصة
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-stone-900 mb-8 tracking-tight animate-fade-in-up stagger-1" style={{ animationFillMode: 'both' }}>
            <span className="block text-4xl md:text-6xl lg:text-7xl text-stone-600 font-display font-medium">
              ليست مجرد هدية..
            </span>
            <span className="block bg-linear-to-br from-purple-600 via-purple-500 to-purple-700 bg-clip-text text-transparent px-2">
              بل لحظة جميلة وذكرى تبقى 🤍
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-500 max-w-3xl mx-auto mb-12 leading-relaxed font-light animate-fade-in-up stagger-2" style={{ animationFillMode: 'both' }}>
            الوئام بيساعدك تختار الهدية المثالية ويوصل إحساسك بأجمل صورة ممكنة. هديتك م مجرد مادة.. دي رسالة وأثر. 💜🌧️
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3" style={{ animationFillMode: 'both' }}>
            <Link 
              href="/store" 
              className="group relative w-full sm:w-auto px-10 py-5 bg-linear-to-br from-purple-500 via-purple-600 to-purple-700 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                تسوق الآن
                <ArrowRight className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="/custom-gift" 
              className="group w-full sm:w-auto px-10 py-5 bg-white/80 backdrop-blur-sm text-stone-700 rounded-full font-semibold text-lg border-2 border-stone-200 hover:border-purple-200 hover:bg-purple-50/80 transition-all duration-300 hover:scale-105 shadow-lg shadow-stone-200/50"
            >
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                تصميم هدية خاصة
              </span>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-stone-50 to-transparent"></div>
      </section>

      <section className="py-24 bg-linear-to-b from-stone-50 to-stone-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group glass-card rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'both' }}
              >
                <div className="relative inline-flex mb-6">
                  <div className="absolute inset-0 bg-purple-200/50 rounded-2xl blur-lg group-hover:bg-purple-300/50 transition-colors duration-500"></div>
                  <div className="relative w-16 h-16 bg-linear-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-3 font-display">{feature.title}</h3>
                <p className="text-stone-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      <section className="py-24 bg-linear-to-b from-stone-50 to-stone-100/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card rounded-3xl p-12 md:p-16 bg-white/60">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-green-400 to-green-600 text-white mb-8 shadow-lg shadow-green-500/30">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 font-display">
              هل لديك فكرة خاصة؟
            </h2>
            <p className="text-lg text-stone-500 max-w-xl mx-auto mb-8">
              تواصل معنا مباشرة عبر واتساب لطلب هدية بمواصفات خاصة تناسب ذوقك ومناسبةك
            </p>
            <a 
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966500000000'}?text=${encodeURIComponent('مرحباً، أرغب في طلب هدية مخصصة')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-br from-green-500 to-green-600 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-6 h-6" />
              تواصل معنا الآن
              <ArrowRight className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function MessageCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}
