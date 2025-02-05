import { ActivityIndicator } from 'react-native'

const Loader = () => {
  return (
    <ActivityIndicator
      accessible
      accessibilityLabel="Loading"
      accessibilityRole="progressbar"
      color="white"
    />
  )
}

export default Loader
