import json,sys,re
cat=json.load(open("catalog.json"))
url=sys.argv[1] if len(sys.argv)>1 else ""
ACTIVE_UNITS=[1,2,3]  # <- hier freischalten, wenn eine neue Unit beginnt
head=open("game_head.part").read()
slots=json.loads(re.search(r"const SLOTS = (\[.*?\]);",head).group(1))
default=re.search(r"const DEFAULT = (\{.*?\});",head).group(1)
default=json.loads(re.sub(r'(\w+):',r'"\1":',default))
g=(head+open("game_avatar.part").read()+open("game_tail.part").read()).replace("/*CATALOG*/",json.dumps(cat,ensure_ascii=False)).replace("/*API_URL*/",url).replace("/*UNITS*/",json.dumps(ACTIVE_UNITS))
open("/home/claude/wpspa10/game.js","w").write(g)
items={}
for c in cat:
    d={"slot":c["slot"],"price":c["price"]}
    if "months" in c: d["months"]=c["months"]
    if "lvl" in c: d["lvl"]=c["lvl"]
    items[c["id"]]=d
s=open("Code.gs.tpl").read()
open("Code.gs","w").write(s)
shop={"items":{c["id"]:[c["slot"],c["price"],c.get("lvl",0)]+([c["months"]] if "months" in c else []) for c in cat if c.get("unit",0)==0 or c.get("unit") in ACTIVE_UNITS},"slots":slots,"default":default}
open("/home/claude/wpspa10/shop.json","w").write(json.dumps(shop,separators=(",",":")))
print(len(cat),"items", slots)
