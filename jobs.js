/* ===== 용사 성장: 레벨, 능력치, 전직 ===== */
const MAX_LV = 100;
const JOB_LV = [10, 30, 60, 100];           // 1차~4차 전직 레벨
const TIER_NAME = ["견습", "1차 전직", "2차 전직", "3차 전직", "4차 전직"];
const TIER_COLOR = ["#a79fcb", "#3fcf8e", "#63b0ff", "#c08bff", "#f6c544"];
const STAT = { hp:4, atk:0.02, spd:0.007, spdMax:40 }; // 포인트 1개당: 체력 +4, 공격 +2%, 속도 +0.7% (속도는 40포인트까지)
const expNeed = lv => Math.round((3 + lv + Math.floor(lv*lv/100)) * (1 + lv/25)); // 레벨이 높을수록 훨씬 더 많이 필요해요 (Lv10까지 약 90, Lv30까지 약 1100, Lv60까지 약 6800, Lv100까지 약 31000)

/* 스킬 type: passive(능력 보너스, flag로 특수 효과) / multislash / quake / awaken / summon / zone / stream / marks / flare / meteors / turret / battleship
   (히어로·보우마스터·나이트로드·불독·캡틴의 전투 느낌을 참고해 만든 우리 앱만의 스킬이에요) */
const JOBS = {
  warrior: { titles:["견습 전사","바위 검사","바위 기사","바위 성기사","대지의 영웅"], skills:[
    {name:"분노의 콤보", desc:"공격력 +15% · 대검으로 벨 때마다 콤보 구슬이 모여요 (최대 5개, 구슬 1개마다 공격력 +6%)", type:"passive", p:{dmg:1.15}, flag:"combo"},
    {name:"광폭 연속 베기", desc:"5초마다 대검을 세 번 연달아 크게 휘둘러 주변을 쓸어버려요", type:"multislash", cd:5, hits:3, r:150, dmg:55, gap:0.15},
    {name:"대지 내려찍기", desc:"9초마다 땅을 내려찍어 주변 몬스터를 날려 버리고 1.5초 동안 기절시켜요", type:"quake", cd:9, r:230, dmg:120, stun:1.5},
    {name:"영웅의 각성", desc:"18초마다 황금빛으로 각성해 5초 동안 무적 · 공격력 2배가 되고, 화면 전체를 베어요", type:"awaken", cd:18, dur:5, mul:2, dmg:200},
  ]},
  archer: { titles:["견습 궁수","바람 사냥꾼","바람 저격수","폭풍 명사수","바람의 신궁"], skills:[
    {name:"마법 화살통", desc:"화살이 1마리 더 꿰뚫고, 세 번째 화살마다 펑 터지는 폭발 화살이 나가요", type:"passive", p:{pierce:1}, flag:"quiver"},
    {name:"불사조 소환", desc:"불사조가 곁을 날아다니며 1초마다 몬스터에게 불꽃을 쏴요", type:"summon", what:"phoenix", dmg:35},
    {name:"화살비", desc:"8초마다 몬스터 무리 위에 3초 동안 화살비를 퍼부어요", type:"zone", what:"rain", cd:8, r:130, dur:3, tick:0.2, dmg:22},
    {name:"폭풍 연사", desc:"13초마다 4초 동안 눈으로 따라갈 수 없을 만큼 빠르게 화살을 쏟아내요", type:"stream", cd:13, dur:4, rate:0.05, dmg:30},
  ]},
  thief: { titles:["견습 도적","쇠별 자객","쇠별 암살자","그림자 닌자","금빛 표창왕"], skills:[
    {name:"행운의 일곱 별", desc:"표창을 1개 더 던지고 · 급소 확률 +10%", type:"passive", p:{crit:0.1}, flag:"lucky"},
    {name:"그림자 분신", desc:"그림자 분신이 따라다니며 내가 던지는 표창을 똑같이 따라 던져요", type:"summon", what:"clone"},
    {name:"암살 표식", desc:"7초마다 몬스터 6마리에 표식을 새기고, 잠시 뒤 표식이 터지며 표창이 사방으로 튀어요", type:"marks", cd:7, n:6, delay:1.2, dmg:40},
    {name:"어둠의 표창 소용돌이", desc:"12초마다 6초 동안 사방으로 표창을 뿜어내는 어둠의 소용돌이를 만들어요", type:"flare", cd:12, dur:6, rate:0.12, dmg:30},
  ]},
  mage: { titles:["견습 마법사","불꽃 술사","독불꽃 마도사","화염 대마도사","불꽃의 현자"], skills:[
    {name:"독불꽃", desc:"내 공격에 맞은 몬스터는 3초 동안 보랏빛 독불꽃에 계속 타요", type:"passive", p:{}, flag:"poison"},
    {name:"독 안개", desc:"7초마다 몬스터 무리에 5초 동안 독 안개를 퍼뜨려 느리게 하고 계속 피해를 줘요", type:"zone", what:"mist", cd:7, r:140, dur:5, tick:0.4, dmg:26, slow:true},
    {name:"이프리트 소환", desc:"뿔 달린 불의 정령 이프리트가 곁을 따라다니며 가까운 몬스터에게 불꽃 숨결과 화염탄을 뿜어요", type:"summon", what:"ifrit", dmg:34},
    {name:"메테오 샤워", desc:"14초마다 하늘에서 거대한 운석 10개가 차례로 떨어져요", type:"meteors", cd:14, n:10, r:120, dmg:260, gap:0.18},
  ]},
  pirate: { titles:["견습 해적","바다 총잡이","바다 무법자","대해적","바다의 제왕"], skills:[
    {name:"더블 샷", desc:"총알을 두 발씩 쏘고 · 공격력 +15%", type:"passive", p:{dmg:1.15}, flag:"double"},
    {name:"문어 포탑", desc:"9초마다 문어 포탑을 내려놓아요. 포탑이 7초 동안 몬스터를 쏴요", type:"turret", cd:9, dur:7, rate:0.3, dmg:24},
    {name:"선원 소환", desc:"총을 든 선원 두 명이 따라다니며 함께 싸워요", type:"summon", what:"crew", dmg:18},
    {name:"전함 포격", desc:"15초마다 차원문을 열고 강철 전함이 화면을 가르며 돌진해 와요. 지나가는 길의 몬스터를 들이받고 대포알 14발을 퍼부어요", type:"battleship", cd:15, n:14, r:100, dmg:200},
  ]},
};
