import { type MouseEvent as RMouseEvent } from 'react';
import { DocSection, DocH3, DocList } from '../components/DocHelpers';
import SEO from '../components/SEO';
import HomeFooter from '../components/HomeFooter';
import { docsUniversalPasteMetadata } from '../seo/metadata';

const DocsUniversalPaste = () => {
  const scrollToDocSection = (e: RMouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 120; window.scrollTo({ top: y, behavior: 'smooth' }); }
  };

  const navItems = [
    { id: 'intro', label: 'Introduction' },
    { id: 'setup', label: 'Setup' },
    { id: 'clipboard', label: 'Clipboard Workflow' },
    { id: 'capture', label: 'Capture Workflow' },
    { id: 'video', label: 'Video Import' },
    { id: 'assets', label: 'Asset Organization' }
  ];

  return (
    <div className="dark-grid-bg min-h-screen flex flex-col pt-28">
      <SEO {...docsUniversalPasteMetadata} />
      <div className="flex-grow w-full px-6 md:px-10 lg:px-16 flex flex-col md:flex-row gap-10 py-8 items-start">
        {/* Sidebar */}
        <aside className="md:w-56 lg:w-64 sticky top-32 hidden md:block max-h-[calc(100vh-160px)] overflow-y-auto docs-sidebar pr-4 flex-shrink-0">
          <h3 className="font-bold text-slate-400 mb-5 tracking-widest uppercase text-xs border-b border-indigo-900/30 pb-3">Knowledge Base</h3>
          <ul className="space-y-0.5 text-sm">
            {navItems.map(item => (
              <li key={item.id}><a href={`#${item.id}`} onClick={e => scrollToDocSection(e as any, item.id)} className="block px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-indigo-900/30 transition-all font-medium">{item.label}</a></li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="glass-card rounded-[2rem] p-6 md:p-12 border-indigo-900/30" style={{ background: 'rgba(15,22,64,0.35)' }}>
            <div className="text-slate-300">

              <div id="intro" className="mb-12 border-b border-indigo-900/30 pb-12 scroll-mt-40">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">Documentation</h1>
                <p className="gradient-blue-text font-semibold text-base">Vampro Universal Paste</p>
                <p className="text-slate-400 mt-5 leading-relaxed">Use the UXP plugin inside Adobe Premiere Pro and the local companion app for clipboard, capture, URL, and media workflows.</p>
              </div>

              <DocSection id="setup" title="Setup">
                {[['1. Install the companion', 'Install and run Vampro Universal Paste Companion once. After first run, the companion registers itself as a background startup app so it is available when Premiere Pro opens.'], ['2. Load the UXP plugin', 'Install or load the Premiere Pro UXP plugin. When the panel opens, it connects to the local companion on the configured local port.'], ['3. Confirm connection', 'The top status bar should show that the companion is connected. If not, start the companion and use the reconnect control.'], ['4. Choose a workflow', 'Use Clipboard for copied media, Capture for screenshots and screen recordings, Video for supported video URLs, or Replace for replacing selected project media.']].map(([t, b]) => (
                  <div key={t} className="mb-6">
                    <DocH3 blue>{t}</DocH3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{b}</p>
                  </div>
                ))}
              </DocSection>

              <DocSection id="clipboard" title="Clipboard Workflow">
                <DocList items={[
                  'Copy an image, GIF, file, text, or supported media URL.',
                  'Open the Clipboard tab in Vampro Universal Paste.',
                  'Preview detected content.',
                  'Choose Paste to Timeline or Import to Bin.',
                  'Use Clear when you want to reset the current pipeline before another paste.'
                ]} />
              </DocSection>

              <DocSection id="capture" title="Capture Workflow">
                <DocH3>Screenshot</DocH3>
                <DocList items={[
                  'Open the Capture tab and choose Screenshot or Screen Record.',
                  'Select entire display or a specific app window/source.',
                  'Choose full source or snip region.',
                  'For another window, follow the prompt, switch manually, then use the capture or recording overlay.'
                ]} />
                <DocH3>Screen Recording</DocH3>
                <DocList items={[
                  'Select the target and whether sound should be recorded.',
                  'Follow the switch prompt when recording another window.',
                  'Use the recorder overlay for countdown, pause, and stop controls.',
                  'Preview the recording before importing it into Premiere Pro.'
                ]} />
              </DocSection>

              <DocSection id="video" title="Video Import">
                <DocList items={[
                  'Paste a supported video URL.',
                  'Let the companion inspect the URL.',
                  'Use the Best Quality option for video with audio.',
                  'Import the downloaded asset into the project folder/bin.'
                ]} />
              </DocSection>

              <DocSection id="assets" title="Asset Organization">
                <p className="text-slate-400 text-sm mb-6">Captured and imported assets are saved into discoverable project folders so editors can locate media outside the panel after insertion.</p>
                
                <div className="glass-card rounded-xl p-5 border-yellow-500/30 bg-yellow-500/5 mt-6">
                  <h3 className="text-sm font-bold text-yellow-500 mb-2 flex items-center gap-2">
                    Important Disclosure
                  </h3>
                  <p className="text-yellow-200/80 text-sm leading-relaxed">
                    Respect copyright, platform terms, and workplace capture rules when downloading, recording, or pasting third-party content.
                  </p>
                </div>
              </DocSection>

            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default DocsUniversalPaste;
