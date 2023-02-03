import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import {
  Text,
  TextInput,
  Dialog,
  RadioButton,
  Button,
  Searchbar,
} from "react-native-paper";

export default function BankSetupScreen() {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("express");
  const [visible, setVisible] = useState(false);
  const [countryVisible, setCountryVisible] = useState(false);
  const [query, setQuery] = useState("");
  const inputFields = [
    {
      label: "Email",
      value: email,
      setValue: setEmail,
      type: "email",
      placeholder: "Enter your email",
    },
  ];

  const countries = [
    { label: "Nigeria", value: "NG" },
    { label: "United States", value: "US" },
    { label: "United Kingdom", value: "UK" },
    { label: "Canada", value: "CA" },
    { label: "France", value: "FR" },
    { label: "Germany", value: "DE" },
    { label: "Spain", value: "ES" },
    { label: "Italy", value: "IT" },
    { label: "Japan", value: "JP" },
    { label: "China", value: "CN" },
    { label: "India", value: "IN" },
  ];
  return (
    <View>
      <Header title="Setup Bank" />
      <View
        style={{
          marginTop: 50,
          paddingHorizontal: 20,
          backgroundColor: "#fff",
          borderRadius: 10,
          marginHorizontal: 20,
          borderColor: "#999",
          borderWidth: 3,
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: 16,
            marginVertical: 10,
            color: "#000",
          }}
        >
          You need to add a bank account to recieve payments. Please fill the
          form below to get started receiving amount. We recommend using
          "Express" payment method
        </Text>
      </View>
      {inputFields.map((field) => (
        <TextInput
          key={field.label}
          label={field.label}
          value={field.value}
          onChangeText={(text) => field.setValue(text)}
          style={{
            marginVertical: 10,
            marginHorizontal: 20,
          }}
          placeholder={field.placeholder}
          keyboardType={field.type}
        />
      ))}
      <TextInput
        label={country === "" ? "Choose country" : country}
        value={country}
        disabled
        style={{
          marginVertical: 10,
          marginHorizontal: 20,
        }}
      />
      <Button
        style={{
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        mode="contained"
        onPress={() => setCountryVisible(true)}
      >
        Choose country
      </Button>
      <TextInput
        label="Account Type"
        value={type}
        disabled
        style={{
          marginVertical: 10,
          marginHorizontal: 20,
        }}
      />
      <Button
        style={{
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        mode="contained"
        onPress={() => setVisible(true)}
      >
        {type !== "express" ? "Change payment method" : "Choose payment method"}
      </Button>

      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{
          marginHorizontal: 20,
        }}
      >
        <Dialog.Title>Choose account type</Dialog.Title>
        <Dialog.Content>
          <RadioButton.Group
            onValueChange={(value) => setType(value)}
            value={type}
          >
            <RadioButton.Item label="Express" value="express" />
            <RadioButton.Item label="Standard" value="standard" />
          </RadioButton.Group>
        </Dialog.Content>
      </Dialog>
      <Dialog
        visible={countryVisible}
        onDismiss={() => setCountryVisible(false)}
        style={{
          marginHorizontal: 20,
          marginTop: 300,
        }}
      >
        <Dialog.Title>Choose your country</Dialog.Title>
        <Dialog.Content>
          <Searchbar
            placeholder="Search"
            onChangeText={(text) => setQuery(text)}
            value={query}
          />
          {countries
            .filter((country) =>
              country.label.toLowerCase().includes(query.toLowerCase())
            )
            .map((country) => (
              <Button
                key={country.value}
                style={{
                  marginVertical: 10,
                  marginHorizontal: 20,
                }}
                mode="contained"
                onPress={() => {
                  setCountry(country.label);
                  setCountryVisible(false);
                }}
              >
                {country.label}
              </Button>
            ))}
        </Dialog.Content>
      </Dialog>
      {/* <Button
        style={{
          marginHorizontal: 120,
          marginVertical: 10,
        }}
        mode="contained"
      >
        Submit
      </Button> */}
    </View>
  );
}
