import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { 
  YStack, 
  XStack, 
  Text, 
  Avatar, 
  ListItem, 
  YGroup, 
  Separator,
  Button,
  Card,
  Switch
} from 'tamagui';
import { 
  User, 
  CreditCard, 
  FileText, 
  Shield, 
  Bell, 
  Scan, 
  Key, 
  Moon, 
  Smartphone, 
  Globe, 
  AlertCircle,
  ChevronRight 
} from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

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

  return (
    <ScrollView style={{ flex: 1, paddingTop: 60 }} contentContainerStyle={{ padding: 12 }} showsVerticalScrollIndicator={false}>
      {/* User Profile Section */}
      <Card marginBottom={24} padding={16}>
        <XStack alignItems="center" gap={16}>
          <YStack flex={1} gap={4}>
            <Text fontSize={18} fontWeight="800" color="$color">Lukas Hodzic</Text>
            <Text fontSize={14} color="$color9">+1 234 567 890</Text>
          </YStack>
          <Avatar circular size={60} backgroundColor="$blue9">
            <Avatar.Image
              accessibilityLabel="Lukas Hodzic"
              src="https://api.dicebear.com/9.x/initials/png?seed=Lukas Hodzic"
            />
            <Avatar.Fallback>
              <Text fontSize={16}>LH</Text>
            </Avatar.Fallback>
          </Avatar>
        </XStack>
      </Card>

      {/* Account Section */}
      <YStack marginBottom={16}>
        <Text fontSize={12} fontWeight="600" color="$color11" marginBottom={8} marginLeft={16}>
          ACCOUNT
        </Text>
        <YGroup borderRadius={8} bordered size={48} separator={<Separator />}>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="Personal informations"
              icon={User}
              iconAfter={ChevronRight}
              onPress={() => console.log('Personal informations pressed')}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="Payment details"
              icon={CreditCard}
              iconAfter={ChevronRight}
              onPress={() => console.log('Payment details pressed')}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="Documents"
              icon={FileText}
              iconAfter={ChevronRight}
              onPress={() => console.log('Documents pressed')}
            />
          </YGroup.Item>
        </YGroup>
      </YStack>

      {/* Security Section */}
      <YStack marginBottom={16}>
        <Text fontSize={13} fontWeight="600" color="$color11" marginBottom={8} marginLeft={16}>
          SECURITY
        </Text>
        <YGroup borderRadius={8} bordered size={48} separator={<Separator />}>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="Privacy"
              icon={Shield}
              iconAfter={ChevronRight}
              onPress={() => console.log('Privacy pressed')}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="Notifications"
              icon={Bell}
              iconAfter={
                <Switch id="notifications" size="$2" defaultChecked={true}>
                  <Switch.Thumb animation="quicker" />
                </Switch>
              }
              onPress={() => console.log('Notifications pressed')}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="Face ID"
              icon={Scan}
              iconAfter={
                <Switch id="face-id" size="$2" defaultChecked={true}>
                  <Switch.Thumb animation="quicker" />
                </Switch>
              }
              onPress={() => console.log('Face ID pressed')}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="Authorisations"
              icon={Key}
              iconAfter={ChevronRight}
              onPress={() => console.log('Authorisations pressed')}
            />
          </YGroup.Item>
        </YGroup>
      </YStack>

      {/* Settings Section */}
      <YStack marginBottom={16}>
        <Text fontSize={13} fontWeight="600" color="$color11" marginBottom={8} marginLeft={16}>
          SETTINGS
        </Text>
        <YGroup borderRadius={8} bordered size={48} separator={<Separator />}>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="Theme"
              icon={Moon}
              iconAfter={<Text>Dark</Text>}
              onPress={() => console.log('Theme pressed')}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="App Icon"
              icon={Smartphone}
              iconAfter={ChevronRight}
              onPress={() => console.log('App Icon pressed')}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="Language"
              icon={Globe}
              iconAfter={ChevronRight}
              onPress={() => console.log('Language pressed')}
            />
          </YGroup.Item>
        </YGroup>
      </YStack>

      {/* Support Section */}
      <YStack marginBottom={24}>
        <Text fontSize={13} fontWeight="600" color="$color11" marginBottom={8} marginLeft={16}>
          SUPPORT
        </Text>
        <YGroup bordered borderRadius={8} size={48}>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="Report an issue"
              icon={AlertCircle}
              iconAfter={ChevronRight}
              onPress={() => console.log('Report an issue pressed')}
            />
          </YGroup.Item>
        </YGroup>
      </YStack>

      {/* Version Footer */}
      <YStack alignItems="center" paddingBottom={20}>
        <Text fontSize={12} color="$color11">Version 1.0.0</Text>
      </YStack>
    </ScrollView>
  );
}


