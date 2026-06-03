import { useEffect } from "react";
import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated";

type GlowEffectProps = {
  active?: boolean;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
};

export function GlowEffect({ active = true, borderRadius = 18, style }: GlowEffectProps) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (!active) {
      cancelAnimation(pulse);
      pulse.value = 0;
      return;
    }

    pulse.value = withRepeat(withTiming(1, { duration: 1200 }), -1, true);

    return () => cancelAnimation(pulse);
  }, [active, pulse]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: active ? 0.36 + pulse.value * 0.24 : 0,
    transform: [{ scale: 1 + pulse.value * 0.06 }]
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.glow, { borderRadius }, animatedStyle, style]}
    />
  );
}

const styles = StyleSheet.create({
  glow: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderWidth: 2,
    borderColor: "rgba(216, 178, 95, 0.74)",
    backgroundColor: "rgba(216, 178, 95, 0.05)",
    shadowColor: "#d8b25f",
    shadowOpacity: 0.9,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 }
  }
});
