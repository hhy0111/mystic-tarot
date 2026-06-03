import { describe, expect, it } from "vitest";

import {
  dailyRecommendationMessages,
  getDailyRecommendedCategory
} from "../utils/dailyRecommendation";
import { fortuneCategories, fortuneCategoryLabels } from "../types/tarot";

describe("dailyRecommendation", () => {
  it("returns one supported fortune category for a date", () => {
    const category = getDailyRecommendedCategory(new Date("2026-06-03T09:00:00+09:00"));

    expect(fortuneCategories).toContain(category);
    expect(fortuneCategoryLabels[category].length).toBeGreaterThan(0);
    expect(dailyRecommendationMessages[category].length).toBeGreaterThan(12);
  });

  it("is stable within the same local day", () => {
    const morning = getDailyRecommendedCategory(new Date("2026-06-03T09:00:00+09:00"));
    const night = getDailyRecommendedCategory(new Date("2026-06-03T23:30:00+09:00"));

    expect(morning).toBe(night);
  });
});
