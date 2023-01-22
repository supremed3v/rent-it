import React, { useState, useEffect } from "react";
import { Modal, TouchableOpacity, View, Image } from "react-native";
import { Camera } from "expo-camera";
import { Button, SegmentedButtons, Text } from "react-native-paper";
import Header from "../components/Header";
const CameraModule = (props) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        props.setModalVisible();
      }}
    >
      <Camera
        style={{ flex: 1 }}
        ratio="16:9"
        flashMode={Camera.Constants.FlashMode.off}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "black",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              icon="close"
              style={{ marginLeft: 12 }}
              mode="outlined"
              color="white"
              onPress={() => {
                props.setModalVisible();
              }}
            >
              Close
            </Button>
            <TouchableOpacity
              onPress={async () => {
                if (cameraRef) {
                  let photo = await cameraRef.takePictureAsync({
                    base64: true,
                  });
                  props.setImage(photo);
                  props.setModalVisible();
                  props.setBase64Image(photo.base64);
                }
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: "white",
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 16,
                  marginTop: 16,
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: "white",
                    height: 40,
                    width: 40,
                    backgroundColor: "white",
                  }}
                ></View>
              </View>
            </TouchableOpacity>
            <Button
              icon="axis-z-rotate-clockwise"
              style={{ marginRight: 12 }}
              mode="outlined"
              color="white"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              {type === Camera.Constants.Type.back ? "Front" : "Back "}
            </Button>
          </View>
        </View>
      </Camera>
    </Modal>
  );
};

const CardVerification = (props) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        props.setModalVisible();
      }}
    >
      <Camera
        style={{ flex: 1 }}
        ratio="16:9"
        flashMode={Camera.Constants.FlashMode.off}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "black",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              icon="close"
              style={{ marginLeft: 12 }}
              mode="outlined"
              color="white"
              onPress={() => {
                props.setModalVisible();
              }}
            >
              Close
            </Button>
            <TouchableOpacity
              onPress={async () => {
                if (cameraRef) {
                  let photo = await cameraRef.takePictureAsync({
                    base64: true,
                  });
                  props.setCardImage(photo);
                  props.setModalVisible();
                  props.setBase64Card(photo);
                }
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: "white",
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 16,
                  marginTop: 16,
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: "white",
                    height: 40,
                    width: 40,
                    backgroundColor: "white",
                  }}
                ></View>
              </View>
            </TouchableOpacity>
            <Button
              icon="axis-z-rotate-clockwise"
              style={{ marginRight: 12 }}
              mode="outlined"
              color="white"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              {type === Camera.Constants.Type.back ? "Front" : "Back "}
            </Button>
          </View>
        </View>
      </Camera>
    </Modal>
  );
};

export default function IDVerification() {
  const [image, setImage] = useState(null);
  const [cardImage, setCardImage] = useState(null);
  const [camera, setShowCamera] = useState(false);
  const [openSecondCamera, setOpenSecondCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [base64Card, setBase64Card] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [value, setValue] = useState("ID");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      <Header title={"Verification"} />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <SegmentedButtons
          style={{ width: "80%", paddingVertical: 8 }}
          buttons={[
            {
              value: "ID",
              label: "Face",
            },
            {
              value: "signup",
              label: "ID Card",
            },
          ]}
          value={value}
          onValueChange={(value) => setValue(value)}
        />
        {value === "ID" && (
          <>
            <Text
              style={{
                marginTop: 16,
                marginBottom: 8,
                width: "80%",
              }}
              variant="bodyLarge"
            >
              Please take a picture of your face. Make sure your face is clearly
              visible.
            </Text>
            <View
              style={{
                backgroundColor: "#fff",
                width: 120,
                height: 120,
                borderRadius: 100,
                marginBottom: 8,
                marginTop: 50,
              }}
            >
              <Image
                source={{ uri: image }}
                style={{ width: 120, height: 120, borderRadius: 100 }}
              />
            </View>
            <Button
              style={{ width: "30%", marginTop: 16 }}
              icon="camera"
              mode="contained"
              onPress={() => {
                setShowCamera(true);
              }}
            >
              Camera
            </Button>
            {camera && (
              <CameraModule
                showModal={camera}
                setModalVisible={() => setShowCamera(false)}
                setImage={(result) => setImage(result.uri)}
                setBase64Image={(result) => {
                  setBase64Image(result.base64);
                }}
              />
            )}
          </>
        )}

        {value === "signup" && (
          <>
            <Text
              style={{
                marginTop: 16,
                marginBottom: 8,
                width: "80%",
              }}
              variant="bodyLarge"
            >
              Please take a picture of your National ID Card. Make sure your it
              is clearly visible.
            </Text>

            <View
              style={{
                backgroundColor: "#fff",
                width: 120,
                height: 120,
                borderRadius: 100,
                marginBottom: 8,
                marginTop: 50,
              }}
            >
              <Image
                source={{ uri: cardImage }}
                style={{ width: 120, height: 120, borderRadius: 100 }}
              />
            </View>
            <Button
              style={{ width: "30%", marginTop: 16 }}
              icon="camera"
              mode="contained"
              onPress={() => {
                setOpenSecondCamera(true);
              }}
            >
              Camera
            </Button>
            {openSecondCamera && (
              <CardVerification
                showModal={openSecondCamera}
                setModalVisible={() => setOpenSecondCamera(false)}
                setCardImage={(result) =>
                  setCardImage(result.uri) && setBase64Card(result.base64)
                }
                setBase64Card={(result) => {
                  setBase64Card(result.base64);
                }}
              />
            )}
          </>
        )}
        <Button
          mode="contained"
          disabled={value === "ID" ? !image : !cardImage}
          style={{
            marginTop: 16,
          }}
        >
          Submit
        </Button>
      </View>
    </>
  );
}
