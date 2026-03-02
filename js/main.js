(() => {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  const hdr = document.getElementById("hdr");

const setHdrH = () => {
  if (!hdr) return;
  const h = Math.ceil(hdr.getBoundingClientRect().height);
  document.documentElement.style.setProperty("--hdrH", `${h}px`);
};

setHdrH();
window.addEventListener("resize", setHdrH);

  const panels = Array.from(document.querySelectorAll("[data-panel]"));
  const navLinks = Array.from(document.querySelectorAll("[data-nav]"));

  const getPanel = (name) => panels.find(p => p.dataset.panel === name);

  const closeMenu = () => {
    if (!nav || !burger) return;
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  };

  const openPanel = (name, { pushHash = true } = {}) => {
    const panel = getPanel(name);
    if (!panel) return;

    panels.forEach(p => p.classList.toggle("is-active", p === panel));

    const scroller = panel.querySelector(".panel__scroll");
    if (scroller) scroller.scrollTo({ top: 0, behavior: "auto" }); // ✅ zamiast "instant"

    if (pushHash) history.replaceState(null, "", `#${name}`);

    closeMenu();
  };

  // burger
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // klik w linki menu
  navLinks.forEach(a => {
    a.addEventListener("click", (e) => {
      const name = a.dataset.nav;
      if (!name) return;
      e.preventDefault();
      openPanel(name);
    });
  });

  // start z hash
  const initial = (location.hash || "#start").slice(1);
  openPanel(initial, { pushHash: false });

  window.addEventListener("hashchange", () => {
    const name = (location.hash || "#start").slice(1);
    openPanel(name, { pushHash: false });
  });
})();
