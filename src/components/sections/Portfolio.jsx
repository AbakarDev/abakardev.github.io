import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineExternalLink, HiOutlineCode, HiX } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function Portfolio() {
  const { t, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState(null);

  // Pour filtrer avec 'Tous' / 'All'
  const filterAll = t('portfolio.all');
  
  const allTags = [filterAll, ...new Set(projects.flatMap((p) => p.tags))];

  const filtered = activeFilter === filterAll || activeFilter === 'Tous'
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter));

  // Effet pour réinitialiser le filtre lors du changement de langue
  useState(() => { setActiveFilter(filterAll); }, [filterAll]);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="section-pad bg-white dark:bg-dark-bg"
    >
      <div className="max-w-8xl mx-auto relative">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">{t('portfolio.tag')}</span>
          <h2 id="portfolio-title" className="section-title">{t('portfolio.title')}</h2>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-hover
                ${activeFilter === tag
                  ? 'bg-primary-500 text-white shadow-primary-sm'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-primary-50 dark:hover:bg-primary-950/50 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Grille de projets */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} t={t} lang={lang} />
          ))}
        </motion.div>

        {/* Lien GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <a
            href="https://github.com/Abakar702"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary cursor-hover"
          >
            <FaGithub className="text-xl" />
            {t('portfolio.allOnGithub')}
          </a>
        </motion.div>
      </div>

      {/* Modale de détails du projet */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} t={t} lang={lang} />
        )}
      </AnimatePresence>
    </section>
  );
}

/** Modale pour afficher les détails du projet */
function ProjectModal({ project, onClose, t, lang }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-hover"
      />

      {/* Contenu de la modale */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-3xl bg-white dark:bg-dark-card rounded-3xl shadow-primary-xl overflow-hidden max-h-[90vh] flex flex-col cursor-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-hover"
          aria-label="Fermer la modale"
        >
          <HiX className="text-xl" />
        </button>

        {/* Image / Header */}
        <div className="relative h-48 sm:h-64 md:h-80 w-full shrink-0">
          <img src={project.image} alt={project.title[lang] || project.title.fr} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 sm:p-6 sm:p-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-2">{project.title[lang] || project.title.fr}</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Description détaillée */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">{t('portfolio.aboutProject')}</h4>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            {project.description[lang] || project.description.fr}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary cursor-hover py-2.5 px-5 sm:flex-1 justify-center">
                <FaGithub className="text-lg" />
                {t('portfolio.source')}
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary cursor-hover py-2.5 px-5 sm:flex-1 justify-center">
                <HiOutlineExternalLink className="text-lg" />
                {t('portfolio.demo')}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/** Carte projet individuelle */
function ProjectCard({ project, onClick, t, lang }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="card group overflow-hidden cursor-hover cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52 bg-slate-100 dark:bg-dark-soft">
        <img
          src={project.image}
          alt={project.title[lang] || project.title.fr}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay au hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-primary-600/80 flex items-center justify-center gap-4"
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Code source de ${project.title[lang] || project.title.fr}`}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/20 text-white
                         hover:bg-white/30 transition-colors duration-200 text-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Démo de ${project.title[lang] || project.title.fr}`}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/20 text-white
                         hover:bg-white/30 transition-colors duration-200 text-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <HiOutlineExternalLink />
            </a>
          )}
        </motion.div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span key={tag} className="tech-tag">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-slate-100 mb-2 group-hover:text-primary-500 transition-colors">
          {project.title[lang] || project.title.fr}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
          {project.description[lang] || project.description.fr}
        </p>

        {/* Lien GitHub texte */}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500
                       hover:text-primary-600 transition-colors group/link"
          >
            {/* Le texte "Voir sur GitHub" n'est pas passé en t() ici car pas accessible directement si on ne passe pas t en prop, mais on peut le faire s'il le faut. 
                Pour éviter des props drilling inutiles, on va le laisser en français, ou le passer depuis Portfolio. 
                Mais pour aller vite, on utilise le mot GitHub qui est universel. */}
            GitHub
            <HiOutlineCode className="transition-transform group-hover/link:translate-x-1" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
