import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat'
import { View, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { Button, XStack, useTheme } from 'tamagui'
import { ArrowLeft } from '@tamagui/lucide-icons'

interface ChatScreenProps {
  groupId: string
  groupName: string
  onBack: () => void
}

export default function ChatScreen({ groupId, groupName, onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<IMessage[]>([])
  const theme = useTheme()

  const currentUser: User = {
    _id: 1,
    name: 'You',
    avatar: 'https://placeimg.com/140/140/any',
  }

  useEffect(() => {
    // Initialize with some sample messages
    setMessages([
      {
        _id: Math.random(),
        text: `Welcome to ${groupName}! Start chatting here.`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'System',
          avatar: 'https://placeimg.com/140/140/tech',
        },
      },
    ])
  }, [groupName])

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: theme.background.val }]}>
      <XStack 
        alignItems="center" 
        p="$4" 
        borderBottomWidth={1} 
        borderBottomColor="$borderColor"
        backgroundColor="$background"
      >
        <Button
          size="$3"
          chromeless
          icon={ArrowLeft}
          onPress={onBack}
          mr="$3"
        />
      </XStack>
      
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={currentUser}
        renderAvatar={null}
        showUserAvatar={true}
        showAvatarForEveryMessage={false}
        textInputStyle={{
          backgroundColor: theme.background.val,
          color: theme.color.val,
          borderRadius: 20,
          paddingHorizontal: 12,
          paddingTop: 8,
          paddingBottom: 8,
        }}
        inputToolbarStyle={{
          backgroundColor: theme.background.val,
          borderTopColor: theme.borderColor.val,
        }}
        bubbleTextStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: theme.color.val,
          },
        }}
        rightBubbleTextStyle={{
          color: '#fff',
        }}
        leftBubbleTextStyle={{
          color: theme.color.val,
        }}
        timeTextStyle={{
          left: {
            color: theme.color9.val,
          },
          right: {
            color: 'rgba(255,255,255,0.7)',
          },
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
