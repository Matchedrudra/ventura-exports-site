import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Sourcing = lazy(() => import('./pages/Sourcing'))
const Markets = lazy(() => import('./pages/Markets'))
const Quality = lazy(() => import('./pages/Quality'))
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
          <Route path="products" element={<Products />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="how-we-work" element={<Sourcing />} />
          <Route path="sourcing" element={<Navigate to="/how-we-work" replace />} />
          <Route path="markets" element={<Markets />} />
          <Route path="quality" element={<Quality />} />
          <Route path="request-a-quote" element={<Quote />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
