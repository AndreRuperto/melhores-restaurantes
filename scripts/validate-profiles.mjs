import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { restaurants } from '../src/data/restaurants.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dir = resolve(root, 'src/data/profiles')
const errors = []
const warnings = []
const allFiles = readdirSync(dir).filter((file) => file.endsWith('.json'))
const expected = new Set(restaurants.map((r) => `${r.slug}.json`))
const summary = { profiles: 0, covers: 0, facades: 0, photoReferences: 0, featuredPlacePhotos: 0, galleries: 0, dishes: 0, dishesWithPhotos: 0, chefBios: 0, practical: 0 }

for (const r of restaurants) {
  const file = `${r.slug}.json`
  const path = resolve(dir, file)
  if (!existsSync(path)) {
    errors.push(`Sem arquivo para #${r.rank} ${r.name} (${file})`)
    continue
  }
  let p
  try { p = JSON.parse(readFileSync(path, 'utf8')) } catch (e) {
    errors.push(`JSON inválido: ${file} (${e.message})`)
    continue
  }
  summary.profiles++
  if (p.slug && p.slug !== r.slug) errors.push(`Slug divergente: ${file}`)
  if (p.rank && p.rank !== r.rank) errors.push(`Posição divergente: ${file}`)
  if (!p.lede || !p.lede.trim()) errors.push(`Sem apresentação: ${file}`)
  if (!Array.isArray(p.history) || !p.history.length) errors.push(`Sem história: ${file}`)
  if (!Array.isArray(p.cuisine?.paragraphs) || !p.cuisine.paragraphs.length) errors.push(`Sem descrição da cozinha: ${file}`)
  if (!Array.isArray(p.sources) || !p.sources.length) errors.push(`Sem fontes: ${file}`)
  for (const source of p.sources || []) {
    try {
      if (new URL(source).protocol !== 'https:') warnings.push(`Fonte não HTTPS: ${file}`)
    } catch { errors.push(`Fonte inválida: ${file} (${source})`) }
  }

  const photos = [p.hero, p.facade, ...(p.gallery || []), ...(p.dishes || []).map((d) => d.photo)].filter(Boolean)
  for (const photo of photos) {
    if (!photo.src || !photo.page || !photo.author || !photo.license || !photo.caption) {
      errors.push(`Imagem sem URL, autoria, licença ou legenda: ${file}`)
    }
  }
  if (p.hero?.src) summary.covers++
  if (p.facade?.src) summary.facades++
  if (p.photoReference?.url) {
    summary.photoReferences++
    try {
      if (new URL(p.photoReference.url).protocol !== 'https:') warnings.push(`Referência externa não HTTPS: ${file}`)
    } catch { errors.push(`URL de referência externa inválida: ${file}`) }
    if (!p.photoReference.publisher || !p.photoReference.note) errors.push(`Referência externa sem editor ou descrição: ${file}`)
    const index = p.photoReference.featuredGalleryIndex
    if (index !== undefined) {
      if (!Number.isInteger(index) || !p.gallery?.[index]?.src) {
        errors.push(`Índice de fotografia destacada inválido: ${file}`)
      } else if (!p.gallery[index].page || !p.gallery[index].author || !p.gallery[index].license) {
        errors.push(`Fotografia destacada sem licença ou crédito: ${file}`)
      } else {
        summary.featuredPlacePhotos++
        if (!p.photoReference.previewContext) errors.push(`Fotografia destacada sem explicação do contexto: ${file}`)
      }
    }
  }
  if (p.gallery?.length) summary.galleries++
  summary.dishes += p.dishes?.length || 0
  summary.dishesWithPhotos += (p.dishes || []).filter((d) => d.photo?.src).length
  if (p.chef?.bio) summary.chefBios++
  if (p.practical && Object.values(p.practical).some(Boolean)) summary.practical++

  if (!p.hero?.src) warnings.push(`Foto de capa pendente: ${file}`)
  if (!p.practical?.address || !p.practical?.website) warnings.push(`Dados práticos parciais: ${file}`)
}

for (const file of allFiles) {
  if (!expected.has(file)) warnings.push(`Perfil fora do ranking: ${file}`)
}

console.log('Auditoria de A Carta — perfis dos 100 restaurantes')
console.table(summary)
console.log(`Avisos editoriais (não bloqueiam o build): ${warnings.length}`)
for (const w of warnings.slice(0, 12)) console.log('  -', w)
if (warnings.length > 12) console.log(`  ... mais ${warnings.length - 12} avisos`)
if (errors.length) {
  console.error(`Erros estruturais: ${errors.length}`)
  for (const e of errors) console.error('  -', e)
  process.exitCode = 1
} else {
  console.log('Estrutura dos perfis válida. Observação: não substitui revisão factual, visual e de licenças.')
}
