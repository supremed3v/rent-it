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
import * as ImagePicker from "expo-image-picker";

export default function LoginSignup({ navigation }) {
  const [value, setValue] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login, isAuthenticated, error, signUp, loading } = useAuthContext();
  const [image, setImage] = useState(null);

  const handleLogin = () => {
    const myForm = {
      email,
      password,
    };
    login(myForm);
  };

  const handleSignup = () => {
    const signupForm = {
      email,
      password,
      name,
      avatar: image,
    };
    signUp(signupForm);
  };

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      let base64 = `data:image/jpg;base64,${result.assets[0].base64}`;
      setImage(base64);
    }
  };
  useEffect(() => {
    if (error) {
      Alert.alert(error);
    }

    if (isAuthenticated === true) {
      navigation.navigate("Drawer");
    }
  }, [isAuthenticated, error]);
  console.log(error);

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
      {value === "login" ? (
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
            autoCapitalize="none"
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
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            label="Enter your name"
            mode="outlined"
            style={{
              width: 300,
            }}
            placeholder="Name"
            autoCapitalize={false}
          />
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
          {image === null && (
            <Button icon="camera" mode="contained" onPress={handleImagePicker}>
              Upload Picture
            </Button>
          )}
          <Button
            mode="contained"
            style={{
              marginTop: 10,
            }}
            onPress={handleSignup}
            disabled={loading === true}
          >
            Signup
          </Button>
        </View>
      )}
    </>
  );
}
