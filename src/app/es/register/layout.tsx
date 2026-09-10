import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Crear una cuenta de HeartRateTap",
  description: "Crea una cuenta de HeartRateTap.",
  robots: {
    index: false,
    follow: false
  }
};

export default function SpanishRegisterLayout({ children }: { children: ReactNode }) {
  return children;
}
