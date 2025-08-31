import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { YStack, XStack, Text, Card, Avatar, H2, Paragraph, Separator } from 'tamagui';
import { useRouter } from 'expo-router';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  action: () => void;
  color?: string;
}

export default function MoreScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => router.replace('/auth/welcome') },
      ]
    );
  };

  const menuItems: MenuItem[] = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: '👤',
      action: () => console.log('Profile pressed'),
    },
    {
      id: 'notifications',
      title: 'Notification Settings',
      icon: '🔔',
      action: () => console.log('Notifications pressed'),
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: '🔒',
      action: () => console.log('Privacy pressed'),
    },
    {
      id: 'theme',
      title: 'Theme & Appearance',
      icon: '🎨',
      action: () => console.log('Theme pressed'),
    },
    {
      id: 'language',
      title: 'Language',
      icon: '🌍',
      action: () => console.log('Language pressed'),
    },
    {
      id: 'storage',
      title: 'Storage & Data',
      icon: '💾',
      action: () => console.log('Storage pressed'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: '❓',
      action: () => console.log('Help pressed'),
    },
    {
      id: 'about',
      title: 'About',
      icon: 'ℹ️',
      action: () => console.log('About pressed'),
    },
    {
      id: 'feedback',
      title: 'Send Feedback',
      icon: '📝',
      action: () => console.log('Feedback pressed'),
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: '🚪',
      action: handleLogout,
      color: '#FF3B30',
    },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <Card.Header 
      key={item.id}
      pressStyle={{ scale: 0.98, opacity: 0.8 }}
      onPress={item.action}
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
    >
      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center" gap="$3" flex={1}>
          <Text fontSize="$5" width="$3" textAlign="center">{item.icon}</Text>
          <Text fontSize="$4" color={item.color || "$color"}>
            {item.title}
          </Text>
        </XStack>
        <Text fontSize="$5" color="$color9" fontWeight="bold">›</Text>
      </XStack>
    </Card.Header>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '$background' }}>
      <Card size="$4" margin="$4">
        <Card.Header>
          <XStack alignItems="center" gap="$4">
            <Avatar circular size="$6" backgroundColor="$blue9">
              <Avatar.Fallback>
                <Text color="white" fontSize="$6" fontWeight="bold">JD</Text>
              </Avatar.Fallback>
            </Avatar>
            <YStack flex={1}>
              <Text fontSize="$5" fontWeight="600" color="$color">John Doe</Text>
              <Text fontSize="$3" color="$color11">john.doe@example.com</Text>
            </YStack>
            <Text color="$blue10" fontSize="$4" fontWeight="500">Edit</Text>
          </XStack>
        </Card.Header>
      </Card>

      <Card margin="$4">
        <Card.Header backgroundColor="$gray2">
          <Text fontSize="$4" fontWeight="600" color="$color11">Account</Text>
        </Card.Header>
        {menuItems.slice(0, 3).map(renderMenuItem)}
      </Card>

      <Card margin="$4">
        <Card.Header backgroundColor="$gray2">
          <Text fontSize="$4" fontWeight="600" color="$color11">Preferences</Text>
        </Card.Header>
        {menuItems.slice(3, 6).map(renderMenuItem)}
      </Card>

      <Card margin="$4">
        <Card.Header backgroundColor="$gray2">
          <Text fontSize="$4" fontWeight="600" color="$color11">Support</Text>
        </Card.Header>
        {menuItems.slice(6, 9).map(renderMenuItem)}
      </Card>

      <Card margin="$4">
        {menuItems.slice(9).map(renderMenuItem)}
      </Card>

      <YStack padding="$4" alignItems="center">
        <Text fontSize="$2" color="$color11">Version 1.0.0</Text>
      </YStack>
    </ScrollView>
  );
}


