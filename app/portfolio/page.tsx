export default function PortfolioPage() {
  const works = [
    { id: 1, title: 'Wedding Gift Set', img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80' },
    { id: 2, title: 'Corporate Branding', img: 'https://images.unsplash.com/photo-1572983577717-d1cb7fdde2fc?w=800&q=80' },
    { id: 3, title: 'Birthday Special', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&q=80' },
    { id: 4, title: 'Anniversary Setup', img: 'https://images.unsplash.com/photo-1557022026-613bfa70da9d?w=800&q=80' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif text-neutral-900 mb-4">Our Portfolio</h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">Explore some of our previous customized works crafted with love and precision.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {works.map((work) => (
            <div key={work.id} className="group overflow-hidden rounded-2xl relative cursor-pointer aspect-square bg-neutral-100">
              <img 
                src={work.img} 
                alt={work.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-2xl font-serif text-white mb-2">{work.title}</h3>
                <p className="text-white/80 text-sm">View details</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
