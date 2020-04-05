import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Fire from "../Firebase";
import colors from "../constants/Colors";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";

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
      console.log("singleRating", singleRating.rating);
      console.log("RATINGS", ratings.length);

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
      let averageSafety = parseFloat(total / safetyArr.length).toIndex(2);
      console.log("AVERAGE COST", averageSafety);

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
      console.log("ROVER AVG", averageAll);
      console.log("RATINGS", ratings);

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
              right: 330,
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
            <Text style={styles.cityStats}>{city.cost}</Text>
            <Text style={styles.cityStats}>{city.weather}</Text>
            <Text style={styles.cityStats}>{city.internet}</Text>
            <Text style={styles.cityStats}>{city.rovers}</Text>
          </View>

          <View style={styles.bestTime}>
            <View>
              <Text style={{ fontWeight: "bold" }}>Best time to visit</Text>
              <Text style={{ marginBottom: 20 }}>{city.timeVisit}</Text>
            </View>
            <View>
              <TouchableOpacity>
                <Text style={{ alignSelf: "right", color: "rgb(215,106,97)" }}>
                  View more
                </Text>
              </TouchableOpacity>
            </View>
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
                <Text
                  style={{ justifyText: "right", color: "rgb(215,106,97)" }}
                >
                  View {ratings.length} reviews
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rovers}>
            <View>
              <Text style={{ fontWeight: "bold" }}>Other Rovers</Text>
              <Text style={{ marginBottom: 20 }}>{city.rovers} rovers</Text>
            </View>
            <View>
              <TouchableOpacity>
                <Text
                  style={{ justifyText: "right", color: "rgb(215,106,97)" }}
                >
                  View more
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
