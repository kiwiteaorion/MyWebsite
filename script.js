// Prevent scroll position restoration
history.scrollRestoration = "manual";

// Mobile menu functionality
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    // Change menu icon
    const menuIcon = mobileMenuBtn.querySelector("i");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times");
  });

  // Close menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const menuIcon = mobileMenuBtn.querySelector("i");
      menuIcon.classList.add("fa-bars");
      menuIcon.classList.remove("fa-times");
    });
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Navbar background change on scroll
function updateNavbar() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(26, 27, 38, 0.98)";
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.backgroundColor = "rgba(26, 27, 38, 0.95)";
    navbar.style.boxShadow = "none";
  }
}

// Animate elements when they come into view
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".about-text, .skills, .contact-item, .social-link"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

// Initialize animations and scroll position
document.addEventListener("DOMContentLoaded", function () {
  // Scroll to top on page load
  window.scrollTo(0, 0);

  // Set initial styles for animation
  const elements = document.querySelectorAll(
    ".about-text, .skills, .contact-item, .social-link"
  );
  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Add hover effect to skills items
  const skillsItems = document.querySelectorAll(".skills li");
  skillsItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateX(10px)";
      item.style.transition = "transform 0.3s ease";
    });
    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateX(0)";
    });
  });

  // Add typing effect to hero text
  const heroText = document.querySelector(".hero-content p");
  if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = "";
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    setTimeout(typeWriter, 500); // Slight delay before starting typing
  }

  // Run initial animations and updates
  requestAnimationFrame(() => {
    updateNavbar();
    animateOnScroll();
  });
});

// Add scroll event listeners
window.addEventListener("scroll", () => {
  requestAnimationFrame(() => {
    updateNavbar();
    animateOnScroll();
  });
});

// Add parallax effect to hero section with performance optimization
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const hero = document.querySelector(".hero");
      const scrollPosition = window.pageYOffset;
      hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      ticking = false;
    });
    ticking = true;
  }
});
