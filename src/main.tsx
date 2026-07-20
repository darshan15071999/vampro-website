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

const prerenderMeta = document.querySelector('meta[name="prerender-route"]');
const expectedRoute = prerenderMeta ? prerenderMeta.getAttribute('content') : null;
const currentPath = window.location.pathname;

const isMatch = expectedRoute === currentPath || 
                expectedRoute === currentPath + '/' || 
                expectedRoute + '/' === currentPath;

if (rootElement.hasChildNodes() && isMatch) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  if (rootElement.hasChildNodes()) {
    rootElement.innerHTML = '';
  }
  ReactDOM.createRoot(rootElement).render(app);
}