// Textile division content — yarns, fabrics, cone & export packaging,
// sourcing approach and markets of interest.
//
// Nothing here claims stock, certifications, manufacturing facilities,
// customers or shipment volumes. Counts and configurations are examples
// of what a buyer can specify; availability is confirmed per enquiry with
// the Indian manufacturing partner.

/* ─── Yarns ─────────────────────────────────────────────────────────── */

export const yarnCategories = [
  {
    slug: 'cotton-yarn',
    index: '01',
    name: 'Cotton Yarn',
    image: '/images/textile/white-cones-winder.jpg',
    imageAlt: 'White cotton yarn cones on a cone-winding machine in a textile mill',
    summary:
      'Cotton yarns for weaving and knitting units, in the spinning route and count the buyer specifies.',
    variants: [
      '100% Cotton Yarn',
      'Combed Cotton Yarn',
      'Carded Cotton Yarn',
      'Ring Spun Cotton Yarn',
      'Open End Cotton Yarn',
      'Compact Cotton Yarn',
    ],
    note:
      'Combed and carded refer to the preparation route; ring spun, open end and compact to the spinning system. Each gives a different yarn character and cost — we help match it to the end use.',
  },
  {
    slug: 'polyester-yarn',
    index: '02',
    name: 'Polyester Yarn',
    image: '/images/textile/blue-yarn-cones.jpg',
    imageAlt: 'Blue textile yarn cones wound in parallel rows',
    summary:
      'Spun and filament polyester yarns, sourced against the denier or count, finish and package you require.',
    variants: [
      'Polyester Spun Yarn',
      'Polyester Filament Yarn',
      'Textured Polyester Yarn',
      'Other polyester yarn varieties, subject to sourcing availability',
    ],
    note:
      'Spun polyester is generally specified by count, filament and textured yarns by denier and filament count.',
  },
  {
    slug: 'blended-yarn',
    index: '03',
    name: 'Blended Yarn',
    image: '/images/textile/spinning-line-india.jpg',
    imageAlt: 'Spinning line in an Indian textile mill with yarn packages on the frames',
    summary:
      'Blended yarns where the end product calls for the properties of more than one fibre.',
    variants: [
      'Polyester Cotton Yarn',
      'Cotton Viscose Blends',
      'Other customised blended yarns',
    ],
    note:
      'Blend ratio is part of the specification — tell us the composition you need and we will confirm what can be sourced.',
  },
  {
    slug: 'other-yarns',
    index: '04',
    name: 'Other Yarns',
    image: '/images/textile/cones-on-frame.jpg',
    imageAlt: 'White yarn cones in rows on a winding frame',
    summary:
      'If your requirement is not listed, send the specification — we will check it with our manufacturing partners.',
    variants: [
      'Speciality and customised yarns',
      'Yarns for specific end uses or machines',
      'Enquiry-based sourcing for other varieties',
    ],
    note: 'Describe the yarn, the application and the quantity, and we will respond with what is possible.',
  },
]

// Examples of the English cotton count (Ne) notation. These illustrate
// how a buyer can specify a yarn — they are not a list of stocked counts.
export const yarnCountExamples = [
  { count: 'Ne 20/1', ply: 'Single', note: 'A coarser single yarn, commonly used where body and weight are wanted.' },
  { count: 'Ne 24/1', ply: 'Single', note: 'A mid-range single yarn.' },
  { count: 'Ne 30/1', ply: 'Single', note: 'A finer single yarn for lighter knitted and woven structures.' },
  { count: 'Ne 40/1', ply: 'Single', note: 'A fine single yarn for lightweight, smooth fabrics.' },
  { count: 'Ne 20/2', ply: 'Double', note: 'Two Ne 20 yarns plied together — stronger and more even.' },
  { count: 'Ne 30/2', ply: 'Double', note: 'Two Ne 30 yarns plied together, for finer, stronger fabrics.' },
]

export const yarnCountExplainer = [
  {
    term: 'Ne (English cotton count)',
    body: 'The number of 840-yard hanks in one pound of yarn. The higher the number, the finer the yarn.',
  },
  {
    term: '/1 and /2',
    body: 'The number after the slash is the number of plies. Ne 30/1 is a single yarn; Ne 30/2 is two Ne 30 yarns twisted together.',
  },
  {
    term: 'Other systems',
    body: 'Filament and some blended yarns are specified in denier or decitex rather than Ne — send whichever system you work in.',
  },
]

export const yarnSpecFields = [
  'Yarn type',
  'Composition',
  'Yarn count',
  'Single / double',
  'Ring spun / open end / compact',
  'Required quantity',
  'Destination country',
  'Packaging preference',
  'Additional requirements',
]

/* ─── Fabrics ───────────────────────────────────────────────────────── */

export const fabricCategories = [
  {
    slug: 'cotton-fabrics',
    name: 'Cotton Fabrics',
    note: 'Natural-fibre fabrics in the weight, width and finish the application needs.',
  },
  {
    slug: 'polyester-fabrics',
    name: 'Polyester Fabrics',
    note: 'Synthetic fabrics for performance, durability and easy care.',
  },
  {
    slug: 'cotton-polyester-fabrics',
    name: 'Cotton-Polyester Blended Fabrics',
    note: 'Blends that balance the feel of cotton with the strength of polyester.',
  },
  {
    slug: 'knitted-fabrics',
    name: 'Knitted Fabrics',
    note: 'Jersey, rib and other knit structures, specified by GSM and width.',
  },
  {
    slug: 'woven-fabrics',
    name: 'Woven Fabrics',
    note: 'Plain, twill and other woven constructions, specified by weave and thread count.',
  },
  {
    slug: 'other-fabrics',
    name: 'Other fabrics',
    note: 'Based on buyer requirements — send the specification and we will check availability.',
  },
]

export const fabricSpecTerms = [
  { term: 'GSM', body: 'Grams per square metre — the weight of the fabric.' },
  { term: 'Width', body: 'The usable width of the fabric as supplied, on the roll.' },
  { term: 'Construction', body: 'Knitted or woven, the structure, and the yarn counts and thread density.' },
  { term: 'Colour', body: 'Grey (unprocessed), dyed, printed or to a reference shade.' },
  { term: 'Finish', body: 'Any finishing treatment the end use calls for.' },
]

/* ─── Cones & export packaging ──────────────────────────────────────── */

export const coneOptions = [
  { title: 'Cone size', body: 'Different cone dimensions to suit the buyer’s machines and handling.' },
  { title: 'Cone weight', body: 'Net weight per cone as the buyer specifies it.' },
  { title: 'Winding format', body: 'Parallel or tapered winding, according to the next process.' },
  { title: 'Package type', body: 'Cones, and other yarn package configurations, subject to manufacturer capability.' },
  { title: 'Buyer-specified', body: 'A cone requirement of your own — send it and we will check it with the partner.' },
]

export const packagingOptions = [
  'Individual cone packaging',
  'Multiple cones per carton',
  'Customised carton quantities',
  'Export-grade cartons',
  'Buyer-specific carton labelling',
  'Custom packaging instructions',
  'Palletised shipment arrangements, where applicable',
]

export const packagingNote =
  'Whether your requirement involves specific cone configurations, carton quantities, labelling or destination-specific export packaging, Ventura works to coordinate suitable solutions with its manufacturing partners.'

export const packagingDisclaimer =
  'We aim to accommodate buyer-specific packaging preferences, subject to manufacturer capabilities and order specifications. No packaging standard or certification is implied.'

/* ─── Sourcing approach ─────────────────────────────────────────────── */

export const approachSteps = [
  {
    index: '01',
    title: 'Understanding buyer specifications',
    body: 'The requirement is written down — product, count or GSM, composition, quantity and destination.',
  },
  {
    index: '02',
    title: 'Identifying suitable manufacturing partners',
    body: 'The enquiry is matched to Indian manufacturers whose capability and capacity fit the order.',
  },
  {
    index: '03',
    title: 'Coordinating product specifications',
    body: 'One agreed specification is confirmed with the partner, so both sides read it the same way.',
  },
  {
    index: '04',
    title: 'Discussing packaging requirements',
    body: 'Cone configuration, cartons, labelling and palletisation are settled before production.',
  },
  {
    index: '05',
    title: 'Coordinating export documentation',
    body: 'Commercial and export paperwork is prepared for the destination market.',
  },
  {
    index: '06',
    title: 'Shipment coordination',
    body: 'Dispatch and shipment are coordinated with the partner and the buyer’s forwarder.',
  },
]

export const approachHighlights = [
  'Product specifications',
  'Quality expectations',
  'Packaging requirements',
  'Communication',
  'Documentation',
  'Export coordination',
]

/* ─── Markets of interest ───────────────────────────────────────────── */

export const marketsOfInterest = [
  'Israel',
  'Bangladesh',
  'Turkey',
  'Egypt',
  'Vietnam',
  'Germany',
  'Other international markets',
]

export const indiaCopy = [
  'India is one of the world’s major textile-producing countries, with a deep base of spinning, weaving, knitting and processing capacity across the value chain.',
  'Ventura’s role is to connect international buyers with Indian suppliers — understanding the specification, identifying a suitable manufacturing partner, and coordinating the order through to export.',
]

/* ─── Textile accessories & weaving solutions ───────────────────────── */

// Descriptions state what each part does in general terms only. No sizes,
// materials, brands, compatibility or availability are implied — those are
// confirmed against the buyer's machine and drawing for each enquiry.
export const weavingProducts = [
  {
    slug: 'skew-reeds',
    name: 'Skew Reeds',
    image: '/images/textile/weaving-reed.jpg',
    imageAlt: 'Close view of a weaving reed set in the beater of a loom, with warp threads passing through',
    body: 'Reeds space the warp threads and beat the weft into the fabric. Sourced to the reed specification your machine and fabric call for.',
  },
  {
    slug: 'textile-healds',
    name: 'Textile Healds',
    image: '/images/textile/weaving-healds.jpg',
    imageAlt: 'Heald shafts with heddle loops carrying warp threads on a loom',
    body: 'Healds carry individual warp threads and, raised and lowered on the shafts, form the shed. Specified to your loom and warp requirement.',
  },
  {
    slug: 'heald-frames',
    name: 'Heald Frames & Accessories',
    image: '/images/textile/loom-heald-frames.jpg',
    imageAlt: 'A technician working on the heald frames of an industrial weaving machine',
    body: 'Frames that hold the healds, and related accessories — subject to supplier availability and your machine details.',
  },
  {
    slug: 'drop-wires',
    name: 'Drop Wires',
    image: null,
    imageAlt: '',
    body: 'Drop wires are used in warp stop-motion systems to stop the machine when a warp end breaks. Sourced against your machine and drawing.',
  },
  {
    slug: 'other-accessories',
    name: 'Other Weaving Machinery Accessories',
    image: '/images/textile/weaving-hall.jpg',
    imageAlt: 'A weaving hall with rows of industrial looms',
    body: 'Another weaving component or accessory you use? Send the details and we will check it with our supplier network.',
  },
]

export const weavingSteps = [
  {
    index: '01',
    title: 'Send the requirement',
    body: 'Tell us the product, your machine type and, where you have them, dimensions, material and a drawing or specification document.',
  },
  {
    index: '02',
    title: 'We check with suppliers',
    body: 'The requirement goes to our manufacturing and supplier network. Availability is confirmed individually, never assumed.',
  },
  {
    index: '03',
    title: 'Specification confirmed',
    body: 'The technical specification is agreed with you before quotation, so supply is coordinated against your machinery requirements.',
  },
]

export const weavingEnquiryFields = [
  'Product required',
  'Machinery type',
  'Technical specifications',
  'Dimensions',
  'Material',
  'Required quantity',
  'Destination country',
  'Additional requirements',
]

/* ─── Homepage lists ────────────────────────────────────────────────── */

export const yarnTypeList = [
  { name: '100% Cotton Yarn', to: '/yarns#cotton-yarn' },
  { name: 'Combed Cotton Yarn', to: '/yarns#cotton-yarn' },
  { name: 'Carded Cotton Yarn', to: '/yarns#cotton-yarn' },
  { name: 'Polyester Yarn', to: '/yarns#polyester-yarn' },
  { name: 'Blended Yarn', to: '/yarns#blended-yarn' },
  { name: 'Ring Spun Yarn', to: '/yarns#cotton-yarn' },
  { name: 'Open End Yarn', to: '/yarns#cotton-yarn' },
  { name: 'Compact Yarn', to: '/yarns#cotton-yarn' },
]

export const homeYarnCounts = ['20/1', '24/1', '30/1', '40/1', '20/2', '30/2']

export const fabricTypeList = [
  'Cotton Fabrics',
  'Polyester Fabrics',
  'Blended Fabrics',
  'Knitted Fabrics',
  'Woven Fabrics',
]

export const weavingTypeList = [
  { name: 'Skew Reeds', to: '/weaving-accessories#skew-reeds' },
  { name: 'Textile Healds', to: '/weaving-accessories#textile-healds' },
  { name: 'Heald Frames', to: '/weaving-accessories#heald-frames' },
  { name: 'Drop Wires', to: '/weaving-accessories#drop-wires' },
  { name: 'Other Weaving Components', to: '/weaving-accessories#other-accessories' },
]

export const tailoredCapabilities = [
  'Different yarn counts',
  'Different cone configurations',
  'Cone weights',
  'Winding specifications',
  'Individual cone packaging',
  'Multiple cones per carton',
  'Custom carton quantities',
  'Export-grade cartons',
  'Custom carton labelling',
  'Palletised shipment arrangements',
]

export const tailoredLead =
  'No two buyers work to the same specification. Ventura coordinates yarn counts, cone configurations and export packaging to yours, with the same attention from the first enquiry to the final shipment.'
