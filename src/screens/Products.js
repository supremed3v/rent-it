import { Pressable, View, Keyboard } from "react-native";
import { useState } from "react";
import { IconButton, Text, Searchbar } from "react-native-paper";
import Header from "../components/Header";
import { useProductContext } from "../context/ProductsContext";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setSelectedFilters] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const { rentedProducts, products } = useProductContext();

  const handleFilter = (filter) => {
    if (filters.includes(filter)) {
      setSelectedFilters(filters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...filters, filter]);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      setSearchProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setSearchProducts([]);
    }
  };
  console.log("Products", products);
  console.log(searchProducts);

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <Header title="Search Products" />
      <Pressable
        style={{
          marginTop: 20,
          marginLeft: 20,
        }}
        onPress={Keyboard.dismiss}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton
            mode="contained"
            icon={"filter"}
            style={{
              width: 50,
              backgroundColor: "#e32f45",
            }}
          />

          <IconButton
            mode="contained"
            icon={"cancel"}
            style={{
              width: 50,
            }}
            disabled={filters.length === 0}
          />
        </View>

        <Searchbar
          placeholder="Search Product to Rent"
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
          style={{
            marginRight: 20,
            marginTop: 20,
          }}
        />
      </Pressable>
      <View style={{ marginTop: 20 }}>
        {searchProducts.length > 0 ? (
          searchProducts.map((product) => (
            <Text key={product._id}>{product.name}</Text>
          ))
        ) : (
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Search Products
          </Text>
        )}
      </View>
    </Pressable>
  );
}
