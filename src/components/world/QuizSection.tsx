import { useState } from "react";
import { QUESTIONS, type Answer } from "@/lib/quiz-data";
import { Star } from "./Decor";

const CARD_BG = ["bg-pink", "bg-sky", "bg-butter", "bg-lavender"];

export function ProgressIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm font-bold">
        <span>question {current + 1} of {total}</span>
        <span className="font-hand text-lg">{Math.round(((current + 1) / total) * 100)}% bloomed</span>
      </div>
      <div className="relative h-4 rounded-full border-2 border-berry bg-card" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={current + 1}>
        <div className="h-full rounded-full bg-pink transition-all duration-500" style={{ width: `${((current + 1) / total) * 100}%` }} />
        <div className="absolute inset-0 flex items-center justify-between px-0.5">
          {Array.from({ length: total }).map((_, i) => (
            <Star key={i} size={i <= current ? 16 : 11} fill={i <= current ? "#FFF0A8" : "#FFFFFF"} className="transition-all" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function AnswerOption({ answer, index, selected, onSelect }: { answer: Answer; index: number; selected: boolean; onSelect: () => void }) {
  const [burst, setBurst] = useState(0);
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => { onSelect(); setBurst((b) => b + 1); }}
      className={`group relative flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:rotate-[-0.6deg] ${CARD_BG[index]} ${selected ? "sticker animate-pop border-berry ring-4 ring-primary/40" : "border-berry/30 shadow-sm"}`}
      key={selected ? `s${burst}` : "n"}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-berry bg-card text-2xl transition-transform group-hover:scale-110" aria-hidden>{answer.emoji}</span>
      <span className="font-semibold leading-snug">{answer.text}</span>
      {selected && <span className="ml-auto shrink-0 text-xl" aria-hidden>💗</span>}
      <span className="pointer-events-none absolute right-3 top-2 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>✨</span>
      {selected && burst > 0 && (
        <span className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden>
          {Array.from({ length: 8 }).map((_, i) => {
            const ang = (i / 8) * Math.PI * 2;
            return <span key={`${burst}-${i}`} className="absolute animate-burst text-sm" style={{ ["--dx" as string]: `${Math.cos(ang) * 60}px`, ["--dy" as string]: `${Math.sin(ang) * 40}px` }}>✦</span>;
          })}
        </span>
      )}
    </button>
  );
}

export function QuestionCard({ index, selected, onSelect }: { index: number; selected: number | undefined; onSelect: (i: number) => void }) {
  const q = QUESTIONS[index];
  return (
    <div key={index} className="animate-fade-up">
      <h2 className="mb-6 text-center text-2xl font-semibold leading-tight sm:text-4xl">{q.prompt}</h2>
      <div role="radiogroup" aria-label={q.prompt} className="grid gap-3 sm:grid-cols-2">
        {q.answers.map((a, i) => (
          <AnswerOption key={i} answer={a} index={i} selected={selected === i} onSelect={() => onSelect(i)} />
        ))}
      </div>
    </div>
  );
}

export function QuizSection({ answers, setAnswers, onFinish, onRestart }: { answers: number[]; setAnswers: (a: number[]) => void; onFinish: () => void; onRestart: () => void }) {
  const [step, setStep] = useState(0);
  const total = QUESTIONS.length;
  const selected = answers[step];
  const choose = (i: number) => { const next = [...answers]; next[step] = i; setAnswers(next); };
  const next = () => (step === total - 1 ? onFinish() : setStep(step + 1));

  return (
    <section className="dotted-paper relative min-h-[100svh] px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl animate-fade-up">
        <div className="sticker rounded-[2rem] bg-card p-5 sm:p-9">
          <ProgressIndicator current={step} total={total} />
          <div className="mt-8"><QuestionCard index={step} selected={selected} onSelect={choose} /></div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button onClick={() => setStep(step - 1)} disabled={step === 0} className="rounded-full border-2 border-berry bg-card px-5 py-2.5 font-bold transition hover:bg-muted disabled:opacity-40">← back</button>
            <button onClick={() => { setStep(0); onRestart(); }} className="font-hand text-xl underline decoration-wavy underline-offset-4">start over</button>
            <button onClick={next} disabled={selected === undefined} className="sticker rounded-full bg-primary px-6 py-2.5 font-bold text-primary-foreground transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-40 disabled:shadow-none">
              {step === total - 1 ? "reveal my world ✨" : "next →"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
