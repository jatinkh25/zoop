import React from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import 'react-native-reanimated'
import '../global.css'
import useAuthStore from '@/store/auth'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { isAuthenticated } = useAuthStore()
  useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  return (
    <KeyboardProvider>
      <ReactQueryProvider>
        {isAuthenticated ? <SignedInStack /> : <SignedOutStack />}
      </ReactQueryProvider>
    </KeyboardProvider>
  )
}

const SignedInStack = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(main)" />
    </Stack>
  )
}

const SignedOutStack = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
    </Stack>
  )
}
