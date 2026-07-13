import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker,
  HiOutlinePaperAirplane, HiCheckCircle, HiExclamationCircle,
} from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { personal } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';
import emailjs from '@emailjs/browser';

const INITIAL_STATE = { name: '', email: '', subject: '', message: '' };

/**
 * Contact – Formulaire de contact avec validation et intégration EmailJS.
 */
export default function Contact() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState(INITIAL_STATE);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const contactInfo = [
    {
      icon: HiOutlineMail,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: HiOutlinePhone,
      label: lang === 'en' ? 'Phone' : 'Téléphone',
      value: personal.phone,
      href: `tel:${personal.phone.replace(/\s/g, '')}`,
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'github.com/AbakarDev',
      href: personal.github,
      external: true,
    },
    {
      icon: HiOutlineLocationMarker,
      label: t('about.location'),
      value: personal.location[lang] || personal.location.fr,
      href: null,
    },
  ];

  const validate = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = 'Le nom est requis';
    if (!form.email.trim())   errs.email   = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email invalide';
    if (!form.subject.trim()) errs.subject = 'Le sujet est requis';
    if (!form.message.trim()) errs.message = 'Le message est requis';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');

    try {
      // Intégration EmailJS - Remplacez par vos propres clés (Service ID, Template ID, Public Key)
      // Vous pouvez créer un compte gratuit sur https://www.emailjs.com/
      await emailjs.sendForm(
        'VOTRE_SERVICE_ID', // ex: 'service_123456'
        'VOTRE_TEMPLATE_ID', // ex: 'template_123456'
        formRef.current,
        'VOTRE_CLE_PUBLIQUE' // ex: 'user_123456789'
      );
      setStatus('success');
      setForm(INITIAL_STATE);
      
      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      
      // Fallback mailto: au cas où EmailJS échoue ou n'est pas encore configuré
      const body = encodeURIComponent(
        `Bonjour Abakar,\n\nNom : ${form.name}\nEmail : ${form.email}\n\n${form.message}`
      );
      window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(form.subject)}&body=${body}`;
      
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
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
          <span className="section-tag">{t('contact.tag')}</span>
          <h2 id="contact-title" className="section-title">{t('contact.title')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">

          {/* ── Informations de contact ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              {t('contact.desc')}
            </p>

            {contactInfo.map(({ icon: Icon, label, value, href, external }) => (
              <motion.div
                key={label}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="card card-hover flex items-center gap-4 p-5 cursor-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/50
                                text-primary-500 flex items-center justify-center text-xl flex-shrink-0">
                  <Icon />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="text-slate-700 dark:text-slate-300 font-medium text-sm
                                 hover:text-primary-500 transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">{value}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Formulaire de contact ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form
              ref={formRef}
              id="contact-form"
              noValidate
              onSubmit={handleSubmit}
              className="card p-8 space-y-5"
            >
              {/* Message de statut */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20
                             border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400"
                >
                  <HiCheckCircle className="text-xl flex-shrink-0" />
                  <p className="text-sm font-medium">{t('contact.formSuccess')}</p>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20
                             border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400"
                >
                  <HiExclamationCircle className="text-xl flex-shrink-0" />
                  <p className="text-sm font-medium">{t('contact.formError')}</p>
                </motion.div>
              )}

              {/* Champs du formulaire */}
              {[
                { id: 'contact-name',    name: 'name',    type: 'text',  label: t('contact.formName'), placeholder: t('contact.formPlaceholderName') },
                { id: 'contact-email',   name: 'email',   type: 'email', label: t('contact.formEmail'), placeholder: 'votre@email.com' },
                { id: 'contact-subject', name: 'subject', type: 'text',  label: t('contact.formSubject'), placeholder: t('contact.formPlaceholderSubject') },
              ].map(({ id, name, type, label, placeholder }) => (
                <div key={id} className="space-y-1.5">
                  <label htmlFor={id} className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {label}
                  </label>
                  <input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                    required
                    autoComplete={name === 'name' ? 'name' : name === 'email' ? 'email' : 'off'}
                    className={`w-full px-4 py-3 rounded-xl border text-sm
                               bg-white dark:bg-white/5 text-slate-800 dark:text-slate-200
                               placeholder:text-slate-400 dark:placeholder:text-slate-600
                               transition-all duration-200 outline-none
                               ${errors[name]
                                 ? 'border-red-400 dark:border-red-600 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/50'
                                 : 'border-slate-200 dark:border-dark-border focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900/30'
                               }`}
                  />
                  {errors[name] && (
                    <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}

              {/* Textarea */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t('contact.formMessage')}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder={t('contact.formPlaceholderMessage')}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border text-sm resize-none
                             bg-white dark:bg-white/5 text-slate-800 dark:text-slate-200
                             placeholder:text-slate-400 dark:placeholder:text-slate-600
                             transition-all duration-200 outline-none
                             ${errors.message
                               ? 'border-red-400 dark:border-red-600 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/50'
                               : 'border-slate-200 dark:border-dark-border focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900/30'
                             }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Bouton envoyer */}
              <motion.button
                type="submit"
                id="contact-submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary justify-center cursor-hover disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <HiOutlinePaperAirplane className="text-lg rotate-90" />
                )}
                {status === 'sending' ? t('contact.formSending') : t('contact.formSend')}
              </motion.button>

              <p className="text-xs text-slate-400 text-center">
                {t('contact.formRedirectInfo')}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
