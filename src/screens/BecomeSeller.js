import { View, Pressable, Keyboard } from "react-native";
import React, { useState } from "react";
import { Button, Text } from "react-native-paper";
import Header from "../components/Header";
import OtpTextInput from "../components/OtpTextInput";

export default function BecomeSeller() {
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const MAX_CODE_LENGTH = 5;
  return (
    <Pressable onPress={Keyboard.dismiss}>
      <Header title={"Hi Seller!"} />
      <Text>Generate OTP (check your email)</Text>
      <OtpTextInput
        setPinReady={setPinReady}
        code={code}
        setCode={setCode}
        maxLength={MAX_CODE_LENGTH}
      />
      <View>
        <Button
          mode="contained"
          // dark={true}
          style={{
            width: "60%",
          }}
          disabled={!pinReady}
        >
          <Text
            style={{
              color: !pinReady ? "#fff" : "#000",
            }}
          >
            {pinReady ? "Verify" : "Enter OTP"}
          </Text>
        </Button>
      </View>
    </Pressable>
  );
}
