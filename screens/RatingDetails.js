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
import { Rating, AirbnbRating } from "react-native-elements";
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

  // const renderRatings = (rating) => {
  //   return (
  //     <View>
  //       <Text>{rating.user.name}'s Rating</Text>
  //       <Text>Safety: {rating.rating.safety}</Text>
  //       <Text>Locals: {rating.rating.locals}</Text>
  //       <Text>Cleanliness: {rating.rating.cleanliness}</Text>
  //       <Text>Value: {rating.rating.value}</Text>
  //       <Text>Co-working Space: {rating.rating.coworkingspace}</Text>
  //     </View>
  //   );
  // };

  let singleUserCheck = false;
  for (let i = 0; i < ratings.length; i++) {
    const singleUserRating = ratings[i];
    // if Fire.uid
    console.log("SINGLEUSERRATING", singleUserRating.user.id);
    if (Fire.uid === singleUserRating.user.id) {
      singleUserCheck = true;
    }
    console.log("SINGLEUSERCHECK", singleUserCheck);
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Text onPress={() => navigation.goBack()} style={styles.closeModal}>
            X
          </Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 25, marginBottom: 20 }}>
            Reviews
          </Text>

          <View style={{ alignContent: "space-between" }}>
            <Text style={{ marginBottom: 20 }}>
              {averages.rover} 🌟 Rover Rating
            </Text>
            <Text style={{ marginBottom: 20 }}>{ratings.length} reviews</Text>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("RatingForm", {
                  city: city,
                });
              }}
            >
              {singleUserCheck ? null : (
                <Text style={{ marginBottom: 20 }}>Add New Rating</Text>
              )}
            </TouchableOpacity>
          </View>

          <View
            styles={{
              flex: 1,
              marginBottom: 20,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: colors.lightgray,
            }}
          >
            <View
              style={{ flexDirection: "row", alignContent: "space-between" }}
            >
              <Text>Safety</Text>
              <Rating
                type="custom"
                imageSize={20}
                readonly
                startingValue={averages.safety}
                ratingColor="gold"
                ratingBackgroundColor="white"
                style={{ marginLeft: 100 }}
              />
              <Text style={{ marginLeft: 80 }}>
                {parseFloat(averages.safety).toFixed(2)}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text>Locals</Text>
              <Rating
                type="custom"
                imageSize={20}
                readonly
                startingValue={averages.locals}
                ratingColor="gold"
                ratingBackgroundColor="white"
                style={{ marginLeft: 100 }}
              />
              <Text style={{ marginLeft: 80 }}>
                {parseFloat(averages.locals).toFixed(2)}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text>Cleanliness</Text>
              <Rating
                type="custom"
                imageSize={20}
                readonly
                startingValue={averages.cleanliness}
                ratingColor="gold"
                ratingBackgroundColor="white"
                style={{ marginLeft: 68 }}
              />
              <Text style={{ marginLeft: 80 }}>
                {parseFloat(averages.cleanliness).toFixed(2)}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text>Value</Text>
              <Rating
                type="custom"
                imageSize={20}
                readonly
                startingValue={averages.value}
                ratingColor="gold"
                ratingBackgroundColor="white"
                style={{ marginLeft: 106 }}
              />
              <Text style={{ marginLeft: 80 }}>
                {parseFloat(averages.value).toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginBottom: 25,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: colors.lightgray,
              }}
            >
              <Text>Co-working Space</Text>
              <Rating
                type="custom"
                imageSize={20}
                readonly
                startingValue={averages.coworkingspace}
                style={styles.rating}
                ratingColor="gold"
                ratingBackgroundColor="white"
                style={{ marginLeft: 22 }}
              />
              <Text style={{ marginBottom: 25, marginLeft: 80 }}>
                {parseFloat(averages.coworkingspace).toFixed(2)}
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{ fontWeight: "bold", fontSize: 20, marginBottom: 15 }}
            >
              Review Criteria
            </Text>
            <Text style={{ marginBottom: 25 }}>
              Rovers reviewed the city based on the following criteria:
            </Text>

            <Text>Safety</Text>
            <Text style={styles.criteriaText}>
              How safe did you feel living in the city?
            </Text>

            <Text>Locals</Text>
            <Text style={styles.criteriaText}>
              How friendly were the locals to you as a nomad?
            </Text>

            <Text>Cleanliness</Text>
            <Text style={styles.criteriaText}>How clean was the city?</Text>

            <Text>Value</Text>
            <Text style={styles.criteriaText}>
              Did you feel the city provided good value for the cost of living?
            </Text>

            <Text>Coworking Spaces</Text>

            <Text>
              How did you feel about the number and quality of co-working
              spaces?
            </Text>
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
  // rating: {
  //   backgroundColor: colors.gray,
  // },
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
    alignSelf: "flex-end",
    marginLeft: 150,
  },
  closeModal: {
    color: colors.black,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  criteriaText: {
    marginBottom: 20,
  },
});

export default RatingDetails;
