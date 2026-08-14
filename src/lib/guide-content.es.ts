export type GuideCluster = "measurement" | "resting" | "training" | "mindful";
export type GuideContentEntry = {
  path: string;
  label: string;
  title: string;
  description: string;
  cluster: GuideCluster;
  primaryKeywordGroup: string;
  searchIntent: string;
};
export type ToolContentEntry = {
  path: string;
  label: string;
  title: string;
  description: string;
  primaryKeywordGroup: string;
  searchIntent: string;
};
export const GUIDE_CLUSTER_ORDER: GuideCluster[] = ["measurement", "resting", "training", "mindful"];
export const GUIDE_CLUSTER_META: Record<GuideCluster, {
  title: string;
  description: string;
}> = {
  measurement: {
    title: "Medir y comprender el método",
    description: "Aprende a encontrar un pulso, crea una lectura manual repetible y comprende exactamente cómo el tiempo de grabación se convierte en una estimación de LPM."
  },
  resting: {
    title: "Construir una rutina de descanso y seguimiento",
    description: "Compare las lecturas calmadas responsablemente, mantenga el contexto útil y prepare un registro conciso para una conversación de salud."
  },
  training: {
    title: "Use la frecuencia cardíaca alrededor del ejercicio",
    description: "Aplicar una orientación amplia de la frecuencia cardíaca dentro de las exigencias y los límites de medición de una actividad específica."
  },
  mindful: {
    title: "Mantenga los controles de pulso en perspectiva",
    description: "Use una observación manual ocasional sin convertir una práctica de bienestar en una partitura o conclusión médica."
  }
};
export const TOOL_CONTENT: ToolContentEntry[] = [{
  path: "/es/target-heart-rate-calculator",
  label: "Planificación del ejercicio",
  title: "Calcular un rango de frecuencia cardíaca objetivo",
  description: "Comparar el porcentaje de máximo estimado con reserva de frecuencia cardíaca, cambiar el rango de intensidad y mantener la fórmula al lado del resultado.",
  primaryKeywordGroup: "calculadora de frecuencia cardíaca objetivo; calculadora de reserva de frecuencia cardíaca; calculadora de Karvonen",
  searchIntent: "Calcular puntos de referencia de frecuencia cardíaca de ejercicio basado en fórmulas."
}, {
  path: "/es/heart-rate-recovery-calculator",
  label: "Recuperación posterior al ejercicio",
  title: "Cálculo de un cambio de frecuencia cardíaca de 1 o 2 minutos",
  description: "Resta una lectura de recuperación cronometrada del valor al terminar el ejercicio y conserva el intervalo y el protocolo junto al resultado.",
  primaryKeywordGroup: "calculadora de recuperación de frecuencia cardíaca; HRR de un minuto; recuperación de frecuencia cardíaca de dos minutos",
  searchIntent: "Calcular el cambio de LPM entre dos puntos de tiempo de recuperación documentados."
}];

/**
 * One canonical owner per published informational search intent. Keep closely
 * related variants on the same entry instead of creating near-duplicate pages.
 */
export const GUIDE_CONTENT: GuideContentEntry[] = [{
  path: "/es/blog/free-online-heart-rate-checker",
  label: "Metodología",
  title: "Cómo los intervalos entre toques se convierten en LPM",
  description: "Vea la fórmula de intervalo, un ejemplo trabajado, el flujo de datos del navegador, fuentes de error y una lista de verificación de repetibilidad.",
  cluster: "measurement",
  primaryKeywordGroup: "metodología de control de frecuencia cardíaca basada en el toque; cálculo de toques LPM; precisión del toque",
  searchIntent: "Entender cómo se calcula un cálculo manual de LPM en línea y cuáles son sus límites de precisión."
}, {
  path: "/es/blog/how-to-check-pulse-manually",
  label: "Técnica",
  title: "Cómo medir el pulso manualmente",
  description: "Aprende una técnica repetible para medir el pulso en la muñeca, contar y comparar lecturas y reconocer cuándo una estimación manual no es adecuada.",
  cluster: "measurement",
  primaryKeywordGroup: "cómo controlar el pulso manualmente; pulso manual de la muñeca; cuenta la frecuencia cardíaca manualmente",
  searchIntent: "Aprende una técnica de control manual de pulsos segura y repetible."
}, {
  path: "/es/blog/daily-resting-heart-rate-check",
  label: "Rutina",
  title: "Un control constante de la frecuencia cardíaca en reposo",
  description: "Construya una rutina de la mañana comparable, con un contexto récord con cada resultado y aprenda cuando una tendencia merece un consejo profesional.",
  cluster: "resting",
  primaryKeywordGroup: "cheque de frecuencia cardíaca de reposo diario; medición de la frecuencia cardíaca de reposo; rutina del pulso de la mañana",
  searchIntent: "Cree una rutina repetible para comparar las observaciones personales de remanso."
}, {
  path: "/es/blog/normal-resting-heart-rate-by-age",
  label: "Referencia de edad",
  title: "Comprender la frecuencia cardíaca normal de reposo por edad",
  description: "Promedios de población separados de los rangos de referencia para adultos y aprender por qué la infancia, las condiciones de medición y el contexto personal importan.",
  cluster: "resting",
  primaryKeywordGroup: "frecuencia cardíaca normal de reposo por edad; pulso de reposo por edad; rango de frecuencia cardíaca de reposo para adultos",
  searchIntent: "Comprender los patrones de pulso de reposo relacionados con la edad sin tratar un gráfico de población como diagnóstico."
}, {
  path: "/es/blog/build-personal-heart-rate-log",
  label: "Seguimiento personal",
  title: "Cómo crear un registro personal de frecuencia cardíaca útil",
  description: "Registra el método, las condiciones y los síntomas en un historial breve que facilite una conversación responsable con profesionales de la salud.",
  cluster: "resting",
  primaryKeywordGroup: "registro de frecuencia cardíaca; registro de seguimiento de pulsos; lecturas de frecuencia cardíaca",
  searchIntent: "Organizar observaciones de frecuencia cardíaca manual sin tratarlas como un diagnóstico."
}, {
  path: "/es/blog/talk-to-doctor-manual-heart-rate-data",
  label: "Conversaciones médicas",
  title: "Hablar con el médico sobre mediciones manuales del pulso",
  description: "Prepare un cronograma conciso, mejores preguntas y claras fronteras de seguridad antes de una visita de atención médica.",
  cluster: "resting",
  primaryKeywordGroup: "hablar con el médico sobre la frecuencia cardíaca; compartir el registro de pulsos; datos manuales de frecuencia cardíaca",
  searchIntent: "Preparar observaciones manuales útiles y preguntas para una visita de atención médica."
}, {
  path: "/es/blog/seniors-guide-checking-pulse",
  label: "Bienestar en adultos mayores",
  title: "Una rutina de control manual de pulsos calmada para adultos mayores",
  description: "Construye un cheque cómodo, repetible, graba el contexto circundante, y sabe cuándo un autocontrol no es suficiente.",
  cluster: "resting",
  primaryKeywordGroup: "cómo los ancianos controlan el pulso; control de pulso para adultos mayores; rutina de pulsos ancianos",
  searchIntent: "Aprende una cómoda rutina de pulso manual para un adulto mayor."
}, {
  path: "/es/blog/heart-rate-zones-for-running",
  label: "Carrera",
  title: "Calcular y usar zonas de frecuencia cardíaca para correr",
  description: "Calcular zonas, igualarlas a sesiones fáciles y duras, y entender el retraso en una lectura basada en el toque después de las paradas de funcionamiento.",
  cluster: "training",
  primaryKeywordGroup: "zonas de frecuencia cardíaca en funcionamiento; frecuencia cardíaca en funcionamiento; zonas de frecuencia cardíaca para los corredores",
  searchIntent: "Calcular e interpretar las amplias zonas de frecuencia cardíaca en un contexto en ejecución."
}, {
  path: "/es/blog/cycling-heart-rate-zones",
  label: "Ciclismo",
  title: "Calcular zonas para ciclismo en carretera o interior",
  description: "Use zonas amplias junto con el poder y el esfuerzo percibido, y aprenda por qué un toque post-ride es una instantánea de recuperación en lugar de datos en-bike.",
  cluster: "training",
  primaryKeywordGroup: "zonas de ritmo cardíaco en bicicleta; frecuencia cardíaca objetivo en bicicleta; zonas de frecuencia cardíaca en bicicleta",
  searchIntent: "Calcular e interpretar las amplias zonas de la frecuencia cardíaca en un contexto ciclista."
}, {
  path: "/es/blog/swimming-heart-rate-zones",
  label: "Natación",
  title: "Calcular zonas de natación sin copiar las de carrera",
  description: "Cuenta para la respuesta específica del deporte y la seguridad, retraso de salida y límites de entrada manual de tomar una estimación de toques después de lapsos.",
  cluster: "training",
  primaryKeywordGroup: "zonas de baño de frecuencia cardíaca; tasa de natalidad de baño objetivo; frecuencia cardíaca después de nadar",
  searchIntent: "Calcular e interpretar las amplias zonas de la frecuencia cardíaca en un contexto de natación."
}, {
  path: "/es/blog/heart-rate-zones-strength-training",
  label: "Entrenamiento de fuerza",
  title: "Qué puede decirte la frecuencia cardíaca después de levantar peso",
  description: "Las zonas de LPM aeróbica separadas de la intensidad del levantamiento y utilizan estimaciones de tap post-set sólo como contexto junto a la carga, los representantes, la forma y la RPE.",
  cluster: "training",
  primaryKeywordGroup: "zonas de frecuencia cardíaca para entrenamiento de fuerza; frecuencia cardíaca al levantarse; frecuencia cardíaca post-set",
  searchIntent: "Comprender el papel limitado de la frecuencia cardíaca en un contexto de entrenamiento de fuerza."
}, {
  path: "/es/blog/manual-heart-rate-checks-team-sports",
  label: "Rutinas para deportes de equipo",
  title: "Comprobaciones manuales de frecuencia cardíaca en los deportes de equipo",
  description: "Use puntos de control de recuperación consistentes como notas contextuales, sin tratar una estimación manual como autorización médica.",
  cluster: "training",
  primaryKeywordGroup: "Controles de frecuencia cardíaca manual del equipo; control de pulso de recuperación de atletas; rutina de pulso de entrenador",
  searchIntent: "Utilice un control manual de recuperación opcional y coherente en torno a las prácticas de equipo."
}, {
  path: "/es/blog/heart-rate-yoga-meditation",
  label: "Yoga y meditación",
  title: "Medir el pulso sin convertir la práctica en una puntuación",
  description: "Elige un momento estable alrededor del yoga o la meditación, regístrelo con cuidado y mantenga límites de seguridad adecuados.",
  cluster: "mindful",
  primaryKeywordGroup: "frecuencia cardíaca durante el yoga; meditación de frecuencia cardíaca; control mental del pulso",
  searchIntent: "Use una observación de pulso ocasional alrededor del yoga o la meditación sin sobreinterpretarlo."
}];
export const SEARCH_INTENT_OWNERS = [{
  ownerPath: "/es/",
  primaryKeywordGroup: "calculador de frecuencia cardíaca de toque manual; calculador de frecuencia cardíaca de toque",
  redirectAliases: ["/online-heart-rate-monitor", "/check-heart-rate-online-free"]
}, {
  ownerPath: "/es/blog/free-online-heart-rate-checker",
  primaryKeywordGroup: "metodología y limitaciones de la frecuencia cardíaca basada en el toque",
  redirectAliases: ["/es/blog/free-online-heart-rate-monitor", "/es/blog/heart-rate-monitor-online"]
}, {
  ownerPath: "/es/target-heart-rate-calculator",
  primaryKeywordGroup: "calculadora de frecuencia cardíaca objetivo; calculadora de reserva de frecuencia cardíaca; calculadora de Karvonen",
  redirectAliases: []
}, {
  ownerPath: "/es/heart-rate-recovery-calculator",
  primaryKeywordGroup: "calculadora de recuperación de frecuencia cardíaca; HRR de un minuto; recuperación de frecuencia cardíaca de dos minutos",
  redirectAliases: []
}, {
  ownerPath: "/es/blog/normal-resting-heart-rate-by-age",
  primaryKeywordGroup: "frecuencia cardíaca normal de reposo por edad; pulso de reposo por edad; rango de frecuencia cardíaca de reposo para adultos",
  redirectAliases: []
}] as const;
const RELATED_CLUSTER_ORDER: Record<GuideCluster, GuideCluster[]> = {
  measurement: ["measurement", "resting", "training", "mindful"],
  resting: ["resting", "measurement", "mindful", "training"],
  training: ["training", "measurement", "resting", "mindful"],
  mindful: ["mindful", "resting", "measurement", "training"]
};
export function getRelatedGuides(currentPath: string, limit = 4): GuideContentEntry[] {
  const currentGuide = GUIDE_CONTENT.find(guide => guide.path === currentPath);
  const clusterOrder = currentGuide ? RELATED_CLUSTER_ORDER[currentGuide.cluster] : GUIDE_CLUSTER_ORDER;
  const related: GuideContentEntry[] = [];
  for (const cluster of clusterOrder) {
    for (const guide of GUIDE_CONTENT) {
      if (guide.path !== currentPath && guide.cluster === cluster && !related.includes(guide)) {
        related.push(guide);
      }
      if (related.length === limit) {
        return related;
      }
    }
  }
  return related;
}
