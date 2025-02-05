import { moderateScale, normalizeFont } from '@/utils/scale-utils'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Checkbox from 'expo-checkbox'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isTermsAndConditionsAgreed, setIsTermsAndConditionsAgreed] = useState(false)

  return (
    <SafeAreaView className="flex-[1]">
      <ScrollView>
        <View className="py-8 px-6">
          <Text
            style={{ fontSize: normalizeFont(32) }}
            className="font-bold max-w-80 text-neutral-800"
          >
            Create your new account
          </Text>
          <Text className="pt-3 text-neutral-700" style={{ fontSize: normalizeFont(14) }}>
            Create an account and start looking for the food you like.
          </Text>

          <View className="pt-10">
            <Text className="text-neutral-700 pb-2" style={{ fontSize: normalizeFont(14) }}>
              Name
            </Text>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              textContentType="name"
              className="border rounded-md border-neutral-300 p-3"
              style={{ fontSize: normalizeFont(16) }}
              placeholder="Enter your full name"
            />
            <Text className="text-neutral-700 pb-2 pt-6" style={{ fontSize: normalizeFont(14) }}>
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
            <Text className="pt-6 text-neutral-700 pb-2" style={{ fontSize: normalizeFont(14) }}>
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
            <View className="pt-6 flex-row items-center gap-2">
              <Checkbox
                value={isTermsAndConditionsAgreed}
                onValueChange={setIsTermsAndConditionsAgreed}
                color={isTermsAndConditionsAgreed ? '#FE8C00' : undefined}
                className="border border-neutral-100 rounded outline-none"
              />
              <View className="flex-row">
                <Text className="text-neutral-700">I Agree with</Text>
                <Text className="text-primary font-medium"> Terms of Service </Text>
                <Text className="text-neutral-700">and</Text>
                <Text className="text-primary font-medium"> Privacy Policy </Text>
              </View>
            </View>
            <Pressable className="bg-primary py-4 items-center justify-center rounded-md mt-8">
              <Text style={{ fontSize: normalizeFont(14) }} className="text-white font-semibold">
                Register
              </Text>
            </Pressable>
            <View className="pt-6 w-full flex flex-row items-center justify-center gap-4">
              <View className="flex-[1] h-[1px] bg-neutral-300 w-full" />
              <Text className="text-neutral-400 font-medium">Or sign up with</Text>
              <View className="flex-[1] h-[1px] bg-neutral-300 w-full" />
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

            <Link href="/login" className="mt-8 mx-auto">
              <Text className="text-neutral-700">Already have an account?</Text>{' '}
              <Text className="text-primary">Sign In</Text>
            </Link>
          </View>
        </View>
        <StatusBar style="dark" />
      </ScrollView>
    </SafeAreaView>
  )
}
