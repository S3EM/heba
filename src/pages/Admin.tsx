import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { PlusCircle, Trash2, Package, Image as ImageIcon, Tag } from 'lucide-react';

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

  // جلب المنتجات من الفايربيز
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
    setProducts(productsData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // إضافة منتج جديد
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
      setName('');
      setPrice('');
      setImageUrl('');
      fetchProducts();
      alert('تم إضافة المنتج بنجاح! 🎉');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('حدث خطأ أثناء الإضافة');
    }
    setLoading(false);
  };

  // حذف منتج
  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8 border-b pb-4">
        <PlusCircle className="text-pink-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">لوحة تحكم المنتجات 👗</h1>
      </div>

      {/* نموذج الإضافة */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-10 border border-pink-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اسم الفستان</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="مثلاً: فستان سواريه لؤلؤي"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">السعر (جنيه)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="0.00"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">رابط صورة الفستان</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="ضع رابط الصورة هنا"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">القسم</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
