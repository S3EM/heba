import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Admin from './pages/Admin';
import './index.css'; // تأكد من إضافة هذا السطر لتشغيل التصميم

export default function App() {
  return (
    <Router>
      {/* تم تعديل الـ bg والـ text لضمان توافقها مع مكتبة Tailwind */}
      <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/admin-heba" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <ChatBot />
      </div>
    </Router>
  );
}
