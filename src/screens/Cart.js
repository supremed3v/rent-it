import { View, Image } from "react-native";
import React from "react";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../context/CartContext";
import { Entypo } from "@expo/vector-icons";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  return (
    <>
      <SafeAreaView />
      <View>
        <Text>Cart</Text>
        {cart.length !== 0 ? (
          cart.map((item) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20,
              }}
              key={item.id}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 20,
                  }}
                />
                <View
                  style={{
                    marginLeft: 20,
                  }}
                >
                  <Text
                    variant="bodyLarge"
                    style={{
                      fontSize: 20,
                      fontWeight: "medium",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    variant=""
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    PKR {item.price} /-
                  </Text>
                </View>
              </View>
              <Button onPress={() => removeFromCart(item)}>
                <Entypo name="trash" size={24} color="white" />
              </Button>
            </View>
          ))
        ) : (
          <Text>Cart is empty</Text>
        )}
        {cart.length !== 0 && (
          <Text>
            Total:{" "}
            {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </Text>
        )}
      </View>
    </>
  );
}
