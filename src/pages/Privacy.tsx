const Privacy = () => {
  return (
    <div className="dark-grid-bg min-h-screen pt-28">
      <div className="w-full px-6 md:px-10 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[2rem] p-6 md:p-12 border-indigo-900/30" style={{ background: 'rgba(15,22,64,0.35)' }}>
            <div className="text-slate-300">
              <div id="privacy" className="scroll-mt-40">
                <h1 className="text-3xl font-extrabold text-white mb-3">Privacy Policy</h1>
                <p className="text-slate-500 text-sm mb-8">Last Updated: June 2026</p>
                {[['1. Information We Collect', 'Text for voice generation, voice settings, project metadata, support requests. Technical: software version, OS, error logs, installation status.'],
                ['2. Voice Generation', 'Uses a local AI service on your computer. Requests are processed locally. Files stored locally.'],
                ['3. Data Storage', 'Generated audio, voice settings, and metadata stored locally on your device.'],
                ['4. Use of Information', 'To generate voice content, operate/improve software, diagnose issues, provide support, and maintain security.'],
                ['5. Data Sharing', 'We do not sell or rent personal information. Disclosure only when required by law.'],
                ['6. Third-Party Components', 'Includes open-source components (Kokoro, PyTorch, FastAPI, spaCy) governed by their licenses.'],
                ['7. Security', 'Reasonable measures implemented. No method is completely secure.'],
                ['8. Children\'s Privacy', 'Not intended for children under 13.'],
                ['9. International Users', 'Users responsible for compliance with local laws.'],
                ['10. Changes', 'Policy may be updated. New versions published on official website.'],
                ].map(([t, b]) => (<div key={t} className="mb-6"><h3 className="text-sm font-bold text-white mb-1">{t}</h3><p className="text-slate-400 text-sm leading-relaxed">{b}</p></div>))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;