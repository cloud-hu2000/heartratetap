"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { localizePath, type AppLocale } from "@/i18n/routing";

const CONTENT_LINKS = [
  { href: "/guides", label: "guides" },
  { href: "/target-heart-rate-calculator", label: "targetCalculator" },
  { href: "/heart-rate-recovery-calculator", label: "recoveryCalculator" },
  { href: "/write-for-us", label: "writeForUs" },
  { href: "/about", label: "about" }
] as const;

export default function NavBar() {
  const pathname = usePathname();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Nav");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="nav">
      <Link href={localizePath("/", locale)} className="nav-brand" aria-label={t("homeAria")}>
        <span className="logo" aria-hidden="true">♥</span>
        <span>{t("brand")}</span>
      </Link>

      <button
        type="button"
        className="nav-menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span className="nav-menu-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>{menuOpen ? t("close") : t("menu")}</span>
      </button>

      <nav
        id="primary-navigation"
        className={`nav-right${menuOpen ? " nav-right-open" : ""}`}
        aria-label={t("primaryAria")}
      >
        {CONTENT_LINKS.map((link) => (
          <Link
            key={link.href}
            href={localizePath(link.href, locale)}
            className="nav-link"
            aria-current={pathname === localizePath(link.href, locale) ? "page" : undefined}
          >
            {t(link.label)}
          </Link>
        ))}

        {isAuthenticated && user ? (
          <div className="user-menu">
            <Link href={localizePath("/profile", locale)} className="nav-link">
              {user.name || user.email.split("@")[0]}
            </Link>
            <button type="button" onClick={logout} className="nav-link nav-button">
              {t("signOut")}
            </button>
          </div>
        ) : (
          <Link href={localizePath("/login", locale)} className="nav-link nav-account-link">
            {t("signIn")}
          </Link>
        )}
        <Link
          href={localizePath(pathname, locale === "en" ? "es" : "en")}
          className="nav-link nav-language-link"
          hrefLang={locale === "en" ? "es" : "en"}
        >
          {t("language")}
        </Link>
      </nav>
    </header>
  );
}
