import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Box, ScrollView, FlatList, View, Center } from "native-base";
import { to_Do, categorys } from "@/constants/consts";
import HeaderComp from "@/components/home/HeaderComp";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { blueColor } from "@/constants/Colors";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Box safeAreaTop bg={blueColor} height={"100%"}>
      <HeaderComp title={"All Categorys"} />
      <ScrollView height={"100%"}>
        {categorys.map((category, index) => (
          <Box>
            <Text style={styles.title}>{category}</Text>
            <FlatList
              data={to_Do.filter((item) => item.category === category)}
              key={Math.floor(Math.random() * 100)}
              renderItem={({ item }) => {
                return (
                  <Box style={styles.whiteBox}>
                    <Text>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                  </Box>
                );
              }}
              horizontal={true}
              ListHeaderComponent={() => <View style={{ width: 10 }} />}
              ListFooterComponent={() => (
                <Center alignSelf={"center"} top={5} marginX={10}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("AddNewItem", { category: category })
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
              showsHorizontalScrollIndicator={false}
            ></FlatList>
          </Box>
        ))}
      </ScrollView>
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
});
