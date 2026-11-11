import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

/**
 * Serves root-level static assets (/tabuada-assets/* and /*.pdf) from repoRoot
 * during local `vite dev` / `vite preview`, matching production Vercel root paths.
 */
function serveRootAssetsPlugin() {
  const mimeTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
  };

  const handler = (req, res, next) => {
    const cleanUrl = (req.url || '').split('?')[0];
    const isAsset =
      cleanUrl.startsWith('/tabuada-assets/') ||
      cleanUrl.startsWith('/assets/') ||
      cleanUrl.endsWith('.pdf');

    if (!isAsset) return next();

    const relPath = cleanUrl.replace(/^\/+/, '');
    const targetPath = path.resolve(repoRoot, relPath);
    if (!targetPath.startsWith(repoRoot)) return next();

    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
      const ext = path.extname(targetPath).toLowerCase();
      res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
      fs.createReadStream(targetPath).pipe(res);
      return;
    }
    next();
  };

  return {
    name: 'serve-root-tabuada-assets',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig({
  plugins: [react(), serveRootAssetsPlugin()],
  base: '/app-dist/',
  build: {
    outDir: path.resolve(repoRoot, 'app-dist'),
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    port: 5173,
    open: false,
  },
});
