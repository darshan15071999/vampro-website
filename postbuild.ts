import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import puppeteer from 'puppeteer';
import { allRoutesMetadata } from './src/seo/metadata';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(process.cwd(), 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found! Run build first.');
  process.exit(1);
}

async function runPrerender() {
  console.log('Starting local server for prerendering...');
  const app = express();
  app.use(express.static(distDir));
  
  // Fallback to index.html for SPA routing
  app.use((req, res) => {
    res.sendFile(indexPath);
  });

  const server = app.listen(0, async () => {
    const port = (server.address() as any).port;
    console.log(`Local server listening on port ${port}`);

    console.log('Launching Puppeteer...');
    const browser = await puppeteer.launch({ headless: true });
    
    try {
      for (const route of allRoutesMetadata) {
        console.log(`Prerendering route: ${route.path}`);
        
        const page = await browser.newPage();
        
        // Optional: Block non-essential external requests to speed up rendering
        await page.setRequestInterception(true);
        page.on('request', (req) => {
          const url = req.url();
          // Block analytics scripts, can add more if needed
          if (url.includes('google-analytics.com') || url.includes('clarity.ms')) {
            req.abort();
          } else {
            req.continue();
          }
        });

        // Wait until there are no more than 0 network connections for at least 500 ms.
        // This ensures the React app has fully hydrated and rendered, and Helmet has injected SEO tags.
        await page.goto(`http://localhost:${port}${route.path}`, { 
          waitUntil: 'networkidle0', 
          timeout: 60000 
        });
        
        // Brief delay to ensure any immediate useEffect state updates or initial animations settle
        await new Promise(r => setTimeout(r, 1000));
        
        // Extract the fully rendered HTML
        let html = await page.evaluate(() => document.documentElement.outerHTML);
        
        // Add DOCTYPE because outerHTML omits it
        html = '<!DOCTYPE html>\n' + html;

        // Save generated HTML to dist directory
        if (route.path === '/') {
          fs.writeFileSync(indexPath, html);
          console.log('  -> Updated root index.html');
        } else {
          const routeName = route.path.substring(1);
          
          // Generate file.html (e.g. plugins.html)
          const htmlFilePath = path.join(distDir, `${routeName}.html`);
          const htmlFileDir = path.dirname(htmlFilePath);
          if (!fs.existsSync(htmlFileDir)) {
            fs.mkdirSync(htmlFileDir, { recursive: true });
          }
          fs.writeFileSync(htmlFilePath, html);
          
          // Generate folder/index.html (e.g. plugins/index.html)
          const routeDir = path.join(distDir, routeName);
          if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
          }
          fs.writeFileSync(path.join(routeDir, 'index.html'), html);
          
          console.log(`  -> Generated static HTML for ${route.path}`);
        }
        
        await page.close();
      }
    } catch (err) {
      console.error('Error during prerendering:', err);
    } finally {
      await browser.close();
      server.close();
      console.log('SEO Prerendering complete!');
    }
  });
}

runPrerender();
