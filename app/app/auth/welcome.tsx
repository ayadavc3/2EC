import React from 'react';
import { YStack, XStack, Text, Button, H1, H2, Paragraph } from 'tamagui';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth/phone-auth');
  };

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4">
      <YStack flex={1} justifyContent="center" alignItems="center">
        <YStack marginBottom="$8" alignItems="center">
          <Text fontSize={80} marginBottom="$4">📱</Text>
        </YStack>
        
        <H1 marginBottom="$3" textAlign="center" color="$color">
          Welcome to Our App
        </H1>
        <Paragraph 
          fontSize="$4" 
          color="$color11" 
          textAlign="center" 
          lineHeight="$6"
          marginBottom="$8"
          paddingHorizontal="$4"
        >
          Get started by creating your account or signing in to continue
        </Paragraph>

        <YStack gap="$4" alignItems="center">
          <FeatureItem icon="🔒" text="Secure authentication" />
          <FeatureItem icon="⚡" text="Fast and reliable" />
          <FeatureItem icon="🎯" text="Easy to use" />
        </YStack>
      </YStack>

      <YStack gap="$4">
        <Button size="$5" theme="blue" onPress={handleGetStarted}>
          Get Started
        </Button>
        
        <Paragraph 
          fontSize="$2" 
          color="$color11" 
          textAlign="center" 
          lineHeight="$4"
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Paragraph>
      </YStack>
    </YStack>
  );
}

function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <XStack alignItems="center" gap="$3">
      <Text fontSize="$6">{icon}</Text>
      <Text fontSize="$4" color="$color">{text}</Text>
    </XStack>
  );
}


