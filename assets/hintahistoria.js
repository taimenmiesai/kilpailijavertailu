// Hintavertailun hintahistoria
(function(){
  var ST={a:{n:'Kilpailija A',c:'var(--ka)'},b:{n:'Kilpailija B',c:'var(--kb)'},c:{n:'Kilpailija C',c:'var(--kc)'}};
  // Keksitty data. nyt = 26.11.2026; muutokset = esimerkkihistoria [päivä (1=27.10.), hinta ennen tätä päivää]
  var H={
    'anturi-s4':{a:[1890],b:[1690,[16,1790]],c:[1749,[24,1849]]},
    'anturi-s4hd':{a:[2090],b:[1790,[16,1890]],c:[1890,[24,1990]]},
    'plotteri-9':{a:[899,[6,949]],b:[1149,[28,1349]],c:[869,[24,949]]},
    'luotain-7':{a:[389,[6,419]],b:[419,[28,479]],c:[379,[24,419]]},
    'avokela-3000':{a:[89.9,[6,109]],b:[99],c:[84.9,[28,99.9]]},
    'jigi-14':{a:[18.9],b:[19.9],c:[12.9,[31,19.9],[10,21.9]]},
    'vaappu-12':{a:[17.9],b:[17.5]},
    'perhokela-5':{a:[329],c:[279,[20,309]]}
  };
  var N=31, START=Date.UTC(2026,9,27), DAY=864e5;
  function series(spec){var now=spec[0],ch=spec.slice(1).sort(function(a,b){return b[0]-a[0];}),out=[];
    for(var d=1;d<=N;d++){var p=now;ch.forEach(function(c){if(d<c[0])p=c[1];});out.push(p);}return out;}
  function fmt(v){return v.toLocaleString('fi-FI',{minimumFractionDigits:v%1?2:0,maximumFractionDigits:2})+' €';}
  function chart(id){
    var data=H[id],keys=Object.keys(data),W=760,Hh=240,L=64,R=110,T=14,B=28,all=[];
    var ser={};keys.forEach(function(k){ser[k]=series(data[k]);all=all.concat(ser[k]);});
    var mn=Math.min.apply(null,all),mx=Math.max.apply(null,all),pad=(mx-mn)*0.12||mx*0.05;mn=Math.max(0,mn-pad);mx=mx+pad;
    var x=function(i){return L+i*(W-L-R)/(N-1);},y=function(v){return T+(mx-v)/(mx-mn)*(Hh-T-B);};
    var g='';
    for(var t=0;t<=4;t++){var v=mn+(mx-mn)*t/4,yy=y(v);g+='<line class="grid" x1="'+L+'" x2="'+(W-R)+'" y1="'+yy+'" y2="'+yy+'"/><text x="'+(L-8)+'" y="'+(yy+4)+'" text-anchor="end">'+Math.round(v).toLocaleString('fi-FI')+' €</text>';}
    [0,7,14,21,30].forEach(function(i){var d=new Date(START+i*DAY);g+='<text x="'+x(i)+'" y="'+(Hh-8)+'" text-anchor="middle">'+d.getUTCDate()+'.'+(d.getUTCMonth()+1)+'.</text>';});
    var used=[];
    keys.forEach(function(k){var s=ser[k],pts=s.map(function(v,i){return x(i)+','+y(v);});
      var dash=pts.slice(0,N-1).join(' '),last=pts.slice(N-2).join(' ');
      g+='<polyline fill="none" stroke="'+ST[k].c+'" stroke-width="2" stroke-dasharray="5 4" points="'+dash+'"/>';
      g+='<polyline fill="none" stroke="'+ST[k].c+'" stroke-width="2.5" points="'+last+'"/>';
      var ly=y(s[N-1]);used.forEach(function(u){if(Math.abs(u-ly)<14)ly=u+14;});used.push(ly);
      g+='<circle cx="'+x(N-1)+'" cy="'+y(s[N-1])+'" r="4.5" fill="'+ST[k].c+'"><title>'+ST[k].n+' 26.11.2026: '+fmt(s[N-1])+' (havainto)</title></circle>';
      g+='<text class="lbl" x="'+(x(N-1)+10)+'" y="'+(ly+4)+'" style="fill:'+ST[k].c+'">'+ST[k].n+' '+fmt(s[N-1])+'</text>';
      s.forEach(function(v,i){if(i<N-1)g+='<circle cx="'+x(i)+'" cy="'+y(v)+'" r="6" fill="transparent"><title>'+ST[k].n+' '+new Date(START+i*DAY).getUTCDate()+'.'+(new Date(START+i*DAY).getUTCMonth()+1)+'.: '+fmt(v)+' (esimerkki)</title></circle>';});
    });
    var leg='<div class="histlegend">'+keys.map(function(k){return '<span><i style="background:'+ST[k].c+'"></i>'+ST[k].n+'</span>';}).join('')+'<span><i class="dash"></i>Esimerkki 27.10.–25.11.</span><span>● Havainto 26.11.</span><span class="badge demo">Esimerkkidata</span></div>';
    return leg+'<svg class="histchart" viewBox="0 0 '+W+' '+Hh+'" role="img" aria-label="Hintahistoria 27.10.–26.11.2026. Kaikki hinnat ovat keksittyjä.">'+g+'</svg>';
  }
  document.querySelectorAll('#hinnat tr[data-pid] .histbtn').forEach(function(b){
    b.addEventListener('click',function(){
      var tr=b.closest('tr'),nx=tr.nextElementSibling,open=b.getAttribute('aria-expanded')==='true';
      if(open){if(nx&&nx.classList.contains('hist'))nx.remove();b.setAttribute('aria-expanded','false');return;}
      var h=document.createElement('tr');h.className='hist';h.innerHTML='<td colspan="5">'+chart(tr.dataset.pid)+'</td>';
      tr.after(h);b.setAttribute('aria-expanded','true');
    });
  });
})();
