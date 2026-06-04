import { describe, expect, it } from "vitest";

import { tarotCards } from "../data/tarotCards";
import { getCardDisplayName, languageOptions, translations, type LanguageCode } from "../i18n/translations";
import { generateReading, resolveCardSelections } from "../utils/tarotEngine";
import { fortuneCategories } from "../types/tarot";

const fixedRandom = () => 0.24;

describe("language packs", () => {
  it("ships the four requested UI languages", () => {
    expect(languageOptions.map((option) => option.code)).toEqual(["ko", "zh", "ja", "en"]);

    for (const language of languageOptions.map((option) => option.code)) {
      const pack = translations[language];
      expect(pack.settings.title.length).toBeGreaterThan(0);
      expect(pack.cardSelect.resultButton.length).toBeGreaterThan(0);
      expect(pack.result.rewardButton.length).toBeGreaterThan(0);

      for (const category of fortuneCategories) {
        expect(pack.categories[category].length).toBeGreaterThan(0);
        expect(pack.dailyRecommendationMessages[category].length).toBeGreaterThan(0);
      }
    }
  });

  it("localizes generated result copy for non-Korean languages", () => {
    const selections = resolveCardSelections([
      { cardId: "the_fool", direction: "upright", position: 0 },
      { cardId: "the_magician", direction: "reversed", position: 1 },
      { cardId: "the_high_priestess", direction: "upright", position: 2 }
    ]);

    const reading = generateReading("love", selections, fixedRandom, "en");
    const text = JSON.stringify(reading);

    expect(reading.cardDetails[0].cardNameKo).toBe("The Fool");
    expect(text).toContain("Love");
    expect(text).not.toMatch(/[가-힣]/);
  });

  it("uses localized tarot card names", () => {
    const fool = tarotCards.find((card) => card.id === "the_fool");
    const aceOfCups = tarotCards.find((card) => card.id === "ace_of_cups");

    expect(fool).toBeDefined();
    expect(aceOfCups).toBeDefined();

    const languages: LanguageCode[] = ["ko", "zh", "ja", "en"];
    expect(languages.map((language) => getCardDisplayName(fool!, language))).toEqual([
      "바보",
      "愚者",
      "愚者",
      "The Fool"
    ]);
    expect(languages.map((language) => getCardDisplayName(aceOfCups!, language))).toEqual([
      "컵 에이스",
      "圣杯王牌",
      "カップのエース",
      "Ace of Cups"
    ]);
  });
});
