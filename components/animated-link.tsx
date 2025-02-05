import { Link } from 'expo-router'
import { PropsWithChildren } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

interface LinkProps extends React.ComponentProps<typeof Link> {
  containerClassName?: string
}

export default function AnimatedLink({
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
      onPressIn={() => (opacity.value = 0.8)}
      onPressOut={() => (opacity.value = 1)}
    >
      <Animated.View style={animatedStyle}>
        <View className={className}>{children}</View>
      </Animated.View>
    </Link>
  )
}
