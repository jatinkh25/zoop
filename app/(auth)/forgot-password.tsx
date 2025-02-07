import Button from '@/components/button'
import { getSupabaseClient } from '@/lib/supabase'
import { normalizeFont } from '@/utils/scale-utils'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { View, TextInput, Text, Platform, Alert } from 'react-native'
import { KeyboardAvoidingView, KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { SafeAreaView } from 'react-native-safe-area-context'

const ForgotPassword = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const validateForm = () => {
    let isValid = true
    if (!email) {
      setEmailError('Please enter your email')
      isValid = false
    } else if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address')
      isValid = false
    } else {
      setEmailError('')
    }
    return isValid
  }

  const handleContinue = async () => {
    if (!validateForm()) return

    const { error } = await getSupabaseClient().auth.resetPasswordForEmail(email, {
      redirectTo: 'com.jatinkhatri.zoop://reset-password',
    })

    if (error) {
      console.error(error)
      Alert.alert('An error occurred while sending the password reset email')
      return
    }

    Alert.alert('Password reset email sent successfully!')
  }

  const { mutate: sendResetPasswordEmail, isPending } = useMutation({
    mutationKey: ['forgot-password', email],
    mutationFn: () => handleContinue(),
  })

  return (
    <SafeAreaView className="flex-[1]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="py-8 px-6 flex-[1]"
      >
        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-[1] pt-5">
            <Text
              style={{ fontSize: normalizeFont(36) }}
              className="font-bold max-w-80 text-neutral-800"
            >
              Forgot password?
            </Text>
            <Text className="pt-3 text-neutral-700" style={{ fontSize: normalizeFont(14) }}>
              Enter your email address and we’ll send you confirmation code to reset your password
            </Text>
          </View>

          <View className="flex-[3]">
            <View className="pt-10">
              <Text className="text-neutral-700 pb-2" style={{ fontSize: normalizeFont(14) }}>
                Email
              </Text>
              <TextInput
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                className={`border rounded-md p-3 ${
                  emailError ? 'border-red-500' : 'border-neutral-300'
                }`}
                style={{ fontSize: normalizeFont(16) }}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.nativeEvent.text)}
              />
            </View>
            {emailError && <Text className="text-red-500 mt-1">{emailError}</Text>}
          </View>
        </KeyboardAwareScrollView>

        <Button
          isLoading={isPending}
          onPress={() => sendResetPasswordEmail()}
          className="bg-primary items-center justify-center rounded-md mb-6"
        >
          <Text style={{ fontSize: normalizeFont(14) }} className="text-white font-semibold">
            Continue
          </Text>
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ForgotPassword
