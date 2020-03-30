import * as React from "react";
// import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

cities = [
  {
    id: "1",
    name: "Chicago",
    text: "The Second City",
    image: require("../assets/images/city-of-chicago.jpg"),
    cost: "100 / M",
    weather: "60* F",
    internet: "14 MBPS",
    rovers: 160
  },
  {
    id: "2",
    name: "Chicago",
    text: "The Second City",
    image: require("../assets/images/city-of-chicago.jpg")
  },
  {
    id: "3",
    name: "Chicago",
    text: "The Second City",
    image: require("../assets/images/city-of-chicago.jpg")
  },
  {
    id: "4",
    name: "Chicago",
    text: "The Second City",
    image: require("../assets/images/city-of-chicago.jpg")
  },
  {
    id: "5",
    name: "Chicago",
    text: "The Second City",
    image: require("../assets/images/city-of-chicago.jpg")
  },
  {
    id: "6",
    name: "Chicago",
    text: "The Second City",
    image: require("../assets/images/city-of-chicago.jpg")
  },
  {
    id: "7",
    name: "Chicago",
    text: "The Second City",
    image: require("../assets/images/city-of-chicago.jpg")
  }
];

const Discover = ({ navigation }) => {
  renderCity = city => {
    return (
      <View style={styles.feedItem}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View>
              <Text style={styles.name}>{city.name}</Text>
              <Image
                source={city.image}
                style={styles.cityImage}
                resizeMode="cover"
              />
              <View>
                <Text style={styles.name}>{city.cost}</Text>
                <Text style={styles.name}>{city.weather}</Text>
              </View>
            </View>
            <Button
              title="Details"
              onPress={() => {
                navigation.navigate("Details", {
                  screen: "Details",
                  params: { name: "Details" }
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Search" onPress={() => navigation.push("Search")} />
        <Ionicons name="add-outline" />
      </View>
      <FlatList
        style={styles.feed}
        data={cities}
        renderItem={({ item }) => renderCity(item)}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" },
  header: {
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D64",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 0
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  cityImage: {
    width: 175,
    height: 150,
    borderRadius: 5,
    marginVertical: 16
  }
});

export default Discover;
