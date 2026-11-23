/* lab.js: crystal-lattice hero, software emblems, periodic table and live simulations. Edit korar dorkar nai. */
function startLatticeSim(){
  const cv=document.getElementById('latticeSim'); if(!cv)return;
  cancelAnimationFrame(window._latRAF); removeEventListener('resize',window._latFit);
  const ctx=cv.getContext('2d'),N=4,dpr=Math.min(devicePixelRatio||1,2),pts=[],bonds=[];
  const rnd=()=>Math.random()*6.28, reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  for(let i=0;i<N;i++)for(let j=0;j<N;j++)for(let k=0;k<N;k++)
    pts.push({i,j,k,c:(i+j+k)%2,ph:[rnd(),rnd(),rnd()],f:[1+Math.random(),1+Math.random(),1+Math.random()],ox:0,oy:0,vx:0,vy:0});
  pts.forEach((a,x)=>pts.forEach((b,y)=>{if(y>x&&Math.abs(a.i-b.i)+Math.abs(a.j-b.j)+Math.abs(a.k-b.k)===1)bonds.push([a,b])}));
  let W,H,rot=.6,base=.6,tilt=-.42,mx=-999,my=-999,T=300,P=0;
  const fit=()=>{const r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};
  window._latFit=fit; fit(); addEventListener('resize',fit);
  const pIn=document.getElementById('pIn'),tIn=document.getElementById('tIn');
  const read=()=>{P=+pIn.value;T=+tIn.value;const s=1-.12*P/100;
    document.getElementById('pOut').textContent=P+' GPa · ΔV −'+Math.round((1-s*s*s)*100)+'%';
    document.getElementById('tOut').textContent=T+' K'};
  pIn.oninput=tIn.oninput=()=>{read();if(reduce)draw(0)}; read();
  cv.onpointermove=e=>{const r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top};
  cv.onpointerleave=()=>{mx=my=-999};
  function project(p,t){
    const s=1-.12*P/100,a=.16*Math.sqrt(T/1000)+.01,h=(N-1)/2;
    const x=(p.i-h)*s+a*Math.sin(t*p.f[0]*2.2+p.ph[0]),y=(p.j-h)*s+a*Math.sin(t*p.f[1]*2.2+p.ph[1]),z=(p.k-h)*s+a*Math.sin(t*p.f[2]*2.2+p.ph[2]);
    const cy=Math.cos(rot),sy=Math.sin(rot),cx=Math.cos(tilt),sx=Math.sin(tilt);
    const x1=x*cy+z*sy,z1=-x*sy+z*cy,y1=y*cx-z1*sx,z2=y*sx+z1*cx,f=1/(1-z2/14),u=W/(N+1.4);
    return {x:W/2+x1*u*f,y:H/2+y1*u*f,z:z2,f};
  }
  function draw(t){
    ctx.clearRect(0,0,W,H);
    const list=pts.map(p=>{const q=project(p,t);
      if(mx>-900){const dx=q.x+p.ox-mx,dy=q.y+p.oy-my,d=Math.hypot(dx,dy)||1;if(d<80){const f=(1-d/80)**2*3.2;p.vx+=dx/d*f;p.vy+=dy/d*f}}
      p.vx+=-p.ox*.06;p.vy+=-p.oy*.06;p.vx*=.84;p.vy*=.84;p.ox+=p.vx;p.oy+=p.vy;
      q.x+=p.ox;q.y+=p.oy;p.q=q;return p});
    ctx.lineWidth=1.4;
    bonds.forEach(([a,b])=>{const al=Math.max(.1,Math.min(.6,.2+.4*((a.q.f+b.q.f)/2-.8)));
      ctx.strokeStyle='rgba(227,196,109,'+al+')';ctx.beginPath();ctx.moveTo(a.q.x,a.q.y);ctx.lineTo(b.q.x,b.q.y);ctx.stroke()});
    list.sort((a,b)=>a.q.z-b.q.z).forEach(p=>{const q=p.q,r=W*.032*q.f;
      const g=ctx.createRadialGradient(q.x-r*.35,q.y-r*.35,r*.1,q.x,q.y,r);
      if(p.c){g.addColorStop(0,'#fff');g.addColorStop(.5,'#cfd9ff');g.addColorStop(1,'#5c74c9')}
      else{g.addColorStop(0,'#fff3c4');g.addColorStop(.5,'#e3c46d');g.addColorStop(1,'#8a6a1c')}
      ctx.globalAlpha=Math.max(.5,Math.min(1,.5+q.f*.4));ctx.fillStyle=g;ctx.beginPath();ctx.arc(q.x,q.y,r,0,6.283);ctx.fill()});
    ctx.globalAlpha=1;
  }
  function frame(ts){
    if(!document.body.contains(cv))return;
    base+=.0035; const hv=mx>-900;
    rot+=((hv?base+(mx/W-.5)*1.1:base)-rot)*.06;
    tilt+=((hv?-.42+(my/H-.5)*.45:-.42)-tilt)*.06;
    draw(ts/1000); window._latRAF=requestAnimationFrame(frame);
  }
  if(reduce){draw(0);return}
  if('IntersectionObserver' in window)new IntersectionObserver(([e])=>{cancelAnimationFrame(window._latRAF);if(e.isIntersecting)window._latRAF=requestAnimationFrame(frame)}).observe(cv);
  else window._latRAF=requestAnimationFrame(frame);
}

const EMB={
 wien2k:'<path class="emb-g" d="M32 15l15 8.5v17L32 49l-15-8.5v-17z"/><circle class="emb-g" cx="32" cy="32" r="6.5"/>',
 qe:'<ellipse class="emb-g" cx="32" cy="32" rx="17" ry="6.5"/><ellipse class="emb-g" cx="32" cy="32" rx="17" ry="6.5" transform="rotate(60 32 32)"/><ellipse class="emb-g" cx="32" cy="32" rx="17" ry="6.5" transform="rotate(120 32 32)"/><circle class="emb-f" cx="32" cy="32" r="3"/>',
 vasp:'<path class="emb-g" d="M32 15l15 8.5v17L32 49l-15-8.5v-17zM17 23.5l15 8.5 15-8.5M32 32v17"/>',
 castep:'<path class="emb-g" d="M13 32c3-12 7-12 9.5 0s6.5 12 9.5 0 6.5-12 9.5 0 6 12 9.5 0"/><path class="emb-g" d="M13 47h38" opacity=".5"/>',
 scaps:'<circle class="emb-f" cx="32" cy="25" r="6"/><path class="emb-g" d="M32 12v4M19 25h4M45 25h-4M22.5 15.5l2.8 2.8M41.5 15.5l-2.8 2.8"/><path class="emb-g" d="M19 38h26v9H19zM19 42.5h26M28 38v9M37 38v9"/>',
 comsol:'<path class="emb-g" d="M16 46l16-30 16 30zM24 31h16M20 38.5h24M32 16v30M24 31l8 15M40 31l-8 15"/>',
 lammps:'<path class="emb-g" d="M22 24l20-2-10 18zM22 24l-4 20M32 40l14 2"/><circle class="emb-f" cx="22" cy="24" r="4.5"/><circle class="emb-f" cx="42" cy="22" r="4.5"/><circle class="emb-f" cx="32" cy="40" r="4.5"/><circle class="emb-f" cx="46" cy="42" r="3.5"/><circle class="emb-f" cx="18" cy="44" r="3.5"/>',
 phon:'<circle class=\"emb-f\" cx=\"14\" cy=\"32\" r=\"5\"/><circle class=\"emb-f\" cx=\"50\" cy=\"32\" r=\"5\"/><path class=\"emb-g\" d=\"M19 32l5-10 8 20 8-20 5 10\"/>',
 therm:'<path class=\"emb-g\" d=\"M27 14a5 5 0 0110 0v22a10 10 0 11-10 0z\"/><path class=\"emb-g\" d=\"M32 26v20\"/><circle class=\"emb-f\" cx=\"32\" cy=\"46\" r=\"3\"/>'
};
function swLogo(s){
  const inner=EMB[s.icon]||`<text class="emb-t" x="32" y="38">${esc((s.abbr||s.name).slice(0,5))}</text>`;
  const emblem=`<svg viewBox="0 0 64 64" role="img" aria-label="${esc(s.name)}"><circle class="emb-bg" cx="32" cy="32" r="30"/>${inner}</svg>`;
  return s.logo?`<img src="${esc(s.logo)}" alt="${esc(s.name)} logo" onerror="this.outerHTML=decodeURIComponent('${encodeURIComponent(emblem)}')">`:emblem;
}

/* ===== PERIODIC TABLE ===== */
const SYM="H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og".split(" ");
const NAMES="Hydrogen Helium Lithium Beryllium Boron Carbon Nitrogen Oxygen Fluorine Neon Sodium Magnesium Aluminium Silicon Phosphorus Sulfur Chlorine Argon Potassium Calcium Scandium Titanium Vanadium Chromium Manganese Iron Cobalt Nickel Copper Zinc Gallium Germanium Arsenic Selenium Bromine Krypton Rubidium Strontium Yttrium Zirconium Niobium Molybdenum Technetium Ruthenium Rhodium Palladium Silver Cadmium Indium Tin Antimony Tellurium Iodine Xenon Caesium Barium Lanthanum Cerium Praseodymium Neodymium Promethium Samarium Europium Gadolinium Terbium Dysprosium Holmium Erbium Thulium Ytterbium Lutetium Hafnium Tantalum Tungsten Rhenium Osmium Iridium Platinum Gold Mercury Thallium Lead Bismuth Polonium Astatine Radon Francium Radium Actinium Thorium Protactinium Uranium Neptunium Plutonium Americium Curium Berkelium Californium Einsteinium Fermium Mendelevium Nobelium Lawrencium Rutherfordium Dubnium Seaborgium Bohrium Hassium Meitnerium Darmstadtium Roentgenium Copernicium Nihonium Flerovium Moscovium Livermorium Tennessine Oganesson".split(" ");
const MASS="1.008 4.0026 6.94 9.0122 10.81 12.011 14.007 15.999 18.998 20.180 22.990 24.305 26.982 28.085 30.974 32.06 35.45 39.95 39.098 40.078 44.956 47.867 50.942 51.996 54.938 55.845 58.933 58.693 63.546 65.38 69.723 72.630 74.922 78.971 79.904 83.798 85.468 87.62 88.906 91.224 92.906 95.95 98 101.07 102.91 106.42 107.87 112.41 114.82 118.71 121.76 127.60 126.90 131.29 132.91 137.33 138.91 140.12 140.91 144.24 145 150.36 151.96 157.25 158.93 162.50 164.93 167.26 168.93 173.05 174.97 178.49 180.95 183.84 186.21 190.23 192.22 195.08 196.97 200.59 204.38 207.2 208.98 209 210 222 223 226 227 232.04 231.04 238.03 237 244 243 247 247 251 252 257 258 259 266 267 268 269 270 277 278 281 282 285 286 289 290 293 294 294".split(" ");
const COL={alk:"#ff6b81",ae:"#ffa94d",tm:"#7f9bff",pt:"#4fd1c5",mtl:"#b197fc",nm:"#8ce99a",hal:"#ffd43b",ng:"#74c0fc",lan:"#f783ac",act:"#e599f7"};
const CN={alk:"Alkali metal",ae:"Alkaline earth metal",tm:"Transition metal",pt:"Post-transition metal",mtl:"Metalloid",nm:"Reactive nonmetal",hal:"Halogen",ng:"Noble gas",lan:"Lanthanide",act:"Actinide"};
const pos=z=>z===1?[1,1]:z===2?[1,18]:z<=4?[2,z-2]:z<=10?[2,z+8]:z<=12?[3,z-10]:z<=18?[3,z]:z<=36?[4,z-18]:z<=54?[5,z-36]:z<=56?[6,z-54]:z<=71?[9,z-54]:z<=86?[6,z-68]:z<=88?[7,z-86]:z<=103?[10,z-86]:[7,z-100];
const cat=z=>[3,11,19,37,55,87].includes(z)?"alk":[4,12,20,38,56,88].includes(z)?"ae":[2,10,18,36,54,86,118].includes(z)?"ng":[9,17,35,53,85,117].includes(z)?"hal":[5,14,32,33,51,52].includes(z)?"mtl":[1,6,7,8,15,16,34].includes(z)?"nm":z>=57&&z<=71?"lan":z>=89&&z<=103?"act":(z>=21&&z<=30)||(z>=39&&z<=48)||(z>=72&&z<=80)||(z>=104&&z<=112)?"tm":"pt";
const ELS=SYM.map((s,i)=>{const z=i+1,[r,c]=pos(z);return{z,s,n:NAMES[i],m:MASS[i],r,c,k:cat(z)}});
/* electron configuration: Madelung rule + known ground-state exceptions */
const SUB=[];for(let n=1;n<=7;n++)for(let l=0;l<=Math.min(3,n-1);l++)SUB.push([n,l]);
SUB.sort((a,b)=>a[0]+a[1]-b[0]-b[1]||a[0]-b[0]);
const EX={24:"3d5 4s1",29:"3d10 4s1",41:"4d4 5s1",42:"4d5 5s1",44:"4d7 5s1",45:"4d8 5s1",46:"4d10 5s0",47:"4d10 5s1",57:"4f0 5d1",58:"4f1 5d1",64:"4f7 5d1",78:"5d9 6s1",79:"5d10 6s1",89:"5f0 6d1",90:"5f0 6d2",91:"5f2 6d1",92:"5f3 6d1",93:"5f4 6d1",96:"5f7 6d1",103:"6d0 7p1"};
function cfg(z){const o={};let r=z;for(const[n,l]of SUB){const c=Math.min(r,2*(2*l+1));if(c>0)o[n+"spdf"[l]]=c;r-=c;if(r<=0)break}
  (EX[z]||"").split(" ").filter(Boolean).forEach(t=>o[t.slice(0,2)]=+t.slice(2));return o}
const shells=o=>{const s=[];for(const k in o){const n=+k[0]-1;s[n]=(s[n]||0)+o[k]}return s.filter(Boolean)};
function bohr(sh,col){let g=`<svg viewBox="0 0 300 300" aria-hidden="true"><defs><radialGradient id="ng"><stop offset="0" stop-color="${col}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient></defs><circle cx="150" cy="150" r="34" fill="url(#ng)"/><circle cx="150" cy="150" r="9" fill="${col}"/>`;
  sh.forEach((n,i)=>{const r=26+i*Math.min(36,116/Math.max(1,sh.length-1));g+=`<circle cx="150" cy="150" r="${r}" fill="none" stroke="currentColor" opacity=".2"/><g class="orb" style="animation-duration:${5+i*3.5}s;animation-direction:${i%2?"reverse":"normal"}">`;
    for(let k=0;k<n;k++){const a=2*Math.PI*k/n;g+=`<circle cx="${(150+r*Math.cos(a)).toFixed(1)}" cy="${(150+r*Math.sin(a)).toFixed(1)}" r="4" fill="${col}"/>`}g+="</g>"});return g+"</svg>"}

function initMaterials(){const COMPOUNDS=D.compounds;
$("pt").innerHTML=ELS.map(e=>`<button class="el" data-z="${e.z}" style="--r:${e.r};--cl:${e.c};--c:${COL[e.k]};--k:${e.r+e.c}" aria-label="${e.n}"><i>${e.z}</i><b>${e.s}</b><small>${e.n}</small></button>`).join("")+'<div class="gap" style="--r:6;--cl:3">57–71</div><div class="gap" style="--r:7;--cl:3">89–103</div><aside class="det sp" id="det" aria-live="polite"></aside>';
$("leg").innerHTML=Object.keys(CN).map(k=>`<button data-k="${k}" style="--c:${COL[k]}">${CN[k]}</button>`).join("");
$("comp").innerHTML=COMPOUNDS.map((c,i)=>`<button class="fb" data-i="${i}">${f(c[0])}</button>`).join("");
function sel(z){const e=ELS[z-1],col=COL[e.k],o=cfg(z),en=Object.entries(o).filter(x=>x[1]>0).sort((a,b)=>a[0][0]-b[0][0]||"spdf".indexOf(a[0][1])-"spdf".indexOf(b[0][1])),
    used=COMPOUNDS.filter(c=>c[1].split(" ").includes(e.s)),f9=e.r>8,blk=e.z===2?"s":f9?"f":e.c<=2?"s":e.c>=13?"p":"d";
  Q(".el.sel").forEach(x=>x.classList.remove("sel"));Q(`.el[data-z="${z}"]`)[0].classList.add("sel");
  $("det").style.setProperty("--c",col);
  $("det").innerHTML=`<div class="bohr">${bohr(shells(o),col)}</div><div><h3><span style="color:${col}">${e.s}</span> ${e.n}</h3><span class="pill">No. ${z}</span><span class="pill">${e.m} u</span><span class="pill">${CN[e.k]}</span><span class="pill">${f9?"f-block":"Group "+e.c}, period ${f9?e.r-3:e.r}, ${blk}-block</span><p class="cfg">${en.map(([k,v])=>k+"<sup>"+v+"</sup>").join(" ")}</p>${used.length?`<p class="used">Studied in: ${used.map(c=>f(c[0])).join(", ")}</p>`:""}</div>`}
const ALL=[...new Set(COMPOUNDS.flatMap(c=>c[1].split(" ")))],st={k:null,q:"",mine:0,set:null};
function flt(){const hi=st.set||(st.mine?ALL:null),m=[];
  Q(".el").forEach(c=>{const e=ELS[c.dataset.z-1],ok=(!st.k||e.k===st.k)&&(!st.q||(e.s+e.n+e.z).toLowerCase().includes(st.q))&&(!hi||hi.includes(e.s));
    c.classList.toggle("dim",!ok);c.classList.toggle("mine",!!hi&&hi.includes(e.s));if(ok)m.push(e.z)});
  if(st.q&&m.length===1)sel(m[0])}
$("pt").addEventListener("click",e=>{const b=e.target.closest(".el");if(b)sel(+b.dataset.z)});
$("eq").oninput=e=>{st.q=e.target.value.trim().toLowerCase();flt()};
$("leg").onclick=e=>{const b=e.target.closest("[data-k]");if(!b)return;st.k=st.k===b.dataset.k?null:b.dataset.k;Q("#leg button").forEach(x=>x.classList.toggle("on",x.dataset.k===st.k));flt()};
$("mine").onclick=()=>{st.mine=st.mine?0:1;st.set=null;$("mine").classList.toggle("on",!!st.mine);Q("#comp .fb").forEach(b=>b.classList.remove("on"));flt()};
$("comp").onclick=e=>{const b=e.target.closest("[data-i]");if(!b)return;const s=COMPOUNDS[+b.dataset.i][1].split(" "),same=st.set&&st.set.join()===s.join();
  st.set=same?null:s;st.mine=0;$("mine").classList.remove("on");Q("#comp .fb").forEach(x=>x.classList.toggle("on",x===b&&!same));flt();if(!same)sel(ELS.find(x=>x.s===s[0]).z)};
/* dock-style lens: cells grow as the pointer gets close */
if(!RM&&!CO){const pt=$("pt");
  pt.addEventListener("pointermove",e=>Q(".el",pt).forEach(c=>{const r=c.getBoundingClientRect(),d=Math.hypot(e.clientX-r.left-r.width/2,e.clientY-r.top-r.height/2),s=1+Math.max(0,1-d/120)*.5;c.style.transform=s>1.01?`scale(${s})`:"";c.style.zIndex=s>1.25?2:""}));
  pt.addEventListener("pointerleave",()=>Q(".el",pt).forEach(c=>{c.style.transform="";c.style.zIndex=""}))}
sel(72);reveal();
window.selEl=sel}

/* ===== COMPUTATIONAL LAB: live simulations of the codes ===== */
function initSims(){const gen=window._labGen=(window._labGen||0)+1;
const cv=$("sim"),x=cv.getContext("2d"),root=document.documentElement;
let W=0,H=0,k=0,T0=0,vis=false,auto=!RM,V={},C={},th="",pt={x:-9,y:-9},L,Tp,PW,PH;
const R=Array.from({length:70},()=>[Math.random()*2-1,Math.random()*2-1]);
const mk=(w,h)=>{const c=document.createElement("canvas");c.width=w;c.height=h;const q=c.getContext("2d");return[c,q,q.createImageData(w,h)]};
const [qc,qx,qi]=mk(72,54),[hc,hx2,hi]=mk(64,36);
const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),ez=f=>1-Math.pow(1-f,3),g=(e,m,s)=>Math.exp(-(((e-m)/s)**2)),sg=v=>1/(1+Math.exp(-v));
const CM=[[8,6,32],[85,20,110],[190,55,85],[246,130,25],[252,238,140]];
const cmap=f=>{f=cl(f,0,.9999)*4;const i=f|0,u=f-i,a=CM[i],b=CM[i+1];return[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u,a[2]+(b[2]-a[2])*u]};
const tx=(s,X,Y,c,sz,al)=>{x.fillStyle=c||C.m;x.font=`${sz||12}px Inter,sans-serif`;x.textAlign=al||"left";x.fillText(s,X,Y)};
const ln=(a,b,c,d,col,w,dash)=>{x.beginPath();x.moveTo(a,b);x.lineTo(c,d);x.strokeStyle=col;x.lineWidth=w||1;x.setLineDash(dash||[]);x.stroke();x.setLineDash([])};
const dot=(X,Y,r,c)=>{x.beginPath();x.arc(X,Y,r,0,7);x.fillStyle=c;x.fill()};
const ax=(xl,yl)=>{x.strokeStyle=C.l;x.lineWidth=1;x.setLineDash([]);x.strokeRect(L,Tp,PW,PH);tx(xl,L+PW/2,Tp+PH+34,C.m,12,"center");x.save();x.translate(L-36,Tp+PH/2);x.rotate(-Math.PI/2);tx(yl,0,0,C.m,12,"center");x.restore()};
const path=(f,a,b,n,mx,my,up,col)=>{x.beginPath();const m=Math.max(1,Math.floor(n*up));for(let i=0;i<=m;i++){const u=a+(b-a)*i/n,X=mx(u),Y=my(f(u));i?x.lineTo(X,Y):x.moveTo(X,Y)}x.strokeStyle=col;x.lineWidth=2.4;x.setLineDash([]);x.stroke()};
const ip=E=>{const a=[.8,1.1,1.34,1.5,1.8,2,2.3],b=[52,44,33,29,18,12,6];let i=0;while(i<5&&E>a[i+1])i++;return b[i]+(b[i+1]-b[i])*(cl(E,a[0],a[6])-a[i])/(a[i+1]-a[i])};

/* 1 VASP: ionic relaxation */
function vasp(t){const A=V.d/100,s=cl((t%10)/7.5,0,1),kk=1-ez(s),n=6,m=4,sx=W*.07,sy=H*.17,gx=W*.29-sx*2.5,gy=H*.2,P=[];
  for(let i=0;i<n;i++)for(let j=0;j<m;j++){const r=R[i*m+j];P.push([gx+i*sx+r[0]*sx*1.1*A*kk,gy+j*sy+r[1]*sy*1.1*A*kk])}
  for(let i=0;i<n;i++)for(let j=0;j<m;j++){const p=P[i*m+j];if(i<n-1){const q=P[(i+1)*m+j];ln(p[0],p[1],q[0],q[1],C.l,1.6)}if(j<m-1){const q=P[i*m+j+1];ln(p[0],p[1],q[0],q[1],C.l,1.6)}}
  P.forEach((p,q)=>dot(p[0],p[1],W*.017,((((q/m)|0)+q%m)%2)?C.a:C.p));
  tx("Atoms relax toward their equilibrium sites",W*.29,H*.9,C.m,13,"center");
  const N=30,Em=A*2.6+.001,E=u=>A*2.2*Math.exp(-u/6)*(1+.12*Math.sin(u*2.1)),mx=u=>L+PW*u/N,my=e=>Tp+PH*(1-e/Em);
  ax("Ionic step","Energy (eV)");path(E,0,N,N,mx,my,s,C.t);dot(mx(s*N),my(E(s*N)),5,C.a);
  tx(s>=1?"Converged: forces below 0.01 eV/Å":`Max force: ${(A*3*kk*kk).toFixed(3)} eV/Å`,L,Tp+PH+54,s>=1?C.t:C.m,13)}

/* 2 WIEN2k: muffin-tin + DOS */
function wien(t){const cx=W*.05,cy=H*.18,cw=W*.43,ch=H*.52,mid=cy+ch/2;
  x.strokeStyle=C.l;x.lineWidth=1.5;x.strokeRect(cx,cy,cw,ch);
  [[.25,C.t],[.75,C.a]].forEach(([u,c])=>{x.beginPath();x.arc(cx+cw*u,mid,ch*.3,0,7);x.fillStyle=c+"33";x.fill();x.strokeStyle=c;x.setLineDash([5,4]);x.lineWidth=1.5;x.stroke();x.setLineDash([]);dot(cx+cw*u,mid,6,c)});
  x.beginPath();for(let i=0;i<=260;i++){const u=i/260,d=Math.min(Math.abs(u-.25),Math.abs(u-.75)),gg=g(d,0,.1),y=mid+ch*.26*Math.sin(u*22-t*3)*(1-gg*.55)+gg*ch*.1*Math.sin(u*90-t*6);i?x.lineTo(cx+cw*u,y):x.moveTo(cx+cw*u,y)}
  x.strokeStyle=C.p;x.lineWidth=2;x.stroke();
  tx("Dashed circles: muffin-tin spheres with atomic-like waves",cx,cy+ch+22,C.m,12);tx("Between spheres: plane waves",cx,cy+ch+40,C.m,12);
  const up=cl(t/2.2,0,1),Eg=V.g,E0=-6,E1=Math.max(8,Eg+7),mx=e=>L+PW*(e-E0)/(E1-E0),my=d=>Tp+PH*(1-d/1.25),
    D=e=>(g(e,-1.4,.8)+.8*g(e,-3.6,.9)+.6*g(e,-5.3,.6))*sg(-e/.12)+(g(e,Eg+1.2,.7)+.7*g(e,Eg+3.4,.9)+.5*g(e,Eg+5.2,.8))*sg((e-Eg)/.12);
  ax("Energy (eV)","DOS (states/eV)");
  [[E0,0,C.t],[Eg,E1,C.a]].forEach(([a,b,c])=>{x.beginPath();x.moveTo(mx(a),my(0));for(let i=0;i<=120;i++){const e=a+(b-a)*i/120*up;x.lineTo(mx(e),my(D(e)))}x.lineTo(mx(a+(b-a)*up),my(0));x.fillStyle=c+"55";x.fill()});
  path(D,E0,E1,240,mx,my,up,C.p);ln(mx(0),Tp,mx(0),Tp+PH,C.m,1,[4,4]);tx("E_F",mx(0)+5,Tp+14,C.m,12);
  tx(`Band gap Eg = ${Eg.toFixed(1)} eV`,L,Tp+PH+54,C.p,13)}

/* 3 Quantum ESPRESSO: SCF charge density */
function qe(t){const b=V.b,kap=.2+b*.7,n=cl((t%12)/9,0,1)*16,res=Math.exp(-kap*n),sl=Math.cos(n*.9),d=qi.data,hx=W*.05,hy=H*.12,hw=W*.46,hh=hw*.75;
  for(let j=0;j<54;j++)for(let i=0;i<72;i++){const u=i/72,v=j/54,pc=(1+Math.cos(u*Math.PI*8))/2*(1+Math.cos(v*Math.PI*6))/2,rc=Math.pow(pc,2)*.85+.11*Math.sqrt(pc),r0=.32+.2*Math.sin(u*11+v*8),c=cmap((rc+(r0-rc)*res*sl)*1.05),o=(j*72+i)*4;d[o]=c[0];d[o+1]=c[1];d[o+2]=c[2];d[o+3]=255}
  qx.putImageData(qi,0,0);x.imageSmoothingEnabled=true;x.drawImage(qc,hx,hy,hw,hh);x.strokeStyle=C.l;x.strokeRect(hx,hy,hw,hh);
  tx("Electron density ρ(r)",hx+hw/2,hy+hh+22,C.m,13,"center");
  const lg=u=>-.869*kap*u,my=v=>Tp+PH*(-v)/8,mx=u=>L+PW*u/16,cur=lg(n);
  ax("SCF iteration","log10 ΔE (Ry)");ln(L,my(-6),L+PW,my(-6),C.m,1,[4,4]);tx("convergence threshold",L+PW-4,my(-6)-6,C.m,11,"right");
  path(u=>Math.max(lg(u),-8),0,16,32,mx,my,n/16,C.t);dot(mx(n),my(Math.max(cur,-8)),5,C.a);
  tx(cur<=-6?`Iteration ${Math.floor(n)}: SCF converged`:`Iteration ${Math.floor(n)}: ΔE = 1e${cur.toFixed(1)} Ry`,L,Tp+PH+54,cur<=-6?C.t:C.m,13)}

/* 4 CASTEP: optical absorption */
function cas(t){const Eg=V.g,e=.3+7.4*((t%12)/12),al=E=>E<Eg?0:(Math.sqrt(E-Eg)*.8+g(E,Eg+2.3,.7)+.6*g(E,Eg+4.6,.9))*(1-Math.exp(-(E-Eg)*8)),
    hue=E=>{const l=1240/E;return l>=380&&l<=700?`hsl(${270*(700-l)/320},90%,58%)`:C.m},mx=E=>L+PW*E/8,my=a=>Tp+PH*(1-a/2.6),a0=al(e),
    cx=W*.05,cw=W*.43,mid=H*.42,u0=.46,dc=a0*5;
  x.fillStyle=C.a+"22";x.fillRect(cx+cw*u0,H*.2,cw*(1-u0),H*.44);x.strokeStyle=C.a;x.lineWidth=1.2;x.strokeRect(cx+cw*u0,H*.2,cw*(1-u0),H*.44);tx("Semiconductor",cx+cw*(u0+(1-u0)/2),H*.2-8,C.a,12,"center");
  x.beginPath();for(let i=0;i<=420;i++){const u=i/420,am=H*.12*(u<u0?1:Math.exp(-dc*(u-u0)/(1-u0))),y=mid+am*Math.sin(e*u*cw*.05-t*7);i?x.lineTo(cx+cw*u,y):x.moveTo(cx+cw*u,y)}x.strokeStyle=hue(e);x.lineWidth=2.4;x.stroke();
  tx(`Photon ${e.toFixed(2)} eV, λ = ${Math.round(1240/e)} nm`,cx,H*.78,hue(e),13);tx(e<Eg?"Below the gap: passes through":"Above the gap: absorbed",cx,H*.78+20,C.m,13);
  ax("Photon energy (eV)","Absorption α (arb. units)");
  x.beginPath();x.moveTo(mx(0),my(0));for(let i=0;i<=200;i++){const E=8*i/200;x.lineTo(mx(E),my(al(E)))}x.lineTo(mx(8),my(0));x.fillStyle=C.a+"44";x.fill();path(al,0,8,200,mx,my,1,C.a);
  for(let i=0;i<48;i++){x.fillStyle=`hsl(${270*i/48},90%,58%)`;x.fillRect(mx(1.6+1.6*i/48),Tp+PH+4,mx(1.6+1.6/48)-mx(1.6)+1,8)}
  tx("visible",mx(2.4),Tp+PH-8,C.m,11,"center");ln(mx(e),Tp,mx(e),Tp+PH,hue(e),1.5);dot(mx(e),my(al(e)),5,hue(e));
  tx(`Band gap Eg = ${Eg.toFixed(1)} eV`,L,Tp+PH+54,C.a,13)}

/* 5 SCAPS-1D: layered solar cell + J-V */
function scaps(t){const Eg=V.g,Rs=V.r,jsc=ip(Eg),voc=Eg-.4,vt=.0388,j0=jsc/(Math.exp(voc/vt)-1),pts=[];let pm=0,mp=[0,0];
  for(let i=0;i<=90;i++){const J=jsc*.9995*i/90,Vv=vt*Math.log((jsc-J)/j0+1)-J*Rs/1000;if(Vv<0)break;pts.push([Vv,J]);if(Vv*J>pm){pm=Vv*J;mp=[Vv,J]}}
  const x0=W*.05,y0=H*.22,cw=W*.43,ch=H*.42,F=[.08,.14,.46,.2,.12],NM=["TCO","ETL","Absorber","HTL","Back"],K=[C.m,C.t,C.a,C.p,C.m],xs=[];let u=0;
  F.forEach((f,i)=>{const X=x0+cw*u;x.fillStyle=K[i]+(i%4?"66":"33");x.fillRect(X,y0,cw*f,ch);x.strokeStyle=K[i];x.lineWidth=1;x.strokeRect(X,y0,cw*f,ch);tx(NM[i],X+cw*f/2,y0+ch+18,C.m,i%4?12:11,"center");xs.push(X);u+=f});
  for(let i=0;i<12;i++){const p=(t*.45+i/12)%1,X=x0-W*.03+p*(cw*.6+W*.03),Y=y0+ch*(.08+.84*((i*.618)%1));ln(X-10,Y-3,X,Y,"#ffd43b",1.5);dot(X,Y,3.2,"#ffd43b")}
  for(let i=0;i<20;i++){const p=(t*.3+i/20)%1,xa=xs[2]+cw*.46*(.2+.6*Math.abs(R[i][0])),Y=y0+ch*(.12+.76*Math.abs(R[i+20][1]));
    dot(xa+(xs[1]+cw*.07-xa)*p,Y,3,"#74c0fc");dot(xa+(xs[3]+cw*.1-xa)*p,Y,3,"#ff6b81")}
  tx("Light →",x0,y0-12,"#ffd43b",12);tx("electrons go to the ETL, holes to the HTL",x0,y0+ch+42,C.m,12);
  const mx=v=>L+PW*v/2.1,my=j=>Tp+PH*(1-j/56);ax("Voltage (V)","Current density (mA/cm²)");
  x.fillStyle=C.t+"33";x.fillRect(L,my(mp[1]),mx(mp[0])-L,Tp+PH-my(mp[1]));
  x.beginPath();pts.forEach((p,i)=>i?x.lineTo(mx(p[0]),my(p[1])):x.moveTo(mx(p[0]),my(p[1])));x.strokeStyle=C.p;x.lineWidth=2.4;x.stroke();
  dot(mx(mp[0]),my(mp[1]),5+1.8*Math.sin(t*4),C.a);tx("MPP",mx(mp[0])+8,my(mp[1])-8,C.a,12);
  const vo=pts.length?pts[0][0]:0;tx(`Voc ${vo.toFixed(2)} V    Jsc ${jsc.toFixed(1)} mA/cm²`,L,Tp+PH+54,C.m,13);tx(`FF ${(pm/(vo*jsc)*100).toFixed(1)} %    PCE ${pm.toFixed(1)} %`,L,Tp+PH+74,C.t,13)}

/* 6 COMSOL: finite-element style heat conduction */
const GW=64,GH=36;let Tm=new Float32Array(GW*GH),Tn=new Float32Array(GW*GH);
const heat0=()=>{for(let j=0;j<GH;j++)for(let i=0;i<GW;i++)Tm[j*GW+i]=1.1*Math.exp(-(((i-20)/5)**2+((j-18)/5)**2))+.8*Math.exp(-(((i-44)/4)**2+((j-12)/4)**2))};
function comsol(t){const D=V.D,q=V.q,hx=W*.04,hy=H*.1,hw=W*.72,hh=hw*GH/GW;
  if(pt.x>hx&&pt.x<hx+hw&&pt.y>hy&&pt.y<hy+hh){const ci=(pt.x-hx)/hw*GW,cj=(pt.y-hy)/hh*GH;for(let j=Math.max(1,(cj-4)|0);j<Math.min(GH-1,cj+5);j++)for(let i=Math.max(1,(ci-4)|0);i<Math.min(GW-1,ci+5);i++)Tm[j*GW+i]+=.25*Math.exp(-(((i-ci)/2)**2+((j-cj)/2)**2))}
  for(let s=0;s<3;s++){for(const p of[18*GW+20,12*GW+44]){Tm[p]+=.12*q;Tm[p+1]+=.12*q;Tm[p+GW]+=.12*q;Tm[p+GW+1]+=.12*q}for(let j=1;j<GH-1;j++)for(let i=1;i<GW-1;i++){const p=j*GW+i;Tn[p]=Tm[p]+D*(Tm[p-1]+Tm[p+1]+Tm[p-GW]+Tm[p+GW]-4*Tm[p])}const sw=Tm;Tm=Tn;Tn=sw}
  let mT=0;const d=hi.data;for(let p=0;p<GW*GH;p++){const v=Tm[p];if(v>mT)mT=v;const c=cmap(v/1.2),o=p*4;d[o]=c[0];d[o+1]=c[1];d[o+2]=c[2];d[o+3]=255}
  hx2.putImageData(hi,0,0);x.imageSmoothingEnabled=true;x.drawImage(hc,hx,hy,hw,hh);
  x.beginPath();for(let i=0;i<=GW;i+=4){x.moveTo(hx+hw*i/GW,hy);x.lineTo(hx+hw*i/GW,hy+hh)}for(let j=0;j<=GH;j+=4){x.moveTo(hx,hy+hh*j/GH);x.lineTo(hx+hw,hy+hh*j/GH)}
  for(let j=0;j<GH;j+=4)for(let i=0;i<GW;i+=4){x.moveTo(hx+hw*i/GW,hy+hh*j/GH);x.lineTo(hx+hw*(i+4)/GW,hy+hh*(j+4)/GH)}
  x.strokeStyle="rgba(255,255,255,.14)";x.lineWidth=1;x.stroke();
  for(let i=0;i<40;i++){x.fillStyle=`rgb(${cmap(1-i/40).map(Math.round)})`;x.fillRect(W*.8,hy+hh*i/40,W*.035,hh/40+1)}
  tx("500 K",W*.84,hy+10,C.m,11);tx("293 K",W*.84,hy+hh,C.m,11);tx("T",W*.8,hy-6,C.m,12);
  tx(`Peak temperature ${Math.round(293+Math.min(mT,1.2)/1.2*207)} K`,hx,hy+hh+22,C.p,13);tx("Move the cursor over the plate to heat it. Edges are held cold.",hx,hy+hh+42,C.m,12)}

/* 7 Phonopy: phonon branches of a diatomic chain */
function phon(t){const mu=V.m,q=V.q*Math.PI,S=1+1/mu,wf=qq=>{const d=Math.sqrt(Math.max(0,S*S-4*Math.sin(qq/2)**2/mu));return[Math.sqrt(Math.max(0,S-d)),Math.sqrt(S+d)]},[wa,wo]=wf(q),wm=Math.sqrt(2*S),
    sp=W*.03,r1=W*.011,r2=r1*Math.cbrt(mu),x0=W*.29-8*sp;
  const chain=(yc,w,name,c)=>{let A=2*Math.cos(q/2),B=2-w*w;const nm=Math.max(Math.abs(A),Math.abs(B))||1;A/=nm;B/=nm;tx(name,W*.29,yc-H*.1,c,13,"center");
    const P=[];for(let n=0;n<8;n++){P.push([x0+2*n*sp+sp*.38*A*Math.cos(q*n-w*t*2.2),r1,C.p]);P.push([x0+(2*n+1)*sp+sp*.38*B*Math.cos(q*(n+.5)-w*t*2.2),r2,C.a])}
    for(let i=0;i<15;i++)ln(P[i][0],yc,P[i+1][0],yc,C.l,2);P.forEach(p=>dot(p[0],yc,p[1],p[2]))};
  chain(H*.32,wa,"Acoustic mode: neighbours move together",C.t);chain(H*.64,wo,"Optical mode: neighbours move against each other",C.a);
  const mx=u=>L+PW*u/Math.PI,my=w=>Tp+PH*(1-w/(wm*1.08));ax("Wave vector, Γ to X","Frequency ω (arb. units)");tx("Γ",L,Tp+PH+16,C.m,12,"center");tx("X",L+PW,Tp+PH+16,C.m,12,"center");
  path(u=>wf(u)[0],0,Math.PI,90,mx,my,1,C.t);path(u=>wf(u)[1],0,Math.PI,90,mx,my,1,C.a);ln(mx(q),Tp,mx(q),Tp+PH,C.m,1,[4,4]);dot(mx(q),my(wa),5,C.t);dot(mx(q),my(wo),5,C.a);
  const[ga,go]=wf(Math.PI);tx(mu>1.05?`Gap at X: ${(go-ga).toFixed(2)}`:"Equal masses: the gap closes at X",L,Tp+PH+54,C.m,13)}

/* 8 BoltzTraP: Seebeck and power factor */
function boltz(t){const Eg=V.g,kt=8.617e-5*V.T,m0=-.3,m1=Eg+.3,mu=m0+(m1-m0)*(.5-.5*Math.cos(t*.5)),
    sn=z=>z>=0?-86.17*(z+2):-172.34/(1-z*.6),spp=z=>z>=0?86.17*(z+2):172.34/(1-z*.6),cn=z=>z>=0?Math.exp(-z):1+Math.pow(-z,1.5),
    F=m=>{const a=(Eg-m)/kt,b=m/kt,nn=cn(a),pp=cn(b),S=(sn(a)*nn+spp(b)*pp)/(nn+pp);return[S,S*S*(nn+pp)]};
  let pm=0;for(let i=0;i<=140;i++)pm=Math.max(pm,F(m0+(m1-m0)*i/140)[1]);
  const mx=m=>L+PW*(m-m0)/(m1-m0),mS=s=>Tp+PH*(.5-cl(s,-600,600)/1200),mP=p=>Tp+PH*(1-.9*p/pm),[S,P]=F(mu);
  const bx=W*.05,by=H*.3,bw=W*.43,bh=H*.2,gr=x.createLinearGradient(bx,0,bx+bw,0);gr.addColorStop(0,"#ff6b81");gr.addColorStop(1,"#74c0fc");
  x.globalAlpha=.4;x.fillStyle=gr;x.fillRect(bx,by,bw,bh);x.globalAlpha=1;x.strokeStyle=C.l;x.lineWidth=1.2;x.strokeRect(bx,by,bw,bh);
  tx("Hot side",bx,by-10,"#ff6b81",13);tx("Cold side",bx+bw,by-10,"#74c0fc",13,"right");
  for(let i=0;i<36;i++){const p=(t*.22+i/36)%1;dot(bx+bw*p,by+bh*(.1+.8*Math.abs(R[i][1])),3.2,S<0?"#74c0fc":"#ff6b81")}
  tx(S<0?"−":"+",bx+bw+14,by+bh/2+6,C.i,20,"center");tx(S<0?"+":"−",bx-14,by+bh/2+6,C.i,20,"center");
  tx(`Dominant carriers: ${S<0?"electrons (S < 0)":"holes (S > 0)"}`,bx,by+bh+28,C.m,13);tx(`Voltage for ΔT = 100 K: ${(Math.abs(S)*.1).toFixed(1)} mV`,bx,by+bh+48,C.p,13);
  ax("Chemical potential μ (eV)","Seebeck S (µV/K)");x.fillStyle=C.m+"22";x.fillRect(mx(0),Tp,mx(Eg)-mx(0),PH);tx("VBM",mx(0)-4,Tp+14,C.m,11,"right");tx("CBM",mx(Eg)+4,Tp+14,C.m,11);
  ln(L,mS(0),L+PW,mS(0),C.m,1,[3,4]);path(m=>F(m)[0],m0,m1,140,mx,mS,1,C.t);path(m=>F(m)[1],m0,m1,140,mx,mP,1,C.a);
  ln(mx(mu),Tp,mx(mu),Tp+PH,C.i,1,[4,3]);dot(mx(mu),mS(S),5,C.t);dot(mx(mu),mP(P),5,C.a);
  tx("Seebeck S",L,Tp+PH+54,C.t,13);tx("Power factor (normalised)",L+PW*.3,Tp+PH+54,C.a,13)}

/* LAMMPS: 2D Lennard-Jones molecular dynamics */
const MN=64;let MX=[],MY=[],MVX=[],MVY=[],ML=1;const mh=new Float32Array(40);
function md0(){ML=Math.sqrt(MN/.78);const n=8,a=ML/n;MX=[];MY=[];MVX=[];MVY=[];for(let i=0;i<MN;i++){MX.push((i%n+.5)*a);MY.push(((i/n)|0)*a+a/2);MVX.push(Math.random()-.5);MVY.push(Math.random()-.5)}mh.fill(0)}
function lammps(t){const Tt=V.T,dt=.004,fx=new Float32Array(MN),fy=new Float32Array(MN);
  for(let s=0;s<5;s++){fx.fill(0);fy.fill(0);
    for(let i=0;i<MN;i++)for(let j=i+1;j<MN;j++){let dx=MX[i]-MX[j],dy=MY[i]-MY[j];dx-=ML*Math.round(dx/ML);dy-=ML*Math.round(dy/ML);const r2=dx*dx+dy*dy;
      if(r2<6.25&&r2>.04){const i2=1/r2,i6=i2*i2*i2,F=Math.min(24*i6*(2*i6-1)*i2,60);fx[i]+=F*dx;fy[i]+=F*dy;fx[j]-=F*dx;fy[j]-=F*dy}}
    let ke=0;for(let i=0;i<MN;i++){MVX[i]+=fx[i]*dt;MVY[i]+=fy[i]*dt;ke+=MVX[i]**2+MVY[i]**2}
    const lam=Math.sqrt(1+.05*(Tt/Math.max(ke/(2*MN),.01)-1));
    for(let i=0;i<MN;i++){MVX[i]*=lam;MVY[i]*=lam;MX[i]=(MX[i]+MVX[i]*dt+ML)%ML;MY[i]=(MY[i]+MVY[i]*dt+ML)%ML}}
  const hh=new Float32Array(40),rho=MN/(ML*ML);
  for(let i=0;i<MN;i++)for(let j=i+1;j<MN;j++){let dx=MX[i]-MX[j],dy=MY[i]-MY[j];dx-=ML*Math.round(dx/ML);dy-=ML*Math.round(dy/ML);const r=Math.hypot(dx,dy);if(r<3)hh[(r/3*40)|0]++}
  for(let b=0;b<40;b++){const r1=b*.075,r2=r1+.075;mh[b]=mh[b]*.94+2*hh[b]/(MN*rho*Math.PI*(r2*r2-r1*r1))*.06}
  const bs=Math.min(W*.44,H*.78),bx=W*.05,by=H*.1,sc=bs/ML;x.strokeStyle=C.l;x.lineWidth=1.2;x.strokeRect(bx,by,bs,bs);
  for(let i=0;i<MN;i++){const sp=Math.hypot(MVX[i],MVY[i]);dot(bx+MX[i]*sc,by+MY[i]*sc,sc*.46,`hsl(${210-Math.min(1,sp/2.4)*190},85%,62%)`)}
  tx("2D Lennard-Jones atoms, coloured by speed",bx,by+bs+22,C.m,12);
  const mx=r=>L+PW*r/3,my=g=>Tp+PH*(1-g/3.5);ax("r / σ","g(r)");ln(L,my(1),L+PW,my(1),C.m,1,[4,4]);path(r=>Math.min(3.4,mh[Math.min(39,(r/3*40)|0)]),.04,3,80,mx,my,1,C.p);
  tx(`T* = ${Tt.toFixed(2)}: ${Tt<.3?"crystal-like order":Tt<.8?"melting, short-range order":"liquid-like"}`,L,Tp+PH+54,C.p,13)}
const sw=k=>(D.software.find(x=>x.icon===k)||{}).description||"";
const TL=[
 {n:"WIEN2k",s:"All-electron FP-LAPW",f:wien,e:"wien2k",c:[["g","Band gap"," eV",.2,3,1.4,.1]],d:sw("wien2k")+" Here: muffin-tin spheres and plane waves, and the density of states they give."},
 {n:"Quantum ESPRESSO",s:"Plane waves, pseudopotentials",f:qe,e:"qe",c:[["b","Mixing β","",.1,.9,.5,.05]],d:sw("qe")+" Here: the self-consistent cycle mixes the charge density until the energy stops changing."},
 {n:"VASP",s:"PAW plane-wave DFT",f:vasp,e:"vasp",c:[["d","Initial distortion","%",0,60,35,1]],d:sw("vasp")+" Here: atoms relax until the forces vanish."},
 {n:"CASTEP",s:"Optical properties",f:cas,e:"castep",c:[["g","Band gap"," eV",.5,4,1.8,.1]],d:sw("castep")+" Here: absorption switches on once the photon energy passes the band gap."},
 {n:"SCAPS-1D",s:"Solar-cell device",f:scaps,e:"scaps",c:[["g","Absorber gap"," eV",.9,2.2,1.4,.05],["r","Series resistance"," Ω·cm²",0,6,1,.1]],d:sw("scaps")+" Here: a layered cell with ETL and HTL, and its J–V curve."},
 {n:"COMSOL Multiphysics",s:"Finite elements",f:comsol,i0:heat0,e:"comsol",c:[["D","Thermal diffusivity","",.05,.24,.16,.01],["q","Heat sources","",0,1,.6,.05]],d:sw("comsol")+" Here: heat spreads across a meshed plate with cold edges. Move the cursor over it."},
 {n:"LAMMPS",s:"Molecular dynamics",f:lammps,i0:md0,e:"lammps",c:[["T","Temperature","",.05,1.5,.5,.05]],d:sw("lammps")+" Here: a 2D Lennard-Jones solid melts as the temperature rises, and g(r) shows the order."},
 {n:"Phonons",s:"Lattice dynamics",f:phon,e:"phon",c:[["q","Wave vector q","π/a",.05,.98,.4,.01],["m","Mass ratio m2/m1","",1,4,2,.1]],d:"Phonon dispersion and lattice dynamics: atoms vibrate in acoustic and optical modes, and imaginary frequencies would signal a dynamical instability."},
 {n:"Thermoelectrics",s:"Boltzmann transport",f:boltz,e:"therm",c:[["T","Temperature"," K",100,900,300,10],["g","Band gap"," eV",.2,1.5,.6,.05]],d:"Thermoelectric transport: the Seebeck coefficient, conductivity and power factor against chemical potential."}];
$("tabs").innerHTML=TL.map((o,i)=>`<button data-i="${i}" role="tab"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="emb-bg" cx="32" cy="32" r="30"/>${EMB[o.e]}</svg><span>${o.n}<small>${o.s}</small></span></button>`).join("");
function pick(i,user){k=i;T0=performance.now();if(user)auto=false;Q("#tabs button").forEach((b,j)=>b.classList.toggle("on",j===i));
  const o=TL[i];$("stn").textContent=o.n;$("sts").textContent=o.s;$("std").textContent=o.d;V={};
  $("ctl").innerHTML=o.c.map(c=>{V[c[0]]=c[5];return`<label>${c[1]} <input type="range" data-id="${c[0]}" min="${c[3]}" max="${c[4]}" step="${c[6]}" value="${c[5]}" aria-label="${c[1]}"><b id="v-${c[0]}">${c[5]}${c[2]}</b></label>`}).join("");
  if(o.i0)o.i0()}
$("ctl").oninput=e=>{const id=e.target.dataset.id;if(!id)return;V[id]=+e.target.value;$("v-"+id).textContent=e.target.value+TL[k].c.find(c=>c[0]===id)[2];auto=false};
$("tabs").onclick=e=>{const b=e.target.closest("button");if(b)pick(+b.dataset.i,1)};
cv.addEventListener("pointermove",e=>{const r=cv.getBoundingClientRect();pt.x=(e.clientX-r.left)/r.width*W;pt.y=(e.clientY-r.top)/r.height*H});
cv.addEventListener("pointerleave",()=>{pt.x=-9});
const sz=()=>{const d=devicePixelRatio||1;W=cv.clientWidth;H=cv.clientHeight;cv.width=W*d;cv.height=H*d;x.setTransform(d,0,0,d,0,0)};
new ResizeObserver(sz).observe(cv);new IntersectionObserver(es=>{vis=es[0].isIntersecting}).observe(cv);
const col=()=>{const q=getComputedStyle(root),v=n=>q.getPropertyValue(n).trim();C={p:v("--pri"),t:v("--teal"),a:v("--amb"),i:v("--ink"),m:v("--mute"),l:v("--line")};th=root.dataset.theme};
pick(0);
(function loop(now){if(gen!==window._labGen)return;requestAnimationFrame(loop);if(!vis||!W)return;if(th!==root.dataset.theme||!C.p)col();
  x.clearRect(0,0,W,H);L=W*.58;Tp=H*.1;PW=W*.37;PH=H*.66;const t=RM?5:(now-T0)/1000;TL[k].f(t);
  if(auto&&t>11)pick((k+1)%TL.length,0)})(0);
}
