import { FlatList, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { productsData } from "../../assets/data";
import ProductCard from "../components/ProductCard";
import { API } from "../context/ProductsContext";
import axios from "axios";

export default function CategorizedProducts({ route }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { category } = route.params;
  console.log(category);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/getCategoriesProducts/${category}`
      );
      setFilteredProducts(data.products);
      console.log("data", data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(filteredProducts);

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
        keyExtractor={(item) => item._id}
        numColumns={2}
        ListHeaderComponent={
          <Text
            variant="displayLarge"
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {filteredProducts.length !== 0 && (
              <Text>Products: {filteredProducts.length}</Text>
            )}
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
