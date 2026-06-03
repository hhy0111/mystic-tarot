import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { tarotImageManifest } from "../data/tarotImageManifest";

describe("tarotImageManifest", () => {
  it("tracks the complete 78-card image expansion set", () => {
    expect(tarotImageManifest).toHaveLength(78);
    expect(new Set(tarotImageManifest.map((card) => card.imageKey)).size).toBe(78);
    expect(tarotImageManifest.filter((card) => card.arcana === "major")).toHaveLength(22);
    expect(tarotImageManifest.filter((card) => card.arcana === "minor")).toHaveLength(56);
  });

  it("keeps every expansion image key aligned with the 78-card prompt file", () => {
    const promptFile = readFileSync(join(process.cwd(), "CARD_IMAGE_PROMPTS_78.md"), "utf8");

    for (const card of tarotImageManifest) {
      expect(promptFile).toContain(`### ${card.imageKey}.png`);
    }
  });
});
