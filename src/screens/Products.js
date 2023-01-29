import { View } from "react-native";
import React from "react";
import { useTheme, Text } from "react-native-paper";
import Header from "../components/Header";

export default function Products() {
  return (
    <View>
      <Header title="Search Products" />
      <Text>Search Products</Text>
    </View>
  );
}
