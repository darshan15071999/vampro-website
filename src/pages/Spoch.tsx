import React, { useEffect, useState } from 'react';
import './Spoch.css';

const Spoch = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clickedElements, setClickedElements] = useState<Record<number, boolean>>({});

  useEffect(() => {
    document.title = 'SPOCH - 15 Min Playable Demo';
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    setMousePos({ x, y });
  };

  const handlePixelClick = (id: number) => {
    setClickedElements(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setClickedElements(prev => ({ ...prev, [id]: false }));
    }, 500);
  };

  return (
    <div className="spoch-container">
      {/* Hero Section */}
      <section className="spoch-hero" onMouseMove={handleMouseMove}>
        {/* Interactive background elements */}
        <div className="holo-grid" style={{ transform: `perspective(600px) rotateX(70deg) translate(${-mousePos.x * 2}px, ${-mousePos.y * 2}px)` }}></div>
        <div className="time-portal" style={{ transform: `translate(calc(-50% + ${mousePos.x * 1.5}px), calc(-50% + ${mousePos.y * 1.5}px))` }}></div>

        <div className="floating-data stream-1" style={{ transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` }}>1011001</div>
        <div className="floating-data stream-2" style={{ transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)` }}>TIME ENGINE: INIT</div>
        <div className="floating-data stream-3" style={{ transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)` }}>DESTINATION: STONE AGE</div>

        {/* Space objects */}
        <div className="satellite" style={{ transform: `translate(${mousePos.x * 3}px, ${mousePos.y * 3}px)` }}></div>
        <div className="asteroid ast-1" style={{ transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -3}px)` }}></div>
        <div className="asteroid ast-2" style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}></div>

        <div className="flying-car car-1"></div>
        <div className="flying-car car-2"></div>
        <div className="rocket"></div>

        <div className="spoch-logo-wrapper" style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}>
          <img src="/spoch/logo.png" alt="SPOCH Logo" className="spoch-logo" />
        </div>

        <h2 className="spoch-subtitle" style={{ transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)` }}>A Semi-3D Open World Adventure</h2>

        <button className="spoch-btn" onClick={() => window.open('https://game.vampro.in/', '_blank')} style={{ transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)` }}>
          Play 15 Min Demo
        </button>
      </section>

      {/* Story Section: Automated Perfection */}
      <section className="spoch-section">
        <h2 className="spoch-section-title">The Year is 2962 AD</h2>

        <div className="spoch-grid">
          <div className="spoch-text-box">
            <h3>Automated Perfection. Human Boredom.</h3>
            <p>
              Dr. Aran is a brilliant scientist living in an era where advanced AI has automated the entire world.
              There is nothing left for humans to do. Driven by a desperate need to experience real human life,
              struggle, and triumph, he builds a revolutionary Time Simulator.
            </p>
            <p>
              His plan: Journey back through every human era, experiencing the visceral, raw reality of our ancestors.
            </p>
            {/* Interactive 8-bit element */}
            <div
              className={`interactive-pixel-bot ${clickedElements[1] ? 'jump' : ''}`}
              onClick={() => handlePixelClick(1)}
              title="Click to interact with Assistant Bot"
            ></div>
          </div>

          <div className="image-blend-container interactive-container">
            <img src="/spoch/dr-aran.png" alt="Dr. Aran in 2962 AD" className="blended-image" />
            <div className="scanline-overlay"></div>
          </div>
        </div>
      </section>

      {/* The Eras Section */}
      <section className="spoch-section eras-section">
        <h2 className="spoch-section-title">Journey Through Time</h2>
        <p className="eras-intro">
          Dr. Aran's simulator is designed to plunge him through the pinnacles of human history. Can you survive them all?
        </p>

        <div className="eras-timeline">
          {[
            { title: "The Stone Age", desc: "Primitive tools, wild beasts, and the raw struggle for survival against the elements.", img: "stone-age.jpg" },
            { title: "Era of Kings", desc: "Swords, shields, the birth of empires, and political treachery.", img: "kings.jpg" },
            { title: "Industrial Revolution", desc: "Smoke, gears, steam-powered mechanics, and the birth of the modern machine.", img: "industrial.jpg" },
            { title: "World Wars", desc: "Trenches, tactics, espionage, and global conflict on a massive scale.", img: "wars.jpg" },
            { title: "Dot-Com Bubble", desc: "Dial-up modems, early web, floppy disks, and financial chaos.", img: "dotcom.jpg" },
            { title: "The 2010s", desc: "Smartphones, viral social media, crypto rushes, and information overload.", img: "2010s.jpg" }
          ].map((era, index) => (
            <div key={index} className="era-card">
              {/* Provision to add images: just ensure the images exist in public/spoch/ */}
              <div className="era-image-bg" style={{ backgroundImage: `url('/spoch/${era.img}')` }}></div>

              <div className="era-number">0{index + 1}</div>
              <h4>{era.title}</h4>
              <p>{era.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Glitch & The Demo Section */}
      <section className="spoch-section">
        <h2 className="spoch-section-title">A Catastrophic Error</h2>

        <div className="spoch-grid reversed">
          <div className="spoch-text-box">
            <h3>Stranded in the Past</h3>
            <p>
              During the initialization process, a massive system error occurs. The simulation becomes reality,
              and Dr. Aran is violently transported to the actual Stone Age.
            </p>
            <p>
              He must now survive each era organically, relying on his wits, primitive tools, and sheer will to progress
              forward in time and eventually return to his own timeline.
            </p>
            <p style={{ color: '#00ffcc', fontWeight: 'bold', marginTop: '1rem' }}>
              The Current 15-Minute Demo covers his arrival and survival through Level 1: The Stone Age.
            </p>
            {/* Interactive 8-bit element */}
            <div
              className={`interactive-pixel-fire ${clickedElements[2] ? 'jump' : ''}`}
              onClick={() => handlePixelClick(2)}
              title="Click to stoke the fire!"
            ></div>
          </div>

          {/* Video Provision with 8-bit filter */}
          <div className="video-container interactive-container pixel-filter-wrapper">
            {/* Provision for Video: simply add a video file to public/spoch/glitch-video.mp4 */}
            <video className="pixel-video" src="/spoch/glitch-video.mp4" autoPlay loop muted playsInline poster="/spoch/dr-aran.png" />
            <div className="scanline-overlay"></div>
            <div className="pixelate-overlay"></div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="spoch-footer-cta">
        <h2>Ready to Survive?</h2>
        <button className="spoch-btn" onClick={() => window.open('https://game.vampro.in/', '_blank')}>
          Start Level 1
        </button>
      </section>
    </div>
  );
};

export default Spoch;
