"use client";

import { NextIntlClientProvider } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import enMessages from "../../messages/en.json";
import esMessages from "../../messages/es.json";
import { AuthProvider } from "@/contexts/AuthContext";
import AnalyticsWithConsent from "@/components/AnalyticsWithConsent";
import CookieConsent from "@/components/CookieConsent";
import NavBar from "@/components/NavBar";

type LocalizedAppShellProps = {
  children: ReactNode;
};

// Locale used to be read from a middleware-injected request header in the root
// layout. That made every public page a server-rendered request. The URL is
// already the source of truth, so select the client-only UI locale from it.
export default function LocalizedAppShell({ children }: LocalizedAppShellProps) {
  const pathname = usePathname();
  const locale = pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
  const messages = locale === "es" ? esMessages : enMessages;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      <AuthProvider>
        <NavBar />
        {children}
        <AnalyticsWithConsent />
        <CookieConsent />
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
