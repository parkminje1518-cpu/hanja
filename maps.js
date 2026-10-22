/* ===== 게임 맵 5단계: 쉬울수록 편안한 들판, 어려울수록 던전 ===== */
const MAPS = [
  { id:1, name:"햇살 꽃밭", diff:"아주 쉬움", lv:1, exp:0.6, hp:0.6, spawn:0.65, spd:0.82, boss:[150,270],
    desc:"따뜻한 햇살 아래 꽃이 핀 들판이에요. 말랑한 풀잎 슬라임만 살아요. 처음 하는 친구에게 딱!",
    sky:["#cdeeb0","#b4e294"], hud:"#25211b", enemy:{body:"#6fcf5a",shade:"#4aa63e",eye:"#ffffff",acc:"leaf",name:"풀잎 슬라임"}, bossName:"왕 풀잎 슬라임", tag:"#3fcf8e" },
  { id:2, name:"바람 숲길", diff:"쉬움", lv:5, exp:0.9, hp:0.9, spawn:0.85, spd:0.92, boss:[120,240],
    desc:"나무 사이로 바람이 솔솔 부는 숲길이에요. 버섯 몬스터가 통통 튀어나와요.",
    sky:["#9fd08f","#86bf78"], hud:"#25211b", enemy:{body:"#c65a3e",shade:"#8f3a26",eye:"#ffffff",acc:"cap",name:"버섯 몬스터"}, bossName:"대왕 버섯", tag:"#63b0ff" },
  { id:3, name:"노을 유적", diff:"보통", lv:20, exp:1.3, hp:1.35, spawn:1.05, spd:1.05, boss:[110,220],
    desc:"해 질 녘 무너진 옛 성터예요. 보랏빛 도깨비불이 떠다녀요.",
    sky:["#e8b88a","#d39a7a"], hud:"#25211b", enemy:{body:"#8a5ad6",shade:"#5e3aa8",eye:"#ffe066",acc:"wisp",name:"도깨비불"}, bossName:"유적의 수호 도깨비", tag:"#f6c544" },
  { id:4, name:"어둠 동굴", diff:"어려움", lv:45, exp:2.0, hp:2.1, spawn:1.25, spd:1.12, boss:[90,190],
    desc:"수정이 희미하게 빛나는 깊은 동굴 던전이에요. 박쥐 몬스터가 떼로 몰려와요.",
    sky:["#2c2a48","#211f38"], hud:"#f3effd", dark:0.55, enemy:{body:"#3a3466",shade:"#221e44",eye:"#ff5a6a",acc:"wing",name:"동굴 박쥐 몬스터"}, bossName:"동굴의 박쥐 왕", tag:"#c08bff" },
  { id:5, name:"어둠의 마왕성", diff:"지옥", lv:75, exp:3.0, hp:3.2, spawn:1.45, spd:1.2, boss:[70,150,240],
    desc:"용암이 흐르는 마왕의 성 지하 감옥이에요. 뿔 달린 어둠 마귀들이 끝없이 나타나요. 용사의 진짜 실력을 보여 줘요!",
    sky:["#2a1418","#1e0e12"], hud:"#f3effd", dark:0.45, enemy:{body:"#2a1a1e",shade:"#140a0c",eye:"#ff8a2a",acc:"horn",name:"어둠 마귀"}, bossName:"어둠 마왕", tag:"#e9475f" },
  /* ===== 천공: 하늘로 올라가는 도전 ===== */
  { id:6, realm:"sky", name:"용오름 첨탑", diff:"천공 1", lv:80, exp:3.5, hp:3.6, spawn:1.5, spd:1.22,
    desc:"회오리바람이 하늘까지 솟구치는 바람의 탑이에요. 움직이는 회오리를 피하며 꼭대기의 폭풍군주 천풍에게 도전해요!",
    sky:["#6a8cb4","#3a5a84"], hud:"#f3effd", dark:0.18, enemy:{body:"#2a6a8a",shade:"#1a4a6a",eye:"#5af0ff",acc:"wing",name:"회오리 정령"}, bossName:"폭풍군주 천풍", tag:"#3ab8ff" },
  { id:7, realm:"sky", name:"하늘 성", diff:"천공 2", lv:85, exp:4.0, hp:4.1, spawn:1.55, spd:1.25,
    desc:"구름 위에 떠 있는 하얀 성이에요. 성벽 대포가 쏟아지고 성벽 때문에 길이 좁아요. 수문장을 넘어 더 높이!",
    sky:["#eef2fa","#c8d4ea"], hud:"#25211b", enemy:{body:"#e2e8f2",shade:"#a8b2c6",eye:"#ffd23a",acc:"wing",name:"하늘성 병사"}, bossName:"하늘성 수문장", tag:"#d8a62a" },
  { id:8, realm:"sky", name:"천공 빙궁", diff:"천공 3", lv:90, exp:4.6, hp:4.7, spawn:1.6, spd:1.27,
    desc:"구름보다 높은 얼음 궁전이에요. 빙판에서는 미끄러지고 고드름이 떨어져요. 용이 된 아스라가 기다려요!",
    sky:["#d8eef8","#9cc6e2"], hud:"#25211b", enemy:{body:"#bfe6ff",shade:"#7ab4d8",eye:"#3ad8ff",acc:"wing",name:"얼음 정령"}, bossName:"승천한 아스라", tag:"#5ac8f0" },
  { id:9, realm:"sky", name:"천상 신전", diff:"천공 4", lv:95, exp:5.3, hp:5.4, spawn:1.65, spd:1.3,
    desc:"번개 북이 울리는 신들의 금빛 신전이에요. 「신의 심판」이 오면 빛의 원 안으로 피해요!",
    sky:["#f6e6b8","#d8b06a"], hud:"#25211b", enemy:{body:"#f2d68a",shade:"#b8902a",eye:"#ffe23a",acc:"wing",name:"번개 정령"}, bossName:"뇌신 장군", tag:"#e8a62a" },
  { id:10, realm:"sky", name:"별의 왕좌", diff:"천공 5 · 최종", lv:100, tier:4, exp:6.2, hp:6.4, spawn:1.7, spd:1.33,
    desc:"하늘 꼭대기 너머, 별들의 왕좌예요. 블랙홀이 모든 것을 끌어당겨요. 4차 전직한 용사만 도전할 수 있는 마지막 맵!",
    sky:["#1a1244","#07051a"], hud:"#f3effd", dark:0.25, enemy:{body:"#3a2a7a",shade:"#1a1040",eye:"#c88aff",acc:"horn",name:"공허 성마"}, bossName:"성좌의 종언신 아스트라카", tag:"#9a5aff" },
];
MAPS.forEach(m=>{ if(!m.realm) m.realm="ground" });
const mapById = id=>MAPS.find(m=>m.id===id)||MAPS[0];
/* 같은 칸이면 언제나 같은 장식이 나오도록 하는 해시 */
function mhash(x,y,i){ let n=(x*374761393 + y*668265263 + i*69069)|0; n=Math.imul(n^(n>>>13),1274126177); return ((n^(n>>>16))>>>0)/4294967295 }
/* ===== 바닥 도형: 네모 타일 대신 모양이 제각각인 돌판 · 육각 타일 · 떠 있는 섬 ===== */
const FCELL=140;
function jv(i,j,amt){ return [i*FCELL+(mhash(i,j,201)-.5)*FCELL*amt, j*FCELL+(mhash(i,j,202)-.5)*FCELL*amt] }
function ejv(i1,j1,i2,j2,amt){ const a=jv(i1,j1,amt), b=jv(i2,j2,amt), k=mhash(i1+i2*7,j1+j2*13,203)-.5, nx=-(b[1]-a[1]), ny=b[0]-a[0], L=Math.hypot(nx,ny)||1;
  return [(a[0]+b[0])/2+nx/L*k*FCELL*amt*.5,(a[1]+b[1])/2+ny/L*k*FCELL*amt*.5] }
/* 한 칸의 울퉁불퉁한 돌판 꼭짓점들 (이웃 칸과 모서리를 나눠 가져서 틈이 고르게 생겨요) */
function cellPoly(cx,cy,amt){ return [jv(cx,cy,amt),ejv(cx,cy,cx+1,cy,amt),jv(cx+1,cy,amt),ejv(cx+1,cy,cx+1,cy+1,amt),jv(cx+1,cy+1,amt),ejv(cx,cy+1,cx+1,cy+1,amt),jv(cx,cy+1,amt),ejv(cx,cy,cx,cy+1,amt)] }
function insetPoly(P,d){ const mx=P.reduce((a,p)=>a+p[0],0)/P.length, my=P.reduce((a,p)=>a+p[1],0)/P.length; return P.map(([x,y])=>{ const dx=x-mx, dy=y-my, L=Math.hypot(dx,dy)||1; return [x-dx/L*d, y-dy/L*d] }) }
function roundPath(ctx,P,rad){ const n=P.length; ctx.beginPath();
  for(let i=0;i<n;i++){ const a=P[(i+n-1)%n], b=P[i], c=P[(i+1)%n]; const m1=[b[0]+(a[0]-b[0])*rad,b[1]+(a[1]-b[1])*rad], m2=[b[0]+(c[0]-b[0])*rad,b[1]+(c[1]-b[1])*rad];
    i?ctx.lineTo(m1[0],m1[1]):ctx.moveTo(m1[0],m1[1]); ctx.quadraticCurveTo(b[0],b[1],m2[0],m2[1]) } ctx.closePath() }
/* 돌판 그리기: 틈(어두운 줄눈) → 돌 면(그라데이션) → 위쪽 밝은 테 */
function drawStone(ctx,P,c1,c2,hl,rad){ const xs=P.map(p=>p[0]), ys=P.map(p=>p[1]), x0=Math.min(...xs), y0=Math.min(...ys), x1=Math.max(...xs), y1=Math.max(...ys);
  const g=ctx.createLinearGradient(x0,y0,x1,y1); g.addColorStop(0,c1); g.addColorStop(1,c2); ctx.fillStyle=g; roundPath(ctx,P,rad); ctx.fill();
  if(hl){ ctx.save(); roundPath(ctx,P,rad); ctx.clip(); ctx.strokeStyle=hl; ctx.lineWidth=3; ctx.translate(2,2); roundPath(ctx,P,rad); ctx.stroke(); ctx.restore() } }
/* 칸 하나를 돌판 1~2장으로 (가끔 대각선으로 갈라져요) */
function cellStones(ctx,cx,cy,amt,gap,c1,c2,hl,rad){ const P=cellPoly(cx,cy,amt);
  if(mhash(cx,cy,204)<.3){ const A=[P[0],P[1],P[2],P[3],P[4]], B=[P[4],P[5],P[6],P[7],P[0]]; [A,B].forEach((Q,k)=>drawStone(ctx,insetPoly(Q,gap),k?c2:c1,k?c1:c2,hl,rad)) }
  else drawStone(ctx,insetPoly(P,gap),c1,c2,hl,rad); return P }
function hexPath(ctx,x,y,r){ ctx.beginPath(); for(let k=0;k<6;k++){ const a=Math.PI/6+k*Math.PI/3; k?ctx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r):ctx.moveTo(x+Math.cos(a)*r,y+Math.sin(a)*r) } ctx.closePath() }
function drawMapBG(ctx, map, camX, camY, W, H, t){
  const g=ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,map.sky[0]); g.addColorStop(1,map.sky[1]);
  ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  const CELL=140, x0=Math.floor((camX-W/2)/CELL)-1, x1=Math.floor((camX+W/2)/CELL)+1, y0=Math.floor((camY-H/2)/CELL)-1, y1=Math.floor((camY+H/2)/CELL)+1;
  ctx.save(); ctx.translate(W/2-camX, H/2-camY);
  if(map.id===9){ // 금빛 육각 타일 (가운데가 볼록한 듯 빛나요)
    const HR=46, HW=HR*Math.sqrt(3), HH=HR*1.5, i0=Math.floor((camX-W/2)/HW)-1, i1=Math.floor((camX+W/2)/HW)+1, j0=Math.floor((camY-H/2)/HH)-1, j1=Math.floor((camY+H/2)/HH)+1;
    for(let j=j0;j<=j1;j++) for(let i=i0;i<=i1;i++){ const x=i*HW+((j&1)?HW/2:0), y=j*HH, h=mhash(i,j,301);
      const g=ctx.createRadialGradient(x-HR*.3,y-HR*.3,4,x,y,HR); g.addColorStop(0,h<.15?"rgba(255,240,200,.85)":"rgba(255,250,232,.7)"); g.addColorStop(1,h<.15?"rgba(220,170,80,.7)":"rgba(232,212,160,.7)");
      ctx.fillStyle=g; hexPath(ctx,x,y,HR-3); ctx.fill(); ctx.strokeStyle="rgba(190,140,40,.6)"; ctx.lineWidth=2; ctx.stroke();
      if(h>.9){ ctx.strokeStyle="rgba(190,130,30,.55)"; ctx.lineWidth=1.5; hexPath(ctx,x,y,HR*.55); ctx.stroke() } } }
  for(let cy=y0; cy<=y1; cy++) for(let cx=x0; cx<=x1; cx++){
    const bx=cx*CELL, by=cy*CELL, r1=mhash(cx,cy,1), r2=mhash(cx,cy,2), r3=mhash(cx,cy,3), r4=mhash(cx,cy,4);
    const px=bx+r2*CELL, py=by+r3*CELL;
    if(map.id===1){ // 햇살 꽃밭
      if(r1<.5){ ctx.fillStyle="rgba(255,255,255,.18)"; ctx.beginPath(); ctx.ellipse(bx+70,by+70,60,34,0,0,7); ctx.fill() }
      for(let i=0;i<3;i++){ const fx=bx+mhash(cx,cy,10+i)*CELL, fy=by+mhash(cx,cy,20+i)*CELL, c=["#ff8fb1","#ffe066","#ffffff","#c8a6ff"][(mhash(cx,cy,30+i)*4)|0];
        ctx.fillStyle="#4aa63e"; ctx.fillRect(fx-1,fy,2,7);
        ctx.fillStyle=c; for(let k=0;k<5;k++){ const a=k*1.256; ctx.beginPath(); ctx.arc(fx+Math.cos(a)*3.5,fy+Math.sin(a)*3.5,3,0,7); ctx.fill() }
        ctx.fillStyle="#f6a623"; ctx.beginPath(); ctx.arc(fx,fy,2.2,0,7); ctx.fill() }
      ctx.strokeStyle="#5cb84a"; ctx.lineWidth=2; for(let i=0;i<2;i++){ const gx=bx+mhash(cx,cy,40+i)*CELL, gy=by+mhash(cx,cy,50+i)*CELL; ctx.beginPath(); ctx.moveTo(gx-4,gy); ctx.lineTo(gx-6,gy-8); ctx.moveTo(gx,gy); ctx.lineTo(gx,gy-10); ctx.moveTo(gx+4,gy); ctx.lineTo(gx+6,gy-8); ctx.stroke() }
      if(r4<.18){ const bfx=px+Math.sin(t*1.3+r1*9)*20, bfy=py+Math.cos(t*1.7+r2*9)*12, w=Math.abs(Math.sin(t*12+r3*9))*6+2; ctx.fillStyle="#ffffff"; ctx.beginPath(); ctx.ellipse(bfx-w/2,bfy,w,4,0,0,7); ctx.ellipse(bfx+w/2,bfy,w,4,0,0,7); ctx.fill() }
    } else if(map.id===2){ // 바람 숲길
      if(r1<.35){ ctx.fillStyle="rgba(210,190,140,.35)"; ctx.beginPath(); ctx.ellipse(bx+70,by+70,70,22,r2,0,7); ctx.fill() }
      if(r4<.0){ ctx.fillStyle="rgba(0,0,0,.12)"; ctx.beginPath(); ctx.ellipse(px,py+30,34,10,0,0,7); ctx.fill();
        ctx.fillStyle="#7a5230"; ctx.fillRect(px-5,py,10,30); const sw=Math.sin(t*1.5+r1*6)*2;
        ctx.fillStyle="#2f7d4f"; ctx.beginPath(); ctx.arc(px+sw,py-8,26,0,7); ctx.fill(); ctx.fillStyle="#3f9a5f"; ctx.beginPath(); ctx.arc(px-8+sw,py-16,16,0,7); ctx.fill(); ctx.fillStyle="#56b878"; ctx.beginPath(); ctx.arc(px-12+sw,py-20,7,0,7); ctx.fill() }
      else if(r4<.62){ ctx.fillStyle="#f4ece0"; ctx.fillRect(px-2,py,4,7); ctx.fillStyle="#e9475f"; ctx.beginPath(); ctx.arc(px,py,7,Math.PI,0); ctx.fill(); ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(px-2,py-3,1.5,0,7); ctx.fill() }
      ctx.strokeStyle="#5a9e4e"; ctx.lineWidth=2; const gx=bx+r3*CELL, gy=by+r1*CELL; ctx.beginPath(); ctx.moveTo(gx-4,gy); ctx.lineTo(gx-6,gy-8); ctx.moveTo(gx+3,gy); ctx.lineTo(gx+5,gy-9); ctx.stroke();
    } else if(map.id===3){ // 노을 유적
      if(r1<.55){ const P=cellStones(ctx,cx,cy,.45,6,"rgba(200,160,130,.38)","rgba(160,110,100,.38)","rgba(255,230,200,.22)",.3);
        if(r3<.25){ ctx.strokeStyle="rgba(90,50,60,.35)"; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(P[1][0],P[1][1]); ctx.lineTo((P[1][0]+P[5][0])/2+8,(P[1][1]+P[5][1])/2); ctx.lineTo(P[5][0],P[5][1]); ctx.stroke() } }
      if(r4<.0){ ctx.fillStyle="rgba(0,0,0,.15)"; ctx.beginPath(); ctx.ellipse(px,py+40,22,7,0,0,7); ctx.fill();
        ctx.fillStyle="#c9a98a"; ctx.fillRect(px-12,py-30-r1*30,24,70+r1*30); ctx.fillStyle="#a8866a"; ctx.fillRect(px+4,py-30-r1*30,8,70+r1*30);
        ctx.fillStyle="#dcc3a8"; ctx.fillRect(px-16,py-36-r1*30,32,8); ctx.fillStyle="#7a5a4a"; ctx.fillRect(px-12,py+8,6,4) }
      else if(r4<.4){ ctx.fillStyle="#b89a80"; ctx.beginPath(); ctx.moveTo(px-14,py+6); ctx.lineTo(px-6,py-6); ctx.lineTo(px+12,py-2); ctx.lineTo(px+14,py+8); ctx.closePath(); ctx.fill() }
      if(r2<.12){ ctx.fillStyle="#6fbf5a"; ctx.fillRect(px+20,py,3,6); ctx.fillRect(px+24,py+2,3,4) }
    } else if(map.id===4){ // 어둠 동굴
      if(r1<.4){ ctx.fillStyle="rgba(0,0,0,.18)"; ctx.beginPath(); ctx.ellipse(bx+70,by+70,60,40,r2,0,7); ctx.fill() }
      if(r4<.08){ const glow=.5+.5*Math.sin(t*2+r1*7);
        ctx.fillStyle=`rgba(120,220,255,${.12+.1*glow})`; ctx.beginPath(); ctx.arc(px,py,34,0,7); ctx.fill();
        const cs=[[0,-26,7],[-10,-12,5],[10,-14,6]];
        cs.forEach(([ox,oy,w])=>{ ctx.fillStyle="#6fd8ff"; ctx.beginPath(); ctx.moveTo(px+ox,py+oy); ctx.lineTo(px+ox+w,py); ctx.lineTo(px+ox-w,py); ctx.closePath(); ctx.fill();
          ctx.fillStyle="#d8f6ff"; ctx.beginPath(); ctx.moveTo(px+ox,py+oy); ctx.lineTo(px+ox+2,py); ctx.lineTo(px+ox-w,py); ctx.closePath(); ctx.fill() }) }
      else if(r4<.55){ ctx.fillStyle="#3c3a5c"; ctx.beginPath(); ctx.moveTo(px-18,py+8); ctx.lineTo(px-8,py-10); ctx.lineTo(px+10,py-6); ctx.lineTo(px+18,py+8); ctx.closePath(); ctx.fill(); ctx.fillStyle="#4c4a70"; ctx.fillRect(px-6,py-8,8,4) }
      if(r2<.2){ ctx.fillStyle="#5a5880"; ctx.beginPath(); ctx.moveTo(bx+r3*CELL-5,by); ctx.lineTo(bx+r3*CELL+5,by); ctx.lineTo(bx+r3*CELL,by+18); ctx.fill() }
    } else if(map.id===6){ // 용오름 첨탑: 바람에 깎인 푸른 돌바닥 + 빛나는 바람 문양 + 흩날리는 깃털
      { const P=cellStones(ctx,cx,cy,.42,7,((cx+cy)&1)?"rgba(90,130,175,.5)":"rgba(70,105,150,.5)","rgba(35,60,100,.5)","rgba(210,240,255,.28)",.38);
        ctx.strokeStyle="rgba(200,235,255,.14)"; ctx.lineWidth=1.2; ctx.beginPath(); const c=insetPoly(P,22); ctx.moveTo(c[0][0],c[0][1]); ctx.quadraticCurveTo(c[2][0],c[2][1]+10,c[4][0],c[4][1]); ctx.stroke() }
      if(r4<.14){ const gl=.5+.5*Math.sin(t*2+r1*9); ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.strokeStyle=`rgba(120,230,255,${.25+.35*gl})`; ctx.lineWidth=2.5;
        ctx.beginPath(); for(let k=0;k<=20;k++){ const a=k*.55+t*.4, rr=4+k*1.7; k?ctx.lineTo(px+Math.cos(a)*rr,py+Math.sin(a)*rr*.7):ctx.moveTo(px+Math.cos(a)*rr,py+Math.sin(a)*rr*.7) } ctx.stroke(); ctx.restore() }
      else if(r4<.32){ ctx.strokeStyle="rgba(10,25,50,.45)"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(px-18,py); ctx.lineTo(px-4,py+5); ctx.lineTo(px+6,py-3); ctx.lineTo(px+20,py+4); ctx.stroke() }
      if(r2<.25){ ctx.strokeStyle="#5a9a7a"; ctx.lineWidth=2; const sw=Math.sin(t*4+r1*7)*4; for(let k=0;k<3;k++){ ctx.beginPath(); ctx.moveTo(px+k*4,py+20); ctx.quadraticCurveTo(px+k*4+sw,py+12,px+k*4+sw*2+6,py+8); ctx.stroke() } }
      { const ph=(t*.35+r3)%1, fx=bx+((r1*CELL+t*90)%CELL), fy=by+r2*CELL+Math.sin(t*2+r4*9)*10; if(r3<.3){ ctx.save(); ctx.translate(fx,fy); ctx.rotate(t*3+r1*9); ctx.fillStyle="rgba(230,245,255,.75)"; ctx.beginPath(); ctx.ellipse(0,0,6,2,0,0,7); ctx.fill(); ctx.restore() } }
    } else if(map.id===7){ // 하늘 성: 하얀 대리석 + 금빛 줄눈 + 바닥 문장
      cellStones(ctx,cx,cy,.3,3,((cx+cy)&1)?"rgba(255,255,255,.75)":"rgba(236,240,250,.75)","rgba(212,220,238,.75)","rgba(255,255,255,.6)",.18);
      if(((cx%3)+3)%3===0&&((cy%3)+3)%3===0){ const ox=cx*CELL+CELL*.5, oy=cy*CELL+CELL*.5; ctx.strokeStyle="rgba(214,170,60,.55)"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(ox,oy,CELL*.95,0,7); ctx.stroke(); ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(ox,oy,CELL*.8,0,7); ctx.stroke();
        for(let k=0;k<16;k++){ const a=k*Math.PI/8; ctx.beginPath(); ctx.moveTo(ox+Math.cos(a)*CELL*.8,oy+Math.sin(a)*CELL*.8); ctx.lineTo(ox+Math.cos(a+.2)*CELL*.95,oy+Math.sin(a+.2)*CELL*.95); ctx.stroke() } }
      ctx.strokeStyle="rgba(150,160,190,.25)"; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(bx+r1*CELL,by); ctx.quadraticCurveTo(bx+r2*CELL,by+CELL*.5,bx+r3*CELL,by+CELL); ctx.stroke();
      if(r4<.1){ ctx.strokeStyle="rgba(214,170,60,.6)"; ctx.lineWidth=2.5; ctx.beginPath(); ctx.arc(bx+70,by+70,30,0,7); ctx.stroke(); ctx.beginPath(); for(let i=0;i<8;i++){ const a=i*.785; ctx.moveTo(bx+70+Math.cos(a)*12,by+70+Math.sin(a)*12); ctx.lineTo(bx+70+Math.cos(a)*28,by+70+Math.sin(a)*28) } ctx.stroke() }
      else if(r4<.2){ ctx.fillStyle="rgba(40,70,160,.18)"; ctx.fillRect(bx+40,by+10,60,CELL-20); ctx.fillStyle="rgba(214,170,60,.35)"; ctx.fillRect(bx+40,by+10,60,6) }
    } else if(map.id===8){ // 천공 빙궁: 얼음 타일 + 서리 결 + 눈 더미 + 얼음 결정
      { const P=cellPoly(cx,cy,.55), mxp=P.reduce((a,p)=>a+p[0],0)/8+(r2-.5)*30, myp=P.reduce((a,p)=>a+p[1],0)/8+(r3-.5)*30;
        for(let k=0;k<8;k+=2){ const tri=[P[k],P[k+1],P[(k+2)%8],[mxp,myp]]; const lit=(k===0||k===6); drawStone(ctx,insetPoly(tri,3),lit?"rgba(255,255,255,.7)":"rgba(200,228,248,.6)",lit?"rgba(215,238,255,.6)":"rgba(160,200,232,.6)",null,.08) }
        ctx.strokeStyle="rgba(255,255,255,.75)"; ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(P[0][0],P[0][1]); ctx.lineTo(mxp,myp); ctx.lineTo(P[4][0],P[4][1]); ctx.stroke() }
      if(r1<.35){ ctx.strokeStyle="rgba(100,150,200,.45)"; ctx.lineWidth=1.2; ctx.beginPath(); let x=px-20,y=py; ctx.moveTo(x,y); for(let k=0;k<5;k++){ x+=8+mhash(cx,cy,90+k)*6; y+=(mhash(cx,cy,95+k)-.5)*14; ctx.lineTo(x,y) } ctx.stroke() }
      if(r4<.16){ ctx.fillStyle="rgba(255,255,255,.9)"; ctx.beginPath(); ctx.ellipse(px,py+6,26,9,0,0,7); ctx.fill(); ctx.fillStyle="rgba(200,225,245,.9)"; ctx.beginPath(); ctx.ellipse(px+6,py+9,16,5,0,0,7); ctx.fill() }
      else if(r4<.28){ const gl=.6+.4*Math.sin(t*2+r1*9); ctx.save(); ctx.translate(px,py); for(let k=0;k<6;k++){ ctx.rotate(Math.PI/3); ctx.strokeStyle=`rgba(255,255,255,${.5+.4*gl})`; ctx.lineWidth=1.6; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-11); ctx.moveTo(0,-6); ctx.lineTo(-3,-9); ctx.moveTo(0,-6); ctx.lineTo(3,-9); ctx.stroke() } ctx.restore() }
    } else if(map.id===9){ // 천상 신전: 금빛 대리석 + 번개 북 문양 + 구름 틈

      if(r4<.13){ const ox=bx+70, oy=by+70; ctx.strokeStyle="rgba(190,130,30,.7)"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(ox,oy,26,0,7); ctx.stroke();
        for(let k=0;k<3;k++){ const a=k*2.094+t*.3; ctx.fillStyle="rgba(190,130,30,.7)"; ctx.beginPath(); ctx.arc(ox+Math.cos(a)*9,oy+Math.sin(a)*9,7,a,a+Math.PI); ctx.fill() } }
      else if(r4<.24){ const gl=.5+.5*Math.sin(t*3+r2*9); ctx.strokeStyle=`rgba(170,110,255,${.35+.4*gl})`; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(px-14,py-10); ctx.lineTo(px-2,py-2); ctx.lineTo(px-8,py+2); ctx.lineTo(px+12,py+12); ctx.stroke() }
      if(r1<.12){ ctx.fillStyle="rgba(255,255,255,.7)"; ctx.beginPath(); ctx.ellipse(bx+r2*CELL,by+r3*CELL,34,12,0,0,7); ctx.fill() }
    } else if(map.id===10){ // 별의 왕좌: 공허의 바닥 + 별 + 별자리 선 + 성운 얼룩
      { const P=insetPoly(cellPoly(cx,cy,.42),16+r1*10);
        ctx.fillStyle="rgba(0,0,0,.35)"; ctx.save(); ctx.translate(0,10); roundPath(ctx,P,.4); ctx.fill(); ctx.restore();
        drawStone(ctx,P,((cx+cy)&1)?"rgba(70,50,140,.62)":"rgba(55,38,115,.62)","rgba(28,18,70,.62)","rgba(220,190,255,.3)",.4);
        ctx.strokeStyle="rgba(214,170,80,.45)"; ctx.lineWidth=1.6; roundPath(ctx,P,.4); ctx.stroke() }
      for(let k=0;k<4;k++){ const sx=bx+mhash(cx,cy,110+k)*CELL, sy=by+mhash(cx,cy,120+k)*CELL, tw=.5+.5*Math.sin(t*3+k*2+r1*9); ctx.fillStyle=`rgba(255,250,220,${.4+.5*tw})`; ctx.fillRect(sx-1,sy-1,2+(k===0?1:0),2+(k===0?1:0)) }
      if(r4<.18){ const pts=[0,1,2,3].map(k=>[bx+mhash(cx,cy,130+k)*CELL,by+mhash(cx,cy,140+k)*CELL]); ctx.strokeStyle="rgba(170,190,255,.45)"; ctx.lineWidth=1.2; ctx.beginPath(); pts.forEach(([x,y],k)=>k?ctx.lineTo(x,y):ctx.moveTo(x,y)); ctx.stroke();
        pts.forEach(([x,y])=>{ ctx.fillStyle="rgba(230,240,255,.95)"; ctx.beginPath(); ctx.arc(x,y,2.6,0,7); ctx.fill() }) }
      if(r2<.2){ const g=ctx.createRadialGradient(px,py,0,px,py,60); g.addColorStop(0,`rgba(${r3<.5?"160,80,255":"255,90,180"},.22)`); g.addColorStop(1,"rgba(120,60,255,0)"); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(px,py,60,0,7); ctx.fill() }
    } else { // 어둠의 마왕성
      cellStones(ctx,cx,cy,.5,5,((cx+cy)&1)?"rgba(90,40,44,.6)":"rgba(70,30,34,.6)","rgba(36,14,18,.6)","rgba(255,120,80,.16)",.25); ctx.strokeStyle="rgba(0,0,0,0)"; ctx.beginPath(); ctx.moveTo(bx,by+CELL/2); ctx.lineTo(bx+CELL,by+CELL/2); ctx.moveTo(bx+CELL/2,by); ctx.lineTo(bx+CELL/2,by+CELL/2); ctx.stroke();
      if(r4<.16){ const glow=.6+.4*Math.sin(t*2.4+r1*9), pts=[]; let ax=px-46, ay=py; for(let k=0;k<7;k++){ pts.push([ax,ay]); ax+=14+mhash(cx,cy,60+k)*6; ay+=(mhash(cx,cy,70+k)-.5)*18 }
        const path=()=>{ ctx.beginPath(); pts.forEach(([x,y],k)=>k?ctx.lineTo(x,y):ctx.moveTo(x,y)); const [bx2,by2]=pts[3]; ctx.moveTo(bx2,by2); ctx.lineTo(bx2+8,by2+16); ctx.lineTo(bx2+4,by2+26) };
        ctx.lineJoin="round"; ctx.lineCap="round";
        ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.strokeStyle=`rgba(255,80,20,${.18*glow})`; ctx.lineWidth=16; path(); ctx.stroke(); ctx.restore();
        ctx.strokeStyle="#1a0806"; ctx.lineWidth=7; path(); ctx.stroke();
        ctx.strokeStyle=`rgb(255,${90+70*glow|0},30)`; ctx.lineWidth=3; path(); ctx.stroke();
        ctx.strokeStyle=`rgba(255,240,170,${.8*glow})`; ctx.lineWidth=1.2; path(); ctx.stroke() }
      else if(r4<.4){ ctx.fillStyle=`rgba(255,120,40,${.2+.1*Math.sin(t*4+r2*5)})`; ctx.beginPath(); ctx.arc(px,py,30,0,7); ctx.fill();
        ctx.fillStyle="#3a2a2e"; ctx.fillRect(px-3,py-6,6,22); ctx.fillStyle="#ff8a2a"; ctx.beginPath(); ctx.moveTo(px-6,py-6); ctx.quadraticCurveTo(px,py-24-Math.sin(t*10+r1)*4,px+6,py-6); ctx.fill(); ctx.fillStyle="#ffe066"; ctx.beginPath(); ctx.ellipse(px,py-9,2.5,5,0,0,7); ctx.fill() }
      else if(r4<.5){ ctx.strokeStyle="#5a5060"; ctx.lineWidth=3; for(let i=0;i<5;i++){ ctx.beginPath(); ctx.ellipse(px,py+i*9,4,6,0,0,7); ctx.stroke() } }
    }
  }
  ctx.restore();
}
function drawMapOverlay(ctx, map, W, H, t){
  const ptc=(n,seed,fn)=>{ for(let i=0;i<n;i++) fn(i, mhash(i,seed,1), mhash(i,seed,2), mhash(i,seed,3)) };
  if(map.id===1){ // 햇살 꽃밭: 따스한 햇살 줄기 + 날리는 꽃잎
    ctx.save(); ctx.globalCompositeOperation="lighter";
    for(let i=0;i<4;i++){ const x=W*(.1+i*.28)+Math.sin(t*.3+i)*30, g=ctx.createLinearGradient(x,0,x+W*.25,H); g.addColorStop(0,"rgba(255,240,180,.16)"); g.addColorStop(1,"rgba(255,240,180,0)");
      ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x+70,0); ctx.lineTo(x+W*.25+120,H); ctx.lineTo(x+W*.25,H); ctx.closePath(); ctx.fill() } ctx.restore();
    ptc(18,11,(i,a,b,c)=>{ const x=(a*W+t*(30+c*30))%(W+40)-20, y=(b*H+t*(20+c*25))%(H+40)-20, rot=t*2+i;
      ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.fillStyle=c<.5?"rgba(255,160,200,.85)":"rgba(255,255,255,.8)"; ctx.beginPath(); ctx.ellipse(0,0,5,2.6,0,0,7); ctx.fill(); ctx.restore() });
    const v=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.4,W/2,H/2,Math.max(W,H)*.75); v.addColorStop(0,"rgba(255,220,120,0)"); v.addColorStop(1,"rgba(255,200,100,.18)"); ctx.fillStyle=v; ctx.fillRect(0,0,W,H) }
  else if(map.id===2){ // 바람 숲길: 나뭇잎 그림자 + 떨어지는 잎 + 안개
    ptc(10,21,(i,a,b,c)=>{ const x=(a*W+Math.sin(t*.4+i)*40), y=(b*H+Math.cos(t*.3+i)*30); ctx.fillStyle="rgba(10,40,20,.13)"; ctx.beginPath(); ctx.ellipse(x,y,80+c*60,45+c*30,c*3,0,7); ctx.fill() });
    ctx.save(); ctx.globalCompositeOperation="lighter"; ptc(7,22,(i,a,b)=>{ const x=a*W, y=b*H, k=.5+.5*Math.sin(t*1.5+i); ctx.fillStyle=`rgba(255,250,200,${.08*k})`; ctx.beginPath(); ctx.ellipse(x,y,50,30,0,0,7); ctx.fill() }); ctx.restore();
    ptc(16,23,(i,a,b,c)=>{ const x=(a*W+t*(40+c*30))%(W+40)-20, y=(b*H+t*(35+c*20))%(H+40)-20; ctx.save(); ctx.translate(x,y); ctx.rotate(t*3*(c-.5)+i); ctx.fillStyle=["#5cb84a","#c8a03a","#8acf5a"][i%3]; ctx.beginPath(); ctx.ellipse(0,0,6,3,0,0,7); ctx.fill(); ctx.restore() });
    const m=ctx.createLinearGradient(0,H*.6,0,H); m.addColorStop(0,"rgba(220,240,230,0)"); m.addColorStop(1,"rgba(220,240,230,.22)"); ctx.fillStyle=m; ctx.fillRect(0,0,W,H) }
  else if(map.id===3){ // 노을 유적: 노을빛 + 모래바람
    const g=ctx.createLinearGradient(0,0,W,H); g.addColorStop(0,"rgba(255,170,90,.18)"); g.addColorStop(1,"rgba(160,60,90,.16)"); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    ptc(40,31,(i,a,b,c)=>{ const x=(a*W+t*(90+c*80))%(W+20)-10, y=(b*H+Math.sin(t+i)*10); ctx.fillStyle=`rgba(255,220,170,${.25+c*.3})`; ctx.fillRect(x,y,2+c*3,1.5) });
    ctx.strokeStyle="rgba(255,230,190,.12)"; ctx.lineWidth=2; ptc(5,32,(i,a,b)=>{ const y=b*H, x=(a*W+t*120)%(W+300)-150; ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+80,y-14,x+180,y); ctx.stroke() }) }
  else if(map.id===4){ // 어둠 동굴: 반딧불 포자 + 물방울
    ctx.save(); ctx.globalCompositeOperation="lighter";
    ptc(26,41,(i,a,b,c)=>{ const x=a*W+Math.sin(t*.7+i*2)*30, y=b*H+Math.cos(t*.5+i)*24, k=.5+.5*Math.sin(t*3+i*1.3); const col=c<.5?"120,220,255":"190,140,255";
      const g=ctx.createRadialGradient(x,y,0,x,y,10); g.addColorStop(0,`rgba(${col},${.9*k})`); g.addColorStop(1,`rgba(${col},0)`); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,10,0,7); ctx.fill() });
    ctx.restore();
    ptc(6,42,(i,a,b,c)=>{ const ph=(t*.6+c)%1, x=a*W, y=b*H*.6+ph*H*.4; ctx.fillStyle=`rgba(160,210,255,${.6*(1-ph)})`; ctx.beginPath(); ctx.ellipse(x,y,1.6,4,0,0,7); ctx.fill() }) }
  else if(map.id===5){ // 어둠의 마왕성: 붉은 안개 + 불씨 + 열기
    const g=ctx.createLinearGradient(0,H,0,0); g.addColorStop(0,"rgba(255,70,30,.22)"); g.addColorStop(.5,"rgba(120,20,30,.08)"); g.addColorStop(1,"rgba(0,0,0,.2)"); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    ctx.save(); ctx.globalCompositeOperation="lighter";
    ptc(34,51,(i,a,b,c)=>{ const x=(a*W+Math.sin(t*2+i)*16), y=H-((t*(40+c*60)+b*H)%(H+30)), k=.6+.4*Math.sin(t*8+i); ctx.fillStyle=`rgba(255,${140+c*80|0},60,${k})`; ctx.fillRect(x,y,2+c*2,2+c*2) });
    ptc(5,52,(i,a,b,c)=>{ const x=a*W, y=b*H, k=.5+.5*Math.sin(t*.8+i); ctx.fillStyle=`rgba(200,40,40,${.07*k})`; ctx.beginPath(); ctx.ellipse(x+Math.sin(t*.3+i)*60,y,180,70,0,0,7); ctx.fill() });
    ctx.restore() }
  else if(map.id===6){ // 용오름 첨탑: 빠른 바람 줄기 + 지나가는 구름 + 깃털
    ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.lineCap="round";
    ptc(26,61,(i,a,b,c)=>{ const y=b*H, x=((a*W+t*(420+c*300))%(W+400))-200, len=60+c*120; ctx.strokeStyle=`rgba(220,245,255,${.12+c*.18})`; ctx.lineWidth=1.5+c*2; ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+len*.5,y-6-c*8,x+len,y); ctx.stroke() });
    ctx.restore();
    ptc(5,62,(i,a,b,c)=>{ const x=((a*W+t*(60+c*40))%(W+500))-250, y=b*H; const g=ctx.createRadialGradient(x,y,0,x,y,140+c*80); g.addColorStop(0,"rgba(235,245,255,.22)"); g.addColorStop(1,"rgba(235,245,255,0)"); ctx.fillStyle=g; ctx.beginPath(); ctx.ellipse(x,y,220+c*100,90+c*40,0,0,7); ctx.fill() });
    const v=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.35,W/2,H/2,Math.max(W,H)*.75); v.addColorStop(0,"rgba(20,40,80,0)"); v.addColorStop(1,"rgba(20,40,80,.35)"); ctx.fillStyle=v; ctx.fillRect(0,0,W,H) }
  else if(map.id===7){ // 하늘 성: 햇살 기둥 + 발아래 구름 + 반짝임
    ctx.save(); ctx.globalCompositeOperation="lighter";
    for(let i=0;i<5;i++){ const x=W*(.05+i*.23)+Math.sin(t*.25+i)*25, g=ctx.createLinearGradient(x,0,x-W*.15,H); g.addColorStop(0,"rgba(255,245,200,.2)"); g.addColorStop(1,"rgba(255,245,200,0)"); ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x+60,0); ctx.lineTo(x-W*.15+100,H); ctx.lineTo(x-W*.15,H); ctx.closePath(); ctx.fill() }
    ptc(24,71,(i,a,b,c)=>{ const k=.5+.5*Math.sin(t*3+i*1.7); ctx.fillStyle=`rgba(255,235,160,${.6*k})`; const x=a*W, y=b*H; ctx.fillRect(x-1,y-4,2,8); ctx.fillRect(x-4,y-1,8,2) });
    ctx.restore();
    const cl=(y0,dir)=>{ for(let i=0;i<9;i++){ const x=((i/9)*W+t*12*dir+W)%(W+200)-100, y=y0+Math.sin(i*1.7+t*.5)*10; ctx.fillStyle="rgba(255,255,255,.75)"; ctx.beginPath(); ctx.ellipse(x,y,90,34,0,0,7); ctx.fill() } };
    cl(H+8,1); cl(-10,-1) }
  else if(map.id===8){ // 천공 빙궁: 오로라 + 내리는 눈 + 차가운 테두리
    ctx.save(); ctx.globalCompositeOperation="lighter";
    for(let k=0;k<3;k++){ const y0=H*(.06+k*.07); ctx.strokeStyle=`rgba(${k===1?"140,255,200":"120,200,255"},.10)`; ctx.lineWidth=40-k*8; ctx.beginPath(); for(let i=0;i<=20;i++){ const x=i/20*W, y=y0+Math.sin(i*.6+t*.5+k)*24; i?ctx.lineTo(x,y):ctx.moveTo(x,y) } ctx.stroke() }
    ctx.restore();
    ptc(46,81,(i,a,b,c)=>{ const x=(a*W+Math.sin(t*.8+i)*24+t*12*(c-.3))%W, y=(b*H+t*(30+c*40))%(H+20)-10; ctx.fillStyle=`rgba(255,255,255,${.55+c*.4})`; ctx.beginPath(); ctx.arc(x,y,1+c*2.2,0,7); ctx.fill() });
    const v=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.35,W/2,H/2,Math.max(W,H)*.75); v.addColorStop(0,"rgba(200,235,255,0)"); v.addColorStop(1,"rgba(170,215,245,.45)"); ctx.fillStyle=v; ctx.fillRect(0,0,W,H) }
  else if(map.id===9){ // 천상 신전: 금빛 햇살 + 발아래 구름 + 보랏빛 번개 섬광
    ctx.save(); ctx.globalCompositeOperation="lighter";
    for(let i=0;i<5;i++){ const x=W*(.08+i*.22)+Math.sin(t*.2+i)*20, g=ctx.createLinearGradient(x,0,x+W*.1,H); g.addColorStop(0,"rgba(255,225,140,.22)"); g.addColorStop(1,"rgba(255,225,140,0)"); ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x+70,0); ctx.lineTo(x+W*.1+110,H); ctx.lineTo(x+W*.1,H); ctx.closePath(); ctx.fill() }
    const fl=(t*.23)%5; if(fl<.08||(fl>.16&&fl<.21)){ ctx.fillStyle="rgba(200,160,255,.22)"; ctx.fillRect(0,0,W,H) }
    ctx.restore();
    for(let i=0;i<10;i++){ const x=((i/10)*W+t*10+W)%(W+200)-100, y=H+10+Math.sin(i*1.3+t*.4)*8; ctx.fillStyle="rgba(255,255,255,.8)"; ctx.beginPath(); ctx.ellipse(x,y,95,36,0,0,7); ctx.fill() } }
  else if(map.id===10){ // 별의 왕좌: 반짝이는 별 + 성운 소용돌이 + 블랙홀 어둠
    ctx.save(); ctx.globalCompositeOperation="lighter";
    ptc(5,101,(i,a,b,c)=>{ const x=a*W, y=b*H, R=160+c*120; const g=ctx.createRadialGradient(x,y,0,x,y,R); g.addColorStop(0,`rgba(${i%2?"140,70,255":"255,80,170"},.10)`); g.addColorStop(1,"rgba(80,40,200,0)"); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x+Math.sin(t*.1+i)*30,y,R,0,7); ctx.fill() });
    ptc(40,102,(i,a,b,c)=>{ const tw=.5+.5*Math.sin(t*(2+c*3)+i); ctx.fillStyle=`rgba(255,250,230,${.3+.6*tw})`; const x=a*W, y=b*H, z=c<.15?2.5:1.3; ctx.fillRect(x-z/2,y-z/2,z,z); if(c<.08){ ctx.fillRect(x-5,y-.5,10,1); ctx.fillRect(x-.5,y-5,1,10) } });
    ctx.restore() }
  if(map.dark){ const g=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.2,W/2,H/2,Math.max(W,H)*.68);
    g.addColorStop(0,"rgba(0,0,0,0)"); g.addColorStop(1,`rgba(0,0,0,${map.dark+.1})`); ctx.fillStyle=g; ctx.fillRect(0,0,W,H) }
}
/* 맵마다 다른 몬스터 모습 */
function drawEnemy(ctx, e, map, t, px, py){
  const E=map.enemy, boss=e.type==="boss", big=e.type==="big", wob=Math.sin(t*6+e.wob)*1.5, r=e.r;
  const body=e.flash>0?"#ffffff":E.body;
  ctx.fillStyle="rgba(0,0,0,.18)"; ctx.beginPath(); ctx.ellipse(e.x,e.y+r*.85,r*.9,r*.3,0,0,7); ctx.fill();
  if(E.acc==="wing"){ const fl=Math.sin(t*18+e.wob)*r*.5; ctx.fillStyle=E.shade;
    ctx.beginPath(); ctx.moveTo(e.x-r*.6,e.y); ctx.lineTo(e.x-r*1.9,e.y-r*.4-fl); ctx.lineTo(e.x-r*1.4,e.y+r*.3); ctx.lineTo(e.x-r*1.0,e.y+r*.1); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(e.x+r*.6,e.y); ctx.lineTo(e.x+r*1.9,e.y-r*.4-fl); ctx.lineTo(e.x+r*1.4,e.y+r*.3); ctx.lineTo(e.x+r*1.0,e.y+r*.1); ctx.closePath(); ctx.fill() }
  if(E.acc==="wisp"){ ctx.fillStyle=`rgba(180,140,255,.3)`; ctx.beginPath(); ctx.arc(e.x,e.y,r*1.5,0,7); ctx.fill();
    ctx.fillStyle=body; ctx.beginPath(); ctx.moveTo(e.x-r,e.y); ctx.quadraticCurveTo(e.x-r*.2,e.y+r*1.9+wob*2,e.x+r*.2,e.y+r*1.2); ctx.quadraticCurveTo(e.x+r,e.y+r,e.x+r,e.y); ctx.fill() }
  ctx.fillStyle=body; ctx.beginPath(); ctx.ellipse(e.x,e.y,r+wob,r-wob,0,0,7); ctx.fill();
  ctx.fillStyle="rgba(255,255,255,.25)"; ctx.beginPath(); ctx.ellipse(e.x-r*.35,e.y-r*.4,r*.3,r*.18,-.5,0,7); ctx.fill();
  if(E.acc==="leaf"){ ctx.fillStyle="#3f9a2e"; ctx.beginPath(); ctx.ellipse(e.x+r*.25,e.y-r*1.05,r*.45,r*.2,-.6,0,7); ctx.fill(); ctx.fillStyle="#2a6e20"; ctx.fillRect(e.x-1,e.y-r*1.1,2,r*.3) }
  if(E.acc==="cap"){ ctx.fillStyle=e.flash>0?"#fff":"#f4ece0"; ctx.beginPath(); ctx.ellipse(e.x,e.y+r*.25,r*.7,r*.6,0,0,7); ctx.fill();
    ctx.fillStyle=body; ctx.beginPath(); ctx.ellipse(e.x,e.y-r*.25,r*1.15,r*.75,0,Math.PI,0); ctx.fill(); ctx.fillStyle="#ffffff"; [[-.5,-.6],[.2,-.75],[.6,-.4]].forEach(([a,b])=>{ ctx.beginPath(); ctx.arc(e.x+r*a,e.y+r*b,r*.15,0,7); ctx.fill() }) }
  if(E.acc==="horn"){ ctx.fillStyle="#d8c4a8"; ctx.beginPath(); ctx.moveTo(e.x-r*.6,e.y-r*.6); ctx.lineTo(e.x-r*.95,e.y-r*1.5); ctx.lineTo(e.x-r*.25,e.y-r*.85); ctx.fill(); ctx.beginPath(); ctx.moveTo(e.x+r*.6,e.y-r*.6); ctx.lineTo(e.x+r*.95,e.y-r*1.5); ctx.lineTo(e.x+r*.25,e.y-r*.85); ctx.fill();
    ctx.fillStyle="rgba(255,120,40,.35)"; ctx.beginPath(); ctx.arc(e.x,e.y,r*1.3,0,7); ctx.fill() }
  if(e.slow>0){ ctx.strokeStyle="#63b0ff"; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(e.x,e.y,r+wob+2,r-wob+2,0,0,7); ctx.stroke() }
  if(e.stun>0){ ctx.fillStyle="#ffe066"; for(let i=0;i<3;i++){ const a=t*6+i*2.1; ctx.beginPath(); ctx.arc(e.x+Math.cos(a)*r*.8,e.y-r-6+Math.sin(a)*3,3,0,7); ctx.fill() } }
  // 눈
  const dx=px-e.x, dy=py-e.y, d=Math.hypot(dx,dy)||1, ex=dx/d*r*.22, ey=dy/d*r*.22, es=Math.max(2,r*.2);
  const eyeY = E.acc==="cap" ? e.y+r*.2 : e.y-r*.12;
  ctx.fillStyle=(boss||big)?"#ff6a4d":E.eye;
  if(E.acc==="wing"||E.acc==="horn"){ ctx.beginPath(); ctx.moveTo(e.x-r*.55+ex,eyeY-es+ey); ctx.lineTo(e.x-r*.1+ex,eyeY+ey); ctx.lineTo(e.x-r*.55+ex,eyeY+es*.6+ey); ctx.fill(); ctx.beginPath(); ctx.moveTo(e.x+r*.55+ex,eyeY-es+ey); ctx.lineTo(e.x+r*.1+ex,eyeY+ey); ctx.lineTo(e.x+r*.55+ex,eyeY+es*.6+ey); ctx.fill() }
  else { ctx.beginPath(); ctx.arc(e.x-r*.32+ex,eyeY+ey,es,0,7); ctx.arc(e.x+r*.32+ex,eyeY+ey,es,0,7); ctx.fill();
    if(E.eye==="#ffffff"){ ctx.fillStyle="#25211b"; ctx.beginPath(); ctx.arc(e.x-r*.32+ex*1.4,eyeY+ey*1.4,es*.5,0,7); ctx.arc(e.x+r*.32+ex*1.4,eyeY+ey*1.4,es*.5,0,7); ctx.fill() } }
  if(boss){ // 왕관
    ctx.fillStyle="#f6c544"; ctx.beginPath(); ctx.moveTo(e.x-r*.6,e.y-r*.95); ctx.lineTo(e.x-r*.6,e.y-r*1.45); ctx.lineTo(e.x-r*.3,e.y-r*1.15); ctx.lineTo(e.x,e.y-r*1.55); ctx.lineTo(e.x+r*.3,e.y-r*1.15); ctx.lineTo(e.x+r*.6,e.y-r*1.45); ctx.lineTo(e.x+r*.6,e.y-r*.95); ctx.closePath(); ctx.fill();
    ctx.fillStyle="#e9475f"; ctx.beginPath(); ctx.arc(e.x,e.y-r*1.15,r*.1,0,7); ctx.fill();
    const w=r*2; ctx.fillStyle="rgba(0,0,0,.4)"; ctx.fillRect(e.x-w/2,e.y-r*1.85,w,6); ctx.fillStyle="#e9475f"; ctx.fillRect(e.x-w/2,e.y-r*1.85,w*Math.max(0,e.hp/e.max),6) }
}

/* ===== 맵 구조물: 길을 막는 바위·나무·기둥 / 마왕성의 용암 ===== */
const OC = 300, OB_CACHE = {};
/* 밟고 지나갈 수 있는 것(벽이 아님) · 바닥에 깔리는 것 */
const FLAT_OB = {lava:1, tornado:1, iceslick:1, gravwell:1};
const UNDER_OB = {lava:1, iceslick:1, gravwell:1};
const OB_RULE = {
  1:{p:.38, kinds:[["boulder",34,.6],["bigtree",30,.4]]},
  2:{p:.5,  kinds:[["bigtree",30,.65],["log",30,.35]]},
  3:{p:.45, kinds:[["pillar",28,.55],["ruinwall",38,.45]]},
  4:{p:.48, kinds:[["crystal",32,.55],["stalag",28,.45]]},
  5:{p:.5,  kinds:[["brazier",30,.5],["lava",62,.5]]},
  6:{p:.52, kinds:[["windpillar",30,.5],["tornado",50,.5]]},
  7:{p:.66, kinds:[["skypillar",28,.38],["wallseg",44,.42],["cannon",30,.2]]},
  8:{p:.6,  kinds:[["icespire",30,.45],["iceslick",78,.55]]},
  9:{p:.55, kinds:[["drumpillar",30,.45],["lionstatue",30,.25],["thunderrod",22,.3]]},
  10:{p:.55,kinds:[["starrock",34,.55],["gravwell",64,.45]]},
};
/* 회오리는 제자리를 빙글빙글 돌며 움직여요 (모두의 화면에서 같은 위치: 게임 시간으로 계산) */
function tornadoPos(o,t){ const a=t*(.55+o.s*.4)+o.s*20; return [o.x+Math.cos(a)*95, o.y+Math.sin(a)*70] }
/* 밟으면 위험한 곳: 마왕성 용암 · 첨탑 회오리 */
function hazardAt(map,x,y,t){
  if(map.id===5) return inLava(map,x,y)?{kind:"lava"}:null;
  if(map.id===8){ for(const ob of obstaclesNear(map,x,y,0)){ if(ob.kind==="iceslick" && (x-ob.x)**2+((y-ob.y)*1.5)**2<ob.r*ob.r) return {kind:"ice"} } }
  if(map.id===10){ for(const ob of obstaclesNear(map,x,y,200)){ if(ob.kind!=="gravwell") continue; const d=Math.hypot(x-ob.x,y-ob.y); if(d<ob.r*2.6) return {kind:"grav",x:ob.x,y:ob.y,d,core:d<ob.r*.55} } }
  if(map.id===6){ for(const ob of obstaclesNear(map,x,y,120)){ if(ob.kind!=="tornado") continue; const [tx,ty]=tornadoPos(ob,t); const d=Math.hypot(x-tx,y-ty); if(d<ob.r*.85) return {kind:"tornado",x:tx,y:ty,d} } }
  return null }
function obCell(map,cx,cy){
  const key=map.id+":"+cx+":"+cy; if(OB_CACHE[key]) return OB_CACHE[key];
  if(ART_MAP[map.id]&&ART_MAP[map.id].props){ const hz=ART_MAP[map.id].haz?ruleCell(map,cx,cy).filter(o=>FLAT_OB[o.kind]):[]; return OB_CACHE[key]=hz.length?hz:artCell(map,cx,cy) }
  return OB_CACHE[key]=ruleCell(map,cx,cy) }
function ruleCell(map,cx,cy){
  const R=OB_RULE[map.id], out=[];
  const cxw=cx*OC+OC/2, cyw=cy*OC+OC/2;
  if(Math.hypot(cxw,cyw)>260 && mhash(cx,cy,77)<R.p){
    let pick=mhash(cx,cy,78), k=R.kinds[0]; for(const kk of R.kinds){ if(pick<kk[2]){ k=kk; break } pick-=kk[2] }
    out.push({x:cxw+(mhash(cx,cy,79)-.5)*OC*.5, y:cyw+(mhash(cx,cy,80)-.5)*OC*.5, r:k[1], kind:k[0], solid:!FLAT_OB[k[0]], s:mhash(cx,cy,81)});
  }
  return out;
}

/* ===== 그림 바닥 · 그림 장애물 (선생님이 보내 준 그림) =====
   바닥: 이어 붙여도 티 안 나는 타일을 화면 가득 깔아요 (선명하게)
   장애물: 나무 아래 덤불, 큰 바위 옆 작은 바위처럼 무리 지어 자연스럽게 놓아요 */
const ART_MAP = {
  1:{floor:.72, props:{tree:["o1_tree",200,250],rock:["o1_rock",92,125],bush:["o1_bush",52,80]}},
  2:{floor:.72, props:{tree:["o2_tree",215,265],rock:["o2_log",70,90,"log"],bush:["o2_mush",48,70]}},
  3:{floor:.8, props:{tree:["o3_pillar",150,190],rock:["o3_wall",100,130],bush:["o3_plate",40,52,"flat"]}},
  4:{floor:.8, props:{tree:["o4_crystal",110,140],rock:["o4_rock",85,115],bush:["o4_stal",80,110,"solid"]}},
  5:{floor:.75, props:{tree:["o5_pillar",140,175],rock:["o5_brazier",80,100]}, haz:{lava:"o5_pool"}},
  6:{floor:.75, props:{tree:["o6_pillar",150,185],rock:["o6_rock",75,95]}, haz:{tornado:"o6_tornado"}},
  7:{floor:.62, wash:"rgba(40,60,100,.06)", props:{tree:["o7_pillar",150,185],rock:["o7_wall",95,120],bush:["o7_cannon",55,70,"solid"]}},
  8:{floor:.75, props:{tree:["o8_spire",140,175],rock:["o8_rock",80,105]}, haz:{iceslick:"o8_puddle"}},
  9:{floor:.62, wash:"rgba(90,60,20,.06)", props:{tree:["o9_tower",140,170],rock:["o9_wall",100,125],bush:["o9_gate",105,125,"solid"]}},
  10:{floor:1.0, props:{tree:["o10_pillar",135,165],rock:["o10_rock",100,130]}, haz:{gravwell:"o10_hole"}},
};
const FLOOR_IMG={}, PROP_IMG={}; let _mapArtOn=false;
function loadMapArt(){ if(_mapArtOn) return; _mapArtOn=true;
  const F=typeof FLOOR_FILES!=="undefined"?FLOOR_FILES:{}, P=typeof PROP_FILES!=="undefined"?PROP_FILES:{};
  for(const k in F){ const im=new Image(); im.onload=()=>{ FLOOR_IMG[k]=im }; im.src=F[k] }
  for(const k in P){ const im=new Image(); im.onload=()=>{ PROP_IMG[k]=im }; im.src=P[k] } }
const isArtMap = map=>!!ART_MAP[map.id];
/* 바닥은 캔버스에 그리지 않고 캔버스 뒤 배경(CSS)으로 깔아요: 기기의 그래픽 칩이 대신 그려서 렉이 거의 없어요 */
let _BLURL=null;
function blotchURL(){ if(_BLURL) return _BLURL; const N=1024, c=document.createElement("canvas"); c.width=c.height=N; const x=c.getContext("2d");
  for(let i=0;i<9;i++){ const cx=mhash(i,7,401)*N, cy=mhash(i,7,402)*N, r=150+mhash(i,7,403)*190, dark=i%3!==0;
    for(const dx of [-N,0,N]) for(const dy of [-N,0,N]){ const g=x.createRadialGradient(cx+dx,cy+dy,0,cx+dx,cy+dy,r); g.addColorStop(0,dark?"rgba(10,30,5,.24)":"rgba(255,250,200,.12)"); g.addColorStop(1,"rgba(0,0,0,0)"); x.fillStyle=g; x.fillRect(cx+dx-r,cy+dy-r,r*2,r*2) } }
  return _BLURL=c.toDataURL() }
function drawFloorHD(ctx,map,ox,oy,W,H,t){ loadMapArt(); const A=ART_MAP[map.id], F=typeof FLOOR_FILES!=="undefined"&&FLOOR_FILES[map.id], im=FLOOR_IMG[map.id];
  if(!F||!im) return false; const cv=ctx.canvas, T=im.width*A.floor, B=1300;
  const WS=A.wash?`linear-gradient(${A.wash},${A.wash}),`:"";   // 무늬가 많은 바닥은 살짝 흐리게 덮어서 몬스터가 잘 보이게
  if(cv._floor!==map.id){ cv._floor=map.id; cv.style.backgroundImage=`${WS}url(${blotchURL()}),url(${F})`; cv.style.backgroundSize=`${WS?"100% 100%,":""}${B}px ${B}px,${T}px ${T}px`; cv.style.backgroundRepeat=`${WS?"no-repeat,":""}repeat,repeat` }
  const px=Math.round(ox*10)/10, py=Math.round(oy*10)/10, k=px+","+py; if(cv._fpos!==k){ cv._fpos=k; cv.style.backgroundPosition=`${WS?"0 0,":""}${px}px ${py}px,${px}px ${py}px` }
  ctx.save(); ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,cv.width,cv.height); ctx.restore(); return true }
/* 한 칸(300×300)에 무리 하나: 숲(나무+덤불) · 바위 무더기 · 덤불 무리 · 외로운 나무 · 빈 칸 */
function artCell(map,cx,cy){ const out=[], A=ART_MAP[map.id].props, cxw=cx*OC+OC/2, cyw=cy*OC+OC/2;
  if(Math.hypot(cxw,cyw)<320) return out;
  const h=n=>mhash(cx,cy,n), r=h(77), bx=cxw+(h(79)-.5)*OC*.42, by=cyw+(h(80)-.5)*OC*.42, sd=h(81)<.5?1:-1;
  const add=(kind,dx,dy,sc)=>{ const D=A[kind]; if(!D) return; if(D[3]==="solid"&&out.some(q=>q.pt===kind)) return; const n=out.length, hh=(D[1]+(D[2]-D[1])*h(90+n))*(sc||1), x=bx+dx, y=by+dy;
    const o={kind:"art",pk:D[0],pt:kind,ax:x,ay:y,h:hh,flip:h(100+n)<.5,s:h(110+n),solid:false,x,y,r:0};
    if(D[3]==="flat") o.flat=true;
    if(D[3]==="solid"){ o.solid=true; o.y=y-hh*.08; o.r=hh*.16 }
    if(kind==="tree"){ o.solid=true; o.y=y-hh*.05; o.r=hh*.08 }
    else if(kind==="rock"){ o.solid=true; if(D[3]==="log"){ o.y=y-hh*.3; o.r=hh*.55 } else { o.y=y-hh*.24; o.r=hh*.36 } }
    out.push(o) };
  if(r<.17){ add("tree",0,0); add("bush",sd*(58+h(82)*25),8+h(83)*14,.95); if(h(84)<.6) add("bush",-sd*(48+h(85)*20),16+h(86)*10,.7); if(h(87)<.35) add("rock",-sd*80,-30,.55) }
  else if(r<.26){ add("tree",0,0,.9+h(82)*.2); if(h(83)<.5) add("bush",sd*50,14,.65) }
  else if(r<.37){ add("rock",0,0); add("rock",sd*(62+h(82)*20),16+h(83)*10,.55); add("bush",-sd*(58+h(84)*15),20,.85) }
  else if(r<.53){ add("bush",0,0); add("bush",sd*(50+h(82)*15),14,.75); if(h(83)<.6) add("bush",-sd*(40+h(84)*10),-22,.85) }
  else if(r<.64){ add("rock",0,0,.75+h(82)*.2); if(h(83)<.5) add("bush",sd*45,12,.7) }
  return out }
function artPropsVisible(map,camX,camY,W,H){ const out=[], HZ=ART_MAP[map.id].haz, t=performance.now()/1000;
  for(const o of obstaclesNear(map,camX,camY,Math.max(W,H)/2+300)){ if(!HZ||!HZ[o.kind]||!PROP_IMG[HZ[o.kind]]) continue;
    o.hz=HZ[o.kind]; if(o.kind==="tornado"){ o.ax=o.x; o.ay=o.y+o.r; o.h=o.r*2.6 } else { o.flat=true; o.ax=o.x; o.ay=o.y+o.r*.6; o.h=o.r*1.3 }
    if(Math.abs(o.ax-camX)<W/2+o.r*2+200&&Math.abs(o.ay-camY)<H/2+o.r*2+200) out.push(o) }
  for(const o of obstaclesNear(map,camX,camY,Math.max(W,H)/2+300)) if(o.kind==="art"&&Math.abs(o.ax-camX)<W/2+220&&o.ay>camY-H/2-20&&o.ay-o.h<camY+H/2+20) out.push(o); return out }
function drawHazArt(ctx,o,t){ const im=PROP_IMG[o.hz]; if(!im) return;
  if(o.kind==="tornado"){ const [tx,ty]=tornadoPos(o,t), hh=o.r*2.7, w=hh*im.width/im.height;
    ctx.fillStyle="rgba(20,40,70,.28)"; ctx.beginPath(); ctx.ellipse(tx,ty+o.r*.45,w*.42,w*.13,0,0,7); ctx.fill();
    ctx.save(); ctx.translate(tx,ty+o.r*.5); ctx.rotate(Math.sin(t*3+o.s*9)*.08); ctx.scale((Math.sin(t*9)>0?1:-1)*(1+Math.sin(t*5)*.05),1+Math.sin(t*7)*.04);
    ctx.drawImage(propScaled(im,hh,ctx),-w/2,-hh,w,hh); ctx.restore(); return }
  const k=o.kind==="iceslick"?1.5:1.6, w=o.r*2.25, hh=Math.max(w*im.height/im.width,o.r*2/k*1.15);
  ctx.save(); ctx.translate(o.x,o.y); if(o.kind==="lava") ctx.scale(1+Math.sin(t*2+o.s*9)*.015,1); if(o.kind==="gravwell"){ ctx.translate(0,-o.r*.1); ctx.rotate(-t*1.2); ctx.scale(1,1); ctx.drawImage(propScaled(im,o.r*2.3,ctx),-o.r*1.15,-o.r*1.15,o.r*2.3,o.r*2.3); ctx.restore(); return }
  ctx.drawImage(propScaled(im,hh,ctx),-w/2,-hh*.55,w,hh); ctx.restore() }
function drawArtProp(ctx,o,t,canopy){ if(o.hz) return drawHazArt(ctx,o,t); const im=PROP_IMG[o.pk]; if(!im) return; const hh=o.h, w=hh*im.width/im.height;
  ctx.save(); ctx.translate(o.ax,o.ay);
  if(!canopy){ ctx.fillStyle="rgba(10,20,5,.30)"; ctx.beginPath(); ctx.ellipse(0,-hh*.02,w*(o.pt==="tree"?.3:.44),w*(o.pt==="tree"?.09:.12),0,0,7); ctx.fill() }
  if(o.pt==="tree") ctx.rotate(Math.sin(t*1.1+o.s*7)*.012); else if(o.pt==="bush"&&!o.flat) ctx.scale(1+Math.sin(t*1.6+o.s*9)*.012,1);
  if(o.flip) ctx.scale(-1,1);
  if(canopy){ ctx.beginPath(); ctx.rect(-w,-hh-5,w*2,hh*.62); ctx.clip() }
  ctx.drawImage(propScaled(im,hh,ctx),-w/2,-hh,w,hh); ctx.restore() }
function propScaled(im,hh,ctx){ const dp=Math.min(2,ctx.getTransform().d||1), key=Math.max(6,Math.round(hh*dp/6)*6); im._sc=im._sc||{}; if(im._sc[key]) return im._sc[key];
  const c=document.createElement("canvas"); c.height=key; c.width=Math.max(1,Math.round(key*im.width/im.height)); const x=c.getContext("2d"); x.imageSmoothingQuality="high"; x.drawImage(im,0,0,c.width,c.height); return im._sc[key]=c }
function obstaclesNear(map,x,y,rad){
  const out=[], a=Math.floor((x-rad-80)/OC), b=Math.floor((x+rad+80)/OC), c=Math.floor((y-rad-80)/OC), d=Math.floor((y+rad+80)/OC);
  for(let j=c;j<=d;j++) for(let i=a;i<=b;i++) out.push(...obCell(map,i,j));
  return out;
}
function pushOut(map,o,rad){
  for(const ob of obstaclesNear(map,o.x,o.y,rad)){ if(!ob.solid) continue;
    const dx=o.x-ob.x, dy=o.y-ob.y, d=Math.hypot(dx,dy)||.01, m=ob.r+rad;
    if(d<m){ o.x=ob.x+dx/d*m; o.y=ob.y+dy/d*m } }
}
function inLava(map,x,y){ if(map.id!==5) return false; return obstaclesNear(map,x,y,0).some(ob=>ob.kind==="lava" && (x-ob.x)**2+((y-ob.y)*1.6)**2<ob.r*ob.r) }
function drawObstacles(ctx,map,camX,camY,W,H,t,under){
  const list=obstaclesNear(map,camX,camY,Math.max(W,H)/2+120);
  for(const o of list){
    const x=o.x, y=o.y, r=o.r, s=o.s;
    if(under!==!!UNDER_OB[o.kind]) continue;
    if(o.kind==="art") continue;
    if(ART_MAP[map.id]&&ART_MAP[map.id].haz&&ART_MAP[map.id].haz[o.kind]&&PROP_IMG[ART_MAP[map.id].haz[o.kind]]) continue;
    if(o.kind==="iceslick"){ drawIceSlick(ctx,x,y,r,s,t); continue }
    if(o.kind==="gravwell"){ drawGravWell(ctx,x,y,r,s,t); continue }
    if(o.kind==="lava"){ drawLava(ctx,x,y,r,s,t); continue }
    if(o.kind==="tornado"){ const [tx,ty]=tornadoPos(o,t); drawTornado(ctx,tx,ty,r,s,t); continue }
    ctx.fillStyle="rgba(0,0,0,.28)"; ctx.beginPath(); ctx.ellipse(x+4,y+r*.55,r*1.1,r*.42,0,0,7); ctx.fill();
    if(o.kind==="boulder"){ ctx.fillStyle="#8a8498"; ctx.beginPath(); ctx.moveTo(x-r,y+r*.4); ctx.lineTo(x-r*.85,y-r*.4); ctx.lineTo(x-r*.3,y-r*.95); ctx.lineTo(x+r*.5,y-r*.85); ctx.lineTo(x+r,y-r*.1); ctx.lineTo(x+r*.85,y+r*.5); ctx.lineTo(x,y+r*.65); ctx.closePath(); ctx.fill();
      ctx.fillStyle="#b4aec4"; ctx.beginPath(); ctx.moveTo(x-r*.85,y-r*.4); ctx.lineTo(x-r*.3,y-r*.95); ctx.lineTo(x+r*.5,y-r*.85); ctx.lineTo(x+r*.1,y-r*.25); ctx.lineTo(x-r*.5,y-r*.15); ctx.closePath(); ctx.fill();
      ctx.fillStyle="#5aa84a"; ctx.beginPath(); ctx.ellipse(x-r*.2,y-r*.8,r*.45,r*.15,-.2,0,7); ctx.fill();
      ctx.strokeStyle="#4d4760"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x+r*.2,y-r*.2); ctx.lineTo(x+r*.45,y+r*.2); ctx.stroke(); }
    else if(o.kind==="bigtree"){ ctx.fillStyle="#6a4428"; ctx.fillRect(x-9,y-r*.6,18,r*1.1); ctx.fillStyle="#4a2e18"; ctx.fillRect(x+3,y-r*.6,6,r*1.1);
      ctx.fillStyle="#7a5230"; ctx.beginPath(); ctx.moveTo(x-9,y+r*.5); ctx.lineTo(x-18,y+r*.65); ctx.lineTo(x+18,y+r*.65); ctx.lineTo(x+9,y+r*.5); ctx.fill();
      const sw=Math.sin(t*1.2+s*7)*3, c1=map.id===1?"#3f9a4a":"#25704a", c2=map.id===1?"#5cc05a":"#349060", c3=map.id===1?"#8ae07a":"#4fb07a";
      [[0,-r*1.6,r*1.25,c1],[-r*.7,-r*1.15,r*.85,c1],[r*.75,-r*1.2,r*.85,c1],[-r*.15,-r*1.85,r*.9,c2],[-r*.45,-r*2.05,r*.45,c3]].forEach(([ox,oy,rr,c])=>{ ctx.fillStyle=c; ctx.beginPath(); ctx.arc(x+ox+sw,y+oy,rr,0,7); ctx.fill() });
      if(map.id===1){ ctx.fillStyle="#ff8fb1"; for(let i=0;i<5;i++){ ctx.beginPath(); ctx.arc(x+Math.cos(i*1.3+s*5)*r*.9+sw,y-r*1.6+Math.sin(i*1.7)*r*.7,3.5,0,7); ctx.fill() } } }
    else if(o.kind==="log"){ ctx.save(); ctx.translate(x,y); ctx.rotate((s-.5)*.8); ctx.fillStyle="#7a5230"; ctx.fillRect(-r*1.3,-r*.45,r*2.6,r*.9); ctx.fillStyle="#5a3a1e"; ctx.fillRect(-r*1.3,r*.15,r*2.6,r*.3);
      ctx.fillStyle="#c89a5a"; ctx.beginPath(); ctx.ellipse(r*1.3,0,r*.3,r*.45,0,0,7); ctx.fill(); ctx.strokeStyle="#8a5a2b"; ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(r*1.3,0,r*.15,r*.22,0,0,7); ctx.stroke();
      ctx.fillStyle="#4aa63e"; ctx.beginPath(); ctx.ellipse(-r*.4,-r*.45,r*.5,r*.15,0,0,7); ctx.fill(); ctx.fillStyle="#e9475f"; ctx.beginPath(); ctx.arc(r*.3,-r*.5,5,Math.PI,0); ctx.fill(); ctx.restore() }
    else if(o.kind==="pillar"){ const h=r*3.2+s*20; ctx.fillStyle="#c9a98a"; ctx.fillRect(x-r*.7,y-h,r*1.4,h+r*.4); ctx.fillStyle="#a8866a"; ctx.fillRect(x+r*.2,y-h,r*.5,h+r*.4);
      ctx.fillStyle="#e2c8aa"; ctx.fillRect(x-r,y-h-10,r*2,12); ctx.fillRect(x-r,y+r*.2,r*2,10); ctx.strokeStyle="rgba(90,60,40,.35)"; ctx.lineWidth=2; for(let i=1;i<4;i++){ ctx.beginPath(); ctx.moveTo(x-r*.7+i*r*.35,y-h); ctx.lineTo(x-r*.7+i*r*.35,y+r*.2); ctx.stroke() }
      ctx.fillStyle="#6fbf5a"; ctx.fillRect(x-r*.6,y-h*.4,6,10) }
    else if(o.kind==="ruinwall"){ ctx.fillStyle="#b89a80"; ctx.beginPath(); ctx.moveTo(x-r*1.2,y+r*.4); ctx.lineTo(x-r*1.2,y-r*1.2); ctx.lineTo(x-r*.5,y-r*1.6); ctx.lineTo(x-r*.1,y-r*1.1); ctx.lineTo(x+r*.5,y-r*1.4); ctx.lineTo(x+r*1.2,y-r*.6); ctx.lineTo(x+r*1.2,y+r*.4); ctx.closePath(); ctx.fill();
      ctx.strokeStyle="rgba(90,60,40,.4)"; ctx.lineWidth=2; for(let j=0;j<3;j++){ ctx.beginPath(); ctx.moveTo(x-r*1.2,y-r*.8+j*r*.45); ctx.lineTo(x+r*1.2,y-r*.8+j*r*.45); ctx.stroke() }
      ctx.fillStyle="#dcc3a8"; ctx.fillRect(x-r*1.3,y+r*.3,r*2.6,8) }
    else if(o.kind==="crystal"){ const gl=.5+.5*Math.sin(t*2.2+s*8); ctx.fillStyle=`rgba(120,220,255,${.15+.15*gl})`; ctx.beginPath(); ctx.arc(x,y-r*.5,r*1.8,0,7); ctx.fill();
      [[0,-r*2.2,r*.55],[-r*.75,-r*1.4,r*.42],[r*.8,-r*1.6,r*.45],[-r*.3,-r*1.0,r*.35]].forEach(([ox,oy,w])=>{ ctx.fillStyle="#3a8ac0"; ctx.beginPath(); ctx.moveTo(x+ox,y+oy); ctx.lineTo(x+ox+w,y+r*.3); ctx.lineTo(x+ox-w,y+r*.3); ctx.closePath(); ctx.fill();
        ctx.fillStyle="#9ae8ff"; ctx.beginPath(); ctx.moveTo(x+ox,y+oy); ctx.lineTo(x+ox+w*.25,y+r*.3); ctx.lineTo(x+ox-w,y+r*.3); ctx.closePath(); ctx.fill(); ctx.fillStyle=`rgba(255,255,255,${gl})`; ctx.fillRect(x+ox-2,y+oy+8,3,8) }); }
    else if(o.kind==="stalag"){ ctx.fillStyle="#3c3a5c"; ctx.beginPath(); ctx.moveTo(x-r,y+r*.4); ctx.lineTo(x-r*.2,y-r*2.6); ctx.lineTo(x+r*.2,y-r*1.6); ctx.lineTo(x+r*.45,y-r*2.1); ctx.lineTo(x+r,y+r*.4); ctx.closePath(); ctx.fill();
      ctx.fillStyle="#58557e"; ctx.beginPath(); ctx.moveTo(x-r,y+r*.4); ctx.lineTo(x-r*.2,y-r*2.6); ctx.lineTo(x-r*.1,y+r*.4); ctx.closePath(); ctx.fill() }
    else if(o.kind==="windpillar"){ const h=r*3+s*30; const g=ctx.createLinearGradient(x-r*.7,0,x+r*.7,0); g.addColorStop(0,"#5a7a9a"); g.addColorStop(.45,"#9ab8d4"); g.addColorStop(1,"#3a5a7a");
      ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(x-r*.7,y+r*.4); ctx.lineTo(x-r*.7,y-h); ctx.lineTo(x-r*.2,y-h-12); ctx.lineTo(x+r*.1,y-h+4); ctx.lineTo(x+r*.7,y-h-6); ctx.lineTo(x+r*.7,y+r*.4); ctx.closePath(); ctx.fill(); ctx.strokeStyle="rgba(10,20,40,.7)"; ctx.lineWidth=2; ctx.stroke();
      ctx.save(); ctx.globalCompositeOperation="lighter"; const gl=.5+.5*Math.sin(t*2+s*9); ctx.strokeStyle=`rgba(120,230,255,${.4+.4*gl})`; ctx.lineWidth=2; for(let k=0;k<3;k++){ ctx.beginPath(); ctx.arc(x,y-h*.3-k*h*.22,r*.35,0,Math.PI*1.5); ctx.stroke() } ctx.restore();
      const rib=Math.sin(t*6+s*7); ctx.strokeStyle="#e8f6ff"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x+r*.7,y-h*.75); ctx.quadraticCurveTo(x+r*1.6,y-h*.8+rib*10,x+r*2.5,y-h*.7-rib*14); ctx.stroke();
      ctx.fillStyle="#5aa87a"; ctx.fillRect(x-r*.6,y-h*.2,8,6) }
    else if(o.kind==="skypillar"){ const h=r*3.4+s*20; const g=ctx.createLinearGradient(x-r*.7,0,x+r*.7,0); g.addColorStop(0,"#c8cede"); g.addColorStop(.45,"#ffffff"); g.addColorStop(1,"#a8b0c4");
      ctx.fillStyle=g; ctx.fillRect(x-r*.62,y-h,r*1.24,h+r*.4); ctx.strokeStyle="rgba(150,160,190,.6)"; ctx.lineWidth=1.5; for(let i=1;i<4;i++){ ctx.beginPath(); ctx.moveTo(x-r*.62+i*r*.31,y-h); ctx.lineTo(x-r*.62+i*r*.31,y+r*.4); ctx.stroke() }
      ctx.fillStyle="#e8c25a"; ctx.fillRect(x-r*.9,y-h-12,r*1.8,12); ctx.fillRect(x-r*.85,y+r*.3,r*1.7,10); ctx.fillStyle="#fff6d8"; ctx.fillRect(x-r*.9,y-h-12,r*1.8,3);
      ctx.strokeStyle="rgba(40,40,60,.6)"; ctx.lineWidth=2; ctx.strokeRect(x-r*.62,y-h,r*1.24,h+r*.4) }
    else if(o.kind==="wallseg"){ const w=r*2.6, h=r*1.6; ctx.save(); ctx.translate(x,y); if(s>.5) ctx.rotate(Math.PI/2*0);
      const g=ctx.createLinearGradient(0,-h,0,r*.4); g.addColorStop(0,"#ffffff"); g.addColorStop(1,"#c0c8da"); ctx.fillStyle=g; ctx.fillRect(-w/2,-h,w,h+r*.4);
      ctx.fillStyle="#f4f6fb"; for(let k=0;k<5;k++){ ctx.fillRect(-w/2+k*w/4.5,-h-14,w/9,14) }
      ctx.strokeStyle="rgba(140,150,180,.55)"; ctx.lineWidth=1.5; for(let j=0;j<3;j++){ ctx.beginPath(); ctx.moveTo(-w/2,-h+j*h/3+h/6); ctx.lineTo(w/2,-h+j*h/3+h/6); ctx.stroke() }
      ctx.fillStyle="#2a4aa8"; ctx.fillRect(-r*.35,-h+6,r*.7,h*.75); ctx.fillStyle="#e8c25a"; ctx.beginPath(); ctx.moveTo(-r*.35,-h+6+h*.75); ctx.lineTo(0,-h+6+h*.9); ctx.lineTo(r*.35,-h+6+h*.75); ctx.fill(); ctx.beginPath(); ctx.arc(0,-h+h*.35,r*.16,0,7); ctx.fill();
      ctx.strokeStyle="rgba(40,40,60,.65)"; ctx.lineWidth=2; ctx.strokeRect(-w/2,-h,w,h+r*.4); ctx.restore() }
    else if(o.kind==="cannon"){ const aim=Math.sin(t*.8+s*9)*.6-Math.PI/2;
      ctx.fillStyle="#d8dce8"; ctx.beginPath(); ctx.ellipse(x,y+r*.2,r*1.05,r*.55,0,0,7); ctx.fill(); ctx.strokeStyle="rgba(40,40,60,.6)"; ctx.lineWidth=2; ctx.stroke();
      ctx.save(); ctx.translate(x,y-r*.1); ctx.rotate(aim+Math.PI/2); const g=ctx.createLinearGradient(-r*.3,0,r*.3,0); g.addColorStop(0,"#7a5a2a"); g.addColorStop(.5,"#e8c25a"); g.addColorStop(1,"#6a4a1a");
      ctx.fillStyle=g; ctx.fillRect(-r*.28,-r*1.5,r*.56,r*1.5); ctx.fillStyle="#3a2a10"; ctx.beginPath(); ctx.ellipse(0,-r*1.5,r*.28,r*.12,0,0,7); ctx.fill(); ctx.strokeStyle="rgba(40,30,10,.7)"; ctx.lineWidth=1.5; ctx.strokeRect(-r*.28,-r*1.5,r*.56,r*1.5); ctx.restore();
      ctx.fillStyle="#b8bccc"; ctx.beginPath(); ctx.arc(x,y-r*.1,r*.42,0,7); ctx.fill(); ctx.strokeStyle="rgba(40,40,60,.6)"; ctx.stroke() }
    else if(o.kind==="icespire"){ const h=r*3.2+s*30;
      ctx.save(); ctx.globalCompositeOperation="lighter"; const gg=ctx.createRadialGradient(x,y-h*.4,4,x,y-h*.4,r*2.2); gg.addColorStop(0,"rgba(150,230,255,.3)"); gg.addColorStop(1,"rgba(150,230,255,0)"); ctx.fillStyle=gg; ctx.beginPath(); ctx.arc(x,y-h*.4,r*2.2,0,7); ctx.fill(); ctx.restore();
      [[0,1,1],[-.55,.65,.7],[.6,.6,.75]].forEach(([ox,hh,ww])=>{ const bx=x+ox*r, hy=y-h*hh; const g=ctx.createLinearGradient(bx-r*.4*ww,0,bx+r*.4*ww,0); g.addColorStop(0,"#7ab8e0"); g.addColorStop(.45,"#eaf8ff"); g.addColorStop(1,"#5a98c8");
        ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(bx-r*.42*ww,y+r*.3); ctx.lineTo(bx-r*.3*ww,hy+r*.5); ctx.lineTo(bx,hy); ctx.lineTo(bx+r*.3*ww,hy+r*.5); ctx.lineTo(bx+r*.42*ww,y+r*.3); ctx.closePath(); ctx.fill(); ctx.strokeStyle="rgba(40,80,130,.6)"; ctx.lineWidth=1.6; ctx.stroke();
        ctx.strokeStyle="rgba(255,255,255,.8)"; ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(bx,hy+4); ctx.lineTo(bx-r*.08,y); ctx.stroke() });
      ctx.fillStyle="rgba(255,255,255,.9)"; ctx.beginPath(); ctx.ellipse(x,y+r*.35,r*1.1,r*.3,0,0,7); ctx.fill() }
    else if(o.kind==="drumpillar"){ const h=r*3.2+s*20; const g=ctx.createLinearGradient(x-r*.6,0,x+r*.6,0); g.addColorStop(0,"#c8a86a"); g.addColorStop(.45,"#fff4d8"); g.addColorStop(1,"#a8884a");
      ctx.fillStyle=g; ctx.fillRect(x-r*.55,y-h,r*1.1,h+r*.4); ctx.strokeStyle="rgba(120,80,20,.5)"; ctx.lineWidth=1.4; for(let i=1;i<4;i++){ ctx.beginPath(); ctx.moveTo(x-r*.55+i*r*.275,y-h); ctx.lineTo(x-r*.55+i*r*.275,y+r*.4); ctx.stroke() }
      ctx.fillStyle="#d8a63a"; ctx.fillRect(x-r*.8,y-h-10,r*1.6,10); ctx.fillRect(x-r*.75,y+r*.3,r*1.5,9);
      const dy=y-h-r*.7; ctx.fillStyle="#8a3a1a"; ctx.beginPath(); ctx.ellipse(x,dy,r*.75,r*.55,0,0,7); ctx.fill(); ctx.fillStyle="#f2d8a0"; ctx.beginPath(); ctx.ellipse(x,dy,r*.6,r*.42,0,0,7); ctx.fill();
      ctx.fillStyle="#8a3a1a"; for(let k=0;k<3;k++){ const a=k*2.094+t; ctx.beginPath(); ctx.arc(x+Math.cos(a)*r*.18,dy+Math.sin(a)*r*.12,r*.14,a,a+Math.PI); ctx.fill() }
      if(Math.sin(t*3+s*9)>.85){ ctx.strokeStyle="rgba(190,140,255,.9)"; ctx.lineWidth=2; ctx.beginPath(); let lx=x+r*.7, ly=dy; ctx.moveTo(lx,ly); for(let k=0;k<4;k++){ lx+=8; ly+=(k%2?-1:1)*7; ctx.lineTo(lx,ly) } ctx.stroke() } }
    else if(o.kind==="lionstatue"){ ctx.fillStyle="#bdb6a6"; ctx.fillRect(x-r*.9,y-r*.1,r*1.8,r*.6); ctx.fillStyle="#d8a63a"; ctx.fillRect(x-r*.95,y-r*.15,r*1.9,5);
      ctx.fillStyle="#cfc8b8"; ctx.beginPath(); ctx.ellipse(x,y-r*.6,r*.6,r*.55,0,0,7); ctx.fill(); ctx.fillStyle="#d8a63a"; for(let k=0;k<9;k++){ const a=k*.7-1.2; ctx.beginPath(); ctx.arc(x+Math.cos(a)*r*.55,y-r*1.0+Math.sin(a)*r*.45,r*.2,0,7); ctx.fill() }
      ctx.fillStyle="#e8e2d2"; ctx.beginPath(); ctx.ellipse(x,y-r*1.0,r*.38,r*.34,0,0,7); ctx.fill(); ctx.fillStyle="#3ad8ff"; [-1,1].forEach(s2=>{ ctx.fillRect(x+s2*r*.14-2,y-r*1.08,4,3) }); ctx.strokeStyle="rgba(60,50,30,.6)"; ctx.lineWidth=1.5; ctx.strokeRect(x-r*.9,y-r*.1,r*1.8,r*.6) }
    else if(o.kind==="thunderrod"){ const h=r*3.4; ctx.fillStyle="#6a5a3a"; ctx.fillRect(x-3,y-h,6,h+r*.4); ctx.fillStyle="#d8a63a"; ctx.beginPath(); ctx.moveTo(x,y-h-18); ctx.lineTo(x+8,y-h); ctx.lineTo(x-8,y-h); ctx.closePath(); ctx.fill();
      const gl=.5+.5*Math.sin(t*8+s*9); ctx.save(); ctx.globalCompositeOperation="lighter"; const gg=ctx.createRadialGradient(x,y-h-6,0,x,y-h-6,26); gg.addColorStop(0,`rgba(200,160,255,${.7*gl})`); gg.addColorStop(1,"rgba(200,160,255,0)"); ctx.fillStyle=gg; ctx.beginPath(); ctx.arc(x,y-h-6,26,0,7); ctx.fill();
      if(gl>.8){ ctx.strokeStyle="rgba(230,210,255,.95)"; ctx.lineWidth=1.8; ctx.beginPath(); ctx.moveTo(x,y-h-10); ctx.lineTo(x+10,y-h-24); ctx.lineTo(x+4,y-h-28); ctx.lineTo(x+16,y-h-42); ctx.stroke() } ctx.restore() }
    else if(o.kind==="starrock"){ ctx.save(); ctx.translate(x,y-r*.3+Math.sin(t*1.2+s*9)*5);
      ctx.fillStyle="#2a2050"; ctx.beginPath(); for(let k=0;k<9;k++){ const a=k/9*Math.PI*2, rr=r*(.8+mhash(k,(s*1e4)|0,3)*.35); k?ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr*.85):ctx.moveTo(Math.cos(a)*rr,Math.sin(a)*rr*.85) } ctx.closePath(); ctx.fill(); ctx.strokeStyle="rgba(200,160,80,.6)"; ctx.lineWidth=2; ctx.stroke();
      ctx.fillStyle="#3e3070"; ctx.beginPath(); ctx.ellipse(-r*.2,-r*.25,r*.45,r*.3,-.3,0,7); ctx.fill();
      ctx.save(); ctx.globalCompositeOperation="lighter"; for(let k=0;k<4;k++){ const a=k*1.6+s*9; ctx.fillStyle=`rgba(${k%2?"170,120,255":"255,220,140"},.9)`; ctx.beginPath(); ctx.arc(Math.cos(a)*r*.45,Math.sin(a)*r*.35,2.5,0,7); ctx.fill() } ctx.restore(); ctx.restore();
      ctx.fillStyle="rgba(0,0,0,.25)"; ctx.beginPath(); ctx.ellipse(x,y+r*.6,r*.8,r*.2,0,0,7); ctx.fill() }
    else if(o.kind==="brazier"){ const h=r*2.6; ctx.fillStyle="#3a2a2e"; ctx.fillRect(x-r*.6,y-h,r*1.2,h+r*.4); ctx.fillStyle="#2a1c20"; ctx.fillRect(x+r*.15,y-h,r*.45,h+r*.4);
      ctx.fillStyle="#5a4a50"; ctx.fillRect(x-r*.9,y-h-8,r*1.8,10); ctx.fillStyle="#1e1418"; ctx.beginPath(); ctx.moveTo(x-r*.9,y-h-8); ctx.lineTo(x+r*.9,y-h-8); ctx.lineTo(x+r*.6,y-h-22); ctx.lineTo(x-r*.6,y-h-22); ctx.closePath(); ctx.fill();
      drawFlame(ctx,x,y-h-20,r*.6,s,t);
      ctx.strokeStyle="#e9475f"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x-r*.4,y-h*.5); ctx.lineTo(x,y-h*.35); ctx.lineTo(x+r*.4,y-h*.5); ctx.stroke() }
  }
}

/* 회오리: 바닥 먼지 고리 → 겹겹이 도는 깔때기 → 빨려 올라가는 잔해 */
function drawTornado(ctx,x,y,r,s,t){
  ctx.fillStyle="rgba(20,30,50,.25)"; ctx.beginPath(); ctx.ellipse(x,y+r*.25,r*1.1,r*.38,0,0,7); ctx.fill();
  ctx.save(); ctx.globalAlpha=.9;
  const H=r*3.4, N=14;
  for(let i=0;i<N;i++){ const u=i/(N-1), yy=y-u*H, rw=r*(.28+u*1.05), sway=Math.sin(t*2.2+u*3+s*9)*r*.35*u, rot=t*(9-u*3)+u*4;
    const g=ctx.createLinearGradient(x+sway-rw,0,x+sway+rw,0); g.addColorStop(0,`rgba(150,175,205,${.35+u*.15})`); g.addColorStop(.5,`rgba(230,240,250,${.55+u*.1})`); g.addColorStop(1,`rgba(120,145,180,${.35+u*.15})`);
    ctx.fillStyle=g; ctx.beginPath(); ctx.ellipse(x+sway,yy,rw,rw*.28,0,0,7); ctx.fill();
    ctx.strokeStyle=`rgba(255,255,255,${.5-u*.2})`; ctx.lineWidth=1.6; ctx.beginPath(); ctx.ellipse(x+sway,yy,rw*.92,rw*.25,0,rot,rot+2.2); ctx.stroke();
    ctx.strokeStyle=`rgba(60,80,110,${.4})`; ctx.beginPath(); ctx.ellipse(x+sway,yy,rw*.98,rw*.27,0,rot+3,rot+4.4); ctx.stroke() }
  ctx.restore();
  for(let i=0;i<10;i++){ const ph=(t*.7+i/10+s)%1, a=t*7+i*2.3, rw=r*(.35+ph*1.0), yy=y-ph*H; ctx.fillStyle=i%3?"rgba(90,110,90,.9)":"rgba(140,110,80,.9)"; ctx.fillRect(x+Math.cos(a)*rw-2,yy+Math.sin(a)*rw*.25-2,4,4) }
  ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.strokeStyle=`rgba(140,220,255,${.25+.2*Math.sin(t*8+s*5)})`; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(x,y+r*.2,r*.95,r*.32,0,t*5,t*5+3); ctx.stroke(); ctx.restore();
}
/* 빙판: 반짝이는 매끈한 얼음 웅덩이 (위에서는 미끄러워요) */
function drawIceSlick(ctx,x,y,r,s,t){ const ry=r/1.5;
  const g=ctx.createRadialGradient(x-r*.3,y-ry*.3,4,x,y,r); g.addColorStop(0,"rgba(255,255,255,.95)"); g.addColorStop(.5,"rgba(190,230,255,.85)"); g.addColorStop(1,"rgba(120,180,225,.75)");
  ctx.fillStyle=g; ctx.beginPath(); ctx.ellipse(x,y,r,ry,0,0,7); ctx.fill(); ctx.strokeStyle="rgba(80,140,200,.7)"; ctx.lineWidth=2; ctx.stroke();
  ctx.strokeStyle="rgba(255,255,255,.9)"; ctx.lineWidth=2; for(let k=0;k<3;k++){ const ph=(t*.25+k/3+s)%1, xx=x-r*.8+ph*r*1.6; ctx.globalAlpha=Math.sin(ph*Math.PI); ctx.beginPath(); ctx.moveTo(xx-12,y-ry*.3); ctx.lineTo(xx+12,y-ry*.6); ctx.stroke() } ctx.globalAlpha=1;
  ctx.strokeStyle="rgba(90,150,200,.4)"; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(x-r*.5,y+ry*.2); ctx.lineTo(x-r*.1,y-ry*.1); ctx.lineTo(x+r*.3,y+ry*.3); ctx.stroke() }
/* 중력 우물(작은 블랙홀): 빙글빙글 빨려 들어가는 별빛 */
function drawGravWell(ctx,x,y,r,s,t){
  ctx.save(); ctx.globalCompositeOperation="lighter";
  const g=ctx.createRadialGradient(x,y,r*.3,x,y,r*2.6); g.addColorStop(0,"rgba(150,80,255,.35)"); g.addColorStop(1,"rgba(120,60,255,0)"); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r*2.6,0,7); ctx.fill();
  for(let k=0;k<3;k++){ ctx.strokeStyle=`rgba(${k===1?"255,140,220":"180,140,255"},.55)`; ctx.lineWidth=3-k*.6; ctx.beginPath(); ctx.ellipse(x,y,r*(1.3+k*.35),r*(.5+k*.14),0,-t*(2-k*.4)+k,-t*(2-k*.4)+k+3.6); ctx.stroke() }
  for(let i=0;i<10;i++){ const ph=(t*.6+i/10+s)%1, a=i*2.4-t*3, R=r*2.4*(1-ph); ctx.fillStyle=`rgba(255,240,220,${ph})`; ctx.fillRect(x+Math.cos(a)*R-1.5,y+Math.sin(a)*R*.4-1.5,3,3) }
  ctx.restore();
  ctx.fillStyle="#04020c"; ctx.beginPath(); ctx.ellipse(x,y,r*.55,r*.24,0,0,7); ctx.fill(); ctx.strokeStyle="rgba(255,200,120,.9)"; ctx.lineWidth=2.2; ctx.beginPath(); ctx.ellipse(x,y,r*.6,r*.27,0,0,7); ctx.stroke() }
/* 불꽃: 겹겹이 일렁이는 불길 + 불씨 */
function drawFlame(ctx,x,y,w,s,t){
  ctx.save(); ctx.globalCompositeOperation="lighter";
  const gg=ctx.createRadialGradient(x,y-20,2,x,y-20,70); gg.addColorStop(0,"rgba(255,170,70,.55)"); gg.addColorStop(1,"rgba(255,80,20,0)"); ctx.fillStyle=gg; ctx.beginPath(); ctx.arc(x,y-20,70,0,7); ctx.fill(); ctx.restore();
  const L=[["#c8281e",1.25,48],["#ff6a2a",1,42],["#ffb03a",.72,32],["#fff2b0",.4,20]];
  L.forEach(([c,k,hh],li)=>{ const f=Math.sin(t*(11+li*3)+s*7)*4, sw=Math.sin(t*7+li+s*5)*3*k; ctx.fillStyle=c; ctx.beginPath(); ctx.moveTo(x-w*k,y);
    ctx.quadraticCurveTo(x-w*k*.9,y-hh*.5,x-w*k*.25+sw,y-hh*.8-f); ctx.quadraticCurveTo(x+sw*1.5,y-hh-f*1.4,x+sw*2,y-hh*1.15-f); ctx.quadraticCurveTo(x+w*k*.3+sw,y-hh*.6,x+w*k,y); ctx.closePath(); ctx.fill() });
  for(let i=0;i<5;i++){ const ph=(t*1.1+i/5+s)%1; ctx.fillStyle=`rgba(255,${210-ph*120|0},90,${1-ph})`; ctx.fillRect(x+Math.sin(i*2.7+t*2)*w*.8-1.5,y-30-ph*60-1.5,3,3) }
}
/* 용암 웅덩이: 그을린 바위 테두리 → 굳은 껍질 → 흐르는 용암 줄기 → 끓는 거품 → 열기와 불씨 */
function drawLava(ctx,x,y,r,s,t){
  const ry=r/1.6, N=18, pt=(k,i)=>{ const a=i/N*Math.PI*2, j=1+(mhash(i,(s*1e4)|0,k)-.5)*.22; return [x+Math.cos(a)*r*j*(1+k*.0), y+Math.sin(a)*ry*j] };
  const blob=(sc,k)=>{ ctx.beginPath(); for(let i=0;i<=N;i++){ const a=i/N*Math.PI*2, j=1+(mhash(i%N,(s*1e4)|0,k)-.5)*.24; const px=x+Math.cos(a)*r*sc*j, py=y+Math.sin(a)*ry*sc*j; i?ctx.lineTo(px,py):ctx.moveTo(px,py) } ctx.closePath() };
  // 열기 빛
  ctx.save(); ctx.globalCompositeOperation="lighter"; const hg=ctx.createRadialGradient(x,y,r*.4,x,y,r*1.9); hg.addColorStop(0,"rgba(255,90,20,.35)"); hg.addColorStop(1,"rgba(255,40,10,0)"); ctx.fillStyle=hg; ctx.beginPath(); ctx.ellipse(x,y,r*1.9,ry*1.9,0,0,7); ctx.fill(); ctx.restore();
  // 그을린 바위 테두리
  ctx.fillStyle="#1a0a08"; blob(1.32,1); ctx.fill();
  ctx.fillStyle="#3a1a12"; blob(1.18,2); ctx.fill();
  for(let i=0;i<10;i++){ const a=mhash(i,(s*1e4)|0,5)*Math.PI*2, d=1.12+mhash(i,(s*1e4)|0,6)*.12, z=4+mhash(i,(s*1e4)|0,7)*6, px=x+Math.cos(a)*r*d, py=y+Math.sin(a)*ry*d;
    ctx.fillStyle="#5a2a1a"; ctx.fillRect(px-z/2,py-z/2,z,z*.7); ctx.fillStyle="#8a4a2a"; ctx.fillRect(px-z/2,py-z/2,z,2) }
  // 용암 표면
  ctx.save(); blob(1,3); ctx.clip();
  const lg=ctx.createRadialGradient(x,y-ry*.2,2,x,y,r); lg.addColorStop(0,"#ffd060"); lg.addColorStop(.45,"#ff7a1e"); lg.addColorStop(.8,"#d8341a"); lg.addColorStop(1,"#7a1410");
  ctx.fillStyle=lg; ctx.fillRect(x-r*1.2,y-ry*1.2,r*2.4,ry*2.4);
  // 흐르는 밝은 줄기
  ctx.lineCap="round";
  for(let i=0;i<5;i++){ const yy=y-ry*.8+i*ry*.4, ph=t*(.6+i*.13)+s*9+i;
    ctx.strokeStyle=i%2?"rgba(255,240,170,.75)":"rgba(255,200,80,.7)"; ctx.lineWidth=i%2?2.5:4; ctx.beginPath();
    for(let k=0;k<=12;k++){ const xx=x-r+k*r/6, yv=yy+Math.sin(k*.9+ph)*ry*.12; k?ctx.lineTo(xx,yv):ctx.moveTo(xx,yv) } ctx.stroke() }
  // 떠다니는 굳은 껍질 조각
  for(let i=0;i<5;i++){ const a=mhash(i,(s*1e4)|0,9)*Math.PI*2+t*.12*(i%2?1:-1), d=.35+mhash(i,(s*1e4)|0,10)*.45, px=x+Math.cos(a)*r*d, py=y+Math.sin(a)*ry*d, z=r*(.14+mhash(i,(s*1e4)|0,11)*.12);
    ctx.fillStyle="#4a1a10"; ctx.beginPath(); ctx.moveTo(px-z,py); ctx.lineTo(px-z*.4,py-z*.5); ctx.lineTo(px+z*.7,py-z*.4); ctx.lineTo(px+z,py+z*.2); ctx.lineTo(px+z*.1,py+z*.5); ctx.closePath(); ctx.fill();
    ctx.strokeStyle="rgba(255,170,60,.9)"; ctx.lineWidth=1.5; ctx.stroke(); ctx.fillStyle="#6a2a18"; ctx.fillRect(px-z*.4,py-z*.4,z*.6,z*.25) }
  // 끓는 거품: 부풀었다가 톡 터져요
  for(let i=0;i<6;i++){ const ph=(t*.7+mhash(i,(s*1e4)|0,12))%1, cyc=Math.floor(t*.7+mhash(i,(s*1e4)|0,12)), a=mhash(i,cyc,13)*Math.PI*2, d=Math.sqrt(mhash(i,cyc,14))*.75, px=x+Math.cos(a)*r*d, py=y+Math.sin(a)*ry*d;
    if(ph<.8){ const br=2+ph/.8*6; ctx.fillStyle="#ff9a2a"; ctx.beginPath(); ctx.arc(px,py,br,0,7); ctx.fill(); ctx.fillStyle="#fff2b0"; ctx.fillRect(px-br*.5,py-br*.6,2,2); ctx.strokeStyle="#c8321e"; ctx.lineWidth=1; ctx.stroke() }
    else { const p=(ph-.8)/.2; ctx.strokeStyle=`rgba(255,230,140,${1-p})`; ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(px,py,8+p*8,(8+p*8)*.5,0,0,7); ctx.stroke();
      ctx.fillStyle=`rgba(255,220,120,${1-p})`; for(let j=0;j<4;j++) ctx.fillRect(px+(j-1.5)*5*p-1,py-p*14-Math.abs(j-1.5)*-2-1,3,3) } }
  ctx.restore();
  // 가장자리 빛 테
  ctx.strokeStyle="rgba(255,150,50,.85)"; ctx.lineWidth=2.5; blob(1,3); ctx.stroke();
  // 떠오르는 불씨 + 아지랑이
  ctx.save(); ctx.globalCompositeOperation="lighter";
  for(let i=0;i<7;i++){ const ph=(t*.55+mhash(i,(s*1e4)|0,15))%1, px=x+(mhash(i,(s*1e4)|0,16)-.5)*r*1.4+Math.sin(t*2+i)*6, py=y-ph*90; ctx.fillStyle=`rgba(255,${200-ph*110|0},70,${1-ph})`; const z=ph<.5?4:3; ctx.fillRect(px-z/2,py-z/2,z,z) }
  ctx.restore();
}
/* ===== 날씨: 보스가 나타날 때마다 맵 분위기가 한 단계씩 바뀌어요 (0 평소 → 1 → 2 → 3 최종 결전) =====
   [이름, 파티클 종류, 개수, 안개색] · 화면 위에 가볍게 그려요 */
const WEATHER={
  1:[null,["🌸 꽃잎 바람이 불어요","petal",40],["🌇 노을이 지고 꽃잎이 휘날려요","petal",80,"255,140,80,.10"],["🌙 밤이 내려앉았어요","firefly",50,"30,20,80,.22"]],
  2:[null,["🍂 낙엽이 흩날려요","leaf",45],["🌧 비가 내려요","rain",110,"40,60,90,.12"],["⛈ 폭풍우가 몰아쳐요!","rain",200,"20,30,60,.22",1]],
  3:[null,["🏜 모래바람이 불어요","sand",60,"220,170,100,.08"],["🌪 모래 폭풍이 다가와요","sand",140,"200,140,70,.16"],["☠ 저주의 안개가 깔려요!","sand",160,"80,20,90,.24"]],
  4:[null,["💧 천장에서 물이 떨어져요","drip",30],["💎 수정이 붉게 빛나요","dust",60,"120,40,140,.10"],["🌑 깊은 어둠이 몰려와요!","dust",80,"0,0,10,.20",0,1]],
  5:[null,["🔥 불씨가 날려요","ember",50],["🌋 재가 비처럼 내려요","ash",110,"120,30,10,.12"],["👹 마왕의 붉은 하늘!","ember",160,"150,0,20,.20",1]],
  6:[null,["💨 바람이 거세져요","wind",50],["🌧 비바람이 몰아쳐요","rain",130,"40,60,110,.12"],["⛈ 천풍의 폭풍우!","rain",220,"20,20,70,.22",1]],
  7:[null,["✨ 빛 가루가 흩날려요","mote",50],["☁ 구름이 몰려와요","cloud",14,"200,210,230,.10"],["🌆 황혼의 하늘성!","mote",90,"120,40,80,.18"]],
  8:[null,["❄ 눈이 내려요","snow",70],["🌨 눈보라가 불어요","snow",170,"220,235,255,.12"],["🌬 거센 눈보라!","blizzard",260,"235,245,255,.22"]],
  9:[null,["✨ 신성한 빛이 내려와요","mote",60],["⚡ 하늘에서 번개가 쳐요","rain",90,"60,60,110,.12",1],["⛈ 뇌신의 폭풍!","rain",180,"30,20,70,.22",1]],
  10:[null,["🌠 별똥별이 흘러요","star",60],["☄ 유성우가 쏟아져요","meteor",40,"60,20,90,.10"],["🌌 붉은 성운이 덮쳐요!","meteor",70,"140,20,60,.20",0,1]]};
function wr(i,k){ const v=Math.sin(i*127.1+k*311.7)*43758.5453; return v-Math.floor(v) }
function drawWeather(c,map,ph,t,W,H,camX,camY,fade){ const D=(WEATHER[map.id]||[])[Math.min(3,ph)]; if(!D) return; const [,kind,n0,fog,bolt,vig]=D, n=Math.round(n0*Math.min(1,fade*1.5));
  c.save();
  if(fog){ const [r,g,b,a]=fog.split(","); c.fillStyle=`rgba(${r},${g},${b},${(+a)*fade})`; c.fillRect(0,0,W,H) }
  const px=camX*.35, py=camY*.35;
  for(let i=0;i<n;i++){ const s1=wr(i,1), s2=wr(i,2), s3=wr(i,3);
    if(kind==="rain"){ const sp=900+s3*400, x=((s1*W*1.3-t*sp*.25-px)%(W*1.3)+W*1.3)%(W*1.3)-W*.15, y=((s2*H+t*sp-py)%(H+60)+H+60)%(H+60)-30; c.strokeStyle="rgba(200,220,255,.6)"; c.lineWidth=1.6; c.beginPath(); c.moveTo(x,y); c.lineTo(x-6,y+22); c.stroke() }
    else if(kind==="snow"||kind==="blizzard"){ const bz=kind==="blizzard", sp=(bz?160:50)+s3*60, x=((s1*W+(bz?-t*380:Math.sin(t+i)*20)-px)%W+W)%W, y=((s2*H+t*sp-py)%H+H)%H, r=1.4+s3*2.6; if(bz){ c.strokeStyle="rgba(110,140,190,.45)"; c.lineWidth=r+1.6; c.beginPath(); c.moveTo(x,y); c.lineTo(x+14+s3*18,y-4); c.stroke(); c.strokeStyle="rgba(255,255,255,.95)"; c.lineWidth=r; c.stroke() } else { c.fillStyle="rgba(110,140,190,.5)"; c.beginPath(); c.arc(x,y+.6,r+1.1,0,7); c.fill(); c.fillStyle="#fff"; c.beginPath(); c.arc(x,y,r,0,7); c.fill() } }
    else if(kind==="petal"||kind==="leaf"){ const x=((s1*W-t*(40+s3*50)-px)%W+W)%W, y=((s2*H+t*(30+s3*30)-py)%H+H)%H, a=t*2+i; c.save(); c.translate(x,y); c.rotate(a); c.scale(1,.5+.5*Math.sin(t*3+i)); c.fillStyle=kind==="petal"?(i%2?"rgba(255,170,200,.85)":"rgba(255,220,235,.85)"):(i%3?"rgba(200,120,40,.85)":"rgba(230,170,60,.85)"); c.beginPath(); c.ellipse(0,0,5,3,0,0,7); c.fill(); c.restore() }
    else if(kind==="sand"){ const x=((s1*W*1.2+t*(380+s3*260)-px)%(W*1.2)+W*1.2)%(W*1.2)-W*.1, y=((s2*H-py*.5)%H+H)%H+Math.sin(t*3+i)*8; c.strokeStyle=`rgba(230,190,120,${.25+s3*.3})`; c.lineWidth=1.5; c.beginPath(); c.moveTo(x,y); c.lineTo(x-16-s3*20,y); c.stroke() }
    else if(kind==="wind"){ const x=((s1*W*1.4+t*(520+s3*200)-px)%(W*1.4)+W*1.4)%(W*1.4)-W*.2, y=((s2*H-py*.5)%H+H)%H; c.strokeStyle="rgba(230,250,255,.35)"; c.lineWidth=2; c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x-30,y-6,x-70,y+2); c.stroke() }
    else if(kind==="ember"||kind==="ash"){ const up=kind==="ember", x=((s1*W+Math.sin(t*1.5+i)*20-px)%W+W)%W, y=((s2*H+(up?-1:1)*t*(40+s3*60)-py)%H+H)%H; c.fillStyle=up?`rgba(255,${140+s3*100|0},60,${.5+s3*.5})`:`rgba(90,80,80,${.5+s3*.3})`; c.fillRect(x,y,up?2.5:3,up?2.5:3) }
    else if(kind==="firefly"||kind==="mote"||kind==="dust"){ const x=((s1*W+Math.sin(t*.7+i)*30-px*.5)%W+W)%W, y=((s2*H+Math.cos(t*.6+i)*25-(kind==="mote"?t*20:0)-py*.5)%H+H)%H, a=.4+.6*Math.abs(Math.sin(t*2+i)); c.fillStyle=kind==="firefly"?`rgba(220,255,120,${a})`:kind==="mote"?`rgba(255,240,180,${a})`:`rgba(220,200,255,${a*.6})`; c.beginPath(); c.arc(x,y,kind==="dust"?1.5:2.4,0,7); c.fill() }
    else if(kind==="drip"){ const ph=(t*.5+s3)%1, x=s1*W, y=s2*H*.8+ph*80; c.fillStyle=`rgba(170,220,255,${1-ph})`; c.fillRect(x,y,2,6) }
    else if(kind==="cloud"){ const x=((s1*W*1.5+t*30-px*.6)%(W*1.5)+W*1.5)%(W*1.5)-W*.25, y=s2*H; c.fillStyle="rgba(255,255,255,.18)"; c.beginPath(); c.ellipse(x,y,90+s3*60,30+s3*15,0,0,7); c.fill() }
    else if(kind==="star"||kind==="meteor"){ if(kind==="star"||i<n*.5){ const x=((s1*W-px*.2)%W+W)%W, y=((s2*H-py*.2)%H+H)%H, a=.3+.7*Math.abs(Math.sin(t*1.5+i)); c.fillStyle=`rgba(255,255,230,${a})`; c.fillRect(x,y,2,2) }
      else { const ph=(t*.35+s3)%1, x=s1*W*1.2-ph*W*.5, y=s2*H*.6+ph*H*.4; c.strokeStyle=`rgba(255,220,180,${(1-ph)*.9})`; c.lineWidth=2; c.beginPath(); c.moveTo(x,y); c.lineTo(x+40,y-24); c.stroke() } } }
  if(bolt){ const lt=(t*.37)%5; if(lt<.08||(lt>.18&&lt<.24)){ c.fillStyle="rgba(235,235,255,.28)"; c.fillRect(0,0,W,H) } }
  if(vig){ const g=c.createRadialGradient(W/2,H/2,Math.min(W,H)*.25,W/2,H/2,Math.max(W,H)*.7); g.addColorStop(0,"rgba(0,0,0,0)"); g.addColorStop(1,`rgba(0,0,0,${.45*fade})`); c.fillStyle=g; c.fillRect(0,0,W,H) }
  c.restore() }
