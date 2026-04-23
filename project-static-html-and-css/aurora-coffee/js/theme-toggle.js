const THEME_STORAGE_KEY = "aurora-theme";
const rootElement = document.documentElement;

function getSavedTheme() {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
  } catch {
    return null;
  }

  return null;
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeButtonState(theme) {
  const isDarkMode = theme === "dark";

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-pressed", String(isDarkMode));
    button.textContent = isDarkMode ? "Modo claro" : "Modo escuro";
  });
}

function applyTheme(theme) {
  rootElement.setAttribute("data-theme", theme);
  updateThemeButtonState(theme);
}

function persistTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    return;
  }
}

function toggleTheme() {
  const currentTheme = rootElement.getAttribute("data-theme") || "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
  persistTheme(nextTheme);
}

const initialTheme = getSavedTheme() || getSystemTheme();
applyTheme(initialTheme);

document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
  button.addEventListener("click", toggleTheme);
});
