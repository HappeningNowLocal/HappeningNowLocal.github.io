const CATS=[["Market","market"],["Festival","festival"],["Art & Craft","art"],["Movies & Music","music"],["Family","family"],["Holiday","holiday"],["Shows & Expos","shows"],["Outdoors & Nature","outdoors"],["Food","food"]];
const CV=Object.fromEntries(CATS.map(([n,k])=>[n,`var(--c-${k})`]));
const M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],ML=["January","February","March","April","May","June","July","August","September","October","November","December"],D=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const iso=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"),parse=s=>{const[a,b,c]=s.split("-");return new Date(+a,+b-1,+c)};
const add=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ST_NAME={NV:"Nevada",UT:"Utah",AZ:"Arizona",CA:"California"};
const ST_TZ={NV:"America/Los_Angeles",UT:"America/Denver",AZ:"America/Phoenix",CA:"America/Los_Angeles"};
const CITY_TZ={henderson:"America/Los_Angeles","las-vegas":"America/Los_Angeles","boulder-city":"America/Los_Angeles","st-george":"America/Denver","cedar-city":"America/Denver","salt-lake-city":"America/Denver",phoenix:"America/Phoenix","san-diego":"America/Los_Angeles","los-angeles":"America/Los_Angeles",laughlin:"America/Los_Angeles","zion-springdale":"America/Denver",hurricane:"America/Denver",kingman:"America/Phoenix","lake-havasu-city":"America/Phoenix"};
const CITY_NAME={henderson:"Henderson, NV","las-vegas":"Las Vegas, NV","boulder-city":"Boulder City, NV","st-george":"St. George, UT","cedar-city":"Cedar City, UT","salt-lake-city":"Salt Lake City, UT",phoenix:"Phoenix, AZ","san-diego":"San Diego, CA","los-angeles":"Los Angeles, CA",laughlin:"Laughlin, NV","zion-springdale":"Springdale, UT",hurricane:"Hurricane, UT",kingman:"Kingman, AZ","lake-havasu-city":"Lake Havasu City, AZ"};
const PRE={he:"henderson",la:"las-vegas",st:"st-george",ce:"cedar-city",bc:"boulder-city",ph:"phoenix",sl:"salt-lake-city",sd:"san-diego",lac:"los-angeles",lau:"laughlin",zi:"zion-springdale",hu:"hurricane",ki:"kingman",lh:"lake-havasu-city"};
const SUGGEST="happeningnowlocal@gmail.com";
let ALL=[],BY_STATE={};
const st={cities:["henderson"],state:null,tab:"today",view:"list",cat:"All",free:false,conv:localStorage.hnlConv=="1",near:false,geo:null,events:[],q:"",month:null,sel:null,auto:true};
function cityState(id){const n=CITY_NAME[id]||"";return n.split(", ").pop()}
function evTz(e){return CITY_TZ[e&&e._c]||CITY_TZ[st.cities[0]]||"America/Los_Angeles"}
function selTz(){const t=[...new Set((st.cities||[]).map(c=>CITY_TZ[c]||"America/Los_Angeles"))];return t[0]||"America/Los_Angeles"}
function ymdInTz(tz){try{const p=Object.fromEntries(new Intl.DateTimeFormat("en-US",{timeZone:tz||"America/Los_Angeles",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date()).filter(x=>x.type!="literal").map(x=>[x.type,x.value]));return `${p.year}-${p.month}-${p.day}`}catch(_){const d=new Date();return iso(new Date(d.getFullYear(),d.getMonth(),d.getDate()))}}
function todayDate(tz){return parse(ymdInTz(tz))}
function today(){return todayDate(st.cities&&st.cities.length?selTz():"America/Los_Angeles")}
function on(ev,d){const k=iso(d);if(ev.date)return k>=ev.date&&k<=(ev.end||ev.date);const r=ev.rule;if(r.dates)return r.dates.includes(k);
 if(!r.dow.includes(d.getDay()))return false;if(r.nth&&!r.nth.includes(Math.ceil(d.getDate()/7)))return false;if(r.skip&&r.skip.includes(k)||r.from&&k<r.from||r.until&&k>r.until)return false;return true}
const norm=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const match=ev=>{if(!st.q)return true;const h=norm([ev.name,ev.place,ev.description,ev.note,ev.category].join(" "));return norm(st.q).split(/\s+/).filter(Boolean).every(w=>h.includes(w))};
const isFree=ev=>ev.free===true;
const pass=ev=>(st.cat=="All"||(st.cat=="Food"?isFood(ev):ev.category==st.cat))&&(!st.free||isFree(ev))&&(st.conv||!ev.convention)&&match(ev);
const convNote=()=>{const n=st.events.filter(e=>e.convention).length;return n&&!st.conv?` · Hiding ${n} convention show${n==1?"":"s"}`:""};
const priceHtml=e=>isFree(e)?'<span class="price free">Free</span>':`<span class="price">${esc(e.price||"Price not listed")}</span>`;
function isFood(e){if(e.category=="Food")return true;const s=norm(e.name);return /\bbbq\b|\barbeque|\barbecue|\bchili cook|\bfood truck|\bfood fest|\bpizza fest|\bcook-?off|\bcook off|\blive fire|\bslab-o-rama|\btaco fest|\bfood & wine|\bwine and food/.test(s)}
function wkRange(tz){const t=todayDate(tz),w=t.getDay();const s=w==0||w>=5?t:add(t,5-w);return[s,add(s,s.getDay()==0?0:7-s.getDay())]}
function rangeFor(tz){if(st.tab=="saved"){const t=todayDate(tz);return[t,add(t,400)]}const t=todayDate(tz);if(st.tab=="today")return[t,t];if(st.tab=="weekend")return wkRange(tz);if(st.tab=="week")return[t,add(t,6)];if(st.tab=="month")return[new Date(t.getFullYear(),t.getMonth(),1),new Date(t.getFullYear(),t.getMonth()+1,0)];return[t,add(t,75)]}
function distMi(a,b,c,d){const R=3958.8,r=x=>x*Math.PI/180,dLat=r(c-a),dLng=r(d-b),x=Math.sin(dLat/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(dLng/2)**2;return 2*R*Math.asin(Math.min(1,Math.sqrt(x)))}
function distOf(e){if(!st.geo||e.lat==null||e.lng==null)return null;return distMi(st.geo[0],st.geo[1],e.lat,e.lng)}
function distLabel(mi){return mi<0.1?"Nearby":(mi<10?mi.toFixed(1):Math.round(mi))+" mi"}
function sortOcc(x,y){if(st.near&&st.geo){const dx=distOf(x.ev),dy=distOf(y.ev);const ax=dx==null?1e9:dx,ay=dy==null?1e9:dy;if(ax!=ay)return ax-ay}return x.d-y.d||x.ev.name.localeCompare(y.ev.name)}
function onceInList(){return st.view=="list"&&st.tab!="today"&&st.tab!="weekend"&&st.tab!="saved"}
function occ(){const out=[];st.events.filter(pass).forEach(ev=>{const[a,b]=rangeFor(evTz(ev));for(let d=new Date(a);d<=b;d=add(d,1))if(on(ev,d)){out.push({ev,d:new Date(d)});if(ev.date||onceInList())break}});return out.sort(sortOcc)}
const I={clock:'<svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',pin:'<svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" fill="currentColor"/></svg>'};
function when(e,d){if(e.date&&e.end&&e.end!=e.date){const a=parse(e.date),b=parse(e.end);return `${M[a.getMonth()]} ${a.getDate()} – ${a.getMonth()!=b.getMonth()?M[b.getMonth()]+" ":""}${b.getDate()}`}return `${D[d.getDay()]}, ${M[d.getMonth()]} ${d.getDate()}`}
function tabPhrase(){return st.tab=="today"?"today":st.tab=="weekend"?"this weekend":st.tab=="week"?"in the next 7 days":st.tab=="month"?"this month":st.tab=="saved"?"saved":"coming up"}
const SV={get(){try{return JSON.parse(localStorage.hnlSaved||"{}")}catch(_){return{}}},set(o){localStorage.hnlSaved=JSON.stringify(o)}};
const isSaved=id=>!!SV.get()[id];
const heartBtn=(e,cls="heart")=>`<button type="button" class="${cls}" data-save="${e.id}" aria-pressed="${isSaved(e.id)}" aria-label="${isSaved(e.id)?"Remove from saved":"Save event"}"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" fill="var(--hf,none)" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg></button>`;
function toggleSave(id){const o=SV.get();if(o[id])delete o[id];else{const e=st.events.find(x=>x.id==id)||(cur&&cur.e.id==id&&cur.e);if(!e)return;o[id]={city:e._c||st.cities[0],ev:e,at:Date.now()}}SV.set(o);
 $$(`[data-save="${id}"]`).forEach(b=>{b.setAttribute("aria-pressed",!!o[id]);b.setAttribute("aria-label",o[id]?"Remove from saved":"Save event")});updSavedCount();if(st.tab=="saved"&&st.view=="list"&&!$("#sheet").open)render()}
function nextOcc(e){const t=todayDate(evTz(e));for(let i=0;i<400;i++){const x=add(t,i);if(on(e,x))return x}return null}
function savedList(){const o=SV.get(),out=[];let ch=false;for(const id in o){const d=nextOcc(o[id].ev);if(!d){delete o[id];ch=true;continue}out.push({ev:o[id].ev,d,city:o[id].city})}if(ch)SV.set(o);return out.sort(sortOcc)}
function updSavedCount(){const n=Object.keys(SV.get()).length,b=$("#savedN");if(b){b.textContent=n||"";b.hidden=!n}}
function renderSaved(){const o=savedList();updSavedCount();$("#count").textContent=`${o.length} saved event${o.length==1?"":"s"}`+(o.length?" · across all cities":"");$("#list").removeAttribute("aria-busy");
 $("#list").innerHTML=o.length?`<div class="sv-bar"><button class="btn2" data-act="shareSaved">Share my list</button></div>`+o.map(x=>card(x).replace('<div class="foot">',`<div class="foot">${x.city&&(st.cities.length!=1||x.city!=st.cities[0])?`<span class="tag city-t">${esc(CITY_NAME[x.city]||x.city)}</span>`:""}`).replace('<article class="card"',`<article class="card" data-city="${x.city}"`)).join(""):`<div class="empty"><svg viewBox="0 0 24 24" width="40" height="40"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg><h3>No saved events yet</h3><p>Tap the heart on any event to keep it here. Saved events stay on this device and drop off once they're over.</p><button data-act="week">Browse the next 7 days</button></div>`;return o.length}
async function shareSaved(){const o=savedList();if(!o.length)return;const base=location.origin+location.pathname;const text="My saved events on Happening Now Local:\n"+o.map(x=>`• ${x.ev.name} – ${D[x.d.getDay()]} ${M[x.d.getMonth()]} ${x.d.getDate()}, ${CITY_NAME[x.city]||""}\n  ${base}#event=${x.ev.id}&d=${iso(x.d)}`).join("\n");
 if(navigator.share){navigator.share({title:"My saved events",text}).catch(()=>{})}else{try{await navigator.clipboard.writeText(text);$("#count").textContent="Saved list copied. Paste it anywhere to share."}catch(_){$("#count").textContent="Couldn't copy the list."}}}
function showCityTag(e){return st.cities.length>1&&e._c}
function card({ev:e,d}){const mi=st.near&&st.geo?distOf(e):null;
 return `<article class="card" tabindex="0" role="button" aria-haspopup="dialog" data-id="${e.id}" data-d="${iso(d)}" style="--c:${CV[e.category]||"var(--c-festival)"}"><div class="date" aria-hidden="true"><small>${M[d.getMonth()].toUpperCase()}</small><b>${d.getDate()}</b><em>${D[d.getDay()]}</em></div><div class="body"><h3>${esc(e.name)}</h3><div class="meta"><span>${I.clock}${when(e,d)} · ${esc(e.time)}</span><span>${I.pin}${esc(e.place)}${mi!=null?` · ${distLabel(mi)}`:""}</span></div>${e.note?`<p class="note">${esc(e.note)}</p>`:""}<div class="foot">${showCityTag(e)?`<span class="tag city-t">${esc(CITY_NAME[e._c]||e._c)}</span>`:""}<span class="tag">${esc(e.category)}</span>${priceHtml(e)}<a class="src" href="${esc(e.source)}" target="_blank" rel="noopener">Source ↗</a>${heartBtn(e)}</div></div></article>`}
function empty(msg){const f=st.cat!="All"||st.free||st.q||st.near;return `<div class="empty"><svg viewBox="0 0 24 24" width="40" height="40"><rect x="3.5" y="5" width="17" height="15" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg><h3>${msg}</h3><p>${f?"Nothing matches these filters. Try clearing them, picking more cities, or another date range.":"Check another date range, or pick more cities."}</p>${f?'<button data-act="clear">Clear filters</button>':st.tab!="week"?'<button data-act="week">See the next 7 days</button>':""}</div>`}
function collectRange(test,limitEach){const seen=new Set(),o=[];st.events.filter(e=>pass(e)&&!e.industry&&test(e)).forEach(ev=>{const[a,b]=rangeFor(evTz(ev));for(let d=new Date(a);d<=b;d=add(d,1))if(on(ev,d)&&!seen.has(ev.id)){seen.add(ev.id);o.push({ev,d:new Date(d)});if(limitEach)break}});o.sort((x,y)=>x.d-y.d||x.ev.name.localeCompare(y.ev.name));return o}
function renderFood(){const el=$("#food");if(!el)return;if(st.view!="list"||st.tab=="saved"){el.hidden=true;return}
 const o=[],seen=new Set();st.events.filter(e=>pass(e)&&!e.industry&&isFood(e)).forEach(ev=>{const t=todayDate(evTz(ev)),b=add(t,90);for(let d=new Date(t);d<=b;d=add(d,1))if(on(ev,d)&&!seen.has(ev.id)){seen.add(ev.id);o.push({ev,d:new Date(d)});break}});
 o.sort((x,y)=>x.d-y.d||x.ev.name.localeCompare(y.ev.name));
 if(!o.length){el.hidden=true;return}el.hidden=false;
 el.innerHTML=`<div class="wk-h"><div><h2>Food &amp; BBQ</h2><p>${o.length} upcoming event${o.length==1?"":"s"} in your cities</p></div></div><div class="wk-row">${o.slice(0,10).map(({ev:e,d})=>`<article class="wkc card" tabindex="0" role="button" aria-haspopup="dialog" data-id="${e.id}" data-d="${iso(d)}" style="--c:${CV[e.category]||"var(--c-food)"}"><span class="wk-d">${D[d.getDay()]} ${M[d.getMonth()]} ${d.getDate()}${e._c&&st.cities.length>1?" · "+(CITY_NAME[e._c]||"").split(",")[0]:""}</span><h3>${esc(e.name)}</h3><span class="wk-p">${I.pin}${esc(e.place)}</span><span class="wk-f"><span class="tag">${esc(e.category)}</span>${isFree(e)?'<span class="price free">Free</span>':""}</span></article>`).join("")}</div>`}
function renderWk(){const el=$("#wk");if(st.view!="list"||st.tab=="weekend"||st.tab=="saved"){el.hidden=true;return}
 const o=[];const seen=new Set();st.events.filter(e=>pass(e)&&!e.industry).forEach(ev=>{const[a,b]=wkRange(evTz(ev));for(let d=new Date(a);d<=b;d=add(d,1))if(on(ev,d)&&!seen.has(ev.id)){seen.add(ev.id);o.push({ev,d:new Date(d)})}});
 o.sort((x,y)=>(isFree(y.ev)-isFree(x.ev))||x.d-y.d||x.ev.name.localeCompare(y.ev.name));if(!o.length){el.hidden=true;return}el.hidden=false;
 const[a0,b0]=wkRange(selTz());
 const lbl=+a0==+b0?`${D[a0.getDay()]} ${M[a0.getMonth()]} ${a0.getDate()}`:`${D[a0.getDay()]} ${M[a0.getMonth()]} ${a0.getDate()} – ${D[b0.getDay()]}${a0.getMonth()!=b0.getMonth()?" "+M[b0.getMonth()]:""} ${b0.getDate()}`;
 el.innerHTML=`<div class="wk-h"><div><h2>This weekend</h2><p>${lbl} · ${o.length} event${o.length==1?"":"s"}</p></div><button class="wk-all" data-act="weekend">See all</button></div><div class="wk-row">${o.slice(0,8).map(({ev:e,d})=>`<article class="wkc card" tabindex="0" role="button" aria-haspopup="dialog" data-id="${e.id}" data-d="${iso(d)}" style="--c:${CV[e.category]||"var(--c-festival)"}"><span class="wk-d">${D[d.getDay()]} ${M[d.getMonth()]} ${d.getDate()}</span><h3>${esc(e.name)}</h3><span class="wk-p">${I.pin}${esc(e.place)}</span><span class="wk-f"><span class="tag">${esc(e.category)}</span>${isFree(e)?'<span class="price free">Free</span>':""}</span></article>`).join("")}</div>`}
function renderList(){if(st.tab=="saved")return renderSaved();const o=occ().filter(x=>!x.ev.industry);$("#count").textContent=(st.q?`Results for “${st.q}” · `:"")+`${o.length} event${o.length==1?"":"s"} ${tabPhrase()}`+(st.near&&st.geo?" · nearest first":"")+convNote()+(st.conv&&st.events.some(e=>e.industry)?" · Industry-only shows appear in the calendar":"");$("#list").removeAttribute("aria-busy");$("#list").innerHTML=o.length?o.map(card).join(""):empty("Nothing listed "+tabPhrase());return o.length}
function renderCal(){const t=today(),m=st.month,first=new Date(m.getFullYear(),m.getMonth(),1),start=add(first,-first.getDay());let h=`<div class="cal-h"><button data-nav="-1" aria-label="Previous month" ${m<=new Date(t.getFullYear(),t.getMonth(),1)?"disabled":""}><svg viewBox="0 0 24 24" width="18" height="18"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button><h2 aria-live="polite">${ML[m.getMonth()]} ${m.getFullYear()}</h2><button class="tdy" data-nav="0">Today</button><button data-nav="1" aria-label="Next month"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></div><div class="grid" role="grid">`+D.map(x=>`<div class="dow">${x[0]}${x[1]}</div>`).join("");
 const evs=st.events.filter(pass);for(let i=0;i<42;i++){const d=add(start,i);if(i>=35&&d.getMonth()!=m.getMonth())break;const list=evs.filter(e=>on(e,d)),k=iso(d);
 const cats=[...new Set(list.map(e=>e.category))];list.sort((x,y)=>x.name.localeCompare(y.name));const chips=list.slice(0,3).map(e=>`<span class="ec${e.date&&e.end&&e.end!=e.date?" span":""}" style="--c:${CV[e.category]||"var(--c-festival)"}">${esc(e.name)}</span>`).join("")+(list.length>3?`<span class="more">+${list.length-3} more</span>`:"");h+=`<button class="day${d.getDay()%6==0?" we":""}${d.getMonth()!=m.getMonth()?" out":""}${d<t?" past":""}${+d==+t?" today":""}" data-day="${k}" aria-pressed="${st.sel==k}" aria-label="${ML[d.getMonth()]} ${d.getDate()}, ${list.length} event${list.length==1?"":"s"}${+d==+t?", today":""}"><span class="n">${d.getDate()}</span><span class="dots" aria-hidden="true">${cats.slice(0,4).map(c=>`<i style="--c:${CV[c]||"var(--c-festival)"}"></i>`).join("")}</span><span class="chs" aria-hidden="true">${chips}</span></button>`}
 h+=`</div><div class="legend">${CATS.filter(([n])=>n!="Food"||evs.some(e=>e.category=="Food")).map(([n,k])=>`<span><i style="--c:var(--c-${k})"></i>${n}</span>`).join("")}</div>`;$("#cal").innerHTML=h;
 const sd=parse(st.sel),o=evs.filter(e=>on(e,sd)).map(ev=>({ev,d:sd})).sort(sortOcc);$("#count").textContent=(st.q?`Results for “${st.q}” · `:"")+`${o.length} event${o.length==1?"":"s"} on ${D[sd.getDay()]}, ${ML[sd.getMonth()]} ${sd.getDate()}`+convNote();$("#list").innerHTML=o.length?o.map(card).join(""):empty("Nothing listed this day")}
function render(){$("#cal").hidden=st.view!="cal";$("#map").hidden=st.view!="map";$("#list").hidden=st.view=="map";renderFood();if(st.view=="map"){renderWk();return renderMap()}renderWk();$("#tabs").setAttribute("aria-disabled",st.view=="cal");st.view=="cal"?renderCal():renderList()}
function setTab(t){st.tab=t;$$("#tabs button").forEach(b=>b.setAttribute("aria-selected",b.dataset.tab==t))}

/* Cities: multi-select, whole state, URL + localStorage */
function allIds(){return ALL.map(x=>x.id)}
function inferState(ids){if(!ids.length)return null;const states=new Set(ids.map(cityState));if(states.size!=1)return null;const s=[...states][0];const inS=ALL.filter(x=>cityState(x.id)==s).map(x=>x.id);return inS.length&&inS.every(id=>ids.includes(id))&&ids.length==inS.length?s:null}
function saveCities(){st.state=inferState(st.cities);localStorage.hnlCities=JSON.stringify(st.cities);if(st.cities.length==1)localStorage.hnlCity=st.cities[0];else if(st.cities.length==allIds().length)localStorage.hnlCity="all";else localStorage.hnlCity=st.cities[0];syncUrl();cityLbl()}
function syncUrl(){const u=new URL(location.href);u.searchParams.delete("city");u.searchParams.delete("cities");u.searchParams.delete("state");if(st.state)u.searchParams.set("state",st.state);else if(st.cities.length&&st.cities.length!=allIds().length)u.searchParams.set("cities",st.cities.join(","));history.replaceState(history.state,"",u.pathname+u.search+u.hash)}
function parseSel(){const p=new URLSearchParams(location.search);const state=(p.get("state")||"").toUpperCase();if(state&&ST_NAME[state]){const ids=ALL.filter(x=>cityState(x.id)==state).map(x=>x.id);if(ids.length)return{cities:ids,state}}
 const raw=p.get("cities")||p.get("city");if(raw){const ids=raw.split(",").map(s=>s.trim()).filter(id=>CITY_NAME[id]||ALL.some(x=>x.id==id));if(ids.length)return{cities:ids,state:inferState(ids)}}
 try{const saved=JSON.parse(localStorage.hnlCities||"null");if(Array.isArray(saved)&&saved.length){const ids=saved.filter(id=>CITY_NAME[id]||ALL.some(x=>x.id==id));if(ids.length)return{cities:ids,state:inferState(ids)}}}catch(_){}
 const legacy=localStorage.hnlCity;if(legacy=="all")return{cities:allIds(),state:null};if(legacy&&(CITY_NAME[legacy]||ALL.some(x=>x.id==legacy)))return{cities:[legacy],state:null};
 return{cities:["henderson"],state:null}}
function cityLbl(){const el=$("#cityLbl");if(!el)return;let t;if(st.cities.length==allIds().length)t="All locations";else if(st.state)t=ST_NAME[st.state];else if(st.cities.length==1)t=CITY_NAME[st.cities[0]]||st.cities[0];else if(st.cities.length==2)t=st.cities.map(c=>(CITY_NAME[c]||c).split(",")[0]).join(" + ");else t=st.cities.length+" cities";el.textContent=t;const b=$("#cityBtn");if(b)b.title=st.cities.map(c=>CITY_NAME[c]||c).join(", ")}
function citySheetHtml(draft){const ids=draft.slice(),allOn=ids.length==allIds().length;
 let h=`<div class="sh-in city-in"><div class="grab" aria-hidden="true"></div><button class="x" data-cityx aria-label="Cancel"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button><h2 id="cs-title">Show events in</h2><p class="is-p">Pick one city, several, or a whole state. Your choices stay on this device and can be shared with the page link.</p><button type="button" class="copt all ${allOn?"on":""}" data-all aria-pressed="${allOn}">All locations</button>`;
 for(const s of ["NV","UT","AZ","CA"]){const list=BY_STATE[s];if(!list||!list.length)continue;const sids=list.map(x=>x.id),n=sids.filter(id=>ids.includes(id)).length,on=n==sids.length;
  h+=`<div class="cst"><label class="copt state ${on?"on":""}"><input type="checkbox" data-state="${s}" ${on?"checked":""}><span>All of ${ST_NAME[s]}</span>${n&&!on?`<em>${n} selected</em>`:""}</label><div class="ccities">`+list.map(x=>`<label class="copt"><input type="checkbox" data-cid="${x.id}" ${ids.includes(x.id)?"checked":""}><span>${esc(x.name)}</span></label>`).join("")+`</div></div>`}
 h+=`<div class="city-done"><button type="button" class="btn" data-citydone>Done</button></div></div>`;return h}
function openCitySheet(){let draft=st.cities.slice();const dl=$("#citySheet");
 const close=()=>{dl.close();$("#cityBtn").setAttribute("aria-expanded","false")};
 const paint=()=>{dl.innerHTML=citySheetHtml(draft);$("#cityBtn").setAttribute("aria-expanded","true");
  dl.querySelector("[data-all]").onclick=()=>{draft=draft.length==allIds().length?(st.cities.slice().length?st.cities.slice():["henderson"]):allIds().slice();paint()};
  dl.querySelectorAll("[data-state]").forEach(cb=>cb.onchange=()=>{const s=cb.dataset.state,sids=BY_STATE[s].map(x=>x.id);draft=cb.checked?[...new Set(draft.concat(sids))]:draft.filter(id=>!sids.includes(id));if(!draft.length)draft=sids.slice();paint()});
  dl.querySelectorAll("[data-cid]").forEach(cb=>cb.onchange=()=>{const id=cb.dataset.cid;if(cb.checked){if(!draft.includes(id))draft.push(id)}else{draft=draft.filter(x=>x!=id);if(!draft.length)draft=[id]}paint()});
  dl.querySelector("[data-citydone]").onclick=()=>{if(draft.length){st.cities=draft.slice();saveCities();close();load()}};
  dl.querySelector("[data-cityx]").onclick=close};
 paint();if(!dl.open)dl.showModal();
 dl.onclick=e=>{if(e.target==dl)close()};
 dl.oncancel=e=>{e.preventDefault();close()}}
async function load(){const ids=st.cities.slice();const js=await Promise.all(ids.map(c=>fetch(`data/${c}.json`).then(r=>r.json()).catch(()=>null)));st.events=[];let ck=null,centers=[];
 js.forEach((j,i)=>{if(!j)return;j.events.forEach(e=>{e._c=ids[i];st.events.push(e)});if(!ck||j.checked<ck)ck=j.checked;if(j.center)centers.push(j.center)});
 st.center=centers.length==1?centers[0]:null;lastCity=null;
 const where=st.cities.length==allIds().length?"All locations":st.state?ST_NAME[st.state]:st.cities.length==1?(js.find(Boolean)||{}).city||CITY_NAME[st.cities[0]]:st.cities.length+" cities";
 $("#checked").textContent=ck?`${where} · listings last checked ${ML[parse(ck).getMonth()]} ${parse(ck).getDate()}.`:"";
 cityLbl();if(st.auto&&st.view=="list"){setTab("today");if(!renderList())setTab("weekend")}render()}

(async()=>{const t=today();st.month=new Date(t.getFullYear(),t.getMonth(),1);st.sel=iso(t);
 const c=await (await fetch("data/cities.json")).json();ALL=c.cities.slice();
 ALL.forEach(x=>{if(x.name)CITY_NAME[x.id]=x.name;const s=cityState(x.id);if(s&&ST_TZ[s]&&!CITY_TZ[x.id])CITY_TZ[x.id]=ST_TZ[s];(BY_STATE[s]=BY_STATE[s]||[]).push(x)});
 Object.keys(BY_STATE).forEach(s=>BY_STATE[s].sort((a,b)=>a.name.localeCompare(b.name)));
 const sel=parseSel();st.cities=sel.cities;st.state=sel.state;cityLbl();
 if(new URLSearchParams(location.search).has("state")||new URLSearchParams(location.search).has("cities")||new URLSearchParams(location.search).has("city")){localStorage.hnlCities=JSON.stringify(st.cities);if(st.cities.length==1)localStorage.hnlCity=st.cities[0]}
 const cs=document.createElement("dialog");cs.id="citySheet";cs.setAttribute("aria-labelledby","cs-title");document.body.appendChild(cs);
 $("#cityBtn").onclick=openCitySheet;$("#locL").onclick=openCitySheet;
 const locLbl=()=>{$("#locL").textContent="Change location"};locLbl();
 const foodChip=CATS.some(([n])=>n=="Food");
 $("#chips").innerHTML=`<button class="chip" aria-pressed="true" data-cat="All">All</button>`+CATS.map(([n,k])=>`<button class="chip" aria-pressed="false" data-cat="${n}" style="--c:var(--c-${k})"><i></i>${n}</button>`).join("");
 $("#chips").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;st.cat=b.dataset.cat;$$(".chip").forEach(x=>x.setAttribute("aria-pressed",x==b));render()};
 $("#tabs").onclick=e=>{const b=e.target.closest("button");if(!b)return;st.auto=false;setTab(b.dataset.tab);render()};
 $("#view").onclick=e=>{const b=e.target.closest("button");if(!b)return;st.view=b.dataset.view;$$("#view button").forEach(x=>x.setAttribute("aria-pressed",x==b));render()};
 $("#freeOnly").onchange=e=>{st.free=e.target.checked;render()};
 $("#showConv").checked=st.conv;$("#showConv").onchange=e=>{st.conv=e.target.checked;localStorage.hnlConv=st.conv?"1":"0";render()};
 $("#nearSort").onclick=()=>askNear(false);
 $("#cal").onclick=e=>{const n=e.target.closest("[data-nav]"),d=e.target.closest("[data-day]");if(n){if(n.dataset.nav=="0"){const t=today();st.month=new Date(t.getFullYear(),t.getMonth(),1);st.sel=iso(t)}else st.month=new Date(st.month.getFullYear(),st.month.getMonth()+ +n.dataset.nav,1);render()}if(d){st.sel=d.dataset.day;const x=parse(st.sel);if(x.getMonth()!=st.month.getMonth())st.month=new Date(x.getFullYear(),x.getMonth(),1);render()}};
 document.addEventListener("click",e=>{const a=e.target.closest("[data-act]");if(!a)return;if(a.dataset.act=="clear"){st.cat="All";st.free=false;$("#freeOnly").checked=false;st.near=false;$("#nearSort").setAttribute("aria-pressed","false");st.q="";$("#q").value="";$("#qx").hidden=true;$$(".chip").forEach(x=>x.setAttribute("aria-pressed",x.dataset.cat=="All"))}else if(a.dataset.act=="shareSaved"){shareSaved();return}else if(a.dataset.act=="freeWk"){st.auto=false;st.free=true;$("#freeOnly").checked=true;if(st.view!="list"){st.view="list";$$("#view button").forEach(x=>x.setAttribute("aria-pressed",x.dataset.view=="list"))}setTab("weekend");render();$("#count").scrollIntoView({behavior:"smooth",block:"center"});return}else if(a.dataset.act=="install"||a.dataset.act=="installX")return;else{st.auto=false;setTab(a.dataset.act=="weekend"?"weekend":a.dataset.act=="week"?"week":"week")}render()});
 $("#q").oninput=e=>{st.q=e.target.value.trim();$("#qx").hidden=!e.target.value;if(st.q&&st.view=="list"&&st.tab=="today"){st.auto=false;setTab("week")}render()};
 $("#qx").onclick=()=>{$("#q").value="";st.q="";$("#qx").hidden=true;$("#q").focus();render()};
 $("#q").onkeydown=e=>{if(e.key=="Escape"&&e.target.value){e.stopPropagation();$("#qx").click()}};
 $("#suggestBtn").onclick=openSuggest;
 await load();route(false)})();

const NTH={1:"1st",2:"2nd",3:"3rd",4:"4th",5:"5th"},DL=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const fmt=k=>{const d=parse(k);return `${M[d.getMonth()]} ${d.getDate()}`};
function schedule(e,d){if(e.date){const a=parse(e.date);if(e.end&&e.end!=e.date)return [`${DL[a.getDay()]}, ${ML[a.getMonth()]} ${a.getDate()} – ${(b=>`${DL[b.getDay()]}, ${ML[b.getMonth()]} ${b.getDate()}`)(parse(e.end))}`];return [`${DL[a.getDay()]}, ${ML[a.getMonth()]} ${a.getDate()}, ${a.getFullYear()}`]}
 const r=e.rule,out=[];if(r.dates)out.push("Dates: "+r.dates.map(fmt).join(", "));else{const days=r.dow.map(x=>DL[x]+"s").join(", ").replace(/, ([^,]*)$/," & $1");out.push(r.nth?`${r.nth.map(n=>NTH[n]).join(" & ")} ${r.dow.map(x=>DL[x]).join(", ")} of the month`:`Every ${days.replace(/s$/,"")}`.replace(/^Every (.*)$/,(m,x)=>r.dow.length>1?"Every "+days:"Every "+x));
 if(r.from||r.until)out.push(`${r.from?"From "+fmt(r.from):""}${r.from&&r.until?" ":""}${r.until?(r.from?"through ":"Through ")+fmt(r.until):""}`);if(r.skip&&r.skip.length)out.push("No event: "+r.skip.map(fmt).join(", "))}
 out.push(`Selected date: ${DL[d.getDay()]}, ${ML[d.getMonth()]} ${d.getDate()}`);return out}
function hm(t,d){const m=/^(\d{1,2})(?::(\d\d))?\s*(am|pm)/i.exec(t.trim());if(!m)return null;let h=+m[1]%12+(m[3].toLowerCase()=="pm"?12:0);const x=new Date(d.getFullYear(),d.getMonth(),d.getDate(),h,+(m[2]||0),0);return x}
function times(e,d){const p=e.time.split(/[–-]/);const a=hm(p[0]||"",d);let b=p[1]?hm(p[1].trim().match(/am|pm/i)?p[1]:p[1]+(p[0].match(/am|pm/i)||[""])[0],d):null;if(a&&!b){b=new Date(a);b.setHours(a.getHours()+2)}return a?[a,b]:null}
const ics=d=>d.getFullYear()+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0")+"T"+String(d.getHours()).padStart(2,"0")+String(d.getMinutes()).padStart(2,"0")+"00";
const icsEsc=s=>String(s).replace(/[\\;,]/g,m=>"\\"+m).replace(/\n/g,"\\n");
function calSpan(e,d){const multi=e.date&&e.end&&e.end!=e.date;if(multi)return{allDay:true,start:e.date,endEx:iso(add(parse(e.end),1))};const t=times(e,d);if(t){let[a,b]=t;if(b<=a){b=new Date(b);b.setDate(b.getDate()+1)}return{allDay:false,start:a,end:b}}const s=iso(d);return{allDay:true,start:s,endEx:iso(add(parse(s),1))}}
function makeIcs(e,d){const tz=evTz(e),sp=calSpan(e,d),k=iso(d).replace(/-/g,"");
 const dt=sp.allDay?`DTSTART;VALUE=DATE:${sp.start.replace(/-/g,"")}\r\nDTEND;VALUE=DATE:${sp.endEx.replace(/-/g,"")}`:`DTSTART;TZID=${tz}:${ics(sp.start)}\r\nDTEND;TZID=${tz}:${ics(sp.end)}`;
 const link=eventLink(e,d);const desc=[e.description||"",e.time&&sp.allDay&&e.date&&e.end&&e.end!=e.date?"Hours: "+e.time:"",e.source?"Official page: "+e.source:"","Listed on Happening Now Local: "+link].filter(Boolean).join("\n");
 return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Happening Now Local//EN","BEGIN:VEVENT",`UID:${e.id}-${k}@happeningnowlocal.github.io`,`DTSTAMP:${new Date().toISOString().replace(/[-:]/g,"").slice(0,15)}Z`,dt,`SUMMARY:${icsEsc(e.name)}`,`LOCATION:${icsEsc(e.place+(CITY_NAME[e._c]?", "+CITY_NAME[e._c]:""))}`,`DESCRIPTION:${icsEsc(desc)}`,`URL:${link}`,"END:VEVENT","END:VCALENDAR"].join("\r\n")}
function eventLink(e,d){return location.origin+location.pathname+"#event="+e.id+"&d="+iso(d)}
function gcalUrl(e,d){const tz=evTz(e),sp=calSpan(e,d),link=eventLink(e,d);
 const details=[e.description||"",e.time&&sp.allDay&&e.date&&e.end&&e.end!=e.date?"Hours: "+e.time:"",e.source?"Official page: "+e.source:"","Listed on Happening Now Local: "+link].filter(Boolean).join("\n\n");
 const dates=sp.allDay?sp.start.replace(/-/g,"")+"/"+sp.endEx.replace(/-/g,""):ics(sp.start)+"/"+ics(sp.end);
 const q=new URLSearchParams({action:"TEMPLATE",text:e.name,dates,details,ctz:tz,location:(e.place||"")+(CITY_NAME[e._c]?", "+CITY_NAME[e._c]:"")});
 return "https://calendar.google.com/calendar/render?"+q.toString()}
let lastFocus=null,cur=null,TZ="America/Los_Angeles";
function openEv(id,dk,push=true){const e=st.events.find(x=>x.id==id);if(!e)return;let d=dk?parse(dk):null;if(!d||!on(e,d)){const t=todayDate(evTz(e));d=null;for(let i=0;i<120&&!d;i++){const x=add(t,i);if(on(e,x))d=x}d=d||parse(e.date||iso(today()))}
 cur={e,d};const cc=e._c||st.cities[0];TZ=evTz(e);const q=encodeURIComponent(e.place+", "+(CITY_NAME[cc]||""));
 const sc=schedule(e,d),lead=sc.length>1?sc.slice(0,-1):sc;
 $("#sheet").innerHTML=`<div class="sh-in" style="--c:${CV[e.category]||"var(--c-festival)"}"><div class="grab" aria-hidden="true"></div><button class="x" data-close aria-label="Close"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
 <div class="sh-hd"><div class="sh-date" aria-hidden="true"><small>${M[d.getMonth()].toUpperCase()}</small><b>${d.getDate()}</b><em>${D[d.getDay()]}</em></div><div><div class="sh-tags"><span class="tag">${esc(e.category)}</span>${priceHtml(e)}${heartBtn(e,"heart sh-heart")}</div><h2 id="sh-title">${esc(e.name)}</h2></div></div>
 <div class="facts"><div class="fact"><div class="ic">${I.clock}</div><div><span class="fl">When</span><div>${lead.map(x=>esc(x.replace(/^Selected date: /,""))).join("<br>")}</div><div class="muted2">${esc(e.time)}</div></div></div>
 <div class="fact"><div class="ic">${I.pin}</div><div><span class="fl">Where</span><div>${esc(e.place)}</div><div class="muted2">${CITY_NAME[cc]||""}</div><div class="maps"><a href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener">Google Maps ↗</a><a href="https://maps.apple.com/?q=${q}" target="_blank" rel="noopener">Apple Maps ↗</a></div></div></div></div>
 ${e.description?`<h3 class="sh-lbl">About</h3><p class="desc">${esc(e.description)}</p>`:""}${e.know?`<div class="know"><h3>Good to know</h3><ul>${e.know.map(k=>`<li>${esc(k)}</li>`).join("")}</ul></div>`:""}
 <p class="toast" id="toast" role="status"></p>
 <div class="acts"><a class="btn" href="${esc(gcalUrl(e,d))}" target="_blank" rel="noopener" data-gcal>Add to Google Calendar</a><button type="button" class="btn2" data-ics>Apple / Outlook (.ics)</button><a class="btn2" href="${esc(e.source)}" target="_blank" rel="noopener">Official page ↗</a><button type="button" class="btn2" data-share>Share</button></div></div>`;
 const dl=$("#sheet");lastFocus=document.activeElement;if(!dl.open)dl.showModal();dl.querySelector(".x").focus();
 const h="#event="+e.id+"&d="+iso(d);if(push&&location.hash!=h)history.pushState({ev:1},"",location.pathname+location.search+h)}
function closeEv(fromPop){const dl=$("#sheet");if(!dl.open)return;dl.classList.add("closing");setTimeout(()=>{dl.close();dl.classList.remove("closing");lastFocus&&lastFocus.focus&&lastFocus.focus()},160);if(!fromPop&&location.hash.startsWith("#event="))history.state&&history.state.ev?history.back():history.replaceState(null,"",location.pathname+location.search)}
document.addEventListener("click",async e=>{const h=e.target.closest("[data-save]");if(h){e.stopPropagation();toggleSave(h.dataset.save);return}const c=e.target.closest(".card");if(c&&!e.target.closest("a,button")){if(c.dataset.city&&!st.cities.includes(c.dataset.city)){const evs=await fetch(`data/${c.dataset.city}.json`).then(r=>r.json()).catch(()=>null);if(evs)evs.events.forEach(ev=>{ev._c=c.dataset.city;if(!st.events.some(x=>x.id==ev.id))st.events.push(ev)})}openEv(c.dataset.id,c.dataset.d)}});
document.addEventListener("keydown",e=>{const c=e.target.closest&&!e.target.closest("button,a,input,textarea,select")&&e.target.closest(".card");if(c&&(e.key=="Enter"||e.key==" ")){e.preventDefault();openEv(c.dataset.id,c.dataset.d)}});
window.addEventListener("popstate",()=>{if(!location.hash.startsWith("#event="))closeEv(true);else route(false)});
async function route(push){const m=/#event=([^&]+)(?:&d=([\d-]+))?/.exec(location.hash);if(!m)return;const c=PRE[m[1].split("-")[0]];
 if(c&&!st.cities.includes(c)){const j=await fetch(`data/${c}.json`).then(r=>r.json()).catch(()=>null);if(j)j.events.forEach(e=>{e._c=c;if(!st.events.some(x=>x.id==e.id))st.events.push(e)})}
 openEv(m[1],m[2],push)}
(function(){const dl=document.createElement("dialog");dl.id="sheet";dl.setAttribute("aria-labelledby","sh-title");document.body.appendChild(dl);
 dl.addEventListener("cancel",e=>{e.preventDefault();closeEv()});dl.addEventListener("click",e=>{if(e.target==dl||e.target.closest("[data-close]"))closeEv();
  if(e.target.closest("[data-ics]")){const b=new Blob([makeIcs(cur.e,cur.d)],{type:"text/calendar"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=cur.e.id+".ics";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
  if(e.target.closest("[data-share]")){const url=eventLink(cur.e,cur.d),data={title:cur.e.name,text:cur.e.name+" – "+fmt(iso(cur.d)),url};
   const copy=()=>navigator.clipboard.writeText(url).then(()=>{$("#toast").textContent="Link copied"},()=>{$("#toast").textContent="Copy this link: "+url});
   if(navigator.share)navigator.share(data).catch(copy);else copy()}})})();
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js");

/* Map view (Leaflet + OpenStreetMap) */
let LM=null,mk=null,me=null,lastCity=null,leafP=null;
function loadLeaflet(){return leafP||(leafP=new Promise((ok,no)=>{const l=document.createElement("link");l.rel="stylesheet";l.href="vendor/leaflet/leaflet.css";document.head.appendChild(l);const s=document.createElement("script");s.src="vendor/leaflet/leaflet.js";s.onload=ok;s.onerror=no;document.head.appendChild(s)}))}
async function renderMap(){const seen=new Set(),o=[];st.events.filter(e=>(st.tab=="saved"?isSaved(e.id):pass(e))&&!e.industry).forEach(ev=>{const[a,b]=rangeFor(evTz(ev));for(let d=new Date(a);d<=b;d=add(d,1))if(on(ev,d)){if(!seen.has(ev.id)){seen.add(ev.id);o.push({ev,d:new Date(d)})}break}});
 const pins=o.filter(x=>x.ev.lat!=null),off=o.length-pins.length;
 $("#count").textContent=(st.q?`Results for “${st.q}” · `:"")+`${pins.length} event${pins.length==1?"":"s"} on the map ${tabPhrase()}`+(off?` · ${off} without an exact location not shown`:"")+convNote();
 try{await loadLeaflet()}catch(_){$("#mapc").innerHTML='<div class="empty"><h3>Map unavailable offline</h3><p>Connect to the internet once to load the map.</p></div>';return}
 if(!LM){LM=L.map("mapc",{zoomControl:true,attributionControl:true});L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(LM);mk=L.layerGroup().addTo(LM)}
 setTimeout(()=>LM.invalidateSize(),0);mk.clearLayers();const pos={};const ll=[];
 pins.forEach(({ev:e,d})=>{const k=e.lat+","+e.lng,n=pos[k]=(pos[k]||0)+1,ang=n*2.4,r=n>1?.00018*Math.sqrt(n):0,p=[e.lat+r*Math.cos(ang),e.lng+r*Math.sin(ang)];ll.push(p);
  const ic=L.divIcon({className:"pin",html:`<span style="--c:${CV[e.category]||"var(--c-festival)"}"></span>`,iconSize:[26,34],iconAnchor:[13,32],popupAnchor:[0,-28]});
  L.marker(p,{icon:ic,title:e.name,keyboard:true}).bindPopup(`<div class="pop" style="--c:${CV[e.category]||"var(--c-festival)"}"><span class="pop-c">${esc(e.category)}</span><b>${esc(e.name)}</b><span>${when(e,d)} · ${esc(e.time)}</span><span>${priceHtml(e)}</span><button class="pop-b" data-open="${e.id}" data-d="${iso(d)}">View details</button></div>`,{maxWidth:260,minWidth:200}).addTo(mk)});
 if(st.geo&&me){/* keep user marker */}
 const key=st.cities.join(",");if(lastCity!=key||!ll.length){lastCity=key;if(ll.length)LM.fitBounds(ll,{padding:[30,30],maxZoom:14});else if(st.center)LM.setView(st.center,11)}
 if(st.geo&&LM)placeMe(st.geo,false)}
function placeMe(c,pan){if(!LM)return;if(me)me.forEach(x=>x.remove());me=[L.circleMarker(c,{radius:8,color:"#fff",weight:3,fillColor:"#2F80ED",fillOpacity:1}).addTo(LM).bindTooltip("You are here")];if(pan)LM.setView(c,13)}
function askNear(fromMap){if(!navigator.geolocation){$("#count").textContent="Location is not available in this browser.";return}
 if(st.geo&&!fromMap&&st.near){st.near=false;$("#nearSort").setAttribute("aria-pressed","false");render();return}
 const btn=fromMap?$("#nearMe"):$("#nearSort");if(btn)btn.classList.add("busy");
 const ok=p=>{if(btn)btn.classList.remove("busy");st.geo=[p.coords.latitude,p.coords.longitude];st.near=true;$("#nearSort").setAttribute("aria-pressed","true");
  if(LM)placeMe(st.geo,!!fromMap||st.view=="map");render()};
 const no=err=>{if(btn)btn.classList.remove("busy");st.near=false;$("#nearSort").setAttribute("aria-pressed","false");
  $("#count").textContent=err.code==1?"Location permission was denied. Allow it in your browser to use Near me. Your location is only used on this device and is never stored or sent.":"Couldn't get your location right now."};
 navigator.geolocation.getCurrentPosition(ok,no,{enableHighAccuracy:true,timeout:10000,maximumAge:0})}
document.addEventListener("click",e=>{const b=e.target.closest("[data-open]");if(b){LM&&LM.closePopup();openEv(b.dataset.open,b.dataset.d)}
 if(e.target.closest("#nearMe"))askNear(true)});

/* Suggest an event — prefilled mailto, no backend */
function openSuggest(){let dl=$("#suggestSheet");if(!dl){dl=document.createElement("dialog");dl.id="suggestSheet";dl.setAttribute("aria-labelledby","sg-title");document.body.appendChild(dl);
  dl.addEventListener("click",e=>{if(e.target==dl||e.target.closest("[data-sgx]"))dl.close()});
  dl.addEventListener("cancel",()=>{})}
 const opts=ALL.map(x=>`<option value="${esc(x.name)}">${esc(x.name)}</option>`).join("");
 dl.innerHTML=`<div class="sh-in sg-in"><div class="grab" aria-hidden="true"></div><button class="x" data-sgx aria-label="Close"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
  <h2 id="sg-title">Suggest an event</h2><p class="is-p">Opens an email to Happening Now Local with the details filled in. Nothing is stored on this site. Your name and email are optional.</p>
  <form id="sgForm" class="sg-form"><label>Event name <input name="name" required autocomplete="off"></label>
  <label>Date <input name="date" type="date" required></label>
  <label>City <select name="city" required><option value="">Choose a city</option>${opts}</select></label>
  <label>Link <input name="link" type="url" inputmode="url" placeholder="https://" autocomplete="off"></label>
  <label>Notes <textarea name="notes" rows="3" placeholder="Time, place, anything we should know"></textarea></label>
  <p class="sg-opt">Optional — only if you want a reply</p>
  <label>Your name <input name="from" autocomplete="name"></label>
  <label>Your email <input name="email" type="email" autocomplete="email"></label>
  <button type="submit" class="btn">Open email</button></form></div>`;
 const pref=st.cities.length==1?CITY_NAME[st.cities[0]]:"";if(pref)dl.querySelector('[name=city]').value=pref;
 dl.querySelector("#sgForm").onsubmit=e=>{e.preventDefault();const f=e.target,v=n=>f[n].value.trim();
  const body=["Event name: "+v("name"),"Date: "+v("date"),"City: "+v("city"),v("link")?"Link: "+v("link"):"","Notes: "+(v("notes")||"(none)"),(v("from")||v("email"))?"":null,v("from")?"Submitted by: "+v("from"):null,v("email")?"Email: "+v("email"):null].filter(x=>x!=null).join("\n");
  const href=`mailto:${SUGGEST}?subject=${encodeURIComponent("Event suggestion: "+v("name"))}&body=${encodeURIComponent(body)}`;
  location.href=href;dl.close()};
 dl.showModal();dl.querySelector("[name=name]").focus()}

/* Install app */
let BIP=null;const UA=navigator.userAgent,IOS=/iphone|ipad|ipod/i.test(UA)||(navigator.platform=="MacIntel"&&navigator.maxTouchPoints>1),IOS_SAFARI=IOS&&!/crios|fxios|edgios|opios|gsa\//i.test(UA)&&/safari/i.test(UA),
 STANDALONE=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
const SHARE_I=(n)=>'<svg viewBox="0 0 24 24" width="ZZ" height="ZZ" aria-hidden="true"><path d="M12 3v12M8 7l4-4 4 4M6 11v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'.replace(/ZZ/g,n);
function instSheet(){const dl=$("#instSheet");let body;
 if(IOS_SAFARI)body=`<h2 id="is-t">Add to your Home Screen</h2><ol class="steps"><li><span class="sn">1</span><div>Tap the <b>Share</b> button <span class="shi">${SHARE_I(18)}</span> in Safari's toolbar (bottom of the screen on iPhone, top on iPad).</div></li><li><span class="sn">2</span><div>Scroll down and tap <b>Add to Home Screen</b> <span class="shi">＋</span></div></li><li><span class="sn">3</span><div>Tap <b>Add</b>. Happening Now Local will appear on your Home Screen like an app.</div></li></ol>`;
 else if(IOS)body=`<h2 id="is-t">Open in Safari first</h2><p class="is-p">On iPhone and iPad, apps can only be added to the Home Screen from <b>Safari</b>.</p><ol class="steps"><li><span class="sn">1</span><div>Copy this page's link, or tap your browser's menu and choose <b>Open in Safari</b>.</div></li><li><span class="sn">2</span><div>In Safari, tap <b>Share</b> <span class="shi">${SHARE_I(18)}</span>, then <b>Add to Home Screen</b>.</div></li></ol><button class="btn2 is-copy" data-copy>Copy link</button>`;
 else body=`<h2 id="is-t">Install the app</h2><p class="is-p">Your browser didn't offer a one-tap install here, but you can still add it:</p><ol class="steps"><li><span class="sn">1</span><div>Open your browser's menu (<b>⋮</b> or <b>⋯</b>, usually at the top right).</div></li><li><span class="sn">2</span><div>Tap <b>Install app</b> or <b>Add to Home screen</b>. On a computer, you may also see an install icon <b>⊕</b> in the address bar.</div></li></ol>`;
 dl.innerHTML=`<div class="sh-in is-in"><div class="grab" aria-hidden="true"></div><button class="x" data-isx aria-label="Close"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button><div class="is-hd"><img src="icon-192.png" alt="" width="56" height="56"><div><b>Happening Now Local</b><span>Free · works offline</span></div></div>${body}<p class="toast" id="isToast" role="status"></p></div>`;
 dl.showModal()}
async function doInstall(){if(BIP){BIP.prompt();const r=await BIP.userChoice;BIP=null;if(r.outcome=="accepted"){localStorage.hnlInstallX="1";$("#install").hidden=true}return}instSheet()}
(function(){const dl=document.createElement("dialog");dl.id="instSheet";dl.setAttribute("aria-labelledby","is-t");document.body.appendChild(dl);
 dl.addEventListener("click",e=>{if(e.target==dl||e.target.closest("[data-isx]"))dl.close();if(e.target.closest("[data-copy]"))navigator.clipboard.writeText(location.origin+location.pathname).then(()=>$("#isToast").textContent="Link copied. Paste it into Safari.",()=>$("#isToast").textContent=location.origin+location.pathname)});
 const hb=$("#getApp"),el=$("#install"),ls=localStorage;
 const upd=()=>{const s=STANDALONE();hb.hidden=s;if(s)el.hidden=true};upd();matchMedia("(display-mode: standalone)").addEventListener?.("change",upd);
 hb.addEventListener("click",doInstall);
 const icon='<img src="icon-192.png" alt="" width="40" height="40">';
 const show=html=>{if(STANDALONE()||ls.hnlInstallX=="1")return;el.innerHTML=html+'<button class="inst-x" data-act="installX" aria-label="Dismiss">×</button>';el.hidden=false};
 window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();BIP=e;show(`${icon}<div><b>Get the app</b><span>Install Happening Now Local for quick access.</span></div><button class="inst-b" data-act="install">Install app</button>`)});
 window.addEventListener("appinstalled",()=>{el.hidden=true;hb.hidden=true;ls.hnlInstallX="1";BIP=null});
 if(IOS_SAFARI)show(`${icon}<div><b>Add to your Home Screen</b><span>Tap ${SHARE_I(16)} Share, then <b>Add to Home Screen</b>.</span></div>`);
 el.addEventListener("click",e=>{if(e.target.closest("[data-act=installX]")){el.hidden=true;ls.hnlInstallX="1"}if(e.target.closest("[data-act=install]"))doInstall()})})();
updSavedCount();
