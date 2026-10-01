import { Seo } from '../components/ui/Seo'
import { Hero } from '../components/home/Hero'
import { FibcShowcase } from '../components/home/FibcShowcase'
import { ProductIndex } from '../components/home/ProductIndex'
import { ContainerConcept } from '../components/home/ContainerConcept'
import { FromSpecToSupply } from '../components/home/FromSpecToSupply'
import { GlobalReach } from '../components/home/GlobalReach'
import { EnquiryInvite } from '../components/home/EnquiryInvite'
import { CertificationsCompliance } from '../components/ui/CertificationsCompliance'

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        title={null}
        description="Ventura supplies FIBC and jumbo bags sourced from capable Indian manufacturing partners, for international buyers — plus PP & HDPE woven bags, BOPP laminated bags, jute bags, packaging tapes and corrugated cartons as complementary packaging from India."
      />
      <Hero />
      <FibcShowcase />
      <FromSpecToSupply />
      <ProductIndex />
      <ContainerConcept />
      <GlobalReach />
      <CertificationsCompliance />
      <EnquiryInvite />
    </>
  )
}
