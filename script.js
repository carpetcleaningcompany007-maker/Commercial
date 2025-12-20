/* ===============================
   MOBILE NAV TOGGLE
================================ */

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    nav.style.display = expanded ? "none" : "flex";
  });
}

/* ===============================
   STATS COUNTER (SINGLE SYSTEM)
   Uses .stat-num + data-count
================================ */

const counters = document.querySelectorAll(".stat-num");

const runCounter = (el) => {
  const target = parseFloat(el.dataset.count);
  if (isNaN(target)) return;

  let current = 0;
  const step = Math.max(1, target / 60);

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

if (counters.length) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach(counter => counterObserver.observe(counter));
}

/* ===============================
   VIDEO FALLBACK
================================ */

document.querySelectorAll("video").forEach(video => {
  video.addEventListener("error", () => {
    video.style.display = "none";
    if (video.parentElement) {
      video.parentElement.style.minHeight = "300px";
    }
  });
});

/* ===============================
   FAKE FORM SUBMIT
================================ */

window.fakeSubmit = function (e) {
  e.preventDefault();
  const note = document.getElementById("formNote");
  if (note) {
    note.textContent = "Thanks — I will be in touch shortly.";
  }
  return false;
};

/* ===============================
   FOOTER YEAR
================================ */

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
