import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  useWindowDimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { backgroundImages } from "../assets/images";
import { FortuneButton } from "../components/FortuneButton";
import { TarotCard } from "../components/TarotCard";
import { tarotCards } from "../data/tarotCards";
import type { RootStackParamList } from "../navigation/AppNavigator";
import {
  fortuneCategoryLabels,
  type CardDrawCandidate,
  type CardSelection,
  type TarotCard as TarotCardData,
  type TarotPosition
} from "../types/tarot";
import {
  getCardSelectContentWidth,
  getFanCardSize,
  getFanStageHeight,
  getSelectedSlotSize,
  CARD_SELECT_CONTENT_MAX_WIDTH
} from "../utils/mobileLayout";
import {
  DEFAULT_DRAW_CANDIDATE_COUNT,
  createRandomCardCandidates,
  resolveCardSelections
} from "../utils/tarotEngine";

type CardSelectScreenProps = NativeStackScreenProps<RootStackParamList, "CardSelect">;

const slotLabels = ["첫 번째 카드", "두 번째 카드", "세 번째 카드"];
const slotRoles = ["현재 흐름", "숨은 원인", "앞으로 방향"];

type FanGroupKey = "major" | "cupsWands" | "swordsPentacles";

type IndexedDrawCandidate = CardDrawCandidate & {
  visualIndex: number;
};

type FanGroup = {
  key: FanGroupKey;
  title: string;
  subtitle: string;
  candidates: IndexedDrawCandidate[];
};

const fanGroupMeta: Record<FanGroupKey, Omit<FanGroup, "candidates">> = {
  major: {
    key: "major",
    title: "메이저 아르카나",
    subtitle: "큰 흐름 22장"
  },
  cupsWands: {
    key: "cupsWands",
    title: "컵 · 완드",
    subtitle: "감정과 행동 28장"
  },
  swordsPentacles: {
    key: "swordsPentacles",
    title: "소드 · 펜타클",
    subtitle: "판단과 현실 28장"
  }
};

function getFanGroupKey(card?: TarotCardData): FanGroupKey {
  if (!card || card.arcana === "major") {
    return "major";
  }

  if (card.id.includes("_of_cups") || card.id.includes("_of_wands")) {
    return "cupsWands";
  }

  return "swordsPentacles";
}

function buildFanGroups(
  candidates: readonly CardDrawCandidate[],
  cardsById: ReadonlyMap<string, TarotCardData>
): FanGroup[] {
  const groups: Record<FanGroupKey, FanGroup> = {
    major: { ...fanGroupMeta.major, candidates: [] },
    cupsWands: { ...fanGroupMeta.cupsWands, candidates: [] },
    swordsPentacles: { ...fanGroupMeta.swordsPentacles, candidates: [] }
  };

  candidates.forEach((candidate, visualIndex) => {
    const key = getFanGroupKey(cardsById.get(candidate.cardId));
    groups[key].candidates.push({ ...candidate, visualIndex });
  });

  return [groups.major, groups.cupsWands, groups.swordsPentacles];
}

function getFanCardLayout(index: number, total: number, cardWidth: number, stageWidth: number, stageHeight: number) {
  const progress = total <= 1 ? 0.5 : index / (total - 1);
  const rotation = (progress - 0.5) * (total > 24 ? 50 : 42);
  const left = Math.round(progress * (stageWidth - cardWidth));
  const top = Math.round(14 + Math.sin(progress * Math.PI) * (stageHeight * 0.2));

  return {
    left,
    top,
    zIndex: index,
    transform: [{ rotate: `${rotation}deg` }]
  };
}

function findNearestSelectableCandidate(
  candidates: readonly IndexedDrawCandidate[],
  targetIndex: number,
  selectedIndexes: readonly number[]
) {
  for (let offset = 0; offset < candidates.length; offset += 1) {
    const right = targetIndex + offset;
    const left = targetIndex - offset;

    if (right < candidates.length && !selectedIndexes.includes(candidates[right].visualIndex)) {
      return candidates[right];
    }

    if (offset > 0 && left >= 0 && !selectedIndexes.includes(candidates[left].visualIndex)) {
      return candidates[left];
    }
  }

  return undefined;
}

function getPressLocationX(event: GestureResponderEvent, fallbackWidth: number): number {
  const nativeEvent = event.nativeEvent as GestureResponderEvent["nativeEvent"] & {
    offsetX?: number;
    clientX?: number;
  };
  const locationX = nativeEvent.locationX;
  const offsetX = nativeEvent.offsetX;
  const clientX = nativeEvent.clientX;

  if (typeof locationX === "number" && Number.isFinite(locationX)) {
    return locationX;
  }

  if (typeof offsetX === "number" && Number.isFinite(offsetX)) {
    return offsetX;
  }

  const currentTarget = (event as unknown as {
    currentTarget?: { getBoundingClientRect?: () => { left: number } };
  }).currentTarget;

  if (typeof clientX === "number" && Number.isFinite(clientX) && currentTarget?.getBoundingClientRect) {
    return clientX - currentTarget.getBoundingClientRect().left;
  }

  return fallbackWidth / 2;
}

export function CardSelectScreen({ navigation, route }: CardSelectScreenProps) {
  const { width } = useWindowDimensions();
  const { category } = route.params;
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [drawCandidates, setDrawCandidates] = useState(() => createRandomCardCandidates());
  const [shuffleCount, setShuffleCount] = useState(1);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardSelection[]>([]);

  const cardsById = useMemo(() => new Map(tarotCards.map((card) => [card.id, card])), []);
  const fanGroups = useMemo(() => buildFanGroups(drawCandidates, cardsById), [cardsById, drawCandidates]);
  const resolvedSelections = useMemo(() => resolveCardSelections(selectedCards), [selectedCards]);
  const contentWidth = getCardSelectContentWidth(width);
  const fanCardSize = getFanCardSize(contentWidth);
  const fanStageHeight = getFanStageHeight(contentWidth);
  const fanStageWidth = contentWidth - 24;
  const slotCardSize = getSelectedSlotSize(contentWidth);
  const canShuffle = selectedCards.length === 0;

  const handleCardPress = (visualIndex: number) => {
    if (selectedCards.length >= 3 || selectedIndexes.includes(visualIndex)) {
      return;
    }

    const candidate = drawCandidates[visualIndex];
    const nextSelection: CardSelection = {
      ...candidate,
      position: selectedCards.length as TarotPosition
    };

    setSelectedIndexes((current) => [...current, visualIndex]);
    setSelectedCards((current) => [...current, nextSelection]);
  };

  const handleShufflePress = () => {
    if (!canShuffle) {
      return;
    }

    setDrawCandidates(createRandomCardCandidates());
    setShuffleCount((current) => current + 1);
  };

  const handleFanPress = (group: FanGroup, event: GestureResponderEvent) => {
    if (selectedCards.length >= 3 || group.candidates.length === 0) {
      return;
    }

    const locationX = Math.max(0, Math.min(fanStageWidth, getPressLocationX(event, fanStageWidth)));
    const targetIndex = Math.round((locationX / fanStageWidth) * (group.candidates.length - 1));
    const candidate = findNearestSelectableCandidate(group.candidates, targetIndex, selectedIndexes);

    if (candidate) {
      handleCardPress(candidate.visualIndex);
    }
  };

  useEffect(() => {
    if (selectedCards.length !== 3) {
      return undefined;
    }

    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 240);

    return () => clearTimeout(timer);
  }, [selectedCards.length]);

  return (
    <ImageBackground source={backgroundImages.cardSelect} style={styles.background} imageStyle={styles.backgroundImage}>
      <LinearGradient colors={["rgba(8,5,18,0.58)", "rgba(17,17,54,0.68)", "rgba(29,15,61,0.82)"]} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.phoneFrame}>
              <View style={styles.header}>
                <Text style={styles.category}>{fortuneCategoryLabels[category]}</Text>
                <Text style={styles.title}>마음이 가는 카드를 선택하세요</Text>
                <Text style={styles.deckInfo}>
                  {tarotCards.length}장 전체 덱을 3개의 부채꼴로 펼쳤습니다
                </Text>
                <Text style={styles.counter}>{selectedCards.length}/3</Text>
                <View
                  accessible
                  accessibilityLabel={`카드 선택 진행 ${selectedCards.length}장 완료, 총 3장`}
                  style={styles.progressRow}
                >
                  {slotRoles.map((role, index) => {
                    const active = index < selectedCards.length;

                    return (
                      <View key={role} style={styles.progressItem}>
                        <View style={[styles.progressDot, active && styles.progressDotActive]} />
                        <Text style={[styles.progressText, active && styles.progressTextActive]}>{role}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              <View style={styles.drawControlBar}>
                <Text style={styles.drawMeta}>
                  메이저 22 · 마이너 56 · 전체 펼침 {shuffleCount}
                </Text>
                <FortuneButton
                  label="다시 섞기"
                  variant="secondary"
                  disabled={!canShuffle}
                  accessibilityHint={
                    canShuffle
                      ? `선택 전 ${DEFAULT_DRAW_CANDIDATE_COUNT}장을 다시 섞어 펼칩니다.`
                      : "이미 카드를 선택해 이번 펼침은 유지됩니다."
                  }
                  onPress={handleShufflePress}
                  style={styles.shuffleButton}
                />
              </View>

              <View style={styles.deckSurface}>
                {fanGroups.map((group) => (
                  <View key={group.key} style={styles.fanGroup}>
                    <View style={styles.fanHeader}>
                      <Text style={styles.fanTitle}>{group.title}</Text>
                      <Text style={styles.fanSubtitle}>{group.subtitle}</Text>
                    </View>
                    <View style={[styles.fanStage, { width: fanStageWidth, height: fanStageHeight }]}>
                      {group.candidates.map((candidate, groupIndex) => {
                        const selectedOrder = selectedIndexes.indexOf(candidate.visualIndex) + 1;
                        const selected = selectedOrder > 0;
                        const cardLayout = getFanCardLayout(
                          groupIndex,
                          group.candidates.length,
                          fanCardSize.width,
                          fanStageWidth,
                          fanStageHeight
                        );

                        return (
                          <View
                            key={`${candidate.cardId}-${candidate.visualIndex}-${shuffleCount}`}
                            accessible={false}
                            importantForAccessibility="no-hide-descendants"
                            pointerEvents="none"
                            style={[styles.fanCardWrap, cardLayout]}
                          >
                            <TarotCard
                              width={fanCardSize.width}
                              height={fanCardSize.height}
                              selected={selected}
                              selectedOrder={selected ? selectedOrder : undefined}
                              disabled
                            />
                          </View>
                        );
                      })}
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`${group.title} 카드 펼침`}
                        accessibilityHint="부채꼴에서 누른 위치와 가장 가까운 카드를 선택합니다."
                        accessibilityState={{ disabled: selectedCards.length >= 3 }}
                        disabled={selectedCards.length >= 3}
                        onPress={(event) => handleFanPress(group, event)}
                        style={styles.fanHitLayer}
                      />
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.slots}>
                {slotLabels.map((label, index) => {
                  const selected = resolvedSelections[index];

                  return (
                    <View key={label} style={styles.slotWrap}>
                      <Text style={styles.slotRole}>{slotRoles[index]}</Text>
                      <View style={[styles.slot, { width: slotCardSize.width, height: slotCardSize.height }]}>
                        {selected ? (
                          <TarotCard
                            card={selected.card}
                            direction={selected.direction}
                            revealed
                            width={slotCardSize.width}
                            height={slotCardSize.height}
                          />
                        ) : (
                          <Text style={styles.slotText}>{label}</Text>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>

              <View style={styles.footer}>
                <FortuneButton
                  label="결과 보기"
                  disabled={selectedCards.length !== 3}
                  accessibilityHint={
                    selectedCards.length === 3
                      ? "선택한 세 장의 결과 화면으로 이동합니다."
                      : "세 장의 카드를 모두 선택해야 결과를 볼 수 있습니다."
                  }
                  onPress={() => navigation.navigate("Result", { category, selectedCards })}
                />
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
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 24,
    gap: 22
  },
  phoneFrame: {
    width: "100%",
    maxWidth: CARD_SELECT_CONTENT_MAX_WIDTH,
    alignSelf: "center",
    gap: 20
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
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center"
  },
  deckInfo: {
    color: "#d9d0ff",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center"
  },
  drawControlBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(216, 178, 95, 0.22)",
    backgroundColor: "rgba(16, 9, 34, 0.5)",
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  drawMeta: {
    flex: 1,
    color: "#d9d0ff",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "800"
  },
  shuffleButton: {
    minHeight: 40,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  counter: {
    color: "#cbbfff",
    fontSize: 18,
    fontWeight: "900"
  },
  progressRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    paddingTop: 2
  },
  progressItem: {
    width: 104,
    alignItems: "center",
    gap: 4
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(216, 178, 95, 0.45)",
    backgroundColor: "rgba(16, 9, 34, 0.7)"
  },
  progressDotActive: {
    borderColor: "#f4d886",
    backgroundColor: "#d8b25f"
  },
  progressText: {
    color: "#a99ee0",
    fontSize: 11,
    fontWeight: "800",
    textAlign: "center"
  },
  progressTextActive: {
    color: "#f8edc9"
  },
  deckSurface: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(216, 178, 95, 0.18)",
    backgroundColor: "rgba(8, 5, 18, 0.28)",
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 12,
    overflow: "hidden"
  },
  fanGroup: {
    gap: 6
  },
  fanHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 4
  },
  fanTitle: {
    color: "#f8edc9",
    fontSize: 13,
    fontWeight: "900"
  },
  fanSubtitle: {
    color: "#bcb0ee",
    fontSize: 11,
    fontWeight: "800"
  },
  fanStage: {
    alignSelf: "center",
    position: "relative",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(216, 178, 95, 0.14)",
    backgroundColor: "rgba(9, 5, 24, 0.22)"
  },
  fanCardWrap: {
    position: "absolute"
  },
  fanHitLayer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    zIndex: 200
  },
  slots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    minHeight: 168
  },
  slotWrap: {
    alignItems: "center",
    gap: 5
  },
  slot: {
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(216, 178, 95, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(16, 9, 34, 0.58)"
  },
  slotRole: {
    color: "#f4d886",
    fontSize: 10,
    fontWeight: "900"
  },
  slotText: {
    color: "#cbbfff",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
    paddingHorizontal: 6
  },
  footer: {
    paddingTop: 2
  }
});
