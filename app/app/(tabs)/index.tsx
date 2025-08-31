import { ExternalLink } from '@tamagui/lucide-icons'
import { Anchor, H2, Paragraph, XStack, YStack } from 'tamagui'
import { ToastControl } from 'components/CurrentToast'

export default function TabOneScreen() {
  return (
    <YStack flex={1} alignItems="center" gap="$8" px="$10" pt="$5" backgroundColor="$background">
      <H2>Tamagui + Expo</H2>

      <ToastControl />

      <XStack
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        gap="$1.5"
        position="absolute"
        bottom="$8"
      >
        <Paragraph fontSize="$5">Add</Paragraph>

        <Paragraph fontSize="$5" px="$2" py="$1" color="$blue10" bg="$blue5">
          tamagui.config.ts
        </Paragraph>

        <Paragraph fontSize="$5">to root and follow the</Paragraph>

        <XStack
          alignItems="center"
          gap="$1.5"
          px="$2"
          py="$1"
          borderRadius="$3"
          bg="$green5"
          hoverStyle={{ bg: '$green6' }}
          pressStyle={{ bg: '$green4' }}
        >
          <Anchor
            href="https://tamagui.dev/docs/core/configuration"
            textDecorationLine="none"
            color="$green10"
            fontSize="$5"
          >
            Configuration guide
          </Anchor>
          <ExternalLink size="$1" color="$green10" />
        </XStack>

        <Paragraph fontSize="$5" textAlign="center">
          to configure your themes and tokens.
        </Paragraph>
      </XStack>
    </YStack>
  )
}
