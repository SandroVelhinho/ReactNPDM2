import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { HStack } from "native-base";
import { blueColor } from "@/constants/Colors";
import { useRouter } from "expo-router";

const BackHeaderComp = ({ title }) => {
  const router = useRouter();
  return (
    <View style={styles.rectangleView}>
      <HStack marginLeft={3} space={5} alignItems={"center"} height={81}>
        <Pressable onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={40} color={"white"} />
        </Pressable>
        <Text style={styles.title}>{title}</Text>
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangleView: {
    backgroundColor: blueColor,
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomWidth: 1,
    width: "100%",
    height: 81,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    color: "#fff",
  },
});
export default BackHeaderComp;
