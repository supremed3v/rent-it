import { View, StyleSheet, FlatList, Image } from "react-native";
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
import * as ImagePicker from "expo-image-picker";

export default function AddProduct() {
  const [visible, setVisible] = useState(false);
  const { categories, addProduct } = useProductContext();
  const [value, setValue] = useState(null);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const containerStyle = {
    backgroundColor: "#fff",
    width: 300,
    height: 500,
    justifyContent: "center",
    marginLeft: 10,
    borderRadius: 20,
  };
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      base64: true,
      allowsEditing: false,
    });
    if (!result.canceled) {
      setImages(result.assets.map((item) => item.base64));
      setImagePreview(result.assets.map((item) => item.uri));
    }
  };

  const imagesArray = [];

  for (let i = 0; i < images.length; i++) {
    imagesArray.push(`data:image/jpg;base64,${images[i]}`);
  }

  const handleAddProduct = () => {
    const product = {
      name,
      price,
      description,
      category: value,
      images: imagesArray,
    };
    addProduct(product);
  };

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
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.textField}
            mode="outlined"
            label="Enter product price"
            value={price}
            onChangeText={(num) => setPrice(num)}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.textField}
            mode="outlined"
            label="Enter product description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
          />
          {value === null ? (
            <Button
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
              mode="contained"
              onPress={showModal}
              dark={true}
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
                dark={true}
              >
                Change Category
              </Button>
            </>
          )}
          <Button mode="contained" icon={"camera"} onPress={pickImages}>
            {imagePreview === null ? "Select Images" : "Change Images"}
          </Button>
          <FlatList
            data={imagePreview}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View>
                <Image
                  source={{ uri: item }}
                  style={{
                    width: 100,
                    height: 100,
                    margin: 10,
                    borderRadius: 10,
                    padding: 10,
                  }}
                />
              </View>
            )}
            horizontal={true}
          />
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
          <Button
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
            mode="contained"
            onPress={handleAddProduct}
            dark={true}
          >
            Add Product
          </Button>
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
