import { View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import Header from "../components/Header";

export default function BecomeSeller() {
  return (
    <View>
      <Header title={"Hi Seller!"} />
      <Text>Generate OTP (check your email)</Text>
    </View>
  );
}
