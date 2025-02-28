import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Center, HStack } from "native-base";
import { useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const OptionViewConstuctor = ({ navigate, title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.viewStyle}>
      <Pressable onPress={() => navigation.navigate(navigate)}>
        <HStack space={6} marginLeft={5}>
          <Text style={styles.title}>{title}</Text>
          <Center maxWidth={50}>
            <AntDesign name="arrowright" size={24} color="white" />
          </Center>
        </HStack>
      </Pressable>
    </View>
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
    width: "auto",
    height: 32,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "300",
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "left",
    width: "auto",
    height: 18,
  },
});

export default OptionViewConstuctor;
