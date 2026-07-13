import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { gallery } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';

const AUTO_DELAY = 5000;

/**
 * Gallery – Diaporama d'images avec navigation et swipe tactile.
 */
export default function Gallery() {
  const { t, lang } = useLanguage();
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setIdx((prev) => (prev + 1) % gallery.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, []);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, AUTO_DELAY);
    return () => clearInterval(timer);
  }, [next]);

  // Swipe tactile
  let touchStart = 0;
  const onTouchStart = (e) => { touchStart = e.changedTouches[0].clientX; };
  const onTouchEnd   = (e) => {
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  };

  const current = gallery[idx];

  const slideVariants = {
    enter:  (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="section-pad bg-white dark:bg-dark-bg"
    >
      <div className="max-w-8xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">{t('gallery.tag')}</span>
          <h2 id="gallery-title" className="section-title">{t('gallery.title')}</h2>
        </motion.div>

        {/* Slideshow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden h-[420px] md:h-[520px]
                     bg-slate-100 dark:bg-dark-soft shadow-primary-xl"
          role="region"
          aria-label="Galerie de photos"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Images animées */}
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt[lang] || current.alt.fr}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Overlay gradient + info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                          flex flex-col justify-end p-8">
            <motion.div
              key={current.title.fr}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="font-heading font-bold text-2xl text-white mb-1">
                {current.title[lang] || current.title.fr}
              </h3>
              <p className="text-white/80 text-sm max-w-lg">{current.description[lang] || current.description.fr}</p>
            </motion.div>
          </div>

          {/* Boutons navigation */}
          <button
            onClick={prev}
            aria-label="Image précédente"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12
                       flex items-center justify-center rounded-full
                       bg-white/20 backdrop-blur-sm text-white text-2xl
                       hover:bg-white/35 transition-all duration-200 cursor-hover"
          >
            <HiChevronLeft />
          </button>
          <button
            onClick={next}
            aria-label="Image suivante"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12
                       flex items-center justify-center rounded-full
                       bg-white/20 backdrop-blur-sm text-white text-2xl
                       hover:bg-white/35 transition-all duration-200 cursor-hover"
          >
            <HiChevronRight />
          </button>

          {/* Indicateurs */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > idx ? 1 : -1); setIdx(i); }}
                aria-label={`Aller à l'image ${i + 1}`}
                className={`rounded-full transition-all duration-300 cursor-hover
                  ${i === idx ? 'w-6 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/75'}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
