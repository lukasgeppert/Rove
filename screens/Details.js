import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Fire from "../Firebase";
import colors from "../constants/Colors";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export const Details = ({ route, navigation }) => {
  const { city } = route.params;
  const [ratings, setRatings] = useState([]);
  const [averages, setAverages] = useState({});

  const fetchAverages = async () => {
    const ratings = await Fire.getRatings(city.name);
    const roverArr = [];
    const safetyArr = [];
    const localsArr = [];
    const cleanlinessArr = [];
    const valueArr = [];
    const coworkingspaceArr = [];

    for (let i = 0; i < ratings.length; i++) {
      const singleRating = ratings[i];
      const safety = singleRating.rating.safety;
      const locals = singleRating.rating.locals;
      const cleanliness = singleRating.rating.cleanliness;
      const value = singleRating.rating.value;
      const coworkingspace = singleRating.rating.coworkingspace;

      safetyArr.push(safety);
      localsArr.push(locals);
      cleanlinessArr.push(cleanliness);
      valueArr.push(value);
      coworkingspaceArr.push(coworkingspace);

      let total = 0;
      for (let i = 0; i < safetyArr.length; i++) {
        total += safetyArr[i];
      }
      let averageSafety = total / safetyArr.length;

      total = 0;
      for (let i = 0; i < localsArr.length; i++) {
        total += localsArr[i];
      }
      let averageLocals = total / localsArr.length;

      total = 0;
      for (let i = 0; i < cleanlinessArr.length; i++) {
        total += cleanlinessArr[i];
      }
      let averageCleanliness = total / cleanlinessArr.length;

      total = 0;
      for (let i = 0; i < valueArr.length; i++) {
        total += valueArr[i];
      }
      let averageValue = total / valueArr.length;

      total = 0;
      for (let i = 0; i < coworkingspaceArr.length; i++) {
        total += coworkingspaceArr[i];
      }
      let averageCoworkingspace = total / coworkingspaceArr.length;

      total = 0;
      roverArr.push(
        averageSafety,
        averageLocals,
        averageCleanliness,
        averageValue,
        averageCoworkingspace
      );
      for (let i = 0; i < roverArr.length; i++) {
        total += roverArr[i];
      }

      let averageAll = parseFloat(total / roverArr.length).toFixed(2);

      setAverages({
        rover: averageAll,
        safety: averageSafety,
        locals: averageLocals,
        cleanliness: averageCleanliness,
        value: averageValue,
        coworkingspace: averageCoworkingspace,
      });

      setRatings(ratings);
    }
  };

  useEffect(() => {
    fetchAverages();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
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
              right: 360,
              bottom: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text onPress={() => navigation.goBack()} style={styles.closeModal}>
              X
            </Text>
          </View>
        </ImageBackground>

        <View style={{ marginLeft: 30, marginRight: 30 }}>
          <View>
            <Text style={styles.cityName}>{city.name}</Text>
          </View>

          <View style={styles.cityInfo}>
            <MaterialCommunityIcons
              name="currency-usd"
              size={25}
              backGroundColor="#009387"
            ></MaterialCommunityIcons>
            <Text style={styles.cityStats}>{city.cost}</Text>
            <MaterialCommunityIcons
              name="temperature-fahrenheit"
              size={25}
              backGroundColor="#009387"
            ></MaterialCommunityIcons>
            <Text style={styles.cityStats}> {city.weather}</Text>
            <MaterialCommunityIcons
              name="wifi"
              size={25}
              backGroundColor="#009387"
            ></MaterialCommunityIcons>
            <Text style={styles.cityStats}> {city.internet}</Text>
            <MaterialCommunityIcons
              name="account-multiple"
              size={25}
              backGroundColor="#009387"
            ></MaterialCommunityIcons>
            <Text style={styles.cityStats}> {city.rovers} rovers</Text>
          </View>

          <View style={styles.reviews}>
            <View>
              <Text style={{ fontWeight: "bold" }}>Reviews</Text>
              <Text style={{ marginBottom: 20 }}>
                {averages.rover} 🌟 Rover Rating
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("RatingDetails", {
                    city: city,
                    ratings: ratings,
                    averages: averages,
                  });
                }}
              >
                <Text style={{ color: "rgb(215,106,97)" }}>
                  View {ratings.length} reviews
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rovers}>
            <View>
              <Text style={{ fontWeight: "bold" }}>Rovers</Text>
              <Text style={{ marginBottom: 20 }}>
                {city.rovers} active rovers
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("RoversList", {});
                }}
              >
                <Text style={{ color: "rgb(215,106,97)" }}>View more</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bestTime}>
            <View>
              <Text style={{ fontWeight: "bold", marginBottom: 20 }}>
                View Feed
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Austin, TX Feed", {});
                }}
              >
                <Text
                  style={{
                    alignSelf: "flex-end",
                    color: "rgb(215,106,97)",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  >
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", height: "100%" },
  cityImage: {
    width: "100%",
    height: 250,
  },
  closeModal: {
    color: colors.azure,
    fontSize: 30,
    fontWeight: "bold",
    textShadowColor: colors.black,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  cityName: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: colors.white,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  cityInfo: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.lightgray,
  },
  cityStats: {
    flex: 1,
    marginBottom: 20,
    fontSize: 15,
  },
  bestTime: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.lightgray,
  },
  reviews: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.lightgray,
  },
  rovers: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.lightgray,
  },
});

export default Details;
