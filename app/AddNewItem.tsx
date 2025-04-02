import { View, Text, Alert } from "react-native";
import { useEffect, useState } from "react";
import { Box, Button, Input, VStack } from "native-base";
import BackHeaderComp from "@/components/BackHeaderComp";
import { blueColor } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
const AddNewItem = () => {
  const { category } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allItems, setAllItems] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("to_Dos");
        if (storedItems) {
          setAllItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };
    loadItems();
  }, []);

  const handleSubmit = async () => {
    if (title.trim() === "" || description.trim() === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");

      return;
    }

    const newItem = {
      title,
      description,
      category,
      id: allItems.length + 1,
    };

    try {
      const updatedItems = [...allItems, newItem];
      await AsyncStorage.setItem("to_Dos", JSON.stringify(updatedItems));
      Alert.alert("Sucesso", "Item adicionado com sucesso!");
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  };

  return (
    <Box bg={blueColor} height={"100%"}>
      <BackHeaderComp title={"Add New Item"} />
      <VStack
        space={4}
        alignItems="center"
        justifyContent={"space-evenly"}
        height={"20%"}
        marginX={4}
      >
        <Input
          variant={"outline"}
          size={"2xl"}
          placeholder={`Titulo`}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Input
          variant={"outline"}
          size={"2xl"}
          value={description}
          placeholder={` Pequena descrição`}
          onChangeText={(text) => setDescription(text)}
        />
      </VStack>
      <Button onPress={handleSubmit}>Salvar</Button>
    </Box>
  );
};

export default AddNewItem;
