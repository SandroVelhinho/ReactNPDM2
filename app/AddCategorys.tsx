import { useState, useEffect, useCallback } from "react";
import { Modal, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, Button, FlatList, HStack, Center, Text } from "native-base";
import { blueColor } from "@/constants/Colors";
import BackHeaderComp from "@/components/BackHeaderComp";

const AddCategorys = () => {
  const [categorysArray, setCategorys] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const savedCategories = await AsyncStorage.getItem("categorias");
        if (savedCategories) {
          setCategorys(JSON.parse(savedCategories));
        }
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };
    loadCategories();
  }, []);

  const saveCategories = async (categories) => {
    try {
      await AsyncStorage.setItem("categorias", JSON.stringify(categories));
    } catch (error) {
      console.error("Erro ao salvar categorias:", error);
    }
  };

  const handleCategoryRemove = useCallback((category) => {
    setCategorys((prevCategorys) => {
      const updatedCategories = prevCategorys.filter((c) => c !== category);
      saveCategories(updatedCategories);
      return updatedCategories;
    });
  }, []);

  const handleCategoryAdd = useCallback(() => {
    setModalVisible(true); // Abre o modal
  }, []);

  const confirmCategoryAdd = () => {
    if (newCategory.trim() !== "") {
      setCategorys((prevCategorys) => {
        const updatedCategories = [...prevCategorys, newCategory];
        saveCategories(updatedCategories);
        return updatedCategories;
      });
    }
    setNewCategory("");
    setModalVisible(false);
  };

  return (
    <Box safeAreaTop bg={blueColor} height={"100%"} p={4}>
      <BackHeaderComp title={"Editar Categorias"} />
      <Button onPress={handleCategoryAdd} mt={2}>
        Add Category
      </Button>
      {categorysArray.length === 0 ? (
        <Text
          style={{
            fontSize: 20,
            color: "white",
            textAlign: "center",
            margin: 10,
          }}
        >
          Nenhuma categoria adicionada
        </Text>
      ) : (
        <FlatList
          data={categorysArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Center
              style={{
                padding: 10,
                margin: 10,
                backgroundColor: "white",
                borderRadius: 10,
              }}
            >
              <HStack justifyContent={"space-evenly"} width={"100%"}>
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    height: "100%",
                    top: "20%",
                  }}
                >
                  {item}
                </Text>
                <Button onPress={() => handleCategoryRemove(item)}>
                  Delete
                </Button>
              </HStack>
            </Center>
          )}
        />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <Center flex={1} bg="rgba(0,0,0,0.5)">
          <Box bg="white" p={5} borderRadius={10} width="80%">
            <Text fontSize={18} mb={2}>
              Nova Categoria
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "gray",
                padding: 10,
                borderRadius: 5,
              }}
              placeholder="Digite a categoria"
              value={newCategory}
              onChangeText={setNewCategory}
            />
            <HStack mt={4} justifyContent="space-between">
              <Button onPress={() => setModalVisible(false)}>Cancelar</Button>
              <Button onPress={confirmCategoryAdd}>Adicionar</Button>
            </HStack>
          </Box>
        </Center>
      </Modal>
    </Box>
  );
};

export default AddCategorys;
