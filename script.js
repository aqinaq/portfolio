const modal = document.querySelector('.gallery-modal');
const content = document.querySelector('.gallery-content');
const caseContent = document.querySelector('.case-study-content');
const modalLabel = document.querySelector('.modal-label');
const grid = document.querySelector('.project-grid');
const cursor = document.querySelector('.cursor-dot');
const languageToggle = document.querySelector('.language-toggle');

function moveCursorTo(layer) {
  if (cursor.parentElement !== layer) layer.appendChild(cursor);
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const galleries = {
  sushi: ['sushi 1.png','sushi 2.png','sushi 3.png','sushi 4.png','sushi 5.png','sushi 6.png','sushi 7.png','sushi 8.png','sushi 9.png'],
  desserts: ['desserts.png','dessert2.png','dessert3.png','dessert4.png','dessert5.png','dessert6.png','desserts7.png','dessert8.png','dessert9.png'],
  claude: ['claude 1.png','claude2.png','claude3.png','claude4.png','claude5.png','claude6.png','claude7.png','claude8.png']
};

const caseStudies = {
  sushi: {
    en: {
      kicker: 'Concept case study / Social media',
      brief: 'Build a nine-post visual world for an imaginary sushi club that feels more like an underground fashion editorial than a restaurant menu.',
      idea: 'Appetite meets attitude: deep reds, close food crops, dark surfaces and condensed type make every post feel tactile and immediate.',
      process: ['Lock the red, cream and black palette.', 'Alternate product close-ups with type-led posts.', 'Repeat shapes and spacing so nine posts read as one system.'],
      outcome: 'A connected social series with enough rhythm to feel consistent and enough variation to keep the feed alive.'
    },
    kk: {
      kicker: 'Концепт кейс / Әлеуметтік желі',
      brief: 'Ойдан шығарылған sushi club үшін мейрамхана мәзірінен гөрі underground fashion editorial сезімін беретін тоғыз посттық визуал әлем құру.',
      idea: 'Тәбет пен мінездің қоспасы: қою қызыл түс, жақын кадрлар, қара фон және жинақы қаріп әр постты сезілетіндей етеді.',
      process: ['Қызыл, крем және қара палитраны бекіту.', 'Өнім кадрларын типографикалық посттармен алмастыру.', 'Тоғыз пост бір жүйе болып оқылуы үшін пішін мен аралықты қайталау.'],
      outcome: 'Біртұтас көрінетін, бірақ әр посты жеке мінезге ие әлеуметтік желі сериясы.'
    }
  },
  desserts: {
    en: {
      kicker: 'Concept case study / Campaign',
      brief: 'Turn macarons into the heroes of a nostalgic campaign without losing the playful energy of a modern social feed.',
      idea: 'Pistachio green, cherry red and warm paper texture create a sweet retro mood; oversized serif type adds drama.',
      process: ['Choose one flavour-led colour story.', 'Treat every dessert like a magazine cover star.', 'Use scale changes to move between quiet and loud posts.'],
      outcome: 'A nine-piece campaign that can move from feed posts to menus, packaging or printed promotional cards.'
    },
    kk: {
      kicker: 'Концепт кейс / Кампания',
      brief: 'Macaron-дарды заманауи social feed энергиясын жоғалтпай, ностальгиялық кампанияның басты кейіпкеріне айналдыру.',
      idea: 'Pistachio жасылы, cherry қызылы және жылы қағаз texture-ы тәтті retro көңіл-күй береді; үлкен serif қаріп драма қосады.',
      process: ['Бір дәмге негізделген түс тарихын таңдау.', 'Әр десертті журнал мұқабасының жұлдызы сияқты көрсету.', 'Тыныш және батыл посттар арасында масштабты өзгерту.'],
      outcome: 'Feed, мәзір, қаптама немесе баспа карточкаларына бейімделетін тоғыз жұмыстық кампания.'
    }
  },
  claude: {
    en: {
      kicker: 'Concept case study / Editorial',
      brief: 'Explore how an AI topic can feel human, curious and editorial instead of looking like conventional technology advertising.',
      idea: 'Soft cream, coral and blue meet imperfect texture, conversational questions and playful modular frames.',
      process: ['Start with questions instead of product claims.', 'Build a flexible frame system around the copy.', 'Use texture to remove the cold digital feeling.'],
      outcome: 'An eight-post editorial series that introduces a complex topic through approachable visual storytelling.'
    },
    kk: {
      kicker: 'Концепт кейс / Editorial',
      brief: 'AI тақырыбын кәдімгі технология жарнамасындай емес, адамға жақын, қызық және editorial түрде көрсету.',
      idea: 'Жұмсақ крем, coral және көк түстер imperfect texture, сұрақтар және модульді рамкалармен бірігеді.',
      process: ['Өнім уәдесінен емес, сұрақтан бастау.', 'Мәтін айналасына икемді frame жүйесін құру.', 'Салқын digital сезімді texture арқылы жұмсарту.'],
      outcome: 'Күрделі тақырыпты түсінікті визуал storytelling арқылы таныстыратын сегіз посттық editorial серия.'
    }
  }
};

const projects = [
  {key:'sushi', title:'Sushi Social Club', type:{en:'Social media series',kk:'Әлеуметтік желі сериясы'}, category:'series', files:galleries.sushi, className:'project-large'},
  {key:'desserts', title:'Macaroon Club', type:{en:'Campaign series',kk:'Кампания сериясы'}, category:'series', files:galleries.desserts, className:'project-tall'},
  {key:'claude', title:'Claude Magazine', type:{en:'Editorial series',kk:'Editorial серия'}, category:'series', files:galleries.claude, className:'project-wide'},
  {title:'Weekend Blooms', type:{en:'Poster',kk:'Постер'}, category:'poster', files:['weekendblooms flyer.png'], className:'single'},
  {title:'Kök Coffee', type:{en:'Brand concept',kk:'Бренд концепті'}, category:'branding', files:['kok coffee.png'], className:'single'},
  {title:'Small Things', type:{en:'Poster',kk:'Постер'}, category:'poster', files:['smallthings.png'], className:'single'},
  {title:'Lalagül', type:{en:'Poster',kk:'Постер'}, category:'poster', files:['lalagul.png'], className:'single'},
  {title:'Pizza', type:{en:'Poster',kk:'Постер'}, category:'poster', files:['pizza.png'], className:'single'},
  {title:'Light', type:{en:'Poster',kk:'Постер'}, category:'poster', files:['light.png'], className:'single'},
  {title:'Copying', type:{en:'Poster',kk:'Постер'}, category:'poster', files:['copying.png'], className:'single'},
  {title:'Are You Bored Yet?', type:{en:'Poster',kk:'Постер'}, category:'poster', files:['are you bored yet.png'], className:'single'},
  {title:'Idea', type:{en:'Poster',kk:'Постер'}, category:'poster', files:['idea.png'], className:'single'}
];

const src = file => `public/assets/${file.replace(/\.png$/i, '.webp').split('/').map(encodeURIComponent).join('/')}`;
const label = file => file.replace(/\.[^.]+$/,'').replace(/\d+/g,'').replace(/[-_]/g,' ').trim() || 'Untitled';
let currentLanguage = 'en';
try { currentLanguage = localStorage.getItem('portfolio-language') === 'kk' ? 'kk' : 'en'; } catch {}
let currentFilter = 'all';

const copy = {
  en: {
    topNote:'graphic designer<br>based in Kazakhstan', contact:'let\'s talk <i>↗</i>', availability:'<i></i> available for freelance',
    heroLabel:'Independent graphic designer / Portfolio 2026', heroTitle:'Made to<br>make you<br><em>look.</em><span class="hero-asterisk" aria-hidden="true">✳</span>', heroText:'Visual identities, posters and social campaigns with colour, character and a point of view.', scroll:'Explore my work <span>↘</span>',
    aboutTag:'( a little bit about me )', aboutCopy:'I turn <span>“what if?”</span> into visuals that make you look twice.', aboutText:'I’m Akbope, a graphic designer and Astana IT University student based in Astana. I bring expressive typography, unexpected colour and a curious eye to identities, posters and social campaigns. I’m open to freelance projects and creative collaborations.',
    work:'( selected work )', all:'all', series:'series', posters:'posters', branding:'branding', shuffle:'Surprise me ↻',
    servicesTag:'( what i can make )', servicesNote:'always learning, always up for a new challenge', servicesTitle:'Pick a format.<br><em>Let\'s play.</em>',
    services:['Event, movie &amp; awareness<br>campaign posters','Album covers &amp;<br>music artwork','Social media campaigns:<br>posts, stories &amp; ads','Packaging: labels,<br>boxes &amp; bags','Website &amp; landing<br>page design','Loyalty cards, infographics<br>&amp; typographic posters'],
    moodTag:'( my design ingredients )', moodNote:'made for looking twice', moodTitle:'Colour, type<br>&amp; a little <em>chaos.</em>',
    contactTag:'( have an idea? )', contactTitle:'Let\'s make<br>something <em>fun.</em>', brief:'or send a tiny brief ↓', send:'send brief to telegram ↗', placeholders:['what are we making?','mood / colour / reference','when do you need it?'],
    made:'made with colour &amp; curiosity', back:'back to top ↑', view:'see all', shuffleFound:'Now looking at', caseLabels:['Brief','Visual idea','Design notes','Outcome'], gallery:'The complete series', concept:'Independent concept project. These design notes describe the visual approach; they are not client documentation or measured business results.', compareTitle:'Colour changes<br>the feeling.', compareText:'Slide between a monochrome treatment and the finished artwork to explore how colour shapes the composition. Both views use the same final design.'
  },
  kk: {
    topNote:'графикалық дизайнер<br>Қазақстан, Астана', contact:'байланысу <i>↗</i>', availability:'<i></i> фрилансқа ашықпын',
    heroLabel:'Тәуелсіз графикалық дизайнер / Портфолио 2026', heroTitle:'Көз тоқтатар.<br><em>Ой салар.</em>', heroText:'Визуалды айдентика, постерлер және әлеуметтік желіге арналған дизайн жасаймын.', scroll:'жұмыстарды көру <span>↓</span>',
    aboutTag:'( мен туралы қысқаша )', aboutCopy:'Мен <span>“ал егер?”</span> деген ойды көз тоқтататын визуалға айналдырамын.', aboutText:'Мен — Астанадағы Astana IT University студенті және freestyle графикалық дизайнермін. Қызық идея, жаңа формат не бейтаныс жанр болса — бірге зерттеп көруге дайынмын.',
    work:'( таңдамалы жұмыстар )', all:'барлығы', series:'сериялар', posters:'постерлер', branding:'брендинг', shuffle:'кездейсоқ жұмыс ↻',
    servicesTag:'( не жасай аламын )', servicesNote:'үнемі үйренемін, жаңа форматқа ашықпын', servicesTitle:'Форматты таңда.<br><em>Бірге ойнайық.</em>',
    services:['Event, movie және awareness<br>кампания постерлері','Альбом мұқабасы және<br>music artwork','Әлеуметтік желі кампаниясы:<br>пост, stories және жарнама','Қаптама: label,<br>қорап және пакет','Вебсайт және landing<br>page дизайны','Loyalty card, инфографика<br>және типографикалық постер'],
    moodTag:'( дизайн ингредиенттерім )', moodNote:'көзді қайта тоқтату үшін', moodTitle:'Түс, қаріп<br>және аздап <em>хаос.</em>',
    contactTag:'( идеяң бар ма? )', contactTitle:'Бірге қызық<br>нәрсе <em>жасайық.</em>', brief:'немесе қысқа brief қалдыр ↓', send:'telegram-ға жіберу ↗', placeholders:['не жасаймыз?','көңіл-күй / түс / референс','қашан керек?'],
    made:'түспен және қызығушылықпен жасалды', back:'жоғарыға ↑', view:'барлығын көру:', shuffleFound:'Қазір қарап тұрғаның:', caseLabels:['Міндет','Визуал идея','Дизайн шешімдері','Нәтиже'], gallery:'Толық серия', concept:'Тәуелсіз концепт жоба. Бұл жазбалар визуал тәсілді сипаттайды; клиент құжаты немесе өлшенген бизнес нәтижесі емес.', compareTitle:'Түс көңіл-күйді<br>өзгертеді.', compareText:'Түстің композицияға әсерін көру үшін жүгірткіні жылжытыңыз. Екі көріністе де бір дайын дизайн қолданылған: монохром өңдеу және түпнұсқа.'
  }
};

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  }
}), {threshold:0.12});

function observeReveals() {
  const elements = document.querySelectorAll('.about > *:not(.flower), .work .section-head, .work-tools, .project, .services > :not(.services-grid), .services-grid > div, .moodboard > :not(.mood-grid), .mood-card, .contact > *, .brief-form');
  elements.forEach((element, index) => {
    if (!element.classList.contains('reveal')) element.classList.add('reveal');
    element.style.setProperty('--delay', `${(index % 3) * 70}ms`);
    revealObserver.observe(element);
  });
}

function setupCursorCards() {
  document.querySelectorAll('.project:not(.single) .project-image').forEach(card => {
    card.addEventListener('pointerenter', () => cursor.classList.add('is-open'));
    card.addEventListener('pointerleave', () => cursor.classList.remove('is-open'));
  });
}

function renderProjects() {
  const lang = currentLanguage;
  grid.innerHTML = projects.map((project, index) => {
    const isSeries = project.files.length > 1;
    const images = isSeries ? [project.files[0], project.files[2], ...(index === 2 ? [project.files[5]] : [])] : project.files;
    const artwork = images.map((file, imageIndex) => `<img loading="lazy" decoding="async" src="${src(file)}" alt="${project.title} — ${imageIndex + 1}">`).join('');
    const action = isSeries ? `${lang === 'kk' ? 'Серияны көру' : 'View series'} · ${project.files.length}` : (lang === 'kk' ? 'Толық көру' : 'View poster');
    const card = `${isSeries ? `<span class="project-stage">${artwork}</span>` : artwork}<span class="view">${action} <b aria-hidden="true">↗</b></span>`;
    const aria = lang === 'kk' ? `${project.title} жобасын ашу` : `Open ${project.title}`;
    return `<article class="project ${project.className}" data-project-index="${index}" data-category="${project.category}"><button type="button" class="project-image" aria-label="${aria}">${card}</button><div class="project-info"><span class="project-number">${String(index + 1).padStart(2, '0')}</span><h2>${project.title}</h2><p>${project.type[lang]}</p></div></article>`;
  }).join('');
  document.querySelectorAll('.project button').forEach(button => button.addEventListener('click', () => {
    openCaseStudy(projects[Number(button.closest('.project').dataset.projectIndex)]);
  }));
  setupCursorCards();
  applyFilter(currentFilter);
  observeReveals();
}

function openCaseStudy(project) {
  const lang = currentLanguage;
  const study = caseStudies[project.key]?.[lang];
  if (!study) {
    modal.classList.remove('has-study');
    modalLabel.textContent = `${project.title} — ${project.type[lang]}`;
    caseContent.innerHTML = '';
    content.innerHTML = `<img src="${src(project.files[0])}" alt="${project.title} design">`;
    modal.showModal();
    modal.scrollTop = 0;
    return;
  }
  const labels = copy[lang].caseLabels;
  modal.classList.add('has-study');
  modalLabel.textContent = `${project.title} — ${lang === 'kk' ? 'КОНЦЕПТ ЖОБА' : 'CONCEPT PROJECT'}`;
  caseContent.innerHTML = `
    <div class="case-intro"><div><span class="case-kicker">${study.kicker}</span><h2>${project.title}</h2><p class="case-summary">${study.brief}</p></div><div class="case-facts"><div><b>${labels[0]}</b><p>${study.brief}</p></div><div><b>${labels[1]}</b><p>${study.idea}</p></div></div></div>
    <p class="process-title">${labels[2]}</p><div class="process-list">${study.process.map((step, index) => `<div><b>0${index + 1}</b><p>${step}</p></div>`).join('')}</div>
    <div class="comparison-wrap"><div class="comparison" data-label="${lang === 'kk' ? 'МОНОХРОМ / ТҮС' : 'MONOCHROME / COLOUR'}" aria-label="${lang === 'kk' ? 'Түстерді салыстыру' : 'Colour comparison'}"><img src="${src(project.files[0])}" alt="Monochrome treatment of the finished artwork"><div class="compare-final"><img src="${src(project.files[0])}" alt="Final poster"></div><div class="compare-handle"></div><input type="range" min="0" max="100" value="52" aria-label="${lang === 'kk' ? 'Түсті көріністің үлесі' : 'Reveal colour artwork'}"></div><div class="comparison-copy"><span class="case-kicker">${lang === 'kk' ? 'ТҮС ӘСЕРІ' : 'COLOUR STUDY'}</span><h3>${copy[lang].compareTitle}</h3><p>${copy[lang].compareText}</p></div></div>
    <p class="outcome-title">${labels[3]}</p><p class="outcome">${study.outcome}</p><p class="concept-note">${copy[lang].concept}</p><p class="gallery-heading">${copy[lang].gallery} — ${project.files.length} ${lang === 'kk' ? 'ЖҰМЫС' : 'DESIGNS'}</p>`;
  content.innerHTML = project.files.map(file => `<img loading="lazy" src="${src(file)}" alt="${label(file)} design">`).join('');
  const comparison = caseContent.querySelector('.comparison');
  comparison.querySelector('input').addEventListener('input', event => comparison.style.setProperty('--position', `${event.target.value}%`));
  if (!modal.open) modal.showModal();
  // A native <dialog> lives in the browser's top layer. Keep the custom
  // cursor inside that layer while the case study is open so it stays visible.
  moveCursorTo(modal);
  modal.scrollTop = 0;
}

function applyFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filters button').forEach(button => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.project').forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  document.querySelector('.shuffle-status').textContent = '';
}

function applyLanguage() {
  const lang = currentLanguage;
  const t = copy[lang];
  document.documentElement.lang = lang;
  document.querySelector('.topbar-note').innerHTML = t.topNote;
  document.querySelector('.contact-link').innerHTML = t.contact;
  document.querySelector('.availability').innerHTML = t.availability;
  document.querySelector('.hero-label').textContent = t.heroLabel;
  document.querySelector('.hero h1').innerHTML = t.heroTitle;
  document.querySelector('.hero-bottom p').textContent = t.heroText;
  document.querySelector('.scroll-hint').innerHTML = t.scroll;
  document.querySelector('.about-tag').textContent = t.aboutTag;
  document.querySelector('.about-copy').innerHTML = t.aboutCopy;
  document.querySelector('.about-details > p').textContent = t.aboutText;
  document.querySelector('.section-head p:first-child').textContent = t.work;
  document.querySelector('[data-filter="all"]').textContent = t.all;
  document.querySelector('[data-filter="series"]').textContent = t.series;
  document.querySelector('[data-filter="poster"]').textContent = t.posters;
  document.querySelector('[data-filter="branding"]').textContent = t.branding;
  document.querySelector('.shuffle-button').textContent = t.shuffle;
  document.querySelector('.services-head p:first-child').textContent = t.servicesTag;
  document.querySelector('.services-head p:last-child').textContent = t.servicesNote;
  document.querySelector('.services h2').innerHTML = t.servicesTitle;
  document.querySelectorAll('.services-grid p').forEach((item, index) => item.innerHTML = t.services[index]);
  document.querySelector('.mood-head p:first-child').textContent = t.moodTag;
  document.querySelector('.mood-head p:last-child').textContent = t.moodNote;
  document.querySelector('.moodboard h2').innerHTML = t.moodTitle;
  document.querySelector('.contact > p').textContent = t.contactTag;
  document.querySelector('.contact h2').innerHTML = t.contactTitle;
  document.querySelector('.brief-form > p').textContent = t.brief;
  document.querySelector('.brief-form button').textContent = t.send;
  document.querySelectorAll('.brief-form input').forEach((input, index) => input.placeholder = t.placeholders[index]);
  document.querySelector('footer p:nth-child(2)').textContent = t.made;
  document.querySelector('footer a').textContent = t.back;
  languageToggle.textContent = lang === 'en' ? 'ҚАЗ' : 'EN';
  languageToggle.setAttribute('aria-label', lang === 'en' ? 'Қазақ тіліне ауысу' : 'Switch to English');
  document.querySelector('.work-heading h2').innerHTML = lang === 'kk' ? 'Мінезі бар<br><em>жұмыстар.</em>' : 'Selected work,<br><em>full of character.</em>';
  document.querySelector('.work-heading > p').textContent = lang === 'kk' ? 'Кампаниялар, постерлер және визуал эксперименттер.' : 'A collection of campaigns, posters and visual experiments.';
  document.querySelector('[data-nav="work"]').innerHTML = `${lang === 'kk' ? 'Жұмыстар' : 'Work'} <span>12</span>`;
  document.querySelector('[data-nav="about"]').textContent = lang === 'kk' ? 'Мен туралы' : 'About';
  document.querySelector('.art-stamp').innerHTML = lang === 'kk' ? 'батыл идея.<br>ерекше сезім.<span>☺</span>' : 'a little bold.<br>a lot of feeling.<span>☺</span>';
  document.querySelector('.art-caption').textContent = lang === 'kk' ? 'Менің әлемімнен бір үзік ↗' : 'A few things from my world ↗';
  document.querySelector('.hero-footer').innerHTML = lang === 'kk' ? '<span>АҚБӨПЕ БАҚЫТКЕЛДІ</span><span>ҚАЗАҚСТАН, АСТАНА ↗</span><span>ТӨМЕНДЕ — ЖҰМЫСТАР ↓</span>' : '<span>AKBOPE BAKYTKELDY</span><span>ASTANA, KAZAKHSTAN ↗</span><span>SCROLL FOR THE GOOD STUFF ↓</span>';
  document.querySelector('.close').setAttribute('aria-label', lang === 'kk' ? 'Жобаны жабу' : 'Close project');
  document.querySelector('.skip-link').textContent = lang === 'kk' ? 'Жұмыстарға өту' : 'Skip to selected work';
  document.querySelectorAll('.brief-form input').forEach((input, index) => input.setAttribute('aria-label', t.placeholders[index]));
  grid.setAttribute('aria-label', lang === 'kk' ? 'Портфолио жобалары' : 'Portfolio projects');
  renderProjects();
}

document.querySelectorAll('.filters button').forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
document.querySelector('.shuffle-button').addEventListener('click', () => {
  const visible = [...document.querySelectorAll('.project:not([hidden])')];
  if (!visible.length) return;
  const chosen = visible[Math.floor(Math.random() * visible.length)];
  document.querySelectorAll('.project').forEach(card => card.classList.remove('shuffle-hit'));
  chosen.classList.add('shuffle-hit');
  chosen.scrollIntoView({behavior:reduceMotion ? 'auto' : 'smooth', block:'center'});
  const title = chosen.querySelector('h2').textContent;
  document.querySelector('.shuffle-status').textContent = `${copy[currentLanguage].shuffleFound} ${title}`;
});

languageToggle.addEventListener('click', () => {
  currentLanguage = currentLanguage === 'en' ? 'kk' : 'en';
  try { localStorage.setItem('portfolio-language', currentLanguage); } catch {}
  applyLanguage();
});

document.querySelector('.close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
modal.addEventListener('close', () => {
  moveCursorTo(document.body);
  modal.classList.remove('has-study');
  caseContent.innerHTML = '';
  content.innerHTML = '';
  cursor.classList.remove('is-open');
});
window.addEventListener('pointermove', event => { cursor.style.left = `${event.clientX}px`; cursor.style.top = `${event.clientY}px`; });

document.querySelector('.brief-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = encodeURIComponent(currentLanguage === 'kk' ? `Сәлем, Ақбөпе! Дизайнға тапсырыс бергім келеді.\n\nЖоба: ${data.get('project')}\nКөңіл-күй / референс: ${data.get('mood') || '—'}\nМерзім: ${data.get('deadline') || '—'}` : `Hi Akbope! I have a design brief.\n\nProject: ${data.get('project')}\nMood / reference: ${data.get('mood') || '—'}\nDeadline: ${data.get('deadline') || '—'}`);
  window.open(`https://t.me/meuseuk?text=${message}`, '_blank', 'noopener');
});

applyLanguage();
