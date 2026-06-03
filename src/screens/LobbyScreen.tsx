import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { backgroundImages, categoryIconImages } from "../assets/images";
import { FortuneButton } from "../components/FortuneButton";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { fortuneCategories, fortuneCategoryLabels, type FortuneCategory } from "../types/tarot";
import {
  dailyRecommendationMessages,
  getDailyRecommendedCategory
} from "../utils/dailyRecommendation";
import { MOBILE_CONTENT_MAX_WIDTH } from "../utils/mobileLayout";

type LobbyScreenProps = NativeStackScreenProps<RootStackParamList, "Lobby">;

export function LobbyScreen({ navigation }: LobbyScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<FortuneCategory | null>(null);
  const recommendedCategory = useMemo(() => getDailyRecommendedCategory(), []);
  const recommendedLabel = fortuneCategoryLabels[recommendedCategory];
  const recommendationSelected = selectedCategory === recommendedCategory;

  return (
    <ImageBackground source={backgroundImages.lobby} style={styles.background} imageStyle={styles.backgroundImage}>
      <LinearGradient colors={["rgba(8,5,18,0.64)", "rgba(20,16,52,0.72)", "rgba(36,16,74,0.84)"]} style={styles.gradient}>
        <SafeAreaView style={styles.container}>
          <View style={styles.phoneFrame}>
            <View style={styles.header}>
              <Text style={styles.kicker}>오늘의 카드가 열리는 시간</Text>
              <Text style={styles.title}>Mystic Tarot</Text>
              <Text style={styles.subtitle}>운세를 고르고 세 장을 펼쳐 보세요.</Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`오늘의 추천 리딩 ${recommendedLabel}`}
              accessibilityHint="선택하면 추천 운세 항목이 활성화됩니다."
              accessibilityState={{ selected: recommendationSelected }}
              onPress={() => setSelectedCategory(recommendedCategory)}
              style={({ pressed }) => [
                styles.recommendationPanel,
                recommendationSelected && styles.recommendationPanelSelected,
                pressed && styles.recommendationPressed
              ]}
            >
              <Text style={styles.recommendationKicker}>오늘의 추천 리딩</Text>
              <Text style={styles.recommendationTitle}>{recommendedLabel}</Text>
              <Text style={styles.recommendationBody}>{dailyRecommendationMessages[recommendedCategory]}</Text>
            </Pressable>

            <View style={styles.categoryGrid}>
              {fortuneCategories.map((category) => (
                <FortuneButton
                  key={category}
                  iconSource={categoryIconImages[category]}
                  label={fortuneCategoryLabels[category]}
                  selected={selectedCategory === category}
                  variant="category"
                  onPress={() => setSelectedCategory(category)}
                  accessibilityHint="선택하면 카드 뽑기 시작 버튼이 활성화됩니다."
                  style={styles.categoryButton}
                />
              ))}
            </View>

            <View style={styles.footer}>
              <FortuneButton
                label="카드 뽑기 시작"
                disabled={!selectedCategory}
                accessibilityHint={selectedCategory ? "선택한 운세의 카드 선택 화면으로 이동합니다." : "운세 항목을 먼저 선택하세요."}
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
    justifyContent: "space-between"
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
