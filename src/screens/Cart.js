import { View, Image, Pressable } from "react-native";
import { API } from "../context/API";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { Button, Text } from "react-native-paper";
import { useCart } from "../context/CartContext";
import { Entypo } from "@expo/vector-icons";
import Header from "../components/Header";
import LottieView from "lottie-react-native";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Cart({ navigation }) {
  const { cart, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  let totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
  const stripe = useStripe();

  const vendors = [];
  cart.forEach((item) => {
    vendors.push({
      vendor_id: item.seller,
      amount: item.price,
    });
  });

  // callbacks
  const openModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const bottomSheetRef = useRef(1);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleBuy = async () => {
    try {
      const { data } = await axios.post(`${API}/api/v1/create-payment-intent`, {
        amount: totalAmount,
        vendors: vendors,
      });
      const initSheet = await initPaymentSheet({
        paymentIntentClientSecret: data.payment_intent,
        merchantDisplayName: "Ecommerce",
      });
      if (initSheet.error) {
        console.log(initSheet.error);
        return;
      }

      const presentSheet = await presentPaymentSheet({
        clientSecret: data.payment_intent,
      });

      if (presentSheet.error) {
        console.log(presentSheet.error);
        return;
      }

      clearCart();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const submitPay = async () => {
    try {
      const { data } = await axios.post(
        `${API}/api/v1/create-payment-intent`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const clientSecret = data.client_secret;

      if (!stripe) return;

      const result = await stripe.confirmPayment(clientSecret, {
        payment_method: {},
      });
    } catch (error) {}
  };

  return (
    <>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <BottomSheetModalProvider>
          <Header title={"Cart"} />
          {cart.length !== 0 ? (
            cart.map((item) => (
              <>
                <Pressable
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                  key={item.id}
                  onPress={() =>
                    navigation.navigate("ProductDetails", { item: item })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
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
                    </View>
                  </View>
                  <Button onPress={() => removeFromCart(item)}>
                    <Entypo name="trash" size={24} color="white" />
                  </Button>
                </Pressable>
                {cart.length !== 0 && (
                  <View>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        textAlign: "right",
                      }}
                    >
                      Total: PKR {totalAmount}
                      /=
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Button
                    mode="contained"
                    textColor="#333"
                    style={{
                      width: 200,
                    }}
                    onPress={handleBuy}
                  >
                    Checkout
                  </Button>
                </View>
              </>
            ))
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30%",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Cart is empty
              </Text>
              <LottieView
                autoPlay
                loop
                source={require("../../assets/empty-cart.json")}
                style={{
                  width: 400,
                  height: 300,
                }}
              />
              <Button
                mode="outlined"
                style={{
                  marginTop: 20,
                }}
                onPress={() => navigation.navigate("AllProducts")}
              >
                Explore Products
              </Button>
            </View>
          )}
          <BottomSheetModal
            ref={bottomSheetRef}
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
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "black",
                }}
              >
                Place order
              </Text>
              <CardField
                postalCodeEnabled={true}
                placeholder={{
                  number: "4242 4242 4242 4242",
                }}
                cardStyle={{
                  backgroundColor: "#FFFFFF",
                  textColor: "#000000",
                }}
                style={{
                  width: "100%",
                  height: 50,
                  marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                  console.log("cardDetails", cardDetails);
                }}
                onFocus={(focusedField) => {
                  console.log("focusField", focusedField);
                }}
              />
              <Button mode="contained" onPress={handleBuy}>
                Pay
              </Button>
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}
