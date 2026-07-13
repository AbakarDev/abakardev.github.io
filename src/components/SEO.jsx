import { Helmet } from 'react-helmet-async';
import { personal } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';

/**
 * SEO – Composant de gestion du SEO via react-helmet-async.
 * Génère toutes les balises meta, Open Graph, Twitter Cards et JSON-LD enrichi.
 * Optimisé pour distinguer Abakar Brahim Abakar des homonymes sur Google.
 */
export default function SEO() {
  const { lang } = useLanguage();

  const title = lang === 'en'
    ? `Abakar Brahim Abakar | Junior Full-Stack Developer – ENASTIC Chad | Portfolio`
    : `Abakar Brahim Abakar | Développeur Full-Stack Junior – ENASTIC Tchad | Portfolio`;

  const description = lang === 'en'
    ? `Official portfolio of Abakar Brahim Abakar (AbakarDev), Junior Full-Stack Developer from N'Djamena, Chad. Final year DAWM student at ENASTIC. Experienced in React, Symfony, Django, Spring Boot. Interned at Mahrasoft Innovation. Contact: abakarbrahim702@gmail.com`
    : `Portfolio officiel d'Abakar Brahim Abakar (AbakarDev), Développeur Full-Stack Junior de N'Djaména, Tchad. Étudiant en 3ᵉ année DAWM à l'ENASTIC. Maîtrise React, Symfony, Django, Spring Boot. Stage chez Mahrasoft Innovation. Contact : abakarbrahim702@gmail.com`;

  const url = personal.url;
  const image = personal.ogImage;

  // ── Données structurées JSON-LD Schema.org (Person) très enrichies ──
  // Ces données permettent à Google d'identifier précisément Abakar Brahim Abakar
  // et de le distinguer des homonymes.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',

    // Identité complète et non ambiguë
    name: 'Abakar Brahim Abakar',
    givenName: 'Abakar Brahim',
    familyName: 'Abakar',
    alternateName: ['AbakarDev', 'Abakar702', 'abakarbrahim702'],

    // Description unique
    description: lang === 'en'
      ? 'Junior Full-Stack Developer from Chad, specializing in React, Symfony, Django and Spring Boot. DAWM student at ENASTIC, N\'Djamena.'
      : 'Développeur Full-Stack Junior du Tchad, spécialisé en React, Symfony, Django et Spring Boot. Étudiant DAWM à l\'ENASTIC, N\'Djaména.',

    // Contact & URL officielle
    url: personal.url,
    email: 'abakarbrahim702@gmail.com',
    telephone: '+235922531 31',
    image: personal.ogImage,

    // Poste & titre professionnel
    jobTitle: lang === 'en' ? 'Junior Full-Stack Developer' : 'Développeur Full-Stack Junior',
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Developer',
      occupationLocation: {
        '@type': 'City',
        name: "N'Djaména",
      },
      skills: 'React, React Native, Symfony, Django, Spring Boot, Laravel, HTML5, CSS3, JavaScript, SQL',
    },

    // Formation — ENASTIC est unique et identifiant
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'ENASTIC',
        description: 'École Nationale des Technologies de l\'Information et de la Communication – N\'Djaména, Tchad',
        address: {
          '@type': 'PostalAddress',
          addressLocality: "N'Djaména",
          addressRegion: 'N\'Djaména',
          addressCountry: 'TD',
        },
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Lycée AL-ISRA',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'TD',
        },
      },
    ],

    // Expérience professionnelle
    worksFor: {
      '@type': 'Organization',
      name: 'Mahrasoft Innovation',
      description: 'Entreprise de développement logiciel – Tchad',
    },

    // Adresse précise
    address: {
      '@type': 'PostalAddress',
      addressLocality: "N'Djaména",
      addressRegion: "N'Djaména",
      addressCountry: 'TD',
    },
    nationality: {
      '@type': 'Country',
      name: 'Chad',
    },

    // Profils en ligne (pour vérification croisée par Google)
    sameAs: [
      'https://github.com/AbakarDev',
      'https://github.com/Abakar702',
      'https://www.facebook.com/profile.php?id=100070317761293',
      'https://abakardev.github.io/',
    ],

    // Compétences clés
    knowsAbout: [
      'React.js', 'React Native', 'JavaScript', 'TypeScript',
      'PHP', 'Symfony', 'Laravel', 'Django', 'Spring Boot',
      'HTML5', 'CSS3', 'SQL', 'MySQL', 'SQLite',
      'Git', 'GitHub', 'REST API', 'Full-Stack Development',
      'Mobile Development', 'Web Development',
    ],
  };

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* ── Titre ultra-spécifique ── */}
      <title>{title}</title>

      {/* ── SEO basique ── */}
      <meta name="description" content={description} />
      <meta name="keywords" content={[
        // Nom complet et variantes
        'Abakar Brahim Abakar', 'AbakarDev', 'Abakar702', 'abakarbrahim702',
        // Métier + localisation (combinaison unique)
        'Développeur Full-Stack Junior Tchad', 'Junior Full-Stack Developer Chad',
        'Développeur Web N\'Djaména', 'Web Developer N\'Djamena',
        // Formation unique
        'ENASTIC', 'DAWM ENASTIC', 'Étudiant ENASTIC Tchad',
        // Entreprise stage
        'Mahrasoft Innovation', 'Stage Développeur Tchad',
        // Technologies
        'React', 'Symfony', 'Django', 'Spring Boot', 'Laravel',
        'JavaScript', 'PHP', 'React Native', 'Portfolio',
        // Contact identifiant
        'abakarbrahim702@gmail.com',
      ].join(', ')} />
      <meta name="author"  content="Abakar Brahim Abakar" />
      <meta name="robots"  content="index, follow, max-snippet:-1, max-image-preview:large" />
      <link rel="canonical" href={url} />

      {/* ── Vérification Google Search Console ── */}
      <meta name="google-site-verification" content={personal.googleVerification} />

      {/* ── Open Graph (partage réseaux sociaux) ── */}
      <meta property="og:site_name"   content="Abakar Brahim Abakar – Portfolio" />
      <meta property="og:type"        content="profile" />
      <meta property="og:url"         content={url} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:image:alt"   content="Abakar Brahim Abakar – Développeur Full-Stack Junior, ENASTIC Tchad" />
      <meta property="og:locale"      content={lang === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="profile:first_name" content="Abakar Brahim" />
      <meta property="profile:last_name"  content="Abakar" />
      <meta property="profile:username"   content="AbakarDev" />

      {/* ── Twitter Cards ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:url"         content={url} />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />
      <meta name="twitter:image:alt"   content="Abakar Brahim Abakar – ENASTIC Chad Developer" />

      {/* ── JSON-LD Structured Data ── */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {/* ── Sécurité ── */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="Referrer-Policy"        content="strict-origin-when-cross-origin" />
    </Helmet>
  );
}
