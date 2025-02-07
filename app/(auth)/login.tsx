import { useState } from 'react'
import { moderateScale, normalizeFont } from '@/utils/scale-utils'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase'
import Button from '@/components/button'
import AnimatedLink from '@/components/animated-link'

const defaultErrors = {
  email: '',
  password: '',
}

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [errors, setErrors] = useState(defaultErrors)

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return await getSupabaseClient().auth.signInWithPassword({
        email: email,
        password: password,
      })
    },
  })

  const validateForm = () => {
    const newErrors = { ...defaultErrors }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) newErrors.email = 'Please enter your email'
    else if (!emailRegex.test(email)) newErrors.email = 'Please enter a valid email address'

    if (!password) newErrors.password = 'Please enter your password'

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === '')
  }

  const handleLogin = async () => {
    if (!validateForm()) return

    const { data, error } = await mutateAsync({ email, password })

    if (error) {
      console.error(error)
      return
    }

    console.log(data)
    router.replace('/home')
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="py-8 px-6">
          <Text
            style={{ fontSize: normalizeFont(36) }}
            className="font-bold max-w-70 text-neutral-800"
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
              autoComplete="email"
              style={{ fontSize: normalizeFont(16) }}
              placeholder="Enter your email"
              value={email}
              className={`border rounded-md p-3 ${
                errors.email ? 'border-red-500' : 'border-neutral-300'
              }`}
              onChange={(e) => setEmail(e.nativeEvent.text)}
            />
            {errors.email && <Text className="text-red-500 mt-1">{errors.email}</Text>}

            <Text className="pt-8 text-neutral-700 pb-2" style={{ fontSize: normalizeFont(14) }}>
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
                textContentType="password"
                autoComplete="current-password"
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

            <AnimatedLink href="/forgot-password" containerClassName="ml-auto pt-6">
              <Text className="text-primary font-medium">Forgot password?</Text>
            </AnimatedLink>

            <Button isLoading={isPending} onPress={handleLogin} className="mt-8">
              <Text style={{ fontSize: normalizeFont(14) }} className="text-white font-semibold">
                Sign In
              </Text>
            </Button>

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

            <AnimatedLink href="/register" className="flex-row" containerClassName="mt-8 mx-auto">
              <Text className="text-neutral-700">Don't have an account? </Text>
              <Text className="text-primary">Register</Text>
            </AnimatedLink>
          </View>
        </View>
        <StatusBar style="dark" />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login
