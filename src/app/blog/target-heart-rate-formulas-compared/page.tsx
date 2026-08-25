import type { Metadata } from "next";
import Link from "next/link";
import DeepGuidePage from "@/components/DeepGuidePage";
import { type Source } from "@/components/SourceList";
import { buildSocialMetadata } from "@/lib/seo-metadata";

const TITLE = "Target Heart Rate Formulas Compared";
const DESCRIPTION =
  "Compare 220 minus age, the Tanaka equation and Karvonen heart rate reserve, see worked examples, and learn why target heart rate formulas can differ.";
const PATH = "/blog/target-heart-rate-formulas-compared";
const URL = `https://www.heartratetap.com${PATH}`;

export const metadata: Metadata = {
  title: `${TITLE} | HeartRateTap`,
  description: DESCRIPTION,
  alternates: {
    canonical: URL,
    languages: {
      en: URL,
      "x-default": URL
    }
  },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, url: URL })
};

const SOURCES: Source[] = [
  {
    name: "Target Heart Rates Chart",
    publisher: "American Heart Association",
    url: "https://www.heart.org/en/healthy-living/exercise-and-physical-activity/fitness-basics/target-heart-rates",
    note: "A public reference using 220 minus age and broad moderate and vigorous percentage ranges."
  },
  {
    name: "Age-predicted maximal heart rate revisited",
    publisher: "Journal of the American College of Cardiology via PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/11153730/",
    note: "The 2001 meta-analysis and laboratory validation that proposed 208 minus 0.7 times age for healthy adults."
  },
  {
    name: "The effects of training on heart rate; a longitudinal study",
    publisher: "Annales Medicinae Experimentalis et Biologiae Fenniae via PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/13470504/",
    note: "The 1957 Karvonen, Kentala and Mustala paper associated with the heart-rate-reserve approach."
  },
  {
    name: "Physical Activity Guidelines for Americans, 2nd edition",
    publisher: "U.S. Department of Health and Human Services",
    url: "https://health.gov/paguidelines/second-edition/pdf/Physical_Activity_Guidelines_2nd_edition.pdf",
    note: "Federal guidance on relative intensity, the talk test and gradual progression rather than dependence on one heart-rate number."
  }
];

export default function TargetHeartRateFormulasComparedPage() {
  return (
    <DeepGuidePage
      title={TITLE}
      description={DESCRIPTION}
      path={PATH}
      category="Exercise calculation literacy"
      readingTime="13 minute read"
      published="August 25, 2026"
      reviewed="August 25, 2026"
      datePublished="2026-08-25"
      dateModified="2026-08-25"
      intro={
        <>
          Target heart rate formulas can produce different BPM ranges because they do not all estimate the same thing.
          The familiar 220-minus-age and Tanaka equations estimate maximum heart rate, while the Karvonen method uses
          the span between resting and estimated maximum heart rate. Each result is a population-based planning
          reference, not a measured personal maximum or an exercise prescription.
        </>
      }
      sections={[
        {
          heading: "The three target heart rate formulas at a glance",
          content: <>
            <div className="blog-table-wrapper">
              <table>
                <thead><tr><th>Method</th><th>Formula</th><th>Required inputs</th></tr></thead>
                <tbody>
                  <tr><td>220 minus age</td><td>Estimated max HR = 220 − age</td><td>Age</td></tr>
                  <tr><td>Tanaka</td><td>Estimated max HR = 208 − (0.7 × age)</td><td>Age</td></tr>
                  <tr><td>Karvonen / heart rate reserve</td><td>Target = resting HR + intensity × (estimated max HR − resting HR)</td><td>Age-based maximum, resting HR and intensity</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              The first two rows are alternative ways to estimate a maximum from age. They do not create a target until
              the estimated maximum is multiplied by an intensity percentage. The third row starts with heart rate
              reserve, the difference between maximum and resting heart rate, and then adds the resting value back.
              That different starting point is why “70%” does not mean the same BPM in both methods.
            </p>
          </>
        },
        {
          heading: "How the 220-minus-age formula works",
          content: <>
            <p className="formula-block">Estimated maximum heart rate = 220 − age</p>
            <p>
              For a 60-year-old, the estimate is 160 BPM. A target based on 50% of estimated maximum is 80 BPM, and 70%
              is 112 BPM. The American Heart Association&apos;s public target-rate chart uses this accessible calculation
              and describes about 50–70% of maximum as a general moderate range and 70–85% as a general vigorous range.
              The organization also emphasizes that the figures are averages and general guidance.
            </p>
            <p>
              The method is popular because it needs only age and can be explained quickly. Simplicity is not the same
              as individual precision. Age does not reveal a person&apos;s measured maximum, medicine use, health history,
              exercise mode or response on a particular day. Treat 160 BPM in this example as the first assumption in
              a calculation, not a verified ceiling.
            </p>
          </>
        },
        {
          heading: "How the Tanaka maximum heart rate equation differs",
          content: <>
            <p className="formula-block">Estimated maximum heart rate = 208 − (0.7 × age)</p>
            <p>
              The 2001 <a href="https://pubmed.ncbi.nlm.nih.gov/11153730/" rel="noopener noreferrer">Tanaka study</a>
              combined group means from 351 studies covering 18,712 participants, then cross-validated the result in a
              laboratory study of 514 healthy adults. It reported 208 − 0.7 × age as a generalized prediction equation
              for maximum heart rate in healthy adults.
            </p>
            <p>
              At age 60, the Tanaka estimate is 208 − 42 = 166 BPM, six beats higher than the 220-minus-age estimate.
              Fifty percent is 83 BPM and 70% is about 116 BPM. The difference between formulas changes with age: at age
              40 they both happen to produce 180 BPM, while at other ages they separate. Agreement at one age does not
              prove either equation measured the individual using it.
            </p>
          </>
        },
        {
          heading: "How the Karvonen heart rate reserve formula works",
          content: <>
            <p className="formula-block">Target HR = resting HR + intensity × (estimated max HR − resting HR)</p>
            <p>
              Heart rate reserve is the span between resting heart rate and the selected maximum. For a 60-year-old
              using 220 minus age and a resting rate of 70 BPM, the reserve is 160 − 70 = 90 BPM. At 50% intensity, the
              target is 70 + (0.50 × 90) = 115 BPM. At 70%, it is 70 + (0.70 × 90) = 133 BPM.
            </p>
            <p>
              Compare that 115–133 BPM reserve-based range with the 80–112 BPM range created by taking 50–70% directly
              from the same 160 BPM maximum. The large difference is not a software error. Percent of maximum starts
              from zero; percent of reserve starts from resting heart rate after scaling the usable span. A result must
              therefore name both the intensity percentage and the method.
            </p>
          </>
        },
        {
          heading: "A worked comparison using one person",
          content: <>
            <p>
              Consider a hypothetical 60-year-old with a calm resting heart rate of 70 BPM. The table keeps age,
              resting input and selected 50–70% range unchanged so that the formula is the only moving part.
            </p>
            <div className="blog-table-wrapper">
              <table>
                <thead><tr><th>Calculation</th><th>Estimated maximum</th><th>50% result</th><th>70% result</th></tr></thead>
                <tbody>
                  <tr><td>220 − age, percent of maximum</td><td>160 BPM</td><td>80 BPM</td><td>112 BPM</td></tr>
                  <tr><td>Tanaka, percent of maximum</td><td>166 BPM</td><td>83 BPM</td><td>116 BPM</td></tr>
                  <tr><td>Karvonen using 220 − age</td><td>160 BPM</td><td>115 BPM</td><td>133 BPM</td></tr>
                  <tr><td>Karvonen using Tanaka</td><td>166 BPM</td><td>118 BPM</td><td>137 BPM</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              These are four formula outputs, not four competing diagnoses. The <Link href="/target-heart-rate-calculator">target heart rate calculator</Link>
              lets you change the percentage and compare percent-of-maximum with reserve-based arithmetic. Keep the
              formula visible when saving a result; an isolated “target 118” cannot be reconstructed without its inputs.
            </p>
          </>
        },
        {
          heading: "Why the same percentage does not mean the same effort",
          content: <>
            <p>
              Formula choice is one source of difference. Individual physiology is another. Two people of the same age
              can have different measured maximum and resting heart rates. Running, cycling and swimming may also
              produce different heart-rate responses. Heat, altitude, hydration, fatigue, recent activity and medicine
              can change the relationship between BPM and a familiar workload.
            </p>
            <p>
              Heart rate also lags behind rapid changes in work. During a short interval, pace or power can rise before
              BPM reaches a calculated range. Chasing the number by accelerating can overshoot the intended effort.
              During a longer steady session, heart rate may drift upward even when external work remains similar. Use
              breathing, perceived exertion, pace or power beside the formula instead of treating a boundary as a
              command.
            </p>
          </>
        },
        {
          heading: "Which target heart rate formula should you choose?",
          content: <>
            <p>
              Use the formula specified by a professional plan, exercise test, rehabilitation service or established
              training protocol. If you are using general public guidance, 220 minus age is transparent and matches the
              AHA chart cited here. Tanaka is another researched age-prediction equation. Heart rate reserve adds a
              resting measurement and may better reflect the available span, but it still inherits error from the
              estimated maximum and from the resting input.
            </p>
            <p>
              For personal comparison, consistency is usually more useful than switching equations whenever a result
              looks inconvenient. Record the equation, maximum estimate, resting value when used, intensity percentage,
              activity and how effort felt. Change methods only for a stated reason and do not splice boundaries from
              different methods into one range.
            </p>
          </>
        },
        {
          heading: "Measure resting heart rate carefully before using reserve",
          content: <>
            <p>
              The reserve method depends on a genuine resting input. Measure when calm, before exercise and under
              repeatable conditions. A value taken after walking to the gym, drinking coffee or completing a warm-up is
              not a resting heart rate. One measurement error shifts every reserve-based target calculated from it.
            </p>
            <p>
              Keep posture, time and method consistent, and repeat an unexpected result. A manual count, a wearable
              overnight estimate and a tap-based morning value come from different windows. Choose one defined input
              rather than selecting the lowest number available. If a professional has supplied a resting value or
              tested range, follow their instructions about which measurement belongs in the formula.
            </p>
          </>
        },
        {
          heading: "Know when population formulas are the wrong tool",
          content: <>
            <p>
              Beta blockers and other medicines can change heart-rate response. A heart condition, pregnancy,
              rehabilitation plan, autonomic disorder or clinician-defined limit may make a generic age equation
              inappropriate. A formula cannot provide exercise clearance, assess symptoms or replace a measured test
              ordered and interpreted for an individual.
            </p>
            <p>
              Ask a qualified professional what intensity method applies when you have relevant medical history, take
              heart-rate-affecting medicine or are returning after illness. Stop activity and seek urgent local help for
              chest pain, fainting, severe dizziness, unusual shortness of breath or another alarming symptom. Do not
              use a calculated zone to overrule how you feel or instructions you have been given.
            </p>
          </>
        },
        {
          heading: "Target heart rate formula questions",
          content: <>
            <h3>Is the Tanaka formula always more accurate than 220 minus age?</h3>
            <p>No. Tanaka was developed from large population data, but an age equation still predicts a group pattern rather than measuring an individual maximum.</p>
            <h3>Does Karvonen use my actual maximum heart rate?</h3>
            <p>Only if you enter a maximum measured under an appropriate protocol. When it uses an age-predicted maximum, the reserve calculation retains that prediction error.</p>
            <h3>Can two formulas both be correct?</h3>
            <p>They can both be calculated correctly while producing different reference values. Accuracy of arithmetic is separate from how closely an estimate represents one person.</p>
            <h3>Should I change formulas for each sport?</h3>
            <p>Do not transfer a range automatically. Exercise mode can affect measured response, so use a sport-specific plan or tested values when they are available.</p>
          </>
        }
      ]}
      sources={SOURCES}
      ctaTitle="Compare the formulas with their inputs visible"
      ctaText="Choose one method, preserve the maximum and resting assumptions, and use the result as a general exercise reference rather than a personal limit."
    />
  );
}
