import { View } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { Text, Modal, Button, TextInput } from "react-native-paper";
import { useAuthContext } from "../context/AuthContext";

export default function Dashboard({ navigation }) {
  const { user, bankDetails } = useAuthContext();
  console.log(bankDetails);
  return (
    <View>
      <Header title="Dashboard" />
      <View
        style={{
          marginTop: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Dashboard</Text>
        {user.stripe_account_id ? (
          <Text>Account ID: {user.stripe_account_id}</Text>
        ) : (
          <Button
            onPress={() => navigation.navigate("SetupBank")}
            mode="contained"
            style={{
              width: 300,
              marginTop: 20,
            }}
          >
            Setup account to recieve payments
          </Button>
        )}
      </View>
    </View>
  );
}
