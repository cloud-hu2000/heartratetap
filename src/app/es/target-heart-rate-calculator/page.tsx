import type { Metadata } from "next";
import Link from "next/link";
import CalculatorStructuredData from "@/components/CalculatorStructuredData";
import FAQStructuredData from "@/components/FAQStructuredData";
import Footer from "@/components/Footer";
import SourceList, { type Source } from "@/components/es/SourceList";
import TargetHeartRateCalculator from "@/components/es/TargetHeartRateCalculator";
import { buildSocialMetadata } from "@/lib/seo-metadata";
const TITLE = "Calculadora de frecuencia cardíaca objetivo: método Karvonen y porcentaje del máximo";
const DESCRIPTION = "Calcula un intervalo de frecuencia cardíaca objetivo por edad o con la reserva cardíaca, compara las fórmulas y conserva el contexto de ejercicio adecuado.";
const PATH = "/es/target-heart-rate-calculator";
const URL = `https://www.heartratetap.com${PATH}`;
export const metadata: Metadata = {
  title: `${TITLE} | HeartRateTap`,
  description: DESCRIPTION,
  alternates: {
    canonical: URL
  },
  ...buildSocialMetadata({
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website"
  })
};
const SOURCES: Source[] = [{
  name: "Carrito de tarifas cardíacas de destino",
  publisher: "American Heart Association",
  url: "https://www.heart.org/en/healthy-living/exercise-and-physical-activity/fitness-basics/target-heart-rates",
  note: "La estimación de 220 menos de edad y las bandas de referencia en vigor de 50–70% moderadas y 70–85%."
}, {
  name: "Guías de Actividad Física para los Americanos, 2a edición",
  publisher: "Departamento de Salud y Servicios Humanos de EE.UU.",
  url: "https://health.gov/paguidelines/second-edition/pdf/Physical_Activity_Guidelines_2nd_edition.pdf",
  note: "Contexto relativo-intensidad, progresión gradual y prueba de charla para actividad moderada y vigorosa."
}, {
  name: "Consejos para monitorear la intensidad del ejercicio aeróbico",
  publisher: "American College of Sports Medicine",
  url: "https://www.acsm.org/docs/default-source/files-for-resource-library/exercise-intensity-infographic.pdf",
  note: "Los enfoques basados en el porcentaje de máximo y la frecuencia cardíaca utilizados junto con el ejercicio percibido."
}, {
  name: "Validez de los modelos de predicción de la frecuencia cardíaca máxima entre corredores y ciclistas",
  publisher: "Journal of Clinical Medicine via PubMed",
  url: "https://pubmed.ncbi.nlm.nih.gov/37109218/",
  note: "Una cohorte de atleta grande que ilustra el error individual en la frecuencia cardíaca máxima predefinida por fórmula."
}];
const FAQS = [{
  question: "¿Es 220 menos mi frecuencia cardíaca máxima real?",
  answer: "No. Es una estimación de población utilizada para crear una referencia inicial. El máximo medido de un individuo puede ser más alto o más bajo."
}, {
  question: "¿Cuál es la fórmula de reserva de frecuencia cardíaca?",
  answer: "La reserva de frecuencia cardíaca se calcula como máximo menos la frecuencia cardíaca restante. Un objetivo es el ritmo cardíaco de reposo más el porcentaje elegido de esa reserva."
}, {
  question: "¿Puede esta calculadora prescribir un límite de ejercicio seguro?",
  answer: "No. No puede dar cuenta de diagnóstico, medicación, síntomas, una prueba de ejercicio medida o un plan individual de un profesional cualificado."
}];
export default function TargetHeartRateCalculatorPage() {
  return <div className="frame tool-landing-page">
      <main className="tool-landing-page">
        <section className="panel tool-hero">
          <div className="tool-hero-copy">
            <p className="tool-eyebrow">Calculadora de planificación de ejercicios libres</p>
            <h1>Calculadora de frecuencia cardíaca objetivo</h1>
            <p className="tool-intro">
              Estimar un rango de frecuencia cardíaca objetivo con porcentaje de frecuencia cardíaca máxima o la fórmula de reserva de frecuencia cardíaca (Karvonen). Cambia los puntos finales de intensidad, vea la aritmética inmediatamente y mantenga el método seleccionado al lado del resultado.
            </p>
            <div className="tool-keyword-row" aria-label="Capacidades de cálculo">
              <span>Frecuencia cardíaca objetivo</span>
              <span>Máximo estimado por edad</span>
              <span>Reserva de frecuencia cardíaca</span>
              <span>Gama de intensidad personalizada</span>
            </div>
            <p className="blog-note">
              Comience con la referencia predefinida de 50 a 85% como orientación general. No use una fórmula para anular los síntomas, la orientación medicatoria, los resultados de la prueba de ejercicio o un rango prescrito por el médico.
            </p>
          </div>
          <div className="tool-hero-monitor">
            <TargetHeartRateCalculator />
          </div>
        </section>

        <section className="tool-support-grid">
          <article className="panel tool-info-panel">
            <h2>Cómo utilizar la calculadora</h2>
            <ol>
              <li>Ingrese su edad para crear un máximo estimado de 220 menos de edad.</li>
              <li>Elija por ciento de máximo o introduzca un valor de reposo tranquilo para reserva de frecuencia cardíaca.</li>
              <li>Establecer los porcentajes inferiores y superiores y guardar la fórmula con el resultado de LPM.</li>
            </ol>
          </article>
          <article className="panel tool-info-panel">
            <h2>Dos fórmulas, dos resultados</h2>
            <p>
              El porcentaje de máximo comienza a cero. La reserva de frecuencia cardíaca comienza con el intervalo útil entre el reposo y el máximo estimado, y luego añade la tasa de reposo. El mismo porcentaje produce por tanto diferentes LPM.
            </p>
          </article>
          <article className="panel tool-info-panel">
            <h2>Mantener el esfuerzo en la decisión</h2>
            <p>
              Durante la actividad moderada, el examen de conversación federal dice que la conversación es generalmente posible pero el canto no lo es. Durante la actividad vigorosa, sólo unas palabras pueden estar cómodas antes de respirar.
            </p>
          </article>
        </section>

        <article className="panel blog-article">
          <section className="blog-section">
            <h2>Lo que significa un cálculo de frecuencia cardíaca objetivo</h2>
            <p>
              Una frecuencia cardíaca objetivo es una referencia de ejercicio calculada, no un límite de velocidad medido desde su cuerpo. El método más accesible comienza con un máximo predecido por la edad. <strong>220 - edad</strong>, con actividad moderada alrededor del 50-70% y actividad vigorosa alrededor del 70-85% de esa estimación. Esas cifras son promedios de población. Ayudan a traducir la intensidad del ejercicio amplia en LPM, pero no revelan el umbral máximo probado de un individuo, umbral aeróbico, respuesta a medicamentos o límite clínico seguro.
            </p>
            <p>
              Mantenga el método apegado a cada número. Una zona de reloj basada en el máximo medido, un umbral de laboratorio, un gráfico de porcentaje de máximo y un cálculo de reserva de frecuencia cardíaca pueden mostrar diferentes límites. Eso no hace que el aritmético roto. Significa que las entradas y definiciones difieren. Comparando dos rangos sin sus fórmulas puede llevar a una falsa precisión.
            </p>
          </section>

          <section className="blog-section">
            <h2>Porcentaje de la frecuencia cardíaca máxima estimada</h2>
            <p>
              Para un niño de 40 años, 220 menos 40 da un máximo estimado de 180 LPM. El 50% es 90 LPM, el 70% es 126 LPM y el 85% es 153 LPM. La referencia general combinada es por lo tanto 90–153 LPM. El cálculo es fácil de reproducir porque sólo necesita edad, pero la edad no puede describir el estado físico, el modo de ejercicio o el máximo individual.
            </p>
            <div className="blog-table-wrapper">
              <table>
                <thead><tr><th>Paso</th><th>Ejemplo de 40 años</th><th>Resultado</th></tr></thead>
                <tbody>
                  <tr><td>Monto estimado</td><td>220 − 40</td><td>180 LPM</td></tr>
                  <tr><td>50% de punto</td><td>180 × 0.50</td><td>90 LPM</td></tr>
                  <tr><td>70% punto</td><td>180 × 0.70</td><td>126 LPM</td></tr>
                  <tr><td>85% punto</td><td>180 × 0.85</td><td>153 LPM</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              No realice un esfuerzo máximo no supervisado simplemente para reemplazar la estimación. Si la prueba máxima es apropiada depende de la salud, los síntomas, la historia de la formación y el protocolo de prueba. Si un máximo medido está disponible desde una prueba supervisada apropiada, utilice la interpretación proporcionada con esa prueba en lugar de sustituirla en un plan genérico en línea.
            </p>
          </section>

          <section className="blog-section">
            <h2>Reserva de frecuencia cardíaca y cálculo Karvonen</h2>
            <p>
              La reserva de frecuencia cardíaca incluye una medición de reposo. Primera frecuencia de reposo restante del máximo estimado. Luego multiplica esa reserva por la intensidad elegida y agrega la tasa de reposo de vuelta: <strong>objetivo = descanso HR + intensidad × (RHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH-RHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH-HHHHHHHH-HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH-HHHHHHHHHHHHHHHHHHHHHHHHH</strong>Si el mismo niño de 40 años tiene una tasa de descanso de 60 LPM, la reserva es de 120 LPM. El punto 50% es de 120 LPM, el 70% es 144 LPM y el 85% es de 162 LPM.
            </p>
            <p>
              El resultado de reserva es más alto que el simple resultado por ciento de máximo porque el cálculo comienza por encima de la base de reposo. Use un valor de reposo calma y repetible. Una lectura después del café, precipitarse al gimnasio o calentamiento no es una entrada de reposo. No mezclar un límite inferior basado en reserva con un límite superior por ciento de máximo; ambos extremos de una gama necesitan el mismo método.
            </p>
          </section>

          <section className="blog-section">
            <h2>Por qué su intensidad de ejercicio adecuada puede variar</h2>
            <p>
              Calor, altitud, deshidratación, fatiga, estrés y cafeína pueden cambiar la frecuencia cardíaca a una carga de trabajo familiar. Correr, ciclismo y natación también puede producir diferentes respuestas. Los intervalos cortos pueden terminar antes de que la frecuencia cardíaca se ponga al día, mientras que un esfuerzo prolongado puede mostrar la deriva cardíaca incluso cuando el ritmo o la potencia se mantiene igual. Utilice el cálculo al lado del propósito de la sesión, el esfuerzo percibido, la respiración, el ritmo o la potencia, no como un comando para acelerar cada vez que LPM está por debajo de un límite.
            </p>
            <p>
              Los bloqueadores de beta y otros medicamentos pueden cambiar el máximo y ejercer la frecuencia cardíaca. Condiciones cardíacas, planes de rehabilitación y restricciones definidas por el clínico pueden hacer que las fórmulas de población no sean adecuadas. Si cualquiera de ellos se aplican, pregunte qué método y equipo de monitoreo debe utilizar.
            </p>
          </section>

          <section className="blog-section">
            <h2>Los controles manuales se retrasan después del ejercicio</h2>
            <p>
              HeartRateTap estima los LPM a partir de los intervalos entre los toques que haces mientras sientes el pulso. No es un sensor continuo. Después del ejercicio transcurre tiempo mientras te detienes de forma segura, localizas el pulso y empiezas a tocar. El número describe esa ventana posterior, no el pico ni el promedio del entrenamiento. Usa equipos de monitorización continua cuando necesites datos de toda la sesión.
            </p>
            <p>
              Si desea comparar un retén repetible después de la ejecución, mantenga la misma actividad, detenga a medida, postura y método. <Link href="/es/heart-rate-recovery-calculator">calculadora de recuperación de frecuencia cardíaca</Link> puede substraer dos lecturas de un protocolo documentado, pero no puede recrear un valor que no se midió.
            </p>
          </section>

          <section className="blog-section">
            <h2>Guías de zona de frecuencia cardíaca relacionadas</h2>
            <div className="tool-link-grid">
              <Link href="/es/blog/heart-rate-zones-for-running">Zonas de ritmo cardíaco</Link>
              <Link href="/es/blog/cycling-heart-rate-zones">Zonas de frecuencia cardíaca</Link>
              <Link href="/es/blog/swimming-heart-rate-zones">Zonas de ritmo cardíaco</Link>
              <Link href="/es/blog/heart-rate-zones-strength-training">Formación de frecuencia cardíaca y fuerza</Link>
            </div>
          </section>

          <SourceList sources={SOURCES} />

          <section className="blog-section">
            <h2>Preguntas de cálculo de frecuencia cardíaca</h2>
            <div className="tool-faq-grid">
              {FAQS.map(item => <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>)}
            </div>
          </section>
        </article>
      </main>

      <Footer />
      <FAQStructuredData url={URL} items={FAQS} />
      <CalculatorStructuredData name={TITLE} description={DESCRIPTION} path={PATH} featureList={["Porcentaje de la frecuencia cardíaca máxima estimada", "Cálculo de reserva de frecuencia cardíaca", "Porcentajes de intensidad inferior y superior a nivel personal", "Fórmula visible y máxima estimada"]} />
    </div>;
}
