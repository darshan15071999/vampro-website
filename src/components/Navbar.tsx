import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { PlayCircle, Menu, X, Search, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScatterText from './ScatterText';
import { useTheme } from '../context/ThemeContext';

const MotionLink = motion(Link as any);

interface NavbarProps {
  searchOpen: boolean;
  openSearch: () => void;
}

const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.5 }
  })
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } }
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.04 * i, duration: 0.3 }
  })
};

const Navbar = ({ openSearch }: NavbarProps) => {
  const location = useLocation();
  const nav = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Light chrome when the theme is light; the blog is light in either theme
  const isLight = theme === 'light' || location.pathname.startsWith('/blog');
  const isDocsPage = location.pathname.startsWith('/docs') || location.pathname === '/privacy' || location.pathname === '/terms';

  const navigate = (path: string, sectionId?: string) => {
    setIsMobileMenuOpen(false);
    nav(path);
    if (sectionId) {
      setTimeout(() => {
        if (path === '/') {
          window.dispatchEvent(new CustomEvent('nav-to-section', { detail: sectionId }));
        } else {
          const el = document.getElementById(sectionId);
          if (el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 100; window.scrollTo({ top: y, behavior: 'smooth' }); }
        }
      }, 100);
    } else { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };

  const desktopNavItems = [
    { label: 'About', href: '/', sectionId: 'about' },
    { label: 'Services', href: '/', sectionId: 'services' },
    { label: 'Plugins', href: '/plugins/voice-generator' },
    { label: 'Blog', href: '/blog' },
    { label: 'Docs', href: '/docs/plugins/voice-generator' },
    { label: 'YouTube', href: 'https://youtube.com/@vamprotech?si=vponnTvHyIzwDmON', external: true, icon: <PlayCircle size={13} /> },
  ];

  const mobileNavItems = desktopNavItems;

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-400 ${
      isHomePage
        ? 'bg-transparent border-b border-transparent'
        : isLight
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-[#07060F]/50 backdrop-blur-md border-b border-white/10 shadow-sm'
      }`}>
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="flex justify-between items-center h-16 md:h-24">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <img src="/header.png" alt="Vampro Logo" className="h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl shadow-md object-cover border border-slate-200/20 group-hover:scale-105 transition-transform duration-300" />
            <span className={`text-xl md:text-3xl tracking-[0.12em] transition-colors duration-400 ${scrolled
              ? (isLight ? 'text-[#07060F]' : 'text-white')
              : (isLight ? 'text-[#07060F]' : 'text-white')
              }`} style={{ fontWeight: 700 }}>
              <ScatterText text="VAMPRO" />
            </span>
            <span className={`hidden md:inline-flex items-center justify-center text-[11px] leading-normal uppercase tracking-[0.3em] font-semibold px-3.5 py-1.5 rounded-full transition-all duration-400 animate-scatter-capsule ${scrolled
              ? (isLight ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-indigo-900/30 text-indigo-300 border border-indigo-700/30')
              : (isLight ? 'bg-indigo-100/70 text-indigo-700 border border-indigo-200/60' : 'bg-white/5 text-indigo-300 border border-indigo-500/20')
              }`}>
              <ScatterText text="Creative Lab" />
            </span>
          </div>

          {/* Desktop nav links — tablet gets the mobile menu (six links don't fit) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10 lg:translate-x-5">
            {isHomePage && (
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`p-2 rounded-full border transition-colors ${isLight ? 'border-slate-300 text-slate-600 hover:bg-slate-100' : 'border-white/20 text-slate-300 hover:bg-white/10'}`}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}
            {desktopNavItems.map((item, i) => {
              const Element = item.external ? motion.a : MotionLink;
              return (
                <Element
                  key={item.label}
                  custom={i}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  {...(item.external 
                    ? { href: item.href, target: "_blank", rel: "noreferrer" } 
                    : { 
                        to: item.href, 
                        onClick: (e: React.MouseEvent) => { 
                          e.preventDefault(); 
                          navigate(item.href, item.sectionId); 
                        } 
                      }
                  )}
                  className={`text-base font-medium transition-colors duration-400 hover:text-[#2b5be3] flex items-center gap-1.5 ${scrolled
                    ? (isLight ? 'text-slate-700' : 'text-slate-300')
                    : (isLight ? 'text-slate-700' : 'text-slate-200')
                    }`}
                >
                  {item.label} {item.icon}
                </Element>
              );
            })}

            {/* Search bar — docs page */}
            {isDocsPage && (
              <button onClick={openSearch} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:bg-indigo-500/20 ${scrolled ? (isLight ? 'text-slate-500 border border-slate-200 bg-slate-50' : 'text-indigo-300 border border-indigo-700/30 bg-indigo-950/30') : (isLight ? 'text-slate-400 border border-slate-200/60 bg-white/60' : 'text-indigo-400 border border-indigo-500/20 bg-white/5')
                }`}>
                <Search size={14} />
                <span className="text-xs font-medium">Search docs…</span>
                <span className="text-[10px] opacity-50 ml-2 hidden lg:inline border border-current/30 rounded px-1">⌘K</span>
              </button>
            )}


          </div>

          {/* Mobile + tablet */}
          <div className="lg:hidden flex items-center gap-3">
            {isHomePage && (
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`p-2 rounded-full border transition-colors ${isLight ? 'border-slate-300 text-slate-600' : 'border-white/20 text-slate-300'}`}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            {isDocsPage && (
              <button onClick={openSearch} className="text-slate-400 p-2"><Search size={20} /></button>
            )}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`p-2 ${isLight && !scrolled ? 'text-[#07060F]' : scrolled && isLight ? 'text-[#07060F]' : 'text-white'}`}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`lg:hidden pb-4 pt-2 px-4 space-y-1 absolute w-full shadow-xl overflow-hidden ${isLight ? 'bg-white/95 backdrop-blur-xl' : 'bg-[#07060F]/95 backdrop-blur-xl border-t border-indigo-900/20'}`}
          >
            {mobileNavItems.map((item, i) => {
              const Element = item.external ? motion.a : MotionLink;
              return (
                <Element
                  key={item.label}
                  custom={i}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                  {...(item.external 
                    ? { href: item.href, target: "_blank", rel: "noreferrer" } 
                    : { 
                        to: item.href, 
                        onClick: (e: React.MouseEvent) => { 
                          e.preventDefault(); 
                          navigate(item.href, item.sectionId); 
                        } 
                      }
                  )}
                  className={`block w-full text-left px-4 py-3 font-medium rounded-xl transition-colors ${isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-indigo-900/20'}`}
                >
                  {item.label}
                </Element>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
