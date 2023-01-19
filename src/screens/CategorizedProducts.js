import { FlatList, SafeAreaView, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { productsData } from "../../assets/data";
import ProductCard from "../components/ProductCard";

export default function CategorizedProducts({ route }) {
  const { category } = route.params;
  console.log(category);

  const filteredProducts = productsData.filter((product) => {
    return product.category === category;
  });

  const renderItem = ({ item }) => <ProductCard item={item} />;

  return (
    <View
      style={{
        flex: 1,
        marginTop: 50,
      }}
    >
      <SafeAreaView />
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={
          <Text
            variant="displayLarge"
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Products: {filteredProducts.length}
          </Text>
        }
        ListEmptyComponent={
          <Text
            variant="bodyLarge"
            style={{
              textAlign: "center",
              marginTop: 20,
            }}
          >
            No products found
          </Text>
        }
      />
    </View>
  );
}
