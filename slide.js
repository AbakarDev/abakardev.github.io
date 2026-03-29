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
  const skillPercents = document.querySelectorAll(".skill-percent");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        skillFills.forEach((fill) => {
          fill.style.width = fill.getAttribute("data-width");
        });
        
        skillPercents.forEach((percent) => {
          const target = parseInt(percent.getAttribute("data-target"));
          let current = 0;
          const increment = target / 60; // adjust animation speed
          
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              percent.innerText = Math.ceil(current) + "%";
              requestAnimationFrame(updateCounter);
            } else {
              percent.innerText = target + "%";
            }
          };
          updateCounter();
        });
        
        skillObserver.disconnect();
      }
    },
    { threshold: 0.5 }
  );

  if (skillSection) skillObserver.observe(skillSection);

  // --- Magnetic Buttons Effect ---
  const magnets = document.querySelectorAll('.btn');
  magnets.forEach(magnet => {
    magnet.addEventListener('mousemove', function(e) {
      const position = magnet.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      
      this.style.transition = 'none';
      this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    magnet.addEventListener('mouseleave', function() {
      this.style.transition = 'var(--transition)';
      this.style.transform = 'translate(0px, 0px)';
    });
  });

  // --- Custom Cursor ---
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', e => {
    // using requestAnimationFrame for smoother custom cursor can be nice, 
    // but updating inline styles directly inside mousemove works well for position absolute
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  const hoverElements = document.querySelectorAll('a, button, .portfolio-card, .info-card, #modesombre, #menu-icon');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });

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
  const detailButton = document.querySelector(".details-button");
  if (detailButton) {
    detailButton.onclick = () => {
      const slide = slides[currentIndex];
      const title = slide.getAttribute("data-title");
      const src = slide.getAttribute("src");
      const desc = slide.getAttribute("data-description");
      const params = new URLSearchParams({ title, src, description: desc }).toString();
      window.location.href = `details.html?${params}`;
    };
  }
});
