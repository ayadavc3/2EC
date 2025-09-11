import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, H1, Paragraph, Spacer, Text, YStack } from "tamagui";

import { PolicyStamp } from "../../components/PolicyStamp";

export default function WelcomeScreen() {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/auth/phone-auth");
  };

  const handleSignIn = () => {
    // Navigate to sign in screen
    router.push("/auth/phone-auth");
  };

  return (
    <YStack
      flex={1}
      backgroundColor="#FFFFFF"
      paddingHorizontal={12}
      paddingTop={60}
      paddingBottom={bottom + 16}
    >
      {/* Phone Mockup Section */}
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        marginBottom={40}
      >
        <YStack
          width="100%"
          height={520}
          backgroundColor="#F8F9FA"
          borderRadius={28}
          justifyContent="center"
          alignItems="center"
          borderWidth={1}
          borderColor="#E0E0E0"
        ></YStack>
      </YStack>

      <Spacer size={48} />

      {/* Text Content */}
      <YStack alignItems="center" marginHorizontal={12} marginVertical={50}>
        <H1 fontSize={26} fontWeight="700">
          Welcome to 2EC!
        </H1>
        <Spacer size={14} />
        <Paragraph color="#666666" textAlign="center">
          Welcome to 2EC! Your ultimate communication for emergencies and group
          communication for your organization needs.
        </Paragraph>
      </YStack>

      {/* Bottom Section */}
      <YStack gap={16} marginHorizontal={12}>
        <Button
          size={48}
          backgroundColor="$blue10"
          onPress={handleGetStarted}
          pressStyle={{ opacity: 0.8 }}
          borderWidth={0}
        >
          <Text fontSize={16} fontWeight="600" color="#FFFFFF">
            Get Started
          </Text>
        </Button>

        <PolicyStamp />
      </YStack>
    </YStack>
  );
}
