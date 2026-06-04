import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { backgroundImages } from "../assets/images";
import { FortuneButton } from "../components/FortuneButton";
import { useLanguage } from "../i18n/LanguageContext";
import { languageOptions, translations, type LanguageCode } from "../i18n/translations";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { MOBILE_CONTENT_MAX_WIDTH } from "../utils/mobileLayout";

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, "Settings">;

export function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const selectedOption = languageOptions.find((option) => option.code === language) ?? languageOptions[0];

  const handleLanguagePress = (nextLanguage: LanguageCode) => {
    setLanguage(nextLanguage);
    setOpen(false);
  };

  return (
    <ImageBackground source={backgroundImages.lobby} style={styles.background} imageStyle={styles.backgroundImage}>
      <LinearGradient colors={["rgba(8,5,18,0.7)", "rgba(20,16,52,0.78)", "rgba(36,16,74,0.9)"]} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.phoneFrame}>
              <View style={styles.header}>
                <Text style={styles.kicker}>{t.common.appName}</Text>
                <Text style={styles.title}>{t.settings.title}</Text>
                <Text style={styles.subtitle}>{t.settings.subtitle}</Text>
              </View>

              <View style={styles.panel}>
                <Text style={styles.label}>{t.settings.languageLabel}</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={t.settings.selectLanguage}
                  accessibilityHint={t.settings.selectHint}
                  accessibilityState={{ expanded: open }}
                  onPress={() => setOpen((current) => !current)}
                  style={({ pressed }) => [styles.selectBox, pressed && styles.pressed]}
                >
                  <Text style={styles.selectText}>{selectedOption.label}</Text>
                  <Text style={styles.chevron}>{open ? "▲" : "▼"}</Text>
                </Pressable>

                {open ? (
                  <View style={styles.optionList}>
                    {languageOptions.map((option) => {
                      const active = option.code === language;
                      const optionPack = translations[option.code];

                      return (
                        <Pressable
                          key={option.code}
                          accessibilityRole="button"
                          accessibilityLabel={optionPack.languageNativeName}
                          accessibilityState={{ selected: active }}
                          onPress={() => handleLanguagePress(option.code)}
                          style={({ pressed }) => [
                            styles.option,
                            active && styles.optionActive,
                            pressed && styles.pressed
                          ]}
                        >
                          <View>
                            <Text style={styles.optionText}>{option.label}</Text>
                            <Text style={styles.optionSubText}>{optionPack.languageName}</Text>
                          </View>
                          {active ? <Text style={styles.selectedText}>{t.common.selected}</Text> : null}
                        </Pressable>
                      );
                    })}
                  </View>
                ) : null}
              </View>

              <View style={styles.panel}>
                <Text style={styles.previewTitle}>{t.settings.previewTitle}</Text>
                <Text style={styles.previewBody}>{t.settings.previewBody}</Text>
                <Text style={styles.currentLanguage}>{t.settings.currentLanguage(selectedOption.label)}</Text>
              </View>

              <View style={styles.footer}>
                <FortuneButton label={t.settings.backButton} variant="secondary" onPress={() => navigation.popToTop()} />
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
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 24
  },
  phoneFrame: {
    width: "100%",
    maxWidth: MOBILE_CONTENT_MAX_WIDTH,
    gap: 18
  },
  header: {
    gap: 10,
    paddingTop: 8
  },
  kicker: {
    color: "#d8b25f",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center"
  },
  title: {
    color: "#f8edc9",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center"
  },
  subtitle: {
    color: "#d9d0ff",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center"
  },
  panel: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(216, 178, 95, 0.28)",
    backgroundColor: "rgba(16, 9, 34, 0.72)",
    padding: 16,
    gap: 10
  },
  label: {
    color: "#f4d886",
    fontSize: 15,
    fontWeight: "900"
  },
  selectBox: {
    minHeight: 52,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(244, 216, 134, 0.62)",
    backgroundColor: "rgba(216, 178, 95, 0.13)",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  selectText: {
    color: "#f8edc9",
    fontSize: 17,
    fontWeight: "900"
  },
  chevron: {
    color: "#d8b25f",
    fontSize: 14,
    fontWeight: "900"
  },
  optionList: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(216, 178, 95, 0.24)",
    overflow: "hidden"
  },
  option: {
    minHeight: 54,
    paddingHorizontal: 14,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(8, 5, 18, 0.42)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(216, 178, 95, 0.14)"
  },
  optionActive: {
    backgroundColor: "rgba(216, 178, 95, 0.18)"
  },
  optionText: {
    color: "#f8edc9",
    fontSize: 15,
    fontWeight: "900"
  },
  optionSubText: {
    color: "#bcb0ee",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2
  },
  selectedText: {
    color: "#d8b25f",
    fontSize: 12,
    fontWeight: "900"
  },
  previewTitle: {
    color: "#f4d886",
    fontSize: 15,
    fontWeight: "900"
  },
  previewBody: {
    color: "#efe7ff",
    fontSize: 15,
    lineHeight: 23
  },
  currentLanguage: {
    color: "#d8cfff",
    fontSize: 13,
    fontWeight: "800"
  },
  pressed: {
    transform: [{ scale: 0.99 }]
  },
  footer: {
    paddingTop: 4
  }
});
