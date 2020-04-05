import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Fire from "../Firebase";

export const Details = ({ route, navigation }) => {
  // const { id } = route.params;
  const { name } = route.params;
  const [ratings, setRatings] = useState([]);
  const [averages, setAverages] = useState({});

  const fetchRatings = async () => {
    const ratings1 = await Fire.getRatings(name);
    return ratings1;
  };

  useEffect(() => {
    fetchRatings().then(ratings2 => setRatings(ratings2));
    console.log("RATINGS", ratings);
  }, []);

  const fetchAverages = async () => {
    const ratings3 = await Fire.getRatings(name);
    const costArr = [];
    const funArr = [];
    const internetArr = [];
    const safetyArr = [];
    const weatherArr = [];

    for (let i = 0; i < ratings3.length; i++) {
      const singleRating = ratings3[i];
      // console.log("singleRating", singleRating);
      const cost = singleRating.rating.cost;
      const fun = singleRating.rating.fun;
      const internet = singleRating.rating.internet;
      const safety = singleRating.rating.safety;
      const weather = singleRating.rating.weather;

      costArr.push(cost);
      funArr.push(fun);
      internetArr.push(internet);
      safetyArr.push(safety);
      weatherArr.push(weather);

      let total = 0;
      for (let i = 0; i < costArr.length; i++) {
        total += costArr[i];
      }
      let averageCost = total / costArr.length;

      total = 0;
      for (let i = 0; i < funArr.length; i++) {
        total += funArr[i];
      }
      let averageFun = total / funArr.length;

      total = 0;
      for (let i = 0; i < internetArr.length; i++) {
        total += internetArr[i];
      }
      let averageInternet = total / internetArr.length;

      total = 0;
      for (let i = 0; i < safetyArr.length; i++) {
        total += safetyArr[i];
      }
      let averageSafety = total / safetyArr.length;

      total = 0;
      for (let i = 0; i < weatherArr.length; i++) {
        total += weatherArr[i];
      }
      let averageWeather = total / weatherArr.length;

      setAverages({
        cost: averageCost,
        fun: averageFun,
        internet: averageInternet,
        safety: averageSafety,
        weather: averageWeather
      });
    }
  };
  useEffect(() => {
    fetchAverages();
    console.log("AVERAGES", averages);
  }, []);

  const renderRatings = rating => {
    return (
      <View>
        <Text>{rating.user.name}'s Rating</Text>
        <Text>Cost: {rating.rating.cost}</Text>
        <Text>Fun: {rating.rating.fun}</Text>
        <Text>Internet: {rating.rating.internet}</Text>
        <Text>Safety: {rating.rating.safety}</Text>
        <Text>Weather: {rating.rating.weather}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text>{name}</Text>
        {/* <Text>city: {id}</Text> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RatingForm", {
              name: name
            });
          }}
        >
          <Text>Add New Rating</Text>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={ratings}
          renderItem={({ item }) => renderRatings(item)}
          keyExtractor={(index, item) => item.toString()}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, width: 100 + "%", height: 100 + "%" }
});

export default Details;
