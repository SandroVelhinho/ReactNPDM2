import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, FlatList, ScrollView } from "native-base";
import { blueColor } from "@/constants/Colors";
import BackHeaderComp from "@/components/BackHeaderComp";
import { to_Do } from "@/constants/consts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OneCategory = ({ route }) => {
  const category = route.params.category;
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
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

    loadItems();
  }, []);
  return (
    <Box bg={blueColor} height={"100%"}>
      <BackHeaderComp title={`All ${category}`} />
      <FlatList
        data={allItems.filter((item) => item.category === category)}
        renderItem={({ item }) => {
          return (
            <Box style={styles.whiteBox}>
              <Text>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </Box>
          );
        }}
      />
    </Box>
  );
};
const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 25,
    marginTop: 50,
    marginLeft: 30,
    color: "white",
    marginBottom: 10,
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
});

export default OneCategory;
