import "react-native-reanimated";

import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { FixedBannerAd } from "./src/components/FixedBannerAd";
import { LanguageProvider } from "./src/i18n/LanguageContext";
import { AppNavigator } from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0b0618" />
      <LanguageProvider>
        <View style={styles.appRoot}>
          <View style={styles.navigatorArea}>
            <AppNavigator />
          </View>
          <FixedBannerAd />
        </View>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appRoot: {
    flex: 1,
    backgroundColor: "#080512"
  },
  navigatorArea: {
    flex: 1,
    minHeight: 0
  }
});
