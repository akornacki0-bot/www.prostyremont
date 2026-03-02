(() => {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const hdr = document.getElementById("hdr");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  // mobile menu
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", (e) => {
      const t = e.target;
      if (t instanceof HTMLAnchorElement) {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof Node)) return;
      if (!nav.contains(t) && !burger.contains(t)) {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // smooth scroll with header offset
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const el = document.querySelector(href);
      if (!el) return;

      e.preventDefault();
      const headerH = hdr ? hdr.getBoundingClientRect().height : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - headerH + 6;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // counters (once)
  const counterEls = Array.from(document.querySelectorAll("[data-counter]"));
  if (counterEls.length) {
    const run = () => {
      counterEls.forEach((el) => {
        const target = Number(el.getAttribute("data-counter") || "0");
        const duration = 900;
        const start = performance.now();

        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          const value = Math.round(target * (1 - Math.pow(1 - p, 3)));
          el.textContent = `${value}+`;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    };

    const hero = document.querySelector(".hero");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((x) => x.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (hero) io.observe(hero);
    else run();
  }

  // contact form: mailto fallback
  const form = document.getElementById("form");
  const toast = document.getElementById("toast");

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = "block";
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => (toast.style.display = "none"), 4200);
  };

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const phone = String(fd.get("phone") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const message = String(fd.get("message") || "").trim();

      if (!name || !phone || !email) {
        showToast("Uzupełnij wymagane pola: imię, telefon i e-mail.");
        return;
      }

      const subject = encodeURIComponent("Prosty Remont — zgłoszenie / umów termin");
      const body = encodeURIComponent(
        `Imię i nazwisko: ${name}\nTelefon: ${phone}\nE-mail: ${email}\n\nWiadomość:\n${message || "-"}`
      );

      // docelowy e-mail (wg PDF)
      const to = "pr.kornacki@gmail.com";
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

      showToast("Otwieram pocztę… Jeśli nie działa, zadzwoń: 576 601 776.");
      form.reset();
    });
  }
})();
