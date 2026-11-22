const fs=require('fs'),http=require('http'),vm=require('vm');
class Range{constructor(sh,r,c,nr,nc){Object.assign(this,{sh,r,c,nr:nr||1,nc:nc||1})}
 setValue(v){this.sh.set(this.r,this.c,v);return this}
 setValues(vs){vs.forEach((row,i)=>row.forEach((v,j)=>this.sh.set(this.r+i,this.c+j,v)));return this}
 setNumberFormat(){return this} setFontWeight(){return this} getValue(){const r=this.sh.d[this.r-1];return r?(r[this.c-1]??''):''}}
class Sheet{constructor(n){this.name=n;this.d=[]}
 set(r,c,v){while(this.d.length<r)this.d.push([]);const row=this.d[r-1];while(row.length<c)row.push("");row[c-1]=v}
 getLastRow(){return this.d.length} appendRow(a){this.d.push(a.slice())}
 getRange(r,c,nr,nc){if(typeof r==="string")return new Range(this,1,1);return new Range(this,r,c,nr,nc)}
 getDataRange(){const w=Math.max(...this.d.map(r=>r.length),0);return{getValues:()=>this.d.map(r=>{const x=r.slice();while(x.length<w)x.push("");return x})}}
 setFrozenRows(){} setColumnWidth(){} setFrozenColumns(){} clearContents(){this.d=[]}}
const ss={sheets:{},getSheetByName(n){return this.sheets[n]||null},insertSheet(n){return this.sheets[n]=new Sheet(n)},getSheets(){return Object.values(this.sheets)},deleteSheet(s){delete this.sheets[s.name]}};
const _c={},_p={};const ctx={UrlFetchApp:{fetch:()=>({getResponseCode:()=>200,getContentText:()=>fs.readFileSync('/home/claude/wpspa10/shop.json','utf8')})},CacheService:{getScriptCache:()=>({get:k=>_c[k]||null,put:(k,v)=>{_c[k]=v},remove:k=>{delete _c[k]}})},PropertiesService:{getScriptProperties:()=>({getProperty:k=>_p[k]||null,setProperty:(k,v)=>{_p[k]=v}})},Logger:{log:console.log},SpreadsheetApp:{getActive:()=>ss},LockService:{getScriptLock:()=>({waitLock(){},releaseLock(){}})},
 Utilities:{formatDate:(d,tz,f)=>{const p=n=>String(n).padStart(2,'0');return f.replace('yyyy',d.getFullYear()).replace('MM',p(d.getMonth()+1)).replace('dd',p(d.getDate())).replace(/^M$/,String(d.getMonth()+1)).replace('u',String(d.getDay()||7)).replace('H',String(d.getHours()))}},ContentService:{MimeType:{JSON:1},createTextOutput:t=>({t,setMimeType(){return this}})},Date,Math,JSON,String,Number,Object};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('Code.gs','utf8'),ctx);
ctx.einrichten();
const sp=ss.getSheetByName("Spieler");sp.d[1][1]="1234";sp.d[2][1]="0456";sp.d[1][2]=500; // Nr1 PIN 123 with 500 coins
http.createServer((req,res)=>{let b="";req.on("data",c=>b+=c);req.on("end",()=>{
 res.setHeader("Access-Control-Allow-Origin","*");
 if(req.method==="POST"){const o=ctx.doPost({postData:{contents:b}});res.end(o.t)}
 else if(req.url==="/dump"){res.end(JSON.stringify({sp:sp.d.slice(0,4),er:ss.getSheetByName("Ergebnisse").d,ub:ss.getSheetByName("Übersicht").d.slice(0,4)},null,1))}
 else res.end(ctx.doGet().t)})}).listen(8787,()=>console.log("up"));
