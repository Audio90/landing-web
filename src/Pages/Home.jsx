import { useEffect } from "react";
import Navbar from "../Reusable/Navbar/Navbar";

const creativeA = [18, 34, 48, 24, 56, 42, 64, 30, 46, 70, 38, 52, 28, 60, 44, 72, 36, 58, 32, 50, 68, 40];
const creativeB = [22, 46, 68, 34, 76, 52, 84, 42, 72, 58, 88, 48, 78, 64, 92, 54, 82, 60, 74, 48, 86, 56];
const distribution = [18, 24, 30, 38, 52, 68, 86, 100, 82, 64, 46, 32, 22];

const experimentInputs = [
  { type: "audience", label: "Target audience", title: "Mumbai · 18–30", detail: "Hinglish · Evening commute", color: "var(--primary)" },
  { type: "creative", label: "Creative variants", title: "Audio A / Audio B", detail: "Hook · Voice · Offer · CTA", color: "var(--warning)" },
  { type: "context", label: "Campaign context", title: "Spotify awareness", detail: "Food delivery · 30 seconds", color: "var(--accent)" },
];

const experimentOutputs = [
  { label: "Direction", title: "Creative B leads", detail: "Stronger pre-market hypothesis", value: "B", color: "var(--primary)" },
  { label: "Why it leads", title: "Value lands earlier", detail: "Clearer message and offer recall", value: "+", color: "var(--warning)" },
  { label: "Uncertainty", title: "Medium confidence", detail: "Audience disagreement remains visible", value: "67", color: "var(--accent)" },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 16 16">
      <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function NodeIcon({ type }) {
  if (type === "audience") {
    return <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M4.5 16c.5-3 2.4-4.5 5.5-4.5s5 1.5 5.5 4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>;
  }
  if (type === "creative") {
    return <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 20 20"><path d="M2.5 10h2l1.5-5 2.2 10 2.2-8 1.8 6 1.5-3h3.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>;
  }
  return <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10 6v4l2.8 1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>;
}

function Waveform({ bars, color }) {
  return (
    <div aria-hidden="true" className="flex h-14 items-center gap-0.75 overflow-hidden">
      {bars.map((height, index) => (
        <span className="wave-bar w-0.75 shrink-0 rounded-full" key={`${height}-${index}`} style={{ "--wave-delay": `${index * 38}ms`, backgroundColor: color, height: `${Math.max(10, height * 0.52)}px`, opacity: 0.58 + index / bars.length * 0.4 }} />
      ))}
    </div>
  );
}

function CreativeRow({ label, bars, color, duration }) {
  return (
    <div className="rounded-md border border-border bg-bg/65 p-4">
      <div className="flex items-center justify-between gap-4">
        <div><p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">{label}</p><p className="mt-1 text-xs text-muted">Audio advertisement</p></div>
        <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[9px] text-muted">{duration}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border"><svg aria-hidden="true" className="ml-0.5 size-3" viewBox="0 0 12 12"><path d="M10 6 2.5 10V2L10 6Z" fill="currentColor" /></svg></span>
        <Waveform bars={bars} color={color} />
      </div>
    </div>
  );
}

function ConnectorLines({ reverse = false }) {
  return (
    <svg aria-hidden="true" className="hidden h-full w-full xl:block" preserveAspectRatio="none" viewBox="0 0 100 430">
      {[71, 171, 271].map((y, index) => (
        <g key={y}>
          <path className="connector-base" d={`M0 ${y} C35 ${y},65 ${y},100 ${y}`} />
          <path className="connector-flow" d={`M0 ${y} C35 ${y},65 ${y},100 ${y}`} style={{ "--connector-delay": `${index * 180}ms`, animationDirection: reverse ? "reverse" : "normal" }} />
          <circle cx={reverse ? 100 : 0} cy={y} fill={["var(--primary)", "var(--warning)", "var(--accent)"][index]} r="3.5" />
          <circle cx={reverse ? 0 : 100} cy={y} fill="var(--surface)" r="4.5" stroke="var(--border)" strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  );
}

function SignalCard({ item, input = false }) {
  return (
    <article className="connector-card flex min-h-25 items-center gap-3 rounded-lg border border-border bg-surface p-4 shadow-lg shadow-black/6">
      <span className="grid size-10 shrink-0 place-items-center rounded-md border bg-bg font-mono text-xs font-semibold" style={{ borderColor: item.color, color: item.color }}>
        {input ? <NodeIcon type={item.type} /> : item.value}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">{item.label}</p>
        <h3 className="mt-1 text-sm font-semibold">{item.title}</h3>
        <p className="mt-1 text-xs leading-5 text-muted">{item.detail}</p>
      </div>
    </article>
  );
}

function ConnectorMap() {
  return (
    <div className="connector-board reveal rounded-xl border border-text/20 bg-bg p-4 shadow-[0_28px_90px_-52px_rgba(25,44,34,0.34)] sm:p-6 xl:p-8">
      <div className="grid gap-5 xl:min-h-107 xl:grid-cols-[minmax(215px,1fr)_72px_minmax(310px,1.25fr)_72px_minmax(215px,1fr)] xl:items-stretch xl:gap-0">
        <div className="order-1">
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">01 · Inputs</p>
          <div className="grid gap-3">{experimentInputs.map((item) => <SignalCard input item={item} key={item.label} />)}</div>
        </div>
        <div className="order-2 hidden xl:block"><ConnectorLines /></div>

        <div className="order-3 rounded-lg border border-primary/35 bg-surface p-5 shadow-lg shadow-primary/5 sm:p-6">
          <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
            <div className="flex items-center gap-3">
              <span className="lab-mark grid size-10 shrink-0 place-items-center rounded-md bg-primary/8 text-primary"><svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 18 18"><path d="M2 9h2l1.3-4.5L7.2 14l2-9 1.8 7 1.4-3H16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg></span>
              <div><p className="font-mono text-[8px] uppercase tracking-[0.15em] text-primary">Audio 90 engine</p><h3 className="mt-1 text-xl font-semibold">Synthetic Audience Lab</h3></div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-success/8 px-3 py-1.5 font-mono text-[7px] uppercase tracking-[0.1em] text-success"><span className="lab-status size-1.5 rounded-full bg-success" /> Live</span>
          </div>
          <div className="mt-5 grid gap-2">
            {[["01", "Creative understanding", "Genome"], ["02", "Audience simulation", "Panel"], ["03", "Response modelling", "Signal"]].map(([number, title, tag]) => (
              <div className="flex items-center gap-3 rounded-md bg-bg px-3.5 py-3" key={number}><span className="font-mono text-[8px] text-primary">{number}</span><span className="h-px w-4 bg-border" /><span className="flex-1 text-xs text-muted">{title}</span><span className="font-mono text-[7px] uppercase tracking-[0.1em] text-muted">{tag}</span></div>
            ))}
          </div>
          <div className="mt-5 rounded-md border border-border bg-bg p-4">
            <div className="flex items-center justify-between"><p className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted">Synthetic panel</p><span className="font-mono text-[7px] text-primary">● Comparing A/B</span></div>
            <div className="mt-4 grid grid-cols-9 gap-2 sm:grid-cols-12">
              {Array.from({ length: 36 }, (_, index) => <span className="audience-dot aspect-square rounded-full" key={index} style={{ "--dot-delay": `${index * 45}ms`, backgroundColor: index % 7 === 0 ? "var(--warning)" : index % 5 === 0 ? "color-mix(in srgb, var(--primary) 38%, var(--surface-light))" : "var(--primary)", opacity: 0.48 + index % 4 * 0.13 }} />)}
            </div>
          </div>
          <p className="mt-5 flex items-center justify-center gap-2 font-mono text-[7px] uppercase tracking-[0.12em] text-muted"><span className="size-1.5 rounded-full bg-warning" /> Estimate, not ground truth</p>
        </div>

        <div className="order-4 hidden xl:block"><ConnectorLines reverse /></div>
        <div className="order-5">
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">02 · Signal</p>
          <div className="grid gap-3">{experimentOutputs.map((item) => <SignalCard item={item} key={item.label} />)}</div>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2 border border-warning/25 bg-warning/6 px-4 py-3 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-4">
        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-warning">Then reality closes the loop</p><span className="hidden h-3 w-px bg-border sm:block" /><p className="text-xs text-muted">Launch the strongest hypothesis and return the real campaign result.</p>
      </div>
    </div>
  );
}

function ExperimentDashboard() {
  return (
    <div className="mockup-shell reveal overflow-hidden rounded-xl border border-text/20 bg-surface shadow-2xl shadow-black/10">
      <div className="flex min-h-14 items-center justify-between border-b border-border px-4 sm:px-6">
        <div className="flex gap-2"><span className="size-2.5 rounded-full bg-accent" /><span className="size-2.5 rounded-full bg-warning" /><span className="size-2.5 rounded-full bg-primary/70" /></div>
        <div className="flex self-stretch font-mono text-[9px] uppercase tracking-[0.16em] text-muted sm:text-xs"><span className="flex items-center border-b-2 border-primary px-3 text-primary sm:px-5">Experiment</span><span className="hidden items-center px-5 sm:flex">Results</span><span className="hidden items-center px-5 sm:flex">Calibration</span></div>
        <span className="font-mono text-[9px] text-muted">A90-024</span>
      </div>

      <div className="grid gap-px bg-border lg:grid-cols-12">
        <div className="bg-surface p-4 sm:p-6 lg:col-span-4">
          <div className="mb-5 flex items-end justify-between"><div><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">Creative test</p><h3 className="mt-1 text-lg font-semibold">A/B audio variants</h3></div><span className="rounded-full bg-surface-light px-2.5 py-1 font-mono text-[9px] text-muted">Spotify</span></div>
          <div className="space-y-3"><CreativeRow bars={creativeA} color="var(--warning)" duration="0:30" label="Creative A" /><CreativeRow bars={creativeB} color="var(--primary)" duration="0:28" label="Creative B" /></div>
          <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[8px] uppercase tracking-[0.08em] text-muted">{["Hook", "Voice", "CTA"].map((item) => <span className="rounded-lg border border-border px-2 py-2 text-center" key={item}>{item}</span>)}</div>
        </div>

        <div className="bg-surface p-4 sm:p-6 lg:col-span-5">
          <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">Synthetic prediction</p><h3 className="mt-2 text-2xl font-semibold">Creative B leads</h3></div><span className="rounded-full border border-warning/40 bg-warning/8 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-warning">Medium confidence</span></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-bg/65 p-4">
              <div className="flex items-end justify-between"><p className="text-sm font-medium">Preference distribution</p><p className="text-3xl font-semibold text-primary">67%</p></div>
              <div className="mt-6 flex h-24 items-end justify-center gap-1.5">{distribution.map((height, index) => <span className="distribution-bar w-2 rounded-t-sm" key={`${height}-${index}`} style={{ "--bar-delay": `${index * 45}ms`, backgroundColor: index < 6 ? "var(--warning)" : "var(--primary)", height: `${height}%`, opacity: 0.5 + Math.abs(6 - index) * 0.035 }} />)}</div>
              <div className="mt-3 flex justify-between font-mono text-[8px] uppercase text-muted"><span>More likely A</span><span>More likely B</span></div>
            </div>
            <div className="rounded-xl border border-border bg-bg/65 p-4">
              <p className="text-sm font-medium">Synthetic audience</p>
              <div className="mt-5 grid grid-cols-8 gap-2">{Array.from({ length: 48 }, (_, index) => <span className="audience-dot aspect-square rounded-full" key={index} style={{ "--dot-delay": `${index * 28}ms`, backgroundColor: index % 7 === 0 ? "var(--accent)" : index < 31 ? "var(--primary)" : "var(--surface-light)", opacity: index < 31 ? 0.9 : 0.72 }} />)}</div>
              <div className="mt-5 flex items-center justify-between text-xs text-muted"><span>12,540 profiles</span><span>Mumbai · 18–30</span></div>
            </div>
          </div>
          <div className="mt-3 rounded-xl border border-border bg-bg/65 p-4"><div className="mb-3 flex items-center justify-between"><p className="text-sm font-medium">Why B leads</p><span className="font-mono text-[9px] text-primary">+18% clarity</span></div><p className="text-sm leading-6 text-muted">Listeners understand the product value earlier and reach the offer with less message ambiguity.</p></div>
        </div>

        <div className="bg-surface p-4 sm:p-6 lg:col-span-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">Confidence summary</p>
          <div className="mt-6 flex justify-center"><div className="confidence-ring grid size-34 place-items-center rounded-full" style={{ background: "conic-gradient(var(--primary) 0 67%, var(--surface-light) 67% 100%)" }}><div className="grid size-25 place-items-center rounded-full bg-surface text-center"><div><p className="text-4xl font-semibold">67%</p><p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">panel preference</p></div></div></div></div>
          <div className="mt-6 space-y-3">{[["Message clarity", "78", "var(--primary)"], ["Offer recall", "71", "var(--warning)"], ["Skip likelihood", "32", "var(--accent)"]].map(([label, value, color]) => <div className="rounded-lg border border-border bg-bg/65 p-3" key={label}><div className="flex items-center justify-between text-xs"><span className="text-muted">{label}</span><span className="font-mono">{value}%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-light"><span className="metric-bar block h-full rounded-full" style={{ backgroundColor: color, width: `${value}%` }} /></div></div>)}</div>
          <p className="mt-5 rounded-lg border border-warning/30 bg-warning/6 px-3 py-3 text-xs leading-5 text-muted">Synthetic estimate—validate through a real campaign test.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border bg-bg/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[8px] uppercase tracking-[0.1em] text-muted"><span>Model · A90-SYNTH-1.2</span><span>Panel · 12,540</span><span>Updated · 2 min ago</span></div>
        <span className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-semibold">View full report <ArrowIcon /></span>
      </div>
    </div>
  );
}

function Home() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const items = document.querySelectorAll(".reveal");
    root.classList.add("reveal-ready");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)), { rootMargin: "-3% 0px -6% 0px", threshold: 0.04 });
    items.forEach((item) => observer.observe(item));
    return () => { observer.disconnect(); root.classList.remove("reveal-ready"); };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text" id="top">
      <Navbar />
      <main id="main-content">
        <section className="relative isolate overflow-hidden border-b border-border" id="product">
          <div aria-hidden="true" className="hero-grid absolute inset-0 -z-20" />
          <div className="mx-auto max-w-360 px-5 pb-24 pt-18 sm:px-8 sm:pt-24 lg:px-12 lg:pb-32 lg:pt-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="hero-item font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">Synthetic audience testing for audio advertising</p>
                <h1 className="hero-item mt-6 text-5xl font-semibold leading-[0.89] tracking-[-0.068em] text-balance sm:text-7xl lg:text-[6.3rem]">Test the ad. <span className="hero-serif block font-normal italic text-accent">Before you buy the media.</span></h1>
              </div>
              <div className="hero-item lg:col-span-4 lg:pb-2">
                <p className="max-w-120 text-base leading-7 text-muted sm:text-lg sm:leading-8">Audio 90 compares two audio creatives with a synthetic audience, explains which direction leads, and shows how certain the signal is.</p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"><a className="group inline-flex min-h-13 items-center justify-center gap-2 bg-text px-4 text-sm font-semibold text-surface transition-transform hover:-translate-y-0.5" href="#beta">Request beta access <ArrowIcon /></a><a className="inline-flex min-h-13 items-center justify-center border border-text/25 bg-surface px-4 text-sm font-semibold transition-colors hover:bg-surface-light" href="#report">View the report</a></div>
                <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">Compare · explain · calibrate</p>
              </div>
            </div>

            <div className="hero-report relative mt-16" id="report">
              <div className="mb-3 flex items-center justify-between border-y border-border py-3 font-mono text-[8px] uppercase tracking-[0.14em] text-muted"><span>Live product surface</span><span>Example experiment · A90-024</span></div>
              <ExperimentDashboard />
            </div>

            <div className="reveal grid border-x border-b border-text/20 bg-accent sm:grid-cols-3">
              {[["01", "Direction", "Know which creative to test first."], ["02", "Reason", "See what moved the audience response."], ["03", "Uncertainty", "Keep disagreement visible before launch."]].map(([number, title, detail]) => <div className="flex gap-4 border-text/20 p-5 not-last:border-b sm:not-last:border-b-0 sm:not-last:border-r" key={number}><span className="font-mono text-[9px] font-semibold text-text/60">{number}</span><div><p className="text-sm font-semibold text-text">{title}</p><p className="mt-1 text-xs leading-5 text-text/70">{detail}</p></div></div>)}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface" id="method">
          <div className="mx-auto max-w-360 px-5 py-24 sm:px-8 sm:py-30 lg:px-12 lg:py-36">
            <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8"><p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-primary">How the signal is made</p><h2 className="mt-5 max-w-225 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">One lab. Three inputs. A decision you can defend.</h2></div>
              <p className="max-w-125 text-base leading-7 text-muted lg:col-span-4">Audience, creative and campaign context go in. Direction, reasoning and honest uncertainty come out.</p>
            </div>
            <div className="mt-14"><ConnectorMap /></div>
          </div>
        </section>

        <section className="border-b border-border bg-bg" id="science">
          <div className="mx-auto max-w-360 px-5 py-24 sm:px-8 sm:py-30 lg:px-12 lg:py-36">
            <div className="calibration-panel reveal grid overflow-hidden border border-text/20 lg:grid-cols-12">
              <div className="bg-accent p-7 sm:p-10 lg:col-span-5 lg:p-12">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-text/65">Continuous learning</p>
                <h2 className="mt-7 text-4xl font-semibold leading-[0.96] tracking-[-0.055em] text-balance sm:text-6xl">The model does not get the last word. <span className="hero-serif font-normal italic">Reality does.</span></h2>
                <p className="mt-7 max-w-115 text-base leading-7 text-text/75">Return the real campaign outcome. Audio 90 measures the miss and recalibrates the next comparable test.</p>
              </div>
              <div className="bg-surface p-6 sm:p-10 lg:col-span-7 lg:p-12">
                <div className="flex items-center justify-between border-b border-border pb-5"><div><p className="font-mono text-[8px] uppercase tracking-[0.14em] text-primary">Campaign CAM-042</p><h3 className="mt-2 text-xl font-semibold">Prediction meets reality</h3></div><span className="bg-success/8 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-success">Outcome received</span></div>
                <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">{[["Before launch", "B · 67%", "Synthetic preference"], ["After launch", "B · +12.4%", "Observed engagement"], ["Next campaign", "Model v4", "Magnitude recalibrated"]].map(([label, value, detail], index) => <div className={`${index === 2 ? "bg-success/7" : "bg-bg"} p-5`} key={label}><p className="font-mono text-[7px] uppercase tracking-[0.1em] text-muted">{label}</p><p className="mt-5 text-2xl font-semibold">{value}</p><p className="mt-2 text-xs leading-5 text-muted">{detail}</p></div>)}</div>
                <div className="mt-5 flex items-center justify-between gap-4 border border-warning/30 bg-warning/8 p-4"><span className="text-sm font-medium">Direction correct. Magnitude overstated.</span><span className="font-mono text-[9px] font-semibold text-warning">−5.6 pts</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface" id="beta">
          <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
            <div className="reveal grid gap-8 border-y border-text/20 py-12 lg:grid-cols-12 lg:items-end lg:py-18">
              <div className="lg:col-span-8"><p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">Audio 90 private beta</p><h2 className="mt-5 max-w-225 text-4xl font-semibold leading-[0.96] tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">Bring the two ads you cannot choose between.</h2></div>
              <div className="lg:col-span-4"><p className="text-base leading-7 text-muted">Leave with a clearer first test—not a promise, a better-supported decision.</p><a className="group mt-7 inline-flex min-h-13 items-center justify-center gap-2 bg-text px-7 text-sm font-semibold text-surface transition-transform hover:-translate-y-0.5" href="#top">Request beta access <ArrowIcon /></a></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface" id="about"><div className="mx-auto flex max-w-360 flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12"><p className="font-semibold">Audio <span className="text-primary">90</span></p><p className="text-xs text-muted">Synthetic audience testing for better audio advertising decisions.</p><p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">Estimate · validate · learn</p></div></footer>
    </div>
  );
}

export default Home;
