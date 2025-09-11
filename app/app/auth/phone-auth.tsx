import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, H4, Input, Paragraph, Spacer, YStack } from "tamagui";

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
      borderTopWidth={0.5}
      borderTopColor="lightgray"
    >
      <YStack>
        <H4 color="$color">Enter your phone number</H4>
        <Paragraph color="$color11">
          We&apos;ll send you a verification code to confirm your number
        </Paragraph>
      </YStack>
      <Spacer />
      <Spacer />
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
          Send Verification Code
        </Button>
      </YStack>
    </YStack>
  );
}
