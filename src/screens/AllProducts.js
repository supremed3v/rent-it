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
      <SafeAreaView />
      {/* Grid view for categories button */}
      <FlatList
        data={categoriesDetails}
        renderItem={renderItem}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        horizontal={false}
        ListHeaderComponent={<Header title={"Categories"} />}
        ListFooterComponent={
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 100,
            }}
          ></View>
        }
      />
      <ProductsCategory />

      <Divider
        style={{
          marginTop: 20,
          marginBottom: 20,
          height: 2,
          backgroundColor: "#fff",
        }}
        bold={true}
        leftInset={true}
        horizontalInset={true}
      />
      <Text variant="displayMedium">Products</Text>
    </View>
  );
}
