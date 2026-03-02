// js/main.js
(() => {
  // year in footer
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // mobile nav
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // counters (belt)
  const counters = [...document.querySelectorAll("[data-counter]")];
  if (counters.length) {
    const animate = (el) => {
      const target = Number(el.getAttribute("data-counter") || "0");
      const duration = 900;
      const start = performance.now();
      const from = 0;

      const tick = (t) => {
        const p = Math.min(1, (t - start) / duration);
        const val = Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3)));
        el.textContent = String(val) + "+";
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animate(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.35 });

    counters.forEach(c => io.observe(c));
  }

  // contact form -> mailto (no backend)
  const form = document.getElementById("form");
  const toast = document.getElementById("toast");

  if (form) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const fd = new FormData(form);

      const name = String(fd.get("name") || "").trim();
      const phone = String(fd.get("phone") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const msg = String(fd.get("message") || "").trim();

      const subject = encodeURIComponent("Prosty Remont — zapytanie z www");
      const body = encodeURIComponent(
        `Imię i nazwisko: ${name}\nTelefon: ${phone}\nE-mail: ${email}\n\nWiadomość:\n${msg || "(brak)"}`
      );

      const mailto = `mailto:pr.kornacki@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;

      if (toast) {
        toast.textContent = "Otwieram e-mail…";
        toast.style.display = "block";
        setTimeout(() => (toast.style.display = "none"), 2200);
      }
    });
  }
})();
