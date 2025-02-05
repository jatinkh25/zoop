import React, { useState } from 'react'
import { moderateScale, normalizeFont } from '@/utils/scale-utils'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="py-8 px-6">
          <Text
            style={{ fontSize: normalizeFont(32) }}
            className="font-bold max-w-80 text-neutral-800"
          >
            Login to your account
          </Text>
          <Text className="pt-3 text-neutral-700" style={{ fontSize: normalizeFont(14) }}>
            Please sign in to your account
          </Text>

          <View className="pt-16">
            <Text className="text-neutral-700 pb-2" style={{ fontSize: normalizeFont(14) }}>
              Email
            </Text>
            <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              className="border rounded-md border-neutral-300 p-3"
              style={{ fontSize: normalizeFont(16) }}
              placeholder="Enter your email"
            />

            <Text className="pt-8 text-neutral-700 pb-2" style={{ fontSize: normalizeFont(14) }}>
              Password
            </Text>
            <View className="flex-row items-center border rounded-md border-neutral-300">
              <TextInput
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                className="flex-1 p-3"
                style={{ fontSize: normalizeFont(16) }}
                placeholder="Password"
              />
              <Pressable
                onPress={() => setPasswordVisible(!passwordVisible)}
                className="pr-3"
                accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
              >
                <Ionicons
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  size={moderateScale(20)}
                  color="#888"
                />
              </Pressable>
            </View>

            <Link href="/forgot-password" className="text-primary ml-auto pt-6 font-medium">
              <Text>Forgot password?</Text>
            </Link>

            <Pressable className="bg-primary py-4 items-center justify-center rounded-md mt-8">
              <Text style={{ fontSize: normalizeFont(14) }} className="text-white font-semibold">
                Sign In
              </Text>
            </Pressable>

            <View className="pt-6 w-full flex flex-row items-center justify-center gap-4">
              <View className="flex-1 h-[1px] bg-neutral-300" />
              <Text className="text-neutral-400 font-medium">Or sign in with</Text>
              <View className="flex-1 h-[1px] bg-neutral-300" />
            </View>

            <View className="flex-row items-center justify-center mt-6 gap-5">
              <Pressable className="bg-white w-16 h-16 border border-neutral-400 rounded-full items-center justify-center">
                <Text
                  style={{ fontSize: normalizeFont(18) }}
                  className="text-neutral-600 font-semibold"
                >
                  G
                </Text>
              </Pressable>
              <Pressable className="bg-white w-16 h-16 border border-neutral-400 rounded-full items-center justify-center">
                <Text
                  style={{ fontSize: normalizeFont(18) }}
                  className="text-neutral-600 font-semibold"
                >
                  F
                </Text>
              </Pressable>
              <Pressable className="bg-white w-16 h-16 border border-neutral-400 rounded-full items-center justify-center">
                <Text
                  style={{ fontSize: normalizeFont(18) }}
                  className="text-neutral-600 font-semibold"
                >
                  A
                </Text>
              </Pressable>
            </View>

            <Link href="/register" className="mt-8 mx-auto flex-row">
              <Text className="text-neutral-700">Don't have an account? </Text>
              <Text className="text-primary">Register</Text>
            </Link>
          </View>
        </View>
        <StatusBar style="dark" />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login
