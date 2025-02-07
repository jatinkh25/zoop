import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="privacy-policy" />
      <Stack.Screen name="terms-of-service" />
    </Stack>
  )
}
