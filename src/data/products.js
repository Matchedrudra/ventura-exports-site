// ─────────────────────────────────────────────────────────────
// Product data.
//
// FIBC construction types, safe working loads, safety factors and
// technical option lists are taken from the reference product
// catalogue supplied by Ventura's manufacturing partner. Where the
// catalogue does not state a value, conservative wording is used
// ("Confirmed per specification") rather than an invented figure.
//
// PP woven, HDPE woven and customized woven packaging are offered as
// sourcing categories; their dimensional and material specifications
// are agreed per enquiry and are intentionally not fixed here.
// ─────────────────────────────────────────────────────────────

export const catalogueYear = '2025–2026'

/** Shared FIBC technical options (reference catalogue). */
export const fibcOptions = [
  {
    key: 'loop',
    title: 'Loop options',
    note: 'Lifting configuration selected for the filling line and handling method.',
    items: [
      'Corner loop',
      'Cross-corner loop',
      'Corner full loop',
      'Cross-corner full loop',
      'D-loop',
      'Tunnel loop',
      'Stevedore loop',
      'Double stevedore loop',
    ],
  },
  {
    key: 'filling',
    title: 'Filling (top) options',
    note: 'Top construction matched to the filling equipment and the product.',
    items: ['Open top', 'Top skirt', 'Top flap', 'Top spout', 'Top spout & flap', 'Conical top spout', 'Duffle top'],
  },
  {
    key: 'discharge',
    title: 'Discharge (bottom) options',
    note: 'Bottom construction matched to the discharge method and flow characteristics.',
    items: ['Flat / closed bottom', 'Bottom skirt', 'Bottom skirt & flap', 'Bottom spout', 'Conical bottom spout'],
  },
  {
    key: 'closure',
    title: 'Spout closures',
    note: 'Closure detail for spouted tops and bottoms.',
    items: ['Star closure', 'Double spout / pyjama closure', 'Tie / rope closure'],
  },
  {
    key: 'liner',
    title: 'Liner options',
    note: 'Inserted where a moisture, fine-powder or product-contact barrier is required.',
    items: ['Loose / loose-fit liner', 'Bottle liner', 'Baffle liner', 'Tabbed liner'],
  },
  {
    key: 'fabric',
    title: 'Fabric & finish',
    note: 'Coated fabric where a tighter weave barrier is needed; uncoated where breathability is preferred.',
    items: ['Coated PP fabric', 'Uncoated PP fabric', 'UV-stabilised fabric', 'Document pocket', 'Filler cord'],
  },
  {
    key: 'printing',
    title: 'Printing',
    note: 'Flexographic printing with UV-resistant inks.',
    items: ['Up to 2 colours', 'UV-resistant inks', 'Artwork to buyer specification'],
  },
]

/** FIBC construction types (reference catalogue). */
export const fibcTypes = [
  {
    slug: 'u-panel',
    name: 'U-Panel Jumbo Bag',
    construction: 'U-panel body',
    swl: '500–2000 kg',
    safetyFactor: '5:1 or 6:1',
    features: [
      'Corner-loop construction with reinforced stitching',
      'Even load distribution for stable stacking',
      'Available in coated or uncoated fabric',
    ],
    applications: ['Chemicals', 'Agriculture', 'Minerals', 'Food products'],
  },
  {
    slug: 'baffle-q-bag',
    name: 'Baffle Bag (Q-Bag)',
    construction: 'Baffled body',
    swl: '500–2000 kg',
    safetyFactor: '5:1 or 6:1',
    features: [
      'Sewn-in polypropylene baffles',
      'Holds a square shape and resists bulging in transit',
      'Cost-effective, dust-controlled design',
    ],
    applications: ['Chemicals', 'Agriculture', 'Construction materials', 'Food grains'],
  },
  {
    slug: 'circular',
    name: 'Circular Jumbo Bag',
    construction: 'Tubular (circular) woven body',
    swl: '500–2000 kg',
    safetyFactor: '5:1 or 6:1',
    features: [
      'Tubular fabric with no side seams — stronger and more dust-tight',
      'Double-wrap corner reinforcement loops',
      'Added tear resistance through the lifting regions',
    ],
    applications: ['Fine powders', 'Food-grade products', 'Minerals'],
  },
  {
    slug: 'sling-bag',
    name: 'Sling Bag (2-Loop / 4-Loop)',
    construction: 'Sling body, with or without side panels',
    swl: '500–2000 kg',
    safetyFactor: '5:1 or 6:1',
    features: [
      'Strong PP fabric, panelled or panel-free',
      'Built for safe handling of dense, heavy loads',
      'Tested for repeated lifting duty',
    ],
    applications: ['Building materials', 'Fertilizers', 'Chemicals', 'Agriculture'],
  },
  {
    slug: 'un-certified',
    name: 'UN Certified Bag',
    construction: 'Certified body for dangerous goods',
    swl: '500–2000 kg',
    safetyFactor: '5:1 or 6:1',
    features: [
      'UN tested and certified for the transport of hazardous goods',
      'Abrasion-, UV- and water-resistant PP fabric',
      'Suitable for chemical and hazardous material handling',
    ],
    applications: ['Dangerous goods movement under UN regulations'],
  },
  {
    slug: 'type-c',
    name: 'Type-C (Conductive / Antistatic) Bag',
    construction: 'Groundable conductive body',
    swl: '500–2000 kg',
    safetyFactor: '5:1 or 6:1',
    features: [
      'Conductive threads interwoven through the fabric for grounding',
      'Controls static build-up during filling and discharge',
      'Optional antistatic coating for sensitive products',
    ],
    applications: ['Pharmaceuticals', 'Electronics', 'Explosives', 'Flammable substances'],
  },
]

// ─────────────────────────────────────────────────────────────
//  Product categories
// ─────────────────────────────────────────────────────────────

export const products = [
  {
    index: '01',
    slug: 'fibc-jumbo-bags',
    name: 'FIBC / Jumbo Bags',
    shortName: 'FIBC / Jumbo Bags',
    kicker: 'Flexible intermediate bulk containers',
    tagline: 'Bulk bags built around the load, the filling line and the route.',
    summary:
      'U-panel, baffle, circular, sling, UN certified and Type-C construction, specified with the loop, filling, discharge, liner and printing options your operation needs.',
    image: '/images/product-fibc.jpg',
    imageAlt: 'A plant worker opening a filled FIBC bulk bag during discharge',
    catalogueBacked: true,
    intro: [
      'FIBC — flexible intermediate bulk containers, or jumbo bags — move dry, flowable products in volumes of roughly half a tonne to two tonnes per unit. The right bag is a set of decisions: body construction, safe working load, safety factor, how it is lifted, how it is filled, how it is discharged, whether it needs a liner, and how it is printed.',
      'Ventura coordinates those decisions with the manufacturing partner before production begins, so the bag that arrives matches the filling equipment, the product and the handling method at both ends.',
    ],
    specs: [
      { label: 'Product type', value: 'FIBC / jumbo bag' },
      { label: 'Construction', value: 'U-panel · Baffle (Q) · Circular · Sling · UN certified · Type-C' },
      { label: 'Safe working load', value: '500–2000 kg' },
      { label: 'Safety factor', value: '5:1 or 6:1' },
      { label: 'Fabric', value: 'Coated or uncoated PP woven; UV-stabilised on request' },
      { label: 'Dimensions', value: 'Confirmed per specification' },
      { label: 'Liner', value: 'Loose, bottle, baffle or tabbed — where required' },
      { label: 'Printing', value: 'Up to 2 colours, UV-resistant inks' },
    ],
    applications: [
      'Chemicals & petrochemicals',
      'Minerals & aggregates',
      'Agriculture & food grains',
      'Fertilizers',
      'Construction materials',
      'Pharmaceutical & fine powders',
    ],
    hasTypes: true,
    hasOptions: true,
  },
  {
    index: '02',
    slug: 'pp-woven-bags',
    name: 'PP Woven Bags',
    shortName: 'PP Woven Bags',
    kicker: 'Polypropylene woven sacks',
    tagline: 'Woven polypropylene sacks for 5–50 kg packing lines.',
    summary:
      'Woven PP sacks for granular and powdered products, specified with lamination, liner, print and closure to suit the packing line and the destination.',
    image: '/images/product-pp-woven.jpg',
    imageAlt: 'Filled woven polypropylene sacks stacked on a pallet',
    catalogueBacked: false,
    intro: [
      'PP woven bags carry granular and powdered products in retail and industrial pack sizes. They are strong for their weight, hold print well and can be laminated or lined where the product needs a closer barrier.',
      'Ventura coordinates the specification — fabric weight, dimensions, lamination, liner, print and closure — with the manufacturing partner against your product and the requirements of the destination market.',
    ],
    specs: [
      { label: 'Product type', value: 'PP woven bag / sack' },
      { label: 'Bag style', value: 'Open-mouth or valve — confirmed per specification' },
      { label: 'Fabric weight (GSM)', value: 'To buyer specification' },
      { label: 'Dimensions', value: 'To buyer specification' },
      { label: 'Lamination', value: 'Laminated or unlaminated' },
      { label: 'Liner', value: 'LDPE / HM liner where required' },
      { label: 'Printing', value: 'Flexographic — colours to artwork' },
      { label: 'Closure', value: 'Heat-cut & hemmed, stitched or heat-sealed' },
    ],
    applications: [
      'Agricultural produce & seeds',
      'Fertilizers & soil products',
      'Cement & construction dry mixes',
      'Minerals & chemicals in pack sizes',
      'Animal feed',
      'Food grains, rice, flour, sugar',
    ],
    hasTypes: false,
    hasOptions: false,
  },
  {
    index: '03',
    slug: 'hdpe-woven-bags',
    name: 'HDPE Woven Bags',
    shortName: 'HDPE Woven Bags',
    kicker: 'High-density polyethylene woven sacks',
    tagline: 'HDPE woven sacks where a tighter, stiffer weave is preferred.',
    summary:
      'High-density polyethylene woven sacks for demanding filling and stacking conditions, with lamination and print coordinated to the application.',
    image: '/images/product-hdpe-woven.jpg',
    imageAlt: 'Operator handling a roll of woven fabric in a bag-converting plant',
    catalogueBacked: false,
    intro: [
      'HDPE woven sacks use a high-density polyethylene tape yarn that gives a stiffer, tighter weave than standard PP. They are chosen where the product is sharp or dense, where sacks are stacked high, or where a firmer bag body helps the packing line.',
      'As with PP woven, Ventura coordinates fabric weight, size, lamination, liner and print with the manufacturing partner against the product and the destination.',
    ],
    specs: [
      { label: 'Product type', value: 'HDPE woven bag / sack' },
      { label: 'Bag style', value: 'Open-mouth or valve — confirmed per specification' },
      { label: 'Fabric weight (GSM)', value: 'To buyer specification' },
      { label: 'Dimensions', value: 'To buyer specification' },
      { label: 'Lamination', value: 'Laminated or unlaminated' },
      { label: 'Liner', value: 'Inner liner where required' },
      { label: 'Printing', value: 'Flexographic — colours to artwork' },
      { label: 'Closure', value: 'Stitched, heat-sealed or as specified' },
    ],
    applications: [
      'Cement & construction materials',
      'Minerals & ores',
      'Fertilizers',
      'Chemicals in pack sizes',
      'Aggregates & sand',
      'Agricultural bulk produce',
    ],
    hasTypes: false,
    hasOptions: false,
  },
  {
    index: '04',
    slug: 'customized-woven-packaging',
    name: 'Customized / Laminated Woven Packaging',
    shortName: 'Customized Woven Packaging',
    kicker: 'Built around your specification',
    tagline: 'A packaging brief, coordinated end to end with the manufacturing partner.',
    summary:
      'Where a standard bag does not fit, Ventura works from your written specification — dimensions, material, construction, print, lamination, liner, filling and discharge, packing and destination requirements.',
    image: '/images/product-customized.jpg',
    imageAlt: 'Rolls of laminated woven material on factory racking',
    catalogueBacked: false,
    intro: [
      'Not every requirement matches a catalogue item. Customized woven packaging starts from a written brief and is coordinated with the manufacturing partner as a single specification.',
      'The more precise the brief, the tighter the quotation and the production sample. Ventura helps structure that brief and holds it consistent from enquiry through dispatch.',
    ],
    specBrief: [
      'Dimensions & finished capacity',
      'Material & fabric weight (GSM)',
      'Body construction',
      'Printing & artwork',
      'Lamination',
      'Liner requirement',
      'Filling method',
      'Discharge method',
      'Packing & palletisation',
      'Destination market requirements',
    ],
    specs: [
      { label: 'Basis', value: 'Written buyer specification' },
      { label: 'Material', value: 'PP or HDPE woven, laminated or unlaminated' },
      { label: 'Construction', value: 'Coordinated to application' },
      { label: 'Printing', value: 'To artwork; colour count confirmed per specification' },
      { label: 'Sampling', value: 'Pre-production sample where the specification allows' },
      { label: 'Documentation', value: 'Coordinated to the destination market' },
    ],
    applications: [
      'Own-brand retail packaging',
      'Export packing to specific port requirements',
      'Products needing a non-standard size or construction',
      'Combined print, lamination and liner requirements',
    ],
    hasTypes: false,
    hasOptions: false,
  },
]

export function getProduct(slug) {
  return products.find((p) => p.slug === slug)
}
