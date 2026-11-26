// Kampanja-arkiston kalenteri
(function(){
  var WHO={oma:{n:'Omat',c:'var(--oma)'},a:{n:'Kilpailija A',c:'var(--ka)'},b:{n:'Kilpailija B',c:'var(--kb)'},c:{n:'Kilpailija C',c:'var(--kc)'}};
  // Kaikki kampanjat ovat keksittyjä. real: true = etusivuhavainto 26.11.2026; false = esimerkki
  var C=[
    {who:'a',s:'2026-09-01',e:'2026-09-30',t:'Karttakorttikampanja',ch:'Etusivu',real:true,f:{'Lähde':'Etusivun alatunnisteen linkki ”Karttakortit edullisemmin 1.–30.9.”','Kesto':'1.–30.9.2026'}},
    {who:'a',s:'2026-11-01',e:'2026-11-30',t:'Musta marraskuu',ch:'Etusivu',real:true,f:{'Otsikko':'”Satoja tuotteita edullisemmin koko marraskuun”','Kesto':'Koko marraskuu','Alennus':'Ei prosentteja etusivulla','Tuotteet':'Kalastus, veneily, perhokalastus, retkeily','Keinot':'Niukkuus (”rajattu erä”), 30 päivän hintatakuu'}},
    {who:'a',s:'2026-11-26',e:'2026-12-31',t:'Anturi S4 – ennakkovaraus',ch:'Etusivu',real:true,f:{'Otsikko':'”Uusi anturi S4 nyt ennakkovarattavissa”','Kesto':'Havaittu 26.11., jatkuu toistaiseksi (loppu arvio)','Alennus':'Ei alennusta: S4 1 890 €, S4 HD 2 090 €','Huomio':'Kilpailija B:llä samat anturit 200–300 € halvemmalla'}},
    {who:'b',s:'2026-11-23',e:'2026-11-30',t:'Black Friday 2026',ch:'Etusivu',real:true,f:{'Otsikko':'”Black Friday 23.–30.11.”','Kesto':'23.–30.11.2026','Alennus':'ALE −10…−40 %, 380 tuotetta','Tuotteet':'Painopiste vaatteissa','Keinot':'Hero-karuselli, kampanjamerkki tuotekuvissa'}},
    {who:'c',s:'2026-11-26',e:'2026-11-29',t:'Black Week',ch:'Etusivu',real:true,f:{'Otsikko':'”Black Week”','Kesto':'Havaittu 26.11., lähtölaskuri 4 päivää → päättyy n. 29.11. Alkupäivä ei tiedossa.','Alennus':'Kategoriat −15…−30 %','Keinot':'Lähtölaskurit, yliviivatut ennen-hinnat, Supertarjoukset'}},
    {who:'c',s:'2026-11-26',e:'2026-11-26',t:'Päivän tarjous: Jigi 14 cm',ch:'Etusivu',real:true,f:{'Tarjous':'Jigi 14 cm 110 g 12,90 € (A 18,90 €, B 19,90 €)','Kesto':'Yksi päivä, vaihtuu päivittäin'}},
    {who:'c',s:'2026-11-26',e:'2026-12-08',t:'Elektroniikan joulutarjoukset',ch:'Etusivu',real:true,f:{'Kesto':'Havaittu 26.11., lähtölaskuri 13 päivää → päättyy n. 8.12.','Tuotteet':'Karttaplotteri 9″ 869 € (ennen 949 €), Kaikuluotain 7″ 379 € (ennen 419 €)'}},
    {who:'c',s:'2026-11-24',e:'2026-11-24',t:'Uutiskirje: Black Week on täällä',ch:'Sähköposti',real:false,f:{'Aiherivi':'”Black Week on täällä – jopa −30 %”','Lähetetty':'ma 24.11.2026 klo 8.00','CTA':'”Katso kaikki tarjoukset”'}},
    {who:'a',s:'2026-11-20',e:'2026-11-20',t:'Uutiskirje: ennakko kanta-asiakkaille',ch:'Sähköposti',real:false,f:{'Aiherivi':'”Kanta-asiakkaana pääset ostoksille ennen muita”','Lähetetty':'to 20.11.2026 klo 16.00'}},
    {who:'b',s:'2026-11-14',e:'2026-11-14',t:'Uutiskirje: Joululahjaopas kalastajalle',ch:'Sähköposti',real:false,f:{'Aiherivi':'”Lahjaideoita kalastajalle alle 50 €”','Lähetetty':'pe 14.11.2026 klo 10.00'}},
    {who:'b',s:'2026-12-01',e:'2026-12-23',t:'Lahjaksi-kampanja',ch:'Etusivu',real:false,f:{'Kesto':'1.–23.12.2026','Tuotteet':'Lahjaksi-valikko, monitoimityökalut, perhonsidontasetit'}},
    {who:'oma',s:'2026-09-14',e:'2026-09-27',t:'Oma: Syksyn petokalaviikot',ch:'Verkkokauppa',real:false,f:{'Alennus':'−20 % vieheistä','Tuotteet':'Hauki- ja kuhavieheet'}},
    {who:'oma',s:'2026-11-24',e:'2026-11-30',t:'Oma: Black Friday',ch:'Verkkokauppa',real:false,f:{'Alennus':'−15…−40 %','Tuotteet':'Kelat, luotaimet, vaatteet'}},
    {who:'oma',s:'2026-11-27',e:'2026-11-27',t:'Oma uutiskirje: Black Friday',ch:'Sähköposti',real:false,f:{'Aiherivi':'”Black Friday alkoi – parhaat tarjoukset kalastajalle”'}},
    {who:'oma',s:'2026-12-01',e:'2026-12-24',t:'Oma: Joulukalenteri',ch:'Verkkokauppa',real:false,f:{'Alennus':'Päivän luukku, vaihtuva tarjous','Tuotteet':'Joka päivä eri tuote'}},
    // 2025 (esimerkki, vertailua varten)
    {who:'a',s:'2025-11-01',e:'2025-11-30',t:'Musta marraskuu 2025',ch:'Etusivu',real:false,f:{'Kesto':'Koko marraskuu 2025'}},
    {who:'b',s:'2025-11-24',e:'2025-12-01',t:'Black Friday 2025',ch:'Etusivu',real:false,f:{'Kesto':'24.11.–1.12.2025'}},
    {who:'c',s:'2025-11-21',e:'2025-11-30',t:'Black Week 2025',ch:'Etusivu',real:false,f:{'Kesto':'21.–30.11.2025'}},
    {who:'c',s:'2025-12-01',e:'2025-12-01',t:'Cyber Monday 2025',ch:'Sähköposti',real:false,f:{'Aiherivi':'”Cyber Monday – viimeinen mahdollisuus”'}},
    {who:'oma',s:'2025-11-27',e:'2025-12-01',t:'Oma: Black Friday 2025',ch:'Verkkokauppa',real:false,f:{'Alennus':'−15…−30 %'}},
    {who:'oma',s:'2025-12-01',e:'2025-12-24',t:'Oma: Joulukalenteri 2025',ch:'Verkkokauppa',real:false,f:{}},
    // Vuoden muut kampanjat (esimerkki): talvi, kevät, kesä ja syksy
    {who:'a',s:'2026-01-02',e:'2026-01-18',t:"Tammikuun ale",ch:'Etusivu',real:false,f:{"Alennus": "−20…−50 %", "Tuotteet": "Talvivaatteet ja joulun jäännöserät"}},
    {who:'b',s:'2026-01-10',e:'2026-02-28',t:"Pilkkikausi alkaa",ch:'Etusivu',real:false,f:{"Alennus": "Pilkkipaketit −15 %", "Tuotteet": "Pilkit, kairat, pilkkivavat, jäänaskalit"}},
    {who:'c',s:'2026-01-15',e:'2026-01-15',t:"Uutiskirje: Talven pilkkiopas",ch:'Sähköposti',real:false,f:{"Aiherivi": "”Näin onnistut pilkillä – 10 vinkkiä”", "CTA": "”Lue opas”"}},
    {who:'c',s:'2026-02-02',e:'2026-02-15',t:"Talvikalastusviikot",ch:'Etusivu',real:false,f:{"Alennus": "−20 % talvikalastukseen", "Keinot": "Lähtölaskuri, päivän tarjous"}},
    {who:'oma',s:'2026-01-05',e:'2026-01-25',t:"Oma: Alennusmyynti",ch:'Verkkokauppa',real:false,f:{"Alennus": "−30…−60 %", "Tuotteet": "Vaatteet ja edellisen kauden kelat"}},
    {who:'oma',s:'2026-02-09',e:'2026-02-22',t:"Oma: Pilkkiviikot",ch:'Verkkokauppa',real:false,f:{"Alennus": "−15 % pilkkitarvikkeista"}},
    {who:'a',s:'2026-02-14',e:'2026-02-14',t:"Ystävänpäivä: lahjakortti +10 %",ch:'Sähköposti',real:false,f:{"Aiherivi": "”Anna kalakaverille lahjakortti – saat 10 % kaupan päälle”"}},
    {who:'a',s:'2026-03-01',e:'2026-03-31',t:"Kevätkauden uutuudet",ch:'Etusivu',real:false,f:{"Tuotteet": "Uudet vavat ja kelat, perhokalastuksen uutuudet", "Alennus": "Ei alennusta, uutuusnosto"}},
    {who:'b',s:'2026-03-14',e:'2026-03-29',t:"Perhokalastuskausi",ch:'Etusivu',real:false,f:{"Alennus": "Perhosiimat −20 %", "Tuotteet": "Perhovavat, siimat, sidontatarvikkeet"}},
    {who:'c',s:'2026-03-20',e:'2026-04-05',t:"Spring Sale",ch:'Etusivu',real:false,f:{"Alennus": "−15…−35 %", "Huomio": "Englanninkielinen kampanjanimi"}},
    {who:'oma',s:'2026-03-16',e:'2026-03-29',t:"Oma: Kevään perhokalastus",ch:'Verkkokauppa',real:false,f:{"Alennus": "−20 % perhoista"}},
    {who:'b',s:'2026-04-02',e:'2026-04-06',t:"Pääsiäistarjoukset",ch:'Etusivu',real:false,f:{"Alennus": "−10 % kaikesta", "Keinot": "Koodi verkkokauppaan"}},
    {who:'a',s:'2026-04-16',e:'2026-04-16',t:"Uutiskirje: Jäidenlähtö ja rantakalastus",ch:'Sähköposti',real:false,f:{"Aiherivi": "”Jäät lähtivät – nyt rannalle!”"}},
    {who:'c',s:'2026-04-20',e:'2026-05-10',t:"Veneilykausi",ch:'Etusivu',real:false,f:{"Alennus": "Elektroniikka −10…−25 %", "Tuotteet": "Luotaimet, karttaplotterit, sähkömoottorit"}},
    {who:'oma',s:'2026-04-27',e:'2026-05-10',t:"Oma: Veneilijän kevät",ch:'Verkkokauppa',real:false,f:{"Alennus": "−15 % veneilytarvikkeista"}},
    {who:'a',s:'2026-05-01',e:'2026-05-01',t:"Vappukampanja: ilmainen toimitus",ch:'Etusivu',real:false,f:{"Alennus": "Ilmainen toimitus kaikkiin tilauksiin"}},
    {who:'b',s:'2026-05-25',e:'2026-06-07',t:"Haukijahti",ch:'Etusivu',real:false,f:{"Tuotteet": "Haukivieheet, perukkeet, kahvat", "Alennus": "Osta 3 maksa 2"}},
    {who:'a',s:'2026-06-01',e:'2026-06-21',t:"Kesäkauden avaus",ch:'Etusivu',real:false,f:{"Alennus": "−20 % kesävaatteista", "Tuotteet": "Kalastusliivit, aurinkolasit, hyttyssuojat"}},
    {who:'c',s:'2026-06-08',e:'2026-06-28',t:"Midsommar Deals",ch:'Etusivu',real:false,f:{"Alennus": "−15…−40 %", "Keinot": "Päivän tarjous, lähtölaskuri"}},
    {who:'oma',s:'2026-06-15',e:'2026-06-28',t:"Oma: Juhannus",ch:'Verkkokauppa',real:false,f:{"Alennus": "−20 % mökkikalastukseen"}},
    {who:'oma',s:'2026-06-18',e:'2026-06-18',t:"Oma uutiskirje: Juhannuksen kalavinkit",ch:'Sähköposti',real:false,f:{"Aiherivi": "”Juhannuksen 5 varmaa kalapaikkaa”"}},
    {who:'b',s:'2026-06-22',e:'2026-07-12',t:"Lomakalastajan paketit",ch:'Etusivu',real:false,f:{"Tuotteet": "Aloittelijan virvelisetit ja lasten vavat", "Alennus": "Setit alk. 39 €"}},
    {who:'a',s:'2026-07-01',e:'2026-07-31',t:"Heinäkuun kesäale",ch:'Etusivu',real:false,f:{"Alennus": "Satoja tuotteita, ei prosentteja", "Keinot": "Rajattu erä"}},
    {who:'c',s:'2026-07-06',e:'2026-07-06',t:"Uutiskirje: Summer Sale −50 %",ch:'Sähköposti',real:false,f:{"Aiherivi": "”Summer Sale – jopa −50 %”"}},
    {who:'c',s:'2026-07-06',e:'2026-07-26',t:"Summer Sale",ch:'Etusivu',real:false,f:{"Alennus": "−20…−50 %"}},
    {who:'oma',s:'2026-07-13',e:'2026-08-02',t:"Oma: Kesäale",ch:'Verkkokauppa',real:false,f:{"Alennus": "−20…−50 %"}},
    {who:'b',s:'2026-08-01',e:'2026-08-16',t:"Rapukausi",ch:'Etusivu',real:false,f:{"Tuotteet": "Rapumerdat, rapukattilat, juhlatarvikkeet", "Alennus": "Merrat 3 kpl −20 %"}},
    {who:'a',s:'2026-08-10',e:'2026-08-23',t:"Kesän loppuunmyynti",ch:'Etusivu',real:false,f:{"Alennus": "−30…−60 %", "Tuotteet": "Kesävaatteet ja kesän mallisto"}},
    {who:'c',s:'2026-08-17',e:'2026-08-31',t:"Back to Fishing",ch:'Etusivu',real:false,f:{"Alennus": "−15 % syksyn vieheistä"}},
    {who:'b',s:'2026-09-07',e:'2026-09-27',t:"Syksyn petokalakausi",ch:'Etusivu',real:false,f:{"Alennus": "Jigit ja vaaput −20 %", "Tuotteet": "Kuha- ja haukivieheet"}},
    {who:'c',s:'2026-09-14',e:'2026-09-14',t:"Uutiskirje: Syksyn jigiopas",ch:'Sähköposti',real:false,f:{"Aiherivi": "”Syksyn parhaat jigit kuhalle”"}},
    {who:'c',s:'2026-10-01',e:'2026-10-18',t:"Lokakuun luotainviikot",ch:'Etusivu',real:false,f:{"Alennus": "Luotaimet −10…−20 %", "Tuotteet": "Kaikuluotaimet ja anturit"}},
    {who:'a',s:'2026-10-05',e:'2026-10-25',t:"Metsästys- ja kalastussyksy",ch:'Etusivu',real:false,f:{"Tuotteet": "Maastovaatteet, otsalamput, kahluuhousut", "Alennus": "−15 %"}},
    {who:'oma',s:'2026-10-12',e:'2026-10-25',t:"Oma: Luotainviikot",ch:'Verkkokauppa',real:false,f:{"Alennus": "−10 % luotaimista, ilmainen asennusohje"}},
    {who:'b',s:'2026-10-26',e:'2026-11-08',t:"Talvivarusteet esiin",ch:'Etusivu',real:false,f:{"Tuotteet": "Untuvatakit, kengät, pipot", "Alennus": "Ei alennusta, kausinosto"}},
    {who:'b',s:'2026-10-30',e:'2026-10-30',t:"Uutiskirje: Black Friday tulee",ch:'Sähköposti',real:false,f:{"Aiherivi": "”Merkitse kalenteriin: Black Friday 23.11.”"}},
    {who:'a',s:'2025-01-02',e:'2025-01-19',t:"Tammikuun ale 2025",ch:'Etusivu',real:false,f:{"Alennus": "−20…−50 %"}},
    {who:'b',s:'2025-01-13',e:'2025-02-23',t:"Pilkkikausi 2025",ch:'Etusivu',real:false,f:{"Alennus": "Pilkkipaketit −10 %"}},
    {who:'c',s:'2025-03-24',e:'2025-04-06',t:"Spring Sale 2025",ch:'Etusivu',real:false,f:{"Alennus": "−15…−30 %"}},
    {who:'a',s:'2025-03-01',e:'2025-03-31',t:"Kevätkauden uutuudet 2025",ch:'Etusivu',real:false,f:{}},
    {who:'oma',s:'2025-03-17',e:'2025-03-30',t:"Oma: Kevään perhokalastus 2025",ch:'Verkkokauppa',real:false,f:{"Alennus": "−15 % perhoista"}},
    {who:'c',s:'2025-06-09',e:'2025-06-22',t:"Midsommar Deals 2025",ch:'Etusivu',real:false,f:{"Alennus": "−15…−30 %"}},
    {who:'a',s:'2025-06-02',e:'2025-06-22',t:"Kesäkauden avaus 2025",ch:'Etusivu',real:false,f:{}},
    {who:'oma',s:'2025-06-16',e:'2025-06-29',t:"Oma: Juhannus 2025",ch:'Verkkokauppa',real:false,f:{"Alennus": "−15 %"}},
    {who:'b',s:'2025-08-01',e:'2025-08-17',t:"Rapukausi 2025",ch:'Etusivu',real:false,f:{}},
    {who:'c',s:'2025-07-07',e:'2025-07-27',t:"Summer Sale 2025",ch:'Etusivu',real:false,f:{"Alennus": "−20…−40 %"}},
    {who:'oma',s:'2025-07-14',e:'2025-08-03',t:"Oma: Kesäale 2025",ch:'Verkkokauppa',real:false,f:{"Alennus": "−20…−40 %"}},
    {who:'b',s:'2025-09-08',e:'2025-09-28',t:"Syksyn petokalakausi 2025",ch:'Etusivu',real:false,f:{}},
    {who:'oma',s:'2025-10-13',e:'2025-10-26',t:"Oma: Luotainviikot 2025",ch:'Verkkokauppa',real:false,f:{}},
    {who:'a',s:'2025-10-06',e:'2025-10-26',t:"Metsästys- ja kalastussyksy 2025",ch:'Etusivu',real:false,f:{}}
  ];
  C.forEach(function(c,i){c.id=i;});
  var DAY=864e5, TODAY=Date.UTC(2026,10,26);
  function P(d){var a=d.split('-');return Date.UTC(+a[0],+a[1]-1,+a[2]);}
  function F(t){var d=new Date(t);return d.getUTCDate()+'.'+(d.getUTCMonth()+1)+'.'+d.getUTCFullYear();}
  function shiftY(t,y){var d=new Date(t);return Date.UTC(d.getUTCFullYear()+y,d.getUTCMonth(),d.getUTCDate());}
  var $=function(id){return document.getElementById(id);};
  var sel=null;

  function active(){var o={};document.querySelectorAll('.calctl input[data-who]').forEach(function(x){o[x.dataset.who]=x.checked;});return o;}

  function buildCal(from,to,title){
    var n=Math.round((to-from)/DAY)+1, on=active();
    var root=document.createElement('div');root.className='calwrap';
    var cal=document.createElement('div');cal.className='cal';cal.style.setProperty('--n',n);cal.style.setProperty('--minw',(96+n*16)+'px');
    root.appendChild(cal);
    var tt=document.createElement('div');tt.className='cal-title';tt.textContent=title;cal.appendChild(tt);
    var head=document.createElement('div');head.className='cal-head';head.innerHTML='<div></div>';
    var days=document.createElement('div');days.className='days';
    for(var i=0;i<n;i++){var t=from+i*DAY,d=new Date(t),el=document.createElement('div'),dow=d.getUTCDay();
      if(dow===0||dow===6)el.className='wknd';
      if(d.getUTCDate()===1||i===0){el.className+=' mstart';el.innerHTML=d.getUTCDate()+'<br>'+['tammi','helmi','maalis','huhti','touko','kesä','heinä','elo','syys','loka','marras','joulu'][d.getUTCMonth()];}
      else el.textContent=d.getUTCDate();
      days.appendChild(el);}
    head.appendChild(days);cal.appendChild(head);
    var any=false;
    Object.keys(WHO).forEach(function(w){
      if(!on[w])return; any=true;
      var lane=document.createElement('div');lane.className='cal-lane';
      lane.innerHTML='<div class="lname"><span class="dot" style="background:'+WHO[w].c+';margin:5px 0 0"></span>'+WHO[w].n+'</div>';
      var tr=document.createElement('div');tr.className='track';
      var items=C.filter(function(c){return c.who===w&&P(c.e)>=from&&P(c.s)<=to;}).sort(function(a,b){return P(a.s)-P(b.s);});
      var rows=[];
      items.forEach(function(c){
        var s=Math.max(P(c.s),from),e=Math.min(P(c.e),to),r=0;
        while(rows[r]!==undefined&&rows[r]>=s)r++; rows[r]=e;
        var b=document.createElement('button');b.type='button';
        b.className='cal-bar'+(c.real?'':' demo')+(c.ch==='Sähköposti'?' mail':'')+(sel===c.id?' sel':'');
        b.style.setProperty('--c',WHO[w].c);
        b.style.left=((s-from)/DAY/n*100)+'%';b.style.width='calc('+(((e-s)/DAY+1)/n*100)+'% - 2px)';
        b.style.top=(8+r*24)+'px';
        b.textContent=(c.ch==='Sähköposti'?'✉ ':'')+c.t;
        b.title=c.t+' ('+F(P(c.s))+'–'+F(P(c.e))+')'+(c.real?'':' – esimerkki');
        b.setAttribute('aria-label',WHO[w].n+': '+b.title);
        b.addEventListener('click',function(){show(c);});
        tr.appendChild(b);
      });
      tr.style.minHeight=(16+Math.max(1,rows.length)*24)+'px';
      if(TODAY>=from&&TODAY<=to){var td=document.createElement('div');td.className='cal-today';td.style.left=((TODAY-from)/DAY/n*100+0.5/n*100)+'%';tr.appendChild(td);}
      lane.appendChild(tr);cal.appendChild(lane);
    });
    if(!any){var em=document.createElement('div');em.className='calempty';em.textContent='Valitse vähintään yksi kilpailija tai omat kampanjat.';cal.appendChild(em);}
    return root;
  }

  function show(c){
    sel=c.id;var d=$('c-detail');d.hidden=false;d.style.setProperty('--c',WHO[c.who].c);
    var f=Object.assign({'Kilpailija':WHO[c.who].n,'Kanava':c.ch,'Ajankohta':F(P(c.s))+(c.s!==c.e?' – '+F(P(c.e)):'')},c.f);
    d.innerHTML='<span class="badge '+(c.real?'real">Havainto 26.11.':'demo">Esimerkki')+'</span><h4>'+c.t+'</h4><dl>'+Object.keys(f).map(function(k){return '<dt>'+k+'</dt><dd>'+f[k]+'</dd>';}).join('')+'</dl>';
    render(true);
  }

  function days(w,from,to){var set={},cnt=0;C.forEach(function(c){if(c.who!==w||c.ch==='Sähköposti')return;var s=Math.max(P(c.s),from),e=Math.min(P(c.e),to);for(var t=s;t<=e;t+=DAY)set[t]=1;});for(var k in set)cnt++;return cnt;}
  function count(w,from,to){return C.filter(function(c){return c.who===w&&P(c.e)>=from&&P(c.s)<=to;}).length;}

  function render(keepDetail){
    var from=P($('c-from').value),to=P($('c-to').value);
    if(!(from<=to)){$('c-cals').innerHTML='<div class="calempty">Alkupäivän pitää olla ennen loppupäivää.</div>';return;}
    var box=$('c-cals');box.innerHTML='';
    box.appendChild(buildCal(from,to,F(from)+' – '+F(to)));
    var cmp=$('c-cmp').checked;
    if(cmp){var pf=shiftY(from,-1),pt=shiftY(to,-1);box.appendChild(buildCal(pf,pt,'Edellinen vuosi: '+F(pf)+' – '+F(pt)));}
    var tf=(TODAY>=from&&TODAY<=to)?(TODAY-from)/(to-from+DAY):0;
    var wraps=box.querySelectorAll('.calwrap');
    wraps.forEach(function(wr){if(wr.scrollWidth>wr.clientWidth&&tf>0){var c=wr.firstChild;wr.scrollLeft=Math.max(0,96+tf*(c.scrollWidth-96)-wr.clientWidth/2);}
      wr.addEventListener('scroll',function(){wraps.forEach(function(o){if(o!==wr&&Math.abs(o.scrollLeft-wr.scrollLeft)>1)o.scrollLeft=wr.scrollLeft;});});});
    $('c-cmpwrap').hidden=!cmp;
    if(cmp){var on=active(),pf2=shiftY(from,-1),pt2=shiftY(to,-1);
      var h='<thead><tr><th></th><th class="num">Kampanjoita '+new Date(from).getUTCFullYear()+'</th><th class="num">Kampanjapäiviä</th><th class="num">Kampanjoita '+new Date(pf2).getUTCFullYear()+'</th><th class="num">Kampanjapäiviä</th><th class="num">Muutos (pv)</th></tr></thead><tbody>';
      Object.keys(WHO).forEach(function(w){if(!on[w])return;var a=days(w,from,to),b=days(w,pf2,pt2),dd=a-b;
        h+='<tr><td><span class="dot" style="background:'+WHO[w].c+'"></span>'+WHO[w].n+'</td><td class="num">'+count(w,from,to)+'</td><td class="num">'+a+'</td><td class="num">'+count(w,pf2,pt2)+'</td><td class="num">'+b+'</td><td class="num">'+(dd>0?'+':'')+dd+'</td></tr>';});
      $('c-cmptable').innerHTML=h+'</tbody>';}
    if(!keepDetail&&sel!==null){var c=C[sel];if(!(P(c.e)>=from&&P(c.s)<=to)||!active()[c.who]){sel=null;$('c-detail').hidden=true;}}
  }

  $('c-preset').addEventListener('change',function(){var v=this.value;if(v==='custom')return;var a=v.split('|');$('c-from').value=a[0];$('c-to').value=a[1];render();});
  ['c-from','c-to'].forEach(function(id){$(id).addEventListener('change',function(){$('c-preset').value='custom';render();});});
  $('c-cmp').addEventListener('change',function(){render();});
  document.querySelectorAll('.calctl input[data-who]').forEach(function(x){x.addEventListener('change',function(){render();});});
  function view(cal){$('arch-cal').hidden=!cal;$('arch-list').hidden=cal;$('v-cal').setAttribute('aria-pressed',cal);$('v-list').setAttribute('aria-pressed',!cal);}
  $('v-cal').addEventListener('click',function(){view(true);});
  $('v-list').addEventListener('click',function(){view(false);});
  render();
})();
