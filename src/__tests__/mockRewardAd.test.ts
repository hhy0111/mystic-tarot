import { describe, expect, it, vi } from "vitest";

import { mockRewardAd } from "../utils/mockRewardAd";

describe("mockRewardAd", () => {
  it("resolves a successful reward after one second", async () => {
    vi.useFakeTimers();

    let settled = false;
    const reward = mockRewardAd().then((result) => {
      settled = true;
      return result;
    });

    await vi.advanceTimersByTimeAsync(999);
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    await expect(reward).resolves.toMatchObject({ success: true });
    expect(settled).toBe(true);

    vi.useRealTimers();
  });
});
