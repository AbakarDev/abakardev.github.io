document.addEventListener("DOMContentLoaded", function () {
  // --- Navigation & Scroll Effects ---
  const header = document.querySelector("header");
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar a");

  // Mobile Menu Toggle
  menuIcon.onclick = () => {
    navbar.classList.toggle("active");
    menuIcon.classList.toggle("bx-x");
  };

  // Sticky Header & Active Link on Scroll
  window.addEventListener("scroll", () => {
    // Header shadow and height
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Active link highlighting
    let current = "";
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });

    // Close mobile menu on scroll
    navbar.classList.remove("active");
    menuIcon.classList.remove("bx-x");
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Dark Mode ---
  const darkmodeBtn = document.querySelector("#modesombre");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("active");
    darkmodeBtn.classList.replace("bx-moon", "bx-sun");
  }

  darkmodeBtn.onclick = () => {
    document.body.classList.toggle("active");
    if (document.body.classList.contains("active")) {
      darkmodeBtn.classList.replace("bx-moon", "bx-sun");
      localStorage.setItem("theme", "dark");
    } else {
      darkmodeBtn.classList.replace("bx-sun", "bx-moon");
      localStorage.setItem("theme", "light");
    }
  };

  // --- Skills Animation ---
  const skillSection = document.querySelector("#skills");
  const skillFills = document.querySelectorAll(".skill-fill");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        skillFills.forEach((fill) => {
          fill.style.width = fill.getAttribute("data-width");
        });
        skillObserver.disconnect();
      }
    },
    { threshold: 0.5 }
  );

  if (skillSection) skillObserver.observe(skillSection);

  // --- Gallery Slideshow ---
  let currentIndex = 0;
  const slides = document.querySelectorAll(".slideshow-container img");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const detailButtons = document.querySelectorAll(".details-button");

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  if (nextBtn) nextBtn.onclick = nextSlide;
  if (prevBtn) prevBtn.onclick = prevSlide;

  // Auto slide
  let slideInterval = setInterval(nextSlide, 5000);

  // Stop auto slide on interaction
  const slideshow = document.querySelector(".slideshow");
  if (slideshow) {
    slideshow.onmouseenter = () => clearInterval(slideInterval);
    slideshow.onmouseleave = () => (slideInterval = setInterval(nextSlide, 5000));
  }

  // Details Redirect
  detailButtons.forEach((btn, index) => {
    btn.onclick = () => {
      const slide = slides[index];
      const title = slide.getAttribute("data-title");
      const src = slide.getAttribute("src");
      const desc = slide.getAttribute("data-description");
      const params = new URLSearchParams({ title, src, description: desc }).toString();
      window.location.href = `details.html?${params}`;
    };
  });
});
