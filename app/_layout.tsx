import "react-native-reanimated";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { useAuth, SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginScreen from "./LoginScreen";
import { Stack, useRouter, useSegments } from "expo-router";
import { NativeBaseProvider } from "native-base";
import { useEffect } from "react";

const InitialLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  const { isLoaded, isSignedIn } = useAuth();
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (isSignedIn) {
      router.replace("/(tabs)/All");
    } else {
      router.replace("/LoginScreen");
    }
  }, [SignedIn, isLoaded]);

  return (
    <NativeBaseProvider>
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="OneCategory" options={{ headerShown: false }} />
          <Stack.Screen name="AddNewItem" options={{ headerShown: false }} />
          <Stack.Screen name="CreateAccount" options={{ headerShown: false }} />
          <Stack.Screen name="AddCategorys" options={{ headerShown: false }} />
        </Stack>
      </SignedIn>
      <SignedOut>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
          <Stack.Screen name="CreateAccount" options={{ headerShown: false }} />
        </Stack>
      </SignedOut>
    </NativeBaseProvider>
  );
};

export default function RootLayout() {
  const publickey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publickey) {
    throw new Error("Missing CLERK_PUBLISHABLE_KEY");
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publickey}>
      <InitialLayout />
    </ClerkProvider>
  );
}
