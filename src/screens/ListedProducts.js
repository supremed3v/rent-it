import { View } from "react-native";
import React, { useEffect } from "react";
import { Text } from "react-native-paper";
import Header from "../components/Header";
import { useProductContext } from "../context/ProductsContext";
import { useAuthContext } from "../context/AuthContext";

export default function ListedProducts() {
  const { sellerProducts, rentedProducts } = useProductContext();
  const { user, loginToken } = useAuthContext();

  useEffect(() => {
    if (user && loginToken) {
      sellerProducts(loginToken);
    }
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
    </View>
  );
}
