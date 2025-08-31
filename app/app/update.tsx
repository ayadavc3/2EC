import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { YStack, XStack, Text, Button, H1, Paragraph, Card, Progress } from 'tamagui';


export default function UpdateScreen() {
  const router = useRouter();
  const [updateProgress, setUpdateProgress] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(false);

  const handleStartUpdate = () => {
    setIsUpdating(true);
    setUpdateProgress(0);

    // Simulate update progress
    const interval = setInterval(() => {
      setUpdateProgress(prev => {
        const newProgress = prev + 0.1;
        if (newProgress >= 1) {
          clearInterval(interval);
          setIsUpdating(false);
          setUpdateComplete(true);
          return 1;
        }
        return newProgress;
      });
    }, 200);
  };

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  const handleLater = () => {
    router.back();
  };

  if (updateComplete) {
    return (
      <YStack flex={1} backgroundColor="$background" padding="$4" justifyContent="center">
        <YStack alignItems="center" marginBottom="$8">
          <Text fontSize={80} marginBottom="$4">✅</Text>
          <H1 marginBottom="$3" textAlign="center" color="$color">
            Update Complete!
          </H1>
          <Paragraph 
            fontSize="$4" 
            color="$color11" 
            textAlign="center" 
            lineHeight="$6"
            marginBottom="$6"
            paddingHorizontal="$4"
          >
            Your app has been successfully updated to the latest version.
            Enjoy the new features and improvements!
          </Paragraph>

          <Card size="$4" width="100%" marginBottom="$4">
            <Card.Header>
              <Text fontSize="$4" fontWeight="600" marginBottom="$3" color="$color">
                What's New:
              </Text>
              <YStack gap="$1.5">
                <Text fontSize="$3" color="$color11" lineHeight="$5">
                  • Improved performance and stability
                </Text>
                <Text fontSize="$3" color="$color11" lineHeight="$5">
                  • New user interface enhancements
                </Text>
                <Text fontSize="$3" color="$color11" lineHeight="$5">
                  • Bug fixes and security updates
                </Text>
                <Text fontSize="$3" color="$color11" lineHeight="$5">
                  • Enhanced notification system
                </Text>
              </YStack>
            </Card.Header>
          </Card>
        </YStack>

        <Button size="$4" theme="blue" onPress={handleContinue}>
          Continue
        </Button>
      </YStack>
    );
  }

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4" justifyContent="center">
      <YStack alignItems="center" marginBottom="$8">
        <Text fontSize={80} marginBottom="$4">🔄</Text>
        <H1 marginBottom="$3" textAlign="center" color="$color">
          App Update Available
        </H1>
        <Paragraph 
          fontSize="$4" 
          color="$color11" 
          textAlign="center" 
          lineHeight="$6"
          marginBottom="$6"
          paddingHorizontal="$4"
        >
          A new version of the app is available with important security updates and new features.
        </Paragraph>

        <Card size="$4" width="100%" marginBottom="$6">
          <Card.Header>
            <YStack gap="$2">
              <XStack justifyContent="space-between">
                <Text fontSize="$3" color="$color11">Current Version:</Text>
                <Text fontSize="$3" fontWeight="600" color="$color">1.0.0</Text>
              </XStack>
              <XStack justifyContent="space-between">
                <Text fontSize="$3" color="$color11">New Version:</Text>
                <Text fontSize="$3" fontWeight="600" color="$color">1.1.0</Text>
              </XStack>
              <XStack justifyContent="space-between">
                <Text fontSize="$3" color="$color11">Size:</Text>
                <Text fontSize="$3" fontWeight="600" color="$color">25.4 MB</Text>
              </XStack>
            </YStack>
          </Card.Header>
        </Card>

        {isUpdating && (
          <YStack width="100%" alignItems="center">
            <Text 
              fontSize="$4" 
              fontWeight="500" 
              marginBottom="$3" 
              color="$color"
            >
              Updating... {Math.round(updateProgress * 100)}%
            </Text>
            <Progress size="$2" value={updateProgress * 100} width="100%">
              <Progress.Indicator animation="bouncy" />
            </Progress>
          </YStack>
        )}
      </YStack>

      {!isUpdating && (
        <YStack gap="$3">
          <Button size="$4" theme="blue" onPress={handleStartUpdate}>
            Update Now
          </Button>
          
          <Button 
            size="$4" 
            variant="outlined" 
            onPress={handleLater}
            borderColor="$blue9"
          >
            <Text color="$blue10">Update Later</Text>
          </Button>
        </YStack>
      )}
    </YStack>
  );
}


