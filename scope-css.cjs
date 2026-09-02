const fs = require('fs');

let css = fs.readFileSync('vampro-universal-paste-landing/styles.css', 'utf-8');

// We will wrap everything inside .universal-paste-page manually via regex.
// Wait, an easier way is to just write a simple parsing logic, but since it's just a one-off:
const lines = css.split('\n');
let out = [];
let inRoot = false;
let inMediaQuery = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  if (line.startsWith(':root {')) {
    out.push(line);
    inRoot = true;
    continue;
  }
  if (inRoot && line.startsWith('}')) {
    out.push(line);
    inRoot = false;
    continue;
  }
  if (inRoot) {
    out.push(line);
    continue;
  }
  
  if (line.startsWith('@media')) {
    out.push(line);
    inMediaQuery = true;
    continue;
  }
  if (inMediaQuery && line.startsWith('}')) {
    out.push(line);
    inMediaQuery = false;
    continue;
  }
  
  // Selectors
  if (line.match(/^[a-zA-Z0-9\.\#]/) && line.includes('{')) {
    // It's a selector line
    let selectors = line.split('{')[0].split(',');
    let newSelectors = selectors.map(s => {
      s = s.trim();
      if (s === 'body') return '.universal-paste-page';
      if (s === 'body::before') return '.universal-paste-page::before';
      if (s === 'body > *') return '.universal-paste-page > *';
      return '.universal-paste-page ' + s;
    });
    out.push(newSelectors.join(', ') + ' {');
  } else if (line.match(/^[a-zA-Z0-9\.\#]/) && line.endsWith(',')) {
     // Multi-line selector
     let s = line.replace(',', '').trim();
     if (s === 'body') out.push('.universal-paste-page,');
     else out.push('.universal-paste-page ' + s + ',');
  } else {
    out.push(line);
  }
}

fs.writeFileSync('src/pages/UniversalPaste.css', out.join('\n'));
console.log('Done');
