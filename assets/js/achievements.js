const A=[
 {g:'comp',cat:'Competition',title:'Top 10 Finalist',org:'1000x Innovation Challenge, Marvin Foundation',year:'2025',badge:'Top 10',proof:'assets/img/certificates/cert-top.jpg',wm:'10',style:'dark',
  story:'Pitched Lorian, a creative network for writers, and made it to the top 10. I led the team as CEO, from shaping the idea and business model to the final pitch.',link:{label:'See the project',href:'projects.html'}},
 {g:'comp',cat:'Competition',title:'Runner-Up',org:'Liga Coding for Beginners, Skilvul',year:'2022',badge:'2nd place',wm:'2nd',style:'cream',static:true,
  story:'Second place in Liga Coding for Beginners by Skilvul.'},
 {g:'talk',cat:'Talk',title:'Speaker, Teacher Professional Development Workshop',org:'Student One Islamic School',year:'Aug 2026',nat:true,
  sub:'Creative learning media with AI',story:'Invited as a speaker at a national workshop for teachers, themed "Teach and Think Deeper and Creative Learning Media with AI". My session was about using AI in teaching.',proof:'assets/img/experience/workshop-stage.jpg'},
 {g:'talk',cat:'Talk',title:'Speaker, AI for Growth',org:'Dhiarise',year:'Nov 2025',sub:'Digital transformation and future business',story:'Invited as a speaker at the AI for Growth webinar on digital transformation and future business innovation, held by Dhiarise on 15 November 2025.',proof:'assets/img/certificates/cert-aigrowth.jpg'},
 {g:'rec',cat:'Recognition',title:'Best Executive Board Member',org:'BEM FTI Gunadarma',year:'2025',proof:['assets/img/certificates/cert-bpi.jpg','assets/img/experience/bem-best-board.jpg'],story:'Awarded by BEM FTI, Universitas Gunadarma.'},
 {g:'rec',cat:'Recognition',title:'Best Leader',org:'BEM FTI Gunadarma',year:'2024',proof:['assets/img/certificates/cert-leader.jpg','assets/img/experience/bem-best-leader.jpg'],story:'Awarded by BEM FTI, Universitas Gunadarma.'},
 {g:'rec',cat:'Recognition',title:'Best Staff',org:'BEM FTI Gunadarma',year:'2023',story:'Awarded by BEM FTI, Universitas Gunadarma.'},
 {g:'cert',cat:'Training',title:'Intermediate SQL',proof:'assets/img/certificates/cert-sql.jpg',org:'Gunadarma University',year:'2024',mono:'SQL',story:'Completed a training on intermediate SQL.'},
 {g:'cert',cat:'Training',title:'Data Analyst with Python',proof:'assets/img/certificates/cert-python.jpg',org:'Bisa.ai',year:'2022',mono:'PY',story:'Completed a training on data analysis with Python.'}
];
const by=g=>A.map((x,i)=>({x,i})).filter(o=>o.x.g===g);
document.getElementById('comp').innerHTML=by('comp').map(({x,i})=>`
 <${x.static?'div':'button'} class="cc ${x.style}${x.static?' static':''}"${x.static?'':` data-i="${i}"`}><span class="wm">${x.wm}</span>
  <div class="top2"><span class="yr">${x.year}</span><span class="badge">${x.badge}</span></div>
  <h3>${x.title}</h3><p class="org">${x.org}</p>
  ${x.static?'':`<div class="foot2"><span class="go">Read the story <i class="ti ti-arrow-right"></i></span></div>`}</${x.static?'div':'button'}>`).join('');
document.getElementById('talks').innerHTML=by('talk').map(({x,i})=>`
 <button class="tk glassb" data-i="${i}"><div class="meta">${x.year}${x.nat?'<span class="nat">National</span>':''}</div><h3>${x.title}</h3><p>${x.org} · ${x.sub}</p></button>`).join('');
document.getElementById('recog').innerHTML=by('rec').map(({x,i})=>`
 <button class="rc" data-i="${i}"><span class="medal">${x.year.slice(2)}</span><div><h3>${x.title}</h3><p>${x.org} · ${x.year}</p></div><i class="ti ti-arrow-right arr"></i></button>`).join('');
document.getElementById('certs').innerHTML=by('cert').map(({x,i})=>`
 <button class="ct glassb" data-i="${i}"><span class="seal">${x.mono}</span><div><h3>${x.title}</h3><p>${x.org} · ${x.year}</p></div><span class="view">View</span></button>`).join('');

const ov=document.getElementById('ov'),modal=document.getElementById('modal');
const OPEN=A.map((x,i)=>i).filter(i=>!A[i].static);
function openM(i){const x=A[i];
  const proof=x.proof?[].concat(x.proof).map((p,n)=>`<div class="proof has"${n?' style="margin-top:10px"':''}><img src="${p}" alt="${x.title} proof ${n+1}"></div>`).join(''):`<div class="proof">${x.g==='cert'||x.g==='comp'?'Certificate photo':'Documentation'}<br>coming soon</div>`;
  modal.innerHTML=`
   <div class="m-head"><span class="logo tech" style="font-size:13px">${x.g==='cert'?x.mono:x.year.slice(-2)}</span>
     <div><p class="role" id="m-role">${x.title}</p><p class="co">${x.org}<span style="opacity:.4">|</span>${x.year}<span class="status active">${x.cat}</span></p></div>
     <button class="x" aria-label="Close" id="mx"><i class="ti ti-x"></i></button></div>
   <div class="m-scroll"><div class="m-one${x.proof?'':' solo'}">
     <div><h4 style="font-size:13px;color:var(--muted);font-weight:500;margin-bottom:10px">Story</h4><p class="story">${x.story}</p>
       ${x.link?`<a class="m-link" href="${x.link.href}" data-go="${x.link.href}">${x.link.label} <i class="ti ti-arrow-right"></i></a>`:''}</div>
     ${x.proof?`<div><h4 style="font-size:13px;color:var(--muted);font-weight:500;margin-bottom:10px">Proof</h4>${proof}</div>`:''}</div></div>
   <div class="m-foot"><button id="mp"><i class="ti ti-arrow-left"></i>Previous</button><span class="nav-b">${OPEN.indexOf(i)+1} of ${OPEN.length}</span><button id="mn">Next<i class="ti ti-arrow-right"></i></button></div>`;
  if(!ov.classList.contains('open')){document.body.style.paddingRight=(innerWidth-document.documentElement.clientWidth)+'px';document.body.classList.add('locked');document.documentElement.classList.add('locked');}
  ov.classList.add('open');ov.setAttribute('aria-hidden','false');
  document.getElementById('mx').onclick=closeM;
  const k=OPEN.indexOf(i);document.getElementById('mp').onclick=()=>openM(OPEN[(k-1+OPEN.length)%OPEN.length]);
  document.getElementById('mn').onclick=()=>openM(OPEN[(k+1)%OPEN.length]);
}
function closeM(){ov.classList.remove('open');ov.setAttribute('aria-hidden','true');document.body.classList.remove('locked');document.documentElement.classList.remove('locked');document.body.style.paddingRight='';}
ov.onclick=e=>{if(e.target===ov)closeM();};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ov.classList.contains('open'))closeM();});
document.querySelectorAll('[data-i]').forEach(b=>b.addEventListener('click',()=>openM(+b.dataset.i)));
