import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Admin() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        name: name,
        price: price,
        createdAt: new Date()
      });
      alert("تم إضافة الفستان بنجاح! ✨");
      setName(''); setPrice('');
    } catch (error) {
      console.error("خطأ في الإضافة: ", error);
    }
  };

  return (
    <div className="p-8 mt-20" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">لوحة تحكم المنتجات 👗</h1>
      <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <div className="mb-4">
          <label className="block mb-2">اسم الفستان:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">السعر:</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <button type="submit" className="bg-black text-white px-6 py-2 rounded-full">إضافة للموقع</button>
      </form>
    </div>
  );
}
