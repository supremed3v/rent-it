import { View, Text, TextInput, Pressable } from "react-native";
import React, { useRef, useState, useEffect } from "react";

export default function OtpTextInput({ setPinReady, otp, setOtp, maxLength }) {
  const textInputRef = useRef(null);
  const codeDigitArray = new Array(maxLength).fill(0);
  const codeDigitInput = (_value, index) => {
    const emptyInputChar = " ";
    const digit = otp[index] || emptyInputChar;
    const isCurrentDigit = index === otp.length;
    const isLastDigit = index === maxLength - 1;
    const isInputFilled = otp.length === maxLength;
    const isDigitisFocused = isCurrentDigit || (isLastDigit && isInputFilled);
    const inputContainerFocused = isDigitisFocused;
    const styledOtpInput = inputContainerFocused ? "#d4af37" : "#777";
    return (
      <View
        style={{
          borderColor: styledOtpInput,
          minWidth: "15%",
          borderWidth: 2,
          borderRadius: 5,
          padding: 12,
          backgroundColor: styledOtpInput,
        }}
        key={index}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
            color: "#fff",
          }}
        >
          {digit}
        </Text>
      </View>
    );
  };
  const [inputContainerFocused, setInputContainerIsFocused] = useState(false);
  const handleOnBlur = () => {
    setInputContainerIsFocused(false);
  };
  const handleOnPress = () => {
    setInputContainerIsFocused(true);
    textInputRef?.current?.focus();
  };
  useEffect(() => {
    setPinReady(otp.length === maxLength);
    return () => {
      setPinReady(false);
    };
  }, [otp]);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 30,
      }}
    >
      <Pressable
        style={{
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
        onPress={handleOnPress}
      >
        {codeDigitArray.map(codeDigitInput)}
      </Pressable>
      <TextInput
        style={{
          position: "absolute",
          width: "70%",
          height: "100%",
          opacity: 0,
        }}
        value={otp}
        onChangeText={setOtp}
        maxLength={maxLength}
        returnKeyType="done"
        textContentType="oneTimeCode"
        ref={textInputRef}
        onBlur={handleOnBlur}
      />
    </View>
  );
}
