import { useRef } from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { useParallax } from '../../hooks/useParallax'
import { contact } from '../../data/site'

export function ClosingContact() {
  const imgRef = useRef(null)
  useParallax(imgRef, 0.08)

  return (
    <section className="relative isolate overflow-hidden bg-ink text-ivory">
      <img
        ref={imgRef}
        src="/images/textile/fabric-stacks-warehouse.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute -top-[8%] left-0 -z-20 h-[116%] w-full object-cover opacity-60 will-change-transform"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/70" />

      <Container className="py-28 text-center lg:py-40">
        <Reveal>
          <span aria-hidden="true" className="mx-auto mb-7 block h-px w-12 bg-gold-soft" />
          <h2 className="mx-auto max-w-2xl font-serif text-[2.1rem] font-medium leading-[1.1] text-ivory sm:text-[2.7rem] lg:text-[3.1rem]">
            Let&apos;s Create Something Together.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-md text-[0.98rem] leading-[1.85] text-ivory/75">
            Share your requirements with our team and discover sourcing solutions tailored to your
            business.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Button to="/request-a-quote" variant="light">
              Discuss Your Requirements
            </Button>
            <a
              href={`mailto:${contact.email}`}
              className="relative text-[0.9rem] text-ivory/85 transition-colors duration-300 hover:text-gold-soft after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold-soft after:transition-[width] after:duration-500 hover:after:w-full"
            >
              {contact.email}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
