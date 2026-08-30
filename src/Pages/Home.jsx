import { useEffect, useRef, useState } from "react";
import Navbar from "../Reusable/Navbar/Navbar";

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
  ["Message clarity", "78", "var(--primary)"],
  ["Offer recall", "71", "var(--warning)"],
  ["Skip likelihood", "32", "var(--accent)"],
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

function SignalCanvas({ phase }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    const context = canvas.getContext("2d");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const styles = getComputedStyle(document.documentElement);
    const signal = styles.getPropertyValue("--signal").trim();
    const primary = styles.getPropertyValue("--primary").trim();
    const pointer = { x: 0.5, y: 0.5 };
    let width = 0;
    let height = 0;
    let frame;
    let isVisible = true;
    let isRunning = false;

    const cubicPoint = (path, progress) => {
      const inverse = 1 - progress;
      return {
        x:
          inverse ** 3 * path[0].x +
          3 * inverse ** 2 * progress * path[1].x +
          3 * inverse * progress ** 2 * path[2].x +
          progress ** 3 * path[3].x,
        y:
          inverse ** 3 * path[0].y +
          3 * inverse ** 2 * progress * path[1].y +
          3 * inverse * progress ** 2 * path[2].y +
          progress ** 3 * path[3].y,
      };
    };

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (timestamp = 0) => {
      if (!width || !height) return;
      const time = reducedMotion ? 0 : timestamp;
      const shiftX = (pointer.x - 0.5) * 14;
      const shiftY = (pointer.y - 0.5) * 10;
      const nodes = {
        a: { x: width * 0.15 + shiftX * 0.2, y: height * 0.32 + shiftY * 0.2 },
        b: { x: width * 0.15 - shiftX * 0.15, y: height * 0.7 - shiftY * 0.15 },
        audience: { x: width * 0.52 + shiftX * 0.55, y: height * 0.51 + shiftY * 0.5 },
        result: { x: width * 0.84 + shiftX * 0.25, y: height * 0.51 + shiftY * 0.25 },
      };
      const paths = [
        [
          nodes.a,
          { x: width * 0.3, y: nodes.a.y },
          { x: width * 0.38, y: nodes.audience.y - height * 0.09 },
          nodes.audience,
        ],
        [
          nodes.b,
          { x: width * 0.3, y: nodes.b.y },
          { x: width * 0.38, y: nodes.audience.y + height * 0.09 },
          nodes.audience,
        ],
        [
          nodes.audience,
          { x: width * 0.64, y: nodes.audience.y },
          { x: width * 0.72, y: nodes.result.y },
          nodes.result,
        ],
      ];
      const activePathCount = phase === "decide" ? 3 : 2;

      context.clearRect(0, 0, width, height);
      context.save();

      context.strokeStyle = "rgba(201, 245, 122, 0.055)";
      context.lineWidth = 1;
      const gridSize = width < 420 ? 24 : 30;
      const gridOffsetX = (shiftX * -0.45) % gridSize;
      const gridOffsetY = (shiftY * -0.45) % gridSize;
      for (let x = gridOffsetX; x < width; x += gridSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = gridOffsetY; y < height; y += gridSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      paths.forEach((path, pathIndex) => {
        context.beginPath();
        context.moveTo(path[0].x, path[0].y);
        context.bezierCurveTo(
          path[1].x,
          path[1].y,
          path[2].x,
          path[2].y,
          path[3].x,
          path[3].y,
        );
        context.globalAlpha =
          pathIndex < activePathCount
            ? phase === "compare" && pathIndex < 2
              ? 0.72
              : 0.38
            : 0.12;
        context.strokeStyle = signal;
        context.lineWidth = pathIndex < activePathCount ? 1.35 : 1;
        context.setLineDash([4, 8]);
        context.lineDashOffset = reducedMotion ? 0 : -(time * 0.018);
        context.stroke();
        context.setLineDash([]);

        if (pathIndex >= activePathCount) return;
        const particleCount = phase === "model" && pathIndex < 2 ? 7 : 4;
        for (let particleIndex = 0; particleIndex < particleCount; particleIndex += 1) {
          const progress = reducedMotion
            ? (particleIndex + 1) / (particleCount + 1)
            : (time * 0.00018 + particleIndex / particleCount + pathIndex * 0.17) % 1;
          const point = cubicPoint(path, progress);
          context.beginPath();
          context.globalAlpha = 0.48 + Math.sin(progress * Math.PI) * 0.48;
          context.fillStyle = signal;
          context.shadowColor = signal;
          context.shadowBlur = 10;
          context.arc(point.x, point.y, pathIndex === 2 ? 2.4 : 2, 0, Math.PI * 2);
          context.fill();
        }
      });

      context.shadowBlur = 0;
      context.globalAlpha = phase === "model" ? 0.82 : 0.32;
      context.strokeStyle = phase === "model" ? signal : primary;
      context.lineWidth = 1;
      const ringPulse = reducedMotion ? 0 : Math.sin(time * 0.0014) * 4;
      [42, 62, 83].forEach((radius, index) => {
        context.beginPath();
        context.arc(
          nodes.audience.x,
          nodes.audience.y,
          radius + ringPulse * (index / 3),
          time * 0.00018 * (index + 1),
          Math.PI * (1.35 + index * 0.18),
        );
        context.stroke();
      });

      if (phase === "decide") {
        const pulse = reducedMotion ? 0 : (Math.sin(time * 0.003) + 1) * 0.5;
        context.beginPath();
        context.globalAlpha = 0.12 + pulse * 0.12;
        context.fillStyle = signal;
        context.arc(nodes.result.x, nodes.result.y, 48 + pulse * 9, 0, Math.PI * 2);
        context.fill();
      }

      context.restore();
    };

    const loop = (timestamp) => {
      if (!isRunning) return;
      draw(timestamp);
      frame = window.requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      isRunning = false;
      window.cancelAnimationFrame(frame);
    };
    const startLoop = () => {
      if (reducedMotion || !isVisible || document.hidden || isRunning) return;
      isRunning = true;
      frame = window.requestAnimationFrame(loop);
    };
    const handlePointerMove = (event) => {
      const bounds = container.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) / bounds.width;
      pointer.y = (event.clientY - bounds.top) / bounds.height;
    };
    const handlePointerLeave = () => {
      pointer.x = 0.5;
      pointer.y = 0.5;
    };
    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        if (reducedMotion) draw();
        else startLoop();
      } else {
        stopLoop();
      }
    });
    const handleVisibilityChange = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };

    resizeObserver.observe(container);
    visibilityObserver.observe(container);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resize();
    draw();
    startLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [phase]);

  return <canvas aria-hidden="true" className="scene-canvas" ref={canvasRef} />;
}

function SignalScene() {
  const phases = [
    {
      id: "compare",
      label: "Compare",
      status: "Creative inputs ready",
      detail: "Two finished cuts enter the same test.",
    },
    {
      id: "model",
      label: "Model",
      status: "Audience responding",
      detail: "Preference and disagreement form the signal.",
    },
    {
      id: "decide",
      label: "Decide",
      status: "Direction available",
      detail: "Creative B leads with medium confidence.",
    },
  ];
  const [activePhase, setActivePhase] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const phase = phases[activePhase];

  useEffect(() => {
    if (isManual) return undefined;
    const interval = window.setInterval(
      () => setActivePhase((current) => (current + 1) % phases.length),
      4200,
    );
    return () => window.clearInterval(interval);
  }, [isManual, phases.length]);

  return (
    <div className="signal-scene">
      <div className="flex items-center justify-between gap-4 px-5 pt-5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">
        <span>{phase.status}</span>
        <span className="inline-flex shrink-0 items-center gap-2 text-signal">
          <span className="scene-live-dot size-1.5 rounded-full bg-signal" /> Live signal
        </span>
      </div>
      <div className="scene-stage">
        <SignalCanvas phase={phase.id} />
        <div
          className={`scene-node scene-node-a ${phase.id === "compare" ? "is-active" : ""}`}
        >
          <span>A</span>
          <small>30 sec</small>
        </div>
        <div
          className={`scene-node scene-node-b ${phase.id === "compare" ? "is-active" : ""}`}
        >
          <span>B</span>
          <small>15 sec</small>
        </div>
        <div
          className={`scene-audience ${phase.id === "model" ? "is-active" : ""}`}
        >
          <div className="scene-audience-core">
            {Array.from({ length: 18 }, (_, index) => (
              <span key={index} style={{ "--dot-index": index }} />
            ))}
          </div>
          <small>Modeled audience</small>
        </div>
        <div
          className={`scene-result ${phase.id === "decide" ? "is-active" : ""}`}
        >
          <small>Direction</small>
          <strong>B</strong>
          <span>Medium confidence</span>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p aria-live="polite" className="px-5 py-3 text-xs text-white/58">
          {phase.detail}
        </p>
        <div className="grid grid-cols-3 border-t border-white/10">
          {phases.map((item, index) => (
            <button
              aria-pressed={activePhase === index}
              className={`scene-phase-button min-h-11 cursor-pointer border-white/10 px-2 font-mono text-[7px] uppercase tracking-[0.1em] not-last:border-r ${activePhase === index ? "is-active" : ""}`}
              key={item.id}
              onClick={() => {
                setActivePhase(index);
                setIsManual(true);
              }}
              type="button"
            >
              0{index + 1} · {item.label}
            </button>
          ))}
        </div>
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
    <section className="border-b border-border bg-surface" id="demo">
      <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end">
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

        <div className="reveal mt-12 grid overflow-hidden border border-text/20 bg-border lg:grid-cols-12">
          <div className="space-y-3 bg-bg p-4 sm:p-7 lg:col-span-7">
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
          <div className="bg-surface p-6 sm:p-8 lg:col-span-5">
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

function CreativeTestColumn() {
  return (
    <div className="bg-surface p-4 sm:p-6 lg:col-span-4">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
            Creative test
          </p>
          <h3 className="mt-1 text-lg font-semibold">A/B audio cuts</h3>
        </div>
        <span className="rounded-full bg-surface-light px-2.5 py-1 font-mono text-[9px] text-muted">
          Radio
        </span>
      </div>
      <div className="space-y-3">
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
      <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
        {["Hook", "Voice", "CTA"].map((item) => (
          <span
            className="rounded-lg border border-border px-2 py-2 text-center"
            key={item}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExperimentView() {
  return (
    <div className="grid gap-px bg-border lg:grid-cols-12">
      <CreativeTestColumn />
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
    <div className="grid gap-px bg-border lg:grid-cols-12">
      <div className="sticky top-18 z-20 flex items-center justify-between border-b border-primary/20 bg-surface px-4 py-3 shadow-sm lg:hidden">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
            Sample result
          </p>
          <p className="mt-1 text-sm font-semibold">Creative B leads</p>
        </div>
        <span className="font-mono text-[8px] uppercase text-warning">
          Medium confidence
        </span>
      </div>
      <CreativeTestColumn />
      <div className="bg-surface p-4 sm:p-6 lg:col-span-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
              Illustrative prediction
            </p>
            <h3 className="mt-2 text-2xl font-semibold">Creative B leads</h3>
          </div>
          <span className="rounded-full border border-warning/40 bg-warning/8 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-warning">
            Medium confidence
          </span>
        </div>
        <div className="mt-4 border border-primary/25 bg-primary/6 p-4 lg:hidden">
          <p className="text-sm font-semibold">Why B leads</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            The condensed cut reaches the event, date, and call to action
            sooner.
          </p>
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
                    "--bar-delay": `${index * 45}ms`,
                    backgroundColor:
                      index < 6 ? "var(--warning)" : "var(--primary)",
                    height: `${height}%`,
                    opacity: 0.5 + Math.abs(6 - index) * 0.035,
                  }}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between font-mono text-[8px] uppercase text-muted">
              <span>More likely A</span>
              <span>More likely B</span>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-bg/65 p-4">
            <p className="text-sm font-medium">Modeled audience</p>
            <div className="mt-5 grid grid-cols-8 gap-2">
              {Array.from({ length: 48 }, (_, index) => (
                <span
                  className="audience-dot aspect-square rounded-full"
                  key={index}
                  style={{
                    "--dot-delay": `${index * 28}ms`,
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
              <span>100 illustrative personas</span>
              <span>Texas · 18–54</span>
            </div>
          </div>
        </div>
        <div className="mt-3 hidden rounded-xl border border-border bg-bg/65 p-4 lg:block">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium">Why B leads</p>
            <span className="font-mono text-[9px] text-primary">
              Earlier message
            </span>
          </div>
          <p className="text-sm leading-6 text-muted">
            Listeners reach the event, date, and call to action sooner in the
            condensed cut.
          </p>
        </div>
      </div>
      <div className="bg-surface p-4 sm:p-6 lg:col-span-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
          Confidence summary
        </p>
        <div className="mt-6 flex justify-center">
          <div
            className="confidence-ring grid size-34 place-items-center rounded-full"
            style={{
              background:
                "conic-gradient(var(--primary) 0 67%, var(--surface-light) 67% 100%)",
            }}
          >
            <div className="grid size-25 place-items-center rounded-full bg-surface text-center">
              <div>
                <p className="text-4xl font-semibold">67%</p>
                <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                  panel preference
                </p>
              </div>
            </div>
          </div>
        </div>
        <details className="mt-6 border border-border bg-bg/65 lg:hidden">
          <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">
            Secondary metrics
          </summary>
          <div className="space-y-3 border-t border-border p-3">
            {resultMetrics.map(([label, value, color]) => (
              <div
                className="rounded-lg border border-border bg-surface p-3"
                key={label}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">{label}</span>
                  <span className="font-mono">{value}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-light">
                  <span
                    className="metric-bar block h-full rounded-full"
                    style={{ backgroundColor: color, width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </details>
        <div className="mt-6 hidden space-y-3 lg:block">
          {resultMetrics.map(([label, value, color]) => (
            <div
              className="rounded-lg border border-border bg-bg/65 p-3"
              key={label}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">{label}</span>
                <span className="font-mono">{value}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-light">
                <span
                  className="metric-bar block h-full rounded-full"
                  style={{ backgroundColor: color, width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 rounded-lg border border-warning/30 bg-warning/6 px-3 py-3 text-xs leading-5 text-muted">
          Illustrative modeled estimate—validate through a real campaign test.
        </p>
      </div>
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
    <div className="mockup-shell reveal overflow-hidden rounded-xl border border-text/20 bg-surface shadow-2xl shadow-black/10">
      <div className="flex min-h-14 items-center justify-between border-b border-border px-2 sm:px-6">
        <div aria-hidden="true" className="hidden gap-1.5 sm:flex sm:gap-2">
          <span className="size-2 rounded-full bg-accent sm:size-2.5" />
          <span className="size-2 rounded-full bg-warning sm:size-2.5" />
          <span className="size-2 rounded-full bg-primary/70 sm:size-2.5" />
        </div>
        <div
          aria-label="Experiment report views"
          className="flex min-h-13 flex-1 self-stretch font-mono text-[9px] uppercase tracking-[0.08em] text-muted sm:flex-none sm:text-xs sm:tracking-[0.16em]"
          role="tablist"
        >
          {tabs.map((tab) => (
            <button
              aria-controls={`report-panel-${tab}`}
              aria-selected={activeTab === tab}
              className={`report-tab flex min-h-12 flex-1 cursor-pointer items-center justify-center border-b-2 px-2 transition-colors sm:min-h-0 sm:flex-none sm:px-5 ${activeTab === tab ? "border-primary text-primary" : "border-transparent hover:text-text"}`}
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
        <span className="hidden font-mono text-[7px] text-muted sm:block sm:text-[9px]">
          Sample A90-024
        </span>
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

      <div className="flex flex-col gap-4 border-t border-border bg-bg/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
          <span>Illustrative sample data</span>
          <span>Panel · 100 modeled personas</span>
        </div>
        <button
          className="inline-flex cursor-pointer items-center justify-center gap-2 border border-border px-4 py-2 text-xs font-semibold transition-colors hover:border-text hover:bg-surface"
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
    <section className="border-b border-border bg-bg" id="process">
      <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end">
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
        <div className="reveal mt-12 grid border-l border-t border-text/20 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([number, title, detail]) => (
            <article className="step-card min-h-60 border-b border-r border-text/20 bg-surface p-6" key={number}>
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
    <section className="border-b border-border bg-bg" id="methodology">
      <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-primary">
            Honest by design
            </p>
            <h2 className="mt-5 max-w-220 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-balance sm:text-6xl">
              Useful direction without false certainty.
            </h2>
          </div>
          <p className="max-w-125 text-base leading-7 text-muted lg:col-span-4">
            Unreleased creative stays private, and retention terms are agreed
            before any pilot files are uploaded.
          </p>
        </div>

        <div className="reveal mt-12 grid gap-px border border-border bg-border lg:grid-cols-3">
          {principles.map(([title, detail], index) => (
            <article className="bg-surface p-6 sm:p-7" key={title}>
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

function PilotForm() {
  const [status, setStatus] = useState("idle");
  const pilotEmail = import.meta.env.VITE_PILOT_EMAIL || "hello@audio90.in";
  const endpoint = import.meta.env.VITE_PILOT_FORM_ENDPOINT;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (!endpoint) {
      const subject = encodeURIComponent(`Early test request from ${data.company}`);
      const body = encodeURIComponent(
        `Work email: ${data.email}\nCompany: ${data.company}\nRole: ${data.role}\nMonthly audio spend: ${data.spend}`,
      );
      window.location.href = `mailto:${pilotEmail}?subject=${subject}&body=${body}`;
      setStatus("email");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "mt-2 min-h-12 w-full border border-border bg-bg px-3 text-sm text-text outline-none transition-colors placeholder:text-muted/65 focus:border-primary";

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-semibold">
          Work email
          <input className={fieldClass} name="email" placeholder="you@company.com" required type="email" />
        </label>
        <label className="text-xs font-semibold">
          Company
          <input className={fieldClass} name="company" placeholder="Company name" required />
        </label>
        <label className="text-xs font-semibold">
          Role
          <select className={fieldClass} defaultValue="" name="role" required>
            <option disabled value="">Select your role</option>
            <option>Brand team</option>
            <option>Agency</option>
            <option>Creative strategy</option>
            <option>Media buying</option>
            <option>Other</option>
          </select>
        </label>
        <label className="text-xs font-semibold">
          Approx. monthly audio spend
          <select className={fieldClass} defaultValue="" name="spend" required>
            <option disabled value="">Select a range</option>
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
        {status === "submitting" ? "Sending…" : "Request an early test"} <ArrowIcon />
      </button>
      <p aria-live="polite" className="min-h-5 text-xs leading-5 text-muted">
        {status === "success" && "Thanks—your pilot request has been received."}
        {status === "email" && `Your email app is opening with a request addressed to ${pilotEmail}.`}
        {status === "error" && (
          <>We could not send the form. Email <a className="underline" href={`mailto:${pilotEmail}`}>{pilotEmail}</a>.</>
        )}
        {status === "idle" && "For brands and agencies testing paid audio creative. Your unreleased ads remain private."}
      </p>
    </form>
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
          className="relative isolate overflow-hidden border-b border-white/10 bg-hero text-white"
          id="product"
          onPointerLeave={(event) => {
            event.currentTarget.style.removeProperty("--pointer-x");
            event.currentTarget.style.removeProperty("--pointer-y");
          }}
          onPointerMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty(
              "--pointer-x",
              `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
            );
            event.currentTarget.style.setProperty(
              "--pointer-y",
              `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
            );
          }}
        >
          <div
            aria-hidden="true"
            className="hero-grid absolute inset-0 -z-20"
          />
          <div className="mx-auto max-w-360 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="hero-item font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-signal">
                  Direction before distribution
                </p>
                <h1 className="hero-item mt-6 max-w-210 text-5xl font-semibold leading-[0.9] tracking-[-0.065em] text-balance sm:text-7xl lg:text-[5.65rem]">
                  Hear the stronger idea
                  <span className="hero-serif block font-normal italic text-signal">
                    before the market does.
                  </span>
                </h1>
                <p className="hero-item mt-7 max-w-155 text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                  Compare two audio ads. Get a directional winner, the reason,
                  and the uncertainty—in a few working days.
                </p>
                <div className="hero-item mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    className="group inline-flex min-h-13 items-center justify-center gap-2 bg-signal px-6 text-sm font-semibold text-hero transition-transform hover:-translate-y-0.5"
                    href="#pilot"
                  >
                    Request an early test <ArrowIcon />
                  </a>
                  <a
                    className="inline-flex min-h-13 items-center justify-center border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:border-white/45 hover:bg-white/6"
                    href="#demo"
                  >
                    Hear the A/B demo
                  </a>
                </div>
              </div>
              <div className="hero-item lg:col-span-5">
                <SignalScene />
              </div>
            </div>
          </div>
        </section>

        <AudioDemo />

        <section className="border-b border-border bg-bg" id="report">
          <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="reveal mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
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
            <ExperimentDashboard />
            <div className="reveal grid border-x border-b border-text/20 bg-signal sm:grid-cols-3">
              {[
                ["01", "Direction", "Know which creative to test first."],
                ["02", "Reason", "See what moved the modeled response."],
                ["03", "Uncertainty", "Keep disagreement visible before launch."],
              ].map(([number, title, detail]) => (
                <div className="flex gap-4 border-text/20 p-5 not-last:border-b sm:not-last:border-b-0 sm:not-last:border-r" key={number}>
                  <span className="font-mono text-[9px] font-semibold text-text/60">{number}</span>
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

        <section className="bg-surface" id="pilot">
          <div className="mx-auto max-w-360 px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="reveal grid gap-10 border-y border-text/20 py-12 lg:grid-cols-12 lg:py-16">
              <div className="lg:col-span-6">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Limited early pilot
                </p>
                <h2 className="mt-5 max-w-180 text-4xl font-semibold leading-[0.96] tracking-[-0.055em] text-balance sm:text-6xl">
                  Have two audio ads ready?
                </h2>
                <p className="mt-6 max-w-125 text-base leading-7 text-muted">
                  Bring the creatives, target audience, and campaign context.
                  We’ll produce an early report showing what to test first, why
                  it leads, and where the result remains uncertain.
                </p>
              </div>
              <div className="lg:col-span-6"><PilotForm /></div>
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
