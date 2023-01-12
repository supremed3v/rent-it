import { TouchableOpacity, Dimensions, Image } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function ProductCard({ item }) {
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
      }}
      onPress={() => navigation.navigate("ProductDetails", { item: item })}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: 100,
          height: 100,
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          color: "#000",
        }}
      >
        {item.name}
      </Text>
      <Text
        style={{
          color: "#000",
        }}
      >
        Price: {item.price}
      </Text>
    </TouchableOpacity>
  );
}
