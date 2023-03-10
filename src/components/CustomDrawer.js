import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import React from "react";
import { Button, Divider, Text } from "react-native-paper";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useAuthContext } from "../context/AuthContext";

export default function CustomDrawer(props) {
  const { user, logout, loadUser, loading } = useAuthContext();
  const handleLogout = () => {
    logout();
    props.navigation.navigate("LoginSignup");
  };

  React.useEffect(() => {
    loadUser();
  }, []);

  const routeCheck = () => {
    if (
      user.role === "pending" &&
      !user.verifySellerImage &&
      !user.verifySellerIdCard
    ) {
      props.navigation.navigate("IDVerification");
    } else if (
      user.role === "pending" &&
      user.verifySellerImage &&
      !user.verifySellerIdCard
    ) {
      props.navigation.navigate("IDVerification");
    } else if (user.role === "user") {
      props.navigation.navigate("BecomeSeller");
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={
          {
            //   backgroundColor: "red",
          }
        }
      >
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80",
          }}
          style={{
            width: "100%",
            height: 200,
            marginBottom: 20,
          }}
          resizeMode="cover"
        >
          <Image
            source={{
              uri: user?.avatar?.url,
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignSelf: "center",
              marginTop: 20,
              borderWidth: 2,
              borderColor: "#fff",
            }}
          />
          <Text
            style={{
              alignSelf: "center",
              marginTop: 20,
            }}
            variant="displaySmall"
          >
            {user?.name}
          </Text>
        </ImageBackground>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          padding: 20,
          borderTopColor: "#ccc",
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={handleLogout}
        >
          <AntDesign name="logout" size={24} color="#fff" />
          <Text
            style={{
              marginLeft: 15,
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      {user.role === "user" ||
        (user.role === "pending" &&
        !user.verifySellerImage &&
        !user.verifySellerIdCard ? (
          <View
            style={{
              padding: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                routeCheck();
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <FontAwesome5 name="user-check" size={24} color="#fff" />
              <Text
                style={{
                  marginLeft: 15,
                }}
              >
                Become a seller
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              padding: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                routeCheck();
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <FontAwesome5 name="user-check" size={24} color="#fff" />
              <Text
                style={{
                  marginLeft: 15,
                }}
              >
                {user.role === "pending" ? "Status Pending" : "Seller Account"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
}
