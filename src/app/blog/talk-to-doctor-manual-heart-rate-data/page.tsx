import type { Metadata } from "next";
import Link from "next/link";
import DeepGuidePage from "@/components/DeepGuidePage";
import { type Source } from "@/components/SourceList";

const TITLE = "How to Talk to Your Doctor About Manual Heart-Rate Measurements";
const DESCRIPTION =
  "Prepare a clear, useful summary of manual pulse checks for a health care visit: what to record, what to ask, and when symptoms require urgent care instead.";
const PATH = "/blog/talk-to-doctor-manual-heart-rate-data";

export const metadata: Metadata = {
  title: `${TITLE} | HeartRateTap`,
  description: DESCRIPTION,
  alternates: { canonical: `https://www.heartratetap.com${PATH}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `https://www.heartratetap.com${PATH}`, siteName: "HeartRateTap" }
};

const SOURCES: Source[] = [
  {
    name: "Talking With Your Doctor",
    publisher: "MedlinePlus, U.S. National Library of Medicine",
    url: "https://medlineplus.gov/talkingwithyourdoctor.html",
    note: "Preparing questions, recording symptoms, and making the most of a health care visit."
  },
  {
    name: "Make the Most of Your Doctor Visit",
    publisher: "MedlinePlus Medical Encyclopedia",
    url: "https://medlineplus.gov/ency/patientinstructions/000860.htm",
    note: "Practical appointment preparation, medication lists, and follow-up questions."
  },
  {
    name: "All About Heart Rate",
    publisher: "American Heart Association",
    url: "https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse",
    note: "Heart-rate context, logging guidance, and urgent symptom warnings."
  }
];

export default function TalkToDoctorHeartRatePage() {
  return (
    <DeepGuidePage
      title={TITLE}
      description={DESCRIPTION}
      path={PATH}
      category="Health-care conversations"
      readingTime="10 minute read"
      intro={
        <>Manual pulse checks can give a clinician useful context when they are described honestly: what you felt, when it happened, how you checked, and what symptoms were present. They do not establish a diagnosis. This guide helps you prepare a concise summary and recognize when an urgent symptom should take priority over preparing for an appointment.</>
      }
      sections={[
        {
          heading: "Treat the measurement as an observation",
          content: <>
            <p>A manual count or tap estimate reflects the beats you felt and the method you used at one moment. It does not show the heart&apos;s electrical activity, confirm a rhythm, or explain why the rate was different. A clinician may use your notes alongside medical history, a physical examination, medication review, vital signs, and testing. Presenting a manual result as an observation helps keep that distinction clear.</p>
            <p>Use plain language. “I noticed fluttering after dinner on three evenings and counted about 96 beats per minute while seated” is more useful than “I know I had an arrhythmia.” If you are unsure that you felt every beat, say so. Honest uncertainty is useful information; false precision can make a record less reliable.</p>
          </>
        },
        {
          heading: "Bring a short timeline, not a pile of numbers",
          content: <>
            <p>Choose the few entries that best show the issue: the first occurrence, a recent occurrence, and any repeated pattern. For each, include date and time, what you were doing before it began, position, measurement method, result or range, duration if known, and symptoms. Also note what made it better or worse if you know. MedlinePlus recommends writing down symptoms, including when they began and what affects them, before a visit.</p>
            <p>For example: “July 30, around 8 p.m.; sitting after dinner; felt fast fluttering for about 10 minutes; two 60-second wrist counts were 102 and 100; no chest pain, did feel lightheaded; had one coffee at 4 p.m.” This does not diagnose the episode, but it gives the clinician a clearer starting point than a screen capture alone.</p>
          </>
        },
        {
          heading: "Label how each number was collected",
          content: <>
            <p>Write whether the number came from a full-minute wrist count, a shorter timed count, a wearable, a blood-pressure device, or a tap estimate. Each method has different limits. Do not combine them into a single trend line without labels. If you changed phones, apps, routines, or devices, note when that change happened.</p>
            <p>When you use the <Link href="/">HeartRateTap manual BPM calculator</Link>, label the entry as a tap-based estimate. The site averages the intervals between the taps you make; it does not sense the pulse or identify an irregular rhythm. If you missed a beat or restarted, include that in the note. This lets a clinician judge how much weight to place on the observation.</p>
          </>
        },
        {
          heading: "Include the information that changes interpretation",
          content: <>
            <p>Bring an up-to-date list of prescription medicines, over-the-counter products, vitamins, supplements, and recent changes, as MedlinePlus advises. Also mention relevant activity, illness, fever, poor sleep, alcohol, caffeine, dehydration, pain, emotional stress, and recent travel when they overlap with the observation. These details do not necessarily cause a rate change, but they may shape the next question.</p>
            <p>Tell the clinician about your usual activity level, diagnosed conditions, and any monitoring instructions you already have. Do not stop, start, skip, or adjust medication based on a manual heart-rate log. If a medication has a prescribed pulse-monitoring plan, use that plan and bring the record it requests.</p>
          </>
        },
        {
          heading: "Prepare questions that invite a clear plan",
          content: <>
            <p>Write questions in advance so the visit is not spent trying to remember the numbers. Useful examples include: “Which symptoms should make me contact your office?” “Do you want me to check my pulse, and if so, when and how often?” “What details should I record?” “Would a particular device or test be more appropriate than manual checks?” and “Are any of my medicines relevant to this change?”</p>
            <p>Ask the clinician to repeat or write down the follow-up plan if it is complex. You can also ask whether a family member should help with the log or attend the appointment. The goal is not to persuade the clinician that an app is correct; it is to leave with an understandable next step and clear safety instructions that fit your situation.</p>
          </>
        },
        {
          heading: "Do not wait for an appointment during an emergency",
          content: <>
            <p>A planned discussion is not the right response to urgent symptoms. Seek local emergency help for chest pain, shortness of breath, fainting, severe dizziness, or another urgent symptom with a suddenly unusually high or low rate for you. Do not wait to obtain a better manual count, export a chart, or see whether a tap estimate settles down.</p>
            <p>For less urgent but new, persistent, worsening, or concerning symptoms, contact the appropriate health professional according to your care plan. Be ready to share the short timeline. A manual measurement can support that call, but it should never be used to rule out a problem because the number falls inside a broad online range.</p>
          </>
        },
        {
          heading: "Keep the follow-up record sustainable",
          content: <>
            <p>After the visit, follow the monitoring instructions you received rather than expanding the log on your own. If the plan is to check at a certain time, use the same position and method when possible. Record symptoms and contextual changes, and write down questions that arise. A small record completed consistently is easier to review than an exhaustive file of unrelated measurements.</p>
            <p>If you need a simple structure before an appointment, use the <Link href="/blog/build-personal-heart-rate-log">personal heart-rate log guide</Link>. Take the notes to the clinician, but keep the interpretation with them. HeartRateTap is a transparent timing aid and educational resource, not a medical device or a substitute for individualized care.</p>
          </>
        }
      ]}
      sources={SOURCES}
      ctaTitle="Prepare a clear observation"
      ctaText="Use a deliberate tap estimate only after finding a clear pulse, then save the time, method, context, and symptoms for the conversation that follows."
    />
  );
}
