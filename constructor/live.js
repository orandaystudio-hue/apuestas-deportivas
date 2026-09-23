const normAb=a=>({WSH:'WAS',JAC:'JAX',LA:'LAR'}[String(a||'').toUpperCase()]||String(a||'').toUpperCase());
const mlNum=s=>{if(s==null)return null;const t=String(s).trim().toUpperCase();if(t==='EVEN'||t==='EV')return 100;const n=parseInt(t.replace('+',''),10);return isNaN(n)||Math.abs(n)<100?null:n};
async function liveESPN(){
  const r=await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=3&dates=2026');
  if(!r.ok)throw new Error('HTTP '+r.status);
  const j=await r.json();let n=0;
  (j.events||[]).forEach(ev=>{
    const c=ev.competitions&&ev.competitions[0];if(!c)return;
    const H=c.competitors.find(x=>x.homeAway==='home'),A=c.competitors.find(x=>x.homeAway==='away');if(!H||!A)return;
    const g=G.find(x=>normAb(x.teams[1].abbr)===normAb(H.team.abbreviation)&&normAb(x.teams[0].abbr)===normAb(A.team.abbreviation));if(!g)return;
    const st=ev.status&&ev.status.type||{},prev=S.live[g.id]||{};
    const rec={state:st.state||'pre',detail:st.shortDetail||'',at:new Date().toISOString(),lines:prev.lines||null,score:null};
    if(rec.state!=='pre')rec.score={away:+A.score||0,home:+H.score||0};
    const o=c.odds&&c.odds[0];
    if(o&&rec.state==='pre'){
      const L={};
      if(typeof o.spread==='number')L.spread_home=o.spread;
      if(typeof o.overUnder==='number')L.total=o.overUnder;
      const ml=o.moneyline||{};
      const mh=mlNum(ml.home&&(ml.home.close||ml.home.current||{}).odds),ma=mlNum(ml.away&&(ml.away.close||ml.away.current||{}).odds);
      if(mh!=null&&ma!=null){L.ml_home=mh;L.ml_away=ma}
      L.provider=o.provider&&o.provider.name;L.details=o.details;
      if(Object.keys(L).length)rec.lines=L;
    }
    S.live[g.id]=rec;n++;
  });
  return n;
}
async function liveInjuries(){
  const r=await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/injuries');if(!r.ok)return;
  const j=await r.json(),out={};
  (j.injuries||[]).forEach(t=>{
    const nm=String(t.displayName||'').toLowerCase();
    const team=G.flatMap(g=>g.teams).find(x=>nm&&nm.endsWith(String(x.name||'').toLowerCase().split(' ').pop()));
    if(!team)return;
    const all=t.injuries||[],items=all.filter(x=>String(x.status||'').toLowerCase()!=='active').map(x=>({name:x.athlete&&x.athlete.displayName,pos:x.athlete&&x.athlete.position&&x.athlete.position.abbreviation,status:x.status,comment:x.shortComment||''}));
    out[team.abbr]={items,listed:all.length};
  });
  S.inj=out;store.set('w3.inj',out);
}
