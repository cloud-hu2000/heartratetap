type PublisherContentAdditionsProps = {
  lang: "en" | "es";
};

const CONTENT = {
  en: {
    reviewed: "Content last reviewed: July 2026",
    intro:
      "HeartRateTap is designed as a practical pulse-timing tool, so this page includes the measurement experience and the context needed to understand it responsibly.",
    sections: [
      {
        title: "How the tap method estimates BPM",
        body:
          "The tool measures the time between your taps and converts that rhythm into beats per minute. A steady sequence of taps gives the calculator more intervals to compare, which is why ten or more consistent beats usually produces a more stable result than two or three quick taps."
      },
      {
        title: "What affects accuracy",
        body:
          "Cold hands, movement, stress, caffeine, recent exercise, and uneven tapping can all change the reading. If a number looks surprising, rest quietly, find a clear pulse at the wrist or neck, and repeat the measurement before making any personal wellness conclusions."
      },
      {
        title: "When to use a certified device",
        body:
          "This site is for everyday wellness reference. It is not a medical device and should not be used for diagnosis, emergency evaluation, medication decisions, or training limits set by a clinician. Use certified equipment or professional care when accuracy matters."
      },
      {
        title: "Why your history stays local",
        body:
          "Recent readings are kept in your browser so you can compare checks on the same device without creating an account. Clearing browser storage, switching browsers, or using private mode can remove that local history."
      }
    ],
    faqTitle: "Practical questions",
    faqs: [
      {
        question: "How long should I tap?",
        answer:
          "Tap through at least ten steady heartbeats. For resting checks, sit still for a few minutes first and avoid measuring immediately after climbing stairs, exercising, or drinking caffeine."
      },
      {
        question: "Why do two readings differ?",
        answer:
          "Heart rate naturally changes from minute to minute. Differences can also come from finding a weaker pulse point or tapping slightly ahead of or behind the beat."
      },
      {
        question: "What is a useful routine?",
        answer:
          "For trend tracking, measure at a similar time and in similar conditions, such as after waking and before coffee. Comparing consistent routines is more useful than comparing random readings."
      }
    ]
  },
  es: {
    reviewed: "Contenido revisado por ultima vez: julio de 2026",
    intro:
      "HeartRateTap esta pensado como una herramienta practica para cronometrar el pulso, por eso esta pagina combina la medicion con el contexto necesario para interpretarla con responsabilidad.",
    sections: [
      {
        title: "Como el metodo de toques estima los BPM",
        body:
          "La herramienta mide el tiempo entre tus toques y convierte ese ritmo en latidos por minuto. Una serie constante de toques da mas intervalos para comparar, por lo que diez o mas latidos regulares suelen ofrecer un resultado mas estable que dos o tres toques rapidos."
      },
      {
        title: "Que afecta la precision",
        body:
          "Manos frias, movimiento, estres, cafeina, ejercicio reciente y toques irregulares pueden cambiar la lectura. Si el numero sorprende, descansa, encuentra un pulso claro en la muneca o el cuello y repite la medicion."
      },
      {
        title: "Cuando usar un dispositivo certificado",
        body:
          "Este sitio es una referencia de bienestar general. No es un dispositivo medico y no debe usarse para diagnostico, emergencias, decisiones de medicacion o limites de entrenamiento definidos por un profesional."
      },
      {
        title: "Por que tu historial queda local",
        body:
          "Las lecturas recientes se guardan en tu navegador para comparar mediciones en el mismo dispositivo sin crear una cuenta. Borrar el almacenamiento, cambiar de navegador o usar modo privado puede eliminar ese historial."
      }
    ],
    faqTitle: "Preguntas practicas",
    faqs: [
      {
        question: "Cuanto tiempo debo tocar?",
        answer:
          "Toca durante al menos diez latidos constantes. Para mediciones en reposo, sientate unos minutos antes y evita medir justo despues de subir escaleras, entrenar o tomar cafeina."
      },
      {
        question: "Por que dos lecturas son diferentes?",
        answer:
          "La frecuencia cardiaca cambia naturalmente minuto a minuto. Tambien puede variar si el punto de pulso es debil o si los toques se adelantan o retrasan respecto al latido."
      },
      {
        question: "Que rutina es util?",
        answer:
          "Para seguir tendencias, mide a una hora y en condiciones similares, por ejemplo al despertar y antes del cafe. Comparar rutinas constantes es mas util que comparar lecturas aleatorias."
      }
    ]
  }
};

export default function PublisherContentAdditions({ lang }: PublisherContentAdditionsProps) {
  const t = CONTENT[lang];

  return (
    <section className="panel publisher-content" aria-label="HeartRateTap measurement guidance">
      <p className="publisher-reviewed">{t.reviewed}</p>
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
    </section>
  );
}
