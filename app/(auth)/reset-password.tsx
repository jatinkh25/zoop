import React, { useState } from 'react'
import { View, Text, TextInput, Alert, Pressable, Platform } from 'react-native'
import { useRouter } from 'expo-router'
import { getSupabaseClient } from '@/lib/supabase'
import { useMutation } from '@tanstack/react-query'
import Button from '@/components/button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, normalizeFont } from '@/utils/scale-utils'
import { Ionicons } from '@expo/vector-icons'
import { KeyboardAvoidingView, KeyboardAwareScrollView } from 'react-native-keyboard-controller'

const defaultErrors = {
  password: '',
  confirmPassword: '',
}

export default function ResetPassword() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [errors, setErrors] = useState(defaultErrors)

  const validateForm = () => {
    const newErrors = { ...defaultErrors }

    if (!password) newErrors.password = 'Please enter your new password'
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your new password'
    if (password !== confirmPassword) {
      newErrors.password = ''
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === '')
  }

  const handleReset = async () => {
    if (!validateForm()) return

    const { error } = await getSupabaseClient().auth.updateUser({
      password: password,
    })

    if (error) {
      console.error(error)
      Alert.alert('An error occurred while resetting the password')
      return
    }

    router.replace('/login')
  }

  const { mutate: resetPassword, isPending } = useMutation({
    mutationKey: ['reset-password', password],
    mutationFn: handleReset,
  })

  return (
    <SafeAreaView className="flex-[1]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="px-6 py-8 flex-[1]"
      >
        <KeyboardAwareScrollView
          keyboardDismissMode="interactive"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="pb-6">
            <Text
              style={{ fontSize: normalizeFont(36) }}
              className="font-bold text-neutral-800 max-w-60"
            >
              Reset Password
            </Text>
            <Text className="pt-3 text-neutral-700" style={{ fontSize: normalizeFont(16) }}>
              Enter your new password below.
            </Text>
          </View>

          <View className="mt-6">
            <Text className="text-neutral-700 pb-2" style={{ fontSize: normalizeFont(14) }}>
              New Password
            </Text>
            <View
              className={`flex-row items-center border rounded-md ${
                errors.password ? 'border-red-500' : 'border-neutral-300'
              }`}
            >
              <TextInput
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                autoComplete="new-password"
                className="flex-1 p-3"
                style={{ fontSize: normalizeFont(16) }}
                placeholder="New Password"
                value={password}
                onChangeText={setPassword}
              />
              <Pressable onPress={() => setPasswordVisible(!passwordVisible)} className="pr-3">
                <Ionicons
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  size={moderateScale(20)}
                  color="#888"
                />
              </Pressable>
            </View>
            {errors.password && <Text className="text-red-500 mt-1">{errors.password}</Text>}

            <Text className="text-neutral-700 pb-2 pt-6" style={{ fontSize: normalizeFont(14) }}>
              Confirm Password
            </Text>
            <View
              className={`flex-row items-center border rounded-md ${
                errors.confirmPassword ? 'border-red-500' : 'border-neutral-300'
              }`}
            >
              <TextInput
                secureTextEntry={!confirmPasswordVisible}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                autoComplete="new-password"
                className="flex-1 p-3"
                style={{ fontSize: normalizeFont(16) }}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Pressable
                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                className="pr-3"
              >
                <Ionicons
                  name={confirmPasswordVisible ? 'eye-off' : 'eye'}
                  size={moderateScale(20)}
                  color="#888"
                />
              </Pressable>
            </View>
            {errors.confirmPassword && (
              <Text className="text-red-500 mt-1">{errors.confirmPassword}</Text>
            )}
          </View>
        </KeyboardAwareScrollView>

        <Button
          onPress={() => resetPassword()}
          isLoading={isPending}
          className="bg-primary items-center justify-center rounded-md mb-6"
        >
          <Text
            style={{ fontSize: normalizeFont(14) }}
            className="text-white font-semibold w-full text-center"
          >
            Reset Password
          </Text>
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
