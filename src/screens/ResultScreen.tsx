import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useRef, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { backgroundImages } from "../assets/images";
import { FortuneButton } from "../components/FortuneButton";
import { ResultSection } from "../components/ResultSection";
import { ResultRevealStage } from "../components/ResultRevealStage";
import { useLanguage } from "../i18n/LanguageContext";
import type { RootStackParamList } from "../navigation/AppNavigator";
import {
  getMobileContentWidth,
  getResultCardSize,
  MOBILE_CONTENT_MAX_WIDTH
} from "../utils/mobileLayout";
import { getRevealTiming } from "../utils/revealEffects";
import { showDetailedReadingRewardedAd, showResultInterstitialAd } from "../services/adMob";
import { generateReading, resolveCardSelections } from "../utils/tarotEngine";

type ResultScreenProps = NativeStackScreenProps<RootStackParamList, "Result">;

export function ResultScreen({ navigation, route }: ResultScreenProps) {
  const { language, t } = useLanguage();
  const { width } = useWindowDimensions();
  const { category, selectedCards } = route.params;
  const [settledCount, setSettledCount] = useState(0);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [isLoadingAd, setIsLoadingAd] = useState(false);
  const [adError, setAdError] = useState<string | null>(null);
  const resultInterstitialShownRef = useRef(false);

  const resolvedState = useMemo(() => {
    try {
      return { cards: resolveCardSelections(selectedCards), error: null };
    } catch (error) {
      return {
        cards: [],
        error: error instanceof Error ? error.message : t.result.fallbackError
      };
    }
  }, [selectedCards, t.result.fallbackError]);

  const reading = useMemo(() => {
    if (resolvedState.cards.length !== 3) {
      return null;
    }

    return generateReading(category, resolvedState.cards, Math.random, language);
  }, [category, language, resolvedState.cards]);

  useEffect(() => {
    setSettledCount(0);
    setFocusIndex(null);

    const introDelayMs = 320;
    const timers = [0, 1, 2].flatMap((index) => {
      const timing = getRevealTiming(index);

      return [
        setTimeout(() => {
          setFocusIndex(index);
        }, introDelayMs + timing.focusAtMs),
        setTimeout(() => {
          setSettledCount(index + 1);
        }, introDelayMs + timing.settleAtMs),
        setTimeout(() => {
          setFocusIndex(null);
        }, introDelayMs + timing.settleAtMs + 80)
      ];
    });

    return () => timers.forEach(clearTimeout);
  }, [selectedCards]);

  useEffect(() => {
    if (!reading || resultInterstitialShownRef.current) {
      return;
    }

    const timer = setTimeout(() => {
      resultInterstitialShownRef.current = true;
      void showResultInterstitialAd();
    }, 2400);

    return () => clearTimeout(timer);
  }, [reading]);

  const contentWidth = getMobileContentWidth(width);
  const cardSize = getResultCardSize(contentWidth);

  const handleRewardPress = async () => {
    setAdError(null);
    setIsLoadingAd(true);

    try {
      const isRewarded = await showDetailedReadingRewardedAd();
      if (isRewarded) {
        setShowDetail(true);
      } else {
        setAdError(t.result.adError);
      }
    } catch {
      setAdError(t.result.adError);
    } finally {
      setIsLoadingAd(false);
    }
  };

  return (
    <ImageBackground source={backgroundImages.result} style={styles.background} imageStyle={styles.backgroundImage}>
      <LinearGradient colors={["rgba(8,5,18,0.62)", "rgba(17,17,54,0.72)", "rgba(36,16,74,0.86)"]} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.phoneFrame}>
              <View style={styles.header}>
                <Text style={styles.category}>{t.categories[category]}</Text>
                <Text style={styles.title}>{t.result.title}</Text>
              </View>

              {resolvedState.error ? (
                <ResultSection title={t.result.resultErrorTitle} body={resolvedState.error} />
              ) : (
                <>
                  <View style={styles.cardStage}>
                    <ResultRevealStage
                      cards={resolvedState.cards}
                      cardSize={cardSize}
                      contentWidth={contentWidth}
                      focusIndex={focusIndex}
                      settledCount={settledCount}
                    />
                  </View>

                  {reading ? (
                    <>
                      <View style={styles.freeGrid}>
                        <View style={styles.storyHeader}>
                          <Text style={styles.storyKicker}>{t.result.storyKicker}</Text>
                          <Text style={styles.storyTitle}>{reading.storyTitle}</Text>
                        </View>
                        <ResultSection title={t.result.totalSummary} body={reading.freeSummary} />
                        <View style={styles.scoreBox}>
                          <Text style={styles.scoreLabel}>{t.result.score}</Text>
                          <Text style={styles.score}>{reading.score}</Text>
                        </View>
                        {reading.lotteryNumbers ? (
                          <ResultSection title={t.result.lotteryNumbers}>
                            <View style={styles.lotteryGrid}>
                              {reading.lotteryNumbers.map((number) => (
                                <View key={number} style={styles.lotteryBall}>
                                  <Text style={styles.lotteryNumber}>{number}</Text>
                                </View>
                              ))}
                              {reading.lotteryBonusNumber ? (
                                <View style={[styles.lotteryBall, styles.bonusBall]}>
                                  <Text style={styles.bonusLabel}>B</Text>
                                  <Text style={[styles.lotteryNumber, styles.bonusNumber]}>
                                    {reading.lotteryBonusNumber}
                                  </Text>
                                </View>
                              ) : null}
                            </View>
                            {reading.lotteryNote ? <Text style={styles.lotteryNote}>{reading.lotteryNote}</Text> : null}
                          </ResultSection>
                        ) : null}
                        <ResultSection title={t.result.oneLineAdvice} body={reading.oneLineAdvice} />
                      </View>

                      {!showDetail ? (
                        <View style={styles.rewardBlock}>
                          <FortuneButton
                            label={isLoadingAd ? t.result.loadingAd : t.result.rewardButton}
                            disabled={isLoadingAd}
                            onPress={handleRewardPress}
                          />
                          {adError ? <Text style={styles.errorText}>{adError}</Text> : null}
                        </View>
                      ) : (
                        <View style={styles.detailBlock}>
                          <ResultSection title={t.result.detailSummary} body={reading.detailedSummary} />
                          {reading.lotteryNumbers ? (
                            <ResultSection
                              title={t.result.lotteryFlow}
                              body={t.result.lotteryFlowBody(reading.cardDetails.map((detail) => detail.cardNameKo))}
                            />
                          ) : null}
                          <ResultSection title={t.result.situationOverview} body={reading.situationOverview} />
                          {reading.cardDetails.map((detail, index) => (
                            <ResultSection
                              key={`${detail.cardId}-${detail.position}`}
                              title={t.result.cardReadingTitle(index, detail.positionLabel)}
                            >
                              <Text style={styles.detailTitle}>
                                {detail.cardNameKo} · {detail.directionLabel}
                              </Text>
                              <Text style={styles.detailLabel}>{t.result.cardMeaning}</Text>
                              <Text style={styles.detailBody}>{detail.cardMeaning}</Text>
                            <Text style={styles.detailLabel}>{t.result.currentFortune}</Text>
                            <Text style={styles.detailBody}>{detail.currentSituation}</Text>
                            <Text style={styles.detailLabel}>{t.result.situationExample}</Text>
                            <Text style={styles.detailBody}>{detail.situationExample}</Text>
                            <Text style={styles.detailLabel}>{t.result.whyImportant}</Text>
                            <Text style={styles.detailBody}>{detail.whyThisMatters}</Text>
                            <Text style={styles.detailLabel}>{t.result.advice}</Text>
                            <Text style={styles.detailAdvice}>{detail.advice}</Text>
                            <Text style={styles.detailLabel}>{t.result.nextAction}</Text>
                            <Text style={styles.detailAdvice}>{detail.nextStep}</Text>
                          </ResultSection>
                        ))}
                        <ResultSection title={t.result.connectionReading} body={reading.connectionReading} />
                        <ResultSection title={t.result.relatablePatterns}>
                          <View style={styles.list}>
                            {reading.relatablePatterns.map((item, index) => (
                              <Text key={item} style={styles.listItem}>
                                {index + 1}. {item}
                              </Text>
                            ))}
                          </View>
                        </ResultSection>
                        <ResultSection title={t.result.actionItems}>
                          <View style={styles.list}>
                            {reading.actionItems.map((item, index) => (
                              <Text key={item} style={styles.listItem}>
                                {index + 1}. {item}
                                </Text>
                            ))}
                          </View>
                        </ResultSection>
                        <ResultSection title={t.result.practicalNextSteps}>
                          <View style={styles.list}>
                            {reading.practicalNextSteps.map((item, index) => (
                              <Text key={item} style={styles.listItem}>
                                {index + 1}. {item}
                              </Text>
                            ))}
                          </View>
                        </ResultSection>
                        <ResultSection title={t.result.avoidActions}>
                            <View style={styles.list}>
                              {reading.avoidActions.map((item, index) => (
                                <Text key={item} style={styles.listItem}>
                                  {index + 1}. {item}
                                </Text>
                              ))}
                            </View>
                          </ResultSection>
                          <ResultSection title={t.result.timingHint} body={reading.timingHint} />
                          <ResultSection title={t.result.overallFlow} body={reading.overallFlow} />
                          <ResultSection title={t.result.caution} body={reading.caution} />
                          <View style={styles.luckyRow}>
                            <ResultSection title={t.result.luckyColor}>
                              <Text style={styles.luckyText}>{reading.luckyColor}</Text>
                            </ResultSection>
                            <ResultSection title={t.result.luckyNumber}>
                              <Text style={styles.luckyText}>{reading.luckyNumber}</Text>
                            </ResultSection>
                          </View>
                        </View>
                      )}
                    </>
                  ) : null}
                </>
              )}

              <View style={styles.actions}>
                <FortuneButton
                  label={t.result.retry}
                  variant="secondary"
                  onPress={() => navigation.replace("CardSelect", { category })}
                />
                <FortuneButton label={t.result.otherFortune} variant="secondary" onPress={() => navigation.popToTop()} />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#080512"
  },
  backgroundImage: {
    opacity: 0.9
  },
  gradient: {
    flex: 1
  },
  safeArea: {
    flex: 1
  },
  scrollContainer: {
    paddingHorizontal: 0,
    paddingTop: 18,
    paddingBottom: 28,
    gap: 22
  },
  phoneFrame: {
    width: "100%",
    maxWidth: MOBILE_CONTENT_MAX_WIDTH,
    alignSelf: "center",
    gap: 20,
    paddingHorizontal: 12
  },
  header: {
    alignItems: "center",
    gap: 8
  },
  category: {
    color: "#d8b25f",
    fontSize: 15,
    fontWeight: "800"
  },
  title: {
    color: "#f8edc9",
    fontSize: 28,
    fontWeight: "900"
  },
  cardStage: {
    alignItems: "center",
    marginHorizontal: -12
  },
  freeGrid: {
    gap: 12
  },
  storyHeader: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(216, 178, 95, 0.38)",
    backgroundColor: "rgba(216, 178, 95, 0.1)",
    padding: 16,
    gap: 6
  },
  storyKicker: {
    color: "#d8b25f",
    fontSize: 13,
    fontWeight: "900"
  },
  storyTitle: {
    color: "#f8edc9",
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "900"
  },
  scoreBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(216, 178, 95, 0.36)",
    backgroundColor: "rgba(216, 178, 95, 0.12)",
    alignItems: "center",
    paddingVertical: 18
  },
  scoreLabel: {
    color: "#f4d886",
    fontSize: 14,
    fontWeight: "800"
  },
  score: {
    color: "#f8edc9",
    fontSize: 42,
    fontWeight: "900"
  },
  rewardBlock: {
    gap: 8
  },
  errorText: {
    color: "#ffb6b6",
    fontSize: 13,
    textAlign: "center"
  },
  detailBlock: {
    gap: 12
  },
  detailTitle: {
    color: "#f8edc9",
    fontSize: 15,
    fontWeight: "900"
  },
  detailLabel: {
    color: "#d8b25f",
    fontSize: 13,
    fontWeight: "900",
    marginTop: 4
  },
  detailBody: {
    color: "#efe7ff",
    fontSize: 15,
    lineHeight: 23
  },
  detailAdvice: {
    color: "#f4d886",
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "700"
  },
  list: {
    gap: 8
  },
  listItem: {
    color: "#efe7ff",
    fontSize: 15,
    lineHeight: 23
  },
  lotteryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center"
  },
  lotteryBall: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "rgba(248, 237, 201, 0.74)",
    backgroundColor: "#d8b25f",
    alignItems: "center",
    justifyContent: "center"
  },
  bonusBall: {
    backgroundColor: "#6d49c8",
    borderColor: "rgba(244, 216, 134, 0.82)"
  },
  lotteryNumber: {
    color: "#12091f",
    fontSize: 16,
    fontWeight: "900"
  },
  bonusLabel: {
    color: "#f8edc9",
    fontSize: 9,
    fontWeight: "900",
    lineHeight: 10
  },
  bonusNumber: {
    color: "#f8edc9"
  },
  lotteryNote: {
    color: "#d8cfff",
    fontSize: 13,
    lineHeight: 20
  },
  luckyRow: {
    flexDirection: "row",
    gap: 12
  },
  luckyText: {
    color: "#f8edc9",
    fontSize: 20,
    fontWeight: "900"
  },
  actions: {
    gap: 10,
    paddingTop: 4
  }
});
