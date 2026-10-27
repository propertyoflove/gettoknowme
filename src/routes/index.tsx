import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { HeroSection } from "@/components/world/HeroSection";
import { QuizSection } from "@/components/world/QuizSection";
import { ResultCard } from "@/components/world/ResultCard";
import { BackToTop, Footer, RevealTransition, SparkleCursor, SurpriseMessage } from "@/components/world/Extras";
import { scoreQuiz, type QuizResult } from "@/lib/scoring";
import { COLOR_INFO, FLOWER_INFO, SEASON_INFO } from "@/lib/quiz-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "a little world of you — flower, season & color quiz" },
      { name: "description", content: "a whimsical pastel quiz that discovers the flower, season, and color that feel a little like you." },
      { property: "og:title", content: "a little world of you" },
      { property: "og:description", content: "if your soul were a little garden, what would be blooming?" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Stage = "hero" | "quiz" | "reveal" | "result";

function Index() {
  const [stage, setStage] = useState<Stage>("hero");
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [quizKey, setQuizKey] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [stage]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2800); return () => clearTimeout(t); }, [toast]);

  const finish = () => {
    setResult(scoreQuiz(answers));
    setStage("reveal");
    setTimeout(() => setStage("result"), 2200);
  };
  const restart = () => { setAnswers([]); setResult(null); setQuizKey((k) => k + 1); setStage("quiz"); };

  const summary = (r: QuizResult) =>
    `my little world 🌸\nflower: ${FLOWER_INFO[r.flower].name}\nseason: ${SEASON_INFO[r.season].name} ${SEASON_INFO[r.season].emoji}\ncolor: ${COLOR_INFO[r.color].name}\n\n"${FLOWER_INFO[r.flower].note}"\n\nfind yours at ${window.location.origin}`;

  const save = async () => {
    if (!cardRef.current || !result) return;
    try {
      await document.fonts.ready;
      const url = await toPng(cardRef.current, { pixelRatio: 3, cacheBust: true });
      const link = document.createElement("a");
      link.download = `my-little-world-${result.flower}.png`;
      link.href = url;
      link.click();
      setToast("saved! your little world is in your downloads 💾");
    } catch {
      setToast("hmm, saving didn't work here — try a screenshot instead 📸");
    }
  };

  const share = async () => {
    if (!result) return;
    const text = summary(result);
    try {
      if (navigator.share) { await navigator.share({ title: "a little world of you", text }); return; }
      await navigator.clipboard.writeText(text);
      setToast("copied your little world to the clipboard 💌");
    } catch (e) {
      if ((e as Error)?.name === "AbortError") return;
      try { await navigator.clipboard.writeText(text); setToast("copied your little world to the clipboard 💌"); }
      catch { setToast("sharing isn't available here — try saving the image instead"); }
    }
  };

  return (
    <main className="min-h-screen">
      <SparkleCursor />
      {stage === "hero" && <div className="animate-fade-up"><HeroSection onStart={() => setStage("quiz")} /></div>}
      {stage === "quiz" && <QuizSection key={quizKey} answers={answers} setAnswers={setAnswers} onFinish={finish} onRestart={() => setAnswers([])} />}
      {stage === "reveal" && <RevealTransition />}
      {stage === "result" && result && (
        <section className="dotted-paper min-h-screen px-4 py-10 sm:py-14">
          <div className="mx-auto max-w-2xl animate-fade-up">
            <div className="mb-6 text-center">
              <h1 className="text-4xl font-semibold sm:text-6xl">we found your little world!</h1>
              <p className="mt-2 font-hand text-2xl">a flower, a season, and a color that tell a little story about you.</p>
            </div>
            <ResultCard ref={cardRef} result={result} />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={restart} className="rounded-full border-2 border-berry bg-card px-5 py-3 font-bold transition hover:-translate-y-0.5 hover:bg-muted">↺ take the quiz again</button>
              <button onClick={save} className="sticker rounded-full bg-sky px-5 py-3 font-bold transition hover:-translate-y-0.5">💾 save my little world</button>
              <button onClick={share} className="sticker rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground transition hover:-translate-y-0.5">💌 share my little world</button>
            </div>
          </div>
        </section>
      )}
      {stage !== "reveal" && <Footer />}
      <SurpriseMessage />
      <BackToTop />
      {toast && <div role="status" className="sticker fixed left-1/2 top-4 z-50 -translate-x-1/2 animate-fade-up rounded-full bg-card px-5 py-2 text-sm font-bold">{toast}</div>}
    </main>
  );
}
