import { View, Text } from "react-native";
import React from "react";
import { Box, ScrollView } from "native-base";
import HeaderComp from "@/components/home/HeaderComp";
import { blueColor } from "@/constants/Colors";

const Options = () => {
  return (
    <Box safeAreaTop bg={blueColor} height={"100%"}>
      <HeaderComp title={"All Categorys"} />
      <ScrollView height={"100%"}></ScrollView>
    </Box>
  );
};

export default Options;
