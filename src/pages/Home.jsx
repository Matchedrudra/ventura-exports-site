import { Seo } from '../components/ui/Seo'
import { Hero } from '../components/home/Hero'
import { AboutIntro } from '../components/home/AboutIntro'
import { YarnDivision } from '../components/home/YarnDivision'
import { FabricsDivision } from '../components/home/FabricsDivision'
import { AccessoriesDivision } from '../components/home/AccessoriesDivision'
import { AdditionalCapabilities } from '../components/home/AdditionalCapabilities'
import { ClosingContact } from '../components/home/ClosingContact'
import { IndiaSourcing } from '../components/home/IndiaSourcing'
import { TailoredSpecs } from '../components/home/TailoredSpecs'
import { Approach } from '../components/textile/Approach'
import { pageSeo } from '../data/seo'

const seo = pageSeo('/')

export default function Home() {
  return (
    <>
      <Seo {...seo} />
      <Hero />
      <AboutIntro />
      <YarnDivision />
      <FabricsDivision />
      <AccessoriesDivision />
      <TailoredSpecs />
      <Approach />
      <IndiaSourcing />
      <AdditionalCapabilities />
      <ClosingContact />
    </>
  )
}
