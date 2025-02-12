import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import { Feather, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { createApiCall, GET } from '@/_api'
import { GET_MENU_ITEMS, GET_RESTAURANT } from '@/_api/api.urls'
import { MenuItem } from '@/types/menu-item'
import { Restaurant } from '@/types/restaurant'
import Button from '@/components/button'
import { cn } from '@/utils/helpers'

const getRestaurant = createApiCall(GET_RESTAURANT, GET)
const getMenuItems = createApiCall(GET_MENU_ITEMS, GET)
const LIMIT = 10

export default function RestaurantDetails() {
  const { id } = useLocalSearchParams()
  const router = useRouter()

  const { data: restaurant } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: (): Promise<Restaurant> =>
      getRestaurant({
        pathVariables: {
          id: id as string,
        },
      }),
  })

  const { data: menuItemsData } = useInfiniteQuery({
    queryKey: ['menuItems', id],
    queryFn: ({ pageParam }): Promise<MenuItem[]> =>
      getMenuItems({
        urlParams: {
          restaurant_id: id as string,
          page_no: pageParam,
          limit: LIMIT,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length > 0 ? lastPageParam + 1 : undefined
    },
  })

  const menuItems = menuItemsData?.pages.flatMap((page) => page)

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="pb-2 px-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Button
              onPress={() => {
                router.back()
              }}
              className="mr-4 bg-transparent"
            >
              <Feather name="arrow-left" size={24} color="black" />
            </Button>
          </View>
          <View className="flex-row items-center">
            <Button onPress={() => {}} className="mr-4 bg-transparent">
              <Feather name="share-2" size={24} color="black" />
            </Button>
            <Button onPress={() => {}} className="bg-transparent">
              <Feather name="bookmark" size={24} color="black" />
            </Button>
          </View>
        </View>

        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
          <View className="mb-4">
            <View className="bg-green-100 py-1 px-2 rounded-md w-20 mb-2 items-center justify-center">
              <Text className="text-green-600 text-xs font-semibold">Pure Veg</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-xl font-bold">{restaurant?.name}</Text>
              </View>
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="information-circle-outline" size={20} color="gray" />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center mt-1">
              <View className="flex-row items-center">
                <Text className="text-green-800 font-bold">4.3</Text>
                <Ionicons name="star" size={16} color="#16a34a" />
              </View>
              <Text className="text-gray-500 ml-2">2.5K ratings</Text>
            </View>
          </View>

          <View className="mb-4">
            <View className="flex-row items-center mb-1">
              <Feather name="clock" size={16} color="gray" className="mr-1" />
              <Text className="text-gray-600 text-sm">31 mins</Text>
              <Text className="text-gray-600 text-sm ml-2">· 2.4 km · Sanganer</Text>
            </View>
          </View>

          <View className="flex-row gap-3 mb-4">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={20} color="#16a34a" className="mr-1" />
              <Text className="text-green-700 text-sm">On-time preparation</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={20} color="#16a34a" className="mr-1" />
              <Text className="text-green-700 text-sm">Loved by delivery partners</Text>
            </View>
          </View>

          <View className="bg-blue-50 py-2 px-3 rounded-md mb-4 flex-row justify-between items-center">
            <Text className="text-blue-600 font-medium">Flat ₹100 OFF above ₹399</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text className="text-blue-500 text-sm">3 offers</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              onPress={() => {}}
              className="flex-row items-center py-2 px-3 rounded-full border border-gray-300 mr-2"
            >
              <Text className="text-gray-700 text-sm mr-1">Filters</Text>
              <Feather name="chevron-down" size={16} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} className="bg-gray-100 py-2 px-3 rounded-full">
              <Text className="text-gray-700 text-sm font-medium">Bestseller</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              className="bg-gray-100 py-2 px-3 rounded-full ml-2"
            >
              <View className="flex-row items-center">
                <Ionicons name="star" size={14} color="orange" />
                <Text className="text-gray-700 text-sm font-medium ml-1">Rated 4+</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              className="bg-gray-100 py-2 px-3 rounded-full ml-2"
            >
              <Text className="text-gray-700 text-sm font-medium">Spicy</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-lg font-bold mb-3">Recommended for you</Text>

          {menuItems?.map((item) => (
            <View key={item.id} className="bg-white py-6 border-b border-gray-100">
              <View className="flex-row justify-between">
                <View className="flex-1 mr-4">
                  <View className="flex-row items-center mb-1">
                    {true && (
                      <View className="w-4 h-4 border border-green-600 items-center justify-center mr-2">
                        <View className="w-2 h-2 rounded-full bg-green-600" />
                      </View>
                    )}
                    {true && <Text className="text-orange-500 text-xs">Bestseller</Text>}
                  </View>

                  <Text className="text-base font-medium text-gray-900">{item.name}</Text>

                  <View className="flex-row items-center mt-1">
                    <View className="flex-row">
                      {[...Array(Math.floor(4.2))].map((_, i) => (
                        <Ionicons key={i} name="star" size={14} color="orange" />
                      ))}
                      {4.2 % 1 !== 0 && <Ionicons name="star-half" size={14} color="orange" />}
                    </View>
                    <Text className="text-gray-500 text-xs ml-1">(4.2)</Text>
                  </View>

                  <Text className="text-base mt-1">₹{item.price}</Text>

                  <Text className="text-gray-500 text-sm mt-1" numberOfLines={2}>
                    {item.description}
                    <Text className="text-blue-500"> read more</Text>
                  </Text>
                </View>

                <View>
                  <Image source={{ uri: item.image_url }} className="w-24 h-24 rounded-lg" />
                  <View className="mt-2">
                    <Button className="rounded-full py-1 px-6 bg-primary">
                      <Text className="text-center text-white font-bold">ADD</Text>
                    </Button>
                    <Text className="text-gray-400 text-xs text-center mt-1">customisable</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View className="bg-white border-t border-gray-200 py-3 px-4 flex-row justify-between items-center fixed bottom-0 left-0 right-0 w-full">
          <Button
            onPress={() => {}}
            className={cn(
              'bg-gray-100 py-3 px-4 rounded-full flex-row items-center justify-start w-full'
            )}
          >
            <Feather name="search" size={20} color="gray" className="mr-2" />
            <Text className="text-gray-500">Search "momos"</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}
