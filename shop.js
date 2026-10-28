/* ===== 코인 쓰는 곳 (2026-10-28): 🛍 꾸미기 상점 · 🏠 내 기지 · 📚 보너스 학습 · (❤ 이어하기권은 game.js)
   원칙: 코인으로 공부를 건너뛰거나 힘을 살 수 없어요. 보이는 것만 바뀌거나, 코인이 다시 공부로 돌아와요.
   새 물건은 아래 목록에 한 줄씩 더하면 바로 상점에 나와요 (나중에 더 넣기 쉽게). */

/* ---------- 물건 목록 ---------- */
const COS_ITEMS=[
  /* 칭호 테두리 (게임 속 발밑 칭호 · 칭호가 없으면 내 이름) */
  {id:"fr_gold", kind:"frame", n:"금빛 테두리", cost:300, c1:"#ffd36a", c2:"#fff3c0"},
  {id:"fr_ice",  kind:"frame", n:"얼음 테두리", cost:400, c1:"#7fd8ff", c2:"#e6fbff"},
  {id:"fr_fire", kind:"frame", n:"불꽃 테두리", cost:500, c1:"#ff6a3a", c2:"#ffd36a"},
  {id:"fr_leaf", kind:"frame", n:"새싹 테두리", cost:500, c1:"#5ee07a", c2:"#e8ffd8"},
  {id:"fr_star", kind:"frame", n:"별빛 테두리", cost:700, c1:"#b98aff", c2:"#ffe8ff"},
  {id:"fr_rain", kind:"frame", n:"무지개 테두리", cost:1200, c1:"#ff5a8a", c2:"#5ad8ff", rainbow:1},
  /* 발밑 효과 (미리 그려 둔 그림 한 장 · 렉 거의 없음) */
  {id:"ft_petal", kind:"foot", n:"꽃잎 원", cost:600, ic:"🌸", col:"#ff8ac8"},
  {id:"ft_leaf",  kind:"foot", n:"풀잎 원", cost:600, ic:"🍀", col:"#5ee07a"},
  {id:"ft_ice",   kind:"foot", n:"눈꽃 원", cost:800, ic:"❄️", col:"#8fe4ff"},
  {id:"ft_fire",  kind:"foot", n:"불꽃 원", cost:800, ic:"🔥", col:"#ff7a3a"},
  {id:"ft_star",  kind:"foot", n:"별빛 원", cost:1000, ic:"⭐", col:"#ffd36a"},
  {id:"ft_hanja", kind:"foot", n:"한자 원", cost:1500, txt:"天地人風水火木金", col:"#ffe39a"},
  /* 펫 (나를 따라다녀요) */
  {id:"pt_cat",   kind:"pet", n:"고양이", cost:800, ic:"🐱"},
  {id:"pt_dog",   kind:"pet", n:"강아지", cost:800, ic:"🐶"},
  {id:"pt_rab",   kind:"pet", n:"토끼", cost:1000, ic:"🐰"},
  {id:"pt_turt",  kind:"pet", n:"거북이", cost:1000, ic:"🐢"},
  {id:"pt_fox",   kind:"pet", n:"여우", cost:1500, ic:"🦊"},
  {id:"pt_owl",   kind:"pet", n:"부엉이", cost:1500, ic:"🦉"},
  {id:"pt_panda", kind:"pet", n:"판다", cost:2000, ic:"🐼"},
  {id:"pt_drag",  kind:"pet", n:"아기 용", cost:3000, ic:"🐲"},
];
const BASE_ITEMS=[
  /* 벽지 · 바닥 (하나씩 골라요) */
  {id:"wl_sky",   kind:"wall", n:"하늘 벽지", cost:0,   bg:"linear-gradient(#bfe6ff,#e8f6ff)"},
  {id:"wl_night", kind:"wall", n:"밤하늘 벽지", cost:300, bg:"radial-gradient(circle at 20% 30%,#fff 0 1.5px,transparent 2px),radial-gradient(circle at 70% 20%,#fff 0 1px,transparent 2px),radial-gradient(circle at 45% 60%,#fff 0 1px,transparent 2px),linear-gradient(#1c1a4a,#3a2f7a)"},
  {id:"wl_forest",kind:"wall", n:"숲 벽지", cost:300, bg:"linear-gradient(#d9f7d0,#a8e0a0)"},
  {id:"wl_hanji", kind:"wall", n:"한지 벽지", cost:400, bg:"repeating-linear-gradient(90deg,#f6ecd6 0 38px,#efe2c4 38px 40px)"},
  {id:"wl_sunset",kind:"wall", n:"노을 벽지", cost:500, bg:"linear-gradient(#ffb36a,#ff7aa8 70%,#8a5ad8)"},
  {id:"wl_castle",kind:"wall", n:"성 벽지", cost:800, bg:"repeating-linear-gradient(0deg,#8a8aa0 0 2px,transparent 2px 30px),repeating-linear-gradient(90deg,#8a8aa0 0 2px,#b9b9cc 2px 60px)"},
  {id:"fl_wood",  kind:"floor", n:"나무 바닥", cost:0,  bg:"repeating-linear-gradient(90deg,#c48a52 0 46px,#b07a46 46px 48px)"},
  {id:"fl_grass", kind:"floor", n:"잔디 바닥", cost:300, bg:"linear-gradient(#7ccf5a,#5cb043)"},
  {id:"fl_tile",  kind:"floor", n:"타일 바닥", cost:300, bg:"repeating-conic-gradient(#f2f2f2 0 25%,#d8dce6 0 50%) 0 0/40px 40px"},
  {id:"fl_carpet",kind:"floor", n:"빨간 양탄자", cost:500, bg:"linear-gradient(#c8372d,#9a2a22)"},
  {id:"fl_cloud", kind:"floor", n:"구름 바닥", cost:800, bg:"radial-gradient(circle at 20% 40%,#fff 0 18px,transparent 19px),radial-gradient(circle at 60% 70%,#fff 0 22px,transparent 23px),linear-gradient(#e6f2ff,#cfe2ff)"},
  /* 장식 (벽 칸 3개 · 바닥 칸 5개에 놓아요) */
  {id:"dc_frame", kind:"deco", spot:"wall", n:"그림 액자", cost:150, ic:"🖼️"},
  {id:"dc_clock", kind:"deco", spot:"wall", n:"벽시계", cost:150, ic:"🕰️"},
  {id:"dc_flag",  kind:"deco", spot:"wall", n:"탐험대 깃발", cost:250, ic:"🚩"},
  {id:"dc_window",kind:"deco", spot:"wall", n:"창문", cost:300, ic:"🪟"},
  {id:"dc_scroll",kind:"deco", spot:"wall", n:"한자 족자", cost:400, txt:"學"},
  {id:"dc_map",   kind:"deco", spot:"wall", n:"보물 지도", cost:500, ic:"🗺️"},
  {id:"dc_plant", kind:"deco", spot:"floor", n:"화분", cost:100, ic:"🪴"},
  {id:"dc_books", kind:"deco", spot:"floor", n:"책 더미", cost:150, ic:"📚"},
  {id:"dc_bear",  kind:"deco", spot:"floor", n:"곰 인형", cost:200, ic:"🧸"},
  {id:"dc_globe", kind:"deco", spot:"floor", n:"지구본", cost:300, ic:"🌍"},
  {id:"dc_sofa",  kind:"deco", spot:"floor", n:"소파", cost:400, ic:"🛋️"},
  {id:"dc_game",  kind:"deco", spot:"floor", n:"게임기", cost:500, ic:"🎮"},
  {id:"dc_tent",  kind:"deco", spot:"floor", n:"탐험 텐트", cost:700, ic:"⛺"},
  {id:"dc_chest", kind:"deco", spot:"floor", n:"보물 상자", cost:900, ic:"🧰"},
  {id:"dc_trophy",kind:"deco", spot:"floor", n:"황금 트로피", cost:1500, ic:"🏆"},
  {id:"dc_castle",kind:"deco", spot:"floor", n:"모래성", cost:2000, ic:"🏰"},
];
const BONUS_PRICE=300, BONUS_N=12;   /* 보너스 학습 묶음 하나 = 12개 · 300코인 */

/* ---------- 저장 ---------- */
function cosState(){ P.cos=P.cos||{}; const C=P.cos; C.own=C.own||{}; C.eq=C.eq||{}; C.base=C.base||{wall:"wl_sky",floor:"fl_wood",spots:[]}; if(!Array.isArray(C.base.spots)) C.base.spots=[]; C.own.wl_sky=1; C.own.fl_wood=1; return C }
const cosItem=id=>COS_ITEMS.find(x=>x.id===id)||BASE_ITEMS.find(x=>x.id===id);
function cosEq(){ if(!P) return {}; const C=cosState(), o={}; for(const k of ["frame","foot","pet"]){ const it=C.eq[k]&&cosItem(C.eq[k]); if(it&&C.own[it.id]) o[k]=it.id } return o }
function cosBuy(it,after){ const C=cosState(); if(C.own[it.id]) return after&&after(); const adm=typeof isAdmin==="function"&&isAdmin();
  if(!adm&&P.coins<it.cost){ toast(`코인이 ${it.cost-P.coins}개 모자라요. 공부해서 모아요!`); return }
  modal.dataset.dismiss=""; openModal(`<h3>${cosIcon(it,44)} ${esc(it.n)}</h3><p>${it.cost}코인으로 살까요?${adm?" <small>(선생님 모드는 무료)</small>":""}</p><div class="btns"><button class="btn gold" id="cbY">살게요</button><button class="btn ghost" id="cbN">그만둘래요</button></div>`);
  document.getElementById("cbN").onclick=()=>closeModal();
  document.getElementById("cbY").onclick=()=>{ if(!adm){ if(P.coins<it.cost) return; setCoins(P.coins-it.cost); P.spent=(P.spent||0)+it.cost } C.own[it.id]=1; if(it.kind==="frame"||it.kind==="foot"||it.kind==="pet") C.eq[it.kind]=it.id; saveP(); sfx("unlock"); closeModal(); toast(`🎉 '${it.n}'을(를) 샀어요!`); after&&after() } }
function cosIcon(it,sz){ sz=sz||32; if(it.kind==="frame") return `<span class="cfr" style="--c1:${it.c1};--c2:${it.c2};${it.rainbow?"background:linear-gradient(90deg,#ff5a8a,#ffd36a,#5ee07a,#5ad8ff,#b98aff);":""}">칭호</span>`;
  if(it.kind==="wall"||it.kind==="floor") return `<span class="cbg" style="background:${it.bg};width:${sz}px;height:${sz}px"></span>`;
  if(it.txt) return `<span style="display:inline-flex;align-items:center;justify-content:center;width:${sz*.7}px;height:${sz}px;background:#f6ecd6;border:2px solid #7a4a20;border-top:5px solid #5a3410;border-bottom:5px solid #5a3410;border-radius:3px;font-family:'Noto Serif KR',serif;font-weight:900;font-size:${sz*.48}px;color:#2a1608">${esc(it.txt[0])}</span>`;
  return `<span style="font-size:${sz*.8}px;line-height:1">${it.ic||"?"}</span>` }

/* ---------- 게임 속 그리기 (미리 그린 그림을 붙이기만 해요 · 가벼움 단계 2 이상이면 펫·발밑 효과는 쉬어요) ---------- */
const COS={ _c:{},
  img(key,w,h,fn){ let c=this._c[key]; if(c) return c; c=document.createElement("canvas"); c.width=w; c.height=h; try{ fn(c.getContext("2d"),w,h) }catch(e){} return this._c[key]=c },
  foot(ctx,x,y,t,id){ if(!id||(window.__fxLow||0)>=2) return; const it=cosItem(id); if(!it) return;
    const im=this.img("ft_"+id,120,44,(c,w,h)=>{ c.translate(w/2,h/2); c.strokeStyle=it.col; c.globalAlpha=.85; c.lineWidth=3.5; c.beginPath(); c.ellipse(0,0,46,14,0,0,7); c.stroke(); c.globalAlpha=1;
      const n=8; c.textAlign="center"; c.textBaseline="middle"; for(let i=0;i<n;i++){ const a=i/n*Math.PI*2, px=Math.cos(a)*46, py=Math.sin(a)*14; if(it.txt){ c.font="900 15px 'Noto Serif KR',serif"; c.lineWidth=3; c.strokeStyle="rgba(40,20,0,.8)"; c.strokeText(it.txt[i%it.txt.length],px,py); c.fillStyle=it.col; c.fillText(it.txt[i%it.txt.length],px,py) } else { c.font="12px sans-serif"; c.fillText(it.ic,px,py) } } });
    ctx.save(); ctx.globalAlpha=.75+.25*Math.sin(t*3); ctx.drawImage(im,x-60,y-22); ctx.restore() },
  petImg(id){ const it=cosItem(id); return this.img("pt_"+id,56,56,(c,w,h)=>{ c.font="44px sans-serif"; c.textAlign="center"; c.textBaseline="middle"; c.fillText(it.ic,w/2,h/2+2) }) },
  pet(ctx,st,x,y,f,t,id,dt){ if(!id||(window.__fxLow||0)>=2) return; const it=cosItem(id); if(!it) return; const tx=x-(f||1)*46, ty=y-6;
    if(st.px==null){ st.px=tx; st.py=ty } const k=Math.min(1,(dt||.016)*6); st.px+=(tx-st.px)*k; st.py+=(ty-st.py)*k; const bob=Math.abs(Math.sin(t*5))*5;
    ctx.save(); ctx.fillStyle="rgba(20,16,30,.18)"; ctx.beginPath(); ctx.ellipse(st.px,st.py+20,14,4,0,0,7); ctx.fill(); ctx.translate(st.px,st.py-bob); if((f||1)<0) ctx.scale(-1,1); ctx.drawImage(this.petImg(id),-28,-28); ctx.restore() },
  frame(id){ const it=id&&cosItem(id); return it&&it.kind==="frame"?it:null }
};

/* ---------- 🛍 꾸미기 상점 ---------- */
function shop(tab){ const C=cosState(); tab=tab||P.set.shopTab||"frame"; P.set.shopTab=tab;
  const TABS=[["frame","🏷 칭호 테두리"],["foot","✨ 발밑 효과"],["pet","🐾 펫"]], L=COS_ITEMS.filter(x=>x.kind===tab);
  $app.innerHTML=topbar("상점")+`<section class="panel"><p class="meta" style="margin:0 0 8px">🛍 보기만 바뀌어요 (힘은 그대로) · 같이하기 친구에게도 보여요 · 산 물건은 눌러서 끼웠다 뺐다 해요</p>
    <div class="shTabs">${TABS.map(([k,n])=>`<button class="${k===tab?"on":""}" data-st="${k}">${n}</button>`).join("")}<button data-go2="base">🏠 내 기지</button><button data-go2="bonus">📚 보너스 학습</button></div>
    <div class="shGrid">${L.map(it=>{ const own=C.own[it.id], on=C.eq[it.kind]===it.id; return `<button class="shItem ${own?"own":""} ${on?"on":""}" data-sid="${it.id}"><span class="shIc">${cosIcon(it,46)}</span><b>${esc(it.n)}</b><small>${on?"✔ 끼는 중":own?"눌러서 끼기":`🪙 ${it.cost}`}</small></button>` }).join("")}</div>
    <p class="muted" style="margin-top:10px">${tab==="frame"?"게임 속 발밑 칭호에 테두리가 생겨요. 칭호가 없으면 내 이름이 나와요.":tab==="foot"?"게임 속 내 발밑에 빙글 원이 생겨요.":"게임 속에서 나를 졸졸 따라다녀요."} 렉이 심해 가벼운 그리기로 바뀌면 발밑 효과·펫은 잠깐 쉬어요.</p></section>`;
  bindBack();
  $app.querySelectorAll("[data-st]").forEach(b=>b.onclick=()=>{ sfx("tap"); shop(b.dataset.st) });
  $app.querySelectorAll("[data-go2]").forEach(b=>b.onclick=()=>{ sfx("tap"); b.dataset.go2==="base"?baseRoom():bonusLearn() });
  $app.querySelectorAll("[data-sid]").forEach(b=>b.onclick=()=>{ const it=cosItem(b.dataset.sid); if(!C.own[it.id]) return cosBuy(it,()=>shop(tab)); sfx("tap"); C.eq[it.kind]=C.eq[it.kind]===it.id?"":it.id; saveP(); shop(tab) }) }

/* ---------- 🏠 내 기지 ---------- */
const BASE_SPOTS=[["wall",14,18],["wall",44,12],["wall",74,18],["floor",10,70],["floor",30,80],["floor",50,70],["floor",70,80],["floor",88,70]];   /* [벽/바닥, 왼쪽 %, 위 %] */
function baseRoom(pick){ const C=cosState(), B=C.base, W=cosItem(B.wall)||BASE_ITEMS[0], F=cosItem(B.floor)||BASE_ITEMS.find(x=>x.kind==="floor");
  const tShown=typeof titleShown==="function"?titleShown():null, cards=typeof cardCount==="function"?cardCount():0, mast=UNIQUE.filter(c=>(P.mastery[c.h]||0)>=MASTER_N).length, says=typeof SAJA!=="undefined"?SAJA.concat(SOK).filter(sayMastered).length:0;
  $app.innerHTML=topbar("내 기지")+`<section class="panel">
    <div class="baseRoom"><div class="brWall" style="background:${W.bg}"></div><div class="brFloor" style="background:${F.bg}"></div>
      <div class="brShelf"><span>📖 익힌 한자 <b>${mast}</b></span><span>📜 익힌 말 <b>${says}</b></span><span>🃏 보스 카드 <b>${cards}</b></span>${tShown?`<span>🏷 ${titlePill(tShown)}</span>`:""}</div>
      ${BASE_SPOTS.map(([sp,l,t],i)=>{ const it=B.spots[i]&&cosItem(B.spots[i]); return `<button class="brSpot ${sp} ${pick===i?"sel":""} ${it?"has":""}" data-spot="${i}" style="left:${l}%;top:${t}%">${it?cosIcon(it,sp==="wall"?42:52):"＋"}</button>` }).join("")}
    </div>
    ${pick!=null?`<p class="meta" style="margin:10px 0 6px">${BASE_SPOTS[pick][0]==="wall"?"벽":"바닥"} 칸에 놓을 장식을 골라요</p><div class="shGrid">${BASE_ITEMS.filter(x=>x.kind==="deco"&&x.spot===BASE_SPOTS[pick][0]).map(it=>`<button class="shItem ${C.own[it.id]?"own":""} ${B.spots[pick]===it.id?"on":""}" data-bd="${it.id}"><span class="shIc">${cosIcon(it,40)}</span><b>${esc(it.n)}</b><small>${B.spots[pick]===it.id?"✔ 놓는 중 (누르면 빼요)":C.own[it.id]?"눌러서 놓기":`🪙 ${it.cost}`}</small></button>`).join("")}</div>`
      :`<p class="meta" style="margin:10px 0 6px">＋ 칸을 누르면 장식을 놓을 수 있어요 · 아래에서 벽지와 바닥을 바꿔요</p>`}
    <h3 class="brH">🧱 벽지</h3><div class="shGrid">${BASE_ITEMS.filter(x=>x.kind==="wall").map(it=>`<button class="shItem ${C.own[it.id]?"own":""} ${B.wall===it.id?"on":""}" data-bw="${it.id}"><span class="shIc">${cosIcon(it,40)}</span><b>${esc(it.n)}</b><small>${B.wall===it.id?"✔ 쓰는 중":C.own[it.id]?"눌러서 바꾸기":`🪙 ${it.cost}`}</small></button>`).join("")}</div>
    <h3 class="brH">🟫 바닥</h3><div class="shGrid">${BASE_ITEMS.filter(x=>x.kind==="floor").map(it=>`<button class="shItem ${C.own[it.id]?"own":""} ${B.floor===it.id?"on":""}" data-bf="${it.id}"><span class="shIc">${cosIcon(it,40)}</span><b>${esc(it.n)}</b><small>${B.floor===it.id?"✔ 쓰는 중":C.own[it.id]?"눌러서 바꾸기":`🪙 ${it.cost}`}</small></button>`).join("")}</div>
    <div class="btns"><button class="btn ghost" id="toShop">🛍 상점으로</button></div></section>`;
  bindBack(); document.getElementById("toShop").onclick=()=>{ sfx("tap"); shop() };
  $app.querySelectorAll("[data-spot]").forEach(b=>b.onclick=()=>{ sfx("tap"); const i=+b.dataset.spot; baseRoom(pick===i?null:i) });
  $app.querySelectorAll("[data-bd]").forEach(b=>b.onclick=()=>{ const it=cosItem(b.dataset.bd); const put=()=>{ B.spots[pick]=B.spots[pick]===it.id?"":it.id; saveP(); sfx("pick"); baseRoom(pick) }; C.own[it.id]?put():cosBuy(it,put) });
  $app.querySelectorAll("[data-bw]").forEach(b=>b.onclick=()=>{ const it=cosItem(b.dataset.bw); const put=()=>{ B.wall=it.id; saveP(); sfx("pick"); baseRoom(pick) }; C.own[it.id]?put():cosBuy(it,put) });
  $app.querySelectorAll("[data-bf]").forEach(b=>b.onclick=()=>{ const it=cosItem(b.dataset.bf); const put=()=>{ B.floor=it.id; saveP(); sfx("pick"); baseRoom(pick) }; C.own[it.id]?put():cosBuy(it,put) }) }

/* ---------- 📚 보너스 학습: 비슷한 말·반대 말 묶음을 코인으로 열어 공부해요 ---------- */
let BONUS_PACKS=null;
function bonusPacks(){ if(BONUS_PACKS) return BONUS_PACKS; const seen=new Set(), sim=[], opp=[]; const ALL=typeof SAJA!=="undefined"?SAJA.concat(SOK):[];
  const inList=k=>typeof sayRelFind==="function"&&!!sayRelFind(k);
  for(const x of ALL){ for(const [arr,rel,dst] of [[x.sim||[],"sim",sim],[x.opp||[],"opp",opp]]) for(const r of arr){ const key=r.k.replace(/\(.*?\)/g,"").replace(/\s+/g,""); if(seen.has(key)||inList(r.k)) continue; seen.add(key); dst.push({k:r.k,m:r.m,base:x.k,rel,id:key}) } }
  const P_=[]; const cut=(arr,nm,ic)=>{ for(let i=0;i*BONUS_N<arr.length;i++){ const L=arr.slice(i*BONUS_N,(i+1)*BONUS_N); if(L.length<6&&P_.length&&P_[P_.length-1].nm===nm){ P_[P_.length-1].L.push(...L); continue } P_.push({id:nm+"_"+(i+1),nm,ic,no:i+1,L}) } };
  cut(sim,"비슷한 말 모음","🤝"); cut(opp,"반대 말 모음","↔"); return BONUS_PACKS=P_ }
function bonusState(){ P.bonus=P.bonus||{}; const B=P.bonus; B.own=B.own||{}; B.ok=B.ok||{}; return B }
const BONUS_MASTER=2;   /* 보너스 말은 2번 맞히면 익힌 것 */
function bonusLearn(){ const B=bonusState(), PK=bonusPacks(), adm=typeof isAdmin==="function"&&isAdmin();
  const done=pk=>pk.L.filter(x=>(B.ok[x.id]||0)>=BONUS_MASTER).length;
  $app.innerHTML=topbar("보너스 학습")+`<section class="panel"><p class="meta" style="margin:0 0 8px">📚 배운 사자성어·속담과 <b>뜻이 비슷한 말·반대인 말</b>을 더 배워요 · 묶음 하나 ${BONUS_PRICE}코인 · 한 번 열면 계속 공부할 수 있어요 · 퀴즈 7개 이상 맞히면 코인 조금 돌려받아요</p>
    <div class="bnGrid">${PK.map(pk=>{ const own=B.own[pk.id], d=done(pk); return `<button class="bnPack ${own?"own":""}" data-bp="${pk.id}"><span class="bnIc">${pk.ic}</span><b>${pk.nm} ${pk.no}</b><small>${pk.L.slice(0,3).map(x=>esc(x.k.replace(/\(.*?\)/g,""))).join(" · ")}…</small><i>${own?`익힘 ${d}/${pk.L.length}${d===pk.L.length?" 🎉":""}`:`🔒 🪙 ${BONUS_PRICE}`}</i></button>` }).join("")}</div>
    <div class="btns"><button class="btn ghost" id="toShop">🛍 상점으로</button></div></section>`;
  bindBack(); document.getElementById("toShop").onclick=()=>{ sfx("tap"); shop() };
  $app.querySelectorAll("[data-bp]").forEach(b=>b.onclick=()=>{ const pk=PK.find(x=>x.id===b.dataset.bp); if(B.own[pk.id]) return bonusPack(pk);
    const it={id:"bn_"+pk.id,n:`${pk.nm} ${pk.no}`,cost:BONUS_PRICE,ic:pk.ic,kind:"bonus"}; const C=cosState();
    cosBuy(it,()=>{ delete C.own[it.id]; B.own[pk.id]=1; saveP(); bonusPack(pk) }) }) }
function bonusPack(pk){ const B=bonusState();
  $app.innerHTML=topbar("보너스 학습")+`<section class="panel"><h3 style="margin:0 0 6px">${pk.ic} ${pk.nm} ${pk.no}</h3><p class="meta" style="margin:0 0 8px">카드를 읽고 퀴즈로 확인해요 · 2번 맞히면 ✔ 익힘</p>
    <div class="bnList">${pk.L.map(x=>`<div class="bnCard ${(B.ok[x.id]||0)>=BONUS_MASTER?"ok":""}"><b>${esc(x.k)}</b><span>${esc(x.m)}</span><small>${x.rel==="sim"?"🤝":"↔"} '${esc(x.base)}'${x.rel==="sim"?"와(과) 뜻이 비슷해요":"와(과) 뜻이 반대예요"}</small>${(B.ok[x.id]||0)>=BONUS_MASTER?"<i>✔ 익힘</i>":""}</div>`).join("")}</div>
    <div class="btns"><button class="btn gold big" id="bnQ">❓ 퀴즈 풀기 (8문제)</button><button class="btn ghost" id="bnBack">← 묶음 목록</button></div></section>`;
  bindBack(); document.getElementById("bnBack").onclick=()=>{ sfx("tap"); bonusLearn() }; document.getElementById("bnQ").onclick=()=>{ sfx("tap"); bonusQuiz(pk) } }
function bonusQuiz(pk){ const B=bonusState(), L=pk.L, N=Math.min(8,L.length*2); const src=[]; while(src.length<N) src.push(...shuffle(L)); src.length=N;
  const qs=src.map(x=>{ const rev=Math.random()<.5, others=shuffle(L.filter(y=>y.id!==x.id)).slice(0,3); return rev?{x,q:`'${x.m}'에 알맞은 말은?`,opts:shuffle([x,...others]).map(o=>({t:o.k,ok:o===x}))}:{x,big:x.k,q:"이 말의 뜻은?",opts:shuffle([x,...others]).map(o=>({t:o.m,ok:o===x}))} });
  let i=0, ok=0;
  const draw=()=>{ const Q=qs[i]; $app.innerHTML=topbar("보너스 학습")+`<div class="prog"><div class="pt"><span>${pk.nm} ${pk.no} 퀴즈</span><b>${i+1} / ${N}</b></div><div class="bar"><i style="width:${i/N*100}%"></i></div></div>
    <div class="qwrap"><div class="qcard sayq">${Q.big?`<div class="qbig sayBig">${esc(Q.big)}</div>`:""}<div class="qq sayQ">${esc(Q.q)}</div><div class="sayWhy" id="why" hidden></div></div>
    <div class="qopts">${Q.opts.map((o,j)=>`<button class="qo ${Q.big?"sayLong":"saySh"}" data-j="${j}"><span class="L">${"ABCD"[j]}</span><span class="T">${esc(o.t)}</span></button>`).join("")}</div></div>`;
    bindBack(); let busy=false;
    $app.querySelectorAll(".qo").forEach(b=>b.onclick=()=>{ if(busy) return; busy=true; const o=Q.opts[+b.dataset.j]; $app.querySelectorAll(".qo").forEach((x,j)=>{ x.disabled=true; if(Q.opts[j].ok) x.classList.add("ok") });
      if(o.ok){ ok++; B.ok[Q.x.id]=(B.ok[Q.x.id]||0)+1; sfx("ok") } else { b.classList.add("no"); sfx("no") }
      const w=document.getElementById("why"); w.hidden=false; w.className="sayWhy "+(o.ok?"good":"bad"); w.innerHTML=`<b>${o.ok?"정답! ":"정답은 "}'${esc(Q.x.k)}'</b><br>${esc(Q.x.m)} · ${Q.x.rel==="sim"?"🤝":"↔"} '${esc(Q.x.base)}'`; saveP();
      setTimeout(()=>{ i++; if(i<N) draw(); else end() },o.ok?900:1800) }) };
  const end=()=>{ const pass=ok>=N-1; B.cd=B.cd||{}; const tk=todayKey(), first=pass&&B.cd[pk.id]!==tk; if(first) B.cd[pk.id]=tk; const got=first?earn(30):0; saveP(); modal.dataset.dismiss=""; openModal(`<h3>${pass?"🎉 잘했어요!":"조금만 더!"}</h3><p>${N}문제 중 ${ok}개 맞혔어요.${pass?(first?` 코인 +${got}`:" (이 묶음 코인은 하루 한 번이에요)"):" 7개 이상 맞히면 코인을 조금 돌려받아요."}</p><div class="btns"><button class="btn gold" id="bqA">다시 풀기</button><button class="btn ghost" id="bqB">카드로 돌아가기</button></div>`);
    document.getElementById("bqA").onclick=()=>{ closeModal(); bonusQuiz(pk) }; document.getElementById("bqB").onclick=()=>{ closeModal(); bonusPack(pk) } };
  draw() }
