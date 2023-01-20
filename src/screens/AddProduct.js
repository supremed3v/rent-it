import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  Modal,
  Portal,
  Provider,
  RadioButton,
} from "react-native-paper";
import Header from "../components/Header";
import { useProductContext } from "../context/ProductsContext";

export default function AddProduct() {
  const [visible, setVisible] = useState(false);
  const { categories } = useProductContext();
  const [value, setValue] = useState(null);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "#fff",
    width: 300,
    height: 500,
    justifyContent: "center",
    marginLeft: 10,
    borderRadius: 20,
  };
  console.log(value);
  return (
    <Provider>
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
          {value === null ? (
            <Button
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
              mode="contained"
              onPress={showModal}
            >
              Select Category
            </Button>
          ) : (
            <>
              <Text variant="bodyLarge">{value}</Text>
              <Button
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}
                mode="contained"
                onPress={showModal}
              >
                Change Category
              </Button>
            </>
          )}
          <Button mode="contained" icon={"camera"}>
            Select Images
          </Button>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RadioButton.Group
                onValueChange={(newValue) => setValue(newValue)}
                value={value}
              >
                {categories &&
                  categories.map((category) => (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                      }}
                      key={category}
                    >
                      <Text variant="bodyLarge">{category}</Text>
                      <RadioButton value={category} />
                    </View>
                  ))}
              </RadioButton.Group>
            </Modal>
          </Portal>
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  textField: {
    width: 300,
    marginTop: 10,
    marginBottom: 10,
  },
});
