import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { YStack, XStack, Text, Input, Button, Card, Avatar, H2, Paragraph, Circle } from 'tamagui';

interface Person {
  id: string;
  name: string;
  email: string;
  status: 'online' | 'offline' | 'away';
}

const mockPeople: Person[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'online' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'away' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'offline' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', status: 'online' },
];

export default function PeopleScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [people] = useState<Person[]>(mockPeople);

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#4CAF50';
      case 'away': return '#FF9800';
      case 'offline': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };

  const renderPerson = ({ item }: { item: Person }) => (
    <Card size="$4" backgroundColor="$background" marginVertical="$1.5" pressStyle={{ scale: 0.975 }}>
      <Card.Header padding="$4">
        <XStack alignItems="center" justifyContent="space-between">
          <XStack alignItems="center" flex={1} gap="$3">
            <Avatar circular size="$5" backgroundColor="$blue9">
              <Avatar.Fallback>
                <Text color="white" fontWeight="bold" fontSize="$4">
                  {item.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </Avatar.Fallback>
            </Avatar>
            <YStack flex={1}>
              <Text fontWeight="600" fontSize="$4" color="$color">{item.name}</Text>
              <Text fontSize="$3" color="$color11">{item.email}</Text>
            </YStack>
          </XStack>
          <Circle size="$1" backgroundColor={getStatusColor(item.status)} />
        </XStack>
      </Card.Header>
    </Card>
  );

  return (
    <YStack flex={1} backgroundColor="$background">
      <FlatList
        data={filteredPeople}
        keyExtractor={(item) => item.id}
        renderItem={renderPerson}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  );
}


