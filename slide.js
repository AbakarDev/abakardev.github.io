document.addEventListener("DOMContentLoaded", function () {
  let currentIndex = 0;
  const images = document.querySelectorAll(".slideshow img");
  const prevButton = document.querySelector(".slideshow .prev");
  const nextButton = document.querySelector(".slideshow .next");
  const detailButtons = document.querySelectorAll(".slideshow .details-button");

  // Fonction pour afficher l'image actuelle
  function showImage(index) {
    images.forEach((img, i) => {
      const container = img.parentElement;
      img.classList.toggle("active", i === index);
      container.classList.toggle("active", i === index);
    });
  }

  // Fonction pour passer à l'image suivante
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  // Fonction pour revenir à l'image précédente
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  // Fonction pour rediriger vers la page de détails
  function redirectToDetails(title, src, description) {
    const queryParams = new URLSearchParams({
      title,
      src,
      description,
    }).toString();
    window.location.href = `details.html?${queryParams}`;
  }

  // Ajouter des écouteurs d'événements pour les boutons précédent et suivant
  prevButton.addEventListener("click", prevImage);
  nextButton.addEventListener("click", nextImage);

  // Ajouter des écouteurs d'événements pour les boutons de détails
  detailButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const img = images[index];
      const title = img.getAttribute("data-title");
      const src = img.getAttribute("src");
      const description = img.getAttribute("data-description");
      redirectToDetails(title, src, description);
    });
  });

  // Afficher la première image au chargement de la page
  showImage(currentIndex);

  // Sticky Navbar
  let header = document.querySelector("header");
  let menu = document.querySelector("#menu-icon");
  let navbar = document.querySelector(".navbar");

  menu.onclick = () => {
    navbar.classList.toggle("active");
  };
  window.onscroll = () => {
    navbar.classList.remove("active");
  };

  // Dark Mode
  let darkmode = document.querySelector("#modesombre");
  darkmode.style.cursor = "pointer";

  // Vérifier l'état du thème au chargement de la page
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("active");
    darkmode.classList.replace("bx-moon", "bx-sun");
    document.querySelectorAll(".parcours li").forEach((elem) => {
      elem.style.backgroundColor = "black";
    });
  } else {
    document.body.classList.remove("active");
    darkmode.classList.replace("bx-sun", "bx-moon");
    document.querySelectorAll(".parcours li").forEach((elem) => {
      elem.style.backgroundColor = "#f4f4f4";
    });
  }

  // Gestion du changement de thème
  darkmode.onclick = () => {
    if (darkmode.classList.contains("bx-moon")) {
      darkmode.classList.replace("bx-moon", "bx-sun");
      document.querySelectorAll(".parcours li").forEach((elem) => {
        elem.style.backgroundColor = "black";
      });
      document.body.classList.add("active");
      localStorage.setItem("theme", "dark"); // Enregistrer le thème sombre
    } else {
      darkmode.classList.replace("bx-sun", "bx-moon");
      document.querySelectorAll(".parcours li").forEach((elem) => {
        elem.style.backgroundColor = "#f4f4f4";
      });
      document.body.classList.remove("active");
      localStorage.setItem("theme", "light"); // Enregistrer le thème clair
    }
  };
});
