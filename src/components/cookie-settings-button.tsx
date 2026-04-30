"use client";

export function CookieSettingsButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("recacor:cookie"))}
      className="text-white/30 hover:text-white/60 transition-colors"
    >
      Cookies
    </button>
  );
}
