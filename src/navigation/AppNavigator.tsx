import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CardSelectScreen } from "../screens/CardSelectScreen";
import { LobbyScreen } from "../screens/LobbyScreen";
import { ResultScreen } from "../screens/ResultScreen";
import type { CardSelection, FortuneCategory } from "../types/tarot";

export type RootStackParamList = {
  Lobby: undefined;
  CardSelect: {
    category: FortuneCategory;
  };
  Result: {
    category: FortuneCategory;
    selectedCards: CardSelection[];
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const mysticTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#0b0618",
    card: "#140b2d",
    text: "#f8edc9",
    primary: "#d8b25f",
    border: "#2c1a52"
  }
};

export function AppNavigator() {
  return (
    <NavigationContainer theme={mysticTheme}>
      <Stack.Navigator
        initialRouteName="Lobby"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0b0618" },
          animation: "fade_from_bottom"
        }}
      >
        <Stack.Screen name="Lobby" component={LobbyScreen} />
        <Stack.Screen name="CardSelect" component={CardSelectScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
