// Basic interactions for portfolio
document.addEventListener("DOMContentLoaded", function () {
  // year in footer
  const y = new Date().getFullYear();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = y;

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});

// Coming soon handler
function comingSoon(evt) {
  evt.preventDefault();
  const el = evt.currentTarget;
  el.classList.add("pulse");
  // small toast
  const toast = document.createElement("div");
  toast.textContent = "Live demo: Coming soon — will deploy separately.";
  toast.style.position = "fixed";
  toast.style.right = "18px";
  toast.style.bottom = "18px";
  toast.style.background = "rgba(6,10,12,0.92)";
  toast.style.color = "#e6eef0";
  toast.style.padding = "10px 14px";
  toast.style.borderRadius = "10px";
  toast.style.boxShadow = "0 8px 24px rgba(0,0,0,0.6)";
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => document.body.removeChild(toast), 400);
  }, 2200);
}
