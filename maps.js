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
];
const mapById = id=>MAPS.find(m=>m.id===id)||MAPS[0];
/* 같은 칸이면 언제나 같은 장식이 나오도록 하는 해시 */
function mhash(x,y,i){ let n=(x*374761393 + y*668265263 + i*69069)|0; n=Math.imul(n^(n>>>13),1274126177); return ((n^(n>>>16))>>>0)/4294967295 }
function drawMapBG(ctx, map, camX, camY, W, H, t){
  const g=ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,map.sky[0]); g.addColorStop(1,map.sky[1]);
  ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  const CELL=140, x0=Math.floor((camX-W/2)/CELL)-1, x1=Math.floor((camX+W/2)/CELL)+1, y0=Math.floor((camY-H/2)/CELL)-1, y1=Math.floor((camY+H/2)/CELL)+1;
  ctx.save(); ctx.translate(W/2-camX, H/2-camY);
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
      ctx.strokeStyle="rgba(120,70,60,.22)"; ctx.lineWidth=2; ctx.strokeRect(bx+4,by+4,CELL-8,CELL-8);
      if(r1<.3){ ctx.fillStyle="rgba(150,100,90,.18)"; ctx.fillRect(bx+10,by+10,CELL-20,CELL-20) }
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
    } else { // 어둠의 마왕성
      ctx.fillStyle=((cx+cy)&1)?"rgba(70,30,36,.5)":"rgba(50,20,26,.5)"; ctx.fillRect(bx,by,CELL,CELL);
      ctx.strokeStyle="rgba(0,0,0,.45)"; ctx.lineWidth=3; ctx.strokeRect(bx,by,CELL,CELL); ctx.beginPath(); ctx.moveTo(bx,by+CELL/2); ctx.lineTo(bx+CELL,by+CELL/2); ctx.moveTo(bx+CELL/2,by); ctx.lineTo(bx+CELL/2,by+CELL/2); ctx.stroke();
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
const OB_RULE = {
  1:{p:.38, kinds:[["boulder",34,.6],["bigtree",30,.4]]},
  2:{p:.5,  kinds:[["bigtree",30,.65],["log",30,.35]]},
  3:{p:.45, kinds:[["pillar",28,.55],["ruinwall",38,.45]]},
  4:{p:.48, kinds:[["crystal",32,.55],["stalag",28,.45]]},
  5:{p:.5,  kinds:[["brazier",30,.5],["lava",62,.5]]},
};
function obCell(map,cx,cy){
  const key=map.id+":"+cx+":"+cy; if(OB_CACHE[key]) return OB_CACHE[key];
  const R=OB_RULE[map.id], out=[];
  const cxw=cx*OC+OC/2, cyw=cy*OC+OC/2;
  if(Math.hypot(cxw,cyw)>260 && mhash(cx,cy,77)<R.p){
    let pick=mhash(cx,cy,78), k=R.kinds[0]; for(const kk of R.kinds){ if(pick<kk[2]){ k=kk; break } pick-=kk[2] }
    out.push({x:cxw+(mhash(cx,cy,79)-.5)*OC*.5, y:cyw+(mhash(cx,cy,80)-.5)*OC*.5, r:k[1], kind:k[0], solid:k[0]!=="lava", s:mhash(cx,cy,81)});
  }
  return OB_CACHE[key]=out;
}
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
    if(under!==(o.kind==="lava")) continue;
    if(o.kind==="lava"){ drawLava(ctx,x,y,r,s,t); continue }
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
    else if(o.kind==="brazier"){ const h=r*2.6; ctx.fillStyle="#3a2a2e"; ctx.fillRect(x-r*.6,y-h,r*1.2,h+r*.4); ctx.fillStyle="#2a1c20"; ctx.fillRect(x+r*.15,y-h,r*.45,h+r*.4);
      ctx.fillStyle="#5a4a50"; ctx.fillRect(x-r*.9,y-h-8,r*1.8,10); ctx.fillStyle="#1e1418"; ctx.beginPath(); ctx.moveTo(x-r*.9,y-h-8); ctx.lineTo(x+r*.9,y-h-8); ctx.lineTo(x+r*.6,y-h-22); ctx.lineTo(x-r*.6,y-h-22); ctx.closePath(); ctx.fill();
      drawFlame(ctx,x,y-h-20,r*.6,s,t);
      ctx.strokeStyle="#e9475f"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x-r*.4,y-h*.5); ctx.lineTo(x,y-h*.35); ctx.lineTo(x+r*.4,y-h*.5); ctx.stroke() }
  }
}

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
