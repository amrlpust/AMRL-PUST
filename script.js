/* script.js: content.js theke pura page banay + shob animation. Edit korar dorkar nai. */
const $=id=>document.getElementById(id),Q=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const f=s=>esc(s).replace(/(WIEN2k)|([A-Za-z])(\d+)(?![\da-z.])/g,(m,w,a,b)=>w||a+"<sub>"+b+"</sub>");
const clone=x=>JSON.parse(JSON.stringify(x));
let D=clone(LAB);const ORIG=clone(LAB);
const RM=matchMedia("(prefers-reduced-motion:reduce)").matches,CO=matchMedia("(pointer:coarse)").matches;
let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
const ph=s=>/\[/.test(s||"");                       /* "[Name]" jaygar placeholder site e dekhabe na */
const ini=n=>{const w=String(n||"A").replace(/[\[\]]/g,"").split(/\s+/).filter(x=>x&&!/^(md\.?|dr\.?|mr\.?|mrs\.?|ms\.?|prof\.?)$/i.test(x));return((w[0]||"A")[0]+(w.length>1?w[w.length-1][0]:"")).toUpperCase()};
const img=(src,n,c)=>src?`<img class="${c}" src="${esc(src)}" alt="${esc(n)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'ini ${c}',textContent:'${esc(ini(n))}'}))">`:`<div class="ini ${c}">${esc(ini(n))}</div>`;
const ul=a=>`<ul class="cl">${(a||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`;
const links=x=>{const L=[["Personal website",x.website],["Google Scholar",x.scholar],["ORCID",x.orcid],["ResearchGate",x.researchgate],["LinkedIn",x.linkedin]].filter(l=>l[1]);return L.length?`<div class="chips">${L.map(l=>`<a href="${esc(l[1])}" target="_blank" rel="noopener noreferrer">${esc(l[0])}</a>`).join("")}</div>`:""};
const head=(k,t)=>`<h2 class="sh" data-r><small>${esc(k)}</small><span class="sc">${esc(t)}</span></h2>`;

/* ================= SECTIONS (prottek ekta part) ================= */
const SEC=[];
/* 1 HOME */
SEC.push(d=>{const h=d.hero;return`<section class="hero" id="home"><div class="hero-in"><div class="hl"><p class="kick">${esc(h.institution)}</p>
<h1 aria-label="${esc(h.title)}">${h.title.split(" ").map((w,i)=>`<span class="w" aria-hidden="true" style="--i:${i}">${esc(w)}</span>`).join(" ")}</h1>
<p class="lead">${esc(h.description)}</p><p class="ticker" id="ticker" aria-hidden="true"></p>
<div class="cta"><a class="btn" href="#research">Explore research</a><a class="btn g" href="#opportunities">Join the lab</a><a class="btn g" href="${esc(d.site.portal)}" target="_blank" rel="noopener noreferrer">Member login ↗</a></div></div>
<div class="sim"><canvas id="latticeSim" aria-label="Interactive crystal lattice simulation"></canvas>
<div class="sim-hud"><label>Pressure <output id="pOut">0 GPa</output><input id="pIn" type="range" min="0" max="100" value="0"></label><label>Temperature <output id="tOut">300 K</output><input id="tIn" type="range" min="0" max="1000" step="10" value="300"></label></div>
<div class="sim-note">Move the cursor over the crystal and drag the sliders</div></div></div>
<div class="wrap"><div class="grid hl3">${d.highlights.map((x,i)=>`<article class="sp tilt" data-r style="--d:${i}"><div class="num">${String(i+1).padStart(2,"0")}</div><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p></article>`).join("")}</div>
<div class="stats" data-r>${d.stats.items.map(x=>`<div class="stat"><strong data-n="${esc(x.value)}">0</strong><span>${esc(x.label)}</span></div>`).join("")}</div><p class="stats-note">${esc(d.stats.note)}</p></div></section>`});
/* 2 ABOUT */
SEC.push(d=>`<section class="s alt" id="about"><div class="wrap">${head("About us","Vision, mission and history")}<div class="cols"><div data-r><h3>Vision</h3><p class="muted">${esc(d.about.vision)}</p><h3 style="margin-top:20px">Mission</h3><p class="muted">${esc(d.about.mission)}</p></div>
<ul class="tl">${d.about.history.filter(x=>!ph(x)).map(x=>{const[a,...b]=x.split(" — ");return b.length?`<li data-r><div class="d">${esc(a)}</div><div class="sp"><p style="margin:0">${esc(b.join(" — "))}</p></div></li>`:`<li data-r><div class="sp"><p style="margin:0">${esc(x)}</p></div></li>`}).join("")}</ul></div></div></section>`);
/* 3 PRINCIPAL INVESTIGATOR */
SEC.push(d=>{const p=d.pi;return`<section class="s" id="pi"><div class="wrap">${head("Principal Investigator","Leading the laboratory")}<div class="pi" data-r><div class="pfig sp tilt">${img(p.photo,p.name,"portrait")}</div>
<div><h3 class="pname">${esc(p.name)}</h3><p class="muted">${esc(p.position)}</p><div class="cols"><div><b>Education</b>${ul(p.education)}</div><div><b>Research experience</b>${ul(p.experience)}</div></div><b>Awards and scholarships</b>${ul(p.awards)}<p class="small">${esc(p.metrics)}<br>${esc(p.supervision)}</p>${links(p)}</div></div></div></section>`});
/* 4 RESEARCH */
SEC.push(d=>`<section class="s alt" id="research"><div class="wrap">${head("Research areas","What we study")}<p class="lead" data-r style="font-size:17px;margin-bottom:18px">Our work connects atomic-scale simulation with the properties that matter for real devices.</p>
<div class="grid">${d.research.map((x,i)=>`<article class="sp tilt" data-r style="--d:${i%3}"><div class="num">${String(i+1).padStart(2,"0")}</div><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p></article>`).join("")}</div></div></section>`);
/* 5 MATERIALS (periodic table) */
SEC.push(d=>`<section class="s" id="materials"><div class="wrap">${head("Materials","Elements in our research")}<p class="lead" data-r style="font-size:17px;margin-bottom:16px">Click any element to see its electron shells. “Our research” lights up every element in the compounds we have studied.</p>
<div class="ptools" data-r><input id="eq" type="search" placeholder="Search element, symbol or number" aria-label="Search elements"><button class="fb" id="mine">Our research</button></div><div id="leg" data-r></div>
<div id="pt-wrap"><div class="pt" id="pt" data-r></div></div><h3 class="sub">Compounds studied in the lab</h3><div id="comp" data-r></div></div></section>`);
/* 6 PEOPLE */
const tagsOf=x=>String(x.interest||"").replace(/^\s*research interests?\s*:?\s*/i,"").split(/,\s*(?:and\s+)?/).map(t=>t.trim().replace(/\.$/,"")).filter(Boolean);
const person=(x,i)=>{const t=tagsOf(x),L=links(x),tg=s=>`<span class="tag">${esc(s)}</span>`;
 const web=x.website?`<a class="personal-link" href="${esc(x.website)}" target="_blank" rel="noopener noreferrer">Personal website ↗</a>`:"";
 return`<article class="sp tilt person" data-r style="--d:${i%4}">${img(x.photo,x.name,"pph")}<div class="pbody"><h3>${esc(x.name)}</h3><p class="person-role">${esc(x.role)}</p><div class="tags">${t.map(tg).join("")}</div><div class="person-links">${web}${L}</div></div></article>`};
SEC.push(d=>{const pp=d.people.filter(x=>!ph(x.name));return`<section class="s" id="people"><div class="wrap">${head("People","Our team")}${[...new Set(pp.map(x=>x.role))].map(r=>{const l=pp.filter(x=>x.role===r);return`<h3 class="prole" data-r>${esc(r)} <span class="n">${String(l.length).padStart(2,"0")}</span></h3><div class="pgrid">${l.map(person).join("")}</div>`}).join("")}</div></section>`});
/* 6B ALUMNI NETWORK */
SEC.push(d=>{const aa=(d.alumni||[]).filter(x=>!ph(x.name));return`<section class="s alt" id="alumni"><div class="wrap">${head("Alumni network","Our alumni")}${aa.length?`<div class="pgrid">${aa.map((x,i)=>person({...x,role:x.role||"AMRL Alumni"},i)).join("")}</div>`:`<div class="alumni-empty sp" data-r><div class="alumni-mark">A</div><div><h3>Once AMRL, always connected.</h3><p>We are building a verified directory of former AMRL researchers and graduates. Alumni profiles will appear here as details are confirmed.</p><a class="personal-link" href="mailto:${esc(d.contact.email)}?subject=AMRL%20Alumni%20Profile">Share an alumni update ↗</a></div></div>`}</div></section>`});
/* 7 PUBLICATIONS */
SEC.push(d=>{const ys=[...new Set(d.publications.map(x=>x.year))].sort().reverse(),n=y=>d.publications.filter(x=>x.year===y).length,m=Math.max(...ys.map(n));
return`<section class="s alt" id="publications"><div class="wrap">${head("Publications","Selected publications")}
<div class="ybars" data-r aria-label="Publications per year">${[...ys].reverse().map(y=>`<div class="yb"><i style="--h:${n(y)/m}"></i><b>${n(y)}</b><span>${esc(y)}</span></div>`).join("")}</div>
<div class="ptools" data-r><select id="yf" aria-label="Filter by year"><option value="">All years</option>${ys.map(y=>`<option>${esc(y)}</option>`).join("")}</select><input id="ps" type="search" placeholder="Search title, author or journal" aria-label="Search publications"><span id="pc" class="small"></span></div>
<div id="plist"></div><p class="small" style="margin-top:14px">Full publication list: <a href="${esc(d.pi.scholar)}" target="_blank" rel="noopener">Google Scholar</a></p></div></section>`});
const cite=x=>`${x.authors} (${x.year}). ${x.title}. ${x.journal}${x.volume?", "+x.volume:""}${x.pages?", "+x.pages:""}${x.doi?". https://doi.org/"+x.doi:""}`;
const bib=x=>{const au=x.authors.replace(/\*/g,"").replace(/,?\s+and\s+/g,", ").split(/,\s*/).filter(Boolean),ln=(au[0]||"x").split(" ").pop().replace(/\W/g,"");
 return`@article{${ln}${x.year},\n  author = {${au.join(" and ")}},\n  title = {{${x.title}}},\n  journal = {${x.journal}},\n  year = {${x.year}}${x.volume?`,\n  volume = {${x.volume}}`:""}${x.issue?`,\n  number = {${x.issue}}`:""}${x.pages?`,\n  pages = {${x.pages}}`:""}${x.doi?`,\n  doi = {${x.doi}}`:""}\n}`};
function pubList(){const el=$("plist");if(!el)return;const q=($("ps").value||"").trim().toLowerCase(),y=$("yf").value,names=[D.pi.name.replace(/^Dr\.\s*/,""),...D.people.map(p=>p.name)].filter(n=>n&&!ph(n));
 const bold=s=>names.reduce((t,n)=>t.split(esc(n)).join("<b>"+esc(n)+"</b>"),esc(s));
 const l=D.publications.map((x,i)=>[x,i]).filter(([x])=>(!y||x.year===y)&&(!q||[x.title,x.authors,x.journal,x.year].join(" ").toLowerCase().includes(q)));
 el.innerHTML=l.map(([x,i])=>`<article class="sp pub" data-r><div class="y">${esc(x.year)}</div><div><h3>${f(x.title)}</h3><div class="a">${bold(x.authors)}</div><div class="m"><em>${f(x.journal)}</em>${x.volume||x.pages?`<span>${esc((x.volume||"")+(x.issue?"("+x.issue+")":"")+(x.pages?", "+x.pages:""))}</span>`:""}${x.quartile?`<span class="pill g">${esc(x.quartile)}</span>`:""}${x.impactFactor&&!/not specified/i.test(x.impactFactor)?`<span class="pill p">IF ${esc(x.impactFactor)}</span>`:""}${x.doi?`<a href="https://doi.org/${esc(x.doi)}" target="_blank" rel="noopener">DOI</a>`:""}<button data-c="${i}">Copy citation</button><button data-b="${i}">BibTeX</button></div></div></article>`).join("")||'<p class="empty">No publications match your search.</p>';
 $("pc").textContent=q||y?l.length+" result"+(l.length===1?"":"s"):"";reveal()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-c],[data-b]");if(!b)return;const p=D.publications[b.dataset.c??b.dataset.b],t=b.textContent;
 navigator.clipboard.writeText(b.dataset.c!==undefined?cite(p):bib(p)).then(()=>{b.textContent="Copied ✓";setTimeout(()=>b.textContent=t,1600)})});
document.addEventListener("input",e=>{if(e.target.id==="ps")pubList()});document.addEventListener("change",e=>{if(e.target.id==="yf")pubList()});
/* 8 FACILITIES + SIMULATIONS */
SEC.push(d=>`<section class="s" id="facilities"><div class="wrap">${head("Research infrastructure","Computational Research Facilities")}<p class="lead" data-r style="font-size:17px">Advanced computational tools and first-principles methods for understanding, predicting and designing next-generation functional materials for sustainable energy applications.</p>
<div class="mq" aria-hidden="true"><div id="mq">${[0,1].map(()=>`<div>${d.software.map(x=>`<span class="chipsw"><span class="sw-logo">${swLogo(x)}</span>${esc(x.name)}</span>`).join("")}</div>`).join("")}</div></div>
<div class="fi" data-r><div class="fo"><p class="kick">AMRL · Computational materials science</p><h3>From atomic-scale simulations to advanced materials design</h3><p class="muted">Our research combines density functional theory, molecular dynamics, lattice dynamics and device-level simulations to investigate the structural, electronic, optical, magnetic, mechanical and energy-related properties of materials.</p></div>
<div class="fs"><article><strong>${String(d.software.length).padStart(2,"0")}</strong><span>Scientific software packages</span></article><article><strong>DFT</strong><span>First-principles calculations</span></article><article><strong>AIMD</strong><span>Finite-temperature simulations</span></article><article><strong>Multi-scale</strong><span>Computational approaches</span></article></div></div>
<h3 class="sub">Simulation tools in action</h3>
<div class="lab" data-r><div class="tabs" id="tabs" role="tablist" aria-label="Simulation tools"></div><div class="stage sp"><div class="shead"><h3 id="stn"></h3><span class="pill" id="sts" style="margin:0"></span></div>
<canvas id="sim" role="img" aria-label="Live simulation of the selected tool"></canvas><div class="ctl" id="ctl"></div><p id="std"></p><p class="note">Illustrative simulation of the method. The curves are generated for demonstration and are not results from our papers.</p></div></div>
<h3 class="sub">Computational research capabilities</h3><div class="caps">${d.facilities.map((x,i)=>`<span data-r style="--d:${i%5}">${esc(x)}</span>`).join("")}</div>
<h3 class="sub">Scientific software and simulation tools</h3><div class="grid">${d.software.map((x,i)=>`<article class="sp tilt" data-r style="--d:${i%3}"><div class="sw-logo big">${swLogo(x)}</div><h3>${esc(x.name)}</h3><p>${esc(x.description)}</p></article>`).join("")}</div>
<div class="nb sp" data-r><b>Research approach:</b> We integrate DFT, AIMD, phonon calculations, molecular dynamics and device simulations to explore advanced materials for hydrogen storage, thermoelectric energy conversion, photovoltaics and other sustainable energy technologies.</div></div></section>`);
/* 9 NEWS */
SEC.push(d=>`<section class="s alt" id="news"><div class="wrap">${head("News and updates","Latest from the lab")}<ul class="tl">${d.news.map(x=>`<li data-r><div class="d">${esc(x.date)}</div><div class="sp"><h3>${esc(x.title)}</h3><p>${esc(x.details)}</p></div></li>`).join("")}</ul></div></section>`);
/* 10 OPPORTUNITIES */
SEC.push(d=>`<section class="s" id="opportunities"><div class="wrap">${head("Opportunities","Join us")}<div class="grid">${d.opportunities.map((x,i)=>`<article class="sp tilt" data-r style="--d:${i}"><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p></article>`).join("")}</div><p style="margin-top:22px" data-r><a class="btn" href="mailto:${esc(d.contact.email)}">Email the lab</a></p></div></section>`);
/* 11 CONTACT */
SEC.push(d=>`<section class="s alt" id="contact"><div class="wrap">${head("Contact","Get in touch")}<div class="cg"><div data-r><p class="muted" style="white-space:pre-line">${esc(d.contact.address)}</p><p>Email: <a href="mailto:${esc(d.contact.email)}">${esc(d.contact.email)}</a></p>${links(d.contact)}</div>
<form class="sp cform" id="contactForm" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" data-r><input type="hidden" name="form-name" value="contact"><p hidden><label>Leave empty <input name="bot-field"></label></p><h3>Write to the lab</h3>
<label>Your name<input name="name" required autocomplete="name"></label><label>Email<input type="email" name="email" required autocomplete="email"></label>
<label>I am interested in<select name="topic">${d.opportunities.map(o=>`<option>${esc(o.title)}</option>`).join("")}<option>Other question</option></select></label><label>Message<textarea name="message" rows="4" required></textarea></label>
<button class="btn" type="submit">Send message</button><p class="form-status" role="status" aria-live="polite"></p></form></div></div></section>`);
document.addEventListener("submit",async e=>{const fm=e.target.closest("#contactForm");if(!fm)return;e.preventDefault();const st=fm.querySelector(".form-status"),b=fm.querySelector("button");b.disabled=true;st.textContent="Sending…";
 try{const r=await fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(new FormData(fm)).toString()});if(!r.ok)throw 0;fm.reset();st.textContent="Thank you! Your message has been sent. We will reply by e-mail."}
 catch{st.innerHTML=`Could not send from here. Please e-mail <a href="mailto:${esc(D.contact.email)}">${esc(D.contact.email)}</a>.`}b.disabled=false});

/* ================= RENDER + ANIMATION ENGINE ================= */
function count(el){const n=+el.dataset.n,dec=(String(el.dataset.n).split(".")[1]||"").length;if(RM){el.textContent=n.toFixed(dec);return}const t0=performance.now();(function s(t){const k=Math.min((t-t0)/1700,1),e=1-Math.pow(1-k,4);el.textContent=(n*e).toFixed(dec);if(k<1)requestAnimationFrame(s)})(t0)}
const scr=el=>{const t=el.dataset.t||(el.dataset.t=el.textContent);let n=0;const id=setInterval(()=>{el.textContent=[...t].map((c,i)=>i<n||c===" "?c:"ABCDEFGHJKLMNPQRSTUVWXYZ#%&"[Math.random()*28|0]).join("");if(n++>=t.length){el.textContent=t;clearInterval(id)}},24)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add("in");io.unobserve(t);Q("[data-n]",t).forEach(count);if(t.matches("h2")&&!RM){const s=t.querySelector(".sc");s&&scr(s)}}),{threshold:.12,rootMargin:"0px 0px -5% 0px"});
const reveal=()=>Q("[data-r]:not(.in)").forEach(x=>io.observe(x));
const ls=Q("#menu a"),spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)ls.forEach(l=>{const on=l.hash==="#"+e.target.id;l.classList.toggle("on",on);if(on)l.scrollIntoView({inline:"center",block:"nearest"})})}),{rootMargin:"-40% 0px -55% 0px"});
function startTicker(){const el=$("ticker");if(!el)return;clearTimeout(window._tk);const w=D.research.map(x=>x.title);let a=0,c=0,dir=1;if(RM){el.textContent=w[0];return}
 (function tick(){const t=w[a];c+=dir;el.innerHTML=esc(t.slice(0,c))+"<i></i>";let ms=dir>0?55:26;if(c===t.length){dir=-1;ms=1700}else if(c===0){dir=1;a=(a+1)%w.length;ms=320}window._tk=setTimeout(()=>{if(document.body.contains(el))tick()},ms)})()}
function ld(){let e=$("ld");if(!e){e=document.createElement("script");e.id="ld";e.type="application/ld+json";document.head.appendChild(e)}
 const sa=p=>[p.scholar,p.orcid,p.researchgate,p.linkedin,p.website].filter(Boolean);
 e.textContent=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"ResearchOrganization","@id":D.site.url+"#org","name":D.site.title,"url":D.site.url,"email":D.contact.email,"member":D.people.filter(p=>!ph(p.name)).map(p=>({"@type":"Person","name":p.name,"jobTitle":p.role,"sameAs":sa(p)})),"employee":{"@type":"Person","name":D.pi.name,"jobTitle":"Principal Investigator","sameAs":sa(D.pi)}},
  ...D.publications.filter(p=>p.doi).map(p=>({"@type":"ScholarlyArticle","headline":p.title,"datePublished":p.year,"identifier":"https://doi.org/"+p.doi,"isPartOf":{"@type":"Periodical","name":p.journal},"author":p.authors.replace(/\*/g,"").split(/,\s*(?:and\s+)?/).filter(Boolean).map(n=>({"@type":"Person","name":n}))}))]})}
function renderNotifications(){
 const panel=$("notifyPanel"),items=$("notifyItems"),btn=$("notifyBtn"),count=$("notifyCount");
 if(!panel||!items||!btn)return;
 const news=(D.news||[]).slice(0,5);count.textContent=String(news.length);count.hidden=!news.length;
 items.innerHTML=news.map((x,i)=>`<article class="notify-item"><span class="notify-index">${String(i+1).padStart(2,"0")}</span><div><small>${esc(x.date)}</small><h4>${esc(x.title)}</h4><p>${esc(x.details)}</p></div></article>`).join("")||'<p class="empty">No notifications yet.</p>';
 btn.onclick=()=>{panel.hidden=!panel.hidden;btn.setAttribute("aria-expanded",String(!panel.hidden))};
 $("notifyClose").onclick=()=>{panel.hidden=true;btn.setAttribute("aria-expanded","false")};
 panel.querySelector(".notify-all").onclick=()=>{panel.hidden=true;btn.setAttribute("aria-expanded","false")};
}
function render(){$("site").innerHTML=SEC.map(s=>s(D)).join("");$("yr").textContent=new Date().getFullYear();$("ml").href=D.site.portal;
 renderNotifications();
 startLatticeSim();startTicker();pubList();initMaterials();initSims();ld();reveal();Q("main section").forEach(s=>spy.observe(s))}

/* theme + scroll progress + self-drawing timelines */
const root=document.documentElement;let sv=null;try{sv=localStorage.getItem("theme")}catch(e){}
const setT=t=>{root.dataset.theme=t;$("theme").textContent=t==="dark"?"☀":"☾";try{localStorage.setItem("theme",t)}catch(e){}};
setT(sv||"dark");$("theme").onclick=()=>setT(root.dataset.theme==="dark"?"light":"dark");
let tick=0;const onScroll=()=>{tick=0;$("bar").style.transform=`scaleX(${scrollY/Math.max(1,root.scrollHeight-innerHeight)})`;
 Q(".tl").forEach(t=>{const r=t.getBoundingClientRect();t.style.setProperty("--p",Math.max(0,Math.min(1,(innerHeight*.7-r.top)/r.height)))})};
addEventListener("scroll",()=>{if(!tick)tick=requestAnimationFrame(onScroll)},{passive:true});

/* pointer: spotlight, 3D tilt, magnetic buttons, cursor glow */
addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY;const t=e.target.closest?.(".sp"),m=e.target.closest?.(".btn");
 if(t){const r=t.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;t.style.setProperty("--mx",e.clientX-r.left+"px");t.style.setProperty("--my",e.clientY-r.top+"px");
  if(!RM&&t.classList.contains("tilt"))t.style.transform=`perspective(800px) rotateX(${-py*8}deg) rotateY(${px*10}deg)`}
 if(m&&!RM){const r=m.getBoundingClientRect();m.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`}});
document.addEventListener("pointerout",e=>{const t=e.target.closest?.(".tilt,.btn");if(t&&!t.contains(e.relatedTarget))t.style.transform=""});
if(!CO&&!RM){const cu=$("cur");(function L(){cx+=(mx-cx)*.12;cy+=(my-cy)*.12;cu.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(L)})()}

/* command palette (Ctrl/Cmd+K or /) */
const SECS=[["home","Home"],["about","About"],["pi","Principal Investigator"],["research","Research"],["materials","Materials"],["people","People"],["alumni","Alumni"],["publications","Publications"],["facilities","Facilities"],["news","News"],["opportunities","Opportunities"],["contact","Contact"]];
const go=id=>()=>{const e=$(id);e&&e.scrollIntoView()};
const palData=()=>[...SECS.map(([id,t])=>({t,k:"Section",go:go(id)})),{t:"Toggle theme",k:"Action",go:()=>$("theme").click()},{t:"Member login",k:"Action",go:()=>open(D.site.portal,"_blank","noopener")},
 ...D.people.filter(x=>!ph(x.name)).map(x=>({t:x.name,k:"Person",go:go("people")})),...D.research.map(x=>({t:x.title,k:"Research",go:go("research")})),...D.software.map(x=>({t:x.name,k:"Software",go:go("facilities")})),
 ...D.publications.map(x=>({t:x.title,k:"Paper "+x.year,go:x.doi?()=>open("https://doi.org/"+x.doi,"_blank","noopener"):go("publications")})),...ELS.map(e=>({t:e.n+" ("+e.s+")",k:"Element",go:()=>{go("materials")();window.selEl&&window.selEl(e.z)}}))];
const pal=$("pal"),pin=$("pin");let pn=0,pv=[];
function pr(){const q=pin.value.trim().toLowerCase();pv=palData().filter(c=>(c.t+" "+c.k).toLowerCase().includes(q)).slice(0,10);pn=Math.min(pn,Math.max(0,pv.length-1));
 $("pl").innerHTML=pv.map((c,i)=>`<li class="${i===pn?"on":""}" data-i="${i}">${esc(c.t.length>80?c.t.slice(0,80)+"…":c.t)}<small>${esc(c.k)}</small></li>`).join("")||'<li class="empty">No match</li>'}
const op=o=>{pal.hidden=!o;if(o){pin.value="";pn=0;pr();pin.focus()}},run=i=>{const c=pv[i];if(c){op(false);c.go()}};
addEventListener("keydown",e=>{if(e.key==="Escape"&&$("notifyPanel")&&!$("notifyPanel").hidden){$("notifyPanel").hidden=true;$("notifyBtn")?.setAttribute("aria-expanded","false")}
 const typing=/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();op(pal.hidden)}else if(e.key==="/"&&!typing&&pal.hidden){e.preventDefault();op(true)}
 else if(!pal.hidden){if(e.key==="Escape")op(false);else if(e.key==="ArrowDown"){e.preventDefault();pn=Math.min(pv.length-1,pn+1);pr()}else if(e.key==="ArrowUp"){e.preventDefault();pn=Math.max(0,pn-1);pr()}else if(e.key==="Enter")run(pn)}});
pin.oninput=()=>{pn=0;pr()};$("pl").onclick=e=>{const l=e.target.closest("li[data-i]");if(l)run(+l.dataset.i)};pal.onclick=e=>{if(e.target===pal)op(false)};$("kb").onclick=()=>op(true);

/* ================= IN-PAGE EDITOR (address er shesh e #edit likhun) ================= */
const LBL={site:"Site settings",hero:"Homepage",highlights:"Homepage highlights",stats:"Statistics",about:"About the laboratory",pi:"Principal Investigator",research:"Research areas",compounds:"Compounds (periodic table)",people:"People",publications:"Publications",facilities:"Capabilities",software:"Software",news:"News",opportunities:"Opportunities",contact:"Contact"};
const pretty=k=>String(k).replace(/([A-Z])/g," $1").replace(/^./,s=>s.toUpperCase());
const getAt=(o,p)=>p.split(".").reduce((a,k)=>a[k],o),setAt=(o,p,v)=>{const a=p.split("."),l=a.pop();a.reduce((x,k)=>x[k],o)[l]=v};
function fld(path,k,v){if(Array.isArray(v))return arr(path,k,v);if(v&&typeof v==="object")return`<fieldset class="fs2"><legend>${esc(pretty(k))}</legend>${Object.entries(v).map(([a,b])=>fld(path+"."+a,a,b)).join("")}</fieldset>`;
 const big=String(v).length>90||/description|position|details|address|interest|title|authors|history/i.test(k);
 return`<label class="fld">${esc(pretty(k))}${k==="photo"?" (e.g. photos/name.jpg)":""}${big?`<textarea data-p="${esc(path)}">${esc(v)}</textarea>`:`<input data-p="${esc(path)}" value="${esc(v)}">`}</label>`}
function arr(path,k,a){const o=a[0]&&typeof a[0]==="object";return`<div class="fld"><b>${esc(pretty(k))}</b>${a.map((v,i)=>`<div class="ai"><small>#${i+1}</small>${o?Object.entries(v).map(([x,y])=>fld(`${path}.${i}.${x}`,x,y)).join(""):`<textarea data-p="${esc(path)}.${i}">${esc(v)}</textarea>`}<button type="button" data-rm="${esc(path)}" data-i="${i}">Remove</button></div>`).join("")}<button type="button" class="fb" data-add="${esc(path)}">+ Add</button></div>`}
function buildEditor(){$("editForms").innerHTML=Object.entries(D).map(([k,v])=>`<details class="es"><summary>${esc(LBL[k]||pretty(k))}</summary>${Array.isArray(v)?arr(k,k,v):Object.entries(v).map(([a,b])=>fld(k+"."+a,a,b)).join("")}</details>`).join("")}
const edOpen=o=>{$("editor").classList.toggle("open",o);document.body.style.overflow=o?"hidden":"";if(o)buildEditor()},st=t=>$("editorStatus").textContent=t;
if(location.hash==="#edit")edOpen(true);addEventListener("hashchange",()=>{if(location.hash==="#edit")edOpen(true)});
$("closeEditor").onclick=()=>edOpen(false);$("editor").onclick=e=>{if(e.target.id==="editor")edOpen(false)};
$("editForms").addEventListener("input",e=>{const p=e.target.dataset.p;if(p)setAt(D,p,e.target.value)});
$("editForms").addEventListener("click",e=>{const rm=e.target.closest("[data-rm]"),ad=e.target.closest("[data-add]");
 if(rm){getAt(D,rm.dataset.rm).splice(+rm.dataset.i,1);buildEditor()}
 if(ad){const a=getAt(D,ad.dataset.add),s=a[0];a.push(Array.isArray(s)?s.map(()=>""):s&&typeof s==="object"?Object.fromEntries(Object.keys(s).map(k=>[k,""])):"");buildEditor()}});
$("editorSearch").oninput=e=>{const q=e.target.value.toLowerCase();Q(".es").forEach(s=>{const h=!q||s.textContent.toLowerCase().includes(q)||[...s.querySelectorAll("input,textarea")].some(i=>i.value.toLowerCase().includes(q));s.style.display=h?"":"none";if(q&&h)s.open=true})};
const dl=(n,c,t)=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([c],{type:t}));a.download=n;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500)};
$("previewBtn").onclick=()=>{render();st("Preview updated. The public website changes only after you upload the downloaded content.js to GitHub/Netlify.")};
$("downloadBtn").onclick=()=>{dl("content.js","/* AMRL content (exported from the in-page editor). Replace the old content.js with this file. */\nconst LAB = "+JSON.stringify(D,null,2)+";\n","text/javascript");st("content.js downloaded. Replace the old content.js in your repository and commit.")};
$("jsonBtn").onclick=()=>dl("amrl-content-backup.json",JSON.stringify(D,null,2),"application/json");
$("importJson").onchange=async e=>{const fl=e.target.files[0];if(!fl)return;try{D=JSON.parse(await fl.text());buildEditor();st("Content imported. Click Preview changes to review it.")}catch{st("Could not read that JSON file.")}e.target.value=""};
$("resetBtn").onclick=()=>{if(!confirm("Reset the editor to the content in content.js?"))return;D=clone(ORIG);buildEditor();st("Original content restored. Click Preview changes.")};

render();onScroll();
