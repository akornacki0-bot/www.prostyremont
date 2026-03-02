(() => {
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  const header = document.getElementById("header");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close nav when clicking a link (mobile)
    nav.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof HTMLAnchorElement && target.classList.contains("nav__link")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close nav on outside click
    document.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof Node)) return;
      if (!nav.contains(t) && !navToggle.contains(t)) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Smooth scroll with offset (sticky header)
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const el = document.querySelector(href);
      if (!el) return;

      e.preventDefault();
      const headerH = header ? header.getBoundingClientRect().height : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - headerH + 6;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // Counter animation (only once)
  const counterEls = Array.from(document.querySelectorAll("[data-counter]"));
  const animateCounters = () => {
    counterEls.forEach((el) => {
      const target = Number(el.getAttribute("data-counter") || "0");
      const duration = 900;
      const start = performance.now();
      const from = 0;

      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const value = Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3)));
        el.textContent = `${value}+`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };

  if (counterEls.length) {
    const hero = document.querySelector(".hero");
    const io = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((en) => en.isIntersecting);
        if (anyVisible) {
          animateCounters();
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (hero) io.observe(hero);
    else animateCounters();
  }

  // Contact form (no backend) — friendly toast + mailto fallback
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("formToast");

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = "block";
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => (toast.style.display = "none"), 4200);
  };

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const phone = String(fd.get("phone") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const message = String(fd.get("message") || "").trim();

      // Minimal validation
      if (!name || !phone || !email) {
        showToast("Uzupełnij wymagane pola: imię, telefon i e-mail.");
        return;
      }

      // Fallback: open mail client (możesz podpiąć Formspree/EmailJS później)
      const subject = encodeURIComponent("Prosty Remont — umów termin");
      const body = encodeURIComponent(
        `Imię i nazwisko: ${name}\nTelefon: ${phone}\nE-mail: ${email}\n\nWiadomość:\n${message || "-"}`
      );

      // Podmień docelowy adres jeśli chcesz
      const to = "kontakt@prostyremont.com";
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

      showToast("Otwieram klienta poczty… Jeśli nie masz poczty, zadzwoń: 576 601 776.");
      form.reset();
    });
  }
})();
