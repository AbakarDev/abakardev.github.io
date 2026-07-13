import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { MdEmail, MdFileDownload, MdCopyright } from 'react-icons/md';
import { personal, navLinks } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';

/**
 * Footer – Pied de page avec logo, navigation, réseaux sociaux et copyright.
 */
export default function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  const handleNavClick = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    { href: personal.github,   icon: FaGithub,       label: 'GitHub',      external: true },
    { href: personal.facebook, icon: FaFacebook,     label: 'Facebook',    external: true },
    { href: personal.tiktok,   icon: SiTiktok,        label: 'TikTok',      external: true },
    { href: `mailto:${personal.email}`, icon: MdEmail, label: 'Email',      external: false },
    { href: personal.cv,       icon: MdFileDownload,  label: 'Télécharger CV', external: false, download: true },
  ];

  return (
    <footer
      role="contentinfo"
      className="bg-slate-50 dark:bg-dark-soft border-t border-slate-100 dark:border-dark-border"
    >
      <div className="px-6 md:px-12 lg:px-24 xl:px-36 py-16 max-w-8xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6">

          {/* Logo + nom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <img
              src={personal.logo}
              alt="Logo Abakar Brahim Abakar"
              loading="lazy"
              width={65}
              height={65}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary-500/30 shadow-primary-sm"
            />
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-slate-100">
              {personal.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {personal.title[lang] || personal.title.fr} · {personal.location[lang] || personal.location.fr}
            </p>
          </motion.div>

          {/* Navigation footer */}
          <nav aria-label="Navigation footer" className="flex flex-wrap justify-center gap-6 mt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500
                           hover:text-primary-500 transition-colors duration-200"
              >
                {t(`nav.${link.href.replace('#', '')}`)}
              </a>
            ))}
          </nav>

          {/* Réseaux sociaux */}
          <nav aria-label="Réseaux sociaux" className="flex items-center gap-3">
            {socialLinks.map(({ href, icon: Icon, label, external, download }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                download={download || undefined}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl
                           bg-white dark:bg-white/5 border border-slate-200 dark:border-dark-border
                           text-slate-500 dark:text-slate-400 text-lg
                           hover:bg-primary-50 dark:hover:bg-primary-500/10
                           hover:text-primary-500 hover:border-primary-300 dark:hover:border-primary-500/40
                           transition-colors duration-200 shadow-primary-sm"
              >
                <Icon />
              </motion.a>
            ))}
          </nav>

          {/* Séparateur */}
          <div className="w-full h-px bg-slate-200 dark:bg-dark-border mt-2" />

          {/* Copyright */}
          <p className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
            <MdCopyright />
            <span>{year} {personal.name}. {t('footer.madeWith')}</span>
            <span className="text-red-400">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
