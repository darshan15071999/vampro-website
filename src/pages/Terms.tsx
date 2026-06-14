const Terms = () => {
  return (
    <div className="dark-grid-bg min-h-screen pt-28">
      <div className="w-full px-6 md:px-10 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[2rem] p-6 md:p-12 border-indigo-900/30" style={{ background: 'rgba(15,22,64,0.35)' }}>
            <div className="text-slate-300">
              <div id="terms" className="scroll-mt-40">
                <h1 className="text-3xl font-extrabold text-white mb-3">Terms of Use</h1>
                <p className="text-slate-500 text-sm mb-8">Last Updated: June 2026</p>
                {[['1. License Grant', 'Limited, non-exclusive, non-transferable, revocable license to install and use the Software.'],
                ['2. Permitted Use', 'Generate voiceovers for personal and commercial projects including educational, entertainment, and business content.'],
                ['3. Restrictions', 'Do not reverse engineer, decompile, redistribute, sublicense, or circumvent security mechanisms.'],
                ['4. User Responsibility', 'You are responsible for generated content, compliance with laws, and appropriate rights/permissions.'],
                ['5. Generated Content', 'Ownership remains with user, subject to laws and third-party rights.'],
                ['6. Software Updates', 'Updates may be provided. Some may be required for compatibility.'],
                ['7. Third-Party Software', 'Open-source components are subject to their respective licenses.'],
                ['8. Disclaimer', 'THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.'],
                ['9. Limitation of Liability', 'NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES.'],
                ['10. Termination', 'Terms remain effective until terminated. Violations may result in access suspension.'],
                ['11. Intellectual Property', 'Software, branding, and logos remain property of Vampro.'],
                ['12. Governing Law', 'Governed by laws in the jurisdiction of the Software publisher.'],
                ].map(([t, b]) => (<div key={t} className="mb-6"><h3 className="text-sm font-bold text-white mb-1">{t}</h3><p className="text-slate-400 text-sm leading-relaxed">{b}</p></div>))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;