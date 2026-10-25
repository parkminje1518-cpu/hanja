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
/* 떠 있는 보스: 이동 그림을 늘 천천히 재생 + 둥실 위아래 [장면 속도, 띄우는 높이, 흔들림 폭, 기울기] */
const HOVER_RUN={st8_3:[6,12,10,.05],st4_0:[5,8,7,.03],st6_0:[9,10,9,.04],st6_2:[5,6,6,.02],st7_0:[5,10,8,.04],st8_2:[5,8,7,.03],st9_1:[5,6,6,.02],st10_2:[5,6,6,.02],st10_3:[5,6,7,.02]};
/* 장면 그림(달리기·공격)의 실제 몸 높이를 한 번 재서, 멈춰 있을 때 그림과 같은 크기로 그려요 (크기가 커졌다 작아졌다 하지 않게) */
function sheetFit(img,N){ if(img._fit) return img._fit; let top=img.height, bot=0; try{ const cv=document.createElement("canvas"), W=Math.max(1,Math.round(img.width/4)), H=Math.max(1,Math.round(img.height/4)); cv.width=W; cv.height=H; const c=cv.getContext("2d"); c.drawImage(img,0,0,W,H); const D=c.getImageData(0,0,W,H).data;
    for(let y=0;y<H;y++){ for(let x=0;x<W;x++){ if(D[(y*W+x)*4+3]>40){ if(y<top) top=y; if(y>bot) bot=y; break } } } top*=4; bot=(bot+1)*4 }catch(err){ top=0; bot=img.height }
  if(bot<=top){ top=0; bot=img.height } return img._fit={top,bot,cf:(bot-top)/img.height} }
function drawBossArt(ctx,e,t,px){ const A=artOf(e); if(!A) return false;
  // 단계별 최대 크기 (약한 185 · 중간 215 · 강한 250 · 최종 295 픽셀 높이) · 강할수록 위엄 있게
  const tier=bossTier(e), MAXH=[225,260,300,350][Math.min(3,tier)]*1.1, MAXW=MAXH*1.3;
  const r=e.r, fs=e._pose?e._pose.face:(px<e.x?-1:1); let w=r*A.w*.94, h=w*A.im.height/A.im.width; const sc=Math.min(1,MAXH/h,MAXW/w); w*=sc; h*=sc; const y0=e.y+r*.95+A.dy*r; e._artTop=y0-h;
  if(!A.rig&&!A.noRig){ const key=RIGS[e.bid]?e.bid:null; if(key) try{ buildRig(key,A) }catch(err){ A.noRig=1 } else A.noRig=1 }
  // 달리기 그림(4장면)이 있는 보스: 움직일 때는 장면을 넘기며 진짜로 달려요
  // 공격 그림(3~4장면)이 있는 보스: 기 모으기 → 내리치기 → 숨 고르기를 장면으로 보여 줘요
  // 성운의 인도자 도끼 던지기: 젖히기(빨간 줄 동안) → 빈손으로 도끼가 날아갔다 오길 기다리기 → 돌아온 도끼 받기
  const THR=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&e.atk&&e.atk.k==="axethrow"&&e.atk.t0!==undefined&&SKILL_IMG["thr_"+e.bid];
  if(THR){ const wd=e.atk.wind||1, dt=t-e.atk.t0, L=wd+.9;
    if(dt>=0&&dt<L+2.05){ const N=3, cw=THR.width/N, ch=THR.height, idx=dt<L?0:dt<L+1.65?1:2, FT=sheetFit(THR,N), rh=h*.97/FT.cf, rw=rh*cw/ch, oy=-rh*FT.bot/ch;
      ctx.save(); ctx.translate(e.x,y0); ctx.scale(Math.sign(fs||1)*Math.max(.15,Math.abs(fs)),1); ctx.drawImage(THR,idx*cw,0,cw,ch,-rw/2,oy,rw,rh);
      if(e.flash>0){ ctx.globalCompositeOperation="lighter"; ctx.globalAlpha=Math.min(.7,e.flash*4); ctx.drawImage(THR,idx*cw,0,cw,ch,-rw/2,oy,rw,rh) } ctx.restore(); return true } }
  const ATK=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&!e.spin&&e.atk&&e.atk.t0!==undefined&&SKILL_IMG["atk_"+e.bid];
  if(ATK){ const wd=e.atk.wind||.45, dt=t-e.atk.t0, N=(e.bid==="st9_3"||e.bid==="st3_3"||e.bid==="st10_1")?3:4;
    if(dt>=0&&dt<wd+.42){ const cw=ATK.width/N, ch=ATK.height, idx=dt<wd?(N===4&&dt>wd*.55?1:0):dt<wd+.2?N-2:N-1, FT=sheetFit(ATK,N), rh=h*.97/FT.cf, rw=rh*cw/ch, oy=-rh*FT.bot/ch;
      ctx.save(); ctx.translate(e.x,y0); ctx.scale(Math.sign(fs||1)*Math.max(.15,Math.abs(fs)),1); ctx.drawImage(ATK,idx*cw,0,cw,ch,-rw/2,oy,rw,rh);
      if(e.flash>0){ ctx.globalCompositeOperation="lighter"; ctx.globalAlpha=Math.min(.7,e.flash*4); ctx.drawImage(ATK,idx*cw,0,cw,ch,-rw/2,oy,rw,rh) } ctx.restore(); return true } }
  const RUN=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG["run_"+e.bid], HOV=RUN&&HOVER_RUN[e.bid], FLY=RUN&&((RIGS[e.bid]&&RIGS[e.bid].move==="fly")||HOV), moving=RUN&&!e.spin&&(FLY||(e._v||0)>18||e.dash>0)&&!(e.atk&&e.atk.t0!==undefined&&t-e.atk.t0<(e.atk.k==="axethrow"?(e.atk.wind||1)+2.95:(e.atk.wind||.4)+.3));
  if(moving){ const N=4, cw=RUN.width/N, ch=RUN.height, FT=sheetFit(RUN,N), rh=h*.97/FT.cf, rw=rh*cw/ch, oy=-rh*FT.bot/ch, idx=FLY?Math.floor(t*(HOV?HOV[0]:11)+e.wob*3)%N:Math.floor(((e._wph||t*8)/(Math.PI*2))*N*1.4)%N;
    ctx.save(); ctx.translate(e.x,y0-(HOV?HOV[1]+Math.sin(t*2.2+e.wob)*HOV[2]:0)); ctx.rotate(HOV?Math.sin(t*2.2+e.wob+1)*HOV[3]:0); ctx.scale(Math.sign(fs||1)*Math.max(.15,Math.abs(fs)),1); ctx.drawImage(RUN,idx*cw,0,cw,ch,-rw/2,oy,rw,rh);   // 승천한 아스라: 공중에서 둥실 굽이치며
    if(e.flash>0){ ctx.globalCompositeOperation="lighter"; ctx.globalAlpha=Math.min(.7,e.flash*4); ctx.drawImage(RUN,idx*cw,0,cw,ch,-rw/2,oy,rw,rh) } ctx.restore(); return true }
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
  const want=Math.abs(px-e.x)<e.r*.4?(e.fsw||1):(px<e.x?-1:1); e.fsw=want; e.fs=e.fs===undefined?want:e.fs+(want-e.fs)*.12;   // 보스 바로 위에 있으면 방향을 바꾸지 않아요 (납작해지는 문제)   // 방향을 휙 바꾸지 않고 스르르
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
/* 보스 기 모으기 · 내지르기 효과: 빛 알갱이가 빨려 들고 바닥 문양이 돌다가, 내지르는 순간 충격 고리와 먼지가 퍼져요 */
function bossChargeFx(ctx,e,t){ const A=e.atk; if(!A) return; const u=t-A.t0, W=A.wind, r=e.r, fy=e.y+r*.95, [cl]=BOSS_COL[e.mapId]||BOSS_COL[5];
  if(u<0||u>W+.4) return; ctx.save();
  if(u<W){ const k=u/W, sp=A.sp?1:.5;
    // 바닥 문양 (특수 공격만)
    if(A.sp){ ctx.globalAlpha=Math.min(1,k*2)*(.55+.2*Math.sin(t*12)); ctx.strokeStyle=`rgba(${cl},1)`; ctx.lineWidth=3; const R=r*(1.25+.25*k), sk=.38;
      ctx.beginPath(); ctx.ellipse(e.x,fy,R,R*sk,0,0,7); ctx.stroke(); ctx.lineWidth=1.6; ctx.setLineDash([R*.18,R*.1]); ctx.lineDashOffset=-t*R*.6; ctx.beginPath(); ctx.ellipse(e.x,fy,R*.8,R*.8*sk,0,0,7); ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); for(let i=0;i<6;i++){ const a=t*1.2+i*2.0944, b=a+2.0944; ctx.moveTo(e.x+Math.cos(a)*R*.8,fy+Math.sin(a)*R*.8*sk); ctx.lineTo(e.x+Math.cos(b)*R*.8,fy+Math.sin(b)*R*.8*sk) } ctx.stroke() }
    // 빨려 드는 빛 줄기
    ctx.globalAlpha=1; ctx.globalCompositeOperation="lighter"; const n=A.sp?12:6; ctx.lineCap="round";
    for(let i=0;i<n;i++){ const ph=(u*(1.6+sp)+i/n)%1, a=i*2.39996+e.wob, d=r*(2.7-2.1*ph), L=r*.32*(.5+ph);
      const cx=e.x, cy=e.y-r*.2, x1=cx+Math.cos(a)*d, y1=cy+Math.sin(a)*d*.75, x2=cx+Math.cos(a)*(d-L), y2=cy+Math.sin(a)*(d-L)*.75;
      ctx.strokeStyle=`rgba(${cl},${.75*ph*Math.min(1,k*3)})`; ctx.lineWidth=3.2*ph+.6; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      ctx.fillStyle=`rgba(255,255,255,${.8*ph*Math.min(1,k*3)})`; ctx.beginPath(); ctx.arc(x2,y2,1.4+ph*1.6,0,7); ctx.fill() } }
  else { const q=(u-W)/.4, R=r*(1.1+q*2.3), sk=.38;
    ctx.globalCompositeOperation="lighter"; ctx.strokeStyle=`rgba(${cl},${.8*(1-q)})`; ctx.lineWidth=10*(1-q)+1; ctx.beginPath(); ctx.ellipse(e.x,fy,R,R*sk,0,0,7); ctx.stroke();
    ctx.strokeStyle=`rgba(255,255,255,${.7*(1-q)})`; ctx.lineWidth=3*(1-q); ctx.beginPath(); ctx.ellipse(e.x,fy,R*.85,R*.85*sk,0,0,7); ctx.stroke();
    ctx.globalCompositeOperation="source-over";
    for(let i=0;i<8;i++){ const a=i*.785+.3, d=r*(.9+q*1.4); ctx.fillStyle=`rgba(190,180,165,${.38*(1-q)})`; ctx.beginPath(); ctx.arc(e.x+Math.cos(a)*d,fy+Math.sin(a)*d*sk-q*r*.25,r*(.12+q*.22),0,7); ctx.fill() } }
  ctx.restore() }
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
  // 땅속 잠행: 숨을 땐 땅 아래로 쑥 꺼지고, 나올 땐 땅을 뚫고 튀어나와요 (모든 친구 화면에서 똑같이)
  if(e.type==="boss"&&e.mapId===3&&!e._inner){ const hid=!!e.hidden; if(e._hidP===undefined) e._hidP=hid;
    if(hid!==e._hidP){ e._hidP=hid; if(hid){ e._sinkS=t } else { e._riseS=t } if(typeof g==="undefined"||true){ try{ (window.__fxPush||(()=>{}))({k:"sandburst",x:e.x,y:e.y+e.r*.9,r:e.r*(hid?1.4:2.2),big:!hid,life:hid?.7:.9,max:hid?.7:.9}) }catch(_){} } } }
  // 고대 거북 등껍질 돌진: 몸은 숨고 등껍질만 팽이처럼 돌아요 + 돌 조각 회오리 + 바닥 긁힌 자국 (그림 2장뿐이라 가벼워요)
  if(e.type==="boss"&&e.spin&&e.mapId===3&&!e.hidden&&!e._inner&&typeof SKILL_IMG!=="undefined"&&SKILL_IMG.turtleshell){ const SH=SKILL_IMG.turtleshell, RW=SKILL_IMG.rockwhirl, fy=e.y+e.r*.95, mv=Math.hypot(e.x-(e._sx??e.x),e.y-(e._sy??e.y)); e._sx=e.x; e._sy=e.y;
    if(mv>4&&(e._stT=(e._stT||0)+1)%3===0) try{ (window.__fxPush||(()=>{}))({k:"sandtrail",x:e.x,y:fy,r:e.r*1.1,life:1.4,max:1.4,a:Math.random()*6}) }catch(_){}
    const Ws=e.r*3, Hs=Ws*SH.height/SH.width, Wr=e.r*4.2, Hr=Wr*RW.height/RW.width;
    ctx.save(); ctx.fillStyle="rgba(40,30,20,.3)"; ctx.beginPath(); ctx.ellipse(e.x,fy,e.r*1.5,e.r*.42,0,0,7); ctx.fill();
    // 뒤쪽 회오리 (위 절반)
    ctx.save(); ctx.beginPath(); ctx.rect(e.x-Wr,fy-Hs*1.4,Wr*2,Hs*.9); ctx.clip(); ctx.translate(e.x,fy-Hs*.45); ctx.scale(1,1); ctx.rotate(Math.sin(t*2)*.05); ctx.drawImage(RW,-Wr/2,-Hr/2,Wr,Hr); ctx.restore();
    // 등껍질: 옆으로 빙글빙글 (가로로 납작해졌다 펴지며 회전)
    const ph=t*14, sx=.82+.18*Math.abs(Math.cos(ph)); ctx.save(); ctx.translate(e.x,fy); ctx.rotate(Math.sin(ph)*.12); ctx.scale(sx*(Math.cos(ph)>=0?1:-1),1); ctx.drawImage(SH,-Ws/2,-Hs*.98,Ws,Hs); ctx.restore();
    // 앞쪽 회오리 (아래 절반)
    ctx.save(); ctx.beginPath(); ctx.rect(e.x-Wr,fy-Hs*.5,Wr*2,Hs); ctx.clip(); ctx.translate(e.x,fy-Hs*.45); ctx.rotate(Math.sin(t*2)*.05); ctx.drawImage(RW,-Wr/2,-Hr/2,Wr,Hr); ctx.restore();
    ctx.restore(); if(e.flash>0){} return }
  if(e.type==="boss"&&e.hidden){ const sp=t-(e._sinkS??-9);
    if(sp<.4){ const p=Math.min(1,sp/.35), fy=e.y+e.r*.95; ctx.save(); ctx.beginPath(); ctx.rect(e.x-e.r*6,fy-e.r*8,e.r*12,e.r*8); ctx.clip(); ctx.translate((Math.random()-.5)*4,p*p*e.r*3.4); e.hidden=false; e._inner=1; drawMonster(ctx,e,t,px,py); e._inner=0; e.hidden=true; ctx.restore() }
    drawBossMound(ctx,e,t,Math.min(1,sp/.4)); return }
  if(e.type==="boss"&&e._riseS!==undefined&&t-e._riseS<.32){ const p=(t-e._riseS)/.32, fy=e.y+e.r*.95, up=1-Math.pow(1-p,3); ctx.save(); ctx.beginPath(); ctx.rect(e.x-e.r*6,fy-e.r*8,e.r*12,e.r*8); ctx.clip(); ctx.translate(0,(1-up)*e.r*3.4-Math.sin(p*Math.PI)*e.r*.5); const R=e._riseS; e._riseS=undefined; e._inner=1; drawMonster(ctx,e,t,px,py); e._inner=0; e._riseS=R; ctx.restore(); return }
  if(e.type==="boss"&&(e.air||e.airH>0)){ const h=e.airH!==undefined&&e.airH>0?e.airH:70; ctx.save(); ctx.fillStyle="rgba(0,0,0,.28)"; ctx.beginPath(); ctx.ellipse(e.x,e.y+e.r*.95,e.r*(1.1-h/400),e.r*.35*(1.1-h/400),0,0,7); ctx.fill(); ctx.restore(); ctx.save(); ctx.translate(0,-h); }
  if(e.type==="boss"){ const Q=bossPose(e,t,px); if(e.spin){ const cs=Math.cos(t*15); Q.sx*=Math.sign(cs||1)*Math.max(.25,Math.abs(cs)); Q.oy=(Q.oy||0)-Math.abs(Math.sin(t*15))*e.r*.12 } bossUnder(ctx,e,t);
    if(Q.glow>0){ const [cl]=BOSS_COL[e.mapId]||BOSS_COL[5]; ctx.save(); ctx.globalCompositeOperation="lighter"; const g=ctx.createRadialGradient(e.x,e.y,e.r*.2,e.x,e.y,e.r*2.2); g.addColorStop(0,`rgba(${cl},${.4*Q.glow})`); g.addColorStop(1,`rgba(${cl},0)`); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(e.x,e.y,e.r*2.2,0,7); ctx.fill(); ctx.restore() }
    bossChargeFx(ctx,e,t);
    const fy=e.y+e.r*.95; ctx.save(); ctx.translate(e.x+Q.ox,fy+Q.oy); ctx.rotate(Q.rot); ctx.scale(Q.sx,Q.sy); ctx.translate(-e.x,-fy);
    e._pose=Q; drawMonsterRaw(ctx,e,t,px,py,true); ctx.restore(); bossOver(ctx,e,t,!!artOf(e)); bossWarn(ctx,e,t);
    if(e.dizzy>0||e.dizzyF) drawDizzy(ctx,e,t); if(e.air||e.airH>0) ctx.restore(); return }
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
  snail:["scuttle",2.3,1], stump:["march",2.9,0], turtle:["trot",2.3,1], troll:["march",3.4,1], knight:["march",3.7,1],
  rider:["trot",3.1,1], engine:["float",2.6,0], devourer:["sway",3.6,1], ruler:["march",3.5,0], behemoth:["march",2.9,1] };
const MOB_STYLE_MAP={"8:crystal":["float",3.1,0]};   // 같은 모양 이름이라도 맵마다 다르게
const mobArtOf=e=>{ loadMobArt(); return MOB_ART[e.mapId+":"+e.look] };
const MOB_RIM={1:"rgba(255,255,235,.38)",2:"rgba(255,232,180,.5)",3:"rgba(60,25,10,.45)",4:"rgba(225,210,255,.42)",5:"rgba(255,190,120,.4)",6:"rgba(230,250,255,.45)",7:"rgba(40,50,80,.35)",8:"rgba(20,50,90,.4)",9:"rgba(60,40,20,.35)",10:"rgba(205,160,255,.95)"};   // 바닥에 묻히지 않게 몸 둘레에 밝은 테두리
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
    else if(e.look==="acorn"){ ax=ux*r*(k<0?.35:1.1)*k; ay=uy*r*.5*k; rot+=sd*(k<0?-.12:.05)*Math.abs(k); e._thr=k>.6?k:0 }   // 도토리 병정: 창을 뒤로 당겼다가 앞으로 쭉 찌르기
    else { rot+=sd*(k<0?.35:-.55)*Math.abs(k); ax=ux*r*.4*k }                                                        // 무기 들었다가 내려치기
  }
  sx*=pop*(1+rec*.18); sy*=pop*(1-rec*.15);
  const f=fc? (px<e.x?-1:1)*fc : 1, gy=e.y+r*.95;
  const sh=Math.max(.45,1-lift/(r*2.5)); ctx.fillStyle="rgba(0,0,0,.3)"; ctx.beginPath(); ctx.ellipse(e.x,gy,W*.36*sh*pop,r*.32*sh*pop,0,0,7); ctx.fill();
  ctx.save(); ctx.imageSmoothingEnabled=true; ctx.translate(e.x+ax,gy-lift+ay); if(rot) ctx.rotate(rot); ctx.scale(sx*f,sy);
  { const S=mobScaled(A,MOB_RIM[e.mapId],H), k=W/A.im.width, p=(A.rimP||0)*k; ctx.drawImage(S,-W/2-p,-H-p,W+p*2,H+p*2) }
  if(e.flash>0){ ctx.globalAlpha=Math.min(.85,e.flash*7); ctx.drawImage(mobArtImg(A,0,1),-W/2,-H,W,H) }
  ctx.restore();
  if(e._thr>0){ const ux=(px-e.x), uy=((py===undefined?e.y:py)-e.y), d=Math.hypot(ux,uy)||1, sx=e.x+ux/d*r*1.4, sy=e.y-r*.4+uy/d*r*.9, al=(e._thr-.6)/.4;   // 창끝 섬광
    ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.strokeStyle=`rgba(255,240,200,${al})`; ctx.lineWidth=3; ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(sx-ux/d*r*.9,sy-uy/d*r*.6); ctx.lineTo(sx+ux/d*r*.5,sy+uy/d*r*.3); ctx.stroke();
    ctx.fillStyle=`rgba(255,255,230,${al})`; ctx.beginPath(); ctx.arc(sx+ux/d*r*.5,sy+uy/d*r*.3,4,0,7); ctx.fill(); ctx.restore() }
  return true }
function drawMonsterRaw(ctx,e,t,px,py,posed){
  if(!isFinite(e.r)||!isFinite(e.x)||!isFinite(e.y)) return;   // 잘못된 값이 있으면 그리지 않아요 (화면 전체가 멈추지 않게)
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
  1:[ {k:[["shellroll","껍데기 굴리기"],["summon","새끼 달팽이 부르기"]], sig:"🐌 껍데기 속에 숨어 데굴데굴 세 번 굴러와요. 굴러올 길이 빨간 띠로 보이니 옆으로 비켜요!"},
      {k:[["dash","독침 돌진"],["beeswarm","벌떼 추격"],["summon","벌떼 부르기"]], sig:"🐝 벌 여섯 마리가 빠르게 나를 쫓아와요. 크게 원을 그리며 달리면 따돌릴 수 있어요!"},
      {k:[["spore","독 포자"],["bigjump","점프 내려찍기"],["ring","독액 분출"],["summon","슬라임 분열"]], split:1, sig:"💚 높이 뛰어올라 내 자리에 쿵! 빨간 원에서 나와요. 체력이 절반이 되면 작은 슬라임 둘로 갈라져요."},
      {k:[["ring","꽃잎 폭풍"],["bigjump3","왕의 3연속 점프"],["spore","꽃가루 독"],["orbs","꽃의 구슬"],["summon","왕실 슬라임"]], ult:["nova","꽃왕관의 대축제"], sig:"👑 세 번 연속으로 뛰어올라 내려찍어요. 빨간 원이 생기면 계속 옮겨 다녀요!"} ],
  2:[ {k:[["spearthrust","창 찌르기"],["acornroll","도토리 굴리기"],["dash","도토리 창 돌격"],["spearthrust","창 찌르기"],["summon","도토리 병사 부르기"]], sig:"🌰 큰 도토리가 여러 줄로 굴러와요. 빨간 띠가 없는 빈 줄로 피해요!"},
      {k:[["boarcharge","3연속 돌진"],["stomp","땅 박치기"],["rock","돌 차올리기"]], sig:"🐗 세 번 연속으로 돌진해요. 다 돌진하면 어지러워서 잠깐 멈춰요. 그때가 공격 기회!"},
      {k:[["spore","포자 구름"],["orbs","빛나는 포자"],["mushfield","버섯 고리"],["summon","버섯 부르기"]], sig:"🍄 내 주위에 버섯이 동그랗게 자라나 펑 터져요. 가운데에 가만히 있으면 안전해요!"},
      {k:[["rootcross","뿌리 솟구치기"],["ring","잎사귀 폭풍"],["orbs","씨앗 폭탄"],["laser","덩굴 채찍"],["summon","숲의 부름"]], ult:["spiral","천년 숲의 분노"], sig:"🌳 보스에게서 여섯 갈래로 뿌리가 솟아요. 빨간 줄 사이 빈 곳으로 피해요!"} ],
  3:[ {k:[["orbs","저주 연기"],["jarbomb","항아리 던지기"],["summon","깨진 항아리 부르기"]], sig:"🏺 항아리를 던져요. 떨어진 곳에서 저주 연기가 터지니 빨간 원에서 나와요!"},
      {k:[["burrow","모래 잠행"],["fire3","독침 연사"],["stomp","모래 폭풍"]], sig:"🦂 모래 속에 숨어 나를 따라와요. 모래 둔덕이 멈추면 바로 피해요! 튀어나온 뒤엔 잠깐 어지러워해요."},
      {k:[["shellspin","등껍질 팽이"],["stomp","대지 울림"],["meteor","유적 낙석"],["ring","보랏빛 균열"]], sig:"🐢 등껍질 속에 숨어 빙글빙글 돌며 천천히 쫓아오고 돌 조각을 뿌려요. 계속 움직여요! 다 돌고 나면 어지러워해요."},
      {k:[["fire5","불꽃 갈기"],["dash","신수 돌진"],["meteor","하늘불 낙하"],["laser","해태의 눈빛"],["maneflame","불꽃 갈기 안팎"]], ult:["nova","해태의 심판"], sig:"🔥 '멀리!'가 뜨면 보스에게서 떨어지고, '가까이!'가 뜨면 보스 곁으로 가요. 불꽃이 안쪽, 바깥쪽 차례로 터져요!"} ],
  4:[ {k:[["orbs","수정 조각"],["crystalbeam","수정 기둥 광선"],["summon","수정 요정 부르기"]], sig:"💎 내 주위에 수정 기둥이 솟아 빛줄기를 쏴요. 빨간 줄이 보이면 줄 밖으로 비켜요!"},
      {k:[["dash","거미 도약"],["webtrap","거미줄 던지기"],["orbs","독 알"],["summon","새끼 거미"]], sig:"🕸 거미줄 뭉치를 던져요. 바닥에 남은 거미줄을 밟으면 느려지니 돌아서 가요!"},
      {k:[["dash","어둠 활강"],["batring","박쥐 고리"],["orbs","박쥐 떼 구슬"],["ring","어둠의 날갯짓"],["summon","박쥐 떼"]], sig:"🦇 박쥐 떼가 나를 동그랗게 둘러싸고 점점 좁혀 와요. 박쥐가 없는 빈틈으로 빠져나가요!"},
      {k:[["pearlbounce","튕기는 여의주"],["ring","똬리 휘감기"],["meteor","수정 가시"],["dash","꼬리 휘두르기"],["spiral","수정 소용돌이"],["orbs","수정 구슬"]], ult:["cross","여의주 대폭발"], sig:"🔮 커다란 여의주가 벽에 튕기며 이리저리 날아다녀요. 여의주가 오는 방향을 보고 피해요!"} ],
  5:[ {k:[["dash","불꽃 돌진"],["ghosthounds","유령 사냥개"],["summon","사냥개 부르기"]], sig:"🐺 세 방향에서 유령 사냥개가 일직선으로 달려와요. 빨간 줄이 보이면 줄 밖으로 비켜요!"},
      {k:[["dash","흑검 돌격"],["triplecleave","3연속 부채 베기"],["stomp","대검 내려찍기"],["ring","검기 폭풍"]], sig:"⚔ 부채 모양으로 세 번 베어요. 빨간 부채가 보이면 보스 뒤쪽이나 옆으로 돌아가요!"},
      {k:[["fire5","화염 폭풍"],["meteor","화염 낙하"],["orbs","도깨비 불꽃"],["firetiles","바둑판 불기둥"],["summon","임프 부르기"]], sig:"🔥 바닥이 바둑판처럼 번갈아 불타요. 빨간 칸이 보이면 빈 칸으로 옮겨요. 두 번 터져요!"},
      {k:[["fire5","지옥불"],["laser","파멸의 광선"],["meteor","운석 비"],["safezone","진홍의 피난처"],["ring","마왕의 포효"],["orbs","지옥 구슬"],["summon","마왕군 소환"]], ult:["nova","진홍의 종말"], sig:"☄ 빛나는 원이 하나 생기고 하늘에서 불이 쏟아져요. 시간이 끝나기 전에 빛나는 원 안으로 들어가요!"} ],
  6:[ {k:[["orbs","바람 구슬"],["vortex","빨아들이는 회오리"],["dash","돌풍 비행"]], sig:"🌪 회오리가 생겨 나를 빨아들여요. 회오리 반대쪽으로 계속 걸어요!"},
      {k:[["dash","폭풍 돌진"],["stomp","천둥 짓밟기"],["stormcloud","따라오는 먹구름"],["ring","먹구름 폭발"]], sig:"⛈ 먹구름이 내 머리 위에 생겨 번개를 내려요. 그림자가 생기면 바로 자리를 옮겨요! 세 번 따라와요."},
      {k:[["spinbeam","회전 번개 빛줄기"],["spiral","눈의 소용돌이"],["meteor","번개 비"],["orbs","폭풍 구슬"],["ring","회오리 깃털"]], sig:"⚡ 번개 빛줄기가 시계처럼 빙글빙글 돌아요. 멀리 떨어지거나 빛줄기와 같은 방향으로 돌며 피해요!"},
      {k:[["dash","천풍 강하"],["laser","뇌광 깃털"],["spiral","대회오리"],["meteor","천둥 낙뢰"],["quadstrike","네 구역 낙뢰"],["orbs","폭풍 구슬"],["ring","폭풍의 날개"]], ult:["storm","천풍 대폭풍"], sig:"⚡ 보스 주위가 네 구역으로 나뉘고 초록색 한 곳만 안전해요. 초록 구역으로 들어가요! 두 번 반복돼요."} ],
  7:[ {k:[["laser","가면의 눈빛"],["orbs","빛의 머리칼"],["lightmirror","빛의 거울"]], sig:"🪞 내 주위에 빛의 거울이 생겨 차례로 빛줄기를 쏴요. 빨간 줄이 보이면 줄 밖으로 비켜요!"},
      {k:[["skydive","하늘 급강하"],["fire5","빛의 발톱"],["laser","날개 광선"],["meteor","빛 낙하"]], sig:"🪽 하늘로 날아올라 그림자가 나를 따라와요. 그림자가 멈추면 바로 옆으로 비켜요!"},
      {k:[["stomp","석상 내려찍기"],["ring","빛의 충격파"],["pillarline","석상 기둥 무너뜨리기"],["spiral","황금 소용돌이"],["dash","거인 돌진"]], sig:"🗿 나를 향해 두 줄로 돌기둥이 차례차례 솟아요. 두 줄 사이나 바깥으로 피해요!"},
      {k:[["laser","빛의 검"],["holyswords","빛의 검 십자"],["fire5","빛의 창"],["meteor","천상 포격"],["spiral","수호 결계"],["dash","수문장 돌격"],["ring","빛의 머리칼"]], ult:["nova","수문장의 심판"], sig:"⚔ 보스에게서 빛의 검이 십자(+) 모양, 그다음 X 모양으로 꽂혀요. 줄 사이 빈 곳으로 옮겨요!"} ],
  8:[ {k:[["dash","얼음 송곳니"],["wolflanes","늑대 무리 질주"],["summon","늑대 부르기"]], sig:"🐺 얼음 늑대들이 여러 줄로 달려와요. 빨간 줄이 없는 빈 줄로 피해요!"},
      {k:[["stomp","얼음 주먹"],["snowroll","거대 눈덩이 굴리기"],["meteor","고드름 낙하"],["dash","설인 돌진"]], sig:"⛄ 커다란 눈덩이가 벽에 튕기며 점점 커져요. 눈덩이가 오는 방향을 보고 피해요!"},
      {k:[["frostmine","얼음 결정 폭발"],["meteor","빙결 낙하"],["laser","빙결 광선"],["orbs","얼음 구슬"],["ring","눈보라"]], sig:"❄ 내 자리와 주위에 얼음 결정이 박히고 십자(+) 모양으로 터져요. 결정과 빨간 줄에서 비스듬히 피해요!"},
      {k:[["breathsweep","냉기 브레스 휩쓸기"],["cross","여의주 냉광"],["spiral","오로라 소용돌이"],["meteor","고드름 폭우"],["dash","승천의 돌진"],["orbs","얼음 여의주"],["ring","눈보라 날개"]], ult:["storm","천공 대빙결"], sig:"🐉 얼음 숨결이 부채 모양으로 휩쓸어요. 빨간 부채 밖으로 나가거나 보스 뒤로 돌아가요!"} ],
  9:[ {k:[["stomp","석사자 포효"],["lionroar","사자후 3연발"],["rock","석상 조각"],["summon","새끼 사자 부르기"]], sig:"🦁 나를 향해 부채 모양으로 세 번 포효해요. 빨간 부채가 보일 때마다 옆으로 비켜요!"},
      {k:[["orbs","번개 북 구슬"],["drumtiles","북소리 낙뢰"],["spiral","북 고리 회전"],["dash","구름 타기"]], sig:"🥁 북소리에 맞춰 바닥 칸마다 번개가 떨어져요. 세 번 모양이 바뀌니 빈 칸으로 계속 옮겨요!"},
      {k:[["thunderdash","천둥 질주"],["laser","기린의 뿔빛"],["meteor","번개 발굽"],["spiral","번개 갈기"],["ring","천둥 울림"]], sig:"⚡ 세 번 돌진하고 지나간 길에 번개가 터져요. 돌진한 길에서 비켜요! 다 끝나면 어지러워해요."},
      {k:[["meteor","번개 망치"],["tribeam","뇌신의 삼지창 번개"],["laser","천둥 광선"],["spiral","북 고리 폭풍"],["stomp","망치 내려치기"],["ring","천둥 북"],["orbs","뇌전 구슬"]], ult:["storm","신의 심판"], sig:"⚡ 번개 빛줄기 세 개가 보스 둘레를 천천히 돌아요. 빛줄기 사이 빈 곳을 따라 함께 돌아요!"} ],
  10:[ {k:[["dash","공허 할퀴기"],["fire5","별불꽃 날개"],["voidclaw","차원 가르기"],["summon","별 부스러기"]], sig:"🌌 내 자리를 지나는 세 줄로 공간이 갈라져요. 줄이 차례로 터지니 빈 곳으로 옮겨요!"},
      {k:[["dash","성운 돌진"],["axethrow","별 도끼 던지기"],["orbs","별 구슬"],["meteor","성운 낙하"],["laser","도끼 광선"]], sig:"🪓 별 도끼를 던졌다가 다시 받아요. 빨간 줄 밖으로 피하고 돌아올 때도 조심해요!"},
      {k:[["planetring","행성 고리"],["meteor","별똥별 낙하"],["orbs","중력 구슬"],["laser","천체 광선"],["cross","별자리 십자"],["ring","성좌 폭발"]], sig:"🪐 행성들이 고리 모양으로 보스에게서 퍼져 나가요. 초록색 빈틈으로 빠져나가요!"},
      {k:[["eventhorizon","사건의 지평선"],["laser","종언의 낫"],["cross","종언의 십자"],["spiral","은하 소용돌이"],["meteor","별 비"],["nova","별의 소멸"],["orbs","공허 구슬"],["summon","지난 보스 불러내기"]], ult:["storm","우주의 종언"], sig:"🌀 내 발밑에 블랙홀이 생겨 끌어당기고 충격파가 세 번 퍼져요. 바깥으로 걷다가 보라 원이 뜨면 크게 터지니 원 밖으로!"} ],
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
  st1_3:{move:"squash", parts:[]},   /* 꽃왕관이 몸에서 떨어져 보이지 않게 한 덩어리로 출렁여요 */
  st2_0:{move:"walk", parts:[{t:"spear",poly:R_(7.2,0,10,10),piv:[8.3,6.1]},{t:"arm",side:"L",poly:R_(0,5,4,9.6),piv:[3.4,5.6],small:1}]},
  st2_1:{move:"gallop", parts:[{t:"leg",z:-1,poly:R_(1,7.2,4.6,10),piv:[3,7.2],ph:.5},{t:"leg",poly:R_(5.6,7.4,8.4,10),piv:[6.8,7.4]},{t:"tail",poly:R_(0,2.4,2.2,6.2),piv:[2,5]},{t:"head",poly:R_(7.2,2.4,10,7.4),piv:[7.2,5.4]}]},
  st2_2:{move:"waddle", parts:[]},   /* 버섯 갓·팔이 네모로 잘려 보이지 않게 한 덩어리로 뒤뚱 */
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
  st10_3:{move:"hover", parts:[]},   /* 새 고해상도 그림: 한 덩어리로 둥실 */
};
/* 조각 만들기: 그림이 불러와지면 한 번만 (몸통에서 조각 부분을 지우고, 조각은 따로 잘라 둬요) */
function buildRig(key,A){ const R=RIGS[key]; if(!R||A.rig) return; const im=A.im, W=im.width, H=im.height, sx=W/10, sy=H/10;
  // 두 발로 걷는 보스인데 다리 조각이 없으면: 그림 아래쪽을 왼발·오른발로 나눠 자동으로 다리를 만들어요
  // 네 발(말달리기·네 발 걷기)·뒤뚱·기어가기 보스도 아래쪽을 조각내 다리처럼 번갈아 내딛어요 (조각 몇 개라 렉 영향 거의 없음)
  const GM={walk:1,heavy:1,quad:1,gallop:1,waddle:1,crawl:1};
  if(GM[R.move]&&!R.noLeg&&!R.parts.some(p=>p.t==="leg")&&!R._auto){ R._auto=1;
    try{ const c=document.createElement("canvas"); c.width=W; c.height=H; const x=c.getContext("2d"); x.drawImage(im,0,0); const y0=Math.floor(H*.8), d=x.getImageData(0,y0,W,H-y0).data;
      let mn=W, mx=0, sw=0, sxw=0; for(let yy=0;yy<H-y0;yy++) for(let xx=0;xx<W;xx++){ const a=d[(yy*W+xx)*4+3]; if(a>120){ if(xx<mn) mn=xx; if(xx>mx) mx=xx; sw+=a; sxw+=a*xx } }
      if(sw>0&&mx-mn>W*.12){ const mid=sxw/sw/sx, l=Math.max(0,mn/sx-.1), r=Math.min(10,mx/sx+.1), hip=7.7;
        if(R.move==="crawl"){ const n=4, w=(r-l)/n, h2=8.3; for(let i=0;i<n;i++) R.parts.push({t:"leg",poly:R_(l+w*i,h2,l+w*(i+1),10),piv:[l+w*(i+.5),h2],ph:i%2,auto:1,amp:.6}) }
        else if(R.move==="quad"||R.move==="gallop"){ const hip2=7.9; R.parts.push({t:"leg",poly:R_(l,hip2,mid,10),piv:[(l+mid)/2,hip2],auto:1,amp:1.2},{t:"leg",poly:R_(mid,hip2,r,10),piv:[(mid+r)/2,hip2],ph:1,auto:1,amp:1.2}) }
        else R.parts.push({t:"leg",poly:R_(l,hip,mid,10),piv:[(l+mid)/2,hip],auto:1,amp:R.move==="waddle"?.8:1},{t:"leg",poly:R_(mid,hip,r,10),piv:[(mid+r)/2,hip],ph:1,auto:1,amp:R.move==="waddle"?.8:1}) } }catch(err){} }
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
  else if(p.t==="leg"){ const k=Math.min(1,mv*1.2), amp=(st.gallop?36:p.auto?15:22)*k*am, sw=Math.sin(st.walk+ph), lift=Math.max(0,Math.cos(st.walk+ph)); rot=amp*sw*D+(st.gallop?lift*8*D*k:0); dy-=lift*(p.auto?11:8)*k*(st.gallop?1.4:1); if(p.auto) dx+=sw*7*k;
    if(on("leg")) rot+=(-W*24+H*16)*D*am*(p.z===-1?.5:1) }
  else if(p.t==="tail"){ rot=8*Math.sin(t*2.4+ph)*D*am;
    if(on("tail")){ if(p.thrust) dy+=-W*12+H*30; else rot+=(p.strike?(-W*28+H*55):(W*22-H*38)*am)*D+tr } }
  else if(p.t==="head"){ rot=2.5*Math.sin(t*1.8)*D+(mv>.2?2*Math.sin(st.walk*2)*D:0);
    if(on("head")){ rot+=(-W*7+H*10)*D+tr; dx+=-W*3+H*8 } }
  else if(p.t==="cap"){ rot=3*Math.sin(t*1.5+ph)*D; dy=Math.sin(t*2)*2; if(on("cap")){ dy+=-W*7+H*5; rot+=H*5*D+tr; sc=1+W*.05 } }
  else if(p.t==="arm"){ const amp=p.small?6:12; rot=sd*amp*Math.sin(st.walk+ph+(p.side==="L"?0:Math.PI))*D*Math.min(1,mv+.3)*am;
    if(on("arm")){ if(p.punch||A.mel){ rot+=sd*(W*48-H*78)*D+tr; dx+=(-W*6+H*20)*(p.side==="L"?-1:1); dy+=-W*8+H*8 } else { rot+=sd*(W*55-H*16)*D+tr; dy+=-W*10 } } }
  else if(p.t==="weapon"){ rot=sd*-3*Math.sin(t*1.6)*D;
    if(on("weapon")){ if(p.cast){ rot+=sd*(W*16-H*8)*D+tr; dy+=-W*12+H*4 }
      else if(p.hammer){ rot+=sd*(W*85-H*115)*D+tr; dy+=-W*14+H*12 }
      else if(A.mel){ rot+=sd*(W*70-H*120)*D+tr; dx+=-W*8+H*14 }
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
  st1_0:["head","head"], st1_1:["tail","wing"], st1_2:["arm","arm"], st1_3:["",""],
  st2_0:["weapon","weapon,arm"], st2_1:["head,leg","head"], st2_2:["",""], st2_3:["arm","cap,arm"],
  st3_1:["tail,arm","tail"], st3_2:["head","head"], st3_3:["head,leg","head,tail"],
  st4_0:["arm","arm"], st4_2:["wing,tail","wing"], st4_3:["head","float,head"],
  st5_0:["head,leg","head,tail"], st5_1:["weapon","weapon"], st5_2:["wing","wing"],
  st6_0:["wing,tail","wing"], st6_1:["head,leg,wing","wing,head"], st6_2:["wing,pulse","pulse,wing"], st6_3:["wing,tail","wing,tail"],
  st7_1:["wing,tail","wing"], st7_2:["arm","arm"],
  st8_0:["head,leg","head,tail"], st8_1:["arm","arm"], st8_2:["weapon","weapon"], st8_3:["head","float,head"],
  st9_0:["head","head,tail"], st9_1:["float","float"], st9_2:["head,leg","head,tail"], st9_3:["weapon","weapon"],
  st10_0:["wing,leg,tail","wing"], st10_2:["weapon,float","weapon,float"], st10_3:["",""] };
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
    // 명암: 위·왼쪽은 살짝 밝게, 아래·오른쪽은 살짝 어둡게 (빛이 왼쪽 위에서 비쳐요)
    x.globalCompositeOperation="source-atop"; const gd=x.createLinearGradient(W*.15,0,W*.85,H); gd.addColorStop(0,"rgba(255,248,225,.16)"); gd.addColorStop(.45,"rgba(255,255,255,0)"); gd.addColorStop(1,"rgba(20,15,40,.22)"); x.fillStyle=gd; x.fillRect(0,0,W,H);
    const gb=x.createLinearGradient(0,H*.6,0,H); gb.addColorStop(0,"rgba(0,0,0,0)"); gb.addColorStop(1,"rgba(10,8,20,.18)"); x.fillStyle=gb; x.fillRect(0,0,W,H); x.globalCompositeOperation="source-over";
    // 림 라이트: 그림 테두리를 따라 은은하게 빛나는 윤곽 (뒤에 깔아요)
    const rim=document.createElement("canvas"); rim.width=W; rim.height=H; const rx=rim.getContext("2d"); { // 흐릿한 기운(빛 번짐)은 빼고 진한 몸통 윤곽만 림 라이트로 써요
      const hc=document.createElement("canvas"); hc.width=W; hc.height=H; const hx=hc.getContext("2d"); hx.drawImage(img,0,0); const id=hx.getImageData(0,0,W,H), q=id.data; for(let i=3;i<q.length;i+=4) q[i]=q[i]>215?255:0; hx.putImageData(id,0,0);
      rx.filter="blur(3px)"; rx.drawImage(hc,0,0); rx.filter="none" } rx.globalCompositeOperation="source-in"; rx.fillStyle="#fff2cf"; rx.fillRect(0,0,W,H);
    img=c;
    const d=x.getImageData(0,0,W,H).data; let top=H, bot=0; for(let y=0;y<H;y++) for(let i=0;i<W;i+=2) if(d[(y*W+i)*4+3]>100){ if(y<top) top=y; if(y>bot) bot=y; break }
    const hip=Math.round(top+(bot-top)*.74), y0=Math.round(top+(bot-top)*.86); let sw=0,sx=0,mn=W,mx=0; for(let y=y0;y<=bot;y++) for(let i=0;i<W;i++){ const a=d[(y*W+i)*4+3]; if(a>120){ sw+=a; sx+=a*i; if(i<mn) mn=i; if(i>mx) mx=i } }
    const mid=sw?sx/sw:W/2, ov=Math.round((bot-top)*.03);
    const cut=(x0,y0_,x1,y1)=>{ const cv=document.createElement("canvas"); cv.width=W; cv.height=H; const cx=cv.getContext("2d"); cx.save(); cx.beginPath(); cx.rect(x0,y0_,x1-x0,y1-y0_); cx.clip(); cx.drawImage(img,0,0); cx.restore(); return cv };
    const R={W,H,hip,mid,bot,lp:(mn+mid)/2,rp:(mid+mx)/2,upper:cut(0,0,W,hip+ov),legL:cut(0,hip,mid,H),legR:cut(mid,hip,W,H),full:c,rim};
    // 발밑이 아주 넓은 그림(뒤에 기운·망토·원판이 붙은 그림)은 다리를 따로 흔들지 않고 몸 전체로 걸어요 (종이처럼 펄럭이지 않게)
    R.noLeg=(mx-mn)>W*.66;
    // 다리를 돌려도 틈이 안 보이게: 허리 아래 그림을 흐리게 깔아 둬요
    const base=document.createElement("canvas"); base.width=W; base.height=H; const bx=base.getContext("2d"); bx.filter="blur(2px) brightness(.7)"; bx.drawImage(cut(0,hip-2,W,hip+(bot-hip)*.45),0,0); R.base=base;
    return HRIG[key]=R }catch(e){ return HRIG[key]=null } }
const HERO_POSE={ // [준비 시간 비율, 준비: 각도·앞뒤·위아래·가로늘림, 공격: 각도·앞뒤·위아래·가로늘림]
  // 공격 동작을 더 크게: 크게 젖혔다가(준비) → 몸 전체로 휙 내지르기(공격)
  sword:[.34,-16,-8,-1,.92, 21,15,0,1.15], arrow:[.55,-7,-7,0,.96, 4,3,0,1.04], star:[.3,-18,-5,-2,.93, 24,12,0,1.13], fireball:[.45,-9,-4,-9,.94, 13,12,0,1.1], gun:[0,0,0,0,1, -11,-8,-1,.95], moon:[.4,-8,-4,-8,.95, 10,8,0,1.07], brush:[.3,-19,-7,-1,.92, 24,14,0,1.15], charm:[.3,-16,-5,-2,.94, 20,10,0,1.1], punch:[.26,-6,-11,0,.93, 8,19,0,1.18] };
/* 4차 용사 공격 그림(4장면): 기본 공격 순간 0.44초 동안 장면을 넘기며 실제로 휘두르고 쏴요 */
function heroBB(img){ if(img.__bb) return img.__bb; try{ const W=64, H=64, c=document.createElement("canvas"); c.width=W; c.height=H; const x=c.getContext("2d"); x.drawImage(img,0,0,W,H); const d=x.getImageData(0,0,W,H).data; let t=H, b=0;
  for(let y=0;y<H;y++) for(let i=0;i<W;i++) if(d[(y*W+i)*4+3]>60){ if(y<t) t=y; if(y>b) b=y }
  return img.__bb={h:Math.max(.3,(b-t+1)/H),b:(b+1)/H} }catch(e){ return img.__bb={h:.85,b:.97} } }
function drawHeroAtk(ctx,img,SZ,st){ const HK=st.hk&&typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG[st.hk]; const PE=Math.max(.3,Math.min(.44,(st._iv||.44)*.95)); if(!HK||!(st.at>=0&&st.at<PE)){ st._a=0; return false }
  /* 아주 빨리 쏘는 직업(궁수)은 공격이 계속 이어져서 첫 장면에 멈춰 보였어요 → 쏘는 동안 4장면을 계속 돌려요 */
  /* 4차처럼: 쏠 때마다 4장면을 한 번씩 (공격 간격에 맞춰 조금 빠르게) · 아주 빠르면(0.3초 미만) 0.3초 박자로 부드럽게 계속 돌려요 */
  const iv=st._iv||.44, PER=Math.max(.3,Math.min(.44,iv*.95)); st._a=(st._a||0)+Math.min(.05,st.dt||0); const loop=iv<.3&&st._a>st.at+.02, tt=loop?(st._a%PER)/PER:Math.min(.999,st.at/PER); if(loop) st._fastT=performance.now();
  const bb=heroBB(img), N=4, cw=HK.width/N, ch=HK.height, idx=Math.min(N-1,Math.floor(tt*N)), rh=SZ*bb.h*1.04, rw=rh*cw/ch, by=-SZ+4+SZ*bb.b;
  const mv=st.mv||0, ph=st.ph||0, bob=-Math.abs(Math.sin(ph))*5*mv, sway=Math.sin(ph)*.05*mv;   /* 걸으면서 쏠 때 몸이 통통 튀어요 */
  ctx.save(); ctx.translate(0,bob); ctx.rotate(sway); ctx.drawImage(HK,idx*cw,0,cw,ch,-rw/2,by-rh,rw,rh); ctx.restore(); return true }
function drawHeroRig(ctx,img,SZ,st){ /* 빨리 쏘는 직업(궁수·해적 등)이 걸을 때는 공격 그림 대신 걷는 몸 + 반동 자세로 (뛰면서 쏘는 느낌) */
  if(st.at>=0&&st._lat!==undefined&&st.at<st._lat-.005) st._iv=st._lat; st._lat=st.at;   /* 공격 간격을 재요 */
  const runShoot=false;   /* 4차처럼: 걸으면서도 공격 그림 그대로 (몸이 통통 튀며 쏴요) */
  if(!runShoot&&drawHeroAtk(ctx,img,SZ,st)) return; const R=heroRigOf(img); if(!R){ ctx.drawImage(img,-SZ/2,-SZ+4,SZ,SZ); return }
  const s=SZ/R.W, D=Math.PI/180, dt=Math.min(.05,st.dt||0);
  const S=st.S||(st.S={a:0,va:0,x:0,vx:0,y:0,vy:0,k:1,vk:0,l:0,vl:0,r:0,vr:0,ly:0,vly:0,ry:0,vry:0,h:[]});
  const SHT=!runShoot&&st.hk&&typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG[st.hk], mv=st.mv||0, ph=st.ph||0, P=HERO_POSE[st.kind], aq=SHT?-1:st.aq;   // 공격 그림이 있으면 몸 비틀기·잔상은 쓰지 않아요
  // 걷기 목표: 다리를 번갈아 내딛고 발 들기
  const tl=Math.sin(ph)*11*mv, tr=-Math.sin(ph)*11*mv, tly=-Math.max(0,-Math.cos(ph))*6*mv, try_=-Math.max(0,Math.cos(ph))*6*mv;
  // 공격 목표: 준비(젖히기) → 공격(휙 내지르기) → 스프링으로 출렁이며 제자리
  let ta=0, tx=0, ty=0, tk=1, K=130, Z=.55;
  if(P&&aq>=0){ if(aq<P[0]){ ta=P[1]; tx=P[2]; ty=P[3]; tk=P[4]; K=320; Z=.8 } else { ta=P[5]; tx=P[6]; ty=P[7]; tk=P[8]; K=650; Z=.32 } }
  if(dt>0){ const n=Math.ceil(dt/.006), h=dt/n, C=2*Math.sqrt(K)*Z, C2=2*Math.sqrt(240)*.55;
    for(let j=0;j<n;j++){ S.va+=(K*(ta-S.a)-C*S.va)*h; S.a+=S.va*h; S.vx+=(K*(tx-S.x)-C*S.vx)*h; S.x+=S.vx*h; S.vy+=(K*(ty-S.y)-C*S.vy)*h; S.y+=S.vy*h; S.vk+=(K*(tk-S.k)-C*S.vk)*h; S.k+=S.vk*h;
      S.vl+=(240*(tl-S.l)-C2*S.vl)*h; S.l+=S.vl*h; S.vr+=(240*(tr-S.r)-C2*S.vr)*h; S.r+=S.vr*h; S.vly+=(240*(tly-S.ly)-C2*S.vly)*h; S.ly+=S.vly*h; S.vry+=(240*(try_-S.ry)-C2*S.vry)*h; S.ry+=S.vry*h } }
  else if(st.dt===undefined){ S.a=ta; S.x=tx; S.y=ty; S.k=tk }
  const T=st.t||0, still=Math.max(0,1-mv*1.5), br=Math.sin(T*2.4)*.014*still, step=Math.abs(Math.cos(ph))*mv, bob=-step*2.2, sq=(1-step)*.02*mv;
  const NL=R.noLeg||st.kind==="star";   // 도적(표창)은 몸 전체로 사뿐사뿐 걸어요
  const body=(a,x,y,k,alpha)=>{ ctx.save(); if(alpha<1) ctx.globalAlpha*=alpha; ctx.translate(x,4+y+bob*(NL?1.6:1)); ctx.rotate(a*D+Math.sin(ph)*(NL?.012:.035)*mv); ctx.scale(k*(1-br*.5+sq),(1-(k-1)*.5)*(1+br-sq)); ctx.scale(s,s); ctx.translate(-R.W/2,-R.H);
    if(alpha>=1&&R.rim&&!window.__noRim){ ctx.save(); ctx.globalAlpha*=.55; ctx.globalCompositeOperation="lighter"; ctx.drawImage(R.rim,0,0); ctx.restore() }
    if(NL||(Math.abs(S.l)+Math.abs(S.ly)<.3&&Math.abs(S.r)+Math.abs(S.ry)<.3)) ctx.drawImage(R.full||img,0,0);
    else { ctx.drawImage(R.base,0,0); const leg=(cv,px,an,dy)=>{ ctx.save(); ctx.translate(px,R.hip+dy/s); ctx.rotate(an*D); ctx.drawImage(cv,-px,-R.hip); ctx.restore() };
      leg(R.legL,R.lp,S.l,S.ly); leg(R.legR,R.rp,S.r,S.ry); ctx.drawImage(R.upper,0,0) }
    ctx.restore() };
  // 휙 움직일 때 잔상
  if(!SHT&&Math.abs(S.va)>120) S.h.forEach((q,i)=>body(q[0],q[1],q[2],q[3],.22*(1-i/3)));
  body(S.a,S.x,S.y,S.k,1);
  S.h.unshift([S.a,S.x,S.y,S.k]); if(S.h.length>3) S.h.length=3 }

/* ===== 기술 그림 (이프리트 · 불사조 · 문어 포탑 …) ===== */
const SKILL_IMG={}; (function(){ const F=typeof SKILL_ART_FILES!=="undefined"?SKILL_ART_FILES:{}; for(const k in F){ const im=new Image(); im.onload=()=>{ SKILL_IMG[k]=im }; im.src=F[k] } })();
function drawSkillImg(c,k,h,flip){ const im=SKILL_IMG[k]; if(!im) return false; const w=h*im.width/im.height; c.save(); if(flip) c.scale(-1,1); c.drawImage(im,-w/2,-h/2,w,h); c.restore(); return true }

/* 해적 선원: 바다 총잡이 그림을 작게 써요 */
const CREW_IMG=(()=>{ const F=typeof HERO_ART_FILES!=="undefined"&&HERO_ART_FILES["pirate:1"]; if(!F) return null; const im=new Image(); im.src=F; return im })();
/* 선원 2명 (쌍권총·대포 명사수): 소환 → 걷기 → 사격 → 자세, 4장면 그림 */
function drawCrewSheet(c,m,t,GL){ const im=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG[m.side>0?"crew_2":"crew_1"]; if(!im||!im.width) return false;
  const dt=Math.min(.1,Math.max(0,t-(m.lt??t))); m.lt=t; m.age=(m.age||0)+dt; if(m.fl>0) m.ft=t;
  const mv=Math.hypot(m.x-(m.px??m.x),m.y-(m.py??m.y))/Math.max(dt,1e-3); m.px=m.x; m.py=m.y;
  const aim=m.aim!==undefined?m.aim:(m.side>0?0:Math.PI), right=Math.cos(aim)>=0, shoot=m.ft!==undefined&&t-m.ft<.2;
  const idx=m.age<.55?0:shoot?2:(mv>25?(Math.floor(t*6+m.side)%2?1:3):1), N=4, cw=im.width/N, ch=im.height, H=62, W=H*cw/ch;
  c.save(); c.translate(m.x,m.y+14); c.fillStyle="rgba(0,0,0,.25)"; c.beginPath(); c.ellipse(0,0,14,4.5,0,0,7); c.fill();
  if(m.age<.55){ c.globalAlpha=Math.min(1,m.age*4) } c.scale(right?1:-1,1); c.drawImage(im,idx*cw,0,cw,ch,-W/2,-H,W,H); c.restore(); return true }
function drawCrewArt(c,m,t,GL){ if(drawCrewSheet(c,m,t,GL)) return true; if(!CREW_IMG||!CREW_IMG.complete||!CREW_IMG.naturalWidth) return false;
  const aim=m.aim!==undefined?m.aim:(m.side>0?0:Math.PI), right=Math.cos(aim)>=0, ph=t*8+m.side*1.7, hop=Math.abs(Math.sin(ph))*3, rec=m.fl>0?m.fl/.08:0, S=46;
  c.save(); c.translate(m.x,m.y+14); c.fillStyle="rgba(0,0,0,.25)"; c.beginPath(); c.ellipse(0,0,12,4,0,0,7); c.fill();
  c.translate((right?-1:1)*rec*3,-hop); c.rotate(Math.sin(ph)*.05-(right?1:-1)*rec*.08); c.scale(right?1:-1,1); c.drawImage(CREW_IMG,-S/2,-S+2,S,S); c.restore();
  if(m.fl>0){ c.save(); c.globalCompositeOperation=GL; jGlow(c,m.x+Math.cos(aim)*20,m.y-14+Math.sin(aim)*20,14,"255,220,120",rec); c.restore() }
  return true }

/* ===== 11단계 군단장 「암흑의 검귀」 (세렌 패턴 참고 · 보스만 나오는 결투장) =====
   방장(혼자 할 때는 나)이 보스를 움직이고 패턴을 고르면, 패턴 정보를 모두에게 보내요.
   모든 화면은 같은 패턴 시간표를 따라 경고를 그리고, 각자 자기 용사가 맞았는지 스스로 판단해요. */
const B11_ID="st11_3";
/* 2026-10-25 낮: 쉬는 연출(등장·각성·시간대 전환 동안 공격 멈춤)이 늘어서 체력 233000 → 185000 (최강 이지 5분 유지) */
if(typeof BOSSES!=="undefined") BOSSES[B11_ID]={look:"b11",name:"암흑의 검귀",r:48,hp:185000,sp:92,dmg:60,crown:"none",big:true,ai:[],minion:0,tier:3,map:11,b11:1,
  tn:"이계 마신군 제1군단장",buff:{name:"검귀를 이긴 기운",dmg:1.5,spd:1.2,regen:5}};
const B11_META={"c1":[0.6933,0.9406,360,262],"cw1":[0.7045,0.955,291,263],"cw2":[0.7093,0.955,289,261],"rw1":[0.7646,0.9864,487,469],"rw2":[0.7432,0.9864,501,469],"c2":[0.7046,0.9343,300,246],"c3":[0.497,0.9514,498,271],"c4":[0.5079,0.9443,418,269],"c5":[0.5116,0.8908,335,313],"c6":[0.586,0.959,317,292],"c7":[0.4905,0.9223,252,285],"c8":[0.5071,0.94,254,280],
  "r0":[0.5228,0.9474,593,475],"r1":[0.3629,0.9413,846,477],"r2":[0.6334,0.9474,641,418],"r3":[0.4848,0.9497,660,477],"r4":[0.4243,0.9156,839,379],"r5":[0.3041,0.9495,740,495],"r6":[0.3714,0.9501,859,481],"r7":[0.4796,0.9531,832,490],"r8":[0.4485,0.9457,602,479],"r9":[0.6274,0.9383,475,470],"r10":[0.6059,0.9453,543,475],"r11":[0.3983,0.9396,846,480],"r12":[0.42,0.9597,707,397]};
const B11_FLIP={c4:1,r2:1,r3:1,r4:1,r6:1,r7:1,r8:1,r9:1,r10:1,r12:1};   /* 왼쪽을 보고 그려진 그림 */
const B11_ARENA={hw:780,hh:540};
/* 시간대: 자정(가장 강함) → 여명(불꽃 폭주) → 정오(휴식) → 황혼(보호막) */
const B11_TOD=[
  {k:"mid",n:"자정",ic:"🌑",len:45,col:"150,70,255",col2:"#b07aff",tint:"rgba(20,0,50,.30)",gm:1.5,dm:1.15,sl:.88,dc:"#b04aff",msg:"🌑 자정 · 어둠이 가장 짙어요! 검귀가 가장 강해져요"},
  {k:"dawn",n:"여명",ic:"🌅",len:45,col:"255,80,60",col2:"#ff6a4a",tint:"rgba(90,10,10,.20)",gm:1,dm:1.1,sl:1.06,dc:"#c86bff",msg:"🌅 여명 · 검은 불꽃이 타올라요! 불에 데면 3초 동안 회복이 막혀요"},
  {k:"noon",n:"정오",ic:"☀️",len:22,col:"255,230,150",col2:"#ffe58a",tint:"rgba(255,240,200,.10)",gm:0,dm:.55,sl:1.25,dc:"#ff5a14",msg:"☀️ 정오 · 햇빛에 검귀가 약해졌어요! 지금 마음껏 공격해요"},
  {k:"dusk",n:"황혼",ic:"🌆",len:38,col:"200,110,255",col2:"#d08aff",tint:"rgba(60,10,70,.24)",gm:1,dm:1,sl:1,dc:"#ff6a3a",msg:"🌆 황혼 · 검귀가 어둠의 보호막을 모아요! 퀴즈를 맞히면 보호막이 깎여요"}];

function B11Make(A){
  const g=A.g, MAP=A.MAP, NM=A.NM, HARD=(MAP.dif||0), S={ph:0,tod:0,todT0:0,pats:[],wolves:[],seq:1,timers:{},lastHp:null,xpAcc:0,gauge:0,curseT:-9,curseN:0,stImm:-9,stOn:-9,shield:0,shMax:0,intro:1,sphere:null,todClean:1,noonBonus:0,deathT:0};
  const TW=[1.02,.9,.8][HARD]||1.02, CDM=[.72,.6,.5][HARD]||.72, SPM=[1.25,1.31,1.41][HARD]||1.25;   /* 노멀·하드 10% 쉽게 (2026-10-25 낮) */   /* 10% 쉽게 (2026-10-25) · 이지는 아이들용으로 한 번 더 쉽게 */   /* 2026-10-25 더 어렵게 */   /* 이지도 꽤 바쁘게 · 하드는 예고가 아주 짧아요 */
  const AR=B11_ARENA, TAU=Math.PI*2, rnd=(a,b)=>a+Math.random()*(b-a), clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const IMG=k=>{ const I=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG["b11_"+k]; return I&&I.width?I:null };
  const PIMG=k=>{ const I=typeof PROP_IMG!=="undefined"&&PROP_IMG[k]; return I&&I.width?I:null };
  const host=()=>NM!=="client";
  const boss=()=>g.en.find(e=>e.b11&&e.hp>0)||g.en.find(e=>e.b11);
  const tod=()=>S.ph===2?B11_TOD[S.tod]:null;
  const TTC={}; function todTint(im){ const T=tod(); if(!im||!T||!T.dc) return im; const id=T.k; if(TTC[id]&&TTC[id].src===im) return TTC[id].cv;   /* 레이저 띠도 시간대 색으로 */
    const cv=document.createElement("canvas"); cv.width=im.width; cv.height=im.height; const x=cv.getContext("2d"); x.drawImage(im,0,0); x.globalCompositeOperation="color"; x.fillStyle=T.dc; x.fillRect(0,0,cv.width,cv.height); x.globalCompositeOperation="destination-in"; x.drawImage(im,0,0); TTC[id]={src:im,cv}; return cv }
  /* 억까 방지: 서로 다른 패턴이 같은 순간에 터지지 않게 0.55초 이상 간격을 둬요 (무빙으로 다 피할 수 있게) */
  const STG={line:1,circ:1,cone:1,rays:1,grid:1,crown:1,pounce:1,proj:1};
  function stagger(p){ let w=p.w; for(let it=0;it<6;it++){ let moved=false; const h=p.t0+w;
      for(const q of S.pats){ if(q.done||!STG[q.k]||q.t0===g.t||!(q.d>0)) continue; const h2=q.t0+(q.w||0); if(Math.abs(h2-h)<.55){ w=h2+.55-p.t0; moved=true } }
      if(!moved) break } return w }
  function myQ(p){ const all=[[p.x,p.y],...(p.dec||[])]; const mi=p.qm&&A.myId?p.qm[A.myId()]:null; if(mi) return {h:mi[0],i:mi[1],x:all[mi[1]][0],y:all[mi[1]][1],lab:p.ql[mi[1]]}; return {h:p.qh,i:0,x:p.x,y:p.y,lab:p.ql?p.ql[0]:""} }
  const bigOn=()=>S.pats.some(p=>p.big&&!p.done&&g.t<p.t0+(p.w||0)+(p.k==="crown"?2.4:.4));
  const exclOn=()=>S.pats.some(p=>p.excl&&!p.done&&g.t<p.t0+(p.w||0)+.5);
  const SL=()=>{ const T=tod(); return T&&T.sl?T.sl:1 };   /* 시간대 빠르기: 정오(밝음) 느리게 · 자정(어둠) 빠르게 */
  function todMix(){ if(S.ph!==2) return 0; const T=B11_TOD[S.tod], len=T.len+(T.k==="noon"?(S.noonBonusUsed||0):0), left=S.todT0+len-g.t; const r=left>0?(left<6?(6-left)/6*.3:0):Math.min(1,.3+.7*(-left)/6.4); return r*r*(3-2*r) }   /* 부드럽게 (처음과 끝이 느리게) */
  const isNoon=()=>S.ph===2&&B11_TOD[S.tod].k==="noon";
  const send=m=>{ if(NM==="host") A.evAll(Object.assign({t:"b11"},m)) };

  /* ===== 패턴: 모두가 같은 시간표로 그리고, 각자 자기가 맞았는지 판단 ===== */
  function addPat(p){ p.hit={}; p.done=0; S.pats.push(p); if(p.an){ const e=boss(); if(e){ e.an=p.an; e.at=p.t0; if(p.fa!==undefined) e.f=p.fa } } if(p.say) A.showBanner(p.say); if(p.snd) A.sfx(p.snd) }
  function pat(p){ p.id=S.seq++; p.t0=p.t0??g.t; if(p.w&&p.k!=="safe"&&p.k!=="fx"&&p.k!=="wall") p.w=Math.max(.6,p.w*TW*SL()); if(STG[p.k]&&p.d>0&&!p.nostg) p.w=stagger(p); if(p.k==="rays"||p.k==="cone"||p.k==="proj"||(p.an&&p.k==="line")){ const e=boss(); if(e&&Math.hypot(e.x-p.x,e.y-p.y)<90) e.actT=Math.max(e.actT||0,p.t0+p.w+.35) }   /* 보스 몸에서 나가는 공격(레이저·찌르기·검기)은 다 나갈 때까지 보스가 제자리 (순간이동·돌진 안 겹치게) */ addPat(p); send({p:Object.assign({},p,{hit:undefined,done:undefined})}); return p }
  const me=()=>g.p;
  const canHit=()=>!me().dead&&!g.god&&me().inv<=0;
  const GS=p=>p.gs||[{cx:p.cx,cy:p.cy,safe:p.safe}];   /* 암흑 낙인 칸 묶음 (같이하기는 친구마다 하나씩) */
  function hitMe(p,key,mul){ const P=me(); if(P.dead||g.god||p.hit[key]) return false; if(P.inv>0&&!p.ig) return false; p.hit[key]=1;
    const T=tod(), dmul=(T?T.dm:1)*(mul||1); if(p.d>0) A.hitPlayer(p.d*dmul);
    if(p.pct){ const s=A.st(); P.inv=0; A.hitPlayer(s.maxHp*p.pct/((A.M().armor)||1)) }
    addGauge((p.g||0)*(T?T.gm:1));
    if(p.st&&g.t>S.stImm){ stunMe(p.st) }
    if(p.kb){ const a=p.kbA!==undefined?p.kbA:Math.atan2(P.y-(p.y||0),P.x-(p.x||0)); P.x+=Math.cos(a)*p.kb; P.y+=Math.sin(a)*p.kb; clampP(P) }
    if(p.burn){ g.healBlk=g.t+3; A.fxp({k:"label",x:P.x,y:P.y-70,text:"🔥 화상! 회복 막힘",life:1.2,max:1.2}) }
    if(p.seal){ g.sealT=g.t+3; A.fxp({k:"label",x:P.x,y:P.y-70,text:"🔒 3초 동안 기술 봉인",life:1.3,max:1.3}) }
    if(p.slow){ g.pslow=Math.max(g.pslow||0,p.slow) }
    if(NM==="client"&&S.ph===2&&B11_TOD[S.tod].k==="dusk") (A.netOut.b11=A.netOut.b11||[]).push("h");
    if(NM!=="client"&&S.ph===2&&B11_TOD[S.tod].k==="dusk") shieldAdd(.0025);
    return true }
  function stunMe(t){ if(g.t<S.stImm) return; g.pstun=Math.max(g.pstun||0,t); S.stImm=g.t+t+3; A.fxp({k:"label",x:me().x,y:me().y-70,text:"💫 기절!",life:1,max:1}) }
  function clampP(P){ P.x=clamp(P.x,-AR.hw+18,AR.hw-18); P.y=clamp(P.y,-AR.hh+18,AR.hh-18) }
  /* 판정 도우미 */
  const inCirc=(P,x,y,r)=>(P.x-x)**2+((P.y-y)/.75)**2<(r+P.r*.6)**2;   /* 경고 그림(타원)과 똑같이 */
  const inLine=(P,x,y,a,len,wd)=>{ const px=P.x-x, py=P.y-y, al=px*Math.cos(a)+py*Math.sin(a), ac=Math.abs(-px*Math.sin(a)+py*Math.cos(a)); return al>-wd*.3&&al<len&&ac<wd/2+P.r*.6 };
  const inCone=(P,x,y,a,r,h)=>{ const dx=P.x-x, dy=P.y-y, d=Math.hypot(dx,dy); if(d>r+P.r) return false; let da=Math.atan2(dy,dx)-a; da=Math.atan2(Math.sin(da),Math.cos(da)); return Math.abs(da)<h||d<40 };
  const edgeLen=(x,y,a)=>{ let best=3000; const c=Math.cos(a), s=Math.sin(a); if(c>1e-4) best=Math.min(best,(AR.hw-x)/c); if(c<-1e-4) best=Math.min(best,(-AR.hw-x)/c); if(s>1e-4) best=Math.min(best,(AR.hh-y)/s); if(s<-1e-4) best=Math.min(best,(-AR.hh-y)/s); return Math.max(60,best+40) };

  function patTick(dt){ const P=me(), now=g.t;
    for(const p of S.pats){ const t=now-p.t0, w=p.w||0;
      if(p.k==="cone"){ if(t>=w&&t<w+.15&&inCone(P,p.x,p.y,p.a,p.r,p.h)) hitMe(p,0); if(t>w+.5) p.done=1 }
      else if(p.k==="line"){ if(t>=w&&t<w+(p.dur||.15)&&inLine(P,p.x,p.y,p.a,p.len,p.wd)) hitMe(p,0); if(t>w+(p.dur||.15)+.45) p.done=1 }
      else if(p.k==="rays"){ if(t>=w&&t<w+.2) for(let i=0;i<p.n;i++){ const a=p.a0+i*TAU/p.n; if(inLine(P,p.x,p.y,a,p.len,p.wd)){ hitMe(p,0); break } } if(t>w+.7) p.done=1 }
      else if(p.k==="circ"){ if(t>=w&&t<w+(p.dur||.15)&&inCirc(P,p.x,p.y,p.r)) hitMe(p,0); if(t>w+(p.dur||.15)+(p.vis==="pillar"||p.vis==="flame"||p.vis==="wolfp"?.8:.45)) p.done=1 }
      else if(p.k==="grid"){ if(t>=w&&t<w+.15){ const c=p.cell; let ok=false, inG=false; for(const G of GS(p)){ const ix=Math.floor((P.x-(G.cx-c*1.5))/c), iy=Math.floor((P.y-(G.cy-c*1.5))/c); if(ix>=0&&ix<3&&iy>=0&&iy<3){ inG=true; if(G.safe.includes(iy*3+ix)) ok=true } } if(!ok&&(inG||p.out)) hitMe(p,0) } if(t>w+.6) p.done=1 }   /* 암흑 낙인: 빛나는 칸 밖은 결투장 전체가 위험 */
      else if(p.k==="safe"){ const MQ=myQ(p); if(t>=w&&t<w+.15&&!inCirc(P,MQ.x,MQ.y,p.r-P.r)) hitMe(p,0); if(t>=w+.16&&!p.ans&&p.qh){ p.ans=1; const ok=!p.hit[0]; if(A.pillarAns&&!me().dead) A.pillarAns(MQ.h,ok); A.fxp({k:"label",x:me().x,y:me().y-90,text:ok?`⭕ 정답! 「${MQ.h}」 ${MQ.lab}`:`❌ 「${MQ.h}」은(는) ${MQ.lab}`,life:1.8,max:1.8}) } if(t>w+.9) p.done=1 }
      else if(p.k==="proj"){ const d=Math.max(0,t-w)*p.sp; if(t>=w){ const x=p.x+Math.cos(p.a)*d, y=p.y+Math.sin(p.a)*d; const ux=Math.cos(p.a), uy=Math.sin(p.a), rx=P.x-p.x, ry=P.y-p.y, al=rx*ux+ry*uy, pe=Math.abs(-rx*uy+ry*ux); if(d<p.len&&Math.abs(al-d)<p.r*.9&&pe<p.r+P.r*.5) hitMe(p,0);   /* 초승달: 그려진 길의 폭과 똑같이 */ if(d>=p.len) p.done=1 } }
      else if(p.k==="ring"){ if(t>=w){ const R=Math.min(p.R,(t-w)*p.v); if(!p.hit[0]&&Math.abs(Math.hypot(P.x-p.x,(P.y-p.y)/.75)-R)<34) hitMe(p,0); if(R>=p.R) p.done=1 } }
      else if(p.k==="wall"){ if(t>=w&&t<w+p.dur){ const RX=p.rx||250, RY=RX*.6, dn=Math.hypot((P.x-p.cx)/RX,(P.y-p.cy)/RY); if(Math.abs(dn-1)*RX<26){ const k=Math.floor((t-w)/.8); hitMe(p,"w"+k) } } if(t>w+p.dur+.4) p.done=1 }
      else if(p.k==="pounce"){ if(t>=w&&t<w+.38){ const q=(t-w)/.38, x=p.x+(p.tx-p.x)*q, y=p.y+(p.ty-p.y)*q; if(inCirc(P,x,y,46)) hitMe(p,0) } if(t>w+.9) p.done=1 }
      else if(p.k==="crown"){ for(let i=0;i<p.n;i++){ const ti=w+i*p.gap; if(t>=ti&&t<ti+.15){ const x=p.x+Math.cos(p.a)*p.step*(i+1), y=p.y+Math.sin(p.a)*p.step*(i+1); if(inCirc(P,x,y,p.r)) hitMe(p,i) } } if(t>w+p.n*p.gap+.8) p.done=1 }
      else if(p.k==="fx"){ if(t>(p.life||1)) p.done=1 }
      else if(p.k==="pool"){ if(t>=w&&t<w+p.dur&&inCirc(P,p.x,p.y,p.r)) hitMe(p,"t"+Math.floor((t-w)/.5),1); if(t>w+p.dur+.3) p.done=1 }
      else if(p.k==="seek"){ if(!p.o){ p.o=[]; for(let i=0;i<p.n;i++){ const a=i/p.n*TAU; p.o.push({x:p.x+Math.cos(a)*40,y:p.y+Math.sin(a)*30,vx:Math.cos(a)*120,vy:Math.sin(a)*120,dead:0}) } }
        if(t>=w&&t<w+p.life) for(let i=0;i<p.o.length;i++){ const o=p.o[i]; if(o.dead) continue; const dx=P.x-o.x, dy=P.y-o.y, d=Math.hypot(dx,dy)||1, k2=Math.min(1,dt*1.6); o.vx+=(dx/d*p.sp-o.vx)*k2; o.vy+=(dy/d*p.sp-o.vy)*k2; o.x+=o.vx*dt; o.y+=o.vy*dt; if(d<26+P.r*.6&&!P.dead){ o.dead=1; hitMe(p,"o"+i) } }
        if(t>w+p.life+.4) p.done=1 }
      if(!p.fired&&t>=w&&p.k!=="fx"){ p.fired=1; onFire(p) } }
    S.pats=S.pats.filter(p=>!p.done) }
  /* 패턴이 터지는 순간의 효과 (모든 화면) */
  function onFire(p){ const fx=A.fxp;
    if(p.k==="cone"){ A.sfx("slash"); g.shake=Math.max(g.shake,.12) }
    else if(p.k==="line"){ A.sfx(p.vis==="laser"?"thunder":"slash"); g.shake=Math.max(g.shake,p.vis==="laser"?.35:.15) }
    else if(p.k==="rays"){ A.sfx("thunder"); g.shake=Math.max(g.shake,.35) }
    else if(p.k==="circ"){ A.sfx(p.vis==="orb"?"boom":"quake"); g.shake=Math.max(g.shake,p.vis==="pillar"||p.vis==="flame"?.22:.12) }
    else if(p.k==="grid"||p.k==="safe"){ A.sfx("boom"); g.shake=Math.max(g.shake,.45); if(p.k==="safe"||p.out) fx({k:"flash",col:"#2a0a4a",life:.5,max:.5}) }
    else if(p.k==="ring"){ A.sfx("boom") } else if(p.k==="proj"){ A.sfx("slash") } else if(p.k==="crown"){ A.sfx("alarm") } }

  /* ===== 암흑 게이지 (내 것만) ===== */
  function addGauge(v){ if(!v||S.ph===0&&S.intro) return; if(isNoon()) return; v*=(A.gaugeMul?A.gaugeMul():1)*1.3; S.gauge=Math.min(100,S.gauge+v); if(S.gauge>=100) curse() }
  function curse(){ S.gauge=0; S.curseT=g.t; S.curseN++; g.pslow=Math.max(g.pslow||0,3); A.sfx("enrage"); A.showBanner("🌑 암흑의 저주! 3초 동안 앞이 어둡고 느려져요 (친구 옆에 있으면 빨리 풀려요)");
    if(S.ph===2){ if(NM==="client") (A.netOut.b11=A.netOut.b11||[]).push("c"); else onCurse() } }
  function onCurse(){ S.todClean=0; if(S.ph===2&&B11_TOD[S.tod].k!=="noon") S.noonBonus=Math.max(-8,S.noonBonus-2) }
  function gaugeTick(dt){ const cursed=g.t-S.curseT<3; if(cursed){ const near=A.team().some(q=>q!==me()&&(q.x-me().x)**2+(q.y-me().y)**2<130*130); if(near) S.curseT-=dt }
    const dec=S.ph===0?2.2:isNoon()?14:0, inc=S.ph===2&&!isNoon()&&!S.intro&&!S.sphere?(B11_TOD[S.tod].k==="mid"?.9:.45):0; if(!cursed) S.gauge=clamp(S.gauge-dec*dt+inc*dt,0,100); if(S.gauge>=100) curse() }

  /* ===== 시작: 입장 연출 ===== */
  function start(){ if(!host()) return; const T=A.team(); const L=MAP.lv||100;
    const hp=BOSSES[B11_ID].hp*S.hpMul;
    const e={mapId:MAP.id,type:"boss",bid:B11_ID,look:"b11",name:"암흑의 검귀",x:0,y:-110,r:44,hp,max:hp,id:A.nid(),di:-1-A.BKEYS.indexOf(B11_ID),sp:BOSSES[B11_ID].sp,dmg:BOSSES[B11_ID].dmg*S.dmgMul,xp:5,slow:0,flash:0,stoneCD:0,wob:0,b11:1,b11inv:1,buff:BOSSES[B11_ID].buff,crown:"none",big:true,an:"enter",at:0,f:1,born:g.t};
    g.en.push(e); S.lastHp=e.hp; g.bossUp=true; g.stageN=3;
    S.timers={act:1.2,orb:6,forest:8,eight:10,thrust:0,dash:2,slash:4};
    sched(1.2,()=>{ A.say("⚔ 이계 마신군 제1군단장 · 「암흑의 검귀」","boss") });
    sched(3.6,()=>{ const e=boss(); if(!e) return; e.b11inv=0; e.an="wake"; e.at=g.t; S.intro=0; send({s:"wake"}); wakeFx() }); }
  function awakenFx(){ S.awT=g.t; A.fxp({k:"flash",col:"#ffffff",life:.9,max:.9}); g.shake=1.1; g.hitstop=.12; A.sfx("enrage"); A.sfx("ultboom"); A.stamp&&A.stamp("2페이즈<br>각성!") }
  function wakeFx(){ A.fxp({k:"flash",col:"#ffffff",life:.5,max:.5}); g.shake=.5; A.sfx("enrage"); A.stamp&&A.stamp("전투<br>시작!"); A.showBanner("⚔ 전투 시작! 지금부터 공격해요") }
  const SCH=[]; function sched(t,fn){ SCH.push({at:g.t+t,fn}) }
  function schedTick(){ for(const s of SCH) if(!s.done&&g.t>=s.at){ s.done=1; s.fn() } for(let i=SCH.length-1;i>=0;i--) if(SCH[i].done) SCH.splice(i,1) }

  /* ===== 방장: 보스 머리 ===== */
  function target(e){ const L=A.team(); if(!L.length) return g.p; let b=L[0], bd=1e18; for(const q of L){ const d=(q.x-e.x)**2+(q.y-e.y)**2; if(d<bd){ bd=d; b=q } } return b }
  function busy(e){ return e.actT>g.t }
  function act(e,dur){ e.actT=g.t+dur*SL() }
  const D=()=>{ const e=boss(); return (e?e.dmg:60)*[.54,.6,.62][HARD] };   /* 초4 기준 (2026-10-25): 이지 ≈ 6~14대 · 노멀 ≈ 5~10대 · 하드 ≈ 3~7대 버틸 수 있게 */   /* 10단계보다 훨씬 아프게 */
  function face(e,x){ e.f=x>=e.x?1:-1 }
  function hostTick(dt){ const e=boss(); if(!e) return; schedTick();
    /* 받은 피해 정리: 보호막 · 정오 약화 · 무적 · 경험치 구슬 */
    if(S.lastHp===null) S.lastHp=e.hp;
    if(e.hp<S.lastHp){ let lost=S.lastHp-e.hp;
      if(e.b11inv){ e.hp=S.lastHp; lost=0 }
      else { if(S.shield>0){ const ab=Math.min(S.shield,lost); S.shield-=ab; e.hp+=ab; lost-=ab; if(ab>0&&(!S.shHit||g.t-S.shHit>.4)) S.shHit=g.t; if(S.shield<=0) { S.shBreak=g.t; A.say("🌆 어둠의 보호막이 깨졌어요!","win"); A.fxp({k:"ring",x:e.x,y:e.y,life:.6,max:.6}) } }
        if(isNoon()&&lost>0){ e.hp-=lost*.3; lost*=1.3 }
      } }
    S.lastHp=e.hp;
    if(S.deathT) return;
    /* 다른 기술의 기절·느려짐은 군단장에게 통하지 않아요 (약점 한자로만 기절) */
    const weakStun=e.weakT0&&g.t-e.weakT0<6;   /* 그로기 6초 (극딜 타임) */ if(!weakStun){ e.stun=0 } e.slow=0;
    if(weakStun){ if(e.an!=="groggy"){ e.an="groggy"; e.at=g.t; S.pats=S.pats.filter(p=>p.k==="fx"); send({s:"clr"}); S.wolves=[] } e.actT=0; return }
    else if(e.an==="groggy"){ e.an="idle"; e.at=g.t }
    if(S.intro||S.sphere||g.t<(S.cineEnd||0)) return;
    if(S.ph===2) todTick(dt,e);
    const EX=exclOn(); if(!EX) mapPatterns(dt,e);
    if(S.ph===2) wolvesTick(dt,e);
    for(const k in S.timers) S.timers[k]-=dt/(CDM*SL());   /* 밝을수록 느리게 · 어두울수록 빠르게 */
    if(busy(e)){ if(e.dashTo){ const q=Math.min(1,(g.t-e.dashTo.t0)/e.dashTo.d); e.x=e.dashTo.x0+(e.dashTo.x1-e.dashTo.x0)*q; e.y=e.dashTo.y0+(e.dashTo.y1-e.dashTo.y0)*q; if(q>=1) e.dashTo=null } return }
    const T=target(e), dx=T.x-e.x, dy=T.y-e.y, d=Math.hypot(dx,dy)||1;
    if(EX){ e.mv=0; return }   /* 안전 칸 패턴 중에는 다른 공격이 겹치지 않아요 */
    if(S.timers.act<=0&&!(d>220&&g.t-(e.lastAtk||0)<2.4)&&choose(e,T,d)){ e.lastAtk=g.t; return }   /* 공격 뒤 멀리 있으면 2.4초는 뚜벅뚜벅 걸어와요 (걷는 모습이 보이게) */
    /* 걷기: 너무 가까우면 멈추고, 멀면 다가가요 */
    const sp=e.sp*SPM*(isNoon()?.7:1);
    if(d>150){ e.x+=dx/d*sp*dt; e.y+=dy/d*sp*dt; e.mv=1 } else e.mv=0;
    e.x=clamp(e.x,-AR.hw+60,AR.hw-60); e.y=clamp(e.y,-AR.hh+60,AR.hh-60);
    if(Math.abs(dx)>20) face(e,T.x);
    const want=e.mv?"move":"idle"; if(e.an!==want&&g.t-(e.at||0)>((ANIM_LEN[e.an]||0))){ e.an=want; e.at=g.t } }
  function dropXp(e){ const v=Math.max(4,Math.round(A.needXP(g.lvl)*.22)); for(let i=0;i<3;i++){ const a=Math.random()*TAU, r=rnd(30,90); g.gems.push({x:e.x+Math.cos(a)*r,y:e.y+Math.sin(a)*r,v:Math.round(v/3)}) } }

  /* 패턴 고르기 */
  function choose(e,T,d){ const ph=S.ph, ang=Math.atan2(T.y-e.y,T.x-e.x), Tn=tod(), k=Tn?Tn.k:"p1";
    const wm=HARD>=1?.88:1;   /* 어려움부터 예고가 조금 짧아요 */
    if(d>=560&&(S.timers.tele??0)<=0&&!(ph===2&&k==="noon")){ S.timers.tele=HARD>=2?6:HARD?7:8.5; S.timers.act=1.6; tele(e,T); return true }   /* 멀리 도망가면 순간이동 */
    if(ph===0){
      if(S.timers.eight<=0){ S.timers.eight=10; S.timers.act=2.6; eight(e,8,1.8*wm); return true }
      if(d<200&&S.timers.thrust<=0){ S.timers.thrust=1.8; S.timers.act=1.1; thrust(e,ang); return true }
      if(d>=200&&d<470&&S.timers.dash<=0){ S.timers.dash=11; S.timers.act=1.6; dash(e,T); return true }
      if(d>=470&&S.timers.slash<=0){ S.timers.slash=9.5; S.timers.act=1.8; slash(e,ang); return true }
      return false }
    /* 2페이즈 */
    const BIG=bigOn();   /* 큰 패턴은 한 번에 하나씩만 (아이들이 피할 수 있게) */
    if(k==="mid"){
      if(!BIG&&S.timers.pierce<=0){ S.timers.pierce=12; S.timers.act=3.6; pierce(e,T); return true }
      if(!BIG&&S.timers.twelve<=0){ S.timers.twelve=10; S.timers.act=2.6; eight(e,12,(HARD>=1?1.3:1.5)); return true } }
    if(k==="dawn"){
      if(!BIG&&S.timers.combo<=0){ S.timers.combo=14; S.timers.act=5.2; combo(e,T); return true }
      if(!BIG&&S.timers.meteor<=0){ S.timers.meteor=12; S.timers.act=1.6; meteors(e); return true } }
    if(k==="noon"){ if(S.timers.wave<=0){ S.timers.wave=4; S.timers.act=1.4; sunwave(e); return true } }
    if(k==="dusk"){ if(!BIG&&S.timers.rise<=0){ S.timers.rise=13; S.timers.act=2.6; wolfrise(e,T); return true } }
    if(d<200&&S.timers.thrust<=0){ S.timers.thrust=1.8; S.timers.act=1.1; thrust(e,ang); return true }
    if(d>=200&&d<470&&S.timers.dash<=0){ S.timers.dash=k==="noon"?13:11; S.timers.act=1.6; dash(e,T); return true }
    if(d>=470&&S.timers.slash<=0){ S.timers.slash=9.5; S.timers.act=1.8; slash(e,ang); return true }
    return false }

  /* ===== 기본기 ===== */
  function tele(e,T){ const a=Math.random()*TAU, r=120+Math.random()*60, x=clamp(T.x+Math.cos(a)*r,-AR.hw+80,AR.hw-80), y=clamp(T.y+Math.sin(a)*r*.75,-AR.hh+80,AR.hh-80), w=1.05;
    act(e,w*TW+.75); const p=pat({k:"circ",x,y,r:150,w,d:D()*1.2,g:12,vis:"tele",ox:Math.round(e.x),oy:Math.round(e.y),say:"🌑 검귀가 그림자로 사라졌어요! 나타나는 원을 피해요",snd:"alarm"});
    sched(p.w-.08,()=>{ const e2=boss(); if(!e2||S.deathT||e2.an==="groggy") return; e2.dashTo=null; e2.x=x; e2.y=y; face(e2,target(e2).x); g.shake=Math.max(g.shake,.25) }) }
  function thrust(e,a){ face(e,e.x+Math.cos(a)); const w=.6; act(e,w+.45); pat({k:"cone",x:e.x,y:e.y,a,r:215,h:.5,w,d:D()*1,g:12,an:"thrust",fa:e.f}) }
  function dash(e,T,k){ k=k||0; const a=Math.atan2(T.y-e.y,T.x-e.x), len=Math.min(edgeLen(e.x,e.y,a)-60,520), w=k?.62:.8; face(e,T.x); act(e,w+.55+(k>=HARD?.9:0));   /* 마지막 돌진 뒤엔 잠깐 멈춰서 숨 고르기 (스킬이 맞게) */
    const Tn=tod(), PD=pat({k:"line",x:e.x,y:e.y,a,len,wd:96,w,dur:.3,d:D()*1.3,g:Tn&&Tn.k==="mid"?40:16,kb:70,kbA:a+Math.PI/2*(Math.random()<.5?1:-1),an:"dash",fa:e.f,vis:"dash"}), WW=PD.w; if(k<HARD) sched(WW+.42,()=>{ const e2=boss(); if(e2&&!S.sphere&&e2.an!=="groggy"&&!S.deathT) dash(e2,target(e2),k+1) });
    const x1=clamp(e.x+Math.cos(a)*len,-AR.hw+60,AR.hw-60), y1=clamp(e.y+Math.sin(a)*len,-AR.hh+60,AR.hh-60); sched(WW,()=>{ e.dashTo={x0:e.x,y0:e.y,x1,y1,t0:g.t,d:.3} }) }
  function slash(e,a){ face(e,e.x+Math.cos(a)); const w=1; act(e,w+.6+(HARD?.5:0)); pat({k:"proj",x:e.x,y:e.y-20,a,sp:900,len:edgeLen(e.x,e.y,a),r:62,w,d:D()*1.2,g:14,st:1,an:"swing",fa:e.f,vis:"crescent"});
    if(HARD) for(let i=1;i<=HARD;i++){ const b=a+(i%2?.42:-.42)*Math.ceil(i/2); pat({k:"proj",x:e.x,y:e.y-20,a:b,sp:900,len:edgeLen(e.x,e.y,b),r:62,w:w+.45*i,d:D()*1.2,g:14,st:1,vis:"crescent"}) } }
  function eight(e,n,w){ act(e,w+.6); const L=A.team(); let a0=Math.random()*TAU;
    if(n===8&&!S.eightUsed){ S.eightUsed=1; let best=a0, bs=-1; for(let i=0;i<24;i++){ const c=i/24*TAU/8; let m=9; for(const q of L){ let da=Math.atan2(q.y-e.y,q.x-e.x)-c; da=((da%(TAU/8))+TAU/8)%(TAU/8); m=Math.min(m,Math.min(da,TAU/8-da)) } if(m>bs){ bs=m; best=c } } a0=best; A.say("⚔ 암흑 팔방참! 빛줄기 사이에 가만히 서 있어요","alarm") }
    pat({k:"rays",big:1,x:e.x,y:e.y,n,a0,len:1500,wd:54,w,d:D()*1.5,g:22,an:n===8?"raise8":"raise12",vis:n===8?"eight":"twelve",say:n===12?"⚔ 십이방참! 빛줄기 사이로 피해요":null,snd:"alarm"});
    if(S.eightN=(S.eightN||0)+1, S.eightN>1){ act(e,w+1.5); pat({k:"rays",big:1,x:e.x,y:e.y,n,a0:a0+Math.PI/n,len:1500,wd:54,w:w+.9,d:D()*1.5,g:22,vis:n===8?"eight":"twelve"}) } }

  /* ===== 2페이즈 고유 ===== */
  function pierce(e,T){ const a=Math.atan2(T.y-e.y,T.x-e.x), w=1.2*3+.2; face(e,T.x); act(e,w+.8);
    pat({k:"line",big:1,x:e.x,y:e.y,a,len:edgeLen(e.x,e.y,a),wd:110,w,dur:.4,d:D()*1.8,g:30,st:2,an:"pierce",fa:e.f,vis:"laser",say:"🌑 흑월 관통! 마름모 3개가 차면 레이저가 나가요",snd:"alarm"}) }
  function combo(e,T){ face(e,T.x); act(e,5.0); let x=e.x, y=e.y; const parts=[];
    A.say("🔥 흑염 삼연참! 돌진 2번 뒤 긴 베기가 와요","alarm");
    const mk=(t0,tx,ty,kind)=>{ const a=Math.atan2(ty-y,tx-x), len=kind===2?edgeLen(x,y,a):Math.min(edgeLen(x,y,a)-60,430), wd=kind===2?120:96;
      const PP=pat({k:"line",big:1,x,y,a,len,wd,w:kind===2?1.5:.75,t0,dur:.3,d:D()*(kind===2?1.6:1.2),g:kind===2?20:10,kb:kind===2?120:60,burn:1,an:kind===0?"cdash1":kind===1?"cdash2":"cslam",fa:tx>=x?1:-1,vis:kind===2?"redline":"dash"});
      const x1=clamp(x+Math.cos(a)*len*(kind===2?0:1),-AR.hw+60,AR.hw-60), y1=clamp(y+Math.sin(a)*len*(kind===2?0:1),-AR.hh+60,AR.hh-60), x0=x, y0=y; sched(t0-g.t+PP.w,()=>{ if(kind<2) e.dashTo={x0,y0,x1,y1,t0:g.t,d:.28} }); x=x1; y=y1 };
    const L=A.team(), pick=()=>L[Math.random()*L.length|0]||T;
    const t1=pick(); mk(g.t,t1.x,t1.y,0);
    sched(1.15*TW*SL(),()=>{ const t2=pick(); mk(g.t,t2.x,t2.y,1); sched(1.15*TW*SL(),()=>{ const t3=target(e); mk(g.t,t3.x,t3.y,2) }) }) }
  function meteors(e){ const L=A.team(); const n=(S.wallOn&&HARD===0?4:7)+HARD*2; act(e,1.4); pat({k:"fx",life:1.4,an:"raise8",say:"☄ 흑염 유성! 큰 원을 피해요 (맞으면 3초 기술 봉인)",snd:"alarm"});
    for(let i=0;i<n;i++){ const q=L[i%L.length]||g.p, x=clamp(q.x+rnd(-260,260),-AR.hw+40,AR.hw-40), y=clamp(q.y+rnd(-200,200),-AR.hh+40,AR.hh-40); pat({k:"circ",big:1,x,y,r:90,w:2.2+i*.25,d:D()*1.1,g:10,seal:1,vis:"meteor"}) } }
  function sunwave(e){ act(e,1.3); pat({k:"ring",x:e.x,y:e.y,R:420,v:520,w:.8,d:D()*.5,g:0,kb:150,an:"plant",fa:e.f,vis:"sun"}) }
  function wolfrise(e,T){ const a=Math.atan2(T.y-e.y,T.x-e.x); act(e,2.4); pat({k:"crown",big:1,x:e.x,y:e.y,a,n:6,step:120,gap:.35,r:95,w:1,d:D()*1.1,g:16,slow:2,an:"plant",fa:T.x>=e.x?1:-1,say:"🐺 월령 기상! 왕관 문양을 따라 늑대 기둥이 솟아요",snd:"alarm"}) }

  /* ===== 맵 패턴 ===== */
  function mapPatterns(dt,e){ const L=A.team(); const T=S.timers;
    if(S.ph===0){
      if(T.orb<=0){ T.orb=7; for(const q of L) for(let i=0;i<3+HARD*2;i++){ const x=clamp(q.x+rnd(-220,220),-AR.hw+30,AR.hw-30), y=clamp(q.y+rnd(-170,170),-AR.hh+30,AR.hh-30); pat({k:"circ",x,y,r:56,w:1.3+i*.2,d:D()*.6,g:0,vis:"orb"}) } }
      if(T.forest<=0){ T.forest=5.7; forest(HARD>=1?1.5:1.7) }
      if(T.x1===undefined) T.x1=10; if(T.x1<=0){ T.x1=11; const c0=L[Math.random()*L.length|0]||g.p; for(let i=0;i<2+HARD;i++){ const a=Math.random()*Math.PI; pat({k:"line",x:c0.x-Math.cos(a)*1600,y:c0.y-Math.sin(a)*1600,a,len:3200,wd:76,w:1.3+i*.7,dur:.25,d:D()*1.1,g:16,vis:"cross"}) } }
      if(T.seek===undefined) T.seek=6; if(T.seek<=0){ T.seek=9; const e2=boss(); if(e2) pat({k:"seek",x:e2.x,y:e2.y-40,n:4+HARD*2,sp:175+40*HARD,life:6.5,w:.9,d:D()*.8,g:12,say:"🔮 그림자 구슬이 따라와요! 계속 움직여요"}) } return }
    const k=B11_TOD[S.tod].k;
    if(k==="mid"){
      if(T.cross<=0&&!bigOn()){ T.cross=10; const hp=e.hp/e.max, n=(hp<.2&&HARD>=1?4:hp<.5?3:2)+(HARD>=2?1:0); for(let i=0;i<n;i++){ const a=Math.random()*Math.PI, c=L[Math.random()*L.length|0]||g.p; pat({k:"line",x:c.x-Math.cos(a)*1600,y:c.y-Math.sin(a)*1600,a,len:3200,wd:80,w:1.4+i*rnd(.9,1.4),dur:.25,d:D()*1.2,g:18,vis:"cross"}) } }
      if(T.brand<=0&&!bigOn()){ T.brand=9; S.pats=S.pats.filter(p=>p.k==="fx"); send({s:"clr"}); const gs=[]; for(const c of (L.length?L:[g.p])){ const cx=clamp(c.x,-AR.hw+200,AR.hw-200), cy=clamp(c.y,-AR.hh+200,AR.hh-200); if(gs.some(G=>Math.abs(G.cx-cx)<420&&Math.abs(G.cy-cy)<420)) continue; const safe=[Math.random()*9|0]; if(HARD<2&&Math.random()<(HARD?.35:.6)){ const s2=Math.random()*9|0; if(s2!==safe[0]) safe.push(s2) } gs.push({cx,cy,safe}) }   /* 친구마다 3x3 칸 · 빛나는 칸 말고는 결투장 전체가 터져요 */
        pat({k:"grid",gs,cx:gs[0].cx,cy:gs[0].cy,safe:gs[0].safe,out:1,cell:130,big:1,excl:1,w:2,d:D()*1.3,g:20,say:"🌑 암흑 낙인! 초록 '안전!' 칸 말고는 전부 터져요",snd:"alarm"}) } }
    else if(k==="dawn"){
      if(T.peak<=0){ T.peak=6.5; const all=HARD>=1&&Math.random()<.25; for(const q of L){ const n=all?1:3; for(let i=0;i<n;i++){ const x=clamp(q.x+(i?rnd(-170,170):0),-AR.hw+40,AR.hw-40), y=clamp(q.y+(i?rnd(-130,130):0),-AR.hh+40,AR.hh-40); pat({k:"circ",x,y,r:74,w:(HARD>=1?1.5:1.9)+i*.25,d:D()*2,g:8,burn:1,vis:"flame",dur:.25}) } } }
      if(T.wall<=0&&!S.wallOn){ T.wall=30; const dur=rnd(15,25), c=L[0]||g.p; S.wallOn=1; sched(dur+2,()=>S.wallOn=0); pat({k:"wall",cx:clamp(c.x,-AR.hw+300,AR.hw-300),cy:clamp(c.y,-AR.hh+200,AR.hh-200),rx:280,hw:280,hh:168,w:2,dur,d:D()*.5,g:6,burn:1,say:"🔥 흑염 결계! 불꽃 고리 안에서 싸워요 · 테두리 불꽃에 닿으면 데어요",snd:"alarm"}) } }
    else if(k==="noon"){
      if(T.shard<=0){ T.shard=2.2; for(const q of L){ const a=Math.random()*Math.PI; pat({k:"line",x:q.x-Math.cos(a)*200,y:q.y-Math.sin(a)*200,a,len:400,wd:40,w:1.5,d:D()*.35,g:0,vis:"shard"}) } } }
    else if(k==="dusk"){
      if(T.morb<=0){ T.morb=9; const spots=[[-AR.hw*.6,-AR.hh*.55],[AR.hw*.6,-AR.hh*.55],[0,AR.hh*.6]]; for(const [sx,sy] of spots) for(let i=0;i<2;i++){ const x=sx+rnd(-140,140), y=sy+rnd(-100,100); pat({k:"circ",x,y,r:80,w:2.4+i*.4,d:D()*.9,g:12,vis:"moonorb"}) } }
      if(T.fall<=0){ T.fall=6; for(const q of L) pat({k:"circ",x:q.x,y:q.y,r:68,w:1.4,d:D()*.9,g:10,st:1,vis:"sword"}) } } }
  function forest(w){ /* 암흑 검림: 고정 배치 몇 가지 중 하나 · 기둥 사이에 틈 */
    const lay=Math.random()*3|0, out=[];
    if(lay===0){ for(let i=-3;i<=3;i++) for(let j=-2;j<=2;j++) if((i+j)%2===0) out.push([i*220,j*210]) }
    else if(lay===1){ for(let i=-3;i<=3;i++) for(let j=-2;j<=2;j++) if(Math.abs(j)!==1) out.push([i*230+(j%2?115:0),j*230]) }
    else { for(let r=1;r<=2;r++) for(let i=0;i<r*6;i++){ const a=i/(r*6)*TAU+r*.3; out.push([Math.cos(a)*r*260,Math.sin(a)*r*190]) } out.push([0,0]) }
    out.forEach(([x,y],i)=>{ if(Math.abs(x)<AR.hw-40&&Math.abs(y)<AR.hh-40) pat({k:"circ",x,y,r:78,w:w+(i%3)*.05,d:D()*1.4,g:18,vis:"pillar",dur:.35}); pat({k:"pool",x,y,r:70,w:w+.4,dur:2.6,d:D()*.35,g:4}) }) }

  /* ===== 시간대 · 어둠의 권능 ===== */
  function todTick(dt,e){ const Tn=B11_TOD[S.tod], len=Tn.len+(Tn.k==="noon"?(S.noonBonusUsed||0):0), left=S.todT0+len-g.t;
    if(Tn.k==="dusk"){ S.shTick=(S.shTick||0)+dt; if(S.shTick>=15){ S.shTick=0; shieldAdd(.004) } }
    if(left<=5&&!S.warned){ S.warned=1; A.say(`⏳ 5초 뒤 ${B11_TOD[(S.tod+1)%4].n}! 어둠의 권능이 와요 · 빛나는 기둥 안으로!`,"alarm") }
    if(left<=0) power(e) }
  function power(e){ /* 그림자 구체 2초 + 기둥 5~7개 중 빛나는 안전 기둥 1개 (3.5초 예고) */
    const L=A.team(), c=L.length?L.reduce((a,q)=>({x:a.x+q.x/L.length,y:a.y+q.y/L.length}),{x:0,y:0}):{x:0,y:0}, IDS=A.ids?A.ids():["me"], n0=Math.max(5+(Math.random()*3|0),IDS.length+3), R=110*A.safeMul();
    /* 기둥 자리: 서로 절대 겹치지 않게 (원·이름표 모두) 떨어뜨려 뽑아요 */
    const pts=[], ok=(x,y)=>pts.every(([px,py])=>{ const dx=Math.abs(px-x), dy=Math.abs(py-y); return Math.hypot(dx,dy*1.25)>R*2.5&&(dx>R*2.3||dy>R*1.6) });
    const bx0=clamp(c.x,-AR.hw+R+40,AR.hw-R-40), by0=clamp(c.y,-AR.hh+R+60,AR.hh-R-20);
    for(let i=0;i<n0;i++){ let put=false; for(let tr=0;tr<80&&!put;tr++){ const sp=tr<40?1:1.6, x=clamp(bx0+rnd(-470,470)*sp,-AR.hw+R+20,AR.hw-R-20), y=clamp(by0+rnd(-330,330)*sp,-AR.hh+R+50,AR.hh-R-20); if(ok(x,y)){ pts.push([x,y]); put=true } }
      if(!put) break }
    if(pts.length<IDS.length+2){ pts.length=0; const cols=4, gx=Math.min(300,(AR.hw*2-2*R)/cols), gy=Math.min(260,(AR.hh*2-2*R)/2); for(let i=0;i<n0;i++){ const ci=i%cols, ri=Math.floor(i/cols); pts.push([clamp(bx0+(ci-(cols-1)/2)*gx,-AR.hw+R,AR.hw-R),clamp(by0+(ri-.5)*gy,-AR.hh+R+40,AR.hh-R)]) } }
    const n=pts.length, sx=pts[0][0], sy=pts[0][1], dec=pts.slice(1);
    const QM=A.pillarQm?A.pillarQm(n,IDS.length):null;   /* 한자 기둥: 문제로 나온 한자의 뜻이 적힌 기둥만 안전해요 · 같이하기는 친구마다 다른 한자·다른 기둥 */
    let Q=null, qm=null; if(QM){ const perm=[...Array(n).keys()].sort(()=>Math.random()-.5), ql=new Array(n); qm={}; QM.qs.forEach((q,i)=>{ ql[perm[i]]=q.lab; if(IDS[i]!==undefined) qm[IDS[i]]=[q.h,perm[i]] }); let di=0; for(let i=0;i<n;i++) if(ql[i]===undefined) ql[i]=QM.dec[di++]||"?"; Q={h:QM.qs[0].h,lab:ql} }
    S.pats=S.pats.filter(p=>p.k==="fx"); send({s:"clr"}); S.wolves=[];
    e.actT=g.t+6.8; S.sphere={t0:g.t}; send({s:"sph"});
    pat({k:"safe",x:sx,y:sy,r:R,dec,w:2+4.5,pct:.35,g:30,d:0,ig:1,an:"raise8",qh:Q?Q.h:"",ql:Q?Q.lab:null,qm,say:Q?(IDS.length>1?"🌑 어둠의 권능! 내 한자의 뜻이 적힌 기둥으로 들어가요! (친구마다 한자가 달라요)":`🌑 어둠의 권능! 「${Q.h}」의 뜻이 적힌 기둥으로 들어가요!`):"🌑 어둠의 권능! 빛나는 기둥 안으로 들어가요!",snd:"alarm"});
    sched(6.6,()=>{ S.sphere=null; send({s:"sphx"}); nextTod(e) }) }
  function nextTod(e){ const prev=B11_TOD[S.tod].k;
    if(prev!=="noon"&&S.todClean) { S.noonBonus=Math.min(10,S.noonBonus+5); A.say("✨ 저주 없이 버텼어요! 다음 정오가 5초 길어져요","win") }
    if(prev==="dusk"&&S.shield>0){ const h=S.shield; e.hp=Math.min(e.max,e.hp+h); S.lastHp=e.hp; A.say(`🌑 남은 보호막만큼 검귀가 체력을 되찾았어요 (+${Math.round(h/e.max*100)}%)`,"enrage"); S.shield=0 }
    S.tod=(S.tod+1)%4; S.todT0=g.t; S.warned=0; S.todAnn=g.t; S.todClean=1; if(B11_TOD[S.tod].k==="noon") S.noonBonusUsed=S.noonBonus;
    const k=B11_TOD[S.tod].k; resetTimers(k);
    if(k==="dusk"){ S.shMax=e.max; S.shield=e.max*.08; S.shTick=0; A.fxp({k:"ring",x:e.x,y:e.y,life:.7,max:.7}) }
    if(k==="noon") S.noonBonus=0;
    A.say(B11_TOD[S.tod].msg,"enrage"); send({s:"tod",tod:S.tod,t0:S.todT0}); A.fxp({k:"flash",col:B11_TOD[S.tod].col2,life:.6,max:.6}); if(B11_TOD[S.tod].k==="noon") sched(1.6,()=>A.todQuiz&&A.todQuiz()) }
  function resetTimers(k){ const T=S.timers; Object.assign(T,{act:1.5,thrust:0,dash:3,slash:5});
    if(k==="mid") Object.assign(T,{cross:3,brand:7,pierce:6,twelve:12});
    if(k==="dawn") Object.assign(T,{peak:2,wall:5,combo:4,meteor:12});
    if(k==="noon") Object.assign(T,{shard:1.5,wave:2});
    if(k==="dusk") Object.assign(T,{morb:3,fall:6,rise:7,wolf:0}) }
  function shieldAdd(f){ const e=boss(); if(!e||S.ph!==2||B11_TOD[S.tod].k!=="dusk") return; S.shield=Math.min(e.max*.3,S.shield+e.max*f) }

  /* ===== 월령 늑대 (방장이 움직이고 위치를 보내요) ===== */
  function wolvesTick(dt,e){ const k=B11_TOD[S.tod].k; if(k!=="dusk"){ if(S.wolves.length) S.wolves=[]; return }
    const hp=e.hp/e.max, want=hp<.2&&HARD>=1?3:hp<.4?2:1, L=A.team();
    while(S.wolves.length<want){ const a=Math.random()*TAU; S.wolves.push({x:e.x+Math.cos(a)*120,y:e.y+Math.sin(a)*120,ti:S.wolves.length,s:0,t:0,f:1,swT:g.t+8,born:g.t}) }
    S.wolves.length=Math.min(S.wolves.length,want);
    for(const w of S.wolves){ if(g.t>=w.swT){ w.ti++; w.swT=g.t+8 } const q=L.length?L[w.ti%L.length]:g.p, dx=q.x-w.x, dy=q.y-w.y, d=Math.hypot(dx,dy)||1;
      if(w.s===0){ if(g.t-w.born<1.2) continue; w.f=dx>=0?1:-1; if(d>210){ w.x+=dx/d*170*dt; w.y+=dy/d*170*dt } else { w.s=1; w.t=g.t; const tx=w.x+dx/d*Math.min(d+60,280), ty=w.y+dy/d*Math.min(d+60,280); w.tx=tx; w.ty=ty; w.pw=pat({k:"pounce",nostg:1,x:w.x,y:w.y,tx,ty,w:1,d:D()*.8,g:12}) } }
      else if(w.s===1){ if(g.t-w.t>=(w.pw&&w.pw.w||1)){ w.s=2; w.t=g.t; w.x0=w.x; w.y0=w.y } }
      else if(w.s===2){ const q2=Math.min(1,(g.t-w.t)/.38); w.x=w.x0+(w.tx-w.x0)*q2; w.y=w.y0+(w.ty-w.y0)*q2; if(q2>=1){ w.s=3; w.t=g.t } }
      else if(w.s===3){ if(g.t-w.t>1.1) w.s=0 } } }

  /* ===== 1페이즈 처치 → 2페이즈 / 2페이즈 처치 → 클리어 ===== */
  function onKill(e){ if(!host()) return true;
    if(S.ph===0){ e.hp=1; e.b11inv=1; S.ph=1; S.pats=[]; S.wolves=[]; send({s:"clr"}); e.an="kneel"; e.at=g.t; e.actT=g.t+99; S.trans=g.t; send({s:"p1d",t:g.t});
      A.fxp({k:"flash",col:"#ffffff",life:.4,max:.4}); g.shake=.5; A.sfx("win"); A.say("🌑 「어둠은… 아직 끝나지 않았다.」","enrage");
      sched(2.4,()=>{ e.an="sphere"; e.at=g.t; S.sphere={t0:g.t}; A.sfx("alarm") });
      sched(6.4,()=>{ e.max=e.max*S.p2Mul; e.hp=e.max; S.lastHp=e.hp; e.wq=0; e.weakT0=0; S.ph=2; S.sphere=null; e.an="awaken"; e.at=g.t; e.b11inv=0; e.actT=g.t+1.6; S.tod=0; S.todT0=g.t; resetTimers("mid"); S.gauge=Math.min(S.gauge,30);
        e.r=54; S.trans=0; send({s:"p2",tod:0,t0:g.t}); awakenFx(); A.say("🌑 검은 달이 떠올랐어요! 2페이즈 · "+B11_TOD[0].msg,"boss"); sched(1.8,()=>A.freeCard&&A.freeCard()) });
      return true }
    if(S.ph===2&&!S.deathT){ e.hp=1; e.b11inv=1; S.deathT=g.t; S.pats=[]; S.wolves=[]; S.shield=0; send({s:"die",t:g.t}); e.an="groggy"; e.at=g.t; e.actT=g.t+99; A.fxp({k:"flash",col:"#ffffff",life:.6,max:.6}); g.shake=.8; g.hitstop=.15; A.sfx("win");
      sched(1.2,()=>{ e.an="death"; e.at=g.t; A.sfx("enrage") });
      sched(8.6,()=>{ e.b11inv=0; e.hp=0; A.realKill(e); g.stageN=4; g.bossKills=Math.max(g.bossKills,3); A.say("🏆 군단장 「암흑의 검귀」 격파!","win"); sched(2.4,()=>A.endWin()) });
      return true }
    return true }

  /* ===== 같이하기: 상태 주고받기 ===== */
  function snap(){ const e=boss(); return {ph:S.ph,tod:S.tod,t0:+S.todT0.toFixed(2),an:e?e.an:"",at:e?+(e.at||0).toFixed(2):0,f:e?e.f:1,sh:S.shield&&e?+(S.shield/e.max).toFixed(4):0,sp:S.sphere?1:0,dt:S.deathT?1:0,in:S.intro?1:0,w:S.wolves.map(w=>[Math.round(w.x),Math.round(w.y),w.s,w.f]),nb:S.noonBonusUsed||0} }
  function recv(m){ const e=boss(); S.ph=m.ph; if(m.tod!==S.tod&&S.ph===2){ S.tod=m.tod } S.todT0=m.t0; S.intro=m.in; S.noonBonusUsed=m.nb; S.sphere=m.sp?(S.sphere||{t0:g.t}):null; S.deathT=m.dt?(S.deathT||g.t):0;
    if(e){ if(e.an!==m.an||Math.abs((e.at||0)-m.at)>.05){ e.an=m.an; e.at=m.at } e.f=m.f; S.shield=m.sh*e.max }
    const W=S.wolves; W.length=m.w.length; m.w.forEach((a,i)=>{ const w=W[i]||(W[i]={x:a[0],y:a[1]}); w.tx2=a[0]; w.ty2=a[1]; w.s=a[2]; w.f=a[3] }) }
  function onEv(m){ if(m.p){ if(!S.pats.some(q=>q.id===m.p.id)) addPat(Object.assign({},m.p)) }
    else if(m.s==="clr"){ S.pats=S.pats.filter(p=>p.k==="fx") }
    else if(m.s==="wake"){ S.intro=0; wakeFx() }
    else if(m.s==="p2"){ S.ph=2; S.tod=0; S.todT0=m.t0; S.trans=0; S.sphere=null; const e=boss(); if(e) e.r=54; awakenFx(); sched(1.8,()=>A.freeCard&&A.freeCard()) }
    else if(m.s==="p1d"){ S.ph=1; S.trans=g.t; S.pats=[]; A.fxp({k:"flash",col:"#ffffff",life:.4,max:.4}); g.shake=.5 }
    else if(m.s==="tod"){ S.tod=m.tod; S.todT0=m.t0; S.todAnn=g.t; A.fxp({k:"flash",col:B11_TOD[S.tod].col2,life:.6,max:.6}); if(B11_TOD[S.tod].k==="noon") sched(1.6,()=>A.todQuiz&&A.todQuiz()) }
    else if(m.s==="die"){ S.deathT=g.t; S.pats=[]; S.wolves=[]; A.fxp({k:"flash",col:"#ffffff",life:.6,max:.6}); g.shake=.8 }
    else if(m.s==="sph"){ S.sphere={t0:g.t} } else if(m.s==="sphx"){ S.sphere=null } }
  function fromClient(list){ for(const x of list){ if(x==="c") onCurse(); else if(x==="h") shieldAdd(.0025); else if(x==="q") shieldAdd(-.03); else if(x==="t") S.noonBonus=Math.min(10,S.noonBonus+3) } }
  function quizOk(){ S.gauge=Math.max(0,S.gauge-25); if(host()) shieldAdd(-.03); else (A.netOut.b11=A.netOut.b11||[]).push("q") }
  function quizNo(){ if(S.intro||isNoon()) return; A.fxp({k:"label",x:me().x,y:me().y-80,text:"🌑 암흑 게이지 +25",life:1.2,max:1.2}); S.gauge=Math.min(100,S.gauge+25); if(S.gauge>=100) curse() }
  function todOk(){ S.gauge=0; A.fxp({k:"label",x:me().x,y:me().y-80,text:"☀ 어둠이 걷혔어요! 다음 정오 +3초",life:1.4,max:1.4}); if(host()) S.noonBonus=Math.min(10,S.noonBonus+3); else (A.netOut.b11=A.netOut.b11||[]).push("t") }

  /* ===== 매 프레임 (모두) ===== */
  function tick(dt){ { const cc=!!(S.intro||S.ph===1||S.deathT||S.sphere); if(S._cc&&!cc) S.cineEnd=g.t+1.8; S._cc=cc; g.cine=cc||g.t<(S.cineEnd||0) }   /* 등장·각성·시간대가 바뀐 뒤 1.8초는 서로 쉬어요 (보스가 모습을 다 갖춘 뒤 싸움 시작) */   /* 시간대가 넘어가는 동안(어둠의 권능)도 서로 공격을 멈춰요 */ if(!host()){ schedTick(); for(const w of S.wolves){ if(w.tx2!==undefined){ w.x+=(w.tx2-w.x)*Math.min(1,dt*10); w.y+=(w.ty2-w.y)*Math.min(1,dt*10) } } }
    if(!S.placed){ S.placed=1; g.p.y=150+rnd(-30,30); g.p.x=rnd(-120,120) }
    clampP(g.p); patTick(dt); gaugeTick(dt);
    if(g.pstun>0) g.pstun-=dt }

  /* ===== 그리기 ===== */
  const ANIM={
    /* 1페이즈 (치비) */
    p1:{ idle:[[0,"c1"]], move:[[0,"c1"]], enter:[[0,"c7"]], wake:[[0,"c7",{sh:2,gl:1}],[.35,"c2",{dx:-6}],[.7,"c1"]],
      thrust:[[0,"c2",{dx:-12,sh:1.2,gl:1}],[.6,"c3",{dx:40,sc:1,gh:1}],[1.0,"c1"]],
      dash:[[0,"c2",{dx:-16,sh:1.6,gl:1}],[.8,"c3",{gh:1,dx:10}],[1.25,"c1"]],
      swing:[[0,"c2",{dx:-10,sh:1,gl:1}],[1.0,"c4",{dx:22,sc:1,gh:1}],[1.55,"c1"]],
      raise8:[[0,"c5",{dy:-12,gl:1,sh:.6}],[1.8,"c5",{sc:1,sh:2.5}],[2.4,"c1"]],
      groggy:[[0,"c6",{sh:1.2}]], kneel:[[0,"c8",{sh:1.5}]], sphere:[[0,"c8",{sh:2.5,gl:1}]] },
    /* 2페이즈 (성인) */
    p2:{ idle:[[0,"r0"]], move:[[0,"r1"]], awaken:[[0,"r11",{dy:-18,gl:1}],[1.4,"r0"]],
      thrust:[[0,"r0",{dx:-14,sh:1.2,gl:1,cr:1}],[.6,"r2",{dx:46,sc:1,gh:1}],[1.05,"r0"]],
      dash:[[0,"r1",{dx:-18,sh:1.6,gl:1,cr:1}],[.8,"r4",{gh:1,dx:14}],[1.3,"r0"]],
      swing:[[0,"r0",{dx:-12,sh:1,gl:1,cr:1}],[1.0,"r3",{dx:26,sc:1,gh:1}],[1.6,"r0"]],
      raise8:[[0,"r5",{dy:-8,gl:1,sh:.6}],[2.2,"r6",{sc:1,sh:2.5}],[2.8,"r0"]],
      raise12:[[0,"r5",{dy:-8,gl:1,sh:.6}],[1.5,"r6",{sc:1,sh:2.5}],[2.1,"r0"]],
      pierce:[[0,"r5",{gl:1,sh:.5}],[3.8,"r2",{dx:30,sc:1}],[4.5,"r0"]],
      plant:[[0,"r5",{gl:1,sh:.6,dy:-6}],[.8,"r6",{sc:1,sh:2}],[1.6,"r0"]],
      cdash1:[[0,"r1",{dx:-14,sh:1.4,gl:1,cr:1}],[.75,"r4",{gh:1}],[1.1,"r7",{sc:1}]],
      cdash2:[[0,"r7",{dx:-10,sh:1.2,gl:1}],[.75,"r4",{gh:1}],[1.1,"r8",{sc:1}]],
      cslam:[[0,"r8",{dx:-8,sh:1,gl:1}],[.7,"r9",{dy:-60,gl:1,sh:1}],[1.5,"r7",{dx:30,sc:1.4,gh:1}],[2.1,"r0"]],
      groggy:[[0,"r10",{sh:1.2}]], death:[[0,"r12",{sh:1}]], sphere:[[0,"r5",{gl:1}]] } };
  const ANIM_LEN={thrust:1,dash:1.25,swing:1.55,raise8:2.4,wake:.7,awaken:1.4,raise12:2.1,pierce:4.5,plant:1.6,cdash1:1.1,cdash2:1.1,cslam:2.1};
  const ease=q=>1-Math.pow(1-clamp(q,0,1),3);
  const STEP=.27;   /* 걷기: 왼발·오른발 그림을 번갈아 (뚜벅뚜벅) */
  function poseAt(e){ const set=S.ph===2||(S.ph===1&&e.an==="awaken")?ANIM.p2:ANIM.p1, seq=set[e.an]||set.idle, t=g.t-(e.at||0);
    if(e.an==="move"&&set===ANIM.p1&&IMG("cw1")&&IMG("cw2")){ const n=Math.floor(t/STEP); return {k:n%2?"cw2":"cw1",pk:null,fade:1,dx:0,dy:0,sh:0,gl:0,sc:0,gh:0,kt:t-n*STEP,until:9,walk:1} }
    if(e.an==="move"&&set===ANIM.p2&&IMG("rw1")&&IMG("rw2")){ const ST2=STEP*1.25, n=Math.floor(t/ST2); return {k:n%2?"rw2":"rw1",pk:null,fade:1,dx:0,dy:0,sh:0,gl:0,sc:0,gh:0,kt:(t-n*ST2)*STEP/ST2,until:9,walk:1} }   /* 2페이즈 걷기: 크게 내딛기 ↔ 발 모으기 (묵직하게) */
    let i=0; for(let j=0;j<seq.length;j++) if(t>=seq[j][0]) i=j; const cur=seq[i], prv=seq[i-1], kt=t-cur[0], o=cur[2]||{}, po=prv?(prv[2]||{}):{};
    const q=ease(kt/.14), dx=(po.dx||0)+((o.dx||0)-(po.dx||0))*q, dy=(po.dy||0)+((o.dy||0)-(po.dy||0))*q;
    const nxt=seq[i+1], until=nxt?nxt[0]-t:9, gl=(o.gl?Math.min(1,kt/Math.max(.2,(nxt?nxt[0]-cur[0]:1)*.9)):0);
    return {k:cur[1],pk:prv?prv[1]:null,fade:prv?clamp(kt/.09,0,1):1,dx,dy,sh:o.sh||0,gl,sc:o.sc?Math.max(0,1-kt/.18)*o.sc:0,gh:o.gh&&kt<.35?1-kt/.35:0,cr:o.cr,kt,until} }
  const DKC={}; function darkOf(k,im){ if(DKC[k]) return DKC[k]; const c=document.createElement("canvas"); c.width=im.width; c.height=im.height; const x=c.getContext("2d"); x.drawImage(im,0,0); x.globalCompositeOperation="source-in"; x.fillStyle="#0a0212"; x.fillRect(0,0,c.width,c.height); return DKC[k]=c }
  const WC={}; function whiteOf(k,im){ if(WC[k]) return WC[k]; const c=document.createElement("canvas"); c.width=im.width; c.height=im.height; const x=c.getContext("2d"); x.drawImage(im,0,0); x.globalCompositeOperation="source-in"; x.fillStyle="#fff"; x.fillRect(0,0,c.width,c.height); return WC[k]=c }
  const TC={}; function tintOf(k,im,col){ const key=k+col; if(TC[key]) return TC[key]; const c=document.createElement("canvas"); c.width=im.width; c.height=im.height; const x=c.getContext("2d"); x.drawImage(im,0,0); x.globalCompositeOperation="source-atop"; x.fillStyle=col; x.fillRect(0,0,c.width,c.height); return TC[key]=c }
  /* 보스 크기: 치비는 키 약 200, 성인은 약 270 (세상 단위) */
  const scaleOf=k=>k[0]==="c"?.66:.47;   /* 2페이즈: 각성 치비 (1페이즈의 약 1.3배) */   /* 1페이즈도 조금 더 크게 (2026-10-25) */   /* 2페이즈는 각성해서 훨씬 커요 */
  function drawPose(c,e,k,alpha,ox,oy,extraSx,extraSy){ const im=IMG(k), M=B11_META[k]; if(!im||!M) return false; const s=scaleOf(k), w=M[2]*s, h=M[3]*s, f=(e.f||1)*(B11_FLIP[k]?-1:1);
    c.save(); c.globalAlpha*=alpha; c.translate(e.x+ox,e.y+e.r*.95+oy); c.scale(f*(extraSx||1),extraSy||1); c.drawImage(im,-M[0]*w,-M[1]*h,w,h);
    if(e.flash>0){ c.globalAlpha=Math.min(.1,e.flash*1.2)*alpha;   /* 맞을 때 하얀 번쩍임은 아주 살짝만 (계속 맞아도 보스가 하얗게 바래지 않게) */ c.drawImage(whiteOf(k,im),-M[0]*w,-M[1]*h,w,h) }
    const T=tod(); if(T&&T.k!=="mid"&&k[0]==="r"){ c.globalAlpha=alpha*(T.k==="noon"?.35:.22); c.drawImage(tintOf(k,im,T.k==="noon"?"#fff6d0":T.k==="dawn"?"#ff5a30":"#c070ff"),-M[0]*w,-M[1]*h,w,h) }
    c.restore(); return true }
  function teleA(){ let a=1; for(const p of S.pats){ if(p.vis!=="tele") continue; const tt=g.t-p.t0; a=Math.min(a,tt<.3?1-tt/.3:tt<p.w?0:Math.min(1,(tt-p.w)/.25)) } return Math.max(0,a) }
  function drawBoss(c,e){ const A_=teleA(); if(A_<=0) return; if(A_<1){ c.save(); c.globalAlpha=A_; drawBoss0(c,e); c.restore(); return } drawBoss0(c,e) }
  function drawBoss0(c,e){ const t=g.t, Q=poseAt(e), f=e.f||1;
    const bob=Q.walk?Math.sin(Q.kt/STEP*Math.PI)*3.5:e.an==="move"||e.an==="idle"?Math.sin(t*(e.an==="move"?7:2.2))*(S.ph===2?2.5:4):0, breath=e.an==="idle"?1+Math.sin(t*2.2)*.012:1;
    const shx=Q.sh?(Math.random()-.5)*Q.sh*3:0, ox=Q.dx*f+shx, oy=Q.dy-Math.abs(bob)-(S.ph===0&&e.an!=="enter"&&e.an!=="kneel"&&e.an!=="sphere"?10:0);
    const sq=Q.sc?1+Q.sc*.06:1, aw=S.awT&&g.t-S.awT<.7?(()=>{ const q=(g.t-S.awT)/.7; return q<.35?.55+q/.35*.6:1.15-(q-.35)/.65*.15 })():1;
    /* 그림자 */
    c.save(); c.fillStyle="rgba(10,0,20,.42)"; c.beginPath(); c.ellipse(e.x,e.y+e.r*.95,S.ph===2?66:52,S.ph===2?17:14,0,0,TAU); c.fill(); c.restore();
    if(Q.walk&&Q.kt<.24){ const q=Q.kt/.24, fy=e.y+e.r*.95; c.save(); for(const sx of [-1,1]){ c.fillStyle=`rgba(150,110,200,${.38*(1-q)})`; c.beginPath(); c.ellipse(e.x+sx*(14+q*16)-f*8,fy-q*5,7+q*9,3+q*3,0,0,TAU); c.fill() } c.restore() }   /* 발 디딜 때 작은 먼지 */
    /* 발밑 어둠 고리 */
    const T=tod(), col=T?T.col:"150,70,255";
    c.save(); c.globalCompositeOperation="lighter"; const pu=.5+.5*Math.sin(t*3); const gr=c.createRadialGradient(e.x,e.y+e.r*.9,4,e.x,e.y+e.r*.9,S.ph===2?120:90); gr.addColorStop(0,`rgba(${col},${.30+.12*pu})`); gr.addColorStop(1,`rgba(${col},0)`); c.fillStyle=gr; c.beginPath(); c.ellipse(e.x,e.y+e.r*.9,S.ph===2?120:90,S.ph===2?34:26,0,0,TAU); c.fill(); c.restore();
    /* 힘 모으기 빛 */
    if(Q.gl>0){ c.save(); c.globalCompositeOperation="lighter"; const R=60+Q.gl*70, gx=e.x+f*30, gy=e.y-40; const g2=c.createRadialGradient(gx,gy,0,gx,gy,R); g2.addColorStop(0,`rgba(${col},${.55*Q.gl})`); g2.addColorStop(1,`rgba(${col},0)`); c.fillStyle=g2; c.beginPath(); c.arc(gx,gy,R,0,TAU); c.fill();
      for(let i=0;i<6;i++){ const a=t*3+i*1.05, r=R*(1-((t*1.5+i/6)%1)); c.fillStyle=`rgba(255,240,255,${.7*Q.gl})`; c.fillRect(gx+Math.cos(a)*r-1.5,gy+Math.sin(a)*r-1.5,3,3) } c.restore() }
    /* 잔상 */
    if(Q.gh>0){ for(let j=3;j>=1;j--){ c.save(); c.globalAlpha=.18*Q.gh*(4-j)/3; c.globalCompositeOperation="lighter"; drawPose(c,e,Q.k,1,ox-f*j*26,oy,1,1); c.restore() } }
    /* 이전 자세 → 지금 자세로 부드럽게 */
    const dfa=e.an==="death"?clamp(1-(g.t-(e.at||0)-5.6)/1.6,0,1):1; c.save(); c.globalAlpha*=dfa;   /* 처치: 대사가 끝나면 빛으로 흩어지며 사라져요 */
    { const im=IMG(Q.k), M=B11_META[Q.k]; if(im&&M&&e.an!=="death"&&teleA()>=.99){ const s2=scaleOf(Q.k)*1.06, w=M[2]*s2, h=M[3]*s2, ff=(e.f||1)*(B11_FLIP[Q.k]?-1:1), pu=.5+.5*Math.sin(t*3);   /* 테두리 빛: 어떤 바닥·이펙트 위에서도 보스 윤곽이 또렷하게 */
        const s3=scaleOf(Q.k)*1.1, w3=M[2]*s3, h3=M[3]*s3; c.save(); c.globalAlpha*=.5; c.translate(e.x+ox,e.y+e.r*.95+oy+h3*.02); c.scale(ff,1); c.drawImage(darkOf(Q.k,im),-M[0]*w3,-M[1]*h3,w3,h3); c.restore();   /* 진한 그림자 테두리 → 어떤 경고 위에서도 보스가 떠 보여요 */
        c.save(); c.globalAlpha*=(.3+.1*pu); c.translate(e.x+ox,e.y+e.r*.95+oy+h*.012); c.scale(ff,1); c.drawImage(whiteOf(Q.k,im),-M[0]*w,-M[1]*h,w,h); c.restore() } }
    if(Q.pk&&Q.fade<1) drawPose(c,e,Q.pk,1-Q.fade,ox,oy,1,1);
    drawPose(c,e,Q.k,Q.pk?Q.fade:1,ox,oy,aw*breath*(1+(sq-1)*.6),aw*breath/(1+(sq-1)*.4)*(1-(sq-1)*.2)) || drawFallback(c,e); c.restore();
    /* 정오가 아니면 성인 검귀 뒤 검은 달이 은은하게 맥박쳐요 */
    if(S.shield>0&&T&&T.k==="dusk"){ const SH=IMG("shield"), e2=e, pu=.5+.5*Math.sin(t*2.6), hh=270*(1+.02*pu), ww=SH?hh*SH.width/SH.height:hh*.78, fr=Math.min(1,S.shield/(e2.max*.08)), hk=S.shHit&&t-S.shHit<.35?1-(t-S.shHit)/.35:0;   /* 어둠 보호막 */
      c.save(); c.globalCompositeOperation="lighter"; c.globalAlpha=(.55+.3*pu)*(.45+.55*fr)+hk*.4; if(SH) c.drawImage(SH,e.x-ww/2,e.y-hh*.62,ww,hh); else { c.strokeStyle="rgba(200,120,255,.7)"; c.lineWidth=6; c.beginPath(); c.ellipse(e.x,e.y-70,ww/2,hh/2,0,0,TAU); c.stroke() }
      if(hk>0){ c.globalAlpha=hk; c.strokeStyle="#fff0ff"; c.lineWidth=2; for(let k=0;k<6;k++){ const a=k*1.05+S.shHit*7, r=ww*.42; c.beginPath(); for(let j=0;j<6;j++){ const b=j*Math.PI/3; c.lineTo(e.x+Math.cos(a)*r*.6+Math.cos(b)*10,e.y-70+Math.sin(a)*hh*.3+Math.sin(b)*10) } c.closePath(); c.stroke() } } c.restore() }
    if(S.shBreak&&t-S.shBreak<.9){ const k=(t-S.shBreak)/.9; c.save(); c.globalCompositeOperation="lighter"; for(let i=0;i<26;i++){ const a=i*.242*TAU/6.28, d=60+k*240; c.globalAlpha=1-k; c.fillStyle=i%2?"#d8a8ff":"#ff9ae0"; c.save(); c.translate(e.x+Math.cos(a)*d,e.y-70+Math.sin(a)*d*.8); c.rotate(k*6+i); c.fillRect(-6,-3,12,6); c.restore() } c.restore() }
    /* 그림자 구체 */
    if(S.sphere&&g.t>=S.sphere.t0){ const k=Math.min(1,(g.t-S.sphere.t0)/.5), R=(S.ph===2?190:150)*k; c.save(); const sg=c.createRadialGradient(e.x,e.y-60,R*.2,e.x,e.y-60,R); sg.addColorStop(0,"rgba(20,0,40,.25)"); sg.addColorStop(.75,"rgba(40,0,70,.55)"); sg.addColorStop(1,"rgba(190,120,255,.0)"); c.fillStyle=sg; c.beginPath(); c.arc(e.x,e.y-60,R,0,TAU); c.fill();
      c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(190,120,255,${.6+.3*Math.sin(t*8)})`; c.lineWidth=4; c.beginPath(); c.arc(e.x,e.y-60,R*.96,0,TAU); c.stroke();
      for(let i=0;i<14;i++){ const a=t*1.6+i*.45, r=R*(.4+.5*((i*.37+t*.5)%1)); c.fillStyle="rgba(230,200,255,.8)"; c.fillRect(e.x+Math.cos(a)*r-1.5,e.y-60+Math.sin(a)*r-1.5,3,3) } c.restore() }
    /* 기절: 별 */
    if(e.an==="groggy"){ c.save(); c.font='20px sans-serif'; c.textAlign="center"; for(let i=0;i<3;i++){ const a=t*4+i*2.1; c.fillText("⭐",e.x+Math.cos(a)*34,e.y-(S.ph===2?320:190)+Math.sin(a)*8) } c.restore() }
    /* 사망: 빛 조각 */
    if(e.an==="death"){ const k=g.t-(e.at||0); c.save(); c.globalCompositeOperation="lighter"; for(let i=0;i<26;i++){ const a=i*2.4, r=20+((k*60+i*13)%160); c.fillStyle=`rgba(255,240,220,${Math.max(0,.8-k*.15)})`; c.fillRect(e.x+Math.cos(a)*r*.6,e.y-120-((k*80+i*17)%220),3,3) } c.restore() } }
  function drawFallback(c,e){ c.save(); c.fillStyle="#2a1440"; c.beginPath(); c.arc(e.x,e.y-40,40,0,TAU); c.fill(); c.restore(); return true }

  /* 경고 그림: 1~10단계 보스와 같은 세련된 경고 그림을 써요 (그림이 없으면 단순한 도형) */
  const DC=()=>typeof dangerCol==="function"?dangerCol():"#ff4a4a";
  /* 시간대 경고 그림 (2페이즈): 자정 달 · 여명 불꽃 · 정오 태양 · 황혼 늑대 발톱 */
  const TODC_RGB={mid:"190,140,255",dawn:"255,140,120",noon:"255,170,60",dusk:"255,160,70"};
  function todW(kind){ const T=tod(), k=T?T.k:"mid"; const im=IMG(kind+"_"+k); return im?{im,k}:null }   /* 경고 그림은 렉 줄이기 모드에서도 그대로 · 1페이즈는 자정(달) 무늬 */
  function wCirc(c,x,y,r,q,t,fire,vis){ if(vis==="tele") return;   /* 순간이동 표식은 따로 그려요 */
    if(vis==="moonorb"&&IMG("moonc")){ const im=IMG("moonc"); c.save(); c.translate(x,y); c.scale(1,.75); c.rotate(t*.4); c.globalAlpha=Math.min(1,.4+q*.9); c.drawImage(im,-r*1.05,-r*1.05,r*2.1,r*2.1); c.globalCompositeOperation="lighter"; c.globalAlpha=.25*q; c.drawImage(im,-r*1.05,-r*1.05,r*2.1,r*2.1); c.restore(); return }   /* 달 구슬 그림 */
    if(vis==="moonorb"){ const pu=.5+.5*Math.sin(t*6); c.save(); c.translate(x,y); c.scale(1,.75);   /* 달 구슬: 은은한 달빛 고리 (다른 원과 다르게) */
      const gg=c.createRadialGradient(0,0,r*.2,0,0,r); gg.addColorStop(0,`rgba(200,220,255,${.05+.12*q})`); gg.addColorStop(1,`rgba(150,170,255,${.15+.2*q})`); c.fillStyle=gg; c.beginPath(); c.arc(0,0,r,0,TAU); c.fill();
      c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(225,235,255,${.7+.3*pu})`; c.lineWidth=4; c.beginPath(); c.arc(0,0,r,0,TAU); c.stroke(); c.lineWidth=2; c.setLineDash([4,10]); c.lineDashOffset=t*30; c.beginPath(); c.arc(0,0,r*.78,0,TAU); c.stroke(); c.setLineDash([]);
      c.strokeStyle=`rgba(225,235,255,${.5+.4*q})`; c.lineWidth=3; c.beginPath(); c.arc(0,0,r*q,0,TAU); c.stroke(); c.restore(); return }
    if(vis==="sword"&&IMG("target")){ const im=IMG("target"); c.save(); c.translate(x,y); c.scale(1,.75); c.fillStyle="rgba(12,4,30,.4)"; c.beginPath(); c.arc(0,0,r,0,TAU); c.fill(); const sc=1.25-.25*Math.min(1,q*1.5); c.rotate(-t*.5); c.globalAlpha=Math.min(1,.45+q*.8); c.drawImage(im,-r*sc,-r*sc,r*2*sc,r*2*sc); c.restore(); return }   /* 검 낙하 표적: 크게 나타났다가 조여 들어와요 */
    const TW_=vis==="meteor"||vis==="flame"||vis==="orb"||vis==="pillar"?todW("wc"):null; if(TW_){ const C=TODC_RGB[TW_.k], ap=Math.min(1,q*4);
      c.save(); c.translate(x,y); c.scale(1,.75); c.fillStyle=`rgba(${C},${.08+.14*q})`; c.beginPath(); c.arc(0,0,r*q,0,TAU); c.fill();
      if(TW_.k==="dawn"||TW_.k==="noon"){ c.fillStyle="rgba(12,4,30,.55)"; c.beginPath(); c.arc(0,0,r*1.02,0,TAU); c.fill(); c.strokeStyle=`rgba(255,250,235,${.55+.35*Math.sin(t*10)*.5+.2})`; c.lineWidth=4; c.beginPath(); c.arc(0,0,r*1.03,0,TAU); c.stroke() }   /* 붉고 밝은 바닥: 어두운 바탕 + 흰 테두리로 또렷하게 */
      c.rotate(t*.35); c.globalAlpha=ap; c.drawImage(TW_.im,-r*1.04,-r*1.04,r*2.08,r*2.08); if(S.pats.length<7){ c.globalCompositeOperation="lighter"; c.globalAlpha=ap*(.2+.25*Math.max(0,Math.sin(t*9))); c.drawImage(TW_.im,-r*1.04,-r*1.04,r*2.08,r*2.08) } c.restore(); return }   /* 패턴이 많을 땐 반짝임 생략 (렉 줄이기) */
    if(typeof jfWarn==="function"){ jfWarn(c,{x,y,r,fire:fire?1:0,th:fire?"fire":""},1-q,t); return }
    c.save(); c.fillStyle=`rgba(235,60,90,${.1+.15*q})`; c.strokeStyle="rgba(255,80,110,.9)"; c.lineWidth=3; c.beginPath(); c.ellipse(x,y,r,r*.75,0,0,TAU); c.fill(); c.stroke(); c.restore() }
  function wLine(c,x,y,a,len,wd,q,t,fire,sty){
    if(sty==="beam"||sty==="ray"){ const T=tod(), C=T?TODC_RGB[T.k]:"230,120,255", HW=wd/2, pu=.5+.5*Math.sin(t*14); c.save(); c.translate(x,y); c.rotate(a);   /* 빛줄기(십자·팔방): 가운데 가는 빛 + 양옆으로 번지는 빛 · 끝으로 갈수록 옅게 */
      const fade=sty==="ray"?c.createLinearGradient(0,0,len,0):null; if(fade){ fade.addColorStop(0,`rgba(${C},${.32+.2*q})`); fade.addColorStop(1,`rgba(${C},.04)`) }
      c.fillStyle=fade||`rgba(${C},${.1+.16*q})`; c.fillRect(0,-HW,len,HW*2); c.fillStyle="rgba(10,0,25,.25)"; c.fillRect(0,-HW*.5,len,HW);
      const BM=IMG("beam"); if(BM){ const bh=Math.max(wd*1.5,40), seg=bh*BM.width/BM.height; c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(1,.45+q*.8)*(.8+.2*pu); for(let s0=0;s0<len;s0+=seg-2) c.drawImage(BM,s0,-bh/2,seg,bh); c.globalAlpha=1 }   /* 빛줄기 그림 */
      c.globalCompositeOperation="lighter"; c.fillStyle=`rgba(255,255,255,${(.25+.45*q)*(.7+.3*pu)})`; c.fillRect(0,-1.5-q*2,len,3+q*4);
      c.strokeStyle=`rgba(${C},${.7+.3*pu})`; c.lineWidth=2; c.beginPath(); c.moveTo(0,-HW); c.lineTo(len,-HW); c.moveTo(0,HW); c.lineTo(len,HW); c.stroke();
      for(let k=0;k<6;k++){ const u=((t*.9+k/6)%1)*len; c.fillStyle=`rgba(255,255,255,${.7*q})`; c.beginPath(); c.moveTo(u+10,0); c.lineTo(u,-4); c.lineTo(u-10,0); c.lineTo(u,4); c.closePath(); c.fill() }
      c.restore(); return }
    if(sty==="wave"){ const HW=wd/2, T=tod(), C=T?TODC_RGB[T.k]:"230,140,255"; c.save(); c.translate(x,y); c.rotate(a);   /* 초승달 베기: 어두운 길 + 둥근 물결 테두리 */
      const WV=IMG("wave"); if(WV){ const bh=wd, seg=bh*WV.width/WV.height, off=-((t*140)%seg); c.save(); c.beginPath(); c.rect(0,-bh/2-4,len,bh+8); c.clip(); c.globalAlpha=Math.min(1,.5+q*.7); for(let s0=off;s0<len;s0+=seg-2) c.drawImage(WV,s0,-bh/2,seg,bh); c.restore(); c.fillStyle=`rgba(${C},${.1+.2*q})`; c.fillRect(0,-HW*.8,len*q,HW*1.6); c.restore(); return }   /* 초승달 길 그림 */
      c.fillStyle=`rgba(20,0,35,${.3+.2*q})`; c.fillRect(0,-HW,len,HW*2); c.fillStyle=`rgba(${C},${.12+.2*q})`; c.fillRect(0,-HW,len*q,HW*2);
      c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(${C},.9)`; c.lineWidth=2.5; for(const sg of [-1,1]){ c.beginPath(); for(let u=0;u<=len;u+=12){ const yy=sg*HW+Math.sin(u*.05-t*8)*4; u?c.lineTo(u,yy):c.moveTo(u,yy) } c.stroke() } c.restore(); return }
    if(sty==="red"&&IMG("redline")){ const im=IMG("redline"), HW=wd/2, bh=wd*1.04, seg=bh*im.width/im.height; c.save(); c.translate(x,y); c.rotate(a); c.fillStyle="rgba(20,0,0,.35)"; c.fillRect(0,-bh/2,len,bh); c.beginPath(); c.rect(0,-bh/2-2,len,bh+4); c.clip(); c.globalAlpha=Math.min(1,.5+q*.8); const off=-((t*160)%seg); for(let s0=off;s0<len;s0+=seg-2) c.drawImage(im,s0,-bh/2,seg,bh); c.fillStyle=`rgba(255,120,60,${.15+.2*q})`; c.fillRect(0,-HW,len*q,HW*2); c.restore(); return }   /* 흑염 마지막 베기 */
    const TL=sty==="band"?todW("wl"):null; if(TL){ const HW=wd/2, C=TODC_RGB[TL.k], im=TL.im, bh=wd*1.04, seg=bh*im.width/im.height, ap=Math.min(1,q*4);
      c.save(); c.translate(x,y); c.rotate(a); if(TL.k==="dawn"||TL.k==="noon"){ c.fillStyle="rgba(12,4,30,.55)"; c.fillRect(0,-bh/2,len,bh); c.strokeStyle="rgba(255,250,235,.75)"; c.lineWidth=3; c.strokeRect(0,-bh/2-1,len,bh+2) } c.fillStyle=`rgba(${C},${.1+.18*q})`; c.fillRect(0,-HW,len*q,HW*2); c.beginPath(); c.rect(0,-bh/2-2,len,bh+4); c.clip(); c.globalAlpha=ap; const off=-((t*120)%seg);
      for(let s0=off;s0<len;s0+=seg) c.drawImage(im,s0,-bh/2,seg+1,bh); if(S.pats.length<7){ c.globalCompositeOperation="lighter"; c.globalAlpha=ap*(.15+.2*Math.max(0,Math.sin(t*12))); for(let s0=off;s0<len;s0+=seg) c.drawImage(im,s0,-bh/2,seg+1,bh) } c.restore(); return }
    const HW=wd/2, T=typeof warnTex==="function"?warnTex("warnlaser",fire?"#ff6a30":DC()):null; c.save(); c.translate(x,y); c.rotate(a);
    c.fillStyle=fire?`rgba(255,90,40,${.08+.2*q})`:`rgba(233,40,60,${.08+.2*q})`; c.fillRect(0,-HW,len,HW*2); c.fillStyle=fire?"rgba(255,120,60,.22)":"rgba(255,80,80,.22)"; c.fillRect(0,-HW,len*q,HW*2);
    if(T){ c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(1,q*5)*(.8+.2*Math.sin(t*16)); const SEG=Math.max(1,Math.round(len/520)), sl=len/SEG; for(let i=0;i<SEG;i++) c.drawImage(T,i*sl-8,-HW-12,sl+16,HW*2+24); c.globalCompositeOperation="source-over"; c.globalAlpha=1 }
    c.strokeStyle=`rgba(255,255,255,${.5+.4*Math.sin(t*16+Math.PI)})`; c.lineWidth=1.6; c.setLineDash([12,8]); c.lineDashOffset=-t*50; c.strokeRect(0,-HW,len,HW*2); c.setLineDash([]); c.restore() }
  function wCone(c,p,q,t){ if(typeof drawSig46Fx!=="function") return false; try{ return !!drawSig46Fx(c,{k:"conewarn",x:p.x,y:p.y,a:p.a,r:p.r,half:p.h},1-q,t) }catch(e){ return false } }
  /* 경고·효과 (바닥) */
  function drawGround(c){ { const T=tod(); window.__dcOv=T&&T.dc?T.dc:null } const t=g.t;
    drawArena(c);
    { /* 밝은 바닥(정오·여명)에서도 경고가 잘 보이게: 경고 모양 아래에 진한 그림자를 깔아요 */
      const lit=S.ph===2?(()=>{ const f=todMix(), L=k=>k==="noon"?1:k==="dawn"?1:k==="dusk"?.6:0;   /* 밝거나 붉은 바닥(정오·여명)에서는 경고 아래를 어둡게 깔아 또렷하게 */ return L(B11_TOD[S.tod].k)*(1-f)+L(B11_TOD[(S.tod+1)%4].k)*f })():0;
      if(lit>.02){ c.save(); c.fillStyle=`rgba(14,0,32,${.6*lit})`; c.strokeStyle=`rgba(14,0,32,${.35*lit})`; c.lineWidth=14;   /* 테두리 선 없이 부드러운 어두운 바탕만 (경고 무늬가 또렷하게) */
        for(const p of S.pats){ const tt=t-p.t0, w=p.w||0; if(tt>=w) continue;
          if(p.k==="circ"){ c.beginPath(); c.ellipse(p.x,p.y,p.r,p.r*.75,0,0,TAU); c.fill(); c.stroke() }
          else if(p.k==="line"||p.k==="proj"){ const wd=p.k==="proj"?p.r*2:p.wd; c.save(); c.translate(p.x,p.y); c.rotate(p.a); c.fillRect(0,-wd/2,p.len,wd); c.strokeRect(0,-wd/2,p.len,wd); c.restore() }
          else if(p.k==="rays"){ for(let i=0;i<p.n;i++){ c.save(); c.translate(p.x,p.y); c.rotate(p.a0+i*TAU/p.n); c.fillRect(0,-p.wd/2,p.len,p.wd); c.restore() } }
          else if(p.k==="cone"){ c.beginPath(); c.moveTo(p.x,p.y); c.arc(p.x,p.y,p.r,p.a-p.h,p.a+p.h); c.closePath(); c.fill(); c.stroke() }
          else if(p.k==="grid"){ for(const G of GS(p)){ const cs=p.cell, x0=G.cx-cs*1.5, y0=G.cy-cs*1.5; for(let i=0;i<9;i++) if(!G.safe.includes(i)) c.fillRect(x0+(i%3)*cs+3,y0+Math.floor(i/3)*cs+3,cs-6,cs-6) } }
          else if(p.k==="pounce"){ c.save(); c.translate(p.x,p.y); c.rotate(Math.atan2(p.ty-p.y,p.tx-p.x)); c.fillRect(0,-46,Math.hypot(p.tx-p.x,p.ty-p.y),92); c.restore() }
          else if(p.k==="crown"){ for(let i=0;i<p.n;i++){ const x=p.x+Math.cos(p.a)*p.step*(i+1), y=p.y+Math.sin(p.a)*p.step*(i+1); c.beginPath(); c.ellipse(x,y,p.r,p.r*.75,0,0,TAU); c.fill() } } }
        c.restore() } }
    for(const p of S.pats){ const tt=t-p.t0, w=p.w||0, q=clamp(tt/Math.max(.01,w),0,1), pre=tt<w, al=pre?1:Math.max(0,1-(tt-w)/.5);
      const red=p.vis==="flame"||p.vis==="meteor"||p.vis==="redline"||p.burn?"255,90,40":"255,50,110", RC=`rgba(${red},`;
      if(p.k==="cone"&&pre){ if(!wCone(c,p,q,t)){ c.save(); c.fillStyle=RC+(.12+.2*q)+")"; c.strokeStyle=RC+".9)"; c.lineWidth=3; c.beginPath(); c.moveTo(p.x,p.y); c.arc(p.x,p.y,p.r,p.a-p.h,p.a+p.h); c.closePath(); c.fill(); c.stroke(); c.restore() } }
      else if(p.k==="proj"&&pre){ wLine(c,p.x,p.y,p.a,p.len,p.r*2,q,t,0,"wave");
        c.save(); c.translate(p.x,p.y); c.rotate(p.a); for(let i=1;i<=3;i++){ const ax=((t*260+i*120)%Math.min(p.len,520)); c.fillStyle="rgba(255,235,255,.8)"; c.beginPath(); c.moveTo(ax+18,0); c.lineTo(ax,-12); c.lineTo(ax+6,0); c.lineTo(ax,12); c.closePath(); c.fill() } c.restore() }
      else if(p.k==="line"&&pre&&p.vis==="laser"&&IMG("laser")){ const im=todTint(IMG("laser")), hh=p.wd*1.25, seg=hh*im.width/im.height; c.save(); c.translate(p.x,p.y); c.rotate(p.a);
        c.fillStyle=`rgba(40,0,50,${.25+.2*q})`; c.fillRect(0,-p.wd/2,p.len,p.wd); c.globalCompositeOperation="lighter"; const fl=tt>w-.35?(Math.sin(tt*40)>0?1:.5):1;
        c.globalAlpha=Math.min(1,.35+q*.8)*fl; for(let x=0;x<p.len;x+=seg*.96) c.drawImage(im,x-((t*90)%(seg*.08)),-hh/2,seg,hh);
        if(tt>w-.35){ c.globalAlpha=.5*(1-(w-tt)/.35); c.fillStyle="#fff"; c.fillRect(0,-p.wd*.12,p.len,p.wd*.24) } c.globalCompositeOperation="source-over"; c.globalAlpha=1;
        const n=Math.min(3,Math.floor(tt/1.2)+1); for(let i=0;i<3;i++){ c.save(); c.translate(70+i*44,-p.wd/2-26); c.rotate(Math.PI/4); c.fillStyle=i<n?"rgba(255,80,200,.95)":"rgba(80,30,90,.7)"; c.strokeStyle="#fff"; c.lineWidth=2; c.fillRect(-11,-11,22,22); c.strokeRect(-11,-11,22,22); c.restore() } c.restore() }
      else if(p.k==="line"&&pre){ wLine(c,p.x,p.y,p.a,p.len,p.wd,q,t,p.burn||p.vis==="redline"?1:0,p.vis==="cross"||p.vis==="shard"?"beam":p.vis==="redline"?"red":"band");
        if(p.vis==="laser"){ c.save(); c.translate(p.x,p.y); c.rotate(p.a); const n=Math.min(3,Math.floor(tt/1.2)+1); for(let i=0;i<3;i++){ c.save(); c.translate(70+i*44,-p.wd/2-26); c.rotate(Math.PI/4); c.fillStyle=i<n?"rgba(255,80,200,.95)":"rgba(80,30,90,.7)"; c.strokeStyle="#fff"; c.lineWidth=2; c.fillRect(-11,-11,22,22); c.strokeRect(-11,-11,22,22); c.restore() } c.restore() } }
      else if(p.k==="rays"&&pre){ for(let i=0;i<p.n;i++) wLine(c,p.x,p.y,p.a0+i*TAU/p.n,p.len,p.wd,q,t,0,"ray") }
      else if(p.k==="circ"&&pre){ wCirc(c,p.x,p.y,p.r,q,t,p.vis==="flame"||p.vis==="meteor",p.vis); c.save();
        if(p.vis==="orb"||p.vis==="meteor"){ const h=(1-q)*420; c.globalCompositeOperation="lighter"; const og=c.createRadialGradient(p.x,p.y-h,0,p.x,p.y-h,p.vis==="meteor"?36:22); og.addColorStop(0,p.vis==="meteor"?"rgba(255,200,120,1)":"rgba(230,190,255,1)"); og.addColorStop(1,"rgba(120,40,200,0)"); c.fillStyle=og; c.beginPath(); c.arc(p.x,p.y-h,p.vis==="meteor"?36:22,0,TAU); c.fill() }
        if(p.vis==="tele"){ c.globalCompositeOperation="source-over"; for(const [X,Y,al] of [[p.x,p.y,.25+.55*q],[p.ox,p.oy,Math.max(0,.7-q)]]){ if(X===undefined) continue; const gg=c.createRadialGradient(X,Y,0,X,Y,p.r*.75); gg.addColorStop(0,`rgba(20,0,35,${al})`); gg.addColorStop(.7,`rgba(80,20,130,${al*.55})`); gg.addColorStop(1,"rgba(120,50,200,0)"); c.fillStyle=gg; c.beginPath(); c.ellipse(X,Y,p.r*.75,p.r*.56,0,0,TAU); c.fill() }
          c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(200,140,255,${.35+.4*q})`; c.lineWidth=3; for(let i=0;i<3;i++){ const aa=tt*(3+i)+i*2.1; c.beginPath(); c.ellipse(p.x,p.y,p.r*.6*(1-i*.22),p.r*.45*(1-i*.22),0,aa,aa+2.2); c.stroke() }
          /* 순간이동 도착 표식: 검은 균열 고리 + 바깥으로 도는 가시 + 검귀 그림자 (다른 패턴과 확 다르게) */
          const R=p.r, pu=.5+.5*Math.sin(tt*12); c.save(); c.translate(p.x,p.y); c.scale(1,.75);
          const PT=IMG("portal"); if(PT){ c.save(); c.rotate(tt*.8); c.globalAlpha=Math.min(1,.5+q*.6); const ss=R*(1.15+.08*pu); c.drawImage(PT,-ss,-ss,ss*2,ss*2); c.restore() }   /* 순간이동 포탈 그림 */
          c.globalCompositeOperation="source-over"; c.strokeStyle=`rgba(10,0,20,${.6+.3*q})`; c.lineWidth=14; c.beginPath(); c.arc(0,0,R,0,TAU); c.stroke();
          c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(255,90,220,${.55+.45*pu})`; c.lineWidth=4; c.beginPath(); c.arc(0,0,R,0,TAU); c.stroke(); c.strokeStyle=`rgba(255,220,255,${.4+.4*q})`; c.lineWidth=2; c.beginPath(); c.arc(0,0,R*.9,0,TAU*q); c.stroke();
          c.rotate(-tt*1.6); for(let i=0;i<10;i++){ c.save(); c.rotate(i*TAU/10); c.fillStyle=`rgba(255,120,230,${.5+.4*pu})`; c.beginPath(); c.moveTo(R+4,-7); c.lineTo(R+24+10*q,0); c.lineTo(R+4,7); c.closePath(); c.fill(); c.restore() } c.restore();
          { const e2=boss(); if(e2){ c.save(); c.globalCompositeOperation="source-over"; drawPose(c,{x:p.x,y:p.y-e2.r*.95+R*.3,r:e2.r,f:e2.f},S.ph===2?"r0":"c1",.18+.42*q,0,0); c.restore() } }
          c.save(); c.globalCompositeOperation="source-over"; c.font='bold 18px "Do Hyeon",sans-serif'; c.textAlign="center"; c.lineWidth=4; c.strokeStyle="#1a0420"; c.strokeText("⚠ 검귀가 여기로 와요!",p.x,p.y+R*.75+26); c.fillStyle="#ffc8f4"; c.fillText("⚠ 검귀가 여기로 와요!",p.x,p.y+R*.75+26); c.restore() }
        if(p.vis==="moonorb"){ c.globalCompositeOperation="lighter"; const bl=q>.67?(Math.sin(tt*30)>0?1:.3):.6; c.fillStyle=`rgba(220,200,255,${bl})`; c.beginPath(); c.arc(p.x,p.y-26,16,0,TAU); c.fill() }
        if(p.vis==="pillar"||p.vis==="sword"||p.vis==="flame"){ const im=IMG(p.vis==="flame"?"e3":"e1"); if(im&&q>.55){ const k2=(q-.55)/.45, hh=60*k2; c.globalAlpha=.35*k2; c.drawImage(im,p.x-hh*.33,p.y-hh*.9,hh*.67,hh) } }
        c.restore() }
      else if(p.k==="pool"&&!pre&&tt<w+p.dur+.3){ const k2=tt-w, a=Math.min(1,k2/.2)*Math.min(1,(w+p.dur+.3-tt)/.4); c.save(); c.globalAlpha=a; const R=p.r;   /* 그림자 웅덩이 */
        const gg=c.createRadialGradient(p.x,p.y,0,p.x,p.y,R); gg.addColorStop(0,"rgba(20,0,35,.85)"); gg.addColorStop(.75,"rgba(70,10,110,.6)"); gg.addColorStop(1,"rgba(150,60,255,0)"); c.fillStyle=gg; c.beginPath(); c.ellipse(p.x,p.y,R,R*.75,0,0,TAU); c.fill();
        c.strokeStyle=`rgba(200,120,255,${.5+.3*Math.sin(t*9)})`; c.lineWidth=2; c.setLineDash([8,6]); c.lineDashOffset=-t*30; c.beginPath(); c.ellipse(p.x,p.y,R*.92,R*.69,0,0,TAU); c.stroke(); c.setLineDash([]);
        for(let i=0;i<5;i++){ const u=((t*1.3+i/5)%1), bx=p.x+Math.cos(i*2.5)*R*.5, by=p.y+Math.sin(i*2.5)*R*.35; c.fillStyle=`rgba(190,120,255,${.6*(1-u)})`; c.beginPath(); c.arc(bx,by-u*16,3+u*3,0,TAU); c.fill() } c.restore() }
      else if(p.k==="grid"&&pre){ if(p.out) gridOut(c,p,q,t); for(const G of GS(p)){ const cs=p.cell, x0=G.cx-cs*1.5, y0=G.cy-cs*1.5;   /* 암흑 낙인: 1~10단계와 같은 타일 경고 · 안전 칸은 초록 빛기둥 */
        for(let i=0;i<9;i++){ const x=x0+(i%3)*cs+cs/2, y=y0+Math.floor(i/3)*cs+cs/2; if(G.safe.includes(i)) continue;
          if(!(typeof drawSig46Fx==="function"&&drawSig46Fx(c,{k:"tilewarn",x,y,s:cs},1-q,t))){ c.save(); c.fillStyle=RC+(.12+.25*q)+")"; c.fillRect(x-cs/2+3,y-cs/2+3,cs-6,cs-6); c.restore() } }
        for(const i of G.safe){ const x=x0+(i%3)*cs+cs/2, y=y0+Math.floor(i/3)*cs+cs/2, h=cs*.48, pu=.5+.5*Math.sin(t*7), T=typeof warnTex==="function"?warnTex("warntile",typeof SAFE_COL!=="undefined"?SAFE_COL:"#5af08a"):null;
          c.save(); c.translate(x,y); c.fillStyle=`rgba(40,255,140,${.14+.1*pu})`; c.fillRect(-h,-h,h*2,h*2);
          if(T){ c.globalCompositeOperation="lighter"; c.globalAlpha=.75+.25*pu; c.drawImage(T,-h*1.04,-h*1.04,h*2.08,h*2.08); c.globalAlpha=1 }
          c.globalCompositeOperation="lighter"; const lg=c.createLinearGradient(0,-h*3.2,0,h); lg.addColorStop(0,"rgba(120,255,180,0)"); lg.addColorStop(1,`rgba(140,255,190,${.28+.15*pu})`); c.fillStyle=lg; c.fillRect(-h*.8,-h*3.2,h*1.6,h*4.2);
          for(let k=0;k<6;k++){ const u=((t*.8+k/6)%1), px=Math.sin(k*2.3)*h*.7; c.fillStyle=`rgba(220,255,230,${1-u})`; c.fillRect(px-1.5,h*.6-u*h*3,3,6) }
          c.globalCompositeOperation="source-over"; c.strokeStyle=`rgba(200,255,220,${.7+.3*pu})`; c.lineWidth=3; c.strokeRect(-h,-h,h*2,h*2);
          c.font='bold 18px "Do Hyeon",sans-serif'; c.textAlign="center"; c.textBaseline="middle"; c.lineWidth=4; c.strokeStyle="#0a3a1c"; c.strokeText("안전!",0,0); c.fillStyle="#eafff0"; c.fillText("안전!",0,0); c.restore() } } }
      else if(p.k==="safe"&&pre&&p.ql){ c.save(); c.fillStyle=`rgba(30,0,50,${.3*q})`; c.fillRect(-AR.hw,-AR.hh,AR.hw*2,AR.hh*2);   /* 한자 기둥: 금빛 마법진 · 뜻은 위에 따로 */
        const all=[[p.x,p.y],...p.dec], pu=.5+.5*Math.sin(t*5), SE=IMG("seal");
        all.forEach(([x,y])=>{ const R=p.r; if(SE){ const w2=R*2.5, h2=w2*SE.height/SE.width; c.globalCompositeOperation="lighter"; c.globalAlpha=.75+.25*pu; c.drawImage(SE,x-w2/2,y-h2*.62,w2,h2); c.globalAlpha=1; c.globalCompositeOperation="source-over" }
          else { c.strokeStyle=`rgba(220,190,255,${.7+.25*pu})`; c.lineWidth=4; c.beginPath(); c.ellipse(x,y,R,R*.75,0,0,TAU); c.stroke() } });
        c.restore() }
      else if(p.k==="safe"&&pre){ c.save(); c.fillStyle=`rgba(30,0,50,${.25*q})`; c.fillRect(-AR.hw,-AR.hh,AR.hw*2,AR.hh*2);
        for(const [x,y] of p.dec){ c.fillStyle="rgba(60,0,90,.45)"; c.beginPath(); c.ellipse(x,y,70,44,0,0,TAU); c.fill(); c.strokeStyle="rgba(170,90,255,.7)"; c.lineWidth=2; c.stroke() }
        c.globalCompositeOperation="lighter"; const sg=c.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r); sg.addColorStop(0,"rgba(255,250,210,.55)"); sg.addColorStop(1,"rgba(255,220,120,.15)"); c.fillStyle=sg; c.beginPath(); c.ellipse(p.x,p.y,p.r,p.r*.75,0,0,TAU); c.fill();
        c.strokeStyle=`rgba(255,240,170,${.8+.2*Math.sin(t*9)})`; c.lineWidth=5; c.stroke(); c.globalCompositeOperation="source-over"; c.font='bold 22px "Do Hyeon",sans-serif'; c.textAlign="center"; c.fillStyle="#fff6c8"; c.strokeStyle="#2a0a3a"; c.lineWidth=4; const sec=Math.max(0,Math.ceil(w-tt)); c.strokeText(`여기로! ${sec}`,p.x,p.y-p.r*.7-10); c.fillText(`여기로! ${sec}`,p.x,p.y-p.r*.7-10); c.restore() }
      else if(p.k==="ring"){ const R=pre?p.R*q*.0:Math.min(p.R,(tt-w)*p.v); c.save(); if(pre){ c.strokeStyle=`rgba(255,230,140,${.4+.4*q})`; c.lineWidth=3; c.setLineDash([12,8]); c.beginPath(); c.ellipse(p.x,p.y,p.R,p.R*.75,0,0,TAU); c.stroke(); c.setLineDash([]) } else { c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(255,240,170,${Math.max(0,1-R/p.R)})`; c.lineWidth=26; c.beginPath(); c.ellipse(p.x,p.y,R,R*.75,0,0,TAU); c.stroke() } c.restore() }
      else if(p.k==="wall"){ const RX=p.rx||250, RY=RX*.6, FR=IMG("firering"), live=!pre&&tt<w+p.dur;   /* 흑염 결계: 둥근 불꽃 고리 (안쪽은 안전 · 테두리에 닿으면 데어요) */
        if(pre||live){ c.save(); const al=pre?.25+.45*q:Math.min(1,(tt-w)/.25,(w+p.dur-tt)/.5), fl=live?1+.03*Math.sin(t*9):.85+.15*ease(q);
          if(pre){ c.fillStyle=`rgba(255,110,40,${.05+.07*q})`; c.beginPath(); c.ellipse(p.cx,p.cy,RX,RY,0,0,TAU); c.fill(); c.strokeStyle=`rgba(255,170,90,${.5+.4*q})`; c.lineWidth=3; c.setLineDash([12,10]); c.lineDashOffset=-t*40; c.stroke(); c.setLineDash([]) }
          if(FR){ const sx=RX/345*fl, sy=RY/140*fl, W2=FR.width*sx, H2=FR.height*sy; c.globalAlpha=al; c.drawImage(FR,p.cx-406*sx,p.cy-325*sy,W2,H2); if(live){ c.globalCompositeOperation="lighter"; c.globalAlpha=al*(.18+.12*Math.sin(t*7)); c.drawImage(FR,p.cx-406*sx,p.cy-325*sy,W2,H2) } }
          else { c.globalCompositeOperation="lighter"; c.globalAlpha=al; c.strokeStyle="rgba(255,90,30,.8)"; c.lineWidth=20; c.beginPath(); c.ellipse(p.cx,p.cy,RX,RY,0,0,TAU); c.stroke(); c.strokeStyle="rgba(255,220,130,.9)"; c.lineWidth=4; c.stroke() }
          if(live&&tt-w<3){ c.globalCompositeOperation="source-over"; c.globalAlpha=Math.min(1,(3-(tt-w))/.6); c.font='bold 18px "Do Hyeon",sans-serif'; c.textAlign="center"; c.lineWidth=4; c.strokeStyle="#2a0806"; c.strokeText("안쪽은 안전! 불꽃에 닿지 마요",p.cx,p.cy); c.fillStyle="#ffe2b0"; c.fillText("안쪽은 안전! 불꽃에 닿지 마요",p.cx,p.cy) }
          c.restore() } }
      else if(p.k==="pounce"&&pre){ const a=Math.atan2(p.ty-p.y,p.tx-p.x), len=Math.hypot(p.tx-p.x,p.ty-p.y), pu=.5+.5*Math.sin(t*10);   /* 늑대 덮치기: 본체와 다른 얼음빛 하늘색 + 발자국 + 발톱 자국 */
        c.save(); c.translate(p.x,p.y); c.rotate(a);
        const bg=c.createLinearGradient(0,-46,0,46); bg.addColorStop(0,"rgba(10,30,60,.55)"); bg.addColorStop(.5,"rgba(20,60,110,.35)"); bg.addColorStop(1,"rgba(10,30,60,.55)"); c.fillStyle=bg; c.fillRect(0,-46,len,92);
        c.fillStyle=`rgba(120,230,255,${.12+.22*q})`; c.fillRect(0,-46,len*q,92);
        c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(150,240,255,${.75+.25*pu})`; c.lineWidth=3; c.beginPath(); c.moveTo(0,-46); c.lineTo(len,-46); c.moveTo(0,46); c.lineTo(len,46); c.stroke();
        const n=Math.max(2,Math.floor(len/52)); for(let k=0;k<n;k++){ const u=(k+.5)/n; if(u>q+.15) break; const px=u*len, py=(k%2?14:-14), al=Math.min(1,(q+.15-u)*5); c.save(); c.translate(px,py); c.rotate(Math.PI/2); c.fillStyle=`rgba(190,250,255,${.85*al})`;
          c.beginPath(); c.ellipse(0,4,7,6,0,0,TAU); c.fill(); for(const [dx,dy] of [[-7,-5],[-2.5,-9],[2.5,-9],[7,-5]]){ c.beginPath(); c.ellipse(dx,dy,2.4,3,0,0,TAU); c.fill() } c.restore() }
        c.globalCompositeOperation="source-over"; c.restore();
        c.save(); c.translate(p.tx,p.ty); c.fillStyle=`rgba(10,30,60,${.45+.2*q})`; c.beginPath(); c.ellipse(0,0,54,40,0,0,TAU); c.fill(); c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(150,240,255,${.8+.2*pu})`; c.lineWidth=3; c.stroke();
        c.rotate(a); c.lineCap="round"; c.strokeStyle=`rgba(210,250,255,${.4+.6*q})`; c.lineWidth=5; for(const o of [-16,0,16]){ c.beginPath(); c.moveTo(-22,o-10); c.quadraticCurveTo(0,o,22,o+10); c.stroke() } c.restore();
        c.save(); c.font='22px sans-serif'; c.textAlign="center"; c.textBaseline="middle"; c.globalAlpha=.9; c.fillText("🐺",p.x,p.y-56); c.restore() }
      else if(p.k==="crown"){ for(let i=0;i<p.n;i++){ const ti=w+i*p.gap, x=p.x+Math.cos(p.a)*p.step*(i+1), y=p.y+Math.sin(p.a)*p.step*(i+1); if(tt<ti){ const qq=clamp(1-(ti-tt)/(w+i*p.gap),0,1), nxt=ti-tt<p.gap+.05, im=IMG("wc_dusk"), pu=.5+.5*Math.sin(tt*14);   /* 월령 기상: 늑대 발톱 마법진이 순서대로 · 곧 솟을 곳은 밝게 깜빡 */
          c.save(); c.translate(x,y); c.scale(1,.75); c.fillStyle=`rgba(40,10,40,${.25+.2*qq})`; c.beginPath(); c.arc(0,0,p.r,0,TAU); c.fill();
          if(im){ c.rotate(tt*.6*(i%2?1:-1)); c.globalAlpha=(.35+.55*qq)*(nxt?.75+.25*pu:1); c.drawImage(im,-p.r*1.05,-p.r*1.05,p.r*2.1,p.r*2.1); if(nxt){ c.globalCompositeOperation="lighter"; c.globalAlpha=.35*pu; c.drawImage(im,-p.r*1.05,-p.r*1.05,p.r*2.1,p.r*2.1) } }
          else { c.strokeStyle=`rgba(255,170,80,${.4+.5*qq})`; c.lineWidth=3; c.beginPath(); c.arc(0,0,p.r,0,TAU); c.stroke() } c.restore();
          c.save(); c.font='bold 18px "Do Hyeon",sans-serif'; c.textAlign="center"; c.textBaseline="middle"; c.globalAlpha=.6+.4*qq; c.lineWidth=4; c.strokeStyle="#200818"; c.strokeText(String(i+1),x,y); c.fillStyle=nxt?"#fff2c0":"#ffc89a"; c.fillText(String(i+1),x,y); c.restore() } } } } }
  function drawCrown(c,x,y,q){ c.save(); c.translate(x,y); c.strokeStyle=`rgba(255,230,255,${.5+.5*q})`; c.lineWidth=2; c.beginPath(); c.moveTo(-26,6); c.lineTo(-26,-10); c.lineTo(-13,-2); c.lineTo(0,-16); c.lineTo(13,-2); c.lineTo(26,-10); c.lineTo(26,6); c.closePath(); c.stroke(); c.restore() }
  /* 터지는 효과 (보스보다 위) */
  function drawOver(c){ const t=g.t;
    { const e=boss(); if(e&&!S.deathT&&!S.intro&&teleA()>.5){ const k=S.ph===2?"r0":"c1", M=B11_META[k], h=M?M[3]*scaleOf(k):180, y=e.y+e.r*.95-h-22+Math.sin(t*4)*5;   /* 보스 머리 위 표시: 어디 있는지 한눈에 */
      c.save(); c.translate(e.x,y); c.fillStyle="rgba(20,4,30,.85)"; c.beginPath(); c.moveTo(-15,-14); c.lineTo(15,-14); c.lineTo(0,4); c.closePath(); c.fill(); c.fillStyle="#ffd36a"; c.beginPath(); c.moveTo(-11,-12); c.lineTo(11,-12); c.lineTo(0,1); c.closePath(); c.fill();
      c.font='bold 13px "Do Hyeon",sans-serif'; c.textAlign="center"; c.textBaseline="middle"; c.lineWidth=3; c.strokeStyle="#1a0420"; c.strokeText("보스",0,-24); c.fillStyle="#ffe9a0"; c.fillText("보스",0,-24);
      { const k2=clamp(e.hp/e.max,0,1); S.hpTr=S.hpTr==null||S.hpTr<k2?k2:S.hpTr+(k2-S.hpTr)*.06; const BW=86, BH=8, by=12;   /* 보스 머리 위 작은 체력바 (깎인 만큼 하얀 꼬리가 천천히 따라와요) */
        c.fillStyle="rgba(12,2,22,.88)"; c.fillRect(-BW/2-2,by-2,BW+4,BH+4); c.fillStyle="rgba(255,255,255,.75)"; c.fillRect(-BW/2,by,BW*S.hpTr,BH);
        const hg=c.createLinearGradient(0,by,0,by+BH); hg.addColorStop(0,e.an==="groggy"?"#ffe36a":"#ff6a8a"); hg.addColorStop(1,e.an==="groggy"?"#e0a020":"#c8204a"); c.fillStyle=hg; c.fillRect(-BW/2,by,BW*k2,BH);
        if(S.shield>0&&S.shMax){ c.fillStyle="rgba(120,200,255,.85)"; c.fillRect(-BW/2,by+BH-3,BW*clamp(S.shield/(S.shMax*.08),0,1),3) }
        c.strokeStyle="rgba(255,226,150,.8)"; c.lineWidth=1.2; c.strokeRect(-BW/2-1.5,by-1.5,BW+3,BH+3); c.fillStyle="rgba(12,2,22,.5)"; for(let i=1;i<4;i++) c.fillRect(-BW/2+BW*i/4-.5,by,1,BH) }
      c.restore() } }
    for(const p of S.pats){ const tt=t-p.t0, w=p.w||0; if(tt<w) continue; const k=tt-w;
      if(p.k==="pounce"){ const life=.55, k2=k-.3; if(k2<0||k2>life) continue; const q=k2/life, a=Math.atan2(p.ty-p.y,p.tx-p.x), fade=1-q;   /* 늑대 착지: 얼음빛 발톱 할퀴기 + 얼음 조각 (본체 공격과 다른 피격 효과) */
        c.save(); c.translate(p.tx,p.ty); c.globalCompositeOperation="lighter";
        const rg=c.createRadialGradient(0,0,0,0,0,70+40*q); rg.addColorStop(0,`rgba(200,250,255,${.55*fade})`); rg.addColorStop(1,"rgba(80,200,255,0)"); c.fillStyle=rg; c.beginPath(); c.ellipse(0,0,70+40*q,(70+40*q)*.75,0,0,TAU); c.fill();
        c.rotate(a+.5); c.lineCap="round"; for(const o of [-20,0,20]){ const L2=28+40*Math.min(1,q*3); c.strokeStyle=`rgba(120,220,255,${.9*fade})`; c.lineWidth=10*fade+2; c.beginPath(); c.moveTo(-L2,o-L2*.4); c.quadraticCurveTo(0,o,L2,o+L2*.4); c.stroke(); c.strokeStyle=`rgba(255,255,255,${fade})`; c.lineWidth=3*fade+1; c.stroke() }
        c.rotate(-a-.5); for(let i=0;i<10;i++){ const an=i*.628+p.id, d=20+90*q; c.fillStyle=`rgba(210,250,255,${fade})`; c.save(); c.translate(Math.cos(an)*d,Math.sin(an)*d*.75); c.rotate(an); c.beginPath(); c.moveTo(6,0); c.lineTo(0,-3); c.lineTo(-6,0); c.lineTo(0,3); c.closePath(); c.fill(); c.restore() }
        c.restore(); continue }
      if(p.k==="circ"&&(p.vis==="pillar"||p.vis==="flame"||p.vis==="sword")){ const im=IMG(p.vis==="flame"?"e3":"e1"); const life=.85, q=k/life; if(q>1) continue; const up=ease(Math.min(1,k/.12)), fade=q<.6?1:1-(q-.6)/.4, hh=(p.vis==="sword"?210:300)*up, ww=hh*(im?im.width/im.height:.67);
        c.save(); c.globalAlpha=fade; c.globalCompositeOperation="lighter"; if(im) c.drawImage(im,p.x-ww/2,p.y-hh*.94,ww,hh); else { c.fillStyle="rgba(150,60,255,.7)"; c.fillRect(p.x-14,p.y-hh,28,hh) } c.restore();
        c.save(); c.globalAlpha=fade*.8; c.globalCompositeOperation="lighter"; const bg=c.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*1.2); bg.addColorStop(0,p.vis==="flame"?"rgba(255,140,60,.8)":"rgba(200,130,255,.8)"); bg.addColorStop(1,"rgba(0,0,0,0)"); c.fillStyle=bg; c.beginPath(); c.ellipse(p.x,p.y,p.r*1.2,p.r*.75,0,0,TAU); c.fill(); c.restore() }
      else if(p.k==="circ"&&(p.vis==="orb"||p.vis==="meteor"||p.vis==="moonorb")){ const q=k/.45; if(q>1) continue; c.save(); c.globalCompositeOperation="lighter"; const R=p.r*(.6+q*.7), bg=c.createRadialGradient(p.x,p.y-10,0,p.x,p.y-10,R); bg.addColorStop(0,p.vis==="meteor"?`rgba(255,220,150,${1-q})`:`rgba(235,210,255,${1-q})`); bg.addColorStop(1,"rgba(120,40,200,0)"); c.fillStyle=bg; c.beginPath(); c.arc(p.x,p.y-10,R,0,TAU); c.fill(); c.restore() }
      else if(p.k==="circ"&&p.vis==="plain"){ }
      else if(p.k==="cone"){ const q=k/.3; if(q>1) continue; c.save(); c.globalCompositeOperation="lighter"; c.translate(p.x,p.y); c.rotate(p.a); for(let i=0;i<3;i++){ c.strokeStyle=`rgba(${i?"255,230,255":"200,110,255"},${(1-q)*(i?.9:.6)})`; c.lineWidth=i?3:14; c.beginPath(); c.moveTo(20,0); c.lineTo(p.r*(.5+q*.6),(i-1)*14); c.stroke() } c.restore() }
      else if(p.k==="line"){ const dur=(p.dur||.15)+.4, q=k/dur; if(q>1) continue; c.save(); c.translate(p.x,p.y); c.rotate(p.a); c.globalCompositeOperation="lighter";
        const col=p.vis==="redline"||p.burn?"255,90,60":p.vis==="laser"?"255,90,220":p.vis==="shard"?"255,240,170":p.vis==="cross"?"180,90,255":"190,110,255", wd=p.wd*(p.vis==="laser"?1:.6)*(1-q*.5);
        const lg=c.createLinearGradient(0,-wd/2,0,wd/2); lg.addColorStop(0,`rgba(${col},0)`); lg.addColorStop(.5,`rgba(${col},${.85*(1-q)})`); lg.addColorStop(1,`rgba(${col},0)`); c.fillStyle=lg; c.fillRect(0,-wd/2,p.len,wd); c.fillStyle=`rgba(255,255,255,${.8*(1-q)})`; c.fillRect(0,-wd*.08,p.len,wd*.16); c.restore() }
      else if(p.k==="rays"){ const q=k/.6; if(q>1) continue; c.save(); c.translate(p.x,p.y); c.globalCompositeOperation="lighter"; for(let i=0;i<p.n;i++){ c.save(); c.rotate(p.a0+i*TAU/p.n); const wd=p.wd*(1-q*.4), lg=c.createLinearGradient(0,-wd/2,0,wd/2); lg.addColorStop(0,"rgba(170,80,255,0)"); lg.addColorStop(.5,`rgba(220,160,255,${.9*(1-q)})`); lg.addColorStop(1,"rgba(170,80,255,0)"); c.fillStyle=lg; c.fillRect(0,-wd/2,p.len,wd); c.fillStyle=`rgba(255,255,255,${.85*(1-q)})`; c.fillRect(0,-3,p.len,6); c.restore() } c.restore() }
      else if(p.k==="proj"){ const d=k*p.sp; if(d>p.len) continue; const im=IMG("e2"), x=p.x+Math.cos(p.a)*d, y=p.y+Math.sin(p.a)*d; c.save(); c.translate(x,y); c.rotate(p.a); c.globalCompositeOperation="lighter";
        for(let j=1;j<=5;j++){ c.globalAlpha=.16*(6-j)/5; if(im) c.drawImage(im,-im.width*.45-j*34,-im.height*.45,im.width*.9,im.height*.9) }
        c.globalAlpha=1; if(im) c.drawImage(im,-im.width*.45,-im.height*.45,im.width*.9,im.height*.9); else { c.strokeStyle="#d8a8ff"; c.lineWidth=10; c.beginPath(); c.arc(-30,0,60,-1,1); c.stroke() }
        c.strokeStyle="rgba(230,200,255,.55)"; c.lineWidth=2; for(let i=0;i<5;i++){ const yy=(i-2)*18; c.beginPath(); c.moveTo(-60,yy); c.lineTo(-60-90-(i%2)*40,yy); c.stroke() } c.restore() }
      else if(p.k==="grid"){ const q=k/.6; if(q>1) continue; const im=IMG("e1"); if(p.out){ c.save(); c.fillStyle=`rgba(30,0,50,${.55*(1-q)})`; c.beginPath(); c.rect(-AR.hw,-AR.hh,AR.hw*2,AR.hh*2); for(const G of GS(p)){ for(const i of G.safe){ const cs=p.cell; c.rect(G.cx-cs*1.5+(i%3)*cs+cs,G.cy-cs*1.5+Math.floor(i/3)*cs,-cs,cs) } } c.fill("evenodd"); c.restore() } for(const G of GS(p)){ const cs=p.cell, x0=G.cx-cs*1.5, y0=G.cy-cs*1.5; c.save(); c.globalCompositeOperation="lighter";
        for(let i=0;i<9;i++){ if(G.safe.includes(i)) continue; const x=x0+(i%3)*cs+cs/2, y=y0+Math.floor(i/3)*cs+cs/2+cs*.3, up=ease(Math.min(1,k/.1)), hh=cs*1.5*up; c.globalAlpha=1-q; if(im) c.drawImage(im,x-hh*.33,y-hh*.94,hh*.67,hh);
          const bg=c.createRadialGradient(x,y-cs*.3,0,x,y-cs*.3,cs*.6); bg.addColorStop(0,"rgba(220,120,255,.8)"); bg.addColorStop(1,"rgba(0,0,0,0)"); c.fillStyle=bg; c.fillRect(x-cs*.6,y-cs*.9,cs*1.2,cs*1.2) } c.restore() } }
      else if(p.k==="safe"){ const q=k/.8; if(q>1) continue; c.save(); c.globalCompositeOperation="lighter"; const im=IMG("e1"); for(const [x,y] of p.dec){ const hh=260*ease(Math.min(1,k/.12)); c.globalAlpha=1-q; if(im) c.drawImage(im,x-hh*.33,y-hh*.94,hh*.67,hh) } c.globalAlpha=1-q; c.fillStyle="rgba(255,250,220,.6)"; c.fillRect(p.x-30,p.y-400,60,400); c.restore() }
      else if(p.k==="crown"){ const im=IMG("e6"); for(let i=0;i<p.n;i++){ const ti=i*p.gap, kk=k-ti; if(kk<0||kk>.8) continue; const x=p.x+Math.cos(p.a)*p.step*(i+1), y=p.y+Math.sin(p.a)*p.step*(i+1), up=ease(Math.min(1,kk/.15)), hh=230*up, fade=kk<.5?1:1-(kk-.5)/.3; c.save(); c.globalAlpha=fade; c.globalCompositeOperation="lighter"; if(im) c.drawImage(im,x-hh*.33,y-hh*.95,hh*.67,hh); c.restore() } } }
    for(const p of S.pats){ if(p.k!=="seek") continue; const tt=t-p.t0, w=p.w||0;   /* 그림자 추적 구슬 */
      if(tt<w){ c.save(); c.globalCompositeOperation="lighter"; const q=tt/w; for(let i=0;i<p.n;i++){ const a=i/p.n*TAU+t*3, R=60*(1-q)+20; const gg=c.createRadialGradient(p.x+Math.cos(a)*R,p.y+Math.sin(a)*R*.7,0,p.x+Math.cos(a)*R,p.y+Math.sin(a)*R*.7,18); gg.addColorStop(0,"rgba(240,200,255,.9)"); gg.addColorStop(1,"rgba(120,40,200,0)"); c.fillStyle=gg; c.beginPath(); c.arc(p.x+Math.cos(a)*R,p.y+Math.sin(a)*R*.7,18,0,TAU); c.fill() } c.restore(); continue }
      if(!p.o) continue; const fade=Math.min(1,(w+p.life-tt)/.4);
      for(const o of p.o){ if(o.dead) continue; c.save(); c.globalAlpha=Math.max(0,fade); const sp=Math.hypot(o.vx,o.vy)||1;
        c.globalCompositeOperation="lighter"; for(let j=1;j<=4;j++){ c.fillStyle=`rgba(160,80,255,${.18*(5-j)/4})`; c.beginPath(); c.arc(o.x-o.vx/sp*j*9,o.y-o.vy/sp*j*9,16-j*2,0,TAU); c.fill() }
        c.globalCompositeOperation="source-over"; const SI=IMG("seek"); c.fillStyle="#140820"; c.beginPath(); c.arc(o.x,o.y,15,0,TAU); c.fill();
        if(SI){ const w2=58, h2=w2*SI.height/SI.width; c.translate(o.x,o.y); c.rotate(Math.atan2(o.vy,o.vx)); c.drawImage(SI,-w2*.66,-h2/2,w2,h2) }
        else { c.strokeStyle=`rgba(230,170,255,${.8+.2*Math.sin(t*12)})`; c.lineWidth=3; c.stroke(); c.fillStyle="#ff6ad0"; c.beginPath(); c.arc(o.x+o.vx/sp*4,o.y+o.vy/sp*4,4,0,TAU); c.fill() } c.restore() } }
    for(const p of S.pats){ if(p.k!=="safe"||!p.ql||t-p.t0>=(p.w||0)) continue; const all=[[p.x,p.y],...p.dec];   /* 한자 기둥 뜻: 보스에 가려지지 않게 맨 위에 */
      all.forEach(([x,y],i)=>{ const tx=p.ql[i]||"?"; c.save(); c.font='900 27px "Noto Serif KR",serif'; try{ c.letterSpacing="2px" }catch(e){} c.textAlign="center"; c.textBaseline="middle"; const tw=c.measureText(tx).width+28, yy=y-p.r*.75-6;   /* 고급 명조체 · 굵게 · 금빛 */
        const PL=IMG("plate"), pw=Math.max(150,tw+46), ph=pw*(PL?PL.height/PL.width:.2);
        if(PL) c.drawImage(PL,x-pw/2,yy-ph*.46,pw,ph); else { c.fillStyle="#1a0a2a"; c.fillRect(x-pw/2,yy-20,pw,40) } c.shadowBlur=0;
        const gt=c.createLinearGradient(0,yy-14,0,yy+14); gt.addColorStop(0,"#fffbe8"); gt.addColorStop(.55,"#ffe39a"); gt.addColorStop(1,"#d8a84a");
        c.lineJoin="round"; c.lineWidth=7; c.strokeStyle="#0c0416"; c.strokeText(tx,x,yy+1); c.lineWidth=2; c.strokeStyle="rgba(255,226,150,.55)"; c.strokeText(tx,x,yy+1); c.fillStyle=gt; c.fillText(tx,x,yy+1); c.restore() }) }
    /* 월령 늑대 */
    for(const w of S.wolves){ const run=w.s===0&&(Math.abs((w.x-(w.px??w.x)))+Math.abs((w.y-(w.py??w.y)))>.3); w.px=w.x; w.py=w.y; if(run) w.rt=(w.rt||0)+1/60;
      const fr=run?(Math.floor((w.rt||0)*9)%2?"wr2":"wr1"):null, im=IMG(fr||(w.s===2?"e5":"e4")); if(!im) continue; const hh=fr?78:w.s===2?80:96, ww=hh*im.width/im.height, cr=w.s===1?.88+.04*Math.sin(g.t*30):1, bob=run?-Math.abs(Math.sin((w.rt||0)*28))*6:0;   /* 달릴 때 두 장면을 번갈아 */
      c.save(); c.fillStyle="rgba(10,0,20,.4)"; c.beginPath(); c.ellipse(w.x,w.y+4,ww*.32,9,0,0,TAU); c.fill(); c.translate(w.x,w.y+6+bob); c.scale(w.f||1,cr); c.drawImage(im,-ww/2,-hh,ww,hh); c.restore();
      if(w.s===1){ c.save(); c.font='bold 18px sans-serif'; c.textAlign="center"; c.fillStyle="#ff6ad0"; c.fillText("!",w.x,w.y-hh-4); c.restore() } } }
  /* 결투장: 바깥은 어둡고, 테두리에 보라 빛 · 소품은 뒤쪽 벽(위)에만 · 옆 바깥 소품은 맵 밖처럼 보여서 뺌 */
  const PROPS=(()=>{ const L=[]; for(let i=-3;i<=3;i++){ L.push(["o11_pillar",i*250+(i%2?40:0),-AR.hh-30,150]); } L.push(["o11_swords",-AR.hw+40,-AR.hh-50,100]); L.push(["o11_swords",AR.hw-40,-AR.hh-50,100]); return L })();
  function drawArena(c){ const t=g.t, B=4000; c.save(); c.fillStyle="rgba(6,0,14,.82)"; c.beginPath(); c.rect(-B,-B,B*2,B*2); c.rect(-AR.hw,-AR.hh,AR.hw*2,AR.hh*2); c.fill("evenodd");
    const T=tod(); if(T){ const f=todMix(); c.globalAlpha=(1-f)*.45; c.fillStyle=T.tint; c.fillRect(-AR.hw,-AR.hh,AR.hw*2,AR.hh*2); if(f>0){ c.globalAlpha=f*.45; c.fillStyle=B11_TOD[(S.tod+1)%4].tint; c.fillRect(-AR.hw,-AR.hh,AR.hw*2,AR.hh*2) } c.globalAlpha=1 }
    c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(170,90,255,${.55+.2*Math.sin(t*2)})`; c.lineWidth=5; c.strokeRect(-AR.hw,-AR.hh,AR.hw*2,AR.hh*2); c.lineWidth=16; c.strokeStyle="rgba(120,40,220,.18)"; c.strokeRect(-AR.hw,-AR.hh,AR.hw*2,AR.hh*2); c.restore();
    for(const [k,x,y,h] of PROPS){ if(y>AR.hh) continue; drawProp(c,k,x,y,h) } }
  function gridOut(c,p,q,t){ const cs=p.cell, pu=.5+.5*Math.sin(t*8); c.save(); c.beginPath(); c.rect(-AR.hw,-AR.hh,AR.hw*2,AR.hh*2); for(const G of GS(p)) for(const i of G.safe) c.rect(G.cx-cs*1.5+(i%3)*cs+cs,G.cy-cs*1.5+Math.floor(i/3)*cs,-cs,cs);   /* 암흑 낙인: 안전 칸 빼고 결투장 전체가 점점 어두운 보라로 */
    c.fillStyle=`rgba(40,0,70,${.18+.3*q+.08*pu})`; c.fill("evenodd");
    c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(200,90,255,${.35+.4*q})`; c.lineWidth=6; c.strokeRect(-AR.hw+4,-AR.hh+4,AR.hw*2-8,AR.hh*2-8);
    c.globalCompositeOperation="source-over"; c.font='bold 20px "Do Hyeon",sans-serif'; c.textAlign="center"; c.lineWidth=5; c.strokeStyle="#1a0428"; c.fillStyle="#ffd0ff";
    for(const G of GS(p)){ const y=G.cy-cs*1.5-22; c.strokeText("⚠ 초록 칸 밖은 전부 터져요!",G.cx,y); c.fillText("⚠ 초록 칸 밖은 전부 터져요!",G.cx,y) } c.restore() }
  function drawProp(c,k,x,y,h){ const im=PIMG(k); if(!im) return; const w=h*im.width/im.height; c.save(); c.fillStyle="rgba(0,0,0,.35)"; c.beginPath(); c.ellipse(x,y,w*.4,w*.12,0,0,TAU); c.fill(); c.drawImage(im,x-w/2,y-h,w,h);
    if(k==="o11_brazier"){ c.globalCompositeOperation="lighter"; const fl=.55+.25*Math.sin(g.t*7+x); const gg=c.createRadialGradient(x,y-h*.75,0,x,y-h*.75,h*.9); gg.addColorStop(0,`rgba(180,90,255,${fl*.6})`); gg.addColorStop(1,"rgba(180,90,255,0)"); c.fillStyle=gg; c.beginPath(); c.arc(x,y-h*.75,h*.9,0,TAU); c.fill() }
    if(k==="o11_pillar"){ c.globalCompositeOperation="lighter"; const gg=c.createRadialGradient(x,y-h*.88,0,x,y-h*.88,40); gg.addColorStop(0,`rgba(200,120,255,${.4+.2*Math.sin(g.t*2+x)})`); gg.addColorStop(1,"rgba(200,120,255,0)"); c.fillStyle=gg; c.beginPath(); c.arc(x,y-h*.88,40,0,TAU); c.fill() }
    c.restore() }

  /* 화면 위: 시간대 시계 · 내 암흑 게이지 · 저주 어둠 */
  const AMC={}; function ambBase(k,W,H){ const key=k+W+"x"+H; if(AMC[key]) return AMC[key]; const cv=document.createElement("canvas"); cv.width=Math.max(1,W|0); cv.height=Math.max(1,H|0); const c=cv.getContext("2d");
    if(k==="mid"){ const gr=c.createRadialGradient(W/2,H/2,Math.min(W,H)*.25,W/2,H/2,Math.max(W,H)*.7); gr.addColorStop(0,"rgba(10,0,30,0)"); gr.addColorStop(1,"rgba(10,0,30,.62)"); c.fillStyle=gr; c.fillRect(0,0,W,H) }
    else if(k==="dawn"){ const gr=c.createLinearGradient(0,H,0,H*.35); gr.addColorStop(0,"rgba(255,70,30,.32)"); gr.addColorStop(1,"rgba(255,70,30,0)"); c.fillStyle=gr; c.fillRect(0,0,W,H) }
    else if(k==="noon"){ const gr=c.createRadialGradient(W*.5,-H*.1,0,W*.5,-H*.1,H*1.1); gr.addColorStop(0,"rgba(255,245,210,.42)"); gr.addColorStop(1,"rgba(255,245,210,0)"); c.fillStyle=gr; c.fillRect(0,0,W,H) }
    else if(k==="dusk"){ const gr=c.createLinearGradient(0,0,0,H); gr.addColorStop(0,"rgba(255,120,60,.22)"); gr.addColorStop(.45,"rgba(160,60,200,.18)"); gr.addColorStop(1,"rgba(40,10,70,.35)"); c.fillStyle=gr; c.fillRect(0,0,W,H) }
    return AMC[key]=cv }
  function drawAmb(c,W,H,k,a,t){ if(a<=.01) return; c.save(); c.globalAlpha=a; c.drawImage(ambBase(k,W,H),0,0);
    if(k==="mid"){
      for(let i=0;i<24;i++){ const x=(i*137.5%1)*W||((i*97)%W), y=((i*53)%H), tw=.4+.6*Math.abs(Math.sin(t*2+i)); c.fillStyle=`rgba(220,200,255,${.5*tw})`; c.fillRect((i*211)%W,(i*127)%(H*.6),2,2) } }
    else if(k==="dawn"){
      c.globalCompositeOperation="lighter"; for(let i=0;i<26;i++){ const u=((t*.25+i*.0385)%1), x=((i*173)%W)+Math.sin(t*2+i)*14, y=H-u*H*.9; c.fillStyle=`rgba(255,${120+(i%3)*40},60,${.7*(1-u)})`; c.fillRect(x,y,3,3) } }
    else if(k==="noon"){ c.globalCompositeOperation="lighter";
      for(let i=0;i<5;i++){ const x=W*(.1+i*.2)+Math.sin(t*.4+i)*30, lg=c.createLinearGradient(x,0,x+W*.15,H); lg.addColorStop(0,"rgba(255,250,220,.16)"); lg.addColorStop(1,"rgba(255,250,220,0)"); c.fillStyle=lg; c.beginPath(); c.moveTo(x,0); c.lineTo(x+60,0); c.lineTo(x+W*.15+110,H); c.lineTo(x+W*.15,H); c.closePath(); c.fill() } }
    else if(k==="dusk"){
      for(let i=0;i<4;i++){ const x=((t*18+i*W/4)%(W+300))-150, y=H*(.55+.1*Math.sin(i*2)), fg=c.createRadialGradient(x,y,0,x,y,220); fg.addColorStop(0,"rgba(200,170,230,.14)"); fg.addColorStop(1,"rgba(200,170,230,0)"); c.fillStyle=fg; c.fillRect(x-220,y-220,440,440) } }
    c.restore() }
  /* 시간대 바닥: 자정 · 여명 · 정오 · 황혼마다 바닥 그림이 바뀌고, 바뀔 때 천천히 겹쳐 넘어가요 */
  const FP={}; function floorPat(c,k){ if(FP[k]) return FP[k]; const im=IMG("f_"+k); if(!im) return null; try{ return FP[k]=c.createPattern(im,"repeat") }catch(e){ return null } }
  function floor(c,ox,oy,W,H){ if(S.ph!==2) return false; const k0=B11_TOD[S.tod].k, k1=B11_TOD[(S.tod+1)%4].k, p0=floorPat(c,k0); if(!p0) return false; const f=todMix(), cv=c.canvas;
    const F=typeof SKILL_ART_FILES!=="undefined"&&SKILL_ART_FILES["b11_f_"+k0], T=512*.8;
    if(F&&cv._floor!=="b11"+k0){ cv._floor="b11"+k0; cv.style.backgroundImage=`url(${F})`; cv.style.backgroundSize=`${T}px ${T}px`; cv.style.backgroundRepeat="repeat"; cv._fpos="" }
    const pk=Math.round(ox*10)/10+","+Math.round(oy*10)/10; if(cv._fpos!==pk){ cv._fpos=pk; cv.style.backgroundPosition=`${Math.round(ox*10)/10}px ${Math.round(oy*10)/10}px` }
    const M=new DOMMatrix().translate(ox,oy).scale(.8); c.save(); c.setTransform(1,0,0,1,0,0); c.clearRect(0,0,cv.width,cv.height); c.restore();
    c.save();
    if(f>.01){ const p1=floorPat(c,k1); if(p1){ try{ p1.setTransform(M) }catch(e){} c.fillStyle=p1; c.globalAlpha=f; c.fillRect(0,0,W,H) } } c.restore(); return true }
  const SKC={}; function skyC(k,W,H){ const key=k+W+"x"+H; if(SKC[key]) return SKC[key]; const im=IMG("s_"+k); if(!im) return null; const h=Math.round(Math.min(H*.42,W*im.height/im.width)), cv=document.createElement("canvas"); cv.width=Math.max(1,Math.round(W)); cv.height=Math.max(1,h); cv.getContext("2d").drawImage(im,0,0,cv.width,cv.height); return SKC[key]=cv }
  function ambience(c,W,H){ const t=g.t; if(S.ph!==2) return; const f=todMix(); { const sky=(k,al)=>{ if(al<=.01) return; const im=skyC(k,W,H); if(!im) return; c.save(); c.globalAlpha=al*(k==="noon"?.95:.85); c.drawImage(im,0,0); c.restore() };   /* 시간대 하늘 (해·달) */
      sky(B11_TOD[S.tod].k,1-f); sky(B11_TOD[(S.tod+1)%4].k,f) } drawAmb(c,W,H,B11_TOD[S.tod].k,1-f,t); drawAmb(c,W,H,B11_TOD[(S.tod+1)%4].k,f,t) }
  function drawHUD(c,W,H,y0){ const t=g.t;
    { const e=boss(); if(e&&e.an==="groggy"&&!S.deathT){ const left=e.weakT0?Math.max(0,6-(t-e.weakT0)):0, pu=.5+.5*Math.sin(t*10), tx=`💥 극딜 타임! 보스가 받는 피해 +50%${left?" · "+Math.ceil(left)+"초":""}${window.__burstReady?" · 👇 궁극기 버튼!":""}`;   /* 그로기 동안 크게 알려요 */
      c.save(); c.textAlign="center"; c.textBaseline="middle"; c.font='bold 20px "Black Han Sans","Do Hyeon",sans-serif'; const tw=c.measureText(tx).width+36, by=y0-30;   /* 보스 체력바 자리에 겹쳐서 (보스를 가리지 않게) */   /* 화면 아래쪽: 보스를 가리지 않게 */
      c.fillStyle=`rgba(120,20,10,${.8+.15*pu})`; c.beginPath(); c.roundRect?c.roundRect(W/2-tw/2,by-18,tw,36,18):c.rect(W/2-tw/2,by-18,tw,36); c.fill(); c.strokeStyle=`rgba(255,${200+40*pu|0},90,1)`; c.lineWidth=3; c.stroke();
      c.lineWidth=5; c.strokeStyle="#2a0806"; c.strokeText(tx,W/2,by+1); c.fillStyle="#fff2b0"; c.fillText(tx,W/2,by+1);
      if(e.weakT0){ c.fillStyle="rgba(0,0,0,.4)"; c.fillRect(W/2-tw/2+16,by+12,tw-32,3); c.fillStyle="#ffd36a"; c.fillRect(W/2-tw/2+16,by+12,(tw-32)*left/6,3) } c.restore() } }
    if(S.ph===2){
      /* 바뀌기 직전 예고 · 바뀐 순간 큰 이름 */
      const T=B11_TOD[S.tod], len=T.len+(T.k==="noon"?(S.noonBonusUsed||0):0), left=S.todT0+len-t, nx=B11_TOD[(S.tod+1)%4];
      if(left<5&&left>0){ const a=Math.min(1,(5-left)/.5), pu=.5+.5*Math.sin(t*6); c.save(); c.globalAlpha=a*(.75+.25*pu); c.textAlign="center"; c.textBaseline="middle"; c.font='22px "Black Han Sans","Do Hyeon",sans-serif'; c.lineWidth=5; c.strokeStyle="#0a0418"; const tx=`${nx.ic} 곧 ${nx.n}이 다가와요… ${Math.ceil(left)}`; c.strokeText(tx,W/2,H*.78); c.fillStyle=nx.col2; c.fillText(tx,W/2,H*.78); c.restore() }
      if(S.todAnn&&t-S.todAnn<2.6){ const k=t-S.todAnn, a=Math.min(1,k/.3)*Math.min(1,(2.6-k)/.6), sc=1+.15*(1-Math.min(1,k/.4)); c.save(); c.globalAlpha=a; c.textAlign="center"; c.textBaseline="middle"; c.translate(W/2,H*.42); c.scale(sc,sc);
        c.font='64px "Black Han Sans","Do Hyeon",sans-serif'; c.lineWidth=9; c.strokeStyle="#0a0418"; c.strokeText(`${T.ic} ${T.n}`,0,0); c.fillStyle=T.col2; c.shadowColor=T.col2; c.shadowBlur=20; c.fillText(`${T.ic} ${T.n}`,0,0); c.shadowBlur=0;
        c.font='20px "Do Hyeon",sans-serif'; c.lineWidth=5; const sub=T.msg.replace(/^\S+\s/,""); c.strokeText(sub,0,48); c.fillStyle="#fff"; c.fillText(sub,0,48); c.restore() } }
    { const p=S.pats.find(q=>q.k==="safe"&&q.qh&&t-q.t0<(q.w||0)); if(p){ const MQ=myQ(p), sec=Math.max(0,Math.ceil(p.w-(t-p.t0))); let cy=H-70; const CX=W<760?W/2:182; c.save(); c.textAlign="center"; c.textBaseline="middle"; if(W<760) cy=H-190; c.globalAlpha=.93;   /* 화면 가운데(캐릭터)를 가리지 않게 왼쪽(작은 화면은 아래)에 */
        c.fillStyle="rgba(20,6,36,.9)"; c.beginPath(); c.roundRect?c.roundRect(CX-170,cy-52,340,104,18):c.rect(CX-170,cy-52,340,104); c.fill(); c.strokeStyle="#ffd36a"; c.lineWidth=3; c.stroke();
        c.font='900 56px "Noto Serif KR",serif'; c.fillStyle="#fff"; c.shadowColor="#c38bff"; c.shadowBlur=14; c.fillText(MQ.h,CX-90,cy+2); c.shadowBlur=0;
        c.font='bold 19px "Do Hyeon",sans-serif'; c.fillStyle="#ffe9a0"; c.fillText("이 한자의 뜻이 적힌",CX+50,cy-20); c.fillText("기둥 안으로!",CX+50,cy+6); c.font='bold 22px "Do Hyeon",sans-serif'; c.fillStyle=sec<=2?"#ff7a8a":"#fff"; c.fillText(`⏱ ${sec}`,CX+50,cy+34); c.restore() } }
    if(S.ph===2){ const T=B11_TOD[S.tod], len=T.len+(T.k==="noon"?(S.noonBonusUsed||0):0), left=Math.max(0,S.todT0+len-t), R=W<700?48:62, cx=W-R-16, cy=y0+R+8, warn=left<=5, pu=.5+.5*Math.sin(t*8);
      /* 빛과 어둠의 시계 (그림 시계판 + 시간대 아이콘): 칸 크기 = 시간대 길이 · 금빛 바늘 · 가운데 남은 초 */
      const LEN=B11_TOD.map((x,i)=>i===S.tod?len:x.len), TOT=LEN.reduce((a,b)=>a+b,0); let acc=0; const A0=[]; for(let i=0;i<4;i++){ A0.push(-Math.PI/2+acc/TOT*TAU); acc+=LEN[i] }
      const DI=IMG("dial"), ICK=["mid","dawn","noon","dusk"];
      c.save(); if(warn){ c.strokeStyle=`rgba(255,70,100,${.5+.5*pu})`; c.lineWidth=5; c.beginPath(); c.arc(cx,cy,R+3,0,TAU); c.stroke() }
      if(DI) c.drawImage(DI,cx-R,cy-R,R*2,R*2); else { c.fillStyle="#1a0c2a"; c.beginPath(); c.arc(cx,cy,R,0,TAU); c.fill() } c.shadowBlur=0;
      const r0=R*.34, r1=R*.83;
      for(let i=0;i<4;i++){ const a0=A0[i], a1=a0+LEN[i]/TOT*TAU, cur=i===S.tod; c.beginPath(); c.arc(cx,cy,r1,a0,a1); c.arc(cx,cy,r0,a1,a0,true); c.closePath();
        if(cur){ c.globalCompositeOperation="lighter"; c.fillStyle=B11_TOD[i].col2; c.globalAlpha=.32+.12*pu; c.fill(); c.globalCompositeOperation="source-over"; c.globalAlpha=1; c.strokeStyle=B11_TOD[i].col2; c.lineWidth=2.5; c.stroke() }
        else { c.fillStyle="rgba(5,0,12,.32)"; c.fill() } }
      /* 지금 시간대에서 지나간 부분은 밝게 채워져요 */
      { const a0=A0[S.tod], ap=a0+(1-left/len)*LEN[S.tod]/TOT*TAU; c.globalCompositeOperation="lighter"; c.globalAlpha=.25; c.fillStyle="#fff2c0"; c.beginPath(); c.arc(cx,cy,r1,a0,ap); c.arc(cx,cy,r0,ap,a0,true); c.closePath(); c.fill(); c.globalCompositeOperation="source-over"; c.globalAlpha=1 }
      for(let i=0;i<4;i++){ const a0=A0[i], a1=a0+LEN[i]/TOT*TAU, am=(a0+a1)/2, cur=i===S.tod, im=IMG("i_"+ICK[i]), sz=R*(cur?.5:.38)*(cur?1+.06*pu:1), x=cx+Math.cos(am)*R*.6, y=cy+Math.sin(am)*R*.6;
        c.globalAlpha=cur?1:.8; if(im) c.drawImage(im,x-sz/2,y-sz/2,sz,sz); else { c.font=`${Math.round(sz*.8)}px sans-serif`; c.textAlign="center"; c.textBaseline="middle"; c.fillText(B11_TOD[i].ic,x,y) } c.shadowBlur=0;
        if(cur){ c.strokeStyle="#ffe9a0"; c.lineWidth=2; c.beginPath(); c.arc(x,y,sz/2,0,TAU); c.stroke() } }
      c.globalAlpha=1; const pa=A0[S.tod]+(1-left/len)*LEN[S.tod]/TOT*TAU, nl=R*.9;
      c.save(); c.translate(cx,cy); c.rotate(pa); const ng=c.createLinearGradient(0,0,nl,0); ng.addColorStop(0,"#b08a3a"); ng.addColorStop(1,"#fff6c8"); c.fillStyle=ng;
      c.beginPath(); c.moveTo(r0*.9,-4); c.lineTo(nl,0); c.lineTo(r0*.9,4); c.closePath(); c.fill(); c.restore();
      c.font=`900 ${Math.round(R*.34)}px "Black Han Sans","Do Hyeon",sans-serif`; c.textAlign="center"; c.textBaseline="middle"; c.lineWidth=4; c.strokeStyle="#0a0418"; c.strokeText(Math.ceil(left),cx,cy+1); c.fillStyle=warn?`rgb(255,${120+100*pu|0},140)`:"#fff6d8"; c.fillText(Math.ceil(left),cx,cy+1);
      const nx=B11_TOD[(S.tod+1)%4], txt=`${T.n} · ${Math.ceil(left)}초 뒤 ${nx.n}`; c.font='bold 15px "Do Hyeon",sans-serif'; const tw=c.measureText(txt).width+22, bx=Math.min(cx-tw/2,W-tw-8), by=cy+R+8;
      c.fillStyle=warn?`rgba(120,10,30,${.75+.2*pu})`:"rgba(14,6,26,.9)"; c.beginPath(); c.roundRect?c.roundRect(bx,by,tw,26,13):c.rect(bx,by,tw,26); c.fill(); c.strokeStyle="#d8b46a"; c.lineWidth=1.5; c.stroke(); c.fillStyle=T.col2; c.fillText(txt,bx+tw/2,by+14);
      if(S.shield>0){ const bw=150, bx2=W-12-bw, by2=by+34, e=boss(), pct=e?S.shield/e.max/.3:0; c.fillStyle="rgba(20,0,30,.8)"; c.fillRect(bx2,by2,bw,10); c.fillStyle="#c38bff"; c.fillRect(bx2,by2,bw*Math.min(1,pct),10); c.font='12px "Do Hyeon",sans-serif'; c.fillStyle="#f0e0ff"; c.textAlign="right"; c.fillText(`🛡 어둠 보호막 ${(S.shield/(e?e.max:1)*100).toFixed(1)}%`,W-12,by2+22) }
      if(S.shield>0&&T.k==="dusk"){ const full=t-S.todT0<10, L=full?["🛡 어둠의 보호막이 생겼어요!","⚔ 보스를 계속 때리면 깎여요","📜 문제를 맞히면 크게 깎여요","💥 공격에 맞으면 더 두꺼워져요","⏳ 황혼이 끝날 때 남은 만큼 보스가 회복해요"]:["🛡 보호막: 때리고 · 문제 맞히고 · 피하기!"];   /* 보호막 공략 안내 */
        const bw2=W<700?230:270, lh=full?23:0, bh=full?24+lh*(L.length-1)+14:32, bx3=12, by3=Math.min(H-bh-150,y0+12), pu2=.5+.5*Math.sin(t*3);
        c.save(); c.textAlign="left"; c.textBaseline="middle"; c.fillStyle="rgba(26,8,44,.86)"; c.beginPath(); c.roundRect?c.roundRect(bx3,by3,bw2,bh,12):c.rect(bx3,by3,bw2,bh); c.fill(); c.strokeStyle=`rgba(195,139,255,${.6+.4*pu2})`; c.lineWidth=2; c.stroke();
        L.forEach((x,i)=>{ c.font=i===0?'bold 16px "Do Hyeon",sans-serif':'14px "Do Hyeon",sans-serif'; c.fillStyle=i===0?"#e6ccff":"#fff"; c.fillText(x,bx3+12,by3+16+(i?8:0)+i*lh) }); c.restore() }
      c.restore() }
    if(S.ph===1&&S.trans){ const k=t-S.trans, bar=Math.min(1,k/.5)*H*.12; c.save(); c.fillStyle="#000"; c.fillRect(0,0,W,bar); c.fillRect(0,H-bar,W,bar);
      const dk=Math.min(.55,Math.max(0,(k-1.6)/2)*.55); c.fillStyle=`rgba(10,0,20,${dk})`; c.fillRect(0,bar,W,H-bar*2);
      if(k>2.2){ const a=Math.min(1,(k-2.2)/.4), pu=.5+.5*Math.sin(t*10); c.globalAlpha=a; c.textAlign="center"; c.textBaseline="middle";
        c.font='18px "Do Hyeon",sans-serif'; c.fillStyle="#d8b8ff"; c.fillText("⚠ 2페이즈 예고",W/2,H*.3);
        c.font='38px "Black Han Sans","Do Hyeon",sans-serif'; c.lineWidth=7; c.strokeStyle="#12001f"; c.strokeText("검은 달이 떠오른다…",W/2,H*.3+44); c.fillStyle=`rgb(${235+20*pu},${215+20*pu},255)`; c.fillText("검은 달이 떠오른다…",W/2,H*.3+44);
        c.font='17px "Do Hyeon",sans-serif'; c.fillStyle="#fff"; c.fillText(`각성까지 ${Math.max(0,Math.ceil(6.4-k))}초 · 숨을 고르고 준비해요!`,W/2,H*.3+86) } c.restore() }
    if(S.deathT){ const k=t-S.deathT, bar=Math.min(1,k/.5)*H*.12; c.save(); c.fillStyle="#000"; c.fillRect(0,0,W,bar); c.fillRect(0,H-bar,W,bar);
      const LINES=[[1.4,"크윽… 이 내가… 꺾이다니…"],[3.8,"빛과 어둠의 시간은… 끝나지 않는다…"],[6.2,"달은… 다시 차오를 것이다…"]];
      let cur=null; for(const L of LINES) if(k>=L[0]) cur=L; if(cur&&k<8.4){ const a=Math.min(1,(k-cur[0])/.35)*Math.min(1,(8.4-k)/.4), n=Math.min(cur[1].length,Math.floor((k-cur[0])*14)); c.globalAlpha=a;
        const bw=Math.min(W-30,560), bx=(W-bw)/2, by=H-bar-92; c.fillStyle="rgba(14,4,26,.88)"; c.beginPath(); c.roundRect?c.roundRect(bx,by,bw,70,14):c.rect(bx,by,bw,70); c.fill(); c.strokeStyle="#b07aff"; c.lineWidth=2; c.stroke();
        c.textAlign="left"; c.textBaseline="middle"; c.font='14px "Do Hyeon",sans-serif'; c.fillStyle="#c9a6ff"; c.fillText("암흑의 검귀",bx+16,by+18); c.font='22px "Do Hyeon",sans-serif'; c.fillStyle="#fff"; c.fillText(cur[1].slice(0,n),bx+16,by+46) }
      c.restore() }
    /* 저주: 앞이 어두워요 */
    const ck=t-S.curseT; if(ck<3){ const a=ck<.3?ck/.3:ck>2.6?(3-ck)/.4:1; c.save(); const gr=c.createRadialGradient(W/2,H/2,60,W/2,H/2,Math.max(W,H)*.55); gr.addColorStop(0,"rgba(5,0,15,0)"); gr.addColorStop(.35,`rgba(5,0,15,${.75*a})`); gr.addColorStop(1,`rgba(5,0,15,${.97*a})`); c.fillStyle=gr; c.fillRect(0,0,W,H); c.restore() }
    if(S.intro&&t<3.8){ const a=t<3?1:1-(t-3)/.8; c.save(); c.fillStyle=`rgba(0,0,0,${.7*a})`; c.fillRect(0,0,W,H);
      if(t>1.2){ const k=Math.min(1,(t-1.2)/.4); c.globalAlpha=k*a; c.textAlign="center"; c.textBaseline="middle"; c.font='16px "Do Hyeon",sans-serif'; c.fillStyle="#c9a6ff"; c.fillText("이계 마신군 제1군단장",W/2,H*.7); c.font='40px "Black Han Sans","Do Hyeon",sans-serif'; c.lineWidth=6; c.strokeStyle="#12001f"; c.strokeText("암흑의 검귀",W/2,H*.7+40); c.fillStyle="#f3e6ff"; c.fillText("암흑의 검귀",W/2,H*.7+40) } c.restore() } }
  /* 내 머리 위 암흑 게이지 (월드 좌표) */
  function drawMyHp(c){ const P=me(); if(P.dead) return; let mx=0; try{ mx=A.st().maxHp }catch(e){} if(!mx) return; const k=clamp(P.hp/mx,0,1), t=g.t, W=84, H=13, x=P.x-W/2, y=P.y-132, low=k<.35;   /* 내 체력바: 머리 위 이름표 위에 크게 · 낮으면 빨갛게 깜빡 */
    S.myTr=S.myTr==null||S.myTr<k?k:S.myTr+(k-S.myTr)*.05; c.save(); c.fillStyle="rgba(8,0,16,.85)"; c.fillRect(x-2,y-2,W+4,H+4); c.fillStyle="rgba(255,255,255,.7)"; c.fillRect(x,y,W*S.myTr,H);
    const gr=c.createLinearGradient(0,y,0,y+H); if(low){ gr.addColorStop(0,"#ff6a5a"); gr.addColorStop(1,"#c81e1e") } else { gr.addColorStop(0,"#7dff9a"); gr.addColorStop(1,"#1fae54") } c.fillStyle=gr; c.fillRect(x,y,W*k,H);
    c.lineWidth=1.5; c.strokeStyle=low?`rgba(255,120,120,${.6+.4*Math.sin(t*10)})`:"rgba(230,255,235,.85)"; c.strokeRect(x-1.5,y-1.5,W+3,H+3);
    c.font='bold 12px "Do Hyeon",sans-serif'; c.textAlign="center"; c.textBaseline="middle"; c.lineWidth=3; c.strokeStyle="#0a0012"; const tx=Math.ceil(P.hp)+" / "+Math.round(mx); c.strokeText(tx,P.x,y+H/2+.5); c.fillStyle="#fff"; c.fillText(tx,P.x,y+H/2+.5); c.restore() }
  function drawMyGauge(c){ drawMyHp(c); const P=me(); if(P.dead||S.intro||g.cine) return;   /* 암흑 게이지: 세렌 태양 게이지처럼 캐릭터 옆 세로 캡슐 */
    S.gv=S.gv==null?S.gauge:S.gv+(S.gauge-S.gv)*.2; const k=clamp(S.gv/100,0,1), t=g.t, x=P.x+74, H=72, W=14, yb=P.y+22, yt=yb-H, hot=k>.75, pu=.5+.5*Math.sin(t*(hot?10:3)), cur=g.t-(S.curseT||-9)<3;
    c.save();
    if(hot){ c.globalCompositeOperation="lighter"; const gg=c.createRadialGradient(x,yt+H*(1-k),0,x,yt+H*(1-k),40); gg.addColorStop(0,`rgba(255,60,160,${.25+.25*pu})`); gg.addColorStop(1,"rgba(255,60,160,0)"); c.fillStyle=gg; c.fillRect(x-40,yt+H*(1-k)-40,80,80); c.globalCompositeOperation="source-over" }
    const cap=(pad)=>{ c.beginPath(); if(c.roundRect) c.roundRect(x-W/2-pad,yt-pad,W+pad*2,H+pad*2,W/2+pad); else c.rect(x-W/2-pad,yt-pad,W+pad*2,H+pad*2) };
    cap(3); c.fillStyle="rgba(8,0,18,.82)"; c.fill(); c.lineWidth=2; c.strokeStyle=hot?`rgba(255,120,200,${.7+.3*pu})`:"rgba(205,170,255,.85)"; c.stroke();
    c.save(); cap(0); c.clip(); const fy=yt+H*(1-k), gr=c.createLinearGradient(0,yb,0,yt); gr.addColorStop(0,"#3a0a6a"); gr.addColorStop(.6,"#9a3aff"); gr.addColorStop(1,"#ff4aa8"); c.fillStyle=gr; c.fillRect(x-W/2,fy,W,yb-fy);
    c.globalCompositeOperation="lighter"; c.fillStyle=`rgba(255,220,255,${.35+.3*pu})`; c.fillRect(x-W/2,fy,W,2.5); c.fillStyle="rgba(255,255,255,.12)"; c.fillRect(x-W/2+2,yt,3,H);
    for(let i=0;i<5;i++){ const u=((t*.6+i/5)%1), by=yb-u*(yb-fy); if(by<fy) continue; c.fillStyle=`rgba(230,190,255,${.5*(1-u)})`; c.fillRect(x-1+Math.sin(i*2.1)*3,by,2,2) } c.restore();
    c.strokeStyle="rgba(10,0,20,.7)"; c.lineWidth=1; for(let i=1;i<4;i++){ const y=yt+H*i/4; c.beginPath(); c.moveTo(x-W/2+1,y); c.lineTo(x+W/2-1,y); c.stroke() }
    const my=yt-14; c.fillStyle="rgba(8,0,18,.9)"; c.beginPath(); c.arc(x,my,10,0,TAU); c.fill(); c.lineWidth=2; c.strokeStyle=hot?"#ff8ad0":"#d6b8ff"; c.stroke();   /* 위: 검은 달 아이콘 */
    c.fillStyle=hot?"#ff9ad8":"#e6d0ff"; c.beginPath(); c.arc(x,my,6,0,TAU); c.fill(); c.fillStyle="rgba(8,0,18,1)"; c.beginPath(); c.arc(x+3,my-2,5.4,0,TAU); c.fill();
    c.font='bold 13px "Do Hyeon",sans-serif'; c.textAlign="center"; c.textBaseline="top"; c.lineWidth=3.5; c.strokeStyle="#12001e"; const tx=Math.round(k*100)+"%"; c.strokeText(tx,x,yb+6); c.fillStyle=hot?"#ffb0e0":"#e6d6ff"; c.fillText(tx,x,yb+6);
    if(hot&&!cur&&Math.sin(t*10)>-.2){ c.font='bold 14px "Do Hyeon",sans-serif'; c.textAlign="left"; c.textBaseline="middle"; c.strokeText("곧 저주!",x+W/2+6,my); c.fillStyle="#ff7ac0"; c.fillText("곧 저주!",x+W/2+6,my) }
    c.restore() }
  return {S,ambience,floor,start,hostTick,tick,onKill,snap,recv,onEv,fromClient,quizOk,quizNo,todOk,drawBoss,drawGround,drawOver,drawHUD,drawMyGauge,clampP,
    dbg(k){ const e=boss(), T=target(e), a=Math.atan2(T.y-e.y,T.x-e.x); ({thrust:()=>thrust(e,a),dash:()=>dash(e,T),slash:()=>slash(e,a),eight:()=>eight(e,8,1.8),twelve:()=>eight(e,12,1.5),pierce:()=>pierce(e,T),combo:()=>combo(e,T),meteors:()=>meteors(e),sunwave:()=>sunwave(e),rise:()=>wolfrise(e,T),forest:()=>forest(1.7),power:()=>power(e),brand:()=>{S.timers.brand=0},cross:()=>{S.timers.cross=0},peak:()=>{S.timers.peak=0},wall:()=>{S.timers.wall=0;S.wallOn=0}})[k]() },
    setTod(i){ S.tod=(i+3)%4; nextTod(boss()) },
    setMul(h,d,p2){ S.hpMul=h; S.dmgMul=d; S.p2Mul=p2 }, ANIM_LEN};
}
