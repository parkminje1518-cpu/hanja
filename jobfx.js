/* 체력 색: 60% 넘으면 초록 · 30~60% 노랑 · 30% 아래 빨강 */
function hpCol(k){ return k>.6?["#7dff8a","#1f9e48"]:k>.3?["#ffe36a","#d89a10"]:["#ff6a6a","#b81c2a"] }
/* 붓글씨 한자 (山·雷: Ma Shan Zheng, 龍: Yuji Boku · SIL OFL 글꼴에서 세 글자만 잘라 넣었어요) */
const BRUSH_FONT="BrushHanja";
(function(){ try{ const L=[["山","d09GMgABAAAAAALwAA4AAAAABaQAAAKcAAIAxQAAAAAAAAAAAAAAAAAAAAAAAAAAGyAcIAZgADQRCAqCSIITATYCJAMGCwYABCAFg14HIAwHG3MEUZTtRYziZ0I2B7puJUauLJWiGMVN/yI/t/HQt4zgY439vrtDJakmhkwzSypRrDFdvCRCZwiFDKFQGUL5oncxtwlWEvcRU28T0RzIpMTAunzRUyIS2AC33ceZrgztGpHz/t//3gLcbEInDnkiG3bc2Psi3XychgmXUKoFhmm6K6Lbd5/k9Mgkej2BUk2S0NHx2QUJGeQDpfMs/Yg6BSR3yQrETDgWWyoxiKRY19rq2IjfRp7fmuo5EOlXFEEExO8ERBsMCVLUw4XJEW0QWTXYOMt/ylOdACc+UEUHkPVXjyHOIfavAXF8MNbq29zMbG/m9L0xm59boa+TTsf7kidOE6PtClcxwetowVWs+Plx2tqayqcYTRvACKtloeVI0YSreGKMMZpaJjp4PUAvu/MVCnRCocplbnMbo03SNdfsMtrKbu0AWqBQV1f1KLv1M3Kgc+j4nHT4P7vnBotAxdocXqHFjlCPma+sslRcDKgMvkJymEXTO5NU+kqB/e09sJAms8SHMPN0hoaxag2I4zzUm/KHvqHIWLY3Cdbzrkyhk24JhIXv/ih01JwDzSBLHVnh8FcIF1Ta9ra93sfneXGvYK+rCAgkXtdnO8e2q3rfEvD0C972ly7hMz88MJ+H9ybvKJSA4CpTwdY29NCJHC7MS6LjO/bxqsgaXGQleCahocGXJiq909SwP80MRAMt0BCj31moJ7ZMaXQBk4DDs4GKkrIWcMNjgD3CFY+g+uAxVBxwYtKIGBQbGHPYeBqTBaTwbDadpaOoiCOw8RykAopGUcTRaDgyBkujslmKFARLjkIvPSoCrAHOJTwNxyEjmCoKSkqquj7e5qa6m3byDWNFe4D8gVntCfNXoJ5Dl+Goy4UMKb5EfjmXPQIAAAA="],["雷","d09GMgABAAAAAAScAA4AAAAAB/AAAARJAAIAxQAAAAAAAAAAAAAAAAAAAAAAAAAAGyAcIAZgADQRCAqHFIVFATYCJAMGCwYABCAFg14HIAwHGyUGUZQsTp7iR2JsoyY/UKlMfdrNh8ezer+BZpykI7gzC7kDeKH2zsEKaQ8ASlS7vfmUowCTJISAKOCkAgCcOJdutBvtZtM8H/JERtWUFvVVHoVP+ECPFVRi/8ZvD8hvmw031hVR+QmRm4jEfn09EIAoSgwy5ixaBR4NgM8HAAB1mK73yCVgwHZs6wAsfK1GNgqSB0V4g9iwmhx40PhjvEj1+g4B1CVDAAgA5Nn+BBDHBgApSYZCgNLiQBogkfGHzyeMNhEEAIk4YSBknAdoAAekA2QC8ukAwP3EP/CZoOTQwBZzvq7jvaLLiDi21nxM0Y/K15Z4Y45J7t1r70jW8c4SI0lT9LsUffVr1fqse/ZKtESXalhlT5LddtNu3mA3jZTb8VpZE12WPGN6njrEBy3v6hQv17DbMFSvd79Tg7S01DteW+05Gvfqq2FHjoiuK1XDQkvzXu9iMbupujY8muTS5CuNiGP242tOvX42ZprPpN5Bdj/iOVmzdm2SlfTonWFRWgagSUembkkxXo88bl5TmCvpiq7bzTdSU4vfSTRkK8Uw7KZpv+KN9ebuR3abu0WX6NWiZuW41Y8naZriCVeSPYqua6ILLetI1BEdJLdpv4HsfiM2ctVp925Ru1XW7n+XPqvfY7evOm5YskvD8KN6qnk8+YMNaz1O3j/YX7p3z5MZFw2E7t3XOL8jS/3xMoETHnj0k/J9gbF3pv/W8AjZdlWxYzN5h7n2eYGP+o+i/paEL57YZc1jCCn97u47M8Ku0McCuKDDx3j+26LEhFXar2vWK+WyxL6Z72Bt+fG0884nZlIv7YtKzE6IDylZ7b85cthMJK3+G97/5meB642rO8HQztLGak56LDYmnmpqGPnI/9Y1C376/uuyXnGbw7ak8G7HVUJJh8AWNSVWLMZGsr5+++tPhxx/rTKLSuXEL/1H3l/wB9P46iUpIb0XBf84WrJN+3SVcsuruTEqTS/78FzZbc0sc+C1lh1KaIibl/5i9KNSAqF7Z3I4Sq19pubL7aQoemvMmYcOFi0SaJrlFt66NzjmmGIPloY2bUkK8lsSlHNVQionMMtO1u+yPzbX6SwezPvkU3pLxI6iHyWHFLCk4g5BcwAAQAA2j83e9by+NbDqN56ivgSAF9pvfQYAPvc98jA6vpcap2IAsGxR/ndxDKx7yZdQidjBPnSUxKkBFx7Sj3E2oJAmALgdMGgiwu20TYAXaUqV92laRiJoRkQa72elZAscevQa069Ni1aD4hTIk69sM62yYc58se1WtnK7bhscqTvixlkWbu/Rzmkn8npDBim8R78BJS1336BeAyrkytWi7cqH7JAT9Xt0eW6Pno53cmqWups7IJcItxsoh8aV9E8ZcZiNwy+yglOLIZ2261cgR548hSptsF4Th8qVFmQnjFq0KA7+Gs6l/TY9vFA9iTqHomy+EyjQeifx7b+RvhAAAA=="],["龍","d09GMgABAAAAAAXEAA8AAAAACdwAAAVtAAMAgwAAAAAAAAAAAAAAAAAAAAAAAAAAGYFSHCoGYAA0EQgKiTyHEwE2AiQDCAsGAAQgBYMwByAXJBgGG6YHUZQvTpjiqwPbmPbQF6HEMpZNU0YJJS5LYENEsoiOr384gBHmP2z0Tjz8//7o93n3zswH1Wiln6wuri4l9d+I6MQf/ate4r+2M7M8COqukirqf/173/u/TFrfm/ykEGdw6iRvxDKaE8iNPHs9N//fOf9vW7H1yPdI7Wq4kpg6U79gMn/FErCWRDuSEHvd//+90/esMQUmBhppImPe92rTXDjWIMkD++dTY1on+hZn2Reh/M32MHGjLgnL9kNeIhGdDv2UQDmLtKBKh+QUVYHP4pGD+kDc8kEdvSFuherXAz6rVT8FPmvUkH4Qh4NC1oQHH4uUgiSrpBorE4T6UPFE/N8nq4Ou1HfqqvUhv0zYxaD+ffs5Gg7Aduh4INUqRGxzbQVt+MFO1ATLww6F/0DO53QrGpVQHCjSAIwmXjEPIiIXoKjIQeTltBs9pBZgwOm5zEIq/u8j7wvHCMCqbI5/KpvhtAhcSy1EKCXVDGcUudOH/8t6bUMAAcQgTkDEyJUwLiQfkKzqC1Zf/K9gOQq2v7pxp30345jn0409ESPiBlGmCBRVeVxL27vSfEzyryKukEaZDSs2/+qes8vM5SsgEIs3NV+vpifaEkhQzHLfzB0AYN3DRHfmnixoTeaNK/oKOHLgZkFN62UfrroBCBRccF6gnBA0g4e71j0G9B0Uap6rAuEHe/ibpYqrENGR5/ExjzNJEWfmJgRcCVkhI6ILWASNq39h3khww5vSiqaPefSe9rzFFobK2yPK+hkAzG+S5z8sBw9eUHNY5hSx+Vlu3qfCTzrVxZAOSwhKUQ6OoGE+ev9x64bCYyUVqSpS1Si7nQUCOAxeP03vrk1rZTP7OCC+3VUw8e8r7acYGfa7TE/UkvN+5uVrd/KY2WWKf81Dz8MU21+5tlc7c/BQ8fR/1tzJYW7pE/fM/j21cgNUVv73bMJ/SkUHlwSuUMNEGu4Zk5zHjk7CYjbz/G+p1NTS70Ky4a0rZxMdtxyA3t2hukwxZOqSQsbVzccpWLi1WQ0v2NMYGvbxqqPnolCtmYSYbKhUMtEoMOb9RHYUf9l8svv2PWFZw9JZEltYfbixg+GGtzPCjQSnZmZPjS2k7WiU/PLbsvklVmrw8em7veaZRclHrLn1nx9fqzfdWGEhGTmwwcQpc8uJjR4LN6bVDa9Y8qJ7kpLmXfnV8ruhorWTg0mGA5d9ncf31qU5zV2wNWIINUh6WDAQkC6GZ0RMZzanxpacMLZaH9PczSsimsyuB57gJZ5+1gcGdi5Yu+dcmUx/c/3l4t+mgYvLrCrcDypiPjlmomZnFPxwT1OY9aj2w1vlV34t1+THdQ9liS4NZNSj9bZvP+KC+h68c7b6/f35Ypi/cBEaMXDHufsHRGllmrXD+yQ7c+RTaDioy8X2Zow8D0ra6W0xtvT2WGBYu8kn5mHkfC7C0jHC07d9eXLbb/eHZmuCsCViXl69ZLmXc+Sqq1saPlYPJlnsWPv3pbotnrIqsXMRgECyc2T+ir/zqyZ9LZfIW3h+R4UCfHL5klLv//l0mdwBlCqsbXnfvzekLysC1lbYOokX8SVR1Ipvke0z6FKZWYjIGnCJhirUsE1VqOKmKunimipr4ZeqRINw4qZUs4iBTP0NMNIgPbp0G8JNhDARwrmpauMO3XpD9dIDZevQP0U76A3hdEMVdA9qBxnMjR8oPMSAVm+CUKG69KwxDaUTQq+/viNcSPsBwkpnCfczRBGFtgKTI4V6r/uHgIwMvalUoUOXYtWHMkikEGHRRxMVylIrMTtsW4LLLPA2txKt0fE02hNyzc1rMYcQIUb/p5P2qAbo579K6S3vbZTYdPDrIcaR6goAAAAA"]]; for(const [ch,b] of L){ const bin=Uint8Array.from(atob(b),c=>c.charCodeAt(0)); const ff=new FontFace(BRUSH_FONT,bin.buffer,{unicodeRange:"U+"+ch.codePointAt(0).toString(16)}); document.fonts.add(ff); ff.load().catch(()=>{}) } }catch(e){} })();
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
function jfWarn(c,f,k,t){ if(f.fire&&drawFireCircle(c,f,k,t)) return;
  { const own=!!f.own, q=1-k, sc=.8+.2*Math.min(1,q*4), key=own?"warnown":"warncircle", col=own?OWN_COL:dangerCol(f.th);
    if(warnTex(key,col)){ c.save(); c.translate(f.x,f.y); c.scale(1,.75); c.fillStyle=own?`rgba(255,214,90,${.04+.05*q})`:`rgba(200,30,40,${.06+.07*q})`; c.beginPath(); c.arc(0,0,f.r,0,TAU); c.fill();
      c.fillStyle=own?"rgba(255,214,90,.12)":"rgba(220,40,50,.14)"; c.beginPath(); c.arc(0,0,f.r*Math.min(1,q),0,TAU); c.fill(); c.restore();
      drawWarnEllipse(c,key,col,f.x,f.y,f.r*sc*1.04,f.r*.75*sc*1.04,Math.min(1,q*5)*(.5+.18*Math.sin(t*(own?8:16))));
      if(!own){ c.save(); c.strokeStyle=`rgba(255,50,60,${.45+.4*Math.sin(t*16)})`; c.lineWidth=2.5; c.beginPath(); c.ellipse(f.x,f.y,f.r,f.r*.75,0,0,TAU); c.stroke(); c.strokeStyle=`rgba(255,255,255,${.55+.4*Math.sin(t*16+Math.PI)})`; c.lineWidth=1.6; c.setLineDash([10,7]); c.lineDashOffset=-t*40; c.beginPath(); c.ellipse(f.x,f.y,f.r*.96,f.r*.72,0,0,TAU); c.stroke(); c.restore() } return } }
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
  { const im=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.wslash; if(im){ const q=1-k, R=f.r*(.95+.15*Math.min(1,q*3)), W2=R/(im.width*.39)*im.width, rot=f.a+q*1.6;   // 광폭 연속 베기: 받아 온 금빛 바위 검기 그림이 휙 돌며 베요
    c.save(); c.translate(f.x,f.y); c.rotate(rot); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(1,k*2); c.drawImage(im,-W2*.654,-W2*.5,W2,W2); if(q<.35){ c.globalAlpha=(.35-q)*2.4; c.drawImage(im,-W2*.654,-W2*.5,W2,W2) } c.restore(); return } }
  if(typeof slashSprite==="function"&&PFX._ok){ const q=1-k, R=f.r*(.8+.25*q), al=Math.min(1,k*2.2); if(heroArc(c,f.x,f.y,f.a+q*1.4,R,al,"hw",window.__fxLow?0:.8)){
      c.save(); c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(255,220,140,${.5*k})`; c.lineWidth=2; c.beginPath(); c.arc(f.x,f.y,R*1.02,0,7); c.stroke(); c.restore(); return } }
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
  // 노을 유적: 모래 폭풍 (모래 소용돌이 그림이 빙글 돌며 퍼져요)
  if(f.th&&window.__mapId===3&&typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.sandstorm){ const im=SKILL_IMG.sandstorm, W=R*2.6*(.55+.45*Math.min(1,q*3)), H=W*im.height/im.width;
    c.save(); c.translate(f.x,f.y); c.scale(1,H/W); c.rotate(-q*3.5); c.globalAlpha=Math.min(1,k*2); c.drawImage(im,-W/2,-W/2*im.height/im.width*W/H,W,W*im.height/im.width*W/H); c.restore(); return }
  // 전사 대지 내려찍기: 제미나이 그림 (갈라진 땅 + 튀어 오르는 바위 + 충격파 고리)
  // 전사 대지 내려찍기: 하늘에서 바위 대검이 내리꽂히고 그 자리에서 땅이 갈라져요
  const RS=!f.th&&typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.rocksword;
  if(RS&&q<.92){ const Hs=R*1.7, Ws=Hs*RS.width/RS.height, d=Math.min(1,q/.1), drop=(1-d*d)*R*1.6, sink=Math.min(1,Math.max(0,(q-.1)*.6))*Hs*.06, al=q<.72?1:Math.max(0,1-(q-.72)/.2);
    c.save(); c.globalAlpha=al; if(q<.1){ c.globalAlpha=al*.35; c.drawImage(RS,f.x-Ws/2,f.y+Hs*.08-Hs-drop-R*.25,Ws,Hs); c.globalAlpha=al }
    c.drawImage(RS,f.x-Ws/2,f.y+Hs*.08-Hs-drop+sink,Ws,Hs); if(q>=.1&&q<.3){ c.globalCompositeOperation="lighter"; c.globalAlpha=(.3-q)*3; c.drawImage(RS,f.x-Ws/2,f.y+Hs*.08-Hs+sink,Ws,Hs) } c.restore() }
  const QI=!f.th&&typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.quakefx; if(QI){ const sc=.7+.4*(1-Math.pow(1-Math.min(1,q*2.2),3)), Wd=R*2.7*sc, Hd=Wd*QI.height/QI.width;
    c.save(); c.globalAlpha=Math.min(1,k*2.2); c.drawImage(QI,f.x-Wd*.5,f.y-Hd*.6-q*10,Wd,Hd);
    if(q<.4){ c.globalCompositeOperation=GL; c.globalAlpha=(.4-q)*1.6; c.drawImage(QI,f.x-Wd*.5,f.y-Hd*.6,Wd,Hd) } c.restore(); return }
  if(!f.cr){ f.cr=[]; for(let i=0;i<9;i++){ let a=jr(s,i)*TAU, x=0, y=0; const p=[[0,0]]; const L=R*(.5+.5*jr(s,i+30)); for(let j=0;j<6;j++){ a+=(jr(s,i*10+j)-.5)*.8; x+=Math.cos(a)*L/6; y+=Math.sin(a)*L/6*.6; p.push([x,y]) } f.cr.push(p) } }
  c.save(); c.translate(f.x,f.y);
  // 갈라진 땅 (빛나는 균열)
  const crk=(w,col)=>{ c.strokeStyle=col; c.lineWidth=w; c.lineJoin="round"; f.cr.forEach(p=>{ c.beginPath(); p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y)); c.stroke() }) };
  const ICE=f.th==="ice"||f.th==="snow";
  crk(11,ICE?`rgba(20,45,90,${k*.9})`:`rgba(40,25,15,${k*.9})`); c.globalCompositeOperation="lighter"; if(!window.__fxLow) crk(7,ICE?`rgba(80,160,255,${k*.5})`:`rgba(255,120,30,${k*.45})`); crk(3.6,ICE?`rgba(150,215,255,${k})`:`rgba(255,185,70,${k})`); crk(1.4,`rgba(255,252,${ICE?255:220},${k})`);
  if(q<.35&&!window.__fxLow){ const fl=1-q/.35; jGlow(c,0,0,R*.9,ICE?"170,220,255":"255,200,110",.55*fl); c.fillStyle=`rgba(255,255,240,${.35*fl})`; c.beginPath(); c.ellipse(0,0,R*.35*(1+q*2),R*.21*(1+q*2),0,0,TAU); c.fill() }
  // 충격파 + 흙먼지 고리
  for(let i=0;i<2;i++){ const rr=R*Math.min(1.1,(q*1.6-i*.25)); if(rr<=0) continue; c.strokeStyle=ICE?`rgba(200,235,255,${k*(1-i*.4)})`:`rgba(255,220,150,${k*(1-i*.4)})`; c.lineWidth=12*k; c.beginPath(); c.ellipse(0,0,rr,rr*.6,0,0,TAU); c.stroke(); if(!window.__fxLow){ c.strokeStyle=`rgba(255,255,255,${.7*k*(1-i*.5)})`; c.lineWidth=2.5*k; c.stroke() } }
  c.globalCompositeOperation="source-over";
  for(let i=0;i<14;i++){ const a=i*TAU/14+jr(s,i), d=R*Math.min(1,q*1.6); c.fillStyle=ICE?`rgba(235,245,255,${k*.6})`:`rgba(190,165,130,${k*.55})`; c.beginPath(); c.arc(Math.cos(a)*d,Math.sin(a)*d*.6,10+q*14,0,TAU); c.fill() }
  // 튀어 오르는 바위 조각
  for(let i=0;i<12;i++){ const a=jr(s,i+50)*TAU, sp=.5+jr(s,i+70)*.7, d=R*.9*q*sp, h=Math.sin(Math.min(1,q*1.2)*Math.PI)*(50+60*sp), z=5+jr(s,i+90)*7;
    c.save(); c.translate(Math.cos(a)*d,Math.sin(a)*d*.6-h); c.rotate(q*8*sp); c.fillStyle=ICE?"#6aa0d8":"#6a5a4a"; c.fillRect(-z/2,-z/2,z,z); c.fillStyle=ICE?"#e8f6ff":"#a89478"; c.fillRect(-z/2,-z/2,z,z/2.5); c.restore() }
  if(ICE&&PFX.icespike){ const up=Math.min(1,q*3); for(let i=0;i<9;i++){ const an=jr(s,i+40)*TAU, d=R*(.35+jr(s,i+60)*.5); pfxDraw(c,"icespike",Math.cos(an)*d,Math.sin(an)*d*.6-10*up,(jr(s,i)-.5)*.3,.45*up+.1,Math.min(1,k*1.6)) } }
  // 땅에 박히는 대검 (처음 절반)
  if(q<.6&&!f.th){ const drop=Math.min(1,q*5), y0=-150*(1-drop), al=q<.45?1:(.6-q)/.15;
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
    const HS_=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&((window.__t5==="warrior"&&SKILL_IMG.lavasword)||SKILL_IMG.holysword);
    if(HS_){ c.rotate(-Math.PI/2); const h=40, w=h*HS_.width/HS_.height; c.drawImage(HS_,-w/2,-h*.55,w,h); c.globalCompositeOperation=GL; c.globalAlpha*=.35+.2*Math.sin(t*8+i); c.drawImage(HS_,-w/2,-h*.55,w,h) }   // 성검 그림 6자루가 칼끝을 아래로 빙글
    else { c.fillStyle="#fff4c8"; c.beginPath(); c.moveTo(-3,-20); c.lineTo(3,-20); c.lineTo(3,6); c.lineTo(0,12); c.lineTo(-3,6); c.closePath(); c.fill();
    c.fillStyle="#f6c544"; c.fillRect(-7,-22,14,3); c.fillStyle="#b8871a"; c.fillRect(-2,-29,4,7) } c.restore() }
  for(let i=0;i<10;i++){ const ph=(t*.9+i/10)%1, a=i*2.39; c.fillStyle=`rgba(255,236,150,${1-ph})`; c.fillRect(x+Math.cos(a)*30-2,y+16-ph*110-2,4,4) }
}
/* 각성 화면 베기: 하늘에서 거대한 검이 내려오고 화면을 X자로 가르기 */
function jfCombo(c,P,n,t,GL){ const OI=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.comboorb;
  if(OI){ const S=20, w=S*OI.width/OI.height; for(let i=0;i<n;i++){ const a=t*2.6+i*TAU/n, x=P.x+Math.cos(a)*38, y=P.y-8+Math.sin(a)*15, z=1+Math.sin(t*6+i)*.06, back=Math.sin(a)<0;
      c.save(); c.globalAlpha=back?.75:1; c.drawImage(OI,x-w*z/2,y-S*z/2,w*z,S*z); if(n>=5){ c.globalCompositeOperation=GL; c.globalAlpha=.35+.25*Math.sin(t*10); c.drawImage(OI,x-w*z/2,y-S*z/2,w*z,S*z) } c.restore() } return }
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
function jfArrow(c,sh,a,GL){ if(typeof drawWindArrow==="function"&&drawWindArrow(c,sh.x,sh.y,a,sh.glow||sh.boom?120:96,1,!!(sh.glow||sh.boom))) return;
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
  const SM=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.shadowsmoke; if(SM){ const H=86, W=H*SM.width/SM.height; c.save(); c.translate(m.x,m.y+26); c.scale(1+Math.sin(t*3)*.06,1+Math.sin(t*2.3)*.04); c.globalAlpha=.6+Math.sin(t*4)*.08; c.drawImage(SM,-W/2,-H,W,H); c.restore() }
  c.save(); c.imageSmoothingEnabled=false;
  for(let i=0;i<5;i++){ const ph=(t*1.2+i/5)%1; c.fillStyle=`rgba(80,40,140,${.4*(1-ph)})`; c.beginPath(); c.arc(m.x+Math.sin(i*2+t*2)*12,m.y+18-ph*40,6+ph*6,0,TAU); c.fill() }
  c.globalAlpha=.85; c.drawImage(sh,Math.round(m.x-32-2*64/sh.width),Math.round(m.y-40),64*sh.width/(sh.width-4),64*sh.height/(sh.height-4)); c.restore();
}
function jfMark(c,e,t,GL){
  const r=e.r+12, p=Math.max(0,e.mark/1.2);
  const MK=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.assmark; if(MK){ const S=r*2.6*(1+(1-p)*.12); c.save(); c.translate(e.x,e.y); c.globalCompositeOperation=GL; c.rotate(t*1.2); c.globalAlpha=.8+Math.sin(t*10)*.15; c.drawImage(MK,-S/2,-S/2,S,S); c.rotate(-t*1.2);
    c.strokeStyle="rgba(255,200,240,.9)"; c.lineWidth=3; c.beginPath(); c.arc(0,0,S*.5+3,-Math.PI/2,-Math.PI/2+TAU*p); c.stroke(); c.restore(); return }
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
  if(typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.star){ const S=dk?32:26; c.save(); c.globalCompositeOperation=GL; jGlow(c,sh.x,sh.y,S*.9,"170,90,255",dk?.5:.3); c.restore();
    for(let j=2;j>=0;j--){ c.save(); c.translate(sh.x-sh.vx*.012*j,sh.y-sh.vy*.012*j); c.rotate(t*22-j*.5); c.globalAlpha=j?.25/j:1; drawSkillImg(c,"star",S,false); c.restore() } return }
  c.save(); c.globalCompositeOperation=GL;
  for(let j=1;j<=4;j++){ c.fillStyle=dk?`rgba(150,80,255,${.3-j*.06})`:`rgba(220,230,255,${.25-j*.05})`; c.beginPath(); c.arc(sh.x-sh.vx*.014*j,sh.y-sh.vy*.014*j,9-j*1.4,0,TAU); c.fill() }
  if(dk) jGlow(c,sh.x,sh.y,20,"170,90,255",.5);
  c.restore();
  c.save(); c.translate(sh.x,sh.y); c.rotate(t*22); jfStarShape(c,12,dk?"#c8a6ff":"#e4e9f4",dk?"#5a2aa0":"#8a93a8"); c.restore();
}

/* ========== 마법사: 독 안개 / 메테오 / 독불꽃 ========== */
function jfMist(c,z,t,GL){ if(drawMistArt(c,z,t)) return;
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
  if(typeof SKILL_IMG!=="undefined"&&SKILL_IMG.meteor){ const im=SKILL_IMG.meteor, w=R*5.8, h=w*im.height/im.width;
    c.save(); c.globalCompositeOperation=GL; jGlow(c,sx,sy,R*3,"255,140,50",.6); c.restore();
    c.save(); c.translate(sx,sy); c.scale(-1,1); c.rotate(-.12); c.drawImage(im,-w*.2,-h*.83,w,h); c.restore(); return }
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
function jfFireShot(c,sh,t,GL){ if(typeof drawFireballFx==="function"&&drawFireballFx(c,sh.x,sh.y,Math.atan2(sh.vy,sh.vx),sh.big?170:120,t)) return;
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
  const q=1-k, al=Math.min(1,q/.12,(1-q)/.15), y=H*.2, h=Math.min(80,Math.max(56,H*.11)), x=cutinX(f,W);   // 작게 · 위쪽에 (전투 화면을 덜 가리게)
  c.fillStyle=`rgba(5,5,15,${.1*al})`; c.fillRect(0,0,W,H);
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
  const q=1-f.life/f.max, al=Math.min(1,q/.12,(1-q)/.15), y=f.ty||H*.2, x=cutinX(f,W)+W*(f.ty?.5:.6);
  c.save(); c.globalAlpha=al; c.textAlign="center"; c.textBaseline="middle";
  // 고급 MMORPG 느낌: 명조체(Noto Serif KR 900) · 금빛 그라데이션 · 은은한 빛 번짐
  const HF=window.__heroId?`"HF-${window.__heroId}",`:"", SF=HF+'"Noto Serif KR","Nanum Myeongjo","Batang",serif', W9=HF?"":"900 ", W6=HF?"":"600 ";
  try{ c.letterSpacing="4px" }catch(e){} c.font=`${W6}12px ${SF}`; c.fillStyle="rgba(255,240,210,.92)"; c.shadowColor="rgba(0,0,0,.8)"; c.shadowBlur=6; c.fillText(f.sub,x,y-22);
  const fs=Math.round(Math.min(34,W/17)); try{ c.letterSpacing="2px" }catch(e){} c.font=`${W9}${fs}px ${SF}`;
  c.shadowColor=f.c2||"#ffb84a"; c.shadowBlur=18; c.lineWidth=6; c.strokeStyle="#140c08"; c.strokeText(f.text,x,y+6); c.shadowBlur=0;
  const g=c.createLinearGradient(0,y+6-fs*.55,0,y+6+fs*.5); g.addColorStop(0,"#fffbe8"); g.addColorStop(.45,"#ffe39a"); g.addColorStop(.55,"#e8b54a"); g.addColorStop(1,"#a8701e"); c.fillStyle=g; c.fillText(f.text,x,y+6);
  c.lineWidth=1.2; c.strokeStyle="rgba(255,250,230,.7)"; c.strokeText(f.text,x,y+6);
  // 글자 위를 스쳐 지나가는 빛줄기
  const sw=((1-f.life/f.max)*1.6%1)*W; c.globalCompositeOperation="source-atop"; const lg=c.createLinearGradient(x-W/2+sw-60,0,x-W/2+sw+60,0); lg.addColorStop(0,"rgba(255,255,255,0)"); lg.addColorStop(.5,"rgba(255,255,255,.75)"); lg.addColorStop(1,"rgba(255,255,255,0)"); c.fillStyle=lg; c.fillRect(x-W/2,y-24,W,60);
  c.restore();
}

/* ---------- 전사 4차: 영웅의 각성 (하늘에서 성검이 꽂히고 화면을 다섯 번 가름) ---------- */
function drawHolySword(c,x,tip,len,al,t,GL){
  // 제미나이 성검 그림: 칼끝이 tip에 오도록, 뒤에 금빛 광채
  const SI=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&((window.__t5==="warrior"&&SKILL_IMG.lavasword)||SKILL_IMG.holysword); if(SI){ const H=len*.95, Wd=H*SI.width/SI.height;
    c.save(); c.globalAlpha=al; c.globalCompositeOperation=GL; jGlow(c,x,tip-H*.45,Wd*1.4,window.__t5==="warrior"?"255,140,60":"255,225,140",.35); c.globalCompositeOperation="source-over"; c.drawImage(SI,x-Wd/2,tip-H,Wd,H);
    c.globalCompositeOperation=GL; c.globalAlpha=al*(.25+.15*Math.sin(t*12)); c.drawImage(SI,x-Wd/2,tip-H,Wd,H); c.restore(); return }
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
  const dark=Math.min(1,tau/.2)*(tau>1.9?Math.max(0,1-(tau-1.9)/.4):1); c.fillStyle=`rgba(10,6,0,${.45*dark})`; c.fillRect(0,0,W,H);
  // 빛 기둥
  if(tau<1.2){ c.globalCompositeOperation=GL; const pg=c.createLinearGradient(cx-60,0,cx+60,0); pg.addColorStop(0,"rgba(255,220,120,0)"); pg.addColorStop(.5,`rgba(255,240,180,${.45*dark})`); pg.addColorStop(1,"rgba(255,220,120,0)"); c.fillStyle=pg; c.fillRect(cx-60,0,120,cy); c.globalCompositeOperation="source-over" }
  // 성검 낙하
  if(tau<1.25){ const d=ease(tau/.45), tip=-len*.2+(cy+len*.2)*d, al=tau>1?1-(tau-1)/.25:1;
    if(tau<.45){ c.globalCompositeOperation=GL; for(let i=0;i<7;i++){ const xx=cx+(i-3)*len*.03; c.fillStyle=`rgba(255,236,170,${.35})`; c.fillRect(xx-1,tip-len*1.4,2,len*.6) } c.globalCompositeOperation="source-over" }
    drawHolySword(c,cx,tip,len,al,t,GL) }
  // 꽂히는 순간: 금빛 마법진 + 하늘로 치솟는 빛기둥 (제미나이 그림)
  const HC=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&((window.__t5==="warrior"&&SKILL_IMG.collapse5)||SKILL_IMG.holycircle);
  if(tau>.42&&tau<1.45){ const p=(tau-.42)/1.03, grow=1-Math.pow(1-Math.min(1,p*3.2),3), fade=p<.7?1:Math.max(0,1-(p-.7)/.3);
    if(HC){ const Wd=Math.min(W*.95,H*1.25)*(.55+.45*grow), Hd=Wd*HC.height/HC.width; c.save(); c.globalCompositeOperation=GL; c.globalAlpha=fade*.85; c.drawImage(HC,cx-Wd*.5,cy-Hd*.737,Wd,Hd);
      if(p<.2){ c.globalAlpha=(.2-p)*2; c.drawImage(HC,cx-Wd*.5,cy-Hd*.737,Wd,Hd) } c.restore() }
    else { c.globalCompositeOperation=GL; jGlow(c,cx,cy,220*(1-p*.5),"255,240,190",(1-p)*.9); c.globalCompositeOperation="source-over" }
    // 바깥으로 한 번 퍼지는 얇은 금빛 충격파
    c.save(); c.globalCompositeOperation=GL; const r=Math.max(W,H)*(.1+p*.8); c.strokeStyle=`rgba(255,230,150,${Math.max(0,.8-p*1.3)})`; c.lineWidth=6*(1-p)+1; c.beginPath(); c.ellipse(cx,cy,r,r*.45,0,0,TAU); c.stroke(); c.restore() }
  // 화면 가르기: 대각선 돌진 → 금빛 선 하나가 그어져 멈춤 → 선을 따라 화면이 쩍 갈라지며 빛 파편이 터짐 → 불티가 흩어짐
  { const ang=-.42, ca=Math.cos(ang), sa=Math.sin(ang), D=Math.hypot(W,H)*.62, x0=cx-ca*D, y0=cy-sa*D, x1=cx+ca*D, y1=cy+sa*D, nx=-sa, ny=ca, R=i=>{ const x=Math.sin(i*12.9898+7.13)*43758.5453; return x-Math.floor(x) };
    // ① 돌진: 금빛 혜성이 대각선으로 휙 (잔상)
    if(tau>.95&&tau<1.2){ const p=(tau-.95)/.2, hx=x0+(x1-x0)*Math.min(1,p), hy=y0+(y1-y0)*Math.min(1,p); c.save(); c.globalCompositeOperation=GL;
      const tg=c.createLinearGradient(hx-ca*260,hy-sa*260,hx,hy); tg.addColorStop(0,"rgba(255,170,60,0)"); tg.addColorStop(1,"rgba(255,245,200,.95)"); c.strokeStyle=tg; c.lineCap="round"; c.lineWidth=14; c.beginPath(); c.moveTo(hx-ca*260,hy-sa*260); c.lineTo(hx,hy); c.stroke();
      jGlow(c,hx,hy,70,"255,220,140",.9); c.restore() }
    // ② 금빛 선 (가늘게 그어져서 잠깐 멈춤)
    if(tau>1.0&&tau<1.5){ const p=Math.min(1,(tau-1.0)/.18), fl=tau>1.38?Math.max(0,1-(tau-1.38)/.12):1, ex=x0+(x1-x0)*p, ey=y0+(y1-y0)*p; c.save(); c.globalCompositeOperation=GL;
      c.strokeStyle=`rgba(255,200,90,${.5*fl})`; c.lineWidth=9; c.beginPath(); c.moveTo(x0,y0); c.lineTo(ex,ey); c.stroke();
      c.strokeStyle=`rgba(255,255,235,${fl})`; c.lineWidth=2.5+Math.sin(t*60)*.6; c.beginPath(); c.moveTo(x0,y0); c.lineTo(ex,ey); c.stroke(); c.restore() }
    // ③ 갈라짐: 선을 따라 하얀빛이 넓게 벌어지고 금빛·주황 파편이 양쪽으로 터져요
    if(tau>1.38&&tau<2.05){ const p=(tau-1.38)/.67, op=1-Math.pow(1-Math.min(1,p*3),3), fade=p<.35?1:Math.max(0,1-(p-.35)/.65), w=H*.42*op;
      c.save(); c.globalCompositeOperation=GL; c.translate(cx,cy); c.rotate(ang);
      const bg=c.createLinearGradient(0,-w,0,w); bg.addColorStop(0,"rgba(255,120,30,0)"); bg.addColorStop(.35,`rgba(255,170,60,${.55*fade})`); bg.addColorStop(.5,`rgba(255,255,240,${fade})`); bg.addColorStop(.65,`rgba(255,170,60,${.55*fade})`); bg.addColorStop(1,"rgba(255,120,30,0)");
      c.fillStyle=bg; c.fillRect(-D,-w,D*2,w*2);
      for(let i=0;i<46;i++){ const u=(R(i)-.5)*2*D, side=i%2?1:-1, sp=(.25+R(i+50)*.75)*H*.55, d=sp*op*(1+p*.6), sz=(10+R(i+90)*28)*(1-p*.6), al=fade*(.6+R(i+130)*.4);
        c.fillStyle=i%3===0?`rgba(255,255,230,${al})`:i%3===1?`rgba(255,200,80,${al})`:`rgba(255,130,40,${al*.85})`; c.beginPath(); c.ellipse(u+(R(i+170)-.5)*40*p,side*d,sz,sz*.45,(R(i+210)-.5)*1.2,0,TAU); c.fill() }
      c.restore();
      if(p<.15){ c.fillStyle=`rgba(255,250,225,${(.15-p)/.15*.8})`; c.fillRect(0,0,W,H) } }
    // ④ 흩어지는 불티
    if(tau>1.6){ const p=Math.min(1,(tau-1.6)/.8); c.save(); c.globalCompositeOperation=GL; for(let i=0;i<60;i++){ const u=(R(i+300)-.5)*2*D, side=R(i+340)<.5?1:-1, d=(.2+R(i+380))*H*.5*(.5+p*.6), x=cx+ca*u+nx*side*d, y=cy+sa*u+ny*side*d+p*40, al=(1-p)*(.5+R(i+420)*.5);
      c.fillStyle=R(i+460)<.5?`rgba(255,220,120,${al})`:`rgba(255,255,230,${al})`; c.fillRect(x,y,2+R(i+500)*3,2+R(i+500)*3) } c.restore() } }
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
  const BI=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.windbow;
  if(BI){ c.restore(); return }   // 활은 다른 효과 위에 따로 그려요 (jfHurricaneBow)
  if(false){ const Hd=200, Wd=Hd*BI.width/BI.height, vib=0;
    c.save(); c.drawImage(BI,-Wd*.62+vib,-Hd/2,Wd,Hd); c.globalAlpha=k*(.3+.2*Math.sin(t*14)); c.drawImage(BI,-Wd*.62,-Hd/2,Wd,Hd); c.restore();
    drawWindArrow(c,40,0,0,150,k,true); jGlow(c,52,0,30,"180,255,220",.7*k); c.restore(); return }
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
  // 땅의 어둠 소용돌이 (제미나이 그림이 있으면 그림이 빙글빙글 돌아요)
  const VX=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.darkvortex;
  if(VX){ c.save(); c.scale(1,.45); c.translate(0,60/.45*.42); c.globalAlpha=k; c.rotate(-t*2.2); c.globalCompositeOperation=GL; c.drawImage(VX,-170,-170,340,340); c.globalAlpha=k*.35; c.rotate(t*.9); c.drawImage(VX,-130,-130,260,260); c.restore() }
  else {
  // 땅의 어둠 소용돌이
  c.save(); c.scale(1,.42); c.globalAlpha=k;
  const dg=c.createRadialGradient(0,60,4,0,60,150); dg.addColorStop(0,"rgba(20,0,40,.85)"); dg.addColorStop(.6,"rgba(80,20,150,.4)"); dg.addColorStop(1,"rgba(60,10,120,0)"); c.fillStyle=dg; c.beginPath(); c.arc(0,60,150,0,TAU); c.fill();
  c.globalCompositeOperation=GL; c.translate(0,60); c.rotate(-t*2.5); for(let i=0;i<6;i++){ c.rotate(TAU/6); c.strokeStyle="rgba(190,120,255,.6)"; c.lineWidth=3; c.beginPath(); c.arc(40,0,70,Math.PI*.8,Math.PI*1.3); c.stroke() }
  c.restore();
  }
  for(let i=0;i<10;i++){ const ph=(t*1.2+i/10)%1, a=i*2.4-t; c.fillStyle=`rgba(200,140,255,${(1-ph)*k})`; c.fillRect(Math.cos(a)*(110*(1-ph))-2,22+Math.sin(a)*(40*(1-ph))-ph*70-2,4,4) }
  c.translate(0,-46+bob); c.globalAlpha=k;
  // 번개 실선
  c.globalCompositeOperation=GL; jGlow(c,0,0,R*2.4,"150,70,255",.6);
  c.strokeStyle="rgba(230,200,255,.85)"; c.lineWidth=1.5; for(let i=0;i<3;i++){ const a0=jr(Math.floor(t*12),i)*TAU; c.beginPath(); let x=Math.cos(a0)*R*.6, y=Math.sin(a0)*R*.6; c.moveTo(x,y); for(let j=0;j<4;j++){ x+=Math.cos(a0)*R*.3+(jr(Math.floor(t*12),i*9+j)-.5)*20; y+=Math.sin(a0)*R*.3+(jr(Math.floor(t*12),i*7+j)-.5)*20; c.lineTo(x,y) } c.stroke() }
  c.globalCompositeOperation="source-over";
  // 거대한 4날 표창 (그림이 있으면 그림으로)
  if(typeof SKILL_IMG!=="undefined"&&SKILL_IMG.star){ c.save(); c.rotate(spin); drawSkillImg(c,"star",R*2.5,false); c.restore();
    for(let i=0;i<5;i++){ const a=m.a*1.4+i*TAU/5, x=Math.cos(a)*(R+26), y=Math.sin(a)*(R+26)*.45; c.save(); c.translate(x,y); c.rotate(t*24); jfStarShape(c,8,"#e4d8ff","#6a3ab8"); c.restore() }
    c.restore(); return }
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
  if(typeof SKILL_IMG!=="undefined"&&SKILL_IMG.ship){ const im=SKILL_IMG.ship, w=430, h=w*im.height/im.width;
    if(fire){ c.save(); c.globalCompositeOperation=GL; for(let i=0;i<4;i++){ const k=(t*3+i/4)%1; jGlow(c,-120+i*70,30,26*(1-k)+6,"255,190,90",.7*(1-k)) } c.restore() }
    c.save(); c.rotate(Math.sin(t*3)*.03); c.drawImage(im,-w*.55,-h*.72,w,h); c.restore(); return }
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
  { const im=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.chest_c; if(im){ const w=96, h=w*im.height/im.width, pu=.5+.5*Math.sin(t*4);
    /* 어느 맵에서도 잘 보이게: 하늘로 솟는 금빛 기둥 + 바닥 고리 + 금빛 테두리 + "보물상자" 글씨 */
    c.save(); c.globalCompositeOperation="lighter"; const lg=c.createLinearGradient(0,y-260,0,y+20); lg.addColorStop(0,"rgba(255,220,120,0)"); lg.addColorStop(.7,`rgba(255,220,120,${.22+.12*pu})`); lg.addColorStop(1,`rgba(255,240,180,${.45+.2*pu})`); const GP=SKILL_IMG.goldpillar; if(GP){ const pw=130, ph=pw*GP.height/GP.width*(1+.06*pu); c.globalAlpha=.75+.25*pu; c.drawImage(GP,x-pw/2,y+30-ph,pw,ph); c.globalAlpha=1 } else { c.fillStyle=lg; c.fillRect(x-26,y-260,52,280) }
    const GR=SKILL_IMG.goldring; if(GR){ const rw=150, rh=rw*GR.height/GR.width; c.globalAlpha=.7+.3*pu; c.drawImage(GR,x-rw/2,y+24-rh/2,rw,rh); const q=(t*.6)%1, s2=1+q*.7; c.globalAlpha=.55*(1-q); c.drawImage(GR,x-rw*s2/2,y+24-rh*s2/2,rw*s2,rh*s2); c.globalAlpha=1 } else for(let k=0;k<2;k++){ const q=(t*.7+k*.5)%1; c.strokeStyle=`rgba(255,215,110,${.85*(1-q)})`; c.lineWidth=4; c.beginPath(); c.ellipse(x,y+22,30+q*60,10+q*20,0,0,TAU); c.stroke() } c.restore();
    c.save(); c.shadowColor="#ffd36a"; c.shadowBlur=18+10*pu; c.drawImage(im,x-w/2,y+26-h+b,w,h); c.restore();
    { const SP=SKILL_IMG.goldspark; if(SP) for(let k=0;k<2;k++){ const q=(t*.55+k*.5)%1, sz=(50+60*Math.sin(q*Math.PI))*(k?.7:1); c.save(); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.sin(q*Math.PI)*.9; c.translate(x+(k?-24:20),y+26-h*.75+b); c.rotate(t*.6*(k?-1:1)); c.drawImage(SP,-sz/2,-sz/2,sz,sz); c.restore() } }   /* 반짝반짝 */
    c.save(); c.font='bold 17px "Do Hyeon",sans-serif'; c.textAlign="center"; c.lineWidth=4; c.strokeStyle="#3a2200"; const ty=y+26-h+b-12-4*pu; c.strokeText("🎁 보물상자",x,ty); c.fillStyle="#ffe9a0"; c.fillText("🎁 보물상자",x,ty); c.restore(); return } }
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

/* ===== 그림풍 공격 효과: 처음 한 번만 공들여 그려 두고(진한 테두리·명암·빛) 돌려서 붙여요 → 렉 거의 없음 ===== */
const PFX={};
function pfxMake(key,W,H,fn){ if(PFX[key]) return PFX[key]; const S=2, cv=document.createElement("canvas"); cv.width=W*S; cv.height=H*S; const c=cv.getContext("2d"); c.scale(S,S); c.translate(W/2,H/2); c.lineJoin="round"; c.lineCap="round"; fn(c); return PFX[key]={cv,W,H} }
/* 빙설맵 얼음 그림: 제미나이 그림이 읽히면 손으로 그린 얼음 대신 써요 */
function iceArt(){ if(PFX._iceArt||typeof SKILL_IMG==="undefined") return; const I=SKILL_IMG.ice_icicle, S=SKILL_IMG.ice_spike, B=SKILL_IMG.ice_snowball; if(!I||!S||!B) return; PFX._iceArt=1;
  const put=(key,img,W,H,align,fit)=>{ const sc=2, cv=document.createElement("canvas"); cv.width=W*sc; cv.height=H*sc; const c=cv.getContext("2d"), f=fit||1, r=Math.min(W/img.width,H/img.height)*f, w=img.width*r, h=img.height*r, x=(W-w)/2, y=align==="bottom"?H-h:align==="top"?0:(H-h)/2; c.drawImage(img,x*sc,y*sc,w*sc,h*sc); PFX[key]={cv,W,H} };
  put("icicle_big",I,44,120,"top"); put("icespike",S,70,84,"bottom"); put("snowball",B,44,44,"center",.82) }
function pfxDraw(c,key,x,y,a,sc,alpha){ if(!PFX._iceArt&&(key==="icespike"||key==="icicle_big"||key==="snowball")) iceArt(); const P=PFX[key]; if(!P) return; c.save(); c.translate(x,y); if(a) c.rotate(a); if(sc&&sc!==1) c.scale(sc,sc); if(alpha!==undefined) c.globalAlpha*=alpha; c.drawImage(P.cv,-P.W/2,-P.H/2,P.W,P.H); c.restore() }
const pfxR=(i,j)=>{ const v=Math.sin(i*127.1+j*311.7)*43758.5453; return v-Math.floor(v) };
function pfxFlame(c,x,y,len,wid,ang,cols,ol){ c.save(); c.translate(x,y); c.rotate(ang);
  const path=()=>{ c.beginPath(); c.moveTo(0,-wid); c.bezierCurveTo(len*.35,-wid*1.1,len*.6,-wid*.5,len,0); c.bezierCurveTo(len*.6,wid*.4,len*.3,wid*1.05,0,wid); c.closePath() };
  if(ol){ c.lineWidth=2.2; c.strokeStyle=ol; path(); c.stroke() }
  const g=c.createLinearGradient(0,0,len,0); cols.forEach((col,i)=>g.addColorStop(i/(cols.length-1),col)); c.fillStyle=g; path(); c.fill(); c.restore() }
function pfxInit(){ if(PFX._ok) return; PFX._ok=1;
  // 화염구 (4장: 불꽃이 일렁여요) · 오른쪽으로 날아가는 모양
  for(let f=0;f<4;f++) pfxMake("fire"+f,140,60,c=>{ c.translate(36,0);
    const tongue=(x,y,L,w,col0,col1,ph)=>{ c.save(); c.translate(x,y); const g=c.createLinearGradient(0,0,-L,0); g.addColorStop(0,col0); g.addColorStop(1,col1); c.fillStyle=g;
      c.beginPath(); c.moveTo(0,-w); c.bezierCurveTo(-L*.3,-w*1.3+Math.sin(ph)*3,-L*.65,-w*.2+Math.cos(ph)*4,-L,Math.sin(ph*1.7)*w*.6); c.bezierCurveTo(-L*.6,w*.4+Math.sin(ph)*3,-L*.3,w*1.2,0,w); c.closePath(); c.fill(); c.restore() };
    c.globalCompositeOperation="source-over";
    for(let i=0;i<5;i++) tongue(2,(pfxR(f,i)-.5)*16,40+pfxR(i,f)*30,9+pfxR(i+3,f)*4,"rgba(230,60,15,.9)","rgba(120,10,10,0)",f*1.6+i*2);
    for(let i=0;i<5;i++) tongue(2,(pfxR(f+5,i)-.5)*12,30+pfxR(i,f+2)*20,7,"rgba(255,150,30,.95)","rgba(255,60,10,0)",f*1.6+i*3+1);
    for(let i=0;i<3;i++) tongue(2,(pfxR(f+9,i)-.5)*8,18+pfxR(i,f+4)*12,5,"rgba(255,245,170,.95)","rgba(255,170,40,0)",f*2+i);
    const r=14; c.lineWidth=2.5; c.strokeStyle="rgba(110,20,5,.8)"; c.beginPath(); c.arc(0,0,r,0,7); c.stroke();
    const g=c.createRadialGradient(-3,-4,1,0,0,r); g.addColorStop(0,"#ffffff"); g.addColorStop(.3,"#fff3a0"); g.addColorStop(.7,"#ffa21a"); g.addColorStop(1,"#e0420e"); c.fillStyle=g; c.beginPath(); c.arc(0,0,r,0,7); c.fill();
    c.fillStyle="rgba(255,255,255,.85)"; c.beginPath(); c.ellipse(-4,-5,4.5,2.6,-.5,0,7); c.fill() });
  // 화살 (바람이 감긴)
  // 화살: 용사 그림체(진한 갈색 외곽선 · 손그림 명암) — 나무 화살대 · 강철 잎촉 · 진짜 깃털
  for(const gl of [0,1]) pfxMake("arrow"+gl,104,30,c=>{
    if(gl){ // 바람이 감긴 화살: 초승달 바람 결 몇 줄
      for(let i=0;i<3;i++){ const x0=-48+i*16, w=10-i*2; c.strokeStyle=`rgba(170,255,225,${.32+i*.14})`; c.lineWidth=2.2-i*.4; c.beginPath(); c.moveTo(x0,-w); c.quadraticCurveTo(x0+12,0,x0,w); c.stroke() }
      const tg=c.createLinearGradient(-50,0,10,0); tg.addColorStop(0,"rgba(140,255,210,0)"); tg.addColorStop(1,"rgba(200,255,235,.55)"); c.fillStyle=tg; c.beginPath(); c.moveTo(-50,0); c.quadraticCurveTo(-10,-5,12,0); c.quadraticCurveTo(-10,5,-50,0); c.fill() }
    // 깃털 (뒤쪽, 위·아래 두 장 + 가운데 한 장 살짝)
    const feather=(s,col,tip)=>{ c.save(); c.scale(1,s);
      c.fillStyle="#3a2414"; c.beginPath(); c.moveTo(-14,-.8); c.bezierCurveTo(-18,-6.5,-28,-9,-38,-8.5); c.lineTo(-35,-4.5); c.lineTo(-39,-3.2); c.lineTo(-33,-.8); c.closePath(); c.fill();
      const fg=c.createLinearGradient(0,-8,0,0); fg.addColorStop(0,tip); fg.addColorStop(.55,col); fg.addColorStop(1,"#f4efe2"); c.fillStyle=fg;
      c.beginPath(); c.moveTo(-15.5,-1.4); c.bezierCurveTo(-19,-5.8,-27.5,-7.6,-36.5,-7.3); c.lineTo(-33.8,-4.4); c.lineTo(-36.8,-3.1); c.lineTo(-32,-1.4); c.closePath(); c.fill();
      c.strokeStyle="rgba(60,40,25,.45)"; c.lineWidth=.6; for(let x=-31;x<-17;x+=2.6){ c.beginPath(); c.moveTo(x,-1.5); c.lineTo(x-3.2,-5.6+(x+31)*.12); c.stroke() }
      c.strokeStyle="rgba(255,255,255,.7)"; c.lineWidth=.8; c.beginPath(); c.moveTo(-17,-2.6); c.quadraticCurveTo(-24,-5.2,-33,-5.6); c.stroke(); c.restore() };
    feather(-1,gl?"#9fe6c4":"#c9d6c4",gl?"#2f9c78":"#556b52"); feather(1,gl?"#9fe6c4":"#c9d6c4",gl?"#2f9c78":"#556b52");
    // 화살대: 외곽선 → 나무색 → 결 → 윗면 하이라이트
    c.lineCap="butt"; c.strokeStyle="#2b1709"; c.lineWidth=4.2; c.beginPath(); c.moveTo(-40,0); c.lineTo(28,0); c.stroke();
    const sg=c.createLinearGradient(0,-1.6,0,1.6); sg.addColorStop(0,"#e9c48a"); sg.addColorStop(.5,"#b27a42"); sg.addColorStop(1,"#6e4220"); c.strokeStyle=sg; c.lineWidth=2.4; c.beginPath(); c.moveTo(-39,0); c.lineTo(27,0); c.stroke();
    c.strokeStyle="rgba(90,50,20,.55)"; c.lineWidth=.5; for(const [a,b] of [[-30,-12],[-6,10],[14,24]]){ c.beginPath(); c.moveTo(a,.5); c.lineTo(b,.3); c.stroke() }
    c.strokeStyle="rgba(255,240,210,.7)"; c.lineWidth=.7; c.beginPath(); c.moveTo(-36,-.8); c.lineTo(24,-.8); c.stroke();
    // 오늬(끝 홈) · 깃 묶음 실 · 촉 묶음 실
    c.fillStyle="#2b1709"; c.fillRect(-43,-2.4,4,4.8); c.fillStyle="#8a2e24"; c.fillRect(-42.2,-1.6,2.6,3.2);
    for(const x of [-34,-15,22]){ c.fillStyle="#2b1709"; c.fillRect(x-.6,-2.6,3.8,5.2); c.fillStyle=gl?"#3fbf93":"#b0402e"; c.fillRect(x,-2,2.6,4); c.fillStyle="rgba(255,255,255,.35)"; c.fillRect(x,-2,2.6,1) }
    // 강철 잎 모양 촉
    c.fillStyle="#1d1a1c"; c.beginPath(); c.moveTo(45,0); c.bezierCurveTo(40,-4,33,-6.8,25,-5.4); c.lineTo(27.5,0); c.lineTo(25,5.4); c.bezierCurveTo(33,6.8,40,4,45,0); c.closePath(); c.fill();
    const hg=c.createLinearGradient(30,-5,34,5); hg.addColorStop(0,"#ffffff"); hg.addColorStop(.35,"#d7dde6"); hg.addColorStop(.6,"#8f99a8"); hg.addColorStop(1,"#4b5462"); c.fillStyle=hg;
    c.beginPath(); c.moveTo(43.2,0); c.bezierCurveTo(38.5,-3.2,32.5,-5.4,26.6,-4.3); c.lineTo(28.8,0); c.lineTo(26.6,4.3); c.bezierCurveTo(32.5,5.4,38.5,3.2,43.2,0); c.closePath(); c.fill();
    c.strokeStyle="rgba(40,45,55,.7)"; c.lineWidth=.7; c.beginPath(); c.moveTo(28.8,0); c.lineTo(43,0); c.stroke();
    c.strokeStyle="rgba(255,255,255,.9)"; c.lineWidth=.9; c.beginPath(); c.moveTo(30,-1.2); c.quadraticCurveTo(36,-2.6,41,-.8); c.stroke();
    if(gl){ const g=c.createRadialGradient(40,0,0,40,0,11); g.addColorStop(0,"rgba(230,255,245,.8)"); g.addColorStop(1,"rgba(120,255,200,0)"); c.fillStyle=g; c.beginPath(); c.arc(40,0,11,0,7); c.fill() } });
  // 표창 (은빛 · 보랏빛)
  for(const dk of [0,1]) pfxMake("star"+dk,44,44,c=>{ const R=19;
    const blade=()=>{ c.beginPath(); for(let i=0;i<4;i++){ const a=i*Math.PI/2; c.lineTo(Math.cos(a)*R,Math.sin(a)*R); c.quadraticCurveTo(Math.cos(a+.35)*R*.62,Math.sin(a+.35)*R*.62,Math.cos(a+Math.PI/4)*R*.36,Math.sin(a+Math.PI/4)*R*.36); c.quadraticCurveTo(Math.cos(a+1.3)*R*.4,Math.sin(a+1.3)*R*.4,Math.cos(a+Math.PI/2)*R,Math.sin(a+Math.PI/2)*R) } c.closePath() };
    c.lineWidth=3.2; c.strokeStyle=dk?"#1a0a30":"#1b1f2c"; blade(); c.stroke();
    const g=c.createLinearGradient(-R,-R,R,R); if(dk){ g.addColorStop(0,"#efe0ff"); g.addColorStop(.45,"#9a62f0"); g.addColorStop(1,"#3a1478") } else { g.addColorStop(0,"#ffffff"); g.addColorStop(.45,"#b8c2d8"); g.addColorStop(1,"#4a5470") } c.fillStyle=g; blade(); c.fill();
    c.strokeStyle=dk?"rgba(255,230,255,.8)":"rgba(255,255,255,.85)"; c.lineWidth=1.2; for(let i=0;i<4;i++){ const a=i*Math.PI/2; c.beginPath(); c.moveTo(Math.cos(a+.3)*5,Math.sin(a+.3)*5); c.lineTo(Math.cos(a)*R*.9,Math.sin(a)*R*.9); c.stroke() }
    c.fillStyle=dk?"#2a0a48":"#2a3040"; c.beginPath(); c.arc(0,0,5.5,0,7); c.fill(); c.strokeStyle=dk?"#e0b0ff":"#f6c544"; c.lineWidth=1.8; c.stroke(); c.fillStyle=dk?"#ff70c0":"#fff4c0"; c.beginPath(); c.arc(0,0,2,0,7); c.fill() });
  // 총알 (금빛 탄 + 빛꼬리)
  pfxMake("bullet",64,20,c=>{ const g=c.createLinearGradient(-30,0,10,0); g.addColorStop(0,"rgba(255,180,60,0)"); g.addColorStop(1,"rgba(255,240,170,.9)"); c.fillStyle=g; c.beginPath(); c.moveTo(-30,0); c.lineTo(8,-4); c.lineTo(8,4); c.closePath(); c.fill();
    c.lineWidth=2.4; c.strokeStyle="#3a2006"; const shape=()=>{ c.beginPath(); c.moveTo(-2,-4); c.lineTo(10,-4); c.quadraticCurveTo(20,-3,22,0); c.quadraticCurveTo(20,3,10,4); c.lineTo(-2,4); c.closePath() }; shape(); c.stroke();
    const bg=c.createLinearGradient(0,-4,0,4); bg.addColorStop(0,"#fff6c0"); bg.addColorStop(.4,"#f6c544"); bg.addColorStop(1,"#9a6510"); c.fillStyle=bg; shape(); c.fill();
    c.fillStyle="rgba(255,255,255,.9)"; c.fillRect(2,-3,12,1.4) });
  // 회오리 칼날 (초록 바람 초승달)
  pfxMake("wind",60,60,c=>{ const arc=(r1,r2,a0,a1)=>{ c.beginPath(); c.arc(0,0,r1,a0,a1); c.arc(-3,-2,r2,a1-.15,a0+.2,true); c.closePath() };
    c.lineWidth=3; c.strokeStyle="#0c3a28"; arc(24,16,-.3,Math.PI*1.35); c.stroke();
    const g=c.createLinearGradient(-24,-24,24,24); g.addColorStop(0,"#d8fff0"); g.addColorStop(.4,"#4fe0a0"); g.addColorStop(1,"#167a52"); c.fillStyle=g; arc(24,16,-.3,Math.PI*1.35); c.fill();
    c.strokeStyle="rgba(255,255,255,.9)"; c.lineWidth=2; c.beginPath(); c.arc(0,0,22,0,Math.PI*1.2); c.stroke();
    c.strokeStyle="rgba(180,255,220,.7)"; c.lineWidth=1.4; for(let i=0;i<3;i++){ c.beginPath(); c.arc(0,0,10+i*3,i,i+2.2); c.stroke() } });
  // 얼음 조각
  pfxMake("ice",48,26,c=>{ const pts=[[22,0],[6,-9],[-14,-5],[-20,0],[-14,5],[6,9]];
    c.lineWidth=2.6; c.strokeStyle="#0e3460"; c.beginPath(); pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y)); c.closePath(); c.stroke();
    const g=c.createLinearGradient(-20,-8,22,8); g.addColorStop(0,"#5aa8f0"); g.addColorStop(.5,"#bfeaff"); g.addColorStop(1,"#3a7ad0"); c.fillStyle=g; c.fill();
    c.fillStyle="rgba(255,255,255,.85)"; c.beginPath(); c.moveTo(22,0); c.lineTo(6,-9); c.lineTo(2,-1); c.closePath(); c.fill();
    c.fillStyle="rgba(30,90,170,.45)"; c.beginPath(); c.moveTo(22,0); c.lineTo(6,9); c.lineTo(2,1); c.closePath(); c.fill();
    c.strokeStyle="rgba(255,255,255,.8)"; c.lineWidth=1; c.beginPath(); c.moveTo(-14,-2); c.lineTo(4,-2); c.stroke() });
  // 대검 베기 반달 (흰 칼바람)
  pfxMake("slash",120,120,c=>{ const R=52;
    const sh=(w)=>{ c.beginPath(); c.arc(0,0,R,-1.25,1.25); c.arc(-w,0,R-4,1.15,-1.15,true); c.closePath() };
    const g=c.createLinearGradient(0,-R,0,R); g.addColorStop(0,"rgba(255,255,255,0)"); g.addColorStop(.25,"rgba(200,230,255,.75)"); g.addColorStop(.6,"rgba(255,255,255,.95)"); g.addColorStop(1,"rgba(255,240,180,0)"); c.fillStyle=g; sh(16); c.fill();
    c.strokeStyle="rgba(255,255,255,.95)"; c.lineWidth=3; c.beginPath(); c.arc(0,0,R,-1.1,1.1); c.stroke();
    c.strokeStyle="rgba(120,180,255,.6)"; c.lineWidth=1.5; c.beginPath(); c.arc(-6,0,R-6,-.9,.9); c.stroke() });
}
/* 수호 바위: 룬이 새겨진 보랏빛 돌 */
function pfxInit2(){ if(PFX._ok2) return; PFX._ok2=1;
  pfxMake("stone",44,44,c=>{ const pts=[]; for(let i=0;i<9;i++){ const a=i/9*6.283, r=16+pfxR(i,4)*3.5; pts.push([Math.cos(a)*r,Math.sin(a)*r]) }
    const path=()=>{ c.beginPath(); pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y)); c.closePath() };
    c.lineWidth=3; c.strokeStyle="#1c1630"; path(); c.stroke();
    const g=c.createRadialGradient(-6,-7,2,0,0,20); g.addColorStop(0,"#c8bce8"); g.addColorStop(.55,"#6c5a9a"); g.addColorStop(1,"#2e2450"); c.fillStyle=g; path(); c.fill();
    c.fillStyle="rgba(255,255,255,.35)"; c.beginPath(); c.ellipse(-6,-8,7,3.5,-.5,0,7); c.fill();
    c.strokeStyle="#a8f0ff"; c.lineWidth=2; c.shadowColor="#7ae0ff"; c.shadowBlur=6; c.beginPath(); c.moveTo(-6,-6); c.lineTo(0,4); c.lineTo(6,-6); c.moveTo(0,4); c.lineTo(0,10); c.moveTo(-5,0); c.lineTo(5,0); c.stroke() });
}
/* 화염 고리 불꽃 · 폭발 · 독 구름 (그림풍) */
function pfxInit3(){ if(PFX._ok3) return; PFX._ok3=1;
  // 불꽃 한 줄기 (4장, 위로 타오름)
  for(let f=0;f<4;f++) pfxMake("flame"+f,34,56,c=>{ c.translate(0,20);
    const tongue=(w,h,sk,cols,ol)=>{ const path=()=>{ c.beginPath(); c.moveTo(-w,0); c.bezierCurveTo(-w*1.1,-h*.45,-w*.2+sk,-h*.6,sk*1.6,-h); c.bezierCurveTo(w*.3+sk,-h*.55,w*1.15,-h*.4,w,0); c.quadraticCurveTo(0,w*.7,-w,0); c.closePath() };
      if(ol){ c.lineWidth=2.2; c.strokeStyle=ol; path(); c.stroke() } const g=c.createLinearGradient(0,0,0,-h); cols.forEach((cl,i)=>g.addColorStop(i/(cols.length-1),cl)); c.fillStyle=g; path(); c.fill() };
    const sk=[-3,2,4,-2][f];
    tongue(12,40+f%2*4,sk,["#c8300c","#ff5a1a","rgba(255,120,30,.9)"],"rgba(90,15,5,.85)");
    tongue(8,30-f%2*3,-sk*.7,["#ff8a1a","#ffc23a","rgba(255,220,90,.9)"],null);
    tongue(4.5,17,sk*.4,["#fffbe0","#fff09a","rgba(255,230,120,.8)"],null) });
  // 폭발 (색 4가지 × 6장)
  const PAL={fire:["#fffbe0","#ffd23a","#ff6a1a","#c0280a","#4a1a10"],purple:["#fff0ff","#e0a8ff","#a050f0","#5a20a0","#26103a"],green:["#f0fff0","#b8ffb0","#40d080","#127a44","#0e2a1a"],gold:["#fffff0","#fff0a0","#f6c544","#b8871a","#3a2a08"],blue:["#ffffff","#c0ecff","#4aa8ff","#1a4ab0","#0a1a40"],moon:["#ffffff","#f2f5ff","#c4d2ff","#7484d0","#232a50"]};
  for(const p in PAL) for(let f=0;f<6;f++) pfxMake("boom_"+p+f,128,128,c=>{ const C=PAL[p], q=f/5, R=24+q*30, hx=h=>{ const n=parseInt(h.slice(1),16); return [(n>>16)&255,(n>>8)&255,n&255].join(",") }, c1=hx(C[1]), c2=hx(C[2]), c3=hx(C[3]);
    // 1) 부드러운 연기 (뒤쪽, 번지게)
    if(q>.15){ c.save(); c.filter="blur(3px)"; const sm=p==="fire"?"60,44,40":p==="purple"?"52,36,74":p==="green"?"36,62,44":p==="blue"?"40,52,80":"76,66,40";
      for(let i=0;i<9;i++){ const a=i/9*6.283+pfxR(i,1), d=R*(.5+pfxR(i,2)*.35)*(.9+q*.3), r=R*(.3+pfxR(i,3)*.16)*(.8+q*.6); c.fillStyle=`rgba(${sm},${.68*(1-q*.6)})`; c.beginPath(); c.arc(Math.cos(a)*d,Math.sin(a)*d*.85-q*10,r,0,7); c.fill() } c.restore() }
    // 2) 불덩이: 부드러운 공 모양 (번짐 + 또렷한 속)
    const fr=R*(q>.6?1.2-(q-.6)*1.7:.95+q*.4);
    if(fr>3){ c.save(); c.filter="blur(5px)"; const g0=c.createRadialGradient(0,0,0,0,0,fr*1.25); g0.addColorStop(0,`rgba(${c1},${1-q*.5})`); g0.addColorStop(.55,`rgba(${c2},${.75*(1-q*.6)})`); g0.addColorStop(1,`rgba(${c3},0)`); c.fillStyle=g0; c.beginPath(); c.arc(0,0,fr*1.25,0,7); c.fill(); c.restore();
      for(let i=0;i<7;i++){ const a=i/7*6.283+pfxR(i,f+4)*.6, d=fr*.45, r=fr*(.42+pfxR(i,f+7)*.18); const g1=c.createRadialGradient(Math.cos(a)*d,Math.sin(a)*d,0,Math.cos(a)*d,Math.sin(a)*d,r); g1.addColorStop(0,`rgba(${c1},${.85*(1-q*.7)})`); g1.addColorStop(.6,`rgba(${c2},${.55*(1-q*.7)})`); g1.addColorStop(1,`rgba(${c3},0)`); c.fillStyle=g1; c.beginPath(); c.arc(Math.cos(a)*d,Math.sin(a)*d,r,0,7); c.fill() }
      const ir=fr*.55*Math.max(0,1-q*1.25); if(ir>2){ const g2=c.createRadialGradient(0,0,0,0,0,ir); g2.addColorStop(0,"rgba(255,255,255,1)"); g2.addColorStop(.5,C[0]); g2.addColorStop(1,"rgba(255,255,255,0)"); c.fillStyle=g2; c.beginPath(); c.arc(0,0,ir,0,7); c.fill() } }
    // 3) 처음 순간의 빛살 (가늘고 길게)
    if(q<.45){ const L=R*(1.5+q*.8), al=1-q/.45; c.save(); c.globalAlpha=al; for(let i=0;i<8;i++){ const a=i*.785+pfxR(i,f)*.2, l=L*(i%2?.55:1); c.save(); c.rotate(a); const gr=c.createLinearGradient(0,0,l,0); gr.addColorStop(0,"rgba(255,255,255,.95)"); gr.addColorStop(.4,`rgba(${c1},.7)`); gr.addColorStop(1,`rgba(${c2},0)`); c.fillStyle=gr; c.beginPath(); c.moveTo(0,-2.4); c.lineTo(l,0); c.lineTo(0,2.4); c.closePath(); c.fill(); c.restore() } c.restore() }
    // 4) 튀는 불티 (짧은 꼬리)
    for(let i=0;i<12;i++){ const a=i/12*6.283+pfxR(i,9)*.5, d=R*(.55+q*1.05)*(.7+pfxR(i,8)*.5), z=2.4*(1-q*.6), tl=6+10*(1-q); c.save(); c.rotate(a); c.translate(d,0); const gr=c.createLinearGradient(-tl,0,z,0); gr.addColorStop(0,`rgba(${c2},0)`); gr.addColorStop(1,i%3?"rgba(255,255,255,.95)":C[1]); c.fillStyle=gr; c.beginPath(); c.moveTo(-tl,-z*.5); c.lineTo(z,0); c.lineTo(-tl,z*.5); c.closePath(); c.fill(); c.restore() } });
  // 독 구름 덩어리 · 물방울
  for(const cl of ["p","g"]) pfxMake("puff"+cl,80,64,c=>{ const C=cl==="p"?["#e8c8ff","#a060e0","#5a2a98","#2a1048"]:["#e0ffd0","#7ad860","#3a8a3a","#143a18"];
    const blobs=[[-14,4,18],[6,-4,20],[20,6,14],[-2,10,16]]; const path=()=>{ c.beginPath(); blobs.forEach(([x,y,r])=>{ c.moveTo(x+r,y); c.arc(x,y,r,0,7) }) };
    c.lineWidth=2; c.strokeStyle=C[3]+"88"; path(); c.stroke(); const g=c.createLinearGradient(0,-24,0,24); g.addColorStop(0,C[0]); g.addColorStop(.45,C[1]); g.addColorStop(1,C[2]); c.fillStyle=g; path(); c.fill();
    c.fillStyle="rgba(255,255,255,.45)"; c.beginPath(); c.ellipse(2,-14,10,4,-.2,0,7); c.fill() });
  pfxMake("bubble",16,16,c=>{ c.lineWidth=1.6; c.strokeStyle="#2a5a20"; c.fillStyle="rgba(170,255,140,.55)"; c.beginPath(); c.arc(0,0,5.5,0,7); c.fill(); c.stroke(); c.fillStyle="#fff"; c.beginPath(); c.arc(-2,-2,1.5,0,7); c.fill() });
}
function pfxCol(col){ col=(col||"").toLowerCase(); const m=/^#([0-9a-f]{6})$/.exec(col); if(!m) return "fire"; const n=parseInt(m[1],16), r=n>>16, g=(n>>8)&255, b=n&255;   /* 폭발 색: 글자 목록 대신 실제 색으로 판단 (파란·보라 폭발이 빨갛게 나오지 않게) */
  if(r>200&&g>210&&b>230) return "moon"; if(b>r+30&&b>=g-20) return r>g+20?"purple":"blue"; if(r>g&&b>g+30) return "purple"; if(g>r+30&&g>b) return "green"; if(r>200&&g>160&&b<150) return "gold"; return "fire" }
function pfxBoom(c,f,k){ const P=PFX.boom_fire0; if(!P) return false; const p=pfxCol(f.col);
  const q=1-k, fi=Math.min(5,Math.floor(q*6)), sc=f.r/56; pfxDraw(c,"boom_"+p+fi,f.x,f.y,(f.x*.013)%6.28,sc*1.15,Math.min(1,k*2.2));
  if(q<.7){ const rr=f.r*(.5+q*1.1), al=(1-q/.7)*.8, RC={fire:"255,200,120",purple:"220,170,255",green:"190,255,200",gold:"255,240,170",blue:"190,230,255",moon:"235,240,255"}[p]||"255,230,190"; c.save(); c.strokeStyle=`rgba(${RC},${al})`; c.lineWidth=3*(1-q)+1; c.beginPath(); c.ellipse(f.x,f.y,rr,rr*.72,0,0,7); c.stroke(); c.restore() }
  return true }
function pfxRing(c,P,R,t){ for(let i=0;i<16;i++){ const a=t*1.8+i*Math.PI/8, fx=P.x+Math.cos(a)*R, fy=P.y+Math.sin(a)*R*.9; pfxDraw(c,"flame"+((Math.floor(t*12)+i)&3),fx,fy-10,0,.75+.15*Math.sin(t*9+i)) } }
function pfxRain(c,z,t){ const k=Math.min(1,z.t/.4,(z.max-z.t)/.25+.2), s=(z.x*7+z.y*3)|0;
  const RI=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.windrain;
  if(RI&&SKILL_IMG.windarrow){ const Wd=z.r*2/.81, Hd=Wd*RI.height/RI.width; { const D=typeof warnTex==="function"&&warnTex("windrain","#0e6a48"); c.save();   // 진한 초록 밑그림 (밝은 바닥에서도 또렷하게)
      if(D){ c.globalAlpha=k*.55; c.drawImage(D,z.x-Wd*.496,z.y-Hd*.784,Wd,Hd) }
      c.translate(z.x,z.y); c.scale(1,.6); c.fillStyle=`rgba(40,200,130,${.16*k})`; c.beginPath(); c.arc(0,0,z.r,0,TAU); c.fill(); c.strokeStyle=`rgba(200,255,225,${.85*k})`; c.lineWidth=3; c.beginPath(); c.arc(0,0,z.r,0,TAU); c.stroke(); c.restore() }
    c.save(); c.globalCompositeOperation="lighter"; c.globalAlpha=k; c.drawImage(RI,z.x-Wd*.496,z.y-Hd*.784,Wd,Hd); c.globalAlpha=k*(.45+Math.sin(t*9)*.1); c.drawImage(RI,z.x-Wd*.496,z.y-Hd*.784,Wd,Hd); c.restore();
    c.save(); c.globalCompositeOperation="lighter"; for(let i=0;i<22;i++){ const sp=2.6+jr(s,i)*1.2, ph=(t*sp+jr(s,i+30))%1, cyc=Math.floor(t*sp+jr(s,i+30)), a=jr(s+cyc,i)*TAU, d=Math.sqrt(jr(s+cyc,i+50))*z.r*.9, gx=z.x+Math.cos(a)*d, gy=z.y+Math.sin(a)*d*.6;
      if(ph<.85){ const p=ph/.85; drawWindArrow(c,gx+60*(1-p),gy-220*(1-p),1.84,90,k*Math.min(1,p*4)) }
      else { const p=(ph-.85)/.15; c.strokeStyle=`rgba(180,255,210,${(1-p)*k})`; c.lineWidth=2; c.beginPath(); c.ellipse(gx,gy,4+p*16,(4+p*16)*.45,0,0,TAU); c.stroke() } } c.restore(); return }
  c.save(); c.translate(z.x,z.y);
  c.save(); c.scale(1,.6); c.strokeStyle=`rgba(150,255,200,${.6*k})`; c.lineWidth=2.5; c.beginPath(); c.arc(0,0,z.r,0,TAU); c.stroke(); c.restore();
  for(let i=0;i<20;i++){ const sp=2.6+jr(s,i)*1.2, ph=(t*sp+jr(s,i+30))%1, cyc=Math.floor(t*sp+jr(s,i+30)), a=jr(s+cyc,i)*TAU, d=Math.sqrt(jr(s+cyc,i+50))*z.r*.9, gx=Math.cos(a)*d, gy=Math.sin(a)*d*.6;
    if(ph<.85){ const p=ph/.85; pfxDraw(c,"arrow1",gx+40*(1-p),gy-160*(1-p),1.82,.8,k) }
    else { const p=(ph-.85)/.15; c.strokeStyle=`rgba(180,255,210,${(1-p)*k})`; c.lineWidth=2; c.beginPath(); c.ellipse(gx,gy,4+p*14,(4+p*14)*.45,0,0,TAU); c.stroke() } }
  c.restore() }
function pfxMist(c,z,t){ if(drawMistArt(c,z,t)) return; const k=Math.min(1,z.t/.5,(z.max-z.t)/.4+.15), s=(z.x*5+z.y*11)|0; c.save(); c.translate(z.x,z.y);
  for(let i=0;i<9;i++){ const a=jr(s,i)*TAU+t*(.3+jr(s,i+9)*.4)*(i%2?1:-1), d=z.r*(.15+.55*jr(s,i+20)), sc=z.r/80*(.8+.3*jr(s,i+30))*(1+.06*Math.sin(t*2+i));
    pfxDraw(c,i%3===0?"puffg":"puffp",Math.cos(a)*d,Math.sin(a)*d*.6,0,sc,.38*k) }
  for(let i=0;i<10;i++){ const ph=(t*.8+jr(s,i+50))%1; pfxDraw(c,"bubble",(jr(s,i+60)-.5)*z.r*1.4,(jr(s,i+70)-.5)*z.r*.8-ph*40,0,.8+ph*.4,(1-ph)*k) }
  c.restore() }
/* ===== 보스 검기 · 충격파 (맵마다 색과 느낌이 달라요) ===== */
const WAVE_PAL={1:["#fff0f6","#ff8fb8","#c0306a"],2:["#f0ffe0","#7ad860","#2a6a1a"],3:["#fff6d8","#f0b860","#8a4a1a"],4:["#e8f4ff","#6ab8ff","#1a3a8a"],5:["#fff4c0","#ff7a2a","#7a1008"],
  6:["#ffffff","#8ae8ff","#1a6a9a"],7:["#ffffff","#ffe08a","#a87a1a"],8:["#eefaff","#4aa8f0","#163e80"],9:["#ffffff","#ffe84a","#a07a0a"],10:["#fff0ff","#c890ff","#3a1478"],
  hw:["#fffbe8","#ffc23a","#9a4a08"]};
/* 영웅 칼날 빛 (세렌 검기와 같은 그림을 영웅 색으로): 활 모양의 중심을 (cx,cy)에 두고 반지름 R로 그려요 */
const SLC={}; function slashCrop(pal){ if(SLC[pal]) return SLC[pal]; slashSprite(pal); const P_=PFX["slash3_"+pal]; if(!P_) return null; const S=P_.cv.width/P_.W, x0=-18, y0=-150, w=168, h=300;
  const cv=document.createElement("canvas"); cv.width=Math.round(w*S); cv.height=Math.round(h*S); cv.getContext("2d").drawImage(P_.cv,(x0+P_.W/2)*S,(y0+P_.H/2)*S,w*S,h*S,0,0,cv.width,cv.height); return SLC[pal]={cv,x0,y0,w,h} }
function heroArc(c,cx,cy,ang,R,al,pal,trail){ const Q=slashCrop(pal); if(!Q) return false; const s=R/122;
  const one=(da,a2)=>{ c.save(); c.translate(cx,cy); c.rotate(ang+da); c.translate(60*s,0); c.scale(s,s); c.globalAlpha=al*a2; c.drawImage(Q.cv,Q.x0,Q.y0,Q.w,Q.h); c.restore() };
  if(trail) one(-trail*.35,.3); one(0,1); return true }
/* 보스 검기 반달: 맵마다 그 맵의 재료가 실린 그림풍 칼날 (한 번만 그려 두고 재사용) */
const WAVE_DECO={1:"petal",2:"leaf",3:"grain",4:"spike",5:"flame",6:"streak",7:"feather",8:"spike",9:"bolt",10:"star"};
function waveSprite(m){ const C=WAVE_PAL[m]||WAVE_PAL[5], D=WAVE_DECO[m]||"flame"; return pfxMake("wave"+m,140,140,c=>{ const R=50;
  const sh=()=>{ c.beginPath(); c.arc(0,0,R,-1.15,1.15); c.quadraticCurveTo(R*.2,0,Math.cos(-1.15)*R,Math.sin(-1.15)*R); c.closePath() };
  // 가장자리 장식 (칼날 바깥쪽)
  const deco=(front)=>{ for(let i=0;i<9;i++){ const a=-1.05+i*(2.1/8), r=R+2, x=Math.cos(a)*r, y=Math.sin(a)*r, s=1-Math.abs(i-4)/7; c.save(); c.translate(x,y); c.rotate(a);
    if(D==="spike"&&!front){ const h=10+s*14+pfxR(i,m)*6, w=4+s*3; c.beginPath(); c.moveTo(-2,-w); c.lineTo(h,0); c.lineTo(-2,w); c.closePath(); c.lineWidth=2.2; c.strokeStyle=C[2]; c.stroke(); const g=c.createLinearGradient(0,-w,0,w); g.addColorStop(0,"#ffffff"); g.addColorStop(.5,C[1]); g.addColorStop(1,C[2]); c.fillStyle=g; c.fill(); c.fillStyle="rgba(255,255,255,.85)"; c.beginPath(); c.moveTo(0,-w*.6); c.lineTo(h*.85,0); c.lineTo(0,-w*.1); c.closePath(); c.fill() }
    else if(D==="flame"&&!front){ const h=12+s*14; c.beginPath(); c.moveTo(-2,-6); c.quadraticCurveTo(h*.5,-8,h,(pfxR(i,2)-.5)*6); c.quadraticCurveTo(h*.5,8,-2,6); c.closePath(); const g=c.createLinearGradient(0,0,h,0); g.addColorStop(0,C[1]); g.addColorStop(1,"rgba(255,240,180,.2)"); c.fillStyle=g; c.fill() }
    else if(D==="petal"&&front&&i%2){ c.rotate(.6); c.beginPath(); c.ellipse(4,0,7,4,0,0,7); c.fillStyle=C[1]; c.fill(); c.lineWidth=1.4; c.strokeStyle=C[2]; c.stroke(); c.fillStyle="rgba(255,255,255,.7)"; c.beginPath(); c.ellipse(3,-1,3,1.4,0,0,7); c.fill() }
    else if(D==="leaf"&&front&&i%2){ c.rotate(.7); c.beginPath(); c.moveTo(-6,0); c.quadraticCurveTo(0,-6,8,0); c.quadraticCurveTo(0,6,-6,0); c.fillStyle=C[1]; c.fill(); c.lineWidth=1.3; c.strokeStyle=C[2]; c.stroke(); c.beginPath(); c.moveTo(-5,0); c.lineTo(7,0); c.stroke() }
    else if(D==="grain"&&front){ for(let k=0;k<3;k++){ c.fillStyle=k%2?C[1]:C[2]; c.beginPath(); c.arc(4+k*5,(pfxR(i,k)-.5)*10,1.6+pfxR(k,i)*1.6,0,7); c.fill() } }
    else if(D==="streak"&&!front){ c.strokeStyle="rgba(255,255,255,.85)"; c.lineWidth=2; c.beginPath(); c.moveTo(0,-3); c.quadraticCurveTo(10,-6,18+s*8,-2); c.stroke() }
    else if(D==="feather"&&!front&&i%2===0){ c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(10,-6,20,0); c.quadraticCurveTo(10,5,0,0); c.fillStyle="#fffbe8"; c.fill(); c.lineWidth=1.3; c.strokeStyle=C[2]; c.stroke() }
    else if(D==="star"&&front&&i%2){ c.fillStyle="#fffbe0"; c.beginPath(); for(let k=0;k<8;k++){ const r2=k%2?2:6, b=k*Math.PI/4; c.lineTo(Math.cos(b)*r2+5,Math.sin(b)*r2) } c.closePath(); c.fill() }
    c.restore() }
    if(D==="bolt"&&front){ c.strokeStyle="#fffbd0"; c.lineWidth=2.5; c.shadowColor=C[1]; c.shadowBlur=6; c.beginPath(); for(let k=0;k<=10;k++){ const a=-1.05+k*.21, r=R-6+(k%2?7:-3); k?c.lineTo(Math.cos(a)*r,Math.sin(a)*r):c.moveTo(Math.cos(a)*r,Math.sin(a)*r) } c.stroke(); c.shadowBlur=0 } };
  deco(false);
  c.lineWidth=4; c.strokeStyle=C[2]; sh(); c.stroke();
  const g=c.createLinearGradient(R*.2,0,R,0); g.addColorStop(0,C[1]+"00"); g.addColorStop(.4,C[1]); g.addColorStop(.82,C[0]); g.addColorStop(1,"#ffffff"); c.fillStyle=g; sh(); c.fill();
  if(D==="spike"){ c.strokeStyle="rgba(255,255,255,.75)"; c.lineWidth=1.2; for(let i=0;i<6;i++){ const a=-.9+i*.36, r0=R*.55+pfxR(i,9)*8; c.beginPath(); c.moveTo(Math.cos(a)*r0,Math.sin(a)*r0); c.lineTo(Math.cos(a+.12)*(R-6),Math.sin(a+.12)*(R-6)); c.lineTo(Math.cos(a+.2)*(R-12),Math.sin(a+.2)*(R-12)); c.stroke() } }
  c.strokeStyle="rgba(255,255,255,.95)"; c.lineWidth=3; c.beginPath(); c.arc(0,0,R-2,-1,1); c.stroke();
  c.strokeStyle=C[1]; c.lineWidth=1.6; for(let i=0;i<3;i++){ c.beginPath(); c.arc(-6-i*8,0,R-8-i*4,-.8+i*.1,.8-i*.1); c.stroke() }
  deco(true);
  for(let i=0;i<5;i++){ const a=-.8+i*.4, r=R-10-pfxR(i,4)*14; c.fillStyle="#ffffff"; c.save(); c.translate(Math.cos(a)*r,Math.sin(a)*r); c.rotate(.785); c.fillRect(-.8,-3.2,1.6,6.4); c.fillRect(-3.2,-.8,6.4,1.6); c.restore() } }) }
/* 보스 검기 (레퍼런스 느낌): 앞쪽 빛나는 칼날 + 뒤로 끌리는 불꽃 몸통 + 속도선 + 찢어진 불꽃 조각 + 반짝이 · 맵 색으로 한 번만 그려 둬요 */
/* 보스 검기 (세렌 느낌): 넓게 휜 초승달 칼날 + 하얗게 타는 가장자리 + 빛살 + 끝의 별빛 + 겹친 잔상 칼날 */
function slashSprite(m){ const C=WAVE_PAL[m]||WAVE_PAL[5], rgb=h=>hexRgb(h); return pfxMake("slash3_"+m,300,300,c=>{ const c0=rgb(C[0]), c1=rgb(C[1]), c2=rgb(C[2]);
  const CX=-60, R=122, SP=1.08;
  const blade=(r,th,sp,dx)=>{ c.beginPath(); c.arc(CX+dx,0,r,-sp,sp); c.arc(CX+dx-th,0,r-th*.15,sp*.97,-sp*.97,true); c.closePath() };
  // 1) 큰 빛 번짐
  c.save(); c.filter="blur(12px)"; c.fillStyle=`rgba(${c1},.55)`; blade(R+6,40,SP,0); c.fill(); c.restore();
  // 2) 뒤에 겹친 잔상 칼날
  for(const [dx,al] of [[-34,.22],[-18,.38]]){ c.save(); c.globalAlpha=al; const gr=c.createRadialGradient(CX+dx,0,R-40,CX+dx,0,R); gr.addColorStop(0,`rgba(${c1},0)`); gr.addColorStop(.7,`rgba(${c1},.8)`); gr.addColorStop(1,`rgba(${c0},1)`); c.fillStyle=gr; blade(R,24,SP*.95,dx); c.fill(); c.restore() }
  // 3) 본 칼날: 가운데가 두껍고 끝이 가는 초승달
  const gm=c.createRadialGradient(CX,0,R-46,CX,0,R+2); gm.addColorStop(0,`rgba(${c2},0)`); gm.addColorStop(.35,`rgba(${c1},.75)`); gm.addColorStop(.75,`rgba(${c0},.95)`); gm.addColorStop(1,"rgba(255,255,255,1)");
  c.fillStyle=gm; blade(R,46,SP,0); c.fill();
  c.strokeStyle=`rgba(${c2},.75)`; c.lineWidth=2; blade(R,46,SP,0); c.stroke();
  // 4) 하얗게 타는 가장자리 (2겹)
  c.save(); c.filter="blur(3px)"; c.strokeStyle="rgba(255,255,255,.95)"; c.lineWidth=9; c.beginPath(); c.arc(CX,0,R-3,-SP*.92,SP*.92); c.stroke(); c.restore();
  c.strokeStyle="#ffffff"; c.lineWidth=3; c.beginPath(); c.arc(CX,0,R-2,-SP*.95,SP*.95); c.stroke();
  c.strokeStyle=`rgba(${c0},.9)`; c.lineWidth=1.4; c.beginPath(); c.arc(CX,0,R-16,-SP*.85,SP*.85); c.stroke();
  // 5) 앞으로 뻗는 빛살
  for(let i=0;i<9;i++){ const a=-SP*.8+i*(SP*1.6/8), L=18+pfxR(i,typeof m==="number"?m:11)*34+(i===4?26:0), x0=CX+Math.cos(a)*R, y0=Math.sin(a)*R; c.save(); c.translate(x0,y0); c.rotate(a);
    const gr=c.createLinearGradient(0,0,L,0); gr.addColorStop(0,"rgba(255,255,255,.95)"); gr.addColorStop(1,`rgba(${c0},0)`); c.fillStyle=gr; c.beginPath(); c.moveTo(0,-2.2); c.lineTo(L,0); c.lineTo(0,2.2); c.closePath(); c.fill(); c.restore() }
  // 6) 칼날 위 빛가루
  for(let i=0;i<40;i++){ const a=(pfxR(i,3)-.5)*SP*2, r=R-6-pfxR(i,4)*38, x=CX+Math.cos(a)*r, y=Math.sin(a)*r, s=.8+pfxR(i,5)*1.8; c.fillStyle=i%3?"rgba(255,255,255,.95)":`rgba(${c0},1)`; c.beginPath(); c.arc(x,y,s,0,7); c.fill() }
  // 7) 칼날 양 끝과 가운데의 별빛
  const star=(x,y,s,rot)=>{ c.save(); c.translate(x,y); c.rotate(rot); c.globalCompositeOperation="lighter"; const g2=c.createRadialGradient(0,0,0,0,0,s*1.4); g2.addColorStop(0,"rgba(255,255,255,1)"); g2.addColorStop(1,`rgba(${c1},0)`); c.fillStyle=g2; c.beginPath(); c.arc(0,0,s*1.4,0,7); c.fill();
    c.fillStyle="#ffffff"; for(const k of [0,Math.PI/2]){ c.save(); c.rotate(k); c.beginPath(); c.moveTo(-s*2.4,0); c.lineTo(0,-s*.18); c.lineTo(s*2.4,0); c.lineTo(0,s*.18); c.closePath(); c.fill(); c.restore() } c.restore() };
  star(CX+Math.cos(SP*.95)*(R-4),Math.sin(SP*.95)*(R-4),8,.3); star(CX+Math.cos(-SP*.95)*(R-4),Math.sin(-SP*.95)*(R-4),8,-.3); star(CX+R+2,0,12,0); }) }
/* 세렌풍 검기: 검은 배경 이펙트 그림을 맵 색으로 물들여 빛 더하기로 그려요 (맵마다 한 번만 만들어 둬요)
   밝은 맵에서도 보이게, 같은 모양의 어두운 그림자(밝기를 투명도로 바꾼 것)를 먼저 깔아요 */
const WAX=.9;   // 검기 그림에서 판정 위치(초승달 날)의 가로 위치
const WSCR={}; function waveScratch(TX){ const k=TX.width; if(WSCR[k]) return WSCR[k]; const cv=document.createElement("canvas"); cv.width=Math.round(TX.width*.6); cv.height=Math.round(TX.height*.6); return WSCR[k]={cv,x:cv.getContext("2d")} }
const WTEX={}; function waveTex(m,key){ key=key||"slashwave"; const id=key+m; if(WTEX[id]) return WTEX[id]; const im=typeof SKILL_IMG!=="undefined"&&SKILL_IMG[key]; if(!im) return null;
  const C=WAVE_PAL[m]||WAVE_PAL[5], mk=()=>{ const cv=document.createElement("canvas"); cv.width=im.width; cv.height=im.height; return cv };
  // 빛 그림(투명 배경)을 맵 색으로 물들이고, 그림 모양 밖은 다시 투명하게 잘라요
  const cv=mk(), x=cv.getContext("2d"); x.drawImage(im,0,0); x.globalCompositeOperation="multiply"; x.fillStyle=C[1]; x.fillRect(0,0,cv.width,cv.height);
  x.globalCompositeOperation="destination-in"; x.drawImage(im,0,0); x.globalCompositeOperation="lighter"; x.globalAlpha=key==="slashwave"?.5:.35; x.drawImage(im,0,0);
  if(key==="slashwave"){ // 황금 검기처럼: 맵 색 빛 번짐(블룸)을 뒤에 넓게 깔아요
    const gl=mk(), gx=gl.getContext("2d"); gx.drawImage(im,0,0); gx.globalCompositeOperation="source-in"; gx.fillStyle=C[1]; gx.fillRect(0,0,gl.width,gl.height);
    const bl=mk(), bx=bl.getContext("2d"); bx.filter="blur(9px)"; bx.globalAlpha=.32; bx.drawImage(gl,0,0); bx.filter="none"; bx.globalAlpha=1; bx.globalCompositeOperation="lighter"; bx.drawImage(cv,0,0);
    WTEX[id]={cv:bl,sh:null,width:bl.width,height:bl.height} }
  // 밝은 맵에서도 보이게 깔아 두는 어두운 그림자 (같은 모양)
  if(WTEX[id]){ const sh=mk(), y=sh.getContext("2d"); y.drawImage(im,0,0); y.globalCompositeOperation="source-in"; y.fillStyle=C[2]; y.fillRect(0,0,sh.width,sh.height); WTEX[id].sh=sh; return WTEX[id] }
  const sh=mk(), y=sh.getContext("2d"); y.drawImage(im,0,0); y.globalCompositeOperation="source-in"; y.fillStyle=C[2]; y.fillRect(0,0,sh.width,sh.height);
  return WTEX[id]={cv,sh,width:cv.width,height:cv.height} }
function drawBurst(c,x,y,m,size,al,rot){ const TX=waveTex(m,"hitburst"); if(!TX||al<=0) return false; c.save(); c.translate(x,y); if(rot) c.rotate(rot); c.globalCompositeOperation="lighter"; c.globalAlpha=al; c.drawImage(TX.cv,-size/2,-size/2,size,size); c.restore(); return true }
function drawWave(c,b,t){ const TX=waveTex(b.map||5); if(TX){ const m=b.map||5, age=1.6-b.life, sc=(b.sz||1)*(.5+Math.min(.22,age*.5)), al=Math.min(1,b.life*3), Hd=175*sc, Wd=Hd*TX.width/TX.height, fl=1+Math.sin(t*30+b.x)*.05;
    if(m===8&&PFX.ice){ const sp=Math.hypot(b.vx,b.vy)||1, ux=b.vx/sp, uy=b.vy/sp; for(let i=0;i<5;i++){ const ph=(t*2.2+i/5+(b.x*.001))%1, side=(pfxR(i,m)-.5)*90*sc; pfxDraw(c,"ice",b.x-ux*(30+ph*110)*sc-uy*side,b.y-uy*(30+ph*110)*sc+ux*side,t*5+i,.32*(1-ph),al*(1-ph)) } }
    c.save(); c.translate(b.x,b.y); c.rotate(b.a); c.scale(1,fl); const SHA={7:1,8:1,3:.7,9:.75,1:.6,6:.65}[m]||.5; c.globalAlpha=al*SHA; c.drawImage(TX.sh,-Wd*WAX,-Hd/2,Wd,Hd); if(SHA>=1){ c.drawImage(TX.sh,-Wd*WAX,-Hd/2,Wd,Hd); c.drawImage(TX.sh,-Wd*WAX,-Hd/2,Wd,Hd) }
    c.globalCompositeOperation="lighter"; c.globalAlpha=al;
    // 펄럭임: 앞날(초승달)은 그대로, 뒤쪽 리본 꼬리는 조각마다 물결처럼 위아래로 일렁여요
    if(window.__fxLow) c.drawImage(TX.cv,-Wd*WAX,-Hd/2,Wd,Hd);
    else { // 조각을 작은 캔버스에 먼저 모아 그린 뒤 한 번에 빛으로 얹어요 (조각 이음새가 겹쳐 밝아지지 않게)
      const S=waveScratch(TX), N=18, TW=TX.width*.6, sw=TW/N, ph=t*11+b.x*.01, sx=S.cv.width/TX.width; S.x.clearRect(0,0,S.cv.width,S.cv.height);
      for(let i=0;i<N;i++){ const k2=1-i/N, dy=Math.sin(ph-i*.42)*TX.height*.04*k2; S.x.drawImage(TX.cv,i*sw,0,sw+1,TX.height,i*sw*sx,dy*sx,(sw+1)*sx,TX.height*sx) }
      S.x.drawImage(TX.cv,TW,0,TX.width-TW,TX.height,TW*sx,0,(TX.width-TW)*sx,TX.height*sx);
      c.drawImage(S.cv,-Wd*WAX,-Hd/2,Wd,Hd) }
    c.restore(); return }
  const m=b.map||5, C=WAVE_PAL[m]||WAVE_PAL[5], age=1.6-b.life, sc=(b.sz||1)*(.5+Math.min(.22,age*.5)), al=Math.min(1,b.life*3), key="slash3_"+m; slashSprite(m); const P_=PFX[key];
  if(m===8&&PFX.ice){ const sp=Math.hypot(b.vx,b.vy)||1, ux=b.vx/sp, uy=b.vy/sp; for(let i=0;i<5;i++){ const ph=(t*2.2+i/5+(b.x*.001))%1, side=(pfxR(i,m)-.5)*90*sc; pfxDraw(c,"ice",b.x-ux*(30+ph*110)*sc-uy*side,b.y-uy*(30+ph*110)*sc+ux*side,t*5+i,.32*(1-ph),al*(1-ph)) } }
  const fl=1+Math.sin(t*34+b.x)*.04, ca=Math.cos(b.a), sa=Math.sin(b.a), off=-62*sc;   // 칼날 앞쪽 가장자리가 탄 위치에 오게
  const one=(dx,a2,s2,mode)=>{ c.save(); c.translate(b.x+ca*(off+dx),b.y+sa*(off+dx)); c.rotate(b.a); c.scale(s2,s2*fl); c.globalAlpha=a2; if(mode) c.globalCompositeOperation=mode; c.drawImage(P_.cv,-P_.W/2,-P_.H/2,P_.W,P_.H); c.restore() };
  // 칼날 뒤로 남는 부드러운 빛 잔상 (번짐만 그린 그림을 겹쳐요)
  const G_=slashGlow(m); for(const [dx,a2] of [[-66,.14],[-44,.24],[-22,.36]]){ c.save(); c.translate(b.x+ca*(off+dx*sc),b.y+sa*(off+dx*sc)); c.rotate(b.a); c.scale(sc,sc); c.globalAlpha=al*a2; c.drawImage(G_.cv,-G_.W/2,-G_.H/2,G_.W,G_.H); c.restore() }
  one(0,al,sc); one(0,al*.22,sc,"lighter") }
function slashGlow(m){ const C=WAVE_PAL[m]||WAVE_PAL[5]; return pfxMake("slashglow_"+m,300,300,c=>{ const CX=-60, R=122, SP=1.0; c.filter="blur(9px)";
  c.lineCap="round"; c.strokeStyle=`rgba(${hexRgb(C[1])},.9)`; c.lineWidth=34; c.beginPath(); c.arc(CX-14,0,R-16,-SP,SP); c.stroke();
  c.strokeStyle="rgba(255,255,255,.9)"; c.lineWidth=12; c.beginPath(); c.arc(CX,0,R-6,-SP*.9,SP*.9); c.stroke() }) }
/* 얼음 그림: 솟는 얼음 가시 · 큰 고드름 · 눈덩이 */
function pfxInitIce(){ if(PFX._okI) return; PFX._okI=1;
  const crystal=(c,x,h,w,tilt,dark)=>{ c.save(); c.translate(x,0); c.rotate(tilt); const path=()=>{ c.beginPath(); c.moveTo(-w/2,2); c.lineTo(-w/2,-h*.72); c.lineTo(0,-h); c.lineTo(w/2,-h*.72); c.lineTo(w/2,2); c.closePath() };
    c.lineWidth=2.6; c.strokeStyle=dark||"#0e3460"; path(); c.stroke(); const g=c.createLinearGradient(-w/2,0,w/2,0); g.addColorStop(0,"#4a8ed8"); g.addColorStop(.45,"#d6f2ff"); g.addColorStop(1,"#5a9ae0"); c.fillStyle=g; path(); c.fill();
    c.fillStyle="rgba(255,255,255,.8)"; c.beginPath(); c.moveTo(-w/2+2,-h*.7); c.lineTo(0,-h+3); c.lineTo(-1,-h*.3); c.lineTo(-w/2+2,-h*.2); c.closePath(); c.fill();
    c.strokeStyle="rgba(20,70,150,.45)"; c.lineWidth=1; c.beginPath(); c.moveTo(w*.15,-h*.85); c.lineTo(w*.2,-h*.1); c.stroke(); c.restore() };
  pfxMake("icespike",70,84,c=>{ c.translate(0,34);
    c.fillStyle="rgba(230,245,255,.95)"; c.beginPath(); c.ellipse(0,2,26,7,0,0,7); c.fill(); c.strokeStyle="rgba(90,140,200,.6)"; c.lineWidth=1.5; c.stroke();
    crystal(c,-13,34,12,-.35); crystal(c,13,40,13,.3); crystal(c,0,62,16,0);
    c.fillStyle="#ffffff"; for(let i=0;i<4;i++){ c.beginPath(); c.arc(-18+i*12,3-(i%2)*2,2.4,0,7); c.fill() } });
  pfxMake("icicle_big",44,120,c=>{ c.translate(0,-6); const path=()=>{ c.beginPath(); c.moveTo(-14,-48); c.lineTo(14,-48); c.lineTo(9,-10); c.lineTo(4,30); c.lineTo(0,56); c.lineTo(-4,28); c.lineTo(-10,-12); c.closePath() };
    c.lineWidth=3; c.strokeStyle="#0e3460"; path(); c.stroke(); const g=c.createLinearGradient(-14,0,14,0); g.addColorStop(0,"#4a8ed8"); g.addColorStop(.4,"#e0f6ff"); g.addColorStop(1,"#5a98e0"); c.fillStyle=g; path(); c.fill();
    c.fillStyle="rgba(255,255,255,.85)"; c.beginPath(); c.moveTo(-10,-46); c.lineTo(-3,-46); c.lineTo(-2,30); c.lineTo(-5,20); c.closePath(); c.fill();
    c.strokeStyle="rgba(20,70,150,.5)"; c.lineWidth=1; for(let i=0;i<3;i++){ c.beginPath(); c.moveTo(-12+i*2,-30+i*14); c.lineTo(10-i*3,-34+i*14); c.stroke() }
    c.fillStyle="#ffffff"; c.beginPath(); c.ellipse(0,-48,17,6,0,0,7); c.fill(); c.strokeStyle="#7aa8d8"; c.lineWidth=1.4; c.stroke() });
  pfxMake("snowball",44,44,c=>{ c.lineWidth=3; c.strokeStyle="#3a5a80"; c.beginPath(); c.arc(0,0,16,0,7); c.stroke();
    const g=c.createRadialGradient(-5,-6,2,0,0,17); g.addColorStop(0,"#ffffff"); g.addColorStop(.6,"#dcecff"); g.addColorStop(1,"#8aaed8"); c.fillStyle=g; c.beginPath(); c.arc(0,0,16,0,7); c.fill();
    c.fillStyle="#ffffff"; for(let i=0;i<9;i++){ const a=i*.7, r=16; c.beginPath(); c.arc(Math.cos(a)*r*.9,Math.sin(a)*r*.9,2.5+pfxR(i,3)*2,0,7); c.fill() }
    c.fillStyle="rgba(120,160,210,.5)"; for(let i=0;i<5;i++){ c.beginPath(); c.arc(4+pfxR(i,5)*6-3,5+pfxR(i,6)*6-3,1.6,0,7); c.fill() } }) }
function hexRgb(h){ const n=parseInt(h.slice(1),16); return `${n>>16},${n>>8&255},${n&255}` }
const SHOCK_KEY={1:"th_flower",2:"th_leaf",3:"th_rock",4:"th_crystal",5:"flame",6:"wind",7:"th_light",8:"icespike",9:"th_bolt",10:"th_star"};
/* 보스 충격파: 제미나이 고리 그림을 맵 색으로 물들이고, 맵마다 다른 파편(꽃잎·잎·돌·수정·불꽃·바람·깃털·얼음·번개·별)이 고리를 따라 날아가요 */
const SHOCK_COL={1:"#ff8ac0",2:"#7adc6a",3:"#e8b070",4:"#b98aff",5:"#ff6a3a",6:"#8ad8ff",7:"#ffd36a",8:"#a8e8ff",9:"#ffe25a",10:"#c9a0ff"};
function drawShockArt(c,b,t){ const S=typeof SKILL_IMG!=="undefined"&&!window.__noArt?SKILL_IMG:null; if(!S||!S.shockring) return false;
  const m=b.map||5, T=typeof warnTex==="function"&&warnTex("shockring",SHOCK_COL[m]||"#ffffff"); if(!T) return false;
  const a=Math.min(1,b.life*2.5), R=b.rad+b.band*.4, W=R*2.12, H=W*.75;
  c.save(); c.globalCompositeOperation="lighter"; c.globalAlpha=a*.55; c.drawImage(T,b.x-W/2,b.y-H/2,W,H); c.globalAlpha=a*.12; c.drawImage(S.shockring,b.x-W/2,b.y-H/2,W,H); c.restore();   // 은은하게 (뒤가 비쳐 보이게)
  c.save(); c.globalAlpha=a*.9; c.strokeStyle=SHOCK_COL[m]||"#fff"; c.lineWidth=3; c.beginPath(); c.ellipse(b.x,b.y,R,R*.75,0,0,7); c.stroke(); c.restore();   // 실제로 맞는 선은 또렷하게
  const SD=S["sd_"+m]; if(SD){ const n=Math.max(8,Math.min(22,R/30|0)), z=32/Math.max(SD.width,SD.height); c.save(); c.globalAlpha=a;
    for(let i=0;i<n;i++){ const an=i/n*6.283+b.x*.01, x=b.x+Math.cos(an)*R, y=b.y+Math.sin(an)*R*.75, s=z*(.8+pfxR(i,m)*.5); c.save(); c.translate(x,y); c.rotate(an+t*3+i); c.scale(s,s); c.drawImage(SD,-SD.width/2,-SD.height/2); c.restore() } c.restore() }
  return true }
function drawShock(c,b,t){ if(drawShockArt(c,b,t)) return; const m=b.map||5, C=WAVE_PAL[m]||WAVE_PAL[5], a=Math.min(1,b.life*2.5), R=b.rad;
  c.save(); c.translate(b.x,b.y); c.scale(1,.75);
  const g=c.createRadialGradient(0,0,Math.max(1,R-b.band*1.6),0,0,R+b.band); g.addColorStop(0,C[1]+"00"); g.addColorStop(.55,C[1]+"aa"); g.addColorStop(.8,C[0]+"cc"); g.addColorStop(1,C[1]+"00");
  c.globalAlpha=a*.7; c.fillStyle=g; const ri=Math.max(1,R-b.band*1.6); c.beginPath(); c.arc(0,0,R+b.band,0,TAU); c.moveTo(ri,0); c.arc(0,0,ri,0,TAU,true); c.fill();
  c.globalAlpha=a; c.strokeStyle=C[2]; c.lineWidth=2.5; c.beginPath(); c.arc(0,0,R+b.band*.4,0,7); c.stroke(); c.restore();
  let key=SHOCK_KEY[m]; const up=key==="icespike"||key==="flame"||key==="th_crystal"; if(m===5) key="flame"+(Math.floor(t*12)&3);
  if(!PFX[key]) return; const n=Math.max(10,Math.min(34,R/22|0)), off=R*.004;
  for(let i=0;i<n;i++){ const an=i/n*6.283+off, x=b.x+Math.cos(an)*R, y=b.y+Math.sin(an)*R*.75, s=(up?.55:.6)+pfxR(i,m)*.25;
    pfxDraw(c,key,x,y-(up?(m===8?14:12)*s:0),up?(pfxR(i,2)-.5)*.3:an+t*2,s,a) } }
/* ===== 보스 기술 이름에 맞는 모양 (별 · 행성 · 공허 · 번개 · 얼음 · 빛 · 불 · 바람 · 꽃 · 잎 · 독 · 수정 · 바위) ===== */
const TH_PAL={star:["#fffbe0","#ffe27a","#c08bff"],planet:["#e0d0ff","#8a6ae0","#2a1a5a"],void:["#e8c8ff","#7a2ad0","#14061e"],bolt:["#ffffff","#ffe84a","#5a7aff"],
  ice:["#ffffff","#a8e8ff","#2a6aaa"],light:["#ffffff","#ffe9a0","#d8a020"],fire:["#fff4c0","#ff7a2a","#8a1408"],wind:["#ffffff","#bff0ff","#3a9ac0"],
  snow:["#ffffff","#dcecff","#5a7aa8"],flower:["#fff0f6","#ff8fb8","#c0306a"],leaf:["#e8ffd0","#6ad04a","#1e5a1a"],poison:["#e8ffd0","#a0e040","#5a2a8a"],crystal:["#ffffff","#8ad8ff","#3a4ab0"],rock:["#f0e0c8","#a88a6a","#4a3a2a"]};
function pfxInitTheme(){ if(PFX._okT) return; PFX._okT=1; const ol=(c,w,col)=>{ c.lineWidth=w; c.strokeStyle=col; c.stroke() };
  const star=(c,R,r,n)=>{ c.beginPath(); for(let i=0;i<n*2;i++){ const a=i*Math.PI/n-Math.PI/2, rr=i%2?r:R; c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr) } c.closePath() };
  // 별
  pfxMake("th_star",40,40,c=>{ star(c,16,7,5); const g=c.createRadialGradient(-3,-3,1,0,0,16); g.addColorStop(0,"#ffffff"); g.addColorStop(.5,"#ffe27a"); g.addColorStop(1,"#f0a020"); c.fillStyle=g; c.fill(); ol(c,2.2,"#7a4a10") });
  // 행성 (고리 달린)
  pfxMake("th_planet",56,40,c=>{ c.save(); c.scale(1,.32); c.lineWidth=5; c.strokeStyle="rgba(230,200,255,.85)"; c.beginPath(); c.arc(0,0,25,Math.PI,0); c.stroke(); c.restore();
    const g=c.createRadialGradient(-5,-5,2,0,0,14); g.addColorStop(0,"#f0e0ff"); g.addColorStop(.5,"#9a6ae0"); g.addColorStop(1,"#3a1a6a"); c.fillStyle=g; c.beginPath(); c.arc(0,0,14,0,7); c.fill(); ol(c,2,"#1a0a30");
    c.strokeStyle="rgba(255,255,255,.35)"; c.lineWidth=2; c.beginPath(); c.arc(0,0,9,3.6,4.6); c.stroke();
    c.save(); c.scale(1,.32); c.lineWidth=5; c.strokeStyle="rgba(230,200,255,.95)"; c.beginPath(); c.arc(0,0,25,0,Math.PI); c.stroke(); c.restore() });
  // 공허 구슬
  pfxMake("th_void",40,40,c=>{ const g=c.createRadialGradient(0,0,2,0,0,17); g.addColorStop(0,"#000000"); g.addColorStop(.55,"#2a0a48"); g.addColorStop(.85,"#a050f0"); g.addColorStop(1,"rgba(200,140,255,0)"); c.fillStyle=g; c.beginPath(); c.arc(0,0,17,0,7); c.fill();
    c.strokeStyle="#e0b0ff"; c.lineWidth=1.6; for(let i=0;i<3;i++){ c.beginPath(); c.arc(0,0,9+i*2.5,i*2,i*2+2.2); c.stroke() } });
  // 번개 구슬
  pfxMake("th_bolt",40,40,c=>{ const g=c.createRadialGradient(0,0,1,0,0,15); g.addColorStop(0,"#ffffff"); g.addColorStop(.4,"#fff27a"); g.addColorStop(1,"rgba(120,140,255,.0)"); c.fillStyle=g; c.beginPath(); c.arc(0,0,15,0,7); c.fill();
    c.strokeStyle="#ffffff"; c.lineWidth=2; for(let i=0;i<4;i++){ const a=i*1.57+.4; c.beginPath(); c.moveTo(Math.cos(a)*4,Math.sin(a)*4); c.lineTo(Math.cos(a+.4)*10,Math.sin(a+.4)*10); c.lineTo(Math.cos(a)*17,Math.sin(a)*17); c.stroke() } });
  // 얼음 (뾰족 결정) → 기존 ice
  // 빛의 창
  pfxMake("th_light",56,22,c=>{ c.beginPath(); c.moveTo(26,0); c.lineTo(10,-6); c.lineTo(-24,-2.5); c.lineTo(-24,2.5); c.lineTo(10,6); c.closePath(); const g=c.createLinearGradient(-24,0,26,0); g.addColorStop(0,"rgba(255,230,140,0)"); g.addColorStop(.5,"#ffe9a0"); g.addColorStop(1,"#ffffff"); c.fillStyle=g; c.fill(); ol(c,1.6,"#b8871a");
    c.fillStyle="#fff"; c.beginPath(); c.arc(16,0,3,0,7); c.fill() });
  // 깃털 (바람)
  pfxMake("th_wind",48,22,c=>{ c.beginPath(); c.moveTo(22,0); c.quadraticCurveTo(4,-11,-20,-3); c.lineTo(-22,0); c.lineTo(-20,3); c.quadraticCurveTo(4,11,22,0); c.closePath(); const g=c.createLinearGradient(0,-10,0,10); g.addColorStop(0,"#ffffff"); g.addColorStop(1,"#8ad8f0"); c.fillStyle=g; c.fill(); ol(c,1.8,"#2a6a8a");
    c.strokeStyle="#3a8aaa"; c.lineWidth=1.2; c.beginPath(); c.moveTo(-22,0); c.lineTo(20,0); c.stroke(); for(let i=-3;i<=3;i++){ c.beginPath(); c.moveTo(i*5,0); c.lineTo(i*5-5,i%2?-7:7); c.stroke() } });
  // 꽃잎
  pfxMake("th_flower",32,32,c=>{ for(let i=0;i<5;i++){ c.save(); c.rotate(i*1.2566); c.beginPath(); c.ellipse(0,-7,5,8,0,0,7); const g=c.createLinearGradient(0,-15,0,0); g.addColorStop(0,"#fff0f6"); g.addColorStop(1,"#ff6fa0"); c.fillStyle=g; c.fill(); ol(c,1.4,"#a02a5a"); c.restore() }
    c.fillStyle="#ffd23a"; c.beginPath(); c.arc(0,0,4,0,7); c.fill(); ol(c,1,"#8a5a0a") });
  // 나뭇잎
  pfxMake("th_leaf",40,24,c=>{ c.beginPath(); c.moveTo(18,0); c.quadraticCurveTo(0,-12,-16,0); c.quadraticCurveTo(0,12,18,0); c.closePath(); const g=c.createLinearGradient(0,-10,0,10); g.addColorStop(0,"#b0f080"); g.addColorStop(1,"#2e8a2a"); c.fillStyle=g; c.fill(); ol(c,1.8,"#14400e");
    c.strokeStyle="#e0ffc0"; c.lineWidth=1.2; c.beginPath(); c.moveTo(-16,0); c.lineTo(16,0); c.stroke() });
  // 독 방울
  pfxMake("th_poison",32,32,c=>{ c.beginPath(); c.moveTo(0,-13); c.quadraticCurveTo(11,0,0,12); c.quadraticCurveTo(-11,0,0,-13); const g=c.createRadialGradient(-3,-2,1,0,2,12); g.addColorStop(0,"#f0ffd0"); g.addColorStop(.5,"#a0e040"); g.addColorStop(1,"#5a2a8a"); c.fillStyle=g; c.fill(); ol(c,1.8,"#2a1040");
    c.fillStyle="rgba(255,255,255,.8)"; c.beginPath(); c.arc(-3,-2,2.5,0,7); c.fill() });
  // 수정 조각
  pfxMake("th_crystal",44,24,c=>{ const p=[[20,0],[6,-8],[-14,-6],[-20,0],[-14,6],[6,8]]; c.beginPath(); p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y)); c.closePath(); const g=c.createLinearGradient(-20,-8,20,8); g.addColorStop(0,"#4a5ad0"); g.addColorStop(.5,"#bfe8ff"); g.addColorStop(1,"#7a6af0"); c.fillStyle=g; c.fill(); ol(c,2,"#1a2060");
    c.fillStyle="rgba(255,255,255,.85)"; c.beginPath(); c.moveTo(20,0); c.lineTo(6,-8); c.lineTo(2,-1); c.closePath(); c.fill() });
  // 바위
  pfxMake("th_rock",36,36,c=>{ c.beginPath(); for(let i=0;i<8;i++){ const a=i/8*6.283, r=12+pfxR(i,7)*4; c.lineTo(Math.cos(a)*r,Math.sin(a)*r) } c.closePath(); const g=c.createRadialGradient(-4,-4,2,0,0,15); g.addColorStop(0,"#e8d8c0"); g.addColorStop(.6,"#a08868"); g.addColorStop(1,"#5a4632"); c.fillStyle=g; c.fill(); ol(c,2.2,"#2a1e12");
    c.strokeStyle="rgba(40,25,10,.6)"; c.lineWidth=1.2; c.beginPath(); c.moveTo(-4,-2); c.lineTo(2,3); c.lineTo(6,0); c.stroke() });
}
const TH_SPIN={snow:1,star:1,flower:1,rock:1,planet:0,void:0,bolt:0,poison:0};
function drawThemeShot(c,b,t){ if(b.th==="fire"&&typeof drawFireballFx==="function"&&drawFireballFx(c,b.x,b.y,Math.atan2(b.vy,b.vx),Math.max(70,(b.r||10)*7.5),t)) return true;
  if(drawArtShot(c,b,t)) return true;
  if(!PFX._okT) return false; const th=b.th, key=th==="snow"?"snowball":th==="ice"?"ice":th==="fire"?"fire"+(Math.floor(t*14)&3):"th_"+th; if(!PFX[key]) return false;
  const P=TH_PAL[th]||TH_PAL.fire, a=Math.atan2(b.vy,b.vx), sc=Math.max(.8,(b.r||10)/11), rot=TH_SPIN[th]?t*7+(b.x*.01):(th==="planet"||th==="void"||th==="bolt"||th==="poison")?0:a;
  c.save(); c.globalCompositeOperation="lighter"; jGlow(c,b.x,b.y,(b.r||10)*2.3,hexRgb(P[1]),.5); c.restore();
  if(th==="star"||th==="light"||th==="bolt"){ for(let j=2;j>=1;j--) pfxDraw(c,key,b.x-b.vx*.02*j,b.y-b.vy*.02*j,rot,sc*(1-j*.15),.25/j) }
  pfxDraw(c,key,b.x,b.y,rot,sc*(th==="fire"?.85:1));
  if(th==="bolt"&&!window.__fxLow){ const fr=Math.floor(t*14), rr=(b.r||10); c.save(); c.translate(b.x,b.y); c.rotate(((fr*2.399)+(b.x*.013))%6.283); c.translate(-rr*1.6,0); drawBoltStrand(c,rr*3.2,rr*1.6,.85); c.restore() }
  return true }
/* 테마 폭발: 테마 조각이 사방으로 튀고, 가운데 빛 */
function drawThemeBoom(c,f,k,t){ if(!PFX._okT) return false; const th=f.th, P=TH_PAL[th]; if(!P) return false; const q=1-k, R=f.r||60;
  if(th!=="bolt"&&!window.__fxLow){ const age=(1-k)*(f.max||.4), dur=f.max||.4, sd=((f.x*3+f.y*7)|0)%97; eruptColumn(c,f.x,f.y,Math.max(36,R*.8),age*(1.4/dur),1.4,hexRgb(P[1]),sd); if(age<.25) drawImpactBoom(c,f,Math.max(k,.6),t,th==="star"?["#fff","#ffd36a"]:P); return true }
  c.save(); c.globalCompositeOperation="lighter"; const fr=R*(.4+q*.9)*(q>.6?1.4-q*.8:1), g=c.createRadialGradient(f.x,f.y,0,f.x,f.y,fr); g.addColorStop(0,P[0]); g.addColorStop(.4,P[1]+"cc"); g.addColorStop(1,P[1]+"00"); c.globalAlpha=Math.min(1,k*1.8); c.fillStyle=g; c.beginPath(); c.arc(f.x,f.y,fr,0,7); c.fill(); c.restore();
  c.save(); c.globalAlpha=Math.min(1,k*2); c.strokeStyle=P[1]; c.lineWidth=3*k+1; c.beginPath(); c.ellipse(f.x,f.y,R*(.3+q*.9),R*(.3+q*.9)*.75,0,0,7); c.stroke(); c.restore();
  const key=th==="snow"?"snowball":th==="ice"?"ice":th==="fire"?"fire0":"th_"+th, n=th==="bolt"?0:8, s=jSeed(f);
  if(PFX[key]) for(let i=0;i<n;i++){ const an=i/n*6.283+jr(s,i), d=R*(.15+q*.95)*(.7+jr(s,i+9)*.5); pfxDraw(c,key,f.x+Math.cos(an)*d,f.y+Math.sin(an)*d*.8-Math.sin(q*Math.PI)*14,th==="star"||th==="flower"?t*6+i:an,.55*(1-q*.5),Math.min(1,k*2)) }
  if(th==="bolt"&&k>.4&&typeof SKILL_IMG!=="undefined"&&SKILL_IMG.boltfx){ const im=SKILL_IMG.boltfx, Hd=Math.max(160,R*3.2), Wd=Hd*im.width/im.height; c.save(); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(1,(k-.4)*2.5)*(.8+Math.random()*.3); for(let jj=0;jj<2;jj++){ const ox=(jr(s,jj)-.5)*R*.8; c.drawImage(im,f.x+ox-Wd*.5,f.y+16-Hd,Wd,Hd) } c.restore() }
  else if(th==="bolt"&&k>.4){ c.save(); c.strokeStyle="#ffffff"; c.lineWidth=3; c.shadowColor="#ffe84a"; c.shadowBlur=12; for(let j=0;j<3;j++){ c.beginPath(); let x=f.x+(jr(s,j)-.5)*R*.6, y=f.y-420; c.moveTo(x,y); while(y<f.y){ y+=40; x+=(jr(s,j*9+y)-.5)*40; c.lineTo(x,Math.min(y,f.y)) } c.stroke() } c.restore() }
  if(th==="star"){ c.save(); c.translate(f.x,f.y); c.rotate(q*2); c.globalCompositeOperation="lighter"; c.fillStyle=`rgba(255,250,220,${k})`; for(let i=0;i<4;i++){ c.rotate(Math.PI/4); c.fillRect(-R*1.2*(.5+q),-1.5,R*2.4*(.5+q),3) } c.restore() }
  if(th==="void"){ c.save(); c.globalAlpha=k; c.fillStyle="#000"; c.beginPath(); c.arc(f.x,f.y,R*.35*(1-q*.6),0,7); c.fill(); c.restore() }
  return true }
/* 테마 낙하: 별똥별 · 낙뢰 · 고드름 · 뿌리 · 빛기둥 · 공허 구슬 · 수정 가시 · 낙석 */
function drawThemeFall(c,f,k,t){ if(!PFX._okT||f.life>f.max) return false; const th=f.th, q=1-f.life/f.max, P=TH_PAL[th]; if(!P) return false;
  if(th==="star"&&drawSpearFall(c,f,q,t,P)) return true;
  if(th!=="fire"&&th!=="bolt"&&th!=="ice"&&th!=="snow"&&th!=="rock"&&pillarStrike(c,f,q,t,hexRgb(P[1]))) return true;
  if(th==="fire") return false;
  if(th==="bolt"){ c.save(); c.globalAlpha=q; c.strokeStyle="#fff"; c.lineWidth=2+q*3; c.shadowColor="#ffe84a"; c.shadowBlur=14; c.beginPath(); let x=f.x, y=f.y-460*q; c.moveTo(x+30,f.y-480); for(let i=0;i<8;i++){ c.lineTo(f.x+(Math.sin(i*7+t*30))*16,f.y-480+(480*q)*(i+1)/8) } c.stroke(); c.restore(); return true }
  if(th==="light"){ c.save(); c.globalCompositeOperation="lighter"; const w=16+q*22, g=c.createLinearGradient(f.x-w,0,f.x+w,0); g.addColorStop(0,"rgba(255,233,160,0)"); g.addColorStop(.5,`rgba(255,250,220,${.4+q*.5})`); g.addColorStop(1,"rgba(255,233,160,0)"); c.fillStyle=g; c.fillRect(f.x-w,f.y-500,w*2,500); c.restore(); return true }
  if(th==="leaf"||th==="crystal"){ if(q<.75) return true; const p=(q-.75)/.25, key=th==="leaf"?"th_leaf":"th_crystal"; for(let i=0;i<6;i++){ const a=-Math.PI/2+(i-2.5)*.28; pfxDraw(c,key,f.x+(i-2.5)*10,f.y-p*30*(1-Math.abs(i-2.5)/4),a,1.1*p) } return true }
  if(th==="ice"&&PFX.icicle_big){ const y=f.y-460*(1-q); c.save(); c.fillStyle=`rgba(40,80,140,${.25*q})`; c.beginPath(); c.ellipse(f.x,f.y,22*q,8*q,0,0,7); c.fill(); c.restore(); pfxDraw(c,"icicle_big",f.x,y-38,0,.85); return true }
  const key=th==="snow"?"snowball":th==="ice"?"ice":"th_"+th; if(!PFX[key]) return false; const sx=f.x-200*(1-q), sy=f.y-420*(1-q), a=Math.atan2(420,200);
  c.save(); c.globalCompositeOperation="lighter"; const tg=c.createLinearGradient(sx-110,sy-230,sx,sy); tg.addColorStop(0,P[1]+"00"); tg.addColorStop(1,P[0]+"dd"); c.strokeStyle=tg; c.lineWidth=th==="star"?10:6; c.lineCap="round"; c.beginPath(); c.moveTo(sx-110,sy-230); c.lineTo(sx,sy); c.stroke(); jGlow(c,sx,sy,26,hexRgb(P[1]),.6); c.restore();
  pfxDraw(c,key,sx,sy,th==="star"?t*8:a,th==="planet"?1.4:1.5); return true }
/* 십자 기술: 커다란 빛의 십자가가 번쩍 */
function drawCrossFx(c,f,k,t){ const P=TH_PAL[f.th]||TH_PAL.light, q=1-k, L=900, w=(q<.6?q/.6:1)*26*k+4;
  c.save(); c.translate(f.x,f.y); c.rotate(f.a||0); c.globalCompositeOperation="lighter";
  for(let i=0;i<4;i++){ c.save(); c.rotate(i*Math.PI/2); const g=c.createLinearGradient(0,0,L,0); g.addColorStop(0,P[0]); g.addColorStop(.3,P[1]+"aa"); g.addColorStop(1,P[1]+"00"); c.fillStyle=g; c.globalAlpha=Math.min(1,k*1.5); c.fillRect(0,-w/2,L,w); c.restore() }
  jGlow(c,0,0,90*k+20,hexRgb(P[1]),.9*k); c.restore() }
/* 바람 정령 실프 (궁수 2차) · 회오리 구슬 */
function pfxInitWind(){ if(PFX._okW) return; PFX._okW=1;
  pfxMake("wisp",30,30,c=>{ const g=c.createRadialGradient(-2,-2,1,0,0,10); g.addColorStop(0,"#ffffff"); g.addColorStop(.5,"#9af0c8"); g.addColorStop(1,"#1e9a6a"); c.fillStyle=g; c.beginPath(); c.arc(0,0,8,0,7); c.fill(); c.lineWidth=1.8; c.strokeStyle="#0e5a3e"; c.stroke();
    c.strokeStyle="rgba(230,255,245,.9)"; c.lineWidth=1.6; for(let i=0;i<3;i++){ c.beginPath(); c.arc(0,0,10+i*2,i*2.1,i*2.1+1.6); c.stroke() } });
  pfxMake("sylphwing",40,26,c=>{ c.translate(-18,2); c.beginPath(); c.moveTo(0,0); c.bezierCurveTo(8,-14,30,-14,36,-4); c.bezierCurveTo(26,-2,16,4,0,0); const g=c.createLinearGradient(0,0,36,-10); g.addColorStop(0,"rgba(200,255,230,.95)"); g.addColorStop(1,"rgba(90,230,170,.55)"); c.fillStyle=g; c.fill(); c.lineWidth=1.4; c.strokeStyle="#1e7a52"; c.stroke();
    c.strokeStyle="rgba(255,255,255,.8)"; c.lineWidth=1; c.beginPath(); c.moveTo(2,-1); c.quadraticCurveTo(18,-9,32,-6); c.stroke() });
  pfxMake("sylph",44,44,c=>{ // 몸: 빛나는 초록 정령 + 작은 얼굴
    const g=c.createRadialGradient(-3,-4,2,0,0,14); g.addColorStop(0,"#ffffff"); g.addColorStop(.45,"#b8ffd8"); g.addColorStop(1,"#2ab07a"); c.fillStyle=g; c.beginPath(); c.ellipse(0,0,11,13,0,0,7); c.fill(); c.lineWidth=2; c.strokeStyle="#0e5a3e"; c.stroke();
    c.fillStyle="#0e3a2a"; c.beginPath(); c.ellipse(-4,-1,1.8,2.6,0,0,7); c.ellipse(4,-1,1.8,2.6,0,0,7); c.fill(); c.fillStyle="#fff"; c.fillRect(-4.5,-2.5,1,1); c.fillRect(3.5,-2.5,1,1);
    c.strokeStyle="#0e3a2a"; c.lineWidth=1.2; c.beginPath(); c.arc(0,3,2.5,.2,Math.PI-.2); c.stroke();
    c.fillStyle="#7ae0a8"; c.beginPath(); c.moveTo(-3,-12); c.quadraticCurveTo(0,-22,6,-18); c.quadraticCurveTo(2,-14,3,-11); c.fill(); c.stroke() });
}
function drawSylph(c,m,t){ const dir=-Math.sin(m.a)>=0?1:-1, fl=Math.sin(t*16), bob=Math.sin(t*4)*3;
  c.save(); c.globalCompositeOperation="lighter"; jGlow(c,m.x,m.y,40,"120,255,190",.45);
  for(let i=0;i<8;i++){ const ph=(t*1.4+i/8)%1, a=i*.8+t*2; c.fillStyle=`rgba(200,255,230,${1-ph})`; c.fillRect(m.x-dir*(8+ph*40)+Math.sin(a)*6-1.5,m.y+4+Math.cos(a)*6-ph*6-1.5,3,3) }
  c.strokeStyle="rgba(200,255,235,.55)"; c.lineWidth=2; for(let i=0;i<2;i++){ c.beginPath(); c.ellipse(m.x,m.y+bob+8,20+i*6,6+i*2,0,t*3+i,t*3+i+3.6); c.stroke() } c.restore();
  c.save(); c.translate(m.x,m.y+bob);
  for(const s of [-1,1]){ c.save(); c.scale(s,1); c.translate(5,-4); c.rotate(-.35-fl*.35); pfxDraw(c,"sylphwing",18,-2,0,1,.95); c.restore() }
  c.scale(dir,1); pfxDraw(c,"sylph",0,0,Math.sin(t*3)*.08,1.05); c.restore() }

/* ===================== 새 직업 4개: 달빛 치유사 · 붓의 도사 · 십이지 조련사 · 강철 메카닉 ===================== */
function nImg(c,k,x,y,h,flip,rot,alpha){ if(typeof SKILL_IMG==="undefined"||!SKILL_IMG[k]) return false; c.save(); c.translate(x,y); if(rot) c.rotate(rot); if(alpha!==undefined) c.globalAlpha*=alpha; drawSkillImg(c,k,h,flip); c.restore(); return true }
function drawNewShot(c,sh,a,t,GL){ const k=sh.k;
  if(k==="tracer"){ c.save(); c.translate(sh.x,sh.y); c.rotate(a); c.globalCompositeOperation=GL; const g=c.createLinearGradient(-60,0,6,0); g.addColorStop(0,"rgba(255,170,60,0)"); g.addColorStop(.7,"rgba(255,210,120,.8)"); g.addColorStop(1,"#fffbe8"); c.fillStyle=g; c.beginPath(); c.moveTo(-60,0); c.lineTo(0,-3); c.lineTo(7,0); c.lineTo(0,3); c.closePath(); c.fill(); jGlow(c,2,0,12,"255,200,100",.6); c.restore(); return true }
  if(k==="plasma"){ c.save(); c.globalCompositeOperation=GL; for(let j=1;j<=5;j++){ c.fillStyle=`rgba(110,220,255,${.22-j*.035})`; c.beginPath(); c.arc(sh.x-sh.vx*.02*j,sh.y-sh.vy*.02*j,18-j*2,0,7); c.fill() }
    jGlow(c,sh.x,sh.y,40,"120,230,255",.9); c.strokeStyle="rgba(220,250,255,.9)"; c.lineWidth=2; for(let i=0;i<2;i++){ c.beginPath(); c.ellipse(sh.x,sh.y,16,7,t*9+i*1.57,0,7); c.stroke() }
    c.fillStyle="#fff"; c.beginPath(); c.arc(sh.x,sh.y,8,0,7); c.fill(); c.restore(); return true }
  if(k==="moonorb"&&window.__t5==="healer"&&typeof SKILL_IMG!=="undefined"&&SKILL_IMG.moonorb5&&!window.__noArt){ const im=SKILL_IMG.moonorb5, L=(sh.sm?.75:1)*64, H=L*im.height/im.width; c.save(); c.globalCompositeOperation=GL; jGlow(c,sh.x,sh.y,30,"190,150,255",.55); c.translate(sh.x,sh.y); c.rotate(a); c.globalCompositeOperation="source-over"; c.drawImage(im,-L*.72,-H/2,L,H); c.restore(); return true }
  if(k==="moonorb"){ const s=sh.sm?.75:1; c.save(); c.globalCompositeOperation=GL; jGlow(c,sh.x,sh.y,26*s,"190,215,255",.6);
      for(let j=1;j<=3;j++){ c.fillStyle=`rgba(220,230,255,${.22/j})`; c.beginPath(); c.arc(sh.x-sh.vx*.02*j,sh.y-sh.vy*.02*j,9*s-j,0,7); c.fill() } c.restore();
    if(!nImg(c,"moonorb",sh.x,sh.y,30*s,false,t*2)){ c.fillStyle="#eef3ff"; c.beginPath(); c.arc(sh.x,sh.y,9*s,0,7); c.fill() } return true }
  if(k==="swave"){ const al=Math.min(1,sh.life/.16), age=(sh.age=(sh.age||0)+.016), R=74+Math.min(1,age*4)*34;   /* 전사 5차 불꽃 검기 */
    c.save(); c.globalCompositeOperation=GL; jGlow(c,sh.x,sh.y,R*.75,"255,130,50",.32*al); c.restore();
    if(!heroArc(c,sh.x-Math.cos(a)*R*.62,sh.y-Math.sin(a)*R*.62,a,R,al,"hw",.7)){ c.save(); c.translate(sh.x,sh.y); c.rotate(a); c.globalAlpha=al; c.strokeStyle="#ffb04a"; c.lineWidth=9; c.beginPath(); c.arc(-R*.4,0,R*.7,-1,1); c.stroke(); c.strokeStyle="#fff3c4"; c.lineWidth=3; c.stroke(); c.restore() } return true }
  if(k==="ink"&&window.__t5==="calli"&&typeof SKILL_IMG!=="undefined"&&SKILL_IMG.ink5&&!window.__noArt){ const im=SKILL_IMG.ink5, age=(sh.age=(sh.age||0)+.016), gr=Math.min(1,.55+age*3), L=92*gr, H=L*im.height/im.width, al=Math.min(1,sh.life/.15);   /* 5차: 둥근 쪽이 앞으로 날아가는 먹 초승달 */
    c.save(); c.translate(sh.x,sh.y); c.rotate(a); for(let j=3;j>=1;j--){ c.globalAlpha=al*.16*(4-j)/3; c.drawImage(im,-L*.72-j*16,-H/2,L,H) }
    c.globalAlpha=al; c.drawImage(im,-L*.72,-H/2,L,H); c.globalCompositeOperation="lighter"; c.globalAlpha=al*.3; c.drawImage(im,-L*.72,-H/2,L,H); c.restore(); return true }
  if(k==="ink"&&typeof SKILL_IMG!=="undefined"&&SKILL_IMG.ink&&!window.__noArt){ const im=SKILL_IMG.ink, age=(sh.age=(sh.age||0)+.016), gr=Math.min(1,.6+age*3), Hh=(sh.rad||26)*3.6*gr, Ww=Hh*im.width/im.height, al=Math.min(1,sh.life/.15);   /* 붓 먹물: 휘어진 쪽이 앞으로 날아가는 큰 먹 초승달 + 잔상 */
    c.save(); c.translate(sh.x,sh.y); c.rotate(a); for(let j=3;j>=1;j--){ c.globalAlpha=al*.14*(4-j)/3; c.drawImage(im,-Ww*.6-j*14,-Hh/2,Ww,Hh) } c.globalAlpha=al; c.drawImage(im,-Ww*.6,-Hh/2,Ww,Hh); c.restore(); return true }
  if(k==="ink"){ const life=sh.life, al=Math.min(1,life/.15); c.save(); c.globalAlpha=al;
    for(let j=1;j<=4;j++){ c.fillStyle=`rgba(20,16,24,${.18/j})`; c.beginPath(); c.arc(sh.x-sh.vx*.02*j+Math.sin(j*7)*8,sh.y-sh.vy*.02*j+Math.cos(j*5)*8,4-j*.5,0,7); c.fill() }
    if(!nImg(c,"ink",sh.x,sh.y,70,false,a)){ c.translate(sh.x,sh.y); c.rotate(a); c.strokeStyle="#151018"; c.lineWidth=7; c.beginPath(); c.arc(-14,0,30,-1.1,1.1); c.stroke() } c.restore(); return true }
  if(k==="charm"&&typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.charmfx){ const im=SKILL_IMG.charmfx, L=78, H=L*im.height/im.width; c.save(); c.translate(sh.x,sh.y); c.rotate(a+Math.sin(t*14+sh.x)*.08); c.scale(1,1+Math.sin(t*18+sh.y)*.08); c.globalCompositeOperation="lighter"; c.drawImage(im,-L*.82,-H/2,L,H); c.restore(); return true }
  if(k==="charm"){ c.save(); c.globalCompositeOperation=GL; jGlow(c,sh.x,sh.y,16,"255,220,120",.45); c.restore();
    c.save(); c.translate(sh.x,sh.y); c.rotate(a+Math.PI/2+Math.sin(t*14+sh.x)*.25);
    c.fillStyle="#2a1a10"; c.fillRect(-7,-11,14,22); c.fillStyle="#f6dc7a"; c.fillRect(-6,-10,12,20); c.fillStyle="#fff3b8"; c.fillRect(-6,-10,3,20);
    c.strokeStyle="#c0281e"; c.lineWidth=1.6; c.beginPath(); c.moveTo(-3,-6); c.lineTo(3,-6); c.moveTo(0,-8); c.lineTo(0,6); c.moveTo(-3,0); c.quadraticCurveTo(0,3,3,0); c.stroke(); c.fillStyle="#c0281e"; c.beginPath(); c.arc(0,6,2.2,0,7); c.fill();
    c.fillStyle="#f6c544"; c.beginPath(); c.arc(0,13,3,0,7); c.fill(); c.strokeStyle="#7a5a10"; c.lineWidth=1; c.stroke(); c.restore(); return true }
  if(k==="fist"&&typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.rocketfist){ const im=SKILL_IMG.rocketfist, L=(sh.big?2.6:1)*82, H=L*im.height/im.width; c.save(); c.translate(sh.x,sh.y); c.rotate(a); c.drawImage(im,-L*.78,-H/2,L,H); c.globalCompositeOperation="lighter"; c.globalAlpha=.25+.15*Math.sin(t*40); c.drawImage(im,-L*.78,-H/2,L,H); c.restore(); return true }
  if(k==="fist"){ c.save(); c.translate(sh.x,sh.y); c.rotate(a); if(sh.big) c.scale(2.6,2.6); c.globalCompositeOperation=GL;
    const fg=c.createLinearGradient(-60,0,10,0); fg.addColorStop(0,"rgba(80,170,255,0)"); fg.addColorStop(1,"rgba(170,225,255,.85)"); c.fillStyle=fg; c.beginPath(); c.moveTo(-60,0); c.quadraticCurveTo(-20,-16,8,-12); c.lineTo(8,12); c.quadraticCurveTo(-20,16,-60,0); c.fill();
    jGlow(c,6,0,22,"150,210,255",.6); c.globalCompositeOperation="source-over";
    c.fillStyle="#3a2a12"; c.beginPath(); c.ellipse(4,0,13,12,0,0,7); c.fill(); const bg=c.createLinearGradient(0,-11,0,11); bg.addColorStop(0,"#ffe9a0"); bg.addColorStop(.5,"#d9a43a"); bg.addColorStop(1,"#8a5a18"); c.fillStyle=bg; c.beginPath(); c.ellipse(4,0,11.5,10.5,0,0,7); c.fill();
    c.strokeStyle="#5a3a10"; c.lineWidth=1.3; for(let i=-1;i<=1;i++){ c.beginPath(); c.moveTo(9,i*5.5-2.2); c.lineTo(14.5,i*5.5-2.2); c.stroke() } c.fillStyle="#6ad0ff"; c.beginPath(); c.arc(-2,0,3,0,7); c.fill(); c.restore(); return true }
  if(k==="missile"){ c.save(); for(let j=1;j<=5;j++){ c.fillStyle=`rgba(200,200,210,${.3-j*.05})`; c.beginPath(); c.arc(sh.x-sh.vx*.022*j,sh.y-sh.vy*.022*j,3+j*1.2,0,7); c.fill() }
    c.globalCompositeOperation=GL; jGlow(c,sh.x-Math.cos(a)*14,sh.y-Math.sin(a)*14,12,"255,170,60",.8); c.restore();
    if(!nImg(c,"missile",sh.x,sh.y,22,false,a)){ c.save(); c.translate(sh.x,sh.y); c.rotate(a); c.fillStyle="#c49a3a"; c.fillRect(-10,-4,20,8); c.fillStyle="#6ad0ff"; c.beginPath(); c.moveTo(16,0); c.lineTo(10,-4); c.lineTo(10,4); c.fill(); c.restore() } return true }
  if(k==="dball"&&typeof drawFireballFx==="function"&&typeof SKILL_IMG!=="undefined"&&SKILL_IMG.fireballfx&&!window.__noArt){ const T=blueFire(SKILL_IMG.fireballfx); if(T){ const L=150, H=L*T.height/T.width; c.save(); c.translate(sh.x,sh.y); c.rotate(a); c.globalCompositeOperation="lighter"; if(typeof drawFlameImg==="function") drawFlameImg(c,T,L,H,.782,.537,t,sh.x*.013,false,.1); else c.drawImage(T,-L*.78,-H/2,L,H); jGlow(c,0,0,26,"150,210,255",.7); c.restore(); return true } }
  if(k==="dball"){ c.save(); c.globalCompositeOperation=GL; for(let j=1;j<=4;j++){ c.fillStyle=`rgba(80,170,255,${.25/j})`; c.beginPath(); c.arc(sh.x-sh.vx*.02*j,sh.y-sh.vy*.02*j,14-j*2,0,7); c.fill() }
    const gg=c.createRadialGradient(sh.x,sh.y,0,sh.x,sh.y,18); gg.addColorStop(0,"#ffffff"); gg.addColorStop(.35,"#9ae0ff"); gg.addColorStop(.75,"rgba(40,120,255,.7)"); gg.addColorStop(1,"rgba(20,60,200,0)"); c.fillStyle=gg; c.beginPath(); c.arc(sh.x,sh.y,18,0,7); c.fill(); c.restore(); return true }
  if(k==="laser"){ c.save(); c.globalCompositeOperation=GL; c.strokeStyle="rgba(120,220,255,.85)"; c.lineWidth=4; c.lineCap="round"; c.beginPath(); c.moveTo(sh.x-sh.vx*.03,sh.y-sh.vy*.03); c.lineTo(sh.x,sh.y); c.stroke(); c.strokeStyle="#ffffff"; c.lineWidth=1.5; c.stroke(); c.restore(); return true }
  return false }
function drawNewSum(c,m,t,GL){ const K=m.kind;
  if(K==="rabbit"){ const hop=Math.abs(Math.sin(m.hop||0))*10; c.save(); c.fillStyle="rgba(0,0,0,.18)"; c.beginPath(); c.ellipse(m.x,m.y+20,14-hop*.4,4,0,0,7); c.fill(); c.globalCompositeOperation=GL; jGlow(c,m.x,m.y-hop,34,"200,220,255",.4); c.restore();
    nImg(c,"rabbit",m.x,m.y-hop,48,(m.face||1)<0); return true }
  if(K==="rat"){ const w=m.run?Math.sin(t*30)*2:0; c.save(); c.fillStyle="rgba(0,0,0,.18)"; c.beginPath(); c.ellipse(m.x,m.y+12,11,3,0,0,7); c.fill(); c.restore();
    nImg(c,"rat",m.x,m.y-2+w,32+(m.bite>0?4:0),(m.face||1)<0); return true }
  if(K==="ox"){ c.save(); c.fillStyle="rgba(0,0,0,.2)"; c.beginPath(); c.ellipse(m.x,m.y+26,24,6,0,0,7); c.fill();
    if(m.ch>0){ for(let i=0;i<5;i++){ const ph=(t*6+i/5)%1; c.fillStyle=`rgba(200,180,150,${.5*(1-ph)})`; c.beginPath(); c.arc(m.x-(m.cvx>0?1:-1)*(20+ph*40),m.y+22-ph*8,4+ph*6,0,7); c.fill() } } c.restore();
    if(drawLegged(c,"ox",m.x,m.y-4+(m.ch>0?Math.sin(t*40)*1.5:Math.sin(t*3)),64,(m.face||1)<0,m.ch>0?(m.face||1)*.12:0,t*(m.ch>0?22:9),m.ch>0?1.1:.35)) return true;
    nImg(c,"ox",m.x,m.y-4+(m.ch>0?Math.sin(t*40)*2:Math.sin(t*3)),64,(m.face||1)<0,m.ch>0?(m.face||1)*.12:0); return true }
  if(K==="tiger"){ c.save(); c.fillStyle="rgba(0,0,0,.2)"; c.beginPath(); c.ellipse(m.x,m.y+24,20,5,0,0,7); c.fill(); if(m.pz>0){ c.globalCompositeOperation=GL; jGlow(c,m.x,m.y,40,"150,200,255",.5) } c.restore();
    m.pz2=Math.max(0,(m.pz2||0)-.016); const bob=m.run?Math.abs(Math.sin(t*16))*5:Math.sin(t*3)*1.5, tilt=m.pz>0?(m.face||1)*.25:m.pz2>0?(m.face||1)*.18:m.run?(m.face||1)*.08*Math.sin(t*16):0; if(drawLegged(c,"tiger",m.x,m.y-2-bob*.4,m.pz>0?64:56,(m.face||1)<0,tilt,t*16,m.run||m.pz>0?1:.15)) return true; nImg(c,"tiger",m.x,m.y-2-bob,m.pz>0?64:56,(m.face||1)<0,tilt); return true }
  if(K==="qdragon"){ const k=Math.min(1,(m.max-m.t)/.5,m.t/.5); c.save(); c.globalAlpha=k; c.globalCompositeOperation=GL; jGlow(c,m.x,m.y,90,"90,170,255",.45);
    for(let i=0;i<6;i++){ const ph=(t*.8+i/6)%1; c.fillStyle=`rgba(255,255,255,${.35*(1-ph)})`; c.beginPath(); c.ellipse(m.x-(m.face||1)*(30+ph*80),m.y+40+Math.sin(i)*10,18+ph*14,8+ph*5,0,0,7); c.fill() } c.restore();
    c.save(); c.globalAlpha=k; if(!drawBlueDragon(c,m,t)) nImg(c,"dragon",m.x,m.y+Math.sin(t*3)*6,130,(m.face||1)<0,Math.sin(t*2)*.08); c.restore(); return true }
  if(K==="drone"){ c.save(); c.globalCompositeOperation=GL; jGlow(c,m.x,m.y,22,"120,210,255",.35); c.restore(); nImg(c,"drone",m.x,m.y+Math.sin(t*6)*2,30,Math.cos(m.aim||0)<0);
    c.save(); c.strokeStyle="rgba(255,255,255,.55)"; c.lineWidth=1.5; c.beginPath(); c.ellipse(m.x,m.y-14,12*Math.abs(Math.sin(t*40)),2,0,0,7); c.stroke(); c.restore(); return true }
  return false }
function drawGlyphChar(c,ch,x,y,sz,al,gold,p){ c.save(); c.globalAlpha*=al; c.font=`${sz}px "${typeof BRUSH_FONT!=="undefined"?BRUSH_FONT:"serif"}","Noto Serif KR","Nanum Myeongjo",serif`; c.textAlign="center"; c.textBaseline="middle";
  if(p!==undefined&&p<.32){ const h=sz*1.3*Math.min(1,p/.32); c.beginPath(); c.rect(x-sz,y-sz*.65,sz*2,h); c.clip() }   // 붓으로 위에서부터 써 내려가요
  c.shadowColor="rgba(10,8,14,.55)"; c.shadowBlur=sz*.08; c.fillStyle="rgba(20,16,24,.35)"; c.fillText(ch,x+sz*.025,y+sz*.03); c.shadowBlur=0;   // 먹 번짐
  c.lineJoin="round"; c.lineWidth=sz*.07; c.strokeStyle=gold?"rgba(255,214,110,.95)":"rgba(255,255,255,.85)"; c.strokeText(ch,x,y);
  c.lineWidth=sz*.025; c.strokeStyle="rgba(255,250,225,.9)"; c.strokeText(ch,x,y);
  const g=c.createLinearGradient(x,y-sz*.5,x,y+sz*.5); g.addColorStop(0,"#2a2230"); g.addColorStop(.5,"#0e0a12"); g.addColorStop(1,"#1e1824"); c.fillStyle=g; c.fillText(ch,x,y); c.restore() }
function drawNewFx(c,f,k,t,GL,P){ if(drawSigFx(c,f,k,t)) return true; const p=1-k, K=f.k;
  if(f.k==="wburst"){ const q=1-k; drawBurst(c,f.x,f.y,f.m||5,(70+q*120)*(f.s||1),Math.min(1,k*1.6),q*.5); return true }
  if(K==="mzone"&&typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.mooncircle){ const fin=Math.min(1,p*f.max/.35,k*f.max/.4), R=f.r, im=SKILL_IMG.mooncircle, Wd=R*2.15*(.8+.2*fin), Hd=Wd*im.height/im.width;
    c.save(); c.globalCompositeOperation=GL; c.globalAlpha=fin*(.8+.1*Math.sin(t*3)); c.translate(f.x,f.y); c.drawImage(im,-Wd/2,-Hd/2,Wd,Hd);
    for(let i=0;i<10;i++){ const ph=(t*.6+i/10)%1, an=i*2.4; c.fillStyle=`rgba(210,230,255,${(1-ph)*fin*.8})`; c.fillRect(Math.cos(an)*R*.85-1.5,Math.sin(an)*R*.42-ph*90-1.5,3,3) } c.restore(); return true }
  if(K==="mzone"){ const fin=Math.min(1,p*f.max/.35,k*f.max/.4), R=f.r; c.save(); c.globalCompositeOperation=GL;
    const gg=c.createRadialGradient(f.x,f.y,R*.1,f.x,f.y,R); gg.addColorStop(0,`rgba(200,215,255,${.22*fin})`); gg.addColorStop(.85,`rgba(150,175,255,${.16*fin})`); gg.addColorStop(1,`rgba(220,230,255,${.45*fin})`); c.fillStyle=gg; c.beginPath(); c.ellipse(f.x,f.y,R,R*.62,0,0,7); c.fill();
    c.strokeStyle=`rgba(235,240,255,${.8*fin})`; c.lineWidth=3; c.beginPath(); c.ellipse(f.x,f.y,R,R*.62,0,0,7); c.stroke();
    c.lineWidth=1.5; c.beginPath(); c.ellipse(f.x,f.y,R*.82,R*.5,0,t*.8,t*.8+5); c.stroke();
    for(let i=0;i<6;i++){ const a=t*.8+i*Math.PI/3, x=f.x+Math.cos(a)*R*.82, y=f.y+Math.sin(a)*R*.5; c.fillStyle=`rgba(255,255,255,${fin})`; c.beginPath(); c.arc(x,y,6,0,7); c.fill(); c.fillStyle="rgba(150,175,255,1)"; c.beginPath(); c.arc(x+2.5,y-1.5,5,0,7); c.fill() }
    for(let i=0;i<10;i++){ const ph=(t*.6+i/10)%1, a=i*2.39; c.fillStyle=`rgba(230,240,255,${(1-ph)*fin})`; c.fillRect(f.x+Math.cos(a)*R*.7*((i%3+1)/3)-1.5,f.y+Math.sin(a)*R*.4*((i%3+1)/3)-ph*50-1.5,3,3) } c.restore(); return true }
  if(K==="healp"){ c.save(); c.globalCompositeOperation=GL; c.strokeStyle=`rgba(180,255,210,${k*.5})`; c.lineWidth=2.5; c.beginPath(); c.ellipse(f.x,f.y+10,f.r*p*.9+10,(f.r*p*.9+10)*.55,0,0,7); c.stroke();
    for(let i=0;i<6;i++){ const a=i*1.05+f.x, d=20+p*40; c.fillStyle=`rgba(200,255,220,${k})`; c.font='bold 14px sans-serif'; c.fillText("+",f.x+Math.cos(a)*d,f.y-p*30+Math.sin(a)*d*.4) } c.restore(); return true }
  if(K==="fullmoon"&&typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.fullmoonfx){ const el=p*f.max, up=1-Math.pow(1-Math.min(1,el/.7),3), fade=Math.min(1,k*f.max/.5), x=P.x+140, y=P.y-170+(1-up)*140, S=300*(.6+.4*up), flash=el>.75&&el<1.15?Math.sin((el-.75)/.4*Math.PI):0, im=SKILL_IMG.fullmoonfx;
    c.save(); c.fillStyle=`rgba(8,12,36,${.4*fade*up})`; c.fillRect(P.x-2000,P.y-2000,4000,4000); c.globalAlpha=fade*Math.min(1,el/.25); c.drawImage(im,x-S/2,y-S/2,S,S); c.globalCompositeOperation=GL;
    if(flash>0){ c.globalAlpha=flash*.45; c.drawImage(im,x-S*.6,y-S*.6,S*1.2,S*1.2); jGlow(c,x,y,S*.9,"230,240,255",flash*.7) } c.restore(); return true }
  if(K==="fullmoon"){ const up=Math.min(1,p*2.2), fade=Math.min(1,k*3), x=P.x, y=P.y-200+ (1-up)*-120; c.save();
    c.fillStyle=`rgba(10,15,40,${.32*fade*up})`; c.fillRect(P.x-2000,P.y-2000,4000,4000); c.globalCompositeOperation=GL; jGlow(c,x,y,170,"200,215,255",.6*fade);
    c.globalCompositeOperation="source-over"; c.globalAlpha=fade; if(!nImg(c,"moonorb",x,y,230*up+40,false,t*.3)){ c.fillStyle="#f0f4ff"; c.beginPath(); c.arc(x,y,100*up,0,7); c.fill() } c.restore(); return true }
  if(K==="moonbeam"&&typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.moonpillar){
    // 0) 조준: 떨어지기 전 가는 푸른 빛줄기가 내려와 땅에 닿고, 땅에서 푸른 불꽃이 튀어요 (보내 준 영상처럼)
    if(f.life>f.max){ const w=f.life-f.max; if(w>.6) return true; const a=1-w/.6; c.save(); c.globalCompositeOperation=GL;
      const lg=c.createLinearGradient(0,f.y-520,0,f.y); lg.addColorStop(0,"rgba(120,200,255,0)"); lg.addColorStop(1,`rgba(140,220,255,${.85*a})`); c.fillStyle=lg; const bw=3+a*5; c.fillRect(f.x-bw/2,f.y-520,bw,520);
      jGlow(c,f.x,f.y,30+a*30,"90,200,255",.8*a); c.strokeStyle=`rgba(150,140,255,${.8*a})`; c.lineWidth=2;
      for(let n=0;n<12;n++){ const an=Math.PI+n/11*Math.PI+Math.sin(t*20+n)*.08, L=(10+a*28)*(.6+.4*Math.sin(n*3.1+t*14)); c.beginPath(); c.moveTo(f.x,f.y); c.lineTo(f.x+Math.cos(an)*L,f.y+Math.sin(an)*L*.7); c.stroke() }
      c.restore(); return true }
    const im=SKILL_IMG.moonpillar, q=1-k, el=q*f.max, H=560, Wd0=H*im.width/im.height*(f.r/110), drop=Math.min(1,el/.12), dE=1-Math.pow(1-drop,2), hy=f.y-H*.94+H*.94*dE;
    // 1) 굵은 달빛 기둥이 쾅 내리꽂히고 → 2) 점점 가늘어지며 빛줄기로 흩어져요
    const thin=el<.3?1:Math.max(.12,1-(el-.3)/(f.max-.3)), Wd=Wd0*thin;
    c.save(); c.globalCompositeOperation=GL; c.globalAlpha=Math.min(1,k*2.5); c.beginPath(); c.rect(f.x-Wd0,f.y-H,Wd0*2,hy-(f.y-H)+4); c.clip(); c.drawImage(im,f.x-Wd/2,f.y-H*.942,Wd,H); c.restore();
    c.save(); c.globalCompositeOperation=GL; if(drop<1) jGlow(c,f.x,hy,50,"200,235,255",1);
    if(drop>=1){ const b=(el-.12)/(f.max-.12), R=f.r*(.45+b*1.2);
      jGlow(c,f.x,f.y-10,f.r*1.1*(1-b*.5),"120,200,255",(1-b)*.5);
      c.strokeStyle=`rgba(110,190,255,${(1-b)*.95})`; c.lineWidth=7*(1-b)+1; c.beginPath(); c.ellipse(f.x,f.y,R,R*.38,0,0,7); c.stroke();
      c.strokeStyle=`rgba(170,140,255,${(1-b)*.7})`; c.lineWidth=3; c.beginPath(); c.ellipse(f.x,f.y,R*.7,R*.27,0,0,7); c.stroke();
      // 물보라처럼 위로 튀는 빛 조각
      for(let n=0;n<12;n++){ const an=Math.PI+n/11*Math.PI, d=f.r*(.2+b*.9); c.fillStyle=`rgba(170,230,255,${1-b})`; c.fillRect(f.x+Math.cos(an)*d-2,f.y+Math.sin(an)*d*.6-Math.sin(b*Math.PI)*36-2,4,4) } }
    c.restore(); return true }
  if(K==="moonbeam"){ if(f.life>f.max) return true; c.save(); const w=f.r*.38*(.6+k*.4), gg=c.createLinearGradient(f.x-w,0,f.x+w,0); gg.addColorStop(0,"rgba(180,200,255,0)"); gg.addColorStop(.5,`rgba(245,248,255,${.75*k})`); gg.addColorStop(1,"rgba(180,200,255,0)");
    c.fillStyle=gg; c.fillRect(f.x-w,f.y-520,w*2,520); c.fillStyle=`rgba(230,238,255,${.35*k})`; c.beginPath(); c.ellipse(f.x,f.y,f.r*.7,f.r*.4,0,0,7); c.fill(); c.restore(); return true }
  if(K==="glyph"){ const sc=f.sky?1:Math.min(1,p*4), al=Math.min(1,k*3), sz=(f.sky?120:f.r*1.1)*(1.3-.3*sc); c.save();
    if(!f.sky){ c.globalCompositeOperation=GL; jGlow(c,f.x,f.y,f.r*1.2,"255,215,110",.35*al); c.globalCompositeOperation="source-over"; c.fillStyle=`rgba(20,16,24,${.25*al})`; c.beginPath(); c.ellipse(f.x,f.y,f.r,f.r*.55,0,0,7); c.fill() }
    else { c.globalCompositeOperation=GL; jGlow(c,f.x,f.y,110,"255,240,150",.5*al); c.globalCompositeOperation="source-over" }
    drawGlyphChar(c,f.ch,f.x,f.y-(f.sky?0:30),sz,al,true,p);
    for(let i=0;i<8;i++){ const a=i*.785+f.x, d=sz*.55+p*30; c.fillStyle=`rgba(20,16,24,${al*.7})`; c.beginPath(); c.arc(f.x+Math.cos(a)*d,f.y-(f.sky?0:30)+Math.sin(a)*d*.7,3+i%3,0,7); c.fill() } c.restore(); return true }
  if(K==="rockup"&&typeof SKILL_IMG!=="undefined"&&SKILL_IMG.mountain){ const T=f.max-f.life, im=SKILL_IMG.mountain, Wm=f.r*2.7, Hm=Wm*im.height/im.width, gy=f.y+f.r*.35;
    const rise=T<.28?1-Math.pow(1-T/.28,3)*(1)+Math.sin(T/.28*Math.PI)*.0:1, over=T<.28?0:T<.42?Math.sin((T-.28)/.14*Math.PI)*.04:0, sink=f.life<.35?(1-f.life/.35):0, al=Math.min(1,f.life/.3);
    const jit=T<.3?(Math.random()-.5)*6:0;
    c.save();
    // 땅 갈라짐 (먹선) + 그림자
    const cr=Math.min(1,T/.15); c.globalAlpha=al; c.fillStyle="rgba(10,8,14,.28)"; c.beginPath(); c.ellipse(f.x,gy,Wm*.5*cr,Wm*.12*cr,0,0,7); c.fill();
    const CK=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.inkcrack; if(CK){ const cw=Wm*1.7*(.55+.45*(1-Math.pow(1-cr,3))), ch=cw*CK.height/CK.width; c.save(); c.globalAlpha=al*Math.min(1,T/.08); c.translate(f.x,gy+Hm*.02); c.scale(1,.42); c.drawImage(CK,-cw/2,-ch/2,cw,ch); c.restore(); c.globalAlpha=al }   // 갈라진 땅을 바닥에 눕혀서 산 밑동에 딱 붙게
    // 산이 솟을 때 밑동에서 흙먼지·돌 조각이 튀어요
    if(T<.7){ const q=T/.7; for(let i=0;i<14;i++){ const a=(i/14)*Math.PI*2, d=Wm*(.32+q*.35), px=f.x+Math.cos(a)*d, py=gy+Math.sin(a)*d*.3-Math.sin(q*Math.PI)*(14+pfxR(i,3)*26); c.fillStyle=`rgba(${i%3?"70,62,58":"120,110,96"},${(1-q)*.85*al})`; c.beginPath(); c.ellipse(px,py,(4+pfxR(i,6)*6)*(1-q*.4),(3+pfxR(i,8)*4)*(1-q*.4),a,0,7); c.fill() }
      const dg=c.createRadialGradient(f.x,gy,Wm*.1,f.x,gy,Wm*.75); dg.addColorStop(0,`rgba(90,80,70,${.35*(1-q)*al})`); dg.addColorStop(1,"rgba(90,80,70,0)"); c.save(); c.translate(f.x,gy); c.scale(1,.35); c.translate(-f.x,-gy); c.fillStyle=dg; c.beginPath(); c.arc(f.x,gy,Wm*.75,0,7); c.fill(); c.restore() }
    else { c.strokeStyle="rgba(15,12,20,.8)"; c.lineWidth=3; c.lineCap="round"; for(let i=0;i<9;i++){ const a=i*.7+.3, L=Wm*(.35+pfxR(i,4)*.25)*cr; c.beginPath(); c.moveTo(f.x,gy); let px=f.x, py=gy; for(let k2=1;k2<=4;k2++){ px+=Math.cos(a+(pfxR(i,k2)-.5)*.6)*L/4; py+=Math.sin(a+(pfxR(i,k2+5)-.5)*.6)*L/4*.35; c.lineTo(px,py) } c.stroke() } }
    // 산: 땅선 위로만 보이게 잘라서 아래에서 솟아올라요
    c.save(); c.beginPath(); c.rect(f.x-Wm, gy-Hm*1.6, Wm*2, Hm*1.6+4); c.clip();
    const sc=1+over, y0=gy+(1-rise)*Hm*.95+sink*Hm*.25;
    c.globalAlpha=al; c.translate(f.x+jit,y0); c.scale(sc,sc); c.drawImage(im,-Wm/2,-Hm,Wm,Hm);
    // 솟는 순간 금빛 테두리 번쩍
    if(T>.18&&T<.6){ const q=1-Math.abs((T-.32)/.2); if(q>0&&typeof drawSil==="function"){ c.globalCompositeOperation="lighter"; c.translate(0,-Hm/2); drawSil(c,"mountain",Hm,false,q*.35,"#ffd98a") } }
    c.restore();
    // 산 밑동이 땅에 박힌 느낌: 밑동 앞쪽에 먹빛 흙먼지 띠를 깔아요
    { const dg=c.createRadialGradient(f.x,gy,4,f.x,gy,Wm*.55); dg.addColorStop(0,`rgba(40,34,44,${.55*al})`); dg.addColorStop(.6,`rgba(60,52,62,${.3*al})`); dg.addColorStop(1,"rgba(60,52,62,0)"); c.save(); c.globalAlpha=1; c.translate(f.x,gy); c.scale(1,.22); c.translate(-f.x,-gy); c.fillStyle=dg; c.beginPath(); c.arc(f.x,gy,Wm*.55,0,7); c.fill(); c.restore() }
    // 흙먼지 + 날아오르는 바위 조각 + 먹물 튀김
    if(T<.9){ const q=Math.min(1,T/.9); for(let i=0;i<14;i++){ const a=Math.PI+.15+pfxR(i,2)*(Math.PI-.3), sp=.5+pfxR(i,3)*.8, d=Wm*.55*q*sp, h=Math.sin(Math.min(1,q*1.4)*Math.PI)*(60+80*sp);
        const x=f.x+Math.cos(a)*d*(pfxR(i,6)<.5?1:-1), y=gy-h+Math.sin(a)*d*.2; c.globalAlpha=al*(1-q); c.fillStyle=i%3?"#2a2430":"#5a5262"; c.save(); c.translate(x,y); c.rotate(q*8+i); c.beginPath(); c.moveTo(-7,-4); c.lineTo(5,-7); c.lineTo(8,3); c.lineTo(-3,7); c.closePath(); c.fill(); c.restore() }
      for(let i=0;i<10;i++){ const a=i*.63, r=Wm*.45*Math.min(1,T/.25); c.globalAlpha=al*Math.max(0,.6-q*.6); c.fillStyle="rgba(200,190,175,.8)"; c.beginPath(); c.arc(f.x+Math.cos(a)*r,gy+Math.sin(a)*r*.25-8,16+q*20,0,7); c.fill() } }
    c.restore(); return true }
  if(K==="rockup"){ const up=Math.min(1,p*5), al=Math.min(1,k*2.5); c.save(); c.globalAlpha=al;
    for(let i=0;i<9;i++){ const a=i*.7+1, d=(i%3)*f.r*.28+f.r*.15, x=f.x+Math.cos(a)*d, y=f.y+Math.sin(a)*d*.55, h=(46+(i%4)*14)*up, w=16+(i%3)*5;
      c.fillStyle="#3a2a20"; c.beginPath(); c.moveTo(x-w-2,y+2); c.lineTo(x,y-h-3); c.lineTo(x+w+2,y+2); c.closePath(); c.fill();
      const gg=c.createLinearGradient(x-w,0,x+w,0); gg.addColorStop(0,"#a08a70"); gg.addColorStop(.5,"#7a6450"); gg.addColorStop(1,"#4a3a2c"); c.fillStyle=gg; c.beginPath(); c.moveTo(x-w,y); c.lineTo(x,y-h); c.lineTo(x+w,y); c.closePath(); c.fill() } c.restore(); return true }
  if(K==="inkpath"){ const T=f.max-f.life, D0=f.d0||0, ca=Math.cos(f.a), sa=Math.sin(f.a), inA=Math.min(1,T/(D0*.8)), outA=Math.min(1,f.life/.6), A=inA*outA;   // 용이 지나갈 길: 금빛 먹 띠 (공격 범위)
    const P_=v=>{ const w=Math.sin(v*9)*26; return [f.x+ca*f.len*v-sa*w, f.y+sa*f.len*v+ca*w] };
    c.save(); c.lineCap="round"; c.lineJoin="round"; const path=()=>{ c.beginPath(); for(let i=0;i<=40;i++){ const [x,y]=P_(i/40); i?c.lineTo(x,y):c.moveTo(x,y) } };
    path(); c.strokeStyle=`rgba(14,10,20,${.30*A})`; c.lineWidth=f.w*2.05; c.stroke();
    c.globalCompositeOperation="lighter"; path(); c.strokeStyle=`rgba(255,205,110,${.16*A})`; c.lineWidth=f.w*2; c.stroke(); path(); c.strokeStyle=`rgba(255,225,150,${.12*A})`; c.lineWidth=f.w*1.1; c.stroke();
    // 가장자리 금빛 붓선
    for(const sd of [-1,1]){ c.beginPath(); for(let i=0;i<=40;i++){ const v=i/40, [x,y]=P_(v), [x2,y2]=P_(Math.min(1,v+.01)), an=Math.atan2(y2-y,x2-x), o=sd*f.w*(1+.06*Math.sin(i*1.7)); const X=x-Math.sin(an)*o, Y=y+Math.cos(an)*o; i?c.lineTo(X,Y):c.moveTo(X,Y) } c.strokeStyle=`rgba(255,220,140,${.75*A})`; c.lineWidth=3; c.setLineDash([34,8,8,8]); c.lineDashOffset=-T*160; c.stroke(); c.setLineDash([]) }
    // 용이 나아갈 방향 화살표 (흘러가요)
    c.fillStyle=`rgba(255,235,180,${.45*A})`; for(let i=0;i<10;i++){ const v=((i/10)+T*.5)%1, [x,y]=P_(v), [x2,y2]=P_(Math.min(1,v+.01)), an=Math.atan2(y2-y,x2-x); c.save(); c.translate(x,y); c.rotate(an); c.beginPath(); c.moveTo(12,0); c.lineTo(-6,-10); c.lineTo(-1,0); c.lineTo(-6,10); c.closePath(); c.fill(); c.restore() }
    c.restore(); return true }
  if(K==="inkdragon"){ const T=f.max-f.life, D0=f.d0||0, u0=Math.max(0,(T-D0)/(f.max-D0)), u=u0<.5?2*u0*u0:1-2*(1-u0)*(1-u0), ca=Math.cos(f.a), sa=Math.sin(f.a);
    const P_=v=>{ const w=Math.sin(v*7)*58; return [f.x+ca*f.len*v-sa*w, f.y+sa*f.len*v+ca*w] };   // 살짝 굽이치는 길
    const [x,y]=P_(u), al=Math.min(1,f.life*3,T*3); c.save(); c.globalAlpha=al;
    // 먹물 붓자국 꼬리 (굵은 먹 띠 + 번짐)
    if(u>0){ const NB=26;
      for(let i=NB;i>=0;i--){ const v=u-.015-i*.011; if(v<0) continue; const [px,py]=P_(v), [qx,qy]=P_(Math.max(0,v-.004)), an=Math.atan2(py-qy,px-qx), tp=1-i/NB, w=6+tp*30;   // 붓 끝으로 갈수록 가늘게
        c.save(); c.translate(px,py); c.rotate(an); c.fillStyle=`rgba(18,14,22,${.12+tp*.5})`; c.beginPath(); c.ellipse(0,0,w*.9,w*.5,0,0,7); c.fill(); c.restore() }
      c.lineCap="round"; for(let s2=0;s2<5;s2++){ const off=(s2-2)*7; c.strokeStyle=`rgba(18,14,22,${.55-Math.abs(s2-2)*.12})`; c.lineWidth=2.2-Math.abs(s2-2)*.4; c.setLineDash([18+s2*6,6+s2*3]); c.beginPath();   // 마른 붓결
        for(let i=0;i<=22;i++){ const v=Math.max(0,u-.02-i*.013), [px,py]=P_(v), [qx,qy]=P_(Math.max(0,v-.004)), an=Math.atan2(py-qy,px-qx), o=off*(1-i/26); const X=px-Math.sin(an)*o, Y=py+Math.cos(an)*o; i?c.lineTo(X,Y):c.moveTo(X,Y) } c.stroke() } c.setLineDash([]);
      for(let i=0;i<12;i++){ const v=Math.max(0,u-.02-i*.03), [px,py]=P_(v), r=(9-i*.6)*(.6+pfxR(i,3)*.8); if(r<=0) continue; c.fillStyle=`rgba(18,14,22,${.7*(1-i/12)})`; c.beginPath(); c.arc(px+(pfxR(i,7)-.5)*36,py+(pfxR(i,9)-.5)*36,r,0,7); c.fill() }
      c.globalCompositeOperation=GL; for(let i=0;i<14;i++){ const ph=(T*2.6+i/14)%1, v=Math.max(0,u-ph*.12), [px,py]=P_(v); c.fillStyle=`rgba(255,215,110,${(1-ph)*.9})`; c.fillRect(px+(pfxR(i,5)-.5)*60-1.5,py+(pfxR(i,6)-.5)*60-1.5-ph*20,3,3) }
      jGlow(c,x,y,130,"255,210,110",.35); c.globalCompositeOperation="source-over" }
    // 몸이 물결치며 나는 용: 머리·몸통 마디·발·꼬리를 뼈대처럼 이어 붙여 움직여요
    const S=typeof SKILL_IMG!=="undefined"?SKILL_IMG:{};
    if(S.dr_head&&S.dr_body&&S.dr_tail){ const appear=Math.min(1,T/Math.max(.01,D0)), sc=.55+appear*.45, N=13, sp=46*sc, BH=70*sc;
      // 머리에서 꼬리 쪽으로: 지나온 길 + 몸을 따라 흐르는 물결
      const pts=[]; for(let i=0;i<=N+1;i++){ const v=u-i*sp/f.len, [px,py]=P_(Math.max(-.3,v)), [qx,qy]=P_(Math.max(-.3,v)+.002), an=Math.atan2(qy-py,qx-px), wv=Math.sin(T*6.5-i*.55)*(12+i*4.4)*sc; pts.push([px-Math.sin(an)*wv, py+Math.cos(an)*wv]) }
      const angAt=i=>{ const a=pts[Math.max(0,i)], b=pts[Math.min(pts.length-1,i+1)]; return Math.atan2(a[1]-b[1],a[0]-b[0]) };
      const part=(img,x,y,an,w,h,ox,oy,flipY,alpha,cx0,cx1)=>{ c.save(); c.translate(x,y); c.rotate(an); if(flipY) c.scale(1,-1); if(alpha!==undefined) c.globalAlpha*=alpha; if(cx0!==undefined){ const sx=img.width*cx0, sw=img.width*(cx1-cx0); c.drawImage(img,sx,0,sw,img.height,-w*ox,-h*oy,w,h) } else c.drawImage(img,-w*ox,-h*oy,w,h); c.restore() };
      const up=a=>Math.cos(a)<0;   // 왼쪽으로 날 때는 등이 위로 오게 뒤집어요
      const legs=[[2,"dr_front",0],[N-3,"dr_back",1.3]];
      // 먼 쪽 발 (몸 뒤, 조금 어둡게)
      for(const [i,key,ph] of legs){ const im2=S[key]; if(!im2) continue; const a=angAt(i), w=82*sc, h=w*im2.height/im2.width, sw=Math.sin(T*8+ph+1.6)*.45; part(im2,pts[i][0],pts[i][1],a+(up(a)?-1:1)*(.9+sw),w,h,.25,.2,up(a),.55) }
      // 꼬리
      { const i=N+1, a=angAt(N), im2=S.dr_tail, w=140*sc, h=w*im2.height/im2.width; part(im2,pts[N][0],pts[N][1],a+(up(a)?-1:1)*Math.PI*1.5+Math.sin(T*7.5-N*.62)*.25,w,h,.86,.97,up(a)) }
      // 몸통 마디 (꼬리 쪽부터 그려서 머리 쪽이 위에 오게)
      for(let i=N;i>=1;i--){ const a=angAt(i-1), mx=(pts[i][0]+pts[i-1][0])/2, my=(pts[i][1]+pts[i-1][1])/2, tp=1-(i/N)*.35, w=sp*1.25, h=BH*tp; part(S.dr_body,mx,my,a,w,h,.5,.55,up(a),undefined,.32,.68) }
      // 가까운 쪽 발 (몸 앞, 헤엄치듯)
      for(const [i,key,ph] of legs){ const im2=S[key]; if(!im2) continue; const a=angAt(i), w=92*sc, h=w*im2.height/im2.width, sw=Math.sin(T*8+ph)*.5; part(im2,pts[i][0],pts[i][1]+6*sc,a+(up(a)?-1:1)*(1.05+sw),w,h,.22,.18,up(a)) }
      // 머리 (살짝 고개를 끄덕이며)
      { const a=angAt(0)+Math.sin(T*7.5+.8)*.08, im2=S.dr_head, w=160*sc, h=w*im2.height/im2.width; part(im2,pts[0][0],pts[0][1],a,w,h,.3,.55,up(a)) }
      // 눈빛 · 입김
      c.globalCompositeOperation=GL; jGlow(c,pts[0][0]+Math.cos(angAt(0))*60*sc,pts[0][1]+Math.sin(angAt(0))*60*sc,40*sc,"255,215,120",.22); c.globalCompositeOperation="source-over" }
    else { const im=S.inkdragon;
    if(im){ const H=270, Wd=H*im.width/im.height, N=34, sh=im.height/N, dh=H/N, right=ca>=0, [nx,ny]=P_(Math.min(1,u+.01)), dir=Math.atan2(ny-y,nx-x)||f.a, appear=Math.min(1,T/D0||1);
      c.translate(x,y); c.rotate(dir+Math.PI/2); if(!right) c.scale(-1,1); c.scale(appear*.9+.1,appear*.9+.1);
      c.rotate(Math.sin(T*5)*.07);
      for(let i=0;i<N;i++){ const k2=i/(N-1), sw=Math.sin(T*9-i*.26)*(2+k2*15), tw=Math.sin(T*9-i*.26+1.2)*.03*k2; c.save(); c.translate(sw,-H/2+i*dh+dh/2); c.rotate(tw); c.drawImage(im,0,i*sh,im.width,sh+1,-Wd/2,-dh/2,Wd,dh+1); c.restore() } } }
    c.restore(); return true }
  if(K==="robot"){ const T=f.max-f.life, H=230, d=f.dir, fl=d<0, im=typeof SKILL_IMG!=="undefined"&&SKILL_IMG.robot;
    // 움직임 단계: 강하(0~.75) → 착지 출렁 → 미사일 반동(1.15~1.8) → 주먹 기울기(1.95~2.9) → 빔(3.0~3.5) → 상승(3.5~)
    const FB=!!f.fb, UPT=FB?4.55:3.5, fall=Math.max(0,1-T/.75), land=T>.75&&T<1.05?Math.sin((T-.75)/.3*Math.PI):0, up=T>UPT?(T-UPT)/.4:0;
    let lean=0, dx=0, rec=0;
    if(FB){ if(T>1.3&&T<3.25) rec=Math.sin(T*70)*2.6; if(T>2.6&&T<3.95) dx=-6-Math.sin((T-2.6)*34)*3; if(T>.85&&T<1.2) lean=-Math.sin((T-.85)/.35*Math.PI)*.05 }
    else { if(T>1.95&&T<2.9){ const ph=((T-1.95)%.32)/.32; lean=Math.sin(ph*Math.PI)*.16; dx=Math.sin(ph*Math.PI)*24 }
      if(T>1.15&&T<1.8) rec=Math.sin((T-1.15)*40)*2.2; if(T>3&&T<3.5) dx=-6-Math.sin((T-3)*30)*3 }
    const bob=Math.sin(T*5)*3*(1-fall), y=f.y-fall*fall*700-up*up*620+land*8+bob, x=f.x+d*dx+rec, sq=1-land*.06, al=Math.min(1,f.life/.3);
    c.save();
    // 그림자 · 먼지
    const sh=1-Math.max(fall,up)*.8; c.fillStyle=`rgba(0,0,0,${.35*sh})`; c.beginPath(); c.ellipse(f.x,f.y+H*.43,80*sh,20*sh,0,0,7); c.fill();
    if(T>.75&&T<1.5){ const q=(T-.75)/.75; for(let i=0;i<10;i++){ const an=i/10*6.283, r=60+q*110; c.fillStyle=`rgba(200,190,170,${.5*(1-q)})`; c.beginPath(); c.arc(f.x+Math.cos(an)*r,f.y+H*.4+Math.sin(an)*r*.35-q*10,10+q*16,0,7); c.fill() } }
    // 추진기 불꽃 (강하 · 상승 · 공중에 떠 있는 동안 살짝)
    const thr=fall>0?1+fall*.4:up>0?1.4:T>.75&&T<1.0?(1-(T-.75)/.25)*.8:0;
    if(thr>0){ for(const [ox,oy,s0] of [[-H*.11,H*.45,1],[H*.11,H*.45,1],[-H*.2,-H*.08,.7],[H*.2,-H*.08,.7]]){ const fk=.8+Math.random()*.4, L=(70*fk)*thr*s0, w=16*thr*s0, X=x+(fl?-ox:ox), Y=y+oy*sq;
        c.globalCompositeOperation=GL; jGlow(c,X,Y+L*.35,w*2.6,"90,160,255",.55);
        const go=c.createLinearGradient(X,Y,X,Y+L); go.addColorStop(0,"rgba(120,190,255,.95)"); go.addColorStop(.5,"rgba(60,110,255,.75)"); go.addColorStop(1,"rgba(30,60,220,0)"); c.fillStyle=go; c.beginPath(); c.moveTo(X-w,Y); c.quadraticCurveTo(X-w*.6,Y+L*.6,X,Y+L); c.quadraticCurveTo(X+w*.6,Y+L*.6,X+w,Y); c.fill();
        const gi=c.createLinearGradient(X,Y,X,Y+L*.6); gi.addColorStop(0,"rgba(255,255,255,1)"); gi.addColorStop(.6,"rgba(180,235,255,.8)"); gi.addColorStop(1,"rgba(120,200,255,0)"); c.fillStyle=gi; c.beginPath(); c.moveTo(X-w*.45,Y); c.quadraticCurveTo(X,Y+L*.75,X+w*.45,Y); c.fill();
        c.globalCompositeOperation="source-over"; for(let i=0;i<3;i++){ const ph=((T*4+i/3+ox*.01)%1+1)%1; c.fillStyle=`rgba(200,200,210,${.35*(1-ph)})`; c.beginPath(); c.arc(X+(pfxR(i,ox|0)-.5)*20,Y+L+ph*40,6+ph*14,0,7); c.fill() } } }
    // 착지 충격 빛
    if(T>.72&&T<.95){ c.globalCompositeOperation=GL; jGlow(c,f.x,f.y+H*.3,200,"255,230,160",.8*(1-(T-.72)/.23)); c.globalCompositeOperation="source-over" }
    // 몸 (빠르게 움직일 땐 잔상)
    const imF=FB&&SKILL_IMG.robotfb, armed=imF&&T>=1.0&&T<4.3;
    if(im&&imF&&T>.8&&T<4.55){
      // 변신: 하얗게 달아올랐다가(.8~1.0) 번쩍! 무장한 모습으로 바뀌고(1.0) 빛이 빠져요(1.0~1.25). 해제도 같은 방식(3.75~4.1)
      const wIn=T<1.0?(T-.8)/.2:T<1.25?1-(T-1.0)/.25:T>4.15&&T<4.3?(T-4.15)/.15:T>=4.3?Math.max(0,1-(T-4.3)/.25):0;
      const pop=T>=1.0&&T<1.18?Math.sin((T-1.0)/.18*Math.PI)*.06:0, key=armed?"robotfb":"robot", sc=1+pop;
      c.save(); c.globalAlpha=al; c.translate(x,y); c.rotate(d*lean); c.scale(sc,sq*sc); drawSkillImg(c,key,H,!fl); drawSil(c,key,H,!fl,Math.min(1,wIn)*.95,"#eaf6ff"); c.restore();
      if(wIn>0){ c.globalCompositeOperation=GL; jGlow(c,x,y-H*.1,H*(.5+wIn*.4),"170,215,255",.55*wIn); c.globalCompositeOperation="source-over" }
      // 무장 전개 순간: 빛의 고리 + 금속 파편
      if(T>=1.0&&T<1.45){ const q=(T-1.0)/.45; c.globalCompositeOperation=GL; c.strokeStyle=`rgba(190,230,255,${.9*(1-q)})`; c.lineWidth=10*(1-q)+1; c.beginPath(); c.ellipse(x,y+H*.2,60+q*230,(60+q*230)*.42,0,0,7); c.stroke();
        c.lineWidth=3*(1-q); c.beginPath(); c.ellipse(x,y+H*.2,40+q*150,(40+q*150)*.42,0,0,7); c.stroke();
        for(let i=0;i<12;i++){ const a=i*.5236+.2, r=40+q*160; c.fillStyle=`rgba(255,240,200,${1-q})`; c.save(); c.translate(x+Math.cos(a)*r,y-H*.15+Math.sin(a)*r*.7); c.rotate(a); c.fillRect(-9,-1.5,18,3); c.restore() } c.globalCompositeOperation="source-over" }
      // 과열: 하얗게 달아오르고 김이 나요
      if(T>3.7&&T<4.3){ const q=Math.sin((T-3.7)/.6*Math.PI); c.globalCompositeOperation=GL; c.save(); c.globalAlpha=q*.35; c.translate(x,y); c.scale(1,sq); drawSkillImg(c,"robotfb",H,!fl); c.restore(); c.globalCompositeOperation="source-over";
        for(let i=0;i<8;i++){ const ph=(T*1.6+i/8)%1, ox=(pfxR(i,7)-.5)*H*.7; c.fillStyle=`rgba(235,240,250,${.35*q*(1-ph)})`; c.beginPath(); c.arc(x+ox,y-H*.3-ph*90,10+ph*22,0,7); c.fill() } }
      roboPorts(c,f,T,x,y,H,d,sq,al) }
    else if(im){ const draw=(xx,yy,a2)=>{ c.save(); c.globalAlpha=al*a2; c.translate(xx,yy); c.rotate(d*lean); c.scale(1,sq); drawSkillImg(c,"robot",H,!fl); c.restore() };
      if(fall>0||up>0) for(let i=3;i>=1;i--) draw(x,y-(fall>0?-1:1)*i*28,.18/i);
      draw(x,y,1);
      // 눈 · 가슴 수정 빛
      c.globalCompositeOperation=GL; const pulse=.6+.4*Math.sin(T*10); jGlow(c,x+d*H*.02,y-H*.36,22,"120,220,255",.9*al); jGlow(c,x+d*H*.03,y-H*.2,30+(T>2.9&&T<3.5?40:0),"120,200,255",pulse*al);
      if(T>2.85&&T<3.0){ jGlow(c,x+d*H*.03,y-H*.2,90*(T-2.85)/.15,"200,240,255",.9) } c.globalCompositeOperation="source-over" }
    c.restore(); return true }
  if(K==="beamchg"){ const p2=1-f.life/f.max; c.save(); c.translate(f.x,f.y); c.rotate(f.a); c.globalCompositeOperation=GL;
    // 가는 조준선 (깜빡이며 점점 또렷하게)
    const al=(.35+.5*p2)*(.75+.25*Math.sin(p2*60)); c.fillStyle=`rgba(150,210,255,${al*.5})`; c.fillRect(0,-3,f.len,6); c.fillStyle=`rgba(235,250,255,${al})`; c.fillRect(0,-1,f.len,2);
    // 가슴으로 빨려 드는 빛 알갱이 + 커지는 빛
    for(let i=0;i<14;i++){ const q=((p2*2.2+i/14)%1), a=i*2.39, d=(1-q)*120; c.fillStyle=`rgba(190,235,255,${q})`; c.fillRect(Math.cos(a)*d,Math.sin(a)*d,3,3) }
    jGlow(c,0,0,18+p2*46,"170,225,255",.5+.4*p2);
    // 발사 직전 고리 섬광
    if(p2>.82){ const r=(p2-.82)/.18; c.strokeStyle=`rgba(255,255,255,${1-r*.5})`; c.lineWidth=5; c.beginPath(); c.ellipse(10,0,8+r*14,26+r*40,0,0,7); c.stroke() }
    c.restore(); return true }
  if(K==="robobeam"&&(f.sweep||f.len>740)){ const k2=f.life/f.max, p2=1-k2, el0=f.max-f.life, open=Math.min(1,el0/.05)*(1+.9*Math.max(0,1-el0/.16)), fade=f.sweep?Math.min(1,f.life/.3):Math.min(1,k2*3), w=(78+Math.sin(p2*52)*7)*open*(.4+.6*fade), L=f.len*Math.min(1,el0/.05);
    if(el0<.12){ c.save(); c.globalCompositeOperation=GL; const r=el0/.12; c.translate(f.x,f.y); if(f.sweep) c.rotate(f.a0); c.strokeStyle=`rgba(255,255,255,${1-r})`; c.lineWidth=8*(1-r)+2; c.beginPath(); c.ellipse(14,0,14+r*30,46+r*70,0,0,7); c.stroke(); jGlow(c,0,0,90+r*60,"220,245,255",1-r); c.restore() }
    c.save(); c.translate(f.x,f.y); if(f.sweep){ const el=f.max-f.life; c.rotate(f.a0+f.w*Math.max(0,Math.min(f.sweep,el-.15))) } else c.scale(f.dir,1); c.globalCompositeOperation=GL;
    // 바깥 빛 → 안쪽 심: 뾰족하게 열리고 끝은 둥글게
    const band=(hw,col,a)=>{ c.fillStyle=`rgba(${col},${a})`; c.beginPath(); c.moveTo(0,-hw*.35); c.quadraticCurveTo(40,-hw,90,-hw); c.lineTo(L-hw*.6,-hw); c.quadraticCurveTo(L+hw*.5,0,L-hw*.6,hw); c.lineTo(90,hw); c.quadraticCurveTo(40,hw,0,hw*.35); c.closePath(); c.fill() };
    // 휩쓸 때 뒤따르는 잔상 빛 (부채꼴)
    if(f.sweep){ const el=f.max-f.life, sw=el>.15&&el<.15+f.sweep; if(sw){ const tr=-Math.sign(f.w)*.55; c.fillStyle=`rgba(90,170,255,${.16*fade})`; c.beginPath(); c.moveTo(0,0); c.arc(0,0,L,Math.min(0,tr),Math.max(0,tr)); c.closePath(); c.fill();
        c.fillStyle=`rgba(170,225,255,${.14*fade})`; c.beginPath(); c.moveTo(0,0); c.arc(0,0,L,Math.min(0,tr*.4),Math.max(0,tr*.4)); c.closePath(); c.fill() } }
    const PL=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.pulselaser;
    if(PL){ const jit=1+Math.sin(p2*90)*.06, H2=w*3.2*jit; c.drawImage(PL,0,-H2/2,L+w,H2); c.globalAlpha=.35+.25*Math.sin(p2*70); c.drawImage(PL,0,-H2*.32,L+w,H2*.64); c.globalAlpha=1;
      // 충전 섬광(포구) · 빔 끝 폭발 불티
      jGlow(c,6,0,70*open*(1+.2*Math.sin(p2*60)),"170,220,255",.9*fade); jGlow(c,L,0,90,"120,190,255",.6*fade);
      for(let i=0;i<8;i++){ const q=(p2*6+i/8)%1; c.fillStyle=`rgba(200,235,255,${(1-q)*fade})`; c.fillRect(L+Math.cos(i*2.4)*q*60,Math.sin(i*2.4)*q*40,3,3) } c.restore(); return true }
    band(w*1.8,"50,120,255",.16*fade); band(w,"90,180,255",.38*fade); band(w*.48,"190,235,255",.6*fade); band(w*.18,"255,255,255",.95*fade);
    // 흐르는 에너지 줄무늬 (가로로 지나가요)
    c.fillStyle=`rgba(255,255,255,${.8*fade})`; for(let i=0;i<18;i++){ const u=(i/18+p2*2.2)%1, yy=(pfxR(i,5)-.5)*w*1.5; c.fillRect(u*L,yy,20+pfxR(i,8)*26,1.8) }
    // 감기는 얇은 고리
    c.strokeStyle=`rgba(200,240,255,${.55*fade})`; c.lineWidth=2; for(let i=0;i<6;i++){ const u=((i/6)+p2*1.3)%1; if(u*f.len>L) continue; c.beginPath(); c.ellipse(u*L,0,6,w*1.15,0,0,7); c.stroke() }
    jGlow(c,8,0,55*open,"210,245,255",.75*fade); jGlow(c,L,0,120,"150,210,255",.5*fade); c.restore(); return true }
  if(K==="robobeam"&&typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.pulselaser){ const k2=f.life/f.max, p2=1-k2, L=f.len*Math.min(1,1-Math.pow(1-Math.min(1,p2/.12),3)), H2=(110+Math.sin(p2*80)*10)*Math.min(1,p2*8)*Math.min(1,k2*3+.2);
    c.save(); c.translate(f.x,f.y); c.scale(f.dir,1); c.globalCompositeOperation=GL; c.drawImage(SKILL_IMG.pulselaser,0,-H2/2,L+20,H2); jGlow(c,6,0,90,"170,220,255",k2); jGlow(c,L,0,110,"120,190,255",.6*k2); c.restore(); return true }
  if(K==="robobeam"){ const k2=f.life/f.max, w=(70+Math.sin((1-k2)*40)*8)*Math.min(1,(1-k2)*6), x1=f.x+f.dir*f.len; c.save(); c.globalCompositeOperation=GL;
    const gg=c.createLinearGradient(0,f.y-w,0,f.y+w); gg.addColorStop(0,"rgba(60,140,255,0)"); gg.addColorStop(.3,`rgba(90,190,255,${.7*k2})`); gg.addColorStop(.5,`rgba(255,255,255,${k2})`); gg.addColorStop(.7,`rgba(90,190,255,${.7*k2})`); gg.addColorStop(1,"rgba(60,140,255,0)");
    c.fillStyle=gg; c.fillRect(Math.min(f.x,x1),f.y-w,Math.abs(x1-f.x),w*2); jGlow(c,f.x,f.y,90,"180,230,255",k2); jGlow(c,x1,f.y,120,"150,210,255",.6*k2);
    for(let i=0;i<14;i++){ const u=(i/14+(1-k2)*2)%1; c.fillStyle=`rgba(255,255,255,${k2})`; c.fillRect(f.x+f.dir*u*f.len,f.y+(pfxR(i,3)-.5)*w*1.4,10,2) } c.restore(); return true }
  if(K==="inksplash"){ c.save(); const R=f.r*(.45+p*.6); for(let i=0;i<14;i++){ const a=i*.449+f.x*.01, d=R*(.8+((i*7)%5)*.06); c.fillStyle=`rgba(18,14,22,${.75*k})`; c.beginPath(); c.arc(f.x+Math.cos(a)*d,f.y+Math.sin(a)*d*.62,(5+(i%3)*2.5)*(1-p*.4),0,7); c.fill() }
    c.strokeStyle=`rgba(18,14,22,${.45*k})`; c.lineWidth=5*k; c.beginPath(); c.ellipse(f.x,f.y,R,R*.62,0,0,7); c.stroke(); c.restore(); return true }
  if(K==="claw") return drawClawFx(c,f,k);
  if(K==="claw"){ c.save(); c.strokeStyle=`rgba(255,255,255,${k})`; c.lineWidth=4; c.lineCap="round"; for(let i=-1;i<=1;i++){ c.beginPath(); c.moveTo(f.x-26+i*10,f.y-24); c.lineTo(f.x+18+i*10,f.y+24); c.stroke() } c.strokeStyle=`rgba(120,190,255,${k*.7})`; c.lineWidth=2; c.stroke(); c.restore(); return true }
  if(K==="roarcone"){ const T=typeof warnTex==="function"&&warnTex("roarcone",dangerCol()); if(!T) return true;   // 포효 충격파: 입에서 부채꼴로 겹겹이 퍼져 나가요 (맵 위험 색)
    const q=1-k, g2=.55+.5*(1-Math.pow(1-Math.min(1,q*2.4),3)), sc=f.r*g2/(T.width*.503), sy=Math.tan(f.half||.55)/.45;
    c.save(); c.translate(f.x,f.y); c.rotate(f.a); c.scale(sc,sc*sy); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(1,k*2.2); c.drawImage(T,-T.width*.249,-T.height*.5,T.width,T.height);
    if(q<.3){ c.globalAlpha=(.3-q)*2.5; c.drawImage(T,-T.width*.249,-T.height*.5,T.width,T.height) } c.restore(); return true }
  if(K==="roar"){ c.save(); c.strokeStyle=`rgba(220,235,255,${k})`; c.lineWidth=6*k+1; for(let i=0;i<2;i++){ const r=f.r*Math.min(1,p*1.3+i*.15); c.beginPath(); c.ellipse(f.x,f.y,r,r*.6,0,0,7); c.stroke() } c.restore(); return true }
  return false }
function drawShieldBubble(c,P,t,k){ c.save(); c.globalCompositeOperation="lighter"; const r=36+Math.sin(t*4)*2; const gg=c.createRadialGradient(P.x,P.y-14,r*.5,P.x,P.y-14,r); gg.addColorStop(0,"rgba(170,190,255,0)"); gg.addColorStop(1,`rgba(200,215,255,${.45*k})`); c.fillStyle=gg; c.beginPath(); c.arc(P.x,P.y-14,r,0,7); c.fill();
  c.strokeStyle=`rgba(235,240,255,${.6*k})`; c.lineWidth=1.5; c.beginPath(); c.arc(P.x,P.y-14,r,t,t+4.2); c.stroke(); c.restore() }

/* ===================== 보스 고유 패턴 그림 (맵 1~3) ===================== */
function drawSigShot(c,b,t){
  if(drawSig46Shot(c,b,t)) return true;
  if(b.kind==="bee"&&typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.shot_bee){ const im=SKILL_IMG.shot_bee, a=Math.atan2(b.vy,b.vx), fl=Math.cos(a)<0?-1:1, w=58, h=w*im.height/im.width, bob=Math.sin(t*14+b.x*.05)*3;
    c.save(); c.translate(b.x,b.y+bob); c.scale(fl,1); c.rotate(fl<0?Math.PI-a:a); c.rotate(Math.sin(t*30+b.y)*.06); c.drawImage(im,-w/2,-h/2,w,h); c.restore(); return true }
  if(b.kind==="bee"){ const a=Math.atan2(b.vy,b.vx), fl=Math.sin(t*50+b.x)*.9; c.save(); c.translate(b.x,b.y); c.rotate(a); c.scale(1.6,1.6);
    c.fillStyle="rgba(255,255,255,.75)"; c.strokeStyle="rgba(80,80,90,.6)"; c.lineWidth=1; for(const s of [-1,1]){ c.save(); c.rotate(s*(.9+fl*.4)); c.beginPath(); c.ellipse(-2,s*7,7,4,0,0,7); c.fill(); c.stroke(); c.restore() }
    c.fillStyle="#2a1a08"; c.beginPath(); c.ellipse(0,0,13,9,0,0,7); c.fill();
    const g=c.createLinearGradient(0,-8,0,8); g.addColorStop(0,"#ffe680"); g.addColorStop(1,"#e8a010"); c.fillStyle=g; c.beginPath(); c.ellipse(0,0,11.5,7.5,0,0,7); c.fill();
    c.fillStyle="#2a1a08"; for(const x of [-5,1]) c.fillRect(x,-7,3,14); c.beginPath(); c.arc(10,0,4.5,0,7); c.fill(); c.beginPath(); c.moveTo(-12,0); c.lineTo(-18,-2); c.lineTo(-18,2); c.closePath(); c.fill();
    c.fillStyle="#fff"; c.beginPath(); c.arc(11.5,-1.5,1.4,0,7); c.fill(); c.restore(); return true }
  if(b.kind==="acorn"&&typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.shot_acorn){ const r=b.r, im=SKILL_IMG.shot_acorn, w=r*3.3, h=w*im.height/im.width, sg=Math.sign(b.vx||1);   /* 제미나이 도토리가 데굴데굴 */
    c.save(); c.fillStyle="rgba(0,0,0,.25)"; c.beginPath(); c.ellipse(b.x,b.y+r*.9,r*1.05,r*.3,0,0,7); c.fill(); c.translate(b.x,b.y); c.rotate(t*8*sg+(b.x*.002)); c.drawImage(im,-w/2,-h/2,w,h); c.restore(); return true }
  if(b.kind==="acorn"){ const r=b.r; c.save(); c.fillStyle="rgba(0,0,0,.22)"; c.beginPath(); c.ellipse(b.x,b.y+r*.9,r,r*.3,0,0,7); c.fill(); c.translate(b.x,b.y); c.rotate(t*9*Math.sign(b.vx||1));
    c.lineWidth=3; c.strokeStyle="#3a2210"; c.beginPath(); c.ellipse(0,3,r*.85,r,0,0,7); c.stroke(); const g=c.createRadialGradient(-6,-2,2,0,4,r); g.addColorStop(0,"#e0a060"); g.addColorStop(1,"#8a4a1a"); c.fillStyle=g; c.fill();
    c.fillStyle="#6a4422"; c.beginPath(); c.ellipse(0,-r*.45,r*.95,r*.45,0,Math.PI,0); c.fill(); c.stroke(); c.strokeStyle="rgba(40,20,5,.6)"; c.lineWidth=1; for(let i=-3;i<=3;i++){ c.beginPath(); c.moveTo(i*5,-r*.55); c.lineTo(i*5+3,-r*.3); c.stroke() }
    c.fillStyle="#4a2a10"; c.fillRect(-2,-r*.95,4,7); c.fillStyle="rgba(255,255,255,.35)"; c.beginPath(); c.ellipse(-6,2,4,7,.3,0,7); c.fill(); c.restore(); return true }
  return false }
function drawBossMound(c,e,t,ap){ ap=ap==null?1:ap; const r=e.r*1.15, mv=Math.hypot((e.x-(e._mx??e.x)),(e.y-(e._my??e.y)));
  // 지나간 자리에 갈라진 모래 고랑을 남겨요 (내 화면에서만 그려서 같이하기 통신이 늘지 않아요)
  e._trT=(e._trT||0); if(t-e._trT>.07){ e._trT=t; try{ (window.__fxPush||(()=>{}))({k:"sandtrail",x:e.x,y:e.y+r*.25,r:r*.75,life:1.4,max:1.4,a:Math.random()*6}) }catch(_){} }
  e._mx=e.x; e._my=e.y;
  c.save(); c.globalAlpha=ap; c.fillStyle="rgba(40,24,8,.28)"; c.beginPath(); c.ellipse(e.x,e.y+r*.42,r*1.25,r*.38,0,0,7); c.fill();
  // 볼록 솟은 모래 둔덕 (제미나이 그림 · 출렁출렁 숨 쉬듯)
  const SM=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.sandmound;
  if(SM){ const Wd=r*2.7*(1+Math.sin(t*11)*.04), Hd=Wd*SM.height/SM.width*(1+Math.sin(t*14)*.08); c.drawImage(SM,e.x-Wd/2,e.y+r*.45-Hd,Wd,Hd);
    for(let i=0;i<10;i++){ const ph=(t*2.8+i/10)%1, a=i*2.3, d=r*(.4+ph*.9); c.fillStyle=i%3?`rgba(220,180,110,${1-ph})`:`rgba(110,80,40,${1-ph})`; const s=i%3?3:5; c.fillRect(e.x+Math.cos(a)*d-s/2,e.y-r*.3-Math.sin(ph*Math.PI)*r*.9,s,s) }
    c.restore(); return }
  const hb=r*.55+Math.sin(t*14)*r*.05; const g=c.createRadialGradient(e.x-r*.3,e.y-hb*.6,2,e.x,e.y,r*1.1); g.addColorStop(0,"#f6dca0"); g.addColorStop(.6,"#c99a52"); g.addColorStop(1,"#8a5e28");
  c.fillStyle=g; c.beginPath(); c.moveTo(e.x-r*1.1,e.y+r*.3); c.quadraticCurveTo(e.x-r*.6,e.y-hb,e.x,e.y-hb); c.quadraticCurveTo(e.x+r*.6,e.y-hb,e.x+r*1.1,e.y+r*.3); c.closePath(); c.fill();
  c.strokeStyle="rgba(90,60,20,.7)"; c.lineWidth=2; c.beginPath(); for(let i=0;i<5;i++){ const x=e.x-r*.7+i*r*.35; c.moveTo(x,e.y+r*.2); c.lineTo(x+Math.sin(t*9+i)*6,e.y-hb*.5) } c.stroke();
  // 튀어 오르는 모래 알갱이 + 작은 돌
  for(let i=0;i<14;i++){ const ph=(t*2.8+i/14)%1, a=i*2.3, d=r*(.4+ph*.9); c.fillStyle=i%4?`rgba(220,180,110,${1-ph})`:`rgba(110,80,40,${1-ph})`; const s=i%4?3:5; c.fillRect(e.x+Math.cos(a)*d-s/2,e.y-hb*.6-Math.sin(ph*Math.PI)*r*.9+Math.sin(a)*d*.25,s,s) }
  c.restore() }
/* 땅속에서 튀어나올 때 · 숨을 때: 모래 분수 + 흙먼지 구름 + 돌 조각 */
function drawSandFx(c,f,k,t){ const q=1-k, R=f.r;
  if(f.k==="sandtrail"){ c.save(); c.globalAlpha=k*.55; c.fillStyle="#7a5426"; c.beginPath(); c.ellipse(f.x,f.y,R*.55,R*.16,f.a*.1,0,7); c.fill(); c.strokeStyle="#4a3010"; c.lineWidth=1.5; c.beginPath(); c.moveTo(f.x-R*.5,f.y); c.lineTo(f.x-R*.15,f.y-2); c.lineTo(f.x+R*.2,f.y+2); c.lineTo(f.x+R*.5,f.y); c.stroke(); c.restore(); return true }
  if(f.k!=="sandburst") return false;
  c.save(); const dg=c.createRadialGradient(f.x,f.y,2,f.x,f.y,R*(.5+q*1.1)); dg.addColorStop(0,`rgba(230,200,140,${.6*k})`); dg.addColorStop(1,"rgba(200,160,100,0)"); c.translate(f.x,f.y); c.scale(1,.45); c.translate(-f.x,-f.y); c.fillStyle=dg; c.beginPath(); c.arc(f.x,f.y,R*(.5+q*1.1),0,7); c.fill(); c.restore();
  c.save(); const n=f.big?34:20, RK=typeof SKILL_IMG!=="undefined"&&SKILL_IMG.ruinrock;
  for(let i=0;i<n;i++){ const a=-Math.PI*(.1+.8*((i*.618)%1)), sp=(.5+((i*.37)%1)*.8)*(f.big?1.4:1), x=f.x+Math.cos(a)*R*q*sp*1.4, y=f.y+Math.sin(a)*R*sp*(q*2.2-q*q*2.6)*1.3;
    if(i%6===0&&RK){ const s=(f.big?18:12)*(1-q*.3); c.save(); c.globalAlpha=k; c.translate(x,y); c.rotate(q*8+i); c.drawImage(RK,-s/2,-s/2,s,s); c.restore() }
    else { c.fillStyle=`rgba(${i%3?"226,188,120":"150,110,60"},${k})`; c.fillRect(x-2.5,y-2.5,5,5) } }
  c.restore(); return true }

function drawDizzy(c,e,t){ const y=e.y-e.r*1.9; c.save(); for(let i=0;i<3;i++){ const a=t*5+i*2.09, x=e.x+Math.cos(a)*e.r*.7, yy=y+Math.sin(a)*e.r*.18; c.fillStyle="#ffe14a"; c.strokeStyle="#7a5a00"; c.lineWidth=1.5; c.beginPath();
    for(let k=0;k<10;k++){ const rr=k%2?4:9, b=k*Math.PI/5-Math.PI/2; c.lineTo(x+Math.cos(b)*rr,yy+Math.sin(b)*rr) } c.closePath(); c.fill(); c.stroke() } c.restore() }
function drawSigFx(c,f,k,t){ const p=1-k, K=f.k;
  if(drawSig46Fx(c,f,k,t)) return true;
  if(K==="mushsprout"&&typeof MOB_ART!=="undefined"&&(typeof loadMobArt==="function"&&loadMobArt(),MOB_ART["2:mushroom"])&&MOB_ART["2:mushroom"].im.naturalWidth){ const im=MOB_ART["2:mushroom"].im, gr=Math.min(1,p*1.5), sq=1+Math.sin(p*20)*.06*(1-gr), H=100*gr, W=H*im.width/im.height;   // 독버섯 그림이 땅을 뚫고 쑥 자라나요
    c.save(); c.fillStyle=`rgba(40,20,10,${.35*gr})`; c.beginPath(); c.ellipse(f.x,f.y+4,26*gr,8*gr,0,0,7); c.fill();
    for(let i=0;i<5;i++){ const a=i*1.26+f.x*.01, d=14+p*16; c.fillStyle=`rgba(90,60,30,${.6*(1-p)})`; c.fillRect(f.x+Math.cos(a)*d-2,f.y+Math.sin(a)*d*.4-p*10-2,4,4) }
    c.translate(f.x,f.y+6); c.scale(1/sq,sq); c.drawImage(im,-W/2,-H,W,H); if(k<.25){ c.globalCompositeOperation="lighter"; c.globalAlpha=(.25-k)*3; c.drawImage(im,-W/2,-H,W,H) } c.restore(); return true }
  if(K==="mushsprout"){ const s=Math.min(1,p*1.6); c.save(); c.translate(f.x,f.y); c.scale(s,s); c.fillStyle="#f4ecd8"; c.strokeStyle="#5a3a20"; c.lineWidth=2; c.beginPath(); c.roundRect?c.roundRect(-7,-6,14,20,5):c.rect(-7,-6,14,20); c.fill(); c.stroke();
    const sh=1+Math.sin(t*20)*.05*(p>.7?1:0); c.scale(sh,sh); c.beginPath(); c.ellipse(0,-8,22,15,0,Math.PI,0); c.closePath(); const g=c.createLinearGradient(0,-24,0,-6); g.addColorStop(0,"#ff6a5a"); g.addColorStop(1,"#b8281e"); c.fillStyle=g; c.fill(); c.stroke();
    c.fillStyle="#fff"; for(const [x,y,r] of [[-9,-14,3.5],[4,-18,3],[11,-11,2.5],[-2,-10,2]]){ c.beginPath(); c.arc(x,y,r,0,7); c.fill() } c.restore(); return true }
  if(K==="roots"&&typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.rootspike){ const im=SKILL_IMG.rootspike, al=Math.min(1,k*2.5), n=7; c.save(); c.globalAlpha=al;
    for(let i=1;i<=n;i++){ const d=i/n*f.len*.97, up=Math.min(1,p*4-(i/n)*1.2); if(up<=0) continue; const x=f.x+Math.cos(f.a)*d, y=f.y+Math.sin(f.a)*d, w=(100+(i%3)*20)*(1-i/n*.25), h=w*im.height/im.width, e=1-Math.pow(1-up,3);
      c.fillStyle="rgba(30,18,8,.45)"; c.beginPath(); c.ellipse(x,y,w*.42,w*.13,0,0,7); c.fill();
      c.save(); c.translate(x,y); if(i%2) c.scale(-1,1); c.beginPath(); c.rect(-w,-h*1.2,w*2,h*1.2+w*.08); c.clip(); c.drawImage(im,-w/2,-h*e+w*.06,w,h); c.restore() }
    c.restore(); return true }
  if(K==="roots"){ const al=Math.min(1,k*2.5), n=14; c.save(); c.globalAlpha=al; for(let i=1;i<=n;i++){ const d=i/n*f.len, up=Math.min(1,p*4-(i/n)*1.2); if(up<=0) continue; const x=f.x+Math.cos(f.a)*d, y=f.y+Math.sin(f.a)*d, h=(26+(i%3)*10)*up, w=8+(i%2)*3;
      c.fillStyle="#2a1a0c"; c.beginPath(); c.moveTo(x-w-2,y+2); c.quadraticCurveTo(x-2,y-h*.6,x+(i%2?4:-4),y-h-3); c.quadraticCurveTo(x+2,y-h*.5,x+w+2,y+2); c.closePath(); c.fill();
      const g=c.createLinearGradient(x-w,0,x+w,0); g.addColorStop(0,"#5a3a1a"); g.addColorStop(.5,"#8a6a3a"); g.addColorStop(1,"#4a2e14"); c.fillStyle=g; c.beginPath(); c.moveTo(x-w,y); c.quadraticCurveTo(x-1,y-h*.6,x+(i%2?4:-4),y-h); c.quadraticCurveTo(x+1,y-h*.5,x+w,y); c.closePath(); c.fill();
      c.fillStyle="#5aa83a"; c.beginPath(); c.ellipse(x+(i%2?6:-6),y-h*.55,5,2.5,i%2?.6:-.6,0,7); c.fill() } c.restore(); return true }
  if(K==="jarfly"&&f.web){ const q=p, x=f.x0+(f.x-f.x0)*q, y=f.y0+(f.y-f.y0)*q-Math.sin(q*Math.PI)*140; c.save(); c.translate(x,y); c.rotate(q*6); webPath(c,18,t); c.strokeStyle="rgba(240,250,235,.95)"; c.lineWidth=1.5; c.stroke(); c.restore(); return true }
  if(K==="jarfly"){ const q=p, x=f.x0+(f.x-f.x0)*q, y=f.y0+(f.y-f.y0)*q-Math.sin(q*Math.PI)*160; c.save(); c.fillStyle="rgba(0,0,0,.2)"; c.beginPath(); c.ellipse(f.x0+(f.x-f.x0)*q,f.y0+(f.y-f.y0)*q+12,14,5,0,0,7); c.fill(); c.translate(x,y); c.rotate(q*9);
    c.lineWidth=2.5; c.strokeStyle="#3a2212"; c.beginPath(); c.moveTo(-6,-16); c.lineTo(6,-16); c.quadraticCurveTo(18,-6,14,8); c.quadraticCurveTo(0,18,-14,8); c.quadraticCurveTo(-18,-6,-6,-16); c.closePath(); c.stroke(); const g=c.createLinearGradient(-14,0,14,0); g.addColorStop(0,"#8a5a2a"); g.addColorStop(.5,"#d09a5a"); g.addColorStop(1,"#7a4a20"); c.fillStyle=g; c.fill();
    c.fillStyle="#6a2a8a"; c.fillRect(-7,-19,14,5); c.fillStyle="rgba(190,120,255,.8)"; c.beginPath(); c.arc(0,-2,4,0,7); c.fill(); c.restore(); return true }
  if(K==="slimepud"){ const al=Math.min(1,k*2)*.55; c.save(); c.fillStyle=`rgba(${f.col||"120,200,90"},${al})`; c.beginPath(); c.ellipse(f.x,f.y,f.r,f.r*.45,0,0,7); c.fill(); c.fillStyle=`rgba(255,255,255,${al*.6})`; c.beginPath(); c.ellipse(f.x-f.r*.3,f.y-f.r*.1,f.r*.25,f.r*.08,0,0,7); c.fill(); c.restore(); return true }
  if(K==="donutwarn"&&warnTex("warndonut",dangerCol())){ const pul=.5+.5*Math.sin(t*12); c.save(); c.fillStyle=`rgba(255,50,40,${.1+.08*pul})`; c.beginPath(); c.arc(f.x,f.y,f.r2,0,TAU); c.moveTo(f.x+f.r1,f.y); c.arc(f.x,f.y,f.r1,0,TAU,true); c.fill("evenodd");
    c.strokeStyle="rgba(120,255,140,.9)"; c.lineWidth=4; c.beginPath(); c.arc(f.x,f.y,f.r1*(1-p*.1),0,Math.PI*2*k); c.stroke(); c.restore();
    drawWarnEllipse(c,"warndonut",dangerCol(),f.x,f.y,f.r2*1.03,f.r2*1.03,Math.min(1,p*5)*(.75+.25*pul)); return true }
  if(K==="donutwarn"){ const pul=.5+.5*Math.sin(t*12); c.save(); c.fillStyle=`rgba(255,70,50,${.16+.12*pul})`; c.beginPath(); c.arc(f.x,f.y,f.r2,0,TAU); c.moveTo(f.x+f.r1,f.y); c.arc(f.x,f.y,f.r1,0,TAU,true); c.fill("evenodd");
    c.strokeStyle=`rgba(255,80,60,${.7+.3*pul})`; c.lineWidth=3; c.setLineDash([12,8]); c.beginPath(); c.arc(f.x,f.y,f.r2,0,TAU); c.stroke(); c.beginPath(); c.arc(f.x,f.y,f.r1,0,TAU); c.stroke(); c.setLineDash([]);
    c.strokeStyle="rgba(120,255,140,.9)"; c.lineWidth=4; c.beginPath(); c.arc(f.x,f.y,f.r1*(1-p*.1),0,Math.PI*2*k); c.stroke(); c.restore(); return true }
  if(K==="firering"){ c.save(); const R=(f.r1+f.r2)/2, W=(f.r2-f.r1); c.globalCompositeOperation="lighter"; c.lineWidth=W*(.4+p*.6); c.strokeStyle=`rgba(255,120,40,${.55*k})`; c.beginPath(); c.arc(f.x,f.y,R,0,TAU); c.stroke(); c.lineWidth=W*.3; c.strokeStyle=`rgba(255,230,140,${.6*k})`; c.stroke();
    if(PFX.flame0){ c.globalCompositeOperation="source-over"; for(let i=0;i<24;i++){ const a=i/24*TAU, rr=f.r1+((i*7)%10)/10*W; pfxDraw(c,"flame"+(i&3),f.x+Math.cos(a)*rr,f.y+Math.sin(a)*rr-10,0,.9,k) } } c.restore(); return true }
  return false }

// ── 맵 4~6 보스 고유 패턴 그림 ──
function webPath(c,r,t){ c.beginPath(); for(let i=0;i<8;i++){ const a=i*Math.PI/4; c.moveTo(0,0); c.lineTo(Math.cos(a)*r,Math.sin(a)*r) } for(const q of [.3,.55,.8,1]){ for(let i=0;i<=8;i++){ const a=i*Math.PI/4, rr=r*q*(i%2?.92:1); i?c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):c.moveTo(Math.cos(a)*rr,Math.sin(a)*rr) } } }
function drawSig46Shot(c,b,t){ const K=b.kind;
  if(K==="web"){ const al=Math.min(1,b.life*1.5); c.save(); c.translate(b.x,b.y); c.globalAlpha=al*.85; c.fillStyle="rgba(200,230,180,.12)"; c.beginPath(); c.arc(0,0,b.r,0,7); c.fill();
    webPath(c,b.r,t); c.strokeStyle="rgba(240,250,235,.85)"; c.lineWidth=1.6; c.stroke(); c.globalAlpha=al*.6; c.strokeStyle="#6ad04a"; c.lineWidth=.8; c.stroke(); c.restore(); return true }
  if(K==="bat"){ const fl=Math.sin(t*28+b.a0*5);
    if(b.lead&&b.R>8){ // 좁혀 오는 고리 길 + 초록 빈틈 표시
      const an=b.ga+b.w*b.ot; c.save(); c.strokeStyle="rgba(200,130,255,.45)"; c.lineWidth=3; c.setLineDash([10,10]); c.beginPath(); c.ellipse(b.cx,b.cy,b.R,b.R*.85,0,an+.35,an+6.283-.35); c.stroke(); c.setLineDash([]);
      c.strokeStyle="rgba(110,255,150,.9)"; c.lineWidth=7; c.lineCap="round"; c.beginPath(); c.ellipse(b.cx,b.cy,b.R,b.R*.85,0,an-.3,an+.3); c.stroke(); c.restore() }
    c.save(); c.translate(b.x,b.y); c.rotate(Math.sin(t*3+b.a0)*.2);
    c.globalCompositeOperation="lighter"; const gg=c.createRadialGradient(0,0,2,0,0,30); gg.addColorStop(0,"rgba(220,140,255,.75)"); gg.addColorStop(1,"rgba(140,60,220,0)"); c.fillStyle=gg; c.beginPath(); c.arc(0,0,30,0,7); c.fill(); c.globalCompositeOperation="source-over";
    c.strokeStyle="rgba(230,190,255,.9)"; c.lineWidth=2.4; for(const s of [-1,1]){ c.beginPath(); c.moveTo(0,-2); c.quadraticCurveTo(s*12,-14-fl*8,s*24,-6-fl*10); c.lineTo(s*19,-1); c.lineTo(s*16,4-fl*3); c.lineTo(s*10,1); c.lineTo(s*6,5); c.stroke() }
    c.fillStyle="#241034"; for(const s of [-1,1]){ c.beginPath(); c.moveTo(0,-2); c.quadraticCurveTo(s*12,-14-fl*8,s*24,-6-fl*10); c.lineTo(s*19,-1); c.lineTo(s*16,4-fl*3); c.lineTo(s*10,1); c.lineTo(s*6,5); c.closePath(); c.fill() }
    c.beginPath(); c.ellipse(0,1,6,8,0,0,7); c.fill(); c.beginPath(); c.moveTo(-5,-5); c.lineTo(-3,-11); c.lineTo(-1,-5); c.moveTo(5,-5); c.lineTo(3,-11); c.lineTo(1,-5); c.fill();
    c.fillStyle="#ff4a6a"; c.beginPath(); c.arc(-2.4,-1,1.5,0,7); c.arc(2.4,-1,1.5,0,7); c.fill(); c.restore(); return true }
  if(K==="pearl"){ const r=b.r; c.save(); c.translate(b.x,b.y);
    c.globalCompositeOperation="lighter"; for(let i=1;i<=5;i++){ c.globalAlpha=.16*(1-i/6); c.fillStyle="#7ad8ff"; c.beginPath(); c.arc(-b.vx*.018*i,-b.vy*.018*i,r*(1-i*.08),0,7); c.fill() }
    c.globalAlpha=1; const gl=c.createRadialGradient(0,0,r*.5,0,0,r*1.9); gl.addColorStop(0,"rgba(120,220,255,.55)"); gl.addColorStop(1,"rgba(60,140,255,0)"); c.fillStyle=gl; c.beginPath(); c.arc(0,0,r*1.9,0,7); c.fill(); c.globalCompositeOperation="source-over";
    const g=c.createRadialGradient(-r*.35,-r*.4,r*.1,0,0,r); g.addColorStop(0,"#ffffff"); g.addColorStop(.35,"#bff0ff"); g.addColorStop(.75,"#3aa0e8"); g.addColorStop(1,"#14448a"); c.fillStyle=g; c.beginPath(); c.arc(0,0,r,0,7); c.fill();
    c.save(); c.rotate(t*3); c.strokeStyle="rgba(255,255,255,.55)"; c.lineWidth=3; c.beginPath(); c.arc(0,0,r*.62,0,2.2); c.stroke(); c.beginPath(); c.arc(0,0,r*.62,3.2,5.2); c.stroke(); c.restore();
    c.fillStyle="rgba(255,255,255,.9)"; c.beginPath(); c.ellipse(-r*.38,-r*.42,r*.2,r*.12,-.6,0,7); c.fill(); c.restore(); return true }
  if(K==="wolfrun"&&typeof BOSS_ART!=="undefined"&&BOSS_ART.st8_0&&BOSS_ART.st8_0.im&&BOSS_ART.st8_0.im.naturalWidth){ const im=BOSS_ART.st8_0.im, dir=b.vx>=0?1:-1, H=96;
    for(const [ox,oy,sc,ph0] of [[-dir*130,-30,.8,2.1],[-dir*72,24,.9,1.1],[0,0,1,0]]){ const ph=t*20+(b.ph||0)+ph0, s=Math.sin(ph), air=Math.max(0,s), x=b.x+ox, y=b.y+oy, h=H*sc;
      c.save(); c.fillStyle="rgba(20,40,70,.28)"; c.beginPath(); c.ellipse(x,y+h*.45,h*.55*(1-air*.25),7*sc,0,0,7); c.fill();
      for(let i=0;i<3;i++){ const u=((t*3.5+i/3+ph0)%1); c.fillStyle=`rgba(235,245,255,${.55*(1-u)})`; c.beginPath(); c.arc(x-dir*(h*.5+u*80),y+h*.38-u*12,(5+u*12)*sc,0,7); c.fill() } c.restore();
      // 몸을 쭉 폈다 웅크리며 껑충 (머리는 달리는 쪽)
      c.save(); c.translate(0,-air*16*sc); c.globalAlpha=.25; drawLegged(c,"wolfboss",x-dir*h*.12,y,h,dir<0,-dir*Math.cos(ph)*.1,ph,1.3,im); c.globalAlpha=1; drawLegged(c,"wolfboss",x,y,h*(1+.06*s),dir<0,-dir*Math.cos(ph)*.1,ph,1.3,im); c.restore() }
    c.save(); c.globalCompositeOperation="lighter"; c.strokeStyle="rgba(200,235,255,.5)"; c.lineWidth=2; for(let i=0;i<5;i++){ const yy=b.y-30+i*15, L=70+pfxR(i,8)*90; c.beginPath(); c.moveTo(b.x-dir*(50+i*8),yy); c.lineTo(b.x-dir*(50+i*8+L),yy); c.stroke() } c.restore(); return true }
  if(K==="wolfrun"){ const A=typeof MOB_ART!=="undefined"&&(typeof loadMobArt==="function"&&loadMobArt(),MOB_ART["8:frostwolf"]); if(A&&A.im&&A.im.complete&&A.im.naturalWidth){ const im=A.im, dir=b.vx>=0?1:-1, H=78, W=H*im.width/im.height;
    // 늑대 세 마리가 무리 지어 전력 질주: 몸을 쭉 폈다 웅크렸다 하며 껑충껑충
    for(const [ox,oy,sc,ph0] of [[-dir*120,-26,.82,2.1],[-dir*70,22,.9,1.1],[0,0,1,0]]){ const ph=t*13+(b.ph||0)+ph0, s=Math.sin(ph), air=Math.max(0,s), x=b.x+ox, y=b.y+oy;
      c.save(); c.fillStyle="rgba(20,40,70,.25)"; c.beginPath(); c.ellipse(x,y+H*.42*sc,W*.34*sc*(1-air*.3),7*sc,0,0,7); c.fill();
      for(let i=0;i<3;i++){ const u=((t*3+i/3+ph0)%1); c.fillStyle=`rgba(235,245,255,${.5*(1-u)})`; c.beginPath(); c.arc(x-dir*(W*.35+u*70)*sc,y+H*.38*sc-u*12,(5+u*12)*sc,0,7); c.fill() }
      c.translate(x,y+H*.42*sc-air*18*sc); c.rotate(-dir*Math.cos(ph)*.12); c.scale(-dir*sc*(1+.13*s),sc*(1-.09*s));
      c.globalAlpha=.25; c.drawImage(im,-W/2+W*.12,-H,W,H); c.globalAlpha=1; c.drawImage(im,-W/2,-H,W,H); c.restore() }
    c.save(); c.globalCompositeOperation="lighter"; c.strokeStyle="rgba(200,235,255,.45)"; c.lineWidth=2; for(let i=0;i<5;i++){ const yy=b.y-30+i*15, L=60+pfxR(i,8)*80; c.beginPath(); c.moveTo(b.x-dir*(40+i*8),yy); c.lineTo(b.x-dir*(40+i*8+L),yy); c.stroke() } c.restore(); return true } }
  if(K==="ghound"&&drawGhostHound(c,b,t)) return true;
  if(K==="ghound"){ c.save(); c.translate(b.x,b.y); c.rotate(b.a); c.globalCompositeOperation="lighter";
    for(let i=1;i<=6;i++){ c.globalAlpha=.22*(1-i/7); c.fillStyle="#7af0ff"; c.beginPath(); c.ellipse(-i*20,0,30,13,0,0,7); c.fill() }
    c.globalAlpha=.9; const g=c.createLinearGradient(-34,0,34,0); g.addColorStop(0,"rgba(80,200,255,0)"); g.addColorStop(.5,"rgba(140,240,255,.8)"); g.addColorStop(1,"#eaffff"); c.fillStyle=g;
    c.beginPath(); c.moveTo(38,0); c.lineTo(26,-10); c.lineTo(22,-18); c.lineTo(16,-9); c.lineTo(-6,-12); c.quadraticCurveTo(-30,-14,-40,-4); c.lineTo(-24,0); c.lineTo(-40,6); c.quadraticCurveTo(-24,12,-6,11); c.lineTo(16,9); c.lineTo(28,8); c.closePath(); c.fill();
    c.globalAlpha=1; c.fillStyle="#fff"; c.beginPath(); c.arc(26,-3,2.4,0,7); c.fill(); c.restore(); return true }
  if(K==="snowball"&&typeof SKILL_IMG!=="undefined"&&SKILL_IMG.ice_snowball){ const r=b.r; c.save(); c.fillStyle="rgba(30,50,90,.22)"; c.beginPath(); c.ellipse(b.x,b.y+r*.9,r*1.05,r*.32,0,0,7); c.fill();
    c.translate(b.x,b.y); for(let i=1;i<=3;i++){ c.fillStyle=`rgba(235,245,255,${.16-i*.045})`; c.beginPath(); c.arc(-b.vx*.03*i,-b.vy*.03*i,r*(1-i*.12),0,7); c.fill() }
    c.rotate((b.x+b.y)*.02); c.drawImage(SKILL_IMG.ice_snowball,-r*1.08,-r*1.08,r*2.16,r*2.16); c.restore(); return true }
  if(K==="snowball"){ const r=b.r; c.save(); c.fillStyle="rgba(30,50,90,.22)"; c.beginPath(); c.ellipse(b.x,b.y+r*.9,r*1.05,r*.32,0,0,7); c.fill();
    c.translate(b.x,b.y); for(let i=1;i<=3;i++){ c.fillStyle=`rgba(235,245,255,${.18-i*.05})`; c.beginPath(); c.arc(-b.vx*.03*i,-b.vy*.03*i,r*(1-i*.12),0,7); c.fill() }
    const g=c.createRadialGradient(-r*.35,-r*.4,r*.1,0,0,r); g.addColorStop(0,"#ffffff"); g.addColorStop(.6,"#e2eefa"); g.addColorStop(1,"#9ab8d8"); c.fillStyle=g; c.beginPath(); c.arc(0,0,r,0,7); c.fill(); c.strokeStyle="rgba(90,120,170,.6)"; c.lineWidth=2; c.stroke();
    c.rotate((b.x+b.y)*.02); c.fillStyle="rgba(150,180,215,.55)"; for(let i=0;i<6;i++){ const a=i*1.05; c.beginPath(); c.arc(Math.cos(a)*r*.55,Math.sin(a)*r*.55,r*.12,0,7); c.fill() } c.restore(); return true }
  if(K==="axe"&&drawStarAxe(c,b,t)) return true;
  if(K==="axe"){ const r=b.r, sp=t*14; c.save(); c.translate(b.x,b.y); c.globalCompositeOperation="lighter"; for(let i=1;i<=4;i++){ c.save(); c.rotate(sp-i*.35); c.globalAlpha=.22*(1-i/5); c.fillStyle="#c8a0ff"; c.beginPath(); c.arc(0,0,r*1.15,-.5,.5); c.lineTo(0,0); c.fill(); c.restore() }
    jGlow(c,0,0,r*1.6,"190,140,255",.55); c.globalCompositeOperation="source-over"; c.rotate(sp);
    for(const s of [1,-1]){ c.save(); c.scale(s,1); const g=c.createLinearGradient(r*.2,0,r*1.15,0); g.addColorStop(0,"#5a3aa8"); g.addColorStop(.6,"#e8dcff"); g.addColorStop(1,"#ffffff"); c.fillStyle=g; c.beginPath(); c.moveTo(r*.25,-r*.25); c.quadraticCurveTo(r*1.3,-r*.9,r*1.1,0); c.quadraticCurveTo(r*1.3,r*.9,r*.25,r*.25); c.closePath(); c.fill(); c.strokeStyle="#2a1458"; c.lineWidth=2; c.stroke(); c.restore() }
    c.fillStyle="#2a1458"; c.fillRect(-r*.28,-4,r*.56,8); c.fillStyle="#ffe88a"; c.beginPath(); for(let i=0;i<10;i++){ const rr=i%2?4:10, a=i*Math.PI/5; c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr) } c.closePath(); c.fill(); c.restore(); return true }
  if(K==="planet"){ const r=b.r, PC=[["#ffd88a","#c8641a"],["#9ad8ff","#2a5ab8"],["#e0a8ff","#6a2ab0"]][b.pc||0];
    if(b.lead&&b.R>8){ const an=b.ga+b.w*b.ot; c.save(); c.strokeStyle="rgba(200,170,255,.4)"; c.lineWidth=3; c.setLineDash([10,10]); c.beginPath(); c.ellipse(b.cx,b.cy,b.R,b.R*.85,0,an+.4,an+6.283-.4); c.stroke(); c.setLineDash([]);
      c.strokeStyle="rgba(110,255,150,.9)"; c.lineWidth=7; c.lineCap="round"; c.beginPath(); c.ellipse(b.cx,b.cy,b.R,b.R*.85,0,an-.35,an+.35); c.stroke(); c.restore() }
    const PI_=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG["pl_"+((b.pl||0)%8)];
    if(PI_){ const H=r*2.3, W=H*PI_.width/PI_.height; c.save(); c.translate(b.x,b.y); c.globalCompositeOperation="lighter"; jGlow(c,0,0,r*1.7,"200,180,255",.35); c.globalCompositeOperation="source-over"; c.rotate(t*.6+(b.pl||0)); c.drawImage(PI_,-W/2,-H/2,W,H); c.restore(); return true }   // 진짜 행성 그림 (수성~해왕성)
    c.save(); c.translate(b.x,b.y); c.globalCompositeOperation="lighter"; jGlow(c,0,0,r*1.9,"200,180,255",.4); c.globalCompositeOperation="source-over";
    const g=c.createRadialGradient(-r*.35,-r*.35,r*.1,0,0,r); g.addColorStop(0,"#ffffff"); g.addColorStop(.35,PC[0]); g.addColorStop(1,PC[1]); c.fillStyle=g; c.beginPath(); c.arc(0,0,r,0,7); c.fill();
    c.strokeStyle="rgba(255,255,255,.75)"; c.lineWidth=2.5; c.beginPath(); c.ellipse(0,0,r*1.6,r*.45,-.35,0,7); c.stroke(); c.restore(); return true }
  if(K==="vortex"&&b.hole&&drawHoleShot(c,b,t)) return true;
  if(K==="vortex"){ const R=b.r, al=Math.min(1,b.life*2); c.save(); c.translate(b.x,b.y); c.globalAlpha=al;
    c.fillStyle="rgba(0,0,0,.18)"; c.beginPath(); c.ellipse(0,R*.6,R*1.5,R*.45,0,0,7); c.fill();
    c.strokeStyle="rgba(170,230,210,.18)"; c.lineWidth=2; c.setLineDash([10,14]); c.lineDashOffset=-t*60; c.beginPath(); c.arc(0,0,b.pr,0,7); c.stroke(); c.setLineDash([]);
    for(let i=0;i<7;i++){ const y=R*.5-i*R*.32, w=R*(.35+i*.2), sp=t*(9-i*.6); c.strokeStyle=`rgba(${215-i*8},${250-i*4},240,${.75-i*.06})`; c.lineWidth=5-i*.4; c.beginPath(); c.ellipse(Math.sin(t*4+i)*6,y,w,w*.3,0,sp,sp+4.4); c.stroke() }
    c.globalCompositeOperation="lighter"; for(let i=0;i<10;i++){ const a=t*5+i*.63, d=b.pr*(1-((t*.8+i*.1)%1)); c.fillStyle="rgba(200,255,230,.5)"; c.beginPath(); c.arc(Math.cos(a)*d,Math.sin(a)*d*.8,2.4,0,7); c.fill() }
    c.restore(); return true }
  if(K==="beam"&&b.style==="breath"&&typeof SKILL_IMG!=="undefined"&&SKILL_IMG.icebreath){ const im=SKILL_IMG.icebreath, L=b.len*1.08, sc=L/(im.width*(1-.05)), H=im.height*sc*.62, ox=im.width*.05*sc, open=Math.min(1,(b.ot||0)/.25), fade=Math.min(1,b.life/.35);
    const TX=waveTex(8,"icebreath"); c.save(); c.translate(b.x,b.y); c.rotate(b.a); const fl=1+Math.sin(t*23)*.04;
    if(TX){ c.globalAlpha=open*fade*.55; c.drawImage(TX.sh,-ox,-H*.51*fl,L*open,H*fl) }   // 밝은 얼음 바닥에서도 보이게 푸른 그림자를 먼저
    c.globalCompositeOperation="lighter"; c.globalAlpha=open*fade; { const SRC=TX?TX.cv:im, NS=12, sw=SRC.width/NS, dw=L*open/NS;   // 일렁이는 냉기: 조각마다 위아래로 물결치며 굵기가 숨 쉬듯 바뀌어요
      for(let i=0;i<NS;i++){ const u=i/NS, wob=Math.sin(t*14-i*.9)*H*.06*u, sy=1+Math.sin(t*11-i*.7)*.12*u; c.drawImage(SRC,i*sw,0,sw+1,SRC.height,-ox+i*dw,-H*.51*fl*sy+wob,dw+1,H*fl*sy) } }
    c.globalAlpha=open*fade*.3; c.drawImage(im,-ox+Math.sin(t*9)*10,-H*.56+Math.sin(t*7)*6,L*open*1.03,H*1.1);
    if(typeof jGlow==="function") jGlow(c,0,0,60,"220,245,255",.8*fade); c.restore(); return true }
  if(K==="beam"&&b.style==="breath"){ const L=b.len, w=b.r; c.save(); c.translate(b.x,b.y); c.rotate(b.a); c.globalCompositeOperation="lighter";
    const g=c.createLinearGradient(0,0,L,0); g.addColorStop(0,"rgba(240,250,255,.95)"); g.addColorStop(.5,"rgba(150,215,255,.6)"); g.addColorStop(1,"rgba(90,160,255,0)"); c.fillStyle=g;
    c.beginPath(); c.moveTo(0,-w*.4); c.quadraticCurveTo(L*.5,-w*1.6,L,-w*1.3); c.lineTo(L,w*1.3); c.quadraticCurveTo(L*.5,w*1.6,0,w*.4); c.closePath(); c.fill();
    for(let i=0;i<14;i++){ const u=(i/14+t*1.6)%1, yy=(pfxR(i,4)-.5)*w*2.2*u; c.fillStyle=`rgba(255,255,255,${.85*(1-u)})`; c.save(); c.translate(u*L,yy); c.rotate(t*3+i); c.fillRect(-3,-3,6,6); c.restore() }
    if(PFX.ice) for(let i=0;i<5;i++){ const u=(i/5+t*1.1)%1; pfxDraw(c,"ice",u*L,(pfxR(i,6)-.5)*w*1.6*u,t*4+i,.6+u*.5,(1-u)*.9) } c.restore(); return true }
  if(K==="beam"){ const L=b.len*Math.min(1,1-Math.pow(1-Math.min(1,(b.ot||0)/.16),3)), w=b.r, fl=.85+Math.sin(t*60)*.15; c.save(); c.translate(b.x,b.y); c.rotate(b.a); c.globalCompositeOperation="lighter";
    const g=c.createLinearGradient(0,-w*2.2,0,w*2.2); g.addColorStop(0,"rgba(90,140,255,0)"); g.addColorStop(.3,"rgba(120,170,255,.35)"); g.addColorStop(.5,"rgba(230,240,255,.95)"); g.addColorStop(.7,"rgba(120,170,255,.35)"); g.addColorStop(1,"rgba(90,140,255,0)");
    c.fillStyle=g; c.globalAlpha=fl; c.fillRect(0,-w*2.2,L,w*4.4);
    if(!drawBoltStrand(c,L,Math.max(80,w*5),fl)){ c.strokeStyle="#ffffff"; c.lineWidth=2.5; c.beginPath(); let y=0; c.moveTo(0,0); for(let x=24;x<=L;x+=24){ y=(Math.random()-.5)*w*1.4; c.lineTo(x,y) } c.stroke() }
    const e=c.createRadialGradient(0,0,4,0,0,w*3); e.addColorStop(0,"rgba(255,255,255,.95)"); e.addColorStop(1,"rgba(120,170,255,0)"); c.fillStyle=e; c.beginPath(); c.arc(0,0,w*3,0,7); c.fill(); c.restore(); return true }
  return false }
function drawSig46Fx(c,f,k,t){ const p=1-k, K=f.k; if(K==="erupt") return drawEruptFx(c,f,k,t); if(K==="seqboom") return drawSeqBoom(c,f,k,t); if(K==="sandburst"||K==="sandtrail") return drawSandFx(c,f,k,t);
  if(K==="crystalpillar"){ const up=Math.min(1,p*5), al=Math.min(1,k*4); c.save(); c.translate(f.x,f.y); c.globalAlpha=al;
    c.fillStyle="rgba(0,0,0,.25)"; c.beginPath(); c.ellipse(0,4,26,8,0,0,7); c.fill(); const h=78*up;
    const CP=f.gold?["#a8741a","#fff6c8","#ffd86a","#7a5208"]:f.ice?["#4a8ad8","#f2fbff","#b8e6ff","#2a5aa8"]:["#2a6ab8","#bfeaff","#7ac8ff","#1a4a90"];
    for(const [ox,hh,ww] of [[-14,.6,9],[13,.7,8],[0,1,13]]){ const H=h*hh; const g=c.createLinearGradient(ox-ww,0,ox+ww,0); g.addColorStop(0,CP[0]); g.addColorStop(.45,CP[1]); g.addColorStop(.55,CP[2]); g.addColorStop(1,CP[3]); c.fillStyle=g;
      c.beginPath(); c.moveTo(ox-ww,2); c.lineTo(ox-ww*.8,-H*.8); c.lineTo(ox,-H); c.lineTo(ox+ww*.8,-H*.8); c.lineTo(ox+ww,2); c.closePath(); c.fill(); c.strokeStyle="rgba(255,255,255,.7)"; c.lineWidth=1.2; c.stroke() }
    c.globalCompositeOperation="lighter"; const pul=.5+.5*Math.sin(t*14); const gg=c.createRadialGradient(0,-h*.6,2,0,-h*.6,40); gg.addColorStop(0,f.gold?`rgba(255,240,180,${.5+pul*.4})`:`rgba(180,240,255,${.5+pul*.4})`); gg.addColorStop(1,f.gold?"rgba(255,200,80,0)":"rgba(80,160,255,0)"); c.fillStyle=gg; c.beginPath(); c.arc(0,-h*.6,40,0,7); c.fill(); c.restore(); return true }
  if(K==="pbeam"){ const w=30*(.4+k*.8), ag=(1-k)*f.max; f=Object.assign({},f,{len:f.len*Math.min(1,1-Math.pow(1-Math.min(1,ag/.13),3))}); c.save(); c.translate(f.x,f.y-40); c.rotate(f.a); c.globalCompositeOperation="lighter";
    const g=c.createLinearGradient(0,-w,0,w); g.addColorStop(0,`rgba(${f.col},0)`); g.addColorStop(.35,`rgba(${f.col},${.5*k})`); g.addColorStop(.5,`rgba(255,255,255,${k})`); g.addColorStop(.65,`rgba(${f.col},${.5*k})`); g.addColorStop(1,`rgba(${f.col},0)`);
    c.fillStyle=g; c.fillRect(0,-w,f.len,w*2); if(f.col==="255,240,120"&&drawBoltStrand(c,f.len,90,k*1.3)){ c.restore(); return true } for(let i=0;i<8;i++){ const x=((i*97+t*900)%f.len); c.fillStyle=`rgba(255,255,255,${.7*k})`; c.beginPath(); c.moveTo(x-14,0); c.lineTo(x,-4); c.lineTo(x+14,0); c.lineTo(x,4); c.fill() } c.restore(); return true }
  if(K==="conewarn"){ const safe=f.safe, T=warnTex("warncone",safe?SAFE_COL:dangerCol()); if(T){ c.save(); c.translate(f.x,f.y); c.rotate(f.a);
      c.fillStyle=safe?`rgba(80,220,120,${.12+.08*Math.sin(t*10)})`:`rgba(233,40,50,${.08+.14*p})`; c.beginPath(); c.moveTo(0,0); c.arc(0,0,f.r,-f.half,f.half); c.closePath(); c.fill();
      if(!safe){ c.fillStyle="rgba(255,70,70,.25)"; c.beginPath(); c.moveTo(0,0); c.arc(0,0,f.r*p,-f.half,f.half); c.closePath(); c.fill() }
      // 부채꼴 안: 포효 충격파 고리가 바깥으로 계속 밀려 나가요 (실제 맞는 범위 모양으로 잘라서 정확하게)
      const RC=!safe&&warnTex("roarcone",dangerCol()); if(RC){ c.save(); c.beginPath(); c.moveTo(0,0); c.arc(0,0,f.r,-f.half,f.half); c.closePath(); c.clip(); c.globalCompositeOperation="lighter";
        for(let i=0;i<2;i++){ const u=((t*1.6+i*.5)%1), sc=f.r*(.35+u*.85)/(RC.width*.503), sy2=Math.tan(Math.min(1.3,f.half))/.45; c.save(); c.scale(sc,sc*sy2); c.globalAlpha=Math.min(1,(.5+.5*p)*(1-u)*1.3); c.drawImage(RC,-RC.width*.249,-RC.height*.5,RC.width,RC.height); c.restore() } c.restore() }
      const s=f.r/600, sy=Math.sin(Math.min(1.45,f.half))/Math.sin(Math.PI/4); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(1,p*5)*(.8+.2*Math.sin(t*14)); c.scale(s,s*sy); c.drawImage(T,-10,-T.height/2,T.width,T.height); c.restore();
      if(safe&&f.r>300){ c.save(); c.fillStyle="rgba(255,255,255,.95)"; c.font="bold 22px sans-serif"; c.textAlign="center"; c.fillText("안전!",f.x+Math.cos(f.a)*170,f.y+Math.sin(f.a)*170); c.restore() } return true }
    c.save(); c.translate(f.x,f.y); c.rotate(f.a);
    c.fillStyle=safe?`rgba(80,220,120,${.18+.12*Math.sin(t*10)})`:`rgba(233,60,70,${.1+.22*p})`; c.beginPath(); c.moveTo(0,0); c.arc(0,0,f.r,-f.half,f.half); c.closePath(); c.fill();
    if(!safe){ c.fillStyle="rgba(255,90,90,.35)"; c.beginPath(); c.moveTo(0,0); c.arc(0,0,f.r*p,-f.half,f.half); c.closePath(); c.fill() }
    c.strokeStyle=safe?"rgba(120,255,150,.9)":`rgba(255,${200+Math.round(55*Math.sin(t*14))},200,.9)`; c.lineWidth=safe?4:3.2; c.beginPath(); c.moveTo(0,0); c.arc(0,0,f.r,-f.half,f.half); c.closePath(); c.stroke();
    if(safe&&f.r>300){ c.rotate(-f.a); c.fillStyle="rgba(255,255,255,.95)"; c.font="bold 22px sans-serif"; c.textAlign="center"; c.fillText("안전!",Math.cos(f.a)*170,Math.sin(f.a)*170) } c.restore(); return true }
  if(K==="cleave"&&drawCleave2(c,f,p,k,t)) return true;
  if(K==="cleave"){ const R=f.r, sw=f.half*2; c.save(); c.translate(f.x,f.y); c.rotate(f.a-f.half); c.globalCompositeOperation="lighter";
    const end=sw*Math.min(1,p*3.2); for(let i=0;i<3;i++){ const rr=R*(.62+i*.17), lw=(22-i*6)*k; const g=c.createLinearGradient(0,0,R,0);
      c.strokeStyle=i===2?`rgba(255,255,255,${k})`:i?`rgba(200,120,255,${.8*k})`:`rgba(90,30,160,${.7*k})`; c.lineWidth=Math.max(1,lw); c.lineCap="round"; c.beginPath(); c.arc(0,0,rr,Math.max(0,end-1.3),end); c.stroke() }
    c.fillStyle=`rgba(160,80,255,${.18*k})`; c.beginPath(); c.moveTo(0,0); c.arc(0,0,R,0,end); c.closePath(); c.fill(); c.restore(); return true }
  if(K==="tilewarn"&&warnTex("warntile",dangerCol())){ const s=f.s*.96, h=s/2, T=warnTex("warntile",dangerCol()); c.save(); c.translate(f.x,f.y); c.fillStyle=`rgba(30,0,0,${.18+.12*p})`; c.fillRect(-h,-h,s,s); c.fillStyle=`rgba(255,80,50,${.15+.3*p})`; c.fillRect(-h*p,-h*p,s*p,s*p);
    c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(1,p*5)*(.75+.25*Math.sin(t*16)); c.drawImage(T,-h*1.04,-h*1.04,s*1.08,s*1.08); c.restore(); return true }
  if(K==="tilewarn"){ const s=f.s*.92, h=s/2; c.save(); c.translate(f.x,f.y); c.fillStyle=`rgba(20,0,0,${.25+.15*p})`; c.fillRect(-h,-h,s,s);
    c.fillStyle=`rgba(255,200,80,${.25+.35*p})`; c.fillRect(-h*p,-h*p,s*p,s*p); c.strokeStyle=`rgba(255,${230+Math.round(25*Math.sin(t*16))},140,${.75+.25*Math.sin(t*16)})`; c.lineWidth=3.5; c.strokeRect(-h,-h,s,s);
    c.lineWidth=1.5; c.beginPath(); c.moveTo(-h*.35,-h*.35); c.lineTo(h*.35,h*.35); c.moveTo(h*.35,-h*.35); c.lineTo(-h*.35,h*.35); c.stroke(); c.restore(); return true }
  if(K==="firepillar"&&typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.firepillar){ const im=SKILL_IMG.firepillar, q=1-k, w=f.r*3.2*(.7+.3*Math.min(1,q*4)), h=w*im.height/im.width*(.8+.35*Math.min(1,q*3));
    c.save(); c.globalAlpha=Math.min(1,k*2.2); c.globalCompositeOperation="lighter"; c.drawImage(im,f.x-w/2,f.y+w*.16-h,w,h); c.restore(); return true }
  if(K==="firepillar"){ const r=f.r, H=130*(.5+p); c.save(); c.translate(f.x,f.y); c.globalCompositeOperation="lighter";
    const g=c.createLinearGradient(0,-H,0,10); g.addColorStop(0,"rgba(255,80,20,0)"); g.addColorStop(.4,`rgba(255,120,30,${.7*k})`); g.addColorStop(.85,`rgba(255,230,140,${k})`); g.addColorStop(1,"rgba(255,255,220,0)");
    c.fillStyle=g; c.beginPath(); c.moveTo(-r*.8,6); c.quadraticCurveTo(-r*.6,-H*.5,Math.sin(t*20)*8,-H); c.quadraticCurveTo(r*.6,-H*.5,r*.8,6); c.closePath(); c.fill();
    c.fillStyle=`rgba(255,140,40,${.4*k})`; c.beginPath(); c.ellipse(0,0,r,r*.4,0,0,7); c.fill(); c.restore(); return true }
  if(K==="cloudwarn"){ drawWarnEllipse(c,"warncircle",dangerCol(),f.x,f.y,f.r*1.05,f.r*.58,Math.min(1,p*5)*(.7+.3*Math.sin(t*16))); c.save(); c.translate(f.x,f.y); c.fillStyle=`rgba(20,20,40,${.2+.35*p})`; c.beginPath(); c.ellipse(0,0,f.r,f.r*.55,0,0,7); c.fill();
    c.strokeStyle=`rgba(255,240,120,${.4+.5*p})`; c.lineWidth=2; c.setLineDash([8,6]); c.beginPath(); c.ellipse(0,0,f.r,f.r*.55,0,0,7); c.stroke(); c.setLineDash([]);
    c.translate(0,-170); c.globalAlpha=Math.min(1,p*3); for(const [x,y,r] of [[-38,6,30],[0,-8,40],[40,4,32],[-12,14,28],[18,14,30]]){ const g=c.createRadialGradient(x,y-r*.4,2,x,y,r); g.addColorStop(0,"#6a6a88"); g.addColorStop(1,"#22223a"); c.fillStyle=g; c.beginPath(); c.arc(x,y,r,0,7); c.fill() }
    if(Math.sin(t*30)>.85){ c.globalCompositeOperation="lighter"; c.fillStyle="rgba(255,250,180,.4)"; c.beginPath(); c.arc(0,0,46,0,7); c.fill() } c.restore(); return true }
  return false }

// 그림의 하얀 실루엣 (변신·피격 번쩍임용, 한 번만 만들어 둬요)
const SIL={}; function silImg(k,col){ const key=k+(col||""); if(SIL[key]) return SIL[key]; const im=typeof SKILL_IMG!=="undefined"&&SKILL_IMG[k]; if(!im) return null;
  const cv=document.createElement("canvas"); cv.width=im.width; cv.height=im.height; const x=cv.getContext("2d"); x.drawImage(im,0,0); x.globalCompositeOperation="source-in"; x.fillStyle=col||"#ffffff"; x.fillRect(0,0,cv.width,cv.height); return SIL[key]=cv }
function drawSil(c,k,h,flip,a,col){ const s=silImg(k,col); if(!s||a<=0) return; const w=h*s.width/s.height; c.save(); c.globalAlpha*=a; if(flip) c.scale(-1,1); c.drawImage(s,-w/2,-h/2,w,h); c.restore() }
// 전탄발사 포문 빛: 어깨 미사일 포드 · 개틀링 · 손바닥 · 가슴 수정
function roboPorts(c,f,T,x,y,H,d,sq,al){ const P=(nx,ny)=>[x-d*nx*H,y+ny*H*sq], GL="lighter"; c.save(); c.globalCompositeOperation=GL;
  const chg=T<1.0?0:T<1.3?(T-1.0)/.3:T<4.0?1:Math.max(0,1-(T-4.0)/.4);
  if(chg>0){ const fk=.75+.25*Math.sin(T*40);
    for(const [nx,ny] of [[-.172,-.303],[.247,-.309]]){ const [px,py]=P(nx,ny); jGlow(c,px,py,(30+(T>1.25&&T<3.2?14*Math.random():0))*chg,"255,150,60",.85*fk*al) }
    const [px,py]=P(.38,-.166); const pul=T>1.5&&T<3.1?Math.max(0,1-((T-1.55+.5)%.5)/.25):0; jGlow(c,px,py,(26+pul*30)*chg,"120,230,255",.9*al);
    c.fillStyle=`rgba(255,255,255,${.9*chg*al})`; c.beginPath(); c.arc(px,py,6+pul*5,0,7); c.fill();
    // 모여드는 빛 알갱이 (충전)
    if(T>1.0&&T<1.4) for(let i=0;i<14;i++){ const a=i*.449+T*3, r=(1-((T-1.0)/.4))*120+10; const [qx,qy]=P([-.172,.247,.38,.002][i%4],[-.303,-.309,-.166,-.154][i%4]); c.fillStyle="rgba(200,240,255,.85)"; c.fillRect(qx+Math.cos(a)*r,qy+Math.sin(a)*r,3,3) } }
  // 가슴 수정: 빔 직전 충전
  { const [px,py]=P(.002,-.154); const q=T>2.2&&T<2.6?(T-2.2)/.4:T>=2.6&&T<3.95?1:0; jGlow(c,px,py,24+q*40,"120,210,255",(.5+.5*Math.sin(T*10))*.5*al+q*.2);
    if(q>0&&T<2.6) for(let i=0;i<10;i++){ const a=i*.628-T*6, r=(1-q)*110+8; c.fillStyle="rgba(220,245,255,.9)"; c.beginPath(); c.arc(px+Math.cos(a)*r,py+Math.sin(a)*r*.8,2.6,0,7); c.fill() } }
  // 개틀링 총구 불꽃 + 탄피
  if(T>1.3&&T<3.25){ const [gx,gy]=P(-.49,-.09); const fw=d, s=.7+Math.random()*.6; jGlow(c,gx,gy,46*s,"255,210,110",.9);
    c.fillStyle="rgba(255,250,220,.95)"; c.beginPath(); c.moveTo(gx,gy-9*s); c.lineTo(gx+fw*52*s,gy); c.lineTo(gx,gy+9*s); c.closePath(); c.fill();
    c.fillStyle="rgba(255,200,90,.8)"; for(const o of [-1,1]){ c.beginPath(); c.moveTo(gx,gy); c.lineTo(gx+fw*26*s,gy+o*22*s); c.lineTo(gx+fw*10,gy+o*4); c.closePath(); c.fill() }
    c.globalCompositeOperation="source-over"; const [bx,by]=P(-.3,-.06);
    for(let i=0;i<7;i++){ const ph=(T*3.2+i/7)%1, vx=-d*(40+pfxR(i,9)*60); c.save(); c.translate(bx+vx*ph,by-60*ph+260*ph*ph); c.rotate(ph*12+i); c.fillStyle="#d8a73a"; c.fillRect(-4,-1.6,8,3.2); c.restore() } }
  c.restore() }

/* 맞힐 때 번쩍이는 불꽃 (영웅 색) · 한 번 그려 두고 재사용해요 */
const HERO_SPK={warrior:"255,205,110",archer:"130,255,190",thief:"200,150,255",mage:"255,150,60",pirate:"120,205,255",healer:"205,220,255",calli:"255,110,90",zodiac:"255,215,110",mech:"120,215,255"};
function drawHitSpark(c,f,k,id){ const col=HERO_SPK[id]||"255,240,200", key="hitspk_"+(id||"x");
  pfxMake(key,96,96,x=>{ const g=x.createRadialGradient(0,0,0,0,0,30); g.addColorStop(0,"rgba(255,255,255,1)"); g.addColorStop(.25,`rgba(${col},.85)`); g.addColorStop(1,`rgba(${col},0)`); x.fillStyle=g; x.beginPath(); x.arc(0,0,30,0,7); x.fill();
    for(let i=0;i<4;i++){ x.save(); x.rotate(i*Math.PI/2); const L=i%2?30:46, gr=x.createLinearGradient(0,0,L,0); gr.addColorStop(0,"rgba(255,255,255,1)"); gr.addColorStop(.5,`rgba(${col},.8)`); gr.addColorStop(1,`rgba(${col},0)`); x.fillStyle=gr; x.beginPath(); x.moveTo(0,-3); x.lineTo(L,0); x.lineTo(0,3); x.closePath(); x.fill(); x.restore() }
    for(let i=0;i<4;i++){ x.save(); x.rotate(i*Math.PI/2+Math.PI/4); x.fillStyle="rgba(255,255,255,.85)"; x.beginPath(); x.moveTo(6,-1.2); x.lineTo(20,0); x.lineTo(6,1.2); x.closePath(); x.fill(); x.restore() } });
  const q=1-k, sc=f.s*(.55+q*.7); c.save(); c.globalCompositeOperation="lighter"; pfxDraw(c,key,f.x,f.y,f.a+q*.6,sc,Math.min(1,k*1.8)); c.restore() }

/* ===== 제미나이 이펙트 그림 (검은 배경 → 투명 빛 그림): 운석 · 폭발 · 번개 · 블랙홀 · 불꽃 숨결 ===== */
const ARTTX={}; function artTint(key,col){ const id=key+"|"+(col||""); if(ARTTX[id]) return ARTTX[id]; const im=typeof SKILL_IMG!=="undefined"&&SKILL_IMG[key]; if(!im) return null; if(!col) return ARTTX[id]=im;
  const cv=document.createElement("canvas"); cv.width=im.width; cv.height=im.height; const x=cv.getContext("2d"); x.drawImage(im,0,0); x.globalCompositeOperation="color"; x.fillStyle=col; x.fillRect(0,0,cv.width,cv.height);
  x.globalCompositeOperation="destination-in"; x.drawImage(im,0,0); x.globalCompositeOperation="lighter"; x.globalAlpha=.25; x.drawImage(im,0,0); return ARTTX[id]=cv }
const FIREISH=c=>{ if(!c) return true; c=c.toLowerCase(); return c.includes("ff8a2a")||c.includes("ffd36a")||c.includes("ff7a3a")||c.includes("ff6a")||c.includes("ffb")||c.includes("ffe066")||c.includes("ff9") };
function drawArtFx(c,f,k,t){ if(window.__noArt) return false; const S=typeof SKILL_IMG!=="undefined"?SKILL_IMG:{}, K=f.k;
  // 조련사 부적 폭발: 부적 조각이 흩날리며 문양 고리가 빙글
  if(K==="boom"&&f.charm&&S.charmboom){ const q=1-k, R=(f.r||48)*2.6*(.55+.45*Math.sqrt(q)); c.save(); c.translate(f.x,f.y); c.rotate(q*1.2); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(.95,k*1.6); c.drawImage(S.charmboom,-R/2,-R/2,R,R); c.restore(); return true }
  // 불타는 운석: 하늘에서 비스듬히 떨어져요
  // 유적 맵 낙석: 고대 유적 돌덩이가 대기 마찰로 불붙으며 떨어져요
  if(K==="meteor"&&f.th==="rock"&&S.ruinrock&&typeof drawFireballFx==="function"){ if(f.life>f.max) return false; const q=1-f.life/f.max, sx=f.x-200*(1-q), sy=f.y-420*(1-q), fa=Math.atan2(420,200), S2=72*(f.big?1.4:1);
    c.save(); c.fillStyle=`rgba(40,20,0,${.28*q})`; c.beginPath(); c.ellipse(f.x,f.y,30*q,10*q,0,0,7); c.fill(); c.restore();
    drawFireballFx(c,sx-Math.cos(fa)*8,sy-Math.sin(fa)*8,fa,S2*3,t,Math.min(1,q*4)*.95);
    c.save(); c.translate(sx,sy); c.rotate(q*5+f.x*.01); c.globalAlpha=Math.min(1,q*5); const im=S.ruinrock, h=S2*im.height/im.width; c.drawImage(im,-S2/2,-h/2,S2,h);
    c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(1,q*5)*(.25+.1*Math.sin(t*30)); c.drawImage(im,-S2/2,-h/2,S2,h); c.restore(); return true }
  if(K==="meteor"&&S.meteorfx&&(!f.th||f.th==="fire"||f.th==="rock"||f.th==="flame")){ if(f.life>f.max) return false; const q=1-f.life/f.max, im=S.meteorfx, sx=f.x-200*(1-q), sy=f.y-420*(1-q), Wd=170*(f.big?1.4:1)*(1+Math.sin(t*30)*.03), Hd=Wd*im.height/im.width;
    c.save(); c.fillStyle=`rgba(40,10,0,${.25*q})`; c.beginPath(); c.ellipse(f.x,f.y,30*q,10*q,0,0,7); c.fill();
    c.translate(sx,sy); c.rotate(Math.atan2(420,200)-.746); c.globalAlpha=Math.min(1,q*4); c.drawImage(im,-Wd*.733,-Hd*.749,Wd,Hd); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(1,q*4)*(.25+Math.sin(t*25)*.1); c.drawImage(im,-Wd*.733,-Hd*.749,Wd,Hd); c.restore(); return true }
  // 폭발: 불빛 폭발은 그대로, 다른 색 폭발은 그 색으로 물들여요
  if(K==="boom"&&S.explodefx&&!f.th&&!window.__fxLow){ const col=f.col, tx=artTint("explodefx",FIREISH(col)?null:col); if(!tx) return false; const q=1-k, R=(f.r||60)*2.5*(.55+.55*Math.sqrt(q)), a=((f.x*7+f.y*13)%628)/100;
    c.save(); c.translate(f.x,f.y); c.rotate(a+q*.4); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(.9,k*1.5); c.drawImage(tx,-R/2,-R/2,R,R); c.restore(); return true }
  // 번개 낙뢰: 하늘에서 땅까지 내리꽂혀요
  if(K==="bolt"&&S.boltfx){ const im=S.boltfx, bt=f.bt, fl=.75+Math.random()*.35;
    // 번개 4단계: 카드(작고 은은) · 서예 도령 雷(크고 화려) · 맵 날씨(푸른빛) · 보스(붉은 자줏빛 + 빨간 테두리)
    const TC=bt==="boss"?"#ff5a9a":bt==="map"?"#9ad8ff":bt==="hero"?"#ffe6a0":bt==="dragon"?"#5ab0ff":bt==="card"?"#c9a6ff":null, T=TC&&typeof warnTex==="function"?(warnTex("boltfx",TC)||im):im;
    const Hd=bt==="card"?420:bt==="hero"||bt==="dragon"?560:480, Wd=Hd*im.width/im.height;
    c.save(); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(1,k*1.8)*fl*1; c.drawImage(T,f.x-Wd*.5,f.y+24-Hd,Wd,Hd);
    if(bt==="hero"||bt==="dragon"){ // 곁가지 번개 + 금빛·먹빛 섬광
      for(const s of [-1,1]){ c.save(); c.translate(f.x,f.y-Hd*.55); c.rotate(Math.PI/2+s*(.5+Math.random()*.25)); if(typeof drawBoltStrand==="function") drawBoltStrand(c,Hd*.38,60,k*1.2); c.restore() }
      const q=1-k, r=60+q*140; c.globalAlpha=k; c.strokeStyle=`rgba(255,220,140,${k})`; c.lineWidth=5*k+1; c.beginPath(); c.ellipse(f.x,f.y,r,r*.4,0,0,7); c.stroke(); jGlow(c,f.x,f.y,90,"255,230,160",.7*k) }
    if(bt==="card"){ // 카드 천둥 번개: 보랏빛 낙뢰 + 땅에 퍼지는 전기 고리와 불꽃
      const q=1-k, r=34+q*80; c.globalAlpha=1; jGlow(c,f.x,f.y,70,"200,160,255",.8*k); c.strokeStyle=`rgba(225,200,255,${k})`; c.lineWidth=4*k+1; c.beginPath(); c.ellipse(f.x,f.y,r,r*.38,0,0,7); c.stroke();
      c.strokeStyle=`rgba(255,255,255,${k})`; c.lineWidth=2; for(let i=0;i<6;i++){ const a=i*1.047+f.x*.01, d=r*.9; c.beginPath(); c.moveTo(f.x+Math.cos(a)*d*.3,f.y+Math.sin(a)*d*.12); c.lineTo(f.x+Math.cos(a+.2)*d*.65,f.y+Math.sin(a+.2)*d*.26-6); c.lineTo(f.x+Math.cos(a)*d,f.y+Math.sin(a)*d*.38); c.stroke() } }
    if(bt==="boss"){ const q=1-k, r=50+q*70; c.globalAlpha=k; c.strokeStyle=`rgba(255,60,90,${k})`; c.lineWidth=4; c.beginPath(); c.ellipse(f.x,f.y,r,r*.4,0,0,7); c.stroke() }
    c.restore(); return true }
  // 블랙홀: 빙글빙글 돌며 빨아들여요
  if(K==="blackhole"&&S.holefx){ const p=1-k, R=(f.r||150)*2*(1-p*.25); c.save(); c.translate(f.x,f.y); c.scale(1,.75); c.rotate(-t*1.6);
    c.globalAlpha=Math.min(1,k*2); holeCore(c,R); c.drawImage(S.holefx,-R/2,-R/2,R,R); c.restore(); return true }
  return false }
/* 운석 낙하(테마 '불·바위'), 번개 테마 낙하에도 같은 그림 */
function drawArtFall(c,f,k,t){ if(f.th==="bolt"&&typeof SKILL_IMG!=="undefined"&&SKILL_IMG.boltfx){ if(f.life>f.max) return false; const q=1-f.life/f.max; if(q<.82) { c.save(); c.globalAlpha=.35*q; c.fillStyle="#fff8c0"; c.beginPath(); c.ellipse(f.x,f.y,26*q,9*q,0,0,7); c.fill(); c.restore(); return true }
    return drawArtFx(c,{k:"bolt",x:f.x,y:f.y},Math.min(1,(1-q)/.18+.3),t) } return false }
/* 블랙홀 가운데의 깊은 어둠 (검은 바탕은 투명해져서 따로 칠해요) */
function holeCore(c,R){ const g=c.createRadialGradient(0,0,0,0,0,R*.5); g.addColorStop(0,'rgba(5,0,15,.95)'); g.addColorStop(.35,'rgba(20,5,40,.8)'); g.addColorStop(.8,'rgba(30,10,60,.35)'); g.addColorStop(1,'rgba(30,10,60,0)'); c.fillStyle=g; c.beginPath(); c.arc(0,0,R*.5,0,7); c.fill() }
/* 사건의 지평선: 보스 발밑의 블랙홀 */
function drawHoleShot(c,b,t){ const im=typeof SKILL_IMG!=="undefined"&&SKILL_IMG.holefx; if(!im) return false; const R=b.pr*1.15, al=Math.min(1,b.life*1.5,(b.ot||9));
  c.save(); c.translate(b.x,b.y); c.scale(1,.72); c.rotate(-t*1.3); c.globalAlpha=al*.95; holeCore(c,R); c.drawImage(im,-R/2,-R/2,R,R); c.restore(); return true }
/* 불꽃 숨결 (이프리트) */
function drawFireBreath(c,x,y,a,len,al,t){ /* 불길이 앞으로 확 퍼지며 일렁여요 */ const im=typeof SKILL_IMG!=="undefined"&&SKILL_IMG.firebreath; if(!im) return false;
  const puff=1+Math.sin(t*9)*.06+Math.sin(t*23)*.03, L=len*puff, sc=L/(im.width*.98), H=im.height*sc*.7*(1+Math.sin(t*13)*.06);
  c.save(); c.translate(x,y); c.rotate(a+Math.sin(t*6)*.05); c.globalCompositeOperation="lighter"; c.globalAlpha=al; drawFlameImg(c,im,L,H,.01,.52,t,1.3,true,.14);
  c.globalAlpha=al*.3; c.translate(Math.sin(t*11)*8,0); drawFlameImg(c,im,L*1.05,H*1.12,.01,.53,t+.37,4.1,true,.12); c.restore(); return true }

/* ===== 제미나이 번개 그림을 '번개 줄기'로 눕혀서 모든 번개(빛줄기·돌진·구슬·작은 낙뢰)에 써요 ===== */
let _bStr=null;
function boltStrand(){ if(_bStr) return _bStr; const im=typeof SKILL_IMG!=="undefined"&&SKILL_IMG.boltfx; if(!im||!im.width) return null;
  const W=im.width, H=Math.round(im.height*.8), cv=document.createElement("canvas"); cv.width=H; cv.height=W; const x=cv.getContext("2d");
  x.translate(0,W); x.rotate(-Math.PI/2); x.drawImage(im,0,0,W,H,0,0,W,H);
  // 끝부분은 부드럽게 사라지게
  x.setTransform(1,0,0,1,0,0); x.globalCompositeOperation="destination-in"; const g=x.createLinearGradient(0,0,H,0); g.addColorStop(0,"rgba(0,0,0,.6)"); g.addColorStop(.06,"#000"); g.addColorStop(.94,"#000"); g.addColorStop(1,"rgba(0,0,0,.5)"); x.fillStyle=g; x.fillRect(0,0,H,W);
  return _bStr=cv }
/* c는 번개가 +x 방향으로 뻗도록 이미 돌려 놓은 상태. L=길이, T=두께, al=투명도 */
function drawBoltStrand(c,L,T,al){ const S=boltStrand(); if(!S||L<4) return false; const seg=T*S.width/S.height, n=Math.max(1,Math.round(L/seg)), sl=L/n, fr=Math.floor(performance.now()/75);
  c.save(); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.max(0,Math.min(1,al)); if(fr&1) c.scale(1,-1);
  for(let i=0;i<n;i++) c.drawImage(S,i*sl-1,-T/2,sl+2,T);
  c.restore(); return true }

/* ===== 바람 궁수 (제미나이 그림): 바람 화살 · 화살비 · 바람의 활 ===== */
function drawWindArrow(c,x,y,a,L,al,glow){ const A5=window.__t5==="archer"&&typeof SKILL_IMG!=="undefined"&&SKILL_IMG.arrow5, im=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&(A5||SKILL_IMG.windarrow); if(!im) return false; if(A5) L*=1.35; const H=L*im.height/im.width;
  c.save(); c.translate(x,y); c.rotate(a); c.globalAlpha=al==null?1:al; c.drawImage(im,-L*.9,-H/2,L,H); if(glow){ c.globalCompositeOperation="lighter"; c.globalAlpha*=.5; c.drawImage(im,-L*.9,-H/2,L,H) } c.restore(); return true }

/* ===== 일렁이는 불꽃: 그림을 세로 조각으로 나눠, 꼬리 쪽일수록 위아래로 출렁이고 두께가 숨 쉬듯 바뀌어요 ===== */
const FLSCR={}; function flameScratch(w,h){ const k=w+"x"+h; if(FLSCR[k]) return FLSCR[k]; const cv=document.createElement("canvas"); cv.width=w; cv.height=h; return FLSCR[k]={cv,x:cv.getContext("2d")} }
/* 지금 좌표계(+x 방향)에 그려요. L·H=그릴 크기, ax·ay=고정점(그림 비율), tr=true면 오른쪽 끝이 꼬리(불숨결) */
/* 렉 줄이기: 일렁이는 모양 12장을 한 번만 만들어 두고 시간에 따라 넘겨 보여요 (탄이 많아도 가벼워요) */
const FLFR=new Map(); const FLN=12;
function flameFrames(im,tr,amp){ let M=FLFR.get(im); if(!M){ M={}; FLFR.set(im,M) } const key=(tr?1:0)+"_"+amp; if(M[key]) return M[key];
  const N=34, sc=Math.min(1,260/im.height), W=Math.round(im.width*sc), Hh=Math.round(im.height*sc*1.4), pad=im.height*sc*.2, sw=im.width/N, out=[];
  for(let f=0;f<FLN;f++){ const ph=f/FLN*TAU, cv=document.createElement("canvas"); cv.width=W; cv.height=Hh; const X=cv.getContext("2d");
    for(let i=0;i<N;i++){ const u=(i+.5)/N, tail=tr?u:1-u, w=Math.pow(tail,1.3), dy=Math.sin(ph-i*.36)*im.height*amp*w, hs=1+Math.sin(2*ph+1.3-i*.5)*.13*w;
      const hh=im.height*sc*hs, d0=Math.round(i*sw*sc), d1=Math.round((i+1)*sw*sc); X.drawImage(im,d0/sc,0,(d1-d0)/sc,im.height,d0,pad+dy*sc+(im.height*sc-hh)/2,d1-d0,hh) }
    out.push(cv) }
  return M[key]=out }
/* 지금 좌표계(+x 방향)에 그려요. L·H=그릴 크기, ax·ay=고정점(그림 비율), tr=true면 오른쪽 끝이 꼬리(불숨결) */
function drawFlameImg(c,im,L,H,ax,ay,t,seed,tr,amp){ if(!im||!im.width) return false; amp=amp||.08;
  if(window.__fxLow){ c.drawImage(im,-L*ax,-H*ay,L,H); return true }
  const F=flameFrames(im,!!tr,amp), fi=((Math.floor(t*14+seed*3)%FLN)+FLN)%FLN; c.drawImage(F[fi],-L*ax,-H*ay-H*.2,L,H*1.4); return true }
/* 날아가는 화염구 (캐릭터·보스 공통): 앞쪽 불꽃 핵을 탄 위치에 맞추고 꼬리가 일렁여요 */
function drawFireballFx(c,x,y,a,L,t,al){ const im=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&((window.__t5==="mage"&&SKILL_IMG.sunorb5)||SKILL_IMG.fireballfx); if(!im) return false; const H=L*im.height/im.width, pul=1+Math.sin(t*20+x*.05)*.04;
  c.save(); c.translate(x,y); c.rotate(a); c.scale(pul,pul); c.globalCompositeOperation="lighter"; c.globalAlpha=al==null?1:al; drawFlameImg(c,im,L,H,.782,.537,t,x*.013+y*.007,false,.1); c.restore(); return true }

/* ===== 마법사: 독 안개 · 메테오 낙하 마법진 (제미나이 그림) ===== */
function drawMistArt(c,z,t){ const im=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.poisonmist; if(!im) return false; const k=Math.min(1,z.t/.5,(z.max-z.t)/.4+.15), S=z.r*2.5;
  c.save(); c.translate(z.x,z.y); c.scale(1,.5);
  { const D=typeof warnTex==="function"&&warnTex("poisonmist","#3a0a50"); if(D){ c.save(); c.rotate(-t*.35); c.globalAlpha=k*.5; c.drawImage(D,-S/2,-S/2,S,S); c.restore() } }   // 진한 보라 밑그림 (밝은 바닥에서도 보이게)
  c.fillStyle=`rgba(120,40,160,${.18*k})`; c.beginPath(); c.arc(0,0,z.r,0,7); c.fill(); c.strokeStyle=`rgba(200,140,255,${.75*k})`; c.lineWidth=4; c.setLineDash([16,10]); c.lineDashOffset=-t*20; c.beginPath(); c.arc(0,0,z.r,0,7); c.stroke(); c.setLineDash([]);   // 범위 테두리
  c.globalCompositeOperation="lighter";
  c.save(); c.rotate(-t*.35); c.globalAlpha=k; c.drawImage(im,-S/2,-S/2,S,S); c.restore();
  c.save(); c.rotate(t*.22+1.3); const s2=S*(.82+Math.sin(t*1.7)*.05); c.globalAlpha=k*.6; c.drawImage(im,-s2/2,-s2/2,s2,s2); c.restore();
  c.restore(); return true }
function drawFireCircle(c,f,k,t){ const im=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.firecircle; if(!im) return false; const q=1-k, W=f.r*2.3*(.85+.15*Math.min(1,q*4)), H=W*im.height/im.width;
  c.save(); c.translate(f.x,f.y); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(1,q*5)*(.42+.1*Math.sin(t*14)); c.drawImage(im,-W/2,-H/2,W,H); c.restore(); return true }   // 내 메테오 표시는 은은하게 (보스 경고가 묻히지 않게)

/* ===== 범위 표시 (제미나이 흰 문양 7장을 맵·보스 색으로 물들여요) ===== */
const WTX2={}; function warnTex(key,col){ const id=key+col; if(WTX2[id]) return WTX2[id]; const im=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG[key]; if(!im) return null;
  const cv=document.createElement("canvas"); cv.width=im.width; cv.height=im.height; const x=cv.getContext("2d"); x.drawImage(im,0,0); x.globalCompositeOperation="multiply"; x.fillStyle=col; x.fillRect(0,0,cv.width,cv.height);
  x.globalCompositeOperation="destination-in"; x.drawImage(im,0,0); x.globalCompositeOperation="lighter"; x.globalAlpha=.35; x.drawImage(im,0,0); return WTX2[id]=cv }
function mixHex(a,b,t){ const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)), A=p(a), B=p(b); return "#"+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,"0")).join("") }
/* 위험 색: 맵(보스) 색에 빨강을 섞어 '위험'이 바로 보이게 */
/* 맵 분위기를 살린 위험 색 (테두리 깜빡임은 모든 맵 붉은빛으로 통일) */
const DANGER_COL={1:"#ff4f8f",2:"#ff8a3a",3:"#e8923a",4:"#e04ad8",5:"#ff3a30",6:"#ff6a6a",7:"#ffa040",8:"#a87cff",9:"#ffb030",10:"#c060ff",11:"#e040ff"};
/* 청룡 불꽃: 불덩이 그림의 색을 파랗게 돌려 한 번만 만들어 둬요 (붉은 기가 남지 않게) */
let BFC=null; function blueFire(im){ if(BFC&&BFC.src===im) return BFC.cv; try{ const cv=document.createElement("canvas"); cv.width=im.width; cv.height=im.height; const x=cv.getContext("2d"); x.filter="hue-rotate(185deg) saturate(1.3) brightness(1.1)"; x.drawImage(im,0,0); BFC={src:im,cv}; return cv }catch(e){ return null } }
function dangerCol(th){ return window.__dcOv||DANGER_COL[window.__mapId]||"#ff4a4a" }   /* 11단계: 시간대마다 경고 색이 바뀌어요 */
const OWN_COL="#ffd36a", SAFE_COL="#5af08a";
const WGEO={warncircle:[.5,.477,.495,.516],warndonut:[.499,.484,.496,.506],warnsafe:[.5,.538,.491,.448],warnown:[.5,.537,.487,.446]};
/* 타원 문양을 (x,y)에 가로 반지름 rx, 세로 반지름 ry로 */
function drawWarnEllipse(c,key,col,x,y,rx,ry,al){ const T=warnTex(key,col); if(!T) return false; const G=WGEO[key], Wd=rx/G[2], Hd=ry/G[3];
  c.save(); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.max(0,Math.min(1,al)); c.drawImage(T,x-Wd*G[0],y-Hd*G[1],Wd,Hd); c.restore(); return true }

/* ===== 분출: 경고 모양 그대로 시작점에서 끝까지 0.15초 만에 확 뻗어 나가고, 조각이 흩어지며 사라져요 ===== */
function drawEruptFx(c,f,k,t){ if(f.k!=="erupt") return false; const age=(1-k)*f.max, gr=Math.min(1,age/.15), ease=1-Math.pow(1-gr,3), fade=age<.15?1:Math.max(0,1-(age-.15)/(f.max-.15));
  const col=dangerCol(), rgb=[1,3,5].map(i=>parseInt(col.slice(i,i+2),16)).join(","); c.save(); c.globalCompositeOperation="lighter";
  if(f.s==="cone"){ const R=f.r*ease; c.translate(f.x,f.y); c.rotate(f.a);
    const g=c.createRadialGradient(0,0,R*.05,0,0,Math.max(1,R)); g.addColorStop(0,`rgba(255,255,255,${.5*fade})`); g.addColorStop(.6,`rgba(${rgb},${.42*fade})`); g.addColorStop(.92,`rgba(${rgb},${.75*fade})`); g.addColorStop(1,`rgba(255,250,235,${.95*fade})`);
    c.fillStyle=g; c.beginPath(); c.moveTo(0,0); c.arc(0,0,Math.max(1,R),-f.half,f.half); c.closePath(); c.fill();
    c.strokeStyle=`rgba(255,255,240,${fade})`; c.lineWidth=6*fade+1; c.beginPath(); c.arc(0,0,Math.max(1,R),-f.half,f.half); c.stroke();
    for(let i=0;i<14;i++){ const a=-f.half+f.half*2*((i*.618)%1), d=R*(.55+.45*((i*.37)%1))+age*260; c.fillStyle=`rgba(255,240,210,${fade*.9})`; c.fillRect(Math.cos(a)*d-2,Math.sin(a)*d-2,4,4) } }
  else if(f.s==="line"){ const L=f.len*ease; c.translate(f.x,f.y); c.rotate(f.a);
    const g=c.createLinearGradient(0,-30,0,30); g.addColorStop(0,`rgba(${rgb},0)`); g.addColorStop(.5,`rgba(255,255,245,${.9*fade})`); g.addColorStop(1,`rgba(${rgb},0)`); c.fillStyle=g; c.fillRect(0,-30*(.6+.4*fade),L,60*(.6+.4*fade));
    c.fillStyle=`rgba(${rgb},${.55*fade})`; c.fillRect(0,-12,L,24); const hg=c.createRadialGradient(L,0,0,L,0,50); hg.addColorStop(0,`rgba(255,255,255,${fade})`); hg.addColorStop(1,`rgba(${rgb},0)`); c.fillStyle=hg; c.beginPath(); c.arc(L,0,50,0,7); c.fill() }
  else if(f.s==="donut"){ c.translate(f.x,f.y); const r=f.r1+(f.r2-f.r1)*ease; c.strokeStyle=`rgba(${rgb},${.8*fade})`; c.lineWidth=(f.r2-f.r1)*.5*ease+4; c.beginPath(); c.arc(0,0,(f.r1+r)/2,0,TAU); c.stroke(); c.strokeStyle=`rgba(255,255,240,${fade})`; c.lineWidth=5; c.beginPath(); c.arc(0,0,r,0,TAU); c.stroke() }
  else if(f.s==="tile"){ c.translate(f.x,f.y); const h=f.sz*.5*(.4+.6*ease); c.fillStyle=`rgba(${rgb},${.55*fade})`; c.fillRect(-h,-h,h*2,h*2); c.strokeStyle=`rgba(255,255,240,${fade})`; c.lineWidth=5; c.strokeRect(-h,-h,h*2,h*2);
    const g=c.createLinearGradient(0,-140*ease,0,0); g.addColorStop(0,`rgba(${rgb},0)`); g.addColorStop(1,`rgba(255,250,230,${.7*fade})`); c.fillStyle=g; c.fillRect(-h*.6,-140*ease,h*1.2,140*ease) }
  else { c.translate(f.x,f.y); c.scale(1,f.sq||.75); const r=f.r*(.3+.85*ease); const g=c.createRadialGradient(0,0,0,0,0,r); g.addColorStop(0,`rgba(255,255,245,${.3*fade})`); g.addColorStop(.7,`rgba(${rgb},${.22*fade})`); g.addColorStop(1,`rgba(${rgb},0)`); c.fillStyle=g; c.beginPath(); c.arc(0,0,r,0,TAU); c.fill();
    c.strokeStyle=`rgba(255,250,235,${.45*fade})`; c.lineWidth=3*fade+1; c.beginPath(); c.arc(0,0,r,0,TAU); c.stroke() }
  c.restore(); return true }

/* ===== 카드 스킬 (제미나이 그림): 회오리 칼날 · 서리 파편 · 화염 고리 · 수호 바위 ===== */
const SKI=k=>typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG[k];
function drawCardWind(c,sh,t){ const im=SKI("cardwind"); if(!im) return false; const S=46; c.save(); c.globalCompositeOperation="lighter";
  for(let j=2;j>=0;j--){ c.save(); c.translate(sh.x-sh.vx*.016*j,sh.y-sh.vy*.016*j); c.rotate(-t*14+j*.4); c.globalAlpha=j?.22/j:1; c.drawImage(im,-S/2,-S/2,S,S); c.restore() } c.restore(); return true }
function drawCardIce(c,sh,a,t){ const im=SKI("cardice"); if(!im) return false; const L=62, H=L*im.height/im.width; c.save(); c.translate(sh.x,sh.y); c.rotate(a); c.drawImage(im,-L*.78,-H/2,L,H); c.globalCompositeOperation="lighter"; c.globalAlpha=.3+.15*Math.sin(t*20+sh.x); c.drawImage(im,-L*.78,-H/2,L,H); c.restore(); return true }
function drawCardFireRing(c,P,R,t){ const im=SKI("cardfire"); if(!im) return false; const Wd=R/.38*(1+Math.sin(t*9)*.02), Hd=Wd*im.height/im.width*(1+Math.sin(t*13)*.05);
  c.save(); c.globalCompositeOperation="lighter"; c.globalAlpha=.9; c.drawImage(im,P.x-Wd/2,P.y-Hd*.56,Wd,Hd); c.globalAlpha=.3+.12*Math.sin(t*17); c.drawImage(im,P.x-Wd*.52,P.y-Hd*.6,Wd*1.04,Hd*1.08); c.restore(); return true }
function drawCardStone(c,x,y,t,i){ const im=SKI("cardstone"); if(!im) return false; const S=38; c.save(); c.translate(x,y+Math.sin(t*3+i)*3); c.globalCompositeOperation="lighter"; jGlow(c,0,0,S*.8,"255,210,120",.3+.15*Math.sin(t*6+i)); c.globalCompositeOperation="source-over"; c.rotate(Math.sin(t*1.5+i)*.25); c.drawImage(im,-S/2,-S/2*im.height/im.width,S,S*im.height/im.width); c.restore(); return true }

/* ===== 보스 폭격: 빛의 창이 내리꽂히고(맵 색) · 땅에서 충격 폭발 · 마지막 맵은 별똥별 ===== */
function drawSpearFall(c,f,q,t,P){ if(f.th==="star"&&SKI("starfall")){ const im=SKI("starfall"), sx=f.x-220*(1-q), sy=f.y-420*(1-q), Wd=160, Hd=Wd*im.height/im.width;
    c.save(); c.fillStyle=`rgba(40,10,60,${.22*q})`; c.beginPath(); c.ellipse(f.x,f.y,28*q,9*q,0,0,7); c.fill(); c.translate(sx,sy); c.rotate(Math.atan2(420,220)-.745); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(1,q*4);
    if(typeof drawFlameImg==="function") drawFlameImg(c,im,Wd,Hd,.787,.763,t,f.x*.01,false,.05); else c.drawImage(im,-Wd*.787,-Hd*.763,Wd,Hd); c.restore(); return true }
  const T=typeof warnTex==="function"&&warnTex("lightspear",P[1]); if(!T) return false; const L=230, W=L*T.width/T.height, y=f.y-470*(1-q);
  c.save(); c.fillStyle=`rgba(0,0,0,${.22*q})`; c.beginPath(); c.ellipse(f.x,f.y,24*q,8*q,0,0,7); c.fill(); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(1,q*4); c.drawImage(T,f.x-W/2,y-L*.97,W,L); c.restore(); return true }
function drawImpactBoom(c,f,k,t,P){ const T=typeof warnTex==="function"&&warnTex("impactfx",P[1]); if(!T) return false; const q=1-k, R=(f.r||60), Wd=R*3*(.6+.4*Math.min(1,q*3.5)), Hd=Wd*T.height/T.width;
  c.save(); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(.8,k*2); c.drawImage(T,f.x-Wd*.496,f.y-Hd*.53,Wd,Hd); if(q<.2){ c.globalAlpha=(.2-q)*2; c.drawImage(T,f.x-Wd*.496,f.y-Hd*.53,Wd,Hd) } c.restore(); return true }

/* ===== 서예 도령 뫼 산(山): 먹물 바닥 깨짐 위에서 산이 땅을 뚫고 솟아요 ===== */
function drawInkCrack(c,x,y,r,al){ const im=SKI("inkcrack"); if(!im) return false; const Wd=r*2.5, Hd=Wd*im.height/im.width; c.save(); c.globalAlpha=Math.max(0,Math.min(1,al)); c.drawImage(im,x-Wd/2,y-Hd*.62,Wd,Hd); c.restore(); return true }

/* ===== 해태 불꽃 갈기: 안쪽→바깥쪽으로 순서대로 빠르게 펑펑 터지는 폭발 (효과 하나에 모아 그려서 가벼워요) ===== */
function drawSeqBoom(c,f,k,t){ const age=(1-k)*f.max, im=typeof artTint==="function"&&artTint("explodefx",null), R1=f.r1, R2=f.r2, rings=R1>0?3:3;
  // 바닥 불빛
  c.save(); c.globalCompositeOperation="lighter"; const gl=Math.max(0,1-age/f.max);
  c.translate(f.x,f.y); c.scale(1,.55); const gg=c.createRadialGradient(0,0,R1*.9,0,0,R2*1.05); gg.addColorStop(0,"rgba(255,120,30,0)"); gg.addColorStop(R1>0?.55:.1,`rgba(255,140,40,${.35*gl})`); gg.addColorStop(1,"rgba(255,80,20,0)"); c.fillStyle=gg; c.beginPath(); c.arc(0,0,R2*1.05,0,7); c.fill(); c.restore();
  for(let ri=0;ri<rings;ri++){ const rr=R1>0?R1+(R2-R1)*(ri+.5)/rings:R2*(ri===0?0:ri/(rings-.5)), n=ri===0&&R1===0?1:Math.max(6,Math.round(rr/26)), delay=ri*.09;
    for(let i=0;i<n;i++){ const d0=delay+(i%2)*.03, a=age-d0, L=.42; if(a<0||a>L) continue; const q=a/L, an=i/n*6.283+ri*.4, x=f.x+Math.cos(an)*rr, y=f.y+Math.sin(an)*rr*.55, S=(R1>0?(R2-R1)/rings*1.9:R2/rings*1.6)*(.6+.6*Math.sqrt(q));
      c.save(); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(.85,(1-q)*1.6); if(im){ const s2=S*.8; c.translate(x,y); c.rotate(an+q); c.drawImage(im,-s2/2,-s2/2,s2,s2) } else { c.fillStyle="#ffb040"; c.beginPath(); c.arc(x,y,S*.4,0,7); c.fill() } c.restore() } }
  return true }

/* ===== 보스 탄 (필살기 파편 포함): 보스 테마에 맞는 진짜 그림 한 장씩 (그림 1장이라 기존보다 가벼워요) ===== */
const TRAIL_COL={flower:"255,150,200",leaf:"140,230,120",poison:"170,230,80",bolt:"255,245,180",ice:"200,240,255",crystal:"220,170,255",rock:"190,160,110",wind:"200,250,255",star:"255,225,140",void:"190,120,255",planet:"190,120,255",light:"255,230,150",fire:"255,160,60"};
/* 날아가는 파편 뒤로 흩날리는 작은 조각 (점 몇 개라 가벼워요) */
function shotTrail(c,b,t,r){ const col=TRAIL_COL[b.th]; if(!col||window.__fxLow) return; const sp=Math.hypot(b.vx,b.vy)||1, ux=b.vx/sp, uy=b.vy/sp, s0=(b.x*13+b.y*7)|0;
  c.save(); c.globalCompositeOperation="lighter"; for(let i=0;i<6;i++){ const ph=((t*3+i/6+((s0+i*37)%100)/100))%1, back=r*(1.5+ph*5), side=Math.sin(s0+i*2.3+t*6)*r*(.4+ph*1.4), x=b.x-ux*back-uy*side, y=b.y-uy*back+ux*side, sz=(1-ph)*r*.35+1;
    c.fillStyle=`rgba(${col},${(1-ph)*.75})`; c.fillRect(x-sz/2,y-sz/2,sz,sz) } c.restore() }
function drawArtShot(c,b,t){ if(window.__noArt||typeof SKILL_IMG==="undefined") return false; const S=SKILL_IMG, th=b.th, a=Math.atan2(b.vy,b.vx), r=b.r||10; shotTrail(c,b,t,r);
  const one=(im,w,h,rot,ax,add,tint)=>{ if(!im) return false; const T=tint&&typeof warnTex==="function"?warnTex(tint[0],tint[1]):im; if(!T) return false;
    // 가시성: 어떤 바닥에서도 잘 보이게 어두운 테두리 그늘 + 붉은 위험 고리
    c.save(); const hg=c.createRadialGradient(b.x,b.y,r*.3,b.x,b.y,r*2.1); hg.addColorStop(0,"rgba(20,0,10,.45)"); hg.addColorStop(.7,"rgba(120,0,30,.22)"); hg.addColorStop(1,"rgba(0,0,0,0)"); c.fillStyle=hg; c.beginPath(); c.arc(b.x,b.y,r*2.1,0,7); c.fill();
    c.strokeStyle=`rgba(255,60,80,${.55+.3*Math.sin(t*14+b.x*.05)})`; c.lineWidth=2; c.beginPath(); c.arc(b.x,b.y,r*1.25,0,7); c.stroke(); c.restore();
    c.save(); c.translate(b.x,b.y); c.rotate(rot); if(add) c.globalCompositeOperation="lighter"; c.drawImage(T,-w*ax,-h/2,w,h); c.restore(); return true };
  { const SK2={flower:["shot_flower",.83],leaf:["shot_leaf",.76],poison:["shot_poison",.86],bolt:["shot_bolt",.78]}[th]; if(SK2&&S[SK2[0]]){ const im=S[SK2[0]], L=r*8.5, H=L*im.height/im.width; return one(im,L,H,a,SK2[1],true) } }
  if(th==="ice"&&S.cardice){ const L=r*7, H=L*S.cardice.height/S.cardice.width; return one(S.cardice,L,H*1.4,a,.75) }
  if(th==="crystal"&&S.cardice){ const L=r*6.5, H=L*S.cardice.height/S.cardice.width; return one(S.cardice,L,H*1.6,a,.75,false,["cardice","#d070ff"]) }
  if(th==="rock"){ const im=window.__mapId===3&&S.ruinrock?S.ruinrock:S.cardstone; if(!im) return false; const s=r*3.4; c.save(); c.fillStyle="rgba(0,0,0,.18)"; c.beginPath(); c.ellipse(b.x,b.y+r*1.3,r*1.2,r*.4,0,0,7); c.fill(); c.restore(); return one(im,s,s*im.height/im.width,t*6+b.x*.01,.5) }
  if(th==="wind"&&S.cardwind){ const s=r*4.2; return one(S.cardwind,s,s,-t*14,.5,true,["cardwind","#bff6ff"]) }
  if(th==="star"&&S.starfall){ const L=r*8, H=L*S.starfall.height/S.starfall.width; return one(S.starfall,L,H,a+.75,.787,true) }
  if((th==="void"||th==="planet")&&S.holefx){ const s=r*4.4; return one(S.holefx,s,s,-t*5,.5,true) }
  if(th==="light"&&S.lightspear){ const L=r*9, W=L*S.lightspear.width/S.lightspear.height; return one(S.lightspear,W,L,a-Math.PI/2,.5,true,["lightspear","#ffe08a"]) }
  return false }

/* ===== 보스 폭격 두 가지 느낌 (보내 준 영상처럼) =====
   A) 낙하: 가는 조준 빛줄기가 내려와 땅을 비추다가 → 굵은 빛기둥이 쾅 내리꽂혀요
   B) 폭발: 땅의 빛 고리에서 가는 빛바늘이 솟고 → 넓은 빛기둥이 위로 터져 오르며 연기 고리가 퍼져요
   맵 색으로 물들인 그림 조각을 미리 만들어 두고 늘였다 줄였다만 해서 가벼워요 */
const COLTX={}; function colTex(col){ if(COLTX[col]) return COLTX[col]; const cv=document.createElement("canvas"); cv.width=32; cv.height=256; const x=cv.getContext("2d");
  const g=x.createLinearGradient(0,0,0,256); g.addColorStop(0,"rgba(255,255,255,0)"); g.addColorStop(.35,`rgba(${col},.55)`); g.addColorStop(.85,"rgba(255,255,240,.95)"); g.addColorStop(1,"rgba(255,255,255,1)"); x.fillStyle=g; x.fillRect(0,0,32,256);
  x.globalCompositeOperation="destination-in"; const h=x.createLinearGradient(0,0,32,0); h.addColorStop(0,"rgba(0,0,0,0)"); h.addColorStop(.5,"#000"); h.addColorStop(1,"rgba(0,0,0,0)"); x.fillStyle=h; x.fillRect(0,0,32,256); return COLTX[col]=cv }
function eruptColumn(c,x,y,R,age,dur,col,seed){ const T=colTex(col), p=age/dur; if(p>=1) return; const fade=p<.55?1:1-(p-.55)/.45; c.save(); c.globalCompositeOperation="lighter";
  // 바닥 빛 고리
  c.save(); c.translate(x,y); c.scale(1,.36); const rg=c.createRadialGradient(0,0,R*.2,0,0,R*1.15); rg.addColorStop(0,`rgba(${col},${.5*fade})`); rg.addColorStop(.7,`rgba(${col},${.35*fade})`); rg.addColorStop(1,`rgba(${col},0)`); c.fillStyle=rg; c.beginPath(); c.arc(0,0,R*1.15,0,7); c.fill(); c.restore();
  if(p<.18){ // 가는 빛바늘들이 하나씩 솟아요
    const n=1+Math.floor(p/.18*6); for(let i=0;i<n;i++){ const ox=Math.sin(seed+i*2.7)*R*.55, h=R*(2.6+((seed*7+i*13)%10)/6); c.globalAlpha=.9; c.drawImage(T,x+ox-3,y-h,6,h) } }
  else { const q=Math.min(1,(p-.18)/.12), H=R*(3.2+.6*q)*(.75+.25*q), W=R*1.6*(.5+.5*q);
    for(let i=0;i<9;i++){ const u=(i-4)/4, h=H*(.6+.4*Math.abs(Math.sin(seed+i*1.9+age*18))), w=W*(.18+.12*((i*7)%3)); c.globalAlpha=fade*(.55+.35*(1-Math.abs(u))); c.drawImage(T,x+u*W*.45-w/2,y-h,w,h) }
    // 반짝이는 마름모 빛 조각
    c.fillStyle=`rgba(255,255,235,${fade})`; for(let i=0;i<5;i++){ const xx=x+Math.sin(seed+i*3.3)*W*.35, yy=y-H*(.25+((i*29+seed*3)%10)/14)-age*120; c.beginPath(); c.moveTo(xx,yy-9); c.lineTo(xx+3,yy); c.lineTo(xx,yy+9); c.lineTo(xx-3,yy); c.closePath(); c.fill() }
    // 연기 고리
    c.globalCompositeOperation="source-over"; for(let i=0;i<10;i++){ const an=i/10*6.283, d=R*(.8+p*.5); c.fillStyle=`rgba(60,45,40,${.35*fade})`; c.beginPath(); c.arc(x+Math.cos(an)*d,y+Math.sin(an)*d*.36,R*.16*(1+p),0,7); c.fill() } }
  c.restore() }
function pillarStrike(c,f,q,t,col){ const im=typeof warnTex==="function"&&warnTex("moonpillar",colHex(col)); if(!im) return false; const H=520;
  if(q<.82){ const a=q/.82; c.save(); c.globalCompositeOperation="lighter"; const lg=c.createLinearGradient(0,f.y-H,0,f.y); lg.addColorStop(0,`rgba(${col},0)`); lg.addColorStop(1,`rgba(${col},${.8*a})`); c.fillStyle=lg; const bw=2+a*5; c.fillRect(f.x-bw/2,f.y-H,bw,H); jGlow(c,f.x,f.y,24+a*26,col,.7*a); c.restore(); return true }
  const d=Math.min(1,(q-.82)/.18), hy=f.y-H+H*d, Wd=H*im.width/im.height*.8; c.save(); c.globalCompositeOperation="lighter"; c.beginPath(); c.rect(f.x-Wd,f.y-H,Wd*2,hy-(f.y-H)+2); c.clip(); c.drawImage(im,f.x-Wd/2,f.y-H*.942,Wd,H); c.restore(); return true }
const colHex=rgb=>"#"+rgb.split(",").map(v=>(+v).toString(16).padStart(2,"0")).join("");

/* ===== 네 발 정령(백호·황소): 그림 아랫부분을 앞다리·뒷다리로 나눠 번갈아 내딛어요 (조각 3개라 가벼워요) ===== */
const LEGC={}; function legCut(key,img){ if(LEGC[key]!==undefined) return LEGC[key]; const im=img||(typeof SKILL_IMG!=="undefined"&&SKILL_IMG[key]); if(!im||!im.width) return null;
  try{ const W=im.width, H=im.height, mk=(x0,y0,x1,y1)=>{ const cv=document.createElement("canvas"); cv.width=W; cv.height=H; const x=cv.getContext("2d"); x.beginPath(); x.rect(x0,y0,x1-x0,y1-y0); x.clip(); x.drawImage(im,0,0); return cv };
    const hip=Math.round(H*.66); return LEGC[key]={W,H,hip,up:mk(0,0,W,hip+Math.round(H*.04)),back:mk(0,hip,W*.5,H),front:mk(W*.5,hip,W,H),full:im} }catch(e){ return LEGC[key]=null } }
function drawLegged(c,key,x,y,h,flip,tilt,ph,mv,img){ const L=legCut(key,img); if(!L) return false; const s=h/L.H, sw=Math.sin(ph)*mv, lift=Math.max(0,Math.cos(ph))*mv;
  c.save(); c.translate(x,y); if(tilt) c.rotate(tilt); if(flip) c.scale(-1,1); c.scale(s,s); c.translate(-L.W/2,-L.H/2);
  const leg=(cv,px,an,dy)=>{ c.save(); c.translate(px,L.hip+dy); c.rotate(an); c.drawImage(cv,-px,-L.hip); c.restore() };
  leg(L.back,L.W*.3,-sw*.42,-lift*L.H*.03); leg(L.front,L.W*.7,sw*.42,-Math.max(0,-Math.cos(ph))*mv*L.H*.03); c.drawImage(L.up,0,0); c.restore(); return true }
/* ===== 사실적인 발톱 할퀴기: 휙 그어지는 세 줄 칼자국 (끝이 가늘고 가운데 흰 심 · 푸른 빛) ===== */
function drawClawFx(c,f,k){ const p=1-k, sw=Math.min(1,p/.35), fade=p<.35?1:Math.max(0,1-(p-.35)/.65), A=-.9;
  c.save(); c.translate(f.x,f.y); c.rotate(A); c.globalCompositeOperation="lighter";
  for(let i=-1;i<=1;i++){ const L=(64-Math.abs(i)*10), x0=-L/2, len=L*sw, oy=i*13;
    const g=c.createLinearGradient(x0,0,x0+L,0); g.addColorStop(0,`rgba(140,200,255,0)`); g.addColorStop(.5,`rgba(170,220,255,${.85*fade})`); g.addColorStop(1,`rgba(255,255,255,${fade})`);
    c.fillStyle=g; c.beginPath(); c.moveTo(x0,oy); c.quadraticCurveTo(x0+len*.5,oy-7*(1-Math.abs(i)*.3)-4,x0+len,oy-2); c.quadraticCurveTo(x0+len*.5,oy+3,x0,oy); c.closePath(); c.fill();
    c.strokeStyle=`rgba(255,255,255,${fade})`; c.lineWidth=1.4; c.beginPath(); c.moveTo(x0+len*.15,oy-1); c.quadraticCurveTo(x0+len*.5,oy-5,x0+len,oy-2); c.stroke() }
  jGlow(c,0,0,46,"150,210,255",.35*fade); c.restore(); return true }
/* ===== 청룡: 서예 도령의 묵룡처럼 머리·몸통 마디·발·꼬리가 이어져 물결치며 날아요 (푸른빛) ===== */
function drawBlueDragon(c,m,t){ const S=typeof SKILL_IMG!=="undefined"?SKILL_IMG:{}; if(!S.dr_head||!S.dr_body||!S.dr_tail||typeof artTint!=="function") return false;
  const TC="#3a8cff", H_=artTint("dr_head",TC), B_=artTint("dr_body",TC), T_=artTint("dr_tail",TC), F_=S.dr_front&&artTint("dr_front",TC), K_=S.dr_back&&artTint("dr_back",TC); if(!H_||!B_||!T_) return false;
  const tr=m._tr||(m._tr=[]); if(!tr.length||Math.hypot(tr[0][0]-m.x,tr[0][1]-m.y)>1.5){ tr.unshift([m.x,m.y]); if(tr.length>84) tr.length=84 } else { tr[0]=[m.x,m.y] }   /* 멈춰 있을 땐 몸 모양 그대로 (머리만 뭉쳐 보이지 않게) */
  const N=11, NT=5, sc=.62, step=4, pts=[]; for(let i=0;i<=N+NT+1;i++){ const q=tr[Math.min(tr.length-1,i*step)]; pts.push([q[0]+Math.sin(t*7-i*.6)*4*Math.min(1.6,i/N),q[1]+Math.cos(t*7-i*.6)*4*Math.min(1.6,i/N)]) }
  const angAt=i=>{ const a=pts[Math.max(0,i)], b=pts[Math.min(pts.length-1,i+1)]; const an=Math.atan2(a[1]-b[1],a[0]-b[0]); return isNaN(an)?0:an };
  const part=(img,x,y,an,w,h,ox,oy,fy,cx0,cx1)=>{ c.save(); c.translate(x,y); c.rotate(an); if(fy) c.scale(1,-1); if(cx0!==undefined){ const sx=img.width*cx0, sw=img.width*(cx1-cx0); c.drawImage(img,sx,0,sw,img.height,-w*ox,-h*oy,w,h) } else c.drawImage(img,-w*ox,-h*oy,w,h); c.restore() };
  const up=a=>Math.cos(a)<0, sp=34*sc*1.3, BH=70*sc;
  if(K_){ const a=angAt(N-3), w=70*sc, h=w*K_.height/K_.width; part(K_,pts[N-3][0],pts[N-3][1],a+(up(a)?-1:1)*(.9+Math.sin(t*8)*.45),w,h,.25,.2,up(a)) }
  /* 꼬리: 몸통이 점점 가늘어지며 이어지고, 끝에 꼬리털(꼬리 그림의 털 부분만)이 휘날려요 */
  { const E=N+NT, a=angAt(E-1)+Math.PI+Math.sin(t*7.5-E*.6)*.3, TW=T_.width, TH=T_.height, cx=.56*TW, cy=.33*TH, va=Math.atan2(-.27*TH,-.56*TW), w=118*sc, s=w/TW;
    c.save(); c.translate(pts[E][0],pts[E][1]); c.rotate(a-va); c.scale(s,s*(up(a+Math.PI)?-1:1)); c.drawImage(T_,0,0,TW*.62,TH*.5,-cx,-cy,TW*.62,TH*.5); c.restore() }
  for(let i=N+NT;i>N;i--){ const a=angAt(i-1), mx=(pts[i][0]+pts[i-1][0])/2, my=(pts[i][1]+pts[i-1][1])/2, d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]), q=(i-N)/NT, tp=.52*(1-q*.72); part(B_,mx,my,a,Math.max(sp*.8,d*1.3),BH*tp,.5,.55,up(a),.32,.68) }
  for(let i=N;i>=1;i--){ const a=angAt(i-1), mx=(pts[i][0]+pts[i-1][0])/2, my=(pts[i][1]+pts[i-1][1])/2, d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]), tp=1-Math.pow(i/N,1.6)*.48; part(B_,mx,my,a,Math.max(sp,d*1.3),BH*tp,.5,.55,up(a),.32,.68) }   /* 꼬리 쪽으로 갈수록 가늘어져 꼬리와 자연스럽게 이어져요 */
  if(F_){ const a=angAt(2), w=80*sc, h=w*F_.height/F_.width; part(F_,pts[2][0],pts[2][1]+5*sc,a+(up(a)?-1:1)*(1.05+Math.sin(t*8)*.5),w,h,.22,.18,up(a)) }
  { const a=angAt(0)+Math.sin(t*7.5+.8)*.08, w=140*sc, h=w*H_.height/H_.width; part(H_,pts[0][0],pts[0][1],a,w,h,.3,.55,up(a)) }
  c.save(); c.globalCompositeOperation="lighter"; jGlow(c,pts[0][0],pts[0][1],70,"90,170,255",.35); c.restore(); return true }

/* 유령 사냥개: 지옥 사냥개 달리기 그림을 푸르스름한 유령빛으로 물들이고, 잔상·영혼 연기를 남기며 달려요 (물들인 그림은 한 번만 만들어 둬요) */
let GHTX=null;
function drawGhostHound(c,b,t){ const im=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.run_st5_0; if(!im||!im.width) return false;
  if(!GHTX){ const cv=document.createElement("canvas"); cv.width=im.width; cv.height=im.height; const x=cv.getContext("2d"); x.drawImage(im,0,0);
    x.globalCompositeOperation="source-atop"; x.fillStyle="rgba(120,230,255,.78)"; x.fillRect(0,0,cv.width,cv.height); GHTX=cv }
  const N=4, cw=im.width/N, ch=im.height, H=104, W=H*cw/ch, dir=b.vx>=0?1:-1, sp=Math.hypot(b.vx,b.vy)||1, ux=b.vx/sp, uy=b.vy/sp, fl=.82+.18*Math.sin(t*23+b.x*.01);
  const frame=(i,x,y,al,sc)=>{ c.save(); c.translate(x,y); c.scale(dir*sc,sc); c.globalAlpha=al; c.drawImage(GHTX,i*cw,0,cw,ch,-W/2,-H*.62,W,H); c.restore() };
  const idx=Math.floor(t*16+(b.x+b.y)*.002)%N;
  c.save(); c.globalCompositeOperation="lighter";
  // 바닥에 끌리는 영혼 연기
  for(let i=0;i<7;i++){ const u=((t*2.6+i/7)%1), d=u*150+20, px=b.x-ux*d+Math.sin(i*2.3+t*4)*10, py=b.y-uy*d+H*.22-u*28;
    const gr=c.createRadialGradient(px,py,0,px,py,14+u*26); gr.addColorStop(0,`rgba(150,240,255,${.32*(1-u)})`); gr.addColorStop(1,"rgba(60,140,255,0)"); c.fillStyle=gr; c.beginPath(); c.arc(px,py,14+u*26,0,7); c.fill() }
  // 잔상 3개 (뒤로 갈수록 희미하게)
  for(let k=3;k>=1;k--) frame((idx+N-k)%N,b.x-ux*k*34,b.y-uy*k*34,.16*(1-k/4)*fl,1-k*.03);
  // 본체: 푸른 유령빛
  frame(idx,b.x,b.y,.62*fl,1); c.globalCompositeOperation="source-over"; frame(idx,b.x,b.y,.32*fl,1); c.globalCompositeOperation="lighter";
  // 빛나는 눈
  const ex=b.x+dir*W*.22, ey=b.y-H*.34; const eg=c.createRadialGradient(ex,ey,0,ex,ey,12); eg.addColorStop(0,"rgba(255,255,255,.95)"); eg.addColorStop(.4,"rgba(140,255,255,.7)"); eg.addColorStop(1,"rgba(80,200,255,0)"); c.fillStyle=eg; c.beginPath(); c.arc(ex,ey,12,0,7); c.fill();
  c.restore(); return true }

/* 흑기사 단장 부채 베기: 칼날이 지나간 자리에 날카로운 초승달 검흔이 남아요 (얇은 끝 → 두꺼운 머리, 진홍 빛 + 하얀 칼날 선 + 불티) */
function drawCleave2(c,f,p,k,t){ const R=f.r, sw=f.half*2, ez=1-Math.pow(1-Math.min(1,p*2.4),3), head=sw*(-.08+1.16*ez), span=sw*.85, fade=p<.45?1:Math.max(0,1-(p-.45)/.55);
  if(fade<=0) return true;
  const cres=(r,w,a0,a1)=>{ const n=26; c.beginPath(); for(let i=0;i<=n;i++){ const u=i/n, a=a0+(a1-a0)*u; c.lineTo(Math.cos(a)*r,Math.sin(a)*r) }
    for(let i=n;i>=0;i--){ const u=i/n, a=a0+(a1-a0)*u, th=w*Math.pow(Math.sin(Math.PI*Math.min(1,u*1.05)),.7)*(.25+.75*u); c.lineTo(Math.cos(a)*(r-th),Math.sin(a)*(r-th)) } c.closePath() };
  const a1=Math.min(sw+.05,head), a0=Math.max(-.05,head-span);
  c.save(); c.translate(f.x,f.y); c.rotate(f.a-f.half);
  // 어두운 밑그림 (밝은 바닥에서도 또렷하게)
  c.globalAlpha=.45*fade; c.fillStyle="#1a0006"; cres(R*1.01,R*.24,a0,a1); c.fill();
  c.globalCompositeOperation="lighter";
  // 부채 안쪽: 칼바람이 쓸고 간 자리 (바깥으로 갈수록 진하게)
  { const fg=c.createRadialGradient(0,0,R*.15,0,0,R); fg.addColorStop(0,"rgba(255,40,70,0)"); fg.addColorStop(.75,"rgba(220,20,50,.16)"); fg.addColorStop(1,"rgba(255,90,110,.28)"); c.globalAlpha=fade; c.fillStyle=fg; c.beginPath(); c.moveTo(0,0); c.arc(0,0,R,a0,a1); c.closePath(); c.fill() }
  // 안쪽 잔상 검흔 2겹
  c.globalAlpha=.35*fade; c.fillStyle="#ff4a64"; cres(R*.74,R*.09,a0+.1,a1-.04); c.fill(); c.globalAlpha=.2*fade; cres(R*.5,R*.06,a0+.18,a1-.08); c.fill();
  // 넓은 진홍 빛 번짐 → 붉은 칼날 몸통 → 하얀 칼날 선
  c.globalAlpha=.4*fade; c.fillStyle="#b0102a"; cres(R*1.03,R*.3,a0,a1); c.fill();
  c.globalAlpha=.85*fade; const gr=c.createRadialGradient(0,0,R*.68,0,0,R); gr.addColorStop(0,"rgba(120,0,20,0)"); gr.addColorStop(.6,"#e0203a"); gr.addColorStop(1,"#ff8a8a"); c.fillStyle=gr; cres(R,R*.17,a0,a1); c.fill();
  c.globalAlpha=fade; c.fillStyle="#fff2f2"; cres(R*.995,R*.035,a0+(a1-a0)*.15,a1); c.fill();
  // 칼끝 섬광
  if(p<.5){ const hx=Math.cos(a1)*R*.95, hy=Math.sin(a1)*R*.95, gl=c.createRadialGradient(hx,hy,0,hx,hy,R*.16); gl.addColorStop(0,"rgba(255,240,240,.9)"); gl.addColorStop(.35,"rgba(255,70,90,.5)"); gl.addColorStop(1,"rgba(255,0,40,0)"); c.globalAlpha=1-p*2; c.fillStyle=gl; c.beginPath(); c.arc(hx,hy,R*.16,0,7); c.fill() }
  // 바깥으로 튀는 불티
  c.globalAlpha=fade; c.strokeStyle="#ffb0b0"; c.lineCap="round"; c.lineWidth=2.2;
  for(let i=0;i<9;i++){ const u=(i+.5)/9, a=a0+(a1-a0)*u, d=R*(1+p*.35*(.6+.4*Math.sin(i*7.1))), l=R*.06*(1-p); if(a>a1) continue; c.beginPath(); c.moveTo(Math.cos(a)*d,Math.sin(a)*d); c.lineTo(Math.cos(a+.05)*(d+l),Math.sin(a+.05)*(d+l)); c.stroke() }
  c.restore(); return true }

/* 성운의 인도자 별 도끼: 보스가 든 진짜 도끼 그림이 빙글빙글 돌며 날아가고, 잔상과 별가루 꼬리를 남겨요 */
function drawStarAxe(c,b,t){ const im=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.staraxe; if(!im||!im.width) return false;
  const r=b.r, S=r*2.7, w=S*im.width/im.height, h=S, cx=w*.47, cy=h*.45, sp=t*15, v=Math.hypot(b.vx||0,b.vy||0), ux=v>1?b.vx/v:0, uy=v>1?b.vy/v:0;
  c.save(); c.globalCompositeOperation="lighter";
  // 별가루 꼬리
  for(let i=0;i<10;i++){ const u=((t*3+i/10)%1), d=u*r*3.2, px=b.x-ux*d+Math.sin(i*2.7+t*6)*r*.35, py=b.y-uy*d+Math.cos(i*1.9+t*5)*r*.35, s=(1-u)*5+1.5;
    c.globalAlpha=.8*(1-u); c.fillStyle=i%3?"#c8a8ff":"#fff4c8"; c.beginPath(); c.arc(px,py,s,0,7); c.fill() }
  // 회전 빛 고리 + 은은한 보랏빛
  const gl=c.createRadialGradient(b.x,b.y,0,b.x,b.y,r*1.7); gl.addColorStop(0,"rgba(190,150,255,.45)"); gl.addColorStop(1,"rgba(90,40,200,0)"); c.globalAlpha=1; c.fillStyle=gl; c.beginPath(); c.arc(b.x,b.y,r*1.7,0,7); c.fill();
  // 잔상 3겹
  for(let i=3;i>=1;i--){ c.save(); c.translate(b.x-ux*i*r*.28,b.y-uy*i*r*.28); c.rotate(sp-i*.42); c.globalAlpha=.22*(1-i/4); c.drawImage(im,-cx,-cy,w,h); c.restore() }
  c.globalCompositeOperation="source-over"; c.globalAlpha=1;
  c.save(); c.translate(b.x,b.y); c.rotate(sp); c.drawImage(im,-cx,-cy,w,h); c.globalCompositeOperation="lighter"; c.globalAlpha=.3; c.drawImage(im,-cx,-cy,w,h); c.restore();
  c.restore(); return true }

/* 폭풍 연사의 거대한 활: 모든 효과 위에, 캐릭터 앞쪽에 또렷하게 (빛에 묻히지 않게) */
function jfHurricaneBow(c,P,t,k,aim){ const BI=typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.windbow; if(!BI) return;
  const Hd=260, Wd=Hd*BI.width/BI.height, vib=Math.sin(t*60)*1.5, DK=typeof warnTex==="function"&&warnTex("windbow",window.__t5==="archer"?"#1e3a9a":"#0e7a52");
  c.save(); c.translate(P.x,P.y-10); c.rotate(aim||0); c.translate(Wd*.12+40,0);
  c.globalCompositeOperation="source-over"; if(DK){ c.globalAlpha=k*.9; for(const [ox,oy] of [[-2,0],[2,0],[0,-2],[0,2]]) c.drawImage(DK,-Wd*.12+ox,-Hd/2+oy,Wd,Hd) }   // 진한 테두리 (밝은 빛 속에서도 보이게)
  c.globalAlpha=k*.55; c.globalCompositeOperation="lighter"; jGlow(c,Wd*.3,0,Hd*.5,"120,255,200",.4*k);
  c.globalCompositeOperation="source-over"; c.globalAlpha=k; c.drawImage(BI,-Wd*.12+vib,-Hd/2,Wd,Hd);
  c.globalCompositeOperation="lighter"; c.globalAlpha=k*(.35+.15*Math.sin(t*14)); c.drawImage(BI,-Wd*.12,-Hd/2,Wd,Hd);
  c.globalCompositeOperation="source-over"; c.globalAlpha=1; drawWindArrow(c,-Wd*.12+10,0,0,150,k,true); c.restore() }

/* ===== 5차 강화 궁극기(그로기 극딜) 연출: 직업마다 다른 애니메이션 · 보스 자리에서 2.2초 =====
   layer 0 = 보스 아래(바닥) · layer 1 = 보스 위(옅게, 보스가 늘 보이게) */
/* 직업별 그림 세트: [그림 이름 앞부분, 쾅 모양(rise=솟구침 · burst=터짐), 더 머무는 시간, 바닥 회전] */
const B5_SET={warrior:["b5w","rise",0,0],archer:["b5a","rise",.35,1],mage:["b5m","rise",.1,0],pirate:["b5p","rise",.1,1],healer:["b5h","rise",.2,1],thief:["b5t","burst",0,0],calli:["b5c","dive",.1,0],zodiac:["b5z","rise",.2,1],mech:["b5k","rise",0,0]};
function drawBurst5(c,f,now,layer){ const k=(now-f.t0)/f.dur; if(k<0||k>1) return; const x=f.x, y=f.y, TAU=Math.PI*2, R=f.R||260;
  const ez=v=>v<0?0:v>1?1:1-Math.pow(1-v,3), IMP=.32, ch=Math.min(1,k/IMP), af=k<IMP?0:(k-IMP)/(1-IMP), fade=k<.8?1:1-(k-.8)/.2;
  const rnd=i=>{ const v=Math.sin(i*127.1+(f.seed||1)*311.7)*43758.5453; return v-Math.floor(v) };
  c.save(); c.translate(x,y);
  const glowDot=(px,py,r,col,a)=>{ const g=c.createRadialGradient(px,py,0,px,py,r); g.addColorStop(0,`rgba(${col},${a})`); g.addColorStop(1,`rgba(${col},0)`); c.fillStyle=g; c.fillRect(px-r,py-r,r*2,r*2) };
  const shock=(col,mul)=>{ if(af<=0||af>.6) return; const q=af/.6, rr=R*(mul||1.2)*ez(q); c.save(); c.scale(1,.5); c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(${col},${(1-q)*.9})`; c.lineWidth=18*(1-q)+2; c.beginPath(); c.arc(0,0,rr,0,TAU); c.stroke(); c.restore() };
  const charge=(col)=>{ if(k>=IMP) return; c.save(); c.globalCompositeOperation="lighter"; for(let i=0;i<16;i++){ const a=rnd(i)*TAU, d=R*1.3*(1-ch)+10, px=Math.cos(a+ch*2)*d, py=Math.sin(a+ch*2)*d*.5-30; glowDot(px,py,10,col,.9) } glowDot(0,-30,40+60*ch,col,.35+.4*ch); c.restore() };
  const C=f.cls, SI=n=>{ const I=typeof SKILL_IMG!=="undefined"&&SKILL_IMG[n]; return I&&I.width?I:null };
  /* 공통: 충격파 고리(바닥) · 섬광(위) · 속도선 · 2차 폭발 */
  { const RG=SI("b5_ring"), FL=SI("b5_flash");
    if(layer===0&&RG) for(const [t0,mul,al] of [[0,1.7,1],[.3,1.1,.7]]){ const q=(af-t0)/.45; if(af<=t0||q>1) continue; const sc=R*mul*(.25+ez(q)*1); c.save(); c.scale(1,.5); c.globalCompositeOperation="lighter"; c.globalAlpha=al*(1-q)*(q<.1?q/.1:1); c.drawImage(RG,-sc,-sc,sc*2,sc*2); c.restore() }
    if(layer===1){ if(FL) for(const [t0,mul,al] of [[0,1.5,.95],[.3,.9,.6]]){ const q=(af-t0)/.28; if(af<=t0||q>1) continue; const sc=R*mul*(.5+ez(q)*.9); c.save(); c.translate(0,-60); c.rotate(t0*3+q*.6); c.globalCompositeOperation="lighter"; c.globalAlpha=al*(1-q); c.drawImage(FL,-sc,-sc,sc*2,sc*2); c.restore() }
      if(af>0&&af<.4){ const q=af/.4; c.save(); c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(255,250,235,${.55*(1-q)})`; c.lineWidth=3; for(let i=0;i<36;i++){ const a=rnd(i+200)*TAU, r0=330+rnd(i+300)*120+q*200, r1=r0+180+rnd(i+400)*260; c.beginPath(); c.moveTo(Math.cos(a)*r0,Math.sin(a)*r0*.7-60); c.lineTo(Math.cos(a)*r1,Math.sin(a)*r1*.7-60); c.stroke() } c.restore() } }   /* 속도선: 쾅 하는 순간 화면 밖으로 뻗어요 */
    if(k<IMP&&layer===1){ const q=ch; c.save(); c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(255,240,200,${.35*q})`; c.lineWidth=2; for(let i=0;i<20;i++){ const a=rnd(i+500)*TAU, r1=600*(1-q)+120, r0=r1+160; c.beginPath(); c.moveTo(Math.cos(a)*r0,Math.sin(a)*r0*.6-60); c.lineTo(Math.cos(a)*r1,Math.sin(a)*r1*.6-60); c.stroke() } c.restore() } }   /* 모으기: 빛줄기가 보스 쪽으로 빨려 들어가요 */
  /* 그림 이펙트가 있으면: ①모으기(빙글 빨려 듦) → ②쾅(솟구치거나 터짐) → ③바닥 흔적 · 전부 보스 뒤(바닥)에 그려 보스를 안 가려요 */
  { const PF=B5_SET[C]; if(PF&&SI(PF[0]+"_impact")){ if(layer===1){ c.restore(); return }
    const CG=SI(PF[0]+"_charge"), IP=SI(PF[0]+"_impact"), FD=SI(PF[0]+"_floor"), kind=PF[1], hold=PF[2]||0;
    if(FD&&af>0){ const q=ez(Math.min(1,af/.12)), w=R*2.3*(.6+.4*q), h=w*FD.height/FD.width; c.save(); if(PF[3]) c.rotate(now*PF[3]*.15); c.globalAlpha=fade*Math.min(1,af/.06); c.drawImage(FD,-w/2,-h/2,w,h); c.globalCompositeOperation="lighter"; c.globalAlpha=fade*(.3+.25*Math.sin(now*9))*(1-af); c.drawImage(FD,-w/2,-h/2,w,h); c.restore() }
    if(CG&&k<IMP+.05){ const s2=R*1.2*(1.25-ch*.65); c.save(); c.translate(0,-70); c.scale(1,.9); c.rotate(-now*5); c.globalCompositeOperation="lighter"; c.globalAlpha=Math.min(1,ch*2)*(k<IMP?1:1-(k-IMP)/.05); c.drawImage(CG,-s2,-s2,s2*2,s2*2); c.restore() }
    const end=.62+hold;
    for(const [t0,mul,fl] of (kind==="rise"?[[0,1,1],[.16,.68,-1]]:[[0,1,1]])){ const a2=af-t0; if(a2<=0||a2>end) continue; const q=ez(Math.min(1,a2/.1)), al=(a2<end-.24?1:1-(a2-(end-.24))/.24)*fade;
      if(kind==="rise"){ const hh=R*2.2*mul*(.5+.55*q), ww=hh*IP.width/IP.height; c.save(); c.translate(fl<0?-R*.3:0,R*.12); const spin=hold?Math.sin(now*10):1; c.scale(fl*(hold?(.85+.15*Math.abs(spin)):1),1+.08*(1-q)); c.globalAlpha=al; c.drawImage(IP,-ww/2,-hh*.95,ww,hh); if(hold){ c.scale(-1,1); c.globalAlpha=al*.45*(1-Math.abs(spin)); c.drawImage(IP,-ww/2,-hh*.95,ww,hh) } c.restore() }
      else if(kind==="dive"){ const hh=R*2.4*mul, ww=hh*IP.width/IP.height, dy=-R*2.2*(1-ez(Math.min(1,a2/.14))); c.save(); c.translate(0,dy-20); c.globalCompositeOperation="lighter"; c.globalAlpha=al; c.drawImage(IP,-ww/2,-hh*.86,ww,hh); c.restore() }   /* 용이 위에서 보스에게 내리꽂혀요 */
      else { const sc=R*1.15*mul*(.5+.65*q); c.save(); c.translate(0,-60); c.rotate((1-q)*.25); c.globalCompositeOperation="lighter"; c.globalAlpha=al; c.drawImage(IP,-sc,-sc*IP.height/IP.width,sc*2,sc*2*IP.height/IP.width); c.restore() } }
    c.restore(); return } }
  if(C==="warrior"){ /* 바위: 땅이 쩍 갈라지고 바위가 솟구쳐요 */
    if(layer===0){ const n=10, gl=k<IMP?ch:1; c.save(); c.scale(1,.55);
      for(let i=0;i<n;i++){ const a=i/n*TAU+rnd(i)*.4, L=R*1.25*ez(gl)*(.7+rnd(i+20)*.5); c.beginPath(); c.moveTo(0,0); let px=0,py=0; const segs=7; for(let s=1;s<=segs;s++){ const d=L*s/segs, j=(rnd(i*13+s)-.5)*34; px=Math.cos(a)*d-Math.sin(a)*j; py=Math.sin(a)*d+Math.cos(a)*j; c.lineTo(px,py) }
        c.lineCap="round"; c.lineJoin="round"; c.strokeStyle=`rgba(30,14,6,${.85*fade})`; c.lineWidth=14; c.stroke(); c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(255,${150+60*Math.sin(now*12+i)|0},50,${(af>0?.9:.5*ch)*fade})`; c.lineWidth=5; c.stroke(); c.globalCompositeOperation="source-over" }
      c.restore(); shock("255,190,90",1.3);
      if(af>0){ c.save(); c.scale(1,.5); const dg=c.createRadialGradient(0,0,0,0,0,R*1.4); dg.addColorStop(0,`rgba(150,110,70,${.45*(1-af)})`); dg.addColorStop(1,"rgba(150,110,70,0)"); c.fillStyle=dg; c.beginPath(); c.arc(0,0,R*1.4*ez(af*2),0,TAU); c.fill(); c.restore() } }
    else if(af>0){ for(let i=0;i<14;i++){ const a=rnd(i+40)*TAU, d=R*(.25+rnd(i+60)*.9), q=Math.min(1,af*1.6), h=(260+rnd(i+80)*220)*q-q*q*380, px=Math.cos(a)*d*.9, py=Math.sin(a)*d*.45-Math.max(0,h), s=10+rnd(i+90)*16, rot=af*8*(rnd(i)-.5);
        c.save(); c.translate(px,py); c.rotate(rot); c.globalAlpha=.85*fade; c.fillStyle=i%3?"#7a5a40":"#a07a52"; c.beginPath(); c.moveTo(-s,-s*.4); c.lineTo(-s*.2,-s); c.lineTo(s,-s*.3); c.lineTo(s*.6,s*.8); c.lineTo(-s*.7,s*.6); c.closePath(); c.fill(); c.fillStyle="rgba(255,230,190,.5)"; c.beginPath(); c.moveTo(-s*.2,-s); c.lineTo(s,-s*.3); c.lineTo(s*.2,-s*.2); c.closePath(); c.fill(); c.restore() } } }
  else if(C==="archer"){ /* 바람: 회오리가 휘몰아쳐요 */
    if(layer===0){ c.save(); c.scale(1,.45); c.globalCompositeOperation="lighter"; for(let b=0;b<3;b++){ const rr=R*(1.4-b*.35)*(k<IMP?1.2-ch*.2:1), rot=now*(5+b*2)+b*2; c.strokeStyle=`rgba(${b?"150,255,210":"120,230,255"},${.55*fade})`; c.lineWidth=10-b*2; c.beginPath(); c.arc(0,0,rr,rot,rot+TAU*.7); c.stroke() } c.restore(); shock("170,255,230",1.4) }
    else { const H=420*ez(Math.min(1,k*2.2)); c.save(); c.globalCompositeOperation="lighter"; for(let i=0;i<22;i++){ const u=i/21, yy=-u*H, rw=40+u*u*R*.9, rot=now*9+u*7; c.strokeStyle=`rgba(${190+u*60|0},255,${230},${(.22+.25*(1-u))*fade})`; c.lineWidth=4+u*6; c.beginPath(); c.ellipse(0,yy,rw,rw*.28,0,rot,rot+TAU*.55); c.stroke() }
      for(let i=0;i<18;i++){ const ph=(now*1.2+rnd(i))%1, a=now*7+rnd(i+5)*TAU, rw=40+ph*R*.8; c.fillStyle=`rgba(150,255,170,${(1-ph)*fade})`; c.save(); c.translate(Math.cos(a)*rw,-ph*H+Math.sin(a)*rw*.28); c.rotate(a); c.fillRect(-7,-2.5,14,5); c.restore() } c.restore() } }
  else if(C==="mage"){ /* 불꽃: 불기둥이 치솟아요 */
    if(layer===0){ c.save(); c.scale(1,.5); c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(255,140,40,${.8*fade})`; c.lineWidth=5; c.beginPath(); c.arc(0,0,R*.8,now*2,now*2+TAU); c.stroke(); for(let i=0;i<12;i++){ const a=i/12*TAU+now*2; c.beginPath(); c.moveTo(Math.cos(a)*R*.8,Math.sin(a)*R*.8); c.lineTo(Math.cos(a+.6)*R*.55,Math.sin(a+.6)*R*.55); c.stroke() }
      if(af>0){ const rr=R*1.5*ez(af); const g=c.createRadialGradient(0,0,rr*.6,0,0,rr); g.addColorStop(0,"rgba(255,90,20,0)"); g.addColorStop(.8,`rgba(255,120,30,${.6*(1-af)})`); g.addColorStop(1,"rgba(255,200,80,0)"); c.fillStyle=g; c.beginPath(); c.arc(0,0,rr,0,TAU); c.fill() } c.restore(); charge("255,150,50") }
    else if(af>0){ const H=520, w=110*(1-af*.5), a=fade*(af<.15?af/.15:1); c.save(); c.globalCompositeOperation="lighter"; const g=c.createLinearGradient(0,-H,0,0); g.addColorStop(0,"rgba(255,90,20,0)"); g.addColorStop(.5,`rgba(255,140,40,${.45*a})`); g.addColorStop(1,`rgba(255,230,140,${.6*a})`); c.fillStyle=g; c.beginPath(); c.moveTo(-w,0); c.quadraticCurveTo(-w*.4,-H*.5,-w*.2+Math.sin(now*20)*10,-H); c.lineTo(w*.2,-H); c.quadraticCurveTo(w*.4,-H*.5,w,0); c.closePath(); c.fill();
      for(let i=0;i<24;i++){ const ph=(now*1.5+rnd(i))%1, px=(rnd(i+3)-.5)*w*2*(1-ph*.5), py=-ph*H; glowDot(px,py,6,"255,180,60",(1-ph)*a) } c.restore() } }
  else if(C==="pirate"){ /* 바다: 소용돌이 + 물기둥 */
    if(layer===0){ c.save(); c.scale(1,.45); c.globalCompositeOperation="lighter"; for(let i=0;i<4;i++){ const rr=R*(1.3-i*.25), rot=-now*(4+i)+i; c.strokeStyle=`rgba(${80+i*30},${180+i*15},255,${.55*fade})`; c.lineWidth=12-i*2; c.beginPath(); c.arc(0,0,rr,rot,rot+TAU*.75); c.stroke() } c.restore(); shock("140,220,255",1.4) }
    else if(af>0){ const H=380*ez(Math.min(1,af*2.5))*(af<.7?1:1-(af-.7)/.3*.6); c.save(); c.globalCompositeOperation="lighter"; const g=c.createLinearGradient(0,-H,0,0); g.addColorStop(0,"rgba(220,250,255,.75)"); g.addColorStop(1,"rgba(40,150,255,.5)"); c.globalAlpha=fade*.8; c.fillStyle=g; c.beginPath(); c.moveTo(-90,0); c.bezierCurveTo(-70,-H*.6,-40,-H,0,-H); c.bezierCurveTo(40,-H,70,-H*.6,90,0); c.closePath(); c.fill();
      for(let i=0;i<20;i++){ const a=-Math.PI/2+(rnd(i)-.5)*2.4, sp=200+rnd(i+7)*260, q=af, px=Math.cos(a)*sp*q, py=-H*.8+Math.sin(a)*sp*q+q*q*500; glowDot(px,py,8,"170,230,255",.9*(1-q)) } c.restore() } }
  else if(C==="healer"){ /* 달빛: 거대한 달 마법진 + 빛기둥 */
    if(layer===0){ c.save(); c.scale(1,.5); c.globalCompositeOperation="lighter"; const s=ez(ch); for(const [rr,sp,lw] of [[R*1.1,1,4],[R*.85,-1.6,3],[R*.55,2.4,2]]){ c.save(); c.rotate(now*sp*.6); c.strokeStyle=`rgba(220,210,255,${.8*fade})`; c.lineWidth=lw; c.beginPath(); c.arc(0,0,rr*s,0,TAU); c.stroke(); for(let i=0;i<24;i++){ const a=i/24*TAU; c.beginPath(); c.moveTo(Math.cos(a)*rr*s,Math.sin(a)*rr*s); c.lineTo(Math.cos(a)*(rr*s-10),Math.sin(a)*(rr*s-10)); c.stroke() } c.restore() }
      c.fillStyle=`rgba(240,235,255,${.5*fade})`; c.beginPath(); c.arc(0,0,R*.35*s,0,TAU); c.fill(); c.globalCompositeOperation="destination-out"; c.beginPath(); c.arc(R*.12*s,-R*.06*s,R*.3*s,0,TAU); c.fill(); c.restore(); shock("230,220,255",1.3) }
    else if(af>0){ c.save(); c.globalCompositeOperation="lighter"; const a=fade*(af<.12?af/.12:1), w=90; const g=c.createLinearGradient(-w,0,w,0); g.addColorStop(0,"rgba(200,190,255,0)"); g.addColorStop(.5,`rgba(250,248,255,${.55*a})`); g.addColorStop(1,"rgba(200,190,255,0)"); c.fillStyle=g; c.fillRect(-w,-900,w*2,900);
      for(let i=0;i<4;i++){ const rot=now*3+i*TAU/4, rr=R*.75; c.strokeStyle=`rgba(235,225,255,${.6*a})`; c.lineWidth=5; c.beginPath(); c.ellipse(0,-40,rr,rr*.45,0,rot,rot+1.1); c.stroke() } for(let i=0;i<16;i++){ const ph=(now*.8+rnd(i))%1; glowDot((rnd(i+9)-.5)*w*2,-ph*500,5,"255,255,255",(1-ph)*a) } c.restore() } }
  else if(C==="thief"){ /* 쇠별: 거대한 표창이 모여들어 X자로 베어요 */
    if(layer===0){ shock("255,70,90",1.2); if(af>0){ c.save(); c.scale(1,.5); c.fillStyle=`rgba(40,0,8,${.4*fade})`; c.beginPath(); c.arc(0,0,R*.9,0,TAU); c.fill(); c.restore() } }
    else { c.save(); c.globalCompositeOperation="lighter"; if(k<IMP+.05){ for(let i=0;i<6;i++){ const a=i/6*TAU+.3, d=R*2*(1-ez(Math.min(1,k/IMP))), px=Math.cos(a)*d, py=Math.sin(a)*d*.6-40; c.save(); c.translate(px,py); c.rotate(now*25); c.fillStyle="rgba(255,90,110,.95)"; c.beginPath(); for(let j=0;j<4;j++){ const b=j*TAU/4; c.lineTo(Math.cos(b)*34,Math.sin(b)*34); c.lineTo(Math.cos(b+.785)*9,Math.sin(b+.785)*9) } c.closePath(); c.fill(); c.restore() } }
      if(af>0){ const q=ez(Math.min(1,af*3)), L=R*1.6*q, a=fade*(1-Math.max(0,af-.5)*2); for(const [ang,dl] of [[.6,0],[-.6,.08],[0,.16],[Math.PI/2,.22]]){ if(af<dl) continue; c.save(); c.translate(0,-40); c.rotate(ang); const g=c.createLinearGradient(-L,0,L,0); g.addColorStop(0,"rgba(255,40,60,0)"); g.addColorStop(.5,`rgba(255,200,205,${.9*a})`); g.addColorStop(1,"rgba(255,40,60,0)"); c.fillStyle=g; c.fillRect(-L,-5,L*2,10); c.restore() } } c.restore() } }
  else if(C==="calli"){ /* 먹: 붓이 휘두른 원(일원상) + 먹물 획 */
    if(layer===0){ c.save(); c.scale(1,.55); const s=ez(ch); c.lineCap="round"; for(let i=0;i<40;i++){ const u=i/40; if(u>s) break; const a=-Math.PI/2+u*TAU*.92, w=6+22*Math.sin(u*Math.PI); c.fillStyle=`rgba(12,8,20,${.75*fade})`; c.beginPath(); c.arc(Math.cos(a)*R,Math.sin(a)*R,w,0,TAU); c.fill() }
      if(af>0) for(let i=0;i<10;i++){ const a=rnd(i)*TAU, d=R*(.3+rnd(i+4)*.9)*ez(af*2), r=8+rnd(i+8)*20; c.fillStyle=`rgba(10,6,18,${.6*fade})`; c.beginPath(); c.arc(Math.cos(a)*d,Math.sin(a)*d,r,0,TAU); c.fill() } c.restore() }
    else if(af>0){ c.save(); c.lineCap="round"; for(const [x0,y0,x1,y1,dl] of [[-R,-160,R,40,0],[R*.9,-200,-R*.8,20,.1],[-R*.7,-40,R*.8,-120,.2]]){ const q=ez(Math.min(1,(af-dl)*4)); if(q<=0) continue; const px=x0+(x1-x0)*q, py=y0+(y1-y0)*q; c.strokeStyle=`rgba(8,4,16,${.7*fade})`; c.lineWidth=20; c.beginPath(); c.moveTo(x0,y0); c.lineTo(px,py); c.stroke(); c.strokeStyle=`rgba(255,205,90,${.5*fade})`; c.lineWidth=4; c.globalCompositeOperation="lighter"; c.beginPath(); c.moveTo(x0,y0); c.lineTo(px,py); c.stroke(); c.globalCompositeOperation="source-over" } c.restore() } }
  else if(C==="zodiac"){ /* 십이지: 열두 띠 바퀴 + 청룡이 휘감아 올라요 */
    if(layer===0){ const Z=["🐭","🐮","🐯","🐰","🐲","🐍","🐴","🐑","🐵","🐔","🐶","🐷"]; c.save(); c.scale(1,.5); c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(120,190,255,${.7*fade})`; c.lineWidth=4; c.beginPath(); c.arc(0,0,R*1.05,0,TAU); c.stroke(); c.lineWidth=2; c.beginPath(); c.arc(0,0,R*.8,0,TAU); c.stroke(); c.restore();
      c.save(); c.font="26px sans-serif"; c.textAlign="center"; c.textBaseline="middle"; c.globalAlpha=fade; for(let i=0;i<12;i++){ if(i/12>ch*1.05) break; const a=i/12*TAU+now*.8; c.fillText(Z[i],Math.cos(a)*R*.93,Math.sin(a)*R*.93*.5) } c.restore(); shock("120,190,255",1.3) }
    else if(af>0){ c.save(); c.globalCompositeOperation="lighter"; const n=34, H=440; for(let i=n-1;i>=0;i--){ const u=i/n, q=Math.min(1,af*1.8); if(u>q) continue; const a=u*TAU*2.2+now*3, rr=R*.75*(1-u*.4), px=Math.cos(a)*rr, py=Math.sin(a)*rr*.35-u*H, s=(22-u*12)*(i===Math.floor(q*n)-1?1.5:1); glowDot(px,py,s*1.6,"90,170,255",.45*fade); c.fillStyle=`rgba(${150+u*80|0},${210+u*30|0},255,${.75*fade})`; c.beginPath(); c.arc(px,py,s*.55,0,TAU); c.fill() } c.restore() } }
  else { /* 메카닉 등: 조준 → 하늘에서 레이저 폭격 */
    if(layer===0){ c.save(); c.scale(1,.5); c.globalCompositeOperation="lighter"; c.strokeStyle=`rgba(90,255,230,${.8*fade})`; c.lineWidth=3; const s=R*(1.3-ch*.45); c.beginPath(); c.arc(0,0,s,0,TAU); c.stroke(); for(let i=0;i<4;i++){ const a=i*Math.PI/2+now; c.beginPath(); c.moveTo(Math.cos(a)*(s+20),Math.sin(a)*(s+20)); c.lineTo(Math.cos(a)*(s-30),Math.sin(a)*(s-30)); c.stroke() }
      if(af>0){ for(let i=0;i<6;i++){ const a=i/6*TAU, rr=R*.7*ez(af*2); c.beginPath(); for(let j=0;j<6;j++){ const b=j/6*TAU; c.lineTo(Math.cos(a)*rr+Math.cos(b)*30,Math.sin(a)*rr+Math.sin(b)*30) } c.closePath(); c.strokeStyle=`rgba(90,255,230,${.6*(1-af)})`; c.stroke() } } c.restore(); shock("120,255,240",1.3) }
    else { c.save(); c.globalCompositeOperation="lighter"; if(k<IMP){ for(let i=0;i<5;i++){ const q=ez(ch), sx=(rnd(i)-.5)*600, px=sx*(1-q), py=-700*(1-q)-40; c.strokeStyle="rgba(255,220,140,.9)"; c.lineWidth=4; c.beginPath(); c.moveTo(px,py); c.lineTo(px-sx*.08,py-60); c.stroke(); glowDot(px,py,14,"255,200,120",.9) } }
      if(af>0){ const a=fade*(af<.1?af/.1:1), w=70*(1-af*.4); const g=c.createLinearGradient(-w,0,w,0); g.addColorStop(0,"rgba(80,255,230,0)"); g.addColorStop(.5,`rgba(230,255,255,${.75*a})`); g.addColorStop(1,"rgba(80,255,230,0)"); c.fillStyle=g; c.fillRect(-w,-900,w*2,900); for(let i=0;i<6;i++){ const ph=(af*3+i/6)%1; glowDot((rnd(i)-.5)*R*1.4,(rnd(i+3)-.5)*R*.6-20,40*ph+10,"255,200,120",(1-ph)*a*.8) } } c.restore() } }
  c.restore() }
