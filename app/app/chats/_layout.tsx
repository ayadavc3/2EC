import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        presentation: 'modal',
        headerTitleStyle: {
          fontSize: 16,
        },
      }}
    >
      <Stack.Screen name="chat" />
    </Stack>
  );
}
