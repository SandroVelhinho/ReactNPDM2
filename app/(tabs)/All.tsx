import { StyleSheet, Text, TouchableOpacity, Modal, Alert } from "react-native";
import {
  Box,
  ScrollView,
  FlatList,
  View,
  Center,
  Button,
  VStack,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { blueColor, darkBlueColor } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import HeaderComp from "@/components/home/HeaderComp";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [asyncCategorys, setAsyncCategorys] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Armazena o item a ser removido
  const [modalVisible, setModalVisible] = useState(false); // Controle do modal
  const router = useRouter();
  useFocusEffect(
    useCallback(() => {
      const loadCategories = async () => {
        try {
          const storedCategorys = await AsyncStorage.getItem("categorias");
          if (storedCategorys) {
            setAsyncCategorys(JSON.parse(storedCategorys));
          }
        } catch (error) {
          console.error("Erro ao carregar categorias:", error);
        }
      };

      const loadItems = async () => {
        try {
          const storedItems = await AsyncStorage.getItem("to_Dos");
          if (storedItems) {
            setAllItems(JSON.parse(storedItems));
          }
        } catch (error) {
          console.error("Erro ao carregar itens:", error);
        }
      };

      loadCategories();
      loadItems();
    }, [])
  );

  const removeItem = async () => {
    if (!selectedItem) return;

    try {
      const updatedItems = allItems.filter(
        (item) => item.id !== selectedItem.id
      );
      await AsyncStorage.setItem("to_Dos", JSON.stringify(updatedItems));
      setAllItems(updatedItems);
      setModalVisible(false);
      Alert.alert("Sucesso", "Item removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  };

  return (
    <Box safeAreaTop bg={blueColor} height={"100%"}>
      <HeaderComp title={"Todos os Itens"} />
      <ScrollView height={"100%"} marginBottom={10}>
        <Box marginBottom={10}>
          {asyncCategorys.length === 0 ? (
            <Center>
              <VStack width={"90%"}>
                <Text style={styles.title}>
                  Ainda sem categorias adicionadas
                </Text>
                <Text style={styles.title}>
                  Adicione uma categoria na página de Opções
                </Text>
              </VStack>
            </Center>
          ) : (
            asyncCategorys.map((category, index) => (
              <Box
                key={index}
                bg={darkBlueColor}
                marginY={5}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 20,
                }}
              >
                <Text style={styles.title}>{category}</Text>
                <FlatList
                  height={120}
                  data={allItems.filter((item) => item.category === category)}
                  keyExtractor={(item, idx) => idx.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedItem(item);
                        setModalVisible(true);
                      }}
                    >
                      <Box style={styles.whiteBox}>
                        <Text>{item.title}</Text>
                        <Text style={styles.description}>
                          {item.description}
                        </Text>
                      </Box>
                    </TouchableOpacity>
                  )}
                  horizontal={true}
                  ListHeaderComponent={() => <View style={{ width: 10 }} />}
                  ListFooterComponent={() => (
                    <Center alignSelf={"center"} top={5} marginX={10}>
                      <TouchableOpacity
                        onPress={() =>
                          router.push("/AddNewItem?category=${category}")
                        }
                      >
                        <AntDesign
                          name="pluscircle"
                          size={60}
                          color="white"
                          style={{ alignSelf: "center" }}
                        />
                      </TouchableOpacity>
                    </Center>
                  )}
                  showsHorizontalScrollIndicator={true}
                />
              </Box>
            ))
          )}
        </Box>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Center flex={1} bg="rgba(0,0,0,0.5)">
          <Box bg="white" p={5} borderRadius={10} alignItems="center">
            <Text style={styles.modalText}>Deseja remover este item?</Text>
            <Text style={styles.description}>{selectedItem?.title}</Text>
            <VStack space={4} mt={5}>
              <Button onPress={removeItem} colorScheme="red">
                Remover
              </Button>
              <Button onPress={() => setModalVisible(false)}>Cancelar</Button>
            </VStack>
          </Box>
        </Center>
      </Modal>
    </Box>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 25,
    marginTop: 50,
    marginLeft: 30,
    color: "white",
  },
  whiteBox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  description: {
    fontWeight: "400",
    fontSize: 20,
    color: "black",
    maxWidth: 300,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
