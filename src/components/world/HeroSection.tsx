import { useEffect, useRef } from "react";
import { Butterfly, Cloud, FlowerIllustration, Heart, Star, Sun } from "./Decor";
import type { FlowerId } from "@/lib/quiz-data";

const GARDEN: { f: FlowerId; s: number; delay: string }[] = [
  { f: "tulip", s: 110, delay: "0s" }, { f: "daisy", s: 140, delay: ".6s" }, { f: "sunflower", s: 170, delay: "1.2s" },
  { f: "cherry", s: 140, delay: ".3s" }, { f: "forgetmenot", s: 110, delay: ".9s" },
];
const STARS = [[8, 18], [20, 8], [80, 12], [92, 26], [70, 34], [14, 44], [88, 50], [40, 6], [60, 20]];

export function HeroSection({ onStart }: { onStart: () => void }) {
  const layer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      if (!layer.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      layer.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-dreamsky">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Cloud width={140} className="absolute top-[8%] animate-drift" style={{ animationDuration: "55s" }} />
        <Cloud width={90} className="absolute top-[22%] animate-drift" style={{ animationDuration: "38s", animationDelay: "-14s" }} />
        <Cloud width={120} className="absolute top-[40%] animate-drift" style={{ animationDuration: "70s", animationDelay: "-40s" }} />
        <div ref={layer} className="absolute inset-0 transition-transform duration-300 ease-out">
          {STARS.map(([l, t], i) => (
            <Star key={i} size={14 + (i % 3) * 6} className="absolute animate-twinkle" style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${i * 0.37}s` }} />
          ))}
          <Sun className="absolute right-[6%] top-[6%] w-20 sm:w-28" />
          <span className="absolute left-[5%] top-[30%] text-3xl animate-bob">🍓</span>
          <span className="absolute right-[12%] top-[44%] text-2xl animate-bob" style={{ animationDelay: "1s" }}>🎀</span>
        </div>
        <Butterfly className="absolute left-[12%] top-[52%] animate-flutter" />
        <Butterfly color="#FFF0A8" size={32} className="absolute right-[20%] top-[18%] animate-flutter" style={{ animationDelay: "-3s" }} />
        {[15, 35, 62, 84].map((l, i) => (
          <Heart key={l} size={16 + i * 2} className="absolute bottom-[10%] animate-rise" style={{ left: `${l}%`, animationDelay: `${i * 2.2}s` }} />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-5 pb-56 pt-16 text-center">
        <span className="sticker mb-6 inline-flex -rotate-2 items-center gap-2 rounded-full bg-butter px-4 py-1.5 text-sm font-bold">
          <Star size={14} fill="#FFC6DF" /> your little universe awaits
        </span>
        <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          a little world <span className="relative inline-block text-primary">of you<Heart size={26} className="absolute -right-6 -top-3 animate-bob" /></span>
        </h1>
        <p className="mt-5 font-hand text-2xl sm:text-3xl">if your soul were a little garden, what would be blooming?</p>
        <p className="mt-3 max-w-md text-base text-muted-foreground sm:text-lg">
          answer a few little questions and discover the flower, season, and color that feel a little like you.
        </p>
        <button onClick={onStart} className="sticker mt-8 rounded-full bg-primary px-8 py-4 font-display text-lg font-semibold text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] active:translate-y-0">
          let's find your little world! ✿
        </button>
        <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-1 font-hand text-lg text-muted-foreground">
          <span>made of daydreams & pastel skies</span><span aria-hidden>·</span>
          <span>a tiny quiz for a very special you</span><span aria-hidden>·</span>
          <span>every little thing tells a story</span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0" aria-hidden>
        <div className="relative mx-auto flex max-w-4xl items-end justify-center gap-0 sm:gap-4">
          {GARDEN.map((g, i) => (
            <FlowerIllustration key={g.f} flower={g.f} size={g.s} className={`animate-bob ${i === 0 || i === 4 ? "hidden sm:block" : ""}`} style={{ animationDelay: g.delay, marginBottom: -10 }} />
          ))}
        </div>
        <div className="h-10 rounded-t-[50%] border-t-[2.5px] border-berry bg-mint" />
      </div>
    </section>
  );
}
