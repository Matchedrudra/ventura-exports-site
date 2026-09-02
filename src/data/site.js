// Central site configuration — verified Ventura Exports information only.

export const site = {
  name: 'Ventura Exports',
  legalName: 'Ventura Exports',
  domain: 'www.venturaexports.in',
  url: 'https://www.venturaexports.in',
  tagline: 'Industrial packaging, sourced from India.',
  label: 'Indian sourcing · Global supply',
  descriptionShort:
    'Ventura Exports connects international B2B buyers with selected Indian manufacturing partners for FIBC, PP woven bags and industrial packaging solutions.',
  positioning: 'Industrial packaging sourced from India.',
}

export const contact = {
  email: 'rudra@venturaexports.in',
  phone: '8160959023',
  phoneDisplay: '+91 81609 59023',
  phoneHref: 'tel:+918160959023',
  whatsappHref: 'https://wa.me/918160959023',
  location: 'Ahmedabad, Gujarat, India',
  website: 'www.venturaexports.in',
  hours: 'Monday–Saturday, 10:00–19:00 IST',
}

export const nav = [
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Sourcing', to: '/sourcing' },
  { label: 'Markets', to: '/markets' },
  { label: 'Quality', to: '/quality' },
  { label: 'Contact', to: '/contact' },
]

export const footerNav = [
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Sourcing', to: '/sourcing' },
      { label: 'Quality', to: '/quality' },
      { label: 'Markets', to: '/markets' },
    ],
  },
  {
    heading: 'Products',
    links: [
      { label: 'FIBC / Jumbo Bags', to: '/products/fibc-jumbo-bags' },
      { label: 'PP Woven Bags', to: '/products/pp-woven-bags' },
      { label: 'HDPE Woven Bags', to: '/products/hdpe-woven-bags' },
      { label: 'Customized Woven Packaging', to: '/products/customized-woven-packaging' },
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
