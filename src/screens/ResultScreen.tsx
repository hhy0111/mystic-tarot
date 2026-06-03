import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { backgroundImages } from "../assets/images";
import { FortuneButton } from "../components/FortuneButton";
import { ResultSection } from "../components/ResultSection";
import { ResultRevealStage } from "../components/ResultRevealStage";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { fortuneCategoryLabels } from "../types/tarot";
import {
  getMobileContentWidth,
  getResultCardSize,
  MOBILE_CONTENT_MAX_WIDTH
} from "../utils/mobileLayout";
import { mockRewardAd } from "../utils/mockRewardAd";
import { getRevealTiming } from "../utils/revealEffects";
import { generateReading, resolveCardSelections } from "../utils/tarotEngine";

type ResultScreenProps = NativeStackScreenProps<RootStackParamList, "Result">;

export function ResultScreen({ navigation, route }: ResultScreenProps) {
  const { width } = useWindowDimensions();
  const { category, selectedCards } = route.params;
  const [settledCount, setSettledCount] = useState(0);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [isLoadingAd, setIsLoadingAd] = useState(false);
  const [adError, setAdError] = useState<string | null>(null);

  const resolvedState = useMemo(() => {
    try {
      return { cards: resolveCardSelections(selectedCards), error: null };
    } catch (error) {
      return {
        cards: [],
        error: error instanceof Error ? error.message : "결과 데이터를 불러오지 못했습니다."
      };
    }
  }, [selectedCards]);

  const reading = useMemo(() => {
    if (resolvedState.cards.length !== 3) {
      return null;
    }

    return generateReading(category, resolvedState.cards);
  }, [category, resolvedState.cards]);

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

  const contentWidth = getMobileContentWidth(width);
  const cardSize = getResultCardSize(contentWidth);

  const handleRewardPress = async () => {
    setAdError(null);
    setIsLoadingAd(true);

    try {
      const reward = await mockRewardAd();
      if (reward.success) {
        setShowDetail(true);
      }
    } catch {
      setAdError("광고 확인에 실패했습니다. 잠시 후 다시 시도하세요.");
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
                <Text style={styles.category}>{fortuneCategoryLabels[category]}</Text>
                <Text style={styles.title}>당신의 세 장</Text>
              </View>

              {resolvedState.error ? (
                <ResultSection title="결과 오류" body={resolvedState.error} />
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
                          <Text style={styles.storyKicker}>이번 리딩의 핵심</Text>
                          <Text style={styles.storyTitle}>{reading.storyTitle}</Text>
                        </View>
                        <ResultSection title="총평" body={reading.freeSummary} />
                        <View style={styles.scoreBox}>
                          <Text style={styles.scoreLabel}>운세 점수</Text>
                          <Text style={styles.score}>{reading.score}</Text>
                        </View>
                        {reading.lotteryNumbers ? (
                          <ResultSection title="카드 추천 번호">
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
                        <ResultSection title="한 줄 조언" body={reading.oneLineAdvice} />
                      </View>

                      {!showDetail ? (
                        <View style={styles.rewardBlock}>
                          <FortuneButton
                            label={isLoadingAd ? "광고 확인 중..." : "광고 보고 상세 해석 보기"}
                            disabled={isLoadingAd}
                            onPress={handleRewardPress}
                          />
                          {adError ? <Text style={styles.errorText}>{adError}</Text> : null}
                        </View>
                      ) : (
                        <View style={styles.detailBlock}>
                          <ResultSection title="상세 총평" body={reading.detailedSummary} />
                          {reading.lotteryNumbers ? (
                            <ResultSection
                              title="번호가 나온 흐름"
                              body={`${reading.cardDetails[0].cardNameKo} 카드는 첫 번호 흐름을 열고, ${reading.cardDetails[1].cardNameKo} 카드는 중간 숫자의 균형을 잡으며, ${reading.cardDetails[2].cardNameKo} 카드는 보너스 번호의 분위기를 만듭니다. 이 조합은 카드 상징을 숫자로 바꾼 재미용 해석이며 실제 결과를 예측하지 않습니다.`}
                            />
                          ) : null}
                          <ResultSection title="지금 이런 상황일 수 있어요" body={reading.situationOverview} />
                          {reading.cardDetails.map((detail, index) => (
                            <ResultSection
                              key={`${detail.cardId}-${detail.position}`}
                              title={`카드 ${index + 1} 해석 · ${detail.positionLabel}`}
                            >
                              <Text style={styles.detailTitle}>
                                {detail.cardNameKo} · {detail.directionLabel}
                              </Text>
                              <Text style={styles.detailLabel}>카드 설명</Text>
                              <Text style={styles.detailBody}>{detail.cardMeaning}</Text>
                            <Text style={styles.detailLabel}>현재 운세</Text>
                            <Text style={styles.detailBody}>{detail.currentSituation}</Text>
                            <Text style={styles.detailLabel}>상황 예시</Text>
                            <Text style={styles.detailBody}>{detail.situationExample}</Text>
                            <Text style={styles.detailLabel}>왜 중요할까요</Text>
                            <Text style={styles.detailBody}>{detail.whyThisMatters}</Text>
                            <Text style={styles.detailLabel}>조언</Text>
                            <Text style={styles.detailAdvice}>{detail.advice}</Text>
                            <Text style={styles.detailLabel}>현실 행동</Text>
                            <Text style={styles.detailAdvice}>{detail.nextStep}</Text>
                          </ResultSection>
                        ))}
                        <ResultSection title="세 카드 연결 해석" body={reading.connectionReading} />
                        <ResultSection title="공감 포인트">
                          <View style={styles.list}>
                            {reading.relatablePatterns.map((item, index) => (
                              <Text key={item} style={styles.listItem}>
                                {index + 1}. {item}
                              </Text>
                            ))}
                          </View>
                        </ResultSection>
                        <ResultSection title="오늘 해볼 행동">
                          <View style={styles.list}>
                            {reading.actionItems.map((item, index) => (
                              <Text key={item} style={styles.listItem}>
                                {index + 1}. {item}
                                </Text>
                            ))}
                          </View>
                        </ResultSection>
                        <ResultSection title="상황별 추천 행동">
                          <View style={styles.list}>
                            {reading.practicalNextSteps.map((item, index) => (
                              <Text key={item} style={styles.listItem}>
                                {index + 1}. {item}
                              </Text>
                            ))}
                          </View>
                        </ResultSection>
                        <ResultSection title="피해야 할 행동">
                            <View style={styles.list}>
                              {reading.avoidActions.map((item, index) => (
                                <Text key={item} style={styles.listItem}>
                                  {index + 1}. {item}
                                </Text>
                              ))}
                            </View>
                          </ResultSection>
                          <ResultSection title="타이밍 힌트" body={reading.timingHint} />
                          <ResultSection title="종합 흐름" body={reading.overallFlow} />
                          <ResultSection title="주의할 점" body={reading.caution} />
                          <View style={styles.luckyRow}>
                            <ResultSection title="행운의 색상">
                              <Text style={styles.luckyText}>{reading.luckyColor}</Text>
                            </ResultSection>
                            <ResultSection title="행운의 숫자">
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
                  label="다시 보기"
                  variant="secondary"
                  onPress={() => navigation.replace("CardSelect", { category })}
                />
                <FortuneButton label="다른 운세 보기" variant="secondary" onPress={() => navigation.popToTop()} />
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
