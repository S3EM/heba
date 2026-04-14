import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ChatBot from './components/ChatBot'; // السطر ده اللي ضفناه
import Home from './pages/Home';
import Collection from './pages/Collection';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-ink-900 bg-gray-100">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <ChatBot /> {/* والسطر ده اللي هيخلي البوت يظهر في الموقع */}
      </div>
    </Router>
  );
}
