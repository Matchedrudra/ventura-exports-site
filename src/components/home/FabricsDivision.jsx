import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal } from '../ui/Reveal'
import { fabricCategories } from '../../data/textiles'

export function FabricsDivision() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <div className="grid grid-cols-12 gap-4">
              <Reveal className="col-span-5 self-start">
                <Figure
                  src="/images/textile/warp-threads-loom.jpg"
                  alt="Warp threads aligned on a loom ahead of weaving"
                  ratio="3 / 5"
                />
              </Reveal>
              <Reveal delay={0.1} className="col-span-7">
                <Figure
                  src="/images/textile/fabric-rolls-factory.jpg"
                  alt="Rolls of finished fabric stored on racks in a textile factory"
                  ratio="4 / 5"
                  imgClassName="object-[30%_50%]"
                />
              </Reveal>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6">
            <SectionHeading
              label="Fabrics"
              title="Fabrics — Sourced for Diverse Applications."
              lead="Alongside yarns, Ventura Exports offers sourcing solutions for a range of textile fabrics through its Indian manufacturing network."
            />
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {fabricCategories.map((f) => (
                <li key={f.slug} className="border-t border-line py-3 text-[0.95rem] text-ink/80">
                  {f.name}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button to="/fabrics" variant="solid">
                Explore Fabrics
              </Button>
              <Button to="/fabrics#requirements" variant="link">
                Send a fabric enquiry
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
