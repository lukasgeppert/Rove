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
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/Colors";

const Discover = ({ navigation }) => {
  const renderCity = (city) => {
    return (
      <View style={styles.feedItem}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Details", {
                city: city,
              });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
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
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.cityName}>{city.name}</Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.feed}
        data={cities}
        renderItem={({ item }) => renderCity(item)}
        keyExtractor={(item) => item.id}
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
    zIndex: 0,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  cityImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
  cityName: {
    color: colors.azure,
    fontSize: 32,
    fontWeight: "bold",
    textShadowColor: colors.black,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default Discover;

let cities = [
  {
    id: "3",
    name: "Austin, TX",
    image: require("../assets/images/cities/austin.jpg"),
    roveScore: "4.5/5.0",
    cost: "1000/M",
    weather: "75* F",
    internet: "140 mbps",
    safety: "moderate",
    fun: "good",
    rovers: 160,
    timeVisit: "May-June",
  },
  {
    id: "7",
    name: "Denver, CO",
    image: require("../assets/images/cities/denver.jpg"),
    cost: "900/M",
    weather: "60* F",
    internet: "140 mbps",

    rovers: 150,
    timeVisit: "May-June",
  },
  {
    id: "6",
    name: "Seattle, WA",
    image: require("../assets/images/cities/seattle.jpg"),
    cost: "1100/M",
    weather: "60* F",
    internet: "140 mbps",
    rovers: 170,
    timeVisit: "July-August",
  },
  {
    id: "8",
    name: "Charlotte, NC",
    image: require("../assets/images/cities/charlotte.jpeg"),
    cost: "900/M",
    weather: "75* F",
    internet: "140 mbps",
    rovers: 100,
    timeVisit: "October-December",
  },
  {
    id: "1",
    name: "Chicago, IL",
    image: require("../assets/images/cities/city-of-chicago.jpg"),
    cost: "1000/M",
    weather: "50* F",
    internet: "140 mbps",
    rovers: 180,
    timeVisit: "July-August",
  },
  {
    id: "2",
    name: "San Francisco, CA",
    image: require("../assets/images/cities/san-francisco.jpg"),
    cost: "1500/M",
    weather: "65* F",
    internet: "140 mbps",
    rovers: 140,
    timeVisit: "May-June",
  },
  {
    id: "4",
    name: "Salt Lake City, UT",
    image: require("../assets/images/cities/slc.jpg"),
    cost: "1000/M",
    weather: "60* F",
    internet: "140 mbps",
    rovers: 120,
    timeVisit: "May-June",
  },
  {
    id: "5",
    name: "Portland, OR",
    image: require("../assets/images/cities/portland.jpg"),
    cost: "900/M",
    weather: "60* F",
    internet: "140 mbps",
    rovers: 50,
    timeVisit: "May-June",
  },

  {
    id: "9",
    name: "Colorado Springs, CO",
    image: require("../assets/images/cities/colorado-springs.jpeg"),
    cost: "900/M",
    weather: "60* F",
    internet: "140 mbps",
    rovers: 40,
    timeVisit: "May-June",
  },
  {
    id: "10",
    name: "Pittsburgh, PA",
    image: require("../assets/images/cities/pitt.jpg"),
    cost: "900/M",
    weather: "60* F",
    internet: "140 mbps",
    rovers: 60,
    timeVisit: "May-June",
  },
  {
    id: "11",
    name: "San Diego, CA",
    image: require("../assets/images/cities/sd.jpg"),
    cost: "1100/M",
    weather: "70* F",
    internet: "140 mbps",
    rovers: 80,
    timeVisit: "May-June",
  },
  {
    id: "12",
    name: "Dallas, TX",
    image: require("../assets/images/cities/dallas.jpeg"),
    cost: "1000/M",
    weather: "70* F",
    internet: "140 mbps",
    rovers: 90,
    timeVisit: "September-November",
  },
  {
    id: "13",
    name: "Miami, FL",
    image: require("../assets/images/cities/miami.jpeg"),
    cost: "1000/M",
    weather: "70* F",
    internet: "140 mbps",
    rovers: 100,
    timeVisit: "February-April",
  },
  {
    id: "140",
    name: "Phoenix, AZ",
    image: require("../assets/images/cities/phoenix.jpg"),
    cost: "1000/M",
    weather: "70* F",
    internet: "140 mbps",
    rovers: 80,
    timeVisit: "February-April",
  },
  {
    id: "15",
    name: "Nashville, TN",
    image: require("../assets/images/cities/nashville.jpg"),
    cost: "1000/M",
    weather: "70* F",
    internet: "140 mbps",
    rovers: 70,
    timeVisit: "May-June",
  },
];
