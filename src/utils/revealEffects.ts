import type { CardDirection } from "../types/tarot";

export type RevealEffectTone = "positive" | "caution";

export const REVEAL_FOCUS_DURATION_MS = 420;
export const REVEAL_HOLD_DURATION_MS = 620;
export const REVEAL_SETTLE_DURATION_MS = 560;
export const REVEAL_STEP_INTERVAL_MS = 1820;

export function getRevealEffectTone(direction: CardDirection): RevealEffectTone {
  return direction === "upright" ? "positive" : "caution";
}

export function getRevealTiming(index: number) {
  const focusAtMs = index * REVEAL_STEP_INTERVAL_MS;

  return {
    focusAtMs,
    settleAtMs: focusAtMs + REVEAL_FOCUS_DURATION_MS + REVEAL_HOLD_DURATION_MS + REVEAL_SETTLE_DURATION_MS
  };
}
