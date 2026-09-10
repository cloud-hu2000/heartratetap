import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Restablecer la contraseña de HeartRateTap",
  description: "Restablece la contraseña de tu cuenta de HeartRateTap.",
  robots: {
    index: false,
    follow: false
  }
};

export default function SpanishResetPasswordLayout({ children }: { children: ReactNode }) {
  return children;
}
