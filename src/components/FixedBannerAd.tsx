import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { adMobRequestOptions, getAdMobUnitId, isNativeAdMobPlatform } from "../config/adMob";
import { loadNativeAdMobModule } from "../services/adMob";

const BANNER_HEIGHT = 56;

type BannerModuleState = {
  BannerAd: ComponentType<{
    unitId: string;
    size: string;
    requestOptions: typeof adMobRequestOptions;
    onAdFailedToLoad?: () => void;
  }>;
  size: string;
};

export function FixedBannerAd() {
  const insets = useSafeAreaInsets();
  const [bannerModule, setBannerModule] = useState<BannerModuleState | null>(null);
  const [hasLoadError, setHasLoadError] = useState(false);
  const adUnitId = getAdMobUnitId("bottomBanner");

  useEffect(() => {
    let isMounted = true;
    const modulePromise = loadNativeAdMobModule();

    if (!adUnitId || !modulePromise) {
      return () => {
        isMounted = false;
      };
    }

    modulePromise
      .then((ads) => {
        if (!isMounted) {
          return;
        }

        setBannerModule({
          BannerAd: ads.BannerAd as BannerModuleState["BannerAd"],
          size: ads.BannerAdSize.ANCHORED_ADAPTIVE_BANNER
        });
      })
      .catch(() => {
        if (isMounted) {
          setHasLoadError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [adUnitId]);

  const shouldRenderNativeAd = isNativeAdMobPlatform && adUnitId && bannerModule && !hasLoadError;

  return (
    <View
      accessible
      accessibilityLabel="하단 배너 광고 영역"
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}
    >
      <View style={styles.banner}>
        {shouldRenderNativeAd ? (
          <bannerModule.BannerAd
            unitId={adUnitId}
            size={bannerModule.size}
            requestOptions={adMobRequestOptions}
            onAdFailedToLoad={() => setHasLoadError(true)}
          />
        ) : (
          <>
            <Text style={styles.adMark}>AD</Text>
            <View style={styles.copyBlock}>
              <Text style={styles.title}>오늘의 운세를 더 깊게 확인해보세요</Text>
              <Text style={styles.subtitle}>배너 광고 영역</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 0,
    borderTopWidth: 1,
    borderTopColor: "rgba(216, 178, 95, 0.22)",
    backgroundColor: "rgba(8, 5, 18, 0.96)",
    paddingHorizontal: 10,
    paddingTop: 8
  },
  banner: {
    minHeight: BANNER_HEIGHT,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(216, 178, 95, 0.34)",
    backgroundColor: "rgba(22, 16, 42, 0.96)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    overflow: "hidden",
    paddingHorizontal: 12
  },
  adMark: {
    minWidth: 34,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "rgba(216, 178, 95, 0.22)",
    color: "#f8edc9",
    fontSize: 11,
    fontWeight: "900",
    lineHeight: 24,
    textAlign: "center"
  },
  copyBlock: {
    flex: 1,
    gap: 2
  },
  title: {
    color: "#f8edc9",
    fontSize: 13,
    fontWeight: "900"
  },
  subtitle: {
    color: "#a99ee0",
    fontSize: 11,
    fontWeight: "700"
  }
});
