import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import React from "react";
import { Button, Text } from "react-native-paper";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { AntDesign } from "@expo/vector-icons";
import { useAuthContext } from "../context/AuthContext";

export default function CustomDrawer(props) {
  const { user } = useAuthContext();
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
          }}
          resizeMode="cover"
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
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
            {user.name}
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
    </View>
  );
}
