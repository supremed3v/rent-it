import { View, StyleSheet } from "react-native";
import React from "react";
import { Button, Text, TextInput } from "react-native-paper";
import Header from "../components/Header";

export default function AddProduct() {
  return (
    <View>
      <Header title={"Add Product"} />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={styles.textField}
          mode="outlined"
          label="Enter product name"
        />
        <TextInput
          style={styles.textField}
          mode="outlined"
          label="Enter product price"
        />
        <TextInput
          style={styles.textField}
          mode="outlined"
          label="Enter product description"
        />
        <Button
          style={{
            marginTop: 10,
            marginBottom: 10,
          }}
          mode="contained"
        >
          Select Category
        </Button>
        <Button mode="contained" icon={"camera"}>
          Select Images
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textField: {
    width: 300,
    marginTop: 10,
    marginBottom: 10,
  },
});
