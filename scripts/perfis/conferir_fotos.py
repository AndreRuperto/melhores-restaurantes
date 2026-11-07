# uso: python -I check.py <pasta_json> <pasta_saida> slug1 slug2 ...
import json, sys, re, io, urllib.request, textwrap
from PIL import Image, ImageDraw
src_dir, out_dir, slugs = sys.argv[1], sys.argv[2], sys.argv[3:]
KEYS = ["slug","lede","hero","founded","founders","chef","history","cuisine","dishes","awards","practical","gallery","sources"]
import time
def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "a-carta-photo-check/1.0"})
    return Image.open(io.BytesIO(urllib.request.urlopen(req, timeout=60).read())).convert("RGB")
def fetch(url):
    last = None
    for u in [re.sub(r"/\d+px-", "/330px-", url), url, url]:
        try: return get(u)
        except Exception as e: last = e; time.sleep(2)
    raise last
for slug in slugs:
    try:
        p = json.load(open(f"{src_dir}/{slug}.json", encoding="utf-8"))
    except Exception as e:
        print(f"{slug}: JSON INVALIDO/AUSENTE ({e})"); continue
    issues = [f"falta {k}" for k in KEYS if k not in p]
    items = ([("CAPA", p["hero"])] if p.get("hero") else []) + [("PRATO: " + d["name"], d["photo"]) for d in p.get("dishes", []) if d.get("photo")] + [("GAL", g) for g in p.get("gallery", []) if g]
    W, H, cols = 320, 240, 4
    rows = max(1, (len(items) + cols - 1) // cols)
    sheet = Image.new("RGB", (cols * W, rows * (H + 60)), "white"); d = ImageDraw.Draw(sheet)
    srcs = [ph.get("src") for _, ph in items]
    if len(srcs) != len(set(srcs)): issues.append("foto repetida")
    for i, (label, ph) in enumerate(items):
        try:
            im = fetch(ph["src"])
            if label == "CAPA" and im.width <= im.height: issues.append("capa vertical")
            im.thumbnail((W, H))
        except Exception as e:
            im = Image.new("RGB", (W, H), "red"); issues.append(f"foto falhou: {label}")
        x, y = (i % cols) * W, (i // cols) * (H + 60)
        time.sleep(0.7); sheet.paste(im, (x, y))
        d.text((x + 4, y + H + 4), "\n".join(textwrap.wrap(label + " | " + (ph.get("caption") or ""), 55)[:4]), fill="black")
    sheet.save(f"{out_dir}/{slug}.jpg", quality=80)
    ill = sum(1 for _, ph in items if ph.get("illustrative"))
    print(f"{slug}: {len(items)} fotos ({ill} ilustrativas), {len(p.get('awards',[]))} premios, {len(p.get('sources',[]))} fontes" + (f"  !! {'; '.join(issues)}" if issues else ""))
