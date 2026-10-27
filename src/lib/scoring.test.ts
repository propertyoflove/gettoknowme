import { describe, expect, it } from "vitest";
import { scoreQuiz } from "./scoring";

describe("scoreQuiz", () => {
  it("all first answers → sunny daisy / summer / butter yellow", () => {
    const r = scoreQuiz(Array(10).fill(0));
    expect(r.scores.flower.daisy).toBeGreaterThan(0);
    expect(r.season).toBe("spring");
  });
  it("all fourth answers → lavender-ish winter world", () => {
    const r = scoreQuiz(Array(10).fill(3));
    expect(r.flower).toBe("lavender");
    expect(r.color).toBe("lavender");
  });
  it("is deterministic and differs by answers", () => {
    const a = scoreQuiz([1, 1, 1, 2, 0, 3, 3, 3, 3, 3]);
    expect(scoreQuiz([1, 1, 1, 2, 0, 3, 3, 3, 3, 3])).toEqual(a);
    expect(scoreQuiz(Array(10).fill(2)).flower).not.toBe(scoreQuiz(Array(10).fill(3)).flower);
  });
  it("breaks ties by latest primary vote", () => {
    // only q1: answer 0 gives daisy 3; q2 answer 0 gives rose 3 → tie, rose (later) wins
    expect(scoreQuiz([0, 0]).flower).toBe("rose");
  });
});
