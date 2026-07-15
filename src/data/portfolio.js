/**
 * data/portfolio.js – Données centralisées du portfolio.
 * Modifier ce fichier pour mettre à jour le contenu du site.
 */

/* ── Informations personnelles ── */
export const personal = {
  name: 'Abakar Brahim Abakar',
  nameShort: 'Abakar Brahim',
  title: { fr: 'Développeur Full-Stack Junior', en: 'Junior Full-Stack Developer' },
  tagline: { fr: 'Passionné par la conception de produits numériques modernes.', en: 'Passionate about crafting modern digital products.' },
  description: {
    fr: "Passionné par la conception de produits numériques modernes, je transforme des idées en applications web et mobiles fiables et performantes. Étudiant en fin de cycle DAWM à l'ENASTIC, Tchad.",
    en: "Passionate about crafting modern digital products, I transform ideas into reliable and efficient web and mobile applications. Final year DAWM student at ENASTIC, Chad."
  },
  badge: { fr: 'Disponible pour stage & missions', en: 'Available for internship & missions' },
  location: { fr: "N'Djaména, Tchad", en: "N'Djamena, Chad" },
  email: 'abakarbrahim702@gmail.com',
  phone: '+235 92 25 31 31',
  availability: { fr: 'Stage / Junior / Freelance', en: 'Internship / Junior / Freelance' },
  education: { fr: 'DAWM – ENASTIC', en: 'DAWM – ENASTIC' },
  startYear: 2022, // Année de début de formation (pour calcul dynamique)

  // Liens
  github:   'https://github.com/AbakarDev',
  github2:  'https://github.com/Abakar702',
  facebook: 'https://www.facebook.com/profile.php?id=100070317761293',
  tiktok:   'https://www.tiktok.com/@developpeur2024',
  youtube:  'https://www.youtube.com/watch?v=e-V9O2wGjDc',

  // Fichiers
  cv: '/Cv.pdf',
  avatar: '/Abakar.webp',
  photo2: '/photo2.webp',
  logo: '/logo.webp',

  // JSON-LD Schema.org (SEO)
  url: 'https://abakardev.github.io/',
  ogImage: 'https://abakardev.github.io/Abakar.jpeg',
  googleVerification: 'googleb06178cc0de32e0f',
};

/* ── Statistiques Hero ── */
export const heroStats = [
  {
    id: 'formation',
    icon: 'graduation',
    value: new Date().getFullYear() - 2022,
    label: { fr: 'Formation', en: 'Training' },
    suffix: '',
  },
  {
    id: 'projects',
    icon: 'rocket',
    value: 10,
    label: { fr: 'Projets', en: 'Projects' },
    suffix: '+',
  },
  {
    id: 'techs',
    icon: 'code',
    value: 6,
    label: { fr: 'Techs', en: 'Techs' },
    suffix: '+',
  },
];

/* ── Compétences techniques ── */
export const skills = [
  { name: 'HTML5 / CSS3',            percent: 85 },
  { name: 'JavaScript (ES6+)',       percent: 65 },
  { name: 'React.js / React Native', percent: 55 },
  { name: 'PHP / Symfony / Laravel', percent: 50 },
  { name: 'Django / Spring Boot',    percent: 40 },
  { name: 'SQL / Bases de données',  percent: 60 },
];

/* ── Outils & Environnements ── */
export const tools = [
  { name: 'Git / GitHub',     icon: 'git' },
  { name: 'VS Code',          icon: 'vscode' },
  { name: 'IntelliJ IDEA',    icon: 'intellij' },
  { name: 'React Native CLI', icon: 'mobile' },
  { name: 'MySQL / SQLite',   icon: 'database' },
  { name: 'CLI / Bash',       icon: 'terminal' },
];

/* ── Projets ── */
export const projects = [
  {
    id: 1,
    title: { fr: 'Gestion de Projets', en: 'Project Management' },
    description: { 
      fr: 'Application orientée suivi des tâches, organisation des activités et collaboration en équipe.',
      en: 'Task-oriented application for activity organization and team collaboration.'
    },
    image: '/Images/project_man.webp',
    tags: ['React', 'Node.js'],
    github: 'https://github.com/Abakar702/gestion_projets',
    demo: null,
  },
  {
    id: 2,
    title: { fr: 'Plateforme E-commerce', en: 'E-commerce Platform' },
    description: {
      fr: "Boutique en ligne dynamique avec catalogue produits, gestion des utilisateurs et panier d'achat.",
      en: "Dynamic online store with product catalog, user management, and shopping cart."
    },
    image: '/Images/project_shop.webp',
    tags: ['PHP', 'Laravel'],
    github: 'https://github.com/Abakar702/Site_ecommerce',
    demo: null,
  },
  {
    id: 3,
    title: { fr: 'Advanced To-Do', en: 'Advanced To-Do' },
    description: {
      fr: 'Application légère de productivité avec gestion locale des tâches et persistance des données.',
      en: 'Lightweight productivity app with local task management and data persistence.'
    },
    image: '/Images/project_todo.webp',
    tags: ['JavaScript', 'LocalStorage'],
    github: 'https://github.com/Abakar702/MyTodoList',
    demo: null,
  },
  {
    id: 4,
    title: { fr: 'Portfolio Développeur', en: 'Developer Portfolio' },
    description: {
      fr: 'Ce portfolio professionnel – conçu et développé en vanilla HTML/CSS/JS puis migré vers React + Vite.',
      en: 'This professional portfolio – originally built in vanilla HTML/CSS/JS and migrated to React + Vite.'
    },
    image: '/Images/portfolio_hero_shot.webp',
    tags: ['React', 'Vite', 'Tailwind'],
    github: 'https://github.com/AbakarDev',
    demo: 'https://abakardev.github.io/',
  },
];

/* ── Parcours (Timeline) ── */
export const timeline = [
  {
    id: 1,
    date: { fr: '2025 – Stage', en: '2025 – Internship' },
    type: 'experience',
    badge: { fr: 'Expérience', en: 'Experience' },
    title: { fr: 'Développeur Stagiaire – Mahrasoft Innovation', en: 'Software Developer Intern – Mahrasoft Innovation' },
    description: {
      fr: "Participation à des projets réels en environnement professionnel, travail en équipe et renforcement de la discipline de production.",
      en: "Participation in real projects in a professional environment, teamwork, and strengthening of production discipline."
    }
  },
  {
    id: 2,
    date: { fr: '2024 – 2025', en: '2024 – 2025' },
    type: 'formation',
    badge: { fr: 'Formation', en: 'Education' },
    title: { fr: '3ᵉ Année DAWM – ENASTIC', en: '3rd Year DAWM – ENASTIC' },
    description: {
      fr: 'Architectures web avancées, React Native, Symfony, Django, Spring Boot, gestion de projet.',
      en: 'Advanced web architectures, React Native, Symfony, Django, Spring Boot, project management.'
    }
  },
  {
    id: 3,
    date: { fr: '2023 – 2024', en: '2023 – 2024' },
    type: 'formation',
    badge: { fr: 'Formation', en: 'Education' },
    title: { fr: '2ᵉ Année DAWM – ENASTIC', en: '2nd Year DAWM – ENASTIC' },
    description: {
      fr: 'Développement mobile, bases de données relationnelles, approfondissement full-stack.',
      en: 'Mobile development, relational databases, full-stack deepening.'
    }
  },
  {
    id: 4,
    date: { fr: '2022 – 2023', en: '2022 – 2023' },
    type: 'formation',
    badge: { fr: 'Formation', en: 'Education' },
    title: { fr: '1ʳᵉ Année DAWM – ENASTIC', en: '1st Year DAWM – ENASTIC' },
    description: {
      fr: 'Fondamentaux de la programmation, développement web et outils numériques.',
      en: 'Programming fundamentals, web development, and digital tools.'
    }
  },
  {
    id: 5,
    date: { fr: '2022', en: '2022' },
    type: 'diplome',
    badge: { fr: 'Diplôme', en: 'Degree' },
    title: { fr: 'Baccalauréat Série D', en: 'High School Diploma (Science)' },
    description: {
      fr: "Lycée privé AL-ISRA – Tchad. Diplôme de fin d'études secondaires.",
      en: "AL-ISRA Private High School – Chad. High school graduation diploma."
    }
  },
];

/* ── Galerie ── */
export const gallery = [
  {
    id: 1,
    src: '/Images/pro_code.webp',
    alt: { fr: 'Code et développement', en: 'Code and development' },
    title: { fr: 'Code & Développement', en: 'Code & Development' },
    description: { fr: "L'art de transformer des idées en lignes de code fonctionnelles.", en: 'The art of transforming ideas into functional lines of code.' },
  },
  {
    id: 2,
    src: '/Images/pro_workspace.webp',
    alt: { fr: 'Espace de travail', en: 'Workspace' },
    title: { fr: 'Workspace', en: 'Workspace' },
    description: { fr: "Un environnement propice à l'innovation et à la concentration.", en: 'An environment conducive to innovation and concentration.' },
  },
  {
    id: 3,
    src: '/Images/pro_meeting.webp',
    alt: { fr: 'Collaboration en équipe', en: 'Team collaboration' },
    title: { fr: 'Collaboration', en: 'Collaboration' },
    description: { fr: "L'échange d'idées est le moteur de chaque projet réussi.", en: 'The exchange of ideas is the engine of every successful project.' },
  },
];

/* ── Navigation ── */
export const navLinks = [
  { href: '#home',     label: 'Accueil' },
  { href: '#about',    label: 'À propos' },
  { href: '#portfolio',label: 'Projets' },
  { href: '#skills',   label: 'Compétences' },
  { href: '#gallery',  label: 'Galerie' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#contact',  label: 'Contact' },
];
