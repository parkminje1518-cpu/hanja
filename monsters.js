/* ===== 맵별 몬스터와 보스 (우리 앱만의 몬스터) ===== */
const SIZE = { small:{r:9,hp:7,sp:110,dmg:5,xp:1}, normal:{r:13,hp:12,sp:62,dmg:6,xp:1}, fast:{r:11,hp:10,sp:98,dmg:6,xp:1},
  tough:{r:16,hp:30,sp:55,dmg:9,xp:2}, big:{r:24,hp:75,sp:44,dmg:12,xp:4} };
/* from: 몇 초부터 나오는지 · w: 나오는 비율 */
const MOBS = {
  1:[ {look:"slime",  name:"독풀 슬라임", size:"normal", from:0,  w:5, c:"#3a7a1a", v:["#3a7a1a","#2a8a6a","#6a8a1a"]},
      {look:"flower", name:"식인꽃",     size:"normal", from:0,  w:3, c:"#e8508a", v:["#e8508a","#e8783a","#a85ad8"]},
      {look:"ladybug",name:"무당벌레",   size:"small",  from:10, w:3, hv:[0,30,-40]},
      {look:"moth",   name:"독나방",     size:"fast",   from:25, w:3, hv:[0,60,-60]},
      {look:"bee",    name:"꿀벌 병정",  size:"fast",   from:45, w:2},
      {look:"snail",  name:"가시 달팽이",size:"big",    from:80, w:1} ],
  2:[ {look:"mushroom",name:"독버섯",   size:"normal", from:0,  w:5, c:"#a8302a", v:["#a8302a","#6a2a8a","#2a5aa8"]},
      {look:"acorn",   name:"도토리 병정",size:"small",  from:0,  w:3},
      {look:"fox",     name:"불꽃 여우",    size:"fast",   from:20, w:3, hv:[0,-25]},
      {look:"stump",   name:"성난 그루터기",size:"tough",from:40, w:2},
      {look:"beetle",  name:"장수풍뎅이",size:"tough",  from:60, w:2, hv:[0,120,-80]},
      {look:"boar",    name:"아기 멧돼지", size:"big",    from:85, w:1} ],
  3:[ {look:"wisp",   name:"보라 도깨비불",   size:"fast",   from:0,  w:4, hv:[0,60,-50]},
      {look:"jar",    name:"금 간 항아리",size:"normal", from:0,  w:4},
      {look:"mummy",  name:"미라",  size:"normal", from:20, w:3},
      {look:"cobra",  name:"모래 코브라",size:"normal",   from:35, w:3},
      {look:"scorpion",name:"작은 전갈", size:"tough",  from:55, w:2, hv:[0,-30]},
      {look:"turtle", name:"돌 거북",    size:"big",    from:80, w:1} ],
  4:[ {look:"bat",    name:"동굴 박쥐",  size:"fast",   from:0,  w:5, hv:[0,40,-40]},
      {look:"crystal",name:"수정 요정",  size:"normal", from:0,  w:3, hv:[0,70,140]},
      {look:"wraith", name:"동굴 망령",  size:"fast",   from:20, w:3},
      {look:"mole",   name:"두더지 광부",size:"normal", from:35, w:3},
      {look:"spider", name:"동굴 거미",  size:"tough",  from:55, w:2},
      {look:"troll",  name:"동굴 트롤",  size:"big",    from:80, w:1} ],
  5:[ {look:"imp",      name:"뿔 달린 작은 마귀", size:"normal", from:0,  w:4, c:"#3a1424"},
      {look:"skeleton", name:"해골 병사", size:"normal", from:0,  w:4},
      {look:"fireimp",  name:"불꽃 임프", size:"fast",   from:15, w:3, c:"#a8281a"},
      {look:"hound",    name:"불꽃 사냥개",size:"tough", from:35, w:2},
      {look:"lavaslime",name:"용암 슬라임",size:"tough", from:50, w:2},
      {look:"knight",   name:"마왕성 흑기사",size:"big", from:75, w:1} ],
  6:[ {look:"gale",   name:"바람 정령", size:"fast",   from:0,  w:4},
      {look:"crow",   name:"폭풍 까마귀", size:"normal", from:0,  w:4, hv:[0,-30]},
      {look:"jelly",  name:"번개 해파리", size:"fast",   from:15, w:3, hv:[0,50]},
      {look:"stormeye",name:"먹구름 속 눈알",  size:"tough",  from:40, w:2},
      {look:"cloudgiant",name:"먹구름 거인",size:"big",  from:75, w:1} ],
  7:[ {look:"sentinel",name:"금빛 갑옷 병사",size:"normal", from:0,  w:4},
      {look:"mask",    name:"날개 달린 황금 가면",  size:"fast",   from:0,  w:3},
      {look:"orb",     name:"빛나는 구슬",size:"fast",   from:15, w:3},
      {look:"gargoyle",name:"돌 가고일",size:"tough",  from:40, w:2},
      {look:"colossus",name:"석상 거인",  size:"big",    from:70, w:1} ],
  8:[ {look:"icesprite",name:"얼음 정령",  size:"fast",   from:0,  w:4},
      {look:"frostwolf",name:"새끼 서리 늑대",size:"normal",from:0, w:4},
      {look:"yetiling", name:"꼬마 설인",  size:"tough",  from:30, w:2},
      {look:"crystal",  name:"얼음 수정",  size:"normal", from:45, w:2, hv:[0,-60]},
      {look:"frostwolf",name:"서리 늑대",  size:"big",    from:75, w:1} ],
  9:[ {look:"griffin",  name:"그리핀 수호병",size:"normal", from:0,  w:4},
      {look:"medusa",   name:"메두사 궁수",  size:"fast",   from:0,  w:4},
      {look:"minotaur", name:"미노타우로스 돌격병",size:"tough", from:30, w:3},
      {look:"titan",    name:"타이탄의 후예",size:"big",    from:70, w:1} ],
  10:[ {look:"rider",   name:"보이드 라이더",size:"normal",from:0, w:4},
      {look:"engine",   name:"블랙홀 엔진",size:"fast",   from:0,  w:4},
      {look:"devourer", name:"차원 포식자",size:"fast",   from:25, w:3},
      {look:"ruler",    name:"심연의 지배자",size:"tough", from:45, w:2},
      {look:"behemoth", name:"공허의 거수",size:"big",    from:75, w:1} ],
};

/* 보스: ai 는 보스 패턴, buff 는 처치하면 받는 버프 */
const BOSSES = {
  slimeking:{ look:"slime", name:"꽃왕관 슬라임 왕", r:48, hp:1700, sp:52, dmg:16, c:"#3a8a2a", crown:"flower", ai:["stomp","ring","summon","rage"], minion:0,
    buff:{name:"꽃의 축복", dmg:1.3, spd:1.15, regen:2} },
  mushking:{ look:"mushroom", name:"숲의 대왕 버섯", r:52, hp:2300, sp:50, dmg:18, c:"#8a2a1a", crown:"gold", ai:["spore","stomp","rage","orbs","summon"], minion:0,
    buff:{name:"숲의 기운", dmg:1.35, spd:1.2, regen:2} },
  golemking:{ look:"haetae", name:"유적의 수호 해태", r:56, hp:3100, sp:48, dmg:22, crown:"none", ai:["rock","dash","meteor","stomp","rage"], minion:2,
    buff:{name:"고대의 힘", dmg:1.45, spd:1.15, regen:3} },
  batqueen:{ look:"bat", name:"어둠 박쥐 여왕", r:50, hp:3600, sp:70, dmg:24, crown:"gold", ai:["dash","orbs","laser","summon","rage"], minion:0,
    buff:{name:"밤의 날개", dmg:1.5, spd:1.3, regen:3} },
  littledemon:{ look:"demon", name:"꼬마 화염 마왕", r:46, hp:3600, sp:60, dmg:26, c:"#c63a3a", crown:"horn", ai:["fire3","meteor","rage","ring","summon"], minion:1,
    buff:{name:"불꽃 투지", dmg:1.5, spd:1.2, regen:3} },
  crimsondemon:{ look:"demon", name:"진홍 화염 마왕", r:64, hp:7800, sp:56, dmg:34, c:"#8a1424", crown:"horn", big:true, ai:["fire5","laser","meteor","rage","orbs","ring","summon"], minion:2,
    buff:{name:"마왕을 이긴 용사", dmg:1.8, spd:1.3, regen:5} },
  forestkeeper:{ look:"elder", name:"천년 고목 「숲지기」", r:66, hp:2600, sp:44, dmg:20, crown:"none", big:true, ai:["meteor","ring","orbs","laser","summon","rage"], minion:0, ground:true,
    sn:{meteor:"뿌리 솟구치기",ring:"잎사귀 폭풍",orbs:"씨앗 폭탄",laser:"덩굴 채찍",summon:"숲의 부름"}, shotCol:"#7ad84a", shotKind:"spore", orbCol:"#c8a040", boomCol:"#6ab83a",
    buff:{name:"숲의 축복", dmg:1.4, spd:1.2, regen:3} },
  imugi:{ look:"imugi", name:"천년 이무기 「아스라」", r:66, hp:4000, sp:62, dmg:26, crown:"none", big:true, ai:["laser","ring","meteor","dash","orbs","rage"], minion:0, ground:true,
    sn:{laser:"여의주 광선",ring:"똬리 휘감기",meteor:"수정 가시",dash:"꼬리 휘두르기",orbs:"수정 구슬"}, shotCol:"#b88aff", orbCol:"#7ad8ff", boomCol:"#a88aff",
    deathMsg:"여의주가 깨졌어요! 이무기 아스라가 승천에 실패하고 물러났어요!", buff:{name:"여의주의 힘", dmg:1.55, spd:1.3, regen:3} },
  skyasura:{ look:"imugi", name:"승천한 아스라", r:72, hp:12000, sp:66, dmg:46, crown:"none", big:true, ai:["laser","spiral","meteor","dash"], minion:0, shotCol:"#9ae0ff", orbCol:"#bff0ff", boomCol:"#bfe8ff",
    deathMsg:"아스라가 다시 여의주를 잃었어요! 하지만 언젠가 또 만날지도…", buff:{name:"용의 축복", dmg:2.0, spd:1.35, regen:6} },
  thundergod:{ look:"gatekeeper", name:"뇌신 장군", r:74, hp:14000, sp:58, dmg:50, crown:"none", big:true, ai:["meteor","cross","laser","stomp"], minion:0, shotCol:"#d8b0ff", orbCol:"#ffe08a", boomCol:"#d0b0ff",
    buff:{name:"뇌신의 가호", dmg:2.1, spd:1.35, regen:6} },
  astraka:{ look:"demon", name:"성좌의 종언신 아스트라카", r:80, hp:17000, sp:60, dmg:56, crown:"none", big:true, ai:["pull","laser","cross","spiral"], minion:0, shotCol:"#c88aff", orbCol:"#ff8ad8", boomCol:"#b080ff",
    deathMsg:"우주의 종언을 막아 냈어요! 진정한 하늘의 영웅이에요!", buff:{name:"별의 영웅", dmg:2.3, spd:1.4, regen:8} },
  cheonpung:{ look:"cheonpung", name:"폭풍군주 천풍", r:70, hp:8600, sp:66, dmg:38, crown:"none", big:true, ai:["dash","ring","orbs","laser","meteor","rage","summon"], minion:0,
    buff:{name:"폭풍의 날개", dmg:1.85, spd:1.35, regen:5} },
  gatekeeper:{ look:"gatekeeper", name:"하늘성 수문장", r:68, hp:10200, sp:56, dmg:42, crown:"none", big:true, ai:["stomp","laser","fire5","dash","meteor","rage","summon"], minion:0,
    buff:{name:"수문장의 빛", dmg:1.95, spd:1.3, regen:6} },
};
const MAP_BOSSES = { 8:[[60,"skyasura"]], 9:[[60,"thundergod"]], 10:[[60,"astraka"]], 6:[[60,"cheonpung"]], 7:[[60,"gatekeeper"]], 1:[[80,"slimeking"],[160,"slimeking"],[240,"slimeking"]], 2:[[70,"mushking"],[150,"mushking"],[230,"mushking"]], 3:[[65,"golemking"],[140,"golemking"],[215,"golemking"],[275,"golemking"]],
  4:[[55,"batqueen"],[125,"batqueen"],[195,"batqueen"],[265,"batqueen"]], 5:[[45,"littledemon"],[105,"littledemon"],[165,"crimsondemon"],[220,"littledemon"],[270,"crimsondemon"]] };

/* ===== 스테이지 보스 4마리: 약한 보스 → 중간 보스 → 강한 보스 → 최종 보스 =====
   앞의 셋은 그 맵 몬스터의 우두머리, 마지막은 그 맵의 진짜 보스예요. 최종 보스를 잡으면 스테이지 클리어! */
const STAGE_LOOKS = {
  1:[["snail","왕 달팽이"],["bee","꿀벌 여왕"],["slime","독풀 슬라임 장군","#2a6a1a"],"slimeking"],
  2:[["acorn","도토리 병정 대장"],["boar","숲의 멧돼지 왕"],["mushroom","숲의 대왕 버섯","#8a2a1a"],"forestkeeper"],
  3:[["jar","항아리 대장"],["scorpion","거대 모래 전갈"],["turtle","고대 돌 거북"],"golemking"],
  4:[["crystal","수정 정령왕"],["spider","독거미 여왕"],["bat","어둠 박쥐 여왕"],"imugi"],
  5:[["hound","지옥 사냥개 우두머리"],["knight","흑기사 단장"],["demon","꼬마 화염 마왕","#c63a3a"],"crimsondemon"],
  6:[["gale","회오리 정령왕"],["cloudgiant","먹구름 대거인"],["stormeye","폭풍의 눈 군주"],"cheonpung"],
  7:[["mask","황금 가면 감시자"],["gargoyle","가고일 대장"],["colossus","하늘성 석상 거인"],"gatekeeper"],
  8:[["frostwolf","서리 늑대 우두머리"],["yetiling","설인 거인"],["icesprite","빙결 마녀"],"skyasura"],
  9:[["lioncub","신전 석사자"],["drumling","번개 북동자"],["colt","천둥 기린"],"thundergod"],
  10:[["voidling","공허의 지옥 성마"],["nebula","성운의 인도자"],["comet","성좌의 천체 마법사"],"astraka"],
};
const STAGE_TIER = [
  {hp:.26,r:48,dmg:.72,sp:1.1, ai:["stomp","summon","rage"], crown:"none", tn:"약한 보스"},
  {hp:.46,r:56,dmg:.84,sp:1.05,ai:["dash","orbs","stomp","summon","rage"], crown:"none", tn:"중간 보스"},
  {hp:.72,r:64,dmg:.95,sp:1,   ai:["dash","ring","meteor","orbs","rage","summon"], crown:"none", tn:"강한 보스"} ];
const STAGE = {};
function buildStage(){ for(const m in STAGE_LOOKS){ const L=STAGE_LOOKS[m], fin=BOSSES[L[3]];
  STAGE[m]=L.map((x,i)=>{ const key="st"+m+"_"+i;
    if(i===3) BOSSES[key]=Object.assign({},fin,{tier:3,map:+m,tn:"최종 보스",hp:Math.round(fin.hp*.9)});
    else { const T=STAGE_TIER[i]; BOSSES[key]={look:x[0],name:x[1],c:x[2],r:T.r,hp:Math.round(fin.hp*T.hp),sp:fin.sp*T.sp,dmg:Math.round(fin.dmg*T.dmg),crown:T.crown,ai:T.ai,minion:0,tier:i,map:+m,tn:T.tn,
      buff:{name:"보스를 이긴 기운",dmg:1.2+.1*i,spd:1.1,regen:2+i}} }
    return key }) } }
buildStage();

/* ---------- 그림: 귀엽고 둥글둥글, 빛과 그림자로 입체감 ---------- */
function _mix(c,amt){ if(c[0]!=="#") return c; const n=parseInt(c.slice(1),16); let r=n>>16,g=n>>8&255,b=n&255; const T=amt>0?255:0, p=Math.abs(amt);
  return `rgb(${Math.round(r+(T-r)*p)},${Math.round(g+(T-g)*p)},${Math.round(b+(T-b)*p)})` }
function _G(ctx,e,x,y,rx,ry,col){ col=e.flash>0?"#ffffff":col; const g=ctx.createRadialGradient(x-rx*.35,y-ry*.45,Math.min(rx,ry)*.08,x,y,Math.max(rx,ry)*1.05);
  g.addColorStop(0,_mix(col,.32)); g.addColorStop(.45,col); g.addColorStop(1,_mix(col,-.6)); return g }
const RIM={1:"170,255,90",2:"255,180,60",3:"255,110,255",4:"110,210,255",5:"255,110,40",6:"120,230,255",7:"255,220,120",8:"170,235,255",9:"255,215,110",10:"190,130,255"};
function _tex(ctx,e,x,y,rx,ry,rot){ if(e.flash>0||rx<5) return; ctx.save(); ctx.beginPath(); ctx.ellipse(x,y,rx,ry,rot||0,0,7); ctx.clip();
  const ao=ctx.createLinearGradient(0,y-ry,0,y+ry); ao.addColorStop(0,"rgba(0,0,0,0)"); ao.addColorStop(.55,"rgba(0,0,0,0)"); ao.addColorStop(1,"rgba(0,0,0,.35)"); ctx.fillStyle=ao; ctx.fillRect(x-rx,y-ry,rx*2,ry*2);
  const sd=(e.wob*1000|0)+Math.round(rx*7);
  for(let i=0;i<9;i++){ const a=mhash(sd,i,3)*Math.PI*2, d=Math.sqrt(mhash(sd,i,4))*.85, z=Math.max(1.2,rx*(.05+mhash(sd,i,5)*.06));
    ctx.fillStyle=i%3?"rgba(0,0,0,.2)":"rgba(255,255,255,.14)"; ctx.beginPath(); ctx.ellipse(x+Math.cos(a)*rx*d,y+Math.sin(a)*ry*d,z,z*.8,0,0,7); ctx.fill() }
  ctx.restore() }
function _blob(ctx,e,x,y,rx,ry,col,rot){ ctx.fillStyle=_G(ctx,e,x,y,rx,ry,col); ctx.beginPath(); ctx.ellipse(x,y,rx,ry,rot||0,0,7); ctx.fill(); _tex(ctx,e,x,y,rx,ry,rot); ctx.beginPath(); ctx.ellipse(x,y,rx,ry,rot||0,0,7); _ol(ctx);
  ctx.strokeStyle=`rgba(${RIM[e.mapId]||"255,120,80"},.6)`; ctx.lineWidth=1.6; ctx.beginPath(); ctx.ellipse(x,y,rx*.9,ry*.9,rot||0,-.15*Math.PI,.55*Math.PI); ctx.stroke() }
function _ol(ctx,w){ ctx.strokeStyle="rgba(8,2,12,.9)"; ctx.lineWidth=w||2.1; ctx.stroke() }
function _hl(ctx,x,y,rx,ry,a){ ctx.fillStyle=`rgba(255,255,255,${(a||.6)*.5})`; ctx.beginPath(); ctx.ellipse(x,y,rx,ry,-.5,0,7); ctx.fill() }
function _C(e,c){ return e.flash>0?"#ffffff":c }
/* 어둠 속에서 빛나는 날카로운 눈 + 찌푸린 눈썹 + 송곳니 */
const EYE_GLOW={1:"#d6ff3a",2:"#ffb020",3:"#ff4aff",4:"#ff3a4a",5:"#ff7a1a",6:"#5af0ff",7:"#ffd23a",8:"#3ad8ff",9:"#ffe23a",10:"#d07aff"};
/* 눈 모양을 몬스터마다 다르게: beady(작은 빛나는 눈) · compound(곤충 겹눈) · hollow(유령의 빈 눈구멍) · cyclops(외눈) */
const FACE_STYLE={ladybug:"compound",bee:"compound",spider:"compound",scorpion:"compound",beetle:"compound",moth:"compound",
  snail:"beady",acorn:"beady",turtle:"beady",crow:"beady",mole:"beady",cobra:"beady",fox:"beady",
  wisp:"hollow",gale:"hollow",wraith:"hollow",mummy:"hollow",skeleton:"hollow",jelly:"hollow",
  crystal:"cyclops",stormeye:"cyclops",orb:"cyclops"};
function _faceAlt(ctx,e,t,px,py,y,gap,s,o,st){ const sh=o.shift||0, col=EYE_GLOW[e.mapId]||"#ff3a4a", dx=px-e.x, dy=py-e.y, d=Math.hypot(dx,dy)||1, lx=dx/d*s*.3, ly=dy/d*s*.2, fl=.75+.25*Math.sin(t*5+e.wob);
  if(st==="beady"){ [-1,1].forEach(si=>{ const x=e.x+si*gap*.85+sh; const g=ctx.createRadialGradient(x,y,0,x,y,s*1.6); g.addColorStop(0,col+"cc"); g.addColorStop(1,col+"00"); ctx.globalAlpha=fl; ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,s*1.6,0,7); ctx.fill(); ctx.globalAlpha=1;
      ctx.fillStyle="#0a0408"; ctx.beginPath(); ctx.arc(x,y,s*.62,0,7); ctx.fill(); ctx.fillStyle=e.flash>0?"#fff":col; ctx.beginPath(); ctx.arc(x+lx*.4,y+ly*.4,s*.38,0,7); ctx.fill(); ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(x+lx*.4-s*.12,y+ly*.4-s*.12,s*.11,0,7); ctx.fill() }); return }
  if(st==="compound"){ [-1,1].forEach(si=>{ const x=e.x+si*gap+sh; ctx.fillStyle="#120406"; ctx.beginPath(); ctx.ellipse(x,y,s*1.05,s*.85,si*.35,0,7); ctx.fill();
      for(let k=0;k<7;k++){ const a=k*.9, rr=k?s*.45:0; ctx.fillStyle=e.flash>0?"#fff":(k%2?col:col+"aa"); ctx.beginPath(); ctx.arc(x+Math.cos(a)*rr,y+Math.sin(a)*rr*.8,s*.24,0,7); ctx.fill() }
      ctx.fillStyle="rgba(255,255,255,.7)"; ctx.beginPath(); ctx.arc(x-s*.35,y-s*.35,s*.13,0,7); ctx.fill() }); return }
  if(st==="hollow"){ [-1,1].forEach(si=>{ const x=e.x+si*gap+sh; ctx.fillStyle="#05020c"; ctx.beginPath(); ctx.ellipse(x,y,s*.75,s*1.05,si*.2,0,7); ctx.fill();
      const g=ctx.createRadialGradient(x+lx*.3,y+s*.2,0,x+lx*.3,y+s*.2,s*.7); g.addColorStop(0,col); g.addColorStop(1,col+"00"); ctx.globalAlpha=fl; ctx.fillStyle=e.flash>0?"#fff":g; ctx.beginPath(); ctx.arc(x+lx*.3,y+s*.2,s*.7,0,7); ctx.fill(); ctx.globalAlpha=1 });
    if(o.mouth!=="none"){ ctx.fillStyle="#05020c"; ctx.beginPath(); ctx.ellipse(e.x+sh,y+s*1.7,s*.55,s*.75*(.8+.2*Math.sin(t*3+e.wob)),0,0,7); ctx.fill() } return }
  if(st==="cyclops"){ const x=e.x+sh, R=s*1.25; const g=ctx.createRadialGradient(x,y,0,x,y,R*2); g.addColorStop(0,col+"aa"); g.addColorStop(1,col+"00"); ctx.globalAlpha=fl; ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,R*2,0,7); ctx.fill(); ctx.globalAlpha=1;
    ctx.fillStyle="#f4ecf4"; ctx.beginPath(); ctx.ellipse(x,y,R,R*.75,0,0,7); ctx.fill(); ctx.fillStyle=e.flash>0?"#fff":col; ctx.beginPath(); ctx.arc(x+lx,y+ly,R*.5,0,7); ctx.fill(); ctx.fillStyle="#08020a"; ctx.beginPath(); ctx.ellipse(x+lx,y+ly,R*.12,R*.42,0,0,7); ctx.fill();
    ctx.strokeStyle="#0c0208"; ctx.lineWidth=R*.25; ctx.beginPath(); ctx.moveTo(x-R*1.1,y-R*.6); ctx.quadraticCurveTo(x,y-R*.25,x+R*1.1,y-R*.6); ctx.stroke(); return } }
function _face(ctx,e,t,px,py,y,gap,s,o){ o=o||{}; const st=o.style||FACE_STYLE[e.look]; if(st && e.type!=="boss"){ _faceAlt(ctx,e,t,px,py,y,gap,s,o,st); return } const sh=o.shift||0, col=EYE_GLOW[e.mapId]||"#ff3a4a";
  const dx=px-e.x, dy=py-e.y, d=Math.hypot(dx,dy)||1, lx=dx/d*s*.25, ly=dy/d*s*.12, fl=.7+.3*Math.sin(t*6+e.wob);
  [-1,1].forEach(si=>{ const x=e.x+si*gap+sh;
    ctx.fillStyle="rgba(8,0,8,.6)"; ctx.beginPath(); ctx.ellipse(x,y,s*1.4,s*1.0,-si*.3,0,7); ctx.fill();
    const g=ctx.createRadialGradient(x,y,0,x,y,s*2.3); g.addColorStop(0,col+"bb"); g.addColorStop(1,col+"00"); ctx.globalAlpha=fl; ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,s*2.3,0,7); ctx.fill(); ctx.globalAlpha=1;
    ctx.fillStyle=e.flash>0?"#fff":col; ctx.beginPath(); ctx.moveTo(x-si*s*1.15,y+s*.25); ctx.quadraticCurveTo(x-si*s*.1,y-s*.45,x+si*s*1.2,y-s*.6); ctx.quadraticCurveTo(x+si*s*.2,y+s*.55,x-si*s*1.15,y+s*.25); ctx.fill();
    ctx.fillStyle="rgba(255,250,220,.9)"; ctx.beginPath(); ctx.ellipse(x+lx*.4,y-s*.08,s*.5,s*.18,si*-.45,0,7); ctx.fill();
    ctx.fillStyle="#140206"; ctx.beginPath(); ctx.ellipse(x+lx,y-s*.08+ly,s*.13,s*.42,0,0,7); ctx.fill();
    ctx.strokeStyle="#0c0208"; ctx.lineWidth=Math.max(1.8,s*.5); ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(x-si*s*1.1,y-s*.55); ctx.lineTo(x+si*s*1.5,y-s*1.35); ctx.stroke(); ctx.lineCap="butt" });
  if(o.mouth==="none") return;
  const my=y+s*(o.my||1.75), mx=e.x+sh, w=s*1.55;
  ctx.fillStyle="#22040c"; ctx.beginPath(); ctx.moveTo(mx-w,my-s*.25); ctx.quadraticCurveTo(mx,my+s*.2,mx+w,my-s*.25); ctx.quadraticCurveTo(mx,my+s*1.15,mx-w,my-s*.25); ctx.fill();
  ctx.fillStyle="#8a1428"; ctx.beginPath(); ctx.ellipse(mx,my+s*.48,w*.42,s*.18,0,0,7); ctx.fill();
  ctx.fillStyle="#f2e8d2"; for(let k=0;k<4;k++){ const tx=mx-w*.78+k*(w*1.56/3), h=(k===0||k===3)?s*.7:s*.38; ctx.beginPath(); ctx.moveTo(tx-s*.17,my-s*.14); ctx.lineTo(tx,my-s*.14+h); ctx.lineTo(tx+s*.17,my-s*.14); ctx.fill() }
  for(let k=0;k<2;k++){ const tx=mx-w*.32+k*w*.64; ctx.beginPath(); ctx.moveTo(tx-s*.14,my+s*.62); ctx.lineTo(tx,my+s*.3); ctx.lineTo(tx+s*.14,my+s*.62); ctx.fill() }
}
function _spk(ctx,e,cx,cy,R,a0,a1,n,len,col){ ctx.fillStyle=_C(e,col); for(let k=0;k<n;k++){ const a=a0+(a1-a0)*(n>1?k/(n-1):.5), w=.16;
  ctx.beginPath(); ctx.moveTo(cx+Math.cos(a-w)*R,cy+Math.sin(a-w)*R); ctx.lineTo(cx+Math.cos(a)*(R+len),cy+Math.sin(a)*(R+len)); ctx.lineTo(cx+Math.cos(a+w)*R,cy+Math.sin(a+w)*R); ctx.fill(); _ol(ctx,1) } }
function _shadow(ctx,e){ ctx.fillStyle="rgba(0,0,0,.2)"; ctx.beginPath(); ctx.ellipse(e.x,e.y+e.r*.9,e.r*.95,e.r*.3,0,0,7); ctx.fill() }
const LOOKS = {
  slime(ctx,e,t,px,py){ const r=e.r, sq=Math.sin(t*7+e.wob)*.08, c=e.c||"#6fcf5a";
    ctx.fillStyle=_G(ctx,e,e.x,e.y+r*.1,r*1.05,r,c); ctx.beginPath(); ctx.moveTo(e.x-r*(1.08+sq),e.y+r*.78); ctx.bezierCurveTo(e.x-r*1.2,e.y-r*.3,e.x-r*.6,e.y-r*(1.05-sq),e.x,e.y-r*(1.05-sq)); ctx.bezierCurveTo(e.x+r*.6,e.y-r*(1.05-sq),e.x+r*1.2,e.y-r*.3,e.x+r*(1.08+sq),e.y+r*.78); ctx.quadraticCurveTo(e.x,e.y+r*.98,e.x-r*(1.08+sq),e.y+r*.78); ctx.fill(); _ol(ctx);
    _hl(ctx,e.x-r*.45,e.y-r*.5,r*.25,r*.14); ctx.fillStyle=_C(e,c); for(let k=0;k<3;k++){ const dx=(k-1)*r*.6, dl=r*(.25+.2*Math.abs(Math.sin(t*2+k+e.wob))); ctx.beginPath(); ctx.moveTo(e.x+dx-r*.12,e.y+r*.8); ctx.quadraticCurveTo(e.x+dx,e.y+r*.8+dl*1.6,e.x+dx+r*.12,e.y+r*.8); ctx.fill() }
    ctx.fillStyle=_C(e,"#2a5a1a"); ctx.beginPath(); ctx.ellipse(e.x+r*.15,e.y-r*1.12,r*.3,r*.12,-.7,0,7); ctx.fill(); ctx.beginPath(); ctx.ellipse(e.x-r*.12,e.y-r*1.1,r*.22,r*.1,.7,0,7); ctx.fill();
    _face(ctx,e,t,px,py,e.y+r*.02,r*.36,r*.24) },
  ladybug(ctx,e,t,px,py){ const r=e.r;
    _blob(ctx,e,e.x,e.y-r*.62,r*.62,r*.5,"#140a16");
    ctx.strokeStyle="#140a16"; ctx.lineWidth=1.5; [-1,1].forEach(s=>{ ctx.beginPath(); ctx.moveTo(e.x+s*r*.2,e.y-r*1.05); ctx.quadraticCurveTo(e.x+s*r*.4,e.y-r*1.5,e.x+s*r*.6,e.y-r*1.45); ctx.stroke(); ctx.fillStyle="#140a16"; ctx.beginPath(); ctx.arc(e.x+s*r*.62,e.y-r*1.45,r*.1,0,7); ctx.fill() });
    _spk(ctx,e,e.x,e.y+r*.12,r*.9,-Math.PI*.85,-Math.PI*.15,4,r*.3,"#140a16");
    _blob(ctx,e,e.x,e.y+r*.12,r*1.0,r*.85,"#a8142a"); ctx.strokeStyle="rgba(40,22,48,.6)"; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(e.x,e.y-r*.7); ctx.lineTo(e.x,e.y+r*.95); ctx.stroke();
    ctx.fillStyle="#140a16"; [[-.5,0],[.5,0],[-.4,.5],[.4,.5],[0,.75]].forEach(([a,b])=>{ ctx.beginPath(); ctx.arc(e.x+a*r,e.y+b*r,r*.15,0,7); ctx.fill() });
    _hl(ctx,e.x-r*.45,e.y-r*.3,r*.22,r*.12);
    _face(ctx,e,t,px,py,e.y-r*.66,r*.22,r*.17,{blush:true,my:1.3,mouth:"cat"}) },
  bee(ctx,e,t,px,py){ const r=e.r, fl=Math.abs(Math.sin(t*30+e.wob));
    ctx.fillStyle="rgba(230,245,255,.8)"; [-1,1].forEach(s=>{ ctx.beginPath(); ctx.ellipse(e.x+s*r*.5,e.y-r*.9,r*.42,r*(.22+fl*.25),s*.5,0,7); ctx.fill(); ctx.strokeStyle="rgba(120,160,220,.7)"; ctx.lineWidth=1; ctx.stroke() });
    ctx.fillStyle=_C(e,"#140a16"); ctx.beginPath(); ctx.moveTo(e.x+r*1.0,e.y+r*.05); ctx.lineTo(e.x+r*1.4,e.y+r*.18); ctx.lineTo(e.x+r*1.0,e.y+r*.32); ctx.fill();
    _blob(ctx,e,e.x,e.y,r*1.12,r*.92,"#e89018");
    ctx.save(); ctx.beginPath(); ctx.ellipse(e.x,e.y,r*1.12,r*.92,0,0,7); ctx.clip(); ctx.fillStyle="rgba(42,34,56,.85)"; ctx.fillRect(e.x+r*.25,e.y-r,r*.24,r*2); ctx.fillRect(e.x+r*.72,e.y-r,r*.24,r*2); ctx.restore();
    ctx.strokeStyle="#140a16"; ctx.lineWidth=1.4; [-1,1].forEach(s=>{ ctx.beginPath(); ctx.moveTo(e.x-r*.2+s*r*.18,e.y-r*.8); ctx.lineTo(e.x-r*.2+s*r*.35,e.y-r*1.3); ctx.stroke(); ctx.fillStyle="#140a16"; ctx.beginPath(); ctx.arc(e.x-r*.2+s*r*.35,e.y-r*1.32,r*.09,0,7); ctx.fill() });
    _hl(ctx,e.x-r*.5,e.y-r*.4,r*.24,r*.12);
    _face(ctx,e,t,px,py,e.y-r*.05,r*.3,r*.22,{shift:-r*.25}) },
  snail(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, st=Math.sin(t*3+e.wob)*.06;
    ctx.fillStyle=_G(ctx,e,e.x,e.y+r*.5,r*1.3,r*.45,"#6a8a3a"); ctx.beginPath(); ctx.moveTo(e.x-f*r*1.2,e.y+r*.8); ctx.quadraticCurveTo(e.x,e.y+r*.95,e.x+f*r*1.3,e.y+r*.75); ctx.quadraticCurveTo(e.x+f*r*1.35,e.y-r*.2,e.x+f*r*.9,e.y-r*.15); ctx.lineTo(e.x-f*r*1.0,e.y+r*.35); ctx.closePath(); ctx.fill(); _ol(ctx);
    ctx.strokeStyle=_C(e,"#4a6a2a"); ctx.lineWidth=2.5; ctx.lineCap="round"; [.9,1.25].forEach((a,i)=>{ ctx.beginPath(); ctx.moveTo(e.x+f*r*(a-.05),e.y-r*.1); ctx.lineTo(e.x+f*r*(a+.1),e.y-r*(.8+st+i*.05)); ctx.stroke() }); ctx.lineCap="butt";
    [.98,1.36].forEach(a=>{ const col=EYE_GLOW[e.mapId]||"#d6ff3a", g=ctx.createRadialGradient(e.x+f*r*a,e.y-r*.88,0,e.x+f*r*a,e.y-r*.88,r*.4); g.addColorStop(0,col+"cc"); g.addColorStop(1,col+"00"); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(e.x+f*r*a,e.y-r*.88,r*.4,0,7); ctx.fill();
      ctx.fillStyle=col; ctx.beginPath(); ctx.arc(e.x+f*r*a,e.y-r*.88,r*.15,0,7); ctx.fill(); _ol(ctx,1); ctx.fillStyle="#140206"; ctx.fillRect(e.x+f*r*a-1,e.y-r*1.0,2,r*.24) });
    ctx.fillStyle="#22040c"; ctx.beginPath(); ctx.ellipse(e.x+f*r*1.15,e.y+r*.1,r*.2,r*.1,0,0,7); ctx.fill(); ctx.fillStyle="#f2e8d2"; for(let k=0;k<3;k++){ const tx=e.x+f*r*(1.02+k*.12); ctx.beginPath(); ctx.moveTo(tx-2,e.y+r*.04); ctx.lineTo(tx,e.y+r*.16); ctx.lineTo(tx+2,e.y+r*.04); ctx.fill() }
    _spk(ctx,e,e.x-f*r*.2,e.y-r*.1,r*.85,-Math.PI*.95,-Math.PI*.05,5,r*.4,"#c8b49a");
    _blob(ctx,e,e.x-f*r*.2,e.y-r*.1,r*.92,r*.88,"#6a3a1e");
    ctx.strokeStyle=_C(e,"#2a140a"); ctx.lineWidth=2.5; ctx.beginPath(); for(let a=0;a<13;a+=.25){ const rr=r*.78*(1-a/14); const x=e.x-f*r*.2+Math.cos(a)*rr*f, y=e.y-r*.1+Math.sin(a)*rr; a?ctx.lineTo(x,y):ctx.moveTo(x,y) } ctx.stroke();
    _hl(ctx,e.x-f*r*.5,e.y-r*.55,r*.25,r*.13) },
  mushroom(ctx,e,t,px,py){ const r=e.r, hop=Math.abs(Math.sin(t*6+e.wob))*r*.15, y=e.y-hop, c=e.c||"#8a1a3a";
    _blob(ctx,e,e.x,y+r*.42,r*.72,r*.62,"#c8b49a");
    _face(ctx,e,t,px,py,y+r*.35,r*.27,r*.2,{my:1.35});
    ctx.fillStyle=_G(ctx,e,e.x,y-r*.25,r*1.25,r*.85,c); ctx.beginPath(); ctx.moveTo(e.x-r*1.28,y+r*.02); ctx.bezierCurveTo(e.x-r*1.3,y-r*.9,e.x+r*1.3,y-r*.9,e.x+r*1.28,y+r*.02); ctx.quadraticCurveTo(e.x,y+r*.22,e.x-r*1.28,y+r*.02); ctx.fill(); _ol(ctx);
    ctx.fillStyle=e.flash>0?"#fff":"#d8c8a8"; [[-.65,-.25,.2],[.05,-.55,.24],[.65,-.2,.17],[-.2,-.1,.12]].forEach(([a,b,s])=>{ ctx.beginPath(); ctx.ellipse(e.x+a*r,y+b*r,r*s,r*s*.8,0,0,7); ctx.fill() });
    _hl(ctx,e.x-r*.55,y-r*.55,r*.22,r*.1,.45) },
  acorn(ctx,e,t,px,py){ const r=e.r;
    ctx.fillStyle=_G(ctx,e,e.x,e.y+r*.15,r*.88,r,"#8a5222"); ctx.beginPath(); ctx.moveTo(e.x-r*.88,e.y-r*.25); ctx.quadraticCurveTo(e.x-r*.9,e.y+r*.8,e.x,e.y+r*1.05); ctx.quadraticCurveTo(e.x+r*.9,e.y+r*.8,e.x+r*.88,e.y-r*.25); ctx.closePath(); ctx.fill(); _ol(ctx);
    _hl(ctx,e.x-r*.45,e.y+r*.05,r*.15,r*.28,.4);
    _face(ctx,e,t,px,py,e.y+r*.18,r*.32,r*.22);
    ctx.fillStyle=_G(ctx,e,e.x,e.y-r*.5,r*1.05,r*.5,"#3a1e0a"); ctx.beginPath(); ctx.ellipse(e.x,e.y-r*.32,r*1.02,r*.55,0,Math.PI,0); ctx.closePath(); ctx.fill(); _ol(ctx);
    ctx.strokeStyle="rgba(50,26,10,.6)"; ctx.lineWidth=1; for(let i=-2;i<=2;i++){ ctx.beginPath(); ctx.moveTo(e.x+i*r*.32-r*.12,e.y-r*.75); ctx.lineTo(e.x+i*r*.32+r*.12,e.y-r*.36); ctx.stroke() }
    ctx.fillStyle=_C(e,"#5a3416"); ctx.fillRect(e.x-1.5,e.y-r*1.12,3,r*.3); ctx.fillStyle=_C(e,"#2a5a1a"); ctx.beginPath(); ctx.ellipse(e.x+r*.25,e.y-r*1.05,r*.25,r*.1,-.4,0,7); ctx.fill() },
  stump(ctx,e,t,px,py){ const r=e.r, w=Math.sin(t*8+e.wob)*r*.08;
    ctx.fillStyle=_C(e,"#6a3e1a"); [-1,1].forEach(s=>{ ctx.beginPath(); ctx.ellipse(e.x+s*r*.6,e.y+r*.85+(s>0?w:-w),r*.32,r*.16,0,0,7); ctx.fill() });
    ctx.fillStyle=_G(ctx,e,e.x,e.y+r*.1,r*.9,r*.9,"#4a2e16"); ctx.beginPath(); ctx.moveTo(e.x-r*.88,e.y-r*.55); ctx.lineTo(e.x-r*.95,e.y+r*.75); ctx.quadraticCurveTo(e.x,e.y+r*.95,e.x+r*.95,e.y+r*.75); ctx.lineTo(e.x+r*.88,e.y-r*.55); ctx.closePath(); ctx.fill(); _ol(ctx);
    ctx.strokeStyle="rgba(70,40,15,.45)"; ctx.lineWidth=1.2; [-.45,.4].forEach(a=>{ ctx.beginPath(); ctx.moveTo(e.x+a*r,e.y-r*.4); ctx.lineTo(e.x+a*r*1.05,e.y+r*.6); ctx.stroke() });
    ctx.fillStyle=_C(e,"#8a6a3e"); ctx.beginPath(); ctx.ellipse(e.x,e.y-r*.55,r*.88,r*.3,0,0,7); ctx.fill(); _ol(ctx); ctx.strokeStyle="rgba(150,100,50,.7)"; ctx.lineWidth=1; ctx.beginPath(); ctx.ellipse(e.x,e.y-r*.55,r*.55,r*.18,0,0,7); ctx.stroke(); ctx.beginPath(); ctx.ellipse(e.x,e.y-r*.55,r*.25,r*.08,0,0,7); ctx.stroke();
    ctx.fillStyle=_C(e,"#2a5a1a"); ctx.beginPath(); ctx.ellipse(e.x+r*.35,e.y-r*.95,r*.3,r*.13,-.6,0,7); ctx.fill(); ctx.beginPath(); ctx.ellipse(e.x+r*.05,e.y-r*.92,r*.22,r*.1,.6,0,7); ctx.fill(); ctx.strokeStyle="#3a7a2a"; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(e.x+r*.2,e.y-r*.6); ctx.lineTo(e.x+r*.2,e.y-r*.9); ctx.stroke();
    _face(ctx,e,t,px,py,e.y+r*.08,r*.34,r*.22,{mouth:"o"}) },
  boar(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, run=Math.sin(t*12+e.wob)*r*.12;
    ctx.fillStyle=_C(e,"#5a3418"); [[-.6,run],[-.2,-run],[.3,run],[.65,-run]].forEach(([a,s])=>{ ctx.beginPath(); ctx.ellipse(e.x+a*r,e.y+r*.75+s,r*.17,r*.25,0,0,7); ctx.fill() });
    _blob(ctx,e,e.x,e.y,r*1.2,r*.9,"#4a2e1a");
    ctx.fillStyle=_C(e,"#6a4428"); for(let i=-2;i<=2;i++){ ctx.beginPath(); ctx.moveTo(e.x+i*r*.28-4,e.y-r*.8); ctx.lineTo(e.x+i*r*.28,e.y-r*1.08); ctx.lineTo(e.x+i*r*.28+4,e.y-r*.8); ctx.fill() }
    [-1,1].forEach(s=>{ ctx.fillStyle=_G(ctx,e,e.x+f*r*.35+s*r*.4,e.y-r*.75,r*.22,r*.22,"#4a2e1a"); ctx.beginPath(); ctx.moveTo(e.x+f*r*.35+s*r*.25,e.y-r*.6); ctx.lineTo(e.x+f*r*.35+s*r*.55,e.y-r*1.0); ctx.lineTo(e.x+f*r*.35+s*r*.6,e.y-r*.55); ctx.fill() });
    _hl(ctx,e.x-r*.5,e.y-r*.45,r*.3,r*.12,.4);
    _face(ctx,e,t,px,py,e.y-r*.25,r*.3,r*.2,{shift:f*r*.35,my:2.4,mouth:"none"});
    _blob(ctx,e,e.x+f*r*.45,e.y+r*.25,r*.36,r*.26,"#8a5a4a"); ctx.fillStyle="#6a2a2a"; ctx.beginPath(); ctx.ellipse(e.x+f*r*.37,e.y+r*.25,r*.06,r*.09,0,0,7); ctx.ellipse(e.x+f*r*.53,e.y+r*.25,r*.06,r*.09,0,0,7); ctx.fill();
    ctx.fillStyle="#fffaf0"; [-1,1].forEach(s=>{ ctx.beginPath(); ctx.moveTo(e.x+f*r*.45+s*r*.32,e.y+r*.35); ctx.lineTo(e.x+f*r*.45+s*r*.38,e.y+r*.1); ctx.lineTo(e.x+f*r*.45+s*r*.24,e.y+r*.32); ctx.fill() }) },
  wisp(ctx,e,t,px,py){ const r=e.r, w=Math.sin(t*8+e.wob);
    const gl=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,r*1.9); gl.addColorStop(0,"rgba(200,160,255,.45)"); gl.addColorStop(1,"rgba(150,100,255,0)"); ctx.fillStyle=gl; ctx.beginPath(); ctx.arc(e.x,e.y,r*1.9,0,7); ctx.fill();
    const fg=ctx.createLinearGradient(0,e.y-r*2,0,e.y+r); fg.addColorStop(0,_C(e,"#ffb0ff")); fg.addColorStop(.45,_C(e,"#8a3aff")); fg.addColorStop(1,_C(e,"#2a0a70"));
    ctx.fillStyle=fg; ctx.beginPath(); ctx.moveTo(e.x-r,e.y); ctx.bezierCurveTo(e.x-r*1.1,e.y-r*1.1,e.x-r*.2,e.y-r*1.2,e.x+w*r*.35,e.y-r*2.0); ctx.bezierCurveTo(e.x+r*.4,e.y-r*1.3,e.x+r*1.1,e.y-r*1.0,e.x+r,e.y); ctx.arc(e.x,e.y,r,0,Math.PI); ctx.fill(); _ol(ctx,1.2);
    _hl(ctx,e.x-r*.4,e.y-r*.4,r*.2,r*.1,.7);
    _face(ctx,e,t,px,py,e.y-r*.05,r*.34,r*.23,{iris:"#6a2ab0"}) },
  jar(ctx,e,t,px,py){ const r=e.r, hop=Math.abs(Math.sin(t*5+e.wob))*r*.25, y=e.y-hop;
    _blob(ctx,e,e.x,y+r*.18,r*.98,r*.9,"#6a3a22");
    ctx.fillStyle=_G(ctx,e,e.x,y-r*.85,r*.6,r*.2,"#6a3a22"); ctx.fillRect(e.x-r*.48,y-r*.95,r*.96,r*.3);
    ctx.fillStyle=_C(e,"#7a3a1a"); ctx.beginPath(); ctx.ellipse(e.x,y-r*.98,r*.62,r*.16,0,0,7); ctx.fill(); ctx.fillStyle=_C(e,"#3a1a0a"); ctx.beginPath(); ctx.ellipse(e.x,y-r*1.0,r*.42,r*.09,0,0,7); ctx.fill();
    ctx.fillStyle=_C(e,"#2f6b8a"); ctx.fillRect(e.x-r*.96,y+r*.5,r*1.92,r*.14); ctx.fillStyle=_C(e,"#f4e2c0"); for(let i=-3;i<=3;i++) ctx.fillRect(e.x+i*r*.26-1.5,y+r*.53,3,r*.08);
    _hl(ctx,e.x-r*.5,y-r*.2,r*.15,r*.3,.45);
    _face(ctx,e,t,px,py,y-r*.02,r*.3,r*.22,{mouth:"cat"}) },
  turtle(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, st=Math.sin(t*5+e.wob)*r*.08;
    ctx.fillStyle=_C(e,"#3a5a2a"); [[-.62,.3,st],[.62,.3,-st],[-.72,-.05,-st],[.72,-.05,st]].forEach(([a,b,s])=>{ ctx.beginPath(); ctx.ellipse(e.x+a*r,e.y+b*r+s,r*.22,r*.18,0,0,7); ctx.fill() });
    _blob(ctx,e,e.x+f*r*1.05,e.y-r*.15,r*.45,r*.4,"#4a6a3a");
    ctx.fillStyle=EYE_GLOW[e.mapId]||"#ff4aff"; ctx.beginPath(); ctx.moveTo(e.x+f*r*1.05,e.y-r*.2); ctx.lineTo(e.x+f*r*1.32,e.y-r*.32); ctx.lineTo(e.x+f*r*1.25,e.y-r*.16); ctx.closePath(); ctx.fill(); ctx.strokeStyle="#0c0208"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(e.x+f*r*1.0,e.y-r*.32); ctx.lineTo(e.x+f*r*1.3,e.y-r*.42); ctx.stroke();
    ctx.fillStyle="#22040c"; ctx.beginPath(); ctx.moveTo(e.x+f*r*1.0,e.y-r*.02); ctx.lineTo(e.x+f*r*1.42,e.y-r*.08); ctx.lineTo(e.x+f*r*1.3,e.y+r*.06); ctx.closePath(); ctx.fill();
    ctx.fillStyle=_G(ctx,e,e.x,e.y-r*.1,r,r*.85,"#5a5448"); ctx.beginPath(); ctx.ellipse(e.x,e.y,r,r*.82,0,Math.PI,0); ctx.lineTo(e.x+r,e.y+r*.2); ctx.quadraticCurveTo(e.x,e.y+r*.45,e.x-r,e.y+r*.2); ctx.closePath(); ctx.fill(); _ol(ctx);
    _spk(ctx,e,e.x,e.y-r*.05,r*.78,-Math.PI*.9,-Math.PI*.1,4,r*.35,"#a8a090");
    ctx.strokeStyle=_C(e,"#7a6a52"); ctx.lineWidth=1.5; ctx.beginPath(); for(let i=0;i<6;i++){ const a=Math.PI+i*Math.PI/5; ctx.lineTo(e.x+Math.cos(a)*r*.45,e.y-r*.15+Math.sin(a)*r*.35) } ctx.stroke();
    ctx.fillStyle=_C(e,"#3a6a2a"); ctx.beginPath(); ctx.ellipse(e.x-r*.35,e.y-r*.7,r*.22,r*.08,-.3,0,7); ctx.fill();
    _hl(ctx,e.x-r*.45,e.y-r*.5,r*.25,r*.1,.45) },
  scorpion(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, w=Math.sin(t*10+e.wob);
    ctx.strokeStyle=_C(e,"#3a1a06"); ctx.lineWidth=2.2; ctx.lineCap="round"; for(let i=0;i<3;i++) [-1,1].forEach(s=>{ ctx.beginPath(); ctx.moveTo(e.x+(i-1)*r*.35,e.y+r*.3); ctx.lineTo(e.x+(i-1)*r*.45+s*r*.15,e.y+r*(.85+w*.06*s)); ctx.stroke() });
    ctx.lineWidth=r*.34; ctx.strokeStyle=_C(e,"#5a2a0a"); ctx.beginPath(); ctx.moveTo(e.x-f*r*.7,e.y); ctx.quadraticCurveTo(e.x-f*r*1.6,e.y-r*1.1,e.x-f*r*.6,e.y-r*1.45+w*2); ctx.stroke(); ctx.lineCap="butt";
    ctx.fillStyle=_C(e,"#c83aff"); ctx.beginPath(); ctx.arc(e.x-f*r*.5,e.y-r*1.55+w*2,r*.2,0,7); ctx.fill(); _ol(ctx,1);
    [-1,1].forEach(s=>{ _blob(ctx,e,e.x+f*r*1.1,e.y+s*r*.45,r*.32,r*.26,"#5a2a0a",s*.4); ctx.fillStyle=_C(e,"#c8843a"); ctx.beginPath(); ctx.moveTo(e.x+f*r*1.3,e.y+s*r*.38); ctx.lineTo(e.x+f*r*1.6,e.y+s*r*.28); ctx.lineTo(e.x+f*r*1.38,e.y+s*r*.55); ctx.fill() });
    _blob(ctx,e,e.x,e.y,r*.95,r*.75,"#6a3a14");
    ctx.strokeStyle="rgba(140,80,30,.5)"; ctx.lineWidth=1.2; for(let i=-1;i<=1;i++){ ctx.beginPath(); ctx.arc(e.x-f*r*.2+i*r*.25,e.y,r*.6,-.5,.5); ctx.stroke() }
    _hl(ctx,e.x-r*.4,e.y-r*.4,r*.22,r*.1);
    _face(ctx,e,t,px,py,e.y-r*.1,r*.26,r*.2,{shift:f*r*.28}) },
  bat(ctx,e,t,px,py){ const r=e.r, fl=Math.sin(t*18+e.wob);
    [-1,1].forEach(s=>{ const wg=ctx.createLinearGradient(e.x,0,e.x+s*r*2,0); wg.addColorStop(0,_C(e,"#241848")); wg.addColorStop(1,_C(e,"#0c0820"));
      ctx.fillStyle=wg; ctx.beginPath(); ctx.moveTo(e.x+s*r*.6,e.y-r*.2); ctx.quadraticCurveTo(e.x+s*r*1.5,e.y-r*1.0-fl*r*.4,e.x+s*r*2.0,e.y-r*.3-fl*r*.5); ctx.quadraticCurveTo(e.x+s*r*1.7,e.y+r*.1,e.x+s*r*1.55,e.y+r*.05); ctx.quadraticCurveTo(e.x+s*r*1.3,e.y+r*.3,e.x+s*r*1.1,e.y+r*.15); ctx.quadraticCurveTo(e.x+s*r*.9,e.y+r*.45,e.x+s*r*.6,e.y+r*.3); ctx.closePath(); ctx.fill(); _ol(ctx,1.2) });
    [-1,1].forEach(s=>{ ctx.fillStyle=_G(ctx,e,e.x+s*r*.5,e.y-r*.95,r*.3,r*.4,"#2e2258"); ctx.beginPath(); ctx.moveTo(e.x+s*r*.25,e.y-r*.7); ctx.lineTo(e.x+s*r*.6,e.y-r*1.35); ctx.lineTo(e.x+s*r*.8,e.y-r*.55); ctx.closePath(); ctx.fill(); _ol(ctx,1.2);
      ctx.fillStyle=_C(e,"#7a1a3a"); ctx.beginPath(); ctx.moveTo(e.x+s*r*.38,e.y-r*.75); ctx.lineTo(e.x+s*r*.58,e.y-r*1.15); ctx.lineTo(e.x+s*r*.68,e.y-r*.68); ctx.closePath(); ctx.fill() });
    _blob(ctx,e,e.x,e.y,r,r*.95,"#2e2258");
    ctx.fillStyle=_C(e,"#4a3a7a"); ctx.beginPath(); ctx.ellipse(e.x,e.y+r*.4,r*.5,r*.4,0,0,7); ctx.fill();
    _hl(ctx,e.x-r*.45,e.y-r*.45,r*.22,r*.12);
    _face(ctx,e,t,px,py,e.y-r*.12,r*.36,r*.25,{iris:"#c8283a",mouth:"cat"}); ctx.fillStyle="#fff"; ctx.beginPath(); ctx.moveTo(e.x+r*.05,e.y+r*.3); ctx.lineTo(e.x+r*.12,e.y+r*.48); ctx.lineTo(e.x+r*.19,e.y+r*.3); ctx.fill() },
  crystal(ctx,e,t,px,py){ const r=e.r, b=Math.sin(t*3+e.wob)*r*.15, fl=Math.abs(Math.sin(t*20+e.wob));
    const gl=ctx.createRadialGradient(e.x,e.y+b,0,e.x,e.y+b,r*1.7); gl.addColorStop(0,"rgba(150,230,255,.45)"); gl.addColorStop(1,"rgba(100,200,255,0)"); ctx.fillStyle=gl; ctx.beginPath(); ctx.arc(e.x,e.y+b,r*1.7,0,7); ctx.fill();
    ctx.fillStyle="rgba(230,250,255,.75)"; [-1,1].forEach(s=>{ ctx.beginPath(); ctx.ellipse(e.x+s*r*.95,e.y-r*.4+b,r*.5,r*(.2+fl*.15),s*-.6,0,7); ctx.fill() });
    const cg=ctx.createLinearGradient(e.x-r,e.y-r,e.x+r,e.y+r); cg.addColorStop(0,_C(e,"#e8fbff")); cg.addColorStop(.45,_C(e,"#7fdcff")); cg.addColorStop(1,_C(e,"#12306a"));
    ctx.fillStyle=cg; ctx.beginPath(); ctx.moveTo(e.x,e.y-r*1.35+b); ctx.lineTo(e.x+r*.95,e.y-r*.1+b); ctx.lineTo(e.x+r*.55,e.y+r*1.0+b); ctx.lineTo(e.x-r*.55,e.y+r*1.0+b); ctx.lineTo(e.x-r*.95,e.y-r*.1+b); ctx.closePath(); ctx.fill(); _ol(ctx,1.4);
    ctx.fillStyle="rgba(255,255,255,.7)"; ctx.beginPath(); ctx.moveTo(e.x,e.y-r*1.35+b); ctx.lineTo(e.x-r*.95,e.y-r*.1+b); ctx.lineTo(e.x-r*.4,e.y-r*.25+b); ctx.closePath(); ctx.fill();
    _face(ctx,e,t,px,py,e.y+b+r*.05,r*.3,r*.21,{iris:"#2a5aa8"}) },
  spider(ctx,e,t,px,py){ const r=e.r; ctx.strokeStyle=_C(e,"#0c0a14"); ctx.lineWidth=2.6; ctx.lineCap="round";
    for(let i=0;i<4;i++) [-1,1].forEach(s=>{ const a=(i-1.5)*.45+Math.sin(t*14+i+e.wob)*.15; ctx.beginPath(); ctx.moveTo(e.x+s*r*.5,e.y+r*.1); ctx.quadraticCurveTo(e.x+s*r*1.3,e.y+Math.sin(a)*r*.9-r*.5,e.x+s*r*1.55,e.y+Math.sin(a)*r*1.1+r*.55); ctx.stroke() }); ctx.lineCap="butt";
    _blob(ctx,e,e.x,e.y+r*.15,r*1.0,r*.92,"#1a1626");
    ctx.fillStyle=_C(e,"#e8203a"); ctx.beginPath(); ctx.moveTo(e.x,e.y+r*.25); ctx.lineTo(e.x+r*.25,e.y+r*.55); ctx.lineTo(e.x,e.y+r*.85); ctx.lineTo(e.x-r*.25,e.y+r*.55); ctx.closePath(); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,.25)"; for(let i=0;i<6;i++){ const a=i*1.05+.3; ctx.fillRect(e.x+Math.cos(a)*r*.85-1,e.y+r*.15+Math.sin(a)*r*.78-1,2,2) }
    _hl(ctx,e.x-r*.45,e.y-r*.35,r*.25,r*.12);
    _face(ctx,e,t,px,py,e.y-r*.2,r*.34,r*.25,{iris:"#b0286a"});
    ctx.fillStyle="#2a1630"; [[-.12,-.75],[.12,-.75]].forEach(([a,b])=>{ ctx.beginPath(); ctx.arc(e.x+a*r,e.y+b*r,r*.07,0,7); ctx.fill() }) },
  troll(ctx,e,t,px,py){ const r=e.r, sw=Math.sin(t*3+e.wob);
    ctx.save(); ctx.translate(e.x+r*1.0,e.y+r*.1); ctx.rotate(-.5+sw*.35); ctx.fillStyle=_C(e,"#8a6038"); ctx.fillRect(-2.5,-r*1.3,5,r*1.3); _blob(ctx,e,0,-r*1.35,r*.32,r*.42,"#a8784a"); ctx.restore();
    ctx.fillStyle=_C(e,"#2a3a42"); [-1,1].forEach(s=>{ ctx.beginPath(); ctx.ellipse(e.x+s*r*.45,e.y+r*.85,r*.3,r*.18,0,0,7); ctx.fill() });
    _blob(ctx,e,e.x,e.y,r*1.05,r,"#4a5860");
    ctx.fillStyle=_C(e,"#7a8a90"); ctx.beginPath(); ctx.ellipse(e.x,e.y+r*.3,r*.62,r*.55,0,0,7); ctx.fill();
    ctx.fillStyle=_C(e,"#f4ece0"); [-1,1].forEach(s=>{ ctx.beginPath(); ctx.moveTo(e.x+s*r*.4,e.y-r*.8); ctx.quadraticCurveTo(e.x+s*r*.75,e.y-r*1.3,e.x+s*r*.55,e.y-r*1.45); ctx.quadraticCurveTo(e.x+s*r*.5,e.y-r*1.1,e.x+s*r*.2,e.y-r*.9); ctx.fill(); _ol(ctx,1) });
    ctx.fillStyle=_C(e,"#5a6a72"); for(let i=-2;i<=2;i++){ ctx.beginPath(); ctx.arc(e.x+i*r*.3,e.y-r*.92,r*.18,0,7); ctx.fill() }
    _hl(ctx,e.x-r*.5,e.y-r*.45,r*.25,r*.12,.5);
    _face(ctx,e,t,px,py,e.y-r*.3,r*.34,r*.24,{mouth:"grin",iris:"#2a6a8a"}) },
  imp(ctx,e,t,px,py){ const r=e.r, c=e.c||"#6a3a8a";
    const gl=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,r*1.6); gl.addColorStop(0,"rgba(255,140,60,.35)"); gl.addColorStop(1,"rgba(255,80,30,0)"); ctx.fillStyle=gl; ctx.beginPath(); ctx.arc(e.x,e.y,r*1.6,0,7); ctx.fill();
    ctx.strokeStyle=_C(e,_mix(c,-.2)); ctx.lineWidth=2.4; ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(e.x+r*.6,e.y+r*.5); ctx.quadraticCurveTo(e.x+r*1.5,e.y+r*.7+Math.sin(t*6+e.wob)*r*.35,e.x+r*1.3,e.y-r*.15); ctx.stroke(); ctx.lineCap="butt";
    ctx.fillStyle=_C(e,"#1a0408"); ctx.beginPath(); const hx=e.x+r*1.3, hy=e.y-r*.25; ctx.moveTo(hx,hy+r*.18); ctx.bezierCurveTo(hx-r*.3,hy-r*.05,hx-r*.1,hy-r*.3,hx,hy-r*.12); ctx.bezierCurveTo(hx+r*.1,hy-r*.3,hx+r*.3,hy-r*.05,hx,hy+r*.18); ctx.fill();
    [-1,1].forEach(s=>{ ctx.fillStyle=_C(e,"#7a4a2a"); ctx.beginPath(); ctx.moveTo(e.x+s*r*.7,e.y); ctx.quadraticCurveTo(e.x+s*r*1.4,e.y-r*.6,e.x+s*r*1.2,e.y+r*.1); ctx.closePath(); ctx.fill() });
    _blob(ctx,e,e.x,e.y,r,r,c);
    ctx.fillStyle=_C(e,"#fff4d8"); [-1,1].forEach(s=>{ ctx.beginPath(); ctx.moveTo(e.x+s*r*.45,e.y-r*.75); ctx.quadraticCurveTo(e.x+s*r*.75,e.y-r*1.2,e.x+s*r*.6,e.y-r*1.4); ctx.quadraticCurveTo(e.x+s*r*.4,e.y-r*1.05,e.x+s*r*.18,e.y-r*.9); ctx.fill(); _ol(ctx,1) });
    _hl(ctx,e.x-r*.45,e.y-r*.45,r*.22,r*.12);
    _face(ctx,e,t,px,py,e.y-r*.08,r*.34,r*.24,{mouth:"grin",iris:"#d6402f"}) },
  hound(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, run=Math.sin(t*16+e.wob)*r*.2, tw=Math.sin(t*14+e.wob);
    ctx.fillStyle=_C(e,"#1e0a0a"); [[-.6,run],[-.25,-run],[.3,run],[.62,-run]].forEach(([a,s])=>{ ctx.beginPath(); ctx.ellipse(e.x+a*r,e.y+r*.7+s*.5,r*.15,r*.24,0,0,7); ctx.fill() });
    ctx.strokeStyle=_C(e,"#ff8a3a"); ctx.lineWidth=r*.22; ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(e.x-f*r*.9,e.y-r*.1); ctx.quadraticCurveTo(e.x-f*r*1.4,e.y-r*.6+tw*r*.2,e.x-f*r*1.3,e.y-r*1.0); ctx.stroke(); ctx.lineCap="butt";
    _blob(ctx,e,e.x-f*r*.15,e.y+r*.05,r*1.05,r*.72,"#3a1210");
    for(let i=0;i<5;i++){ const x=e.x-f*r*.6+f*i*r*.25, h=r*(.5+Math.abs(Math.sin(t*12+i))*.3); const fg=ctx.createLinearGradient(0,e.y-r*.4-h,0,e.y-r*.4); fg.addColorStop(0,_C(e,"#ffe066")); fg.addColorStop(1,_C(e,"#ff6a2a"));
      ctx.fillStyle=fg; ctx.beginPath(); ctx.moveTo(x-r*.15,e.y-r*.35); ctx.quadraticCurveTo(x,e.y-r*.4-h,x+r*.15,e.y-r*.35); ctx.fill() }
    _blob(ctx,e,e.x+f*r*.7,e.y-r*.3,r*.62,r*.55,"#4a1814");
    [-1,1].forEach(s=>{ ctx.fillStyle=_C(e,"#2a0c0c"); ctx.beginPath(); ctx.ellipse(e.x+f*r*.7+s*r*.45,e.y-r*.55,r*.16,r*.3,s*.5,0,7); ctx.fill() });
    _blob(ctx,e,e.x+f*r*1.05,e.y-r*.12,r*.28,r*.2,"#6a3a30"); ctx.fillStyle="#2a1630"; ctx.beginPath(); ctx.arc(e.x+f*r*1.22,e.y-r*.18,r*.08,0,7); ctx.fill();
    _face(ctx,e,t,px,py,e.y-r*.42,r*.22,r*.18,{shift:f*r*.65,my:2.3,mouth:"none",iris:"#ff8a2a"}) },
  knight(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1;
    const cg=ctx.createLinearGradient(0,e.y-r*.5,0,e.y+r*1.1); cg.addColorStop(0,_C(e,"#c83a4a")); cg.addColorStop(1,_C(e,"#6a1424")); ctx.fillStyle=cg;
    ctx.beginPath(); ctx.moveTo(e.x-r*.7,e.y-r*.45); ctx.quadraticCurveTo(e.x-r*1.2,e.y+r*.6,e.x-r*1.0,e.y+r*1.0+Math.sin(t*4)*3); ctx.lineTo(e.x+r*1.0,e.y+r*1.0-Math.sin(t*4)*3); ctx.quadraticCurveTo(e.x+r*1.2,e.y+r*.6,e.x+r*.7,e.y-r*.45); ctx.fill();
    ctx.save(); ctx.translate(e.x+f*r*.95,e.y+r*.2); ctx.rotate(f*(.35+Math.sin(t*3+e.wob)*.15));
    const bg=ctx.createLinearGradient(-3,0,3,0); bg.addColorStop(0,"#9aa5bb"); bg.addColorStop(.5,"#ffffff"); bg.addColorStop(1,"#8a93a8"); ctx.fillStyle=bg; ctx.fillRect(-3,-r*1.6,6,r*1.5);
    ctx.fillStyle="#f6c544"; ctx.fillRect(-r*.32,-r*.12,r*.64,4); ctx.fillStyle="#6a4428"; ctx.fillRect(-2,-r*.08,4,r*.3); ctx.restore();
    ctx.fillStyle=_C(e,"#14121c"); [-1,1].forEach(s=>{ ctx.beginPath(); ctx.ellipse(e.x+s*r*.38,e.y+r*.85,r*.25,r*.16,0,0,7); ctx.fill() });
    _blob(ctx,e,e.x,e.y+r*.3,r*.78,r*.62,"#24202e");
    ctx.fillStyle=_C(e,"#f6c544"); ctx.fillRect(e.x-r*.08,e.y+r*.0,r*.16,r*.55); ctx.fillRect(e.x-r*.28,e.y+r*.15,r*.56,r*.12);
    _blob(ctx,e,e.x,e.y-r*.5,r*.82,r*.72,"#2e2a3a");
    ctx.fillStyle="#140a1e"; ctx.beginPath(); ctx.ellipse(e.x,e.y-r*.42,r*.6,r*.32,0,0,7); ctx.fill();
    _face(ctx,e,t,px,py,e.y-r*.44,r*.27,r*.19,{blush:false,mouth:"none",iris:"#ffb03a"});
    ctx.fillStyle=_C(e,"#f6c544"); ctx.fillRect(e.x-r*.06,e.y-r*1.2,r*.12,r*.35);
    const pg=ctx.createLinearGradient(0,e.y-r*1.7,0,e.y-r*1.1); pg.addColorStop(0,_C(e,"#ff8aa0")); pg.addColorStop(1,_C(e,"#c8283a")); ctx.fillStyle=pg;
    ctx.beginPath(); ctx.moveTo(e.x,e.y-r*1.15); ctx.quadraticCurveTo(e.x-f*r*.6,e.y-r*1.85,e.x-f*r*1.15,e.y-r*1.1); ctx.quadraticCurveTo(e.x-f*r*.5,e.y-r*1.35,e.x,e.y-r*1.05); ctx.fill();
    _hl(ctx,e.x-r*.45,e.y-r*.85,r*.22,r*.1,.5) },
  haetae(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, step=Math.sin(t*6+e.wob)*r*.08;
    const gl=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,r*1.7); gl.addColorStop(0,"rgba(255,220,140,.3)"); gl.addColorStop(1,"rgba(255,200,120,0)"); ctx.fillStyle=gl; ctx.beginPath(); ctx.arc(e.x,e.y,r*1.7,0,7); ctx.fill();
    ctx.fillStyle=_C(e,"#6a5432"); [[-.7,step],[-.25,-step],[.3,step],[.72,-step]].forEach(([a,s])=>{ ctx.beginPath(); ctx.ellipse(e.x+a*r,e.y+r*.7+s,r*.17,r*.28,0,0,7); ctx.fill() });
    _blob(ctx,e,e.x-f*r*.15,e.y+r*.15,r*1.08,r*.68,"#a8906a");
    ctx.fillStyle=_C(e,"#3f8a6a"); ctx.beginPath(); ctx.arc(e.x-f*r*1.15,e.y-r*.2,r*.28,0,7); ctx.arc(e.x-f*r*1.35,e.y-r*.52,r*.22,0,7); ctx.arc(e.x-f*r*1.25,e.y-r*.8,r*.16,0,7); ctx.fill();
    for(let i=0;i<10;i++){ const a=i*.63; ctx.fillStyle=_C(e,i%2?"#3f8a6a":"#5ab08a"); ctx.beginPath(); ctx.arc(e.x+f*r*.6+Math.cos(a)*r*.62,e.y-r*.4+Math.sin(a)*r*.62,r*.25,0,7); ctx.fill() }
    _blob(ctx,e,e.x+f*r*.6,e.y-r*.4,r*.58,r*.55,"#b89c78");
    ctx.fillStyle=_C(e,"#f6c544"); ctx.beginPath(); ctx.moveTo(e.x+f*r*.5,e.y-r*.92); ctx.lineTo(e.x+f*r*.62,e.y-r*1.45); ctx.lineTo(e.x+f*r*.76,e.y-r*.9); ctx.fill(); _ol(ctx,1);
    _face(ctx,e,t,px,py,e.y-r*.45,r*.24,r*.17,{shift:f*r*.6,mouth:"grin",iris:"#b8701a"});
    _hl(ctx,e.x+f*r*.35,e.y-r*.75,r*.2,r*.08,.5) },
  demon(ctx,e,t,px,py){ const r=e.r, c=e.c||"#c63a3a", fl=Math.sin(t*5)*r*.2;
    const gl=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,r*1.9); gl.addColorStop(0,"rgba(255,120,50,.35)"); gl.addColorStop(1,"rgba(255,80,30,0)"); ctx.fillStyle=gl; ctx.beginPath(); ctx.arc(e.x,e.y,r*1.9,0,7); ctx.fill();
    [-1,1].forEach(s=>{ const wg=ctx.createLinearGradient(e.x,0,e.x+s*r*2.2,0); wg.addColorStop(0,_C(e,"#5a1a2a")); wg.addColorStop(1,_C(e,"#2a0a14"));
      ctx.fillStyle=wg; ctx.beginPath(); ctx.moveTo(e.x+s*r*.6,e.y-r*.3); ctx.quadraticCurveTo(e.x+s*r*1.6,e.y-r*1.5-fl,e.x+s*r*2.2,e.y-r*1.0-fl); ctx.quadraticCurveTo(e.x+s*r*1.9,e.y-r*.3,e.x+s*r*1.7,e.y-r*.4); ctx.quadraticCurveTo(e.x+s*r*1.5,e.y,e.x+s*r*1.25,e.y-r*.1); ctx.quadraticCurveTo(e.x+s*r*1.0,e.y+r*.25,e.x+s*r*.7,e.y+r*.2); ctx.closePath(); ctx.fill(); _ol(ctx,1.5) });
    _blob(ctx,e,e.x,e.y+r*.1,r*.98,r,c);
    ctx.fillStyle=_C(e,_mix(c,-.35)); ctx.beginPath(); ctx.ellipse(e.x,e.y+r*.45,r*.55,r*.42,0,0,7); ctx.fill(); ctx.strokeStyle="rgba(255,140,60,.55)"; ctx.lineWidth=1.5; for(let k=0;k<3;k++){ ctx.beginPath(); ctx.moveTo(e.x-r*.35,e.y+r*(.25+k*.17)); ctx.quadraticCurveTo(e.x,e.y+r*(.35+k*.17),e.x+r*.35,e.y+r*(.25+k*.17)); ctx.stroke() }
    ctx.fillStyle=_C(e,"#fff4d8"); [-1,1].forEach(s=>{ ctx.beginPath(); ctx.moveTo(e.x+s*r*.4,e.y-r*.72); ctx.quadraticCurveTo(e.x+s*r*1.15,e.y-r*1.0,e.x+s*r*.95,e.y-r*1.6); ctx.quadraticCurveTo(e.x+s*r*.8,e.y-r*1.05,e.x+s*r*.15,e.y-r*.88); ctx.fill(); _ol(ctx,1.2) });
    _hl(ctx,e.x-r*.45,e.y-r*.45,r*.24,r*.12);
    _face(ctx,e,t,px,py,e.y-r*.25,r*.34,r*.22,{mouth:"grin",iris:"#f6a623",brows:true}) },
  golem(ctx,e,t,px,py){ const r=e.r, c=e.flash>0?"#fff":(e.c||"#9a9488"), sw=Math.sin(t*4+e.wob)*r*.1;
    ctx.fillStyle=c; ctx.fillRect(e.x-r*1.3,e.y-r*.3+sw,r*.45,r*.95); ctx.fillRect(e.x+r*.85,e.y-r*.3-sw,r*.45,r*.95);
    ctx.fillRect(e.x-r*.85,e.y-r*.55,r*1.7,r*1.35); ctx.fillRect(e.x-r*.55,e.y-r*1.2,r*1.1,r*.7);
    ctx.fillStyle="rgba(0,0,0,.18)"; ctx.fillRect(e.x+r*.35,e.y-r*.55,r*.5,r*1.35); ctx.fillRect(e.x-r*.7,e.y+r*.8,r*.5,r*.25); ctx.fillRect(e.x+r*.2,e.y+r*.8,r*.5,r*.25);
    ctx.strokeStyle="rgba(0,0,0,.3)"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(e.x-r*.4,e.y-r*.2); ctx.lineTo(e.x-r*.1,e.y+r*.2); ctx.lineTo(e.x-r*.3,e.y+r*.5); ctx.stroke();
    const glow=e.c==="#6a2a22"?"#ff8a2a":e.c==="#5aa8d6"?"#c8f4ff":"#ffe066";
    ctx.fillStyle=glow; ctx.fillRect(e.x-r*.38,e.y-r*.95,r*.25,r*.2); ctx.fillRect(e.x+r*.13,e.y-r*.95,r*.25,r*.2);
    if(e.c==="#5aa8d6"){ ctx.fillStyle="#c8f4ff"; ctx.beginPath(); ctx.moveTo(e.x-r*.3,e.y-r*1.2); ctx.lineTo(e.x-r*.15,e.y-r*1.7); ctx.lineTo(e.x,e.y-r*1.2); ctx.fill() }
    if(e.c==="#6a2a22"){ ctx.strokeStyle="#ff8a2a"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(e.x-r*.6,e.y); ctx.lineTo(e.x,e.y+r*.3); ctx.lineTo(e.x+r*.5,e.y-r*.1); ctx.stroke() } },
};

/* 몬스터별 세부 디테일 (질감·빛·효과) */
const EXTRA = {
  slime(ctx,e,t){ const r=e.r; for(let i=0;i<4;i++){ const ph=(t*.6+i*.27+e.wob)%1, x=e.x+Math.sin(i*2.1+e.wob)*r*.55, y=e.y+r*.6-ph*r*1.2, z=r*(.07+.05*(i%2));
      ctx.strokeStyle=`rgba(220,255,160,${.7*(1-ph)})`; ctx.lineWidth=1.2; ctx.beginPath(); ctx.arc(x,y,z,0,7); ctx.stroke() }
    ctx.strokeStyle="rgba(255,255,255,.35)"; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(e.x,e.y-r*.15,r*.8,-2.4,-1.5); ctx.stroke() },
  mushroom(ctx,e,t){ const r=e.r, y=e.y-Math.abs(Math.sin(t*6+e.wob))*r*.15; ctx.strokeStyle="rgba(60,20,30,.55)"; ctx.lineWidth=1.2;
    for(let i=-4;i<=4;i++){ ctx.beginPath(); ctx.moveTo(e.x+i*r*.26,y+r*.08); ctx.lineTo(e.x+i*r*.18,y+r*.2); ctx.stroke() }
    ctx.strokeStyle="rgba(255,220,220,.35)"; ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(e.x,y-r*.15,r*1.1,r*.7,0,Math.PI*1.15,Math.PI*1.6); ctx.stroke() },
  bat(ctx,e,t){ const r=e.r, fl=Math.sin(t*18+e.wob); ctx.strokeStyle="rgba(140,90,200,.55)"; ctx.lineWidth=1;
    [-1,1].forEach(s=>{ for(let k=0;k<3;k++){ ctx.beginPath(); ctx.moveTo(e.x+s*r*.7,e.y-r*.05); ctx.lineTo(e.x+s*r*(1.25+k*.25),e.y-r*(.55-k*.25)-fl*r*.35*(1-k*.3)); ctx.stroke() } });
    ctx.fillStyle="rgba(20,10,40,.7)"; for(let k=-2;k<=2;k++){ ctx.beginPath(); ctx.moveTo(e.x+k*r*.18-2,e.y-r*.85); ctx.lineTo(e.x+k*r*.18,e.y-r*1.05); ctx.lineTo(e.x+k*r*.18+2,e.y-r*.85); ctx.fill() } },
  knight(ctx,e,t,px){ const r=e.r, f=px<e.x?-1:1, gl=.6+.4*Math.sin(t*4+e.wob);
    const g=ctx.createRadialGradient(e.x,e.y-r*.44,0,e.x,e.y-r*.44,r*.8); g.addColorStop(0,`rgba(255,60,40,${.55*gl})`); g.addColorStop(1,"rgba(255,60,40,0)"); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(e.x,e.y-r*.44,r*.8,0,7); ctx.fill();
    ctx.fillStyle="#2a2636"; [-1,1].forEach(s=>{ for(let k=0;k<3;k++){ ctx.beginPath(); ctx.moveTo(e.x+s*r*(.55+k*.12),e.y-r*.05); ctx.lineTo(e.x+s*r*(.7+k*.14),e.y-r*(.42+k*.04)); ctx.lineTo(e.x+s*r*(.72+k*.12),e.y+r*.02); ctx.fill() } });
    ctx.strokeStyle="rgba(200,200,230,.35)"; ctx.lineWidth=1; for(let k=0;k<3;k++){ ctx.beginPath(); ctx.moveTo(e.x-r*.6,e.y+r*(.12+k*.18)); ctx.quadraticCurveTo(e.x,e.y+r*(.2+k*.18),e.x+r*.6,e.y+r*(.12+k*.18)); ctx.stroke() } },
  demon(ctx,e,t){ const r=e.r, gl=.6+.4*Math.sin(t*3+e.wob); ctx.lineCap="round";
    const crack=(w,c)=>{ ctx.strokeStyle=c; ctx.lineWidth=w; ctx.beginPath(); ctx.moveTo(e.x-r*.7,e.y-r*.05); ctx.lineTo(e.x-r*.45,e.y+r*.15); ctx.lineTo(e.x-r*.55,e.y+r*.45); ctx.moveTo(e.x+r*.75,e.y); ctx.lineTo(e.x+r*.5,e.y+r*.25); ctx.lineTo(e.x+r*.62,e.y+r*.55); ctx.moveTo(e.x-r*.2,e.y-r*.75); ctx.lineTo(e.x-r*.05,e.y-r*.55); ctx.stroke() };
    crack(4,`rgba(255,90,20,${.5*gl})`); crack(1.6,`rgba(255,230,140,${gl})`); ctx.lineCap="butt" },
  imp(ctx,e,t){ const r=e.r; [-1,1].forEach(s=>{ const x=e.x+s*r*.6, y=e.y-r*1.42, h=r*(.25+.1*Math.sin(t*14+s+e.wob));
      ctx.fillStyle="rgba(255,120,30,.85)"; ctx.beginPath(); ctx.moveTo(x-r*.1,y+r*.05); ctx.quadraticCurveTo(x,y-h*1.4,x+r*.1,y+r*.05); ctx.fill(); ctx.fillStyle="rgba(255,240,170,.9)"; ctx.fillRect(x-1,y-h*.4,2,h*.4) }) },
  jar(ctx,e,t){ const r=e.r, y=e.y-Math.abs(Math.sin(t*5+e.wob))*r*.25, gl=.5+.5*Math.sin(t*4+e.wob); ctx.lineCap="round";
    [[6,`rgba(255,80,255,${.35*gl})`],[2,`rgba(255,200,255,${gl})`]].forEach(([w,c])=>{ ctx.strokeStyle=c; ctx.lineWidth=w; ctx.beginPath(); ctx.moveTo(e.x+r*.55,y-r*.55); ctx.lineTo(e.x+r*.35,y-r*.2); ctx.lineTo(e.x+r*.6,y+r*.1); ctx.lineTo(e.x+r*.45,y+r*.35); ctx.stroke() }); ctx.lineCap="butt" },
  crystal(ctx,e,t){ const r=e.r, b=Math.sin(t*3+e.wob)*r*.15; ctx.strokeStyle="rgba(230,250,255,.6)"; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(e.x,e.y-r*1.35+b); ctx.lineTo(e.x-r*.2,e.y-r*.1+b); ctx.lineTo(e.x,e.y+r*1.0+b); ctx.moveTo(e.x-r*.2,e.y-r*.1+b); ctx.lineTo(e.x+r*.95,e.y-r*.1+b); ctx.stroke();
    if(((t*1.3+e.wob)%3)<.2){ ctx.fillStyle="#fff"; ctx.fillRect(e.x-r*.5,e.y-r*.7+b,2,6); ctx.fillRect(e.x-r*.5-2,e.y-r*.7+b+2,6,2) } },
  troll(ctx,e){ const r=e.r; ctx.fillStyle="#f2ead8"; [-1,1].forEach(s=>{ ctx.beginPath(); ctx.moveTo(e.x+s*r*.35,e.y+r*.02); ctx.quadraticCurveTo(e.x+s*r*.55,e.y-r*.25,e.x+s*r*.45,e.y-r*.45); ctx.lineTo(e.x+s*r*.25,e.y+r*.02); ctx.fill() });
    ctx.strokeStyle="rgba(30,40,50,.35)"; ctx.lineWidth=1.2; for(let i=0;i<8;i++){ const a=-.6+i*.4; ctx.beginPath(); ctx.moveTo(e.x+Math.cos(a)*r*.85,e.y+Math.sin(a)*r*.8); ctx.lineTo(e.x+Math.cos(a)*r*1.0,e.y+Math.sin(a)*r*.95); ctx.stroke() } },
  hound(ctx,e,t){ const r=e.r; for(let i=0;i<4;i++){ const ph=(t*1.5+i/4+e.wob)%1; ctx.fillStyle=`rgba(255,${200-ph*120|0},60,${1-ph})`; ctx.fillRect(e.x+(i-1.5)*r*.35,e.y-r*.8-ph*r*1.2,2.5,2.5) } },
  boar(ctx,e,t,px){ const r=e.r, f=px<e.x?-1:1; ctx.strokeStyle="rgba(255,90,60,.8)"; ctx.lineWidth=1.6; ctx.beginPath(); ctx.moveTo(e.x+f*r*.1,e.y-r*.55); ctx.lineTo(e.x+f*r*.35,e.y-r*.15); ctx.stroke() },
  scorpion(ctx,e,t,px){ const r=e.r, f=px<e.x?-1:1; ctx.fillStyle="rgba(40,15,5,.6)"; for(let i=0;i<4;i++){ const u=.15+i*.2, x=e.x-f*r*(.7+u*.9), y=e.y-r*(u*1.3); ctx.beginPath(); ctx.arc(x,y,r*.05,0,7); ctx.fill() } },
  spider(ctx,e,t){ const r=e.r; ctx.strokeStyle="rgba(90,70,130,.6)"; ctx.lineWidth=1; for(let i=0;i<10;i++){ const a=i*.63+e.wob; ctx.beginPath(); ctx.moveTo(e.x+Math.cos(a)*r*.95,e.y+r*.15+Math.sin(a)*r*.85); ctx.lineTo(e.x+Math.cos(a)*r*1.1,e.y+r*.15+Math.sin(a)*r*1.0); ctx.stroke() } },
  wisp(ctx,e,t){ const r=e.r; for(let i=0;i<3;i++){ const ph=(t*1.2+i/3+e.wob)%1; ctx.fillStyle=`rgba(220,160,255,${.8*(1-ph)})`; ctx.beginPath(); ctx.arc(e.x+Math.sin(i*2+t*3)*r*.5,e.y-r*1.6-ph*r*1.2,r*.08*(1-ph)+1,0,7); ctx.fill() } },
};
if(typeof LOOKS!=="undefined"){ const AL={rider:"voidling",engine:"nebula",devourer:"comet",ruler:"voidling",behemoth:"nebula",fireimp:"imp",griffin:"lioncub",medusa:"sentinel",minotaur:"colossus",titan:"colossus"}; for(const k in AL) if(!LOOKS[k]) LOOKS[k]=LOOKS[AL[k]]||LOOKS.slime }
const FLYERS = {bee:1,bat:1,wisp:1,crystal:1,demon:1};

/* ===== 렉 줄이기: 몬스터 그림을 미리 그려 두고(스프라이트 캐시) 한 번에 붙여요 =====
   몸통은 수십 개의 도형·그라데이션이라 매번 그리면 느려요. 모양·크기·색·방향별로 24장(2초 분량)을 처음 한 번만 그려 둬요. */
const SPR = { on:true, px:2, fps:12, nf:24, map:new Map() };
function sprSetPX(p){ if(SPR.px!==p){ SPR.px=p; SPR.map.clear() } }
function sprFrame(e,t,px){
  const rr=Math.max(4,Math.round(e.r)), face=px<e.x?-1:1, fl=e.flash>0?1:0;
  const key=e.look+"|"+rr+"|"+(e.c||"")+"|"+(e.mapId||0)+"|"+face+"|"+fl+"|"+(e.hue||0);
  let ent=SPR.map.get(key);
  if(!ent){ if(SPR.map.size>600) SPR.map.clear(); ent={S:Math.ceil(rr*2.9)+8,fr:new Array(SPR.nf)}; SPR.map.set(key,ent) }
  const idx=((Math.floor((t+e.wob*.37)*SPR.fps)%SPR.nf)+SPR.nf)%SPR.nf;
  let cv=ent.fr[idx];
  if(!cv){ const S=ent.S, P=SPR.px; cv=document.createElement("canvas"); cv.width=cv.height=Math.ceil(2*S/P);
    const c=cv.getContext("2d"); c.setTransform(1/P,0,0,1/P,S/P,S/P); if(e.hue) c.filter=`hue-rotate(${e.hue}deg)`;
    const fe={x:0,y:0,r:rr,c:e.c,wob:0,flash:fl,look:e.look,mapId:e.mapId,type:e.type}, ft=idx/SPR.fps;
    (LOOKS[e.look]||LOOKS.slime)(c,fe,ft,face*1000,0); if(!fl&&EXTRA[e.look]) EXTRA[e.look](c,fe,ft,face*1000,0);
    ent.fr[idx]=cv }
  return [cv,ent.S*(e.r/rr)] }
/* ===== 보스 위엄: 단계가 높을수록 화려하게 (약한 → 중간 → 강한 → 최종) ===== */
const BOSS_COL={8:["170,235,255","#3a7ab0"],9:["255,220,120","#9a7a2a"],10:["190,120,255","#3a1a7a"],1:["150,255,110","#3a8a2a"],2:["255,180,80","#8a4a1a"],3:["255,120,255","#7a2a8a"],4:["120,210,255","#2a3a8a"],5:["255,100,50","#8a1a1a"],6:["140,230,255","#2a4a9a"],7:["255,224,140","#9a7a2a"]};
function bossTier(e){ const B=typeof BOSSES!=="undefined"&&BOSSES[e.bid]; return B&&B.tier!==undefined?B.tier:3 }
function bossUnder(ctx,e,t){ const tier=bossTier(e), r=e.r, [cl]=BOSS_COL[e.mapId]||BOSS_COL[5], gx=e.x, gy=e.y+r*.9;
  ctx.save(); ctx.globalCompositeOperation="lighter";
  const R=r*(1.5+tier*.35); const ag=ctx.createRadialGradient(gx,e.y,r*.2,gx,e.y,R); ag.addColorStop(0,`rgba(${cl},${.22+tier*.07})`); ag.addColorStop(1,`rgba(${cl},0)`); ctx.fillStyle=ag; ctx.beginPath(); ctx.arc(gx,e.y,R,0,7); ctx.fill();
  if(tier>=1){ const rx=r*(1.25+tier*.22), ry=rx*.36, rot=t*(.6+tier*.2); ctx.strokeStyle=`rgba(${cl},.75)`; ctx.lineWidth=2;
    ctx.beginPath(); ctx.ellipse(gx,gy,rx,ry,0,0,7); ctx.stroke(); ctx.lineWidth=1.2; ctx.beginPath(); ctx.ellipse(gx,gy,rx*.82,ry*.82,0,0,7); ctx.stroke();
    for(let i=0;i<12;i++){ const a=rot+i*Math.PI/6, x1=gx+Math.cos(a)*rx*.84, y1=gy+Math.sin(a)*ry*.84, x2=gx+Math.cos(a)*rx*.98, y2=gy+Math.sin(a)*ry*.98; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke() }
    if(tier>=2){ ctx.lineWidth=1.6; for(let k=0;k<2;k++){ ctx.beginPath(); for(let i=0;i<=3;i++){ const a=-rot*1.3+k*Math.PI/3+i*Math.PI*2/3; const x=gx+Math.cos(a)*rx*.8, y=gy+Math.sin(a)*ry*.8; i?ctx.lineTo(x,y):ctx.moveTo(x,y) } ctx.stroke() } } }
  if(tier>=2){ for(let i=0;i<14;i++){ const ph=(t*.8+i/14)%1, a=i*2.39+t*.3, x=gx+Math.cos(a)*r*(.9+tier*.15), y=gy+Math.sin(a)*r*.3-ph*r*(1.6+tier*.3);
      ctx.fillStyle=`rgba(${cl},${(1-ph)*.9})`; ctx.beginPath(); ctx.ellipse(x,y,r*.05*(1-ph)+1.2,r*.12*(1-ph)+2,0,0,7); ctx.fill() } }
  if(tier>=3){ const pg=ctx.createLinearGradient(gx,gy-r*4,gx,gy); pg.addColorStop(0,`rgba(${cl},0)`); pg.addColorStop(1,`rgba(${cl},.22)`); ctx.fillStyle=pg; ctx.beginPath(); ctx.moveTo(gx-r*1.1,gy); ctx.lineTo(gx-r*.5,gy-r*4); ctx.lineTo(gx+r*.5,gy-r*4); ctx.lineTo(gx+r*1.1,gy); ctx.closePath(); ctx.fill();
    if(Math.sin(t*4.3+e.wob)>.8){ ctx.strokeStyle=`rgba(${cl},.9)`; ctx.lineWidth=2; for(let k=0;k<2;k++){ let x=gx+(k?1:-1)*r*1.6, y=gy; ctx.beginPath(); ctx.moveTo(x,y); for(let i=0;i<6;i++){ x+=(k?-1:1)*r*.12+Math.sin(t*60+i*7+k)*r*.15; y-=r*.32; ctx.lineTo(x,y) } ctx.stroke() } } }
  ctx.restore() }
function bossOver(ctx,e,t,art){ const tier=bossTier(e), r=e.r, [cl]=BOSS_COL[e.mapId]||BOSS_COL[5];
  // 머리 위 왕관 (중간·강한 보스, 그림이 없을 때만) · 강한·최종 보스는 빛나는 보석이 빙글빙글
  if(!art&&(tier===1||tier===2)){ const y=e.y-r*1.28-Math.sin(t*2)*r*.04, w=r*(tier===1?.42:.55), h=r*(tier===1?.32:.45);
    const g=ctx.createLinearGradient(0,y-h,0,y+r*.08); g.addColorStop(0,"#fff4b8"); g.addColorStop(.5,"#f2c040"); g.addColorStop(1,"#8a5a10"); ctx.fillStyle=g;
    ctx.beginPath(); ctx.moveTo(e.x-w,y+r*.08); ctx.lineTo(e.x-w,y-h*.55); ctx.lineTo(e.x-w*.5,y-h*.2); ctx.lineTo(e.x,y-h); ctx.lineTo(e.x+w*.5,y-h*.2); ctx.lineTo(e.x+w,y-h*.55); ctx.lineTo(e.x+w,y+r*.08); ctx.closePath(); ctx.fill(); ctx.strokeStyle="rgba(70,40,5,.8)"; ctx.lineWidth=1.3; ctx.stroke();
    ctx.fillStyle=tier===2?"#e9475f":"#4ac8ff"; ctx.beginPath(); ctx.arc(e.x,y-h*.25,r*.07,0,7); ctx.fill(); if(tier===2){ ctx.fillStyle="#7ad87a"; [-1,1].forEach(s=>{ ctx.beginPath(); ctx.arc(e.x+s*w*.6,y-h*.05,r*.05,0,7); ctx.fill() }) }
    ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.fillStyle=`rgba(255,240,180,${.5+.4*Math.sin(t*5)})`; ctx.beginPath(); ctx.arc(e.x-w*.4,y-h*.5,r*.03,0,7); ctx.fill(); ctx.restore() }
  if(tier>=2){ ctx.save(); ctx.globalCompositeOperation="lighter"; const n=tier>=3?5:3;
    for(let i=0;i<n;i++){ const a=t*1.6+i*Math.PI*2/n, x=e.x+Math.cos(a)*r*1.35, y=e.y-r*.3+Math.sin(a)*r*.45, z=r*(tier>=3?.1:.07);
      const g=ctx.createRadialGradient(x,y,0,x,y,z*3); g.addColorStop(0,`rgba(255,255,255,.95)`); g.addColorStop(.3,`rgba(${cl},.8)`); g.addColorStop(1,`rgba(${cl},0)`); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,z*3,0,7); ctx.fill();
      ctx.fillStyle="#ffffff"; ctx.beginPath(); ctx.moveTo(x,y-z*1.4); ctx.lineTo(x+z*.8,y); ctx.lineTo(x,y+z*1.4); ctx.lineTo(x-z*.8,y); ctx.closePath(); ctx.fill() } ctx.restore() } }
/* ===== 보스 그림 파일: art/보스이름.png 가 있으면 그 그림으로 그려요 (없으면 코드 그림) =====
   face: 그림 속 보스가 바라보는 방향(1=오른쪽, -1=왼쪽) · w: 보스 크기에 대한 그림 너비 배율 */
const BOSS_ART = {}; const BOSS_ART_LIST = (typeof BOSS_ART_FILES!=="undefined"?BOSS_ART_FILES:{});
function loadBossArt(){ for(const k in BOSS_ART_LIST){ const o=BOSS_ART_LIST[k], im=new Image(); im.onload=()=>{ BOSS_ART[k]={im,face:o.face===undefined?1:o.face,w:o.w||4,dy:o.dy||0} }; im.src=o.src } }
loadBossArt();
const artOf = e=>BOSS_ART[e.bid]||BOSS_ART[e.look];
function drawBossArt(ctx,e,t,px){ const A=artOf(e); if(!A) return false;
  // 단계별 최대 크기 (약한 185 · 중간 215 · 강한 250 · 최종 295 픽셀 높이) · 강할수록 위엄 있게
  const tier=bossTier(e), MAXH=[185,215,250,295][Math.min(3,tier)], MAXW=MAXH*1.3;
  const r=e.r, fs=e._pose?e._pose.face:(px<e.x?-1:1); let w=r*A.w*.8, h=w*A.im.height/A.im.width; const sc=Math.min(1,MAXH/h,MAXW/w); w*=sc; h*=sc; const y0=e.y+r*.95+A.dy*r; e._artTop=y0-h;
  if(!A.rig&&!A.noRig){ const key=RIGS[e.bid]?e.bid:null; if(key) try{ buildRig(key,A) }catch(err){ A.noRig=1 } else A.noRig=1 }
  ctx.save(); ctx.translate(e.x,y0); if(A.face) ctx.scale(Math.sign(fs*A.face)*Math.max(.15,Math.abs(fs)),1);
  const paint=()=>{ if(A.rig) drawRig(ctx,A,e,t,w,h); else ctx.drawImage(A.im,-w/2,-h,w,h) };
  paint();
  if(e.flash>0){ ctx.globalCompositeOperation="lighter"; ctx.globalAlpha=Math.min(.7,e.flash*4); paint() }
  ctx.restore(); return true }
/* 조각 그림 그리기: 뒤 조각 → 몸통 → 앞 조각 (뱀은 몸통을 물결치게) */
function drawRig(ctx,A,e,t,w,h){ const R=A.rig, W=A.im.width, H=A.im.height, s=w/W, st=e._rs||{mv:0,walk:0};
  ctx.save(); ctx.scale(s,s); ctx.translate(-W/2,-H);
  const wave=x=>R.move==="slither"?Math.sin(x/W*Math.PI*2.2-t*4.2)*H*(.025+.02*st.mv)*(.3+.7*Math.abs(x/W-.55)*1.6):0;
  const SP=e._sp||(e._sp=[]), AT=st.atk;
  // 관절 스프링: 무기·팔이 목표 각도로 "휙" 따라가며 살짝 넘쳤다가 출렁이며 제자리로 (딱딱하게 꺾이지 않아요)
  const KZ=AT&&AT.strike?[620,.32]:AT&&AT.windup?[140,.85]:[85,.5];
  const part=(p,i)=>{ const M=partMotion(p,e,t,st), k=1/s, S=SP[i]||(SP[i]={r:M.rot,vr:0,x:M.dx,vx:0,y:M.dy,vy:0,h:[]}), dt=st.ft||0;
    if(dt>0){ const [K,Z]=KZ, C=2*Math.sqrt(K)*Z, n=Math.ceil(dt/.006), h=dt/n;
      for(let j=0;j<n;j++){ S.vr+=(K*(M.rot-S.r)-C*S.vr)*h; S.r+=S.vr*h; S.vx+=(K*(M.dx-S.x)-C*S.vx)*h; S.x+=S.vx*h; S.vy+=(K*(M.dy-S.y)-C*S.vy)*h; S.y+=S.vy*h } }
    else { S.r=M.rot; S.x=M.dx; S.y=M.dy; S.vr=0 }
    const px=p.px+S.x*k, py=p.py+S.y*k+wave(p.px), img=p.cv, ox=p.x0-p.px, oy=p.y0-p.py;
    // 휙 휘두를 때 잔상
    const fast=Math.abs(S.vr)>5&&(p.t==="weapon"||p.t==="arm"||p.t==="tail"||p.t==="spear"||p.t==="wing");
    if(fast){ ctx.save(); for(let j=0;j<S.h.length;j++){ ctx.globalAlpha=.22*(1-j/S.h.length)*Math.min(1,(Math.abs(S.vr)-5)/6); ctx.save(); ctx.translate(px,py); ctx.rotate(S.h[j]); if(M.sc!==1) ctx.scale(M.sc,M.sc); ctx.drawImage(img,ox,oy); ctx.restore() } ctx.restore() }
    S.h.unshift(S.r); if(S.h.length>3) S.h.length=3;
    ctx.save(); ctx.translate(px,py); ctx.rotate(S.r); if(M.sc!==1) ctx.scale(M.sc,M.sc); ctx.drawImage(img,ox,oy); ctx.restore() };
  if(RIGS[e.bid]&&RIGS[e.bid].aura) drawAura(ctx,RIGS[e.bid],e,t,st,W,H);
  R.parts.forEach((p,i)=>{ if(p.z===-1) part(p,i) });
  if(R.move==="slither"){ const N=26, sw=W/N; for(let i=0;i<N;i++){ const x=i*sw; ctx.drawImage(R.base,x,0,sw+1,H,x,wave(x+sw/2),sw+1,H) } }
  else ctx.drawImage(R.base,0,0);
  R.parts.forEach((p,i)=>{ if(p.z!==-1) part(p,i) });
  ctx.restore() }
/* ===== 보스 움직임: 보스마다 걷기·날기·말달리기·기어가기·통통 튀기 + 공격 모션(기 모으기 → 내지르기) ===== */
const BASIC_ATK={dash:1,stomp:1,rock:1,fire3:1};   // 기본 공격 (알림 없이 바로)
function bossPose(e,t,px){
  const want=px<e.x?-1:1; e.fs=e.fs===undefined?want:e.fs+(want-e.fs)*.12;   // 방향을 휙 바꾸지 않고 스르르
  // 실제로 움직인 거리로 속도 계산 (같이하기 친구 화면에서도 똑같이 움직여요)
  const ft=e._lt===undefined?0:Math.min(.1,Math.max(0,t-e._lt)); if(ft>0){ const v=Math.hypot(e.x-e._lx,e.y-e._ly)/ft; e._v=(e._v||0)+(Math.min(400,v)-(e._v||0))*Math.min(1,ft*6) } e._lt=t; e._lx=e.x; e._ly=e.y;
  const RG=RIGS[e.bid], mvT=RG?RG.move:(FLYERS[e.look]?"fly":"walk");
  const mv=e._fMv!==undefined?e._fMv:e.dash>0?1.3:Math.min(1.3,(e._v||0)/Math.max(30,e.sp||60));
  const gait={gallop:9,quad:7,walk:6,heavy:3.6,crawl:11,waddle:5,hop:4,squash:4,fly:3,hover:2,slither:3}[mvT]||6;
  e._wph=(e._wph||0)+ft*gait*(.35+mv);   // 걸음 박자
  if(e._fWp!==undefined) e._wph=e._fWp; const wp=e._wph, breath=Math.sin(t*2.1+e.wob);
  let sx=1+breath*.018, sy=1-breath*.025, rot=0, ox=0, oy=0, glow=0;
  const R=e.r;
  if(mvT==="fly"){ oy+=Math.sin(t*3.2+e.wob)*R*.2-R*.25; rot+=e.fs*.06*mv+Math.sin(t*1.6)*.03 }                       // 날갯짓하며 둥실 · 앞으로 기울기
  else if(mvT==="hover"){ oy+=Math.sin(t*2+e.wob)*R*.16-R*.15; rot+=Math.sin(t*1.3)*.03 }
  else if(mvT==="gallop"){ const b=Math.abs(Math.sin(wp)); oy+=-b*R*.18*Math.min(1,mv+.15); rot+=Math.sin(wp*2)*.05*mv; sx*=1+.03*Math.cos(wp*2)*mv }   // 다그닥: 들썩들썩 앞뒤로 흔들
  else if(mvT==="quad"){ oy+=-Math.abs(Math.sin(wp))*R*.08*mv; rot+=Math.sin(wp*2)*.03*mv }
  else if(mvT==="heavy"){ const st=Math.sin(wp); rot+=st*.06*Math.min(1,mv+.1); oy+=-Math.abs(st)*R*.05*mv; const land=Math.pow(Math.max(0,Math.cos(wp*2)),8); sy*=1-.04*land*mv; sx*=1+.03*land*mv }   // 쿵쿵 무거운 걸음
  else if(mvT==="crawl"){ oy+=Math.sin(wp*2)*R*.025*mv; rot+=Math.sin(wp)*.02*mv; sy*=.98 }
  else if(mvT==="waddle"){ rot+=Math.sin(wp)*.12*Math.min(1,mv+.2); oy+=-Math.abs(Math.sin(wp))*R*.06*mv }
  else if(mvT==="squash"||mvT==="hop"){ const k=(wp/Math.PI)%1, air=Math.sin(k*Math.PI); const m=Math.min(1,mv+.15); oy+=-air*R*(mvT==="hop"?.32:.22)*m; const sq=Math.pow(1-air,6)*m; sy*=1-.16*sq+.08*air*m; sx*=1+.14*sq-.05*air*m }
  else if(mvT==="slither"){ oy+=Math.sin(t*2.4)*R*.05; rot+=Math.sin(wp*.5)*.04 }
  else { rot+=Math.sin(wp)*.05*mv; oy+=-Math.abs(Math.sin(wp))*R*.07*mv }
  // 공격 모션
  let atk=null; const A=e.atk; if(A){ const u=t-A.t0, Wd=A.wind;
    if(u<Wd){ const k=u/Wd, ease=k*k*(3-2*k), shake=A.sp&&k>.5?Math.sin(t*60)*R*.02*k:0;   // 기 모으기: 뒤로 젖히며 커지고 빛나요 (특수 공격은 부들부들)
      sx*=1+.06*ease; sy*=1+.08*ease; rot+=-e.fs*.1*ease; ox+=-e.fs*R*.1*ease+shake; glow=ease; atk={wind:ease,hit:0,windT:ease,hitT:0,windup:1} }
    else if(u<Wd+.55){ const k=(u-Wd)/.55, hit=k<.25?Math.sin(k/.25*Math.PI/2):Math.cos((k-.25)/.75*Math.PI/2), wind=Math.max(0,1-k/.2);   // 내지르기 → 천천히 원래대로
      const lunge={dash:.5,stomp:.05,laser:.15,cross:.1}[A.k]??.22; ox+=e.fs*R*lunge*hit; rot+=e.fs*.12*hit;
      if(A.k==="stomp"){ sy*=1-.18*hit; sx*=1+.14*hit; oy+=R*.08*hit } else { sx*=1+.05*hit; sy*=1-.04*hit } glow=(1-k)*.8; atk={wind,hit,windT:0,hitT:k<.32?1:0,strike:k<.32,rec:k>=.32} }
    if(atk){ atk.any=1; atk.mel=!!MELEE[A.k]; atk.charge=!!A.sp; atk.part=RG?(A.part===undefined?(A.part=atkPartFor(RG,A.k,e.bid)):A.part):"" } }
  if(e.dash>0){ sx*=1.12; sy*=.9; rot+=e.fs*.08 }
  const ht=e.hitT!==undefined?t-e.hitT:9; if(ht<.14){ const k=1-ht/.14; ox+=-e.fs*R*.05*k; sx*=1-.03*k }
  e._rs={mv,walk:wp,fly:mvT==="fly",gallop:mvT==="gallop",atk,ft};
  return {sx,sy,rot,ox,oy,glow,face:e.fs} }
/* 특수 공격 알림: 「⚠ 기술 이름」 말풍선 + 남은 시간 고리 */
function bossWarn(ctx,e,t){ const A=e.atk; if(!A||!A.sp) return; const u=t-A.t0; if(u>A.wind+.15) return;
  const k=Math.min(1,u/A.wind), a=u<.12?u/.12:u>A.wind?1-(u-A.wind)/.15:1, y=Math.min(e.y-e.r*1.4,(e._artTop!==undefined?e._artTop:e.y-e.r*2.6))-24, ult=A.ult;
  ctx.save(); ctx.globalAlpha=Math.max(0,a); ctx.font=`${ult?24:20}px "Black Han Sans","Do Hyeon",sans-serif`; ctx.textAlign="center"; ctx.textBaseline="middle";
  const txt=(ult?"필살기 ":"")+(A.name||"특수 공격"), tw=ctx.measureText(txt).width, bw=tw+64, bh=ult?40:34, x=e.x, pul=1+.06*Math.sin(t*18);
  ctx.translate(x,y); ctx.scale(pul,pul);
  ctx.fillStyle=ult?"rgba(90,0,20,.88)":"rgba(40,10,10,.82)"; ctx.strokeStyle=ult?"#ffd36a":"#ff5a5a"; ctx.lineWidth=3;
  ctx.beginPath(); ctx.roundRect(-bw/2,-bh/2,bw,bh,bh/2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-8,bh/2-1); ctx.lineTo(0,bh/2+9); ctx.lineTo(8,bh/2-1); ctx.closePath(); ctx.fill();
  // 경고 표시 + 남은 시간 고리
  const cx=-bw/2+bh/2, cr=bh/2-5; ctx.fillStyle=ult?"#ffd36a":"#ff5a5a"; ctx.beginPath(); ctx.arc(cx,0,cr,0,7); ctx.fill();
  ctx.strokeStyle="#fff"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(cx,0,cr+.5,-Math.PI/2,-Math.PI/2+Math.PI*2*(1-k)); ctx.stroke();
  ctx.fillStyle="#2a0606"; ctx.font=`bold ${ult?20:17}px sans-serif`; ctx.fillText("!",cx,1);
  ctx.font=`${ult?24:20}px "Black Han Sans","Do Hyeon",sans-serif`; ctx.fillStyle="#fff"; ctx.fillText(txt,cx+bh/2+tw/2+4-0,1);
  ctx.restore();
  // 바닥에 위험 표시 (깜빡이는 빨간 원)
  ctx.save(); ctx.globalAlpha=.35+.3*Math.sin(t*16); ctx.strokeStyle=ult?"#ffd36a":"#ff4a4a"; ctx.lineWidth=3; ctx.setLineDash([10,8]); ctx.lineDashOffset=-t*40;
  ctx.beginPath(); ctx.ellipse(e.x,e.y+e.r*.95,e.r*(1.6+k*.6),e.r*(.5+k*.2),0,0,7); ctx.stroke(); ctx.restore() }
function drawMonster(ctx,e,t,px,py){
  if(e.type==="boss"){ const Q=bossPose(e,t,px); bossUnder(ctx,e,t);
    if(Q.glow>0){ const [cl]=BOSS_COL[e.mapId]||BOSS_COL[5]; ctx.save(); ctx.globalCompositeOperation="lighter"; const g=ctx.createRadialGradient(e.x,e.y,e.r*.2,e.x,e.y,e.r*2.2); g.addColorStop(0,`rgba(${cl},${.45*Q.glow})`); g.addColorStop(1,`rgba(${cl},0)`); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(e.x,e.y,e.r*2.2,0,7); ctx.fill();
      ctx.strokeStyle=`rgba(255,255,255,${.6*Q.glow})`; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(e.x,e.y,e.r*(1.8-Q.glow*.7),0,7); ctx.stroke(); ctx.restore() }
    const fy=e.y+e.r*.95; ctx.save(); ctx.translate(e.x+Q.ox,fy+Q.oy); ctx.rotate(Q.rot); ctx.scale(Q.sx,Q.sy); ctx.translate(-e.x,-fy);
    e._pose=Q; drawMonsterRaw(ctx,e,t,px,py,true); ctx.restore(); bossOver(ctx,e,t,!!artOf(e)); bossWarn(ctx,e,t); return }
  drawMonsterRaw(ctx,e,t,px,py,false) }
/* ===== 일반 몬스터 그림 (선생님이 보내 준 그림) · 몬스터마다 움직임이 달라요 =====
   hop: 통통 뛰기 · fly: 날갯짓하며 둥실 · sway: 줄기째 흔들흔들 · scuttle: 다다닥 · trot: 네 발로 총총 · march: 씩씩하게 걷기 */
const MOB_ART={}; let _mobArtOn=false;
function loadMobArt(){ if(_mobArtOn) return; _mobArtOn=true; const F=typeof MOB_ART_FILES!=="undefined"?MOB_ART_FILES:{};
  for(const k in F){ const im=new Image(); im.onload=()=>{ MOB_ART[k]={im,hv:{}} }; im.src=F[k] } }
const MOB_STYLE={ // [움직임, 키(몸 반지름의 몇 배), 그림이 보는 방향(1 오른쪽 · 0 정면)]
  slime:["hop",2.9,0], flower:["sway",4.3,1], ladybug:["scuttle",2.9,1], moth:["fly",3.5,0], bee:["fly",3.3,1],
  mushroom:["hop",3.3,0], acorn:["march",3.6,1], fox:["trot",3.2,-1], beetle:["scuttle",2.6,-1], boar:["trot",2.4,-1],
  wisp:["fly",3.6,0], jar:["hop",3.0,0], mummy:["march",3.7,-1], cobra:["sway",3.5,-1], scorpion:["scuttle",2.7,-1],
  bat:["fly",2.6,0], crystal:["fly",3.6,0], wraith:["float",3.3,1], mole:["march",3.2,1], spider:["scuttle",2.5,0],
  imp:["march",3.2,1], skeleton:["march",3.5,-1], fireimp:["fly",3.4,0], hound:["trot",2.7,1], lavaslime:["hop",2.5,0],
  gale:["float",3.2,0], crow:["fly",3.0,-1], jelly:["float",3.5,0], stormeye:["float",2.4,0], cloudgiant:["march",2.6,0],
  sentinel:["march",3.8,-1], mask:["fly",2.8,0], orb:["float",2.6,0], gargoyle:["hop",2.9,-1], colossus:["march",2.7,0],
  icesprite:["float",3.2,0], frostwolf:["trot",2.4,-1], yetiling:["march",3.0,0],
  griffin:["trot",3.6,-1], medusa:["march",3.6,1], minotaur:["march",3.3,-1], titan:["march",3.0,0],
  rider:["trot",3.1,1], engine:["float",2.6,0], devourer:["sway",3.6,1], ruler:["march",3.5,0], behemoth:["march",2.9,1] };
const MOB_STYLE_MAP={"8:crystal":["float",3.1,0]};   // 같은 모양 이름이라도 맵마다 다르게
const mobArtOf=e=>{ loadMobArt(); return MOB_ART[e.mapId+":"+e.look] };
const MOB_RIM={1:"rgba(255,255,235,.38)",2:"rgba(255,232,180,.5)",3:"rgba(60,25,10,.45)",4:"rgba(225,210,255,.42)",5:"rgba(255,190,120,.4)",6:"rgba(230,250,255,.45)",7:"rgba(40,50,80,.35)",8:"rgba(20,50,90,.4)",9:"rgba(60,40,20,.35)",10:"rgba(200,170,255,.4)"};   // 바닥에 묻히지 않게 몸 둘레에 밝은 테두리
function mobRim(A,col){ if(A.rim) return A.rim; const p=7, c=document.createElement("canvas"); c.width=A.im.width+p*2; c.height=A.im.height+p*2; const x=c.getContext("2d");
  for(let i=0;i<12;i++){ const a=i*Math.PI/6; x.drawImage(A.im,p+Math.cos(a)*3.5,p+Math.sin(a)*3.5) }
  x.globalCompositeOperation="source-in"; x.fillStyle=col; x.fillRect(0,0,c.width,c.height); A.rimP=p; return A.rim=c }
/* 렉 줄이기: 화면에 그릴 크기로 미리 줄여 둔 그림을 써요 (테두리까지 합쳐서 한 장) */
function mobScaled(A,rc,H){ const dp=Math.min(2,window.devicePixelRatio||1), key=Math.max(8,Math.round(H*dp/4)*4); A.sc=A.sc||{}; if(A.sc[key]) return A.sc[key];
  let src=A.im, p=0; if(rc){ if(!A.comb){ const R=mobRim(A,rc), c=document.createElement("canvas"); c.width=R.width; c.height=R.height; const x=c.getContext("2d"); x.drawImage(R,0,0); x.drawImage(A.im,A.rimP,A.rimP); A.comb=c } src=A.comb; p=A.rimP }
  const s=key/A.im.height, c=document.createElement("canvas"); c.width=Math.max(1,Math.round(src.width*s)); c.height=Math.max(1,Math.round(src.height*s));
  // 두 번에 나눠 줄이면 더 깔끔해요
  let cur=src; while(cur.width*.5>c.width*1.05){ const h=document.createElement("canvas"); h.width=Math.round(cur.width*.5); h.height=Math.round(cur.height*.5); const hx=h.getContext("2d"); hx.imageSmoothingQuality="high"; hx.drawImage(cur,0,0,h.width,h.height); cur=h }
  const x=c.getContext("2d"); x.imageSmoothingQuality="high"; x.drawImage(cur,0,0,c.width,c.height); return A.sc[key]=c }
function mobArtImg(A,hue,white){ const key=white?"w":hue||0; if(key===0) return A.im; if(A.hv[key]) return A.hv[key];
  const c=document.createElement("canvas"); c.width=A.im.width; c.height=A.im.height; const x=c.getContext("2d");
  if(white){ x.drawImage(A.im,0,0); x.globalCompositeOperation="source-in"; x.fillStyle="#fff"; x.fillRect(0,0,c.width,c.height) }
  else { try{ x.filter=`hue-rotate(${hue}deg)` }catch(err){} x.drawImage(A.im,0,0) }
  return A.hv[key]=c }
function drawMobArt(ctx,e,t,px,py){ const A=mobArtOf(e); if(!A) return false;
  const [an,hk,fc]=MOB_STYLE_MAP[e.mapId+":"+e.look]||MOB_STYLE[e.look]||["march",3,1], r=e.r, H=r*hk*1.15, W=H*A.im.width/A.im.height, ph=t+e.wob*.7, still=e.stun>0?0:1;
  const age=e.born!==undefined?t-e.born:9, pop=age<.3?.35+.65*(1-Math.pow(1-age/.3,3)):1;
  const ht=e.hitT!==undefined?t-e.hitT:9, rec=ht<.15?1-ht/.15:0;
  let lift=0, sx=1, sy=1, rot=0;
  if(an==="hop"){ const k=((ph*1.7)%1+1)%1, air=Math.sin(k*Math.PI)*still, land=Math.pow(1-air,6); lift=air*r*.55; sx=1+.17*land*still-.05*air; sy=1-.15*land*still+.08*air }
  else if(an==="fly"){ lift=r*.8+Math.sin(ph*5)*r*.28; rot=Math.sin(ph*2.6)*.09; sy=1+Math.sin(ph*24)*.04 }
  else if(an==="sway"){ rot=Math.sin(ph*2.3)*.1; sy=1+Math.sin(ph*4.6)*.035; sx=1-Math.sin(ph*4.6)*.02 }
  else if(an==="scuttle"){ lift=Math.abs(Math.sin(ph*17))*r*.07*still; rot=Math.sin(ph*17)*.035*still }
  else if(an==="trot"){ const b=Math.abs(Math.sin(ph*9)); lift=b*r*.2*still; rot=Math.sin(ph*9)*.06*still; sy=1+(b-.5)*.05*still }
  else if(an==="float"){ lift=r*.55+Math.sin(ph*2.4)*r*.22; rot=Math.sin(ph*1.7)*.12; sx=1+Math.sin(ph*3.4)*.05; sy=1-Math.sin(ph*3.4)*.05 }
  else { const b=Math.abs(Math.sin(ph*7)); lift=b*r*.16*still; rot=Math.sin(ph*7)*.08*still }
  // 공격 모션: 가까이 오면 몬스터마다 다르게 덤벼요 (뒤로 살짝 물러났다가 → 휙!)
  let ax=0, ay=0; const dx=px-e.x, dy=(py===undefined?e.y:py)-e.y, d=Math.hypot(dx,dy)||1, AK=still*Math.max(0,Math.min(1,1-(d-r-18)/45));
  if(AK>0){ const cyc=((t*2.1+e.wob)%1+1)%1, s=cyc<.6?-.3*Math.sin(cyc/.6*Math.PI):Math.sin((cyc-.6)/.4*Math.PI), ux=dx/d, uy=dy/d, k=s*AK, sd=dx<0?-1:1;
    if(an==="hop"){ ax=ux*r*.7*Math.max(0,k); lift+=r*.6*Math.max(0,k); sy*=1+.12*k; sx*=1-.08*k }                 // 폴짝 몸통 박치기
    else if(an==="fly"){ ax=ux*r*.8*k; ay=uy*r*.5*k; lift-=r*.5*Math.max(0,k); rot+=sd*.35*k }                      // 아래로 휙 급강하
    else if(an==="sway"){ rot+=sd*.45*k; sx*=1+.15*Math.max(0,k); ax=ux*r*.35*k }                                   // 고개를 홱 내밀어 물기
    else if(an==="scuttle"){ const j=Math.sin(t*30)*.5+.5; ax=ux*r*.45*k*j; ay=uy*r*.3*k*j; rot+=sd*.08*k }         // 다다닥 집게·턱 찌르기
    else if(an==="trot"){ ax=ux*r*.9*k; ay=uy*r*.4*k; rot+=sd*.18*k; sx*=1+.1*Math.max(0,k) }                       // 머리 숙여 들이받기
    else if(an==="float"){ ax=ux*r*.9*k; ay=uy*r*.6*k; sx*=1+.2*Math.max(0,k); sy*=1-.12*Math.max(0,k) }            // 스르르 쭉 늘어나며 덮치기
    else { rot+=sd*(k<0?.35:-.55)*Math.abs(k); ax=ux*r*.4*k }                                                        // 무기 들었다가 내려치기
  }
  sx*=pop*(1+rec*.18); sy*=pop*(1-rec*.15);
  const f=fc? (px<e.x?-1:1)*fc : 1, gy=e.y+r*.95;
  const sh=Math.max(.45,1-lift/(r*2.5)); ctx.fillStyle="rgba(0,0,0,.3)"; ctx.beginPath(); ctx.ellipse(e.x,gy,W*.36*sh*pop,r*.32*sh*pop,0,0,7); ctx.fill();
  ctx.save(); ctx.imageSmoothingEnabled=true; ctx.translate(e.x+ax,gy-lift+ay); if(rot) ctx.rotate(rot); ctx.scale(sx*f,sy);
  { const S=mobScaled(A,MOB_RIM[e.mapId],H), k=W/A.im.width, p=(A.rimP||0)*k; ctx.drawImage(S,-W/2-p,-H-p,W+p*2,H+p*2) }
  if(e.flash>0){ ctx.globalAlpha=Math.min(.85,e.flash*7); ctx.drawImage(mobArtImg(A,0,1),-W/2,-H,W,H) }
  ctx.restore(); return true }
function drawMonsterRaw(ctx,e,t,px,py,posed){
  if(e.type!=="boss" && drawMobArt(ctx,e,t,px,py)) return;
  if(e.type==="boss" && artOf(e)){ ctx.fillStyle="rgba(0,0,0,.25)"; ctx.beginPath(); ctx.ellipse(e.x,e.y+e.r*.95,e.r*1.2,e.r*.35,0,0,7); ctx.fill(); drawBossArt(ctx,e,t,px); return }
  const fly=FLYERS[e.look], ph=t*(fly?5:8)+e.wob*3;
  // 등장할 때 톡 튀어나오기
  const age=e.born!==undefined?t-e.born:9, pop=age<.3?.35+.65*(1-Math.pow(1-age/.3,3)):1;
  // 맞으면 뒤로 살짝 밀리고 찌그러지기
  const ht=e.hitT!==undefined?t-e.hitT:9, rec=ht<.15?(1-ht/.15):0;
  const moving=e.stun>0?0:1;
  const bob = fly ? Math.sin(ph)*e.r*.22 : -Math.abs(Math.sin(ph))*e.r*.16*moving;
  const sq = fly ? 1 : 1+Math.sin(ph*2)*.06*moving, breath=1+Math.sin(t*2.2+e.wob)*.025;
  const sx=pop*breath/sq*(1+rec*.18), sy=pop*breath*sq*(1-rec*.15);
  // 그림자: 뛰어오르면 작아져요
  const sh=1+bob/(e.r*2);
  ctx.fillStyle="rgba(0,0,0,.22)"; ctx.beginPath(); ctx.ellipse(e.x,e.y+e.r*.95,e.r*.95*sh*pop,e.r*.3*sh*pop,0,0,7); ctx.fill();
  ctx.save();
  const ox=(e.hx||0)*rec*6, oy=(e.hy||0)*rec*6 + (fly?bob-e.r*.35:bob);
  ctx.translate(e.x+ox, e.y+e.r*.9+oy); ctx.scale(sx*1.18,sy*1.18); ctx.translate(-e.x, -(e.y+e.r*.9));
  if(SPR.on && e.type!=="boss" && e.r>0 && isFinite(e.r)){ const [cv,S]=sprFrame(e,t,px); if(cv.width&&cv.height) ctx.drawImage(cv,e.x-S,e.y-S,S*2,S*2) }
  else { (LOOKS[e.look]||LOOKS.slime)(ctx,e,t,px,py); if(e.flash<=0 && EXTRA[e.look]) EXTRA[e.look](ctx,e,t,px,py) }
  // 맞은 순간 빨갛게 번쩍
  if(rec>0){ ctx.globalAlpha=rec*.45; ctx.fillStyle="#ff3a4a"; ctx.beginPath(); ctx.ellipse(e.x,e.y,e.r*1.05,e.r*.95,0,0,7); ctx.fill(); ctx.globalAlpha=1 }
  ctx.restore();
  if(e.type!=="boss" && !e.elite && e.hp<e.max && e.max>0){ const w=Math.max(18,e.r*1.6); ctx.fillStyle="rgba(0,0,0,.55)"; ctx.fillRect(e.x-w/2-1,e.y-e.r*1.45-1,w+2,5); ctx.fillStyle=e.hp/e.max>.5?"#7ee06a":e.hp/e.max>.25?"#e89018":"#ff4a5a"; ctx.fillRect(e.x-w/2,e.y-e.r*1.45,w*Math.max(0,e.hp/e.max),3) }
  // 큰 몬스터는 걸을 때 흙먼지
  if(!fly && (e.type==="big"||e.type==="boss") && moving && Math.sin(ph)>0.97){ ctx.fillStyle="rgba(180,160,130,.45)"; for(let i=0;i<3;i++){ ctx.beginPath(); ctx.arc(e.x+(i-1)*e.r*.6,e.y+e.r*.95,e.r*.18,0,7); ctx.fill() } }
  if(e.slow>0){ ctx.strokeStyle="rgba(99,176,255,.9)"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(e.x,e.y,e.r+4,0,7); ctx.stroke() }
  if(e.stun>0){ ctx.fillStyle="#ffe066"; for(let i=0;i<3;i++){ const a=t*6+i*2.1; ctx.beginPath(); ctx.arc(e.x+Math.cos(a)*e.r*.8,e.y-e.r-8+Math.sin(a)*3,3,0,7); ctx.fill() } }
  if(e.type==="boss"){ const r=e.r;
    if(e.crown==="flower"){ ctx.fillStyle="#2a1a10"; for(let i=0;i<5;i++){ const x=e.x+(i-2)*r*.26, h=r*(i%2?.32:.5); ctx.beginPath(); ctx.moveTo(x-r*.1,e.y-r*.92); ctx.lineTo(x,e.y-r*.92-h); ctx.lineTo(x+r*.1,e.y-r*.92); ctx.fill() }
      ctx.fillRect(e.x-r*.6,e.y-r*.98,r*1.2,r*.12); ctx.fillStyle="#c8283a"; [-1,0,1].forEach(i=>{ ctx.beginPath(); ctx.arc(e.x+i*r*.4,e.y-r*.93,r*.07,0,7); ctx.fill() }) }
    else if(e.crown==="gold"){ const y=e.y-r*(e.look==="mushroom"?1.05:e.look==="golem"?1.25:1.05);
      ctx.fillStyle="#f6c544"; ctx.beginPath(); ctx.moveTo(e.x-r*.45,y); ctx.lineTo(e.x-r*.45,y-r*.4); ctx.lineTo(e.x-r*.22,y-r*.18); ctx.lineTo(e.x,y-r*.5); ctx.lineTo(e.x+r*.22,y-r*.18); ctx.lineTo(e.x+r*.45,y-r*.4); ctx.lineTo(e.x+r*.45,y); ctx.closePath(); ctx.fill();
      ctx.fillStyle="#e9475f"; ctx.beginPath(); ctx.arc(e.x,y-r*.15,r*.08,0,7); ctx.fill() } }

}
/* ===== 천공 몬스터 (6 용오름 첨탑 · 7 하늘 성) ===== */
Object.assign(LOOKS, {
  gale(ctx,e,t,px,py){ const r=e.r, a0=t*6+e.wob;
    ctx.save(); ctx.globalAlpha=.9;
    for(let k=0;k<3;k++){ const rr=r*(1.35-k*.28); ctx.strokeStyle=_C(e,k===0?"rgba(170,240,255,.55)":k===1?"#7ad8ff":"#d8f8ff"); ctx.lineWidth=r*(.22-k*.04); ctx.lineCap="round";
      ctx.beginPath(); ctx.arc(e.x,e.y,rr,a0*(1+k*.3)+k,a0*(1+k*.3)+k+3.6); ctx.stroke() }
    ctx.restore();
    for(let i=0;i<4;i++){ const ph=(t*1.6+i/4+e.wob)%1, a=-a0*.7+i*1.57; ctx.fillStyle=`rgba(200,250,255,${.7*(1-ph)})`; ctx.beginPath(); ctx.arc(e.x+Math.cos(a)*r*(1.1+ph*.6),e.y+Math.sin(a)*r*(.8+ph*.4)+ph*r*.6,r*.12*(1-ph)+1,0,7); ctx.fill() }
    _blob(ctx,e,e.x,e.y,r*.72,r*.68,"#2a6a8a");
    ctx.strokeStyle=_C(e,"rgba(140,230,255,.8)"); ctx.lineWidth=1.4; ctx.beginPath(); ctx.arc(e.x,e.y,r*.45,a0,a0+4); ctx.stroke();
    _face(ctx,e,t,px,py,e.y-r*.08,r*.26,r*.17,{mouth:"none"}) },
  crow(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, fl=Math.sin(t*16+e.wob);
    [-1,1].forEach(s=>{ const tip=e.y-r*.7-fl*r*.6; const wg=ctx.createLinearGradient(e.x,0,e.x+s*r*2.1,0); wg.addColorStop(0,_C(e,"#1c2440")); wg.addColorStop(1,_C(e,"#0a0e1e"));
      ctx.fillStyle=wg; ctx.beginPath(); ctx.moveTo(e.x+s*r*.4,e.y-r*.2);
      ctx.quadraticCurveTo(e.x+s*r*1.3,tip-r*.2,e.x+s*r*2.1,tip); for(let k=0;k<4;k++){ const u=1-k/4; ctx.lineTo(e.x+s*r*(1.95-k*.32),tip+r*(.45+k*.12)+fl*r*.1*k); ctx.lineTo(e.x+s*r*(1.75-k*.32),tip+r*(.2+k*.16)) }
      ctx.lineTo(e.x+s*r*.5,e.y+r*.25); ctx.closePath(); ctx.fill(); _ol(ctx,1.2);
      ctx.strokeStyle=_C(e,"rgba(120,220,255,.6)"); ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(e.x+s*r*.6,e.y-r*.15); ctx.quadraticCurveTo(e.x+s*r*1.3,tip-r*.05,e.x+s*r*2,tip+r*.05); ctx.stroke() });
    ctx.fillStyle=_C(e,"#141a30"); ctx.beginPath(); ctx.moveTo(e.x-r*.35,e.y+r*.6); ctx.lineTo(e.x,e.y+r*1.25); ctx.lineTo(e.x+r*.35,e.y+r*.6); ctx.fill();
    _blob(ctx,e,e.x,e.y,r*.82,r*.86,"#222b4a");
    ctx.fillStyle=_C(e,"#2e3a62"); for(let k=0;k<3;k++){ ctx.beginPath(); ctx.moveTo(e.x-r*.15+k*r*.12,e.y-r*.75); ctx.lineTo(e.x-r*.35+k*r*.2,e.y-r*1.35+k*r*.1); ctx.lineTo(e.x+r*.05+k*r*.12,e.y-r*.8); ctx.fill() }
    ctx.fillStyle=_C(e,"#f6c544"); ctx.beginPath(); ctx.moveTo(e.x+f*r*.25,e.y+r*.0); ctx.lineTo(e.x+f*r*.95,e.y+r*.18); ctx.quadraticCurveTo(e.x+f*r*.7,e.y+r*.42,e.x+f*r*.25,e.y+r*.3); ctx.fill(); _ol(ctx,1);
    _face(ctx,e,t,px,py,e.y-r*.25,r*.3,r*.2,{mouth:"none",shift:f*r*.05}) },
  stormeye(ctx,e,t,px,py){ const r=e.r;
    for(let i=0;i<9;i++){ const a=t*1.2+i*.698+e.wob, d=r*(1.05+.08*Math.sin(t*3+i)); _blob(ctx,e,e.x+Math.cos(a)*d,e.y+Math.sin(a)*d*.85,r*.42,r*.36,i%2?"#3a4560":"#4c5878") }
    if(Math.sin(t*7+e.wob*3)>.86){ ctx.strokeStyle="#bff4ff"; ctx.lineWidth=2; ctx.beginPath(); let x=e.x-r*1.2, y=e.y-r*.4; ctx.moveTo(x,y); for(let k=0;k<5;k++){ x+=r*.45; y+=(k%2?-1:1)*r*.3; ctx.lineTo(x,y) } ctx.stroke() }
    const eg=ctx.createRadialGradient(e.x-r*.2,e.y-r*.25,r*.05,e.x,e.y,r*.85); eg.addColorStop(0,_C(e,"#ffffff")); eg.addColorStop(.7,_C(e,"#d8dfe8")); eg.addColorStop(1,_C(e,"#8a96a8"));
    ctx.fillStyle=eg; ctx.beginPath(); ctx.ellipse(e.x,e.y,r*.82,r*.72,0,0,7); ctx.fill(); _ol(ctx);
    ctx.strokeStyle="rgba(200,40,60,.5)"; ctx.lineWidth=1; for(let k=0;k<5;k++){ const a=k*1.25+.3; ctx.beginPath(); ctx.moveTo(e.x+Math.cos(a)*r*.78,e.y+Math.sin(a)*r*.66); ctx.quadraticCurveTo(e.x+Math.cos(a+.3)*r*.55,e.y+Math.sin(a+.3)*r*.45,e.x+Math.cos(a)*r*.42,e.y+Math.sin(a)*r*.36); ctx.stroke() }
    const dx=px-e.x, dy=py-e.y, d=Math.hypot(dx,dy)||1, lx=dx/d*r*.2, ly=dy/d*r*.14;
    const ig=ctx.createRadialGradient(e.x+lx,e.y+ly,0,e.x+lx,e.y+ly,r*.42); ig.addColorStop(0,"#eaffff"); ig.addColorStop(.35,"#3ad8ff"); ig.addColorStop(1,"#0a3a6a");
    ctx.fillStyle=e.flash>0?"#fff":ig; ctx.beginPath(); ctx.arc(e.x+lx,e.y+ly,r*.4,0,7); ctx.fill();
    ctx.fillStyle="#04060c"; ctx.beginPath(); ctx.ellipse(e.x+lx,e.y+ly,r*.07,r*.32,0,0,7); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,.85)"; ctx.beginPath(); ctx.arc(e.x+lx-r*.14,e.y+ly-r*.16,r*.07,0,7); ctx.fill();
    ctx.strokeStyle="#0c0208"; ctx.lineWidth=r*.12; ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(e.x-r*.8,e.y-r*.5); ctx.quadraticCurveTo(e.x,e.y-r*.2,e.x+r*.8,e.y-r*.5); ctx.stroke(); ctx.lineCap="butt" },
  cloudgiant(ctx,e,t,px,py){ const r=e.r, sw=Math.sin(t*3+e.wob)*r*.12;
    const gl=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,r*1.8); gl.addColorStop(0,"rgba(90,200,255,.22)"); gl.addColorStop(1,"rgba(60,120,200,0)"); ctx.fillStyle=gl; ctx.beginPath(); ctx.arc(e.x,e.y,r*1.8,0,7); ctx.fill();
    [-1,1].forEach(s=>{ _blob(ctx,e,e.x+s*r*1.05,e.y+r*.15+s*sw,r*.38,r*.34,"#3c4664"); _blob(ctx,e,e.x+s*r*1.25,e.y+r*.5+s*sw,r*.3,r*.27,"#323a56") });
    [[-.55,.45,.5],[.55,.45,.5],[0,.55,.55],[-.45,-.25,.55],[.45,-.25,.55],[0,-.45,.62]].forEach(([a,b,z],i)=>_blob(ctx,e,e.x+a*r,e.y+b*r,r*z,r*z*.9,i<3?"#2c344e":"#465274"));
    ctx.fillStyle="#140a1a"; ctx.beginPath(); ctx.ellipse(e.x,e.y+r*.2,r*.42,r*.2,0,0,7); ctx.fill();
    const lk=.5+.5*Math.sin(t*9+e.wob); ctx.fillStyle=`rgba(150,240,255,${.5+.5*lk})`; ctx.beginPath(); ctx.ellipse(e.x,e.y+r*.22,r*.3,r*.1,0,0,7); ctx.fill();
    ctx.strokeStyle="#ffffff"; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(e.x-r*.25,e.y+r*.2); ctx.lineTo(e.x-r*.1,e.y+r*.28); ctx.lineTo(e.x,e.y+r*.16); ctx.lineTo(e.x+r*.15,e.y+r*.27); ctx.stroke();
    _face(ctx,e,t,px,py,e.y-r*.32,r*.32,r*.22,{mouth:"none"});
    if(Math.sin(t*5+e.wob*2)>.8){ ctx.strokeStyle="#dff8ff"; ctx.lineWidth=2.4; ctx.beginPath(); let x=e.x+r*.4, y=e.y+r*.6; ctx.moveTo(x,y); for(let k=0;k<4;k++){ x+=(k%2?-1:1)*r*.2; y+=r*.3; ctx.lineTo(x,y) } ctx.stroke() } },
  sentinel(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, fl=Math.sin(t*10+e.wob)*.25;
    [-1,1].forEach(s=>{ ctx.save(); ctx.translate(e.x+s*r*.45,e.y-r*.25); ctx.rotate(s*(-.5+fl)); for(let k=0;k<4;k++){ ctx.fillStyle=_C(e,k%2?"#e8eef8":"#ffffff"); ctx.beginPath(); ctx.ellipse(s*r*(.35+k*.22),-r*(.25+k*.08),r*.42-k*r*.06,r*.12,s*(.5+k*.12),0,7); ctx.fill(); _ol(ctx,1) } ctx.restore() });
    ctx.save(); ctx.translate(e.x+f*r*.8,e.y+r*.1); ctx.rotate(f*.2); ctx.fillStyle="#8a6a3a"; ctx.fillRect(-1.5,-r*1.5,3,r*2); ctx.fillStyle=_C(e,"#f6e08a"); ctx.beginPath(); ctx.moveTo(0,-r*2.0); ctx.lineTo(r*.16,-r*1.5); ctx.lineTo(-r*.16,-r*1.5); ctx.fill(); _ol(ctx,1); ctx.restore();
    _blob(ctx,e,e.x,e.y+r*.25,r*.7,r*.6,"#c8d2e2");
    ctx.fillStyle=_C(e,"#f6c544"); ctx.fillRect(e.x-r*.55,e.y+r*.05,r*1.1,r*.1); ctx.beginPath(); ctx.arc(e.x,e.y+r*.35,r*.14,0,7); ctx.fill();
    _blob(ctx,e,e.x,e.y-r*.45,r*.6,r*.58,"#e2e8f2");
    ctx.fillStyle="#141824"; ctx.fillRect(e.x-r*.42,e.y-r*.52,r*.84,r*.14); ctx.fillRect(e.x-r*.07,e.y-r*.52,r*.14,r*.42);
    const gl=.6+.4*Math.sin(t*5+e.wob); ctx.fillStyle=e.flash>0?"#fff":`rgba(255,220,90,${gl})`; ctx.fillRect(e.x-r*.38,e.y-r*.49,r*.76,r*.06);
    ctx.fillStyle=_C(e,"#f6c544"); ctx.beginPath(); ctx.moveTo(e.x,e.y-r*1.0); ctx.quadraticCurveTo(e.x-f*r*.8,e.y-r*1.5,e.x-f*r*1.1,e.y-r*.9); ctx.quadraticCurveTo(e.x-f*r*.5,e.y-r*1.15,e.x,e.y-r*.95); ctx.fill();
    _hl(ctx,e.x-r*.3,e.y-r*.75,r*.18,r*.08,.6) },
  mask(ctx,e,t,px,py){ const r=e.r, fl=Math.sin(t*14+e.wob);
    ctx.strokeStyle=_C(e,"rgba(255,230,140,.9)"); ctx.lineWidth=2.2; ctx.beginPath(); ctx.ellipse(e.x,e.y-r*1.05,r*.55,r*.16,0,0,7); ctx.stroke();
    [-1,1].forEach(s=>{ for(let k=0;k<3;k++){ ctx.fillStyle=_C(e,k===0?"#fff6d8":k===1?"#f0e2b0":"#e2cc88"); ctx.beginPath(); ctx.ellipse(e.x+s*r*(.95+k*.28),e.y-r*(.1+k*.12)-fl*r*.2*(k+1)/3,r*(.5-k*.1),r*.14,s*(-.35-k*.2-fl*.2),0,7); ctx.fill(); _ol(ctx,1) } });
    const mg=ctx.createLinearGradient(0,e.y-r,0,e.y+r); mg.addColorStop(0,_C(e,"#ffe89a")); mg.addColorStop(.5,_C(e,"#f6c544")); mg.addColorStop(1,_C(e,"#a8781a"));
    ctx.fillStyle=mg; ctx.beginPath(); ctx.moveTo(e.x,e.y-r*.85); ctx.quadraticCurveTo(e.x+r*.85,e.y-r*.8,e.x+r*.7,e.y+r*.1); ctx.quadraticCurveTo(e.x+r*.45,e.y+r*.85,e.x,e.y+r*.95); ctx.quadraticCurveTo(e.x-r*.45,e.y+r*.85,e.x-r*.7,e.y+r*.1); ctx.quadraticCurveTo(e.x-r*.85,e.y-r*.8,e.x,e.y-r*.85); ctx.fill(); _ol(ctx);
    ctx.strokeStyle=_C(e,"#8a5a10"); ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(e.x,e.y-r*.8); ctx.lineTo(e.x,e.y-r*.25); ctx.stroke();
    [-1,1].forEach(s=>{ ctx.fillStyle="#0c0610"; ctx.beginPath(); ctx.moveTo(e.x+s*r*.12,e.y-r*.12); ctx.quadraticCurveTo(e.x+s*r*.45,e.y-r*.38,e.x+s*r*.58,e.y-r*.18); ctx.quadraticCurveTo(e.x+s*r*.4,e.y+r*.05,e.x+s*r*.12,e.y-r*.12); ctx.fill();
      const gl=.6+.4*Math.sin(t*6+e.wob+s); ctx.fillStyle=e.flash>0?"#fff":`rgba(255,255,230,${gl})`; ctx.beginPath(); ctx.arc(e.x+s*r*.36,e.y-r*.16,r*.08,0,7); ctx.fill() });
    ctx.fillStyle="#2a1406"; ctx.beginPath(); ctx.moveTo(e.x-r*.25,e.y+r*.42); ctx.quadraticCurveTo(e.x,e.y+r*.3,e.x+r*.25,e.y+r*.42); ctx.quadraticCurveTo(e.x,e.y+r*.62,e.x-r*.25,e.y+r*.42); ctx.fill();
    _hl(ctx,e.x-r*.35,e.y-r*.5,r*.18,r*.1,.7) },
  gargoyle(ctx,e,t,px,py){ const r=e.r, fl=Math.sin(t*9+e.wob);
    [-1,1].forEach(s=>{ const wg=ctx.createLinearGradient(e.x,0,e.x+s*r*2,0); wg.addColorStop(0,_C(e,"#6a6a78")); wg.addColorStop(1,_C(e,"#3a3a46"));
      ctx.fillStyle=wg; ctx.beginPath(); ctx.moveTo(e.x+s*r*.5,e.y-r*.35); ctx.lineTo(e.x+s*r*1.3,e.y-r*1.2-fl*r*.3); ctx.lineTo(e.x+s*r*2.0,e.y-r*.9-fl*r*.4); ctx.lineTo(e.x+s*r*1.75,e.y-r*.25); ctx.lineTo(e.x+s*r*1.45,e.y-r*.4); ctx.lineTo(e.x+s*r*1.25,e.y+r*.05); ctx.lineTo(e.x+s*r*.95,e.y-r*.1); ctx.lineTo(e.x+s*r*.6,e.y+r*.2); ctx.closePath(); ctx.fill(); _ol(ctx,1.3) });
    _blob(ctx,e,e.x,e.y+r*.1,r*.88,r*.85,"#8a8a96");
    ctx.strokeStyle="rgba(30,30,40,.6)"; ctx.lineWidth=1.3; ctx.beginPath(); ctx.moveTo(e.x+r*.3,e.y-r*.4); ctx.lineTo(e.x+r*.15,e.y); ctx.lineTo(e.x+r*.35,e.y+r*.35); ctx.moveTo(e.x-r*.5,e.y+r*.2); ctx.lineTo(e.x-r*.3,e.y+r*.45); ctx.stroke();
    [-1,1].forEach(s=>{ ctx.fillStyle=_C(e,"#4a4a56"); ctx.beginPath(); ctx.moveTo(e.x+s*r*.3,e.y-r*.7); ctx.quadraticCurveTo(e.x+s*r*.9,e.y-r*1.1,e.x+s*r*.7,e.y-r*1.6); ctx.quadraticCurveTo(e.x+s*r*.6,e.y-r*1.05,e.x+s*r*.1,e.y-r*.82); ctx.fill(); _ol(ctx,1) });
    _face(ctx,e,t,px,py,e.y-r*.2,r*.32,r*.22,{mouth:"grin"});
    ctx.fillStyle=_C(e,"#5a5a66"); [-1,1].forEach(s=>{ ctx.beginPath(); ctx.ellipse(e.x+s*r*.45,e.y+r*.85,r*.25,r*.14,0,0,7); ctx.fill() }) },
  colossus(ctx,e,t,px,py){ const r=e.r, step=Math.sin(t*4+e.wob)*r*.06, gl=.55+.45*Math.sin(t*3+e.wob);
    ctx.fillStyle=_C(e,"#b8b4a8"); [-1,1].forEach(s=>{ ctx.fillRect(e.x+s*r*.45-r*.2,e.y+r*.45+s*step,r*.4,r*.55) });
    [-1,1].forEach(s=>{ ctx.save(); ctx.translate(e.x+s*r*1.0,e.y-r*.1); ctx.rotate(s*.15+Math.sin(t*2+e.wob)*.08*s); _blob(ctx,e,0,r*.35,r*.3,r*.55,"#cfcabd"); _blob(ctx,e,0,r*.95,r*.32,r*.26,"#bdb8aa"); ctx.restore() });
    ctx.fillStyle=_G(ctx,e,e.x,e.y,r*.95,r*.9,"#dcd7ca"); ctx.beginPath(); ctx.moveTo(e.x-r*.85,e.y-r*.55); ctx.lineTo(e.x+r*.85,e.y-r*.55); ctx.lineTo(e.x+r*.7,e.y+r*.6); ctx.lineTo(e.x-r*.7,e.y+r*.6); ctx.closePath(); ctx.fill(); _ol(ctx);
    ctx.strokeStyle=e.flash>0?"#fff":`rgba(255,200,60,${gl})`; ctx.lineWidth=2.2; ctx.beginPath(); ctx.arc(e.x,e.y,r*.28,0,7); ctx.moveTo(e.x,e.y-r*.42); ctx.lineTo(e.x,e.y+r*.42); ctx.moveTo(e.x-r*.42,e.y); ctx.lineTo(e.x+r*.42,e.y); ctx.stroke();
    ctx.strokeStyle="rgba(60,50,40,.55)"; ctx.lineWidth=1.4; ctx.beginPath(); ctx.moveTo(e.x-r*.6,e.y-r*.4); ctx.lineTo(e.x-r*.35,e.y-r*.1); ctx.lineTo(e.x-r*.5,e.y+r*.25); ctx.moveTo(e.x+r*.55,e.y+r*.1); ctx.lineTo(e.x+r*.3,e.y+r*.45); ctx.stroke();
    ctx.fillStyle=_G(ctx,e,e.x,e.y-r*.9,r*.45,r*.4,"#e8e3d6"); ctx.beginPath(); ctx.moveTo(e.x-r*.4,e.y-r*.55); ctx.lineTo(e.x-r*.42,e.y-r*1.15); ctx.lineTo(e.x,e.y-r*1.32); ctx.lineTo(e.x+r*.42,e.y-r*1.15); ctx.lineTo(e.x+r*.4,e.y-r*.55); ctx.closePath(); ctx.fill(); _ol(ctx);
    ctx.fillStyle="#1a1410"; ctx.fillRect(e.x-r*.3,e.y-r*.98,r*.6,r*.13);
    ctx.fillStyle=e.flash>0?"#fff":`rgba(255,210,80,${gl})`; ctx.fillRect(e.x-r*.26,e.y-r*.95,r*.52,r*.07);
    ctx.save(); ctx.globalCompositeOperation="lighter"; const g2=ctx.createRadialGradient(e.x,e.y-r*.92,0,e.x,e.y-r*.92,r*.6); g2.addColorStop(0,`rgba(255,200,80,${.5*gl})`); g2.addColorStop(1,"rgba(255,200,80,0)"); ctx.fillStyle=g2; ctx.beginPath(); ctx.arc(e.x,e.y-r*.92,r*.6,0,7); ctx.fill(); ctx.restore() },
});
Object.assign(FLYERS,{gale:1,crow:1,stormeye:1,mask:1,gargoyle:1,cheonpung:1});
/* ===== 천공 최종 보스: 갈수록 크고 세련되고 무섭게 ===== */
function _leaf(ctx,x,y,a,len,w){ const c=Math.cos(a), s=Math.sin(a), nx=-s, ny=c;
  ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+c*len*.5+nx*w,y+s*len*.5+ny*w,x+c*len,y+s*len); ctx.quadraticCurveTo(x+c*len*.5-nx*w,y+s*len*.5-ny*w,x,y); ctx.closePath() }
Object.assign(LOOKS, {
  /* 폭풍군주 천풍: 하늘을 덮는 폭풍새 */
  cheonpung(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, fl=Math.sin(t*3.2+e.wob), GLO=e.c==="awake"?"255,90,110":"110,230,255";
    // 폭풍 기운: 도는 먹구름 고리 + 바람 소용돌이
    ctx.save(); ctx.globalAlpha=.55; for(let i=0;i<12;i++){ const a=t*.8+i*.5236, d=r*(1.9+.12*Math.sin(t*2+i)); ctx.fillStyle=i%2?"#1c2238":"#2a3454"; ctx.beginPath(); ctx.ellipse(e.x+Math.cos(a)*d,e.y+Math.sin(a)*d*.62,r*.5,r*.32,a,0,7); ctx.fill() } ctx.restore();
    ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.lineCap="round";
    for(let k=0;k<3;k++){ ctx.strokeStyle=`rgba(${GLO},${.35-k*.08})`; ctx.lineWidth=5-k; ctx.beginPath(); ctx.ellipse(e.x,e.y,r*(2.1-k*.25),r*(1.25-k*.15),0,t*2+k*2,t*2+k*2+2.2); ctx.stroke() }
    const ag=ctx.createRadialGradient(e.x,e.y,r*.3,e.x,e.y,r*2.3); ag.addColorStop(0,`rgba(${GLO},.25)`); ag.addColorStop(1,`rgba(${GLO},0)`); ctx.fillStyle=ag; ctx.beginPath(); ctx.arc(e.x,e.y,r*2.3,0,7); ctx.fill(); ctx.restore();
    // 꼬리깃
    for(let i=0;i<5;i++){ const a=Math.PI/2+(i-2)*.28+Math.sin(t*2+i)*.05; const g=ctx.createLinearGradient(e.x,e.y+r*.4,e.x+Math.cos(a)*r*1.8,e.y+r*.4+Math.sin(a)*r*1.8); g.addColorStop(0,_C(e,"#1e2c4a")); g.addColorStop(.85,_C(e,"#0c1426")); g.addColorStop(1,`rgb(${GLO})`);
      ctx.fillStyle=g; _leaf(ctx,e.x,e.y+r*.45,a,r*(1.7-Math.abs(i-2)*.18),r*.17); ctx.fill(); _ol(ctx,1.4) }
    // 날개: 깃털 3겹 (긴 깃 → 중간 깃 → 덮깃)
    [-1,1].forEach(s=>{ const rx=e.x+s*r*.45, ry=e.y-r*.3, base=s>0?(-.62-fl*.42):(Math.PI+.62+fl*.42), span=r*2.6;
      const L=[[10,1.0,1.25,"#16223c","#0a1020"],[8,.8,.8,"#24365c","#14203a"],[7,.6,.45,"#36507e","#22385e"]];
      L.forEach(([N,reach,len,c1,c2],li)=>{ for(let i=0;i<N;i++){ const u=i/(N-1), ex=rx+Math.cos(base)*span*reach*(.12+.88*u), ey=ry+Math.sin(base)*span*reach*(.12+.88*u);
          const fa=base+s*(1.75-u*1.55), fl2=r*len*(.6+.75*u);
          const g=ctx.createLinearGradient(ex,ey,ex+Math.cos(fa)*fl2,ey+Math.sin(fa)*fl2); g.addColorStop(0,_C(e,c1)); g.addColorStop(1,_C(e,c2));
          ctx.fillStyle=g; _leaf(ctx,ex,ey,fa,fl2,r*(.14-li*.025)); ctx.fill(); _ol(ctx,1.1);
          if(li===0){ ctx.strokeStyle=e.flash>0?"#fff":`rgba(${GLO},${.55+.35*Math.sin(t*4+i)})`; ctx.lineWidth=1.6; ctx.beginPath(); ctx.moveTo(ex+Math.cos(fa)*fl2*.55,ey+Math.sin(fa)*fl2*.55); ctx.lineTo(ex+Math.cos(fa)*fl2,ey+Math.sin(fa)*fl2); ctx.stroke() } } });
      // 날개 앞날: 번개무늬
      ctx.strokeStyle=_C(e,"#3a5486"); ctx.lineWidth=r*.16; ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(rx,ry); ctx.lineTo(rx+Math.cos(base)*span,ry+Math.sin(base)*span); ctx.stroke(); ctx.lineCap="butt";
      ctx.strokeStyle=e.flash>0?"#fff":"rgba(220,245,255,.85)"; ctx.lineWidth=2.2; ctx.beginPath(); ctx.moveTo(rx,ry); for(let k=1;k<=5;k++){ const u=k/5; ctx.lineTo(rx+Math.cos(base)*span*u+(k%2?0:Math.cos(base+s*1.4)*r*.1),ry+Math.sin(base)*span*u+(k%2?0:Math.sin(base+s*1.4)*r*.1)) } ctx.stroke() });
    // 날개 끝 사이 번개
    if(Math.sin(t*6+e.wob)>.7){ ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.strokeStyle=`rgba(${GLO},.9)`; ctx.lineWidth=2.5; [-1,1].forEach(s=>{ const base=s>0?(-.62-fl*.42):(Math.PI+.62+fl*.42); let x=e.x+s*r*.45+Math.cos(base)*r*3.4, y=e.y-r*.3+Math.sin(base)*r*3.4; ctx.beginPath(); ctx.moveTo(x,y); for(let k=0;k<5;k++){ x+=(Math.sin(t*40+k*3)*r*.3); y+=r*.35; ctx.lineTo(x,y) } ctx.stroke() }); ctx.restore() }
    // 발톱
    [-1,1].forEach(s=>{ ctx.fillStyle=_C(e,"#3a2a14"); ctx.fillRect(e.x+s*r*.28-r*.06,e.y+r*.6,r*.12,r*.35); ctx.fillStyle=_C(e,"#f6c544"); for(let k=-1;k<=1;k++){ ctx.beginPath(); ctx.moveTo(e.x+s*r*.28+k*r*.1,e.y+r*.9); ctx.quadraticCurveTo(e.x+s*r*.28+k*r*.16,e.y+r*1.08,e.x+s*r*.28+k*r*.08,e.y+r*1.12); ctx.lineTo(e.x+s*r*.28+k*r*.05,e.y+r*.92); ctx.fill() } });
    // 몸통 + 가슴 깃털 비늘
    ctx.fillStyle=_G(ctx,e,e.x,e.y,r*.78,r*.98,"#26385c"); ctx.beginPath(); ctx.ellipse(e.x,e.y+r*.05,r*.74,r*.92,0,0,7); ctx.fill(); _ol(ctx,2.4);
    ctx.save(); ctx.beginPath(); ctx.ellipse(e.x,e.y+r*.05,r*.74,r*.92,0,0,7); ctx.clip();
    for(let row=0;row<5;row++) for(let k=-3;k<=3;k++){ const x=e.x+k*r*.2+(row%2)*r*.1, y=e.y-r*.35+row*r*.2; ctx.fillStyle=_C(e,row<2?"#5a7ab0":"#44608e"); ctx.beginPath(); ctx.arc(x,y,r*.12,0,Math.PI); ctx.fill(); ctx.strokeStyle="rgba(10,16,30,.6)"; ctx.lineWidth=1; ctx.stroke() }
    ctx.restore();
    ctx.save(); ctx.globalCompositeOperation="lighter"; const cg=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,r*.45); cg.addColorStop(0,`rgba(${GLO},${.45+.25*Math.sin(t*5)})`); cg.addColorStop(1,`rgba(${GLO},0)`); ctx.fillStyle=cg; ctx.beginPath(); ctx.arc(e.x,e.y,r*.45,0,7); ctx.fill(); ctx.restore();
    // 머리
    const hx=e.x+f*r*.12, hy=e.y-r*.92;
    for(let i=0;i<3;i++){ const a=-Math.PI/2-f*(.6+i*.32)+Math.sin(t*3+i)*.08, len=r*(1.15-i*.18); ctx.fillStyle=_C(e,i===0?"#3a5a90":"#2a4272"); _leaf(ctx,hx-f*r*.15,hy-r*.25,a,len,r*.11); ctx.fill(); _ol(ctx,1.1);
      ctx.fillStyle=e.flash>0?"#fff":`rgba(${GLO},.9)`; ctx.beginPath(); ctx.arc(hx-f*r*.15+Math.cos(a)*len,hy-r*.25+Math.sin(a)*len,r*.05,0,7); ctx.fill() }
    ctx.fillStyle=_G(ctx,e,hx,hy,r*.5,r*.46,"#2e4470"); ctx.beginPath(); ctx.ellipse(hx,hy,r*.5,r*.44,0,0,7); ctx.fill(); _ol(ctx,2.2);
    ctx.fillStyle=_C(e,"#1a2440"); ctx.beginPath(); ctx.ellipse(hx+f*r*.1,hy+r*.12,r*.34,r*.2,0,0,7); ctx.fill();
    // 갈고리 부리
    const bg=ctx.createLinearGradient(hx,hy,hx+f*r*.9,hy+r*.3); bg.addColorStop(0,_C(e,"#ffe08a")); bg.addColorStop(.7,_C(e,"#d8a030")); bg.addColorStop(1,_C(e,"#5a3a10"));
    ctx.fillStyle=bg; ctx.beginPath(); ctx.moveTo(hx+f*r*.3,hy-r*.12); ctx.quadraticCurveTo(hx+f*r*.95,hy-r*.1,hx+f*r*.92,hy+r*.42); ctx.quadraticCurveTo(hx+f*r*.75,hy+r*.2,hx+f*r*.55,hy+r*.2); ctx.lineTo(hx+f*r*.3,hy+r*.16); ctx.closePath(); ctx.fill(); _ol(ctx,1.8);
    ctx.strokeStyle="rgba(60,30,8,.8)"; ctx.lineWidth=1.4; ctx.beginPath(); ctx.moveTo(hx+f*r*.32,hy+r*.06); ctx.lineTo(hx+f*r*.7,hy+r*.1); ctx.stroke();
    // 눈: 빛나는 날카로운 눈 + 빛 꼬리
    const ex=hx+f*r*.18, ey=hy-r*.06, gl=.75+.25*Math.sin(t*7);
    ctx.save(); ctx.globalCompositeOperation="lighter"; const eg=ctx.createRadialGradient(ex,ey,0,ex,ey,r*.4); eg.addColorStop(0,`rgba(${GLO},${.9*gl})`); eg.addColorStop(1,`rgba(${GLO},0)`); ctx.fillStyle=eg; ctx.beginPath(); ctx.arc(ex,ey,r*.4,0,7); ctx.fill();
    ctx.strokeStyle=`rgba(${GLO},${.6*gl})`; ctx.lineWidth=3; ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(ex-f*r*.12,ey); ctx.lineTo(ex-f*r*.7,ey-r*.12); ctx.stroke(); ctx.restore();
    ctx.fillStyle=e.flash>0?"#fff":"#eaffff"; ctx.beginPath(); ctx.moveTo(ex-f*r*.16,ey+r*.04); ctx.quadraticCurveTo(ex,ey-r*.14,ex+f*r*.18,ey-r*.06); ctx.quadraticCurveTo(ex+f*r*.02,ey+r*.08,ex-f*r*.16,ey+r*.04); ctx.fill();
    ctx.fillStyle="#04060c"; ctx.beginPath(); ctx.ellipse(ex+f*r*.03,ey-r*.02,r*.025,r*.07,0,0,7); ctx.fill();
    ctx.strokeStyle="#060a14"; ctx.lineWidth=r*.07; ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(ex-f*r*.2,ey-r*.14); ctx.lineTo(ex+f*r*.24,ey-r*.2); ctx.stroke(); ctx.lineCap="butt" },

  /* 하늘성 수문장: 빛의 날개를 단 거대한 갑옷 기사 */
  gatekeeper(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, fl=Math.sin(t*2.4+e.wob), gl=.6+.4*Math.sin(t*4+e.wob), GLD=e.flash>0?"#ffffff":"#f6c544";
    // 빛 기운
    ctx.save(); ctx.globalCompositeOperation="lighter"; const ag=ctx.createRadialGradient(e.x,e.y-r*.3,r*.2,e.x,e.y-r*.3,r*2.4); ag.addColorStop(0,"rgba(255,230,150,.32)"); ag.addColorStop(1,"rgba(255,220,120,0)"); ctx.fillStyle=ag; ctx.beginPath(); ctx.arc(e.x,e.y-r*.3,r*2.4,0,7); ctx.fill();
    for(let i=0;i<8;i++){ const a=t*.6+i*.785; ctx.strokeStyle=`rgba(255,240,180,${.18+.1*Math.sin(t*3+i)})`; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(e.x+Math.cos(a)*r*.6,e.y-r*1.25+Math.sin(a)*r*.6); ctx.lineTo(e.x+Math.cos(a)*r*2.2,e.y-r*1.25+Math.sin(a)*r*2.2); ctx.stroke() } ctx.restore();
    // 날개 두 쌍: 칼날 깃
    [[1.0,-.55,9,"#ffffff","#d8c890"],[.75,.0,7,"#f2ecd8","#c8b070"]].forEach(([sc,oy,N,c1,c2],pi)=>{ [-1,1].forEach(s=>{ const rx=e.x+s*r*.4, ry=e.y-r*.55+oy*r, base=(s>0?-.55:Math.PI+.55)+s*(pi?.45:0)-s*fl*.18;
      for(let i=0;i<N;i++){ const u=i/(N-1), a=base+s*u*1.25, len=r*(2.4-u*1.1)*sc; const g=ctx.createLinearGradient(rx,ry,rx+Math.cos(a)*len,ry+Math.sin(a)*len); g.addColorStop(0,_C(e,c2)); g.addColorStop(.25,_C(e,c1)); g.addColorStop(1,_C(e,"#fffaf0"));
        ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(rx,ry); ctx.lineTo(rx+Math.cos(a-s*.05)*len*.55+Math.cos(a+Math.PI/2)*r*.11,ry+Math.sin(a-s*.05)*len*.55+Math.sin(a+Math.PI/2)*r*.11); ctx.lineTo(rx+Math.cos(a)*len,ry+Math.sin(a)*len); ctx.lineTo(rx+Math.cos(a)*len*.5-Math.cos(a+Math.PI/2)*r*.05,ry+Math.sin(a)*len*.5-Math.sin(a+Math.PI/2)*r*.05); ctx.closePath(); ctx.fill(); _ol(ctx,1.2);
        ctx.strokeStyle=GLD; ctx.lineWidth=1.3; ctx.beginPath(); ctx.moveTo(rx+Math.cos(a)*len*.2,ry+Math.sin(a)*len*.2); ctx.lineTo(rx+Math.cos(a)*len*.92,ry+Math.sin(a)*len*.92); ctx.stroke() } }) });
    // 망토
    const cg=ctx.createLinearGradient(0,e.y-r*.6,0,e.y+r*1.3); cg.addColorStop(0,_C(e,"#2a4aa8")); cg.addColorStop(1,_C(e,"#0e1a4a")); ctx.fillStyle=cg;
    ctx.beginPath(); ctx.moveTo(e.x-r*.75,e.y-r*.55); ctx.quadraticCurveTo(e.x-r*1.25,e.y+r*.5,e.x-r*1.05,e.y+r*1.25); for(let k=0;k<=6;k++){ ctx.lineTo(e.x-r*1.05+k*r*.35,e.y+r*1.25+(k%2?r*.12:0)+Math.sin(t*3+k)*r*.05) } ctx.quadraticCurveTo(e.x+r*1.25,e.y+r*.5,e.x+r*.75,e.y-r*.55); ctx.closePath(); ctx.fill(); _ol(ctx,1.8);
    ctx.strokeStyle=GLD; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(e.x-r*1.05,e.y+r*1.18); ctx.lineTo(e.x+r*1.05,e.y+r*1.18); ctx.stroke();
    // 다리
    [-1,1].forEach(s=>{ const lg=ctx.createLinearGradient(e.x+s*r*.4-r*.2,0,e.x+s*r*.4+r*.2,0); lg.addColorStop(0,_C(e,"#9aa4b8")); lg.addColorStop(.5,_C(e,"#f4f6fa")); lg.addColorStop(1,_C(e,"#7a8498"));
      ctx.fillStyle=lg; ctx.fillRect(e.x+s*r*.38-r*.18,e.y+r*.5,r*.36,r*.62); ctx.strokeStyle="rgba(10,10,20,.8)"; ctx.lineWidth=1.6; ctx.strokeRect(e.x+s*r*.38-r*.18,e.y+r*.5,r*.36,r*.62); ctx.fillStyle=GLD; ctx.fillRect(e.x+s*r*.38-r*.2,e.y+r*.72,r*.4,r*.07) });
    // 방패 (반대쪽)
    { const sx=e.x-f*r*.95, sy=e.y+r*.15; const sg=ctx.createLinearGradient(sx-r*.4,0,sx+r*.4,0); sg.addColorStop(0,_C(e,"#c8d0e0")); sg.addColorStop(.5,_C(e,"#ffffff")); sg.addColorStop(1,_C(e,"#a8b2c6"));
      ctx.fillStyle=sg; ctx.beginPath(); ctx.moveTo(sx-r*.42,sy-r*.6); ctx.lineTo(sx+r*.42,sy-r*.6); ctx.lineTo(sx+r*.4,sy+r*.1); ctx.quadraticCurveTo(sx+r*.3,sy+r*.55,sx,sy+r*.8); ctx.quadraticCurveTo(sx-r*.3,sy+r*.55,sx-r*.4,sy+r*.1); ctx.closePath(); ctx.fill(); _ol(ctx,2);
      ctx.strokeStyle=GLD; ctx.lineWidth=2.4; ctx.stroke(); ctx.fillStyle=GLD; ctx.beginPath(); for(let i=0;i<10;i++){ const a=-Math.PI/2+i*Math.PI/5, rr=i%2?r*.11:r*.27; ctx.lineTo(sx+Math.cos(a)*rr,sy-r*.05+Math.sin(a)*rr) } ctx.closePath(); ctx.fill(); ctx.strokeStyle="rgba(90,60,10,.8)"; ctx.lineWidth=1.2; ctx.stroke() }
    // 갑옷 몸통
    const bg=ctx.createLinearGradient(e.x-r*.7,0,e.x+r*.7,0); bg.addColorStop(0,_C(e,"#8a94aa")); bg.addColorStop(.45,_C(e,"#ffffff")); bg.addColorStop(1,_C(e,"#7a849a"));
    ctx.fillStyle=bg; ctx.beginPath(); ctx.moveTo(e.x-r*.7,e.y-r*.55); ctx.lineTo(e.x+r*.7,e.y-r*.55); ctx.lineTo(e.x+r*.55,e.y+r*.25); ctx.lineTo(e.x+r*.4,e.y+r*.6); ctx.lineTo(e.x-r*.4,e.y+r*.6); ctx.lineTo(e.x-r*.55,e.y+r*.25); ctx.closePath(); ctx.fill(); _ol(ctx,2.2);
    ctx.strokeStyle=GLD; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(e.x-r*.55,e.y+r*.25); ctx.lineTo(e.x+r*.55,e.y+r*.25); ctx.moveTo(e.x,e.y-r*.55); ctx.lineTo(e.x,e.y+r*.6); ctx.stroke();
    // 가슴의 태양 문장
    ctx.save(); ctx.globalCompositeOperation="lighter"; const sg2=ctx.createRadialGradient(e.x,e.y-r*.15,0,e.x,e.y-r*.15,r*.5); sg2.addColorStop(0,`rgba(255,230,140,${.8*gl})`); sg2.addColorStop(1,"rgba(255,200,80,0)"); ctx.fillStyle=sg2; ctx.beginPath(); ctx.arc(e.x,e.y-r*.15,r*.5,0,7); ctx.fill(); ctx.restore();
    ctx.fillStyle=GLD; for(let i=0;i<8;i++){ const a=i*.785+t*.5; ctx.beginPath(); ctx.moveTo(e.x+Math.cos(a)*r*.12,e.y-r*.15+Math.sin(a)*r*.12); ctx.lineTo(e.x+Math.cos(a+.2)*r*.26,e.y-r*.15+Math.sin(a+.2)*r*.26); ctx.lineTo(e.x+Math.cos(a+.39)*r*.12,e.y-r*.15+Math.sin(a+.39)*r*.12); ctx.fill() }
    ctx.fillStyle=e.flash>0?"#fff":"#fff6d0"; ctx.beginPath(); ctx.arc(e.x,e.y-r*.15,r*.11,0,7); ctx.fill();
    // 어깨 갑옷
    [-1,1].forEach(s=>{ ctx.fillStyle=_G(ctx,e,e.x+s*r*.72,e.y-r*.55,r*.38,r*.3,"#e8ecf4"); ctx.beginPath(); ctx.ellipse(e.x+s*r*.72,e.y-r*.52,r*.38,r*.28,s*.25,Math.PI,0); ctx.closePath(); ctx.fill(); _ol(ctx,1.8); ctx.strokeStyle=GLD; ctx.lineWidth=2; ctx.stroke();
      ctx.fillStyle=GLD; for(let k=0;k<3;k++){ const ax=e.x+s*r*(.5+k*.18); ctx.beginPath(); ctx.moveTo(ax-r*.05,e.y-r*.72); ctx.lineTo(ax+s*r*.04,e.y-r*.98+k*r*.05); ctx.lineTo(ax+r*.05,e.y-r*.72); ctx.fill() } });
    // 투구 + 빛나는 T자 눈구멍 + 깃 장식
    const hy=e.y-r*.95;
    [-1,1].forEach(s=>{ ctx.fillStyle=_C(e,"#fffaf0"); ctx.beginPath(); ctx.moveTo(e.x+s*r*.3,hy-r*.05); ctx.quadraticCurveTo(e.x+s*r*.85,hy-r*.45,e.x+s*r*.8,hy-r*.85); ctx.quadraticCurveTo(e.x+s*r*.6,hy-r*.35,e.x+s*r*.25,hy-r*.25); ctx.fill(); _ol(ctx,1.2); ctx.strokeStyle=GLD; ctx.lineWidth=1.2; ctx.stroke() });
    const hg=ctx.createLinearGradient(e.x-r*.4,0,e.x+r*.4,0); hg.addColorStop(0,_C(e,"#9aa4b8")); hg.addColorStop(.45,_C(e,"#ffffff")); hg.addColorStop(1,_C(e,"#7a849a"));
    ctx.fillStyle=hg; ctx.beginPath(); ctx.moveTo(e.x-r*.38,hy+r*.38); ctx.lineTo(e.x-r*.42,hy-r*.15); ctx.quadraticCurveTo(e.x,hy-r*.6,e.x+r*.42,hy-r*.15); ctx.lineTo(e.x+r*.38,hy+r*.38); ctx.lineTo(e.x,hy+r*.55); ctx.closePath(); ctx.fill(); _ol(ctx,2.2);
    ctx.strokeStyle=GLD; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(e.x,hy-r*.48); ctx.lineTo(e.x,hy-r*.18); ctx.stroke();
    ctx.fillStyle="#0a0a14"; ctx.fillRect(e.x-r*.3,hy-r*.08,r*.6,r*.1); ctx.fillRect(e.x-r*.05,hy-r*.08,r*.1,r*.36);
    ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.fillStyle=e.flash>0?"#fff":`rgba(255,240,170,${gl})`; ctx.fillRect(e.x-r*.27,hy-r*.06,r*.54,r*.05); ctx.fillRect(e.x-r*.025,hy-r*.06,r*.05,r*.3);
    const vg=ctx.createRadialGradient(e.x,hy,0,e.x,hy,r*.6); vg.addColorStop(0,`rgba(255,230,140,${.55*gl})`); vg.addColorStop(1,"rgba(255,230,140,0)"); ctx.fillStyle=vg; ctx.beginPath(); ctx.arc(e.x,hy,r*.6,0,7); ctx.fill(); ctx.restore();
    // 후광
    ctx.strokeStyle=GLD; ctx.lineWidth=3.2; ctx.beginPath(); ctx.ellipse(e.x,hy-r*.75,r*.55,r*.16,0,0,7); ctx.stroke();
    for(let i=0;i<6;i++){ const a=t*1.5+i*1.047; ctx.fillStyle=`rgba(255,240,170,${.6+.4*Math.sin(t*4+i)})`; ctx.fillRect(e.x+Math.cos(a)*r*.55-2,hy-r*.75+Math.sin(a)*r*.16-2,4,4) }
    // 빛의 창 (바라보는 쪽)
    ctx.save(); ctx.translate(e.x+f*r*1.0,e.y+r*.1); ctx.rotate(f*(.35+Math.sin(t*2+e.wob)*.08));
    ctx.fillStyle=_C(e,"#a87a20"); ctx.fillRect(-r*.05,-r*1.8,r*.1,r*2.6); ctx.fillStyle=GLD; ctx.fillRect(-r*.12,-r*1.72,r*.24,r*.1);
    ctx.save(); ctx.globalCompositeOperation="lighter"; const lg2=ctx.createLinearGradient(0,-r*2.75,0,-r*1.7); lg2.addColorStop(0,"rgba(255,255,255,.95)"); lg2.addColorStop(1,`rgba(255,220,120,${.7*gl})`); ctx.fillStyle=lg2;
    ctx.beginPath(); ctx.moveTo(0,-r*2.8); ctx.lineTo(r*.2,-r*2.0); ctx.lineTo(r*.08,-r*1.72); ctx.lineTo(-r*.08,-r*1.72); ctx.lineTo(-r*.2,-r*2.0); ctx.closePath(); ctx.fill();
    const lg3=ctx.createRadialGradient(0,-r*2.2,0,0,-r*2.2,r*.7); lg3.addColorStop(0,`rgba(255,240,170,${.5*gl})`); lg3.addColorStop(1,"rgba(255,240,170,0)"); ctx.fillStyle=lg3; ctx.beginPath(); ctx.arc(0,-r*2.2,r*.7,0,7); ctx.fill(); ctx.restore();
    ctx.strokeStyle="rgba(10,10,20,.7)"; ctx.lineWidth=1.4; ctx.beginPath(); ctx.moveTo(0,-r*2.8); ctx.lineTo(r*.2,-r*2.0); ctx.lineTo(r*.08,-r*1.72); ctx.lineTo(-r*.08,-r*1.72); ctx.lineTo(-r*.2,-r*2.0); ctx.closePath(); ctx.stroke(); ctx.restore() },
});
/* ===== 천공 최종 보스 (고해상도로 그려요: 도트 화면 위에 선명하게) ===== */
const HD_LOOK = {cheonpung:1, gatekeeper:1};
function _lg(ctx,x0,y0,x1,y1,st){ const g=ctx.createLinearGradient(x0,y0,x1,y1); st.forEach(([o,c])=>g.addColorStop(o,c)); return g }
function _rg(ctx,x,y,r0,r1,st,ox,oy){ const g=ctx.createRadialGradient(x+(ox||0),y+(oy||0),r0,x,y,r1); st.forEach(([o,c])=>g.addColorStop(o,c)); return g }
/* 깃털: 뿌리(x,y)에서 ang 방향으로 len, 너비 w, 살짝 휘어짐 */
function _feather(ctx,x,y,ang,len,w,bend){ const c=Math.cos(ang), s=Math.sin(ang), nx=-s, ny=c, b=(bend||0)*len;
  const tx=x+c*len+nx*b, ty=y+s*len+ny*b;
  ctx.beginPath(); ctx.moveTo(x+nx*w*.35,y+ny*w*.35);
  ctx.bezierCurveTo(x+c*len*.35+nx*(w+b*.4),y+s*len*.35+ny*(w+b*.4), x+c*len*.8+nx*(w*.55+b*.9),y+s*len*.8+ny*(w*.55+b*.9), tx,ty);
  ctx.bezierCurveTo(x+c*len*.8-nx*(w*.45-b*.9),y+s*len*.8-ny*(w*.45-b*.9), x+c*len*.35-nx*(w*.8-b*.4),y+s*len*.35-ny*(w*.8-b*.4), x-nx*w*.35,y-ny*w*.35);
  ctx.closePath(); return [tx,ty] }
function _bolt(ctx,x,y,a,len,seed,w){ let px=x, py=y; ctx.beginPath(); ctx.moveTo(px,py); const n=7; for(let i=1;i<=n;i++){ const u=i/n, j=(Math.sin(seed*13.7+i*5.1)*.5)*len*.18; px=x+Math.cos(a)*len*u+Math.cos(a+Math.PI/2)*j; py=y+Math.sin(a)*len*u+Math.sin(a+Math.PI/2)*j; ctx.lineTo(px,py) } ctx.lineWidth=w; ctx.stroke() }

Object.assign(LOOKS, {
  cheonpung(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, fl=Math.sin(t*2.6+e.wob), W=e.flash>0, C=(c)=>W?"#ffffff":c;
    const cx=e.x, cy=e.y;
    // 폭풍 기운
    ctx.save(); ctx.globalCompositeOperation="lighter";
    ctx.fillStyle=_rg(ctx,cx,cy-r*.3,r*.2,r*3.2,[[0,"rgba(90,170,255,.30)"],[.5,"rgba(60,90,200,.12)"],[1,"rgba(40,60,160,0)"]]); ctx.beginPath(); ctx.arc(cx,cy-r*.3,r*3.2,0,7); ctx.fill();
    for(let k=0;k<4;k++){ const a0=t*(1.6+k*.3)+k*1.7, R=r*(1.7+k*.42); ctx.strokeStyle=_lg(ctx,cx-R,cy,cx+R,cy,[[0,"rgba(160,230,255,0)"],[.5,`rgba(160,230,255,${.42-k*.07})`],[1,"rgba(160,230,255,0)"]]);
      ctx.lineWidth=3.2-k*.5; ctx.beginPath(); ctx.ellipse(cx,cy+r*.15,R,R*.34,0,a0,a0+2.4); ctx.stroke() }
    ctx.restore();
    // 꼬리깃 (몸 뒤)
    for(let i=0;i<7;i++){ const a=Math.PI/2+(i-3)*.17+Math.sin(t*2.2+i*.7)*.06, len=r*(2.2-Math.abs(i-3)*.18);
      ctx.fillStyle=_lg(ctx,cx,cy+r*.5,cx+Math.cos(a)*len,cy+r*.5+Math.sin(a)*len,[[0,C("#13204a")],[.65,C("#2a4a92")],[1,C("#9ae8ff")]]);
      _feather(ctx,cx,cy+r*.5,a,len,r*.15,(i-3)*.03); ctx.fill(); ctx.strokeStyle="rgba(4,10,30,.45)"; ctx.lineWidth=1; ctx.stroke() }
    // 날개
    [-1,1].forEach(s=>{ const Sx=cx+s*r*.32, Sy=cy-r*.45, lift=fl*r*.42;
      const Ex=Sx+s*r*1.15, Ey=Sy-r*.85-lift*.4, Wx=Sx+s*r*2.05, Wy=Sy-r*1.55-lift, Tx=Sx+s*r*3.4, Ty=Sy-r*1.05-lift*1.2;
      const along=(a,b,u)=>[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u];
      // 첫째 깃 (가장 긴 깃)
      for(let i=9;i>=0;i--){ const u=i/9, [bx,by]=along([Wx,Wy],[Tx,Ty],u), base=s>0?0:Math.PI;
        const ang=(s>0? -.42+(1-u)*1.25 : Math.PI+.42-(1-u)*1.25)+s*fl*.08, len=r*(1.25+u*.75);
        ctx.fillStyle=_lg(ctx,bx,by,bx+Math.cos(ang)*len,by+Math.sin(ang)*len,[[0,C("#16224a")],[.55,C("#2c4f96")],[.9,C("#6ac8f4")],[1,C("#d8f8ff")]]);
        const [tx,ty]=_feather(ctx,bx,by,ang,len,r*.17,s*.06); ctx.fill(); ctx.strokeStyle="rgba(3,8,28,.5)"; ctx.lineWidth=1.1; ctx.stroke();
        ctx.strokeStyle="rgba(210,245,255,.45)"; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(bx,by); ctx.lineTo(bx+Math.cos(ang)*len*.85,by+Math.sin(ang)*len*.85); ctx.stroke() }
      // 둘째 깃
      for(let i=7;i>=0;i--){ const u=i/7, [bx,by]=along([Ex,Ey],[Wx,Wy],u);
        const ang=(s>0? 1.15-u*.35 : Math.PI-1.15+u*.35)+s*fl*.05, len=r*(1.0+u*.35);
        ctx.fillStyle=_lg(ctx,bx,by,bx+Math.cos(ang)*len,by+Math.sin(ang)*len,[[0,C("#121c40")],[.7,C("#24407e")],[1,C("#5aa8e0")]]);
        _feather(ctx,bx,by,ang,len,r*.16,-s*.05); ctx.fill(); ctx.strokeStyle="rgba(3,8,28,.5)"; ctx.lineWidth=1; ctx.stroke() }
      for(let i=5;i>=0;i--){ const u=i/5, [bx,by]=along([Sx,Sy],[Ex,Ey],u);
        const ang=(s>0? 1.45-u*.25 : Math.PI-1.45+u*.25), len=r*(.85+u*.2);
        ctx.fillStyle=_lg(ctx,bx,by,bx+Math.cos(ang)*len,by+Math.sin(ang)*len,[[0,C("#121c40")],[1,C("#3a64aa")]]);
        _feather(ctx,bx,by,ang,len,r*.15,0); ctx.fill(); ctx.strokeStyle="rgba(3,8,28,.45)"; ctx.lineWidth=1; ctx.stroke() }
      // 덮깃 (비늘처럼 겹친 짧은 깃)
      for(let row=0;row<2;row++) for(let i=0;i<9;i++){ const u=i/8; const P=u<.5?along([Sx,Sy],[Ex,Ey],u*2):along([Ex,Ey],[Wx,Wy],(u-.5)*2);
        const ang=(s>0?1.25:Math.PI-1.25)-s*u*.35, len=r*(.42-row*.1), bx=P[0]+Math.cos(ang)*r*.18*row, by=P[1]+Math.sin(ang)*r*.18*row;
        ctx.fillStyle=_lg(ctx,bx,by,bx+Math.cos(ang)*len,by+Math.sin(ang)*len,[[0,C(row?"#4a6eb2":"#33528f")],[1,C(row?"#86b4ea":"#5a84c8")]]);
        _feather(ctx,bx,by,ang,len,r*.13,0); ctx.fill(); ctx.strokeStyle="rgba(6,14,40,.4)"; ctx.lineWidth=.9; ctx.stroke() }
      // 날개 앞날
      ctx.strokeStyle=_lg(ctx,Sx,Sy,Tx,Ty,[[0,C("#8aa6d8")],[.6,C("#cfe2ff")],[1,C("#ffffff")]]); ctx.lineCap="round"; ctx.lineWidth=r*.09;
      ctx.beginPath(); ctx.moveTo(Sx,Sy); ctx.quadraticCurveTo(Ex,Ey-r*.15,Wx,Wy); ctx.quadraticCurveTo((Wx+Tx)/2,(Wy+Ty)/2-r*.25,Tx,Ty); ctx.stroke(); ctx.lineCap="butt";
      // 날개 끝 번개
      if(Math.sin(t*5.3+s*2+e.wob)>.55){ ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.strokeStyle="rgba(150,235,255,.95)"; ctx.shadowColor="#7ae0ff"; ctx.shadowBlur=12; _bolt(ctx,Tx,Ty,s>0?.6:Math.PI-.6,r*1.4,Math.floor(t*12)+s,2.2); ctx.restore() } });
    // 발톱
    [-1,1].forEach(s=>{ const fx=cx+s*r*.25, fy=cy+r*.72; ctx.fillStyle=C("#2a2a3a"); ctx.beginPath(); ctx.ellipse(fx,fy,r*.09,r*.16,0,0,7); ctx.fill();
      for(let k=-1;k<=1;k++){ ctx.fillStyle=_lg(ctx,fx,fy,fx+k*r*.12,fy+r*.3,[[0,C("#fff0b0")],[1,C("#b07a20")]]); ctx.beginPath(); ctx.moveTo(fx+k*r*.06-r*.03,fy+r*.08); ctx.quadraticCurveTo(fx+k*r*.16,fy+r*.26,fx+k*r*.1,fy+r*.34); ctx.quadraticCurveTo(fx+k*r*.07,fy+r*.2,fx+k*r*.06+r*.03,fy+r*.08); ctx.fill() } });
    // 몸통
    ctx.fillStyle=_rg(ctx,cx,cy,r*.05,r*1.05,[[0,C("#f2f7ff")],[.35,C("#a9c0e6")],[.75,C("#3a5a98")],[1,C("#18264e")]],-r*.25,-r*.4);
    ctx.beginPath(); ctx.moveTo(cx,cy-r*.85); ctx.bezierCurveTo(cx+r*.75,cy-r*.75,cx+r*.72,cy+r*.45,cx,cy+r*.85); ctx.bezierCurveTo(cx-r*.72,cy+r*.45,cx-r*.75,cy-r*.75,cx,cy-r*.85); ctx.fill();
    ctx.save(); ctx.clip(); ctx.strokeStyle="rgba(20,40,90,.28)"; ctx.lineWidth=1.1;
    for(let row=0;row<7;row++) for(let k=-4;k<=4;k++){ const x=cx+k*r*.16+(row%2)*r*.08, y=cy-r*.45+row*r*.17; ctx.beginPath(); ctx.arc(x,y,r*.1,.15*Math.PI,.85*Math.PI); ctx.stroke() }
    ctx.restore(); ctx.strokeStyle="rgba(10,20,50,.55)"; ctx.lineWidth=1.3; ctx.stroke();
    // 가슴의 번개 문양
    ctx.save(); ctx.globalCompositeOperation="lighter"; const pul=.6+.4*Math.sin(t*4); ctx.strokeStyle=`rgba(140,235,255,${pul})`; ctx.shadowColor="#6ae0ff"; ctx.shadowBlur=14; ctx.lineWidth=r*.06; ctx.lineJoin="round";
    ctx.beginPath(); ctx.moveTo(cx+r*.05,cy-r*.42); ctx.lineTo(cx-r*.14,cy-r*.02); ctx.lineTo(cx+r*.07,cy+r*.02); ctx.lineTo(cx-r*.1,cy+r*.42); ctx.stroke(); ctx.restore();
    // 머리 + 볏
    const hx=cx+f*r*.08, hy=cy-r*.98;
    for(let i=0;i<5;i++){ const a=-Math.PI/2-f*(.55+i*.22)+Math.sin(t*3+i)*.07, len=r*(1.25-i*.14);
      ctx.fillStyle=_lg(ctx,hx,hy,hx+Math.cos(a)*len,hy+Math.sin(a)*len,[[0,C("#dfe9ff")],[.6,C("#9ac8f4")],[1,C("#6ae0ff")]]); _feather(ctx,hx-f*r*.1,hy-r*.18,a,len,r*.09,-f*.08); ctx.fill(); ctx.strokeStyle="rgba(20,40,90,.4)"; ctx.lineWidth=.9; ctx.stroke() }
    // 목깃: 머리와 몸을 잇는 뾰족한 깃털 갈기
    for(let i=0;i<11;i++){ const a=Math.PI/2+(i-5)*.26+Math.sin(t*3+i)*.04, len=r*(.55-Math.abs(i-5)*.025);
      ctx.fillStyle=_lg(ctx,hx,hy+r*.1,hx+Math.cos(a)*len,hy+r*.1+Math.sin(a)*len,[[0,C("#e8f0ff")],[1,C(i%2?"#8aa8d8":"#a8c0e8")]]); _feather(ctx,hx,hy+r*.12,a,len,r*.1,0); ctx.fill(); ctx.strokeStyle="rgba(30,50,100,.35)"; ctx.lineWidth=.9; ctx.stroke() }
    // 날카로운 맹금 머리: 어두운 정수리 + 흰 뺨 + 튀어나온 눈썹뼈
    ctx.fillStyle=_rg(ctx,hx,hy,r*.03,r*.5,[[0,C("#f4f8ff")],[.55,C("#b8cae8")],[1,C("#5a72a8")]],f*r*.1,r*.1);
    ctx.beginPath(); ctx.moveTo(hx-f*r*.4,hy+r*.05); ctx.bezierCurveTo(hx-f*r*.42,hy-r*.3,hx-f*r*.05,hy-r*.44,hx+f*r*.25,hy-r*.3); ctx.quadraticCurveTo(hx+f*r*.42,hy-r*.18,hx+f*r*.38,hy+r*.05); ctx.bezierCurveTo(hx+f*r*.3,hy+r*.32,hx-f*r*.15,hy+r*.38,hx-f*r*.4,hy+r*.05); ctx.closePath(); ctx.fill(); ctx.strokeStyle="rgba(20,40,90,.5)"; ctx.lineWidth=1.2; ctx.stroke();
    ctx.fillStyle=_lg(ctx,hx,hy-r*.45,hx,hy,[[0,C("#1a264e")],[1,C("#34508e")]]); ctx.beginPath(); ctx.moveTo(hx-f*r*.42,hy+r*.02); ctx.bezierCurveTo(hx-f*r*.42,hy-r*.3,hx-f*r*.05,hy-r*.44,hx+f*r*.25,hy-r*.3); ctx.quadraticCurveTo(hx+f*r*.4,hy-r*.2,hx+f*r*.36,hy-r*.08); ctx.quadraticCurveTo(hx+f*r*.1,hy-r*.16,hx-f*r*.05,hy-r*.08); ctx.quadraticCurveTo(hx-f*r*.25,hy+r*.02,hx-f*r*.42,hy+r*.02); ctx.closePath(); ctx.fill();
    ctx.fillStyle=C("#0c1430"); ctx.beginPath(); ctx.moveTo(hx-f*r*.02,hy-r*.1); ctx.quadraticCurveTo(hx+f*r*.16,hy-r*.2,hx+f*r*.36,hy-r*.12); ctx.lineTo(hx+f*r*.3,hy-r*.04); ctx.quadraticCurveTo(hx+f*r*.14,hy-r*.1,hx-f*r*.02,hy-r*.03); ctx.closePath(); ctx.fill();
    // 부리
    const bx=hx+f*r*.3, by=hy+r*.02;
    ctx.fillStyle=_lg(ctx,bx,by-r*.15,bx+f*r*.55,by+r*.35,[[0,C("#fff6c8")],[.45,C("#f2c24a")],[1,C("#8a5410")]]);
    ctx.beginPath(); ctx.moveTo(bx-f*r*.05,by-r*.14); ctx.quadraticCurveTo(bx+f*r*.5,by-r*.2,bx+f*r*.56,by+r*.12); ctx.quadraticCurveTo(bx+f*r*.58,by+r*.32,bx+f*r*.44,by+r*.4); ctx.quadraticCurveTo(bx+f*r*.42,by+r*.18,bx+f*r*.2,by+r*.14); ctx.lineTo(bx-f*r*.05,by+r*.12); ctx.closePath(); ctx.fill();
    ctx.strokeStyle="rgba(70,40,5,.7)"; ctx.lineWidth=1.1; ctx.stroke(); ctx.strokeStyle="rgba(255,255,255,.7)"; ctx.lineWidth=1.4; ctx.beginPath(); ctx.moveTo(bx+f*r*.02,by-r*.1); ctx.quadraticCurveTo(bx+f*r*.35,by-r*.14,bx+f*r*.48,by+r*.02); ctx.stroke();
    // 눈: 빛나는 눈동자 + 빛 꼬리
    const ex=hx+f*r*.16, ey=hy-r*.02, gl=.75+.25*Math.sin(t*6);
    ctx.save(); ctx.globalCompositeOperation="lighter";
    ctx.fillStyle=_rg(ctx,ex,ey,0,r*.24,[[0,`rgba(150,240,255,${.85*gl})`],[1,"rgba(80,180,255,0)"]]); ctx.beginPath(); ctx.arc(ex,ey,r*.24,0,7); ctx.fill();
    ctx.strokeStyle=_lg(ctx,ex,ey,ex-f*r*.8,ey-r*.06,[[0,`rgba(200,250,255,${.9*gl})`],[1,"rgba(120,220,255,0)"]]); ctx.lineWidth=r*.04; ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(ex-f*r*.06,ey); ctx.lineTo(ex-f*r*.8,ey-r*.07); ctx.stroke(); ctx.lineCap="butt"; ctx.restore();
    ctx.fillStyle=W?"#fff":_rg(ctx,ex,ey,0,r*.08,[[0,"#ffffff"],[.4,"#9af4ff"],[1,"#1a8ad8"]]); ctx.beginPath(); ctx.moveTo(ex-f*r*.09,ey+r*.02); ctx.quadraticCurveTo(ex,ey-r*.06,ex+f*r*.09,ey-r*.03); ctx.quadraticCurveTo(ex+f*r*.01,ey+r*.05,ex-f*r*.09,ey+r*.02); ctx.fill();
    ctx.fillStyle="#020610"; ctx.beginPath(); ctx.ellipse(ex+f*r*.015,ey-r*.005,r*.012,r*.035,0,0,7); ctx.fill();
    // 주위를 도는 빛 알갱이
    ctx.save(); ctx.globalCompositeOperation="lighter"; for(let i=0;i<10;i++){ const a=t*1.4+i*.628, R=r*(1.5+.2*Math.sin(t*2+i)); ctx.fillStyle=`rgba(170,240,255,${.5+.4*Math.sin(t*5+i)})`; ctx.beginPath(); ctx.arc(cx+Math.cos(a)*R,cy-r*.2+Math.sin(a)*R*.45,r*.035,0,7); ctx.fill() } ctx.restore() },

  gatekeeper(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, fl=Math.sin(t*2+e.wob), W=e.flash>0, C=(c)=>W?"#ffffff":c, cx=e.x, cy=e.y, gl=.65+.35*Math.sin(t*3.4+e.wob);
    const EDGE="rgba(18,24,48,.55)";
    const STEEL=(x0,x1)=>_lg(ctx,x0,0,x1,0,[[0,C("#6c7a98")],[.28,C("#e9eef8")],[.42,C("#ffffff")],[.7,C("#b6c2da")],[1,C("#5a6684")]]);
    const GOLD=(y0,y1)=>_lg(ctx,0,y0,0,y1,[[0,C("#fff3b8")],[.5,C("#e8b84a")],[1,C("#9a6a18")]]);
    // 빛 기운
    ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.fillStyle=_rg(ctx,cx,cy-r*.6,r*.2,r*3,[[0,"rgba(255,232,160,.38)"],[.5,"rgba(255,210,120,.12)"],[1,"rgba(255,200,100,0)"]]); ctx.beginPath(); ctx.arc(cx,cy-r*.6,r*3,0,7); ctx.fill(); ctx.restore();
    // 빛의 날개
    ctx.save();
    [-1,1].forEach(s=>{ const ox=cx+s*r*.3, oy=cy-r*.75;
      for(let layer=0;layer<2;layer++) for(let i=0;i<8;i++){ const u=i/7, ang=(s>0?-1.35+u*1.45:Math.PI+1.35-u*1.45)+s*fl*.07*(1-u)+s*layer*.12, len=r*(layer?1.6:2.5)*(1-.35*u);
        ctx.fillStyle=_lg(ctx,ox,oy,ox+Math.cos(ang)*len,oy+Math.sin(ang)*len,[[0,`rgba(255,252,240,${layer?.97:.92})`],[.6,`rgba(255,226,150,${layer?.8:.7})`],[1,"rgba(240,186,80,.25)"]]);
        _feather(ctx,ox,oy,ang,len,r*(layer?.16:.2),s*.07); ctx.fill();
        ctx.strokeStyle="rgba(190,138,40,.75)"; ctx.lineWidth=1.2; ctx.stroke() } });
    ctx.restore();
    // 후광
    const hy=cy-r*1.22;
    ctx.save(); ctx.translate(cx,hy-r*.18); ctx.rotate(t*.25);
    ctx.strokeStyle=_lg(ctx,-r*.8,0,r*.8,0,[[0,"rgba(255,220,120,.2)"],[.5,"rgba(255,240,180,.95)"],[1,"rgba(255,220,120,.2)"]]); ctx.lineWidth=2.4; ctx.beginPath(); ctx.arc(0,0,r*.72,0,7); ctx.stroke(); ctx.lineWidth=1.2; ctx.beginPath(); ctx.arc(0,0,r*.62,0,7); ctx.stroke();
    ctx.fillStyle="rgba(255,236,170,.9)"; for(let i=0;i<12;i++){ const a=i*Math.PI/6; ctx.save(); ctx.rotate(a); ctx.fillRect(r*.64,-1.5,r*.06,3); ctx.restore() } ctx.restore();
    // 망토
    const capeW=r*1.05, sway=Math.sin(t*2.4)*r*.06;
    ctx.fillStyle=_lg(ctx,0,cy-r*.8,0,cy+r*1.35,[[0,C("#2846a8")],[.6,C("#18287a")],[1,C("#0a1240")]]);
    ctx.beginPath(); ctx.moveTo(cx-r*.62,cy-r*.78); ctx.bezierCurveTo(cx-capeW*1.15,cy,cx-capeW*1.1+sway,cy+r*.9,cx-capeW+sway,cy+r*1.32);
    for(let k=0;k<=8;k++){ const x=cx-capeW+sway+k*capeW*2/8, y=cy+r*1.32+Math.sin(t*3+k*1.1)*r*.05+(k%2?r*.06:0); ctx.lineTo(x,y) }
    ctx.bezierCurveTo(cx+capeW*1.1+sway,cy+r*.9,cx+capeW*1.15,cy,cx+r*.62,cy-r*.78); ctx.closePath(); ctx.fill(); ctx.strokeStyle="rgba(232,184,74,.85)"; ctx.lineWidth=1.6; ctx.stroke();
    // 다리
    [-1,1].forEach(s=>{ const lx=cx+s*r*.24; ctx.fillStyle=STEEL(lx-r*.15,lx+r*.15); ctx.beginPath(); ctx.moveTo(lx-r*.14,cy+r*.48); ctx.lineTo(lx+r*.14,cy+r*.48); ctx.lineTo(lx+r*.12,cy+r*1.2); ctx.lineTo(lx-r*.12,cy+r*1.2); ctx.closePath(); ctx.fill(); ctx.strokeStyle=EDGE; ctx.lineWidth=1.1; ctx.stroke();
      ctx.fillStyle=STEEL(lx-r*.17,lx+r*.17); ctx.beginPath(); ctx.ellipse(lx,cy+r*.78,r*.15,r*.1,0,0,7); ctx.fill(); ctx.stroke(); ctx.fillStyle=GOLD(cy+r*.76,cy+r*.82); ctx.fillRect(lx-r*.1,cy+r*.76,r*.2,r*.04);
      ctx.fillStyle=STEEL(lx-r*.2,lx+r*.2); ctx.beginPath(); ctx.moveTo(lx-r*.15,cy+r*1.18); ctx.lineTo(lx+r*.15+s*r*.05,cy+r*1.18); ctx.lineTo(lx+r*.2*s+r*.02,cy+r*1.3); ctx.lineTo(lx-r*.17,cy+r*1.3); ctx.closePath(); ctx.fill(); ctx.stroke() });
    // 허리 아래 판금 + 가운데 천
    for(let i=-3;i<=3;i++){ const x=cx+i*r*.15; ctx.fillStyle=STEEL(x-r*.1,x+r*.1); ctx.beginPath(); ctx.moveTo(x-r*.1,cy+r*.3); ctx.lineTo(x+r*.1,cy+r*.3); ctx.lineTo(x+r*.1+i*r*.03,cy+r*.62); ctx.lineTo(x-r*.1+i*r*.03,cy+r*.62); ctx.closePath(); ctx.fill(); ctx.strokeStyle=EDGE; ctx.lineWidth=1; ctx.stroke(); ctx.fillStyle=GOLD(cy+r*.58,cy+r*.62); ctx.fillRect(x-r*.1+i*r*.03,cy+r*.585,r*.2,r*.03) }
    ctx.fillStyle=_lg(ctx,0,cy+r*.3,0,cy+r*1.05,[[0,C("#2e50b8")],[1,C("#142a7a")]]); ctx.beginPath(); ctx.moveTo(cx-r*.16,cy+r*.3); ctx.lineTo(cx+r*.16,cy+r*.3); ctx.lineTo(cx+r*.13,cy+r*1.0); ctx.lineTo(cx,cy+r*1.08); ctx.lineTo(cx-r*.13,cy+r*1.0); ctx.closePath(); ctx.fill(); ctx.strokeStyle="rgba(232,184,74,.9)"; ctx.lineWidth=1.3; ctx.stroke();
    ctx.fillStyle=GOLD(cy+r*.55,cy+r*.75); ctx.beginPath(); for(let i=0;i<16;i++){ const a=i*Math.PI/8, rr=i%2?r*.045:r*.1; ctx.lineTo(cx+Math.cos(a)*rr,cy+r*.66+Math.sin(a)*rr) } ctx.closePath(); ctx.fill();
    // 몸통 갑옷
    ctx.fillStyle=STEEL(cx-r*.55,cx+r*.55);
    ctx.beginPath(); ctx.moveTo(cx-r*.55,cy-r*.78); ctx.bezierCurveTo(cx-r*.6,cy-r*.2,cx-r*.36,cy+r*.1,cx-r*.3,cy+r*.34); ctx.lineTo(cx+r*.3,cy+r*.34); ctx.bezierCurveTo(cx+r*.36,cy+r*.1,cx+r*.6,cy-r*.2,cx+r*.55,cy-r*.78); ctx.closePath(); ctx.fill(); ctx.strokeStyle=EDGE; ctx.lineWidth=1.3; ctx.stroke();
    ctx.strokeStyle="rgba(60,70,100,.45)"; ctx.lineWidth=1.1; for(let k=0;k<3;k++){ const y=cy+r*(.0+k*.11); ctx.beginPath(); ctx.moveTo(cx-r*(.4-k*.03),y); ctx.quadraticCurveTo(cx,y+r*.05,cx+r*(.4-k*.03),y); ctx.stroke() }
    // 금빛 덩굴 장식
    ctx.strokeStyle=W?"#fff":"rgba(240,196,90,.95)"; ctx.lineWidth=1.6; [-1,1].forEach(s=>{ ctx.beginPath(); ctx.moveTo(cx,cy-r*.68); ctx.bezierCurveTo(cx+s*r*.25,cy-r*.66,cx+s*r*.4,cy-r*.5,cx+s*r*.3,cy-r*.32); ctx.bezierCurveTo(cx+s*r*.24,cy-r*.22,cx+s*r*.12,cy-r*.28,cx+s*r*.16,cy-r*.36); ctx.stroke() });
    // 가슴 보석
    ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.fillStyle=_rg(ctx,cx,cy-r*.42,0,r*.38,[[0,`rgba(255,246,200,${gl})`],[.4,`rgba(255,210,110,${.5*gl})`],[1,"rgba(255,200,90,0)"]]); ctx.beginPath(); ctx.arc(cx,cy-r*.42,r*.38,0,7); ctx.fill(); ctx.restore();
    ctx.fillStyle=_lg(ctx,cx,cy-r*.55,cx,cy-r*.3,[[0,C("#ffffff")],[.5,C("#ffe08a")],[1,C("#c88a20")]]); ctx.beginPath(); ctx.moveTo(cx,cy-r*.56); ctx.lineTo(cx+r*.09,cy-r*.42); ctx.lineTo(cx,cy-r*.28); ctx.lineTo(cx-r*.09,cy-r*.42); ctx.closePath(); ctx.fill(); ctx.strokeStyle="rgba(120,80,10,.8)"; ctx.lineWidth=1; ctx.stroke();
    // 방패 (반대쪽 팔)
    { const sx=cx-f*r*.78, sy=cy-r*.05; ctx.fillStyle=STEEL(sx-r*.34,sx+r*.34); ctx.beginPath(); ctx.moveTo(sx-r*.34,sy-r*.5); ctx.quadraticCurveTo(sx,sy-r*.6,sx+r*.34,sy-r*.5); ctx.lineTo(sx+r*.32,sy+r*.05); ctx.quadraticCurveTo(sx+r*.26,sy+r*.48,sx,sy+r*.72); ctx.quadraticCurveTo(sx-r*.26,sy+r*.48,sx-r*.32,sy+r*.05); ctx.closePath(); ctx.fill(); ctx.strokeStyle=W?"#fff":"#e8b84a"; ctx.lineWidth=2.4; ctx.stroke();
      ctx.fillStyle=_lg(ctx,0,sy-r*.4,0,sy+r*.5,[[0,C("#3a62d0")],[1,C("#18308a")]]); ctx.beginPath(); ctx.moveTo(sx-r*.24,sy-r*.4); ctx.quadraticCurveTo(sx,sy-r*.48,sx+r*.24,sy-r*.4); ctx.lineTo(sx+r*.22,sy+r*.02); ctx.quadraticCurveTo(sx+r*.18,sy+r*.36,sx,sy+r*.55); ctx.quadraticCurveTo(sx-r*.18,sy+r*.36,sx-r*.22,sy+r*.02); ctx.closePath(); ctx.fill();
      ctx.fillStyle=GOLD(sy-r*.25,sy+r*.15); ctx.beginPath(); for(let i=0;i<16;i++){ const a=-Math.PI/2+i*Math.PI/8, rr=i%2?r*.07:r*.19; ctx.lineTo(sx+Math.cos(a)*rr,sy-r*.05+Math.sin(a)*rr) } ctx.closePath(); ctx.fill();
      ctx.fillStyle="rgba(255,255,255,.35)"; ctx.beginPath(); ctx.ellipse(sx-r*.15,sy-r*.3,r*.05,r*.16,.3,0,7); ctx.fill() }
    // 어깨 갑옷 (세 겹)
    [-1,1].forEach(s=>{ for(let k=2;k>=0;k--){ const x=cx+s*(r*.55+k*r*.04), y=cy-r*.72+k*r*.11; ctx.fillStyle=STEEL(x-r*.3,x+r*.3); ctx.beginPath(); ctx.ellipse(x,y,r*(.32-k*.03),r*(.2-k*.02),s*.3,Math.PI*1.02,Math.PI*1.98+.0); ctx.lineTo(x+s*r*.02,y+r*.06); ctx.closePath(); ctx.fill(); ctx.strokeStyle=W?"#fff":"#e2b04a"; ctx.lineWidth=1.4; ctx.stroke() }
      ctx.fillStyle=GOLD(cy-r*1.1,cy-r*.8); ctx.beginPath(); ctx.moveTo(cx+s*r*.45,cy-r*.86); ctx.quadraticCurveTo(cx+s*r*.75,cy-r*1.15,cx+s*r*1.0,cy-r*1.1); ctx.quadraticCurveTo(cx+s*r*.8,cy-r*.98,cx+s*r*.62,cy-r*.84); ctx.closePath(); ctx.fill() });
    // 투구
    ctx.fillStyle=_lg(ctx,0,hy-r*.6,0,hy-r*.2,[[0,"rgba(255,255,255,.95)"],[1,"rgba(255,226,150,.6)"]]);
    ctx.beginPath(); ctx.moveTo(cx-f*r*.05,hy-r*.38); for(let i=0;i<=8;i++){ const u=i/8; ctx.lineTo(cx-f*(r*.1+u*r*.85),hy-r*.42-Math.sin(u*Math.PI)*r*.2+Math.sin(t*4+u*5)*r*.04*u) } ctx.lineTo(cx-f*r*.05,hy-r*.25); ctx.closePath(); ctx.fill();
    [-1,1].forEach(s=>{ ctx.fillStyle=GOLD(hy-r*.5,hy); ctx.beginPath(); ctx.moveTo(cx+s*r*.26,hy-r*.12); ctx.quadraticCurveTo(cx+s*r*.55,hy-r*.35,cx+s*r*.62,hy-r*.62); ctx.quadraticCurveTo(cx+s*r*.45,hy-r*.38,cx+s*r*.24,hy-r*.28); ctx.closePath(); ctx.fill(); ctx.strokeStyle="rgba(120,80,10,.6)"; ctx.lineWidth=1; ctx.stroke() });
    ctx.fillStyle=STEEL(cx-r*.3,cx+r*.3); ctx.beginPath(); ctx.moveTo(cx-r*.27,hy+r*.2); ctx.lineTo(cx-r*.3,hy-r*.12); ctx.bezierCurveTo(cx-r*.28,hy-r*.45,cx+r*.28,hy-r*.45,cx+r*.3,hy-r*.12); ctx.lineTo(cx+r*.27,hy+r*.2); ctx.quadraticCurveTo(cx,hy+r*.38,cx-r*.27,hy+r*.2); ctx.fill(); ctx.strokeStyle=EDGE; ctx.lineWidth=1.3; ctx.stroke();
    ctx.strokeStyle=W?"#fff":"#e2b04a"; ctx.lineWidth=1.6; ctx.beginPath(); ctx.moveTo(cx,hy-r*.38); ctx.lineTo(cx,hy-r*.08); ctx.stroke();
    ctx.fillStyle="#0a0c18"; ctx.beginPath(); ctx.moveTo(cx-r*.22,hy-r*.04); ctx.lineTo(cx+r*.22,hy-r*.04); ctx.lineTo(cx+r*.2,hy+r*.03); ctx.lineTo(cx+r*.035,hy+r*.03); ctx.lineTo(cx+r*.035,hy+r*.24); ctx.lineTo(cx-r*.035,hy+r*.24); ctx.lineTo(cx-r*.035,hy+r*.03); ctx.lineTo(cx-r*.2,hy+r*.03); ctx.closePath(); ctx.fill();
    ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.fillStyle=`rgba(255,240,180,${gl})`; ctx.fillRect(cx-r*.19,hy-r*.015,r*.38,r*.025); ctx.fillRect(cx-r*.012,hy-r*.015,r*.024,r*.2);
    ctx.fillStyle=_rg(ctx,cx,hy,0,r*.5,[[0,`rgba(255,236,170,${.6*gl})`],[1,"rgba(255,236,170,0)"]]); ctx.beginPath(); ctx.arc(cx,hy,r*.5,0,7); ctx.fill(); ctx.restore();
    // 빛의 창 (바라보는 쪽)
    ctx.save(); ctx.translate(cx+f*r*.82,cy-r*.05); ctx.rotate(f*(.12+Math.sin(t*1.8+e.wob)*.05));
    ctx.fillStyle=_lg(ctx,-r*.04,0,r*.04,0,[[0,C("#1a2450")],[.5,C("#4a5c9a")],[1,C("#141c40")]]); ctx.fillRect(-r*.035,-r*2.0,r*.07,r*3.1);
    ctx.fillStyle=GOLD(-r*1.95,-r*1.8); [-1.92,-.4,.6].forEach(y=>ctx.fillRect(-r*.06,y*r,r*.12,r*.07));
    ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.fillStyle=_rg(ctx,0,-r*2.35,0,r*.8,[[0,`rgba(255,244,200,${.55*gl})`],[1,"rgba(255,230,150,0)"]]); ctx.beginPath(); ctx.arc(0,-r*2.35,r*.8,0,7); ctx.fill(); ctx.restore();
    ctx.fillStyle=_lg(ctx,0,-r*2.95,0,-r*1.95,[[0,C("#ffffff")],[.5,C("#fff2c8")],[1,C("#e8c060")]]);
    ctx.beginPath(); ctx.moveTo(0,-r*3.0); ctx.bezierCurveTo(r*.22,-r*2.65,r*.2,-r*2.2,r*.06,-r*1.98); ctx.lineTo(-r*.06,-r*1.98); ctx.bezierCurveTo(-r*.2,-r*2.2,-r*.22,-r*2.65,0,-r*3.0); ctx.fill(); ctx.strokeStyle="rgba(150,110,20,.7)"; ctx.lineWidth=1; ctx.stroke();
    ctx.fillStyle=_lg(ctx,-f*r*.4,0,0,0,[[0,C("#fff6d8")],[1,C("#e2b04a")]]); ctx.beginPath(); ctx.moveTo(0,-r*2.1); ctx.quadraticCurveTo(-f*r*.5,-r*2.25,-f*r*.42,-r*1.82); ctx.quadraticCurveTo(-f*r*.3,-r*2.0,0,-r*1.95); ctx.fill(); ctx.stroke();
    ctx.restore() },
});
/* ===== 천년 고목 「숲지기」 · 천년 이무기 「아스라」 (그림이 오기 전 코드 그림) ===== */
Object.assign(LOOKS, {
  elder(ctx,e,t,px,py){ const r=e.r, W=e.flash>0, C=c=>W?"#ffffff":c, cx=e.x, cy=e.y, sw=Math.sin(t*1.6+e.wob);
    // 뿌리 다리
    for(let i=0;i<6;i++){ const s=i<3?-1:1, k=i%3, bx=cx+s*r*(.2+k*.14), by=cy+r*.55;
      ctx.strokeStyle=_lg(ctx,bx,by,bx+s*r*(.6+k*.25),by+r*.5,[[0,C("#4a3018")],[1,C("#2a1a0c")]]); ctx.lineWidth=r*(.2-k*.04); ctx.lineCap="round";
      ctx.beginPath(); ctx.moveTo(bx,by); ctx.bezierCurveTo(bx+s*r*.25,by+r*.15,bx+s*r*(.45+k*.2),by+r*.25,bx+s*r*(.7+k*.25),by+r*(.45+k*.05)); ctx.stroke() }
    ctx.lineCap="butt";
    // 나뭇잎 왕관 (뒤)
    const crown=[[0,-1.75,1.05],[-.85,-1.45,.8],[.85,-1.45,.8],[-.5,-2.05,.7],[.55,-2.0,.72],[-1.25,-1.05,.6],[1.25,-1.05,.6]];
    crown.forEach(([a,b,z],i)=>{ const x=cx+a*r+sw*r*.05*(i%2?1:-1), y=cy+b*r; ctx.fillStyle=_rg(ctx,x,y,r*.05,r*z,[[0,C("#9ae06a")],[.55,C("#3a8a3a")],[1,C("#1a4a24")]],-r*.2,-r*.25); ctx.beginPath(); ctx.arc(x,y,r*z,0,7); ctx.fill() });
    // 몸통 (나무껍질)
    ctx.fillStyle=_lg(ctx,cx-r*.6,0,cx+r*.6,0,[[0,C("#2e1c0c")],[.35,C("#6a4424")],[.6,C("#5a3a1e")],[1,C("#24160a")]]);
    ctx.beginPath(); ctx.moveTo(cx-r*.5,cy+r*.62); ctx.bezierCurveTo(cx-r*.62,cy,cx-r*.5,cy-r*.6,cx-r*.55,cy-r*1.1); ctx.lineTo(cx+r*.55,cy-r*1.1); ctx.bezierCurveTo(cx+r*.5,cy-r*.6,cx+r*.62,cy,cx+r*.5,cy+r*.62); ctx.closePath(); ctx.fill();
    ctx.strokeStyle="rgba(20,10,4,.55)"; ctx.lineWidth=1.4; for(let i=0;i<7;i++){ const x=cx-r*.42+i*r*.14; ctx.beginPath(); ctx.moveTo(x,cy+r*.6); ctx.bezierCurveTo(x+Math.sin(i)*r*.06,cy+r*.1,x-Math.sin(i*2)*r*.06,cy-r*.4,x+Math.sin(i*3)*r*.04,cy-r*1.05); ctx.stroke() }
    // 이끼
    ctx.fillStyle=C("rgba(110,170,70,.85)"); [[-.35,.45,.2],[.3,-.6,.18],[-.4,-.85,.14],[.38,.25,.12]].forEach(([a,b,z])=>{ ctx.beginPath(); ctx.ellipse(cx+a*r,cy+b*r,r*z,r*z*.45,0,0,7); ctx.fill() });
    // 가지 팔
    [-1,1].forEach(s=>{ const ax=cx+s*r*.5, ay=cy-r*.35, ang=s*(.25+sw*.12);
      ctx.strokeStyle=_lg(ctx,ax,ay,ax+s*r*1.2,ay-r*.4,[[0,C("#5a3a1e")],[1,C("#3a2412")]]); ctx.lineCap="round"; ctx.lineWidth=r*.17;
      ctx.beginPath(); ctx.moveTo(ax,ay); ctx.quadraticCurveTo(ax+s*r*.7,ay-r*.1+sw*r*.1,ax+s*r*1.2,ay-r*.55-sw*r*.15); ctx.stroke();
      ctx.lineWidth=r*.07; [[.95,-.4,.35,-.85],[1.15,-.5,1.5,-.6],[1.05,-.45,1.3,-.15]].forEach(([a,b,c2,d])=>{ ctx.beginPath(); ctx.moveTo(ax+s*r*a,ay+r*b); ctx.lineTo(ax+s*r*(a+(c2-a)*.4+.2),ay+r*d); ctx.stroke() });
      ctx.fillStyle=C("#4a9a3a"); ctx.beginPath(); ctx.arc(ax+s*r*1.25,ay-r*.62-sw*r*.15,r*.26,0,7); ctx.fill() });
    ctx.lineCap="butt";
    // 얼굴: 껍질 구멍 눈 + 초록빛
    const ey=cy-r*.42, gl=.7+.3*Math.sin(t*3+e.wob);
    [-1,1].forEach(s=>{ ctx.fillStyle="#120804"; ctx.beginPath(); ctx.moveTo(cx+s*r*.08,ey-r*.02); ctx.quadraticCurveTo(cx+s*r*.22,ey-r*.16,cx+s*r*.36,ey-r*.06); ctx.quadraticCurveTo(cx+s*r*.26,ey+r*.1,cx+s*r*.08,ey-r*.02); ctx.fill();
      ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.fillStyle=_rg(ctx,cx+s*r*.22,ey-r*.04,0,r*.22,[[0,`rgba(190,255,120,${gl})`],[1,"rgba(120,255,80,0)"]]); ctx.beginPath(); ctx.arc(cx+s*r*.22,ey-r*.04,r*.22,0,7); ctx.fill(); ctx.restore();
      ctx.fillStyle=W?"#fff":"#d8ff9a"; ctx.beginPath(); ctx.ellipse(cx+s*r*.22,ey-r*.04,r*.05,r*.03,0,0,7); ctx.fill();
      ctx.strokeStyle="#1a0c04"; ctx.lineWidth=r*.07; ctx.beginPath(); ctx.moveTo(cx+s*r*.06,ey-r*.2); ctx.lineTo(cx+s*r*.4,ey-r*.26); ctx.stroke() });
    ctx.fillStyle="#140804"; ctx.beginPath(); ctx.moveTo(cx-r*.24,cy-r*.08); ctx.quadraticCurveTo(cx,cy-r*.16,cx+r*.24,cy-r*.08); ctx.quadraticCurveTo(cx+r*.1,cy+r*.18,cx,cy+r*.2); ctx.quadraticCurveTo(cx-r*.1,cy+r*.18,cx-r*.24,cy-r*.08); ctx.fill();
    ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.fillStyle=`rgba(150,255,100,${.35*gl})`; ctx.beginPath(); ctx.ellipse(cx,cy+r*.04,r*.14,r*.08,0,0,7); ctx.fill(); ctx.restore();
    // 빛나는 꽃 + 반딧불 정령
    [[-.6,-1.7],[.45,-2.2],[.9,-1.5],[-1.1,-1.15],[.1,-1.45]].forEach(([a,b],i)=>{ const x=cx+a*r, y=cy+b*r; ctx.fillStyle=C(i%2?"#ffd6f0":"#fff6c8"); for(let k=0;k<5;k++){ const q=k*1.256; ctx.beginPath(); ctx.ellipse(x+Math.cos(q)*r*.07,y+Math.sin(q)*r*.07,r*.06,r*.035,q,0,7); ctx.fill() } ctx.fillStyle="#f6c544"; ctx.beginPath(); ctx.arc(x,y,r*.035,0,7); ctx.fill() });
    ctx.save(); ctx.globalCompositeOperation="lighter"; for(let i=0;i<12;i++){ const a=t*.7+i*.52, R=r*(1.3+.4*Math.sin(t+i)), x=cx+Math.cos(a)*R, y=cy-r*.8+Math.sin(a*1.3)*r*.9; const g=_rg(ctx,x,y,0,r*.12,[[0,"rgba(230,255,150,.95)"],[1,"rgba(160,255,100,0)"]]); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r*.12,0,7); ctx.fill() } ctx.restore() },

  imugi(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, W=e.flash>0, C=c=>W?"#ffffff":c, cx=e.x, cy=e.y, gl=.7+.3*Math.sin(t*3+e.wob);
    // 똬리: 꼬리부터 몸통까지 이어진 굵은 몸 (비늘 광택 + 배 비늘)
    const N=60, pts=[]; for(let i=0;i<N;i++){ const u=i/(N-1), a=-u*Math.PI*3.4+t*.35, R=r*(.35+u*.85); pts.push([cx+Math.cos(a)*R*f, cy+r*.42+Math.sin(a)*R*.38-(1-u)*r*.25, r*(.12+u*.24)]) }
    ctx.lineCap="round";
    for(let i=0;i<N-1;i++){ const [x0,y0,w0]=pts[i], [x1,y1]=pts[i+1]; ctx.strokeStyle=C("#0c0f30"); ctx.lineWidth=w0*2+2.4; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y1); ctx.stroke();
      ctx.strokeStyle=C(i%2?"#2a3480":"#2e3a8a"); ctx.lineWidth=w0*2; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y1); ctx.stroke();
      ctx.strokeStyle=W?"#fff":"rgba(130,150,255,.55)"; ctx.lineWidth=w0*.45; ctx.beginPath(); ctx.moveTo(x0,y0-w0*.45); ctx.lineTo(x1,y1-w0*.45); ctx.stroke();
      ctx.strokeStyle=W?"#fff":"rgba(210,200,240,.75)"; ctx.lineWidth=w0*.35; ctx.beginPath(); ctx.moveTo(x0,y0+w0*.55); ctx.lineTo(x1,y1+w0*.55); ctx.stroke() }
    ctx.lineCap="butt";
    // 등줄기 수정
    for(let i=4;i<N;i+=5){ const [x,y,rr]=pts[i]; const h=rr*1.5; ctx.fillStyle=_lg(ctx,x,y-rr,x,y-rr-h,[[0,C("#5a3aa8")],[.5,C("#b88aff")],[1,C("#e8f6ff")]]); ctx.beginPath(); ctx.moveTo(x-rr*.35,y-rr*.55); ctx.lineTo(x+rr*.1,y-rr*.55-h); ctx.lineTo(x+rr*.35,y-rr*.55); ctx.closePath(); ctx.fill() }
    // 목과 머리
    const hx=cx+f*r*.25, hy=cy-r*1.0+Math.sin(t*1.8)*r*.06;
    ctx.strokeStyle=_lg(ctx,cx,cy,hx,hy,[[0,C("#232a6a")],[1,C("#3a4aa0")]]); ctx.lineWidth=r*.36; ctx.lineCap="round"; { const [nx,ny]=pts[N-1]; ctx.beginPath(); ctx.moveTo(nx,ny); ctx.quadraticCurveTo(cx-f*r*.15,cy-r*.75,hx-f*r*.1,hy+r*.15); ctx.stroke() } ctx.lineCap="butt";
    ctx.fillStyle=_lg(ctx,0,cy-r*.6,0,cy,[[0,C("#c8c0e8")],[1,C("#7a72a8")]]); ctx.beginPath(); ctx.ellipse(cx-f*r*.12,cy-r*.42,r*.09,r*.3,f*.15,0,7); ctx.fill();
    ctx.fillStyle=_rg(ctx,hx,hy,r*.05,r*.45,[[0,C("#5a6ac8")],[.7,C("#2a327a")],[1,C("#12163e")]],-r*.1,-r*.12);
    ctx.beginPath(); ctx.moveTo(hx-f*r*.32,hy-r*.05); ctx.quadraticCurveTo(hx-f*r*.1,hy-r*.32,hx+f*r*.3,hy-r*.18); ctx.quadraticCurveTo(hx+f*r*.55,hy-r*.08,hx+f*r*.6,hy+r*.06); ctx.quadraticCurveTo(hx+f*r*.3,hy+r*.22,hx-f*r*.2,hy+r*.2); ctx.closePath(); ctx.fill(); ctx.strokeStyle="rgba(5,5,25,.6)"; ctx.lineWidth=1.2; ctx.stroke();
    // 막 돋은 뿔
    [0,1].forEach(k=>{ const bx=hx-f*r*(.05+k*.16), by=hy-r*.22; ctx.fillStyle=_lg(ctx,bx,by,bx-f*r*.12,by-r*.3,[[0,C("#d8c8a0")],[1,C("#fff6e0")]]); ctx.beginPath(); ctx.moveTo(bx-r*.04,by); ctx.quadraticCurveTo(bx-f*r*.06,by-r*.18,bx-f*r*.16,by-r*(.26-k*.06)); ctx.quadraticCurveTo(bx,by-r*.12,bx+r*.04,by); ctx.fill() });
    // 수염
    ctx.strokeStyle=C("rgba(220,210,255,.9)"); ctx.lineWidth=1.6; [-1,1].forEach(s=>{ ctx.beginPath(); ctx.moveTo(hx+f*r*.45,hy+r*.06); ctx.bezierCurveTo(hx+f*r*.7,hy+r*(.2+s*.05),hx+f*r*.6+Math.sin(t*2+s)*r*.1,hy+r*.5,hx+f*r*.85,hy+r*(.62+s*.08)); ctx.stroke() });
    // 눈
    const ex=hx+f*r*.12, ey=hy-r*.06;
    ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.fillStyle=_rg(ctx,ex,ey,0,r*.2,[[0,`rgba(220,150,255,${gl})`],[1,"rgba(160,90,255,0)"]]); ctx.beginPath(); ctx.arc(ex,ey,r*.2,0,7); ctx.fill(); ctx.restore();
    ctx.fillStyle=W?"#fff":"#f2d8ff"; ctx.beginPath(); ctx.moveTo(ex-f*r*.08,ey+r*.02); ctx.quadraticCurveTo(ex,ey-r*.05,ex+f*r*.09,ey-r*.01); ctx.quadraticCurveTo(ex,ey+r*.04,ex-f*r*.08,ey+r*.02); ctx.fill(); ctx.fillStyle="#12021e"; ctx.beginPath(); ctx.ellipse(ex,ey,r*.012,r*.035,0,0,7); ctx.fill();
    // 여의주 (꼬리 끝에 품은 빛나는 구슬)
    const [qx,qy]=[pts[0][0],pts[0][1]-r*.25+Math.sin(t*2)*r*.05];
    ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.fillStyle=_rg(ctx,qx,qy,0,r*.55,[[0,`rgba(200,240,255,${gl})`],[.4,`rgba(150,120,255,${.5*gl})`],[1,"rgba(120,80,255,0)"]]); ctx.beginPath(); ctx.arc(qx,qy,r*.55,0,7); ctx.fill(); ctx.restore();
    ctx.fillStyle=_rg(ctx,qx,qy,r*.02,r*.2,[[0,"#ffffff"],[.5,"#bfe8ff"],[1,"#6a5ad8"]],-r*.06,-r*.06); ctx.beginPath(); ctx.arc(qx,qy,r*.2,0,7); ctx.fill();
    ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.strokeStyle=`rgba(200,230,255,${.6*gl})`; ctx.lineWidth=1.5; for(let i=0;i<3;i++){ ctx.beginPath(); ctx.ellipse(qx,qy,r*.32,r*.12,t*2+i*1.05,0,7); ctx.stroke() } ctx.restore() },
});
/* ===== 맵마다 새로 늘어난 몬스터 ===== */
Object.assign(LOOKS, {
  flower(ctx,e,t,px,py){ const r=e.r, sw=Math.sin(t*4+e.wob)*.15, c=e.c||"#e8508a";
    ctx.strokeStyle=_C(e,"#3a8a2a"); ctx.lineWidth=r*.18; ctx.beginPath(); ctx.moveTo(e.x,e.y+r*.95); ctx.quadraticCurveTo(e.x+sw*r,e.y+r*.4,e.x,e.y); ctx.stroke();
    [-1,1].forEach(s=>{ ctx.fillStyle=_C(e,"#4aa83a"); ctx.beginPath(); ctx.ellipse(e.x+s*r*.45,e.y+r*.6,r*.42,r*.15,s*-.5,0,7); ctx.fill(); _ol(ctx,1) });
    for(let i=0;i<7;i++){ const a=i*Math.PI*2/7+sw; ctx.fillStyle=_G(ctx,e,e.x+Math.cos(a)*r*.62,e.y-r*.15+Math.sin(a)*r*.62,r*.36,r*.24,c); ctx.beginPath(); ctx.ellipse(e.x+Math.cos(a)*r*.62,e.y-r*.15+Math.sin(a)*r*.6,r*.4,r*.24,a,0,7); ctx.fill(); _ol(ctx,1.2) }
    _blob(ctx,e,e.x,e.y-r*.15,r*.55,r*.52,"#f6c544");
    const open=.5+.5*Math.sin(t*5+e.wob); ctx.fillStyle="#3a0614"; ctx.beginPath(); ctx.ellipse(e.x,e.y-r*.05,r*.35,r*.12+r*.18*open,0,0,7); ctx.fill();
    ctx.fillStyle="#fff4e0"; for(let k=0;k<6;k++){ const x=e.x-r*.28+k*r*.11; ctx.beginPath(); ctx.moveTo(x-r*.04,e.y-r*.05-r*.12-r*.18*open); ctx.lineTo(x,e.y-r*.05-r*.02); ctx.lineTo(x+r*.04,e.y-r*.05-r*.12-r*.18*open); ctx.fill(); ctx.beginPath(); ctx.moveTo(x-r*.04,e.y-r*.05+r*.12+r*.18*open); ctx.lineTo(x,e.y-r*.05+r*.02); ctx.lineTo(x+r*.04,e.y-r*.05+r*.12+r*.18*open); ctx.fill() }
    _face(ctx,e,t,px,py,e.y-r*.42,r*.22,r*.14,{mouth:"none",style:"beady"}) },
  moth(ctx,e,t,px,py){ const r=e.r, fl=Math.sin(t*20+e.wob);
    [-1,1].forEach(s=>{ for(const [dy,sz,c] of [[-.35,1,"#7a3ab8"],[.35,.7,"#5a2a8a"]]){ ctx.save(); ctx.translate(e.x+s*r*.25,e.y+dy*r); ctx.scale(1,.55+.45*Math.abs(fl)); ctx.fillStyle=_G(ctx,e,s*r*.7,0,r*.9*sz,r*.7*sz,c); ctx.beginPath(); ctx.ellipse(s*r*.7*sz,0,r*.85*sz,r*.6*sz,s*.3,0,7); ctx.fill(); _ol(ctx,1.2);
      ctx.fillStyle=_C(e,"#ffd36a"); ctx.beginPath(); ctx.arc(s*r*.75*sz,0,r*.2*sz,0,7); ctx.fill(); ctx.fillStyle="#1a0622"; ctx.beginPath(); ctx.arc(s*r*.75*sz,0,r*.1*sz,0,7); ctx.fill(); ctx.restore() } });
    _blob(ctx,e,e.x,e.y,r*.28,r*.62,"#3a2050");
    ctx.strokeStyle=_C(e,"#c8a8e8"); ctx.lineWidth=1.3; [-1,1].forEach(s=>{ ctx.beginPath(); ctx.moveTo(e.x+s*r*.08,e.y-r*.55); ctx.quadraticCurveTo(e.x+s*r*.4,e.y-r*1.0,e.x+s*r*.55,e.y-r*.95); ctx.stroke() });
    _face(ctx,e,t,px,py,e.y-r*.35,r*.14,r*.12,{mouth:"none"}) },
  fox(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, run=Math.sin(t*14+e.wob)*r*.1;
    for(let i=0;i<5;i++){ const ph=(t*2+i/5+e.wob)%1; ctx.fillStyle=`rgba(255,${160-ph*80|0},60,${.7*(1-ph)})`; ctx.beginPath(); ctx.arc(e.x-f*r*(1+ph*.6),e.y-r*(.2+ph*.5)+Math.sin(t*6+i)*r*.08,r*.28*(1-ph)+2,0,7); ctx.fill() }
    ctx.fillStyle=_G(ctx,e,e.x-f*r*.9,e.y-r*.2,r*.5,r*.3,"#ff8a2a"); ctx.beginPath(); ctx.moveTo(e.x-f*r*.4,e.y); ctx.quadraticCurveTo(e.x-f*r*1.3,e.y-r*.1,e.x-f*r*1.25,e.y-r*.7); ctx.quadraticCurveTo(e.x-f*r*.9,e.y-r*.3,e.x-f*r*.4,e.y-r*.25); ctx.fill(); _ol(ctx,1.2);
    ctx.fillStyle=_C(e,"#fff6e8"); ctx.beginPath(); ctx.arc(e.x-f*r*1.22,e.y-r*.66,r*.12,0,7); ctx.fill();
    ctx.fillStyle=_C(e,"#5a2a10"); [[-.35,run],[.35,-run]].forEach(([a,s])=>{ ctx.fillRect(e.x+a*r-r*.06,e.y+r*.4+s,r*.12,r*.45) });
    _blob(ctx,e,e.x,e.y+r*.1,r*.62,r*.45,"#e86a1a");
    _blob(ctx,e,e.x+f*r*.45,e.y-r*.35,r*.42,r*.36,"#f07a2a");
    [-1,1].forEach(s=>{ ctx.fillStyle=_C(e,"#e86a1a"); ctx.beginPath(); ctx.moveTo(e.x+f*r*.45+s*r*.28,e.y-r*.55); ctx.lineTo(e.x+f*r*.45+s*r*.38,e.y-r*1.0); ctx.lineTo(e.x+f*r*.45+s*r*.05,e.y-r*.68); ctx.fill(); _ol(ctx,1) });
    ctx.fillStyle=_C(e,"#fff6e8"); ctx.beginPath(); ctx.ellipse(e.x+f*r*.72,e.y-r*.22,r*.2,r*.12,0,0,7); ctx.fill(); ctx.fillStyle="#1a0a04"; ctx.beginPath(); ctx.arc(e.x+f*r*.88,e.y-r*.26,r*.05,0,7); ctx.fill();
    _face(ctx,e,t,px,py,e.y-r*.42,r*.15,r*.12,{shift:f*r*.45,mouth:"none"}) },
  beetle(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, w=Math.sin(t*10+e.wob);
    ctx.strokeStyle=_C(e,"#1a0e06"); ctx.lineWidth=2; for(let i=0;i<3;i++){ [-1,1].forEach(s=>{ ctx.beginPath(); ctx.moveTo(e.x+s*r*.4,e.y-r*.1+i*r*.3); ctx.lineTo(e.x+s*r*.95,e.y+i*r*.32+(i%2?w:-w)*r*.08); ctx.lineTo(e.x+s*r*1.05,e.y+r*.3+i*r*.32); ctx.stroke() }) }
    const sg=ctx.createLinearGradient(e.x-r*.8,0,e.x+r*.8,0); sg.addColorStop(0,_C(e,"#1a3a2a")); sg.addColorStop(.45,_C(e,"#3a8a6a")); sg.addColorStop(1,_C(e,"#0e2418"));
    ctx.fillStyle=sg; ctx.beginPath(); ctx.ellipse(e.x,e.y+r*.2,r*.78,r*.7,0,0,7); ctx.fill(); _ol(ctx); ctx.strokeStyle="rgba(0,0,0,.6)"; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(e.x,e.y-r*.4); ctx.lineTo(e.x,e.y+r*.85); ctx.stroke();
    ctx.fillStyle="rgba(180,255,220,.35)"; ctx.beginPath(); ctx.ellipse(e.x-r*.3,e.y,r*.15,r*.35,-.2,0,7); ctx.fill();
    _blob(ctx,e,e.x,e.y-r*.55,r*.45,r*.32,"#2a2a1a");
    ctx.fillStyle=_C(e,"#3a2a14"); ctx.beginPath(); ctx.moveTo(e.x-r*.1,e.y-r*.75); ctx.quadraticCurveTo(e.x+f*r*.1,e.y-r*1.5,e.x+f*r*.45,e.y-r*1.55); ctx.quadraticCurveTo(e.x+f*r*.15,e.y-r*1.25,e.x+r*.12,e.y-r*.75); ctx.fill(); _ol(ctx,1.2);
    _face(ctx,e,t,px,py,e.y-r*.55,r*.24,r*.14,{mouth:"none"}) },
  mummy(ctx,e,t,px,py){ const r=e.r, sw=Math.sin(t*5+e.wob)*r*.06;
    [-1,1].forEach(s=>{ ctx.fillStyle=_C(e,"#d8c8a0"); ctx.save(); ctx.translate(e.x+s*r*.55,e.y-r*.15); ctx.rotate(-s*.9+s*sw*.02); ctx.fillRect(-r*.12,0,r*.24,r*.75); ctx.restore() });
    _blob(ctx,e,e.x,e.y+r*.1,r*.62,r*.78,"#d8c8a0");
    ctx.save(); ctx.beginPath(); ctx.ellipse(e.x,e.y+r*.1,r*.62,r*.78,0,0,7); ctx.clip(); ctx.strokeStyle="rgba(120,96,60,.7)"; ctx.lineWidth=1.6; for(let i=0;i<9;i++){ const y=e.y-r*.7+i*r*.2; ctx.beginPath(); ctx.moveTo(e.x-r*.7,y+(i%2?r*.06:-r*.06)); ctx.lineTo(e.x+r*.7,y-(i%2?r*.06:-r*.06)); ctx.stroke() } ctx.restore();
    ctx.fillStyle=_C(e,"#c8b890"); ctx.beginPath(); ctx.moveTo(e.x+r*.3,e.y+r*.6); ctx.quadraticCurveTo(e.x+r*.8,e.y+r*.9+sw,e.x+r*1.0,e.y+r*.7+sw); ctx.lineTo(e.x+r*.9,e.y+r*.62+sw); ctx.quadraticCurveTo(e.x+r*.7,e.y+r*.75,e.x+r*.35,e.y+r*.48); ctx.fill();
    ctx.fillStyle=_C(e,"#e8dcb8"); ctx.beginPath(); ctx.ellipse(e.x,e.y-r*.55,r*.5,r*.42,0,0,7); ctx.fill(); _ol(ctx,1.4);
    ctx.strokeStyle="rgba(120,96,60,.75)"; ctx.lineWidth=1.5; for(let i=0;i<4;i++){ ctx.beginPath(); ctx.moveTo(e.x-r*.48,e.y-r*.85+i*r*.17); ctx.lineTo(e.x+r*.48,e.y-r*.75+i*r*.17); ctx.stroke() }
    ctx.fillStyle="#140a04"; ctx.fillRect(e.x-r*.42,e.y-r*.6,r*.84,r*.16);
    _face(ctx,e,t,px,py,e.y-r*.52,r*.2,r*.13,{style:"beady",mouth:"none"}) },
  cobra(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, sw=Math.sin(t*6+e.wob);
    ctx.strokeStyle=_C(e,"#a8782a"); ctx.lineWidth=r*.42; ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(e.x-f*r*.9,e.y+r*.75); ctx.bezierCurveTo(e.x-f*r*.2,e.y+r*(.95+sw*.1),e.x+f*r*.3,e.y+r*.6,e.x,e.y+r*.1); ctx.stroke();
    ctx.strokeStyle=_C(e,"#7a5214"); ctx.lineWidth=r*.12; ctx.setLineDash([r*.15,r*.15]); ctx.stroke(); ctx.setLineDash([]); ctx.lineCap="butt";
    ctx.fillStyle=_G(ctx,e,e.x,e.y-r*.35,r*.75,r*.65,"#c8962a"); ctx.beginPath(); ctx.moveTo(e.x,e.y+r*.15); ctx.bezierCurveTo(e.x-r*.9,e.y,e.x-r*.75,e.y-r*.9,e.x,e.y-r*.95); ctx.bezierCurveTo(e.x+r*.75,e.y-r*.9,e.x+r*.9,e.y,e.x,e.y+r*.15); ctx.fill(); _ol(ctx);
    ctx.fillStyle=_C(e,"#f2d8a0"); ctx.beginPath(); ctx.ellipse(e.x,e.y-r*.35,r*.25,r*.45,0,0,7); ctx.fill();
    ctx.fillStyle=_C(e,"#3a2a0a"); [[-.45,-.5],[.45,-.5],[-.5,-.2],[.5,-.2]].forEach(([a,b])=>{ ctx.beginPath(); ctx.arc(e.x+a*r,e.y+b*r,r*.07,0,7); ctx.fill() });
    _blob(ctx,e,e.x,e.y-r*.9,r*.28,r*.22,"#b8862a");
    ctx.strokeStyle="#c8283a"; ctx.lineWidth=1.5; const tg=Math.sin(t*12)>0?r*.2:r*.08; ctx.beginPath(); ctx.moveTo(e.x,e.y-r*.72); ctx.lineTo(e.x,e.y-r*.72+tg); ctx.stroke();
    _face(ctx,e,t,px,py,e.y-r*.95,r*.14,r*.1,{mouth:"none"}) },
  mole(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, dig=Math.sin(t*8+e.wob);
    ctx.fillStyle="rgba(60,50,70,.6)"; for(let i=0;i<4;i++){ ctx.beginPath(); ctx.arc(e.x+(i-1.5)*r*.4,e.y+r*.8,r*.18,0,7); ctx.fill() }
    _blob(ctx,e,e.x,e.y+r*.1,r*.8,r*.7,"#4a3a4a");
    ctx.save(); ctx.globalCompositeOperation="lighter"; const lg=ctx.createRadialGradient(e.x,e.y-r*.85,0,e.x,e.y-r*.85,r*.9); lg.addColorStop(0,"rgba(255,230,140,.6)"); lg.addColorStop(1,"rgba(255,230,140,0)"); ctx.fillStyle=lg; ctx.beginPath(); ctx.arc(e.x,e.y-r*.85,r*.9,0,7); ctx.fill(); ctx.restore();
    ctx.fillStyle=_C(e,"#c8a83a"); ctx.beginPath(); ctx.ellipse(e.x,e.y-r*.5,r*.62,r*.35,0,Math.PI,0); ctx.fill(); _ol(ctx,1.2); ctx.fillStyle="#fff6c8"; ctx.beginPath(); ctx.arc(e.x,e.y-r*.7,r*.12,0,7); ctx.fill();
    ctx.fillStyle=_C(e,"#e8a0a8"); ctx.beginPath(); ctx.ellipse(e.x+f*r*.45,e.y-r*.05,r*.18,r*.12,0,0,7); ctx.fill();
    [-1,1].forEach(s=>{ ctx.fillStyle=_C(e,"#e8c8b8"); ctx.save(); ctx.translate(e.x+s*r*.7,e.y+r*.35); ctx.rotate(s*(.4+dig*.3)); for(let k=0;k<3;k++){ ctx.beginPath(); ctx.ellipse((k-1)*r*.1,r*.15,r*.05,r*.18,0,0,7); ctx.fill() } ctx.restore() });
    _face(ctx,e,t,px,py,e.y-r*.18,r*.25,r*.12,{mouth:"none"}) },
  wraith(ctx,e,t,px,py){ const r=e.r, w=Math.sin(t*4+e.wob);
    ctx.save(); ctx.globalCompositeOperation="lighter"; const gw=ctx.createRadialGradient(e.x,e.y-r*.2,0,e.x,e.y-r*.2,r*1.5); gw.addColorStop(0,"rgba(140,160,255,.35)"); gw.addColorStop(1,"rgba(120,140,255,0)"); ctx.fillStyle=gw; ctx.beginPath(); ctx.arc(e.x,e.y-r*.2,r*1.5,0,7); ctx.fill(); ctx.restore();
    ctx.save(); ctx.globalAlpha=.95;
    const g=ctx.createLinearGradient(0,e.y-r,0,e.y+r*1.3); g.addColorStop(0,_C(e,"#6a7ab8")); g.addColorStop(1,"rgba(40,40,90,0)"); ctx.fillStyle=g;
    ctx.beginPath(); ctx.moveTo(e.x-r*.75,e.y); ctx.bezierCurveTo(e.x-r*.8,e.y-r*1.2,e.x+r*.8,e.y-r*1.2,e.x+r*.75,e.y); for(let k=0;k<=6;k++){ const x=e.x+r*.75-k*r*.25, y=e.y+r*(1.0+((k%2)?.25:0))+Math.sin(t*5+k+e.wob)*r*.1; ctx.lineTo(x,y) } ctx.closePath(); ctx.fill(); ctx.restore();
    [-1,1].forEach(s=>{ ctx.strokeStyle=_C(e,"rgba(150,170,230,.8)"); ctx.lineWidth=r*.12; ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(e.x+s*r*.6,e.y-r*.1); ctx.quadraticCurveTo(e.x+s*r*1.0,e.y+r*.1+w*r*.1,e.x+s*r*1.1,e.y-r*.2); ctx.stroke(); ctx.lineCap="butt" });
    ctx.fillStyle=_C(e,"#2a2a5a"); ctx.beginPath(); ctx.ellipse(e.x,e.y-r*.35,r*.55,r*.5,0,Math.PI,0); ctx.fill();
    _face(ctx,e,t,px,py,e.y-r*.3,r*.22,r*.16,{}) },
  skeleton(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, sw=Math.sin(t*8+e.wob);
    ctx.strokeStyle=_C(e,"#e8e0cc"); ctx.lineWidth=r*.12; ctx.lineCap="round"; [-1,1].forEach(s=>{ ctx.beginPath(); ctx.moveTo(e.x+s*r*.2,e.y+r*.4); ctx.lineTo(e.x+s*r*.28,e.y+r*.95+s*sw*r*.05); ctx.stroke() });
    for(let i=0;i<4;i++){ ctx.beginPath(); ctx.moveTo(e.x-r*(.4-i*.05),e.y-r*.15+i*r*.14); ctx.quadraticCurveTo(e.x,e.y-r*.05+i*r*.14,e.x+r*(.4-i*.05),e.y-r*.15+i*r*.14); ctx.stroke() }
    ctx.lineWidth=r*.1; ctx.beginPath(); ctx.moveTo(e.x,e.y-r*.35); ctx.lineTo(e.x,e.y+r*.45); ctx.stroke(); ctx.lineCap="butt";
    ctx.save(); ctx.translate(e.x+f*r*.6,e.y); ctx.rotate(f*(.4+sw*.2)); ctx.fillStyle=_C(e,"#8a8a9a"); ctx.fillRect(-2,-r*1.2,4,r*1.1); ctx.fillStyle=_C(e,"#5a3a1a"); ctx.fillRect(-r*.18,-r*.12,r*.36,4); ctx.restore();
    ctx.fillStyle=_G(ctx,e,e.x,e.y-r*.7,r*.5,r*.45,"#f2ead6"); ctx.beginPath(); ctx.ellipse(e.x,e.y-r*.72,r*.48,r*.44,0,0,7); ctx.fill(); _ol(ctx,1.5);
    ctx.fillStyle=_C(e,"#e8e0cc"); ctx.fillRect(e.x-r*.28,e.y-r*.42,r*.56,r*.16); ctx.fillStyle="#1a0a0a"; for(let k=0;k<4;k++) ctx.fillRect(e.x-r*.22+k*r*.14,e.y-r*.4,2,r*.12);
    _face(ctx,e,t,px,py,e.y-r*.75,r*.2,r*.15,{mouth:"none"}) },
  lavaslime(ctx,e,t,px,py){ const r=e.r, sq=Math.sin(t*6+e.wob)*.08;
    _blob(ctx,e,e.x,e.y+r*.1,r*(1+sq),r*(.85-sq),"#3a1410");
    ctx.save(); ctx.beginPath(); ctx.ellipse(e.x,e.y+r*.1,r*(1+sq),r*(.85-sq),0,0,7); ctx.clip(); ctx.globalCompositeOperation="lighter";
    for(let i=0;i<5;i++){ const ph=t*.8+i*1.3+e.wob; ctx.strokeStyle=`rgba(255,${120+i*20},40,.8)`; ctx.lineWidth=r*.08; ctx.beginPath(); ctx.moveTo(e.x-r+Math.sin(ph)*r*.2,e.y-r*.4+i*r*.28); ctx.quadraticCurveTo(e.x,e.y-r*.3+i*r*.28+Math.sin(ph*1.3)*r*.2,e.x+r,e.y-r*.4+i*r*.28); ctx.stroke() } ctx.restore();
    for(let i=0;i<4;i++){ const ph=(t*.9+i/4+e.wob)%1; ctx.fillStyle=`rgba(255,${200-ph*120|0},60,${1-ph})`; ctx.beginPath(); ctx.arc(e.x+(i-1.5)*r*.4,e.y-r*.7-ph*r*.8,r*.08*(1-ph)+1,0,7); ctx.fill() }
    _face(ctx,e,t,px,py,e.y-r*.05,r*.32,r*.2,{}) },
  jelly(ctx,e,t,px,py){ const r=e.r, p=Math.sin(t*4+e.wob);
    ctx.save(); ctx.globalCompositeOperation="lighter"; for(let i=0;i<6;i++){ const x=e.x+(i-2.5)*r*.25; ctx.strokeStyle=`rgba(140,230,255,${.6})`; ctx.lineWidth=1.8; ctx.beginPath(); ctx.moveTo(x,e.y+r*.2); ctx.bezierCurveTo(x+Math.sin(t*5+i)*r*.2,e.y+r*.7,x-Math.sin(t*4+i)*r*.2,e.y+r*1.0,x+Math.sin(t*3+i)*r*.15,e.y+r*(1.3+p*.1)); ctx.stroke() }
    if(Math.sin(t*9+e.wob*3)>.7){ ctx.strokeStyle="#eaffff"; ctx.lineWidth=1.6; ctx.beginPath(); let x=e.x-r*.3, y=e.y+r*.4; ctx.moveTo(x,y); for(let k=0;k<4;k++){ x+=(k%2?1:-1)*r*.2; y+=r*.22; ctx.lineTo(x,y) } ctx.stroke() } ctx.restore();
    ctx.save(); ctx.globalAlpha=.88; const g=ctx.createRadialGradient(e.x-r*.2,e.y-r*.4,r*.1,e.x,e.y,r); g.addColorStop(0,_C(e,"#eaffff")); g.addColorStop(.5,_C(e,"#7ad8ff")); g.addColorStop(1,_C(e,"#2a5aa8")); ctx.fillStyle=g;
    ctx.beginPath(); ctx.moveTo(e.x-r*(.9+p*.05),e.y+r*.25); ctx.bezierCurveTo(e.x-r*(.95+p*.05),e.y-r*.9,e.x+r*(.95+p*.05),e.y-r*.9,e.x+r*(.9+p*.05),e.y+r*.25); for(let k=0;k<=5;k++){ ctx.lineTo(e.x+r*(.9-k*.36),e.y+r*(.25+(k%2?.12:0))) } ctx.closePath(); ctx.fill(); ctx.restore(); _ol(ctx,1.4);
    _face(ctx,e,t,px,py,e.y-r*.2,r*.25,r*.16,{mouth:"none"}) },
  orb(ctx,e,t,px,py){ const r=e.r, a0=t*2+e.wob;
    ctx.strokeStyle=_C(e,"#e8c25a"); ctx.lineWidth=2.2; for(let k=0;k<2;k++){ ctx.beginPath(); ctx.ellipse(e.x,e.y,r*1.15,r*.4,a0*(k?-1:1)+k,0,7); ctx.stroke() }
    ctx.fillStyle=_C(e,"#fff6d8"); for(let i=0;i<4;i++){ const a=a0*1.5+i*1.57; ctx.beginPath(); ctx.arc(e.x+Math.cos(a)*r*1.15,e.y+Math.sin(a)*r*.4,r*.08,0,7); ctx.fill() }
    _blob(ctx,e,e.x,e.y,r*.72,r*.72,"#e8eef8");
    ctx.strokeStyle=_C(e,"#c8a040"); ctx.lineWidth=2; ctx.beginPath(); ctx.arc(e.x,e.y,r*.72,0,7); ctx.stroke();
    _face(ctx,e,t,px,py,e.y,0,r*.3,{mouth:"none"}) },
});
Object.assign(FLYERS,{moth:1,wraith:1,jelly:1,orb:1});
/* ===== 8 빙궁 · 9 신전 · 10 별의 왕좌 몬스터 (보스와 닮은 부하들) ===== */
Object.assign(LOOKS, {
  frostwolf(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, run=Math.sin(t*14+e.wob)*r*.12;
    ctx.fillStyle=_C(e,"#a8c8e0"); [[-.45,run],[-.15,-run],[.2,run],[.45,-run]].forEach(([a,s])=>{ ctx.fillRect(e.x+a*r-r*.07,e.y+r*.3+s,r*.14,r*.5) });
    ctx.fillStyle=_G(ctx,e,e.x-f*r*.9,e.y-r*.1,r*.5,r*.25,"#d8ecff"); ctx.beginPath(); ctx.moveTo(e.x-f*r*.5,e.y); ctx.quadraticCurveTo(e.x-f*r*1.2,e.y-r*.2,e.x-f*r*1.3,e.y-r*.55); ctx.quadraticCurveTo(e.x-f*r*.95,e.y-r*.15,e.x-f*r*.5,e.y-r*.2); ctx.fill(); _ol(ctx,1.1);
    _blob(ctx,e,e.x,e.y+r*.05,r*.7,r*.42,"#cfe6fa");
    for(let k=0;k<6;k++){ const x=e.x-f*r*.45+f*k*r*.17; ctx.fillStyle=_C(e,k%2?"#9ae0ff":"#e8f8ff"); ctx.beginPath(); ctx.moveTo(x-r*.08,e.y-r*.25); ctx.lineTo(x+f*r*.04,e.y-r*(.62+(k%2)*.15)); ctx.lineTo(x+r*.08,e.y-r*.25); ctx.fill(); _ol(ctx,.8) }
    _blob(ctx,e,e.x+f*r*.6,e.y-r*.3,r*.38,r*.3,"#e0f0ff");
    ctx.fillStyle=_C(e,"#cfe6fa"); ctx.beginPath(); ctx.moveTo(e.x+f*r*.8,e.y-r*.32); ctx.lineTo(e.x+f*r*1.1,e.y-r*.18); ctx.lineTo(e.x+f*r*.82,e.y-r*.1); ctx.fill(); _ol(ctx,1);
    [-1,1].forEach(s=>{ ctx.fillStyle=_C(e,"#cfe6fa"); ctx.beginPath(); ctx.moveTo(e.x+f*r*.55+s*r*.14,e.y-r*.5); ctx.lineTo(e.x+f*r*.55+s*r*.2,e.y-r*.88); ctx.lineTo(e.x+f*r*.55+s*r*.02,e.y-r*.58); ctx.fill(); _ol(ctx,1) });
    _face(ctx,e,t,px,py,e.y-r*.38,r*.13,r*.1,{shift:f*r*.62,mouth:"none",style:"beady"}) },
  icesprite(ctx,e,t,px,py){ const r=e.r, b=Math.sin(t*3+e.wob)*r*.1;
    ctx.save(); ctx.globalCompositeOperation="lighter"; const g=ctx.createRadialGradient(e.x,e.y+b,0,e.x,e.y+b,r*1.5); g.addColorStop(0,"rgba(150,230,255,.5)"); g.addColorStop(1,"rgba(150,230,255,0)"); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(e.x,e.y+b,r*1.5,0,7); ctx.fill(); ctx.restore();
    for(let i=0;i<5;i++){ const a=t*1.5+i*1.257, x=e.x+Math.cos(a)*r*1.05, y=e.y+b+Math.sin(a)*r*.5; ctx.fillStyle=_C(e,"#e8f8ff"); ctx.beginPath(); ctx.moveTo(x,y-r*.18); ctx.lineTo(x+r*.08,y); ctx.lineTo(x,y+r*.18); ctx.lineTo(x-r*.08,y); ctx.closePath(); ctx.fill() }
    const pts=[[0,-1.0],[.55,-.35],[.4,.7],[0,.95],[-.4,.7],[-.55,-.35]]; const g2=ctx.createLinearGradient(e.x-r*.5,e.y-r,e.x+r*.5,e.y+r); g2.addColorStop(0,_C(e,"#ffffff")); g2.addColorStop(.5,_C(e,"#9ad8ff")); g2.addColorStop(1,_C(e,"#3a7ac0"));
    ctx.fillStyle=g2; ctx.beginPath(); pts.forEach(([a,c],k)=>{ const x=e.x+a*r*.75, y=e.y+b+c*r*.75; k?ctx.lineTo(x,y):ctx.moveTo(x,y) }); ctx.closePath(); ctx.fill(); _ol(ctx,1.4);
    ctx.strokeStyle="rgba(255,255,255,.8)"; ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(e.x,e.y+b-r*.75); ctx.lineTo(e.x,e.y+b+r*.7); ctx.stroke();
    _face(ctx,e,t,px,py,e.y+b-r*.1,r*.2,r*.12,{mouth:"none",style:"hollow"}) },
  yetiling(ctx,e,t,px,py){ const r=e.r, sw=Math.sin(t*6+e.wob);
    [-1,1].forEach(s=>{ ctx.fillStyle=_G(ctx,e,e.x+s*r*.8,e.y+r*.2,r*.32,r*.32,"#9ad8ff"); ctx.beginPath(); ctx.arc(e.x+s*r*.8,e.y+r*.25+s*sw*r*.06,r*.3,0,7); ctx.fill(); _ol(ctx,1.1) });
    _blob(ctx,e,e.x,e.y+r*.1,r*.75,r*.8,"#e6eef8");
    ctx.save(); ctx.beginPath(); ctx.ellipse(e.x,e.y+r*.1,r*.75,r*.8,0,0,7); ctx.clip(); ctx.strokeStyle="rgba(150,170,200,.5)"; ctx.lineWidth=1.2; for(let k=0;k<14;k++){ const x=e.x+(mhash(k,7,1)-.5)*r*1.4, y=e.y+(mhash(k,7,2)-.5)*r*1.4; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+r*.05,y+r*.15); ctx.stroke() } ctx.restore();
    ctx.fillStyle=_C(e,"#7a9ac0"); ctx.beginPath(); ctx.ellipse(e.x,e.y-r*.25,r*.42,r*.3,0,0,7); ctx.fill();
    _face(ctx,e,t,px,py,e.y-r*.3,r*.18,r*.12,{style:"beady"});
    ctx.fillStyle="#3a0a14"; ctx.beginPath(); ctx.ellipse(e.x,e.y-r*.08,r*.14,r*.07,0,0,7); ctx.fill(); ctx.fillStyle="#fff"; [-1,1].forEach(s=>{ ctx.beginPath(); ctx.moveTo(e.x+s*r*.1,e.y-r*.12); ctx.lineTo(e.x+s*r*.06,e.y-r*.02); ctx.lineTo(e.x+s*r*.02,e.y-r*.12); ctx.fill() }) },
  lioncub(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, run=Math.sin(t*12+e.wob)*r*.1;
    ctx.fillStyle=_C(e,"#a8a090"); [[-.4,run],[.4,-run]].forEach(([a,s])=>ctx.fillRect(e.x+a*r-r*.09,e.y+r*.35+s,r*.18,r*.45));
    ctx.strokeStyle=_C(e,"#a8a090"); ctx.lineWidth=r*.1; ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(e.x-f*r*.6,e.y); ctx.quadraticCurveTo(e.x-f*r*1.1,e.y-r*.2,e.x-f*r*1.0,e.y-r*.6); ctx.stroke(); ctx.lineCap="butt"; ctx.fillStyle=_C(e,"#e2a63a"); ctx.beginPath(); ctx.arc(e.x-f*r*1.0,e.y-r*.62,r*.13,0,7); ctx.fill();
    _blob(ctx,e,e.x,e.y+r*.1,r*.68,r*.45,"#c8c0b0");
    for(let k=0;k<10;k++){ const a=k*.63; ctx.fillStyle=_C(e,k%2?"#e2a63a":"#f2c25a"); ctx.beginPath(); ctx.arc(e.x+f*r*.45+Math.cos(a)*r*.42,e.y-r*.32+Math.sin(a)*r*.4,r*.17,0,7); ctx.fill() }
    _blob(ctx,e,e.x+f*r*.45,e.y-r*.32,r*.32,r*.3,"#dcd6c8");
    ctx.fillStyle="#3ad8ff"; [-1,1].forEach(s=>ctx.fillRect(e.x+f*r*.45+s*r*.12-r*.04,e.y-r*.4,r*.08,r*.05));
    ctx.fillStyle="#5a4a3a"; ctx.beginPath(); ctx.ellipse(e.x+f*r*.55,e.y-r*.22,r*.07,r*.05,0,0,7); ctx.fill() },
  drumling(ctx,e,t,px,py){ const r=e.r, b=Math.sin(t*4+e.wob)*r*.12, sp=t*3+e.wob;
    ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.strokeStyle="rgba(190,150,255,.8)"; ctx.lineWidth=1.6; if(Math.sin(t*7+e.wob)>.5){ ctx.beginPath(); let x=e.x-r*1.1, y=e.y+b; ctx.moveTo(x,y); for(let k=0;k<5;k++){ x+=r*.45; y+=(k%2?-1:1)*r*.25; ctx.lineTo(x,y) } ctx.stroke() } ctx.restore();
    ctx.fillStyle=_C(e,"#8a3a1a"); ctx.beginPath(); ctx.ellipse(e.x,e.y+b+r*.2,r*.85,r*.35,0,0,Math.PI); ctx.lineTo(e.x-r*.85,e.y+b-r*.15); ctx.fill(); _ol(ctx,1.2);
    ctx.fillStyle=_C(e,"#c8a040"); for(let k=0;k<6;k++){ const x=e.x-r*.7+k*r*.28; ctx.fillRect(x-1,e.y+b-r*.12,2,r*.42) }
    ctx.fillStyle=_G(ctx,e,e.x,e.y+b-r*.15,r*.85,r*.35,"#f6e2b8"); ctx.beginPath(); ctx.ellipse(e.x,e.y+b-r*.15,r*.85,r*.35,0,0,7); ctx.fill(); _ol(ctx,1.4);
    ctx.fillStyle=_C(e,"#8a3a1a"); for(let k=0;k<3;k++){ const a=sp+k*2.094; ctx.beginPath(); ctx.arc(e.x+Math.cos(a)*r*.25,e.y+b-r*.15+Math.sin(a)*r*.1,r*.18,a,a+Math.PI); ctx.fill() }
    _face(ctx,e,t,px,py,e.y+b+r*.15,r*.32,r*.11,{mouth:"none",style:"beady"}) },
  colt(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, run=Math.sin(t*16+e.wob)*r*.14;
    ctx.fillStyle=_C(e,"#8a92a8"); [[-.45,run],[-.15,-run],[.2,run],[.45,-run]].forEach(([a,s])=>{ ctx.fillRect(e.x+a*r-r*.05,e.y+r*.25+s,r*.1,r*.6); ctx.fillStyle=_C(e,"#d8a63a"); ctx.fillRect(e.x+a*r-r*.06,e.y+r*.78+s,r*.12,r*.08); ctx.fillStyle=_C(e,"#8a92a8") });
    ctx.save(); ctx.globalCompositeOperation="lighter"; for(let k=0;k<4;k++){ ctx.strokeStyle=`rgba(${k%2?"120,200,255":"255,220,120"},.7)`; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(e.x-f*r*.6,e.y-r*.1+k*r*.06); ctx.quadraticCurveTo(e.x-f*r*1.1,e.y-r*.4+Math.sin(t*6+k)*r*.1,e.x-f*r*1.35,e.y-r*.2+k*r*.08); ctx.stroke() } ctx.restore();
    _blob(ctx,e,e.x,e.y,r*.7,r*.36,"#c8d0e2");
    ctx.save(); ctx.beginPath(); ctx.ellipse(e.x,e.y,r*.7,r*.36,0,0,7); ctx.clip(); ctx.strokeStyle="rgba(90,100,130,.4)"; ctx.lineWidth=1; for(let k=0;k<12;k++){ ctx.beginPath(); ctx.arc(e.x-r*.6+(k%6)*r*.24,e.y-r*.1+Math.floor(k/6)*r*.2,r*.1,0,Math.PI); ctx.stroke() } ctx.restore();
    ctx.fillStyle=_G(ctx,e,e.x+f*r*.65,e.y-r*.45,r*.28,r*.22,"#d8deec"); ctx.beginPath(); ctx.moveTo(e.x+f*r*.35,e.y-r*.1); ctx.lineTo(e.x+f*r*.55,e.y-r*.6); ctx.lineTo(e.x+f*r*.95,e.y-r*.45); ctx.lineTo(e.x+f*r*.85,e.y-r*.3); ctx.lineTo(e.x+f*r*.6,e.y-r*.15); ctx.closePath(); ctx.fill(); _ol(ctx,1.1);
    ctx.strokeStyle=_C(e,"#3a2a14"); ctx.lineWidth=2; [0,1].forEach(k=>{ ctx.beginPath(); ctx.moveTo(e.x+f*r*(.55+k*.08),e.y-r*.58); ctx.quadraticCurveTo(e.x+f*r*(.4+k*.1),e.y-r*.95,e.x+f*r*(.2+k*.1),e.y-r*1.0); ctx.stroke() });
    _face(ctx,e,t,px,py,e.y-r*.48,r*.08,r*.08,{shift:f*r*.72,mouth:"none",style:"beady"}) },
  voidling(ctx,e,t,px,py){ const r=e.r, f=px<e.x?-1:1, run=Math.sin(t*14+e.wob)*r*.1, fl=Math.sin(t*8+e.wob);
    [-1,1].forEach(s=>{ ctx.save(); ctx.globalCompositeOperation="lighter"; const g=ctx.createLinearGradient(e.x,e.y,e.x+s*r*.4,e.y-r*1.2); g.addColorStop(0,"rgba(255,180,60,.9)"); g.addColorStop(1,"rgba(255,120,40,0)"); ctx.fillStyle=g;
      ctx.beginPath(); ctx.moveTo(e.x+s*r*.2,e.y-r*.2); ctx.quadraticCurveTo(e.x+s*r*.9,e.y-r*.7-fl*r*.1,e.x+s*r*.6,e.y-r*1.3); ctx.quadraticCurveTo(e.x+s*r*.45,e.y-r*.7,e.x+s*r*.1,e.y-r*.35); ctx.fill(); ctx.restore() });
    ctx.fillStyle=_C(e,"#140c2a"); [[-.4,run],[.4,-run]].forEach(([a,s])=>ctx.fillRect(e.x+a*r-r*.08,e.y+r*.3+s,r*.16,r*.45));
    _blob(ctx,e,e.x,e.y,r*.72,r*.48,"#24164a");
    ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.strokeStyle="rgba(190,120,255,.85)"; ctx.lineWidth=1.4; ctx.beginPath(); ctx.moveTo(e.x-r*.5,e.y); ctx.lineTo(e.x-r*.15,e.y-r*.12); ctx.lineTo(e.x+r*.1,e.y+r*.08); ctx.lineTo(e.x+r*.45,e.y-r*.05); ctx.stroke(); ctx.restore();
    _blob(ctx,e,e.x+f*r*.5,e.y-r*.32,r*.32,r*.28,"#1a1038");
    ctx.fillStyle=_C(e,"#d8a63a"); [-1,1].forEach(s=>{ ctx.beginPath(); ctx.moveTo(e.x+f*r*.5+s*r*.12,e.y-r*.52); ctx.lineTo(e.x+f*r*.5+s*r*.25,e.y-r*.9); ctx.lineTo(e.x+f*r*.5+s*r*.02,e.y-r*.58); ctx.fill() });
    _face(ctx,e,t,px,py,e.y-r*.36,r*.12,r*.1,{shift:f*r*.5,mouth:"none"}) },
  nebula(ctx,e,t,px,py){ const r=e.r, w=Math.sin(t*3+e.wob);
    ctx.save(); ctx.globalCompositeOperation="lighter"; for(let k=0;k<3;k++){ const a=t*(1+k*.4)+k*2; const g=ctx.createRadialGradient(e.x+Math.cos(a)*r*.3,e.y+Math.sin(a)*r*.3,0,e.x,e.y,r*1.3); g.addColorStop(0,`rgba(${k===1?"255,110,200":"140,90,255"},.45)`); g.addColorStop(1,"rgba(80,40,200,0)"); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(e.x,e.y,r*1.3,0,7); ctx.fill() }
    for(let i=0;i<8;i++){ const a=t*.8+i*.785, R=r*(.4+.5*((i*37)%10)/10); ctx.fillStyle="rgba(255,250,230,.9)"; ctx.fillRect(e.x+Math.cos(a)*R-1,e.y+Math.sin(a)*R*.7-1,2,2) } ctx.restore();
    ctx.save(); ctx.globalAlpha=.9; const g2=ctx.createLinearGradient(0,e.y-r,0,e.y+r*1.2); g2.addColorStop(0,_C(e,"#4a2aa0")); g2.addColorStop(1,"rgba(40,20,120,0)"); ctx.fillStyle=g2;
    ctx.beginPath(); ctx.moveTo(e.x-r*.6,e.y); ctx.bezierCurveTo(e.x-r*.7,e.y-r*1.0,e.x+r*.7,e.y-r*1.0,e.x+r*.6,e.y); for(let k=0;k<=4;k++){ ctx.lineTo(e.x+r*.6-k*r*.3,e.y+r*(.9+(k%2?.2:0))+Math.sin(t*5+k)*r*.08) } ctx.closePath(); ctx.fill(); ctx.restore();
    _face(ctx,e,t,px,py,e.y-r*.3,r*.2,r*.14,{mouth:"none",style:"hollow"}) },
  comet(ctx,e,t,px,py){ const r=e.r, a=Math.atan2(py-e.y,px-e.x);
    ctx.save(); ctx.globalCompositeOperation="lighter"; for(let k=0;k<3;k++){ const g=ctx.createLinearGradient(e.x,e.y,e.x-Math.cos(a)*r*3,e.y-Math.sin(a)*r*3); g.addColorStop(0,`rgba(${k===0?"255,240,200":"170,140,255"},.7)`); g.addColorStop(1,"rgba(120,90,255,0)"); ctx.strokeStyle=g; ctx.lineWidth=r*(.9-k*.25); ctx.lineCap="round";
      ctx.beginPath(); ctx.moveTo(e.x,e.y); ctx.lineTo(e.x-Math.cos(a+(k-1)*.15)*r*3,e.y-Math.sin(a+(k-1)*.15)*r*3); ctx.stroke() } ctx.restore();
    const g=ctx.createRadialGradient(e.x-r*.2,e.y-r*.2,0,e.x,e.y,r*.6); g.addColorStop(0,_C(e,"#ffffff")); g.addColorStop(.5,_C(e,"#c8b0ff")); g.addColorStop(1,_C(e,"#4a2aa0")); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(e.x,e.y,r*.6,0,7); ctx.fill(); _ol(ctx,1.2);
    _face(ctx,e,t,px,py,e.y-r*.05,r*.18,r*.1,{mouth:"none",style:"beady"}) },
});
Object.assign(FLYERS,{icesprite:1,drumling:1,nebula:1,comet:1});
/* ===== 보스 스킬표: 맵이 높을수록 · 센 보스일수록 스킬이 많고 강해요 =====
   [기술 종류, 이름] · 최종 보스는 체력 50% 아래에서 「필살기(ult)」를 한 번 써요 */
const BOSS_SKILLS = {
  1:[ {k:[["stomp","껍데기 굴리기"],["summon","새끼 달팽이 부르기"]]},
      {k:[["dash","독침 돌진"],["orbs","꽃가루 구슬"],["summon","벌떼 부르기"]]},
      {k:[["spore","독 포자"],["stomp","가시덩굴 내려찍기"],["ring","독액 분출"],["summon","슬라임 분열"]]},
      {k:[["ring","꽃잎 폭풍"],["stomp","왕의 짓누르기"],["spore","꽃가루 독"],["orbs","꽃의 구슬"],["summon","왕실 슬라임"]], ult:["nova","꽃왕관의 대축제"]} ],
  2:[ {k:[["dash","도토리 창 돌격"],["summon","도토리 병사 부르기"]]},
      {k:[["dash","멧돼지 돌진"],["stomp","땅 박치기"],["rock","돌 차올리기"]]},
      {k:[["spore","포자 구름"],["orbs","빛나는 포자"],["meteor","버섯 떨구기"],["summon","버섯 부르기"]]},
      {k:[["meteor","뿌리 솟구치기"],["ring","잎사귀 폭풍"],["orbs","씨앗 폭탄"],["laser","덩굴 채찍"],["summon","숲의 부름"]], ult:["spiral","천년 숲의 분노"]} ],
  3:[ {k:[["orbs","저주 연기"],["summon","깨진 항아리 부르기"]]},
      {k:[["dash","모래 돌진"],["fire3","독침 연사"],["stomp","모래 폭풍"]]},
      {k:[["rock","유적 돌 던지기"],["stomp","대지 울림"],["meteor","유적 낙석"],["ring","보랏빛 균열"]]},
      {k:[["fire5","불꽃 갈기"],["dash","신수 돌진"],["meteor","하늘불 낙하"],["laser","해태의 눈빛"],["ring","수호의 포효"]], ult:["nova","해태의 심판"]} ],
  4:[ {k:[["orbs","수정 조각"],["ring","수정 파편"],["summon","수정 요정 부르기"]]},
      {k:[["dash","거미 도약"],["spore","독거미줄"],["orbs","독 알"],["summon","새끼 거미"]]},
      {k:[["dash","어둠 활강"],["laser","초음파"],["orbs","박쥐 떼 구슬"],["ring","어둠의 날갯짓"],["summon","박쥐 떼"]]},
      {k:[["laser","여의주 광선"],["ring","똬리 휘감기"],["meteor","수정 가시"],["dash","꼬리 휘두르기"],["spiral","수정 소용돌이"],["orbs","수정 구슬"]], ult:["cross","여의주 대폭발"]} ],
  5:[ {k:[["dash","불꽃 돌진"],["fire3","불꽃 숨결"],["summon","사냥개 부르기"]]},
      {k:[["dash","흑검 돌격"],["laser","흑검 베기"],["stomp","대검 내려찍기"],["ring","검기 폭풍"]]},
      {k:[["fire5","화염 폭풍"],["meteor","화염 낙하"],["orbs","도깨비 불꽃"],["spiral","불꽃 회오리"],["summon","임프 부르기"]]},
      {k:[["fire5","지옥불"],["laser","파멸의 광선"],["meteor","운석 비"],["spiral","불꽃 날개"],["ring","마왕의 포효"],["orbs","지옥 구슬"],["summon","마왕군 소환"]], ult:["nova","진홍의 종말"]} ],
  6:[ {k:[["orbs","바람 구슬"],["ring","회오리 깃털"],["dash","돌풍 비행"]]},
      {k:[["dash","폭풍 돌진"],["stomp","천둥 짓밟기"],["meteor","낙뢰"],["ring","먹구름 폭발"]]},
      {k:[["laser","폭풍의 눈빛"],["spiral","눈의 소용돌이"],["meteor","번개 비"],["orbs","폭풍 구슬"],["ring","회오리 깃털"]]},
      {k:[["dash","천풍 강하"],["laser","뇌광 깃털"],["spiral","대회오리"],["meteor","천둥 낙뢰"],["cross","번개 십자"],["orbs","폭풍 구슬"],["ring","폭풍의 날개"]], ult:["storm","천풍 대폭풍"]} ],
  7:[ {k:[["laser","가면의 눈빛"],["orbs","빛의 머리칼"],["ring","빛 흩날리기"]]},
      {k:[["dash","빛날개 강하"],["fire5","빛의 발톱"],["laser","날개 광선"],["meteor","빛 낙하"]]},
      {k:[["stomp","석상 내려찍기"],["ring","빛의 충격파"],["meteor","성벽 붕괴"],["spiral","황금 소용돌이"],["dash","거인 돌진"]]},
      {k:[["laser","빛의 검"],["cross","성스러운 십자"],["fire5","빛의 창"],["meteor","천상 포격"],["spiral","수호 결계"],["dash","수문장 돌격"],["ring","빛의 머리칼"]], ult:["nova","수문장의 심판"]} ],
  8:[ {k:[["dash","얼음 송곳니"],["ring","서리 포효"],["summon","늑대 부르기"]]},
      {k:[["stomp","얼음 주먹"],["rock","눈덩이 던지기"],["meteor","고드름 낙하"],["dash","설인 돌진"]]},
      {k:[["spiral","얼음 결정 소용돌이"],["meteor","빙결 낙하"],["laser","빙결 광선"],["orbs","얼음 구슬"],["ring","눈보라"]]},
      {k:[["laser","냉기 브레스"],["cross","여의주 냉광"],["spiral","오로라 소용돌이"],["meteor","고드름 폭우"],["dash","승천의 돌진"],["orbs","얼음 여의주"],["ring","눈보라 날개"]], ult:["storm","천공 대빙결"]} ],
  9:[ {k:[["stomp","석사자 포효"],["ring","금빛 갈기"],["rock","석상 조각"],["summon","새끼 사자 부르기"]]},
      {k:[["orbs","번개 북 구슬"],["meteor","북소리 낙뢰"],["spiral","북 고리 회전"],["dash","구름 타기"]]},
      {k:[["dash","천둥 질주"],["laser","기린의 뿔빛"],["meteor","번개 발굽"],["spiral","번개 갈기"],["ring","천둥 울림"]]},
      {k:[["meteor","번개 망치"],["cross","뇌신의 십자 번개"],["laser","천둥 광선"],["spiral","북 고리 폭풍"],["stomp","망치 내려치기"],["ring","천둥 북"],["orbs","뇌전 구슬"]], ult:["storm","신의 심판"]} ],
  10:[ {k:[["dash","공허 할퀴기"],["fire5","별불꽃 날개"],["ring","공허 포효"],["summon","별 부스러기"]]},
      {k:[["dash","성운 돌진"],["spiral","별 도끼 휘두르기"],["orbs","별 구슬"],["meteor","성운 낙하"],["laser","도끼 광선"]]},
      {k:[["spiral","행성 공전"],["meteor","별똥별 낙하"],["orbs","중력 구슬"],["laser","천체 광선"],["cross","별자리 십자"],["ring","성좌 폭발"]]},
      {k:[["pull","블랙홀"],["laser","종언의 낫"],["cross","종언의 십자"],["spiral","은하 소용돌이"],["meteor","별 비"],["nova","별의 소멸"],["orbs","공허 구슬"],["summon","지난 보스 불러내기"]], ult:["storm","우주의 종언"]} ],
};
/* 스킬 세기: 맵 높이 × 보스 단계 */
const bossPow = (m,tier)=>({ n:1+(m-1)*.09+tier*.12, cd:Math.max(.55,1.12-(m-1)*.04-tier*.07), sp:1+(m-1)*.035+tier*.04 });
/* ===== 보스 뼈대(리그): 그림을 날개·무기·다리·꼬리·머리 조각으로 나눠 따로 움직여요 =====
   좌표는 그림을 가로세로 10칸으로 나눈 값 · piv: 돌아가는 축 · side: L/R(왼쪽·오른쪽) · z:-1 몸 뒤, 1 몸 앞
   move: walk(두 발) · heavy(무거운 걸음) · quad(네 발) · gallop(말 달리기) · fly(날갯짓) · hover(둥실) · slither(뱀) · squash(말랑) · crawl(기어감) */
const R_ = (x0,y0,x1,y1)=>[[x0,y0],[x1,y0],[x1,y1],[x0,y1]];
const RIGS = {
  st1_0:{move:"crawl", parts:[{t:"head",poly:R_(7.3,1.6,10,7),piv:[7.6,6.4]}]},
  st1_1:{move:"fly", parts:[{t:"wing",side:"L",z:-1,poly:[[0,0],[3.9,1.4],[3.9,4.6],[0.4,4.6]],piv:[3.9,3.3]},{t:"wing",side:"R",z:-1,poly:[[6.1,0],[10,0],[10,4.2],[5.9,4.3],[5.9,2]],piv:[5.9,3.3]},{t:"tail",poly:R_(3.2,5.6,6.9,10),piv:[5,5.6],thrust:1}]},
  st1_2:{move:"heavy", parts:[{t:"arm",side:"L",poly:R_(0.3,3.3,2.7,8.2),piv:[2.4,3.7]},{t:"arm",side:"R",poly:R_(7.3,3.3,9.8,8.2),piv:[7.6,3.7]}]},
  st1_3:{move:"squash", parts:[{t:"float",poly:R_(1.2,0,8.8,3.2),piv:[5,3.2]}]},
  st2_0:{move:"walk", parts:[{t:"spear",poly:R_(7.2,0,10,10),piv:[8.3,6.1]},{t:"arm",side:"L",poly:R_(0,5,4,9.6),piv:[3.4,5.6],small:1}]},
  st2_1:{move:"gallop", parts:[{t:"leg",z:-1,poly:R_(1,7.2,4.6,10),piv:[3,7.2],ph:.5},{t:"leg",poly:R_(5.6,7.4,8.4,10),piv:[6.8,7.4]},{t:"tail",poly:R_(0,2.4,2.2,6.2),piv:[2,5]},{t:"head",poly:R_(7.2,2.4,10,7.4),piv:[7.2,5.4]}]},
  st2_2:{move:"waddle", parts:[{t:"arm",side:"L",poly:R_(1.4,5.2,3.7,7.8),piv:[3.5,5.6]},{t:"arm",side:"R",poly:R_(6.3,5.2,8.7,7.8),piv:[6.5,5.6]},{t:"cap",poly:R_(0.8,0,9.2,4.7),piv:[5,4.7]}]},
  st2_3:{move:"heavy",noLeg:1, parts:[{t:"arm",side:"L",poly:R_(0.6,5,4,9.2),piv:[3.8,5.3]},{t:"arm",side:"R",poly:R_(7,4.6,10,9.4),piv:[7.2,5.2]},{t:"cap",poly:R_(0,0,10,4.8),piv:[5,4.8]}]},
  st3_0:{move:"hover", parts:[]},
  st3_1:{move:"crawl", parts:[{t:"tail",poly:R_(5.2,0,8.6,4.6),piv:[6.5,4.6],strike:1},{t:"arm",side:"L",poly:R_(0,5.2,4,8.9),piv:[4,6.2]},{t:"arm",side:"L",poly:R_(3.4,7.6,7.2,10),piv:[5.6,7.4],ph:.5}]},
  st3_2:{move:"heavy", parts:[{t:"head",poly:R_(0,4.6,3.2,7.8),piv:[3,6.4]},{t:"leg",poly:R_(1.8,7.7,4.4,10),piv:[3,7.8]},{t:"leg",poly:R_(7,7.1,9.6,9.9),piv:[7.8,7.2],ph:.5}]},
  st3_3:{move:"quad", parts:[{t:"tail",z:-1,poly:R_(7.6,0,10,6),piv:[7.8,5.4]},{t:"leg",poly:R_(0.4,7.1,3.6,10),piv:[2,7.1]},{t:"leg",poly:R_(6,7.5,9.1,10),piv:[7.2,7.5],ph:.5},{t:"head",poly:R_(0,0.6,5,5),piv:[3.6,4.6]}]},
  st4_0:{move:"hover", parts:[{t:"arm",side:"L",poly:R_(0.6,4.6,2.9,7.3),piv:[2.7,4.8]},{t:"arm",side:"R",poly:R_(7.5,4.6,9.8,7.3),piv:[7.7,4.8]}]},
  st4_1:{move:"crawl",mel:"leg",mag:"leg",parts:[{t:"leg",amp:.35,poly:R_(0,1.8,3.7,10),piv:[3.9,4.6]},{t:"leg",amp:.35,poly:R_(6.5,1.8,10,10),piv:[6.3,4.6],ph:.5}]},
  st4_2:{move:"fly", parts:[{t:"wing",side:"L",z:-1,poly:R_(0,0,4.05,7.2),piv:[4.1,2.6]},{t:"wing",side:"R",z:-1,poly:R_(6.05,0,10,7.2),piv:[6,2.6]},{t:"tail",poly:R_(4.6,7.5,7.6,10),piv:[6,7.5]}]},
  st4_3:{move:"slither", parts:[{t:"head",poly:R_(2,0.4,6.9,4.5),piv:[4.6,4.1]},{t:"float",poly:R_(3.2,4.4,5.7,6.5),piv:[4.4,5.4]}]},
  st5_0:{move:"gallop", parts:[{t:"tail",z:-1,poly:R_(0,0.4,2.6,6),piv:[2.4,5.2]},{t:"leg",z:-1,poly:R_(1,6.5,4.6,10),piv:[2.8,6.6],ph:.5},{t:"leg",poly:R_(6.4,6.7,10,10),piv:[7.4,6.8]},{t:"head",poly:R_(7,2.4,10,6.6),piv:[7.6,4.4]}]},
  st5_1:{move:"walk", parts:[{t:"weapon",side:"R",poly:[[0.5,4.1],[3.6,4.3],[10,8.1],[9.7,9.1],[2.6,6.3],[0.3,5.1]],piv:[2.8,5.4]}]},
  st5_2:{move:"fly", parts:[{t:"wing",side:"L",z:-1,poly:R_(0,0,3.9,6.2),piv:[4,2.8]},{t:"wing",side:"R",z:-1,poly:R_(6.3,0,10,6.2),piv:[6.2,2.8]}]},
  st5_3:{move:"heavy",mel:"tail,wing,arm",mag:"arm,wing",parts:[{t:"arm",side:"L",poly:[[2.9,5],[3.95,4.9],[3.9,7.6],[2.9,7.6]],piv:[3.55,5]},{t:"arm",side:"R",poly:[[5.45,4.9],[6.5,5],[6.5,7.6],[5.45,7.6]],piv:[6,5]},{t:"wing",side:"L",z:-1,poly:R_(0,0,3.65,6.4),piv:[3.7,3.2]},{t:"wing",side:"R",z:-1,poly:R_(6.35,0,10,6.2),piv:[6.2,3.2]},{t:"tail",poly:R_(7,5.4,10,8.7),piv:[7,8]}]},
  st6_0:{move:"fly", parts:[{t:"wing",side:"L",z:-1,poly:R_(0,0,4.2,5.6),piv:[4.4,4.2]},{t:"wing",side:"R",z:-1,poly:[[5.4,0],[10,0],[10,3.3],[7.5,3.3],[5.6,4]],piv:[6,4]},{t:"tail",poly:R_(0.6,5.9,5.3,10),piv:[3.8,6]}]},
  st6_1:{move:"quad", parts:[{t:"wing",side:"L",z:-1,poly:R_(0.5,0,5,3.6),piv:[4.6,3.4]},{t:"leg",z:-1,poly:R_(0.5,7.6,4,10),piv:[2.6,7.6],ph:.5},{t:"leg",poly:R_(5.6,7.2,10,10),piv:[7,7.2]},{t:"head",poly:R_(6.4,2.4,9.7,6.6),piv:[6.6,4.8]}]},
  st6_2:{move:"hover", parts:[{t:"wing",side:"L",z:-1,poly:R_(0,0.3,3.6,7.1),piv:[3.6,5]},{t:"wing",side:"R",z:-1,poly:R_(6.6,0.3,10,7.1),piv:[6.6,5]},{t:"pulse",poly:R_(3.2,2.1,6.8,5.3),piv:[5,3.7]}]},
  st6_3:{move:"fly", parts:[{t:"wing",side:"L",z:-1,poly:R_(0,0,3.65,7),piv:[3.8,3]},{t:"wing",side:"R",z:-1,poly:R_(6.25,0,10,7),piv:[6.2,3]},{t:"tail",amp:.5,poly:[[4,6.6],[6.2,6.6],[7.6,10],[2.8,10]],piv:[5,6.7]}]},
  st7_0:{move:"hover", parts:[]},
  st7_1:{move:"fly", parts:[{t:"wing",side:"L",z:-1,poly:R_(1.3,0,3.75,4.6),piv:[3.6,4.2]},{t:"wing",side:"R",z:-1,poly:R_(4.85,0,10,4.4),piv:[5,3.8]},{t:"tail",poly:R_(2.8,7.9,7.2,10),piv:[5,8]}]},
  st7_2:{move:"heavy", parts:[{t:"arm",side:"L",poly:R_(0,3.2,2.6,6.9),piv:[2.4,3.6],punch:1},{t:"arm",side:"R",poly:R_(7.2,3.2,10,6.9),piv:[7.6,3.6],punch:1},{t:"leg",poly:R_(2,7.7,4.6,10),piv:[3.4,7.7]},{t:"leg",poly:R_(5.4,7.7,8.4,10),piv:[6.6,7.7],ph:.5}]},
  st7_3:{move:"fly",mel:"weapon,aura",mag:"aura,weapon",aura:{L:[4.1,3.5],R:[6.5,3.4],len:5.8},parts:[{t:"weapon",side:"L",poly:[[0,4.9],[3.3,4.8],[3.95,5.2],[3.95,6.2],[2.7,7.2],[1.8,10],[0,10]],piv:[3.7,5.6]}]},
  st8_0:{move:"quad", parts:[{t:"tail",z:-1,poly:R_(0,5,2.2,7.7),piv:[2.2,6]},{t:"leg",z:-1,poly:R_(1.6,6.9,4.4,10),piv:[3,6.9],ph:.5},{t:"leg",poly:R_(6.4,7.3,9.2,10),piv:[7.4,7.3]},{t:"head",poly:R_(7.2,2.3,10,6.1),piv:[7.4,4.5]}]},
  st8_1:{move:"heavy", parts:[{t:"arm",side:"L",poly:R_(0,3.8,3.5,7.6),piv:[3,3.6],punch:1},{t:"arm",side:"R",poly:R_(6.9,3.8,10,7.4),piv:[7,3.6],punch:1},{t:"leg",poly:R_(1,7.5,4.6,10),piv:[3,7.5]},{t:"leg",poly:R_(5.2,7.5,8.6,10),piv:[6.6,7.5],ph:.5}]},
  st8_2:{move:"hover", parts:[{t:"weapon",side:"L",cast:1,poly:R_(0.4,0,2.6,10),piv:[2.2,3.9]}]},
  st8_3:{move:"slither", parts:[{t:"head",poly:R_(0.6,0,4.8,3.8),piv:[3.4,3.6]},{t:"float",poly:R_(0.5,3.8,3.2,6.1),piv:[1.8,5]}]},
  st9_0:{move:"hop", parts:[{t:"tail",z:-1,poly:R_(0,1.6,2.3,7.1),piv:[2,6.6]},{t:"head",poly:R_(3.4,0.3,8.9,4.4),piv:[6,4]}]},
  st9_1:{move:"hover", parts:[{t:"float",poly:R_(0,4.1,1.9,6.1),piv:[1,5.1]},{t:"float",poly:R_(8.1,4.1,10,6.1),piv:[9,5.1],ph:.5}]},
  st9_2:{move:"gallop", parts:[{t:"tail",z:-1,poly:R_(6.4,1.2,10,5),piv:[6.6,4.6]},{t:"leg",poly:R_(1,6.6,4.8,10),piv:[3,6.6]},{t:"leg",z:-1,poly:R_(5.6,6.4,9,10),piv:[6.6,6.4],ph:.5},{t:"head",poly:R_(0,0.3,4,4.4),piv:[3,4.2]}]},
  st9_3:{move:"heavy", parts:[{t:"weapon",side:"L",hammer:1,poly:R_(0,5.6,3,8.8),piv:[2.6,5.8]},{t:"weapon",side:"R",hammer:1,poly:R_(7.2,5.6,10,8.8),piv:[7.4,5.8]}]},
  st10_0:{move:"quad", parts:[{t:"wing",side:"L",z:-1,poly:R_(0.4,0,4.2,5),piv:[4,5]},{t:"wing",side:"R",z:-1,poly:R_(6.2,0.4,9.2,5),piv:[6.6,5]},{t:"tail",z:-1,poly:R_(0,5.6,2.6,8),piv:[2.4,6.8]},{t:"leg",poly:R_(6.6,7.6,10,10),piv:[7.4,7.6]},{t:"leg",z:-1,poly:R_(0.6,7.6,3.4,10),piv:[2,7.6],ph:.5}]},
  st10_1:{move:"gallop",mel:"weapon,leg",mag:"weapon",parts:[{t:"weapon",side:"L",poly:[[0.3,0],[4.7,0],[4.9,3.9],[2.3,3.9]],piv:[4.4,3.6]},{t:"leg",poly:R_(0,5.8,3.6,10),piv:[2.4,6]},{t:"leg",z:-1,poly:R_(3.6,6.6,7.6,10),piv:[5.4,6.8],ph:.5}]},
  st10_2:{move:"hover", parts:[{t:"weapon",side:"L",cast:1,poly:[[0,2.3],[2.3,2.3],[2.5,8],[0.7,8]],piv:[2,5]},{t:"float",poly:R_(1,0.3,9,3.1),piv:[5,1.7]},{t:"float",poly:R_(6.4,3.3,10,4.7),piv:[8.2,4],ph:.5}]},
  st10_3:{move:"hover", parts:[{t:"weapon",side:"R",poly:R_(7.8,2,10,6.9),piv:[8,6]},{t:"weapon",side:"L",poly:R_(0,5.5,3,8.5),piv:[2.8,6]},{t:"float",poly:R_(2,0,8,2.3),piv:[5,1.2]}]},
};
/* 조각 만들기: 그림이 불러와지면 한 번만 (몸통에서 조각 부분을 지우고, 조각은 따로 잘라 둬요) */
function buildRig(key,A){ const R=RIGS[key]; if(!R||A.rig) return; const im=A.im, W=im.width, H=im.height, sx=W/10, sy=H/10;
  // 두 발로 걷는 보스인데 다리 조각이 없으면: 그림 아래쪽을 왼발·오른발로 나눠 자동으로 다리를 만들어요
  if((R.move==="walk"||R.move==="heavy")&&!R.noLeg&&!R.parts.some(p=>p.t==="leg")&&!R._auto){ R._auto=1;
    try{ const c=document.createElement("canvas"); c.width=W; c.height=H; const x=c.getContext("2d"); x.drawImage(im,0,0); const y0=Math.floor(H*.8), d=x.getImageData(0,y0,W,H-y0).data;
      let mn=W, mx=0, sw=0, sxw=0; for(let yy=0;yy<H-y0;yy++) for(let xx=0;xx<W;xx++){ const a=d[(yy*W+xx)*4+3]; if(a>120){ if(xx<mn) mn=xx; if(xx>mx) mx=xx; sw+=a; sxw+=a*xx } }
      if(sw>0&&mx-mn>W*.12){ const mid=sxw/sw/sx, l=Math.max(0,mn/sx-.1), r=Math.min(10,mx/sx+.1), hip=7.7;
        R.parts.push({t:"leg",poly:R_(l,hip,mid,10),piv:[(l+mid)/2,hip],auto:1},{t:"leg",poly:R_(mid,hip,r,10),piv:[(mid+r)/2,hip],ph:1,auto:1}) } }catch(err){} }
  const path=(c,poly)=>{ c.beginPath(); poly.forEach(([x,y],i)=>i?c.lineTo(x*sx,y*sy):c.moveTo(x*sx,y*sy)); c.closePath() };
  const base=document.createElement("canvas"); base.width=W; base.height=H; const bc=base.getContext("2d"); bc.drawImage(im,0,0);
  const used=document.createElement("canvas"); used.width=W; used.height=H; const uc=used.getContext("2d");
  const parts=R.parts.map(p=>{ const xs=p.poly.map(q=>q[0]*sx), ys=p.poly.map(q=>q[1]*sy), x0=Math.max(0,Math.floor(Math.min(...xs))), y0=Math.max(0,Math.floor(Math.min(...ys))), x1=Math.min(W,Math.ceil(Math.max(...xs))), y1=Math.min(H,Math.ceil(Math.max(...ys)));
    const cv=document.createElement("canvas"); cv.width=Math.max(1,x1-x0); cv.height=Math.max(1,y1-y0); const c=cv.getContext("2d");
    c.save(); c.translate(-x0,-y0); path(c,p.poly); c.clip(); c.drawImage(im,0,0); c.restore();
    c.globalCompositeOperation="destination-out"; c.drawImage(used,-x0,-y0);   // 앞 조각과 겹친 부분은 빼요
    uc.fillStyle="#000"; path(uc,p.poly); uc.fill();
    return Object.assign({},p,{cv,x0,y0,px:p.piv[0]*sx,py:p.piv[1]*sy}) });
  bc.globalCompositeOperation="destination-out"; bc.drawImage(used,0,0);
  // 조각이 움직여도 빈 구멍이 안 보이게: 몸에 붙은 조각 자리는 흐릿하고 어두운 그림으로 메워 둬요
  const FILL={head:1,cap:1,arm:1,leg:1};
  if(R.parts.some(p=>FILL[p.t])){ const sm=document.createElement("canvas"); sm.width=Math.max(1,W>>3); sm.height=Math.max(1,H>>3); const sc=sm.getContext("2d"); sc.imageSmoothingEnabled=true; sc.drawImage(im,0,0,sm.width,sm.height);
    const bl=document.createElement("canvas"); bl.width=W; bl.height=H; const lc=bl.getContext("2d"); lc.imageSmoothingEnabled=true; lc.drawImage(sm,0,0,W,H);
    lc.globalCompositeOperation="destination-in"; lc.drawImage(im,0,0);   // 원래 모양 안쪽만
    lc.globalCompositeOperation="source-atop"; lc.fillStyle="rgba(0,0,0,.45)"; lc.fillRect(0,0,W,H);
    const mk=document.createElement("canvas"); mk.width=W; mk.height=H; const mc=mk.getContext("2d"); mc.fillStyle="#000";
    R.parts.forEach(p=>{ if(FILL[p.t]){ path(mc,p.poly); mc.fill() } });
    lc.globalCompositeOperation="destination-in"; lc.drawImage(mk,0,0);
    bc.globalCompositeOperation="destination-over"; bc.drawImage(bl,0,0) }
  A.rig={move:R.move,base,parts} }
/* 조각마다 지금 각도(도)와 이동 계산 */
function partMotion(p,e,t,st){ const D=Math.PI/180, sd=p.side==="L"?1:-1, ph=(p.ph||0)*Math.PI, mv=st.mv, A=st.atk, am=p.amp||1;
  const on=n=>!!(A&&A.part&&A.part.indexOf(n)>=0);
  const W=A?(A.windT??A.wind):0, H=A?(A.hitT??A.hit):0, tr=A&&A.charge?Math.sin(t*38)*1.2*D*W:0;   // 특수 공격 준비 중엔 부들부들
  let rot=0, dx=0, dy=0, sc=1;
  if(p.t==="wing"){ const f=st.fly?3.2:2.2, amp=((st.fly?14:6)+mv*6)*am; rot=sd*amp*Math.sin(t*f*Math.PI*2+ph)*D*(on("wing")?1-W*.7:1);
    if(on("wing")) rot+=sd*(W*32-H*40)*D+tr }
  else if(p.t==="leg"){ const amp=(st.gallop?26:p.auto?9:16)*Math.min(1,mv*1.2)*am, sw=Math.sin(st.walk+ph); rot=amp*sw*D; dy-=Math.max(0,Math.cos(st.walk+ph))*(p.auto?7:5)*Math.min(1,mv*1.2); if(p.auto) dx+=sw*4*Math.min(1,mv);
    if(on("leg")) rot+=(-W*24+H*16)*D*am*(p.z===-1?.5:1) }
  else if(p.t==="tail"){ rot=8*Math.sin(t*2.4+ph)*D*am;
    if(on("tail")){ if(p.thrust) dy+=-W*12+H*30; else rot+=(p.strike?(-W*28+H*55):(W*22-H*38)*am)*D+tr } }
  else if(p.t==="head"){ rot=2.5*Math.sin(t*1.8)*D+(mv>.2?2*Math.sin(st.walk*2)*D:0);
    if(on("head")){ rot+=(-W*7+H*10)*D+tr; dx+=-W*3+H*8 } }
  else if(p.t==="cap"){ rot=3*Math.sin(t*1.5+ph)*D; dy=Math.sin(t*2)*2; if(on("cap")){ dy+=-W*7+H*5; rot+=H*5*D+tr; sc=1+W*.05 } }
  else if(p.t==="arm"){ const amp=p.small?4:7; rot=sd*amp*Math.sin(st.walk+ph+(p.side==="L"?0:Math.PI))*D*Math.min(1,mv+.3)*am;
    if(on("arm")){ if(p.punch||A.mel){ rot+=sd*(W*30-H*50)*D+tr; dx+=H*14*(p.side==="L"?-1:1); dy+=H*6 } else { rot+=sd*(W*42-H*12)*D+tr; dy+=-W*6 } } }
  else if(p.t==="weapon"){ rot=sd*-3*Math.sin(t*1.6)*D;
    if(on("weapon")){ if(p.cast){ rot+=sd*(W*16-H*8)*D+tr; dy+=-W*12+H*4 }
      else if(p.hammer){ rot+=sd*(W*70-H*90)*D+tr; dy+=-W*10+H*8 }
      else if(A.mel){ rot+=sd*(W*55-H*95)*D+tr; dx+=-W*4+H*8 }
      else { rot+=sd*(W*55-H*20)*D+tr; dy+=-W*8 } } }   // 마법: 무기를 하늘로 치켜들어요
  else if(p.t==="spear"){ rot=-2*Math.sin(t*1.6)*D; if(on("weapon")){ if(A.mel){ dx+=-W*20+H*44; rot+=-W*6*D } else { rot+=-W*14*D; dy+=-W*10 } } }
  else if(p.t==="float"){ dy=Math.sin(t*2.2+ph)*6; rot=3*Math.sin(t*1.3+ph)*D; if(on("float")){ dy+=-W*12+H*4; sc=1+W*.15+H*.08; rot+=t*W*2 } }
  else if(p.t==="pulse"){ sc=1+.04*Math.sin(t*3)+(on("pulse")?W*.18-H*.05:0) }
  return {rot,dx,dy,sc} }
/* 날개 그림이 없는 보스(하늘 성 수문장)에게 하얀 깃털 날개를 달아 줘요 (한 번 그려 두고 펄럭이기만 해요) */
function buildWing(L){ const cv=document.createElement("canvas"), ox=L*.3, oy=L*1.15; cv.width=Math.ceil(L*2.1); cv.height=Math.ceil(L*2.25); const c=cv.getContext("2d"); c.translate(ox,oy);
  const bone=u=>{ const x0=0,y0=0,cx=L*.12,cy=-L*.9,x1=L*.85,y1=-L*.82, k=1-u; return [k*k*x0+2*k*u*cx+u*u*x1, k*k*y0+2*k*u*cy+u*u*y1] };
  const D=Math.PI/180;
  const feather=(u,ang,len,wid,tone)=>{ const [x,y]=bone(u); c.save(); c.translate(x,y); c.rotate(ang*D);
    const g=c.createLinearGradient(0,0,len,0); g.addColorStop(0,"#ffffff"); g.addColorStop(.6,tone?"#eef3fa":"#f8fbff"); g.addColorStop(1,tone?"#c9d4e6":"#dfe7f3"); c.fillStyle=g;
    c.beginPath(); c.moveTo(0,-wid*.42); c.bezierCurveTo(len*.4,-wid,len*.88,-wid*.85,len,0); c.bezierCurveTo(len*.88,wid*.8,len*.4,wid*.95,0,wid*.42); c.closePath(); c.fill();
    c.strokeStyle="rgba(110,128,160,.55)"; c.lineWidth=Math.max(1,L*.006); c.stroke();
    c.strokeStyle="rgba(150,165,195,.55)"; c.lineWidth=Math.max(1,L*.004); c.beginPath(); c.moveTo(wid*.2,0); c.quadraticCurveTo(len*.5,-wid*.06,len*.86,0); c.stroke(); c.restore() };
  const row=(n,u0,u1,a0,a1,l0,l1,w,tone)=>{ for(let i=0;i<n;i++){ const q=n>1?i/(n-1):0; feather(u0+(u1-u0)*q,a0+(a1-a0)*q,L*(l0+(l1-l0)*q),L*w,tone) } };
  // 그림자 한 겹 (날개 깊이감)
  c.save(); c.shadowColor="rgba(40,60,100,.35)"; c.shadowBlur=L*.05; c.shadowOffsetY=L*.02;
  row(9,1,.6,22,70,1.0,.95,.15,1);      // 첫째 날개깃 (가장 긴 바깥 깃털)
  row(11,.62,.04,74,96,.92,.78,.16,1);  // 둘째 날개깃 (아래로 길게 늘어진 깃털)
  c.restore();
  row(13,.98,.06,40,92,.5,.42,.14,0);   // 덮깃
  row(11,.92,.1,52,90,.26,.22,.11,0);   // 작은 덮깃
  // 날개 뼈대 위쪽 부드러운 테두리
  c.strokeStyle="rgba(255,255,255,.9)"; c.lineWidth=L*.05; c.lineCap="round"; c.beginPath(); for(let i=0;i<=20;i++){ const [x,y]=bone(i/20); i?c.lineTo(x,y):c.moveTo(x,y) } c.stroke();
  return {cv,ox,oy} }
function drawAuraRaw(ctx,R,e,t,st,W0,H0,FL){ const a=R.aura, sx=W0/10, sy=H0/10, A=st.atk, on=!!(A&&A.part&&A.part.indexOf("aura")>=0), D=Math.PI/180;
  // 처음 만든 빛나는 금빛 깃털 날개 (금색 → 하늘색으로 빛나요)
  const flap=FL, L=a.len*sx;
  ctx.save(); ctx.globalAlpha=.88;
  for(const side of [-1,1]){ const [rx,ry]=side<0?a.L:a.R, x0=rx*sx, y0=ry*sy;
    for(let i=0;i<8;i++){ const q=i/7, th=(18+q*92-flap*(1-q*.4))*D, len=L*(1-q*.42)*(0.92+.08*Math.sin(t*3+i)), dxv=side*Math.sin(th), dyv=-Math.cos(th);
      const tx=x0+dxv*len, ty=y0+dyv*len, px=-dyv, py=dxv, wd=len*(.16-q*.04);
      const g=ctx.createLinearGradient(x0,y0,tx,ty); g.addColorStop(0,"rgba(255,255,255,.95)"); g.addColorStop(.35,"rgba(255,205,90,.95)"); g.addColorStop(1,"rgba(70,160,255,.55)"); ctx.fillStyle=g;
      ctx.beginPath(); ctx.moveTo(x0,y0); ctx.quadraticCurveTo(x0+dxv*len*.55+px*wd*side,y0+dyv*len*.55+py*wd*side,tx,ty); ctx.quadraticCurveTo(x0+dxv*len*.5-px*wd*.35*side,y0+dyv*len*.5-py*wd*.35*side,x0,y0); ctx.fill(); ctx.strokeStyle="rgba(160,105,20,.85)"; ctx.lineWidth=sx*.06; ctx.stroke();
      ctx.strokeStyle="rgba(255,255,255,.55)"; ctx.lineWidth=sx*.05; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.quadraticCurveTo(x0+dxv*len*.5+px*wd*.3*side,y0+dyv*len*.5+py*wd*.3*side,tx,ty); ctx.stroke() } }
  ctx.restore() }
/* 렉 줄이기: 날개를 한 번만 그려 두고 펄럭임은 통째로 돌려서 표현해요 */
function drawAura(ctx,R,e,t,st,W0,H0){ const a=R.aura, A=st.atk, on=!!(A&&A.part&&A.part.indexOf("aura")>=0), D=Math.PI/180;
  const flap=(st.fly?16:8)*Math.sin(t*3.2*Math.PI*2*.5)+(on?A.wind*30-A.hit*42:0);
  const key=Math.round(W0); if(!a._c||a._ck!==key){ a._ck=key; a._c={}; const sx=W0/10, sy=H0/10, L=a.len*sx;
    for(const side of [-1,1]){ const [rx,ry]=side<0?a.L:a.R, S=Math.ceil(L*2.3), cv=document.createElement("canvas"); cv.width=cv.height=S; const c=cv.getContext("2d");
      c.translate(S/2-rx*sx,S/2-ry*sy); const half={aura:{L:a.L,R:a.R,len:a.len}}; half.aura[side<0?"R":"L"]=[-999,-999];
      drawAuraRaw(c,half,e,t,{atk:null},W0,H0,0); a._c[side]={cv,S,x:rx*sx,y:ry*sy} } }
  for(const side of [-1,1]){ const w=a._c[side]; ctx.save(); ctx.translate(w.x,w.y); ctx.rotate(-side*flap*.75*D); ctx.drawImage(w.cv,-w.S/2,-w.S/2); ctx.restore() } }
/* 공격 종류 → 어느 조각으로 공격할지 (보스마다 무기·특징에 맞게) */
const MELEE={dash:1,stomp:1,laser:1,cross:1,fire3:1,fire5:1,rock:1};
const ATK_PARTS={
  st1_0:["head","head"], st1_1:["tail","wing"], st1_2:["arm","arm"], st1_3:["float","float"],
  st2_0:["weapon","weapon,arm"], st2_1:["head,leg","head"], st2_2:["cap,arm","cap"], st2_3:["arm","cap,arm"],
  st3_1:["tail,arm","tail"], st3_2:["head","head"], st3_3:["head,leg","head,tail"],
  st4_0:["arm","arm"], st4_2:["wing,tail","wing"], st4_3:["head","float,head"],
  st5_0:["head,leg","head,tail"], st5_1:["weapon","weapon"], st5_2:["wing","wing"],
  st6_0:["wing,tail","wing"], st6_1:["head,leg,wing","wing,head"], st6_2:["wing,pulse","pulse,wing"], st6_3:["wing,tail","wing,tail"],
  st7_1:["wing,tail","wing"], st7_2:["arm","arm"],
  st8_0:["head,leg","head,tail"], st8_1:["arm","arm"], st8_2:["weapon","weapon"], st8_3:["head","float,head"],
  st9_0:["head","head,tail"], st9_1:["float","float"], st9_2:["head,leg","head,tail"], st9_3:["weapon","weapon"],
  st10_0:["wing,leg,tail","wing"], st10_2:["weapon,float","weapon,float"], st10_3:["weapon","float,weapon"] };
function atkPartFor(rig,k,key){ const mel=!!MELEE[k];
  if(rig.mel&&mel) return rig.mel; if(rig.mag&&!mel) return rig.mag;
  const AP=ATK_PARTS[key]; if(AP) return AP[mel?0:1];
  const has=t=>rig.parts.some(p=>p.t===t||(t==="weapon"&&p.t==="spear"));
  const order=mel?["weapon","arm","head","tail","wing","leg"]:["weapon","arm","wing","tail","head","leg"];
  for(const t of order) if(has(t)) return t; return "body" }

/* ===== 용사 그림 (선생님이 보내 준 그림) · 단계(전직)마다 다른 그림 ===== */
const HERO_ART={};   // HERO_ART[id] = true 이면 그림 용사
(function(){ const F=typeof HERO_ART_FILES!=="undefined"?HERO_ART_FILES:{}; if(typeof SPRITE_T==="undefined") return;
  for(const k in F){ const [id,tr]=k.split(":"); if(!SPRITE_T[id]) continue; HERO_ART[id]=true;
    const old=SPRITE_T[id][+tr]; SPRITE_T[id][+tr]=F[k];
    for(const u in SPRITE_URLS) if(SPRITE_URLS[u]===old) SPRITE_URLS[u]=F[k];
    if(+tr===0&&typeof SPRITE_DARK!=="undefined"){ const im=new Image(); im.onload=()=>{ const c=document.createElement("canvas"); c.width=im.width; c.height=im.height; const x=c.getContext("2d"); x.drawImage(im,0,0); x.globalCompositeOperation="source-in"; x.fillStyle="#2a2347"; x.fillRect(0,0,c.width,c.height); SPRITE_DARK[id]=c.toDataURL() }; im.src=F[k] } }
  // 그림 용사는 화면에서 부드럽게 (도트는 각지게)
  try{ const st=document.createElement("style"); st.textContent='img[src^="data:image/webp"]{image-rendering:auto!important}'; document.head.appendChild(st) }catch(e){}
})();
const isHeroArt=src=>typeof src==="string"&&src.startsWith("data:image/webp");

/* ===== 용사 몸 움직임: 그림을 윗몸·왼다리·오른다리로 나눠 따로 움직여요 =====
   걷기: 다리를 번갈아 내딛고 발을 들며, 윗몸은 반대로 살짝 비틀어요
   공격: 무기마다 다르게 (대검: 젖혔다 크게 베기 · 활: 당겼다 놓기 · 표창: 몸을 비틀어 던지기 · 마법: 치켜들었다 내뻗기 · 총: 반동) */
const HRIG={};
function heroRigOf(img){ const key=img.src.length+":"+img.src.slice(-40); if(HRIG[key]!==undefined) return HRIG[key];
  try{ const W=img.naturalWidth, H=img.naturalHeight, c=document.createElement("canvas"); c.width=W; c.height=H; const x=c.getContext("2d"); x.drawImage(img,0,0);
    const d=x.getImageData(0,0,W,H).data; let top=H, bot=0; for(let y=0;y<H;y++) for(let i=0;i<W;i+=2) if(d[(y*W+i)*4+3]>100){ if(y<top) top=y; if(y>bot) bot=y; break }
    const hip=Math.round(top+(bot-top)*.74), y0=Math.round(top+(bot-top)*.86); let sw=0,sx=0,mn=W,mx=0; for(let y=y0;y<=bot;y++) for(let i=0;i<W;i++){ const a=d[(y*W+i)*4+3]; if(a>120){ sw+=a; sx+=a*i; if(i<mn) mn=i; if(i>mx) mx=i } }
    const mid=sw?sx/sw:W/2, ov=Math.round((bot-top)*.03);
    const cut=(x0,y0_,x1,y1)=>{ const cv=document.createElement("canvas"); cv.width=W; cv.height=H; const cx=cv.getContext("2d"); cx.save(); cx.beginPath(); cx.rect(x0,y0_,x1-x0,y1-y0_); cx.clip(); cx.drawImage(img,0,0); cx.restore(); return cv };
    const R={W,H,hip,mid,bot,lp:(mn+mid)/2,rp:(mid+mx)/2,upper:cut(0,0,W,hip+ov),legL:cut(0,hip,mid,H),legR:cut(mid,hip,W,H)};
    // 다리를 돌려도 틈이 안 보이게: 허리 아래 그림을 흐리게 깔아 둬요
    const base=document.createElement("canvas"); base.width=W; base.height=H; const bx=base.getContext("2d"); bx.filter="blur(2px) brightness(.7)"; bx.drawImage(cut(0,hip-2,W,hip+(bot-hip)*.45),0,0); R.base=base;
    return HRIG[key]=R }catch(e){ return HRIG[key]=null } }
const HERO_POSE={ // [준비 시간 비율, 준비: 각도·앞뒤·위아래·가로늘림, 공격: 각도·앞뒤·위아래·가로늘림]
  sword:[.34,-11,-5,0,.94, 15,11,0,1.12], arrow:[.55,-5,-5,0,.97, 3,2,0,1.03], star:[.3,-13,-3,-1,.95, 17,8,0,1.1], fireball:[.45,-6,-2,-7,.95, 9,8,0,1.08], gun:[0,0,0,0,1, -9,-6,-1,.96] };
function drawHeroRig(ctx,img,SZ,st){ const R=heroRigOf(img); if(!R){ ctx.drawImage(img,-SZ/2,-SZ+4,SZ,SZ); return }
  const s=SZ/R.W, D=Math.PI/180, dt=Math.min(.05,st.dt||0);
  const S=st.S||(st.S={a:0,va:0,x:0,vx:0,y:0,vy:0,k:1,vk:0,l:0,vl:0,r:0,vr:0,ly:0,vly:0,ry:0,vry:0,h:[]});
  const mv=st.mv||0, ph=st.ph||0, P=HERO_POSE[st.kind], aq=st.aq;
  // 걷기 목표: 다리를 번갈아 내딛고 발 들기
  const tl=Math.sin(ph)*11*mv, tr=-Math.sin(ph)*11*mv, tly=-Math.max(0,-Math.cos(ph))*6*mv, try_=-Math.max(0,Math.cos(ph))*6*mv;
  // 공격 목표: 준비(젖히기) → 공격(휙 내지르기) → 스프링으로 출렁이며 제자리
  let ta=0, tx=0, ty=0, tk=1, K=130, Z=.55;
  if(P&&aq>=0){ if(aq<P[0]){ ta=P[1]; tx=P[2]; ty=P[3]; tk=P[4]; K=320; Z=.8 } else { ta=P[5]; tx=P[6]; ty=P[7]; tk=P[8]; K=650; Z=.32 } }
  if(dt>0){ const n=Math.ceil(dt/.006), h=dt/n, C=2*Math.sqrt(K)*Z, C2=2*Math.sqrt(240)*.55;
    for(let j=0;j<n;j++){ S.va+=(K*(ta-S.a)-C*S.va)*h; S.a+=S.va*h; S.vx+=(K*(tx-S.x)-C*S.vx)*h; S.x+=S.vx*h; S.vy+=(K*(ty-S.y)-C*S.vy)*h; S.y+=S.vy*h; S.vk+=(K*(tk-S.k)-C*S.vk)*h; S.k+=S.vk*h;
      S.vl+=(240*(tl-S.l)-C2*S.vl)*h; S.l+=S.vl*h; S.vr+=(240*(tr-S.r)-C2*S.vr)*h; S.r+=S.vr*h; S.vly+=(240*(tly-S.ly)-C2*S.vly)*h; S.ly+=S.vly*h; S.vry+=(240*(try_-S.ry)-C2*S.vry)*h; S.ry+=S.vry*h } }
  else if(st.dt===undefined){ S.a=ta; S.x=tx; S.y=ty; S.k=tk }
  const body=(a,x,y,k,alpha)=>{ ctx.save(); if(alpha<1) ctx.globalAlpha*=alpha; ctx.translate(x,4+y); ctx.rotate(a*D); ctx.scale(k,1-(k-1)*.5); ctx.scale(s,s); ctx.translate(-R.W/2,-R.H);
    if(Math.abs(S.l)+Math.abs(S.ly)<.3&&Math.abs(S.r)+Math.abs(S.ry)<.3) ctx.drawImage(img,0,0);
    else { ctx.drawImage(R.base,0,0); const leg=(cv,px,an,dy)=>{ ctx.save(); ctx.translate(px,R.hip+dy/s); ctx.rotate(an*D); ctx.drawImage(cv,-px,-R.hip); ctx.restore() };
      leg(R.legL,R.lp,S.l,S.ly); leg(R.legR,R.rp,S.r,S.ry); ctx.drawImage(R.upper,0,0) }
    ctx.restore() };
  // 휙 움직일 때 잔상
  if(Math.abs(S.va)>120) S.h.forEach((q,i)=>body(q[0],q[1],q[2],q[3],.22*(1-i/3)));
  body(S.a,S.x,S.y,S.k,1);
  S.h.unshift([S.a,S.x,S.y,S.k]); if(S.h.length>3) S.h.length=3 }

/* ===== 기술 그림 (이프리트 · 불사조 · 문어 포탑 …) ===== */
const SKILL_IMG={}; (function(){ const F=typeof SKILL_ART_FILES!=="undefined"?SKILL_ART_FILES:{}; for(const k in F){ const im=new Image(); im.onload=()=>{ SKILL_IMG[k]=im }; im.src=F[k] } })();
function drawSkillImg(c,k,h,flip){ const im=SKILL_IMG[k]; if(!im) return false; const w=h*im.width/im.height; c.save(); if(flip) c.scale(-1,1); c.drawImage(im,-w/2,-h/2,w,h); c.restore(); return true }

/* 해적 선원: 바다 총잡이 그림을 작게 써요 */
const CREW_IMG=(()=>{ const F=typeof HERO_ART_FILES!=="undefined"&&HERO_ART_FILES["pirate:1"]; if(!F) return null; const im=new Image(); im.src=F; return im })();
function drawCrewArt(c,m,t,GL){ if(!CREW_IMG||!CREW_IMG.complete||!CREW_IMG.naturalWidth) return false;
  const aim=m.aim!==undefined?m.aim:(m.side>0?0:Math.PI), right=Math.cos(aim)>=0, ph=t*8+m.side*1.7, hop=Math.abs(Math.sin(ph))*3, rec=m.fl>0?m.fl/.08:0, S=46;
  c.save(); c.translate(m.x,m.y+14); c.fillStyle="rgba(0,0,0,.25)"; c.beginPath(); c.ellipse(0,0,12,4,0,0,7); c.fill();
  c.translate((right?-1:1)*rec*3,-hop); c.rotate(Math.sin(ph)*.05-(right?1:-1)*rec*.08); c.scale(right?1:-1,1); c.drawImage(CREW_IMG,-S/2,-S+2,S,S); c.restore();
  if(m.fl>0){ c.save(); c.globalCompositeOperation=GL; jGlow(c,m.x+Math.cos(aim)*20,m.y-14+Math.sin(aim)*20,14,"255,220,120",rec); c.restore() }
  return true }
