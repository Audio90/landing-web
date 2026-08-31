import { useEffect, useRef, useState } from "react";
import Navbar from "../Reusable/Navbar/Navbar";
import { joinAudio90Waitlist } from "../services";

const creativeA = [
  18, 34, 48, 24, 56, 42, 64, 30, 46, 70, 38, 52, 28, 60, 44, 72, 36, 58, 32,
  50, 68, 40,
];
const creativeB = [
  22, 46, 68, 34, 76, 52, 84, 42, 72, 58, 88, 48, 78, 64, 92, 54, 82, 60, 74,
  48, 86, 56,
];
const distribution = [18, 24, 30, 38, 52, 68, 86, 100, 82, 64, 46, 32, 22];
const resultMetrics = [
  ["Message clarity", "78", "var(--report-primary)"],
  ["Offer recall", "71", "var(--report-teal)"],
  ["Skip likelihood", "32", "var(--report-sage)"],
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 16 16">
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

function HeroSignalStudio() {
  return (
    <div aria-hidden="true" className="hero-studio">
      <div className="hero-studio-aura" />

      <article className="hero-float-card hero-float-a">
        <span className="hero-card-kicker">Creative A · 0:30</span>
        <div className="hero-mini-wave">
          {creativeA.slice(2, 16).map((height, index) => (
            <span key={`${height}-${index}`} style={{ height: `${height * 0.42}px` }} />
          ))}
        </div>
        <span className="hero-card-caption"><i className="hero-card-dot dot-coral" /> Full cut</span>
      </article>

      <article className="hero-float-card hero-float-b">
        <span className="hero-card-kicker">Creative B · 0:15</span>
        <div className="hero-mini-wave">
          {creativeB.slice(2, 16).map((height, index) => (
            <span key={`${height}-${index}`} style={{ height: `${height * 0.42}px` }} />
          ))}
        </div>
        <span className="hero-card-caption"><i className="hero-card-dot dot-violet" /> Condensed cut</span>
      </article>

      <div className="hero-studio-core">
        <p className="hero-command-copy">
          Compare two audio ads against the audience and campaign context.
        </p>
        <div className="hero-command-actions">
          <span className="hero-command-add">+</span>
          <span className="hero-command-tag">@ Campaign brief</span>
          <span className="hero-command-submit"><ArrowIcon /></span>
        </div>
      </div>

      <article className="hero-float-card hero-float-metric">
        <span className="hero-card-kicker">Directional result</span>
        <p>Creative B leads</p>
        <strong>67%</strong>
        <span className="hero-card-caption">Medium confidence</span>
      </article>

      <div className="hero-studio-flow">
        <span>✦ Compare creatives</span>
        <span>▷ Model audience</span>
        <span>▥ Measure result</span>
      </div>
    </div>
  );
}

function SignalMarquee() {
  const items = ["Compare", "Predict", "Explain", "Validate", "Learn"];
  return (
    <div aria-label="Audio 90 workflow" className="signal-marquee">
      <div className="signal-marquee-track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}><i /> {item}</span>
        ))}
      </div>
    </div>
  );
}
function Waveform({ bars, color }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-14 items-center gap-0.75 overflow-hidden"
    >
      {bars.map((height, index) => (
        <span
          className="wave-bar w-0.75 shrink-0 rounded-full"
          key={`${height}-${index}`}
          style={{
            "--wave-delay": `${index * 38}ms`,
            backgroundColor: color,
            height: `${Math.max(10, height * 0.52)}px`,
            opacity: 0.58 + (index / bars.length) * 0.4,
          }}
        />
      ))}
    </div>
  );
}

function PauseIcon() {
  return (
    <svg aria-hidden="true" className="size-3" viewBox="0 0 12 12">
      <path d="M2.5 2h2v8h-2zm5 0h2v8h-2z" fill="currentColor" />
    </svg>
  );
}

function CreativeRow({ label, bars, color, duration, src, detail }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <div
      className={`audio-row rounded-md border border-border bg-bg/65 p-4 ${isPlaying ? "is-playing" : ""}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
            {label}
          </p>
          <p className="mt-1 text-xs text-muted">
            {detail || "Audio advertisement"}
          </p>
        </div>
        <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[9px] text-muted">
          {duration}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          aria-label={`${isPlaying ? "Pause" : "Play"} ${label}`}
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-border bg-surface transition-colors hover:border-text"
          onClick={togglePlayback}
          type="button"
        >
          {isPlaying ? (
            <PauseIcon />
          ) : (
            <svg aria-hidden="true" className="ml-0.5 size-3" viewBox="0 0 12 12">
              <path d="M10 6 2.5 10V2L10 6Z" fill="currentColor" />
            </svg>
          )}
        </button>
        <div className="min-w-0 flex-1">
          <Waveform bars={bars} color={color} />
          <div className="h-0.5 overflow-hidden bg-border" aria-hidden="true">
            <span
              className="block h-full transition-[width] duration-150"
              style={{ backgroundColor: color, width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      <audio
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
        }}
        preload="metadata"
        ref={audioRef}
        src={src}
      />
    </div>
  );
}

function AudioDemo() {
  const [guess, setGuess] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section className="story-section demo-section" id="demo">
      <div className="mx-auto max-w-360 px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="reveal story-heading grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-primary">
              Try the product idea
            </p>
            <h2 className="mt-5 max-w-210 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-balance sm:text-6xl">
              Hear both. Pick one. Then reveal the signal.
            </h2>
          </div>
          <p className="max-w-125 text-base leading-7 text-muted lg:col-span-4">
            Two cuts of the same public-domain radio spot make this demo
            playable while customer creative stays private.
          </p>
        </div>

        <div className="demo-stage reveal mt-14 grid overflow-hidden lg:grid-cols-12">
          <div className="demo-audio-pane space-y-3 p-4 sm:p-7 lg:col-span-7">
            <CreativeRow
              bars={creativeA}
              color="var(--warning)"
              detail="Full 30-second cut"
              duration="0:30"
              label="Creative A"
              src="/audio/great-texas-airshow-30s.mp3"
            />
            <CreativeRow
              bars={creativeB}
              color="var(--primary)"
              detail="Condensed 15-second cut"
              duration="0:15"
              label="Creative B"
              src="/audio/great-texas-airshow-15s.mp3"
            />
          </div>
          <div className="demo-choice-pane p-6 sm:p-8 lg:col-span-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
              Your read
            </p>
            <h3 className="mt-3 text-2xl font-semibold">
              Which cut should the media team test first?
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {["A", "B"].map((option) => (
                <button
                  aria-pressed={guess === option}
                  className={`min-h-12 cursor-pointer border px-4 text-sm font-semibold transition-colors ${guess === option ? "border-primary bg-primary text-on-primary" : "border-border bg-bg hover:border-text"}`}
                  key={option}
                  onClick={() => {
                    setGuess(option);
                    setIsRevealed(false);
                  }}
                  type="button"
                >
                  Creative {option}
                </button>
              ))}
            </div>
            <button
              className="mt-3 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 bg-text px-5 text-sm font-semibold text-surface disabled:cursor-not-allowed disabled:opacity-45"
              disabled={!guess}
              onClick={() => setIsRevealed(true)}
              type="button"
            >
              Reveal sample signal <ArrowIcon />
            </button>
            {isRevealed && (
              <div aria-live="polite" className="mt-5 border border-primary/30 bg-primary/7 p-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-primary">
                  Illustrative result · Medium confidence
                </p>
                <p className="mt-2 text-lg font-semibold">Creative B leads</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  The shorter cut lands the event and date earlier. Your pick
                  was Creative {guess}; this is a hypothesis to validate, not a
                  campaign-lift promise.
                </p>
              </div>
            )}
            <p className="mt-5 text-xs leading-5 text-muted">
              Temporary demo audio: U.S. Air Force work via DVIDS. Public-domain
              status does not imply government endorsement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CreativeTestColumn({ dashboardLayout = false }) {
  return (
    <aside
      className={`report-creative-column ${dashboardLayout ? "lg:col-span-4" : ""}`}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="report-eyebrow">Test setup</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em]">
            Creative pair
          </h3>
          <p className="mt-1 text-xs leading-5 text-muted">
            One message, two edit lengths.
          </p>
        </div>
        <span className="report-chip">Radio</span>
      </div>
      <div className="space-y-3">
        <CreativeRow
          bars={creativeA}
          color="var(--report-secondary)"
          detail="Full 30-second cut"
          duration="0:30"
          label="Creative A"
          src="/audio/great-texas-airshow-30s.mp3"
        />
        <CreativeRow
          bars={creativeB}
          color="var(--report-primary)"
          detail="Condensed 15-second cut"
          duration="0:15"
          label="Creative B"
          src="/audio/great-texas-airshow-15s.mp3"
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
        {["Hook", "Voice", "CTA"].map((item) => (
          <span className="report-attribute" key={item}>
            {item}
          </span>
        ))}
      </div>
      <div className="report-variable-note">
        <span>Test variable</span>
        <strong>Cut length</strong>
      </div>
    </aside>
  );
}

function ExperimentView() {
  return (
    <div className="grid gap-px bg-border lg:grid-cols-12">
      <CreativeTestColumn dashboardLayout />
      <div className="bg-surface p-4 sm:p-6 lg:col-span-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
          Modeled audience definition
        </p>
        <h3 className="mt-2 text-2xl font-semibold">
          Texas families · 18–54
        </h3>
        <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {[
            ["Language", "English"],
            ["Listening moment", "Weekend planning"],
            ["Category", "Community event"],
            ["Objective", "Awareness"],
          ].map(([label, value]) => (
            <div className="bg-bg p-4" key={label}>
              <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-muted">
                {label}
              </p>
              <p className="mt-2 text-sm font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 border border-border bg-bg p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Modeled panel</p>
            <span className="font-mono text-[8px] text-primary">
              100 illustrative personas
            </span>
          </div>
          <div className="mt-5 grid grid-cols-12 gap-2">
            {Array.from({ length: 36 }, (_, index) => (
              <span
                className="audience-dot aspect-square rounded-full"
                key={index}
                style={{
                  "--dot-delay": `${index * 32}ms`,
                  backgroundColor:
                    index % 6 === 0 ? "var(--warning)" : "var(--primary)",
                  opacity: 0.42 + (index % 4) * 0.14,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-surface p-4 sm:p-6 lg:col-span-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
          Run settings
        </p>
        <div className="mt-5 divide-y divide-border border-y border-border">
          {[
            ["Comparison", "Paired A/B"],
            ["Duration", "30s vs 15s"],
            ["Variable", "Cut length"],
            ["Model", "A90-CONCEPT"],
          ].map(([label, value]) => (
            <div
              className="flex items-center justify-between gap-3 py-3 text-xs"
              key={label}
            >
              <span className="text-muted">{label}</span>
              <span className="font-mono text-[9px]">{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 border border-success/25 bg-success/7 p-4">
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-success">
            Run complete
          </p>
          <p className="mt-2 text-sm font-semibold">
            All 100 modeled responses processed.
          </p>
          <p className="mt-2 text-xs leading-5 text-muted">
            The result is ready for review.
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultsView() {
  return (
    <div className="report-results-grid">
      <div className="report-mobile-summary lg:hidden">
        <div>
          <p className="report-eyebrow">Current result</p>
          <p className="mt-1 text-sm font-semibold">Creative B leads</p>
        </div>
        <span className="report-confidence-pill">67% preference</span>
      </div>
      <CreativeTestColumn />
      <section className="report-primary-column">
        <div className="report-outcome-header">
          <div>
            <p className="report-eyebrow">Directional result</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Creative B leads
            </h3>
            <p className="mt-3 max-w-120 text-sm leading-6 text-muted">
              The condensed cut communicates the event and action sooner while
              preserving the core message.
            </p>
          </div>
          <span className="report-confidence-pill">Medium confidence</span>
        </div>
        <div className="mt-7 grid gap-4 xl:grid-cols-[1.08fr_.92fr]">
          <section className="report-data-card report-distribution-card">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold">Preference distribution</p>
                <p className="mt-1 text-xs text-muted">Modeled response spread</p>
              </div>
              <p className="text-4xl font-semibold tracking-[-0.05em] text-[var(--report-primary)]">
                67<span className="text-xl">%</span>
              </p>
            </div>
            <div className="report-chart mt-8 flex h-30 items-end justify-center gap-1.5">
              {distribution.map((height, index) => (
                <span
                  className="distribution-bar w-2.5 rounded-t-sm"
                  key={`${height}-${index}`}
                  style={{
                    "--bar-delay": `${index * 45}ms`,
                    backgroundColor:
                      index < 6
                        ? "var(--report-secondary)"
                        : "var(--report-primary)",
                    height: `${height}%`,
                    opacity: 0.64 + Math.abs(6 - index) * 0.025,
                  }}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-between font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
              <span>More likely A</span>
              <span>More likely B</span>
            </div>
          </section>
          <section className="report-data-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Audience agreement</p>
                <p className="mt-1 text-xs text-muted">Illustrative personas</p>
              </div>
              <span className="report-chip">100 panel</span>
            </div>
            <div className="mt-7 grid grid-cols-8 gap-2.5">
              {Array.from({ length: 48 }, (_, index) => (
                <span
                  className="audience-dot aspect-square rounded-full"
                  key={index}
                  style={{
                    "--dot-delay": `${index * 28}ms`,
                    backgroundColor:
                      index % 7 === 0
                        ? "var(--report-lime)"
                        : index < 31
                          ? "var(--report-primary)"
                          : "var(--report-soft)",
                    opacity: index < 31 ? 0.94 : 1,
                  }}
                />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-[var(--report-border)] pt-4 text-xs text-muted">
              <span>31 strong signals</span>
              <span>Texas · 18–54</span>
            </div>
          </section>
        </div>
        <div className="report-reason-card">
          <div className="report-reason-index">01</div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold">Why B leads</p>
              <span className="report-reason-tag">
                Message arrives earlier
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">
              Listeners reach the event, date, and call to action sooner in the
              condensed cut.
            </p>
          </div>
        </div>
      </section>
      <aside className="report-insight-rail">
        <section className="report-confidence-card">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/58">
              Confidence summary
            </p>
            <span className="report-live-status">
              <span /> Complete
            </span>
          </div>
          <div className="mt-7 flex justify-center">
            <div
              className="confidence-ring report-confidence-ring grid size-38 place-items-center rounded-full"
              style={{
                background:
                  "conic-gradient(var(--report-lime) 0 67%, rgba(255,255,255,.11) 67% 100%)",
              }}
            >
              <div className="grid size-29 place-items-center rounded-full bg-[var(--report-dark)] text-center">
                <div>
                  <p className="text-4xl font-semibold tracking-[-0.05em] text-white">
                    67%
                  </p>
                  <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-white/52">
                    prefer B
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-white/10 pt-5 text-center">
            <p className="text-sm font-medium text-white">
              Directional, not definitive
            </p>
            <p className="mt-1 text-xs leading-5 text-white/52">
              Enough signal to choose the first in-market test.
            </p>
          </div>
        </section>
        <section className="report-metrics-card">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Signal breakdown</p>
            <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
              3 measures
            </span>
          </div>
          <div className="mt-5 space-y-5">
            {resultMetrics.map(([label, value, color]) => (
              <div key={label}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">{label}</span>
                  <span className="font-mono text-[10px] font-semibold">
                    {value}%
                  </span>
                </div>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[var(--report-soft)]">
                  <span
                    className="metric-bar block h-full rounded-full"
                    style={{ backgroundColor: color, width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        <p className="report-disclaimer">
          Illustrative modeled estimate. Validate direction through a real
          campaign test.
        </p>
      </aside>
    </div>
  );
}

function CalibrationView() {
  return (
    <div className="grid gap-px bg-border lg:grid-cols-12">
      <div className="bg-surface p-4 sm:p-6 lg:col-span-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
          Before launch
        </p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <h3 className="text-2xl font-semibold">Illustrative prediction</h3>
          <span className="font-mono text-[9px] text-warning">
            Medium confidence
          </span>
        </div>
        <div className="mt-7 flex items-center gap-6 border-y border-border py-6">
          <div
            className="confidence-ring grid size-28 shrink-0 place-items-center rounded-full"
            style={{
              background:
                "conic-gradient(var(--primary) 0 67%, var(--surface-light) 67% 100%)",
            }}
          >
            <div className="grid size-20 place-items-center rounded-full bg-surface text-center">
              <div>
                <p className="text-3xl font-semibold">67%</p>
                <p className="font-mono text-[7px] uppercase text-muted">
                  B leads
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">Creative B</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Value lands earlier with clearer offer recall.
            </p>
          </div>
        </div>
        <p className="mt-5 text-xs leading-5 text-muted">
          This panel demonstrates how a prediction can be stored before launch
          and compared with an observed result.
        </p>
      </div>
      <div className="bg-surface p-4 sm:p-6 lg:col-span-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
          Example after launch
        </p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold">Illustrative outcome</h3>
            <p className="mt-2 text-sm text-muted">
              Radio · Texas · Example 7-day flight
            </p>
          </div>
          <p className="text-right text-3xl font-semibold text-primary">
            +12.4%
            <span className="block font-mono text-[8px] font-normal uppercase text-muted">
              engagement
            </span>
          </p>
        </div>
        <div className="mt-7 space-y-4">
          {[
            ["Message clarity", "74", "78", "var(--primary)"],
            ["Offer recall", "68", "71", "var(--warning)"],
            ["Skip likelihood", "35", "32", "var(--accent)"],
          ].map(([label, observed, predicted, color]) => (
            <div className="border-b border-border pb-4" key={label}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{label}</span>
                <span className="font-mono text-[8px] text-muted">
                  Observed {observed}% · Predicted {predicted}%
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden bg-surface-light">
                <span
                  className="metric-bar block h-full"
                  style={{ backgroundColor: color, width: `${observed}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 border border-success/25 bg-success/7 p-4">
          <p className="text-sm font-semibold">Direction confirmed</p>
          <p className="mt-1 text-xs leading-5 text-muted">
            In this illustrative loop, Creative B also leads after launch.
          </p>
        </div>
      </div>
      <div className="bg-surface p-4 sm:p-6 lg:col-span-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
          Model update
        </p>
        <h3 className="mt-2 text-3xl font-semibold">Example model update</h3>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {[
            ["Direction", "Correct"],
            ["Magnitude error", "−5.6 pts"],
            ["Audience weight", "Adjusted"],
            ["Status", "Calibrated"],
          ].map(([label, value]) => (
            <div
              className="flex items-center justify-between gap-3 py-3 text-xs"
              key={label}
            >
              <span className="text-muted">{label}</span>
              <span className="font-mono text-[9px]">{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-signal p-4">
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-text/65">
            What changed
          </p>
          <p className="mt-2 text-sm font-semibold">
            Future comparable predictions become less aggressive.
          </p>
        </div>
      </div>
    </div>
  );
}

function ExperimentDashboard() {
  const [activeTab, setActiveTab] = useState("results");
  const tabs = ["experiment", "results", "calibration"];
  const actions = {
    experiment: ["Open results", "results"],
    results: ["View calibration", "calibration"],
    calibration: ["Back to experiment", "experiment"],
  };
  const handleTabKey = (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const currentIndex = tabs.indexOf(activeTab);
    const nextTab = tabs[(currentIndex + direction + tabs.length) % tabs.length];
    setActiveTab(nextTab);
    window.requestAnimationFrame(() =>
      document.getElementById(`report-tab-${nextTab}`)?.focus(),
    );
  };

  return (
    <div className="product-report mockup-shell reveal overflow-hidden border bg-surface">
      <div className="report-toolbar">
        <div className="report-brand">
          <span aria-hidden="true" className="report-brand-mark">
            A<span>90</span>
          </span>
          <div>
            <p className="text-xs font-semibold">Signal report</p>
            <p className="mt-0.5 hidden font-mono text-[7px] uppercase tracking-[0.11em] text-muted sm:block">
              Pre-market audio test
            </p>
          </div>
        </div>
        <div
          aria-label="Experiment report views"
          className="report-tabs"
          role="tablist"
        >
          {tabs.map((tab) => (
            <button
              aria-controls={`report-panel-${tab}`}
              aria-selected={activeTab === tab}
              className={`report-tab ${activeTab === tab ? "is-active" : ""}`}
              id={`report-tab-${tab}`}
              key={tab}
              onClick={() => setActiveTab(tab)}
              onKeyDown={handleTabKey}
              role="tab"
              type="button"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="report-meta">
          <span className="report-meta-status">
            <span /> Analysis complete
          </span>
          <span className="font-mono text-[8px] text-muted">A90–024</span>
        </div>
      </div>

      <div
        aria-labelledby={`report-tab-${activeTab}`}
        className="report-panel"
        id={`report-panel-${activeTab}`}
        key={activeTab}
        role="tabpanel"
      >
        {activeTab === "experiment" && <ExperimentView />}
        {activeTab === "results" && <ResultsView />}
        {activeTab === "calibration" && <CalibrationView />}
      </div>

      <div className="report-footer">
        <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
          <span>Illustrative sample data</span>
          <span>Panel · 100 modeled personas</span>
        </div>
        <button
          className="report-next-button"
          onClick={() => setActiveTab(actions[activeTab][1])}
          type="button"
        >
          {actions[activeTab][0]} <ArrowIcon />
        </button>
      </div>
    </div>
  );
}

function ProcessSection() {
  const steps = [
    ["01", "Add your creatives", "Provide two finished audio ads and the campaign brief."],
    ["02", "Define the audience", "Specify audience, language, listening moment, platform, and objective."],
    ["03", "Receive the signal", "See which creative leads, what drove the difference, and where people disagree."],
    ["04", "Validate in-market", "Launch the strongest hypothesis and use the observed result to improve the next test."],
  ];

  return (
    <section className="story-section process-section" id="process">
      <div className="mx-auto max-w-360 px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="reveal story-heading grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-primary">
              How it works
            </p>
            <h2 className="mt-5 max-w-210 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-balance sm:text-6xl">
              From two audio ads to one stronger first test.
            </h2>
          </div>
          <p className="max-w-125 text-base leading-7 text-muted lg:col-span-4">
            A directional A/B report is designed for a pilot turnaround of a
            few working days—not a months-long research cycle.
          </p>
        </div>
        <div className="process-track reveal mt-14 grid sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([number, title, detail]) => (
            <article className="step-card min-h-64 p-6" key={number}>
              <p className="font-mono text-[9px] text-accent">{number}</p>
              <h3 className="mt-10 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodologySection() {
  const principles = [
    ["Modeled, not measured", "The panel is simulated from an explicit audience brief. It is not a recruited human sample."],
    ["Direction with uncertainty", "Every result keeps preference spread, disagreement, and rerun stability visible."],
    ["Validated in-market", "A pilot produces a hypothesis—not promised lift. Real campaign outcomes remain the final test."],
  ];

  return (
    <section className="story-section methodology-section" id="methodology">
      <div className="mx-auto max-w-360 px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="reveal methodology-intro">
          <div>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-primary">
            Honest by design
            </p>
            <h2 className="methodology-statement mt-6 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-balance sm:text-6xl lg:text-[5.4rem]">
              Useful direction without false certainty.
            </h2>
          </div>
          <p className="mx-auto mt-8 max-w-150 text-center text-base leading-7 text-muted">
            Unreleased creative stays private, and retention terms are agreed
            before any pilot files are uploaded.
          </p>
        </div>

        <div className="methodology-cards reveal mt-16 grid lg:grid-cols-3">
          {principles.map(([title, detail], index) => (
            <article className="method-card p-6 sm:p-8" key={title}>
              <p className="font-mono text-[8px] text-accent">0{index + 1}</p>
              <h3 className="mt-7 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WaitlistForm() {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const closeButtonRef = useRef(null);

  const closeModal = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  useEffect(() => {
    if (status !== "success") return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
    };

    const previousOverflow = document.body.style.overflow;
    const autoCloseTimer = window.setTimeout(closeModal, 5000);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      window.clearTimeout(autoCloseTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [status]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    setStatus("submitting");
    setErrorMessage("");

    try {
      await joinAudio90Waitlist(new FormData(form));
      form.reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message ||
          error?.message ||
          "We could not add you to the waitlist. Please try again.",
      );
      setStatus("error");
    }
  };

  const fieldClass =
    "mt-2 min-h-12 w-full border border-border bg-bg px-3 text-sm text-text outline-none transition-colors placeholder:text-muted/65 focus:border-primary";

  return (
    <>
      <form
        className="waitlist-form grid gap-4"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input
          aria-hidden="true"
          autoComplete="off"
          className="hidden"
          name="botcheck"
          tabIndex="-1"
          type="checkbox"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-semibold">
            Work email
            <input
              className={fieldClass}
              name="email"
              placeholder="you@company.com"
              required
              type="email"
            />
          </label>
          <label className="text-xs font-semibold">
            Company
            <input
              className={fieldClass}
              name="company"
              placeholder="Company name"
              required
            />
          </label>
          <label className="text-xs font-semibold">
            Role
            <select className={fieldClass} defaultValue="" name="role" required>
              <option disabled value="">
                Select your role
              </option>
              <option>Brand team</option>
              <option>Agency</option>
              <option>Creative strategy</option>
              <option>Media buying</option>
              <option>Other</option>
            </select>
          </label>
          <label className="text-xs font-semibold">
            Approx. monthly audio spend
            <select
              className={fieldClass}
              defaultValue=""
              name="spend"
              required
            >
              <option disabled value="">
                Select a range
              </option>
              <option>Pre-launch / exploring</option>
              <option>Under ₹5 lakh</option>
              <option>₹5–20 lakh</option>
              <option>₹20 lakh+</option>
            </select>
          </label>
        </div>
        <button
          className="mt-2 inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 bg-text px-7 text-sm font-semibold text-surface transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
          disabled={status === "submitting"}
          type="submit"
        >
          {status === "submitting" ? "Joining…" : "Join the waitlist"}{" "}
          <ArrowIcon />
        </button>
        <p
          aria-live="polite"
          className={`min-h-5 text-xs leading-5 ${status === "error" ? "text-accent" : "text-muted"}`}
        >
          {status === "error"
            ? errorMessage
            : "Join for product updates and early testing opportunities. Your details stay private."}
        </p>
      </form>

      {status === "success" && (
        <div
          aria-labelledby="waitlist-success-title"
          aria-modal="true"
          className="fixed inset-0 z-100 grid place-items-center  p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
          role="dialog"
        >
          <div className="waitlist-modal-enter relative w-full max-w-105 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
            <button
              aria-label="Close waitlist confirmation"
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-border text-lg text-muted transition-colors hover:border-text hover:text-text"
              onClick={closeModal}
              ref={closeButtonRef}
              type="button"
            >
              ×
            </button>
            <div className="px-8 pb-9 pt-9 text-center sm:px-10 sm:pb-10 sm:pt-10">
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
                <svg
                  aria-hidden="true"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="m6 12.5 3.7 3.7L18.5 7.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              <h2
                className="mt-7 text-4xl font-semibold leading-none tracking-[-0.05em]"
                id="waitlist-success-title"
              >
                Thank you.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                You’re on the Audio 90 waitlist.
              </p>
            </div>
            <div aria-hidden="true" className="h-1 bg-border">
              <span className="waitlist-modal-progress block h-full bg-primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Home() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const items = document.querySelectorAll(".reveal");
    root.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) =>
          entry.target.classList.toggle("is-visible", entry.isIntersecting),
        ),
      { rootMargin: "-3% 0px -6% 0px", threshold: 0.04 },
    );
    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text" id="top">
      <Navbar />
      <main id="main-content">
        <section
          className="hero-v4 relative isolate overflow-hidden bg-hero text-white"
          id="product"
          onPointerLeave={(event) => {
            event.currentTarget.style.removeProperty("--pointer-x");
            event.currentTarget.style.removeProperty("--pointer-y");
            event.currentTarget.style.removeProperty("--studio-x");
            event.currentTarget.style.removeProperty("--studio-y");
          }}
          onPointerMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            const normalizedX = (event.clientX - bounds.left) / bounds.width;
            const normalizedY = (event.clientY - bounds.top) / bounds.height;
            event.currentTarget.style.setProperty(
              "--pointer-x",
              `${normalizedX * 100}%`,
            );
            event.currentTarget.style.setProperty(
              "--pointer-y",
              `${normalizedY * 100}%`,
            );
            event.currentTarget.style.setProperty(
              "--studio-x",
              (normalizedX * 2 - 1).toFixed(3),
            );
            event.currentTarget.style.setProperty(
              "--studio-y",
              (normalizedY * 2 - 1).toFixed(3),
            );
          }}
        >
          <div aria-hidden="true" className="hero-atmosphere absolute inset-0 -z-20" />
          <div className="mx-auto max-w-360 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
            <div className="hero-copy mx-auto text-center">
              <div className="relative z-10">
                <p className="hero-item font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-signal">
                  Direction before distribution
                </p>
                <h1 className="hero-item mx-auto mt-6 max-w-275 text-5xl font-semibold leading-[0.88] tracking-[-0.072em] text-balance sm:text-7xl lg:text-[6.9rem]">
                  Hear the stronger idea
                  <span className="hero-serif block font-normal text-signal">
                    before the market does.
                  </span>
                </h1>
                <p className="hero-item mx-auto mt-7 max-w-165 text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                  Compare two audio ads. Get a directional winner, the reason,
                  and the uncertainty—in a few working days.
                </p>
                <div className="hero-item mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    className="hero-primary-cta group inline-flex min-h-13 items-center justify-center gap-2 px-7 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                    href="#waitlist"
                  >
                    Join the waitlist <ArrowIcon />
                  </a>
                  <a
                    className="hero-secondary-cta inline-flex min-h-13 items-center justify-center px-7 text-sm font-semibold text-white transition-colors"
                    href="#demo"
                  >
                    Hear the A/B demo
                  </a>
                </div>
              </div>
            </div>
            <div className="hero-item hero-studio-wrap">
              <HeroSignalStudio />
            </div>
          </div>
        </section>

        <SignalMarquee />

        <AudioDemo />

        <section className="report-section story-section" id="report">
          <div className="report-scene mx-auto max-w-375 px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
            <div className="reveal story-heading mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Illustrative sample report
                </p>
                <h2 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">
                  Direction, reason, and uncertainty in one view.
                </h2>
              </div>
              <p className="text-sm leading-6 text-muted lg:col-span-4">
                Every campaign ID, percentage, profile, result, and calibration
                outcome below is illustrative sample data—not customer evidence.
              </p>
            </div>
            <div className="report-stage reveal">
              <ExperimentDashboard />
            </div>
            <div className="report-value-strip reveal grid sm:grid-cols-3">
              {[
                ["01", "Direction", "Know which creative to test first."],
                ["02", "Reason", "See what moved the modeled response."],
                ["03", "Uncertainty", "Keep disagreement visible before launch."],
              ].map(([number, title, detail]) => (
                <div className="report-value-item" key={number}>
                  <span className="font-mono text-[9px] font-semibold text-[var(--report-primary)]">{number}</span>
                  <div>
                    <p className="text-sm font-semibold text-text">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-text/70">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProcessSection />

        <MethodologySection />

        <section className="pilot-section" id="waitlist">
          <div className="mx-auto max-w-360 px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
            <div className="pilot-panel reveal grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:p-14">
              <div className="lg:col-span-6">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Join the waitlist
                </p>
                <h2 className="mt-5 max-w-180 text-4xl font-semibold leading-[0.96] tracking-[-0.055em] text-balance sm:text-6xl">
                  Help shape Audio 90.
                </h2>
                <p className="mt-6 max-w-125 text-base leading-7 text-muted">
                  Tell us a little about your team. You’ll be the first to hear
                  about product progress and early testing opportunities.
                </p>
              </div>
              <div className="pilot-form-shell lg:col-span-6"><WaitlistForm /></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface" id="about">
        <div className="mx-auto grid max-w-360 gap-6 px-5 py-9 sm:px-8 md:grid-cols-3 md:items-end lg:px-12">
          <div>
            <p className="font-semibold">Audio <span className="text-primary">90</span></p>
            <p className="mt-2 text-xs text-muted">Pre-market signals for audio creative.</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted md:justify-center">
            <a className="hover:text-text" href="#methodology">Methodology</a>
            <a className="hover:text-text" href="/privacy.html">Privacy</a>
            <a className="hover:text-text" href="/terms.html">Terms</a>
            <a className="hover:text-text" href="mailto:hello@audio90.in">Contact</a>
          </nav>
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted md:text-right">
            Estimate · validate · learn
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
