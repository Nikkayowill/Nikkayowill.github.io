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

const zoomButtons = document.querySelectorAll(".media-zoom");

if (zoomButtons.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.hidden = true;
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Expanded project screenshot");
  lightbox.innerHTML = `
    <button class="image-lightbox__close" type="button">Close</button>
    <img class="image-lightbox__image" alt="" />
    <p class="image-lightbox__caption"></p>
  `;
  document.body.append(lightbox);

  const closeButton = lightbox.querySelector(".image-lightbox__close");
  const lightboxImage = lightbox.querySelector(".image-lightbox__image");
  const lightboxCaption = lightbox.querySelector(".image-lightbox__caption");
  let activeZoomButton = null;

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    window.setTimeout(() => {
      lightbox.hidden = true;
      lightboxImage.removeAttribute("src");
    }, 250);
    if (activeZoomButton) activeZoomButton.focus();
  }

  zoomButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      if (!image) return;

      activeZoomButton = button;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = image.alt;
      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
      window.requestAnimationFrame(() => {
        lightbox.classList.add("is-open");
        closeButton.focus();
      });
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
}
