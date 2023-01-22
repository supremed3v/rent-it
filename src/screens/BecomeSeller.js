import { View, Pressable, Keyboard } from "react-native";
import React, { useState } from "react";
import { Button, Text } from "react-native-paper";
import Header from "../components/Header";
import OtpTextInput from "../components/OtpTextInput";

export default function BecomeSeller() {
  const [otp, setOtp] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const MAX_CODE_LENGTH = 5;
  return (
    <Pressable onPress={Keyboard.dismiss}>
      <Header title={"Hi Seller!"} />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Text variant="bodyLarge">Generate OTP (check your email)</Text>
        {otpSent === false ? (
          <Button
            style={{
              width: "60%",
              marginTop: 20,
            }}
            mode="outlined"
            onPress={() => setOtpSent(true)}
          >
            <Text>Generate OTP</Text>
          </Button>
        ) : (
          <>
            <OtpTextInput
              setPinReady={setPinReady}
              otp={otp}
              setOtp={setOtp}
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
                    color: !pinReady ? "#fff" : "#777",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  {pinReady ? "Verify" : "Enter OTP"}
                </Text>
              </Button>
            </View>
          </>
        )}
      </View>
    </Pressable>
  );
}
