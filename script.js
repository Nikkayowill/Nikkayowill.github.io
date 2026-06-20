const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const progress = document.querySelector(".progress");
const orbit = document.querySelector(".hero-orbit");

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll(".project").forEach((project) => {
  if (project.dataset.color) project.style.setProperty("--hover", project.dataset.color);
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("in-view"));
}

function updateScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;

  if (!reducedMotion && orbit) {
    orbit.style.translate = `0 ${window.scrollY * 0.11}px`;
  }
}

let scrollFrame;
function scheduleScrollUpdate() {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    updateScroll();
    scrollFrame = null;
  });
}

window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
updateScroll();
