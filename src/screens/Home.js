import { View, ScrollView, Image, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useTheme, Text, Divider, Button } from "react-native-paper";
import { productsData } from "../../assets/data";
import ProductCard from "../components/ProductCard";
import { useProductContext } from "../context/ProductsContext";
import { useAuthContext } from "../context/AuthContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
  const theme = useTheme();
  const { user } = useAuthContext();

  const { categories, error } = useProductContext();
  console.log("Categories:", categories);
  console.log("Error:", error);
  const header = () => {
    return (
      <ScrollView
        style={{
          backgroundColor: theme.dark ? theme.colors.background : "#fff",
          paddingLeft: 15,
          paddingRight: 15,
          marginTop: 20,
        }}
      >
        <View>
          <Text
            variant="displayMedium"
            style={{
              width: "100%",
              position: "absolute",
              top: 100,
              zIndex: 1,
              color: "#000",
              backgroundColor: "#e7e7e7e7",
              opacity: 0.7,
              textAlign: "center",
            }}
          >
            Rent everything you need!
          </Text>
        </View>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1483181957632-8bda974cbc91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 200,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
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
      </ScrollView>
    );
  };

  const footer = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 100,
          flex: 1,
        }}
      >
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("AllProducts")}
        >
          BROWSE ALL PRODUCTS
        </Button>
      </View>
    );
  };

  const renderItem = ({ item }) => <ProductCard item={item} />;
  return (
    <View>
      <FlatList
        data={productsData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
      />
    </View>
  );
}
