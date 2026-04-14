import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // تأكد من تثبيت framer-motion
import { MessageCircle, X, Send } from 'lucide-react';

const FAQs = [
  { id: 1, question: "أين يقع المحل؟", keywords: ["فين", "عنوان", "مكان", "لوكيشن"], answer: "موقعنا في القليوبية - أبو زعبل (بجوار ملعب النبراوي) 📍" },
  { id: 2, question: "ما هي أسعار الفساتين؟", keywords: ["سعر", "بكام", "اسعار"], answer: "الأسعار بتختلف حسب التصميم والخامة، تقدري تستفسري عن سعر أي فستان بزيارة الفرع أو عبر الواتساب مباشرة. 💰" },
  { id: 3, question: "ما هي الألوان المتاحة؟", keywords: ["فساتين", "الوان", "تشكيلة"], answer: "عندنا أحدث تشكيلة فساتين سهرة سورية بألوان (الذهبي، الفضي، الأسود، والعنابي). 👗" },
  { id: 4, question: "مواعيد العمل؟", keywords: ["مواعيد", "وقت", "متى"], answer: "نحن متاحون يومياً من الساعة 5:00 مساءً وحتى الساعة 11:00 مساءً. ✨" },
  { id: 5, question: "رقم الهاتف والواتساب؟", keywords: ["رقم", "تليفون", "واتساب"], answer: "يمكنك التواصل معنا على رقم: +201030692713 📞" },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ id: '1', text: 'أهلاً بكِ في "كوني أجمل"! كيف يمكنني مساعدتكِ اليوم؟ ✨', isBot: true }]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now().toString(), text, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    setTimeout(() => {
      const lowerText = text.toLowerCase();
      const match = FAQs.find(f => f.question === text || f.keywords.some(k => lowerText.includes(k)));
      const botMsg = { 
        id: (Date.now() + 1).toString(), 
        text: match ? match.answer : "شكراً لتواصلكِ! يمكنكِ الاستفسار أكثر عبر الواتساب للرد السريع. ✅", 
        isBot: true 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* زر الفتح */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 p-4 bg-black text-white rounded-full shadow-2xl transition-all ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:left-6 sm:right-auto z-[60] w-full sm:w-[380px] h-[90vh] sm:h-[600px] bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            dir="rtl"
          >
            {/* الهيدر */}
            <div className="bg-black text-white p-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold">K</div>
                <div>
                  <h3 className="font-bold">المساعد الذكي</h3>
                  <p className="text-[10px] text-gray-
