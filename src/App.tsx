//property or Vamprojects, Inc. All rights reserved.

import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Layout components
import Navbar from './components/Navbar';
import SearchOverlay from './components/SearchOverlay';
import FullPageParticles from './components/FullPageParticles';

// Pages
import Home from './pages/Home';
import Plugins from './pages/Plugins';
import AdobeVoice from './pages/AdobeVoice';
import AEOTracker from './pages/AEOtracker';
import Spoch from './pages/Spoch';

// Docs
import DocsHub from './pages/DocsHub';
import DocsVoice from './pages/DocsVoice';
import DocsSpoch from './pages/DocsSpoch';
import DocsSignalScope from './pages/DocsSignalScope';

// Blogs
import BlogTemplate from './pages/BlogTemplate';

// Legal Pages
import HomePrivacy from './pages/legal/HomePrivacy';
import HomeTerms from './pages/legal/HomeTerms';
import VoicePrivacy from './pages/legal/VoicePrivacy';
import VoiceTerms from './pages/legal/VoiceTerms';
import VoiceLicenses from './pages/legal/VoiceLicenses';
import SpochPrivacy from './pages/legal/SpochPrivacy';
import SpochTerms from './pages/legal/SpochTerms';
import SignalScopePrivacy from './pages/legal/SignalScopePrivacy';
import SignalScopeTerms from './pages/legal/SignalScopeTerms';

// Context & Modals
import { WaitlistProvider } from './context/WaitlistContext';
import WaitlistModal from './components/WaitlistModal';

// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
// Scroll to top on route change
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
// MAIN APP - Router Shell
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
const App = () => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Determine if current page is "dark" for particle theming
  const isDarkPage = location.pathname.startsWith('/plugins') ||
                     location.pathname.startsWith('/software') ||
                     location.pathname.startsWith('/games') ||
                     location.pathname.startsWith('/docs') ||
                     location.pathname.includes('privacy') ||
                     location.pathname.includes('terms') ||
                     location.pathname.includes('licenses') ||
                     location.pathname.startsWith('/blog');

  // Hide particles on docs-style pages
  const showParticles = !location.pathname.startsWith('/docs') &&
                        !location.pathname.includes('privacy') &&
                        !location.pathname.includes('terms') &&
                        !location.pathname.includes('licenses') &&
                        !location.pathname.startsWith('/blog') &&
                        !location.pathname.startsWith('/games/spoch');

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  };
  const closeSearch = () => { setSearchOpen(false); };

  return (
    <WaitlistProvider>
      <div className="min-h-screen font-space text-white bg-[#07060F]">
        {/* Full-page particles - not on docs/legal pages */}
        {showParticles && <FullPageParticles isDark={isDarkPage} />}
        <div className="relative" style={{ zIndex: 2 }}>
          <ScrollToTop />
          <Navbar searchOpen={searchOpen} openSearch={openSearch} />
          <SearchOverlay searchOpen={searchOpen} closeSearch={closeSearch} />
          <main>
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/plugins" element={<Plugins />} />
              <Route path="/plugins/voice-generator" element={<AdobeVoice />} />
              <Route path="/software/signalscope" element={<AEOTracker />} />
              <Route path="/games/spoch" element={<Spoch />} />

              {/* Redirects */}
              <Route path="/voice-generator" element={<Navigate to="/plugins/voice-generator" replace />} />
              <Route path="/signalscope" element={<Navigate to="/software/signalscope" replace />} />
              <Route path="/spoch" element={<Navigate to="/games/spoch" replace />} />
              
              {/* Blog */}
              <Route path="/blog" element={<BlogTemplate />} />
              <Route path="/blog/:slug" element={<BlogTemplate />} />
              
              {/* Docs Hub */}
              <Route path="/docs" element={<DocsHub />} />
              <Route path="/docs/plugins/voice-generator" element={<DocsVoice />} />
              <Route path="/docs/games/spoch" element={<DocsSpoch />} />
              <Route path="/docs/software/signalscope" element={<DocsSignalScope />} />

              {/* Global Legal */}
              <Route path="/privacy" element={<HomePrivacy />} />
              <Route path="/terms" element={<HomeTerms />} />
              
              {/* Product Legal */}
              <Route path="/plugins/voice-generator/privacy" element={<VoicePrivacy />} />
              <Route path="/plugins/voice-generator/terms" element={<VoiceTerms />} />
              <Route path="/plugins/voice-generator/licenses" element={<VoiceLicenses />} />
              <Route path="/software/signalscope/privacy" element={<SignalScopePrivacy />} />
              <Route path="/software/signalscope/terms" element={<SignalScopeTerms />} />
              <Route path="/games/spoch/privacy" element={<SpochPrivacy />} />
              <Route path="/games/spoch/terms" element={<SpochTerms />} />
            </Routes>
          </main>
        </div>
        <WaitlistModal />
      </div>
    </WaitlistProvider>
  );
};

export default App;