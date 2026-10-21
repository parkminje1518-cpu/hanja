/* ===== 직업 스킬 이펙트 (빛·그림자·입자 → 화면 전체를 도트로 찍어 보여줘요) ===== */
const TAU = Math.PI*2;
const jr = (s,i)=>mhash(s|0,i,913);
function jGlow(c,x,y,r,rgb,a){ if(a<=0||r<=1) return; const g=c.createRadialGradient(x,y,0,x,y,r);
  g.addColorStop(0,`rgba(${rgb},${a})`); g.addColorStop(.35,`rgba(${rgb},${a*.5})`); g.addColorStop(1,`rgba(${rgb},0)`); c.fillStyle=g; c.beginPath(); c.arc(x,y,r,0,TAU); c.fill() }
function jSeed(f){ if(f.seed===undefined) f.seed=Math.random()*1e5|0; return f.seed }
const BOOM_PAL = {
  fire:{core:"255,250,220", mid:"255,190,70", out:"240,80,30", ring:"255,220,140", deb:["#fff2a8","#ffb03a","#e8502a","#7a2a1a"], smoke:"70,55,55"},
  purple:{core:"255,240,255", mid:"200,140,255", out:"110,40,190", ring:"220,180,255", deb:["#f3e8ff","#c08bff","#7a3ad0","#2e1a4a"], smoke:"40,24,60"},
  green:{core:"240,255,230", mid:"150,240,120", out:"40,150,90", ring:"190,255,190", deb:["#e8ffd8","#8af06a","#3fae6e","#1a4a2a"], smoke:"40,60,40"},
  gold:{core:"255,255,240", mid:"255,224,102", out:"220,150,30", ring:"255,240,170", deb:["#ffffff","#ffe066","#f6a623","#8a5a10"], smoke:"90,75,50"},
};
function palOf(col){ col=(col||"").toLowerCase(); if(col.includes("9a6bff")||col.includes("c08bff")) return BOOM_PAL.purple; if(col.includes("3fcf8e")||col.includes("8af0")) return BOOM_PAL.green; if(col.includes("ffd36a")) return BOOM_PAL.gold; return BOOM_PAL.fire }

/* 공용 폭발: 섬광 → 불덩이 → 충격파 → 파편 → 연기 */
function jfBoom(c,f,k,GL){
  const s=jSeed(f), q=1-k, R=f.r, P=palOf(f.col);
  c.save();
  // 연기 (먼저 깔아요)
  if(q>.25){ const a=(1-q)*.55; for(let i=0;i<7;i++){ const an=jr(s,i)*TAU, d=R*(.25+.55*jr(s,i+20))*(0.6+q*.6);
    c.fillStyle=`rgba(${P.smoke},${a})`; c.beginPath(); c.arc(f.x+Math.cos(an)*d,f.y+Math.sin(an)*d*.7-q*26,R*.32*(0.7+q*.8),0,TAU); c.fill() } }
  c.globalCompositeOperation=GL;
  // 불덩이
  const fr=R*(.45+.75*Math.min(1,q*3))*(q>.6?1-(q-.6)*1.6:1);
  if(fr>2){ const g=c.createRadialGradient(f.x,f.y-q*8,0,f.x,f.y,fr); g.addColorStop(0,`rgba(${P.core},${k})`); g.addColorStop(.3,`rgba(${P.mid},${.9*k})`); g.addColorStop(.75,`rgba(${P.out},${.6*k})`); g.addColorStop(1,`rgba(${P.out},0)`);
    c.fillStyle=g; c.beginPath(); c.arc(f.x,f.y,fr,0,TAU); c.fill() }
  // 충격파 고리
  c.strokeStyle=`rgba(${P.ring},${k*.9})`; c.lineWidth=Math.max(1,7*k); c.beginPath(); c.ellipse(f.x,f.y,R*(.4+q*.95),R*(.4+q*.95)*.8,0,0,TAU); c.stroke();
  c.globalCompositeOperation="source-over";
  // 파편
  for(let i=0;i<12;i++){ const an=jr(s,i+40)*TAU, sp=.6+jr(s,i+60)*.8, d=R*(.15+q*1.1*sp), up=Math.sin(Math.min(1,q*1.3)*Math.PI)*22*sp;
    c.fillStyle=P.deb[Math.min(3,(q*3+jr(s,i)*1.5)|0)]; const z=Math.max(2,5*(1-q*.7)); c.fillRect(f.x+Math.cos(an)*d-z/2,f.y+Math.sin(an)*d*.7-up-z/2,z,z) }
  c.restore();
}
/* 목표 표시: 내 스킬은 금빛 조준 원, 보스 스킬은 붉은 경고 원 */
function jfWarn(c,f,k,t){
  const own=!!f.own, rgb=own?"255,214,90":"235,60,60", q=1-k, r=f.r;
  c.save(); c.translate(f.x,f.y); c.scale(1,.75);
  c.fillStyle=`rgba(${rgb},${.08+.12*q})`; c.beginPath(); c.arc(0,0,r,0,TAU); c.fill();
  c.fillStyle=`rgba(${rgb},${.22})`; c.beginPath(); c.arc(0,0,r*Math.min(1,q),0,TAU); c.fill();
  c.strokeStyle=`rgba(${rgb},.9)`; c.lineWidth=3; c.beginPath(); c.arc(0,0,r,0,TAU); c.stroke();
  c.rotate(t*(own?2:-2.5)); c.lineWidth=2;
  for(let i=0;i<8;i++){ const a=i*TAU/8; c.beginPath(); c.arc(0,0,r*.78,a,a+.4); c.stroke() }
  if(own){ c.rotate(-t*2); c.beginPath(); c.moveTo(-r*.35,0); c.lineTo(-r*.12,0); c.moveTo(r*.12,0); c.lineTo(r*.35,0); c.moveTo(0,-r*.35); c.lineTo(0,-r*.12); c.moveTo(0,r*.12); c.lineTo(0,r*.35); c.stroke() }
  else { c.fillStyle=`rgba(255,240,200,${.6+.4*Math.sin(t*20)})`; c.font="900 22px sans-serif"; c.textAlign="center"; c.textBaseline="middle"; c.fillRect(-2,-12,4,14); c.fillRect(-2,6,4,4) }
  c.restore();
}

/* ========== 전사: 광폭 연속 베기 / 대지 내려찍기 / 영웅의 각성 ========== */
function jfCrescent(c,x,y,R,a0,span,w,stops,alpha){
  c.save(); c.translate(x,y); c.rotate(a0);
  const g=c.createRadialGradient(0,0,R*(1-w),0,0,R); stops.forEach(([o,col])=>g.addColorStop(o,col.replace("A",alpha)));
  c.fillStyle=g; c.beginPath(); c.arc(0,0,R,0,span); const m=span/2; c.arc(Math.cos(m)*R*w*.9,Math.sin(m)*R*w*.9,R*(1-w*.55),span-.05,.05,true); c.closePath(); c.fill(); c.restore();
}
function jfBigSlash(c,f,k,GL){
  const s=jSeed(f), q=1-k, R=f.r*(.85+.25*q), span=Math.PI*1.35;
  c.save(); c.globalCompositeOperation=GL;
  jfCrescent(c,f.x,f.y,R*1.06,f.a-.15,span+.3,.5,[[0,"rgba(255,60,60,0)"],[.55,"rgba(220,40,60,A)"],[1,"rgba(255,120,80,0)"]],.45*k);
  jfCrescent(c,f.x,f.y,R,f.a,span,.38,[[0,"rgba(255,200,80,0)"],[.5,"rgba(255,200,80,A)"],[.85,"rgba(255,250,220,A)"],[1,"rgba(255,255,255,A)"]],k);
  c.strokeStyle=`rgba(255,255,255,${k})`; c.lineWidth=2; c.beginPath(); c.arc(f.x,f.y,R*.995,f.a+.1,f.a+span-.1); c.stroke();
  for(let i=0;i<10;i++){ const a=f.a+span*jr(s,i), d=R*(1+q*.4*jr(s,i+9)); c.fillStyle=i%2?"#fff8c8":"#ffb03a"; c.fillRect(f.x+Math.cos(a)*d-2,f.y+Math.sin(a)*d-2,4,4) }
  c.restore();
}
function jfQuake(c,f,k,GL,t){
  const s=jSeed(f), q=1-k, R=f.r;
  if(!f.cr){ f.cr=[]; for(let i=0;i<9;i++){ let a=jr(s,i)*TAU, x=0, y=0; const p=[[0,0]]; const L=R*(.5+.5*jr(s,i+30)); for(let j=0;j<6;j++){ a+=(jr(s,i*10+j)-.5)*.8; x+=Math.cos(a)*L/6; y+=Math.sin(a)*L/6*.6; p.push([x,y]) } f.cr.push(p) } }
  c.save(); c.translate(f.x,f.y);
  // 갈라진 땅 (빛나는 균열)
  const crk=(w,col)=>{ c.strokeStyle=col; c.lineWidth=w; c.lineJoin="round"; f.cr.forEach(p=>{ c.beginPath(); p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y)); c.stroke() }) };
  crk(7,`rgba(40,25,15,${k*.9})`); c.globalCompositeOperation=GL; crk(3,`rgba(255,170,60,${k})`); crk(1.2,`rgba(255,250,200,${k})`);
  // 충격파 + 흙먼지 고리
  for(let i=0;i<2;i++){ const rr=R*Math.min(1.1,(q*1.6-i*.25)); if(rr<=0) continue; c.strokeStyle=`rgba(255,220,150,${k*(1-i*.4)})`; c.lineWidth=8*k; c.beginPath(); c.ellipse(0,0,rr,rr*.6,0,0,TAU); c.stroke() }
  c.globalCompositeOperation="source-over";
  for(let i=0;i<14;i++){ const a=i*TAU/14+jr(s,i), d=R*Math.min(1,q*1.6); c.fillStyle=`rgba(190,165,130,${k*.55})`; c.beginPath(); c.arc(Math.cos(a)*d,Math.sin(a)*d*.6,10+q*14,0,TAU); c.fill() }
  // 튀어 오르는 바위 조각
  for(let i=0;i<12;i++){ const a=jr(s,i+50)*TAU, sp=.5+jr(s,i+70)*.7, d=R*.9*q*sp, h=Math.sin(Math.min(1,q*1.2)*Math.PI)*(50+60*sp), z=5+jr(s,i+90)*7;
    c.save(); c.translate(Math.cos(a)*d,Math.sin(a)*d*.6-h); c.rotate(q*8*sp); c.fillStyle="#6a5a4a"; c.fillRect(-z/2,-z/2,z,z); c.fillStyle="#a89478"; c.fillRect(-z/2,-z/2,z,z/2.5); c.restore() }
  // 땅에 박히는 대검 (처음 절반)
  if(q<.6){ const drop=Math.min(1,q*5), y0=-150*(1-drop), al=q<.45?1:(.6-q)/.15;
    c.globalAlpha=al; c.globalCompositeOperation=GL; jGlow(c,0,-20,60,"255,210,120",.6); c.globalCompositeOperation="source-over";
    c.fillStyle="#dfe7f2"; c.beginPath(); c.moveTo(-9,y0-90); c.lineTo(9,y0-90); c.lineTo(9,y0-10); c.lineTo(0,y0+6); c.lineTo(-9,y0-10); c.closePath(); c.fill();
    c.fillStyle="#ffffff"; c.fillRect(-2,y0-88,3,76); c.fillStyle="#9aa5bb"; c.fillRect(4,y0-88,5,78);
    c.fillStyle="#f6c544"; c.fillRect(-22,y0-98,44,8); c.fillStyle="#b8871a"; c.fillRect(-22,y0-92,44,2); c.fillStyle="#6a4428"; c.fillRect(-4,y0-124,8,26); c.fillStyle="#f6c544"; c.fillRect(-6,y0-130,12,7); c.fillStyle="#e83c46"; c.fillRect(-3,y0-97,6,5);
    c.globalAlpha=1 }
  c.restore();
}
/* 각성 오라: 금빛 기둥 + 등 뒤를 도는 검 6자루 */
function jfAwakenAura(c,x,y,t,k,GL){
  c.save(); c.globalCompositeOperation=GL;
  const g=c.createLinearGradient(0,y-150,0,y+20); g.addColorStop(0,"rgba(255,230,120,0)"); g.addColorStop(.6,`rgba(255,210,80,${.28*k})`); g.addColorStop(1,`rgba(255,250,200,${.5*k})`);
  c.fillStyle=g; c.beginPath(); c.moveTo(x-34,y+18); c.lineTo(x-20,y-150); c.lineTo(x+20,y-150); c.lineTo(x+34,y+18); c.closePath(); c.fill();
  jGlow(c,x,y+14,70,"255,210,90",.5*k);
  c.restore();
  for(let i=0;i<6;i++){ const a=t*2.2+i*TAU/6, sx=x+Math.cos(a)*46, sy=y-24+Math.sin(a)*16, back=Math.sin(a)<0;
    c.save(); c.globalAlpha=k*(back?.55:.95); c.translate(sx,sy); c.rotate(Math.PI/2+Math.sin(t*3+i)*.1);
    c.fillStyle="#fff4c8"; c.beginPath(); c.moveTo(-3,-20); c.lineTo(3,-20); c.lineTo(3,6); c.lineTo(0,12); c.lineTo(-3,6); c.closePath(); c.fill();
    c.fillStyle="#f6c544"; c.fillRect(-7,-22,14,3); c.fillStyle="#b8871a"; c.fillRect(-2,-29,4,7); c.restore() }
  for(let i=0;i<10;i++){ const ph=(t*.9+i/10)%1, a=i*2.39; c.fillStyle=`rgba(255,236,150,${1-ph})`; c.fillRect(x+Math.cos(a)*30-2,y+16-ph*110-2,4,4) }
}
/* 각성 화면 베기: 하늘에서 거대한 검이 내려오고 화면을 X자로 가르기 */
function jfCombo(c,P,n,t,GL){
  for(let i=0;i<n;i++){ const a=t*3+i*TAU/n, x=P.x+Math.cos(a)*34, y=P.y-6+Math.sin(a)*14;
    c.save(); c.globalCompositeOperation=GL; jGlow(c,x,y,16,"255,200,80",.7); for(let j=1;j<4;j++){ const b=a-j*.18; c.fillStyle=`rgba(255,220,120,${.35-j*.1})`; c.beginPath(); c.arc(P.x+Math.cos(b)*34,P.y-6+Math.sin(b)*14,5-j,0,TAU); c.fill() } c.restore();
    c.fillStyle="#ffe066"; c.beginPath(); c.arc(x,y,5.5,0,TAU); c.fill(); c.fillStyle="#fffbe0"; c.fillRect(x-2.5,y-3,3,3); c.strokeStyle="#9a6a10"; c.lineWidth=1.5; c.beginPath(); c.arc(x,y,5.5,0,TAU); c.stroke() }
}

/* ========== 궁수: 불사조 / 화살비 / 폭풍 연사 ========== */
function jfPhoenix(c,m,t,GL){
  const face=-Math.sin(m.a)>=0?1:-1, flap=Math.sin(t*12);
  c.save(); c.globalCompositeOperation=GL;
  jGlow(c,m.x,m.y,46,"255,140,50",.55);
  for(let i=0;i<10;i++){ const ph=(t*1.6+i/10)%1; c.fillStyle=`rgba(255,${180+70*(1-ph)|0},80,${1-ph})`; const z=4*(1-ph)+1; c.fillRect(m.x-face*(10+ph*50)+Math.sin(i*3+t*5)*6-z/2,m.y+6+ph*14+Math.cos(i*2)*6-z/2,z,z) }
  c.restore();
  c.save(); c.translate(m.x,m.y); c.scale(face,1);
  // 꼬리 깃 3가닥
  for(let i=0;i<3;i++){ const sw=Math.sin(t*6+i)*5; const g=c.createLinearGradient(0,0,-58,10); g.addColorStop(0,"#ffb03a"); g.addColorStop(.6,"#e8502a"); g.addColorStop(1,"rgba(200,30,60,0)");
    c.strokeStyle=g; c.lineWidth=5-i; c.lineCap="round"; c.beginPath(); c.moveTo(-6,4); c.quadraticCurveTo(-30,10+i*6+sw,-58,4+i*10+sw); c.stroke() }
  // 날개 (깃털 5장씩)
  const wing=(back)=>{ c.save(); c.scale(1,back?-1:1); for(let j=0;j<5;j++){ const a=-.6-flap*.55-j*.2, L=30-j*3;
      const g=c.createLinearGradient(0,0,Math.cos(a)*L,Math.sin(a)*L); g.addColorStop(0,"#ffd36a"); g.addColorStop(.5,"#ff8a2a"); g.addColorStop(1,"#d63a2a");
      c.fillStyle=g; c.save(); c.rotate(a); c.beginPath(); c.moveTo(0,-3); c.quadraticCurveTo(L*.6,-7,L,0); c.quadraticCurveTo(L*.6,5,0,3); c.closePath(); c.fill(); c.restore() } c.restore() };
  c.globalAlpha=.75; c.save(); c.translate(-2,-2); c.scale(-.8,.8); wing(false); c.restore(); c.globalAlpha=1;
  // 몸통
  const bg=c.createRadialGradient(2,-2,1,0,0,12); bg.addColorStop(0,"#fff4b0"); bg.addColorStop(.5,"#ffb03a"); bg.addColorStop(1,"#d64a2a");
  c.fillStyle=bg; c.beginPath(); c.ellipse(0,2,12,8,-.2,0,TAU); c.fill();
  c.beginPath(); c.arc(11,-6,6.5,0,TAU); c.fill();
  c.fillStyle="#ffe066"; c.beginPath(); c.moveTo(8,-11); c.quadraticCurveTo(4,-22,-2,-20); c.quadraticCurveTo(4,-16,6,-10); c.fill();
  c.fillStyle="#f6c544"; c.beginPath(); c.moveTo(16,-7); c.lineTo(23,-4); c.lineTo(16,-3); c.closePath(); c.fill();
  c.fillStyle="#2a1418"; c.fillRect(12,-8,2,2);
  wing(false);
  c.restore();
}
function jfRain(c,z,t,GL){
  const k=Math.min(1,z.t/.4, (z.max-z.t)/.25+.2), s=(z.x*7+z.y*3)|0;
  c.save(); c.translate(z.x,z.y);
  c.save(); c.scale(1,.6); c.globalCompositeOperation=GL;
  const g=c.createRadialGradient(0,0,z.r*.2,0,0,z.r); g.addColorStop(0,`rgba(80,230,160,${.05*k})`); g.addColorStop(.85,`rgba(80,230,160,${.18*k})`); g.addColorStop(1,"rgba(80,230,160,0)"); c.fillStyle=g; c.beginPath(); c.arc(0,0,z.r,0,TAU); c.fill();
  c.strokeStyle=`rgba(150,255,200,${.7*k})`; c.lineWidth=2.5; c.beginPath(); c.arc(0,0,z.r,0,TAU); c.stroke(); c.lineWidth=1.5; c.beginPath(); c.arc(0,0,z.r*.82,0,TAU); c.stroke();
  c.rotate(t*.8); for(let i=0;i<16;i++){ const a=i*TAU/16; c.fillStyle=`rgba(200,255,220,${.8*k})`; c.save(); c.rotate(a); c.fillRect(z.r*.86,-2,6,4); c.restore() }
  c.restore();
  // 쏟아지는 빛 화살
  c.globalCompositeOperation=GL;
  for(let i=0;i<22;i++){ const sp=2.6+jr(s,i)*1.2, ph=(t*sp+jr(s,i+30))%1, cyc=Math.floor(t*sp+jr(s,i+30));
    const a=jr(s+cyc,i)*TAU, d=Math.sqrt(jr(s+cyc,i+50))*z.r*.9, gx=Math.cos(a)*d, gy=Math.sin(a)*d*.6;
    if(ph<.85){ const p=ph/.85, hy=gy-160*(1-p), hx=gx+40*(1-p);
      const lg=c.createLinearGradient(hx+22,hy-56,hx,hy); lg.addColorStop(0,"rgba(120,255,190,0)"); lg.addColorStop(1,`rgba(220,255,235,${k})`);
      c.strokeStyle=lg; c.lineWidth=3; c.beginPath(); c.moveTo(hx+22,hy-56); c.lineTo(hx,hy); c.stroke();
      c.fillStyle=`rgba(255,255,255,${k})`; c.fillRect(hx-2,hy-2,4,4) }
    else { const p=(ph-.85)/.15; c.strokeStyle=`rgba(180,255,210,${(1-p)*k})`; c.lineWidth=2; c.beginPath(); c.ellipse(gx,gy,4+p*14,(4+p*14)*.45,0,0,TAU); c.stroke();
      c.fillStyle=`rgba(255,255,255,${(1-p)*k})`; for(let j=0;j<3;j++) c.fillRect(gx+(j-1)*6*p-1,gy-p*12-1,3,3) } }
  c.restore();
}
function jfArrow(c,sh,a,GL){
  c.save(); c.translate(sh.x,sh.y); c.rotate(a);
  if(sh.glow){ c.save(); c.globalCompositeOperation=GL; const g=c.createLinearGradient(-70,0,14,0); g.addColorStop(0,"rgba(90,240,170,0)"); g.addColorStop(.8,"rgba(150,255,210,.75)"); g.addColorStop(1,"rgba(255,255,255,.95)");
    c.fillStyle=g; c.beginPath(); c.moveTo(-70,0); c.lineTo(4,-5); c.lineTo(16,0); c.lineTo(4,5); c.closePath(); c.fill(); jGlow(c,10,0,14,"200,255,230",.6); c.restore() }
  else { const g=c.createLinearGradient(-40,0,0,0); g.addColorStop(0,"rgba(255,255,255,0)"); g.addColorStop(1,"rgba(255,255,255,.45)"); c.strokeStyle=g; c.lineWidth=2; c.beginPath(); c.moveTo(-40,0); c.lineTo(-14,0); c.stroke() }
  c.fillStyle="#8a5a30"; c.fillRect(-16,-1.5,26,3); c.fillStyle="#c08a50"; c.fillRect(-16,-1.5,26,1);
  c.fillStyle="#e8eef8"; c.beginPath(); c.moveTo(16,0); c.lineTo(7,-5); c.lineTo(9,0); c.lineTo(7,5); c.closePath(); c.fill(); c.fillStyle="#9aa5bb"; c.beginPath(); c.moveTo(16,0); c.lineTo(9,0); c.lineTo(7,5); c.closePath(); c.fill();
  c.fillStyle="#3fcf8e"; c.beginPath(); c.moveTo(-12,-1); c.lineTo(-19,-6); c.lineTo(-17,-1); c.closePath(); c.fill(); c.beginPath(); c.moveTo(-12,1); c.lineTo(-19,6); c.lineTo(-17,1); c.closePath(); c.fill();
  c.restore();
}

/* ========== 도적: 그림자 분신 / 암살 표식 / 어둠의 표창 소용돌이 ========== */
let _shadowImg=null, _shadowSrc="";
function shadowOf(img){ if(_shadowSrc===img.src && _shadowImg) return _shadowImg;
  const w=img.naturalWidth, h=img.naturalHeight, cv=document.createElement("canvas"); cv.width=w+4; cv.height=h+4; const c=cv.getContext("2d"); c.imageSmoothingEnabled=false;
  const tint=(col)=>{ const t=document.createElement("canvas"); t.width=w; t.height=h; const x=t.getContext("2d"); x.drawImage(img,0,0); x.globalCompositeOperation="source-atop"; x.fillStyle=col; x.fillRect(0,0,w,h); return t };
  const rim=tint("#b06bff"), body=tint("#1a1030");
  [[-1,0],[1,0],[0,-1],[0,1]].forEach(([dx,dy])=>c.drawImage(rim,2+dx,2+dy)); c.drawImage(body,2,2);
  c.globalAlpha=.35; c.drawImage(img,2,2); _shadowImg=cv; _shadowSrc=img.src; return cv }
function jfClone(c,m,img,t){
  if(!(img.complete&&img.naturalWidth)) return; const sh=shadowOf(img);
  c.save(); c.imageSmoothingEnabled=false;
  for(let i=0;i<5;i++){ const ph=(t*1.2+i/5)%1; c.fillStyle=`rgba(80,40,140,${.4*(1-ph)})`; c.beginPath(); c.arc(m.x+Math.sin(i*2+t*2)*12,m.y+18-ph*40,6+ph*6,0,TAU); c.fill() }
  c.globalAlpha=.85; c.drawImage(sh,Math.round(m.x-32-2*64/sh.width),Math.round(m.y-40),64*sh.width/(sh.width-4),64*sh.height/(sh.height-4)); c.restore();
}
function jfMark(c,e,t,GL){
  const r=e.r+12, p=Math.max(0,e.mark/1.2);
  c.save(); c.translate(e.x,e.y); c.globalCompositeOperation=GL;
  jGlow(c,0,0,r*1.4,"200,40,90",.35);
  c.strokeStyle="rgba(255,70,110,.95)"; c.lineWidth=2.5; c.beginPath(); c.arc(0,0,r,0,TAU); c.stroke();
  c.strokeStyle="rgba(255,200,220,.9)"; c.lineWidth=3; c.beginPath(); c.arc(0,0,r+5,-Math.PI/2,-Math.PI/2+TAU*p); c.stroke();
  c.rotate(t*3); c.strokeStyle="rgba(190,110,255,.95)"; c.lineWidth=2; c.beginPath(); for(let i=0;i<=6;i++){ const a=i*TAU*2/6*1.0+(i%2?0:0), b=i*Math.PI*4/3; c.lineTo(Math.cos(b)*r*.72,Math.sin(b)*r*.72) } c.stroke();
  c.rotate(-t*6); c.beginPath(); for(let i=0;i<=3;i++){ const b=i*TAU/3+Math.PI; c.lineTo(Math.cos(b)*r*.72,Math.sin(b)*r*.72) } c.stroke();
  c.fillStyle="#ffe0ea"; for(let i=0;i<4;i++){ const b=i*TAU/4; c.fillRect(Math.cos(b)*r-2,Math.sin(b)*r-2,4,4) }
  c.restore();
}
function jfStarShape(c,R,col,dark){
  c.fillStyle=col; c.beginPath(); for(let i=0;i<8;i++){ const r=i%2?R*.32:R, b=i*Math.PI/4; c.lineTo(Math.cos(b)*r,Math.sin(b)*r) } c.closePath(); c.fill();
  c.fillStyle=dark; c.beginPath(); for(let i=0;i<4;i++){ const b=i*Math.PI/2; c.moveTo(0,0); c.lineTo(Math.cos(b)*R,Math.sin(b)*R); c.lineTo(Math.cos(b+.6)*R*.32,Math.sin(b+.6)*R*.32) } c.fill();
  c.fillStyle="#1a1428"; c.beginPath(); c.arc(0,0,R*.2,0,TAU); c.fill(); c.fillStyle="rgba(255,255,255,.9)"; c.fillRect(-R*.5,-R*.5,2,2);
}
function jfStar(c,sh,t,GL){
  const dk=!!sh.dark;
  c.save(); c.globalCompositeOperation=GL;
  for(let j=1;j<=4;j++){ c.fillStyle=dk?`rgba(150,80,255,${.3-j*.06})`:`rgba(220,230,255,${.25-j*.05})`; c.beginPath(); c.arc(sh.x-sh.vx*.014*j,sh.y-sh.vy*.014*j,9-j*1.4,0,TAU); c.fill() }
  if(dk) jGlow(c,sh.x,sh.y,20,"170,90,255",.5);
  c.restore();
  c.save(); c.translate(sh.x,sh.y); c.rotate(t*22); jfStarShape(c,12,dk?"#c8a6ff":"#e4e9f4",dk?"#5a2aa0":"#8a93a8"); c.restore();
}

/* ========== 마법사: 독 안개 / 메테오 / 독불꽃 ========== */
function jfMist(c,z,t,GL){
  const k=Math.min(1,z.t/.5,(z.max-z.t)/.4+.15), s=(z.x*5+z.y*11)|0;
  c.save(); c.translate(z.x,z.y);
  c.save(); c.scale(1,.6); c.strokeStyle=`rgba(190,140,255,${.55*k})`; c.lineWidth=2; c.rotate(-t*.6); for(let i=0;i<6;i++){ c.beginPath(); c.arc(0,0,z.r*.95,i*TAU/6,i*TAU/6+.7); c.stroke() } c.restore();
  for(let i=0;i<9;i++){ const a=jr(s,i)*TAU+t*(.3+jr(s,i+9)*.4)*(i%2?1:-1), d=z.r*(.15+.5*jr(s,i+20)), x=Math.cos(a)*d, y=Math.sin(a)*d*.6, rr=z.r*(.35+.2*jr(s,i+30))*(1+.08*Math.sin(t*2+i));
    const g=c.createRadialGradient(x,y,0,x,y,rr); const col=i%3===0?"120,220,110":"150,80,220"; g.addColorStop(0,`rgba(${col},${.42*k})`); g.addColorStop(1,`rgba(${col},0)`); c.fillStyle=g; c.beginPath(); c.arc(x,y,rr,0,TAU); c.fill() }
  c.globalCompositeOperation=GL;
  for(let i=0;i<12;i++){ const ph=(t*.8+jr(s,i+50))%1, x=(jr(s,i+60)-.5)*z.r*1.4, y=(jr(s,i+70)-.5)*z.r*.8-ph*40, rr=2+jr(s,i)*3;
    c.strokeStyle=`rgba(200,255,170,${(1-ph)*.8*k})`; c.lineWidth=1.5; c.beginPath(); c.arc(x,y,rr+ph*2,0,TAU); c.stroke(); c.fillStyle=`rgba(255,255,255,${(1-ph)*.7*k})`; c.fillRect(x-rr*.5,y-rr*.5,1.5,1.5) }
  c.restore();
}
function jfMeteor(c,f,k,GL,t){
  if(f.life>f.max) return; const q=1-f.life/f.max, s=jSeed(f), sx=f.x-300*(1-q), sy=f.y-460*(1-q), R=22+6*q;
  c.save(); c.globalCompositeOperation=GL;
  const tg=c.createLinearGradient(sx-150,sy-230,sx,sy); tg.addColorStop(0,"rgba(255,90,30,0)"); tg.addColorStop(.6,"rgba(255,150,40,.55)"); tg.addColorStop(1,"rgba(255,250,200,.95)");
  c.fillStyle=tg; c.beginPath(); c.moveTo(sx-150,sy-230); c.lineTo(sx+R*.85,sy-R*.5); c.lineTo(sx-R*.85,sy+R*.5); c.closePath(); c.fill();
  jGlow(c,sx,sy,R*3,"255,140,50",.7);
  for(let i=0;i<10;i++){ const p=(jr(s,i)+t*3)%1; c.fillStyle=`rgba(255,${200-p*120|0},80,${1-p})`; c.fillRect(sx-p*120*.55+(jr(s,i+9)-.5)*30-2,sy-p*190*.55+(jr(s,i+19)-.5)*30-2,4,4) }
  c.globalCompositeOperation="source-over";
  c.save(); c.translate(sx,sy); c.rotate(t*4);
  const rg=c.createRadialGradient(-R*.3,-R*.3,2,0,0,R); rg.addColorStop(0,"#8a5a3a"); rg.addColorStop(.7,"#4a2a1e"); rg.addColorStop(1,"#2a1410");
  c.fillStyle=rg; c.beginPath(); for(let i=0;i<9;i++){ const b=i*TAU/9, rr=R*(.85+.15*jr(s,i+80)); c.lineTo(Math.cos(b)*rr,Math.sin(b)*rr) } c.closePath(); c.fill();
  c.strokeStyle="#ffb03a"; c.lineWidth=2.5; c.beginPath(); c.moveTo(-R*.5,-R*.1); c.lineTo(-R*.1,R*.15); c.lineTo(R*.3,-R*.2); c.moveTo(-R*.1,R*.15); c.lineTo(0,R*.55); c.stroke();
  c.strokeStyle="#fff2a8"; c.lineWidth=1; c.stroke(); c.restore();
  c.restore();
}
function jfBurn(c,e,t){
  for(let i=0;i<2;i++){ const x=e.x+(i?e.r*.4:-e.r*.35)+Math.sin(t*12+e.wob+i)*2, y=e.y-e.r*.6, h=8+Math.sin(t*16+i*3)*3;
    c.fillStyle="rgba(170,90,255,.85)"; c.beginPath(); c.moveTo(x-4,y); c.quadraticCurveTo(x-1,y-h*.6,x,y-h); c.quadraticCurveTo(x+2,y-h*.5,x+4,y); c.closePath(); c.fill();
    c.fillStyle="rgba(230,200,255,.9)"; c.fillRect(x-1,y-4,2,3) }
}
function jfFireShot(c,sh,t,GL){
  c.save(); c.globalCompositeOperation=GL;
  for(let j=6;j>=1;j--){ const x=sh.x-sh.vx*.011*j, y=sh.y-sh.vy*.011*j, r=(11-j*1.2)*(1+Math.sin(t*30+j)*.1); c.fillStyle=`rgba(255,${200-j*22},${60-j*6},${.5-j*.06})`; c.beginPath(); c.arc(x+Math.sin(t*25+j)*1.5,y,r,0,TAU); c.fill() }
  jGlow(c,sh.x,sh.y,26,"255,150,50",.65);
  c.fillStyle="#ffe066"; c.beginPath(); c.arc(sh.x,sh.y,8,0,TAU); c.fill(); c.fillStyle="#fffbe8"; c.beginPath(); c.arc(sh.x,sh.y,4,0,TAU); c.fill();
  c.restore();
}

/* ========== 해적: 문어 포탑 / 선원 / 전함 포격 ========== */
function jfOcto(c,m,t,GL){
  const age=m.max-m.t, k=Math.min(1,m.t/.4), drop=age<.3?(1-age/.3):0, y0=-drop*160;
  c.save(); c.translate(m.x,m.y); c.globalAlpha=k;
  if(age<.55 && age>.25){ const p=(age-.25)/.3; c.strokeStyle=`rgba(200,240,255,${1-p})`; c.lineWidth=3; c.beginPath(); c.ellipse(0,14,20+p*50,(20+p*50)*.4,0,0,TAU); c.stroke() }
  c.fillStyle="rgba(0,0,0,.25)"; c.beginPath(); c.ellipse(0,16,24,7,0,0,TAU); c.fill();
  c.translate(0,y0);
  // 다리 6개
  for(let i=0;i<6;i++){ const side=i<3?-1:1, j=i%3, bx=side*(5+j*5), w=Math.sin(t*5+i*1.3)*4;
    c.strokeStyle=j===1?"#b03a90":"#c94aa6"; c.lineWidth=6-j; c.lineCap="round"; c.beginPath(); c.moveTo(bx,2); c.quadraticCurveTo(bx+side*(10+j*4),12+w,bx+side*(16+j*6),8-w); c.stroke();
    c.fillStyle="#ffc8ea"; c.fillRect(bx+side*(9+j*3)-1,9+w*.5,2,2) }
  // 몸통
  const bg=c.createRadialGradient(-5,-14,2,0,-6,20); bg.addColorStop(0,"#ff9ad8"); bg.addColorStop(.6,"#d45ab0"); bg.addColorStop(1,"#8a2a78");
  c.fillStyle=bg; c.beginPath(); c.ellipse(0,-6,17,15,0,0,TAU); c.fill();
  c.fillStyle="rgba(255,220,240,.7)"; c.beginPath(); c.arc(-7,-14,2.5,0,TAU); c.arc(6,-16,1.8,0,TAU); c.arc(9,-8,1.5,0,TAU); c.fill();
  c.fillStyle="#ffffff"; c.beginPath(); c.ellipse(-6,-4,4.5,5,0,0,TAU); c.ellipse(6,-4,4.5,5,0,0,TAU); c.fill();
  const lx=Math.cos(m.aim||0)*1.5, ly=Math.sin(m.aim||0)*1.5; c.fillStyle="#1a1428"; c.fillRect(-7+lx,-5+ly,3,4); c.fillRect(5+lx,-5+ly,3,4); c.fillStyle="#fff"; c.fillRect(-6+lx,-5+ly,1,1); c.fillRect(6+lx,-5+ly,1,1);
  // 선장 모자
  c.fillStyle="#1e1a2e"; c.beginPath(); c.moveTo(-18,-18); c.quadraticCurveTo(0,-26,18,-18); c.lineTo(12,-30); c.quadraticCurveTo(0,-36,-12,-30); c.closePath(); c.fill();
  c.fillStyle="#f6c544"; c.fillRect(-16,-20,32,2); c.fillRect(-2,-30,4,4);
  // 머리 위 황동 대포 (목표를 향해 돌아가요)
  const rec=Math.max(0,m.fl||0)/.12;
  c.save(); c.translate(0,-36); c.rotate(m.aim||0); c.translate(-rec*5,0);
  const cg=c.createLinearGradient(0,-6,0,6); cg.addColorStop(0,"#ffe9a0"); cg.addColorStop(.5,"#d4a03a"); cg.addColorStop(1,"#7a5418");
  c.fillStyle=cg; c.fillRect(-6,-5,26,10); c.fillStyle="#5a3a10"; c.fillRect(18,-6,5,12); c.fillStyle="#2a1a08"; c.fillRect(22,-3,2,6);
  if(rec>0){ c.globalCompositeOperation=GL; jGlow(c,30,0,20,"255,220,120",rec); c.fillStyle=`rgba(255,250,220,${rec})`; c.beginPath(); c.moveTo(23,-4); c.lineTo(40,0); c.lineTo(23,4); c.closePath(); c.fill() }
  c.restore();
  c.fillStyle="#3a2a40"; c.beginPath(); c.arc(0,-34,6,0,TAU); c.fill();
  c.restore();
}
function jfInk(c,sh,GL){
  c.save(); c.globalCompositeOperation=GL;
  for(let j=1;j<=5;j++){ c.fillStyle=`rgba(220,90,200,${.35-j*.06})`; c.beginPath(); c.arc(sh.x-sh.vx*.012*j,sh.y-sh.vy*.012*j,7-j,0,TAU); c.fill() }
  jGlow(c,sh.x,sh.y,16,"255,120,220",.6); c.restore();
  c.fillStyle="#3a1a40"; c.beginPath(); c.arc(sh.x,sh.y,6,0,TAU); c.fill(); c.fillStyle="#ff9ad8"; c.fillRect(sh.x-3,sh.y-3,3,3);
}
function jfBullet(c,sh,GL){
  c.save(); c.globalCompositeOperation=GL; const g=c.createLinearGradient(sh.x-sh.vx*.035,sh.y-sh.vy*.035,sh.x,sh.y); g.addColorStop(0,"rgba(255,200,80,0)"); g.addColorStop(1,"rgba(255,240,170,.95)");
  c.strokeStyle=g; c.lineWidth=4; c.lineCap="round"; c.beginPath(); c.moveTo(sh.x-sh.vx*.035,sh.y-sh.vy*.035); c.lineTo(sh.x,sh.y); c.stroke(); jGlow(c,sh.x,sh.y,10,"255,220,120",.7); c.restore();
  c.fillStyle="#fff4c8"; c.beginPath(); c.arc(sh.x,sh.y,3.5,0,TAU); c.fill();
}
function jfCrew(c,m,t,GL){
  c.save(); c.translate(m.x,m.y+Math.abs(Math.sin(t*8+m.side))*-2);
  c.fillStyle="rgba(0,0,0,.22)"; c.beginPath(); c.ellipse(0,15,9,3,0,0,TAU); c.fill();
  c.fillStyle="#2a2238"; c.fillRect(-5,10,4,5); c.fillRect(1,10,4,5);
  for(let i=0;i<4;i++){ c.fillStyle=i%2?"#f4f0e6":"#2a5aa8"; c.fillRect(-7,i*3-2,14,3) }
  c.fillStyle="#ffd9bf"; c.beginPath(); c.arc(0,-8,7.5,0,TAU); c.fill();
  c.fillStyle="#c8282e"; c.beginPath(); c.arc(0,-10,8,Math.PI,0); c.fill(); c.fillRect(-8,-11,16,3); c.beginPath(); c.moveTo(7,-11); c.lineTo(13,-8); c.lineTo(9,-6); c.fill();
  c.fillStyle="#25211b"; c.fillRect(-4,-8,2,3); c.fillRect(2,-8,2,3);
  const aim=m.aim!==undefined?m.aim:(m.side>0?0:Math.PI); c.save(); c.translate(0,2); c.rotate(aim); c.fillStyle="#7a5230"; c.fillRect(0,-1,8,5); c.fillStyle="#5a6075"; c.fillRect(6,-2,14,3); c.fillStyle="#9aa3b8"; c.fillRect(6,-2,14,1);
  if(m.fl>0){ c.globalCompositeOperation=GL; jGlow(c,22,0,12,"255,220,120",m.fl/.08) } c.restore();
  c.restore();
}
function jfShell(c,f,k,GL,t){ // 전함에서 목표로 포물선을 그리며 날아가는 대포알
  const q=1-k, at=u=>[f.x0+(f.x-f.x0)*u, f.y0+(f.y-f.y0)*u-Math.sin(u*Math.PI)*70];
  const [sx,sy]=at(q), [tx,ty]=at(Math.max(0,q-.25));
  c.save(); c.globalCompositeOperation=GL;
  const g=c.createLinearGradient(tx,ty,sx,sy); g.addColorStop(0,"rgba(255,150,60,0)"); g.addColorStop(1,"rgba(255,235,170,.95)"); c.strokeStyle=g; c.lineWidth=7; c.lineCap="round"; c.beginPath(); c.moveTo(tx,ty); c.quadraticCurveTo((tx+sx)/2,(ty+sy)/2-10,sx,sy); c.stroke();
  jGlow(c,sx,sy,24,"255,170,70",.7); c.restore();
  c.fillStyle="#1a1418"; c.beginPath(); c.arc(sx,sy,9,0,TAU); c.fill(); c.fillStyle="#6a6478"; c.fillRect(sx-5,sy-5,4,4); c.fillStyle="#ffb03a"; c.fillRect(sx+3,sy-8,3,3);
}
/* 전함 돌격: 차원문이 열리고 → 강철 앵무조개 전함이 화면을 대각선으로 가르며 돌진 → 지나간 길에 폭격 */

/* ================= 4차 스킬 시네마틱 ================= */
const ease=u=>1-Math.pow(1-Math.max(0,Math.min(1,u)),3);
/* 스킬 컷인: 직업 색 띠가 화면을 가로질러요 (글자는 선명한 층에서 따로) */
function cutinX(f,W){ const q=1-f.life/f.max; return q<.2?(1-ease(q/.2))*W*1.1:q>.78?-ease((q-.78)/.22)*W*1.1:-(q-.2)*40 }
function jfCutin(c,f,k,W,H,img,t,GL){
  const q=1-k, al=Math.min(1,q/.12,(1-q)/.15), y=H*.3, h=Math.min(120,Math.max(84,H*.17)), x=cutinX(f,W);
  c.fillStyle=`rgba(5,5,15,${.38*al})`; c.fillRect(0,0,W,H);
  c.save(); c.translate(x,0);
  const band=()=>{ c.beginPath(); c.moveTo(-40,y-h/2+26); c.lineTo(W+40,y-h/2-26); c.lineTo(W+40,y+h/2-26); c.lineTo(-40,y+h/2+26); c.closePath() };
  const g=c.createLinearGradient(0,0,W,0); g.addColorStop(0,f.c1); g.addColorStop(.55,f.c2); g.addColorStop(1,f.c1);
  c.globalAlpha=.92*al; c.fillStyle=g; band(); c.fill();
  c.save(); band(); c.clip(); c.globalCompositeOperation=GL;
  for(let i=0;i<24;i++){ const yy=y-h/2+jr(i,1)*h-((jr(i,1)*h)-h/2)*.0, L=80+jr(i,2)*240, xx=((jr(i,3)*W*1.6-t*1400*(1+jr(i,4)))%(W*1.6)+W*1.6)%(W*1.6)-W*.3;
    c.fillStyle=`rgba(255,255,255,${.12+jr(i,5)*.25})`; c.fillRect(xx,yy-26*(xx/W*2-1),L,2+jr(i,6)*2) }
  const sh=c.createLinearGradient(0,y-h/2,0,y+h/2); sh.addColorStop(0,"rgba(255,255,255,.35)"); sh.addColorStop(.3,"rgba(255,255,255,0)"); c.fillStyle=sh; c.fillRect(-40,y-h,W+80,h*2);
  c.restore();
  c.strokeStyle=`rgba(255,255,255,${.95*al})`; c.lineWidth=4; c.beginPath(); c.moveTo(-40,y-h/2+26); c.lineTo(W+40,y-h/2-26); c.moveTo(-40,y+h/2+26); c.lineTo(W+40,y+h/2-26); c.stroke();
  c.strokeStyle=f.c3; c.lineWidth=2; c.beginPath(); c.moveTo(-40,y-h/2+34); c.lineTo(W+40,y-h/2-18); c.moveTo(-40,y+h/2+18); c.lineTo(W+40,y+h/2-34); c.stroke();
  if(img&&img.complete&&img.naturalWidth){ c.imageSmoothingEnabled=false; const s=h*1.7; c.globalAlpha=al; c.drawImage(img,W*.08,y-s*.72,s,s) }
  c.restore(); c.globalAlpha=1;
}
function jfCutinText(c,f,W,H){
  const q=1-f.life/f.max, al=Math.min(1,q/.12,(1-q)/.15), y=H*.3, x=cutinX(f,W)+W*.6;
  c.save(); c.globalAlpha=al; c.textAlign="center"; c.textBaseline="middle";
  c.font='15px "Do Hyeon",sans-serif'; c.fillStyle="rgba(255,255,255,.9)"; c.fillText(f.sub,x,y-30);
  c.font=`${Math.round(Math.min(46,W/14))}px "Black Han Sans","Do Hyeon",sans-serif`; c.lineWidth=7; c.strokeStyle="#140c20"; c.strokeText(f.text,x,y+6); c.fillStyle="#ffffff"; c.fillText(f.text,x,y+6);
  c.globalCompositeOperation="source-atop"; const g=c.createLinearGradient(0,y-16,0,y+26); g.addColorStop(0,"rgba(255,255,255,0)"); g.addColorStop(1,f.c3); c.fillStyle=g; c.fillRect(x-W/2,y-20,W,50);
  c.restore();
}

/* ---------- 전사 4차: 영웅의 각성 (하늘에서 성검이 꽂히고 화면을 다섯 번 가름) ---------- */
function drawHolySword(c,x,tip,len,al,t,GL){
  const w=len*.075;
  c.save(); c.globalAlpha=al; c.translate(x,tip);
  c.globalCompositeOperation=GL; jGlow(c,0,-len*.45,len*.55,"255,214,110",.5); c.globalCompositeOperation="source-over";
  const bg=c.createLinearGradient(-w,0,w,0); bg.addColorStop(0,"#b8871a"); bg.addColorStop(.2,"#fff2c0"); bg.addColorStop(.5,"#ffffff"); bg.addColorStop(.8,"#fff2c0"); bg.addColorStop(1,"#b8871a");
  c.fillStyle=bg; c.beginPath(); c.moveTo(0,0); c.lineTo(w,-len*.12); c.lineTo(w,-len*.8); c.lineTo(-w,-len*.8); c.lineTo(-w,-len*.12); c.closePath(); c.fill();
  c.fillStyle="rgba(255,220,120,.9)"; c.fillRect(-w*.18,-len*.78,w*.36,len*.6);
  c.strokeStyle="#8a5a10"; c.lineWidth=2; c.stroke();
  // 날개 모양 손잡이 가드
  c.translate(0,-len*.8); const gw=len*.28;
  c.fillStyle="#f6c544"; c.beginPath(); c.moveTo(0,-6); c.quadraticCurveTo(gw*.6,-30,gw,-46); c.quadraticCurveTo(gw*.7,-14,gw*.35,4); c.lineTo(0,10); c.lineTo(-gw*.35,4); c.quadraticCurveTo(-gw*.7,-14,-gw,-46); c.quadraticCurveTo(-gw*.6,-30,0,-6); c.fill();
  c.fillStyle="#fff4b0"; c.beginPath(); c.moveTo(0,-6); c.quadraticCurveTo(gw*.5,-26,gw*.85,-40); c.quadraticCurveTo(gw*.5,-16,0,0); c.fill(); c.beginPath(); c.moveTo(0,-6); c.quadraticCurveTo(-gw*.5,-26,-gw*.85,-40); c.quadraticCurveTo(-gw*.5,-16,0,0); c.fill();
  c.fillStyle="#3aa0ff"; c.beginPath(); c.arc(0,-2,w*.55,0,TAU); c.fill(); c.fillStyle="#e8f6ff"; c.fillRect(-w*.25,-w*.4,w*.25,w*.25);
  c.fillStyle="#6a4428"; c.fillRect(-w*.35,-len*.16-6,w*.7,len*.16); c.fillStyle="#f6c544"; for(let i=1;i<4;i++) c.fillRect(-w*.4,-6-i*len*.04,w*.8,3);
  c.fillStyle="#f6c544"; c.beginPath(); c.arc(0,-len*.16-12,w*.6,0,TAU); c.fill(); c.fillStyle="#e83c46"; c.beginPath(); c.arc(0,-len*.16-12,w*.3,0,TAU); c.fill();
  c.restore();
}
function jfWorldSlash(c,f,k,W,H,GL,t){
  const tau=(1-k)*f.max, cx=W/2, cy=H/2+8, len=Math.min(H*.62,460);
  c.save();
  const dark=Math.min(1,tau/.2)*(tau>1.15?Math.max(0,1-(tau-1.15)/.25):1); c.fillStyle=`rgba(10,6,0,${.45*dark})`; c.fillRect(0,0,W,H);
  // 빛 기둥
  if(tau<1.2){ c.globalCompositeOperation=GL; const pg=c.createLinearGradient(cx-60,0,cx+60,0); pg.addColorStop(0,"rgba(255,220,120,0)"); pg.addColorStop(.5,`rgba(255,240,180,${.45*dark})`); pg.addColorStop(1,"rgba(255,220,120,0)"); c.fillStyle=pg; c.fillRect(cx-60,0,120,cy); c.globalCompositeOperation="source-over" }
  // 성검 낙하
  if(tau<1.25){ const d=ease(tau/.45), tip=-len*.2+(cy+len*.2)*d, al=tau>1?1-(tau-1)/.25:1;
    if(tau<.45){ c.globalCompositeOperation=GL; for(let i=0;i<7;i++){ const xx=cx+(i-3)*len*.03; c.fillStyle=`rgba(255,236,170,${.35})`; c.fillRect(xx-1,tip-len*1.4,2,len*.6) } c.globalCompositeOperation="source-over" }
    drawHolySword(c,cx,tip,len,al,t,GL) }
  // 꽂히는 순간 충격파
  if(tau>.45&&tau<1.2){ const p=(tau-.45)/.75; c.globalCompositeOperation=GL;
    for(let i=0;i<3;i++){ const r=Math.max(W,H)*(.08+p*(.9-i*.2)); c.strokeStyle=`rgba(255,230,150,${(1-p)*(1-i*.25)})`; c.lineWidth=14*(1-p)+2; c.beginPath(); c.ellipse(cx,cy,r,r*.45,0,0,TAU); c.stroke() }
    jGlow(c,cx,cy,220*(1-p*.5),"255,240,190",(1-p)*.9);
    for(let i=0;i<12;i++){ const a=i*TAU/12+.13, L=Math.max(W,H)*.6*ease(p*2); c.strokeStyle=`rgba(255,210,100,${1-p})`; c.lineWidth=3; c.beginPath(); c.moveTo(cx,cy); c.lineTo(cx+Math.cos(a)*L,cy+Math.sin(a)*L*.5); c.stroke() }
    c.globalCompositeOperation="source-over" }
  // 화면을 가르는 다섯 번의 초승달 베기
  c.globalCompositeOperation=GL; const R=Math.hypot(W,H)*.42;
  for(let i=0;i<5;i++){ const st=.55+i*.11, p=(tau-st)/.32; if(p<0||p>1) continue; const a=-.9+i*1.3, al=1-p;
    jfCrescent(c,cx+Math.cos(a+2)*R*.25,cy+Math.sin(a+2)*R*.18,R*(.85+p*.25),a,Math.PI*1.1,.3,[[0,"rgba(255,180,60,0)"],[.55,"rgba(255,200,80,A)"],[.9,"rgba(255,250,220,A)"],[1,"rgba(255,255,255,A)"]],al) }
  c.restore();
}

/* ---------- 궁수 4차: 폭풍 연사 (빛의 거대한 활 + 바람 고리) ---------- */
function jfHurricane(c,P,t,k,GL,aim){
  const a=aim||0;
  c.save(); c.translate(P.x,P.y-10); c.globalCompositeOperation=GL;
  jGlow(c,0,0,90,"90,240,170",.4*k);
  c.save(); c.scale(1,.5); for(let i=0;i<3;i++){ c.rotate(t*(6+i*3)*(i%2?-1:1)); c.strokeStyle=`rgba(${i?"150,255,210":"240,255,250"},${.6*k})`; c.lineWidth=3-i*.7; c.beginPath(); c.arc(0,0,36+i*14,0,1.8); c.stroke(); c.beginPath(); c.arc(0,0,36+i*14,Math.PI,Math.PI+1.5); c.stroke() } c.restore();
  c.rotate(a);
  // 앞으로 날아가는 바람 고리
  for(let i=0;i<5;i++){ const ph=(t*2.6+i/5)%1, d=50+ph*320, r=22+ph*44; c.save(); c.globalCompositeOperation="source-over"; c.strokeStyle=`rgba(20,110,80,${(1-ph)*.5*k})`; c.lineWidth=5*(1-ph)+1; c.beginPath(); c.ellipse(d,0,r*.28,r,0,0,TAU); c.stroke(); c.restore(); c.strokeStyle=`rgba(190,255,225,${(1-ph)*.75*k})`; c.lineWidth=3*(1-ph)+1; c.beginPath(); c.ellipse(d,0,r*.28,r,0,0,TAU); c.stroke() }
  // 빛의 활
  const R=84, vib=Math.sin(t*60)*2;
  c.save(); c.translate(-26,0);
  c.save(); c.globalCompositeOperation="source-over"; c.lineCap="round";
  c.strokeStyle=`rgba(12,70,48,${.85*k})`; c.lineWidth=10; c.beginPath(); c.arc(-R*.55,0,R,-1.05,1.05); c.stroke();
  const cg=c.createLinearGradient(0,-R,0,R); cg.addColorStop(0,"#f2d27a"); cg.addColorStop(.3,"#3fe0a0"); cg.addColorStop(.5,"#e8fff4"); cg.addColorStop(.7,"#3fe0a0"); cg.addColorStop(1,"#f2d27a");
  c.globalAlpha=k; c.strokeStyle=cg; c.lineWidth=6; c.beginPath(); c.arc(-R*.55,0,R,-1.05,1.05); c.stroke();
  c.fillStyle="#f6c544"; [[-1.05],[1.05]].forEach(([b])=>{ const x=-R*.55+Math.cos(b)*R, y=Math.sin(b)*R; c.beginPath(); c.moveTo(x,y); c.lineTo(x-10,y+(b>0?14:-14)); c.lineTo(x+4,y+(b>0?6:-6)); c.closePath(); c.fill() });
  c.restore();
  c.strokeStyle=`rgba(120,255,190,${.5*k})`; c.lineWidth=14; c.beginPath(); c.arc(-R*.55,0,R,-1.05,1.05); c.stroke();
  const bg=c.createLinearGradient(0,-R,0,R); bg.addColorStop(0,"rgba(255,255,255,0)"); bg.addColorStop(.5,`rgba(235,255,245,${k})`); bg.addColorStop(1,"rgba(255,255,255,0)");
  c.strokeStyle=bg; c.lineWidth=4; c.beginPath(); c.arc(-R*.55,0,R,-1.05,1.05); c.stroke();
  const tx=-R*.55+Math.cos(1.05)*R, ty=Math.sin(1.05)*R;
  c.strokeStyle=`rgba(230,255,240,${.9*k})`; c.lineWidth=1.5; c.beginPath(); c.moveTo(tx,-ty); c.lineTo(-R*.32+vib,0); c.lineTo(tx,ty); c.stroke();
  c.fillStyle=`rgba(255,255,255,${k})`; for(let i=0;i<6;i++){ const b=-1+i*.4; c.fillRect(-R*.55+Math.cos(b)*R-2,Math.sin(b)*R-2,4,4) }
  c.restore();
  c.save(); c.globalCompositeOperation="source-over"; c.globalAlpha=k; c.fillStyle="#0c4a32"; c.fillRect(-60,-3,104,6); c.fillStyle="#e8fff4"; c.fillRect(-58,-1.5,100,3); c.fillStyle="#ffffff"; c.beginPath(); c.moveTo(56,0); c.lineTo(40,-8); c.lineTo(40,8); c.closePath(); c.fill(); c.restore();
  jGlow(c,50,0,26,"180,255,220",.8*k);
  // 활 뒤 마법진
  c.save(); c.translate(-50,0); c.scale(.32,1); c.rotate(t*3); c.strokeStyle=`rgba(150,255,210,${.7*k})`; c.lineWidth=3; c.beginPath(); c.arc(0,0,48,0,TAU); c.stroke(); c.beginPath(); for(let i=0;i<=5;i++){ const b=i*TAU*2/5; c.lineTo(Math.cos(b)*48,Math.sin(b)*48) } c.stroke(); c.restore();
  c.restore();
}

/* ---------- 도적 4차: 어둠의 표창 소용돌이 (거대한 그림자 표창) ---------- */
function jfFlare(c,m,t,GL){
  const k=Math.min(1,(m.max-m.t)/.35,m.t/.4), bob=Math.sin(t*2.5)*5, spin=t*9, R=48;
  c.save(); c.translate(m.x,m.y);
  // 땅의 어둠 소용돌이
  c.save(); c.scale(1,.42); c.globalAlpha=k;
  const dg=c.createRadialGradient(0,60,4,0,60,150); dg.addColorStop(0,"rgba(20,0,40,.85)"); dg.addColorStop(.6,"rgba(80,20,150,.4)"); dg.addColorStop(1,"rgba(60,10,120,0)"); c.fillStyle=dg; c.beginPath(); c.arc(0,60,150,0,TAU); c.fill();
  c.globalCompositeOperation=GL; c.translate(0,60); c.rotate(-t*2.5); for(let i=0;i<6;i++){ c.rotate(TAU/6); c.strokeStyle="rgba(190,120,255,.6)"; c.lineWidth=3; c.beginPath(); c.arc(40,0,70,Math.PI*.8,Math.PI*1.3); c.stroke() }
  c.restore();
  for(let i=0;i<10;i++){ const ph=(t*1.2+i/10)%1, a=i*2.4-t; c.fillStyle=`rgba(200,140,255,${(1-ph)*k})`; c.fillRect(Math.cos(a)*(110*(1-ph))-2,22+Math.sin(a)*(40*(1-ph))-ph*70-2,4,4) }
  c.translate(0,-46+bob); c.globalAlpha=k;
  // 번개 실선
  c.globalCompositeOperation=GL; jGlow(c,0,0,R*2.4,"150,70,255",.6);
  c.strokeStyle="rgba(230,200,255,.85)"; c.lineWidth=1.5; for(let i=0;i<3;i++){ const a0=jr(Math.floor(t*12),i)*TAU; c.beginPath(); let x=Math.cos(a0)*R*.6, y=Math.sin(a0)*R*.6; c.moveTo(x,y); for(let j=0;j<4;j++){ x+=Math.cos(a0)*R*.3+(jr(Math.floor(t*12),i*9+j)-.5)*20; y+=Math.sin(a0)*R*.3+(jr(Math.floor(t*12),i*7+j)-.5)*20; c.lineTo(x,y) } c.stroke() }
  c.globalCompositeOperation="source-over";
  // 거대한 4날 표창
  c.save(); c.rotate(spin);
  for(let i=0;i<4;i++){ c.save(); c.rotate(i*TAU/4);
    const bgd=c.createLinearGradient(0,-8,0,8); bgd.addColorStop(0,"#d8c8ff"); bgd.addColorStop(.5,"#5a2aa0"); bgd.addColorStop(1,"#1a0a30");
    c.fillStyle=bgd; c.beginPath(); c.moveTo(6,-10); c.quadraticCurveTo(R*.6,-14,R,-2); c.quadraticCurveTo(R*.7,6,R*.3,14); c.lineTo(6,10); c.closePath(); c.fill();
    c.fillStyle="rgba(255,255,255,.85)"; c.beginPath(); c.moveTo(10,-9); c.quadraticCurveTo(R*.6,-13,R,-2); c.quadraticCurveTo(R*.6,-8,10,-5); c.closePath(); c.fill();
    c.restore() }
  c.fillStyle="#120820"; c.beginPath(); c.arc(0,0,15,0,TAU); c.fill(); c.strokeStyle="#c08bff"; c.lineWidth=3; c.stroke();
  c.restore();
  const eye=.6+.4*Math.sin(t*7); c.fillStyle=`rgba(255,80,150,${eye})`; c.beginPath(); c.ellipse(0,0,7,4,0,0,TAU); c.fill(); c.fillStyle="#fff"; c.fillRect(-1.5,-1.5,3,3);
  // 도는 작은 표창
  for(let i=0;i<5;i++){ const a=m.a*1.4+i*TAU/5, x=Math.cos(a)*(R+26), y=Math.sin(a)*(R+26)*.45; c.save(); c.translate(x,y); c.rotate(t*24); jfStarShape(c,8,"#e4d8ff","#6a3ab8"); c.restore() }
  c.restore();
}

/* ---------- 마법사 4차: 메테오 샤워 (하늘의 붉은 마법진) ---------- */
function jfSkyCircle(c,f,k,W,H,t,GL){
  const tau=(1-k)*f.max, al=Math.min(1,tau/.35,f.life/.5), cx=W/2, cy=Math.max(70,H*.14), R=Math.min(W*.42,330);
  c.save();
  const sky=c.createLinearGradient(0,0,0,H); sky.addColorStop(0,`rgba(140,20,10,${.45*al})`); sky.addColorStop(.6,`rgba(80,10,10,${.18*al})`); sky.addColorStop(1,"rgba(0,0,0,0)"); c.fillStyle=sky; c.fillRect(0,0,W,H);
  c.translate(cx,cy); c.scale(1,.32); c.globalCompositeOperation=GL; c.globalAlpha=al;
  jGlow(c,0,0,R*1.25,"255,90,30",.55);
  c.rotate(t*.6); c.strokeStyle="rgba(255,190,90,.95)"; c.lineWidth=5; c.beginPath(); c.arc(0,0,R,0,TAU); c.stroke(); c.lineWidth=2.5; c.beginPath(); c.arc(0,0,R*.9,0,TAU); c.stroke(); c.beginPath(); c.arc(0,0,R*.55,0,TAU); c.stroke();
  c.beginPath(); for(let i=0;i<=7;i++){ const b=i*TAU*3/7; c.lineTo(Math.cos(b)*R*.9,Math.sin(b)*R*.9) } c.stroke();
  for(let i=0;i<24;i++){ const b=i*TAU/24; c.save(); c.rotate(b); c.fillStyle="rgba(255,230,160,.95)"; c.fillRect(R*.92,-4,R*.05,8); if(i%3===0) c.fillRect(R*.6,-6,12,12); c.restore() }
  c.rotate(-t*1.6); c.strokeStyle="rgba(255,120,60,.9)"; c.lineWidth=3; for(let i=0;i<6;i++){ c.beginPath(); c.arc(0,0,R*.38,i*TAU/6,i*TAU/6+.6); c.stroke() }
  jGlow(c,0,0,R*.4,"255,240,180",.8);
  c.restore();
}
function jfScorch(c,f,k,GL){
  c.save(); c.translate(f.x,f.y); c.scale(1,.6);
  c.fillStyle=`rgba(30,10,5,${.45*k})`; c.beginPath(); c.arc(0,0,f.r*.8,0,TAU); c.fill();
  c.globalCompositeOperation=GL; const g=c.createRadialGradient(0,0,0,0,0,f.r*.7); g.addColorStop(0,`rgba(255,200,90,${.7*k})`); g.addColorStop(.5,`rgba(255,90,30,${.4*k})`); g.addColorStop(1,"rgba(200,40,20,0)"); c.fillStyle=g; c.beginPath(); c.arc(0,0,f.r*.7,0,TAU); c.fill();
  c.restore();
}

/* ---------- 해적 4차: 강철 군함 (더 매끈한 유선형) ---------- */
const SHIP_T0=.45, SHIP_DUR=1.7;
function shipPath(dir,W,H){ const sx=dir>0?-520:W+520, ex=dir>0?W+520:-520; return {sx,sy:H*.18,ex,ey:H*.72} }
function shipPos(f,tau,W,H){ const P=shipPath(f.dir,W,H), u=(tau-SHIP_T0)/SHIP_DUR; return {u,x:P.sx+(P.ex-P.sx)*u,y:P.sy+(P.ey-P.sy)*u,a:Math.atan2(P.ey-P.sy,P.ex-P.sx)} }
function drawNautShip(c,t,GL,fire){
  const hull=()=>{ c.beginPath(); c.moveTo(-240,-6); c.bezierCurveTo(-200,-40,-60,-58,60,-52); c.bezierCurveTo(110,-48,140,-40,150,-30); c.lineTo(150,40); c.bezierCurveTo(110,52,40,58,-60,52); c.bezierCurveTo(-170,46,-215,30,-240,10); c.closePath() };
  // 엔진 플라스마
  c.save(); c.globalCompositeOperation=GL;
  [[-2,1],[-22,.8],[20,.8]].forEach(([y,s],i)=>{ const L=(120+Math.sin(t*45+i)*18)*s; const g=c.createLinearGradient(-236,0,-236-L,0); g.addColorStop(0,"rgba(255,255,255,1)"); g.addColorStop(.18,"rgba(150,240,255,.95)"); g.addColorStop(.6,"rgba(60,140,255,.5)"); g.addColorStop(1,"rgba(40,80,255,0)");
    c.fillStyle=g; c.beginPath(); c.moveTo(-232,y-11*s); c.quadraticCurveTo(-236-L*.5,y-5*s,-236-L,y); c.quadraticCurveTo(-236-L*.5,y+5*s,-232,y+11*s); c.closePath(); c.fill() });
  jGlow(c,-240,0,80,"120,220,255",.75);
  for(let i=0;i<3;i++){ const ph=(t*4+i/3)%1; c.strokeStyle=`rgba(200,240,255,${(1-ph)*.6})`; c.lineWidth=2; c.beginPath(); c.ellipse(-250-ph*90,0,6+ph*8,22+ph*20,0,0,TAU); c.stroke() }
  c.restore();
  // 뒤로 젖힌 날개
  const wing=(s)=>{ c.save(); c.scale(1,s); const wg=c.createLinearGradient(0,20,0,96); wg.addColorStop(0,"#5a6a88"); wg.addColorStop(1,"#1a2236");
    c.fillStyle=wg; c.beginPath(); c.moveTo(-40,30); c.lineTo(-150,94); c.lineTo(-196,96); c.lineTo(-120,34); c.closePath(); c.fill();
    c.fillStyle="#c8a040"; c.beginPath(); c.moveTo(-150,94); c.lineTo(-196,96); c.lineTo(-188,90); c.lineTo(-146,88); c.closePath(); c.fill();
    c.save(); c.globalCompositeOperation=GL; jGlow(c,-194,95,14,"120,230,255",.9); c.restore(); c.restore() };
  wing(-1);
  // 선체 윤곽 + 본체
  c.save(); c.translate(0,3); c.scale(1.02,1.06); c.fillStyle="#0c1020"; hull(); c.fill(); c.restore();
  const hg=c.createLinearGradient(0,-58,0,58); hg.addColorStop(0,"#dfe8f6"); hg.addColorStop(.12,"#8fa2bf"); hg.addColorStop(.45,"#4a5a78"); hg.addColorStop(.8,"#26304a"); hg.addColorStop(1,"#141a2c");
  c.fillStyle=hg; hull(); c.fill();
  c.save(); hull(); c.clip();
  // 반사광 줄
  const spec=c.createLinearGradient(0,-50,0,-30); spec.addColorStop(0,"rgba(255,255,255,0)"); spec.addColorStop(.5,"rgba(255,255,255,.55)"); spec.addColorStop(1,"rgba(255,255,255,0)"); c.fillStyle=spec; c.fillRect(-240,-50,400,20);
  // 패널 선
  c.strokeStyle="rgba(10,16,32,.55)"; c.lineWidth=1.5; for(let x=-200;x<150;x+=30){ c.beginPath(); c.moveTo(x,-60); c.quadraticCurveTo(x+6,0,x,60); c.stroke() }
  // 금빛 장식선 + 푸른 에너지 이음새
  c.strokeStyle="#e0b84a"; c.lineWidth=3; c.beginPath(); c.moveTo(-236,-2); c.bezierCurveTo(-120,-18,40,-20,150,-14); c.stroke();
  c.save(); c.globalCompositeOperation=GL; const pul=.6+.4*Math.sin(t*10); c.strokeStyle=`rgba(110,230,255,${pul})`; c.lineWidth=4; c.beginPath(); c.moveTo(-230,18); c.bezierCurveTo(-120,30,40,32,150,26); c.stroke();
  c.strokeStyle="rgba(240,255,255,.9)"; c.lineWidth=1.5; c.stroke(); c.restore();
  // 포문 (폭격 때 번쩍)
  for(let i=0;i<7;i++){ const x=-170+i*42, y=38; c.fillStyle="#0c1020"; c.beginPath(); c.ellipse(x,y,9,6,0,0,TAU); c.fill(); c.strokeStyle="#c8a040"; c.lineWidth=2; c.stroke();
    if(fire&&((t*14+i*5)|0)%7===0){ c.save(); c.globalCompositeOperation=GL; jGlow(c,x,y+6,30,"255,210,110",1); c.restore(); c.fillStyle="#fff6d0"; c.beginPath(); c.ellipse(x,y,7,4,0,0,TAU); c.fill() } }
  c.restore();
  // 등지느러미형 함교
  const tg=c.createLinearGradient(0,-104,0,-48); tg.addColorStop(0,"#e8eef8"); tg.addColorStop(.5,"#7a8aa8"); tg.addColorStop(1,"#2a3450");
  c.fillStyle=tg; c.beginPath(); c.moveTo(-120,-50); c.bezierCurveTo(-90,-100,-30,-108,10,-96); c.bezierCurveTo(30,-88,40,-66,50,-52); c.closePath(); c.fill();
  c.fillStyle="#c8a040"; c.beginPath(); c.moveTo(-118,-50); c.bezierCurveTo(-88,-98,-30,-106,10,-94); c.lineTo(8,-90); c.bezierCurveTo(-30,-101,-86,-94,-112,-50); c.closePath(); c.fill();
  c.save(); c.globalCompositeOperation=GL; const wgd=c.createLinearGradient(-40,-90,30,-60); wgd.addColorStop(0,"rgba(140,240,255,.95)"); wgd.addColorStop(1,"rgba(40,120,220,.8)"); c.fillStyle=wgd;
  c.beginPath(); c.moveTo(-40,-86); c.bezierCurveTo(-10,-92,14,-86,30,-66); c.lineTo(-30,-66); c.closePath(); c.fill(); c.restore();
  c.fillStyle="#ffffff"; c.fillRect(-24,-84,22,3);
  wing(1);
  // 앵무조개 뱃머리
  c.save(); c.translate(150,4); const R=56;
  const sg=c.createRadialGradient(-16,-22,4,0,0,R); sg.addColorStop(0,"#fffaf0"); sg.addColorStop(.5,"#f2dcb4"); sg.addColorStop(1,"#b0703c");
  c.fillStyle="#0c1020"; c.beginPath(); c.arc(0,0,R+3,0,TAU); c.fill();
  c.fillStyle=sg; c.beginPath(); c.arc(0,0,R,0,TAU); c.fill();
  c.save(); c.beginPath(); c.arc(0,0,R,0,TAU); c.clip();
  c.fillStyle="rgba(150,70,30,.75)"; for(let i=0;i<7;i++){ const a=-2.6+i*.55; c.beginPath(); c.moveTo(Math.cos(a)*R*.3,Math.sin(a)*R*.3); c.quadraticCurveTo(Math.cos(a+.5)*R*.8,Math.sin(a+.5)*R*.8,Math.cos(a+.25)*R*1.1,Math.sin(a+.25)*R*1.1); c.lineTo(Math.cos(a+.45)*R*1.1,Math.sin(a+.45)*R*1.1); c.quadraticCurveTo(Math.cos(a+.65)*R*.75,Math.sin(a+.65)*R*.75,Math.cos(a+.1)*R*.3,Math.sin(a+.1)*R*.3); c.fill() }
  c.restore();
  c.strokeStyle="#6a3010"; c.lineWidth=2.5; c.beginPath(); for(let k2=0;k2<=70;k2++){ const a=k2*.16, r=3*Math.exp(a*.17); if(r>R) break; k2?c.lineTo(Math.cos(a)*r,Math.sin(a)*r):c.moveTo(r,0) } c.stroke();
  c.strokeStyle="rgba(106,48,16,.5)"; c.lineWidth=1.2; for(let i=0;i<8;i++){ const a=i*.78+.4, r1=3*Math.exp(a*.17), r2=3*Math.exp((a+TAU)*.17); if(r2>R) continue; c.beginPath(); c.moveTo(Math.cos(a)*r1,Math.sin(a)*r1); c.lineTo(Math.cos(a)*r2,Math.sin(a)*r2); c.stroke() }
  c.fillStyle="rgba(255,255,255,.55)"; c.beginPath(); c.ellipse(-18,-24,16,7,-.6,0,TAU); c.fill();
  c.strokeStyle="#e0b84a"; c.lineWidth=4; c.beginPath(); c.arc(0,0,R,0,TAU); c.stroke(); c.strokeStyle="#fff2c0"; c.lineWidth=1.5; c.beginPath(); c.arc(0,0,R-1,-2.4,-1.2); c.stroke();
  // 빛나는 충각
  c.save(); c.globalCompositeOperation=GL; jGlow(c,R+40,4,46,"150,230,255",.85); c.restore();
  const rg=c.createLinearGradient(R-6,-14,R+66,10); rg.addColorStop(0,"#9aa8c0"); rg.addColorStop(.6,"#f4f8ff"); rg.addColorStop(1,"#ffffff");
  c.fillStyle=rg; c.beginPath(); c.moveTo(R-10,-22); c.lineTo(R+70,4); c.lineTo(R-10,30); c.quadraticCurveTo(R+4,4,R-10,-22); c.fill();
  c.fillStyle="#c8a040"; c.fillRect(R-12,-24,6,56);
  c.restore();
}
function jfShip(c,f,k,W,H,t,GL){
  const tau=(1-k)*f.max, P=shipPath(f.dir,W,H), ang=Math.atan2(P.ey-P.sy,P.ex-P.sx), sc=Math.min(1.3,Math.max(.85,W/850)), rot=f.dir>0?ang*.6:(ang-Math.PI)*.6;
  // 차원문 + 렌즈 플레어
  const ex=f.dir>0?30:W-30, ey=P.sy+(P.ey-P.sy)*((ex-P.sx)/(P.ex-P.sx));
  if(tau<SHIP_T0+.7){ const op=ease(tau/.3), cl=tau>SHIP_T0+.2?Math.max(0,1-(tau-SHIP_T0-.2)/.5):1, R=170*op*cl*sc;
    if(R>2){ c.save(); c.translate(ex,ey); c.globalCompositeOperation=GL; jGlow(c,0,0,R*1.8,"70,180,255",.75);
      c.save(); c.scale(.42,1); c.rotate(t*5);
      const pg=c.createRadialGradient(0,0,0,0,0,R); pg.addColorStop(0,"rgba(255,255,255,.95)"); pg.addColorStop(.35,"rgba(120,220,255,.7)"); pg.addColorStop(.8,"rgba(40,90,220,.35)"); pg.addColorStop(1,"rgba(20,40,160,0)"); c.fillStyle=pg; c.beginPath(); c.arc(0,0,R,0,TAU); c.fill();
      for(let i=0;i<4;i++){ c.strokeStyle=`rgba(${i%2?"130,220,255":"240,255,255"},.9)`; c.lineWidth=6-i; c.beginPath(); c.arc(0,0,R*(1-i*.15),i*1.6,i*1.6+3.6); c.stroke() }
      for(let i=0;i<18;i++){ const a=i*TAU/18-t*7, d=R*(1.05+.15*Math.sin(t*9+i)); c.fillStyle="#e8ffff"; c.fillRect(Math.cos(a)*d-3,Math.sin(a)*d-3,6,6) } c.restore();
      // 가로 플레어
      const fl=c.createLinearGradient(-W*.5,0,W*.5,0); fl.addColorStop(0,"rgba(120,200,255,0)"); fl.addColorStop(.5,`rgba(220,245,255,${.8*op*cl})`); fl.addColorStop(1,"rgba(120,200,255,0)"); c.fillStyle=fl; c.fillRect(-W*.5,-3,W,6);
      c.restore() } }
  const pos=shipPos(f,tau,W,H); if(pos.u<-.08||pos.u>1.08) return;
  c.save(); c.globalCompositeOperation=GL;
  // 속도선
  c.save(); c.translate(W/2,H/2); c.rotate(ang);
  for(let i=0;i<30;i++){ const y=(jr(i,3)-.5)*Math.hypot(W,H), L=140+jr(i,4)*300, span=2400, x=((jr(i,5)*span-tau*3600)%span+span)%span-span/2;
    c.fillStyle=`rgba(200,240,255,${.12+jr(i,6)*.2})`; c.fillRect(f.dir>0?x:-x-L,y,L,1.5+jr(i,7)*2) } c.restore();
  // 에너지 궤적 (리본 3겹)
  c.save(); c.translate(pos.x,pos.y); c.rotate(ang);
  for(let j=0;j<3;j++){ const off=(j-1)*26*sc, wv=Math.sin(t*8+j*2)*8;
    const tl=c.createLinearGradient(-1000,0,-200*sc,0); tl.addColorStop(0,"rgba(60,140,255,0)"); tl.addColorStop(.75,`rgba(${j===1?"220,250,255":"90,200,255"},${j===1?.7:.45})`); tl.addColorStop(1,"rgba(255,255,255,.9)");
    c.strokeStyle=tl; c.lineWidth=(j===1?10:5)*sc; c.lineCap="round"; c.beginPath(); c.moveTo(-1000,off+wv); c.quadraticCurveTo(-600,off-wv,-220*sc,off*.4); c.stroke() }
  for(let i=0;i<20;i++){ const ph=(t*2.2+jr(i,9))%1; c.fillStyle=`rgba(210,250,255,${1-ph})`; const z=6*(1-ph)+2; c.fillRect(-230*sc-ph*560,(jr(i,10)-.5)*140*sc*(1+ph),z,z) }
  // 뱃머리 앞 충격파 (소닉붐)
  c.strokeStyle="rgba(230,250,255,.75)"; c.lineWidth=3; for(let i=0;i<3;i++){ const ph=(t*5+i/3)%1, r=(90+ph*90)*sc; c.globalAlpha=1-ph; c.beginPath(); c.ellipse(230*sc-ph*60*sc,0,r*.35,r,0,-Math.PI/2,Math.PI/2); c.stroke() } c.globalAlpha=1;
  c.restore();
  c.globalCompositeOperation="source-over";
  // 잔상
  for(let i=2;i>=1;i--){ const pp=shipPos(f,tau-i*.06,W,H); c.save(); c.globalAlpha=.12*(3-i); c.translate(pp.x,pp.y); c.rotate(rot); c.scale(sc*(f.dir>0?1:-1),sc); drawNautShip(c,t,GL,false); c.restore() }
  // 본체
  c.save(); c.translate(pos.x,pos.y+Math.sin(t*18)*2.5); c.rotate(rot); c.scale(sc*(f.dir>0?1:-1),sc); drawNautShip(c,t,GL,pos.u>.05&&pos.u<.95); c.restore();
  c.restore();
}

/* 보스 보물상자: 나무 상자 + 금테 + 자물쇠 + 빛줄기 */
function drawTreasure(c,x,y,t,GL){
  const b=Math.sin(t*3)*3, open=.5+.5*Math.sin(t*2.2);
  c.save(); c.globalCompositeOperation=GL;
  c.save(); c.translate(x,y-6+b); c.rotate(t*.4);
  for(let i=0;i<10;i++){ c.rotate(TAU/10); const g=c.createLinearGradient(0,0,0,-90); g.addColorStop(0,`rgba(255,230,140,${.35+.15*open})`); g.addColorStop(1,"rgba(255,230,140,0)"); c.fillStyle=g; c.beginPath(); c.moveTo(-6,0); c.lineTo(0,-90); c.lineTo(6,0); c.closePath(); c.fill() }
  c.restore(); jGlow(c,x,y-4+b,60,"255,210,100",.55); c.restore();
  c.fillStyle="rgba(0,0,0,.3)"; c.beginPath(); c.ellipse(x,y+22,32,8,0,0,TAU); c.fill();
  c.save(); c.translate(x,y+b);
  // 몸통 (나무판)
  const wg=c.createLinearGradient(0,-6,0,20); wg.addColorStop(0,"#a8642e"); wg.addColorStop(1,"#5a3214");
  c.fillStyle=wg; c.fillRect(-26,-6,52,26);
  c.strokeStyle="rgba(40,20,6,.6)"; c.lineWidth=1.5; for(let k=-1;k<=1;k++){ c.beginPath(); c.moveTo(-26,4+k*7); c.lineTo(26,4+k*7); c.stroke() }
  // 뚜껑 (둥근 지붕)
  const lg=c.createLinearGradient(0,-26,0,-4); lg.addColorStop(0,"#c47a3a"); lg.addColorStop(1,"#7a4418");
  c.fillStyle=lg; c.beginPath(); c.moveTo(-27,-5); c.quadraticCurveTo(-27,-28,0,-29); c.quadraticCurveTo(27,-28,27,-5); c.closePath(); c.fill();
  c.strokeStyle="rgba(40,20,6,.55)"; c.beginPath(); c.moveTo(-20,-18); c.quadraticCurveTo(0,-24,20,-18); c.stroke();
  // 금테
  const gold=c.createLinearGradient(0,-30,0,22); gold.addColorStop(0,"#fff2a8"); gold.addColorStop(.5,"#f6c544"); gold.addColorStop(1,"#a8741a");
  c.fillStyle=gold; c.fillRect(-28,-7,56,5); c.fillRect(-28,17,56,4);
  [-18,18].forEach(xx=>{ c.fillRect(xx-3,-27,6,48) });
  c.fillRect(-28,-7,5,28); c.fillRect(23,-7,5,28);
  c.fillStyle="#fff8d0"; [[-25,-5],[25,-5],[-25,19],[25,19],[-18,-25],[18,-25]].forEach(([a,bb])=>{ c.beginPath(); c.arc(a,bb,1.6,0,TAU); c.fill() });
  // 자물쇠
  c.fillStyle=gold; c.beginPath(); c.roundRect?c.roundRect(-7,-9,14,15,3):c.rect(-7,-9,14,15); c.fill(); c.strokeStyle="#7a5410"; c.lineWidth=1.5; c.stroke();
  c.fillStyle="#3a2408"; c.beginPath(); c.arc(0,-3,2.5,0,TAU); c.fill(); c.fillRect(-1,-2,2,5);
  // 틈새로 새어 나오는 빛
  c.save(); c.globalCompositeOperation=GL; c.fillStyle=`rgba(255,240,170,${.5+.4*open})`; c.fillRect(-23,-7,46,2); c.restore();
  c.restore();
  for(let i=0;i<7;i++){ const ph=(t*.9+i/7)%1, a=i*2.3; c.fillStyle=`rgba(255,250,200,${1-ph})`; const z=ph<.5?3:2; c.fillRect(x+Math.cos(a)*30-z/2,y-10+b-ph*40+Math.sin(a)*8-z/2,z,z) }
}
