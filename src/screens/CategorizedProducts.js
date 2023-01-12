import { View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { productsData } from "../../assets/data";

export default function CategorizedProducts({ route }) {
  const { category } = route.params;
  console.log(category);

  const filteredProducts = productsData.filter((product) => {
    return product.category === category;
  });

  console.log(filteredProducts);

  return (
    <View>
      {filteredProducts && filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Text key={product.id}>{product.name}</Text>
        ))
      ) : (
        <Text>No products found</Text>
      )}
    </View>
  );
}
