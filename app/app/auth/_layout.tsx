import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="phone-auth" />
      <Stack.Screen name="verification" />
    </Stack>
  );
}
