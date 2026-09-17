import { Seo } from '../components/ui/Seo'
import { Hero } from '../components/home/Hero'
import { ProductIndex } from '../components/home/ProductIndex'
import { OneStop } from '../components/home/OneStop'
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
        description="Ventura is an India-based packaging and industrial supply company connecting international buyers with capable Indian manufacturing partners — FIBC and jumbo bags, PP & HDPE woven bags, BOPP laminated bags, jute bags, packaging tapes, corrugated cartons and industrial filter bags."
      />
      <Hero />
      <ProductIndex />
      <OneStop />
      <ContainerConcept />
      <FromSpecToSupply />
      <CertificationsCompliance />
      <GlobalReach />
      <EnquiryInvite />
    </>
  )
}
