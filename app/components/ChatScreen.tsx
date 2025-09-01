import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'tamagui'
import { useNavigation } from '@react-navigation/native'

interface ChatScreenProps {
  groupId: string
  groupName: string
}

export default function ChatScreen({ groupId, groupName }: ChatScreenProps) {
  const [messages, setMessages] = useState<IMessage[]>([])
  const theme = useTheme()
  const navigation = useNavigation()

  const currentUser: User = {
    _id: 1,
    name: 'You',
    avatar: 'https://placeimg.com/140/140/any',
  }

  useEffect(() => {
    // Initialize with some sample messages
    navigation.setOptions({
      headerTitle: groupName,
    })
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
  }, [groupId, groupName])

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: theme.background.val }]}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={currentUser}
        renderAvatar={null}
        showUserAvatar={true}
        showAvatarForEveryMessage={false}
        textInputProps={{
          style: {
            backgroundColor: theme.background.val,
            color: theme.color.val,
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingTop: 8,
            paddingBottom: 8,
          },
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
