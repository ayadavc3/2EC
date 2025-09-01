import React, { useState } from "react";
import { FlatList } from "react-native";
import { MessagesSquare, Users, Clock } from "@tamagui/lucide-icons";
import {
  Button,
  Card,
  H2,
  H4,
  Paragraph,
  XStack,
  YStack,
  Avatar,
  Text,
  Separator,
} from "tamagui";
import ChatScreen from "../../components/ChatScreen";

interface ChatGroup {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: string;
  isOnline: boolean;
}

const mockGroups: ChatGroup[] = [
  {
    id: "1",
    name: "React Native Developers",
    lastMessage: "Hey everyone! Just released a new update...",
    timestamp: "2m ago",
    unreadCount: 3,
    avatar: "🚀",
    isOnline: true,
  },
  {
    id: "2",
    name: "Design Team",
    lastMessage: "The new mockups look amazing!",
    timestamp: "1h ago",
    unreadCount: 0,
    avatar: "🎨",
    isOnline: true,
  },
  {
    id: "3",
    name: "Project Alpha",
    lastMessage: "Meeting scheduled for tomorrow at 3 PM",
    timestamp: "3h ago",
    unreadCount: 1,
    avatar: "📋",
    isOnline: false,
  },
  {
    id: "4",
    name: "Weekend Warriors",
    lastMessage: "Anyone up for a coding session this weekend?",
    timestamp: "1d ago",
    unreadCount: 5,
    avatar: "⚡",
    isOnline: true,
  },
  {
    id: "5",
    name: "Tech Talk",
    lastMessage: "What do you think about the latest AI trends?",
    timestamp: "2d ago",
    unreadCount: 0,
    avatar: "🤖",
    isOnline: false,
  },
];

export default function TabOneScreen() {
  const [selectedGroup, setSelectedGroup] = useState<ChatGroup | null>(null);

  const renderGroupItem = ({ item }: { item: ChatGroup }) => (
    <XStack onPress={() => setSelectedGroup(item)} padding={12} alignItems="center" gap="$3" flex={1}>
      <YStack alignItems="center" position="relative">
        <Avatar circular size={40} backgroundColor="$blue5">
          <Avatar.Fallback>
            <Text fontSize={16}>{item.avatar}</Text>
          </Avatar.Fallback>
        </Avatar>
        {item.isOnline && (
          <YStack
            position="absolute"
            bottom={0}
            right={0}
            width={12}
            height={12}
            backgroundColor="$green9"
            borderRadius={6}
            borderWidth={2}
            borderColor="$background"
          />
        )}
      </YStack>

      <YStack flex={1}>
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize={14} fontWeight="600">
            {item.name}
          </Text>
          <XStack alignItems="center" gap={4}>
            <Clock size={12} color="$color10" />
            <Text fontSize={12} color="$color10">
              {item.timestamp}
            </Text>
          </XStack>
        </XStack>

        <XStack alignItems="center" justifyContent="space-between">
          <Paragraph
            flex={1}
            fontSize={12}
            color="$color11"
            numberOfLines={1}
            marginRight="$2"
          >
            {item.lastMessage}
          </Paragraph>
          {item.unreadCount > 0 && (
            <YStack
              backgroundColor="$red9"
              borderRadius={10}
              minWidth={20}
              height={20}
              alignItems="center"
              justifyContent="center"
              paddingHorizontal="$2"
            >
              <Text fontSize={12} color="white" fontWeight="600">
                {item.unreadCount}
              </Text>
            </YStack>
          )}
        </XStack>
      </YStack>
    </XStack>
  );

  if (selectedGroup) {
    return (
      <ChatScreen
        groupId={selectedGroup.id}
        groupName={selectedGroup.name}
        onBack={() => setSelectedGroup(null)}
      />
    );
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      <FlatList
        data={mockGroups}
        renderItem={renderGroupItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{ paddingVertical: 8 }}
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  );
}
