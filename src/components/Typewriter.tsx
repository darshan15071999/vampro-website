import { useState, useEffect } from 'react';

const Typewriter = ({ texts, className = '' }: { texts: string[]; className?: string }) => {
  const [displayed, setDisplayed] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (waiting) { const t = setTimeout(() => setWaiting(false), 1600); return () => clearTimeout(t); }
    const current = texts[textIdx];
    if (!deleting) {
      if (charIdx < current.length) { const t = setTimeout(() => setCharIdx(c => c + 1), 50); return () => clearTimeout(t); }
      else { const t = setTimeout(() => setDeleting(true), 2000); return () => clearTimeout(t); }
    } else {
      if (charIdx > 0) { const t = setTimeout(() => setCharIdx(c => c - 1), 25); return () => clearTimeout(t); }
      else { setDeleting(false); setWaiting(true); setTextIdx(i => (i + 1) % texts.length); }
    }
  }, [charIdx, deleting, textIdx, texts, waiting]);

  useEffect(() => { setDisplayed(texts[textIdx].slice(0, charIdx)); }, [charIdx, textIdx, texts]);

  return <span className={className}>{displayed}<span className="typewriter-cursor" /></span>;
};

export default Typewriter;
