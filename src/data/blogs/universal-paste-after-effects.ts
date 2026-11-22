import type { BlogPost } from './types';

const assets = '/assets/blog/universal-paste-after-effects';

function figure(file: string, width: number, height: number, alt: string, caption: string) {
  return `<figure>
    <img src="${assets}/${file}" width="${width}" height="${height}" loading="lazy" decoding="async" alt="${alt}" />
    <figcaption>${caption}</figcaption>
  </figure>`;
}

export const universal_paste_after_effects: BlogPost = {
  slug: 'universal-paste-after-effects',
  title: 'How to Paste Images, GIFs, and Screen Captures into After Effects',
  summary: 'Use Vampro Universal Paste to bring clipboard media, screen recordings, and video links into a composition, then swap footage when your design changes.',
  author: 'Darshan',
  authorImage: '/author.jpg',
  date: 'November 22, 2026',
  readingTime: '5 min read',
  category: 'Workflow',
  product: 'Universal Paste',
  image: `${assets}/blog-banner.jpg`,
  overview: `
    <p>Say you're building a product demo in After Effects. You need a screenshot for the first shot, an animated reference for a transition, and a temporary product image while the final render is on its way. Each asset normally starts another round of saving, finding, and importing files.</p>
    <p>Vampro Universal Paste puts those steps inside one panel. The Windows companion prepares the media, and After Effects imports it into the Project panel or adds it as a layer at the playhead. Later, you can swap the source of an animated layer when the final asset arrives.</p>
  `,
  content: `
    <h2 id="get-set-up">Open Universal Paste in After Effects</h2>
    <p>Start with After Effects 25 through 27 on 64-bit Windows 10 or 11 and <a href="https://apps.microsoft.com/detail/9ntsjd556ctb">Vampro Universal Paste Companion</a> v1.1.0 or newer. If you already use the companion with Premiere Pro, keep using that installation. It serves both apps.</p>
    <ol>
      <li>Install the After Effects edition and launch the companion.</li>
      <li>Open <strong>Window → Extensions → Vampro Universal Paste</strong> and check for <strong>Companion Connected</strong>.</li>
      <li>Save your <code>.aep</code> project. Open a composition and place the playhead where you want the new layer to begin.</li>
    </ol>
    <p>The companion saves imported media under <code>Assets</code> beside the project. In the After Effects Project panel, look for the matching <strong>Assets</strong> folder and its media subfolders.</p>

    <h2 id="clipboard">Paste an image or animated GIF</h2>
    <p>In your browser, use <strong>Copy image</strong> on a reference you want to use. Switch to the <strong>Clipboard</strong> tab and check the preview. You can also paste a supported image, GIF, or video URL into the <strong>Source</strong> field.</p>
    ${figure('01-clipboard.png', 1360, 800, 'The Clipboard tab inside After Effects showing a copied Universal Paste comic cover and a connected companion.', 'The Clipboard tab previews a copied image before you import it.')}
    <p>For a still image, choose a duration and how it should fit the composition. <strong>Fill Frame</strong> covers the frame and may crop the edges. <strong>Original Size</strong> keeps the source scale. Select <strong>Paste to Composition</strong> to place the layer at the playhead, or <strong>Import to Project</strong> to save the footage for later.</p>
    ${figure('01b-clipboard-options.jpg', 960, 284, 'Composition Duration and Composition Fit controls above the Paste to Composition and Import to Project buttons.', 'Set the still-image duration and fit before choosing where it goes.')}
    <p>When Universal Paste receives the animated GIF or a supported GIF URL, the companion converts it to an MP4 so it plays as motion in After Effects. If the browser copies a single still frame, paste the original GIF URL or copy the GIF file. For a still-image cutout, choose <strong>Remove Background</strong>, preview the transparent PNG, and import or paste it. <strong>Use Original</strong> switches back to the source image.</p>

    <h2 id="capture">Grab a screenshot or record your screen</h2>
    <p>Open <strong>Capture → Screenshot</strong>. Choose <strong>Entire Display</strong> or <strong>App Window</strong>, then capture the full source or use <strong>Snip Region</strong>. When the panel prompts you to switch windows, go to the selected window yourself. For a snip, draw the region when the snipping tool appears.</p>
    ${figure('02-screenshot-controls.jpg', 960, 485, 'The Screenshot controls with a sample app window selected, showing Capture After Switch and Snip Region.', 'Screenshot controls for a selected app window.')}
    <p>For motion, choose <strong>Screen Record</strong>. Set your target, select <strong>Full Source</strong> or <strong>Snip Region</strong>, and pick <strong>With Sound</strong> or <strong>Muted</strong>. Start the recording workflow, switch to the target when prompted, and choose a region if you selected a snip. The recorder shows a three-second countdown and provides pause and stop controls. <strong>With Sound</strong> uses Windows system audio.</p>
    ${figure('03-recording-controls.jpg', 960, 610, 'The Screen Record tab with a sample app window, Snip Region, and With Sound selected.', 'Set the recording target, area, and audio before starting.')}
    <p>When the capture preview is ready, choose <strong>Insert into Composition</strong> or <strong>Import to Project</strong>. Use <strong>Clear</strong> to reset the panel before starting the next capture.</p>

    <h2 id="video">Bring in a video from a link</h2>
    <p>Paste a supported link into <strong>Video</strong> and click <strong>Fetch</strong>. Review the thumbnail and any available details, such as duration and resolution. <strong>Download and Insert</strong> adds the video to the active composition. <strong>Download to Project</strong> imports it as footage. The companion requests the best available supported version with audio. Online sources require an internet connection and depend on what the source site makes available.</p>
    ${figure('04-video-preview.jpg', 960, 741, 'Video tab with an example URL, a thumbnail and metadata, and two download buttons.', 'A sample video preview showing both import destinations.')}

    <h2 id="replace">Swap footage after you’ve animated it</h2>
    <p>When the final asset arrives, select an unlocked footage layer in the composition and open <strong>Replace</strong>. Confirm the target, then choose <strong>Clipboard</strong> or <strong>URL</strong> for the new source. Review the preview and choose <strong>Replace Layer</strong>.</p>
    ${figure('05-replace-layer.jpg', 960, 1119, 'Replace tab showing a selected MP4 layer, a clipboard PNG as the replacement, and the Replace Layer button.', 'The target and replacement previews let you check the swap before applying it.')}
    <p>The replacement can go from image to video or video to image. The same layer retains its effects and keyframes. Leave <strong>Auto-fit replacement to composition frame</strong> unchecked when you want to keep the current scale. If you select a footage item in the Project panel instead, replacing it updates the layers that reference it.</p>
    <p>Try it on a rough comp. Paste a still at the playhead, animate it, then replace it with your final media. The layer and its animation are already there, and both source files are easy to find in the project’s asset folders.</p>
  `,
  toc: [
    { id: 'get-set-up', title: 'Open Universal Paste in After Effects' },
    { id: 'clipboard', title: 'Paste an image or animated GIF' },
    { id: 'capture', title: 'Grab a screenshot or record your screen' },
    { id: 'video', title: 'Bring in a video from a link' },
    { id: 'replace', title: 'Swap footage after you’ve animated it' },
  ],
};
