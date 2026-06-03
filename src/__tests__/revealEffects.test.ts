import { describe, expect, it } from "vitest";

import { getRevealEffectTone, getRevealTiming } from "../utils/revealEffects";

describe("revealEffects", () => {
  it("uses a warm positive tone for upright cards", () => {
    expect(getRevealEffectTone("upright")).toBe("positive");
  });

  it("uses a clear caution tone for reversed cards", () => {
    expect(getRevealEffectTone("reversed")).toBe("caution");
  });

  it("reveals selected cards one by one in order", () => {
    expect(getRevealTiming(0).focusAtMs).toBeLessThan(getRevealTiming(1).focusAtMs);
    expect(getRevealTiming(1).focusAtMs).toBeLessThan(getRevealTiming(2).focusAtMs);
    expect(getRevealTiming(2).settleAtMs).toBeGreaterThan(getRevealTiming(2).focusAtMs);
  });
});
