import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-500 p-4 sm:p-6 pointer-events-none">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-[2rem] transition-all duration-500 pointer-events-auto ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-2'}`}>
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/images/logo.png" alt="كوني اجمل" className="h-10 w-auto object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
            <span className={`font-serif text-3xl font-bold tracking-wider transition-colors duration-500 group-hover:text-yellow-400 ${scrolled ? 'text-black' : 'text-white'}`}>كوني اجمل</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <Link to="/" className={`transition-colors font-light uppercase tracking-widest text-sm ${scrolled ? 'text-black hover:text-yellow-400' : 'text-white hover:text-yellow-400'}`}>الرئيسية</Link>
            <Link to="/collection" className={`transition-colors font-light uppercase tracking-widest text-sm ${scrolled ? 'text-black hover:text-yellow-400' : 'text-white hover:text-yellow-400'}`}>التشكيلة الجديدة</Link>
            <a href="#contact" className={`transition-colors font-light uppercase tracking-widest text-sm ${scrolled ? 'text-black hover:text-yellow-400' : 'text-white hover:text-yellow-400'}`}>تواصل معنا</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none transition-colors duration-500 ${scrolled ? 'text-black hover:text-gray-500' : 'text-white hover:text-gray-300'}`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white rounded-2xl mt-2 overflow-hidden shadow-xl pointer-events-auto">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-3 text-black hover:text-yellow-400 hover:bg-gray-50 rounded-md font-light tracking-widest transition-colors"
              onClick={() => setIsOpen(false)}
            >
              الرئيسية
            </Link>
            <Link 
              to="/collection" 
              className="block px-3 py-3 text-black hover:text-yellow-400 hover:bg-gray-50 rounded-md font-light tracking-widest transition-colors"
              onClick={() => setIsOpen(false)}
            >
              التشكيلة الجديدة
            </Link>
            <a 
              href="#contact" 
              className="block px-3 py-3 text-black hover:text-yellow-400 hover:bg-gray-50 rounded-md font-light tracking-widest transition-colors"
              onClick={() => setIsOpen(false)}
            >
              تواصل معنا
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
