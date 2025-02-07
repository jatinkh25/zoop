import { moderateScale, normalizeFont } from '@/utils/scale-utils'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Checkbox from 'expo-checkbox'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import AnimatedLink from '@/components/animated-link'
import Button from '@/components/button'
import { useMutation } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase'

const defaultErrors = {
  name: '',
  email: '',
  password: '',
  terms: '',
}

export default function Register() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isTermsAndConditionsAgreed, setIsTermsAndConditionsAgreed] = useState(false)
  const [errors, setErrors] = useState(defaultErrors)

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return await getSupabaseClient().auth.signUp({
        email: email,
        password: password,
      })
    },
  })

  const validateForm = () => {
    const newErrors = { ...defaultErrors }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!name) newErrors.name = 'Please enter your name'
    if (!email) newErrors.email = 'Please enter your email'
    else if (!emailRegex.test(email)) newErrors.email = 'Please enter a valid email address'

    if (!password) newErrors.password = 'Please enter your password'
    if (!isTermsAndConditionsAgreed) newErrors.terms = 'Please agree to the terms and conditions'

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === '')
  }

  const handleRegister = async () => {
    if (!validateForm()) return

    const { data, error } = await mutateAsync({ email, password })

    console.log(data, error)
    console.log(data)
    router.replace('/home')
  }

  return (
    <SafeAreaView className="flex-[1]">
      <ScrollView showsVerticalScrollIndicator={false}>
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
              autoComplete="name"
              textContentType="name"
              className={`border rounded-md p-3 ${
                errors.email ? 'border-red-500' : 'border-neutral-300'
              }`}
              style={{ fontSize: normalizeFont(16) }}
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.nativeEvent.text)}
            />
            {errors.name && <Text className="text-red-500 mt-1">{errors.name}</Text>}

            <Text className="text-neutral-700 pb-2 pt-6" style={{ fontSize: normalizeFont(14) }}>
              Email
            </Text>
            <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              className={`border rounded-md p-3 ${
                errors.email ? 'border-red-500' : 'border-neutral-300'
              }`}
              style={{ fontSize: normalizeFont(16) }}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.nativeEvent.text)}
            />
            {errors.email && <Text className="text-red-500 mt-1">{errors.email}</Text>}

            <Text className="pt-6 text-neutral-700 pb-2" style={{ fontSize: normalizeFont(14) }}>
              Password
            </Text>
            <View
              className={`flex-row items-center border rounded-md  ${
                errors.password ? 'border-red-500' : 'border-neutral-300'
              }`}
            >
              <TextInput
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="new-password"
                textContentType="password"
                className="flex-1 p-3"
                style={{ fontSize: normalizeFont(16) }}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
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
            {errors.password && <Text className="text-red-500 mt-1">{errors.password}</Text>}

            <View className="pt-6 flex-row items-center gap-2">
              <Checkbox
                value={isTermsAndConditionsAgreed}
                onValueChange={setIsTermsAndConditionsAgreed}
                color={isTermsAndConditionsAgreed ? '#FE8C00' : undefined}
                aria-label="Agree to Terms and Conditions"
                accessibilityLabel="Agree to Terms and Conditions"
                className={`border rounded outline-none ${
                  errors.terms ? 'border-red-500' : 'border-neutral-100'
                }`}
              />
              <View className="flex-row">
                <Text className="text-neutral-700">I Agree with</Text>
                <AnimatedLink
                  href={'/terms-of-service'}
                  className="text-primary"
                  accessibilityRole="link"
                  accessibilityHint="Opens the Terms of Service"
                >
                  <Text className="text-primary font-medium"> Terms of Service </Text>
                </AnimatedLink>
                <Text className="text-neutral-700">and</Text>
                <AnimatedLink
                  href={'/privacy-policy'}
                  className="text-primary"
                  accessibilityRole="link"
                  accessibilityHint="Opens the Privacy Policy"
                >
                  <Text className="text-primary font-medium"> Privacy Policy </Text>
                </AnimatedLink>
              </View>
            </View>
            {errors.terms && <Text className="text-red-500 mt-1">{errors.terms}</Text>}

            <Button
              isLoading={isPending}
              onPress={handleRegister}
              className="bg-primary py-4 items-center justify-center rounded-md mt-8"
            >
              <Text style={{ fontSize: normalizeFont(14) }} className="text-white font-semibold">
                Register
              </Text>
            </Button>
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

            <AnimatedLink href="/login" className="flex-row" containerClassName="mt-8 mx-auto">
              <Text className="text-neutral-700">Already have an account? </Text>
              <Text className="text-primary">Sign In</Text>
            </AnimatedLink>
          </View>
        </View>
        <StatusBar style="dark" />
      </ScrollView>
    </SafeAreaView>
  )
}
