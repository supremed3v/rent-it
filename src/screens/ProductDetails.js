import { Image, View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { useTheme, Text, Button, Divider } from "react-native-paper";
import { AirbnbRating, Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetails({ route, navigation }) {
  const { item } = route.params;
  const [tab, setTab] = useState("");
  console.log(tab);
  return (
    <>
      <SafeAreaView />
      <View>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginTop: 20,
            marginBottom: 20,
            marginRight: 20,
          }}
        >
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
              <Button mode="outlined">Add to Cart</Button>
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
          mode="text"
          style={{
            // fontSize: 20,
            fontWeight: "medium",
            marginLeft: 20,
            marginTop: 20,
            borderBottomColor: tab === "description" ? "white" : "transparent",
            borderBottomWidth: 2,
            backgroundColor: tab === "description" ? "black" : "",
          }}
          onPress={() => setTab("description")}
          dark={true}
        >
          Description
        </Button>
        <Button
          mode="text"
          style={{
            fontWeight: "medium",
            marginLeft: 20,
            marginTop: 20,
            borderBottomColor: tab === "reviews" ? "black" : "transparent",
            borderBottomWidth: 2,
            backgroundColor: tab === "reviews" ? "black" : "",
          }}
          onPress={() => setTab("reviews")}
        >
          Shipping Info
        </Button>
        <Button
          mode="text"
          style={{
            fontWeight: "medium",
            marginLeft: 20,
            marginTop: 20,
            borderBottomColor: tab === "reviews" ? "black" : "transparent",
            borderBottomWidth: 2,
            backgroundColor: tab === "payment" ? "black" : "",
          }}
          onPress={() => setTab("payment")}
          dark={true}
        >
          Payment Options
        </Button>
      </View>
      <Divider />
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
