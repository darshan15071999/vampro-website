//property or Vamprojects, Inc. All rights reserved.

import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchOverlay from './components/SearchOverlay';
import FullPageParticles from './components/FullPageParticles';

// Pages
import Home from './pages/Home';
import Plugins from './pages/Plugins';
import AdobeVoice from './pages/AdobeVoice';
import Docs from './pages/Docs';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// ─────────────────────────────────────────────
// Scroll to top on route change
// ─────────────────────────────────────────────
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

// ─────────────────────────────────────────────
// MAIN APP — Router Shell
// ─────────────────────────────────────────────
const App = () => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Determine if current page is "dark" for particle theming
  const isDarkPage = location.pathname.startsWith('/plugins') ||
                     location.pathname.startsWith('/docs') ||
                     location.pathname === '/privacy' ||
                     location.pathname === '/terms';

  // Hide particles on docs-style pages
  const showParticles = !location.pathname.startsWith('/docs') &&
                        location.pathname !== '/privacy' &&
                        location.pathname !== '/terms';

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  };
  const closeSearch = () => { setSearchOpen(false); };

  return (
    <div className="min-h-screen font-space text-white bg-[#07060F]">
      {/* Full-page particles — not on docs/legal pages */}
      {showParticles && <FullPageParticles isDark={isDarkPage} />}
      <div className="relative" style={{ zIndex: 2 }}>
        <ScrollToTop />
        <Navbar searchOpen={searchOpen} openSearch={openSearch} />
        <SearchOverlay searchOpen={searchOpen} closeSearch={closeSearch} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plugins" element={<Plugins />} />
            <Route path="/plugins/adobe-voice" element={<AdobeVoice />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;