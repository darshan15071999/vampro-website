import { type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export const DocSection = ({ id, title, accent = 'text-white', children }: { id: string; title: string; accent?: string; children: ReactNode }) => (
  <div id={id} className="mb-12 border-b border-indigo-900/30 pb-12 scroll-mt-40">
    <h2 className={`text-xl md:text-2xl font-extrabold ${accent} mb-6 flex items-center gap-2`}>
      <div className="w-1 h-5 bg-[#3B3BFF] rounded-full" />{title}
    </h2>
    <div className="space-y-4">{children}</div>
  </div>
);

export const DocH3 = ({ children, blue = false }: { children: ReactNode; blue?: boolean }) => (
  <h3 className={`text-sm font-bold mt-5 mb-2 ${blue ? 'text-indigo-400' : 'text-white'}`}>{children}</h3>
);

export const DocList = ({ items }: { items: string[] }) => (
  <ul className="space-y-1.5">
    {items.map(item => (<li key={item} className="flex items-center gap-2 text-slate-400 text-sm"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0" />{item}</li>))}
  </ul>
);

// Re-export ChevronDown for docs page convenience
export { ChevronDown };
