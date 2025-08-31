import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { YStack, XStack, Text, Button, H3, Spinner } from 'tamagui';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function WebViewScreen() {
  const router = useRouter();
  const { url, title } = useLocalSearchParams<{ url?: string; title?: string }>();
  
  const [loading, setLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState(url || 'https://example.com');
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const webViewRef = React.useRef<WebView>(null);

  const handleClose = () => {
    router.back();
  };

  const handleRefresh = () => {
    webViewRef.current?.reload();
  };

  const handleGoBack = () => {
    if (canGoBack) {
      webViewRef.current?.goBack();
    }
  };

  const handleGoForward = () => {
    if (canGoForward) {
      webViewRef.current?.goForward();
    }
  };

  const handleError = () => {
    Alert.alert(
      'Error',
      'Failed to load the webpage. Please check your internet connection and try again.',
      [
        { text: 'Retry', onPress: handleRefresh },
        { text: 'Close', onPress: handleClose },
      ]
    );
  };

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header */}
      <XStack 
        backgroundColor="$background" 
        paddingTop="$12" 
        paddingHorizontal="$4" 
        paddingBottom="$3" 
        alignItems="center" 
        borderBottomWidth={1} 
        borderBottomColor="$borderColor"
      >
        <Button 
          size="$3" 
          circular 
          backgroundColor="$gray5" 
          onPress={handleClose}
          chromeless
        >
          <Text fontSize="$4" fontWeight="bold" color="$color11">✕</Text>
        </Button>
        
        <YStack flex={1} marginHorizontal="$3">
          <Text fontSize="$4" fontWeight="600" color="$color" numberOfLines={1}>
            {title || 'WebView'}
          </Text>
          <Text fontSize="$2" color="$color11" numberOfLines={1}>
            {currentUrl}
          </Text>
        </YStack>

        <Button 
          size="$3" 
          circular 
          backgroundColor="$gray5" 
          onPress={handleRefresh}
          chromeless
        >
          <Text fontSize="$5" color="$color11">↻</Text>
        </Button>
      </XStack>

      {/* WebView */}
      <YStack flex={1} position="relative">
        <WebView
          ref={webViewRef}
          source={{ uri: currentUrl }}
          style={{ flex: 1 }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={handleError}
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack);
            setCanGoForward(navState.canGoForward);
            setCurrentUrl(navState.url);
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
        />
        
        {loading && (
          <YStack 
            position="absolute" 
            top={0} 
            left={0} 
            right={0} 
            bottom={0} 
            backgroundColor="rgba(255, 255, 255, 0.9)" 
            alignItems="center" 
            justifyContent="center"
          >
            <Spinner size="large" color="$blue9" />
            <Text marginTop="$3" fontSize="$4" color="$color11">Loading...</Text>
          </YStack>
        )}
      </YStack>

      {/* Navigation Bar */}
      <XStack 
        backgroundColor="$background" 
        paddingHorizontal="$4" 
        paddingVertical="$3" 
        borderTopWidth={1} 
        borderTopColor="$borderColor" 
        justifyContent="space-around"
      >
        <Button
          size="$4"
          circular
          backgroundColor={canGoBack ? "$gray5" : "$gray2"}
          onPress={handleGoBack}
          disabled={!canGoBack}
          chromeless
        >
          <Text 
            fontSize="$5" 
            color={canGoBack ? "$blue10" : "$color9"} 
            fontWeight="bold"
          >
            ←
          </Text>
        </Button>

        <Button
          size="$4"
          circular
          backgroundColor={canGoForward ? "$gray5" : "$gray2"}
          onPress={handleGoForward}
          disabled={!canGoForward}
          chromeless
        >
          <Text 
            fontSize="$5" 
            color={canGoForward ? "$blue10" : "$color9"} 
            fontWeight="bold"
          >
            →
          </Text>
        </Button>

        <Button 
          size="$4" 
          circular 
          backgroundColor="$gray5" 
          onPress={handleRefresh}
          chromeless
        >
          <Text fontSize="$5" color="$blue10" fontWeight="bold">↻</Text>
        </Button>
      </XStack>
    </YStack>
  );
}


