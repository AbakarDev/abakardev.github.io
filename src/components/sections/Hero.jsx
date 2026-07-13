import { motion } from 'framer-motion';
import { HiOutlineCode, HiOutlineDownload, HiOutlineChevronDoubleDown } from 'react-icons/hi';
import { HiOutlineRocketLaunch, HiOutlineAcademicCap } from 'react-icons/hi2';
import { personal, heroStats } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';

/** Variants Framer Motion pour les animations d'entrée */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

const icons = {
  graduation: HiOutlineAcademicCap,
  rocket:     HiOutlineRocketLaunch,
  code:       HiOutlineCode,
};

/**
 * Hero – Section d'accueil avec animation, stats et boutons d'action.
 */
export default function Hero() {
  const { t, lang } = useLanguage();

  const handleScroll = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden
                 bg-white dark:bg-dark-bg
                 section-pad"
    >
      {/* Fond gradient radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px]
                        bg-primary-500 rounded-full blur-[150px] opacity-[0.07] dark:opacity-[0.08]
                        animate-float-blob" />
        <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px]
                        bg-accent rounded-full blur-[120px] opacity-[0.05] dark:opacity-[0.06]" />
      </div>

      <div className="relative w-full max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Contenu textuel ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            {/* Badge disponibilité */}
            <motion.div variants={fadeUp}>
              <span className="hero-badge">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot flex-shrink-0" />
                {t('hero.available')}
              </span>
            </motion.div>

            {/* Titre principal */}
            <motion.h1
              id="hero-title"
              variants={fadeUp}
              className="font-heading font-extrabold text-5xl md:text-6xl xl:text-7xl
                         leading-[1.1] mb-6 gradient-text"
            >
              {personal.nameShort}
              <br />
              <span className="text-primary-500">Abakar</span>
            </motion.h1>

            {/* Sous-titre */}
            <motion.h2
              variants={fadeUp}
              className="text-xl font-medium text-slate-500 dark:text-slate-400 mb-5"
            >
              {personal.title[lang] || personal.title.fr}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-[520px]"
            >
              {personal.description[lang] || personal.description.fr}
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4 mb-10"
            >
              {heroStats.map((stat) => {
                const Icon = icons[stat.icon];
                return (
                  <div
                    key={stat.id}
                    className="card card-hover flex items-center gap-3 px-5 py-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary-50 dark:bg-primary-950/50
                                    text-primary-500 flex items-center justify-center text-xl flex-shrink-0">
                      <Icon />
                    </div>
                    <div>
                      <strong className="block text-2xl font-extrabold font-heading
                                         text-slate-900 dark:text-slate-100 leading-none">
                        {stat.value}{stat.suffix}
                      </strong>
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {stat.label[lang] || stat.label.fr}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Boutons CTA */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button
                onClick={() => handleScroll('#portfolio')}
                className="btn-primary cursor-hover"
              >
                <HiOutlineCode className="text-lg" />
                {t('hero.projects')}
              </button>
              <a
                href={personal.cv}
                download
                aria-label="Télécharger mon CV PDF"
                className="btn-secondary cursor-hover"
              >
                <HiOutlineDownload className="text-lg" />
                {t('hero.cv')}
              </a>
            </motion.div>
          </motion.div>

          {/* ── Photo de profil ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative order-1 lg:order-2 flex justify-center items-center"
            aria-hidden="true"
          >
            {/* Anneau tournant */}
            <div className="absolute w-[115%] h-[115%] border-2 border-dashed border-primary-400/20
                            rounded-full animate-rotate" />
            {/* Halo de lumière */}
            <div className="absolute w-[80%] h-[80%] rounded-full
                            bg-gradient-radial from-primary-500/10 to-transparent
                            blur-[40px]" />
            {/* Image */}
            <img
              src={personal.avatar}
              alt="Abakar Brahim Abakar, Développeur Full-Stack"
              width={440}
              height={440}
              className="relative z-10 w-full max-w-[380px] lg:max-w-[440px] object-cover
                         morph-img border-8 border-white dark:border-dark-soft
                         shadow-primary-xl"
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <a
        href="#about"
        onClick={(e) => { e.preventDefault(); handleScroll('#about'); }}
        aria-label="Faire défiler vers le bas"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-400 text-3xl
                   animate-bounce-scroll opacity-60 hover:opacity-100 transition-opacity"
      >
        <HiOutlineChevronDoubleDown />
      </a>
    </section>
  );
}
