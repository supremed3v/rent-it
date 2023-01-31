import { FlatList, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import ProductCard from "../components/ProductCard";
import { API } from "../context/ProductsContext";
import axios from "axios";
import Header from "../components/Header";
import EmptyData from "../components/EmptyData";
import Loader from "../components/Loader";

export default function CategorizedProducts({ route }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = route.params;

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API}/api/v1/getCategoriesProducts/${category}`
      );
      setFilteredProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({ item }) => <ProductCard item={item} />;

  return (
    <View>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        ListHeaderComponent={<Header title={"Products"} />}
        ListEmptyComponent={
          <EmptyData errorText={`No products in ${category}`} />
        }
      />
      {/* {loading ? <Loader /> : null} */}
    </View>
  );
}
