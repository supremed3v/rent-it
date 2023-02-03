import { View } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { Text, Modal, Button, TextInput } from "react-native-paper";
import { useAuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuthContext();
  const [visible, setVisible] = useState(false);
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
        {user.acc_id ? (
          <Text>Account ID: {user.acc_id}</Text>
        ) : (
          <Button
            onPress={() => setVisible(true)}
            mode="contained"
            style={{
              width: 300,
              marginTop: 20,
            }}
          >
            Setup account to recieve payments
          </Button>
        )}
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            margin: 20,
            borderRadius: 10,
            width: 300,
            height: 300,
          }}
        >
          <Text>Modal</Text>
        </Modal>
      </View>
    </View>
  );
}
