import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { PlusCircle, Trash2, Package, Tag } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('فساتين سهرة');
  const [loading, setLoading] = useState(false);

  // جلب المنتجات من الفايربيز لعرضها في اللوحة
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // وظيفة إضافة منتج جديد
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'products'), {
        name,
        price,
        imageUrl,
        category,
        createdAt: new Date().toISOString()
      });
      // مسح الخانات بعد الإضافة الناجحة
      setName('');
      setPrice('');
      setImageUrl('');
      fetchProducts();
      alert('تم إضافة المنتج بنجاح! ✨');
    } catch (error) {
      console.error("Error adding product: ", error);
      alert('حدث خطأ أثناء الإضافة، تأكد من إعدادات الفايربيز');
    }
    setLoading(false);
  };

  // وظيفة حذف منتج
  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10" dir="rtl">
      <div className="flex items-center gap-3 mb-8 border-b pb-4">
        <PlusCircle className="text-pink-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">لوحة تحكم هبة 👗</h1>
      </div>

      {/* نموذج إضافة منتج */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-10 border border-pink-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اسم الفستان</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="مثلاً: فستان سهرة مطرز"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">السعر (بالجنيه)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="0.00"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">رابط صورة المنتج</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="ضع رابط الصورة (URL) هنا"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 transition duration-300 font-bold flex items-center justify-center gap-2"
        >
          {loading ? 'جاري الحفظ...' : (
            <>
              <Package size={20} />
              إضافة المنتج للموقع
            </>
          )}
        </button>
      </form>

      {/* عرض المنتجات لمسحها */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Tag className="text-pink-600" />
        المنتجات الموجودة حالياً
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden border">
            <img src={product.imageUrl} alt={product.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-gray-800">{product.name}</h3>
              <p className="text-pink-600 font-bold mb-3">{product.price} جنيه</p>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium"
              >
                <Trash2 size={16} />
                حذف المنتج
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
