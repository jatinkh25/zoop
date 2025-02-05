import { Dimensions, PixelRatio } from 'react-native'

// Get screen width and height
const { width, height } = Dimensions.get('window')

// Define base dimensions
const BASE_WIDTH = 375
const BASE_HEIGHT = 812

// Scale width based on screen size
export const horizontalScale = (size: number) => (width / BASE_WIDTH) * size

// Scale height based on screen size
export const verticalScale = (size: number) => (height / BASE_HEIGHT) * size

// Scale size moderately (useful for font sizes)
export const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor

// Normalize font size to prevent tiny text on large screens
export const normalizeFont = (size: number) => {
  const scaleFactor = width / BASE_WIDTH
  return Math.round(PixelRatio.roundToNearestPixel(size * scaleFactor))
}
