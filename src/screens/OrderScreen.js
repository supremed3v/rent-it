import { View } from "react-native";
import React from "react";
import Header from "../components/Header";
import { Text } from "react-native-paper";
import LottieView from "lottie-react-native";

export default function OrderScreen() {
  return (
    <View>
      <Header title="Past Orders" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <LottieView
          source={require("../../assets/empty.json")}
          style={{
            width: 200,
            height: 200,
          }}
          autoPlay
          loop
        />
        <Text
          variant="displaySmall"
          style={{
            width: 300,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          You don't have any past orders
        </Text>
      </View>
    </View>
  );
}
