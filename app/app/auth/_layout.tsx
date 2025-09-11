import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "600",
        },
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen
        name="phone-auth"
        options={{ title: "", headerShown: true }}
      />
      <Stack.Screen
        name="verification"
        options={{ title: "", headerShown: true }}
      />
    </Stack>
  );
}
