import { TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function ProductsCategory({ item }) {
  const navigation = useNavigation();
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
      onPress={() =>
        navigation.navigate("FilteredProducts", { category: item?.name })
      }
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
