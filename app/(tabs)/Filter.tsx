import { Box, Center, FlatList, ScrollView, Text } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { blueColor } from "@/constants/Colors";
import HeaderComp from "@/components/home/HeaderComp";
import { categorys } from "@/constants/consts";

export default function Filter() {
  return (
    <Box height={"100%"} bgColor={"grey"} safeAreaTop>
      <HeaderComp title={"Filter"} />
      <Text style={styles.title}>Select Category</Text>
      <Center marginTop={10}>
        <FlatList
          data={categorys}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <Text>{item}</Text>
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
});
