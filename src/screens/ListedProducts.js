import { View } from "react-native";
import React, { useEffect } from "react";
import { Text } from "react-native-paper";
import Header from "../components/Header";
import { useProductContext } from "../context/ProductsContext";
import { useAuthContext } from "../context/AuthContext";

export default function ListedProducts() {
  const { sellerProducts, rentedProducts, nonApprovedProducts } =
    useProductContext();

  useEffect(() => {
    sellerProducts();
  }, []);

  return (
    <View>
      <Header title={"Your Products"} />
      {rentedProducts.length > 0 ? (
        <Text>Rented Products available</Text>
      ) : (
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
          }}
        >
          No Rented Products available
        </Text>
      )}
      {nonApprovedProducts.length > 0 ? (
        <View>
          <Text>Non Approved Products available</Text>
        </View>
      ) : (
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
          }}
        >
          No Non Approved Products available
        </Text>
      )}
    </View>
  );
}
