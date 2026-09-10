import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "Términos de uso | HeartRateTap",
  description: "Términos para usar la herramienta de bienestar HeartRateTap, historia local, cuentas y comentarios.",
  alternates: {
    canonical: "https://www.heartratetap.com/es/terms"
  }
};
export default function TermsPage() {
  return <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{
          marginBottom: "0.5rem"
        }}>
            Legal • Última actualización 5 de agosto de 2026
          </p>
          <h1>Términos de uso</h1>
          <p className="blog-intro">
            Estos términos explican las condiciones para el uso de HeartRateTap. Si no está de acuerdo, no utilice el servicio.
          </p>
        </header>

        <section className="blog-section">
          <h2>Herramienta de bienestar, no atención médica</h2>
          <p>
            HeartRateTap estima que LPM de los toques que usted proporciona. No tiene sentido, diagnostica, monitorea o trata una afección médica y no es un sustituto de la atención profesional o equipo certificado. No use un resultado para cambiar la medicación, ignorar los síntomas, establecer un límite de ejercicio prescrito por el médico o retrasar la ayuda de emergencia.
          </p>
        </section>

        <section className="blog-section">
          <h2>Su responsabilidad</h2>
          <p>
            Usted es responsable de la sincronización y exactitud de sus toques, el dispositivo y el navegador que utiliza, y cómo interpreta un resultado. Usted no debe mal uso del servicio, interfieren con su operación, sondeo cuentas que no posee, envíe retroalimentación ilegal o automatizar el tráfico de una manera que degrada el sitio.
          </p>
        </section>

        <section className="blog-section">
          <h2>Cuentas y disponibilidad</h2>
          <p>
            La medición de la cinta está disponible sin cuenta. Las características de la cuenta opcional pueden cambiar a medida que se desarrolla el producto. A menos que la ley aplicable requiera otra cosa, el acceso puede suspenderse por fraude, abuso o una amenaza de seguridad.
          </p>
        </section>

        <section className="blog-section">
          <h2>Historia y comentarios locales</h2>
          <p>
            Las lecturas recientes se almacenan en el almacenamiento del navegador por defecto y pueden desaparecer cuando se limpia el almacenamiento, se termina una sesión privada o se utiliza un dispositivo diferente. No se debe confiar en la historia local como su único registro médico o personal. La retroalimentación puede ser revisada, resumida y utilizada para mejorar el producto; no envíe información confidencial sobre salud.
          </p>
        </section>

        <section className="blog-section">
          <h2>No hay garantía ni limitación de responsabilidad</h2>
          <p>
            El servicio se proporciona sobre una base “según disponibilidad”. No garantizamos que una lectura sea precisa, ininterrumpida o adecuada para un propósito particular. En la medida en que lo permita la ley, HeartRateTap no es responsable de la pérdida indirecta o consecuencial que se deriva del uso o la incapacidad de utilizar el servicio. Los derechos que legalmente no pueden ser excluidos siguen sin ser afectados.
          </p>
        </section>

        <section className="blog-section">
          <h2>Cambios y contacto</h2>
          <p>
            Podemos actualizar estos términos cuando el producto o los requisitos aplicables cambien. La fecha anterior identifica la versión actual. <Link href="/es/contact">Página de contacto</Link> o a{" "}
            <a href="mailto:cloudhu2000@gmail.com">cloudhu2000@gmail.com</a>. Ver el{" "}
            <Link href="/es/privacy-policy">Política de privacidad</Link> para información sobre el manejo de datos.
          </p>
        </section>
      </article>
      <Footer />
    </div>;
}
