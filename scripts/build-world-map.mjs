/**
 * Generates src/components/home/worldMap.json and worldMapMeta.js — static SVG
 * path data and marker positions for the homepage trade map.
 *
 * Geography: Natural Earth 1:10m countries, India point-of-view edition (India
 * shown with its officially depicted boundary), via scripts/data/. Everything
 * — land, highlighted countries, graticule and every marker — is projected
 * with the same D3 Natural Earth projection, so markers are computed from real
 * latitude/longitude and align exactly with the geometry. Output is plain
 * strings; no mapping library ships to the browser.
 *
 * Run: node scripts/build-world-map.mjs   (only when the map needs changing)
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { geoNaturalEarth1, geoPath, geoGraticule, geoArea } from 'd3-geo'
import { feature } from 'topojson-client'
import { presimplify, quantile, simplify } from 'topojson-simplify'

const raw = JSON.parse(readFileSync('scripts/data/countries-10m-ind.topo.json', 'utf8'))

// ── simplification ──────────────────────────────────────────────────────────
// Visvalingam: drops the least significant vertices. Arcs belonging to India
// get their weights boosted so its coastline and boundary stay finely detailed
// while the rest of the world stays light.
// Q = fraction of vertices (by significance) to keep for the world; India keeps far more.
const Q = Number(process.env.MAP_Q || 0.02)
const INDIA_BOOST = Number(process.env.INDIA_BOOST || 14)
const pre = presimplify(raw)
const india = pre.objects.countries.geometries.find((g) => g.properties.a3 === 'IND')
const arcIds = new Set()
const collect = (a) => (Array.isArray(a) ? a.forEach(collect) : arcIds.add(a < 0 ? ~a : a))
collect(india.arcs)
for (const i of arcIds) for (const pt of pre.arcs[i]) pt[2] *= INDIA_BOOST
const topo = simplify(pre, quantile(pre, Q))

// ── features, wound the way D3's spherical geometry expects ────────────────
const rewind = (f) => {
  if (geoArea(f) <= 2 * Math.PI) return f
  const flip = (poly) => poly.map((ring) => ring.slice().reverse())
  const g = f.geometry
  const geometry =
    g.type === 'Polygon' ? { ...g, coordinates: flip(g.coordinates) } : { ...g, coordinates: g.coordinates.map(flip) }
  return { ...f, geometry }
}
const features = feature(topo, topo.objects.countries).features.map(rewind)

// ISO 3166-1 alpha-3 codes of the highlighted countries.
const HIGHLIGHT = {
  india: 'IND',
  israel: 'ISR',
  bangladesh: 'BGD',
  turkey: 'TUR',
  egypt: 'EGY',
  vietnam: 'VNM',
  germany: 'DEU',
}

// Marker locations [longitude, latitude]. Origin is Ahmedabad, Gujarat (where
// Ventura is based); destinations are national capitals.
const PLACES = {
  origin: { name: 'Ahmedabad, India', lonlat: [72.5714, 23.0225] },
  germany: { name: 'Germany', lonlat: [13.405, 52.52] }, // Berlin
  turkey: { name: 'Turkey', lonlat: [32.8597, 39.9334] }, // Ankara
  israel: { name: 'Israel', lonlat: [35.2137, 31.7683] }, // Jerusalem
  egypt: { name: 'Egypt', lonlat: [31.2357, 30.0444] }, // Cairo
  bangladesh: { name: 'Bangladesh', lonlat: [90.4125, 23.8103] }, // Dhaka
  vietnam: { name: 'Vietnam', lonlat: [105.8342, 21.0278] }, // Hanoi
}

const W = 1000
const projection = geoNaturalEarth1().fitWidth(W, { type: 'Sphere' })

// Visible regions as lon/lat boxes: wide (desktop) and tight (mobile).
const CROPS = {
  desktop: { lon: [-28, 160], lat: [-46, 72] },
  mobile: { lon: [-26, 126], lat: [-10, 64] },
}

function projectedBox({ lon, lat }) {
  const pts = []
  const n = 60
  for (let i = 0; i <= n; i += 1) {
    const x = lon[0] + ((lon[1] - lon[0]) * i) / n
    const y = lat[0] + ((lat[1] - lat[0]) * i) / n
    pts.push(projection([x, lat[0]]), projection([x, lat[1]]), projection([lon[0], y]), projection([lon[1], y]))
  }
  const xs = pts.map((p) => p[0])
  const ys = pts.map((p) => p[1])
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]
}

const boxes = Object.fromEntries(Object.entries(CROPS).map(([k, v]) => [k, projectedBox(v)]))
const r1 = (n) => Math.round(n * 10) / 10
const viewBox = ([x0, y0, x1, y1]) => `${r1(x0)} ${r1(y0)} ${r1(x1 - x0)} ${r1(y1 - y0)}`

// Clip all geometry to the desktop box (plus margin) so only visible data ships.
const m = 12
const [dx0, dy0, dx1, dy1] = boxes.desktop
projection.clipExtent([
  [dx0 - m, dy0 - m],
  [dx1 + m, dy1 + m],
])
const path = geoPath(projection).digits(1)

const a3Of = (f) => f.properties.a3
const hl = new Set(Object.values(HIGHLIGHT))

const base = features
  .filter((f) => !hl.has(a3Of(f)))
  .map((f) => path(f))
  .filter(Boolean)
  .join('')

const highlights = {}
for (const [key, a3] of Object.entries(HIGHLIGHT)) {
  const f = features.find((x) => a3Of(x) === a3)
  if (!f) throw new Error(`country ${key} (${a3}) not found`)
  highlights[key] = path(f)
}

const graticule = path(geoGraticule().step([15, 15])())

const points = {}
for (const [key, p] of Object.entries(PLACES)) {
  const [x, y] = projection(p.lonlat)
  points[key] = { name: p.name, x: r1(x), y: r1(y), lon: p.lonlat[0], lat: p.lonlat[1] }
}

const header = '// GENERATED by scripts/build-world-map.mjs — do not edit by hand.\n// Natural Earth 1:10m countries (India point-of-view), Natural Earth projection. Public domain.\n\n'
const viewBoxes = Object.fromEntries(Object.entries(boxes).map(([k, b]) => [k, viewBox(b)]))

// Small: loaded with the page (viewBoxes for layout, projected marker positions).
writeFileSync(
  'src/components/home/worldMapMeta.js',
  `${header}export const VIEWBOXES = ${JSON.stringify(viewBoxes)}\n\nexport const POINTS = ${JSON.stringify(points)}\n`,
)

// Large: path data as JSON, imported lazily when the map is about to be seen.
// (JSON keeps the bundler fast — a large JS string literal does not.)
const heavy = JSON.stringify({ BASE_D: base, GRATICULE_D: graticule, HIGHLIGHT_D: highlights })
writeFileSync('src/components/home/worldMap.json', heavy)
console.log('worldMap.json', Math.round(heavy.length / 1024) + ' KB', '| india path', Math.round(highlights.india.length / 1024) + ' KB', viewBoxes)
for (const [k, p] of Object.entries(points)) console.log(k.padEnd(10), p.x, p.y, `(${p.lat}, ${p.lon})`)
