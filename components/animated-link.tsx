import { cn } from '@/utils/helpers'
import { Link } from 'expo-router'
import { PropsWithChildren, useState } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

interface LinkProps extends React.ComponentProps<typeof Link> {
  containerClassName?: string
  activeOpacity?: number
}

export default function AnimatedLink({
  activeOpacity = 0.8,
  className,
  containerClassName,
  children,
  ...rest
}: PropsWithChildren<LinkProps>) {
  const opacity = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  return (
    <Link
      {...rest}
      className={containerClassName}
      onPressIn={() => (opacity.value = activeOpacity)}
      onPressOut={() => (opacity.value = 1)}
    >
      <Animated.View style={animatedStyle}>
        <View className={cn(className)}>{children}</View>
      </Animated.View>
    </Link>
  )
}
