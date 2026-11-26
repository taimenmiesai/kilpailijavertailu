// Valikko ja kuvien suurennus, kaikilla sivuilla
(function(){
  var tg=document.querySelector('.navtoggle'),nav=document.querySelector('.mainnav'),st=document.querySelector('.subtoggle');
  tg.addEventListener('click',function(){var o=nav.classList.toggle('open');tg.setAttribute('aria-expanded',o);});
  var hs=st.closest('.has-sub'),tm=null,desk=window.matchMedia('(min-width:1001px)');
  function openSub(){clearTimeout(tm);if(!desk.matches)return;hs.classList.add('open');st.setAttribute('aria-expanded','true');}
  function closeSub(d){clearTimeout(tm);tm=setTimeout(function(){hs.classList.remove('open');st.setAttribute('aria-expanded','false');},d);}
  hs.addEventListener('mouseenter',function(){hs.classList.remove('esc');openSub();});
  hs.addEventListener('mouseleave',function(){closeSub(350);});
  hs.addEventListener('focusin',function(){if(!hs.classList.contains('esc'))openSub();});
  hs.addEventListener('focusout',function(e){if(!hs.contains(e.relatedTarget)){hs.classList.remove('esc');closeSub(0);}});
  st.addEventListener('click',function(e){e.stopPropagation();if(desk.matches){hs.classList.remove('esc');openSub();return;}st.setAttribute('aria-expanded',st.getAttribute('aria-expanded')!=='true');});
  document.addEventListener('click',function(e){if(!e.target.closest('.has-sub')){hs.classList.remove('open');st.setAttribute('aria-expanded','false');}});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&hs.contains(document.activeElement)){st.focus();hs.classList.add('esc');hs.classList.remove('open');st.setAttribute('aria-expanded','false');}});
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');hs.classList.remove('open');a.blur();tg.setAttribute('aria-expanded','false');st.setAttribute('aria-expanded','false');});});
})();

(function(){
  var d=document.getElementById('lb');if(!d)return;var im=d.querySelector('img');
  document.querySelectorAll('figure img').forEach(function(i){
    i.addEventListener('click',function(){ im.src=i.src; im.alt=i.alt; d.showModal(); });
  });
  d.addEventListener('click',function(){ d.close(); });
})();
