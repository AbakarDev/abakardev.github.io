'use strict';

document.addEventListener("DOMContentLoaded", () => {
  // --- Get URL Parameters ---
  const urlParams = new URLSearchParams(window.location.search);
  const title       = urlParams.get("title");
  const src         = urlParams.get("src");
  const description = urlParams.get("description");

  // --- Utility functions ---
  const $ = (sel) => document.querySelector(sel);

  // --- Display Data with basic protection ---
  if (title) $('#detail-title').textContent = title;
  if (src)   $('#detail-image').src = src;
  if (description) $('#detail-description').textContent = description;

  // --- Dark Mode Sync ---
  const savedTheme = localStorage.getItem("theme");
  document.body.classList.toggle("active", savedTheme === "dark");

  // --- Custom Cursor (Interpolated for smoothness) ---
  const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;
  if (!isTouchDevice()) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    let cx = 0, cy = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', e => {
      tx = e.clientX;
      ty = e.clientY;
    }, { passive: true });

    const animateCursor = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      cursor.style.left = `${cx}px`;
      cursor.style.top  = `${cy}px`;
      requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    document.querySelectorAll('a, button, .btn').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
  }
});
