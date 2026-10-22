/* ===== 소리: 효과음 + 배경음악 (파일 없이 브라우저가 직접 만들어요) ===== */
const SND = (()=>{
  let ac=null, master, sfxBus, musBus, noiseBuf, last={};
  function init(){
    if(ac) return ac; const C=window.AudioContext||window.webkitAudioContext; if(!C) return null;
    try{ ac=new C() }catch(e){ return null }
    const comp=ac.createDynamicsCompressor(); comp.threshold.value=-16; comp.knee.value=12; comp.ratio.value=5; comp.attack.value=.003; comp.release.value=.2;
    master=ac.createGain(); master.gain.value=.9; master.connect(comp).connect(ac.destination);
    sfxBus=ac.createGain(); sfxBus.gain.value=.6; sfxBus.connect(master);
    musBus=ac.createGain(); musBus.gain.value=.2; musBus.connect(master);
    const dl=ac.createDelay(1), fb=ac.createGain(), wet=ac.createGain(); dl.delayTime.value=.27; fb.gain.value=.3; wet.gain.value=.3;
    musBus.connect(dl); dl.connect(fb).connect(dl); dl.connect(wet).connect(master);
    noiseBuf=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate); const d=noiseBuf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
    return ac;
  }
  function unlock(){ const a=init(); if(a&&a.state==="suspended") a.resume() }
  ["pointerdown","touchstart","keydown"].forEach(ev=>window.addEventListener(ev,unlock,{passive:true,capture:true}));
  const now=()=>ac.currentTime+.006;
  function env(g,at,a,v,d){ g.gain.setValueAtTime(.0001,at); g.gain.linearRampToValueAtTime(v,at+a); g.gain.exponentialRampToValueAtTime(.0001,at+a+d) }
  /* 소리 재료 */
  function tone(o){
    const at=now()+(o.at||0), osc=ac.createOscillator(), g=ac.createGain(), A=o.a||.004;
    osc.type=o.type||"square"; osc.frequency.setValueAtTime(o.f,at); if(o.f2) osc.frequency.exponentialRampToValueAtTime(Math.max(20,o.f2),at+(o.sl||o.d)); if(o.det) osc.detune.value=o.det;
    let node=osc; if(o.lp){ const f=ac.createBiquadFilter(); f.type="lowpass"; f.frequency.setValueAtTime(o.lp,at); if(o.lp2) f.frequency.exponentialRampToValueAtTime(o.lp2,at+o.d); f.Q.value=o.q||.7; node.connect(f); node=f }
    if(o.vib){ const l=ac.createOscillator(), lg=ac.createGain(); l.frequency.value=o.vib; lg.gain.value=o.vibd||8; l.connect(lg).connect(osc.frequency); l.start(at); l.stop(at+A+o.d+.1) }
    env(g,at,A,o.v||.2,o.d); node.connect(g).connect(o.bus||sfxBus); osc.start(at); osc.stop(at+A+o.d+.06);
  }
  function noise(o){
    const at=now()+(o.at||0), s=ac.createBufferSource(), A=o.a||.002; s.buffer=noiseBuf; s.loop=true;
    const fl=ac.createBiquadFilter(); fl.type=o.type||"lowpass"; fl.frequency.setValueAtTime(o.f||2000,at); if(o.f2) fl.frequency.exponentialRampToValueAtTime(o.f2,at+A+o.d); fl.Q.value=o.q||.8;
    const g=ac.createGain(); env(g,at,A,o.v||.2,o.d); s.connect(fl).connect(g).connect(o.bus||sfxBus); s.start(at,Math.random()*1.5); s.stop(at+A+o.d+.06);
  }
  const arp=(fs,step,o)=>fs.forEach((f,i)=>tone(Object.assign({f,at:(o.at||0)+i*step},o,{at:(o.at||0)+i*step})));
  const boom=(v,at=0,low=1)=>{ tone({f:140*low,f2:34,d:.5,type:"sine",v:v,at}); noise({f:1400,f2:120,d:.55,v:v*.8,at}); noise({type:"bandpass",f:400,d:.25,v:v*.3,q:.6,at}) };
  const swish=(v,at=0,hi=1)=>noise({type:"bandpass",f:700*hi,f2:3800*hi,d:.13,v,q:1.4,a:.02,at});
  const zap=(f,f2,d,v,at=0,type="sawtooth")=>tone({f,f2,d,v,type,at,lp:3000});

  let gemN=0, gemT=0;
  const LIB={
    /* 화면 */
    tap:()=>{ tone({f:1250,f2:900,d:.035,type:"triangle",v:.12}); tone({f:2500,d:.02,type:"sine",v:.04}) },
    flip:()=>{ noise({type:"highpass",f:1500,f2:5000,d:.09,v:.12,a:.02}); tone({f:700,f2:1100,d:.06,type:"sine",v:.06}) },
    ok:()=>{ arp([784,1047,1319],.065,{d:.12,type:"square",v:.07,lp:4000}); arp([1568,2093],.065,{d:.2,type:"sine",v:.05,at:.13}) },
    no:()=>{ tone({f:311,f2:220,d:.16,type:"sawtooth",v:.12,lp:1200}); tone({f:233,f2:147,d:.24,type:"square",v:.08,lp:900,at:.12}) },
    coin:()=>{ tone({f:1319,d:.05,type:"square",v:.08,lp:5000}); tone({f:1976,d:.22,type:"square",v:.08,lp:5000,at:.055}); tone({f:3951,d:.18,type:"sine",v:.03,at:.06}) },
    win:()=>{ arp([523,659,784,1047],.085,{d:.14,type:"square",v:.08,lp:4000}); arp([262,330,392,523],.085,{d:.14,type:"triangle",v:.1}); tone({f:1047,d:.5,type:"square",v:.07,lp:3000,at:.34,vib:6,vibd:10}); tone({f:1319,d:.5,type:"sine",v:.05,at:.34}) },
    lvup:()=>{ arp([523,659,784,1047,1319,1568],.045,{d:.1,type:"square",v:.07,lp:5000}); for(let i=0;i<6;i++) tone({f:2000+i*400,d:.08,type:"sine",v:.03,at:.25+i*.04}) },
    pick:()=>{ tone({f:880,f2:1760,d:.12,type:"triangle",v:.12}); noise({type:"highpass",f:4000,d:.25,v:.05,at:.05}); arp([1319,1760,2637],.05,{d:.14,type:"sine",v:.05,at:.08}) },
    jobup:()=>{ arp([392,523,659,784],.11,{d:.2,type:"square",v:.08,lp:3500}); arp([196,262,330,392],.11,{d:.2,type:"triangle",v:.12});
      [523,659,784,1047].forEach(f=>tone({f,d:1.1,type:"sawtooth",v:.035,lp:2600,at:.46,det:(Math.random()-.5)*14,vib:5,vibd:5}));
      boom(.25,.46,.8); for(let i=0;i<10;i++) tone({f:1800+Math.random()*2400,d:.1,type:"sine",v:.03,at:.5+i*.06}) },
    unlock:()=>{ for(let i=0;i<8;i++) tone({f:880*Math.pow(2,i/7),d:.15,type:"sine",v:.05,at:i*.05}); tone({f:1760,d:.6,type:"triangle",v:.06,at:.4,vib:7}) },
    stamp:()=>{ tone({f:180,f2:60,d:.18,type:"sine",v:.3}); noise({f:900,f2:200,d:.12,v:.18}) },
    stroke:()=>{ tone({f:520+Math.random()*120,d:.06,type:"triangle",v:.07}) },
    /* 게임 */
    start:()=>{ arp([392,523,659,784,1047],.07,{d:.12,type:"square",v:.07,lp:4000}); boom(.18,.32,.9) },
    gem:()=>{ const t=ac.currentTime; gemN=t-gemT<.35?Math.min(gemN+1,18):0; gemT=t; tone({f:880*Math.pow(2,gemN/12),d:.05,type:"sine",v:.05}); tone({f:1760*Math.pow(2,gemN/12),d:.03,type:"triangle",v:.02}) },
    hit:()=>{ noise({type:"bandpass",f:1600+Math.random()*800,d:.045,v:.07,q:1.2}); tone({f:300,f2:160,d:.04,type:"square",v:.03,lp:1500}) },
    crit:()=>{ tone({f:2400,f2:1800,d:.12,type:"square",v:.05,lp:6000}); noise({type:"highpass",f:3000,d:.06,v:.08}) },
    kill:()=>{ tone({f:700+Math.random()*200,f2:110,d:.09,type:"square",v:.06,lp:2400}); noise({f:2500,f2:400,d:.07,v:.06}) },
    hurt:()=>{ tone({f:220,f2:80,d:.2,type:"sawtooth",v:.16,lp:900}); noise({f:900,f2:150,d:.14,v:.16}) },
    heal:()=>{ arp([659,880,1175,1568],.06,{d:.18,type:"sine",v:.08}); tone({f:2093,d:.3,type:"triangle",v:.03,at:.25,vib:8}) },
    chest:()=>{ tone({f:160,f2:90,d:.12,type:"square",v:.12,lp:800}); noise({f:600,d:.08,v:.12}); arp([1047,1319,1568,2093,2637],.05,{d:.15,type:"sine",v:.06,at:.12}) },
    boss:()=>{ [55,82.4,110].forEach((f,i)=>tone({f,d:1.5,type:"sawtooth",v:.09,lp:300,lp2:1400,a:.2,det:i*6})); boom(.35,0,.6); boom(.3,.5,.6); boom(.35,1.0,.5) },
    bosscast:()=>{ noise({type:"bandpass",f:300,f2:2400,d:.5,v:.15,a:.15,q:2}); tone({f:110,f2:220,d:.5,type:"sawtooth",v:.08,lp:800,a:.1}) },
    enrage:()=>{ noise({f:300,f2:2200,d:.6,v:.25,a:.05}); tone({f:90,f2:60,d:.8,type:"sawtooth",v:.14,lp:600,vib:18,vibd:20}) },
    alarm:()=>{ for(let i=0;i<3;i++){ tone({f:880,d:.12,type:"square",v:.07,lp:3000,at:i*.3}); tone({f:660,d:.12,type:"square",v:.07,lp:3000,at:i*.3+.15}) } },
    die:()=>{ arp([523,415,330,262,196],.16,{d:.22,type:"triangle",v:.12}); tone({f:131,f2:65,d:1,type:"sawtooth",v:.06,lp:600,at:.8}) },
    revive:()=>{ arp([262,330,392,523,659,784,1047],.06,{d:.2,type:"triangle",v:.1}); tone({f:1047,d:.8,type:"sine",v:.07,at:.42,vib:6}) },
    lava:()=>{ noise({type:"highpass",f:2500,d:.18,v:.08}); tone({f:200,f2:120,d:.12,type:"sawtooth",v:.04,lp:700}) },
    boom:()=>boom(.22),
    bigboom:()=>{ boom(.4,0,.8); noise({f:500,f2:60,d:1.1,v:.15,a:.05}) },
    /* 기본 공격 */
    sword:()=>{ swish(.16); tone({f:1900,f2:1500,d:.08,type:"triangle",v:.03,at:.03}) },
    arrow:()=>{ tone({f:330,f2:180,d:.1,type:"triangle",v:.1}); tone({f:1200,f2:600,d:.03,type:"square",v:.03,lp:3000}); swish(.05,.02,1.4) },
    star:()=>{ swish(.08,0,1.6); tone({f:2600,f2:3200,d:.05,type:"sine",v:.04}) },
    gun:()=>{ noise({f:4000,f2:300,d:.09,v:.18}); tone({f:180,f2:60,d:.07,type:"square",v:.07,lp:1500}) },
    fireball:()=>{ noise({f:300,f2:2000,d:.22,v:.12,a:.05}); tone({f:120,f2:260,d:.2,type:"sawtooth",v:.05,lp:900}) },
    /* 전사 */
    multislash:()=>{ for(let i=0;i<3;i++){ swish(.22,i*.15,.8); tone({f:2200,f2:1700,d:.12,type:"triangle",v:.04,at:i*.15+.03}); tone({f:160,f2:90,d:.08,type:"square",v:.05,lp:800,at:i*.15+.04}) } },
    quake:()=>{ boom(.45,0,.7); noise({f:300,f2:60,d:1.0,v:.2,a:.02}); tone({f:60,f2:30,d:.9,type:"sine",v:.3,at:.05}) },
    awaken:()=>{ [440,554,659,880].forEach((f,i)=>tone({f,d:1.4,type:"sawtooth",v:.04,lp:800,lp2:4000,a:.25,det:(i-1.5)*8,vib:5,vibd:4}));
      noise({type:"highpass",f:2000,f2:8000,d:1.0,v:.08,a:.3}); swish(.3,.3,.6); boom(.3,.35,.9); arp([1760,2217,2637,3520],.07,{d:.25,type:"sine",v:.04,at:.4}) },
    multislash1:()=>{ swish(.22,0,.7); tone({f:2400,f2:1600,d:.14,type:"triangle",v:.04}) },
    cutin:()=>{ noise({type:"bandpass",f:400,f2:5000,d:.35,v:.18,a:.05,q:1.2}); tone({f:220,f2:880,d:.3,type:"sawtooth",v:.06,lp:2500}); arp([1047,1568,2093],.05,{d:.25,type:"square",v:.04,lp:5000,at:.25}); tone({f:65,f2:45,d:.5,type:"sine",v:.25,at:.25}) },
    /* 궁수 */
    rain:()=>{ for(let i=0;i<14;i++) noise({type:"bandpass",f:2500+Math.random()*2000,d:.04,v:.05,q:2,at:i*.07+Math.random()*.04}); swish(.12,0,1.2) },
    hurricane:()=>{ noise({type:"bandpass",f:600,f2:2600,d:1.2,v:.12,a:.2,q:1.5}); for(let i=0;i<20;i++) tone({f:1100,f2:700,d:.03,type:"square",v:.025,lp:3000,at:.1+i*.05}) },
    phoenix:()=>{ tone({f:1200,f2:2400,d:.25,type:"sawtooth",v:.05,lp:3500,vib:30,vibd:60}); noise({f:500,f2:2500,d:.3,v:.1,a:.05}) },
    /* 도적 */
    marks:()=>{ arp([1568,1175,1568,2349],.05,{d:.12,type:"triangle",v:.05}); tone({f:220,f2:110,d:.4,type:"sawtooth",v:.05,lp:700}) },
    markpop:()=>{ tone({f:500,f2:90,d:.14,type:"square",v:.07,lp:1800}); noise({type:"highpass",f:2500,d:.08,v:.08}); tone({f:2800,d:.06,type:"sine",v:.04,at:.03}) },
    flare:()=>{ tone({f:110,d:.9,type:"sawtooth",v:.07,lp:500,lp2:1800,a:.1,vib:9,vibd:14}); noise({type:"bandpass",f:400,f2:1800,d:.8,v:.1,a:.2,q:3}); tone({f:2093,d:.3,type:"sine",v:.04,at:.2}) },
    /* 마법사 */
    mist:()=>{ noise({f:600,f2:1600,d:.7,v:.1,a:.2}); for(let i=0;i<7;i++) tone({f:300+Math.random()*500,f2:600+Math.random()*600,d:.06,type:"sine",v:.05,at:.1+i*.08}) },
    meteor:()=>{ tone({f:1600,f2:250,d:.45,type:"sine",v:.05}); noise({type:"bandpass",f:3000,f2:400,d:.45,v:.06,q:2}) },
    ifrit:()=>{ noise({f:400,f2:1400,d:.3,v:.1,a:.04}); tone({f:90,f2:70,d:.3,type:"sawtooth",v:.06,lp:500}) },
    /* 해적 */
    turret:()=>{ tone({f:400,f2:160,d:.15,type:"sine",v:.14}); noise({type:"highpass",f:2000,f2:600,d:.25,v:.08,at:.1}); tone({f:800,d:.05,type:"square",v:.04,lp:2000,at:.28}); tone({f:1200,d:.05,type:"square",v:.04,lp:2000,at:.34}) },
    cannon:()=>{ noise({f:1800,f2:150,d:.18,v:.14}); tone({f:130,f2:50,d:.14,type:"sine",v:.14}) },
    ship:()=>{ noise({type:"bandpass",f:200,f2:3000,d:.45,v:.2,a:.3,q:2}); [73,110,147].forEach((f,i)=>tone({f,f2:f*1.5,d:.8,type:"sawtooth",v:.07,lp:500,lp2:3000,a:.25,det:i*7}));
      boom(.35,.35,.7); noise({f:3000,f2:200,d:1.3,v:.22,a:.02,at:.35}); tone({f:55,f2:40,d:1.2,type:"sine",v:.3,at:.35}); swish(.25,.6,.5); swish(.2,.9,.4) },
  };
  const GAP={hit:.045,kill:.035,gem:.03,crit:.08,boom:.06,hurt:.12,cannon:.05,markpop:.05,sword:.06,arrow:.05,star:.05,gun:.05,fireball:.08,phoenix:.25,ifrit:.25,lava:.4,stroke:.05,tap:.07,meteor:.08};
  function play(name){
    if(typeof P==="undefined"||!P||(P.set&&P.set.sfx===false)) return;
    const a=init(); if(!a||a.state!=="running"&&name!=="tap") { if(a&&a.state==="suspended") a.resume(); if(!a||a.state!=="running") return }
    const t=a.currentTime, gp=GAP[name]||.03; if(last[name]&&t-last[name]<gp) return; last[name]=t;
    const fn=LIB[name]; if(fn) try{ fn() }catch(e){}
  }

  /* ===== 배경음악: 맵마다 다른 칩튠 ===== */
  const N=m=>440*Math.pow(2,(m-69)/12);
  const TR={
    home:{bpm:100, ch:[[60,64,67],[55,59,62],[57,60,64],[53,57,60]], lead:"triangle", bass:"triangle", drum:1, seed:3, sw:0},
    m1:{bpm:116, ch:[[65,69,72],[70,74,77],[72,76,79],[65,69,72]], lead:"square", bass:"triangle", drum:2, seed:11},
    m2:{bpm:94,  ch:[[67,71,74],[65,69,72],[60,64,67],[62,66,69]], lead:"sine", vib:1, bass:"triangle", drum:1, seed:21},
    m3:{bpm:108, ch:[[57,60,64],[53,57,60],[55,59,62],[52,55,59]], lead:"square", bass:"triangle", drum:2, seed:31},
    m4:{bpm:84,  ch:[[62,65,69],[58,62,65],[60,64,67],[57,61,64]], lead:"sine", vib:1, bass:"sawtooth", drum:1, seed:41, dark:1},
    m5:{bpm:138, ch:[[52,55,59],[53,57,60],[52,55,59],[50,53,57]], lead:"sawtooth", bass:"sawtooth", drum:3, seed:51, dark:1},
    m6:{bpm:132, ch:[[57,61,64],[62,66,69],[59,62,66],[64,68,71]], lead:"square", vib:1, bass:"sawtooth", drum:3, seed:61},
    m7:{bpm:120, ch:[[60,64,67],[65,69,72],[67,71,74],[64,67,71]], lead:"triangle", bass:"sawtooth", drum:2, seed:71},
    m8:{bpm:104, ch:[[62,66,69],[59,62,66],[57,61,64],[64,67,71]], lead:"sine", vib:1, bass:"triangle", drum:1, seed:81},
    m9:{bpm:126, ch:[[60,64,67],[62,65,69],[65,69,72],[67,71,74]], lead:"square", bass:"sawtooth", drum:3, seed:91},
    m10:{bpm:140, ch:[[57,60,64],[53,57,60],[55,58,62],[52,55,59]], lead:"sawtooth", vib:1, bass:"sawtooth", drum:3, seed:101, dark:1},
  };
  function mkMelody(T){ let r=T.seed*9301+49297; const rnd=()=>((r=(r*9301+49297)%233280)/233280);
    const RH=[[1,0,0,1,0,0,1,0,1,0,1,0,0,0,1,0],[1,0,1,0,1,0,0,0,1,0,1,1,1,0,0,0],[1,0,0,0,1,0,1,0,1,0,0,1,0,1,0,0],[1,1,0,1,0,0,1,0,0,0,1,0,1,0,1,0]];
    const mel=[]; let prev=T.ch[0][2]+12;
    for(let b=0;b<8;b++){ const ch=T.ch[b%4], rh=RH[(rnd()*4)|0], tones=[...ch.map(x=>x+12),...ch.map(x=>x+24)].filter(x=>x<=88);
      for(let s=0;s<16;s++){ if(!rh[s]){ mel.push(null); continue }
        let best=tones[0], bd=1e9; tones.forEach(x=>{ const d=Math.abs(x-prev)+rnd()*7; if(d<bd){bd=d;best=x} }); if(rnd()<.25) best+=rnd()<.5?2:-1; prev=best; mel.push(best) } }
    return mel }
  let cur=null, timer=0, nextT=0, step=0, intensity=0;
  function sched(){
    if(!cur||!ac) return; const T=cur, sd=60/T.bpm/4;
    while(nextT<ac.currentTime+.15){
      const at=nextT-ac.currentTime, s=step%16, bar=Math.floor(step/16)%8, ch=T.ch[bar%4], B={bus:musBus};
      const ld=T.mel[step%128]; if(ld) tone(Object.assign({f:N(ld),d:sd*1.6,type:T.lead,v:T.lead==="sine"?.07:T.lead==="sawtooth"?.025:.035,at,lp:T.lead==="sine"?0:2600},T.vib?{vib:5,vibd:4}:{},B));
      if(s%4===0||(T.drum>=2&&s%4===2&&intensity)) tone(Object.assign({f:N(ch[0]-24+(s===8&&!T.dark?7:0)),d:sd*(T.dark?3.5:1.8),type:T.bass,v:T.bass==="sawtooth"?.05:.11,at,lp:T.bass==="sawtooth"?600:0},B));
      if(T.drum>=2&&s%2===1) tone(Object.assign({f:N(ch[0]-12),d:sd*.8,type:T.bass,v:.04,at,lp:500},B));
      if(s===0) ch.forEach(m=>tone(Object.assign({f:N(m),d:sd*14,type:"triangle",v:.02,at,a:.2},B)));
      if(s%8===0||(T.drum>=2&&s===10)||(T.drum>=3&&s%4===0)) { tone(Object.assign({f:150,f2:40,d:.16,type:"sine",v:.22,at},B)) }
      if((s===4||s===12)&&T.drum>=1) noise(Object.assign({type:"bandpass",f:1800,d:.12,v:T.drum>=2?.08:.04,q:.8,at},B));
      if(T.drum>=2&&s%2===0||T.drum===1&&s%4===2) noise(Object.assign({type:"highpass",f:7000,d:.03,v:.025,at},B));
      if(intensity&&s%2===1&&T.drum>=1) noise(Object.assign({type:"bandpass",f:2600,d:.05,v:.035,q:1,at},B));
      nextT+=sd; step++;
    }
  }
  function bgm(name){
    const want=(typeof P!=="undefined"&&P&&P.set&&P.set.bgm===false)?null:name;
    if(!want){ cur=null; clearInterval(timer); timer=0; return }
    const a=init(); if(!a) return;
    if(cur&&cur.name===want) return;
    const T=TR[want]; if(!T) return; if(!T.mel) T.mel=mkMelody(T); T.name=want; cur=T; step=0; nextT=a.currentTime+.1; intensity=0;
    if(!timer) timer=setInterval(sched,30);
  }
  function setIntensity(v){ intensity=v?1:0 }
  document.addEventListener("visibilitychange",()=>{ if(!ac) return; if(document.hidden) ac.suspend(); else ac.resume().then(()=>{ nextT=ac.currentTime+.05 }) });
  return {play,bgm,setIntensity,get cur(){return cur&&cur.name}};
})();
function sfx(t){ SND.play(t) }
