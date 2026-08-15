import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HeartRateTap en español",
  description:
    "Herramientas y guías en español para estimar manualmente los latidos por minuto y entender sus límites."
};

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return children;
}
