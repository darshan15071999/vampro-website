import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PlayCircle, Menu, X, Search } from 'lucide-react';
import ScatterText from './ScatterText';
import { useWaitlist } from '../context/WaitlistContext';

interface NavbarProps {
  searchOpen: boolean;
  openSearch: () => void;
}

const Navbar = ({ openSearch }: NavbarProps) => {
  const location = useLocation();
  const nav = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { waitlistCount } = useWaitlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isLight = location.pathname === '/';
  const isDocsPage = location.pathname.startsWith('/docs') || location.pathname === '/privacy' || location.pathname === '/terms';

  const navigate = (path: string, sectionId?: string) => {
    setIsMobileMenuOpen(false);
    nav(path);
    if (sectionId) {
      setTimeout(() => { const el = document.getElementById(sectionId); if (el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 100; window.scrollTo({ top: y, behavior: 'smooth' }); } }, 100);
    } else { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-400 ${scrolled
      ? (isLight
        ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm'
        : 'bg-[#07060F]/95 backdrop-blur-xl border-b border-indigo-900/30 shadow-lg')
      : 'bg-transparent border-b border-transparent'
      }`}>
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <img src="/header.png" alt="Vampro Logo" className="h-12 w-12 rounded-2xl shadow-md object-cover border border-slate-200/20 group-hover:scale-105 transition-transform duration-300" />
            <span className={`font-bank-gothic text-2xl tracking-[0.12em] transition-colors duration-400 ${scrolled
              ? (isLight ? 'text-[#07060F]' : 'text-white')
              : (isLight ? 'text-[#07060F]' : 'text-white')
              }`} style={{ fontWeight: 700 }}>
              <ScatterText text="VAMPRO" />
            </span>
            <span className={`hidden md:inline-block text-[10px] uppercase tracking-[0.3em] font-semibold px-3 py-1 rounded-full transition-all duration-400 animate-scatter-capsule ${scrolled
              ? (isLight ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-indigo-900/30 text-indigo-300 border border-indigo-700/30')
              : (isLight ? 'bg-indigo-100/70 text-indigo-700 border border-indigo-200/60' : 'bg-white/5 text-indigo-300 border border-indigo-500/20')
              }`}>
              <ScatterText text="Creative Lab" />
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: 'About Us', action: () => navigate('/', 'about') },
              { label: 'Services', action: () => navigate('/', 'services') },
              { label: 'Plugins', action: () => navigate('/plugins/adobe-voice') },
              { label: 'Docs', action: () => navigate('/docs') },
              { label: 'YouTube', action: () => window.open('https://youtube.com', '_blank'), icon: <PlayCircle size={13} /> },
            ].map((item) => (
              <button key={item.label} onClick={item.action} className={`text-sm font-medium transition-colors duration-400 hover:text-[#3B3BFF] flex items-center gap-1.5 ${scrolled
                ? (isLight ? 'text-slate-700' : 'text-slate-300')
                : (isLight ? 'text-slate-700' : 'text-slate-200')
                }`}>
                {item.label} {item.icon}
              </button>
            ))}

            {/* Search bar — docs page */}
            {isDocsPage && (
              <button onClick={openSearch} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:bg-indigo-500/20 ${scrolled ? (isLight ? 'text-slate-500 border border-slate-200 bg-slate-50' : 'text-indigo-300 border border-indigo-700/30 bg-indigo-950/30') : (isLight ? 'text-slate-400 border border-slate-200/60 bg-white/60' : 'text-indigo-400 border border-indigo-500/20 bg-white/5')
                }`}>
                <Search size={14} />
                <span className="text-xs font-medium">Search docs…</span>
                <span className="text-[10px] opacity-50 ml-2 hidden lg:inline border border-current/30 rounded px-1">⌘K</span>
              </button>
            )}

            {/* Waitlist Counter */}
            {waitlistCount !== null && (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-400 animate-fade-in ${scrolled ? 'border-amber-500/20 bg-amber-500/10 text-amber-500' : 'border-amber-500/30 bg-amber-500/20 text-amber-400'}`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                Waitlist: {waitlistCount}
              </div>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            {waitlistCount !== null && (
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold transition-all duration-400 animate-fade-in ${scrolled ? 'border-amber-500/20 bg-amber-500/10 text-amber-500' : 'border-amber-500/30 bg-amber-500/20 text-amber-400'}`}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                </span>
                {waitlistCount}
              </div>
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

      {isMobileMenuOpen && (
        <div className={`md:hidden pb-4 pt-2 px-4 space-y-1 absolute w-full shadow-xl ${isLight ? 'bg-white/95 backdrop-blur-xl' : 'bg-[#07060F]/95 backdrop-blur-xl border-t border-indigo-900/20'}`}>
          {['About Us', 'Services', 'Plugins', 'Docs', 'YouTube'].map(item => (
            <button key={item} onClick={() => {
              if (item === 'About Us') navigate('/', 'about');
              else if (item === 'Services') navigate('/', 'services');
              else if (item === 'Plugins') navigate('/plugins/adobe-voice');
              else if (item === 'Docs') navigate('/docs');
              else window.open('https://youtube.com', '_blank');
            }} className={`block w-full text-left px-4 py-3 font-medium rounded-xl transition-colors ${isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-indigo-900/20'}`}>
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
