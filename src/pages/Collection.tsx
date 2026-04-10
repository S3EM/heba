import ProductGrid from '../components/ProductGrid';

export default function Collection() {
  return (
    <div className="min-h-screen bg-white pt-32 rounded-[2rem] sm:rounded-[3rem] m-4 sm:m-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-serif text-black mb-6 uppercase tracking-widest">التشكيلة الكاملة</h1>
        <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
          تصفحي مجموعتنا الكاملة من فساتين السهرة السورية الفاخرة. تصاميم تناسب جميع الأذواق والمناسبات.
        </p>
      </div>
      <ProductGrid />
    </div>
  );
}
