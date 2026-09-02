import { Seo } from '../components/ui/Seo'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Seo path="/404" title="Page not found" />
      <section className="py-28 lg:py-40">
        <Container>
          <p className="text-label font-semibold uppercase tracking-label text-gold">Error 404</p>
          <h1 className="mt-6 font-serif text-[2.4rem] leading-tight text-ink sm:text-[3rem]">
            This page could not be found.
          </h1>
          <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-ink/65">
            The link may be out of date. Head back to the homepage or the product index.
          </p>
          <div className="mt-9 flex flex-wrap gap-x-3 gap-y-3">
            <Button to="/" variant="solid">
              Home
            </Button>
            <Button to="/products" variant="link">
              Products
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
