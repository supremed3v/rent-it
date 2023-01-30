import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const Loader = () => {
  return (
    <View style={[styles.container, , StyleSheet.absoluteFillObject]}>
      <LottieView source={require("../../assets/loader.json")} autoPlay loop />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
