import { useEffect, useRef, useState } from "react";
import { SURPRISES } from "@/lib/quiz-data";
import { FlowerIllustration, STICKERS, Star } from "./Decor";

export function RevealTransition() {
  const pieces = ["#FFC6DF", "#C6E4FF", "#FFF0A8", "#E5D5FF", "#D9F4DC"];
  return (
    <section className="fixed inset-0 z-40 grid place-items-center overflow-hidden bg-dreamsky" aria-live="polite">
      {Array.from({ length: 36 }).map((_, i) => (
        <span key={i} className="absolute top-0 h-3 w-2 animate-confetti rounded-sm border border-berry/40" style={{ left: `${(i * 37) % 100}%`, background: pieces[i % 5], animationDelay: `${(i % 9) * 0.12}s` }} aria-hidden />
      ))}
      <div className="text-center">
        <div className="relative mx-auto h-40 w-40">
          <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: "3s" }}>
            {[0, 1, 2, 3, 4, 5].map((i) => <Star key={i} size={20} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${i * 60}deg) translateY(-70px)` }} />)}
          </div>
          <FlowerIllustration flower="daisy" size={110} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-bob" />
        </div>
        <p className="mt-4 font-display text-2xl font-semibold sm:text-3xl">your little world is taking shape...</p>
      </div>
    </section>
  );
}

export function SurpriseMessage() {
  const [msg, setMsg] = useState<string | null>(null);
  const last = useRef(-1);
  const reveal = () => {
    let i = Math.floor(Math.random() * SURPRISES.length);
    if (i === last.current) i = (i + 1) % SURPRISES.length;
    last.current = i;
    setMsg(SURPRISES[i]);
  };
  return (
    <div className="fixed bottom-4 left-4 z-30 flex max-w-[calc(100vw-2rem)] flex-col items-start gap-2">
      {msg && (
        <div role="status" className="sticker max-w-xs animate-fade-up rounded-2xl bg-card p-3 text-sm">
          <div className="flex gap-2"><span className="flex-1">{msg}</span><button onClick={() => setMsg(null)} aria-label="close surprise" className="font-bold">×</button></div>
        </div>
      )}
      <button onClick={reveal} className="sticker rounded-full bg-butter px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 hover:rotate-2">🎁 a little surprise</button>
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0 })} aria-label="back to top" className="sticker fixed bottom-4 right-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-sky text-xl transition hover:-translate-y-1">↑</button>
  );
}

export function SparkleCursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lastT = 0;
    const colors = ["#FF9EC4", "#8FB8FF", "#FFD45C", "#B79CFF"];
    const on = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastT < 60) return;
      lastT = now;
      const s = document.createElement("span");
      s.textContent = "✦";
      s.setAttribute("aria-hidden", "true");
      Object.assign(s.style, { position: "fixed", left: `${e.clientX}px`, top: `${e.clientY}px`, pointerEvents: "none", zIndex: "60", color: colors[Math.floor(now) % 4], fontSize: "12px", transition: "transform .7s ease-out, opacity .7s ease-out" });
      document.body.appendChild(s);
      requestAnimationFrame(() => { s.style.transform = `translate(${(Math.random() - 0.5) * 20}px, 18px) scale(.4)`; s.style.opacity = "0"; });
      setTimeout(() => s.remove(), 750);
    };
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, []);
  return null;
}

export function Footer() {
  const [pos, setPos] = useState<{ l: number; r: number }[]>([]);
  useEffect(() => { setPos(STICKERS.map(() => ({ l: Math.random() * 90, r: (Math.random() - 0.5) * 30 }))); }, []);
  return (
    <footer className="relative overflow-hidden border-t-[2.5px] border-berry bg-strawberry px-4 pb-24 pt-10 text-center">
      <p className="font-hand text-xl">your sticker collection</p>
      <div className="mx-auto mt-3 flex max-w-xl flex-wrap justify-center gap-3">
        {STICKERS.map((s, i) => (
          <span key={s} className="sticker grid h-14 w-14 place-items-center rounded-full bg-card text-2xl transition hover:-translate-y-1 hover:rotate-12" style={{ transform: pos[i] ? `rotate(${pos[i].r}deg)` : undefined }}>{s}</span>
        ))}
      </div>
      <p className="mt-8 text-sm font-semibold">made with pastel skies, tiny flowers & a little bit of magic.</p>
    </footer>
  );
}
