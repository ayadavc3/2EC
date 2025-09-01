import { Link, Tabs } from 'expo-router'
import { Button, useTheme } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MessagesSquare, Home, BellDot, Users, Menu, Bell } from '@tamagui/lucide-icons'

export default function TabLayout() {
  const theme = useTheme()
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.red10.val,
         tabBarLabelStyle: {
          fontSize: 10,
          paddingTop: 4,
        },
        tabBarStyle: {
          height: bottom + 64, 
          paddingTop: 4,
          backgroundColor: theme.background.val,
          borderTopColor: theme.borderColor.val,
        },
        headerStyle: {
          backgroundColor: theme.background.val,
          borderBottomColor: theme.borderColor.val,
        },
        headerTintColor: theme.color.val,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'c3controls',
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color }) => <MessagesSquare color={color} />,
          headerRight: () => (
            <Bell marginRight={12} color={theme.color.val} />
          ),
        }}
      />
      <Tabs.Screen
        name="people"
        options={{
          title: 'People',
          tabBarIcon: ({ color }) => <Users color={color} />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notification',
          tabBarIcon: ({ color }) => <BellDot color={color} />,
        }}
        
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          headerShown: false,
          tabBarIcon: ({ color }) => <Menu color={color} />,
        }}
      />
    </Tabs>
  )
}
