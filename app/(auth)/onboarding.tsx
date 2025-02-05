import React, { useRef, useState } from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import AntDesign from '@expo/vector-icons/AntDesign'
import { moderateScale, normalizeFont } from '@/utils/scale-utils'
import PagerView from 'react-native-pager-view'
import { useRouter } from 'expo-router'

const ONBOARDING_STEPS = [
  {
    title: 'We serve incomparable delicious food',
    description:
      "All the best restaurants with their top menu waiting for you, they can't wait for your order!!",
  },
  {
    title: 'Fastest delivery in your town',
    description:
      'Your favorite meals delivered to your doorstep in minutes. No waiting, just enjoying!',
  },
  {
    title: 'Exclusive deals just for you!',
    description:
      'Unlock special discounts and offers only available to our app users. Start saving now!',
  },
]

export default function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0)
  const router = useRouter()
  const pagerRef = useRef<PagerView>(null)

  const handleNextPress = () => {
    if (currentPage < ONBOARDING_STEPS.length - 1) {
      pagerRef.current?.setPage(currentPage + 1)
      setCurrentPage(currentPage + 1)
      console.log('currentPage', currentPage + 1)
    } else {
      // After completing onboarding, navigate to login screen
      router.navigate('/login')
    }
  }

  const handlePageSelected = (e: { nativeEvent: { position: number } }) => {
    console.log('page', e.nativeEvent.position)
    // setCurrentPage(e.nativeEvent.position)
  }

  return (
    <View className="relative w-full h-full">
      <Image
        className="absolute w-full h-full"
        resizeMode="cover"
        source={require('../../assets/images/onboarding.png')}
      />

      <ScrollView contentContainerClassName="flex justify-end h-full">
        <View style={{ padding: moderateScale(32) }}>
          <View
            style={{ borderRadius: moderateScale(48) }}
            className="mx-auto w-full bg-primary h-[400px] p-8 mt-auto flex justify-between"
          >
            <PagerView ref={pagerRef} style={{ flex: 1 }} onPageSelected={handlePageSelected}>
              {ONBOARDING_STEPS.map((step, index) => (
                <View key={index.toString()} className="items-center justify-center">
                  <Text
                    style={{ fontSize: normalizeFont(32) }}
                    className="text-white font-semibold text-center"
                  >
                    {step.title}
                  </Text>
                  <Text
                    style={{ fontSize: normalizeFont(14) }}
                    className="pt-4 leading-tight text-white text-center"
                  >
                    {step.description}
                  </Text>
                </View>
              ))}
            </PagerView>

            <View className="flex flex-row justify-between items-center px-2">
              <Text style={{ fontSize: normalizeFont(14) }} className="text-white font-semibold">
                Skip
              </Text>
              <Pressable
                onPress={handleNextPress}
                className="flex flex-row gap-2 items-center justify-center"
              >
                <Text style={{ fontSize: normalizeFont(14) }} className="text-white font-semibold">
                  Next
                </Text>
                <AntDesign name="arrowright" size={18} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </View>
  )
}
