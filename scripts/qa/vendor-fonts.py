from pathlib import Path
import re
out=Path('public/fonts');out.mkdir(parents=True,exist_ok=True);css=[]
for slug,family,files in [('cormorant-garamond','Cormorant Garamond',['index.css','wght-italic.css']),('source-serif-4','Source Serif 4',['standard.css','standard-italic.css'])]:
 root=Path('node_modules/@fontsource-variable')/slug
 for f in files:
  data=(root/f).read_text(encoding='utf-8')
  for block in re.findall(r'@font-face\s*\{[^}]+\}',data):
   name=re.search(r'files/([^)]*\.woff2)',block).group(1)
   if '-latin-' not in name:continue
   (out/name).write_bytes((root/'files'/name).read_bytes())
   block=re.sub(r"font-family: '[^']+'",f"font-family: '{family}'",block).replace('./files/','/fonts/')
   css.append(block)
 (out/(slug+'-LICENSE.txt')).write_bytes((root/'LICENSE').read_bytes())
(out/'fonts.css').write_text('\n\n'.join(css)+'\n',encoding='utf-8')
p=Path('index.html');s=p.read_text(encoding='utf-8');s=re.sub(r'    <link[^>]+https://fonts\.(?:googleapis|gstatic)\.com[^>]+/>\n','',s)
if '/fonts/fonts.css' not in s:s=s.replace('    <script>','    <link rel="preload" href="/fonts/cormorant-garamond-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin />\n    <link rel="preload" href="/fonts/source-serif-4-latin-standard-normal.woff2" as="font" type="font/woff2" crossorigin />\n    <link rel="stylesheet" href="/fonts/fonts.css" />\n    <script>',1)
p.write_text(s,encoding='utf-8')
