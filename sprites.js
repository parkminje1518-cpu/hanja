/* ===== 도트 용사 (32x32, 자동 테두리) ===== */
const SZ = 32;
const C = {k:"#16101f", skin:"#ffd9bf", skinS:"#eaa98c", w:"#ffffff", blush:"#ff9fb0", mouth:"#b8455a"};
function canvasGrid(){
  const g=Array.from({length:SZ},()=>Array(SZ).fill(null));
  const R=(x,y,w,h,c)=>{for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)if(i>=0&&i<SZ&&j>=0&&j<SZ)g[j][i]=c};
  const P=(c,...pts)=>{for(let i=0;i<pts.length;i+=2){const x=pts[i],y=pts[i+1];if(x>=0&&x<SZ&&y>=0&&y<SZ)g[y][x]=c}};
  const L=(x0,y0,x1,y1,c,w=1)=>{let dx=Math.abs(x1-x0),dy=-Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1,e=dx+dy;
    for(;;){ R(x0,y0,w,w,c); if(x0===x1&&y0===y1)break; const e2=2*e; if(e2>=dy){e+=dy;x0+=sx} if(e2<=dx){e+=dx;y0+=sy} } };
  const X=(x,y)=>{ if(g[y]) g[y][x]=null };
  return {g,R,P,L,X};
}
function _hex(c,f){ const n=parseInt(c.slice(1),16); let r=n>>16&255, g=n>>8&255, b=n&255;
  if(f>0){ r+=(255-r)*f; g+=(255-g)*f; b+=(255-b)*f } else { r*=1+f; g*=1+f; b*=1+f }
  return "#"+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join("") }
function outline(g){
  const o=g.map(r=>[...r]);
  for(let y=0;y<SZ;y++)for(let x=0;x<SZ;x++){ if(g[y][x]) continue;
    if([[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>g[y+dy]&&g[y+dy][x+dx])) o[y][x]=C.k; }
  // 입체감: 위쪽 가장자리는 밝게, 아래·오른쪽 가장자리는 어둡게
  const sh=o.map(r=>[...r]);
  for(let y=0;y<SZ;y++)for(let x=0;x<SZ;x++){ const c=o[y][x]; if(!c||c===C.k||c[0]!=="#"||c.length!==7) continue;
    const up=!o[y-1]||!o[y-1][x]||o[y-1][x]===C.k, dn=!o[y+1]||!o[y+1][x]||o[y+1][x]===C.k, rt=!o[y][x+1]||o[y][x+1]===C.k;
    if(dn||rt) sh[y][x]=_hex(c,-.18); else if(up) sh[y][x]=_hex(c,.22) }
  return sh;
}
/* ===== 전직 단계별 모습: 1차 문장 · 2차 어깨 장식 · 3차 머리 장식 · 4차 날개와 왕관 ===== */
const TIER_PAL=[null,["#3fcf8e","#1d7a53","#b8f5d6"],["#63b0ff","#2a6ac0","#cfe6ff"],["#c08bff","#7a4ad0","#ecdcff"],["#f6c544","#b8871a","#fff4b0"]];
/* 전직 단계마다 옷·망토·무기 색이 통째로 바뀌어요 (원래 색 → 새 색) */
const TIER_REMAP = {
  warrior:[null,
    {"#9a95ab":"#b8c4d4","#c8c3d6":"#eef3fa","#605a73":"#6e7a8e","#9a2c34":"#2f8a5a","#5e1a22":"#1a5a3a","#c8484f":"#5ab07a"},
    {"#9a95ab":"#4a78c8","#c8c3d6":"#9ac0f4","#605a73":"#28447a","#9a2c34":"#eef2fa","#5e1a22":"#a8b4c8","#c8484f":"#ffffff","#4b4660":"#2a3a5a","#e9eef6":"#d8ecff","#b9c3d6":"#8ab4e8"},
    {"#9a95ab":"#ece8f6","#c8c3d6":"#ffffff","#605a73":"#9a8ab8","#9a2c34":"#7a3ad0","#5e1a22":"#4a2090","#c8484f":"#a878f4","#4b4660":"#4a3a6a","#2a2438":"#2a1e44","#e9eef6":"#efe4ff","#b9c3d6":"#c8a6ff"},
    {"#9a95ab":"#f6c544","#c8c3d6":"#fff2a8","#605a73":"#b8871a","#9a2c34":"#c8282e","#5e1a22":"#7a1018","#c8484f":"#ff6a5a","#4b4660":"#5a3a1a","#2a2438":"#3a2410","#e9eef6":"#fff8c8","#b9c3d6":"#ffe066","#d63a4a":"#4ae0ff"}],
  archer:[null,
    {"#3fae6e":"#2a7a4a","#1f6e45":"#164a2a","#8af0c1":"#5ab07a","#6b4a2b":"#5a3a20"},
    {"#3fae6e":"#3a8ad8","#1f6e45":"#1f5a9a","#8af0c1":"#9ad0ff","#f1ead8":"#eaf4ff","#c9bf9f":"#b8c8e0","#6b4a2b":"#2a4a7a","#4a321c":"#1a3050","#f2d27a":"#e6eef8","#c49a3a":"#9aa5bb"},
    {"#3fae6e":"#8a5ad6","#1f6e45":"#5a3aa0","#8af0c1":"#d0b4ff","#f1ead8":"#ffffff","#c9bf9f":"#d8d0f0","#6b4a2b":"#4a3a7a","#4a321c":"#2e2450","#3a2a1e":"#2a2040","#f2d27a":"#d8c0ff","#c49a3a":"#8a5ad6"},
    {"#3fae6e":"#fff4d0","#1f6e45":"#d8b860","#8af0c1":"#ffffff","#f1ead8":"#fffaf0","#c9bf9f":"#f0d890","#6b4a2b":"#c49a3a","#4a321c":"#8a6a20","#3a2a1e":"#6a4a1a","#f2d27a":"#ffe066","#c49a3a":"#f6a623","#3fe0c8":"#ff5ab8"}],
  thief:[null,
    {"#2e2a44":"#22402e","#1e1a30":"#142a1c","#4a4468":"#3a6a4a"},
    {"#2e2a44":"#1e2e5a","#1e1a30":"#121c3a","#4a4468":"#3a5090","#f6c544":"#e6eef8","#b8871a":"#9aa5bb"},
    {"#2e2a44":"#3a1e5a","#1e1a30":"#22103a","#4a4468":"#6a3aa0","#f6c544":"#c08bff","#b8871a":"#7a4ad0","#cfd6e4":"#e8d8ff","#8a93a8":"#9a6bff","#ffe48a":"#c8a6ff"},
    {"#2e2a44":"#1a1418","#1e1a30":"#0e0a0c","#4a4468":"#4a3420","#cfd6e4":"#ffe066","#8a93a8":"#c49a3a","#14101e":"#2a1a0a"}],
  mage:[null,
    {"#c43a3a":"#a8202a","#7e1f2a":"#6a1018","#ec6a5a":"#e04a4a"},
    {"#c43a3a":"#6a2a8a","#7e1f2a":"#40185a","#ec6a5a":"#9a50c0","#f4f0e6":"#2a1a3a","#cfc7b5":"#1a0e28","#ff9a3c":"#b8f06a","#ffe066":"#f0ffc8","#ffd36a":"#c8f08a"},
    {"#c43a3a":"#2a1a28","#7e1f2a":"#140a14","#ec6a5a":"#4a2a40","#f4f0e6":"#c43a3a","#cfc7b5":"#7e1f2a","#2a2350":"#1a0a10","#d6dbe6":"#3a2a2e","#9aa3b8":"#1e1418"},
    {"#c43a3a":"#fffaf0","#7e1f2a":"#d8c890","#ec6a5a":"#ffffff","#f4f0e6":"#f6c544","#cfc7b5":"#b8871a","#d6dbe6":"#ffe066","#9aa3b8":"#c49a3a","#2a2350":"#8a6a20","#ff9a3c":"#ff5ab8","#ffe066":"#ffffff"}],
  pirate:[null,
    {"#24467a":"#1e6a6a","#152c52":"#124242","#3d6aa8":"#3a9a9a"},
    {"#24467a":"#1a2a5a","#152c52":"#0e1838","#3d6aa8":"#34509a","#1e1a2e":"#14143a","#3a3352":"#2a2a5a"},
    {"#24467a":"#a8202a","#152c52":"#6a1018","#3d6aa8":"#d84a4a","#1e1a2e":"#2a1418","#3a3352":"#4a2428","#2a2238":"#2a1418"},
    {"#24467a":"#5a2a8a","#152c52":"#36185a","#3d6aa8":"#8a50c0","#1e1a2e":"#2a1438","#3a3352":"#4a2a60","#5a6075":"#c49a3a","#8b93a6":"#ffe066","#f4f0e6":"#fffaf0"}],
};
let DECO={id:"",tier:0};
function decorate(t){
  const {R,P,g}=t, T=DECO.tier, id=DECO.id; if(!T) return t.g;
  const RM=(TIER_REMAP[id]||[])[T]; if(RM){ for(let y=0;y<SZ;y++)for(let x=0;x<SZ;x++){ const c=g[y][x]; if(c&&RM[c]) g[y][x]=RM[c] } }
  const Pn=(c,...pts)=>{ for(let i=0;i<pts.length;i+=2){ const x=pts[i],y=pts[i+1]; if(x>=0&&x<SZ&&y>=0&&y<SZ&&!g[y][x]) g[y][x]=c } };
  const [c,d,l]=TIER_PAL[Math.min(T,4)];
  // 1차: 가슴 문장 + 허리띠 장식
  P(d,15,19,16,19,15,20,16,20); P(c,15,19); P(l,16,19);
  P(c,12,23,19,23); if(T>=1) P(c,13,28,18,28);
  if(T>=2){ // 2차: 어깨 갑옷
    const [c2,d2,l2]=TIER_PAL[2<=T?Math.min(T,4):2];
    R(8,17,4,2,c2); R(20,17,4,2,d2); P(l2,8,17,9,17,20,17); P(d2,11,18,23,18); P(l2,9,16,21,16); P(c2,10,21,11,21,20,21,21,21); P(l2,10,21,20,21) }
  if(T>=3){ // 3차: 머리 장식 (직업마다 달라요)
    if(id==="warrior"){ R(14,0,4,2,c); P(l,15,0); P(d,17,1); Pn(c,13,1,18,1,15,2,16,2) }
    else if(id==="archer"){ Pn(c,7,4,6,3,5,2,6,4,7,3); Pn(l,5,2,6,2); P(c,10,7,11,7,12,7,19,7,20,7,21,7) }
    else if(id==="thief"){ P(c,9,8,10,8,11,8,12,8,13,8,14,8,15,8,16,8,17,8,18,8,19,8,20,8,21,8,22,8); Pn(c,5,9,4,10,3,11,2,12); Pn(d,5,10,4,11,3,12) }
    else if(id==="mage"){ Pn(c,12,2,13,1,14,0,15,0,16,0,17,1,18,2); Pn(l,15,1,16,1); P(c,10,8,21,8) }
    else { Pn(c,10,1,11,0,12,0,13,1); Pn(l,11,1,12,1) } }
  if(T>=4){ // 4차: 빛나는 날개 + 왕관
    for(let y=13;y<=24;y++){ const w=Math.max(0,4-Math.abs(y-17)/2|0); for(let i=0;i<=w;i++){ Pn(y%3===0?l:c,7-i,y); Pn(y%3===0?l:c,24+i,y) } }
    Pn("#ffffff",4,16,27,16,5,14,26,14);
    Pn(c,12,3,14,2,16,2,18,3,13,3,15,3,17,3); Pn(l,14,1,16,1); Pn("#e9475f",15,2) }
  return t.g;
}
/* 공통 꼬마 몸 (머리 크게) */
function chibi(t,o){
  const {R,P}=t;
  const hair=o.hair, hL=o.hairL, hD=o.hairD;
  if(o.longHair){ R(8,10,3,11,hair); R(21,10,3,11,hD); P(hair,9,21,22,21,8,20); }
  R(11,4,10,1,hair); R(9,5,14,1,hair); R(8,6,16,10,hair); R(9,16,14,1,hair);
  R(21,6,3,10,hD); P(hL,11,5,12,5,10,6,11,6,13,6,10,7);
  R(11,9,10,8,C.skin); R(20,10,1,7,C.skinS); R(12,16,8,1,C.skinS);
  R(10,8,12,2,hair); P(hair,11,10,12,10,14,10,15,11,16,10,19,10,20,10,20,11,11,11);
  P(hL,12,8,13,8,16,8); P(hD,20,9,21,10,21,11);
  const iris=o.iris||"#3d6bd6";
  P(C.k,13,12,14,12,17,12,18,12);
  P(iris,13,13,13,14,14,14,17,13,17,14,18,14); P(C.w,14,13,18,13);
  if(o.brow) P(o.brow,13,11,14,11,17,11,18,11);
  P(C.blush,12,15,19,15);
  P(C.mouth,15,16,16,16);
  P(C.skin,15,17,16,17);
  R(12,18,8,6,o.outfit); R(18,18,2,6,o.outfitD); if(o.outfitL) P(o.outfitL,12,18,13,18,12,19);
  R(10,18,2,4,o.sleeve||o.outfit); R(20,18,2,4,o.sleeveD||o.outfitD); P(C.skin,10,22,11,22,20,22,21,22);
  R(13,24,2,4,o.pants); R(17,24,2,4,o.pants); R(12,28,3,2,o.boots); R(17,28,3,2,o.boots); if(o.bootsL) P(o.bootsL,12,28,17,28);
}
function backCape(t,c,cD,cL){
  const {R,P}=t;
  R(9,18,14,9,c); R(8,24,16,4,c); R(7,27,18,2,c); R(19,18,4,11,cD); R(21,24,4,5,cD); if(cL) P(cL,9,19,8,25,7,28);
}

/* 전사: 바위 전사 (石) */
function drawWarrior(){
  const t=canvasGrid(), {R,P,L}=t;
  const st="#9a95ab", stL="#c8c3d6", stD="#605a73", gold="#f6c544", goldD="#b8871a", red="#d63a4a";
  backCape(t,"#9a2c34","#5e1a22","#c8484f");
  L(24,19,29,3,"#e9eef6",2); L(25,19,30,3,"#b9c3d6"); P("#ffffff",29,2,30,1,28,6); P("#fff4b0",31,4,26,4,27,1,31,9,24,10);
  R(21,20,5,2,gold); P(goldD,25,21); L(22,22,21,25,"#7a5230"); P(gold,21,26);
  chibi(t,{hair:"#7a5230",hairL:"#9c7048",hairD:"#563820",iris:"#3a8ce0",brow:"#563820",
    outfit:st,outfitD:stD,outfitL:stL,sleeve:st,sleeveD:stD,pants:"#4b4660",boots:"#2a2438",bootsL:gold});
  R(9,17,4,3,st); R(19,17,4,3,stD); P(stL,9,17,10,17); P(gold,11,19,20,19);
  P(red,15,19,16,19,15,20,16,20); P("#ff8a95",15,19); P(gold,14,19,17,19,14,20,17,20);
  R(12,22,8,1,"#3a2a1a"); P(gold,15,22,16,22); P(gold,12,23,19,23);
  P(stL,13,25,17,25); P(gold,13,27,14,27,17,27,18,27);
  return outline(decorate(t));
}
/* 궁수: 바람 궁수 (風) */
function drawArcher(){
  const t=canvasGrid(), {R,P,L}=t;
  const g="#3fae6e", gD="#1f6e45", gL="#8af0c1", gold="#f2d27a", goldD="#c49a3a";
  backCape(t,g,gD,gL);
  chibi(t,{hair:"#a0542e",hairL:"#c87a4a",hairD:"#6e3418",iris:"#3fbf5a",longHair:true,
    outfit:"#f1ead8",outfitD:"#c9bf9f",sleeve:"#6b4a2b",sleeveD:"#4a321c",pants:"#3a2a1e",boots:"#5a3a22",bootsL:"#7d5634"});
  P("#a0542e",8,21,8,22,9,23,8,24); P("#6e3418",9,22,8,23);
  P("#ffffff",23,4,24,3,25,2,24,5,25,4,26,3); P("#cfd8e6",23,5,25,5); P(gold,22,6);
  R(12,18,2,6,"#6b4a2b"); R(18,18,2,6,"#4a321c"); R(12,22,8,1,"#3a2a1a"); P(gold,15,22);
  L(24,9,27,13,gold); L(27,13,28,17,gold); L(28,17,27,21,gold); L(27,21,24,25,gold); P(goldD,27,15,27,16,27,17,28,18);
  P("#3fe0c8",28,17); L(24,10,24,24,"#eef6ff");
  L(14,20,27,20,"#d9c7a0"); P("#e9eef6",28,20,29,20); P("#ffffff",30,20); P(gL,14,19,14,21,15,19,15,21);
  P("#c8f7e0",2,12,3,12,4,11,1,26,2,26,3,25,29,8,30,8);
  return outline(decorate(t));
}
/* 도적: 쇠별 도적 (金) */
function drawThief(){
  const t=canvasGrid(), {R,P,L}=t;
  const n="#2e2a44", nD="#1e1a30", nL="#4a4468", steel="#cfd6e4", steelD="#8a93a8", gold="#f6c544", goldD="#b8871a";
  L(8,10,2,6,gold); L(8,11,3,8,goldD); P(gold,1,6,2,5);
  chibi(t,{hair:"#3b3a8a",hairL:"#5a59b8",hairD:"#24235a",iris:"#9aa3c0",brow:"#24235a",
    outfit:n,outfitD:nD,outfitL:nL,sleeve:n,sleeveD:nD,pants:nD,boots:"#14101e",bootsL:nL});
  P("#3b3a8a",10,3,12,2,13,3,15,2,16,3,18,2,19,3,21,3,22,4,23,5,24,6,8,5,7,6);
  P("#5a59b8",12,3,15,3,18,3);
  R(9,8,14,1,gold); P(goldD,21,8,22,8);
  R(12,15,8,2,nL); P(n,19,15,19,16);
  R(19,17,4,3,steel); P(steelD,22,18,22,19,19,19); P("#ffffff",19,17);
  R(12,21,8,1,"#5a3a22"); P(gold,13,21,18,21);
  const cx=24, cy=24;
  L(cx-5,cy,cx+5,cy,steel); L(cx,cy-5,cx,cy+5,steel); R(cx-1,cy-1,3,3,steel);
  P(steelD,cx-4,cy+1,cx+4,cy-1,cx+1,cy+4,cx-1,cy-4); P(gold,cx,cy); P("#ffffff",cx-3,cy,cx,cy-3);
  P("#ffe48a",2,26,3,27,4,28,6,29,8,29,29,14,30,16);
  return outline(decorate(t));
}
/* 해적: 바다 해적 (海) */
function drawPirate(){
  const t=canvasGrid(), {R,P,L}=t;
  const coat="#24467a", coatD="#152c52", coatL="#3d6aa8", gold="#f6c544", goldD="#b8871a", hat="#1e1a2e", hatL="#3a3352";
  backCape(t,coat,coatD,coatL);
  chibi(t,{hair:"#e8c06a",hairL:"#fff0b0",hairD:"#b8893a",iris:"#2fc4e8",longHair:true,
    outfit:"#f4f0e6",outfitD:"#cfc7b5",sleeve:coat,sleeveD:coatD,pants:"#2a2238",boots:"#1e1a2e",bootsL:gold});
  R(10,3,12,1,hat); R(8,4,16,4,hat); R(5,7,22,2,hat); P(hat,4,6,27,6,3,5,28,5); P(hatL,9,4,10,4,9,5);
  L(5,8,26,8,gold); P(goldD,25,8,26,8); P(gold,12,5,13,6,19,6,20,5);
  P("#e83a5a",16,5); P("#ff8aa0",16,4); P(gold,15,5,17,5,16,6);
  P("#ffffff",6,3,7,2,8,1,9,0,7,3,8,2,9,1); P("#c9b18a",6,4,7,4,8,3);
  R(12,18,2,6,coat); R(18,18,2,6,coatD); P(gold,13,19,13,21,18,19,18,21);
  R(12,22,8,1,"#3a2a1a"); P(gold,15,22,16,22);
  R(22,21,7,2,"#5a6075"); R(22,21,7,1,"#8b93a6"); P("#a06a35",21,22,21,23,22,23,22,24); P(gold,23,23,24,23);
  R(29,20,2,4,"#c49a3a"); P("#ffe066",31,21,31,22);
  P("#ffffff",30,18,29,17); P("#cfe9ff",3,24,4,25,27,27);
  return outline(decorate(t));
}
/* 마법사: 불꽃 마법사 (炎) */
function drawMage(){
  const t=canvasGrid(), {R,P,L}=t;
  const robe="#c43a3a", robeD="#7e1f2a", robeL="#ec6a5a", gold="#f6c544", goldD="#b8871a";
  L(26,8,24,29,"#d6dbe6"); L(27,8,25,29,"#9aa3b8"); P("#5aa8ff",24,30,25,30);
  R(24,2,5,5,"#ff9a3c"); R(25,1,3,7,"#ff9a3c"); R(25,3,3,3,"#ffe066"); P("#ffffff",26,3); P("#e9475f",24,2,28,2,24,6,28,6);
  P("#ffd36a",22,1,30,4,29,0,23,7,30,8); P("#ff9a3c",21,3,31,6);
  R(4,8,5,4,"#ff7a3c"); R(3,11,5,5,"#ff7a3c"); P("#ffb066",4,8,5,8,3,12); P("#d4482a",6,15,7,14,4,16);
  R(23,8,4,3,"#d4482a"); P("#ff7a3c",23,8,24,8);
  chibi(t,{hair:"#ff7a3c",hairL:"#ffb066",hairD:"#d4482a",iris:"#e83a5a",
    outfit:robe,outfitD:robeD,outfitL:robeL,sleeve:"#f4f0e6",sleeveD:"#cfc7b5",pants:robe,boots:"#2a2350",bootsL:gold});
  P(gold,9,8,10,7); P("#5aa8ff",9,7);
  R(11,22,10,4,robe); R(19,22,2,4,robeD); R(10,25,12,1,gold); P(goldD,21,25); P(gold,15,23,16,23,14,24,17,24);
  P(gold,13,18,14,19,18,18,17,19); P("#ffffff",15,18,16,18);
  R(5,21,5,3,"#5a3a22"); R(5,21,5,1,"#f4f0e6"); P(gold,7,22); P("#ff9a3c",6,20,8,19);
  P("#ffb066",2,24,3,26,1,28,29,26,30,24);
  return outline(decorate(t));
}

/* 능력치 막대(1~10칸)가 곧 실제 능력치예요
   체력 = 60 + 12×칸, 공격 = 0.8 + 0.06×칸 배, 속도 = 0.85 + 0.04×칸 배
   해금 비용이 높을수록 세 막대의 합이 커져요: 전사 14 · 궁수 18 · 도적 21 · 마법사 24 · 해적 27
   perks: 게임 경험치 배수, 처음부터 가진 기술 수, 부활 횟수, 레벨업 카드 수 */
const HEROES = [
  { id:"warrior", cls:"전사", h:"石", hun:"돌", eum:"석", name:"바위 전사", cost:0, stars:1,
    power:{hp:7,atk:4,spd:3}, mods:{armor:0.7}, perks:{xp:1, start:0, revive:1, cards:3},
    main:{kind:"sword", name:"대검 휘두르기", d:l=>l===1?"가까운 몬스터들을 대검으로 크게 베어요. 맞은 몬스터는 뒤로 밀려나요":"베는 범위가 넓어지고 더 세져요"},
    trait:"바위 방패", traitDesc:"받는 피해 -30% · 가까이 온 몬스터를 넓게 베어 밀어내요",
    desc:"돌빛 갑옷과 붉은 망토, 빛나는 대검을 든 전사예요. 맨 앞에서 버티는 튼튼한 탱커예요.", draw:drawWarrior },
  { id:"archer", cls:"궁수", h:"風", hun:"바람", eum:"풍", name:"바람 궁수", cost:300, stars:2,
    power:{hp:5,atk:7,spd:6}, mods:{mag:1.2}, perks:{xp:1.1, start:0, revive:1, cards:3},
    main:{kind:"arrow", name:"바람 화살", d:l=>l===1?"멀리 있는 몬스터에게 화살을 쏴요. 화살은 몬스터를 꿰뚫고 지나가요":"화살이 더 많아지고 더 많은 몬스터를 꿰뚫어요"},
    trait:"바람의 눈", traitDesc:"멀리 쏘는 관통 화살 · 경험치 구슬 줍는 거리 +20%",
    desc:"초록 망토에 깃털 장식을 한 숲의 궁수예요. 커다란 활로 멀리서 몬스터를 꿰뚫어요.", draw:drawArcher },
  { id:"thief", cls:"도적", h:"金", hun:"쇠", eum:"금", name:"쇠별 도적", cost:600, stars:3,
    power:{hp:5,atk:7,spd:9}, mods:{crit:0.25}, perks:{xp:1.2, start:1, revive:1, cards:3},
    main:{kind:"star", name:"표창 던지기", d:l=>l===1?"빙글빙글 도는 쇠 표창을 여러 몬스터에게 던져요":"표창을 더 많이, 더 빨리 던져요"},
    trait:"급소 찌르기", traitDesc:"25% 확률로 2배 피해 · 표창을 여러 개 던져요 · 가장 빨라요",
    desc:"금빛 머리띠와 복면을 한 날쌘 도적이에요. 커다란 쇠 표창을 휙휙 던져요.", draw:drawThief },
  { id:"mage", cls:"마법사", h:"炎", hun:"불꽃", eum:"염", name:"불꽃 마법사", cost:1000, stars:4,
    power:{hp:5,atk:10,spd:9}, mods:{}, perks:{xp:1.35, start:1, revive:2, cards:4},
    main:{kind:"fireball", name:"화염구", d:l=>l===1?"몬스터에게 화염구를 던져요. 맞으면 펑 터져서 주변 몬스터까지 태워요":"폭발이 커지고 화염구가 더 많아져요"},
    trait:"마력 폭발", traitDesc:"넓게 터지는 화염구 · 공격력 최고",
    desc:"불꽃빛 양갈래 머리에 마법책과 불꽃 지팡이를 든 대마법사예요. 화염구로 몬스터 무리를 날려 버려요.", draw:drawMage },
  { id:"pirate", cls:"해적", h:"海", hun:"바다", eum:"해", name:"바다 해적", cost:1500, stars:5,
    power:{hp:9,atk:9,spd:9}, mods:{cd:0.9, armor:0.9}, perks:{xp:1.5, start:2, revive:2, cards:4},
    main:{kind:"gun", name:"권총 연사", d:l=>l===1?"가까운 몬스터에게 총알을 빠르게 쏴요. 세 발마다 산탄이 터져요":"총알이 더 세지고 산탄이 넓어져요"},
    trait:"바다의 선장", traitDesc:"아주 빠른 총알 · 3발마다 산탄 · 공격 속도 +10% · 받는 피해 -10%",
    desc:"깃털 달린 삼각 모자에 파란 코트를 입은 바다의 선장이에요. 튼튼하고 강하고 빠른 최고의 용사예요.", draw:drawPirate },
];
HEROES.forEach(h=>{ const k=h.perks; h.perkText=[k.xp>1?`경험치 +${Math.round((k.xp-1)*100)}%`:"",k.start?`기술 ${k.start}개로 시작`:"",k.revive>1?`부활 ${k.revive}번`:"",k.cards>3?`레벨업 카드 ${k.cards}장`:""].filter(Boolean).join(" · "); });
HEROES.forEach(h=>{ const w=h.power; h.hp=60+12*w.hp; h.spd=+(0.85+0.04*w.spd).toFixed(2); h.mods=Object.assign({},h.mods,{dmg:+((0.8+0.06*w.atk)*((h.mods&&h.mods.dmg)||1)).toFixed(2)}) });
HEROES.forEach(h=>{ h.skill = `${h.cls} · ${h.main.name}` });
const OLD_HERO_COST = {wind:0, sky:300, sea:500, rock:700, fire:900, cloud:1200};
const SPRITE_URLS = {}, SPRITE_DARK = {};
function gridToURL(grid, dark){
  const cv=document.createElement("canvas"); cv.width=SZ; cv.height=SZ; const x=cv.getContext("2d");
  grid.forEach((row,yy)=>row.forEach((c,xx)=>{ if(!c) return; x.fillStyle = dark ? (c===C.k?"#0b0816":"#2a2347") : c; x.fillRect(xx,yy,1,1) }));
  return cv.toDataURL();
}
const SPRITE_T = {};
try{ HEROES.forEach(h=>{ SPRITE_T[h.id]=[]; for(let tr=0;tr<=4;tr++){ DECO={id:h.id,tier:tr}; const gr=h.draw(); SPRITE_T[h.id][tr]=gridToURL(gr); if(tr===0) SPRITE_DARK[h.id]=gridToURL(gr,true) } SPRITE_URLS[h.id]=SPRITE_T[h.id][0]; DECO={id:"",tier:0} }) }catch(e){ console.error(e) }
/* 지금 학생의 전직 단계에 맞는 모습으로 바꿔요 */
function refreshHeroSprites(tierOf){ HEROES.forEach(h=>{ SPRITE_URLS[h.id]=SPRITE_T[h.id][Math.max(0,Math.min(4,tierOf(h.id)||0))] }) }
const heroById = id=>HEROES.find(h=>h.id===id)||HEROES[0];
