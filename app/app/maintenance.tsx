import React from 'react';
import { YStack, Text, Button, H1, Paragraph, Card } from 'tamagui';
import { useRouter } from 'expo-router';

export default function MaintenanceScreen() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4" justifyContent="center">
      <YStack alignItems="center" marginBottom="$8">
        <Text fontSize={80} marginBottom="$4">🔧</Text>
        <H1 marginBottom="$3" textAlign="center" color="$color">
          Under Maintenance
        </H1>
        <Paragraph 
          fontSize="$4" 
          color="$color11" 
          textAlign="center" 
          lineHeight="$6"
          marginBottom="$6"
          paddingHorizontal="$4"
        >
          We're currently performing scheduled maintenance to improve your experience.
          Please check back in a few minutes.
        </Paragraph>
        
        <Card size="$4" width="100%" marginBottom="$6">
          <Card.Header>
            <YStack gap="$3">
              <YStack>
                <Text fontSize="$3" fontWeight="600" color="$color">Expected Duration:</Text>
                <Text fontSize="$3" color="$color11">2-4 hours</Text>
              </YStack>
              
              <YStack>
                <Text fontSize="$3" fontWeight="600" color="$color">Started:</Text>
                <Text fontSize="$3" color="$color11">Today at 2:00 AM EST</Text>
              </YStack>
              
              <YStack>
                <Text fontSize="$3" fontWeight="600" color="$color">Estimated Completion:</Text>
                <Text fontSize="$3" color="$color11">Today at 6:00 AM EST</Text>
              </YStack>
            </YStack>
          </Card.Header>
        </Card>

        <Paragraph 
          fontSize="$3" 
          color="$color11" 
          textAlign="center" 
          fontStyle="italic"
        >
          We apologize for any inconvenience this may cause. Thank you for your patience!
        </Paragraph>
      </YStack>

      <Button size="$4" theme="blue" onPress={handleGoBack}>
        Go Back
      </Button>
    </YStack>
  );
}


