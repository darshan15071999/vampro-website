import React from 'react';

const ScatterText = ({ text, className = '' }: { text: string, className?: string }) => {
  return (
    <span className={`inline-flex ${className}`}>
      {text.split('').map((c, i) => {
        if (c === ' ') return <span key={i} className="w-1.5">&nbsp;</span>;
        const tx = `${(Math.random() - 0.5) * 100}px`;
        const ty = `${(Math.random() - 0.5) * 60}px`;
        const rot = `${(Math.random() - 0.5) * 360}deg`;
        const delay = `${Math.random() * 1.5}s`;
        return (
          <span
            key={i}
            className="scatter-char"
            style={{ '--tx': tx, '--ty': ty, '--rot': rot, animationDelay: delay } as React.CSSProperties}
          >
            {c}
          </span>
        );
      })}
    </span>
  );
};

export default ScatterText;
