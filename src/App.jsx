import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import useTheme from './hooks/useTheme';

/**
 * App.jsx – Composant racine de l'application.
 *
 * Utilise HashRouter pour la compatibilité parfaite avec GitHub Pages
 * (pas de configuration serveur requise, URLs comme /#/section).
 * 
 * Note: Avec une SPA sur une seule page, React Router n'est utilisé
 * que pour la route "/" car tout le contenu est sur la Home page
 * avec navigation par ancres.
 */
export default function App() {
  // Initialise le thème (dark/light) depuis localStorage
  const { isDark } = useTheme();

  // Applique la classe 'dark' sur <html> pour Tailwind dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
