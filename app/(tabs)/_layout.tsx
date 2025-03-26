import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  FontAwesome5,
  Fontisto,
  Ionicons,
  Octicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import HomeScreen from "./All";
import Filter from "./Filter";
import Options from "./Options";
import { Box } from "native-base";

const Tabs = createBottomTabNavigator();
export default function TabLayout() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "light",
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          android: {
            position: "absolute",
            borderTopWidth: 0,
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="All"
        component={HomeScreen}
        options={{
          title: "Todos",
          animation: "fade",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Filter"
        component={Filter}
        options={{
          title: "Filtro",
          animation: "fade",
          tabBarIcon: ({ color }) => (
            <Entypo name="magnifying-glass" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="Options"
        component={Options}
        options={{
          title: "Opções",
          animation: "fade",
          tabBarIcon: ({ color }) => (
            <Octicons name="gear" color={color} size={24} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
