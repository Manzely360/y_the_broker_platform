const fs=require('fs'),path=require('path');

function canon(u){try{const x=new URL(u);x.hash='';return x.toString().replace(/\/$/,'');}catch{return (u||'').replace(/\/$/,'');}}
function readReport(){
  try{const j=JSON.parse(fs.readFileSync('data/report.json','utf8'));return j;}catch{return null;}
}
function getVisited(j){
  const s=new Set();
  if(!j) return s;
  if(Array.isArray(j.visited)) j.visited.forEach(u=>s.add(canon(u)));
  if(Array.isArray(j.pages)) j.pages.forEach(p=>{
    if(typeof p==='string') s.add(canon(p));
    else if(p && p.url) s.add(canon(p.url));
  });
  return s;
}
function draw(pct, done, total){
  const w=30, fill=Math.max(0,Math.min(w,Math.round(w*pct)));
  const bar='█'.repeat(fill)+'─'.repeat(w-fill);
  const out=`[${bar}] ${String(Math.round(pct*100)).padStart(3)}%  (${done}/${total})`;
  process.stdout.write('\r'+out);
}

const args=process.argv.slice(2);
const urlsFileIdx=args.indexOf('--urls');
let targetSet=null;
if(urlsFileIdx>=0 && args[urlsFileIdx+1]){
  try{
    const raw=fs.readFileSync(args[urlsFileIdx+1],'utf8').split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
    targetSet=new Set(raw.map(canon));
    console.log(`\nTracking ${targetSet.size} targets from ${args[urlsFileIdx+1]}\n`);
  }catch(e){ console.log('\n(no urls file found, falling back to report totals)\n'); }
}

function totals(j, visited){
  if(targetSet){
    let done=0; for(const u of targetSet) if(visited.has(u)) done++;
    return { done, total: targetSet.size };
  }
  const done = visited.size;
  const total = (j&&(
    j.total || j.sitemapCount || (Array.isArray(j.targets)&&j.targets.length)
  )) || done || 1;
  return { done, total };
}

function tick(){
  const j=readReport();
  const visited=getVisited(j);
  const {done,total}=totals(j,visited);
  const pct = Math.min(1, done/Math.max(1,total));
  draw(pct, done, total);
}
process.stdout.write('\nScrape progress\n');
tick();
const iv=setInterval(tick, 1000);
process.on('SIGINT',()=>{ clearInterval(iv); console.log('\nbye'); process.exit(0); });
