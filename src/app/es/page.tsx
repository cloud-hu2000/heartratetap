import type { Metadata } from "next";
import HomePage from "@/app/page";

const TITLE = "Calculadora manual de LPM por toques | HeartRateTap";
const DESCRIPTION =
  "Estima tus latidos por minuto tocando al ritmo del pulso que localizas manualmente. Consulta la fórmula, las limitaciones, el historial local y referencias de reposo y ejercicio.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.heartratetap.com/es",
    languages: {
      en: "https://www.heartratetap.com",
      es: "https://www.heartratetap.com/es",
      "x-default": "https://www.heartratetap.com"
    }
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.heartratetap.com/es",
    siteName: "HeartRateTap",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    images: ["https://www.heartratetap.com/og-heart-rate-tap.png"]
  }
};

export default HomePage;
