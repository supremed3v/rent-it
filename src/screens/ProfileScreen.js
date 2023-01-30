import { View, Image } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { Button, Text, TextInput, Modal, Portal } from "react-native-paper";
import { useAuthContext } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import Loader from "../components/Loader";

export default function ProfileScreen() {
  const { user, loading } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);
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
      <Portal>
        <Modal
          visible={openModal}
          onDismiss={() => setOpenModal(false)}
          contentContainerStyle={{
            height: 400,
            backgroundColor: "#222",
            width: 350,
            justifyContent: "center",
            alignItems: "center",
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Update your password</Text>
          <TextInput
            label="Enter your current password"
            style={{
              margin: 10,
              width: 300,
            }}
            mode="outlined"
            onChangeText={(text) => setOldPassword(text)}
            value={oldPassword}
            autoCapitalize="none"
          />

          <TextInput
            label="Enter your new password"
            style={{
              margin: 10,
              width: 300,
            }}
            mode="outlined"
            onChangeText={(text) => setPassword(text)}
            value={password}
            autoCapitalize="none"
          />

          <TextInput
            label="Confirm new password"
            style={{
              margin: 10,
              width: 300,
            }}
            mode="outlined"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            autoCapitalize="none"
          />
          <Button
            mode="contained"
            style={{
              margin: 10,
              marginTop: 20,
              width: 250,
            }}
            dark={true}
            disabled={
              password === "" || oldPassword === "" || confirmPassword === ""
            }
          >
            Update Password
          </Button>
        </Modal>
      </Portal>
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
          onPress={pickImage}
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
          onPress={() => setOpenModal(true)}
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
          disabled={name === "" || email === "" || avatar === null}
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
      {loading && <Loader />}
    </View>
  );
}
