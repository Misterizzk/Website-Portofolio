const E=[
 {k:'UT',img:'assets/img/logos/united-tractors.png',lv:'light',co:'United Tractors',docs:['assets/img/experience/ut-1.jpg','assets/img/experience/ut-2.jpg','assets/img/experience/ut-3.jpg','assets/img/experience/ut-4.jpg'],role:'Technology & Digitalization Intern',p:'Aug 2026 to Present',s:43,e:46,t:'tech',active:1,
  pts:['Built a desktop warehouse automation prototype for a company hackathon.','Automated inventory checks with batch and rack-location management, QR labels, camera scanning, aging status, and session tracking.','Designed an operational dashboard with a rack map, priority checks, and Excel and PDF reporting.'],
  st:[['5','core modules'],['QR','camera scanning']],tags:['Python','Tkinter','SQLite','OpenCV','QR code']},
 {k:'NE',img:'assets/img/logos/neotic.png',lv:'light',co:'Neotic.id',docs:['assets/img/experience/neotic-4.jpg','assets/img/experience/neotic-1.jpg','assets/img/experience/neotic-2.jpg','assets/img/experience/neotic-3.jpg'],role:'Co-Founder & Project Manager',p:'Feb 2023 to Present',s:1,e:46,t:'tech',active:1,
  pts:['Co-founded an edtech platform focused on accessible technology education.','Built and ran courses on Figma, JavaScript, Excel, and Python.','Lead planning, system design, task delegation, and launches.'],
  st:[['3','courses'],['200+','participants']],tags:['Figma','JavaScript','Python','Excel','Notion']},
 {k:'LB',img:'assets/img/logos/lab-gunadarma.png',lv:'light',co:'Integrated Lab, Gunadarma',role:'Laboratory Assistant & Developer',p:'Dec 2023 to Dec 2025',s:11,e:35,t:'tech',
  pts:['Developed practicum modules and learning activities.','Prepared assessments and guided students in sessions and forums.','Monitored practicum runs against lab standards.'],
  st:[['1,000+','students served'],['2','years']],tags:['SQL','Oracle','Python']},
 {k:'AI',img:'assets/img/logos/school-of-ai.png',lv:'light',co:'School of Artificial Intelligence',role:'Business Development Intern',p:'Sep 2025 to Dec 2025',s:32,e:35,t:'lead',
  pts:['Supported strategies to expand market reach.','Identified and engaged institutional partners.','Built a product execution roadmap from planning to launch.'],
  st:[['1','product roadmap'],['4','months']],tags:['Partnerships','Roadmapping']},
 {k:'BM',img:'assets/img/logos/bem-fti.png',lv:'light',co:'BEM Universitas Gunadarma',docs:['assets/img/experience/bem-team-1.jpg','assets/img/experience/bem-team-2.jpg','assets/img/experience/bem-best-leader.jpg','assets/img/experience/bem-best-board.jpg'],role:'Leader of Human Resource Development',p:'Jul 2023 to Sep 2025',s:6,e:32,t:'lead',
  pts:['Led a 95-member bureau across development, engagement, and evaluation.','Ran the Ruang Ekspresi event and beat its participant target.','Field Coordinator for PKKMB with 214 committee members and 1,430 new students.'],
  st:[['95','members led'],['1,430','new students']],tags:['Leadership','Event management']},
 {k:'EA',wide:1,img:'assets/img/logos/erlass.png',lv:'light',co:'Erlass Akademi',docs:['assets/img/experience/erlass-2.jpg','assets/img/experience/erlass-1.jpg','assets/img/experience/erlass-3.jpg','assets/img/experience/workshop-stage.jpg'],role:'Freelance Coding Mentor',p:'Feb 2026 to Present',s:37,e:46,t:'teach',active:1,
  pts:['Teach Scratch programming with structured modules.','Design evaluations and periodic progress reports.','Guide students through 10+ independent projects.'],
  st:[['30','students'],['10+','projects']],tags:['Scratch','Curriculum']},
 {k:'AH',img:'assets/img/logos/al-hamidiyah.png',lv:'dark',co:'Yayasan Islam Al-Hamidiyah',docs:['assets/img/experience/alh-1.jpg','assets/img/experience/alh-2.jpg'],role:'Coding Mentor',p:'Dec 2025 to Aug 2026',s:35,e:43,t:'teach',
  pts:['Designed coding modules and lesson plans.','Taught 175 students across 7 classes.','Managed attendance, grades, and competency reports.'],
  st:[['175','students'],['7','classes']],tags:['Curriculum','Assessment']}
];
const TYPE={tech:'Tech',lead:'Leadership',teach:'Teaching'};
const logoTile=x=>x.img?`<span class="logo img ${x.lv} ring-${x.t}${x.wide?" wide":""}"><img src="${x.img}" alt="${x.co} logo"></span>`:`<span class="logo ${x.t}">${x.k}</span>`;
const list=document.getElementById('list'),ov=document.getElementById('ov'),modal=document.getElementById('modal');
let filter='all',cur=0;

function renderList(){
  const rows=E.map((x,i)=>({x,i})).filter(o=>filter==='all'||o.x.t===filter);
  document.getElementById('count').textContent=rows.length+' roles';
  list.innerHTML=rows.map(({x,i},n)=>`
    <button class="item" data-i="${i}" style="animation-delay:${n*45}ms">
      ${logoTile(x)}
      <span style="min-width:0"><p class="role">${x.role}</p><p class="co">${x.co}</p></span>
      <span class="meta"><span class="status ${x.active?"active":"done"}">${x.active?"Active":"Done"}</span></span>
    </button>`).join('');
  list.querySelectorAll('.item').forEach(b=>b.onclick=()=>openM(+b.dataset.i));
}
const ind=document.querySelector('#filters .ind');
function moveInd(b){ind.style.width=b.offsetWidth+'px';ind.style.transform='translateX('+(b.offsetLeft-4)+'px)';}
document.querySelectorAll('#filters button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#filters button').forEach(o=>o.classList.remove('on'));b.classList.add('on');moveInd(b);filter=b.dataset.f;renderList();});
addEventListener('load',()=>moveInd(document.querySelector('#filters button.on')));
addEventListener('resize',()=>moveInd(document.querySelector('#filters button.on')));

function openM(i){
  cur=i;const x=E[i];
  modal.innerHTML=`
   <div class="m-head">
     ${logoTile(x)}
     <div><p class="role" id="m-role">${x.role}</p>
       <p class="co">${x.co}<span style="opacity:.4">|</span>${x.p}<span class="status ${x.active?'active':'done'}">${TYPE[x.t]}</span></p></div>
     <button class="x" aria-label="Close" id="mx"><i class="ti ti-x"></i></button>
   </div>
   <div class="m-scroll">
   <div class="m-body">
     <div><h4>What I did</h4><ul>${x.pts.map(p=>`<li>${p}</li>`).join('')}</ul></div>
     <div><h4>Highlights</h4><div class="m-stats">${x.st.map(s=>`<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div>
       <h4>Tools and skills</h4><div class="m-tags">${x.tags.map(t=>`<span>${t}</span>`).join('')}</div></div>
   </div>
   ${x.docs&&x.docs.length?`<div class="m-docs"><h4 style="font-size:13px;color:var(--muted);font-weight:500;margin-bottom:10px">Documentation</h4><div class="g">${x.docs.map((p,k)=>`<div class="doc"><img src="${p}" alt="${x.co} documentation ${k+1}"></div>`).join('')}</div></div>`:''}
   </div>
   <div class="m-foot">
     <button id="mp"><i class="ti ti-arrow-left"></i>Previous</button>
     <span class="nav-b">${i+1} of ${E.length}</span>
     <button id="mn">Next<i class="ti ti-arrow-right"></i></button>
   </div>`;
  if(!ov.classList.contains('open')){const sw=innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=sw+'px';document.body.classList.add('locked');document.documentElement.classList.add('locked');}
  ov.classList.add('open');ov.setAttribute('aria-hidden','false');
  document.getElementById('mx').onclick=closeM;
  document.getElementById('mp').onclick=()=>openM((cur-1+E.length)%E.length);
  document.getElementById('mn').onclick=()=>openM((cur+1)%E.length);
}
function closeM(){ov.classList.remove('open');ov.setAttribute('aria-hidden','true');document.body.classList.remove('locked');document.documentElement.classList.remove('locked');document.body.style.paddingRight='';}
ov.onclick=e=>{if(e.target===ov)closeM();};
document.addEventListener('keydown',e=>{if(!ov.classList.contains('open'))return;
  if(e.key==='Escape')closeM();if(e.key==='ArrowRight')openM((cur+1)%E.length);if(e.key==='ArrowLeft')openM((cur-1+E.length)%E.length);});

// journey
const T=48,NOW=45;
const order=E.map((x,i)=>({x,i})).sort((a,b)=>a.x.s-b.x.s);
document.getElementById('tl').innerHTML=`
  <div class="years">${['2023','2024','2025','2026'].map(y=>`<span>${y}</span>`).join('')}</div>
  <div class="lanes">
    ${[25,50,75].map(p=>`<div class="grid-l" style="left:${p}%"></div>`).join('')}
    <div class="now" style="left:${NOW/T*100}%"><b>Now</b></div>
    ${order.map(({x,i})=>{const w=(x.e-x.s)/T*100,l=x.s/T*100,inside=w>20;
      return `<div class="lane"><div class="bar ${x.t}" data-i="${i}" style="left:${l}%;width:${w}%">${inside?x.co:''}</div>${inside?'':`<span class="out" style="right:${100-l+0.8}%">${x.co}</span>`}</div>`}).join('')}
  </div>`;
document.querySelectorAll('.bar').forEach(b=>b.onclick=()=>openM(+b.dataset.i));

renderList();


// photo switcher
(function(){
  const wrap=document.getElementById('photos'),imgs=[...wrap.querySelectorAll('img')],dots=[...document.querySelectorAll('#dots i')];
  let cur=0,busy=false;
  function next(x,y){
    if(busy)return;busy=true;
    const from=imgs[cur],n=(cur+1)%imgs.length,to=imgs[n];
    to.style.setProperty('--x',x+'%');to.style.setProperty('--y',y+'%');
    from.classList.add('out');to.classList.add('in');
    dots.forEach((d,i)=>d.classList.toggle('on',i===n));
    setTimeout(()=>{from.classList.remove('on','out');to.classList.remove('in');to.classList.add('on');cur=n;busy=false;},900);
  }
  wrap.addEventListener('click',e=>{const r=wrap.getBoundingClientRect();next((e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100);});
  wrap.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();next(50,50);}});
})();



// count-up on load
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.stat .v').forEach((el,idx)=>{
    const node=[...el.childNodes].find(n=>n.nodeType===3&&n.textContent.trim());
    if(!node)return;
    const raw=node.textContent.trim(),m=raw.match(/^([\d.]+)(.*)$/);if(!m)return;
    const target=parseFloat(m[1]),dec=(m[1].split('.')[1]||'').length,suf=m[2];
    if(reduce)return;
    const dur=1400,delay=idx*120;node.textContent=(0).toFixed(dec)+suf;
    setTimeout(()=>{const t0=performance.now();
      const id=setInterval(()=>{const k=Math.min(1,(performance.now()-t0)/dur),e=1-Math.pow(1-k,3);
        node.textContent=(target*e).toFixed(dec)+suf;if(k>=1)clearInterval(id);},16);},delay);
  });
})();
