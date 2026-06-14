const SpeedStreaks = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
    {[...Array(6)].map((_, i) => (
      <div key={i} className="speed-streak absolute" style={{
        top: `${15 + i * 14}%`,
        left: 0, right: 0,
        animationDelay: `${i * 0.8}s`,
        animationDuration: `${3 + i * 0.5}s`,
        opacity: 0.3 + (i % 3) * 0.1,
      }} />
    ))}
  </div>
);

export default SpeedStreaks;
