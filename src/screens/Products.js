import { Pressable, View, Keyboard } from "react-native";
import { useState } from "react";
import { IconButton, Text, Searchbar } from "react-native-paper";
import Header from "../components/Header";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setSelectedFilters] = useState([]);
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
          onChangeText={(query) => setSearchQuery(query)}
          style={{
            marginRight: 20,
            marginTop: 20,
          }}
        />
      </Pressable>
    </Pressable>
  );
}
