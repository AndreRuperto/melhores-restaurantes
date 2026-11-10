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
const summary = { profiles: 0, covers: 0, facades: 0, photoReferences: 0, featuredPlacePhotos: 0, galleries: 0, dishes: 0, dishesWithPhotos: 0, chefBios: 0, practical: 0, reviewMeta: 0, photosWithRights: 0 }

// Contrato de metadados da Fase 2 (plano, seções 4.3 e 4.4). Os campos são opcionais no
// acervo; um perfil que declara verificationStatus passa a exigir o contrato completo.
const today = new Date().toISOString().slice(0, 10)
const ENUMS = {
  verificationStatus: ['pending', 'partial', 'verified', 'needs-review'],
  imageStatus: ['pending', 'licensed-real', 'historical-or-context', 'reference-only', 'none'],
  reviewStatus: ['confirmed', 'divergent', 'single-source', 'unverified'],
  reservationMode: ['online', 'phone', 'email', 'contact', 'unknown'],
  kind: ['facade', 'interior', 'chef', 'dish', 'building', 'context'],
  rightsStatus: ['pending', 'approved', 'rejected'],
}
const REAL_KINDS = new Set(['facade', 'interior', 'chef', 'dish'])
const isDate = (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(`${v}T00:00:00Z`)) && new Date(`${v}T00:00:00Z`).toISOString().startsWith(v)
const isPartialDate = (v) => typeof v === 'string' && (/^\d{4}$/.test(v) || /^\d{4}-\d{2}$/.test(v) || isDate(v))
const isHttps = (v) => { try { return new URL(v).protocol === 'https:' } catch { return false } }
const isText = (v) => typeof v === 'string' && v.trim().length > 0
const checkDate = (v, label, push, { nullable = false } = {}) => {
  if (v === undefined) return
  if (v === null) { if (!nullable) push(`${label} não pode ser nulo`); return }
  if (!isDate(v)) push(`${label} não é data ISO (AAAA-MM-DD): ${v}`)
  else if (v > today) push(`${label} no futuro: ${v}`)
}
const checkEnum = (v, name, label, push) => {
  if (v !== undefined && !ENUMS[name].includes(v)) push(`${label} fora do vocabulário (${ENUMS[name].join(', ')}): ${v}`)
}

function validateReviewMeta(p, file, photos, push, warn) {
  const strict = p.verificationStatus !== undefined
  const e = (msg) => push(`${msg}: ${file}`)
  checkEnum(p.verificationStatus, 'verificationStatus', 'verificationStatus', e)
  checkEnum(p.imageStatus, 'imageStatus', 'imageStatus', e)
  checkDate(p.lastReviewedAt, 'lastReviewedAt', e, { nullable: true })

  if (p.fieldReviews !== undefined) {
    if (!Array.isArray(p.fieldReviews)) e('fieldReviews deve ser lista')
    else p.fieldReviews.forEach((r, i) => {
      const at = `fieldReviews[${i}]`
      if (!isText(r?.field)) e(`${at} sem field`)
      if (!isHttps(r?.sourceUrl)) e(`${at} sem sourceUrl HTTPS`)
      checkDate(r?.checkedAt, `${at}.checkedAt`, e)
      if (r?.checkedAt === undefined) e(`${at} sem checkedAt`)
      checkEnum(r?.status, 'reviewStatus', `${at}.status`, e)
      if (r?.status === undefined) e(`${at} sem status`)
      if (r?.status && r.status !== 'confirmed' && !isText(r?.note)) e(`${at} com status ${r.status} exige nota`)
    })
  }

  const x = p.practical || {}
  checkEnum(x.reservationMode, 'reservationMode', 'practical.reservationMode', e)
  if (x.phone !== undefined && x.phone !== null && !/^\+\d[\d\s()-]{5,}$/.test(x.phone)) e(`practical.phone fora do formato internacional (+código): ${x.phone}`)
  if (x.email !== undefined && x.email !== null && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.email)) e(`practical.email inválido: ${x.email}`)
  if (x.reservationMode === 'phone' && !x.phone) e('reservationMode phone exige practical.phone')
  if (x.reservationMode === 'email' && !x.email) e('reservationMode email exige practical.email')
  if (x.reservationMode === 'online' && !isHttps(x.reservationUrl)) e('reservationMode online exige reservationUrl HTTPS')
  if (x.priceDetails !== undefined && x.priceDetails !== null) {
    const d = x.priceDetails
    if (!(d.amount === null || (typeof d.amount === 'number' && d.amount > 0))) e('priceDetails.amount deve ser número positivo ou null')
    if (d.amount !== null && !/^[A-Z]{3}$/.test(d.currency || '')) e('priceDetails.currency deve ser código ISO 4217')
    if (!isText(d.basis)) e('priceDetails sem basis')
    if (!(d.taxesIncluded === null || typeof d.taxesIncluded === 'boolean')) e('priceDetails.taxesIncluded deve ser booleano ou null')
    if (!isHttps(d.sourceUrl)) e('priceDetails sem sourceUrl HTTPS')
    checkDate(d.checkedAt, 'priceDetails.checkedAt', e)
    if (d.checkedAt === undefined) e('priceDetails sem checkedAt')
  }

  const counted = new Set()
  for (const [i, photo] of photos.entries()) {
    const at = `imagem ${i + 1} (${photo.page || photo.src})`
    checkEnum(photo.kind, 'kind', `${at}.kind`, e)
    checkEnum(photo.rightsStatus, 'rightsStatus', `${at}.rightsStatus`, e)
    if (photo.rightsStatus === 'rejected') e(`${at} publicada com direito rejeitado`)
    if (photo.rightsStatus === 'pending') warn(`Imagem publicada com direito pendente: ${file}`)
    if (photo.capturedAt !== undefined && photo.capturedAt !== null && !isPartialDate(photo.capturedAt)) e(`${at}.capturedAt deve ser AAAA, AAAA-MM ou AAAA-MM-DD`)
    checkDate(photo.verifiedAt, `${at}.verifiedAt`, e)
    if (photo.licenseUrl !== undefined && !isHttps(photo.licenseUrl)) e(`${at}.licenseUrl deve ser HTTPS`)
    if (photo.rightsStatus === 'approved') {
      if (!counted.has(photo.page)) { counted.add(photo.page); summary.photosWithRights++ }
      for (const k of ['licenseUrl', 'rightsEvidence', 'attribution', 'verifiedAt']) if (!photo[k]) e(`${at} aprovada sem ${k}`)
    }
    if (strict) for (const k of ['kind', 'subject', 'alt', 'rightsStatus']) if (!isText(photo[k])) e(`${at} sem ${k} (perfil com verificationStatus)`)
  }

  if (!strict) return
  summary.reviewMeta++
  for (const k of ['lastReviewedAt', 'imageStatus', 'fieldReviews']) if (p[k] === undefined) e(`perfil com verificationStatus sem ${k}`)
  if (!x.reservationMode) e('perfil com verificationStatus sem practical.reservationMode')
  const real = photos.some((ph) => REAL_KINDS.has(ph.kind) && ph.rightsStatus === 'approved')
  if (p.imageStatus === 'licensed-real' && !real) e('imageStatus licensed-real sem foto real do estabelecimento com direito aprovado')
  if (p.imageStatus === 'reference-only' && (photos.length || !p.photoReference?.url)) e('imageStatus reference-only exige photoReference e nenhuma foto incorporada')
  if (p.imageStatus === 'none' && photos.length) e('imageStatus none com fotos incorporadas')
  if (p.imageStatus === 'historical-or-context' && real) warn(`imageStatus historical-or-context com foto real aprovada: ${file}`)
  if (p.verificationStatus === 'verified') {
    if (!p.lastReviewedAt) e('verified exige lastReviewedAt')
    if (!p.fieldReviews?.length || p.fieldReviews.some((r) => r.status !== 'confirmed')) e('verified exige todas as fieldReviews confirmadas')
    if (p.imageStatus === 'pending' || photos.some((ph) => ph.rightsStatus !== 'approved')) e('verified exige imagens com direito aprovado')
  }
}

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
  validateReviewMeta(p, file, photos, (m) => errors.push(m), (m) => warnings.push(m))
  if (p.hero?.src) summary.covers++
  if (p.facade?.src) summary.facades++
  if (p.photoReference?.url) {
    summary.photoReferences++
    try {
      if (new URL(p.photoReference.url).protocol !== 'https:') warnings.push(`Referência externa não HTTPS: ${file}`)
    } catch { errors.push(`URL de referência externa inválida: ${file}`) }
    if (!p.photoReference.publisher || !p.photoReference.note) errors.push(`Referência externa sem editor ou descrição: ${file}`)
    if (p.photoReference.additionalSources !== undefined) {
      if (!Array.isArray(p.photoReference.additionalSources)) {
        errors.push(`Fontes fotográficas adicionais inválidas: ${file}`)
      } else {
        const urls = new Set()
        for (const source of p.photoReference.additionalSources) {
          if (!source?.publisher || !source?.url || !source?.note) {
            errors.push(`Fonte fotográfica sem publicação, URL ou descrição: ${file}`)
            continue
          }
          try {
            if (new URL(source.url).protocol !== 'https:') errors.push(`Fonte fotográfica não HTTPS: ${file}`)
          } catch { errors.push(`URL fotográfica inválida: ${file}`) }
          if (urls.has(source.url)) warnings.push(`Fonte fotográfica duplicada: ${file}`)
          urls.add(source.url)
        }
      }
    }
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
