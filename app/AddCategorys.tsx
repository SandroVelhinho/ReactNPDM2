import { View, Text } from "react-native";
import { useState } from "react";
import { ScrollView, Box, Button, FlatList, HStack, Center } from "native-base";
import { blueColor } from "@/constants/Colors";
import BackHeaderComp from "@/components/BackHeaderComp";
import { categorys } from "@/constants/consts";

const AddCategorys = () => {
  const [categorysArray, setCategorys] = useState(categorys);

  const handleCategoryRemove = (category) => {
    setCategorys(categorysArray.filter((c) => c !== category));
  };

  const handleCategoryAdd = () => {
    const category = prompt("New Category");
    setCategorys([...categorysArray, category]);
  };
  return (
    <Box safeAreaTop bg={blueColor} height={"100%"}>
      <BackHeaderComp title={"Editar Categorias"} />
      <Button onPress={handleCategoryAdd}>Add Category</Button>
      <FlatList
        data={categorysArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Center style={{ padding: 10, margin: 10, backgroundColor: "white" }}>
            <HStack justifyContent={"space-evenly"} width={"100%"}>
              <Text style={{ fontSize: 20, color: "black" }}>{item}</Text>
              <Button onPress={() => handleCategoryRemove(item)}>Delete</Button>
            </HStack>
          </Center>
        )}
      />
    </Box>
  );
};

export default AddCategorys;
