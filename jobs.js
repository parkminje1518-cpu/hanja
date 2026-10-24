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
    {name:"바위 피부", desc:"받는 피해 -12% · 최대 체력 +40 · 몬스터가 부딪히면 가시처럼 큰 피해를 되돌려줘요 · 벨 때마다 콤보 구슬이 모여 공격력이 올라요 (최대 5개)", type:"passive", p:{armor:0.88, hp:40}, flag:"combo", flag2:"thorn"},
    {name:"광폭 연속 베기", desc:"4.5초마다 대검을 세 번 연달아 크게 휘둘러 주변을 쓸어버려요", type:"multislash", cd:4.5, hits:3, r:135, dmg:120, gap:0.15},
    {name:"대지 내려찍기", desc:"9초마다 땅을 내려찍어 주변 몬스터를 날려 버리고 1.5초 동안 기절시켜요", type:"quake", cd:9, r:230, dmg:200, stun:1.5},
    {name:"영웅의 각성", desc:"22초마다 황금빛으로 각성해 4초 동안 무적 · 공격력 2배가 되고, 내 주변을 크게 베어요", type:"awaken", cd:22, dur:4, mul:2, dmg:350, r:340},
  ]},
  archer: { titles:["견습 궁수","바람 사냥꾼","바람 저격수","폭풍 명사수","바람의 신궁"], skills:[
    {name:"마법 화살통", desc:"화살이 1마리 더 꿰뚫고, 세 번째 화살마다 펑 터지는 폭발 화살이 나가요", type:"passive", p:{pierce:1}, flag:"quiver"},
    {name:"질풍의 바람새", desc:"초록 바람으로 된 신비한 새가 곁을 날며, 몬스터를 끝까지 쫓아가는 바람 구슬을 두 개씩 쏴요", type:"summon", what:"phoenix", dmg:35},
    {name:"화살비", desc:"8초마다 몬스터 무리 위에 3초 동안 화살비를 퍼부어요", type:"zone", what:"rain", cd:8, r:175, dur:3, tick:0.2, dmg:28},
    {name:"폭풍 연사", desc:"13초마다 4초 동안 눈으로 따라갈 수 없을 만큼 빠르게 화살을 부채꼴로 쏟아내고, 네 발마다 폭풍 화살이 터져요", type:"stream", cd:13, dur:4, rate:0.05, dmg:38},
  ]},
  thief: { titles:["견습 도적","쇠별 자객","쇠별 암살자","그림자 닌자","금빛 표창왕"], skills:[
    {name:"행운의 일곱 별", desc:"표창을 1개 더 던지고 · 급소 확률 +10%", type:"passive", p:{crit:0.1}, flag:"lucky"},
    {name:"그림자 분신", desc:"그림자 분신이 따라다니며 내가 던지는 표창을 똑같이 따라 던져요", type:"summon", what:"clone"},
    {name:"암살 표식", desc:"7초마다 몬스터 6마리에 표식을 새기고, 잠시 뒤 표식이 터지며 표창이 사방으로 튀어요", type:"marks", cd:7, n:6, delay:1.2, dmg:45},
    {name:"어둠의 표창 소용돌이", desc:"12초마다 6초 동안 사방으로 표창을 뿜어내는 어둠의 소용돌이를 만들어요", type:"flare", cd:12, dur:6, rate:0.11, dmg:50},
  ]},
  mage: { titles:["견습 마법사","불꽃 술사","독불꽃 마도사","화염 대마도사","불꽃의 현자"], skills:[
    {name:"독불꽃", desc:"내 공격에 맞은 몬스터는 3초 동안 보랏빛 독불꽃에 계속 타요", type:"passive", p:{}, flag:"poison"},
    {name:"독 안개", desc:"7초마다 몬스터 무리에 5초 동안 독 안개를 퍼뜨려 느리게 하고 계속 피해를 줘요", type:"zone", what:"mist", cd:7, r:185, dur:5, tick:0.4, dmg:22, slow:true},
    {name:"이프리트 소환", desc:"뿔 달린 불의 정령 이프리트가 곁을 따라다니며, 앞쪽으로 활활 타는 불길을 내뿜고 가끔 커다란 화염탄을 던져 펑 터뜨려요", type:"summon", what:"ifrit", dmg:26},
    {name:"메테오 샤워", desc:"14초마다 하늘에서 거대한 운석 10개가 차례로 떨어져요", type:"meteors", cd:14, n:10, r:120, dmg:170, gap:0.18},
  ]},
  pirate: { titles:["견습 해적","바다 총잡이","바다 무법자","대해적","바다의 제왕"], skills:[
    {name:"더블 샷", desc:"총알을 두 발씩 쏘고 · 공격력 +35%", type:"passive", p:{dmg:1.35}, flag:"double"},
    {name:"문어 포탑", desc:"9초마다 문어 포탑을 내려놓아요. 포탑이 7초 동안 몬스터를 쏴요", type:"turret", cd:9, dur:7, rate:0.3, dmg:28},
    {name:"선원 소환", desc:"쌍권총 선원과 대포 선원이 따라다니며 함께 싸워요 · 대포알은 맞은 곳에서 터져요", type:"summon", what:"crew", dmg:15},
    {name:"전함 포격", desc:"13초마다 차원문을 열고 강철 전함이 화면을 가르며 돌진해 와요. 지나가는 길의 몬스터를 들이받고 대포알 14발을 퍼부어요", type:"battleship", cd:13, n:14, r:100, dmg:215},
  ]},
  healer: { titles:["견습 달빛 치유사","초승달 치유사","반달의 사제","보름달 대사제","월광의 성녀"], skills:[
    {name:"초승달의 가호", desc:"최대 체력 +30 · 1초마다 체력이 조금씩 차요 · 달 구슬이 1번 더 튕기고, 맞힐 때 차는 체력이 2배가 돼요", type:"passive", p:{hp:30, regen:1.2}, flag:"moonbounce"},
    {name:"달토끼 정령", desc:"하얀 달토끼가 깡충깡충 따라다니며 달 구슬을 던지고, 7초마다 나와 근처 친구들의 체력을 채워 줘요", type:"summon", what:"rabbit", dmg:32},
    {name:"달빛 결계", desc:"11초마다 내 자리에 5초 동안 달빛 결계를 펼쳐요. 안의 몬스터는 느려지며 계속 다치고, 안의 친구들은 체력이 계속 차요", type:"moonzone", cd:11, r:190, dur:5, tick:0.5, dmg:18},
    {name:"보름달 강림", desc:"16초마다 하늘에 거대한 보름달이 떠올라 몬스터 무리에 달빛 기둥 13개를 내리꽂고, 나와 친구들의 체력을 크게 채우며 보호막을 씌워 줘요", type:"fullmoon", cd:16, n:13, r:110, dmg:260},
  ]},
  calli: { titles:["서당 학동","붓 도령","먹물 선비","묵향 도사","서성 대도사"], skills:[
    {name:"일필휘지 (一筆揮之)", desc:"붓을 앞뒤로 휘둘러 먹물 물결이 뒤쪽으로도 나가요 · 공격력 +10% · 먹물에 맞은 몬스터가 더 오래 느려져요", type:"passive", p:{dmg:1.1}, flag:"ink2"},
    {name:"뫼 산 (山)", desc:"7초마다 몬스터가 가장 많은 곳에 '山' 글자를 써요. 땅에서 바위산이 솟아 크게 다치고 1.2초 동안 꼼짝 못 해요", type:"glyph", ch:"山", hun:"뫼 산", cd:7, r:150, dmg:110, stun:1.2},
    {name:"우레 뢰 (雷)", desc:"9초마다 하늘에 '雷' 글자를 써요. 번개 7개가 몬스터에게 떨어져 크게 다치고 잠깐 기절해요", type:"glyph", ch:"雷", hun:"우레 뢰", cd:9, n:7, r:85, dmg:95, stun:0.5},
    {name:"묵룡 승천 (墨龍)", desc:"16초마다 먹물로 그린 용이 살아나 몬스터 무리를 가로지르고, 되돌아와 X자로 한 번 더 날아가요. 두 번째는 보스를 노리고, 보스는 1.5배로 다쳐요. 먹 띠가 깔린 길의 몬스터는 크게 다치고 2초 동안 꼼짝 못 해요", type:"inkdragon", cd:16, dmg:280, w:130, stun:2},
  ]},
  zodiac: { titles:["동물 친구 꼬마","견습 조련사","숲의 조련사","수호 조련사","십이지 대신관"], skills:[
    {name:"쥐 정령 (子)", desc:"재빠른 쥐 정령이 몬스터 사이를 쪼르르 달리며 물어요. 구슬 줍는 거리도 넓어져요", type:"summon", what:"rat", dmg:28},
    {name:"황소 정령 (丑)", desc:"든든한 황소 정령이 2초마다 몬스터 무리로 돌진해 들이받아 밀쳐 내고, 멈춘 곳에서 땅을 쿵 울려요", type:"summon", what:"ox", dmg:75},
    {name:"백호 정령 (寅)", desc:"백호 정령이 늘 곁을 따라다니며 가까이 온 몬스터에게 휙 덮쳐 발톱으로 할퀴고, 9초마다 크게 울부짖어 주변 몬스터를 기절시켜요", type:"summon", what:"tiger", dmg:55},
    {name:"청룡 강림 (辰)", desc:"16초마다 하늘에서 청룡이 내려와 8초 동안 내 주위를 휘감아 돌며 몬스터 무리에 푸른 불꽃을 쏟아붓고, 2.4초마다 커다란 푸른 벼락을 내리쳐요", type:"dragonsum", cd:16, dur:8, rate:0.22, dmg:70},
  ]},
  mech: { titles:["견습 정비공","기계팔 메카닉","반기갑 메카닉","전신 기갑 메카닉","최강 메카닉"], skills:[
    {name:"강철 장갑", desc:"받는 피해 -12% · 최대 체력 +30 · 로켓 주먹 세 번마다 작은 미사일 2발이 따라 날아가요", type:"passive", p:{armor:0.88, hp:30}, flag:"missile"},
    {name:"보조 드론", desc:"동그란 보조 드론이 곁을 날며 레이저를 쏘고, 4초마다 내 체력을 조금 고쳐 줘요", type:"summon", what:"drone", dmg:15},
    {name:"미사일 폭격", desc:"8초마다 어깨 포대에서 미사일 12발을 쏘아 올려 몬스터 무리에 쏟아부어요", type:"missiles", cd:8, n:12, r:70, dmg:90},
    {name:"메탈아머 전탄발사", desc:"18초마다 거대 로봇이 하늘에서 쿵! 내려와 온몸의 무기를 펼쳐요. 어깨 미사일 24발, 개틀링 연사, 손바닥 플라즈마, 가슴 수정 빔을 한꺼번에 쏟아붓고 마지막에 크게 폭발한 뒤 날아가요", type:"robot", cd:18, dmg:260, r:190, stun:1.5},
  ]},
};
