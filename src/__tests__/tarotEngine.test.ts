import { describe, expect, it } from "vitest";

import { tarotCards } from "../data/tarotCards";
import {
  DEFAULT_DRAW_CANDIDATE_COUNT,
  createRandomCardCandidates,
  createRandomCardSelections,
  generateReading,
  resolveCardSelections
} from "../utils/tarotEngine";
import { fortuneCategories, fortuneCategoryLabels } from "../types/tarot";

const sequenceRandom = (values: number[]) => {
  let index = 0;
  return () => values[index++ % values.length];
};

describe("tarotEngine", () => {
  it("supports an entertainment-only lotto number category", () => {
    expect(fortuneCategories).toContain("lotto");
    expect(fortuneCategoryLabels.lotto).toBe("로또 번호");
  });

  it("ships the complete 78-card tarot deck with category meanings", () => {
    expect(tarotCards).toHaveLength(78);
    expect(tarotCards.filter((card) => card.arcana === "major")).toHaveLength(22);
    expect(tarotCards.filter((card) => card.arcana === "minor")).toHaveLength(56);

    for (const card of tarotCards) {
      for (const category of fortuneCategories) {
        const meaning = card.meanings[category];
        expect(meaning.upright.cardMeaning.length).toBeGreaterThan(0);
        expect(meaning.upright.currentSituation.length).toBeGreaterThan(0);
        expect(meaning.upright.summary.length).toBeGreaterThan(0);
        expect(meaning.upright.detail.length).toBeGreaterThan(0);
        expect(meaning.upright.advice.length).toBeGreaterThan(0);
        expect(meaning.reversed.cardMeaning.length).toBeGreaterThan(0);
        expect(meaning.reversed.currentSituation.length).toBeGreaterThan(0);
        expect(meaning.reversed.summary.length).toBeGreaterThan(0);
        expect(meaning.reversed.detail.length).toBeGreaterThan(0);
        expect(meaning.reversed.advice.length).toBeGreaterThan(0);
      }
    }
  });

  it("deals all seventy-eight candidate cards from the full deck before the user picks three", () => {
    const candidates = createRandomCardCandidates(
      DEFAULT_DRAW_CANDIDATE_COUNT,
      sequenceRandom([0.12, 0.75, 0.33, 0.91, 0.02, 0.6, 0.44, 0.18])
    );

    expect(candidates).toHaveLength(78);
    expect(new Set(candidates.map((selection) => selection.cardId)).size).toBe(78);
    expect(candidates.every((selection) => ["upright", "reversed"].includes(selection.direction))).toBe(true);
  });

  it("draws three unique cards with positions and random directions", () => {
    const selections = createRandomCardSelections(
      3,
      sequenceRandom([0.12, 0.75, 0.33, 0.91, 0.02, 0.6])
    );

    expect(selections).toHaveLength(3);
    expect(new Set(selections.map((selection) => selection.cardId)).size).toBe(3);
    expect(selections.map((selection) => selection.position)).toEqual([0, 1, 2]);
    expect(selections.every((selection) => ["upright", "reversed"].includes(selection.direction))).toBe(true);
  });

  it("generates a complete reading from internal card data", () => {
    const selections = resolveCardSelections([
      { cardId: tarotCards[0].id, direction: "upright", position: 0 },
      { cardId: tarotCards[1].id, direction: "reversed", position: 1 },
      { cardId: tarotCards[2].id, direction: "upright", position: 2 }
    ]);

    const reading = generateReading("love", selections, sequenceRandom([0, 0.5, 0.9]));

    expect(reading.freeSummary.length).toBeGreaterThan(10);
    expect(reading.storyTitle.length).toBeGreaterThan(8);
    expect(reading.detailedSummary.length).toBeGreaterThan(120);
    expect(reading.situationOverview.length).toBeGreaterThan(140);
    expect(reading.relatablePatterns).toHaveLength(3);
    expect(reading.relatablePatterns.every((item) => item.length > 20)).toBe(true);
    expect(reading.practicalNextSteps).toHaveLength(3);
    expect(reading.practicalNextSteps.every((item) => item.length > 20)).toBe(true);
    expect(reading.connectionReading).toContain(reading.cardDetails[0].cardNameKo);
    expect(reading.connectionReading).toContain(reading.cardDetails[1].cardNameKo);
    expect(reading.connectionReading).toContain(reading.cardDetails[2].cardNameKo);
    expect(reading.connectionReading).toMatch(/이어|때문|그래서|흐름/);
    expect(reading.actionItems).toHaveLength(3);
    expect(reading.actionItems.every((item) => item.length > 12)).toBe(true);
    expect(reading.avoidActions).toHaveLength(2);
    expect(reading.avoidActions.every((item) => item.length > 12)).toBe(true);
    expect(reading.timingHint.length).toBeGreaterThan(12);
    expect(reading.score).toBeGreaterThanOrEqual(35);
    expect(reading.score).toBeLessThanOrEqual(96);
    expect(reading.oneLineAdvice.length).toBeGreaterThan(5);
    for (const detail of reading.cardDetails) {
      expect(detail.cardMeaning).toContain("카드");
      expect(detail.currentSituation).toMatch(/지금|현재|오늘|요즘/);
      expect(detail.cardMeaning).not.toEqual(detail.currentSituation);
      expect(detail.situationExample).toMatch(/예를 들면|이를테면|쉽게 말해|현실적으로/);
      expect(detail.situationExample.length).toBeGreaterThan(70);
      expect(detail.whyThisMatters.length).toBeGreaterThan(50);
      expect(detail.nextStep.length).toBeGreaterThan(30);
    }
    expect(reading.freeSummary).not.toContain(`${fortuneCategoryLabels.love}은 ${reading.cardDetails[0].cardNameKo}는`);
    expect(reading.freeSummary).not.toContain("풍요을");
    expect(reading.oneLineAdvice).not.toContain("풍요을");
    expect(reading.oneLineAdvice).not.toContain("작은 확인과 따뜻한 표현");
    expect(JSON.stringify(reading)).not.toMatch(/풍요[은을]|돌파[은을]|조화[은을]/);
    expect(reading.cardDetails.map((detail) => detail.positionLabel)).toEqual([
      "현재 흐름",
      "숨은 원인",
      "앞으로의 방향"
    ]);
    expect(reading.overallFlow.length).toBeGreaterThan(10);
    expect(reading.caution.length).toBeGreaterThan(5);
    expect(reading.luckyColor.length).toBeGreaterThan(1);
    expect(reading.luckyNumber).toBeGreaterThanOrEqual(1);
    expect(reading.luckyNumber).toBeLessThanOrEqual(99);
  });

  it("generates unique lotto numbers from selected card information", () => {
    const selections = resolveCardSelections([
      { cardId: tarotCards[0].id, direction: "upright", position: 0 },
      { cardId: tarotCards[4].id, direction: "reversed", position: 1 },
      { cardId: tarotCards[8].id, direction: "upright", position: 2 }
    ]);

    const reading = generateReading("lotto", selections, () => 0.25);
    const lotteryNumbers = reading.lotteryNumbers ?? [];
    const lotteryBonusNumber = reading.lotteryBonusNumber ?? 0;

    expect(lotteryNumbers).toHaveLength(6);
    expect(new Set(lotteryNumbers).size).toBe(6);
    expect(lotteryNumbers).toEqual([...lotteryNumbers].sort((a, b) => a - b));
    expect(lotteryNumbers.every((number) => number >= 1 && number <= 45)).toBe(true);
    expect(lotteryBonusNumber).toBeGreaterThanOrEqual(1);
    expect(lotteryBonusNumber).toBeLessThanOrEqual(45);
    expect(lotteryNumbers).not.toContain(lotteryBonusNumber);
    expect(reading.lotteryNote).toContain("재미용");
    expect(reading.lotteryNote).toContain("보장");
    expect(reading.lotteryNote).toContain("권유");
  });

  it("builds a connected story instead of isolated card blurbs", () => {
    const selections = resolveCardSelections([
      { cardId: tarotCards[3].id, direction: "upright", position: 0 },
      { cardId: tarotCards[2].id, direction: "reversed", position: 1 },
      { cardId: tarotCards[7].id, direction: "upright", position: 2 }
    ]);

    const reading = generateReading("love", selections, () => 0.4);

    expect(reading.detailedSummary).toMatch(/현재|지금/);
    expect(reading.detailedSummary).toMatch(/숨은 원인|원인|속마음|오해/);
    expect(reading.detailedSummary).toMatch(/앞으로|방향|다음/);
    expect(reading.connectionReading).toContain("여황제");
    expect(reading.connectionReading).toContain("여사제");
    expect(reading.connectionReading).toContain("전차");
    expect(reading.actionItems.join(" ")).toMatch(/메시지|대화|확인|표현/);
    expect(reading.avoidActions.join(" ")).toMatch(/재촉|단정|충동|무리/);
  });

  it("varies wording for the same selected cards when random choices change", () => {
    const selections = resolveCardSelections([
      { cardId: tarotCards[3].id, direction: "upright", position: 0 },
      { cardId: tarotCards[4].id, direction: "upright", position: 1 },
      { cardId: tarotCards[5].id, direction: "reversed", position: 2 }
    ]);

    const first = generateReading("daily", selections, sequenceRandom([0, 0.1, 0.2]));
    const second = generateReading("daily", selections, sequenceRandom([0.92, 0.81, 0.74]));

    expect(`${first.freeSummary}${first.oneLineAdvice}${first.overallFlow}`).not.toEqual(
      `${second.freeSummary}${second.oneLineAdvice}${second.overallFlow}`
    );
  });

  it("does not create awkward category-card concatenations in free summaries", () => {
    const selections = resolveCardSelections([
      { cardId: tarotCards[0].id, direction: "upright", position: 0 },
      { cardId: tarotCards[1].id, direction: "upright", position: 1 },
      { cardId: tarotCards[2].id, direction: "reversed", position: 2 }
    ]);

    const reading = generateReading("love", selections, () => 0.5);

    expect(reading.freeSummary).not.toContain("연애운은 바보는");
    expect(reading.freeSummary).toMatch(/연애운에서는|연애운의/);
    expect(reading.freeSummary).toContain("현재");
    expect(JSON.stringify(reading)).not.toMatch(/풍요[은을]|돌파[은을]|조화[은을]/);
    expect(JSON.stringify(reading)).not.toContain("힘가");
  });

  it("does not attach awkward Korean particles to symbolic card keywords", () => {
    const selections = resolveCardSelections([
      { cardId: tarotCards[3].id, direction: "upright", position: 0 },
      { cardId: tarotCards[6].id, direction: "upright", position: 1 },
      { cardId: tarotCards[7].id, direction: "upright", position: 2 }
    ]);

    const reading = generateReading("love", selections, () => 0);

    expect(JSON.stringify(reading)).not.toMatch(/풍요[은을]|돌파[은을]|조화[은을]/);
  });

  it("does not attach awkward particles to Korean card names in overall flow", () => {
    const selections = resolveCardSelections([
      { cardId: tarotCards[0].id, direction: "upright", position: 0 },
      { cardId: tarotCards[7].id, direction: "upright", position: 1 },
      { cardId: tarotCards[8].id, direction: "upright", position: 2 }
    ]);

    const reading = generateReading("love", selections, () => 0.5);

    expect(reading.overallFlow).not.toContain("힘가");
    expect(reading.overallFlow).toContain("힘 카드");
  });

  it("keeps generated card explanations free of quoted keyword particle mistakes", () => {
    const selections = resolveCardSelections([
      { cardId: tarotCards[2].id, direction: "upright", position: 0 },
      { cardId: tarotCards[3].id, direction: "reversed", position: 1 },
      { cardId: tarotCards[4].id, direction: "upright", position: 2 }
    ]);

    const reading = generateReading("love", selections, () => 0);
    const explanationText = reading.cardDetails.map((detail) => detail.cardMeaning).join(" ");

    expect(explanationText).not.toMatch(/"[^"]+"를/);
    expect(explanationText).not.toMatch(/"[^"]+"이라는/);
    expect(explanationText).not.toMatch(/카드는 [^.]+를 상징합니다/);
    expect(explanationText).not.toMatch(/신호이라는|흐름이라는|징후이라는/);
  });
});
