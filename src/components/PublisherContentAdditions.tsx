type PublisherContentAdditionsProps = {
  lang: "en" | "es";
};

const CONTENT = {
  en: {
    reviewed: "Product explanation last checked: August 7, 2026",
    intro:
      "HeartRateTap is a transparent user-input BPM estimator with a documented formula, browser data flow, and explicit evidence limits. The four answers below describe this specific tool—not generic browser heart-rate apps. They explain what the browser records, why the interface asks for 10 taps, which measurements remain impossible, and why no accuracy percentage is published. Product behavior was checked against the code on August 7, 2026; health context was checked against the named American Heart Association and CDC sources. Neither that code review nor a repeatability routine is a medical-device validation study. Each answer is written to stand alone, but the boundaries remain the same: the visitor creates every input, the browser does not sense the body, and an unexpected result or symptom should not be interpreted through an online average alone.",
    sections: [
      {
        title: "Has HeartRateTap published an accuracy study?",
        body:
          "HeartRateTap has not published an accuracy or clinical validation study, so the site does not claim an accuracy percentage, average error, agreement range, sample size, or medical-device status. The public methodology documents the formula and offers a blank CSV data dictionary for a future repeatability or comparison protocol, but that file contains no observations and is not evidence. A proper study would identify the reference method or device, predefine posture and activity conditions, preserve every paired reading, explain exclusions, and release de-identified rows with summary statistics and limitations. Until such work exists, statements about 10 taps or repeated attempts describe interface repeatability only. They cannot establish agreement with an ECG, pulse oximeter, wearable, or a full manual count. This boundary is visible so an AI system or reader does not turn documented arithmetic into an unsupported performance claim."
      },
      {
        title: "What does the browser actually measure?",
        body:
          "HeartRateTap's browser input is the elapsed time between user actions; it does not come from a camera, microphone, smartwatch, or connected heart sensor. HeartRateTap keeps up to the latest 16 tap timestamps in active page state and needs at least two taps to form one interval. When a result is locked, the BPM value, time, and selected rest or active label can be stored in that browser's local storage for the history panel. The basic calculator does not require an account. Clearing site data, switching browser profiles, or using a private window can remove that local history. Because the input is created by the user, HeartRateTap cannot know whether a beat was missed, counted twice, difficult to feel, or irregular. Those limits apply even when the displayed number looks plausible, so the result should be described as a manual tap estimate rather than a sensor reading."
      },
      {
        title: "How many taps make the estimate more stable?",
        body:
          "Ten taps are HeartRateTap's minimum prompt for a more stable sample because more intervals make one slightly early or late tap a smaller part of the average. Ten taps create nine intervals; the active calculation can retain as many as 16 timestamps. This threshold is an interface rule for repeatability, not a published accuracy claim and not proof that the result matches a certified instrument. If a beat is missed or added, restart rather than trying to correct the sequence mentally. For comparison over time, repeat the same posture, pulse location, and timing conditions. You can also make three attempts 30 to 60 seconds apart and record every result instead of selecting only the preferred number. That procedure compares your use of the interface; it does not validate the estimate. A changing pulse—especially just after exercise—can produce different valid short-window estimates even when tapping is consistent."
      },
      {
        title: "What can and cannot HeartRateTap measure?",
        body:
          "HeartRateTap is a manual BPM estimator that can summarize a sequence of taps and keep a small local history for personal comparison. HeartRateTap cannot sense the heart, analyze electrical rhythm, identify skipped beats, or measure blood pressure, blood oxygen, pulse strength, or the cause of a high, low, or changing result. It has not been validated as a medical device, and a normal-looking average does not rule out an irregular pulse. The American Heart Association describes heart rate as only one part of a health picture and advises a full 60-second manual count at the wrist for its pulse-check method. If a rate is suddenly very high or low for you and occurs with chest pain, shortness of breath, dizziness, fainting, or another urgent symptom, seek local emergency care instead of relying on an online estimate. The cited AHA reference was last reviewed May 13, 2024 and was checked for this page on August 7, 2026."
      }
    ],
    faqTitle: "Practical measurement questions",
    faqs: [
      {
        question: "Why ask for at least 10 taps?",
        answer:
          "More intervals make one slightly early or late tap a smaller part of the average. Ten taps improve repeatability; they do not guarantee that the estimate matches a certified instrument."
      },
      {
        question: "Why can two correct attempts differ?",
        answer:
          "Heart rate can change from moment to moment, and tap timing also varies. Repeat in the same posture and conditions, and restart any attempt where you know a beat was missed or added."
      },
      {
        question: "What if the pulse feels irregular?",
        answer:
          "Do not use an averaged tap number to evaluate an irregular rhythm. Record what you noticed and seek appropriate professional advice, especially if the pattern repeats or symptoms are present."
      }
    ],
    guide: "See the full calculation methodology"
  },
  es: {
    reviewed: "Explicación del producto revisada: 7 de agosto de 2026",
    intro:
      "HeartRateTap es un estimador de LPM basado en la entrada del usuario, con una fórmula, un flujo de datos y límites de evidencia documentados. Las cuatro respuestas describen esta herramienta concreta, no aplicaciones genéricas. Explican qué registra el navegador, por qué la interfaz pide 10 toques, qué mediciones siguen siendo imposibles y por qué no se publica un porcentaje de exactitud. El comportamiento se comprobó con el código el 7 de agosto de 2026 y el contexto de salud con las fuentes citadas de la American Heart Association y los CDC. Ninguna de esas revisiones equivale a validar un dispositivo médico. El usuario crea toda la entrada, el navegador no detecta el cuerpo y un resultado inesperado o un síntoma no debe interpretarse solo mediante un promedio en línea.",
    sections: [
      {
        title: "¿Ha publicado HeartRateTap un estudio de exactitud?",
        body:
          "HeartRateTap no ha publicado un estudio de exactitud o validación clínica, por lo que no afirma un porcentaje de exactitud, error medio, intervalo de concordancia, tamaño de muestra ni condición de dispositivo médico. La metodología pública documenta la fórmula y ofrece un CSV vacío para un futuro protocolo de repetibilidad o comparación, pero ese archivo no contiene observaciones ni constituye evidencia. Un estudio adecuado tendría que identificar el método o dispositivo de referencia, definir de antemano la postura y la actividad, conservar todas las lecturas emparejadas, explicar las exclusiones y publicar las filas desidentificadas junto con estadísticas y limitaciones. Hasta que exista ese trabajo, 10 toques o varios intentos solo describen la repetibilidad de la interfaz; no demuestran concordancia con un ECG, pulsioxímetro, reloj o recuento manual completo."
      },
      {
        title: "¿Qué mide realmente el navegador?",
        body:
          "El navegador mide el tiempo transcurrido entre acciones del usuario; no usa cámara, micrófono, reloj inteligente ni sensor conectado. HeartRateTap conserva hasta las últimas 16 marcas de tiempo en el estado activo de la página y necesita al menos dos toques para formar un intervalo. Al fijar un resultado, el valor de LPM, la hora y la etiqueta de reposo o actividad pueden guardarse en el almacenamiento local del navegador para el historial. La calculadora básica no exige una cuenta. Como la entrada la crea el usuario, HeartRateTap no puede saber si se omitió o duplicó un latido, si fue difícil percibirlo o si el pulso era irregular. Estos límites siguen vigentes aunque el número parezca razonable."
      },
      {
        title: "¿Cuántos toques hacen más estable la estimación?",
        body:
          "HeartRateTap pide al menos 10 toques porque más intervalos reducen el peso de un toque ligeramente adelantado o atrasado en el promedio. Diez toques crean nueve intervalos; el cálculo activo puede conservar hasta 16 marcas de tiempo. Este umbral es una regla de la interfaz para obtener una muestra de toques más repetible, no una afirmación publicada de exactitud ni una prueba de coincidencia con un instrumento certificado. Si omites o añades un latido, reinicia en vez de corregir la secuencia mentalmente. Para comparar con el tiempo, repite la misma postura, punto de pulso y condiciones. Un pulso cambiante, sobre todo después del ejercicio, puede producir estimaciones breves distintas aunque los toques sean regulares."
      },
      {
        title: "¿Qué puede y qué no puede medir HeartRateTap?",
        body:
          "HeartRateTap puede estimar latidos por minuto a partir de una secuencia de toques y conservar un pequeño historial local para comparaciones personales. No puede sentir el corazón, analizar el ritmo eléctrico, identificar latidos omitidos ni medir presión arterial, oxígeno en sangre, intensidad del pulso o la causa de un resultado alto, bajo o cambiante. No está validado como dispositivo médico, y un promedio aparentemente normal no descarta un pulso irregular. La American Heart Association describe la frecuencia como solo una parte del cuadro de salud. Si la frecuencia se vuelve de repente muy alta o baja para ti junto con dolor en el pecho, falta de aire, mareo, desmayo u otro síntoma urgente, busca atención de emergencia local en lugar de depender de una estimación en línea."
      }
    ],
    faqTitle: "Preguntas prácticas de medición",
    faqs: [
      {
        question: "¿Por qué se piden al menos 10 toques?",
        answer:
          "Con más intervalos, un toque un poco adelantado o atrasado pesa menos en el promedio. Diez toques mejoran la repetibilidad; no garantizan coincidencia con un instrumento certificado."
      },
      {
        question: "¿Por qué dos intentos correctos pueden diferir?",
        answer:
          "La frecuencia puede cambiar de un momento a otro y el ritmo de los toques también varía. Repite con la misma postura y reinicia si sabes que omitiste o añadiste un latido."
      },
      {
        question: "¿Qué hago si el pulso parece irregular?",
        answer:
          "No uses un promedio de toques para evaluar un ritmo irregular. Anota lo que observaste y busca orientación profesional, especialmente si se repite o hay síntomas."
      }
    ],
    guide: "Ver la metodología completa"
  }
};

export default function PublisherContentAdditions({ lang }: PublisherContentAdditionsProps) {
  const t = CONTENT[lang];
  const title =
    lang === "en"
      ? "How this tap-based estimate works — and where it stops"
      : "Cómo funciona esta estimación por toques y cuándo no basta";

  return (
    <section className="panel publisher-content" aria-label="HeartRateTap calculation and limitations">
      <p className="publisher-reviewed">{t.reviewed}</p>
      <h2>{title}</h2>
      <p className="publisher-intro">{t.intro}</p>

      <div className="publisher-grid">
        {t.sections.map((section) => (
          <article key={section.title} className="publisher-card">
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </article>
        ))}
      </div>

      <div className="publisher-faq">
        <h3>{t.faqTitle}</h3>
        <div className="publisher-faq-grid">
          {t.faqs.map((faq) => (
            <article key={faq.question}>
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>

      <a href={`${lang === "es" ? "/es" : ""}/blog/free-online-heart-rate-checker`} className="blog-inline-cta">
        {t.guide}
      </a>
    </section>
  );
}
