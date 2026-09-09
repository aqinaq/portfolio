import { readFileSync, existsSync, mkdirSync, cpSync, copyFileSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = dirname(fileURLToPath(import.meta.url));
const files = ['index.html', 'style.css', 'features.css', 'creative.css', 'script.js'];
const script = readFileSync(resolve(root, 'script.js'), 'utf8');
new vm.Script(script);
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
for (const [, url] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (/^(https?:|mailto:|data:)/.test(url)) continue;
  if (url.startsWith('#')) {
    if (!ids.has(url.slice(1))) throw new Error(`Missing anchor: ${url}`);
  } else if (!existsSync(resolve(root, decodeURIComponent(url)))) {
    throw new Error(`Missing asset: ${url}`);
  }
}
// Validate every gallery asset, including files only opened inside a project.
const context = vm.createContext({
  document: { querySelector: () => ({}) },
  window: { matchMedia: () => ({ matches: false }) },
  localStorage: { getItem: () => null }
});
vm.runInContext(script.slice(0, script.indexOf('const revealObserver')) + '\nglobalThis.catalog = {projects, copy, caseStudies, src};', context);
const { projects, copy, caseStudies, src } = context.catalog;
for (const project of projects) {
  for (const file of project.files) {
    const asset = decodeURIComponent(src(file));
    if (!existsSync(resolve(root, asset))) throw new Error(`Missing gallery artwork: ${asset}`);
  }
  for (const language of ['en', 'kk']) {
    if (!project.type[language]) throw new Error(`Missing project translation: ${project.title}`);
    if (project.key && !caseStudies[project.key][language]) throw new Error(`Missing case study: ${project.key}`);
  }
}
if (Object.keys(copy.en).some(key => !(key in copy.kk))) throw new Error('Missing Kazakh translation');
mkdirSync(resolve(root, 'dist'), { recursive: true });
for (const file of files) copyFileSync(resolve(root, file), resolve(root, 'dist', file));
cpSync(resolve(root, 'public'), resolve(root, 'dist/public'), {
  recursive: true,
  filter: path => !(extname(path) === '.png' && existsSync(path.replace(/\.png$/, '.webp')))
});
console.log(`Build complete: ${projects.length} projects, ${projects.reduce((total, project) => total + project.files.length, 0)} gallery artworks, English and Kazakh content, local links and JavaScript syntax verified.`);
