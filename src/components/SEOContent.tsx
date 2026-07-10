const EXERCISE_ROWS = [
  { age: "20", zone: "100–170", maximum: "200" },
  { age: "30", zone: "95–162", maximum: "190" },
  { age: "35", zone: "93–157", maximum: "185" },
  { age: "40", zone: "90–153", maximum: "180" },
  { age: "45", zone: "88–149", maximum: "175" },
  { age: "50", zone: "85–145", maximum: "170" },
  { age: "55", zone: "83–140", maximum: "165" },
  { age: "60", zone: "80–136", maximum: "160" },
  { age: "65", zone: "78–132", maximum: "155" },
  { age: "70", zone: "75–128", maximum: "150" }
];

export function SEOContent({ lang }: { lang: "en" | "es" }) {
  const COPY = {
    en: {
      seoIntro:
        "HeartRateTap is a tap-timing calculator, not a body sensor. You find your pulse and tap once per beat; the browser estimates BPM from the intervals you create. This makes the method convenient and transparent, but the result depends on your pulse-finding and tapping consistency.",
      seoHowToTitle: "How to Use This Heart Rate Monitor",
      seoHowToBody:
        "Use the same deliberate routine each time so that repeated readings are easier to compare:",
      seoSteps: [
        "Sit still for a resting check. Place your index and middle fingers lightly on the thumb side of the inner wrist, or carefully locate the pulse at the side of the neck.",
        "Tap the heart area or press the spacebar once for every clearly felt beat. Aim for at least 10 steady taps; restart if you miss or add one.",
        "Press Stop to lock the estimate. If the number is unexpected, wait briefly and repeat under the same conditions before drawing a conclusion."
      ],
      seoUnderstandingTitle: "Understanding Your Heart Rate Results",
      seoUnderstandingBody:
        "The displayed BPM summarizes a short set of tap intervals. It cannot show blood pressure, oxygen level, pulse strength, electrical rhythm or the reason for a change. A normal-looking average does not rule out an irregular pulse, and one high or low value does not diagnose a condition.",
      methodTitle: "How the number is calculated",
      methodBody:
        "The calculator averages the milliseconds between consecutive taps, then divides 60,000 by that average. For example, an 800 ms average interval produces 75 BPM. Read the full methodology for a worked example, data flow and error checklist.",
      restingTitle: "Resting Heart Rate Reference Values",
      restingIntro:
        "The American Heart Association describes 60–100 BPM as a common resting range for most adults who are sitting or lying down, calm and feeling well. Individual context matters more than treating a chart as a diagnosis.",
      restingHeaders: ["Situation", "General reference", "How to use it"],
      restingRows: [
        ["Most adults at rest", "60–100 BPM", "A population reference, not a personal diagnosis or target."],
        ["Some trained or very active adults", "May be below 60 BPM", "Can be normal for some people; symptoms and personal history still matter."],
        ["Your repeated routine", "Your own comparable range", "Compare the same posture, time and conditions and record relevant context."]
      ],
      note:
        "If a rate is suddenly very high or low for you and you have chest pain, shortness of breath, dizziness, fainting or another urgent symptom, contact local emergency services. Do not wait for an online result.",
      exerciseTitle: "Exercise Heart Rate Reference Values",
      exerciseIntro:
        "The table below reproduces the American Heart Association's age-predicted 50–85% target range. Maximum heart rate is estimated as about 220 minus age. These figures are averages for general guidance, not measured personal limits.",
      targetZonesTitle: "Target Heart Rate Zones (50-85% of Maximum Heart Rate)",
      age: "Age",
      zone: "Target range (BPM)",
      targetMaxHr: "Age-predicted maximum (BPM)",
      intensityTitle: "Exercise Intensity Zones",
      intensityList: [
        "Moderate activity is commonly described as about 50–70% of age-predicted maximum. The CDC talk test says you can usually talk but not sing.",
        "Vigorous activity is commonly described as about 70–85% of age-predicted maximum. During the CDC talk test, saying more than a few words without pausing is difficult.",
        "Fitness, health conditions and medication can change an appropriate range. Ask a health professional for an individual target if those factors apply."
      ],
      seoStartTitle: "Start Your Heart Rate Test Now",
      seoStartBody:
        "Use the calculator above when you are safely still. Label the context, tap at least 10 clearly felt beats and treat the result as a manual wellness estimate rather than medical monitoring.",
      sourcesTitle: "Sources used on this page",
      methodLink: "Read HeartRateTap's calculation methodology",
      ahaPulse: "American Heart Association: All About Heart Rate",
      ahaTargets: "American Heart Association: Target Heart Rates Chart",
      cdcIntensity: "CDC: How to Measure Physical Activity Intensity",
      sourceNote: "Health reference content last checked July 10, 2026."
    },
    es: {
      seoIntro:
        "HeartRateTap es una calculadora basada en el ritmo de tus toques, no un sensor corporal. Tú encuentras el pulso y tocas una vez por latido; el navegador estima los LPM a partir de esos intervalos. El método es práctico y transparente, pero el resultado depende de cómo encuentres el pulso y de la regularidad de tus toques.",
      seoHowToTitle: "Cómo usar este monitor de frecuencia cardíaca",
      seoHowToBody:
        "Usa la misma rutina deliberada en cada medición para que las lecturas sean más comparables:",
      seoSteps: [
        "Para una medición en reposo, permanece quieto. Coloca suavemente los dedos índice y medio en la cara interna de la muñeca, del lado del pulgar, o localiza con cuidado el pulso en el costado del cuello.",
        "Toca el corazón o pulsa la barra espaciadora una vez por cada latido claramente percibido. Intenta completar al menos 10 toques regulares; reinicia si omites o añades uno.",
        "Pulsa Detener para fijar la estimación. Si el número te sorprende, espera un poco y repite en las mismas condiciones antes de sacar conclusiones."
      ],
      seoUnderstandingTitle: "Cómo interpretar tus resultados",
      seoUnderstandingBody:
        "Los LPM mostrados resumen una serie breve de intervalos entre toques. No muestran presión arterial, oxígeno, intensidad del pulso, ritmo eléctrico ni la causa de un cambio. Un promedio aparentemente normal no descarta un pulso irregular y un valor alto o bajo aislado no diagnostica una enfermedad.",
      methodTitle: "Cómo se calcula el número",
      methodBody:
        "La calculadora promedia los milisegundos entre toques consecutivos y divide 60.000 entre ese promedio. Por ejemplo, un intervalo medio de 800 ms produce 75 LPM. La metodología completa incluye un ejemplo, el flujo de datos y una lista de errores posibles.",
      restingTitle: "Valores de referencia de frecuencia cardíaca en reposo",
      restingIntro:
        "La American Heart Association describe 60–100 LPM como un intervalo frecuente en la mayoría de adultos sentados o acostados, tranquilos y sin malestar. El contexto individual es más importante que usar una tabla como diagnóstico.",
      restingHeaders: ["Situación", "Referencia general", "Cómo usarla"],
      restingRows: [
        ["La mayoría de adultos en reposo", "60–100 LPM", "Es una referencia poblacional, no un diagnóstico ni objetivo personal."],
        ["Algunos adultos entrenados o muy activos", "Puede ser inferior a 60 LPM", "Puede ser normal en algunas personas; los síntomas y antecedentes siguen importando."],
        ["Tu rutina repetida", "Tu propio intervalo comparable", "Compara la misma postura, hora y condiciones, y anota el contexto relevante."]
      ],
      note:
        "Si la frecuencia se vuelve de repente muy alta o baja para ti y tienes dolor en el pecho, falta de aire, mareo, desmayo u otro síntoma urgente, contacta a los servicios de emergencia locales. No esperes un resultado en línea.",
      exerciseTitle: "Valores de frecuencia cardíaca durante el ejercicio",
      exerciseIntro:
        "La tabla reproduce el intervalo objetivo del 50–85% predicho por edad de la American Heart Association. La frecuencia máxima se estima aproximadamente como 220 menos la edad. Son promedios orientativos, no límites personales medidos.",
      targetZonesTitle: "Zonas objetivo (50-85% de la frecuencia máxima)",
      age: "Edad",
      zone: "Intervalo objetivo (LPM)",
      targetMaxHr: "Máximo estimado por edad (LPM)",
      intensityTitle: "Zonas de intensidad del ejercicio",
      intensityList: [
        "La actividad moderada suele describirse como el 50–70% del máximo estimado. En la prueba del habla del CDC normalmente puedes hablar, pero no cantar.",
        "La actividad vigorosa suele describirse como el 70–85% del máximo estimado. En la prueba del habla resulta difícil decir más de unas pocas palabras sin pausar.",
        "La forma física, las enfermedades y los medicamentos pueden cambiar el intervalo adecuado. Consulta a un profesional para obtener un objetivo individual si corresponde."
      ],
      seoStartTitle: "Comienza tu prueba de frecuencia cardíaca ahora",
      seoStartBody:
        "Usa la calculadora de arriba cuando estés quieto y seguro. Indica el contexto, completa al menos 10 latidos claros y considera el resultado una estimación manual de bienestar, no monitorización médica.",
      sourcesTitle: "Fuentes usadas en esta página",
      methodLink: "Leer la metodología de cálculo de HeartRateTap",
      ahaPulse: "American Heart Association: información sobre la frecuencia cardíaca",
      ahaTargets: "American Heart Association: tabla de frecuencias objetivo",
      cdcIntensity: "CDC: cómo medir la intensidad de la actividad física",
      sourceNote: "Contenido de referencia revisado por última vez el 10 de julio de 2026."
    }
  };

  const t = COPY[lang];

  return (
    <section className="panel seo-content">
      <div className="seo-content-wrapper">
        <p className="seo-intro">{t.seoIntro}</p>

        <h2 className="seo-heading">{t.seoHowToTitle}</h2>
        <p className="seo-body">{t.seoHowToBody}</p>
        <ol className="seo-steps">
          {t.seoSteps.map((step) => (
            <li key={step} className="seo-step-item">
              {step}
            </li>
          ))}
        </ol>

        <h2 className="seo-heading">{t.seoUnderstandingTitle}</h2>
        <p className="seo-body">{t.seoUnderstandingBody}</p>
        <h3 className="seo-subheading">{t.methodTitle}</h3>
        <p className="seo-body">
          {t.methodBody}{" "}
          <a href="/blog/free-online-heart-rate-checker" className="blog-inline-cta">
            {t.methodLink}
          </a>
          .
        </p>

        <h2 id="resting-heart-rate" className="seo-heading">
          {t.restingTitle}
        </h2>
        <p className="seo-body">{t.restingIntro}</p>
        <div className="seo-table-wrapper">
          <table className="seo-table">
            <thead>
              <tr className="seo-table-header">
                {t.restingHeaders.map((header) => (
                  <th key={header} className="seo-table-cell seo-table-header-cell">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.restingRows.map((row) => (
                <tr key={row[0]} className="seo-table-row">
                  {row.map((cell) => (
                    <td key={cell} className="seo-table-cell">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="seo-note">{t.note}</p>

        <h2 id="exercise-heart-rate" className="seo-heading">
          {t.exerciseTitle}
        </h2>
        <p className="seo-body">{t.exerciseIntro}</p>
        <h3 className="seo-subheading">{t.targetZonesTitle}</h3>
        <div className="seo-table-wrapper">
          <table className="seo-table">
            <thead>
              <tr className="seo-table-header">
                <th className="seo-table-cell seo-table-header-cell">{t.age}</th>
                <th className="seo-table-cell seo-table-header-cell">{t.zone}</th>
                <th className="seo-table-cell seo-table-header-cell">{t.targetMaxHr}</th>
              </tr>
            </thead>
            <tbody>
              {EXERCISE_ROWS.map((row) => (
                <tr key={row.age} className="seo-table-row">
                  <td className="seo-table-cell">{row.age}</td>
                  <td className="seo-table-cell seo-table-center">{row.zone}</td>
                  <td className="seo-table-cell seo-table-center">{row.maximum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="seo-subheading">{t.intensityTitle}</h3>
        <ul className="seo-intensity-list">
          {t.intensityList.map((item) => (
            <li key={item} className="seo-intensity-item">
              {item}
            </li>
          ))}
        </ul>

        <h2 className="seo-heading">{t.seoStartTitle}</h2>
        <p className="seo-start-body">{t.seoStartBody}</p>

        <div className="seo-sources">
          <h3>{t.sourcesTitle}</h3>
          <ul>
            <li>
              <a
                href="https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse"
                rel="noopener noreferrer"
              >
                {t.ahaPulse}
              </a>
            </li>
            <li>
              <a
                href="https://www.heart.org/en/healthy-living/exercise-and-physical-activity/fitness-basics/target-heart-rates"
                rel="noopener noreferrer"
              >
                {t.ahaTargets}
              </a>
            </li>
            <li>
              <a href="https://www.cdc.gov/physical-activity-basics/measuring/index.html" rel="noopener noreferrer">
                {t.cdcIntensity}
              </a>
            </li>
          </ul>
          <p>{t.sourceNote}</p>
        </div>
      </div>
    </section>
  );
}
