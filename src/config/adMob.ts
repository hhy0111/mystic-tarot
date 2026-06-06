import { Platform } from "react-native";

export const adMobAndroidAppId = "ca-app-pub-4402708884038037~4147084988";

export type AdMobPlacement = "bottomBanner" | "detailedReadingRewarded" | "resultInterstitial";

const productionAndroidAdUnitIds: Record<AdMobPlacement, string> = {
  bottomBanner: "ca-app-pub-4402708884038037/4952214439",
  detailedReadingRewarded: "ca-app-pub-4402708884038037/4628780801",
  resultInterstitial: "ca-app-pub-4402708884038037/3288768655"
};

const testAndroidAdUnitIds: Record<AdMobPlacement, string> = {
  bottomBanner: "ca-app-pub-3940256099942544/9214589741",
  detailedReadingRewarded: "ca-app-pub-3940256099942544/5224354917",
  resultInterstitial: "ca-app-pub-3940256099942544/1033173712"
};

const testIosAdUnitIds: Record<AdMobPlacement, string> = {
  bottomBanner: "ca-app-pub-3940256099942544/2435281174",
  detailedReadingRewarded: "ca-app-pub-3940256099942544/1712485313",
  resultInterstitial: "ca-app-pub-3940256099942544/4411468910"
};

export const isNativeAdMobPlatform = Platform.OS === "android" || Platform.OS === "ios";
export const usesProductionAdUnits = process.env.NODE_ENV === "production";

export const adMobRequestOptions = {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["tarot", "fortune", "lifestyle", "mystic"]
};

export function getAdMobUnitId(placement: AdMobPlacement) {
  if (!isNativeAdMobPlatform) {
    return null;
  }

  if (Platform.OS === "ios") {
    return testIosAdUnitIds[placement];
  }

  return usesProductionAdUnits ? productionAndroidAdUnitIds[placement] : testAndroidAdUnitIds[placement];
}

export function getDisplayAdMobUnitId(placement: AdMobPlacement) {
  return productionAndroidAdUnitIds[placement];
}
