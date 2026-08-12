"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const CONTENT_LINKS = [
  { href: "/guides", label: "Guides" },
  { href: "/target-heart-rate-calculator", label: "Target calculator" },
  { href: "/heart-rate-recovery-calculator", label: "Recovery calculator" },
  { href: "/write-for-us", label: "Write for Us" },
  { href: "/about", label: "About" }
] as const;

export default function NavBar() {
  const pathname = usePathname();
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
      <Link href="/" className="nav-brand" aria-label="HeartRateTap home">
        <span className="logo" aria-hidden="true">♥</span>
        <span>Online Heart Rate Monitor</span>
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
        <span>{menuOpen ? "Close" : "Menu"}</span>
      </button>

      <nav
        id="primary-navigation"
        className={`nav-right${menuOpen ? " nav-right-open" : ""}`}
        aria-label="Primary navigation"
      >
        {CONTENT_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="nav-link"
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}

        {isAuthenticated && user ? (
          <div className="user-menu">
            <Link href="/profile" className="nav-link">
              {user.name || user.email.split("@")[0]}
            </Link>
            <button type="button" onClick={logout} className="nav-link nav-button">
              Sign out
            </button>
          </div>
        ) : (
          <Link href="/login" className="nav-link nav-account-link">
            Sign in
          </Link>
        )}
      </nav>
    </header>
  );
}
