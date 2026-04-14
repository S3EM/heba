import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const FAQs = [
  { id: 1, question: "أين يقع المحل؟", keywords: ["فين", "عنوان", "مكان", "لوكيشن"], answer: "موقعنا في القليوبية - أبو زعبل (بجوار ملعب النبراوي) 📍" },
  { id: 2, question: "ما هي أسعار الفساتين؟", keywords: ["سعر", "بكام", "اسعار"], answer: "الأسعار بتختلف حسب التصميم والخامة، تقدري تستفساري عن سعر أي فستان بزيارة الفرع أو عبر الواتساب مباشرة. 💰" },
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
            <div className="bg-black text-white p-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold">K</div>
                <div>
                  <h3 className="font-bold">المساعد الذكي</h3>
                  <p className="text-[10px] text-gray-400">متصل الآن</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.isBot ? 'bg-white text-black shadow-sm' : 'bg-black text-white'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-2 bg-white border-t overflow-x-auto flex gap-2 no-scrollbar shrink-0">
              {FAQs.map(faq => (
                <button 
                  key={faq.id} 
                  onClick={() => handleSendMessage(faq.question)}
                  className="whitespace-nowrap bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-xs transition-colors"
                >
                  {faq.question}
                </button>
              ))}
            </div>

            <div className="p-4 bg-white border-t flex gap-2 shrink-0">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="اسألي عن الفساتين..." 
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
              <button 
                onClick={() => handleSendMessage(inputValue)}
                className="bg-black text-white p-2 rounded-full disabled:opacity-50"
                disabled={!inputValue.trim()}
              >
                <Send className="w-5 h-5 rotate-180" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
