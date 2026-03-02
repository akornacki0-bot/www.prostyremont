(() => {
  const chips = Array.from(document.querySelectorAll(".chip[data-filter]"));
  const items = Array.from(document.querySelectorAll(".gitem[data-category]"));

  if (!chips.length || !items.length) return;

  const setActive = (chip) => {
    chips.forEach((c) => {
      c.classList.toggle("is-active", c === chip);
      c.setAttribute("aria-selected", c === chip ? "true" : "false");
    });
  };

  const apply = (filter) => {
    items.forEach((it) => {
      const cat = it.getAttribute("data-category");
      const show = filter === "all" || cat === filter;
      it.classList.toggle("is-hidden", !show);
    });
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const f = chip.getAttribute("data-filter") || "all";
      setActive(chip);
      apply(f);
    });
  });

  apply("all");
})();
