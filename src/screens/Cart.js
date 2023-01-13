import { View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart } = useCart();
  return (
    <>
      <SafeAreaView />
      <View>
        <Text>Cart</Text>
        {cart.length !== 0 ? (
          cart.map((item) => (
            <View key={item.id}>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              <Text>{item.quantity}</Text>
            </View>
          ))
        ) : (
          <Text>Cart is empty</Text>
        )}
      </View>
    </>
  );
}
