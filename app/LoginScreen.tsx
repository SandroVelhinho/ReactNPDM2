import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Box, HStack } from "native-base";
import { blueColor } from "@/constants/Colors";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SignedIn, useSignIn, useAuth } from "@clerk/clerk-expo";

const LoginScreen = () => {
  const [disabledButton, setDisabledButton] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [buttonColor, setButtonColor] = useState("#D4D4D4");
  const router = useRouter();
  const { signIn, setActive } = useSignIn();

  const onSubmit = async () => {
    try {
      if (!signIn) {
        throw new Error("Erro ao inicializar o Clerk");
      }

      const signInAttempt = await signIn.create({
        identifier: email,
        password: pass,
      });
      console.log(signInAttempt);

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        Alert.alert("Sucesso", "Login efetuado com sucesso!");
        router.replace("/(tabs)/All");
      } else {
        throw new Error("Login falhou, tente novamente.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Email ou password incorretos.");
    }
  };

  useEffect(() => {
    if (email && pass) {
      setButtonColor("#c5decd");
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
      setButtonColor("#D4D4D4");
    }
  }, [email, pass]);
  return (
    <Box bg={blueColor} flex={1} safeAreaTop>
      <Text style={styles.title}>Login</Text>
      <KeyboardAvoidingView>
        <HStack
          justifyContent={"center"}
          alignItems={"center"}
          marginBottom={7}
        >
          <View style={styles.placeholderIcon}>
            <Ionicons
              name="person-outline"
              size={30}
              color={"black"}
              style={{ alignSelf: "center" }}
            />
          </View>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </HStack>
        <HStack justifyContent={"center"} alignItems={"center"}>
          <View style={styles.placeholderIcon}>
            <SimpleLineIcons
              name="lock"
              size={30}
              color={"black"}
              style={{ alignSelf: "center" }}
            />
          </View>
          <TextInput
            value={pass}
            secureTextEntry
            style={styles.inputText}
            placeholder="Palavra-passe"
            onChangeText={(text) => setPass(text)}
          />
        </HStack>
      </KeyboardAvoidingView>
      <TouchableOpacity
        disabled={disabledButton}
        style={{ width: 100, alignSelf: "center" }}
        onPress={onSubmit}
      >
        <View style={{ backgroundColor: buttonColor, ...styles.button }}>
          <Text
            style={{ fontSize: 20, fontWeight: "500", alignSelf: "center" }}
          >
            Entrar
          </Text>
        </View>
      </TouchableOpacity>
      <Pressable
        onPress={() => router.push("/CreateAccount")}
        style={{
          width: 200,
          height: 120,
          alignSelf: "center",
          marginVertical: 50,
        }}
      >
        <Text style={styles.createAccount}>Criar conta</Text>
      </Pressable>
    </Box>
  );
};
const styles = StyleSheet.create({
  createAccount: {
    textDecorationLine: "underline",
    color: "#fff",
    alignSelf: "center",
    fontSize: 20,
    marginVertical: "20%",
  },
  title: {
    alignSelf: "center",
    fontSize: 60,
    fontWeight: "600",
    color: "#fff",
    marginVertical: "25%",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "white",
  },
  mohat: {
    fontSize: 50,
    fontWeight: "800",
    alignSelf: "center",
    color: "#fff",
    margin: 40,
  },
  bemVindo: {
    fontSize: 30,
    fontWeight: "400",
    color: "#fff",
    alignSelf: "center",
    margin: 15,
  },
  inputText: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    elevation: 4,
    shadowOpacity: 1,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: "#fff",
    height: 55,
    width: 317,
    alignSelf: "center",
  },
  placeholderIcon: {
    height: 55,
    width: 55,
    borderBottomLeftRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignSelf: "center",
    borderRadius: 50,
    padding: 10,
    height: "auto",
    marginTop: 50,
  },
});

export default LoginScreen;
