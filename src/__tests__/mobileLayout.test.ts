import { describe, expect, it } from "vitest";

import {
  getCardSelectContentWidth,
  getFanCardSize,
  getFanStageHeight,
  getFocusedResultCardSize,
  getMobileContentWidth,
  getResultCardSize,
  getSelectedSlotSize
} from "../utils/mobileLayout";

describe("mobileLayout", () => {
  it("keeps desktop web previews inside a phone-sized content width", () => {
    expect(getMobileContentWidth(1280)).toBe(430);
    expect(getMobileContentWidth(390)).toBe(390);
  });

  it("lets the card spread use more room on desktop web while staying mobile first", () => {
    expect(getCardSelectContentWidth(1280)).toBe(720);
    expect(getCardSelectContentWidth(390)).toBe(390);
  });

  it("fits all three result cards inside the visible phone frame", () => {
    const contentWidth = 390;
    const cardSize = getResultCardSize(contentWidth);
    const rowWidth = cardSize.width * 3 + 8 * 2 + 20;

    expect(rowWidth).toBeLessThanOrEqual(contentWidth);
    expect(cardSize.width).toBeGreaterThanOrEqual(118);
    expect(cardSize.height).toBe(Math.round(cardSize.width * 1.5));
  });

  it("uses a larger focused result card for the reveal animation", () => {
    const focusedCard = getFocusedResultCardSize(390);
    const settledCard = getResultCardSize(390);

    expect(focusedCard.width).toBeGreaterThan(settledCard.width);
    expect(focusedCard.width).toBeGreaterThanOrEqual(236);
    expect(focusedCard.height).toBe(Math.round(focusedCard.width * 1.5));
  });

  it("keeps the full-deck fan spread compact and tappable on phone width", () => {
    const deckCard = getFanCardSize(390);
    const fanStageHeight = getFanStageHeight(390);
    const slotCard = getSelectedSlotSize(390);

    expect(deckCard.width).toBeGreaterThanOrEqual(46);
    expect(deckCard.width).toBeLessThanOrEqual(62);
    expect(deckCard.height).toBe(Math.round(deckCard.width * 1.5));
    expect(fanStageHeight).toBeGreaterThanOrEqual(124);
    expect(slotCard.width).toBeGreaterThanOrEqual(96);
    expect(slotCard.height).toBe(Math.round(slotCard.width * 1.5));
  });
});
