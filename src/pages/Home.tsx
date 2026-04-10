import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Hero />
      <ProductGrid />
      
      {/* Features Section */}
      <section className="bg-black text-white py-24 rounded-[2rem] sm:rounded-[3rem] m-4 sm:m-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-6 flex flex-col items-center">
              <div className="w-16 h-16 border border-white rounded-full flex items-center justify-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-4">جودة عالية</h3>
              <p className="text-gray-400 font-light leading-relaxed">أقمشة فاخرة وتطريز يدوي متقن لضمان إطلالة استثنائية.</p>
            </div>
            <div className="p-6 flex flex-col items-center">
              <div className="w-16 h-16 border border-white rounded-full flex items-center justify-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-4">توصيل سريع</h3>
              <p className="text-gray-400 font-light leading-relaxed">توصيل سريع ومريح لجميع محافظات جمهورية مصر العربية، مع إمكانية الدفع عند الاستلام.</p>
            </div>
            <div className="p-6 flex flex-col items-center">
              <div className="w-16 h-16 border border-white rounded-full flex items-center justify-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-4">دفع آمن</h3>
              <p className="text-gray-400 font-light leading-relaxed">خيارات دفع متعددة وآمنة لتجربة تسوق مريحة.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
