import { View, Pressable, Keyboard, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Divider, Text } from "react-native-paper";
import Header from "../components/Header";
import OtpTextInput from "../components/OtpTextInput";
import { useAuthContext } from "../context/AuthContext";

export default function BecomeSeller() {
  const { user, generateOtp, verifyOtp, success, loading, error, clearError } =
    useAuthContext();
  const [otp, setOtp] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const [otpSent, setOtpSent] = useState(true);
  const [otpResend, setOtpResend] = useState(60);

  useEffect(() => {
    const timer =
      otpResend > 0 && setInterval(() => setOtpResend(otpResend - 1), 1000);
    return () => clearInterval(timer);
  }, [otpResend]);

  const MAX_CODE_LENGTH = 4;
  const handleVerify = () => {
    verifyOtp(otp);
  };
  const handleGenerateOtp = () => {
    generateOtp(user.email);
    if (success === true) {
      setOtpSent(true);
    }
    if (error) {
      Alert.alert("Error", error, [{ text: "OK", onPress: clearError }]);
    }
  };

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
            onPress={handleGenerateOtp}
            disabled={loading}
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
                disabled={!pinReady || loading}
                onPress={handleVerify}
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
        <View
          style={{
            marginTop: 70,
            borderTopColor: "#fff",
            borderTopWidth: 1,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 20,
              marginTop: 20,
            }}
            variant="bodyLarge"
          >
            Didn't recieve OTP?
          </Text>
          <Button
            onPress={() => navigation.openDrawer()}
            disabled={otpResend > 0}
            mode="outlined"
          >
            <Text>Resend OTP {otpResend > 0 ? `(${otpResend})` : ""}</Text>
          </Button>
        </View>
      </View>
    </Pressable>
  );
}
