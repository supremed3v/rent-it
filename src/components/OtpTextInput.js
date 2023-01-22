import { View, Text, TextInput, Pressable } from "react-native";
import React, { useRef, useState, useEffect } from "react";

export default function OtpTextInput({
  setPinReady,
  code,
  setCode,
  maxLength,
}) {
  const textInputRef = useRef(null);
  const codeDigitArray = new Array(maxLength).fill(0);
  const codeDigitInput = (_value, index) => {
    const emptyInputChar = " ";
    const digit = code[index] || emptyInputChar;
    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxLength - 1;
    const isInputFilled = code.length === maxLength;
    const isDigitisFocused = isCurrentDigit || (isLastDigit && isInputFilled);
    const inputContainerFocused = isDigitisFocused;
    const styledOtpInput = inputContainerFocused ? "gray" : "#fff";
    return (
      <View
        style={{
          borderColor: styledOtpInput,
          minWidth: "15%",
          borderWidth: 2,
          borderRadius: 5,
          padding: 12,
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
    setPinReady(code.length === maxLength);
    return () => {
      setPinReady(false);
    };
  }, [code]);
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
        value={code}
        onChangeText={setCode}
        maxLength={maxLength}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        ref={textInputRef}
        onBlur={handleOnBlur}
      />
    </View>
  );
}
