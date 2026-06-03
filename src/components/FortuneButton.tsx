import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle
} from "react-native";

type FortuneButtonProps = {
  label: string;
  iconSource?: ImageSourcePropType;
  onPress?: () => void;
  selected?: boolean;
  disabled?: boolean;
  accessibilityHint?: string;
  variant?: "category" | "primary" | "secondary";
  style?: StyleProp<ViewStyle>;
};

function blurActiveElementOnWeb() {
  if (Platform.OS !== "web") {
    return;
  }

  const maybeDocument = (globalThis as typeof globalThis & {
    document?: { activeElement?: { blur?: () => void } | null };
  }).document;

  maybeDocument?.activeElement?.blur?.();
}

export function FortuneButton({
  label,
  iconSource,
  onPress,
  selected = false,
  disabled = false,
  accessibilityHint,
  variant = "primary",
  style
}: FortuneButtonProps) {
  const handlePress = () => {
    blurActiveElementOnWeb();
    onPress?.();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled, selected }}
      disabled={disabled}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        selected && styles.selected,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style
      ]}
    >
      <View style={styles.content}>
        {iconSource ? (
          <View style={styles.iconFrame}>
            <Image source={iconSource} style={styles.icon} resizeMode="cover" />
          </View>
        ) : null}
        <Text
          style={[
            styles.text,
            variant === "category" && styles.categoryText,
            variant === "secondary" && styles.secondaryText,
            disabled && styles.disabledText
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  iconFrame: {
    width: 30,
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(244, 216, 134, 0.48)",
    backgroundColor: "rgba(216, 178, 95, 0.14)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 5
  },
  category: {
    backgroundColor: "rgba(42, 24, 82, 0.86)",
    borderColor: "rgba(216, 178, 95, 0.24)"
  },
  primary: {
    backgroundColor: "#d8b25f",
    borderColor: "#f4d886"
  },
  secondary: {
    backgroundColor: "rgba(216, 178, 95, 0.12)",
    borderColor: "rgba(216, 178, 95, 0.45)"
  },
  selected: {
    backgroundColor: "rgba(216, 178, 95, 0.22)",
    borderColor: "#f4d886"
  },
  disabled: {
    opacity: 0.42
  },
  pressed: {
    transform: [{ scale: 0.98 }]
  },
  text: {
    color: "#120820",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center"
  },
  categoryText: {
    color: "#f8edc9"
  },
  secondaryText: {
    color: "#f8edc9"
  },
  disabledText: {
    color: "#c9bfa7"
  }
});
