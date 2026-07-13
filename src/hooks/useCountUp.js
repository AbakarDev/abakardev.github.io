import { useState, useEffect, useRef } from 'react';

/**
 * useCountUp – Anime un compteur de 0 vers une valeur cible.
 * Démarre quand l'élément entre dans la viewport.
 *
 * @param {number} target - Valeur cible
 * @param {number} duration - Durée en ms (défaut: 1500)
 * @returns {{ count: number, ref: React.RefObject }}
 */
export default function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const steps = 60;
          const increment = target / steps;
          const interval = duration / steps;
          let current = 0;

          const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            setCount(Math.ceil(current));
            if (current >= target) clearInterval(timer);
          }, interval);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}
