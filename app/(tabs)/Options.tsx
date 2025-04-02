import { View, Text, Pressable, StyleSheet, Modal, Alert } from "react-native";
import React, { useState } from "react";
import { Box, Center, HStack, ScrollView, Button, VStack } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderComp from "@/components/home/HeaderComp";
import { blueColor } from "@/constants/Colors";
import OptionViewConstuctor from "@/components/Options/OptionViewConstuctor";
import { AntDesign } from "@expo/vector-icons";
import { SignOutButton } from "@/components/Options/Signout";

const Options = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const removeAllItems = async () => {
    try {
      await AsyncStorage.removeItem("to_Dos");
      setModalVisible(false);
      Alert.alert("Sucesso", "Todos os itens foram removidos!");
    } catch (error) {
      console.error("Erro ao remover itens:", error);
    }
  };

  return (
    <Box safeAreaTop bg={blueColor} height={"100%"}>
      <HeaderComp title={"Opções"} />
      <ScrollView height={"100%"}>
        <OptionViewConstuctor
          navigate={"/AddCategorys"}
          title={"Editar Categorias"}
        />
        <View style={styles.viewStyle}>
          <Pressable onPress={() => setModalVisible(true)}>
            <HStack space={6} marginLeft={5}>
              <Text style={styles.title}>Remover Todos os Itens</Text>
              <Center maxWidth={50}>
                <AntDesign name="arrowright" size={24} color="white" />
              </Center>
            </HStack>
          </Pressable>
        </View>
        <SignOutButton />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Center flex={1} bg="rgba(0,0,0,0.5)">
          <Box bg="white" p={5} borderRadius={10} alignItems="center">
            <Text style={styles.modalText}>
              Tem certeza que deseja remover todos os itens?
            </Text>
            <VStack space={4} mt={5}>
              <Button onPress={removeAllItems} colorScheme="red">
                Remover
              </Button>
              <Button onPress={() => setModalVisible(false)}>Cancelar</Button>
            </VStack>
          </Box>
        </Center>
      </Modal>
    </Box>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    width: "100%",
    height: 70,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: "white",
    justifyContent: "center",
  },
  title: {
    fontSize: 21,
    fontWeight: "500",
    color: "#fff",
    textAlign: "left",
    alignSelf: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default Options;
