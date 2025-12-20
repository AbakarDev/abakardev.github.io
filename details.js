// Récupérer les paramètres de l'URL
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get("title");
const src = urlParams.get("src");
const description = urlParams.get("description");

// Afficher les détails
document.getElementById("detail-image").src = src;
document.getElementById("detail-title").textContent = title;
document.getElementById("detail-description").textContent = description;

document.addEventListener("DOMContentLoaded", function () {
  // Vérifier l'état du thème au chargement de la page
  const savedTheme = localStorage.getItem("theme");

  // Appliquer le thème en fonction de la valeur dans localStorage
  if (savedTheme === "dark") {
    applyDarkTheme();
  } else {
    applyLightTheme();
  }

  // Fonctions pour appliquer les thèmes
  function applyDarkTheme() {
    document.body.classList.add("active");
    // Appliquez ici les styles spécifiques au mode sombre pour la page détails
    document.querySelectorAll(".details-section").forEach((elem) => {
      elem.style.backgroundColor = "black";
      elem.style.color = "white";
    });
  }

  function applyLightTheme() {
    document.body.classList.remove("active");
    // Appliquez ici les styles spécifiques au mode clair pour la page détails
    document.querySelectorAll(".details-section").forEach((elem) => {
      elem.style.backgroundColor = "#f4f4f4";
      elem.style.color = "black";
    });
  }
});
