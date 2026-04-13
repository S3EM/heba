import { MapPin, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 m-4 sm:m-6 rounded-[2rem] sm:rounded-[3rem] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-right">
          
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-4xl font-serif tracking-wider transition-colors duration-300 hover:text-yellow-400 cursor-pointer">كوني اجمل</h3>
            <p className="text-gray-400 text-sm leading-loose max-w-xs mx-auto md:mx-0 font-light">
              وجهتك الأولى لأرقى فساتين السهرة السورية. نجمع بين الأصالة والحداثة لنقدم لكِ تصاميم تبرز جمالك.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-6 pt-2">
              <a 
                href="https://www.facebook.com/share/1CFY782uXF/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://www.tiktok.com/@user7166760008713?_r=1&_t=ZS-95PwSpCmVqX" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-sans tracking-widest uppercase text-gray-500">روابط سريعة</h4>
            <ul className="space-y-4">
              <li><a href="/" className="text-gray-300 hover:text-yellow-400 transition-colors font-light">الرئيسية</a></li>
              <li><a href="/collection" className="text-gray-300 hover:text-yellow-400 transition-colors font-light">التشكيلة الجديدة</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-yellow-400 transition-colors font-light">تواصل معنا</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div id="contact" className="space-y-6">
            <h4 className="text-lg font-sans tracking-widest uppercase text-gray-500">تواصل معنا</h4>
            <ul className="space-y-4 text-gray-300 font-light">
              <li>هاتف: +201030692713</li>
              <li className="flex items-start justify-center md:justify-start gap-2">
                <MapPin className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <a 
                  href="https://maps.app.goo.gl/nydwUGM2JvdzUfQ59" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 transition-colors"
                >
                  العنوان: عزبة الأبيض، أبو زعبل، مركز الخانكة، القليوبية
                </a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-24 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm font-light tracking-widest">
          <p>© {new Date().getFullYear()} كوني اجمل لفساتين السهرة. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
