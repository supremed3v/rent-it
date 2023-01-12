import { TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Text } from "react-native-paper";

export default function ProductsCategory({ item }) {
  return (
    <TouchableOpacity
      style={{
        width: Dimensions.get("window").width / 2,
        height: 200,
        backgroundColor: "#e7e7e7e7",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        margin: 10,
        width: Dimensions.get("window").width / 2,
      }}
      onPress={() => navigation.navigate("ProductDetails", { item: item })}
    >
      <Text
        style={{
          color: "#000",
        }}
      >
        {item?.name}
      </Text>
      <Text
        style={{
          color: "#000",
        }}
      >
        {item?.numOfProducts}
      </Text>
    </TouchableOpacity>
  );
}
