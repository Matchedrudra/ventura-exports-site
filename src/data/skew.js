// SKEW Heald Industries — product data transcribed from the manufacturer's
// four-page product catalogue, which is the authoritative source for this
// division. Do not add dimensions, materials, standards or compatibility that
// the catalogue does not state; where it is silent the site says "on request".

export const skew = {
  name: 'SKEW Heald Industries',
}

export const skewFeatures = [
  {
    title: 'German-imported stainless steel',
    body: 'Heald wires are made from specially developed German-imported stainless steel.',
  },
  {
    title: 'Up to 1300 RPM',
    body: 'Engineered for stable weaving performance at speeds up to 1300 RPM.',
  },
  {
    title: 'Wear resistance and long life',
    body: 'Designed for superior wear resistance, longer operational life and minimal friction.',
  },
  {
    title: 'Smooth yarn passage',
    body: 'Specially developed eyelet geometry and an optimised profile angle create additional yarn space, reduce yarn pressure and minimise warp breakage.',
  },
  {
    title: 'Higher heald density',
    body: 'Enabling higher heald density, improved weaving efficiency and lower energy consumption, even under demanding conditions.',
  },
  {
    title: 'Quality inspection',
    body: 'Every heald wire undergoes strict quality inspection and precision finishing for consistent performance and dimensional accuracy.',
  },
]

export const compatibleMachines = ['Staubli', 'Groz-Beckert', 'USTER', 'Barber-Colman', 'Vega', 'Todo']

export const compatibilityNote =
  'Suitable for all automatic drawing-in machines, including Staubli, Groz-Beckert, USTER, Barber-Colman, Vega and Todo. All types of heald wires are manufactured as per customer requirements, with complete after-sales support.'

// "Heald wire dimensions" table. Units are millimetres throughout.
export const healdWireDimensions = [
  { type: 'O', config: 'Simplex', lengths: [280, 302, 330], eyelets: ['5.5 × 1.2', '6.5 × 1.8', '7.8 × 3.8'], strips: ['5.5 × 0.3'] },
  { type: 'O', config: 'Duplex', lengths: [260, 280, 302, 330], eyelets: ['5.5 × 1.2'], strips: ['5.5 × 0.3'] },
  { type: 'C', config: 'Simplex', lengths: [280, 331, 382], eyelets: ['5.5 × 1.2', '6.5 × 1.8', '7.8 × 3.8', '8.0 × 2.5', '8.4 × 3.8'], strips: ['5.5 × 0.3'] },
  { type: 'C', config: 'Duplex', lengths: [280, 331, 382], eyelets: ['5.5 × 1.2', '6.4 × 1.5', '6.5 × 1.8'], strips: ['5.5 × 0.3', '6.0 × 0.3', '6.0 × 7.2 × 0.3'] },
  { type: 'J', config: 'Simplex', lengths: [280, 331, 382], eyelets: ['5.5 × 1.2', '6.5 × 1.8', '7.8 × 3.8', '8.0 × 2.5', '8.4 × 3.8'], strips: ['5.5 × 0.3'] },
  { type: 'J', config: 'Duplex', lengths: [280, 331, 382], eyelets: ['5.5 × 1.2', '6.4 × 1.5', '6.5 × 1.8'], strips: ['5.5 × 0.3', '6.0 × 0.3', '6.0 × 7.2 × 0.3'] },
]

// "Eye size recommendation from common yarn sizes". Each yarn-size column
// carries the same yarn expressed in four systems.
export const yarnSizes = [
  { denier: 46, nm: '200', tex: 5, ne: 120 },
  { denier: 92, nm: '100', tex: 10, ne: 60 },
  { denier: 137, nm: '66', tex: 15, ne: 40 },
  { denier: 275, nm: '33', tex: 30, ne: 20 },
  { denier: 460, nm: '20', tex: 50, ne: 12 },
  { denier: 650, nm: '14', tex: 72, ne: 8 },
  { denier: 900, nm: '10', tex: 100, ne: 6 },
  { denier: 1800, nm: '5', tex: 200, ne: 3 },
  { denier: 2600, nm: '3.4', tex: 300, ne: 2 },
]

// Indices into `yarnSizes` for which each eye size is recommended.
export const eyeSizeRecommendations = {
  spun: [
    { eye: '5.5 × 1.2', fits: [0, 1, 2, 3] },
    { eye: '6.5 × 1.8', fits: [2, 3, 4, 5] },
    { eye: '8.0 × 2.5', fits: [4, 5, 6, 7, 8] },
  ],
  filament: [
    { eye: '5.5 × 1.2', fits: [0, 1, 2, 3] },
    { eye: '6.5 × 1.8', fits: [2, 3, 4, 5, 6] },
    { eye: '8.0 × 2.5', fits: [4, 5, 6, 7, 8] },
  ],
}

// Enquiry product types (must match PRODUCT_TYPES in lib/validation.js).
export const skewProducts = [
  {
    slug: 'skew-heald-wires',
    name: 'Skew Heald Wires',
    enquiry: 'Skew Heald Wires',
    blurb:
      'The core of the range: heald wires in O, C and J types, each in simplex and duplex, with the eyelet and strip sizes listed in the dimension tables.',
    note: 'Dimensions below',
  },
  {
    slug: 'o-type-heald-wires',
    name: 'O-Type Heald Wires',
    enquiry: 'O-Type Heald Wires',
    blurb: 'Simplex in 280, 302 and 330 mm; duplex in 260, 280, 302 and 330 mm.',
    note: 'See table',
  },
  {
    slug: 'c-type-heald-wires',
    name: 'C-Type Heald Wires',
    enquiry: 'C-Type Heald Wires',
    blurb: 'Simplex and duplex in 280, 331 and 382 mm, with a wider choice of eyelet sizes.',
    note: 'See table',
  },
  {
    slug: 'j-type-heald-wires',
    name: 'J-Type Heald Wires',
    enquiry: 'J-Type Heald Wires',
    blurb: 'Simplex and duplex in 280, 331 and 382 mm, with the same eyelet and strip options as the C type.',
    note: 'See table',
  },
  {
    slug: 'leno-healds',
    name: 'Leno Healds',
    enquiry: 'Leno Healds',
    blurb:
      'Manufactured for smooth yarn control, accurate crossing motion and consistent weaving performance. Precision forming and fine surface finishing reduce friction and give stable running.',
    note: 'Dimensions on request',
  },
  {
    slug: 'magnetic-leno-heald-doup',
    name: 'Magnetic Leno Heald Doup',
    enquiry: 'Magnetic Leno Heald Doup',
    blurb:
      'Leno doup produced to the same standard of yarn control and finishing, for demanding weaving conditions.',
    note: 'Dimensions on request',
  },
  {
    slug: 'drop-wires',
    name: 'Drop Wires',
    enquiry: 'Drop Wires',
    blurb:
      'Produced with strict dimensional control and durable finishing for reliable performance, long service life and smooth operation across modern weaving applications.',
    note: 'Dimensions on request',
  },
  {
    slug: 'ridderless-healds',
    name: 'Ridderless Healds',
    enquiry: 'Ridderless Healds',
    blurb: 'Part of the SKEW range. Send your machine details and requirement for specifications.',
    note: 'Specifications on request',
  },
]
