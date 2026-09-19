const grid = document.querySelector('.project-grid');
let currentLanguage = 'en';
try { currentLanguage = localStorage.getItem('portfolio-language') === 'kk' ? 'kk' : 'en'; } catch {}
let currentFilter = 'all';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const copy = {
 en: {
  heroLabel:'Graphic designer / Portfolio 2026', heroTitle:'Visuals with<br><em>flavour</em><br>&amp; feeling.<span class="hero-asterisk" aria-hidden="true">✳</span>', heroText:'Graphic designer creating bold identities, campaigns, posters and editorial work with a point of view.',
  available:'Available for freelance & part-time · Astana, Kazakhstan · Remote', topAvailable:'available for projects & opportunities', workCTA:'View my work <span>↓</span>', talk:'Let’s work together ↗',
  workHeading:'Selected work,<br><em>full of character.</em>', workText:'Selected identities, campaigns, posters and editorial design. Five projects, different points of view.',
  nav:['Work','About','Services'], filters:['all','brand','campaign','experimental'], shuffle:'shuffle my work ↻', menu:'Menu', closeMenu:'Close',
  aboutTag:'( a little bit about me )', aboutCopy:'I turn <span>“what if?”</span> into visuals that make you look twice.', aboutText:'I’m Ақбөпе, an Astana-based graphic designer and Software Engineering student at Astana IT University. I create visual identities, campaigns, posters and editorial work through expressive typography, unexpected colour and playful composition.',
  capabilities:['IDENTITY','CAMPAIGNS'], capabilityText:['Visual identity · Typography · Colour systems','Art direction · Posters · Editorial · Social content'],
  servicesTag:'( what i can do )', servicesNote:'From first concept to final artwork', servicesTitle:'Good ideas.<br><em>Made real.</em>', serviceHeads:['Brand & identity','Campaign & content','Editorial & posters'], serviceText:['Visual identities · Logo systems · Typography & colour · Packaging','Campaign concepts · Posters · Social media · Digital ads','Editorial systems · Posters · Typography · Print graphics'], extra:'Something else in mind? Let’s talk ↗',
  buildTitle:'Beyond the<br><em>Figma file.</em>', buildText:'I create the visual direction, design the digital experience and turn it into a responsive, working website — with AI-assisted development.',
  moodTag:'( my design ingredients )', moodNote:'made for looking twice', moodTitle:'Colour, type<br>&amp; a little <em>chaos.</em>', moodLabels:['01 / colour energy','02 / type mood','03 / design soundtrack'],
  contactTag:'( have a project? )', contactTitle:'Let’s make<br>something <em>fun.</em>', contactAvailable:'Available for freelance projects, part-time roles & creative collaborations.<br>Astana, Kazakhstan · Remote', brief:'Send a tiny brief ↓', send:'Open brief in Telegram ↗', fields:['what are we making?','mood / colour / references','when do you need it?'], cv:'Download CV ↓',
  footer:'Designed by me — with colour & curiosity ✳', back:'back to top ↑', view:'View case study', live:'View live', skip:'Skip to selected work', shown:'Showing', found:'Now looking at', concept:'Concept project', self:'Self-initiated project',
 },
 kk: {
  heroLabel:'Графикалық дизайнер / Портфолио 2026', heroTitle:'Дәмі бар.<br><em>Сезімі бар.</em><br>Дизайн.', heroText:'Мінезі бар батыл айдентика, кампания, постер және редакциялық дизайн жасаймын.',
  available:'Фриланс пен жартылай жұмысқа ашықпын · Астана, Қазақстан · Қашықтан', topAvailable:'жобалар мен ұсыныстарға ашықпын', workCTA:'Жұмыстарды көру <span>↓</span>', talk:'Бірге жұмыс істейік ↗',
  workHeading:'Мінезі бар<br><em>жұмыстар.</em>', workText:'Таңдалған айдентика, кампания, постер және редакциялық дизайн. Бес жоба, әртүрлі көзқарас.',
  nav:['Жұмыстар','Мен туралы','Қызметтер'], filters:['барлығы','бренд','кампания','эксперимент'], shuffle:'кездейсоқ жұмыс ↻', menu:'Мәзір', closeMenu:'Жабу',
  aboutTag:'( мен туралы қысқаша )', aboutCopy:'Мен <span>“ал егер?”</span> деген ойды көз тоқтататын визуалға айналдырамын.', aboutText:'Мен — Ақбөпе, Астанадағы графикалық дизайнер және Astana IT University университетінің Software Engineering студентімін. Мәнерлі типография, күтпеген түс және еркін композиция арқылы айдентика, кампания, постер және редакциялық дизайн жасаймын.',
  capabilities:['АЙДЕНТИКА','КАМПАНИЯЛАР'], capabilityText:['Визуал айдентика · Типография · Түс жүйелері','Арт-дирекшн · Постерлер · Редакциялық дизайн · Әлеуметтік желі'],
  servicesTag:'( не жасай аламын )', servicesNote:'Алғашқы идеядан дайын визуалға дейін', servicesTitle:'Жақсы идея.<br><em>Нақты нәтиже.</em>', serviceHeads:['Бренд және айдентика','Кампания және контент','Редакциялық дизайн және постер'], serviceText:['Визуал айдентика · Логотип жүйелері · Қаріп пен түс · Қаптама','Кампания концепті · Постерлер · Әлеуметтік желі · Цифрлық жарнама','Редакциялық жүйелер · Постерлер · Типография · Баспа графикасы'], extra:'Басқа идеяңыз бар ма? Сөйлесейік ↗',
  buildTitle:'Figma-дан<br><em>әрі қарай.</em>', buildText:'Визуал бағытты анықтап, цифрлық тәжірибені жобалаймын және ЖИ көмегімен оны әр экранға бейімделетін, жұмыс істейтін сайтқа айналдырамын.',
  moodTag:'( дизайн ингредиенттерім )', moodNote:'көзді қайта тоқтату үшін', moodTitle:'Түс, қаріп<br>және сәл <em>хаос.</em>', moodLabels:['01 / түс қуаты','02 / қаріп мінезі','03 / дизайн әуендері'],
  contactTag:'( жобаңыз бар ма? )', contactTitle:'Бірге қызық<br>дүние <em>жасайық.</em>', contactAvailable:'Фриланс жобаларға, жартылай жұмысқа және шығармашылық серіктестікке ашықпын.<br>Астана, Қазақстан · Қашықтан', brief:'Қысқаша бриф жіберіңіз ↓', send:'Брифті Telegram-да ашу ↗', fields:['не жасаймыз?','көңіл-күй / түс / референстер','қашан дайын болуы керек?'], cv:'Түйіндемені жүктеу ↓',
  footer:'Дизайнын өзім жасадым — түс пен қызығушылықпен ✳', back:'жоғарыға ↑', view:'Кейсті көру', live:'Сайтты ашу', skip:'Жұмыстарға өту', shown:'Көрсетілді', found:'Таңдалған жұмыс', concept:'Концепт жоба', self:'Өз бастамаммен жасалған жоба',
 }
};
function put(selector, value, html=false) { const element=document.querySelector(selector); if(element) element[html?'innerHTML':'textContent']=value; }
function renderProjects() {
 const t=copy[currentLanguage];
 grid.innerHTML=projects.map((p,index)=>{
  const digital=p.category==='digital';
  const files=digital?[p.files[0]]:p.files.slice(0,p.key==='claude'?3:2);
  const art=files.map((file,i)=>`<img loading="lazy" decoding="async" src="${src(file)}" alt="${p.title} — ${digital ? (currentLanguage==='kk'?'сайт интерфейсі':'website interface') : i+1}" width="${digital?1440:1000}" height="${digital?1000:1333}">`).join('');
  return `<article class="project ${digital?'project-digital':''} ${files.length===1&&!digital?'single':''}" data-key="${p.key}" data-category="${p.category}"><a class="project-image" href="${projectHref(p.key)}" aria-label="${p.title} — ${t.view}"><span class="project-stage">${art}</span><span class="view">${t.view} <b aria-hidden="true">↗</b></span></a><div class="project-info"><span class="project-number">${String(index+1).padStart(2,'0')}</span><h2><a href="${projectHref(p.key)}">${p.title}</a></h2><p>${p.role[currentLanguage]}${p.year?' · '+p.year:''}</p></div><p class="project-description">${p.summary[currentLanguage]}</p><div class="project-links"><span>${p.kind==='self'?t.self:t.concept}</span>${p.live?`<a href="${p.live}" target="_blank" rel="noopener">${t.live} ↗</a>`:''}</div></article>`;
 }).join('');
 applyFilter(currentFilter,false);
}
function applyFilter(filter,announce=true){
 currentFilter=filter;
 document.querySelectorAll('[data-filter]').forEach(b=>{const active=b.dataset.filter===filter;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
 document.querySelectorAll('.project').forEach(p=>p.hidden=filter!=='all'&&p.dataset.category!==filter);
 grid.classList.toggle('is-filtered',filter!=='all');
 put('.shuffle-status',announce?`${copy[currentLanguage].shown}: ${document.querySelectorAll('.project:not([hidden])').length} / ${projects.length}`:'');
}
function applyLanguage(){
 const t=copy[currentLanguage];document.documentElement.lang=currentLanguage;
 put('.hero-label',t.heroLabel);put('.hero h1',t.heroTitle,true);put('.hero-bottom>p',t.heroText);put('.hero-availability','<i></i>'+t.available,true);put('.availability','<i></i>'+t.topAvailable,true);put('.scroll-hint',t.workCTA,true);put('.hero-contact',t.talk);put('.contact-link',currentLanguage==='kk'?'байланысу ↗':'let’s talk ↗');
 put('.work-heading h2',t.workHeading,true);put('.work-heading>p',t.workText);put('.section-head p:first-child',currentLanguage==='kk'?'( таңдамалы жұмыстар )':'( selected work )');
 document.querySelectorAll('[data-nav]').forEach((a,i)=>a.innerHTML=t.nav[i]+(i===0?` <span>${projects.length}</span>`:''));
 document.querySelectorAll('[data-filter]').forEach((b,i)=>b.textContent=t.filters[i]);put('.shuffle-button',t.shuffle);
 put('.about-tag',t.aboutTag);put('.about-copy',t.aboutCopy,true);put('.about-details>p',t.aboutText);
 document.querySelectorAll('.capabilities h3').forEach((e,i)=>e.textContent=t.capabilities[i]);document.querySelectorAll('.capabilities p').forEach((e,i)=>e.textContent=t.capabilityText[i]);
 put('.services-head p:first-child',t.servicesTag);put('.services-head p:last-child',t.servicesNote);put('.services h2',t.servicesTitle,true);
 document.querySelectorAll('.services-grid h3').forEach((e,i)=>e.textContent=t.serviceHeads[i]);document.querySelectorAll('.services-grid p').forEach((e,i)=>e.textContent=t.serviceText[i]);put('.services-extra',t.extra);
 put('.mood-head p:first-child',t.moodTag);put('.mood-head p:last-child',t.moodNote);put('.moodboard h2',t.moodTitle,true);document.querySelectorAll('.mood-card>p').forEach((e,i)=>e.textContent=t.moodLabels[i]);
 put('.contact>p:first-child',t.contactTag);put('.contact h2',t.contactTitle,true);put('.contact-availability',t.contactAvailable,true);put('.brief-form>p',t.brief);put('.brief-form button',t.send);put('.contact-cv',t.cv);
 document.querySelectorAll('.brief-form input').forEach((e,i)=>{e.placeholder=t.fields[i];e.setAttribute('aria-label',t.fields[i]);});
 put('footer p:nth-child(2)',t.footer);put('footer a',t.back);put('.skip-link',t.skip);document.querySelector('.main-nav').setAttribute('aria-label',currentLanguage==='kk'?'Негізгі навигация':'Main navigation');document.querySelector('.filters').setAttribute('aria-label',currentLanguage==='kk'?'Жоба сүзгілері':'Project filters');grid.setAttribute('aria-label',currentLanguage==='kk'?'Портфолио жобалары':'Portfolio projects');
 const toggle=document.querySelector('.language-toggle');toggle.textContent=currentLanguage==='en'?'EN / ҚАЗ':'ҚАЗ / EN';toggle.setAttribute('aria-label',currentLanguage==='en'?'Қазақ тіліне ауысу':'Switch to English');
 put('.menu-toggle',document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='true'?t.closeMenu+' −':t.menu+' +');
 put('.art-stamp',currentLanguage==='kk'?'батыл идея.<br>ерекше сезім.<span>☺</span>':'a little bold.<br>a lot of feeling.<span>☺</span>',true);put('.art-caption',currentLanguage==='kk'?'Менің әлемімнен бір үзік ↗':'A few things from my world ↗');
 put('.portrait figcaption',currentLanguage==='kk'?'Ақбөпе, экраннан тыс ✳':'akböpe, outside the screen ✳');
 put('.hero-footer',currentLanguage==='kk'?'<span>АҚБӨПЕ БАҚЫТКЕЛДІ</span><span>ҚАЗАҚСТАН, АСТАНА ↗</span><span>ТӨМЕНДЕ — ЖҰМЫСТАР ↓</span>':'<span>AKBOPE BAKYTKELDY</span><span>ASTANA, KAZAKHSTAN ↗</span><span>SCROLL FOR THE GOOD STUFF ↓</span>',true);
 document.querySelectorAll('.marquee span').forEach((e,i)=>e.textContent=(currentLanguage==='kk'?['БРЕНДИНГ','КАМПАНИЯЛАР','РЕДАКЦИЯ','ПОСТЕРЛЕР']:['BRANDING','CAMPAIGNS','EDITORIAL','POSTERS'])[i%4]);
 document.title=currentLanguage==='kk'?'Ақбөпе Бақыткелді — графикалық дизайнер':'Akbope Bakytkeldy — Graphic Designer';renderProjects();
}
document.querySelector('.language-toggle').addEventListener('click',()=>{currentLanguage=currentLanguage==='en'?'kk':'en';try{localStorage.setItem('portfolio-language',currentLanguage)}catch{}applyLanguage();});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>applyFilter(b.dataset.filter)));
document.querySelector('.shuffle-button').addEventListener('click',()=>{const visible=[...grid.querySelectorAll('.project:not([hidden])')];const chosen=visible[Math.floor(Math.random()*visible.length)];if(!chosen)return;grid.querySelectorAll('.project').forEach(p=>p.classList.remove('shuffle-hit'));chosen.classList.add('shuffle-hit');chosen.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'center'});put('.shuffle-status',`${copy[currentLanguage].found}: ${chosen.querySelector('h2').textContent}`);});
const menu=document.querySelector('.menu-toggle');
function closeMenu(restore=false){menu.setAttribute('aria-expanded','false');document.querySelector('.main-nav').classList.remove('is-open');menu.textContent=copy[currentLanguage].menu+' +';if(restore)menu.focus();}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('.main-nav').classList.toggle('is-open',open);menu.textContent=(open?copy[currentLanguage].closeMenu:copy[currentLanguage].menu)+(open?' −':' +');});
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>closeMenu()));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true')closeMenu(true)});
document.querySelector('.brief-form').addEventListener('submit',event=>{
 event.preventDefault();const data=new FormData(event.currentTarget);const project=String(data.get('project')||'').trim();if(!project){event.currentTarget.elements.project.focus();return;}
 const message=currentLanguage==='kk'?`Сәлем, Ақбөпе! Дизайн жобам бар.\n\nЖоба: ${project}\nКөңіл-күй / референс: ${data.get('mood')||'—'}\nМерзім: ${data.get('deadline')||'—'}`:`Hi Akbope! I have a design brief.\n\nProject: ${project}\nMood / reference: ${data.get('mood')||'—'}\nDeadline: ${data.get('deadline')||'—'}`;
 window.open(`https://t.me/akiboupie?text=${encodeURIComponent(message)}`,'_blank','noopener');
});
// Music stays opt-in: links open a track search and never autoplay.
document.querySelectorAll('.playlist li').forEach(li=>{const title=li.querySelector('b').textContent;const artist=li.querySelector('span').textContent;const a=document.createElement('a');a.href=`https://www.youtube.com/results?search_query=${encodeURIComponent(title+' '+artist)}`;a.target='_blank';a.rel='noopener';a.innerHTML=li.innerHTML+'<span aria-hidden="true">↗</span>';li.replaceChildren(a);});
applyLanguage();
