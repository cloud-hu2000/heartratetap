import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "Acerca de HeartRateTap y normas editoriales",
  description: "Conoce quién mantiene HeartRateTap, cómo funciona el estimador de LPM por toques, cómo se prepara el contenido de salud y cómo solicitar una corrección.",
  alternates: {
    canonical: "https://www.heartratetap.com/es/about"
  }
};
export default function AboutPage() {
  return <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{
          marginBottom: "0.5rem"
        }}>
            Acerca de • Transparencia
          </p>
          <h1>Acerca de HeartRateTap</h1>
          <p className="blog-intro">
            HeartRateTap es una herramienta independiente para estimar los golpes por minuto de los toques que haces mientras sientes tu propio pulso. Esta página explica lo que publicamos, lo que la herramienta puede y no puede hacer, y cómo mantenemos nuestras reclamaciones responsables.
          </p>
        </header>

        <section className="blog-section">
          <h2>Nuestro propósito</h2>
          <p>
            El proyecto existe para facilitar el recuento manual básico cuando un temporizador es inconveniente. En lugar de detectar su cuerpo, el sitio registra el tiempo entre los toques deliberados y convierte el intervalo promedio en LPM. Es útil para una referencia de bienestar rápido y para aprender cómo funciona el tiempo de pulso.
          </p>
          <p>
            HeartRateTap no es un hospital, práctica médica, servicio de diagnóstico, sensor de desgaste, electrocardiograma o dispositivo médico certificado. No puede identificar una arritmia, medir la presión arterial o la saturación de oxígeno, ni explicar por qué una lectura cambió.
          </p>
        </section>

        <section className="blog-section">
          <h2>Quien mantiene el sitio</h2>
          <p>
            El equipo de producto y editorial HeartRateTap mantiene el código, la interfaz y los artículos. No presentamos al equipo como médicos o repetimos la revisión médica donde no se ha producido ninguno.{" "}
            <a href="https://github.com/cloud-hu2000/heartratetap" rel="noopener noreferrer">
              repositorio GitHub
            </a>
            , por lo que el enfoque de tiempo y los cambios de producto pueden ser inspeccionados.
          </p>
          <p>
            Preguntas, problemas de accesibilidad y solicitudes de corrección pueden ser enviadas a través de nuestras{" "}
            <Link href="/es/contact">Página de contacto</Link> o a{" "}
            <a href="mailto:cloudhu2000@gmail.com">cloudhu2000@gmail.com</a>. Incluya la URL de la página y la frase o resultado que usted cree que necesita atención para que podamos reproducir el problema.
          </p>
        </section>

        <section className="blog-section" id="editorial-standards">
          <h2>Política editorial y correccionales</h2>
          <ul>
            <li>
              <strong>Original purpose:</strong> cada guía debe responder a una pregunta de usuario distinta o documentar cómo funciona el producto; no creamos páginas casi duplicadas simplemente para variaciones de palabras clave.
            </li>
            <li>
              <strong>Fuentes designadas:</strong> Los rangos de salud y las declaraciones de seguridad deben vincularse a organizaciones como la American Heart Association, CDC, NHS o autoridades comparables de salud pública.
            </li>
            <li>
              <strong>Límites claros:</strong> Se describen las estimaciones de productos como estimaciones. Evitamos la precisión no verificada, el volumen de prueba, el endogimiento de expertos y las reclamaciones de beneficios médicos.
            </li>
            <li>
              <strong>Fechas de revisión visibles:</strong> guías sustantivas muestran una fecha de publicación y una fecha de revisión de contenidos. Una revisión verifica enlaces, comportamiento de producto y si la fuente citada sigue apoyando la declaración.
            </li>
            <li>
              <strong>Corrección:</strong> se correccionan errores fácticos confirmados en la página y se actualiza su fecha de revisión. Los cambios materiales se registran en la historia de la fuente pública.
            </li>
          </ul>
          <p>
            La revisión editorial no es la misma que la revisión clínica. A menos que una página nombre explícitamente a un revisor médico calificado y sus credenciales, los lectores deben asumir que no ha sido revisado médicamente.
          </p>
        </section>

        <section className="blog-section">
          <h2>Cómo separamos el contenido y la monetización</h2>
          <p>
            Los artículos y la orientación del producto se escriben independientemente de los anunciantes. La publicidad no determina los rangos de referencia, recomendaciones o qué fuentes citamos. El código de publicidad no se coloca en el registro, registro, contraseña-reset, cuenta, alerta o pantallas de error. Cualquier futura colocación de anuncios debe permanecer visualmente diferente de la navegación y los controles de toque.
          </p>
          <p>
            HeartRateTap se ha aplicado a Google AdSense. Google puede utilizar cookies o identificadores similares en páginas donde sus anuncios están habilitados; nuestros <Link href="/es/privacy-policy">Política de privacidad</Link> explica esas tecnologías y opciones de usuario.
          </p>
        </section>

        <section className="blog-section blog-cta">
          <h2>Lea las guías prácticas</h2>
          <p>
            Comience con la metodología de cálculo si desea entender el estimador, luego utilice las guías de re-valor y ejercicio para contexto de fuentes de salud pública nombradas.
          </p>
          <Link href="/es/guides" className="pill active">
            Abrir la biblioteca guía
          </Link>
        </section>
      </article>
      <Footer />
    </div>;
}
