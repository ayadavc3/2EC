import React, { useEffect } from 'react';
import { YStack, Text, Spinner, H1 } from 'tamagui';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    // Simulate app initialization/loading
    const initializeApp = async () => {
      try {
        // Check authentication status
        // Check for app updates
        // Load user preferences
        // etc.
        
        // Simulate some loading time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demo purposes, we'll navigate to auth
        // In a real app, you'd check if user is authenticated
        const isAuthenticated = false; // This would come from your auth service
        
        if (isAuthenticated) {
          router.replace('/(tabs)');
        } else {
          router.replace('/auth/welcome');
        }
      } catch (error) {
        console.error('App initialization error:', error);
        // Handle initialization errors
        router.replace('/auth/welcome');
      }
    };

    initializeApp();
  }, [router]);

  return (
    <YStack flex={1} backgroundColor="$background" justifyContent="center" alignItems="center">
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text fontSize={100} marginBottom="$4">📱</Text>
        <H1 marginBottom="$8" color="$color">
          Your App
        </H1>
        <Spinner size="large" color="$blue9" marginBottom="$4" />
        <Text fontSize="$4" color="$color11">Loading...</Text>
      </YStack>
      
      <YStack paddingBottom="$12">
        <Text fontSize="$2" color="$color11" textAlign="center">
          Version 1.0.0
        </Text>
      </YStack>
    </YStack>
  );
}


