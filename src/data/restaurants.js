// The 50 Best Restaurants 2026
// 1–50: anunciados em 4 de novembro de 2026, no Teatro Municipal de Lima (Peru).
// 51–100: lista estendida divulgada em 21 de outubro de 2026.
// Fonte das posições: Fine Dining Lovers / The 50 Best.
// Coordenadas são aproximadas (centro da cidade), usadas só para o mapa.

export const COUNTRIES = {
  ES: { name: 'Espanha', continent: 'Europa' },
  TH: { name: 'Tailândia', continent: 'Ásia' },
  DK: { name: 'Dinamarca', continent: 'Europa' },
  MX: { name: 'México', continent: 'América do Norte' },
  CN: { name: 'China', continent: 'Ásia' },
  PE: { name: 'Peru', continent: 'América do Sul' },
  FR: { name: 'França', continent: 'Europa' },
  US: { name: 'Estados Unidos', continent: 'América do Norte' },
  SG: { name: 'Singapura', continent: 'Ásia' },
  BR: { name: 'Brasil', continent: 'América do Sul' },
  KR: { name: 'Coreia do Sul', continent: 'Ásia' },
  DE: { name: 'Alemanha', continent: 'Europa' },
  IT: { name: 'Itália', continent: 'Europa' },
  CL: { name: 'Chile', continent: 'América do Sul' },
  SE: { name: 'Suécia', continent: 'Europa' },
  IN: { name: 'Índia', continent: 'Ásia' },
  AE: { name: 'Emirados Árabes Unidos', continent: 'Ásia' },
  AT: { name: 'Áustria', continent: 'Europa' },
  CO: { name: 'Colômbia', continent: 'América do Sul' },
  ZA: { name: 'África do Sul', continent: 'África' },
  EC: { name: 'Equador', continent: 'América do Sul' },
  CH: { name: 'Suíça', continent: 'Europa' },
  BE: { name: 'Bélgica', continent: 'Europa' },
  AR: { name: 'Argentina', continent: 'América do Sul' },
  MC: { name: 'Mônaco', continent: 'Europa' },
  GB: { name: 'Reino Unido', continent: 'Europa' },
  AU: { name: 'Austrália', continent: 'Oceania' },
  JP: { name: 'Japão', continent: 'Ásia' },
  SI: { name: 'Eslovênia', continent: 'Europa' },
  PT: { name: 'Portugal', continent: 'Europa' },
  TR: { name: 'Turquia', continent: 'Europa' },
  EG: { name: 'Egito', continent: 'África' },
}

export const CONTINENTS = ['Europa', 'Ásia', 'América do Sul', 'América do Norte', 'África', 'Oceania']

// [posição, nome, cidade, país (ISO), lat, lng, notas?]
const RAW = [
  [1, 'Asador Etxebarri', 'Atxondo', 'ES', 43.12, -2.58, { award: 'Melhor restaurante do mundo 2026' }],
  [2, 'Gaggan', 'Bangkok', 'TH', 13.75, 100.5],
  [3, 'Alchemist', 'Copenhague', 'DK', 55.68, 12.57],
  [4, 'Quintonil', 'Cidade do México', 'MX', 19.43, -99.13],
  [5, 'Wing', 'Hong Kong', 'CN', 22.32, 114.17],
  [6, 'The Chairman', 'Hong Kong', 'CN', 22.28, 114.15],
  [7, 'Kjolle', 'Lima', 'PE', -12.05, -77.04],
  [8, 'Kadeau', 'Copenhague', 'DK', 55.67, 12.59],
  [9, 'DiverXO', 'Madri', 'ES', 40.42, -3.7],
  [10, 'Plénitude', 'Paris', 'FR', 48.86, 2.35],
  [11, 'Atomix', 'Nova York', 'US', 40.71, -74.01],
  [12, 'Sorn', 'Bangkok', 'TH', 13.73, 100.57],
  [13, 'Mérito', 'Lima', 'PE', -12.14, -77.02],
  [14, 'Sühring', 'Bangkok', 'TH', 13.72, 100.54],
  [15, 'Odette', 'Singapura', 'SG', 1.29, 103.85],
  [16, 'Tuju', 'São Paulo', 'BR', -23.55, -46.63, { isNew: true, award: 'Highest New Entry Award (maior estreia)' }],
  [17, 'Mingles', 'Seul', 'KR', 37.52, 127.04],
  [18, 'Nusara', 'Bangkok', 'TH', 13.74, 100.49],
  [19, 'Jan', 'Munique', 'DE', 48.14, 11.58],
  [20, 'Piazza Duomo', 'Alba', 'IT', 44.7, 8.03],
  [21, 'Meet the Bund', 'Xangai', 'CN', 31.23, 121.49],
  [22, 'Boragó', 'Santiago', 'CL', -33.45, -70.67],
  [23, 'Vyn', 'Skillinge', 'SE', 55.48, 14.28],
  [24, 'Al Gatto Verde', 'Modena', 'IT', 44.65, 10.93],
  [25, 'Lasai', 'Rio de Janeiro', 'BR', -22.91, -43.17, { prev: 28 }],
  [26, 'Masque', 'Mumbai', 'IN', 19.08, 72.88],
  [27, 'Reale', 'Castel di Sangro', 'IT', 41.78, 14.11],
  [28, 'Trèsind Studio', 'Dubai', 'AE', 25.2, 55.27],
  [29, 'Enigma', 'Barcelona', 'ES', 41.39, 2.17],
  [30, 'Steirereck', 'Viena', 'AT', 48.21, 16.37],
  [31, 'Celele', 'Cartagena', 'CO', 10.39, -75.51],
  [32, 'Potong', 'Bangkok', 'TH', 13.74, 100.51],
  [33, 'Elkano', 'Getaria', 'ES', 43.3, -2.2],
  [34, 'Le Coquillage', 'Saint-Méloir-des-Ondes', 'FR', 48.64, -1.9],
  [35, 'La Colombe', 'Cidade do Cabo', 'ZA', -33.92, 18.42],
  [36, 'Ru Yuan', 'Hangzhou', 'CN', 30.27, 120.16],
  [37, 'Nuema', 'Quito', 'EC', -0.18, -78.47],
  [38, 'Atelier Moessmer Norbert Niederkofler', 'Brunico', 'IT', 46.8, 11.94],
  [39, 'Schloss Schauenstein', 'Fürstenau', 'CH', 46.72, 9.45],
  [40, 'Jordnær', 'Copenhague', 'DK', 55.74, 12.56],
  [41, 'Onjium', 'Seul', 'KR', 37.58, 126.97],
  [42, 'Bozar', 'Bruxelas', 'BE', 50.85, 4.35],
  [43, 'Le Calandre', 'Rubano', 'IT', 45.43, 11.79],
  [44, 'Don Julio', 'Buenos Aires', 'AR', -34.6, -58.38],
  [45, 'Mayta', 'Lima', 'PE', -12.12, -77.03],
  [46, 'El Chato', 'Bogotá', 'CO', 4.71, -74.07],
  [47, 'Le Louis XV-Alain Ducasse à l’Hôtel de Paris', 'Monte Carlo', 'MC', 43.74, 7.43],
  [48, 'Ikoyi', 'Londres', 'GB', 51.51, -0.13],
  [49, 'Naar', 'Kasauli', 'IN', 30.9, 76.97],
  [50, 'Saint Peter', 'Sydney', 'AU', -33.87, 151.21],
  [51, 'Uliassi', 'Senigallia', 'IT', 43.72, 13.22],
  [52, 'La Cime', 'Osaka', 'JP', 34.69, 135.5],
  [53, 'Ling Long', 'Xangai', 'CN', 31.22, 121.45, { isNew: true }],
  [54, 'Nelita', 'São Paulo', 'BR', -23.57, -46.66, { isNew: true }],
  [55, 'Alcalde', 'Guadalajara', 'MX', 20.66, -103.35],
  [56, 'Sazenka', 'Tóquio', 'JP', 35.65, 139.72],
  [57, 'Koan', 'Copenhague', 'DK', 55.69, 12.6],
  [58, 'Frantzén', 'Estocolmo', 'SE', 59.33, 18.07],
  [59, 'Narisawa', 'Tóquio', 'JP', 35.67, 139.72],
  [60, 'Hiša Franko', 'Kobarid', 'SI', 46.25, 13.58],
  [61, 'Florilège', 'Tóquio', 'JP', 35.66, 139.71],
  [62, 'Fu He Hui', 'Xangai', 'CN', 31.21, 121.44],
  [63, 'The Jane', 'Antuérpia', 'BE', 51.22, 4.4],
  [64, 'Seroja', 'Singapura', 'SG', 1.3, 103.84, { isNew: true }],
  [65, 'Fyn', 'Cidade do Cabo', 'ZA', -33.92, 18.42],
  [66, 'Willem Hiele', 'Oudenburg', 'BE', 51.18, 3.0],
  [67, 'Arpège', 'Paris', 'FR', 48.86, 2.32],
  [68, 'Evvai', 'São Paulo', 'BR', -23.56, -46.68],
  [69, 'Cocina Hermanos Torres', 'Barcelona', 'ES', 41.38, 2.14],
  [70, 'Kol', 'Londres', 'GB', 51.51, -0.16],
  [71, 'Salsify at the Roundhouse', 'Cidade do Cabo', 'ZA', -33.95, 18.38],
  [72, 'Eatanic Garden', 'Seul', 'KR', 37.51, 127.06, { isNew: true }],
  [73, 'Chef Tam’s Seasons', 'Macau', 'CN', 22.2, 113.54],
  [74, 'Le Du', 'Bangkok', 'TH', 13.72, 100.52],
  [75, 'Belcanto', 'Lisboa', 'PT', 38.71, -9.14],
  [76, 'Nobelhart & Schmutzig', 'Berlim', 'DE', 52.51, 13.39],
  [77, 'Caprice', 'Hong Kong', 'CN', 22.29, 114.16],
  [78, 'Mosu', 'Seul', 'KR', 37.54, 126.99],
  [79, 'Huniik', 'Mérida', 'MX', 20.97, -89.62],
  [80, 'Txispa', 'Atxondo', 'ES', 43.12, -2.58],
  [81, 'Septime', 'Paris', 'FR', 48.85, 2.38],
  [82, 'Coda', 'Berlim', 'DE', 52.49, 13.43],
  [83, 'The Ledbury', 'Londres', 'GB', 51.52, -0.2, { returning: true }],
  [84, 'Le Doyenné', 'Saint-Vrain', 'FR', 48.54, 2.33],
  [85, 'Tim Raue', 'Berlim', 'DE', 52.51, 13.39],
  [86, 'Eliane', 'Bruxelas', 'BE', 50.84, 4.36, { isNew: true }],
  [87, 'Arca', 'Tulum', 'MX', 20.21, -87.47],
  [88, 'FZN', 'Dubai', 'AE', 25.2, 55.27, { isNew: true }],
  [89, 'Burnt Ends', 'Singapura', 'SG', 1.3, 103.83],
  [90, 'Baan Tepa', 'Bangkok', 'TH', 13.8, 100.6, { isNew: true }],
  [91, 'Den', 'Tóquio', 'JP', 35.67, 139.71],
  [92, 'Lamdre', 'Pequim', 'CN', 39.9, 116.41, { isNew: true }],
  [93, 'SingleThread', 'Healdsburg', 'US', 38.61, -122.87],
  [94, 'Neolokal', 'Istambul', 'TR', 41.02, 28.97],
  [95, 'Mil', 'Cusco', 'PE', -13.33, -72.2],
  [96, 'Rosetta', 'Cidade do México', 'MX', 19.42, -99.16],
  [97, 'Khufu’s', 'Gizé', 'EG', 29.98, 31.13, { isNew: true }],
  [98, 'Labyrinth', 'Singapura', 'SG', 1.29, 103.86],
  [99, 'Fauna', 'Valle de Guadalupe', 'MX', 32.09, -116.57, { returning: true }],
  [100, 'Aponiente', 'El Puerto de Santa María', 'ES', 36.59, -6.23],
]

export const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/&/g, 'e')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const restaurants = RAW.map(([rank, name, city, code, lat, lng, extra = {}]) => ({
  rank,
  name,
  city,
  code,
  country: COUNTRIES[code].name,
  continent: COUNTRIES[code].continent,
  lat,
  lng,
  slug: slugify(name),
  tier: rank <= 50 ? 'top50' : 'ext',
  isNew: !!extra.isNew,
  returning: !!extra.returning,
  award: extra.award || null,
  prev: extra.prev || null,
}))

// minúsculas e sem acento, para a busca achar "sao paulo" em "São Paulo"
export const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

restaurants.forEach((r) => {
  r.search = fold(`${r.name} ${r.city} ${r.country} ${r.continent}`)
})

export const matches = (r, q) => {
  const term = fold(q.trim())
  return !term || r.search.includes(term)
}

export const bySlug =Object.fromEntries(restaurants.map((r) => [r.slug, r]))

export const flagUrl = (code) => `/flags/${code.toLowerCase()}.svg`

export const countBy = (list, key) => {
  const m = new Map()
  list.forEach((r) => m.set(r[key], (m.get(r[key]) || 0) + 1))
  return [...m.entries()].sort((a, b) => b[1] - a[1])
}

export const ord = (n) => `${n}º`
