const modal = document.querySelector('.gallery-modal');
const content = document.querySelector('.gallery-content');
const modalLabel = document.querySelector('.modal-label');
const galleries = {
  sushi: ['sushi 1.png','sushi 2.png','sushi 3.png','sushi 4.png','sushi 5.png','sushi 6.png','sushi 7.png','sushi 8.png','sushi 9.png'],
  desserts: ['desserts.png','dessert2.png','dessert3.png','dessert4.png','dessert5.png','dessert6.png','desserts7.png','dessert8.png','dessert9.png'],
  claude: ['claude 1.png','claude2.png','claude3.png','claude4.png','claude5.png','claude6.png','claude7.png','claude8.png']
};
const src = file => `public/assets/${file.split('/').map(encodeURIComponent).join('/')}`;
const label = file => file.replace('vanilla/','').replace(/\.[^.]+$/,'').replace(/\d+/g,'').replace(/[-_]/g,' ').trim() || 'Untitled';
function openGallery(files, title) {
  modalLabel.textContent = `${title} — ${files.length} work${files.length === 1 ? '' : 's'}`;
  content.innerHTML = files.map(file => `<img loading="lazy" src="${src(file)}" alt="${label(file)} design" />`).join('');
  if (!modal.open) modal.showModal();
}
const projects = [
  {title:'Sushi Social Club', type:'Social media series', files:galleries.sushi, className:'project-large'},
  {title:'Macaroon Club', type:'Campaign series', files:galleries.desserts, className:'project-tall'},
  {title:'Claude Magazine', type:'Editorial series', files:galleries.claude, className:'project-wide'},
  {title:'Weekend Blooms', type:'Poster', files:['weekendblooms flyer.png'], className:'single'},
  {title:'Kök Coffee', type:'Brand concept', files:['kok coffee.png'], className:'single'},
  {title:'Small Things', type:'Poster', files:['smallthings.png'], className:'single'},
  {title:'Lalagül', type:'Poster', files:['lalagul.png'], className:'single'},
  {title:'Pizza', type:'Poster', files:['pizza.png'], className:'single'},
  {title:'Light', type:'Poster', files:['light.png'], className:'single'},
  {title:'Copying', type:'Poster', files:['copying.png'], className:'single'},
  {title:'Are You Bored Yet?', type:'Poster', files:['are you bored yet.png'], className:'single'},
  {title:'Idea', type:'Poster', files:['idea.png'], className:'single'}
];
const grid = document.querySelector('.project-grid');
grid.innerHTML = projects.map((project, index) => {
  const isSeries = project.files.length > 1;
  const card = `<img loading="lazy" src="${src(project.files[0])}" alt="${project.title} design" />${isSeries ? `<span class="view">see all ${project.files.length} posts <b>↗</b></span>` : ''}`;
  return `<article class="project ${project.className}" data-project-index="${index}">${isSeries ? `<button class="project-image" aria-label="${project.title} сериясын ашу">${card}</button>` : `<div class="project-image">${card}</div>`}<div class="project-info"><h2>${project.title}</h2><p>${project.type}</p></div></article>`;
}).join('');
document.querySelectorAll('.project:not(.single) button').forEach(button => button.addEventListener('click', () => {
  const project = projects[Number(button.closest('.project').dataset.projectIndex)];
  openGallery(project.files, project.title);
}));
document.querySelector('.close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
const cursor = document.querySelector('.cursor-dot');
window.addEventListener('pointermove', event => { cursor.style.left = `${event.clientX}px`; cursor.style.top = `${event.clientY}px`; });
document.querySelectorAll('.project:not(.single) .project-image').forEach(card => {
  card.addEventListener('pointerenter', () => cursor.classList.add('is-open'));
  card.addEventListener('pointerleave', () => cursor.classList.remove('is-open'));
});
document.querySelectorAll('.project, .services-grid > div, .mood-card, .brief-form').forEach(element => element.classList.add('reveal'));
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
}), { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
document.querySelector('.brief-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Hi Akböpe! I have a design brief:%0A%0AProject: ${encodeURIComponent(data.get('project'))}%0AMood / reference: ${encodeURIComponent(data.get('mood') || '—')}%0ADeadline: ${encodeURIComponent(data.get('deadline') || '—')}`;
  window.open(`https://t.me/meuseuk?text=${message}`, '_blank', 'noopener');
});
