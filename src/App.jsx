import { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Schedule from './components/Schedule';
import Speakers from './components/Speakers';
import Gallery from './components/Gallery';
import Sponsors from './components/Sponsors';
import Register from './components/Register';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NoticeModal from './components/NoticeModal';
import InAppMessageModal from './components/InAppMessageModal';
import PushNotificationToast from './components/PushNotificationToast';
import { useAnalytics } from './hooks/useAnalytics';

export default function App() {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  
  // Track page views automatically with Firebase Analytics
  useAnalytics();

  const handleTriggerNotice = () => {
    setIsNoticeOpen(true);
  };

  return (
    <>
      <Navbar onTriggerNotice={handleTriggerNotice} />
      <main>
        <Hero onTriggerNotice={handleTriggerNotice} />
        <About />
        <Events onOpenRegister={handleTriggerNotice} />
        <Schedule />
        <Speakers />
        <Gallery />
        <Sponsors />
        <Register onTriggerNotice={handleTriggerNotice} />
        <Contact />
      </main>
      <Footer />

      {/* Global Notice Pop-up Modal */}
      <NoticeModal
        isOpen={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
      />

      {/* Dynamic Firebase Remote Config In-App Messaging Modal */}
      <InAppMessageModal />

      {/* FCM Foreground Push Notification Toast */}
      <PushNotificationToast />
    </>
  );
}

