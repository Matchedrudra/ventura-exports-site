import { Seo } from '../components/ui/Seo'
import { Hero } from '../components/home/Hero'
import { ProductIndex } from '../components/home/ProductIndex'
import { PositioningBlock } from '../components/home/PositioningBlock'
import { Interlude } from '../components/home/Interlude'
import { ProcessStrip } from '../components/home/ProcessStrip'
import { GlobalReach } from '../components/home/GlobalReach'
import { MarketsPreview } from '../components/home/MarketsPreview'
import { CtaBand } from '../components/ui/CtaBand'

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        title={null}
        description="Ventura Exports connects international B2B buyers with selected Indian manufacturing partners for FIBC, PP woven bags and industrial packaging solutions."
      />
      <Hero />
      <ProductIndex />
      <ProcessStrip />
      <PositioningBlock />
      <GlobalReach />
      <MarketsPreview />
      <Interlude />
      <CtaBand />
    </>
  )
}
