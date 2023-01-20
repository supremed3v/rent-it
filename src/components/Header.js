import { Pressable, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ title }) {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </Pressable>
        <Text
          style={{
            textAlign: "center",
            marginLeft: 60,
          }}
          variant="displaySmall"
        >
          {title}
        </Text>
      </View>
    </>
  );
}
