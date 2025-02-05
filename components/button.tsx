import React, { PropsWithChildren } from 'react'
import { Pressable, View, GestureResponderEvent } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import Loader from './loader'

interface ButtonProps {
  isLoading?: boolean
  className?: string
  onPress?: (event: GestureResponderEvent) => void
  onPressIn?: (event: GestureResponderEvent) => void
  onPressOut?: (event: GestureResponderEvent) => void
  accessibilityLabel?: string
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  isLoading,
  className,
  onPress,
  onPressIn,
  onPressOut,
  accessibilityLabel,
  children,
}) => {
  // Shared values for scale and opacity.
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  // Create an animated style from the shared values.
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }
  })

  const handlePressIn = (event: GestureResponderEvent) => {
    // Custom spring configuration for a snappy, responsive feel.
    const springConfig = {
      stiffness: 300,
      damping: 20,
      mass: 0.5,
    }

    scale.value = withSpring(0.98, springConfig)
    opacity.value = withTiming(0.9, { duration: 100 })
    onPressIn && onPressIn(event)
  }

  const handlePressOut = (event: GestureResponderEvent) => {
    scale.value = withSpring(1)
    opacity.value = withTiming(1, { duration: 100 })
    onPressOut && onPressOut(event)
  }

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || 'button'}
    >
      {/* Animated.View applies the reanimated animations */}
      <Animated.View
        style={[animatedStyle]}
        className={[
          'bg-primary py-4 items-center justify-center rounded-md',
          className,
        ].join(' ')}
      >
        {isLoading ? <Loader /> : children}
      </Animated.View>
    </Pressable>
  )
}

export default Button
