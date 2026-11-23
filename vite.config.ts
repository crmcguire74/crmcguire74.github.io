import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import { getAllStaticRoutes } from './src/ssg/generate';

function collectMpaInputs(): Record<string, string> {
  const inputs: Record<string, string> = {
    main: path.resolve(__dirname, 'index.html'),
    notFound: path.resolve(__dirname, '404.html'),
  };

  for (const route of getAllStaticRoutes()) {
    if (route.outFile === 'index.html') continue;
    const key = route.outFile.replace(/\/index\.html$/, '').replace(/[^a-zA-Z0-9]+/g, '_');
    inputs[key] = path.resolve(__dirname, route.outFile);
  }

  return inputs;
}

function staticCleanUrlMiddleware(baseDir: string): Plugin {
  return {
    name: 'static-clean-url-mpa',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url || '/';
        const [pathname, search] = rawUrl.split('?');
        if (
          !pathname ||
          pathname.startsWith('/@') ||
          pathname.startsWith('/src/') ||
          pathname.startsWith('/node_modules/') ||
          pathname.startsWith('/assets/') ||
          pathname.startsWith('/images/') ||
          pathname === '/favicon.ico'
        ) {
          return next();
        }

        const ext = path.extname(pathname);
        if (ext && ext !== '.html') {
          return next();
        }

        if (pathname === '/' || pathname === '/index.html') {
          req.url = '/index.html' + (search ? `?${search}` : '');
          return next();
        }

        const trimmed = pathname.replace(/^\/+|\/+$/g, '');
        const candidateHtml = path.join(baseDir, trimmed, 'index.html');
        if (fs.existsSync(candidateHtml)) {
          req.url = `/${trimmed}/index.html` + (search ? `?${search}` : '');
          return next();
        }

        const directHtml = path.join(baseDir, `${trimmed}.html`);
        if (fs.existsSync(directHtml)) {
          req.url = `/${trimmed}.html` + (search ? `?${search}` : '');
          return next();
        }

        // Serve custom static 404.html with 404 status for unmatched routes
        const notFoundFile = path.join(baseDir, '404.html');
        if (fs.existsSync(notFoundFile)) {
          const html = fs.readFileSync(notFoundFile, 'utf8');
          server
            .transformIndexHtml(rawUrl, html)
            .then((transformed) => {
              res.statusCode = 404;
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(transformed);
            })
            .catch(next);
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    appType: 'mpa' as const,
    plugins: [tailwindcss(), staticCleanUrlMiddleware(__dirname)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: collectMpaInputs(),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
