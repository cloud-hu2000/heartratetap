import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Reset your HeartRateTap password",
  description: "Reset the password for your HeartRateTap account.",
  robots: {
    index: false,
    follow: false
  }
};

export default function ResetPasswordLayout({ children }: { children: ReactNode }) {
  return children;
}
