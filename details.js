document.addEventListener("DOMContentLoaded", function () {
  // --- Get URL Parameters ---
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title");
  const src = urlParams.get("src");
  const description = urlParams.get("description");

  // --- Display Data ---
  if (title) document.getElementById("detail-title").textContent = title;
  if (src) document.getElementById("detail-image").src = src;
  if (description) document.getElementById("detail-description").textContent = description;

  // --- Dark Mode Sync ---
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("active");
  } else {
    document.body.classList.remove("active");
  }

  // --- Custom Cursor ---
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  const hoverElements = document.querySelectorAll('a, button, .btn');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
});
