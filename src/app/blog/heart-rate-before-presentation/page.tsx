import type { Metadata } from "next";
import Link from "next/link";
import DeepGuidePage from "@/components/DeepGuidePage";
import { type Source } from "@/components/SourceList";

const TITLE = "Heart Rate Before a Presentation: A Calm Check-In for Speakers";
const DESCRIPTION =
  "Learn how to record heart rate before or after a presentation without turning a temporary stress response into a diagnosis, performance score or readiness test.";
const PATH = "/blog/heart-rate-before-presentation";

export const metadata: Metadata = {
  title: `${TITLE} | HeartRateTap`,
  description: DESCRIPTION,
  alternates: { canonical: `https://www.heartratetap.com${PATH}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `https://www.heartratetap.com${PATH}`, siteName: "HeartRateTap" }
};

const SOURCES: Source[] = [
  {
    name: "Stress and Heart Health",
    publisher: "American Heart Association",
    url: "https://www.heart.org/en/healthy-living/healthy-lifestyle/stress-management/stress-and-heart-health",
    note: "How a short-term stress response can temporarily speed heart rate and breathing."
  },
  {
    name: "All About Heart Rate",
    publisher: "American Heart Association",
    url: "https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse",
    note: "Factors that affect pulse and advice on symptoms that need professional or urgent attention."
  },
  {
    name: "Social Anxiety Disorder: More Than Just Shyness",
    publisher: "National Institute of Mental Health",
    url: "https://www.nimh.nih.gov/health/publications/social-anxiety-disorder-more-than-just-shyness",
    note: "General information about anxiety symptoms and when speaking with a health professional may help."
  }
];

export default function PresentationHeartRatePage() {
  return (
    <DeepGuidePage
      title={TITLE}
      description={DESCRIPTION}
      path={PATH}
      category="Speaking and workplace routines"
      readingTime="10 minute read"
      published="August 22, 2026"
      reviewed="August 22, 2026"
      datePublished="2026-08-22"
      dateModified="2026-08-22"
      intro={
        <>
          It is common to notice your pulse before a presentation, lesson, interview, audition or client pitch. A quick
          check can help you describe a moment, but it cannot measure confidence, predict performance or diagnose
          anxiety. This guide offers a low-pressure way for speakers and knowledge workers to record a comparable
          before-and-after observation while keeping the number in perspective.
        </>
      }
      sections={[
        {
          heading: "A presentation pulse is a situational observation",
          content: <>
            <p>Speaking in front of other people can feel exciting, important, uncomfortable or all three. The American Heart Association describes a short-term stress response in which adrenaline can temporarily speed heart rate and breathing. That is a description of a body response, not evidence that something is wrong or that a particular BPM predicts how well a talk will go.</p>
            <p>Arrival time, stairs, room temperature, rehearsal, coffee, a rushed commute, audience size and personal expectations can all change the moment. A reading taken while you are walking to the room is not a resting baseline, and a number after applause is not necessarily comparable with one after a quiet meeting. Label the situation before interpreting it.</p>
          </>
        },
        {
          heading: "Do not turn the number into a readiness test",
          content: <>
            <p>A manual pulse estimate cannot tell you whether you are prepared, whether you should cancel a presentation, or whether your nervousness is visible to an audience. It also cannot separate normal anticipation from a health condition. Waiting to reach a chosen number can become another source of pressure and may encourage repeated checking just when your attention belongs on your notes, your students or your audience.</p>
            <p>If you want to use a check-in, make it optional and limited: once before a planned quiet minute, and perhaps once several minutes after the event. The purpose is to notice context, not to control every beat. A good presentation routine is built from preparation, a clear plan and appropriate support—not a browser display.</p>
          </>
        },
        {
          heading: "Use a two-point speaking routine",
          content: <>
            <p>Choose the same two checkpoints for similar events. For example, you might sit quietly for three minutes before an internal presentation, then check again five minutes after it ends while seated in the same room. Note the kind of event, time of day, recent movement, caffeine, sleep note and whether you felt typical. Keep a separate category for a keynote, audition or high-stakes interview; it should not be compared directly with a routine team update.</p>
            <p>A concise entry could be: “Tuesday, 2:15 p.m.; 20-minute client demo; climbed two flights of stairs 10 minutes before; one coffee at noon; seated; 78 before, 75 after five-minute pause; felt nervous but able to speak.” It records what happened without saying that the talk caused a specific physiological change or that the result evaluated the talk.</p>
          </>
        },
        {
          heading: "Measure only when you can pause safely",
          content: <>
            <p>Do not try to find a pulse while presenting, driving to an event, managing a classroom, walking on stage or using equipment. Sit or stand still at a planned break. Place the pads of the index and middle fingers on the wrist, wait for a few clear beats and count for a full minute if you want a manual count. Use the same posture at both checkpoints whenever possible.</p>
            <p>You can also use the <Link href="/">tap-based BPM calculator</Link> after you have found a clear pulse. Tap once per felt beat and restart after a missed or extra tap. The tool averages your tap intervals; it does not sense your heart, read your stress level or tell you whether your response is appropriate. If the result surprises you and you feel well, rest briefly and repeat once under the same conditions.</p>
          </>
        },
        {
          heading: "Keep performance notes and health notes separate",
          content: <>
            <p>It can be useful to write “talk began on time” or “voice felt steady,” but do not treat a pulse as the explanation for those outcomes. Presentation quality depends on preparation, topic familiarity, audience interaction, audio setup and many other factors. A manager, teacher or coach should not use an employee&apos;s or student&apos;s pulse note to judge composure, effort, promotion or eligibility.</p>
            <p>For personal use, keep only the information that helps you compare similar situations: event type, conditions, method, first and repeat results, and symptoms if present. The <Link href="/blog/stress-resting-heart-rate">stress and resting heart-rate guide</Link> covers how to create a calm baseline on days that are not built around a speaking event. Keeping those logs separate avoids making a high-pressure moment look like a resting-health test.</p>
          </>
        },
        {
          heading: "Know what the check cannot diagnose",
          content: <>
            <p>A faster or slower number around a presentation cannot diagnose social anxiety, panic disorder, burnout, an irregular rhythm or a heart condition. The National Institute of Mental Health describes social anxiety as more than ordinary shyness and notes that professional support can help when fear or avoidance is persistent and disruptive. A pulse app cannot make that distinction, and one ordinary-looking BPM does not cancel difficult symptoms.</p>
            <p>Consider non-urgent professional advice if fear around speaking is repeatedly limiting work, school or relationships, or if a new pulse concern persists beyond the event. Bring the setting and symptoms in plain language. Do not attempt to use breathing exercises, caffeine changes or repeated measurements as a test of whether a concerning physical symptom is safe.</p>
          </>
        },
        {
          heading: "Urgent symptoms come first",
          content: <>
            <p>Stop relying on a self-check if the pulse feels persistently irregular, you cannot get a clear reading, or repeated comparable readings are very different. Ask a health professional about new changes or questions about medication. The useful contribution of a log is the date, conditions and symptom context—not an attempt to interpret the cause by yourself.</p>
            <p>Seek urgent local help for chest pain, shortness of breath, fainting, severe dizziness or another urgent symptom with a suddenly unusual heart rate. Do not wait until the presentation ends, repeat online taps, or decide that a professional obligation makes symptoms less important. A speaker&apos;s check-in is a wellness note, never emergency triage.</p>
          </>
        }
      ]}
      sources={SOURCES}
      ctaTitle="Keep the speaking moment in context"
      ctaText="Check only during a calm pause, record the event and conditions, and never treat one BPM estimate as a performance score."
    />
  );
}
