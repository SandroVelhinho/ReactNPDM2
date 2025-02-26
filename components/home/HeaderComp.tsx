import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Box, Center } from "native-base";
import { blueColor } from "@/constants/Colors";
export default function HeaderComp({ title }: any) {
  return (
    <Box style={styles.rectangleView}>
      <Text style={styles.title}>{title}</Text>
    </Box>
  );
}
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
    height: "100%",
    top: 22,
    marginLeft: 20,
  },
});
