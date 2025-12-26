import Link from "next/link";

// SEO Content Server Component - 静态内容，减少client bundle
export function SEOContent({ lang }: { lang: "en" | "es" }) {
  const COPY = {
    en: {
      seoIntro:
        "Our real-time heart rate monitor lets you click to test your heart rate instantly without any devices or downloads. Tap or press the spacebar in rhythm with your pulse and receive immediate BPM and coaching.",
      seoHowToTitle: "How to Use This Heart Rate Monitor",
      seoHowToBody:
        "Using our heart rate detection tool is simple and requires no special equipment. Here's how to get started:",
      seoSteps: [
        "Find your pulse at the wrist or neck.",
        "Tap the surface or press the spacebar with each heartbeat.",
        "Watch the BPM update in real time and click Stop to lock the result."
      ],
      seoUnderstandingTitle: "Understanding Your Heart Rate Results",
      seoUnderstandingBody:
        "Your heart rate results can help you understand your cardiovascular health. The tool provides real-time monitoring for both resting and active heart rates, giving you insights into fitness and overall health.",
      seoStartTitle: "Start Your Heart Rate Test Now",
      seoStartBody:
        "Ready to begin? Use our real-time heart rate monitor to check your heart rate online instantly. No downloads, no devices—just tap and measure.",
      restingTitle: "Resting Heart Rate Reference Values",
      restingIntro:
        "Resting heart rate is your heart rate when you're at rest, typically measured in the morning before any activity. Use our click to test heart rate feature to measure your resting heart rate and compare it with these reference values:",
      ageGroup: "Age Group",
      menBpm: "Men (bpm)",
      womenBpm: "Women (bpm)",
      note:
        "Note: Well-trained athletes may have resting heart rates as low as 40-60 bpm. If your resting heart rate is consistently above 100 bpm (tachycardia) or below 60 bpm (bradycardia) and you experience symptoms, consult a healthcare professional.",
      exerciseTitle: "Exercise Heart Rate Reference Values",
      exerciseIntro:
        "During exercise, your heart rate increases to supply more oxygen to your muscles. Use our real-time heart rate monitor in active mode to track your exercise heart rate. Here are target heart rate zones based on age and gender:",
      targetZonesTitle: "Target Heart Rate Zones (50-85% of Maximum Heart Rate)",
      intensityTitle: "Exercise Intensity Zones",
      intensityList: [
        "Light Activity (50-60% max HR): Warm-up, recovery, and gentle exercise. Good for beginners and active recovery.",
        "Moderate Activity (60-70% max HR): Fat-burn efficiency peaks here.",
        "Vigorous Activity (70-85% max HR): Cardiovascular fitness zone. Improves heart and lung function, builds aerobic capacity.",
        "Maximum Effort (85-100% max HR): Anaerobic zone. Short bursts for advanced athletes. Use with caution."
      ],
      targetMaxHr: "Max HR"
    },
    es: {
      seoIntro:
        "Nuestro monitor de frecuencia cardíaca en tiempo real te permite medir tu pulso al instante sin dispositivos ni descargas. Toca o pulsa la barra espaciadora al ritmo de tu pulso y obtén BPM inmediato y recomendaciones.",
      seoHowToTitle: "Cómo usar este monitor de frecuencia cardíaca",
      seoHowToBody:
        "Usar nuestra herramienta de detección es sencillo y no requiere equipos especiales. Así es como empezar:",
      seoSteps: [
        "Encuentra tu pulso en la muñeca o el cuello.",
        "Toca la pantalla o pulsa la barra espaciadora con cada latido.",
        "Observa el BPM en tiempo real y pulsa Detener para guardar el resultado."
      ],
      seoUnderstandingTitle: "Cómo interpretar tus resultados",
      seoUnderstandingBody:
        "Tus resultados pueden ayudarte a comprender la salud cardiovascular. La herramienta ofrece monitorización en tiempo real tanto para la frecuencia en reposo como en actividad, brindándote información sobre tu forma física y salud general.",
      seoStartTitle: "Comienza tu prueba de frecuencia cardíaca ahora",
      seoStartBody:
        "¿Listo para empezar? Usa nuestro monitor en tiempo real para comprobar tu frecuencia cardíaca al instante. Sin descargas, sin dispositivos — solo toca y mide.",
      restingTitle: "Valores de referencia de frecuencia cardíaca en reposo",
      restingIntro:
        "La frecuencia cardíaca en reposo es la que tienes cuando estás en reposo, normalmente medida por la mañana antes de cualquier actividad. Usa nuestra función de prueba para medir tu frecuencia en reposo y compárala con estos valores de referencia:",
      ageGroup: "Grupo de edad",
      menBpm: "Hombres (lpm)",
      womenBpm: "Mujeres (lpm)",
      note:
        "Nota: Los atletas bien entrenados pueden tener frecuencias en reposo de 40-60 lpm. Si tu frecuencia está consistentemente por encima de 100 lpm o por debajo de 60 lpm y tienes síntomas, consulta a un profesional sanitario.",
      exerciseTitle: "Valores de frecuencia cardíaca durante el ejercicio",
      exerciseIntro:
        "Durante el ejercicio, tu frecuencia aumenta para suministrar más oxígeno a los músculos. Usa nuestro monitor en modo activo para seguir tu frecuencia durante el ejercicio. Aquí tienes las zonas objetivo según la edad:",
      targetZonesTitle: "Zonas objetivo (50-85% de la frecuencia máxima)",
      intensityTitle: "Zonas de intensidad del ejercicio",
      intensityList: [
        "Actividad ligera (50-60% FCmáx): Calentamiento, recuperación y ejercicio suave. Bueno para principiantes y recuperación activa.",
        "Actividad moderada (60-70% FCmáx): Zona de quema de grasa. Ideal para controlar el peso y mejorar la resistencia.",
        "Actividad vigorosa (70-85% FCmáx): Zona cardiovascular. Mejora la función cardíaca y pulmonar y la capacidad aeróbica.",
        "Esfuerzo máximo (85-100% FCmáx): Zona anaeróbica. Ráfagas cortas para atletas avanzados. Usar con precaución."
      ],
      targetMaxHr: "FC máx"
    }
  };

  const t = COPY[lang];

  return (
    <section className="panel seo-content">
      <div className="seo-content-wrapper">
        <p className="seo-intro">
          {t.seoIntro}
        </p>

        <h2 className="seo-heading">
          {t.seoHowToTitle}
        </h2>
        <p className="seo-body">{t.seoHowToBody}</p>
        <ol className="seo-steps">
          {t.seoSteps.map((s) => (
            <li key={s} className="seo-step-item">
              {s}
            </li>
          ))}
        </ol>

        <h2 className="seo-heading">
          {t.seoUnderstandingTitle}
        </h2>
        <p className="seo-body">{t.seoUnderstandingBody}</p>

        <h2 id="resting-heart-rate" className="seo-heading">
          {t.restingTitle}
        </h2>
        <p className="seo-body">{t.restingIntro}</p>

        <div className="seo-table-wrapper">
          <table className="seo-table">
            <thead>
              <tr className="seo-table-header">
                <th className="seo-table-cell seo-table-header-cell">{t.ageGroup}</th>
                <th className="seo-table-cell seo-table-header-cell">{t.menBpm}</th>
                <th className="seo-table-cell seo-table-header-cell">{t.womenBpm}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="seo-table-row">
                <td className="seo-table-cell">18-25</td>
                <td className="seo-table-cell seo-table-center">60-90</td>
                <td className="seo-table-cell seo-table-center">60-90</td>
              </tr>
              <tr className="seo-table-row">
                <td className="seo-table-cell">26-35</td>
                <td className="seo-table-cell seo-table-center">60-95</td>
                <td className="seo-table-cell seo-table-center">60-95</td>
              </tr>
              <tr className="seo-table-row">
                <td className="seo-table-cell">36-45</td>
                <td className="seo-table-cell seo-table-center">62-98</td>
                <td className="seo-table-cell seo-table-center">62-98</td>
              </tr>
              <tr className="seo-table-row">
                <td className="seo-table-cell">46-55</td>
                <td className="seo-table-cell seo-table-center">64-100</td>
                <td className="seo-table-cell seo-table-center">64-100</td>
              </tr>
              <tr className="seo-table-row">
                <td className="seo-table-cell">56-65</td>
                <td className="seo-table-cell seo-table-center">66-100</td>
                <td className="seo-table-cell seo-table-center">66-100</td>
              </tr>
              <tr className="seo-table-row">
                <td className="seo-table-cell">65+</td>
                <td className="seo-table-cell seo-table-center">68-100</td>
                <td className="seo-table-cell seo-table-center">68-100</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="seo-note">
          {t.note}
        </p>

        <h2 id="exercise-heart-rate" className="seo-heading">
          {t.exerciseTitle}
        </h2>
        <p className="seo-body">{t.exerciseIntro}</p>

        <h3 className="seo-subheading">
          {t.targetZonesTitle}
        </h3>

        <div className="seo-table-wrapper">
          <table className="seo-table">
            <thead>
              <tr className="seo-table-header">
                <th className="seo-table-cell seo-table-header-cell">{t.ageGroup}</th>
                <th className="seo-table-cell seo-table-header-cell">{t.menBpm}</th>
                <th className="seo-table-cell seo-table-header-cell">{t.womenBpm}</th>
                <th className="seo-table-cell seo-table-header-cell">{t.targetMaxHr}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="seo-table-row">
                <td className="seo-table-cell">18-25</td>
                <td className="seo-table-cell seo-table-center">98-166</td>
                <td className="seo-table-cell seo-table-center">98-166</td>
                <td className="seo-table-cell seo-table-center">195</td>
              </tr>
              <tr className="seo-table-row">
                <td className="seo-table-cell">26-35</td>
                <td className="seo-table-cell seo-table-center">97-165</td>
                <td className="seo-table-cell seo-table-center">97-165</td>
                <td className="seo-table-cell seo-table-center">194</td>
              </tr>
              <tr className="seo-table-row">
                <td className="seo-table-cell">36-45</td>
                <td className="seo-table-cell seo-table-center">93-157</td>
                <td className="seo-table-cell seo-table-center">93-157</td>
                <td className="seo-table-cell seo-table-center">185</td>
              </tr>
              <tr className="seo-table-row">
                <td className="seo-table-cell">46-55</td>
                <td className="seo-table-cell seo-table-center">88-149</td>
                <td className="seo-table-cell seo-table-center">88-149</td>
                <td className="seo-table-cell seo-table-center">175</td>
              </tr>
              <tr className="seo-table-row">
                <td className="seo-table-cell">56-65</td>
                <td className="seo-table-cell seo-table-center">83-141</td>
                <td className="seo-table-cell seo-table-center">83-141</td>
                <td className="seo-table-cell seo-table-center">166</td>
              </tr>
              <tr className="seo-table-row">
                <td className="seo-table-cell">65+</td>
                <td className="seo-table-cell seo-table-center">78-132</td>
                <td className="seo-table-cell seo-table-center">78-132</td>
                <td className="seo-table-cell seo-table-center">155</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="seo-subheading">
          {t.intensityTitle}
        </h3>
        <ul className="seo-intensity-list">
          {t.intensityList.map((item) => (
            <li key={item} className="seo-intensity-item">
              {item}
            </li>
          ))}
        </ul>

        <h2 className="seo-heading">
          {t.seoStartTitle}
        </h2>
        <p className="seo-start-body">{t.seoStartBody}</p>
      </div>
    </section>
  );
}
