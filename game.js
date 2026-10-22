/* ===== 몬스터 대작전 ===== */
const WIN_TIME = 300;   // (예전 5분 버티기 · 이제는 보스 4마리를 잡으면 클리어)
/* 스테이지 단계: 오래 버틸수록 맵이 바뀌고 몬스터가 강해져요 */
const PHASE_T = [0,100,200];
/* 단계: 보스를 잡을 때마다 올라가요 (0=1단계, 1=2단계, 2=3단계, 3=최종 결전) */
let STAGE_PH = 0;
const phaseOf = ()=>STAGE_PH;
const phV = ph=>Math.min(2,ph);   // 그림(색·이름)은 3단계까지
const PH_MUL = [{hp:1,dmg:1,sp:1,elite:0},{hp:1.3,dmg:1.15,sp:1.06,elite:.03},{hp:1.65,dmg:1.35,sp:1.12,elite:.06},{hp:2,dmg:1.5,sp:1.16,elite:.08}];
const PH_NAME = {1:["햇살 꽃밭","노을 꽃밭","별빛 꽃밭"],2:["바람 숲길","폭풍 숲길","안개 숲길"],3:["노을 유적","황혼 유적","저주받은 유적"],4:["어둠 동굴","수정 심층부","끝없는 심연"],5:["어둠의 마왕성","불타는 마왕성","마왕의 옥좌"],6:["용오름 첨탑","폭풍의 첨탑","천둥 회오리"],7:["하늘 성","노을 성벽","전쟁의 하늘 성"],8:["천공 빙궁","눈보라 빙궁","오로라 폭풍"],9:["천상 신전","천둥의 신전","신의 심판장"],10:["별의 왕좌","붉은 성운","종언의 블랙홀"]};
const PH_TINT = {1:[null,"255,130,60,.20","25,20,80,.38"],2:[null,"60,70,110,.28","200,210,220,.22"],3:[null,"200,60,40,.22","60,10,70,.38"],4:[null,"40,160,200,.18","10,0,25,.45"],5:[null,"255,80,20,.22","90,0,20,.40"],6:[null,"30,50,110,.22","20,10,60,.36"],7:[null,"255,150,70,.18","90,20,50,.30"],8:[null,"200,230,255,.22","60,160,140,.22"],9:[null,"120,80,200,.18","60,20,90,.32"],10:[null,"200,40,90,.16","10,0,30,.40"]};
const PH_AURA = [null,"255,140,40","170,90,255","255,60,90"];
/* 게임 코인: 30초 버틸 때마다 + 끝까지 버티면 승리 보너스 (어려운 맵일수록 많이) */
const TIME_COIN = {1:3,2:5,3:6,4:9,5:12,6:14,7:16,8:18,9:20,10:22};   // 30초마다
const WIN_COIN  = {1:10,2:20,3:30,4:45,5:60,6:70,7:80,8:90,9:100,10:120};
/* 스테이지 보상: 잡은 보스(별)마다 코인 · 클리어 보너스 · 처음 클리어 보너스 */
const MAP_F = {1:1,2:1.4,3:1.8,4:2.4,5:3,6:3.6,7:4.2,8:4.8,9:5.4,10:6.2};
const STAR_COIN = [10,15,22,0];
const starCoin = (mapId,tier)=>Math.round(STAR_COIN[tier]*(MAP_F[mapId]||1));
const clearCoin = mapId=>Math.round(45*(MAP_F[mapId]||1));
const firstClearCoin = mapId=>Math.round(60*(MAP_F[mapId]||1));
const gameCoins = (mapId,stars)=>{ let c=0; for(let i=0;i<Math.min(3,stars);i++) c+=starCoin(mapId,i); return c+(stars>=4?clearCoin(mapId):0) };
const maxGameCoins = id=>Math.round(gameCoins(id,4)*((typeof qrangeOf==="function"&&qrangeOf().cm)||1))+((typeof qrangeOf==="function"&&qrangeOf().coin)||0);
const starStr = n=>"★".repeat(n)+"☆".repeat(4-n);
const GC = {paper:"#f3eee0", grid:"#e3dccb", ink:"#25211b", card:"#fffdf6", seal:"#c8372d", pine:"#2f6b55",
  gold:"#d79a1e", ice:"#3f8fc0", wind:"#2f7d63", soft:"#7a7264"};
const HZ = s=>`900 ${s}px "Noto Serif KR","Nanum Myeongjo",serif`;

const SK = {
  wind:{t:"w",name:"회오리 칼날",ic:"wind",d:l=>l===1?"가까운 몬스터에게 초록 회오리 칼날을 날려요":`칼날이 더 세지고 ${l>=3?"더 많이 ":""}날아가요`},
  elec:{t:"w",name:"천둥 번개",ic:"elec",d:l=>l===1?"하늘에서 몬스터에게 번개가 내리쳐요":"번개가 더 자주, 더 많이 떨어져요"},
  fire:{t:"w",name:"화염 고리",ic:"fire",d:l=>l===1?"내 주변을 불꽃이 감싸서 다가온 몬스터를 태워요":"불꽃 고리가 더 넓고 뜨거워져요"},
  stone:{t:"w",name:"수호 바위",ic:"stone",d:l=>l===1?"바위 두 개가 내 주위를 빙글빙글 돌며 지켜 줘요":"도는 바위가 하나 더 생기고 세져요"},
  ice:{t:"w",name:"서리 파편",ic:"ice",d:l=>l===1?"사방으로 얼음 파편을 뿌려 몬스터를 느리게 해요":"얼음 파편이 더 많아지고 세져요"},
  spd:{t:"p",name:"신속의 장화",ic:"spd",d:()=>"움직이는 속도가 빨라져요"},
  body:{t:"p",name:"용사의 심장",ic:"body",d:()=>"최대 체력이 늘고 체력을 채워요"},
  str:{t:"p",name:"전투 장갑",ic:"str",d:()=>"모든 공격이 더 세져요"},
  qi:{t:"p",name:"마력 모래시계",ic:"qi",d:()=>"공격을 더 자주 해요"},
  pull:{t:"p",name:"자석 반지",ic:"pull",d:()=>"경험치 구슬을 더 멀리서 끌어와요"},
};
/* 기술 아이콘 (그림으로 그려요) */
const SK_ICON = {};
function skIcon(k){
  if(k==="main") return SPRITE_URLS[P.hero]||"";
  if(SK_ICON[k]) return SK_ICON[k];
  const cv=document.createElement("canvas"); cv.width=cv.height=64; const c=cv.getContext("2d");
  const bg={wind:"#1f6e45",elec:"#3a2a7a",fire:"#8a2a1c",stone:"#4d4760",ice:"#1f5a8a",spd:"#2a6aa8",body:"#8a1f3a",str:"#7a5a2a",qi:"#4a2a8a",pull:"#2a4a6a"}[k]||"#333";
  const gr=c.createRadialGradient(32,28,6,32,32,34); gr.addColorStop(0,bg); gr.addColorStop(1,"#120c1e"); c.fillStyle=gr; c.beginPath(); c.arc(32,32,31,0,7); c.fill();
  c.lineJoin="round"; c.lineCap="round";
  if(k==="wind"){ for(let i=0;i<3;i++){ c.strokeStyle=["#8af0c1","#3fcf8e","#e6fff4"][i]; c.lineWidth=5-i; c.beginPath(); c.arc(32,32,20-i*6,.3+i,.3+i+4.2); c.stroke() }
    c.fillStyle="#e6fff4"; c.beginPath(); c.moveTo(48,18); c.lineTo(56,10); c.lineTo(52,22); c.fill() }
  else if(k==="elec"){ c.fillStyle="#ffe066"; c.strokeStyle="#fff4b0"; c.lineWidth=2; c.beginPath(); c.moveTo(36,6); c.lineTo(18,36); c.lineTo(30,36); c.lineTo(24,58); c.lineTo(46,26); c.lineTo(33,26); c.closePath(); c.fill(); c.stroke() }
  else if(k==="fire"){ c.fillStyle="#ff6a3c"; c.beginPath(); c.moveTo(32,6); c.quadraticCurveTo(52,26,48,40); c.quadraticCurveTo(44,56,32,56); c.quadraticCurveTo(18,56,16,42); c.quadraticCurveTo(14,30,26,22); c.quadraticCurveTo(26,32,32,34); c.quadraticCurveTo(28,20,32,6); c.fill();
    c.fillStyle="#ffe066"; c.beginPath(); c.moveTo(32,26); c.quadraticCurveTo(42,38,38,46); c.quadraticCurveTo(32,54,26,46); c.quadraticCurveTo(24,38,32,26); c.fill() }
  else if(k==="stone"){ c.strokeStyle="rgba(200,195,214,.5)"; c.lineWidth=3; c.beginPath(); c.arc(32,32,24,0,7); c.stroke();
    c.fillStyle="#9a95ab"; c.beginPath(); c.moveTo(18,30); c.lineTo(26,16); c.lineTo(42,18); c.lineTo(48,32); c.lineTo(40,46); c.lineTo(22,46); c.closePath(); c.fill();
    c.fillStyle="#c8c3d6"; c.beginPath(); c.moveTo(26,16); c.lineTo(42,18); c.lineTo(36,28); c.lineTo(22,28); c.closePath(); c.fill(); c.fillStyle="#6fbf5a"; c.fillRect(26,14,10,4) }
  else if(k==="ice"){ c.fillStyle="#7fd0ff"; [[32,6,8],[16,30,6],[48,30,6],[32,54,7]].forEach(([x,y,w])=>{ c.beginPath(); c.moveTo(32,32); c.lineTo(x-w*(x===32?1:0)-(x===32?0:0),y); c.lineTo(x+w,y+(x===32?0:w)); c.closePath(); c.fill() });
    c.fillStyle="#e8f8ff"; c.beginPath(); c.moveTo(32,8); c.lineTo(40,30); c.lineTo(32,56); c.lineTo(24,30); c.closePath(); c.fill(); c.strokeStyle="#2f7fb8"; c.lineWidth=2; c.stroke() }
  else if(k==="spd"){ c.fillStyle="#f4ece0"; c.beginPath(); c.moveTo(22,14); c.lineTo(34,14); c.lineTo(34,38); c.lineTo(50,44); c.lineTo(50,52); c.lineTo(20,52); c.closePath(); c.fill(); c.fillStyle="#63b0ff"; c.fillRect(20,46,30,6);
    c.fillStyle="#ffffff"; c.beginPath(); c.moveTo(20,22); c.lineTo(6,16); c.lineTo(10,26); c.lineTo(4,28); c.lineTo(20,32); c.fill(); c.strokeStyle="#cfe9ff"; c.lineWidth=2; c.beginPath(); c.moveTo(50,24); c.lineTo(60,24); c.moveTo(52,32); c.lineTo(60,32); c.stroke() }
  else if(k==="body"){ c.fillStyle="#e9475f"; c.beginPath(); c.moveTo(32,54); c.bezierCurveTo(8,38,10,14,24,16); c.bezierCurveTo(30,16,32,22,32,24); c.bezierCurveTo(32,22,34,16,40,16); c.bezierCurveTo(54,14,56,38,32,54); c.fill();
    c.fillStyle="#ff8aa0"; c.beginPath(); c.ellipse(23,26,5,4,-.5,0,7); c.fill(); c.strokeStyle="#f6c544"; c.lineWidth=3; c.beginPath(); c.moveTo(22,36); c.lineTo(42,36); c.moveTo(32,28); c.lineTo(32,46); c.stroke() }
  else if(k==="str"){ c.fillStyle="#c49a3a"; c.fillRect(18,34,28,18); c.fillStyle="#f6c544"; c.beginPath(); c.moveTo(16,36); c.lineTo(16,22); c.quadraticCurveTo(16,14,24,14); c.lineTo(44,14); c.quadraticCurveTo(50,14,50,22); c.lineTo(50,36); c.closePath(); c.fill();
    c.strokeStyle="#8a6420"; c.lineWidth=2; [24,32,40].forEach(x=>{ c.beginPath(); c.moveTo(x,14); c.lineTo(x,26); c.stroke() }); c.fillStyle="#e9475f"; c.beginPath(); c.arc(32,43,4,0,7); c.fill() }
  else if(k==="qi"){ c.fillStyle="#c49a3a"; c.fillRect(18,8,28,5); c.fillRect(18,51,28,5); c.fillStyle="rgba(200,230,255,.85)"; c.beginPath(); c.moveTo(20,13); c.lineTo(44,13); c.lineTo(34,32); c.lineTo(44,51); c.lineTo(20,51); c.lineTo(30,32); c.closePath(); c.fill();
    c.fillStyle="#c08bff"; c.beginPath(); c.moveTo(24,17); c.lineTo(40,17); c.lineTo(32,30); c.closePath(); c.fill(); c.beginPath(); c.moveTo(32,40); c.lineTo(42,50); c.lineTo(22,50); c.closePath(); c.fill(); c.fillRect(31,30,2,12) }
  else if(k==="pull"){ c.lineWidth=12; c.strokeStyle="#e9475f"; c.beginPath(); c.arc(32,28,14,Math.PI,0); c.stroke(); c.beginPath(); c.moveTo(18,28); c.lineTo(18,44); c.moveTo(46,28); c.lineTo(46,44); c.stroke();
    c.strokeStyle="#dfe7f2"; c.beginPath(); c.moveTo(18,42); c.lineTo(18,50); c.moveTo(46,42); c.lineTo(46,50); c.stroke(); c.fillStyle="#ffe066"; [[10,14],[54,14],[32,6]].forEach(([x,y])=>{ c.beginPath(); c.arc(x,y,3,0,7); c.fill() }) }
  return SK_ICON[k]=cv.toDataURL();
}
const skImg = (k,size)=>`<img class="skic" src="${skIcon(k)}" alt="" width="${size||40}" height="${size||40}">`;
const skName = k=>k==="main"?SK.main.name:SK[k].name;
/* 한자 퀴즈 범위: 넓을수록 보상이 커요 */
const QRANGE = [
  {w:5,  exp:1.0, coin:0,  cm:1,   cards:0, heal:.05, revive:0, label:"1~5주차",  merit:"기본 보상"},
  {w:10, exp:1.2, coin:5,  cm:1.1, cards:0, heal:.08, revive:0, label:"1~10주차", merit:"경험치 ×1.2 · 게임 코인 ×1.1 · +5"},
  {w:15, exp:1.45,coin:12, cm:1.2, cards:0, heal:.11, revive:0, label:"1~15주차", merit:"경험치 ×1.45 · 게임 코인 ×1.2 · +12"},
  {w:20, exp:1.75,coin:20, cm:1.35,cards:1, heal:.14, revive:0, label:"1~20주차", merit:"경험치 ×1.75 · 게임 코인 ×1.35 · +20 · 정답이면 기술 카드 +1장"},
  {w:26, exp:2.2, coin:35, cm:1.6, cards:1, heal:.2,  revive:1, label:"1~26주차", merit:"경험치 ×2.2 · 게임 코인 ×1.6 · +35 · 정답이면 기술 카드 +1장 · 부활 +1번 · 회복 20%"},
];
const qrangeOf = ()=>QRANGE.find(q=>q.w===(P.set.qrange||5))||QRANGE[0];
const qpoolOf = w=>[...new Map(WEEKS.slice(0,w).flat().map(c=>[c.h,c])).values()];
const MAXLV = 5;

function setMainSkill(){ const H=heroById(P.hero); SK.main={t:"w",cls:H.cls,name:H.main.name,d:H.main.d}; }
function gameLobby(){
  setMainSkill();
  const best = P.best, d = day();
  const left = Math.max(0, DAILY_PLAYS - d.plays);
  const need = Math.max(0, GAME_COST - P.coins);
  const why = !left ? `오늘 게임 ${DAILY_PLAYS}판을 다 했어요. 내일 또 만나요!` : need ? `코인이 ${need}개 더 필요해요. 학습하기에서 코인을 모아 오세요!` : "";
  $app.innerHTML = topbar("게임 · 몬스터 대작전") + `
  <section class="panel lobby">
    <div class="lobbyHero"><div class="lh">${ico("monster")}</div><div><strong>몬스터들이 몰려와요!</strong><p>보스 4마리(약한 → 중간 → 강한 → <b>최종 보스</b>)를 물리치면 스테이지 클리어!</p></div></div>
    <div class="heroBar" style="justify-content:flex-start"><button class="heroChip" id="lobHero">${avaHtml(P.hero,48)}<span><small>출전 중 · ${heroBadge(P.hero)} · 전직 스킬 ${HS().tier}개</small><b>${heroById(P.hero).name}</b> <em>${heroById(P.hero).skill}</em></span><span class="chg">용사 바꾸기 ›</span></button></div>
    <ul class="howto">
      <li>화면을 누른 채로 끌면 움직여요. 공격은 저절로 해요.</li>
      <li>몬스터가 남긴 경험치 구슬을 모으면 레벨이 올라요. <b>한자 퀴즈를 맞히면</b> 기술 카드를 골라 배울 수 있어요.</li>
      <li>쓰러지면 한자 문제를 맞혀서 되살아날 수 있어요.</li>
    </ul>
    <div class="skillchips">${Object.keys(SK).map(k=>`<span>${skImg(k,26)}${k==="main"?`${SK.main.cls} 기본 공격 · `:""}${skName(k)}</span>`).join("")}</div>
    ${typeof mpPanelHtml==="function"?mpPanelHtml():""}
    <div class="row"><h2 style="font-size:22px">한자 퀴즈 범위</h2><span class="meta">레벨업 때 이 범위의 한자로 퀴즈가 나와요 · 넓을수록 보상이 커요</span></div>
    <div class="qrgrid">${QRANGE.map((q,i)=>`<button class="qrc ${(P.set.qrange||5)===q.w?"on":""}" data-qr="${q.w}"><span class="qrs">${"★".repeat(i+1)}</span><strong>${q.label}</strong><small>한자 ${qpoolOf(q.w).length}자</small><em>${q.merit}</em></button>`).join("")}</div>
    <div class="row"><span class="cost">입장료 코인 ${GAME_COST} · 오늘 남은 판 ${left}/${DAILY_PLAYS}</span>
      <span class="meta">${(()=>{ const n=Object.keys((P.cleared||{})).length; return n?`클리어한 맵 ${n}개 · 별 ${Object.values(P.stars||{}).reduce((a,b)=>a+b,0)}개`:"아직 클리어한 맵이 없어요. 보스 4마리에 도전해요!" })()}</span></div>
    <div class="row"><h2 style="font-size:22px">맵 고르기</h2><span class="meta">어려운 맵일수록 경험치를 많이 줘요 · 출전 용사 Lv ${HS().lv}</span></div>
    ${[["ground","🌱 지상","평화로운 들판에서 깊은 던전까지"],["sky","☁ 천공","하늘 꼭대기를 향한 도전! (용사 Lv 80부터)"]].map(([rl,ttl,sub])=>`<div class="realmHead ${rl}"><b>${ttl}</b><span>${sub}</span></div>
    <div class="mapgrid">${MAPS.filter(m=>m.realm===rl).map(m=>{ const cli=typeof NET!=="undefined"&&NET.role==="client"&&netInRoom(), lock=!cli&&!isAdmin()&&(HS().lv<m.lv||(m.tier&&HS().tier<m.tier)), on=cli?(NET.map||1)===m.id:(P.set.map||1)===m.id;
      return `<button class="mapc ${on?"on":""} ${lock?"mlock":""} ${m.hud==="#f3effd"?"dk":""}" data-map="${m.id}" ${lock?"disabled":""} style="--m1:${m.sky[0]};--m2:${m.sky[1]};--mt:${m.tag}">
        <span class="mstep">${m.id}단계</span><span class="mdiff">${m.diff}</span>
        <strong>${m.name}</strong><span class="mstar">${starStr((P.stars||{})[m.id]||0)}${(P.cleared||{})[m.id]?" 클리어":""}</span><span class="mexp">경험치 ×${m.exp} · 코인 최대 ${maxGameCoins(m.id)}${(P.cleared||{})[m.id]?"":` · 첫 클리어 +${firstClearCoin(m.id)}`}</span>
        <small>${lock?(m.tier&&HS().lv>=m.lv?`4차 전직한 용사만 들어갈 수 있어요`:`용사 Lv ${m.lv}부터 열려요${m.tier?" · 4차 전직 필요":""}`):m.desc}</small></button>` }).join("")}</div>`).join("")}
    ${mapGuideHtml(typeof NET!=="undefined"&&NET.role==="client"&&netInRoom()?(NET.map||1):(P.set.map||1))}
    <button class="big red" id="go" ${why?"disabled":""}>코인 ${GAME_COST}개 내고 ${mapById(P.set.map||1).name} 입장</button>
    ${why?`<p class="needmsg">${why}</p>`:""}
  </section>`;
  bindBack();
  document.getElementById("lobHero").onclick = ()=>grow(P.hero,gameLobby);
  $app.querySelectorAll(".qrc").forEach(b=>b.onclick=()=>{ P.set.qrange=+b.dataset.qr; saveP(); sfx("tap"); gameLobby() });
  $app.querySelectorAll(".mapc").forEach(b=>b.onclick=()=>{ if(typeof NET!=="undefined"&&NET.role==="client") return; P.set.map=+b.dataset.map; saveP(); sfx("tap"); if(typeof NET!=="undefined"&&NET.role==="host") netHostLobby(); else gameLobby() });
  if(!isAdmin() && (HS().lv<mapById(P.set.map||1).lv||(mapById(P.set.map||1).tier&&HS().tier<mapById(P.set.map||1).tier))){ P.set.map=1; saveP() }
  document.getElementById("go").onclick = ()=>{ if(payGame()) startGame(); };
  if(typeof mpBind==="function"){ mpBind(); if(netInRoom()) document.getElementById("go").style.display="none" }
}

/* ===== 맵 도감: 들어가기 전에 풍경 · 몬스터 · 보스 · 조심할 것을 보여 줘요 ===== */
const MAP_HAZ={1:"",2:"",3:"",4:"",5:"🔥 용암 웅덩이를 밟으면 계속 다쳐요. 길을 잘 봐요!",6:"🌪 회오리바람이 돌아다니며 끌어당겨요. 가끔 거센 돌풍이 몸을 밀어내요.",7:"💣 성벽 대포가 빨간 원 자리에 포탄을 떨어뜨려요. 성벽 때문에 길이 좁아요.",
  8:"🧊 빙판 위에서는 미끄러져요. 하늘에서 고드름이 떨어져요.",9:"⚡ 「신의 심판」이 오면 빛나는 원 안으로 빨리 들어가요!",10:"🌌 블랙홀이 모든 것을 끌어당기고, 별똥별이 쏟아져요."};
function mobThumb(mid,x){ try{ const c=document.createElement("canvas"); c.width=c.height=96; const k=c.getContext("2d"); const e={x:48,y:52,r:24,look:x.look,c:x.c,mapId:mid,wob:0,flash:0,type:"mob",born:-9,stun:0,hp:1,max:1};
  (LOOKS[x.look]||LOOKS.slime)(k,e,.3,200,52); if(EXTRA[x.look]) EXTRA[x.look](k,e,.3,200,52); return c.toDataURL() }catch(err){ return "" } }
const SIZE_TXT={small:"작고 날쌔요",normal:"보통",fast:"아주 빨라요",tough:"튼튼해요",big:"크고 아주 튼튼해요"};
function mapGuideHtml(mid){ const m=mapById(mid), F=typeof FLOOR_FILES!=="undefined"&&FLOOR_FILES[mid], MA=typeof MOB_ART_FILES!=="undefined"?MOB_ART_FILES:{}, BA=typeof BOSS_ART_FILES!=="undefined"?BOSS_ART_FILES:{};
  const seen=new Set(), mobs=(MOBS[mid]||[]).filter(x=>{ const k=x.look+x.name; if(seen.has(k)) return false; seen.add(k); return true });
  const mobH=mobs.map(x=>{ const src=MA[mid+":"+x.look]||mobThumb(mid,x); return `<div class="mgMob">${src?`<img src="${src}" alt="">`:`<span class="mgNo">?</span>`}<b>${x.name}</b><small>${SIZE_TXT[x.size]||""}${x.from?` · ${x.from}초부터`:" · 처음부터"}</small></div>` }).join("");
  const bossH=(STAGE[mid]||[]).map((k,i)=>{ const B=BOSSES[k]||{}, A=BA[k], S=typeof BOSS_SKILLS!=="undefined"&&BOSS_SKILLS[mid]&&BOSS_SKILLS[mid][i];
    const sk=S?S.k.map(x=>x[1]).join(" · "):""; return `<div class="mgBoss t${i}"><div class="mgBimg">${A?`<img src="${A.src}" alt="">`:""}</div><em>${B.tn||["약한 보스","중간 보스","강한 보스","최종 보스"][i]}</em><b>${B.name||""}</b>${sk?`<small>기술: ${sk}</small>`:""}${S&&S.ult?`<small class="ult">필살기: ${S.ult[1]}</small>`:""}</div>` }).join("");
  return `<section class="mapGuide" style="--m1:${m.sky[0]};--m2:${m.sky[1]}">
    <div class="mgTop" ${F?`style="background-image:linear-gradient(90deg,rgba(0,0,0,.65),rgba(0,0,0,.15)),url(${F})"`:""}><span class="mgStep">📖 맵 도감 · ${m.id}단계</span><strong>${m.name}</strong><p>${m.desc}</p>${MAP_HAZ[mid]?`<p class="mgHaz">${MAP_HAZ[mid]}</p>`:`<p class="mgHaz ok">🌼 위험한 땅이 없어요. 몬스터만 조심해요!</p>`}</div>
    <h3>나오는 몬스터</h3><div class="mgMobs">${mobH}</div>
    <h3>보스 (차례대로 나와요)</h3><div class="mgBosses">${bossH}</div>
  </section>` }
function payGame(){
  const d=day();
  if(d.plays>=DAILY_PLAYS || P.coins<GAME_COST) return false;
  d.plays++; P.coins-=GAME_COST; P.stats.games++; saveP(); return true;
}
const fmtT = t=>{t=Math.floor(t);return `${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`};

function startGame(opts){ opts=opts||{};
  const root = document.createElement("div");
  root.className = "game";
  root.innerHTML = `<canvas></canvas>
    <div class="ghud">
      <div class="gxp"><i></i></div>
      <div class="grow"><span class="glv">Lv 1</span><span class="gtime">0:00</span><span class="gk">몬스터 0</span><button class="gtool" aria-label="선생님 도구" hidden>🛠</button><button class="gpause" aria-label="잠깐 멈춤">Ⅱ</button></div>
      <div class="gtoolbox" hidden></div>
      <div class="gstat"><div class="ghp"><i></i><b class="ghpt">100 / 100</b></div>
        <span class="gs atk" title="공격력">공격 <b>×1.00</b></span><span class="gs spd" title="이동 속도">속도 <b>165</b></span><span class="gs cdr" title="공격 간격">공속 <b>100%</b></span></div>
      <div class="gskl"></div>
      <div class="gbanner" hidden></div>
    </div>
    <div class="gmodal" hidden><div class="gcard"></div></div>`;
  document.body.appendChild(root);
  document.body.style.overflow = "hidden";
  const cv = root.querySelector("canvas"), MAINCTX = cv.getContext("2d"); let ctx = MAINCTX;
  /* 도트 느낌: 게임 세상을 절반 해상도로 그린 뒤 픽셀 그대로 키워요 */
  let PX = 2; const low = document.createElement("canvas"), lctx = low.getContext("2d");
  if(typeof sprSetPX==="function") sprSetPX(PX);
  /* 렉 줄이기: 화면이 느리면(초당 35장 아래가 3초 계속) 도트를 한 단계 크게 해서 그릴 양을 줄여요 */
  const PERF={acc:0,n:0,slow:0};
  function perfTick(dt){ PERF.acc+=dt; PERF.n++; if(PERF.acc<1) return; const fps=PERF.n/PERF.acc; PERF.acc=0; PERF.n=0;
    PERF.slow = fps<35 ? PERF.slow+1 : 0;
    if(PERF.slow>=3 && HDFX){ HDFX=false; PERF.slow=0; return }   // 1단계: 기술 효과를 가벼운 도트 화면으로
    if(PERF.slow>=3 && PX<3){ PX=3; PERF.slow=0; if(typeof sprSetPX==="function") sprSetPX(PX); resize() } }
  const $ = s=>root.querySelector(s);
  const modal = $(".gmodal"), mcard = $(".gcard"), banner = $(".gbanner");
  let W=0,H=0,dpr=1;
  function resize(){ dpr=Math.min(2,window.devicePixelRatio||1); W=root.clientWidth; H=root.clientHeight; cv.width=W*dpr; cv.height=H*dpr; cv.style.width=W+"px"; cv.style.height=H+"px"; low.width=Math.ceil(W/PX); low.height=Math.ceil(H/PX); }
  resize(); window.addEventListener("resize", resize);

  const HERO = heroById(P.hero); setMainSkill();
  const MAP = mapById(opts.map||P.set.map||1);
  const GLOW = MAP.dark ? "lighter" : "source-over";
  let HDFX=!window.__lowfx; let HERO_HD=null; const REMOTE_HD=[]; const HSZ=96;   // 그림 용사 크기
  try{ pfxInit(); pfxInit2(); pfxInit3() }catch(e){}
  const heroImg = new Image(); heroImg.src = SPRITE_URLS[HERO.id] || "";
  /* 레벨이 오를수록 필요한 경험치가 크게 늘어요 (Lv5≈55 · Lv10≈150 · Lv16≈320 · Lv25≈700) */
  const needXP=L=>Math.round(8+5*L+0.9*L*L);
  const g = {t:0,kills:0,lvl:1,xp:0,need:14,revived:false,over:false,paused:false,
    p:{x:(Math.random()-.5)*120,y:(Math.random()-.5)*120,r:16,hp:HERO.hp,inv:0}, en:[], shots:[], gems:[], items:[], fx:[],
    sk:{main:1}, cd:{}, pending:[], revives:0, sum:[], zones:[], stream:null, buff:null, shake:0, combo:0, spawnAcc:0, stageN:0, nextBossT:60, bossUp:false, nextCrisis:30, crisisN:0, eshots:[], bossKills:0, bossCoins:0, bbuff:null};
  STAGE_PH = 0;
  const lv = k=>g.sk[k]||0;
  const M = Object.assign({dmg:1,cd:1,mag:1,xp:1,armor:1,regen:0,slow:1,crit:0,spd:1},HERO.mods||{});
  // 용사 성장: 능력치 포인트 + 전직 스킬
  const HSt = HS(HERO.id), SKL = JOBS[HERO.id].skills.slice(0,HSt.tier);
  let bonusHp = STAT.hp*HSt.hp, pierceAdd = 0, aura = null;
  SKL.forEach(k=>{ if(k.type==="passive"){ for(const key in k.p){ const v=k.p[key];
      if(key==="hp") bonusHp+=v; else if(key==="crit") M.crit+=v; else if(key==="pierce") pierceAdd+=v; else M[key]=(M[key]||1)*v } }
    if(k.type==="aura") aura=k; });
  M.dmg *= 1+STAT.atk*HSt.atk;
  const spdMul = 1+STAT.spd*Math.min(HSt.spd,STAT.spdMax); M.cd/=spdMul; M.spd*=spdMul;
  const F = {}; SKL.forEach(k=>{ if(k.flag) F[k.flag]=true });
  const ACT = SKL.filter(k=>k.type!=="passive"&&k.type!=="aura").map(k=>Object.assign({},k,{t:k.cd*.5}));
  const lvScale = 1+HSt.lv*0.01;
  g.p.hp = HERO.hp+bonusHp;
  spawnSummons();
  g.jl={}; g.cloneMul=1;
  const PK = Object.assign({xp:1,start:0,revive:1,cards:3},HERO.perks||{});
  const QR = qrangeOf(), QPOOL = qpoolOf(QR.w);
  if(opts.mp) M.xp *= .7;
  M.xp *= PK.xp; g.revives = PK.revive + QR.revive; g.qOk=0; g.qN=0;
  shuffle(Object.keys(SK).filter(k=>k!=="main"&&SK[k].t==="w")).slice(0,PK.start).forEach(k=>g.sk[k]=1);
  const st = ()=>({dmg:M.dmg*(1+.15*lv("str")), cd:Math.max(.4,M.cd*(1-.09*lv("qi"))), spd:165*HERO.spd*M.spd*(g.bbuff?g.bbuff.spd:1)*(1+.1*lv("spd")), maxHp:HERO.hp+bonusHp+20*lv("body"), mag:110*M.mag*(1+.4*lv("pull"))});

  // 입력
  const keys = {}; const joy = {on:false,id:null,ox:0,oy:0,x:0,y:0};
  const kd = e=>{keys[e.key.toLowerCase()]=true; if(e.key==="Escape") pause()};
  const ku = e=>{keys[e.key.toLowerCase()]=false};
  window.addEventListener("keydown",kd); window.addEventListener("keyup",ku);
  cv.addEventListener("pointerdown",e=>{ if(joy.on) return; joy.on=true; joy.id=e.pointerId; joy.ox=joy.x=e.clientX; joy.oy=joy.y=e.clientY; try{cv.setPointerCapture(e.pointerId)}catch(_){} });
  cv.addEventListener("pointermove",e=>{ if(joy.on&&e.pointerId===joy.id){joy.x=e.clientX;joy.y=e.clientY} });
  const jend = e=>{ if(e.pointerId===joy.id){joy.on=false;joy.id=null} };
  cv.addEventListener("pointerup",jend); cv.addEventListener("pointercancel",jend);
  const vis = ()=>{ if(document.hidden) pause() };
  document.addEventListener("visibilitychange",vis);
  $(".gpause").onclick = pause;
  // ===== 선생님 도구: 무적 · 레벨 올리기 · 시간 당기기 · 보스 바로 부르기 (선생님 계정에서만) =====
  if(typeof isAdmin==="function"&&isAdmin()){ const tb=$(".gtoolbox"), btn=$(".gtool"); btn.hidden=false;
    const acts=[["god",()=>g.god?"🛡 무적 끄기":"🛡 무적 켜기",()=>{ g.god=!g.god; showBanner(g.god?"🛡 무적이 켜졌어요 (선생님 모드)":"무적을 껐어요") }],
      ["qs",()=>g.qskip?"📝 카드 문제 건너뛰기: 켜짐":"📝 카드 문제 건너뛰기: 꺼짐",()=>{ g.qskip=!g.qskip }],
      ["lv1",()=>"⬆ 레벨 +1",()=>{ g.xp+=g.need }],
      ["lv5",()=>"⏫ 레벨 +5",()=>{ let n=0,L=g.lvl; for(let i=0;i<5;i++){ n+=needXP(L+i) } g.xp+=n }],
      ["t60",()=>"⏩ 시간 +1분",()=>{ g.t+=60; if(g.nextBossT!==undefined&&!g.bossUp) g.nextBossT+=0; showBanner("⏩ 1분 앞으로! 몬스터가 더 세져요") }],
      ["boss",()=>g.bossUp?"👑 보스 체력 → 1":"👑 다음 보스 바로 부르기",()=>{ if(g.bossUp){ for(const e of g.en) if(e.type==="boss"&&e.hp>1) e.hp=1 } else if(g.stageN<4){ g.nextBossT=g.t+.5; g.bossWarn=g.stageN } }],
      ["ult",()=>"💢 보스 필살기 보기",()=>{ for(const e of g.en) if(e.type==="boss"&&e.hp>0){ e.hp=Math.min(e.hp,e.max*.49); e.ultDone=false; e.bt=0 } }],
      ["clear",()=>"🧹 몬스터 모두 없애기",()=>{ g.en=g.en.filter(e=>e.type==="boss"); }]];
    const render=()=>{ tb.innerHTML=acts.map(([k,l])=>`<button data-k="${k}">${l()}</button>`).join("")+`<small>선생님 확인용 · 기록에는 그대로 남아요</small>`;
      tb.querySelectorAll("button").forEach(b=>b.onclick=ev=>{ ev.stopPropagation(); const a=acts.find(x=>x[0]===b.dataset.k); a[2](); render() }) };
    btn.onclick=ev=>{ ev.stopPropagation(); tb.hidden=!tb.hidden; if(!tb.hidden) render() };
    g.god=true; g.qskip=true }

  function showBanner(txt){ banner.textContent=txt; banner.hidden=false; clearTimeout(showBanner.t); showBanner.t=setTimeout(()=>banner.hidden=true,2600) }

  // 생성
  const dmgMul = MAP.hp>1?1+(MAP.hp-1)*.35:1;
  const RESCUE = 3+Math.max(0,MAP.id-5)*.5;   // 높은 맵일수록 친구 살리기가 오래 걸려요
  function edgePos(){ const m=40, side=Math.random()*4|0, u=Math.random();
    return [ side<2?(u-.5)*(W+2*m):(side===2?-1:1)*(W/2+m), side<2?(side===0?-1:1)*(H/2+m):(u-.5)*(H+2*m) ] }
  function addMob(m,x,y,hpMul,elite){ const S=SIZE[m.size], PM=PH_MUL[phaseOf(g.t)], TT=g.t*.72, sc=(1+TT/45+Math.pow(TT/125,2))*PM.hp;
    const e={mapId:MAP.id,type:m.size==="big"?"big":"mob",look:m.look,c:m.v?m.v[Math.random()*m.v.length|0]:m.c,hue:m.hv?m.hv[Math.random()*m.hv.length|0]:0,name:m.name,x,y,r:S.r,hp:S.hp*MAP.hp*sc*(hpMul||1),max:0,sp:S.sp*MAP.spd,dmg:S.dmg*dmgMul*1.2*(1+TT/190),xp:S.xp,slow:0,flash:0,stoneCD:0,wob:Math.random()*6};
    e.dmg*=PM.dmg; e.sp*=PM.sp; if(!elite && Math.random()<PM.elite && g.t>40) elite=true;
    if(elite){ e.elite=true; e.hp*=5; e.r*=1.45; e.dmg*=1.6; e.sp*=1.1; e.xp*=6 }
    e.max=e.hp; e.born=g.t; e.id=nid++; e.di=MOBS[MAP.id].indexOf(m); if(NM){ e.hp=e.max=e.max*(1+CO.hp*(nPlayers()-1)); e.sp*=CO.spd; e.dmg*=CO.dmg } g.en.push(e); return e }
  const MOB_CAP = ()=>NM?300:250;   // 렉 줄이기: 한 번에 살아 있는 몬스터 수 한도
  function spawnMob(){ if(g.en.length>=MOB_CAP()) return; const list=MOBS[MAP.id].filter(m=>g.t>=m.from);
    const ws=list.map((m,i)=>i===0?Math.max(1.5,m.w-g.t/45):m.w*(1+(g.t-m.from)/80)); let r=Math.random()*ws.reduce((a,b)=>a+b,0), k=0; while(r>ws[k]){ r-=ws[k]; k++ }
    const [sx,sy]=edgePos(), A=NM?randPlayer():g.p; addMob(list[Math.min(k,list.length-1)],A.x+sx,A.y+sy,1,g.t>40&&Math.random()<.035+g.t/6000) }
  // 위기 이벤트: 포위 습격 · 돌진 떼
  function crisis(){
    const P=NM?randPlayer():g.p, kind=g.crisisN++%2===0?"ring":"rush", list=MOBS[MAP.id].filter(m=>g.t>=m.from);
    if(kind==="ring"){ const n=Math.min(NM?56:40,(20+Math.floor(g.t/10))*(NM?1.4:1)|0), R=Math.max(W,H)*.55;
      say("⚠ 몬스터들이 사방에서 포위해 와요! 빈틈으로 빠져나가요!","alarm"); g.fx.push({k:"flash",col:"#e9475f",life:.5,max:.5});
      for(let i=0;i<n;i++){ const a=i*Math.PI*2/n; if(i%9===0) continue; addMob(list[Math.random()*Math.min(2,list.length)|0],P.x+Math.cos(a)*R,P.y+Math.sin(a)*R,.7) } }
    else { const fast=list.find(m=>m.size==="fast"||m.size==="small")||list[0], dir=Math.random()*Math.PI*2, n=Math.min(NM?36:26,(14+Math.floor(g.t/15))*(NM?1.4:1)|0);
      say("⚠ 몬스터 떼가 한쪽에서 돌진해 와요! 옆으로 피해요!","alarm"); g.fx.push({k:"flash",col:"#f6a623",life:.4,max:.4});
      const bx=P.x-Math.cos(dir)*W*.7, by=P.y-Math.sin(dir)*H*.7;
      for(let i=0;i<n;i++){ const off=(i-n/2)*22, e=addMob(fast,bx-Math.sin(dir)*off,by+Math.cos(dir)*off,.6); e.rush={vx:Math.cos(dir),vy:Math.sin(dir),t:4}; e.sp*=2.2 } } }
  /* 천공 맵의 위험: 용오름 첨탑은 돌풍, 하늘 성은 성벽 대포 포격 (모두 예고 후에 와요) */
  function startGust(a){ g.gust={a,w:1.6,d:1.3}; sfx("alarm"); say("💨 돌풍이 와요! 화살표 방향으로 밀려요!") }
  function skyHazardTick(dt){
    g.hzT=(g.hzT===undefined?14:g.hzT)-dt; if(g.hzT>0) return;
    const ph=phaseOf();
    const T0=teamPlayers(); T0.push(g.p);
    if(MAP.id===8){ g.hzT=8-ph*.8+Math.random()*2; sfx("alarm"); for(const q of T0){ for(let i=0;i<3+Math.min(3,ph);i++){ const x=q.x+(Math.random()-.5)*320, y=q.y+(Math.random()-.5)*240, at=1.2+i*.2;
        g.fx.push({k:"warn",x,y,r:55,life:at,max:at}); g.fx.push({k:"icicle",x,y,life:at,max:at}); g.pending.push({t:at,run:()=>{ sfx("boom"); aoeC(x,y,55,26*(1+g.t*.72/150)*(1+ph*.15)); g.fx.push({k:"boom",x,y,r:55,col:"#bfe8ff",life:.4,max:.4}) }}) } }
      if(!g.icMsg){ g.icMsg=1; say("🧊 고드름이 떨어져요! 빨간 원을 피해요!","alarm") } return }
    if(MAP.id===9){ g.hzT=16-ph*2+Math.random()*3; const c=T0[Math.random()*T0.length|0], sx=c.x+(Math.random()-.5)*240, sy=c.y+(Math.random()-.5)*180, SR=150, at=2.6;
      g.fx.push({k:"safe",x:sx,y:sy,r:SR,life:at,max:at}); say("⚡ 신의 심판! 빛의 원 안으로 들어가요!","alarm");
      g.pending.push({t:at,run:()=>{ g.fx.push({k:"flash",col:"#e8d8ff",life:.5,max:.5}); g.shake=.5; sfx("boom");
        const hurtIf=(q)=>{ if((q.x-sx)**2+(q.y-sy)**2>SR*SR) return true; return false };
        if(hurtIf(g.p)) hitPlayer(40*(1+ph*.25)); evAll({t:"judg",x:Math.round(sx),y:Math.round(sy),r:SR,d:Math.round(40*(1+ph*.25))});
        for(let i=0;i<14;i++){ const a=i/14*Math.PI*2, R=SR+80+Math.random()*200; g.fx.push({k:"bolt",x:sx+Math.cos(a)*R,y:sy+Math.sin(a)*R,life:.35,max:.35}) } }}); return }
    if(MAP.id===10){ g.hzT=9-ph+Math.random()*2; for(const q of T0){ for(let i=0;i<4+ph;i++){ const x=q.x+(Math.random()-.5)*380, y=q.y+(Math.random()-.5)*280, at=1.1+i*.15;
        g.fx.push({k:"warn",x,y,r:60,life:at,max:at}); g.fx.push({k:"meteor",x,y,life:at,max:.45}); g.pending.push({t:at,run:()=>{ sfx("boom"); aoeC(x,y,60,30*(1+g.t*.72/150)*(1+ph*.15)); g.fx.push({k:"boom",x,y,r:60,col:"#c8a0ff",life:.4,max:.4}) }}) } }
      if(!g.srMsg){ g.srMsg=1; say("✨ 별똥별이 쏟아져요! 빨간 원을 피해요!","alarm") } return }
    if(MAP.id===6){ g.hzT=14-ph*2+Math.random()*4; const a=Math.random()*Math.PI*2; startGust(a); if(NM==="host") hostEv.push({t:"gust",a:+a.toFixed(3)}) }
    else { g.hzT=7.5-ph*.8+Math.random()*2; const T=teamPlayers(); if(!T.length) return; sfx("cannon");
      for(const q of T){ const n=2+Math.min(3,ph); for(let i=0;i<n;i++){ const x=q.x+(Math.random()-.5)*300, y=q.y+(Math.random()-.5)*240, at=1.3+i*.25;
        g.fx.push({k:"warn",x,y,r:70,life:at,max:at}); g.fx.push({k:"meteor",x,y,life:at,max:.45});
        g.pending.push({t:at,run:()=>{ sfx("boom"); aoeC(x,y,70,24*(1+g.t*.72/150)*(1+ph*.15)); g.fx.push({k:"boom",x,y,r:70,col:"#ffd36a",life:.4,max:.4}); g.shake=Math.max(g.shake,.2) }}) } }
      if(!g.canMsg){ g.canMsg=1; say("💥 성벽 대포가 쏴요! 빨간 원을 피해요!","alarm") } } }
  /* 스테이지: 시간이 되면 다음 보스가 나와요. 보스를 잡아야 그다음 보스가 나와요 */
  const BOSS_GAP=[35,35,40];
  function stageTick(){
    if(g.bossUp||g.stageN>=4||g.over) return;
    const left=g.nextBossT-g.t, tn=(STAGE_TIER[g.stageN]||{tn:"최종 보스"}).tn;
    if(left<=10 && g.bossWarn!==g.stageN){ g.bossWarn=g.stageN; say(g.stageN===3?"⚠ 10초 뒤 최종 보스가 나타나요! 준비해요!":`⚠ 10초 뒤 ${tn}가 나타나요!`,"alarm") }
    if(left<=0){ g.bossUp=true; spawnBoss(STAGE[MAP.id][g.stageN]) } }
  function stageBossDown(e){ // 호스트(혼자)에서만: 보스를 잡으면 다음 단계로
    const B=BOSSES[e.bid]; if(!B||B.tier===undefined) return;
    g.bossUp=false; g.stageN=Math.min(4,g.stageN+1); STAGE_PH=Math.min(3,g.stageN);
    if(g.stageN>=4){ say(`🏆 ${MAP.name} 스테이지 클리어!`,"win"); g.pending.push({t:2.2,run:()=>{ NM?endAll(true):finish(true) }}); return }
    g.nextBossT=g.t+BOSS_GAP[g.stageN-1] }
  function spawnBoss(id){ const B=BOSSES[id], [sx,sy]=edgePos(), A=NM?randPlayer():g.p;
    const e={mapId:MAP.id,type:"boss",bid:id,look:B.look,c:B.c,crown:B.crown,name:B.name,x:A.x+sx,y:A.y+sy,r:B.r,hp:B.hp*MAP.hp*1.15*(1+g.t*.72/200)*(NM?1+CO.boss*(nPlayers()-1):1),id:nid++,di:-1-BKEYS.indexOf(id),max:0,sp:B.sp*MAP.spd,dmg:B.dmg*dmgMul*1.05,xp:5,
      slow:0,flash:0,stoneCD:0,wob:0,ai:B.ai,bt:2.5,bi:0,buff:B.buff,minion:B.minion,big:B.big};
    if(NM){ e.dmg*=CO.dmg; e.sp*=1.08 } e.max=e.hp; g.en.push(e); say(B.tier===3?`👑 최종 보스 등장! ${B.name}`:`${B.tn?B.tn+" 등장! ":"보스 등장! "}${B.name}`,"boss"); if(B.tier===3){ g.fx.push({k:"flash",col:"#ff3a4a",life:.7,max:.7}); stamp("최종<br>보스!") } g.pending.push({t:1.6,run:()=>{ g.duelQ=e; evAll({t:"duel",id:e.id}) }}); g.shake=.4; SND.setIntensity(1) }
  function hitPlayer(d){ const P=g.p; if(P.inv>0||P.dead) return; sfx("hurt"); P.hp-=d*M.armor; g.fx.push({k:"num",x:P.x,y:P.y-40,v:-Math.round(d*M.armor),me:true,life:.8,max:.8}); P.inv=.5; g.fx.push({k:"hit",x:P.x,y:P.y,life:.25,max:.25}); g.shake=Math.max(g.shake,.15) }
  function bossAI(e,dt){
    const P=NM?nearestPlayer(e.x,e.y):g.p, TP=()=>NM?nearestPlayer(e.x,e.y):g.p;
    if(e.dash>0){ e.dash-=dt; e.x+=e.dvx*dt; e.y+=e.dvy*dt; if(Math.random()<.5) g.fx.push({k:"hit",x:e.x,y:e.y,life:.15,max:.15}) }
    if(e.stun>0) return;
    e.bt-=dt; if(e.bt>0) return;
    if(!e.enraged && e.hp<e.max*.5){ e.enraged=true; e.sp*=1.3; say(`${e.name}이(가) 분노했어요! 스킬을 더 자주 써요!`,"enrage"); g.shake=.5; g.fx.push({k:"flash",col:"#e9475f",life:.5,max:.5}) }
    const SKT=(typeof BOSS_SKILLS!=="undefined"&&BOSSES[e.bid]&&BOSSES[e.bid].tier!==undefined)?BOSS_SKILLS[MAP.id]&&BOSS_SKILLS[MAP.id][BOSSES[e.bid].tier]:null;
    const PW=typeof bossPow==="function"?bossPow(MAP.id,(BOSSES[e.bid]||{}).tier||0):{n:1,cd:1,sp:1};
    let act, skName;
    if(SKT&&e.enraged&&SKT.ult&&!e.ultDone){ e.ultDone=true; act=SKT.ult[0]; skName=SKT.ult[1]; e.isUlt=true }
    else if(SKT){ const pick=SKT.k[e.bi++%SKT.k.length]; act=pick[0]; skName=pick[1]; e.isUlt=false }
    else { act=e.ai[e.bi++%e.ai.length]; e.isUlt=false }
    e.bt=(e.big?2.2:2.8)*(e.enraged?.65:1)*PW.cd;
    const N=x=>Math.max(1,Math.round(x*PW.n*(e.isUlt?1.5:1)));   // 탄 개수: 맵·단계가 높을수록 많아요
    const isSp=e.isUlt||!(typeof BASIC_ATK!=="undefined"&&BASIC_ATK[act]);   // 특수 공격은 미리 알려줘요
    e.atk={k:act,t0:g.t,wind:e.isUlt?1.4:isSp?1.0:.45,sp:isSp?1:0,ult:e.isUlt?1:0};   // 공격 모션 (기 모으기 → 내지르기)
    e.bt=Math.max(e.bt,e.atk.wind+.75);   // 알림이 끝나기 전에 다음 공격이 겹치지 않게
    if(e.isUlt){ g.fx.push({k:"flash",col:"#ffffff",life:.5,max:.5}); g.shake=.6; stamp("필살기!"); say(`⚠ ${e.name}의 필살기 「${skName}」!`,"enrage"); e.bt+=1.2 }
    const SN={stomp:"땅 울리기",summon:"부하 소환",spore:"독 포자",rock:"바위 던지기",dash:"돌진",fire3:"화염탄",fire5:"화염 폭풍",meteor:"운석 낙하",rage:"광폭의 포효",orbs:"마력 구슬",laser:"파멸의 광선",ring:"사방 탄막"};
    const BX=BOSSES[e.bid]||{};   // 보스마다 기술 이름·색이 달라요
    const nm=skName||(BX.sn&&BX.sn[act])||SN[act]||act; e.atk.name=nm;
    sfx(isSp?"alarm":"bosscast"); g.fx.push({k:"bosscast",x:e.x,y:e.y-e.r*1.9,text:nm,life:1.3,max:1.3,eid:e.id,ak:act,wd:e.atk.wind,sp:e.atk.sp,ul:e.atk.ult});
    g.pending.push({t:e.atk.wind,run:()=>{ if(e.hp>0) bossAct(e,act,TP(),N,PW,BX) }}) }
  function bossAct(e,act,P,N,PW,BX){ const TP=()=>NM?nearestPlayer(e.x,e.y):g.p; const SPD=PW.sp;
    const aim=Math.atan2(P.y-e.y,P.x-e.x);
    if(act==="stomp"){ const R=e.r*2.8; g.fx.push({k:"warn",x:e.x,y:e.y,r:R,life:.85,max:.85});
      g.pending.push({t:.85,run:()=>{ aoeC(e.x,e.y,R,e.dmg*1.3); g.fx.push({k:"quake",x:e.x,y:e.y,r:R,life:.5,max:.5}); g.shake=.35 }}) }
    else if(act==="summon"){ const m=MOBS[MAP.id][e.minion||0]||MOBS[MAP.id][0]; for(let i=0;i<4;i++){ const a=i*1.57+Math.random(); addMob(m,e.x+Math.cos(a)*e.r*1.6,e.y+Math.sin(a)*e.r*1.6,.8) } g.fx.push({k:"ring",x:e.x,y:e.y,life:.5,max:.5}) }
    else if(act==="spore"){ for(let i=0;i<10;i++){ const a=i*Math.PI/5; g.eshots.push({x:e.x,y:e.y,vx:Math.cos(a)*200,vy:Math.sin(a)*200,r:9,dmg:e.dmg*.6,life:3,col:"#b8e06a",kind:"spore"}) } }
    else if(act==="rock"){ for(let i=-1;i<=1;i++) g.eshots.push({x:e.x,y:e.y,vx:Math.cos(aim+i*.25)*360,vy:Math.sin(aim+i*.25)*360,r:14,dmg:e.dmg*.8,life:2.5,col:"#8d86a0",kind:"rock"}) }
    else if(act==="dash"){ g.fx.push({k:"warn",x:P.x,y:P.y,r:40,life:.5,max:.5}); g.pending.push({t:.5,run:()=>{ const q=TP(), a=Math.atan2(q.y-e.y,q.x-e.x); e.dash=.6; e.dvx=Math.cos(a)*e.sp*5; e.dvy=Math.sin(a)*e.sp*5 }}) }
    else if(act==="fire3"||act==="fire5"){ const n=act==="fire3"?3:5; for(let w=0;w<(e.big?2:1);w++) g.pending.push({t:w*.35,run:()=>{ const q=TP(), a0=Math.atan2(q.y-e.y,q.x-e.x);
      for(let i=0;i<n;i++){ const a=a0+(i-(n-1)/2)*.22; g.eshots.push({x:e.x,y:e.y,vx:Math.cos(a)*300,vy:Math.sin(a)*300,r:11,dmg:e.dmg*.7,life:3,col:"#ff8a2a",kind:"fire"}) } }}) }
    else if(act==="rage"){ const R=420; let n=0; g.en.forEach(o=>{ if(o!==e && (o.x-e.x)**2+(o.y-e.y)**2<R*R){ o.rage=8; n++ } });
      g.fx.push({k:"ragewave",x:e.x,y:e.y,r:R,life:.8,max:.8}); g.shake=.3; if(n) say(`광폭의 포효! 주변 몬스터 ${n}마리가 8초 동안 빨라지고 세졌어요!`) }
    else if(act==="orbs"){ const n=N(e.enraged?7:5); for(let i=0;i<n;i++){ const a=i*Math.PI*2/n; g.eshots.push({x:e.x+Math.cos(a)*e.r,y:e.y+Math.sin(a)*e.r,vx:Math.cos(a)*120,vy:Math.sin(a)*120,r:12,dmg:e.dmg*.7,life:5,col:BX.orbCol||"#c08bff",kind:"orb",home:1.2+i*.08}) } }
    else if(act==="laser"){ const n=e.enraged?3:1; for(let i=0;i<n;i++){ const a=aim+(i-(n-1)/2)*.5, len=Math.max(W,H)*1.2;
        g.fx.push({k:"laserwarn",x:e.x,y:e.y,a,len,life:1,max:1});
        g.pending.push({t:1,run:()=>{ aoeL(e.x,e.y,a,len,e.dmg*1.4); g.fx.push({k:"laser",x:e.x,y:e.y,a,len,life:.35,max:.35}); g.shake=Math.max(g.shake,.25) }}) } }
    else if(act==="ring"){ const n=N(e.enraged?24:16); for(let w=0;w<(e.enraged?2:1);w++) g.pending.push({t:w*.4,run:()=>{ const off=w*.13; for(let i=0;i<n;i++){ const a=off+i*Math.PI*2/n; g.eshots.push({x:e.x,y:e.y,vx:Math.cos(a)*230*SPD,vy:Math.sin(a)*230*SPD,r:9,dmg:e.dmg*.55,life:3.5,col:BX.shotCol||"#ff5a8a",kind:BX.shotKind||"fire"}) } }}) }
    else if(act==="meteor"){ for(let i=0;i<N(e.enraged?10:6);i++){ const x=P.x+(Math.random()-.5)*320, y=P.y+(Math.random()-.5)*240, at=.9+i*.12;
      g.fx.push({k:"warn",x,y,r:70,life:at,max:at}); if(!BX.ground) g.fx.push({k:"meteor",x,y,life:at,max:.45});
      g.pending.push({t:at,run:()=>{ sfx("boom"); aoeC(x,y,70,e.dmg); g.fx.push({k:"boom",x,y,r:70,col:BX.boomCol||"#ff6a3c",life:.4,max:.4}); if(BX.ground) g.fx.push({k:"quake",x,y,r:70,life:.45,max:.45}); g.shake=Math.max(g.shake,.2) }}) } }
    // ── 새 기술들 ──
    else if(act==="spiral"){ const arms=N(3), steps=14, col=BX.shotCol||"#c88aff"; for(let st=0;st<steps;st++) g.pending.push({t:st*.08,run:()=>{ if(e.hp<=0) return; for(let k=0;k<arms;k++){ const a=st*.32+k*Math.PI*2/arms; g.eshots.push({x:e.x,y:e.y,vx:Math.cos(a)*200*SPD,vy:Math.sin(a)*200*SPD,r:9,dmg:e.dmg*.45,life:3.2,col,kind:"fire"}) } }}) }
    else if(act==="cross"){ const len=Math.max(W,H)*1.2, base=aim, n=e.enraged?2:1; for(let w=0;w<n;w++){ const off=w*Math.PI/4; for(let k=0;k<4;k++){ const a=base+off+k*Math.PI/2;
        g.fx.push({k:"laserwarn",x:e.x,y:e.y,a,len,life:1+w*.5,max:1+w*.5}); g.pending.push({t:1+w*.5,run:()=>{ aoeL(e.x,e.y,a,len,e.dmg*1.3); g.fx.push({k:"laser",x:e.x,y:e.y,a,len,life:.35,max:.35}); g.shake=Math.max(g.shake,.3) }}) } } }
    else if(act==="nova"){ const waves=e.isUlt?4:3; for(let w=0;w<waves;w++) g.pending.push({t:w*.45,run:()=>{ if(e.hp<=0) return; const n=N(18), off=w*.17; sfx("boom"); for(let i=0;i<n;i++){ const a=off+i*Math.PI*2/n; g.eshots.push({x:e.x,y:e.y,vx:Math.cos(a)*(170+w*40)*SPD,vy:Math.sin(a)*(170+w*40)*SPD,r:10,dmg:e.dmg*.5,life:3.5,col:BX.shotCol||"#ffd36a",kind:"fire"}) } g.fx.push({k:"ring",x:e.x,y:e.y,life:.5,max:.5}) }}) }
    else if(act==="storm"){ const T=teamPlayers(); T.push(g.p); const n=N(14); for(let i=0;i<n;i++){ const q=T[i%T.length], x=q.x+(Math.random()-.5)*520, y=q.y+(Math.random()-.5)*380, at=.8+i*.09;
        g.fx.push({k:"warn",x,y,r:62,life:at,max:at}); g.pending.push({t:at,run:()=>{ sfx("boom"); aoeC(x,y,62,e.dmg*.9); g.fx.push({k:"bolt",x,y,life:.3,max:.3}); g.fx.push({k:"boom",x,y,r:62,col:BX.boomCol||"#bfa0ff",life:.4,max:.4}); g.shake=Math.max(g.shake,.2) }}) } }
    else if(act==="pull"){ const R=520, dur=2.4; g.fx.push({k:"blackhole",x:e.x,y:e.y,r:R,life:dur,max:dur}); say("🌀 블랙홀이 끌어당겨요! 반대로 움직여요!","alarm");
      g.bh={x:e.x,y:e.y,r:R,t:dur,pow:220*SPD}; g.pending.push({t:dur,run:()=>{ aoeC(e.x,e.y,e.r*2.2,e.dmg*1.6); g.fx.push({k:"boom",x:e.x,y:e.y,r:e.r*2.2,col:"#9a5aff",life:.5,max:.5}); g.shake=.5 }}) }
  }
  function hurt(e,d,dot){ if(e.hp<=0) return; let m=st().dmg*(g.buff?g.buff.mul:1)*(g.bbuff?g.bbuff.dmg:1)*(F.combo?1+.06*g.combo:1); if(!dot && M.crit && Math.random()<M.crit){ m*=2; sfx("crit"); g.fx.push({k:"crit",x:e.x,y:e.y-e.r,life:.35,max:.35}) } if(F.poison && !dot){ e.burn=3; e.burnD=Math.max(e.burnD||0,d*.12) } const dealt=d*m; if(NM==="client"){ netOut.d[e.id]=(netOut.d[e.id]||0)+dealt; e.hitT2=g.t } else e.hp-=dealt; if(!dot) sfx("hit"); e.flash=.08; if(!dot||Math.random()<.5){ e.dmgAcc=(e.dmgAcc||0)+dealt; if(!e.dmgT||g.t-e.dmgT>.12||e.hp<=0){ g.fx.push({k:"num",x:e.x+(Math.random()-.5)*e.r,y:e.y-e.r,v:Math.round(e.dmgAcc),crit:m>st().dmg*1.9,dot,life:.7,max:.7}); e.dmgAcc=0; e.dmgT=g.t } } if(!dot){ e.hitT=g.t; const a=Math.atan2(e.y-g.p.y,e.x-g.p.x); e.hx=Math.cos(a); e.hy=Math.sin(a); if(Math.random()<.35) g.fx.push({k:"spark",x:e.x,y:e.y-e.r*.3,life:.22,max:.22,a:Math.random()*6}) } if(e.hp<=0) kill(e) }
  function kill(e){ sfx("kill"); if(NM==="host") hostEv.push({t:"kd",id:e.id,x:Math.round(e.x),y:Math.round(e.y),r:e.r});
    g.kills++;
    if(onScreen(e)) g.fx.push({k:"poof",x:e.x,y:e.y,r:e.r,c:e.c||"#ffffff",life:.45,max:.45,seed:Math.random()*6});
    g.gems.push({x:e.x,y:e.y,v:e.xp});
    if(e.type==="boss"){ g.items.push({x:e.x,y:e.y,k:"gem"}); g.items.push({x:e.x+40,y:e.y,k:"heal"});
      for(let i=0;i<10;i++){ const a=i*.628; g.gems.push({x:e.x+Math.cos(a)*40,y:e.y+Math.sin(a)*40,v:6}) }
      g.bossKills++; { const BB=BOSSES[e.bid]; g.bossCoins+=BB&&BB.tier!==undefined&&BB.tier<3?starCoin(MAP.id,BB.tier):0 } stageBossDown(e); const B=e.buff; g.bbuff=Object.assign({},B,{t:30,max:30}); evAll({t:"bb",bid:e.bid,name:e.name,more:g.en.some(o=>o!==e&&o.type==="boss"&&o.hp>0)});
      stamp("보스<br>처치!"); sfx("win"); if((BOSSES[e.bid]||{}).deathMsg) g.pending.push({t:1.2,run:()=>say(BOSSES[e.bid].deathMsg,"win")}); SND.setIntensity(g.en.some(o=>o!==e&&o.type==="boss"&&o.hp>0)); g.shake=.5; g.fx.push({k:"flash",col:"#f6c544",life:.5,max:.5});
      showBanner(`${e.name} 처치! ★ 별 ${Math.min(4,g.bossKills)}개 · ${B.name}: 30초 동안 공격력 ×${B.dmg} · 이동 ×${B.spd}`); }
    else if(Math.random()<.012*(MAP.realm==="sky"?.55:1)) g.items.push({x:e.x,y:e.y,k:"heal"});
  }
  const near = (x,y,n)=>g.en.filter(e=>e.hp>0).map(e=>[e,(e.x-x)**2+(e.y-y)**2]).sort((a,b)=>a[1]-b[1]).slice(0,n).map(a=>a[0]);
  const onScreen = e=>Math.abs(e.x-g.p.x)<W/2+20 && Math.abs(e.y-g.p.y)<H/2+20;

  /* ===== 같이 하기 (여러 명): 방장이 몬스터·보스를 움직이고, 친구들은 화면을 받아요 ===== */
  const NM = (opts.mp && typeof NET!=="undefined" && NET.role) ? NET.role : null;
  /* 같이 하기 난이도: 친구가 많을수록 몬스터가 많고 세져요. 대신 협동 보너스가 있어요 */
  const CO = { spawn:1.0, hp:.65, boss:.95, spd:1.18, dmg:1.4, xp:.7, crisis:.7, reward:1.3 };
  const RP = {}, EN = {}, GM = {}, IT = {}, BKEYS = Object.keys(BOSSES), inbox=[];
  let nid=1, netAcc=0, hostEv=[], hostTo={}, xpShare=0, wipeT=0;
  const netOut={d:{},g:[],it:[],sh:[],fx:[]};
  const myName=(()=>{ const p=prof(); return (p&&p.name)||(p?`${p.c}반 ${p.n}번`:"나") })();
  const SHARE={safe:1,icicle:1,blackhole:1,slash:1,bigslash:1,quake:1,bolt:1,boom:1,ring:1,meteor:1,label:1,warn:1,laserwarn:1,laser:1,ragewave:1,bosscast:1,scorch:1};
  function teamPlayers(){ const L=[]; if(!g.p.dead) L.push(g.p); for(const id in RP){ const r=RP[id]; if(!r.dead&&!r.gone) L.push(r) } return L }
  /* 같이 하기: 기술을 고르는 친구(최대 30초)에게는 몬스터가 가지 않고 다른 친구를 노려요 */
  const PZ_MAX=30000;
  function choosing(q){ const now=performance.now();
    if(q===g.p){ if(g.paused&&!g.over){ g.pzT=g.pzT||now; return now-g.pzT<PZ_MAX } g.pzT=0; return false }
    return !!q.pzT && now-q.pzT<PZ_MAX }
  /* 모두가 고르고 있으면 몬스터(와 시간)도 멈춰요 */
  function allChoosing(){ const T=teamPlayers(); return T.length>0 && T.every(choosing) }
  function huntPlayers(){ const T=teamPlayers(), L=T.filter(q=>!choosing(q)); return L.length?L:T }
  function nearestPlayer(x,y){ let best=g.p, bd=1e18; for(const q of huntPlayers()){ const d=(q.x-x)**2+(q.y-y)**2; if(d<bd){bd=d;best=q} } return best }
  function randPlayer(){ const L=huntPlayers(); return L.length?L[Math.random()*L.length|0]:g.p }
  const nPlayers=()=>1+Object.values(RP).filter(r=>!r.gone).length;
  const evAll=m=>{ if(NM==="host") hostEv.push(m) };
  function say(text,snd){ showBanner(text); if(snd) sfx(snd); evAll({t:"ban",x:text,s:snd||""}) }
  function plainFx(f){ const c={}; for(const k in f){ const v=f[k]; if(typeof v!=="object"&&typeof v!=="function") c[k]=v } return c }
  function patchArrs(){ if(!NM) return;
    if(!g.fx._p){ g.fx.push=function(...a){ for(const f of a){ if(!f.remote&&SHARE[f.k]&&!f.own){ const c=plainFx(f); if(NM==="host") hostEv.push({t:"fx",f:c}); else if(netOut.fx.length<40) netOut.fx.push(c) } } return Array.prototype.push.apply(this,a) }; g.fx._p=1 }
    if(!g.shots._p){ g.shots.push=function(...a){ for(const o of a){ if(!o.remote){ const c={k:o.k,x:Math.round(o.x),y:Math.round(o.y),vx:Math.round(o.vx),vy:Math.round(o.vy),l:+o.life.toFixed(2),dk:o.dark?1:0,gl:o.glow?1:0,ik:o.ink?1:0}; if(NM==="host") hostEv.push({t:"sh",s:c}); else if(netOut.sh.length<40) netOut.sh.push(c) } } return Array.prototype.push.apply(this,a) }; g.shots._p=1 }
    if(NM==="host" && !g.eshots._p){ g.eshots.push=function(...a){ for(const b of a) hostEv.push({t:"es",b:plainFx(b)}); return Array.prototype.push.apply(this,a) }; g.eshots._p=1 } }
  function addRemoteShot(c){ g.shots.push({k:c.k,x:c.x,y:c.y,vx:c.vx,vy:c.vy,life:c.l,dark:!!c.dk,glow:!!c.gl,ink:!!c.ik,remote:true,dmg:0,pierce:99,hit:new Set()}) }
  function addRemoteFx(f){ f.remote=true; if(f.k==="bosscast"&&f.eid!==undefined){ const e=g.en.find(o=>o.id===f.eid); if(e){ e.atk={k:f.ak,t0:g.t,wind:f.wd||.45,sp:f.sp,ult:f.ul,name:f.text}; if(f.sp) sfx("alarm") } } if(f.k==="label"&&f.text) f.life=f.max=1.2; if(f.k==="blackhole") g.bh={x:f.x,y:f.y,r:f.r,t:f.life,pow:240}; g.fx.push(f) }
  function aoeC(x,y,r,d){ if(!g.p.dead && (g.p.x-x)**2+(g.p.y-y)**2<(r+g.p.r)**2) hitPlayer(d); evAll({t:"aoe",s:"c",x,y,r,d}) }
  function aoeL(x,y,a,len,d){ const hit=q=>{ const px=q.x-x, py=q.y-y, along=px*Math.cos(a)+py*Math.sin(a), across=Math.abs(-px*Math.sin(a)+py*Math.cos(a)); return along>0&&along<len&&across<26+q.r };
    if(!g.p.dead && hit(g.p)) hitPlayer(d); evAll({t:"aoe",s:"l",x,y,a,len,d}) }
  function onAoe(m){ const q=g.p; if(q.dead) return;
    if(m.s==="c"){ if((q.x-m.x)**2+(q.y-m.y)**2<(m.r+q.r)**2) hitPlayer(m.d) }
    else { const px=q.x-m.x, py=q.y-m.y, along=px*Math.cos(m.a)+py*Math.sin(m.a), across=Math.abs(-px*Math.sin(m.a)+py*Math.cos(m.a)); if(along>0&&along<m.len&&across<26+q.r) hitPlayer(m.d) } }
  function meState(){ const q=g.p; return {x:Math.round(q.x),y:Math.round(q.y),f:q.face||1,mv:+(q.mv||0).toFixed(2),hp:Math.max(0,Math.round(q.hp)),mx:Math.round(st().maxHp),d:q.dead?1:0,h:HERO.id,tr:HSt.tier,n:myName,l:g.lvl} }
  function setRP(id,s){ let r=RP[id]; if(!r){ r=RP[id]={x:s.x,y:s.y,r:16,img:null,rx:s.x,ry:s.y} } r.st=s; r.x=s.x; r.y=s.y; r.dead=!!s.d; r.gone=false;
    if(!r.img||r.imgKey!==s.h+s.tr){ r.img=new Image(); r.img.src=(SPRITE_T[s.h]&&SPRITE_T[s.h][s.tr])||SPRITE_URLS[s.h]||""; r.imgKey=s.h+s.tr } }
  function mkEnt(id,di,fl,x,y){ let e;
    if(di<0){ const bid=BKEYS[-1-di], B=BOSSES[bid]; e={type:"boss",bid,look:B.look,c:B.c,crown:B.crown,name:B.name,r:B.r,big:B.big} }
    else { const m=MOBS[MAP.id][di]||MOBS[MAP.id][0], S=SIZE[m.size]; e={type:m.size==="big"?"big":"mob",look:m.look,c:m.c,name:m.name,r:S.r*(fl&1?1.45:1),elite:!!(fl&1)} }
    return Object.assign(e,{id,mapId:MAP.id,x,y,tx:x,ty:y,hp:100,max:100,slow:0,flash:0,stoneCD:0,wob:Math.random()*6,born:g.t}) }
  function itemFx(k){ const q=g.p, s=st();
    if(k==="heal"){ sfx("heal"); q.hp=Math.min(s.maxHp,q.hp+30); showBanner("회복 물약! 체력을 채웠어요") }
    else if(k==="gem"){ sfx("chest"); q.hp=Math.min(s.maxHp,q.hp+40); openGemChest() }
    else { sfx("chest"); const o=options(); q.hp=Math.min(s.maxHp,q.hp+40); if(o.length){ apply(o[0]); showBanner(`보물 상자! ${skName(o[0])} 기술이 세졌어요`) } else showBanner("보물 상자! 체력을 채웠어요") } }
  function bossReward(bid,name){ const B=BOSSES[bid]; if(!B) return; g.bossKills++; g.bossCoins+=B.tier!==undefined&&B.tier<3?starCoin(MAP.id,B.tier):0; g.bbuff=Object.assign({},B.buff,{t:30,max:30});
    stamp("보스<br>처치!"); sfx("win"); g.shake=.5; g.fx.push({k:"flash",col:"#f6c544",life:.5,max:.5}); showBanner(`${name} 처치! ★ 별 ${Math.min(4,g.bossKills)}개 · ${B.buff.name}: 30초 동안 공격력 ×${B.buff.dmg} · 이동 ×${B.buff.spd}`) }
  function snap(){ const T=teamPlayers(); T.push(g.p); for(const id in RP) if(!RP[id].gone) T.push(RP[id]);
    const nearAny=(o,R)=>{ for(const q of T) if(Math.abs(o.x-q.x)<R&&Math.abs(o.y-q.y)<R) return true; return false };
    const en=[]; for(const e of g.en){ if(e.hp<=0||!nearAny(e,1000)) continue; en.push([e.id,Math.round(e.x),Math.round(e.y),Math.max(1,Math.ceil(e.hp/e.max*100)),e.di,(e.elite?1:0)|(e.stun>0?2:0)|(e.slow>0?4:0)|(e.rage>0?8:0)|(e.enraged?16:0),Math.round(e.dmg*(e.rage>0?1.5:1))]) }
    const gm=[]; for(const o of g.gems){ if(!o.id) o.id=nid++; if(gm.length<150&&nearAny(o,800)) gm.push([o.id,Math.round(o.x),Math.round(o.y),o.v]) }
    const it=g.items.map(o=>{ if(!o.id) o.id=nid++; return [o.id,Math.round(o.x),Math.round(o.y),o.k] });
    const pl={}; pl[NET.myId]=meState(); for(const id in RP) if(!RP[id].gone) pl[id]=RP[id].st;
    return {t:"s",tm:+g.t.toFixed(2),k:g.kills,en,gm,it,pl,sg:g.stageN,nb:Math.round(g.nextBossT),bu:g.bossUp?1:0} }
  function hostRecv(m,from){
    if(m.t==="quit"){ if(RP[from]) RP[from].gone=true; NET.ing.delete(from); return }
    if(m.t!=="c") return;
    if(m.me) setRP(from,m.me);
    if(m.or) originRes(from,m.or.id,!!m.or.ok);
    if(RP[from]){ const r=RP[from]; if(m.pz){ if(!r.pzT) r.pzT=performance.now() } else r.pzT=0 }
    if(m.d&&m.d.length){ const by=new Map(g.en.map(e=>[e.id,e])); for(const [id,d] of m.d){ const e=by.get(id); if(e&&e.hp>0){ e.hp-=d; e.flash=.08; if(e.hp<=0) kill(e) } } }
    if(m.g) for(const id of m.g){ const i=g.gems.findIndex(o=>o.id===id); if(i>=0){ const v=g.gems[i].v; g.gems.splice(i,1); xpShare+=v; g.xp+=v*M.xp } }
    if(m.it) for(const id of m.it){ const i=g.items.findIndex(o=>o.id===id); if(i>=0){ const k=g.items[i].k; g.items.splice(i,1); (hostTo[from]=hostTo[from]||[]).push({t:"itok",k}) } }
    if(m.sh) for(const c of m.sh){ addRemoteShot(c); hostEv.push({t:"sh",s:c,from}) }
    if(m.fx) for(const f of m.fx){ addRemoteFx(Object.assign({},f)); hostEv.push({t:"fx",f,from}) }
    if(m.duel){ const by=new Map(g.en.map(e=>[e.id,e])), pct=.09/(1+.5*(nPlayers()-1)); for(const id of m.duel){ const e=by.get(id); if(e&&e.hp>0){ e.hp-=e.max*pct; e.flash=.2; if(e.hp<=0) kill(e) } } } }
  function clientRecv(m){
    if(m.t!=="s") return;
    g.t=m.tm; g.kills=m.k; if(m.sg!==undefined){ g.stageN=m.sg; STAGE_PH=Math.min(3,m.sg); g.nextBossT=m.nb; g.bossUp=!!m.bu }
    const seen=new Set();
    for(const a of m.en){ const [id,x,y,hp,di,fl,dmg]=a; seen.add(id); let e=EN[id];
      if(!e){ e=EN[id]=mkEnt(id,di,fl,x,y); g.en.push(e) }
      e.tx=x; e.ty=y; e.hp=hp; e.dmg=dmg; e.stun=fl&2?.15:0; e.rage=fl&8?.2:0; e.enraged=!!(fl&16); if(fl&4) e.slow=Math.max(e.slow,.15) }
    for(const id in EN) if(!seen.has(+id)){ EN[id].hp=0; delete EN[id] }
    const gs=new Set(); for(const [id,x,y,v] of m.gm){ gs.add(id); let o=GM[id]; if(!o){ o=GM[id]={id,x,y,v}; g.gems.push(o) } else if(!o.fly){ o.x=x; o.y=y } }
    for(const id in GM) if(!gs.has(+id)){ GM[id].got=true; delete GM[id] }
    const is=new Set(); for(const [id,x,y,k] of m.it){ is.add(id); if(!IT[id]){ IT[id]={id,x,y,k}; g.items.push(IT[id]) } }
    for(const id in IT) if(!is.has(+id)){ IT[id].got=true; delete IT[id] }
    for(const id in m.pl) if(id!==NET.myId) setRP(id,m.pl[id]);
    for(const id in RP) if(!m.pl[id]) RP[id].gone=true;
    for(const ev of (m.ev||[])){ if(ev.from&&ev.from===NET.myId) continue;
      if(ev.t==="fx") addRemoteFx(Object.assign({},ev.f));
      else if(ev.t==="sh") addRemoteShot(ev.s);
      else if(ev.t==="es") g.eshots.push(Object.assign({},ev.b));
      else if(ev.t==="xp") g.xp+=ev.v*M.xp;
      else if(ev.t==="kd"){ sfx("kill"); g.fx.push({k:"poof",x:ev.x,y:ev.y,r:ev.r,c:"#ffffff",life:.45,max:.45,seed:Math.random()*6}); if(EN[ev.id]){ EN[ev.id].hp=0; delete EN[ev.id] } }
      else if(ev.t==="aoe") onAoe(ev);
      else if(ev.t==="ban"){ showBanner(ev.x); if(ev.s) sfx(ev.s); if(ev.s==="boss") SND.setIntensity(1) }
      else if(ev.t==="bb"){ bossReward(ev.bid,ev.name); SND.setIntensity(!!ev.more) }
      else if(ev.t==="itok") itemFx(ev.k);
      else if(ev.t==="duel") g.duelQ={id:ev.id};
      else if(ev.t==="gust") startGust(ev.a);
      else if(ev.t==="judg"){ if((g.p.x-ev.x)**2+(g.p.y-ev.y)**2>ev.r*ev.r) hitPlayer(ev.d) }
      else if(ev.t==="oq"){ if(!g.p.dead) queueOrigin(ev.id) }
      else if(ev.t==="ofx"){ g.oriQ=null; originClose(); castOrigin() }
      else if(ev.t==="ofail"){ g.oriQ=null; originClose(); originFail(ev.n,ev.of) }
      else if(ev.t==="end"){ finish(!!ev.win); return } } }
  if(NM){ NET.onGame=(m,from)=>inbox.push([m,from]);
    NET.onDrop=id=>{ if(NM==="host"){ if(RP[id]){ RP[id].gone=true; showBanner("친구 한 명이 나갔어요") } } else if(id==="host"&&!g.over){ showBanner("방장과 연결이 끊어졌어요"); setTimeout(()=>finish(false),1200) } } }
  function netTick(dt){
    while(inbox.length){ const [m,from]=inbox.shift(); if(NM==="host") hostRecv(m,from); else clientRecv(m); if(g.over) return }
    netAcc+=dt; if(netAcc<1/12) return; netAcc=0;   // 렉 줄이기: 1초에 12번만 주고받아요
    if(NM==="host"){
      if(xpShare){ hostEv.push({t:"xp",v:xpShare}); xpShare=0 }
      const base=snap();
      for(const id of NET.ing){ const c=NET.conns[id]; if(!c||!c.open) continue;
        const ev=hostEv.filter(x=>x.from!==id).concat(hostTo[id]||[]); try{ c.send(Object.assign({},base,{ev})) }catch(e){} }
      hostEv=[]; hostTo={};
      // 모두 쓰러지면 끝
      const alive=!g.p.dead || Object.values(RP).some(r=>!r.gone&&!r.dead);
      wipeT = alive?0:wipeT+1/15; if(wipeT>1.5){ endAll(false) }
    } else {
      const c=NET.hostConn; if(!c||!c.open) return;
      try{ c.send({t:"c",pz:(g.paused&&!g.over)?1:0,me:meState(),d:Object.entries(netOut.d).map(([id,v])=>[+id,Math.round(v*10)/10]),g:netOut.g,it:netOut.it,sh:netOut.sh,fx:netOut.fx,duel:netOut.duel||[],or:netOut.or||null}) }catch(e){}
      netOut.d={}; netOut.g=[]; netOut.it=[]; netOut.sh=[]; netOut.fx=[]; netOut.duel=[]; netOut.or=null } }
  function endAll(win){ if(g.over) return; if(NM==="host"){ const m={t:"s",tm:g.t,k:g.kills,en:[],gm:[],it:[],pl:{},ev:[{t:"end",win}]}; for(const id of NET.ing){ const c=NET.conns[id]; try{ c&&c.send(m) }catch(e){} } } finish(win) }
  function down(){ const q=g.p; q.dead=true; q.hp=0; g.rescue=0; modal.hidden=true; g.paused=false; showBanner(`쓰러졌어요! 친구가 옆에 ${RESCUE}초 동안 서 있으면 다시 일어나요`); }
  function drawRemotes(){ for(const id in RP){ const r=RP[id]; if(r.gone||!r.st) continue; r.rx+=(r.x-r.rx)*.25; r.ry+=(r.y-r.ry)*.25; const s=r.st;
      if(Math.abs(r.rx-g.p.x)>W/2+80||Math.abs(r.ry-g.p.y)>H/2+80) continue;
      ctx.fillStyle="rgba(37,33,27,.22)"; ctx.beginPath(); ctx.ellipse(r.rx,r.ry+20,16,5,0,0,7); ctx.fill();
      if(s.tr>0){ const tc=TIER_COLOR[s.tr]; ctx.save(); ctx.globalAlpha=.4; ctx.fillStyle=tc; ctx.beginPath(); ctx.ellipse(r.rx,r.ry+18,30,10,0,0,7); ctx.fill(); ctx.restore() }
      if(r.img&&r.img.complete&&r.img.naturalWidth){ ctx.save(); ctx.translate(r.rx,r.ry+20); if(s.d){ ctx.rotate(Math.PI/2); ctx.globalAlpha=.55; ctx.filter="grayscale(1)" } else { const hop=Math.abs(Math.sin(g.t*14))*6*(s.mv||0); ctx.translate(0,-hop) } ctx.scale(s.f||1,1); if(isHeroArt(r.img.src)&&!s.d){ const T=ctx.getTransform(); REMOTE_HD.push({r,T,mv:s.mv||0}) } else ctx.drawImage(r.img,-32,-62,64,64); ctx.filter="none"; ctx.restore() }
      const w=40, k=s.mx?Math.max(0,s.hp/s.mx):0; ctx.fillStyle="rgba(0,0,0,.55)"; ctx.fillRect(r.rx-w/2-1,r.ry-52,w+2,6); ctx.fillStyle=k>.5?"#3fcf8e":k>.25?"#ffd23a":"#ff4a5a"; ctx.fillRect(r.rx-w/2,r.ry-51,w*k,4);
      if(s.d){ ctx.strokeStyle=`rgba(255,240,150,${.5+.4*Math.sin(g.t*6)})`; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(r.rx,r.ry+8,80,0,7); ctx.stroke() } } }
  function drawRemoteNames(){ for(const id in RP){ const r=RP[id]; if(r.gone||!r.st) continue; if(Math.abs(r.rx-g.p.x)>W/2+80||Math.abs(r.ry-g.p.y)>H/2+80) continue;
      ctx.font='14px "Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.textBaseline="alphabetic"; ctx.lineWidth=4; ctx.strokeStyle="#140c20"; const t=(r.st.d?"🆘 ":"")+r.st.n+" · Lv"+r.st.l; ctx.strokeText(t,r.rx,r.ry-57); ctx.fillStyle=r.st.d?"#ffd36a":"#ffffff"; ctx.fillText(t,r.rx,r.ry-57) }
    if(g.p.dead){ ctx.font='16px "Black Han Sans","Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.lineWidth=5; ctx.strokeStyle="#140c20"; const t=`도와줘! ${Math.round((g.rescue||0)/RESCUE*100)}%`; ctx.strokeText(t,g.p.x,g.p.y-58); ctx.fillStyle="#ffd36a"; ctx.fillText(t,g.p.x,g.p.y-58) } }

  /* ===== 전직 스킬 엔진 ===== */
  function onScreenEnemies(){ return g.en.filter(e=>e.hp>0&&onScreen(e)) }
  const inR=(x,y,r,e)=>(e.x-x)**2+(e.y-y)**2<(r+e.r)**2;
  function burstStars(x,y,n,dmg){ const off=Math.random()*Math.PI; for(let i=0;i<n;i++){ const a=off+i*Math.PI*2/n; g.shots.push({k:"star",x,y,vx:Math.cos(a)*480,vy:Math.sin(a)*480,dmg,pierce:1,life:.9,hit:new Set()}) } }
  function boomAt(x,y,r,dmg,col){ sfx(r>=110?"bigboom":"boom"); g.en.forEach(o=>{ if(inR(x,y,r,o)) hurt(o,dmg) }); g.fx.push({k:"boom",x,y,r,col,life:.45,max:.45}) }
  function spawnSummons(){
    SKL.forEach(k=>{ if(k.type!=="summon") return;
      if(k.what==="crew"){ g.sum.push({kind:"crew",side:-1,x:g.p.x,y:g.p.y,acc:0,dmg:k.dmg}); g.sum.push({kind:"crew",side:1,x:g.p.x,y:g.p.y,acc:.25,dmg:k.dmg}) }
      else g.sum.push({kind:k.what,x:g.p.x,y:g.p.y,acc:0,dmg:k.dmg||0,a:0});
    });
  }
  /* 똑똑한 조준: 둘러싸여 위험하면 내 주변부터, 여유로우면 몬스터가 가장 많이 모인 곳부터 때려요 */
  function surrounded(){ const P=g.p, s=st(); let n=0; for(const e of g.en){ if(e.hp>0&&(e.x-P.x)**2+(e.y-P.y)**2<175*175) n++ } return n>=8 || (P.hp/s.maxHp<.45 && n>=4) }
  function smartTargets(R,n){ const P=g.p, risky=surrounded();
    let pool=onScreenEnemies().filter(e=>e.hp>0);
    if(risky){ const close=pool.filter(e=>(e.x-P.x)**2+(e.y-P.y)**2<240*240); if(close.length) pool=close }
    if(!pool.length) return {risky,pts:[]};
    const samp=pool.length>90?shuffle(pool).slice(0,90):pool, RR=Math.max(60,R)**2;
    const scored=samp.map(e=>{ let c=0; for(const o of pool) if((o.x-e.x)**2+(o.y-e.y)**2<RR) c+=o.type==="boss"?6:o.elite?3:1; if(risky) c+=3*Math.max(0,1-Math.hypot(e.x-P.x,e.y-P.y)/240); return {e,c} }).sort((a,b)=>b.c-a.c);
    const pts=[]; for(const {e} of scored){ if(pts.length>=n) break; if(pts.some(p=>(p.x-e.x)**2+(p.y-e.y)**2<RR*.5)) continue; pts.push({x:e.x,y:e.y}) }
    while(pts.length<n) pts.push(pts[pts.length%Math.max(1,pts.length)]||{x:P.x,y:P.y});
    return {risky,pts} }
  function cast(k){
    const s=st(), P=g.p, onS=onScreenEnemies(), dmg=(k.dmg||0)*lvScale;
    if(k===SKL[3]){ const C=CUTC[HERO.id]||CUTC.warrior; g.fx.push({k:"cutin",text:k.name,sub:JOBS[HERO.id].titles[4]+" · 4차 스킬",c1:C[0],c2:C[1],c3:C[2],life:1.25,max:1.25}); sfx("cutin") }
    else g.fx.push({k:"label",x:P.x,y:P.y-50,text:k.name+(surrounded()?" · 주변 정리!":""),life:1.2,max:1.2});
    sfx({multislash:"multislash",quake:"quake",awaken:"awaken",zone:k.what==="rain"?"rain":"mist",stream:"hurricane",marks:"marks",flare:"flare",turret:"turret",battleship:"ship"}[k.type]||"");
    if(k.type==="multislash"){
      for(let i=0;i<k.hits;i++) g.pending.push({t:i*k.gap,run:()=>{ const P=g.p;
        g.en.forEach(e=>{ if(inR(P.x,P.y,k.r,e)){ hurt(e,dmg); const dx=e.x-P.x, dy=e.y-P.y, d=Math.hypot(dx,dy)||1; if(e.type!=="boss"){e.x+=dx/d*18;e.y+=dy/d*18} } });
        g.fx.push({k:"bigslash",x:P.x,y:P.y,r:k.r,a:i*2.1+g.t,life:.3,max:.3}); g.shake=Math.max(g.shake,.12) }});
    }
    else if(k.type==="quake"){
      g.en.forEach(e=>{ if(inR(P.x,P.y,k.r,e)){ hurt(e,dmg); e.stun=Math.max(e.stun||0,k.stun); const dx=e.x-P.x, dy=e.y-P.y, d=Math.hypot(dx,dy)||1; if(e.type!=="boss"){e.x+=dx/d*60;e.y+=dy/d*60} } });
      g.fx.push({k:"quake",x:P.x,y:P.y,r:k.r,life:.6,max:.6}); g.shake=.4;
    }
    else if(k.type==="awaken"){
      g.buff={t:k.dur,max:k.dur,mul:k.mul}; P.inv=Math.max(P.inv,k.dur);
      g.fx.push({k:"worldslash",life:1.45,max:1.45}); g.pending.push({t:.45,run:()=>{ onScreenEnemies().forEach(e=>hurt(e,dmg)); g.fx.push({k:"flash",col:"#fff4c8",life:.4,max:.4}); g.shake=.6; sfx("bigboom") }}); for(let i=0;i<5;i++) g.pending.push({t:.55+i*.11,run:()=>{ sfx("multislash1"); onScreenEnemies().forEach(e=>hurt(e,dmg*.15)) }});
    }
    else if(k.type==="zone"){
      const tp=smartTargets(k.r,1).pts[0]; const x=tp?tp.x:P.x, y=tp?tp.y:P.y;
      g.zones.push({what:k.what,x,y,r:k.r,t:k.dur,max:k.dur,tick:k.tick,acc:0,dmg,slow:k.slow});
    }
    else if(k.type==="stream"){ g.stream={t:k.dur,rate:k.rate,acc:0,dmg} }
    else if(k.type==="marks"){
      const risky=surrounded(), byD=e=>(e.x-P.x)**2+(e.y-P.y)**2;
      (risky?onS.slice().sort((a,b)=>byD(a)-byD(b)):onS.slice().sort((a,b)=>(b.type==="boss"?2:b.elite?1:0)-(a.type==="boss"?2:a.elite?1:0)||Math.random()-.5)).slice(0,k.n).forEach(e=>{ e.mark=k.delay; e.markD=dmg });
    }
    else if(k.type==="flare"){ g.sum.push({kind:"flare",x:P.x,y:P.y,t:k.dur,max:k.dur,acc:0,rate:k.rate,dmg,a:0}) }
    else if(k.type==="turret"){ g.sum.push({kind:"octo",x:P.x+(Math.random()<.5?-70:70),y:P.y+34,t:k.dur,max:k.dur,acc:0,rate:k.rate,dmg}) }
    else if(k.type==="meteors"){
      g.fx.push({k:"skycircle",life:k.n*k.gap+1.3,max:k.n*k.gap+1.3}); const TG=smartTargets(k.r,k.n).pts;
      for(let i=0;i<k.n;i++){ const t=TG[i];
        const x=t?t.x+(Math.random()-.5)*40:P.x+(Math.random()-.5)*W*.8, y=t?t.y+(Math.random()-.5)*40:P.y+(Math.random()-.5)*H*.8, at=i*k.gap;
        g.fx.push({k:"warn",own:1,x,y,r:k.r,life:at+.45,max:at+.45}); g.fx.push({k:"meteor",x,y,life:at+.45,max:.45,start:at}); g.pending.push({t:at,run:()=>sfx("meteor")});
        g.pending.push({t:at+.45,run:()=>{ boomAt(x,y,k.r,dmg,"#ffd36a"); g.fx.push({k:"scorch",x,y,r:k.r,life:2,max:2}); g.shake=Math.max(g.shake,.25) }}) }
    }
    else if(k.type==="battleship"){
      const dir=Math.random()<.5?1:-1, life=3.2, sc=Math.min(1.4,Math.max(.9,W/800));
      g.fx.push({k:"ship",dir,life,max:life}); g.fx.push({k:"flash",col:"#6ad0ff",life:.3,max:.3});
      g.pending.push({t:SHIP_T0,run:()=>{ g.shake=Math.max(g.shake,.35) }});
      const PT=shipPath(dir,W,H), ang=Math.atan2(PT.ey-PT.sy,PT.ex-PT.sx), toS=(x,y)=>[x-P.x+W/2,y-P.y+H/2];
      const passT=(x,y)=>{ const [sx,sy]=toS(x,y); const u=((sx-PT.sx)*Math.cos(ang)+(sy-PT.sy)*Math.sin(ang))/Math.hypot(PT.ex-PT.sx,PT.ey-PT.sy); return SHIP_T0+SHIP_DUR*Math.max(0,Math.min(1,u)) };
      // 지나가는 길의 몬스터를 들이받아요
      onS.forEach(e=>{ const [sx,sy]=toS(e.x,e.y), d=Math.abs(-(sx-PT.sx)*Math.sin(ang)+(sy-PT.sy)*Math.cos(ang)); if(d<110*sc) g.pending.push({t:passT(e.x,e.y),run:()=>{ if(e.hp>0){ hurt(e,dmg*.6); if(e.type!=="boss"){ e.x+=Math.cos(ang)*60; e.y+=Math.sin(ang)*60 } } }}) });
      // 지나가며 대포알을 쏟아부어요
      const TG=smartTargets(k.r,k.n).pts;
      for(let i=0;i<k.n;i++){ const t=TG[i];
        const x=t?t.x+(Math.random()-.5)*30:P.x+(Math.random()-.5)*W, y=t?t.y+(Math.random()-.5)*30:P.y+(Math.random()-.5)*H, at=passT(x,y)+.25+Math.random()*.15;
        g.fx.push({k:"warn",own:1,x,y,r:k.r,life:at,max:at});
        g.pending.push({t:at-.3,run:()=>{ sfx("cannon"); const sp=shipPos({dir},at-.3,W,H); g.fx.push({k:"shell",x,y,x0:sp.x+P.x-W/2,y0:sp.y+P.y-H/2+20,life:.3,max:.3}) }});
        g.pending.push({t:at,run:()=>{ boomAt(x,y,k.r,dmg,"#ff8a2a"); g.shake=Math.max(g.shake,.18) }}) }
    }
  }
  function updateSkills(dt){
    const s=st(), P=g.p;
    for(const k of ACT){ k.t-=dt; if(k.t<=0){ k.t=k.cd*Math.max(.6,s.cd); cast(k) } }
    if(g.buff){ g.buff.t-=dt; if(g.buff.t<=0) g.buff=null }
    // 장판
    for(const z of g.zones){ z.t-=dt; z.acc-=dt;
      if(z.acc<=0){ z.acc=z.tick; g.en.forEach(e=>{ if(inR(z.x,z.y,z.r,e)){ hurt(e,z.dmg); if(z.slow) e.slow=Math.max(e.slow,.6) } }) } }
    g.zones=g.zones.filter(z=>z.t>0);
    // 폭풍 연사
    if(g.stream){ g.stream.t-=dt; g.stream.acc-=dt;
      g.stream.re=(g.stream.re||0)-dt; if(g.stream.re<=0){ g.stream.re=.4; g.stream.tg=smartTargets(140,1).pts[0]||null }
      while(g.stream.acc<=0){ g.stream.acc+=g.stream.rate; const t=g.stream.tg||near(P.x,P.y,1)[0];
        const a=t?Math.atan2(t.y-P.y,t.x-P.x):(g.stream.a||0), j=(Math.random()-.5)*.12; g.stream.a=a;
        g.shots.push({k:"arrow",x:P.x,y:P.y,vx:Math.cos(a+j)*900,vy:Math.sin(a+j)*900,dmg:g.stream.dmg,pierce:3+pierceAdd,life:.9,hit:new Set(),glow:true}) }
      if(g.stream.t<=0) g.stream=null }
    // 표식
    for(const e of g.en){ if(e.mark>0){ e.mark-=dt; if(e.mark<=0){ e.mark=0; sfx("markpop"); burstStars(e.x,e.y,8,e.markD); g.fx.push({k:"boom",x:e.x,y:e.y,r:50,col:"#9a6bff",life:.35,max:.35}); hurt(e,e.markD*2) } }
      if(F.poison && e.burn>0){ e.burn-=dt; e.bt=(e.bt||0)-dt; if(e.bt<=0){ e.bt=.5; hurt(e,e.burnD,true) } } }
    // 소환수
    for(const m of g.sum){
      if(m.t!==undefined) m.t-=dt;
      m.acc-=dt;
      if(m.kind==="phoenix"){ m.a+=dt*2.2; m.x=P.x+Math.cos(m.a)*62; m.y=P.y-30+Math.sin(m.a)*26;
        if(m.acc<=0){ const t=near(m.x,m.y,1)[0]; if(t){ sfx("phoenix"); m.acc=1*Math.max(.6,s.cd); const dx=t.x-m.x, dy=t.y-m.y, d=Math.hypot(dx,dy)||1;
          g.shots.push({k:"fire",x:m.x,y:m.y,vx:dx/d*520,vy:dy/d*520,dmg:m.dmg*lvScale,boom:45,pierce:0,life:1.2,hit:new Set()}) } } }
      else if(m.kind==="clone"){ const bx=P.x-26, by=P.y+6; m.x+=(bx-m.x)*Math.min(1,dt*6); m.y+=(by-m.y)*Math.min(1,dt*6) }
      else if(m.kind==="ifrit"){ // 곁을 따라다니며 불꽃 숨결 + 화염탄
        const hx=P.x+46, hy=P.y-34+Math.sin(g.t*2.5)*6; m.x+=(hx-m.x)*Math.min(1,dt*5); m.y+=(hy-m.y)*Math.min(1,dt*5); m.a+=dt*8;
        const t=near(m.x,m.y,1)[0]; m.face=t?Math.atan2(t.y-m.y,t.x-m.x):(m.face||0);
        m.breath=Math.max(0,(m.breath||0)-dt);
        if(t && (t.x-m.x)**2+(t.y-m.y)**2<300**2){
          if(m.acc<=0){ m.acc=.25; m.breath=.25; const R=170, half=.45;
            g.en.forEach(e=>{ const dx=e.x-m.x, dy=e.y-m.y, d=Math.hypot(dx,dy); if(d<R+e.r){ let a=Math.atan2(dy,dx)-m.face; a=Math.atan2(Math.sin(a),Math.cos(a)); if(Math.abs(a)<half) hurt(e,m.dmg*lvScale*.6) } }) }
          m.fb=(m.fb||0)-dt;
          if(m.fb<=0){ sfx("ifrit"); m.fb=1.6*Math.max(.6,s.cd); const dx=t.x-m.x, dy=t.y-m.y, d=Math.hypot(dx,dy)||1;
            g.shots.push({k:"fire",x:m.x,y:m.y,vx:dx/d*460,vy:dy/d*460,dmg:m.dmg*lvScale*2,boom:70,pierce:0,life:1.2,hit:new Set()}) } } }
      else if(m.kind==="crew"){ const bx=P.x+m.side*44, by=P.y+18; m.x+=(bx-m.x)*Math.min(1,dt*5); m.y+=(by-m.y)*Math.min(1,dt*5);
        m.fl=Math.max(0,(m.fl||0)-dt);
        if(m.acc<=0){ const t=near(m.x,m.y,1)[0]; if(t){ m.acc=.5*Math.max(.6,s.cd); const a=Math.atan2(t.y-m.y,t.x-m.x); m.aim=a; m.fl=.08; sfx("gun");
          g.shots.push({k:"bullet",x:m.x,y:m.y,vx:Math.cos(a)*760,vy:Math.sin(a)*760,dmg:m.dmg*lvScale,pierce:0,life:.7,hit:new Set()}); g.fx.push({k:"muzzle",x:m.x+Math.cos(a)*14,y:m.y+Math.sin(a)*14,life:.06,max:.06}) } } }
      else if(m.kind==="flare"){ m.a+=dt*5; m.x+=(P.x-m.x)*Math.min(1,dt*2); m.y+=(P.y-m.y)*Math.min(1,dt*2);
        if(m.acc<=0){ m.acc=m.rate; for(let i=0;i<3;i++){ const a=m.a+i*Math.PI*2/3; g.shots.push({k:"star",x:m.x,y:m.y,vx:Math.cos(a)*460,vy:Math.sin(a)*460,dmg:m.dmg,pierce:1,life:.9,hit:new Set(),dark:true}) } } }
      else if(m.kind==="octo"){
        m.fl=Math.max(0,(m.fl||0)-dt); { const t0=near(m.x,m.y,1)[0]; if(t0) m.aim=Math.atan2(t0.y-(m.y-36),t0.x-m.x) }
        if(m.acc<=0 && m.max-m.t>.35){ const t=near(m.x,m.y,1)[0]; if(t){ m.acc=m.rate; m.fl=.12; sfx("cannon"); const a=Math.atan2(t.y-(m.y-36),t.x-m.x);
          g.shots.push({k:"bullet",x:m.x+Math.cos(a)*28,y:m.y-36+Math.sin(a)*28,vx:Math.cos(a)*720,vy:Math.sin(a)*720,dmg:m.dmg,pierce:0,life:.8,hit:new Set(),ink:true}) } } }
    }
    g.sum=g.sum.filter(m=>m.t===undefined||m.t>0);
  }
  const TXTK={label:1,crit:1,num:1,bosscast:1};
  const CUTC={"warrior": ["#7a4a10", "#f6c544", "#fff2a0"], "archer": ["#0e5a3a", "#3fcf8e", "#c8ffe6"], "thief": ["#1a0a30", "#7a3ad0", "#e0c8ff"], "mage": ["#5a0e0e", "#e8502a", "#ffe0a0"], "pirate": ["#0e2a5a", "#3a8ad8", "#c8ecff"]};
  function drawSkillsUnder(){
    for(const z of g.zones){ const PF=HDFX&&PFX._ok3; if(z.what==="rain") (PF?pfxRain(ctx,z,g.t):jfRain(ctx,z,g.t,GLOW)); else (PF?pfxMist(ctx,z,g.t):jfMist(ctx,z,g.t,GLOW)) }
    if(g.buff) jfAwakenAura(ctx,g.p.x,g.p.y,g.t,Math.min(1,g.buff.t/.4),GLOW);
    if(g.stream){ const S=g.stream; if(S.va===undefined) S.va=S.a||0; let d=(S.a||0)-S.va; d=Math.atan2(Math.sin(d),Math.cos(d)); S.va+=d*.12; jfHurricane(ctx,g.p,g.t,Math.min(1,S.t/.3),GLOW,S.va) }
    for(const f of g.fx) if(f.k==="scorch") jfScorch(ctx,f,f.life/f.max,GLOW);
  }
  function drawSkillsOver(){
    const P=g.p;
    if(F.combo && g.combo>0) jfCombo(ctx,P,g.combo,g.t,GLOW);
    for(const e of g.en){ if(Math.abs(e.x-P.x)>W/2+40||Math.abs(e.y-P.y)>H/2+40) continue;
      if(e.mark>0) jfMark(ctx,e,g.t,GLOW);
      if(e.burn>0) jfBurn(ctx,e,g.t) }
    for(const m of g.sum){
      if(m.kind==="phoenix"){ if(SKILL_IMG.phoenix){ const dir=-Math.sin(m.a)>=0?1:-1, fl=Math.sin(g.t*11);   // 불사조: 날갯짓하며 빙글빙글
          ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,m.x,m.y,52,"255,140,50",.5);
          for(let i=0;i<8;i++){ const ph=(g.t*1.6+i/8)%1; ctx.fillStyle=`rgba(255,${180+70*(1-ph)|0},80,${1-ph})`; const z=4*(1-ph)+1; ctx.fillRect(m.x-dir*(14+ph*46)+Math.sin(i*3+g.t*5)*6-z/2,m.y+10+ph*12-z/2,z,z) } ctx.restore();
          ctx.save(); ctx.translate(m.x,m.y+Math.sin(g.t*5)*3); ctx.rotate(dir*.12); ctx.scale(1,1+fl*.1); drawSkillImg(ctx,"phoenix",86,dir<0); ctx.restore() } else jfPhoenix(ctx,m,g.t,GLOW) }
      else if(m.kind==="clone") jfClone(ctx,m,heroImg,g.t);
      else if(m.kind==="crew"){ if(!(HDFX&&drawCrewArt(ctx,m,g.t,GLOW))) jfCrew(ctx,m,g.t,GLOW) }
      else if(m.kind==="flare") jfFlare(ctx,m,g.t,GLOW);
      else if(m.kind==="octo"){ if(SKILL_IMG.octo){ const age=m.max-m.t, k=Math.min(1,m.t/.4), drop=age<.3?(1-age/.3):0, rec=Math.max(0,m.fl||0)/.12, right=Math.cos(m.aim||0)>0;
          ctx.save(); ctx.translate(m.x,m.y); ctx.globalAlpha=k; ctx.fillStyle="rgba(0,0,0,.25)"; ctx.beginPath(); ctx.ellipse(0,16,26,7,0,0,7); ctx.fill();
          if(age<.55&&age>.25){ const p=(age-.25)/.3; ctx.strokeStyle=`rgba(200,240,255,${1-p})`; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(0,14,20+p*50,(20+p*50)*.4,0,0,7); ctx.stroke() }
          const sq=1+Math.sin(g.t*4)*.03+rec*.08; ctx.translate((right?-1:1)*rec*5,-22-drop*160); ctx.scale(1/sq,sq); drawSkillImg(ctx,"octo",74,right); ctx.restore() } else jfOcto(ctx,m,g.t,GLOW) }
      else if(m.kind==="ifrit"){
        if(m.breath>0){ ctx.save(); ctx.globalCompositeOperation=GLOW; ctx.translate(m.x,m.y); ctx.rotate(m.face); const k=m.breath/.25;
          const gr=ctx.createRadialGradient(0,0,10,0,0,175); gr.addColorStop(0,`rgba(255,250,200,${.85*k})`); gr.addColorStop(.35,`rgba(255,170,60,${.7*k})`); gr.addColorStop(.75,`rgba(230,70,40,${.45*k})`); gr.addColorStop(1,"rgba(150,20,20,0)");
          ctx.fillStyle=gr; ctx.beginPath(); ctx.moveTo(0,0); for(let i=0;i<=12;i++){ const b=-.45+i*.075, rr=150+Math.sin(g.t*30+i*2)*18; ctx.lineTo(Math.cos(b)*rr,Math.sin(b)*rr) } ctx.closePath(); ctx.fill();
          for(let i=0;i<8;i++){ const ph=(g.t*4+i/8)%1, b=(jr(i,7)-.5)*.8; ctx.fillStyle=`rgba(255,240,170,${1-ph})`; ctx.fillRect(Math.cos(b)*ph*170-2,Math.sin(b)*ph*170-2,4,4) } ctx.restore() }
        ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,m.x,m.y,56,"255,120,40",.5);
        for(let i=0;i<8;i++){ const ph=(g.t*1.3+i/8)%1; ctx.fillStyle=`rgba(255,${200-ph*100|0},80,${1-ph})`; ctx.fillRect(m.x+Math.sin(i*2.3+g.t*3)*16-2,m.y+10-ph*60-2,4,4) } ctx.restore();
        if(SKILL_IMG.ifrit){ const right=Math.cos(m.face||0)>=0, fl=Math.sin(g.t*9);   // 이프리트: 불꽃이 일렁이며 둥실
          ctx.save(); ctx.translate(m.x,m.y-4); ctx.scale(1+fl*.025,1-fl*.03+(m.breath>0?.05:0)); drawSkillImg(ctx,"ifrit",92,right); ctx.restore() }
        else {
        ctx.save(); ctx.translate(m.x,m.y); const fl=Math.sin(m.a)*3;
        const tg=ctx.createLinearGradient(0,10,0,46); tg.addColorStop(0,"#ff6a3c"); tg.addColorStop(1,"rgba(200,30,40,0)"); ctx.fillStyle=tg; ctx.beginPath(); ctx.moveTo(-14,10); ctx.quadraticCurveTo(-6,40+fl,4,46); ctx.quadraticCurveTo(10,30,14,10); ctx.fill();
        const bg=ctx.createRadialGradient(-4,0,2,0,6,20); bg.addColorStop(0,"#ffd36a"); bg.addColorStop(.6,"#ff6a3c"); bg.addColorStop(1,"#a8281e"); ctx.fillStyle=bg; ctx.beginPath(); ctx.ellipse(0,6,18,16,0,0,7); ctx.fill();
        ctx.fillStyle="#3a1410"; ctx.beginPath(); ctx.moveTo(-12,-14); ctx.quadraticCurveTo(-28,-24,-22,-40); ctx.quadraticCurveTo(-18,-26,-6,-20); ctx.fill(); ctx.beginPath(); ctx.moveTo(12,-14); ctx.quadraticCurveTo(28,-24,22,-40); ctx.quadraticCurveTo(18,-26,6,-20); ctx.fill();
        const hg=ctx.createRadialGradient(-4,-16,2,0,-12,15); hg.addColorStop(0,"#ffe08a"); hg.addColorStop(1,"#e8502a"); ctx.fillStyle=hg; ctx.beginPath(); ctx.arc(0,-12,14,0,7); ctx.fill();
        ctx.fillStyle="#ffd36a"; for(let i=-2;i<=2;i++){ ctx.beginPath(); ctx.moveTo(i*6-4,-22); ctx.lineTo(i*6,-36-Math.abs(fl)*(2-Math.abs(i))); ctx.lineTo(i*6+4,-22); ctx.fill() }
        ctx.fillStyle="#fffbe0"; ctx.fillRect(-9,-15,6,3); ctx.fillRect(3,-15,6,3); ctx.fillStyle="#3a1410"; ctx.fillRect(-4,-6,8,2);
        ctx.fillStyle="#ff6a3c"; ctx.beginPath(); ctx.ellipse(-18,8,6,10,.5,0,7); ctx.fill(); ctx.beginPath(); ctx.ellipse(18,8,6,10,-.5,0,7); ctx.fill();
        ctx.globalCompositeOperation=GLOW; jGlow(ctx,22,14,14+Math.abs(fl)*2,"255,230,140",.9); ctx.restore() }
        }
    }
  }
  function drawSkillFx(f,k){
    if(f.k==="bigslash"){ jfBigSlash(ctx,f,k,GLOW); return true }
    if(f.k==="quake"){ jfQuake(ctx,f,k,GLOW,g.t); return true }
    if(f.k==="meteor"){ jfMeteor(ctx,f,k,GLOW,g.t); return true }
    if(f.k==="scorch") return true;
    if(f.k==="shell"){ jfShell(ctx,f,k,GLOW,g.t); return true }
    if(f.k==="boom"){ if(!(HDFX&&PFX._ok3&&pfxBoom(ctx,f,k))) jfBoom(ctx,f,k,GLOW); return true }
    if(f.k==="warn"){ jfWarn(ctx,f,k,g.t); return true }
    if(f.k==="safe"){ const p=1-k; ctx.save(); ctx.globalCompositeOperation=GLOW; const gg=ctx.createRadialGradient(f.x,f.y,f.r*.2,f.x,f.y,f.r); gg.addColorStop(0,"rgba(255,245,200,.35)"); gg.addColorStop(1,"rgba(255,230,150,.1)"); ctx.fillStyle=gg; ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,7); ctx.fill();
      ctx.strokeStyle=`rgba(255,240,170,${.6+.4*Math.sin(g.t*12)})`; ctx.lineWidth=5; ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,7); ctx.stroke(); ctx.lineWidth=2; ctx.beginPath(); ctx.arc(f.x,f.y,f.r*(1-p*.15),0,Math.PI*2*k); ctx.stroke(); ctx.restore();
      ctx.fillStyle=`rgba(120,60,200,${.12*p})`; ctx.fillRect(f.x-2000,f.y-2000,4000,4000); return true }
    if(f.k==="icicle"){ const p=1-k, y=f.y-280*(1-Math.min(1,p*1.15)); ctx.fillStyle="#e8f8ff"; ctx.strokeStyle="#5a9ad0"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(f.x-10,y-60); ctx.lineTo(f.x+10,y-60); ctx.lineTo(f.x,y); ctx.closePath(); ctx.fill(); ctx.stroke(); return true }
    if(f.k==="blackhole"){ const p=1-k; ctx.save(); ctx.globalCompositeOperation=GLOW; for(let i=0;i<3;i++){ ctx.strokeStyle=`rgba(${i===1?"255,120,220":"150,100,255"},.5)`; ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(f.x,f.y,f.r*(.35+i*.2)*(1-p*.3),f.r*(.15+i*.08)*(1-p*.3),0,-g.t*4+i,-g.t*4+i+4); ctx.stroke() }
      for(let i=0;i<24;i++){ const ph=(g.t*.9+i/24)%1, a=i*2.4-g.t*3, R=f.r*(1-ph); ctx.fillStyle=`rgba(230,210,255,${ph})`; ctx.fillRect(f.x+Math.cos(a)*R-2,f.y+Math.sin(a)*R*.5-2,4,4) } ctx.restore();
      ctx.fillStyle="#03010a"; ctx.beginPath(); ctx.arc(f.x,f.y,30+p*20,0,7); ctx.fill(); ctx.strokeStyle="#ffc870"; ctx.lineWidth=3; ctx.stroke(); return true }
    if(f.k==="slash"){ const q=1-k, R=f.r*(1.0-k*.15); ctx.save(); ctx.globalCompositeOperation=GLOW;
      jfCrescent(ctx,f.x,f.y,R,f.a-f.arc/2,f.arc,.42,[[0,"rgba(255,200,90,0)"],[.55,"rgba(255,210,110,A)"],[.9,"rgba(255,250,225,A)"],[1,"rgba(255,255,255,A)"]],k);
      ctx.strokeStyle=`rgba(255,255,255,${k})`; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(f.x,f.y,R*.99,f.a-f.arc/2+.08,f.a+f.arc/2-.08); ctx.stroke();
      for(let i=0;i<4;i++){ const b=f.a+(i/3-.5)*f.arc, d=R*(1+q*.35); ctx.fillStyle="#fff4c8"; ctx.fillRect(f.x+Math.cos(b)*d-2,f.y+Math.sin(b)*d-2,3,3) } ctx.restore(); return true }
    return false
  }
  /* 오리진 연출: 어두워짐 → 금빛 마법진 → 하늘에서 빛기둥 → 하얀 폭발과 충격파 */
  function drawOrigin(f,k){ const p=1-k, cx=W/2, cy=H/2, R=Math.hypot(W,H)/2, rnd=i=>{ const x=Math.sin(f.seed+i*12.9898)*43758.5453; return x-Math.floor(x) };
    ctx.save();
    ctx.fillStyle=`rgba(10,6,20,${Math.min(.55,p*2)*(k>.15?1:k/.15)})`; ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation=GLOW;
    // 마법진
    const cr=Math.min(W,H)*(.18+Math.min(1,p*2.2)*.3), rot=p*3;
    ctx.globalAlpha=Math.min(1,k*2.5); ctx.strokeStyle=f.c2; ctx.lineWidth=4;
    for(const m of [1,.78,.56]){ ctx.beginPath(); ctx.arc(cx,cy,cr*m,0,7); ctx.stroke() }
    ctx.lineWidth=2.5; for(let i=0;i<12;i++){ const a=rot+i*Math.PI/6; ctx.beginPath(); ctx.moveTo(cx+Math.cos(a)*cr*.56,cy+Math.sin(a)*cr*.56); ctx.lineTo(cx+Math.cos(a+.9)*cr,cy+Math.sin(a+.9)*cr); ctx.stroke() }
    for(let i=0;i<6;i++){ const a=-rot*1.4+i*Math.PI/3; ctx.beginPath(); ctx.moveTo(cx+Math.cos(a)*cr*.78,cy+Math.sin(a)*cr*.78); ctx.lineTo(cx+Math.cos(a+2.09)*cr*.78,cy+Math.sin(a+2.09)*cr*.78); ctx.stroke() }
    ctx.globalAlpha=1;
    // 빛기둥
    if(p>.25){ const q=Math.min(1,(p-.25)/.2), fade=Math.min(1,k*3);
      for(let i=0;i<14;i++){ const x=rnd(i)*W, w=18+rnd(i+40)*40, y1=H*q; const gr=ctx.createLinearGradient(x,0,x,y1); gr.addColorStop(0,"rgba(255,255,255,0)"); gr.addColorStop(.7,f.c1); gr.addColorStop(1,"#ffffff");
        ctx.globalAlpha=.75*fade; ctx.fillStyle=gr; ctx.fillRect(x-w/2,0,w,y1);
        if(q>=1){ ctx.globalAlpha=.6*fade; ctx.fillStyle=f.c2; ctx.beginPath(); ctx.ellipse(x,rnd(i+80)*H,w*1.6,w*.6,0,0,7); ctx.fill() } } }
    // 충격파
    if(p>.33){ const q=(p-.33)/.67; for(let j=0;j<3;j++){ const t=q*1.4-j*.18; if(t<=0||t>1) continue; ctx.globalAlpha=(1-t)*.9; ctx.strokeStyle=j===0?"#ffffff":f.c2; ctx.lineWidth=18*(1-t)+3; ctx.beginPath(); ctx.arc(cx,cy,R*t,0,7); ctx.stroke() } }
    ctx.restore() }
  /* 돌풍: 예고하는 동안 큰 화살표가 깜빡이고, 부는 동안 바람 줄기가 휙휙 */
  function drawGust(){ const G=g.gust; if(!G) return; const ca=Math.cos(G.a), sa=Math.sin(G.a);
    ctx.save(); ctx.translate(W/2,H/2); ctx.rotate(G.a);
    if(G.w>0){ const bl=.45+.35*Math.sin(g.t*14); ctx.fillStyle=`rgba(220,245,255,${bl})`; ctx.strokeStyle=`rgba(20,60,100,${bl})`; ctx.lineWidth=4;
      for(let k=-1;k<=1;k++){ ctx.save(); ctx.translate(k*W*.28,k===0?0:(k*60)); ctx.beginPath(); ctx.moveTo(-90,-26); ctx.lineTo(30,-26); ctx.lineTo(30,-62); ctx.lineTo(110,0); ctx.lineTo(30,62); ctx.lineTo(30,26); ctx.lineTo(-90,26); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore() } }
    else { ctx.globalCompositeOperation=GLOW; ctx.lineCap="round"; for(let i=0;i<30;i++){ const y=((i*97)%H)-H/2, x=((g.t*1400+i*263)%(W+600))-W/2-300; ctx.strokeStyle=`rgba(230,250,255,${.25+(i%3)*.12})`; ctx.lineWidth=2+(i%3); ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+120+(i%4)*40,y); ctx.stroke() } }
    ctx.restore() }
  function drawScreenFx(){
    drawGust();
    for(const f of g.fx){ const k=f.life/f.max;
      if(f.k==="ship") jfShip(ctx,f,k,W,H,g.t,GLOW);
      else if(f.k==="worldslash") jfWorldSlash(ctx,f,k,W,H,GLOW,g.t);
      else if(f.k==="skycircle") jfSkyCircle(ctx,f,k,W,H,g.t,GLOW);
      else if(f.k==="cutin") jfCutin(ctx,f,k,W,H,heroImg,g.t,GLOW);
      else if(f.k==="origin") drawOrigin(f,k);
    }
  }
  // 레벨업
  function options(){
    const keysAll = Object.keys(SK).filter(k=>lv(k)<MAXLV);
    const opts = shuffle(keysAll).slice(0,PK.cards);
    return opts;
  }
  function showCards(opts,msg){
    mcard.innerHTML = `<h3>레벨 ${g.lvl}! 기술을 골라요</h3>${msg?`<p>${msg}</p>`:""}<div class="gopts ${opts.length>3?"four":opts.length===1?"one":""}">${opts.map(k=>{const s=SK[k],l=lv(k)+1;
      return `<button class="gopt" data-k="${k}">${skImg(k,56)}<span class="gn">${s.name} ${l>1?`Lv ${l}`:"<em>새 기술</em>"}</span><span class="gnum">${skNum(k,l)}</span><span class="gd">${s.d(l)}</span></button>`}).join("")}</div>`;
    modal.hidden=false;
    mcard.querySelectorAll(".gopt").forEach(b=>b.onclick=()=>{ apply(b.dataset.k); modal.hidden=true; g.paused=false; last=performance.now(); });
  }
  /* ===== 공격 모션 ===== */
  function drawAtkUnder(x,y,q,a){ // 마법사: 발밑 마법진
    const k=Math.sin(q*Math.PI), r=30+18*q;
    ctx.save(); ctx.translate(x,y+18); ctx.scale(1,.4); ctx.rotate(g.t*3);
    ctx.strokeStyle=`rgba(255,138,42,${.9*k})`; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(0,0,r,0,7); ctx.stroke(); ctx.beginPath(); ctx.arc(0,0,r*.7,0,7); ctx.stroke();
    ctx.beginPath(); for(let i=0;i<6;i++){ const b=i*Math.PI/3; ctx.lineTo(Math.cos(b)*r*.7,Math.sin(b)*r*.7) } ctx.closePath(); ctx.stroke();
    ctx.fillStyle=`rgba(255,200,80,${.25*k})`; ctx.beginPath(); ctx.arc(0,0,r,0,7); ctx.fill(); ctx.restore();
    for(let i=0;i<5;i++){ const b=g.t*4+i*1.26, rr=r*(1-q); ctx.fillStyle=`rgba(255,224,102,${k})`; ctx.fillRect(x+Math.cos(b)*rr-2,y+18-q*30-i*4+Math.sin(b)*rr*.4-2,4,4) }
  }
  // 그림풍 발사체: 미리 그려 둔 그림을 날아가는 방향으로 돌려 붙여요 (꼬리 잔상 2개)
  function drawPainted(sh,a){ const k=sh.k, t=g.t;
    const trail=(key,n,gap,rot)=>{ for(let j=n;j>=1;j--) pfxDraw(ctx,key,sh.x-sh.vx*gap*j,sh.y-sh.vy*gap*j,rot,1-j*.12,.28/j) };
    if(k==="fire"){ const f="fire"+(Math.floor(t*14+sh.x*.01)&3); ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,sh.x,sh.y,30,"255,140,50",.55); ctx.restore(); pfxDraw(ctx,f,sh.x,sh.y,a,1); return true }
    if(k==="arrow"){ pfxDraw(ctx,"arrow"+(sh.glow?1:0),sh.x,sh.y,a,1); return true }
    if(k==="star"){ const key="star"+(sh.dark?1:0); trail(key,2,.012,t*22); if(sh.dark){ ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,sh.x,sh.y,20,"170,90,255",.45); ctx.restore() } pfxDraw(ctx,key,sh.x,sh.y,t*22,1); return true }
    if(k==="bullet"&&!sh.ink){ pfxDraw(ctx,"bullet",sh.x,sh.y,a,1); return true }
    if(k==="wind"){ trail("wind",2,.018,t*16); pfxDraw(ctx,"wind",sh.x,sh.y,t*16,1); return true }
    if(k==="ice"){ ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,sh.x,sh.y,18,"150,220,255",.45); ctx.restore(); trail("ice",2,.012,a); pfxDraw(ctx,"ice",sh.x,sh.y,a,1); return true }
    return false }
  function drawAtkOver(x,y,q,a,K){
    if(HDFX&&PFX._ok&&isHeroArt(heroImg.src)){   // 그림 용사: 무기는 그림 속에 있으니 휘두르는 빛만 그려요
      if(K==="sword"){ const dir=g.atk.flip?-1:1; pfxDraw(ctx,"slash",x+Math.cos(a)*22,y+Math.sin(a)*22+8,a+dir*(q-.5)*1.4,.9+q*.35,Math.min(1,(1-q)*1.8)); }
      else if(K==="gun"&&q<.4){ const f=1-q/.4; ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,x+Math.cos(a)*34,y+8+Math.sin(a)*34,18*f+6,"255,230,140",.9*f); ctx.restore() }
      else if(K==="fireball"&&q<.5){ ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,x+Math.cos(a)*26,y+Math.sin(a)*26,22*(1-q)+8,"255,150,50",.7); ctx.restore() }
      return }
    ctx.save(); ctx.lineCap="round"; ctx.lineJoin="round";
    if(K==="sword"){ // 큰 반달 베기: 칼날이 휙 돌아가요
      const dir=g.atk.flip?-1:1, sweep=2.6, a0=a-dir*sweep/2, cur=a0+dir*sweep*Math.min(1,q*1.4), L=56;
      ctx.strokeStyle=`rgba(255,244,176,${.7*(1-q)})`; ctx.lineWidth=18*(1-q)+4; ctx.beginPath();
      dir>0?ctx.arc(x,y,L*.8,a0,cur):ctx.arc(x,y,L*.8,cur,a0); ctx.stroke();
      ctx.translate(x,y); ctx.rotate(cur);
      ctx.fillStyle="#e9eef6"; ctx.beginPath(); ctx.moveTo(14,-4); ctx.lineTo(L,-3); ctx.lineTo(L+10,0); ctx.lineTo(L,3); ctx.lineTo(14,4); ctx.closePath(); ctx.fill();
      ctx.fillStyle="#ffffff"; ctx.fillRect(16,-3,L-18,2); ctx.strokeStyle="#25211b"; ctx.lineWidth=2; ctx.stroke();
      ctx.fillStyle="#f6c544"; ctx.fillRect(9,-9,5,18); ctx.fillStyle="#7a5230"; ctx.fillRect(0,-3,10,6) }
    else if(K==="arrow"){ // 활시위 당기기 → 놓기
      ctx.translate(x,y); ctx.rotate(a);
      const pull=q<.45?q/.45:0, vib=q>=.45?Math.sin((q-.45)*60)*(1-q)*4:0, bx=16;
      ctx.strokeStyle="#c49a3a"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(bx-4,-24); ctx.quadraticCurveTo(bx+12,0,bx-4,24); ctx.stroke();
      ctx.strokeStyle="#7a5a1a"; ctx.lineWidth=1.5; ctx.stroke();
      const sx=bx-4-pull*16+vib; ctx.strokeStyle="#f4f4f4"; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(bx-4,-24); ctx.lineTo(sx,0); ctx.lineTo(bx-4,24); ctx.stroke();
      if(q<.45){ ctx.strokeStyle="#7a5230"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(sx,0); ctx.lineTo(bx+20,0); ctx.stroke(); ctx.fillStyle="#dfe7f2"; ctx.beginPath(); ctx.moveTo(bx+28,0); ctx.lineTo(bx+19,-5); ctx.lineTo(bx+19,5); ctx.fill();
        ctx.fillStyle="#3fcf8e"; ctx.fillRect(sx-2,-4,5,3); ctx.fillRect(sx-2,1,5,3) }
      else { ctx.strokeStyle=`rgba(138,240,193,${1-q})`; ctx.lineWidth=3; for(let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(bx+20+i*10,-8+i*8); ctx.lineTo(bx+40+i*14,-8+i*8); ctx.stroke() } } }
    else if(K==="star"){ // 팔을 휘둘러 표창 던지기
      const dir=Math.cos(a)>=0?1:-1, sw=a-dir*1.6+dir*2.4*q;
      ctx.strokeStyle=`rgba(207,214,228,${.6*(1-q)})`; ctx.lineWidth=10*(1-q)+2; ctx.beginPath(); dir>0?ctx.arc(x,y,26,a-1.6,sw):ctx.arc(x,y,26,sw,a+1.6); ctx.stroke();
      const hx=x+Math.cos(sw)*26, hy=y+Math.sin(sw)*26;
      ctx.translate(hx,hy); ctx.rotate(g.t*25); ctx.fillStyle="#cfd6e4"; ctx.strokeStyle="#25211b"; ctx.lineWidth=2; ctx.beginPath();
      for(let i=0;i<8;i++){ const r=i%2?3:10, b=i*Math.PI/4; ctx.lineTo(Math.cos(b)*r,Math.sin(b)*r) } ctx.closePath(); ctx.fill(); ctx.stroke() }
    else if(K==="gun"){ // 총을 겨누고 쏘면 반동
      ctx.translate(x,y+4); ctx.rotate(a); const rec=Math.max(0,1-q*3); ctx.rotate(-Math.sign(Math.cos(a)||1)*rec*.35);
      ctx.fillStyle="#5a6075"; ctx.fillRect(12,-4,26,7); ctx.fillStyle="#8b93a6"; ctx.fillRect(12,-4,26,2); ctx.fillStyle="#a06a35"; ctx.fillRect(8,-2,8,12); ctx.fillStyle="#f6c544"; ctx.fillRect(18,3,4,4);
      ctx.strokeStyle="#25211b"; ctx.lineWidth=1.5; ctx.strokeRect(12,-4,26,7);
      if(q<.4){ const f=1-q/.4; ctx.fillStyle=`rgba(255,240,140,${f})`; ctx.beginPath(); ctx.moveTo(38,-1); ctx.lineTo(56+f*8,-10); ctx.lineTo(50,0); ctx.lineTo(58+f*8,10); ctx.closePath(); ctx.fill();
        ctx.fillStyle=`rgba(255,255,255,${f})`; ctx.beginPath(); ctx.arc(42,0,5,0,7); ctx.fill() }
      if(q>.3){ ctx.fillStyle=`rgba(220,220,220,${(1-q)*.6})`; ctx.beginPath(); ctx.arc(46+q*14,-8-q*10,5+q*6,0,7); ctx.fill() } }
    else if(K==="fireball"){ // 지팡이를 들어 불덩이 모으기
      ctx.translate(x,y); const lift=Math.sin(Math.min(1,q*1.6)*Math.PI/2); ctx.rotate(a*.35-1.2*lift*(Math.cos(a)>=0?1:-1)*.4);
      ctx.strokeStyle="#d6dbe6"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(0,10); ctx.lineTo(0,-30-lift*8); ctx.stroke();
      const r=6+10*Math.sin(Math.min(1,q*1.3)*Math.PI*.5)*(q<.85?1:(1-q)/.15);
      ctx.fillStyle="rgba(255,138,42,.35)"; ctx.beginPath(); ctx.arc(0,-36-lift*8,r*1.8,0,7); ctx.fill();
      ctx.fillStyle="#ff8a2a"; ctx.beginPath(); ctx.arc(0,-36-lift*8,r,0,7); ctx.fill(); ctx.fillStyle="#ffe066"; ctx.beginPath(); ctx.arc(0,-36-lift*8,r*.5,0,7); ctx.fill() }
    ctx.restore();
  }
  /* ===== 전직 스킬 강화 (보석 상자) ===== */
  const JMAX=3;
  function jobDesc(i){ const k=SKL[i];
    if(k.type==="passive") return "공격력 +10%";
    if(k.type==="summon") return k.what==="clone"?"분신 표창 피해 +35%":"소환수 피해 +35%";
    return `피해 +35% · 쿨타임 -12%${k.n?" · 개수 +1":""}` }
  function jobNum(i){ const k=SKL[i], L=g.jl[i]||0, P=Math.round, sc=st().dmg*lvScale;
    if(k.type==="passive") return `공격력 <b>×${st().dmg.toFixed(2)} → ×${(st().dmg*1.1).toFixed(2)}</b>`;
    if(k.type==="summon") return k.dmg?`소환수 피해 <b>${P(k.dmg*(1+.35*L)*sc)} → ${P(k.dmg*(1+.35*(L+1))*sc)}</b>`:`분신 피해 <b>×${(1+.35*L).toFixed(2)} → ×${(1+.35*(L+1)).toFixed(2)}</b>`;
    return `피해 <b>${P(k.dmg*(1+.35*L)*sc)} → ${P(k.dmg*(1+.35*(L+1))*sc)}</b> · ${(k.cd*(1-.12*L)).toFixed(1)}초 → ${(k.cd*(1-.12*(L+1))).toFixed(1)}초` }
  function jobUp(i){ sfx("pick"); const k=SKL[i], L=(g.jl[i]||0)+1; g.jl[i]=L;
    if(k.type==="passive") M.dmg*=1.1;
    else if(k.type==="summon"){ if(k.what==="clone") g.cloneMul=1+.35*L; else g.sum.forEach(m=>{ if(m.kind===k.what) m.dmg=(k.dmg||0)*(1+.35*L) }) }
    else { const a=ACT.find(x=>x.name===k.name); if(a){ a.dmg=(k.dmg||0)*(1+.35*L); a.cd=k.cd*(1-.12*L); if(k.n) a.n=k.n+L } }
    g.fx.push({k:"label",x:g.p.x,y:g.p.y-50,text:`${k.name} ${"★".repeat(L)} 강화!`,life:1.8,max:1.8}); stamp("강화!"); g.fx.push({k:"flash",col:"#c08bff",life:.4,max:.4}) }
  function openGemChest(){
    g.paused=true;
    const jobs=SKL.map((k,i)=>i).filter(i=>(g.jl[i]||0)<JMAX);
    const normal=shuffle(Object.keys(SK).filter(k=>lv(k)<MAXLV));
    const opts=[];
    if(jobs.length){ shuffle(jobs).slice(0,Math.random()<.3&&jobs.length>1?2:1).forEach(i=>opts.push({job:i})) } // 전직했다면 무조건 1개 이상 전직 스킬 강화
    while(opts.length<3 && normal.length) opts.push({sk:normal.shift()});
    if(!opts.length){ showBanner("보물상자! 체력을 채웠어요"); g.paused=false; return }
    shuffle(opts);
    mcard.className="gcard lvcard"; modal.classList.add("lvmodal");
    mcard.innerHTML=`<div class="lvhead"><div class="lvsub">◆ BOSS REWARD ◆</div><h3 class="lvbig gemt">보물상자!</h3>
      <div class="lvtip">${opts.some(o=>o.job!==undefined)?"✦ 전직 스킬 강화 카드가 나왔어요! 하나를 골라요 ✦":"✦ 보스를 물리친 상으로 기술 하나를 골라요 ✦"}</div>${coopNote()}</div>
      <div class="lvcards c${opts.length}">${opts.map((o,n)=>{
        if(o.job!==undefined){ const k=SKL[o.job], L=g.jl[o.job]||0;
          return `<div class="lvk ok job" style="--tc:${TIER_COLOR[o.job+1]}"><div class="lvic jobic"><img src="${SPRITE_URLS[HERO.id]}" alt="" style="width:60px;height:60px;image-rendering:pixelated"></div>
            <strong>${k.name}</strong><span class="lvtype lvjob">${TIER_NAME[o.job+1]} 스킬 강화 · ${"★".repeat(L)}${"☆".repeat(JMAX-L)} → ${"★".repeat(L+1)}</span>
            <span class="lvd">${jobDesc(o.job)}</span><span class="lvnum">${jobNum(o.job)}</span>
            <button class="lvpick" data-n="${n}">강화하기</button></div>` }
        const k=o.sk, sd=SK[k], l=lv(k)+1;
        return `<div class="lvk ok"><div class="lvic">${skImg(k,60)}</div><strong>${sd.name}</strong>
          <span class="lvtype ${sd.t==="w"?"lvact":"lvpas"}">${sd.t==="w"?(k==="main"?"기본 공격":"공격 기술"):"능력 강화"} · ${l>1?`Lv ${l}`:"새 기술"}</span>
          <span class="lvd">${sd.d(l)}</span><span class="lvnum">${skNum(k,l)}</span><button class="lvpick" data-n="${n}">선택하기</button></div>` }).join("")}</div>`;
    modal.hidden=false; sfx("win");
    mcard.querySelectorAll(".lvpick").forEach(b=>b.onclick=()=>{ const o=opts[+b.dataset.n]; if(o.job!==undefined) jobUp(o.job); else apply(o.sk);
      modal.hidden=true; modal.classList.remove("lvmodal"); mcard.className="gcard"; g.paused=false; last=performance.now() });
  }
  /* 보스 한자 결투: 보스가 나오면 한자 3문제! 맞힐 때마다 보스 체력이 크게 깎여요 */
  function duelHit(e){ const n=NM?nPlayers():1, pct=.09/(1+.5*(n-1));
    if(NM==="client"){ netOut.duel=(netOut.duel||[]); netOut.duel.push(e.id) }
    else if(e&&e.hp>0){ e.hp-=e.max*pct; e.flash=.2; if(e.hp<=0) kill(e) }
    if(e){ g.fx.push({k:"bolt",x:e.x,y:e.y,life:.45,max:.45}); g.fx.push({k:"boom",x:e.x,y:e.y,r:e.r*1.4,col:"#ffd36a",life:.5,max:.5}); g.fx.push({k:"num",x:e.x,y:e.y-e.r,v:"한자 번개!",crit:true,life:1,max:1}) } g.shake=Math.max(g.shake,.3) }
  /* 같이 하기: 고르는 동안 몬스터가 다른 친구에게 간다는 안내 */
  const coopNote=()=>NM?`<div class="lvtip coopNote">🛡 고르는 동안 몬스터는 다른 친구에게 가요 · 내 용사는 <b>무적</b>! 모두 고르는 중이면 몬스터도 멈춰요 (30초 안에 골라요)</div>`:"";
  /* ===== 오리진 스킬: 위기에 한자 2문제를 모두 맞히면 맵 전체 공격 =====
     혼자: 내가 2문제 · 같이 하기: 모두가 2문제를 다 맞혀야 발동 */
  const ORIGIN_NAME={warrior:"오리진 · 천검 낙하",archer:"오리진 · 천궁 유성우",thief:"오리진 · 그림자 만화경",mage:"오리진 · 한자 대폭발",pirate:"오리진 · 대해의 포효"};
  const oName=()=>ORIGIN_NAME[HERO.id]||"오리진 · 한자 해방";
  g.originNext=45; g.orig=null;
  function teamHp(){ const L=[]; if(!g.p.dead) L.push(Math.max(0,g.p.hp)/st().maxHp); for(const id in RP){ const r=RP[id]; if(!r.gone&&!r.dead&&r.st) L.push(r.st.hp/Math.max(1,r.st.mx)) } return L }
  function inDanger(){
    const T=teamPlayers(); if(!T.length) return false;
    const hp=teamHp(), avg=hp.reduce((a,b)=>a+b,0)/Math.max(1,hp.length), low=Math.min(...hp);
    let crowd=0; for(const e of g.en){ if(e.hp<=0) continue; for(const q of T){ if((e.x-q.x)**2+(e.y-q.y)**2<380*380){ crowd++; break } } }
    const someoneDown = NM && (g.p.dead || Object.values(RP).some(r=>!r.gone&&r.dead));
    return (avg<.4&&crowd>=14) || (low<.22&&crowd>=8) || (someoneDown&&avg<.6&&crowd>=12) }
  function originCheck(){
    if(g.t<g.originNext||g.orig||g.over) return;
    if(!NM && g.paused) return;
    if(!inDanger()) return;
    g.originNext=g.t+80;
    if(!NM){ originQuiz(0); return }
    const ids=[...(g.p.dead?[]:[NET.myId]), ...Object.keys(RP).filter(id=>!RP[id].gone&&!RP[id].dead)];
    if(!ids.length) return;
    g.orig={id:Math.random()*1e9|0, need:new Set(ids), res:{}, t0:performance.now()};
    hostEv.push({t:"oq",id:g.orig.id}); if(!g.p.dead) queueOrigin(g.orig.id) }
  /* 다른 창(레벨업 등)을 고르는 중이면 그 창을 닫은 뒤에 오리진 문제를 보여 줘요 */
  function queueOrigin(id){ if(g.paused) g.oriQ=id; else originQuiz(id) }
  function originQuiz(id){
    if(g.over) return;
    g.paused=true; sfx("bosscast"); g.shake=.4; g.fx.push({k:"flash",col:"#ffd36a",life:.5,max:.5});
    let i=0, ok=0; const qs=pickWeighted(QPOOL,2).map(c=>({c,q:makeQ(c,{short:true})}));
    const show=()=>{ const {c,q}=qs[i];
      mcard.className="gcard origin"; mcard.innerHTML=`<div class="oriHead">✦ ORIGIN ✦</div><h3>위기! ${esc(oName())}</h3>
        <p>${NM?"<b>모두가</b> 한자 2문제를 다 맞히면":"한자 2문제를 다 맞히면"} 맵 전체에 강력한 공격이 터져요! (${i+1} / 2)</p>
        ${q.big?`<div class="gq">${esc(q.big)}</div>`:""}<p style="font-family:var(--f-ui);font-size:21px;margin:0">${esc(q.q)}</p>
        <div class="gopts two">${q.opts.map((o,j)=>`<button class="gans ${o.hz?"hz":""}" data-j="${j}">${esc(o.text)}</button>`).join("")}</div><p class="gdh">${"✦".repeat(ok)}${"·".repeat(2-ok)}</p>`;
      modal.hidden=false;
      mcard.querySelectorAll(".gans").forEach(b=>b.onclick=()=>{ const r=q.opts[+b.dataset.j].ok; mcard.querySelectorAll(".gans").forEach(x=>{ x.disabled=true; if(q.opts[+x.dataset.j].ok) x.classList.add("ok") });
        g.qN++; trackAns(c,r);
        if(r){ ok++; g.qOk++; sfx("ok"); P.mastery[c.h]=(P.mastery[c.h]||0)+1; saveP() } else { b.classList.add("no"); sfx("no"); addWrong(c.h) }
        setTimeout(()=>{ i++; if(i<2) show(); else done(ok===2) },r?700:1300) }) };
    function done(all){
      if(!NM){ close(); if(all) castOrigin(); else originFail(0,1); return }
      if(NM==="client") netOut.or={id,ok:all}; else originRes(NET.myId,id,all);
      mcard.innerHTML=`<div class="oriHead">✦ ORIGIN ✦</div><h3>${all?"성공! 친구들을 기다려요":"아쉬워요…"}</h3><p>${all?"모두가 다 맞히면 오리진이 터져요!":"한 명이라도 틀리면 오리진이 발동하지 않아요. 친구들 결과를 기다려요."}</p><p class="gdh">⏳</p>`;
      originWait=setTimeout(close,32000) }
    function close(){ clearTimeout(originWait); if(!mcard.classList.contains("origin")) return; modal.hidden=true; mcard.className="gcard"; g.paused=false; last=performance.now() }
    originClose=close; show() }
  let originWait=0, originClose=()=>{};
  function originRes(from,id,ok){ const o=g.orig; if(!o||o.id!==id) return; o.res[from]=ok; originSettle() }
  function originSettle(force){ const o=g.orig; if(!o) return;
    for(const id of [...o.need]) if(id!==NET.myId && (!RP[id]||RP[id].gone)) o.need.delete(id);
    const all=[...o.need].every(id=>id in o.res);
    if(!all && !force) return;
    const okN=[...o.need].filter(id=>o.res[id]).length, success=all && okN===o.need.size;
    g.orig=null;
    if(success){ hostEv.push({t:"ofx"}); originClose(); castOrigin() } else { hostEv.push({t:"ofail",n:okN,of:o.need.size}); originClose(); originFail(okN,o.need.size) } }
  function originFail(n,of){ g.originNext=Math.min(g.originNext,g.t+40); sfx("no"); showBanner(NM?`오리진 실패… ${of}명 중 ${n}명만 다 맞혔어요. 다음 위기에 다시 도전!`:"오리진 실패… 다음 위기에 다시 도전해요!") }
  function castOrigin(){
    const C=CUTC[HERO.id]||CUTC.warrior;
    g.fx.push({k:"cutin",text:oName(),sub:"한자의 힘 · 오리진 스킬",c1:C[0],c2:C[1],c3:C[2],life:1.25,max:1.25}); sfx("cutin");
    g.fx.push({k:"origin",c1:C[1],c2:C[2],life:2.6,max:2.6,seed:Math.random()*99});
    g.pending.push({t:.9,run:()=>{ sfx("bigboom"); g.shake=1; g.fx.push({k:"flash",col:"#fff6d0",life:.6,max:.6});
      const P=g.p; P.inv=Math.max(P.inv,2.5); if(!P.dead) P.hp=Math.min(st().maxHp,P.hp+st().maxHp*.4);
      if(NM!=="client"){ const T=teamPlayers(); T.push(g.p);
        for(const e of g.en){ if(e.hp<=0) continue; if(!T.some(q=>Math.abs(e.x-q.x)<1300&&Math.abs(e.y-q.y)<1000)) continue;
          if(e.type==="boss"){ e.hp-=e.max*.25; e.flash=.3; if(e.hp<=0) kill(e) } else { e.hp=0; kill(e) } }
        g.eshots.length=0 }
      showBanner(`${oName()}! 화면의 몬스터를 쓸어버렸어요! 체력 회복 +40%`) }}) }
  function hanjaDuel(ref){ if(g.qskip){ return }   // 선생님: 한자 결투 건너뛰기
 if(g.over) return; const find=()=>NM==="client"?EN[ref.id]:ref, e0=find(); if(!e0||e0.hp<=0) return;
    g.paused=true; let i=0, hits=0; const qs=pickWeighted(QPOOL,3).map(c=>({c,q:makeQ(c,{short:true})}));
    const show=()=>{ const {c,q}=qs[i], e=find();
      mcard.className="gcard"; mcard.innerHTML=`<h3>⚡ 보스 한자 결투! ⚡</h3><p>${esc(e?e.name:"보스")}에게 한자의 힘을 보여 줘요! 맞힐 때마다 <b>한자 번개</b>가 떨어져요. (${i+1} / 3)</p>
        ${q.big?`<div class="gq">${esc(q.big)}</div>`:""}<p style="font-family:var(--f-ui);font-size:21px;margin:0">${esc(q.q)}</p>
        <div class="gopts two">${q.opts.map((o,j)=>`<button class="gans ${o.hz?"hz":""}" data-j="${j}">${esc(o.text)}</button>`).join("")}</div><p class="gdh">번개 ${"⚡".repeat(hits)}${"·".repeat(i-hits)}</p>`;
      modal.hidden=false;
      mcard.querySelectorAll(".gans").forEach(b=>b.onclick=()=>{ const ok=q.opts[+b.dataset.j].ok; mcard.querySelectorAll(".gans").forEach(x=>{ x.disabled=true; if(q.opts[+x.dataset.j].ok) x.classList.add("ok") });
        g.qN++; trackAns(c,ok);
        if(ok){ hits++; g.qOk++; sfx("ok"); P.mastery[c.h]=(P.mastery[c.h]||0)+1; saveP(); const e=find(); duelHit(e) } else { b.classList.add("no"); sfx("no"); addWrong(c.h) }
        setTimeout(()=>{ i++; if(i<3) show(); else { modal.hidden=true; g.paused=false; last=performance.now(); showBanner(hits?`한자 결투 ${hits}/3 성공! 보스에게 한자 번개 ${hits}번!`:"한자 결투 실패... 다음엔 꼭 맞혀요!"); if(hits===3){ stamp("결투<br>완승!"); sfx("win") } } },ok?800:1300) }) };
    sfx("bosscast"); show() }
  function levelUp(){
    g.paused=true; sfx("lvup");
    const all=Object.keys(SK).filter(k=>lv(k)<MAXLV);
    if(!all.length){ g.p.hp=Math.min(st().maxHp,g.p.hp+30); g.paused=false; return }
    const N=Math.min(all.length,PK.cards+QR.cards), cards=shuffle(all).slice(0,N);
    const used=new Set();
    const picks=pickWeighted(QPOOL,N);
    const qs=cards.map((_,i)=>{ const c=picks[i]||QPOOL[Math.random()*QPOOL.length|0]; used.add(c.h); return {c,q:makeQ(c,{short:true}),st:"ask"} });
    modal.classList.add("lvmodal");
    mcard.className="gcard lvcard";
    mcard.innerHTML = `<div class="lvhead"><div class="lvsub">★ LEVEL UP ★</div><h3 class="lvbig">LV.${g.lvl} 달성!</h3>
        <div class="lvtip">✦ 카드마다 한자 문제를 맞히면 그 기술을 고를 수 있어요 ✦</div>${coopNote()}</div>
      <div class="lvcards c${N}">${cards.map((k,i)=>{ const s=SK[k], l=lv(k)+1, Q=qs[i].q;
        return `<div class="lvk" data-i="${i}">
          <div class="lvic">${skImg(k,60)}</div>
          <strong>${s.name}</strong><span class="lvtype ${s.t==="w"?"lvact":"lvpas"}">${s.t==="w"?(k==="main"?"기본 공격":"공격 기술"):"능력 강화"} · ${l>1?`Lv ${l}`:"새 기술"}</span>
          <span class="lvd">${s.d(l)}</span>
          <span class="lvnum">${skNum(k,l)}</span>
          <div class="lvq"><span class="lvqt">📜 한자 문제 · ${esc(Q.tag)}</span>
            ${Q.big?`<b class="lvhz">${esc(Q.big)}</b>`:""}<span class="lvqq">${esc(Q.q)}</span>
            <div class="lvopts">${Q.opts.map((o,j)=>`<button class="lvo ${o.hz?"hz":""}" data-j="${j}">${esc(o.text)}</button>`).join("")}</div></div>
          <button class="lvpick" disabled>문제를 먼저 풀어요</button>
        </div>` }).join("")}</div>
      <div class="lvfoot"><span id="lvstat">맞힌 카드 0 / ${N}</span><button class="lvskip" id="lvskip" hidden>모두 틀렸어요 · 계속하기</button></div>`;
    modal.hidden=false;
    const els=[...mcard.querySelectorAll(".lvk")];
    const upd=()=>{ const ok=qs.filter(q=>q.st==="ok").length, done=qs.every(q=>q.st!=="ask");
      document.getElementById("lvstat").textContent=`맞힌 카드 ${ok} / ${N}${done?"":" · 남은 문제 "+qs.filter(q=>q.st==="ask").length}`;
      document.getElementById("lvskip").hidden=!(done&&ok===0) };
    els.forEach((el,i)=>{
      const Q=qs[i].q, btns=[...el.querySelectorAll(".lvo")], pick=el.querySelector(".lvpick");
      btns.forEach(b=>b.onclick=()=>{
        if(qs[i].st!=="ask") return;
        const ok=Q.opts[+b.dataset.j].ok; g.qN++;
        btns.forEach(x=>{ x.disabled=true; if(Q.opts[+x.dataset.j].ok) x.classList.add("ok") });
        trackAns(qs[i].c,!!ok); if(ok){ qs[i].st="ok"; g.qOk++; sfx("ok"); el.classList.add("ok"); P.mastery[qs[i].c.h]=(P.mastery[qs[i].c.h]||0)+1; saveP();
          g.p.hp=Math.min(st().maxHp,g.p.hp+st().maxHp*QR.heal); pick.disabled=false; pick.textContent="선택하기" }
        else { qs[i].st="no"; b.classList.add("no"); el.classList.add("no"); addWrong(qs[i].c.h); sfx("no"); pick.textContent=`정답: ${label(qs[i].c)}` }
        upd();
      });
      pick.onclick=()=>{ if(qs[i].st!=="ok") return; apply(cards[i]); close() };
    });
    document.getElementById("lvskip").onclick=()=>{ g.p.hp=Math.min(st().maxHp,g.p.hp+st().maxHp*.1); close() };
    if(g.qskip){ els.forEach((el,i)=>{ qs[i].st="ok"; el.classList.add("ok"); const pk=el.querySelector(".lvpick"); pk.disabled=false; pk.textContent="선택하기 (선생님)" }); upd() }   // 선생님: 문제 없이 바로 고르기
    function close(){ modal.hidden=true; modal.classList.remove("lvmodal"); mcard.className="gcard"; g.paused=false; last=performance.now() }
  }
  function apply(k){ sfx("pick"); const before=st(); g.sk[k]=lv(k)+1; if(k==="body") g.p.hp=Math.min(st().maxHp,g.p.hp+30); const after=st();
    const P=g.p, msg=k==="body"?`최대 체력 ${Math.round(before.maxHp)} → ${Math.round(after.maxHp)}`:k==="spd"?`이동 속도 ${Math.round(before.spd)} → ${Math.round(after.spd)}`
      :k==="str"?`공격력 ×${before.dmg.toFixed(2)} → ×${after.dmg.toFixed(2)}`:k==="qi"?`공격 속도 ${Math.round(100/before.cd)}% → ${Math.round(100/after.cd)}%`:k==="pull"?`줍는 거리 ${Math.round(before.mag)} → ${Math.round(after.mag)}`:`${skName(k)} Lv ${g.sk[k]}`;
    g.fx.push({k:"label",x:P.x,y:P.y-50,text:msg,life:1.6,max:1.6}); if(k==="body") g.fx.push({k:"num",x:P.x,y:P.y-30,v:30,me:true,life:.9,max:.9}) }
  // 기술 카드에 보이는 숫자
  function skNum(k,l){ const s=st(), sc=s.dmg, L=l, P=Math.round;
    if(k==="main"){ const K=HERO.main.kind, base={sword:22+9*L,arrow:14+5*L,star:8+3*L,gun:6+2.5*L,fireball:20+8*L}[K], cdv={sword:1-.06*L,arrow:.75-.04*L,star:.62-.035*L,gun:.3-.018*L,fireball:1.25-.06*L}[K];
      const cnt={sword:"",arrow:`${1+(L>=3?1:0)+(L>=5?1:0)}발`,star:`${2+Math.floor(L/2)+(F.lucky?1:0)}개`,gun:"",fireball:`${1+(L>=4?1:0)}개`}[K];
      return `피해 <b>${P(base*sc)}</b>${cnt?` × ${cnt}`:""} · ${(cdv*s.cd).toFixed(2)}초마다` }
    if(k==="wind") return `피해 <b>${P((10+4*L)*sc)}</b> × ${1+Math.floor((L-1)/2)}개 · ${(.85*s.cd).toFixed(2)}초마다`;
    if(k==="elec") return `피해 <b>${P((16+7*L)*sc)}</b> × ${L+1}곳 · ${((1.9-.18*L)*s.cd).toFixed(2)}초마다`;
    if(k==="fire") return `초당 피해 <b>${P((5+3*L)*sc*2)}</b> · 범위 ${55+12*L}`;
    if(k==="stone") return `피해 <b>${P((9+4*L)*sc)}</b> · 바위 ${1+L}개`;
    if(k==="ice") return `피해 <b>${P((6+3*L)*sc)}</b> × ${4+2*L}개 · 느리게 ${(1.6*M.slow).toFixed(1)}초`;
    if(k==="body") return `최대 체력 <b>${P(s.maxHp)} → ${P(s.maxHp+20)}</b> · 즉시 +30 회복`;
    if(k==="spd") return `이동 속도 <b>${P(s.spd)} → ${P(s.spd*(1+.1*(lv("spd")+1))/(1+.1*lv("spd")))}</b>`;
    if(k==="str") return `공격력 <b>×${s.dmg.toFixed(2)} → ×${(s.dmg/(1+.15*lv("str"))*(1+.15*(lv("str")+1))).toFixed(2)}</b>`;
    if(k==="qi"){ const nx=Math.max(.4,M.cd*(1-.09*(lv("qi")+1))); return `공격 속도 <b>${P(100/s.cd)}% → ${P(100/nx)}%</b>` }
    if(k==="pull") return `줍는 거리 <b>${P(s.mag)} → ${P(s.mag/(1+.4*lv("pull"))*(1+.4*(lv("pull")+1)))}</b>`;
    return "" }

  function pause(){
    if(g.over||g.paused) return;
    g.paused=true;
    mcard.innerHTML = `<h3>${NM?"친구와 같이 하는 중":"잠깐 멈춤"}</h3><p>${NM?"같이 할 때는 게임이 멈추지 않아요! 빨리 돌아가요.":`${fmtT(g.t)} 버티는 중 · 몬스터 ${g.kills}마리`}</p>
      <div class="gskills">${Object.keys(g.sk).map(k=>`<span>${skImg(k,22)}${skName(k)} · Lv ${g.sk[k]}</span>`).join("")}</div>
      <div class="gbtns"><button class="big green" id="gc">계속하기</button><button class="big alt" id="gq">그만하기</button></div>`;
    modal.hidden=false;
    $("#gc").onclick=()=>{modal.hidden=true;g.paused=false;last=performance.now()};
    $("#gq").onclick=()=>{ if(NM==="client"){ try{ NET.hostConn.send({t:"quit"}) }catch(e){} } if(NM==="host"){ endAll(false); return } finish(false) };
  }

  function die(){ sfx("die");
    if(g.revives>0){ g.revives--; g.paused=true; if(NM) g.p.dead=true; revive(); return }
    if(NM){ down(); return }
    finish(false);
  }
  function revive(){
    const src = QPOOL;
    const c = src[Math.random()*src.length|0];
    const opts = shuffle([c,...shuffle(UNIQUE.filter(x=>x.h!==c.h&&label(x)!==label(c))).slice(0,3)]);
    mcard.innerHTML = `<h3>앗, 쓰러졌어요!</h3><p>이 한자의 뜻과 소리를 맞히면 다시 일어나요.</p>
      <div class="gq">${esc(c.h)}</div><div class="gopts two">${opts.map((o,i)=>`<button class="gans" data-i="${i}">${esc(label(o))}</button>`).join("")}</div>`;
    modal.hidden=false;
    mcard.querySelectorAll(".gans").forEach(b=>b.onclick=()=>{
      const ok = opts[+b.dataset.i].h===c.h;
      mcard.querySelectorAll(".gans").forEach(x=>{x.disabled=true; if(opts[+x.dataset.i].h===c.h) x.classList.add("ok")});
      if(ok){
        stamp("부활!");
        sfx("revive"); setTimeout(()=>{ g.p.dead=false; g.p.hp=st().maxHp*.6; g.p.inv=2;
          g.en.forEach(e=>{const dx=e.x-g.p.x,dy=e.y-g.p.y,d=Math.hypot(dx,dy)||1; if(d<260){ if(e.type!=="boss") hurt(e,9999); else {e.x+=dx/d*200;e.y+=dy/d*200} }});
          g.fx.push({k:"ring",x:g.p.x,y:g.p.y,life:.6,max:.6});
          modal.hidden=true; g.paused=false; last=performance.now(); },900);
      } else { b.classList.add("no"); addWrong(c.h); setTimeout(()=>NM?down():finish(false),1500) }
    });
  }

  function finish(win){
    if(g.over) return; SND.setIntensity(0); if(NM==="host") NET.ing=new Set();
    g.over=true; g.paused=true;
    const best = P.best;
    const rec = {t:g.t,k:g.kills,win};
    const stars = win?4:Math.min(3,g.bossKills);
    P.stars=P.stars||{}; const prevStars=P.stars[MAP.id]||0; if(stars>prevStars) P.stars[MAP.id]=stars;
    P.cleared=P.cleared||{}; const firstClear = win && !P.cleared[MAP.id]; if(win) P.cleared[MAP.id]=1; saveP();
    const isBest = stars>prevStars || (win && (!best||!best.win||rec.t<best.t));
    if(isBest){ P.best=rec; saveP(); }
    const coop = NM?1.3:1;
    const gotExp = addExp(Math.round((g.kills*1 + Math.min(rec.t,480)/3 + (win?200:0) + g.bossKills*150)*MAP.exp*QR.exp*coop));
    const qCoin = rec.t>=60 ? QR.coin : 0;
    const sCoin=Math.round(gameCoins(MAP.id,stars)*coop*(QR.cm||1)), fCoin=firstClear?firstClearCoin(MAP.id):0, want=sCoin+qCoin+fCoin, gotCoin=earn(want);   // 하루 코인 한도까지만
    if(win) stamp("클리어!");
    mcard.innerHTML = `<h3>${win?`🏆 스테이지 클리어! ${MAP.name}`:"게임 끝"}</h3><p>${MAP.name} · ${MAP.diff} · 경험치 ×${MAP.exp}</p>
      <div class="gstars">${starStr(stars)}</div>${firstClear?`<p class="gbest">처음 클리어 보너스 +${fCoin} 코인!</p>`:""}
      <div class="gres"><div><b>${fmtT(rec.t)}</b><span>걸린 시간</span></div><div><b>${g.kills}</b><span>물리친 몬스터</span></div><div><b>${Math.min(4,g.bossKills)} / 4</b><span>물리친 보스</span></div></div>
      <p style="font-family:var(--f-ui);font-size:18px;color:#25211b">한자 퀴즈 ${g.qOk} / ${g.qN} 정답 · ${QR.label} (경험치 ×${QR.exp})</p>
      <div class="gcoin"><b>코인 +${gotCoin}</b>${gotCoin<want?`<span style="color:#c8372d">오늘 코인 한도(${DAILY_COIN_MAX})에 닿아서 ${want}개 중 ${gotCoin}개만 받았어요</span>`:""}<span>${NM?"협동 보너스 ×1.3 · ":""}별 ${stars}개 +${sCoin}${win?" (클리어 보너스 포함)":""}${(QR.cm||1)>1?` · 퀴즈 범위 ×${QR.cm}`:""}${qCoin?` · 퀴즈 범위 +${qCoin}`:""}${fCoin?` · 처음 클리어 +${fCoin}`:""}</span></div>
      ${isBest?`<p class="gbest">새 최고 기록이에요!</p>`:""}
      <p style="color:#2f6b55;font-family:var(--f-ui);font-size:20px">${HERO.name} 경험치 +${gotExp} · Lv ${HS(HERO.id).lv}</p>
      <div class="gskills">${Object.keys(g.sk).map(k=>`<span>${skImg(k,22)}${skName(k)}</span>`).join("")}</div>
      <div class="gbtns"><button class="big red" id="ga" ${(P.coins<GAME_COST||day().plays>=DAILY_PLAYS)?"disabled":""}>한 판 더 (코인 ${GAME_COST} · 남은 판 ${Math.max(0,DAILY_PLAYS-day().plays)})</button><button class="big alt" id="gx">공부하러 가기</button></div>`;
    modal.hidden=false;
    if(NM){ const ga=$("#ga"); ga.disabled=false; ga.textContent="친구들과 방으로 돌아가기"; ga.onclick=()=>{ cleanup(); gameLobby() } }
    else $("#ga").onclick=()=>{ if(payGame()){cleanup();startGame()} };
    $("#gx").onclick=()=>{ cleanup(); home() };
  }
  function cleanup(){
    cancelAnimationFrame(raf); window.removeEventListener("resize",resize);
    window.removeEventListener("keydown",kd); window.removeEventListener("keyup",ku);
    document.removeEventListener("visibilitychange",vis);
    document.body.style.overflow=""; root.remove(); SND.setIntensity(0); SND.bgm("home"); if(NM){ NET.onGame=null; NET.onDrop=null }
  }

  // 업데이트
  function update(dt){
    g.t+=dt; const s=st(), P=g.p, frozen=!!g.paused, out=frozen||!!P.dead;
    if(g.god){ P.hp=s.maxHp; P.dead=false }   // 선생님 무적
    patchArrs();

    for(const q of g.pending){ q.t-=dt; if(q.t<=0){ q.done=true; q.run() } } g.pending=g.pending.filter(q=>!q.done);
    g.shake=Math.max(0,g.shake-dt);
    if(NM && g.oriQ!=null && !g.paused && !g.p.dead){ const q=g.oriQ; g.oriQ=null; if(NM==="client"||(g.orig&&g.orig.id===q)) originQuiz(q) }
    if(NM!=="client"){ g.oriAcc=(g.oriAcc||0)+dt; if(g.oriAcc>.5){ g.oriAcc=0; originCheck(); if(g.orig&&performance.now()-g.orig.t0>30000) originSettle(true) } }

    { const ph=phaseOf(g.t); if(g.ph===undefined) g.ph=ph; if(ph!==g.ph){ g.ph=ph; g.phT=g.t; g.shake=.6; g.fx.push({k:"flash",col:ph>=2?"#9a6bff":"#ff8a2a",life:.7,max:.7}); stamp(ph>=3?"최종<br>결전!":`${ph+1}단계!`);
      if(NM!=="client") say(ph>=3?`최종 결전 · ${PH_NAME[MAP.id][2]}! 마지막 보스가 다가와요!`:`${ph+1}단계 · ${PH_NAME[MAP.id][ph]}! 몬스터가 ${ph===2?"훨씬 ":""}강해졌어요!`,"enrage") } }
    if(frozen && (!NM || choosing(P))) P.inv=Math.max(P.inv,.3);
    if(P.dead){ const near=Object.values(RP).some(r=>!r.gone&&!r.dead&&(r.x-P.x)**2+(r.y-P.y)**2<85*85);
      g.rescue=Math.max(0,(g.rescue||0)+(near?dt:-dt*.5));
      if(g.rescue>=RESCUE){ P.dead=false; P.hp=s.maxHp*.5; P.inv=2; g.rescue=0; sfx("revive"); stamp("부활!"); showBanner("친구 덕분에 다시 일어났어요!"); g.fx.push({k:"ring",x:P.x,y:P.y,life:.6,max:.6}) } }
    // 이동
    let mx=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0), my=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);
    if(joy.on){ const dx=joy.x-joy.ox, dy=joy.y-joy.oy, d=Math.hypot(dx,dy); if(d>6){ const k=Math.min(1,d/50); mx=dx/d*k; my=dy/d*k } }
    if(out){ mx=0; my=0 }
    const ml=Math.hypot(mx,my); if(ml>1){mx/=ml;my/=ml}
    P.vx=mx*s.spd; P.vy=my*s.spd; P.mv=Math.hypot(mx,my); if(mx>.15) P.face=1; else if(mx<-.15) P.face=-1;
    if(P.mv>.1){ const prev=g.walk||0; g.walk=prev+dt*14*Math.min(1.4,s.spd/165); if(Math.floor(prev/Math.PI)!==Math.floor(g.walk/Math.PI)) g.fx.push({k:"dust",x:P.x-mx*10,y:P.y+20,life:.4,max:.4}) } else g.walk=0;
    P.x+=mx*s.spd*dt; P.y+=my*s.spd*dt; pushOut(MAP,P,P.r);
    const HZ=!out&&MAP.id===6?hazardAt(MAP,P.x,P.y,g.t):null;
    if(HZ&&HZ.kind==="tornado"){ const dx=P.x-HZ.x, dy=P.y-HZ.y, d=HZ.d||1; P.x+=dx/d*360*dt; P.y+=dy/d*360*dt; P.hp-=30*dt; g.lavaT=(g.lavaT||0)-dt;
      if(g.lavaT<=0){ g.lavaT=.35; sfx("hurt"); g.fx.push({k:"num",x:P.x,y:P.y-40,v:-10,me:true,life:.6,max:.6}); g.shake=Math.max(g.shake,.12) }
      if(!g.lavaMsg||g.t-g.lavaMsg>8){ g.lavaMsg=g.t; showBanner("회오리에 닿으면 튕겨 나가며 다쳐요! 피해서 움직여요!") } }
    if(g.bh){ g.bh.t-=dt; if(!out){ const dx=g.bh.x-P.x, dy=g.bh.y-P.y, d=Math.hypot(dx,dy)||1; if(d<g.bh.r){ const k=g.bh.pow*(1-d/g.bh.r*.6); P.x+=dx/d*k*dt; P.y+=dy/d*k*dt } } if(g.bh.t<=0) g.bh=null }
    // 맵 바닥 위험: 빙판(미끄러짐) · 중력 우물(끌려감, 가운데는 아파요)
    { const HZ2=!out&&(MAP.id===8||MAP.id===10)?hazardAt(MAP,P.x,P.y,g.t):null;
      if(HZ2&&HZ2.kind==="ice"){ g.slide={vx:(g.slide?g.slide.vx:0)*.9+P.vx*.1, vy:(g.slide?g.slide.vy:0)*.9+P.vy*.1}; P.x+=g.slide.vx*.55*dt; P.y+=g.slide.vy*.55*dt; if(!g.iceMsg){ g.iceMsg=1; showBanner("빙판이에요! 미끄러지니 조심해요!") } }
      else if(g.slide){ g.slide.vx*=.85; g.slide.vy*=.85; P.x+=g.slide.vx*.4*dt; P.y+=g.slide.vy*.4*dt; if(Math.hypot(g.slide.vx,g.slide.vy)<5) g.slide=null }
      if(HZ2&&HZ2.kind==="grav"){ const dx=HZ2.x-P.x, dy=HZ2.y-P.y, d=HZ2.d||1; P.x+=dx/d*120*dt; P.y+=dy/d*120*dt;
        if(HZ2.core){ P.hp-=28*dt; g.lavaT=(g.lavaT||0)-dt; if(g.lavaT<=0){ g.lavaT=.35; sfx("hurt"); g.fx.push({k:"num",x:P.x,y:P.y-40,v:-10,me:true,life:.6,max:.6}) } }
        if(!g.gravMsg||g.t-g.gravMsg>8){ g.gravMsg=g.t; showBanner("중력 우물이 끌어당겨요! 가운데로 빠지면 아파요!") } } }
    if(g.gust){ const G=g.gust; G.w-=dt; if(G.w<=0){ G.d-=dt; if(!out){ P.x+=Math.cos(G.a)*250*dt; P.y+=Math.sin(G.a)*250*dt; pushOut(MAP,P,P.r) } if(G.d<=0) g.gust=null } }
    if(NM!=="client" && (MAP.id>=6)) skyHazardTick(dt);
    if(!out && inLava(MAP,P.x,P.y)){ P.hp-=34*dt; g.lavaT=(g.lavaT||0)-dt; if(g.lavaT<=0){ g.lavaT=.35; sfx("lava"); g.fx.push({k:"num",x:P.x,y:P.y-40,v:-12,me:true,life:.6,max:.6}); g.shake=Math.max(g.shake,.08) } if(!g.lavaMsg||g.t-g.lavaMsg>8){ g.lavaMsg=g.t; showBanner("앗 뜨거워! 용암 웅덩이에서 빨리 나와요!") } } P.inv=Math.max(0,P.inv-dt); if(M.regen) P.hp=Math.min(s.maxHp,P.hp+M.regen*dt);
    if(g.bbuff){ g.bbuff.t-=dt; P.hp=Math.min(s.maxHp,P.hp+(g.bbuff.regen||0)*dt); if(g.bbuff.t<=0) g.bbuff=null }
    // 생성
    if(NM!=="client"){
    const rate = (2.6 + g.t*.72/8)*(g.bossUp?.75:1)*MAP.spawn*(NM?1.15+CO.spawn*(nPlayers()-1):1);
    if(g.t>=g.nextCrisis){ g.nextCrisis=g.t+(34+Math.random()*10)*(NM?CO.crisis:1); crisis() }
    g.spawnAcc += rate*dt;
    while(g.spawnAcc>=1){ g.spawnAcc--; if(g.en.length<(NM?420:320)){ const r=Math.random(); spawnMob() } }
    stageTick();
    }
    // 보스 탄
    for(const b of g.eshots){ if(b.home!==undefined){ b.home-=dt; if(b.home<=0&&b.home>-2.5){ const a=Math.atan2(P.y-b.y,P.x-b.x), sp=210; b.vx+=(Math.cos(a)*sp-b.vx)*Math.min(1,dt*2.2); b.vy+=(Math.sin(a)*sp-b.vy)*Math.min(1,dt*2.2) } }
      b.x+=b.vx*dt; b.y+=b.vy*dt; b.life-=dt; if(!P.dead && (b.x-P.x)**2+(b.y-P.y)**2<(b.r+P.r)**2){ hitPlayer(b.dmg); b.life=0 } }
    g.eshots=g.eshots.filter(b=>b.life>0);
    // 적 이동
    if(NM==="client"){
      for(const e of g.en){ e.x+=(e.tx-e.x)*Math.min(1,dt*10); e.y+=(e.ty-e.y)*Math.min(1,dt*10); e.flash=Math.max(0,e.flash-dt); e.slow=Math.max(0,e.slow-dt); e.stoneCD=Math.max(0,e.stoneCD-dt);
        if(!P.dead && P.inv<=0 && (e.x-P.x)**2+(e.y-P.y)**2<(e.r+P.r)**2){ const cd=e.dmg*M.armor; P.hp-=cd; sfx("hurt"); g.fx.push({k:"num",x:P.x,y:P.y-40,v:-Math.round(cd),me:true,life:.8,max:.8}); g.shake=Math.max(g.shake,.1); P.inv=.45; g.fx.push({k:"hit",x:P.x,y:P.y,life:.2,max:.2}) } }
    } else {
    for(const e of g.en){
      const T=NM?nearestPlayer(e.x,e.y):P, dx=T.x-e.x, dy=T.y-e.y, d=Math.hypot(dx,dy)||1, dP=NM?Math.hypot(P.x-e.x,P.y-e.y):d;
      const sp=e.stun>0?0:e.sp*(e.slow>0?.45:1)*(e.rage>0?1.5:1); if(e.stun>0) e.stun-=dt; if(e.rage>0) e.rage-=dt;
      if(e.rush&&e.rush.t>0&&!(e.stun>0)){ e.rush.t-=dt; e.x+=e.rush.vx*sp*dt; e.y+=e.rush.vy*sp*dt; if(!FLYERS[e.look]) pushOut(MAP,e,e.r*.85); if(dP<e.r+P.r && P.inv<=0) hitPlayer(e.dmg); continue }
      if(e.type==="boss"){ const cast=e.atk&&g.t-e.atk.t0<e.atk.wind+.35, tv=cast?.15:1, tx=dx/d*sp*tv, ty=dy/d*sp*tv, k=Math.min(1,dt*3.2);
        e.mvx=(e.mvx||0)+(tx-(e.mvx||0))*k; e.mvy=(e.mvy||0)+(ty-(e.mvy||0))*k; e.x+=e.mvx*dt; e.y+=e.mvy*dt; e.spd=Math.hypot(e.mvx,e.mvy)/Math.max(1,e.sp) }
      else { e.x+=dx/d*sp*dt; e.y+=dy/d*sp*dt; if(!FLYERS[e.look]) pushOut(MAP,e,e.r*.85) }
      e.slow=Math.max(0,e.slow-dt); e.flash=Math.max(0,e.flash-dt); e.stoneCD=Math.max(0,e.stoneCD-dt); if(e.type==="boss") bossAI(e,dt);
      if(d>Math.hypot(W,H)) { const a=Math.random()*Math.PI*2, R=Math.hypot(W,H)/2+40; e.x=T.x+Math.cos(a)*R; e.y=T.y+Math.sin(a)*R }
      if(dP<e.r+P.r && P.inv<=0 && !P.dead){ const cd=e.dmg*M.armor*(e.rage>0?1.5:1); P.hp-=cd; g.fx.push({k:"num",x:P.x,y:P.y-40,v:-Math.round(cd),me:true,life:.8,max:.8}); g.shake=Math.max(g.shake,.1); P.inv=.45; g.fx.push({k:"hit",x:P.x,y:P.y,life:.2,max:.2}) }
    }
    // 겹침 밀어내기
    const en=g.en;
    for(let i=0;i<en.length;i++){ const a=en[i];
      for(let j=i+1;j<en.length;j++){ const b=en[j]; const dx=b.x-a.x, dy=b.y-a.y, rr=a.r+b.r;
        if(dx>rr||dx<-rr||dy>rr||dy<-rr) continue;
        const d=Math.hypot(dx,dy)||.01; if(d<rr){ const push=(rr-d)/2, ux=dx/d, uy=dy/d; a.x-=ux*push; a.y-=uy*push; b.x+=ux*push; b.y+=uy*push } } }
    }
    if(P.hp<=0 && !P.dead && !frozen){ P.hp=0; die(); if(!NM) return }
    // 무기
    const cd=(k,base)=>{ g.cd[k]=(g.cd[k] ?? 0.3)-dt; if(g.cd[k]<=0){ g.cd[k]=base*s.cd; return true } return false };
    if(!out){
    // 전직 스킬
    updateSkills(dt);
    if(aura && cd("aura",.5)) g.en.forEach(e=>{ if((e.x-P.x)**2+(e.y-P.y)**2<(aura.r+e.r)**2) hurt(e,aura.dmg*lvScale) });
    // 직업 기본 공격
    if(lv("main")){
      const L=lv("main"), K=HERO.main.kind;
      const aim=t=>{ const dx=t.x-P.x, dy=t.y-P.y, d=Math.hypot(dx,dy)||1; return [dx/d,dy/d] };
      if(K==="sword" && cd("main",1.0-.06*L)){ g.atkT=g.t;
        const t=near(P.x,P.y,1)[0]; const ang=t?Math.atan2(t.y-P.y,t.x-P.x):(g.face||0); g.face=ang; (sfx(HERO.main.kind)),g.atk={t:g.t,a:ang,flip:!(g.atk&&g.atk.flip)};
        const R=80+10*L, arc=Math.PI*(.7+.08*L), dmg=22+9*L; let hitAny=false;
        g.en.forEach(e=>{ const dx=e.x-P.x, dy=e.y-P.y, d=Math.hypot(dx,dy);
          if(d<R+e.r){ let a=Math.atan2(dy,dx)-ang; a=Math.atan2(Math.sin(a),Math.cos(a));
            if(Math.abs(a)<arc/2 || d<P.r+e.r+10){ hurt(e,dmg); hitAny=true; if(e.type!=="boss"&&d>0){ e.x+=dx/d*28; e.y+=dy/d*28 } } } });
        if(F.combo && hitAny) g.combo=Math.min(5,g.combo+1);
        g.fx.push({k:"slash",x:P.x,y:P.y,a:ang,r:R,arc,life:.22,max:.22});
      }
      if(K==="arrow" && cd("main",.75-.04*L)){
        const n=1+(L>=3?1:0)+(L>=5?1:0), t0=near(P.x,P.y,1)[0]; if(t0) (sfx(HERO.main.kind)),g.atk={t:g.t,a:Math.atan2(t0.y-P.y,t0.x-P.x)};
        near(P.x,P.y,n).forEach(t=>{ const [ux,uy]=aim(t); g.qv=(g.qv||0)+1; const bomb=F.quiver&&g.qv%3===0;
          g.shots.push({k:"arrow",x:P.x,y:P.y,vx:ux*660,vy:uy*660,dmg:14+5*L,pierce:1+L+pierceAdd,life:1.4,hit:new Set(),boom:bomb?60:0,glow:bomb}) });
      }
      if(K==="star" && cd("main",.62-.035*L)){
        const n=2+Math.floor(L/2)+(F.lucky?1:0), clone=g.sum.find(m=>m.kind==="clone"), t0=near(P.x,P.y,1)[0]; if(t0) (sfx(HERO.main.kind)),g.atk={t:g.t,a:Math.atan2(t0.y-P.y,t0.x-P.x)};
        near(P.x,P.y,n).forEach(t=>{ const [ux,uy]=aim(t); g.shots.push({k:"star",x:P.x,y:P.y,vx:ux*520,vy:uy*520,dmg:8+3*L,pierce:L>=4?1:0,life:1.1,hit:new Set()});
          if(clone){ const dx=t.x-clone.x, dy=t.y-clone.y, d=Math.hypot(dx,dy)||1; g.shots.push({k:"star",x:clone.x,y:clone.y,vx:dx/d*520,vy:dy/d*520,dmg:(8+3*L)*.6*(g.cloneMul||1),pierce:0,life:1.1,hit:new Set(),dark:true}) } });
      }
      if(K==="gun" && cd("main",.3-.018*L)){
        const t=near(P.x,P.y,1)[0];
        if(t){ g.shotN=(g.shotN||0)+1; const a=Math.atan2(t.y-P.y,t.x-P.x); (sfx(HERO.main.kind)),g.atk={t:g.t,a};
          const spread = g.shotN%3===0 ? (L>=3?[-.3,-.15,0,.15,.3]:[-.18,0,.18]) : [0];
          const offs=F.double?[-5,5]:[0], nx=-Math.sin(a), ny=Math.cos(a);
          spread.forEach(o=>offs.forEach(q=>g.shots.push({k:"bullet",x:P.x+nx*q,y:P.y+ny*q,vx:Math.cos(a+o)*780,vy:Math.sin(a+o)*780,dmg:6+2.5*L,pierce:0,life:.7,hit:new Set()})));
          g.fx.push({k:"muzzle",x:P.x+Math.cos(a)*24,y:P.y+Math.sin(a)*24,life:.08,max:.08}); }
      }
      if(K==="fireball" && cd("main",1.25-.06*L)){
        const n=1+(L>=4?1:0), t0=near(P.x,P.y,1)[0]; if(t0) (sfx(HERO.main.kind)),g.atk={t:g.t,a:Math.atan2(t0.y-P.y,t0.x-P.x)};
        near(P.x,P.y,n).forEach(t=>{ const [ux,uy]=aim(t); g.shots.push({k:"fire",x:P.x,y:P.y,vx:ux*400,vy:uy*400,dmg:20+8*L,boom:55+11*L,pierce:0,life:1.5,hit:new Set()}) });
      }
    }
    if(lv("wind") && cd("wind", .85)){
      const L=lv("wind"), n=1+Math.floor((L-1)/2);
      near(P.x,P.y,n).forEach(t=>{ const dx=t.x-P.x, dy=t.y-P.y, d=Math.hypot(dx,dy)||1;
        g.shots.push({k:"wind",x:P.x,y:P.y,vx:dx/d*420,vy:dy/d*420,dmg:10+4*L,pierce:L>=4?2:0,life:1.1,hit:new Set()}) });
    }
    if(lv("elec") && cd("elec", 1.9-.18*lv("elec"))){
      const L=lv("elec"), vis=shuffle(g.en.filter(e=>e.hp>0&&onScreen(e))).slice(0,L+1);
      vis.forEach(t=>{ g.fx.push({k:"bolt",x:t.x,y:t.y,life:.3,max:.3});
        g.en.forEach(e=>{ if((e.x-t.x)**2+(e.y-t.y)**2<40*40) hurt(e,16+7*L) }) });
    }
    if(lv("fire") && cd("fire", .5)){
      const L=lv("fire"), R=55+12*L;
      g.en.forEach(e=>{ if((e.x-P.x)**2+(e.y-P.y)**2<(R+e.r)**2) hurt(e,5+3*L) });
    }
    if(lv("stone")){
      const L=lv("stone"), n=1+L, R=78;
      for(let i=0;i<n;i++){ const a=g.t*3.2+i*Math.PI*2/n, sx=P.x+Math.cos(a)*R, sy=P.y+Math.sin(a)*R;
        g.en.forEach(e=>{ if(e.stoneCD<=0 && (e.x-sx)**2+(e.y-sy)**2<(e.r+15)**2){ hurt(e,9+4*L); e.stoneCD=.4;
          const dx=e.x-P.x, dy=e.y-P.y, d=Math.hypot(dx,dy)||1; if(e.type!=="boss"){e.x+=dx/d*14;e.y+=dy/d*14} } }) }
    }
    if(lv("ice") && cd("ice", 2.3)){
      const L=lv("ice"), n=4+2*L, off=Math.random()*Math.PI;
      for(let i=0;i<n;i++){ const a=off+i*Math.PI*2/n; g.shots.push({k:"ice",x:P.x,y:P.y,vx:Math.cos(a)*300,vy:Math.sin(a)*300,dmg:6+3*L,pierce:0,life:.9,hit:new Set()}) }
    }
    }
    // 발사체
    for(const sh of g.shots){
      sh.x+=sh.vx*dt; sh.y+=sh.vy*dt; sh.life-=dt; if(sh.remote) continue;
      for(const e of g.en){ if(e.hp<=0||sh.hit.has(e)) continue;
        if((e.x-sh.x)**2+(e.y-sh.y)**2<(e.r+(sh.rad||11))**2){ hurt(e,sh.dmg); sh.hit.add(e); if(sh.k==="ice") e.slow=1.6*M.slow;
          if(sh.boom){ g.en.forEach(o=>{ if(o!==e && (o.x-sh.x)**2+(o.y-sh.y)**2<(sh.boom+o.r)**2) hurt(o,sh.dmg*.7) }); g.fx.push({k:"boom",x:sh.x,y:sh.y,r:sh.boom,col:sh.k==="cannon"?"#ff8a2a":sh.k==="arrow"?"#8af0c1":null,life:.35,max:.35}) }
          if(sh.pierce--<=0){ sh.life=0; break } } }
    }
    g.shots=g.shots.filter(x=>x.life>0);
    g.en=g.en.filter(e=>e.hp>0);
    // 경험치 구슬
    if(g.gems.length>350){ const old=g.gems.splice(0,100); const v=old.reduce((a,b)=>a+b.v,0); g.gems.push({x:old[0].x,y:old[0].y,v}) }
    for(const gm of g.gems){
      const dx=P.x-gm.x, dy=P.y-gm.y, d=Math.hypot(dx,dy)||1;
      if(d<s.mag || gm.fly){ gm.fly=true; const sp=Math.max(320,600-d); gm.x+=dx/d*sp*dt; gm.y+=dy/d*sp*dt }
      if(P.dead) continue;
      if(d<P.r+6 && !gm.got){ gm.got=true; sfx("gem"); if(NM==="client") netOut.g.push(gm.id); else { g.xp+=gm.v*M.xp; if(NM) xpShare+=gm.v } }
    }
    g.gems=g.gems.filter(x=>!x.got);
    for(const it of g.items){
      if(!P.dead && !it.got && (it.x-P.x)**2+(it.y-P.y)**2<(P.r+16)**2){ it.got=true; if(NM==="client"){ netOut.it.push(it.id); continue }
        if(it.k==="heal"){ sfx("heal"); P.hp=Math.min(s.maxHp,P.hp+30); showBanner("회복 물약! 체력을 채웠어요") }
        else if(it.k==="gem"){ sfx("chest"); P.hp=Math.min(s.maxHp,P.hp+40); openGemChest() }
        else { sfx("chest"); const o=options(); P.hp=Math.min(s.maxHp,P.hp+40);
          if(o.length){ apply(o[0]); showBanner(`보물 상자! ${skName(o[0])} 기술이 세졌어요`) } else showBanner("보물 상자! 체력을 채웠어요") } } }
    g.items=g.items.filter(x=>!x.got);
    for(const f of g.fx) f.life-=dt; g.fx=g.fx.filter(f=>f.life>0);
    /* 렉 줄이기: 효과가 너무 많으면 오래된 숫자·작은 효과부터 줄여요 */
    if(g.fx.length>220){ const SMALL={num:1,poof:1,hit:1,crit:1,spark:1}; let cut=g.fx.length-220; g.fx=g.fx.filter(f=>{ if(cut>0&&SMALL[f.k]){ cut--; return false } return true }) }
    { let nums=0; for(let i=g.fx.length-1;i>=0;i--){ const f=g.fx[i]; if(f.k==="num"&&!f.me&&++nums>40) f.life=0 } }
    if(g.duelQ && !frozen && !P.dead && !g.over){ const d=g.duelQ; g.duelQ=null; hanjaDuel(d); return }
    if(g.xp>=g.need && !frozen && !P.dead){ g.xp-=g.need; g.lvl++; g.need=needXP(g.lvl); levelUp() }
  }

  // 그리기
  function blob(e){
    const wob=Math.sin(g.t*6+e.wob)*1.5;
    ctx.fillStyle = e.flash>0 ? "#ffffff" : GC.ink;
    ctx.beginPath(); ctx.ellipse(e.x,e.y,e.r+wob,e.r-wob,0,0,Math.PI*2); ctx.fill();
    if(e.slow>0){ ctx.strokeStyle=GC.ice; ctx.lineWidth=3; ctx.stroke() }
    // 눈
    const dx=g.p.x-e.x, dy=g.p.y-e.y, d=Math.hypot(dx,dy)||1, ex=dx/d*e.r*.25, ey=dy/d*e.r*.25;
    const es=Math.max(2,e.r*.22);
    ctx.fillStyle = e.type==="boss"||e.type==="big" ? "#ff6a4d" : "#ffffff";
    ctx.beginPath(); ctx.arc(e.x-e.r*.32+ex,e.y-e.r*.15+ey,es,0,7); ctx.arc(e.x+e.r*.32+ex,e.y-e.r*.15+ey,es,0,7); ctx.fill();
    if(e.type==="boss"){
      ctx.fillStyle=GC.card; ctx.font=HZ(26); ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText("鬼",e.x,e.y+e.r*.35);
      const w=e.r*2; ctx.fillStyle=GC.grid; ctx.fillRect(e.x-w/2,e.y-e.r-14,w,6); ctx.fillStyle=GC.seal; ctx.fillRect(e.x-w/2,e.y-e.r-14,w*Math.max(0,e.hp/e.max),6);
    }
  }
  function glyph(ch,x,y,size,color,bg){
    if(bg){ ctx.fillStyle=bg; ctx.beginPath(); ctx.arc(x,y,size*.62,0,7); ctx.fill() }
    ctx.fillStyle=color; ctx.font=HZ(size); ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText(ch,x,y+size*.04);
  }
  function draw(){
    const P=g.p, s=st(); HERO_HD=null; REMOTE_HD.length=0;
    ctx=lctx; ctx.setTransform(1/PX,0,0,1/PX,0,0); ctx.imageSmoothingEnabled=false;
    const cx=W/2-P.x, cy=H/2-P.y;
    const ART=typeof isArtMap==="function"&&isArtMap(MAP);   // 그림 바닥 맵: 바닥·장애물·몬스터는 선명한 화면에 따로 그려요
    if(ART){ ctx.save(); ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,low.width,low.height); ctx.restore() } else drawMapBG(ctx,MAP,P.x,P.y,W,H,g.t);
    if(!ART){ const ph=phaseOf(g.t), tint=PH_TINT[MAP.id][phV(ph)]; if(tint){ const k=Math.min(1,(g.t-(g.phT??PHASE_T[ph]))/3), [r,gg,b,a]=tint.split(","); ctx.fillStyle=`rgba(${r},${gg},${b},${(+a)*Math.max(.15,k)})`; ctx.fillRect(0,0,W,H) }
      if(ph>=2){ const lt=(g.t*.37)%7; if(lt<.12||(lt>.25&&lt<.32)){ ctx.fillStyle="rgba(230,220,255,.18)"; ctx.fillRect(0,0,W,H) } } }
    const shk=g.shake>0?16*Math.min(1,g.shake/.3):0;
    const ox=cx+(Math.random()-.5)*shk, oy=cy+(Math.random()-.5)*shk;
    ctx.save(); ctx.translate(ox,oy);
    const vis=o=>Math.abs(o.x-P.x)<W/2+60&&Math.abs(o.y-P.y)<H/2+60;
    // 불꽃 고리
    if(lv("fire")){ const R=55+12*lv("fire"); // 화염 고리: 일렁이는 불길 띠 + 불씨
      ctx.save(); ctx.globalCompositeOperation=GLOW;
      const fg=ctx.createRadialGradient(P.x,P.y,R*.55,P.x,P.y,R*1.12); fg.addColorStop(0,"rgba(255,90,30,0)"); fg.addColorStop(.75,`rgba(255,110,30,${.32+.08*Math.sin(g.t*8)})`); fg.addColorStop(.9,"rgba(255,200,80,.42)"); fg.addColorStop(1,"rgba(255,90,30,0)");
      ctx.fillStyle=fg; ctx.beginPath(); ctx.arc(P.x,P.y,R*1.12,0,7); ctx.fill();
      if(HDFX&&PFX._ok3){ ctx.globalCompositeOperation="source-over"; pfxRing(ctx,P,R,g.t) } else
      for(let i=0;i<16;i++){ const a=g.t*1.8+i*Math.PI/8, fx=P.x+Math.cos(a)*R, fy=P.y+Math.sin(a)*R, fl=9+Math.sin(g.t*14+i*1.7)*4;
        ctx.fillStyle="rgba(255,110,40,.75)"; ctx.beginPath(); ctx.moveTo(fx-7,fy+5); ctx.quadraticCurveTo(fx-2,fy-fl*1.4,fx+Math.sin(g.t*9+i)*3,fy-fl*2.4); ctx.quadraticCurveTo(fx+3,fy-fl,fx+7,fy+5); ctx.closePath(); ctx.fill();
        ctx.fillStyle="rgba(255,230,120,.8)"; ctx.beginPath(); ctx.ellipse(fx,fy+1,3,6,0,0,7); ctx.fill() }
      for(let i=0;i<8;i++){ const ph=(g.t*.9+i*.125)%1, a=i*.8+Math.floor(g.t*.9+i*.125)*2.3; ctx.fillStyle=`rgba(255,200,100,${1-ph})`; ctx.fillRect(P.x+Math.cos(a)*R-1.5,P.y+Math.sin(a)*R-ph*34-1.5,3,3) }
      ctx.restore() }
    drawObstacles(ctx,MAP,P.x,P.y,W,H,g.t,true);
    drawSkillsUnder();
    // 방울, 아이템
    for(const gm of g.gems){ if(!vis(gm)) continue; // 경험치 구슬: 크고 반짝이게
      const big=gm.v>=10, mid=gm.v>=4, r=big?11:mid?9:7.5, bob=Math.sin(g.t*4+gm.x*.07)*2.5, y=gm.y+bob;
      const col=big?"#ff5ab8":mid?"#ffc21a":"#2ad0ff", lt=big?"#ffc8ea":mid?"#fff0a0":"#c8f6ff", tw=.6+.4*Math.sin(g.t*6+gm.x*.05);
      ctx.fillStyle="rgba(0,0,0,.25)"; ctx.beginPath(); ctx.ellipse(gm.x,gm.y+r*1.3,r*.8,r*.3,0,0,7); ctx.fill();
      ctx.save(); ctx.globalCompositeOperation=GLOW; const gg=ctx.createRadialGradient(gm.x,y,0,gm.x,y,r*2.6); gg.addColorStop(0,col); gg.addColorStop(1,"rgba(0,0,0,0)"); ctx.globalAlpha=.55*tw; ctx.fillStyle=gg; ctx.beginPath(); ctx.arc(gm.x,y,r*2.6,0,7); ctx.fill(); ctx.restore();
      ctx.fillStyle=col; ctx.strokeStyle="#1b1530"; ctx.lineWidth=2.2; ctx.beginPath(); ctx.moveTo(gm.x,y-r*1.35); ctx.lineTo(gm.x+r,y); ctx.lineTo(gm.x,y+r*1.35); ctx.lineTo(gm.x-r,y); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle=lt; ctx.beginPath(); ctx.moveTo(gm.x,y-r*1.35); ctx.lineTo(gm.x+r*.45,y-r*.15); ctx.lineTo(gm.x-r*.35,y+r*.05); ctx.closePath(); ctx.fill();
      if(tw>.92){ ctx.fillStyle="#fff"; ctx.fillRect(gm.x+r*.6,y-r*1.2,2,6); ctx.fillRect(gm.x+r*.6-2,y-r*1.2+2,6,2) } }
    for(const it of g.items){ if(!vis(it)) continue;
      if(it.k==="heal"){ const b=Math.sin(g.t*4)*2; ctx.fillStyle="rgba(255,106,128,.3)"; ctx.beginPath(); ctx.arc(it.x,it.y+b,18,0,7); ctx.fill();
        ctx.fillStyle="#e9475f"; ctx.beginPath(); ctx.arc(it.x,it.y+4+b,10,0,7); ctx.fill(); ctx.fillStyle="#f4ece0"; ctx.fillRect(it.x-4,it.y-12+b,8,8); ctx.fillStyle="#8a5a2b"; ctx.fillRect(it.x-5,it.y-15+b,10,4);
        ctx.fillStyle="#ffffff"; ctx.beginPath(); ctx.arc(it.x-4,it.y+1+b,3,0,7); ctx.fill() }
      else if(it.k==="gem"){ drawTreasure(ctx,it.x,it.y,g.t,GLOW) }
      else { ctx.fillStyle=GC.gold; ctx.fillRect(it.x-16,it.y-12,32,24); ctx.strokeStyle=GC.ink; ctx.lineWidth=2; ctx.strokeRect(it.x-16,it.y-12,32,24); ctx.beginPath(); ctx.moveTo(it.x-16,it.y-3); ctx.lineTo(it.x+16,it.y-3); ctx.stroke() } }
    // 적
    drawObstacles(ctx,MAP,P.x,P.y,W,H,g.t,false);
    g.en.sort((a,b)=>a.y-b.y); const HDL=[], HDM=[];
    // 렉 줄이기: 화면에 몬스터가 많으면(70마리 넘게) 그림 몬스터를 가벼운 도트 화면에 그려요
    let nVis=0; if(ART) for(const e of g.en) if(e.type!=="boss"&&vis(e)) nVis++; const HDOK=nVis<=70;
    for(const e of g.en){ if(!vis(e)) continue;
      if(e.rage>0){ ctx.fillStyle=`rgba(233,71,95,${.25+.15*Math.sin(g.t*12+e.wob)})`; ctx.beginPath(); ctx.arc(e.x,e.y,e.r*1.6,0,7); ctx.fill() }
      if(e.elite){ ctx.strokeStyle=`rgba(246,197,68,${.6+.3*Math.sin(g.t*6)})`; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(e.x,e.y+e.r*.2,e.r*1.4,0,7); ctx.stroke() }
      { const ph=phaseOf(g.t); if(ph&&e.type!=="boss"&&!(ART&&HDOK)){ ctx.fillStyle=`rgba(${PH_AURA[ph]},${.18+.08*Math.sin(g.t*5+e.wob)})`; ctx.beginPath(); ctx.ellipse(e.x,e.y+e.r*.6,e.r*1.25,e.r*.55,0,0,7); ctx.fill() } }
      if(e.type==="boss") HDL.push(e); else if(ART&&HDOK&&mobArtOf(e)) HDM.push(e); else drawMonster(ctx,e,g.t,P.x,P.y);   // 보스는 모두 선명하게
      if(e.elite){ const w=e.r*2; ctx.fillStyle="rgba(0,0,0,.45)"; ctx.fillRect(e.x-w/2,e.y-e.r*1.35,w,4); ctx.fillStyle="#f6c544"; ctx.fillRect(e.x-w/2,e.y-e.r*1.35,w*Math.max(0,e.hp/e.max),4) } }
    const actionLayer=()=>{
    for(const b of g.eshots){ if(!vis(b)) continue;
      if(b.kind==="rock"){ ctx.save(); ctx.translate(b.x,b.y); ctx.rotate(g.t*8); ctx.fillStyle="#8d86a0"; ctx.beginPath(); ctx.moveTo(-14,-4); ctx.lineTo(-5,-14); ctx.lineTo(10,-11); ctx.lineTo(14,3); ctx.lineTo(4,13); ctx.lineTo(-11,9); ctx.closePath(); ctx.fill(); ctx.strokeStyle="#4d4760"; ctx.lineWidth=2; ctx.stroke(); ctx.restore() }
      else if(b.kind==="orb"){ ctx.globalAlpha=.3; ctx.fillStyle=b.col||"#c08bff"; ctx.beginPath(); ctx.arc(b.x,b.y,b.r+8+Math.sin(g.t*10)*2,0,7); ctx.fill(); ctx.globalAlpha=1; ctx.fillStyle=b.col||"#9a6bff"; ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,7); ctx.fill(); ctx.fillStyle="#f3e8ff"; ctx.beginPath(); ctx.arc(b.x-3,b.y-3,b.r*.4,0,7); ctx.fill() }
      else { ctx.fillStyle=b.kind==="fire"?"rgba(233,71,95,.35)":"rgba(140,200,80,.35)"; ctx.beginPath(); ctx.arc(b.x,b.y,b.r+5,0,7); ctx.fill(); ctx.fillStyle=b.col; ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,7); ctx.fill(); ctx.fillStyle="#fff4b0"; ctx.beginPath(); ctx.arc(b.x-2,b.y-2,b.r*.4,0,7); ctx.fill() } }
    // 발사체
    for(const sh of g.shots){ if(!vis(sh)) continue;
      const a=Math.atan2(sh.vy,sh.vx);
      if(HDFX&&PFX._ok&&drawPainted(sh,a)) continue;   // 그림풍 효과
      if(sh.k==="wind"){ // 회오리 칼날: 회전하는 초승달 + 잔상
        ctx.save(); ctx.globalCompositeOperation=GLOW;
        for(let j=3;j>=1;j--){ const tx=sh.x-sh.vx*.018*j, ty=sh.y-sh.vy*.018*j; ctx.save(); ctx.translate(tx,ty); ctx.rotate(g.t*16-j*.5); ctx.fillStyle=`rgba(90,230,170,${.16*(4-j)/3})`; ctx.beginPath(); ctx.arc(0,0,18,0,Math.PI*1.3); ctx.arc(0,-3,12,Math.PI*1.25,0,true); ctx.closePath(); ctx.fill(); ctx.restore() }
        ctx.restore(); ctx.save(); ctx.translate(sh.x,sh.y); ctx.rotate(g.t*16);
        const wg=ctx.createLinearGradient(-18,0,18,0); wg.addColorStop(0,"#1d7a53"); wg.addColorStop(.5,"#3fcf8e"); wg.addColorStop(1,"#e6fff4");
        ctx.fillStyle=wg; ctx.beginPath(); ctx.arc(0,0,19,0,Math.PI*1.3); ctx.arc(0,-3,13,Math.PI*1.25,0,true); ctx.closePath(); ctx.fill();
        ctx.strokeStyle="#ffffff"; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(0,0,18,.2,Math.PI*1.1); ctx.stroke();
        ctx.fillStyle="rgba(230,255,244,.8)"; ctx.beginPath(); ctx.arc(0,0,4,0,7); ctx.fill(); ctx.restore() }
      else if(sh.k==="ice"){ // 서리 파편: 빛나는 얼음 결정 + 서리 꼬리
        ctx.save(); ctx.globalCompositeOperation=GLOW;
        for(let j=1;j<=5;j++){ ctx.fillStyle=`rgba(150,220,255,${.22-j*.035})`; ctx.beginPath(); ctx.arc(sh.x-sh.vx*.012*j,sh.y-sh.vy*.012*j,7-j*.8,0,7); ctx.fill() }
        const ig=ctx.createRadialGradient(sh.x,sh.y,0,sh.x,sh.y,18); ig.addColorStop(0,"rgba(200,240,255,.7)"); ig.addColorStop(1,"rgba(120,200,255,0)"); ctx.fillStyle=ig; ctx.beginPath(); ctx.arc(sh.x,sh.y,18,0,7); ctx.fill(); ctx.restore();
        ctx.save(); ctx.translate(sh.x,sh.y); ctx.rotate(a);
        ctx.fillStyle="#4aa8e8"; ctx.beginPath(); ctx.moveTo(16,0); ctx.lineTo(2,-7); ctx.lineTo(-11,0); ctx.lineTo(2,7); ctx.closePath(); ctx.fill();
        ctx.fillStyle="#bfeaff"; ctx.beginPath(); ctx.moveTo(16,0); ctx.lineTo(2,-7); ctx.lineTo(0,0); ctx.closePath(); ctx.fill();
        ctx.fillStyle="#ffffff"; ctx.beginPath(); ctx.moveTo(16,0); ctx.lineTo(4,-3); ctx.lineTo(6,0); ctx.closePath(); ctx.fill();
        ctx.strokeStyle="#e8f8ff"; ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(-6,-6); ctx.lineTo(-2,0); ctx.lineTo(-6,6); ctx.stroke();
        const tw=Math.sin(g.t*20+sh.x)*.5+.5; ctx.fillStyle=`rgba(255,255,255,${tw})`; ctx.fillRect(8,-5,2,2); ctx.restore() }
      else if(sh.k==="arrow"){ jfArrow(ctx,sh,a,GLOW); continue; ctx.save(); ctx.translate(sh.x,sh.y); ctx.rotate(a); if(sh.glow){ ctx.fillStyle="rgba(138,240,193,.45)"; ctx.fillRect(-30,-6,40,12) } ctx.strokeStyle="#7a5230"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-16,0); ctx.lineTo(8,0); ctx.stroke();
        ctx.fillStyle="#dfe7f2"; ctx.beginPath(); ctx.moveTo(14,0); ctx.lineTo(6,-5); ctx.lineTo(6,5); ctx.fill(); ctx.fillStyle="#3fcf8e"; ctx.fillRect(-18,-4,5,3); ctx.fillRect(-18,1,5,3); ctx.restore() }
      else if(sh.k==="star"){ jfStar(ctx,sh,g.t,GLOW); continue; ctx.save(); ctx.translate(sh.x,sh.y); ctx.rotate(g.t*18); ctx.fillStyle=sh.dark?"#9a6bff":"#cfd6e4"; ctx.strokeStyle="#25211b"; ctx.lineWidth=2; ctx.beginPath();
        for(let i=0;i<8;i++){ const r=i%2?4:13, b=i*Math.PI/4; ctx.lineTo(Math.cos(b)*r,Math.sin(b)*r) } ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle="#f6c544"; ctx.beginPath(); ctx.arc(0,0,3,0,7); ctx.fill(); ctx.restore() }
      else if(sh.k==="bullet"){ if(sh.ink) jfInk(ctx,sh,GLOW); else jfBullet(ctx,sh,GLOW); continue; if(sh.ink){ ctx.fillStyle="#6a2a8a"; ctx.beginPath(); ctx.arc(sh.x,sh.y,6,0,7); ctx.fill(); continue } ctx.strokeStyle="rgba(246,197,68,.55)"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(sh.x-sh.vx*.025,sh.y-sh.vy*.025); ctx.lineTo(sh.x,sh.y); ctx.stroke(); ctx.fillStyle="#f6c544"; ctx.beginPath(); ctx.arc(sh.x,sh.y,4,0,7); ctx.fill(); }
      else if(sh.k==="big"){ ctx.save(); ctx.translate(sh.x,sh.y); ctx.rotate(a); ctx.fillStyle="rgba(138,240,193,.35)"; ctx.fillRect(-60,-14,70,28);
        ctx.strokeStyle="#2f7d63"; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(-50,0); ctx.lineTo(20,0); ctx.stroke(); ctx.fillStyle="#e9eef6"; ctx.beginPath(); ctx.moveTo(34,0); ctx.lineTo(16,-12); ctx.lineTo(16,12); ctx.fill(); ctx.restore() }
      else if(sh.k==="cannon"){ ctx.fillStyle="#25211b"; ctx.beginPath(); ctx.arc(sh.x,sh.y,10,0,7); ctx.fill(); ctx.fillStyle="#8b93a6"; ctx.beginPath(); ctx.arc(sh.x-3,sh.y-3,3,0,7); ctx.fill() }
      else if(sh.k==="fire"){ jfFireShot(ctx,sh,g.t,GLOW); continue; const f=1+Math.sin(g.t*30)*.12; ctx.fillStyle="rgba(233,71,95,.35)"; ctx.beginPath(); ctx.arc(sh.x-sh.vx*.03,sh.y-sh.vy*.03,9,0,7); ctx.fill();
        ctx.fillStyle="#ff8a2a"; ctx.beginPath(); ctx.arc(sh.x,sh.y,11*f,0,7); ctx.fill(); ctx.fillStyle="#ffe066"; ctx.beginPath(); ctx.arc(sh.x,sh.y,5*f,0,7); ctx.fill(); }
    }
    // 도는 돌
    if(lv("stone")){ const n=1+lv("stone"), R=78; // 수호 바위: 빛나는 궤도 + 룬이 새겨진 바위
      ctx.save(); ctx.globalCompositeOperation=GLOW; const og=ctx.createRadialGradient(P.x,P.y,R-10,P.x,P.y,R+10); og.addColorStop(0,"rgba(180,160,255,0)"); og.addColorStop(.5,"rgba(180,160,255,.22)"); og.addColorStop(1,"rgba(180,160,255,0)");
      ctx.fillStyle=og; ctx.beginPath(); ctx.arc(P.x,P.y,R+10,0,7); ctx.arc(P.x,P.y,R-10,0,7,true); ctx.fill(); ctx.restore();
      for(let i=0;i<n;i++){ const a=g.t*3.2+i*Math.PI*2/n, sx=P.x+Math.cos(a)*R, sy=P.y+Math.sin(a)*R;
        ctx.save(); ctx.globalCompositeOperation=GLOW; for(let j=1;j<=4;j++){ const b=a-j*.12; ctx.fillStyle=`rgba(170,150,230,${.18-j*.035})`; ctx.beginPath(); ctx.arc(P.x+Math.cos(b)*R,P.y+Math.sin(b)*R,15-j,0,7); ctx.fill() } ctx.restore();
        if(HDFX&&PFX.stone){ pfxDraw(ctx,"stone",sx,sy,g.t*4+i,1); continue }
        ctx.save(); ctx.translate(sx,sy); ctx.rotate(g.t*4+i);
        ctx.fillStyle="#5f5872"; ctx.beginPath(); ctx.moveTo(-15,-3); ctx.lineTo(-8,-15); ctx.lineTo(8,-14); ctx.lineTo(16,-2); ctx.lineTo(10,13); ctx.lineTo(-8,14); ctx.lineTo(-16,5); ctx.closePath(); ctx.fill();
        ctx.fillStyle="#8d86a0"; ctx.beginPath(); ctx.moveTo(-15,-3); ctx.lineTo(-8,-15); ctx.lineTo(8,-14); ctx.lineTo(16,-2); ctx.lineTo(4,2); ctx.lineTo(-10,3); ctx.closePath(); ctx.fill();
        ctx.fillStyle="#c4bfd2"; ctx.beginPath(); ctx.moveTo(-8,-15); ctx.lineTo(8,-14); ctx.lineTo(2,-7); ctx.lineTo(-9,-7); ctx.closePath(); ctx.fill();
        const rg=.6+.4*Math.sin(g.t*6+i); ctx.strokeStyle=`rgba(200,170,255,${rg})`; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(-4,-2); ctx.lineTo(0,6); ctx.lineTo(5,-2); ctx.moveTo(0,6); ctx.lineTo(0,10); ctx.stroke();
        ctx.strokeStyle="#2e2a3e"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(-15,-3); ctx.lineTo(-8,-15); ctx.lineTo(8,-14); ctx.lineTo(16,-2); ctx.lineTo(10,13); ctx.lineTo(-8,14); ctx.lineTo(-16,5); ctx.closePath(); ctx.stroke(); ctx.restore() } }
    // 효과
    for(const f of g.fx){ const k=f.life/f.max; if(TXTK[f.k]) continue; if(drawSkillFx(f,k)) continue;
      if(f.k==="bolt"){ // 천둥 번개: 갈라지는 번개 + 충격파
        if(!f.path){ const mk=(x,y,ty,seg,spread)=>{ const p=[[x,y]]; for(let i=1;i<=seg;i++){ y+=(ty-y)/(seg-i+1); x+=(Math.random()-.5)*spread; p.push([i===seg?f.x:x,y]) } return p };
          f.path=mk(f.x,f.y-H*.55,f.y,9,40); f.br=[]; for(let i=0;i<3;i++){ const s=f.path[2+i*2]; f.br.push(mk(s[0],s[1],s[1]+60+Math.random()*50,4,50).map(([x,y],j)=>[x+j*(i%2?14:-14),y])) } }
        const q=1-k; ctx.save(); ctx.globalCompositeOperation=GLOW; ctx.lineCap="round"; ctx.lineJoin="round";
        const line=(p,w,c)=>{ ctx.strokeStyle=c; ctx.lineWidth=w; ctx.beginPath(); p.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y)); ctx.stroke() };
        line(f.path,22,`rgba(120,140,255,${k*.35})`); line(f.path,10,`rgba(170,200,255,${k*.7})`); line(f.path,3.5,`rgba(255,255,255,${k})`);
        f.br.forEach(b=>{ line(b,6,`rgba(150,170,255,${k*.5})`); line(b,2,`rgba(255,255,255,${k*.9})`) });
        const gr=ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,60); gr.addColorStop(0,`rgba(255,255,255,${k})`); gr.addColorStop(.3,`rgba(160,190,255,${k*.6})`); gr.addColorStop(1,"rgba(80,100,255,0)");
        ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(f.x,f.y,60,0,7); ctx.fill();
        ctx.strokeStyle=`rgba(190,210,255,${k})`; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(f.x,f.y+4,20+q*60,(20+q*60)*.4,0,0,7); ctx.stroke();
        for(let i=0;i<8;i++){ const a=i*.785+f.x*.01, d=10+q*46; ctx.fillStyle=`rgba(255,255,220,${k})`; ctx.fillRect(f.x+Math.cos(a)*d-1.5,f.y+Math.sin(a)*d*.5-1.5-q*10,3,3) }
        ctx.restore(); }
      else if(f.k==="ring"){ ctx.strokeStyle=`rgba(47,107,85,${k})`; ctx.lineWidth=8; ctx.beginPath(); ctx.arc(f.x,f.y,260*(1-k)+20,0,7); ctx.stroke() }
      else if(f.k==="slash"){ ctx.strokeStyle=`rgba(255,244,176,${k})`; ctx.lineWidth=10*k+2; ctx.beginPath(); ctx.arc(f.x,f.y,f.r*(1.05-k*.25),f.a-f.arc/2,f.a+f.arc/2); ctx.stroke();
        ctx.strokeStyle=`rgba(255,255,255,${k})`; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(f.x,f.y,f.r*(.85-k*.2),f.a-f.arc/2.4,f.a+f.arc/2.4); ctx.stroke() }
      else if(f.k==="boom" && f.col){ ctx.globalAlpha=k*.55; ctx.fillStyle=f.col; ctx.beginPath(); ctx.arc(f.x,f.y,f.r*(1.15-k*.4),0,7); ctx.fill(); ctx.globalAlpha=k; ctx.strokeStyle="#ffffff"; ctx.lineWidth=3; ctx.stroke(); ctx.globalAlpha=1 }
      else if(f.k==="warn"){ ctx.strokeStyle="rgba(200,55,45,.6)"; ctx.setLineDash([6,6]); ctx.lineWidth=2; ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,7); ctx.stroke(); ctx.setLineDash([]) }
      else if(f.k==="spin"){ ctx.strokeStyle=`rgba(255,244,176,${k})`; ctx.lineWidth=14*k+2; ctx.beginPath(); ctx.arc(f.x,f.y,f.r*(1-k*.3),0,7); ctx.stroke() }
      else if(f.k==="shield"){ ctx.strokeStyle=`rgba(99,176,255,${.4+.4*Math.sin(g.t*12)})`; ctx.fillStyle="rgba(99,176,255,.15)"; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(g.p.x,g.p.y-6,40,0,7); ctx.fill(); ctx.stroke() }
      else if(f.k==="smoke"){ ctx.fillStyle=`rgba(90,85,110,${k*.45})`; for(let i=0;i<7;i++){ const a=i*0.9; ctx.beginPath(); ctx.arc(f.x+Math.cos(a)*f.r*.55,f.y+Math.sin(a)*f.r*.55,f.r*.45*(1.2-k*.3),0,7); ctx.fill() } }
      else if(f.k==="label"){ ctx.globalAlpha=Math.min(1,k*2); ctx.font='22px "Black Han Sans","Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.lineWidth=5; ctx.strokeStyle="#25211b"; ctx.strokeText(f.text,f.x,f.y-(1-k)*20); ctx.fillStyle="#f6c544"; ctx.fillText(f.text,f.x,f.y-(1-k)*20); ctx.globalAlpha=1 }
      else if(f.k==="boom"){ ctx.fillStyle=`rgba(255,138,42,${k*.45})`; ctx.beginPath(); ctx.arc(f.x,f.y,f.r*(1.2-k*.5),0,7); ctx.fill(); ctx.strokeStyle=`rgba(255,224,102,${k})`; ctx.lineWidth=4; ctx.stroke() }
      else if(f.k==="crit"){ ctx.globalAlpha=k; ctx.fillStyle="#c8372d"; ctx.font='900 16px "Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.fillText("급소!",f.x,f.y-(1-k)*16); ctx.globalAlpha=1 }
      else if(f.k==="muzzle"){ ctx.fillStyle="#ffe066"; ctx.beginPath(); ctx.arc(f.x,f.y,7,0,7); ctx.fill() }
      else if(f.k==="num"){ const q=1-k, y=f.y-q*28, sc=f.crit?1.35:1; ctx.globalAlpha=Math.min(1,k*2.2);
        ctx.font=`${Math.round((f.me?20:f.dot?13:16)*sc)}px "Black Han Sans","Do Hyeon",sans-serif`; ctx.textAlign="center"; ctx.textBaseline="middle";
        const txt=f.me?(f.v<0?String(f.v):"+"+f.v):String(f.v); ctx.lineWidth=4; ctx.strokeStyle="#25211b"; ctx.strokeText(txt,f.x,y);
        ctx.fillStyle=f.me?(f.v<0?"#ff5a6a":"#3fcf8e"):f.crit?"#ffd23a":f.dot?"#c8a6ff":"#ffffff"; ctx.fillText(txt,f.x,y); ctx.globalAlpha=1 }
      else if(f.k==="dust"){ ctx.fillStyle=`rgba(200,185,160,${k*.6})`; const q=1-k; ctx.beginPath(); ctx.arc(f.x-6-q*6,f.y-q*5,4+q*4,0,7); ctx.arc(f.x+6+q*6,f.y-q*5,3+q*4,0,7); ctx.fill() }
      else if(f.k==="bosscast"&&!f.sp){ const y=f.y-(1-k)*10; ctx.globalAlpha=Math.min(1,k*3); ctx.font='22px "Black Han Sans","Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.textBaseline="middle";
        ctx.lineWidth=6; ctx.strokeStyle="#2a0a10"; ctx.strokeText(f.text,f.x,y); ctx.fillStyle="#ff5a6a"; ctx.fillText(f.text,f.x,y); ctx.globalAlpha=1 }
      else if(f.k==="ragewave"){ ctx.strokeStyle=`rgba(233,71,95,${k})`; ctx.lineWidth=10*k+2; ctx.beginPath(); ctx.arc(f.x,f.y,f.r*(1-k)+20,0,7); ctx.stroke() }
      else if(f.k==="laserwarn"){ ctx.save(); ctx.translate(f.x,f.y); ctx.rotate(f.a); ctx.fillStyle=`rgba(233,71,95,${.12+.25*(1-k)})`; ctx.fillRect(0,-26,f.len,52);
        ctx.strokeStyle="rgba(233,71,95,.8)"; ctx.setLineDash([10,8]); ctx.lineWidth=2; ctx.strokeRect(0,-26,f.len,52); ctx.setLineDash([]); ctx.restore() }
      else if(f.k==="laser"){ ctx.save(); ctx.translate(f.x,f.y); ctx.rotate(f.a); ctx.fillStyle=`rgba(192,139,255,${k*.7})`; ctx.fillRect(0,-30,f.len,60); ctx.fillStyle=`rgba(255,255,255,${k})`; ctx.fillRect(0,-10,f.len,20); ctx.restore() }
      else if(f.k==="spark"){ ctx.strokeStyle=`rgba(255,255,255,${k})`; ctx.lineWidth=3; for(let i=0;i<4;i++){ const a=f.a+i*1.57, r0=6*(1-k), r1=14*(1.2-k); ctx.beginPath(); ctx.moveTo(f.x+Math.cos(a)*r0,f.y+Math.sin(a)*r0); ctx.lineTo(f.x+Math.cos(a)*r1,f.y+Math.sin(a)*r1); ctx.stroke() } }
      else if(f.k==="poof"){ const q=1-k; ctx.globalAlpha=k; for(let i=0;i<7;i++){ const a=f.seed+i*.9, d=f.r*(.3+q*1.4);
          ctx.fillStyle=i%2?"#ffffff":"rgba(220,220,230,1)"; ctx.beginPath(); ctx.arc(f.x+Math.cos(a)*d,f.y+Math.sin(a)*d-q*10,f.r*.35*(1-q*.5),0,7); ctx.fill() }
        ctx.fillStyle="#ffe066"; for(let i=0;i<5;i++){ const a=f.seed*2+i*1.25, d=f.r*(.5+q*2); ctx.fillRect(f.x+Math.cos(a)*d-2,f.y+Math.sin(a)*d-2,4,4) } ctx.globalAlpha=1 }
      else if(f.k==="hit"){ ctx.fillStyle=`rgba(200,55,45,${k*.35})`; ctx.beginPath(); ctx.arc(f.x,f.y,30,0,7); ctx.fill() } }
    if(NM) drawRemotes();
    // 주인공
    if(P.dead){ ctx.save(); ctx.translate(P.x,P.y+20); ctx.rotate(Math.PI/2); ctx.globalAlpha=.6; ctx.filter="grayscale(1)"; if(heroImg.complete&&heroImg.naturalWidth) ctx.drawImage(heroImg,-32,-62,64,64); ctx.restore(); ctx.filter="none";
      ctx.strokeStyle="rgba(255,240,150,.8)"; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(P.x,P.y+8,80,-Math.PI/2,-Math.PI/2+Math.PI*2*Math.min(1,(g.rescue||0)/RESCUE)); ctx.stroke() }
    else if(!(P.inv>0 && Math.floor(g.t*16)%2)){
      const mv=Math.min(1,(P.mv||0)), ph=g.walk||0;
      const hop=Math.abs(Math.sin(ph))*7*mv, sq=1+(Math.cos(ph*2)*.07)*mv, br=1+Math.sin(g.t*3)*.025*(1-mv);
      const tilt=(P.vx||0)/s.spd*.12;
      const shS=1-hop/22;
      if(HSt.tier>0){ const tc=TIER_COLOR[HSt.tier], pu=.55+.45*Math.sin(g.t*3); ctx.save(); ctx.globalCompositeOperation=GLOW;
        const ag=ctx.createRadialGradient(P.x,P.y+18,2,P.x,P.y+18,34+HSt.tier*4); ag.addColorStop(0,tc+"aa"); ag.addColorStop(1,tc+"00"); ctx.globalAlpha=.55*pu; ctx.fillStyle=ag; ctx.beginPath(); ctx.ellipse(P.x,P.y+18,34+HSt.tier*4,12+HSt.tier*1.5,0,0,7); ctx.fill();
        if(HSt.tier>=3){ for(let i=0;i<(HSt.tier===4?8:5);i++){ const ph=(g.t*.7+i/7)%1, a=i*2.4; ctx.globalAlpha=1-ph; ctx.fillStyle=tc; ctx.fillRect(P.x+Math.cos(a)*18-1.5,P.y+14-ph*46-1.5,3,3) } }
        ctx.restore() }
      ctx.fillStyle="rgba(37,33,27,.22)"; ctx.beginPath(); ctx.ellipse(P.x,P.y+20,16*shS,5*shS,0,0,7); ctx.fill();
      const AK=HERO.main.kind, AD={sword:.24,arrow:.32,star:.22,gun:.16,fireball:.4}[AK], at=g.atk?g.t-g.atk.t:9, aq=at<AD?at/AD:-1, aa=g.atk?g.atk.a:0;
      let lx=0, ly=0, face=P.face||1;
      if(aq>=0){ face=Math.cos(aa)>=0?1:-1;
        const push=AK==="sword"?Math.sin(aq*Math.PI)*10:AK==="gun"?-Math.max(0,1-aq*3)*6:AK==="star"?Math.sin(aq*Math.PI)*6:AK==="arrow"?(aq<.45?-aq*6:-2.7*(1-aq)):0;
        lx=Math.cos(aa)*push; ly=Math.sin(aa)*push*.6 }
      if(aq>=0 && AK==="fireball") drawAtkUnder(P.x,P.y,aq,aa);
      if(heroImg.complete && heroImg.naturalWidth){
        if(isHeroArt(heroImg.src)){ const rs=g.hrs||(g.hrs={}); rs.dt=g.t-(rs.t??g.t); rs.t=g.t; rs.mv=mv; rs.ph=ph; rs.kind=AK; rs.aq=aq; HERO_HD={x:P.x+lx*.5,y:P.y+20-hop*.45+ly*.5,rot:tilt*.6,sx:face*br,sy:br*(1+(sq-1)*.4),rs} }
        else { ctx.imageSmoothingEnabled=false;
        ctx.save(); ctx.translate(P.x+lx,P.y+20-hop+ly); ctx.rotate(tilt); ctx.scale(face*br/sq,br*sq);
        if(aq>=0 && aq<.35){ ctx.scale(1.08,.94) }
        ctx.drawImage(heroImg,-32,-62,64,64); ctx.restore(); } }
      if(aq>=0) drawAtkOver(P.x+lx,P.y-12-hop+ly,aq,aa,AK);
    }
    drawSkillsOver();
    };
    if(!HDFX) actionLayer();   // 기술·발사체·용사: 기본은 선명한 화면에 그려요 (느려지면 도트 화면으로)
    ctx.restore();
    drawMapOverlay(ctx,MAP,W,H,g.t);
    if(P.hp<s.maxHp*.3){ const k=.35+.25*Math.sin(g.t*8), gr=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.75); gr.addColorStop(0,"rgba(200,0,30,0)"); gr.addColorStop(1,`rgba(200,0,30,${k})`); ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);
      if(!g.warnT||g.t-g.warnT>6){ g.warnT=g.t; showBanner("⚠ 체력이 얼마 남지 않았어요! 물약을 찾아요!") } }
    drawScreenFx();
    for(const f of g.fx) if(f.k==="flash"){ ctx.globalAlpha=(f.life/f.max)*.5; ctx.fillStyle=f.col||"#fff"; ctx.fillRect(0,0,W,H); ctx.globalAlpha=1 }
    // 도트 화면을 크게 키워서 붙이고, 글자는 선명하게 따로 그려요
    ctx=MAINCTX; ctx.setTransform(dpr,0,0,dpr,0,0); ctx.imageSmoothingEnabled=false;
    let ARTP=null;
    if(ART){ // 바닥 → (장애물·몬스터를 앞뒤 순서대로) → 그 위에 도트 화면
      ctx.imageSmoothingEnabled=true; if(!drawFloorHD(ctx,MAP,ox,oy,W,H,g.t)) drawMapBG(ctx,MAP,P.x,P.y,W,H,g.t);
      { const ph=phaseOf(g.t), tint=PH_TINT[MAP.id][phV(ph)]; if(tint){ const k=Math.min(1,(g.t-(g.phT??PHASE_T[ph]))/3), [r,gg,b,a]=tint.split(","); ctx.fillStyle=`rgba(${r},${gg},${b},${(+a)*Math.max(.15,k)})`; ctx.fillRect(0,0,W,H) } }   // 바닥만 어둡게 (몬스터는 또렷하게)
      ctx.save(); ctx.translate(ox,oy); ARTP=artPropsVisible(MAP,P.x,P.y,W,H);
      const L=ARTP.map(o=>[o.flat?o.ay-1e6:o.ay,0,o]); for(const e of HDM) L.push([e.y+e.r*.95,1,e]); L.sort((a,b)=>a[0]-b[0]);
      for(const it of L){ if(it[1]) drawMobArt(ctx,it[2],g.t,P.x,P.y); else drawArtProp(ctx,it[2],g.t,false) }
      ctx.restore(); ctx.imageSmoothingEnabled=false }
    if(low.width&&low.height) ctx.drawImage(low,0,0,low.width*PX,low.height*PX);
    ctx.save(); ctx.translate(ox,oy);
    if(ARTP){ ctx.imageSmoothingEnabled=true;   // 나무 뒤에 숨으면 나뭇잎이 살짝 비쳐 보이게 덮어요
      for(const o of ARTP){ if(o.pt!=="tree") continue; const im=PROP_IMG[o.pk]; if(!im) continue; const w=o.h*im.width/im.height;
        if(P.y<o.ay-6&&P.y>o.ay-o.h*.95&&Math.abs(P.x-o.ax)<w*.42){ ctx.globalAlpha=.55; drawArtProp(ctx,o,g.t,true); ctx.globalAlpha=1 } } }
    for(const e of HDL){ ctx.imageSmoothingEnabled=true; drawMonster(ctx,e,g.t,P.x,P.y) }
    if(HDFX){ ctx.imageSmoothingEnabled=true; actionLayer() }
    ctx.imageSmoothingEnabled=true;
    for(const q of REMOTE_HD){ ctx.save(); ctx.setTransform(1,0,0,1,0,0); const T=q.T; ctx.setTransform(T.a*PX*dpr,T.b*PX*dpr,T.c*PX*dpr,T.d*PX*dpr,T.e*PX*dpr,T.f*PX*dpr); const rs=q.r.hrs||(q.r.hrs={}); rs.dt=g.t-(rs.t??g.t); rs.t=g.t; rs.mv=q.mv; rs.ph=g.t*14; rs.aq=-1; drawHeroRig(ctx,q.r.img,HSZ,rs); ctx.restore() }
    if(HERO_HD){ const q=HERO_HD; ctx.save(); ctx.translate(q.x,q.y); ctx.rotate(q.rot); ctx.scale(q.sx,q.sy); drawHeroRig(ctx,heroImg,HSZ,q.rs); ctx.restore() }   // 최종 보스는 선명하게
    for(const e of g.en){ if(e.elite && e.hp>0 && vis(e)){ ctx.font='13px "Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.textBaseline="alphabetic"; ctx.lineWidth=3; ctx.strokeStyle="#25211b"; ctx.strokeText("정예",e.x,e.y-e.r*1.5); ctx.fillStyle="#f6c544"; ctx.fillText("정예",e.x,e.y-e.r*1.5) } }
    if(NM) drawRemoteNames();
    for(const f of g.fx){ if(!TXTK[f.k]) continue; const k=f.life/f.max;
      if(f.k==="label"){ ctx.globalAlpha=Math.min(1,k*2); ctx.font='22px "Black Han Sans","Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.textBaseline="alphabetic"; ctx.lineWidth=5; ctx.strokeStyle="#25211b"; ctx.strokeText(f.text,f.x,f.y-(1-k)*20); ctx.fillStyle="#f6c544"; ctx.fillText(f.text,f.x,f.y-(1-k)*20); ctx.globalAlpha=1 }
      else if(f.k==="crit"){ ctx.globalAlpha=k; ctx.fillStyle="#c8372d"; ctx.font='900 16px "Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.textBaseline="alphabetic"; ctx.fillText("급소!",f.x,f.y-(1-k)*16); ctx.globalAlpha=1 }
      else if(f.k==="num"){ const q=1-k, y=f.y-q*28, sc=f.crit?1.35:1; ctx.globalAlpha=Math.min(1,k*2.2);
        ctx.font=`${Math.round((f.me?20:f.dot?13:16)*sc)}px "Black Han Sans","Do Hyeon",sans-serif`; ctx.textAlign="center"; ctx.textBaseline="middle";
        const txt=f.me?(f.v<0?String(f.v):"+"+f.v):String(f.v); ctx.lineWidth=4; ctx.strokeStyle="#25211b"; ctx.strokeText(txt,f.x,y);
        ctx.fillStyle=f.me?(f.v<0?"#ff5a6a":"#3fcf8e"):f.crit?"#ffd23a":f.dot?"#c8a6ff":"#ffffff"; ctx.fillText(txt,f.x,y); ctx.globalAlpha=1 }
      else if(f.k==="bosscast"&&!f.sp){ const y=f.y-(1-k)*10; ctx.globalAlpha=Math.min(1,k*3); ctx.font='22px "Black Han Sans","Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.textBaseline="middle";
        ctx.lineWidth=6; ctx.strokeStyle="#2a0a10"; ctx.strokeText(f.text,f.x,y); ctx.fillStyle="#ff5a6a"; ctx.fillText(f.text,f.x,y); ctx.globalAlpha=1 } }
    ctx.restore();
    for(const f of g.fx) if(f.k==="cutin") jfCutinText(ctx,f,W,H);
    { const bs=g.en.filter(e=>e.type==="boss"&&e.hp>0); let y=96;
      bs.forEach(b=>{ const w=Math.min(420,W-40), x=(W-w)/2; ctx.fillStyle="rgba(20,10,20,.7)"; ctx.fillRect(x-4,y-4,w+8,30);
        ctx.fillStyle="#3a1a22"; ctx.fillRect(x,y+12,w,10); ctx.fillStyle="#e9475f"; ctx.fillRect(x,y+12,w*Math.max(0,b.hp/b.max),10);
        ctx.fillStyle="#ffe066"; ctx.font='16px "Black Han Sans","Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.textBaseline="alphabetic"; ctx.fillText(b.name,W/2,y+9); y+=36 });
      if(g.bbuff){ const t=Math.ceil(g.bbuff.t); ctx.fillStyle="rgba(246,197,68,.92)"; const txt=`${g.bbuff.name} ${t}초 · 공격 ×${g.bbuff.dmg}`; ctx.font='15px "Do Hyeon",sans-serif';
        const tw=ctx.measureText(txt).width+20; ctx.fillRect(12,H-44-(window.innerHeight>0?0:0),tw,28); ctx.fillStyle="#2a1d00"; ctx.textAlign="left"; ctx.fillText(txt,22,H-25) } }
    // 조이스틱
    if(joy.on){ ctx.strokeStyle="rgba(37,33,27,.25)"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(joy.ox,joy.oy,50,0,7); ctx.stroke();
      const dx=joy.x-joy.ox, dy=joy.y-joy.oy, d=Math.hypot(dx,dy), k=d>50?50/d:1;
      ctx.fillStyle="rgba(37,33,27,.3)"; ctx.beginPath(); ctx.arc(joy.ox+dx*k,joy.oy+dy*k,22,0,7); ctx.fill() }
    // HUD
    $(".gxp i").style.width = (g.xp/g.need*100)+"%";
    $(".ghp i").style.width = (Math.max(0,P.hp)/s.maxHp*100)+"%";
    if(!g.hudT||g.t-g.hudT>.15){ g.hudT=g.t;
      const atk=s.dmg*(g.buff?g.buff.mul:1)*(g.bbuff?g.bbuff.dmg:1)*(F.combo?1+.06*g.combo:1);
      $(".ghpt").textContent=`${Math.ceil(Math.max(0,P.hp))} / ${Math.round(s.maxHp)}`;
      $(".gs.atk b").textContent="×"+atk.toFixed(2); $(".gs.spd b").textContent=Math.round(s.spd); $(".gs.cdr b").textContent=Math.round(100/s.cd)+"%";
      $(".gs.atk").classList.toggle("up",atk>1.001+0); 
      const key=Object.entries(g.sk).map(([k,v])=>k+v).join(",");
      if(key!==g.sklKey){ g.sklKey=key; $(".gskl").innerHTML=Object.keys(g.sk).map(k=>`<span>${skImg(k,22)}<b>${g.sk[k]}</b></span>`).join("") } }
    $(".glv").textContent="Lv "+g.lvl; { const sn=Math.min(4,g.stageN), nx=Math.max(0,Math.ceil(g.nextBossT-g.t)); $(".gtime").textContent=`${fmtT(g.t)} · ${starStr(sn)} · ${sn>=4?"클리어!":g.bossUp?((STAGE_TIER[sn]||{tn:"최종 보스"}).tn)+" 전투!":`다음 보스 ${nx}초`}` } $(".gk").textContent="몬스터 "+g.kills;
  }

  let last=performance.now(), raf=0;
  function loop(now){
    const dt=Math.min(.05,(now-last)/1000); last=now; if(!g.over&&!g.paused) perfTick((now-(loop.p||now))/1000||dt); loop.p=now;
    if(!g.over && (!g.paused || NM) && !(NM==="host" && allChoosing())) update(dt);
    if(NM && !g.over) netTick(dt);
    draw();
    raf=requestAnimationFrame(loop);
  }

  raf=requestAnimationFrame(loop);
  showBanner(`${MAP.name} · ${MAP.diff} · 경험치 ×${MAP.exp} · 화면을 끌어서 움직여요`); sfx("start"); SND.bgm("m"+MAP.id);
}
