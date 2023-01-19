import { Alert, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  SegmentedButtons,
  Text,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../context/AuthContext";

export default function LoginSignup({ navigation }) {
  const [value, setValue] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated, error } = useAuthContext();

  const handleLogin = () => {
    const myForm = {
      email,
      password,
    };
    login(myForm);
  };
  console.log(error, isAuthenticated);

  useEffect(() => {
    if (error) {
      Alert.alert(error);
    }

    if (isAuthenticated === true) {
      navigation.navigate("HomeTab");
    }
  }, [isAuthenticated, error]);

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
          onChangeText={(text) => setEmail(text)}
          label="Enter your email"
          mode="outlined"
          style={{
            width: 300,
          }}
          placeholder="Enter email address"
          autoCapitalize={false}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          label="Enter your password"
          mode="outlined"
          style={{
            width: 300,
            marginTop: 20,
            marginBottom: 20,
          }}
          placeholder="Enter your password"
          secureTextEntry={true}
        />
        <Button
          mode="outlined"
          dark={true}
          style={{
            width: 150,
            backgroundColor: "#fff",
          }}
          onPress={handleLogin}
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
