import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import HomePage from './pages/HomePage';
import StudioPage from './pages/StudioPage';
import ComparisonPage from './pages/ComparisonPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedSampleId, setSelectedSampleId] = useState(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handleSelectSample = (sampleId) => {
    setSelectedSampleId(sampleId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C2724]">
      {/* Top Navbar */}
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            onSelectSample={handleSelectSample}
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
          />
        )}

        {activePage === 'studio' && (
          <StudioPage
            initialSampleId={selectedSampleId}
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
          />
        )}

        {activePage === 'comparison' && (
          <ComparisonPage
            setActivePage={setActivePage}
            onSelectSample={handleSelectSample}
          />
        )}

        {activePage === 'gallery' && (
          <GalleryPage
            setActivePage={setActivePage}
            onSelectSample={handleSelectSample}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            setActivePage={setActivePage}
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActivePage={setActivePage} 
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Resume & Technical Specifications Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
    </div>
  );
}
