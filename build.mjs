import {readFileSync,writeFileSync,existsSync,mkdirSync,cpSync,copyFileSync,rmSync} from 'node:fs';
import {resolve,dirname,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=dirname(fileURLToPath(import.meta.url));
const files=['index.html','style.css','features.css','creative.css','portfolio.css','portfolio-data.js','script.js','case-render.js','case.js'];
for(const file of files.filter(f=>f.endsWith('.js')))new vm.Script(readFileSync(resolve(root,file),'utf8'),{filename:file});
const context=vm.createContext({});
vm.runInContext(readFileSync(resolve(root,'portfolio-data.js'),'utf8')+'\n'+readFileSync(resolve(root,'case-render.js'),'utf8')+'\nglobalThis.catalog={projects,src,projectHref,renderCase,caseCopy,escapeHTML};',context);
const {projects,src,renderCase,caseCopy,escapeHTML:e}=context.catalog;
if(projects.length>6)throw new Error('Keep the graphic-design selection to six projects or fewer.');
if(new Set(projects.map(p=>p.key)).size!==projects.length)throw new Error('Project keys must be unique.');
for(const p of projects){
 if(!/^[a-z0-9-]+$/.test(p.key))throw new Error('Invalid project key');
 for(const file of p.files)if(!existsSync(resolve(root,decodeURIComponent(src(file)))))throw new Error(`Missing artwork: ${file}`);
 for(const field of ['summary','role','challenge','idea','system','steps','result'])for(const lang of ['en','kk'])if(!p[field]?.[lang]?.length)throw new Error(`Missing ${lang} ${field} for ${p.key}`);
 if(p.live&&!p.live.startsWith('https://'))throw new Error('Live projects require HTTPS');
}
const homeSource=readFileSync(resolve(root,'index.html'),'utf8');
// Generate real static detail pages, also available to the source preview server.
const head=homeSource.slice(homeSource.indexOf('<head>')+6,homeSource.indexOf('</head>'));
for(const p of projects){
 const pageHead=head.replace(/<title>.*?<\/title>/,`<title>${e(p.title)} — Akbope Bakytkeldy</title>`).replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${e(p.summary.en)}" />`);
 const html=`<!doctype html><html lang="en"><head><base href="../../">${pageHead}</head><body class="case-page" data-project="${p.key}"><a class="skip-link" href="${p.key?`projects/${p.key}/#case-main`:''}">${caseCopy.en.skip}</a><header class="topbar"><a class="logo" href="index.html">Ақбөпе<br>Бақыткелді<span>®</span></a><nav class="case-nav" aria-label="Project navigation"><a href="index.html#contact">${caseCopy.en.talk}</a><button class="language-toggle" aria-label="Қазақ тіліне ауысу" type="button">EN / ҚАЗ</button></nav></header><main id="case-main">${renderCase(p,'en')}</main><footer><p>© 2026 Ақбөпе Бақыткелді</p><p>${caseCopy.en.footer}</p><a href="public/akbope-bakytkeldy-cv.pdf" download>${caseCopy.en.cv}</a></footer><script src="portfolio-data.js"></script><script src="case-render.js"></script><script src="case.js"></script></body></html>`;
 mkdirSync(resolve(root,'projects',p.key),{recursive:true});writeFileSync(resolve(root,'projects',p.key,'index.html'),html);
}
function checkLinks(html,location){
 const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
 for(const [,url]of html.matchAll(/(?:src|href)="([^"]+)"/g)){
  if(/^(https?:|mailto:|data:)/.test(url)||url==='../../')continue;
  if(url.startsWith('#')){if(!ids.has(url.slice(1)))throw new Error(`${location}: missing anchor ${url}`);continue;}
  const [path,hash]=decodeURIComponent(url).split('#');const absolute=resolve(root,path);
  if(!existsSync(absolute))throw new Error(`${location}: missing asset ${url}`);
  if(hash){const target=readFileSync(path.endsWith('/')?resolve(absolute,'index.html'):absolute,'utf8');if(!target.includes(`id="${hash}"`))throw new Error(`${location}: missing target ${url}`);}
 }
}
checkLinks(homeSource,'Homepage');for(const p of projects)checkLinks(readFileSync(resolve(root,'projects',p.key,'index.html'),'utf8'),p.key);
// All generated output is disposable; start clean to exclude stale assets/routes.
rmSync(resolve(root,'dist'),{recursive:true,force:true});mkdirSync(resolve(root,'dist'));
for(const file of files)copyFileSync(resolve(root,file),resolve(root,'dist',file));
cpSync(resolve(root,'public'),resolve(root,'dist/public'),{recursive:true,filter:path=>!(extname(path)==='.png'&&existsSync(path.replace(/\.png$/,'.webp')))});
for(const p of projects)cpSync(resolve(root,'projects',p.key),resolve(root,'dist/projects',p.key),{recursive:true});
console.log(`Build complete: ${projects.length} static case studies, both languages, all assets, local links and JavaScript syntax verified.`);
