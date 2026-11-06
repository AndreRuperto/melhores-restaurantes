# Brief: research ONE restaurant profile for "A Carta"

<!-- Como usar: um agente por restaurante, no máximo ~8 em paralelo (com 12 o Wikimedia Commons passou a devolver 429).
     Depois: python -I scripts/perfis/conferir_fotos.py <rascunhos> <saida> slug1 slug2 … → olhar as folhas de contato,
     tirar fotos fracas, trocar capa vertical/genérica, e só então copiar o JSON para src/data/profiles/.
     Fotos "falhou" que são arquivo original costumam ser só o limite do Commons para scripts; testar no navegador. -->


"A Carta" is a pt-BR website listing The 50 Best Restaurants 2026 (top 50 announced 4 Nov 2026 in Lima; 51–100 announced 21 Oct 2026). Each restaurant page tells the story of the place like a magazine profile. You research ONE restaurant (given in your task message) and write one JSON file.

Use WebSearch / WebFetch (load them via ToolSearch if deferred). Accuracy beats completeness: every fact must come from a source you actually read; if you can't confirm something, use null or leave it out — never guess. Prefer the official site, The 50 Best (the50.com — theworlds50best.com redirects there), regional 50 Best lists (Asia's / Latin America's / North America's / Middle East & North Africa's / Africa), Guia Michelin, Wikipedia and major press. guide.michelin.com usually loads empty — use press for Michelin facts; do not try to get around bot checks.

## Fields (pt-BR text, plain journalistic tone, no hype adjectives)
- lede: 1–2 sentences introducing the place (what makes it unique).
- founded (year), founders [names], chef {name, bio: 2–3 sentences}.
- history: 2–3 short paragraphs (origin, turning points, how it reached the list).
- cuisine: {style: short label, paragraphs: 2 paragraphs on philosophy, technique, ingredients}.
- dishes: 3–5 signature dishes {name (original name, pt-BR translation in parentheses if useful), desc: one sentence, photo|null}.
- awards: [{year, title}] — Michelin stars (when earned), 50 Best positions in past years (including 2025 if any), regional 50 Best positions, special awards. Include the 2026 position given in your task.
- practical: {price (per person, with currency and the year of the info), reservation, website (official URL), address}.
- gallery: 2–4 photos. sources: [urls you used].

## Photos — only free licenses: Wikimedia Commons first, Unsplash as fallback
Never use photos from the restaurant's site, Instagram, Google or press.
- Commons search: https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&format=json&srsearch=QUERY (try restaurant name, chef name, address/street, neighborhood, building, also Commons categories).
- Metadata: https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1600&format=json&titles=File:XXX → use thumburl as src (strip any utm_ parameters), Artist (plain text), LicenseShortName, ImageDescription.
- Accept a photo only if its description/categories clearly show what you claim. Not from the file name alone.
- hero: must be a LANDSCAPE photo (width > height), attractive and specific: the restaurant (exterior/dining room/kitchen) if one exists; otherwise a characterful view of its neighborhood, village or landscape. Avoid generic traffic/street shots, cars, parking lots, low-res (< 1000px wide) images.
- dish photo: the exact dish at this restaurant if it exists on Commons; otherwise an "illustrative" photo of the main ingredient or generic dish type (illustrative: true). Use null if nothing fitting.
- gallery: restaurant, chef (free photo), neighborhood, region, ingredients. No duplicates of hero/dish photos.
- Unsplash only if you can read the photo page; src images.unsplash.com …?w=1600; license "Unsplash License".
- Each photo object: {src, page (file/photo page URL), author, license, caption (pt-BR, what it shows; for illustrative ones say "imagem ilustrativa"), illustrative (bool)}.

## Short profile (positions 51–100)
If your task says "short profile", keep the same JSON keys but do less:
- lede, chef {name, bio: 1–2 sentences}, history: 1–2 paragraphs, cuisine: style + 1 paragraph.
- dishes: 2–3, photo optional — use null rather than a weak illustrative photo.
- awards and practical as usual; hero: one good landscape photo (or null if nothing decent); gallery: 0–2 photos.
- Aim to finish in about half the time of a full profile.

## Output
Write pretty UTF-8 JSON to `<draft folder>/profiles/<slug>.json` (the draft folder is given in your task; never write straight into src/data/profiles/ — profiles go there only after the photos are checked with `scripts/perfis/conferir_fotos.py`) with keys: slug, lede, hero, founded, founders, chef, history, cuisine, dishes, awards, practical, gallery, sources. Validate it parses.

Final report (short): the path, facts you could NOT confirm or where sources disagree, and photos you're unsure about.
