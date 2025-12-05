"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("header");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const theme = localStorage.getItem("theme");
      const isDarkMode = theme === "dark";
      setIsDark(isDarkMode);

      if (isDarkMode) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    };

    updateTheme();
    window.addEventListener("theme-changed", updateTheme);
    return () => window.removeEventListener("theme-changed", updateTheme);
  }, []);

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new Event("theme-changed"));
  };

  return (
    <header
      style={{
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(1rem, 4vw, 2rem)",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "clamp(1.1rem, 4.5vw, 1.6rem)",
                fontWeight: "700",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              {t("title")}
            </h1>
            <p
              style={{
                fontSize: "clamp(0.7rem, 2.5vw, 0.8rem)",
                marginTop: "0.25rem",
                marginBottom: 0,
              }}
            >
              {t("description")}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button
              onClick={toggleTheme}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0.5rem",
                fontWeight: "500",
                transition: "all 0.3s ease",
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                border: `2px solid ${isDark ? "#2d3748" : "#e2e8f0"}`,
                backgroundColor: isDark ? "#0f1419" : "#ffffff",
                color: isDark ? "#cbd5e1" : "#475569",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.color = "#667eea";
                e.currentTarget.style.backgroundColor = isDark
                  ? "#1a202c"
                  : "#f8f9fa";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = isDark
                  ? "#2d3748"
                  : "#e2e8f0";
                e.currentTarget.style.color = isDark ? "#cbd5e1" : "#475569";
                e.currentTarget.style.backgroundColor = isDark
                  ? "#0f1419"
                  : "#ffffff";
              }}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
            <LanguageSwitcher isDark={isDark} />
          </div>
        </div>
      </div>
    </header>
  );
}
