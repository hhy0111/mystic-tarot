import { adMobRequestOptions, getAdMobUnitId } from "../config/adMob";

type GoogleMobileAdsModule = typeof import("react-native-google-mobile-ads");

let nativeAdMobModulePromise: Promise<GoogleMobileAdsModule> | null = null;

const AD_LOAD_TIMEOUT_MS = 15000;

export function loadNativeAdMobModule() {
  nativeAdMobModulePromise ??= import("react-native-google-mobile-ads");
  return nativeAdMobModulePromise;
}

export async function showDetailedReadingRewardedAd() {
  const adUnitId = getAdMobUnitId("detailedReadingRewarded");

  if (!adUnitId) {
    return false;
  }

  const ads = await loadNativeAdMobModule();

  return new Promise<boolean>((resolve) => {
    let earnedReward = false;
    let isSettled = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    const rewardedAd = ads.RewardedAd.createForAdRequest(adUnitId, adMobRequestOptions);

    const subscriptions = [
      rewardedAd.addAdEventListener(ads.RewardedAdEventType.LOADED, () => {
        try {
          rewardedAd.show();
        } catch {
          settle(false);
        }
      }),
      rewardedAd.addAdEventListener(ads.RewardedAdEventType.EARNED_REWARD, () => {
        earnedReward = true;
      }),
      rewardedAd.addAdEventListener(ads.AdEventType.CLOSED, () => {
        settle(earnedReward);
      }),
      rewardedAd.addAdEventListener(ads.AdEventType.ERROR, () => {
        settle(false);
      })
    ];

    function settle(success: boolean) {
      if (isSettled) {
        return;
      }

      isSettled = true;
      clearTimeout(timeoutId);
      subscriptions.forEach((unsubscribe) => unsubscribe());
      resolve(success);
    }

    timeoutId = setTimeout(() => settle(false), AD_LOAD_TIMEOUT_MS);
    rewardedAd.load();
  });
}

export async function showResultInterstitialAd() {
  const adUnitId = getAdMobUnitId("resultInterstitial");

  if (!adUnitId) {
    return;
  }

  const ads = await loadNativeAdMobModule();

  await new Promise<void>((resolve) => {
    let isSettled = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    const interstitialAd = ads.InterstitialAd.createForAdRequest(adUnitId, adMobRequestOptions);

    const subscriptions = [
      interstitialAd.addAdEventListener(ads.AdEventType.LOADED, () => {
        try {
          interstitialAd.show();
        } catch {
          settle();
        }
      }),
      interstitialAd.addAdEventListener(ads.AdEventType.CLOSED, settle),
      interstitialAd.addAdEventListener(ads.AdEventType.ERROR, settle)
    ];

    function settle() {
      if (isSettled) {
        return;
      }

      isSettled = true;
      clearTimeout(timeoutId);
      subscriptions.forEach((unsubscribe) => unsubscribe());
      resolve();
    }

    timeoutId = setTimeout(settle, AD_LOAD_TIMEOUT_MS);
    interstitialAd.load();
  });
}
