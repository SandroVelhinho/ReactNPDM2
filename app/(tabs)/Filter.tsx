import { Box, Center, FlatList, ScrollView, Text } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { blueColor } from "@/constants/Colors";
import HeaderComp from "@/components/home/HeaderComp";
import { categorys } from "@/constants/consts";
import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Filter() {
  const navigation = useNavigation();
  const [asyncCategorys, setAsyncCategorys] = useState([]);

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

      loadCategories();
    }, [])
  );

  return (
    <Box height={"100%"} bgColor={blueColor} safeAreaTop>
      <HeaderComp title={"Filter"} />
      <Text style={styles.title}>Select Category</Text>
      <Center marginTop={10}>
        <FlatList
          data={asyncCategorys}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ margin: 15 }}
                onPress={() =>
                  navigation.navigate("OneCategory", { category: item })
                }
              >
                <Center style={styles.button}>
                  <Text style={{ fontSize: 20 }}>{item}</Text>
                </Center>
              </TouchableOpacity>
            );
          }}
        />
      </Center>
    </Box>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 25,
    paddingTop: 50,
    marginLeft: 30,
    color: "white",
    height: "auto",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 10,
    padding: 15,
  },
});
