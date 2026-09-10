import type { Metadata } from "next";
import Link from "next/link";
import DeepGuidePage from "@/components/DeepGuidePage";
import { type Source } from "@/components/SourceList";
import { buildSocialMetadata } from "@/lib/seo-metadata";

const TITLE = "Manual Heart-Rate Checks for Team Sports: A Practical Coach's Guide";
const DESCRIPTION =
  "Use manual pulse checks around team sports as a simple context note—not a clearance tool. Learn repeatable recovery checks, team boundaries, and better record keeping.";
const PATH = "/blog/manual-heart-rate-checks-team-sports";

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
    note: "Heart-rate influences, manual pulse basics, and symptoms that require urgent attention."
  },
  {
    name: "Physical Activity Basics",
    publisher: "Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/physical-activity-basics/about/index.html",
    note: "General physical-activity context and the value of building activity appropriately."
  }
];

export default function TeamSportsHeartRatePage() {
  return (
    <DeepGuidePage
      title={TITLE}
      description={DESCRIPTION}
      path={PATH}
      category="Team-sport routines"
      readingTime="10 minute read"
      intro={
        <>A manual pulse check can help a coach or athlete describe recovery conditions after a drill, but it cannot clear someone to play, diagnose a problem, or replace the team’s emergency and medical protocols. Use it as a simple, opt-in observation with consistent timing and strong boundaries around symptoms.</>
      }
      sections={[
        {
          heading: "Decide what a team pulse check is for",
          content: <>
            <p>Before adding any measurement to practice, define the use. A coach might want athletes to learn how hard activity feels, compare a familiar recovery routine, or keep a personal note after a conditioning block. Those goals are educational and contextual. They are not a screening program, a competition, or proof that an athlete is ready to return after illness, injury, or a concerning symptom.</p>
            <p>Do not make athletes disclose a number publicly or use it to punish effort. Rates differ between people and can change with heat, sleep, stress, hydration, medication, fitness, illness, and the session itself. A displayed BPM has no value without timing and context. Team staff should follow their organization’s safeguarding, medical, privacy, and emergency policies before collecting any health-related information.</p>
          </>
        },
        {
          heading: "Use one stable recovery checkpoint",
          content: <>
            <p>The simplest approach is to pick a repeatable moment after a defined drill: for example, after two minutes of quiet walking or seated rest following the same conditioning set. State the checkpoint before practice starts. “Check after the second recovery minute” is clearer than “check when you feel ready,” because the latter produces unrelated comparisons.</p>
            <p>Do not ask athletes to stop abruptly in an unsafe place, crowd around a phone, or check while dizzy, overheated, or still moving. Build water, shade, and a calm transition into the routine. In a team setting, the logistics and supervision are as important as the number. If the group cannot do the check safely and without disruption, skip it.</p>
          </>
        },
        {
          heading: "Teach the manual method before using an app",
          content: <>
            <p>Show athletes how to find the wrist pulse with the index and middle fingers, avoiding the thumb. They should feel several beats before counting and use light pressure. A full-minute count is a simple option when the group needs time to slow down. A short count is an estimate; missed or double-counted beats can have a larger effect when the window is brief.</p>
            <p>For athletes who elect to use it, the <Link href="/">tap-based BPM calculator</Link> can turn a sequence of deliberate taps into an interval estimate. It records the timing of taps, not a sensor reading. Ask each person to restart after a missed beat instead of guessing. Coaches should never interpret an irregular-feeling pulse from across the field or use the tool as a substitute for a qualified evaluation.</p>
          </>
        },
        {
          heading: "Record conditions, not just the estimate",
          content: <>
            <p>A useful personal note is short: session type, drill or duration, recovery interval, weather or indoor heat, perceived effort, and whether the athlete felt usual. “Repeated sprint drill; two-minute walk; warm day; felt normal” is more informative than “154.” If an athlete has an approved individual training plan, their own clinician or athletic-training guidance takes priority over a generic team sheet.</p>
            <p>Keep team records minimal and private. In many cases, the athlete can keep their own note rather than handing it to a coach. Do not build a medical file from informal checks or infer a diagnosis from a pattern. A trend can prompt a conversation, but it cannot identify the reason for the trend.</p>
          </>
        },
        {
          heading: "Keep recovery coaching separate from medical decisions",
          content: <>
            <p>It is reasonable to teach broad recovery habits such as a cooldown, fluids when appropriate, and reporting symptoms honestly. It is not appropriate to tell an athlete to continue because a manual count looks acceptable, or to remove them solely because it looks unfamiliar. Return-to-play, exertional illness, cardiac symptoms, concussion, and medication questions need the responsible qualified professional and the team’s established protocol.</p>
            <p>Encourage athletes to report new chest discomfort, unusual shortness of breath, fainting, severe dizziness, palpitations, or a feeling that something is wrong. The American Heart Association advises urgent action for a suddenly unusually high or low rate with concerning symptoms. In that moment, stop the activity and follow local emergency procedures; do not wait for a repeat count or a phone-based estimate.</p>
          </>
        },
        {
          heading: "Avoid common team-sport mistakes",
          content: <>
            <p>One mistake is comparing positions or people as though the same pulse means the same workload. Another is taking a reading at a different point after every drill. A third is asking someone who feels unwell to prove that they are okay by tapping. None of these practices creates reliable training data, and they can discourage honest symptom reporting.</p>
            <p>Also avoid turning the check into a leader-board. Athletes may hold their breath, rush the count, hide symptoms, or report a preferred value if a number becomes a judgment. Make opting out easy. The routine should help people learn a measurement skill and communicate context, not increase pressure.</p>
          </>
        },
        {
          heading: "Use the routine to improve conversations",
          content: <>
            <p>At the end of a few comparable sessions, ask process questions: Was the recovery checkpoint clear? Did athletes understand that a manual pulse is an estimate? Did anyone feel pressured to share? Would a perceived-effort scale or a simple training note serve the team better? These questions improve the routine without claiming that the team has created medical monitoring.</p>
            <p>For individual training context, the <Link href="/blog/heart-rate-zones-for-running">heart-rate zones for running guide</Link> explains the limits of broad exercise ranges. A team can benefit from consistent coaching language, but every athlete’s symptoms, health history, and clinical advice remain individual.</p>
          </>
        }
      ]}
      sources={SOURCES}
      ctaTitle="Practice the skill, not medical interpretation"
      ctaText="Use deliberate taps at a repeatable recovery point, record the session context, and follow team medical and emergency procedures whenever symptoms arise."
    />
  );
}
