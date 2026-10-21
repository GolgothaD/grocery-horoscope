const SYM=[
[/banana/,"🍌","The Curved Messenger","potassium of purpose","yellow"],[/hot sauce|sriracha|salsa|pepper|jalape/,"🌶️","The Burning Tongue","chaos approaches from the east","red"],
[/egg/,"🥚","The Fragile Beginning","something new hatches, handle with care","white"],[/milk|cream|yogurt/,"🥛","The Pale Comfort","soothing times, check the expiration date of your grudges","white"],
[/bread|bagel|bun|tortilla/,"🍞","The Rising Loaf","your efforts will rise if given warmth and patience","brown"],[/pizza/,"🍕","The Wheel of Cheese","fortune turns, and someone wants a slice","red"],
[/chips|doritos|pringles|cheetos/,"🥔","The Crunch","a loud decision awaits; do not hesitate","orange"],[/coffee|energy|red bull|monster/,"☕","The Restless Star","you will be awake for something important (or unimportant, but awake)","brown"],
[/apple/,"🍎","The Forbidden Crunch","temptation, plus fiber","red"],[/cheese/,"🧀","The Golden Wedge","abundance with holes in it","yellow"],[/chicken|turkey/,"🍗","The Grounded Bird","a plan that cannot fly will still feed many","brown"],
[/beef|steak|burger/,"🥩","The Iron Hearth","strength, and a smoke alarm","red"],[/fish|salmon|tuna/,"🐟","The Swimmer Upstream","you go against the current and win","pink"],[/candy|chocolate|cookie|cake|donut|ice cream/,"🍫","The Sweet Deceiver","joy now, regret at 2 AM","brown"],
[/lettuce|spinach|kale|salad|broccoli/,"🥬","The Verdant Oath","you swear to be healthy. The leaves remember.","green"],[/soda|pop|coke|pepsi|sprite/,"🥤","The Fizzing Oracle","a bubbly secret will soon surface","brown"],
[/rice|pasta|noodle|ramen/,"🍜","The Endless Strand","patience, length, and boiling water","white"],[/beer|wine|vodka|seltzer/,"🍷","The Loosened Tongue","truths will be spoken, maybe karaoke","purple"],
[/onion|garlic/,"🧅","The Weeping Layers","you will cry, but it will be delicious","white"],[/avocado/,"🥑","The Green Gamble","ripe only for 11 minutes; seize the moment","green"],
[/toilet|paper towel|tissue/,"🧻","The Endless Scroll","preparation is the highest magic","white"],[/cereal/,"🥣","The Morning Spiral","childhood wisdom returns to guide you","orange"],
[/peanut|butter|jelly/,"🥜","The Sticky Bond","an alliance forms that is hard to pull apart","brown"],[/battery|batteries/,"🔋","The Stored Sun","your solar destiny draws near","green"],
[/lemon|lime/,"🍋","The Sour Truth","life gives you exactly what it says","yellow"],[/potato/,"🥔","The Humble Root","underestimated, yet powers entire empires","brown"],[/strawberr|berr|cherr/,"🍓","The Red Jewel","a small sweet thing will brighten a dull day","red"]];
const UNK=["The Mystery Aisle","The Unknown Barcode","The Clearance Spirit","The Item of Shadows"];
const COMBOS=[[["🍌","🌶️"],"Bananas and fire together? A bold, unstable alliance. Expect a dramatic text message."],[["🥚","🍞"],"Eggs and bread: the breakfast covenant. A cozy morning is written in the stars."],[["🍕","🥤"],"Pizza and pop: the Friday Conjunction. Responsibilities will be postponed."],[["☕","🍫"],"Caffeine and sugar align. You will reorganize something at midnight."],[["🥬","🍫"],"Salad and chocolate: the Great Contradiction. Your soul is at war, and both sides are winning."],[["🧀","🍷"],"Cheese and wine: you will feel fancy for exactly one evening."],[["🍗","🥔"],"Bird and root: a hearty, grounded week awaits."]];
const COUNT=[[1,"One lone item. A focused soul, or someone who forgot the list in the car."],[4,"A small, cautious cart. The universe respects your restraint."],[9,"A balanced haul. Harmony is within reach (and within budget, maybe)."],[15,"A mighty cart. You are feeding an army, or preparing for prophecy."],[999,"This is not a cart, it is a pilgrimage. The cashier will remember your name."]];
const COLOR={red:"Red dominates: passion, urgency, and possibly heartburn.",green:"Green rises: growth, money, and good intentions that last until Thursday.",yellow:"Yellow glows: optimism and a sunny surprise.",brown:"Brown grounds you: comfort, stability, and carbs.",white:"White calms: a blank page, a fresh start.",orange:"Orange crackles: creativity and cheese dust.",purple:"Purple whispers: mystery and drama.",pink:"Pink flows: tenderness and swimming upstream."};
const FATE=["Beware a person holding a coupon.","A shopping cart with a wobbly wheel will test your patience.","Your next self-checkout will go flawlessly. Savor it.","Someone will ask, \"Do you work here?\" Answer wisely.","A forgotten item calls to you from aisle 7.","Great fortune is found in the clearance bin."];
const LUCKY=["a single lemon","canned peaches","a rotisserie chicken","sour gummy worms","a pineapple","generic-brand cereal","a jar of pickles","frozen peas","a baguette","oat milk","a bag of clementines","tater tots"];
const esc=t=>String(t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const $=id=>document.getElementById(id),pick=a=>a[Math.floor(Math.random()*a.length)];
function hash(s){let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))|0;return Math.abs(h)}
const today=new Date().toDateString();$("lucky").innerHTML=`Today's lucky item<b>✦ ${LUCKY[hash(today)%LUCKY.length]} ✦</b><small>Lucky aisle: ${hash(today+"a")%14+1} · Lucky number: ${hash(today+"n")%99+1}</small>`;
$("ex").onclick=()=>{$("cart").value="bananas\nhot sauce\nfrozen pizza\neggs\ncoffee\nchocolate\nspinach"};
$("cart").value=localStorage.ghCart||"";
let last=null,RT=0;
$("read").onclick=()=>{const items=$("cart").value.split(/[\n,]+/).map(s=>s.trim()).filter(Boolean);if(!items.length){$("msg").textContent="The spirits require at least one item…";$("cart").focus();return}$("msg").textContent="";const tok=++RT;
 localStorage.ghCart=$("cart").value;
 const found=items.map(it=>{const m=SYM.find(s=>s[0].test(it.toLowerCase()));return m?{it,e:m[1],t:m[2],m:m[3],c:m[4]}:{it,e:"❔",t:UNK[hash(it)%UNK.length],m:`"${it.length>40?it.slice(0,40)+"…":it}" is beyond even the stars' understanding; expect the unexpected`,c:null}}).map(f=>({...f,m:esc(f.m)}));
 const uniq=[...new Map(found.map(f=>[f.t,f])).values()];const three=[...uniq].sort((a,b)=>hash(a.it+today)-hash(b.it+today)).slice(0,3);while(three.length<3)three.push({e:"✨",t:"The Empty Basket",m:"room for possibility"});
 const pos=["Past","Present","Future"];
 $("cards").innerHTML=three.map((c,i)=>`<div class="tc"><div class="back">✦</div><div class="front"><small>${pos[i]}</small><span class="e">${c.e}</span><small>${c.t}</small></div></div>`).join("");
 const P=[];P.push(`Your ${pos[0]}: <b>${three[0].t}</b>, ${three[0].m}. In your present sits <b>${three[1].t}</b>: ${three[1].m}. And your future holds <b>${three[2].t}</b>, ${three[2].m}.`);
 const es=new Set(found.map(f=>f.e));COMBOS.forEach(([k,t])=>{if(k.every(x=>es.has(x)))P.push(t)});
 P.push(COUNT.find(c=>items.length<=c[0])[1]+` (${items.length} item${items.length>1?"s":""}.)`);
 const cc={};found.forEach(f=>f.c&&(cc[f.c]=(cc[f.c]||0)+1));const top=Object.entries(cc).sort((a,b)=>b[1]-a[1])[0];if(top)P.push(COLOR[top[0]]);
 const dup=items.map(s=>s.toLowerCase()).filter((x,i,a)=>a.indexOf(x)!=i);if(dup.length)P.push(`You listed "${esc(dup[0].slice(0,40))}" twice. The universe hears your craving loud and clear.`);
 P.push("Final omen: "+FATE[hash(items.join()+today)%FATE.length]);
 last={three,P};$("res").classList.remove("hide");$("img").classList.add("hide");$("reading").innerHTML="";
 const cards=[...document.querySelectorAll(".tc")];cards.forEach((c,i)=>setTimeout(()=>tok==RT&&c.classList.add("flip"),400+i*650));
 setTimeout(()=>{if(tok!=RT)return;$("reading").innerHTML="<h2>Thy Reading</h2>"+P.map((p,i)=>`<p class="fade" style="animation-delay:${i*.35}s">${p}</p>`).join("");$("res").scrollIntoView({behavior:"smooth"})},2300)};
function wrap(x,t,X,Y,w,lh){const ws=t.split(" ");let l="";for(const w2 of ws){if(x.measureText(l+w2).width>w){x.fillText(l,X,Y);Y+=lh;l=""}l+=w2+" "}x.fillText(l,X,Y);return Y+lh}
$("share").onclick=async()=>{if(!last)return;try{await document.fonts.load("bold 64px 'Cinzel Decorative'");await document.fonts.load("30px 'Cormorant Garamond'")}catch(e){}const c=$("cv"),x=c.getContext("2d");const g=x.createRadialGradient(540,200,50,540,600,1100);g.addColorStop(0,"#3b1c5a");g.addColorStop(1,"#0e0619");x.fillStyle=g;x.fillRect(0,0,1080,1350);
 for(let i=0;i<160;i++){x.fillStyle=`rgba(255,240,200,${Math.random()})`;x.fillRect(Math.random()*1080,Math.random()*1350,2,2)}
 x.strokeStyle="#ffd77a";x.lineWidth=4;x.strokeRect(30,30,1020,1290);x.textAlign="center";x.fillStyle="#ffd77a";x.font="bold 64px 'Cinzel Decorative',serif";x.fillText("Grocery Horoscope",540,130);
 x.font="italic 32px Georgia";x.fillStyle="#f3e6c4";x.fillText(today,540,180);
 last.three.forEach((c,i)=>{const X=110+i*300;x.fillStyle="#f2deaa";x.fillRect(X,230,260,400);x.strokeStyle="#ffd77a";x.strokeRect(X,230,260,400);x.font="120px serif";x.fillText(c.e,X+130,460);x.fillStyle="#2a1440";x.font="bold 26px Georgia";wrap(x,c.t,X+130,560,230,32)});
 x.fillStyle="#f3e6c4";x.font="34px 'Cormorant Garamond',Georgia";let Y=700;const dec=t=>{const d=document.createElement("textarea");d.innerHTML=t.replace(/<[^>]+>/g,"");return d.value};for(const p of last.P){if(Y>1180)break;Y=wrap(x,dec(p),540,Y,940,40)+12}
 x.fillStyle="#ffd77a";x.font="26px Georgia";x.fillText("✦ golgothad.github.io/grocery-horoscope ✦",540,1290);
 c.toBlob(b=>{const f=new File([b],"grocery-horoscope.png",{type:"image/png"});if(navigator.canShare&&navigator.canShare({files:[f]}))navigator.share({files:[f],title:"My Grocery Horoscope"}).catch(()=>{});else{const u=URL.createObjectURL(b);$("dl").href=u;$("dl").click();$("msg2").textContent="Image downloaded. You can also long-press it below to save."}
 $("img").src=c.toDataURL();$("img").classList.remove("hide")})};
