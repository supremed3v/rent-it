import { View, FlatList } from "react-native";
import React from "react";
import { Text, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductsCategory from "../components/ProductsCategory";
import { useProductContext } from "../context/ProductsContext";
import Header from "../components/Header";

export default function AllProducts() {
  const { categoriesDetails } = useProductContext();

  const renderItem = ({ item }) => <ProductsCategory item={item} />;

  return (
    <View>
      {/* Grid view for categories button */}
      <FlatList
        data={categoriesDetails}
        renderItem={renderItem}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item) => item._id}
        horizontal={false}
        ListHeaderComponent={<Header title={"Categories"} />}
      />
    </View>
  );
}
