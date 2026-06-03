import type { RewardAdResult } from "../types/tarot";

export function mockRewardAd(): Promise<RewardAdResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        rewardedAt: Date.now()
      });
    }, 1000);
  });
}
