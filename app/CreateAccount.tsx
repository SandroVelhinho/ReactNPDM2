import React, { useState, useEffect } from "react";
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
import { Box, HStack, VStack } from "native-base";
import { blueColor } from "@/constants/Colors";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
  const [buttonColor, setButtonColor] = useState("#D4D4D4");
  const router = useRouter();

  const { signUp, isLoaded, setActive } = useSignUp();

  const onSubmit = async () => {
    try {
      if (!isLoaded) return;

      if (pass !== confirmPass) {
        Alert.alert("Erro", "As senhas não coincidem.");
        return;
      }

      const createdUser = await signUp!.create({
        emailAddress: email,
        password: pass,
      });
      console.log(createdUser.createdSessionId);

      if (createdUser) {
        await setActive({ session: createdUser.createdSessionId });
        Alert.alert("Sucesso", "Conta criada com sucesso!");
        router.push("/(tabs)/All");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", err.message);
    }
  };

  useEffect(() => {
    if (email && pass && pass === confirmPass) {
      setButtonColor("#c5decd");
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
      setButtonColor("#D4D4D4");
    }
  }, [email, pass, confirmPass]);

  return (
    <Box bg={blueColor} flex={1} safeAreaTop>
      <Text style={styles.title}>Criar Conta</Text>
      <KeyboardAvoidingView>
        <VStack space={5}>
          <HStack justifyContent={"center"} alignItems={"center"}>
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
              style={styles.inputText}
              placeholder="Palavra-passe"
              onChangeText={(text) => setPass(text)}
              secureTextEntry
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
              value={confirmPass}
              style={styles.inputText}
              placeholder="Confirmar Palavra-passe"
              onChangeText={(text) => setConfirmPass(text)}
              secureTextEntry
            />
          </HStack>
        </VStack>
      </KeyboardAvoidingView>
      <TouchableOpacity
        disabled={disabledButton}
        style={{ width: 300, alignSelf: "center" }}
        onPress={onSubmit}
      >
        <View style={{ backgroundColor: buttonColor, ...styles.button }}>
          <Text
            style={{ fontSize: 20, fontWeight: "500", alignSelf: "center" }}
          >
            Criar Conta
          </Text>
        </View>
      </TouchableOpacity>
      <Pressable
        onPress={() => router.push("/LoginScreen")}
        style={{
          width: 200,
          height: 120,
          alignSelf: "center",
          marginVertical: 50,
        }}
      >
        <Text style={styles.createAccount}>Já tenho uma conta</Text>
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

export default CreateAccount;
