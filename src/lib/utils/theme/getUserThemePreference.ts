export function getUserThemePreference() {
  const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  document.body.dataset.bsTheme = userPrefersDark ? 'dark' : 'light'
}