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

  const [ratings, setRatings] = useState([]);

  const fetchRatings = async () => {
    const ratings = await Fire.getRatings(city.name);
    return ratings;
  };

  useEffect(() => {
    fetchRatings().then((ratings) => setRatings(ratings));
  }, []);

 

  let singleUserCheck = false;
  for (let i = 0; i < ratings.length; i++) {
    const singleUserRating = ratings[i];
    if (Fire.uid === singleUserRating.user.id) {
      singleUserCheck = true;
    }
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

          <View style={{ flexDirection: "row" }}>
            <View>
              <Text
                style={{ marginBottom: 5, fontSize: 20, fontWeight: "bold" }}
              >
                {averages.rover} 🌟 Rover Rating
              </Text>
              <Text style={{ marginBottom: 15 }}>{ratings.length} reviews</Text>
            </View>
            {singleUserCheck ? null : (
              <View style={styles.addFriendButton}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("RatingForm", {
                      city: city,
                    });
                  }}
                >
                  <Text
                    style={{
                      marginBottom: 5,
                      paddingVertical: 10,
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Add New Rating
                  </Text>
                </TouchableOpacity>
              </View>
            )}
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
                imageSize={22}
                readonly
                startingValue={averages.safety}
                ratingColor="gold"
                ratingBackgroundColor={colors.gray}
                tintColor="rgb(242,242,242)"
                style={{ marginLeft: 140 }}
              />
              <Text style={{ marginLeft: 40 }}>
                {parseFloat(averages.safety).toFixed(2)}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text>Locals</Text>
              <Rating
                type="custom"
                imageSize={22}
                readonly
                startingValue={averages.locals}
                ratingColor="gold"
                ratingBackgroundColor={colors.gray}
                tintColor="rgb(242,242,242)"
                style={{ marginLeft: 140 }}
              />
              <Text style={{ marginLeft: 40 }}>
                {parseFloat(averages.locals).toFixed(2)}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text>Cleanliness</Text>
              <Rating
                type="custom"
                imageSize={22}
                readonly
                startingValue={averages.cleanliness}
                ratingColor="gold"
                ratingBackgroundColor={colors.gray}
                tintColor="rgb(242,242,242)"
                style={{ marginLeft: 108 }}
              />
              <Text style={{ marginLeft: 40 }}>
                {parseFloat(averages.cleanliness).toFixed(2)}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text>Value</Text>
              <Rating
                type="custom"
                imageSize={22}
                readonly
                startingValue={averages.value}
                ratingColor="gold"
                ratingBackgroundColor={colors.gray}
                tintColor="rgb(242,242,242)"
                style={{ marginLeft: 146 }}
              />
              <Text style={{ marginLeft: 40 }}>
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
                imageSize={22}
                readonly
                startingValue={averages.coworkingspace}
                style={styles.rating}
                ratingColor="gold"
                ratingBackgroundColor={colors.gray}
                tintColor="rgb(242,242,242)"
                style={{ marginLeft: 62 }}
              />
              <Text style={{ marginBottom: 25, marginLeft: 40 }}>
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
  addFriendButton: {
    paddingHorizontal: 15,
    marginLeft: 25,
    backgroundColor: "rgb(215,106,97)",
    width: 150,
    margin: 8,
    fontWeight: "bold",
    borderRadius: 12,
    borderColor: "white",
    borderWidth: 1,
    color: "white",
    fontSize: 32,
    overflow: "hidden",
    textAlign: "center",
    // marginLeft: 135,
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
