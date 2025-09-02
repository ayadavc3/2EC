import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, H2, Input, Paragraph, YStack } from "tamagui";

export default function PhoneAuthScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handleSendOTP = () => {
    if (phoneNumber.length >= 10) {
      // Navigate to verification screen
      router.push("/auth/verification");
    }
  };

  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
    >
      <YStack marginBottom="$8" alignItems="center">
        <H2 marginBottom="$2" textAlign="center" color="$color">
          Enter your phone number
        </H2>
        <Paragraph
          textAlign="center"
          color="$color11"
          lineHeight="$6"
          paddingHorizontal="$4"
        >
          We'll send you a verification code to confirm your number
        </Paragraph>
      </YStack>

      <YStack gap="$4">
        <Input
          placeholder="Phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          maxLength={10}
          size="$4"
          borderColor="$borderColor"
        />

        <Button
          size="$4"
          theme={phoneNumber.length >= 10 ? "blue" : "gray"}
          onPress={handleSendOTP}
          disabled={phoneNumber.length < 10}
          opacity={phoneNumber.length >= 10 ? 1 : 0.6}
        >
          Send OTP
        </Button>
      </YStack>
    </YStack>
  );
}
