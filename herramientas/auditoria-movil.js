// Auditoría de celular: se inyecta con javascript_tool y devuelve todo medido.
window.__auditar=async function(vistas){
  const out={};
  const parse=c=>{c=String(c).trim();let m=c.match(/^rgba?\(([^)]+)\)/);
    if(m){const p=m[1].split(/[, \/]+/).filter(Boolean).map(Number);return{r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}}
    m=c.match(/^color\(srgb\s+([^)]+)\)/);
    if(m){const p=m[1].split(/[ \/]+/).filter(Boolean).map(Number);return{r:p[0]*255,g:p[1]*255,b:p[2]*255,a:p.length>3?p[3]:1}}
    return c==='transparent'?{r:0,g:0,b:0,a:0}:null};
  const over=(f,b)=>({r:f.r*f.a+b.r*(1-f.a),g:f.g*f.a+b.g*(1-f.a),b:f.b*f.a+b.b*(1-f.a),a:1});
  const lum=p=>[p.r,p.g,p.b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)}).reduce((s,v,i)=>s+[0.2126,0.7152,0.0722][i]*v,0);
  const bgOf=e=>{let n=e,acc=null;while(n){const p=parse(getComputedStyle(n).backgroundColor);if(p&&p.a>0){acc=acc?over(acc,p):p;if(acc.a>=0.999)return acc}n=n.parentElement}return acc||{r:255,g:255,b:255,a:1}};
  const nom=e=>(e.id?'#'+e.id:'')+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/).slice(0,2).join('.'):e.tagName)+'{'+(e.textContent||'').trim().slice(0,18)+'}';

  for(const v of vistas){
    location.hash=v; await new Promise(r=>setTimeout(r,450)); scrollTo(0,0); await new Promise(r=>setTimeout(r,150));
    const W=innerWidth,H=innerHeight,r={};
    r.desborde=document.documentElement.scrollWidth-W;
    // elementos que se salen del ancho
    r.anchos=[...document.querySelectorAll('#view *, header *, footer *')].filter(e=>{
      const b=e.getBoundingClientRect();return b.width>W+1||b.right>W+1||b.left<-1;}).map(nom).slice(0,8);
    // tablas que se deslizan
    r.tablasDeslizan=[...document.querySelectorAll('.tw')].filter(d=>d.scrollWidth>d.clientWidth+4)
      .map(d=>{const t=d.querySelector('table');return (t&&t.className||'tabla')+' '+d.scrollWidth+'/'+d.clientWidth+(d.hasAttribute('data-scroll')?' (avisa)':' (SIN AVISO)')}).slice(0,6);
    // texto cortado (clipped)
    r.textoCortado=[...document.querySelectorAll('#view *')].filter(e=>{
      const s=getComputedStyle(e);if(s.overflow==='visible'&&s.overflowX==='visible')return false;
      return e.scrollWidth>e.clientWidth+2&&!e.classList.contains('tw')&&e.children.length===0;}).map(nom).slice(0,6);
    // objetivos táctiles
    r.tactilesChicos=[...new Set([...document.querySelectorAll('a,button,input,select,summary,[role=button]')].filter(e=>{
      const b=e.getBoundingClientRect();return b.width>0&&b.height>0&&(b.height<44||b.width<24);}).map(e=>nom(e)+' '+Math.round(e.getBoundingClientRect().height)+'px'))].slice(0,10);
    // letra chica
    r.letraChica=[...new Set([...document.querySelectorAll('#view *')].filter(e=>{
      const t=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>3);
      return t&&parseFloat(getComputedStyle(e).fontSize)<12.5;}).map(e=>nom(e)+' '+getComputedStyle(e).fontSize))].slice(0,8);
    // inputs que provocan zoom en iOS (<16px)
    r.inputsZoom=[...document.querySelectorAll('input,select,textarea')].filter(e=>parseFloat(getComputedStyle(e).fontSize)<16).map(nom).slice(0,5);
    // contraste
    r.contraste=[...new Set([...document.querySelectorAll('#view *, header *, .status *')].filter(e=>{
      if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return false;
      const s=getComputedStyle(e),fs=parseFloat(s.fontSize),bold=+s.fontWeight>=600,need=(fs>=24||(fs>=18.66&&bold))?3:4.5;
      const fg=parse(s.color);if(!fg)return false;const bg=bgOf(e);
      const ra=(Math.max(lum(over(fg,bg)),lum(bg))+0.05)/(Math.min(lum(over(fg,bg)),lum(bg))+0.05);
      e.__ratio=ra.toFixed(2);return ra<need;}).map(e=>nom(e)+' '+e.__ratio))].slice(0,8);
    // cuánto ocupa el encabezado y qué se ve en la primera pantalla
    const top=document.querySelector('.top'),st=document.querySelector('.status');
    r.encabezado=Math.round((top?top.getBoundingClientRect().height:0)+(st?st.getBoundingClientRect().height:0));
    r.encabezadoPct=Math.round(r.encabezado/H*100)+'%';
    const prim=document.querySelector('#view .card, #view .panel, #view table');
    r.primerContenido=prim?Math.round(prim.getBoundingClientRect().top):null;
    r.contenidoVisiblePrimeraPantalla=prim?Math.max(0,Math.round((H-prim.getBoundingClientRect().top)/H*100))+'%':'0%';
    // longitud de línea de los párrafos
    const ps=[...document.querySelectorAll('#view p')].slice(0,6).map(p=>{
      const ancho=p.getBoundingClientRect().width,fs=parseFloat(getComputedStyle(p).fontSize);
      return Math.round(ancho/(fs*0.5));});
    r.caracteresPorLinea=ps;
    out[v]=r;
  }
  return out;
};
'listo';
