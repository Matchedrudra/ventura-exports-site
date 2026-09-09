// ─────────────────────────────────────────────────────────────
// Product data — the single source of truth for the portfolio.
//
// FIBC construction types, safe working loads, safety factors and
// technical option lists follow the reference product catalogue held by
// Ventura's manufacturing partner. Where a value depends on the buyer's
// requirement it is written as "configured to requirement" rather than an
// invented figure. Woven-sack, BOPP, corrugated and filter-bag
// specifications are developed per enquiry and are intentionally not
// fixed here.
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

/** FIBC construction types. SWL / safety-factor ranges follow the reference catalogue. */
export const fibcTypes = [
  {
    slug: 'standard',
    name: 'Standard Bag',
    construction: 'Four-panel body with corner loops',
    swl: '500–2000 kg',
    safetyFactor: '5:1 or 6:1',
    features: [
      'Four side panels stitched to a base',
      'Corner loops for fork or crane handling',
      'The general-purpose configuration for most dry bulk products',
    ],
    applications: ['Chemicals', 'Minerals', 'Agriculture', 'Construction materials'],
  },
  {
    slug: 'u-panel',
    name: 'U-Panel Bag',
    construction: 'U-panel body',
    swl: '500–2000 kg',
    safetyFactor: '5:1 or 6:1',
    features: [
      'One fabric piece forms the base and two side panels',
      'Even load distribution for stable stacking',
      'Available in coated or uncoated fabric',
    ],
    applications: ['Chemicals', 'Agriculture', 'Minerals', 'Food products'],
  },
  {
    slug: 'circular',
    name: 'Circular Bag',
    construction: 'Tubular (circular) woven body',
    swl: '500–2000 kg',
    safetyFactor: '5:1 or 6:1',
    features: [
      'Tubular fabric with no side seams — stronger and more dust-tight',
      'Holds a rounder profile under load',
      'Suited to fine powders and food-grade products',
    ],
    applications: ['Fine powders', 'Food-grade products', 'Minerals'],
  },
  {
    slug: 'baffle',
    name: 'Baffle Bag (Q-Bag)',
    construction: 'Baffled body',
    swl: '500–2000 kg',
    safetyFactor: '5:1 or 6:1',
    features: [
      'Sewn-in baffles hold a square shape and resist bulging in transit',
      'Better container and warehouse cube utilisation',
      'Cost-effective, dust-controlled design',
    ],
    applications: ['Chemicals', 'Agriculture', 'Construction materials', 'Food grains'],
  },
  {
    slug: 'tunnel-lift',
    name: 'Tunnel Lift Bag',
    construction: 'Body with fabric hem tunnels at the top',
    swl: '500–2000 kg',
    safetyFactor: '5:1 or 6:1',
    features: [
      'Fork tines or a bar pass through hemmed tunnels for lifting',
      'No projecting loops — a lower packed profile',
      'Handled by forklift rather than crane',
    ],
    applications: ['Building materials', 'Aggregates', 'Fertilizers'],
  },
  {
    slug: 'full-loop',
    name: 'Full Loop Bag',
    construction: 'Loops wrapped fully down the side panels',
    swl: '500–2000 kg',
    safetyFactor: '5:1 or 6:1',
    features: [
      'Lifting loops run down and around the body for load transfer',
      'Chosen for heavier or denser products',
      'Available cross-corner or side-positioned',
    ],
    applications: ['Minerals', 'Metals & ores', 'Dense chemicals'],
  },
  {
    slug: 'conductive',
    name: 'Conductive Bag (Type-C)',
    construction: 'Groundable conductive body',
    swl: '500–2000 kg',
    safetyFactor: '5:1 or 6:1',
    features: [
      'Conductive threads interwoven through the fabric',
      'Bag is grounded during filling and discharge to control static',
      'For flammable products and flammable-atmosphere areas',
    ],
    applications: ['Flammable powders', 'Chemicals', 'Explosives-adjacent handling'],
  },
  {
    slug: 'dissipative',
    name: 'Dissipative Bag (Type-D)',
    construction: 'Antistatic body without a ground connection',
    swl: '500–2000 kg',
    safetyFactor: '5:1 or 6:1',
    features: [
      'Fabric safely dissipates static without being grounded',
      'Used where a reliable earth connection cannot be assured',
      'For sensitive or flammable products',
    ],
    applications: ['Pharmaceuticals', 'Fine chemicals', 'Combustible dusts'],
  },
]

/** Filter-bag types and media — presented as configurable categories, not fixed specs. */
export const filterBagTypes = [
  { name: 'Pulse-jet filter bags', note: 'For pulse-jet cleaned baghouses; used with a support cage.' },
  { name: 'Reverse-air filter bags', note: 'For low-pressure reverse-air cleaning systems.' },
  { name: 'Shaker filter bags', note: 'For mechanical-shaker dust collectors.' },
  { name: 'Dust collector / baghouse bags', note: 'General industrial dust collection across process plant.' },
  { name: 'Customized filter bags', note: 'Dimensions, finish and fittings built to the equipment.' },
]

export const filterMedia = [
  { name: 'Polyester', note: 'General dust collection at moderate temperatures.' },
  { name: 'Polypropylene', note: 'Moist or chemically aggressive low-temperature streams.' },
  { name: 'PPS', note: 'Higher-temperature streams with acid gas content.' },
  { name: 'Aramid', note: 'Sustained high operating temperatures.' },
  { name: 'PTFE', note: 'Aggressive chemical and high-temperature environments.' },
  { name: 'PTFE membrane finish', note: 'Surface filtration for fine or sticky dusts, applied to a base media.' },
]

// ─────────────────────────────────────────────────────────────
//  Product categories (portfolio)
// ─────────────────────────────────────────────────────────────

export const products = [
  {
    index: '01',
    slug: 'fibc-jumbo-bags',
    name: 'FIBC / Jumbo Bags',
    shortName: 'FIBC / Jumbo Bags',
    group: 'Bulk packaging',
    kicker: 'Flexible intermediate bulk containers',
    tagline: 'Flexible bulk packaging built around application, load and handling requirements.',
    summary:
      'Standard, circular, tunnel-lift, baffle, U-panel, full-loop, conductive and dissipative construction — configured with the loop, filling, discharge, liner, coating and printing your operation needs.',
    image: '/images/ventura_fibc_types.jpg',
    imageAlt: 'FIBC construction types — standard, circular, tunnel-lift, baffle, U-panel, full-loop, conductive and dissipative',
    heroRatio: '2 / 1',
    heroFit: 'contain',
    catalogueBacked: true,
    intro: [
      'FIBC — flexible intermediate bulk containers, or jumbo bags — move dry, flowable products in volumes of roughly half a tonne to two tonnes per unit. The right bag is a set of decisions: body construction, safe working load, safety factor, how it is lifted, how it is filled, how it is discharged, whether it needs a liner, and how it is printed.',
      'Ventura coordinates those decisions with the manufacturing partner before production begins, so the bag that arrives matches the filling equipment, the product and the handling method at both ends.',
    ],
    specs: [
      { label: 'Construction', value: 'Standard · Circular · Tunnel-lift · Baffle · U-panel · Full-loop · Conductive · Dissipative' },
      { label: 'Safe working load', value: '500–2000 kg' },
      { label: 'Safety factor', value: '5:1 or 6:1' },
      { label: 'Fabric / GSM', value: 'Coated or uncoated PP woven; GSM to specification' },
      { label: 'Dimensions', value: 'Configured to requirement' },
      { label: 'Top / bottom', value: 'Spout, skirt, flap or flat — per filling and discharge method' },
      { label: 'Liner', value: 'Loose, bottle, baffle or tabbed — where required' },
      { label: 'Coating', value: 'Coated fabric where a tighter barrier is needed' },
      { label: 'Printing', value: 'Up to 2 colours, UV-resistant inks' },
      { label: 'Bag weight', value: 'Confirmed against the final specification' },
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
    quoteCta: 'Discuss your FIBC requirement',
  },
  {
    index: '02',
    slug: 'pp-hdpe-woven-bags',
    name: 'PP & HDPE Woven Bags',
    shortName: 'PP & HDPE Woven Bags',
    group: 'Woven packaging',
    kicker: 'Polypropylene & high-density polyethylene sacks',
    tagline: 'Durable woven packaging for agricultural, industrial and commercial applications.',
    summary:
      'Woven PP and HDPE sacks for granular and powdered products in retail and industrial pack sizes, configured with fabric weight, lamination, liner, print and closure to suit the packing line and the destination.',
    image: '/images/ventura_pp_plain_bag_blue.jpg',
    imageAlt: 'A plain woven polypropylene sack',
    catalogueBacked: false,
    intro: [
      'PP and HDPE woven sacks carry granular and powdered products in retail and industrial pack sizes. PP gives a strong, economical sack; HDPE tape yarn gives a stiffer, tighter weave for sharp or dense products and high stacking. Both hold print well and can be laminated or lined where the product needs a closer barrier.',
      'Ventura coordinates the specification — material, fabric weight, dimensions, lamination, liner, print and closure — with the manufacturing partner against your product and the requirements of the destination market.',
    ],
    specs: [
      { label: 'Material', value: 'PP or HDPE woven — selected for the product and duty' },
      { label: 'Bag style', value: 'Open-mouth or valve' },
      { label: 'Fabric weight (GSM)', value: 'To buyer specification' },
      { label: 'Dimensions', value: 'To buyer specification' },
      { label: 'Lamination', value: 'Laminated or unlaminated' },
      { label: 'Liner', value: 'LDPE / HM liner where required' },
      { label: 'Printing', value: 'Flexographic — colours to artwork' },
      { label: 'Closure', value: 'Heat-cut & hemmed, stitched or heat-sealed' },
    ],
    applications: [
      'Agricultural produce, grain & seeds',
      'Fertilizers & soil products',
      'Cement & construction dry mixes',
      'Minerals & chemicals in pack sizes',
      'Animal feed',
      'Sugar, flour, rice & food grains',
    ],
    hasTypes: false,
    hasOptions: false,
  },
  {
    index: '03',
    slug: 'bopp-laminated-bags',
    name: 'BOPP Laminated Bags',
    shortName: 'BOPP Laminated Bags',
    group: 'Woven packaging',
    kicker: 'Printed BOPP-laminated woven sacks',
    tagline: 'High-quality printed woven packaging combining durability with strong product presentation.',
    summary:
      'Woven PP sacks with a BOPP film laminate carrying high-resolution print — for products where shelf presentation, branding and surface protection matter alongside strength.',
    image: '/images/ventura_bopp_waller_bags.jpg',
    imageAlt: 'Printed BOPP-laminated woven sacks — a laminated woven packaging example',
    catalogueBacked: false,
    intro: [
      'A BOPP laminate bonds a printed biaxially-oriented polypropylene film to a woven PP sack. The result carries near-photographic print, resists scuffing and moisture on the surface, and keeps the load strength of a woven bag.',
      'BOPP bags are chosen for branded retail and trade packs — rice, flour, sugar, seed, pet food, cement and building products, fertilizers — where the pack does presentation work as well as protection. Ventura coordinates artwork, film, fabric weight, size and closure with the manufacturing partner.',
    ],
    specs: [
      { label: 'Construction', value: 'Woven PP sack with BOPP film laminate' },
      { label: 'Print', value: 'Rotogravure — multi-colour, artwork to buyer files' },
      { label: 'Finish', value: 'Gloss or matte laminate' },
      { label: 'Fabric weight (GSM)', value: 'To buyer specification' },
      { label: 'Dimensions & pack size', value: 'To buyer specification' },
      { label: 'Bag style', value: 'Open-mouth, box-bottom or as specified' },
      { label: 'Liner', value: 'Inner liner where a closer barrier is required' },
      { label: 'Closure', value: 'Stitched, heat-sealed or as specified' },
    ],
    applications: [
      'Branded rice, flour, sugar & grain retail packs',
      'Seed & agri-input packaging',
      'Cement, wall putty & construction products',
      'Fertilizers & soil conditioners',
      'Pet food & animal feed',
      'Trade packs requiring strong shelf presentation',
    ],
    hasTypes: false,
    hasOptions: false,
  },
  {
    index: '04',
    slug: 'customized-woven-packaging',
    name: 'Customized Woven Packaging',
    shortName: 'Customized Woven Packaging',
    group: 'Woven packaging',
    kicker: 'Configured around your specification',
    tagline: 'Packaging configured around dimensions, material, printing, construction and application requirements.',
    summary:
      'Where a standard bag does not fit, Ventura works from a written brief — dimensions, material, construction, print, lamination, liner, filling and discharge, packing and destination requirements — coordinated as a single specification.',
    image: '/images/ventura_pp_bag_rice_front.jpg',
    imageAlt: 'A printed woven sack — a customized woven packaging example',
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
      { label: 'Construction', value: 'Configured to application' },
      { label: 'Printing', value: 'To artwork; colour count per specification' },
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
  {
    index: '05',
    slug: 'corrugated-boxes-cartons',
    name: 'Corrugated Boxes & Cartons',
    shortName: 'Corrugated Boxes & Cartons',
    group: 'Industrial packaging',
    kicker: 'Corrugated fibreboard packaging',
    tagline: 'Corrugated packaging for industrial, commercial and export applications.',
    summary:
      'Regular slotted cartons, die-cut boxes, heavy-duty and multi-wall corrugated, and custom-size cases — configured by board grade, flute, dimensions, print and closure to the product and the transit route.',
    image: '/images/product-corrugated.jpg',
    imageAlt: 'Plain brown corrugated shipping cartons stacked in warm light',
    catalogueBacked: false,
    intro: [
      'Corrugated boxes are secondary and transit packaging — they protect the product from the packing line to the shelf or the receiving dock. Performance comes from board grade, flute profile, box style and how the box is closed and palletised.',
      'Ventura coordinates corrugated packaging as part of a broader supply — often alongside the primary bag or pack — so the outer case, the print and the pallet plan are specified together.',
    ],
    specs: [
      { label: 'Box styles', value: 'RSC, die-cut, telescopic, tray, heavy-duty & custom' },
      { label: 'Board', value: 'Single, double or triple wall — grade to load & stacking' },
      { label: 'Flute', value: 'B, C, E, BC and other profiles per application' },
      { label: 'Dimensions', value: 'To buyer specification' },
      { label: 'Print', value: 'Flexo or litho-laminate — plain to multi-colour' },
      { label: 'Finishing', value: 'Stitched, glued or taped; handholds & inserts as required' },
    ],
    applications: [
      'Export and transit outer cases',
      'Industrial component & spares packaging',
      'Commercial & retail secondary packaging',
      'Heavy-duty cases for dense products',
      'Custom-size cartons for non-standard products',
    ],
    hasTypes: false,
    hasOptions: false,
  },
  {
    index: '06',
    slug: 'industrial-filter-bags',
    name: 'Industrial Filter Bags',
    shortName: 'Industrial Filter Bags',
    group: 'Filtration',
    kicker: 'Dust collection & process filtration media',
    tagline: 'Filtration engineered around the application.',
    summary:
      'Filter bags for dust collectors and baghouses — pulse-jet, reverse-air and shaker systems — configured by filtration media, operating temperature, chemical environment, dust characteristics and equipment layout.',
    image: '/images/product-filter-bags.jpg',
    imageAlt: 'Industrial process plant with dust-collection ductwork and cyclones',
    catalogueBacked: false,
    intro: [
      'Industrial filter bags are the working media in a dust collector. They separate particulate from an air or gas stream in cement plants, mineral and mining operations, chemical and fertilizer processing, power generation, food processing and general manufacturing.',
      'A filter bag is specified around the operating conditions — not from a catalogue. Filter bag specifications and documentation are developed around the operating environment, filtration requirements and applicable customer standards, then coordinated with a suitable Indian manufacturing partner.',
    ],
    filterOperating: [
      'Filtration application & collector type',
      'Operating temperature (continuous and peak)',
      'Chemical environment & acid-gas content',
      'Dust / material characteristics (particle size, moisture, abrasiveness)',
      'Equipment configuration — cage, snap-band, dimensions',
      'Air-to-cloth ratio & pressure drop targets',
    ],
    specs: [
      { label: 'Bag types', value: 'Pulse-jet · Reverse-air · Shaker · Baghouse · Customized' },
      { label: 'Filtration media', value: 'Polyester · PP · PPS · Aramid · PTFE · membrane finish' },
      { label: 'Operating temperature', value: 'Media selected to the continuous and peak temperature' },
      { label: 'Finish', value: 'Singed, calendered, PTFE membrane or anti-static as required' },
      { label: 'Dimensions & fittings', value: 'Snap-band, cuff or clamp — built to the equipment' },
      { label: 'Documentation', value: 'Test data & specifications coordinated to customer standards' },
    ],
    applications: [
      'Cement & clinker processing',
      'Minerals & mining',
      'Chemicals & fertilizers',
      'Power generation',
      'Food processing',
      'General industrial dust collection',
    ],
    hasTypes: false,
    hasOptions: false,
    isFilter: true,
    quoteCta: 'Discuss your filtration requirement',
  },
  {
    index: '07',
    slug: 'industrial-commercial-packaging',
    name: 'Industrial & Commercial Packaging',
    shortName: 'Industrial & Commercial Packaging',
    group: 'Industrial packaging',
    kicker: 'Additional packaging formats',
    tagline: 'Additional packaging formats sourced around specific product, handling and application requirements.',
    summary:
      'Where a requirement sits outside the core categories, Ventura evaluates supply from its Indian manufacturing network — from protective and transit packaging to product-specific formats.',
    image: '/images/woven-fabric-loom.jpg',
    imageAlt: 'Industrial weaving machinery running synthetic tape yarn',
    catalogueBacked: false,
    intro: [
      'The categories above cover most bulk, woven, laminated, corrugated and filtration requirements. Where a product needs a different format, Ventura evaluates whether a suitable Indian manufacturing partner can supply it to the specification.',
      'This is a scoped process, not an open promise: the requirement is written down, a partner is identified, and commercial and quality details are validated before an order is confirmed.',
    ],
    specs: [
      { label: 'Basis', value: 'Written buyer specification & application detail' },
      { label: 'Evaluation', value: 'Partner capability, capacity and commercial terms assessed per enquiry' },
      { label: 'Samples', value: 'Coordinated where the specification and partner allow' },
      { label: 'Documentation', value: 'Export documentation to shipment and destination requirements' },
    ],
    applications: [
      'Protective & transit packaging',
      'Product-specific packaging formats',
      'Combined packaging supply across multiple formats',
      'Requirements adjacent to the core categories',
    ],
    hasTypes: false,
    hasOptions: false,
  },
]

/** Selected packaging-example photographs per category, shown on the product detail page. */
export const productGalleries = {
  'pp-hdpe-woven-bags': [
    { src: '/images/ventura_pp_plain_bag_blue.jpg', caption: 'Plain woven polypropylene sack' },
    { src: '/images/ventura_pp_bag_green_front.jpg', caption: 'Printed woven sack' },
    { src: '/images/ventura_pp_bag_inner_liner.jpg', caption: 'Liner detail' },
  ],
  'bopp-laminated-bags': [
    { src: '/images/ventura_bopp_waller_bags.jpg', caption: 'BOPP-laminated printed woven sacks' },
    { src: '/images/ventura_ultragreen_front_back.jpg', caption: 'Printed BOPP sack — front and back' },
    { src: '/images/ventura_wallstar_tile_adhesive.jpg', caption: 'Printed BOPP sack' },
    { src: '/images/ventura_pp_bag_rice_front.jpg', caption: 'Printed retail sack — front' },
    { src: '/images/ventura_pp_bag_rice_back.jpg', caption: 'Printed retail sack — reverse' },
  ],
  'customized-woven-packaging': [
    { src: '/images/ventura_pp_bag_rice_front.jpg', caption: 'Custom print — front' },
    { src: '/images/ventura_pp_bag_rice_back.jpg', caption: 'Custom print — reverse' },
    { src: '/images/ventura_pp_bag_green_front.jpg', caption: 'Custom print' },
    { src: '/images/ventura_bopp_waller_bags.jpg', caption: 'BOPP-laminated finish example' },
  ],
}

export function getProduct(slug) {
  return products.find((p) => p.slug === slug)
}
