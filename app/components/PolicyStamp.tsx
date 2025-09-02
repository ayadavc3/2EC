import { Linking, TouchableOpacity } from "react-native";
import { Text, XStack } from "tamagui";

const PolicyStamp = () => {
  const openTermsOfService = () => {
    Linking.openURL("https://your-domain.com/terms-of-service");
  };

  const openPrivacyPolicy = () => {
    Linking.openURL("https://your-domain.com/privacy-policy");
  };

  return (
    <XStack
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      paddingHorizontal="$4"
    >
      <Text fontSize="$2" color="$color11" textAlign="center">
        By continuing, you agree to our{" "}
      </Text>
      <TouchableOpacity onPress={openTermsOfService}>
        <Text fontSize="$2" color="$blue10">
          Terms of Service
        </Text>
      </TouchableOpacity>
      <Text fontSize="$2" color="$color11" textAlign="center">
        {" "}
        and{" "}
      </Text>
      <TouchableOpacity onPress={openPrivacyPolicy}>
        <Text fontSize="$2" color="$blue10">
          Privacy Policy
        </Text>
      </TouchableOpacity>
    </XStack>
  );
};

export { PolicyStamp };
