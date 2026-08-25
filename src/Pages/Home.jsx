import Navbar from "../Reusable/Navbar/Navbar";

const creativeA = [
  18, 34, 48, 24, 56, 42, 64, 30, 46, 70, 38, 52, 28, 60, 44, 72, 36,
  58, 32, 50, 68, 40, 56, 26, 62, 46, 34, 54, 38, 64, 30, 44,
];

const creativeB = [
  22, 46, 68, 34, 76, 52, 84, 42, 72, 58, 88, 48, 78, 64, 92, 54, 82,
  60, 74, 48, 86, 56, 70, 44, 80, 62, 50, 76, 54, 84, 46, 68,
];

const distribution = [18, 24, 30, 38, 52, 68, 86, 100, 82, 64, 46, 32, 22];

const workflow = [
  {
    number: "01",
    title: "Define",
    description: "Describe the audience and campaign context.",
    color: "var(--primary)",
  },
  {
    number: "02",
    title: "Test",
    description: "Compare A/B creatives before launch.",
    color: "var(--accent)",
  },
  {
    number: "03",
    title: "Launch",
    description: "Take the strongest hypothesis to market.",
    color: "var(--warning)",
  },
  {
    number: "04",
    title: "Learn",
    description: "Calibrate the next prediction with reality.",
    color: "var(--primary)",
  },
];

const testingLoop = [
  {
    number: "01",
    title: "Create variants",
    description: "Build multiple hooks, offers, voices and calls to action.",
    color: "var(--warning)",
  },
  {
    number: "02",
    title: "Spend to test",
    description: "Buy real impressions before knowing which direction resonates.",
    color: "var(--accent)",
    active: true,
  },
  {
    number: "03",
    title: "Learn after launch",
    description: "Discover the weaker hypothesis after budget is already committed.",
    color: "var(--primary)",
  },
];

const unansweredQuestions = [
  "Does the hook earn attention?",
  "Is the offer understood?",
  "Will the audience remember the brand?",
  "Does the CTA feel convincing?",
  "Which variant deserves live traffic first?",
];

const trustSignals = [
  ["01", "Prediction, not promise"],
  ["02", "Uncertainty stays visible"],
  ["03", "Reality calibrates the model"],
];

const howSteps = [
  {
    number: "01",
    eyebrow: "Audience definition",
    title: "Describe who the campaign needs to reach.",
    description:
      "Combine demographic, behavioral and campaign context into a structured audience definition—not a collection of cartoon personas.",
    points: ["Audience composition", "Campaign objective", "Listening context"],
    note: "Creates the experiment population",
    type: "audience",
  },
  {
    number: "02",
    eyebrow: "Creative understanding",
    title: "Upload the variants you are deciding between.",
    description:
      "Audio 90 analyzes more than the transcript. It maps the hook, voice, pacing, offer, CTA, music and other attributes into a structured Creative Genome.",
    points: ["A/B audio variants", "Creative Genome", "Controlled comparison"],
    note: "Understands what changed inside the ad",
    type: "creative",
  },
  {
    number: "03",
    eyebrow: "Pre-market signal",
    title: "See the direction, reasons and disagreement.",
    description:
      "The synthetic panel returns a hypothesis about which direction appears stronger, why it leads and how much uncertainty remains before launch.",
    points: ["Preference distribution", "Recall and clarity", "Visible uncertainty"],
    note: "Synthetic estimate—not observed performance",
    type: "signal",
  },
  {
    number: "04",
    eyebrow: "Real-world calibration",
    title: "Launch the strongest test and teach the model.",
    description:
      "Upload actual campaign performance after launch. Audio 90 compares prediction with reality, measures the error and calibrates the next experiment.",
    points: ["Normalized campaign data", "Prediction versus reality", "Campaign model update"],
    note: "Every campaign makes the next one smarter",
    type: "calibration",
  },
];

const intentDistribution = [
  { rating: "1", label: "Very unlikely", value: 3, color: "var(--accent)" },
  { rating: "2", label: "Unlikely", value: 9, color: "var(--accent)" },
  { rating: "3", label: "Undecided", value: 29, color: "var(--warning)" },
  { rating: "4", label: "Likely", value: 43, color: "var(--primary)" },
  { rating: "5", label: "Very likely", value: 16, color: "var(--primary)" },
];

const uncertaintyPrinciples = [
  {
    number: "01",
    title: "Disagreement is information",
    description:
      "Segment splits and conflicting reactions stay visible instead of being averaged into a confident-looking answer.",
  },
  {
    number: "02",
    title: "Confidence is earned",
    description:
      "A prediction carries an explicit confidence level that can later be checked against actual campaign outcomes.",
  },
  {
    number: "03",
    title: "Evidence keeps its label",
    description:
      "Observations, associations, hypotheses and validated experiments are kept separate throughout the analysis.",
  },
];

const campaignComparison = [
  {
    label: "Creative direction",
    predicted: "Creative B",
    observed: "Creative B",
    result: "Aligned",
    color: "var(--success)",
  },
  {
    label: "Engagement lift",
    predicted: "+18.0%",
    observed: "+12.4%",
    result: "−5.6 pts",
    color: "var(--warning)",
  },
  {
    label: "Skip reduction",
    predicted: "−14.0%",
    observed: "−9.6%",
    result: "+4.4 pts",
    color: "var(--warning)",
  },
];

const learningLoop = [
  {
    number: "01",
    title: "Predict",
    description: "Record the hypothesis, distribution and confidence before launch.",
    color: "var(--primary)",
  },
  {
    number: "02",
    title: "Observe",
    description: "Normalize aggregated outcomes from the live campaign.",
    color: "var(--accent)",
  },
  {
    number: "03",
    title: "Measure error",
    description: "Compare direction, magnitude and confidence with reality.",
    color: "var(--warning)",
  },
  {
    number: "04",
    title: "Calibrate",
    description: "Update the next experiment without rewriting the evidence.",
    color: "var(--success)",
  },
];

const experimentInputs = [
  {
    type: "audience",
    label: "Target audience",
    title: "Mumbai · 18–30",
    detail: "Hinglish · Evening commute",
    color: "var(--primary)",
  },
  {
    type: "creative",
    label: "Creative variants",
    title: "Audio A / Audio B",
    detail: "Hook · Voice · Offer · CTA",
    color: "var(--warning)",
  },
  {
    type: "context",
    label: "Campaign context",
    title: "Spotify awareness",
    detail: "Food delivery · 30 seconds",
    color: "var(--accent)",
  },
];

const experimentOutputs = [
  {
    label: "Direction",
    title: "Creative B leads",
    detail: "Stronger pre-market hypothesis",
    value: "B",
    color: "var(--primary)",
  },
  {
    label: "Why it leads",
    title: "Value lands earlier",
    detail: "Clearer message and offer recall",
    value: "+",
    color: "var(--warning)",
  },
  {
    label: "Uncertainty",
    title: "Medium confidence",
    detail: "Audience disagreement remains visible",
    value: "67",
    color: "var(--accent)",
  },
];

function NodeIcon({ type }) {
  if (type === "audience") {
    return (
      <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 20 20">
        <circle cx="10" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4.5 16c.5-3 2.4-4.5 5.5-4.5s5 1.5 5.5 4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    );
  }

  if (type === "creative") {
    return (
      <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 20 20">
        <path d="M2.5 10h2l1.5-5 2.2 10 2.2-8 1.8 6 1.5-3h3.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6v4l2.8 1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="M3 8h10m-4-4 4 4-4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Waveform({ bars, color }) {
  return (
    <div aria-hidden="true" className="flex h-14 items-center gap-0.75 overflow-hidden">
      {bars.map((height, index) => (
        <span
          className="wave-bar w-0.75 shrink-0 rounded-full"
          key={`${height}-${index}`}
          style={{
            animationDelay: `${index * 38}ms`,
            animationDuration: `${1100 + (index % 6) * 130}ms`,
            backgroundColor: color,
            height: `${Math.max(10, height * 0.52)}px`,
            opacity: 0.55 + (index / bars.length) * 0.45,
          }}
        />
      ))}
    </div>
  );
}

function CreativeRow({ label, bars, color, duration }) {
  return (
    <div className="rounded-xl border border-border bg-bg/65 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {label}
          </p>
          <p className="mt-1 text-xs text-muted">Audio advertisement</p>
        </div>
        <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted">
          {duration}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-text"
        >
          <svg aria-hidden="true" className="ml-0.5 size-3" viewBox="0 0 12 12">
            <path d="M10 6 2.5 10V2L10 6Z" fill="currentColor" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <Waveform bars={bars} color={color} />
        </div>
      </div>
    </div>
  );
}

function HowVisual({ type }) {
  if (type === "audience") {
    return (
      <div aria-label="Audience definition example" className="how-visual rounded-2xl border border-border bg-surface p-5 shadow-xl shadow-black/6 sm:p-7">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-primary">Audience builder</p>
            <p className="mt-1 text-lg font-semibold">Late-night delivery · Mumbai</p>
          </div>
          <span className="rounded-full bg-primary/8 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-primary">
            Draft panel
          </span>
        </div>
        <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
          {[
            ["Age", "18–30"],
            ["Region", "Mumbai"],
            ["Language", "Hinglish"],
          ].map(([label, value]) => (
            <div className="rounded-xl bg-bg p-3.5" key={label}>
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">{label}</p>
              <p className="mt-2 text-sm font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-border bg-bg/70 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Panel composition</p>
            <p className="font-mono text-[9px] text-muted">Structured distribution</p>
          </div>
          <div className="mt-4 space-y-3">
            {[
              ["Existing customers", "42%", "42%", "var(--primary)"],
              ["Category aware", "35%", "35%", "var(--warning)"],
              ["New to category", "23%", "23%", "var(--accent)"],
            ].map(([label, value, width, color], index) => (
              <div key={label}>
                <div className="flex justify-between text-xs text-muted"><span>{label}</span><span>{value}</span></div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-light">
                  <span className="how-fill block h-full rounded-full" style={{ "--fill-delay": `${index * 120}ms`, backgroundColor: color, width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "creative") {
    return (
      <div aria-label="Creative comparison example" className="how-visual rounded-2xl border border-border bg-surface p-5 shadow-xl shadow-black/6 sm:p-7">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-primary">Creative Genome</p>
            <p className="mt-1 text-lg font-semibold">A/B audio comparison</p>
          </div>
          <span className="font-mono text-[9px] text-muted">2 files</span>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            ["Creative A", creativeA.slice(0, 20), "var(--warning)", "CTA @ 24s"],
            ["Creative B", creativeB.slice(0, 20), "var(--primary)", "CTA @ 17s"],
          ].map(([label, bars, color, detail]) => (
            <div className="rounded-xl border border-border bg-bg/70 p-4" key={label}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{label}</p>
                <span className="font-mono text-[8px] text-muted">0:30</span>
              </div>
              <Waveform bars={bars} color={color} />
              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">{detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Direct hook", "Warm voice", "Fast pacing", "Offer-led", "Music bed"].map((item) => (
            <span className="rounded-full border border-border bg-bg px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted" key={item}>{item}</span>
          ))}
        </div>
      </div>
    );
  }

  if (type === "signal") {
    return (
      <div aria-label="Pre-market signal example" className="how-visual rounded-2xl border border-border bg-surface p-5 shadow-xl shadow-black/6 sm:p-7">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-primary">Synthetic prediction</p>
            <p className="mt-2 text-2xl font-semibold">Creative B leads</p>
            <p className="mt-1 text-sm text-muted">Value is understood earlier</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-semibold text-primary">67%</p>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">Panel preference</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Message clarity", "+18%", "var(--primary)"],
            ["Offer recall", "+11%", "var(--warning)"],
            ["Skip likelihood", "−14%", "var(--accent)"],
          ].map(([label, value, color]) => (
            <div className="rounded-xl bg-bg p-4" key={label}>
              <span className="block size-2 rounded-full" style={{ backgroundColor: color }} />
              <p className="mt-4 text-xl font-semibold">{value}</p>
              <p className="mt-1 text-xs leading-5 text-muted">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-warning/30 bg-warning/6 px-4 py-3">
          <span className="text-sm text-muted">Prediction confidence</span>
          <span className="rounded-full border border-warning/35 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-warning">Medium</span>
        </div>
      </div>
    );
  }

  return (
    <div aria-label="Campaign calibration example" className="how-visual rounded-2xl border border-border bg-surface p-5 shadow-xl shadow-black/6 sm:p-7">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-primary">Learning event</p>
          <p className="mt-1 text-lg font-semibold">Prediction meets reality</p>
        </div>
        <span className="rounded-full bg-success/10 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-success">Correct direction</span>
      </div>
      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="rounded-xl bg-bg p-4">
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">Prediction</p>
          <p className="mt-3 text-xl font-semibold">B · 67%</p>
          <p className="mt-1 text-xs text-muted">Synthetic preference</p>
        </div>
        <ArrowIcon />
        <div className="rounded-xl bg-bg p-4">
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">Reality</p>
          <p className="mt-3 text-xl font-semibold text-success">B · +29.8%</p>
          <p className="mt-1 text-xs text-muted">Observed CTR lift</p>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-primary/25 bg-primary/6 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-primary">Campaign model</p>
            <p className="mt-1 text-sm font-medium">Intent signal recalibrated</p>
          </div>
          <span className="font-mono text-xs font-semibold text-primary">v3 → v4</span>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-bg text-text" id="top">
      <Navbar />
      <main id="main-content">
        <section className="relative isolate overflow-hidden" id="product">
          <div
            aria-hidden="true"
            className="motion-grid absolute inset-0 -z-20 opacity-35"
            style={{
              backgroundImage:
                "linear-gradient(color-mix(in srgb, var(--border) 38%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--border) 38%, transparent) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage:
                "linear-gradient(to bottom, black 0%, black 68%, transparent 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="motion-glow absolute left-1/2 top-8 -z-10 h-120 w-190 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--warning) 0%, transparent 62%)",
            }}
          />

          <div className="mx-auto max-w-360 px-5 pb-20 pt-20 sm:px-8 sm:pt-24 lg:px-12 lg:pb-28 lg:pt-30">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
              <div className="lg:col-span-7">
                <p
                  className="motion-reveal font-mono text-xs font-medium uppercase tracking-[0.26em] text-primary sm:text-sm"
                  style={{ "--delay": "80ms" }}
                >
                  Synthetic audience intelligence
                </p>
                <h1
                  className="motion-reveal mt-6 max-w-210 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl xl:text-[5rem]"
                  style={{ "--delay": "150ms" }}
                >
                  Know what might work before you spend to find out.
                </h1>
              </div>

              <div className="lg:col-span-5">
                <div
                  className="motion-reveal border-l-2 border-primary pl-5 sm:pl-7"
                  style={{ "--delay": "240ms" }}
                >
                  <p className="max-w-145 text-base leading-7 text-muted sm:text-lg sm:leading-8">
                    Test creative direction against synthetic audiences before launch,
                    then calibrate every prediction with real campaign results.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a
                      className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-lg bg-primary px-6 text-sm font-semibold text-on-primary shadow-[0_0_0_0_var(--primary)] transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_10px_35px_-12px_var(--primary)]"
                      href="#beta"
                    >
                      Join the Beta
                      <ArrowIcon />
                    </a>
                    <a
                      className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-lg border border-border bg-surface/75 px-6 text-sm font-semibold text-text transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-surface"
                      href="#how-it-works"
                    >
                      See how it works
                      <ArrowIcon />
                    </a>
                  </div>
                </div>

                <div
                  className="motion-reveal mt-8 rounded-2xl border border-border bg-surface/80 p-5 shadow-lg shadow-black/5 backdrop-blur sm:p-6"
                  style={{ "--delay": "360ms" }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                      Responsible by design
                    </p>
                    <span className="rounded-full bg-primary/8 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-primary">
                      Calibrated
                    </span>
                  </div>
                  <div className="mt-4 divide-y divide-border">
                    {trustSignals.map(([number, label]) => (
                      <div className="flex items-center gap-4 py-3 first:pt-0 last:pb-0" key={number}>
                        <span className="font-mono text-[9px] text-primary">{number}</span>
                        <span className="text-sm font-medium text-text">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto mt-18 max-w-330">
              <div
                aria-hidden="true"
                className="absolute -inset-5 -z-10 rounded-[2rem] opacity-25 blur-2xl"
                style={{
                  background:
                    "linear-gradient(110deg, var(--primary), transparent 38%, var(--accent))",
                }}
              />

              <div
                aria-label="Audio 90 synthetic audience experiment preview"
                className="mockup-shell motion-panel overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/12"
              >
                <div className="flex min-h-14 items-center justify-between border-b border-border px-4 sm:px-6">
                  <div aria-hidden="true" className="flex gap-2">
                    <span className="size-2.5 rounded-full bg-accent" />
                    <span className="size-2.5 rounded-full bg-warning" />
                    <span className="size-2.5 rounded-full bg-primary/70" />
                  </div>
                  <div className="flex self-stretch font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:text-xs">
                    <span className="flex items-center border-b-2 border-primary px-3 text-primary sm:px-5">
                      Experiment
                    </span>
                    <span className="hidden items-center px-3 sm:flex sm:px-5">Results</span>
                    <span className="hidden items-center px-3 sm:flex sm:px-5">Calibration</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted">A90-024</span>
                </div>

                <div className="grid gap-px bg-border lg:grid-cols-12">
                  <div className="bg-surface p-4 sm:p-6 lg:col-span-4">
                    <div className="mb-5 flex items-end justify-between">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                          Creative test
                        </p>
                        <h2 className="mt-1 text-lg font-semibold">A/B audio variants</h2>
                      </div>
                      <span className="rounded-full bg-surface-light px-2.5 py-1 font-mono text-[10px] text-muted">
                        Spotify
                      </span>
                    </div>
                    <div className="space-y-3">
                      <CreativeRow
                        bars={creativeA}
                        color="var(--warning)"
                        duration="0:30"
                        label="Creative A"
                      />
                      <CreativeRow
                        bars={creativeB}
                        color="var(--primary)"
                        duration="0:28"
                        label="Creative B"
                      />
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                      <span className="rounded-lg border border-border px-2 py-2 text-center">Hook</span>
                      <span className="rounded-lg border border-border px-2 py-2 text-center">Voice</span>
                      <span className="rounded-lg border border-border px-2 py-2 text-center">CTA</span>
                    </div>
                  </div>

                  <div className="bg-surface p-4 sm:p-6 lg:col-span-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                          Synthetic prediction
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold">
                          Creative B leads
                        </h2>
                      </div>
                      <span className="rounded-full border border-warning/45 bg-warning/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-warning">
                        Medium confidence
                      </span>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-border bg-bg/65 p-4">
                        <div className="flex items-end justify-between">
                          <p className="text-sm font-medium">Preference distribution</p>
                          <p className="text-3xl font-semibold text-primary">67%</p>
                        </div>
                        <div className="mt-6 flex h-24 items-end justify-center gap-1.5">
                          {distribution.map((height, index) => (
                            <span
                              className="distribution-bar w-2 rounded-t-sm"
                              key={`${height}-${index}`}
                              style={{
                                animationDelay: `${620 + index * 45}ms`,
                                backgroundColor:
                                  index < 6 ? "var(--warning)" : "var(--primary)",
                                height: `${height}%`,
                                opacity: 0.42 + Math.abs(6 - index) * 0.04,
                                transformOrigin: "bottom",
                              }}
                            />
                          ))}
                        </div>
                        <div className="mt-3 flex justify-between font-mono text-[9px] uppercase text-muted">
                          <span>More likely A</span>
                          <span>More likely B</span>
                        </div>
                      </div>

                      <div className="rounded-xl border border-border bg-bg/65 p-4">
                        <p className="text-sm font-medium">Synthetic audience</p>
                        <div className="mt-5 grid grid-cols-8 gap-2">
                          {Array.from({ length: 48 }, (_, index) => (
                            <span
                              className="audience-dot aspect-square rounded-full"
                              key={index}
                              style={{
                                animationDelay: `${700 + index * 24}ms`,
                                backgroundColor:
                                  index % 7 === 0
                                    ? "var(--accent)"
                                    : index < 31
                                      ? "var(--primary)"
                                      : "var(--surface-light)",
                                opacity: index < 31 ? 0.9 : 0.72,
                              }}
                            />
                          ))}
                        </div>
                        <div className="mt-5 flex items-center justify-between text-xs text-muted">
                          <span>12,540 profiles</span>
                          <span>Mumbai · 18–30</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 rounded-xl border border-border bg-bg/65 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm font-medium">Why B leads</p>
                        <span className="font-mono text-[10px] text-primary">+18% clarity</span>
                      </div>
                      <p className="text-sm leading-6 text-muted">
                        Listeners understand the product value earlier and reach the
                        offer with less message ambiguity.
                      </p>
                    </div>
                  </div>

                  <div className="bg-surface p-4 sm:p-6 lg:col-span-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      Confidence summary
                    </p>
                    <div className="mt-6 flex justify-center">
                      <div
                        className="confidence-ring grid size-36 place-items-center rounded-full"
                        style={{
                          background:
                            "conic-gradient(var(--primary) 0 67%, var(--surface-light) 67% 100%)",
                        }}
                      >
                        <div className="grid size-27 place-items-center rounded-full bg-surface text-center">
                          <div>
                            <p className="text-4xl font-semibold">67%</p>
                            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                              panel preference
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {[
                        ["Message clarity", "78", "var(--primary)"],
                        ["Offer recall", "71", "var(--warning)"],
                        ["Skip likelihood", "32", "var(--accent)"],
                      ].map(([label, value, color], index) => (
                        <div className="rounded-lg border border-border bg-bg/65 p-3" key={label}>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted">{label}</span>
                            <span className="font-mono">{value}%</span>
                          </div>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-light">
                            <span
                              className="metric-bar block h-full rounded-full"
                              style={{
                                animationDelay: `${920 + index * 120}ms`,
                                backgroundColor: color,
                                width: `${value}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="mt-5 rounded-lg border border-warning/35 bg-warning/8 px-3 py-3 text-xs leading-5 text-muted">
                      Synthetic estimate — validate through a real campaign test.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-border bg-bg/75 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                    <span>Model · A90-SYNTH-1.2</span>
                    <span>Panel · 12,540</span>
                    <span>Updated · 2 min ago</span>
                  </div>
                  <span className="group inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-semibold">
                    View full report
                    <ArrowIcon />
                  </span>
                </div>
              </div>
            </div>

            <div
              className="mx-auto mt-5 grid max-w-330 overflow-hidden rounded-2xl border border-border bg-surface sm:grid-cols-2 lg:grid-cols-4"
              id="workflow-overview"
            >
              {workflow.map((item, index) => (
                <div
                  className="motion-reveal workflow-card relative flex min-h-35 gap-4 border-border p-5 not-last:border-b sm:nth-[2]:border-b-0 sm:nth-[odd]:border-r lg:not-last:border-b-0 lg:not-last:border-r"
                  key={item.number}
                  style={{ "--delay": `${720 + index * 90}ms` }}
                >
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-full border font-mono text-xs"
                    style={{ borderColor: item.color, color: item.color }}
                  >
                    {item.number}
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color: item.color }}>
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
                  </div>
                  {index < workflow.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-2 top-1/2 z-10 hidden size-4 -translate-y-1/2 rounded-full border border-border bg-bg lg:block"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative isolate overflow-hidden border-y border-border bg-surface"
          id="problem"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 opacity-45"
            style={{
              backgroundImage:
                "linear-gradient(color-mix(in srgb, var(--border) 30%, transparent) 1px, transparent 1px)",
              backgroundSize: "100% 88px",
              maskImage:
                "linear-gradient(90deg, transparent, black 18%, black 82%, transparent)",
            }}
          />
          <div
            aria-hidden="true"
            className="problem-orbit absolute -right-48 top-10 -z-10 size-140 rounded-full border border-primary/15 sm:-right-30"
          />

          <div className="mx-auto max-w-360 px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
            <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-10">
              <div className="scroll-reveal lg:col-span-7">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.26em] text-accent">
                  The cost of learning
                </p>
                <h2 className="mt-6 max-w-215 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-balance sm:text-5xl lg:text-6xl">
                  You&apos;re spending real money to learn which creative doesn&apos;t work.
                </h2>
              </div>
              <div className="scroll-reveal lg:col-span-5 lg:pb-1">
                <p className="max-w-145 text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  Most creative experiments begin only after the media buy. The
                  campaign becomes the research panel, and every weak hypothesis
                  is paid for with real impressions.
                </p>
              </div>
            </div>

            <div className="mt-16 grid overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl shadow-black/10 lg:grid-cols-12">
              <div className="relative border-b border-border p-5 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r lg:p-10">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      Traditional testing loop
                    </p>
                    <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
                      Insight arrives after investment
                    </h3>
                  </div>
                  <span className="hidden rounded-full border border-accent/35 bg-accent/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent sm:block">
                    Live media
                  </span>
                </div>

                <div className="relative mt-9 grid gap-3 md:grid-cols-3">
                  <div
                    aria-hidden="true"
                    className="problem-track absolute left-[15%] right-[15%] top-9 hidden h-px bg-border md:block"
                  >
                    <span className="problem-signal absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_18px_var(--accent)]" />
                  </div>
                  {testingLoop.map((step, index) => (
                    <article
                      className={`problem-step relative rounded-xl border p-5 ${
                        step.active
                          ? "border-accent/45 bg-accent/8"
                          : "border-border bg-surface"
                      }`}
                      key={step.number}
                      style={{ "--step-delay": `${index * 140}ms` }}
                    >
                      <div className="relative z-10 flex items-center justify-between">
                        <span
                          className="grid size-11 place-items-center rounded-full border bg-bg font-mono text-xs"
                          style={{ borderColor: step.color, color: step.color }}
                        >
                          {step.number}
                        </span>
                      </div>
                      <h4 className="relative z-10 mt-8 text-base font-semibold">
                        {step.title}
                      </h4>
                      <p className="relative z-10 mt-2 text-sm leading-6 text-muted">
                        {step.description}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="mt-4 flex flex-col gap-3 rounded-xl border border-warning/25 bg-warning/6 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-warning">
                    Budget status
                  </span>
                  <span className="text-sm text-muted">
                    Committed before the first useful creative signal
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-8 lg:col-span-5 lg:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  Still unanswered before launch
                </p>
                <div className="mt-6 space-y-2.5">
                  {unansweredQuestions.map((question, index) => (
                    <div
                      className="question-row group flex items-center gap-4 rounded-xl border border-border bg-surface px-4 py-4 transition-colors duration-300 hover:border-primary/35"
                      key={question}
                      style={{ "--question-delay": `${index * 80}ms` }}
                    >
                      <span className="font-mono text-[10px] text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="flex-1 text-sm font-medium sm:text-base">{question}</p>
                      <span className="grid size-7 place-items-center rounded-full border border-border font-mono text-xs text-muted transition-colors duration-300 group-hover:border-primary/40 group-hover:text-primary">
                        ?
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="scroll-reveal mt-8 flex flex-col gap-5 rounded-2xl border border-primary/25 bg-primary/6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="flex items-start gap-4">
                <span className="mt-1 size-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_18px_var(--primary)]" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                    A better place to begin
                  </p>
                  <p className="mt-2 max-w-205 text-lg font-medium leading-7 sm:text-xl">
                    Audio 90 moves part of creative learning before launch, so live
                    media validates stronger hypotheses instead of discovering them.
                  </p>
                </div>
              </div>
              <span className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/8 px-4 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                Next · Pre-market signal
              </span>
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-bg" id="solution">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-20 h-130 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at 50% 10%, color-mix(in srgb, var(--primary) 30%, transparent), transparent 62%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-30 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(color-mix(in srgb, var(--border) 36%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--border) 36%, transparent) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            }}
          />

          <div className="mx-auto max-w-360 px-5 py-24 sm:px-8 sm:py-30 lg:px-10 lg:py-36 2xl:px-12">
            <div className="mx-auto max-w-225 text-center scroll-reveal">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.26em] text-primary">
                The pre-market layer
              </p>
              <h2 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-balance sm:text-5xl lg:text-6xl">
                Move the first round of learning before the media buy.
              </h2>
              <p className="mx-auto mt-6 max-w-180 text-base leading-7 text-muted sm:text-lg sm:leading-8">
                Audio 90 connects what you know about the audience, creative and
                campaign context to a controlled synthetic experiment—then returns
                a direction, the reasons behind it and honest uncertainty.
              </p>
            </div>

            <div className="solution-map relative mx-auto mt-18 max-w-300 xl:min-h-155">
              <div
                aria-hidden="true"
                className="solution-halo absolute left-1/2 top-1/2 hidden h-120 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full xl:block"
              />

              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden size-full xl:block"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1200 620"
              >
                {[
                  "M250 206 C320 206 320 260 370 280",
                  "M250 326 C320 326 330 326 370 326",
                  "M250 446 C320 446 320 390 370 372",
                  "M830 280 C880 260 880 206 950 206",
                  "M830 326 C870 326 880 326 950 326",
                  "M830 372 C880 390 880 446 950 446",
                ].map((path, index) => (
                  <g key={path}>
                    <path className="connector-base" d={path} />
                    <path
                      className="connector-flow"
                      d={path}
                      style={{ "--connector-delay": `${index * -520}ms` }}
                    />
                  </g>
                ))}
              </svg>

              <div className="relative grid gap-10 xl:min-h-155 xl:grid-cols-[250px_minmax(460px,1fr)_250px] xl:items-center xl:gap-25">
                <div className="solution-column relative space-y-5">
                  <p className="px-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    01 · Inputs
                  </p>
                  {experimentInputs.map((item, index) => (
                    <article
                      className="solution-node input-node group relative flex min-h-25 items-center gap-3 rounded-2xl border border-border/85 bg-surface/80 p-3.5 shadow-lg shadow-black/20 backdrop-blur transition-[border-color,transform,background-color] duration-300 hover:-translate-y-1 hover:border-primary/35 hover:bg-surface-light/75"
                      key={item.label}
                      style={{ "--node-delay": `${index * 100}ms` }}
                    >
                      <span
                        className="grid size-10 shrink-0 place-items-center rounded-xl border bg-bg"
                        style={{ borderColor: item.color, color: item.color }}
                      >
                        <NodeIcon type={item.type} />
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted">
                          {item.label}
                        </p>
                        <h3 className="mt-1 text-sm font-semibold">{item.title}</h3>
                        <p className="mt-1 truncate text-[11px] text-muted">{item.detail}</p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="connector-port absolute -right-1.5 top-1/2 hidden size-3 -translate-y-1/2 rounded-full border-2 border-bg xl:block"
                        style={{ backgroundColor: item.color }}
                      />
                    </article>
                  ))}
                </div>

                <div className="lab-core relative z-10 mx-auto w-full max-w-115 overflow-hidden rounded-[1.75rem] border border-primary/40 bg-surface shadow-[0_32px_100px_-44px_var(--primary)]">
                  <div className="h-px bg-linear-to-r from-transparent via-primary to-transparent" />
                  <div className="p-5 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <span className="lab-mark grid size-12 place-items-center rounded-2xl border border-primary/35 bg-primary/8 text-primary">
                          <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
                            <path d="M4 12h2.2l1.5-5 2.1 10 2.4-12 2.2 13 1.7-8 1.5 4H20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                          </svg>
                        </span>
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
                            Audio 90 engine
                          </p>
                          <h3 className="mt-1 text-xl font-semibold sm:text-2xl">
                            Synthetic Audience Lab
                          </h3>
                        </div>
                      </div>
                      <span className="mt-1 flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-primary">
                        <span className="lab-status size-1.5 rounded-full bg-primary" />
                        Live
                      </span>
                    </div>

                    <div className="my-6 h-px bg-border" />

                    <div className="space-y-2">
                      {[
                        ["01", "Creative understanding", "Genome"],
                        ["02", "Audience simulation", "Panel"],
                        ["03", "Response modelling", "Signal"],
                      ].map(([number, label, value], index) => (
                        <div
                          className="lab-stage flex items-center gap-3 rounded-xl bg-bg/70 px-3.5 py-3"
                          key={number}
                          style={{ "--stage-delay": `${index * 170}ms` }}
                        >
                          <span className="font-mono text-[9px] text-primary">{number}</span>
                          <span className="h-px w-4 bg-border" />
                          <span className="min-w-0 flex-1 text-xs text-muted sm:text-sm">{label}</span>
                          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-text">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-2xl bg-bg/80 p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                          Synthetic panel
                        </p>
                        <p className="flex items-center gap-2 font-mono text-[8px] text-primary">
                          <span className="size-1.5 rounded-full bg-primary" />
                          Comparing A/B
                        </p>
                      </div>
                      <div className="mt-4 grid grid-cols-12 gap-2">
                        {Array.from({ length: 36 }, (_, index) => (
                          <span
                            className="lab-person aspect-square rounded-full bg-primary"
                            key={index}
                            style={{
                              "--person-delay": `${index * 55}ms`,
                              opacity:
                                index % 8 === 0 ? 0.25 : index % 5 === 0 ? 0.48 : 0.88,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-center gap-2 text-center font-mono text-[8px] uppercase tracking-[0.15em] text-muted">
                      <span className="size-1.5 rounded-full bg-warning" />
                      Estimate, not ground truth
                    </div>
                  </div>
                </div>

                <div className="solution-column relative space-y-5">
                  <p className="px-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    02 · Signal
                  </p>
                  {experimentOutputs.map((item, index) => (
                    <article
                      className="solution-node output-node group relative flex min-h-25 items-center gap-3 rounded-2xl border border-border/85 bg-surface/80 p-3.5 shadow-lg shadow-black/20 backdrop-blur transition-[border-color,transform,background-color] duration-300 hover:-translate-y-1 hover:border-primary/35 hover:bg-surface-light/75"
                      key={item.label}
                      style={{ "--node-delay": `${index * 100}ms` }}
                    >
                      <span
                        aria-hidden="true"
                        className="connector-port absolute -left-1.5 top-1/2 hidden size-3 -translate-y-1/2 rounded-full border-2 border-bg xl:block"
                        style={{ backgroundColor: item.color }}
                      />
                      <span
                        className="grid size-10 shrink-0 place-items-center rounded-xl border bg-bg font-mono text-xs font-semibold"
                        style={{ borderColor: item.color, color: item.color }}
                      >
                        {item.value}
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted">
                          {item.label}
                        </p>
                        <h3 className="mt-1 text-sm font-semibold">{item.title}</h3>
                        <p className="mt-1 text-[11px] leading-4 text-muted">{item.detail}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="scroll-reveal mx-auto mt-12 flex max-w-210 items-center gap-4 text-center">
              <span className="h-px flex-1 bg-linear-to-r from-transparent to-warning/50" />
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-warning">
                  Then reality closes the loop
                </p>
                <p className="mt-2 text-sm text-muted">
                  Launch the strongest hypothesis and return the real campaign result.
                </p>
              </div>
              <span className="h-px flex-1 bg-linear-to-l from-transparent to-warning/50" />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-border bg-surface" id="how-it-works">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-120 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at 18% 0%, color-mix(in srgb, var(--warning) 18%, transparent), transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-360 px-5 py-24 sm:px-8 sm:py-30 lg:px-12 lg:py-36">
            <div className="grid gap-10 border-b border-border pb-14 lg:grid-cols-12 lg:items-end">
              <div className="scroll-reveal lg:col-span-7">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.26em] text-primary">
                  How it works
                </p>
                <h2 className="mt-6 max-w-205 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-balance sm:text-5xl lg:text-6xl">
                  From an idea to a smarter next experiment.
                </h2>
              </div>
              <div className="scroll-reveal lg:col-span-5">
                <p className="max-w-145 text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  Audio 90 adds a measurable learning layer before and after launch.
                  Synthetic feedback shapes the hypothesis; real campaign behavior
                  remains the source of truth.
                </p>
                <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.17em] text-muted">
                  Define · Compare · Predict · Calibrate
                </p>
              </div>
            </div>

            <div className="divide-y divide-border">
              {howSteps.map((step, index) => (
                <article
                  className="how-step grid gap-10 py-16 first:pt-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-18"
                  key={step.number}
                >
                  <div className={`order-2 scroll-reveal lg:col-span-7 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
                    <HowVisual type={step.type} />
                  </div>

                  <div className={`order-1 scroll-reveal lg:col-span-5 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="flex items-center gap-4">
                      <span className="grid size-11 place-items-center rounded-full border border-primary/40 font-mono text-[10px] text-primary">
                        {step.number}
                      </span>
                      <p className="font-mono text-[10px] uppercase tracking-[0.19em] text-primary">
                        {step.eyebrow}
                      </p>
                    </div>
                    <h3 className="mt-7 text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-balance sm:text-4xl">
                      {step.title}
                    </h3>
                    <p className="mt-5 text-base leading-7 text-muted">
                      {step.description}
                    </p>
                    <div className="mt-7 space-y-3">
                      {step.points.map((point) => (
                        <div className="flex items-center gap-3" key={point}>
                          <span className="grid size-5 place-items-center rounded-full bg-primary/10 text-primary">
                            <svg aria-hidden="true" className="size-3" fill="none" viewBox="0 0 12 12">
                              <path d="m3 6 2 2 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            </svg>
                          </span>
                          <span className="text-sm font-medium">{point}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 border-l-2 border-warning pl-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
                        {step.note}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden border-t border-border bg-bg" id="research">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(color-mix(in srgb, var(--border) 40%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--border) 40%, transparent) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage:
                "linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute -right-50 top-10 -z-10 size-150 rounded-full opacity-18 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--accent), transparent 65%)" }}
          />

          <div className="mx-auto max-w-360 px-5 py-24 sm:px-8 sm:py-30 lg:px-12 lg:py-36">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-18">
              <div className="scroll-reveal lg:col-span-7">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.26em] text-primary">
                  Synthetic Audience Lab
                </p>
                <h2 className="mt-6 max-w-210 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-balance sm:text-5xl lg:text-6xl">
                  We model distributions, not fake certainty.
                </h2>
              </div>
              <div className="scroll-reveal lg:col-span-5">
                <p className="max-w-145 text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  A single AI score hides how people disagree. Audio 90 keeps the
                  response distribution visible, preserves natural-language context
                  and labels every estimate for what it is.
                </p>
                <div className="mt-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                  <span className="size-2 rounded-full bg-warning" />
                  Illustrative synthetic output
                </div>
              </div>
            </div>

            <div className="research-workbench mt-16 overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-2xl shadow-black/8 lg:grid lg:grid-cols-12">
              <div className="relative overflow-hidden bg-primary p-6 text-on-primary sm:p-8 lg:col-span-5 lg:p-10">
                <div
                  aria-hidden="true"
                  className="absolute -left-24 -top-24 size-70 rounded-full border border-on-primary/15"
                />
                <div
                  aria-hidden="true"
                  className="absolute -left-12 -top-12 size-48 rounded-full border border-dashed border-on-primary/20"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-on-primary/65">
                      Synthetic participant · P-041
                    </p>
                    <h3 className="mt-2 text-xl font-semibold">Natural-language reaction</h3>
                  </div>
                  <span className="rounded-full border border-on-primary/20 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-on-primary/75">
                    Elicited
                  </span>
                </div>

                <div className="relative mt-8 rounded-2xl border border-on-primary/20 bg-on-primary/7 p-5 sm:p-6">
                  <span className="text-4xl leading-none text-on-primary/35">“</span>
                  <blockquote className="-mt-2 text-xl leading-8 tracking-[-0.02em] sm:text-2xl sm:leading-9">
                    I might try it because the offer sounds useful, but I would need a
                    clearer price reason before switching.
                  </blockquote>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {["Offer understood", "Moderate intent", "Price objection"].map((item) => (
                      <span className="rounded-full border border-on-primary/18 bg-on-primary/8 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-on-primary/75" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-on-primary/15 p-4">
                    <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-on-primary/55">Audience</p>
                    <p className="mt-2 text-sm font-medium">Mumbai · 18–30</p>
                  </div>
                  <div className="rounded-xl border border-on-primary/15 p-4">
                    <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-on-primary/55">Question</p>
                    <p className="mt-2 text-sm font-medium">Purchase intent</p>
                  </div>
                </div>

                <p className="relative mt-8 border-l border-on-primary/35 pl-4 text-sm leading-6 text-on-primary/68">
                  Participants answer naturally before the system maps meaning to an
                  ordered response distribution.
                </p>
              </div>

              <div className="p-6 sm:p-8 lg:col-span-7 lg:p-10">
                <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
                      Semantic Similarity Rating
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">Purchase intent distribution</h3>
                  </div>
                  <span className="self-start rounded-full bg-surface-light px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                    SSR · illustrative
                  </span>
                </div>

                <div className="mt-7 grid grid-cols-3 gap-2 text-center sm:gap-3">
                  {[
                    ["01", "Ask naturally"],
                    ["02", "Map meaning"],
                    ["03", "Keep uncertainty"],
                  ].map(([number, label]) => (
                    <div className="rounded-xl bg-bg px-2 py-3 sm:px-4" key={number}>
                      <p className="font-mono text-[8px] text-primary">{number}</p>
                      <p className="mt-1 text-[10px] font-medium sm:text-xs">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-border bg-bg/60 p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Probability mass by response</p>
                    <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">n = synthetic panel</p>
                  </div>

                  <div className="mt-8 flex h-58 items-end justify-between gap-2 sm:gap-4">
                    {intentDistribution.map((item, index) => (
                      <div className="flex min-w-0 flex-1 flex-col items-center" key={item.rating}>
                        <span className="mb-2 font-mono text-[9px] text-muted">{item.value}%</span>
                        <span
                          className="uncertainty-bar block w-full max-w-14 rounded-t-lg"
                          style={{
                            "--bar-delay": `${index * 110}ms`,
                            backgroundColor: item.color,
                            height: `${Math.max(14, item.value * 4)}px`,
                            opacity: 0.88,
                          }}
                        />
                        <span className="mt-3 grid size-7 place-items-center rounded-full border border-border bg-surface font-mono text-[9px]">
                          {item.rating}
                        </span>
                        <span className="mt-2 hidden text-center text-[9px] leading-4 text-muted sm:block">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-primary/25 bg-primary/6 p-4">
                    <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-primary">Expected rating</p>
                    <div className="mt-2 flex items-end justify-between gap-4">
                      <p className="text-3xl font-semibold">3.53</p>
                      <p className="pb-1 text-xs text-muted">Likely, with hesitation</p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-warning/25 bg-warning/6 p-4">
                    <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-warning">Uncertainty retained</p>
                    <div className="mt-3 flex items-center gap-1">
                      {intentDistribution.map((item) => (
                        <span
                          className="h-2 rounded-full"
                          key={item.rating}
                          style={{ backgroundColor: item.color, flex: item.value }}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-muted">Five outcomes remain represented</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid overflow-hidden rounded-2xl border border-border bg-surface lg:grid-cols-3">
              {uncertaintyPrinciples.map((item, index) => (
                <article
                  className="research-principle scroll-reveal p-6 not-last:border-b not-last:border-border lg:p-8 lg:not-last:border-b-0 lg:not-last:border-r"
                  key={item.number}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-primary">{item.number}</span>
                    <span className="size-2 rounded-full" style={{ backgroundColor: ["var(--accent)", "var(--warning)", "var(--primary)"][index] }} />
                  </div>
                  <h3 className="mt-8 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
                </article>
              ))}
            </div>

            <div className="scroll-reveal mx-auto mt-10 flex max-w-250 items-start gap-4 rounded-2xl border border-primary/25 bg-primary/6 p-5 sm:p-6">
              <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-primary/30 font-mono text-xs text-primary">i</span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Scientific humility</p>
                <p className="mt-2 text-sm leading-6 text-muted sm:text-base sm:leading-7">
                  Synthetic feedback is a pre-market signal, not ground truth. Audio 90
                  measures when the simulator is wrong and uses real campaign outcomes
                  to improve the next prediction.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="relative isolate overflow-hidden border-t border-border bg-surface"
          id="learning-loop"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-20 h-115 opacity-55"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--primary) 10%, transparent), transparent 52%), radial-gradient(circle at 82% 20%, color-mix(in srgb, var(--warning) 13%, transparent), transparent 34%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-36 -z-10 h-px w-[90%] max-w-330 -translate-x-1/2 bg-border"
          />

          <div className="mx-auto max-w-360 px-5 py-24 sm:px-8 sm:py-30 lg:px-12 lg:py-36">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-18">
              <div className="scroll-reveal lg:col-span-7">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.26em] text-accent">
                  Real-campaign feedback
                </p>
                <h2 className="mt-6 max-w-220 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-balance sm:text-5xl lg:text-6xl">
                  Prediction only becomes useful when reality can disagree.
                </h2>
              </div>
              <div className="scroll-reveal lg:col-span-5">
                <p className="max-w-145 text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  After launch, Audio 90 compares the pre-market hypothesis with
                  normalized campaign outcomes. Correct calls, misses and confidence
                  gaps all become evidence for the next experiment.
                </p>
                <div className="mt-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                  <span className="size-2 rounded-full bg-accent" />
                  Illustrative campaign record
                </div>
              </div>
            </div>

            <div className="feedback-console mt-16 overflow-hidden rounded-[1.75rem] border border-border bg-bg shadow-2xl shadow-black/8">
              <div className="flex flex-col gap-4 border-b border-border bg-surface px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <div className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-on-primary">
                    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 20 20">
                      <path d="M3 15.5V11l4 1.5V8l4 1.5V4l6 2.3v9.2H3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="m5 6.5 2-2 2 1 3-3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                      Learning event · CAM-042
                    </p>
                    <h3 className="mt-1 text-lg font-semibold sm:text-xl">
                      Mumbai acquisition campaign
                    </h3>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-border px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                    Spotify · 14 days
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/8 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-success">
                    <span className="size-1.5 rounded-full bg-success" />
                    Outcome received
                  </span>
                </div>
              </div>

              <div className="grid lg:grid-cols-12">
                <div className="border-b border-border p-5 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r lg:p-10">
                  <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 sm:gap-4">
                    <div className="rounded-2xl border border-primary/25 bg-primary/6 p-4 sm:p-6">
                      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-primary">
                        Before launch
                      </p>
                      <p className="mt-5 text-2xl font-semibold sm:text-3xl">B · 67%</p>
                      <p className="mt-2 text-xs leading-5 text-muted sm:text-sm">
                        Synthetic preference
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="h-full w-px bg-border" />
                      <span className="feedback-transfer grid size-9 shrink-0 place-items-center rounded-full border border-border bg-surface text-primary shadow-sm">
                        <ArrowIcon />
                      </span>
                      <span className="h-full w-px bg-border" />
                    </div>

                    <div className="rounded-2xl border border-success/25 bg-success/7 p-4 sm:p-6">
                      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-success">
                        After launch
                      </p>
                      <p className="mt-5 text-2xl font-semibold sm:text-3xl">B · +12.4%</p>
                      <p className="mt-2 text-xs leading-5 text-muted sm:text-sm">
                        Observed engagement lift
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-end justify-between gap-5">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
                        Prediction versus reality
                      </p>
                      <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
                        Direction correct. Magnitude overstated.
                      </h3>
                    </div>
                    <span className="hidden rounded-full border border-warning/30 bg-warning/8 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-warning sm:block">
                      Calibration needed
                    </span>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
                    <div className="grid grid-cols-[1.3fr_.8fr_.8fr_.7fr] gap-2 border-b border-border bg-surface-light/60 px-4 py-3 font-mono text-[8px] uppercase tracking-[0.1em] text-muted sm:px-5">
                      <span>Signal</span>
                      <span>Predicted</span>
                      <span>Observed</span>
                      <span className="text-right">Residual</span>
                    </div>
                    {campaignComparison.map((item) => (
                      <div
                        className="campaign-row grid grid-cols-[1.3fr_.8fr_.8fr_.7fr] items-center gap-2 border-b border-border px-4 py-4 last:border-b-0 sm:px-5"
                        key={item.label}
                      >
                        <span className="text-xs font-medium sm:text-sm">{item.label}</span>
                        <span className="font-mono text-[9px] text-muted sm:text-[10px]">{item.predicted}</span>
                        <span className="font-mono text-[9px] text-muted sm:text-[10px]">{item.observed}</span>
                        <span className="text-right font-mono text-[9px] font-semibold sm:text-[10px]" style={{ color: item.color }}>
                          {item.result}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <aside className="relative overflow-hidden bg-primary p-6 text-on-primary sm:p-8 lg:col-span-5 lg:p-10">
                  <div
                    aria-hidden="true"
                    className="absolute -right-28 -top-28 size-80 rounded-full border border-on-primary/12"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -right-14 -top-14 size-52 rounded-full border border-dashed border-on-primary/18"
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-on-primary/60">
                        Error ledger
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold">What the model learned</h3>
                    </div>
                    <span className="rounded-full border border-on-primary/20 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-on-primary/70">
                      v3 → v4
                    </span>
                  </div>

                  <div className="relative mt-8 grid grid-cols-2 gap-3">
                    {[
                      ["Direction", "Correct", "The winning creative was identified"],
                      ["Magnitude error", "5.6 pts", "Expected lift was too strong"],
                      ["Confidence gap", "9 pts", "Certainty requires recalibration"],
                      ["Data quality", "High", "Outcome passed normalization checks"],
                    ].map(([label, value, detail], index) => (
                      <div className="rounded-xl border border-on-primary/16 bg-on-primary/7 p-4" key={label}>
                        <span
                          className="mb-5 block size-2 rounded-full"
                          style={{ backgroundColor: ["var(--success)", "var(--warning)", "var(--accent)", "var(--on-primary)"][index] }}
                        />
                        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-on-primary/55">{label}</p>
                        <p className="mt-2 text-lg font-semibold">{value}</p>
                        <p className="mt-2 text-[11px] leading-5 text-on-primary/60">{detail}</p>
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-6 rounded-xl border border-on-primary/20 bg-on-primary/8 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-on-primary/55">
                          Model adjustment
                        </p>
                        <p className="mt-2 text-sm font-medium">Reduce expected engagement lift</p>
                      </div>
                      <span className="font-mono text-sm font-semibold text-warning">−5.6</span>
                    </div>
                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-on-primary/12">
                      <span className="calibration-fill block h-full w-[72%] rounded-full bg-warning" />
                    </div>
                    <p className="mt-4 border-l border-on-primary/25 pl-3 text-xs leading-5 text-on-primary/60">
                      The original prediction remains in the audit trail. Calibration
                      changes the next estimate—not the historical record.
                    </p>
                  </div>
                </aside>
              </div>
            </div>

            <div className="mt-18 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                The continuous-learning loop
              </p>
              <h3 className="mx-auto mt-4 max-w-180 text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-4xl">
                Every campaign becomes a measured learning event.
              </h3>
            </div>

            <div className="learning-loop-track relative mt-10 grid overflow-hidden rounded-2xl border border-border bg-bg lg:grid-cols-4">
              {learningLoop.map((step, index) => (
                <article
                  className="learning-step scroll-reveal relative p-6 not-last:border-b not-last:border-border sm:p-7 lg:not-last:border-b-0 lg:not-last:border-r"
                  key={step.number}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="grid size-11 place-items-center rounded-full border bg-surface font-mono text-xs"
                      style={{ borderColor: step.color, color: step.color }}
                    >
                      {step.number}
                    </span>
                    {index < learningLoop.length - 1 && (
                      <span className="hidden items-center gap-1 lg:flex" aria-hidden="true">
                        <span className="h-px w-5 bg-border" />
                        <span className="size-1.5 rounded-full" style={{ backgroundColor: step.color }} />
                      </span>
                    )}
                  </div>
                  <h4 className="mt-8 text-xl font-semibold">{step.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-muted">{step.description}</p>
                </article>
              ))}
            </div>

            <div className="scroll-reveal mt-6 flex flex-col gap-5 rounded-2xl border border-primary/25 bg-primary/6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="flex items-start gap-4">
                <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-primary/30 text-primary">
                  <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 16 16">
                    <path d="M13 5.5A5.5 5.5 0 1 0 13.2 10M13 2v3.5H9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
                  </svg>
                </span>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
                    Compounding evidence
                  </p>
                  <p className="mt-2 max-w-215 text-base leading-7 text-muted sm:text-lg">
                    The goal is not a model that claims certainty. It is a system that
                    knows where it was wrong, preserves the evidence and improves with
                    every comparable campaign.
                  </p>
                </div>
              </div>
              <span className="shrink-0 self-start rounded-full border border-primary/25 bg-surface px-4 py-2 font-mono text-[8px] uppercase tracking-[0.13em] text-primary sm:self-center">
                Auditable by design
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
