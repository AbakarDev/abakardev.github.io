import { useRef } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineDeviceMobile, HiOutlineTerminal, HiDatabase } from 'react-icons/hi';
import { SiVsco, SiIntellijidea } from 'react-icons/si';
import { FaGitAlt } from 'react-icons/fa';
import { skills, tools } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';

const toolIcons = {
  git:      FaGitAlt,
  vscode:   SiVsco,
  intellij: SiIntellijidea,
  mobile:   HiOutlineDeviceMobile,
  database: HiDatabase,
  terminal: HiOutlineTerminal,
};

/**
 * Skills – Barres de compétences animées + outils.
 */
export default function Skills() {
  const { t } = useLanguage();
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
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
          <span className="section-tag">{t('skills.tag')}</span>
          <h2 id="skills-title" className="section-title">{t('skills.title')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">

          {/* ── Barres de compétences ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} delay={i * 0.1} />
            ))}
          </motion.div>

          {/* ── Outils & Environnements ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="card p-8"
          >
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-slate-100 mb-6">
              {t('skills.tools')}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tools.map((tool) => {
                const Icon = toolIcons[tool.icon] || HiOutlineTerminal;
                return (
                  <motion.li
                    key={tool.name}
                    whileHover={{ x: 4, backgroundColor: 'rgba(99,102,241,0.05)' }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl
                               border border-slate-100 dark:border-dark-border
                               text-slate-600 dark:text-slate-400 text-sm font-medium
                               transition-colors duration-200 cursor-hover"
                  >
                    <span className="text-primary-500 text-lg flex-shrink-0">
                      <Icon />
                    </span>
                    {tool.name}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Barre de compétence individuelle animée au scroll */
function SkillBar({ skill, delay }) {
  const ref = useRef(null);

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {skill.name}
        </span>
        <span className="text-sm font-bold text-primary-500">
          {skill.percent}%
        </span>
      </div>
      <div
        className="skill-track"
        role="progressbar"
        aria-valuenow={skill.percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name} : ${skill.percent}%`}
      >
        <motion.div
          className="skill-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percent}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1.2,
            delay: delay,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </div>
    </div>
  );
}
