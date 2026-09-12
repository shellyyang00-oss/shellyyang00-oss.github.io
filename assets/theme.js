// Apply the saved choice before styles load; Auto follows device appearance.
(() => {
  const choices = ["auto", "light", "dark"];
  const storageKey = "shelly-theme";
  const root = document.documentElement;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  let preference = "auto";

  try {
    const saved = window.localStorage.getItem(storageKey);
    if (choices.includes(saved)) preference = saved;
  } catch {
    // The control still works when storage is unavailable.
  }

  function applyTheme() {
    root.dataset.theme = preference;
    const dark =
      preference === "dark" || (preference === "auto" && systemTheme.matches);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? "#102019" : "#f8f7f3";

    const button = document.querySelector("[data-theme-toggle]");
    if (!button) return;
    const next = choices[(choices.indexOf(preference) + 1) % choices.length];
    const label = preference[0].toUpperCase() + preference.slice(1);
    const description =
      preference === "auto" ? "automatic (follows your device)" : preference;
    button.querySelector("[data-theme-label]").textContent = label;
    button.setAttribute(
      "aria-label",
      `Color theme: ${description}. Switch to ${next}.`,
    );
    button.title = `Color theme: ${description}. Switch to ${next}.`;
  }

  applyTheme();

  function connectControl() {
    const button = document.querySelector("[data-theme-toggle]");
    if (!button) return;
    button.hidden = false;
    button.addEventListener("click", () => {
      preference = choices[(choices.indexOf(preference) + 1) % choices.length];
      try {
        window.localStorage.setItem(storageKey, preference);
      } catch {
        // Retain the current choice for this page even without persistence.
      }
      applyTheme();
    });
    applyTheme();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", connectControl, {
      once: true,
    });
  } else {
    connectControl();
  }
  systemTheme.addEventListener("change", applyTheme);
  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey && event.key !== null) return;
    preference = choices.includes(event.newValue) ? event.newValue : "auto";
    applyTheme();
  });
})();
