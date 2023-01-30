import { View } from "react-native";
import React from "react";
import Header from "../components/Header";
import { Text } from "react-native-paper";
import LottieView from "lottie-react-native";
import EmptyData from "../components/EmptyData";

export default function OrderScreen() {
  return (
    <View>
      <Header title="Past Orders" />
      <EmptyData errorText="No orders yet" />
    </View>
  );
}
