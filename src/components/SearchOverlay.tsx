import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, FileText, ArrowRight, Bot, X } from 'lucide-react';

// ─────────────────────────────────────────────
// DOCS AI KNOWLEDGE BASE
// ─────────────────────────────────────────────
export const docsKB = [
  { keywords: ['install', 'installation', 'setup', 'how to install', 'set up'], section: 'installation', title: 'Installation Guide', answer: 'To install: **Step 1** — Get the extension from Adobe Exchange and restart Premiere Pro. **Step 2** — Run `Vampro Voice Generator Installer.exe` to set up the voice service. **Step 3** — Open Premiere Pro → **Window → Extensions → Vampro Voice Generator Text-to-Speech**.' },
  { keywords: ['requirement', 'system', 'windows', 'compatible', 'premiere version', 'minimum'], section: 'requirements', title: 'System Requirements', answer: 'Requires **Windows 10/11 (64-bit)**, **Adobe Premiere Pro 26.0+**, active internet. Minimum: **i5 / Ryzen 5**, **8 GB RAM**, **5 GB disk**. Recommended: i7/Ryzen 7, 16 GB RAM, SSD.' },
  { keywords: ['voice', 'voices', 'select voice', 'choose voice'], section: 'controls', title: 'Voice Selection', answer: 'Multiple AI voice profiles with different speaking styles. Select the one that matches your content tone from the voice list in the plugin panel.' },
  { keywords: ['speed', 'pitch', 'tone', 'preset', 'control', 'adjust'], section: 'controls', title: 'Voice Controls', answer: '**Speed**: 0.8x slow, 1.0x normal, 1.2x fast. **Pitch**: negative = deeper, positive = higher. **Tone Presets**: Professional, Documentary, Voiceover, Dynamic, Casual, Serious, Comedic.' },
  { keywords: ['error', 'not working', 'fail', 'connection', 'problem', 'fix', 'troubleshoot'], section: 'troubleshooting', title: 'Troubleshooting', answer: 'Check `http://127.0.0.1:8000/health` — should return `{"status": "ok"}`. If not running, restart Windows. Check firewall isn\'t blocking localhost. Ensure Premiere Pro version is 26.0+.' },
  { keywords: ['free', 'price', 'cost', 'paid', 'subscription'], section: 'faq', title: 'Pricing', answer: '**Completely free** at v1.1.0. No subscription or hidden costs.' },
  { keywords: ['mac', 'macos', 'apple'], section: 'faq', title: 'macOS Support', answer: 'Currently **Windows only**. macOS support is planned for a future release.' },
  { keywords: ['internet', 'offline', 'network', 'cloud'], section: 'faq', title: 'Internet Requirement', answer: '**Active internet required** for voice generation (cloud-based AI). The service itself runs locally after installation.' },
  { keywords: ['background', 'startup', 'auto', 'automatic'], section: 'faq', title: 'Background Service', answer: 'The service starts **automatically after login** and runs silently. No manual launch needed.' },
  { keywords: ['commercial', 'rights', 'license', 'distribute'], section: 'terms', title: 'Commercial Use', answer: 'Generated audio can be used for personal and commercial projects. Users are responsible for compliance with applicable laws and platform policies.' },
  { keywords: ['quick start', 'first voiceover', 'getting started', 'how to use', 'generate'], section: 'quick-start', title: 'Quick Start', answer: '**1.** Open the extension. **2.** Enter your script. **3.** Select a voice. **4.** Choose a Tone (optional). **5.** Click **Generate Voice**. Audio appears in Premiere Pro.' },
  { keywords: ['antivirus', 'blocked', 'warning', 'defender'], section: 'troubleshooting', title: 'Antivirus Warning', answer: 'Use the **latest official release** from Vampro. The installer is clean — antivirus warnings are false positives.' },
  { keywords: ['version', 'update', 'release', 'changelog', '1.1'], section: 'releases', title: 'Release Notes — v1.1.0', answer: '**New:** Improved installer, auto-startup, hidden service, enhanced integration, better stability. **Fixes:** Connection failures, startup reliability, installation workflow.' },
  { keywords: ['privacy', 'data', 'collect', 'tracking'], section: 'privacy', title: 'Privacy Policy', answer: 'Voice generation is processed **locally**. We don\'t sell personal info. Limited technical data (version, OS, error logs) may be collected for support.' },
  { keywords: ['support', 'contact', 'help', 'email', 'bug'], section: 'faq', title: 'Support', answer: 'Contact **support@vampro.in** for help, bug reports, and feature requests.' },
  { keywords: ['feature', 'features', 'what can', 'capabilities'], section: 'features', title: 'Key Features', answer: 'AI voiceovers inside Premiere Pro, multiple voice profiles, adjustable speed/pitch, 7 tone presets, local processing, auto-startup, fast workflow integration.' },
];

export function searchDocs(query: string) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return docsKB.filter(item => item.keywords.some(kw => q.includes(kw) || kw.includes(q.split(' ')[0]))).slice(0, 5);
}

export function getChatResponse(query: string): string {
  const q = query.toLowerCase();
  const m = docsKB.filter(item => item.keywords.some(kw => q.includes(kw)));
  if (m.length > 0) return m[0].answer;
  if (q.includes('hello') || q.includes('hi')) return 'Hello! Ask me anything about Vampro Voice Generator — installation, voices, troubleshooting, pricing, and more!';
  if (q.includes('thank')) return 'You\'re welcome! Let me know if you need anything else.';
  return 'I don\'t have a specific answer for that. Try asking about **installation**, **voice controls**, **troubleshooting**, or **pricing**. Or contact **support@vampro.in**.';
}

// Render markdown-ish bold and code
export const renderMd = (text: string) => {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className="bg-indigo-900/50 text-indigo-200 px-1.5 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
    return part;
  });
};

// ─────────────────────────────────────────────
// SEARCH OVERLAY
// ─────────────────────────────────────────────
interface SearchOverlayProps {
  searchOpen: boolean;
  closeSearch: () => void;
}

const SearchOverlay = ({ searchOpen, closeSearch }: SearchOverlayProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const localInputRef = useRef<HTMLInputElement>(null);
  const [localResults, setLocalResults] = useState<typeof docsKB>([]);
  const [localChatMode, setLocalChatMode] = useState(false);
  const [localChatResponse, setLocalChatResponse] = useState('');
  const [localChatLoading, setLocalChatLoading] = useState(false);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => localInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const handleInputChange = (val: string) => {
    if (val.trim().length > 1) {
      setLocalResults(searchDocs(val));
    } else {
      setLocalResults([]);
    }
    setLocalChatMode(false);
    setLocalChatResponse('');
  };

  const handleAskAI = () => {
    const q = localInputRef.current?.value || '';
    if (!q.trim()) return;
    setLocalChatMode(true);
    setLocalChatLoading(true);
    setLocalChatResponse('');
    setTimeout(() => {
      setLocalChatResponse(getChatResponse(q));
      setLocalChatLoading(false);
    }, 600 + Math.random() * 400);
  };

  const handleClose = () => {
    closeSearch();
    setLocalResults([]);
    setLocalChatMode(false);
    setLocalChatResponse('');
  };

  if (!searchOpen) return null;
  return (
    <div className="search-overlay" onClick={e => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className="search-panel animate-fade-up">
        {/* Search input — uncontrolled to prevent focus loss */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-indigo-900/30">
          <Search size={18} className="text-indigo-400 flex-shrink-0" />
          <input
            ref={localInputRef}
            type="text"
            defaultValue=""
            onChange={e => handleInputChange(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleAskAI(); if (e.key === 'Escape') handleClose(); }}
            placeholder="Search docs or ask a question…"
            className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-lg"
            autoFocus
          />
          <button onClick={handleAskAI} className="flex items-center gap-1.5 px-4 py-2 bg-[#3B3BFF] hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all">
            <Bot size={13} /> Ask AI
          </button>
          <button onClick={handleClose} className="text-slate-500 hover:text-white transition-colors ml-1">
            <X size={18} />
          </button>
        </div>

        {/* Chat response */}
        {localChatLoading && (
          <div className="px-6 py-5 flex items-center gap-3 border-b border-indigo-900/30">
            <Bot size={16} className="text-indigo-400" />
            <div className="flex gap-1.5">{[0, 1, 2].map(d => <div key={d} className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />)}</div>
          </div>
        )}
        {localChatResponse && !localChatLoading && (
          <div className="px-6 py-5 border-b border-indigo-900/30 animate-fade-up">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 bg-[#3B3BFF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"><Bot size={13} className="text-white" /></div>
              <div className="text-slate-300 text-sm leading-relaxed">{renderMd(localChatResponse)}</div>
            </div>
          </div>
        )}

        {/* Search results */}
        {!localChatMode && localResults.length > 0 && (
          <div className="max-h-80 overflow-y-auto">
            {localResults.map((r, i) => (
              <button key={i} onClick={() => { handleClose(); if (location.pathname !== '/docs') navigate('/docs'); setTimeout(() => { const el = document.getElementById(r.section); if (el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 120; window.scrollTo({ top: y, behavior: 'smooth' }); } }, 150); }} className="w-full text-left px-6 py-4 hover:bg-indigo-900/30 transition-colors border-b border-indigo-900/20 last:border-0 flex items-center gap-4">
                <div className="w-8 h-8 bg-indigo-900/40 rounded-lg flex items-center justify-center flex-shrink-0"><FileText size={14} className="text-indigo-300" /></div>
                <div>
                  <div className="text-white font-semibold text-sm">{r.title}</div>
                  <div className="text-slate-500 text-xs mt-0.5 truncate max-w-md">{r.answer.replace(/\*\*/g, '').slice(0, 90)}…</div>
                </div>
                <ArrowRight size={14} className="text-slate-600 ml-auto flex-shrink-0" />
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!localChatMode && localResults.length === 0 && (
          <div className="px-6 py-8 text-center">
            <p className="text-slate-500 text-sm">Type a keyword to search, or press <strong className="text-indigo-400">Ask AI</strong> for a summarized answer.</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['install', 'troubleshoot', 'voices', 'pricing', 'requirements'].map(q => (
                <button key={q} onClick={() => { if (localInputRef.current) { localInputRef.current.value = q; handleInputChange(q); } }} className="text-xs text-indigo-400 border border-indigo-800/40 px-3 py-1.5 rounded-full hover:bg-indigo-900/30 transition-all">{q}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
