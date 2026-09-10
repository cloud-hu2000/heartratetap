import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Perfil de cuenta de HeartRateTap",
  description: "Gestiona el perfil de tu cuenta de HeartRateTap.",
  robots: {
    index: false,
    follow: false
  }
};

export default function SpanishProfileLayout({ children }: { children: ReactNode }) {
  return children;
}
