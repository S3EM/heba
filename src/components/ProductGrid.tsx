import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

const DRESSES = [
  { id: 1, name: 'فستان سهرة ملكي مطرز', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-36-34.jpg' },
  { id: 2, name: 'فستان مخملي بقصة حورية البحر', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-36-46.jpg' },
  { id: 3, name: 'فستان حرير ناعم بفتحة جانبية', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-36-59.jpg' },
  { id: 4, name: 'فستان شيفون مرصع بالكريستال', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-37-10.jpg' },
  { id: 5, name: 'فستان كلاسيكي بأكمام دانتيل', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-37-25.jpg' },
  { id: 6, name: 'فستان منفوش بتطريز ذهبي', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-37-33.jpg' },
  { id: 7, name: 'فستان ساتان لامع بكتف واحد', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-37-44.jpg' },
  { id: 8, name: 'فستان سهرة بتصميم درابيه', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-38-01.jpg' },
  { id: 9, name: 'فستان تول مطرز بالورود', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-38-09.jpg' },
  { id: 10, name: 'فستان بقصة أميرات ديزني', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-38-20.jpg' },
  { id: 11, name: 'فستان سهرة أسود كلاسيكي', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-38-31.jpg' },
  { id: 12, name: 'فستان مرصع بالترتر اللامع', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-38-42.jpg' },
  { id: 13, name: 'فستان بأكمام منفوخة وتطريز', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-38-59.jpg' },
  { id: 14, name: 'فستان سهرة عنابي فاخر', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-39-09.jpg' },
  { id: 15, name: 'فستان بقصة مستقيمة وظهر مكشوف', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-39-18.jpg' },
  { id: 16, name: 'فستان شيفون بكسرات ناعمة', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-39-26.jpg' },
  { id: 17, name: 'فستان سهرة زمردي جذاب', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-39-51.jpg' },
  { id: 18, name: 'فستان مطرز باللؤلؤ الفاخر', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-40-02.jpg' },
  { id: 19, name: 'فستان كريب بتصميم عصري', price: 500, currency: 'EGP', image: '/photo_2026-04-09_19-40-21.jpg' },
  { id: 20, name: 'فستان سهرة بياقة V عميقة', price: 500, currency: 'EGP', image: '/photo_٢٠٢٦-٠٤-٠٩_١٩-٣٥-٣٩.jpg' },
  { id: 21, name: 'فستان دانتيل فرنسي راقي', price: 500, currency: 'EGP', image: '/photo_٢٠٢٦-٠٤-٠٩_١٩-٣٥-٥٠ (2).jpg' },
  { id: 22, name: 'فستان بأكمام طويلة وتطريز فضي', price: 500, currency: 'EGP', image: '/photo_٢٠٢٦-٠٤-٠٩_١٩-٣٥-٥٠ (3).jpg' },
  { id: 23, name: 'فستان سهرة نيود بتفاصيل لامعة', price: 500, currency: 'EGP', image: '/photo_٢٠٢٦-٠٤-٠٩_١٩-٣٥-٥٠.jpg' },
  { id: 24, name: 'فستان بقصة الكورسيه الجذابة', price: 500, currency: 'EGP', image: '/photo_٢٠٢٦-٠٤-٠٩_١٩-٣٥-٥١.jpg' },
  { id: 25, name: 'فستان سهرة كحلي مرصع بالنجوم', price: 500, currency: 'EGP', image: '/photo_٢٠٢٦-٠٤-٠٩_١٩-٣٥-٥٢ (2).jpg' },
  { id: 26, name: 'فستان بتنورة متدرجة الطبقات', price: 500, currency: 'EGP', image: '/photo_٢٠٢٦-٠٤-٠٩_١٩-٣٥-٥٢.jpg' },
  { id: 27, name: 'فستان سهرة بكتف مكشوف', price: 500, currency: 'EGP', image: '/photo_٢٠٢٦-٠٤-٠٩_١٩-٣٥-٥٣ (2).jpg' },
  { id: 28, name: 'فستان حريري بتصميم انسيابي', price: 500, currency: 'EGP', image: '/photo_٢٠٢٦-٠٤-٠٩_١٩-٣٥-٥٣ (3).jpg' },
  { id: 29, name: 'فستان سهرة فاخر بتطريز يدوي', price: 500, currency: 'EGP', image: '/photo_٢٠٢٦-٠٤-٠٩_١٩-٣٥-٥٣.jpg' },
];

export default function ProductGrid() {
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [showAll, setShowAll] = useState(false);

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const displayedDresses = showAll ? DRESSES : DRESSES.slice(0, 6);

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
          {displayedDresses.map((dress, index) => (
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
                  className="w-full h-[600px] object-cover object-center group-hover:scale-110 transition-all duration-700 ease-out"
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
                {/* Color Circles */}
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

        {!showAll && DRESSES.length > 6 && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-colors font-sans tracking-widest uppercase text-sm shadow-md"
            >
              مشاهدة الكل
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
