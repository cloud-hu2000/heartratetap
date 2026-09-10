import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
const TITLE = "Escribe para nosotros: artículos invitados | HeartRateTap";
const DESCRIPTION = "HeartRateTap acepta propuestas de artículos invitados sobre frecuencia cardíaca, ejercicio, bienestar y medición práctica del pulso. Consulta las directrices y contáctanos.";
const URL = "https://www.heartratetap.com/es/write-for-us";
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: {
    index: false,
    follow: true
  },
  alternates: {
    canonical: URL
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "HeartRateTap",
    images: [{
      url: "https://www.heartratetap.com/og-heart-rate-tap.png",
      width: 1200,
      height: 630,
      alt: "Escribe para HeartRateTap guías de postes de invitados"
    }]
  }
};
export default function WriteForUsPage() {
  return <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{
          marginBottom: "0.5rem"
        }}>
            Aceptamos entradas de invitados • Contribuir a HeartRateTap
          </p>
          <h1>Escríbanos: Directrices de correo de invitados</h1>
          <p className="blog-intro">
            <strong>HeartRateTap acepta lanzamientos post invitado.</strong> Damos la bienvenida a artículos originales y prácticos que ayudan a los lectores a entender los controles manuales de pulso, el seguimiento de la frecuencia cardíaca, el ejercicio, la recuperación y el bienestar diario. Lea las pautas a continuación, y luego envíe un correo electrónico a nuestro equipo editorial.
          </p>
          <a className="pill active" href="mailto:cloudhu2000@gmail.com?subject=Guest%20post%20pitch%20for%20HeartRateTap">
            Pitch un post de invitado
          </a>
        </header>

        <section className="blog-section">
          <h2>Temas que consideramos</h2>
          <p>Los fuertes lanzamientos encajan con el público de HeartRateTap y cubren una pregunta enfocada con consejos útiles y precisos.</p>
          <ul>
            <li>Cómo encontrar y contar un pulso manualmente</li>
            <li>Seguimiento de la carrera, ciclismo, natación, entrenamiento de fuerza, yoga o recuperación</li>
            <li>Prácticas de bienestar y uso responsable de los datos de fitness</li>
            <li>Accesibilidad, diseño de productos o tecnología relacionada con el seguimiento de pulsos y fitness</li>
            <li>Explicaciones basadas en pruebas que facilitan la comprensión de los conceptos de la frecuencia cardíaca</li>
          </ul>
          <p>
            No publicamos reclamaciones de diagnóstico o tratamiento, asesoramiento de ejercicio inseguro, promesas de salud no compatibles, o contenido diseñado principalmente para colocar enlaces no relacionados. HeartRateTap es una herramienta de bienestar, no un dispositivo médico.
          </p>
        </section>

        <section className="blog-section">
          <h2>Necesidades de puestos de invitados</h2>
          <ul>
            <li>
              <strong>Trabajo original:</strong> presentar contenido que escribió y tener el derecho de publicar. No debe ser copiado, afilado o ya publicado en otro lugar.
            </li>
            <li>
              <strong>Útil y específico:</strong> explicar el problema del lector claramente y proporcionar pasos prácticos, ejemplos o evidencia en lugar de relleno genérico.
            </li>
            <li>
              <strong>Fuentes fiables:</strong> Las declaraciones de salud fáctica deben contar con el apoyo de fuentes autorizadas, como organismos de salud pública, asociaciones médicas o investigación revisada por pares.
            </li>
            <li>
              <strong>Enlaces transparentes:</strong> divulgar cualquier relación que tenga con una empresa, producto o sitio mencionado en el artículo. Podemos editar o eliminar enlaces promocionales.
            </li>
            <li>
              <strong>Formato legible:</strong> utilizar un título descriptivo, introducción corta, encabezados claros, párrafos concisos, e inglés natural.
            </li>
          </ul>
        </section>

        <section className="blog-section">
          <h2>Cómo enviar un lanzamiento</h2>
          <p>
            Correo electrónico <a href="mailto:cloudhu2000@gmail.com">cloudhu2000@gmail.com</a> con la línea de asunto
            <strong> “Ponga de postes para huéspedes de HeartRateTap”.</strong> Incluido:
          </p>
          <ol>
            <li>Su titular propuesto y un resumen de dos o tres opiniones</li>
            <li>Un breve esbozo que muestra las secciones principales</li>
            <li>Su nombre, experiencia relevante y enlaces a una o dos muestras de escritura</li>
            <li>Cualquier enlace bio del autor solicitado u otros enlaces que usted espera incluir</li>
            <li>Ya sea que el lanzamiento represente una empresa, cliente, producto o campaña pagada</li>
          </ol>
          <p>
            Por favor envíe un lanzamiento antes de escribir un borrador completo. Una presentación no garantiza publicación. Revisamos ideas para relevancia, originalidad, exactitud y utilidad, y podemos editar trabajos aceptados para claridad, estilo, seguridad, enlaces y presentación de búsqueda.
          </p>
        </section>

        <section className="blog-section">
          <h2>Consultas de publicidad y patrocinio</h2>
          <p>
            Si usted propone la colocación pagada, el patrocinio u otra colaboración comercial, identifique claramente en su primer correo electrónico. Los arreglos patrocinados se consideran separados de los artículos de invitados editoriales y deben ser divulgados a los lectores. El pago nunca garantiza una reclamación sin soporte, aprobación oculta, o enlace de seguimiento.
          </p>
          <p>
            Para soporte de productos, correcciones, solicitudes de privacidad u otras preguntas, utilice el{" "}
            <Link href="/es/contact">Página de contacto</Link> en lugar de eso.
          </p>
        </section>

        <section className="blog-section blog-cta">
          <h2>¿Listo para contribuir?</h2>
          <p>Envíe un lanzamiento conciso y relevante y díganos por qué ayudará a los lectores de HeartRateTap.</p>
          <a className="pill active" href="mailto:cloudhu2000@gmail.com?subject=Guest%20post%20pitch%20for%20HeartRateTap">
            Email cloudhu2000@gmail.com
          </a>
        </section>
      </article>
      <Footer />
    </div>;
}
