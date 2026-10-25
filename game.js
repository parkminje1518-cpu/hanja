/* ===== 몬스터 대작전 ===== */
const CONF_V=.03, CONF_MAX=2, CONF_T=25;   /* 혼란: 단계마다 공격력 -3% · 받는 피해 +3% · 대기 시간 +3% */
const BOSS_VIS = 1.3;
const BOSS_DY = .4;   /* 보스 몸 판정은 그림 몸통 가운데 (발보다 조금 위) */   /* 보스 그림 크기 배율 (몸 판정·패턴 크기는 그대로) */
const WIN_TIME = 300;   // (예전 5분 버티기 · 이제는 보스 4마리를 잡으면 클리어)
/* 스테이지 단계: 오래 버틸수록 맵이 바뀌고 몬스터가 강해져요 */
const PHASE_T = [0,100,200];
/* 단계: 보스를 잡을 때마다 올라가요 (0=1단계, 1=2단계, 2=3단계, 3=최종 결전) */
let STAGE_PH = 0;
const phaseOf = ()=>STAGE_PH;
let VPH=0, VPH_T=0;   // 분위기(날씨) 단계: 보스가 나타날 때마다 올라가요
const phV = ph=>Math.min(2,ph);   // 그림(색·이름)은 3단계까지
const PH_MUL = [{hp:1,dmg:1,sp:1,elite:0},{hp:1.3,dmg:1.15,sp:1.06,elite:.03},{hp:1.65,dmg:1.35,sp:1.12,elite:.06},{hp:2,dmg:1.5,sp:1.16,elite:.08}];
const PH_NAME = {1:["햇살 꽃밭","노을 꽃밭","별빛 꽃밭"],2:["바람 숲길","폭풍 숲길","안개 숲길"],3:["노을 유적","황혼 유적","저주받은 유적"],4:["어둠 동굴","수정 심층부","끝없는 심연"],5:["어둠의 마왕성","불타는 마왕성","마왕의 옥좌"],6:["용오름 첨탑","폭풍의 첨탑","천둥 회오리"],7:["하늘 성","노을 성벽","전쟁의 하늘 성"],8:["천공 빙궁","눈보라 빙궁","오로라 폭풍"],9:["천상 신전","천둥의 신전","신의 심판장"],10:["별의 왕좌","붉은 성운","종언의 블랙홀"],11:["검귀의 결투장","검귀의 결투장","검귀의 결투장"]};
const PH_TINT = {1:[null,"255,130,60,.20","25,20,80,.38"],2:[null,"60,70,110,.28","200,210,220,.22"],3:[null,"200,60,40,.22","60,10,70,.38"],4:[null,"40,160,200,.18","10,0,25,.45"],5:[null,"255,80,20,.22","90,0,20,.40"],6:[null,"30,50,110,.22","20,10,60,.36"],7:[null,"255,150,70,.18","90,20,50,.30"],8:[null,"200,230,255,.22","60,160,140,.22"],9:[null,"120,80,200,.18","60,20,90,.32"],10:[null,"200,40,90,.16","10,0,30,.40"],11:[null,null,null]};
const PH_AURA = [null,"255,140,40","170,90,255","255,60,90"];
/* 게임 코인: 30초 버틸 때마다 + 끝까지 버티면 승리 보너스 (어려운 맵일수록 많이) */
const TIME_COIN = {1:3,2:5,3:6,4:9,5:12,6:14,7:16,8:18,9:20,10:22,11:26};   // 30초마다
const WIN_COIN  = {1:10,2:20,3:30,4:45,5:60,6:70,7:80,8:90,9:100,10:120,11:150};
/* 스테이지 보상: 잡은 보스(별)마다 코인 · 클리어 보너스 · 처음 클리어 보너스 */
const MAP_F = {1:1,2:1.4,3:1.8,4:2.4,5:3,6:3.6,7:4.2,8:4.8,9:5.4,10:6.2,11:7.2};
const STAR_COIN = [10,15,22,0];
const starCoin = (mapId,tier)=>Math.round(STAR_COIN[tier]*(MAP_F[mapId]||1));
const clearCoin = mapId=>Math.round(45*(MAP_F[mapId]||1));
const firstClearCoin = mapId=>Math.round(60*(MAP_F[mapId]||1));
/* ===== 맵 도전 단계: 보통 → 어려움 → 지옥 (어려움부터는 내 용사 레벨에 맞춰 몬스터가 세져요) ===== */
const DIFS=[{n:"보통",c:"#3fcf8e",d:"맵 원래 세기"},{n:"어려움",c:"#f6a23a",d:"내 용사 레벨에 맞춰 세져요"},{n:"지옥",c:"#e9475f",d:"내 레벨보다 더 세게! 보상도 가장 커요"}];
/* 군단장 보스 맵(11단계~)은 이지 · 노멀 · 하드로 불러요 (보스 체력 ×1 · ×1.5 · ×2, 노멀부터 예고가 조금 짧아요) */
const BDIFS=[{n:"이지",c:"#3fcf8e"},{n:"노멀",c:"#f6a23a"},{n:"하드",c:"#e9475f"}];
const dN=(d,mid)=>((mid>=11?BDIFS:DIFS)[d||0]||DIFS[0]).n;
const HP_BY_LV=[[1,.6],[5,.9],[20,1.35],[45,2.1],[75,3.2],[80,3.6],[85,4.1],[90,4.7],[95,5.4],[100,6.4]];
const hpForLv=L=>{ let a=HP_BY_LV[0]; for(const b of HP_BY_LV){ if(L<=b[0]){ const t=(L-a[0])/Math.max(1,b[0]-a[0]); return a[1]+(b[1]-a[1])*Math.max(0,t) } a=b } return a[1] };
/* 난이도 (레벨에 맞춰): 어려움 ≈ 내 레벨에 맞는 가장 높은 맵의 '보통' · 지옥 = 그보다 1.5배(1단계)~1.35배(10단계)
   → 4차 레벨 100이면 1단계 어려움도 10단계 보통처럼 단단해요. 높은 단계 지옥은 배율을 줄여 4학년도 도전할 만하게 */
function difMap(m,dif,L){ if(!dif) return Object.assign({},m,{dif:0}); const HX=1.5-.15*Math.min(1,Math.max(0,(m.id-1)/9)), K=dif===1?1:HX;
  const hp=Math.max(m.hp*(dif===1?1.15:HX),hpForLv(L)*.93*K)*1.35;   /* 2026-10-24 상향: 어려움 · 지옥 모두 +35% */
  // 보스도 레벨이 비슷한 맵의 보스만큼 튼튼하게 (어려움 70%, 지옥 95%)
  const fin=id=>{ const L2=typeof STAGE_LOOKS!=="undefined"&&STAGE_LOOKS[id]; const B=L2&&BOSSES[L2[3]]; return B||{hp:1,dmg:1} }, eq=MAPS.filter(x=>x.lv<=L).pop()||m, A=fin(m.id), E=fin(eq.id);
  // 보스: 내 레벨에 맞는 맵 보스의 '보통' 세기 × (어려움 1 · 지옥 HX)에 정확히 맞춰요 (맵 체력 배율 차이까지 보정)
  const dmOf=h=>1+(h-1)*.35, tgt=Math.max(eq.hp||m.hp,m.hp)*K, bossX=Math.max(1,(E.hp/A.hp)*tgt/hp), bossDmgX=Math.max(1,(E.dmg/A.dmg)*dmOf(tgt)/dmOf(hp));
  return Object.assign({},m,{hp0:m.hp,hp,spawn:m.spawn*(dif===1?1.1:1.2),dmgX:dif===1?1.1:1.2,bossX,bossDmgX:bossDmgX*(dif===1?1.08:1.15),exp:m.exp*Math.max(1.3,hp/m.hp)*(dif===2?1.15:1),dif}) }
/* 단계 열기: 같은 맵의 앞 단계를 깨거나, 앞 맵을 그 단계 이상으로 깨면 열려요 (지옥으로 깨면 다음 맵 보통·어려움·지옥이 다 열려요) */
const difUnlocked=(id,dif)=>dif===0||(typeof isAdmin==="function"&&isAdmin())||(dif===1?!!((P.cleared||{})[id]):((P.clearD||{})[id]||0)>=2)||(id>1&&id!==11&&((P.clearD||{})[id-1]||0)>=dif+1);
const difCoinX=d=>[1,1.6,2.2][d||0];
const mapDif=id=>{ const d=((P.set.difs||{})[id])||0; return difUnlocked(id,d)?d:0 };
/* 맵마다 도전 훈장 3개 */
const MEDALS=[["🏆","어려움 클리어","어려움이나 지옥 단계에서 보스 4마리를 모두 물리치기"],["✨","패턴 완벽 회피","보스 고유 패턴에 한 번도 맞지 않고 그 보스 물리치기"],["📜","문제 박사","한 판에서 문제를 8개 이상 맞히고 정답률 80% 넘기기"]];
const MEDAL_MILE=[[5,"새내기 탐험가",200],[10,"용감한 탐험가",300],[15,"노련한 탐험가",400],[20,"전설의 탐험가",500],[25,"지혜의 영웅",600],[30,"탐험대장",800]];
/* ===== 맵 열쇠 · 보스 카드 ===== */
const mapOpenN=()=>Math.max(1,P.mapOpen||1);
const mapOpened=id=>(typeof isAdmin==="function"&&isAdmin())||id<=mapOpenN();
function ensureMapLock(){ if(P.lockV) return; P.lockV=1; P.mapOpen=1; if(!(typeof isAdmin==="function"&&isAdmin())) P.set.map=1; saveP() }   // 처음 한 번: 모든 맵을 잠그고 1단계부터
const CARD_TIER=["","동","은","금"], CARD_COL=["","#c98a4a","#cfd8e8","#ffd36a"];
/* 맵마다 보스 카드 4장을 모으면 계정 능력치 (모든 직업 · 동 1배 · 은 2배 · 금 3배) */
const CARD_BONUS={1:["hp",.02,"최대 체력"],2:["spd",.02,"이동 속도"],3:["armor",.02,"받는 피해 줄이기"],4:["xp",.03,"경험치"],5:["dmg",.02,"공격력"],6:["cd",.02,"공격 속도"],7:["mag",.06,"줍는 거리"],8:["armor",.02,"받는 피해 줄이기"],9:["crit",.01,"급소 확률"],10:["dmg",.02,"공격력"]};
const mapCardKeys=id=>[0,1,2,3].map(i=>"st"+id+"_"+i);
const mapCardLv=id=>Math.min(...mapCardKeys(id).map(k=>((P.bcard||{})[k])||0));
/* 명예 카드: 그 직업으로 마지막 맵(별의 왕좌)을 깨면 받아요. 모든 직업에 그 직업다운 보너스 (보통 1배 · 어려움 2배 · 지옥 3배) */
const HONOR_BONUS={warrior:["hp",.03,"최대 체력"],archer:["cd",.02,"공격 속도"],thief:["crit",.01,"급소 확률"],mage:["dmg",.02,"공격력"],pirate:["mag",.06,"줍는 거리"],healer:["armor",.02,"받는 피해 줄이기"],calli:["xp",.03,"경험치"],zodiac:["spd",.02,"이동 속도"],mech:["hp",.02,"최대 체력"]};
function honorHtml(id){ const L=(P.honor||{})[id]||0, H=heroById(id), B=HONOR_BONUS[id]||[];
  return `<div class="bcard hon ${L?"t"+L:"none"}"><div class="bcin">${L?avaHtml(id,92):`<span class="bq">?</span>`}</div><b>${L?esc(H.name):"???"}</b><small>${L?`${CARD_TIER[L]} 명예 · ${B[2]} +${+(B[1]*L*100).toFixed(1)}%`:`${esc(H.name)}(으)로 별의 왕좌를 깨면`}</small></div>` }
function cardBonusSum(){ const S={}; for(const id in CARD_BONUS){ const L=mapCardLv(+id); if(L>0){ const [k,v]=CARD_BONUS[id]; S[k]=(S[k]||0)+v*L } } for(const id in (P.honor||{})){ const B=HONOR_BONUS[id], L=P.honor[id]; if(B&&L){ S[B[0]]=(S[B[0]]||0)+B[1]*L } } return S }
/* ===== 한자 룬: 익힌 한자(3번 이상 맞힘)를 용사마다 새겨서 힘으로 만들어요 =====
   등급은 맞힌 횟수로 정해져요: 동 3 · 은 10 · 금 25 · 빛나는 금 50 (틀려도 내려가지 않아요) */
const ENG_T={bdmg:"大氣反魔軍毒酷",ied:"無入開消滅貫散亂",dmg:"炎爆强拳打破勇暴奪火力熱彈裂犧",hp:"體活藥充人心全自根復",armor:"天地石岩固守防備鐵封盾巖禁寒凍霧束",spd:"風速快進移急流登通翼",cd:"時電現起計雷光",xp:"學記問答聞探寫解",mag:"金貝引捕合協",regen:"水氷雨安愛林花木綠樂淨治雲",crit:"目見映角切影暗黑異"};   /* 시즌 2 한자도 뜻에 맞게 넣었어요 · 보공(魔軍毒酷) · 방무(滅貫散亂)는 아주 조금씩 */   /* 숨은 조합의 두 한자는 같은 칸에 있어요 */
const ENG_V={bdmg:.012,ied:.012,dmg:.03,hp:.05,armor:.02,spd:.03,cd:.03,xp:.04,mag:.08,regen:.002,crit:.02};
const ENG_CAP={bdmg:.15,ied:.12,dmg:.2,hp:.3,armor:.15,spd:.15,cd:.15,xp:.3,mag:.4,regen:.012,crit:.1};
const ENG_NAME={bdmg:"보스 공격력",ied:"방어율 무시",dmg:"공격력",hp:"최대 체력",armor:"받는 피해",spd:"이동 속도",cd:"공격 속도",xp:"경험치",mag:"줍는 거리",regen:"1초마다 체력 회복",crit:"급소 확률"};
const ENG_COMBO=[["石","岩","반석",{armor:.1}],["風","速","질풍",{spd:.08}],["木","林","숲의 가호",{regen:.004}],["時","現","시간의 틈",{cd:.06}],["天","地","천지의 힘",{dmg:.06}],["水","氷","얼음 물결",{armor:.04,dmg:.03}],["學","問","학문의 길",{xp:.15}],["勇","强","용맹",{dmg:.05,hp:.05}],["大","氣","큰 기운",{bdmg:.04}],["無","消","무방비",{ied:.04}],["消","滅","소멸",{ied:.04}],["暗","黑","암흑",{crit:.04}],["復","活","부활",{hp:.06,regen:.002}]];
/* 숨은 조합 힌트 (수수께끼): 아직 못 찾은 조합은 힌트만 보여 줘요 */
const ENG_HINT=["돌이 커지면 무엇이 될까요? 작은 돌과 큰 돌을 함께!","바람처럼 빠르게! 바람과 '빠를' 한자를 함께","나무가 여럿 모이면 무엇이 될까요?","때가 되면 나타나요. '때'와 '나타날' 한자를 함께","하늘과 땅이 만나면 세상 모든 힘이!","물이 차가워지면 무엇이 될까요?","배우고 묻는 것이 공부의 길이에요","용기 있고 강한 용사!","큰 것에 기운을 더하면 보스도 겁내요! '큰'과 '기운'을 함께","없어지고 사라지면 방어도 소용없어요! '없을'과 '사라질'을 함께","사라지고 다해서 아무것도 남지 않아요! '사라질'과 '다할'을 함께","어둡고 검은 그림자 속에서 급소를 노려요! '어두울'과 '검을'을 함께","다시 살아나요! '다시'와 '살'을 함께"];
const ENG_GR=[["",""],["동","#c88a4a"],["은","#c8d2e0"],["금","#ffd36a"],["빛나는 금","#fff3a0"]];
function engLv(h){ if(typeof isAdmin==="function"&&isAdmin()) return 4;   /* 선생님 모드: 모든 한자를 빛나는 금으로 새겨 볼 수 있어요 */
  const m=(P.mastery||{})[h]||0; return m>=ENG_STEP[3]?4:m>=ENG_STEP[2]?3:m>=ENG_STEP[1]?2:m>=ENG_STEP[0]?1:0 }
const ENG_STEP=[3,8,15,25];   /* 동 · 은 · 금 · 빛나는 금 (2개월 일정에 맞춰 당겼어요: 원래 3·10·25·50) */
function engType(h){ for(const k in ENG_T) if(ENG_T[k].includes(h)) return [k,1]; return [["dmg","hp","armor","spd"][h.charCodeAt(0)%4],.5] }   /* 표에 없는 한자도 작은 힘을 줘요 */
function engVal(h){ const [k,f]=engType(h); return [k,ENG_V[k]*f*engLv(h)] }
function engSlots(id){ return HS(id).tier>=5||(typeof isAdmin==="function"&&isAdmin())?5:HS(id).tier>=4?4:3 }
function engOf(id){ P.eng=P.eng||{}; return (P.eng[id]||[]).filter(h=>engLv(h)>0).slice(0,engSlots(id)) }
function engCombos(list){ return ENG_COMBO.filter(c=>list.includes(c[0])&&list.includes(c[1])) }
/* 직업마다 추천 각인 효과 (추천 효과로 새기면 10% 더 세져요) */
const ENG_REC={warrior:["armor","hp","石岩固體","石+岩 반석"],archer:["cd","spd","時電風速","風+速 질풍"],thief:["crit","dmg","目見炎强","—"],mage:["dmg","cd","炎爆天地","天+地 천지의 힘"],pirate:["cd","dmg","時電炎拳","—"],healer:["regen","hp","水林木體","木+林 숲의 가호"],calli:["dmg","cd","炎强時現","時+現 시간의 틈"],zodiac:["cd","xp","時電學問","學+問 학문의 길"],mech:["dmg","armor","勇强石固","勇+强 용맹"]};
const ENG_NM={bdmg:"보스 공격력",ied:"방어율 무시",dmg:"공격력",hp:"최대 체력",armor:"받는 피해 감소",spd:"이동 속도",cd:"공격 속도",regen:"체력 회복",crit:"급소",xp:"경험치",mag:"줍는 거리"};
const engRecOf=id=>ENG_REC[id]||["dmg","hp","",""], isRec=(id,k)=>engRecOf(id).slice(0,2).includes(k);
/* ===== 보스 공격력 · 방어율 무시 (메이플 공식) =====
   보스에게 주는 피해 = 피해 × (1 + 보공) × (1 − 보스 방어율 × (1 − 방무))  · 방무는 곱으로 쌓여요 · 최소 10%는 들어가요 */
const BOSS_DEF={11:.8,12:1.2}, BOSS_DEF_DIF=[0,.2,.4];
function bossDefOf(mid,dif){ const b=BOSS_DEF[mid]||0; return b?b+(BOSS_DEF_DIF[dif||0]||0):0 }
function bossStats(id){ const S=HS(id), E=engraveBonus(id), K2=know2Power(); const dg=STAT.dmg*(S.dmg||0), bd=STAT.bd*(S.bd||0)+(E.bdmg||0)+K2.bd, ied=1-Math.pow(1-STAT.ied,S.ied||0)*(1-(E.ied||0))*(1-K2.ied); return {dg,bd,ied} }
function bossMul(def,ied){ return def>0?Math.max(.1,1-def*(1-ied)):1 }
/* 능력치 효율: 지금 상태에서 한 칸 찍으면 용사 힘이 얼마나 오르는지 (메이플식: 공격% · (1+데미지%+보공%) · 방무) */
const STAT_KEYS=["hp","atk","dmg","spd","bd","ied"];
function statCap(S,k){ return k==="spd"?STAT.spdMax:(k==="bd"||k==="ied")?((S.lv||1)>=STAT.bLv?STAT.bMax:0):1e9 }
/* ⭐ 효율 = 그 칸을 찍었을 때 전투력이 얼마나 오르나 (전투력 공식 그대로) × 성향 가중치
   성향 가중치와 최소 비율은 임시 숫자: 11·12번째 보스 밸런스 때 시뮬레이션으로 맞출 예정 */
const STAT_STYLE={atk:{n:"⚔ 공격형",w:{atk:1.25,dmg:1.25,bd:1.25,ied:1.25,hp:.7,spd:.9},min:{spd:.1,hp:.1}},bal:{n:"⚖ 균형형",w:{},min:{spd:.15,hp:.2}},def:{n:"🛡 생존형",w:{atk:.85,dmg:.85,bd:.85,ied:.85,hp:1.5,spd:1.2},min:{spd:.2,hp:.35}}};
const statStyle=()=>STAT_STYLE[(P.set&&P.set.sstyle)||"bal"]||STAT_STYLE.bal;
function statScore(id,S,bref){ const p=heroPower(id,{S}); if(!bref) return p; const B=String(bref).split("-").map(Number), DEF=bossDefOf(B[0],B[1]); if((S.lv||1)<STAT.bLv) return p;
  const E=engraveBonus(id), dg=STAT.dmg*(S.dmg||0), bd=STAT.bd*(S.bd||0)+(E.bdmg||0), ied=1-Math.pow(1-STAT.ied,S.ied||0)*(1-(E.ied||0));
  if(!DEF) return p/Math.pow((1+dg+bd)/(1+dg)*(1-.4*(1-ied))/.6,.8);   /* 보스 방어율이 없는 맵: 보공·방무는 보스에게만 조금 도움 */
  return p*Math.pow((1+dg+bd)/(1+dg)*bossMul(DEF,ied)/((1-.4*(1-ied))/.6),.7) }   /* 보스 방어율이 있는 맵은 그 보스 기준으로 */
function statGains(id,S,bref,raw){ const b=statScore(id,S,bref), G={}, W=raw?{}:statStyle().w; for(const k of STAT_KEYS){ const room=statCap(S,k)-(S[k]||0); if(room<=0){ G[k]=0; continue } let best=0; for(const st of [1,10,30]){ const n=Math.min(st,room), T=Object.assign({},S); T[k]=(T[k]||0)+n; best=Math.max(best,Math.pow(statScore(id,T,bref)/b,1/n)-1) } G[k]=best*(W[k]||1) } return G }
function statAuto(id,S,bref,n){ let used=0; const tot=STAT_KEYS.reduce((a,k)=>a+(S[k]||0),0)+n, MN=statStyle().min;
  for(const k of ["spd","hp"]){ const want=Math.min(statCap(S,k),Math.round(tot*(MN[k]||0))); while(used<n&&(S[k]||0)<want){ S[k]=(S[k]||0)+1; used++ } }
  while(used<n){ const G=statGains(id,S,bref); let bk=null, bv=0; for(const k in G) if(G[k]>bv){ bv=G[k]; bk=k } if(!bk) break; const step=Math.min(n-used,Math.max(1,Math.floor((n-used)/40))); const add=Math.max(0,Math.min(step,statCap(S,bk)-(S[bk]||0))); if(!add){ G[bk]=0; break } S[bk]=(S[bk]||0)+add; used+=add } return used }   /* 고침: 찍은 만큼만 포인트를 써요 (예전엔 보공·방무가 꽉 찰 때 포인트가 새로 생겼어요) */
function engraveBonus(id,list){ const L=list||engOf(id), S={}; for(const h of L){ const [k,v0]=engVal(h), v=v0*(isRec(id,k)?1.1:1); S[k]=(S[k]||0)+v } for(const c of engCombos(L)) for(const k in c[3]) S[k]=(S[k]||0)+c[3][k]; for(const k in S) S[k]=Math.min(S[k],ENG_CAP[k]||1); return S }
/* ===== 한자 룬: 효과마다 보석 색 · 등급은 반짝임 (흐린 원석 → 맑은 보석 → 빛나는 보석 → 전설 보석) ===== */
const RUNE_C={dmg:"#ff3b4e",hp:"#ff6fae",armor:"#3a7dff",spd:"#ffc928",cd:"#26d4ff",regen:"#34d27a",crit:"#e9f2ff",xp:"#ff9a2e",mag:"#2ee0c0",bdmg:"#b44dff",ied:"#7a5cff"};
const RUNE_N={dmg:"루비",hp:"로즈",armor:"사파이어",spd:"토파즈",cd:"아쿠아",regen:"에메랄드",crit:"다이아",xp:"앰버",mag:"터키석",bdmg:"자수정",ied:"바이올렛"};
const RUNE_G=["","원석","보석","빛나는 보석","전설 보석"];
function hexMix(a,b,t){ const p=x=>[1,3,5].map(i=>parseInt(x.slice(i,i+2),16)); const A=p(a),B=p(b); return "#"+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,"0")).join("") }
/* 룬 보석 그림 (원석 · 보석 · 빛나는 보석 · 전설 보석 · 빈 소켓): 테두리는 그림, 한자와 효과 색은 코드로 얹어요 */
const RUNE_IMG=(()=>{ const F=typeof SKILL_ART_FILES!=="undefined"?SKILL_ART_FILES:{}; if(!F.rune1) return null; try{ const S=document.documentElement.style; for(let i=0;i<=4;i++) if(F["rune"+i]) S.setProperty("--rimg"+i,`url(${F["rune"+i]})`) }catch(e){} return F })();
function runeHtml(h,cls,extra){ const lv=engLv(h), k=engType(h)[0], c=RUNE_C[k]||"#c0c0c0"; return `<span class="rune g${lv} ${RUNE_IMG?"img":""} ${cls||""}" style="--r1:${hexMix(c,"#ffffff",.55)};--r2:${c};--r3:${hexMix(c,"#000000",.55)};--rg:${c};--rimg:var(--rimg${Math.max(1,Math.min(4,lv))})" title="${esc(engInfo(h).hun+" "+engInfo(h).eum)} · ${RUNE_N[k]||"룬"} ${RUNE_G[lv]||""}"><span class="rgem"><b>${h}</b></span>${extra||""}</span>` }
function engFmt(k,v){ return k==="regen"?`${ENG_NAME[k]} ${+(v*100).toFixed(1)}%`:`${ENG_NAME[k]} ${k==="armor"?"-":"+"}${+(v*100).toFixed(1)}%` }
function engInfo(h){ return UNIQUE.find(c=>c.h===h)||{h,hun:"",eum:""} }
function engHtml(id){ const L=engOf(id), n=engSlots(id), S=engraveBonus(id), cb=engCombos(L);
  const RS=new Set(cb.flatMap(c=>[c[0],c[1]]));
  return `<div class="engBar"><b>💎 한자 룬</b><div class="engSlots runeSlots ${cb.length?"resOn":""}">${Array.from({length:n},(_,i)=>{ const h=L[i]; if(!h) return `<span class="sock empty"></span>`; return `<span class="sock">${runeHtml(h,RS.has(h)?"res":"")}</span>` }).join("")}</div>
    <span class="engSum">${Object.keys(S).length?Object.entries(S).map(([k,v])=>engFmt(k,v)).join(" · "):"익힌 한자를 룬으로 박으면 용사가 세져요"}${cb.length?` · <em class="resTxt">✨ 룬 공명 ${cb.map(c=>c[2]).join(" · ")}</em>`:""}</span><button class="btn ghost" id="engBtn">룬 박기</button></div>` }
function engraveUI(back){ const id=P.hero, n=engSlots(id); P.eng=P.eng||{}; let cur=engOf(id).slice();
  const learned=UNIQUE.filter(c=>engLv(c.h)>0).sort((a,b)=>engLv(b.h)-engLv(a.h)||((P.mastery[b.h]||0)-(P.mastery[a.h]||0)));
  const draw=()=>{ const cb=engCombos(cur);
    mcard.className="mcard engm"; mcard.innerHTML=`<div class="engHd"><h3>🔖 ${esc(heroById(id).name)}의 한자 룬 (${cur.length}/${n})</h3><span class="engPow">⚔ ${fmtPow(heroPower(id,{eng:engOf(id)}))} → <b>${fmtPow(heroPower(id,{eng:cur.filter(h=>engLv(h)>0)}))}</b></span><button class="helpQ" data-help="룬" aria-label="룬 도움말">?</button></div><div class="engTop"><button class="btn gold" id="engAutoT">⭐ 추천대로 박기</button><button class="btn red" id="engOkT">💎 룬 박기</button><button class="btn ghost" id="engNoT">닫기</button></div>
      ${(()=>{ const R=engRecOf(id); return `<div class="engRec">⭐ <b>${esc(heroById(id).name)} 추천</b>: ${ENG_NM[R[0]]} · ${ENG_NM[R[1]]} <small>(추천 효과는 10% 더 세져요)</small><span class="erH">예) ${[...R[2]].join(" ")}${R[3]&&R[3]!=="—"?` · 조합 ${R[3]}`:""}</span><button class="btn gold" id="engAuto">⭐ 추천대로 박기</button></div>` })()}
      <details class="engHow" ${(P.eng&&Object.keys(P.eng).length)?"":"open"}><summary>❓ 한자 룬이 뭐예요? (눌러서 보기)</summary>
        <div class="ehSteps"><div><i>1</i><b>외우기</b><span>학습하기에서 한자를 <b>3번</b> 맞히면 아래 목록에 나타나요</span></div><div><i>2</i><b>박기</b><span>목록의 한자를 눌러 위 <b>${n}칸</b> 소켓에 넣고 '룬 박기'를 눌러요${HS(id).tier>=4?"":" (4차 전직하면 4칸)"}</span></div><div><i>3</i><b>세지기</b><span>게임에서 그 한자의 <b>뜻에 맞는 힘</b>이 생겨요 (炎 불꽃 → 공격력)</span></div></div>
        <div class="ehLad"><span style="--c:#b8a8c8">원석<small>3번 · ×1</small></span>➜<span style="--c:#8ad0ff">보석<small>8번 · ×2</small></span>➜<span style="--c:#ffd36a">빛나는 보석<small>15번 · ×3</small></span>➜<span style="--c:#fff3a0">전설 보석<small>25번 · ×4</small></span></div>
        <p class="ehEx">예) 炎(불꽃 염): 동이면 공격력 +3%, 빛나는 금이면 +12%! 많이 맞힐수록 같은 한자가 더 세져요. 틀려도 등급은 내려가지 않아요.<br>같은 효과끼리 칸으로 모여 있어요. 어울리는 두 한자를 함께 새기면 <b>숨은 조합</b>이 더해져요.${isAdmin()?"<br><b>선생님 모드</b>: 모든 한자가 빛나는 금으로 보여요 (학생은 맞힌 횟수대로).":""}</p></details>
      <div class="engSlots big runeSlots ${cb.length?"resOn":""}">${(()=>{ const RS=new Set(cb.flatMap(c=>[c[0],c[1]])); return Array.from({length:n},(_,i)=>{ const h=cur[i]; if(!h) return `<span class="sock big empty ${RUNE_IMG?"img":""}"><small>빈 소켓</small></span>`; const [k,v]=engVal(h); return `<button class="sock big" data-rm="${i}">${runeHtml(h,RS.has(h)?"res":"")}<small>${RUNE_G[engLv(h)]} · ${engFmt(k,v)}</small><i>✕</i></button>` }).join("") })()}</div>
      ${cb.length?`<p class="engCombo resTxt">✨ 룬 공명 발동! ${cb.map(c=>`<b>${c[0]}+${c[1]} ${c[2]}</b> (${Object.entries(c[3]).map(([k,v])=>engFmt(k,v)).join(", ")})`).join(" · ")}</p>`:""}
      <details class="engHints"><summary>🔍 룬 공명 (숨은 조합) ${(P.engFound||[]).length} / ${ENG_COMBO.length} 찾음 · 힌트 보기</summary>${(()=>{ const card=(c,k)=>{ const f=(P.engFound||[]).includes(c[2]), ok=engLv(c[0])>0&&engLv(c[1])>0;
        return f?`<span class="eh found"><b>${c[0]}+${c[1]}</b> ${c[2]}<small>${Object.entries(c[3]).map(([k2,v])=>engFmt(k2,v)).join(", ")}</small></span>`:`<span class="eh"><b>❓</b> ${ENG_HINT[k]}<em class="ehRw">🎁 ${Object.entries(c[3]).map(([k2,v])=>engFmt(k2,v)).join(" · ")}</em>${ok?`<small class="rdy">✔ 두 한자를 이미 익혔어요! 찾아서 함께 박아 봐요</small>`:`<small>${engLv(c[0])>0||engLv(c[1])>0?"한 글자는 이미 익혔어요":"아직 익히지 않은 한자예요"}</small>`}</span>`  }, NM={dmg:"⚔ 공격력",armor:"🛡 받는 피해 감소",spd:"👟 이동 속도",cd:"⚡ 공격 속도",regen:"🌿 체력 회복",xp:"📖 경험치",hp:"❤ 최대 체력",crit:"🎯 급소",bdmg:"👑 보스 공격력",ied:"🛡 방어율 무시"}, ORD=["dmg","hp","armor","spd","cd","regen","xp","crit","bdmg","ied"], G={};
        ENG_COMBO.forEach((c,k)=>{ const t=Object.keys(c[3])[0]; (G[t]=G[t]||[]).push([c,k]) });
        return ORD.filter(t=>G[t]).map(t=>`<div class="ehGrp"><b>${NM[t]}</b><div>${G[t].map(([c,k])=>card(c,k)).join("")}</div></div>`).join("") })()}</details>
      <div class="engList">${learned.length?(()=>{ const ci=h=>{ const k=ENG_COMBO.findIndex(c=>c[0]===h||c[1]===h); return k<0?99:k }, grp={}; learned.forEach(c=>{ const k=engType(c.h); (grp[k[1]<1?"etc":k[0]]=grp[k[1]<1?"etc":k[0]]||[]).push(c) });
        const ORD=["dmg","hp","armor","spd","cd","regen","crit","xp","mag","bdmg","ied","etc"], NM={bdmg:"👑 보스 공격력 (아주 조금)",ied:"🛡 방어율 무시 (아주 조금)",dmg:"⚔ 공격력",hp:"❤ 최대 체력",armor:"🛡 받는 피해 감소",spd:"👟 이동 속도",cd:"⚡ 공격 속도",regen:"🌿 체력 회복",crit:"🎯 급소",xp:"📖 경험치",mag:"🧲 줍는 거리",etc:"✦ 그 밖의 한자 (작은 힘)"};
        const RC=engRecOf(id); ORD.sort((x,y)=>(isRec(id,y)?1:0)-(isRec(id,x)?1:0));
        return ORD.filter(k=>grp[k]).map(k=>`<div class="engGrp ${isRec(id,k)?"rec":""}"><b>${NM[k]}${isRec(id,k)?' <em class="recB">⭐ 추천</em>':""}</b><div class="engGL">${grp[k].sort((a,b)=>ci(a.h)-ci(b.h)||engLv(b.h)-engLv(a.h)).map(c=>{ const g=ENG_GR[engLv(c.h)], [k2,v]=engVal(c.h), on=cur.includes(c.h); return `<button class="engH ${on?"on":""}" data-h="${c.h}">${runeHtml(c.h,"sm")}<span class="ei">${esc(c.hun)} ${esc(c.eum)}</span><small>${RUNE_G[engLv(c.h)]} · ${engFmt(k2,v)}</small></button>` }).join("")}</div></div>`).join("") })():`<p class="muted">아직 익힌 한자가 없어요. 학습하기에서 한자를 3번 이상 맞혀 봐요!</p>`}</div>
      <div class="gbtns"><button class="big red" id="engOk">룬 박기</button><button class="big alt" id="engNo">닫기</button></div>`;
    mcard.querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>{ sfx("tap"); cur.splice(+b.dataset.rm,1); draw() });
    mcard.querySelectorAll("[data-h]").forEach(b=>b.onclick=()=>{ const h=b.dataset.h; if(cur.includes(h)) cur=cur.filter(x=>x!==h); else if(cur.length<n) cur.push(h); else { toast(`룬 소켓이 가득 찼어요. 위에서 하나를 빼고 넣어요`); return } sfx("tap"); draw() });
    { const ab=document.getElementById("engAuto"); if(ab) ab.onclick=()=>{ const R=engRecOf(id), sc=h=>{ const [k,v]=engVal(h); return v*(isRec(id,k)?1.1:1)*(isRec(id,k)?3:1)+([...R[2]].includes(h)?.5:0) };
      let pick=learned.map(c=>c.h).sort((a,b)=>sc(b)-sc(a)).slice(0,n); const cm=ENG_COMBO.find(c=>R[3]&&R[3].startsWith(c[0]+"+"+c[1])); if(cm&&engLv(cm[0])>0&&engLv(cm[1])>0&&!(pick.includes(cm[0])&&pick.includes(cm[1]))){ pick=[cm[0],cm[1],...pick.filter(h=>h!==cm[0]&&h!==cm[1])].slice(0,n) }
      if(!pick.length){ toast("아직 익힌 한자가 없어요. 학습하기에서 3번 이상 맞혀 봐요!"); return } cur=pick; sfx("pick"); draw() } }
    { const t=(a,b)=>{ const x=document.getElementById(a), y=document.getElementById(b); if(x&&y) x.onclick=()=>y.onclick() }; setTimeout(()=>{ t("engAutoT","engAuto"); t("engOkT","engOk"); t("engNoT","engNo") },0) }
    document.getElementById("engNo").onclick=()=>{ modal.hidden=true; back&&back() };
    document.getElementById("engOk").onclick=()=>{ const before=engCombos(engOf(id)).map(c=>c[2]); P.eng[id]=cur.slice(); P.engFound=P.engFound||[]; const nw=engCombos(cur).filter(c=>!P.engFound.includes(c[2])); nw.forEach(c=>P.engFound.push(c[2])); saveP(); sfx(nw.length?"win":"pick"); modal.hidden=true;
      if(nw.length) toast(`✨ 새로운 한자 조합 발견! ${nw.map(c=>c[0]+"+"+c[1]+" "+c[2]).join(", ")}`); else toast("한자를 새겼어요!"); back&&back() } };
  draw(); modal.hidden=false }
const bonusTxt=(id,L)=>{ const [k,v,n]=CARD_BONUS[id]; return `${n} ${k==="armor"?"-":"+"}${+(v*100*Math.max(1,L)).toFixed(1)}%` };
function bossArtSrc(bid){ const B=BOSSES[bid]||{}, F=typeof BOSS_ART_FILES!=="undefined"?BOSS_ART_FILES:{}; return (F[bid]||F[B.look]||{}).src||"" }
function cardHtml(bid,lv,big){ const B=BOSSES[bid]||{}, src=bossArtSrc(bid), fin=B.tier===3;
  return `<div class="bcard ${lv?"t"+lv:"none"} ${fin?"fin":""} ${big?"big":""}"><div class="bcin">${lv?`<img src="${src}" alt="">`:`<span class="bq">?</span>`}</div><b>${lv?esc(B.name||""):"???"}</b><small>${lv?`${B.tn||""} · ${CARD_TIER[lv]} 카드`:(B.tn||"")}</small></div>` }
function keySrc(id){ return typeof SKILL_ART_FILES!=="undefined"?(SKILL_ART_FILES["key"+id]||""):"" }
/* 동·은·금 카드를 따로 모아요 (40장 × 3 = 120장). bcm: 보스마다 가진 등급 표시 */
function cardMask(){ P.bcm=P.bcm||{}; if(!P.bcmV){ for(const k in (P.bcard||{})){ const L=P.bcard[k]||0; let m=0; for(let t=1;t<=L;t++) m|=1<<(t-1); P.bcm[k]=(P.bcm[k]||0)|m } P.bcmV=1; saveP() } return P.bcm }
const hasCard=(bid,t)=>!!(cardMask()[bid]&(1<<(t-1)));
function cardCount(t){ const M=cardMask(); let n=0; for(const k in M) for(let i=1;i<=3;i++) if((!t||t===i)&&(M[k]&(1<<(i-1)))) n++; return n }
function bossCardDex(){ const T=P.set.ctier||1; $app.innerHTML = topbar("도감") + (typeof dexTabs==="function"?dexTabs("B"):"") + `
  <div class="ctabs">${[1,2,3].map(t=>`<button class="ctab ${T===t?"on":""}" data-ct="${t}" style="--cc:${CARD_COL[t]}">${CARD_TIER[t]} 카드 <small>${cardCount(t)}/40</small></button>`).join("")}<button class="ctab ${T===4?"on":""}" data-ct="4" style="--cc:#c39bff">🎖 명예 카드 <small>${Object.keys(P.honor||{}).length}/9</small></button><span class="ctot">전체 ${cardCount()}/120장</span></div>
  <section class="panel"><div class="dexHead"><span class="meta">보스를 물리치면 카드를 받아요 · 보통=동 · 어려움=은 · 지옥=금 · 한 맵의 4장을 다 모으면 모든 직업의 능력치가 올라가요</span></div>
  ${(()=>{ const S=cardBonusSum(); const t=Object.entries(S).map(([k,v])=>`${{hp:"최대 체력",spd:"이동 속도",armor:"받는 피해",xp:"경험치",dmg:"공격력",cd:"공격 속도",mag:"줍는 거리",crit:"급소 확률"}[k]} ${k==="armor"?"-":"+"}${+(v*100).toFixed(1)}%`).join(" · "); return `<p class="cardsum">🃏 지금 받는 수집 보너스: <b>${t||"아직 없어요"}</b></p>` })()}
  ${T===4?`<div class="cardmap"><div class="cmh"><b>🎖 명예 카드</b><span>그 직업으로 마지막 맵 「별의 왕좌」를 깨면 받아요 · 모든 직업에 보너스</span></div><div class="cardrow">${HEROES.map(h=>honorHtml(h.id)).join("")}</div></div>`:""}
  ${(T===4?[]:MAPS).map(m=>{ const ks=mapCardKeys(m.id), L=mapCardLv(m.id), n=ks.filter(k=>hasCard(k,T)).length;
    return `<div class="cardmap"><div class="cmh"><b>${m.id}. ${m.name}</b><span>${n}/4장 · ${L?`<em style="color:${CARD_COL[L]}">${CARD_TIER[L]} 완성!</em> `:""}${bonusTxt(m.id,L)}${L?"":" (4장 모으면)"}</span></div>
      <div class="cardrow">${ks.map(k=>cardHtml(k,hasCard(k,T)?T:0)).join("")}</div></div>` }).join("")}</section>`;
  if(typeof bindDexTabs==="function") bindDexTabs(); if(typeof bindBack==="function") bindBack();   // 메인으로 버튼
  document.querySelectorAll(".ctab").forEach(b=>b.onclick=()=>{ P.set.ctier=+b.dataset.ct; saveP(); bossCardDex() }) }
const medalsOf=id=>((P.medal||{})[id])||[0,0,0];
const medalCount=()=>Object.values(P.medal||{}).reduce((a,m)=>a+m.filter(Boolean).length,0);
const medalTitle=()=>{ let t=""; for(const [n,nm] of MEDAL_MILE) if((P.mmile||0)>=n) t=nm; return t };
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
  /* 군단장 보스 맵에서만 나와요: 보스 잡기에 도움이 되는 카드 */
  bhunt:{t:"p",boss:1,name:"군단장 사냥꾼",ic:"bhunt",em:"👑",d:()=>"이 판에서 보스에게 주는 피해가 10% 늘어요"},
  bpierce:{t:"p",boss:1,name:"갑옷 뚫기",ic:"bpierce",em:"⚔",d:()=>"이 판에서 보스 방어율을 8% 더 무시해요"},
  bguard:{t:"p",boss:1,name:"달빛 부적",ic:"bguard",em:"🌙",d:()=>"받는 피해 -6% · 암흑 게이지가 15% 덜 차요"},
};
const SK_BOSSOFF={fire:1,stone:1,ice:1,pull:1};
const skOK=(k,mid)=>mid>=11?!SK_BOSSOFF[k]:!SK[k].boss;   /* 보스 맵에서는 몬스터 무리용 카드 대신 보스용 카드가 나와요 */
/* 기술 아이콘 (그림으로 그려요) */
const SK_ICON = {};
function skIcon(k){
  if(k==="main") return SPRITE_URLS[P.hero]||"";
  { const AK={body:"ic_body",spd:"ic_spd",str:"ic_str",qi:"ic_qi",pull:"ic_pull",wind:"cardwind",fire:"cardfire",stone:"cardstone",ice:"ic_ice",elec:"ic_elec"}[k];   // 제미나이 아이콘 그림
    if(AK&&typeof SKILL_ART_FILES!=="undefined"&&SKILL_ART_FILES[AK]) return SKILL_ART_FILES[AK] }
  if(SK_ICON[k]) return SK_ICON[k];
  const cv=document.createElement("canvas"); cv.width=cv.height=64; const c=cv.getContext("2d");
  if(SK[k]&&SK[k].em){ const gr=c.createRadialGradient(32,28,6,32,32,34); gr.addColorStop(0,{bhunt:"#8a5a10",bpierce:"#5a2a8a",bguard:"#2a3a7a"}[k]||"#4a2a6a"); gr.addColorStop(1,"#120c1e"); c.fillStyle=gr; c.beginPath(); c.arc(32,32,31,0,7); c.fill(); c.strokeStyle="#ffd36a"; c.lineWidth=3; c.stroke(); c.font="34px sans-serif"; c.textAlign="center"; c.textBaseline="middle"; c.fillText(SK[k].em,32,35); return SK_ICON[k]=cv.toDataURL() }
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
/* ===== 지식의 힘(한자) · 지혜의 힘(사자성어·속담): 넓게 고르고 진짜로 외울수록 게임에서 세져요 =====
   실제 효과 = 범위 보너스 × (0.25 + 0.75 × 그 범위에서 익힌 비율) · 선생님 모드는 다 익힌 것으로 미리 보기 */
const KNOW_DMG=[0,.08,.16,.24,.32], WIS_ARM=[0,.045,.09,.135,.18], WIS_CD=[0,.03,.06,.09,.12];
function knowRatio(w){ if(typeof isAdmin==="function"&&isAdmin()) return 1; const L=qpoolOf(w); return L.length?L.filter(c=>((P.mastery||{})[c.h]||0)>=MASTER_N).length/L.length:0 }
function wisRatio(w){ if(typeof isAdmin==="function"&&isAdmin()) return 1; const L=spoolOf(w); return L.length&&typeof sayMastered==="function"?L.filter(sayMastered).length/L.length:0 }
function knowPower(qw,sw){ const qi=Math.max(0,QRANGE.findIndex(q=>q.w===qw)), si=Math.max(0,SRANGE.findIndex(q=>q.w===sw)), kr=knowRatio(qw), wr=wisRatio(sw), kf=.25+.75*kr, wf=.25+.75*wr;
  return {dmg:KNOW_DMG[qi]*kf, armor:WIS_ARM[si]*wf, cd:WIS_CD[si]*wf, kr, wr, qi, si} }
/* ===== 전투력: 레벨 · 전직 · 능력치 · 각인 · 보스 카드 · 지식/지혜의 힘을 숫자 하나로 =====
   공격(공격력×공격 속도×급소×전직) 과 버티기(체력÷받는 피해) 를 곱해 제곱근 → 직업마다 1레벨 = 1,000 */
function heroPower(id,o){ o=o||{}; id=id||P.hero; const H=heroById(id), S=o.S||HS(id), M=Object.assign({dmg:1,cd:1,armor:1,crit:0},H.mods||{}); let hp=H.hp+STAT.hp*(S.hp||0);
  (JOBS[id]?JOBS[id].skills.slice(0,S.tier||0):[]).forEach(k=>{ if(k.type==="passive"||k.ult) for(const key in k.p){ const v=k.p[key]; if(key==="hp") hp+=v; else if(key==="crit") M.crit+=v; else if(typeof M[key]==="number"&&key!=="crit") M[key]*=v } });
  M.dmg*=(1+STAT.atk*(S.atk||0))*(1+STAT.dmg*(S.dmg||0));
  const CB=o.noBonus?{}:Object.assign({},cardBonusSum()), EB=o.noBonus?{}:engraveBonus(id,o.eng), K=o.noBonus?{dmg:0,armor:0,cd:0}:o.kfull?{dmg:KNOW_DMG[Math.max(0,QRANGE.findIndex(q=>q.w===o.qw))],armor:WIS_ARM[Math.max(0,SRANGE.findIndex(q=>q.w===(o.sw!==undefined?o.sw:srangeOf().w)))],cd:WIS_CD[Math.max(0,SRANGE.findIndex(q=>q.w===(o.sw!==undefined?o.sw:srangeOf().w)))]}:knowPower(o.qw!==undefined?o.qw:(P.set.qrange||5), o.sw!==undefined?o.sw:srangeOf().w);
  const add=(k,v)=>CB[k]=(CB[k]||0)+v; for(const k in EB) if(k!=="regen"&&k!=="bdmg"&&k!=="ied") add(k,EB[k]); add("dmg",K.dmg); add("armor",K.armor); add("cd",K.cd);
  if(CB.hp) hp+=H.hp*CB.hp; if(CB.dmg) M.dmg*=1+CB.dmg; if(CB.cd) M.cd*=1-CB.cd; if(CB.armor) M.armor*=1-CB.armor; if(CB.crit) M.crit+=CB.crit;
  M.cd/=1+STAT.spd*Math.min(S.spd||0,STAT.spdMax);
  /* 메이플식: 공격% × (1 + 데미지% + 보공%) × 방무 (기준 방어율 40%) × 크리 */
  if(!o.noBonus){ const dg=STAT.dmg*(S.dmg||0), K2=typeof know2Power==="function"?know2Power():{bd:0,ied:0}, bd=STAT.bd*(S.bd||0)+(EB.bdmg||0)+K2.bd, ied=1-Math.pow(1-STAT.ied,S.ied||0)*(1-(EB.ied||0))*(1-K2.ied); M.dmg*=(1+dg+bd)/(1+dg)*(1-.4*(1-ied))/.6 }
  const mv=((H.spd||160)/160)*(1+STAT.spd*Math.min(S.spd||0,STAT.spdMax))*(1+(CB.spd||0));   /* 이동 속도도 힘이에요 */
  const off=M.dmg*(1+(S.lv||1)*.01)*(1/Math.max(.3,M.cd))*(1+M.crit*(M.critD||1))*(1+.4*(S.tier||0))*(1+(S.lv||1)*.02), def=hp/Math.max(.3,M.armor)*(1+(EB.regen||0)*20)*(1+(S.lv||1)*.015)*Math.sqrt(mv);
  const raw=off*def; if(o.raw) return raw;   /* 큰 수 전투력: 때리는 힘 × 버티는 힘 (예전처럼 제곱근을 씌우지 않아요) */
  const base=(heroPower.B=heroPower.B||{})[id]||(heroPower.B[id]=heroPower(id,{S:{lv:1,tier:0,hp:0,atk:0,spd:0},noBonus:1,raw:1}));
  const R=heroPower.R||(heroPower.R={}); if(R[id]===undefined){ const ref=id2=>heroPower(id2,{S:{lv:100,tier:4,hp:99,atk:99,spd:99},noBonus:1,raw:1})/((heroPower.B[id2])||(heroPower.B[id2]=heroPower(id2,{S:{lv:1,tier:0,hp:0,atk:0,spd:0},noBonus:1,raw:1}))); R[id]=ref("warrior")/ref(id) }   /* 직업 차이 없이 같은 성장이면 같은 전투력 */   /* 직업마다 1레벨 = 10만으로 맞춰 공평하게 */
  return Math.round(raw/base*100000*Math.pow(R[id],Math.min(1,((S.lv||1)-1)/99))) }
/* 큰 수로 읽기: 1억 2345만 6789 (4학년 1단원 큰 수!) */
const fmtPow=n=>{ n=Math.round(n); const neg=n<0; n=Math.abs(n); if(n<10000) return (neg?"-":"")+n.toLocaleString("ko-KR"); const U=[[1e12,"조"],[1e8,"억"],[1e4,"만"]], o=[]; let r=n; for(const [u,t] of U){ const q=Math.floor(r/u); if(q){ o.push(q+t); r-=q*u } } if(r) o.push(String(r)); return (neg?"-":"")+o.join(" ") };
function powHtml(id){ return `<span class="pwrTag">⚔ 전투력 <b>${fmtPow(heroPower(id))}</b></span>` }
/* 맵 · 단계마다 권장 전투력: 그 맵 레벨의 보통 용사(능력치 고르게 · 각인/카드 없이)를 기준으로 */
function recPower(mid,dif){ const m=mapById(mid), L=Math.max(1,m.lv||1), tier=L>=100?4:L>=60?3:L>=30?2:L>=10?1:0, pt=(L-1)*STAT.ppl, b=heroPower("warrior",{S:{lv:L,tier,hp:pt/3,atk:pt/3,spd:pt/3},noBonus:1});
  const v=b*[1,1.69,2.72][dif||0], top=mid>=10&&!dif?0:recPower(10,0);   /* 지옥은 어느 맵이든 10단계 보통의 1.82배 이상 · 어려움은 1.32배 이상 (큰 수 전투력이라 예전 배수의 제곱) */
  const x=Math.max(v,dif===2?top*1.82:dif===1?top*1.32:0), u=Math.pow(10,Math.max(1,Math.floor(Math.log10(x))-2)); return Math.round(x/u)*u }
const qrangeOf = ()=>QRANGE.find(q=>q.w===(P.set.qrange||5))||QRANGE[0];
const qpoolOf = w=>[...new Map(WEEKS.slice(0,Math.min(w,S1_N)).flat().map(c=>[c.h,c])).values()];
const q2poolOf = w=>w?[...new Map(WEEKS.slice(S1_N,S1_N+w).flat().map(c=>[c.h,c])).values()]:[];
/* ===== 시즌 2 퀴즈 범위: 넓게 고르고 많이 익힐수록 보스 공격력 · 방어율 무시 (숫자는 11·12번째 맵 보스를 만든 뒤 맞출 예정) ===== */
const Q2RANGE = [
  {w:0,  exp:1,    coin:0,  cm:1,    label:"안 풀기",          merit:"시즌 2 한자는 안 나와요"},
  {w:6,  exp:1.08, coin:4,  cm:1.05, label:"시즌2 1~6주차",    merit:"경험치 ×1.08 · 게임 코인 ×1.05 · +4"},
  {w:12, exp:1.16, coin:8,  cm:1.1,  label:"시즌2 1~12주차",   merit:"경험치 ×1.16 · 게임 코인 ×1.1 · +8"},
  {w:18, exp:1.25, coin:14, cm:1.15, label:"시즌2 1~18주차",   merit:"경험치 ×1.25 · 게임 코인 ×1.15 · +14"},
  {w:24, exp:1.35, coin:22, cm:1.25, label:"시즌2 전체",       merit:"경험치 ×1.35 · 게임 코인 ×1.25 · +22"},
];
const KNOW2_BD=[0,.05,.10,.15,.20], KNOW2_IED=[0,.05,.10,.15,.20];   /* 임시 숫자 */
const q2rangeOf = ()=>Q2RANGE.find(q=>q.w===(P.set.q2range||0))||Q2RANGE[0];
function know2Power(w){ w=w===undefined?q2rangeOf().w:w; const i=Math.max(0,Q2RANGE.findIndex(q=>q.w===w)), L=q2poolOf(w), r=typeof isAdmin==="function"&&isAdmin()?1:L.length?L.filter(c=>((P.mastery||{})[c.h]||0)>=MASTER_N).length/L.length:0, f=.25+.75*r; return {bd:KNOW2_BD[i]*f, ied:KNOW2_IED[i]*f, r, i} }
/* 사자성어·속담 퀴즈 범위: 넓을수록 보상이 커요 (한자 범위 보상과 곱해져요) */
const SRANGE = [
  {w:0,  exp:1,    coin:0,  cm:1,    revive:0, label:"안 풀기",  merit:"한자 문제만 나와요 · 추가 보상 없음"},
  {w:3,  exp:1.08, coin:4,  cm:1.05, revive:0, label:"1~3주차",  merit:"경험치 ×1.08 · 게임 코인 ×1.05 · +4"},
  {w:6,  exp:1.16, coin:8,  cm:1.1,  revive:0, label:"1~6주차",  merit:"경험치 ×1.16 · 게임 코인 ×1.1 · +8"},
  {w:9,  exp:1.25, coin:14, cm:1.15, revive:0, label:"1~9주차",  merit:"경험치 ×1.25 · 게임 코인 ×1.15 · +14"},
  {w:99, exp:1.35, coin:22, cm:1.25, revive:1, label:"전체 주차", merit:"경험치 ×1.35 · 게임 코인 ×1.25 · +22 · 부활 +1번"},
];
const srangeOf = ()=>SRANGE.find(q=>q.w===(P.set.srange??3))||SRANGE[1];
const spoolOf = w=>(!w||typeof SAY_ALL==="undefined")?[]:[...SAY_ALL.S.filter(x=>x.w<=w),...SAY_ALL.P.filter(x=>x.w<=w)];
const spoolCnt = w=>{ const L=spoolOf(w); return `사자성어 ${L.filter(x=>x.cat==="S").length}개 · 속담 ${L.filter(x=>x.cat==="P").length}개` };
const MAXLV = 5;

function setMainSkill(){ const H=heroById(P.hero); SK.main={t:"w",cls:H.cls,name:H.main.name,d:H.main.d}; }
function gameLobby(){
  setMainSkill(); ensureMapLock(); if(!mapOpened(P.set.map||1)){ P.set.map=mapOpenN(); saveP() }
  const best = P.best, d = day();
  const left = Math.max(0, DAILY_PLAYS - d.plays);
  const need = Math.max(0, GAME_COST - P.coins);
  const why = !left ? `오늘 게임 ${DAILY_PLAYS}판을 다 했어요. 내일 또 만나요!` : need ? `코인이 ${need}개 더 필요해요. 학습하기에서 코인을 모아 오세요!` : "";
  $app.innerHTML = topbar("게임 · 몬스터 대작전") + `
  <section class="panel lobby">
    <div class="lobbyHero"><div class="lh">${ico("monster")}</div><div><strong>몬스터들이 몰려와요!</strong><p>보스 4마리(약한 → 중간 → 강한 → <b>최종 보스</b>)를 물리치면 스테이지 클리어!</p></div></div>
    <div class="heroBar" style="justify-content:flex-start"><button class="heroChip" id="lobHero">${avaHtml(P.hero,48)}<span><small>출전 중 · ${heroBadge(P.hero)} · 전직 스킬 ${HS().tier}개</small><b>${heroById(P.hero).name}</b> <em>${heroById(P.hero).skill}</em></span>${powHtml(P.hero)}<span class="chg">용사 키우기 ›</span></button></div>
    <div class="pickHero"><b>출전 용사 고르기</b><div class="phl">${HEROES.filter(h=>P.heroes.includes(h.id)||isAdmin()).map(h=>`<button class="ph ${P.hero===h.id?"on":""}" data-ph="${h.id}">${avaHtml(h.id,40)}<span>${h.name}</span><small>Lv ${HS(h.id).lv}</small><em class="phPw">⚔ ${fmtPow(heroPower(h.id))}</em></button>`).join("")}</div></div>
    ${engHtml(P.hero)}
    <details class="lobFold"><summary>▸ 게임 방법 · 내 기술 보기</summary>
    <ul class="howto">
      <li>화면을 누른 채로 끌면 움직여요. 공격은 저절로 해요.</li>
      <li>몬스터가 남긴 경험치 구슬을 모으면 레벨이 올라요. <b>한자 퀴즈를 맞히면</b> 기술 카드를 골라 배울 수 있어요.</li>
      <li>쓰러지면 한자 문제를 맞혀서 되살아날 수 있어요.</li>
    </ul>
    <div class="skillchips">${Object.keys(SK).filter(k=>!SK[k].boss).map(k=>`<span>${skImg(k,26)}${k==="main"?`${SK.main.cls} 기본 공격 · `:""}${skName(k)}</span>`).join("")}</div></details>
    ${typeof mpPanelHtml==="function"?mpPanelHtml():""}
    ${(()=>{ const K=knowPower(P.set.qrange||5,srangeOf().w), K2=know2Power(); return `<details class="rngBox" ${P.set.rngOpen?"open":""}><summary><b>📚 퀴즈 범위</b><span class="rsum"><i>한자 ${qrangeOf().label}</i>${q2rangeOf().w?`<i class="s2">${q2rangeOf().label}</i>`:""}<i class="wi">사자성어·속담 ${srangeOf().label}</i></span><span class="rpow">📚 공격 +${Math.round(K.dmg*100)}%${q2rangeOf().w?` · 👑 보공 +${Math.round(K2.bd*100)}% 방무 ${Math.round(K2.ied*100)}%`:""} · 📜 피해 -${Math.round(K.armor*100)}%</span><em class="ropen">바꾸기 ▾</em></summary>
    <div class="rtabs">${[["h","📚 한자"],["s2","👑 시즌 2"],["w","📜 사자성어·속담"]].map(([k,t])=>`<button class="rtab ${(P.set.rtab||"h")===k?"on":""}" data-rt="${k}">${t}</button>`).join("")}</div>` })()}
    <div class="rblk" ${(P.set.rtab||"h")==="h"?"":"hidden"}>
    <div class="row"><h2 style="font-size:22px">한자 퀴즈 범위</h2><span class="meta">넓을수록 보상이 커요</span></div>
    <div class="qrgrid compact">${QRANGE.map((q,i)=>`<button class="qrc ${(P.set.qrange||5)===q.w?"on":""}" data-qr="${q.w}"><span class="qrs">${"★".repeat(i+1)}</span><strong>${q.label}</strong><small>한자 ${qpoolOf(q.w).length}자</small><em>${q.merit}</em></button>`).join("")}</div><p class="qrinfo">✔ ${(QRANGE.find(q=>q.w===(P.set.qrange||5))||QRANGE[0]).merit} · 한자 ${qpoolOf(P.set.qrange||5).length}자</p>${(()=>{ const K=knowPower(P.set.qrange||5,srangeOf().w), nx=QRANGE[K.qi+1], MX=KNOW_DMG[KNOW_DMG.length-1], v=Math.round(K.dmg*100);
      return `<div class="kpow"><span class="kic">📚</span><div class="kbd"><div class="kt"><b>지식의 힘</b><span class="kv">공격력 +${v}%</span></div>
        <div class="kbar"><i style="width:${K.dmg/MX*100}%"></i>${KNOW_DMG.slice(1).map(x=>`<s style="left:${x/MX*100}%"></s>`).join("")}</div>
        <small>한자 범위가 넓을수록 · 그 범위 한자를 많이 익힐수록 세져요 (지금 ${Math.round(K.kr*100)}% 익힘)${K.qi?"":" · <b class='kwarn'>1~5주차는 보스 체력 +10%</b>"}</small>
        ${nx?`<em class="knext">⬆ ${nx.label}로 넓히면 최대 +${Math.round(KNOW_DMG[K.qi+1]*100)}% · 전투력 최대 +${fmtPow(Math.max(0,heroPower(P.hero,{qw:nx.w,kfull:1})-heroPower(P.hero)))}</em>`:`<em class="knext max">👑 최고 범위!</em>`}</div></div>` })()}
    </div><div class="rblk" ${P.set.rtab==="s2"?"":"hidden"}>
    <div class="row"><h2 style="font-size:22px">시즌 2 한자 퀴즈 범위</h2><span class="meta">많이 익힐수록 보스에게 강해져요</span></div>
    <div class="qrgrid compact">${Q2RANGE.map((q,i)=>`<button class="qrc s2c ${q2rangeOf().w===q.w?"on":""}" data-q2="${q.w}"><span class="qrs">${i?"★".repeat(i):"—"}</span><strong>${q.label}</strong><small>${q.w?`한자 ${q2poolOf(q.w).length}자`:"시즌 2 한자 없음"}</small><em>${q.merit}${i?` · 👑 보공 최대 +${Math.round(KNOW2_BD[i]*100)}% · 방무 최대 ${Math.round(KNOW2_IED[i]*100)}%`:""}</em></button>`).join("")}</div>${(()=>{ const K2=know2Power(); return `<div class="kpow s2"><span class="kic">👑</span><div class="kbd"><div class="kt"><b>시즌 2의 힘</b><span class="kv">보스 공격력 +${Math.round(K2.bd*100)}% · 방어율 무시 ${Math.round(K2.ied*100)}%</span></div><small>시즌 2 범위가 넓을수록 · 그 범위 한자를 많이 익힐수록 세져요 (지금 ${Math.round(K2.r*100)}% 익힘) · 보스 방어율이 있는 맵에서 효과가 커요</small></div></div>` })()}
    </div><div class="rblk" ${P.set.rtab==="w"?"":"hidden"}>
    <div class="row"><h2 style="font-size:22px">사자성어·속담 퀴즈 범위</h2><span class="meta">넓을수록 보상이 커요</span></div>
    <div class="qrgrid compact">${SRANGE.map((q,i)=>`<button class="qrc src ${srangeOf().w===q.w?"on":""}" data-sr="${q.w}"><span class="qrs">${i?"★".repeat(i):"—"}</span><strong>${q.label}</strong><small>${q.w?spoolCnt(q.w):"사자성어·속담 없음"}</small><em>${q.merit}</em></button>`).join("")}</div><p class="qrinfo">✔ ${srangeOf().merit}${srangeOf().w?" · "+spoolCnt(srangeOf().w):""}</p>${(()=>{ const K=knowPower(P.set.qrange||5,srangeOf().w), nx=SRANGE[K.si+1], MX=WIS_ARM[WIS_ARM.length-1];
      return `<div class="kpow wis"><span class="kic">📜</span><div class="kbd"><div class="kt"><b>지혜의 힘</b><span class="kv">받는 피해 -${Math.round(K.armor*100)}% · 대기 시간 -${Math.round(K.cd*100)}%</span></div>
        <div class="kbar"><i style="width:${K.armor/MX*100}%"></i>${WIS_ARM.slice(1).map(x=>`<s style="left:${x/MX*100}%"></s>`).join("")}</div>
        <small>사자성어·속담 범위가 넓을수록 · 많이 익힐수록 튼튼하고 기술을 자주 써요 (지금 ${Math.round(K.wr*100)}% 익힘)</small>
        ${nx?`<em class="knext">⬆ ${nx.label}로 넓히면 최대 -${Math.round(WIS_ARM[K.si+1]*100)}% · -${Math.round(WIS_CD[K.si+1]*100)}% · 전투력 최대 +${fmtPow(Math.max(0,heroPower(P.hero,{qw:P.set.qrange||5,sw:nx.w,kfull:1})-heroPower(P.hero,{qw:P.set.qrange||5,kfull:1})))}</em>`:`<em class="knext max">👑 최고 범위!</em>`}</div></div>` })()}
    </div></details>
    <div class="row"><span class="cost">입장료 코인 ${GAME_COST} · 오늘 남은 판 ${left}/${DAILY_PLAYS}</span>
      <span class="meta">${(()=>{ const n=Object.keys((P.cleared||{})).length; return n?`클리어한 맵 ${n}개 · 별 ${Object.values(P.stars||{}).reduce((a,b)=>a+b,0)}개`:"아직 클리어한 맵이 없어요. 보스 4마리에 도전해요!" })()}</span></div>
    ${(()=>{ const cm=typeof NET!=="undefined"&&NET.role==="client"&&netInRoom()?(NET.map||1):(P.set.map||1), M0=mapById(cm), df=mapDif(cm), rp=recPower(cm,df), mp=heroPower(P.hero); return `<details class="mapBox" ${P.set.mapOpen?"open":""}><summary style="--m1:${M0.sky[0]};--m2:${M0.sky[1]}"><span class="msS">${cm<=10?"시즌 1":"시즌 2"} · ${cm}단계</span><b>🗺 ${esc(M0.name)}</b><span class="msD" style="background:${DIFS[df].c}">${dN(df,cm)}</span><span class="msR ${mp>=rp?"ok":"lo"}">⚔ 권장 ${fmtPow(rp)} · 나 ${fmtPow(mp)}</span><em class="ropen">맵 바꾸기 ▾</em></summary>
    <div class="rtabs stabs">${[["1","🌱 시즌 1 · 1~10단계"],["2","🌌 시즌 2 · 11단계~"]].map(([k,t])=>`<button class="rtab ss${k} ${(P.set.mseason||"1")===k?"on":""}" data-ms2="${k}">${t}</button>`).join("")}</div>
    <div class="msea" ${(P.set.mseason||"1")==="2"?"hidden":""}>` })()}
    <div class="mapLegend"><span><b class="lgS">★★★★</b> 그 맵에서 잡은 보스 수 (가장 좋은 기록 · 4개면 클리어)</span><span><b>🏆 ✨ 📜</b> 맵 훈장 (어려움 클리어 · 패턴 완벽 회피 · 문제 박사)</span><span><b class="lgB">지옥 클리어</b> 깬 가장 높은 단계</span><span><b class="lgP">⚔ 권장</b> 그 단계 권장 전투력 · 초록은 충분, 빨강은 부족</span></div>
    ${[["ground","🌱 지상","평화로운 들판에서 깊은 던전까지"],["sky","☁ 천공","하늘 꼭대기를 향한 도전! (용사 Lv 80부터)"]].map(([rl,ttl,sub])=>`<div class="realmHead ${rl}"><b>${ttl}</b><span>${sub}</span></div>
    <div class="mapgrid">${MAPS.filter(m=>m.realm===rl).map(m=>{ const cli=typeof NET!=="undefined"&&NET.role==="client"&&netInRoom(), chain=!cli&&!mapOpened(m.id), unl=!cli&&P.newOpen===m.id, lock=!cli&&!isAdmin()&&(chain||HS().lv<m.lv||(m.tier&&HS().tier<m.tier)), on=cli?(NET.map||1)===m.id:(P.set.map||1)===m.id;
      return `<button class="mapc ${(chain||lock)?"":"slim"} ${on?"on":""} ${lock?"mlock":""} ${chain?"chained":""} ${m.hud==="#f3effd"?"dk":""}" data-map="${m.id}" ${lock?"disabled":""} style="--m1:${m.sky[0]};--m2:${m.sky[1]};--mt:${m.tag}">
        <span class="mstep">${m.id}단계</span><span class="mdiff">${m.diff}</span>
        <strong>${m.name}</strong><span class="mstar">${starStr((P.stars||{})[m.id]||0)}${(P.cleared||{})[m.id]?" 클리어":""}</span><span class="mmedal">${medalsOf(m.id).map((x,i)=>`<i class="${x?"on":""}">${MEDALS[i][0]}</i>`).join("")}${((P.clearD||{})[m.id]||0)>=2?`<em style="background:${DIFS[((P.clearD||{})[m.id])-1].c}">${DIFS[((P.clearD||{})[m.id])-1].n} 클리어</em>`:""}</span>${(()=>{ const df=mapDif(m.id), rp=recPower(m.id,df), mp=heroPower(P.hero); return `<span class="mrec ${mp>=rp?"ok":"lo"}">⚔ 권장 ${fmtPow(rp)}${DIFS[df]&&df?` (${dN(df,m.id)})`:""} · 나 ${fmtPow(mp)}</span>` })()}<span class="mexp">경험치 ×${m.exp} · 코인 최대 ${maxGameCoins(m.id)}${(P.cleared||{})[m.id]?"":` · 첫 클리어 +${firstClearCoin(m.id)}`}</span>
        ${chain||unl?`<span class="mchain ${unl?"unl":""}"><i class="c1"></i><i class="c2"></i><span class="plock"><i class="shk"></i><i class="bod"></i></span></span>`:""}
        <small>${chain?`🔒 ${esc(MAPS[m.id-2]?MAPS[m.id-2].name:"")} 최종 보스를 물리치면 열쇠가 나와요`:lock?(m.tier&&HS().lv>=m.lv?`4차 전직한 용사만 들어갈 수 있어요`:`용사 Lv ${m.lv}부터 열려요${m.tier?" · 4차 전직 필요":""}`):m.desc}</small></button>` }).join("")}</div>`).join("")}
    </div><div class="msea s2" ${(P.set.mseason||"1")==="2"?"":"hidden"}><div class="realmHead boss"><b>👑 군단장 토벌</b><span>보스만 나오는 결투장! 보스 공격력 · 방어율 무시가 중요해요</span></div><div class="mapgrid">${S2MAPS.map(m=>{ const cli=typeof NET!=="undefined"&&NET.role==="client"&&netInRoom(), chain=!cli&&!mapOpened(m.id), unl=!cli&&P.newOpen===m.id, lock=!cli&&!isAdmin()&&(chain||HS().lv<m.lv||(m.tier&&HS().tier<m.tier)), on=cli?(NET.map||1)===m.id:(P.set.map||1)===m.id;
      return `<button class="mapc ${(chain||lock)?"":"slim"} ${on?"on":""} ${lock?"mlock":""} ${chain?"chained":""} ${m.hud==="#f3effd"?"dk":""}" data-map="${m.id}" ${lock?"disabled":""} style="--m1:${m.sky[0]};--m2:${m.sky[1]};--mt:${m.tag}">
        <span class="mstep">${m.id}단계</span><span class="mdiff">${m.diff}</span>
        <strong>${m.name}</strong><span class="mstar">${starStr((P.stars||{})[m.id]||0)}${(P.cleared||{})[m.id]?" 클리어":""}</span><span class="mmedal">${medalsOf(m.id).map((x,i)=>`<i class="${x?"on":""}">${MEDALS[i][0]}</i>`).join("")}${((P.clearD||{})[m.id]||0)>=2?`<em style="background:${DIFS[((P.clearD||{})[m.id])-1].c}">${DIFS[((P.clearD||{})[m.id])-1].n} 클리어</em>`:""}</span>${(()=>{ const df=mapDif(m.id), rp=recPower(m.id,df), mp=heroPower(P.hero); return `<span class="mrec ${mp>=rp?"ok":"lo"}">⚔ 권장 ${fmtPow(rp)}${DIFS[df]&&df?` (${dN(df,m.id)})`:""} · 나 ${fmtPow(mp)}</span>` })()}<span class="mexp">경험치 ×${m.exp} · 코인 최대 ${maxGameCoins(m.id)}${(P.cleared||{})[m.id]?"":` · 첫 클리어 +${firstClearCoin(m.id)}`}</span>
        ${chain||unl?`<span class="mchain ${unl?"unl":""}"><i class="c1"></i><i class="c2"></i><span class="plock"><i class="shk"></i><i class="bod"></i></span></span>`:""}
        <small>${chain?`🔒 ${esc(MAPS[m.id-2]?MAPS[m.id-2].name:"")} 최종 보스를 물리치면 열쇠가 나와요`:lock?(m.tier&&HS().lv>=m.lv?`4차 전직한 용사만 들어갈 수 있어요`:`용사 Lv ${m.lv}부터 열려요${m.tier?" · 4차 전직 필요":""}`):m.desc}</small></button>` }).join("")}</div><div class="s2soon"><b>🌌 12단계</b><span>다음 군단장이 곧 나타나요!</span></div></div></details>
    ${difPanelHtml()}
    <details class="mgBox"><summary>📖 이 맵 자세히 보기 (몬스터 · 보스 · 훈장) ▾</summary>
    ${mapGuideHtml(typeof NET!=="undefined"&&NET.role==="client"&&netInRoom()?(NET.map||1):(P.set.map||1))}
    </details>
    <button class="big red" id="go" ${why?"disabled":""}>코인 ${GAME_COST}개 내고 ${mapById(P.set.map||1).name} · ${dN(mapDif(P.set.map||1),P.set.map||1)} 입장</button>
    ${why?`<p class="needmsg">${why}</p>`:""}
  </section>`;
  bindBack();
  document.getElementById("lobHero").onclick = ()=>grow(P.hero,gameLobby);
  { const eb=document.getElementById("engBtn"); if(eb) eb.onclick=()=>{ sfx("tap"); const y=window.scrollY; engraveUI(()=>{ gameLobby(); window.scrollTo(0,y) }) } }
  document.querySelectorAll("[data-ph]").forEach(b=>b.onclick=()=>{ if(P.hero===b.dataset.ph) return; sfx("tap"); P.hero=b.dataset.ph; saveP(); if(typeof netSendMe==="function"&&typeof netInRoom==="function"&&netInRoom()) netSendMe(); const y=window.scrollY; gameLobby(); window.scrollTo(0,y) });   // 맵 화면에서 바로 직업 바꾸기
  { const rb=$app.querySelector(".rngBox"); if(rb) rb.addEventListener("toggle",()=>{ P.set.rngOpen=rb.open?1:0; saveP() }) }
  { const mb=$app.querySelector(".mapBox"); if(mb) mb.addEventListener("toggle",()=>{ P.set.mapOpen=mb.open?1:0; saveP() }) }
  $app.querySelectorAll("[data-ms2]").forEach(b=>b.onclick=()=>{ P.set.mseason=b.dataset.ms2; saveP(); sfx("tap"); $app.querySelectorAll("[data-ms2]").forEach(x=>x.classList.toggle("on",x===b)); $app.querySelectorAll(".msea").forEach((x,k)=>x.hidden=String(k+1)!==b.dataset.ms2) });
  $app.querySelectorAll(".rtab[data-rt]").forEach(b=>b.onclick=()=>{ P.set.rtab=b.dataset.rt; saveP(); sfx("tap"); $app.querySelectorAll(".rtab[data-rt]").forEach(x=>x.classList.toggle("on",x===b)); $app.querySelectorAll(".rblk").forEach((x,k)=>x.hidden=["h","s2","w"][k]!==b.dataset.rt) });
  $app.querySelectorAll(".qrc").forEach(b=>b.onclick=()=>{ if(b.dataset.q2!==undefined) P.set.q2range=+b.dataset.q2; else if(b.dataset.sr!==undefined) P.set.srange=+b.dataset.sr; else P.set.qrange=+b.dataset.qr; saveP(); sfx("tap"); if(typeof netSendMe==="function"&&typeof netInRoom==="function"&&netInRoom()) netSendMe(); const y=window.scrollY; gameLobby(); window.scrollTo(0,y) });
  if(P.newOpen){ const id=P.newOpen, M_=MAPS[id-1]; P.newOpen=0; saveP(); const el=$app.querySelector(".mchain.unl");
    if(el){ el.scrollIntoView({block:"center",behavior:"smooth"}); setTimeout(()=>{ sfx("chest"); el.classList.add("go") },700); setTimeout(()=>{ el.remove(); sfx("win"); const t=document.createElement("div"); t.className="unlockToast"; t.innerHTML=`<img src="${keySrc(id)}" alt=""><b>${esc(M_?M_.name:"")}</b> 맵이 열렸어요!`; document.body.appendChild(t); setTimeout(()=>t.remove(),3200) },2100) } }
  $app.querySelectorAll(".mapc").forEach(b=>b.onclick=()=>{ if(typeof NET!=="undefined"&&NET.role==="client") return; P.set.map=+b.dataset.map; saveP(); sfx("tap"); if(typeof NET!=="undefined"&&NET.role==="host") netHostLobby(); else gameLobby() });
  if(!isAdmin() && (HS().lv<mapById(P.set.map||1).lv||(mapById(P.set.map||1).tier&&HS().tier<mapById(P.set.map||1).tier))){ P.set.map=1; saveP() }
  $app.querySelectorAll(".difb").forEach(b=>b.onclick=()=>{ if(typeof NET!=="undefined"&&NET.role==="client") return; const id=P.set.map||1, d=+b.dataset.dif; if(!difUnlocked(id,d)){ toast(d===1?"이 맵 보통을 깨거나, 앞 맵을 어려움 이상으로 깨면 열려요!":"이 맵 어려움을 깨거나, 앞 맵을 지옥으로 깨면 열려요!"); return } P.set.difs=P.set.difs||{}; P.set.difs[id]=d; saveP(); sfx("tap"); if(typeof NET!=="undefined"&&NET.role==="host") netHostLobby(); else gameLobby() });
  // 입장 버튼: 바로 들어가지 않고 "이 용사로 출전할까요?" 창에서 용사를 한 번 더 고르고 들어가요
  document.getElementById("go").onclick = ()=>openPick();
  function openPick(tab){ const M=mapById(P.set.map||1); let T=tab||"";
    /* 입장 창: 용사 · 각인 · 퀴즈 범위를 눌러서 펼쳐 바꿔요. 미리 골라 둔 그대로라 바로 '입장하기'만 눌러도 돼요 */
    const draw=()=>{ const K=knowPower(P.set.qrange||5,srangeOf().w), E=engOf(P.hero), H=heroById(P.hero), rp=recPower(M.id,mapDif(M.id)), pw=heroPower(P.hero);
      const sec=(k,ic,ttl,sum,body)=>`<div class="pkSec ${T===k?"on":""}"><button class="pkHead" data-tab="${k}"><span class="pkIc">${ic}</span><span class="pkT"><b>${ttl}</b><small>${sum}</small></span><em>${T===k?"접기 ▲":"바꾸기 ▼"}</em></button>${T===k?`<div class="pkBody">${body}</div>`:""}</div>`;
      mcard.innerHTML=`<h3>출전 준비</h3><p>${esc(M.name)} · ${dN(mapDif(M.id),M.id)} · 권장 전투력 ${fmtPow(rp)}</p>
      <div class="pkPow ${pw>=rp?"ok":"lo"}">⚔ 내 전투력 <b>${fmtPow(pw)}</b><small>${pw>=rp?"충분해요!":"조금 부족해요"}</small></div>
      ${sec("hero",avaHtml(P.hero,40),"용사",`${esc(H.name)} · Lv ${HS().lv} · ⚔ ${fmtPow(pw)}`,`<div class="phl pickGrid">${HEROES.filter(h=>P.heroes.includes(h.id)||isAdmin()).map(h=>`<button class="ph ${P.hero===h.id?"on":""}" data-pk="${h.id}">${avaHtml(h.id,48)}<span>${h.name}</span><small>Lv ${HS(h.id).lv} · ${jobTitle(h.id)}</small><em class="phPw">⚔ ${fmtPow(heroPower(h.id))}</em></button>`).join("")}</div>`)}
      ${sec("eng","💎",`한자 룬 · ${esc(H.name)}`,E.length?E.map(h=>runeHtml(h,"xs")).join("")+" · "+Object.entries(engraveBonus(P.hero)).map(([k,v])=>engFmt(k,v)).join(" · "):"아직 박은 룬이 없어요",`<p class="pkK">룬은 용사마다 따로 박아요. 지금 고른 용사의 룬이에요.</p><button class="big gold" id="pkEng">💎 룬 바꾸러 가기</button>`)}
      ${(()=>{ const K2=know2Power(); return sec("rng","📚","퀴즈 범위",`한자 ${qrangeOf().label}${q2rangeOf().w?" · "+q2rangeOf().label:""} · 사자성어·속담 ${srangeOf().label} · 📚 +${Math.round(K.dmg*100)}% · 📜 -${Math.round(K.armor*100)}%${q2rangeOf().w?` · 👑 +${Math.round(K2.bd*100)}%`:""}`,`<div class="pkRange"><b>한자 퀴즈 범위</b><div>${QRANGE.map(q=>`<button class="pkr ${(P.set.qrange||5)===q.w?"on":""}" data-mq="${q.w}">${q.label}</button>`).join("")}</div>
        <small class="pkEf">📚 지금 효과: <em>공격력 +${Math.round(K.dmg*100)}%</em> · 넓게 고를수록 경험치·코인도 많아요</small>
        <b>시즌 2 한자 범위 👑</b><div>${Q2RANGE.map(q=>`<button class="pkr ${q2rangeOf().w===q.w?"on":""}" data-m2="${q.w}">${q.label}</button>`).join("")}</div>
        <small class="pkEf">👑 지금 효과: ${q2rangeOf().w?`<em>보스 공격력 +${Math.round(K2.bd*100)}% · 방어율 무시 +${Math.round(K2.ied*100)}%</em> (외운 만큼 · 최대 보공 +${Math.round(KNOW2_BD[K2.i]*100)}% 방무 +${Math.round(KNOW2_IED[K2.i]*100)}%) · 군단장 맵에서 아주 중요해요`:"없어요 · 고르면 보스 공격력과 방어율 무시가 생겨요"}</small>
        <b>사자성어·속담 범위</b><div>${SRANGE.map(q=>`<button class="pkr ${srangeOf().w===q.w?"on":""}" data-ms="${q.w}">${q.label}</button>`).join("")}</div>
        <small class="pkEf">📜 지금 효과: ${srangeOf().w?`<em>받는 피해 -${Math.round(K.armor*100)}% · 대기 시간 -${Math.round(K.cd*100)}%</em>`:"없어요 · 고르면 받는 피해와 대기 시간이 줄어요"}</small>
        <p class="pkK">모두 합치면: 📚 공격력 +${Math.round(K.dmg*100)}% · 📜 받는 피해 -${Math.round(K.armor*100)}% · 대기 시간 -${Math.round(K.cd*100)}%${q2rangeOf().w?` · 👑 보공 +${Math.round(K2.bd*100)}% · 방무 +${Math.round(K2.ied*100)}%`:""} <small>(넓게 고르고 많이 외울수록 세져요)</small></p></div>`) })()}
      ${(()=>{ const S=HS(), used=STAT_KEYS.reduce((a,k)=>a+(S[k]||0),0), NMS={hp:"체력",atk:"공격",dmg:"데미지",spd:"속도",bd:"보공",ied:"방무"}, line=STAT_KEYS.filter(k=>S[k]).map(k=>`${NMS[k]} ${S[k]}`).join(" · ")||"아직 찍은 포인트가 없어요";
        return sec("stat","📊",`능력치 · ${esc(H.name)}`,`${line}${S.pts?` · <b style="color:#ffd36a">남은 ${S.pts}</b>`:""}`,`<p class="pkK">${bossDefOf(M.id,mapDif(M.id))?`<b>${esc(M.name)} ${dN(mapDif(M.id),M.id)}</b>은 보스 방어율이 있어서 보공·방무가 중요해요. 이 보스에 맞춰 다시 찍을 수 있어요.`:`1~10단계는 어느 맵이든 추천이 같아요. 군단장 맵에서 바꿨다면 여기서 공통 추천으로 되돌려요.`} (찍은 포인트 ${used}개 · 남은 ${S.pts}개)</p>
          <div class="pkRange"><b>성향</b><div>${Object.entries(STAT_STYLE).map(([k,v])=>`<button class="pkr ${((P.set.sstyle||"bal")===k)?"on":""}" data-psty="${k}">${v.n}</button>`).join("")}</div></div>
          <div class="pkStatL">${STAT_KEYS.filter(k=>k!=="bd"&&k!=="ied"||S.lv>=STAT.bLv).map(k=>`<span><i>${NMS[k]}</i><b>${S[k]||0}</b></span>`).join("")}</div>
          ${bossDefOf(M.id,mapDif(M.id))?`<button class="btn gold" id="pkStat" style="width:100%;font-size:18px;padding:12px">⭐ 이 군단장 맞춤으로 다시 찍기</button>`:`<button class="btn gold" id="pkStat" style="width:100%;font-size:18px;padding:12px">⭐ 추천대로 다시 찍기 (1~10단계 공통)</button>`}<button class="btn ghost" id="pkStatGo" style="width:100%;margin-top:6px;font-size:16px;padding:10px">✋ 직접 찍으러 가기</button>`) })()}
      <div class="gbtns"><button class="big red" id="pkGo">⚔ 입장하기<small style="display:block;font-size:13px">${esc(H.name)} · 전투력 ${fmtPow(pw)} · 코인 ${GAME_COST}개</small></button><button class="big alt" id="pkNo">취소</button></div>`;
      mcard.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{ sfx("tap"); T=T===b.dataset.tab?"":b.dataset.tab; draw() });
      mcard.querySelectorAll("[data-mq],[data-ms],[data-m2]").forEach(b=>b.onclick=()=>{ sfx("tap"); if(b.dataset.m2!==undefined) P.set.q2range=+b.dataset.m2; else if(b.dataset.mq) P.set.qrange=+b.dataset.mq; else P.set.srange=+b.dataset.ms; saveP(); if(typeof netSendMe==="function"&&typeof netInRoom==="function"&&netInRoom()) netSendMe(); draw() });
      mcard.querySelectorAll("[data-pk]").forEach(b=>b.onclick=()=>{ sfx("tap"); P.hero=b.dataset.pk; saveP(); if(typeof netSendMe==="function"&&typeof netInRoom==="function"&&netInRoom()) netSendMe(); draw() });
      mcard.querySelectorAll("[data-psty]").forEach(b=>b.onclick=()=>{ sfx("tap"); P.set.sstyle=b.dataset.psty; saveP(); draw() });
      { const ps=document.getElementById("pkStat"); if(ps) ps.onclick=()=>{ const S=HS(); for(const k of STAT_KEYS){ S.pts+=S[k]||0; S[k]=0 } const n=statAuto(P.hero,S,bossDefOf(M.id,mapDif(M.id))?`${M.id}-${mapDif(M.id)}`:"1-0",S.pts); S.pts-=n; saveP(); sfx("ok"); toast(`⭐ ${M.name}에 맞춰 ${n}포인트를 다시 찍었어요!`); if(typeof netSendMe==="function"&&typeof netInRoom==="function"&&netInRoom()) netSendMe(); draw() };
        const pg2=document.getElementById("pkStatGo"); if(pg2) pg2.onclick=()=>{ sfx("tap"); modal.hidden=true; grow(P.hero,()=>{ gameLobby(); openPick("stat") }) } }
      const pe=document.getElementById("pkEng"); if(pe) pe.onclick=()=>{ sfx("tap"); engraveUI(()=>openPick("eng")) };
      document.getElementById("pkNo").onclick=()=>{ modal.hidden=true; const y=window.scrollY; gameLobby(); window.scrollTo(0,y) };
      document.getElementById("pkGo").onclick=()=>{ modal.hidden=true; if(payGame()) startGame(); else gameLobby() } };
    mcard.className="mcard"; draw(); modal.hidden=false }
  if(typeof mpBind==="function"){ mpBind(); if(netInRoom()) document.getElementById("go").style.display="none" }
}

/* ===== 맵 도감: 들어가기 전에 풍경 · 몬스터 · 보스 · 조심할 것을 보여 줘요 ===== */
const MAP_HAZ={1:"",2:"",3:"🪨 가끔 유적 돌이 떨어져요. 빨간 원을 피해요!",4:"💎 수정 가시가 땅에서 솟아요. 빨간 원을 피해요!",5:"🔥 용암 웅덩이를 밟으면 계속 다쳐요. 지옥불 기둥도 솟아올라요!",6:"🌪 회오리바람이 돌아다니며 끌어당겨요. 가끔 거센 돌풍이 몸을 밀어내요.",7:"💣 성벽 대포가 빨간 원 자리에 포탄을 떨어뜨려요. 성벽 때문에 길이 좁아요.",
  8:"🧊 빙판 위에서는 미끄러져요. 하늘에서 고드름이 떨어져요.",9:"⚡ 「신의 심판」이 오면 빛나는 원 안으로 빨리 들어가요!",10:"🌌 블랙홀이 모든 것을 끌어당기고, 별똥별이 쏟아져요."};
function mobThumb(mid,x){ try{ const c=document.createElement("canvas"); c.width=c.height=96; const k=c.getContext("2d"); const e={x:48,y:52,r:24,look:x.look,c:x.c,mapId:mid,wob:0,flash:0,type:"mob",born:-9,stun:0,hp:1,max:1};
  (LOOKS[x.look]||LOOKS.slime)(k,e,.3,200,52); if(EXTRA[x.look]) EXTRA[x.look](k,e,.3,200,52); return c.toDataURL() }catch(err){ return "" } }
const SIZE_TXT={small:"작고 날쌔요",normal:"보통",fast:"아주 빨라요",tough:"튼튼해요",big:"크고 아주 튼튼해요"};
/* 군단장 공략집: 아이들이 패턴을 미리 읽고 들어가요 */
const B11_GUIDE=[
  ["🌙 기본 규칙",[["⚔ 보스만 나와요","몬스터 없이 군단장과 1:1! 레벨 업은 없고 시작 기술 세트로 싸워요. 2페이즈가 되면 카드를 1장 골라요."],["🌑 암흑 게이지","패턴에 맞으면 내 발밑 게이지가 차요. 가득 차면 3초 동안 앞이 어둡고 느려져요. 문제를 맞히면 줄고, 틀리면 +25!"],["🎯 약점 문제","페이즈마다 보스 체력 60%·25%에서 약점 문제가 나와요. 맞히면 3초 기절 + 큰 피해!"],["💡 기억해요","빨간 바닥 = 곧 공격이 오는 곳. 색이 꽉 차면 터져요. 경고는 실제 범위와 똑같아요."]]],
  ["⚔ 1페이즈 · 꼬마 검귀",[["찌르기","가까이 붙으면 앞쪽 부채꼴을 찔러요 → 옆이나 뒤로 비켜요"],["돌진","중간 거리면 빨간 띠를 따라 달려와요 → 띠 옆으로!"],["그림자 검기","멀리 있으면 맵 끝까지 날아가는 초승달 → 맞으면 1초 기절. 보라 띠 밖으로!"],["암흑 팔방참","검을 들어 올리면 8방향 빛줄기 → 빛줄기 사이 빈칸에 서 있어요 (첫 번째는 가만히 있으면 안 맞아요)"],["암흑 검림","바닥 빨간 원에서 그림자 검이 솟아요 → 원과 원 사이 틈으로!"]]],
  ["🌑 2페이즈 · 검은 달의 검귀 (시간이 흘러요)",[["🕒 시간 시계","오른쪽 위 시계를 봐요. 자정 → 여명 → 정오 → 황혼 → 다시 자정. 정오가 되면 문제가 1개 나와요 (게임은 계속 · 맞히면 게이지 0 · 다음 정오 +3초)"],["🔮 어둠의 권능 (한자 기둥)","시간이 바뀔 때 한자 하나가 나와요. 그 한자의 뜻이 적힌 기둥 안으로 들어가야 살아요!"],["🌑 자정 (가장 강함)","X자 교차 띠 · 3×3 낙인(✨ 빛나는 칸이 안전) · 흑월 관통(마름모 3개가 차면 레이저) · 십이방참"],["🌅 여명 (불꽃)","붉은 원에서 불꽃 검이 솟아요 · 불꽃 벽 결계에 닿지 않기 · 흑염 삼연참(돌진 2번 + 긴 베기) · 유성(맞으면 3초 기술 봉인). 불에 데면 3초 동안 회복이 막혀요"],["☀ 정오 (쉬는 시간)","검귀가 약해지고 게이지가 빨리 줄어요. 지금이 공격할 때! 노란 고리 파동만 조심"],["🌆 황혼 (보호막)","보호막이 생겨요 → 문제를 맞히면 깎여요. 늑대가 ❗ 웅크리면 곧 덮쳐요 → 옆으로! 왕관 문양을 따라 늑대 기둥이 차례로 솟아요"]]],
  ["🤝 같이 하기 팁",[["친구 옆에 붙기","저주(앞이 어두움)에 걸려도 친구 옆에 있으면 빨리 풀려요"],["한자 기둥","친구가 많을수록 기둥이 커져요. 다 같이 정답 기둥으로!"]]]];
function b11GuideHtml(){ return `<details class="b11g" open><summary>📕 「암흑의 검귀」 공략집 (눌러서 접기)</summary>${B11_GUIDE.map(([h,L])=>`<div class="b11gs"><b>${h}</b>${L.map(([t,d])=>`<p><em>${t}</em>${d}</p>`).join("")}</div>`).join("")}</details>` }
function mapGuideHtml(mid){ const m=mapById(mid), F=typeof FLOOR_FILES!=="undefined"&&FLOOR_FILES[mid], MA=typeof MOB_ART_FILES!=="undefined"?MOB_ART_FILES:{}, BA=typeof BOSS_ART_FILES!=="undefined"?BOSS_ART_FILES:{};
  const seen=new Set(), mobs=(MOBS[mid]||[]).filter(x=>{ const k=x.look+x.name; if(seen.has(k)) return false; seen.add(k); return true });
  const mobH=mobs.map(x=>{ const src=MA[mid+":"+x.look]||mobThumb(mid,x); return `<div class="mgMob">${src?`<img src="${src}" alt="">`:`<span class="mgNo">?</span>`}<b>${x.name}</b><small>${SIZE_TXT[x.size]||""}${x.from?` · ${x.from}초부터`:" · 처음부터"}</small></div>` }).join("");
  const bossH=(STAGE[mid]||[]).map((k,i)=>{ const B=BOSSES[k]||{}, A=BA[k], S=typeof BOSS_SKILLS!=="undefined"&&BOSS_SKILLS[mid]&&BOSS_SKILLS[mid][i];
    const sk=S?S.k.map(x=>x[1]).join(" · "):""; return `<div class="mgBoss t${i}"><div class="mgBimg">${A?`<img src="${A.src}" alt="">`:""}</div><em>${B.tn||["약한 보스","중간 보스","강한 보스","최종 보스"][i]}</em><b>${B.name||""}</b>${sk?`<small>기술: ${sk}</small>`:""}${S&&S.ult?`<small class="ult">필살기: ${S.ult[1]}</small>`:""}${S&&S.sig?`<small class="sig">${S.sig}</small>`:""}</div>` }).join("");
  return `<section class="mapGuide" style="--m1:${m.sky[0]};--m2:${m.sky[1]}">
    <div class="mgTop" ${F?`style="background-image:linear-gradient(90deg,rgba(0,0,0,.65),rgba(0,0,0,.15)),url(${F})"`:""}><span class="mgStep">📖 맵 도감 · ${m.id}단계</span><strong>${m.name}</strong><p>${m.desc}</p>${MAP_HAZ[mid]?`<p class="mgHaz">${MAP_HAZ[mid]}</p>`:`<p class="mgHaz ok">🌼 위험한 땅이 없어요. 몬스터만 조심해요!</p>`}</div>
    <h3>${mid>=11?"내 용사":"나오는 몬스터"}</h3><div class="mgMobs">${mobH}${(()=>{ const df=mapDif(mid), rp=recPower(mid,df), mp=heroPower(P.hero); return `<div class="mgMob mgMe ${mp>=rp?"ok":"lo"}">${avaHtml(P.hero,64)}<b>내 용사 · ${esc(heroById(P.hero).name)}</b><small class="mgPw">⚔ ${fmtPow(mp)}</small><small>${dN(df,mid)} 권장 ${fmtPow(rp)} · ${mp>=rp?"충분해요!":"조금 부족해요"}</small></div>` })()}</div>
    ${mid===11?b11GuideHtml():`<h3>보스 (차례대로 나와요)</h3><div class="mgBosses">${bossH}</div>`}
  </section>` }
function payGame(){
  const d=day();
  if(d.plays>=DAILY_PLAYS || P.coins<GAME_COST) return false;
  d.plays++; P.coins-=GAME_COST; P.stats.games++; saveP(); window.__paid=1; return true;
}
const fmtT = t=>{t=Math.floor(t);return `${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`};

function difPanelHtml(){ const cli=typeof NET!=="undefined"&&NET.role==="client"&&netInRoom(), id=cli?(NET.map||1):(P.set.map||1), cur=cli?(NET.dif||0):mapDif(id), m=mapById(id), L=HS().lv;
  const rows=DIFS.map((D,i)=>{ const un=difUnlocked(id,i)||cli, M=difMap(m,i,L), hx=M.hp/m.hp;
    if(id>=11) return `<button class="difb ${cur===i?"on":""} ${un?"":"lk"}" data-dif="${i}" style="--dc:${D.c}"><b>${dN(i,id)}</b><small>${un?`보스 체력 ×${[1,1.5,2][i]} · 코인 ×${difCoinX(i)}${i?" · 예고가 조금 짧아요":" · 처음 도전에 딱!"}`:(i===1?"🔒 이지 클리어":"🔒 노멀 클리어")}</small></button>`;
    return `<button class="difb ${cur===i?"on":""} ${un?"":"lk"}" data-dif="${i}" style="--dc:${D.c}"><b>${D.n}</b><small>${un?(i?`몬스터 체력 ×${hx.toFixed(1)} · 코인 ×${difCoinX(i)} · 경험치 ×${(M.exp/m.exp).toFixed(1)}`:"맵 원래 세기"):(i===1?"🔒 보통 클리어 · 또는 앞 맵 어려움 클리어":"🔒 어려움 클리어 · 또는 앞 맵 지옥 클리어")}</small></button>` }).join("");
  const md=medalsOf(id);
  return `<div class="row"><h2 style="font-size:22px">도전 단계</h2><span class="meta">${id>=11?"군단장 맵은 이지 · 노멀 · 하드! 단계가 오를수록 보스 체력이 많고 패턴이 빨라요":`어려움부터는 출전 용사 레벨(Lv ${L})에 맞춰 몬스터가 세져요`}${cli?" · 단계는 방장이 골라요":""}</span></div>
    <div class="difrow">${rows}</div>
    <div class="medalrow">${MEDALS.map((M,i)=>`<span class="${md[i]?"on":""}">${M[0]} <b>${M[1]}</b><small>${M[2]}</small></span>`).join("")}</div>
    <p class="meta" style="margin:2px 0 6px">훈장 ${medalCount()}/30${medalTitle()?` · 칭호 <b style="color:var(--gold);font-weight:400">${medalTitle()}</b>`:""}${(()=>{ const nx=MEDAL_MILE.find(([n])=>n>(P.mmile||0)); return nx?` · ${nx[0]}개 모으면 '${nx[1]}' 칭호와 코인 ${nx[2]}`:"" })()}</p>` }
function startGame(opts){ opts=opts||{};
  const root = document.createElement("div");
  root.className = "game";
  root.innerHTML = `<canvas></canvas>
    <div class="ghud">
      <div class="gxp"><i></i></div>
      <div class="grow"><span class="glv">Lv 1</span><span class="gtime">0:00</span><span class="gk">몬스터 0</span><button class="gtool" aria-label="선생님 도구" hidden>🛠</button><button class="gpause" aria-label="잠깐 멈춤">Ⅱ</button></div>
      <div class="gtoolbox" hidden></div>
      <div class="gstat"><div class="ghp"><i></i><b class="ghpt">100 / 100</b></div>
        <span class="gs atk" title="공격력">공격 <b>×1.00</b></span><span class="gs spd" title="이동 속도">속도 <b>165</b></span><span class="gs cdr" title="공격 간격">공속 <b>100%</b></span><span class="gs conf" hidden title="혼란: 문제를 맞히면 풀려요"></span>${(()=>{ const K=knowPower(qrangeOf().w,srangeOf().w), L=engOf(P.hero), EB=engraveBonus(P.hero), SN={dmg:"공격",hp:"체력",armor:"피해",spd:"이동",cd:"공속",xp:"경험",mag:"줍기",regen:"회복",crit:"급소"}, ef=Object.entries(EB).map(([k,v])=>`${SN[k]}${k==="armor"?"-":"+"}${+(v*100).toFixed(1)}%`).join(" ");
      return `<span class="gs pow" data-buff="1" title="전투력">⚔ <b>${fmtPow(heroPower(P.hero))}</b></span>`
        +(K.dmg>0?`<span class="gs know" data-buff="1" title="지식의 힘">📚 지식 <b>공격+${Math.round(K.dmg*100)}%</b></span>`:"")
        +(K.armor>0?`<span class="gs wisd" data-buff="1" title="지혜의 힘">📜 지혜 <b>피해-${Math.round(K.armor*100)}% 대기-${Math.round(K.cd*100)}%</b></span>`:"")
        +(L.length?`<span class="gs eng" data-buff="1" title="한자 룬">💎 ${L.map(h=>`<i style="color:${RUNE_C[engType(h)[0]]||"#fff"}">${h}</i>`).join("")} <b>${ef}</b></span>`:"") })()}</div>
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
  function perfTick(dt){ if(window.__noAdapt) return; PERF.acc+=dt; PERF.n++; if(PERF.acc<1) return; const fps=PERF.n/PERF.acc; PERF.acc=0; PERF.n=0;
    PERF.slow = fps<35 ? PERF.slow+1 : 0;
    if(PERF.slow>=3 && HDFX){ HDFX=false; window.__fxLow=1; PERF.slow=0; return }   // 1단계: 기술 효과를 가벼운 도트 화면으로
    if(PERF.slow>=3 && PX<3){ PX=3; PERF.slow=0; if(typeof sprSetPX==="function") sprSetPX(PX); resize() } }
  const $ = s=>root.querySelector(s);
  const modal = $(".gmodal"), mcard = $(".gcard"), banner = $(".gbanner");
  let W=0,H=0,dpr=1;
  function resize(){ dpr=Math.min(2,window.devicePixelRatio||1); W=root.clientWidth; H=root.clientHeight; cv.width=W*dpr; cv.height=H*dpr; cv.style.width=W+"px"; cv.style.height=H+"px"; low.width=Math.ceil(W/PX); low.height=Math.ceil(H/PX); }
  resize(); window.addEventListener("resize", resize);

  const HERO = heroById(P.hero); setMainSkill(); window.__heroId=HERO.id; try{ document.fonts.load('40px "HF-'+HERO.id+'"') }catch(e){}
  const DIF = opts.mp?(opts.dif||0):mapDif(opts.map||P.set.map||1);
  const MAP = difMap(mapById(opts.map||P.set.map||1),DIF,HS().lv); window.__mapId=MAP.id; window.__fxPush=f=>{ if(g&&g.fx&&g.fx.length<240) Array.prototype.push.call(g.fx,f) };
  const GLOW = MAP.dark ? "lighter" : "source-over";
  let HDFX=!window.__lowfx; window.__fxLow=window.__lowfx?1:0; let HERO_HD=null; const REMOTE_HD=[]; const HSZ=96;   // 그림 용사 크기
  try{ pfxInit(); pfxInit2(); pfxInit3(); pfxInitTheme(); pfxInitWind(); pfxInitIce() }catch(e){}
  const heroImg = new Image(); heroImg.src = SPRITE_URLS[HERO.id] || "";
  /* 레벨이 오를수록 필요한 경험치가 크게 늘어요 (Lv5≈55 · Lv10≈150 · Lv16≈320 · Lv25≈700) */
  const needXP=L=>Math.round(8+5*L+0.9*L*L);
  const g = {t:0,kills:0,lvl:1,xp:0,need:14,revived:false,over:false,paused:false,
    p:{x:(Math.random()-.5)*120,y:(Math.random()-.5)*120,r:16,hp:HERO.hp,inv:0}, en:[], shots:[], gems:[], items:[], fx:[],
    sk:{main:1}, cd:{}, pending:[], revives:0, sum:[], zones:[], stream:null, buff:null, shake:0, combo:0, spawnAcc:0, stageN:0, nextBossT:60, bossUp:false, nextCrisis:30, crisisN:0, eshots:[], bossKills:0, bossCoins:0, bbuff:null};
  STAGE_PH = 0; VPH=0; VPH_T=0;
  const lv = k=>g.sk[k]||0;
  const M = Object.assign({dmg:1,cd:1,mag:1,xp:1,armor:1,regen:0,slow:1,crit:0,spd:1},HERO.mods||{});
  // 용사 성장: 능력치 포인트 + 전직 스킬
  const HSt = HS(HERO.id), SKL = JOBS[HERO.id].skills.slice(0,HSt.tier);
  let bonusHp = STAT.hp*HSt.hp, pierceAdd = 0, aura = null;
  SKL.forEach(k=>{ if(k.type==="passive"||k.ult){ for(const key in k.p){ const v=k.p[key];
      if(key==="hp") bonusHp+=v; else if(key==="crit") M.crit+=v; else if(key==="pierce") pierceAdd+=v; else M[key]=(M[key]||1)*v } }
    if(k.type==="aura") aura=k; });
  M.dmg *= (1+STAT.atk*HSt.atk)*(1+STAT.dmg*(HSt.dmg||0));
  const BST=bossStats(HERO.id), BDEF=bossDefOf(MAP.id,MAP.dif); M.boss=(M.boss||1)*(1+BST.dg+BST.bd)/(1+BST.dg);   /* 보공은 데미지와 같은 묶음 (메이플) */
  const KP=knowPower(qrangeOf().w,srangeOf().w);
  /* 어려움·지옥: 내 전투력이 권장보다 높을수록 보스가 더 단단하고 아파져요 (잘 외운 친구도 도전이 되게) */
  /* 어려움·지옥: 지금 전투력(판 안에서 레벨 업·스킬로 오른 것까지)이 그 시점에 예상되는 전투력보다 높을수록 보스·몬스터가 더 단단하고 아파져요 */
  const GROW=[1.25,1.8,2.5,3.2], PCAP=[[1.6,1.15],[4,1.7],[4.5,1.85]];
  const padapt=()=>{ const now=(g&&g.livePow)||heroPower(HERO.id), Gm=(g?(g.stageN>=1?GROW[Math.min(3,g.stageN-1)]:1+Math.min(.25,(g.t||0)/240)):1), r=Math.sqrt(now/Math.max(1,recPower(MAP.id,MAP.dif)))/Gm;   /* 큰 수 전투력은 제곱이라 제곱근으로 비교 */
    if(r<=1) return {hp:1,dmg:1,r}; const cap=PCAP[MAP.dif]; return {hp:Math.min(cap[0],Math.pow(r,MAP.dif?1:.8)), dmg:Math.min(cap[1],Math.pow(r,MAP.dif?.45:.3)), r} };
  let PADAPT={hp:1,dmg:1,r:1}; const g0eng={regen:0}; { const CB=cardBonusSum(), EB=engraveBonus(HERO.id); CB.dmg=(CB.dmg||0)+KP.dmg; CB.armor=(CB.armor||0)+KP.armor; CB.cd=(CB.cd||0)+KP.cd; for(const k in EB) if(k!=="regen") CB[k]=(CB[k]||0)+EB[k]; g0eng.regen=EB.regen||0; if(CB.hp) bonusHp+=HERO.hp*CB.hp; if(CB.spd) M.spd*=1+CB.spd; if(CB.armor) M.armor*=1-CB.armor; if(CB.xp) M.xp*=1+CB.xp; if(CB.dmg) M.dmg*=1+CB.dmg; if(CB.cd) M.cd*=1-CB.cd; if(CB.mag) M.mag*=1+CB.mag; if(CB.crit) M.crit+=CB.crit }   // 보스 카드 수집 보너스
  const spdMul = 1+STAT.spd*Math.min(HSt.spd,STAT.spdMax); M.cd/=spdMul; M.spd*=spdMul;
  const F = {}; SKL.forEach(k=>{ if(k.flag) F[k.flag]=true; if(k.flag2) F[k.flag2]=true });
  const ACT = SKL.filter(k=>k.type!=="passive"&&k.type!=="aura").map(k=>Object.assign({},k,{t:k.cd*.5}));
  const lvScale = 1+HSt.lv*0.01;
  g.p.hp = HERO.hp+bonusHp;
  spawnSummons();
  g.jl={}; g.cloneMul=1; g.pow0=heroPower(HERO.id); g.lpPrev=g.pow0; g.livePow=g.pow0;
  window.__t5=HSt.tier>=5?HERO.id:"";
  (function(){ if(typeof SKILL_IMG==="undefined") return; const O=window.__skOrig||(window.__skOrig={}); for(const k in O){ SKILL_IMG[k]=O[k]; delete O[k] }
    const tint=(k,f)=>{ const im=SKILL_IMG[k]; if(!im||!im.width) return null; try{ const cv=document.createElement("canvas"); cv.width=im.width; cv.height=im.height; const c2=cv.getContext("2d"); c2.filter=f; c2.drawImage(im,0,0); return cv }catch(e){ return null } };
    const AL={thief:{star:"star5"},pirate:{octo:"shark5"},mage:{ifrit:"ifrit5"},archer:{fly_windbird:"fly_windbird5"},healer:{rabbit:"rabbit5"},zodiac:{dragon:"dragon5",charmfx:"orb5"},mech:{rocketfist:"fist5shot",drone:"drone5",robot:"robot5",robotfb:"robotfb5"}}[window.__t5]||{};
    for(const k in AL) if(SKILL_IMG[AL[k]]){ O[k]=SKILL_IMG[k]; SKILL_IMG[k]=SKILL_IMG[AL[k]] }
    if(window.__t5==="pirate"&&SKILL_IMG.shark5){ const T=tint("shark5","brightness(1.55) saturate(1.6) hue-rotate(-6deg)"); if(T){ if(!O.octo) O.octo=SKILL_IMG.octo; SKILL_IMG.octo=T } }   /* 상어를 더 밝은 파란색으로 */
    /* 선원: 빨간 옷만 남색·청록으로 (피부·머리·금장식은 그대로) */
    const redToNavy=k=>{ const im=SKILL_IMG[k]; if(!im||!im.width) return null; try{ const cv=document.createElement("canvas"); cv.width=im.width; cv.height=im.height; const c2=cv.getContext("2d"); c2.drawImage(im,0,0); const D=c2.getImageData(0,0,cv.width,cv.height), d=D.data;
      for(let i=0;i<d.length;i+=4){ if(d[i+3]<10) continue; const r=d[i],gg=d[i+1],b=d[i+2], mx=Math.max(r,gg,b), mn=Math.min(r,gg,b), s2=mx?(mx-mn)/mx:0; let h=0; if(mx!==mn){ if(mx===r) h=((gg-b)/(mx-mn))*60; else if(mx===gg) h=(2+(b-r)/(mx-mn))*60; else h=(4+(r-gg)/(mx-mn))*60 } if(h<0) h+=360;
        if((h<14||h>330)&&s2>.5&&r>70){ const v=mx/255, nv=Math.min(1,v*1.05); d[i]=Math.round(30*nv); d[i+1]=Math.round(90*nv+40*(1-s2)); d[i+2]=Math.round(200*nv+30) } }
      c2.putImageData(D,0,0); return cv }catch(e){ return null } };
    if(window.__t5==="pirate") for(const k of ["crew_1","crew_2"]){ const T=redToNavy(k); if(T){ O[k]=SKILL_IMG[k]; SKILL_IMG[k]=T } }
    if(window.__t5==="pirate"&&SKILL_IMG.shark5){ const T=tint("shark5","brightness(1.5) saturate(1.6) hue-rotate(-6deg)"); if(T){ if(!O.octo) O.octo=SKILL_IMG.octo; SKILL_IMG.octo=T } }   /* 상어를 더 밝은 파란색으로 */
  })();
  if(HSt.tier>=5) g.pending.push({t:.8,run:()=>{ showBanner(`${({warrior:"🔥",archer:"⚡",thief:"🌑",mage:"☀️",pirate:"🐋",healer:"🌕",calli:"🖌️",zodiac:"🐉",mech:"🤖"})[HERO.id]||"✨"} 5차 각성 용사 「${JOBS[HERO.id].titles[5]}」 출전!`); g.fx.push({k:"flash",col:"#ff8a2a",life:.6,max:.6}); g.shake=.3; sfx("awaken") }});
  const PK = Object.assign({xp:1,start:0,revive:1,cards:3},HERO.perks||{});
  const QR = qrangeOf(), Q2 = q2rangeOf(), QPOOL = [...new Map([...qpoolOf(QR.w),...q2poolOf(Q2.w)].map(c=>[c.h,c])).values()];
  /* 학습하기에서 공부한 사자성어·속담도 게임 문제에 섞여 나와요 (10문제 중 4문제쯤) */
  const SR = srangeOf(), SPOOL = spoolOf(SR.w);
  /* 넓은 범위를 골랐으면 모든 주차에서 고루고루: 주차를 돌아가며 하나씩 고르고, 그 주차 안에서는 약한 한자가 더 자주 나와요 */
  /* 혼자: 이번 판에 나왔던 한자·사자성어·속담은 다시 안 나와요 (다 나오면 처음부터)
     같이하기: 친구마다 다른 문제가 나오게 한자를 나눠 가져요 (내 몫을 다 쓰면 나머지에서) */
  const ASKED=new Set(); let SLOT=null; const slot=()=>SLOT||(SLOT=(typeof NM!=="undefined"&&NM&&typeof NET!=="undefined")?{me:Math.max(0,(NET.lobby||[]).findIndex(p=>p.id===NET.myId)),n:Math.max(1,(NET.lobby||[]).length)}:{me:0,n:1});
  const hsh=c=>{ let v=0; for(const ch of String(c.h)) v=(v*31+ch.charCodeAt(0))>>>0; return v };
  const mine=c=>{ const S=slot(); return S.n<2||hsh(c)%S.n===S.me };
  const WCY={};
  const spreadPick=(list,n,key)=>{ const grp=c=>(c.cat||"H")+c.w, out=[], used=new Set();
    let pool=list.filter(c=>mine(c)&&!ASKED.has(c.h)); if(!pool.length) pool=list.filter(c=>!ASKED.has(c.h)); if(!pool.length){ for(const c of list) ASKED.delete(c.h); pool=list.filter(mine); if(!pool.length) pool=list }
    const ws0=[...new Set(pool.map(grp))], wn=g0=>+(String(g0).replace(/\D/g,"")||1), mxw=Math.max(...ws0.map(wn)), ws=[];
    for(const w of ws0){ ws.push(w); if(mxw>5&&wn(w)>mxw*.5) ws.push(w); if(mxw>10&&wn(w)>mxw*.8) ws.push(w) }   /* 뒷주차는 덜 외웠을 수 있어 2~3배 자주 나와요 */
    for(let i=0;i<n&&pool.length;i++){ let cy=WCY[key]; if(!cy||!cy.length) cy=WCY[key]=shuffle(ws.slice()); const wk=cy.pop();
      let cand=pool.filter(c=>grp(c)===wk&&!used.has(c.h)); if(!cand.length) cand=pool.filter(c=>!used.has(c.h)); if(!cand.length) cand=list.filter(c=>!used.has(c.h)); if(!cand.length) cand=list;
      const c=pickWeighted(cand,1)[0]; if(c){ used.add(c.h); out.push(c) } } return out };
  const pickMixed = n=>{ let h=spreadPick(QPOOL,n,"q"); if(MAP.id===11){ const P2=q2poolOf(Q2.w); if(P2.length) h=h.map(c=>Math.random()<.6?(spreadPick(P2,1,"q2")[0]||c):c) } let r=h; if(SPOOL.length){ const s=spreadPick(SPOOL,n,"s"); r=h.map((c,i)=>Math.random()<.4&&s[i]?s[i]:c) } r.forEach(c=>c&&ASKED.add(c.h)); return r }; window.__pm=pickMixed;
  if(opts.mp) M.xp *= .7;
  M.xp *= PK.xp; g.revives = PK.revive + QR.revive + (SR.revive||0); g.qOk=0; g.qN=0;
  shuffle(Object.keys(SK).filter(k=>k!=="main"&&SK[k].t==="w"&&skOK(k,MAP.id))).slice(0,PK.start).forEach(k=>g.sk[k]=1);
  const st = ()=>({dmg:M.dmg*(1+.15*lv("str"))*(1-CONF_V*(g.conf||0)), cd:Math.max(.4,M.cd*(1-.09*lv("qi"))*(1+CONF_V*(g.conf||0))), spd:165*HERO.spd*M.spd*(g.bbuff?g.bbuff.spd:1)*(1+.1*lv("spd")), maxHp:HERO.hp+bonusHp+20*lv("body"), mag:110*M.mag*(1+.4*lv("pull"))});

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
      ["qs",()=>g.qskip?"📝 카드·오리진 문제 건너뛰기: 켜짐":"📝 카드·오리진 문제 건너뛰기: 꺼짐",()=>{ g.qskip=!g.qskip }],
      ["lv1",()=>"⬆ 레벨 +1",()=>{ g.xp+=g.need }],
      ["lv5",()=>"⏫ 레벨 +5",()=>{ let n=0,L=g.lvl; for(let i=0;i<5;i++){ n+=needXP(L+i) } g.xp+=n }],
      ["lv10",()=>"🚀 레벨 +10",()=>{ let n=0,L=g.lvl; for(let i=0;i<10;i++){ n+=needXP(L+i) } g.xp+=n }],
      ["t60",()=>"⏩ 시간 +1분",()=>{ g.t+=60; if(g.nextBossT!==undefined&&!g.bossUp) g.nextBossT+=0; showBanner("⏩ 1분 앞으로! 몬스터가 더 세져요") }],
      ["boss",()=>g.bossUp?"👑 보스 체력 → 1":"👑 다음 보스 바로 부르기",()=>{ if(g.bossUp){ for(const e of g.en) if(e.type==="boss"&&e.hp>1) e.hp=1 } else if(g.stageN<4){ g.nextBossT=g.t+.5; g.bossWarn=g.stageN } }],
      ...([0,1,2,3].map(i=>["sb"+i,()=>`${["🐣","⚔","🔥","👑"][i]} ${(STAGE_TIER[i]||{tn:"최종 보스"}).tn} 바로 부르기 · ${(BOSSES[(STAGE[MAP.id]||[])[i]]||{}).name||""}`,()=>{   // 원하는 보스를 골라서 바로 불러요
        if(NM){ showBanner("같이하기에서는 쓸 수 없어요"); return } g.en=g.en.filter(e=>e.type!=="boss"); g.eshots=[]; g.stageN=i; g.bossWarn=i; g.bossUp=true; STAGE_PH=Math.min(3,i); spawnBoss(STAGE[MAP.id][i]); setVph(Math.min(3,i+1)) }])),
      ["ult",()=>"💢 보스 필살기 보기",()=>{ for(const e of g.en) if(e.type==="boss"&&e.hp>0){ e.hp=Math.min(e.hp,e.max*.49); e.ultDone=false; e.bt=0 } }],
      ["weak",()=>"🎯 보스 약점 한자 띄우기",()=>{ const e=g.en.find(x=>x.type==="boss"&&x.hp>0); if(!e){ showBanner("먼저 보스를 불러 주세요"); return } closeWeak(); openWeak(e); tb.hidden=true }],
      ["minion",()=>"👥 보스 부하 부르기",()=>{ const e=g.en.find(x=>x.type==="boss"&&x.hp>0); if(!e){ showBanner("먼저 보스를 불러 주세요"); return } const T=BOSS_SKILLS[MAP.id]&&BOSS_SKILLS[MAP.id][(BOSSES[e.bid]||{}).tier||0], sk=T&&T.k.find(x=>x[0]==="summon"); e.atk={k:"summon",t0:g.t,wind:0,sp:1,ult:0,name:sk?sk[1]:"부하 부르기"}; bossAct(e,"summon",g.p,x=>x,{n:1,cd:1,sp:1},BOSSES[e.bid]||{}); tb.hidden=true }],
      ["warp",()=>"🌀 보스 순간이동 보기",()=>{ const e=g.en.find(x=>x.type==="boss"&&x.hp>0); if(!e){ showBanner("먼저 보스를 불러 주세요"); return } e.x=g.p.x+W; e.y=g.p.y; e.gapCD=0; e.farT=1; tb.hidden=true }],
      ["ovc",()=>"🏅 오답 극복 연출 보기",()=>{ const c=QPOOL[Math.random()*QPOOL.length|0]; if(c&&typeof overcomeFx==="function") overcomeFx(c); tb.hidden=true }],
      ["clear",()=>"🧹 몬스터 모두 없애기",()=>{ g.en=g.en.filter(e=>e.type==="boss"); }]];
    const render=()=>{ const sy=tb.scrollTop; tb.innerHTML=`<div class="tbjump"><button data-j="boss">👑 보스 부르기 ▾</button><button data-j="top">▲ 맨 위</button></div>`+(NM?"":`<b class="tbh">🔄 용사 바꿔서 같은 맵 다시 시작</b><div class="tbheroes">${HEROES.map(h=>`<button data-hero="${h.id}" class="${h.id===HERO.id?"on":""}">${avaHtml(h.id,30)}<span>${h.name.replace(/^\S+ /,"")}</span></button>`).join("")}</div>`)+acts.map(([k,l])=>`<button data-k="${k}">${l()}</button>`).join("")+`<small>선생님 확인용 · 기록에는 그대로 남아요</small>`;
      tb.querySelectorAll("[data-hero]").forEach(b=>b.onclick=ev=>{ ev.stopPropagation(); const id=b.dataset.hero; if(id===HERO.id) return; const cur=HS(); P.hero=id; const n=HS(id); n.tier=Math.max(n.tier||0,cur.tier||0); n.lv=Math.max(n.lv||1,cur.lv||1); saveP(); if(typeof refreshHeroSprites==="function") refreshHeroSprites(h=>((P.hl||{})[h]||{}).tier); cleanup(); startGame() });   /* 전직 단계를 옮겼으니 그림도 새로 */
      tb.querySelectorAll("button[data-k]").forEach(b=>b.onclick=ev=>{ ev.stopPropagation(); const a=acts.find(x=>x[0]===b.dataset.k); a[2](); render() });
      tb.querySelectorAll("[data-j]").forEach(b=>b.onclick=ev=>{ ev.stopPropagation(); if(b.dataset.j==="top") tb.scrollTo({top:0,behavior:"smooth"}); else { const t=tb.querySelector('[data-k="sb0"]'); if(t) tb.scrollTo({top:t.offsetTop-50,behavior:"smooth"}) } });
      tb.scrollTop=sy };
    btn.onclick=ev=>{ ev.stopPropagation(); tb.hidden=!tb.hidden; if(!tb.hidden) render() };
    g.god=true; g.qskip=true }

  function showBanner(txt){ banner.textContent=txt; banner.hidden=false; clearTimeout(showBanner.t); showBanner.t=setTimeout(()=>banner.hidden=true,2600) }

  // 생성
  const dmgMul = (MAP.hp>1?1+(MAP.hp-1)*.35:1)*(MAP.dmgX||1);
  const RESCUE = 3+Math.max(0,MAP.id-5)*.5;   // 높은 맵일수록 친구 살리기가 오래 걸려요
  function edgePos(){ const m=40, side=Math.random()*4|0, u=Math.random();
    return [ side<2?(u-.5)*(W+2*m):(side===2?-1:1)*(W/2+m), side<2?(side===0?-1:1)*(H/2+m):(u-.5)*(H+2*m) ] }
  function addMob(m,x,y,hpMul,elite){ const S=SIZE[m.size], PM=PH_MUL[phaseOf(g.t)], TT=g.t*.72, sc=(1+TT/45+Math.pow(TT/125,2))*PM.hp;
    const e={mapId:MAP.id,type:m.size==="big"?"big":"mob",look:m.look,c:m.v?m.v[Math.random()*m.v.length|0]:m.c,hue:m.hv?m.hv[Math.random()*m.hv.length|0]:0,name:m.name,x,y,r:S.r,hp:S.hp*MAP.hp*sc*(hpMul||1)*Math.sqrt(PADAPT.hp),max:0,sp:S.sp*MAP.spd,dmg:S.dmg*dmgMul*1.2*(1+TT/190),xp:S.xp,slow:0,flash:0,stoneCD:0,wob:Math.random()*6};
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
    if(MAP.id>=3&&MAP.id<=5){ // 지상 맵 위험: 3 유적 낙석 · 4 종유석 · 5 지옥불 기둥 (맵이 높을수록 많고 아파요)
      const C={3:["rock",2,14,15,"🪨 유적 돌이 떨어져요! 빨간 원을 피해요!","#c8a070"],4:["crystal",3,18,13,"💎 수정 가시가 솟아요! 빨간 원을 피해요!","#8ad8ff"],5:["fire",4,24,11,"🔥 지옥불 기둥이 솟아요! 빨간 원을 피해요!","#ff7a2a"]}[MAP.id];
      g.hzT=C[3]-ph*.8+Math.random()*3; sfx("alarm");
      for(const q of T0){ for(let i=0;i<C[1]+Math.min(2,ph);i++){ const x=q.x+(Math.random()-.5)*300, y=q.y+(Math.random()-.5)*220, at=1.3+i*.22;
        g.fx.push({k:"warn",x,y,r:55,life:at,max:at}); g.fx.push({th:C[0],k:"meteor",x,y,life:at,max:.45});
        g.pending.push({t:at,run:()=>{ sfx("boom"); aoeC(x,y,55,C[2]*(1+g.t*.72/200)*(1+ph*.15)); g.fx.push({th:C[0],k:"boom",x,y,r:55,col:C[5],life:.4,max:.4}) }}) } }
      if(!g.hzMsg){ g.hzMsg=1; say(C[4],"alarm") } return }
    if(MAP.id===8){ g.hzT=8-ph*.8+Math.random()*2; sfx("alarm"); for(const q of T0){ for(let i=0;i<3+Math.min(3,ph);i++){ const x=q.x+(Math.random()-.5)*320, y=q.y+(Math.random()-.5)*240, at=1.2+i*.2;
        g.fx.push({k:"warn",x,y,r:55,life:at,max:at}); g.fx.push({th:"ice",k:"meteor",x,y,life:at,max:.45}); g.pending.push({t:at,run:()=>{ sfx("boom"); aoeC(x,y,55,26*(1+g.t*.72/150)*(1+ph*.15)); g.fx.push({th:"ice",k:"boom",x,y,r:55,col:"#bfe8ff",life:.4,max:.4}) }}) } }
      if(!g.icMsg){ g.icMsg=1; say("🧊 고드름이 떨어져요! 빨간 원을 피해요!","alarm") } return }
    if(MAP.id===9){ g.hzT=16-ph*2+Math.random()*3; const c=teamMid(T0), sx=c.x+(Math.random()-.5)*240/safeMul(), sy=c.y+(Math.random()-.5)*180/safeMul(), SR=200*safeMul(), at=2.6;
      g.fx.push({k:"safe",sun:1,x:sx,y:sy,r:SR,life:at,max:at}); say("⚡ 신의 심판! 빛의 원 안으로 들어가요!","alarm");
      g.pending.push({t:at,run:()=>{ g.fx.push({k:"flash",col:"#e8d8ff",life:.5,max:.5}); g.shake=.5; sfx("boom");
        const hurtIf=(q)=>{ if((q.x-sx)**2+(q.y-sy)**2>SR*SR) return true; return false };
        if(hurtIf(g.p)) hitPlayer(40*(1+ph*.25)); evAll({t:"judg",x:Math.round(sx),y:Math.round(sy),r:SR,d:Math.round(40*(1+ph*.25))});
        for(let i=0;i<14;i++){ const a=i/14*Math.PI*2, R=SR+80+Math.random()*200; g.fx.push({k:"bolt",bt:"map",x:sx+Math.cos(a)*R,y:sy+Math.sin(a)*R,life:.35,max:.35}) } }}); return }
    if(MAP.id===10){ g.hzT=9-ph+Math.random()*2; for(const q of T0){ for(let i=0;i<4+ph;i++){ const x=q.x+(Math.random()-.5)*380, y=q.y+(Math.random()-.5)*280, at=1.1+i*.15;
        g.fx.push({k:"warn",x,y,r:60,life:at,max:at}); g.fx.push({th:"star",k:"meteor",x,y,life:at,max:.45}); g.pending.push({t:at,run:()=>{ sfx("boom"); aoeC(x,y,60,30*(1+g.t*.72/150)*(1+ph*.15)); g.fx.push({th:"star",k:"boom",x,y,r:60,col:"#c8a0ff",life:.4,max:.4}) }}) } }
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
    if(left<=0){ g.bossUp=true; spawnBoss(STAGE[MAP.id][g.stageN]); setVph(Math.min(3,g.stageN+1)) } }
  function setVph(v){ if(v===VPH) return; VPH=v; VPH_T=g.t; const D=(WEATHER[MAP.id]||[])[v]; if(D) g.pending.push({t:2.2,run:()=>showBanner(D[0])}) }
  function stageBossDown(e){ // 호스트(혼자)에서만: 보스를 잡으면 다음 단계로
    const B=BOSSES[e.bid]; if(!B||B.tier===undefined) return;
    g.bossUp=false; g.stageN=Math.min(4,g.stageN+1); STAGE_PH=Math.min(3,g.stageN);
    if(g.stageN>=4){ say(`🏆 ${MAP.name} 스테이지 클리어!`,"win"); g.pending.push({t:2.2,run:()=>{ NM?endAll(true):finish(true) }}); return }
    g.nextBossT=g.t+BOSS_GAP[g.stageN-1] }
  function spawnBoss(id){ const B=BOSSES[id], [sx,sy]=edgePos(), A=NM?randPlayer():g.p;
    PADAPT=padapt(); g.padMax=Math.max(g.padMax||1,PADAPT.hp); if(PADAPT.r>1.15) g.fx.push({k:"label",x:g.p.x,y:g.p.y-120,text:`🔥 강한 용사 감지! 보스 체력 ×${PADAPT.hp.toFixed(1)}`,life:2.2,max:2.2});
    const e={mapId:MAP.id,type:"boss",bid:id,look:B.look,c:B.c,crown:B.crown,name:B.name,x:A.x+sx,y:A.y+sy,r:B.r*1.2,hp:B.hp*MAP.hp*1.15*(MAP.bossX||1)*1.15*(qrangeOf().w===5?1.1:1)*PADAPT.hp*(1+g.t*.72/200)*(NM?CO.bossBase*(1+CO.boss*(nPlayers()-1)):1),id:nid++,di:-1-BKEYS.indexOf(id),max:0,sp:B.sp*MAP.spd,dmg:B.dmg*dmgMul*1.05*(MAP.bossDmgX||1)*PADAPT.dmg,xp:5,
      slow:0,flash:0,stoneCD:0,wob:0,ai:B.ai,bt:2.5,bi:0,buff:B.buff,minion:B.minion,big:B.big};
    if(NM){ e.dmg*=CO.dmg; e.sp*=1.08 } e.max=e.hp; g.en.push(e); say(B.tier===3?`👑 최종 보스 등장! ${B.name}`:`${B.tn?B.tn+" 등장! ":"보스 등장! "}${B.name}`,"boss"); if(B.tier===3){ g.fx.push({k:"flash",col:"#ff3a4a",life:.7,max:.7}); stamp("최종<br>보스!") } g.pending.push({t:1.6,run:()=>{ g.duelQ=e; evAll({t:"duel",id:e.id}) }}); g.shake=.4; SND.setIntensity(1) }
  function absorb(x){ if(g.shield>0){ const a=Math.min(g.shield,x); g.shield-=a; x-=a; if(a>0) g.fx.push({k:"ring",x:g.p.x,y:g.p.y-6,life:.25,max:.25}) } return x }
  function healMe(v){ const P=g.p, s=st(); if(P.dead||v<=0||g.healBlk>g.t) return; const b=P.hp; P.hp=Math.min(s.maxHp,P.hp+v); g.healAcc=(g.healAcc||0)+(P.hp-b); if(g.healAcc>=1&&(!g.healT||g.t-g.healT>.6)){ g.fx.push({k:"num",x:P.x,y:P.y-46,v:Math.round(g.healAcc),me:true,life:.8,max:.8}); g.healAcc=0; g.healT=g.t } }
  function healArea(x,y,r,pct,shield){ const P=g.p; if(!P.dead&&(P.x-x)**2+(P.y-y)**2<r*r){ healMe(st().maxHp*pct); if(shield){ g.shield=Math.max(g.shield||0,st().maxHp*shield); g.shieldT=4 } } }
  function healPulse(x,y,r,pct,shield){ healArea(x,y,r,pct,shield); g.fx.push({k:"healp",x,y,r,pct,sh:shield||0,life:.6,max:.6}) }   // 친구들에게도 전해져요
  function hitPlayer(d){ const P=g.p; if(g.god||P.inv>0||P.dead) return; d*=(1-.06*lv("bguard"));d*=1+CONF_V*(g.conf||0); sfx("hurt"); for(const b of g.en) if(b.type==="boss"&&b.sigUntil>g.t) b.sigHit=1; d=absorb(d*M.armor)/M.armor; P.hp-=d*M.armor; g.dmgIn=(g.dmgIn||0)+d*M.armor; g.fx.push({k:"num",x:P.x,y:P.y-40,v:-Math.round(d*M.armor),me:true,life:.8,max:.8}); P.inv=.5; g.fx.push({k:"hit",x:P.x,y:P.y,life:.25,max:.25}); g.shake=Math.max(g.shake,.15) }
  function NM_CLIENT(){ return typeof NET!=="undefined"&&NET.role==="client" }
  /* 보스 부하: 돌격형은 빨간 줄 경고 뒤 달려들고, 원거리형은 떨어져서 구슬을 던져요 */
  function minionAI(e,T,dx,dy,d,dt){ e.mT-=dt; if(e.mT>0||e.rush&&e.rush.t>0) return;
    if(e.mk==="rush"&&d<560){ e.mT=3.6; const a=Math.atan2(dy,dx); g.fx.push({k:"laserwarn",x:e.x,y:e.y,a,w:e.r+10,len:Math.round(e.sp*3.4*.55)+e.r,life:.7,max:.7}); e.hold=.7; g.pending.push({t:.7,run:()=>{ if(e.hp>0) e.rush={t:.55,vx:Math.cos(a)*3.4,vy:Math.sin(a)*3.4} }}) }
    else if(e.mk==="ranged"&&d<640){ e.mT=2.8; const a=Math.atan2(dy,dx); g.eshots.push({x:e.x,y:e.y,vx:Math.cos(a)*250,vy:Math.sin(a)*250,r:10,dmg:e.dmg*.8,life:3,col:e.mc,kind:"orb"}) }
    else e.mT=.5 }
  /* 보스가 던지는 것들은 2.5초 동안 살짝 따라와요 (숫자가 클수록 잘 꺾여요) */
  const HOMEK={bat:1.4,acorn:1.1,pearl:1.1,rock:.9,fire:.9,spore:.7};
  /* 연속 돌진: 한 번 돌진이 끝난 자리에서 다시 나를 겨눠 빨간 띠 → 돌진 (띠와 실제 돌진이 꼭 맞아요) */
  function chainDash(e,TP,o){ const step=i=>{ if(e.hp<=0) return; if(i>=o.n){ o.end&&o.end(); return } const q=TP(), a=Math.atan2(q.y-(e.y-e.r*BOSS_DY),q.x-e.x); e.rollA=a; e.aimHold=o.aim; e.dsx=e.x; e.dsy=e.y;
      g.fx.push({k:"laserwarn",x:e.x,y:e.y-e.r*BOSS_DY,a,w:e.r+12,len:o.sp*o.dur+e.r,life:o.aim,max:o.aim});
      g.pending.push({t:o.aim,run:()=>{ if(e.hp<=0) return; const sx=e.dsx, sy=e.dsy; e.x=sx; e.y=sy; e.dash=o.dur; e.dvx=Math.cos(a)*o.sp; e.dvy=Math.sin(a)*o.sp; o.onDash&&o.onDash(a,sx,sy); g.pending.push({t:o.dur+o.gap,run:()=>step(i+1)}) }}) };
    g.pending.push({t:o.pre||0,run:()=>step(0)}); e.bt=Math.max(e.bt||0,(o.pre||0)+o.n*(o.aim+o.dur+o.gap)+(o.tail||.8)) }
  function bossAI(e,dt){
    const P=NM?nearestPlayer(e.x,e.y):g.p, TP=()=>NM?nearestPlayer(e.x,e.y):g.p;
    if(e.dash>0){ const st=Math.min(dt,e.dash); e.dash-=dt; e.x+=e.dvx*st; e.y+=e.dvy*st; if(Math.random()<.5) g.fx.push({k:"hit",x:e.x,y:e.y,life:.15,max:.15}) }
    if(e.aimHold>0){ e.aimHold-=dt; if(!(e.dash>0)) return }   // 돌진 조준 중: 빨간 띠 위치 그대로 멈춰 있어요
    if(e.dizzy>0) e.dizzy-=dt;
    if(e.jump){ const J=e.jump; J.t+=dt; const k=Math.min(1,J.t/J.dur); e.x=J.sx+(J.tx-J.sx)*k; e.y=J.sy+(J.ty-J.sy)*k; e.airH=Math.sin(k*Math.PI)*J.h; e.air=k<.92;
      if(k>=1){ e.jump=null; e.air=false; e.airH=0; aoeC(e.x,e.y,J.r,J.dmg); sfx("quake"); g.shake=Math.max(g.shake,.35); g.fx.push({th:e.th,k:"quake",x:e.x,y:e.y,r:J.r*1.2,life:.5,max:.5}); g.fx.push({k:"slimepud",x:e.x,y:e.y,r:J.r,col:J.col,life:2.5,max:2.5}) } }
    if(e.burrow){ const B=e.burrow; B.t+=dt; const q=TP(); if(B.t<B.move){ const dx=q.x-e.x, dy=q.y-e.y, d=Math.hypot(dx,dy)||1; const v=Math.min(d,e.sp*1.25*dt); e.x+=dx/d*v; e.y+=dy/d*v; if(Math.random()<.4) g.fx.push({k:"dust",x:e.x,y:e.y+e.r*.6,life:.4,max:.4}) }
      else if(!B.warned){ B.warned=1; g.fx.push({k:"warn",x:e.x,y:e.y,r:B.r,life:B.fuse,max:B.fuse}) }
      if(B.t>=B.move+B.fuse){ e.burrow=null; e.hidden=false; aoeC(e.x,e.y,B.r,B.dmg); sfx("quake"); g.shake=.55; g.fx.push({k:"boom",th:"rock",x:e.x,y:e.y,r:B.r,life:.4,max:.4}); e.stun=Math.max(e.stun||0,1.3); e.dizzy=1.3 } return }
    if(e.spinT>0){ e.spinT-=dt; const q=TP(), dx=q.x-e.x, dy=q.y-e.y, d=Math.hypot(dx,dy)||1, v=e.sp*1.5; e.x+=dx/d*Math.min(d,v*dt); e.y+=dy/d*Math.min(d,v*dt);
      e.spinShot=(e.spinShot||0)-dt; if(e.spinShot<=0){ e.spinShot=.95; const o=Math.random()*6.28; for(let i=0;i<6;i++){ const a=o+i*Math.PI/3; g.eshots.push({th:"rock",x:e.x,y:e.y,vx:Math.cos(a)*170,vy:Math.sin(a)*170,r:11,dmg:e.dmg*.4,life:2.2,col:"#a08a6a",kind:"rock"}) } }
      if(e.spinT<=0){ e.spin=false; e.stun=Math.max(e.stun||0,1); e.dizzy=1 } return }
    if(e.minWatch&&g.t-e.minT0>.6&&(e.minChk=(e.minChk||0)-dt)<=0){ e.minChk=.25; if(!g.en.some(o=>o.minOf===e.id&&o.hp>0)){ e.minWatch=0; e.stun=Math.max(e.stun||0,2.2); say(`✨ 부하를 모두 물리쳤어요! ${e.name}이(가) 잠깐 기절했어요. 지금 공격!`,"chest"); g.fx.push({k:"label",x:e.x,y:e.y-e.r*2.2,text:"빈틈! 기절",life:1.6,max:1.6}) } }
    if(e.stun>0) return;
    /* 화면 밖으로 멀어지면 플레이어 곁으로 순간이동해요 (도착 자리에 보라색 경고 원이 먼저 떠요) */
    if(!e.jump&&!e.burrow&&!(e.spinT>0)&&!e.warpT){ const q=TP(), dx=e.x-q.x, dy=e.y-q.y, off=Math.abs(dx)>W*.5-30||Math.abs(dy)>H*.5-30||Math.hypot(dx,dy)>700;
      e.farT=off?(e.farT||0)+dt:0; e.gapCD=(e.gapCD||0)-dt;
      if(e.farT>.8&&e.gapCD<=0){ e.farT=0; e.gapCD=4; const d=Math.hypot(dx,dy)||1, tx=q.x+dx/d*Math.min(170,W*.3), ty=q.y+dy/d*Math.min(130,H*.25), R=Math.max(80,e.r*1.3);
        e.warpT=1.05; e.bt=Math.max(e.bt,1.5); g.fx.push({k:"warn",x:tx,y:ty,r:R,life:.95,max:.95}); g.fx.push({k:"label",x:tx,y:ty-R-14,text:"보스가 와요!",life:.95,max:.95});
        g.pending.push({t:.95,run:()=>{ if(e.hp<=0) return; e.x=tx; e.y=ty; aoeC(tx,ty,R,e.dmg*.4); g.fx.push({k:"boom",x:tx,y:ty,r:R,col:"#b48cff",life:.45,max:.45}); g.fx.push({k:"ring",x:tx,y:ty,life:.5,max:.5}); g.shake=Math.max(g.shake,.25); sfx("boom") }}) } }
    if(e.warpT){ e.warpT=Math.max(0,e.warpT-dt); return }
    e.bt-=dt; if(e.bt>0) return;
    if(!e.enraged && e.hp<e.max*.5 && SIGSPLIT(e)){ const m=(MOBS[MAP.id]||[]).find(x=>x.look===e.look)||MOBS[MAP.id][0]; for(const s of [-1,1]){ addMob(m,e.x+s*e.r*1.6,e.y,5,true) } say(`${e.name}이(가) 작은 슬라임 둘로 갈라졌어요!`,"alarm"); g.fx.push({k:"ring",x:e.x,y:e.y,life:.6,max:.6}) }
    if(e.awake){ e.awT=(e.awT||0)-dt; if(e.awT<=0){ e.awT=1.1; g.fx.push({k:"boom",x:e.x,y:e.y,r:e.r*1.6,col:"#e9475f",life:.5,max:.5}) } }
    if(!e.enraged && e.hp<e.max*.5){ e.enraged=true; e.sp*=1.3; say(`${e.name}이(가) 분노했어요! 스킬을 더 자주 써요!`,"enrage"); g.shake=.5; g.fx.push({k:"flash",col:"#e9475f",life:.5,max:.5}) }
    const SKT=(typeof BOSS_SKILLS!=="undefined"&&BOSSES[e.bid]&&BOSSES[e.bid].tier!==undefined)?BOSS_SKILLS[MAP.id]&&BOSS_SKILLS[MAP.id][BOSSES[e.bid].tier]:null;
    const PW=(()=>{ const k=(Math.min(10,Math.max(1,MAP.id))-1)/9, D=[[1.08,.95,1.03],[1.38,.76,1.13],[1.45,.72,1.15]][MAP.dif||0], F=MAP.id>=10?[1.12,.9,1.05]:MAP.id===5?[1.1,.92,1.04]:[1,1,1]; const C=NM?nPlayers()-1:0; return {n:(1+.5*k)*D[0]*F[0]*(1+.1*C), cd:(1-.2*k)*D[1]*F[1]*(1-.05*C), sp:(1+.2*k)*D[2]*F[2]} })();   // 맵이 올라갈수록 탄 개수↑ · 쉬는 시간↓ · 탄 속도↑ (경고 시간은 그대로)
    let act, skName;
    if(SKT&&e.enraged&&SKT.ult&&!e.ultDone){ e.ultDone=true; act=SKT.ult[0]; skName=SKT.ult[1]; e.isUlt=true }
    else if(SKT){ const pick=SKT.k[e.bi++%SKT.k.length]; act=pick[0]; skName=pick[1]; e.isUlt=false }
    else { act=e.ai[e.bi++%e.ai.length]; e.isUlt=false }
    { const XP=bossExtra(MAP.id,(BOSSES[e.bid]||{}).tier||0); if(XP.length&&!e.isUlt&&(e.xn=(e.xn||0)+1)%(e.enraged||MAP.dif===2||MAP.id>=10||MAP.id===5?2:3)===0){ const x=XP[(e.xi=(e.xi||0)+1)%XP.length]; act=x[0]; skName=x[1] } }
    // 어려움·지옥: 고유 패턴을 더 자주 써요
    if((MAP.dif||MAP.id>=10||MAP.id===5)&&SKT&&!e.isUlt){ const sg=SKT.k.find(x=>SIG[x[0]]||x[0]==="bigjump3"); if(sg&&act!==sg[0]&&Math.random()<(MAP.dif===2?.5:MAP.dif?.45:.25)){ act=sg[0]; skName=sg[1] } }
    // 지옥: 체력이 절반 아래면 각성해요 (붉은 기운 · 쉬는 시간이 짧아져요)
    if(MAP.dif===2&&e.enraged&&!e.awake){ e.awake=true; say(`🔥 ${e.name}이(가) 각성했어요! 패턴을 두 번씩 써요!`,"enrage"); g.fx.push({k:"flash",col:"#ff3a3a",life:.6,max:.6}); g.shake=.6 }
    e.bt=(e.big?2.2:2.8)*(e.enraged?.65:1)*PW.cd*(e.awake?.85:1);
    const N=x=>Math.max(1,Math.round(x*PW.n*(e.isUlt?1.5:1)));   // 탄 개수: 맵·단계가 높을수록 많아요
    const isSp=e.isUlt||!(typeof BASIC_ATK!=="undefined"&&BASIC_ATK[act]);   // 특수 공격은 미리 알려줘요
    e.atk={k:act,t0:g.t,wind:e.isUlt?1.4:isSp?1.0:.45,sp:isSp?1:0,ult:e.isUlt?1:0};   // 공격 모션 (기 모으기 → 내지르기)
    e.bt=Math.max(e.bt,e.atk.wind+.75);   // 알림이 끝나기 전에 다음 공격이 겹치지 않게
    if(e.isUlt){ g.fx.push({k:"flash",col:"#ffffff",life:.5,max:.5}); g.shake=.6; stamp("필살기!"); say(`⚠ ${e.name}의 필살기 「${skName}」!`,"enrage"); e.bt+=1.2 }
    const SN={stomp:"땅 울리기",summon:"부하 소환",spore:"독 포자",rock:"바위 던지기",dash:"돌진",fire3:"화염탄",fire5:"화염 폭풍",meteor:"운석 낙하",rage:"광폭의 포효",orbs:"마력 구슬",laser:"파멸의 광선",ring:"사방 탄막"};
    const BX=BOSSES[e.bid]||{};   // 보스마다 기술 이름·색이 달라요
    const nm=skName||(BX.sn&&BX.sn[act])||SN[act]||act; e.atk.name=nm; e.th=themeOf(nm); e.thName=nm;
    sfx(isSp?"alarm":"bosscast"); g.castBan={name:nm,boss:e.name,sp:isSp?1:0,ult:e.isUlt?1:0,t:g.t}; g.fx.push({k:"bosscast",x:e.x,y:e.y-e.r*1.9,text:nm,life:1.3,max:1.3,eid:e.id,ak:act,wd:e.atk.wind,sp:e.atk.sp,ul:e.atk.ult});
    g.pending.push({t:e.atk.wind,run:()=>{ if(e.hp<=0) return; bossAct(e,act,TP(),N,PW,BX);
      // 어려움·지옥: 고유 패턴을 한 번 더 연달아 (경고 시간은 그대로)
      const isSig=SIG[act]||act==="bigjump3"; if(isSig&&(MAP.dif||MAP.id>=10||MAP.id===5)&&Math.random()<(MAP.dif===2?(e.awake?1:(MAP.id>=9?.6:.85)):MAP.dif?.45:.3)){ const gap=Math.max(1.2,e.bt*.75);
        g.pending.push({t:gap,run:()=>{ if(e.hp<=0) return; say(`⚡ ${e.name}: 한 번 더!`,"alarm"); bossAct(e,act,TP(),N,PW,BX) }}); e.bt+=gap } }}) }
  // 보스 검기: 맵(보스) 특징에 맞는 반달 파도가 날아가요 · 지나가며 맞혀요
  function bossWave(e,a,dmg,j){ const sp=560-j*40; g.eshots.push({th:e.th,kind:"wave",x:e.x+Math.cos(a)*e.r*.6,y:e.y+Math.sin(a)*e.r*.6,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,a,r:26-j*5,sz:1-j*.22,dmg,life:1.6,map:MAP.id,pierce:1}) }
  // ===== 위험 패턴: 맵이 올라갈수록 하나씩 늘어나요 (즉사는 아니지만 아주 아파요 · 모두 미리 경고) =====
  const XPAT=[[3,"chase","추격 낙인"],[4,"ringshock","연쇄 충격파"],[5,"carpet","대지 폭격"],[6,"sweep","회전 검기 폭풍"],[7,"wall","검기의 벽"],[8,"doom","멸망의 원"]];
  const XNAME={1:"",2:"",3:"모래",4:"수정",5:"지옥불",6:"폭풍",7:"성광",8:"빙결",9:"뇌신",10:"성좌"};
  function bossExtra(m,tier){ const lim=m-(3-tier); return XPAT.filter(p=>p[0]<=lim).map(p=>[p[1],(XNAME[m]?XNAME[m]+"의 ":"")+p[2]]) }
  function patCol(){ return (typeof WAVE_PAL!=="undefined"&&WAVE_PAL[MAP.id]||["#fff","#ff7a2a"])[1] }
  function xBoom(x,y,r,d,delay){ const th=g.curTh; g.fx.push({k:"warn",x,y,r,life:delay,max:delay}); g.pending.push({t:delay,run:()=>{ sfx("boom"); aoeC(x,y,r,d); g.fx.push({th,k:"boom",x,y,r,col:patCol(),life:.45,max:.45}); g.shake=Math.max(g.shake,.18) }}) }
  // ===== 기술 이름에 맞는 모양: 이름 속 낱말로 탄·폭발·낙하 모양을 골라요 =====
  const TH_KEYS=[["void",["블랙홀","종언","소멸","공허","우주","어둠","저주"]],["planet",["행성","중력"]],["star",["별","성좌","은하","성운","유성"]],
    ["bolt",["번개","뇌","천둥","낙뢰","북"]],["ice",["얼음","빙","냉기","서리","눈보라","고드름","오로라","냉광"]],["light",["빛","성스러운","수호","황금","심판","천상","광선"]],
    ["fire",["불","화염","지옥","진홍","운석","마왕","화"]],["wind",["바람","회오리","폭풍","돌풍","깃털","천풍"]],["flower",["꽃"]],["leaf",["잎","숲","뿌리","덩굴","씨앗","도토리"]],
    ["poison",["독","포자","버섯"]],["crystal",["수정","여의주","초음파"]],["snow",["눈덩이","눈뭉치"]],["rock",["모래","유적","낙석","돌","바위","석상","성벽","대지","땅"]]];
  const MAP_TH={1:"flower",2:"leaf",3:"rock",4:"crystal",5:"fire",6:"wind",7:"light",8:"ice",9:"bolt",10:"star"};
  function themeOf(name){ name=name||""; for(const [k,ws] of TH_KEYS) for(const w of ws) if(name.indexOf(w)>=0) return k; return MAP_TH[MAP.id]||"fire" }
  function SIGSPLIT(e){ const B=BOSSES[e.bid]; if(!B||B.tier===undefined) return false; const S=BOSS_SKILLS[MAP.id]&&BOSS_SKILLS[MAP.id][B.tier]; return !!(S&&S.split) }
  /* ===== 보스 고유 패턴 (맵 1~3) · 4학년 기준: 경고 1초 이상 · 피할 곳 넓게 · 피해는 기존과 비슷 ===== */
  const SIG={
    shellroll(e,P,TP){ e.spin=true; chainDash(e,TP,{n:3,aim:.75,dur:.58,sp:900,gap:.12,onDash:()=>{ sfx("multislash1"); for(let k=0;k<4;k++) g.pending.push({t:k*.1,run:()=>g.fx.push({k:"slimepud",x:e.x,y:e.y+e.r*.5,r:e.r*.7,col:"120,200,90",life:2.2,max:2.2})}) },end:()=>{ e.spin=false }}) },
    beeswarm(e,P){ for(let i=0;i<6;i++){ const a=i*Math.PI/3; g.eshots.push({kind:"bee",x:e.x+Math.cos(a)*e.r*1.3,y:e.y+Math.sin(a)*e.r*1.3,vx:Math.cos(a)*200,vy:Math.sin(a)*200,r:15,dmg:e.dmg*.45,life:4.2,home:.6,hsp:195}) } sfx("phoenix") },
    bigjump(e,P,TP,n){ const R=e.r*1.6; e.bt=1.8*n+.6; for(let i=0;i<n;i++) g.pending.push({t:i*1.7,run:()=>{ if(e.hp<=0) return; const q=TP();
        g.fx.push({k:"warn",x:q.x,y:q.y,r:R,life:1.35,max:1.35}); g.pending.push({t:.35,run:()=>{ if(e.hp>0) e.jump={sx:e.x,sy:e.y,tx:q.x,ty:q.y,t:0,dur:1.0,h:180,r:R,dmg:e.dmg*.9,col:"120,200,90"} }}) }}) },
    acornroll(e,P,TP){ const q=TP(), dir=Math.random()<.5?1:-1, gap=Math.floor(Math.random()*5); e.bt=3; sfx("alarm");
      for(let l=0;l<5;l++){ if(l===gap) continue; const y=q.y+(l-2)*78, x0=q.x-dir*560; g.fx.push({k:"laserwarn",x:x0,y,a:dir>0?0:Math.PI,len:1120,life:1.1,max:1.1});
        g.pending.push({t:1.1+Math.random()*.2,run:()=>{ g.eshots.push({kind:"acorn",x:x0,y,vx:dir*430,vy:0,r:24,dmg:e.dmg*.9,life:3,pierce:1}) }}) } },
    boarcharge(e,P,TP){ chainDash(e,TP,{n:3,aim:.8,dur:.62,sp:1000,gap:.15,tail:2.8,onDash:()=>{ sfx("ox"); g.shake=Math.max(g.shake,.2) },end:()=>{ if(e.hp<=0) return; e.stun=Math.max(e.stun||0,2.6); e.dizzy=2.6; say(`${e.name}이(가) 어지러워해요! 지금 공격해요!`,"ok"); g.fx.push({k:"label",x:e.x,y:e.y-e.r*2,text:"기절! 지금이 기회!",life:1.6,max:1.6}) }}) },
    mushfield(e,P,TP){ const q=TP(), n=8, R=165, off=Math.random(); e.bt=3; for(let i=0;i<n;i++){ const a=off+i/n*6.283, x=q.x+Math.cos(a)*R, y=q.y+Math.sin(a)*R*.85;
        g.fx.push({k:"warn",x,y,r:58,life:1.4,max:1.4}); g.fx.push({k:"mushsprout",x,y,life:1.4,max:1.4});
        g.pending.push({t:1.4,run:()=>{ aoeC(x,y,58,e.dmg); g.fx.push({th:"poison",k:"boom",x,y,r:58,life:.45,max:.45}) }}) } sfx("alarm") },
    rootcross(e,P,TP){ const q=TP(), a0=Math.atan2(q.y-e.y,q.x-e.x), n=6; e.bt=3.2; for(let i=0;i<n;i++){ const a=a0+i*Math.PI*2/n;
        g.fx.push({k:"laserwarn",x:e.x,y:e.y,a,len:640,life:1.2,max:1.2}); g.pending.push({t:1.2,run:()=>{ if(e.hp<=0) return; aoeL(e.x,e.y,a,640,e.dmg*1.1); g.fx.push({k:"roots",x:e.x,y:e.y,a,len:640,life:1.25,max:1.25}) }}) } g.pending.push({t:1.2,run:()=>{ sfx("quake"); g.shake=Math.max(g.shake,.3) }}) },
    jarbomb(e,P,TP){ const q=TP(); e.bt=3; for(let i=0;i<4;i++){ const a=i*Math.PI/2+Math.random()*.8, d=55+Math.random()*95, x=q.x+Math.cos(a)*d, y=q.y+Math.sin(a)*d, at=.35+i*.18;
        g.pending.push({t:i*.18,run:()=>{ g.fx.push({k:"jarfly",x0:e.x,y0:e.y-e.r,x,y,life:.8,max:.8}); g.fx.push({k:"warn",x,y,r:72,life:1.7,max:1.7}) }});
        g.pending.push({t:i*.18+1.7,run:()=>{ aoeC(x,y,72,e.dmg); sfx("boom"); g.fx.push({th:"void",k:"boom",x,y,r:72,life:.45,max:.45}) }}) } },
    burrow(e){ e.bt=4.4; sfx("quake"); g.shake=Math.max(g.shake,.25); g.pending.push({t:.35,run:()=>{ if(e.hp<=0) return; e.hidden=true; e.burrow={t:0,move:1.8,fuse:1.0,r:e.r*2.1,dmg:e.dmg*1.2} }}) },
    // 등껍질 돌진: 빨간 띠로 길을 알려 주고(1.05초) → 팽이처럼 돌며 띠를 따라 돌진 × 3 → 어지러워해요(공격 기회)
    shellspin(e,P,TP){ e.spin=true; say("🐢 등껍질 돌진! 빨간 띠를 피해요","alarm"); chainDash(e,TP,{n:3,pre:.3,aim:1.05,dur:.6,sp:1000,gap:.12,tail:1.8,onDash:()=>{ sfx("ox"); g.shake=Math.max(g.shake,.25) },end:()=>{ e.spin=false; if(e.hp<=0) return; e.stun=Math.max(e.stun||0,1.5); e.dizzy=1.5; g.fx.push({k:"label",x:e.x,y:e.y-e.r*2,text:"어지러워요! 지금이 기회!",life:1.5,max:1.5}) }}) },
    crystalbeam(e,P,TP){ const q=TP(); e.bt=3.4; for(let i=0;i<3;i++){ const a=Math.random()*6.28, px=q.x+Math.cos(a)*240, py=q.y+Math.sin(a)*200; g.pending.push({t:i*.35,run:()=>{ if(e.hp<=0) return; const q2=TP(), b=Math.atan2(q2.y-py,q2.x-px);
        g.fx.push({k:"crystalpillar",x:px,y:py,life:2.2,max:2.2}); g.fx.push({k:"laserwarn",x:px,y:py,a:b,len:760,life:1.2,max:1.2});
        g.pending.push({t:1.2,run:()=>{ aoeL(px,py,b,760,e.dmg*.8); g.fx.push({k:"pbeam",x:px,y:py,a:b,len:760,col:"138,216,255",life:.45,max:.45}); sfx("multislash1") }}) }}) } },
    webtrap(e,P,TP){ const q=TP(); e.bt=3; for(let i=0;i<3;i++){ const a=i*2.09+Math.random(), d=i?110:0, x=q.x+Math.cos(a)*d, y=q.y+Math.sin(a)*d;
        g.fx.push({k:"jarfly",x0:e.x,y0:e.y-e.r,x,y,life:.7,max:.7,web:1}); g.fx.push({k:"warn",x,y,r:70,life:1.1,max:1.1});
        g.pending.push({t:1.1,run:()=>{ aoeC(x,y,70,e.dmg*.6); g.eshots.push({kind:"web",x,y,vx:0,vy:0,r:78,dmg:0,life:5}) }}) } sfx("alarm") },
    batring(e,P,TP){ const q=TP(), n=16, gap=Math.floor(Math.random()*n); e.bt=3.8; const grp={gid:(Math.random()*1e9)|0,ga:(gap+1)/n*6.283}; for(let i=0;i<n;i++){ if(i===gap||i===(gap+1)%n||i===(gap+2)%n) continue; const a0=i/n*6.283;
        g.eshots.push({kind:"bat",lead:i===(gap+3)%n?1:0,orbit:1,cx:q.x,cy:q.y,a0,w:.9,R0:300,dR:-118,ot:0,x:q.x+Math.cos(a0)*300,y:q.y+Math.sin(a0)*300,vx:0,vy:0,r:16,dmg:e.dmg*.9,life:3.1,pierce:1,gid:grp.gid,ga:grp.ga}) }
      g.fx.push({k:"label",x:q.x,y:q.y-120,text:"박쥐 고리의 빈틈으로 빠져나가요!",life:1.6,max:1.6}); sfx("alarm") },
    pearlbounce(e,P,TP){ const q=TP(), a=Math.random()*6.28; e.bt=5.5; g.fx.push({k:"warn",x:e.x,y:e.y,r:46,life:.9,max:.9}); g.pending.push({t:.9,run:()=>{ if(e.hp<=0) return;
        g.eshots.push({kind:"pearl",bounce:1,cx:q.x,cy:q.y,hw:W*.48,hh:H*.46,x:e.x,y:e.y,vx:Math.cos(a)*300,vy:Math.sin(a)*300,r:38,dmg:e.dmg*.75,life:5,pierce:1,hitCD:0}); sfx("ifrit") }}) },
    ghosthounds(e,P,TP){ const q=TP(); e.bt=3.4; for(let i=0;i<3;i++){ const a=i*2.09+Math.random()*.6, sx=q.x+Math.cos(a)*420, sy=q.y+Math.sin(a)*320, b=Math.atan2(q.y-sy,q.x-sx);
        g.fx.push({k:"laserwarn",x:sx,y:sy,a:b,len:840,life:1.15,max:1.15}); g.pending.push({t:1.15,run:()=>{ g.eshots.push({kind:"ghound",x:sx,y:sy,vx:Math.cos(b)*720,vy:Math.sin(b)*720,a:b,r:26,dmg:e.dmg*.5,life:1.3,pierce:1}) }}) } sfx("alarm") },
    triplecleave(e,P,TP){ e.bt=3.6; const base=Math.atan2(TP().y-e.y,TP().x-e.x), R=e.r*5.2, half=.55; [-.75,.75,0].forEach((o,i)=>{ const a=base+o;
        g.pending.push({t:i*.55,run:()=>{ if(e.hp<=0) return; g.fx.push({k:"conewarn",x:e.x,y:e.y,a,half,r:R,life:1.0,max:1.0}) }});
        g.pending.push({t:i*.55+1.0,run:()=>{ if(e.hp<=0) return; coneHit(e.x,e.y,a,half,R,e.dmg*.9); g.fx.push({k:"cleave",x:e.x,y:e.y,a,half,r:R,life:.4,max:.4}); sfx("multislash1"); g.shake=Math.max(g.shake,.2) }}) }) },
    firetiles(e,P,TP){ const q=TP(), S=92, ox=q.x-S*2.5, oy=q.y-S*2; e.bt=4.2; for(let w=0;w<2;w++) for(let i=0;i<5;i++) for(let j=0;j<4;j++){ if((i+j)%2!==w) continue; const x=ox+i*S+S/2, y=oy+j*S+S/2;
        g.pending.push({t:w*1.5,run:()=>{ g.fx.push({k:"tilewarn",x,y,s:S,life:1.2,max:1.2}) }}); g.pending.push({t:w*1.5+1.2,run:()=>{ aoeC(x,y,S*.5,e.dmg*.55); g.fx.push({k:"firepillar",x,y,r:S*.5,life:.7,max:.7}) }}) }
      g.pending.push({t:1.2,run:()=>sfx("bigboom")}); g.pending.push({t:2.7,run:()=>sfx("bigboom")}) },
    safezone(e,P,TP){ const q=NM?teamMid(teamPlayers()):TP(), a=Math.random()*6.28, sx=q.x+Math.cos(a)*190/safeMul(), sy=q.y+Math.sin(a)*150/safeMul(), SR=195*safeMul(), at=2.8; e.bt=4.8;
      g.fx.push({k:"safe",x:sx,y:sy,r:SR,life:at,max:at}); say("☄ 빛나는 원 안으로 들어가요!","alarm");
      for(let i=0;i<10;i++){ const b=Math.random()*6.28, d=SR+60+Math.random()*260; g.pending.push({t:at-.5+i*.05,run:()=>g.fx.push({th:"fire",k:"meteor",x:sx+Math.cos(b)*d,y:sy+Math.sin(b)*d,life:.5,max:.45})}) }
      g.pending.push({t:at,run:()=>{ g.fx.push({k:"flash",col:"#ff7a3a",life:.4,max:.4}); g.shake=.5; sfx("bigboom"); if(!g.p.dead&&(g.p.x-sx)**2+(g.p.y-sy)**2>SR*SR) hitPlayer(e.dmg*.75); evAll({t:"judg",x:Math.round(sx),y:Math.round(sy),r:SR,d:Math.round(e.dmg*.75)}) }}) },
    vortex(e,P,TP){ const q=TP(), a=Math.random()*6.28, x=q.x+Math.cos(a)*170, y=q.y+Math.sin(a)*130; e.bt=4.4; g.fx.push({k:"warn",x,y,r:60,life:.8,max:.8});
      g.pending.push({t:.8,run:()=>{ g.eshots.push({kind:"vortex",x,y,vx:0,vy:0,r:44,pr:300,pull:105,dmg:e.dmg*.6,life:3.2,hitCD:0}); say("🌪 회오리에 빨려 들어가지 않게 반대쪽으로 걸어요!","alarm") }}) },
    stormcloud(e,P,TP){ e.bt=5; for(let i=0;i<3;i++) g.pending.push({t:i*1.2,run:()=>{ if(e.hp<=0) return; const q=TP(), x=q.x+(Math.random()-.5)*30, y=q.y+(Math.random()-.5)*30;
        g.fx.push({k:"cloudwarn",x,y,r:78,life:1.0,max:1.0}); g.pending.push({t:1.0,run:()=>{ aoeC(x,y,78,e.dmg*.6); g.fx.push({k:"bolt",bt:"boss",x,y,life:.3,max:.3}); g.fx.push({th:"bolt",k:"boom",x,y,r:78,life:.35,max:.35}); sfx("thunder") }}) }}) },
    spinbeam(e,P,TP){ const a0=Math.atan2(TP().y-e.y,TP().x-e.x), dir=Math.random()<.5?1:-1; e.bt=6; g.fx.push({k:"laserwarn",x:e.x,y:e.y,a:a0,len:700,life:1,max:1});
      g.pending.push({t:1,run:()=>{ if(e.hp<=0) return; g.eshots.push({kind:"beam",x:e.x,y:e.y,vx:0,vy:0,a0,w:dir*1.05,ot:0,len:700,r:22,dmg:e.dmg*.7,life:4.2,hitCD:0}); say("⚡ 번개 빛줄기가 돌아요! 같은 방향으로 따라 돌거나 멀리 떨어져요!","alarm") }}) },
    quadstrike(e,P,TP){ e.bt=5.4; for(let w=0;w<2;w++){ g.pending.push({t:w*2.1,run:()=>{ if(e.hp<=0) return; const safe=Math.floor(Math.random()*4), a0=Math.floor(Math.random()*4)*Math.PI/2+Math.PI/4;
        for(let s=0;s<4;s++) g.fx.push({k:"conewarn",x:e.x,y:e.y,a:a0+s*Math.PI/2,half:Math.PI/4,r:900,life:1.5,max:1.5,safe:s===safe?1:0});
        g.pending.push({t:1.5,run:()=>{ if(e.hp<=0) return; const sa=a0+safe*Math.PI/2; sectHit(e.x,e.y,sa,Math.PI/4,e.dmg*.8); for(let s=0;s<4;s++){ if(s===safe) continue; for(let k=0;k<4;k++){ const b=a0+s*Math.PI/2+(Math.random()-.5)*1.3, d=120+Math.random()*420; g.fx.push({k:"bolt",x:e.x+Math.cos(b)*d,y:e.y+Math.sin(b)*d,life:.3,max:.3}) } } g.shake=.45; sfx("thunder") }}) }}) } say("⚡ 초록색 안전한 쪽으로 가요!","alarm") },
    /* ===== 맵 7~10 고유 패턴 ===== */
    lionroar(e,P,TP){ e.bt=3.8; const R=e.r*5.4, half=.5; for(let i=0;i<3;i++){ g.pending.push({t:i*.75,run:()=>{ if(e.hp<=0) return; const q=TP(), a=Math.atan2(q.y-e.y,q.x-e.x); e.roarA=a; g.fx.push({k:"conewarn",x:e.x,y:e.y,a,half,r:R,life:.95,max:.95}) }});
        g.pending.push({t:i*.75+.95,run:()=>{ if(e.hp<=0) return; const a=e.roarA; coneHit(e.x,e.y,a,half,R,(e.dmg*0.9)*.6); g.fx.push({k:"roar",x:e.x+Math.cos(a)*R*.4,y:e.y+Math.sin(a)*R*.4,r:R*.6,life:.45,max:.45}); g.fx.push({k:"roarcone",x:e.x,y:e.y,a,half,r:R,life:.5,max:.5}); sfx("roar"); g.shake=Math.max(g.shake,.25) }}) } },
    lightmirror(e,P,TP){ const q=TP(); e.bt=3.6; for(let i=0;i<4;i++){ const a=i*Math.PI/2+Math.PI/4+Math.random()*.3, px=q.x+Math.cos(a)*250, py=q.y+Math.sin(a)*190; g.pending.push({t:i*.4,run:()=>{ if(e.hp<=0) return; const q2=TP(), b=Math.atan2(q2.y-py,q2.x-px);
        g.fx.push({k:"crystalpillar",gold:1,x:px,y:py,life:2.2,max:2.2}); g.fx.push({k:"laserwarn",x:px,y:py,a:b,len:760,life:1.2,max:1.2});
        g.pending.push({t:1.2,run:()=>{ aoeL(px,py,b,760,e.dmg*.6); g.fx.push({k:"pbeam",x:px,y:py,a:b,len:760,col:"255,220,120",life:.45,max:.45}); sfx("multislash1") }}) }}) } },
    skydive(e,P,TP){ const R=e.r*1.9; e.bt=4.2; e.air=true; e.airH=60; sfx("phoenix"); say("🪽 하늘로 날아올랐어요! 그림자가 멈추면 바로 비켜요!","alarm"); let lx=0, ly=0;
      for(let i=0;i<14;i++) g.pending.push({t:i*.1,run:()=>{ const q=TP(); lx=q.x; ly=q.y; g.fx.push({k:"warn",x:lx,y:ly,r:R,life:.12,max:.12}) }});
      g.pending.push({t:1.45,run:()=>{ if(e.hp<=0) return; g.fx.push({k:"warn",x:lx,y:ly,r:R,life:1,max:1}); g.pending.push({t:.1,run:()=>{ if(e.hp>0) e.jump={sx:e.x,sy:e.y,tx:lx,ty:ly,t:0,dur:.9,h:300,r:R,dmg:(e.dmg*0.85)*.95,col:"255,230,160"} }}) }}) },
    pillarline(e,P,TP){ e.bt=3.6; const q=TP(), a0=Math.atan2(q.y-e.y,q.x-e.x); for(const o of [-.32,.32]){ const a=a0+o; for(let i=0;i<9;i++){ const d=e.r+50+i*72, x=e.x+Math.cos(a)*d, y=e.y+Math.sin(a)*d, t=i*.11;
        g.pending.push({t,run:()=>g.fx.push({k:"warn",x,y,r:46,life:1.05,max:1.05})}); g.pending.push({t:t+1.05,run:()=>{ if(e.hp<=0) return; aoeC(x,y,46,(e.dmg*0.73)*.85); g.fx.push({k:"rockup",x,y,r:46,life:.6,max:.6}); g.fx.push({th:"rock",k:"boom",x,y,r:46,life:.35,max:.35}); if(i%3===0) sfx("quake") }}) } } },
    holyswords(e,P,TP){ e.bt=5; const a0=Math.atan2(TP().y-e.y,TP().x-e.x); for(let w=0;w<2;w++){ g.pending.push({t:w*1.5,run:()=>{ if(e.hp<=0) return; for(let i=0;i<4;i++){ const a=a0+w*Math.PI/4+i*Math.PI/2;
        g.fx.push({k:"laserwarn",x:e.x,y:e.y,a,len:700,life:1.1,max:1.1}); g.pending.push({t:1.1,run:()=>{ if(e.hp<=0) return; aoeL(e.x,e.y,a,700,(e.dmg*0.66)*.8); g.fx.push({k:"pbeam",x:e.x,y:e.y+40,a,len:700,col:"255,230,140",life:.5,max:.5}) }}) } g.pending.push({t:1.1,run:()=>{ sfx("multislash"); g.shake=Math.max(g.shake,.3) }}) }}) }
      say("⚔ 빛의 검이 십자 모양으로 꽂혀요! 줄 사이 빈 곳으로!","alarm") },
    wolflanes(e,P,TP){ const q=TP(), dir=Math.random()<.5?1:-1, gap=1+Math.floor(Math.random()*3); e.bt=3.2; sfx("roar");
      for(let l=0;l<5;l++){ if(l===gap) continue; const y=q.y+(l-2)*80, x0=q.x-dir*600; g.fx.push({k:"laserwarn",x:x0,y,a:dir>0?0:Math.PI,len:1200,life:1.15,max:1.15});
        g.pending.push({t:1.15+l*.06,run:()=>{ g.eshots.push({kind:"wolfrun",x:x0,y,vx:dir*1300,vy:0,a:dir>0?0:Math.PI,r:32,dmg:(e.dmg*0.83)*.9,life:1.1,pierce:1,ph:l*1.7}) }}) } },
    snowroll(e,P,TP){ const q=TP(), a0=Math.atan2(q.y-e.y,q.x-e.x); e.bt=5.8;   // 눈덩이 3개를 부채꼴로 차례차례, 더 빠르게 굴려요
      [0,-.5,.5].forEach((o,i)=>{ const a=a0+o; g.fx.push({k:"laserwarn",x:e.x,y:e.y,a,len:500,life:.9+i*.25,max:.9+i*.25}); g.pending.push({t:.9+i*.25,run:()=>{ if(e.hp<=0) return;
        g.eshots.push({kind:"snowball",bounce:1,grow:1,cx:q.x,cy:q.y,hw:W*.46,hh:H*.44,x:e.x,y:e.y,vx:Math.cos(a)*470,vy:Math.sin(a)*470,r:28,dmg:e.dmg*.6,life:3.6,pierce:1,hitCD:0}); sfx("quake") }}) }) },
    frostmine(e,P,TP){ const q=TP(); e.bt=3.6; const pts=[[0,0]]; for(let i=0;i<4;i++){ const a=i*Math.PI/2+Math.random()*.5; pts.push([Math.cos(a)*150,Math.sin(a)*120]) }
      pts.forEach(([dx,dy],i)=>{ const x=q.x+dx, y=q.y+dy; g.pending.push({t:i*.12,run:()=>{ g.fx.push({k:"crystalpillar",ice:1,x,y,life:1.6,max:1.6}); g.fx.push({k:"warn",x,y,r:52,life:1.4,max:1.4}); for(let d=0;d<4;d++) g.fx.push({k:"laserwarn",x,y,a:d*Math.PI/2,len:210,life:1.4,max:1.4}) }});
        g.pending.push({t:i*.12+1.4,run:()=>{ aoeC(x,y,52,(e.dmg*0.84)*.55); for(let d=0;d<4;d++){ aoeL(x,y,d*Math.PI/2,210,(e.dmg*0.84)*.45); g.fx.push({k:"pbeam",x,y:y+40,a:d*Math.PI/2,len:210,col:"170,225,255",life:.4,max:.4}) } g.fx.push({th:"ice",k:"boom",x,y,r:52,life:.4,max:.4}); if(i===0) sfx("bigboom") }}) }) },
    breathsweep(e,P,TP){ const q=TP(), aim=Math.atan2(q.y-e.y,q.x-e.x), dir=Math.random()<.5?1:-1, half=1.25, a0=aim-dir*half; e.bt=5;
      g.fx.push({k:"conewarn",x:e.x,y:e.y,a:aim,half,r:560,life:1.2,max:1.2}); say("❄ 얼음 숨결이 부채처럼 휩쓸어요! 보스 뒤로 돌아가거나 멀리 피해요!","alarm");
      g.pending.push({t:1.2,run:()=>{ if(e.hp<=0) return; sfx("hurricane"); g.eshots.push({kind:"beam",style:"breath",eid:e.id,x:e.x,y:e.y,vx:0,vy:0,a0,a:a0,w:dir*1.45,ot:0,len:560,r:44,dmg:(e.dmg*0.69)*.7,life:1.75,hitCD:0}) }}) },
    thunderdash(e,P,TP){ chainDash(e,TP,{n:3,aim:.8,dur:.62,sp:1000,gap:.15,tail:2.6,onDash:(a,sx,sy)=>{ sfx("thunder"); g.shake=Math.max(g.shake,.2); const L=620;
          g.pending.push({t:.5,run:()=>{ g.fx.push({k:"laserwarn",x:sx,y:sy,a,len:L,life:.75,max:.75}); g.pending.push({t:.75,run:()=>{ aoeL(sx,sy,a,L,e.dmg*.5); g.fx.push({k:"pbeam",x:sx,y:sy+40,a,len:L,col:"255,240,120",life:.4,max:.4}); for(let k=0;k<3;k++) g.fx.push({k:"bolt",bt:"boss",x:sx+Math.cos(a)*L*(k+.5)/3,y:sy+Math.sin(a)*L*(k+.5)/3,life:.3,max:.3}); sfx("thunder") }}) }}) },
        end:()=>{ if(e.hp<=0) return; e.stun=Math.max(e.stun||0,2.4); e.dizzy=2.4; g.fx.push({k:"label",x:e.x,y:e.y-e.r*2,text:"기절! 지금이 기회!",life:1.6,max:1.6}) }}) },
    drumtiles(e,P,TP){ const q=TP(), S=92, ox=q.x-S*2.5, oy=q.y-S*2; e.bt=5; for(let w=0;w<3;w++) for(let i=0;i<5;i++) for(let j=0;j<4;j++){ const on=w===0?(i%2===0):w===1?(j%2===0):((i+j)%2===0); if(!on) continue; const x=ox+i*S+S/2, y=oy+j*S+S/2;
        g.pending.push({t:w*1.4,run:()=>{ g.fx.push({k:"tilewarn",x,y,s:S,life:1.15,max:1.15}) }}); g.pending.push({t:w*1.4+1.15,run:()=>{ aoeC(x,y,S*.5,(e.dmg*0.86)*.4); g.fx.push({k:"bolt",bt:"boss",x,y,life:.3,max:.3}) }}) }
      for(let w=0;w<3;w++) g.pending.push({t:w*1.4+1.15,run:()=>sfx("thunder")}); say("🥁 북소리에 맞춰 번개가 칸마다 떨어져요! 빈 칸으로!","alarm") },
    tribeam(e,P,TP){ const a0=Math.atan2(TP().y-e.y,TP().x-e.x), dir=Math.random()<.5?1:-1; e.bt=5.2; for(let k=0;k<3;k++) g.fx.push({k:"laserwarn",x:e.x,y:e.y,a:a0+k*2.094,len:700,life:1.1,max:1.1});
      g.pending.push({t:1.1,run:()=>{ if(e.hp<=0) return; for(let k=0;k<3;k++) g.eshots.push({kind:"beam",x:e.x,y:e.y,vx:0,vy:0,a0:a0+k*2.094,w:dir*.8,ot:0,len:700,r:22,dmg:(e.dmg*0.5)*.4,life:3.4,hitCD:0}); say("⚡ 번개 빛줄기 세 개가 돌아요! 빈 곳을 따라 함께 돌아요!","alarm") }}) },
    voidclaw(e,P,TP){ const q=TP(), a0=Math.random()*3.14; e.bt=3.4; for(let i=0;i<3;i++){ const a=a0+i*Math.PI/3, sx=q.x-Math.cos(a)*450, sy=q.y-Math.sin(a)*450;
        g.pending.push({t:i*.3,run:()=>g.fx.push({k:"laserwarn",x:sx,y:sy,a,len:900,life:1.15,max:1.15})}); g.pending.push({t:i*.3+1.15,run:()=>{ if(e.hp<=0) return; aoeL(sx,sy,a,900,(e.dmg*0.87)*.45); g.fx.push({k:"pbeam",x:sx,y:sy+40,a,len:900,col:"200,140,255",life:.45,max:.45}); sfx("multislash1") }}) } },
    axethrow(e,P,TP){ const q=TP(), a=Math.atan2(q.y-e.y,q.x-e.x), D=Math.min(620,Math.hypot(q.x-e.x,q.y-e.y)+160); e.bt=5;   // 별 도끼 3자루를 부채꼴로 차례차례 던져요
      [0,-.42,.42].forEach((o,i)=>{ const b=a+o; g.fx.push({k:"laserwarn",x:e.x,y:e.y,a:b,len:D,life:.9+i*.18,max:.9+i*.18});
        g.pending.push({t:.9+i*.18,run:()=>{ if(e.hp<=0) return; sfx("multislash"); g.eshots.push({kind:"axe",x:e.x,y:e.y,vx:0,vy:0,sx:e.x,sy:e.y,tx:e.x+Math.cos(b)*D,ty:e.y+Math.sin(b)*D,T:.85,tt:0,r:40,dmg:(e.dmg*0.71)*.7,life:1.8,hitCD:0,eid:e.id}) }}) }) },
    planetring(e,P,TP){ const n=14, gap=Math.floor(Math.random()*n), gid=(Math.random()*1e9)|0, ga=(gap+1)/n*6.283; e.bt=4.6; sfx("alarm"); say("🪐 행성 고리가 퍼져 나가요! 빈틈을 지나가요!","alarm");
      for(let i=0;i<n;i++){ if(i===gap||i===(gap+1)%n||i===(gap+2)%n) continue; const a0=i/n*6.283; g.eshots.push({kind:"planet",pl:i%8,lead:i===(gap+3)%n?1:0,orbit:1,cx:e.x,cy:e.y,a0,w:.45,R0:e.r*.8,dR:120,ot:0,x:e.x,y:e.y,vx:0,vy:0,r:20,dmg:(e.dmg*0.47)*.9,life:5,pierce:1,gid,ga,pc:i%3}) } },
    eventhorizon(e,P,TP){ e.bt=7.2; const q=NM?teamMid(teamPlayers()):TP(), cx=q.x, cy=q.y, RC=210, T0=1.1;
      say("🌀 사건의 지평선! 내 발밑에 블랙홀이 생겨요. 바깥으로 걸으며 고리를 뛰어넘어요!","alarm"); g.fx.push({k:"warn",x:cx,y:cy,r:120,life:T0,max:T0}); g.fx.push({k:"label",x:cx,y:cy-140,text:"블랙홀! 피해요!",life:T0,max:T0});
      g.pending.push({t:T0,run:()=>{ if(e.hp<=0) return; g.eshots.push({kind:"vortex",hole:1,x:cx,y:cy,vx:0,vy:0,r:70,pr:520,pull:92,dmg:(e.dmg*0.78)*.45,life:5.2,hitCD:0}); sfx("quake") }});
      for(let i=0;i<3;i++) g.pending.push({t:T0+1.0+i*1.1,run:()=>{ if(e.hp<=0) return; sfx("quake"); g.eshots.push({th:e.th,kind:"shock",x:cx,y:cy,vx:0,vy:0,rad:70,v:250,maxR:780,band:24,r:0,dmg:(e.dmg*0.78)*.55,life:2.8,map:MAP.id}) }});
      g.pending.push({t:T0+3.9,run:()=>{ if(e.hp<=0) return; say("💥 블랙홀이 터져요! 보라 원 밖으로!","alarm"); g.fx.push({k:"warn",x:cx,y:cy,r:RC,life:1.2,max:1.2}) }});
      g.pending.push({t:T0+5.1,run:()=>{ if(e.hp<=0) return; aoeC(cx,cy,RC,e.dmg*.95); g.fx.push({k:"seqboom",x:Math.round(cx),y:Math.round(cy),r1:0,r2:RC,life:.8,max:.8}); g.fx.push({k:"flash",col:"#b48cff",life:.35,max:.35}); g.shake=.6; sfx("bigboom") }}) },
    maneflame(e){ const R=e.r*3.1, R2=e.r*6.5; e.bt=5.5;
      say("🔥 멀리 떨어져요!","alarm"); g.fx.push({k:"label",x:e.x,y:e.y-e.r*2.2,text:"멀리!",life:1.6,max:1.6}); g.fx.push({k:"warn",x:e.x,y:e.y,r:R,life:1.6,max:1.6});
      g.pending.push({t:1.6,run:()=>{ if(e.hp<=0) return; aoeC(e.x,e.y,R,e.dmg*.9); g.fx.push({k:"seqboom",x:Math.round(e.x),y:Math.round(e.y),r1:0,r2:Math.round(R),life:.75,max:.75}); sfx("bigboom") }});
      g.pending.push({t:1.9,run:()=>{ if(e.hp<=0) return; say("🔥 이번엔 가까이 와요!","alarm"); g.fx.push({k:"label",x:e.x,y:e.y-e.r*2.2,text:"가까이!",life:1.6,max:1.6}); g.fx.push({k:"donutwarn",x:e.x,y:e.y,r1:R,r2:R2,life:1.6,max:1.6}) }});
      g.pending.push({t:3.5,run:()=>{ if(e.hp<=0) return; const hitD=q=>{ const d=Math.hypot(q.x-e.x,q.y-e.y); return d>R&&d<R2 }; if(!g.p.dead&&hitD(g.p)) hitPlayer(e.dmg*.7); g.fx.push({k:"seqboom",x:Math.round(e.x),y:Math.round(e.y),r1:Math.round(R),r2:Math.round(R2),life:.8,max:.8}); sfx("bigboom"); g.shake=.4; evAll({t:"donut",x:Math.round(e.x),y:Math.round(e.y),r1:Math.round(R),r2:Math.round(R2),d:Math.round(e.dmg*.7)}) }}) },
  };
  // 부채꼴 · 구역 판정 (같이하기: 친구들에게도 보내요)
  function coneHit(x,y,a,half,r,d){ const q=g.p; if(!q.dead){ const dx=q.x-x, dy=q.y-y, dd=Math.hypot(dx,dy); let da=Math.atan2(dy,dx)-a; da=Math.atan2(Math.sin(da),Math.cos(da)); if(dd<r&&Math.abs(da)<half) hitPlayer(d) } evAll({t:"cone",x:Math.round(x),y:Math.round(y),a:+a.toFixed(3),h:+half.toFixed(3),r:Math.round(r),d:Math.round(d)}) }
  function sectHit(x,y,safeA,half,d){ const q=g.p; if(!q.dead){ let da=Math.atan2(q.y-y,q.x-x)-safeA; da=Math.atan2(Math.sin(da),Math.cos(da)); if(Math.abs(da)>half) hitPlayer(d) } evAll({t:"sect",x:Math.round(x),y:Math.round(y),a:+safeA.toFixed(3),h:+half.toFixed(3),d:Math.round(d)}) }
  function bossAct(e,act,P,N,PW,BX){ const TP=()=>NM?nearestPlayer(e.x,e.y):g.p; const SPD=PW.sp;
    const aim=Math.atan2(P.y-e.y,P.x-e.x);
    g.curTh=e.th;
    if(act==="bigjump3"||SIG[act]){ e.sigUntil=g.t+5.5; e.sigUsed=1 } if(act==="bigjump3"){ SIG.bigjump(e,P,TP,3); return } if(SIG[act]){ SIG[act](e,P,TP,1); return }
    if(act==="stomp"){ const R=e.r*2.8; g.fx.push({k:"warn",x:e.x,y:e.y,r:R,life:.85,max:.85});
      g.pending.push({t:.85,run:()=>{ aoeC(e.x,e.y,R*.55,e.dmg*1.3); g.fx.push({th:e.th,k:"quake",x:e.x,y:e.y,r:R,life:.5,max:.5}); g.shake=.35;
        g.eshots.push({th:e.th,kind:"shock",x:e.x,y:e.y,vx:0,vy:0,rad:R*.4,v:330,maxR:R*2.1,band:22,r:0,dmg:e.dmg*.8,life:(R*2.1-R*.4)/330,map:MAP.id}) }}) }
    else if(act==="summon"){ const nm=(e.atk&&e.atk.name)||"", K=/지난 보스/.test(nm)?"ghost":/사냥개|늑대|사자|도토리|마왕군/.test(nm)?"rush":/임프|요정|별|숲/.test(nm)?"ranged":"swarm";
      if(K==="ghost"){ const L=[]; for(let m=1;m<MAP.id;m++){ const T=BOSS_SKILLS[m]&&BOSS_SKILLS[m][3]; const sg=T&&T.k.find(x=>SIG[x[0]]); const bid=typeof STAGE_LOOKS!=="undefined"&&STAGE_LOOKS[m]&&STAGE_LOOKS[m][3]; if(sg&&bid&&BOSSES[bid]) L.push([sg[0],BOSSES[bid].name,sg[1]]) }
        const pk=L[Math.random()*L.length|0]; if(!pk) return; e.bt=Math.max(e.bt,5.5); say(`👻 ${pk[1]}의 그림자가 「${pk[2]}」을(를) 써요!`,"alarm"); g.fx.push({k:"label",x:e.x,y:e.y-e.r*2.3,text:`${pk[1]}의 그림자`,life:1.2,max:1.2}); g.fx.push({k:"boom",x:e.x,y:e.y,r:e.r*1.8,col:"#8a6bd8",life:.6,max:.6});
        g.pending.push({t:1.0,run:()=>{ if(e.hp>0){ e.sigUntil=g.t+5.5; SIG[pk[0]](e,TP(),TP,1) } }}); return }
      const alive=g.en.filter(o=>o.minOf===e.id&&o.hp>0).length, want=Math.min(K==="swarm"?7:4,8-alive); if(want<=0) return;
      const R=e.r*2.2; g.fx.push({k:"warn",x:e.x,y:e.y,r:R,life:1,max:1}); g.fx.push({k:"label",x:e.x,y:e.y-e.r*2.3,text:"부하가 나와요!",life:1,max:1});
      g.pending.push({t:1,run:()=>{ if(e.hp<=0) return; const m=MOBS[MAP.id][e.minion||0]||MOBS[MAP.id][0];
        for(let i=0;i<want;i++){ const a=i*6.283/want+Math.random()*.4, o=addMob(m,e.x+Math.cos(a)*R*.8,e.y+Math.sin(a)*R*.8,K==="swarm"?.7:2.6,false);
          o.minOf=e.id; o.mk=K; o.mT=1+Math.random()*1.5; o.mc=e.c||"#c08bff"; if(K==="swarm"){ o.r*=1.1; o.sp*=1.4 } else { o.r*=1.55; o.dmg*=1.2 } }
        e.minWatch=1; e.minT0=g.t; g.fx.push({k:"boom",x:e.x,y:e.y,r:R,col:"#c08bff",life:.45,max:.45}); sfx("boom") }}) }
    else if(act==="spore"){ for(let i=0;i<10;i++){ const a=i*Math.PI/5; g.eshots.push({th:e.th,x:e.x,y:e.y,vx:Math.cos(a)*200,vy:Math.sin(a)*200,r:9,dmg:e.dmg*.6,life:3,col:"#b8e06a",kind:"spore"}) } }
    else if(act==="rock"){ for(let i=-1;i<=1;i++) g.eshots.push({th:e.th,x:e.x,y:e.y,vx:Math.cos(aim+i*.25)*360,vy:Math.sin(aim+i*.25)*360,r:14,dmg:e.dmg*.8,life:2.5,col:"#8d86a0",kind:"rock"}) }
    else if(act==="spearthrust"){   /* 도토리 병정 대장: 빨간 띠(창이 닿는 곳) → 2번 연달아 푹! 찌르기 */
      for(let n=0;n<2;n++) g.pending.push({t:n*1.25,run:()=>{ if(e.hp<=0) return; const q=TP(), oy=e.y-e.r*BOSS_DY, a=Math.atan2(q.y-oy,q.x-e.x), L=e.r*1.2+230, w=40;
        e.aimHold=.75; g.fx.push({k:"laserwarn",x:e.x,y:oy,a,w,len:L,life:.75,max:.75}); g.fx.push({k:"label",x:e.x,y:oy-e.r*1.8,text:"창 찌르기!",life:.75,max:.75});
        g.pending.push({t:.75,run:()=>{ if(e.hp<=0) return; e.atk={k:"spearthrust",t0:g.t-.45,wind:.45,sp:0}; e.x+=Math.cos(a)*30; e.y+=Math.sin(a)*30; aoeL(e.x,oy,a,L,e.dmg*1.1); g.fx.push({k:"pbeam",x:e.x,y:oy+40,a,len:L,col:"255,235,180",life:.25,max:.25}); g.shake=Math.max(g.shake,.2); sfx("multislash1") }}) }});
      e.bt=Math.max(e.bt,3.4) }
    else if(act==="dash"){ const q=TP(), a=Math.atan2(q.y-(e.y-e.r*BOSS_DY),q.x-e.x), v=e.sp*5; e.rollA=a; e.aimHold=.7; e.dsx=e.x; e.dsy=e.y; g.fx.push({k:"laserwarn",x:e.x,y:e.y-e.r*BOSS_DY,a,w:e.r+12,len:v*.6+e.r,life:.7,max:.7}); g.pending.push({t:.7,run:()=>{ if(e.hp<=0) return; e.x=e.dsx; e.y=e.dsy; e.dash=.6; e.dvx=Math.cos(a)*v; e.dvy=Math.sin(a)*v }}) }
    else if(act==="fire3"||act==="fire5"){ const n=act==="fire3"?3:5; for(let w=0;w<(e.big?2:1);w++) g.pending.push({t:w*.35,run:()=>{ const q=TP(), a0=Math.atan2(q.y-e.y,q.x-e.x);
      for(let i=0;i<n;i++){ const a=a0+(i-(n-1)/2)*.22; g.eshots.push({th:e.th,x:e.x,y:e.y,vx:Math.cos(a)*300,vy:Math.sin(a)*300,r:11,dmg:e.dmg*.7,life:3,col:"#ff8a2a",kind:"fire"}) } }}) }
    else if(act==="rage"){ const R=420; let n=0; g.en.forEach(o=>{ if(o!==e && (o.x-e.x)**2+(o.y-e.y)**2<R*R){ o.rage=8; n++ } });
      g.fx.push({k:"ragewave",x:e.x,y:e.y,r:R,life:.8,max:.8}); g.shake=.3; if(n) say(`광폭의 포효! 주변 몬스터 ${n}마리가 8초 동안 빨라지고 세졌어요!`) }
    else if(act==="orbs"){ const n=N(e.enraged?7:5); for(let i=0;i<n;i++){ const a=i*Math.PI*2/n; g.eshots.push({th:e.th,x:e.x+Math.cos(a)*e.r,y:e.y+Math.sin(a)*e.r,vx:Math.cos(a)*120,vy:Math.sin(a)*120,r:12,dmg:e.dmg*.7,life:5,col:BX.orbCol||"#c08bff",kind:"orb",home:1.2+i*.08}) } }
    else if(act==="laser"){ const n=e.enraged?3:1; for(let i=0;i<n;i++){ const a=aim+(i-(n-1)/2)*.5, len=Math.max(W,H)*1.2;
        g.fx.push({k:"laserwarn",x:e.x,y:e.y,a,len,life:.85,max:.85});
        g.pending.push({t:.85,run:()=>{ if(e.hp<=0) return; sfx("multislash1"); for(let j=0;j<3;j++) g.pending.push({t:j*.12,run:()=>{ if(e.hp>0) bossWave(e,a,e.dmg*(j?0.5:1.1),j) }}); g.shake=Math.max(g.shake,.2) }}) } }
    else if(act==="ring"){ const n=N(e.enraged?24:16); for(let w=0;w<(e.enraged?2:1);w++) g.pending.push({t:w*.4,run:()=>{ const off=w*.13; for(let i=0;i<n;i++){ const a=off+i*Math.PI*2/n; g.eshots.push({th:e.th,x:e.x,y:e.y,vx:Math.cos(a)*230*SPD,vy:Math.sin(a)*230*SPD,r:9,dmg:e.dmg*.55,life:3.5,col:BX.shotCol||"#ff5a8a",kind:BX.shotKind||"fire"}) } }}) }
    else if(act==="meteor"){ for(let i=0;i<N(e.enraged?10:6);i++){ const x=P.x+(Math.random()-.5)*320, y=P.y+(Math.random()-.5)*240, at=.9+i*.12;
      g.fx.push({k:"warn",x,y,r:70,life:at,max:at}); g.fx.push({th:e.th,k:BX.ground&&e.th!=="leaf"?"none":"meteor",x,y,life:at,max:.45});
      g.pending.push({t:at,run:()=>{ sfx("boom"); aoeC(x,y,70,e.dmg); g.fx.push({th:e.th,k:"boom",x,y,r:70,col:BX.boomCol||"#ff6a3c",life:.4,max:.4}); if(BX.ground) g.fx.push({k:"quake",x,y,r:70,life:.45,max:.45}); g.shake=Math.max(g.shake,.2) }}) } }
    // ── 새 기술들 ──
    else if(act==="spiral"){ const arms=N(3), steps=14, col=BX.shotCol||"#c88aff"; for(let st=0;st<steps;st++) g.pending.push({t:st*.08,run:()=>{ if(e.hp<=0) return; for(let k=0;k<arms;k++){ const a=st*.32+k*Math.PI*2/arms; g.eshots.push({th:e.th,x:e.x,y:e.y,vx:Math.cos(a)*200*SPD,vy:Math.sin(a)*200*SPD,r:9,dmg:e.dmg*.45,life:3.2,col,kind:"fire"}) } }}) }
    else if(act==="cross"){ g.fx.push({k:"crossfx",x:e.x,y:e.y,a:aim,th:e.th,life:1.6,max:1.6}); const len=Math.max(W,H)*1.2, base=aim, n=e.enraged?2:1; for(let w=0;w<n;w++){ const off=w*Math.PI/4; for(let k=0;k<4;k++){ const a=base+off+k*Math.PI/2;
        g.fx.push({k:"laserwarn",x:e.x,y:e.y,a,len,life:1+w*.5,max:1+w*.5}); g.pending.push({t:1+w*.5,run:()=>{ if(e.hp<=0) return; bossWave(e,a,e.dmg*1.1,0); g.pending.push({t:.12,run:()=>{ if(e.hp>0) bossWave(e,a,e.dmg*.5,1) }}); g.shake=Math.max(g.shake,.25) }}) } } }
    else if(act==="nova"){ const waves=e.isUlt?4:3; for(let w=0;w<waves;w++) g.pending.push({t:w*.45,run:()=>{ if(e.hp<=0) return; const n=N(18), off=w*.17; sfx("boom"); for(let i=0;i<n;i++){ const a=off+i*Math.PI*2/n; g.eshots.push({th:e.th,x:e.x,y:e.y,vx:Math.cos(a)*(170+w*40)*SPD,vy:Math.sin(a)*(170+w*40)*SPD,r:10,dmg:e.dmg*.5,life:3.5,col:BX.shotCol||"#ffd36a",kind:"fire"}) } g.fx.push({k:"ring",x:e.x,y:e.y,life:.5,max:.5}) }}) }
    else if(act==="storm"){ const T=teamPlayers(); T.push(g.p); const n=N(14); for(let i=0;i<n;i++){ const q=T[i%T.length], x=q.x+(Math.random()-.5)*520, y=q.y+(Math.random()-.5)*380, at=.8+i*.09;
        g.fx.push({k:"warn",x,y,r:62,life:at,max:at}); g.pending.push({t:at,run:()=>{ sfx("boom"); aoeC(x,y,62,e.dmg*.9); g.fx.push({th:e.th,k:"bolt",bt:"boss",x,y,life:.3,max:.3}); g.fx.push({th:e.th,k:"boom",x,y,r:62,col:BX.boomCol||"#bfa0ff",life:.4,max:.4}); g.shake=Math.max(g.shake,.2) }}) } }
    else if(act==="chase"){ const q=TP(); for(let i=0;i<6;i++) g.pending.push({t:i*.38,run:()=>{ if(e.hp<=0) return; const t=TP(); xBoom(t.x+(t.vx||0)*.3,t.y+(t.vy||0)*.3,70,e.dmg*1.2,.75) }}) }   // 발밑을 따라오는 폭발: 계속 움직여요
    else if(act==="ringshock"){ for(let i=0;i<3;i++) g.pending.push({t:i*.55,run:()=>{ if(e.hp<=0) return; sfx("quake"); g.shake=.25; g.eshots.push({th:e.th,kind:"shock",x:e.x,y:e.y,vx:0,vy:0,rad:e.r,v:300,maxR:760,band:26,r:0,dmg:e.dmg*1.1,life:2.4,map:MAP.id}) }}) }   // 충격파 3겹: 틈 사이로 피해요
    else if(act==="carpet"){ const q=TP(), a=Math.atan2(q.y-e.y,q.x-e.x); for(let i=0;i<9;i++){ const d=90+i*80, px=-Math.sin(a), py=Math.cos(a); for(const s of [-1,0,1]) xBoom(e.x+Math.cos(a)*d+px*s*95,e.y+Math.sin(a)*d+py*s*95,62,e.dmg*1.3,.7+i*.12) } }   // 보스 앞쪽으로 줄줄이 폭격
    else if(act==="sweep"){ const n=e.enraged?16:12; for(let i=0;i<n;i++) g.pending.push({t:i*.11,run:()=>{ if(e.hp<=0) return; const a=i*.55+e.wob; bossWave(e,a,e.dmg*.9,0); bossWave(e,a+Math.PI,e.dmg*.9,0) }}) }   // 빙글빙글 검기 폭풍
    else if(act==="wall"){ const q=TP(), a=Math.atan2(q.y-e.y,q.x-e.x), gap=(Math.random()*7|0)-3; for(let w=0;w<2;w++) g.pending.push({t:w*.6,run:()=>{ if(e.hp<=0) return; for(let i=-4;i<=4;i++){ if(i===gap||i===gap+1) continue; const px=-Math.sin(a), py=Math.cos(a); g.eshots.push({th:e.th,kind:"wave",x:e.x+px*i*58,y:e.y+py*i*58,vx:Math.cos(a)*300,vy:Math.sin(a)*300,a,r:26,sz:.9,dmg:e.dmg*1.2,life:3,map:MAP.id,pierce:1}) } }}) }   // 빈틈이 하나 있는 검기 벽
    else if(act==="doom"){ const q=NM?teamMid(teamPlayers()):TP(), sx=q.x+(Math.random()-.5)*260/safeMul(), sy=q.y+(Math.random()-.5)*200/safeMul(), SR=170*safeMul(), at=2.4, d=Math.round(e.dmg*3.2);   // 빛의 원 밖은 모두 대폭발
      g.fx.push({k:"safe",x:sx,y:sy,r:SR,life:at,max:at}); say("⚠ 멸망의 원! 빛나는 원 안으로 피해요!","alarm");
      g.pending.push({t:at,run:()=>{ if(e.hp<=0) return; g.fx.push({k:"flash",col:patCol(),life:.5,max:.5}); g.shake=.6; sfx("bigboom"); if((g.p.x-sx)**2+(g.p.y-sy)**2>SR*SR) hitPlayer(d); evAll({t:"judg",x:Math.round(sx),y:Math.round(sy),r:SR,d});
        for(let i=0;i<10;i++){ const an=i/10*6.283, R=SR+90+Math.random()*180; g.fx.push({th:e.th,k:"boom",x:sx+Math.cos(an)*R,y:sy+Math.sin(an)*R*.8,r:70,col:patCol(),life:.5,max:.5}) } }}) }
    else if(act==="pull"){ const R=520, dur=2.4; g.fx.push({k:"blackhole",x:e.x,y:e.y,r:R,life:dur,max:dur}); say("🌀 블랙홀이 끌어당겨요! 반대로 움직여요!","alarm");
      g.bh={x:e.x,y:e.y,r:R,t:dur,pow:220*SPD}; g.pending.push({t:dur,run:()=>{ aoeC(e.x,e.y,e.r*2.2,e.dmg*1.6); g.fx.push({th:e.th,k:"boom",x:e.x,y:e.y,r:e.r*2.2,col:"#9a5aff",life:.5,max:.5}); g.shake=.5 }}) }
  }
  function hurt(e,d,dot){ if(e.hp<=0||e.hidden||e.b11inv) return; let m=st().dmg*(g.buff?g.buff.mul:1)*(g.bbuff?g.bbuff.dmg:1)*(F.combo?1+.06*g.combo:1); if(BX) m*=({pirate:.62,mech:.86,warrior:.85,zodiac:1.15})[HERO.id]||1;   /* 보스맵: 빨리 잡는 직업 맞춤 (5분 기준) */ if(!dot && M.crit && Math.random()<M.crit){ m*=2; sfx("crit"); g.fx.push({k:"crit",x:e.x,y:e.y-e.r,life:.35,max:.35}) } if(F.poison && !dot){ e.burn=3; e.burnD=Math.max(e.burnD||0,d*.12) } if(e.type==="boss"){ if(M.boss) m*=M.boss; m*=1+.1*lv("bhunt"); if(BDEF) m*=bossMul(BDEF,1-(1-BST.ied)*(1-.08*lv("bpierce"))) } if(M.inkb&&e.slow>0) m*=M.inkb; m*=auraMul(); if(e.vulT>g.t) m*=e.vulM||1; const dealt=d*m; if(NM==="client"){ netOut.d[e.id]=(netOut.d[e.id]||0)+dealt; e.hitT2=g.t } else e.hp-=dealt; if(!dot){ sfx("hit"); if(HDFX&&g.t!==g._spkF){ g._spkF=g.t; g._spkN=0 } if(HDFX&&g._spkN<1&&g.t-(g._spkL||0)>.045&&Math.abs(e.x-g.p.x)<W*.6&&Math.abs(e.y-g.p.y)<H*.6){ g._spkN++; g._spkL=g.t; g.fx.push({k:"hitspk",x:e.x+(Math.random()-.5)*e.r*.8,y:e.y-e.r*(.2+Math.random()*.5),a:Math.random()*6.28,s:Math.min(1.6,.7+e.r/40),life:.22,max:.22}) } } e.flash=.08; if(!dot||Math.random()<.5){ e.dmgAcc=(e.dmgAcc||0)+dealt; if(!e.dmgT||g.t-e.dmgT>.12||e.hp<=0){ g.fx.push({k:"num",x:e.x+(Math.random()-.5)*e.r,y:e.y-e.r,v:Math.round(e.dmgAcc),crit:m>st().dmg*1.9,dot,big:g.bigNumT>g.t,life:g.bigNumT>g.t?1.1:.7,max:g.bigNumT>g.t?1.1:.7}); e.dmgAcc=0; e.dmgT=g.t } } if(!dot){ e.hitT=g.t; const a=Math.atan2(e.y-g.p.y,e.x-g.p.x); e.hx=Math.cos(a); e.hy=Math.sin(a); if(Math.random()<.35) g.fx.push({k:"spark",x:e.x,y:e.y-e.r*.3,life:.22,max:.22,a:Math.random()*6}) } if(e.hp<=0) kill(e) }
  function kill(e){ if(e.b11&&BX&&!e._realKill){ BX.onKill(e); return } sfx("kill"); if(NM==="host") hostEv.push({t:"kd",id:e.id,x:Math.round(e.x),y:Math.round(e.y),r:e.r});
    g.kills++;
    if(onScreen(e)) g.fx.push({k:"poof",x:e.x,y:e.y,r:e.r,c:e.c||"#ffffff",life:.45,max:.45,seed:Math.random()*6});
    g.gems.push({x:e.x,y:e.y,v:e.xp});
    if(e.type==="boss"){ giveCard(e.bid); if(((BOSSES[e.bid]||{}).tier??0)<3){ dropAll(); if(NM) evAll({t:"chest"}) }   // 최종 보스는 상자 대신 결과 화면 보물상자
      for(let i=0;i<10;i++){ const a=i*.628; g.gems.push({x:e.x+Math.cos(a)*40,y:e.y+Math.sin(a)*40,v:6}) }
      if(e.sigUsed&&!e.sigHit&&!g.medalSig){ g.medalSig=1; showBanner("✨ 고유 패턴 완벽 회피! 훈장을 받았어요"); sfx("win") }
      g.bossKills++; g.gemPull=1.5; { const BB=BOSSES[e.bid]; g.bossCoins+=BB&&BB.tier!==undefined&&BB.tier<3?starCoin(MAP.id,BB.tier):0 } stageBossDown(e); const B=e.buff; g.bbuff=Object.assign({},B,{t:30,max:30}); evAll({t:"bb",bid:e.bid,name:e.name,more:g.en.some(o=>o!==e&&o.type==="boss"&&o.hp>0)});
      stamp("보스<br>처치!"); sfx("win"); if((BOSSES[e.bid]||{}).deathMsg) g.pending.push({t:1.2,run:()=>say(BOSSES[e.bid].deathMsg,"win")}); SND.setIntensity(g.en.some(o=>o!==e&&o.type==="boss"&&o.hp>0)); g.shake=.5; g.fx.push({k:"flash",col:"#f6c544",life:.5,max:.5});
      showBanner(`${e.name} 처치! ★ 별 ${Math.min(4,g.bossKills)}개 · ${B.name}: 30초 동안 공격력 ×${B.dmg} · 이동 ×${B.spd}`); }
    else if(Math.random()<.012*(MAP.realm==="sky"?.55:1)) g.items.push({x:e.x,y:e.y,k:"heal"});
  }
  const near = (x,y,n)=>g.en.filter(e=>e.hp>0&&!e.hidden).map(e=>[e,((e.x-x)**2+(e.y-y)**2)*(e.type==="boss"?.35:1)]).sort((a,b)=>a[1]-b[1]).slice(0,n).map(a=>a[0]);   // 보스는 조금 멀어도 먼저 노려요
  const onScreen = e=>Math.abs(e.x-g.p.x)<W/2+20 && Math.abs(e.y-g.p.y)<H/2+20;

  /* ===== 같이 하기 (여러 명): 방장이 몬스터·보스를 움직이고, 친구들은 화면을 받아요 ===== */
  const NM = (opts.mp && typeof NET!=="undefined" && NET.role) ? NET.role : null;
  /* 같이 하기 난이도: 친구가 많을수록 몬스터가 많고 세져요. 대신 협동 보너스가 있어요 */
  const CO = { spawn:1.0, hp:.65, boss:1.25, bossBase:1.3, spd:1.18, dmg:1.4, xp:.7, crisis:.7, reward:1.3 };
  const RP = {}, EN = {}, GM = {}, IT = {}, BKEYS = Object.keys(BOSSES), inbox=[];
  /* 같이하기: 파티에서 전투력이 가장 높은 친구를 '최강 용사'로 빛나게 해요 */
  const TOP=(()=>{ if(!NM||typeof NET==="undefined") return null; const L=(NET.lobby||[]).filter(p=>p.pw); if(L.length<2) return null; return L.reduce((a,b)=>b.pw>a.pw?b:a) })();
  function drawTopAura(x,y){ const pu=.5+.5*Math.sin(g.t*4); ctx.save(); ctx.globalCompositeOperation=GLOW; const gr=ctx.createRadialGradient(x,y+18,0,x,y+18,46); gr.addColorStop(0,`rgba(255,211,106,${.5+.2*pu})`); gr.addColorStop(1,"rgba(255,211,106,0)"); ctx.fillStyle=gr; ctx.beginPath(); ctx.ellipse(x,y+18,46,16,0,0,7); ctx.fill();
    ctx.strokeStyle=`rgba(255,230,140,${.7+.3*pu})`; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(x,y+18,36+4*pu,12+1.5*pu,0,0,7); ctx.stroke(); ctx.restore() }
  function drawTopCrown(x,y){ ctx.save(); ctx.font='22px sans-serif'; ctx.textAlign="center"; ctx.textBaseline="alphabetic"; ctx.fillText("👑",x,y-70+Math.sin(g.t*3)*2); ctx.restore() }
  let nid=1, netAcc=0, hostEv=[], hostTo={}, xpShare=0, wipeT=0;
  const netOut={d:{},g:[],it:[],sh:[],fx:[],cc:{}};
  /* 기절·느리게·밀쳐내기: 손님이 건 효과도 방장의 진짜 몬스터에 걸리도록 함께 보내요 */
  function ccAdd(e,st,sl,px,py){ if(NM!=="client"||e.id===undefined) return; const c=netOut.cc[e.id]||(netOut.cc[e.id]=[0,0,0,0]); if(st>c[0]) c[0]=st; if(sl>c[1]) c[1]=sl; c[2]+=px; c[3]+=py }
  function ccS(e,v){ e.stun=Math.max(e.stun||0,v); ccAdd(e,v,0,0,0) }
  function ccL(e,v){ e.slow=Math.max(e.slow||0,v); ccAdd(e,0,v,0,0) }
  function ccP(e,x,y){ e.x+=x; e.y+=y; ccAdd(e,0,0,x,y) }
  const myName=(()=>{ const p=prof(); return (p&&p.name)||(p?`${p.c}반 ${p.n}번`:"나") })();
  const SHARE={roarcone:1,beamchg:1,seqboom:1,inkpath:1,roar:1,rockup:1,crystalpillar:1,pbeam:1,conewarn:1,cleave:1,tilewarn:1,firepillar:1,cloudwarn:1,mushsprout:1,roots:1,jarfly:1,slimepud:1,donutwarn:1,firering:1,robobeam:1,healp:1,collapse:1,lavafield:1,mzone:1,glyph:1,inkdragon:1,robot:1,fullmoon:1,crossfx:1,none:1,safe:1,icicle:1,blackhole:1,slash:1,bigslash:1,quake:1,bolt:1,boom:1,ring:1,meteor:1,label:1,warn:1,laserwarn:1,laser:1,ragewave:1,bosscast:1,scorch:1};
  // 같이하기: 빛의 원(안전 구역)은 인원이 많을수록 크게 (2명 1.3배 · 3명 1.6배 · 4명 1.9배), 모두의 가운데쯤에 생겨요
  function safeMul(){ return NM?1+.3*(Math.max(1,teamPlayers().length)-1):1 }
  function teamMid(L){ L=(L&&L.length)?L:[g.p]; let x=0,y=0; for(const q of L){ x+=q.x; y+=q.y } return {x:x/L.length,y:y/L.length} }
  const ZB=e=>e&&e.type==="boss"?.65:1;   // 조련사 소환수: 보스에게는 65%만 (무리 처치는 그대로)
  function teamPlayers(){ const L=[]; if(!g.p.dead) L.push(g.p); for(const id in RP){ const r=RP[id]; if(!r.dead&&!r.gone) L.push(r) } return L }
  /* 같이 하기: 기술을 고르는 친구(최대 30초)에게는 몬스터가 가지 않고 다른 친구를 노려요 */
  const PZ_MAX=40000;
  function choosing(q){ const now=performance.now();
    if(q===g.p){ if(g.paused&&!g.over){ g.pzT=g.pzT||now; return now-g.pzT<PZ_MAX } g.pzT=0; return false }
    return !!q.pzT && now-q.pzT<PZ_MAX }
  /* 모두가 고르고 있으면 몬스터(와 시간)도 멈춰요 */
  function allChoosing(){ const T=teamPlayers(); return T.length>0 && T.every(choosing) }
  function huntPlayers(){ const T=teamPlayers(), L=T.filter(q=>!choosing(q)); return L.length?L:T }
  const heroOf=q=>q===g.p?HERO.id:(q.st&&q.st.h);
  let _auT=-1,_auV=1; function auraMul(){ if(_auT===g.t) return _auV; _auT=g.t; return _auV=auraCalc() }
  function auraCalc(){ if(!HERO.aura&&!NM) return 1; if(HERO.aura&&!NM) return 1.08; let near=false; for(const q of teamPlayers()){ if(q!==g.p&&heroOf(q)==="pirate"&&(q.x-g.p.x)**2+(q.y-g.p.y)**2<260*260){ near=true; break } } return near?1.15:1 }
  function nearestPlayer(x,y){ if(NM){ for(const q of huntPlayers()){ if(heroOf(q)==="warrior"&&(q.x-x)**2+(q.y-y)**2<300*300) return q } }   // 탱커 도발
    let best=g.p, bd=1e18; for(const q of huntPlayers()){ const d=(q.x-x)**2+(q.y-y)**2; if(d<bd){bd=d;best=q} } return best }
  function randPlayer(){ const L=huntPlayers(); return L.length?L[Math.random()*L.length|0]:g.p }
  const nPlayers=()=>1+Object.values(RP).filter(r=>!r.gone).length;
  const evAll=m=>{ if(NM==="host") hostEv.push(m) };
  function say(text,snd){ showBanner(text); if(snd) sfx(snd); evAll({t:"ban",x:text,s:snd||""}) }
  /* ===== 11단계 군단장 「암흑의 검귀」 (boss11.js) ===== */
  const BX=(MAP.id===11&&typeof B11Make==="function")?B11Make({g,MAP,NM,hitPlayer,evAll,say,sfx,showBanner,stamp:(typeof stamp==="function"?stamp:null),team:()=>{ const L=teamPlayers(); return L.length?L:[g.p] },st:()=>st(),M:()=>M,safeMul:()=>safeMul(),
    fxp:f=>g.fx.push(f),netOut,nid:()=>nid++,BKEYS,needXP:L=>needXP(L),realKill:e=>{ e._realKill=1; kill(e) },endWin:()=>{},
    gaugeMul:()=>1-.15*lv("bguard"),
    freeCard:()=>{ if(g.p.dead||g.over) return; if(g.paused) g.lvFree=(g.lvFree||0)+1; else levelUp(true) },
    todQuiz:()=>{ if(weakUI||g.p.dead||g.over) return; openWeak(null,{title:"☀ 정오의 문제! 맞히면 어둠이 걷혀요",small:"맞히면 암흑 게이지 0 · 다음 정오 +3초 (게임은 계속돼요)",nopause:1,ok:()=>BX&&BX.todOk()}) },
    pillarQ:n=>{ const Q2Q=q2poolOf(Q2.w), L=Q2Q.length>=n?Q2Q:QPOOL, lab=x=>`${x.hun} ${x.eum}`, c=(Q2Q.length&&Math.random()<.8?spreadPick(Q2Q,1,"q2")[0]:spreadPick(QPOOL,1,"q")[0])||L[0]; if(!c) return null; const o=shuffle(L.filter(x=>x.h!==c.h&&lab(x)!==lab(c))).slice(0,n-1).map(lab); while(o.length<n-1) o.push("?"); return {h:c.h,lab:[lab(c),...o]} },
    pillarAns:(h,ok)=>{ const c=QPOOL.find(x=>x.h===h); if(!c||g.p.dead) return; g.qN++; if(ok){ g.qOk++; P.mastery[c.h]=(P.mastery[c.h]||0)+1; saveP() } else addWrong(c.h); trackAns(c,ok) }}):null;
  if(BX){ g.need=1e12; g.lvl=10; g.sk.main=3; Object.assign(g.sk,{str:2,qi:2,bhunt:1,body:1}); g.pending.push({t:4.2,run:()=>showBanner("⚔ 군단장 맵은 레벨 업이 없어요! 시작 기술 세트로 싸우고, 2페이즈가 되면 카드를 1장 골라요")}) }
  if(BX){ const D=MAP.dif||0, n=NM?nPlayers():1; const MB=mapById(MAP.id).hp; BX.setMul(MB*1.25*[1,1.5,2][D]*n,(1+(MB-1)*.35)*[1,1.15,1.3][D],1.85) }
  function plainFx(f){ const c={}; for(const k in f){ const v=f[k]; if(typeof v!=="object"&&typeof v!=="function") c[k]=v } return c }
  function patchArrs(){ if(!NM) return;
    if(!g.fx._p){ g.fx.push=function(...a){ for(const f of a){ if(!f.remote&&SHARE[f.k]&&!f.own){ const c=plainFx(f); if(NM==="host") hostEv.push({t:"fx",f:c}); else if(netOut.fx.length<40) netOut.fx.push(c) } } return Array.prototype.push.apply(this,a) }; g.fx._p=1 }
    if(!g.shots._p){ g.shots.push=function(...a){ for(const o of a){ if(!o.remote){ const c={k:o.k,x:Math.round(o.x),y:Math.round(o.y),vx:Math.round(o.vx),vy:Math.round(o.vy),l:+o.life.toFixed(2),dk:o.dark?1:0,gl:o.glow?1:0,ik:o.ink?1:0}; if(NM==="host") hostEv.push({t:"sh",s:c}); else if(netOut.sh.length<40) netOut.sh.push(c) } } return Array.prototype.push.apply(this,a) }; g.shots._p=1 }
    if(NM==="host" && !g.eshots._p){ g.eshots.push=function(...a){ for(const b of a) hostEv.push({t:"es",b:plainFx(b)}); return Array.prototype.push.apply(this,a) }; g.eshots._p=1 } }
  function addRemoteShot(c){ g.shots.push({k:c.k,x:c.x,y:c.y,vx:c.vx,vy:c.vy,life:c.l,dark:!!c.dk,glow:!!c.gl,ink:!!c.ik,remote:true,dmg:0,pierce:99,hit:new Set()}) }
  function addRemoteFx(f){ f.remote=true; if(f.k==="healp") healArea(f.x,f.y,f.r,f.pct,f.sh); if(f.k==="healp"&&f.rv&&g.p.dead&&(g.p.x-f.x)**2+(g.p.y-f.y)**2<f.r*f.r){ g.p.dead=false; g.p.hp=st().maxHp; g.p.inv=2; g.rescue=0; sfx("revive"); stamp("부활!"); showBanner("🌕 만월의 기적! 친구가 일으켜 줬어요"); g.fx.push({k:"ring",x:g.p.x,y:g.p.y,life:.6,max:.6}) } if(f.k==="bosscast"&&f.eid!==undefined){ const e=g.en.find(o=>o.id===f.eid); if(e){ g.castBan={name:f.text,boss:e.name,sp:f.sp,ult:f.ul,t:g.t}; e.atk={k:f.ak,t0:g.t,wind:f.wd||.45,sp:f.sp,ult:f.ul,name:f.text}; if(f.sp) sfx("alarm") } } if(f.k==="label"&&f.text) f.life=f.max=1.2; if(f.k==="blackhole") g.bh={x:f.x,y:f.y,r:f.r,t:f.life,pow:240}; g.fx.push(f) }
  function aoeC(x,y,r,d){ if(!g.p.dead && (g.p.x-x)**2+(g.p.y-y)**2<(r+g.p.r)**2) hitPlayer(d); evAll({t:"aoe",s:"c",x,y,r,d}) }
  function aoeL(x,y,a,len,d){ const hit=q=>{ const px=q.x-x, py=q.y-y, along=px*Math.cos(a)+py*Math.sin(a), across=Math.abs(-px*Math.sin(a)+py*Math.cos(a)); return along>0&&along<len&&across<26+q.r };
    if(!g.p.dead && hit(g.p)) hitPlayer(d); evAll({t:"aoe",s:"l",x,y,a,len,d}) }
  function onAoe(m){ const q=g.p; if(q.dead) return;
    if(m.s==="c"){ if((q.x-m.x)**2+(q.y-m.y)**2<(m.r+q.r)**2) hitPlayer(m.d) }
    else { const px=q.x-m.x, py=q.y-m.y, along=px*Math.cos(m.a)+py*Math.sin(m.a), across=Math.abs(-px*Math.sin(m.a)+py*Math.cos(m.a)); if(along>0&&along<m.len&&across<26+q.r) hitPlayer(m.d) } }
  function meState(){ const q=g.p; return {x:Math.round(q.x),y:Math.round(q.y),f:q.face||1,mv:+(q.mv||0).toFixed(2),hp:Math.max(0,Math.round(q.hp)),mx:Math.round(st().maxHp),d:q.dead?1:0,h:HERO.id,tr:HSt.tier,n:myName,l:g.lvl,pw:g.livePow||0} }
  function setRP(id,s){ let r=RP[id]; if(!r){ r=RP[id]={x:s.x,y:s.y,r:16,img:null,rx:s.x,ry:s.y} } r.st=s; r.x=s.x; r.y=s.y; r.dead=!!s.d; r.gone=false;
    if(!r.img||r.imgKey!==s.h+s.tr){ r.img=new Image(); r.img.src=(SPRITE_T[s.h]&&(SPRITE_T[s.h][s.tr]||SPRITE_T[s.h][Math.min(4,s.tr)]))||SPRITE_URLS[s.h]||""; r.imgKey=s.h+s.tr } }
  function mkEnt(id,di,fl,x,y){ let e;
    if(di<0){ const bid=BKEYS[-1-di], B=BOSSES[bid]; e={type:"boss",bid,look:B.look,c:B.c,crown:B.crown,name:B.name,r:B.b11?B.r:B.r*1.2,big:B.big,b11:B.b11} }
    else { const m=MOBS[MAP.id][di]||MOBS[MAP.id][0], S=SIZE[m.size]; e={type:m.size==="big"?"big":"mob",look:m.look,c:m.c,name:m.name,r:S.r*(fl&1?1.45:1)*(fl&1024?1.55:fl&512?1.1:1),elite:!!(fl&1),minOf:fl&512?1:0} }
    return Object.assign(e,{id,mapId:MAP.id,x,y,tx:x,ty:y,hp:100,max:100,slow:0,flash:0,stoneCD:0,wob:Math.random()*6,born:g.t}) }
  // 같이하기: 보스 보물상자·물약을 친구마다 하나씩 (자기 것만 보이고 자기만 주워요)
  function dropAll(){ const P=g.p, x=P.x+46, y=P.y+10; g.items.push({x,y,k:"gem",local:1},{x:P.x-46,y,k:"heal",local:1}); g.fx.push({k:"label",x:P.x,y:P.y-70,text:"🎁 보물상자가 내 옆에 떨어졌어요!",life:1.8,max:1.8}); g.fx.push({k:"ring",x,y,life:.5,max:.5}) }   // 각자 내 바로 옆에
  function itemFx(k){ const q=g.p, s=st();
    if(k==="heal"){ sfx("heal"); q.hp=Math.min(s.maxHp,q.hp+30); showBanner("회복 물약! 체력을 채웠어요") }
    else if(k==="gem"){ sfx("chest"); q.hp=Math.min(s.maxHp,q.hp+40); openGemChest() }
    else { sfx("chest"); const o=options(); q.hp=Math.min(s.maxHp,q.hp+40); if(o.length){ apply(o[0]); showBanner(`보물 상자! ${skName(o[0])} 기술이 세졌어요`) } else showBanner("보물 상자! 체력을 채웠어요") } }
  function giveCard(bid){ const B=BOSSES[bid]; if(!B||!/^st\d+_\d$/.test(bid)) return; const lvl=(MAP.dif||0)+1; P.bcard=P.bcard||{}; const had=P.bcard[bid]||0; if(hasCard(bid,lvl)) return;
    cardMask()[bid]|=1<<(lvl-1); P.bcard[bid]=Math.max(had,lvl); saveP(); (g.cardsGot=g.cardsGot||[]).push(bid); const P0=g.p; g.fx.push({k:"label",x:P0.x,y:P0.y-96,text:`🃏 ${B.name} ${CARD_TIER[lvl]} 카드 획득!`,life:2.2,max:2.2}); sfx("pick") }
  function bossReward(bid,name){ giveCard(bid); const B=BOSSES[bid]; if(!B) return; g.bossKills++; g.gemPull=1.5; g.bossCoins+=B.tier!==undefined&&B.tier<3?starCoin(MAP.id,B.tier):0; g.bbuff=Object.assign({},B.buff,{t:30,max:30});
    stamp("보스<br>처치!"); sfx("win"); g.shake=.5; g.fx.push({k:"flash",col:"#f6c544",life:.5,max:.5}); showBanner(`${name} 처치! ★ 별 ${Math.min(4,g.bossKills)}개 · ${B.buff.name}: 30초 동안 공격력 ×${B.buff.dmg} · 이동 ×${B.buff.spd}`) }
  function snap(){ const T=teamPlayers(); T.push(g.p); for(const id in RP) if(!RP[id].gone) T.push(RP[id]);
    const nearAny=(o,R)=>{ for(const q of T) if(Math.abs(o.x-q.x)<R&&Math.abs(o.y-q.y)<R) return true; return false };
    const en=[]; for(const e of g.en){ if(e.hp<=0||!nearAny(e,1000)) continue; en.push([e.id,Math.round(e.x),Math.round(e.y),Math.max(1,Math.ceil(e.hp/e.max*100)),e.di,(e.elite?1:0)|(e.stun>0?2:0)|(e.slow>0?4:0)|(e.rage>0?8:0)|(e.enraged?16:0)|(e.hidden?32:0)|(e.dizzy>0?64:0)|(e.spin?128:0)|(e.air?256:0)|(e.minOf?(e.mk==="swarm"?512:1536):0),Math.round(e.dmg*(e.rage>0?1.5:1))]) }
    const gm=[]; for(const o of g.gems){ if(!o.id) o.id=nid++; if(gm.length<150&&nearAny(o,800)) gm.push([o.id,Math.round(o.x),Math.round(o.y),o.v]) }
    const it=g.items.filter(o=>!o.local).map(o=>{ if(!o.id) o.id=nid++; return [o.id,Math.round(o.x),Math.round(o.y),o.k] });
    const pl={}; pl[NET.myId]=meState(); for(const id in RP) if(!RP[id].gone) pl[id]=RP[id].st;
    return {t:"s",tm:+g.t.toFixed(2),k:g.kills,en,gm,it,pl,sg:g.stageN,nb:Math.round(g.nextBossT),bu:g.bossUp?1:0,lr:g.lvR?{i:g.lvR.id,d:Object.keys(g.lvR.done)}:0,b11:BX?BX.snap():0} }
  function hostRecv(m,from){
    if(m.t==="quit"){ if(RP[from]) RP[from].gone=true; NET.ing.delete(from); return }
    if(m.t!=="c") return;
    if(m.me) setRP(from,m.me);
    if(m.or) originRes(from,m.or.id,!!m.or.ok);
    if(m.lvd&&g.lvR&&m.lvd===g.lvR.id) g.lvR.done[from]=1;
    if(m.ch){ const n=(RP[from]&&RP[from].st&&RP[from].st.n)||"친구", e=String(m.ch).slice(0,4); hostEv.push({t:"cheer",n,e}); cheerShow(n,e) }
    if(RP[from]){ const r=RP[from]; if(m.pz){ if(!r.pzT) r.pzT=performance.now() } else r.pzT=0 }
    if(m.cc&&m.cc.length){ const by=new Map(g.en.map(e=>[e.id,e])), cl=v=>Math.max(-260,Math.min(260,v||0));
      for(const [id,st,sl,px,py] of m.cc){ const e=by.get(id); if(!e||e.hp<=0) continue; if(st>0) e.stun=Math.max(e.stun||0,Math.min(3,st)); if(sl>0) e.slow=Math.max(e.slow||0,Math.min(4,sl)); if(px||py){ e.x+=cl(px); e.y+=cl(py) } } }
    if(m.d&&m.d.length){ const by=new Map(g.en.map(e=>[e.id,e])); for(const [id,d] of m.d){ const e=by.get(id); if(e&&e.hp>0&&!e.hidden&&!e.b11inv){ e.hp-=d; e.flash=.08; if(e.hp<=0) kill(e) } } }
    if(m.g) for(const id of m.g){ const i=g.gems.findIndex(o=>o.id===id); if(i>=0){ const v=g.gems[i].v; g.gems.splice(i,1); xpShare+=v; g.xp+=v*M.xp } }
    if(m.it) for(const id of m.it){ const i=g.items.findIndex(o=>o.id===id); if(i>=0){ const k=g.items[i].k; g.items.splice(i,1); (hostTo[from]=hostTo[from]||[]).push({t:"itok",k}) } }
    if(m.sh) for(const c of m.sh){ addRemoteShot(c); hostEv.push({t:"sh",s:c,from}) }
    if(m.fx) for(const f of m.fx){ addRemoteFx(Object.assign({},f)); hostEv.push({t:"fx",f,from}) }
    if(m.b11&&m.b11.length&&BX) BX.fromClient(m.b11);
    if(m.weak&&m.weak.length){ const by=new Map(g.en.map(e=>[e.id,e])); for(const id of m.weak) applyWeak(by.get(id)) }
    if(m.duel){ const by=new Map(g.en.map(e=>[e.id,e])), pct=.09/(1+.5*(nPlayers()-1)); for(const id of m.duel){ const e=by.get(id); if(e&&e.hp>0&&!e.b11inv){ e.hp-=e.max*pct; e.flash=.2; if(e.hp<=0) kill(e) } } } }
  function clientRecv(m){
    if(m.t!=="s") return;
    g.t=m.tm; g.kills=m.k; g.lvSt=m.lr||null; if(m.b11&&BX) BX.recv(m.b11); if(m.sg!==undefined){ g.stageN=m.sg; STAGE_PH=Math.min(3,m.sg); setVph(Math.min(3,m.sg+(m.bu?1:0))); g.nextBossT=m.nb; g.bossUp=!!m.bu }
    const seen=new Set();
    for(const a of m.en){ const [id,x,y,hp,di,fl,dmg]=a; seen.add(id); let e=EN[id];
      if(!e){ e=EN[id]=mkEnt(id,di,fl,x,y); g.en.push(e) }
      e.tx=x; e.ty=y; e.hp=hp; e.dmg=dmg; e.stun=fl&2?.15:0; e.rage=fl&8?.2:0; e.enraged=!!(fl&16); e.hidden=!!(fl&32); e.dizzyF=!!(fl&64); e.spin=!!(fl&128); e.air=!!(fl&256); if(fl&4) e.slow=Math.max(e.slow,.15) }
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
      else if(ev.t==="lvup"){ g.xp=Math.max(0,g.xp-g.need); g.lvl=ev.L; g.need=ev.need; if(ev.q){ g.lvRid=ev.id; lvOpen() } else lvAuto() }
      else if(ev.t==="lvgo") lvGo();
      else if(ev.t==="cheer") cheerShow(ev.n,ev.e);
      else if(ev.t==="chest") dropAll();
      else if(ev.t==="kd"){ sfx("kill"); g.fx.push({k:"poof",x:ev.x,y:ev.y,r:ev.r,c:"#ffffff",life:.45,max:.45,seed:Math.random()*6}); if(EN[ev.id]){ EN[ev.id].hp=0; delete EN[ev.id] } }
      else if(ev.t==="aoe") onAoe(ev);
      else if(ev.t==="ban"){ showBanner(ev.x); if(ev.s) sfx(ev.s); if(ev.s==="boss") SND.setIntensity(1) }
      else if(ev.t==="bb"){ bossReward(ev.bid,ev.name); SND.setIntensity(!!ev.more) }
      else if(ev.t==="itok") itemFx(ev.k);
      else if(ev.t==="duel") g.duelQ={id:ev.id};
      else if(ev.t==="weakok") closeWeak();
      else if(ev.t==="b11"){ if(BX) BX.onEv(ev) }
      else if(ev.t==="gust") startGust(ev.a);
      else if(ev.t==="cone"){ const dx=g.p.x-ev.x, dy=g.p.y-ev.y; let da=Math.atan2(dy,dx)-ev.a; da=Math.atan2(Math.sin(da),Math.cos(da)); if(Math.hypot(dx,dy)<ev.r&&Math.abs(da)<ev.h) hitPlayer(ev.d) }
      else if(ev.t==="sect"){ let da=Math.atan2(g.p.y-ev.y,g.p.x-ev.x)-ev.a; da=Math.atan2(Math.sin(da),Math.cos(da)); if(Math.abs(da)>ev.h) hitPlayer(ev.d) }
      else if(ev.t==="donut"){ const d=Math.hypot(g.p.x-ev.x,g.p.y-ev.y); if(d>ev.r1&&d<ev.r2) hitPlayer(ev.d) }
      else if(ev.t==="judg"){ if((g.p.x-ev.x)**2+(g.p.y-ev.y)**2>ev.r*ev.r) hitPlayer(ev.d) }
      else if(ev.t==="oq"){ if(!g.p.dead) queueOrigin(ev.id) }
      else if(ev.t==="ofx"){ g.oriQ=null; originClose(); castOrigin() }
      else if(ev.t==="ofail"){ g.oriQ=null; originClose(); originFail(ev.n,ev.of) }
      else if(ev.t==="end"){ finish(!!ev.win); return } } }
  if(NM){ NET.onGame=(m,from)=>inbox.push([m,from]);
    NET.onDrop=id=>{ if(NM==="host"){ if(RP[id]){ RP[id].gone=true; showBanner("친구 한 명이 나갔어요") } } else if(id==="host"&&!g.over){ showBanner("방장과 연결이 끊어졌어요"); setTimeout(()=>finish(false),1200) } } }
  function netTick(dt){
    while(inbox.length){ const [m,from]=inbox.shift(); if(NM==="host") hostRecv(m,from); else clientRecv(m); if(g.over) return }
    if(g.lvPend && !g.paused && !g.over){ g.lvPend=0; if(g.p.dead) lvDone(); else levelUp() }
    else if(g.lvFree && !g.paused && !g.over && !g.p.dead){ g.lvFree--; levelUp(true) }
    if(NM==="host" && g.lvR && !g.lvR.go){ const R_=g.lvR, ids=[NET.myId,...Object.keys(RP).filter(id=>!RP[id].gone)];
      if(ids.every(id=>R_.done[id]) || performance.now()-R_.t0>(LV_T+3)*1000){ R_.go=1; hostEv.push({t:"lvgo"}); lvGo() } }
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
      try{ c.send({t:"c",pz:(g.paused&&!g.over)?1:0,lvd:netOut.lvd||0,ch:netOut.ch||"",me:meState(),d:Object.entries(netOut.d).map(([id,v])=>[+id,Math.round(v*10)/10]),g:netOut.g,it:netOut.it,sh:netOut.sh,fx:netOut.fx,duel:netOut.duel||[],weak:netOut.weak||[],or:netOut.or||null,b11:netOut.b11||[],cc:Object.entries(netOut.cc).slice(0,120).map(([id,c])=>[+id,+c[0].toFixed(2),+c[1].toFixed(2),Math.round(c[2]),Math.round(c[3])])}) }catch(e){}
      netOut.lvd=0; netOut.ch=""; netOut.d={}; netOut.g=[]; netOut.it=[]; netOut.sh=[]; netOut.fx=[]; netOut.duel=[]; netOut.weak=[]; netOut.or=null; netOut.cc={}; netOut.b11=[] } }
  function endAll(win){ if(g.over) return; if(NM==="host"){ const m={t:"s",tm:g.t,k:g.kills,en:[],gm:[],it:[],pl:{},ev:[{t:"end",win}]}; for(const id of NET.ing){ const c=NET.conns[id]; try{ c&&c.send(m) }catch(e){} } } finish(win) }
  function down(){ const q=g.p; q.dead=true; q.hp=0; g.rescue=0; modal.hidden=true; g.paused=false; showBanner(`쓰러졌어요! 친구가 옆에 ${RESCUE}초 동안 서 있으면 다시 일어나요`); }
  function drawRemotes(){ for(const id in RP){ const r=RP[id]; if(r.gone||!r.st) continue; r.rx+=(r.x-r.rx)*.25; r.ry+=(r.y-r.ry)*.25; const s=r.st;
      if(Math.abs(r.rx-g.p.x)>W/2+80||Math.abs(r.ry-g.p.y)>H/2+80) continue;
      ctx.fillStyle="rgba(37,33,27,.22)"; ctx.beginPath(); ctx.ellipse(r.rx,r.ry+20,16,5,0,0,7); ctx.fill(); if(TOP&&TOP.id===id&&!s.d) drawTopAura(r.rx,r.ry);
      if(s.tr>=5&&!s.d) drawAwaken(r.rx,r.ry,g.t,s.mv||0,r,s.h);
      if(s.tr>0){ const tc=TIER_COLOR[s.tr]; ctx.save(); ctx.globalAlpha=.4; ctx.fillStyle=tc; ctx.beginPath(); ctx.ellipse(r.rx,r.ry+18,30,10,0,0,7); ctx.fill(); ctx.restore() }
      if(r.img&&r.img.complete&&r.img.naturalWidth){ ctx.save(); ctx.translate(r.rx,r.ry+20); if(s.d){ ctx.rotate(Math.PI/2); ctx.globalAlpha=.55; ctx.filter="grayscale(1)" } else { const hop=Math.abs(Math.sin(g.t*14))*6*(s.mv||0); ctx.translate(0,-hop) } ctx.scale(s.f||1,1); if(isHeroArt(r.img.src)&&!s.d){ const T=ctx.getTransform(); REMOTE_HD.push({r,T,mv:s.mv||0}) } else ctx.drawImage(r.img,-32,-62,64,64); ctx.filter="none"; ctx.restore() }
      const w=40, k=s.mx?Math.max(0,s.hp/s.mx):0; ctx.fillStyle="rgba(0,0,0,.55)"; ctx.fillRect(r.rx-w/2-1,r.ry-52,w+2,6); ctx.fillStyle=k>.5?"#3fcf8e":k>.25?"#ffd23a":"#ff4a5a"; ctx.fillRect(r.rx-w/2,r.ry-51,w*k,4);
      if(s.d){ ctx.strokeStyle=`rgba(255,240,150,${.5+.4*Math.sin(g.t*6)})`; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(r.rx,r.ry+8,80,0,7); ctx.stroke() } } }
  function drawRemoteNames(){ for(const id in RP){ const r=RP[id]; if(r.gone||!r.st) continue; if(Math.abs(r.rx-g.p.x)>W/2+80||Math.abs(r.ry-g.p.y)>H/2+80) continue;
      ctx.font='14px "Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.textBaseline="alphabetic"; ctx.lineWidth=4; ctx.strokeStyle="#140c20"; const tp=TOP&&TOP.id===id, t=(r.st.d?"🆘 ":"")+(tp?"최강 ":"")+r.st.n+" · Lv"+r.st.l+(r.st.pw?" · ⚔"+fmtPow(r.st.pw):""); ctx.strokeText(t,r.rx,r.ry-57); ctx.fillStyle=r.st.d?"#ffd36a":tp?"#ffe9a0":"#ffffff"; ctx.fillText(t,r.rx,r.ry-57); if(r.st.tr>=5&&!r.st.d) drawAwkTag(r.rx,r.ry-(tp?100:80)); if(tp&&!r.st.d) drawTopCrown(r.rx,r.ry) }
    if(g.p.dead){ ctx.font='16px "Black Han Sans","Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.lineWidth=5; ctx.strokeStyle="#140c20"; const t=`도와줘! ${Math.round((g.rescue||0)/RESCUE*100)}%`; ctx.strokeText(t,g.p.x,g.p.y-58); ctx.fillStyle="#ffd36a"; ctx.fillText(t,g.p.x,g.p.y-58) } }

  /* ===== 전직 스킬 엔진 ===== */
  function onScreenEnemies(){ return g.en.filter(e=>e.hp>0&&onScreen(e)) }
  const inR=(x,y,r,e)=>(e.x-x)**2+(e.y-y)**2<(r+e.r)**2;
  function burstStars(x,y,n,dmg){ const off=Math.random()*Math.PI; for(let i=0;i<n;i++){ const a=off+i*Math.PI*2/n; g.shots.push({k:"star",x,y,vx:Math.cos(a)*480,vy:Math.sin(a)*480,dmg,pierce:1,life:.9,hit:new Set()}) } }
  function boomAt(x,y,r,dmg,col){ sfx(r>=110?"bigboom":"boom"); g.en.forEach(o=>{ if(inR(x,y,r,o)) hurt(o,dmg) }); g.fx.push({k:"boom",x,y,r,col,life:.45,max:.45}) }
  function spawnSummons(){
    SKL.forEach(k=>{ if(k.type!=="summon") return;
      if(k.what==="rat"){ M.mag*=1.2 }
      if(k.what==="crew"){ g.sum.push({kind:"crew",side:-1,x:g.p.x,y:g.p.y,acc:0,dmg:k.dmg}); g.sum.push({kind:"crew",side:1,x:g.p.x,y:g.p.y,acc:.25,dmg:k.dmg}) }
      else g.sum.push({kind:k.what,x:g.p.x,y:g.p.y,acc:0,dmg:k.dmg||0,a:0});
    });
  }
  /* 똑똑한 조준: 둘러싸여 위험하면 내 주변부터, 여유로우면 몬스터가 가장 많이 모인 곳부터 때려요 */
  function surrounded(){ const P=g.p, s=st(), hp=P.hp/s.maxHp; let n=0; for(const e of g.en){ if(e.hp>0&&(e.x-P.x)**2+(e.y-P.y)**2<190*190) n++ } return n>=7 || (hp<.5 && n>=3) || (hp<.3 && n>=1) }   // 위급: 둘러싸였거나 체력이 낮을 때 → 내 주변부터
  function smartTargets(R,n){ const P=g.p, risky=surrounded();
    let pool=onScreenEnemies().filter(e=>e.hp>0);
    if(risky){ const close=pool.filter(e=>(e.x-P.x)**2+(e.y-P.y)**2<240*240); if(close.length) pool=close }
    if(!pool.length) return {risky,pts:[]};
    const samp=pool.length>90?shuffle(pool).slice(0,90):pool, RR=Math.max(60,R)**2;
    const scored=samp.map(e=>{ let c=0; for(const o of pool) if((o.x-e.x)**2+(o.y-e.y)**2<RR) c+=o.type==="boss"?8:o.elite?3:1; if(risky) c+=3*Math.max(0,1-Math.hypot(e.x-P.x,e.y-P.y)/240); return {e,c} }).sort((a,b)=>b.c-a.c);
    const pts=[]; for(const {e} of scored){ if(pts.length>=n) break; if(pts.some(p=>(p.x-e.x)**2+(p.y-e.y)**2<RR*.5)) continue; pts.push({x:e.x,y:e.y}) }
    while(pts.length<n) pts.push(pts[pts.length%Math.max(1,pts.length)]||{x:P.x,y:P.y});
    return {risky,pts} }
  function cast(k){
    const s=st(), P=g.p, onS=onScreenEnemies(), dmg=(k.dmg||0)*lvScale;
    if(k.ult){ g.calmUntil=0; g.ultT=g.t; g.fx.push({k:"cutin5",img:"cut5_"+HERO.id,text:k.name,sub:JOBS[HERO.id].titles[5]+" · 5차 궁극기",c1:"#5a1a08",c2:k.fl||"#ff7a2a",c3:k.fl||"#ffd36a",life:1.5,max:1.5}); g.fx.push({k:"ucharge",col:k.fl||"#ffd36a",life:.6,max:.6}); sfx("cutin"); sfx("ultcharge") }
    else if(SKL[3]&&k.name===SKL[3].name&&HSt.tier>=5){ g.calmUntil=g.t+3; g.fx.push({k:"label",x:P.x,y:P.y-50,text:k.name,life:1,max:1}) }   /* 5차가 되면 4차는 조용히: 컷인 없이 · 흔들림과 번쩍임 절반 */
    else if(SKL[3]&&k.name===SKL[3].name){ const C=CUTC[HERO.id]||CUTC.warrior; g.fx.push({k:"cutin",text:HERO.id==="zodiac"?k.name.replace(/\s*\([^)]*\)/,""):k.name,sub:JOBS[HERO.id].titles[4]+" · 4차 스킬",c1:C[0],c2:C[1],c3:C[2],life:1.25,max:1.25}); sfx("cutin") }
    else if(k.type!=="glyph") g.fx.push({k:"label",x:P.x,y:P.y-50,text:(window.__t5==="pirate"&&k.type==="turret"?"상어 대포":k.name)+(surrounded()?" · 주변 정리!":""),life:1.2,max:1.2});
    sfx({multislash:"multislash",quake:"quake",awaken:"awaken",zone:k.what==="rain"?"rain":"mist",stream:"hurricane",marks:"marks",flare:"flare",turret:"turret",battleship:"ship"}[k.type]||"");
    if(k.type==="multislash"){
      for(let i=0;i<k.hits;i++) g.pending.push({t:i*k.gap,run:()=>{ const P=g.p;
        g.en.forEach(e=>{ if(inR(P.x,P.y,k.r,e)){ hurt(e,dmg); const dx=e.x-P.x, dy=e.y-P.y, d=Math.hypot(dx,dy)||1; if(e.type!=="boss"){ccP(e,dx/d*18,dy/d*18)} } });
        g.fx.push({k:"bigslash",x:P.x,y:P.y,r:k.r,a:i*2.1+g.t,life:.3,max:.3}); g.shake=Math.max(g.shake,.12) }});
    }
    else if(k.type==="quake"){
      g.en.forEach(e=>{ if(inR(P.x,P.y,k.r,e)){ hurt(e,dmg); ccS(e,k.stun); const dx=e.x-P.x, dy=e.y-P.y, d=Math.hypot(dx,dy)||1; if(e.type!=="boss"){ccP(e,dx/d*60,dy/d*60)} } });
      g.fx.push({k:"quake",x:P.x,y:P.y,r:k.r,life:.85,max:.85}); g.shake=.45;
    }
    else if(k.type==="collapse"){ const AD=.6, R=k.r||400, BT=k.burn||4, TK=k.tick||.5;   /* 5차 궁극기: 컷인이 지나간 뒤 땅이 무너져요 */
      let TX=null; const tgt=()=>{ if(!TX){   /* 5차도 4차처럼: 위험하면 내 주변 · 아니면 보스 우선 · 보스가 없으면 몬스터가 가장 많은 곳 */
        const P=g.p, near=o=>Math.abs(o.x-P.x)<W*.6&&Math.abs(o.y-P.y)<H*.6;
        if(surrounded()) TX={x:P.x,y:P.y};
        else { const B=g.en.filter(e=>e.type==="boss"&&e.hp>0&&!e.hidden&&!e.b11inv&&near(e)).sort((a,b)=>((a.x-P.x)**2+(a.y-P.y)**2)-((b.x-P.x)**2+(b.y-P.y)**2))[0];
          if(B) TX={x:B.x,y:B.y-B.r*BOSS_DY};
          else { const tp=smartTargets(R*.6,1).pts[0]; TX=tp&&near(tp)?{x:tp.x,y:tp.y}:{x:P.x,y:P.y} } } } return TX };
      g.pending.push({t:AD-(k.drop?.55:.12),run:()=>{ const T=tgt(); g.fx.push({k:"collapse",img:k.fx||"collapse5",col:k.col||"255,140,50",x:T.x,y:T.y,r:R,drop:k.drop?.43:0,rings:k.rings||2,life:k.drop?2.1:1.7,max:k.drop?2.1:1.7}) }});
      g.pending.push({t:AD,run:()=>{ const T=tgt(), cx=T.x, cy=T.y; g.shake=1.1; g.hitstop=.16; g.bigNumT=g.t+.4; sfx("ultboom"); sfx(({warrior:"lava",archer:"thunder",thief:"marks",mage:"fireball",pirate:"hurricane",healer:"fullmoon",calli:"glyph",zodiac:"dragon",mech:"robot"})[HERO.id]||"bigboom"); g.fx.push({k:"flash",col:k.fl||"#ff7a2a",life:.6,max:.6});
        g.en.forEach(e=>{ if(inR(cx,cy,R,e)){ hurt(e,dmg); ccS(e,k.stun||2); const dx=e.x-cx, dy=e.y-cy, d=Math.hypot(dx,dy)||1; if(e.type!=="boss"){ccP(e,dx/d*(k.knock||70),dy/d*(k.knock||70))} } });
        g.fx.push({k:"lavafield",x:cx,y:cy,r:R*.8,col:k.col||"255,140,50",col2:k.col2||"255,215,110",orb:k.orb||"",life:BT,max:BT});
        if(k.heal){ healMe(st().maxHp); g.fx.push({k:"healp",x:g.p.x,y:g.p.y,r:620,pct:1,sh:.25,rv:1,life:.8,max:.8}); sfx("revive") }
        for(let i=1;i<=Math.round(BT/TK);i++) g.pending.push({t:i*TK,run:()=>g.en.forEach(e=>{ if(inR(cx,cy,R*.8,e)) if(k.vuln){ e.vulT=g.t+TK+.15; e.vulM=k.vuln } if(k.slow) e.slow=Math.max(e.slow||0,TK+.2); hurt(e,dmg*.09) })}) }});
    }
    else if(k.type==="awaken"){
      g.buff={t:k.dur+.5,max:k.dur+.5,mul:k.mul}; P.inv=Math.max(P.inv,k.dur+.5);
      // 4차 컷인이 지나간 뒤(0.5초)에 성검이 떨어져서 각성 장면이 가려지지 않아요
      const AD=.5; g.pending.push({t:AD,run:()=>g.fx.push({k:"worldslash",life:2.4,max:2.4})}); const AR=k.r||340, near_=()=>onScreenEnemies().filter(e=>(e.x-g.p.x)**2+(e.y-g.p.y)**2<(AR+e.r)**2), bm=e=>1;   // 밸런스: 내 주변만
      g.pending.push({t:AD+.45,run:()=>{ g.shake=.3; sfx("bigboom") }}); g.pending.push({t:AD+1.0,run:()=>sfx("multislash1")}); g.pending.push({t:AD+1.4,run:()=>{ near_().forEach(e=>hurt(e,dmg*1.1*bm(e))); g.shake=.7; sfx("bigboom") }});   // 화면이 갈라지는 순간 한 번에 크게
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
        g.fx.push({k:"warn",own:1,fire:1,x,y,r:k.r,life:at+.45,max:at+.45}); g.fx.push({k:"meteor",x,y,life:at+.45,max:.45,start:at}); g.pending.push({t:at,run:()=>sfx("meteor")});
        g.pending.push({t:at+.45,run:()=>{ boomAt(x,y,k.r,dmg,"#ffd36a"); g.fx.push({k:"scorch",x,y,r:k.r,life:2,max:2}); g.shake=Math.max(g.shake,.25) }}) }
    }
    else if(k.type==="moonzone"){   // 달빛 결계: 몬스터는 느리고 아프게 · 친구는 회복
      g.zones.push({what:"moon",x:P.x,y:P.y,r:k.r,t:k.dur,max:k.dur,tick:k.tick,acc:0,dmg,slow:true});
      g.fx.push({k:"mzone",x:P.x,y:P.y,r:k.r,life:k.dur,max:k.dur}); sfx("moonzone") }
    else if(k.type==="fullmoon"){   // 보름달 강림
      sfx("fullmoon"); g.fx.push({k:"fullmoon",life:2.9,max:2.9}); const TG=smartTargets(k.r,k.n).pts;
      g.pending.push({t:.5,run:()=>healPulse(g.p.x,g.p.y,520,.3,.25)});
      for(let i=0;i<k.n;i++){ const t=TG[i]; const x=t?t.x+(Math.random()-.5)*36:P.x+(Math.random()-.5)*W*.7, y=t?t.y+(Math.random()-.5)*36:P.y+(Math.random()-.5)*H*.7, at=.95+i*.09;
        g.fx.push({k:"moonbeam",x,y,r:k.r,life:at+.7,max:.7}); g.pending.push({t:at+.14,run:()=>{ boomAt(x,y,k.r,dmg,"#6a8aff"); g.shake=Math.max(g.shake,.15) }}) } }
    else if(k.type==="glyph"){   // 한자를 써서 마법을 불러요
      sfx("glyph"); g.fx.push({k:"label",x:P.x,y:P.y-74,text:`${k.ch} ${k.hun}!`+(surrounded()?" · 주변 정리!":""),life:1.4,max:1.4});
      if(k.ch==="山"){ const t=smartTargets(k.r,1).pts[0]||{x:P.x,y:P.y};
        g.fx.push({k:"glyph",ch:k.ch,x:t.x,y:t.y,r:k.r,life:1.1,max:1.1});
        g.pending.push({t:.45,run:()=>{ sfx("quake"); g.shake=Math.max(g.shake,.3); g.fx.push({k:"rockup",x:t.x,y:t.y,r:k.r,life:1.3,max:1.3});
          g.en.forEach(e=>{ if(inR(t.x,t.y,k.r,e)){ hurt(e,dmg); ccS(e,k.stun) } }) }}) }
      else { g.fx.push({k:"glyph",ch:k.ch,x:P.x,y:P.y-120,r:90,life:1.2,max:1.2,sky:1}); const TG=smartTargets(k.r,k.n).pts;
        for(let i=0;i<k.n;i++){ const t=TG[i]; if(!t) continue; const at=.35+i*.09;
          g.pending.push({t:at,run:()=>{ sfx("thunder"); g.fx.push({k:"bolt",bt:"hero",x:t.x,y:t.y,life:.3,max:.3}); g.fx.push({k:"boom",x:t.x,y:t.y,r:k.r,col:"#ffe066",life:.3,max:.3});
            g.en.forEach(e=>{ if(inR(t.x,t.y,k.r,e)){ hurt(e,dmg); ccS(e,k.stun) } }) }}) } } }
    else if(k.type==="inkdragon"){   // 묵룡 승천: 먹물 용이 몬스터 무리를 가로지르고, 되돌아와 X자로 한 번 더 지나가요 (두 번째는 보스를 노려요)
      sfx("inkdragon"); g.fx.push({k:"glyph",ch:"龍",x:P.x,y:P.y-130,r:90,life:1.1,max:1.1,sky:1});
      const TS=smartTargets(200,2).pts, t1=TS[0]||{x:P.x+1,y:P.y}, boss=g.en.find(e=>e.type==="boss"&&!e.hidden&&Math.abs(e.x-P.x)<W*.7&&Math.abs(e.y-P.y)<H*.7), t2=boss||TS[1]||t1;
      const pass=(t,a,delay)=>{ const L=Math.hypot(W,H)*.6, sx=t.x-Math.cos(a)*L, sy=t.y-Math.sin(a)*L, dur=2.3, D0=.55;
        g.pending.push({t:delay,run:()=>{ if(delay) sfx("inkdragon"); g.fx.push({k:"inkpath",x:sx,y:sy,a,len:L*2,w:k.w,life:dur+1.1,max:dur+1.1,d0:D0}); g.fx.push({k:"inkdragon",x:sx,y:sy,a,len:L*2,life:dur,max:dur,d0:D0}); g.pending.push({t:D0+.2,run:()=>{ g.shake=Math.max(g.shake,.35) }});
          const pos=u=>u<.5?2*u*u:1-2*(1-u)*(1-u);   // 천천히 나타나 쭉 가속했다가 빠져나가요
          g.en.forEach(e=>{ const px=e.x-sx, py=e.y-sy, al=px*Math.cos(a)+py*Math.sin(a), ac=Math.abs(-px*Math.sin(a)+py*Math.cos(a)); if(ac<k.w+e.r&&al>0&&al<L*2){ const tgt=al/(L*2); let u=tgt; for(let i=0;i<6;i++){ u-=(pos(u)-tgt)/Math.max(.3,u<.5?4*u:4*(1-u)); u=Math.max(0,Math.min(1,u)) }
            g.pending.push({t:D0+u*(dur-D0),run:()=>{ if(e.hp>0){ hurt(e,dmg*(e.type==="boss"?2:1)); ccS(e,k.stun); ccL(e,k.stun+1); g.fx.push({k:"inksplash",x:e.x,y:e.y,r:e.type==="boss"?90:46,life:.45,max:.45}) } }}) } }) }}) };
      const a1=Math.atan2(t1.y-P.y,t1.x-P.x)+(Math.random()-.5)*.3; pass(t1,a1,0);
      const a2=boss?Math.atan2(t2.y-P.y,t2.x-P.x)+(Math.random()<.5?1:-1)*1.2:a1+Math.PI+(Math.random()<.5?1:-1)*1.25; pass(t2,a2,1.15) }
    else if(k.type==="dragonsum"){ sfx("dragon"); g.sum.push({kind:"qdragon",x:P.x,y:P.y-200,t:k.dur,max:k.dur,acc:.4,rate:k.rate,dmg:dmg*(M.sum||1),a:0}) }
    else if(k.type==="missiles"){ sfx("missiles"); const TG=smartTargets(k.r,k.n).pts;
      for(let i=0;i<k.n;i++){ const t=TG[i%Math.max(1,TG.length)]; g.pending.push({t:i*.05,run:()=>{ const P=g.p, b=-Math.PI/2+(Math.random()-.5)*1.6; const T=t&&near(t.x,t.y,1)[0];
        g.shots.push({k:"missile",x:P.x+(i%2?14:-14),y:P.y-30,vx:Math.cos(b)*380,vy:Math.sin(b)*380,dmg,pierce:0,boom:k.r,boomMul:1,life:2,hit:new Set(),seek:T||undefined,sd:.25}) }}) } }
    else if(k.type==="robot"){   // 메탈아머 전탄발사: 강하 → 착지 → 무장 전개 → 미사일·개틀링·손바닥 플라즈마 → 가슴 빔 한 바퀴 휩쓸기 → 과열 폭발 → 퇴장
      const t=smartTargets(k.r,1).pts[0]||{x:P.x+60,y:P.y}, dir=t.x>=P.x?1:-1, H=230, RL=5.0; sfx("robot");
      const PT=(nx,ny)=>({x:t.x-dir*nx*H, y:t.y+ny*H}), GAT=PT(-.49,-.09), PALM=PT(.38,-.166), CH=PT(.002,-.154), PODS=[PT(-.172,-.303),PT(.247,-.309)];
      const rb={k:"robot",fb:1,x:t.x,y:t.y,dir,life:RL,max:RL}; g.fx.push(rb); g.fx.push({k:"warn",own:1,x:t.x,y:t.y,r:k.r,life:.75,max:.75});
      g.pending.push({t:.75,run:()=>{ boomAt(t.x,t.y,k.r,dmg,"#ffd36a"); g.shake=.7; g.fx.push({k:"quake",x:t.x,y:t.y,r:k.r,life:.55,max:.55,th:"metal"}); g.en.forEach(e=>{ if(inR(t.x,t.y,k.r,e)) ccS(e,k.stun) }) }});
      g.pending.push({t:1.0,run:()=>{ sfx("robot"); g.fx.push({k:"flash",col:"#bfe6ff",life:.25,max:.25}); g.fx.push({k:"label",x:t.x,y:t.y-H*.75,text:"전탄 발사!",life:1.2,max:1.2}) }});
      // 어깨 미사일 32발: 두 발사구에서 번갈아 솟아올라 몬스터 무리에 쏟아져요
      const TG=smartTargets(70,16).pts;
      for(let i=0;i<32;i++) g.pending.push({t:1.25+i*.06,run:()=>{ const pd=PODS[i%2], b=-Math.PI/2+(i%2?1:-1)*dir*(.2+Math.random()*.55), tg=TG[i%Math.max(1,TG.length)], T0=tg&&near(tg.x,tg.y,1)[0];
        if(i%4===0) sfx("missiles"); g.shots.push({k:"missile",x:pd.x,y:pd.y,vx:Math.cos(b)*480,vy:Math.sin(b)*480,dmg:dmg*.16,pierce:0,boom:74,boomMul:1,life:2.2,hit:new Set(),seek:T0||undefined,sd:.3});
        g.fx.push({k:"muzzle",x:pd.x,y:pd.y,life:.08,max:.08}) }});
      // 개틀링 연사 36발: 앞쪽을 부채꼴로 쓸어요
      for(let i=0;i<36;i++) g.pending.push({t:1.3+i*.053,run:()=>{ const a=(dir>0?0:Math.PI)+Math.sin(i*.35)*.5+(Math.random()-.5)*.12, sp=1150; if(i%3===0) sfx("gun");
        g.shots.push({k:"tracer",x:GAT.x,y:GAT.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,dmg:dmg*.04,pierce:3,life:.6,hit:new Set(),rad:16}); g.shake=Math.max(g.shake,.12) }});
      // 손바닥 플라즈마 3발: 뒤쪽 무리로
      const TB=smartTargets(90,3).pts;
      for(let i=0;i<3;i++) g.pending.push({t:1.55+i*.5,run:()=>{ const tg=TB[i%Math.max(1,TB.length)]||{x:PALM.x-dir*300,y:PALM.y}, a=Math.atan2(tg.y-PALM.y,tg.x-PALM.x); sfx("fireball");
        g.shots.push({k:"plasma",x:PALM.x,y:PALM.y,vx:Math.cos(a)*620,vy:Math.sin(a)*620,dmg:dmg*.18,pierce:0,boom:100,boomMul:1,life:1.2,hit:new Set(),rad:20}); g.fx.push({k:"muzzle",x:PALM.x,y:PALM.y,life:.1,max:.1}) }});
      // 가슴 수정 빔: 앞쪽에서 시작해 로봇 둘레를 한 바퀴 휩쓸어요 (빔이 지나가는 몬스터는 한 번씩 크게)
      { const BL=560, BT=.7, SW=Math.PI*2, a0=dir>0?0:Math.PI, w=dir*SW/BT, hitB=new Set();
        // 충전: 가는 조준선 + 가슴 빛이 모였다가 → 고리 섬광과 함께 굵은 빔이 팍!
        g.pending.push({t:2.05,run:()=>{ g.fx.push({k:"beamchg",x:CH.x,y:CH.y,a:a0,len:BL,life:.55,max:.55}) }});
        g.pending.push({t:2.6,run:()=>{ sfx("robot"); g.shake=Math.max(g.shake,.45); g.fx.push({k:"robobeam",x:CH.x,y:CH.y,dir,len:BL,a0,w,sweep:BT,life:BT+.3,max:BT+.3}) }});
        for(let s=0;s<=26;s++) g.pending.push({t:2.75+s*BT/26,run:()=>{ const an=a0+w*(s/26)*BT, ca=Math.cos(an), sa=Math.sin(an); g.shake=Math.max(g.shake,.18);
          g.en.forEach(e=>{ if(hitB.has(e)||e.hp<=0) return; const px=e.x-CH.x, py=e.y-CH.y, al=px*ca+py*sa, ac=Math.abs(-px*sa+py*ca); if(al>0&&al<BL&&ac<60+e.r){ hitB.add(e); hurt(e,dmg*(e.type==="boss"?.85:.42)); if(e.type!=="boss") ccP(e,ca*40,sa*40) } }) }}) }
      // 마무리: 모든 포문 과열 폭발
      g.pending.push({t:4.1,run:()=>{ boomAt(t.x,t.y,k.r*1.3,dmg*.7,"#9fd8ff"); g.shake=.6; g.fx.push({k:"ring",x:t.x,y:t.y,life:.5,max:.5}); g.fx.push({k:"quake",x:t.x,y:t.y,r:k.r*1.3,life:.5,max:.5,th:"metal"}) }}) }
    else if(k.type==="battleship"){
      const dir=Math.random()<.5?1:-1, life=3.2, sc=Math.min(1.4,Math.max(.9,W/800));
      g.fx.push({k:"ship",dir,life,max:life}); g.fx.push({k:"flash",col:"#6ad0ff",life:.3,max:.3});
      g.pending.push({t:SHIP_T0,run:()=>{ g.shake=Math.max(g.shake,.35) }});
      const PT=shipPath(dir,W,H), ang=Math.atan2(PT.ey-PT.sy,PT.ex-PT.sx), toS=(x,y)=>[x-P.x+W/2,y-P.y+H/2];
      const passT=(x,y)=>{ const [sx,sy]=toS(x,y); const u=((sx-PT.sx)*Math.cos(ang)+(sy-PT.sy)*Math.sin(ang))/Math.hypot(PT.ex-PT.sx,PT.ey-PT.sy); return SHIP_T0+SHIP_DUR*Math.max(0,Math.min(1,u)) };
      // 지나가는 길의 몬스터를 들이받아요
      onS.forEach(e=>{ const [sx,sy]=toS(e.x,e.y), d=Math.abs(-(sx-PT.sx)*Math.sin(ang)+(sy-PT.sy)*Math.cos(ang)); if(d<110*sc) g.pending.push({t:passT(e.x,e.y),run:()=>{ if(e.hp>0){ hurt(e,dmg*.6); if(e.type!=="boss"){ ccP(e,Math.cos(ang)*60,Math.sin(ang)*60) } } }}) });
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
    if(g.shield>0){ g.shieldT-=dt; if(g.shieldT<=0) g.shield=0 }
    if(HERO.healer){ g.hpl=(g.hpl??1)-dt; if(g.hpl<=0){ g.hpl=2; healPulse(P.x,P.y,260,NM?.02:.035) } }   // 달빛 축복
    for(const f of g.fx) if(f.k==="mzone"){ f.acc=(f.acc||0)-dt; if(f.acc<=0){ f.acc=.5; healArea(f.x,f.y,f.r,.01) } }
    for(const k of ACT){ k.t-=dt; if(k.t<=0){ k.t=k.cd*Math.max(.6,s.cd); cast(k) } }
    if(g.buff){ g.buff.t-=dt; if(g.buff.t<=0) g.buff=null }
    // 장판
    for(const z of g.zones){ z.t-=dt; z.acc-=dt;
      if(z.acc<=0){ z.acc=z.tick; g.en.forEach(e=>{ if(inR(z.x,z.y,z.r,e)){ hurt(e,z.dmg); if(z.slow) ccL(e,.6) } }) } }
    g.zones=g.zones.filter(z=>z.t>0);
    // 폭풍 연사
    if(g.stream){ g.stream.t-=dt; g.stream.acc-=dt;
      g.stream.re=(g.stream.re||0)-dt; if(g.stream.re<=0){ g.stream.re=.4; g.stream.tg=smartTargets(140,1).pts[0]||null }
      while(g.stream.acc<=0){ g.stream.acc+=g.stream.rate; const t=g.stream.tg||near(P.x,P.y,1)[0];
        const a=t?Math.atan2(t.y-P.y,t.x-P.x):(g.stream.a||0), j=(Math.random()-.5)*.12; g.stream.a=a;
        g.stream.n=(g.stream.n||0)+1; const big=g.stream.n%4===0, fan=big?0:Math.sin(g.stream.n*1.7)*.38;   // 부채꼴로 쏟아지고, 네 발마다 폭풍 화살이 터져요
        g.shots.push({k:"arrow",x:P.x,y:P.y,vx:Math.cos(a+j+fan)*900,vy:Math.sin(a+j+fan)*900,dmg:g.stream.dmg,pierce:3+pierceAdd,life:.9,hit:new Set(),glow:true,...(big?{boom:95,boomMul:.8}:{})}) }
      if(g.stream.t<=0) g.stream=null }
    // 표식
    for(const e of g.en){ if(e.mark>0){ e.mark-=dt; if(e.mark<=0){ e.mark=0; sfx("markpop"); burstStars(e.x,e.y,8,e.markD); g.fx.push({k:"boom",x:e.x,y:e.y,r:50,col:"#9a6bff",life:.35,max:.35}); hurt(e,e.markD*2) } }
      if(F.poison && e.burn>0){ e.burn-=dt; e.bt=(e.bt||0)-dt; if(e.bt<=0){ e.bt=.5; hurt(e,e.burnD,true) } } }
    // 소환수
    for(const m of g.sum){
      if(m.t!==undefined) m.t-=dt;
      m.acc-=dt;
      if(m.kind==="phoenix"){ m.a+=dt*2.2; m.x=P.x+Math.cos(m.a)*62; m.y=P.y-30+Math.sin(m.a)*26;
        if(m.acc<=0){ const T=near(m.x,m.y,2); if(T.length){ sfx("arrow"); m.acc=.9*Math.max(.6,s.cd); T.forEach((t,i)=>{ const a=Math.atan2(t.y-m.y,t.x-m.x)+(i?.6:-.6);   // 바람 정령: 쫓아가는 회오리 구슬
          g.shots.push({k:"wisp",fe:1,x:m.x,y:m.y,vx:Math.cos(a)*380,vy:Math.sin(a)*380,dmg:m.dmg*lvScale*.6,pierce:1,life:1.6,hit:new Set(),seek:t}) }) } } }
      else if(m.kind==="clone"){ const bx=P.x-26, by=P.y+6; m.x+=(bx-m.x)*Math.min(1,dt*6); m.y+=(by-m.y)*Math.min(1,dt*6) }
      else if(m.kind==="rabbit"){ const bx=P.x-40, by=P.y+12; m.x+=(bx-m.x)*Math.min(1,dt*4); m.y+=(by-m.y)*Math.min(1,dt*4); m.hop=(m.hop||0)+dt*7;
        if(m.acc<=0){ const t=near(m.x,m.y,1)[0]; if(t){ m.acc=1*Math.max(.6,s.cd); m.face=t.x>=m.x?1:-1; const a=Math.atan2(t.y-m.y,t.x-m.x); g.shots.push({k:"moonorb",sm:1,x:m.x,y:m.y-14,vx:Math.cos(a)*480,vy:Math.sin(a)*480,dmg:m.dmg*lvScale,pierce:0,bounce:1,life:1.2,hit:new Set(),rad:11}) } }
        m.hl=(m.hl??3)-dt; if(m.hl<=0){ m.hl=7; healPulse(P.x,P.y,300,.06); sfx("heal") } }
      else if(m.kind==="rat"){ const sm=M.sum||1; m.cd2=(m.cd2||0)-dt;
        if(!m.tg||m.tg.hp<=0||m.cd2<=0){ m.tg=near(P.x,P.y,3)[Math.floor(Math.random()*3)]||null; m.cd2=1.2 }
        const tx=m.tg?m.tg.x:P.x-30, ty=m.tg?m.tg.y:P.y+20, dx=tx-m.x, dy=ty-m.y, d=Math.hypot(dx,dy)||1; m.face=dx>=0?1:-1; m.run=d>20?1:0;
        if(d>(m.tg?m.tg.r+6:10)){ const sp=Math.min(d/dt,520); m.x+=dx/d*sp*dt; m.y+=dy/d*sp*dt }
        if(m.tg&&d<m.tg.r+14&&m.acc<=0){ m.acc=.28; hurt(m.tg,ZB(m.tg)*m.dmg*lvScale*sm); m.bite=.15 } m.bite=Math.max(0,(m.bite||0)-dt);
        if(Math.hypot(P.x-m.x,P.y-m.y)>520){ m.x=P.x; m.y=P.y } }
      else if(m.kind==="ox"){ const sm=M.sum||1;
        if(m.ch>0){ m.ch-=dt; m.x+=m.cvx*dt; m.y+=m.cvy*dt; g.en.forEach(e=>{ if(e.hp>0&&!m.hitS.has(e)&&inR(m.x,m.y,50,e)){ m.hitS.add(e); hurt(e,ZB(e)*m.dmg*lvScale*sm); if(e.type!=="boss"){ const d=Math.hypot(m.cvx,m.cvy)||1; ccP(e,m.cvx/d*60,m.cvy/d*60) } } }); if(m.ch<=0){ m.acc=2.2*Math.max(.6,s.cd); g.fx.push({k:"boom",x:m.x,y:m.y,r:70,col:"#ffd36a",life:.3,max:.3}); g.en.forEach(e=>{ if(e.hp>0&&inR(m.x,m.y,70,e)) hurt(e,ZB(e)*m.dmg*lvScale*sm*.5) }) } }
        else { const bx=P.x+44, by=P.y+16; m.x+=(bx-m.x)*Math.min(1,dt*3); m.y+=(by-m.y)*Math.min(1,dt*3);
          if(m.acc<=0){ const t=smartTargets(120,1).pts[0]; if(t&&(t.x-P.x)**2+(t.y-P.y)**2<420*420){ const dx=t.x-m.x, dy=t.y-m.y, d=Math.hypot(dx,dy)||1; m.cvx=dx/d*700; m.cvy=dy/d*700; m.ch=Math.min(.7,(d+120)/700); m.hitS=new Set(); m.face=dx>=0?1:-1; sfx("ox") } else m.acc=.5 } } }
      else if(m.kind==="tiger"){ const sm=M.sum||1, was=m.pz>0; m.pz=Math.max(0,(m.pz||0)-dt); m.run=0;
        if(was){ const k=1-m.pz/.3; m.x=m.sx+(m.ex-m.sx)*k; m.y=m.sy+(m.ey-m.sy)*k-Math.sin(k*Math.PI)*40;
          if(m.pz<=0){ g.en.forEach(e=>{ if(inR(m.x,m.y,100,e)) hurt(e,ZB(e)*m.dmg*lvScale*sm*1.2) }); g.fx.push({k:"claw",x:m.x,y:m.y,life:.3,max:.3}); sfx("hit") } }
        else { // 백호는 늘 주술사 곁을 따라다니다가, 주변 몬스터에게 휙 덮쳐서 할퀴고 다시 곁으로 돌아와요
          const bx=P.x-48, by=P.y+20, dx=bx-m.x, dy=by-m.y, d=Math.hypot(dx,dy);
          if(d>6){ const st2=Math.min(d,Math.max(420,d*5)*dt); m.x+=dx/d*st2; m.y+=dy/d*st2; m.run=d>14?1:0; if(Math.abs(dx)>4) m.face=dx>=0?1:-1 }
          if(m.acc<=0&&d<36){ let t=null, bd=1e18; for(const e of near(P.x,P.y,6)){ if(e.hp<=0||e.hidden) continue; const dd=(e.x-P.x)**2+(e.y-P.y)**2; if(dd<190*190&&dd<bd){ bd=dd; t=e } }   // 곁으로 돌아온 뒤에만, 주술사 가까이 온 몬스터에게만 덮쳐요
            if(t){ m.acc=1.0*Math.max(.6,s.cd); m.sx=m.x; m.sy=m.y; m.ex=t.x; m.ey=t.y; m.pz=.3; m.face=t.x>=m.x?1:-1; sfx("ox") } else m.acc=.15 }
          if(Math.hypot(P.x-m.x,P.y-m.y)>500){ m.x=bx; m.y=by } }
        m.rr=(m.rr??5)-dt; if(m.rr<=0){ m.rr=9; sfx("roar"); g.fx.push({k:"roar",x:m.x,y:m.y,r:220,life:.6,max:.6}); g.en.forEach(e=>{ if(inR(m.x,m.y,220,e)){ ccS(e,1); hurt(e,ZB(e)*m.dmg*lvScale*sm*.5) } }) } }
      else if(m.kind==="qdragon"){ m.a+=dt*1.35; const tx=P.x+Math.cos(m.a)*240, ty=P.y-30+Math.sin(m.a)*125; m.x+=(tx-m.x)*Math.min(1,dt*4); m.y+=(ty-m.y)*Math.min(1,dt*4); m.face=-Math.sin(m.a)>=0?1:-1;
        if(m.acc<=0&&m.t>.3){ const TG=smartTargets(110,3).pts, t0=TG[Math.floor(Math.random()*TG.length)], t=(t0&&near(t0.x,t0.y,1)[0])||near(m.x,m.y,1)[0]; if(t){ m.acc=m.rate; const a=Math.atan2(t.y-m.y,t.x-m.x); g.shots.push({k:"dball",x:m.x,y:m.y,vx:Math.cos(a)*600,vy:Math.sin(a)*600,dmg:m.dmg,pierce:0,boom:110,boomMul:1,life:1.2,hit:new Set(),rad:18,seek:t,sd:.05}) } }
        m.br=(m.br??1.2)-dt; if(m.br<=0&&m.t>.5){ m.br=2.4; const TS=smartTargets(150,3).pts; if(TS.length){ sfx("dragon"); TS.forEach((T,i)=>{ g.pending.push({t:i*.12,run:()=>{ g.fx.push({k:"bolt",bt:"dragon",x:T.x,y:T.y,life:.5,max:.5}); g.fx.push({k:"boom",x:T.x,y:T.y,r:150,col:"#6ab0ff",life:.45,max:.45}); g.fx.push({k:"ring",x:T.x,y:T.y,life:.4,max:.4}); g.en.forEach(e=>{ if(inR(T.x,T.y,150,e)) hurt(e,ZB(e)*m.dmg*.55) }) }}) }); g.shake=Math.max(g.shake,.25) } }
        // 청룡이 몸으로 휩쓸고 지나간 자리: 푸른 불길이 몬스터 무리를 태워요
        m.sw=(m.sw??.3)-dt; if(m.sw<=0&&m.t>.3){ m.sw=.25; g.en.forEach(e=>{ if(e.hp>0&&inR(m.x,m.y+30,95,e)) hurt(e,ZB(e)*m.dmg*.16) }); if(g.fx.length<(NM?110:150)) g.fx.push({k:"boom",x:m.x,y:m.y+30,r:85,col:"#4aa0ff",life:.32,max:.32}) }
        // 떠나기 직전: 청룡의 포효 (화면 가득 푸른 충격)
        if(!m.fin&&m.t<.35){ m.fin=1; sfx("bigboom"); g.shake=Math.max(g.shake,.5); g.fx.push({k:"flash",col:"#9ad0ff",life:.35,max:.35}); g.fx.push({k:"boom",x:P.x,y:P.y,r:380,col:"#5ab4ff",life:.6,max:.6}); g.fx.push({k:"ring",x:P.x,y:P.y,life:.5,max:.5}); g.en.forEach(e=>{ if(e.hp>0&&inR(P.x,P.y,380,e)) hurt(e,ZB(e)*m.dmg*1.6) }) } }
      else if(m.kind==="drone"){ m.a+=dt*2.6; m.x=P.x+Math.cos(m.a)*52; m.y=P.y-44+Math.sin(m.a*2)*10;
        if(m.acc<=0){ const t=near(m.x,m.y,1)[0]; if(t&&(t.x-m.x)**2+(t.y-m.y)**2<420*420){ m.acc=.4*Math.max(.6,s.cd); const a=Math.atan2(t.y-m.y,t.x-m.x); m.aim=a; g.shots.push({k:"laser",x:m.x,y:m.y,vx:Math.cos(a)*900,vy:Math.sin(a)*900,dmg:m.dmg*lvScale,pierce:1,life:.5,hit:new Set()}) } }
        m.rp=(m.rp??4)-dt; if(m.rp<=0){ m.rp=4; healMe(st().maxHp*.025); g.fx.push({k:"ring",x:P.x,y:P.y,life:.3,max:.3}) } }
      else if(m.kind==="ifrit"){ // 곁을 따라다니며 불꽃 숨결 + 화염탄
        const hx=P.x+46, hy=P.y-34+Math.sin(g.t*2.5)*6; m.x+=(hx-m.x)*Math.min(1,dt*5); m.y+=(hy-m.y)*Math.min(1,dt*5); m.a+=dt*8;
        const t=near(m.x,m.y,1)[0]; m.face=t?Math.atan2(t.y-m.y,t.x-m.x):(m.face||0);
        m.breath=Math.max(0,(m.breath||0)-dt);
        if(t && (t.x-m.x)**2+(t.y-m.y)**2<330**2){
          if(m.acc<=0){ m.acc=.25; m.breath=.3; const R=250, half=.42;
            g.en.forEach(e=>{ const dx=e.x-m.x, dy=e.y-m.y, d=Math.hypot(dx,dy); if(d<R+e.r){ let a=Math.atan2(dy,dx)-m.face; a=Math.atan2(Math.sin(a),Math.cos(a)); if(Math.abs(a)<half) hurt(e,m.dmg*lvScale*.6) } }) }
          m.fb=(m.fb||0)-dt;
          if(m.fb<=0){ sfx("ifrit"); m.fb=1.6*Math.max(.6,s.cd); const dx=t.x-m.x, dy=t.y-m.y, d=Math.hypot(dx,dy)||1;
            g.shots.push({k:"fire",big:1,x:m.x,y:m.y,vx:dx/d*460,vy:dy/d*460,dmg:m.dmg*lvScale*2,boom:90,pierce:0,life:1.2,hit:new Set()}) } } }
      else if(m.kind==="crew"){ const bx=P.x+m.side*44, by=P.y+18; m.x+=(bx-m.x)*Math.min(1,dt*5); m.y+=(by-m.y)*Math.min(1,dt*5);
        m.fl=Math.max(0,(m.fl||0)-dt);
        if(m.acc<=0){ const t=near(m.x,m.y,1)[0]; if(t){ m.acc=.5*Math.max(.6,s.cd); const a=Math.atan2(t.y-m.y,t.x-m.x); m.aim=a; m.fl=.08; sfx("gun");
          g.shots.push({k:"bullet",x:m.x,y:m.y,vx:Math.cos(a)*760,vy:Math.sin(a)*760,dmg:m.dmg*lvScale,pierce:0,life:.7,hit:new Set(),cb:m.side>0?1:0,boom:m.side>0?60:0,boomMul:.5}); g.fx.push({k:"muzzle",x:m.x+Math.cos(a)*14,y:m.y+Math.sin(a)*14,life:.06,max:.06}) } } }
      else if(m.kind==="flare"){ m.a+=dt*5; m.x+=(P.x-m.x)*Math.min(1,dt*2); m.y+=(P.y-m.y)*Math.min(1,dt*2);
        if(m.acc<=0){ m.acc=m.rate; for(let i=0;i<3;i++){ const a=m.a+i*Math.PI*2/3; g.shots.push({k:"star",x:m.x,y:m.y,vx:Math.cos(a)*460,vy:Math.sin(a)*460,dmg:m.dmg,pierce:1,life:.9,hit:new Set(),dark:true}) } } }
      else if(m.kind==="octo"){
        m.fl=Math.max(0,(m.fl||0)-dt); { const t0=near(m.x,m.y,1)[0]; if(t0) m.aim=Math.atan2(t0.y-(m.y-36),t0.x-m.x) }
        if(m.acc<=0 && m.max-m.t>.35){ const t=near(m.x,m.y,1)[0]; if(t){ m.acc=m.rate; m.fl=.12; sfx("cannon"); const a=Math.atan2(t.y-(m.y-36),t.x-m.x);
          g.shots.push({k:"bullet",x:m.x+Math.cos(a)*28,y:m.y-36+Math.sin(a)*28,vx:Math.cos(a)*720,vy:Math.sin(a)*720,dmg:m.dmg,pierce:0,life:.8,hit:new Set(),ink:true,cb:1,boom:55,boomMul:.5}) } } }
    }
    g.sum=g.sum.filter(m=>m.t===undefined||m.t>0);
  }
  const TXTK={label:1,crit:1,num:1,bosscast:1};
  const CUTC={"warrior": ["#7a4a10", "#f6c544", "#fff2a0"], "archer": ["#0e5a3a", "#3fcf8e", "#c8ffe6"], "thief": ["#1a0a30", "#7a3ad0", "#e0c8ff"], "mage": ["#5a0e0e", "#e8502a", "#ffe0a0"], "pirate": ["#0e2a5a", "#3a8ad8", "#c8ecff"], "healer": ["#1a2050", "#9aaeff", "#f0f4ff"], "calli": ["#141018", "#c49a3a", "#fff4d0"], "zodiac": ["#5a1a0a", "#e8a03a", "#fff0c0"], "mech": ["#2a1a0a", "#d84a2a", "#9ae0ff"]};
  function drawSkillsUnder(){
    for(const z of g.zones){ if(z.what==="moon") continue; const PF=HDFX&&PFX._ok3; if(z.what==="rain") (PF?pfxRain(ctx,z,g.t):jfRain(ctx,z,g.t,GLOW)); else (PF?pfxMist(ctx,z,g.t):jfMist(ctx,z,g.t,GLOW)) }
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
    if(g.shield>0) drawShieldBubble(ctx,P,g.t,Math.min(1,g.shieldT/.5));
    for(const m of g.sum){ if(drawNewSum(ctx,m,g.t,GLOW)) continue;
      if(m.kind==="phoenix"){ const dir=-Math.sin(m.a)>=0?1:-1, fl=Math.sin(g.t*11);   // 궁수 2차: 초록 바람새 — 날갯짓하며 바람 결을 끌고 빙글빙글
        ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,m.x,m.y,56,window.__t5==="archer"?"120,170,255":"90,255,180",.5);
        ctx.lineCap="round"; for(let i=0;i<3;i++){ const r=34+i*10, a0=g.t*(4-i*.6)+i*2.1; ctx.strokeStyle=`rgba(${170+i*30},255,${215+i*12},${.55-i*.12})`; ctx.lineWidth=3.2-i*.8; ctx.beginPath(); ctx.ellipse(m.x,m.y+6,r,r*.42,0,a0,a0+2.4); ctx.stroke() }
        for(let i=0;i<9;i++){ const ph=(g.t*1.5+i/9)%1; ctx.save(); ctx.translate(m.x-dir*(16+ph*54)+Math.sin(i*3+g.t*5)*7,m.y+8+ph*10); ctx.rotate(g.t*6+i); ctx.fillStyle=`rgba(190,255,225,${(1-ph)*.9})`; ctx.beginPath(); ctx.ellipse(0,0,5*(1-ph)+2,1.6,0,0,7); ctx.fill(); ctx.restore() } ctx.restore();
        if(SKILL_IMG.fly_windbird&&!window.__noArt){ const im=SKILL_IMG.fly_windbird, N=4, cw=im.width/N, ch=im.height, Hh=84, Ww=Hh*cw/ch, idx=Math.floor(g.t*9+m.a)%N; ctx.save(); ctx.translate(m.x,m.y+Math.sin(g.t*5)*3); ctx.scale(dir,1); ctx.drawImage(im,idx*cw,0,cw,ch,-Ww/2,-Hh*.6,Ww,Hh); ctx.restore() }   // 날갯짓 4장면
        else if(SKILL_IMG.windbird){ ctx.save(); ctx.translate(m.x,m.y+Math.sin(g.t*5)*3); ctx.rotate(dir*.12); ctx.scale(1,1+fl*.1); drawSkillImg(ctx,"windbird",92,dir<0); ctx.restore() } else if(PFX.sylph) drawSylph(ctx,m,g.t); else jfPhoenix(ctx,m,g.t,GLOW) }
      else if(m.kind==="clone") jfClone(ctx,m,heroImg,g.t);
      else if(m.kind==="crew"){ if(!(HDFX&&drawCrewArt(ctx,m,g.t,GLOW))) jfCrew(ctx,m,g.t,GLOW) }
      else if(m.kind==="flare") jfFlare(ctx,m,g.t,GLOW);
      else if(m.kind==="octo"){ if(SKILL_IMG.octo){ const age=m.max-m.t, k=Math.min(1,m.t/.4), drop=age<.3?(1-age/.3):0, rec=Math.max(0,m.fl||0)/.12, right=Math.cos(m.aim||0)>0;
          ctx.save(); ctx.translate(m.x,m.y); ctx.globalAlpha=k; ctx.fillStyle="rgba(0,0,0,.25)"; ctx.beginPath(); ctx.ellipse(0,16,26,7,0,0,7); ctx.fill();
          if(age<.55&&age>.25){ const p=(age-.25)/.3; ctx.strokeStyle=`rgba(200,240,255,${1-p})`; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(0,14,20+p*50,(20+p*50)*.4,0,0,7); ctx.stroke() }
          const sq=1+Math.sin(g.t*4)*.03+rec*.08, SH=window.__t5==="pirate";
          if(SH){ const pu=.6+.4*Math.sin(g.t*4); ctx.save(); ctx.globalCompositeOperation=GLOW; const rg=ctx.createRadialGradient(0,10,4,0,10,62); rg.addColorStop(0,`rgba(60,230,255,${.55*pu})`); rg.addColorStop(1,"rgba(60,230,255,0)"); ctx.fillStyle=rg; ctx.beginPath(); ctx.ellipse(0,10,62,24,0,0,7); ctx.fill(); ctx.strokeStyle=`rgba(120,240,255,${.5+.4*pu})`; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(0,14,44,15,0,0,7); ctx.stroke(); ctx.restore() }   /* 5차 상어 대포: 크게 · 발밑에 청록 빛 고리 */
          ctx.translate((right?-1:1)*rec*5,-22-drop*160); ctx.scale(1/sq,sq); if(SH){ ctx.shadowColor="#5ae0ff"; ctx.shadowBlur=14; drawSkillImg(ctx,"octo",108,!right) } else drawSkillImg(ctx,"octo",74,right); ctx.restore() } else jfOcto(ctx,m,g.t,GLOW) }
      else if(m.kind==="ifrit"){
        if(m.breath>0&&typeof drawFireBreath==="function"&&drawFireBreath(ctx,m.x+Math.cos(m.face)*18,m.y-26+Math.sin(m.face)*10,m.face,265,Math.min(1,m.breath/.12),g.t)){}
        else if(m.breath>0&&HDFX&&PFX.boom_fire0){ ctx.save(); ctx.translate(m.x,m.y); ctx.rotate(m.face); ctx.globalCompositeOperation="lighter";
          for(let i=0;i<14;i++){ const ph=((g.t*2.4+i/14)%1), sp=(jr(i,3)-.5)*.66*ph, d=18+ph*225, fi=Math.min(5,Math.floor(ph*5.5)); pfxDraw(ctx,"boom_fire"+fi,Math.cos(sp)*d,Math.sin(sp)*d,i*1.3+g.t*2,.3+ph*.95,(1-ph*ph)*.8) }
          jGlow(ctx,20,0,46,"255,190,90",.7); ctx.restore() }
        else if(m.breath>0){ ctx.save(); ctx.globalCompositeOperation=GLOW; ctx.translate(m.x,m.y); ctx.rotate(m.face); const k=m.breath/.25;
          const gr=ctx.createRadialGradient(0,0,10,0,0,250); gr.addColorStop(0,`rgba(255,250,200,${.85*k})`); gr.addColorStop(.35,`rgba(255,170,60,${.7*k})`); gr.addColorStop(.75,`rgba(230,70,40,${.45*k})`); gr.addColorStop(1,"rgba(150,20,20,0)");
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
  /* ===== 5차 각성 연출 ===== */
  const AWK_C={warrior:["255,140,50","255,215,110"],archer:["140,180,255","225,235,255"],thief:["170,90,255","240,200,255"],mage:["255,110,40","255,220,120"],pirate:["60,170,255","200,240,255"],healer:["255,230,140","255,250,220"],calli:["220,180,90","255,245,210"],zodiac:["255,150,60","255,230,160"],mech:["90,210,255","220,250,255"]};
  const SIMG=k=>typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG[k]&&SKILL_IMG[k].width?SKILL_IMG[k]:null;
  function drawAwaken(x,y,t,mv,S,id){ const c=ctx, C=AWK_C[id]||AWK_C.warrior, pu=.6+.4*Math.sin(t*3);
    c.save(); c.globalCompositeOperation="lighter";
    const GP=SIMG("goldpillar"); if(GP){ const pw=96, ph=pw*GP.height/GP.width*(1+.05*pu); c.globalAlpha=.32+.14*pu; c.drawImage(GP,x-pw/2,y+26-ph,pw,ph) }
    const ag=c.createRadialGradient(x,y+20,4,x,y+20,78); ag.addColorStop(0,`rgba(${C[0]},.6)`); ag.addColorStop(1,`rgba(${C[0]},0)`); c.globalAlpha=.75*pu; c.fillStyle=ag; c.beginPath(); c.ellipse(x,y+20,78,26,0,0,7); c.fill();
    const GR=SIMG("goldring"); if(GR){ const rw=128, rh=rw*GR.height/GR.width; c.globalAlpha=.6+.3*pu; c.drawImage(GR,x-rw/2,y+22-rh/2,rw,rh); const q=(t*.6)%1, s2=1+q*.6; c.globalAlpha=.5*(1-q); c.drawImage(GR,x-rw*s2/2,y+22-rh*s2/2,rw*s2,rh*s2) }
    else for(let k=0;k<2;k++){ const q=(t*.7+k*.5)%1; c.globalAlpha=.85*(1-q); c.strokeStyle=`rgb(${C[1]})`; c.lineWidth=3; c.beginPath(); c.ellipse(x,y+22,30+q*50,10+q*16,0,0,7); c.stroke() }
    if(S){ const T=S.awkT||(S.awkT=[]); if(mv>.2&&t-(S.awkL||0)>.09){ S.awkL=t; T.push({x:x+(Math.random()-.5)*14,y:y+24,t}) } while(T.length&&t-T[0].t>.8) T.shift();
      for(const p of T){ const a=1-(t-p.t)/.8; c.globalAlpha=.75*a; c.fillStyle=`rgb(${C[0]})`; c.beginPath(); c.ellipse(p.x,p.y,7*a+3,3*a+1.5,0,0,7); c.fill(); c.fillStyle=`rgb(${C[1]})`; c.fillRect(p.x-1.5,p.y-10*(1-a)-2,3,3) } }
    for(let i=0;i<16;i++){ const ph=(t*.6+i/16)%1, a=i*2.39996, rr=16+ (i%3)*8; c.globalAlpha=(1-ph)*.95; c.fillStyle=i%2?`rgb(${C[0]})`:`rgb(${C[1]})`; const sz=i%4?3:4.5; c.fillRect(x+Math.cos(a)*rr+Math.sin(t*2+i)*4-sz/2,y+18-ph*70-sz/2,sz,sz) }
    c.restore() }
  function fireTint(im){ if(fireTint.c) return fireTint.c; try{ const cv=document.createElement("canvas"); cv.width=im.width; cv.height=im.height; const c2=cv.getContext("2d"); c2.filter="hue-rotate(-32deg) saturate(2.4)"; c2.drawImage(im,0,0); fireTint.c=cv; return cv }catch(e){ return fireTint.c=im } }
  /* 한자 룬: 발밑을 도는 작은 보석 · 공명하는 두 룬은 빛줄기로 이어지고 함께 맥박쳐요 */
  const RUNES=engOf(HERO.id).map(h=>({h,c:RUNE_C[engType(h)[0]]||"#fff",lv:engLv(h)})), RUNE_RES=engCombos(engOf(HERO.id)).map(c=>[c[0],c[1]]);
  function drawRunes(x,y,t){ const c=ctx, n=RUNES.length, R=44, pos=[];
    for(let i=0;i<n;i++){ const a=t*.9+i*Math.PI*2/n; pos.push([x+Math.cos(a)*R,y+16+Math.sin(a)*R*.38,Math.sin(a)]) }
    c.save(); c.globalCompositeOperation=GLOW;
    for(const [a,b] of RUNE_RES){ const i=RUNES.findIndex(r=>r.h===a), j=RUNES.findIndex(r=>r.h===b); if(i<0||j<0) continue; const pu=.5+.5*Math.sin(t*5), A=pos[i], B=pos[j];
      const lg=c.createLinearGradient(A[0],A[1],B[0],B[1]); lg.addColorStop(0,RUNES[i].c); lg.addColorStop(1,RUNES[j].c); c.strokeStyle=lg; c.globalAlpha=.45+.45*pu; c.lineWidth=3+2*pu; c.beginPath(); c.moveTo(A[0],A[1]); c.quadraticCurveTo((A[0]+B[0])/2,(A[1]+B[1])/2-26,B[0],B[1]); c.stroke();
      const q=(t*.8)%1; c.globalAlpha=.6*(1-q); c.lineWidth=2; c.strokeStyle="#fff6c8"; c.beginPath(); c.ellipse(x,y+16,R*(.6+q*.9),R*.38*(.6+q*.9),0,0,7); c.stroke() }
    if(g.resT!==undefined&&t-g.resT<1.2){ const q=(t-g.resT)/1.2; c.globalAlpha=1-q; c.strokeStyle="#ffe9a0"; c.lineWidth=5*(1-q)+1; c.beginPath(); c.ellipse(x,y+16,30+q*160,12+q*60,0,0,7); c.stroke() }
    c.restore();
    c.save(); c.font='900 13px "Noto Serif KR",serif'; c.textAlign="center"; c.textBaseline="middle";
    pos.map((p,i)=>[p,i]).sort((a,b)=>a[0][2]-b[0][2]).forEach(([p,i])=>{ const r=RUNES[i], res=RUNE_RES.some(z=>z.includes(r.h)), s=(r.lv>=3?9:8)*(res?1+.12*Math.sin(t*5):1);
      c.globalAlpha=p[2]<0?.6:1; const RI=SIMG("rune"+Math.max(1,Math.min(4,r.lv)));
      if(RI){ const w=s*(r.lv>=4?3.1:2.6); c.drawImage(RI,p[0]-w/2,p[1]-w/2,w,w); c.save(); c.globalCompositeOperation=GLOW; c.globalAlpha*=.5; c.fillStyle=r.c; c.beginPath(); c.arc(p[0],p[1],s*.55,0,7); c.fill(); c.restore() }
      else { c.fillStyle=r.c; c.beginPath(); for(let k=0;k<8;k++){ const b=k*Math.PI/4+Math.PI/8; c.lineTo(p[0]+Math.cos(b)*s,p[1]+Math.sin(b)*s) } c.closePath(); c.fill();
      c.strokeStyle="rgba(255,255,255,.75)"; c.lineWidth=1.2; c.stroke() } if(r.lv>=3||res){ c.save(); c.globalCompositeOperation=GLOW; c.globalAlpha=.5; c.fillStyle=r.c; c.beginPath(); c.arc(p[0],p[1],s*1.7,0,7); c.fill(); c.restore() }
      c.lineWidth=2.5; c.strokeStyle="rgba(20,10,30,.85)"; c.strokeText(r.h,p[0],p[1]+.5); c.fillStyle="#fff"; c.fillText(r.h,p[0],p[1]+.5) }); c.restore() }
  function drawAwkTag(x,y){ const c=ctx; c.save(); c.font='bold 13px "Do Hyeon",sans-serif'; c.textAlign="center"; c.textBaseline="middle"; const tx="✦ 5차 각성 ✦", w=c.measureText(tx).width+16, pu=.5+.5*Math.sin(g.t*4);
    const lg=c.createLinearGradient(x-w/2,0,x+w/2,0); lg.addColorStop(0,"#ff5ad8"); lg.addColorStop(.5,"#ffb347"); lg.addColorStop(1,"#ff5ad8"); c.fillStyle=lg; c.shadowColor="#ff5ad8"; c.shadowBlur=8+8*pu;
    c.beginPath(); c.roundRect?c.roundRect(x-w/2,y-9,w,18,9):c.rect(x-w/2,y-9,w,18); c.fill(); c.shadowBlur=0; c.lineWidth=1.5; c.strokeStyle="#fff2c0"; c.stroke(); c.lineWidth=3; c.strokeStyle="#3a0a2a"; c.strokeText(tx,x,y+1); c.fillStyle="#ffffff"; c.fillText(tx,x,y+1); c.restore() }
  function drawCollapse(f,k){ const age=(1-k)*f.max, pre=f.drop||0;
    if(pre&&age<pre){ const u=age/pre, IM=SIMG(f.img); ctx.save(); ctx.fillStyle=`rgba(0,0,0,${.15+.35*u})`; ctx.beginPath(); ctx.ellipse(f.x,f.y+10,f.r*(.25+.35*u),f.r*(.1+.14*u),0,0,7); ctx.fill();
      ctx.globalCompositeOperation=GLOW; ctx.strokeStyle=`rgba(${f.col||"255,140,50"},${.4+.5*u})`; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(f.x,f.y+10,f.r*1.1,f.r*.8,0,0,7); ctx.stroke(); ctx.restore();
      if(IM){ const w=f.r*1.5, h=w*IM.height/IM.width, dy=-(1-u*u)*H*.9; ctx.save(); ctx.globalAlpha=Math.min(1,u*3); ctx.drawImage(IM,f.x-w/2,f.y+10-h*.75+dy,w,h); ctx.restore() } return }
    if(pre) k=Math.max(0,Math.min(1,f.life/(f.max-pre)));
    const c=ctx, q=1-k, R=f.r, IM=SIMG(f.img||"collapse5"), C=f.col||"255,140,50", gr=ease(Math.min(1,q/.22)), al=q<.7?1:Math.max(0,(1-q)/.3);
    c.save(); c.globalCompositeOperation=GLOW; c.globalAlpha=.6*al; const rg=c.createRadialGradient(f.x,f.y+10,10,f.x,f.y+10,R*1.1); rg.addColorStop(0,"rgba(255,240,200,.9)"); rg.addColorStop(.5,`rgba(${C},.45)`); rg.addColorStop(1,`rgba(${C},0)`); c.fillStyle=rg; c.beginPath(); c.ellipse(f.x,f.y+10,R*1.1,R*.8,0,0,7); c.fill(); c.restore();
    if(IM){ const w=R*(pre?1.5:2.0)*(pre?1:.55+.45*gr), h=w*IM.height/IM.width; c.save(); c.globalAlpha=al; c.drawImage(IM,f.x-w/2,f.y+10-h*(pre?.75:.62),w,h); c.restore() }
    c.save(); c.globalCompositeOperation=GLOW; for(let i=0;i<(f.rings||2);i++){ const s=Math.min(1,q*1.6-i*.25); if(s<=0) continue; c.globalAlpha=Math.max(0,1-s)*.9; c.strokeStyle=i?"rgba(255,240,200,1)":`rgb(${C})`; c.lineWidth=10*(1-s)+2; c.beginPath(); c.ellipse(f.x,f.y+10,R*s*1.1,R*s*.8,0,0,7); c.stroke() } c.restore() }
  function drawLavaField(f,k){ const c=ctx, R=f.r, pu=.6+.4*Math.sin(g.t*6), al=Math.min(1,k*3,(1-k)*8), C=f.col||"255,140,50", C2=f.col2||"255,215,110";
    c.save(); c.globalCompositeOperation=GLOW; c.globalAlpha=.4*al*pu; const rg=c.createRadialGradient(f.x,f.y+10,6,f.x,f.y+10,R); rg.addColorStop(0,`rgba(${C2},.85)`); rg.addColorStop(.7,`rgba(${C},.35)`); rg.addColorStop(1,`rgba(${C},0)`); c.fillStyle=rg; c.beginPath(); c.ellipse(f.x,f.y+10,R,R*.75,0,0,7); c.fill();
    if(f.orb){ const OI=SIMG(f.orb); if(OI){ c.globalCompositeOperation="source-over"; for(let i=0;i<6;i++){ const a=g.t*2.4+i*Math.PI/3, x=f.x+Math.cos(a)*R*.72, y=f.y+10+Math.sin(a)*R*.54, s=26; const sqr=OI.width/OI.height<1.3, w2=sqr?s:s*1.6, h2=w2*OI.height/OI.width; c.save(); c.globalAlpha=al; c.translate(x,y); c.rotate(sqr?g.t*14+i:a+Math.PI/2); c.drawImage(OI,-w2/2,-h2/2,w2,h2); c.restore() } c.globalCompositeOperation=GLOW } }
    c.globalAlpha=al; for(let i=0;i<14;i++){ const ph=(g.t*.8+i/14)%1, a=i*2.39996, rr=R*(.2+.75*((i*37)%14)/14); c.globalAlpha=al*(1-ph); c.fillStyle=i%2?`rgb(${C2})`:`rgb(${C})`; c.fillRect(f.x+Math.cos(a)*rr-2,f.y+10+Math.sin(a)*rr*.75-ph*40-2,4,4) } c.restore() }
  function drawCut5(f,k){ const IM=SIMG(f.img); if(!IM){ jfCutin(ctx,f,k,W,H,heroImg,g.t,GLOW); return }
    const c=ctx, q=1-k, al=Math.min(1,q/.1,(1-q)/.15), ar=IM.width/IM.height, w=Math.min(W*.94,H*.36*ar), h=w/ar, y=H*.08, x=cutinX(f,W)+(W-w)/2, sk=Math.min(40,w*.05);
    f.ty=y+h-26;
    c.save(); c.imageSmoothingEnabled=true; c.fillStyle=`rgba(10,2,0,${.38*al})`; c.fillRect(0,0,W,H); c.globalAlpha=al;
    c.beginPath(); c.moveTo(x+sk,y); c.lineTo(x+w+sk,y); c.lineTo(x+w-sk,y+h); c.lineTo(x-sk,y+h); c.closePath(); c.save(); c.clip(); c.drawImage(IM,x-sk,y,w+sk*2,h);
    const sh=((q*1.4)%1)*(w+200)-100; const lg=c.createLinearGradient(x+sh-80,0,x+sh+80,0); lg.addColorStop(0,"rgba(255,230,160,0)"); lg.addColorStop(.5,"rgba(255,230,160,.35)"); lg.addColorStop(1,"rgba(255,230,160,0)"); c.fillStyle=lg; c.fillRect(x-sk,y,w+sk*2,h);
    const bg=c.createLinearGradient(0,y+h*.55,0,y+h); bg.addColorStop(0,"rgba(20,4,0,0)"); bg.addColorStop(1,"rgba(20,4,0,.75)"); c.fillStyle=bg; c.fillRect(x-sk,y,w+sk*2,h); c.restore();
    c.lineWidth=4; c.strokeStyle=f.c3||"#ffd36a"; c.shadowColor=f.c2||"#ff7a2a"; c.shadowBlur=16; c.stroke(); c.restore() }
  function drawFx(){} function drawSkillFx(f,k){
    if(typeof drawArtFx==="function"&&drawArtFx(ctx,f,k,g.t)) return true;
    if(drawNewFx(ctx,f,k,g.t,GLOW,g.p)) return true;
    if(f.k==="hitspk"){ drawHitSpark(ctx,f,k,HERO.id); return true }
    if(f.k==="bigslash"){ jfBigSlash(ctx,f,k,GLOW); return true }
    if(f.k==="quake"){ jfQuake(ctx,f,k,GLOW,g.t); return true }
    if(f.k==="collapse"){ drawCollapse(f,k); return true }
    if(f.k==="lavafield"){ drawLavaField(f,k); return true }
    if(f.k==="meteor"){ if(f.th==="bolt"&&typeof drawArtFall==="function"&&drawArtFall(ctx,f,k,g.t)) return true; if(!(f.th&&drawThemeFall(ctx,f,k,g.t))) jfMeteor(ctx,f,k,GLOW,g.t); return true }
    if(f.k==="none") return true;
    if(f.k==="crossfx"){ drawCrossFx(ctx,f,k,g.t); return true }
    if(f.k==="scorch") return true;
    if(f.k==="shell"){ jfShell(ctx,f,k,GLOW,g.t); return true }
    if(f.k==="boom"){ if(f.th&&drawThemeBoom(ctx,f,k,g.t)) return true; if(!(HDFX&&PFX._ok3&&pfxBoom(ctx,f,k))) jfBoom(ctx,f,k,GLOW); return true }
    if(f.k==="warn"){ jfWarn(ctx,f,k,g.t); return true }
    if(f.k==="safe"&&f.sun&&SKILL_IMG.sunbeam&&!window.__noArt){ const im=SKILL_IMG.sunbeam, q=1-k, sc=f.r*2.15/(im.width*.577), Wd=im.width*sc, Hd=im.height*sc, al=Math.min(1,q*3)*(k<.2?1.4:1.1);   // 신전: 구름 틈으로 내리쬐는 햇빛 (심판 직전 더 밝게)
      ctx.save(); ctx.globalCompositeOperation=GLOW; ctx.globalAlpha=Math.min(1,al); ctx.drawImage(im,f.x-Wd*.664,f.y-Hd*.842,Wd,Hd); ctx.restore() }
    if(f.k==="safe"&&typeof drawWarnEllipse==="function"&&drawWarnEllipse(ctx,"warnsafe",SAFE_COL,f.x,f.y,f.r*1.05,f.r*1.05,Math.min(1,(1-k)*4)*(.75+.25*Math.sin(g.t*5)))){ ctx.save(); ctx.globalCompositeOperation=GLOW; ctx.fillStyle="rgba(120,255,160,.1)"; ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,7); ctx.fill(); ctx.restore(); return true }
    if(f.k==="safe"){ const p=1-k; ctx.save(); ctx.globalCompositeOperation=GLOW; const gg=ctx.createRadialGradient(f.x,f.y,f.r*.2,f.x,f.y,f.r); gg.addColorStop(0,"rgba(255,245,200,.35)"); gg.addColorStop(1,"rgba(255,230,150,.1)"); ctx.fillStyle=gg; ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,7); ctx.fill();
      ctx.strokeStyle=`rgba(255,240,170,${.6+.4*Math.sin(g.t*12)})`; ctx.lineWidth=5; ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,7); ctx.stroke(); ctx.lineWidth=2; ctx.beginPath(); ctx.arc(f.x,f.y,f.r*(1-p*.15),0,Math.PI*2*k); ctx.stroke(); ctx.restore();
      ctx.fillStyle=`rgba(120,60,200,${.12*p})`; ctx.fillRect(f.x-2000,f.y-2000,4000,4000); return true }
    if(f.k==="icicle"){ const p=1-k, y=f.y-280*(1-Math.min(1,p*1.15)); ctx.fillStyle="#e8f8ff"; ctx.strokeStyle="#5a9ad0"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(f.x-10,y-60); ctx.lineTo(f.x+10,y-60); ctx.lineTo(f.x,y); ctx.closePath(); ctx.fill(); ctx.stroke(); return true }
    if(f.k==="blackhole"){ const p=1-k; ctx.save(); ctx.globalCompositeOperation=GLOW; for(let i=0;i<3;i++){ ctx.strokeStyle=`rgba(${i===1?"255,120,220":"150,100,255"},.5)`; ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(f.x,f.y,f.r*(.35+i*.2)*(1-p*.3),f.r*(.15+i*.08)*(1-p*.3),0,-g.t*4+i,-g.t*4+i+4); ctx.stroke() }
      for(let i=0;i<24;i++){ const ph=(g.t*.9+i/24)%1, a=i*2.4-g.t*3, R=f.r*(1-ph); ctx.fillStyle=`rgba(230,210,255,${ph})`; ctx.fillRect(f.x+Math.cos(a)*R-2,f.y+Math.sin(a)*R*.5-2,4,4) } ctx.restore();
      ctx.fillStyle="#03010a"; ctx.beginPath(); ctx.arc(f.x,f.y,30+p*20,0,7); ctx.fill(); ctx.strokeStyle="#ffc870"; ctx.lineWidth=3; ctx.stroke(); return true }
    if(f.k==="cboom"&&SKILL_IMG.cboom&&!window.__noArt){ const im=SKILL_IMG.cboom, q=1-k, S=(34+52*Math.sqrt(q)); ctx.save(); ctx.translate(f.x,f.y); ctx.rotate(f.x*.01); ctx.globalCompositeOperation=GLOW; ctx.globalAlpha=Math.min(1,k*2); ctx.drawImage(im,-S/2,-S/2,S,S); ctx.restore(); return true }
    if(f.k==="cboom") return true;
    if(f.k==="slash"&&HERO.id==="warrior"&&typeof SKILL_IMG!=="undefined"&&!window.__noArt&&SKILL_IMG.wslash){ const im=window.__t5==="warrior"?fireTint(SKILL_IMG.wslash):SKILL_IMG.wslash, q=1-k, R=f.r*(.92+.13*Math.min(1,q*3)), sc=R/(im.width*.39), W2=im.width*sc;
      // 금빛 바위 검기 그림: 볼록한 쪽이 벤 방향을 향해요 (휘두르는 순간 확 펼쳐졌다가 사라짐)
      ctx.save(); ctx.translate(f.x,f.y); ctx.rotate(f.a+Math.PI); if(f.flip) ctx.scale(1,-1); ctx.globalCompositeOperation=GLOW; ctx.globalAlpha=Math.min(1,k*1.8);
      ctx.drawImage(im,-W2*.654,-W2*.5,W2,W2); if(q<.3){ ctx.globalAlpha=(.3-q)*2; ctx.drawImage(im,-W2*.654,-W2*.5,W2,W2) } ctx.restore(); return true }
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
      else if(f.k==="ucharge"){ const q=1-k, cx=W/2, cy=H/2+8; ctx.save(); ctx.fillStyle=`rgba(4,2,10,${.45*Math.min(1,q*3)})`; ctx.fillRect(0,0,W,H); ctx.globalCompositeOperation="lighter"; ctx.strokeStyle=f.col; ctx.lineCap="round";
        for(let i=0;i<22;i++){ const a=i*2.39996+i, d0=Math.max(W,H)*.6*(1-((q*1.6+i*.07)%1)), L=40+((i*37)%60); ctx.globalAlpha=.7; ctx.lineWidth=2+(i%3); ctx.beginPath(); ctx.moveTo(cx+Math.cos(a)*d0,cy+Math.sin(a)*d0); ctx.lineTo(cx+Math.cos(a)*(d0+L),cy+Math.sin(a)*(d0+L)); ctx.stroke() }
        const gr=ctx.createRadialGradient(cx,cy,2,cx,cy,90*q+20); gr.addColorStop(0,"rgba(255,255,255,.9)"); gr.addColorStop(1,"rgba(255,255,255,0)"); ctx.globalAlpha=q; ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(cx,cy,90*q+20,0,7); ctx.fill(); ctx.restore() }
      else if(f.k==="origin") drawOrigin(f,k);
    }
  }
  // 레벨업
  function options(){
    const keysAll = Object.keys(SK).filter(k=>lv(k)<MAXLV&&skOK(k,MAP.id));
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
    if(k==="fire"&&typeof drawFireballFx==="function"&&drawFireballFx(ctx,sh.x,sh.y,a,sh.big?170:120,t)) return true;
    if(k==="fire"){ const f="fire"+(Math.floor(t*14+sh.x*.01)&3); ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,sh.x,sh.y,30,"255,140,50",.55); ctx.restore(); pfxDraw(ctx,f,sh.x,sh.y,a,sh.big?1.7:1); return true }
    if(k==="arrow"){ if(typeof drawWindArrow==="function"&&drawWindArrow(ctx,sh.x,sh.y,a,sh.glow||sh.boom?120:96,1,!!(sh.glow||sh.boom))) return true; pfxDraw(ctx,"arrow"+(sh.glow?1:0),sh.x,sh.y,a,1); return true }
    if(k==="star"&&SKILL_IMG.star&&!window.__noArt){ jfStar(ctx,sh,t,GLOW); return true }
    if(k==="star"){ const key="star"+(sh.dark?1:0); trail(key,2,.012,t*22); if(sh.dark){ ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,sh.x,sh.y,20,"170,90,255",.45); ctx.restore() } pfxDraw(ctx,key,sh.x,sh.y,t*22,1); return true }
    if(k==="bullet"&&sh.ink&&sh.cb===1&&window.__t5==="pirate"&&SKILL_IMG.bullet5m&&!window.__noArt){ const im=SKILL_IMG.bullet5m, Wd=46, Hd=Wd*im.height/im.width; ctx.save(); ctx.translate(sh.x,sh.y); ctx.rotate(a+Math.PI); ctx.globalCompositeOperation=GLOW; ctx.drawImage(im,-Wd*.06,-Hd/2,Wd,Hd); ctx.restore(); return true }
    if(k==="bullet"&&!sh.ink&&window.__t5==="pirate"&&sh.cb===undefined&&SKILL_IMG.bullet5m&&!window.__noArt){ const im=SKILL_IMG.bullet5m, Wd=96, Hd=Wd*im.height/im.width; ctx.save(); ctx.translate(sh.x,sh.y); ctx.rotate(a+Math.PI); ctx.globalCompositeOperation=GLOW; ctx.drawImage(im,-Wd*.06,-Hd/2,Wd,Hd); ctx.restore(); return true }
    if(k==="bullet"&&!sh.ink&&SKILL_IMG.seabullet&&!window.__noArt){ const im=sh.cb===undefined?SKILL_IMG.seabullet:(typeof artTint==="function"&&artTint("seabullet",sh.cb?"#ff5a2a":"#ffc23a"))||SKILL_IMG.seabullet, Wd=sh.cb===undefined?104:(sh.cb?68:52),   /* 선원 총알: 쌍권총은 금빛 · 대포는 주황 불꽃 */ Hd=Wd*im.height/im.width;   /* 선원 총알은 작게 */ ctx.save(); ctx.translate(sh.x,sh.y); ctx.rotate(a+Math.PI); ctx.globalCompositeOperation=GLOW; ctx.drawImage(im,-Wd*.06,-Hd/2,Wd,Hd); ctx.restore(); return true }   // 바닷물 소용돌이 총알
    if(k==="bullet"&&!sh.ink){ pfxDraw(ctx,"bullet",sh.x,sh.y,a,sh.cb===undefined?1:.6); return true }
    if(k==="wisp"&&sh.fe&&SKILL_IMG.windfeather&&!window.__noArt){ const im=SKILL_IMG.windfeather, Wd=96, Hd=Wd*im.height/im.width; ctx.save(); ctx.translate(sh.x,sh.y); ctx.rotate(a+Math.PI); ctx.globalCompositeOperation=GLOW; ctx.drawImage(im,-Wd*.08,-Hd/2,Wd,Hd); ctx.restore(); return true }   // 바람 깃털 칼날
    if(k==="wisp"){ ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,sh.x,sh.y,20,"120,255,190",.55); ctx.restore(); trail("wisp",3,.016,t*14); pfxDraw(ctx,"wisp",sh.x,sh.y,t*14,1); return true }
    if(k==="wind"){ trail("wind",2,.018,t*16); pfxDraw(ctx,"wind",sh.x,sh.y,t*16,1); return true }
    if(k==="ice"){ ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,sh.x,sh.y,18,"150,220,255",.45); ctx.restore(); trail("ice",2,.012,a); pfxDraw(ctx,"ice",sh.x,sh.y,a,1); return true }
    return false }
  function drawAtkOver(x,y,q,a,K){
    if(HDFX&&PFX._ok&&isHeroArt(heroImg.src)){   // 그림 용사: 무기는 그림 속에 있으니 휘두르는 빛만 그려요
      if(K==="sword"&&HERO.id==="warrior"&&HSt.tier===4&&SKILL_IMG.hatk_warrior&&!window.__noArt){}   // 4차: 공격 그림 속 검 궤적만
      else if(K==="sword"){ const dir=g.atk.flip?-1:1; if(!heroArc(ctx,x,y+8,a+dir*(q-.5)*1.3,62+q*14,Math.min(1,(1-q)*2.2),"hw",window.__fxLow?0:dir*.6)) pfxDraw(ctx,"slash",x+Math.cos(a)*22,y+Math.sin(a)*22+8,a+dir*(q-.5)*1.4,.9+q*.35,Math.min(1,(1-q)*1.8)); }
      else if(K==="gun"&&q<.4){ const f=1-q/.4; ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,x+Math.cos(a)*34,y+8+Math.sin(a)*34,18*f+6,"255,230,140",.9*f); ctx.restore() }
      else if(K==="fireball"&&q<.5){ ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,x+Math.cos(a)*26,y+Math.sin(a)*26,22*(1-q)+8,"255,150,50",.7); ctx.restore() }
      else if(K==="moon"&&q<.6){ ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,x-Math.sign(Math.cos(a)||1)*14,y-34,24*(1-q)+10,"200,215,255",.8); ctx.restore() }
      else if(K==="brush"){ const dir=g.atk.flip?-1:1, sw=2.2, a0=a-dir*sw/2, cur=a0+dir*sw*Math.min(1,q*1.5); ctx.save(); ctx.globalAlpha=Math.min(1,(1-q)*2); ctx.strokeStyle="rgba(20,16,24,.85)"; ctx.lineCap="round";
        for(let i=0;i<3;i++){ ctx.lineWidth=(9-i*3)*(1-q*.5); ctx.beginPath(); dir>0?ctx.arc(x,y,46+i*5,a0,cur):ctx.arc(x,y,46+i*5,cur,a0); ctx.stroke() } ctx.restore() }
      else if(K==="punch"&&q>.25&&q<.6){ const f=1-(q-.25)/.35; ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,x+Math.cos(a)*30,y+Math.sin(a)*30,20*f+6,"150,210,255",.9*f); ctx.restore() }
      else if(K==="charm"&&q<.5){ ctx.save(); ctx.globalCompositeOperation=GLOW; jGlow(ctx,x+Math.cos(a)*22,y+Math.sin(a)*22,14,"255,220,120",.6*(1-q*2)); ctx.restore() }
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
  /* 1~3차 스킬은 한 번 강화할 때 더 많이 세져요 (4차만 고르지 않게) */
  const JD=i=>i<3?.5:.35, JC=i=>i<3?.14:.12, JP=i=>i<3?1.15:1.1;
  function jobDesc(i){ const k=SKL[i], d=Math.round(JD(i)*100);
    if(k.type==="passive") return `공격력 +${Math.round((JP(i)-1)*100)}%`;
    if(k.type==="summon") return k.what==="clone"?`분신 표창 피해 +${d}%`:`소환수 피해 +${d}%`;
    return `피해 +${d}% · 쿨타임 -${Math.round(JC(i)*100)}%${k.n?" · 개수 +1":""}` }
  function jobNum(i){ const k=SKL[i], L=g.jl[i]||0, P=Math.round, sc=st().dmg*lvScale;
    if(k.type==="passive") return `공격력 <b>×${st().dmg.toFixed(2)} → ×${(st().dmg*JP(i)).toFixed(2)}</b>`;
    if(k.type==="summon") return k.dmg?`소환수 피해 <b>${P(k.dmg*(1+JD(i)*L)*sc)} → ${P(k.dmg*(1+JD(i)*(L+1))*sc)}</b>`:`분신 피해 <b>×${(1+JD(i)*L).toFixed(2)} → ×${(1+JD(i)*(L+1)).toFixed(2)}</b>`;
    return `피해 <b>${P(k.dmg*(1+JD(i)*L)*sc)} → ${P(k.dmg*(1+JD(i)*(L+1))*sc)}</b> · ${(k.cd*(1-JC(i)*L)).toFixed(1)}초 → ${(k.cd*(1-JC(i)*(L+1))).toFixed(1)}초` }
  function jobUp(i){ sfx("pick"); const k=SKL[i], L=(g.jl[i]||0)+1; g.jl[i]=L;
    if(k.type==="passive") M.dmg*=JP(i);
    else if(k.type==="summon"){ if(k.what==="clone") g.cloneMul=1+JD(i)*L; else g.sum.forEach(m=>{ if(m.kind===k.what) m.dmg=(k.dmg||0)*(1+JD(i)*L) }) }
    else { const a=ACT.find(x=>x.name===k.name); if(a){ a.dmg=(k.dmg||0)*(1+JD(i)*L); a.cd=k.cd*(1-JC(i)*L); if(k.n) a.n=k.n+L } }
    g.fx.push({k:"label",x:g.p.x,y:g.p.y-50,text:`${k.name} ${"★".repeat(L)} 강화!`,life:1.8,max:1.8}); stamp("강화!"); g.fx.push({k:"flash",col:"#c08bff",life:.4,max:.4}) }
  function openGemChest(){
    g.paused=true;
    const jobs=SKL.map((k,i)=>i).filter(i=>(g.jl[i]||0)<JMAX);
    const normal=shuffle(Object.keys(SK).filter(k=>lv(k)<MAXLV&&skOK(k,MAP.id)));
    const opts=[];
    { const top=jobs.includes(3)?[3]:[]; top.concat(shuffle(jobs.filter(i=>i!==3))).slice(0,3).forEach(i=>opts.push({job:i})) }   // 보물상자 = 내 직업 전직 스킬 강화권만 · 4차 스킬은 다 오를 때까지 꼭 나와요
    if(!opts.length&&!SKL.length) while(opts.length<3 && normal.length) opts.push({sk:normal.shift()});   // 아직 전직 전이면 기술 카드
    if(!opts.length&&SKL.length){ g.p.hp=st().maxHp; showBanner("전직 스킬이 모두 최대예요! 체력을 가득 채웠어요"); g.paused=false; return }
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
    else if(e&&e.hp>0&&!e.b11inv){ e.hp-=e.max*pct; e.flash=.2; if(e.hp<=0) kill(e) }
    if(e){ g.fx.push({k:"bolt",x:e.x,y:e.y,life:.45,max:.45}); g.fx.push({k:"boom",x:e.x,y:e.y,r:e.r*1.4,col:"#ffd36a",life:.5,max:.5}); g.fx.push({k:"num",x:e.x,y:e.y-e.r,v:"한자 번개!",crit:true,life:1,max:1}) } g.shake=Math.max(g.shake,.3) }
  /* 같이 하기: 고르는 동안 몬스터가 다른 친구에게 간다는 안내 */
  const coopNote=()=>NM?`<div class="lvtip coopNote">🛡 고르는 동안 몬스터는 다른 친구에게 가요 · 내 용사는 <b>무적</b>! 모두 고르는 중이면 몬스터도 멈춰요 (30초 안에 골라요)</div>`:"";
  /* ===== 오리진 스킬: 위기에 한자 2문제를 모두 맞히면 맵 전체 공격 =====
     혼자: 내가 2문제 · 같이 하기: 모두가 2문제를 다 맞혀야 발동 */
  const ORIGIN_NAME={warrior:"오리진 · 천검 낙하",archer:"오리진 · 천궁 유성우",thief:"오리진 · 그림자 만화경",mage:"오리진 · 한자 대폭발",pirate:"오리진 · 대해의 포효",healer:"오리진 · 월광 대축복",calli:"오리진 · 천자문 대폭발",zodiac:"오리진 · 십이지 대행진",mech:"오리진 · 강철 대포격"};
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
    if(g.qskip&&!NM){ g.shake=.4; castOrigin(); return }   /* 선생님 모드(카드 문제 건너뛰기 켜짐): 오리진도 문제 없이 바로 */
    g.paused=true; sfx("bosscast"); g.shake=.4; g.fx.push({k:"flash",col:"#ffd36a",life:.5,max:.5});
    let i=0, ok=0; const qs=pickMixed(2).map(c=>({c,q:makeQ(c,{short:true})}));
    const show=()=>{ const {c,q}=qs[i];
      mcard.className="gcard origin"; mcard.innerHTML=`<div class="oriHead">✦ ORIGIN ✦</div><h3 style="font-family:'HF-${HERO.id}',var(--f-hz)">위기! ${esc(oName())}</h3>
        <p>${NM?"<b>모두가</b> 문제 2개를 다 맞히면":"문제 2개를 다 맞히면"} 맵 전체에 강력한 공격이 터져요! (${i+1} / 2)</p>
        ${q.big?`<div class="gq">${esc(q.big)}</div>`:""}<p style="font-family:var(--f-ui);font-size:${q.long?17:21}px;line-height:1.45;margin:0">${esc(q.q)}</p>
        <div class="gopts two">${q.opts.map((o,j)=>`<button class="gans ${o.hz?"hz":""}" data-j="${j}">${esc(o.text)}</button>`).join("")}</div><p class="gdh">${"✦".repeat(ok)}${"·".repeat(2-ok)}</p>`;
      modal.hidden=false;
      mcard.querySelectorAll(".gans").forEach(b=>b.onclick=()=>{ const r=q.opts[+b.dataset.j].ok; mcard.querySelectorAll(".gans").forEach(x=>{ x.disabled=true; if(q.opts[+x.dataset.j].ok) x.classList.add("ok") });
        g.qN++; trackAns(c,r);
        if(r){ ok++; g.qOk++; sfx("ok"); P.mastery[c.h]=(P.mastery[c.h]||0)+1; if(q.ctx&&typeof sayCtx==="function") sayCtx(c); saveP() } else { b.classList.add("no"); sfx("no"); addWrong(c.h) }
        setTimeout(()=>{ i++; if(i<2) show(); else done(ok===2) },r?700:1300) }) };
    function done(all){
      if(!NM){ close(); if(all) castOrigin(); else originFail(0,1); return }
      if(NM==="client") netOut.or={id,ok:all}; else originRes(NET.myId,id,all);
      mcard.innerHTML=`<div class="oriHead">✦ ORIGIN ✦</div><h3 style="font-family:'HF-${HERO.id}',var(--f-hz)">${all?"성공! 친구들을 기다려요":"아쉬워요…"}</h3><p>${all?"모두가 다 맞히면 오리진이 터져요!":"한 명이라도 틀리면 오리진이 발동하지 않아요. 친구들 결과를 기다려요."}</p><p class="gdh">⏳</p>`;
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
          if(e.type==="boss"){ if(!e.b11inv){ e.hp-=e.max*.25; e.flash=.3; if(e.hp<=0) kill(e) } } else { e.hp=0; kill(e) } }
        g.eshots.length=0 }
      showBanner(`${oName()}! 화면의 몬스터를 쓸어버렸어요! 체력 회복 +40%`) }}) }
  function hanjaDuel(ref){ if(g.qskip){ return }   // 선생님: 한자 결투 건너뛰기
 if(g.over) return; const find=()=>NM==="client"?EN[ref.id]:ref, e0=find(); if(!e0||e0.hp<=0) return;
    g.paused=true; let i=0, hits=0; const qs=pickMixed(3).map(c=>({c,q:makeQ(c,{short:true})}));
    const show=()=>{ const {c,q}=qs[i], e=find();
      mcard.className="gcard"; mcard.innerHTML=`<h3>⚡ 보스 ${c.cat?"지혜":"한자"} 결투! ⚡</h3><p>${esc(e?e.name:"보스")}에게 ${c.cat?"지혜":"한자"}의 힘을 보여 줘요! 맞힐 때마다 <b>한자 번개</b>가 떨어져요. (${i+1} / 3)</p>
        ${q.big?`<div class="gq">${esc(q.big)}</div>`:""}<p style="font-family:var(--f-ui);font-size:${q.long?17:21}px;line-height:1.45;margin:0">${esc(q.q)}</p>
        <div class="gopts two">${q.opts.map((o,j)=>`<button class="gans ${o.hz?"hz":""}" data-j="${j}">${esc(o.text)}</button>`).join("")}</div><p class="gdh">번개 ${"⚡".repeat(hits)}${"·".repeat(i-hits)}</p>`;
      modal.hidden=false;
      mcard.querySelectorAll(".gans").forEach(b=>b.onclick=()=>{ const ok=q.opts[+b.dataset.j].ok; mcard.querySelectorAll(".gans").forEach(x=>{ x.disabled=true; if(q.opts[+x.dataset.j].ok) x.classList.add("ok") });
        g.qN++; trackAns(c,ok);
        if(ok){ hits++; g.qOk++; sfx("ok"); P.mastery[c.h]=(P.mastery[c.h]||0)+1; if(q.ctx&&typeof sayCtx==="function") sayCtx(c); saveP(); const e=find(); duelHit(e) } else { b.classList.add("no"); sfx("no"); addWrong(c.h) }
        setTimeout(()=>{ i++; if(i<3) show(); else { modal.hidden=true; g.paused=false; last=performance.now(); showBanner(hits?`한자 결투 ${hits}/3 성공! 보스에게 한자 번개 ${hits}번!`:"한자 결투 실패... 다음엔 꼭 맞혀요!"); if(hits===3){ stamp("결투<br>완승!"); sfx("win") } } },ok?800:1300) }) };
    sfx("bosscast"); show() }
  /* ===== 혼란 😵: 게임 속 문제를 틀리면 잠깐 약해져요 (아주 조금 · 최대 2단계 · 맞히면 바로 1단계 풀림 · 25초면 저절로 풀림) ===== */
  g.conf=0; g.confT=0;
  const confHud=()=>{ const el=root.querySelector(".gs.conf"); if(!el) return; el.hidden=!g.conf; el.textContent=`😵 혼란 ${g.conf} · 공격 -${Math.round(CONF_V*100*g.conf)}%` };
  /* 능력치 칸을 누르면 내 힘이 어디서 왔는지 한눈에 */
  root.addEventListener("click",ev=>{ const b=ev.target.closest&&ev.target.closest("[data-buff]"); const old=root.querySelector(".buffPop"); if(old){ old.remove(); if(!b) return } if(!b) return;
    const K=knowPower(qrangeOf().w,srangeOf().w), L=engOf(P.hero), CB=cardBonusSum(), cb=engCombos(L), F=(k,v)=>engFmt(k,v), d=document.createElement("div"); d.className="buffPop";
    d.innerHTML=`<b>⚔ 지금 전투력 ${fmtPow(g.livePow||g.pow0)}</b><small>게임 시작 때 ${fmtPow(g.pow0)} · 레벨 업 · 스킬 강화 · 버프로 바뀌어요</small>
      <div><i>📚 지식의 힘</i>공격력 +${Math.round(K.dmg*100)}% <small>(한자 ${Math.round(K.kr*100)}% 익힘)</small></div>
      ${q2rangeOf().w?`<div><i>👑 시즌 2의 힘</i>보스 공격력 +${Math.round(know2Power().bd*100)}% · 방어율 무시 ${Math.round(know2Power().ied*100)}%</div>`:""}
      <div><i>📜 지혜의 힘</i>받는 피해 -${Math.round(K.armor*100)}% · 대기 시간 -${Math.round(K.cd*100)}% <small>(말 ${Math.round(K.wr*100)}% 익힘)</small></div>
      <div><i>🔖 한자 룬</i>${L.length?L.map(h=>{ const [k,v]=engVal(h); return `${h} ${F(k,v)}` }).join(" · "):"아직 없어요"}${cb.length?`<br>✨ ${cb.map(c=>c[2]).join(", ")}`:""}</div>
      <div><i>🃏 보스 카드</i>${Object.keys(CB).length?Object.entries(CB).map(([k,v])=>F(k,v)).join(" · "):"아직 없어요"}</div>
      ${g.conf?`<div class="bad"><i>😵 혼란 ${g.conf}</i>공격력 -${Math.round(CONF_V*100*g.conf)}% · 받는 피해 +${Math.round(CONF_V*100*g.conf)}% (문제를 맞히면 풀려요)</div>`:""}
      <small>화면 아무 곳이나 누르면 닫혀요</small>`;
    root.appendChild(d); setTimeout(()=>{ if(d.isConnected) d.remove() },6000) });
  window.__qHook=(c,ok)=>{ if(g.over) return; if(BX){ if(ok) BX.quizOk(); else BX.quizNo() } if(ok){ if(g.conf>0){ g.conf--; g.confT=CONF_T; g.fx.push({k:"label",x:g.p.x,y:g.p.y-80,text:"✨ 집중 회복!",life:1.2,max:1.2}) } }
    else { g.conf=Math.min(CONF_MAX,g.conf+1); g.confT=CONF_T; g.fx.push({k:"label",x:g.p.x,y:g.p.y-80,text:`😵 혼란 ${g.conf}`,life:1.4,max:1.4}) } confHud() };
  /* ===== 보스 약점 한자: 보스 체력 50%·25%에서 약점 한자가 떠요. 게임은 멈추지 않고 6초 안에 뜻을 맞히면 보스 기절 + 큰 피해 ===== */
  const WEAK_H={1:"木風花",2:"風石木",3:"水木",4:"電炎",5:"水冷氷",6:"石固地",7:"破拳打",8:"炎",9:"天地",10:"天地永"};
  let weakUI=null;
  function closeWeak(){ if(!weakUI) return; clearTimeout(weakUI.tm); const d=weakUI.d, pz=weakUI.pz; weakUI=null; if(pz&&!g.over){ g.paused=false; last=performance.now() } d.classList.add("out"); setTimeout(()=>d.remove(),250) }
  function weakCheck(){ if(g.over||g.paused||weakUI||g.p.dead) return; for(const e of g.en){ if(e.type!=="boss"||e.hp<=0||!e.max||e.b11inv) continue; const p=e.hp/e.max, s0=e.wq||0, TH=e.b11?[.6,.25]:[.5,.25]; let k=s0; while(k<TH.length&&p<TH[k]) k++;
      if(k>s0){ e.wq=k; if(NM==='host') e.bt=Math.max(e.bt||0,6.5); openWeak(e); return } } }
  const Q2P=q2poolOf(Q2.w);
  function pick11(){ const r=Math.random(); let c=null; if(SPOOL.length&&r<.3) c=spreadPick(SPOOL,1,"s")[0]; else if(Q2P.length&&r<.8) c=spreadPick(Q2P,1,"q2")[0]; if(!c) c=spreadPick(QPOOL,1,"q")[0]; if(c) ASKED.add(c.h); return c }
  function openWeak(e,X){ const th=WEAK_H[MAP.id]||"", useS=SPOOL.length&&Math.random()<.4;
    let c=X&&X.c||(BX?pick11():null); if(!c&&useS){ c=spreadPick(SPOOL,1,"s")[0] } if(!c){ const cand=QPOOL.filter(x=>th.includes(x.h)&&!ASKED.has(x.h)); c=cand.length?cand[Math.random()*cand.length|0]:(spreadPick(QPOOL,1,"q")[0]||QPOOL[Math.random()*QPOOL.length|0]) } if(!c) return; ASKED.add(c.h);
    let big, ask, opts;
    if(c.cat){ const q=makeQ(c,{short:true}); big=q.big||q.q; ask=q.big?q.q:"알맞은 답을 골라요"; opts=shuffle(q.opts.map(o=>({t:o.text,ok:o.ok?1:0}))).slice(0,4); if(!opts.some(o=>o.ok)) opts[0]=q.opts.find(o=>o.ok)&&{t:q.opts.find(o=>o.ok).text,ok:1}||opts[0] }
    else { const lab=x=>`${x.hun} ${x.eum}`, others=shuffle(QPOOL.filter(x=>x.h!==c.h&&lab(x)!==lab(c))).slice(0,2); big=c.h; ask="이 한자의 뜻과 소리는?"; opts=shuffle([{t:lab(c),ok:1},...others.map(x=>({t:lab(x),ok:0}))]) }
    const KIND=c.cat==="S"?"사자성어":c.cat==="P"?"속담":"한자";
    const d=document.createElement("div"); d.className="weakq"+(c.cat?" say":""); d.innerHTML=`<div class="wqh">${X?X.title:`🎯 <b>${esc(e.name)}</b>의 약점 ${KIND}!`}</div><div class="wqc ${String(big).length>8?"longer":String(big).length>2?"long":""}">${esc(big)}</div><div class="wqa">${esc(ask)}</div><div class="wqo ${opts.length>3?"four":""}">${opts.map((o,i)=>`<button data-i="${i}">${esc(o.t)}</button>`).join("")}</div><div class="wqt"><i></i></div><small>맞히면 보스가 3초 동안 기절해요!</small>`;
    const PZ=!NM&&!(X&&X.nopause), TT=(PZ?8000:X&&X.nopause?9000:6000)+(c.cat?3000:0); d.querySelector(".wqt i").style.animationDuration=TT/1000+"s"; if(PZ){ d.querySelector("small").textContent=X?"게임이 잠깐 멈췄어요. "+X.small:"게임이 잠깐 멈췄어요. 천천히 읽고 골라요! 맞히면 보스가 3초 동안 기절해요"; g.paused=true; stamp(X?"문제!":"약점<br>발견!") } else if(X) d.querySelector("small").textContent=X.small;
    root.appendChild(d); sfx("alarm"); if(e) g.fx.push({k:"label",x:e.x,y:e.y-e.r*2.6,text:"약점 "+(c.cat?KIND:c.h),life:6,max:6});
    weakUI={d,tm:setTimeout(()=>closeWeak(),TT),eid:e?e.id:-1,pz:PZ};
    d.querySelectorAll("button").forEach(b=>b.onclick=()=>{ if(!weakUI||weakUI.d!==d) return; const o=opts[+b.dataset.i]; d.querySelectorAll("button").forEach((x,i)=>{ x.disabled=true; if(opts[i].ok) x.classList.add("ok") });
      g.qN++; trackAns(c,!!o.ok);
      if(o.ok&&X){ g.qOk++; sfx("ok"); P.mastery[c.h]=(P.mastery[c.h]||0)+1; saveP(); clearTimeout(weakUI.tm); weakUI.tm=setTimeout(()=>closeWeak(),600); X.ok&&X.ok() }
      else if(o.ok){ g.qOk++; sfx("ok"); P.mastery[c.h]=(P.mastery[c.h]||0)+1; saveP(); clearTimeout(weakUI.tm); weakUI.tm=setTimeout(()=>closeWeak(),500); const t=NM==="client"?EN[e.id]:e; if(NM==="client"){ netOut.weak=netOut.weak||[]; netOut.weak.push(e.id); g.fx.push({k:"label",x:g.p.x,y:g.p.y-80,text:"약점 공격!",life:1.2,max:1.2}) } else applyWeak(t) }
      else { b.classList.add("no"); sfx("no"); addWrong(c.h); clearTimeout(weakUI.tm); weakUI.tm=setTimeout(()=>closeWeak(),1300) } }) }
  function applyWeak(e){ if(!e||e.hp<=0) return; if(e.weakT0&&g.t-e.weakT0<4) return; e.weakT0=g.t; const n=NM?nPlayers():1, pct=.08/(1+.5*(n-1));
    if(!e.b11inv){ e.hp-=e.max*pct; if(e.hp<=0) kill(e) } e.flash=.3; e.stun=Math.max(e.stun||0,3); g.shake=Math.max(g.shake,.45);
    g.fx.push({k:"boom",x:e.x,y:e.y,r:e.r*2.2,col:"#ffd36a",life:.6,max:.6}); g.fx.push({k:"bolt",bt:"boss",x:e.x,y:e.y,life:.35,max:.35}); g.fx.push({k:"label",x:e.x,y:e.y-e.r*2.2,text:"약점 공격! 기절",life:1.6,max:1.6});
    say(`🎯 약점 공격! ${e.name}이(가) 3초 동안 꼼짝 못 해요!`,"thunder"); if(e.hp<=0) kill(e); if(NM) evAll({t:"weakok"}); closeWeak() }
  /* ===== 같이하기: 경험치 통 공유 · 2레벨마다 다 같이 문제 ===== */
  const LV_T=30;   // 문제 제한 시간(초)
  const coopNeed=L=>Math.round(needXP(L)*(1+.25*(nPlayers()-1)));
  function lvStart(){ g.xp-=g.need; g.lvl++; g.need=coopNeed(g.lvl); const q=g.lvl%2===0;
    hostEv.push({t:"lvup",L:g.lvl,need:g.need,q:q?1:0,id:(g.lvRn=(g.lvRn||0)+1)});
    if(q){ g.lvR={id:g.lvRn,t0:performance.now(),done:{}}; g.lvRid=g.lvRn; lvOpen() } else lvAuto() }
  /* 홀수 레벨: 문제 없이 내가 바로 카드를 골라요 (나만 잠깐 멈추고, 고르는 동안 무적) */
  function lvAuto(){ if(g.p.dead) return; if(g.paused){ g.lvFree=(g.lvFree||0)+1; return } levelUp(true) }
  function lvOpen(){ if(g.over) return; if(g.p.dead){ lvDone(); return } if(g.paused){ g.lvPend=1; return } levelUp() }
  function lvDone(){ if(NM==="host"){ if(g.lvR) g.lvR.done[NET.myId]=1 } else netOut.lvd=g.lvRid||0 }
  function lvPpl(){ const L=[[NET.myId,myName]]; for(const id in RP) if(!RP[id].gone) L.push([id,(RP[id].st&&RP[id].st.n)||"친구"]);
    const d=NM==="host"?(g.lvR?Object.keys(g.lvR.done):[]):((g.lvSt&&g.lvSt.i===g.lvRid&&g.lvSt.d)||[]);
    return L.map(([id,n])=>`<span class="${d.includes(id)?"dn":""}">${d.includes(id)?"✅":"⏳"} ${esc(n)}${id===NET.myId?" (나)":""}</span>`).join("") }
  function cheerShow(n,e){ const box=document.getElementById("lvcheers"); if(!box) return; const s=document.createElement("span"); s.textContent=`${n||"친구"} ${e}`; box.appendChild(s); setTimeout(()=>s.remove(),2600); while(box.children.length>5) box.firstChild.remove() }
  function sendCheer(e){ if(NM==="host"){ hostEv.push({t:"cheer",n:myName,e}); cheerShow(myName,e) } else netOut.ch=e }
  const cheerBtns=()=>`<div class="lvcheer">응원 보내기 ${["💪","👍","🔥","😊"].map(e=>`<button class="lvch" data-e="${e}">${e}</button>`).join("")}</div><div class="lvcheers" id="lvcheers"></div>`;
  function bindCheer(){ mcard.querySelectorAll(".lvch").forEach(b=>b.onclick=()=>{ sendCheer(b.dataset.e); b.disabled=true; setTimeout(()=>b.disabled=false,1500) }) }
  /* 먼저 끝낸 친구: 기다리는 동안 친구 상황 보기 · 응원 · 보너스 문제(맞히면 코인) */
  function lvWait(){ lvDone(); if(g.lvGoing) return; g.lvOn=1; modal.classList.add("lvmodal"); mcard.className="gcard lvcard lvwait";
    mcard.innerHTML=`<div class="lvhead"><div class="lvsub">★ 친구를 기다려요 ★</div><h3 class="lvbig">모두 풀면 함께 출발!</h3><div class="lvtip">몬스터도 멈춰 있어요 · 최대 ${LV_T}초</div></div>
      <div class="lvppl" id="lvppl">${lvPpl()}</div>${cheerBtns()}
      <div class="lvbonus" id="lvbonus"></div>`;
    modal.hidden=false; bindCheer();
    let bn=0; const bonus=()=>{ const box=document.getElementById("lvbonus"); if(!box||g.lvGoing) return; if(bn>=5){ box.innerHTML=`<p class="lvbt">보너스 문제를 다 풀었어요! 🎉</p>`; return } bn++;
      const c=pickMixed(1)[0]||QPOOL[Math.random()*QPOOL.length|0], Q=makeQ(c,{short:true});
      box.innerHTML=`<p class="lvbt">🪙 보너스 문제 ${bn}/5 · 맞히면 코인 +2</p>${Q.big?`<b class="lvhz">${esc(Q.big)}</b>`:""}<p class="lvqq">${esc(Q.q)}</p><div class="lvopts">${Q.opts.map((o,j)=>`<button class="lvo ${o.hz?"hz":""}" data-j="${j}">${esc(o.text)}</button>`).join("")}</div>`;
      box.querySelectorAll(".lvo").forEach(b=>b.onclick=()=>{ const ok=Q.opts[+b.dataset.j].ok; box.querySelectorAll(".lvo").forEach(x=>{ x.disabled=true; if(Q.opts[+x.dataset.j].ok) x.classList.add("ok") });
        g.qN++; trackAns(c,!!ok); if(ok){ g.qOk++; g.bqC=(g.bqC||0)+2; sfx("ok"); P.mastery[c.h]=(P.mastery[c.h]||0)+1; saveP() } else { b.classList.add("no"); sfx("no"); addWrong(c.h) }
        setTimeout(bonus,ok?700:1400) }) };
    bonus(); clearInterval(g.lvWT); g.lvWT=setInterval(()=>{ const p=document.getElementById("lvppl"); if(p) p.innerHTML=lvPpl(); else clearInterval(g.lvWT) },300) }
  /* 모두 끝나면(또는 시간이 다 되면) 3-2-1 후 다시 출발 */
  function lvGo(){ g.lvGoing=1; g.lvPend=0; if(g.lvForce){ const f=g.lvForce; g.lvForce=null; f() } clearInterval(g.lvWT);
    const show=g.lvOn; let n=3;
    const tick=()=>{ if(g.over) return;
      if(n>0){ if(show){ modal.hidden=false; mcard.className="gcard lvcard"; mcard.innerHTML=`<div class="lvcount">${n}</div><div class="lvsub">모두 준비 완료! 다시 출발해요</div>` } else showBanner(`다시 출발까지 ${n}`); sfx("pick"); n--; setTimeout(tick,650) }
      else { if(show){ modal.hidden=true; modal.classList.remove("lvmodal"); mcard.className="gcard"; g.paused=false; last=performance.now() } g.lvOn=0; g.lvGoing=0; if(NM==="host") g.lvR=null } };
    tick() }
  function levelUp(free){
    g.paused=true; sfx("lvup"); const MPL=!!NM&&!free; let closed=false, tmr=null; if(MPL) g.lvOn=1;
    const all=Object.keys(SK).filter(k=>lv(k)<MAXLV&&skOK(k,MAP.id));
    if(!all.length){ g.p.hp=Math.min(st().maxHp,g.p.hp+30); if(MPL){ lvWait(); return } g.paused=false; last=performance.now(); return }
    const N=Math.min(all.length,PK.cards+QR.cards), cards=shuffle(all).slice(0,N);
    const used=new Set();
    const picks=pickMixed(N);
    const qs=cards.map((_,i)=>{ const c=picks[i]||QPOOL[Math.random()*QPOOL.length|0]; used.add(c.h); return {c,q:makeQ(c,{short:true}),st:"ask"} });
    modal.classList.add("lvmodal");
    mcard.className="gcard lvcard";
    mcard.innerHTML = `<div class="lvhead"><div class="lvsub">★ LEVEL UP ★</div><h3 class="lvbig">${BX?"각성 보상!":`LV.${g.lvl} 달성!`}</h3>
        <div class="lvtip">${BX?"✦ 검귀가 각성했어요! 보스와 싸울 카드를 1장 골라요 ✦":free?"✦ 쉬는 레벨! 문제 없이 원하는 기술을 바로 골라요 · 다음 레벨에는 다 같이 문제를 풀어요 ✦":"✦ 카드마다 문제를 맞히면 그 기술을 고를 수 있어요 ✦"}</div>${free?coopNote():""}${MPL?`<div class="lvtip coopNote">👫 다 같이 레벨업! 모두 풀 때까지 몬스터도 멈춰요 · <b id="lvhint">10초가 지나면 힌트가 나와요</b></div><div class="lvtime"><i id="lvbar"></i><b id="lvsec">${LV_T}</b></div>`:""}</div>
      <div class="lvcards c${N}">${cards.map((k,i)=>{ const s=SK[k], l=lv(k)+1, Q=qs[i].q;
        return `<div class="lvk" data-i="${i}">
          <div class="lvic">${skImg(k,60)}</div>
          <strong>${s.name}</strong><span class="lvtype ${s.t==="w"?"lvact":"lvpas"}">${s.t==="w"?(k==="main"?"기본 공격":"공격 기술"):"능력 강화"} · ${l>1?`Lv ${l}`:"새 기술"}</span>
          <span class="lvd">${s.d(l)}</span>
          <span class="lvnum">${skNum(k,l)}</span>
          <div class="lvq ${(Q.long||qs[i].c.cat)?"long":""}"><span class="lvqt">📜 ${qs[i].c.cat&&typeof SAY_NAME!=="undefined"?SAY_NAME[qs[i].c.cat]:"한자"} 문제 · ${esc(Q.tag)}</span>
            ${Q.big?`<b class="lvhz">${esc(Q.big)}</b>`:""}<span class="lvqq">${esc(Q.q)}</span>
            <div class="lvopts">${Q.opts.map((o,j)=>`<button class="lvo ${o.hz?"hz":""}" data-j="${j}">${esc(o.text)}</button>`).join("")}</div></div>
          <button class="lvpick" disabled>문제를 먼저 풀어요</button>
        </div>` }).join("")}</div>
      <div class="lvfoot"><span id="lvstat">맞힌 카드 0 / ${N}</span><button class="lvskip" id="lvskip" hidden>모두 틀렸어요 · 계속하기</button></div>${MPL?cheerBtns():""}`;
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
        trackAns(qs[i].c,!!ok); if(ok){ qs[i].st="ok"; g.qOk++; sfx("ok"); el.classList.add("ok"); P.mastery[qs[i].c.h]=(P.mastery[qs[i].c.h]||0)+1; if(Q.ctx&&typeof sayCtx==="function") sayCtx(qs[i].c); saveP();
          g.p.hp=Math.min(st().maxHp,g.p.hp+st().maxHp*QR.heal); pick.disabled=false; pick.textContent="선택하기" }
        else { qs[i].st="no"; b.classList.add("no"); el.classList.add("no"); addWrong(qs[i].c.h); sfx("no"); pick.textContent=`정답: ${label(qs[i].c)}` }
        upd();
      });
      pick.onclick=()=>{ if(closed||qs[i].st!=="ok") return; apply(cards[i]); close() };
    });
    document.getElementById("lvskip").onclick=()=>{ g.p.hp=Math.min(st().maxHp,g.p.hp+st().maxHp*.1); close() };
    if(g.qskip||free){ els.forEach((el,i)=>{ qs[i].st="ok"; el.classList.add("ok"); const pk=el.querySelector(".lvpick"); pk.disabled=false; pk.textContent=free?"이 기술 고르기":"선택하기 (선생님)"; if(free){ const q=el.querySelector(".lvq"); if(q) q.remove() } }); upd(); if(free) document.getElementById("lvstat").textContent="원하는 기술을 하나 골라요" }   // 선생님 · 쉬는 레벨: 문제 없이 바로 고르기
    function close(){ if(closed) return; closed=true; clearInterval(tmr); if(MPL){ g.lvForce=null; lvWait(); return } modal.hidden=true; modal.classList.remove("lvmodal"); mcard.className="gcard"; g.paused=false; last=performance.now() }
    if(MPL){ bindCheer(); const T0=performance.now(); let hinted=false;
      const timeUp=()=>{ if(closed) return; const okI=qs.map((q,i)=>q.st==="ok"?i:-1).filter(i=>i>=0);
        if(okI.length){ const i=okI[Math.random()*okI.length|0]; apply(cards[i]); showBanner(`⏰ 시간이 다 됐어요! ${skName(cards[i])} 카드를 대신 골랐어요`) }
        else { g.p.hp=Math.min(st().maxHp,g.p.hp+st().maxHp*.1); showBanner("⏰ 시간이 다 됐어요! 다음 문제 레벨에서 꼭 맞혀요") } close() };
      g.lvForce=timeUp;
      tmr=setInterval(()=>{ if(closed||g.over){ clearInterval(tmr); return } const el=(performance.now()-T0)/1000, left=Math.max(0,LV_T-el);
        const bar=document.getElementById("lvbar"), sec=document.getElementById("lvsec"); if(bar) bar.style.width=(left/LV_T*100)+"%"; if(sec){ sec.textContent=Math.ceil(left); sec.classList.toggle("hurry",left<=10) }
        if(!hinted&&el>=10){ hinted=true; els.forEach((el2,i)=>{ if(qs[i].st!=="ask") return; const wr=[...el2.querySelectorAll(".lvo")].filter(b=>!qs[i].q.opts[+b.dataset.j].ok&&!b.disabled); if(wr.length>1){ const b=wr[Math.random()*wr.length|0]; b.disabled=true; b.classList.add("gone") } }); const h=document.getElementById("lvhint"); if(h) h.textContent="💡 힌트: 틀린 보기 하나를 지웠어요!" }
        if(left<=0) timeUp() },200) }
  }
  function apply(k){ sfx("pick"); const before=st(); g.sk[k]=lv(k)+1; if(k==="body") g.p.hp=Math.min(st().maxHp,g.p.hp+30); const after=st();
    const P=g.p, msg=k==="body"?`최대 체력 ${Math.round(before.maxHp)} → ${Math.round(after.maxHp)}`:k==="spd"?`이동 속도 ${Math.round(before.spd)} → ${Math.round(after.spd)}`
      :k==="str"?`공격력 ×${before.dmg.toFixed(2)} → ×${after.dmg.toFixed(2)}`:k==="qi"?`공격 속도 ${Math.round(100/before.cd)}% → ${Math.round(100/after.cd)}%`:k==="pull"?`줍는 거리 ${Math.round(before.mag)} → ${Math.round(after.mag)}`:`${skName(k)} Lv ${g.sk[k]}`;
    g.fx.push({k:"label",x:P.x,y:P.y-50,text:msg,life:1.6,max:1.6}); if(k==="body") g.fx.push({k:"num",x:P.x,y:P.y-30,v:30,me:true,life:.9,max:.9}) }
  // 기술 카드에 보이는 숫자
  function skNum(k,l){ const s=st(), sc=s.dmg, L=l, P=Math.round;
    if(k==="main"){ const K=HERO.main.kind, base={sword:28+10*L,arrow:8+2.8*L,star:5+2*L,gun:6.5+2.4*L,fireball:26+10*L,moon:10+3.6*L,brush:12+4.2*L,charm:13+4*L,punch:24+9*L}[K], cdv={sword:.85-.05*L,arrow:.24-.012*L,star:.48-.03*L,gun:.3-.018*L,fireball:1.25-.06*L,moon:.6-.03*L,brush:.62-.03*L,charm:.42-.02*L,punch:.5-.028*L}[K];
      const cnt={sword:"",arrow:`${1+(L>=3?1:0)+(L>=5?1:0)}줄 · 관통 ${2+L}`,star:`${1+Math.floor(L/2)+(F.lucky?1:0)}개 (돌아와요)`,gun:"",fireball:`${1+(L>=4?1:0)}개`}[K];
      return `피해 <b>${P(base*sc)}</b>${cnt?` × ${cnt}`:""} · ${(cdv*s.cd).toFixed(2)}초마다` }
    if(k==="bhunt") return `보스 피해 <b>+${10*L}%</b>`;
    if(k==="bpierce") return `방어율 무시 <b>+${8*L}%</b>`;
    if(k==="bguard") return `받는 피해 <b>-${6*L}%</b> · 게이지 -${15*L}%`;
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

  // 실수로 용사·맵을 잘못 골랐을 때: 시작 30초 안이면 판 수·코인을 돌려받고 다시 골라요 (혼자 하기 · 하루 5번까지)
  function canRefund(){ return !NM&&window.__paid&&g.t<30&&!g.over&&(day().refund||0)<5&&(!isAdmin()||window.__rfTest) }
  function pause(){
    if(g.over||g.paused) return;
    g.paused=true;
    mcard.innerHTML = `<h3>${NM?"친구와 같이 하는 중":"잠깐 멈춤"}</h3><p>${NM?"같이 할 때는 게임이 멈추지 않아요! 빨리 돌아가요.":`${fmtT(g.t)} 버티는 중 · 몬스터 ${g.kills}마리`}</p>
      <div class="gskills">${Object.keys(g.sk).map(k=>`<span>${skImg(k,22)}${skName(k)} · Lv ${g.sk[k]}</span>`).join("")}</div>
      <div class="gbtns"><button class="big green" id="gc">계속하기</button>${canRefund()?`<button class="big gold" id="gr">↩ 용사·맵 다시 고르기<small style="display:block;font-size:12px">시작 30초 안이라 판 수·코인을 돌려받아요 (하루 ${5-(day().refund||0)}번 남음)</small></button>`:""}<button class="big alt" id="gq">그만하기</button></div><button class="helpQ" data-help="게임 중" style="position:absolute;top:10px;right:10px" aria-label="게임 화면 도움말">?</button>`;
    modal.hidden=false;
    $("#gc").onclick=()=>{modal.hidden=true;g.paused=false;last=performance.now()};
    if($("#gr")) $("#gr").onclick=()=>{ if(!canRefund()) return; const d=day(); d.plays=Math.max(0,d.plays-1); d.refund=(d.refund||0)+1; P.coins+=GAME_COST; P.stats.games=Math.max(0,(P.stats.games||1)-1); window.__paid=0; saveP(); cleanup(); gameLobby() };
    $("#gq").onclick=()=>{ if(NM==="client"){ try{ NET.hostConn.send({t:"quit"}) }catch(e){} } if(NM==="host"){ endAll(false); return } finish(false) };
  }

  function die(){ sfx("die");
    if(g.revives>0){ g.revives--; g.paused=true; if(NM) g.p.dead=true; revive(); return }
    if(NM){ down(); return }
    finish(false);
  }
  function revive(){
    const src = QPOOL;
    const c = spreadPick(QPOOL,1,"q")[0]||src[Math.random()*src.length|0]; ASKED.add(c.h);
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
          g.en.forEach(e=>{const dx=e.x-g.p.x,dy=e.y-g.p.y,d=Math.hypot(dx,dy)||1; if(d<260){ if(e.type!=="boss") hurt(e,9999); else {ccP(e,dx/d*200,dy/d*200)} }});
          g.fx.push({k:"ring",x:g.p.x,y:g.p.y,life:.6,max:.6});
          modal.hidden=true; g.paused=false; last=performance.now(); },900);
      } else { b.classList.add("no"); addWrong(c.h); setTimeout(()=>NM?down():finish(false),1500) }
    });
  }

  function finish(win){ window.__qHook=null;
    if(g.over) return; SND.setIntensity(0); if(NM==="host") NET.ing=new Set();
    g.over=true; g.paused=true;
    const best = P.best;
    const rec = {t:g.t,k:g.kills,win};
    const stars = win?4:Math.min(3,g.bossKills);
    P.stars=P.stars||{}; const prevStars=P.stars[MAP.id]||0; if(stars>prevStars) P.stars[MAP.id]=stars;
    P.cleared=P.cleared||{}; const firstClear = win && !P.cleared[MAP.id]; if(win) P.cleared[MAP.id]=1;
    P.clearD=P.clearD||{}; const prevD=P.clearD[MAP.id]||0, newDif=win&&MAP.dif+1>prevD; if(win&&MAP.dif+1>prevD) P.clearD[MAP.id]=MAP.dif+1;
    P.medal=P.medal||{}; const md=(P.medal[MAP.id]||[0,0,0]).slice(), got=[];
    if(win&&MAP.dif>=1&&!md[0]){ md[0]=1; got.push(0) } if(g.medalSig&&!md[1]){ md[1]=1; got.push(1) } if(g.qOk>=8&&g.qN&&g.qOk/g.qN>=.8&&!md[2]){ md[2]=1; got.push(2) }
    P.medal[MAP.id]=md; const mc=medalCount(), mileHit=MEDAL_MILE.filter(([n])=>n>(P.mmile||0)&&n<=mc), mileCoin=mileHit.reduce((a,m)=>a+m[2],0); if(mileHit.length){ P.mmile=mileHit[mileHit.length-1][0]; P.coins+=mileCoin; P.earned+=mileCoin }
    // 최종 보스 보물상자: 처음이면 다음 맵 열쇠, 다시 깨면 보너스 코인
    let honorNew=0; if(win&&MAP.id===MAPS.length){ P.honor=P.honor||{}; const hl=(MAP.dif||0)+1; if(((P.honor[HERO.id])||0)<hl){ P.honor[HERO.id]=hl; honorNew=1 } }
    const LASTM=11, keyNow = win && MAP.id===mapOpenN() && MAP.id<LASTM; if(keyNow){ P.mapOpen=MAP.id+1; P.newOpen=MAP.id+1 }
    const keyShow = keyNow || (win && MAP.id<LASTM && typeof isAdmin==="function" && isAdmin());   /* 선생님 모드: 열쇠 나오는 연출을 보여 주기만 해요 (진행은 그대로) */
    const rCoin = win&&!keyShow ? Math.round(firstClearCoin(MAP.id)*.3*difCoinX(MAP.dif)) : 0;
    saveP();
    const isBest = stars>prevStars || (win && (!best||!best.win||rec.t<best.t));
    if(isBest){ P.best=rec; saveP(); }
    const coop = NM?1.3:1;
    const gotExp = addExp(Math.round((g.kills*1 + Math.min(rec.t,480)/3 + (win?200:0) + g.bossKills*150)*MAP.exp*QR.exp*SR.exp*(Q2.exp||1)*coop));
    const qCoin = (rec.t>=60 ? QR.coin+SR.coin+(Q2.coin||0) : 0)+(g.bqC||0);   // 같이하기 보너스 문제 코인 포함
    const sCoin=Math.round(gameCoins(MAP.id,stars)*coop*(QR.cm||1)*(SR.cm||1)*(Q2.cm||1)*difCoinX(MAP.dif)*(MAP.dif?1+Math.min(.5,((g.padMax||1)-1)*.35):1)), fCoin=(firstClear?firstClearCoin(MAP.id):0)+(newDif&&MAP.dif>=1?Math.round(firstClearCoin(MAP.id)*difCoinX(MAP.dif)):0), want=sCoin+qCoin+fCoin+rCoin, gotCoin=earn(want);   // 하루 코인 한도까지만
    if(win) stamp("클리어!");
    mcard.innerHTML = `<h3>${win?`🏆 스테이지 클리어! ${MAP.name}`:"게임 끝"}</h3><p>${MAP.name} · <b style="color:${DIFS[MAP.dif].c}">${dN(MAP.dif,MAP.id)}</b> · 경험치 ×${(+MAP.exp).toFixed(1)}</p>
      ${newDif&&MAP.dif<2?`<p class="gbest">🔓 ${dN(MAP.dif+1,MAP.id)} 단계가 열렸어요!</p>`:""}
      ${got.length?`<div class="gmedal">${got.map(i=>`<span>${MEDALS[i][0]} <b>${MEDALS[i][1]}</b> 훈장!</span>`).join("")}</div>`:""}
      ${mileHit.length?`<p class="gbest">🎖 훈장 ${mc}개 돌파! 칭호 '${mileHit[mileHit.length-1][1]}' · 코인 +${mileCoin}</p>`:""}
      ${win?`<div class="gchest">${(()=>{ const F=typeof SKILL_ART_FILES!=="undefined"?SKILL_ART_FILES:{}; return F.chest_c&&F.chest_o?`<div class="chestimg"><img class="cc" src="${F.chest_c}" alt=""><img class="co" src="${F.chest_o}" alt=""><i class="glow"></i></div>`:`<div class="chestbox"><i class="lid"></i><i class="box"></i><i class="glow"></i></div>` })()}<div class="chestout">${keyShow?`<img class="ckey" src="${keySrc(MAP.id+1)}" alt=""><p class="gbest">🗝 <b>${esc(mapById(MAP.id+1).name)}</b> 열쇠를 얻었어요!${keyNow?" 맵 선택창에서 열려요":" (선생님 모드 미리보기)"}</p>`:`<p class="gbest">🪙 다시 클리어 보너스 +${rCoin} 코인</p>`}</div></div>`:""}
      ${win&&MAP.dif>=1&&MAP.id<MAPS.length?`<p class="gbest">🔓 다음 맵 <b>${esc(MAPS[MAP.id].name)}</b>의 ${MAP.dif===2?"보통 · 어려움 · 지옥":"보통 · 어려움"} 단계가 열렸어요!</p>`:""}
      ${honorNew?`<p class="gbest">🎖 <b>명예 카드 획득!</b> ${esc(HERO.name)}(으)로 별의 왕좌를 정복했어요</p><div class="gcards">${honorHtml(HERO.id)}</div>`:""}
      ${(g.cardsGot||[]).length?`<div class="gcards">${g.cardsGot.map(b=>cardHtml(b,(MAP.dif||0)+1,BOSSES[b]&&BOSSES[b].tier===3)).join("")}</div>`:""}
      <div class="gstars">${starStr(stars)}</div>${firstClear?`<p class="gbest">처음 클리어 보너스 +${fCoin} 코인!</p>`:""}
      <div class="gres"><div><b>${fmtT(rec.t)}</b><span>걸린 시간</span></div><div><b>${g.kills}</b><span>물리친 몬스터</span></div><div><b>${Math.min(4,g.bossKills)} / 4</b><span>물리친 보스</span></div></div>
      <p style="font-family:var(--f-ui);font-size:18px;color:#25211b">한자 퀴즈 ${g.qOk} / ${g.qN} 정답 · 한자 ${QR.label}${Q2.w?` · ${Q2.label}`:""}${SR.w?` · 사자성어·속담 ${SR.label}`:""} (경험치 ×${+(QR.exp*SR.exp).toFixed(2)})</p>
      <div class="gcoin"><b>코인 +${gotCoin}</b>${gotCoin<want?`<span style="color:#c8372d">오늘 코인 한도(${DAILY_COIN_MAX})에 닿아서 ${want}개 중 ${gotCoin}개만 받았어요</span>`:""}<span>${NM?"협동 보너스 ×1.3 · ":""}별 ${stars}개 +${sCoin}${win?" (클리어 보너스 포함)":""}${(QR.cm||1)>1?` · 퀴즈 범위 ×${QR.cm}`:""}${qCoin?` · 퀴즈 범위 +${qCoin}`:""}${fCoin?` · 처음 클리어 +${fCoin}`:""}</span></div>
      ${isBest?`<p class="gbest">새 최고 기록이에요!</p>`:""}
      <p style="color:#2f6b55;font-family:var(--f-ui);font-size:20px">${HERO.name} 경험치 +${gotExp} · Lv ${HS(HERO.id).lv}</p>
      <div class="gskills">${Object.keys(g.sk).map(k=>`<span>${skImg(k,22)}${skName(k)}</span>`).join("")}</div>
      <div class="gbtns"><button class="big red" id="ga" ${(P.coins<GAME_COST||day().plays>=DAILY_PLAYS)?"disabled":""}>한 판 더 (코인 ${GAME_COST} · 남은 판 ${Math.max(0,DAILY_PLAYS-day().plays)})</button><button class="big alt" id="gx">공부하러 가기</button></div>`;
    modal.hidden=false;
    if(NM){ const ga=$("#ga"); ga.disabled=false; ga.textContent="친구들과 방으로 돌아가기"; ga.onclick=()=>{ cleanup(); gameLobby() } }
    else { const ga=$("#ga"); ga.textContent=`한 판 더 · 맵 고르기 (남은 판 ${Math.max(0,DAILY_PLAYS-day().plays)})`; ga.onclick=()=>{ cleanup(); gameLobby() } }   // 맵 선택 화면으로 (입장료는 시작할 때 내요)
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
    if(g.pstun>0){ mx=0; my=0 }   /* 보스 패턴 기절 */
    const ml=Math.hypot(mx,my); if(ml>1){mx/=ml;my/=ml}
    P.vx=mx*s.spd; P.vy=my*s.spd; P.mv=Math.hypot(mx,my); if(mx>.15) P.face=1; else if(mx<-.15) P.face=-1;
    if(P.mv>.1){ const prev=g.walk||0; g.walk=prev+dt*14*Math.min(1.4,s.spd/165); if(Math.floor(prev/Math.PI)!==Math.floor(g.walk/Math.PI)) g.fx.push({k:"dust",x:P.x-mx*10,y:P.y+20,life:.4,max:.4}) } else g.walk=0;
    const slowK=(g.pslow>0)?.5:1; if(g.pslow>0) g.pslow-=dt; P.x+=mx*s.spd*slowK*dt; P.y+=my*s.spd*slowK*dt; pushOut(MAP,P,P.r);
    const HZ=!out&&MAP.id===6?hazardAt(MAP,P.x,P.y,g.t):null;
    if(HZ&&HZ.kind==="tornado"){ const dx=P.x-HZ.x, dy=P.y-HZ.y, d=HZ.d||1; P.x+=dx/d*360*dt; P.y+=dy/d*360*dt; if(!g.god){ P.hp-=30*dt; g.lavaT=(g.lavaT||0)-dt }
      if(g.lavaT<=0){ g.lavaT=.35; sfx("hurt"); g.fx.push({k:"num",x:P.x,y:P.y-40,v:-10,me:true,life:.6,max:.6}); g.shake=Math.max(g.shake,.12) }
      if(!g.lavaMsg||g.t-g.lavaMsg>8){ g.lavaMsg=g.t; showBanner("회오리에 닿으면 튕겨 나가며 다쳐요! 피해서 움직여요!") } }
    if(g.bh){ g.bh.t-=dt; if(!out){ const dx=g.bh.x-P.x, dy=g.bh.y-P.y, d=Math.hypot(dx,dy)||1; if(d<g.bh.r){ const k=g.bh.pow*(1-d/g.bh.r*.6); P.x+=dx/d*k*dt; P.y+=dy/d*k*dt } } if(g.bh.t<=0) g.bh=null }
    // 맵 바닥 위험: 빙판(미끄러짐) · 중력 우물(끌려감, 가운데는 아파요)
    { const HZ2=!out&&(MAP.id===8||MAP.id===10)?hazardAt(MAP,P.x,P.y,g.t):null;
      if(HZ2&&HZ2.kind==="ice"){ g.slide={vx:(g.slide?g.slide.vx:0)*.9+P.vx*.1, vy:(g.slide?g.slide.vy:0)*.9+P.vy*.1}; P.x+=g.slide.vx*.55*dt; P.y+=g.slide.vy*.55*dt; if(!g.iceMsg){ g.iceMsg=1; showBanner("빙판이에요! 미끄러지니 조심해요!") } }
      else if(g.slide){ g.slide.vx*=.85; g.slide.vy*=.85; P.x+=g.slide.vx*.4*dt; P.y+=g.slide.vy*.4*dt; if(Math.hypot(g.slide.vx,g.slide.vy)<5) g.slide=null }
      if(HZ2&&HZ2.kind==="grav"){ const dx=HZ2.x-P.x, dy=HZ2.y-P.y, d=HZ2.d||1; P.x+=dx/d*120*dt; P.y+=dy/d*120*dt;
        if(HZ2.core&&!g.god){ P.hp-=28*dt; g.lavaT=(g.lavaT||0)-dt; if(g.lavaT<=0){ g.lavaT=.35; sfx("hurt"); g.fx.push({k:"num",x:P.x,y:P.y-40,v:-10,me:true,life:.6,max:.6}) } }
        if(!g.gravMsg||g.t-g.gravMsg>8){ g.gravMsg=g.t; showBanner("중력 우물이 끌어당겨요! 가운데로 빠지면 아파요!") } } }
    if(g.gust){ const G=g.gust; G.w-=dt; if(G.w<=0){ G.d-=dt; if(!out){ P.x+=Math.cos(G.a)*250*dt; P.y+=Math.sin(G.a)*250*dt; pushOut(MAP,P,P.r) } if(G.d<=0) g.gust=null } }
    if(NM!=="client" && (MAP.id>=3) && !BX) skyHazardTick(dt);
    if(!out && !g.god && inLava(MAP,P.x,P.y)){ P.hp-=34*dt; g.lavaT=(g.lavaT||0)-dt; if(g.lavaT<=0){ g.lavaT=.35; sfx("lava"); g.fx.push({k:"num",x:P.x,y:P.y-40,v:-12,me:true,life:.6,max:.6}); g.shake=Math.max(g.shake,.08) } if(!g.lavaMsg||g.t-g.lavaMsg>8){ g.lavaMsg=g.t; showBanner("앗 뜨거워! 용암 웅덩이에서 빨리 나와요!") } } P.inv=Math.max(0,P.inv-dt); if(M.regen&&!(g.healBlk>g.t)) P.hp=Math.min(s.maxHp,P.hp+M.regen*dt);
    g.wkT=(g.wkT||0)-dt; if(g.wkT<=0){ g.wkT=.2; weakCheck() }
    g.padT=(g.padT||0)-dt; if(g.padT<=0){ g.padT=5; PADAPT=padapt() }
    if(g.conf>0&&!g.paused){ g.confT-=dt; if(g.confT<=0){ g.conf--; g.confT=CONF_T; confHud(); if(!g.conf) g.fx.push({k:"label",x:g.p.x,y:g.p.y-80,text:"✨ 집중 회복!",life:1.2,max:1.2}) } }
    if(TOP&&!g.topShown&&g.t>2.6){ g.topShown=1; showBanner(`👑 오늘의 최강 용사: ${TOP.name} (전투력 ${fmtPow(TOP.pw)})${TOP.id===NET.myId?" · 바로 나예요!":""}`) }
    if(!g.engShown&&g.t>1.2){ g.engShown=1; const L=engOf(P.hero); if(L.length){ L.forEach((h,i)=>g.fx.push({k:"label",x:P.x+(i-(L.length-1)/2)*56,y:P.y-95,text:h,life:2.2,max:2.2})); const cb=engCombos(L); showBanner(cb.length?`✨ 룬 공명! ${cb.map(c=>c[0]+"+"+c[1]+" "+c[2]).join(" · ")}`:`💎 한자 룬의 힘! ${L.map(h=>h+"("+engInfo(h).hun+" "+engInfo(h).eum+")").join(" · ")}`); if(cb.length){ g.resT=g.t; sfx("awaken") } } }
    if(g0eng.regen&&!P.dead&&P.hp>0&&!(g.healBlk>g.t)) P.hp=Math.min(s.maxHp,P.hp+s.maxHp*g0eng.regen*dt);   /* 한자 룬 회복 */
    if(g.bbuff){ g.bbuff.t-=dt; P.hp=Math.min(s.maxHp,P.hp+(g.bbuff.regen||0)*dt); if(g.bbuff.t<=0) g.bbuff=null }
    if(BX){ if(NM!=="client"){ if(!g.b11Start){ g.b11Start=1; BX.start() } BX.hostTick(dt) } BX.tick(dt) }
    // 생성
    if(NM!=="client"&&!BX){
    const rate = (2.6 + g.t*.72/8)*(g.bossUp?.5:1)*MAP.spawn*(NM?1.15+CO.spawn*(nPlayers()-1):1);
    if(g.bossUp&&g.t>=g.nextCrisis) g.nextCrisis=g.t+8;   // 보스전 중에는 몬스터 대습격을 미뤄요
    if(g.t>=g.nextCrisis){ g.nextCrisis=g.t+(34+Math.random()*10)*(NM?CO.crisis:1); crisis() }
    g.spawnAcc += rate*dt;
    while(g.spawnAcc>=1){ g.spawnAcc--; if(g.en.length<(g.bossUp?(NM?280:200):(NM?420:320))){ const r=Math.random(); spawnMob() } }
    stageTick();
    }
    // 보스 탄
    for(const b of g.eshots){ if(b.home===undefined&&!b.nh&&HOMEK[b.kind]){ b.home=.3; b.hk=HOMEK[b.kind]; b.hsp=Math.hypot(b.vx,b.vy) } if(b.home!==undefined){ b.home-=dt; if(b.home<=0&&b.home>-2.5){ const a=Math.atan2(P.y-b.y,P.x-b.x), sp=b.hsp||210, kk=Math.min(1,dt*(b.hk||2.2)); b.vx+=(Math.cos(a)*sp-b.vx)*kk; b.vy+=(Math.sin(a)*sp-b.vy)*kk } }
      if(b.orbit){ b.ot+=dt; const R=Math.max(0,b.R0+b.dR*b.ot), an=b.a0+b.w*b.ot; b.R=R; b.x=b.cx+Math.cos(an)*R; b.y=b.cy+Math.sin(an)*R*.85; b.life-=dt; const GH=g._gh||(g._gh={}), gk=b.gid; if(!P.dead&&!b.hitMe&&!(gk&&GH[gk])&&(b.x-P.x)**2+(b.y-P.y)**2<(b.r+P.r)**2){ hitPlayer(b.dmg); b.hitMe=1; if(gk) GH[gk]=1 } continue }
      if(b.kind==="web"){ b.life-=dt; if(!P.dead&&(b.x-P.x)**2+(b.y-P.y)**2<(b.r+P.r*.5)**2) g.pslow=Math.max(g.pslow||0,.25); continue }
      if(b.kind==="axe"){ b.tt+=dt; b.life-=dt; b.hitCD-=dt; const u=b.tt/b.T; let px,py; if(u<1){ const k=1-(1-u)*(1-u); px=b.sx+(b.tx-b.sx)*k; py=b.sy+(b.ty-b.sy)*k } else { const own=g.en.find(o=>o.id===b.eid), hx=own?own.x:b.sx, hy=own?own.y:b.sy, k=Math.min(1,(u-1)*(u-1)); px=b.tx+(hx-b.tx)*k; py=b.ty+(hy-b.ty)*k } b.vx=(px-b.x)/Math.max(dt,1e-3); b.vy=(py-b.y)/Math.max(dt,1e-3); b.x=px; b.y=py; if(!P.dead&&b.hitCD<=0&&(b.x-P.x)**2+(b.y-P.y)**2<(b.r+P.r)**2){ b.hitCD=.7; hitPlayer(b.dmg) } continue }
      if(b.kind==="vortex"){ b.life-=dt; b.hitCD-=dt; const dx=b.x-P.x, dy=b.y-P.y, d=Math.hypot(dx,dy)||1; if(!P.dead&&d<b.pr&&d>(b.minR||0)){ const k=b.pull*(1-d/b.pr*.5); P.x+=dx/d*Math.min(d,k*dt); P.y+=dy/d*Math.min(d,k*dt) } if(!P.dead&&d<b.r+P.r&&b.hitCD<=0){ b.hitCD=.8; hitPlayer(b.dmg) } continue }
      if(b.kind==="beam"){ b.life-=dt; b.ot+=dt; b.hitCD-=dt; b.a=b.a0+b.w*b.ot; if(b.eid!==undefined){ const o=g.en.find(x=>x.id===b.eid&&x.hp>0); if(o){ b.x=o.x+Math.cos(b.a)*o.r*.55; b.y=o.y-o.r*.35+Math.sin(b.a)*o.r*.35 } else b.life=Math.min(b.life,.2) } /* 브레스 시작점이 용 입을 따라다녀요 */ const px=P.x-b.x, py=P.y-b.y, al=px*Math.cos(b.a)+py*Math.sin(b.a), ac=Math.abs(-px*Math.sin(b.a)+py*Math.cos(b.a)); if(!P.dead&&b.hitCD<=0&&al>0&&al<b.len&&ac<b.r+P.r){ b.hitCD=.9; hitPlayer(b.dmg) } continue }
      if(b.bounce){ if(b.grow) b.r=Math.min(64,b.r+dt*8); b.hitCD=(b.hitCD||0)-dt; b.x+=b.vx*dt; b.y+=b.vy*dt; b.life-=dt; if(b.x<b.cx-b.hw||b.x>b.cx+b.hw) b.vx*=-1; if(b.y<b.cy-b.hh||b.y>b.cy+b.hh) b.vy*=-1; b.x=Math.max(b.cx-b.hw,Math.min(b.cx+b.hw,b.x)); b.y=Math.max(b.cy-b.hh,Math.min(b.cy+b.hh,b.y)); if(!P.dead&&b.hitCD<=0&&(b.x-P.x)**2+(b.y-P.y)**2<(b.r+P.r)**2){ b.hitCD=1; hitPlayer(b.dmg) } continue }
      if(b.kind==="shock"){ b.rad+=b.v*dt; b.life-=dt; const d=Math.hypot(P.x-b.x,(P.y-b.y)/.75); if(!P.dead&&!b.hitMe&&Math.abs(d-b.rad)<b.band+P.r*.5){ b.hitMe=1; hitPlayer(b.dmg) } continue }
      b.x+=b.vx*dt; b.y+=b.vy*dt; b.life-=dt; if(!P.dead && !b.hitMe && (b.x-P.x)**2+(b.y-P.y)**2<(b.r+P.r)**2){ hitPlayer(b.dmg); if(b.kind==="wave") g.fx.push({k:"wburst",x:P.x,y:P.y-12,m:b.map,life:.4,max:.4}); if(b.pierce) b.hitMe=1; else b.life=0 } }
    g.eshots=g.eshots.filter(b=>b.life>0);
    // 적 이동
    if(NM==="client"){
      for(const e of g.en){ e.x+=(e.tx-e.x)*Math.min(1,dt*10); e.y+=(e.ty-e.y)*Math.min(1,dt*10); e.flash=Math.max(0,e.flash-dt); e.slow=Math.max(0,e.slow-dt); e.stoneCD=Math.max(0,e.stoneCD-dt);
        if(!P.dead && !g.god && P.inv<=0 && (e.x-P.x)**2+(e.y-(e.type==="boss"?e.r*BOSS_DY:0)-P.y)**2<(e.r+P.r)**2){ const cd=absorb((1+CONF_V*(g.conf||0))*e.dmg*M.armor); P.hp-=cd; g.dmgIn=(g.dmgIn||0)+cd; if(F.thorn){ hurt(e,30); g.fx.push({k:"hit",x:e.x,y:e.y,life:.2,max:.2}) } sfx("hurt"); g.fx.push({k:"num",x:P.x,y:P.y-40,v:-Math.round(cd),me:true,life:.8,max:.8}); g.shake=Math.max(g.shake,.1); P.inv=.45; g.fx.push({k:"hit",x:P.x,y:P.y,life:.2,max:.2}) } }
    } else {
    for(const e of g.en){
      const T=NM?nearestPlayer(e.x,e.y):P, dx=T.x-e.x, dy=T.y-e.y, d=Math.hypot(dx,dy)||1, dP=e.type==="boss"?Math.hypot(P.x-e.x,P.y-(e.y-e.r*BOSS_DY)):(NM?Math.hypot(P.x-e.x,P.y-e.y):d);
      if(e.hold>0) e.hold-=dt; const sp=e.stun>0||e.hold>0?0:e.sp*(e.slow>0?.45:1)*(e.rage>0?1.5:1); if(e.stun>0) e.stun-=dt; if(e.rage>0) e.rage-=dt;
      if(e.mk&&!(e.stun>0)&&!NM_CLIENT()) minionAI(e,T,dx,dy,d,dt);
      if(e.rush&&e.rush.t>0&&!(e.stun>0)){ e.rush.t-=dt; e.x+=e.rush.vx*sp*dt; e.y+=e.rush.vy*sp*dt; if(!FLYERS[e.look]) pushOut(MAP,e,e.r*.85); if(dP<e.r+P.r && P.inv<=0) hitPlayer(e.dmg); continue }
      if(e.b11){ }
      else if(e.type==="boss"&&(e.jump||e.burrow||e.spinT>0||e.aimHold>0||e.dash>0)){ e.mvx=0; e.mvy=0 }   // 점프·잠행·팽이 중엔 걷지 않아요
      else if(e.type==="boss"){ const cast=e.atk&&g.t-e.atk.t0<e.atk.wind+.35, tv=cast?.15:1, tx=dx/d*sp*tv, ty=dy/d*sp*tv, k=Math.min(1,dt*3.2);
        e.mvx=(e.mvx||0)+(tx-(e.mvx||0))*k; e.mvy=(e.mvy||0)+(ty-(e.mvy||0))*k; e.x+=e.mvx*dt; e.y+=e.mvy*dt; e.spd=Math.hypot(e.mvx,e.mvy)/Math.max(1,e.sp) }
      else { const kd=e.mk==="ranged"&&d<250?-.6:1; e.x+=dx/d*sp*dt*kd; e.y+=dy/d*sp*dt*kd; if(!FLYERS[e.look]) pushOut(MAP,e,e.r*.85) }
      e.slow=Math.max(0,e.slow-dt); e.flash=Math.max(0,e.flash-dt); e.stoneCD=Math.max(0,e.stoneCD-dt); if(e.type==="boss"&&!e.b11) bossAI(e,dt);
      if(d>Math.hypot(W,H)&&!e.b11) { const a=Math.random()*Math.PI*2, R=Math.hypot(W,H)/2+40; e.x=T.x+Math.cos(a)*R; e.y=T.y+Math.sin(a)*R }
      if(dP<e.r+P.r && P.inv<=0 && !P.dead && !g.god && !e.hidden && !e.air){ const cd=absorb((1+CONF_V*(g.conf||0))*e.dmg*M.armor*(e.rage>0?1.5:1)); P.hp-=cd; g.dmgIn=(g.dmgIn||0)+cd; if(F.thorn){ hurt(e,30); g.fx.push({k:"hit",x:e.x,y:e.y,life:.2,max:.2}) } g.fx.push({k:"num",x:P.x,y:P.y-40,v:-Math.round(cd),me:true,life:.8,max:.8}); g.shake=Math.max(g.shake,.1); P.inv=.45; g.fx.push({k:"hit",x:P.x,y:P.y,life:.2,max:.2}) }
    }
    // 겹침 밀어내기
    const en=g.en;
    for(let i=0;i<en.length;i++){ const a=en[i];
      for(let j=i+1;j<en.length;j++){ const b=en[j]; const dx=b.x-a.x, dy=b.y-a.y, rr=a.r+b.r;
        if(dx>rr||dx<-rr||dy>rr||dy<-rr) continue;
        const d=Math.hypot(dx,dy)||.01; if(d<rr){ const push=(rr-d)/2, ux=dx/d, uy=dy/d; const fa=a.dash>0||a.aimHold>0?0:1, fb=b.dash>0||b.aimHold>0?0:1, sum=fa+fb; if(sum){ const p2=push*2/sum; a.x-=ux*p2*fa; a.y-=uy*p2*fa; b.x+=ux*p2*fb; b.y+=uy*p2*fb } } } }
    }
    if(P.hp<=0 && !P.dead && !frozen){ P.hp=0; die(); if(!NM) return }
    // 무기
    const cd=(k,base)=>{ g.cd[k]=(g.cd[k] ?? 0.3)-dt; if(g.cd[k]<=0){ g.cd[k]=base*s.cd; return true } return false };
    if(!out&&!window.__noAtk&&!g.cine){
    // 전직 스킬
    if(!(g.sealT>g.t)) updateSkills(dt);
    if(aura && cd("aura",.5)) g.en.forEach(e=>{ if((e.x-P.x)**2+(e.y-P.y)**2<(aura.r+e.r)**2) hurt(e,aura.dmg*lvScale) });
    // 직업 기본 공격
    const SH0=g.shots.length;
    if(lv("main")){
      const L=lv("main"), K=HERO.main.kind;
      const aim=t=>{ const dx=t.x-P.x, dy=t.y-P.y, d=Math.hypot(dx,dy)||1; return [dx/d,dy/d] };
      if(K==="sword" && cd("main",.85-.05*L)){ g.atkT=g.t;
        const t=near(P.x,P.y,1)[0]; const ang=t?Math.atan2(t.y-P.y,t.x-P.x):(g.face||0); g.face=ang; (sfx(HERO.main.kind)),g.atk={t:g.t,a:ang,flip:!(g.atk&&g.atk.flip)};
        const R=90+10*L, arc=Math.PI*(.8+.08*L), dmg=28+10*L; let hitAny=false;
        g.en.forEach(e=>{ const dx=e.x-P.x, dy=e.y-P.y, d=Math.hypot(dx,dy);
          if(d<R+e.r){ let a=Math.atan2(dy,dx)-ang; a=Math.atan2(Math.sin(a),Math.cos(a));
            if(Math.abs(a)<arc/2 || d<P.r+e.r+10){ hurt(e,dmg); hitAny=true; if(e.type!=="boss"&&d>0){ ccP(e,dx/d*28,dy/d*28) } } } });
        if(F.combo && hitAny) g.combo=Math.min(5,g.combo+1);
        if(hitAny) P.hp=Math.min(s.maxHp,P.hp+s.maxHp*.012);   // 탱커: 베면 체력이 조금 차요
        g.fx.push({k:"slash",x:P.x,y:P.y,a:ang,r:R,arc,life:.22,max:.22});
        if(HSt.tier>=5&&HERO.id==="warrior"){   /* 5차: 베면 불꽃 검기가 앞으로 날아가요 (가까이서 벤 적은 또 맞지 않아요) */
          const hs=new Set(); g.en.forEach(e=>{ const dx=e.x-P.x, dy=e.y-P.y, d=Math.hypot(dx,dy); if(d<R+e.r){ let q=Math.atan2(dy,dx)-ang; q=Math.atan2(Math.sin(q),Math.cos(q)); if(Math.abs(q)<arc/2||d<P.r+e.r+10) hs.add(e) } });
          g.shots.push({k:"swave",x:P.x+Math.cos(ang)*34,y:P.y+Math.sin(ang)*34,vx:Math.cos(ang)*640,vy:Math.sin(ang)*640,dmg:dmg*.8,pierce:99,life:.62,hit:hs,rad:34,kb:16}) }
      }
      if(K==="arrow" && cd("main",.24-.012*L)){   // 궁수: 쉬지 않고 쭉 쏘는 속사 · 꿰뚫어요
        const t0=near(P.x,P.y,1)[0];
        if(t0){ const a=Math.atan2(t0.y-P.y,t0.x-P.x); sfx(HERO.main.kind); g.atk={t:g.t,a}; g.qv=(g.qv||0)+1; const bomb=F.quiver&&g.qv%6===0, n=1+(L>=3?1:0)+(L>=5?1:0), nx=-Math.sin(a), ny=Math.cos(a);
          for(let i=0;i<n;i++){ const o=(i-(n-1)/2)*12; g.shots.push({k:"arrow",x:P.x+nx*o,y:P.y+ny*o,vx:Math.cos(a)*820,vy:Math.sin(a)*820,dmg:8+2.8*L,pierce:2+L+pierceAdd,life:1.2,hit:new Set(),boom:bomb?60:0,glow:bomb||L>=4}) } }
      }
      if(K==="star" && cd("main",.48-.03*L)){   // 도적: 꿰뚫고 날아갔다가 부메랑처럼 돌아와요
        const n=1+Math.floor(L/2)+(F.lucky?1:0), clone=g.sum.find(m=>m.kind==="clone"), t0=near(P.x,P.y,1)[0]; if(t0) (sfx(HERO.main.kind)),g.atk={t:g.t,a:Math.atan2(t0.y-P.y,t0.x-P.x)};
        near(P.x,P.y,n).forEach(t=>{ const [ux,uy]=aim(t); g.shots.push({k:"star",x:P.x,y:P.y,vx:ux*560,vy:uy*560,dmg:5+2*L,pierce:99,life:2.2,hit:new Set(),boomer:.42,rad:14});
          if(clone){ const dx=t.x-clone.x, dy=t.y-clone.y, d=Math.hypot(dx,dy)||1; g.shots.push({k:"star",x:clone.x,y:clone.y,vx:dx/d*560,vy:dy/d*560,dmg:(5+2*L)*.8*(g.cloneMul||1),pierce:99,life:2.2,hit:new Set(),dark:true,boomer:.42,rad:14,home:clone}) } });
      }
      if(K==="gun" && cd("main",.3-.018*L)){
        const t=near(P.x,P.y,1)[0];
        if(t){ g.shotN=(g.shotN||0)+1; const a=Math.atan2(t.y-P.y,t.x-P.x); (sfx(HERO.main.kind)),g.atk={t:g.t,a};
          const spread = g.shotN%2===0 ? (L>=3?[-.3,-.15,0,.15,.3]:[-.18,0,.18]) : [0];
          const offs=F.double?[-5,5]:[0], nx=-Math.sin(a), ny=Math.cos(a);
          spread.forEach(o=>offs.forEach(q=>g.shots.push({k:"bullet",x:P.x+nx*q,y:P.y+ny*q,vx:Math.cos(a+o)*780,vy:Math.sin(a+o)*780,dmg:(6.5+2.4*L)*(o?.55:1),pierce:1,life:.7,hit:new Set()})));
          g.fx.push({k:"muzzle",x:P.x+Math.cos(a)*24,y:P.y+Math.sin(a)*24,life:.08,max:.08}); }
      }
      if(K==="fireball" && cd("main",1.25-.06*L)){
        const n=1+(L>=4?1:0), t0=near(P.x,P.y,1)[0]; if(t0) (sfx(HERO.main.kind)),g.atk={t:g.t,a:Math.atan2(t0.y-P.y,t0.x-P.x)};
        near(P.x,P.y,n).forEach(t=>{ const [ux,uy]=aim(t); g.shots.push({k:"fire",x:P.x,y:P.y,vx:ux*420,vy:uy*420,dmg:26+10*L,boom:88+12*L,boomMul:.9,pierce:0,life:1.5,hit:new Set()}) });   // 마법사: 닿는 순간 넓게 펑!
      }
      if(K==="moon" && cd("main",.6-.03*L)){   // 치유사: 달 구슬이 몬스터 사이를 튕겨 다녀요 · 맞히면 체력이 조금 차요
        const t0=near(P.x,P.y,1)[0]; if(t0){ sfx("moon"); g.atk={t:g.t,a:Math.atan2(t0.y-P.y,t0.x-P.x)}; const [ux,uy]=aim(t0);
          g.shots.push({k:"moonorb",x:P.x,y:P.y-10,vx:ux*520,vy:uy*520,dmg:10+3.6*L,pierce:0,bounce:3+Math.floor(L/2)+(F.moonbounce?1:0),heal:F.moonbounce?.016:.008,life:1.4,hit:new Set(),rad:14}) }
      }
      if(K==="brush" && cd("main",.62-.03*L)){   // 서예가: 붓을 휘둘러 먹물 물결 · 모두 꿰뚫고 느리게 해요
        const t0=near(P.x,P.y,1)[0]; if(t0){ sfx("brush"); const a=Math.atan2(t0.y-P.y,t0.x-P.x); g.atk={t:g.t,a,flip:!(g.atk&&g.atk.flip)};
          const fan=[0].concat(F.ink2?[Math.PI]:[],L>=4?[.38]:[]); g.bn=(g.bn||0)+1; if(g.bn%3===0){ const R=115; g.en.forEach(e=>{ if(inR(P.x,P.y,R,e)){ hurt(e,(12+4.2*L)*.7); ccL(e,1.2); if(e.type!=="boss"){ const dx=e.x-P.x, dy=e.y-P.y, d=Math.hypot(dx,dy)||1; ccP(e,dx/d*22,dy/d*22) } } }); g.fx.push({k:"inksplash",x:P.x,y:P.y,r:R,life:.45,max:.45}) }   // 세 번째 붓질마다 먹물이 사방으로 튀어요
          fan.forEach(o=>g.shots.push({k:"ink",x:P.x+Math.cos(a+o)*20,y:P.y+Math.sin(a+o)*20,vx:Math.cos(a+o)*560,vy:Math.sin(a+o)*560,dmg:12+4.2*L,pierce:99,life:.66,hit:new Set(),rad:26,kb:9,slowT:F.ink2?1.4:.8})) }
      }
      if(K==="charm" && cd("main",.42-.02*L)){   // 조련사: 끝까지 쫓아가는 방울 부적
        const n=1+Math.floor((L+1)/3), T=near(P.x,P.y,n); if(BX&&T.length){ const bb=g.en.find(e=>e.b11&&e.hp>0); if(bb&&!T.includes(bb)) T[0]=bb }   /* 보스맵: 방울 하나는 꼭 보스에게 */
        if(T.length){ sfx("charm"); g.atk={t:g.t,a:Math.atan2(T[0].y-P.y,T[0].x-P.x)};
          T.forEach((t,i)=>{ const a=Math.atan2(t.y-P.y,t.x-P.x)+(i?(i%2?.5:-.5):0); g.shots.push({k:"charm",x:P.x,y:P.y-8,vx:Math.cos(a)*460,vy:Math.sin(a)*460,dmg:13+4*L,pierce:0,boom:48,boomMul:.5,life:1.6,hit:new Set(),seek:t}) }) }
      }
      if(K==="punch" && cd("main",.5-.028*L)){   // 메카닉: 로켓 주먹 · 꿰뚫고 밀쳐 내요
        const t0=near(P.x,P.y,1)[0]; if(t0&&(t0.x-P.x)**2+(t0.y-P.y)**2<310*310){ sfx("punch"); const a=Math.atan2(t0.y-P.y,t0.x-P.x); g.atk={t:g.t,a}; g.pn=(g.pn||0)+1;
          g.shots.push({k:"fist",x:P.x+Math.cos(a)*18,y:P.y+Math.sin(a)*18-6,vx:Math.cos(a)*660,vy:Math.sin(a)*660,dmg:24+9*L,pierce:3+Math.floor(L/2),life:.46,hit:new Set(),rad:20,kb:24});
          if(F.missile&&g.pn%3===0) for(const s2 of [-1,1]){ const b=a+s2*1.1; g.shots.push({k:"missile",x:P.x,y:P.y-20,vx:Math.cos(b)*300,vy:Math.sin(b)*300,dmg:(24+9*L)*.9,pierce:0,boom:55,boomMul:.8,life:1.6,hit:new Set(),seek:t0}) } }
      }
    }
    // 4차 공격 그림과 맞추기: 탄은 그림 속 "발사" 장면(0.22초 뒤)에 무기 끝에서 나가요
    { const DL=(HSt.tier===4&&HERO.id!=="warrior"&&HERO.id!=="calli"&&typeof SKILL_IMG!=="undefined"&&SKILL_IMG["hatk_"+HERO.id]&&!window.__noArt)?.22:0;
      if(DL) for(let i=SH0;i<g.shots.length;i++){ const sh=g.shots[i]; if(sh.wait!==undefined) continue; const v=Math.hypot(sh.vx||0,sh.vy||0)||1; sh.wait=DL; sh.ox=sh.x-P.x+(sh.vx||0)/v*26; sh.oy=sh.y-P.y-10+(sh.vy||0)/v*18 } }
    if(lv("wind") && cd("wind", .85)){
      const L=lv("wind"), n=1+Math.floor((L-1)/2);
      near(P.x,P.y,n).forEach(t=>{ const dx=t.x-P.x, dy=t.y-P.y, d=Math.hypot(dx,dy)||1;
        g.shots.push({k:"wind",x:P.x,y:P.y,vx:dx/d*420,vy:dy/d*420,dmg:10+4*L,pierce:L>=4?2:0,life:1.1,hit:new Set()}) });
    }
    if(lv("elec") && cd("elec", 1.9-.18*lv("elec"))){
      const L=lv("elec"), vis=smartTargets(60,L+1).pts;   // 위험하면 내 주변부터 · 아니면 몬스터가 많은 곳
      vis.forEach(t=>{ g.fx.push({k:"bolt",bt:"card",x:t.x,y:t.y,life:.3,max:.3});
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
          const dx=e.x-P.x, dy=e.y-P.y, d=Math.hypot(dx,dy)||1; if(e.type!=="boss"){ccP(e,dx/d*14,dy/d*14)} } }) }
    }
    if(lv("ice") && cd("ice", 2.3)){
      const L=lv("ice"), n=4+2*L, off=Math.random()*Math.PI;
      for(let i=0;i<n;i++){ const a=off+i*Math.PI*2/n; g.shots.push({k:"ice",x:P.x,y:P.y,vx:Math.cos(a)*300,vy:Math.sin(a)*300,dmg:6+3*L,pierce:0,life:.9,hit:new Set()}) }
    }
    }
    // 발사체
    for(const sh of g.shots){
      if(sh.wait>0){ sh.wait-=dt; sh.x=P.x+sh.ox; sh.y=P.y+sh.oy; continue }
      if(sh.boomer!==undefined){ sh.boomer-=dt; if(sh.boomer<=0){ const H=sh.home||P, dx=H.x-sh.x, dy=H.y-sh.y, d=Math.hypot(dx,dy)||1; if(!sh.back){ sh.back=1; sh.hit.clear() } const sp=640; sh.vx+=(dx/d*sp-sh.vx)*Math.min(1,dt*7); sh.vy+=(dy/d*sp-sh.vy)*Math.min(1,dt*7); if(d<22) sh.life=0 } else { sh.vx*=1-dt*1.6; sh.vy*=1-dt*1.6 } }
      if(sh.sd>0) sh.sd-=dt; else if(sh.seek){ const T=sh.seek.hp>0?sh.seek:near(sh.x,sh.y,1)[0]; if(T){ sh.seek=T; const a=Math.atan2(T.y-sh.y,T.x-sh.x), sp=520; sh.vx+=(Math.cos(a)*sp-sh.vx)*Math.min(1,dt*5); sh.vy+=(Math.sin(a)*sp-sh.vy)*Math.min(1,dt*5) } }
      sh.x+=sh.vx*dt; sh.y+=sh.vy*dt; sh.life-=dt; if(sh.remote) continue;
      for(const e of g.en){ if(e.hp<=0||sh.hit.has(e)) continue;
        if((e.x-sh.x)**2+(e.y-sh.y)**2<(e.r+(sh.rad||11))**2){ hurt(e,sh.dmg); sh.hit.add(e); if(sh.k==="ice") ccL(e,1.6*M.slow);
          if(sh.slowT) ccL(e,sh.slowT); if(sh.kb&&e.type!=="boss"){ const d=Math.hypot(sh.vx,sh.vy)||1; ccP(e,sh.vx/d*sh.kb,sh.vy/d*sh.kb) }
          if(sh.heal){ healMe(st().maxHp*sh.heal); sh.heal=0 }
          if(sh.bounce>0){ let nb=null, bd=260*260; for(const o of g.en){ if(o.hp<=0||sh.hit.has(o)) continue; const d=(o.x-sh.x)**2+(o.y-sh.y)**2; if(d<bd){ bd=d; nb=o } }
            if(!nb&&e.type==="boss"&&e.hp>0){ sh.bounce--; sh.hit.delete(e); const a=Math.random()*6.28, sp=Math.hypot(sh.vx,sh.vy); sh.x=e.x+Math.cos(a)*(e.r+40); sh.y=e.y+Math.sin(a)*(e.r+40); sh.vx=-Math.cos(a)*sp; sh.vy=-Math.sin(a)*sp; sh.life=Math.max(sh.life,.5); break }
            if(nb){ const sp=Math.hypot(sh.vx,sh.vy), d=Math.sqrt(bd)||1; sh.vx=(nb.x-sh.x)/d*sp; sh.vy=(nb.y-sh.y)/d*sp; sh.bounce--; sh.life=Math.max(sh.life,.7); g.fx.push({k:"spark",x:sh.x,y:sh.y,life:.22,max:.22,a:Math.random()*6}); break } }
          if(sh.cb&&g.fx.length<(NM?110:150)) g.fx.push({k:"cboom",x:sh.x,y:sh.y,life:.36,max:.36});   // 대포 선원·문어 포탑: 맞은 곳 펑
          if(sh.boom){ g.en.forEach(o=>{ if(o!==e && (o.x-sh.x)**2+(o.y-sh.y)**2<(sh.boom+o.r)**2) hurt(o,sh.dmg*(sh.boomMul||.7)) }); g.fx.push({charm:sh.k==="charm"?1:0,k:"boom",x:sh.x,y:sh.y,r:sh.boom,col:sh.k==="cannon"?"#ff8a2a":sh.k==="arrow"?"#8af0c1":sh.k==="charm"?"#ffd36a":sh.k==="dball"?"#6ab0ff":null,life:.35,max:.35}) }
          if(sh.pierce--<=0){ sh.life=0; break } } }
    }
    g.shots=g.shots.filter(x=>x.life>0);
    for(const e of g.en) if(e.hp<=0&&e.b11&&BX&&!e._realKill&&NM!=="client"){ e.hp=1; kill(e) }   /* 안전장치: 보스가 연출 없이 사라지지 않게 */
    g.en=g.en.filter(e=>e.hp>0);
    // 경험치 구슬
    if(g.gems.length>350){ const old=g.gems.splice(0,100); const v=old.reduce((a,b)=>a+b.v,0); g.gems.push({x:old[0].x,y:old[0].y,v}) }
    if(g.gemPull>0) g.gemPull-=dt;
    for(const gm of g.gems){
      const dx=P.x-gm.x, dy=P.y-gm.y, d=Math.hypot(dx,dy)||1; gm.age=(gm.age||0)+dt;   // 12초 지나면 멀리 있어도 저절로 날아와요
      if(d<s.mag*1.4 || gm.fly || gm.age>(BX?3:12) || g.gemPull>0){ gm.fly=true; gm.fa=(gm.fa||0)+dt; const sp=Math.max(520,600-d)+Math.min(1400,gm.fa*1600);   /* 끌려오기 시작하면 점점 빨라져요 (멀리 있어도 1초 안에 쏙) */ const st2=Math.min(d,sp*dt); gm.x+=dx/d*st2; gm.y+=dy/d*st2 }
      if(P.dead) continue;
      if(d<P.r+6 && !gm.got){ gm.got=true; sfx("gem"); if(NM==="client") netOut.g.push(gm.id); else { g.xp+=gm.v*M.xp; if(NM) xpShare+=gm.v } }
    }
    g.gems=g.gems.filter(x=>!x.got);
    for(const it of g.items){
      if(!P.dead && !it.got && (it.x-P.x)**2+(it.y-P.y)**2<(P.r+16)**2){ it.got=true; if(NM==="client"&&!it.local){ netOut.it.push(it.id); continue }
        if(it.k==="heal"){ sfx("heal"); P.hp=Math.min(s.maxHp,P.hp+30); showBanner("회복 물약! 체력을 채웠어요") }
        else if(it.k==="gem"){ sfx("chest"); P.hp=Math.min(s.maxHp,P.hp+40); openGemChest() }
        else { sfx("chest"); const o=options(); P.hp=Math.min(s.maxHp,P.hp+40);
          if(o.length){ apply(o[0]); showBanner(`보물 상자! ${skName(o[0])} 기술이 세졌어요`) } else showBanner("보물 상자! 체력을 채웠어요") } } }
    g.items=g.items.filter(x=>!x.got);
    for(const f of g.fx) f.life-=dt;
    // 보스 경고가 끝나는 순간: 그 모양 그대로 '확 분출'하는 효과를 붙여요 (판정은 그대로, 보이는 것만)
    if(!window.__fxLow&&g.fx.length<(NM?120:160)){ const ER=[]; for(const f of g.fx){ if(f.life>0||f.erupted||f.own||f.safe) continue; f.erupted=1;
      if(f.k==="conewarn") ER.push({k:"erupt",s:"cone",x:f.x,y:f.y,a:f.a,half:f.half,r:f.r,life:.42,max:.42});
      else if(f.k==="laserwarn") ER.push({k:"erupt",s:"line",x:f.x,y:f.y,a:f.a,len:f.len,life:.36,max:.36});
      else if(f.k==="donutwarn") ER.push({k:"erupt",s:"donut",x:f.x,y:f.y,r1:f.r1,r2:f.r2,life:.42,max:.42});
      else if(f.k==="tilewarn") ER.push({k:"erupt",s:"tile",x:f.x,y:f.y,sz:f.s,life:.36,max:.36});
      else if(f.k==="warn"||f.k==="cloudwarn") ER.push({k:"erupt",s:"circ",x:f.x,y:f.y,r:f.r,sq:f.k==="cloudwarn"?.55:.75,life:.38,max:.38}) }
      if(ER.length) Array.prototype.push.apply(g.fx,ER) }
    g.fx=g.fx.filter(f=>f.life>0);
    /* 렉 줄이기: 효과가 너무 많으면 오래된 숫자·작은 효과부터 줄여요 */
    { const CAP=NM?160:200; if(g.fx.length>CAP){ const SMALL={num:1,poof:1,hit:1,crit:1,spark:1,hitspk:1,dust:1,sandtrail:1,erupt:1,wburst:1}; let cut=g.fx.length-CAP; g.fx=g.fx.filter(f=>{ if(cut>0&&SMALL[f.k]){ cut--; return false } return true }) } }
    { let nums=0; for(let i=g.fx.length-1;i>=0;i--){ const f=g.fx[i]; if(f.k==="num"&&!f.me&&++nums>40) f.life=0 } }
    if(g.duelQ && !frozen && !P.dead && !g.over){ const d=g.duelQ; g.duelQ=null; hanjaDuel(d); return }
    if(!NM && g.xp>=g.need && !frozen && !P.dead){ g.xp-=g.need; g.lvl++; g.need=needXP(g.lvl); levelUp() }
    else if(NM==="host" && g.xp>=g.need && !g.lvR && !g.paused && !g.lvPend && !Object.values(RP).some(r=>!r.gone&&r.pzT)) lvStart()
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
    if(!ART){ const ph=VPH, tint=PH_TINT[MAP.id][phV(ph)]; if(tint){ const k=Math.min(1,(g.t-VPH_T)/3), [r,gg,b,a]=tint.split(","); ctx.fillStyle=`rgba(${r},${gg},${b},${(+a)*Math.max(.15,k)})`; ctx.fillRect(0,0,W,H) }
      if(ph>=2){ const lt=(g.t*.37)%7; if(lt<.12||(lt>.25&&lt<.32)){ ctx.fillStyle="rgba(230,220,255,.18)"; ctx.fillRect(0,0,W,H) } } }
    const shk=g.shake>0?16*Math.min(1,g.shake/.3)*(g.t<(g.calmUntil||0)?.45:1):0;
    const ox=cx+(Math.random()-.5)*shk, oy=cy+(Math.random()-.5)*shk;
    ctx.save(); ctx.translate(ox,oy);
    const vis=o=>Math.abs(o.x-P.x)<W/2+60&&Math.abs(o.y-P.y)<H/2+60;
    // 불꽃 고리
    if(lv("fire")&&typeof drawCardFireRing==="function"&&drawCardFireRing(ctx,P,55+12*lv("fire"),g.t)){}
    else if(lv("fire")){ const R=55+12*lv("fire"); // 화염 고리: 일렁이는 불길 띠 + 불씨
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
    for(const it of g.items){ if(!vis(it)){ if(it.k==="gem"){ const dx=it.x-P.x, dy=it.y-P.y, sc=Math.min((W/2-46)/Math.max(1,Math.abs(dx)),(H/2-70)/Math.max(1,Math.abs(dy))), ax=P.x+dx*sc, ay=P.y+dy*sc, an=Math.atan2(dy,dx), pu=.5+.5*Math.sin(g.t*6);   /* 화면 밖 보물상자 방향 화살표 */
          ctx.save(); ctx.translate(ax,ay); ctx.fillStyle="rgba(42,29,16,.75)"; ctx.beginPath(); ctx.arc(0,0,22,0,7); ctx.fill(); ctx.strokeStyle="#ffd36a"; ctx.lineWidth=3; ctx.stroke(); ctx.font='20px sans-serif'; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText("🎁",0,1);
          ctx.rotate(an); ctx.fillStyle=`rgba(255,211,106,${.7+.3*pu})`; ctx.beginPath(); ctx.moveTo(34+4*pu,0); ctx.lineTo(24,-9); ctx.lineTo(24,9); ctx.fill(); ctx.restore() } continue }
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
      if(e.minOf){ const pu=.5+.5*Math.sin(g.t*7+e.wob), R=e.r*1.35;   /* 보스 부하: 보라 빛 바닥 + 굵은 고리 + 머리 위 보라 표식 */
        ctx.save(); const gr=ctx.createRadialGradient(e.x,e.y+e.r*.5,0,e.x,e.y+e.r*.5,R); gr.addColorStop(0,`rgba(190,120,255,${.45+.15*pu})`); gr.addColorStop(1,"rgba(190,120,255,0)"); ctx.fillStyle=gr; ctx.beginPath(); ctx.ellipse(e.x,e.y+e.r*.5,R,R*.45,0,0,7); ctx.fill();
        ctx.strokeStyle=`rgba(225,180,255,${.75+.25*pu})`; ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(e.x,e.y+e.r*.5,R*.95,R*.42,0,0,7); ctx.stroke();
        const my=e.y-e.r*1.9-4*pu; ctx.fillStyle="#b07aff"; ctx.strokeStyle="#fff"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(e.x-10,my); ctx.lineTo(e.x+10,my); ctx.lineTo(e.x,my+13); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore() }
      if(e.elite){ ctx.strokeStyle=`rgba(246,197,68,${.6+.3*Math.sin(g.t*6)})`; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(e.x,e.y+e.r*.2,e.r*1.4,0,7); ctx.stroke() }
      { const ph=phaseOf(g.t); if(ph&&e.type!=="boss"&&!(ART&&HDOK)){ ctx.fillStyle=`rgba(${PH_AURA[ph]},${.18+.08*Math.sin(g.t*5+e.wob)})`; ctx.beginPath(); ctx.ellipse(e.x,e.y+e.r*.6,e.r*1.25,e.r*.55,0,0,7); ctx.fill() } }
      if(e.type==="boss") HDL.push(e); else if(ART&&HDOK&&mobArtOf(e)) HDM.push(e); else drawMonster(ctx,e,g.t,P.x,P.y);   // 보스는 모두 선명하게
      if(e.elite){ const w=e.r*2; ctx.fillStyle="rgba(0,0,0,.45)"; ctx.fillRect(e.x-w/2,e.y-e.r*1.35,w,4); ctx.fillStyle="#f6c544"; ctx.fillRect(e.x-w/2,e.y-e.r*1.35,w*Math.max(0,e.hp/e.max),4) } }
    const actionLayer=()=>{
    for(const b of g.eshots){ if(b.kind==="shock"){ drawShock(ctx,b,g.t); continue } if(b.kind==="beam"){ drawSigShot(ctx,b,g.t); continue } if(!vis(b)) continue; if(drawSigShot(ctx,b,g.t)) continue;
      if(b.kind==="wave"){ drawWave(ctx,b,g.t); continue }
      if(b.th&&drawThemeShot(ctx,b,g.t)) continue;
      if(b.kind==="rock"){ ctx.save(); ctx.translate(b.x,b.y); ctx.rotate(g.t*8); ctx.fillStyle="#8d86a0"; ctx.beginPath(); ctx.moveTo(-14,-4); ctx.lineTo(-5,-14); ctx.lineTo(10,-11); ctx.lineTo(14,3); ctx.lineTo(4,13); ctx.lineTo(-11,9); ctx.closePath(); ctx.fill(); ctx.strokeStyle="#4d4760"; ctx.lineWidth=2; ctx.stroke(); ctx.restore() }
      else if(b.kind==="orb"){ ctx.globalAlpha=.3; ctx.fillStyle=b.col||"#c08bff"; ctx.beginPath(); ctx.arc(b.x,b.y,b.r+8+Math.sin(g.t*10)*2,0,7); ctx.fill(); ctx.globalAlpha=1; ctx.fillStyle=b.col||"#9a6bff"; ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,7); ctx.fill(); ctx.fillStyle="#f3e8ff"; ctx.beginPath(); ctx.arc(b.x-3,b.y-3,b.r*.4,0,7); ctx.fill() }
      else { ctx.fillStyle=b.kind==="fire"?"rgba(233,71,95,.35)":"rgba(140,200,80,.35)"; ctx.beginPath(); ctx.arc(b.x,b.y,b.r+5,0,7); ctx.fill(); ctx.fillStyle=b.col; ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,7); ctx.fill(); ctx.fillStyle="#fff4b0"; ctx.beginPath(); ctx.arc(b.x-2,b.y-2,b.r*.4,0,7); ctx.fill() } }
    // 발사체
    for(const sh of g.shots){ if(sh.wait>0||!vis(sh)) continue;
      const a=Math.atan2(sh.vy,sh.vx);
      if(sh.k==="wind"&&typeof drawCardWind==="function"&&drawCardWind(ctx,sh,g.t)) continue;
      if(sh.k==="ice"&&typeof drawCardIce==="function"&&drawCardIce(ctx,sh,a,g.t)) continue;
      if(drawNewShot(ctx,sh,a,g.t,GLOW)) continue;
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
        if(typeof drawCardStone==="function"&&drawCardStone(ctx,sx,sy,g.t,i)) continue;
        if(HDFX&&PFX.stone){ pfxDraw(ctx,"stone",sx,sy,g.t*4+i,1); continue }
        ctx.save(); ctx.translate(sx,sy); ctx.rotate(g.t*4+i);
        ctx.fillStyle="#5f5872"; ctx.beginPath(); ctx.moveTo(-15,-3); ctx.lineTo(-8,-15); ctx.lineTo(8,-14); ctx.lineTo(16,-2); ctx.lineTo(10,13); ctx.lineTo(-8,14); ctx.lineTo(-16,5); ctx.closePath(); ctx.fill();
        ctx.fillStyle="#8d86a0"; ctx.beginPath(); ctx.moveTo(-15,-3); ctx.lineTo(-8,-15); ctx.lineTo(8,-14); ctx.lineTo(16,-2); ctx.lineTo(4,2); ctx.lineTo(-10,3); ctx.closePath(); ctx.fill();
        ctx.fillStyle="#c4bfd2"; ctx.beginPath(); ctx.moveTo(-8,-15); ctx.lineTo(8,-14); ctx.lineTo(2,-7); ctx.lineTo(-9,-7); ctx.closePath(); ctx.fill();
        const rg=.6+.4*Math.sin(g.t*6+i); ctx.strokeStyle=`rgba(200,170,255,${rg})`; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(-4,-2); ctx.lineTo(0,6); ctx.lineTo(5,-2); ctx.moveTo(0,6); ctx.lineTo(0,10); ctx.stroke();
        ctx.strokeStyle="#2e2a3e"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(-15,-3); ctx.lineTo(-8,-15); ctx.lineTo(8,-14); ctx.lineTo(16,-2); ctx.lineTo(10,13); ctx.lineTo(-8,14); ctx.lineTo(-16,5); ctx.closePath(); ctx.stroke(); ctx.restore() } }
    // 효과
    // 보스 경고 범위는 내 스킬 이펙트(메테오·폭발 등) 위에 그려서 항상 또렷하게 보여요
    const WK=drawFx.WK||(drawFx.WK={warn:1,laserwarn:1,conewarn:1,donutwarn:1,tilewarn:1,cloudwarn:1}), FXO=drawFx.O||(drawFx.O=[]); FXO.length=0;
    for(const f of g.fx) if(!(WK[f.k]&&!f.own)) FXO.push(f); for(const f of g.fx) if(WK[f.k]&&!f.own) FXO.push(f);
    for(const f of FXO){ const k=f.life/f.max; if(TXTK[f.k]) continue; if(drawSkillFx(f,k)) continue;
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
      else if(f.k==="crit"){ if(!window.__fxLow&&typeof drawBurst==="function") drawBurst(ctx,f.x,f.y+6,"hw",44+(1-k)*40,k*.8,(1-k)*.6); ctx.globalAlpha=k; ctx.fillStyle="#c8372d"; ctx.font='900 16px "Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.fillText("급소!",f.x,f.y-(1-k)*16); ctx.globalAlpha=1 }
      else if(f.k==="muzzle"){ ctx.fillStyle="#ffe066"; ctx.beginPath(); ctx.arc(f.x,f.y,7,0,7); ctx.fill() }
      else if(f.k==="num"){ const q=1-k, y=f.y-q*28, sc=f.big?2.1:f.crit?1.35:1; ctx.globalAlpha=Math.min(1,k*2.2);
        ctx.font=`${Math.round((f.me?20:f.dot?13:16)*sc)}px "Black Han Sans","Do Hyeon",sans-serif`; ctx.textAlign="center"; ctx.textBaseline="middle";
        const txt=f.me?(f.v<0?String(f.v):"+"+f.v):String(f.v); ctx.lineWidth=4; ctx.strokeStyle="#25211b"; ctx.strokeText(txt,f.x,y);
        ctx.fillStyle=f.me?(f.v<0?"#ff5a6a":"#3fcf8e"):f.big?"#ffb020":f.crit?"#ffd23a":f.dot?"#c8a6ff":"#ffffff"; ctx.fillText(txt,f.x,y); ctx.globalAlpha=1 }
      else if(f.k==="dust"){ ctx.fillStyle=`rgba(200,185,160,${k*.6})`; const q=1-k; ctx.beginPath(); ctx.arc(f.x-6-q*6,f.y-q*5,4+q*4,0,7); ctx.arc(f.x+6+q*6,f.y-q*5,3+q*4,0,7); ctx.fill() }
      else if(f.k==="bosscast"&&!f.sp){ const y=f.y-(1-k)*10; ctx.globalAlpha=Math.min(1,k*3); ctx.font='22px "Black Han Sans","Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.textBaseline="middle";
        ctx.lineWidth=6; ctx.strokeStyle="#2a0a10"; ctx.strokeText(f.text,f.x,y); ctx.fillStyle="#ff5a6a"; ctx.fillText(f.text,f.x,y); ctx.globalAlpha=1 }
      else if(f.k==="ragewave"){ ctx.strokeStyle=`rgba(233,71,95,${k})`; ctx.lineWidth=10*k+2; ctx.beginPath(); ctx.arc(f.x,f.y,f.r*(1-k)+20,0,7); ctx.stroke() }
      else if(f.k==="laserwarn"&&typeof warnTex==="function"&&warnTex("warnlaser",dangerCol())){ const T=warnTex("warnlaser",dangerCol()); ctx.save(); const HW=f.w||26; ctx.translate(f.x,f.y); ctx.rotate(f.a); ctx.fillStyle=`rgba(233,40,60,${.08+.2*(1-k)})`; ctx.fillRect(0,-HW,f.len,HW*2);
        ctx.fillStyle="rgba(255,80,80,.22)"; ctx.fillRect(0,-HW,f.len*Math.min(1,1-k),HW*2); ctx.globalCompositeOperation="lighter"; ctx.globalAlpha=Math.min(1,(1-k)*5)*(.8+.2*Math.sin(g.t*16)); ctx.drawImage(T,-8,-HW-12,f.len+16,HW*2+24); ctx.globalCompositeOperation="source-over"; ctx.globalAlpha=1; ctx.strokeStyle=`rgba(255,255,255,${.5+.4*Math.sin(g.t*16+Math.PI)})`; ctx.lineWidth=1.6; ctx.setLineDash([12,8]); ctx.lineDashOffset=-g.t*50; ctx.strokeRect(0,-HW,f.len,HW*2); ctx.restore() }
      else if(f.k==="laserwarn"){ ctx.save(); const HW=f.w||26; ctx.translate(f.x,f.y); ctx.rotate(f.a); ctx.fillStyle=`rgba(233,71,95,${.12+.25*(1-k)})`; ctx.fillRect(0,-HW,f.len,HW*2);
        ctx.strokeStyle="rgba(233,71,95,.8)"; ctx.setLineDash([10,8]); ctx.lineWidth=2; ctx.strokeRect(0,-HW,f.len,HW*2); ctx.setLineDash([]); ctx.restore() }
      else if(f.k==="laser"){ ctx.save(); ctx.translate(f.x,f.y); ctx.rotate(f.a);
        if(MAP.id===9&&typeof drawBoltStrand==="function"){ ctx.fillStyle=`rgba(255,240,150,${k*.35})`; ctx.fillRect(0,-30,f.len,60); drawBoltStrand(ctx,f.len,120,k*1.4) }   // 번개 맵: 천둥 광선도 번개 그림으로
        else { ctx.fillStyle=`rgba(192,139,255,${k*.7})`; ctx.fillRect(0,-30,f.len,60); ctx.fillStyle=`rgba(255,255,255,${k})`; ctx.fillRect(0,-10,f.len,20) } ctx.restore() }
      else if(f.k==="spark"){ ctx.strokeStyle=`rgba(255,255,255,${k})`; ctx.lineWidth=3; for(let i=0;i<4;i++){ const a=f.a+i*1.57, r0=6*(1-k), r1=14*(1.2-k); ctx.beginPath(); ctx.moveTo(f.x+Math.cos(a)*r0,f.y+Math.sin(a)*r0); ctx.lineTo(f.x+Math.cos(a)*r1,f.y+Math.sin(a)*r1); ctx.stroke() } }
      else if(f.k==="poof"){ const q=1-k; ctx.globalAlpha=k; for(let i=0;i<7;i++){ const a=f.seed+i*.9, d=f.r*(.3+q*1.4);
          ctx.fillStyle=i%2?"#ffffff":"rgba(220,220,230,1)"; ctx.beginPath(); ctx.arc(f.x+Math.cos(a)*d,f.y+Math.sin(a)*d-q*10,f.r*.35*(1-q*.5),0,7); ctx.fill() }
        ctx.fillStyle="#ffe066"; for(let i=0;i<5;i++){ const a=f.seed*2+i*1.25, d=f.r*(.5+q*2); ctx.fillRect(f.x+Math.cos(a)*d-2,f.y+Math.sin(a)*d-2,4,4) } ctx.globalAlpha=1 }
      else if(f.k==="hit"){ ctx.fillStyle=`rgba(200,55,45,${k*.35})`; ctx.beginPath(); ctx.arc(f.x,f.y,30,0,7); ctx.fill() } }
    if(NM) drawRemotes();
    // 주인공
    if(P.dead){ ctx.save(); ctx.translate(P.x,P.y+20); ctx.rotate(Math.PI/2); ctx.globalAlpha=.6; ctx.filter="grayscale(1)"; if(heroImg.complete&&heroImg.naturalWidth) ctx.drawImage(heroImg,-32,-62,64,64); ctx.restore(); ctx.filter="none";
      ctx.strokeStyle="rgba(255,240,150,.8)"; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(P.x,P.y+8,80,-Math.PI/2,-Math.PI/2+Math.PI*2*Math.min(1,(g.rescue||0)/RESCUE)); ctx.stroke() }
    else {
      const mv=Math.min(1,(P.mv||0)), ph=g.walk||0;
      const hop=Math.abs(Math.sin(ph))*7*mv, sq=1+(Math.cos(ph*2)*.07)*mv, br=1+Math.sin(g.t*3)*.025*(1-mv);
      const tilt=(P.vx||0)/s.spd*.12;
      const shS=Math.max(.3,1-hop/22);
      if(RUNES.length) drawRunes(P.x,P.y,g.t);
      if(HSt.tier>=5) drawAwaken(P.x,P.y,g.t,mv,g,HERO.id);
      if(HSt.tier>0){ const tc=TIER_COLOR[HSt.tier], pu=.55+.45*Math.sin(g.t*3); ctx.save(); ctx.globalCompositeOperation=GLOW;
        const ag=ctx.createRadialGradient(P.x,P.y+18,2,P.x,P.y+18,34+HSt.tier*4); ag.addColorStop(0,tc+"aa"); ag.addColorStop(1,tc+"00"); ctx.globalAlpha=.55*pu; ctx.fillStyle=ag; ctx.beginPath(); ctx.ellipse(P.x,P.y+18,34+HSt.tier*4,12+HSt.tier*1.5,0,0,7); ctx.fill();
        if(HSt.tier>=3){ for(let i=0;i<(HSt.tier>=5?12:HSt.tier===4?8:5);i++){ const ph=(g.t*.7+i/7)%1, a=i*2.4; ctx.globalAlpha=1-ph; ctx.fillStyle=tc; ctx.fillRect(P.x+Math.cos(a)*18-1.5,P.y+14-ph*46-1.5,3,3) } }
        ctx.restore() }
      if(TOP&&TOP.id===NET.myId&&!P.dead) drawTopAura(P.x,P.y);
      ctx.fillStyle="rgba(20,16,30,.16)"; ctx.beginPath(); ctx.ellipse(P.x,P.y+20,23*shS,7.5*shS,0,0,7); ctx.fill(); ctx.fillStyle="rgba(20,16,30,.28)"; ctx.beginPath(); ctx.ellipse(P.x,P.y+20,13*shS,4*shS,0,0,7); ctx.fill();
      const AK=HERO.main.kind, AD={sword:.24,arrow:.32,star:.22,gun:.16,fireball:.4,moon:.32,brush:.3,charm:.22,punch:.22}[AK], at=g.atk?g.t-g.atk.t:9, aq=at<AD?at/AD:-1, aa=g.atk?g.atk.a:0;
      let lx=0, ly=0, face=P.face||1;
      if(aq>=0){ face=Math.cos(aa)>=0?1:-1;
        const push=AK==="sword"?Math.sin(aq*Math.PI)*10:AK==="gun"?-Math.max(0,1-aq*3)*6:AK==="star"?Math.sin(aq*Math.PI)*6:AK==="arrow"?(aq<.45?-aq*6:-2.7*(1-aq)):AK==="brush"?Math.sin(aq*Math.PI)*9:AK==="punch"?(aq<.3?-aq*10:Math.sin((aq-.3)/.7*Math.PI)*14):AK==="charm"?Math.sin(aq*Math.PI)*6:AK==="moon"?Math.sin(aq*Math.PI)*4:0;
        lx=Math.cos(aa)*push; ly=Math.sin(aa)*push*.6 }
      if(aq>=0 && AK==="fireball") drawAtkUnder(P.x,P.y,aq,aa);
      if(heroImg.complete && heroImg.naturalWidth){
        if(isHeroArt(heroImg.src)){ const rs=g.hrs||(g.hrs={}); rs.dt=g.t-(rs.t??g.t); rs.t=g.t; rs.mv=mv; rs.ph=ph; rs.kind=AK; rs.aq=aq; rs.at=at; rs.hk=HSt.tier>=5?(typeof SKILL_IMG!=="undefined"&&SKILL_IMG["hatk5_"+HERO.id]?"hatk5_"+HERO.id:null):HSt.tier>=4?"hatk_"+HERO.id:null; rs.at=at; rs.hk=HSt.tier>=5?(typeof SKILL_IMG!=="undefined"&&SKILL_IMG["hatk5_"+HERO.id]?"hatk5_"+HERO.id:null):HSt.tier>=4?"hatk_"+HERO.id:null; rs.fs=rs.fs??face; rs.fs+=(face-rs.fs)*Math.min(1,(rs.dt||0)*16); const turn=Math.sign(rs.fs||face)*Math.max(.18,Math.abs(rs.fs)); HERO_HD={x:P.x+lx*.5,y:P.y+20-hop*.45+ly*.5,rot:tilt*.6,sx:(rs.hk&&at<.44&&typeof SKILL_IMG!=="undefined"&&SKILL_IMG[rs.hk]?Math.sign(turn):turn)*br,sy:br*(1+(sq-1)*.4)*(1+(1-Math.abs(turn))*.03),rs} }
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
    for(const f of g.fx) if(f.k==="flash"){ ctx.globalAlpha=(f.life/f.max)*.5*(g.t<(g.calmUntil||0)?.4:1); ctx.fillStyle=f.col||"#fff"; ctx.fillRect(0,0,W,H); ctx.globalAlpha=1 }
    // 도트 화면을 크게 키워서 붙이고, 글자는 선명하게 따로 그려요
    ctx=MAINCTX; ctx.setTransform(dpr,0,0,dpr,0,0); ctx.imageSmoothingEnabled=false;
    let ARTP=null;
    if(ART){ // 바닥 → (장애물·몬스터를 앞뒤 순서대로) → 그 위에 도트 화면
      ctx.imageSmoothingEnabled=true; if(!(BX&&BX.floor(ctx,ox,oy,W,H))&&!drawFloorHD(ctx,MAP,ox,oy,W,H,g.t)) drawMapBG(ctx,MAP,P.x,P.y,W,H,g.t);
      { const ph=VPH, tint=PH_TINT[MAP.id][phV(ph)]; if(tint){ const k=Math.min(1,(g.t-VPH_T)/3), [r,gg,b,a]=tint.split(","); ctx.fillStyle=`rgba(${r},${gg},${b},${(+a)*Math.max(.15,k)})`; ctx.fillRect(0,0,W,H) } }   // 바닥만 어둡게 (몬스터는 또렷하게)
      ctx.save(); ctx.translate(ox,oy); ARTP=artPropsVisible(MAP,P.x,P.y,W,H);
      const L=ARTP.map(o=>[o.flat?o.ay-1e6:o.ay,0,o]); for(const e of HDM) L.push([e.y+e.r*.95,1,e]); L.sort((a,b)=>a[0]-b[0]);
      for(const it of L){ if(it[1]) drawMobArt(ctx,it[2],g.t,P.x,P.y); else drawArtProp(ctx,it[2],g.t,false) }
      if(BX) BX.drawGround(ctx);
      ctx.restore(); ctx.imageSmoothingEnabled=false }
    if(low.width&&low.height) ctx.drawImage(low,0,0,low.width*PX,low.height*PX);
    ctx.save(); ctx.translate(ox,oy);
    if(ARTP){ ctx.imageSmoothingEnabled=true;   // 나무 뒤에 숨으면 나뭇잎이 살짝 비쳐 보이게 덮어요
      for(const o of ARTP){ if(o.pt!=="tree") continue; const im=PROP_IMG[o.pk]; if(!im) continue; const w=o.h*im.width/im.height;
        if(P.y<o.ay-6&&P.y>o.ay-o.h*.95&&Math.abs(P.x-o.ax)<w*.42){ ctx.globalAlpha=.55; drawArtProp(ctx,o,g.t,true); ctx.globalAlpha=1 } } }
    for(const e of HDL){ ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality="high"; if(e.b11&&BX){ BX.drawBoss(ctx,e); continue } const fy=e.y+e.r*.6; ctx.save(); ctx.translate(e.x,fy); ctx.scale(BOSS_VIS,BOSS_VIS); ctx.translate(-e.x,-fy); drawMonster(ctx,e,g.t,P.x,P.y); ctx.restore() }   /* 보스는 그림을 30% 크게 */
    if(BX){ ctx.imageSmoothingEnabled=true; BX.drawOver(ctx); BX.drawMyGauge(ctx) }
    if(HDFX){ ctx.imageSmoothingEnabled=true; actionLayer() }
    ctx.imageSmoothingEnabled=true;
    for(const q of REMOTE_HD){ ctx.save(); ctx.setTransform(1,0,0,1,0,0); const T=q.T; ctx.setTransform(T.a*PX*dpr,T.b*PX*dpr,T.c*PX*dpr,T.d*PX*dpr,T.e*PX*dpr,T.f*PX*dpr); const rs=q.r.hrs||(q.r.hrs={}); rs.dt=g.t-(rs.t??g.t); rs.t=g.t; rs.mv=q.mv; rs.ph=g.t*14; rs.aq=-1; drawHeroRig(ctx,q.r.img,HSZ,rs); ctx.restore() }
    // 무적일 때: 금빛 보호막 (육각 무늬가 빙글 돌며 반짝여요)
    if(g.p.inv>.25&&!g.p.dead){ const P=g.p, r=46, pul=1+Math.sin(g.t*6)*.04, al=Math.min(1,g.p.inv*2); ctx.save(); ctx.translate(P.x,P.y-24); ctx.scale(pul,pul*1.05);
      const gr=ctx.createRadialGradient(0,0,r*.55,0,0,r); gr.addColorStop(0,"rgba(255,230,140,0)"); gr.addColorStop(.8,`rgba(255,215,110,${.18*al})`); gr.addColorStop(1,`rgba(255,245,200,${.45*al})`); ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(0,0,r,0,7); ctx.fill();
      ctx.globalCompositeOperation=GLOW; ctx.strokeStyle=`rgba(255,235,160,${.75*al})`; ctx.lineWidth=2.2; ctx.beginPath(); ctx.arc(0,0,r,0,7); ctx.stroke();
      ctx.rotate(g.t*.8); ctx.strokeStyle=`rgba(255,250,215,${.45*al})`; ctx.lineWidth=1.2; for(let i=0;i<6;i++){ const a=i*Math.PI/3, x=Math.cos(a)*r*.62, y=Math.sin(a)*r*.62; ctx.beginPath(); for(let j=0;j<=6;j++){ const b=j*Math.PI/3; const px=x+Math.cos(b)*r*.22, py=y+Math.sin(b)*r*.22; j?ctx.lineTo(px,py):ctx.moveTo(px,py) } ctx.stroke() }
      const sw=(g.t*1.3)%1; ctx.rotate(-g.t*.8); ctx.strokeStyle=`rgba(255,255,255,${.8*al*(1-sw)})`; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(0,0,r*.98,-2.4+sw*6.28,-1.9+sw*6.28); ctx.stroke(); ctx.restore() }
    if(HERO_HD){ const q=HERO_HD; ctx.save(); ctx.translate(q.x,q.y); ctx.rotate(q.rot); ctx.scale(q.sx,q.sy); drawHeroRig(ctx,heroImg,HSZ,q.rs); ctx.restore() }   // 최종 보스는 선명하게
    for(const e of g.en){ if(e.elite && e.hp>0 && vis(e)){ ctx.font='13px "Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.textBaseline="alphabetic"; ctx.lineWidth=3; ctx.strokeStyle="#25211b"; ctx.strokeText("정예",e.x,e.y-e.r*1.5); ctx.fillStyle="#f6c544"; ctx.fillText("정예",e.x,e.y-e.r*1.5) } }
    if(NM) drawRemoteNames();
    if(TOP&&TOP.id===NET.myId&&!g.p.dead) drawTopCrown(g.p.x,g.p.y);
    if(!g.p.dead&&g.livePow){ const tx="⚔ "+fmtPow(g.livePow), y=g.p.y-(TOP&&NM&&TOP.id===NET.myId?92:70), up=g.t-(g.powUpT||-9)<1;   /* 내 머리 위 전투력 */
      ctx.save(); ctx.font='bold 17px "Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.textBaseline="alphabetic"; const w=ctx.measureText(tx).width+16;
      ctx.fillStyle=up?"rgba(31,122,74,.9)":"rgba(138,31,42,.85)"; ctx.beginPath(); ctx.roundRect?ctx.roundRect(g.p.x-w/2,y-17,w,22,11):ctx.rect(g.p.x-w/2,y-17,w,22); ctx.fill(); ctx.strokeStyle="#ffd36a"; ctx.lineWidth=1.5; ctx.stroke();
      ctx.fillStyle="#ffe9a0"; ctx.fillText(tx,g.p.x,y); ctx.restore(); if(HSt.tier>=5) drawAwkTag(g.p.x,y-28) }
    if(g.stream&&typeof jfHurricaneBow==="function"&&HERO.id==="archer") jfHurricaneBow(ctx,g.p,g.t,Math.min(1,g.stream.t/.3),g.stream.va||0);
    for(const f of g.fx){ if(!TXTK[f.k]) continue; const k=f.life/f.max;
      if(f.k==="label"){ ctx.globalAlpha=Math.min(1,k*2); ctx.font='22px "Black Han Sans","Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.textBaseline="alphabetic"; ctx.lineWidth=5; ctx.strokeStyle="#25211b"; ctx.strokeText(f.text,f.x,f.y-(1-k)*20); ctx.fillStyle="#f6c544"; ctx.fillText(f.text,f.x,f.y-(1-k)*20); ctx.globalAlpha=1 }
      else if(f.k==="crit"){ if(!window.__fxLow&&typeof drawBurst==="function") drawBurst(ctx,f.x,f.y+6,"hw",44+(1-k)*40,k*.8,(1-k)*.6); ctx.globalAlpha=k; ctx.fillStyle="#c8372d"; ctx.font='900 16px "Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.textBaseline="alphabetic"; ctx.fillText("급소!",f.x,f.y-(1-k)*16); ctx.globalAlpha=1 }
      else if(f.k==="num"){ const q=1-k, y=f.y-q*28, sc=f.big?2.1:f.crit?1.35:1; ctx.globalAlpha=Math.min(1,k*2.2);
        ctx.font=`${Math.round((f.me?20:f.dot?13:16)*sc)}px "Black Han Sans","Do Hyeon",sans-serif`; ctx.textAlign="center"; ctx.textBaseline="middle";
        const txt=f.me?(f.v<0?String(f.v):"+"+f.v):String(f.v); ctx.lineWidth=4; ctx.strokeStyle="#25211b"; ctx.strokeText(txt,f.x,y);
        ctx.fillStyle=f.me?(f.v<0?"#ff5a6a":"#3fcf8e"):f.big?"#ffb020":f.crit?"#ffd23a":f.dot?"#c8a6ff":"#ffffff"; ctx.fillText(txt,f.x,y); ctx.globalAlpha=1 }
      else if(f.k==="bosscast"&&!f.sp){ const y=f.y-(1-k)*10; ctx.globalAlpha=Math.min(1,k*3); ctx.font='22px "Black Han Sans","Do Hyeon",sans-serif'; ctx.textAlign="center"; ctx.textBaseline="middle";
        ctx.lineWidth=6; ctx.strokeStyle="#2a0a10"; ctx.strokeText(f.text,f.x,y); ctx.fillStyle="#ff5a6a"; ctx.fillText(f.text,f.x,y); ctx.globalAlpha=1 } }
    ctx.restore();
    if(VPH>0&&typeof drawWeather==="function") drawWeather(ctx,MAP,VPH,g.t,W,H,P.x,P.y,Math.min(1,(g.t-VPH_T)/3));
    for(const f of g.fx) if(f.k==="cutin5") drawCut5(f,f.life/f.max);   /* 5차 컷인: 선명한 화면 맨 위 */
    for(const f of g.fx) if(f.k==="cutin"||f.k==="cutin5") jfCutinText(ctx,f,W,H);
    if(BX) BX.ambience(ctx,W,H);
    { const bs=g.en.filter(e=>e.type==="boss"&&e.hp>0); let y=148;
      bs.forEach(b=>{ const w=Math.min(560,W-32), x=(W-w)/2, pct=Math.max(0,b.hp/b.max), BT=(BOSSES[b.bid]||{}), fin=BT.tier===3, tn=(BT.tn||(STAGE_TIER[BT.tier]||{}).tn||"보스");   // 보스 이름·체력: 크고 또렷하게
        b._lag=b._lag===undefined?pct:Math.max(pct,b._lag-(b._lag-pct)*.04-.001);
        ctx.fillStyle="rgba(12,6,16,.82)"; ctx.beginPath(); ctx.roundRect(x-8,y-6,w+16,48,10); ctx.fill(); ctx.strokeStyle=fin?"#ffd36a":b.enraged?"#ff5a5a":"rgba(255,255,255,.35)"; ctx.lineWidth=2; ctx.stroke();
        ctx.textBaseline="alphabetic"; ctx.textAlign="left"; ctx.font='13px "Do Hyeon",sans-serif'; ctx.fillStyle=fin?"#ffd36a":"#ffb0b0"; ctx.fillText((fin?"👑 ":"")+tn,x,y+12);
        ctx.textAlign="center"; ctx.font='22px "Black Han Sans","Do Hyeon",sans-serif'; ctx.lineWidth=4; ctx.strokeStyle="rgba(0,0,0,.85)"; ctx.strokeText(b.name,W/2,y+14); ctx.fillStyle="#fff2b0"; ctx.fillText(b.name,W/2,y+14);
        ctx.textAlign="right"; ctx.font='14px "Do Hyeon",sans-serif'; ctx.fillStyle="#fff"; ctx.fillText(Math.ceil(pct*100)+"%",x+w,y+12);
        ctx.fillStyle="#2a1018"; ctx.fillRect(x,y+20,w,16); ctx.fillStyle="rgba(255,255,255,.55)"; ctx.fillRect(x,y+20,w*b._lag,16);
        const hg=ctx.createLinearGradient(0,y+20,0,y+36); hg.addColorStop(0,b.enraged?"#ff6a4a":"#ff6a85"); hg.addColorStop(1,b.enraged?"#a0200a":"#b0183a"); ctx.fillStyle=hg; ctx.fillRect(x,y+20,w*pct,16);
        ctx.fillStyle="rgba(255,255,255,.25)"; ctx.fillRect(x,y+20,w*pct,4); ctx.strokeStyle="rgba(0,0,0,.6)"; ctx.lineWidth=1; for(let i=1;i<10;i++){ ctx.beginPath(); ctx.moveTo(x+w*i/10,y+20); ctx.lineTo(x+w*i/10,y+36); ctx.stroke() }
        y+=56 });
      if(BX) BX.drawHUD(ctx,W,H,y);
      // 보스가 지금 쓰는 기술: 체력바 바로 아래에 크게 (특수 기술은 빨갛게 깜빡)
      { const C=g.castBan; if(C&&bs.length&&g.t-C.t<1.8){ const q=(g.t-C.t)/1.8, al=Math.min(1,(1-q)*4,(g.t-C.t)*8), txt=`${C.ult?"💢 필살기":C.sp?"⚠ 특수 기술":"⚔"} 「${C.name}」`;
        ctx.save(); ctx.globalAlpha=al; ctx.font='24px "Black Han Sans","Do Hyeon",sans-serif'; const tw=ctx.measureText(txt).width+44, bx=W/2-tw/2, by=y-2, pul=C.sp?(.6+.4*Math.sin(g.t*14)):0;
          ctx.fillStyle=C.ult?"rgba(120,10,30,.9)":C.sp?"rgba(90,14,24,.88)":"rgba(20,12,30,.85)"; ctx.beginPath(); ctx.roundRect(bx,by,tw,40,20); ctx.fill();
          ctx.lineWidth=3; ctx.strokeStyle=C.sp?`rgba(255,${80+80*pul|0},90,1)`:"rgba(255,230,160,.8)"; ctx.stroke();
          ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.lineWidth=4; ctx.strokeStyle="rgba(0,0,0,.8)"; ctx.strokeText(txt,W/2,by+21); ctx.fillStyle=C.sp?"#ffe0e0":"#fff4c8"; ctx.fillText(txt,W/2,by+21); ctx.restore() } }
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
      { const sk0=Object.values(g.sk).reduce((a,v)=>a+v,0), s0=g.s0||(g.s0={dmg:s.dmg,cd:s.cd,hp:s.maxHp,sk:sk0}), skl=sk0-s0.sk, jls=Object.values(g.jl||{}).reduce((a,v)=>a+v,0);   /* 입장 때 전투력에서 시작해 판 안에서 오르내려요 */
        const lp=Math.round(g.pow0*((s.dmg*(g.buff?g.buff.mul:1)*(g.bbuff?g.bbuff.dmg:1)/s0.dmg)*(s0.cd/s.cd)*(s.maxHp/s0.hp)/(1+CONF_V*(g.conf||0)))*Math.pow(1+.04*skl+.05*jls,2)); g.livePow=lp;
        const pe=$(".gs.pow b"); if(pe&&pe.textContent!==fmtPow(lp)){ const prev=g.lpPrev||lp, dd=lp-prev; pe.textContent=fmtPow(lp); g.lpPrev=lp; if(Math.abs(dd)>=Math.max(10,lp*.002)&&g.t>1){ if(dd>0) g.powUpT=g.t; g.fx.push({k:"label",x:P.x,y:P.y-100,text:(dd>0?"⚔ +":"⚔ ")+fmtPow(dd),life:1.1,max:1.1}); const el=$(".gs.pow"); el.classList.remove("pup","pdn"); void el.offsetWidth; el.classList.add(dd>0?"pup":"pdn") } } }
      const key=Object.entries(g.sk).map(([k,v])=>k+v).join(",");
      if(key!==g.sklKey){ g.sklKey=key; $(".gskl").innerHTML=Object.keys(g.sk).map(k=>`<span>${skImg(k,22)}<b>${g.sk[k]}</b></span>`).join("") } }
    $(".glv").textContent="Lv "+g.lvl; { const sn=Math.min(4,g.stageN), nx=Math.max(0,Math.ceil(g.nextBossT-g.t)); $(".gtime").textContent=`${fmtT(g.t)} · ${starStr(sn)} · ${sn>=4?"클리어!":g.bossUp?((STAGE_TIER[sn]||{tn:"최종 보스"}).tn)+" 전투!":`다음 보스 ${nx}초`}` } $(".gk").textContent="몬스터 "+g.kills;
  }

  let last=performance.now(), raf=0;
  function loop(now){
    const dt=Math.min(.05,(now-last)/1000)*(window.__ts||1); last=now; if(!g.over&&!g.paused) perfTick((now-(loop.p||now))/1000||dt); loop.p=now;
    raf=requestAnimationFrame(loop);   // 그리다 오류가 나도 게임이 멈추지 않게 먼저 다음 프레임을 예약해요
    try{
    if(g.hitstop>0){ g.hitstop-=dt }
    if(!g.over && (!g.paused || NM) && !(NM==="host" && (allChoosing()||g.lvR))) update(g.hitstop>0?dt*.06:dt);   /* 5차 궁극기가 터지는 순간 아주 잠깐 멈춰요 */
    if(NM && !g.over) netTick(dt);
    draw();
    }catch(err){ if(!loop.errN||loop.errN<3){ loop.errN=(loop.errN||0)+1; console.error(err) } try{ ctx.setTransform(1,0,0,1,0,0); ctx.globalAlpha=1; ctx.globalCompositeOperation="source-over"; ctx.filter="none" }catch(e){} }
  }

  raf=requestAnimationFrame(loop);
  showBanner(`${MAP.name} · ${dN(MAP.dif,MAP.id)} · 경험치 ×${(+MAP.exp).toFixed(1)} · 화면을 끌어서 움직여요`); sfx("start"); SND.bgm("m"+MAP.id);
}
