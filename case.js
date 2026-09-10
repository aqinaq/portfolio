const project=projects.find(p=>p.key===document.body.dataset.project);
let language='en';
try{language=localStorage.getItem('portfolio-language')==='kk'?'kk':'en'}catch{}
function updateCaseLanguage(){
 if(!project)return;
 const t=caseCopy[language];
 document.documentElement.lang=language;
 document.title=`${project.title} — ${language==='kk'?'Ақбөпе Бақыткелді':'Akbope Bakytkeldy'}`;
 document.querySelector('meta[name="description"]').content=project.summary[language];
 document.querySelector('#case-main').innerHTML=renderCase(project,language);
 document.querySelector('.skip-link').textContent=t.skip;
 document.querySelector('.case-nav>a').textContent=t.talk;
 document.querySelector('footer p:nth-child(2)').textContent=t.footer;
 document.querySelector('footer>a').textContent=t.cv;
 const toggle=document.querySelector('.language-toggle');toggle.textContent=language==='en'?'EN / ҚАЗ':'ҚАЗ / EN';toggle.setAttribute('aria-label',language==='en'?'Қазақ тіліне ауысу':'Switch to English');
}
document.querySelector('.language-toggle').addEventListener('click',()=>{language=language==='en'?'kk':'en';try{localStorage.setItem('portfolio-language',language)}catch{}updateCaseLanguage()});
updateCaseLanguage();
