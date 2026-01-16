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
});
