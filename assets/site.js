// Keep links to sections of the previous single-page website useful.
const legacySections = {
  "#research": "research.html",
  "#publications": "publications.html",
  "#training": "experience.html",
  "#recognition": "experience.html#recognition",
  "#contact": "contact.html",
};

function resolveLegacyLink() {
  const isHome =
    location.pathname === "/" || location.pathname === "/index.html";
  const destination =
    Object.hasOwn(legacySections, location.hash) &&
    legacySections[location.hash];
  if (isHome && destination) location.replace(destination);
}

resolveLegacyLink();
window.addEventListener("hashchange", resolveLegacyLink);
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
