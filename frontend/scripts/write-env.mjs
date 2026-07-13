import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const target = join(__dirname, '..', 'src', 'assets', 'env.js');
const apiOrigin = (process.env.API_ORIGIN || 'http://localhost:8080').replace(/\/$/, '');

mkdirSync(dirname(target), { recursive: true });
writeFileSync(
  target,
  `window.__ATHLETIX_CONFIG__ = {\n  API_ORIGIN: '${apiOrigin}'\n};\n`
);
