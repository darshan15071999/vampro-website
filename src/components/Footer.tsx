import { useNavigate } from 'react-router-dom';
import SpeedStreaks from './SpeedStreaks';

const Footer = () => {
  const nav = useNavigate();

  const navigate = (path: string, sectionId?: string) => {
    nav(path);
    if (sectionId) {
      setTimeout(() => { const el = document.getElementById(sectionId); if (el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 100; window.scrollTo({ top: y, behavior: 'smooth' }); } }, 100);
    } else { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };

  return (
    <footer className="dark-grid-bg text-slate-400 py-16 border-t border-indigo-900/30 relative overflow-hidden">
      <SpeedStreaks />
      <div className="w-full px-6 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <img src="/header.png" alt="Vampro" className="h-10 w-10 rounded-xl border border-indigo-800/50" />
            <span className="font-bank-gothic text-2xl tracking-widest gradient-blue-text">VAMPRO</span>
          </div>
          <p className="text-slate-500 mb-4 max-w-md leading-relaxed text-sm">A creative lab exploring the space between creativity and technology.</p>
          <div className="f1-stripe w-40 mb-4" />
        </div>
        <div>
          <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">Navigation</h4>
          <ul className="space-y-2.5 text-sm">
            {[['About Us', () => navigate('/', 'about')], ['Services', () => navigate('/', 'services')], ['Plugins', () => navigate('/plugins/adobe-voice')], ['Documentation', () => navigate('/docs')]].map(([label, fn]) => (
              <li key={label as string}><button onClick={fn as () => void} className="hover:text-indigo-400 transition-colors">{label as string}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">Legal</h4>
          <ul className="space-y-2.5 text-sm">
            {[['Terms of Use', '/terms'], ['Privacy Policy', '/privacy']].map(([label, path]) => (
              <li key={label}><button onClick={() => navigate(path)} className="hover:text-indigo-400 transition-colors">{label}</button></li>
            ))}
            <li><a href="mailto:support@vampro.in" className="hover:text-indigo-400 transition-colors">Contact Support</a></li>
          </ul>
        </div>
      </div>
      <div className="w-full px-6 md:px-10 lg:px-16 mt-10 pt-6 border-t border-indigo-900/20 text-xs text-slate-600 flex flex-col md:flex-row justify-between items-center relative z-10">
        <p>© {new Date().getFullYear()} Vampro. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Built by Darshan · Creative Lab</p>
      </div>
    </footer>
  );
};

export default Footer;
