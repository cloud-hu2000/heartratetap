type PublisherContentAdditionsProps = {
  lang: "en" | "es";
};

const CONTENT = {
  en: {
    reviewed: "Product explanation last checked: July 10, 2026",
    intro:
      "The notes below describe the behavior of this specific tool—not a generic claim about browser heart-rate apps. The public methodology guide includes a worked calculation and repeatability checklist.",
    sections: [
      {
        title: "The calculation in one line",
        body:
          "BPM equals 60,000 divided by the average milliseconds between consecutive taps. An average interval of 1,000 ms is 60 BPM; 800 ms is 75 BPM; 600 ms is 100 BPM."
      },
      {
        title: "Which taps are used",
        body:
          "The active calculation keeps up to the latest 16 tap timestamps. The display checks short rolling windows and prefers the longer available sample. At least two taps are needed, but the interface asks for ten to reduce the influence of one small timing error."
      },
      {
        title: "What remains on this device",
        body:
          "Locked BPM values, timestamps and the selected rest/active label are saved in local browser storage by default. Clearing site data, switching profiles or using a private window can remove that history."
      },
      {
        title: "What we do not claim",
        body:
          "HeartRateTap has not been validated as a medical device. It does not sense electrical rhythm, detect missed beats, measure blood pressure or oxygen, or establish the cause of a high, low or changing result."
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
    reviewed: "Explicación del producto revisada: 10 de julio de 2026",
    intro:
      "Estas notas describen el comportamiento de esta herramienta concreta, no una afirmación general sobre aplicaciones de frecuencia cardíaca. La guía pública incluye un cálculo de ejemplo y una prueba de repetibilidad.",
    sections: [
      {
        title: "El cálculo en una línea",
        body:
          "Los LPM son 60.000 divididos entre el promedio de milisegundos entre toques consecutivos. Un intervalo medio de 1.000 ms equivale a 60 LPM; 800 ms a 75 LPM; 600 ms a 100 LPM."
      },
      {
        title: "Qué toques se utilizan",
        body:
          "El cálculo activo conserva hasta las últimas 16 marcas de tiempo. La pantalla comprueba ventanas breves y prefiere la muestra más larga disponible. Bastan dos toques para calcular, pero la interfaz pide diez para reducir el peso de un pequeño error."
      },
      {
        title: "Qué permanece en este dispositivo",
        body:
          "Los LPM guardados, la hora y la etiqueta de reposo/actividad se almacenan localmente en el navegador. Borrar los datos, cambiar de perfil o usar una ventana privada puede eliminar el historial."
      },
      {
        title: "Lo que no afirmamos",
        body:
          "HeartRateTap no está validado como dispositivo médico. No detecta el ritmo eléctrico ni latidos omitidos, no mide presión u oxígeno y no determina la causa de un resultado alto, bajo o cambiante."
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

      <a href="/blog/free-online-heart-rate-checker" className="blog-inline-cta">
        {t.guide}
      </a>
    </section>
  );
}
