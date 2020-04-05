import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import colors from "../constants/Colors";

import Fire from "../Firebase";
import { SafeAreaView } from "react-native-safe-area-context";

export const RatingDetails = ({ route, navigation }) => {
  const { city } = route.params;
  const { averages } = route.params;
  console.log("AVERAGES", averages);

  const [ratings, setRatings] = useState([]);

  const fetchRatings = async () => {
    const ratings = await Fire.getRatings(city.name);
    return ratings;
  };

  useEffect(() => {
    fetchRatings().then((ratings) => setRatings(ratings));
    console.log("RATINGS", ratings);
  }, []);

  const renderRatings = (rating) => {
    return (
      <View>
        <Text>{rating.user.name}'s Rating</Text>
        <Text>Safety: {rating.rating.safety}</Text>
        <Text>Locals: {rating.rating.locals}</Text>
        <Text>Cleanliness: {rating.rating.cleanliness}</Text>
        <Text>Value: {rating.rating.value}</Text>
        <Text>Co-working Space: {rating.rating.coworkingspace}</Text>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Text onPress={() => navigation.goBack()} style={styles.closeModal}>
            X
          </Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: "bold" }}>Reviews</Text>

          <Text style={{ marginBottom: 20 }}>
            {averages.rover} 🌟 Rover Rating
          </Text>
          <Text style={{ marginBottom: 20 }}>{ratings.length} reviews</Text>

          <View>
            <View style={{ flexDirection: "row" }}>
              <Text>Safety</Text>
              <View style={styles.progressBar}></View>
              <Text style={styles.ratingNum}>{averages.safety}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text>Locals</Text>
              <View style={styles.progressBar}></View>
              <Text>{averages.locals}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text>Cleanliness</Text>
              <View style={styles.progressBar}></View>
              <Text>{averages.cleanliness}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text>Value</Text>
              <View style={styles.progressBar}></View>
              <Text>{averages.value}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text>Co-working Space</Text>
              <View style={styles.progressBar}></View>
              <Text>{averages.coworkingspace}</Text>
            </View>
          </View>

          <View style>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("RatingForm", {
                  city: city,
                });
              }}
            >
              <Text style={{ marginBottom: 20 }}>Add New Rating</Text>
            </TouchableOpacity>
          </View>
          {/* <View>
            <FlatList
              data={ratings}
              renderItem={({ item }) => renderRatings(item)}
              keyExtractor={(index, item) => item.toString()}
            />
          </View> */}
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    height: "100%",
    marginLeft: 20,
    marginRight: 20,
  },
  progressBar: {
    height: 15,
    width: "60%",
    backgroundColor: colors.lightgrey,
    borderRadius: 10,
    marginLeft: 20,
    alignItems: "flex-end",
  },
  ratingNum: {
    textAlign: "right",
  },
  closeModal: {
    color: colors.black,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default RatingDetails;
