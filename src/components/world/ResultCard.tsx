import { forwardRef } from "react";
import { COLOR_INFO, FLOWER_INFO, SEASON_INFO, type ColorId, type SeasonId } from "@/lib/quiz-data";
import type { QuizResult } from "@/lib/scoring";
import { Butterfly, FlowerIllustration, Heart, Star } from "./Decor";

export function SeasonBadge({ season }: { season: SeasonId }) {
  const s = SEASON_INFO[season];
  return (
    <div className="sticker -rotate-1 rounded-2xl p-4" style={{ background: s.tint }}>
      <p className="font-hand text-xl">your season is...</p>
      <p className="flex items-center gap-2 font-display text-3xl font-semibold"><span aria-hidden>{s.emoji}</span>{s.name}</p>
      <p className="mt-1 text-sm leading-relaxed">{s.text}</p>
    </div>
  );
}

export function ColorBadge({ color }: { color: ColorId }) {
  const c = COLOR_INFO[color];
  return (
    <div className="sticker rotate-1 rounded-2xl bg-card p-4">
      <p className="font-hand text-xl">your color is...</p>
      <p className="flex items-center gap-2 font-display text-3xl font-semibold">
        <span className="inline-block h-8 w-8 rounded-full border-2 border-berry" style={{ background: c.hex }} aria-hidden />{c.name}
      </p>
      <p className="mt-1 text-sm leading-relaxed">{c.text}</p>
    </div>
  );
}

export const ResultCard = forwardRef<HTMLDivElement, { result: QuizResult }>(function ResultCard({ result }, ref) {
  const f = FLOWER_INFO[result.flower];
  const bg = `linear-gradient(160deg, ${f.bg} 0%, ${COLOR_INFO[result.color].hex} 55%, ${SEASON_INFO[result.season].tint} 100%)`;
  return (
    <div ref={ref} className="relative overflow-hidden rounded-[2rem] border-[3px] border-berry p-5 text-berry sm:p-8" style={{ background: bg }}>
      <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border-2 border-dashed border-berry/40" aria-hidden />
      <Star className="absolute left-6 top-6 animate-twinkle" />
      <Star size={14} className="absolute right-10 top-20 animate-twinkle" style={{ animationDelay: ".8s" }} />
      <Heart className="absolute bottom-8 left-8 animate-bob" />
      <Butterfly size={34} className="absolute right-6 top-6 animate-bob" />
      <div className="relative">
        <p className="text-center font-hand text-xl">a little world of you</p>
        <div className="mt-2 flex flex-col items-center">
          <div className="grid place-items-center rounded-full border-[3px] border-berry bg-card/70 p-3">
            <FlowerIllustration flower={result.flower} size={190} />
          </div>
          <span className="sticker -mt-4 rotate-[-3deg] rounded-full bg-card px-4 py-1 font-hand text-xl">your flower is...</span>
          <h2 className="mt-2 text-center text-5xl font-semibold sm:text-6xl">{f.name}</h2>
          <p className="mt-1 text-center font-bold">{f.tagline}</p>
        </div>
        <div className="mt-6 rounded-2xl border-2 border-berry bg-card/80 p-4">
          <p className="font-hand text-xl">a little story about you</p>
          <p className="mt-1 leading-relaxed">{f.story}</p>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <SeasonBadge season={result.season} />
          <ColorBadge color={result.color} />
        </div>
        <div className="mt-5 rounded-2xl border-2 border-dashed border-berry bg-butter/80 p-4 text-center">
          <p className="font-hand text-xl">a little note for you 💌</p>
          <p className="font-display text-lg font-medium">{f.note}</p>
        </div>
      </div>
    </div>
  );
});
