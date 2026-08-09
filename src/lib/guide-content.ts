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

export const GUIDE_CLUSTER_META: Record<GuideCluster, { title: string; description: string }> = {
  measurement: {
    title: "Measure and understand the method",
    description:
      "Learn how to find a pulse, create a repeatable manual reading and understand exactly how tap timing becomes a BPM estimate."
  },
  resting: {
    title: "Build a resting-rate and tracking routine",
    description:
      "Compare calm readings responsibly, preserve useful context and prepare a concise record for a health-care conversation."
  },
  training: {
    title: "Use heart rate around exercise",
    description:
      "Apply broad heart-rate guidance within the demands and measurement limits of a specific activity."
  },
  mindful: {
    title: "Keep pulse checks in perspective",
    description:
      "Use an occasional manual observation without turning a wellness practice into a score or medical conclusion."
  }
};

export const TOOL_CONTENT: ToolContentEntry[] = [
  {
    path: "/target-heart-rate-calculator",
    label: "Exercise planning",
    title: "Calculate a target heart rate range",
    description:
      "Compare percent of estimated maximum with heart rate reserve, change the intensity range and keep the formula beside the result.",
    primaryKeywordGroup: "target heart rate calculator; heart rate reserve calculator; Karvonen calculator",
    searchIntent: "Calculate formula-based exercise heart rate reference points."
  },
  {
    path: "/heart-rate-recovery-calculator",
    label: "Post-exercise recovery",
    title: "Calculate a 1- or 2-minute heart rate change",
    description:
      "Subtract a timed recovery reading from an exercise-end value and preserve the interval and protocol with the result.",
    primaryKeywordGroup: "heart rate recovery calculator; one-minute HRR; two-minute heart rate recovery",
    searchIntent: "Calculate the BPM change between two documented recovery time points."
  }
];

/**
 * One canonical owner per published informational search intent. Keep closely
 * related variants on the same entry instead of creating near-duplicate pages.
 */
export const GUIDE_CONTENT: GuideContentEntry[] = [
  {
    path: "/blog/free-online-heart-rate-checker",
    label: "Methodology",
    title: "How tap timing becomes a BPM estimate",
    description:
      "See the interval formula, a worked example, the browser data flow, sources of error and a repeatability checklist.",
    cluster: "measurement",
    primaryKeywordGroup: "tap-based heart rate checker methodology; BPM tap calculation; tap accuracy",
    searchIntent: "Understand how a manual online BPM estimate is calculated and what its accuracy limits are."
  },
  {
    path: "/blog/how-to-check-pulse-manually",
    label: "Technique",
    title: "How to check a pulse manually",
    description:
      "Learn a repeatable wrist-pulse technique, how to count and compare readings, and when a manual estimate is not the right tool.",
    cluster: "measurement",
    primaryKeywordGroup: "how to check pulse manually; manual wrist pulse; count heart rate manually",
    searchIntent: "Learn a safe, repeatable manual pulse-check technique."
  },
  {
    path: "/blog/daily-resting-heart-rate-check",
    label: "Routine",
    title: "A consistent resting heart rate check",
    description:
      "Build a comparable morning routine, record context with each result and learn when a trend deserves professional advice.",
    cluster: "resting",
    primaryKeywordGroup: "daily resting heart rate check; measure resting heart rate; morning pulse routine",
    searchIntent: "Create a repeatable routine for comparing personal resting-rate observations."
  },
  {
    path: "/blog/normal-resting-heart-rate-by-age",
    label: "Age reference",
    title: "Understand normal resting heart rate by age",
    description:
      "Separate population averages from adult reference ranges and learn why childhood, measurement conditions and personal context matter.",
    cluster: "resting",
    primaryKeywordGroup: "normal resting heart rate by age; resting pulse by age; adult resting heart rate range",
    searchIntent: "Understand age-related resting pulse patterns without treating a population chart as a diagnosis."
  },
  {
    path: "/blog/build-personal-heart-rate-log",
    label: "Personal tracking",
    title: "How to build a meaningful personal heart-rate log",
    description:
      "Record method, conditions, and symptoms in a small log that supports a responsible health-care conversation.",
    cluster: "resting",
    primaryKeywordGroup: "heart rate log; pulse tracking log; record heart rate readings",
    searchIntent: "Organize manual heart-rate observations without treating them as a diagnosis."
  },
  {
    path: "/blog/talk-to-doctor-manual-heart-rate-data",
    label: "Health-care conversations",
    title: "Discuss manual pulse measurements with a doctor",
    description:
      "Prepare a concise timeline, better questions, and clear safety boundaries before a health-care visit.",
    cluster: "resting",
    primaryKeywordGroup: "talk to doctor about heart rate; share pulse log; manual heart rate data",
    searchIntent: "Prepare useful manual pulse observations and questions for a health-care visit."
  },
  {
    path: "/blog/seniors-guide-checking-pulse",
    label: "Older-adult wellness",
    title: "A calm manual pulse-check routine for older adults",
    description:
      "Build a comfortable, repeatable check, record the surrounding context, and know when a self-check is not enough.",
    cluster: "resting",
    primaryKeywordGroup: "how seniors check pulse; pulse check for older adults; elderly pulse routine",
    searchIntent: "Learn a comfortable manual pulse routine for an older adult."
  },
  {
    path: "/blog/heart-rate-zones-for-running",
    label: "Running",
    title: "Calculate and use running heart rate zones",
    description:
      "Calculate zones, match them to easy and hard sessions, and understand the delay in a tap-based reading after running stops.",
    cluster: "training",
    primaryKeywordGroup: "running heart rate zones; running target heart rate; heart rate zones for runners",
    searchIntent: "Calculate and interpret broad heart-rate zones in a running context."
  },
  {
    path: "/blog/cycling-heart-rate-zones",
    label: "Cycling",
    title: "Calculate cycling zones for road or indoor rides",
    description:
      "Use broad zones alongside power and perceived effort, and learn why a post-ride tap is a recovery snapshot rather than on-bike data.",
    cluster: "training",
    primaryKeywordGroup: "cycling heart rate zones; bike target heart rate; indoor cycling heart rate zones",
    searchIntent: "Calculate and interpret broad heart-rate zones in a cycling context."
  },
  {
    path: "/blog/swimming-heart-rate-zones",
    label: "Swimming",
    title: "Calculate swimming zones without copying running",
    description:
      "Account for sport-specific response and the safety, exit delay, and manual-input limits of taking a tap estimate after laps.",
    cluster: "training",
    primaryKeywordGroup: "swimming heart rate zones; swim target heart rate; heart rate after swimming",
    searchIntent: "Calculate and interpret broad heart-rate zones in a swimming context."
  },
  {
    path: "/blog/heart-rate-zones-strength-training",
    label: "Strength training",
    title: "Know what heart rate can tell you after lifting",
    description:
      "Separate aerobic BPM zones from lifting intensity, and use post-set tap estimates only as context beside load, reps, form, and RPE.",
    cluster: "training",
    primaryKeywordGroup: "heart rate zones for strength training; heart rate while lifting; post-set heart rate",
    searchIntent: "Understand the limited role of heart rate in a strength-training context."
  },
  {
    path: "/blog/manual-heart-rate-checks-team-sports",
    label: "Team-sport routines",
    title: "Manual heart-rate checks around team sports",
    description:
      "Use consistent recovery checkpoints as context notes, without treating a manual estimate as medical clearance.",
    cluster: "training",
    primaryKeywordGroup: "manual heart rate checks team sports; athlete recovery pulse check; coach pulse routine",
    searchIntent: "Use an optional, consistent manual recovery checkpoint around team practices."
  },
  {
    path: "/blog/heart-rate-yoga-meditation",
    label: "Yoga and meditation",
    title: "Use a pulse check without turning practice into a score",
    description:
      "Choose a stable moment around yoga or meditation, log it mindfully, and preserve appropriate safety boundaries.",
    cluster: "mindful",
    primaryKeywordGroup: "heart rate during yoga; heart rate meditation; mindful pulse check",
    searchIntent: "Use an occasional pulse observation around yoga or meditation without overinterpreting it."
  }
];

export const SEARCH_INTENT_OWNERS = [
  {
    ownerPath: "/",
    primaryKeywordGroup: "manual tap BPM estimator; tap heart rate calculator",
    redirectAliases: ["/online-heart-rate-monitor", "/check-heart-rate-online-free"]
  },
  {
    ownerPath: "/blog/free-online-heart-rate-checker",
    primaryKeywordGroup: "tap-based heart rate checker methodology and limitations",
    redirectAliases: ["/blog/free-online-heart-rate-monitor", "/blog/heart-rate-monitor-online"]
  },
  {
    ownerPath: "/target-heart-rate-calculator",
    primaryKeywordGroup: "target heart rate calculator; heart rate reserve calculator; Karvonen calculator",
    redirectAliases: []
  },
  {
    ownerPath: "/heart-rate-recovery-calculator",
    primaryKeywordGroup: "heart rate recovery calculator; one-minute HRR; two-minute heart rate recovery",
    redirectAliases: []
  },
  {
    ownerPath: "/blog/normal-resting-heart-rate-by-age",
    primaryKeywordGroup: "normal resting heart rate by age; resting pulse by age; adult resting heart rate range",
    redirectAliases: []
  }
] as const;

const RELATED_CLUSTER_ORDER: Record<GuideCluster, GuideCluster[]> = {
  measurement: ["measurement", "resting", "training", "mindful"],
  resting: ["resting", "measurement", "mindful", "training"],
  training: ["training", "measurement", "resting", "mindful"],
  mindful: ["mindful", "resting", "measurement", "training"]
};

export function getRelatedGuides(currentPath: string, limit = 4): GuideContentEntry[] {
  const currentGuide = GUIDE_CONTENT.find((guide) => guide.path === currentPath);
  const clusterOrder = currentGuide
    ? RELATED_CLUSTER_ORDER[currentGuide.cluster]
    : GUIDE_CLUSTER_ORDER;

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
