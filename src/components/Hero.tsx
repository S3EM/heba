import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] m-4 sm:m-6 overflow-hidden bg-black rounded-[2rem] sm:rounded-[3rem]">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* We use scale-[1.25] to zoom in and hide the PixVerse watermark at the edges */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-[1.15] origin-bottom"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient overlays */}
        {/* Main overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end items-start pb-32 md:pb-40">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="max-w-4xl text-right"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-tight mb-12">
            أناقة لا تنسى مع<br/>أرقى الفساتين السورية
          </h1>
          
          <motion.a 
            href="#collection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="inline-flex flex-col items-center gap-6 text-white hover:text-yellow-400 transition-colors group"
          >
            <span className="font-sans text-xl tracking-[0.4em] uppercase font-light">Explore</span>
            <ArrowDown className="w-8 h-8 animate-bounce" strokeWidth={1} />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
