/* ===== MOBILE NAV TOGGLE ===== */

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    nav.style.display = expanded ? "none" : "flex";
  });
}

/* ===== STATS COUNTER ===== */

const counters = document.querySelectorAll(".stat-num");

const runCounter = (el) => {
  const target = parseFloat(el.dataset.count);
  let current = 0;
  const step = target / 60;

  const tick = () => {
    current += step;
    if (current >= target) {
      el.textContent = target;
    } else {
      el.textContent = Math.floor(current);
      requestAnimationFrame(tick);
    }
  };
  tick();
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach(counter => observer.observe(counter));

/* ===== VIDEO FALLBACK ===== */

document.querySelectorAll("video").forEach(video => {
  video.addEventListener("error", () => {
    video.style.display = "none";
    if (video.parentElement) {
      video.parentElement.style.minHeight = "300px";
    }
  });
});

/* ===== FAKE FORM SUBMIT ===== */

window.fakeSubmit = function (e) {
  e.preventDefault();
  const note = document.getElementById("formNote");
  if (note) {
    note.textContent = "Thanks — I will be in touch shortly.";
  }
  return false;
};

/* ===== FOOTER YEAR ===== */

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

