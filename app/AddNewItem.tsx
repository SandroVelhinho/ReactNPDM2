import { View, Text } from "react-native";
import React from "react";
import { Box } from "native-base";
import BackHeaderComp from "@/components/BackHeaderComp";
const AddNewItem = ({ route }) => {
    const category = route.params.category;
  return (
    <Box bg={"grey"} height={"100%"}>
      <BackHeaderComp title={"Add New Item"} />
      {category}
    </Box>
  );
};

export default AddNewItem;
