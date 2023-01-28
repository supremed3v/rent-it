import { View, Image } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { Button, Text, TextInput } from "react-native-paper";
import { useAuthContext } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleSubmitProfile = () => {
    const data = {
      name,
      email,
      avatar,
    };
  };

  const handleSubmitPassword = () => {
    const data = {
      password,
      confirmPassword,
      oldPassword,
    };
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsEditing: true,
      base64: true,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].base64);
      setPreview(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Header title={"Profile "} />
      <View
        style={{
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <TextInput
          label="Name"
          style={{
            margin: 10,
            width: 300,
          }}
          mode="outlined"
          onChangeText={(text) => setName(text)}
          defaultValue={user.name}
        />
        <TextInput
          label="Email"
          style={{
            margin: 10,
            width: 300,
          }}
          mode="outlined"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          defaultValue={user.email}
          autoCapitalize="none"
        />
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginTop: 20,
            marginBottom: 20,
          }}
          source={{
            uri: avatar === null ? user.avatar.url : preview,
          }}
        />
        <Button
          mode="outlined"
          style={{
            margin: 10,
          }}
        >
          <Text>Change Profile Picture</Text>
        </Button>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Button
          mode="outlined"
          style={{
            margin: 10,
          }}
        >
          <Text>Change Password</Text>
        </Button>

        <Button
          mode="contained"
          style={{
            margin: 10,
            marginTop: 20,
            width: 150,
          }}
          dark={true}
        >
          <Text
            style={{
              color: "#555",
              fontWeight: "bold",
            }}
          >
            Save
          </Text>
        </Button>
      </View>
    </View>
  );
}
