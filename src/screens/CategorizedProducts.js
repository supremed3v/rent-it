import { FlatList, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import ProductCard from "../components/ProductCard";
import { API } from "../context/ProductsContext";
import axios from "axios";
import Header from "../components/Header";

export default function CategorizedProducts({ route }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { category } = route.params;

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/v1/getCategoriesProducts/${category}`
      );
      setFilteredProducts(data.products);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
        ListHeaderComponent={<Header title={"Products"} />}
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
