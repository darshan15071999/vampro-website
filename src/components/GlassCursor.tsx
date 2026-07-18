import { useEffect, useState } from 'react';

const GlassCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      const target = e.target as HTMLElement;
      const computedStyle = window.getComputedStyle(target);
      const isClickable = 
        computedStyle.cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button';
        
      setIsPointer(isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: `translate(${position.x - 30}px, ${position.y - 30}px) scale(${isPointer ? 1.5 : 1})`,
        transition: 'transform 0.15s ease-out',
        zIndex: 9999,
        backdropFilter: 'saturate(1.2) contrast(1.1)',
        WebkitBackdropFilter: 'saturate(1.2) contrast(1.1)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)',
        background: 'rgba(255, 255, 255, 0.02)'
      }}
    />
  );
};

export default GlassCursor;
