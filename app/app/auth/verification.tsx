import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { TextInput } from "react-native";
import { Button, H2, Input, Paragraph, Text, XStack, YStack } from "tamagui";

export default function VerificationScreen() {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();

  const handleOTPChange = (value: string, index: number) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      // Navigate to main app
      router.replace("/(tabs)");
    }
  };

  const handleResendOTP = () => {
    // Logic to resend OTP
    console.log("Resending OTP...");
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
          Enter verification code
        </H2>
        <Paragraph
          textAlign="center"
          color="$color11"
          lineHeight="$6"
          paddingHorizontal="$4"
        >
          We've sent a 6-digit code to your phone number
        </Paragraph>
      </YStack>

      <XStack justifyContent="space-between" marginBottom="$6" gap="$2">
        {otp.map((digit, index) => (
          <Input
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            flex={1}
            value={digit}
            onChangeText={(value) => handleOTPChange(value, index)}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            size="$4"
            fontSize="$6"
            fontWeight="bold"
            borderColor="$borderColor"
          />
        ))}
      </XStack>

      <YStack gap="$4">
        <Button
          size="$4"
          theme={otp.join("").length === 6 ? "blue" : "gray"}
          onPress={handleVerify}
          disabled={otp.join("").length !== 6}
          opacity={otp.join("").length === 6 ? 1 : 0.6}
        >
          Verify
        </Button>

        <Button variant="outlined" onPress={handleResendOTP} chromeless>
          <Text color="$blue10">Didn't receive code? Resend</Text>
        </Button>
      </YStack>
    </YStack>
  );
}
