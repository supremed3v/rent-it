import { View } from "react-native";
import React from "react";

import { useTheme, Text, Button } from "react-native-paper";

export default function ProductDetails({ route, navigation }) {
  const { item } = route.params;
  return (
    <View>
      <Text>{item.name}</Text>
      <Button mode="elevated" onPress={() => navigation.goBack()}>
        go back
      </Button>
    </View>
  );
}
