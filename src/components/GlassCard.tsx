const GlassCard = ({
  blur = 5,
  borderRadius = 30,
  borderOpacity = 0.4,
  backgroundColor = "#000000",
  backgroundOpacity = 0,
  color = "#ffffff",
  onHoverScale = 1,
  className = "",
  children,
}: any) => {
  return (
    <div
      className={`relative overflow-hidden transition-transform duration-300 ${className}`}
      style={{
        borderRadius: borderRadius,
        border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
        background: backgroundColor === 'transparent' ? 'transparent' : (backgroundOpacity > 0 ? backgroundColor : `rgba(255,255,255, 0.03)`),
        backdropFilter: `blur(${blur * 2}px)`,
        WebkitBackdropFilter: `blur(${blur * 2}px)`,
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        color: color,
        transform: `scale(${onHoverScale})`
      }}
      onMouseEnter={(e) => {
        if (onHoverScale !== 1) e.currentTarget.style.transform = `scale(${onHoverScale + 0.02})`;
      }}
      onMouseLeave={(e) => {
        if (onHoverScale !== 1) e.currentTarget.style.transform = `scale(${onHoverScale})`;
      }}
    >
      {children}
    </div>
  );
};

export default GlassCard;
