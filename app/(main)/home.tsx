import Button from '@/components/button'
import { StatusBar } from 'expo-status-bar'
import { Text, View, ScrollView, Image, Dimensions, ActivityIndicator } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather'
import { normalizeFont } from '@/utils/scale-utils'
import Octicons from '@expo/vector-icons/Octicons'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useState, useRef } from 'react'
import { Restaurant } from '@/types/restaurant'

import createApiCall, { GET } from '@/_api'
import { GET_RESTAURANTS } from '@/_api/api.urls'
import AnimatedLink from '@/components/animated-link'

export const getRestaurants = createApiCall(GET_RESTAURANTS, GET)
const LIMIT = 10

const { width: screenWidth } = Dimensions.get('window')

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { top } = useSafeAreaInsets()
  const router = useRouter()

  const handleSearchClick = () => {
    router.push('/search')
  }

  const handleNotificationClick = () => {
    router.push('/notifications')
  }

  const {
    data: restaurants,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['restaurants'],
    queryFn: ({ pageParam }): Promise<Restaurant[]> =>
      getRestaurants({
        urlParams: { page_no: pageParam, limit: LIMIT },
      }),
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length > 0 ? lastPageParam + 1 : undefined
    },

    initialPageParam: 0,
  })

  const restaurantsData = restaurants?.pages.flat() || []

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return (
    <>
      <StatusBar animated style="inverted" />
      <ScrollView className="relative" onScroll={handleLoadMore}>
        <SafeAreaView className="relative flex-1">
          <Image
            className="w-full h-[250px] absolute"
            source={require('@/assets/images/home-background.png')}
          />
          <View className="absolute inset-0 h-[250px] bg-black opacity-50" />
          <View className="px-6">
            <View style={{ height: 250 - top }}>
              <View className="flex-row items-center justify-between">
                <Button className="w-[128px] bg-transparent">
                  <View className="flex-row items-center gap-1">
                    <Text className="text-white" style={{ fontSize: normalizeFont(16) }}>
                      Your Location
                    </Text>
                    <Feather name="chevron-down" size={24} color="white" />
                  </View>
                  <View className="flex-row items-center gap-3 pt-2 pl-3">
                    <Octicons name="location" size={24} color="white" />
                    <Text
                      className="text-white font-medium"
                      style={{ fontSize: normalizeFont(16) }}
                    >
                      New York City
                    </Text>
                  </View>
                </Button>
                <View className="flex-row gap-4">
                  <Button
                    onPress={handleSearchClick}
                    className="border border-white rounded-full w-10 h-10 items-center justify-center p-0 bg-transparent"
                  >
                    <Octicons name="search" size={18} selectionColor="gray" color="white" />
                  </Button>
                  <Button
                    onPress={handleSearchClick}
                    className="border border-white rounded-full w-10 h-10 items-center justify-center p-0 bg-transparent"
                  >
                    <Ionicons
                      name="notifications-outline"
                      onPress={handleNotificationClick}
                      size={21}
                      selectionColor="gray"
                      color="white"
                    />
                  </Button>
                </View>
              </View>
              <Text style={{ fontSize: normalizeFont(32) }} className="text-white font-semibold">
                We provide the best food for you
              </Text>
            </View>
            <View className="flex-row justify-between pt-6">
              <Text style={{ fontSize: normalizeFont(16) }} className="font-semibold">
                Find by Category
              </Text>
            </View>

            <View className="pt-4"></View>
          </View>

          <View className="px-6 gap-2">
            {restaurantsData?.map((restaurant) => (
              <View
                key={restaurant.id}
                className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden"
              >
                <View className="relative">
                  <RestaurantImageCarousel
                    images={
                      restaurant.top_menu_items?.map((item) => item.image_url).filter(Boolean) || []
                    }
                  />
                </View>

                <View className="p-4">
                  <RestaurantCardContent restaurant={restaurant} />
                </View>
              </View>
            ))}

            {isFetchingNextPage && (
              <ActivityIndicator size="small" color="#FE8C00" style={{ marginBottom: 20 }} />
            )}
            {!hasNextPage && restaurantsData.length > 0 && (
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 20,
                  fontSize: normalizeFont(14),
                  color: 'gray',
                }}
              >
                No more restaurants to load
              </Text>
            )}
            {restaurantsData.length === 0 &&
              !isLoading &&
              !isFetchingNextPage &&
              status !== 'error' && ( // Added status check to avoid showing "No restaurants found" on initial error
                <Text
                  style={{
                    textAlign: 'center',
                    marginBottom: 20,
                    fontSize: normalizeFont(14),
                    color: 'gray',
                  }}
                >
                  No restaurants found
                </Text>
              )}
            {status === 'error' && restaurantsData.length === 0 && (
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 20,
                  fontSize: normalizeFont(14),
                  color: 'red',
                }}
              >
                Error loading restaurants
              </Text>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  )
}

interface RestaurantCardContentProps {
  restaurant: Restaurant
}

const RestaurantCardContent: React.FC<RestaurantCardContentProps> = ({ restaurant }) => (
  <>
    <View className="flex-row justify-between items-center">
      <Text className="font-bold" style={{ fontSize: normalizeFont(18) }}>
        {restaurant.name}
      </Text>
      <View className="bg-green-700 px-2 py-1 rounded">
        <Text className="text-white font-bold" style={{ fontSize: normalizeFont(14) }}>
          4.5★
        </Text>
      </View>
    </View>

    <View className="flex-row items-center gap-2 mt-2">
      <View className="flex-row items-center">
        <Feather name="clock" size={14} color="gray" />
        <Text className="text-gray-600 ml-1" style={{ fontSize: normalizeFont(14) }}>
          20 mins
        </Text>
      </View>
      <Text className="text-gray-600">•</Text>
      <View className="flex-row items-center">
        <Octicons name="location" size={14} color="gray" />
        <Text className="text-gray-600 ml-1" style={{ fontSize: normalizeFont(14) }}>
          10 km
        </Text>
      </View>
      <Text className="text-gray-600">•</Text>
      <View className="flex-row items-center">
        <Feather name="truck" size={14} color="gray" />
        <Text className="text-gray-600 ml-1" style={{ fontSize: normalizeFont(14) }}>
          Free Delivery
        </Text>
      </View>
    </View>
  </>
)

interface RestaurantImageCarouselProps {
  images: string[]
}

const RestaurantImageCarousel: React.FC<RestaurantImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const scrollViewRef = useRef<ScrollView>(null)
  const imageCount = images.length

  useEffect(() => {
    if (imageCount > 0) {
      const intervalId = setInterval(() => {
        const nextIndex = (currentIndex + 1) % imageCount
        scrollViewRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true })
        setCurrentIndex(nextIndex)
      }, 3000)

      return () => clearInterval(intervalId)
    }
  }, [currentIndex, imageCount])

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const index = Math.round(contentOffsetX / screenWidth)
    setCurrentIndex(index)
  }

  return (
    <View className="relative">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        className="w-full h-[200px]"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        scrollEnabled={imageCount > 1}
      >
        {images.map((imageUri, index) => (
          <Image
            key={index}
            source={{ uri: imageUri }}
            className="w-full h-[200px]"
            resizeMode="cover"
            style={{ width: screenWidth }}
          />
        ))}
      </ScrollView>
      {imageCount > 0 && (
        <View className="absolute bottom-2 left-0 right-0 flex-row justify-center gap-1">
          {images.map((_, index) => (
            <View
              key={index}
              className={`w-2 h-2 rounded-full border border-white ${
                currentIndex === index ? 'bg-white' : 'bg-transparent'
              }`}
            />
          ))}
        </View>
      )}
    </View>
  )
}

export default Home
