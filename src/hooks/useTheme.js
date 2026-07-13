import { useState, useEffect } from 'react';

/**
 * useTheme – Gère le mode sombre/clair avec persistance dans localStorage.
 * Respecte la préférence système de l'utilisateur par défaut.
 *
 * @returns {{ isDark: boolean, toggle: () => void, setDark: (v: boolean) => void }}
 */
export default function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    // 1. Vérifier localStorage en premier
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    // 2. Sinon, utiliser la préférence système
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Persister la préférence
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    // Appliquer la classe sur <html> pour Tailwind
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);
  const setDark = (value) => setIsDark(value);

  return { isDark, toggle, setDark };
}
