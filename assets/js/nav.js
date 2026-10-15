// Shared behaviour for every page: sliding nav indicator, page transitions,
// sticky header glass, and links that change page with the same transition.
// nav slider + page transitions
(function(){
  const nav=document.querySelector('.nav'); if(!nav) return;
  const ind=document.createElement('span'); ind.className='ind no-anim'; nav.prepend(ind);
  const place=a=>{ind.style.width=a.offsetWidth+'px'; ind.style.transform='translateX('+a.offsetLeft+'px)';};
  const cur=()=>nav.querySelector('a.on');
  const init=()=>{ const c=cur(); if(c){ place(c); requestAnimationFrame(()=>requestAnimationFrame(()=>ind.classList.remove('no-anim'))); } };
  const reflow=()=>{ const c=cur(); if(!c) return; const anim=!ind.classList.contains('no-anim'); ind.classList.add('no-anim'); place(c); if(anim) requestAnimationFrame(()=>requestAnimationFrame(()=>ind.classList.remove('no-anim'))); };
  init();
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(reflow);
  addEventListener('load',reflow);
  addEventListener('resize',reflow);
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>{
    const href=a.getAttribute('href');
    if(a.classList.contains('on')||!href||href==='#'){ e.preventDefault(); return; }
    e.preventDefault();
    nav.querySelectorAll('a').forEach(x=>x.classList.toggle('on',x===a)); place(a);
    if(reduce){ location.href=href; return; }
    document.body.classList.add('leaving');
    setTimeout(()=>{ location.href=href; },420);
  }));
  addEventListener('pageshow',e=>{ if(e.persisted){ document.body.classList.remove('leaving'); const c=nav.querySelector('a[href="'+location.pathname.split('/').pop()+'"]'); if(c){ nav.querySelectorAll('a').forEach(x=>x.classList.toggle('on',x===c)); place(c);} } });
})();

(function(){const top=document.querySelector('.top');if(!top)return;const f=()=>top.classList.toggle('stuck',scrollY>8);addEventListener('scroll',f,{passive:true});f();})();

// in-page links that lead to another page reuse the nav slider transition
document.addEventListener('click',e=>{const a=e.target.closest('a[data-go]');if(!a)return;e.preventDefault();
  const ov=document.getElementById('ov');if(ov&&ov.classList.contains('open')){ov.classList.remove('open');document.body.classList.remove('locked');document.documentElement.classList.remove('locked');document.body.style.paddingRight='';}
  const t=document.querySelector('.nav a[href="'+a.dataset.go+'"]');if(t)t.click();else location.href=a.dataset.go;});
