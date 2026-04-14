import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';

// مصفوفة الأسئلة والأجوبة (FAQ)
const FAQs = [
  {
    id: 1,
    question: "أين يقع المحل؟",
    keywords: ["فين", "عنوان", "مكان", "لوكيشن"],
    answer: "موقعنا في القليوبية - أبو زعبل (بجوار ملعب النبراوي)"
  },
  {
    id: 2,
    question: "ما هي أسعار الفساتين؟",
    keywords: ["سعر", "بكام", "اسعار"],
    answer: "الأسعار بتختلف حسب التصميم والخامة، تقدري تستفساري عن سعر أي فستان بزيارة الفرع أو عبر الواتساب مباشرة. 💰"
  },
  {
    id: 3,
    question: "ما هي الألوان المتاحة؟",
    keywords: ["فساتين", "الوان", "تشكيلة"],
    answer: "عندنا أحدث تشكيلة فساتين سهرة سورية بألوان (الذهبي، الفضي، الأسود، والعنابي). تقدري تشوفيها في قسم 'أحدث التصاميم'. 👗"
  },
  {
    id: 4,
    question: "مواعيد العمل؟",
    keywords: ["مواعيد", "وقت", "متى", "تفتحوا", "الساعة كام"],
    answer: "تنورينا في أي وقت! نحن متاحون يومياً من الساعة 5:00 مساءً وحتى الساعة 11:00 مساءً. ✨"
  },
  {
    id: 5,
    question: "رقم الهاتف والواتساب؟",
    keywords: ["رقم", "تليفون", "موبايل", "واتساب", "محتاج أكلمكم"],
    answer: "يمكنك التواصل معنا عبر الهاتف أو الواتساب على رقم: +201030692713، كما يمكنك النزول لأسفل الصفحة في قسم 'تواصل معنا' لتجد روابط مباشرة للمحادثة. 📞"
  },
  {
    id: 6,
    question: "حسابات السوشيال ميديا؟",
    keywords: ["فيسبوك", "انستا", "حسابات", "لينك", "تيك توك"],
    answer: "تنورينا على حساباتنا الرسمية! انزلي لآخر الصفحة هتلاقي روابط الفيسبوك والتيك توك تحت اسم 'كوني أجمل'.. مستنيين متابعتك! 📱✨"
  },
  {
    id: 7,
    question: "تواصل معنا",
    keywords: ["تواصل", "اتواصل"],
    answer: "تم توجيهك لأسفل الصفحة حيث توجد جميع أرقامنا وحساباتنا! 👇",
    action: "scrollToFooter"
  }
];

type Message = {
  id: string;
  text: string;
  isBot: boolean;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'أهلاً بكِ في "كوني اجمل"! نحن متاحون يومياً من الساعة 5:00 مساءً وحتى الساعة 11:00 مساءً. كيف يمكنني مساعدتكِ اليوم؟ ✨',
      isBot: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // التمرير التلقائي لأسفل المحادثة
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 150);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // دالة البحث عن الإجابة المناسبة
  const getBotResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    
    // التحقق من كلمات الترحيب أولاً
    const greetings = ["سلام", "اهلا", "هاي", "ازيك", "أهلا", "إزيك"];
    if (greetings.some(keyword => lowerInput.includes(keyword))) {
      return { text: "أهلاً بكِ في كوني أجمل! كيف يمكنني مساعدتكِ اليوم؟ ✨" };
    }

    // البحث في الكلمات المفتاحية أو تطابق السؤال المباشر
    const matchedFAQ = FAQs.find(faq => 
      lowerInput === faq.question.toLowerCase() || 
      faq.keywords.some(keyword => lowerInput.includes(keyword))
    );

    if (matchedFAQ) {
      return { text: matchedFAQ.answer, action: (matchedFAQ as any).action };
    }

    return { text: "شكراً لتواصلكِ معنا! لضمان أفضل خدمة، يفضل التواصل عبر الواتساب للرد الفوري على استفساراتكِ. وكل الروابط والمعلومات التفصيلية موجودة في أسفل الموقع (الفوتر). ✅" };
  };

  // إرسال رسالة
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // إضافة رسالة المستخدم
    const userMsg: Message = { id: Date.now().toString(), text, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // محاكاة وقت التفكير للرد
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMsg: Message = { id: (Date.now() + 1).toString(), text: response.text, isBot: true };
      setMessages(prev => [...prev, botMsg]);

      // تنفيذ التمرير السلس إذا كان الإجراء مطلوباً
      if (response.action === 'scrollToFooter') {
        setTimeout(() => {
          document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false); // إغلاق الشات لرؤية الفوتر بشكل أوضح
        }, 1000);
      }
    }, 600);
  };

  return (
    <>
      {/* زر فتح الشات */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 p-4 bg-black text-white rounded-full shadow-2xl hover:bg-gray-800 transition-colors ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open Chat"
      >
        <MessageCircle className="w-7 h-7" />
      </motion.button>

      {/* نافذة الشات */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
            className="fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 z-50 sm:w-[380px] h-[85vh] sm:h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
            dir="rtl"
          >
            {/* الهيدر */}
            <div className="bg-black text-white px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-black" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-lg leading-tight">المساعد الذكي</h3>
                  <p className="text-[11px] text-gray-300 mt-0.5">متصل الآن</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors shrink-0"
                aria-label="Close Chat"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* منطقة الرسائل */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#F9F9F9] flex flex-col gap-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex w-full ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                      msg.isBot 
                        ? 'bg-white text-black border border-gray-200 shadow-sm rounded-tr-none' 
                        : 'bg-black text-white rounded-tl-none shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* الأسئلة المقترحة (Quick Replies) */}
            <div className="bg-white border-t border-gray-100 pt-3 pb-2 px-3">
              <div 
                className="flex flex-nowrap gap-2 overflow-x-auto pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {FAQs.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => handleSendMessage(faq.question)}
                    className="text-[13px] font-medium whitespace-nowrap flex-shrink-0 bg-white hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-full transition-all duration-300 text-center border border-gray-200 shadow-sm"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>

            {/* حقل الإدخال */}
            <div className="p-3 bg-white flex gap-2 items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 bg-[#F0F0F0] text-sm rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-shadow"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim()}
                className="w-11 h-11 bg-gray-500 text-white rounded-full flex items-center justify-center hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              >
                <Send className="w-5 h-5 rtl:-scale-x-100" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

