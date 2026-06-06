import type { ComponentType } from "react";

type WebBannerModule = {
  BannerAd: ComponentType<never>;
  size: string;
};

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function loadNativeAdMobModule(): Promise<WebBannerModule> | null {
  return null;
}

export async function showDetailedReadingRewardedAd() {
  await wait(700);
  return true;
}

export async function showResultInterstitialAd() {
  return;
}
