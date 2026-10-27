import { COLORS, FLOWERS, QUESTIONS, SEASONS, type ColorId, type FlowerId, type SeasonId } from "./quiz-data";

export const PRIMARY = 3;
export const SECONDARY = 1;

export interface QuizResult {
  flower: FlowerId;
  season: SeasonId;
  color: ColorId;
  scores: { flower: Record<string, number>; season: Record<string, number>; color: Record<string, number> };
}

const zero = <T extends string>(keys: readonly T[]) => Object.fromEntries(keys.map((k) => [k, 0])) as Record<T, number>;

/**
 * Tie-breaking rule: when several outcomes share the top score, the one whose
 * primary vote came in the LATEST question wins (the most recent feeling counts most).
 * If still tied (no primary votes), canonical list order decides.
 */
function pick<T extends string>(keys: readonly T[], scores: Record<T, number>, lastPrimary: Record<T, number>): T {
  return [...keys].sort((x, y) => scores[y] - scores[x] || lastPrimary[y] - lastPrimary[x] || keys.indexOf(x) - keys.indexOf(y))[0];
}

/** answers[i] = index of chosen option for question i. */
export function scoreQuiz(answers: number[]): QuizResult {
  const f = zero(FLOWERS), s = zero(SEASONS), c = zero(COLORS);
  const lf = zero(FLOWERS), ls = zero(SEASONS), lc = zero(COLORS);
  answers.forEach((choice, qi) => {
    const ans = QUESTIONS[qi]?.answers[choice];
    if (!ans) return;
    f[ans.flower[0]] += PRIMARY; f[ans.flower[1]] += SECONDARY; lf[ans.flower[0]] = qi + 1;
    s[ans.season[0]] += PRIMARY; s[ans.season[1]] += SECONDARY; ls[ans.season[0]] = qi + 1;
    c[ans.color[0]] += PRIMARY; c[ans.color[1]] += SECONDARY; lc[ans.color[0]] = qi + 1;
  });
  return { flower: pick(FLOWERS, f, lf), season: pick(SEASONS, s, ls), color: pick(COLORS, c, lc), scores: { flower: f, season: s, color: c } };
}
