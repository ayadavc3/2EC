import { View, Text } from "tamagui";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatScreen from "../../components/ChatScreen";

export default function ChatingScreen() {
  const { bottom } = useSafeAreaInsets();
  const { groupId, groupName } = useLocalSearchParams<{
    groupId?: string;
    groupName?: string;
  }>();

  console.log(groupId, groupName);
  return (
    <View flex={1} paddingBottom={bottom + 2}>
      <ChatScreen
        groupId={groupId || ""}
        groupName={groupName || ""}
      />
    </View>
  );
}
