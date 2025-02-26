import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";

import TabLayout from "./(tabs)/_layout";
import { NativeBaseProvider } from "native-base";
import AddNewItem from "./AddNewItem";

// Prevent the splash screen from auto-hiding before asset loading is complete.
const Stack = createNativeStackNavigator();
export default function RootLayout() {
  return (
    <NavigationIndependentTree>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="(tabs)"
              component={TabLayout}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddNewItem"
              component={AddNewItem}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </NavigationIndependentTree>
  );
}
