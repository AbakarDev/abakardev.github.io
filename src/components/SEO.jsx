import { Helmet } from 'react-helmet-async';
import { personal } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';

/**
 * SEO – Composant de gestion du SEO via react-helmet-async.
 * Génère toutes les balises meta, Open Graph, Twitter Cards et JSON-LD.
 *
 * @param {object} props
 * @param {string} [props.title]       - Titre de la page (override)
 * @param {string} [props.description] - Description (override)
 * @param {string} [props.url]         - URL canonique (override)
 * @param {string} [props.image]       - Image OG (override)
 */
export default function SEO() {
  const { lang } = useLanguage();

  const title = `${personal.name} | ${personal.title[lang] || personal.title.fr} – Portfolio`;
  const description = lang === 'en' 
    ? `Portfolio of ${personal.name}, passionate Junior Full-Stack Developer (React, Symfony, Django, Spring Boot). Final year DAWM student at ENASTIC, Chad. Available for internship or junior position.`
    : `Portfolio d'${personal.name}, développeur Full-Stack Junior passionné (React, Symfony, Django, Spring Boot). Étudiant en fin de cycle DAWM à l'ENASTIC, Tchad. Disponible pour stage ou poste junior.`;
  const url = personal.url;
  const image = personal.ogImage;

  // Données structurées JSON-LD Schema.org
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    url: personal.url,
    image: personal.ogImage,
    jobTitle: personal.title[lang] || personal.title.fr,
    alumniOf: 'ENASTIC',
    address: {
      '@type': 'PostalAddress',
      addressLocality: "N'Djaména",
      addressCountry: 'TD',
    },
    email: personal.email,
    sameAs: [personal.github, personal.github2],
  };

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Titre */}
      <title>{title}</title>

      {/* SEO basique */}
      <meta name="description"  content={description} />
      <meta name="keywords"     content="abakardev, Abakar Brahim Abakar, Développeur Full-Stack, Web, Mobile, Portfolio, ENASTIC, Tchad, React, JavaScript, PHP, Django, Spring Boot, Laravel, Symfony" />
      <meta name="author"       content={personal.name} />
      <meta name="robots"       content="index, follow" />
      <link rel="canonical"     href={url} />

      {/* Vérification Google */}
      <meta name="google-site-verification" content={personal.googleVerification} />

      {/* Open Graph */}
      <meta property="og:site_name"   content={personal.name} />
      <meta property="og:type"        content="website" />
      <meta property="og:url"         content={url} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:locale"      content={lang === 'fr' ? 'fr_FR' : 'en_US'} />

      {/* Twitter Cards */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:url"         content={url} />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {/* Sécurité */}
      <meta httpEquiv="X-Content-Type-Options"  content="nosniff" />
      <meta httpEquiv="Referrer-Policy"          content="strict-origin-when-cross-origin" />
    </Helmet>
  );
}
