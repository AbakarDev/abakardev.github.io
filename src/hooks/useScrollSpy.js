import { useState, useEffect } from 'react';

/**
 * useScrollSpy – Détecte la section visible et met à jour l'URL hash.
 * Utilisé pour surligner le lien actif dans la navigation.
 *
 * @param {string[]} sectionIds - Tableau des IDs de sections à observer
 * @param {number} offset - Décalage en px par rapport au haut de la viewport
 * @returns {string} ID de la section active
 */
export default function useScrollSpy(sectionIds, offset = 100) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${offset}px 0px -60% 0px`,
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return activeId;
}
