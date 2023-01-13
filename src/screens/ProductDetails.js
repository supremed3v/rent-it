import { Image, TouchableOpacity, View, Alert } from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { useTheme, Text, Button, Divider, Snackbar } from "react-native-paper";
import { AirbnbRating, Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../context/CartContext";

export default function ProductDetails({ route, navigation }) {
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  const { item } = route.params;
  const [tab, setTab] = useState("description");
  const { cart, addToCart } = useCart();
  console.log(cart);
  const addItemToCart = (prod) => {
    if (cart.find((item) => item.id === prod.id)) {
      return Alert.alert("Item already in cart");
    }
    addToCart(prod);
    onToggleSnackBar();
  };

  return (
    <>
      <SafeAreaView />
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            marginBottom: 20,
            marginRight: 20,
            marginLeft: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="#e7e7e7e7" />
          </TouchableOpacity>
          <AntDesign name="heart" size={24} color="#e7e7e7e7" />
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 20,
            }}
          />
          <View
            style={{
              marginLeft: 20,
            }}
          >
            <Text
              variant="bodyLarge"
              style={{
                fontSize: 20,
                fontWeight: "medium",
              }}
            >
              {item.name}
            </Text>
            <Text
              variant=""
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              PKR {item.price} /-
            </Text>
            <View
              style={{
                // marginLeft: -30,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AirbnbRating
                count={5}
                defaultRating={Math.floor(item.rating)}
                size={14}
                showRating={false}
                isDisabled={true}
              />
              <Text variant="labelSmall">({item.numOfReviews})</Text>
            </View>
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Button mode="outlined" onPress={() => addItemToCart(item)}>
                Add to Cart
              </Button>
            </View>
            <Button mode="contained">Buy Now</Button>
          </View>
        </View>
      </View>
      <Divider />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 20,
          marginLeft: -10,
        }}
      >
        <Button
          mode={tab === "description" ? "contained" : "text"}
          style={{
            // fontSize: 20,
            fontWeight: "medium",
            marginLeft: 20,
            marginTop: 20,
          }}
          onPress={() => setTab("description")}
        >
          Description
        </Button>
        <Button
          mode={tab === "reviews" ? "contained" : "text"}
          style={{
            fontWeight: "medium",
            marginLeft: 20,
            marginTop: 20,
          }}
          onPress={() => setTab("reviews")}
        >
          Shipping Info
        </Button>
        <Button
          mode={tab === "payment" ? "contained" : "text"}
          style={{
            fontWeight: "medium",
            marginLeft: 20,
            marginTop: 20,
          }}
          onPress={() => setTab("payment")}
        >
          Payment Options
        </Button>
      </View>
      <Divider />
      <View>
        {tab === "description" ? (
          <Text>Description Text</Text>
        ) : tab === "reviews" ? (
          <Text>Shipping Info Text</Text>
        ) : tab === "payment" ? (
          <Text>Payment Options Text</Text>
        ) : (
          <Text>Description Text</Text>
        )}
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "X",
          onPress: () => {
            setVisible(false);
          },
        }}
      >
        Item Added to Cart
      </Snackbar>
    </>
  );
}

{
  /* <Text>{item.name}</Text>
<Button mode="elevated" onPress={() => navigation.goBack()}>
  go back
</Button>
*/
}