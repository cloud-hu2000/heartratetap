import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { GUIDE_CLUSTER_META, GUIDE_CLUSTER_ORDER, GUIDE_CONTENT, TOOL_CONTENT } from "@/lib/guide-content.es";
export const metadata: Metadata = {
  title: "Guías de frecuencia cardíaca y metodología de medición | HeartRateTap",
  description: "Usa las calculadoras de objetivo y recuperación y consulta la metodología por toques, las referencias de frecuencia en reposo y las guías de zonas de entrenamiento.",
  alternates: {
    canonical: "https://www.heartratetap.com/es/guides"
  }
};
export default function GuidesPage() {
  return <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{
          marginBottom: "0.5rem"
        }}>
            Centro de conocimiento • Guías curadas
          </p>
          <h1>Guías de frecuencia cardíaca y metodología de productos</h1>
          <p className="blog-intro">
            Cada guía tiene un trabajo distinto: documentar la calculadora, mejorar una rutina de medición, agregar un contexto de actividad o preparar una conversación de salud. Se mantiene un material relacionado en una página para que los lectores puedan encontrar una respuesta completa sin comparar versiones repetidas.
          </p>
        </header>

        <section className="blog-section">
          <h2>Comience con una calculadora</h2>
          <p>
            Utilice una calculadora funcional para una tarea basada en fórmulas, y luego abra la guía de soporte que coincida con su método de medición, actividad o pregunta de seguimiento.
          </p>
          <div className="guide-card-grid">
            {TOOL_CONTENT.map(tool => <article key={tool.path} className="guide-card">
                <p className="guide-label">{tool.label}</p>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <Link href={tool.path}>Abra la calculadora</Link>
              </article>)}
          </div>
        </section>

        {GUIDE_CLUSTER_ORDER.map(cluster => {
        const clusterMeta = GUIDE_CLUSTER_META[cluster];
        const guides = GUIDE_CONTENT.filter(guide => guide.cluster === cluster);
        return <section className="blog-section" key={cluster}>
              <h2>{clusterMeta.title}</h2>
              <p>{clusterMeta.description}</p>
              <div className="guide-card-grid">
                {guides.map(guide => <article key={guide.path} className="guide-card">
                    <p className="guide-label">{guide.label}</p>
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                    <Link href={guide.path}>Lea el guía</Link>
                  </article>)}
              </div>
            </section>;
      })}

        <section className="blog-section">
          <h2>Qué hacen estos guías de manera diferente</h2>
          <p>
            El artículo de la metodología se refiere al comportamiento real de esta base de código: tiempos de toque generados por el usuario, intervalos de milisegundos, ventanas de rodadura cortas y la historia del navegador local. No implica que el navegador pueda sentir un latido. Los rangos de referencia de salud se mantienen separados del cálculo del producto y vinculados a sus fuentes autoritativas originales.
          </p>
          <p>
            Cada resultado todavía depende de su capacidad para encontrar un pulso y pulsar con cada golpe. Si un pulso se siente irregular, un valor es sorprendente, o los síntomas están presentes, un calculador de toque es la herramienta incorrecta para decidir lo que está sucediendo.
          </p>
        </section>

        <section className="blog-section">
          <h2>Cómo utilizar un resultado responsablemente</h2>
          <p>
            Comience por etiquetar la situación: un cheque de reposo tranquilo y una lectura tomada después de la actividad no son intercambiables. Repita un valor inesperado en las mismas condiciones y observe si se perdió o agregó un toque. El gráfico de historia reciente del navegador es una comodidad para la comparación, no un sistema de alerta y no un registro clínico.
          </p>
          <p>
            Un cálculo de LPM no puede identificar un problema de ritmo o explicar un cambio. Los síntomas y el contexto médico personal tienen prioridad sobre un rango general. Si una frecuencia cardíaca repentinamente inusual viene con dolor de pecho, falta de aliento, desmayo o mareos marcados, contacte con los servicios de emergencia locales en lugar de repetir la calculadora.
          </p>
        </section>

        <section className="blog-section">
          <h2>Comience con la técnica de medición</h2>
          <p>
            Antes de comparar los números, haga la entrada lo más consistente posible. La guía práctica explica cómo encontrar el pulso de la muñeca con dos dedos, por qué el pulgar es una opción deficiente, cómo etiquetar la situación, y por qué una estimación corta del toque debe repetirse cuando es inesperada. El objetivo es no convertir un navegador en un dispositivo médico; es dejar el paso manual lo suficientemente claro que un resultado puede ser interpretado con la cantidad correcta de precaución.
          </p>
          <p>
            Una comparación personal confiable comienza con una pregunta simple: ¿fue esto un cheque de descanso calma o una lectura después del movimiento? Los cheques de reposo funcionan mejor cuando se toman en condiciones similares. Después del ejercicio, un valor manual puede cambiar mientras usted está encontrando el pulso y el tapping, por lo que describe un breve período de recuperación en lugar de una medición de la zona de entrenamiento fija. Grabar la condición junto con el número en lugar de tratar cada resultado como intercambiable.
          </p>
          <p>
            Las guías separan deliberadamente tres trabajos: la documentación de la calculadora explica la aritmética; la guía técnica explica la entrada humana; y los artículos de reposo y ejercicio proporcionan contexto general de fuentes de salud nombradas. Leer la guía pertinente es más útil que buscar múltiples versiones de la misma respuesta, y ayuda a mantener las limitaciones de producto visibles junto a la información que la gente utiliza.
          </p>
        </section>

        <section className="blog-section">
          <h2>Qué hacer con una lectura inesperada</h2>
          <p>
            Primero, pausa y considera las condiciones. Actividad reciente, estrés, fiebre, cafeína, posición corporal y algunos medicamentos pueden afectar la frecuencia cardíaca. Si se siente bien y el valor es sorprendente, descanse en la misma posición y repita la medición manual en lugar de decidir de un solo conjunto de toques. Una diferencia de un solo paso puede ser una condición o un toque perdido; no es suficiente información para explicar una causa.
          </p>
          <p>
            No utilice este sitio para diagnosticar un problema de ritmo, establecer un plan de tratamiento o decidir si ignorar los síntomas. Si un pulso se siente irregular, los intentos repetidos difieren mucho, o usted tiene dolor de pecho, falta de aliento, desmayo, mareos severos u otro síntoma urgente, buscar ayuda profesional o de emergencia adecuada para su ubicación. La guía de seguridad es parte de cada guía porque una estimación simple de LPM no puede responder a esas preguntas.
          </p>
        </section>

        <section className="blog-section">
          <h2>Cómo se mantiene la biblioteca</h2>
          <p>
            Las guías muestran fechas de publicación y revisión, distinguen el examen editorial de la revisión médica y vinculan las reclamaciones de salud a fuentes nombradas. Las declaraciones de productos se verifican contra el código actual. Si una fuente cambia o una característica se comporta de manera diferente, la página pertinente debe ser corregida en lugar de duplicada en otra guía. <Link href="/es/about">Sobre la página</Link>.
          </p>
        </section>

        <section className="blog-section blog-cta">
          <h2>Medida después de entender el método</h2>
          <p>
            La página principal contiene la herramienta completa de toque, la historia local y las notas de medición en un solo lugar. No se necesita permiso de cuenta o cámara para el cheque básico.
          </p>
          <Link href="/es/" className="pill active">
            Abra HeartRateTap
          </Link>
        </section>
      </article>
      <Footer />
    </div>;
}
