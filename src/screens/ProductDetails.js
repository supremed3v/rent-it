import { Image, TouchableOpacity, View, Alert } from "react-native";
import React, { useState, useMemo, useCallback, useRef } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { Text, Button, Divider, Snackbar } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../context/CartContext";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function ProductDetails({ route, navigation }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const { item } = route.params;
  const [tab, setTab] = useState("description");
  const { cart, addToCart } = useCart();
  console.log(cart);
  const addItemToCart = (prod) => {
    if (cart.find((item) => item._id === prod._id)) {
      return Alert.alert("Item already in cart");
    }
    addToCart(prod);
    openModal();
    handleDismissModalPress();
  };

  const onDismissSnackBar = () => setVisible(false);

  // callbacks
  const openModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const bottomSheetModalRef = useRef(1);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss() && setOpen(false);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          marginLeft: 20,
          marginRight: 20,
        }}
        key={item._id}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.images[0].url }}
            style={{
              width: 100,
              height: 100,
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
                color: "#000",
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
                color: "#000",
              }}
            >
              PKR {item.price} /-
            </Text>
          </View>
        </View>
      </View>
    );
  };
  console.log({ item });
  return (
    <>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <BottomSheetModalProvider>
          <SafeAreaView />
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
                marginRight: 20,
                marginLeft: 20,
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color="#e7e7e7e7" />
              </TouchableOpacity>
              <Text variant="displaySmall">{item.name}</Text>
              <AntDesign name="heart" size={24} color="#e7e7e7e7" />
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                source={{ uri: item.images[0].url }}
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
          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: "white",
            }}
            horizontalInset={true}
            leftInset={true}
          />
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
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enableHandlePanningGesture={true}
            enablePanDownToClose={true}
          >
            <View
              style={{
                backgroundColor: "#e7e7e7e7",
                height: 300,
                flex: 1,
              }}
            >
              <BottomSheetFlatList
                data={cart}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                ListFooterComponent={
                  <>
                    <Divider />
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      Total:{" "}
                      {cart.reduce((a, c) => a + c.price * c.quantity, 0)}{" "}
                    </Text>
                    <Button
                      mode="outlined"
                      dark={false}
                      style={{
                        color: "black",
                        marginTop: 20,
                        width: "90%",
                        marginLeft: 20,
                        backgroundColor: "#000",
                        marginBottom: 20,
                      }}
                      onPress={() => {
                        bottomSheetModalRef.current?.close();
                        navigation.navigate("Cart");
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Go to cart
                      </Text>
                    </Button>
                  </>
                }
              />
              <></>
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}
