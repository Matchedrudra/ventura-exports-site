// Central site configuration.
// Visible brand: VENTURA. Legal name: Ventura Exports (footer / legal / contact).

export const site = {
  name: 'Ventura',
  legalName: 'Ventura Exports',
  domain: 'venturaexports.in',
  url: 'https://www.venturaexports.in',
  tagline: 'Your Global Textile Partner.',
  taglineAlt: 'Indian Textile Excellence. Global Trade Partnerships.',
  label: '5+ years · Indian sourcing · Global supply',
  experience: '5+ years',
  descriptionShort:
    'Ventura Exports is an India-based textile supply and export company specialising in cotton yarn, polyester yarn, blended yarn, fabrics and precision weaving accessories for international markets.',
  positioning: 'Indian Textile Yarn, Fabrics & Weaving Accessories Supplier',
}

export const contact = {
  email: 'info@venturaexports.in',
  phone: '8160959023',
  phoneDisplay: '+91 81609 59023',
  phoneHref: 'tel:+918160959023',
  whatsappHref: 'https://wa.me/918160959023',
  location: 'Gujarat, India',
  website: 'venturaexports.in',
  hours: 'Monday–Saturday, 10:00–19:00 IST',
}

export const nav = [
  { label: 'Home', to: '/', end: true },
  { label: 'About Us', to: '/about' },
  { label: 'Yarns', to: '/yarns' },
  { label: 'Fabrics', to: '/fabrics' },
  { label: 'Weaving Accessories', to: '/weaving-accessories' },
  { label: 'Contact', to: '/contact' },
]

export const footerNav = [
  {
    heading: 'Products',
    links: [
      { label: 'Cotton Yarn', to: '/yarns#cotton-yarn' },
      { label: 'Polyester Yarn', to: '/yarns#polyester-yarn' },
      { label: 'Blended Yarn', to: '/yarns#blended-yarn' },
      { label: 'Speciality Yarns', to: '/yarns#other-yarns' },
      { label: 'Fabrics', to: '/fabrics' },
      { label: 'Weaving Accessories', to: '/weaving-accessories' },
      { label: 'FIBC Bags', to: '/products/fibc-jumbo-bags' },
      { label: 'Spices', to: '/other-products#agro' },
      { label: 'Other Products', to: '/other-products' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Quality & Packaging', to: '/quality-packaging' },
      { label: 'Our Approach', to: '/quality-packaging#approach' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]
