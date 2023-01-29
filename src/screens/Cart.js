import { View, Image, Pressable } from "react-native";
import React from "react";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../context/CartContext";
import { Entypo } from "@expo/vector-icons";
import Header from "../components/Header";

export default function Cart({ navigation }) {
  const { cart, removeFromCart } = useCart();
  return (
    <>
      <View>
        <Header title={"Cart"} />
        {cart.length !== 0 ? (
          cart.map((item) => (
            <>
              <Pressable
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
                  marginLeft: 20,
                  marginRight: 20,
                }}
                key={item.id}
                onPress={() =>
                  navigation.navigate("ProductDetails", { item: item })
                }
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
              </Pressable>
              {cart.length !== 0 && (
                <View>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  >
                    Total: PKR{" "}
                    {cart.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    )}
                    /=
                  </Text>
                </View>
              )}
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Button
                  mode="contained"
                  textColor="#333"
                  style={{
                    width: 200,
                  }}
                >
                  Confirm Order
                </Button>
              </View>
            </>
          ))
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50%",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Cart is empty
            </Text>
            <Button
              mode="outlined"
              style={{
                marginTop: 20,
              }}
              onPress={() => navigation.navigate("AllProducts")}
            >
              Explore Products
            </Button>
          </View>
        )}
      </View>
    </>
  );
}
