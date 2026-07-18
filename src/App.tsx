//property or Vamprojects, Inc. All rights reserved.

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Layout components
import Navbar from './components/Navbar';
import SearchOverlay from './components/SearchOverlay';
import FullPageParticles from './components/FullPageParticles';

// Pages — Home stays eager (primary landing page); the rest are code-split
import Home from './pages/Home';
const AdobeVoice = lazy(() => import('./pages/AdobeVoice'));
const AEOTracker = lazy(() => import('./pages/AEOtracker'));
const Spoch = lazy(() => import('./pages/Spoch'));
const DocsVoice = lazy(() => import('./pages/DocsVoice'));
const DocsSpoch = lazy(() => import('./pages/DocsSpoch'));
const DocsSignalScope = lazy(() => import('./pages/DocsSignalScope'));

// Blogs
const BlogTemplate = lazy(() => import('./pages/BlogTemplate'));

// Legal Pages
const HomePrivacy = lazy(() => import('./pages/legal/HomePrivacy'));
const HomeTerms = lazy(() => import('./pages/legal/HomeTerms'));
const VoicePrivacy = lazy(() => import('./pages/legal/VoicePrivacy'));
const VoiceTerms = lazy(() => import('./pages/legal/VoiceTerms'));
const VoiceLicenses = lazy(() => import('./pages/legal/VoiceLicenses'));
const SpochPrivacy = lazy(() => import('./pages/legal/SpochPrivacy'));
const SpochTerms = lazy(() => import('./pages/legal/SpochTerms'));
const SignalScopePrivacy = lazy(() => import('./pages/legal/SignalScopePrivacy'));
const SignalScopeTerms = lazy(() => import('./pages/legal/SignalScopeTerms'));

// Context & Modals
import { WaitlistProvider } from './context/WaitlistContext';
import WaitlistModal from './components/WaitlistModal';
import { SignupProvider } from './context/SignupContext';
import SignupModal from './components/SignupModal';

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

// Page transition variants — opacity only. A y-transform here leaves <main> as the
// containing block for position:fixed children and breaks ScrollTrigger pinning.
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.25 } }
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
  const showParticles = location.pathname !== '/' &&
    !location.pathname.startsWith('/docs') &&
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
      <SignupProvider>
      <div className="min-h-screen font-space text-white bg-[#07060F]">
        {/* Full-page particles - not on docs/legal pages */}
        {showParticles && <FullPageParticles isDark={isDarkPage} />}
        <div className="relative" style={{ zIndex: 2 }}>
          <ScrollToTop />
          <Navbar searchOpen={searchOpen} openSearch={openSearch} />
          <SearchOverlay searchOpen={searchOpen} closeSearch={closeSearch} />
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<div className="min-h-screen" />}>
                <Routes location={location}>
                {/* Main Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/plugins" element={<Navigate to="/plugins/voice-generator" replace />} />
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
                <Route path="/docs" element={<Navigate to="/docs/plugins/voice-generator" replace />} />
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

                {/* Catch-all: unknown URLs go home instead of rendering a blank page */}
                <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </motion.main>
          </AnimatePresence>
        </div>
        <WaitlistModal />
        <SignupModal />
      </div>
      </SignupProvider>
    </WaitlistProvider>
  );
};

export default App;