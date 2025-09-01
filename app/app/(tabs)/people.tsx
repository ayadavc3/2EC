import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { YStack, XStack, Text, Input, Button, Card, Avatar, H2, Paragraph, Circle, Separator, Spacer } from 'tamagui';

interface Person {
  id: string;
  name: string;
  phone_number: string;
  status: 'online' | 'offline' | 'away';
}

const mockPeople: Person[] = [
  { id: '1', name: 'John Doe', phone_number: '+1 234 567 890', status: 'online' },
  { id: '2', name: 'Jane Smith', phone_number: '+1 234 567 890', status: 'away' },
  { id: '3', name: 'Bob Johnson', phone_number: '+1 234 567 890', status: 'offline' },
  { id: '4', name: 'Alice Brown', phone_number: '+1 234 567 890', status: 'online' },
];

export default function PeopleScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [people] = useState<Person[]>(mockPeople);

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.phone_number.toLowerCase().includes(searchQuery.toLowerCase())
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
    <Card size="$4" backgroundColor="$background" pressStyle={{ scale: 0.975 }}>
      <Card.Header padding="$4">
        <XStack alignItems="center" justifyContent="space-between">
          <XStack alignItems="center" flex={1} gap="$3">
            <Avatar circular size="$5" backgroundColor="$blue9">
              <Avatar.Image
                accessibilityLabel={item.name}
                src={`https://api.dicebear.com/9.x/initials/png?seed=${item.name}`}
              />
              <Avatar.Fallback>
                <Text fontSize={16}>
                  {item.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </Avatar.Fallback>
            </Avatar>
            <YStack flex={1}>
              <Text fontWeight="600" fontSize="$4" color="$color">{item.name}</Text>
              <Text fontSize="$3" color="$color11">{item.phone_number}</Text>
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
        data={people}
        keyExtractor={(item) => item.id}
        renderItem={renderPerson}
        ItemSeparatorComponent={Spacer}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  );
}


