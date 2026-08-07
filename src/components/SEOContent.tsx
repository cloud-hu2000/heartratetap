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
        "HeartRateTap is a manual tap-timing calculator, not a body sensor. You find your pulse and tap once per beat; the browser estimates BPM from the intervals you create. The calculation is transparent: 60,000 divided by the average interval in milliseconds. The active sample can retain up to 16 tap timestamps and checks recent 5-second and 10-second windows. This makes the method convenient to reproduce, but the result depends on your pulse-finding and tapping consistency. HeartRateTap cannot verify that a tap matched a beat, analyze an irregular rhythm, or replace a full manual count, wearable, medical device, or professional assessment.",
      seoHowToTitle: "How to Use This Heart Rate Monitor",
      seoHowToBody:
        "A repeatable HeartRateTap check is a three-step routine: choose a stable situation, match one deliberate tap to each clearly felt beat, and record the context with the locked result. The interface asks for at least 10 taps, which creates nine intervals and reduces the influence of one small timing difference. Ten taps are not a medical accuracy threshold. Use the same deliberate routine each time so repeated readings are easier to compare:",
      seoSteps: [
        "Sit still for a resting check. Place your index and middle fingers lightly on the thumb side of the inner wrist, or carefully locate the pulse at the side of the neck.",
        "Tap the heart area or press the spacebar once for every clearly felt beat. Aim for at least 10 steady taps; restart if you miss or add one.",
        "Press Stop to lock the estimate. If the number is unexpected, wait briefly and repeat under the same conditions before drawing a conclusion."
      ],
      seoUnderstandingTitle: "Understanding Your Heart Rate Results",
      seoUnderstandingBody:
        "A HeartRateTap result is a rounded summary of a short set of user-created tap intervals. The result can describe the average tapping rate during that sample, but it cannot show blood pressure, blood oxygen, pulse strength, electrical rhythm, missed beats, or the reason for a change. A normal-looking average does not rule out an irregular pulse, and one high or low value does not diagnose a condition. Compare results only when posture, pulse location, recent activity, and timing are similar; after exercise, heart rate may change while you are still finding the pulse and tapping. If a value is unexpected and you feel well, rest and repeat the entire attempt rather than editing or selecting individual taps. Symptoms and personal medical context take priority over any general range or online estimate.",
      methodTitle: "How the number is calculated",
      methodBody:
        "HeartRateTap's BPM calculation is an interval conversion: it averages the milliseconds between consecutive taps, then divides 60,000 by that average and rounds the result. For example, five taps at 0, 800, 1,610, 2,400 and 3,205 ms create four intervals of 800, 810, 790 and 805 ms. Their average is 801.25 ms, so 60,000 ÷ 801.25 equals 74.88 and displays as 75 BPM. The live interface also checks recent 5-second and 10-second windows and can retain up to 16 timestamps. A missed beat can roughly double one interval, while an accidental extra tap can shorten it. These facts describe the code and arithmetic, not agreement with a clinical instrument. Read the full methodology for the data flow, error checklist, repeatability protocol, and current validation status.",
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
        "The American Heart Association's target-heart-rate table uses an age-predicted maximum of about 220 minus age, with moderate activity described as roughly 50–70% and vigorous activity as roughly 70–85% of that estimate. The table below reproduces its combined 50–85% ranges for ages 20 through 70. These figures are population averages for general guidance, not measured personal limits or exercise clearance. Fitness, health conditions, medicines, and the activity itself can change an appropriate target. A HeartRateTap reading taken after movement is also delayed by the time needed to stop, find a pulse, and tap, so it describes a short recovery sample rather than continuous exercise data.",
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
        "A responsible HeartRateTap check starts with a clearly felt pulse and a stable situation. Use the calculator above when you are safely still, label the context as rest or active, and tap at least 10 clearly felt beats. Restart if you know a beat was missed or added. Lock the result only after a complete attempt, and save the posture, recent activity, symptoms, or other context needed for a fair comparison. If the number is surprising and you feel well, rest and repeat under the same conditions rather than selecting the preferred result. Treat every value as a manual wellness estimate, not continuous monitoring, diagnosis, medical clearance, or a reason to ignore symptoms.",
      sourcesTitle: "Sources used on this page",
      sourceScope:
        "Each source has a defined role. The American Heart Association's All About Heart Rate page supports pulse locations, a full 60-second wrist count, general adult resting context, factors that affect rate, and urgent symptom guidance. Its Target Heart Rates Chart supports the age-predicted maximum and general 50–70% and 70–85% exercise ranges. The CDC page supports the talk test for relative intensity. None of these organizations has evaluated or endorsed HeartRateTap, and their public-health guidance does not validate the tap algorithm. Source links and dates were checked on August 7, 2026; product statements were checked separately against the code.",
      methodLink: "Read HeartRateTap's calculation methodology",
      ahaPulse: "American Heart Association: All About Heart Rate",
      ahaTargets: "American Heart Association: Target Heart Rates Chart",
      cdcIntensity: "CDC: How to Measure Physical Activity Intensity",
      sourceNote: "Health reference content last checked August 7, 2026."
    },
    es: {
      seoIntro:
        "HeartRateTap es una calculadora manual basada en el ritmo de tus toques, no un sensor corporal. Tú encuentras el pulso y tocas una vez por latido; el navegador estima los LPM a partir de los intervalos que creas. El cálculo es transparente: 60.000 dividido entre el intervalo medio en milisegundos. La muestra activa puede conservar hasta 16 marcas de tiempo y comprueba ventanas recientes de 5 y 10 segundos. El método es reproducible, pero el resultado depende de cómo encuentres el pulso y de la regularidad de tus toques. HeartRateTap no puede confirmar que cada toque coincidió con un latido, analizar un ritmo irregular ni sustituir un recuento completo, un dispositivo o una evaluación profesional.",
      seoHowToTitle: "Cómo usar este monitor de frecuencia cardíaca",
      seoHowToBody:
        "Una medición repetible sigue tres pasos: elige una situación estable, haz un toque deliberado por cada latido claramente percibido y guarda el contexto con el resultado. La interfaz pide al menos 10 toques, que forman nueve intervalos y reducen el peso de una pequeña diferencia de tiempo. Diez toques no son un umbral de exactitud médica. Usa la misma rutina en cada medición para que las lecturas sean más comparables:",
      seoSteps: [
        "Para una medición en reposo, permanece quieto. Coloca suavemente los dedos índice y medio en la cara interna de la muñeca, del lado del pulgar, o localiza con cuidado el pulso en el costado del cuello.",
        "Toca el corazón o pulsa la barra espaciadora una vez por cada latido claramente percibido. Intenta completar al menos 10 toques regulares; reinicia si omites o añades uno.",
        "Pulsa Detener para fijar la estimación. Si el número te sorprende, espera un poco y repite en las mismas condiciones antes de sacar conclusiones."
      ],
      seoUnderstandingTitle: "Cómo interpretar tus resultados",
      seoUnderstandingBody:
        "Un resultado de HeartRateTap es un resumen redondeado de una serie breve de intervalos creados por el usuario. Puede describir el ritmo medio de los toques, pero no muestra presión arterial, oxígeno en sangre, intensidad del pulso, ritmo eléctrico, latidos omitidos ni la causa de un cambio. Un promedio aparentemente normal no descarta un pulso irregular y un valor alto o bajo aislado no diagnostica una enfermedad. Compara resultados solo cuando la postura, el punto del pulso, la actividad reciente y el momento sean similares. Después del ejercicio, la frecuencia puede cambiar mientras localizas el pulso y tocas. Si un valor te sorprende y te encuentras bien, descansa y repite el intento completo. Los síntomas y tu contexto médico tienen prioridad sobre cualquier intervalo general o estimación en línea.",
      methodTitle: "Cómo se calcula el número",
      methodBody:
        "El cálculo de HeartRateTap convierte intervalos: promedia los milisegundos entre toques consecutivos, divide 60.000 entre ese promedio y redondea el resultado. Por ejemplo, cinco toques en 0, 800, 1.610, 2.400 y 3.205 ms crean cuatro intervalos de 800, 810, 790 y 805 ms. El promedio es 801,25 ms; 60.000 ÷ 801,25 equivale a 74,88 y se muestra como 75 LPM. La interfaz comprueba ventanas recientes de 5 y 10 segundos y puede conservar hasta 16 marcas. Omitir un latido puede duplicar aproximadamente un intervalo; añadir uno puede acortarlo. Estos datos describen el código y la aritmética, no la coincidencia con un instrumento clínico. La metodología completa explica el flujo de datos, los errores, la repetibilidad y el estado actual de validación.",
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
        "La tabla de la American Heart Association usa un máximo estimado de unas 220 pulsaciones menos la edad y describe la actividad moderada como aproximadamente el 50–70% y la vigorosa como el 70–85% de ese máximo. La tabla inferior reproduce el intervalo combinado del 50–85% entre los 20 y 70 años. Son promedios poblacionales orientativos, no límites personales medidos ni autorización para hacer ejercicio. La forma física, las enfermedades, los medicamentos y la actividad pueden cambiar un objetivo adecuado. Además, una lectura de HeartRateTap después del movimiento se retrasa durante el tiempo necesario para detenerse, localizar el pulso y tocar; describe una breve muestra de recuperación, no datos continuos del ejercicio.",
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
        "Una medición responsable empieza con un pulso claramente percibido y una situación estable. Usa la calculadora cuando estés quieto y seguro, marca el contexto como reposo o actividad y completa al menos 10 latidos claros. Reinicia si sabes que omitiste o añadiste uno. Fija el resultado solo después de un intento completo y anota la postura, actividad reciente, síntomas u otro contexto necesario para comparar. Si el número te sorprende y te encuentras bien, descansa y repite en las mismas condiciones en vez de elegir el resultado preferido. Considera cada valor una estimación manual de bienestar, no monitorización continua, diagnóstico, autorización médica ni motivo para ignorar síntomas.",
      sourcesTitle: "Fuentes usadas en esta página",
      sourceScope:
        "Cada fuente cumple una función concreta. La página All About Heart Rate de la American Heart Association respalda los puntos del pulso, el recuento completo de 60 segundos, el contexto general en reposo, los factores que afectan la frecuencia y los síntomas urgentes. Su tabla de frecuencias objetivo respalda el máximo estimado por edad y los intervalos generales del 50–70% y 70–85%. La página de los CDC respalda la prueba del habla. Ninguna de estas organizaciones ha evaluado o avalado HeartRateTap, y su información no valida el algoritmo de toques. Los enlaces y fechas se comprobaron el 7 de agosto de 2026; el producto se revisó por separado con el código.",
      methodLink: "Leer la metodología de cálculo de HeartRateTap",
      ahaPulse: "American Heart Association: información sobre la frecuencia cardíaca",
      ahaTargets: "American Heart Association: tabla de frecuencias objetivo",
      cdcIntensity: "CDC: cómo medir la intensidad de la actividad física",
      sourceNote: "Contenido de referencia revisado por última vez el 7 de agosto de 2026."
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
          <p>{t.sourceScope}</p>
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
