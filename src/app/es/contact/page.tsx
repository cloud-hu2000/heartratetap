import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "Contacto | HeartRateTap",
  description: "Contacte con el equipo HeartRateTap para soporte de productos, ayuda de accesibilidad, solicitudes de privacidad o correcciones de hecho.",
  alternates: {
    canonical: "https://www.heartratetap.com/es/contact"
  }
};
export default function ContactPage() {
  return <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{
          marginBottom: "0.5rem"
        }}>
            HeartRateTap • Contacto
          </p>
          <h1>Contacto HeartRateTap</h1>
          <p className="blog-intro">
            Utilice el correo electrónico a continuación para llegar al equipo que mantiene la herramienta HeartRateTap y su contenido editorial. Damos la bienvenida a las preguntas de producto, informes de accesibilidad, solicitudes de privacidad y correcciones fácticas.
          </p>
        </header>

        <section className="blog-section">
          <h2>Envíenos un correo electrónico</h2>
          <p>
            Para preguntas generales y de soporte, email{" "}
            <a href="mailto:cloudhu2000@gmail.com">cloudhu2000@gmail.com</a>. Por favor, incluya la URL de la página, su navegador o dispositivo cuando sea relevante, y una breve descripción de lo que pasó. Esto nos ayuda a reproducir e investigar un problema técnico.
          </p>
          <p>
            Este es el canal de contacto público para Heart Rhythm Studio, el equipo independiente detrás de HeartRateTap.
          </p>
        </section>

        <section className="blog-section">
          <h2>Cuestiones de corrección y de contenido</h2>
          <p>
            Si usted piensa que una guía es inexacta, díganos la URL del artículo y cito la declaración específica. Revisamos los informes contra la fuente citada y el comportamiento actual del producto. Se confirman correcciones fácticas en la página pertinente y su fecha de revisión se actualiza. <Link href="/es/about#editorial-standards">editorial standards</Link> explicar este proceso con más detalle.
          </p>
        </section>

        <section className="blog-section">
          <h2>Solicitudes de privacidad y de cuenta</h2>
          <p>
            Para una cuenta, retroalimentación o solicitud de privacidad, e-mail o dirección arriba del correo electrónico de la cuenta cuando sea posible y indica si está pidiendo acceso, corregir o eliminar información. No enviar contraseñas, datos de tarjeta de pago, historial médico completo u otra información confidencial por correo electrónico.{" "}
            <Link href="/es/privacy-policy">Política de privacidad</Link> antes de hacer una solicitud de datos.
          </p>
        </section>

        <section className="blog-section">
          <h2>Preocupaciones médicas y urgentes</h2>
          <p>
            HeartRateTap no puede proporcionar asesoramiento médico o soporte de emergencia. Si usted tiene dolor en el pecho, falta de aliento, desmayo, mareos severos u otro síntoma urgente, contacte con los servicios locales de emergencia o un profesional de salud cualificado en lugar de esperar una respuesta de correo electrónico o confiar en este sitio web.
          </p>
        </section>

        <section className="blog-section blog-cta">
          <h2>Aprenda cómo funciona la herramienta</h2>
          <p>
            La biblioteca guía explica cómo el tiempo de toma se convierte en una estimación de LPM, lo que no puede decirle, y cómo el sitio mantiene su contenido.
          </p>
          <Link href="/es/guides" className="pill active">
            Examine los guías
          </Link>
        </section>
      </article>
      <Footer />
    </div>;
}
