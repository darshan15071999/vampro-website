import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    server: {
      proxy: {
        '/api/chat': {
          target: 'https://integrate.api.nvidia.com',
          changeOrigin: true,
          rewrite: (_path) => '/v1/chat/completions',
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, _req, _res) => {
              proxyReq.setHeader('Authorization', `Bearer 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`);
            });
          }
        }
      }
    },
    preview: {
      proxy: {
        '/api/chat': {
          target: 'https://integrate.api.nvidia.com',
          changeOrigin: true,
          rewrite: (_path) => '/v1/chat/completions',
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, _req, _res) => {
              proxyReq.setHeader('Authorization', `Bearer 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`);
            });
          }
        }
      }
    }
})