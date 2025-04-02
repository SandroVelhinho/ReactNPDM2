import { useClerk } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { Center, HStack } from "native-base";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
export const SignOutButton = () => {
  const router = useRouter();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      
      router.replace("/LoginScreen");
    } catch (err) {
     
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.viewStyle}>
      <Pressable onPress={handleSignOut}>
        <HStack space={6} marginLeft={5}>
          <Text style={styles.title}>Sign-out</Text>
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
});
