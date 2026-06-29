import "./ThemeToggle.css";

export default function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        // Sun
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" fill="currentColor" />
          <g
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          >
            <line x1="12" y1="1.5" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22.5" />
            <line x1="1.5" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22.5" y2="12" />
            <line x1="4.2" y1="4.2" x2="6" y2="6" />
            <line x1="18" y1="18" x2="19.8" y2="19.8" />
            <line x1="19.8" y1="4.2" x2="18" y2="6" />
            <line x1="6" y1="18" x2="4.2" y2="19.8" />
          </g>
        </svg>
      ) : (
        // Moon
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}
