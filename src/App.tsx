import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Admin from './pages/Admin'; // السطر الجديد لاستدعاء لوحة التحكم

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-ink-900 bg-gray-100">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            {/* السطر اللي جاي ده هو اللي بيعمل صفحة لوحة التحكم */}
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
