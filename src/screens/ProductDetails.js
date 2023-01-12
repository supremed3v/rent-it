import { View } from "react-native";
import React from "react";

import { useTheme, Text, Button } from "react-native-paper";
import { AirbnbRating, Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetails({ route, navigation }) {
  const { item } = route.params;
  return (
    <>
      <SafeAreaView />
      <View>
        <Text>{item.name}</Text>
        <Button mode="elevated" onPress={() => navigation.goBack()}>
          go back
        </Button>
        <AirbnbRating
          count={5}
          defaultRating={Math.floor(item.rating)}
          size={20}
          showRating={false}
        />
      </View>
    </>
  );
}
