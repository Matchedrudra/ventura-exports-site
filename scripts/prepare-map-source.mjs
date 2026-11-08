/**
 * One-off: converts Natural Earth's 1:10m country boundaries — the *India
 * point-of-view* edition, which shows India's boundary as officially depicted
 * (including Jammu & Kashmir and Ladakh) — into a compact quantised TopoJSON
 * kept in scripts/data/, so the map can be regenerated offline.
 *
 * Source: https://github.com/nvkelso/natural-earth-vector
 *         geojson/ne_10m_admin_0_countries_ind.geojson  (Natural Earth, public domain)
 *
 * Run: node scripts/prepare-map-source.mjs [path-to-geojson]
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { topology } from 'topojson-server'

const URL_SRC =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries_ind.geojson'
const local = process.argv[2]

let text
if (local && existsSync(local)) text = readFileSync(local, 'utf8')
else {
  console.log('downloading', URL_SRC)
  text = await (await fetch(URL_SRC)).text()
}
const gj = JSON.parse(text)

const features = gj.features.map((f) => {
  const p = f.properties
  const a3 = p.ISO_A3 && p.ISO_A3 !== '-99' ? p.ISO_A3 : p.ADM0_A3
  return { type: 'Feature', properties: { a3, name: p.ADMIN }, geometry: f.geometry }
})

const topo = topology({ countries: { type: 'FeatureCollection', features } }, 1e5)
const out = JSON.stringify(topo)
writeFileSync('scripts/data/countries-10m-ind.topo.json', out)
console.log('countries-10m-ind.topo.json', Math.round(out.length / 1024), 'KB,', features.length, 'countries')
