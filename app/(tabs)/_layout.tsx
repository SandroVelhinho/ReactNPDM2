import React from "react";
import { Platform } from "react-native";
import { AntDesign, Entypo, Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "light",
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
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
        options={{
          title: "Opções",
          animation: "fade",
          tabBarIcon: ({ color }) => (
            <Octicons name="gear" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
