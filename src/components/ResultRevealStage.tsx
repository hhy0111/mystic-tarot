import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated";

import { useLanguage } from "../i18n/LanguageContext";
import { getCardDisplayName } from "../i18n/translations";
import type { ResolvedCardSelection } from "../types/tarot";
import { getFocusedResultCardSize, RESULT_CARD_GAP } from "../utils/mobileLayout";
import {
  getRevealEffectTone,
  REVEAL_FOCUS_DURATION_MS,
  REVEAL_HOLD_DURATION_MS,
  REVEAL_SETTLE_DURATION_MS,
  type RevealEffectTone
} from "../utils/revealEffects";
import { TarotCard } from "./TarotCard";

type CardSize = {
  width: number;
  height: number;
};

type ResultRevealStageProps = {
  cards: ResolvedCardSelection[];
  cardSize: CardSize;
  contentWidth: number;
  focusIndex: number | null;
  settledCount: number;
};

type AuraProps = {
  tone: RevealEffectTone;
  active?: boolean;
  compact?: boolean;
};

function CardAura({ tone, active = true, compact = false }: AuraProps) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (!active) {
      pulse.value = 0;
      return;
    }

    pulse.value = withRepeat(withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }), -1, true);
  }, [active, pulse]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: active ? interpolate(pulse.value, [0, 1], compact ? [0.26, 0.46] : [0.36, 0.72]) : 0,
    transform: [{ scale: interpolate(pulse.value, [0, 1], compact ? [0.98, 1.04] : [0.94, 1.1]) }]
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.aura,
        compact && styles.compactAura,
        tone === "positive" ? styles.positiveAura : styles.cautionAura,
        animatedStyle
      ]}
    >
      <View style={[styles.innerAura, tone === "positive" ? styles.positiveInner : styles.cautionInner]} />
    </Animated.View>
  );
}

export function ResultRevealStage({
  cards,
  cardSize,
  contentWidth,
  focusIndex,
  settledCount
}: ResultRevealStageProps) {
  const { language, t } = useLanguage();
  const progress = useSharedValue(2);
  const focusCardSize = getFocusedResultCardSize(contentWidth);
  const activeIndex = focusIndex ?? 0;
  const activeCard = focusIndex === null ? null : cards[focusIndex];
  const rowWidth = cardSize.width * cards.length + RESULT_CARD_GAP * Math.max(0, cards.length - 1);
  const rowStartX = Math.max(0, (contentWidth - rowWidth) / 2);
  const targetCenterX = rowStartX + activeIndex * (cardSize.width + RESULT_CARD_GAP) + cardSize.width / 2;
  const stageCenterX = contentWidth / 2;
  const targetTranslateX = targetCenterX - stageCenterX;
  const targetScale = cardSize.width / focusCardSize.width;
  const focusBlockHeight = focusCardSize.height + 46;
  const finalBlockHeight = cardSize.height + 42;
  const targetTranslateY = (finalBlockHeight - focusBlockHeight) / 2;
  const sequenceComplete = settledCount >= cards.length && focusIndex === null;
  const stageHeight = sequenceComplete ? finalBlockHeight : Math.max(focusBlockHeight, finalBlockHeight);

  useEffect(() => {
    if (focusIndex === null) {
      progress.value = 2;
      return;
    }

    progress.value = 0;
    progress.value = withSequence(
      withTiming(1, { duration: REVEAL_FOCUS_DURATION_MS, easing: Easing.out(Easing.cubic) }),
      withDelay(
        REVEAL_HOLD_DURATION_MS,
        withTiming(2, { duration: REVEAL_SETTLE_DURATION_MS, easing: Easing.inOut(Easing.cubic) })
      )
    );
  }, [focusIndex, progress]);

  const focusStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.18, 1.82, 2], [0, 1, 1, 0]),
    transform: [
      { translateX: interpolate(progress.value, [0, 1, 2], [0, 0, targetTranslateX]) },
      { translateY: interpolate(progress.value, [0, 1, 2], [28, 0, targetTranslateY]) },
      { scale: interpolate(progress.value, [0, 1, 2], [0.82, 1, targetScale]) }
    ]
  }));

  return (
    <View style={[styles.stage, { width: contentWidth, minHeight: stageHeight }]}>
      <View style={styles.cardRow}>
        {cards.map((selection, index) => {
          const revealed = index < settledCount;
          const tone = getRevealEffectTone(selection.direction);
          const cardName = getCardDisplayName(selection.card, language);

          return (
            <View key={`${selection.cardId}-${selection.position}`} style={[styles.resultCardItem, { width: cardSize.width }]}>
              {revealed ? <CardAura tone={tone} compact /> : null}
              <TarotCard
                card={selection.card}
                direction={selection.direction}
                revealed={revealed}
                width={cardSize.width}
                height={cardSize.height}
                showFaceMeta={false}
                style={!revealed && styles.pendingCard}
              />
              <View style={styles.cardCaptionBlock}>
                <Text style={styles.cardCaption} numberOfLines={1} adjustsFontSizeToFit>
                  {cardName}
                </Text>
                <Text style={[styles.cardDirection, tone === "positive" ? styles.positiveText : styles.cautionText]}>
                  {t.directions[selection.direction]}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {activeCard ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.focusCard,
            {
              left: (contentWidth - focusCardSize.width) / 2,
              width: focusCardSize.width
            },
            focusStyle
          ]}
        >
          <CardAura tone={getRevealEffectTone(activeCard.direction)} />
          <TarotCard
            card={activeCard.card}
            direction={activeCard.direction}
            revealed
            width={focusCardSize.width}
            height={focusCardSize.height}
            showFaceMeta={false}
          />
          <View style={styles.focusCaptionBlock}>
            <Text style={styles.focusCaption}>{getCardDisplayName(activeCard.card, language)}</Text>
            <Text
              style={[
                styles.focusDirection,
                getRevealEffectTone(activeCard.direction) === "positive" ? styles.positiveText : styles.cautionText
              ]}
            >
              {t.directions[activeCard.direction]}
            </Text>
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    alignSelf: "center",
    justifyContent: "flex-start"
  },
  cardRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: RESULT_CARD_GAP
  },
  resultCardItem: {
    alignItems: "center",
    gap: 7
  },
  pendingCard: {
    opacity: 0.18
  },
  cardCaptionBlock: {
    width: "100%",
    alignItems: "center",
    gap: 2
  },
  cardCaption: {
    color: "#f8edc9",
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center"
  },
  cardDirection: {
    fontSize: 11,
    fontWeight: "800"
  },
  focusCard: {
    position: "absolute",
    top: 0,
    zIndex: 20,
    alignItems: "center",
    gap: 9
  },
  focusCaptionBlock: {
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "rgba(8, 5, 18, 0.62)",
    borderWidth: 1,
    borderColor: "rgba(216, 178, 95, 0.28)"
  },
  focusCaption: {
    color: "#f8edc9",
    fontSize: 18,
    fontWeight: "900"
  },
  focusDirection: {
    fontSize: 13,
    fontWeight: "900"
  },
  aura: {
    position: "absolute",
    top: -18,
    right: -18,
    bottom: 28,
    left: -18,
    borderRadius: 22,
    borderWidth: 2
  },
  compactAura: {
    top: -5,
    right: -5,
    bottom: 36,
    left: -5,
    borderRadius: 16,
    borderWidth: 1
  },
  positiveAura: {
    borderColor: "rgba(248, 216, 134, 0.72)",
    backgroundColor: "rgba(216, 178, 95, 0.12)",
    shadowColor: "#f4d886",
    shadowOpacity: 0.92,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 }
  },
  cautionAura: {
    borderColor: "rgba(159, 134, 255, 0.72)",
    backgroundColor: "rgba(88, 61, 168, 0.18)",
    shadowColor: "#8f7cff",
    shadowOpacity: 0.82,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 }
  },
  innerAura: {
    flex: 1,
    margin: 7,
    borderRadius: 18,
    borderWidth: 1
  },
  positiveInner: {
    borderColor: "rgba(157, 255, 196, 0.28)"
  },
  cautionInner: {
    borderColor: "rgba(195, 184, 255, 0.3)"
  },
  positiveText: {
    color: "#f4d886"
  },
  cautionText: {
    color: "#b8a9ff"
  }
});
