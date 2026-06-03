import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { tarotCards } from "../data/tarotCards";

const assetPath = (...parts: string[]) => join(process.cwd(), "assets", "cards", ...parts);

describe("card image assets", () => {
  it("keeps tarot card images aligned with imageKey values", () => {
    expect(existsSync(assetPath("back.png"))).toBe(true);
    expect(existsSync(assetPath("back_selected.png"))).toBe(true);

    for (const card of tarotCards) {
      expect(existsSync(assetPath(`${card.imageKey}.png`))).toBe(true);
    }
  });
});
