import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  fr: {
    nav: { home: 'Accueil', about: 'À propos', portfolio: 'Projets', skills: 'Compétences', gallery: 'Galerie', parcours: 'Parcours', contact: 'Contact' },
    hero: { cv: 'Mon CV', projects: 'Voir mes projets', available: 'Disponible' },
    about: { tag: 'Curriculum', title: 'À propos de moi', p1: 'Étudiant en fin de 3ᵉ année de Développement d\'Applications Web et Mobile (DAWM) à l\'ENASTIC, antenne d\'Amdjarass, je suis passionné par la conception de produits numériques modernes et utiles. Cette année, j\'ai renforcé mes compétences en React Native, Symfony, Django et Spring Boot, en complément de mes acquis en React.js, JavaScript, PHP, SQL, Java et Python.', p2: 'J\'aime transformer des idées en applications fonctionnelles, apprendre rapidement de nouvelles technologies et produire un travail propre, structuré et évolutif.', profile: 'Profil', education: 'Formation', location: 'Localisation', availability: 'Disponibilité', contactBtn: 'Me contacter' },
    portfolio: { tag: 'Portfolio', title: 'Réalisations Récentes', all: 'Tous', source: 'Code source', demo: 'Voir le site', aboutProject: 'À propos de ce projet', viewOnGithub: 'Voir sur GitHub', allOnGithub: 'Tous mes projets sur GitHub' },
    skills: { tag: 'Compétences', title: 'Expertise Technique', tools: 'Outils & Environnements' },
    gallery: { tag: 'Vision', title: 'Galerie Photos' },
    parcours: { tag: 'Éducation & Expérience', title: 'Mon Parcours' },
    contact: { tag: 'Restons en contact', title: 'Contactez-moi', desc: 'Je suis disponible pour des opportunités de stage, des postes juniors ou des collaborations freelance. N\'hésitez pas à me contacter !', formName: 'Nom complet', formEmail: 'Email', formSubject: 'Sujet', formMessage: 'Message', formPlaceholderName: 'Votre nom', formPlaceholderSubject: 'Objet de votre message', formPlaceholderMessage: 'Votre message...', formSend: 'Envoyer le message', formSending: 'Envoi...', formRedirectInfo: 'Le formulaire vous redirigera vers votre client email.', formSuccess: 'Message envoyé ! Je vous répondrai rapidement.', formError: 'Une erreur est survenue. Réessayez ou contactez-moi par email.' },
    footer: { madeWith: 'Fait avec' }
  },
  en: {
    nav: { home: 'Home', about: 'About', portfolio: 'Projects', skills: 'Skills', gallery: 'Gallery', parcours: 'Journey', contact: 'Contact' },
    hero: { cv: 'My Resume', projects: 'View Projects', available: 'Available' },
    about: { tag: 'Curriculum', title: 'About Me', p1: 'As a 3rd-year student in Web & Mobile App Development (DAWM) at ENASTIC, Amdjarass campus, I am passionate about crafting modern and useful digital products. This year, I strengthened my skills in React Native, Symfony, Django, and Spring Boot, building on my core knowledge of React.js, JavaScript, PHP, SQL, Java, and Python.', p2: 'I love transforming ideas into functional applications, learning new technologies quickly, and producing clean, structured, and scalable work.', profile: 'Profile', education: 'Education', location: 'Location', availability: 'Availability', contactBtn: 'Contact Me' },
    portfolio: { tag: 'Portfolio', title: 'Recent Works', all: 'All', source: 'Source Code', demo: 'Live Demo', aboutProject: 'About this project', viewOnGithub: 'View on GitHub', allOnGithub: 'All my projects on GitHub' },
    skills: { tag: 'Skills', title: 'Technical Expertise', tools: 'Tools & Environments' },
    gallery: { tag: 'Vision', title: 'Photo Gallery' },
    parcours: { tag: 'Education & Experience', title: 'My Journey' },
    contact: { tag: 'Let\'s connect', title: 'Get In Touch', desc: 'I am available for internship opportunities, junior positions, or freelance collaborations. Feel free to reach out!', formName: 'Full Name', formEmail: 'Email', formSubject: 'Subject', formMessage: 'Message', formPlaceholderName: 'Your name', formPlaceholderSubject: 'Message subject', formPlaceholderMessage: 'Your message...', formSend: 'Send Message', formSending: 'Sending...', formRedirectInfo: 'The form will redirect you to your email client.', formSuccess: 'Message sent! I will reply soon.', formError: 'An error occurred. Please try again or email me directly.' },
    footer: { madeWith: 'Made with' }
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'fr');

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === 'fr' ? 'en' : 'fr'));
  
  // Fonction de traduction
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
