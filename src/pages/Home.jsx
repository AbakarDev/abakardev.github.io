import { lazy, Suspense } from 'react';
import Hero from '../components/sections/Hero';

// Lazy loading de toutes les sections pour améliorer le LCP/TTI
const About    = lazy(() => import('../components/sections/About'));
const Portfolio= lazy(() => import('../components/sections/Portfolio'));
const Skills   = lazy(() => import('../components/sections/Skills'));
const Gallery  = lazy(() => import('../components/sections/Gallery'));
const Parcours = lazy(() => import('../components/sections/Parcours'));
const Contact  = lazy(() => import('../components/sections/Contact'));

/** Skeleton loader minimal pendant le chargement des sections lazy */
const SectionSkeleton = () => (
  <div className="section-pad flex items-center justify-center min-h-[400px]">
    <div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary-500 animate-spin" />
  </div>
);

/**
 * Home – Page unique du portfolio.
 * Les sections sont chargées en lazy loading pour optimiser les performances.
 */
export default function Home() {
  return (
    <>
      {/* Hero chargé immédiatement (above the fold) */}
      <Hero />

      {/* Sections lazy-loaded */}
      <Suspense fallback={<SectionSkeleton />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Portfolio />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Skills />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Gallery />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Parcours />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Contact />
      </Suspense>
    </>
  );
}
