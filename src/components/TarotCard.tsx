import { useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";

import { cardFrontImages, tarotCardBackImage, tarotCardBackSelectedImage } from "../assets/images";
import { useLanguage } from "../i18n/LanguageContext";
import { getCardDisplayName } from "../i18n/translations";
import type { CardDirection, TarotCard as TarotCardData } from "../types/tarot";
import { GlowEffect } from "./GlowEffect";

type TarotCardProps = {
  card?: TarotCardData;
  direction?: CardDirection;
  revealed?: boolean;
  selected?: boolean;
  selectedOrder?: number;
  disabled?: boolean;
  width: number;
  height: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  placeholderLabel?: string;
  showFaceMeta?: boolean;
};

export function TarotCard({
  card,
  direction = "upright",
  revealed = false,
  selected = false,
  selectedOrder,
  disabled = false,
  width,
  height,
  onPress,
  style,
  placeholderLabel,
  showFaceMeta = true
}: TarotCardProps) {
  const { language, t } = useLanguage();
  const flip = useSharedValue(revealed ? 1 : 0);
  const lift = useSharedValue(selected ? 1 : 0);
  const frontImage = card ? cardFrontImages[card.imageKey] : undefined;
  const backImage = selected ? tarotCardBackSelectedImage : tarotCardBackImage;
  const cardDisplayName = card ? getCardDisplayName(card, language) : t.card.hiddenCard;
  const accessibilityLabel = card
    ? `${cardDisplayName} ${t.directions[direction]}`
    : selectedOrder
      ? t.card.selectedOrderLabel(selectedOrder)
      : t.card.selectLabel;

  useEffect(() => {
    flip.value = withTiming(revealed ? 1 : 0, { duration: 720 });
  }, [flip, revealed]);

  useEffect(() => {
    lift.value = selected ? withSpring(1, { damping: 15, stiffness: 150 }) : withTiming(0);
  }, [lift, selected]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: selected && onPress ? interpolate(lift.value, [0, 1], [1, 0.28]) : 1,
    transform: [
      { translateY: selected && onPress ? interpolate(lift.value, [0, 1], [0, 92]) : 0 },
      { scale: selected ? interpolate(lift.value, [0, 1], [1, 0.82]) : 1 }
    ]
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 900 }, { rotateY: `${interpolate(flip.value, [0, 1], [0, 180])}deg` }]
  }));

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 900 }, { rotateY: `${interpolate(flip.value, [0, 1], [180, 360])}deg` }]
  }));

  return (
    <Animated.View style={[{ width, height }, containerStyle, style]}>
      <Pressable
        accessibilityRole={onPress ? "button" : undefined}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: disabled || !onPress, selected }}
        disabled={disabled || !onPress}
        onPress={onPress}
        style={styles.pressable}
      >
        {selected && !onPress ? <GlowEffect borderRadius={12} /> : null}
        <Animated.View style={[styles.face, styles.backFace, backStyle]}>
          <Image source={backImage} style={styles.cardImage} resizeMode="cover" />
          <View style={styles.backOverlay}>
            {selectedOrder ? (
              <View style={styles.orderBadge}>
                <Text style={styles.orderText}>{selectedOrder}</Text>
              </View>
            ) : null}
            {placeholderLabel ? <Text style={styles.placeholder}>{placeholderLabel}</Text> : null}
          </View>
        </Animated.View>
        <Animated.View style={[styles.face, styles.frontFace, frontStyle]}>
          {frontImage ? <Image source={frontImage} style={styles.cardImage} resizeMode="cover" /> : null}
          {revealed ? <GlowEffect borderRadius={12} /> : null}
          {showFaceMeta || !frontImage ? (
            <View style={[styles.frontLabel, !frontImage && styles.frontFallback]}>
              {!frontImage ? (
                <View style={styles.symbolCircle}>
                  <Text style={styles.symbol}>✧</Text>
                </View>
              ) : null}
              <View style={styles.nameBlock}>
                <Text style={styles.cardNameKo} numberOfLines={1} adjustsFontSizeToFit>
                  {cardDisplayName}
                </Text>
                <Text style={styles.cardName} numberOfLines={1} adjustsFontSizeToFit>
                  {card?.name ?? t.card.hiddenArcana}
                </Text>
              </View>
              <Text style={styles.direction}>{t.directions[direction]}</Text>
            </View>
          ) : null}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1
  },
  face: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    backfaceVisibility: "hidden"
  },
  backFace: {
    backgroundColor: "#1a0d37",
    borderColor: "#7d5ad8"
  },
  frontFace: {
    backgroundColor: "#241545",
    borderColor: "#d8b25f"
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%"
  },
  backOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 7
  },
  orderBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(248, 237, 201, 0.88)",
    backgroundColor: "rgba(8, 5, 18, 0.66)"
  },
  orderText: {
    color: "#f8edc9",
    fontSize: 14,
    fontWeight: "900"
  },
  placeholder: {
    marginTop: 4,
    color: "#cbbfff",
    fontSize: 10,
    textAlign: "center"
  },
  frontLabel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 6,
    paddingBottom: 6,
    paddingHorizontal: 5,
    backgroundColor: "rgba(8, 5, 18, 0.03)"
  },
  frontFallback: {
    backgroundColor: "rgba(216, 178, 95, 0.06)"
  },
  nameBlock: {
    alignItems: "center",
    maxWidth: "100%",
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: "rgba(8, 5, 18, 0.4)"
  },
  cardNameKo: {
    color: "#f8edc9",
    fontSize: 11,
    fontWeight: "900",
    textAlign: "center"
  },
  cardName: {
    color: "#cbbfff",
    fontSize: 8,
    fontWeight: "700",
    textAlign: "center"
  },
  symbolCircle: {
    width: "54%",
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(244, 216, 134, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(11, 6, 24, 0.46)"
  },
  symbol: {
    color: "#f4d886",
    fontSize: 24
  },
  direction: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: "rgba(8, 5, 18, 0.48)",
    color: "#d8b25f",
    fontSize: 8,
    fontWeight: "800"
  }
});
