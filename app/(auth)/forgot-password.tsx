import { normalizeFont } from '@/utils/scale-utils'
import { View, TextInput, Text, Pressable, Platform } from 'react-native'
import { KeyboardAvoidingView, KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { SafeAreaView } from 'react-native-safe-area-context'

const ForgotPassword = () => {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="py-8 px-6 h-full"
      >
        <KeyboardAwareScrollView keyboardDismissMode="on-drag" className="flex-[1]">
          <Text
            style={{ fontSize: normalizeFont(32) }}
            className="font-bold max-w-80 text-neutral-800"
          >
            Forgot password?
          </Text>
          <Text className="pt-3 text-neutral-700" style={{ fontSize: normalizeFont(14) }}>
            Enter your email address and we’ll send you confirmation code to reset your password
          </Text>

          <View className="pt-10">
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
          </View>
        </KeyboardAwareScrollView>
        <Pressable className="bg-primary py-4 items-center justify-center rounded-md my-8">
          <Text style={{ fontSize: normalizeFont(14) }} className="text-white font-semibold">
            Continue
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ForgotPassword
