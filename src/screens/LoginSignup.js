import { View } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Divider,
  SegmentedButtons,
  Text,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginSignup() {
  const [value, setValue] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <SafeAreaView />
      <Text
        variant="displayLarge"
        style={{
          textAlign: "center",
        }}
      >
        Login Signup
      </Text>
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
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "login",
            label: "Login",
          },
          {
            value: "signup",
            label: "Signup",
          },
        ]}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <TextInput
          value={email}
          onChange={(text) => setEmail(text)}
          label="Enter your email"
          mode="outlined"
          style={{
            width: 300,
          }}
          placeholder="Enter email address"
        />
        <TextInput
          value={password}
          onChange={(text) => setPassword(text)}
          label="Enter your password"
          mode="outlined"
          style={{
            width: 300,
            marginTop: 20,
            marginBottom: 20,
          }}
          placeholder="Enter your password"
        />
        <Button
          mode="outlined"
          dark={true}
          style={{
            width: 150,
            backgroundColor: "#fff",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#000",
              fontWeight: "600",
            }}
          >
            Login
          </Text>
        </Button>
      </View>
    </>
  );
}
