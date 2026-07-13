import { motion } from 'framer-motion';
import { timeline } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';

const badgeColors = {
  experience: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50',
  formation:  'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 border-primary-200 dark:border-primary-800/50',
  diplome:    'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/50',
};

/**
 * Parcours – Timeline verticale du parcours académique et professionnel.
 */
export default function Parcours() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="parcours"
      aria-labelledby="parcours-title"
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
          <span className="section-tag">{t('parcours.tag')}</span>
          <h2 id="parcours-title" className="section-title">{t('parcours.title')}</h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-slate-200 dark:border-dark-border pl-6 sm:pl-8 space-y-8 sm:space-y-10">
            {timeline.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index, lang }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      {/* Point de la timeline */}
      <div className="timeline-dot" />

      {/* Date */}
      <p className="text-xs font-bold uppercase tracking-widest text-primary-500 mb-2">
        {item.date[lang] || item.date.fr}
      </p>

      {/* Carte de contenu */}
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
        className="card p-6"
      >
        {/* Badge type */}
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border mb-3
            ${badgeColors[item.type] || badgeColors.formation}`}
        >
          {item.badge[lang] || item.badge.fr}
        </span>

        <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100 mb-2">
          {item.title[lang] || item.title.fr}
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {item.description[lang] || item.description.fr}
        </p>
      </motion.div>
    </motion.div>
  );
}
