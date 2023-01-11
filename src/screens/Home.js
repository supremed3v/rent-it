import { View } from 'react-native'
import React from 'react'
import { useTheme, Text } from 'react-native-paper'

export default function Home() {
    const theme = useTheme()
  return (
    <View>
      <Text variant="displayMedium">Home</Text>
    </View>
  )
}