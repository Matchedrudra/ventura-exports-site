import { Seo } from '../components/ui/Seo'
import { CtaBand } from '../components/ui/CtaBand'
import { Hero } from '../components/home/Hero'
import { Divisions } from '../components/home/Divisions'
import { AboutIntro } from '../components/home/AboutIntro'
import { YarnDivision } from '../components/home/YarnDivision'
import { FabricsDivision } from '../components/home/FabricsDivision'
import { AccessoriesDivision } from '../components/home/AccessoriesDivision'
import { AdditionalCapabilities } from '../components/home/AdditionalCapabilities'
import { IndiaSourcing } from '../components/home/IndiaSourcing'
import { TailoredSpecs } from '../components/home/TailoredSpecs'
import { Approach } from '../components/textile/Approach'

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        title={null}
        description="Ventura Exports is an India-based export and sourcing company supplying cotton, polyester and blended yarns and fabrics to international buyers — with customised cone and export packaging, and weaving accessories, coordinated through Indian manufacturing partners."
      />
      <Hero />
      <Divisions />
      <AboutIntro />
      <YarnDivision />
      <FabricsDivision />
      <TailoredSpecs />
      <AccessoriesDivision />
      <AdditionalCapabilities />
      <Approach />
      <IndiaSourcing />
      <CtaBand
        title="Let’s discuss your sourcing requirement."
        body="Send the product, specification and destination. We will respond with a considered answer and the right manufacturing partner."
        primaryLabel="Request a Quote"
        secondaryLabel="Contact"
      />
    </>
  )
}
