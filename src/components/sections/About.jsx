import { motion } from 'framer-motion';
import {
  HiOutlineUser, HiOutlineAcademicCap, HiOutlineLocationMarker, HiOutlineBriefcase,
  HiOutlineMail,
} from 'react-icons/hi';
import { personal } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';

const sectionVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

const fadeRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

export default function About() {
  const { t, lang } = useLanguage();

  const infoCards = [
    { icon: HiOutlineUser,             title: t('about.profile'),        value: personal.name },
    { icon: HiOutlineAcademicCap,      title: t('about.education'),      value: personal.education[lang] || personal.education.fr },
    { icon: HiOutlineLocationMarker,   title: t('about.location'),       value: personal.location[lang] || personal.location.fr },
    { icon: HiOutlineBriefcase,        title: t('about.availability'),   value: personal.availability[lang] || personal.availability.fr },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section-pad bg-slate-50 dark:bg-dark-soft"
    >
      <div className="max-w-8xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">{t('about.tag')}</span>
          <h2 id="about-title" className="section-title">{t('about.title')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-24 items-center">

          {/* ── Photo ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative group"
          >
            {/* Cadre décoratif - caché sur mobile pour éviter l'overflow */}
            <div className="absolute -top-5 -left-5 w-full h-full border-2 border-primary-500/30
                            rounded-[28px] transition-all duration-500 hidden sm:block
                            group-hover:translate-x-4 group-hover:translate-y-4
                            group-hover:border-primary-500/60 group-hover:rounded-[60%_40%_40%_60%/40%_40%_60%_60%]" />
            {/* Halo */}
            <div className="absolute inset-[10%] rounded-full
                            bg-gradient-radial from-primary-500/15 to-transparent blur-[40px]
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Image */}
            <img
              src={personal.photo2}
              alt="Environnement de travail d'Abakar"
              loading="lazy"
              width={500}
              height={500}
              className="relative z-10 w-full rounded-[28px] object-cover
                         border border-slate-100 dark:border-dark-border shadow-primary-lg
                         transition-all duration-500
                         group-hover:scale-[1.03] group-hover:-translate-y-2
                         group-hover:shadow-primary-xl group-hover:border-primary-500/30"
            />
          </motion.div>

          {/* ── Texte ── */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p variants={fadeRight} className="text-slate-500 dark:text-slate-400 leading-relaxed mb-5 text-base">
              {t('about.p1')}
            </motion.p>

            <motion.p variants={fadeRight} className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 text-base">
              {t('about.p2')}
            </motion.p>

            {/* Info cards */}
            <motion.div
              variants={fadeRight}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            >
              {infoCards.map(({ icon: Icon, title, value }) => (
                <div key={title} className="card card-hover flex items-start gap-4 p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50
                                  text-primary-500 flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
                    <Icon />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
                      {title}
                    </h4>
                    <span className="text-slate-800 dark:text-slate-200 font-medium text-sm">
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeRight}>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-primary cursor-hover inline-flex"
              >
                {t('about.contactBtn')}
                <HiOutlineMail className="text-lg" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
