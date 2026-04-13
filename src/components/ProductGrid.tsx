import { useState } from 'react';
import { motion } from 'framer-motion'; // التعديل هنا لضمان الاستقرار
import { Heart } from 'lucide-react';

// Product List Array
const DRESSES = Array.from({ length: 29 }, (_, i) => ({
  id: i + 1,
  name: `فستان سهرة تصميم ${i + 1}`,
  price: 500,
  currency: 'EGP',
  image: `/images/dress-${i + 1}.jpg` // المسار مطابق لمجلدك في GitHub
}));

export default function ProductGrid() {
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div id="collection" className="bg-white py-24 sm:py-32 rounded-[2rem] sm:rounded-[3rem] shadow-sm m-4 sm:m-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-serif text-black sm:text-5xl uppercase tracking-widest">
            أحدث التصاميم
          </h2>
          <div className="w-24 h-1 bg-black mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-20 gap-x-12">
          {DRESSES.map((dress, index) => (
            <motion.div 
              key={dress.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (index % 3) * 0.1 }}
              className="group relative cursor-pointer flex flex-col"
            >
              <div className="aspect-w-3 aspect-h-4 bg-gray-100 overflow-hidden rounded-3xl shadow-sm group-hover:shadow-xl transition-shadow duration-500 relative">
                <img
                  src={dress.image}
                  alt={dress.name}
                  loading="lazy" // تحسين سرعة الموقع
                  className="w-full h-[600px] object-cover object-center group-hover:scale-110 transition-all duration-700 ease-out"
                  onError={(e) => {
                    // حل احتياطي لو الصورة منورتش
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x800?text=جاري+تحميل+الفستان';
                  }}
                />
                <button 
                  onClick={(e) => toggleFavorite(e, dress.id)}
                  className="absolute top-4 right-4 p-2 z-10 bg-white/50 hover:bg-white/80 backdrop-blur-sm rounded-full transition-colors duration-300"
                >
                  <Heart 
                    className={`w-6 h-6 transition-colors duration-300 ${favorites[dress.id] ? 'fill-red-500 text-red-500' : 'text-black'}`} 
                  />
                </button>
              </div>
              <div className="mt-8 flex flex-col items-center justify-center text-center px-4">
                <h3 className="text-xl text-black font-serif">
                  {dress.name}
                </h3>
                <p className="mt-3 text-lg text-gray-500 tracking-widest font-medium">
                  {dress.price} <span className="text-sm">{dress.currency}</span>
                </p>
                {/* دوائر الألوان */}
                <div className="flex gap-3 mt-4 justify-center items-center">
                  <span className="w-5 h-5 rounded-full bg-[#E5E4E2] border border-gray-300 shadow-sm cursor-pointer hover:scale-110 transition-transform" title="فضي"></span>
                  <span className="w-5 h-5 rounded-full bg-black border border-gray-300 shadow-sm cursor-pointer hover:scale-110 transition-transform" title="أسود"></span>
                  <span className="w-5 h-5 rounded-full bg-[#D4AF37] border border-gray-300 shadow-sm cursor-pointer hover:scale-110 transition-transform" title="ذهبي"></span>
                  <span className="w-5 h-5 rounded-full bg-[#800000] border border-gray-300 shadow-sm cursor-pointer hover:scale-110 transition-transform" title="عنابي"></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
