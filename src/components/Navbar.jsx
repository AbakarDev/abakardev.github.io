import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { HiMoon, HiSun } from 'react-icons/hi2';
import { navLinks, personal } from '../data/portfolio';
import useTheme from '../hooks/useTheme';
import { useLanguage } from '../context/LanguageContext';
import useScrollSpy from '../hooks/useScrollSpy';

/**
 * Navbar – Navigation fixe avec :
 * - Effet glassmorphism au scroll
 * - Menu mobile animé
 * - Toggle mode sombre
 * - Lien actif via scroll spy
 */
export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // IDs des sections pour le scroll spy
  const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
  const activeId = useScrollSpy(sectionIds, 120);

  // Détection du scroll pour l'effet header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ferme le menu mobile au resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
          ${isScrolled
            ? 'h-[70px] bg-white/85 dark:bg-dark-bg/90 shadow-primary-sm border-b border-slate-100 dark:border-dark-border backdrop-blur-xl'
            : 'h-[80px] bg-transparent backdrop-blur-sm'
          }`}
      >
        <div className="h-full flex items-center justify-between px-6 md:px-12 lg:px-24 xl:px-36 max-w-8xl mx-auto">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex items-center gap-3 font-heading font-bold text-lg text-slate-900 dark:text-slate-100 group"
            aria-label="Accueil – Abakar Brahim Abakar"
          >
            <img
              src={personal.logo}
              alt="Logo ABA"
              width={42}
              height={42}
              className="w-[42px] h-[42px] rounded-full object-cover border-2 border-primary-500
                         shadow-[0_0_15px_rgba(99,102,241,0.2)] 
                         transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
                         group-hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
            />
            <span className="hidden sm:block">Abakar Brahim</span>
          </a>

          {/* Navigation desktop */}
          <nav aria-label="Navigation principale" className="hidden md:block">
            <ul className="flex gap-8 items-center" role="list">
              {navLinks.map((link) => {
                const isActive = activeId === link.href.replace('#', '');
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                      className={`relative text-xs font-bold uppercase tracking-widest transition-colors duration-300
                        ${isActive
                          ? 'text-slate-900 dark:text-slate-100'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                        }`}
                    >
                      {t(`nav.${link.href.replace('#', '')}`)}
                      {/* Indicateur actif */}
                      <span
                        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-primary-500 rounded-full
                          transition-all duration-500 ${isActive ? 'w-4' : 'w-0'}`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Toggle langue */}
            <button
              onClick={toggleLang}
              aria-label={lang === 'fr' ? 'Passer en anglais' : 'Switch to French'}
              title={lang === 'fr' ? 'Passer en anglais' : 'Switch to French'}
              className="w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm
                         bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-dark-border
                         text-slate-500 dark:text-slate-300
                         transition-all duration-300 uppercase
                         hover:bg-primary-50 dark:hover:bg-primary-500/10
                         hover:text-primary-500 hover:border-primary-300 dark:hover:border-primary-500/40"
            >
              {lang}
            </button>

            {/* Toggle thème */}
            <button
              onClick={toggle}
              aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
              title={isDark ? 'Mode clair' : 'Mode sombre'}
              className="w-10 h-10 flex items-center justify-center rounded-xl
                         bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-dark-border
                         text-slate-500 dark:text-slate-300 text-lg
                         transition-all duration-300
                         hover:bg-primary-50 dark:hover:bg-primary-500/10
                         hover:text-primary-500 hover:border-primary-300 dark:hover:border-primary-500/40"
            >
              {isDark ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
            </button>

            {/* Bouton menu mobile */}
            <button
              id="menu-toggle"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl
                         text-slate-700 dark:text-slate-200 text-2xl
                         hover:bg-slate-100 dark:hover:bg-white/5 transition-colors duration-200"
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-label="Menu de navigation mobile"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-y-0 left-0 z-40 w-72
                       bg-white dark:bg-dark-bg border-r border-slate-100 dark:border-dark-border
                       shadow-2xl flex flex-col pt-24 px-8 gap-3 md:hidden"
          >
            {navLinks.map((link, i) => {
              const isActive = activeId === link.href.replace('#', '');
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold text-sm
                    transition-all duration-200
                    ${isActive
                      ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                  )}
                  {t(`nav.${link.href.replace('#', '')}`)}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
