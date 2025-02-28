import { View, Text } from "react-native";
import React from "react";
import { Box, ScrollView } from "native-base";
import HeaderComp from "@/components/home/HeaderComp";
import { blueColor } from "@/constants/Colors";
import OptionViewConstuctor from "@/components/Options/OptionViewConstuctor";

const Options = () => {
  return (
    <Box safeAreaTop bg={blueColor} height={"100%"}>
      <HeaderComp title={"All Categorys"} />
      <ScrollView height={"100%"}>
        <OptionViewConstuctor
          navigate={"AddCategorys"}
          title={"Editar Categorias"}
        />
      </ScrollView>
    </Box>
  );
};

export default Options;
