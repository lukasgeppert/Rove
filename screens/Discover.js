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
  FlatList,
  ImageBackground
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/Colors";

const Discover = ({ navigation }) => {
  renderCity = city => {
    return (
      <View style={styles.feedItem}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Details", {
                id: city.id,
                name: city.name,
                text: city.text,
                cost: city.cost,
                weather: city.weather,
                internet: city.internet,
                rovers: city.rovers
              });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <ImageBackground
                source={city.image}
                style={styles.cityImage}
                resizeMode="cover"
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={styles.cityName}>{city.name}</Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.name}>{city.cost}</Text>
            <Text style={styles.name}>{city.weather}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Search" onPress={() => navigation.push("Search")} />
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
    width: "100%",
    height: 200,
    borderRadius: 5
  },
  cityName: {
    color: colors.azure,
    fontSize: 32,
    fontWeight: "bold",
    textShadowColor: colors.black,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
});

export default Discover;

cities = [
  {
    id: "3",
    name: "Austin",
    text: "The Second City",
    image: require("../assets/images/cities/austin.jpg"),
    roveScore: "4.5/5.0",
    cost: "1000 / M",
    weather: "60* F",
    internet: "14 MBPS",
    safety: "moderate",
    fun: "good",
    rovers: 160
  },
  {
    id: "7",
    name: "Denver",
    text: "The Second City",
    image: require("../assets/images/cities/denver.jpg"),
    cost: "1000 / M",
    weather: "60* F",
    internet: "14 MBPS",
    rovers: 160
  },
  {
    id: "6",
    name: "Seattle",
    text: "The Second City",
    image: require("../assets/images/cities/seattle.jpg"),
    cost: "1000 / M",
    weather: "60* F",
    internet: "14 MBPS",
    rovers: 160
  },
  {
    id: "8",
    name: "Charlotte",
    text: "The Second City",
    image: require("../assets/images/cities/charlotte.jpeg"),
    cost: "1000 / M",
    weather: "60* F",
    internet: "14 MBPS",
    rovers: 160
  },
  {
    id: "1",
    name: "Chicago",
    text: "The Second City",
    image: require("../assets/images/cities/city-of-chicago.jpg"),
    cost: "1000 / M",
    weather: "60* F",
    internet: "14 MBPS",
    rovers: 160
  },
  {
    id: "2",
    name: "San Francisco",
    text: "The Second City",
    image: require("../assets/images/cities/san-francisco.jpg"),
    cost: "1000 / M",
    weather: "60* F",
    internet: "14 MBPS",
    rovers: 160
  },
  {
    id: "4",
    name: "Salt Lake City",
    text: "The Second City",
    image: require("../assets/images/cities/slc.jpg"),
    cost: "1000 / M",
    weather: "60* F",
    internet: "14 MBPS",
    rovers: 160
  },
  {
    id: "5",
    name: "Portland",
    text: "The Second City",
    image: require("../assets/images/cities/portland.jpg"),
    cost: "1000 / M",
    weather: "60* F",
    internet: "14 MBPS",
    rovers: 160
  },

  {
    id: "9",
    name: "Colorado Springs",
    text: "The Second City",
    image: require("../assets/images/cities/colorado-springs.jpeg"),
    cost: "1000 / M",
    weather: "60* F",
    internet: "14 MBPS",
    rovers: 160
  },
  {
    id: "10",
    name: "Pittsburgh",
    text: "The Second City",
    image: require("../assets/images/cities/pitt.jpg"),
    cost: "1000 / M",
    weather: "60* F",
    internet: "14 MBPS",
    rovers: 160
  },
  {
    id: "11",
    name: "San Diego",
    text: "The Second City",
    image: require("../assets/images/cities/sd.jpg"),
    cost: "1000 / M",
    weather: "60* F",
    internet: "14 MBPS",
    rovers: 160
  },
  {
    id: "12",
    name: "Dallas",
    text: "The Second City",
    image: require("../assets/images/cities/dallas.jpeg"),
    cost: "1000 / M",
    weather: "60* F",
    internet: "14 MBPS",
    rovers: 160
  },
  {
    id: "13",
    name: "Miami",
    text: "The Second City",
    image: require("../assets/images/cities/miami.jpeg"),
    cost: "1000 / M",
    weather: "60* F",
    internet: "14 MBPS",
    rovers: 160
  },
  {
    id: "14",
    name: "Phoenix",
    text: "The Second City",
    image: require("../assets/images/cities/phoenix.jpg"),
    cost: "1000 / M",
    weather: "60* F",
    internet: "14 MBPS",
    rovers: 160
  },
  {
    id: "15",
    name: "Nashville",
    text: "The Second City",
    image: require("../assets/images/cities/nashville.jpg"),
    cost: "1000 / M",
    weather: "60* F",
    internet: "14 MBPS",
    rovers: 160
  }
];
