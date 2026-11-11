import csv, json, subprocess
from pathlib import Path
from collections import Counter
from datetime import datetime, timezone
root=Path(__file__).resolve().parents[2]
index=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {restaurants} from './src/data/restaurants.js'; console.log(JSON.stringify(restaurants))"],cwd=root))
counts=Counter();rows=[]
for r in index:
 p=json.loads((root/'src/data/profiles'/f"{r['slug']}.json").read_text(encoding='utf-8'))
 for i,review in enumerate(p.get('fieldReviews',[])):
  counts[review['status']]+=1
  if review['status']=='confirmed':continue
  value=p
  for part in review['field'].split('.'):
   value=value.get(part) if isinstance(value,dict) else None
  rows.append({'id':f"{r['slug']}:{i+1}",'rank':r['rank'],'restaurante':r['name'],'slug':r['slug'],'campo':review['field'],'situacao_atual':review['status'],'valor_atual':json.dumps(value,ensure_ascii=False) if value is not None else '', 'fonte_atual':review.get('sourceUrl',''),'data_revisao_anterior':review.get('checkedAt',''),'observacao_anterior':review.get('note',''),'decisao_humana':'','valor_corrigido':'','fonte_adicional':'','revisor':'','data_decisao':'','observacao_revisor':''})
rows.sort(key=lambda r:({'divergent':0,'unverified':1,'single-source':2}.get(r['situacao_atual'],3),r['rank'],r['campo']))
assert len(index)==100 and sum(counts.values())==595 and len(rows)==233,(len(index),counts,len(rows))
assert len({r['id'] for r in rows})==len(rows)
out=root/'docs/lotes/fase-2-revisao-humana.csv'
with out.open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
assert len(list(csv.DictReader(out.open(encoding='utf-8-sig'))))==233
manifest={'sourceCommit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip(),'generatedAt':datetime.now(timezone.utc).isoformat(),'profiles':len(index),'reviews':dict(counts),'pending':len(rows),'uniqueIds':len({r['id'] for r in rows}),'humanDecisionsFilled':sum(bool(r['decisao_humana']) for r in rows)}
evidence=root/'docs/qa-frontend/evidencias/homologacao/revisao-humana-inventario.json';evidence.parent.mkdir(parents=True,exist_ok=True);evidence.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(manifest,ensure_ascii=False))
