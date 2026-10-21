/* ===== 같이 하기: 태블릿끼리 방 코드로 연결 (PeerJS) ===== */
const NET = { peer:null, role:null, code:"", myId:"", conns:{}, hostConn:null, lobby:[], map:1, msg:"", busy:false, ing:new Set(), onGame:null, onDrop:null };
const NET_PREFIX = "hanja-explorers-game-", NET_MAX = 4;
function netAvailable(){ return !!window.Peer && (/github\.io$/.test(location.hostname) || /^(localhost|127\.0\.0\.1)$/.test(location.hostname)) }
function netOpts(){ const Q=new URLSearchParams(location.search), S=Q.get("srv"); return S?{host:S.split(":")[0],port:+S.split(":")[1],path:"/",secure:false,debug:0}:{debug:0} }
function netMe(){ const p=prof(); return {name:(p&&p.name)||(p?`${p.c}반 ${p.n}번`:"친구"), hero:P.hero, tier:HS().tier, lv:HS().lv} }
function netInRoom(){ return !!NET.role && (NET.role==="host" ? !!NET.code : !!(NET.hostConn&&NET.hostConn.open)) }
function netRefresh(){ if(document.getElementById("mpPanel")) gameLobby() }
function netErr(e){ const t=e&&e.type||"";
  if(t==="peer-unavailable") return "그 코드의 방을 찾지 못했어요. 코드를 다시 확인해 주세요.";
  if(t==="network"||t==="server-error"||t==="socket-error"||t==="socket-closed") return "인터넷 연결이 불안정해요. 잠시 뒤 다시 해 주세요.";
  if(t==="webrtc") return "친구 태블릿과 연결하지 못했어요. 같은 와이파이인지 확인해 주세요.";
  return "연결 중 문제가 생겼어요."; }
function netLeave(silent){ try{ NET.peer&&NET.peer.destroy() }catch(e){} Object.assign(NET,{peer:null,role:null,code:"",myId:"",conns:{},hostConn:null,lobby:[],busy:false,ing:new Set(),onGame:null}); if(!silent) netRefresh() }
function netLobbyList(){ return NET.lobby }
function netHostLobby(){ NET.lobby=[Object.assign({id:NET.myId,host:true},netMe())].concat(Object.values(NET.conns).filter(c=>c.info).map(c=>Object.assign({id:c.peer},c.info)));
  const m={t:"lobby",list:NET.lobby,map:P.set.map||1}; Object.values(NET.conns).forEach(c=>{ try{ c.send(m) }catch(e){} }); netRefresh() }
function netCreate(){ if(!window.Peer||NET.busy) return; netLeave(true); NET.busy=true; NET.msg="방을 만들고 있어요..."; netRefresh();
  const code=String(1000+Math.floor(Math.random()*9000)), peer=new Peer(NET_PREFIX+code,netOpts()); NET.peer=peer;
  peer.on("open",id=>{ Object.assign(NET,{role:"host",code,myId:id,busy:false,msg:""}); netHostLobby() });
  peer.on("connection",c=>{
    c.on("open",()=>{ if(Object.keys(NET.conns).length>=NET_MAX-1 || NET.ing.size){ try{ c.send({t:"full",ing:!!NET.ing.size}) }catch(e){} setTimeout(()=>c.close(),400); return } NET.conns[c.peer]=c });
    c.on("data",d=>{ if(d&&d.t==="hello"){ c.info=d.me; netHostLobby(); return } if(d&&d.t==="bye"){ c.close(); return } if(NET.onGame) NET.onGame(d,c.peer) });
    c.on("close",()=>{ delete NET.conns[c.peer]; NET.ing.delete(c.peer); if(NET.onDrop) NET.onDrop(c.peer); netHostLobby() });
  });
  peer.on("error",e=>{ if(e.type==="unavailable-id"){ NET.busy=false; return netCreate() } if(!NET.code){ NET.busy=false; NET.msg=netErr(e); netLeave(true); NET.msg=netErr(e); netRefresh() } });
}
function netJoin(code){ if(!window.Peer||NET.busy) return; code=String(code||"").replace(/\D/g,""); if(code.length!==4){ NET.msg="방 코드 4자리를 넣어 주세요."; netRefresh(); return }
  netLeave(true); NET.busy=true; NET.msg="방에 들어가고 있어요..."; netRefresh();
  const peer=new Peer(netOpts()); NET.peer=peer;
  const fail=t=>{ if(NET.peer!==peer) return; netLeave(true); NET.msg=t; netRefresh() };
  const to=setTimeout(()=>{ if(!netInRoom()) fail("방에 들어가지 못했어요. 코드를 확인하고 다시 해 주세요.") },15000);
  peer.on("open",id=>{ NET.myId=id; const c=peer.connect(NET_PREFIX+code,{reliable:true,serialization:"json"}); NET.hostConn=c; NET.role="client"; NET.code=code;
    c.on("open",()=>{ clearTimeout(to); NET.busy=false; NET.msg=""; c.send({t:"hello",me:netMe()}); netRefresh() });
    c.on("data",d=>{ if(!d) return;
      if(d.t==="lobby"){ NET.lobby=d.list; NET.map=d.map; netRefresh(); return }
      if(d.t==="full"){ fail(d.ing?"친구들이 게임 중이에요. 끝나면 다시 들어와요.":"방이 꽉 찼어요. (최대 4명)"); return }
      if(d.t==="start"){ netStartClient(d); return }
      if(NET.onGame) NET.onGame(d,"host") });
    c.on("close",()=>{ if(NET.onDrop) NET.onDrop("host"); if(NET.peer===peer){ netLeave(true); NET.msg="방장과 연결이 끊어졌어요."; netRefresh() } }) });
  peer.on("error",e=>{ clearTimeout(to); fail(netErr(e)) });
}
function netStartHost(){ if(NET.role!=="host") return;
  if(!payGame()){ toast("코인이나 오늘 남은 판이 부족해요"); return }
  NET.ing=new Set(Object.keys(NET.conns)); const m={t:"start",map:P.set.map||1};
  Object.values(NET.conns).forEach(c=>{ try{ c.send(m) }catch(e){} });
  startGame({mp:true,map:P.set.map||1});
}
function netStartClient(d){
  if(document.querySelector(".game")) return;
  if(!payGame()){ toast("코인이나 오늘 남은 판이 부족해서 이번 판은 쉬어요"); try{ NET.hostConn.send({t:"quit"}) }catch(e){} return }
  startGame({mp:true,map:d.map});
}
/* 게임 로비에 들어가는 '친구와 같이 하기' 칸 */
function mpPanelHtml(){
  if(!netAvailable()) return "";
  const inRoom=netInRoom(), list=NET.lobby||[];
  const pl=list.map(p=>`<div class="mpP">${avaHtml(p.hero,40)}<span><b>${esc(p.name)}</b><small>${p.host?"방장 · ":""}${esc(heroById(p.hero).cls)} Lv ${p.lv}</small></span></div>`).join("");
  let body;
  if(!inRoom) body=`<p class="mpHint">태블릿 2~4대가 한 방에 모여 같이 싸워요. 한 명이 <b>방 만들기</b>, 친구들은 <b>코드</b>를 넣어요.</p>
    <div class="mpRow"><button class="big green" id="mpMk" ${NET.busy?"disabled":""}>방 만들기</button>
    <input id="mpCode" inputmode="numeric" maxlength="4" placeholder="코드 4자리" aria-label="방 코드"><button class="big alt" id="mpJn" ${NET.busy?"disabled":""}>방 들어가기</button></div>`;
  else body=`<div class="mpCodeBox"><span>방 코드</span><b>${NET.code}</b><small>${NET.role==="host"?"친구들에게 이 코드를 알려 주세요":"방장이 출발을 누르면 시작해요"}</small></div>
    <div class="mpList">${pl}${Array.from({length:Math.max(0,NET_MAX-list.length)},()=>`<div class="mpP empty"><span>빈자리</span></div>`).join("")}</div>
    <p class="mpHint">${NET.role==="host"?`맵은 방장이 골라요. 지금 맵: <b>${mapById(P.set.map||1).name}</b> · 몬스터는 친구 수만큼 더 많이 나와요.`:`방장이 고른 맵: <b>${mapById(NET.map||1).name}</b> · 입장료는 각자 코인 ${GAME_COST}개예요.`}</p>
    <div class="mpRow">${NET.role==="host"?`<button class="big red" id="mpGo" ${list.length<2?"disabled":""}>${list.length<2?"친구를 기다리는 중...":`${list.length}명이 같이 출발!`}</button>`:""}<button class="big alt" id="mpOut">방 나가기</button></div>`;
  return `<div class="mpPanel" id="mpPanel"><div class="row"><h2 style="font-size:22px">친구와 같이 하기</h2><span class="meta">최대 4명 · 각자 자기 용사로 · 경험치 구슬은 팀 모두가 받아요</span></div>${body}${NET.msg?`<p class="needmsg">${esc(NET.msg)}</p>`:""}</div>`;
}
function mpBind(){
  const $=id=>document.getElementById(id);
  if($("mpMk")) $("mpMk").onclick=()=>{ sfx("tap"); NET.msg=""; netCreate() };
  if($("mpJn")) $("mpJn").onclick=()=>{ sfx("tap"); NET.msg=""; netJoin($("mpCode").value) };
  if($("mpCode")) $("mpCode").addEventListener("keydown",e=>{ if(e.key==="Enter") netJoin($("mpCode").value) });
  if($("mpGo")) $("mpGo").onclick=()=>{ sfx("tap"); netStartHost() };
  if($("mpOut")) $("mpOut").onclick=()=>{ sfx("tap"); try{ NET.hostConn&&NET.hostConn.send({t:"bye"}) }catch(e){} NET.msg=""; netLeave() };
}
