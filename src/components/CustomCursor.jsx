import { useEffect, useRef } from 'react';

/**
 * CustomCursor – Curseur personnalisé pour les appareils non-tactiles.
 * Suit la souris avec une animation fluide (lerp).
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Ne pas afficher le curseur sur les écrans tactiles
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let cx = 0, cy = 0, tx = 0, ty = 0;
    let rafId;

    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    document.addEventListener('mousemove', onMove, { passive: true });

    const animate = () => {
      cx += (tx - cx) * 0.3;
      cy += (ty - cy) * 0.3;
      cursor.style.left = `${cx}px`;
      cursor.style.top  = `${cy}px`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    // Agrandir le curseur sur les éléments interactifs
    const targets = document.querySelectorAll('a, button, .cursor-hover');
    const addHover   = () => cursor.classList.add('hovered');
    const removeHover= () => cursor.classList.remove('hovered');

    targets.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    const hide = () => { cursor.style.opacity = '0'; };
    const show = () => { cursor.style.opacity = '1'; };
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <>
      <style>{`
        .custom-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 99999;
          width: 14px;
          height: 14px;
          background: hsl(245, 85%, 60%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.25s, height 0.25s, background 0.25s, opacity 0.2s;
          mix-blend-mode: multiply;
        }
        .dark .custom-cursor {
          mix-blend-mode: screen;
        }
        .custom-cursor.hovered {
          width: 36px;
          height: 36px;
          background: rgba(99, 102, 241, 0.25);
        }
        @media (pointer: coarse) {
          .custom-cursor { display: none; }
        }
      `}</style>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
    </>
  );
}
