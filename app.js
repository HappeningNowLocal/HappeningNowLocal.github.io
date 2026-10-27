const CATS=["All","Market","Festival","Art & Craft","Movies & Music","Family","Holiday","Shows & Expos"],M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],D=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const st={city:localStorage.hnlCity||"henderson",tab:"today",cat:"All",free:false,events:[]};
const $=s=>document.querySelector(s),iso=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"),parse=s=>{const[a,b,c]=s.split("-");return new Date(a,b-1,c)};
const today=()=>{const d=new Date();d.setHours(0,0,0,0);return d};
function occurrences(ev,from,days){const out=[];if(ev.date){const s=parse(ev.date),e=ev.end?parse(ev.end):s;if(e>=from)out.push({ev,start:s<from?from:s,first:s,last:e});return out}
 const r=ev.rule;if(r.dates){r.dates.map(parse).filter(d=>d>=from).forEach(d=>out.push({ev,start:d,first:d,last:d}));return out}for(let i=0;i<days;i++){const d=new Date(from);d.setDate(d.getDate()+i);if(!r.dow.includes(d.getDay()))continue;const n=Math.ceil(d.getDate()/7);if(r.nth&&!r.nth.includes(n))continue;const k=iso(d);if(r.skip&&r.skip.includes(k)||r.from&&k<r.from||r.until&&k>r.until)continue;out.push({ev,start:d,first:d,last:d})}return out}
function range(){const t=today();if(st.tab=="today")return[t,t];if(st.tab=="weekend"){const dw=t.getDay(),s=new Date(t),e=new Date(t);if(dw>0&&dw<5)s.setDate(t.getDate()+5-dw);e.setDate(s.getDate()+(dw==0?0:7-s.getDay()));return[s,e]}const e=new Date(t);e.setDate(t.getDate()+60);return[t,e]}
function render(){const[a,b]=range();let occ=[];st.events.forEach(ev=>occurrences(ev,a,61).forEach(o=>{if(o.start<=b&&o.last>=a)occ.push(o)}));
 occ=occ.filter(o=>(st.cat=="All"||o.ev.category==st.cat)&&(!st.free||o.ev.free));
 if(st.tab=="upcoming"){const seen=new Set();occ.sort((x,y)=>x.start-y.start);occ=occ.filter(o=>{if(!o.ev.rule)return true;if(seen.has(o.ev.name))return false;seen.add(o.ev.name);return true})}
 occ.sort((x,y)=>x.start-y.start);
 $("#list").innerHTML=occ.length?occ.map(o=>{const e=o.ev,d=o.start;const when=o.first<o.last?`${M[o.first.getMonth()]} ${o.first.getDate()}–${o.last.getDate()}`:`${D[d.getDay()]}, ${M[d.getMonth()]} ${d.getDate()}`;
 return `<article class="card"><div class="badge"><small>${M[d.getMonth()]}</small><b>${d.getDate()}</b><small>${D[d.getDay()]}</small></div><div><h3>${e.name}</h3><div class="meta">${when} · ${e.time}<br>${e.place}</div>${e.note?`<p class="note">${e.note}</p>`:""}<div class="tags"><span class="tag">${e.category}</span><span class="tag f">${e.free?"Free":e.price||"Paid"}</span><a href="${e.source}" target="_blank" rel="noopener">Source ↗</a></div></div></article>`}).join(""):`<p class="empty">Nothing listed for this view yet. Try "Coming up".</p>`}
async function load(){const r=await fetch(`data/${st.city}.json`);const j=await r.json();st.events=j.events;st.tab='today';document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab=='today'));$("#checked").textContent=`Listings last checked ${parse(j.checked).toLocaleDateString(undefined,{month:"long",day:"numeric"})}.`;render();if(!document.querySelector('.card')){st.tab='weekend';document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab=='weekend'));render()}}
(async()=>{const c=await (await fetch("data/cities.json")).json();$("#city").innerHTML=c.cities.map(x=>`<option value="${x.id}">${x.name}</option>`).join("");$("#city").value=st.city;
$("#city").onchange=e=>{st.city=localStorage.hnlCity=e.target.value;load()};
$("#chips").innerHTML=CATS.map(x=>`<button class="${x=="All"?"on":""}">${x}</button>`).join("");
$("#chips").onclick=e=>{if(e.target.tagName!="BUTTON")return;st.cat=e.target.textContent;[...$("#chips").children].forEach(b=>b.classList.toggle("on",b==e.target));render()};
document.querySelector(".tabs").onclick=e=>{const t=e.target.dataset.tab;if(!t)return;st.tab=t;document.querySelectorAll(".tabs button").forEach(b=>b.classList.toggle("on",b==e.target));render()};
$("#freeOnly").onchange=e=>{st.free=e.target.checked;render()};load()})();
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js");
