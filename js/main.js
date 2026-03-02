(() => {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const hdr = document.getElementById("hdr");

  const panels = Array.from(document.querySelectorAll("[data-panel]"));
  const navLinks = Array.from(document.querySelectorAll("[data-nav]"));

  // ustawiamy wysokość headera do CSS var(--hdrH)
  const setHdrH = () => {
    if (!hdr) return;
    const h = Math.ceil(hdr.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--hdrH", `${h}px`);
  };
  setHdrH();
  window.addEventListener("resize", setHdrH);

  const closeMenu = () => {
    if (!nav || !burger) return;
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  };

  // burger
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // klik w menu -> scroll do sekcji
  navLinks.forEach(a => {
    a.addEventListener("click", (e) => {
      const name = a.dataset.nav;
      if (!name) return;

      const target = document.querySelector(`[data-panel="${CSS.escape(name)}"]`);
      if (!target) return;

      e.preventDefault();

      // hash
      history.replaceState(null, "", `#${name}`);

      // scroll z offsetem pod header (robimy ręcznie)
      const hdrH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--hdrH")) || 64;
      const y = target.getBoundingClientRect().top + window.scrollY - hdrH - 8;

      window.scrollTo({ top: y, behavior: "smooth" });
      closeMenu();
    });
  });

  // podświetlanie aktywnej zakładki na podstawie widocznej sekcji
  const setActive = (name) => {
    navLinks.forEach(a => a.classList.toggle("is-active", a.dataset.nav === name));
  };

  const observer = new IntersectionObserver((entries) => {
    // bierzemy sekcję najbardziej “w środku”
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    const name = visible.target.getAttribute("data-panel");
    if (name) setActive(name);
  }, {
    root: null,
    // środek ekranu, z uwzględnieniem headera
    rootMargin: "-30% 0px -55% 0px",
    threshold: [0.15, 0.25, 0.5, 0.75]
  });

  panels.forEach(p => observer.observe(p));

  // start z hasha
  const initial = (location.hash || "#start").slice(1);
  const initialTarget = document.querySelector(`[data-panel="${CSS.escape(initial)}"]`);
  if (initialTarget) {
    // ustaw aktywną od razu
    setActive(initial);

    // przewiń po załadowaniu
    requestAnimationFrame(() => {
      const hdrH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--hdrH")) || 64;
      const y = initialTarget.getBoundingClientRect().top + window.scrollY - hdrH - 8;
      window.scrollTo({ top: y, behavior: "auto" });
    });
  } else {
    setActive("start");
  }

  // ESC zamyka menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();
