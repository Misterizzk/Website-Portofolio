const P=[
 {id:'wh',kind:'built',title:'Warehouse automation',short:'Desktop app for faster inventory checks',meta:'Hackathon, United Tractors · 2026',
  desc:'Desktop app for inventory checks with QR labels, camera scanning, a live rack map, and Excel and PDF reports.',
  hl:[['QR','camera scanning'],['Excel + PDF','reports']],tags:['Python','Tkinter','SQLite','OpenCV','QR code'],
  thumb:['#24403C','#4E7A73','#F1EAD2'],mono:'WA',link:{label:'GitHub',icon:'ti-brand-github',url:'https://github.com/Misterizzk/Warehouse'},shots:['assets/img/projects/warehouse-dashboard.jpg','assets/img/projects/warehouse-live.jpg'],
  role:'Developer',
  sections:[['What it does','Speeds up warehouse inventory checks. Staff label stock with QR codes, scan them with a camera, and see which racks need attention first.'],
   ['Key features',['Batch and rack-location management','QR label generation and camera scanning','Aging status and session tracking','Rack map dashboard with priority checks','Excel and PDF reports for inventory and inspections']]]},
 {id:'sl',kind:'built',title:'SIBI sign language app',short:'Learn the SIBI alphabet with real-time hand detection',meta:'Undergraduate thesis · 2025',
  desc:'A learning app that teaches the Indonesian sign alphabet (SIBI). Users study each letter, take quizzes, then practice in front of a camera while the app reads their hand sign.',
  hl:[['92%','user acceptance'],['A to Z','SIBI letters']],tags:['Python','OpenCV','MediaPipe','scikit-learn','Authorware'],
  link:{label:'Download app',icon:'ti-download',url:'https://drive.google.com/file/d/1GPlJ3cEfUGB1xDKkVOxJFGR1mgAqGsM4/view?usp=drive_link'},
  thumb:['#B89B5E','#F1EAD2','#24403C'],mono:'SL',shots:['assets/img/projects/sibi-detection.jpg'],shotPos:'center 45%',shotFit:'natural',role:'Solo developer and researcher',
  sections:[['What it does','Helps people who do not know sign language learn the SIBI alphabet, so talking with deaf friends and classmates feels less like a barrier.'],
   ['Key features',['Learning material for every SIBI letter','Quizzes with scores','Camera practice with real-time letter recognition','Hand landmark detection with an SVM classifier']],
   ['How it works',{flow:['Camera frame','MediaPipe hand landmarks','SVM classifier','Predicted letter']}],
   ['Result','User acceptance test score of 92%. Next steps from the research: word-level signs and a mobile version.']]},
 {id:'lo',kind:'concept',title:'Lorian',short:'Social creative network for writers',meta:'1000x Innovation Challenge',
  desc:'A creative network where writers publish and earn from their stories, with AI story visualization and a job board for creators.',
  hl:[['Top 10','finalist'],['CEO','my role']],tags:['Product concept','AI','Marketplace'],
  thumb:['#8FADA6','#EEF3F1','#2F4F4A'],mono:'Lo',shots:['assets/img/projects/lorian-board.jpg'],shotPos:'center 40%',role:'CEO',
  sections:[['Problem','Local writers have few places to publish, get paid, and find creative work, and reading interest is still low.'],
   ['Solution','One platform for writers, readers, and creative clients: publish stories, read with AI visuals, and hire or get hired for creative jobs.'],
   ['Key features',['Free and premium story chapters','AI story visualization','Job board for writers, illustrators, and translators','Reader streaks and levels']],
   ['User flow',{flow:['Client posts a job','Creators apply','Client confirms','Discuss and deliver']}],
   ['Business model','Premium subscription, virtual coins, and creative partnerships.'],
   ['Result and role','Top 10 Finalist. I led the team as CEO, from the idea and business model to the final pitch.']]}
];
const grid=document.getElementById('pgrid'),stage=document.getElementById('stage'),wrapEl=document.querySelector('.wrap');
let cur=-1,busy=false;
const tag=k=>`<span class="kindtag ${k}">${k==='built'?'Built':'Concept'}</span>`;
grid.innerHTML=P.map((x,i)=>`
 <button class="pcard" data-i="${i}">
  <div class="thumb" style="background:radial-gradient(80% 90% at 100% 0%,${x.thumb[2]}22,transparent 60%),linear-gradient(140deg,${x.thumb[1]},${x.thumb[0]}55)">
   <span class="mono" style="color:${x.thumb[2]}">${x.mono}</span><span class="ph ${x.kind==='built'?'tech':'biz'}">${x.kind==='built'?'Technology':'Business'}</span></div>
  <div class="pbody">
   <div class="prow"><h3>${x.title}</h3>${tag(x.kind)}</div>
   <p>${x.short}</p><span class="pmeta">${x.meta}</span>
   <div class="ptags">${x.tags.map(t=>`<span>${t}</span>`).join('')}</div>
  </div></button>`).join('')+`
 <div class="pcta" style="grid-column:span ${3-P.length%3}"><h3>Have a project in mind?</h3><p>I'm open to full-time roles and collaborations.</p><a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=faizrizkiazmi@gmail.com" target="_blank" rel="noopener">Email me</a></div>`;

function bigHTML(i){const x=P[i];return `<div class="big">
 <button class="x" id="bx" aria-label="Close"><i class="ti ti-x"></i></button>
 <div class="info"><div class="kind">${tag(x.kind)}<span>${x.meta}</span></div>
  <h2>${x.title}</h2><p class="desc">${x.desc}</p>
  <div class="hl">${x.hl.map(h=>`<div><b>${h[0]}</b><span>${h[1]}</span></div>`).join('')}</div>
  <div class="tags">${x.tags.map(t=>`<span>${t}</span>`).join('')}</div>
  <div class="acts"><button class="btn-gold" id="bd">${x.kind==='built'?'View details':'Read case study'} <i class="ti ti-arrow-right"></i></button>${x.link?`<a class="btn-line" href="${x.link.url}" target="_blank" rel="noopener"><i class="ti ${x.link.icon}"></i>${x.link.label}</a>`:(x.kind==='built'?'<a class="btn-line" href="https://github.com/Misterizzk" target="_blank" rel="noopener"><i class="ti ti-brand-github"></i>GitHub</a>':'')}</div></div>
 <div class="shot${x.shots?' img':''}${x.shotFit==='natural'?' natural':''}">${x.shots?`<img src="${x.shots[0]}" alt="${x.title} screenshot">`:`${x.kind==='built'?'App screenshot':'Concept visual'}<br>coming soon`}</div></div>`;}
function rel(el){const a=el.getBoundingClientRect(),b=wrapEl.getBoundingClientRect();return{l:a.left-b.left,t:a.top-b.top,w:a.width,h:a.height};}
function openStage(i){
  if(busy)return; if(i===cur){stage.scrollIntoView({behavior:'smooth',block:'center'});return;}
  busy=true;const card=grid.querySelector(`.pcard[data-i="${i}"]`);
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wasOpen=stage.classList.contains('open');
  document.querySelectorAll('.pcard').forEach(c=>c.classList.toggle('sel',c===card));
  stage.innerHTML=bigHTML(i);const b=stage.querySelector('.big');const h=b.offsetHeight;
  stage.classList.add('open');stage.style.height=h+'px';
  const delay=reduce?0:(wasOpen?420:560);
  if(!reduce){wrapEl.style.position='relative';const f=rel(card),g=document.createElement('div');g.className='ghost';
    Object.assign(g.style,{left:f.l+'px',top:f.t+'px',width:f.w+'px',height:f.h+'px'});wrapEl.appendChild(g);
    requestAnimationFrame(()=>{const t=rel(stage);Object.assign(g.style,{left:t.l+'px',top:t.t+'px',width:t.w+'px',height:h+'px'});});
    setTimeout(()=>{g.style.opacity='0';setTimeout(()=>g.remove(),300);},delay);}
  setTimeout(()=>{b.classList.add('in');
    document.getElementById('bx').onclick=closeStage;document.getElementById('bd').onclick=()=>openModal(i);cur=i;busy=false;
    const r=stage.getBoundingClientRect();if(r.top<80||r.top>innerHeight*.5)stage.scrollIntoView({behavior:'smooth',block:'start'});},delay);
}
function closeStage(){if(busy||cur<0)return;busy=true;const b=stage.querySelector('.big');if(b)b.classList.remove('in');document.querySelectorAll('.pcard').forEach(c=>c.classList.remove('sel'));setTimeout(()=>{stage.style.height='0px';stage.classList.remove('open');setTimeout(()=>{stage.innerHTML='';busy=false;},560);},160);cur=-1;}
grid.querySelectorAll('.pcard').forEach(c=>c.onclick=()=>openStage(+c.dataset.i));


const ov=document.getElementById('ov'),modal=document.getElementById('modal');
function sec([h,v]){
  let body;
  if(Array.isArray(v)) body=`<ul>${v.map(p=>`<li>${p}</li>`).join('')}</ul>`;
  else if(v&&v.flow) body=`<div class="flow">${v.flow.map((s,k)=>`${k?'<i class="ti ti-arrow-right"></i>':''}<span>${s}</span>`).join('')}</div>`;
  else body=`<p>${v}</p>`;
  return `<div class="cs-sec"><h4>${h}</h4>${body}</div>`;}
function openModal(i){const x=P[i];
  modal.innerHTML=`
   <div class="m-head"><span class="logo tech" style="font-size:15px">${x.mono}</span>
     <div><p class="role" id="m-role">${x.title}</p><p class="co">${x.meta}<span class="status active">${x.kind==='built'?'Built':'Concept'}</span></p></div>
     <button class="x" aria-label="Close" id="mx"><i class="ti ti-x"></i></button></div>
   <div class="m-scroll"><div class="m-body">
     <div>${x.sections.map(sec).join('')}</div>
     <div><h4>Highlights</h4><div class="m-stats">${x.hl.map(s=>`<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div>
       <h4>${x.kind==='built'?'Stack':'Tags'}</h4><div class="m-tags">${x.tags.map(t=>`<span>${t}</span>`).join('')}</div>
       <h4 style="margin-top:20px">My role</h4><p style="font-size:14px">${x.role}</p></div></div>
     ${x.shots&&x.shots.length?`<div class="m-docs"><h4 style="font-size:13px;color:var(--muted);font-weight:500;margin-bottom:10px">${x.kind==='built'?'Screenshots':'Visuals'}</h4><div class="g">${x.shots.map((sh,k)=>`<div class="shot-tile"><img src="${sh}" alt="${x.title} screenshot ${k+1}"></div>`).join('')}</div></div>`:''}</div>
   <div class="m-foot"><button id="mp"><i class="ti ti-arrow-left"></i>Previous</button><span class="nav-b">${i+1} of ${P.length}</span><button id="mn">Next<i class="ti ti-arrow-right"></i></button></div>`;
  if(!ov.classList.contains('open')){document.body.style.paddingRight=(innerWidth-document.documentElement.clientWidth)+'px';document.body.classList.add('locked');document.documentElement.classList.add('locked');}
  ov.classList.add('open');ov.setAttribute('aria-hidden','false');
  document.getElementById('mx').onclick=closeModal;
  document.getElementById('mp').onclick=()=>openModal((i-1+P.length)%P.length);
  document.getElementById('mn').onclick=()=>openModal((i+1)%P.length);
}
function closeModal(){ov.classList.remove('open');ov.setAttribute('aria-hidden','true');document.body.classList.remove('locked');document.documentElement.classList.remove('locked');document.body.style.paddingRight='';}
ov.onclick=e=>{if(e.target===ov)closeModal();};
document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(ov.classList.contains('open'))closeModal();else if(cur>-1)closeStage();});
