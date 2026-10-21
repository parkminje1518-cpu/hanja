/* ===== 맵별 몬스터와 보스 (우리 앱만의 몬스터) ===== */
const SIZE = { small:{r:9,hp:7,sp:110,dmg:5,xp:1}, normal:{r:13,hp:12,sp:62,dmg:6,xp:1}, fast:{r:11,hp:10,sp:98,dmg:6,xp:1},
  tough:{r:16,hp:30,sp:55,dmg:9,xp:2}, big:{r:24,hp:75,sp:44,dmg:12,xp:4} };
/* from: 몇 초부터 나오는지 · w: 나오는 비율 */
const MOBS = {
  1:[ {look:"slime",  name:"독풀 슬라임", size:"normal", from:0,   w:6, c:"#3a7a1a"},
      {look:"ladybug",name:"무당벌레",   size:"small",  from:25,  w:3},
      {look:"bee",    name:"꿀벌 병정",  size:"fast",   from:70,  w:3},
      {look:"snail",  name:"통통 달팽이",size:"big",    from:110, w:1} ],
  2:[ {look:"mushroom",name:"독버섯",  size:"normal", from:0,  w:6, c:"#a8302a"},
      {look:"acorn",   name:"도토리 병정",size:"small",  from:30, w:3},
      {look:"stump",   name:"성난 그루터기",size:"tough",from:75, w:2},
      {look:"boar",    name:"숲 멧돼지",  size:"big",    from:115,w:1} ],
  3:[ {look:"wisp",   name:"도깨비불",   size:"fast",   from:0,  w:6},
      {look:"jar",    name:"항아리 몬스터",size:"normal", from:25, w:3},
      {look:"turtle", name:"돌 거북",    size:"big",    from:70, w:1},
      {look:"scorpion",name:"모래 전갈",  size:"tough",  from:110,w:2} ],
  4:[ {look:"bat",    name:"동굴 박쥐",  size:"fast",   from:0,  w:6},
      {look:"crystal",name:"수정 요정",  size:"normal", from:25, w:3},
      {look:"spider", name:"동굴 거미",  size:"tough",  from:60, w:2},
      {look:"troll",  name:"동굴 트롤",  size:"big",    from:105,w:1} ],
  5:[ {look:"imp",    name:"어둠 마귀",  size:"normal", from:0,  w:6, c:"#3a1424"},
      {look:"imp",    name:"불꽃 임프",  size:"fast",   from:20, w:3, c:"#a8281a"},
      {look:"hound",  name:"지옥 사냥개",size:"tough",  from:50, w:2},
      {look:"knight", name:"마왕성 흑기사",size:"big",   from:90, w:1} ],
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
};
const MAP_BOSSES = { 1:[[150,"slimeking"],[270,"slimeking"]], 2:[[120,"mushking"],[240,"mushking"]], 3:[[110,"golemking"],[220,"golemking"]],
  4:[[90,"batqueen"],[190,"batqueen"]], 5:[[70,"littledemon"],[150,"littledemon"],[240,"crimsondemon"]] };

/* ---------- 그림: 귀엽고 둥글둥글, 빛과 그림자로 입체감 ---------- */
function _mix(c,amt){ if(c[0]!=="#") return c; const n=parseInt(c.slice(1),16); let r=n>>16,g=n>>8&255,b=n&255; const T=amt>0?255:0, p=Math.abs(amt);
  return `rgb(${Math.round(r+(T-r)*p)},${Math.round(g+(T-g)*p)},${Math.round(b+(T-b)*p)})` }
function _G(ctx,e,x,y,rx,ry,col){ col=e.flash>0?"#ffffff":col; const g=ctx.createRadialGradient(x-rx*.35,y-ry*.45,Math.min(rx,ry)*.08,x,y,Math.max(rx,ry)*1.05);
  g.addColorStop(0,_mix(col,.32)); g.addColorStop(.45,col); g.addColorStop(1,_mix(col,-.6)); return g }
const RIM={1:"170,255,90",2:"255,180,60",3:"255,110,255",4:"110,210,255",5:"255,110,40"};
function _blob(ctx,e,x,y,rx,ry,col,rot){ ctx.fillStyle=_G(ctx,e,x,y,rx,ry,col); ctx.beginPath(); ctx.ellipse(x,y,rx,ry,rot||0,0,7); ctx.fill(); _ol(ctx);
  ctx.strokeStyle=`rgba(${RIM[e.mapId]||"255,120,80"},.6)`; ctx.lineWidth=1.6; ctx.beginPath(); ctx.ellipse(x,y,rx*.9,ry*.9,rot||0,-.15*Math.PI,.55*Math.PI); ctx.stroke() }
function _ol(ctx,w){ ctx.strokeStyle="rgba(8,2,12,.85)"; ctx.lineWidth=w||1.8; ctx.stroke() }
function _hl(ctx,x,y,rx,ry,a){ ctx.fillStyle=`rgba(255,255,255,${(a||.6)*.5})`; ctx.beginPath(); ctx.ellipse(x,y,rx,ry,-.5,0,7); ctx.fill() }
function _C(e,c){ return e.flash>0?"#ffffff":c }
/* 어둠 속에서 빛나는 날카로운 눈 + 찌푸린 눈썹 + 송곳니 */
const EYE_GLOW={1:"#d6ff3a",2:"#ffb020",3:"#ff4aff",4:"#ff3a4a",5:"#ff7a1a"};
function _face(ctx,e,t,px,py,y,gap,s,o){ o=o||{}; const sh=o.shift||0, col=EYE_GLOW[e.mapId]||"#ff3a4a";
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
const FLYERS = {bee:1,bat:1,wisp:1,crystal:1,demon:1};

function drawMonster(ctx,e,t,px,py){
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
  (LOOKS[e.look]||LOOKS.slime)(ctx,e,t,px,py);
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
