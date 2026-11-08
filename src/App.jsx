import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Yarns = lazy(() => import('./pages/Yarns'))
const Fabrics = lazy(() => import('./pages/Fabrics'))
const OtherProducts = lazy(() => import('./pages/OtherProducts'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const QualityPackaging = lazy(() => import('./pages/QualityPackaging'))
const Quote = lazy(() => import('./pages/Quote'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return <div className="min-h-[60vh]" aria-hidden="true" />
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="yarns" element={<Yarns />} />
          <Route path="fabrics" element={<Fabrics />} />
          <Route path="other-products" element={<OtherProducts />} />
          <Route path="products" element={<Navigate to="/other-products" replace />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="quality-packaging" element={<QualityPackaging />} />
          <Route path="quality" element={<Navigate to="/quality-packaging" replace />} />
          <Route path="how-we-work" element={<Navigate to="/quality-packaging#approach" replace />} />
          <Route path="sourcing" element={<Navigate to="/quality-packaging#approach" replace />} />
          <Route path="markets" element={<Navigate to="/#markets" replace />} />
          <Route path="request-a-quote" element={<Quote />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
