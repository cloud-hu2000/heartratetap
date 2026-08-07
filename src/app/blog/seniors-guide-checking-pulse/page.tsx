import type { Metadata } from "next";
import Link from "next/link";
import DeepGuidePage from "@/components/DeepGuidePage";
import { type Source } from "@/components/SourceList";
import { buildSocialMetadata } from "@/lib/seo-metadata";

const TITLE = "A Senior's Guide to Checking Your Pulse: A Calm, Repeatable Routine";
const DESCRIPTION =
  "Learn a practical manual pulse-check routine for older adults, including a simple log, safety boundaries, and questions to bring to a health care visit.";
const PATH = "/blog/seniors-guide-checking-pulse";

export const metadata: Metadata = {
  title: `${TITLE} | HeartRateTap`,
  description: DESCRIPTION,
  alternates: { canonical: `https://www.heartratetap.com${PATH}` },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, url: `https://www.heartratetap.com${PATH}` })
};

const SOURCES: Source[] = [
  {
    name: "All About Heart Rate",
    publisher: "American Heart Association",
    url: "https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse",
    note: "How to check a pulse, factors that affect rate, logging guidance, and symptom-based escalation."
  },
  {
    name: "Heart Health and Aging",
    publisher: "National Institute on Aging",
    url: "https://www.nia.nih.gov/health/heart-health/heart-health-and-aging",
    note: "Age-related heart-health context and the importance of discussing persistent changes with a clinician."
  }
];

export default function SeniorsPulseGuidePage() {
  return (
    <DeepGuidePage
      title={TITLE}
      description={DESCRIPTION}
      path={PATH}
      category="Older-adult wellness"
      readingTime="10 minute read"
      intro={
        <>
          A manual pulse check can be a useful way to notice a familiar pattern, record what was happening at the time,
          and prepare a clearer question for a clinician. This guide is for older adults and supporters who want a calm,
          low-pressure routine—not a way to diagnose a rhythm or make medication decisions from one number.
        </>
      }
      sections={[
        {
          heading: "Start with a purpose, not a target number",
          content: <>
            <p>Before checking, name the reason for the measurement. You may be building a calm-morning record, checking after an approved walk, or noting a new sensation before a scheduled appointment. Those are different comparisons. A pulse after climbing stairs should not be judged against a quiet, seated reading, and a single result does not explain why it changed.</p>
            <p>Older adults may have medications, health conditions, activity limits, or clinician-provided targets that change what is meaningful. The American Heart Association notes that medicines such as beta blockers and calcium-channel blockers can affect heart rate. If a clinician has told you when or how to monitor, follow that individual plan rather than an online range. The useful question is often “is this different from my usual pattern under similar conditions?”</p>
          </>
        },
        {
          heading: "Set up a comfortable, repeatable check",
          content: <>
            <p>Choose a stable position: seated with both feet supported, or lying down if that is the position you use consistently. Rest for a few minutes, keep the room and clothing comfortable, and avoid trying to balance a phone while you search for the pulse. If you use glasses, a hearing aid, a cane, or another aid, arrange the check so you do not have to reach, twist, or hurry.</p>
            <p>Write down the basics before you begin: date, time, position, recent activity, and whether you feel normal for you. A companion can help record the information, but they should not need to interpret it. The aim is a small, repeatable snapshot. A good log is easier to use than a detailed diary that becomes too difficult to maintain.</p>
          </>
        },
        {
          heading: "Find the wrist pulse gently",
          content: <>
            <p>Turn one hand palm-up. Place the pads of your index and middle fingers on the thumb side of the opposite wrist, just below the wrist crease. Do not use your thumb; its own pulse can be confusing. Use light pressure and move a few millimeters at a time until the beat feels clear. Pressing harder can make the pulse harder to feel.</p>
            <p>Pause for several beats before counting. If the pulse is difficult to find, your hands are cold, or you are becoming frustrated, stop and reset rather than squeezing or guessing. Warm your hands, change position, or ask a health professional to demonstrate a method suitable for you. A manual check is only useful when the beats are reasonably clear.</p>
          </>
        },
        {
          heading: "Choose one counting method and use it consistently",
          content: <>
            <p>Counting all clearly felt beats for a full minute is straightforward and gives you time to notice whether the spacing feels regular. A shorter count is an estimate and can be more affected by a missed or extra beat. Neither method confirms a heart rhythm or replaces a clinical device when a clinician has requested one.</p>
            <p>If you prefer tapping, open the <Link href="/">tap-based BPM calculator</Link> after you have found the pulse. Tap once for each clearly felt beat and use several deliberate taps rather than racing to finish. The tool averages the intervals you enter; it does not sense the heart. Stop and restart after a missed beat instead of quietly correcting the result in your head.</p>
          </>
        },
        {
          heading: "Record context that makes a number useful later",
          content: <>
            <p>A brief record can make a future conversation much more useful. Include the rate or tap estimate, your position, the method used, and the condition around it: before breakfast, after a walk, after caffeine, after poor sleep, or during a symptom. Record repeat readings rather than selecting the lowest or highest one. A simple note such as “72 and 74 BPM, seated, before breakfast, felt usual” preserves more meaning than a number alone.</p>
            <p>Also record symptoms in plain language, without diagnosing them: fluttering, dizziness, weakness, chest discomfort, shortness of breath, or no symptoms. Symptoms and a change from your personal pattern may matter more than an app display. Do not use a log to delay a call for help, change a prescription, or decide that a concerning sensation is harmless.</p>
          </>
        },
        {
          heading: "Know when a manual check is not enough",
          content: <>
            <p>Stop relying on a self-check if the pulse seems persistently irregular, you cannot obtain a clear reading, repeated measurements are very different, or you have been instructed to use a specific monitor. Persistent fluttering, racing, or skipped-beat sensations deserve a conversation with a health professional, especially when they are new or more frequent. Bring the context from your log rather than trying to label the cause yourself.</p>
            <p>Call local emergency services immediately for a suddenly very high or low heart rate that is unusual for you together with chest pain, shortness of breath, dizziness, fainting, or another urgent symptom. Do not wait for a second manual count, a web search, or an email response. A pulse check is a wellness observation, not emergency triage.</p>
          </>
        },
        {
          heading: "Make the routine easy to continue",
          content: <>
            <p>Pick a frequency that serves a clear purpose. For many people, one calm check at an agreed time is more useful than checking repeatedly all day. If the routine creates anxiety, discuss that with a clinician and consider whether less frequent, more structured tracking would be better. The goal is to notice usable information, not to seek perfect control over every beat.</p>
            <p>For a general daily framework, see the <Link href="/blog/daily-resting-heart-rate-check">resting heart rate routine</Link>. Keep your own clinician’s directions, medications, symptoms, and activity limits at the center of any decision. HeartRateTap can help organize tap timing, but it cannot determine whether a result is safe, normal, or appropriate for you.</p>
          </>
        }
      ]}
      sources={SOURCES}
      ctaTitle="Use a calm pulse-check routine"
      ctaText="Find the pulse first, make deliberate taps, and save the surrounding context rather than treating one estimate as a diagnosis."
    />
  );
}
