// Central site configuration.
// Visible brand: VENTURA. Legal name: Ventura Exports (footer / legal / contact).

export const site = {
  name: 'Ventura',
  legalName: 'Ventura Exports',
  domain: 'venturaexports.in',
  url: 'https://www.venturaexports.in',
  tagline: 'Packaging solutions, sourced from India.',
  label: 'Indian sourcing · Global supply',
  descriptionShort:
    'Ventura connects international buyers with capable Indian manufacturing partners for BOPP laminated bags, FIBC, woven bags, jute packaging, cartons and customized packaging solutions.',
  positioning: 'Packaging sourcing & supply from India.',
}

export const contact = {
  email: 'rudra@venturaexports.in',
  phone: '8160959023',
  phoneDisplay: '+91 81609 59023',
  phoneHref: 'tel:+918160959023',
  whatsappHref: 'https://wa.me/918160959023',
  location: 'Ahmedabad, Gujarat, India',
  website: 'venturaexports.in',
  hours: 'Monday–Saturday, 10:00–19:00 IST',
}

export const nav = [
  { label: 'Products', to: '/products' },
  { label: 'How We Work', to: '/how-we-work' },
  { label: 'Quality', to: '/quality' },
  { label: 'Markets', to: '/markets' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const footerNav = [
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'How We Work', to: '/how-we-work' },
      { label: 'Quality', to: '/quality' },
      { label: 'Markets', to: '/markets' },
    ],
  },
  {
    heading: 'Products',
    links: [
      { label: 'BOPP Laminated Bags', to: '/products/bopp-laminated-bags' },
      { label: 'PP & HDPE Woven Bags', to: '/products/pp-hdpe-woven-bags' },
      { label: 'FIBC / Jumbo Bags', to: '/products/fibc-jumbo-bags' },
      { label: 'Customized Woven Packaging', to: '/products/customized-woven-packaging' },
      { label: 'Corrugated Boxes & Cartons', to: '/products/corrugated-boxes-cartons' },
      { label: 'Packaging Tapes', to: '/products/packaging-tapes' },
      { label: 'Jute Bags', to: '/products/jute-bags' },
      { label: 'Industrial Filter Bags', to: '/products/industrial-filter-bags' },
    ],
  },
  {
    heading: 'Enquiries',
    links: [
      { label: 'Request a Quote', to: '/request-a-quote' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]
