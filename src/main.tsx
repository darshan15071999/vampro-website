import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from "react-helmet-async";
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')!;

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// Render cleanly over prerendered SEO HTML to avoid React 19 hydration mismatches
// from lazy-loaded routes and randomized animation styles.
ReactDOM.createRoot(rootElement).render(app);