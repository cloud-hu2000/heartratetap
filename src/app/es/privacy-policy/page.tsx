import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "Política de privacidad | HeartRateTap",
  description: "Aprenda cómo HeartRateTap maneja mediciones locales, cuentas, retroalimentación, analítica opcional y tecnologías de publicidad de Google.",
  alternates: {
    canonical: "https://www.heartratetap.com/es/privacy-policy"
  },
  openGraph: {
    title: "Política de privacidad | HeartRateTap",
    description: "Cómo HeartRateTap maneja datos del navegador, proveedores de servicios, análisis y opciones de publicidad.",
    url: "https://www.heartratetap.com/es/privacy-policy",
    siteName: "HeartRateTap"
  }
};
export default function PrivacyPolicyPage() {
  return <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{
          marginBottom: "0.5rem"
        }}>
            Legal • Última actualización 5 de agosto de 2026
          </p>
          <h1>Política de privacidad</h1>
          <p className="blog-intro">
            Esta política explica lo que HeartRateTap almacena en su navegador, lo que llega a nuestros proveedores de servicios, cómo funcionan las tecnologías de análisis y publicidad opcionales, y las opciones disponibles para usted.
          </p>
        </header>

        <section className="blog-section">
          <h2>Información procesada por la calculadora básica</h2>
          <ul>
            <li>
              <strong>Tap timestamps:</strong> Mientras que una medición es activa, la página utiliza valores de tiempo del navegador para calcular los intervalos entre sus toques.
            </li>
            <li>
              <strong>Lecturas recientes:</strong> Los valores LPM bloqueados, los tiempos y el contexto de reposo/actividad seleccionado se almacenan en el almacenamiento local de su navegador por defecto. No se envían a nuestro servidor por la calculadora básica.
            </li>
            <li>
              <strong>Preferencias:</strong> idioma, estado tutorial y opciones de consentimiento se almacenan localmente para que el sitio pueda recordarlos.
            </li>
          </ul>
          <p>
            Puede eliminar los datos locales a través de los controles de historia donde esté disponible o desbloqueando los datos del sitio en su navegador. Navegadores o dispositivos privados de navegación y conmutación crean almacenamiento separado.
          </p>
        </section>

        <section className="blog-section">
          <h2>Cuentas y autenticación</h2>
          <p>
            Si usted crea una cuenta, procesamos la dirección de correo electrónico y la información de perfil que usted proporciona, los registros de autenticación y los datos de seguridad/sesión. Las contraseñas se almacenan como hashes de una sola dirección en lugar de texto claro. Si utiliza Google entra en sesión, Google proporciona los datos de identidad necesarios para crear o localizar su cuenta bajo los permisos mostrados durante el registro.
          </p>
        </section>

        <section className="blog-section">
          <h2>Retroalimentación</h2>
          <p>
            Una presentación de comentarios puede incluir un título, descripción y correo electrónico opcional. La retroalimentación se envía en privado al equipo y no se publica públicamente. No envíe detalles médicos, confidenciales o de identificación que no sean necesarios para entender la solicitud de producto. Contacte con nosotros para solicitar la eliminación e incluya suficiente información para localizar la entrada.
          </p>
        </section>

        <section className="blog-section">
          <h2>Análisis, fiabilidad y consentimiento</h2>
          <p>
            Google Analytics, Ahrefs Analytics y Vercel Speed Insights son opcionales. Sus scripts de navegador cargan sólo después de elegir “Aceptar todo” en el aviso de consentimiento. Pueden procesar información de dispositivo/browser, ubicación aproximada derivada de una dirección IP, visitas de páginas, árbitros y eventos de interacción o rendimiento según sus propias políticas. Rechazar cookies no esenciales impide que estos scripts opcionales se carguen a través de nuestra aplicación.
          </p>
          <p>
            Los proveedores de alojamiento, seguridad y supervisión de errores pueden procesar datos de solicitud, direcciones IP, detalles de dispositivos, URLs, horarios e información de diagnóstico cuando sea necesario para entregar el servicio, prevenir abusos y corregir fallos. No coloque información personal confidencial en URLs o campos de retroalimentación.
          </p>
        </section>

        <section className="blog-section">
          <h2>Google AdSense y cookies publicitarias</h2>
          <p>
            HeartRateTap se ha aplicado a Google AdSense. Cuando Google publicidad está habilitada en una página de contenido elegible, los proveedores de terceros, incluyendo Google y sus socios publicitarios, pueden utilizar cookies, balizas web, direcciones IP u otros identificadores para servir anuncios basados en visitas previas de un visitante a este y otros sitios web, limitar la repetición, medir el rendimiento, evitar el fraude y —donde se permite con opciones de consentimiento— personalizar anuncios.
          </p>
          <p>
            Google explica cómo AdSense utiliza cookies en su{" "}
            <a href="https://support.google.com/adsense/answer/7549925" rel="noopener noreferrer">
              Documentación de cookies AdSense
            </a>
            . Usted puede controlar la publicidad personalizada de Google a través de{" "}
            <a href="https://adssettings.google.com/" rel="noopener noreferrer">
              Ajustes de Google Ads
            </a>
            . Cuando sea necesario, los controles de consentimiento certificado de Google se utilizarán antes de que se active la publicidad.
          </p>
          <p>
            Los anuncios de Google no se colocan en el registro, registro, reseteo de contraseña, perfil, error, alerta u otras pantallas no contenciosas. La publicidad debe permanecer visiblemente separada de la navegación y los controles de calculadora.
          </p>
        </section>

        <section className="blog-section">
          <h2>Proveedores de servicios y divulgación</h2>
          <p>
            Utilizamos proveedores para hospedaje, bases de datos, autenticación, correo electrónico, seguridad, análisis y —después de aprobación—publicación. Procesan datos para el servicio que proporcionan bajo sus propios términos y nuestra configuración. También podemos revelar información cuando lo solicite la ley, para proteger a los usuarios y el servicio, o en relación con una transferencia de negocios sujeto a las salvaguardias apropiadas.
          </p>
        </section>

        <section className="blog-section">
          <h2>Retención y sus opciones</h2>
          <ul>
            <li>La historia local permanece hasta que la eliminas o el almacenamiento del navegador se limpia.</li>
            <li>Los registros de cuentas, pagos y seguridad se mantienen según sea necesario para prestar el servicio, cumplir con los deberes legales y prevenir el fraude.</li>
            <li>La retroalimentación se mantiene mientras que sigue siendo útil para la mejora del producto o hasta que se complete una solicitud de eliminación adecuada.</li>
            <li>Puede rechazar análisis opcionales, consentimiento local claro, usar controles de cookies del navegador y gestionar la personalización de Google ad.</li>
            <li>Usted puede pedir acceso, corregir o eliminar los datos de cuenta o retroalimentación aplicables, sujetos a requisitos legales y de seguridad.</li>
          </ul>
        </section>

        <section className="blog-section">
          <h2>Niños y uso internacional</h2>
          <p>
            HeartRateTap es un servicio de audiencia general y no está dirigido a niños menores de 13 años. No cree una cuenta ni envíe información personal si no puede consentir legalmente en su ubicación. El servicio y sus proveedores pueden procesar datos en países diferentes del que vive.
          </p>
        </section>

        <section className="blog-section">
          <h2>Cambios de contacto y políticas</h2>
          <p>
            Para una solicitud de privacidad o pregunta, utilice nuestra <Link href="/es/contact">Página de contacto</Link> o correo electrónico{" "}
            <a href="mailto:cloudhu2000@gmail.com">cloudhu2000@gmail.com</a>. Podemos revisar esta política como características, proveedores o requisitos legales cambian; la fecha en la parte superior identifica la versión actual.{" "}
            <Link href="/es/about">Sobre la página</Link> explica el proceso editorial y correccional.
          </p>
        </section>

        <section className="blog-section blog-cta">
          <h2>Regrese a la calculadora</h2>
          <p>El cálculo básico del toque funciona sin una cuenta y mantiene lecturas recientes en este navegador por defecto.</p>
          <Link href="/es/" className="pill active">
            Vaya a HeartRateTap
          </Link>
        </section>
      </article>
      <Footer />
    </div>;
}
