import { View, ScrollView, Image, FlatList, Dimensions } from "react-native";
import React from "react";
import { useTheme, Text, Divider, Button } from "react-native-paper";

export default function Home({ navigation }) {
  const theme = useTheme();

  const data = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
    {
      id: "5",
    },
    {
      id: "6",
    },
  ];

  const header = () => {
    return (
      <ScrollView
        style={{
          backgroundColor: theme.dark ? theme.colors.background : "#fff",
          paddingLeft: 15,
          paddingRight: 15,
          marginTop: 20,
        }}
      >
        <View>
          <Text
            variant="displayMedium"
            style={{
              width: "100%",
              position: "absolute",
              top: 100,
              zIndex: 1,
              color: "#000",
              backgroundColor: "#e7e7e7e7",
              opacity: 0.7,
              textAlign: "center",
            }}
          >
            Rent everything you need!
          </Text>
        </View>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1483181957632-8bda974cbc91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 200,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
        <Divider
          style={{
            marginTop: 20,
            marginBottom: 20,
            height: 2,
            backgroundColor: "#fff",
          }}
          bold={true}
          leftInset={true}
          horizontalInset={true}
        />
        <View>
          <Text variant="displayMedium">Categories</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text
                variant="displaySmall"
                style={{
                  marginRight: 10,
                }}
              >
                Category 1
              </Text>
              <Text
                variant="displaySmall"
                style={{
                  marginRight: 10,
                }}
              >
                Category 2
              </Text>
              <Text
                variant="displaySmall"
                style={{
                  marginRight: 10,
                }}
              >
                Category 3
              </Text>
              <Text
                variant="displaySmall"
                style={{
                  marginRight: 10,
                }}
              >
                Category 4
              </Text>
            </View>
          </ScrollView>
          <Divider
            style={{
              marginTop: 20,
              marginBottom: 20,
              height: 2,
              backgroundColor: "#fff",
            }}
            bold={true}
            leftInset={true}
            horizontalInset={true}
          />
          <Text variant="displayMedium">Products</Text>
        </View>
      </ScrollView>
    );
  };

  const footer = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 100,
          flex: 1,
        }}
      >
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("AllProducts")}
        >
          BROWSE ALL PRODUCTS
        </Button>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width / 2,
          height: 200,
          backgroundColor: "#e7e7e7e7",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          margin: 10,
        }}
      >
        <Text
          style={{
            color: "#000",
          }}
        >
          {item.id}
        </Text>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
      />
    </View>
  );
}
