import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { backgroundImages, categoryIconImages } from "../assets/images";
import { FortuneButton } from "../components/FortuneButton";
import { useLanguage } from "../i18n/LanguageContext";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { fortuneCategories, type FortuneCategory } from "../types/tarot";
import { getDailyRecommendedCategory } from "../utils/dailyRecommendation";
import { MOBILE_CONTENT_MAX_WIDTH } from "../utils/mobileLayout";

type LobbyScreenProps = NativeStackScreenProps<RootStackParamList, "Lobby">;

export function LobbyScreen({ navigation }: LobbyScreenProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<FortuneCategory | null>(null);
  const recommendedCategory = useMemo(() => getDailyRecommendedCategory(), []);
  const recommendedLabel = t.categories[recommendedCategory];
  const recommendationSelected = selectedCategory === recommendedCategory;

  return (
    <ImageBackground source={backgroundImages.lobby} style={styles.background} imageStyle={styles.backgroundImage}>
      <LinearGradient colors={["rgba(8,5,18,0.64)", "rgba(20,16,52,0.72)", "rgba(36,16,74,0.84)"]} style={styles.gradient}>
        <SafeAreaView style={styles.container}>
          <View style={styles.phoneFrame}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t.common.settings}
              onPress={() => navigation.navigate("Settings")}
              style={({ pressed }) => [styles.settingsButton, pressed && styles.settingsButtonPressed]}
            >
              <Text style={styles.settingsIcon}>⚙</Text>
            </Pressable>

            <View style={styles.header}>
              <Text style={styles.kicker}>{t.lobby.kicker}</Text>
              <Text style={styles.title}>{t.common.appName}</Text>
              <Text style={styles.subtitle}>{t.lobby.subtitle}</Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t.lobby.recommendationAccessibility(recommendedLabel)}
              accessibilityHint={t.lobby.recommendationHint}
              accessibilityState={{ selected: recommendationSelected }}
              onPress={() => setSelectedCategory(recommendedCategory)}
              style={({ pressed }) => [
                styles.recommendationPanel,
                recommendationSelected && styles.recommendationPanelSelected,
                pressed && styles.recommendationPressed
              ]}
            >
              <Text style={styles.recommendationKicker}>{t.lobby.recommendationLabel}</Text>
              <Text style={styles.recommendationTitle}>{recommendedLabel}</Text>
              <Text style={styles.recommendationBody}>{t.dailyRecommendationMessages[recommendedCategory]}</Text>
            </Pressable>

            <View style={styles.categoryGrid}>
              {fortuneCategories.map((category) => (
                <FortuneButton
                  key={category}
                  iconSource={categoryIconImages[category]}
                  label={t.categories[category]}
                  selected={selectedCategory === category}
                  variant="category"
                  onPress={() => setSelectedCategory(category)}
                  accessibilityHint={t.lobby.categoryHint}
                  style={styles.categoryButton}
                />
              ))}
            </View>

            <View style={styles.footer}>
              <FortuneButton
                label={t.lobby.startButton}
                disabled={!selectedCategory}
                accessibilityHint={selectedCategory ? t.lobby.startEnabledHint : t.lobby.startDisabledHint}
                onPress={() => {
                  if (selectedCategory) {
                    navigation.navigate("CardSelect", { category: selectedCategory });
                  }
                }}
              />
            </View>
          </View>
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
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 12
  },
  phoneFrame: {
    flex: 1,
    width: "100%",
    maxWidth: MOBILE_CONTENT_MAX_WIDTH,
    paddingHorizontal: 8,
    paddingTop: 24,
    paddingBottom: 18,
    justifyContent: "space-between",
    position: "relative"
  },
  settingsButton: {
    position: "absolute",
    top: 12,
    right: 8,
    zIndex: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "rgba(216, 178, 95, 0.38)",
    backgroundColor: "rgba(16, 9, 34, 0.62)",
    alignItems: "center",
    justifyContent: "center"
  },
  settingsButtonPressed: {
    transform: [{ scale: 0.96 }]
  },
  settingsIcon: {
    color: "#f4d886",
    fontSize: 20,
    fontWeight: "900"
  },
  header: {
    gap: 12,
    paddingTop: 12
  },
  kicker: {
    color: "#d8b25f",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center"
  },
  title: {
    color: "#f8edc9",
    fontSize: 42,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 0
  },
  subtitle: {
    color: "#d9d0ff",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center"
  },
  recommendationPanel: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(216, 178, 95, 0.36)",
    backgroundColor: "rgba(216, 178, 95, 0.1)",
    padding: 14,
    gap: 5
  },
  recommendationPanelSelected: {
    borderColor: "#f4d886",
    backgroundColor: "rgba(216, 178, 95, 0.18)"
  },
  recommendationPressed: {
    transform: [{ scale: 0.99 }]
  },
  recommendationKicker: {
    color: "#d8b25f",
    fontSize: 12,
    fontWeight: "900"
  },
  recommendationTitle: {
    color: "#f8edc9",
    fontSize: 20,
    fontWeight: "900"
  },
  recommendationBody: {
    color: "#d9d0ff",
    fontSize: 14,
    lineHeight: 20
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    paddingVertical: 22
  },
  categoryButton: {
    width: "48%"
  },
  footer: {
    gap: 12
  }
});
