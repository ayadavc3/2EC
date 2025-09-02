import { useState } from "react";
import { FlatList } from "react-native";
import { Card, Circle, Paragraph, Switch, Text, XStack, YStack } from "tamagui";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "success" | "error";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Welcome!",
    message:
      "Thanks for joining our app. Get started by exploring the features.",
    time: "2 min ago",
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "System Update",
    message:
      "A new version of the app is available. Update now for the latest features.",
    time: "1 hour ago",
    read: false,
    type: "info",
  },
  {
    id: "3",
    title: "Security Alert",
    message:
      "New login detected from a different device. If this wasn't you, please secure your account.",
    time: "3 hours ago",
    read: true,
    type: "warning",
  },
  {
    id: "4",
    title: "Maintenance Notice",
    message: "Scheduled maintenance will occur tonight from 2-4 AM EST.",
    time: "1 day ago",
    read: true,
    type: "info",
  },
];

export default function NotificationScreen() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [pushEnabled, setPushEnabled] = useState<boolean>(true);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "#4CAF50";
      case "warning":
        return "#FF9800";
      case "error":
        return "#F44336";
      case "info":
        return "#2196F3";
      default:
        return "#9E9E9E";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      case "info":
        return "ℹ️";
      default:
        return "📱";
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <Card
      size="$4"
      backgroundColor={!item.read ? "$blue1" : "$background"}
      marginVertical="$1.5"
      borderLeftWidth={!item.read ? 4 : 0}
      borderLeftColor={!item.read ? "$blue9" : "transparent"}
      pressStyle={{ scale: 0.975 }}
      onPress={() => markAsRead(item.id)}
    >
      <Card.Header padding="$4">
        <XStack alignItems="flex-start" marginBottom="$2">
          <Text fontSize="$5" marginRight="$3">
            {getTypeIcon(item.type)}
          </Text>
          <YStack flex={1}>
            <Text
              fontSize="$4"
              fontWeight="600"
              marginBottom="$1"
              color={!item.read ? "$blue11" : "$color"}
            >
              {item.title}
            </Text>
            <Text fontSize="$2" color="$color11">
              {item.time}
            </Text>
          </YStack>
          {!item.read && (
            <Circle
              size="$1"
              backgroundColor="$blue9"
              marginLeft="$2"
              marginTop="$1"
            />
          )}
        </XStack>
        <Paragraph
          fontSize="$3"
          color="$color11"
          lineHeight="$5"
          marginLeft="$8"
        >
          {item.message}
        </Paragraph>
      </Card.Header>
    </Card>
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <YStack flex={1} backgroundColor="$background">
      <Card size="$4" margin="$4" marginBottom="$0">
        <Card.Header>
          <XStack alignItems="center" justifyContent="space-between">
            <Text fontSize="$4" fontWeight="500">
              Push Notifications
            </Text>
            <Switch
              size="$3"
              checked={pushEnabled}
              onCheckedChange={setPushEnabled}
              theme="blue"
            >
              <Switch.Thumb animation="bouncy" />
            </Switch>
          </XStack>
        </Card.Header>
      </Card>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  );
}
